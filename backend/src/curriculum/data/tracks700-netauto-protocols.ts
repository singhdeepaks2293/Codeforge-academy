import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
 {
  "id": "netauto-protocols-bgp",
  "slug": "netauto-protocols-bgp",
  "language": "python",
  "category": "devops",
  "title": "BGP Automation Foundations",
  "description": "Learn BGP from the ground up: autonomous systems, neighbour states, path attributes, messages, and timers, then generate real BGP configuration from inventory data with Python.",
  "difficulty": "Beginner",
  "estimatedHours": 8,
  "skills": [
   "BGP concepts",
   "Autonomous system numbers",
   "BGP neighbor states",
   "eBGP and iBGP",
   "BGP path attributes",
   "BGP messages",
   "BGP tables",
   "BGP timers",
   "YAML inventories",
   "BGP config generation"
  ],
  "prerequisites": [],
  "analogy": "Learning {topic} is like learning how postal services route mail between countries: each post office only needs to know the next hop, and the whole system agrees on the best path.",
  "modules": [
   {
    "id": "netauto-protocols-bgp-m1",
    "title": "BGP Automation Foundations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-bgp-m1-l1",
      "slug": "netauto-protocols-bgp-m1-l1",
      "title": "What BGP Is and Why It Exists",
      "concept": "BGP is the routing protocol that connects autonomous systems on the internet, exchanging reachability information between networks run by different organisations. Unlike interior protocols such as OSPF, BGP is a path-vector protocol: it advertises the list of autonomous systems a route passes through, which lets routers detect loops and apply policy. Every BGP speaker builds its routing decisions from the paths its neighbours advertise.",
      "syntax": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513",
      "exampleCode": "neighbors = [\n    {\"name\": \"R1\", \"peer\": \"192.0.2.1\", \"asn\": 64513, \"state\": \"Established\"},\n]\nfor n in neighbors:\n    print(f\"BGP neighbor {n['peer']} (AS {n['asn']}) on {n['name']}: {n['state']}\")",
      "exampleLanguage": "python",
      "mistake": "Assuming BGP picks the shortest path like OSPF; BGP picks the path its policy prefers, and the AS-path length is only one factor.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate What BGP Is and Why It Exists, but it does not work correctly.",
       "buggyCode": "asn = 64512\nis_private = 1 <= asn <= 64495  # private range\nprint('private' if is_private else 'public')",
       "fixedCode": "asn = 64512\nis_private = 64512 <= asn <= 65534  # private 16-bit range\nprint('private' if is_private else 'public')",
       "explanation": "AS 64512 is the first private ASN; the range 1 to 64495 is public, so the check mislabels every private ASN as public."
      },
      "exercise": {
       "title": "Practise What BGP Is and Why It Exists",
       "type": "write-code",
       "instructions": "Build the BGP session inventory for three lab routers (R1, R2, R3) with their peer addresses, peer ASNs, and session states, and print the header 'BGP sessions in the lab inventory' followed by one line per session in the form 'BGP neighbor <peer> (AS <asn>) on <name>: <state>'. This is your local inventory data, not output taken from a router.",
       "starterCode": "rows = [{'name': 'R1', 'peer': '192.0.2.1', 'asn': 64513, 'state': 'Established'}, {'name': 'R2', 'peer': '192.0.2.2', 'asn': 64514, 'state': 'Established'}, {'name': 'R3', 'peer': '198.51.100.1', 'asn': 64512, 'state': 'Idle'}]\nprint('BGP sessions in the lab inventory')\n# TODO: finish the program for What BGP Is and Why It Exists below.\n",
       "solution": "rows = [{'name': 'R1', 'peer': '192.0.2.1', 'asn': 64513, 'state': 'Established'}, {'name': 'R2', 'peer': '192.0.2.2', 'asn': 64514, 'state': 'Established'}, {'name': 'R3', 'peer': '198.51.100.1', 'asn': 64512, 'state': 'Idle'}]\nprint('BGP sessions in the lab inventory')\nfor r in rows:\n    print('BGP neighbor {peer} (AS {asn}) on {name}: {state}'.format(**r))\n",
       "solutionExplanation": "The solution builds the required data, applies the What BGP Is and Why It Exists technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "BGP sessions in the lab inventory\nBGP neighbor 192.0.2.1 (AS 64513) on R1: Established\nBGP neighbor 192.0.2.2 (AS 64514) on R2: Established\nBGP neighbor 198.51.100.1 (AS 64512) on R3: Idle",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "BGP neighbor 198.51.100.1 (AS 64512) on R3: Idle",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What BGP Is and Why It Exists is the key idea here: BGP is the routing protocol that connects autonomous systems on the internet, exchanging reachability information between networks run by different organisations.",
        "approach": "Work through What BGP Is and Why It Exists step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-m1-l2",
      "slug": "netauto-protocols-bgp-m1-l2",
      "title": "Autonomous System Numbers",
      "concept": "An autonomous system number (ASN) identifies a network under one administrative control, and BGP uses it to build AS paths. Public ASNs from 1 to 64495 are assigned by regional registries, 64512 to 65534 are private for internal use, and 64496 to 64511 are reserved for documentation. The 4-byte ASN space extends this with private ASNs from 4200000000 to 4294967294.",
      "syntax": "64512-65534 private (16-bit)\n4200000000-4294967294 private (32-bit)\n64496-64511 documentation",
      "exampleCode": "asn = 64512\nif 64512 <= asn <= 65534:\n    print(f'ASN {asn}: private (16-bit)')",
      "exampleLanguage": "python",
      "mistake": "Treating AS 64512 as a public ASN in documentation or configs, which can clash with the real owner of a public ASN.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Autonomous System Numbers, but it does not work correctly.",
       "buggyCode": "asn = 65535\nis_private = 64512 <= asn <= 65535\nprint('private' if is_private else 'public')",
       "fixedCode": "asn = 65535\nis_private = 64512 <= asn <= 65534\nprint('private' if is_private else 'public')",
       "explanation": "AS 65535 is reserved as AS_TRANS and is not a private ASN, so the range must stop at 65534."
      },
      "exercise": {
       "title": "Practise Autonomous System Numbers",
       "type": "write-code",
       "instructions": "Classify each ASN in the list as public, private (16-bit), private (32-bit), or documentation, and print one line per ASN in the form 'ASN <number>: <kind>'. The list is [64512, 64496, 4200000000, 64513, 65534, 65000].",
       "starterCode": "asns = [64512, 64496, 4200000000, 64513, 65534, 65000]\n# TODO: finish the program for Autonomous System Numbers below.\n",
       "solution": "asns = [64512, 64496, 4200000000, 64513, 65534, 65000]\nfor asn in asns:\n    if 64512 <= asn <= 65534:\n        kind = \"private (16-bit)\"\n    elif 4200000000 <= asn <= 4294967294:\n        kind = \"private (32-bit)\"\n    elif 64496 <= asn <= 64511:\n        kind = \"documentation\"\n    else:\n        kind = \"public\"\n    print(f\"ASN {asn}: {kind}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Autonomous System Numbers technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ASN 64512: private (16-bit)\nASN 64496: documentation\nASN 4200000000: private (32-bit)\nASN 64513: private (16-bit)\nASN 65534: private (16-bit)\nASN 65000: private (16-bit)",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "ASN 65000: private (16-bit)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Autonomous System Numbers is the key idea here: An autonomous system number (ASN) identifies a network under one administrative control, and BGP uses it to build AS paths.",
        "approach": "Work through Autonomous System Numbers step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-m1-l3",
      "slug": "netauto-protocols-bgp-m1-l3",
      "title": "eBGP and iBGP Neighbors",
      "concept": "eBGP runs between routers in different autonomous systems, while iBGP runs between routers inside the same autonomous system. eBGP neighbours are usually directly connected and exchange routes learned from other networks, whereas iBGP neighbours share routes learned from eBGP within the AS. A route learned from eBGP is preferred over the same route learned from iBGP, and iBGP requires a full mesh or route reflectors because iBGP does not re-advertise iBGP-learned routes to other iBGP peers.",
      "syntax": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513  # eBGP\n neighbor 10.0.0.2 remote-as 64512   # iBGP",
      "exampleCode": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n  description eBGP to AS 64513\n neighbor 10.0.0.2 remote-as 64512\n  description iBGP to R2\n  update-source Loopback0",
      "exampleLanguage": "python",
      "mistake": "Forgetting that iBGP-learned routes are not re-advertised to other iBGP peers, so a partial mesh silently leaves routers without routes.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate eBGP and iBGP Neighbors, but it does not work correctly.",
       "buggyCode": "router bgp 64512\n neighbor 10.0.0.2 remote-as 64513  # iBGP peer in our own AS",
       "fixedCode": "router bgp 64512\n neighbor 10.0.0.2 remote-as 64512  # iBGP peer in our own AS",
       "explanation": "An iBGP neighbour must use the local ASN; using the peer's ASN makes the session eBGP and changes how routes are advertised."
      },
      "exercise": {
       "title": "Check your understanding: eBGP and iBGP Neighbors",
       "type": "multiple-choice",
       "instructions": "Which statement about eBGP and iBGP Neighbors is correct?",
       "starterCode": "",
       "solution": "eBGP runs between routers in different autonomous systems, while iBGP runs between routers inside the same autonomous system.",
       "solutionExplanation": "eBGP runs between routers in different autonomous systems, while iBGP runs between routers inside the same autonomous system. The other options are false: eBGP and iBGP Neighbors is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "eBGP runs between routers in different autonomous systems, while iBGP runs between routers inside the same autonomous system.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of eBGP and iBGP Neighbors from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "eBGP and iBGP Neighbors can only be used once in a program",
        "eBGP and iBGP Neighbors requires a separate paid licence to use",
        "eBGP and iBGP Neighbors is not available in Python",
        "eBGP runs between routers in different autonomous systems, while iBGP runs between routers inside the same autonomous system.",
        "eBGP and iBGP Neighbors only works when the program prints text"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-protocols-bgp-m1-l4",
      "slug": "netauto-protocols-bgp-m1-l4",
      "title": "BGP Neighbor States",
      "concept": "A BGP session moves through the states Idle, Connect, Active, OpenSent, OpenConfirm, and finally Established, and routes are only exchanged once the session reaches Established. The Idle state means the session is administratively down or waiting to start, while Connect and Active cover the TCP connection attempts to the neighbour. If the session gets stuck in Active, the usual causes are a wrong neighbour address, a blocked TCP port 179, or a mismatched AS number.",
      "syntax": "Idle -> Connect -> Active -> OpenSent -> OpenConfirm -> Established",
      "exampleCode": "STATES = ['Idle', 'Connect', 'Active', 'OpenSent', 'OpenConfirm', 'Established']\nprint(' -> '.join(STATES))",
      "exampleLanguage": "python",
      "mistake": "Assuming a session in the Active state is exchanging routes; only Established sessions exchange routes.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Neighbor States, but it does not work correctly.",
       "buggyCode": "NEXT = {'Idle': ['Connect'], 'Connect': ['Active', 'OpenSent'], 'Active': ['Connect', 'OpenSent'], 'OpenSent': ['OpenConfirm'], 'OpenConfirm': ['Established']}\nprint('Established' in NEXT['OpenSent'])  # True: OpenSent can go to OpenConfirm only",
       "fixedCode": "NEXT = {'Idle': ['Connect'], 'Connect': ['Active', 'OpenSent'], 'Active': ['Connect', 'OpenSent'], 'OpenSent': ['OpenConfirm'], 'OpenConfirm': ['Established']}\nprint('OpenConfirm' in NEXT['OpenSent'])  # True: OpenSent goes to OpenConfirm, never straight to Established",
       "explanation": "OpenSent can only move to OpenConfirm; a session cannot jump from OpenSent straight to Established."
      },
      "exercise": {
       "title": "Practise BGP Neighbor States",
       "type": "write-code",
       "instructions": "Validate three BGP session histories against the allowed state transitions (Idle to Connect; Connect to Active or OpenSent; Active to Connect or OpenSent; OpenSent to OpenConfirm; OpenConfirm to Established). For each session print '<name>: valid, reached Established', '<name>: valid, waiting in <state>', or '<name>: invalid transition <from> -> <to>'. Sessions: R1 Idle, Connect, OpenSent, OpenConfirm, Established; R2 Idle, Active, Connect, OpenSent, Established; R3 Idle, Connect, Active, OpenSent, OpenConfirm.",
       "starterCode": "NEXT = {\"Idle\": [\"Connect\"], \"Connect\": [\"Active\", \"OpenSent\"],\n        \"Active\": [\"Connect\", \"OpenSent\"], \"OpenSent\": [\"OpenConfirm\"],\n        \"OpenConfirm\": [\"Established\"], \"Established\": []}\nsessions = [\n    (\"R1\", [\"Idle\", \"Connect\", \"OpenSent\", \"OpenConfirm\", \"Established\"]),\n    (\"R2\", [\"Idle\", \"Active\", \"Connect\", \"OpenSent\", \"Established\"]),\n    (\"R3\", [\"Idle\", \"Connect\", \"Active\", \"OpenSent\", \"OpenConfirm\"]),\n]\n# TODO: finish the program for BGP Neighbor States below.\n",
       "solution": "NEXT = {\"Idle\": [\"Connect\"], \"Connect\": [\"Active\", \"OpenSent\"],\n        \"Active\": [\"Connect\", \"OpenSent\"], \"OpenSent\": [\"OpenConfirm\"],\n        \"OpenConfirm\": [\"Established\"], \"Established\": []}\nsessions = [\n    (\"R1\", [\"Idle\", \"Connect\", \"OpenSent\", \"OpenConfirm\", \"Established\"]),\n    (\"R2\", [\"Idle\", \"Active\", \"Connect\", \"OpenSent\", \"Established\"]),\n    (\"R3\", [\"Idle\", \"Connect\", \"Active\", \"OpenSent\", \"OpenConfirm\"]),\n]\nfor name, states in sessions:\n    bad = None\n    for a, b in zip(states, states[1:]):\n        if b not in NEXT[a]:\n            bad = (a, b)\n            break\n    if bad:\n        print(f\"{name}: invalid transition {bad[0]} -> {bad[1]}\")\n    elif states[-1] == \"Established\":\n        print(f\"{name}: valid, reached Established\")\n    else:\n        print(f\"{name}: valid, waiting in {states[-1]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the BGP Neighbor States technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "R1: valid, reached Established\nR2: invalid transition Idle -> Active\nR3: valid, waiting in OpenConfirm",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "R3: valid, waiting in OpenConfirm",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "BGP Neighbor States is the key idea here: A BGP session moves through the states Idle, Connect, Active, OpenSent, OpenConfirm, and finally Established, and routes are only exchanged once the session reaches Established.",
        "approach": "Work through BGP Neighbor States step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-m1-l5",
      "slug": "netauto-protocols-bgp-m1-l5",
      "title": "BGP Path Attributes Overview",
      "concept": "BGP path attributes travel with every route and decide which path wins when several routes reach the same prefix. Weight is a Cisco-local value checked first, then local preference (default 100, higher wins), then locally originated routes, then the shortest AS path, then the lowest origin code, then the lowest MED. Understanding this order lets you predict which path a router will choose before you change any configuration.",
      "syntax": "best = max by (weight, local-pref, shortest AS-path, lowest origin, lowest MED)",
      "exampleCode": "routes = [\n    {'neighbor': '192.0.2.1', 'local_pref': 100, 'as_path': [64513, 64520], 'med': 50},\n    {'neighbor': '192.0.2.2', 'local_pref': 200, 'as_path': [64514, 64520, 64521], 'med': 10},\n]\nbest = min(routes, key=lambda r: (-r['local_pref'], len(r['as_path']), r['med']))\nprint(best['neighbor'])",
      "exampleLanguage": "python",
      "mistake": "Comparing AS-path lengths before local preference; local preference is checked first and wins over a shorter path.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Path Attributes Overview, but it does not work correctly.",
       "buggyCode": "routes = [\n    {'neighbor': '192.0.2.1', 'local_pref': 100, 'as_path': [64513, 64520]},\n    {'neighbor': '192.0.2.2', 'local_pref': 200, 'as_path': [64514, 64520, 64521]},\n]\nbest = min(routes, key=lambda r: len(r['as_path']))\nprint(best['neighbor'])  # picks 192.0.2.1 by shortest path",
       "fixedCode": "routes = [\n    {'neighbor': '192.0.2.1', 'local_pref': 100, 'as_path': [64513, 64520]},\n    {'neighbor': '192.0.2.2', 'local_pref': 200, 'as_path': [64514, 64520, 64521]},\n]\nbest = min(routes, key=lambda r: (-r['local_pref'], len(r['as_path'])))\nprint(best['neighbor'])  # picks 192.0.2.2 by local preference first",
       "explanation": "Local preference is compared before AS-path length, so the path with local preference 200 wins even though its AS path is longer."
      },
      "exercise": {
       "title": "Practise BGP Path Attributes Overview",
       "type": "write-code",
       "instructions": "Three candidate paths reach 203.0.113.0/24. Print one line per candidate in the form 'Candidate via <neighbor>: local-pref <lp>, AS-path length <n>, MED <m>', then print 'Best path for 203.0.113.0/24: via <neighbor>'. Choose the best by highest local preference, then shortest AS path, then lowest MED. Candidates: via 192.0.2.1 local-pref 100 AS-path [64513, 64520] MED 50; via 192.0.2.2 local-pref 200 AS-path [64514, 64520, 64521] MED 10; via 192.0.2.3 local-pref 100 AS-path [64515] MED 0.",
       "starterCode": "routes = [\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.1\", \"local_pref\": 100, \"as_path\": [64513, 64520], \"med\": 50},\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.2\", \"local_pref\": 200, \"as_path\": [64514, 64520, 64521], \"med\": 10},\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.3\", \"local_pref\": 100, \"as_path\": [64515], \"med\": 0},\n]\n# TODO: finish the program for BGP Path Attributes Overview below.\n",
       "solution": "routes = [\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.1\", \"local_pref\": 100, \"as_path\": [64513, 64520], \"med\": 50},\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.2\", \"local_pref\": 200, \"as_path\": [64514, 64520, 64521], \"med\": 10},\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.3\", \"local_pref\": 100, \"as_path\": [64515], \"med\": 0},\n]\nfor r in routes:\n    print(f\"Candidate via {r['neighbor']}: local-pref {r['local_pref']}, AS-path length {len(r['as_path'])}, MED {r['med']}\")\nbest = min(routes, key=lambda r: (-r[\"local_pref\"], len(r[\"as_path\"]), r[\"med\"]))\nprint(f\"Best path for {best['prefix']}: via {best['neighbor']}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the BGP Path Attributes Overview technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Candidate via 192.0.2.1: local-pref 100, AS-path length 2, MED 50\nCandidate via 192.0.2.2: local-pref 200, AS-path length 3, MED 10\nCandidate via 192.0.2.3: local-pref 100, AS-path length 1, MED 0\nBest path for 203.0.113.0/24: via 192.0.2.2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Best path for 203.0.113.0/24: via 192.0.2.2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "BGP Path Attributes Overview is the key idea here: BGP path attributes travel with every route and decide which path wins when several routes reach the same prefix.",
        "approach": "Work through BGP Path Attributes Overview step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-bgp-m2",
    "title": "BGP Automation Foundations in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-protocols-bgp-m2-l1",
      "slug": "netauto-protocols-bgp-m2-l1",
      "title": "BGP Messages: Open, Update, Keepalive, Notification",
      "concept": "BGP speakers exchange four message types: Open starts the session and carries the ASN, hold time, and router ID; Update carries route advertisements and withdrawals; Keepalive confirms the session is alive; and Notification reports an error and closes the session. A BGP speaker sends a Keepalive at one third of the negotiated hold time, so a 90-second hold time means a Keepalive every 30 seconds.",
      "syntax": "OPEN: version 4, my AS, hold time, router ID\nUPDATE: NLRI + path attributes\nKEEPALIVE: 19-byte header only\nNOTIFICATION: error code + data",
      "exampleCode": "open_message = {'version': 4, 'my_as': 64512, 'hold_time': 90, 'router_id': '10.0.0.1'}\nprint(open_message['hold_time'] // 3)  # keepalive interval",
      "exampleLanguage": "python",
      "mistake": "Setting the Keepalive interval equal to the hold time, which leaves no margin and lets the session flap on a single delayed packet.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Messages: Open, Update, Keepalive, Notification, but it does not work correctly.",
       "buggyCode": "hold_time = 90\nkeepalive = hold_time  # one keepalive per hold time\nprint(keepalive)",
       "fixedCode": "hold_time = 90\nkeepalive = hold_time // 3  # one keepalive per third of the hold time\nprint(keepalive)",
       "explanation": "BGP sends a Keepalive at one third of the hold time, not once per hold time; with a 90-second hold time the interval is 30 seconds."
      },
      "exercise": {
       "title": "Practise BGP Messages: Open, Update, Keepalive, Notification",
       "type": "write-code",
       "instructions": "Build the BGP Open message for a router with ASN 64512, hold time 90 seconds, and router ID 10.0.0.1. Print the message as a JSON object with sorted keys and the fields version (4), my_as, hold_time, router_id, and keepalive (hold time divided by 3). Then print 'Keepalive is hold time / 3 = 30 seconds'.",
       "starterCode": "import json\n\nopen_message = {\n    \"version\": 4,\n    \"my_as\": 64512,\n    \"hold_time\": 90,\n    \"router_id\": \"10.0.0.1\",\n    \"keepalive\": 90 // 3,\n}\nprint(json.dumps(open_message, sort_keys=True))\n# TODO: finish the program for BGP Messages: Open, Update, Keepalive, Notification below.\n",
       "solution": "import json\n\nopen_message = {\n    \"version\": 4,\n    \"my_as\": 64512,\n    \"hold_time\": 90,\n    \"router_id\": \"10.0.0.1\",\n    \"keepalive\": 90 // 3,\n}\nprint(json.dumps(open_message, sort_keys=True))\nprint(f\"Keepalive is hold time / 3 = {open_message['hold_time'] // 3} seconds\")\n",
       "solutionExplanation": "The solution builds the required data, applies the BGP Messages: Open, Update, Keepalive, Notification technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\"hold_time\": 90, \"keepalive\": 30, \"my_as\": 64512, \"router_id\": \"10.0.0.1\", \"version\": 4}\nKeepalive is hold time / 3 = 30 seconds",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Keepalive is hold time / 3 = 30 seconds",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "BGP Messages: Open, Update, Keepalive, Notification is the key idea here: BGP speakers exchange four message types: Open starts the session and carries the ASN, hold time, and router ID; Update carries route advertisements and withdrawals; Keepalive confirms the session is alive; and Notification reports an error and closes the session.",
        "approach": "Work through BGP Messages: Open, Update, Keepalive, Notification step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-m2-l2",
      "slug": "netauto-protocols-bgp-m2-l2",
      "title": "BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out",
      "concept": "A BGP router keeps three conceptual tables: Adj-RIB-In holds routes as received from each neighbour before policy, Loc-RIB holds the best routes after inbound policy, and Adj-RIB-Out holds the routes advertised to each neighbour after outbound policy. Inbound policy filters what enters the Loc-RIB, and outbound policy filters what leaves in Adj-RIB-Out, so the same route can look different in each table.",
      "syntax": "Adj-RIB-In -> inbound policy -> Loc-RIB -> outbound policy -> Adj-RIB-Out",
      "exampleCode": "Adj-RIB-In: 203.0.113.0/24 from 192.0.2.1 (as received)\nLoc-RIB:    203.0.113.0/24 best path, local-pref 200\nAdj-RIB-Out: 203.0.113.0/24 to 192.0.2.2 (after outbound policy)",
      "exampleLanguage": "python",
      "mistake": "Looking for a filtered route in the Loc-RIB; a route rejected by inbound policy never reaches the Loc-RIB, so check Adj-RIB-In first.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out, but it does not work correctly.",
       "buggyCode": "# route in Loc-RIB but missing from Adj-RIB-Out: check outbound policy\n# route missing from Loc-RIB: check Adj-RIB-In first, then inbound policy",
       "fixedCode": "# route missing from Adj-RIB-Out: check outbound policy\n# route missing from Loc-RIB: check Adj-RIB-In, then inbound policy",
       "explanation": "The table that lacks the route tells you which policy to inspect; blaming outbound policy for a route that never entered the Loc-RIB wastes the investigation."
      },
      "exercise": {
       "title": "Check your understanding: BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out",
       "type": "multiple-choice",
       "instructions": "Which statement about BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out is correct?",
       "starterCode": "",
       "solution": "A BGP router keeps three conceptual tables: Adj-RIB-In holds routes as received from each neighbour before policy, Loc-RIB holds the best routes after inbound policy, and Adj-RIB-Out holds the routes advertised to each neighbour after outbound policy.",
       "solutionExplanation": "A BGP router keeps three conceptual tables: Adj-RIB-In holds routes as received from each neighbour before policy, Loc-RIB holds the best routes after inbound policy, and Adj-RIB-Out holds the routes advertised to each neighbour after outbound policy. The other options are false: BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A BGP router keeps three conceptual tables: Adj-RIB-In holds routes as received from each neighbour before policy, Loc-RIB holds the best routes after inbound policy, and Adj-RIB-Out holds the routes advertised to each neighbour after outbound policy.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out can only be used once in a program",
        "BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out requires a separate paid licence to use",
        "A BGP router keeps three conceptual tables: Adj-RIB-In holds routes as received from each neighbour before policy, Loc-RIB holds the best routes after inbound policy, and Adj-RIB-Out holds the routes advertised to each neighbour after outbound policy.",
        "BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out is not available in Python",
        "BGP Tables: Adj-RIB-In, Loc-RIB, and Adj-RIB-Out only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-bgp-m2-l3",
      "slug": "netauto-protocols-bgp-m2-l3",
      "title": "BGP Timers and Hold Time",
      "concept": "The BGP hold time is the maximum time a router waits without a message before declaring its neighbour dead, and the two neighbours negotiate the smaller of their configured values. The Keepalive interval is one third of the negotiated hold time, and the Cisco defaults are a 90-second hold time with a 30-second Keepalive. Setting the hold time to zero disables the timer and means the session never times out.",
      "syntax": "neighbor 192.0.2.1 timers 30 90  # keepalive 30, hold time 90",
      "exampleCode": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n  timers 30 90",
      "exampleLanguage": "python",
      "mistake": "Configuring a hold time smaller than the Keepalive interval, which guarantees the session times out before the next Keepalive arrives.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Timers and Hold Time, but it does not work correctly.",
       "buggyCode": "neighbor 192.0.2.1 timers 90 30  # keepalive 90, hold time 30",
       "fixedCode": "neighbor 192.0.2.1 timers 30 90  # keepalive 30, hold time 90",
       "explanation": "The first number is the Keepalive interval and the second is the hold time; swapping them makes the hold time shorter than the Keepalive interval."
      },
      "exercise": {
       "title": "Check your understanding: BGP Timers and Hold Time",
       "type": "multiple-choice",
       "instructions": "Which statement about BGP Timers and Hold Time is correct?",
       "starterCode": "",
       "solution": "The BGP hold time is the maximum time a router waits without a message before declaring its neighbour dead, and the two neighbours negotiate the smaller of their configured values.",
       "solutionExplanation": "The BGP hold time is the maximum time a router waits without a message before declaring its neighbour dead, and the two neighbours negotiate the smaller of their configured values. The other options are false: BGP Timers and Hold Time is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The BGP hold time is the maximum time a router waits without a message before declaring its neighbour dead, and the two neighbours negotiate the smaller of their configured values.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of BGP Timers and Hold Time from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "BGP Timers and Hold Time can only be used once in a program",
        "BGP Timers and Hold Time requires a separate paid licence to use",
        "The BGP hold time is the maximum time a router waits without a message before declaring its neighbour dead, and the two neighbours negotiate the smaller of their configured values.",
        "BGP Timers and Hold Time is not available in Python",
        "BGP Timers and Hold Time only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-bgp-m2-l4",
      "slug": "netauto-protocols-bgp-m2-l4",
      "title": "Your First BGP Inventory in Python",
      "concept": "A BGP inventory is a structured list of routers and their neighbours, written as YAML so both people and programs can read it. Each router entry names its ASN and loopback address, and each neighbour entry names the peer address, the peer ASN, and whether the session is eBGP or iBGP. Loading the inventory with PyYAML turns it into Python dictionaries your automation can loop over to generate configs or check state.",
      "syntax": "routers:\n  - name: R1\n    asn: 64512\n    neighbors:\n      - 192.0.2.1",
      "exampleCode": "import yaml\n\ndata = yaml.safe_load(open('inventory.yaml'))\nfor router in data['routers']:\n    print(router['name'], router['asn'])",
      "exampleLanguage": "python",
      "mistake": "Writing the inventory as free-form text instead of structured YAML, so no program can reliably read the neighbour list.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Your First BGP Inventory in Python, but it does not work correctly.",
       "buggyCode": "import yaml\ndata = yaml.safe_load(open('inventory.yaml'))\nfor router in data['router']:  # wrong key\n    print(router['name'])",
       "fixedCode": "import yaml\ndata = yaml.safe_load(open('inventory.yaml'))\nfor router in data['routers']:  # top-level key is 'routers'\n    print(router['name'])",
       "explanation": "The YAML document uses the top-level key 'routers', so indexing 'router' raises a KeyError; always match the key in the file."
      },
      "exercise": {
       "title": "Practise Your First BGP Inventory in Python",
       "type": "write-code",
       "instructions": "Load the YAML inventory with two routers (R1 AS 64512 with neighbours 192.0.2.1 and 192.0.2.2; R2 AS 64513 with neighbour 192.0.2.3). Print one line per router in the form 'Router <name> (AS <asn>): <n> neighbors', followed by one indented line per neighbour in the form '  neighbor <address>'.",
       "starterCode": "import yaml\ndata = yaml.safe_load('routers:\\n  - name: R1\\n    asn: 64512\\n    neighbors:\\n      - 192.0.2.1\\n      - 192.0.2.2\\n  - name: R2\\n    asn: 64513\\n    neighbors:\\n      - 192.0.2.3\\n')\n# TODO: finish the program for Your First BGP Inventory in Python below.\n",
       "solution": "import yaml\ndata = yaml.safe_load('routers:\\n  - name: R1\\n    asn: 64512\\n    neighbors:\\n      - 192.0.2.1\\n      - 192.0.2.2\\n  - name: R2\\n    asn: 64513\\n    neighbors:\\n      - 192.0.2.3\\n')\nfor router in data[\"routers\"]:\n    print(f\"Router {router['name']} (AS {router['asn']}): {len(router['neighbors'])} neighbors\")\n    for neighbor in router[\"neighbors\"]:\n        print(f\"  neighbor {neighbor}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Your First BGP Inventory in Python technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Router R1 (AS 64512): 2 neighbors\n  neighbor 192.0.2.1\n  neighbor 192.0.2.2\nRouter R2 (AS 64513): 1 neighbors\n  neighbor 192.0.2.3",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "  neighbor 192.0.2.3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Your First BGP Inventory in Python is the key idea here: A BGP inventory is a structured list of routers and their neighbours, written as YAML so both people and programs can read it.",
        "approach": "Work through Your First BGP Inventory in Python step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-m2-l5",
      "slug": "netauto-protocols-bgp-m2-l5",
      "title": "Generating a BGP Neighbor Config",
      "concept": "Generating BGP neighbour configuration from inventory data means one template produces the config for every router, so a change to the template fixes all routers at once. A Jinja2 template loops over the neighbour list and emits a neighbour statement with the peer address and remote ASN for each one. The generated text is ordinary router configuration that you can review, diff, and save before it is ever applied.",
      "syntax": "router bgp {{ asn }}\n{% for n in neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\n{% endfor %}",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ peer }} remote-as {{ remote_as }}')\nprint(template.render(asn=64512, peer='192.0.2.1', remote_as=64513))",
      "exampleLanguage": "python",
      "mistake": "Hard-coding one router's neighbour list into the template instead of looping over data, so every new router needs a new template.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Generating a BGP Neighbor Config, but it does not work correctly.",
       "buggyCode": "template = Template('router bgp {{ asn }}\\n neighbor {{ n.address }} remote-as {{ asn }}')",
       "fixedCode": "template = Template('router bgp {{ asn }}\\n neighbor {{ n.address }} remote-as {{ n.remote_as }}')",
       "explanation": "The neighbour statement needs the peer's ASN, not your own; using the local ASN turns an eBGP peer into an iBGP peer."
      },
      "exercise": {
       "title": "Practise Generating a BGP Neighbor Config",
       "type": "write-code",
       "instructions": "Render the BGP neighbour configuration for AS 64512 with a Jinja2 template. The template prints 'router bgp <asn>' then, for each neighbour, ' neighbor <address> remote-as <remote_as>' and ' neighbor <address> description <description>'. Neighbours: 192.0.2.1 AS 64513 description uplink-to-R2; 192.0.2.2 AS 64514 description uplink-to-R3. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'neighbors': [{'address': '192.0.2.1', 'remote_as': 64513, 'description': 'uplink-to-R2'}, {'address': '192.0.2.2', 'remote_as': 64514, 'description': 'uplink-to-R3'}]}\ntemplate = Template('router bgp {{ asn }}\\n{% for n in neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\\n neighbor {{ n.address }} description {{ n.description }}\\n{% endfor %}')\n# TODO: finish the program for Generating a BGP Neighbor Config below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'neighbors': [{'address': '192.0.2.1', 'remote_as': 64513, 'description': 'uplink-to-R2'}, {'address': '192.0.2.2', 'remote_as': 64514, 'description': 'uplink-to-R3'}]}\ntemplate = Template('router bgp {{ asn }}\\n{% for n in neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\\n neighbor {{ n.address }} description {{ n.description }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Generating a BGP Neighbor Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n neighbor 192.0.2.1 description uplink-to-R2\n neighbor 192.0.2.2 remote-as 64514\n neighbor 192.0.2.2 description uplink-to-R3",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " neighbor 192.0.2.2 description uplink-to-R3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Generating a BGP Neighbor Config is the key idea here: Generating BGP neighbour configuration from inventory data means one template produces the config for every router, so a change to the template fixes all routers at once.",
        "approach": "Work through Generating a BGP Neighbor Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: BGP Automation Foundations",
   "type": "write-code",
   "instructions": "Generate the BGP configuration for two routers from one inventory with Jinja2. For each router print a comment line '! <name> (AS <asn>)', then 'router bgp <asn>', then one line per neighbour in the form ' neighbor <address> remote-as <remote_as>'. Routers: R1 AS 64512 with neighbours 192.0.2.2 AS 64513 and 192.0.2.3 AS 64514; R2 AS 64513 with neighbour 192.0.2.1 AS 64512. Print the full rendered config.",
   "starterCode": "from jinja2 import Template\ndata = {'routers': [{'name': 'R1', 'asn': 64512, 'neighbors': [{'address': '192.0.2.2', 'remote_as': 64513}, {'address': '192.0.2.3', 'remote_as': 64514}]}, {'name': 'R2', 'asn': 64513, 'neighbors': [{'address': '192.0.2.1', 'remote_as': 64512}]}]}\ntemplate = Template('{% for r in routers %}! {{ r.name }} (AS {{ r.asn }})\\nrouter bgp {{ r.asn }}\\n{% for n in r.neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\\n{% endfor %}{% endfor %}')\n# TODO: finish the program for BGP Automation Foundations Capstone below.\n",
   "solution": "from jinja2 import Template\ndata = {'routers': [{'name': 'R1', 'asn': 64512, 'neighbors': [{'address': '192.0.2.2', 'remote_as': 64513}, {'address': '192.0.2.3', 'remote_as': 64514}]}, {'name': 'R2', 'asn': 64513, 'neighbors': [{'address': '192.0.2.1', 'remote_as': 64512}]}]}\ntemplate = Template('{% for r in routers %}! {{ r.name }} (AS {{ r.asn }})\\nrouter bgp {{ r.asn }}\\n{% for n in r.neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\\n{% endfor %}{% endfor %}')\nprint(template.render(**data).strip())\n",
   "solutionExplanation": "The solution builds the required data, applies the BGP Automation Foundations Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "! R1 (AS 64512)\nrouter bgp 64512\n neighbor 192.0.2.2 remote-as 64513\n neighbor 192.0.2.3 remote-as 64514\n! R2 (AS 64513)\nrouter bgp 64513\n neighbor 192.0.2.1 remote-as 64512",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "neighbor 192.0.2.1 remote-as 64512",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through BGP Automation Foundations Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "BGP Automation Foundations Capstone Project",
   "description": "Generate the complete BGP configuration for a small two-router lab from one inventory file.",
   "requirements": [
    "Generate the BGP configuration for two routers from a single inventory with Jinja2.",
    "Apply at least three of these skills: BGP concepts, Autonomous system numbers, BGP neighbor states, YAML inventories.",
    "Every neighbour statement uses the peer's real ASN, never the local ASN.",
    "Review the generated config line by line before it is applied."
   ],
   "rubric": [
    "The generated config is complete and correct for both routers.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-ospf",
  "slug": "netauto-protocols-ospf",
  "language": "python",
  "category": "devops",
  "title": "OSPF Automation Foundations",
  "description": "Learn OSPF from the ground up: areas and the backbone, router IDs, neighbour states, LSAs, and DR/BDR election, then generate real OSPF configuration from inventory data with Python.",
  "difficulty": "Beginner",
  "estimatedHours": 8,
  "skills": [
   "OSPF concepts",
   "OSPF areas",
   "Router IDs",
   "OSPF neighbor states",
   "Link-state advertisements",
   "DR and BDR election",
   "OSPF cost",
   "OSPF network types",
   "YAML inventories",
   "OSPF config generation"
  ],
  "prerequisites": [
   "netauto-protocols-bgp"
  ],
  "analogy": "Learning {topic} is like learning how a neighbourhood map gets drawn: every router shares what it can see, and everyone builds the same map from the shared pieces.",
  "modules": [
   {
    "id": "netauto-protocols-ospf-m1",
    "title": "OSPF Automation Foundations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-ospf-m1-l1",
      "slug": "netauto-protocols-ospf-m1-l1",
      "title": "What OSPF Is and How It Works",
      "concept": "OSPF is a link-state interior routing protocol in which every router floods information about its links so that all routers in an area build the same map of the network. Each router runs Dijkstra's shortest-path algorithm on that map to compute the lowest-cost path to every destination. Because every router holds the full topology, OSPF converges quickly and avoids the counting-to-infinity problems of distance-vector protocols.",
      "syntax": "router ospf 1\n router-id 1.1.1.1\n network 10.0.0.0 0.0.0.255 area 0",
      "exampleCode": "routers = [\n    {'name': 'R1', 'router_id': '1.1.1.1', 'area': '0.0.0.0', 'links': 3},\n]\nfor r in routers:\n    print(f\"Router {r['name']} ({r['router_id']}) area {r['area']} links {r['links']}\")",
      "exampleLanguage": "python",
      "mistake": "Treating OSPF like a distance-vector protocol and expecting routers to learn routes only from their direct neighbours.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate What OSPF Is and How It Works, but it does not work correctly.",
       "buggyCode": "routers = {'R1': '1.1.1.1'}\nprint(routers['R2'])  # R2 is not in the area map",
       "fixedCode": "routers = {'R1': '1.1.1.1', 'R2': '2.2.2.2'}\nprint(routers['R2'])  # every router in the area is in the map",
       "explanation": "OSPF gives every router the full area map, so a lookup must find every router in the area, not just the local one."
      },
      "exercise": {
       "title": "Practise What OSPF Is and How It Works",
       "type": "write-code",
       "instructions": "Build the area 0 router inventory for three routers (R1 router-id 1.1.1.1 with 3 links; R2 router-id 2.2.2.2 with 2 links; R3 router-id 3.3.3.3 with 4 links) and print one line per router in the form 'Router <name> (<router_id>) area 0.0.0.0 links <n>'.",
       "starterCode": "rows = [{'name': 'R1', 'router_id': '1.1.1.1', 'links': 3}, {'name': 'R2', 'router_id': '2.2.2.2', 'links': 2}, {'name': 'R3', 'router_id': '3.3.3.3', 'links': 4}]\n# TODO: finish the program for What OSPF Is and How It Works below.\n",
       "solution": "rows = [{'name': 'R1', 'router_id': '1.1.1.1', 'links': 3}, {'name': 'R2', 'router_id': '2.2.2.2', 'links': 2}, {'name': 'R3', 'router_id': '3.3.3.3', 'links': 4}]\nfor r in rows:\n    print('Router {name} ({router_id}) area 0.0.0.0 links {links}'.format(**r))\n",
       "solutionExplanation": "The solution builds the required data, applies the What OSPF Is and How It Works technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Router R1 (1.1.1.1) area 0.0.0.0 links 3\nRouter R2 (2.2.2.2) area 0.0.0.0 links 2\nRouter R3 (3.3.3.3) area 0.0.0.0 links 4",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Router R3 (3.3.3.3) area 0.0.0.0 links 4",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What OSPF Is and How It Works is the key idea here: OSPF is a link-state interior routing protocol in which every router floods information about its links so that all routers in an area build the same map of the network.",
        "approach": "Work through What OSPF Is and How It Works step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-m1-l2",
      "slug": "netauto-protocols-ospf-m1-l2",
      "title": "OSPF Areas and the Backbone",
      "concept": "OSPF divides a network into areas, and area 0.0.0.0 is the backbone that all other areas must connect to, either directly or through a virtual link. Splitting a network into areas limits how far link-state flooding travels, which keeps the link-state database small and convergence fast. Area border routers sit between areas and summarise routes so routers inside an area only see a summary of the outside world.",
      "syntax": "area 0.0.0.0  # backbone\narea 0.0.0.1  # normal area",
      "exampleCode": "areas = ['0.0.0.0', '0.0.0.1', '0.0.0.2']\nfor area in areas:\n    kind = 'backbone' if area == '0.0.0.0' else 'normal'\n    print(f'Area {area}: {kind}')",
      "exampleLanguage": "python",
      "mistake": "Attaching a normal area to another normal area with no path to area 0, which leaves the area disconnected from the backbone.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Areas and the Backbone, but it does not work correctly.",
       "buggyCode": "areas = ['0.0.0.1', '0.0.0.2']  # no backbone area at all",
       "fixedCode": "areas = ['0.0.0.0', '0.0.0.1', '0.0.0.2']  # every design includes area 0",
       "explanation": "An OSPF design must include the backbone area 0.0.0.0; without it there is no area for the other areas to connect to."
      },
      "exercise": {
       "title": "Practise OSPF Areas and the Backbone",
       "type": "write-code",
       "instructions": "Classify each area ID as backbone, normal, or invalid (an area ID must be four dot-separated numbers from 0 to 255). Print one line per area in the form 'Area <id>: <kind>'. Areas: 0.0.0.0, 0.0.0.1, 0.0.0.2, 1.0.0.256.",
       "starterCode": "areas = [\"0.0.0.0\", \"0.0.0.1\", \"0.0.0.2\", \"1.0.0.256\"]\n# TODO: finish the program for OSPF Areas and the Backbone below.\n",
       "solution": "areas = [\"0.0.0.0\", \"0.0.0.1\", \"0.0.0.2\", \"1.0.0.256\"]\nfor area in areas:\n    parts = area.split(\".\")\n    valid = len(parts) == 4 and all(p.isdigit() and 0 <= int(p) <= 255 for p in parts)\n    if not valid:\n        kind = \"invalid\"\n    elif area == \"0.0.0.0\":\n        kind = \"backbone\"\n    else:\n        kind = \"normal\"\n    print(f\"Area {area}: {kind}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the OSPF Areas and the Backbone technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Area 0.0.0.0: backbone\nArea 0.0.0.1: normal\nArea 0.0.0.2: normal\nArea 1.0.0.256: invalid",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Area 1.0.0.256: invalid",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "OSPF Areas and the Backbone is the key idea here: OSPF divides a network into areas, and area 0.",
        "approach": "Work through OSPF Areas and the Backbone step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-m1-l3",
      "slug": "netauto-protocols-ospf-m1-l3",
      "title": "Router IDs and Neighbor Discovery",
      "concept": "Every OSPF router picks a router ID, the highest loopback address if one is configured, otherwise the highest active interface address, and the ID must be unique in the area. Routers discover neighbours by sending Hello packets to the multicast address 224.0.0.5, and two routers become neighbours when their Hellos agree on area, authentication, timers, and subnet.",
      "syntax": "router-id 1.1.1.1\n# Hellos to 224.0.0.5 every 10 seconds",
      "exampleCode": "router ospf 1\n router-id 1.1.1.1\n network 10.0.0.0 0.0.0.255 area 0",
      "exampleLanguage": "python",
      "mistake": "Configuring the same router ID on two routers, which breaks adjacency because OSPF cannot tell the two routers apart.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Router IDs and Neighbor Discovery, but it does not work correctly.",
       "buggyCode": "router ospf 1\n router-id 1.1.1.1  # also used on R2",
       "fixedCode": "router ospf 1\n router-id 2.2.2.2  # unique in the area",
       "explanation": "Router IDs must be unique in the area; reusing 1.1.1.1 on a second router prevents both routers from forming adjacencies."
      },
      "exercise": {
       "title": "Check your understanding: Router IDs and Neighbor Discovery",
       "type": "multiple-choice",
       "instructions": "Which statement about Router IDs and Neighbor Discovery is correct?",
       "starterCode": "",
       "solution": "Every OSPF router picks a router ID, the highest loopback address if one is configured, otherwise the highest active interface address, and the ID must be unique in the area.",
       "solutionExplanation": "Every OSPF router picks a router ID, the highest loopback address if one is configured, otherwise the highest active interface address, and the ID must be unique in the area. The other options are false: Router IDs and Neighbor Discovery is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Every OSPF router picks a router ID, the highest loopback address if one is configured, otherwise the highest active interface address, and the ID must be unique in the area.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Router IDs and Neighbor Discovery from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Router IDs and Neighbor Discovery can only be used once in a program",
        "Every OSPF router picks a router ID, the highest loopback address if one is configured, otherwise the highest active interface address, and the ID must be unique in the area.",
        "Router IDs and Neighbor Discovery requires a separate paid licence to use",
        "Router IDs and Neighbor Discovery is not available in Python",
        "Router IDs and Neighbor Discovery only works when the program prints text"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-protocols-ospf-m1-l4",
      "slug": "netauto-protocols-ospf-m1-l4",
      "title": "OSPF Neighbor States",
      "concept": "OSPF neighbours move through the states Down, Init, 2-Way, ExStart, Exchange, Loading, and Full, and only Full neighbours exchange the complete link-state database. The 2-Way state means both routers have seen each other in Hello packets, which is enough for DR and BDR election, while the later states synchronise the databases. A neighbour stuck in ExStart usually means mismatched MTUs or duplicate router IDs.",
      "syntax": "Down -> Init -> 2-Way -> ExStart -> Exchange -> Loading -> Full",
      "exampleCode": "STATES = ['Down', 'Init', '2-Way', 'ExStart', 'Exchange', 'Loading', 'Full']\nprint(' -> '.join(STATES))",
      "exampleLanguage": "python",
      "mistake": "Assuming a neighbour in the 2-Way state has exchanged the full database; only Full neighbours have done that.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Neighbor States, but it does not work correctly.",
       "buggyCode": "NEXT = {'Down': ['Init'], 'Init': ['2-Way'], '2-Way': ['ExStart'], 'ExStart': ['Exchange'], 'Exchange': ['Loading'], 'Loading': ['Full']}\nprint('Full' in NEXT['2-Way'])  # 2-Way jumps straight to Full",
       "fixedCode": "NEXT = {'Down': ['Init'], 'Init': ['2-Way'], '2-Way': ['ExStart'], 'ExStart': ['Exchange'], 'Exchange': ['Loading'], 'Loading': ['Full']}\nprint('ExStart' in NEXT['2-Way'])  # 2-Way goes to ExStart, not Full",
       "explanation": "A neighbour must pass through ExStart, Exchange, and Loading before reaching Full; 2-Way never jumps straight to Full."
      },
      "exercise": {
       "title": "Practise OSPF Neighbor States",
       "type": "write-code",
       "instructions": "Validate three OSPF neighbour histories against the allowed transitions (Down to Init; Init to 2-Way; 2-Way to ExStart; ExStart to Exchange; Exchange to Loading; Loading to Full). For each neighbour print '<name>: valid, reached Full', '<name>: valid, waiting in <state>', or '<name>: invalid transition <from> -> <to>'. Histories: R1 Down, Init, 2-Way, ExStart, Exchange, Loading, Full; R2 Down, Init, Full; R3 Down, Init, 2-Way, ExStart, Exchange.",
       "starterCode": "NEXT = {\"Down\": [\"Init\"], \"Init\": [\"2-Way\"], \"2-Way\": [\"ExStart\"],\n        \"ExStart\": [\"Exchange\"], \"Exchange\": [\"Loading\"], \"Loading\": [\"Full\"],\n        \"Full\": []}\nsessions = [\n    (\"R1\", [\"Down\", \"Init\", \"2-Way\", \"ExStart\", \"Exchange\", \"Loading\", \"Full\"]),\n    (\"R2\", [\"Down\", \"Init\", \"Full\"]),\n    (\"R3\", [\"Down\", \"Init\", \"2-Way\", \"ExStart\", \"Exchange\"]),\n]\n# TODO: finish the program for OSPF Neighbor States below.\n",
       "solution": "NEXT = {\"Down\": [\"Init\"], \"Init\": [\"2-Way\"], \"2-Way\": [\"ExStart\"],\n        \"ExStart\": [\"Exchange\"], \"Exchange\": [\"Loading\"], \"Loading\": [\"Full\"],\n        \"Full\": []}\nsessions = [\n    (\"R1\", [\"Down\", \"Init\", \"2-Way\", \"ExStart\", \"Exchange\", \"Loading\", \"Full\"]),\n    (\"R2\", [\"Down\", \"Init\", \"Full\"]),\n    (\"R3\", [\"Down\", \"Init\", \"2-Way\", \"ExStart\", \"Exchange\"]),\n]\nfor name, states in sessions:\n    bad = None\n    for a, b in zip(states, states[1:]):\n        if b not in NEXT[a]:\n            bad = (a, b)\n            break\n    if bad:\n        print(f\"{name}: invalid transition {bad[0]} -> {bad[1]}\")\n    elif states[-1] == \"Full\":\n        print(f\"{name}: valid, reached Full\")\n    else:\n        print(f\"{name}: valid, waiting in {states[-1]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the OSPF Neighbor States technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "R1: valid, reached Full\nR2: invalid transition Init -> Full\nR3: valid, waiting in Exchange",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "R3: valid, waiting in Exchange",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "OSPF Neighbor States is the key idea here: OSPF neighbours move through the states Down, Init, 2-Way, ExStart, Exchange, Loading, and Full, and only Full neighbours exchange the complete link-state database.",
        "approach": "Work through OSPF Neighbor States step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-m1-l5",
      "slug": "netauto-protocols-ospf-m1-l5",
      "title": "Link-State Advertisements",
      "concept": "Link-state advertisements (LSAs) are the records OSPF floods: a Type 1 Router LSA describes a router's links, a Type 2 Network LSA describes a multi-access network, Type 3 Summary LSAs carry routes between areas, and Type 5 External LSAs carry routes redistributed from outside OSPF. Every LSA carries a sequence number and an age, so routers can tell a newer copy from an older one and refresh LSAs every 30 minutes.",
      "syntax": "Type 1 Router LSA\nType 2 Network LSA\nType 3 Summary LSA\nType 5 External LSA",
      "exampleCode": "lsas = [\n    {'type': 1, 'name': 'Router LSA'},\n    {'type': 2, 'name': 'Network LSA'},\n    {'type': 3, 'name': 'Summary LSA'},\n    {'type': 5, 'name': 'External LSA'},\n]\nfor lsa in lsas:\n    print(f\"Type {lsa['type']} {lsa['name']}\")",
      "exampleLanguage": "python",
      "mistake": "Confusing a Type 3 summary LSA with a Type 5 external LSA, so an inter-area route is treated as if it came from outside OSPF.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Link-State Advertisements, but it does not work correctly.",
       "buggyCode": "lsa = {'type': 5, 'name': 'Summary LSA'}  # Type 5 is external, not summary",
       "fixedCode": "lsa = {'type': 3, 'name': 'Summary LSA'}  # Type 3 carries routes between areas",
       "explanation": "Type 3 is the summary LSA used between areas; Type 5 is the external LSA for redistributed routes."
      },
      "exercise": {
       "title": "Practise Link-State Advertisements",
       "type": "write-code",
       "instructions": "Summarise the LSAs in the area database: count how many of each type there are and print one line per type in the form 'Type <n> <name>: <count> advertised'. LSAs: Type 1 Router (4), Type 2 Network (2), Type 3 Summary (6), Type 5 External (3). Print the types in numeric order.",
       "starterCode": "lsas = [\n    {\"type\": 1, \"name\": \"Router LSA\"},\n    {\"type\": 1, \"name\": \"Router LSA\"},\n    {\"type\": 1, \"name\": \"Router LSA\"},\n    {\"type\": 1, \"name\": \"Router LSA\"},\n    {\"type\": 2, \"name\": \"Network LSA\"},\n    {\"type\": 2, \"name\": \"Network LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 5, \"name\": \"External LSA\"},\n    {\"type\": 5, \"name\": \"External LSA\"},\n    {\"type\": 5, \"name\": \"External LSA\"},\n]\ncounts = {}\n# TODO: finish the program for Link-State Advertisements below.\n",
       "solution": "lsas = [\n    {\"type\": 1, \"name\": \"Router LSA\"},\n    {\"type\": 1, \"name\": \"Router LSA\"},\n    {\"type\": 1, \"name\": \"Router LSA\"},\n    {\"type\": 1, \"name\": \"Router LSA\"},\n    {\"type\": 2, \"name\": \"Network LSA\"},\n    {\"type\": 2, \"name\": \"Network LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 3, \"name\": \"Summary LSA\"},\n    {\"type\": 5, \"name\": \"External LSA\"},\n    {\"type\": 5, \"name\": \"External LSA\"},\n    {\"type\": 5, \"name\": \"External LSA\"},\n]\ncounts = {}\nfor lsa in lsas:\n    counts.setdefault((lsa[\"type\"], lsa[\"name\"]), 0)\n    counts[(lsa[\"type\"], lsa[\"name\"])] += 1\nfor (num, name) in sorted(counts):\n    print(f\"Type {num} {name}: {counts[(num, name)]} advertised\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Link-State Advertisements technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Type 1 Router LSA: 4 advertised\nType 2 Network LSA: 2 advertised\nType 3 Summary LSA: 6 advertised\nType 5 External LSA: 3 advertised",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Type 5 External LSA: 3 advertised",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Link-State Advertisements is the key idea here: Link-state advertisements (LSAs) are the records OSPF floods: a Type 1 Router LSA describes a router's links, a Type 2 Network LSA describes a multi-access network, Type 3 Summary LSAs carry routes between areas, and Type 5 External LSAs carry routes redistributed from outside OSPF.",
        "approach": "Work through Link-State Advertisements step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-ospf-m2",
    "title": "OSPF Automation Foundations in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-protocols-ospf-m2-l1",
      "slug": "netauto-protocols-ospf-m2-l1",
      "title": "DR and BDR Election",
      "concept": "On a broadcast network OSPF elects a Designated Router (DR) and a Backup Designated Router (BDR) so that all routers exchange link-state information with the DR instead of forming adjacencies with every other router. The router with the highest OSPF priority wins, and ties are broken by the highest router ID; a priority of 0 means the router never becomes DR or BDR. The election reduces the number of adjacencies on a segment from one per pair of routers to one per router.",
      "syntax": "ip ospf priority 10  # default 1, 0 means never DR/BDR",
      "exampleCode": "routers = [\n    {'name': 'R1', 'priority': 1, 'router_id': '1.1.1.1'},\n    {'name': 'R2', 'priority': 10, 'router_id': '2.2.2.2'},\n    {'name': 'R3', 'priority': 10, 'router_id': '3.3.3.3'},\n]\n# DR is R3 (priority 10, highest router ID); BDR is R2",
      "exampleLanguage": "python",
      "mistake": "Assuming the router with the highest router ID always wins, and forgetting that priority is compared first.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate DR and BDR Election, but it does not work correctly.",
       "buggyCode": "routers = [\n    {'name': 'R1', 'priority': 10, 'router_id': '1.1.1.1'},\n    {'name': 'R2', 'priority': 1, 'router_id': '9.9.9.9'},\n]\ndr = max(routers, key=lambda r: r['router_id'])  # R2 wins by router ID",
       "fixedCode": "routers = [\n    {'name': 'R1', 'priority': 10, 'router_id': '1.1.1.1'},\n    {'name': 'R2', 'priority': 1, 'router_id': '9.9.9.9'},\n]\ndr = max(routers, key=lambda r: (r['priority'], r['router_id']))  # R1 wins by priority",
       "explanation": "Priority is compared before router ID, so R1 wins with priority 10 even though R2 has the higher router ID."
      },
      "exercise": {
       "title": "Practise DR and BDR Election",
       "type": "write-code",
       "instructions": "Elect the DR and BDR for a broadcast segment with four routers: R1 priority 1 router-id 1.1.1.1; R2 priority 10 router-id 2.2.2.2; R3 priority 10 router-id 3.3.3.3; R4 priority 0 router-id 4.4.4.4. The highest priority wins, ties break by highest router ID, and priority 0 routers are never eligible. Print 'DR: <name> (priority <p>, <rid>)' and 'BDR: <name> (priority <p>, <rid>)'.",
       "starterCode": "routers = [\n    {\"name\": \"R1\", \"priority\": 1, \"router_id\": \"1.1.1.1\"},\n    {\"name\": \"R2\", \"priority\": 10, \"router_id\": \"2.2.2.2\"},\n    {\"name\": \"R3\", \"priority\": 10, \"router_id\": \"3.3.3.3\"},\n    {\"name\": \"R4\", \"priority\": 0, \"router_id\": \"4.4.4.4\"},\n]\neligible = [r for r in routers if r[\"priority\"] > 0]\nranked = sorted(eligible, key=lambda r: (r[\"priority\"], r[\"router_id\"]), reverse=True)\ndr, bdr = ranked[0], ranked[1]\n# TODO: finish the program for DR and BDR Election below.\n",
       "solution": "routers = [\n    {\"name\": \"R1\", \"priority\": 1, \"router_id\": \"1.1.1.1\"},\n    {\"name\": \"R2\", \"priority\": 10, \"router_id\": \"2.2.2.2\"},\n    {\"name\": \"R3\", \"priority\": 10, \"router_id\": \"3.3.3.3\"},\n    {\"name\": \"R4\", \"priority\": 0, \"router_id\": \"4.4.4.4\"},\n]\neligible = [r for r in routers if r[\"priority\"] > 0]\nranked = sorted(eligible, key=lambda r: (r[\"priority\"], r[\"router_id\"]), reverse=True)\ndr, bdr = ranked[0], ranked[1]\nprint(f\"DR: {dr['name']} (priority {dr['priority']}, {dr['router_id']})\")\nprint(f\"BDR: {bdr['name']} (priority {bdr['priority']}, {bdr['router_id']})\")\n",
       "solutionExplanation": "The solution builds the required data, applies the DR and BDR Election technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "DR: R3 (priority 10, 3.3.3.3)\nBDR: R2 (priority 10, 2.2.2.2)",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "BDR: R2 (priority 10, 2.2.2.2)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "DR and BDR Election is the key idea here: On a broadcast network OSPF elects a Designated Router (DR) and a Backup Designated Router (BDR) so that all routers exchange link-state information with the DR instead of forming adjacencies with every other router.",
        "approach": "Work through DR and BDR Election step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-m2-l2",
      "slug": "netauto-protocols-ospf-m2-l2",
      "title": "OSPF Cost and Metrics",
      "concept": "OSPF cost is calculated as the reference bandwidth divided by the interface bandwidth, with a default reference of 100 Mbps, so a 10 Mbps link costs 10 and a 1 Gbps link costs 1. The cost of a path is the sum of the costs of its outgoing interfaces, and OSPF always prefers the lowest total cost. Because the default reference makes every link of 100 Mbps or faster cost 1, large networks usually raise the reference bandwidth so fast links are still distinguished.",
      "syntax": "cost = reference_bandwidth / interface_bandwidth  # default reference 100 Mbps",
      "exampleCode": "reference = 100_000_000  # 100 Mbps in bits per second\nfor bandwidth in [10_000_000, 100_000_000, 1_000_000_000]:\n    print(max(1, reference // bandwidth))",
      "exampleLanguage": "python",
      "mistake": "Leaving the default 100 Mbps reference bandwidth in a network of gigabit links, so every link costs 1 and OSPF cannot tell a 1 Gbps link from a 10 Gbps link.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Cost and Metrics, but it does not work correctly.",
       "buggyCode": "cost = 1_000_000_000 // 100_000_000  # bandwidth divided by reference: backwards",
       "fixedCode": "cost = 100_000_000 // 1_000_000_000  # reference divided by bandwidth, minimum 1",
       "explanation": "Cost is the reference bandwidth divided by the interface bandwidth, not the other way round."
      },
      "exercise": {
       "title": "Check your understanding: OSPF Cost and Metrics",
       "type": "multiple-choice",
       "instructions": "Which statement about OSPF Cost and Metrics is correct?",
       "starterCode": "",
       "solution": "OSPF cost is calculated as the reference bandwidth divided by the interface bandwidth, with a default reference of 100 Mbps, so a 10 Mbps link costs 10 and a 1 Gbps link costs 1.",
       "solutionExplanation": "OSPF cost is calculated as the reference bandwidth divided by the interface bandwidth, with a default reference of 100 Mbps, so a 10 Mbps link costs 10 and a 1 Gbps link costs 1. The other options are false: OSPF Cost and Metrics is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "OSPF cost is calculated as the reference bandwidth divided by the interface bandwidth, with a default reference of 100 Mbps, so a 10 Mbps link costs 10 and a 1 Gbps link costs 1.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of OSPF Cost and Metrics from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "OSPF Cost and Metrics can only be used once in a program",
        "OSPF Cost and Metrics requires a separate paid licence to use",
        "OSPF cost is calculated as the reference bandwidth divided by the interface bandwidth, with a default reference of 100 Mbps, so a 10 Mbps link costs 10 and a 1 Gbps link costs 1.",
        "OSPF Cost and Metrics is not available in Python",
        "OSPF Cost and Metrics only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-ospf-m2-l3",
      "slug": "netauto-protocols-ospf-m2-l3",
      "title": "OSPF Network Types",
      "concept": "OSPF treats broadcast networks, point-to-point links, and NBMA networks differently because the neighbour discovery and DR election rules depend on the medium. Broadcast networks such as Ethernet elect a DR and BDR and use multicast Hellos, while point-to-point links form an adjacency directly with no DR election. Choosing the wrong network type leaves neighbours stuck in the Init or 2-Way state.",
      "syntax": "ip ospf network broadcast\nip ospf network point-to-point",
      "exampleCode": "interface GigabitEthernet0/0\n ip ospf network broadcast\n!\ninterface Serial0/0/0\n ip ospf network point-to-point",
      "exampleLanguage": "python",
      "mistake": "Leaving a point-to-point link as the default broadcast type, so the routers waste time electing a DR that a two-router link does not need.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Network Types, but it does not work correctly.",
       "buggyCode": "interface Serial0/0/0\n ip ospf network broadcast  # two routers only",
       "fixedCode": "interface Serial0/0/0\n ip ospf network point-to-point  # two routers only",
       "explanation": "A link with exactly two routers should be point-to-point, which skips DR election; broadcast is for multi-access segments."
      },
      "exercise": {
       "title": "Check your understanding: OSPF Network Types",
       "type": "multiple-choice",
       "instructions": "Which statement about OSPF Network Types is correct?",
       "starterCode": "",
       "solution": "OSPF treats broadcast networks, point-to-point links, and NBMA networks differently because the neighbour discovery and DR election rules depend on the medium.",
       "solutionExplanation": "OSPF treats broadcast networks, point-to-point links, and NBMA networks differently because the neighbour discovery and DR election rules depend on the medium. The other options are false: OSPF Network Types is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "OSPF treats broadcast networks, point-to-point links, and NBMA networks differently because the neighbour discovery and DR election rules depend on the medium.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of OSPF Network Types from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "OSPF Network Types can only be used once in a program",
        "OSPF Network Types requires a separate paid licence to use",
        "OSPF treats broadcast networks, point-to-point links, and NBMA networks differently because the neighbour discovery and DR election rules depend on the medium.",
        "OSPF Network Types is not available in Python",
        "OSPF Network Types only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-ospf-m2-l4",
      "slug": "netauto-protocols-ospf-m2-l4",
      "title": "Your First OSPF Area Inventory",
      "concept": "An OSPF inventory lists routers, their router IDs, their areas, and their interfaces, so automation can generate consistent configuration for the whole area. Keeping the inventory in YAML means one source of truth feeds both the configuration generator and the validation checks. The same file can also record which interfaces belong to the backbone and which belong to a normal area.",
      "syntax": "routers:\n  - name: R1\n    router_id: 1.1.1.1\n    area: 0.0.0.0",
      "exampleCode": "import yaml\n\ndata = yaml.safe_load(open('ospf.yaml'))\nfor router in data['routers']:\n    print(router['name'], router['area'])",
      "exampleLanguage": "python",
      "mistake": "Listing a router in the inventory without its area, so the generator cannot decide which network statements to emit.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Your First OSPF Area Inventory, but it does not work correctly.",
       "buggyCode": "import yaml\ndata = yaml.safe_load(open('ospf.yaml'))\nfor router in data['routers']:\n    print(router['name'], router['areas'])  # key is 'area', not 'areas'",
       "fixedCode": "import yaml\ndata = yaml.safe_load(open('ospf.yaml'))\nfor router in data['routers']:\n    print(router['name'], router['area'])  # key is 'area'",
       "explanation": "The inventory records one area per router under the key 'area'; reading 'areas' raises a KeyError."
      },
      "exercise": {
       "title": "Practise Your First OSPF Area Inventory",
       "type": "write-code",
       "instructions": "Load the YAML OSPF inventory (R1 router-id 1.1.1.1 area 0.0.0.0; R2 router-id 2.2.2.2 area 0.0.0.0; R3 router-id 3.3.3.3 area 0.0.0.1) and print one line per area in the form 'Area <id>: <n> routers'. Print the areas in sorted order.",
       "starterCode": "import yaml\ndata = yaml.safe_load('routers:\\n  - name: R1\\n    router_id: 1.1.1.1\\n    area: 0.0.0.0\\n  - name: R2\\n    router_id: 2.2.2.2\\n    area: 0.0.0.0\\n  - name: R3\\n    router_id: 3.3.3.3\\n    area: 0.0.0.1\\n')\nareas = {}\n# TODO: finish the program for Your First OSPF Area Inventory below.\n",
       "solution": "import yaml\ndata = yaml.safe_load('routers:\\n  - name: R1\\n    router_id: 1.1.1.1\\n    area: 0.0.0.0\\n  - name: R2\\n    router_id: 2.2.2.2\\n    area: 0.0.0.0\\n  - name: R3\\n    router_id: 3.3.3.3\\n    area: 0.0.0.1\\n')\nareas = {}\nfor router in data[\"routers\"]:\n    areas.setdefault(router[\"area\"], 0)\n    areas[router[\"area\"]] += 1\nfor area in sorted(areas):\n    print(f\"Area {area}: {areas[area]} routers\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Your First OSPF Area Inventory technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Area 0.0.0.0: 2 routers\nArea 0.0.0.1: 1 routers",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Area 0.0.0.1: 1 routers",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Your First OSPF Area Inventory is the key idea here: An OSPF inventory lists routers, their router IDs, their areas, and their interfaces, so automation can generate consistent configuration for the whole area.",
        "approach": "Work through Your First OSPF Area Inventory step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-m2-l5",
      "slug": "netauto-protocols-ospf-m2-l5",
      "title": "Generating OSPF Interface Config",
      "concept": "OSPF interface configuration is generated from inventory data by filling a template with the process ID, the area, and each interface's network statement. One template covers every router because only the values change, not the structure. The generated configuration can be reviewed line by line before it is applied, which is the whole point of generating it instead of typing it by hand.",
      "syntax": "router ospf {{ process_id }}\n router-id {{ router_id }}\n{% for n in networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\n{% endfor %}",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('router ospf {{ pid }}\\n router-id {{ rid }}')\nprint(template.render(pid=1, rid='1.1.1.1'))",
      "exampleLanguage": "python",
      "mistake": "Writing the network statement with a subnet mask instead of a wildcard mask, so the statement matches the wrong interfaces.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Generating OSPF Interface Config, but it does not work correctly.",
       "buggyCode": "template = Template(' network {{ n.network }} {{ n.mask }} area {{ n.area }}')  # subnet mask 255.255.255.0",
       "fixedCode": "template = Template(' network {{ n.network }} {{ n.wildcard }} area {{ n.area }}')  # wildcard mask 0.0.0.255",
       "explanation": "A network statement needs a wildcard mask (0.0.0.255 for a /24), not a subnet mask; the subnet mask matches the wrong interfaces."
      },
      "exercise": {
       "title": "Practise Generating OSPF Interface Config",
       "type": "write-code",
       "instructions": "Render the OSPF configuration for process 1, router-id 1.1.1.1, with a Jinja2 template. The template prints 'router ospf <pid>', ' router-id <rid>', then one line per network in the form ' network <network> <wildcard> area <area>'. Networks: 10.0.0.0 0.0.0.255 area 0.0.0.0; 10.0.1.0 0.0.0.255 area 0.0.0.1. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'pid': 1, 'rid': '1.1.1.1', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}, {'network': '10.0.1.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.1'}]}\ntemplate = Template('router ospf {{ pid }}\\n router-id {{ rid }}\\n{% for n in networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\\n{% endfor %}')\n# TODO: finish the program for Generating OSPF Interface Config below.\n",
       "solution": "from jinja2 import Template\ndata = {'pid': 1, 'rid': '1.1.1.1', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}, {'network': '10.0.1.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.1'}]}\ntemplate = Template('router ospf {{ pid }}\\n router-id {{ rid }}\\n{% for n in networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Generating OSPF Interface Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router ospf 1\n router-id 1.1.1.1\n network 10.0.0.0 0.0.0.255 area 0.0.0.0\n network 10.0.1.0 0.0.0.255 area 0.0.0.1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " network 10.0.1.0 0.0.0.255 area 0.0.0.1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Generating OSPF Interface Config is the key idea here: OSPF interface configuration is generated from inventory data by filling a template with the process ID, the area, and each interface's network statement.",
        "approach": "Work through Generating OSPF Interface Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: OSPF Automation Foundations",
   "type": "write-code",
   "instructions": "Generate the OSPF configuration for two routers from one inventory with Jinja2. For each router print a comment line '! <name> (router-id <rid>)', then 'router ospf 1', ' router-id <rid>', then one line per network in the form ' network <network> <wildcard> area <area>'. Routers: R1 router-id 1.1.1.1 with network 10.0.0.0 0.0.0.255 area 0.0.0.0; R2 router-id 2.2.2.2 with network 10.0.0.0 0.0.0.255 area 0.0.0.0 and network 10.0.1.0 0.0.0.255 area 0.0.0.1. Print the full rendered config.",
   "starterCode": "from jinja2 import Template\ndata = {'routers': [{'name': 'R1', 'rid': '1.1.1.1', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}]}, {'name': 'R2', 'rid': '2.2.2.2', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}, {'network': '10.0.1.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.1'}]}]}\ntemplate = Template('{% for r in routers %}! {{ r.name }} (router-id {{ r.rid }})\\nrouter ospf 1\\n router-id {{ r.rid }}\\n{% for n in r.networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\\n{% endfor %}{% endfor %}')\n# TODO: finish the program for OSPF Automation Foundations Capstone below.\n",
   "solution": "from jinja2 import Template\ndata = {'routers': [{'name': 'R1', 'rid': '1.1.1.1', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}]}, {'name': 'R2', 'rid': '2.2.2.2', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}, {'network': '10.0.1.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.1'}]}]}\ntemplate = Template('{% for r in routers %}! {{ r.name }} (router-id {{ r.rid }})\\nrouter ospf 1\\n router-id {{ r.rid }}\\n{% for n in r.networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\\n{% endfor %}{% endfor %}')\nprint(template.render(**data).strip())\n",
   "solutionExplanation": "The solution builds the required data, applies the OSPF Automation Foundations Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "! R1 (router-id 1.1.1.1)\nrouter ospf 1\n router-id 1.1.1.1\n network 10.0.0.0 0.0.0.255 area 0.0.0.0\n! R2 (router-id 2.2.2.2)\nrouter ospf 1\n router-id 2.2.2.2\n network 10.0.0.0 0.0.0.255 area 0.0.0.0\n network 10.0.1.0 0.0.0.255 area 0.0.0.1",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "network 10.0.1.0 0.0.0.255 area 0.0.0.1",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through OSPF Automation Foundations Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "OSPF Automation Foundations Capstone Project",
   "description": "Generate the complete OSPF configuration for a small two-router, two-area lab from one inventory file.",
   "requirements": [
    "Generate the OSPF configuration for two routers from a single inventory with Jinja2.",
    "Apply at least three of these skills: OSPF concepts, OSPF areas, Router IDs, YAML inventories.",
    "Every network statement uses a wildcard mask and the correct area.",
    "Router IDs are unique across the inventory."
   ],
   "rubric": [
    "The generated config is complete and correct for both routers.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-bgp-config",
  "slug": "netauto-protocols-bgp-config",
  "language": "python",
  "category": "devops",
  "title": "BGP Config Generation",
  "description": "Turn BGP knowledge into generated configuration: Jinja2 templates, peer groups, route reflectors, address families, prefix lists, AS-path filters, communities, and validation of the generated config.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "Jinja2 templating",
   "BGP peer groups",
   "Route reflectors",
   "BGP address families",
   "Prefix lists",
   "AS-path filtering",
   "BGP communities",
   "Local preference and MED",
   "Multi-router generation",
   "Config validation"
  ],
  "prerequisites": [
   "netauto-protocols-bgp",
   "netauto-protocols-ospf"
  ],
  "analogy": "Learning {topic} is like learning to print form letters: one template and a mailing list produce a personalised letter for every recipient.",
  "modules": [
   {
    "id": "netauto-protocols-bgp-config-m1",
    "title": "BGP Config Generation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-bgp-config-m1-l1",
      "slug": "netauto-protocols-bgp-config-m1-l1",
      "title": "Templating BGP Configs with Jinja2",
      "concept": "A Jinja2 template turns BGP configuration into a fill-in-the-blanks document where the neighbour address, remote ASN, and description come from data. Loops in the template repeat the neighbour block for every peer, and conditionals include optional lines such as a description only when one is defined. Templates remove the copy-and-paste errors that come from editing each router's config by hand.",
      "syntax": "router bgp {{ asn }}\n{% for n in neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\n{% if n.description %} neighbor {{ n.address }} description {{ n.description }}\n{% endif %}{% endfor %}",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('router bgp {{ asn }}')\nprint(template.render(asn=64512))",
      "exampleLanguage": "python",
      "mistake": "Writing a separate template per router instead of one template driven by data, which defeats the purpose of templating.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Templating BGP Configs with Jinja2, but it does not work correctly.",
       "buggyCode": "template = Template('router bgp 64512\\n neighbor 192.0.2.1 remote-as 64513')  # values baked in",
       "fixedCode": "template = Template('router bgp {{ asn }}\\n neighbor {{ peer }} remote-as {{ remote_as }}')  # values from data",
       "explanation": "Baking the ASN and peer address into the template means a new template for every router; the values belong in the data, not the template."
      },
      "exercise": {
       "title": "Practise Templating BGP Configs with Jinja2",
       "type": "write-code",
       "instructions": "Render the BGP configuration for AS 64512 with a Jinja2 template that prints 'router bgp <asn>' and, for each neighbour, ' neighbor <address> remote-as <remote_as>' plus a description line only when the neighbour has one. Neighbours: 192.0.2.1 AS 64513 with description uplink-to-R2; 192.0.2.2 AS 64514 with no description. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'neighbors': [{'address': '192.0.2.1', 'remote_as': 64513, 'description': 'uplink-to-R2'}, {'address': '192.0.2.2', 'remote_as': 64514, 'description': None}]}\ntemplate = Template('router bgp {{ asn }}\\n{% for n in neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\\n{% if n.description %} neighbor {{ n.address }} description {{ n.description }}\\n{% endif %}{% endfor %}')\n# TODO: finish the program for Templating BGP Configs with Jinja2 below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'neighbors': [{'address': '192.0.2.1', 'remote_as': 64513, 'description': 'uplink-to-R2'}, {'address': '192.0.2.2', 'remote_as': 64514, 'description': None}]}\ntemplate = Template('router bgp {{ asn }}\\n{% for n in neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\\n{% if n.description %} neighbor {{ n.address }} description {{ n.description }}\\n{% endif %}{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Templating BGP Configs with Jinja2 technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n neighbor 192.0.2.1 description uplink-to-R2\n neighbor 192.0.2.2 remote-as 64514",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " neighbor 192.0.2.2 remote-as 64514",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Templating BGP Configs with Jinja2 is the key idea here: A Jinja2 template turns BGP configuration into a fill-in-the-blanks document where the neighbour address, remote ASN, and description come from data.",
        "approach": "Work through Templating BGP Configs with Jinja2 step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-config-m1-l2",
      "slug": "netauto-protocols-bgp-config-m1-l2",
      "title": "BGP Neighbor Groups and Peer Groups",
      "concept": "A BGP peer group applies one set of settings, such as timers, filters, and policies, to many neighbours at once, so changing the group changes every member. Neighbours inherit the group's settings and only override the values that differ, which keeps large configurations short and consistent. When a new neighbour joins the group it automatically gets the group's policies, which is why peer groups are the standard way to manage many similar peers.",
      "syntax": "neighbor TRANSIT peer-group\nneighbor TRANSIT remote-as 64513\nneighbor 192.0.2.1 peer-group TRANSIT",
      "exampleCode": "router bgp 64512\n neighbor TRANSIT peer-group\n neighbor TRANSIT remote-as 64513\n neighbor 192.0.2.1 peer-group TRANSIT\n neighbor 192.0.2.2 peer-group TRANSIT",
      "exampleLanguage": "python",
      "mistake": "Copying the same timers and filters onto every neighbour by hand instead of putting them in a peer group, so a policy change means editing twenty neighbours.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Neighbor Groups and Peer Groups, but it does not work correctly.",
       "buggyCode": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n neighbor 192.0.2.1 timers 30 90\n neighbor 192.0.2.2 remote-as 64513\n neighbor 192.0.2.2 timers 30 90  # same settings repeated",
       "fixedCode": "router bgp 64512\n neighbor TRANSIT peer-group\n neighbor TRANSIT remote-as 64513\n neighbor TRANSIT timers 30 90\n neighbor 192.0.2.1 peer-group TRANSIT\n neighbor 192.0.2.2 peer-group TRANSIT",
       "explanation": "Settings shared by many neighbours belong in the peer group; repeating them per neighbour means a later change has to be made in every place."
      },
      "exercise": {
       "title": "Practise BGP Neighbor Groups and Peer Groups",
       "type": "write-code",
       "instructions": "Render the BGP peer-group configuration for AS 64512 with Jinja2: print 'router bgp <asn>', ' neighbor <group> peer-group', ' neighbor <group> remote-as <remote_as>', ' neighbor <group> timers 30 90', then one line per member in the form ' neighbor <address> peer-group <group>'. Group TRANSIT remote-as 64513 with members 192.0.2.1 and 192.0.2.2. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'group': 'TRANSIT', 'remote_as': 64513, 'members': ['192.0.2.1', '192.0.2.2']}\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ group }} peer-group\\n neighbor {{ group }} remote-as {{ remote_as }}\\n neighbor {{ group }} timers 30 90\\n{% for m in members %} neighbor {{ m }} peer-group {{ group }}\\n{% endfor %}')\n# TODO: finish the program for BGP Neighbor Groups and Peer Groups below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'group': 'TRANSIT', 'remote_as': 64513, 'members': ['192.0.2.1', '192.0.2.2']}\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ group }} peer-group\\n neighbor {{ group }} remote-as {{ remote_as }}\\n neighbor {{ group }} timers 30 90\\n{% for m in members %} neighbor {{ m }} peer-group {{ group }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the BGP Neighbor Groups and Peer Groups technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n neighbor TRANSIT peer-group\n neighbor TRANSIT remote-as 64513\n neighbor TRANSIT timers 30 90\n neighbor 192.0.2.1 peer-group TRANSIT\n neighbor 192.0.2.2 peer-group TRANSIT",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " neighbor 192.0.2.2 peer-group TRANSIT",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "BGP Neighbor Groups and Peer Groups is the key idea here: A BGP peer group applies one set of settings, such as timers, filters, and policies, to many neighbours at once, so changing the group changes every member.",
        "approach": "Work through BGP Neighbor Groups and Peer Groups step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-config-m1-l3",
      "slug": "netauto-protocols-bgp-config-m1-l3",
      "title": "Route Reflectors in Config",
      "concept": "A route reflector lets iBGP scale without a full mesh: clients peer only with the reflector, and the reflector re-advertises iBGP-learned routes between its clients. A route learned from a client is reflected to other clients and to non-clients, while a route learned from a non-client is reflected only to clients. The cluster ID and originator ID attributes prevent loops when several reflectors serve the same clients.",
      "syntax": "neighbor 10.0.0.2 route-reflector-client\nbgp cluster-id 1.1.1.1",
      "exampleCode": "router bgp 64512\n neighbor 10.0.0.2 remote-as 64512\n neighbor 10.0.0.2 route-reflector-client\n neighbor 10.0.0.3 remote-as 64512\n neighbor 10.0.0.3 route-reflector-client",
      "exampleLanguage": "python",
      "mistake": "Marking every iBGP neighbour as a route-reflector client, including the other reflectors, which creates reflection loops between reflectors.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Route Reflectors in Config, but it does not work correctly.",
       "buggyCode": "router bgp 64512\n neighbor 10.0.0.9 remote-as 64512\n neighbor 10.0.0.9 route-reflector-client  # 10.0.0.9 is another reflector",
       "fixedCode": "router bgp 64512\n neighbor 10.0.0.9 remote-as 64512  # another reflector is a non-client peer",
       "explanation": "Route reflectors peer with each other as non-clients; marking a fellow reflector as a client makes it reflect routes back and can loop."
      },
      "exercise": {
       "title": "Check your understanding: Route Reflectors in Config",
       "type": "multiple-choice",
       "instructions": "Which statement about Route Reflectors in Config is correct?",
       "starterCode": "",
       "solution": "A route reflector lets iBGP scale without a full mesh: clients peer only with the reflector, and the reflector re-advertises iBGP-learned routes between its clients.",
       "solutionExplanation": "A route reflector lets iBGP scale without a full mesh: clients peer only with the reflector, and the reflector re-advertises iBGP-learned routes between its clients. The other options are false: Route Reflectors in Config is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A route reflector lets iBGP scale without a full mesh: clients peer only with the reflector, and the reflector re-advertises iBGP-learned routes between its clients.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Route Reflectors in Config from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "A route reflector lets iBGP scale without a full mesh: clients peer only with the reflector, and the reflector re-advertises iBGP-learned routes between its clients.",
        "Route Reflectors in Config can only be used once in a program",
        "Route Reflectors in Config requires a separate paid licence to use",
        "Route Reflectors in Config is not available in Python",
        "Route Reflectors in Config only works when the program prints text"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-protocols-bgp-config-m1-l4",
      "slug": "netauto-protocols-bgp-config-m1-l4",
      "title": "BGP Address Families",
      "concept": "BGP address families separate routing information by type, so IPv4 unicast, IPv6 unicast, and EVPN routes each have their own configuration section under the same BGP process. A neighbour must be activated in an address family before routes of that type are exchanged, and policies such as prefix filters apply per address family. Keeping families separate lets one BGP session carry several kinds of routes without them interfering with each other.",
      "syntax": "address-family ipv4 unicast\n neighbor 192.0.2.1 activate\naddress-family ipv6 unicast\n neighbor 2001:db8::1 activate",
      "exampleCode": "router bgp 64512\n address-family ipv4 unicast\n  neighbor 192.0.2.1 activate\n exit-address-family\n address-family ipv6 unicast\n  neighbor 2001:db8::1 activate\n exit-address-family",
      "exampleLanguage": "python",
      "mistake": "Configuring a neighbour under the BGP process but never activating it in the address family, so no routes of that type are ever exchanged.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Address Families, but it does not work correctly.",
       "buggyCode": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n address-family ipv4 unicast\n  network 203.0.113.0 mask 255.255.255.0  # neighbour never activated",
       "fixedCode": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n address-family ipv4 unicast\n  neighbor 192.0.2.1 activate\n  network 203.0.113.0 mask 255.255.255.0",
       "explanation": "A neighbour exchanges no routes in an address family until it is activated there, even if the session itself is Established."
      },
      "exercise": {
       "title": "Practise BGP Address Families",
       "type": "write-code",
       "instructions": "Render the BGP address-family configuration for AS 64512 with Jinja2: print 'router bgp <asn>', then for each family print ' address-family <name>', one line per neighbour in the form '  neighbor <address> activate', and ' exit-address-family'. Families: ipv4 unicast with neighbour 192.0.2.1; ipv6 unicast with neighbour 2001:db8::1. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'families': [{'name': 'ipv4 unicast', 'neighbors': ['192.0.2.1']}, {'name': 'ipv6 unicast', 'neighbors': ['2001:db8::1']}]}\ntemplate = Template('router bgp {{ asn }}\\n{% for f in families %} address-family {{ f.name }}\\n{% for n in f.neighbors %}  neighbor {{ n }} activate\\n{% endfor %} exit-address-family\\n{% endfor %}')\n# TODO: finish the program for BGP Address Families below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'families': [{'name': 'ipv4 unicast', 'neighbors': ['192.0.2.1']}, {'name': 'ipv6 unicast', 'neighbors': ['2001:db8::1']}]}\ntemplate = Template('router bgp {{ asn }}\\n{% for f in families %} address-family {{ f.name }}\\n{% for n in f.neighbors %}  neighbor {{ n }} activate\\n{% endfor %} exit-address-family\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the BGP Address Families technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n address-family ipv4 unicast\n  neighbor 192.0.2.1 activate\n exit-address-family\n address-family ipv6 unicast\n  neighbor 2001:db8::1 activate\n exit-address-family",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " exit-address-family",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "BGP Address Families is the key idea here: BGP address families separate routing information by type, so IPv4 unicast, IPv6 unicast, and EVPN routes each have their own configuration section under the same BGP process.",
        "approach": "Work through BGP Address Families step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-config-m1-l5",
      "slug": "netauto-protocols-bgp-config-m1-l5",
      "title": "Prefix Lists for BGP",
      "concept": "A prefix list matches routes by network address and prefix length, and it is the standard way to filter what BGP accepts or advertises. An entry such as 203.0.113.0/24 le 32 matches the /24 and every more-specific prefix inside it, while the same entry without le matches only the exact /24. Prefix lists are processed top to bottom and end with an implicit deny, so a final permit entry is needed to allow anything else through.",
      "syntax": "ip prefix-list CUSTOMERS seq 10 permit 203.0.113.0/24 le 32",
      "exampleCode": "import ipaddress\n\nnet = ipaddress.ip_network('203.0.113.0/24')\nprint(ipaddress.ip_network('203.0.113.128/25').subnet_of(net))  # True",
      "exampleLanguage": "python",
      "mistake": "Forgetting the implicit deny at the end of a prefix list, so a list that only permits one prefix silently drops everything else.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Prefix Lists for BGP, but it does not work correctly.",
       "buggyCode": "ip prefix-list WEB seq 10 permit 203.0.113.0/24\nip prefix-list WEB seq 20 deny 0.0.0.0/0 le 32  # explicit deny is not needed",
       "fixedCode": "ip prefix-list WEB seq 10 permit 203.0.113.0/24\nip prefix-list WEB seq 20 permit 0.0.0.0/0 le 32  # explicit permit for the rest",
       "explanation": "A prefix list ends with an implicit deny, so allowing anything else needs an explicit permit entry; an explicit deny adds nothing."
      },
      "exercise": {
       "title": "Practise Prefix Lists for BGP",
       "type": "write-code",
       "instructions": "Test four candidate prefixes against the prefix list '203.0.113.0/24 le 32' (permit any prefix inside 203.0.113.0/24 with length 24 to 32) and print one line per candidate in the form '<prefix>: permitted by seq 10' or '<prefix>: denied'. Candidates: 203.0.113.0/24, 203.0.113.128/25, 203.0.113.0/23, 198.51.100.0/24.",
       "starterCode": "import ipaddress\n\nbase = ipaddress.ip_network(\"203.0.113.0/24\")\ncandidates = [\"203.0.113.0/24\", \"203.0.113.128/25\", \"203.0.113.0/23\", \"198.51.100.0/24\"]\n# TODO: finish the program for Prefix Lists for BGP below.\n",
       "solution": "import ipaddress\n\nbase = ipaddress.ip_network(\"203.0.113.0/24\")\ncandidates = [\"203.0.113.0/24\", \"203.0.113.128/25\", \"203.0.113.0/23\", \"198.51.100.0/24\"]\nfor cand in candidates:\n    net = ipaddress.ip_network(cand, strict=False)\n    if net.subnet_of(base) and 24 <= net.prefixlen <= 32:\n        print(f\"{cand}: permitted by seq 10\")\n    else:\n        print(f\"{cand}: denied\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Prefix Lists for BGP technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "203.0.113.0/24: permitted by seq 10\n203.0.113.128/25: permitted by seq 10\n203.0.113.0/23: denied\n198.51.100.0/24: denied",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "198.51.100.0/24: denied",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Prefix Lists for BGP is the key idea here: A prefix list matches routes by network address and prefix length, and it is the standard way to filter what BGP accepts or advertises.",
        "approach": "Work through Prefix Lists for BGP step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-bgp-config-m2",
    "title": "BGP Config Generation in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-protocols-bgp-config-m2-l1",
      "slug": "netauto-protocols-bgp-config-m2-l1",
      "title": "AS-Path Filtering",
      "concept": "An AS-path access list matches BGP routes by the list of autonomous systems in their AS path, using regular expressions such as ^64512_ to match paths that start with AS 64512. The underscore in these expressions matches the boundary between AS numbers, spaces, or the start and end of the path. AS-path filters are commonly used to reject routes that have already passed through your own AS, which would be a loop.",
      "syntax": "ip as-path access-list 1 deny ^64512_\nip as-path access-list 1 permit .*",
      "exampleCode": "import re\n\nprint(bool(re.search(r'^64512\\b', '64512 64513 64520')))  # True: path starts with AS 64512",
      "exampleLanguage": "python",
      "mistake": "Writing the pattern 64512 without anchors, so it matches any path containing 64512 anywhere instead of only paths that start with it.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate AS-Path Filtering, but it does not work correctly.",
       "buggyCode": "import re\npattern = '64512'  # matches 64512 anywhere in the path",
       "fixedCode": "import re\npattern = r'^64512_'  # matches only paths that start with 64512",
       "explanation": "Without the ^ anchor and the underscore boundary, the pattern matches AS 64512 in any position, including the middle of a legitimate path."
      },
      "exercise": {
       "title": "Practise AS-Path Filtering",
       "type": "write-code",
       "instructions": "Test three AS paths against the filter '^64512_' (deny paths that start with AS 64512) and print one line per path in the form '<path>: denied' or '<path>: permitted'. Paths: '64512 64513 64520', '64513 64512 64520', '64513 64520'.",
       "starterCode": "import re\n\n# BGP uses _ for an AS boundary; in Python a word boundary does the same job.\npattern = re.compile(r\"^64512\\b\")\npaths = [\"64512 64513 64520\", \"64513 64512 64520\", \"64513 64520\"]\n# TODO: finish the program for AS-Path Filtering below.\n",
       "solution": "import re\n\n# BGP uses _ for an AS boundary; in Python a word boundary does the same job.\npattern = re.compile(r\"^64512\\b\")\npaths = [\"64512 64513 64520\", \"64513 64512 64520\", \"64513 64520\"]\nfor path in paths:\n    if pattern.search(path):\n        print(f\"{path}: denied\")\n    else:\n        print(f\"{path}: permitted\")\n",
       "solutionExplanation": "The solution builds the required data, applies the AS-Path Filtering technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "64512 64513 64520: denied\n64513 64512 64520: permitted\n64513 64520: permitted",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "64513 64520: permitted",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "AS-Path Filtering is the key idea here: An AS-path access list matches BGP routes by the list of autonomous systems in their AS path, using regular expressions such as ^64512_ to match paths that start with AS 64512.",
        "approach": "Work through AS-Path Filtering step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-config-m2-l2",
      "slug": "netauto-protocols-bgp-config-m2-l2",
      "title": "BGP Communities in Config",
      "concept": "A BGP community is a 32-bit tag attached to a route, written as ASN:value, that tells other routers how to treat it, for example to prefer a path or to stop advertising it further. The well-known communities no-export (65535:65281) and no-advertise (65535:65282) are understood by every BGP speaker. Communities are set with route maps and matched with community lists, which makes them the standard tool for signalling policy between networks.",
      "syntax": "ip community-list 10 permit 64512:100\nroute-map SET-COMM permit 10\n set community 64512:100",
      "exampleCode": "route-map SET-COMM permit 10\n match ip address prefix-list CUSTOMERS\n set community 64512:100\n!\nroute-map SET-COMM permit 20\n set community no-export",
      "exampleLanguage": "python",
      "mistake": "Forgetting the send-community setting on the neighbour, so communities are stripped before the route leaves the router.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Communities in Config, but it does not work correctly.",
       "buggyCode": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n neighbor 192.0.2.1 route-map SET-COMM out  # no send-community",
       "fixedCode": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n neighbor 192.0.2.1 send-community\n neighbor 192.0.2.1 route-map SET-COMM out",
       "explanation": "Communities are not sent to a neighbour unless send-community is configured; without it the route map sets a tag that is immediately dropped."
      },
      "exercise": {
       "title": "Check your understanding: BGP Communities in Config",
       "type": "multiple-choice",
       "instructions": "Which statement about BGP Communities in Config is correct?",
       "starterCode": "",
       "solution": "A BGP community is a 32-bit tag attached to a route, written as ASN:value, that tells other routers how to treat it, for example to prefer a path or to stop advertising it further.",
       "solutionExplanation": "A BGP community is a 32-bit tag attached to a route, written as ASN:value, that tells other routers how to treat it, for example to prefer a path or to stop advertising it further. The other options are false: BGP Communities in Config is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A BGP community is a 32-bit tag attached to a route, written as ASN:value, that tells other routers how to treat it, for example to prefer a path or to stop advertising it further.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of BGP Communities in Config from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "BGP Communities in Config can only be used once in a program",
        "BGP Communities in Config requires a separate paid licence to use",
        "A BGP community is a 32-bit tag attached to a route, written as ASN:value, that tells other routers how to treat it, for example to prefer a path or to stop advertising it further.",
        "BGP Communities in Config is not available in Python",
        "BGP Communities in Config only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-bgp-config-m2-l3",
      "slug": "netauto-protocols-bgp-config-m2-l3",
      "title": "Local Preference and MED",
      "concept": "Local preference is a BGP attribute that decides which exit a router prefers when several paths leave the autonomous system, and the highest value wins. The multi-exit discriminator (MED) is the opposite: it is a hint from a neighbouring AS about which entry point it prefers, and the lowest MED wins when the other attributes tie. Local preference is only shared inside your own AS, while MED is only compared between paths from the same neighbouring AS.",
      "syntax": "route-map SET-LP permit 10\n set local-preference 200\nroute-map SET-MED permit 10\n set metric 50",
      "exampleCode": "route-map PREFER-TRANSIT permit 10\n match community 64512:100\n set local-preference 200\n set metric 50",
      "exampleLanguage": "python",
      "mistake": "Comparing MED values between paths from different neighbouring ASes, which BGP does not do by default.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Local Preference and MED, but it does not work correctly.",
       "buggyCode": "# path A from AS 64513 MED 10, path B from AS 64514 MED 100: B wins on MED",
       "fixedCode": "# path A from AS 64513 MED 10, path B from AS 64514 MED 100: MED is not compared across ASes",
       "explanation": "MED is only compared between paths from the same neighbouring AS, so a MED of 10 from one AS never beats a MED of 100 from another AS."
      },
      "exercise": {
       "title": "Practise Local Preference and MED",
       "type": "write-code",
       "instructions": "Three candidate paths reach 203.0.113.0/24 from the same neighbouring AS 64513. Print one line per candidate in the form 'Candidate via <neighbor>: local-pref <lp>, MED <m>', then print 'Best path for 203.0.113.0/24: via <neighbor>'. Choose the best by highest local preference, then lowest MED. Candidates: via 192.0.2.1 local-pref 100 MED 50; via 192.0.2.2 local-pref 100 MED 10; via 192.0.2.3 local-pref 200 MED 100.",
       "starterCode": "routes = [\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.1\", \"local_pref\": 100, \"med\": 50},\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.2\", \"local_pref\": 100, \"med\": 10},\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.3\", \"local_pref\": 200, \"med\": 100},\n]\n# TODO: finish the program for Local Preference and MED below.\n",
       "solution": "routes = [\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.1\", \"local_pref\": 100, \"med\": 50},\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.2\", \"local_pref\": 100, \"med\": 10},\n    {\"prefix\": \"203.0.113.0/24\", \"neighbor\": \"192.0.2.3\", \"local_pref\": 200, \"med\": 100},\n]\nfor r in routes:\n    print(f\"Candidate via {r['neighbor']}: local-pref {r['local_pref']}, MED {r['med']}\")\nbest = min(routes, key=lambda r: (-r[\"local_pref\"], r[\"med\"]))\nprint(f\"Best path for {best['prefix']}: via {best['neighbor']}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Local Preference and MED technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Candidate via 192.0.2.1: local-pref 100, MED 50\nCandidate via 192.0.2.2: local-pref 100, MED 10\nCandidate via 192.0.2.3: local-pref 200, MED 100\nBest path for 203.0.113.0/24: via 192.0.2.3",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Best path for 203.0.113.0/24: via 192.0.2.3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Local Preference and MED is the key idea here: Local preference is a BGP attribute that decides which exit a router prefers when several paths leave the autonomous system, and the highest value wins.",
        "approach": "Work through Local Preference and MED step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-config-m2-l4",
      "slug": "netauto-protocols-bgp-config-m2-l4",
      "title": "Multi-Router BGP Config from One Inventory",
      "concept": "One inventory file can generate the BGP configuration for every router in the network, because the template loops over routers and each router's neighbours in turn. The same template produces a small config for a leaf router with two neighbours and a large config for a core router with twenty. Generating all configs from one source guarantees that neighbour statements agree on both sides of every session.",
      "syntax": "{% for r in routers %}router bgp {{ r.asn }}\n{% for n in r.neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\n{% endfor %}{% endfor %}",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('{% for r in routers %}{{ r.name }}: {{ r.neighbors | length }} neighbors\\n{% endfor %}')\nprint(template.render(routers=[{'name': 'R1', 'neighbors': [1, 2]}]))",
      "exampleLanguage": "python",
      "mistake": "Generating each router's config from a different inventory file, so the two sides of a session can disagree about the ASN.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Multi-Router BGP Config from One Inventory, but it does not work correctly.",
       "buggyCode": "# R1 inventory says the peer is AS 64513; R2 inventory says it is AS 64514",
       "fixedCode": "# one inventory lists both routers, so the peer ASN agrees on both sides",
       "explanation": "One shared inventory is the only way to guarantee both sides of a session use the same peer ASN."
      },
      "exercise": {
       "title": "Practise Multi-Router BGP Config from One Inventory",
       "type": "write-code",
       "instructions": "Render the BGP configuration for three routers from one inventory with Jinja2: for each router print '! <name> (AS <asn>)', 'router bgp <asn>', then one line per neighbour in the form ' neighbor <address> remote-as <remote_as>'. Routers: R1 AS 64512 neighbours 192.0.2.2 AS 64513; R2 AS 64513 neighbours 192.0.2.1 AS 64512 and 192.0.2.3 AS 64514; R3 AS 64514 neighbours 192.0.2.2 AS 64513. Print the full rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'routers': [{'name': 'R1', 'asn': 64512, 'neighbors': [{'address': '192.0.2.2', 'remote_as': 64513}]}, {'name': 'R2', 'asn': 64513, 'neighbors': [{'address': '192.0.2.1', 'remote_as': 64512}, {'address': '192.0.2.3', 'remote_as': 64514}]}, {'name': 'R3', 'asn': 64514, 'neighbors': [{'address': '192.0.2.2', 'remote_as': 64513}]}]}\ntemplate = Template('{% for r in routers %}! {{ r.name }} (AS {{ r.asn }})\\nrouter bgp {{ r.asn }}\\n{% for n in r.neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\\n{% endfor %}{% endfor %}')\n# TODO: finish the program for Multi-Router BGP Config from One Inventory below.\n",
       "solution": "from jinja2 import Template\ndata = {'routers': [{'name': 'R1', 'asn': 64512, 'neighbors': [{'address': '192.0.2.2', 'remote_as': 64513}]}, {'name': 'R2', 'asn': 64513, 'neighbors': [{'address': '192.0.2.1', 'remote_as': 64512}, {'address': '192.0.2.3', 'remote_as': 64514}]}, {'name': 'R3', 'asn': 64514, 'neighbors': [{'address': '192.0.2.2', 'remote_as': 64513}]}]}\ntemplate = Template('{% for r in routers %}! {{ r.name }} (AS {{ r.asn }})\\nrouter bgp {{ r.asn }}\\n{% for n in r.neighbors %} neighbor {{ n.address }} remote-as {{ n.remote_as }}\\n{% endfor %}{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Multi-Router BGP Config from One Inventory technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "! R1 (AS 64512)\nrouter bgp 64512\n neighbor 192.0.2.2 remote-as 64513\n! R2 (AS 64513)\nrouter bgp 64513\n neighbor 192.0.2.1 remote-as 64512\n neighbor 192.0.2.3 remote-as 64514\n! R3 (AS 64514)\nrouter bgp 64514\n neighbor 192.0.2.2 remote-as 64513",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " neighbor 192.0.2.2 remote-as 64513",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Multi-Router BGP Config from One Inventory is the key idea here: One inventory file can generate the BGP configuration for every router in the network, because the template loops over routers and each router's neighbours in turn.",
        "approach": "Work through Multi-Router BGP Config from One Inventory step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-config-m2-l5",
      "slug": "netauto-protocols-bgp-config-m2-l5",
      "title": "Validating Generated BGP Config",
      "concept": "A generated BGP configuration is validated by checking that every required statement is present: the router bgp line with a valid ASN, a neighbour statement for every peer in the inventory, and a remote-as that matches the peer's real ASN. Validation runs before the config is applied, so a typo in an ASN is caught by a script instead of breaking a session. A config that fails validation is never written to a router.",
      "syntax": "assert 'router bgp 64512' in config\nassert 'neighbor 192.0.2.1 remote-as 64513' in config",
      "exampleCode": "config = 'router bgp 64512\\n neighbor 192.0.2.1 remote-as 64513'\nprint('router bgp 64512' in config)  # True",
      "exampleLanguage": "python",
      "mistake": "Validating only that the config file exists, without checking that the neighbour statements match the inventory.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Validating Generated BGP Config, but it does not work correctly.",
       "buggyCode": "checks = ['router bgp' in config]  # only checks the process line",
       "fixedCode": "checks = ['router bgp 64512' in config, 'neighbor 192.0.2.1 remote-as 64513' in config]",
       "explanation": "Checking only the process line misses a wrong remote-as; every neighbour statement must be checked against the inventory."
      },
      "exercise": {
       "title": "Practise Validating Generated BGP Config",
       "type": "write-code",
       "instructions": "Validate a generated BGP config against the inventory (AS 64512, neighbour 192.0.2.1 remote-as 64513, neighbour 192.0.2.2 remote-as 64514). The config is missing the second neighbour statement. Check each required line, print 'PASS: <line>' for each line found and 'FAIL: missing <line>' for each line absent, then print 'Validation: 2 passed, 1 failed'.",
       "starterCode": "config = \"\"\"router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n\"\"\"\nrequired = [\n    \"router bgp 64512\",\n    \"neighbor 192.0.2.1 remote-as 64513\",\n    \"neighbor 192.0.2.2 remote-as 64514\",\n]\npassed = 0\n# TODO: finish the program for Validating Generated BGP Config below.\n",
       "solution": "config = \"\"\"router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n\"\"\"\nrequired = [\n    \"router bgp 64512\",\n    \"neighbor 192.0.2.1 remote-as 64513\",\n    \"neighbor 192.0.2.2 remote-as 64514\",\n]\npassed = 0\nfor line in required:\n    if line in config:\n        print(f\"PASS: {line}\")\n        passed += 1\n    else:\n        print(f\"FAIL: missing {line}\")\nprint(f\"Validation: {passed} passed, {len(required) - passed} failed\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Validating Generated BGP Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: router bgp 64512\nPASS: neighbor 192.0.2.1 remote-as 64513\nFAIL: missing neighbor 192.0.2.2 remote-as 64514\nValidation: 2 passed, 1 failed",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Validation: 2 passed, 1 failed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating Generated BGP Config is the key idea here: A generated BGP configuration is validated by checking that every required statement is present: the router bgp line with a valid ASN, a neighbour statement for every peer in the inventory, and a remote-as that matches the peer's real ASN.",
        "approach": "Work through Validating Generated BGP Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: BGP Config Generation",
   "type": "write-code",
   "instructions": "Generate the BGP configuration for AS 64512 with a peer group and address families using Jinja2. Print 'router bgp 64512', ' neighbor TRANSIT peer-group', ' neighbor TRANSIT remote-as 64513', ' address-family ipv4 unicast', '  neighbor TRANSIT activate', ' exit-address-family', then one line per member in the form ' neighbor <address> peer-group TRANSIT'. Members: 192.0.2.1 and 192.0.2.2. Print the full rendered config.",
   "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'group': 'TRANSIT', 'remote_as': 64513, 'members': ['192.0.2.1', '192.0.2.2']}\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ group }} peer-group\\n neighbor {{ group }} remote-as {{ remote_as }}\\n address-family ipv4 unicast\\n  neighbor {{ group }} activate\\n exit-address-family\\n{% for m in members %} neighbor {{ m }} peer-group {{ group }}\\n{% endfor %}')\n# TODO: finish the program for BGP Config Generation Capstone below.\n",
   "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'group': 'TRANSIT', 'remote_as': 64513, 'members': ['192.0.2.1', '192.0.2.2']}\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ group }} peer-group\\n neighbor {{ group }} remote-as {{ remote_as }}\\n address-family ipv4 unicast\\n  neighbor {{ group }} activate\\n exit-address-family\\n{% for m in members %} neighbor {{ m }} peer-group {{ group }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
   "solutionExplanation": "The solution builds the required data, applies the BGP Config Generation Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "router bgp 64512\n neighbor TRANSIT peer-group\n neighbor TRANSIT remote-as 64513\n address-family ipv4 unicast\n  neighbor TRANSIT activate\n exit-address-family\n neighbor 192.0.2.1 peer-group TRANSIT\n neighbor 192.0.2.2 peer-group TRANSIT",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "neighbor 192.0.2.2 peer-group TRANSIT",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through BGP Config Generation Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "BGP Config Generation Capstone Project",
   "description": "Generate a complete BGP configuration with a peer group and an IPv4 address family from one inventory.",
   "requirements": [
    "Generate the BGP configuration with a peer group and address family from a single inventory with Jinja2.",
    "Apply at least three of these skills: Jinja2 templating, BGP peer groups, BGP address families, Config validation.",
    "Every neighbour is a member of the peer group, not configured by hand.",
    "Validate the generated config against the inventory before finishing."
   ],
   "rubric": [
    "The generated config is complete and correct for the whole group.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-ospf-config",
  "slug": "netauto-protocols-ospf-config",
  "language": "python",
  "category": "devops",
  "title": "OSPF Config Generation",
  "description": "Turn OSPF knowledge into generated configuration: Jinja2 templates, network statements, stub and NSSA areas, authentication, cost tuning, summarization, and validation of the generated config.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "OSPF templating",
   "Network statements",
   "Stub and NSSA areas",
   "OSPF authentication",
   "OSPF cost tuning",
   "Route summarization",
   "Virtual links",
   "Redistribution",
   "Multi-area generation",
   "Config validation"
  ],
  "prerequisites": [
   "netauto-protocols-ospf",
   "netauto-protocols-bgp-config"
  ],
  "analogy": "Learning {topic} is like learning to lay out a road atlas: each area gets its own page, and the backbone page ties them all together.",
  "modules": [
   {
    "id": "netauto-protocols-ospf-config-m1",
    "title": "OSPF Config Generation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-ospf-config-m1-l1",
      "slug": "netauto-protocols-ospf-config-m1-l1",
      "title": "Templating OSPF Configs with Jinja2",
      "concept": "A Jinja2 template generates OSPF configuration from router data, emitting the router ospf block, the router ID, and one network statement per interface. Because the template is data-driven, adding an interface to the inventory adds its network statement to every generated config automatically. The same template serves a single-area router and a multi-area area border router.",
      "syntax": "router ospf {{ pid }}\n router-id {{ rid }}\n{% for n in networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\n{% endfor %}",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('router ospf {{ pid }}\\n router-id {{ rid }}')\nprint(template.render(pid=1, rid='1.1.1.1'))",
      "exampleLanguage": "python",
      "mistake": "Writing the network statements by hand in the template instead of looping over the interface list, so a new interface means editing the template.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Templating OSPF Configs with Jinja2, but it does not work correctly.",
       "buggyCode": "template = Template('router ospf 1\\n network 10.0.0.0 0.0.0.255 area 0')  # fixed networks",
       "fixedCode": "template = Template('router ospf {{ pid }}\\n{% for n in networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\\n{% endfor %}')",
       "explanation": "Fixed network statements in the template cannot follow the inventory; the loop generates one statement per interface in the data."
      },
      "exercise": {
       "title": "Practise Templating OSPF Configs with Jinja2",
       "type": "write-code",
       "instructions": "Render the OSPF configuration for process 1, router-id 1.1.1.1, with a Jinja2 template: print 'router ospf <pid>', ' router-id <rid>', then one line per network in the form ' network <network> <wildcard> area <area>'. Networks: 10.0.0.0 0.0.0.255 area 0.0.0.0; 10.0.2.0 0.0.0.255 area 0.0.0.0. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'pid': 1, 'rid': '1.1.1.1', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}, {'network': '10.0.2.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}]}\ntemplate = Template('router ospf {{ pid }}\\n router-id {{ rid }}\\n{% for n in networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\\n{% endfor %}')\n# TODO: finish the program for Templating OSPF Configs with Jinja2 below.\n",
       "solution": "from jinja2 import Template\ndata = {'pid': 1, 'rid': '1.1.1.1', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}, {'network': '10.0.2.0', 'wildcard': '0.0.0.255', 'area': '0.0.0.0'}]}\ntemplate = Template('router ospf {{ pid }}\\n router-id {{ rid }}\\n{% for n in networks %} network {{ n.network }} {{ n.wildcard }} area {{ n.area }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Templating OSPF Configs with Jinja2 technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router ospf 1\n router-id 1.1.1.1\n network 10.0.0.0 0.0.0.255 area 0.0.0.0\n network 10.0.2.0 0.0.0.255 area 0.0.0.0",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " network 10.0.2.0 0.0.0.255 area 0.0.0.0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Templating OSPF Configs with Jinja2 is the key idea here: A Jinja2 template generates OSPF configuration from router data, emitting the router ospf block, the router ID, and one network statement per interface.",
        "approach": "Work through Templating OSPF Configs with Jinja2 step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-config-m1-l2",
      "slug": "netauto-protocols-ospf-config-m1-l2",
      "title": "OSPF Network Statements and Interface Config",
      "concept": "An OSPF network statement matches interfaces by address and wildcard mask and assigns them to an area, for example network 10.0.0.0 0.0.0.255 area 0. The wildcard mask is the inverse of a subnet mask, so 0.0.0.255 matches the last octet of a /24 network. An interface that matches no network statement stays out of OSPF, which is why a missing statement is the most common reason a neighbour never appears.",
      "syntax": "network 10.0.0.0 0.0.0.255 area 0",
      "exampleCode": "import ipaddress\n\nnet = ipaddress.ip_network('10.0.0.0/24')\nprint(ipaddress.ip_address('10.0.0.5') in net)  # True",
      "exampleLanguage": "python",
      "mistake": "Using a wildcard mask of 0.0.0.0 for a whole /24, so the statement matches only the single network address and no interface joins OSPF.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Network Statements and Interface Config, but it does not work correctly.",
       "buggyCode": "network 10.0.0.0 0.0.0.0 area 0  # matches only 10.0.0.0 itself",
       "fixedCode": "network 10.0.0.0 0.0.0.255 area 0  # matches every address in 10.0.0.0/24",
       "explanation": "A wildcard mask of 0.0.0.0 matches exactly one address, so no interface address matches a /24 statement written that way."
      },
      "exercise": {
       "title": "Practise OSPF Network Statements and Interface Config",
       "type": "write-code",
       "instructions": "Match four interfaces to the network statement 'network 10.0.0.0 0.0.0.255 area 0' (the /24 network 10.0.0.0/24, area 0). Print one line per interface in the form '<address>: in OSPF area 0' or '<address>: not in OSPF'. Interfaces: 10.0.0.1, 10.0.0.2, 10.0.1.1, 10.0.0.254.",
       "starterCode": "import ipaddress\n\nnet = ipaddress.ip_network(\"10.0.0.0/24\")\ninterfaces = [\"10.0.0.1\", \"10.0.0.2\", \"10.0.1.1\", \"10.0.0.254\"]\n# TODO: finish the program for OSPF Network Statements and Interface Config below.\n",
       "solution": "import ipaddress\n\nnet = ipaddress.ip_network(\"10.0.0.0/24\")\ninterfaces = [\"10.0.0.1\", \"10.0.0.2\", \"10.0.1.1\", \"10.0.0.254\"]\nfor address in interfaces:\n    if ipaddress.ip_address(address) in net:\n        print(f\"{address}: in OSPF area 0\")\n    else:\n        print(f\"{address}: not in OSPF\")\n",
       "solutionExplanation": "The solution builds the required data, applies the OSPF Network Statements and Interface Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "10.0.0.1: in OSPF area 0\n10.0.0.2: in OSPF area 0\n10.0.1.1: not in OSPF\n10.0.0.254: in OSPF area 0",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "10.0.0.254: in OSPF area 0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "OSPF Network Statements and Interface Config is the key idea here: An OSPF network statement matches interfaces by address and wildcard mask and assigns them to an area, for example network 10.",
        "approach": "Work through OSPF Network Statements and Interface Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-config-m1-l3",
      "slug": "netauto-protocols-ospf-config-m1-l3",
      "title": "OSPF Area Types: Stub and NSSA",
      "concept": "A stub area blocks Type 5 external LSAs and replaces them with a default route from the area border router, which shrinks the link-state database for routers that do not need external detail. A totally stubby area goes further and blocks Type 3 summary LSAs as well, leaving only the default route. A not-so-stubby area (NSSA) allows an ASBR inside the area to inject external routes as Type 7 LSAs, which the ABR converts to Type 5 for the rest of the network.",
      "syntax": "area 1 stub\narea 1 stub no-summary  # totally stubby\narea 2 nssa",
      "exampleCode": "router ospf 1\n area 1 stub\n area 2 nssa\n network 10.0.1.0 0.0.0.255 area 1\n network 10.0.2.0 0.0.0.255 area 2",
      "exampleLanguage": "python",
      "mistake": "Making the backbone area 0 a stub area, which OSPF forbids because the backbone must carry external routes.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Area Types: Stub and NSSA, but it does not work correctly.",
       "buggyCode": "router ospf 1\n area 0 stub  # backbone as stub",
       "fixedCode": "router ospf 1\n area 1 stub  # only non-backbone areas can be stub",
       "explanation": "Area 0 can never be a stub area; the backbone must carry Type 5 external LSAs to the rest of the network."
      },
      "exercise": {
       "title": "Check your understanding: OSPF Area Types: Stub and NSSA",
       "type": "multiple-choice",
       "instructions": "Which statement about OSPF Area Types: Stub and NSSA is correct?",
       "starterCode": "",
       "solution": "A stub area blocks Type 5 external LSAs and replaces them with a default route from the area border router, which shrinks the link-state database for routers that do not need external detail.",
       "solutionExplanation": "A stub area blocks Type 5 external LSAs and replaces them with a default route from the area border router, which shrinks the link-state database for routers that do not need external detail. The other options are false: OSPF Area Types: Stub and NSSA is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A stub area blocks Type 5 external LSAs and replaces them with a default route from the area border router, which shrinks the link-state database for routers that do not need external detail.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of OSPF Area Types: Stub and NSSA from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "A stub area blocks Type 5 external LSAs and replaces them with a default route from the area border router, which shrinks the link-state database for routers that do not need external detail.",
        "OSPF Area Types: Stub and NSSA can only be used once in a program",
        "OSPF Area Types: Stub and NSSA requires a separate paid licence to use",
        "OSPF Area Types: Stub and NSSA is not available in Python",
        "OSPF Area Types: Stub and NSSA only works when the program prints text"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-protocols-ospf-config-m1-l4",
      "slug": "netauto-protocols-ospf-config-m1-l4",
      "title": "OSPF Authentication",
      "concept": "OSPF authentication proves that Hello packets come from a trusted router, and it is configured per interface or per area with a clear-text password, an MD5 key, or a SHA key. MD5 authentication adds a keyed digest to every OSPF packet, so a router without the matching key cannot form an adjacency. Authentication must match on both sides of a link, or the neighbours stay in the Down state.",
      "syntax": "ip ospf message-digest-key 1 md5 SECRET\narea 0 authentication message-digest",
      "exampleCode": "interface GigabitEthernet0/0\n ip ospf message-digest-key 1 md5 s3cret-key\n!\nrouter ospf 1\n area 0 authentication message-digest",
      "exampleLanguage": "python",
      "mistake": "Configuring authentication on one side of a link and not the other, so the neighbours never form an adjacency and the failure looks like a network problem.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Authentication, but it does not work correctly.",
       "buggyCode": "# R1: area 0 authentication message-digest; R2: no authentication configured",
       "fixedCode": "# R1 and R2 both: area 0 authentication message-digest, same key 1",
       "explanation": "Authentication must match on both sides of a link; a mismatch leaves the neighbours in the Down state with no adjacency."
      },
      "exercise": {
       "title": "Practise OSPF Authentication",
       "type": "write-code",
       "instructions": "Render the OSPF MD5 authentication configuration for two interfaces with Jinja2: for each interface print 'interface <name>', ' ip ospf message-digest-key <key_id> md5 <key>'. Interfaces: GigabitEthernet0/0 key 1 s3cret-key; GigabitEthernet0/1 key 1 s3cret-key. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'interfaces': [{'name': 'GigabitEthernet0/0', 'key_id': 1, 'key': 's3cret-key'}, {'name': 'GigabitEthernet0/1', 'key_id': 1, 'key': 's3cret-key'}]}\ntemplate = Template('{% for i in interfaces %}interface {{ i.name }}\\n ip ospf message-digest-key {{ i.key_id }} md5 {{ i.key }}\\n{% endfor %}')\n# TODO: finish the program for OSPF Authentication below.\n",
       "solution": "from jinja2 import Template\ndata = {'interfaces': [{'name': 'GigabitEthernet0/0', 'key_id': 1, 'key': 's3cret-key'}, {'name': 'GigabitEthernet0/1', 'key_id': 1, 'key': 's3cret-key'}]}\ntemplate = Template('{% for i in interfaces %}interface {{ i.name }}\\n ip ospf message-digest-key {{ i.key_id }} md5 {{ i.key }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the OSPF Authentication technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interface GigabitEthernet0/0\n ip ospf message-digest-key 1 md5 s3cret-key\ninterface GigabitEthernet0/1\n ip ospf message-digest-key 1 md5 s3cret-key",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " ip ospf message-digest-key 1 md5 s3cret-key",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "OSPF Authentication is the key idea here: OSPF authentication proves that Hello packets come from a trusted router, and it is configured per interface or per area with a clear-text password, an MD5 key, or a SHA key.",
        "approach": "Work through OSPF Authentication step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-config-m1-l5",
      "slug": "netauto-protocols-ospf-config-m1-l5",
      "title": "OSPF Cost Tuning",
      "concept": "OSPF cost tuning sets interface costs explicitly when the automatic calculation does not reflect the real quality of a link, for example to prefer a fibre path over a slower backup. The cost is set with ip ospf cost on an interface, and the value must be the same on both sides for the path cost to be symmetric. Automation computes costs from a bandwidth table so every router in the network applies the same rule.",
      "syntax": "interface GigabitEthernet0/0\n ip ospf cost 10",
      "exampleCode": "reference = 10_000_000_000  # 10 Gbps reference bandwidth\nfor bandwidth in [10_000_000_000, 1_000_000_000, 100_000_000]:\n    print(max(1, reference // bandwidth))",
      "exampleLanguage": "python",
      "mistake": "Setting a cost on only one side of a link, so traffic takes different paths in each direction.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Cost Tuning, but it does not work correctly.",
       "buggyCode": "interface GigabitEthernet0/0\n ip ospf cost 10  # R1 only; R2 keeps cost 1",
       "fixedCode": "interface GigabitEthernet0/0\n ip ospf cost 10  # both R1 and R2",
       "explanation": "Costs must match on both sides of a link, or the path cost differs by direction and traffic takes asymmetric paths."
      },
      "exercise": {
       "title": "Practise OSPF Cost Tuning",
       "type": "write-code",
       "instructions": "Compute OSPF interface costs with a reference bandwidth of 10 Gbps (cost = reference / bandwidth, minimum 1). Print one line per interface in the form '<name>: cost <n>'. Interfaces: TenGigabitEthernet0/0 at 10 Gbps; GigabitEthernet0/0 at 1 Gbps; FastEthernet0/0 at 100 Mbps.",
       "starterCode": "reference = 10_000_000_000  # 10 Gbps in bits per second\ninterfaces = [\n    (\"TenGigabitEthernet0/0\", 10_000_000_000),\n    (\"GigabitEthernet0/0\", 1_000_000_000),\n    (\"FastEthernet0/0\", 100_000_000),\n]\n# TODO: finish the program for OSPF Cost Tuning below.\n",
       "solution": "reference = 10_000_000_000  # 10 Gbps in bits per second\ninterfaces = [\n    (\"TenGigabitEthernet0/0\", 10_000_000_000),\n    (\"GigabitEthernet0/0\", 1_000_000_000),\n    (\"FastEthernet0/0\", 100_000_000),\n]\nfor name, bandwidth in interfaces:\n    cost = max(1, reference // bandwidth)\n    print(f\"{name}: cost {cost}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the OSPF Cost Tuning technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "TenGigabitEthernet0/0: cost 1\nGigabitEthernet0/0: cost 10\nFastEthernet0/0: cost 100",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "FastEthernet0/0: cost 100",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "OSPF Cost Tuning is the key idea here: OSPF cost tuning sets interface costs explicitly when the automatic calculation does not reflect the real quality of a link, for example to prefer a fibre path over a slower backup.",
        "approach": "Work through OSPF Cost Tuning step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-ospf-config-m2",
    "title": "OSPF Config Generation in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-protocols-ospf-config-m2-l1",
      "slug": "netauto-protocols-ospf-config-m2-l1",
      "title": "OSPF Summarization",
      "concept": "Route summarization replaces several specific prefixes with one shorter prefix at an area border, for example four /24 networks becoming one /22, which shrinks routing tables and hides topology changes inside the area. Summarization only works when the specific prefixes are contiguous and fit inside the summary, and a single flapping link inside the summary no longer triggers updates outside it. The ipaddress module's collapse_addresses function computes the tightest set of summaries for a list of networks.",
      "syntax": "area 1 range 10.1.0.0 255.255.252.0  # summarizes 10.1.0.0/22",
      "exampleCode": "import ipaddress\n\nnets = [ipaddress.ip_network('10.1.0.0/24'), ipaddress.ip_network('10.1.1.0/24')]\nprint(list(ipaddress.collapse_addresses(nets)))",
      "exampleLanguage": "python",
      "mistake": "Summarising prefixes that are not contiguous, which produces a summary that covers address space the area does not own.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Summarization, but it does not work correctly.",
       "buggyCode": "nets = ['10.1.0.0/24', '10.1.2.0/24']  # not contiguous, no clean summary",
       "fixedCode": "nets = ['10.1.0.0/24', '10.1.1.0/24', '10.1.2.0/24', '10.1.3.0/24']  # one /22",
       "explanation": "Only contiguous prefixes collapse into a clean summary; a gap in the range means the summary would claim space that is not yours."
      },
      "exercise": {
       "title": "Practise OSPF Summarization",
       "type": "write-code",
       "instructions": "Summarise four /24 networks (10.1.0.0/24, 10.1.1.0/24, 10.1.2.0/24, 10.1.3.0/24) into the tightest set of summaries with ipaddress.collapse_addresses and print one line per summary in the form 'Summary: <network>'. Then print 'Original: 4 prefixes, summarized: 1 prefix'.",
       "starterCode": "import ipaddress\n\nnets = [ipaddress.ip_network(f\"10.1.{i}.0/24\") for i in range(4)]\nsummaries = list(ipaddress.collapse_addresses(nets))\n# TODO: finish the program for OSPF Summarization below.\n",
       "solution": "import ipaddress\n\nnets = [ipaddress.ip_network(f\"10.1.{i}.0/24\") for i in range(4)]\nsummaries = list(ipaddress.collapse_addresses(nets))\nfor summary in summaries:\n    print(f\"Summary: {summary}\")\nprint(f\"Original: {len(nets)} prefixes, summarized: {len(summaries)} prefix\")\n",
       "solutionExplanation": "The solution builds the required data, applies the OSPF Summarization technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Summary: 10.1.0.0/22\nOriginal: 4 prefixes, summarized: 1 prefix",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Original: 4 prefixes, summarized: 1 prefix",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "OSPF Summarization is the key idea here: Route summarization replaces several specific prefixes with one shorter prefix at an area border, for example four /24 networks becoming one /22, which shrinks routing tables and hides topology changes inside the area.",
        "approach": "Work through OSPF Summarization step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-config-m2-l2",
      "slug": "netauto-protocols-ospf-config-m2-l2",
      "title": "OSPF Virtual Links",
      "concept": "A virtual link connects an area to the backbone through a transit area when the area has no direct connection to area 0. The virtual link is configured between two area border routers and carries backbone traffic across the transit area as if the areas were directly connected. Virtual links are a repair tool for a broken area design, not a normal design choice, because they make the backbone depend on the transit area's stability.",
      "syntax": "area 1 virtual-link 2.2.2.2",
      "exampleCode": "router ospf 1\n area 1 virtual-link 2.2.2.2\n network 10.0.1.0 0.0.0.255 area 1",
      "exampleLanguage": "python",
      "mistake": "Designing a new network with a virtual link instead of connecting the area directly to the backbone, which adds a dependency that will fail later.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Virtual Links, but it does not work correctly.",
       "buggyCode": "# new area 5 connects to area 1 only, with a virtual link as the plan",
       "fixedCode": "# new area 5 connects directly to area 0; virtual links are for repairs only",
       "explanation": "Virtual links repair a broken design; a new area should always connect directly to the backbone."
      },
      "exercise": {
       "title": "Check your understanding: OSPF Virtual Links",
       "type": "multiple-choice",
       "instructions": "Which statement about OSPF Virtual Links is correct?",
       "starterCode": "",
       "solution": "A virtual link connects an area to the backbone through a transit area when the area has no direct connection to area 0.",
       "solutionExplanation": "A virtual link connects an area to the backbone through a transit area when the area has no direct connection to area 0. The other options are false: OSPF Virtual Links is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A virtual link connects an area to the backbone through a transit area when the area has no direct connection to area 0.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of OSPF Virtual Links from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "OSPF Virtual Links can only be used once in a program",
        "OSPF Virtual Links requires a separate paid licence to use",
        "OSPF Virtual Links is not available in Python",
        "A virtual link connects an area to the backbone through a transit area when the area has no direct connection to area 0.",
        "OSPF Virtual Links only works when the program prints text"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-protocols-ospf-config-m2-l3",
      "slug": "netauto-protocols-ospf-config-m2-l3",
      "title": "OSPF Redistribution Basics",
      "concept": "Redistribution imports routes from another protocol or from static routes into OSPF, marking them as external routes with a Type 5 LSA. External routes carry a metric type: E1 routes add the internal OSPF cost to the external cost, while E2 routes keep only the external cost, which is the default. Redistribution points need route maps to control exactly which routes enter OSPF, or the whole routing table of the other protocol leaks in.",
      "syntax": "redistribute static metric-type 1 subnets route-map STATIC-TO-OSPF",
      "exampleCode": "router ospf 1\n redistribute static metric-type 1 subnets route-map STATIC-TO-OSPF",
      "exampleLanguage": "python",
      "mistake": "Redistributing without a route map, so every route from the other protocol floods into OSPF.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate OSPF Redistribution Basics, but it does not work correctly.",
       "buggyCode": "router ospf 1\n redistribute bgp 64512 subnets  # no route map",
       "fixedCode": "router ospf 1\n redistribute bgp 64512 subnets route-map BGP-TO-OSPF",
       "explanation": "Redistribution without a route map imports everything; a route map limits it to the prefixes that should enter OSPF."
      },
      "exercise": {
       "title": "Check your understanding: OSPF Redistribution Basics",
       "type": "multiple-choice",
       "instructions": "Which statement about OSPF Redistribution Basics is correct?",
       "starterCode": "",
       "solution": "Redistribution imports routes from another protocol or from static routes into OSPF, marking them as external routes with a Type 5 LSA.",
       "solutionExplanation": "Redistribution imports routes from another protocol or from static routes into OSPF, marking them as external routes with a Type 5 LSA. The other options are false: OSPF Redistribution Basics is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Redistribution imports routes from another protocol or from static routes into OSPF, marking them as external routes with a Type 5 LSA.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of OSPF Redistribution Basics from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "OSPF Redistribution Basics can only be used once in a program",
        "OSPF Redistribution Basics requires a separate paid licence to use",
        "Redistribution imports routes from another protocol or from static routes into OSPF, marking them as external routes with a Type 5 LSA.",
        "OSPF Redistribution Basics is not available in Python",
        "OSPF Redistribution Basics only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-ospf-config-m2-l4",
      "slug": "netauto-protocols-ospf-config-m2-l4",
      "title": "Multi-Area OSPF Config Generation",
      "concept": "A multi-area OSPF configuration assigns each interface to its own area, so an area border router has network statements in area 0 and in each attached area. The generator groups interfaces by area and emits one network statement per group, which keeps the configuration readable as areas are added. Generating the config from the inventory guarantees that both sides of a link agree on the area number.",
      "syntax": "router ospf 1\n network 10.0.0.0 0.0.0.255 area 0\n network 10.0.1.0 0.0.0.255 area 1",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('router ospf 1\\n{% for n in networks %} network {{ n }} area {{ areas[loop.index0] }}\\n{% endfor %}')",
      "exampleLanguage": "python",
      "mistake": "Grouping interfaces by interface name instead of by area, so the generated config mixes areas and is hard to review.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Multi-Area OSPF Config Generation, but it does not work correctly.",
       "buggyCode": "# networks listed in interface order, areas scattered through the config",
       "fixedCode": "# networks grouped by area: all area 0 statements, then all area 1 statements",
       "explanation": "Grouping network statements by area keeps the config reviewable; scattering areas through the list hides a wrong area assignment."
      },
      "exercise": {
       "title": "Practise Multi-Area OSPF Config Generation",
       "type": "write-code",
       "instructions": "Render the multi-area OSPF configuration for an area border router (process 1, router-id 2.2.2.2) with Jinja2: print 'router ospf <pid>', ' router-id <rid>', then for each area print ' ! area <id>' followed by one line per network in the form ' network <network> <wildcard> area <id>'. Areas: 0.0.0.0 with network 10.0.0.0 0.0.0.255; 0.0.0.1 with networks 10.0.1.0 0.0.0.255 and 10.0.2.0 0.0.0.255. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'pid': 1, 'rid': '2.2.2.2', 'areas': [{'id': '0.0.0.0', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255'}]}, {'id': '0.0.0.1', 'networks': [{'network': '10.0.1.0', 'wildcard': '0.0.0.255'}, {'network': '10.0.2.0', 'wildcard': '0.0.0.255'}]}]}\ntemplate = Template('router ospf {{ pid }}\\n router-id {{ rid }}\\n{% for a in areas %} ! area {{ a.id }}\\n{% for n in a.networks %} network {{ n.network }} {{ n.wildcard }} area {{ a.id }}\\n{% endfor %}{% endfor %}')\n# TODO: finish the program for Multi-Area OSPF Config Generation below.\n",
       "solution": "from jinja2 import Template\ndata = {'pid': 1, 'rid': '2.2.2.2', 'areas': [{'id': '0.0.0.0', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255'}]}, {'id': '0.0.0.1', 'networks': [{'network': '10.0.1.0', 'wildcard': '0.0.0.255'}, {'network': '10.0.2.0', 'wildcard': '0.0.0.255'}]}]}\ntemplate = Template('router ospf {{ pid }}\\n router-id {{ rid }}\\n{% for a in areas %} ! area {{ a.id }}\\n{% for n in a.networks %} network {{ n.network }} {{ n.wildcard }} area {{ a.id }}\\n{% endfor %}{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Multi-Area OSPF Config Generation technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router ospf 1\n router-id 2.2.2.2\n ! area 0.0.0.0\n network 10.0.0.0 0.0.0.255 area 0.0.0.0\n ! area 0.0.0.1\n network 10.0.1.0 0.0.0.255 area 0.0.0.1\n network 10.0.2.0 0.0.0.255 area 0.0.0.1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " network 10.0.2.0 0.0.0.255 area 0.0.0.1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Multi-Area OSPF Config Generation is the key idea here: A multi-area OSPF configuration assigns each interface to its own area, so an area border router has network statements in area 0 and in each attached area.",
        "approach": "Work through Multi-Area OSPF Config Generation step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-ospf-config-m2-l5",
      "slug": "netauto-protocols-ospf-config-m2-l5",
      "title": "Validating Generated OSPF Config",
      "concept": "A generated OSPF configuration is validated by checking that every interface has a matching network statement, that all areas other than 0 connect through an ABR, and that router IDs are unique across the inventory. Validation also checks that authentication settings match on both sides of each link, because a mismatch silently prevents adjacency. A config that fails validation is reported with the exact interface or router at fault.",
      "syntax": "assert 'network 10.0.0.0 0.0.0.255 area 0' in config\nassert len(set(router_ids)) == len(router_ids)",
      "exampleCode": "router_ids = ['1.1.1.1', '2.2.2.2', '1.1.1.1']\nprint(len(set(router_ids)) == len(router_ids))  # False: duplicate",
      "exampleLanguage": "python",
      "mistake": "Validating only the router ospf line and skipping the router-ID uniqueness check, so two routers share an ID and never form adjacencies.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Validating Generated OSPF Config, but it does not work correctly.",
       "buggyCode": "checks = ['router ospf 1' in config]  # process line only",
       "fixedCode": "checks = ['router ospf 1' in config, len(set(router_ids)) == len(router_ids)]",
       "explanation": "A duplicate router ID breaks OSPF silently, so the uniqueness check belongs in validation alongside the config text checks."
      },
      "exercise": {
       "title": "Practise Validating Generated OSPF Config",
       "type": "write-code",
       "instructions": "Validate an OSPF inventory with three routers (R1 router-id 1.1.1.1, R2 router-id 2.2.2.2, R3 router-id 1.1.1.1) and a config that contains the network statement for 10.0.0.0/24 in area 0 but not the one for 10.0.1.0/24 in area 1. Print 'PASS: router IDs unique' or 'FAIL: duplicate router ID 1.1.1.1', 'PASS: network 10.0.0.0 area 0 present' or the FAIL line for each required statement, then print 'Validation: <p> passed, <f> failed'.",
       "starterCode": "config = \"router ospf 1\\n network 10.0.0.0 0.0.0.255 area 0\\n\"\nrouter_ids = [\"1.1.1.1\", \"2.2.2.2\", \"1.1.1.1\"]\nrequired = [\n    \"network 10.0.0.0 0.0.0.255 area 0\",\n    \"network 10.0.1.0 0.0.0.255 area 1\",\n]\npassed = 0\nfailed = 0\n# TODO: finish the program for Validating Generated OSPF Config below.\n",
       "solution": "config = \"router ospf 1\\n network 10.0.0.0 0.0.0.255 area 0\\n\"\nrouter_ids = [\"1.1.1.1\", \"2.2.2.2\", \"1.1.1.1\"]\nrequired = [\n    \"network 10.0.0.0 0.0.0.255 area 0\",\n    \"network 10.0.1.0 0.0.0.255 area 1\",\n]\npassed = 0\nfailed = 0\nif len(set(router_ids)) == len(router_ids):\n    print(\"PASS: router IDs unique\")\n    passed += 1\nelse:\n    print(\"FAIL: duplicate router ID 1.1.1.1\")\n    failed += 1\nfor line in required:\n    if line in config:\n        print(f\"PASS: {line} present\")\n        passed += 1\n    else:\n        print(f\"FAIL: missing {line}\")\n        failed += 1\nprint(f\"Validation: {passed} passed, {failed} failed\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Validating Generated OSPF Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "FAIL: duplicate router ID 1.1.1.1\nPASS: network 10.0.0.0 0.0.0.255 area 0 present\nFAIL: missing network 10.0.1.0 0.0.0.255 area 1\nValidation: 1 passed, 2 failed",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Validation: 1 passed, 2 failed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating Generated OSPF Config is the key idea here: A generated OSPF configuration is validated by checking that every interface has a matching network statement, that all areas other than 0 connect through an ABR, and that router IDs are unique across the inventory.",
        "approach": "Work through Validating Generated OSPF Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: OSPF Config Generation",
   "type": "write-code",
   "instructions": "Generate the OSPF configuration for an area border router (process 1, router-id 2.2.2.2) with Jinja2: print 'router ospf 1', ' router-id 2.2.2.2', ' area 0 authentication message-digest', then for each area print ' ! area <id>' followed by one line per network in the form ' network <network> <wildcard> area <id>'. Areas: 0.0.0.0 with network 10.0.0.0 0.0.0.255; 0.0.0.1 with network 10.0.1.0 0.0.0.255. Print the full rendered config.",
   "starterCode": "from jinja2 import Template\ndata = {'rid': '2.2.2.2', 'areas': [{'id': '0.0.0.0', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255'}]}, {'id': '0.0.0.1', 'networks': [{'network': '10.0.1.0', 'wildcard': '0.0.0.255'}]}]}\ntemplate = Template('router ospf 1\\n router-id {{ rid }}\\n area 0 authentication message-digest\\n{% for a in areas %} ! area {{ a.id }}\\n{% for n in a.networks %} network {{ n.network }} {{ n.wildcard }} area {{ a.id }}\\n{% endfor %}{% endfor %}')\n# TODO: finish the program for OSPF Config Generation Capstone below.\n",
   "solution": "from jinja2 import Template\ndata = {'rid': '2.2.2.2', 'areas': [{'id': '0.0.0.0', 'networks': [{'network': '10.0.0.0', 'wildcard': '0.0.0.255'}]}, {'id': '0.0.0.1', 'networks': [{'network': '10.0.1.0', 'wildcard': '0.0.0.255'}]}]}\ntemplate = Template('router ospf 1\\n router-id {{ rid }}\\n area 0 authentication message-digest\\n{% for a in areas %} ! area {{ a.id }}\\n{% for n in a.networks %} network {{ n.network }} {{ n.wildcard }} area {{ a.id }}\\n{% endfor %}{% endfor %}')\nprint(template.render(**data).strip())\n",
   "solutionExplanation": "The solution builds the required data, applies the OSPF Config Generation Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "router ospf 1\n router-id 2.2.2.2\n area 0 authentication message-digest\n ! area 0.0.0.0\n network 10.0.0.0 0.0.0.255 area 0.0.0.0\n ! area 0.0.0.1\n network 10.0.1.0 0.0.0.255 area 0.0.0.1",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "network 10.0.1.0 0.0.0.255 area 0.0.0.1",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through OSPF Config Generation Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "OSPF Config Generation Capstone Project",
   "description": "Generate a complete multi-area OSPF configuration with MD5 authentication from one inventory.",
   "requirements": [
    "Generate the multi-area OSPF configuration with authentication from a single inventory with Jinja2.",
    "Apply at least three of these skills: OSPF templating, Network statements, OSPF authentication, Multi-area generation.",
    "Every network statement uses a wildcard mask and the correct area.",
    "Validate the generated config against the inventory before finishing."
   ],
   "rubric": [
    "The generated config is complete and correct for both areas.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-route-policy",
  "slug": "netauto-protocols-route-policy",
  "language": "python",
  "category": "devops",
  "title": "Route Policy Automation",
  "description": "Build routing policy as data: prefix lists, route maps, AS-path prepending, community policy, local preference, policy testing, route-map generation, and policy audit.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "Route policy concepts",
   "Prefix lists",
   "Route maps",
   "AS-path prepending",
   "Community policy",
   "Local preference policy",
   "Route filtering",
   "Policy testing",
   "Route-map generation",
   "Policy audit"
  ],
  "prerequisites": [
   "netauto-protocols-bgp-config",
   "netauto-protocols-ospf-config"
  ],
  "analogy": "Learning {topic} is like learning to write the rules for a border crossing: each rule says which travellers may pass and what stamp they get.",
  "modules": [
   {
    "id": "netauto-protocols-route-policy-m1",
    "title": "Route Policy Automation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-route-policy-m1-l1",
      "slug": "netauto-protocols-route-policy-m1-l1",
      "title": "What a Route Policy Is",
      "concept": "A route policy is a set of rules that decides which routes a router accepts, advertises, or modifies, and it is applied where routes enter or leave a BGP session. Policies are built from match conditions, such as a prefix list or a community, and set actions, such as changing the local preference. Writing policies as data instead of hand-typed commands means the same policy can be tested, reviewed, and applied identically on every router.",
      "syntax": "route-map CUSTOMERS permit 10\n match community 64512:100\n set local-preference 200",
      "exampleCode": "rules = [\n    {'seq': 10, 'match': 'community 64512:100', 'action': 'set local-pref 200'},\n    {'seq': 20, 'match': 'community 64512:200', 'action': 'set local-pref 100'},\n]\nfor r in rules:\n    print(f\"Rule {r['seq']}: match {r['match']} {r['action']}\")",
      "exampleLanguage": "python",
      "mistake": "Writing policy as free-form commands with no structure, so the same policy cannot be tested or reviewed before it is applied.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate What a Route Policy Is, but it does not work correctly.",
       "buggyCode": "rules = ['set local-pref 200 for customers']  # no match condition",
       "fixedCode": "rules = [{'seq': 10, 'match': 'community 64512:100', 'action': 'set local-pref 200'}]",
       "explanation": "A policy rule needs both a match condition and a set action; a rule that sets a value for every route with no match is not a policy, it is a blanket change."
      },
      "exercise": {
       "title": "Practise What a Route Policy Is",
       "type": "write-code",
       "instructions": "Build the route policy as a list of rules and print one line per rule in the form 'Rule <seq>: match <match> <action>'. Rules: seq 10 match community 64512:100 set local-pref 200; seq 20 match community 64512:200 set local-pref 100; seq 30 match prefix-list DEFAULT set local-pref 50.",
       "starterCode": "rows = [{'seq': 10, 'match': 'community 64512:100', 'action': 'set local-pref 200'}, {'seq': 20, 'match': 'community 64512:200', 'action': 'set local-pref 100'}, {'seq': 30, 'match': 'prefix-list DEFAULT', 'action': 'set local-pref 50'}]\n# TODO: finish the program for What a Route Policy Is below.\n",
       "solution": "rows = [{'seq': 10, 'match': 'community 64512:100', 'action': 'set local-pref 200'}, {'seq': 20, 'match': 'community 64512:200', 'action': 'set local-pref 100'}, {'seq': 30, 'match': 'prefix-list DEFAULT', 'action': 'set local-pref 50'}]\nfor r in rows:\n    print('Rule {seq}: match {match} {action}'.format(**r))\n",
       "solutionExplanation": "The solution builds the required data, applies the What a Route Policy Is technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Rule 10: match community 64512:100 set local-pref 200\nRule 20: match community 64512:200 set local-pref 100\nRule 30: match prefix-list DEFAULT set local-pref 50",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Rule 30: match prefix-list DEFAULT set local-pref 50",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What a Route Policy Is is the key idea here: A route policy is a set of rules that decides which routes a router accepts, advertises, or modifies, and it is applied where routes enter or leave a BGP session.",
        "approach": "Work through What a Route Policy Is step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-route-policy-m1-l2",
      "slug": "netauto-protocols-route-policy-m1-l2",
      "title": "Prefix Lists as Policy Building Blocks",
      "concept": "A prefix list is the matching tool inside a route policy: it selects routes by network and prefix length so the policy can act on exactly the routes it should. An entry with ge and le bounds matches a range of prefix lengths, for example 10.0.0.0/8 ge 16 le 24 matches every /16 to /24 inside 10.0.0.0/8. The ipaddress module checks whether a candidate network is a subnet of the listed network, which is exactly the test a prefix list performs.",
      "syntax": "ip prefix-list INTERNAL seq 10 permit 10.0.0.0/8 ge 16 le 24",
      "exampleCode": "import ipaddress\n\nbase = ipaddress.ip_network('10.0.0.0/8')\nnet = ipaddress.ip_network('10.1.0.0/16')\nprint(net.subnet_of(base) and 16 <= net.prefixlen <= 24)  # True",
      "exampleLanguage": "python",
      "mistake": "Writing ge without le, so the entry matches every prefix length from ge up to /32, including host routes you never meant to match.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Prefix Lists as Policy Building Blocks, but it does not work correctly.",
       "buggyCode": "ip prefix-list INTERNAL seq 10 permit 10.0.0.0/8 ge 16  # matches up to /32",
       "fixedCode": "ip prefix-list INTERNAL seq 10 permit 10.0.0.0/8 ge 16 le 24  # bounded to /24",
       "explanation": "A ge without a le matches every more-specific prefix up to /32; the le bound stops the match where you intended."
      },
      "exercise": {
       "title": "Practise Prefix Lists as Policy Building Blocks",
       "type": "write-code",
       "instructions": "Test four candidate prefixes against the prefix list '10.0.0.0/8 ge 16 le 24' (permit prefixes inside 10.0.0.0/8 with length 16 to 24) and print one line per candidate in the form '<prefix>: permitted' or '<prefix>: denied'. Candidates: 10.1.0.0/16, 10.1.2.0/24, 10.1.2.3/32, 11.0.0.0/16.",
       "starterCode": "import ipaddress\n\nbase = ipaddress.ip_network(\"10.0.0.0/8\")\ncandidates = [\"10.1.0.0/16\", \"10.1.2.0/24\", \"10.1.2.3/32\", \"11.0.0.0/16\"]\n# TODO: finish the program for Prefix Lists as Policy Building Blocks below.\n",
       "solution": "import ipaddress\n\nbase = ipaddress.ip_network(\"10.0.0.0/8\")\ncandidates = [\"10.1.0.0/16\", \"10.1.2.0/24\", \"10.1.2.3/32\", \"11.0.0.0/16\"]\nfor cand in candidates:\n    net = ipaddress.ip_network(cand)\n    if net.subnet_of(base) and 16 <= net.prefixlen <= 24:\n        print(f\"{cand}: permitted\")\n    else:\n        print(f\"{cand}: denied\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Prefix Lists as Policy Building Blocks technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "10.1.0.0/16: permitted\n10.1.2.0/24: permitted\n10.1.2.3/32: denied\n11.0.0.0/16: denied",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "11.0.0.0/16: denied",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Prefix Lists as Policy Building Blocks is the key idea here: A prefix list is the matching tool inside a route policy: it selects routes by network and prefix length so the policy can act on exactly the routes it should.",
        "approach": "Work through Prefix Lists as Policy Building Blocks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-route-policy-m1-l3",
      "slug": "netauto-protocols-route-policy-m1-l3",
      "title": "Route Maps: Match and Set",
      "concept": "A route map is an ordered list of clauses, and each clause has match conditions and set actions; a route is processed by the first clause whose matches all succeed. If no clause matches, the route hits the implicit deny at the end of the route map and is dropped. Route maps are applied inbound to filter or modify routes as they arrive, and outbound to control what a router advertises.",
      "syntax": "route-map POLICY permit 10\n match ip address prefix-list CUSTOMERS\n set local-preference 200\nroute-map POLICY deny 20",
      "exampleCode": "route-map POLICY permit 10\n match community 64512:100\n set local-preference 200\nroute-map POLICY permit 20\n set local-preference 100",
      "exampleLanguage": "python",
      "mistake": "Forgetting the implicit deny at the end of a route map, so routes that match no clause are dropped when the author expected them to pass.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Route Maps: Match and Set, but it does not work correctly.",
       "buggyCode": "route-map POLICY permit 10\n match community 64512:100\n set local-preference 200  # everything else passes too",
       "fixedCode": "route-map POLICY permit 10\n match community 64512:100\n set local-preference 200\nroute-map POLICY permit 20\n set local-preference 100  # explicit catch-all",
       "explanation": "A route map ends with an implicit deny, so a catch-all clause is needed when unmatched routes should pass with a default value."
      },
      "exercise": {
       "title": "Check your understanding: Route Maps: Match and Set",
       "type": "multiple-choice",
       "instructions": "Which statement about Route Maps: Match and Set is correct?",
       "starterCode": "",
       "solution": "A route map is an ordered list of clauses, and each clause has match conditions and set actions; a route is processed by the first clause whose matches all succeed.",
       "solutionExplanation": "A route map is an ordered list of clauses, and each clause has match conditions and set actions; a route is processed by the first clause whose matches all succeed. The other options are false: Route Maps: Match and Set is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A route map is an ordered list of clauses, and each clause has match conditions and set actions; a route is processed by the first clause whose matches all succeed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Route Maps: Match and Set from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Route Maps: Match and Set can only be used once in a program",
        "Route Maps: Match and Set requires a separate paid licence to use",
        "A route map is an ordered list of clauses, and each clause has match conditions and set actions; a route is processed by the first clause whose matches all succeed.",
        "Route Maps: Match and Set is not available in Python",
        "Route Maps: Match and Set only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-route-policy-m1-l4",
      "slug": "netauto-protocols-route-policy-m1-l4",
      "title": "AS-Path Prepending",
      "concept": "AS-path prepending adds extra copies of your own AS number to the path advertised to a neighbour, making that path look longer so other networks prefer a different entry point. Prepending is a set action in a route map, and it is commonly applied on a backup link so traffic uses the primary link unless it fails. Because the AS path is checked after local preference in best-path selection, prepending only influences decisions where local preference is equal.",
      "syntax": "route-map PREPEND permit 10\n set as-path prepend 64512 64512",
      "exampleCode": "path = [64512, 64513]\nprepended = [64512, 64512] + path\nprint(' '.join(str(a) for a in prepended))",
      "exampleLanguage": "python",
      "mistake": "Prepending on the primary link instead of the backup link, which pushes traffic onto the backup path you wanted to avoid.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate AS-Path Prepending, but it does not work correctly.",
       "buggyCode": "route-map PREPEND permit 10\n set as-path prepend 64512 64512  # applied to the primary link",
       "fixedCode": "route-map PREPEND permit 10\n set as-path prepend 64512 64512  # applied to the backup link only",
       "explanation": "Prepending makes a path look worse, so it belongs on the backup link; prepending the primary link sends traffic the wrong way."
      },
      "exercise": {
       "title": "Practise AS-Path Prepending",
       "type": "write-code",
       "instructions": "Prepend AS 64512 twice to the AS path of the route 203.0.113.0/24 advertised to a backup neighbour. The original path is [64512, 64513]. Print 'Original path for 203.0.113.0/24: 64512 64513' and 'Prepended path for 203.0.113.0/24: 64512 64512 64512 64513'.",
       "starterCode": "prefix = \"203.0.113.0/24\"\npath = [64512, 64513]\nprepended = [64512, 64512] + path\n# TODO: finish the program for AS-Path Prepending below.\n",
       "solution": "prefix = \"203.0.113.0/24\"\npath = [64512, 64513]\nprepended = [64512, 64512] + path\nprint(f\"Original path for {prefix}: {' '.join(str(a) for a in path)}\")\nprint(f\"Prepended path for {prefix}: {' '.join(str(a) for a in prepended)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the AS-Path Prepending technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Original path for 203.0.113.0/24: 64512 64513\nPrepended path for 203.0.113.0/24: 64512 64512 64512 64513",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Prepended path for 203.0.113.0/24: 64512 64512 64512 64513",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "AS-Path Prepending is the key idea here: AS-path prepending adds extra copies of your own AS number to the path advertised to a neighbour, making that path look longer so other networks prefer a different entry point.",
        "approach": "Work through AS-Path Prepending step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-route-policy-m1-l5",
      "slug": "netauto-protocols-route-policy-m1-l5",
      "title": "Community-Based Policy",
      "concept": "Community-based policy tags routes with communities when they are learned and then matches those tags to decide how the route is treated. A route from a customer might get community 64512:100 and a local preference of 200, while a route from a peer gets 64512:200 and a local preference of 100. Tagging at the edge and acting on tags in the core keeps the policy logic in one place instead of scattered across every session.",
      "syntax": "set community 64512:100\nmatch community 64512:100\n set local-preference 200",
      "exampleCode": "policy = {'64512:100': 200, '64512:200': 100}\nprint(policy['64512:100'])  # customer routes get local-pref 200",
      "exampleLanguage": "python",
      "mistake": "Tagging routes with a community but never writing the rule that matches it, so the tag travels through the network and does nothing.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Community-Based Policy, but it does not work correctly.",
       "buggyCode": "route-map TAG permit 10\n set community 64512:100  # no route map ever matches 64512:100",
       "fixedCode": "route-map TAG permit 10\n set community 64512:100\nroute-map ACT permit 10\n match community 64512:100\n set local-preference 200",
       "explanation": "A community only changes behaviour when a route map matches it; setting a tag with no matching rule is a label nobody reads."
      },
      "exercise": {
       "title": "Practise Community-Based Policy",
       "type": "write-code",
       "instructions": "Apply the community policy to four routes: community 64512:100 means local-pref 200 (customer), 64512:200 means local-pref 100 (peer), 64512:300 means local-pref 50 (transit). Print one line per route in the form '<prefix> community <community>: local-pref <n>'. Routes: 203.0.113.0/24 with 64512:100; 198.51.100.0/24 with 64512:200; 192.0.2.0/24 with 64512:300; 203.0.113.128/25 with 64512:100.",
       "starterCode": "policy = {\"64512:100\": 200, \"64512:200\": 100, \"64512:300\": 50}\nroutes = [\n    (\"203.0.113.0/24\", \"64512:100\"),\n    (\"198.51.100.0/24\", \"64512:200\"),\n    (\"192.0.2.0/24\", \"64512:300\"),\n    (\"203.0.113.128/25\", \"64512:100\"),\n]\n# TODO: finish the program for Community-Based Policy below.\n",
       "solution": "policy = {\"64512:100\": 200, \"64512:200\": 100, \"64512:300\": 50}\nroutes = [\n    (\"203.0.113.0/24\", \"64512:100\"),\n    (\"198.51.100.0/24\", \"64512:200\"),\n    (\"192.0.2.0/24\", \"64512:300\"),\n    (\"203.0.113.128/25\", \"64512:100\"),\n]\nfor prefix, community in routes:\n    print(f\"{prefix} community {community}: local-pref {policy[community]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Community-Based Policy technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "203.0.113.0/24 community 64512:100: local-pref 200\n198.51.100.0/24 community 64512:200: local-pref 100\n192.0.2.0/24 community 64512:300: local-pref 50\n203.0.113.128/25 community 64512:100: local-pref 200",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "203.0.113.128/25 community 64512:100: local-pref 200",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Community-Based Policy is the key idea here: Community-based policy tags routes with communities when they are learned and then matches those tags to decide how the route is treated.",
        "approach": "Work through Community-Based Policy step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-route-policy-m2",
    "title": "Route Policy Automation in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-protocols-route-policy-m2-l1",
      "slug": "netauto-protocols-route-policy-m2-l1",
      "title": "Local Preference Policy",
      "concept": "Local preference policy sets the local preference of incoming routes so the router prefers one exit over another for the same destination. The policy matches routes by community or prefix list and sets local preference with a route-map set clause, and the value is only meaningful inside the local AS. A common scheme is 200 for customer routes, 150 for private peering, and 100 for transit, which encodes the business preference directly in the routing decision.",
      "syntax": "route-map SET-LP permit 10\n match community 64512:100\n set local-preference 200",
      "exampleCode": "scheme = {'customer': 200, 'peering': 150, 'transit': 100}\nprint(scheme['customer'])",
      "exampleLanguage": "python",
      "mistake": "Setting local preference on an outbound route map, where it has no effect because local preference is only carried inside the local AS.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Local Preference Policy, but it does not work correctly.",
       "buggyCode": "route-map SET-LP permit 10\n set local-preference 200  # applied outbound",
       "fixedCode": "route-map SET-LP permit 10\n set local-preference 200  # applied inbound",
       "explanation": "Local preference must be set inbound; an outbound route map sets a value the neighbour ignores because it never leaves the AS."
      },
      "exercise": {
       "title": "Practise Local Preference Policy",
       "type": "write-code",
       "instructions": "Apply the local-preference scheme (customer 200, peering 150, transit 100) to four routes and print one line per route in the form '<prefix> (<category>): local-pref <n>'. Routes: 203.0.113.0/24 customer; 198.51.100.0/24 peering; 192.0.2.0/24 transit; 203.0.113.128/25 customer.",
       "starterCode": "scheme = {\"customer\": 200, \"peering\": 150, \"transit\": 100}\nroutes = [\n    (\"203.0.113.0/24\", \"customer\"),\n    (\"198.51.100.0/24\", \"peering\"),\n    (\"192.0.2.0/24\", \"transit\"),\n    (\"203.0.113.128/25\", \"customer\"),\n]\n# TODO: finish the program for Local Preference Policy below.\n",
       "solution": "scheme = {\"customer\": 200, \"peering\": 150, \"transit\": 100}\nroutes = [\n    (\"203.0.113.0/24\", \"customer\"),\n    (\"198.51.100.0/24\", \"peering\"),\n    (\"192.0.2.0/24\", \"transit\"),\n    (\"203.0.113.128/25\", \"customer\"),\n]\nfor prefix, category in routes:\n    print(f\"{prefix} ({category}): local-pref {scheme[category]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Local Preference Policy technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "203.0.113.0/24 (customer): local-pref 200\n198.51.100.0/24 (peering): local-pref 150\n192.0.2.0/24 (transit): local-pref 100\n203.0.113.128/25 (customer): local-pref 200",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "203.0.113.128/25 (customer): local-pref 200",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Local Preference Policy is the key idea here: Local preference policy sets the local preference of incoming routes so the router prefers one exit over another for the same destination.",
        "approach": "Work through Local Preference Policy step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-route-policy-m2-l2",
      "slug": "netauto-protocols-route-policy-m2-l2",
      "title": "Route Filtering: Allow and Deny",
      "concept": "Route filtering decides which routes enter or leave a BGP session, and it is applied with prefix lists, AS-path lists, or route maps on the neighbour. Inbound filters protect the router from accepting routes it should never use, such as its own prefixes advertised back by a peer or private address space. Outbound filters protect the rest of the internet from the router, for example by advertising only the prefixes the AS owns.",
      "syntax": "neighbor 192.0.2.1 prefix-list CUSTOMERS-IN in\nneighbor 192.0.2.1 prefix-list OWN-OUT out",
      "exampleCode": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n neighbor 192.0.2.1 prefix-list CUSTOMERS-IN in\n neighbor 192.0.2.1 prefix-list OWN-OUT out",
      "exampleLanguage": "python",
      "mistake": "Filtering only inbound and never outbound, so the router leaks internal or private prefixes to the rest of the internet.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Route Filtering: Allow and Deny, but it does not work correctly.",
       "buggyCode": "neighbor 192.0.2.1 prefix-list CUSTOMERS-IN in  # no outbound filter",
       "fixedCode": "neighbor 192.0.2.1 prefix-list CUSTOMERS-IN in\nneighbor 192.0.2.1 prefix-list OWN-OUT out",
       "explanation": "An outbound filter is as important as an inbound one; without it the router can advertise prefixes it does not own."
      },
      "exercise": {
       "title": "Check your understanding: Route Filtering: Allow and Deny",
       "type": "multiple-choice",
       "instructions": "Which statement about Route Filtering: Allow and Deny is correct?",
       "starterCode": "",
       "solution": "Route filtering decides which routes enter or leave a BGP session, and it is applied with prefix lists, AS-path lists, or route maps on the neighbour.",
       "solutionExplanation": "Route filtering decides which routes enter or leave a BGP session, and it is applied with prefix lists, AS-path lists, or route maps on the neighbour. The other options are false: Route Filtering: Allow and Deny is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Route filtering decides which routes enter or leave a BGP session, and it is applied with prefix lists, AS-path lists, or route maps on the neighbour.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Route Filtering: Allow and Deny from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Route Filtering: Allow and Deny can only be used once in a program",
        "Route Filtering: Allow and Deny requires a separate paid licence to use",
        "Route filtering decides which routes enter or leave a BGP session, and it is applied with prefix lists, AS-path lists, or route maps on the neighbour.",
        "Route Filtering: Allow and Deny is not available in Python",
        "Route Filtering: Allow and Deny only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-route-policy-m2-l3",
      "slug": "netauto-protocols-route-policy-m2-l3",
      "title": "Policy Testing Before Deployment",
      "concept": "Policy testing runs a route policy against a set of sample routes before it is deployed, so a mistake shows up as a wrong accept or reject in a test instead of an outage. The test harness feeds each sample route through the same match and set logic the router will use and records the result. A policy that passes its tests on representative routes, including edge cases such as the default route and private prefixes, is safe to deploy.",
      "syntax": "test: policy(203.0.113.0/24) == ACCEPT\ntest: policy(10.0.0.0/8) == REJECT",
      "exampleCode": "policy = lambda prefix: 'ACCEPT' if prefix.startswith('203.0.113.') else 'REJECT'\nprint(policy('203.0.113.0/24'))",
      "exampleLanguage": "python",
      "mistake": "Testing a policy only with routes it should accept, and never with routes it should reject, so a missing deny is never caught.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Policy Testing Before Deployment, but it does not work correctly.",
       "buggyCode": "tests = ['203.0.113.0/24']  # only accept cases",
       "fixedCode": "tests = ['203.0.113.0/24', '10.0.0.0/8', '0.0.0.0/0']  # accept and reject cases",
       "explanation": "A policy test set needs reject cases too; without them a policy that accepts everything passes every test."
      },
      "exercise": {
       "title": "Practise Policy Testing Before Deployment",
       "type": "write-code",
       "instructions": "Run the policy test harness: the policy accepts prefixes inside 203.0.113.0/24 and rejects everything else. Test the routes 203.0.113.0/24, 203.0.113.128/25, 10.0.0.0/8, and 0.0.0.0/0, and print one line per route in the form '<prefix>: ACCEPT' or '<prefix>: REJECT'. Then print 'Tests: 2 accepted, 2 rejected'.",
       "starterCode": "import ipaddress\n\nallowed = ipaddress.ip_network(\"203.0.113.0/24\")\nroutes = [\"203.0.113.0/24\", \"203.0.113.128/25\", \"10.0.0.0/8\", \"0.0.0.0/0\"]\naccepted = 0\n# TODO: finish the program for Policy Testing Before Deployment below.\n",
       "solution": "import ipaddress\n\nallowed = ipaddress.ip_network(\"203.0.113.0/24\")\nroutes = [\"203.0.113.0/24\", \"203.0.113.128/25\", \"10.0.0.0/8\", \"0.0.0.0/0\"]\naccepted = 0\nfor route in routes:\n    net = ipaddress.ip_network(route)\n    if net.subnet_of(allowed):\n        print(f\"{route}: ACCEPT\")\n        accepted += 1\n    else:\n        print(f\"{route}: REJECT\")\nprint(f\"Tests: {accepted} accepted, {len(routes) - accepted} rejected\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Policy Testing Before Deployment technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "203.0.113.0/24: ACCEPT\n203.0.113.128/25: ACCEPT\n10.0.0.0/8: REJECT\n0.0.0.0/0: REJECT\nTests: 2 accepted, 2 rejected",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Tests: 2 accepted, 2 rejected",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Policy Testing Before Deployment is the key idea here: Policy testing runs a route policy against a set of sample routes before it is deployed, so a mistake shows up as a wrong accept or reject in a test instead of an outage.",
        "approach": "Work through Policy Testing Before Deployment step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-route-policy-m2-l4",
      "slug": "netauto-protocols-route-policy-m2-l4",
      "title": "Generating Route Maps from Policy Data",
      "concept": "Route maps are generated from policy data by turning each rule into a route-map clause with its sequence number, match lines, and set lines. The generator preserves the rule order because the first matching clause wins, and it numbers clauses in steps of 10 so new rules can be inserted later. The generated route map is plain router configuration that can be reviewed before it is applied.",
      "syntax": "route-map {{ name }} permit {{ rule.seq }}\n match community {{ rule.community }}\n set local-preference {{ rule.local_pref }}",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('route-map {{ name }} permit {{ seq }}\\n set local-preference {{ lp }}')\nprint(template.render(name='POLICY', seq=10, lp=200))",
      "exampleLanguage": "python",
      "mistake": "Numbering route-map clauses 1, 2, 3, so inserting a rule later means renumbering the whole route map.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Generating Route Maps from Policy Data, but it does not work correctly.",
       "buggyCode": "route-map POLICY permit 1\nroute-map POLICY permit 2\nroute-map POLICY permit 3",
       "fixedCode": "route-map POLICY permit 10\nroute-map POLICY permit 20\nroute-map POLICY permit 30",
       "explanation": "Numbering clauses in steps of 10 leaves room to insert a new rule between two existing ones without renumbering."
      },
      "exercise": {
       "title": "Practise Generating Route Maps from Policy Data",
       "type": "write-code",
       "instructions": "Generate the route map POLICY from policy data with Jinja2: for each rule print 'route-map POLICY permit <seq>', ' match community <community>', ' set local-preference <local_pref>'. Rules: seq 10 community 64512:100 local-pref 200; seq 20 community 64512:200 local-pref 100. Print the rendered route map.",
       "starterCode": "from jinja2 import Template\ndata = {'rules': [{'seq': 10, 'community': '64512:100', 'local_pref': 200}, {'seq': 20, 'community': '64512:200', 'local_pref': 100}]}\ntemplate = Template('{% for r in rules %}route-map POLICY permit {{ r.seq }}\\n match community {{ r.community }}\\n set local-preference {{ r.local_pref }}\\n{% endfor %}')\n# TODO: finish the program for Generating Route Maps from Policy Data below.\n",
       "solution": "from jinja2 import Template\ndata = {'rules': [{'seq': 10, 'community': '64512:100', 'local_pref': 200}, {'seq': 20, 'community': '64512:200', 'local_pref': 100}]}\ntemplate = Template('{% for r in rules %}route-map POLICY permit {{ r.seq }}\\n match community {{ r.community }}\\n set local-preference {{ r.local_pref }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Generating Route Maps from Policy Data technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "route-map POLICY permit 10\n match community 64512:100\n set local-preference 200\nroute-map POLICY permit 20\n match community 64512:200\n set local-preference 100",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " set local-preference 100",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Generating Route Maps from Policy Data is the key idea here: Route maps are generated from policy data by turning each rule into a route-map clause with its sequence number, match lines, and set lines.",
        "approach": "Work through Generating Route Maps from Policy Data step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-route-policy-m2-l5",
      "slug": "netauto-protocols-route-policy-m2-l5",
      "title": "Policy Audit: Finding Shadowed Rules",
      "concept": "A shadowed rule is a policy rule that can never match because an earlier rule already matches everything it would match, which usually means the rules are in the wrong order or one of them is redundant. An audit compares each rule's match conditions with the rules above it and reports any rule whose matches are a subset of an earlier rule's matches. Finding shadowed rules before deployment prevents the surprise of a rule that looks correct but never runs.",
      "syntax": "rule 10: permit 203.0.113.0/24 le 32\nrule 20: permit 203.0.113.128/25  # shadowed by rule 10",
      "exampleCode": "import ipaddress\n\nfirst = ipaddress.ip_network('203.0.113.0/24')\nsecond = ipaddress.ip_network('203.0.113.128/25')\nprint(second.subnet_of(first))  # True: shadowed",
      "exampleLanguage": "python",
      "mistake": "Auditing only the rule text and never the match ranges, so a shadowed rule that uses different words for the same range is missed.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Policy Audit: Finding Shadowed Rules, but it does not work correctly.",
       "buggyCode": "# rule 20 matches 203.0.113.128/25; rule 10 already matches the whole /24",
       "fixedCode": "# rule 20 matches 203.0.113.128/25, which is inside rule 10's /24: rule 20 is shadowed",
       "explanation": "Shadowing is about the ranges, not the words; a narrower prefix inside an earlier broader permit can never match."
      },
      "exercise": {
       "title": "Practise Policy Audit: Finding Shadowed Rules",
       "type": "write-code",
       "instructions": "Audit four prefix-list rules in order for shadowing: a rule is shadowed when its network is a subnet of an earlier rule's network. Print one line per rule in the form 'Rule <seq> <network>: OK' or 'Rule <seq> <network>: SHADOWED by rule <earlier>'. Rules: seq 10 203.0.113.0/24; seq 20 203.0.113.128/25; seq 30 198.51.100.0/24; seq 40 198.51.100.128/25.",
       "starterCode": "import ipaddress\n\nrules = [\n    (10, \"203.0.113.0/24\"),\n    (20, \"203.0.113.128/25\"),\n    (30, \"198.51.100.0/24\"),\n    (40, \"198.51.100.128/25\"),\n]\nseen = []\n# TODO: finish the program for Policy Audit: Finding Shadowed Rules below.\n",
       "solution": "import ipaddress\n\nrules = [\n    (10, \"203.0.113.0/24\"),\n    (20, \"203.0.113.128/25\"),\n    (30, \"198.51.100.0/24\"),\n    (40, \"198.51.100.128/25\"),\n]\nseen = []\nfor seq, prefix in rules:\n    net = ipaddress.ip_network(prefix)\n    shadowed_by = None\n    for earlier_seq, earlier in seen:\n        if net.subnet_of(ipaddress.ip_network(earlier)):\n            shadowed_by = earlier_seq\n            break\n    if shadowed_by is None:\n        print(f\"Rule {seq} {prefix}: OK\")\n    else:\n        print(f\"Rule {seq} {prefix}: SHADOWED by rule {shadowed_by}\")\n    seen.append((seq, prefix))\n",
       "solutionExplanation": "The solution builds the required data, applies the Policy Audit: Finding Shadowed Rules technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Rule 10 203.0.113.0/24: OK\nRule 20 203.0.113.128/25: SHADOWED by rule 10\nRule 30 198.51.100.0/24: OK\nRule 40 198.51.100.128/25: SHADOWED by rule 30",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Rule 40 198.51.100.128/25: SHADOWED by rule 30",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Policy Audit: Finding Shadowed Rules is the key idea here: A shadowed rule is a policy rule that can never match because an earlier rule already matches everything it would match, which usually means the rules are in the wrong order or one of them is redundant.",
        "approach": "Work through Policy Audit: Finding Shadowed Rules step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Route Policy Automation",
   "type": "write-code",
   "instructions": "Generate the route map POLICY from policy data with Jinja2 and test it against four routes. First print the route map: for each rule print 'route-map POLICY permit <seq>', ' match community <community>', ' set local-preference <local_pref>'. Rules: seq 10 community 64512:100 local-pref 200; seq 20 community 64512:200 local-pref 100. Then print a blank line and one test line per route in the form '<prefix> community <community>: local-pref <n>'. Routes: 203.0.113.0/24 with 64512:100; 198.51.100.0/24 with 64512:200.",
   "starterCode": "from jinja2 import Template\n\nrules = [\n    {\"seq\": 10, \"community\": \"64512:100\", \"local_pref\": 200},\n    {\"seq\": 20, \"community\": \"64512:200\", \"local_pref\": 100},\n]\ntemplate = Template(\"{% for r in rules %}route-map POLICY permit {{ r.seq }}\\n match community {{ r.community }}\\n set local-preference {{ r.local_pref }}\\n{% endfor %}\")\n# TODO: finish the program for Route Policy Automation Capstone below.\n",
   "solution": "from jinja2 import Template\n\nrules = [\n    {\"seq\": 10, \"community\": \"64512:100\", \"local_pref\": 200},\n    {\"seq\": 20, \"community\": \"64512:200\", \"local_pref\": 100},\n]\ntemplate = Template(\"{% for r in rules %}route-map POLICY permit {{ r.seq }}\\n match community {{ r.community }}\\n set local-preference {{ r.local_pref }}\\n{% endfor %}\")\nprint(template.render(rules=rules).strip())\nprint()\npolicy = {r[\"community\"]: r[\"local_pref\"] for r in rules}\nfor prefix, community in [(\"203.0.113.0/24\", \"64512:100\"), (\"198.51.100.0/24\", \"64512:200\")]:\n    print(f\"{prefix} community {community}: local-pref {policy[community]}\")\n",
   "solutionExplanation": "The solution builds the required data, applies the Route Policy Automation Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "route-map POLICY permit 10\n match community 64512:100\n set local-preference 200\nroute-map POLICY permit 20\n match community 64512:200\n set local-preference 100\n\n203.0.113.0/24 community 64512:100: local-pref 200\n198.51.100.0/24 community 64512:200: local-pref 100",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "198.51.100.0/24 community 64512:200: local-pref 100",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through Route Policy Automation Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "Route Policy Automation Capstone Project",
   "description": "Generate a customer, peer, and transit route policy as a route map and prove it with a test harness.",
   "requirements": [
    "Generate the route map POLICY from policy data with Jinja2.",
    "Apply at least three of these skills: Prefix lists, Route maps, Community policy, Policy testing.",
    "Test the policy against both accept and reject cases before finishing.",
    "Audit the rules for shadowing and report the result."
   ],
   "rubric": [
    "The generated route map is complete and matches the policy data.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-vxlan-evpn",
  "slug": "netauto-protocols-vxlan-evpn",
  "language": "python",
  "category": "devops",
  "title": "VXLAN and EVPN Configs",
  "description": "Build VXLAN overlays with EVPN: VNIs, VTEPs, route types, route distinguishers and targets, the EVPN address family, VLAN-to-VNI mappings, and validation of the generated leaf config.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "VXLAN concepts",
   "VTEPs",
   "EVPN route types",
   "Route distinguishers",
   "EVPN address family",
   "VLAN-to-VNI mapping",
   "EVPN MAC learning",
   "Control-plane options",
   "Leaf config generation",
   "VXLAN validation"
  ],
  "prerequisites": [
   "netauto-protocols-bgp-config",
   "netauto-protocols-route-policy"
  ],
  "analogy": "Learning {topic} is like learning how a subway tunnel carries whole streets underground: the tunnel hides the streets below, and the stations at each end know exactly where every passenger belongs.",
  "modules": [
   {
    "id": "netauto-protocols-vxlan-evpn-m1",
    "title": "VXLAN and EVPN Configs Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-vxlan-evpn-m1-l1",
      "slug": "netauto-protocols-vxlan-evpn-m1-l1",
      "title": "What VXLAN Is",
      "concept": "VXLAN is an overlay technology that carries Layer 2 Ethernet frames inside UDP packets, so virtual machines on different hosts behave as if they were on the same switch. Each overlay network gets a 24-bit VXLAN Network Identifier (VNI), which allows over 16 million isolated networks compared with 4094 VLANs. VXLAN packets use UDP destination port 4789 and are carried across an ordinary IP underlay network.",
      "syntax": "VNI range: 1-16777214\nUDP destination port 4789",
      "exampleCode": "vnis = [10010, 10020, 16777215]\nfor vni in vnis:\n    print(vni, 'valid' if 1 <= vni <= 16777214 else 'invalid')",
      "exampleLanguage": "python",
      "mistake": "Using VNI 16777215, which is reserved and cannot be assigned to a network.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate What VXLAN Is, but it does not work correctly.",
       "buggyCode": "vni = 16777215\nvalid = 1 <= vni <= 16777215  # top of the range",
       "fixedCode": "vni = 16777215\nvalid = 1 <= vni <= 16777214  # 16777215 is reserved",
       "explanation": "The VNI range ends at 16777214; 16777215 is reserved and must be rejected by validation."
      },
      "exercise": {
       "title": "Practise What VXLAN Is",
       "type": "write-code",
       "instructions": "Validate four VNIs (10010 tenant web, 10020 tenant db, 16777215 reserved, 0 invalid) and print one line per VNI in the form 'VNI <n>: valid (<tenant>)' or 'VNI <n>: invalid (<reason>)'. Valid range is 1 to 16777214.",
       "starterCode": "vnis = [\n    (10010, \"tenant web\"),\n    (10020, \"tenant db\"),\n    (16777215, \"reserved\"),\n    (0, \"invalid\"),\n]\n# TODO: finish the program for What VXLAN Is below.\n",
       "solution": "vnis = [\n    (10010, \"tenant web\"),\n    (10020, \"tenant db\"),\n    (16777215, \"reserved\"),\n    (0, \"invalid\"),\n]\nfor vni, label in vnis:\n    if 1 <= vni <= 16777214:\n        print(f\"VNI {vni}: valid ({label})\")\n    else:\n        print(f\"VNI {vni}: invalid ({label})\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What VXLAN Is technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "VNI 10010: valid (tenant web)\nVNI 10020: valid (tenant db)\nVNI 16777215: invalid (reserved)\nVNI 0: invalid (invalid)",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "VNI 0: invalid (invalid)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What VXLAN Is is the key idea here: VXLAN is an overlay technology that carries Layer 2 Ethernet frames inside UDP packets, so virtual machines on different hosts behave as if they were on the same switch.",
        "approach": "Work through What VXLAN Is step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-vxlan-evpn-m1-l2",
      "slug": "netauto-protocols-vxlan-evpn-m1-l2",
      "title": "VTEPs and Tunnel Endpoints",
      "concept": "A VXLAN Tunnel Endpoint (VTEP) is the device that encapsulates Ethernet frames into VXLAN packets and decapsulates them at the far end, and every VTEP has an IP address on the underlay network. When a VTEP learns that a MAC address lives behind a remote VTEP, it encapsulates the frame and sends it to that VTEP's underlay address. The underlay only needs to route between VTEP addresses; it never sees the overlay MAC addresses.",
      "syntax": "interface nve1\n source-interface Loopback0\n member vni 10010",
      "exampleCode": "vteps = [\n    {'name': 'leaf1', 'address': '10.0.0.11', 'vni': 10010},\n    {'name': 'leaf2', 'address': '10.0.0.12', 'vni': 10010},\n]\nfor v in vteps:\n    print(f\"VTEP {v['name']} {v['address']} VNI {v['vni']}\")",
      "exampleLanguage": "python",
      "mistake": "Giving two VTEPs the same underlay IP address, so encapsulated traffic is delivered to the wrong leaf.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate VTEPs and Tunnel Endpoints, but it does not work correctly.",
       "buggyCode": "vteps = [{'name': 'leaf1', 'address': '10.0.0.11'}, {'name': 'leaf2', 'address': '10.0.0.11'}]",
       "fixedCode": "vteps = [{'name': 'leaf1', 'address': '10.0.0.11'}, {'name': 'leaf2', 'address': '10.0.0.12'}]",
       "explanation": "VTEP underlay addresses must be unique; a duplicate address sends encapsulated traffic to the wrong leaf."
      },
      "exercise": {
       "title": "Practise VTEPs and Tunnel Endpoints",
       "type": "write-code",
       "instructions": "Build the VTEP table for three leaves (leaf1 10.0.0.11 VNI 10010; leaf2 10.0.0.12 VNI 10010; leaf3 10.0.0.13 VNI 10020) and print one line per VTEP in the form 'VTEP <name> <address> VNI <vni>'.",
       "starterCode": "rows = [{'name': 'leaf1', 'address': '10.0.0.11', 'vni': 10010}, {'name': 'leaf2', 'address': '10.0.0.12', 'vni': 10010}, {'name': 'leaf3', 'address': '10.0.0.13', 'vni': 10020}]\n# TODO: finish the program for VTEPs and Tunnel Endpoints below.\n",
       "solution": "rows = [{'name': 'leaf1', 'address': '10.0.0.11', 'vni': 10010}, {'name': 'leaf2', 'address': '10.0.0.12', 'vni': 10010}, {'name': 'leaf3', 'address': '10.0.0.13', 'vni': 10020}]\nfor r in rows:\n    print('VTEP {name} {address} VNI {vni}'.format(**r))\n",
       "solutionExplanation": "The solution builds the required data, applies the VTEPs and Tunnel Endpoints technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "VTEP leaf1 10.0.0.11 VNI 10010\nVTEP leaf2 10.0.0.12 VNI 10010\nVTEP leaf3 10.0.0.13 VNI 10020",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "VTEP leaf3 10.0.0.13 VNI 10020",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "VTEPs and Tunnel Endpoints is the key idea here: A VXLAN Tunnel Endpoint (VTEP) is the device that encapsulates Ethernet frames into VXLAN packets and decapsulates them at the far end, and every VTEP has an IP address on the underlay network.",
        "approach": "Work through VTEPs and Tunnel Endpoints step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-vxlan-evpn-m1-l3",
      "slug": "netauto-protocols-vxlan-evpn-m1-l3",
      "title": "EVPN Route Types",
      "concept": "EVPN uses BGP to distribute overlay information, and each kind of information has its own route type: Type 1 advertises Ethernet segment reachability, Type 2 carries MAC and IP bindings, Type 3 carries inclusive multicast routes for broadcast traffic, Type 4 carries Ethernet segment election, and Type 5 carries IP prefixes for inter-subnet routing. A leaf learns remote MAC addresses from Type 2 routes instead of flooding, which is the main advantage of EVPN over flood-and-learn VXLAN.",
      "syntax": "Type 1 Ethernet segment\nType 2 MAC/IP advertisement\nType 3 Inclusive multicast\nType 5 IP prefix",
      "exampleCode": "route_types = {1: 'Ethernet segment', 2: 'MAC/IP advertisement', 3: 'Inclusive multicast', 5: 'IP prefix'}\nprint(route_types[2])",
      "exampleLanguage": "python",
      "mistake": "Expecting a leaf to learn remote MAC addresses by flooding, which is what EVPN Type 2 routes replace.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate EVPN Route Types, but it does not work correctly.",
       "buggyCode": "# leaf learns MAC 00:11:22:33:44:55 by flooding the VNI",
       "fixedCode": "# leaf learns MAC 00:11:22:33:44:55 from a Type 2 route",
       "explanation": "EVPN distributes MAC bindings in Type 2 routes, so a leaf learns a remote MAC from BGP instead of by flooding."
      },
      "exercise": {
       "title": "Check your understanding: EVPN Route Types",
       "type": "multiple-choice",
       "instructions": "Which statement about EVPN Route Types is correct?",
       "starterCode": "",
       "solution": "EVPN uses BGP to distribute overlay information, and each kind of information has its own route type: Type 1 advertises Ethernet segment reachability, Type 2 carries MAC and IP bindings, Type 3 carries inclusive multicast routes for broadcast traffic, Type 4 carries Ethernet segment election, and Type 5 carries IP prefixes for inter-subnet routing.",
       "solutionExplanation": "EVPN uses BGP to distribute overlay information, and each kind of information has its own route type: Type 1 advertises Ethernet segment reachability, Type 2 carries MAC and IP bindings, Type 3 carries inclusive multicast routes for broadcast traffic, Type 4 carries Ethernet segment election, and Type 5 carries IP prefixes for inter-subnet routing. The other options are false: EVPN Route Types is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "EVPN uses BGP to distribute overlay information, and each kind of information has its own route type: Type 1 advertises Ethernet segment reachability, Type 2 carries MAC and IP bindings, Type 3 carries inclusive multicast routes for broadcast traffic, Type 4 carries Ethernet segment election, and Type 5 carries IP prefixes for inter-subnet routing.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of EVPN Route Types from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "EVPN uses BGP to distribute overlay information, and each kind of information has its own route type: Type 1 advertises Ethernet segment reachability, Type 2 carries MAC and IP bindings, Type 3 carries inclusive multicast routes for broadcast traffic, Type 4 carries Ethernet segment election, and Type 5 carries IP prefixes for inter-subnet routing.",
        "EVPN Route Types can only be used once in a program",
        "EVPN Route Types requires a separate paid licence to use",
        "EVPN Route Types is not available in Python",
        "EVPN Route Types only works when the program prints text"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-protocols-vxlan-evpn-m1-l4",
      "slug": "netauto-protocols-vxlan-evpn-m1-l4",
      "title": "Route Distinguishers and Route Targets",
      "concept": "A route distinguisher (RD) makes a VPN route unique by prefixing it with an identifier such as 64512:100, so the same prefix in two tenants becomes two different VPN routes. A route target (RT) controls which routers import a route: a route is imported only by routers configured with a matching import RT, which is how tenants stay isolated. RDs are written as ASN:number or IP-address:number, and RTs use the same format.",
      "syntax": "RD 64512:100\nRT import 64512:100 export 64512:100",
      "exampleCode": "import re\n\npattern = re.compile(r'^(\\d+):(\\d+)$')\nprint(bool(pattern.match('64512:100')))  # True",
      "exampleLanguage": "python",
      "mistake": "Using the same route target for two tenants, which merges their routes and breaks isolation.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Route Distinguishers and Route Targets, but it does not work correctly.",
       "buggyCode": "rt = '64512:100'  # used by both tenant web and tenant db",
       "fixedCode": "rt_web = '64512:100'\nrt_db = '64512:200'  # one RT per tenant",
       "explanation": "Each tenant needs its own route target; sharing one RT imports both tenants' routes into both VRFs."
      },
      "exercise": {
       "title": "Practise Route Distinguishers and Route Targets",
       "type": "write-code",
       "instructions": "Validate four RD/RT strings against the format '<number>:<number>' (both parts 1 to 5 digits, first part 1 to 4294967295) and print one line per string in the form '<value>: valid RD/RT' or '<value>: invalid RD/RT'. Values: 64512:100, 64512:200, 64512, 64512:100:200.",
       "starterCode": "import re\n\npattern = re.compile(r\"^(\\d{1,10}):(\\d{1,5})$\")\nvalues = [\"64512:100\", \"64512:200\", \"64512\", \"64512:100:200\"]\n# TODO: finish the program for Route Distinguishers and Route Targets below.\n",
       "solution": "import re\n\npattern = re.compile(r\"^(\\d{1,10}):(\\d{1,5})$\")\nvalues = [\"64512:100\", \"64512:200\", \"64512\", \"64512:100:200\"]\nfor value in values:\n    m = pattern.match(value)\n    valid = bool(m) and 1 <= int(m.group(1)) <= 4294967295 and 1 <= int(m.group(2)) <= 65535\n    print(f\"{value}: {'valid' if valid else 'invalid'} RD/RT\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Route Distinguishers and Route Targets technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "64512:100: valid RD/RT\n64512:200: valid RD/RT\n64512: invalid RD/RT\n64512:100:200: invalid RD/RT",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "64512:100:200: invalid RD/RT",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Route Distinguishers and Route Targets is the key idea here: A route distinguisher (RD) makes a VPN route unique by prefixing it with an identifier such as 64512:100, so the same prefix in two tenants becomes two different VPN routes.",
        "approach": "Work through Route Distinguishers and Route Targets step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-vxlan-evpn-m1-l5",
      "slug": "netauto-protocols-vxlan-evpn-m1-l5",
      "title": "EVPN Address Family Config",
      "concept": "The BGP EVPN address family (AFI 25, SAFI 70) carries EVPN routes between leaf and spine routers, and a neighbour must be activated in that family before any EVPN route is exchanged. The address family configuration also sets the route reflector client relationship and the send-community setting so route targets travel with the routes. Without the EVPN address family, the BGP session carries only ordinary unicast routes and the overlay never forms.",
      "syntax": "address-family l2vpn evpn\n neighbor 10.0.0.1 activate\n neighbor 10.0.0.1 send-community extended",
      "exampleCode": "router bgp 64512\n address-family l2vpn evpn\n  neighbor 10.0.0.1 activate\n  neighbor 10.0.0.1 send-community extended\n exit-address-family",
      "exampleLanguage": "python",
      "mistake": "Forgetting send-community extended in the EVPN family, so route targets are stripped and no leaf imports any EVPN route.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate EVPN Address Family Config, but it does not work correctly.",
       "buggyCode": "address-family l2vpn evpn\n neighbor 10.0.0.1 activate  # no send-community extended",
       "fixedCode": "address-family l2vpn evpn\n neighbor 10.0.0.1 activate\n neighbor 10.0.0.1 send-community extended",
       "explanation": "Route targets travel in extended communities, so the EVPN family needs send-community extended or no route is ever imported."
      },
      "exercise": {
       "title": "Practise EVPN Address Family Config",
       "type": "write-code",
       "instructions": "Render the BGP EVPN address-family configuration for AS 64512 with Jinja2: print 'router bgp <asn>', ' address-family l2vpn evpn', one line per neighbour in the form '  neighbor <address> activate', one line per neighbour in the form '  neighbor <address> send-community extended', and ' exit-address-family'. Neighbours: 10.0.0.1 and 10.0.0.2. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'neighbors': ['10.0.0.1', '10.0.0.2']}\ntemplate = Template('router bgp {{ asn }}\\n address-family l2vpn evpn\\n{% for n in neighbors %}  neighbor {{ n }} activate\\n{% endfor %}{% for n in neighbors %}  neighbor {{ n }} send-community extended\\n{% endfor %} exit-address-family')\n# TODO: finish the program for EVPN Address Family Config below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'neighbors': ['10.0.0.1', '10.0.0.2']}\ntemplate = Template('router bgp {{ asn }}\\n address-family l2vpn evpn\\n{% for n in neighbors %}  neighbor {{ n }} activate\\n{% endfor %}{% for n in neighbors %}  neighbor {{ n }} send-community extended\\n{% endfor %} exit-address-family')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the EVPN Address Family Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n address-family l2vpn evpn\n  neighbor 10.0.0.1 activate\n  neighbor 10.0.0.2 activate\n  neighbor 10.0.0.1 send-community extended\n  neighbor 10.0.0.2 send-community extended\n exit-address-family",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " exit-address-family",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "EVPN Address Family Config is the key idea here: The BGP EVPN address family (AFI 25, SAFI 70) carries EVPN routes between leaf and spine routers, and a neighbour must be activated in that family before any EVPN route is exchanged.",
        "approach": "Work through EVPN Address Family Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-vxlan-evpn-m2",
    "title": "VXLAN and EVPN Configs in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-protocols-vxlan-evpn-m2-l1",
      "slug": "netauto-protocols-vxlan-evpn-m2-l1",
      "title": "VXLAN VLAN-to-VNI Mapping",
      "concept": "A VLAN-to-VNI mapping connects a local VLAN to an overlay network: traffic arriving on the VLAN is encapsulated into the mapped VNI, and traffic arriving in that VNI is delivered to the VLAN. Each mapping is a one-to-one association between a VLAN ID and a VNI, and the same VNI is used for that VLAN on every leaf in the fabric. The mapping is configured on the VTEP with a simple vlan-to-vni statement per pair.",
      "syntax": "interface nve1\n member vni 10010\n  mcast-group 239.1.1.1\nvlan 10\n vn-segment 10010",
      "exampleCode": "mappings = [(10, 10010), (20, 10020)]\nfor vlan, vni in mappings:\n    print(f'VLAN {vlan} -> VNI {vni}')",
      "exampleLanguage": "python",
      "mistake": "Mapping the same VLAN to two different VNIs on one leaf, so traffic from that VLAN is split across two overlays.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate VXLAN VLAN-to-VNI Mapping, but it does not work correctly.",
       "buggyCode": "mappings = [(10, 10010), (10, 10020)]  # VLAN 10 in two VNIs",
       "fixedCode": "mappings = [(10, 10010), (20, 10020)]  # one VNI per VLAN",
       "explanation": "A VLAN maps to exactly one VNI; mapping it to two splits the VLAN's traffic across two overlay networks."
      },
      "exercise": {
       "title": "Practise VXLAN VLAN-to-VNI Mapping",
       "type": "write-code",
       "instructions": "Build the VLAN-to-VNI mapping for a leaf (VLAN 10 to VNI 10010, VLAN 20 to VNI 10020, VLAN 30 to VNI 10030) and print one line per mapping in the form 'VLAN <vlan> -> VNI <vni>'.",
       "starterCode": "rows = [{'vlan': 10, 'vni': 10010}, {'vlan': 20, 'vni': 10020}, {'vlan': 30, 'vni': 10030}]\n# TODO: finish the program for VXLAN VLAN-to-VNI Mapping below.\n",
       "solution": "rows = [{'vlan': 10, 'vni': 10010}, {'vlan': 20, 'vni': 10020}, {'vlan': 30, 'vni': 10030}]\nfor r in rows:\n    print('VLAN {vlan} -> VNI {vni}'.format(**r))\n",
       "solutionExplanation": "The solution builds the required data, applies the VXLAN VLAN-to-VNI Mapping technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "VLAN 10 -> VNI 10010\nVLAN 20 -> VNI 10020\nVLAN 30 -> VNI 10030",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "VLAN 30 -> VNI 10030",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "VXLAN VLAN-to-VNI Mapping is the key idea here: A VLAN-to-VNI mapping connects a local VLAN to an overlay network: traffic arriving on the VLAN is encapsulated into the mapped VNI, and traffic arriving in that VNI is delivered to the VLAN.",
        "approach": "Work through VXLAN VLAN-to-VNI Mapping step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-vxlan-evpn-m2-l2",
      "slug": "netauto-protocols-vxlan-evpn-m2-l2",
      "title": "EVPN MAC Learning and Type-2 Routes",
      "concept": "In EVPN, a leaf learns a MAC address locally when a host sends traffic, and then advertises it to the rest of the fabric in a Type 2 route that carries the MAC, the IP, the VNI, and the originating VTEP. Remote leaves install the MAC in their forwarding tables pointing at that VTEP, so unicast traffic goes directly to the right leaf without flooding. When a host moves, the new leaf advertises the same MAC with a higher sequence number and every leaf updates its table.",
      "syntax": "Type 2 route: MAC 00:11:22:33:44:55, IP 10.1.0.5, VNI 10010, VTEP 10.0.0.11",
      "exampleCode": "type2 = {'mac': '00:11:22:33:44:55', 'ip': '10.1.0.5', 'vni': 10010, 'vtep': '10.0.0.11'}\nprint(type2['mac'], 'behind', type2['vtep'])",
      "exampleLanguage": "python",
      "mistake": "Assuming a Type 2 route carries only the MAC address, and forgetting that it also carries the host IP and the originating VTEP.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate EVPN MAC Learning and Type-2 Routes, but it does not work correctly.",
       "buggyCode": "type2 = {'mac': '00:11:22:33:44:55'}  # MAC only",
       "fixedCode": "type2 = {'mac': '00:11:22:33:44:55', 'ip': '10.1.0.5', 'vni': 10010, 'vtep': '10.0.0.11'}",
       "explanation": "A Type 2 route carries the MAC, the host IP, the VNI, and the VTEP together; the IP and VTEP are what make the route usable."
      },
      "exercise": {
       "title": "Check your understanding: EVPN MAC Learning and Type-2 Routes",
       "type": "multiple-choice",
       "instructions": "Which statement about EVPN MAC Learning and Type-2 Routes is correct?",
       "starterCode": "",
       "solution": "In EVPN, a leaf learns a MAC address locally when a host sends traffic, and then advertises it to the rest of the fabric in a Type 2 route that carries the MAC, the IP, the VNI, and the originating VTEP.",
       "solutionExplanation": "In EVPN, a leaf learns a MAC address locally when a host sends traffic, and then advertises it to the rest of the fabric in a Type 2 route that carries the MAC, the IP, the VNI, and the originating VTEP. The other options are false: EVPN MAC Learning and Type-2 Routes is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "In EVPN, a leaf learns a MAC address locally when a host sends traffic, and then advertises it to the rest of the fabric in a Type 2 route that carries the MAC, the IP, the VNI, and the originating VTEP.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of EVPN MAC Learning and Type-2 Routes from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "In EVPN, a leaf learns a MAC address locally when a host sends traffic, and then advertises it to the rest of the fabric in a Type 2 route that carries the MAC, the IP, the VNI, and the originating VTEP.",
        "EVPN MAC Learning and Type-2 Routes can only be used once in a program",
        "EVPN MAC Learning and Type-2 Routes requires a separate paid licence to use",
        "EVPN MAC Learning and Type-2 Routes is not available in Python",
        "EVPN MAC Learning and Type-2 Routes only works when the program prints text"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-protocols-vxlan-evpn-m2-l3",
      "slug": "netauto-protocols-vxlan-evpn-m2-l3",
      "title": "VXLAN Multicast vs BGP Control Plane",
      "concept": "VXLAN originally used multicast in the underlay for broadcast, unknown-unicast, and multicast traffic, which required every underlay device to support multicast routing. The BGP EVPN control plane replaces multicast with BGP advertisements: a leaf advertises which VTEPs want a VNI's broadcast traffic using Type 3 inclusive multicast routes. The BGP approach is the standard choice for new fabrics because it works on a plain unicast underlay and gives precise control over flooding.",
      "syntax": "Type 3 route: inclusive multicast for VNI 10010\nflood-list: leaf1, leaf2",
      "exampleCode": "Type 3 inclusive multicast route for VNI 10010:\n  originator 10.0.0.11\n  receivers: 10.0.0.12",
      "exampleLanguage": "python",
      "mistake": "Enabling multicast in the underlay for a new EVPN fabric, when BGP Type 3 routes already handle broadcast traffic on a unicast underlay.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate VXLAN Multicast vs BGP Control Plane, but it does not work correctly.",
       "buggyCode": "# underlay multicast enabled everywhere for VXLAN flooding",
       "fixedCode": "# underlay is plain unicast; Type 3 routes carry the flood list",
       "explanation": "With EVPN, Type 3 routes tell each leaf exactly which VTEPs want a VNI's broadcast traffic, so underlay multicast is unnecessary."
      },
      "exercise": {
       "title": "Check your understanding: VXLAN Multicast vs BGP Control Plane",
       "type": "multiple-choice",
       "instructions": "Which statement about VXLAN Multicast vs BGP Control Plane is correct?",
       "starterCode": "",
       "solution": "VXLAN originally used multicast in the underlay for broadcast, unknown-unicast, and multicast traffic, which required every underlay device to support multicast routing.",
       "solutionExplanation": "VXLAN originally used multicast in the underlay for broadcast, unknown-unicast, and multicast traffic, which required every underlay device to support multicast routing. The other options are false: VXLAN Multicast vs BGP Control Plane is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "VXLAN originally used multicast in the underlay for broadcast, unknown-unicast, and multicast traffic, which required every underlay device to support multicast routing.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of VXLAN Multicast vs BGP Control Plane from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "VXLAN Multicast vs BGP Control Plane can only be used once in a program",
        "VXLAN originally used multicast in the underlay for broadcast, unknown-unicast, and multicast traffic, which required every underlay device to support multicast routing.",
        "VXLAN Multicast vs BGP Control Plane requires a separate paid licence to use",
        "VXLAN Multicast vs BGP Control Plane is not available in Python",
        "VXLAN Multicast vs BGP Control Plane only works when the program prints text"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-protocols-vxlan-evpn-m2-l4",
      "slug": "netauto-protocols-vxlan-evpn-m2-l4",
      "title": "Generating a VXLAN Leaf Config",
      "concept": "A VXLAN leaf configuration combines the underlay BGP session, the EVPN address family, the VTEP definition, and the VLAN-to-VNI mappings into one generated file. The generator takes a leaf's loopback address, its ASN, and its tenant mappings and produces the complete configuration, so adding a tenant means adding one mapping to the data. The generated config is reviewed and validated before it is applied to the leaf.",
      "syntax": "interface nve1\n source-interface Loopback0\n member vni {{ vni }}",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('interface nve1\\n source-interface Loopback0\\n member vni {{ vni }}')\nprint(template.render(vni=10010))",
      "exampleLanguage": "python",
      "mistake": "Generating the leaf config without the EVPN address family, so the leaf has a VTEP but never learns any remote MAC addresses.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Generating a VXLAN Leaf Config, but it does not work correctly.",
       "buggyCode": "# leaf config: BGP underlay + NVE only, no address-family l2vpn evpn",
       "fixedCode": "# leaf config: BGP underlay + address-family l2vpn evpn + NVE",
       "explanation": "A VTEP without the EVPN address family never exchanges Type 2 routes, so the leaf cannot forward to remote hosts."
      },
      "exercise": {
       "title": "Practise Generating a VXLAN Leaf Config",
       "type": "write-code",
       "instructions": "Render the VXLAN leaf configuration for leaf1 (ASN 64512, loopback 10.0.0.11) with Jinja2: print 'router bgp <asn>', ' neighbor 10.0.0.1 remote-as 64512', ' address-family l2vpn evpn', '  neighbor 10.0.0.1 activate', ' exit-address-family', 'interface nve1', ' source-interface Loopback0', then one line per mapping in the form ' member vni <vni>'. Mappings: VNI 10010 and VNI 10020. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'spine': '10.0.0.1', 'vnis': [10010, 10020]}\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ spine }} remote-as {{ asn }}\\n address-family l2vpn evpn\\n  neighbor {{ spine }} activate\\n exit-address-family\\ninterface nve1\\n source-interface Loopback0\\n{% for v in vnis %} member vni {{ v }}\\n{% endfor %}')\n# TODO: finish the program for Generating a VXLAN Leaf Config below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'spine': '10.0.0.1', 'vnis': [10010, 10020]}\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ spine }} remote-as {{ asn }}\\n address-family l2vpn evpn\\n  neighbor {{ spine }} activate\\n exit-address-family\\ninterface nve1\\n source-interface Loopback0\\n{% for v in vnis %} member vni {{ v }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Generating a VXLAN Leaf Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n neighbor 10.0.0.1 remote-as 64512\n address-family l2vpn evpn\n  neighbor 10.0.0.1 activate\n exit-address-family\ninterface nve1\n source-interface Loopback0\n member vni 10010\n member vni 10020",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " member vni 10020",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Generating a VXLAN Leaf Config is the key idea here: A VXLAN leaf configuration combines the underlay BGP session, the EVPN address family, the VTEP definition, and the VLAN-to-VNI mappings into one generated file.",
        "approach": "Work through Generating a VXLAN Leaf Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-vxlan-evpn-m2-l5",
      "slug": "netauto-protocols-vxlan-evpn-m2-l5",
      "title": "Validating VXLAN/EVPN Config",
      "concept": "A VXLAN and EVPN configuration is validated by checking that every VNI is in the range 1 to 16777214, that every route distinguisher and route target matches the ASN:number or IP:number format, and that every VTEP address is reachable in the underlay data. Validation also checks that no VNI is mapped to two different VLANs on the same leaf, because that would merge two tenants' traffic. A config that fails any check is rejected before deployment.",
      "syntax": "assert 1 <= vni <= 16777214\nassert re.match(r'^\\d+:\\d+$', rd)\nassert len(set(vnis)) == len(vnis)",
      "exampleCode": "import re\n\nvni = 10010\nprint(1 <= vni <= 16777214 and bool(re.match(r'^\\d+:\\d+$', '64512:100')))",
      "exampleLanguage": "python",
      "mistake": "Validating only the VNI range and skipping the RD/RT format check, so a malformed route target breaks tenant isolation at deployment.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Validating VXLAN/EVPN Config, but it does not work correctly.",
       "buggyCode": "checks = [1 <= vni <= 16777214]  # VNI range only",
       "fixedCode": "checks = [1 <= vni <= 16777214, bool(re.match(r'^\\d+:\\d+$', rd)), bool(re.match(r'^\\d+:\\d+$', rt))]",
       "explanation": "VNI range, RD format, and RT format are all separate checks; skipping any one lets a bad value reach the fabric."
      },
      "exercise": {
       "title": "Practise Validating VXLAN/EVPN Config",
       "type": "write-code",
       "instructions": "Validate a leaf configuration: VNIs [10010, 10020, 16777215], RD '64512:100', RT '64512:100', and VTEP addresses ['10.0.0.11', '10.0.0.12'] against underlay addresses ['10.0.0.11', '10.0.0.12']. Print 'PASS: VNI <n> in range' or 'FAIL: VNI <n> out of range' per VNI, 'PASS: RD 64512:100 format OK' or the FAIL line, 'PASS: RT 64512:100 format OK' or the FAIL line, 'PASS: all VTEPs reachable in underlay' or the FAIL line, then print 'Validation: <p> passed, <f> failed'.",
       "starterCode": "import re\n\nvnis = [10010, 10020, 16777215]\nrd = \"64512:100\"\nrt = \"64512:100\"\nvteps = [\"10.0.0.11\", \"10.0.0.12\"]\nunderlay = [\"10.0.0.11\", \"10.0.0.12\"]\npassed = 0\nfailed = 0\n# TODO: finish the program for Validating VXLAN/EVPN Config below.\n",
       "solution": "import re\n\nvnis = [10010, 10020, 16777215]\nrd = \"64512:100\"\nrt = \"64512:100\"\nvteps = [\"10.0.0.11\", \"10.0.0.12\"]\nunderlay = [\"10.0.0.11\", \"10.0.0.12\"]\npassed = 0\nfailed = 0\nfor vni in vnis:\n    if 1 <= vni <= 16777214:\n        print(f\"PASS: VNI {vni} in range\")\n        passed += 1\n    else:\n        print(f\"FAIL: VNI {vni} out of range\")\n        failed += 1\nfor label, value in [(\"RD\", rd), (\"RT\", rt)]:\n    if re.match(r\"^\\d+:\\d+$\", value):\n        print(f\"PASS: {label} {value} format OK\")\n        passed += 1\n    else:\n        print(f\"FAIL: {label} {value} bad format\")\n        failed += 1\nif all(v in underlay for v in vteps):\n    print(\"PASS: all VTEPs reachable in underlay\")\n    passed += 1\nelse:\n    print(\"FAIL: VTEP missing from underlay\")\n    failed += 1\nprint(f\"Validation: {passed} passed, {failed} failed\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Validating VXLAN/EVPN Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: VNI 10010 in range\nPASS: VNI 10020 in range\nFAIL: VNI 16777215 out of range\nPASS: RD 64512:100 format OK\nPASS: RT 64512:100 format OK\nPASS: all VTEPs reachable in underlay\nValidation: 5 passed, 1 failed",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Validation: 5 passed, 1 failed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating VXLAN/EVPN Config is the key idea here: A VXLAN and EVPN configuration is validated by checking that every VNI is in the range 1 to 16777214, that every route distinguisher and route target matches the ASN:number or IP:number format, and that every VTEP address is reachable in the underlay data.",
        "approach": "Work through Validating VXLAN/EVPN Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: VXLAN and EVPN Configs",
   "type": "write-code",
   "instructions": "Generate the VXLAN leaf configuration for leaf1 (ASN 64512, loopback 10.0.0.11) with Jinja2 and validate the VNIs. Print 'router bgp 64512', ' address-family l2vpn evpn', '  neighbor 10.0.0.1 activate', ' exit-address-family', 'interface nve1', ' source-interface Loopback0', then one line per mapping in the form ' member vni <vni>' (VNIs 10010 and 10020), then a blank line and one validation line per VNI in the form 'VNI <n>: valid'.",
   "starterCode": "from jinja2 import Template\n\ndata = {\"asn\": 64512, \"spine\": \"10.0.0.1\", \"vnis\": [10010, 10020]}\ntemplate = Template(\"router bgp {{ asn }}\\n address-family l2vpn evpn\\n  neighbor {{ spine }} activate\\n exit-address-family\\ninterface nve1\\n source-interface Loopback0\\n{% for v in vnis %} member vni {{ v }}\\n{% endfor %}\")\n# TODO: finish the program for VXLAN and EVPN Configs Capstone below.\n",
   "solution": "from jinja2 import Template\n\ndata = {\"asn\": 64512, \"spine\": \"10.0.0.1\", \"vnis\": [10010, 10020]}\ntemplate = Template(\"router bgp {{ asn }}\\n address-family l2vpn evpn\\n  neighbor {{ spine }} activate\\n exit-address-family\\ninterface nve1\\n source-interface Loopback0\\n{% for v in vnis %} member vni {{ v }}\\n{% endfor %}\")\nprint(template.render(**data).strip())\nprint()\nfor vni in data[\"vnis\"]:\n    status = \"valid\" if 1 <= vni <= 16777214 else \"invalid\"\n    print(f\"VNI {vni}: {status}\")\n",
   "solutionExplanation": "The solution builds the required data, applies the VXLAN and EVPN Configs Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "router bgp 64512\n address-family l2vpn evpn\n  neighbor 10.0.0.1 activate\n exit-address-family\ninterface nve1\n source-interface Loopback0\n member vni 10010\n member vni 10020\n\nVNI 10010: valid\nVNI 10020: valid",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "VNI 10020: valid",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through VXLAN and EVPN Configs Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "VXLAN and EVPN Configs Capstone Project",
   "description": "Generate and validate a complete VXLAN leaf configuration with the EVPN address family.",
   "requirements": [
    "Generate the VXLAN leaf configuration with the EVPN address family from one inventory with Jinja2.",
    "Apply at least three of these skills: VXLAN concepts, VTEPs, EVPN address family, VXLAN validation.",
    "Every VNI is validated to be in the range 1 to 16777214.",
    "Route distinguishers and route targets match the required format."
   ],
   "rubric": [
    "The generated config is complete and correct for the leaf.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-mpls-sr",
  "slug": "netauto-protocols-mpls-sr",
  "language": "python",
  "category": "devops",
  "title": "MPLS and Segment Routing",
  "description": "Build MPLS from first principles: labels and the label stack, LDP bindings, label-switched paths, MPLS VPN labels, segment routing SIDs and the SRGB, traffic engineering, and label plan validation.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "MPLS concepts",
   "LDP",
   "Label-switched paths",
   "MPLS VPNs",
   "Segment routing",
   "SRGB",
   "Traffic engineering",
   "Penultimate hop popping",
   "MPLS config generation",
   "Label plan validation"
  ],
  "prerequisites": [
   "netauto-protocols-vxlan-evpn",
   "netauto-protocols-ospf-config"
  ],
  "analogy": "Learning {topic} is like learning how a parcel sorting office works: each parcel gets a sticky label, and every office only reads the top label to decide where it goes next.",
  "modules": [
   {
    "id": "netauto-protocols-mpls-sr-m1",
    "title": "MPLS and Segment Routing Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-mpls-sr-m1-l1",
      "slug": "netauto-protocols-mpls-sr-m1-l1",
      "title": "What MPLS Is",
      "concept": "MPLS forwards packets by a short fixed-length label instead of a longest-prefix IP lookup, so the forwarding decision is a simple table lookup on the top label. A label is 20 bits long, giving values from 16 to 1048575 for forwarding, while values 0 to 15 are reserved for special meanings. Labels are only meaningful between two neighbouring routers, which is why MPLS scales: each router only needs to know its own label bindings.",
      "syntax": "label 16-1048575 usable\nlabel 0-15 reserved",
      "exampleCode": "stack = []\nstack.append(101)  # push\nprint(stack)  # [101]\nstack[-1] = 202  # swap\nprint(stack)  # [202]\nstack.pop()  # pop\nprint(stack)  # []",
      "exampleLanguage": "python",
      "mistake": "Treating an MPLS label as globally meaningful, so the same label is assumed to mean the same thing on every router in the network.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate What MPLS Is, but it does not work correctly.",
       "buggyCode": "label = 101\n# label 101 means 'to R2' everywhere in the network",
       "fixedCode": "label = 101\n# label 101 means 'to R2' only on the router that assigned it",
       "explanation": "Labels are locally significant: label 101 on one router can mean something completely different on its neighbour."
      },
      "exercise": {
       "title": "Practise What MPLS Is",
       "type": "write-code",
       "instructions": "Model an MPLS label stack as a Python list. Start empty, push label 101, push label 202, swap the top label to 303, then pop the top label. Print the stack after each operation in the form 'Stack: [101]', starting with 'Stack: []' for the empty stack.",
       "starterCode": "stack = []\n# TODO: finish the program for What MPLS Is below.\n",
       "solution": "stack = []\nprint(f\"Stack: {stack}\")\nstack.append(101)  # push\nprint(f\"Stack: {stack}\")\nstack.append(202)  # push\nprint(f\"Stack: {stack}\")\nstack[-1] = 303  # swap\nprint(f\"Stack: {stack}\")\nstack.pop()  # pop\nprint(f\"Stack: {stack}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What MPLS Is technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Stack: []\nStack: [101]\nStack: [101, 202]\nStack: [101, 303]\nStack: [101]",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Stack: [101]",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What MPLS Is is the key idea here: MPLS forwards packets by a short fixed-length label instead of a longest-prefix IP lookup, so the forwarding decision is a simple table lookup on the top label.",
        "approach": "Work through What MPLS Is step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-mpls-sr-m1-l2",
      "slug": "netauto-protocols-mpls-sr-m1-l2",
      "title": "Label Distribution with LDP",
      "concept": "The Label Distribution Protocol (LDP) lets neighbouring routers exchange label bindings, so each router learns which label to use to reach a prefix through its neighbour. LDP sessions run over TCP port 646 between routers whose loopback addresses are reachable through the IGP, and the session must be established before any labels are exchanged. Each router advertises one label per prefix it knows, and the receiving router installs the binding in its label forwarding table.",
      "syntax": "mpls ldp router-id Loopback0\n# LDP uses TCP port 646",
      "exampleCode": "bindings = [\n    {'prefix': '10.0.0.1/32', 'next_hop': 'R2', 'label': 101},\n]\nfor b in bindings:\n    print(f\"Prefix {b['prefix']} via {b['next_hop']} label {b['label']}\")",
      "exampleLanguage": "python",
      "mistake": "Enabling MPLS on an interface but forgetting LDP, so the router forwards labelled packets but never exchanges label bindings with its neighbour.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Label Distribution with LDP, but it does not work correctly.",
       "buggyCode": "interface GigabitEthernet0/0\n mpls ip  # LDP not enabled",
       "fixedCode": "interface GigabitEthernet0/0\n mpls ip\n mpls label protocol ldp",
       "explanation": "MPLS forwarding without LDP means no label bindings are exchanged, so the router has no labels to forward with."
      },
      "exercise": {
       "title": "Practise Label Distribution with LDP",
       "type": "write-code",
       "instructions": "Build the LDP label binding table for three prefixes (10.0.0.1/32 via R2 label 101; 10.0.0.2/32 via R2 label 102; 10.0.0.3/32 via R3 label 201) and print one line per binding in the form 'Prefix <prefix> via <next_hop> label <label>'.",
       "starterCode": "rows = [{'prefix': '10.0.0.1/32', 'next_hop': 'R2', 'label': 101}, {'prefix': '10.0.0.2/32', 'next_hop': 'R2', 'label': 102}, {'prefix': '10.0.0.3/32', 'next_hop': 'R3', 'label': 201}]\n# TODO: finish the program for Label Distribution with LDP below.\n",
       "solution": "rows = [{'prefix': '10.0.0.1/32', 'next_hop': 'R2', 'label': 101}, {'prefix': '10.0.0.2/32', 'next_hop': 'R2', 'label': 102}, {'prefix': '10.0.0.3/32', 'next_hop': 'R3', 'label': 201}]\nfor r in rows:\n    print('Prefix {prefix} via {next_hop} label {label}'.format(**r))\n",
       "solutionExplanation": "The solution builds the required data, applies the Label Distribution with LDP technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Prefix 10.0.0.1/32 via R2 label 101\nPrefix 10.0.0.2/32 via R2 label 102\nPrefix 10.0.0.3/32 via R3 label 201",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Prefix 10.0.0.3/32 via R3 label 201",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Label Distribution with LDP is the key idea here: The Label Distribution Protocol (LDP) lets neighbouring routers exchange label bindings, so each router learns which label to use to reach a prefix through its neighbour.",
        "approach": "Work through Label Distribution with LDP step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-mpls-sr-m1-l3",
      "slug": "netauto-protocols-mpls-sr-m1-l3",
      "title": "Label-Switched Paths",
      "concept": "A label-switched path (LSP) is the sequence of routers a labelled packet travels from ingress to egress, and it is built hop by hop as each router binds a label to the egress prefix. The ingress router pushes the first label, each transit router swaps it for the next label, and the egress router pops the last label and forwards the plain IP packet. An LSP follows the IGP's shortest path by default, and traffic engineering can steer it along a different path.",
      "syntax": "ingress: push label\ntransit: swap label\negress: pop label",
      "exampleCode": "lsp = ['R1 (push 101)', 'R2 (swap 101 -> 201)', 'R3 (pop 201)']\nprint(' -> '.join(lsp))",
      "exampleLanguage": "python",
      "mistake": "Assuming the label stays the same along the whole LSP, so a transit router is expected to forward a label it never agreed to.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Label-Switched Paths, but it does not work correctly.",
       "buggyCode": "# packet keeps label 101 from R1 all the way to R3",
       "fixedCode": "# R1 pushes 101, R2 swaps 101 for 201, R3 pops 201",
       "explanation": "Each hop swaps the label for the next one; the label is only valid between the two routers that agreed on it."
      },
      "exercise": {
       "title": "Check your understanding: Label-Switched Paths",
       "type": "multiple-choice",
       "instructions": "Which statement about Label-Switched Paths is correct?",
       "starterCode": "",
       "solution": "A label-switched path (LSP) is the sequence of routers a labelled packet travels from ingress to egress, and it is built hop by hop as each router binds a label to the egress prefix.",
       "solutionExplanation": "A label-switched path (LSP) is the sequence of routers a labelled packet travels from ingress to egress, and it is built hop by hop as each router binds a label to the egress prefix. The other options are false: Label-Switched Paths is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A label-switched path (LSP) is the sequence of routers a labelled packet travels from ingress to egress, and it is built hop by hop as each router binds a label to the egress prefix.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Label-Switched Paths from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "A label-switched path (LSP) is the sequence of routers a labelled packet travels from ingress to egress, and it is built hop by hop as each router binds a label to the egress prefix.",
        "Label-Switched Paths can only be used once in a program",
        "Label-Switched Paths requires a separate paid licence to use",
        "Label-Switched Paths is not available in Python",
        "Label-Switched Paths only works when the program prints text"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-protocols-mpls-sr-m1-l4",
      "slug": "netauto-protocols-mpls-sr-m1-l4",
      "title": "MPLS VPNs and Labels",
      "concept": "An MPLS VPN carries customer routes across a provider network by stacking two labels: the outer transport label reaches the egress provider edge router, and the inner VPN label identifies the customer and the VRF. The VPN label is allocated by the egress router and advertised with the VPN route over MP-BGP, so the ingress router learns both the label and the next hop together. The customer never sees either label; the provider edge routers add and remove them.",
      "syntax": "outer label: transport to egress PE\ninner label: VPN label for the customer VRF",
      "exampleCode": "stack = [1001, 5001]  # [transport label, VPN label]\nprint(f'Transport {stack[0]}, VPN {stack[1]}')",
      "exampleLanguage": "python",
      "mistake": "Using one label for both transport and VPN identification, so the egress router cannot tell which customer the packet belongs to.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate MPLS VPNs and Labels, but it does not work correctly.",
       "buggyCode": "stack = [1001]  # one label for transport and VPN",
       "fixedCode": "stack = [1001, 5001]  # transport label 1001, VPN label 5001",
       "explanation": "Two labels are needed: the transport label reaches the egress router and the VPN label identifies the customer VRF."
      },
      "exercise": {
       "title": "Practise MPLS VPNs and Labels",
       "type": "write-code",
       "instructions": "Allocate VPN labels for three customer prefixes from base label 5000, one label per prefix in order. Print one line per allocation in the form '<prefix> in VRF <vrf>: VPN label <label>'. Prefixes: 10.1.0.0/24 in VRF WEB label 5000; 10.2.0.0/24 in VRF DB label 5001; 10.3.0.0/24 in VRF WEB label 5002.",
       "starterCode": "allocations = [\n    (\"10.1.0.0/24\", \"WEB\"),\n    (\"10.2.0.0/24\", \"DB\"),\n    (\"10.3.0.0/24\", \"WEB\"),\n]\nbase = 5000\n# TODO: finish the program for MPLS VPNs and Labels below.\n",
       "solution": "allocations = [\n    (\"10.1.0.0/24\", \"WEB\"),\n    (\"10.2.0.0/24\", \"DB\"),\n    (\"10.3.0.0/24\", \"WEB\"),\n]\nbase = 5000\nfor i, (prefix, vrf) in enumerate(allocations):\n    print(f\"{prefix} in VRF {vrf}: VPN label {base + i}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the MPLS VPNs and Labels technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "10.1.0.0/24 in VRF WEB: VPN label 5000\n10.2.0.0/24 in VRF DB: VPN label 5001\n10.3.0.0/24 in VRF WEB: VPN label 5002",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "10.3.0.0/24 in VRF WEB: VPN label 5002",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "MPLS VPNs and Labels is the key idea here: An MPLS VPN carries customer routes across a provider network by stacking two labels: the outer transport label reaches the egress provider edge router, and the inner VPN label identifies the customer and the VRF.",
        "approach": "Work through MPLS VPNs and Labels step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-mpls-sr-m1-l5",
      "slug": "netauto-protocols-mpls-sr-m1-l5",
      "title": "Segment Routing Basics",
      "concept": "Segment routing replaces LDP's per-prefix label signalling with source routing: the ingress router pushes a stack of segment identifiers (SIDs), and each router forwards on the top SID. A prefix SID identifies a router or prefix and is derived from the router's loopback address, while an adjacency SID identifies a specific link. Because the path is encoded in the packet header, the network needs no per-flow state in the core.",
      "syntax": "prefix-SID: identifies a router or prefix\nadjacency-SID: identifies a specific link",
      "exampleCode": "base = 16000\nfor i, loopback in enumerate(['10.0.0.1', '10.0.0.2', '10.0.0.3'], start=1):\n    print(f'{loopback} -> SID {base + i}')",
      "exampleLanguage": "python",
      "mistake": "Assigning the same SID index to two routers, so two loopbacks map to the same label and traffic goes to the wrong router.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Segment Routing Basics, but it does not work correctly.",
       "buggyCode": "sids = {'R1': 16001, 'R2': 16001}  # same index twice",
       "fixedCode": "sids = {'R1': 16001, 'R2': 16002}  # one index per router",
       "explanation": "Each router needs a unique SID index; a duplicate index makes two loopbacks share one label."
      },
      "exercise": {
       "title": "Practise Segment Routing Basics",
       "type": "write-code",
       "instructions": "Compute prefix SIDs for three routers from the SRGB base 16000 and SID index (base + index). Print one line per router in the form '<name> loopback <loopback> -> SID <sid>'. Routers: R1 loopback 10.0.0.1 index 1; R2 loopback 10.0.0.2 index 2; R3 loopback 10.0.0.3 index 3.",
       "starterCode": "base = 16000\nrouters = [\n    (\"R1\", \"10.0.0.1\", 1),\n    (\"R2\", \"10.0.0.2\", 2),\n    (\"R3\", \"10.0.0.3\", 3),\n]\n# TODO: finish the program for Segment Routing Basics below.\n",
       "solution": "base = 16000\nrouters = [\n    (\"R1\", \"10.0.0.1\", 1),\n    (\"R2\", \"10.0.0.2\", 2),\n    (\"R3\", \"10.0.0.3\", 3),\n]\nfor name, loopback, index in routers:\n    print(f\"{name} loopback {loopback} -> SID {base + index}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Segment Routing Basics technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "R1 loopback 10.0.0.1 -> SID 16001\nR2 loopback 10.0.0.2 -> SID 16002\nR3 loopback 10.0.0.3 -> SID 16003",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "R3 loopback 10.0.0.3 -> SID 16003",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Segment Routing Basics is the key idea here: Segment routing replaces LDP's per-prefix label signalling with source routing: the ingress router pushes a stack of segment identifiers (SIDs), and each router forwards on the top SID.",
        "approach": "Work through Segment Routing Basics step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-mpls-sr-m2",
    "title": "MPLS and Segment Routing in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-protocols-mpls-sr-m2-l1",
      "slug": "netauto-protocols-mpls-sr-m2-l1",
      "title": "SRGB and Label Ranges",
      "concept": "The Segment Routing Global Block (SRGB) is the range of labels reserved for segment routing on a router, with a common default of 16000 to 23999. A prefix SID is computed as the SRGB base plus the SID index, so an index of 1 with a base of 16000 gives label 16001, and every router in the domain must use the same SRGB for SIDs to be consistent. Validation checks that every computed SID falls inside the SRGB and that no two prefixes share a SID.",
      "syntax": "segment-routing global-block 16000 23999",
      "exampleCode": "base, top = 16000, 23999\nprint(16000 <= 16001 <= 23999)  # True",
      "exampleLanguage": "python",
      "mistake": "Configuring different SRGB ranges on different routers, so the same SID index maps to different labels on different routers.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate SRGB and Label Ranges, but it does not work correctly.",
       "buggyCode": "# R1 SRGB 16000-23999, R2 SRGB 20000-27999",
       "fixedCode": "# every router: SRGB 16000-23999",
       "explanation": "All routers in a segment routing domain must use the same SRGB, or SID 16001 means one label on R1 and another on R2."
      },
      "exercise": {
       "title": "Practise SRGB and Label Ranges",
       "type": "write-code",
       "instructions": "Validate four SIDs against the SRGB 16000 to 23999 and print one line per SID in the form 'SID <n>: valid' or 'SID <n>: out of SRGB'. SIDs: 16001, 16002, 24000, 15999. Then print 'Validation: 2 valid, 2 out of range'.",
       "starterCode": "base, top = 16000, 23999\nsids = [16001, 16002, 24000, 15999]\nvalid = 0\n# TODO: finish the program for SRGB and Label Ranges below.\n",
       "solution": "base, top = 16000, 23999\nsids = [16001, 16002, 24000, 15999]\nvalid = 0\nfor sid in sids:\n    if base <= sid <= top:\n        print(f\"SID {sid}: valid\")\n        valid += 1\n    else:\n        print(f\"SID {sid}: out of SRGB\")\nprint(f\"Validation: {valid} valid, {len(sids) - valid} out of range\")\n",
       "solutionExplanation": "The solution builds the required data, applies the SRGB and Label Ranges technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "SID 16001: valid\nSID 16002: valid\nSID 24000: out of SRGB\nSID 15999: out of SRGB\nValidation: 2 valid, 2 out of range",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Validation: 2 valid, 2 out of range",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "SRGB and Label Ranges is the key idea here: The Segment Routing Global Block (SRGB) is the range of labels reserved for segment routing on a router, with a common default of 16000 to 23999.",
        "approach": "Work through SRGB and Label Ranges step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-mpls-sr-m2-l2",
      "slug": "netauto-protocols-mpls-sr-m2-l2",
      "title": "MPLS Traffic Engineering",
      "concept": "MPLS traffic engineering steers label-switched paths along explicit routes instead of the IGP shortest path, which lets a network balance load across links and reserve bandwidth for important traffic. RSVP-TE signals the path hop by hop and reserves bandwidth on each link, while segment routing achieves the same steering by encoding the path in the label stack. Traffic engineering is used when the shortest path is congested while other links sit idle.",
      "syntax": "explicit path: R1 -> R3 -> R2 (avoid congested R1 -> R2 link)",
      "exampleCode": "shortest = ['R1', 'R2']\nengineered = ['R1', 'R3', 'R2']\nprint(' -> '.join(engineered))",
      "exampleLanguage": "python",
      "mistake": "Enabling traffic engineering on a network where the shortest path is not congested, which adds signalling complexity for no benefit.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate MPLS Traffic Engineering, but it does not work correctly.",
       "buggyCode": "# TE tunnels on every link, even though no link is over 30% used",
       "fixedCode": "# TE tunnels only where the shortest path is congested",
       "explanation": "Traffic engineering pays off only when the shortest path is congested; elsewhere it is complexity with no benefit."
      },
      "exercise": {
       "title": "Check your understanding: MPLS Traffic Engineering",
       "type": "multiple-choice",
       "instructions": "Which statement about MPLS Traffic Engineering is correct?",
       "starterCode": "",
       "solution": "MPLS traffic engineering steers label-switched paths along explicit routes instead of the IGP shortest path, which lets a network balance load across links and reserve bandwidth for important traffic.",
       "solutionExplanation": "MPLS traffic engineering steers label-switched paths along explicit routes instead of the IGP shortest path, which lets a network balance load across links and reserve bandwidth for important traffic. The other options are false: MPLS Traffic Engineering is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "MPLS traffic engineering steers label-switched paths along explicit routes instead of the IGP shortest path, which lets a network balance load across links and reserve bandwidth for important traffic.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of MPLS Traffic Engineering from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "MPLS Traffic Engineering can only be used once in a program",
        "MPLS Traffic Engineering requires a separate paid licence to use",
        "MPLS traffic engineering steers label-switched paths along explicit routes instead of the IGP shortest path, which lets a network balance load across links and reserve bandwidth for important traffic.",
        "MPLS Traffic Engineering is not available in Python",
        "MPLS Traffic Engineering only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-mpls-sr-m2-l3",
      "slug": "netauto-protocols-mpls-sr-m2-l3",
      "title": "Penultimate Hop Popping",
      "concept": "Penultimate hop popping (PHP) is the optimisation where the second-to-last router removes the top MPLS label, so the egress router receives a plain IP packet and does not need to do two lookups. The egress router signals PHP by advertising the implicit-null label (value 3) for its prefixes instead of a real label. PHP improves performance at the cost of the egress router losing the MPLS context, which matters for VPNs that need the label to choose a VRF.",
      "syntax": "implicit-null label 3: pop the label one hop early",
      "exampleCode": "labels = {'explicit-null': 0, 'implicit-null': 3}\nprint(labels['implicit-null'])",
      "exampleLanguage": "python",
      "mistake": "Expecting PHP to work for MPLS VPNs, where the egress router needs the VPN label to choose the customer VRF.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Penultimate Hop Popping, but it does not work correctly.",
       "buggyCode": "# PHP enabled on a VPN egress router: VPN label popped early",
       "fixedCode": "# VPN egress router advertises a real VPN label, not implicit-null",
       "explanation": "PHP removes the top label one hop early, which is fine for plain IP but breaks VPNs that need the label to pick a VRF."
      },
      "exercise": {
       "title": "Check your understanding: Penultimate Hop Popping",
       "type": "multiple-choice",
       "instructions": "Which statement about Penultimate Hop Popping is correct?",
       "starterCode": "",
       "solution": "Penultimate hop popping (PHP) is the optimisation where the second-to-last router removes the top MPLS label, so the egress router receives a plain IP packet and does not need to do two lookups.",
       "solutionExplanation": "Penultimate hop popping (PHP) is the optimisation where the second-to-last router removes the top MPLS label, so the egress router receives a plain IP packet and does not need to do two lookups. The other options are false: Penultimate Hop Popping is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Penultimate hop popping (PHP) is the optimisation where the second-to-last router removes the top MPLS label, so the egress router receives a plain IP packet and does not need to do two lookups.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Penultimate Hop Popping from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Penultimate Hop Popping can only be used once in a program",
        "Penultimate Hop Popping requires a separate paid licence to use",
        "Penultimate hop popping (PHP) is the optimisation where the second-to-last router removes the top MPLS label, so the egress router receives a plain IP packet and does not need to do two lookups.",
        "Penultimate Hop Popping is not available in Python",
        "Penultimate Hop Popping only works when the program prints text"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-protocols-mpls-sr-m2-l4",
      "slug": "netauto-protocols-mpls-sr-m2-l4",
      "title": "Generating MPLS Interface Config",
      "concept": "MPLS interface configuration enables MPLS and LDP on the interfaces that connect to other MPLS routers, and it is generated from the topology data so every link is covered. The generator emits the mpls ip and mpls label protocol commands for each interface and the global LDP router-id from the loopback address. Generating the config from topology data guarantees that an interface is never left without MPLS while its neighbour expects it.",
      "syntax": "interface {{ name }}\n mpls ip\n mpls label protocol ldp",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('interface {{ name }}\\n mpls ip')\nprint(template.render(name='GigabitEthernet0/0'))",
      "exampleLanguage": "python",
      "mistake": "Enabling MPLS on an interface that faces a customer instead of another MPLS router, so customer traffic is labelled by mistake.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Generating MPLS Interface Config, but it does not work correctly.",
       "buggyCode": "interface GigabitEthernet0/1  # faces a customer\n mpls ip",
       "fixedCode": "interface GigabitEthernet0/0  # faces another MPLS router\n mpls ip",
       "explanation": "MPLS belongs only on interfaces that connect to other MPLS routers; a customer-facing interface must stay plain IP."
      },
      "exercise": {
       "title": "Practise Generating MPLS Interface Config",
       "type": "write-code",
       "instructions": "Render the MPLS configuration for a router (loopback 10.0.0.1) with Jinja2: print 'mpls ldp router-id Loopback0 force', 'interface Loopback0', ' ip address 10.0.0.1 255.255.255.255', then for each core interface print 'interface <name>', ' mpls ip', ' mpls label protocol ldp'. Core interfaces: GigabitEthernet0/0 and GigabitEthernet0/1. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'loopback': '10.0.0.1', 'interfaces': ['GigabitEthernet0/0', 'GigabitEthernet0/1']}\ntemplate = Template('mpls ldp router-id Loopback0 force\\ninterface Loopback0\\n ip address {{ loopback }} 255.255.255.255\\n{% for i in interfaces %}interface {{ i }}\\n mpls ip\\n mpls label protocol ldp\\n{% endfor %}')\n# TODO: finish the program for Generating MPLS Interface Config below.\n",
       "solution": "from jinja2 import Template\ndata = {'loopback': '10.0.0.1', 'interfaces': ['GigabitEthernet0/0', 'GigabitEthernet0/1']}\ntemplate = Template('mpls ldp router-id Loopback0 force\\ninterface Loopback0\\n ip address {{ loopback }} 255.255.255.255\\n{% for i in interfaces %}interface {{ i }}\\n mpls ip\\n mpls label protocol ldp\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Generating MPLS Interface Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "mpls ldp router-id Loopback0 force\ninterface Loopback0\n ip address 10.0.0.1 255.255.255.255\ninterface GigabitEthernet0/0\n mpls ip\n mpls label protocol ldp\ninterface GigabitEthernet0/1\n mpls ip\n mpls label protocol ldp",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " mpls label protocol ldp",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Generating MPLS Interface Config is the key idea here: MPLS interface configuration enables MPLS and LDP on the interfaces that connect to other MPLS routers, and it is generated from the topology data so every link is covered.",
        "approach": "Work through Generating MPLS Interface Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-mpls-sr-m2-l5",
      "slug": "netauto-protocols-mpls-sr-m2-l5",
      "title": "Validating an MPLS Label Plan",
      "concept": "An MPLS label plan is validated by checking that every label is within the usable range 16 to 1048575, that no label is assigned to two different prefixes on the same router, and that every prefix has a label binding on every transit router along its path. The validation also checks that segment routing SIDs fall inside the configured SRGB. A plan that fails validation would blackhole traffic, so it is checked before any label is advertised.",
      "syntax": "assert 16 <= label <= 1048575\nassert len(set(labels)) == len(labels)",
      "exampleCode": "labels = [101, 102, 101]\nprint(len(set(labels)) == len(labels))  # False: duplicate",
      "exampleLanguage": "python",
      "mistake": "Checking the label range but not checking for duplicate labels, so two prefixes share one label and traffic goes to the wrong destination.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Validating an MPLS Label Plan, but it does not work correctly.",
       "buggyCode": "checks = [16 <= label <= 1048575 for label in labels]  # range only",
       "fixedCode": "checks = [16 <= label <= 1048575 for label in labels] + [len(set(labels)) == len(labels)]",
       "explanation": "A duplicate label is as dangerous as an out-of-range one; both checks belong in validation."
      },
      "exercise": {
       "title": "Practise Validating an MPLS Label Plan",
       "type": "write-code",
       "instructions": "Validate a label plan with three bindings (10.0.0.1/32 label 101; 10.0.0.2/32 label 102; 10.0.0.3/32 label 101) and SRGB 16000 to 23999 with SIDs [16001, 16002]. Print 'PASS: label <n> for <prefix> in range' or 'FAIL: label <n> for <prefix> out of range' per binding, 'FAIL: duplicate label 101' if any label repeats, 'PASS: all SIDs in SRGB' or the FAIL line, then print 'Validation: <p> passed, <f> failed'.",
       "starterCode": "bindings = [\n    (\"10.0.0.1/32\", 101),\n    (\"10.0.0.2/32\", 102),\n    (\"10.0.0.3/32\", 101),\n]\nsids = [16001, 16002]\npassed = 0\nfailed = 0\n# TODO: finish the program for Validating an MPLS Label Plan below.\n",
       "solution": "bindings = [\n    (\"10.0.0.1/32\", 101),\n    (\"10.0.0.2/32\", 102),\n    (\"10.0.0.3/32\", 101),\n]\nsids = [16001, 16002]\npassed = 0\nfailed = 0\nfor prefix, label in bindings:\n    if 16 <= label <= 1048575:\n        print(f\"PASS: label {label} for {prefix} in range\")\n        passed += 1\n    else:\n        print(f\"FAIL: label {label} for {prefix} out of range\")\n        failed += 1\nlabels = [label for _, label in bindings]\nif len(set(labels)) != len(labels):\n    print(\"FAIL: duplicate label 101\")\n    failed += 1\nif all(16000 <= sid <= 23999 for sid in sids):\n    print(\"PASS: all SIDs in SRGB\")\n    passed += 1\nelse:\n    print(\"FAIL: SID out of SRGB\")\n    failed += 1\nprint(f\"Validation: {passed} passed, {failed} failed\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Validating an MPLS Label Plan technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: label 101 for 10.0.0.1/32 in range\nPASS: label 102 for 10.0.0.2/32 in range\nPASS: label 101 for 10.0.0.3/32 in range\nFAIL: duplicate label 101\nPASS: all SIDs in SRGB\nValidation: 4 passed, 1 failed",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Validation: 4 passed, 1 failed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating an MPLS Label Plan is the key idea here: An MPLS label plan is validated by checking that every label is within the usable range 16 to 1048575, that no label is assigned to two different prefixes on the same router, and that every prefix has a label binding on every transit router along its path.",
        "approach": "Work through Validating an MPLS Label Plan step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: MPLS and Segment Routing",
   "type": "write-code",
   "instructions": "Compute prefix SIDs for three routers from the SRGB base 16000 and validate them, then print the MPLS label plan. Print one line per router in the form '<name> loopback <loopback> -> SID <sid>' (R1 10.0.0.1 index 1; R2 10.0.0.2 index 2; R3 10.0.0.3 index 3), then print 'All SIDs in SRGB 16000-23999: True', then one line per label binding in the form 'Prefix <prefix> via <next_hop> label <label>' (10.0.0.1/32 via R2 label 101; 10.0.0.2/32 via R2 label 102).",
   "starterCode": "base, top = 16000, 23999\nrouters = [\n    (\"R1\", \"10.0.0.1\", 1),\n    (\"R2\", \"10.0.0.2\", 2),\n    (\"R3\", \"10.0.0.3\", 3),\n]\nsids = []\n# TODO: finish the program for MPLS and Segment Routing Capstone below.\n",
   "solution": "base, top = 16000, 23999\nrouters = [\n    (\"R1\", \"10.0.0.1\", 1),\n    (\"R2\", \"10.0.0.2\", 2),\n    (\"R3\", \"10.0.0.3\", 3),\n]\nsids = []\nfor name, loopback, index in routers:\n    sid = base + index\n    sids.append(sid)\n    print(f\"{name} loopback {loopback} -> SID {sid}\")\nprint(f\"All SIDs in SRGB {base}-{top}: {all(base <= s <= top for s in sids)}\")\nfor prefix, next_hop, label in [(\"10.0.0.1/32\", \"R2\", 101), (\"10.0.0.2/32\", \"R2\", 102)]:\n    print(f\"Prefix {prefix} via {next_hop} label {label}\")\n",
   "solutionExplanation": "The solution builds the required data, applies the MPLS and Segment Routing Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "R1 loopback 10.0.0.1 -> SID 16001\nR2 loopback 10.0.0.2 -> SID 16002\nR3 loopback 10.0.0.3 -> SID 16003\nAll SIDs in SRGB 16000-23999: True\nPrefix 10.0.0.1/32 via R2 label 101\nPrefix 10.0.0.2/32 via R2 label 102",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "Prefix 10.0.0.2/32 via R2 label 102",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through MPLS and Segment Routing Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "MPLS and Segment Routing Capstone Project",
   "description": "Compute a segment routing SID plan and a label binding table for a small MPLS core, and validate both.",
   "requirements": [
    "Compute prefix SIDs for three routers from the SRGB base 16000.",
    "Apply at least three of these skills: MPLS concepts, LDP, Segment routing, SRGB.",
    "Validate that every SID falls inside the SRGB and every label is in range.",
    "Build the label binding table for the core prefixes."
   ],
   "rubric": [
    "The SID plan and label table are complete and correct.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-bgp-validation",
  "slug": "netauto-protocols-bgp-validation",
  "language": "python",
  "category": "devops",
  "title": "BGP Validation and Troubleshooting",
  "description": "Troubleshoot BGP like a detective: session health checks, route table reading, prefix filters, AS-path loops, flap analysis, hijack detection, dampening, structured checklists, validation reports, and regression checks.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "BGP session health",
   "BGP route tables",
   "Prefix filters",
   "AS-path loops",
   "Flap analysis",
   "Hijack detection",
   "BGP dampening",
   "Troubleshooting checks",
   "Validation reports",
   "Regression checks"
  ],
  "prerequisites": [
   "netauto-protocols-bgp-config",
   "netauto-protocols-route-policy"
  ],
  "analogy": "Learning {topic} is like learning to be a detective for a postal network: the clues are in the tables, and every missing letter has a reason you can find.",
  "modules": [
   {
    "id": "netauto-protocols-bgp-validation-m1",
    "title": "BGP Validation and Troubleshooting Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-bgp-validation-m1-l1",
      "slug": "netauto-protocols-bgp-validation-m1-l1",
      "title": "BGP Session Health Checks",
      "concept": "A BGP session health check reads the neighbour table your inventory system stores and flags any session that is not in the Established state, because only Established sessions exchange routes. The check also verifies that the configured hold time and the negotiated hold time agree, and that each session has exchanged at least one prefix. A session that has been up for less time than the hold time after a flap is worth watching, even if it is currently Established.",
      "syntax": "neighbor 192.0.2.1 state Established\nprefixes received: 4",
      "exampleCode": "sessions = [\n    {'neighbor': '192.0.2.1', 'state': 'Established', 'prefixes': 4},\n    {'neighbor': '192.0.2.2', 'state': 'Idle', 'prefixes': 0},\n]\nfor s in sessions:\n    print(s['neighbor'], 'OK' if s['state'] == 'Established' else 'ALERT')",
      "exampleLanguage": "python",
      "mistake": "Checking only whether the session is up and never checking whether it received any prefixes, so an Established session carrying zero routes looks healthy.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Session Health Checks, but it does not work correctly.",
       "buggyCode": "sessions = [{'neighbor': '192.0.2.1', 'state': 'Established', 'prefixes': 0}]  # healthy?",
       "fixedCode": "sessions = [{'neighbor': '192.0.2.1', 'state': 'Established', 'prefixes': 0}]  # ALERT: zero prefixes",
       "explanation": "An Established session with zero received prefixes is not healthy; the health check must count prefixes as well as state."
      },
      "exercise": {
       "title": "Practise BGP Session Health Checks",
       "type": "write-code",
       "instructions": "Check the health of three BGP sessions from the stored neighbour table: print one line per session in the form '<neighbor>: OK Established, <n> prefixes' or '<neighbor>: ALERT <state>, <n> prefixes'. Sessions: 192.0.2.1 Established 4 prefixes; 192.0.2.2 Idle 0 prefixes; 192.0.2.3 Established 0 prefixes. An Established session with zero prefixes is also an ALERT.",
       "starterCode": "sessions = [\n    (\"192.0.2.1\", \"Established\", 4),\n    (\"192.0.2.2\", \"Idle\", 0),\n    (\"192.0.2.3\", \"Established\", 0),\n]\n# TODO: finish the program for BGP Session Health Checks below.\n",
       "solution": "sessions = [\n    (\"192.0.2.1\", \"Established\", 4),\n    (\"192.0.2.2\", \"Idle\", 0),\n    (\"192.0.2.3\", \"Established\", 0),\n]\nfor neighbor, state, prefixes in sessions:\n    if state == \"Established\" and prefixes > 0:\n        print(f\"{neighbor}: OK Established, {prefixes} prefixes\")\n    else:\n        print(f\"{neighbor}: ALERT {state}, {prefixes} prefixes\")\n",
       "solutionExplanation": "The solution builds the required data, applies the BGP Session Health Checks technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "192.0.2.1: OK Established, 4 prefixes\n192.0.2.2: ALERT Idle, 0 prefixes\n192.0.2.3: ALERT Established, 0 prefixes",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "192.0.2.3: ALERT Established, 0 prefixes",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "BGP Session Health Checks is the key idea here: A BGP session health check reads the neighbour table your inventory system stores and flags any session that is not in the Established state, because only Established sessions exchange routes.",
        "approach": "Work through BGP Session Health Checks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-validation-m1-l2",
      "slug": "netauto-protocols-bgp-validation-m1-l2",
      "title": "Reading a BGP Route Table",
      "concept": "A BGP route table lists candidate paths for each prefix with their attributes, and the best path is the one that wins the best-path selection: highest weight, then highest local preference, then shortest AS path, then lowest origin, then lowest MED. Reading a route table means comparing those attributes across the candidate paths for a prefix and identifying which one is installed. Automation does the same comparison in code, which removes the guesswork from choosing between several paths.",
      "syntax": "prefix 203.0.113.0/24: best via 192.0.2.2 (local-pref 200)",
      "exampleCode": "routes = [\n    {'prefix': '203.0.113.0/24', 'neighbor': '192.0.2.1', 'local_pref': 100, 'as_path': [64513]},\n    {'prefix': '203.0.113.0/24', 'neighbor': '192.0.2.2', 'local_pref': 200, 'as_path': [64514, 64520]},\n]\nbest = min(routes, key=lambda r: (-r['local_pref'], len(r['as_path'])))\nprint(best['neighbor'])",
      "exampleLanguage": "python",
      "mistake": "Reading only the first path listed for a prefix and assuming it is the best path, instead of comparing the attributes across all candidates.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Reading a BGP Route Table, but it does not work correctly.",
       "buggyCode": "routes = [{'neighbor': '192.0.2.1', 'local_pref': 100}]  # first listed, assumed best",
       "fixedCode": "routes = [{'neighbor': '192.0.2.1', 'local_pref': 100}, {'neighbor': '192.0.2.2', 'local_pref': 200}]  # compare all",
       "explanation": "The first listed path is not necessarily the best; best-path selection compares local preference, AS-path length, and MED across every candidate."
      },
      "exercise": {
       "title": "Practise Reading a BGP Route Table",
       "type": "write-code",
       "instructions": "Find the best path for two prefixes in a route table. For each prefix print 'Best path for <prefix>: via <neighbor> (local-pref <lp>, AS-path length <n>)'. Choose the best by highest local preference, then shortest AS path. Prefix 203.0.113.0/24: via 192.0.2.1 local-pref 100 AS-path [64513, 64520]; via 192.0.2.2 local-pref 200 AS-path [64514, 64520, 64521]. Prefix 198.51.100.0/24: via 192.0.2.1 local-pref 100 AS-path [64513]; via 192.0.2.3 local-pref 100 AS-path [64515, 64516].",
       "starterCode": "table = {\n    \"203.0.113.0/24\": [\n        {\"neighbor\": \"192.0.2.1\", \"local_pref\": 100, \"as_path\": [64513, 64520]},\n        {\"neighbor\": \"192.0.2.2\", \"local_pref\": 200, \"as_path\": [64514, 64520, 64521]},\n    ],\n    \"198.51.100.0/24\": [\n        {\"neighbor\": \"192.0.2.1\", \"local_pref\": 100, \"as_path\": [64513]},\n        {\"neighbor\": \"192.0.2.3\", \"local_pref\": 100, \"as_path\": [64515, 64516]},\n    ],\n}\n# TODO: finish the program for Reading a BGP Route Table below.\n",
       "solution": "table = {\n    \"203.0.113.0/24\": [\n        {\"neighbor\": \"192.0.2.1\", \"local_pref\": 100, \"as_path\": [64513, 64520]},\n        {\"neighbor\": \"192.0.2.2\", \"local_pref\": 200, \"as_path\": [64514, 64520, 64521]},\n    ],\n    \"198.51.100.0/24\": [\n        {\"neighbor\": \"192.0.2.1\", \"local_pref\": 100, \"as_path\": [64513]},\n        {\"neighbor\": \"192.0.2.3\", \"local_pref\": 100, \"as_path\": [64515, 64516]},\n    ],\n}\nfor prefix, routes in table.items():\n    best = min(routes, key=lambda r: (-r[\"local_pref\"], len(r[\"as_path\"])))\n    print(f\"Best path for {prefix}: via {best['neighbor']} (local-pref {best['local_pref']}, AS-path length {len(best['as_path'])})\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Reading a BGP Route Table technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Best path for 203.0.113.0/24: via 192.0.2.2 (local-pref 200, AS-path length 3)\nBest path for 198.51.100.0/24: via 192.0.2.1 (local-pref 100, AS-path length 1)",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Best path for 198.51.100.0/24: via 192.0.2.1 (local-pref 100, AS-path length 1)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Reading a BGP Route Table is the key idea here: A BGP route table lists candidate paths for each prefix with their attributes, and the best path is the one that wins the best-path selection: highest weight, then highest local preference, then shortest AS path, then lowest origin, then lowest MED.",
        "approach": "Work through Reading a BGP Route Table step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-validation-m1-l3",
      "slug": "netauto-protocols-bgp-validation-m1-l3",
      "title": "Missing Routes: Prefix Filters",
      "concept": "A missing route is often caused by a filter: an inbound prefix list that denies the prefix, an outbound filter on the neighbour, or a route map that drops it at the end with the implicit deny. The troubleshooting order is to check the Adj-RIB-In for the route, then the Loc-RIB, then the filters in between, because the table that lacks the route tells you which filter to inspect. A route that appears in Adj-RIB-In but not in Loc-RIB was filtered by inbound policy.",
      "syntax": "missing in Loc-RIB, present in Adj-RIB-In -> inbound policy\nmissing in Adj-RIB-In -> neighbour never sent it",
      "exampleCode": "Adj-RIB-In: 203.0.113.0/24 present\nLoc-RIB:    203.0.113.0/24 missing  -> check inbound policy",
      "exampleLanguage": "python",
      "mistake": "Reconfiguring the neighbour when the route is missing, before checking whether the route ever arrived in Adj-RIB-In.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Missing Routes: Prefix Filters, but it does not work correctly.",
       "buggyCode": "# route missing: bounce the BGP session first",
       "fixedCode": "# route missing: check Adj-RIB-In, then Loc-RIB, then the filters between them",
       "explanation": "Bouncing the session destroys the evidence; the tables show exactly where the route disappeared, so read them first."
      },
      "exercise": {
       "title": "Check your understanding: Missing Routes: Prefix Filters",
       "type": "multiple-choice",
       "instructions": "Which statement about Missing Routes: Prefix Filters is correct?",
       "starterCode": "",
       "solution": "A missing route is often caused by a filter: an inbound prefix list that denies the prefix, an outbound filter on the neighbour, or a route map that drops it at the end with the implicit deny.",
       "solutionExplanation": "A missing route is often caused by a filter: an inbound prefix list that denies the prefix, an outbound filter on the neighbour, or a route map that drops it at the end with the implicit deny. The other options are false: Missing Routes: Prefix Filters is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A missing route is often caused by a filter: an inbound prefix list that denies the prefix, an outbound filter on the neighbour, or a route map that drops it at the end with the implicit deny.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Missing Routes: Prefix Filters from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Missing Routes: Prefix Filters can only be used once in a program",
        "A missing route is often caused by a filter: an inbound prefix list that denies the prefix, an outbound filter on the neighbour, or a route map that drops it at the end with the implicit deny.",
        "Missing Routes: Prefix Filters requires a separate paid licence to use",
        "Missing Routes: Prefix Filters is not available in Python",
        "Missing Routes: Prefix Filters only works when the program prints text"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-protocols-bgp-validation-m1-l4",
      "slug": "netauto-protocols-bgp-validation-m1-l4",
      "title": "AS-Path Loops and Detection",
      "concept": "BGP detects loops by checking whether its own AS number appears in the AS path of a received route, and it rejects any route that contains it. A route that loops back to your AS through a neighbour is a sign of a misconfiguration, such as two routers advertising the same prefix to each other. Automation scans the route table for paths containing the local ASN and reports them before they cause a routing loop.",
      "syntax": "local AS 64512\npath 64513 64512 64520 -> loop, reject",
      "exampleCode": "path = [64513, 64512, 64520]\nprint(64512 in path)  # True: loop",
      "exampleLanguage": "python",
      "mistake": "Checking only the first AS in the path for a loop, so a path that passes through your AS in the middle is accepted.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate AS-Path Loops and Detection, but it does not work correctly.",
       "buggyCode": "path = [64513, 64512, 64520]\nloop = path[0] == 64512  # only the first AS",
       "fixedCode": "path = [64513, 64512, 64520]\nloop = 64512 in path  # any position",
       "explanation": "Your ASN can appear anywhere in the path, not just first; the check must scan the whole AS path."
      },
      "exercise": {
       "title": "Practise AS-Path Loops and Detection",
       "type": "write-code",
       "instructions": "Scan three received routes for AS-path loops against local AS 64512 and print one line per route in the form '<prefix> via <path>: OK' or '<prefix> via <path>: LOOP DETECTED'. Routes: 203.0.113.0/24 via 64513 64520; 198.51.100.0/24 via 64513 64512 64520; 192.0.2.0/24 via 64514 64515.",
       "starterCode": "local_as = 64512\nroutes = [\n    (\"203.0.113.0/24\", [64513, 64520]),\n    (\"198.51.100.0/24\", [64513, 64512, 64520]),\n    (\"192.0.2.0/24\", [64514, 64515]),\n]\n# TODO: finish the program for AS-Path Loops and Detection below.\n",
       "solution": "local_as = 64512\nroutes = [\n    (\"203.0.113.0/24\", [64513, 64520]),\n    (\"198.51.100.0/24\", [64513, 64512, 64520]),\n    (\"192.0.2.0/24\", [64514, 64515]),\n]\nfor prefix, path in routes:\n    path_text = \" \".join(str(a) for a in path)\n    if local_as in path:\n        print(f\"{prefix} via {path_text}: LOOP DETECTED\")\n    else:\n        print(f\"{prefix} via {path_text}: OK\")\n",
       "solutionExplanation": "The solution builds the required data, applies the AS-Path Loops and Detection technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "203.0.113.0/24 via 64513 64520: OK\n198.51.100.0/24 via 64513 64512 64520: LOOP DETECTED\n192.0.2.0/24 via 64514 64515: OK",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "192.0.2.0/24 via 64514 64515: OK",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "AS-Path Loops and Detection is the key idea here: BGP detects loops by checking whether its own AS number appears in the AS path of a received route, and it rejects any route that contains it.",
        "approach": "Work through AS-Path Loops and Detection step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-validation-m1-l5",
      "slug": "netauto-protocols-bgp-validation-m1-l5",
      "title": "BGP Flap Analysis",
      "concept": "A flapping BGP session is one that repeatedly goes up and down, and each flap forces every router that hears about it to recompute paths. Flap analysis counts state changes per neighbour over a time window from the session event log and flags neighbours above a threshold, because a single flap is normal but dozens in an hour point to a failing link or a timer mismatch. Route flap dampening can suppress the unstable route, but finding the cause matters more than hiding the symptom.",
      "syntax": "flaps in 1 hour: R1 1, R2 14, R3 0\nthreshold: 5 -> investigate R2",
      "exampleCode": "events = [('R1', 'down'), ('R2', 'down'), ('R2', 'up'), ('R2', 'down')]\nfrom collections import Counter\nprint(Counter(n for n, _ in events))",
      "exampleLanguage": "python",
      "mistake": "Treating one flap the same as fourteen, so a genuinely failing link is ignored because flaps are considered normal.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Flap Analysis, but it does not work correctly.",
       "buggyCode": "# 14 flaps in an hour: normal, BGP flaps sometimes",
       "fixedCode": "# 14 flaps in an hour: investigate, the threshold is 5",
       "explanation": "One flap is normal; fourteen in an hour means a failing link or a timer mismatch and needs investigation."
      },
      "exercise": {
       "title": "Practise BGP Flap Analysis",
       "type": "write-code",
       "instructions": "Analyse the BGP session event log for one hour: count the state changes per neighbour and print one line per neighbour in the form '<name>: <n> flaps - OK' or '<name>: <n> flaps - INVESTIGATE'. The threshold is 5 flaps. Events: R1 down once; R2 down 7 times and up 7 times (14 changes); R3 no events. Print neighbours in order R1, R2, R3.",
       "starterCode": "from collections import Counter\n\nevents = [(\"R1\", \"down\")]\nevents += [(\"R2\", \"down\"), (\"R2\", \"up\")] * 7\ncounts = Counter(name for name, _ in events)\n# TODO: finish the program for BGP Flap Analysis below.\n",
       "solution": "from collections import Counter\n\nevents = [(\"R1\", \"down\")]\nevents += [(\"R2\", \"down\"), (\"R2\", \"up\")] * 7\ncounts = Counter(name for name, _ in events)\nfor name in [\"R1\", \"R2\", \"R3\"]:\n    n = counts.get(name, 0)\n    verdict = \"INVESTIGATE\" if n > 5 else \"OK\"\n    print(f\"{name}: {n} flaps - {verdict}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the BGP Flap Analysis technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "R1: 1 flaps - OK\nR2: 14 flaps - INVESTIGATE\nR3: 0 flaps - OK",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "R3: 0 flaps - OK",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "BGP Flap Analysis is the key idea here: A flapping BGP session is one that repeatedly goes up and down, and each flap forces every router that hears about it to recompute paths.",
        "approach": "Work through BGP Flap Analysis step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-bgp-validation-m2",
    "title": "BGP Validation and Troubleshooting in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-protocols-bgp-validation-m2-l1",
      "slug": "netauto-protocols-bgp-validation-m2-l1",
      "title": "Prefix Hijack Detection Basics",
      "concept": "A prefix hijack happens when an unauthorised network announces a prefix it does not own, and detection compares every announcement against the list of authorised origin ASNs for that prefix. The authorised list comes from ROA records or an internal registry of which AS may announce which prefixes. An announcement whose origin ASN is not authorised is flagged immediately, because even a short hijack can redirect traffic.",
      "syntax": "authorised: 203.0.113.0/24 origin AS 64512\nannounced: 203.0.113.0/24 origin AS 64499 -> hijack suspect",
      "exampleCode": "authorised = {'203.0.113.0/24': 64512}\nprint(authorised.get('203.0.113.0/24') == 64499)  # False: not authorised",
      "exampleLanguage": "python",
      "mistake": "Flagging every announcement from an unfamiliar ASN without checking the authorised list, so legitimate new peers look like hijacks.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Prefix Hijack Detection Basics, but it does not work correctly.",
       "buggyCode": "# origin AS 64513 is new, so it must be a hijack",
       "fixedCode": "# origin AS 64513 is not in the authorised list for this prefix, so it is a suspect",
       "explanation": "Suspicion needs the authorised list: an ASN is only a hijack suspect when it announces a prefix it is not authorised to originate."
      },
      "exercise": {
       "title": "Practise Prefix Hijack Detection Basics",
       "type": "write-code",
       "instructions": "Check three prefix announcements against the authorised origins (203.0.113.0/24 may be originated by AS 64512; 198.51.100.0/24 by AS 64513) and print one line per announcement in the form '<prefix> origin AS <asn>: OK' or '<prefix> origin AS <asn>: HIJACK SUSPECT'. Announcements: 203.0.113.0/24 from AS 64512; 203.0.113.0/24 from AS 64499; 198.51.100.0/24 from AS 64513.",
       "starterCode": "authorised = {\"203.0.113.0/24\": 64512, \"198.51.100.0/24\": 64513}\nannouncements = [\n    (\"203.0.113.0/24\", 64512),\n    (\"203.0.113.0/24\", 64499),\n    (\"198.51.100.0/24\", 64513),\n]\n# TODO: finish the program for Prefix Hijack Detection Basics below.\n",
       "solution": "authorised = {\"203.0.113.0/24\": 64512, \"198.51.100.0/24\": 64513}\nannouncements = [\n    (\"203.0.113.0/24\", 64512),\n    (\"203.0.113.0/24\", 64499),\n    (\"198.51.100.0/24\", 64513),\n]\nfor prefix, origin in announcements:\n    if authorised.get(prefix) == origin:\n        print(f\"{prefix} origin AS {origin}: OK\")\n    else:\n        print(f\"{prefix} origin AS {origin}: HIJACK SUSPECT\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Prefix Hijack Detection Basics technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "203.0.113.0/24 origin AS 64512: OK\n203.0.113.0/24 origin AS 64499: HIJACK SUSPECT\n198.51.100.0/24 origin AS 64513: OK",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "198.51.100.0/24 origin AS 64513: OK",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Prefix Hijack Detection Basics is the key idea here: A prefix hijack happens when an unauthorised network announces a prefix it does not own, and detection compares every announcement against the list of authorised origin ASNs for that prefix.",
        "approach": "Work through Prefix Hijack Detection Basics step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-validation-m2-l2",
      "slug": "netauto-protocols-bgp-validation-m2-l2",
      "title": "BGP Dampening",
      "concept": "BGP route flap dampening assigns a penalty to a route each time it flaps and suppresses the route when the penalty passes a threshold, which protects the network from unstable routes. The penalty decays exponentially over time, so a route that stops flapping is eventually used again once its penalty falls below the reuse threshold. Dampening is applied carefully because it can also hide a genuinely broken route for a long time.",
      "syntax": "penalty 1000 per flap, suppress at 2000, reuse below 750\npenalty halves every 15 minutes",
      "exampleCode": "penalty = 0\nfor flap in range(3):\n    penalty += 1000\n    print(penalty)  # 1000, 2000, 3000",
      "exampleLanguage": "python",
      "mistake": "Enabling dampening with default thresholds on stable internal routes, so a single flap suppresses a route that would have recovered in seconds.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate BGP Dampening, but it does not work correctly.",
       "buggyCode": "# dampening on, defaults: one flap can suppress a route for 15 minutes",
       "fixedCode": "# dampening tuned: suppress only after repeated flaps, reuse quickly",
       "explanation": "Default dampening thresholds can suppress a route after very few flaps; thresholds must fit the route's normal behaviour."
      },
      "exercise": {
       "title": "Check your understanding: BGP Dampening",
       "type": "multiple-choice",
       "instructions": "Which statement about BGP Dampening is correct?",
       "starterCode": "",
       "solution": "BGP route flap dampening assigns a penalty to a route each time it flaps and suppresses the route when the penalty passes a threshold, which protects the network from unstable routes.",
       "solutionExplanation": "BGP route flap dampening assigns a penalty to a route each time it flaps and suppresses the route when the penalty passes a threshold, which protects the network from unstable routes. The other options are false: BGP Dampening is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "BGP route flap dampening assigns a penalty to a route each time it flaps and suppresses the route when the penalty passes a threshold, which protects the network from unstable routes.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of BGP Dampening from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "BGP Dampening can only be used once in a program",
        "BGP route flap dampening assigns a penalty to a route each time it flaps and suppresses the route when the penalty passes a threshold, which protects the network from unstable routes.",
        "BGP Dampening requires a separate paid licence to use",
        "BGP Dampening is not available in Python",
        "BGP Dampening only works when the program prints text"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-protocols-bgp-validation-m2-l3",
      "slug": "netauto-protocols-bgp-validation-m2-l3",
      "title": "Troubleshooting with Structured Checks",
      "concept": "Structured troubleshooting runs the same checks in the same order for every BGP problem: session state, timers, filters, AS paths, and route presence, recording a pass or fail for each. A checklist removes the temptation to guess, because the first failing check points at the cause. Automation runs the checklist over the stored neighbour and route tables and prints a report that a human can act on.",
      "syntax": "1. session Established?\n2. timers agree?\n3. filters pass the route?\n4. AS path loop-free?\n5. route in Loc-RIB?",
      "exampleCode": "checks = [('session Established', True), ('timers agree', True), ('route in Loc-RIB', False)]\nfor name, ok in checks:\n    print(f\"{'PASS' if ok else 'FAIL'}: {name}\")",
      "exampleLanguage": "python",
      "mistake": "Running the checks in a different order every time, so two engineers investigating the same fault reach different conclusions.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Troubleshooting with Structured Checks, but it does not work correctly.",
       "buggyCode": "# check the route table first, then the session, then the filters -- order varies",
       "fixedCode": "# session, timers, filters, AS path, route presence -- same order every time",
       "explanation": "A fixed check order makes results comparable; a varying order means the first failing check depends on who ran it."
      },
      "exercise": {
       "title": "Practise Troubleshooting with Structured Checks",
       "type": "write-code",
       "instructions": "Run the structured BGP checklist over the stored state: session Established (True), timers agree (True), inbound filter passes 203.0.113.0/24 (False), AS path loop-free (True), route in Loc-RIB (False). Print one line per check in the form 'PASS: <name>' or 'FAIL: <name>', then print 'Checklist: 3 passed, 2 failed - investigate inbound filter'.",
       "starterCode": "checks = [\n    (\"session Established\", True),\n    (\"timers agree\", True),\n    (\"inbound filter passes 203.0.113.0/24\", False),\n    (\"AS path loop-free\", True),\n    (\"route in Loc-RIB\", False),\n]\npassed = 0\n# TODO: finish the program for Troubleshooting with Structured Checks below.\n",
       "solution": "checks = [\n    (\"session Established\", True),\n    (\"timers agree\", True),\n    (\"inbound filter passes 203.0.113.0/24\", False),\n    (\"AS path loop-free\", True),\n    (\"route in Loc-RIB\", False),\n]\npassed = 0\nfor name, ok in checks:\n    print(f\"{'PASS' if ok else 'FAIL'}: {name}\")\n    if ok:\n        passed += 1\nprint(f\"Checklist: {passed} passed, {len(checks) - passed} failed - investigate inbound filter\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Troubleshooting with Structured Checks technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: session Established\nPASS: timers agree\nFAIL: inbound filter passes 203.0.113.0/24\nPASS: AS path loop-free\nFAIL: route in Loc-RIB\nChecklist: 3 passed, 2 failed - investigate inbound filter",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Checklist: 3 passed, 2 failed - investigate inbound filter",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Troubleshooting with Structured Checks is the key idea here: Structured troubleshooting runs the same checks in the same order for every BGP problem: session state, timers, filters, AS paths, and route presence, recording a pass or fail for each.",
        "approach": "Work through Troubleshooting with Structured Checks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-validation-m2-l4",
      "slug": "netauto-protocols-bgp-validation-m2-l4",
      "title": "Building a BGP Validation Report",
      "concept": "A BGP validation report combines session health, route coverage, and policy results into one document that shows the state of the whole BGP deployment. The report lists every neighbour with its state, every expected prefix with whether it is present, and every failed check with its cause. Generating the report from data means it is reproducible: the same inventory always produces the same report, and a change in the report shows exactly what changed.",
      "syntax": "BGP validation report\nSessions: 2 Established, 1 Idle\nRoutes: 3 present, 1 missing",
      "exampleCode": "print('BGP validation report')\nprint('Sessions: 2 Established, 1 Idle')",
      "exampleLanguage": "python",
      "mistake": "Writing the report by hand from memory instead of generating it from the stored tables, so it disagrees with the real state.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Building a BGP Validation Report, but it does not work correctly.",
       "buggyCode": "# report written from memory after the checks",
       "fixedCode": "# report generated from the neighbour and route tables",
       "explanation": "A hand-written report reflects what the author remembers, not what the tables say; generation keeps the report honest."
      },
      "exercise": {
       "title": "Practise Building a BGP Validation Report",
       "type": "write-code",
       "instructions": "Generate a BGP validation report from the stored data: sessions 192.0.2.1 Established, 192.0.2.2 Idle; expected prefixes 203.0.113.0/24 present, 198.51.100.0/24 missing. Print 'BGP validation report', 'Sessions: 1 Established, 1 Idle', 'Routes: 1 present, 1 missing', 'Issues: 192.0.2.2 Idle; 198.51.100.0/24 missing'.",
       "starterCode": "sessions = [(\"192.0.2.1\", \"Established\"), (\"192.0.2.2\", \"Idle\")]\nroutes = [(\"203.0.113.0/24\", True), (\"198.51.100.0/24\", False)]\nestablished = sum(1 for _, s in sessions if s == \"Established\")\npresent = sum(1 for _, p in routes if p)\nissues = []\nissues += [n for n, s in sessions if s != \"Established\"]\nissues += [p for p, ok in routes if not ok]\nprint(\"BGP validation report\")\n# TODO: finish the program for Building a BGP Validation Report below.\n",
       "solution": "sessions = [(\"192.0.2.1\", \"Established\"), (\"192.0.2.2\", \"Idle\")]\nroutes = [(\"203.0.113.0/24\", True), (\"198.51.100.0/24\", False)]\nestablished = sum(1 for _, s in sessions if s == \"Established\")\npresent = sum(1 for _, p in routes if p)\nissues = []\nissues += [n for n, s in sessions if s != \"Established\"]\nissues += [p for p, ok in routes if not ok]\nprint(\"BGP validation report\")\nprint(f\"Sessions: {established} Established, {len(sessions) - established} Idle\")\nprint(f\"Routes: {present} present, {len(routes) - present} missing\")\nprint(\"Issues: \" + \"; \".join(f\"{n} Idle\" if n.startswith(\"192.\") else f\"{n} missing\" for n in issues))\n",
       "solutionExplanation": "The solution builds the required data, applies the Building a BGP Validation Report technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "BGP validation report\nSessions: 1 Established, 1 Idle\nRoutes: 1 present, 1 missing\nIssues: 192.0.2.2 Idle; 198.51.100.0/24 missing",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Issues: 192.0.2.2 Idle; 198.51.100.0/24 missing",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Building a BGP Validation Report is the key idea here: A BGP validation report combines session health, route coverage, and policy results into one document that shows the state of the whole BGP deployment.",
        "approach": "Work through Building a BGP Validation Report step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-bgp-validation-m2-l5",
      "slug": "netauto-protocols-bgp-validation-m2-l5",
      "title": "Automated BGP Regression Checks",
      "concept": "A BGP regression check compares the route table before and after a change and reports exactly which prefixes were added, removed, or changed best path. The check runs the same comparison after every change, so an unexpected difference is caught immediately instead of being discovered by users. A change that only affects the routes it was meant to affect passes, and anything else is reported for review.",
      "syntax": "before: {203.0.113.0/24: 192.0.2.1}\nafter:  {203.0.113.0/24: 192.0.2.2}  -> changed",
      "exampleCode": "before = {'203.0.113.0/24': '192.0.2.1'}\nafter = {'203.0.113.0/24': '192.0.2.2'}\nprint(set(after) - set(before))  # added: none",
      "exampleLanguage": "python",
      "mistake": "Comparing the tables by eye instead of diffing them in code, so a changed best path on one prefix out of hundreds is missed.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Automated BGP Regression Checks, but it does not work correctly.",
       "buggyCode": "# eyeball two 200-line route tables after the change",
       "fixedCode": "# diff the before and after tables in code and list every difference",
       "explanation": "A manual comparison misses small changes; a coded diff reports every added, removed, and changed prefix."
      },
      "exercise": {
       "title": "Practise Automated BGP Regression Checks",
       "type": "write-code",
       "instructions": "Diff the BGP route tables before and after a change. Before: 203.0.113.0/24 via 192.0.2.1, 198.51.100.0/24 via 192.0.2.1. After: 203.0.113.0/24 via 192.0.2.2, 192.0.2.0/24 via 192.0.2.1. Print one line per difference: 'ADDED: <prefix> via <neighbor>', 'REMOVED: <prefix> via <neighbor>', or 'CHANGED: <prefix> 192.0.2.1 -> 192.0.2.2'. Print in the order added, removed, changed.",
       "starterCode": "before = {\"203.0.113.0/24\": \"192.0.2.1\", \"198.51.100.0/24\": \"192.0.2.1\"}\nafter = {\"203.0.113.0/24\": \"192.0.2.2\", \"192.0.2.0/24\": \"192.0.2.1\"}\n# TODO: finish the program for Automated BGP Regression Checks below.\n",
       "solution": "before = {\"203.0.113.0/24\": \"192.0.2.1\", \"198.51.100.0/24\": \"192.0.2.1\"}\nafter = {\"203.0.113.0/24\": \"192.0.2.2\", \"192.0.2.0/24\": \"192.0.2.1\"}\nfor prefix in sorted(set(after) - set(before)):\n    print(f\"ADDED: {prefix} via {after[prefix]}\")\nfor prefix in sorted(set(before) - set(after)):\n    print(f\"REMOVED: {prefix} via {before[prefix]}\")\nfor prefix in sorted(set(before) & set(after)):\n    if before[prefix] != after[prefix]:\n        print(f\"CHANGED: {prefix} {before[prefix]} -> {after[prefix]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Automated BGP Regression Checks technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ADDED: 192.0.2.0/24 via 192.0.2.1\nREMOVED: 198.51.100.0/24 via 192.0.2.1\nCHANGED: 203.0.113.0/24 192.0.2.1 -> 192.0.2.2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "CHANGED: 203.0.113.0/24 192.0.2.1 -> 192.0.2.2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Automated BGP Regression Checks is the key idea here: A BGP regression check compares the route table before and after a change and reports exactly which prefixes were added, removed, or changed best path.",
        "approach": "Work through Automated BGP Regression Checks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: BGP Validation and Troubleshooting",
   "type": "write-code",
   "instructions": "Run the full BGP validation suite: check session health, scan for AS-path loops, and diff the route tables. Sessions: 192.0.2.1 Established 4 prefixes; 192.0.2.2 Idle 0 prefixes. Print one line per session in the form '<neighbor>: OK Established, <n> prefixes' or '<neighbor>: ALERT <state>, <n> prefixes'. Then scan route 198.51.100.0/24 with path 64513 64512 64520 against local AS 64512 and print '198.51.100.0/24 via 64513 64512 64520: LOOP DETECTED'. Then diff before table {203.0.113.0/24: 192.0.2.1} against after table {203.0.113.0/24: 192.0.2.2} and print 'CHANGED: 203.0.113.0/24 192.0.2.1 -> 192.0.2.2'.",
   "starterCode": "local_as = 64512\nsessions = [(\"192.0.2.1\", \"Established\", 4), (\"192.0.2.2\", \"Idle\", 0)]\n# TODO: finish the program for BGP Validation and Troubleshooting Capstone below.\n",
   "solution": "local_as = 64512\nsessions = [(\"192.0.2.1\", \"Established\", 4), (\"192.0.2.2\", \"Idle\", 0)]\nfor neighbor, state, prefixes in sessions:\n    if state == \"Established\" and prefixes > 0:\n        print(f\"{neighbor}: OK Established, {prefixes} prefixes\")\n    else:\n        print(f\"{neighbor}: ALERT {state}, {prefixes} prefixes\")\npath = [64513, 64512, 64520]\nprint(f\"198.51.100.0/24 via {' '.join(str(a) for a in path)}: {'LOOP DETECTED' if local_as in path else 'OK'}\")\nbefore = {\"203.0.113.0/24\": \"192.0.2.1\"}\nafter = {\"203.0.113.0/24\": \"192.0.2.2\"}\nfor prefix in sorted(set(before) & set(after)):\n    if before[prefix] != after[prefix]:\n        print(f\"CHANGED: {prefix} {before[prefix]} -> {after[prefix]}\")\n",
   "solutionExplanation": "The solution builds the required data, applies the BGP Validation and Troubleshooting Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "192.0.2.1: OK Established, 4 prefixes\n192.0.2.2: ALERT Idle, 0 prefixes\n198.51.100.0/24 via 64513 64512 64520: LOOP DETECTED\nCHANGED: 203.0.113.0/24 192.0.2.1 -> 192.0.2.2",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "CHANGED: 203.0.113.0/24 192.0.2.1 -> 192.0.2.2",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through BGP Validation and Troubleshooting Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "BGP Validation and Troubleshooting Capstone Project",
   "description": "Run the full BGP validation suite: session health, loop scan, and route table regression diff.",
   "requirements": [
    "Run session health checks, an AS-path loop scan, and a route table diff in one suite.",
    "Apply at least three of these skills: BGP session health, AS-path loops, Regression checks, Validation reports.",
    "Every finding names the neighbour or prefix at fault.",
    "The report is generated from the stored tables, not written by hand."
   ],
   "rubric": [
    "The validation suite is complete and its findings are correct.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-dc-fabric",
  "slug": "netauto-protocols-dc-fabric",
  "language": "python",
  "category": "devops",
  "title": "Data Center Fabric Automation",
  "description": "Automate a spine-leaf data centre fabric: design and link counts, underlay BGP, overlay EVPN, IP addressing plans, ECMP, failure simulation, multi-tenancy, config generation at scale, consistency validation, and rollout checklists.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Spine-leaf design",
   "Underlay BGP",
   "Overlay EVPN",
   "IP addressing plans",
   "ECMP",
   "Failure simulation",
   "Multi-tenancy",
   "Fabric config generation",
   "Fabric validation",
   "Rollout planning"
  ],
  "prerequisites": [
   "netauto-protocols-vxlan-evpn",
   "netauto-protocols-bgp-validation"
  ],
  "analogy": "Learning {topic} is like learning to design a city's road grid: spines are the highways, leaves are the local streets, and every address has two ways home.",
  "modules": [
   {
    "id": "netauto-protocols-dc-fabric-m1",
    "title": "Data Center Fabric Automation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-dc-fabric-m1-l1",
      "slug": "netauto-protocols-dc-fabric-m1-l1",
      "title": "Spine-Leaf Fabric Design",
      "concept": "A spine-leaf fabric connects every leaf switch to every spine switch and never connects leaves to each other, so any leaf can reach any other leaf in exactly two hops. The design scales by adding spines for bandwidth and leaves for ports, and the number of links is the number of leaves multiplied by the number of spines. Because every path has the same length, latency is predictable, which is why spine-leaf is the standard data centre design.",
      "syntax": "links = leaves * spines\nhops leaf to leaf = 2",
      "exampleCode": "leaves, spines = 4, 2\nprint(f'Links: {leaves * spines}')  # 8",
      "exampleLanguage": "python",
      "mistake": "Connecting leaves directly to each other, which creates paths of different lengths and breaks the predictable two-hop design.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Spine-Leaf Fabric Design, but it does not work correctly.",
       "buggyCode": "links = [('leaf1', 'leaf2'), ('leaf1', 'spine1')]  # leaf-to-leaf link",
       "fixedCode": "links = [('leaf1', 'spine1'), ('leaf1', 'spine2')]  # leaf to every spine only",
       "explanation": "Leaves connect only to spines; a leaf-to-leaf link creates unequal path lengths and breaks the fabric design."
      },
      "exercise": {
       "title": "Practise Spine-Leaf Fabric Design",
       "type": "write-code",
       "instructions": "Design a spine-leaf fabric with 4 leaves and 2 spines. Print 'Leaves: 4, spines: 2', 'Links: 8' (leaves times spines), and 'Leaf-to-leaf hops: 2'. Then print 'Oversubscription: 4:1' for 4 leaf ports of 10 Gbps each sharing one 10 Gbps uplink per leaf (40 Gbps downlink, 10 Gbps uplink).",
       "starterCode": "leaves, spines = 4, 2\n# TODO: finish the program for Spine-Leaf Fabric Design below.\n",
       "solution": "leaves, spines = 4, 2\nprint(f\"Leaves: {leaves}, spines: {spines}\")\nprint(f\"Links: {leaves * spines}\")\nprint(\"Leaf-to-leaf hops: 2\")\ndownlink = 4 * 10  # 4 ports at 10 Gbps\nuplink = 10  # 1 uplink at 10 Gbps\nprint(f\"Oversubscription: {downlink // uplink}:1\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Spine-Leaf Fabric Design technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Leaves: 4, spines: 2\nLinks: 8\nLeaf-to-leaf hops: 2\nOversubscription: 4:1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Oversubscription: 4:1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Spine-Leaf Fabric Design is the key idea here: A spine-leaf fabric connects every leaf switch to every spine switch and never connects leaves to each other, so any leaf can reach any other leaf in exactly two hops.",
        "approach": "Work through Spine-Leaf Fabric Design step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-dc-fabric-m1-l2",
      "slug": "netauto-protocols-dc-fabric-m1-l2",
      "title": "Underlay Routing with BGP",
      "concept": "The fabric underlay uses eBGP between leaves and spines, with each device in its own AS or with a shared ASN per tier, so the underlay needs no IGP at all. Every leaf advertises its loopback address, and every spine advertises reachability to every leaf, which gives each leaf equal-cost paths to every other leaf. The underlay's only job is to carry VTEP traffic, so it stays simple and stable.",
      "syntax": "router bgp 64512\n neighbor 10.0.0.1 remote-as 64500\n network 10.0.0.11 mask 255.255.255.255",
      "exampleCode": "router bgp 64512\n neighbor 10.0.0.1 remote-as 64500\n neighbor 10.0.0.2 remote-as 64500\n network 10.0.0.11 mask 255.255.255.255",
      "exampleLanguage": "python",
      "mistake": "Forgetting to advertise the leaf loopback in BGP, so spines cannot reach the leaf's VTEP address and the overlay never forms.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Underlay Routing with BGP, but it does not work correctly.",
       "buggyCode": "router bgp 64512\n neighbor 10.0.0.1 remote-as 64500  # no network statement",
       "fixedCode": "router bgp 64512\n neighbor 10.0.0.1 remote-as 64500\n network 10.0.0.11 mask 255.255.255.255",
       "explanation": "The underlay must advertise every VTEP loopback, or no other device can reach the VTEP address."
      },
      "exercise": {
       "title": "Practise Underlay Routing with BGP",
       "type": "write-code",
       "instructions": "Render the underlay BGP configuration for leaf1 (AS 64512, loopback 10.0.0.11) with Jinja2: print 'router bgp <asn>', one line per spine in the form ' neighbor <address> remote-as <spine_asn>', and ' network <loopback> mask 255.255.255.255'. Spines: 10.0.0.1 and 10.0.0.2, both AS 64500. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'spine_asn': 64500, 'loopback': '10.0.0.11', 'spines': ['10.0.0.1', '10.0.0.2']}\ntemplate = Template('router bgp {{ asn }}\\n{% for s in spines %} neighbor {{ s }} remote-as {{ spine_asn }}\\n{% endfor %} network {{ loopback }} mask 255.255.255.255')\n# TODO: finish the program for Underlay Routing with BGP below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'spine_asn': 64500, 'loopback': '10.0.0.11', 'spines': ['10.0.0.1', '10.0.0.2']}\ntemplate = Template('router bgp {{ asn }}\\n{% for s in spines %} neighbor {{ s }} remote-as {{ spine_asn }}\\n{% endfor %} network {{ loopback }} mask 255.255.255.255')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Underlay Routing with BGP technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n neighbor 10.0.0.1 remote-as 64500\n neighbor 10.0.0.2 remote-as 64500\n network 10.0.0.11 mask 255.255.255.255",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": " network 10.0.0.11 mask 255.255.255.255",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Underlay Routing with BGP is the key idea here: The fabric underlay uses eBGP between leaves and spines, with each device in its own AS or with a shared ASN per tier, so the underlay needs no IGP at all.",
        "approach": "Work through Underlay Routing with BGP step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-dc-fabric-m1-l3",
      "slug": "netauto-protocols-dc-fabric-m1-l3",
      "title": "Overlay with EVPN",
      "concept": "The fabric overlay uses EVPN over the BGP underlay to carry tenant traffic in VXLAN tunnels between leaves, with the spine acting as a route reflector. Each tenant gets a VNI and a route target, and the leaves advertise MAC and IP bindings as Type 2 routes. The overlay is independent of the underlay: tenants can be added or moved without touching the underlay configuration.",
      "syntax": "spine: route reflector for the EVPN family\nleaf: VNI 10010, RT 64512:100",
      "exampleCode": "router bgp 64512\n address-family l2vpn evpn\n  neighbor 10.0.0.1 activate\n  neighbor 10.0.0.1 send-community extended",
      "exampleLanguage": "python",
      "mistake": "Configuring EVPN on the leaves but not making the spine a route reflector, so leaves never learn each other's Type 2 routes.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Overlay with EVPN, but it does not work correctly.",
       "buggyCode": "# spine: plain BGP neighbour, no route-reflector-client",
       "fixedCode": "# spine: neighbor 10.0.0.11 route-reflector-client in the EVPN family",
       "explanation": "The spine must reflect EVPN routes between leaves; without route-reflector-client the leaves never see each other's MAC bindings."
      },
      "exercise": {
       "title": "Practise Overlay with EVPN",
       "type": "write-code",
       "instructions": "Render the overlay EVPN configuration for leaf1 (AS 64512, spine 10.0.0.1) with Jinja2: print 'router bgp <asn>', ' address-family l2vpn evpn', '  neighbor <spine> activate', '  neighbor <spine> send-community extended', ' exit-address-family', and a comment line '! spine side: neighbor <leaf> route-reflector-client' recording that the spine reflects EVPN routes to this leaf. Leaf loopback 10.0.0.11. Print the rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'spine': '10.0.0.1', 'leaf': '10.0.0.11'}\ntemplate = Template('router bgp {{ asn }}\\n address-family l2vpn evpn\\n  neighbor {{ spine }} activate\\n  neighbor {{ spine }} send-community extended\\n exit-address-family\\n! spine side: neighbor {{ leaf }} route-reflector-client')\n# TODO: finish the program for Overlay with EVPN below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'spine': '10.0.0.1', 'leaf': '10.0.0.11'}\ntemplate = Template('router bgp {{ asn }}\\n address-family l2vpn evpn\\n  neighbor {{ spine }} activate\\n  neighbor {{ spine }} send-community extended\\n exit-address-family\\n! spine side: neighbor {{ leaf }} route-reflector-client')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Overlay with EVPN technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n address-family l2vpn evpn\n  neighbor 10.0.0.1 activate\n  neighbor 10.0.0.1 send-community extended\n exit-address-family\n! spine side: neighbor 10.0.0.11 route-reflector-client",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "! spine side: neighbor 10.0.0.11 route-reflector-client",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Overlay with EVPN is the key idea here: The fabric overlay uses EVPN over the BGP underlay to carry tenant traffic in VXLAN tunnels between leaves, with the spine acting as a route reflector.",
        "approach": "Work through Overlay with EVPN step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-dc-fabric-m1-l4",
      "slug": "netauto-protocols-dc-fabric-m1-l4",
      "title": "Fabric IP Addressing Plan",
      "concept": "A fabric addressing plan assigns a /31 subnet to every leaf-spine link from a dedicated block, so each link gets exactly two addresses with no waste. Loopback addresses come from a separate block, one per device, and the plan is generated by slicing the blocks with the ipaddress module. Generating the plan from code guarantees no address is used twice and every link has a matching pair.",
      "syntax": "links: 10.0.1.0/24 split into /31s\nloopbacks: 10.0.0.0/24, one /32 each",
      "exampleCode": "import ipaddress\n\nlinks = list(ipaddress.ip_network('10.0.1.0/24').subnets(new_prefix=31))\nprint(links[0], links[1])",
      "exampleLanguage": "python",
      "mistake": "Using /30 subnets for point-to-point links, which wastes two addresses per link across a fabric with hundreds of links.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Fabric IP Addressing Plan, but it does not work correctly.",
       "buggyCode": "link = ipaddress.ip_network('10.0.1.0/30')  # 4 addresses for 2 hosts",
       "fixedCode": "link = ipaddress.ip_network('10.0.1.0/31')  # 2 addresses for 2 hosts",
       "explanation": "A /31 gives exactly two addresses for a point-to-point link; a /30 wastes the network and broadcast addresses."
      },
      "exercise": {
       "title": "Practise Fabric IP Addressing Plan",
       "type": "write-code",
       "instructions": "Allocate /31 subnets for the first three leaf-spine links from the block 10.0.1.0/24 and loopback /32 addresses for two devices from 10.0.0.0/24. Print one line per link in the form 'Link <n>: <subnet> (hosts <a> and <b>)' and one line per loopback in the form 'Loopback <name>: <address>'. Links: leaf1-spine1, leaf1-spine2, leaf2-spine1. Loopbacks: leaf1 10.0.0.11, spine1 10.0.0.1.",
       "starterCode": "import ipaddress\n\nlinks_block = ipaddress.ip_network(\"10.0.1.0/24\")\nsubnets = list(links_block.subnets(new_prefix=31))\nlinks = [\"leaf1-spine1\", \"leaf1-spine2\", \"leaf2-spine1\"]\n# TODO: finish the program for Fabric IP Addressing Plan below.\n",
       "solution": "import ipaddress\n\nlinks_block = ipaddress.ip_network(\"10.0.1.0/24\")\nsubnets = list(links_block.subnets(new_prefix=31))\nlinks = [\"leaf1-spine1\", \"leaf1-spine2\", \"leaf2-spine1\"]\nfor name, subnet in zip(links, subnets):\n    hosts = list(subnet.hosts())\n    print(f\"Link {name}: {subnet} (hosts {hosts[0]} and {hosts[1]})\")\nfor name, address in [(\"leaf1\", \"10.0.0.11\"), (\"spine1\", \"10.0.0.1\")]:\n    print(f\"Loopback {name}: {address}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Fabric IP Addressing Plan technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Link leaf1-spine1: 10.0.1.0/31 (hosts 10.0.1.0 and 10.0.1.1)\nLink leaf1-spine2: 10.0.1.2/31 (hosts 10.0.1.2 and 10.0.1.3)\nLink leaf2-spine1: 10.0.1.4/31 (hosts 10.0.1.4 and 10.0.1.5)\nLoopback leaf1: 10.0.0.11\nLoopback spine1: 10.0.0.1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Loopback spine1: 10.0.0.1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Fabric IP Addressing Plan is the key idea here: A fabric addressing plan assigns a /31 subnet to every leaf-spine link from a dedicated block, so each link gets exactly two addresses with no waste.",
        "approach": "Work through Fabric IP Addressing Plan step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-dc-fabric-m1-l5",
      "slug": "netauto-protocols-dc-fabric-m1-l5",
      "title": "ECMP in the Fabric",
      "concept": "Equal-cost multi-path (ECMP) lets a leaf spread traffic across all its spine links because every path to a remote leaf has the same cost, which is the whole point of the spine-leaf design. The router hashes each flow onto one link so packets of one flow stay in order, and the hash usually includes source and destination addresses and ports. When a spine fails, the hash rebalances the flows across the remaining links.",
      "syntax": "maximum-paths 2  # use both spine links\nflow hash: src/dst IP + ports",
      "exampleCode": "def flow_hash(src, dst, sport, dport, links):\n    total = sum(int(o) for o in src.split('.')) + sum(int(o) for o in dst.split('.')) + sport + dport\n    return links[total % len(links)]\n\nprint(flow_hash('10.1.0.5', '10.2.0.8', 40001, 443, ['spine1', 'spine2']))",
      "exampleLanguage": "python",
      "mistake": "Hashing on the source address only, so all traffic from one host uses one spine link and the other link sits idle.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate ECMP in the Fabric, but it does not work correctly.",
       "buggyCode": "# hash: source IP only -- one host, one link",
       "fixedCode": "# hash: source IP, destination IP, source port, destination port",
       "explanation": "A hash on the source address alone pins each host to one link; including ports spreads the host's flows across both links."
      },
      "exercise": {
       "title": "Practise ECMP in the Fabric",
       "type": "write-code",
       "instructions": "Simulate ECMP flow hashing for four flows across two spine links (spine1, spine2). Hash each flow as (sum of source octets + sum of destination octets + source port + destination port) modulo 2, where 0 means spine1 and 1 means spine2. Print one line per flow in the form 'Flow <src>:<sport> -> <dst>:<dport> via <link>', then print 'Flows per link: spine1 <n>, spine2 <m>'. Flows: 10.1.0.5:40001 to 10.2.0.8:443; 10.1.0.6:40002 to 10.2.0.9:80; 10.1.0.7:40004 to 10.2.0.8:443; 10.1.0.8:40004 to 10.2.0.10:22.",
       "starterCode": "links = [\"spine1\", \"spine2\"]\nflows = [\n    (\"10.1.0.5\", \"10.2.0.8\", 40001, 443),\n    (\"10.1.0.6\", \"10.2.0.9\", 40002, 80),\n    (\"10.1.0.7\", \"10.2.0.8\", 40004, 443),\n    (\"10.1.0.8\", \"10.2.0.10\", 40004, 22),\n]\n\n\ndef flow_hash(src, dst, sport, dport):\n    total = sum(int(o) for o in src.split(\".\")) + sum(int(o) for o in dst.split(\".\")) + sport + dport\n    return links[total % len(links)]\n\n\ncounts = {link: 0 for link in links}\n# TODO: finish the program for ECMP in the Fabric below.\n",
       "solution": "links = [\"spine1\", \"spine2\"]\nflows = [\n    (\"10.1.0.5\", \"10.2.0.8\", 40001, 443),\n    (\"10.1.0.6\", \"10.2.0.9\", 40002, 80),\n    (\"10.1.0.7\", \"10.2.0.8\", 40004, 443),\n    (\"10.1.0.8\", \"10.2.0.10\", 40004, 22),\n]\n\n\ndef flow_hash(src, dst, sport, dport):\n    total = sum(int(o) for o in src.split(\".\")) + sum(int(o) for o in dst.split(\".\")) + sport + dport\n    return links[total % len(links)]\n\n\ncounts = {link: 0 for link in links}\nfor src, dst, sport, dport in flows:\n    link = flow_hash(src, dst, sport, dport)\n    counts[link] += 1\n    print(f\"Flow {src}:{sport} -> {dst}:{dport} via {link}\")\nprint(f\"Flows per link: spine1 {counts['spine1']}, spine2 {counts['spine2']}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the ECMP in the Fabric technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Flow 10.1.0.5:40001 -> 10.2.0.8:443 via spine1\nFlow 10.1.0.6:40002 -> 10.2.0.9:80 via spine1\nFlow 10.1.0.7:40004 -> 10.2.0.8:443 via spine2\nFlow 10.1.0.8:40004 -> 10.2.0.10:22 via spine2\nFlows per link: spine1 2, spine2 2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Flows per link: spine1 2, spine2 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "ECMP in the Fabric is the key idea here: Equal-cost multi-path (ECMP) lets a leaf spread traffic across all its spine links because every path to a remote leaf has the same cost, which is the whole point of the spine-leaf design.",
        "approach": "Work through ECMP in the Fabric step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-dc-fabric-m2",
    "title": "Data Center Fabric Automation in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-protocols-dc-fabric-m2-l1",
      "slug": "netauto-protocols-dc-fabric-m2-l1",
      "title": "Fabric Failure Simulation",
      "concept": "A failure simulation removes a device or link from the topology data and recomputes which paths remain, which shows whether the fabric still connects every leaf before anything fails in production. The simulation works on the same data the config generator uses, so it tests the design rather than a separate model. A fabric that loses all paths between two leaves when one spine fails is under-designed and needs another spine.",
      "syntax": "remove spine1 -> leaf1 to leaf2 still reachable via spine2",
      "exampleCode": "links = {('leaf1', 'spine1'), ('leaf1', 'spine2'), ('leaf2', 'spine1'), ('leaf2', 'spine2')}\nlinks = {l for l in links if 'spine1' not in l}\nprint(len(links), 'links remain')",
      "exampleLanguage": "python",
      "mistake": "Simulating failures on a diagram instead of on the topology data, so the simulation and the generated config can disagree.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Fabric Failure Simulation, but it does not work correctly.",
       "buggyCode": "# failure test drawn on the whiteboard diagram",
       "fixedCode": "# failure test run on the same topology data the generator uses",
       "explanation": "The simulation must use the generator's data; a separate diagram can drift from the real topology."
      },
      "exercise": {
       "title": "Practise Fabric Failure Simulation",
       "type": "write-code",
       "instructions": "Simulate the failure of spine1 in a fabric with leaves leaf1 and leaf2 and spines spine1 and spine2 (every leaf connects to every spine). Remove spine1 and its links, then check whether leaf1 can still reach leaf2 through a remaining spine. Print 'Before failure: leaf1 to leaf2 reachable via spine1, spine2', 'After spine1 fails: leaf1 to leaf2 reachable via spine2', and 'Fabric survives one spine failure: True'.",
       "starterCode": "leaves = [\"leaf1\", \"leaf2\"]\nspines = [\"spine1\", \"spine2\"]\nlinks = {(leaf, spine) for leaf in leaves for spine in spines}\n\n\ndef reachable(leaf_a, leaf_b, live_spines):\n    return any((leaf_a, s) in links and (leaf_b, s) in links for s in live_spines)\n\n\nbefore = [s for s in spines if reachable(\"leaf1\", \"leaf2\", [s])]\n# TODO: finish the program for Fabric Failure Simulation below.\n",
       "solution": "leaves = [\"leaf1\", \"leaf2\"]\nspines = [\"spine1\", \"spine2\"]\nlinks = {(leaf, spine) for leaf in leaves for spine in spines}\n\n\ndef reachable(leaf_a, leaf_b, live_spines):\n    return any((leaf_a, s) in links and (leaf_b, s) in links for s in live_spines)\n\n\nbefore = [s for s in spines if reachable(\"leaf1\", \"leaf2\", [s])]\nprint(f\"Before failure: leaf1 to leaf2 reachable via {', '.join(before)}\")\nafter = [s for s in spines if s != \"spine1\" and reachable(\"leaf1\", \"leaf2\", [s])]\nprint(f\"After spine1 fails: leaf1 to leaf2 reachable via {', '.join(after)}\")\nprint(f\"Fabric survives one spine failure: {bool(after)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Fabric Failure Simulation technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Before failure: leaf1 to leaf2 reachable via spine1, spine2\nAfter spine1 fails: leaf1 to leaf2 reachable via spine2\nFabric survives one spine failure: True",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Fabric survives one spine failure: True",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Fabric Failure Simulation is the key idea here: A failure simulation removes a device or link from the topology data and recomputes which paths remain, which shows whether the fabric still connects every leaf before anything fails in production.",
        "approach": "Work through Fabric Failure Simulation step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-dc-fabric-m2-l2",
      "slug": "netauto-protocols-dc-fabric-m2-l2",
      "title": "Multi-Tenancy with VNIs",
      "concept": "Multi-tenancy in a fabric gives each tenant its own VNI and route target, so tenants share the same physical switches while their traffic stays completely separate. A leaf imports only the route targets of the tenants it serves, so it never learns routes for other tenants. The same VLAN number can be reused by different tenants because the VNI, not the VLAN, identifies the tenant network.",
      "syntax": "tenant web: VNI 10010, RT 64512:100\ntenant db: VNI 10020, RT 64512:200",
      "exampleCode": "tenants = {'web': (10010, '64512:100'), 'db': (10020, '64512:200')}\nprint(tenants['web'])",
      "exampleLanguage": "python",
      "mistake": "Importing every route target on every leaf, so each leaf learns every tenant's routes and the isolation is only on paper.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Multi-Tenancy with VNIs, but it does not work correctly.",
       "buggyCode": "# leaf imports RT 64512:100 and 64512:200 for both tenants",
       "fixedCode": "# leaf serving web imports only RT 64512:100",
       "explanation": "A leaf must import only the route targets of the tenants it serves; importing all of them defeats tenant isolation."
      },
      "exercise": {
       "title": "Check your understanding: Multi-Tenancy with VNIs",
       "type": "multiple-choice",
       "instructions": "Which statement about Multi-Tenancy with VNIs is correct?",
       "starterCode": "",
       "solution": "Multi-tenancy in a fabric gives each tenant its own VNI and route target, so tenants share the same physical switches while their traffic stays completely separate.",
       "solutionExplanation": "Multi-tenancy in a fabric gives each tenant its own VNI and route target, so tenants share the same physical switches while their traffic stays completely separate. The other options are false: Multi-Tenancy with VNIs is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Multi-tenancy in a fabric gives each tenant its own VNI and route target, so tenants share the same physical switches while their traffic stays completely separate.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Multi-Tenancy with VNIs from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Multi-Tenancy with VNIs can only be used once in a program",
        "Multi-Tenancy with VNIs requires a separate paid licence to use",
        "Multi-Tenancy with VNIs is not available in Python",
        "Multi-tenancy in a fabric gives each tenant its own VNI and route target, so tenants share the same physical switches while their traffic stays completely separate.",
        "Multi-Tenancy with VNIs only works when the program prints text"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-protocols-dc-fabric-m2-l3",
      "slug": "netauto-protocols-dc-fabric-m2-l3",
      "title": "Fabric Config Generation at Scale",
      "concept": "Fabric configuration at scale means one template and one inventory produce the config for every leaf and spine, with each device's values filled in from its own inventory entry. The generator loops over all devices and writes one file per device, so a 40-leaf fabric is generated as easily as a 4-leaf one. Reviewing the generated files as a set catches inconsistencies such as a leaf whose ASN does not match its spine's neighbour statement.",
      "syntax": "{% for d in devices %}! {{ d.name }}\nrouter bgp {{ d.asn }}\n{% endfor %}",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('{% for d in devices %}{{ d.name }}: AS {{ d.asn }}\\n{% endfor %}')\nprint(template.render(devices=[{'name': 'leaf1', 'asn': 64512}]))",
      "exampleLanguage": "python",
      "mistake": "Generating each device's config with a separate script, so a template fix has to be copied into forty scripts.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Fabric Config Generation at Scale, but it does not work correctly.",
       "buggyCode": "# forty scripts, one per device",
       "fixedCode": "# one template, one inventory, forty generated configs",
       "explanation": "One template and one inventory scale; a script per device means every fix is copied forty times."
      },
      "exercise": {
       "title": "Practise Fabric Config Generation at Scale",
       "type": "write-code",
       "instructions": "Render the BGP configuration for three fabric devices from one inventory with Jinja2: for each device print '! <name> (AS <asn>)' and 'router bgp <asn>'. Devices: leaf1 AS 64512, leaf2 AS 64513, spine1 AS 64500. Print the full rendered config.",
       "starterCode": "from jinja2 import Template\ndata = {'devices': [{'name': 'leaf1', 'asn': 64512}, {'name': 'leaf2', 'asn': 64513}, {'name': 'spine1', 'asn': 64500}]}\ntemplate = Template('{% for d in devices %}! {{ d.name }} (AS {{ d.asn }})\\nrouter bgp {{ d.asn }}\\n{% endfor %}')\n# TODO: finish the program for Fabric Config Generation at Scale below.\n",
       "solution": "from jinja2 import Template\ndata = {'devices': [{'name': 'leaf1', 'asn': 64512}, {'name': 'leaf2', 'asn': 64513}, {'name': 'spine1', 'asn': 64500}]}\ntemplate = Template('{% for d in devices %}! {{ d.name }} (AS {{ d.asn }})\\nrouter bgp {{ d.asn }}\\n{% endfor %}')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Fabric Config Generation at Scale technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "! leaf1 (AS 64512)\nrouter bgp 64512\n! leaf2 (AS 64513)\nrouter bgp 64513\n! spine1 (AS 64500)\nrouter bgp 64500",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "router bgp 64500",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Fabric Config Generation at Scale is the key idea here: Fabric configuration at scale means one template and one inventory produce the config for every leaf and spine, with each device's values filled in from its own inventory entry.",
        "approach": "Work through Fabric Config Generation at Scale step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-dc-fabric-m2-l4",
      "slug": "netauto-protocols-dc-fabric-m2-l4",
      "title": "Validating Fabric Consistency",
      "concept": "Fabric consistency validation checks that every leaf-spine link is configured on both ends with matching addresses and ASNs, that no ASN or VNI is used twice where it must be unique, and that every VTEP address appears in the underlay. The check runs over the inventory data before any config is generated, so a typo in one device's data is caught while it is still cheap to fix. A fabric that passes validation is ready to generate.",
      "syntax": "assert leaf ASN matches spine neighbour statement\nassert len(set(asns)) == len(asns)",
      "exampleCode": "asns = [64512, 64513, 64500]\nprint(len(set(asns)) == len(asns))  # True: unique",
      "exampleLanguage": "python",
      "mistake": "Validating each device in isolation, so a link that is configured on the leaf but missing on the spine is never caught.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Validating Fabric Consistency, but it does not work correctly.",
       "buggyCode": "# check leaf1 alone: ASN valid, VNI valid -- pass",
       "fixedCode": "# check leaf1 and spine1 together: link present on both ends -- pass",
       "explanation": "A link exists only when both ends agree; validating devices one at a time misses a missing far end."
      },
      "exercise": {
       "title": "Practise Validating Fabric Consistency",
       "type": "write-code",
       "instructions": "Validate a fabric with two leaves (leaf1 AS 64512, leaf2 AS 64513) and one spine (spine1 AS 64500). Check that all ASNs are unique, that the spine's neighbour list contains both leaf ASNs, and that VNIs [10010, 10020] are unique. Print 'PASS: ASNs unique', 'PASS: spine neighbours cover both leaves', 'PASS: VNIs unique', then print 'Fabric validation: 3 passed, 0 failed'.",
       "starterCode": "asns = {\"leaf1\": 64512, \"leaf2\": 64513, \"spine1\": 64500}\nspine_neighbors = [64512, 64513]\nvnis = [10010, 10020]\npassed = 0\nfailed = 0\n# TODO: finish the program for Validating Fabric Consistency below.\n",
       "solution": "asns = {\"leaf1\": 64512, \"leaf2\": 64513, \"spine1\": 64500}\nspine_neighbors = [64512, 64513]\nvnis = [10010, 10020]\npassed = 0\nfailed = 0\nif len(set(asns.values())) == len(asns):\n    print(\"PASS: ASNs unique\")\n    passed += 1\nelse:\n    print(\"FAIL: duplicate ASN\")\n    failed += 1\nif all(asns[leaf] in spine_neighbors for leaf in [\"leaf1\", \"leaf2\"]):\n    print(\"PASS: spine neighbours cover both leaves\")\n    passed += 1\nelse:\n    print(\"FAIL: spine missing a leaf neighbour\")\n    failed += 1\nif len(set(vnis)) == len(vnis):\n    print(\"PASS: VNIs unique\")\n    passed += 1\nelse:\n    print(\"FAIL: duplicate VNI\")\n    failed += 1\nprint(f\"Fabric validation: {passed} passed, {failed} failed\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Validating Fabric Consistency technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: ASNs unique\nPASS: spine neighbours cover both leaves\nPASS: VNIs unique\nFabric validation: 3 passed, 0 failed",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Fabric validation: 3 passed, 0 failed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating Fabric Consistency is the key idea here: Fabric consistency validation checks that every leaf-spine link is configured on both ends with matching addresses and ASNs, that no ASN or VNI is used twice where it must be unique, and that every VTEP address appears in the underlay.",
        "approach": "Work through Validating Fabric Consistency step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-dc-fabric-m2-l5",
      "slug": "netauto-protocols-dc-fabric-m2-l5",
      "title": "Fabric Rollout Checklist",
      "concept": "A fabric rollout checklist turns the deployment into ordered steps: validate the inventory, generate the configs, apply the underlay first, verify BGP sessions, then enable the overlay and check EVPN routes. Each step has a verification command and a rollback action, so the team knows exactly when to proceed and when to stop. Automation generates the checklist from the inventory so it always matches the fabric being built.",
      "syntax": "1. validate inventory\n2. generate configs\n3. apply underlay\n4. verify BGP\n5. enable overlay\n6. verify EVPN",
      "exampleCode": "steps = ['validate inventory', 'generate configs', 'apply underlay', 'verify BGP', 'enable overlay', 'verify EVPN']\nfor i, step in enumerate(steps, start=1):\n    print(f'{i}. {step}')",
      "exampleLanguage": "python",
      "mistake": "Applying the overlay before the underlay is verified, so EVPN failures are blamed on the overlay when the underlay is actually broken.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Fabric Rollout Checklist, but it does not work correctly.",
       "buggyCode": "# overlay first, then check whether BGP is up",
       "fixedCode": "# underlay first, verify BGP, then enable the overlay",
       "explanation": "The overlay depends on the underlay; enabling it first hides underlay faults behind overlay symptoms."
      },
      "exercise": {
       "title": "Practise Fabric Rollout Checklist",
       "type": "write-code",
       "instructions": "Generate the rollout checklist for a fabric with 2 spines and 2 leaves. Print one numbered step per line: '1. Validate inventory (2 spines, 2 leaves)', '2. Generate configs for 4 devices', '3. Apply underlay on spines first', '4. Verify BGP sessions Established', '5. Enable overlay (EVPN) on leaves', '6. Verify EVPN Type 2 routes present'.",
       "starterCode": "steps = [\n    \"Validate inventory (2 spines, 2 leaves)\",\n    \"Generate configs for 4 devices\",\n    \"Apply underlay on spines first\",\n    \"Verify BGP sessions Established\",\n    \"Enable overlay (EVPN) on leaves\",\n    \"Verify EVPN Type 2 routes present\",\n]\n# TODO: finish the program for Fabric Rollout Checklist below.\n",
       "solution": "steps = [\n    \"Validate inventory (2 spines, 2 leaves)\",\n    \"Generate configs for 4 devices\",\n    \"Apply underlay on spines first\",\n    \"Verify BGP sessions Established\",\n    \"Enable overlay (EVPN) on leaves\",\n    \"Verify EVPN Type 2 routes present\",\n]\nfor i, step in enumerate(steps, start=1):\n    print(f\"{i}. {step}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Fabric Rollout Checklist technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. Validate inventory (2 spines, 2 leaves)\n2. Generate configs for 4 devices\n3. Apply underlay on spines first\n4. Verify BGP sessions Established\n5. Enable overlay (EVPN) on leaves\n6. Verify EVPN Type 2 routes present",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "6. Verify EVPN Type 2 routes present",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Fabric Rollout Checklist is the key idea here: A fabric rollout checklist turns the deployment into ordered steps: validate the inventory, generate the configs, apply the underlay first, verify BGP sessions, then enable the overlay and check EVPN routes.",
        "approach": "Work through Fabric Rollout Checklist step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Data Center Fabric Automation",
   "type": "write-code",
   "instructions": "Generate the underlay BGP configuration for two leaves from one inventory with Jinja2 and validate the fabric. For each leaf print '! <name> (AS <asn>)', 'router bgp <asn>', one line per spine in the form ' neighbor <address> remote-as 64500', and ' network <loopback> mask 255.255.255.255'. Leaves: leaf1 AS 64512 loopback 10.0.0.11; leaf2 AS 64513 loopback 10.0.0.12. Spines: 10.0.0.1 and 10.0.0.2. Then print a blank line and 'Fabric validation: ASNs unique: True' and 'Links: 4' (2 leaves times 2 spines).",
   "starterCode": "from jinja2 import Template\n\ndevices = [\n    {\"name\": \"leaf1\", \"asn\": 64512, \"loopback\": \"10.0.0.11\"},\n    {\"name\": \"leaf2\", \"asn\": 64513, \"loopback\": \"10.0.0.12\"},\n]\nspines = [\"10.0.0.1\", \"10.0.0.2\"]\ntemplate = Template(\"{% for d in devices %}! {{ d.name }} (AS {{ d.asn }})\\nrouter bgp {{ d.asn }}\\n{% for s in spines %} neighbor {{ s }} remote-as 64500\\n{% endfor %} network {{ d.loopback }} mask 255.255.255.255\\n{% endfor %}\")\n# TODO: finish the program for Data Center Fabric Automation Capstone below.\n",
   "solution": "from jinja2 import Template\n\ndevices = [\n    {\"name\": \"leaf1\", \"asn\": 64512, \"loopback\": \"10.0.0.11\"},\n    {\"name\": \"leaf2\", \"asn\": 64513, \"loopback\": \"10.0.0.12\"},\n]\nspines = [\"10.0.0.1\", \"10.0.0.2\"]\ntemplate = Template(\"{% for d in devices %}! {{ d.name }} (AS {{ d.asn }})\\nrouter bgp {{ d.asn }}\\n{% for s in spines %} neighbor {{ s }} remote-as 64500\\n{% endfor %} network {{ d.loopback }} mask 255.255.255.255\\n{% endfor %}\")\nprint(template.render(devices=devices, spines=spines).strip())\nprint()\nasns = [d[\"asn\"] for d in devices] + [64500]\nprint(f\"Fabric validation: ASNs unique: {len(set(asns)) == len(asns)}\")\nprint(f\"Links: {len(devices) * len(spines)}\")\n",
   "solutionExplanation": "The solution builds the required data, applies the Data Center Fabric Automation Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "! leaf1 (AS 64512)\nrouter bgp 64512\n neighbor 10.0.0.1 remote-as 64500\n neighbor 10.0.0.2 remote-as 64500\n network 10.0.0.11 mask 255.255.255.255\n! leaf2 (AS 64513)\nrouter bgp 64513\n neighbor 10.0.0.1 remote-as 64500\n neighbor 10.0.0.2 remote-as 64500\n network 10.0.0.12 mask 255.255.255.255\n\nFabric validation: ASNs unique: True\nLinks: 4",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "Links: 4",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through Data Center Fabric Automation Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "Data Center Fabric Automation Capstone Project",
   "description": "Generate the underlay BGP configuration for a two-leaf fabric and validate the design.",
   "requirements": [
    "Generate the underlay BGP configuration for two leaves from one inventory with Jinja2.",
    "Apply at least three of these skills: Spine-leaf design, Underlay BGP, Fabric validation, Rollout planning.",
    "Validate that all ASNs are unique and every leaf connects to every spine.",
    "Produce the rollout checklist for the fabric."
   ],
   "rubric": [
    "The generated configs are complete and correct for both leaves.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-protocols-production",
  "slug": "netauto-protocols-production",
  "language": "python",
  "category": "devops",
  "title": "Production Protocol Automation",
  "description": "Run protocol automation in production: idempotent configs, drift detection, change windows, staged rollouts, validation gates, post-change verification, documentation, automated rollback, runbooks, and readiness reviews.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Idempotent configs",
   "Drift detection",
   "Change windows",
   "Staged rollouts",
   "Validation gates",
   "Post-change verification",
   "Change documentation",
   "Automated rollback",
   "Runbooks",
   "Production readiness"
  ],
  "prerequisites": [
   "netauto-protocols-dc-fabric",
   "netauto-protocols-bgp-validation"
  ],
  "analogy": "Learning {topic} is like learning to run a railway: the timetable is the plan, the signals are the checks, and nothing moves until the track ahead is clear.",
  "modules": [
   {
    "id": "netauto-protocols-production-m1",
    "title": "Production Protocol Automation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-protocols-production-m1-l1",
      "slug": "netauto-protocols-production-m1-l1",
      "title": "Idempotent Protocol Configs",
      "concept": "An idempotent configuration produces the same result whether it is applied once or ten times, because the generator emits the exact desired state instead of incremental changes. Idempotence matters for protocol configs because re-applying a neighbour statement must not create a duplicate session or flap an existing one. Automation checks idempotence by generating the config twice and comparing the outputs byte for byte.",
      "syntax": "generate(config) == generate(config)  # same output every time",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template('router bgp {{ asn }}')\nprint(template.render(asn=64512) == template.render(asn=64512))  # True",
      "exampleLanguage": "python",
      "mistake": "Generating a config that includes the current date or a random value, so every generation differs and the config can never be compared.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Idempotent Protocol Configs, but it does not work correctly.",
       "buggyCode": "template = Template('router bgp {{ asn }}\\n! generated {{ now }}')  # timestamp in the config",
       "fixedCode": "template = Template('router bgp {{ asn }}')  # deterministic output only",
       "explanation": "A timestamp in the generated config makes every run different, so idempotence can never be verified by comparison."
      },
      "exercise": {
       "title": "Practise Idempotent Protocol Configs",
       "type": "write-code",
       "instructions": "Check idempotence by rendering the same BGP config template twice with Jinja2 (AS 64512, neighbour 192.0.2.1 remote-as 64513) and comparing the outputs. Print the rendered config, then print 'Idempotent: True' if the two renders are identical, and print 'Config lines: 2'.",
       "starterCode": "from jinja2 import Template\n\ntemplate = Template(\"router bgp {{ asn }}\\n neighbor {{ peer }} remote-as {{ remote_as }}\")\nfirst = template.render(asn=64512, peer=\"192.0.2.1\", remote_as=64513)\nsecond = template.render(asn=64512, peer=\"192.0.2.1\", remote_as=64513)\n# TODO: finish the program for Idempotent Protocol Configs below.\n",
       "solution": "from jinja2 import Template\n\ntemplate = Template(\"router bgp {{ asn }}\\n neighbor {{ peer }} remote-as {{ remote_as }}\")\nfirst = template.render(asn=64512, peer=\"192.0.2.1\", remote_as=64513)\nsecond = template.render(asn=64512, peer=\"192.0.2.1\", remote_as=64513)\nprint(first)\nprint(f\"Idempotent: {first == second}\")\nprint(f\"Config lines: {len(first.splitlines())}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Idempotent Protocol Configs technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\nIdempotent: True\nConfig lines: 2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Config lines: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Idempotent Protocol Configs is the key idea here: An idempotent configuration produces the same result whether it is applied once or ten times, because the generator emits the exact desired state instead of incremental changes.",
        "approach": "Work through Idempotent Protocol Configs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-production-m1-l2",
      "slug": "netauto-protocols-production-m1-l2",
      "title": "Config Drift Detection",
      "concept": "Configuration drift is the difference between the config a router should have and the config it actually has, and it happens when someone changes a router by hand outside automation. Drift detection compares the generated config with the saved running config line by line and reports every added, removed, or changed line. Detecting drift early matters because a hand-edited neighbour statement can be overwritten by the next automated run.",
      "syntax": "desired: neighbor 192.0.2.1 remote-as 64513\nactual:  neighbor 192.0.2.1 remote-as 64514  -> drift",
      "exampleCode": "desired = {'router bgp 64512', 'neighbor 192.0.2.1 remote-as 64513'}\nactual = {'router bgp 64512', 'neighbor 192.0.2.1 remote-as 64514'}\nprint(desired - actual)  # drifted lines",
      "exampleLanguage": "python",
      "mistake": "Comparing configs as one long string, so a single changed line reports the whole file as drifted instead of naming the line.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Config Drift Detection, but it does not work correctly.",
       "buggyCode": "drift = desired_text != actual_text  # whole file differs",
       "fixedCode": "drift = set(desired_lines) ^ set(actual_lines)  # exact lines that differ",
       "explanation": "A whole-file comparison cannot name the drifted line; a line-by-line diff reports exactly what changed."
      },
      "exercise": {
       "title": "Practise Config Drift Detection",
       "type": "write-code",
       "instructions": "Detect drift between the desired config (router bgp 64512; neighbor 192.0.2.1 remote-as 64513; neighbor 192.0.2.2 remote-as 64514) and the actual saved config (router bgp 64512; neighbor 192.0.2.1 remote-as 64513; neighbor 192.0.2.2 remote-as 64515). Print 'DRIFT: desired has neighbor 192.0.2.2 remote-as 64514' and 'DRIFT: actual has neighbor 192.0.2.2 remote-as 64515', then print 'Drift lines: 2'.",
       "starterCode": "desired = {\n    \"router bgp 64512\",\n    \"neighbor 192.0.2.1 remote-as 64513\",\n    \"neighbor 192.0.2.2 remote-as 64514\",\n}\nactual = {\n    \"router bgp 64512\",\n    \"neighbor 192.0.2.1 remote-as 64513\",\n    \"neighbor 192.0.2.2 remote-as 64515\",\n}\n# TODO: finish the program for Config Drift Detection below.\n",
       "solution": "desired = {\n    \"router bgp 64512\",\n    \"neighbor 192.0.2.1 remote-as 64513\",\n    \"neighbor 192.0.2.2 remote-as 64514\",\n}\nactual = {\n    \"router bgp 64512\",\n    \"neighbor 192.0.2.1 remote-as 64513\",\n    \"neighbor 192.0.2.2 remote-as 64515\",\n}\nfor line in sorted(desired - actual):\n    print(f\"DRIFT: desired has {line}\")\nfor line in sorted(actual - desired):\n    print(f\"DRIFT: actual has {line}\")\nprint(f\"Drift lines: {len(desired ^ actual)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Config Drift Detection technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "DRIFT: desired has neighbor 192.0.2.2 remote-as 64514\nDRIFT: actual has neighbor 192.0.2.2 remote-as 64515\nDrift lines: 2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Drift lines: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Config Drift Detection is the key idea here: Configuration drift is the difference between the config a router should have and the config it actually has, and it happens when someone changes a router by hand outside automation.",
        "approach": "Work through Config Drift Detection step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-production-m1-l3",
      "slug": "netauto-protocols-production-m1-l3",
      "title": "Change Windows and Rollback Plans",
      "concept": "A change window is a scheduled period when protocol changes are allowed, chosen for low traffic and staffed by engineers who can respond if something goes wrong. Every change in the window needs a rollback plan that restores the previous configuration, and the plan is tested before the change starts. Changes outside a window are only made for emergencies, and they still need a rollback plan.",
      "syntax": "change window: Saturday 02:00-04:00\nrollback: restore saved config, verify BGP Established",
      "exampleCode": "change = {'window': 'Saturday 02:00-04:00', 'rollback': 'restore saved config'}\nprint(change['window'])",
      "exampleLanguage": "python",
      "mistake": "Starting a protocol change without a tested rollback plan, so a failed change leaves the network broken while the team writes a fix from scratch.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Change Windows and Rollback Plans, but it does not work correctly.",
       "buggyCode": "# change starts at 02:00; rollback plan to be written if it fails",
       "fixedCode": "# rollback plan tested in the lab before the 02:00 window",
       "explanation": "A rollback plan that has never been tested is not a plan; it must be rehearsed before the change window opens."
      },
      "exercise": {
       "title": "Check your understanding: Change Windows and Rollback Plans",
       "type": "multiple-choice",
       "instructions": "Which statement about Change Windows and Rollback Plans is correct?",
       "starterCode": "",
       "solution": "A change window is a scheduled period when protocol changes are allowed, chosen for low traffic and staffed by engineers who can respond if something goes wrong.",
       "solutionExplanation": "A change window is a scheduled period when protocol changes are allowed, chosen for low traffic and staffed by engineers who can respond if something goes wrong. The other options are false: Change Windows and Rollback Plans is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A change window is a scheduled period when protocol changes are allowed, chosen for low traffic and staffed by engineers who can respond if something goes wrong.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Change Windows and Rollback Plans from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Change Windows and Rollback Plans can only be used once in a program",
        "Change Windows and Rollback Plans requires a separate paid licence to use",
        "Change Windows and Rollback Plans is not available in Python",
        "A change window is a scheduled period when protocol changes are allowed, chosen for low traffic and staffed by engineers who can respond if something goes wrong.",
        "Change Windows and Rollback Plans only works when the program prints text"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-protocols-production-m1-l4",
      "slug": "netauto-protocols-production-m1-l4",
      "title": "Staged Rollouts for Protocol Changes",
      "concept": "A staged rollout applies a protocol change to one device first, verifies it, and only then rolls it out to the rest, which limits the blast radius of a mistake. The rollout order is computed from device roles: a single leaf first, then the remaining leaves, then the spines, so the core is changed last. Automation generates the stage list from the inventory and waits for verification between stages.",
      "syntax": "stage 1: leaf1\nstage 2: leaf2, leaf3\nstage 3: spine1, spine2",
      "exampleCode": "devices = [('leaf1', 'leaf'), ('leaf2', 'leaf'), ('spine1', 'spine')]\nstages = {'stage 1': ['leaf1'], 'stage 2': ['leaf2'], 'stage 3': ['spine1']}\nprint(stages['stage 1'])",
      "exampleLanguage": "python",
      "mistake": "Rolling a change out to every device at once, so a bad change breaks the whole network instead of one device.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Staged Rollouts for Protocol Changes, but it does not work correctly.",
       "buggyCode": "# apply to leaf1, leaf2, spine1, spine2 at the same time",
       "fixedCode": "# stage 1: leaf1; verify; stage 2: leaf2; verify; stage 3: spines",
       "explanation": "Applying everywhere at once makes the blast radius the whole network; staging limits it to one device at a time."
      },
      "exercise": {
       "title": "Practise Staged Rollouts for Protocol Changes",
       "type": "write-code",
       "instructions": "Compute the staged rollout order for a change affecting leaf1, leaf2, spine1, and spine2: stage 1 is the first leaf, stage 2 is the remaining leaves, stage 3 is the spines. Print one line per stage in the form 'Stage <n>: <devices>' with devices comma-separated, then print 'Stages: 3, devices: 4'.",
       "starterCode": "devices = [(\"leaf1\", \"leaf\"), (\"leaf2\", \"leaf\"), (\"spine1\", \"spine\"), (\"spine2\", \"spine\")]\nleaves = [name for name, role in devices if role == \"leaf\"]\nspines = [name for name, role in devices if role == \"spine\"]\nstages = [[leaves[0]], leaves[1:], spines]\n# TODO: finish the program for Staged Rollouts for Protocol Changes below.\n",
       "solution": "devices = [(\"leaf1\", \"leaf\"), (\"leaf2\", \"leaf\"), (\"spine1\", \"spine\"), (\"spine2\", \"spine\")]\nleaves = [name for name, role in devices if role == \"leaf\"]\nspines = [name for name, role in devices if role == \"spine\"]\nstages = [[leaves[0]], leaves[1:], spines]\nfor i, stage in enumerate(stages, start=1):\n    print(f\"Stage {i}: {', '.join(stage)}\")\nprint(f\"Stages: {len(stages)}, devices: {len(devices)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Staged Rollouts for Protocol Changes technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Stage 1: leaf1\nStage 2: leaf2\nStage 3: spine1, spine2\nStages: 3, devices: 4",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Stages: 3, devices: 4",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Staged Rollouts for Protocol Changes is the key idea here: A staged rollout applies a protocol change to one device first, verifies it, and only then rolls it out to the rest, which limits the blast radius of a mistake.",
        "approach": "Work through Staged Rollouts for Protocol Changes step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-production-m1-l5",
      "slug": "netauto-protocols-production-m1-l5",
      "title": "Pre-Change Validation Gates",
      "concept": "A pre-change validation gate is a set of checks that must pass before a protocol change is applied, such as verifying ASNs are valid, prefixes are well-formed, and router IDs are unique. The gate runs automatically when a change is proposed and blocks the change if any check fails. Gates turn tribal knowledge about what can go wrong into executable checks that run the same way every time.",
      "syntax": "gate: ASN valid, prefix valid, router IDs unique -> PASS",
      "exampleCode": "import ipaddress\n\nprint(ipaddress.ip_network('203.0.113.0/24'))\nprint(64512 <= 64513 <= 65534)",
      "exampleLanguage": "python",
      "mistake": "Running the gate after the change is applied, when a failure means the network is already broken instead of the change being blocked.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Pre-Change Validation Gates, but it does not work correctly.",
       "buggyCode": "# apply change, then run the validation gate",
       "fixedCode": "# run the validation gate, then apply the change only if it passes",
       "explanation": "A gate only protects the network when it runs before the change; running it after is a post-mortem, not a gate."
      },
      "exercise": {
       "title": "Practise Pre-Change Validation Gates",
       "type": "write-code",
       "instructions": "Run the pre-change validation gate for a change (ASN 64513, prefix 203.0.113.0/24, router IDs ['1.1.1.1', '2.2.2.2']). Check that the ASN is a valid 16-bit private ASN (64512-65534), that the prefix parses as a network, and that the router IDs are unique. Print 'PASS: ASN 64513 valid', 'PASS: prefix 203.0.113.0/24 valid', 'PASS: router IDs unique', then print 'GATE: PASS - change may proceed'.",
       "starterCode": "import ipaddress\n\nasn = 64513\nprefix = \"203.0.113.0/24\"\nrouter_ids = [\"1.1.1.1\", \"2.2.2.2\"]\npassed = 0\n# TODO: finish the program for Pre-Change Validation Gates below.\n",
       "solution": "import ipaddress\n\nasn = 64513\nprefix = \"203.0.113.0/24\"\nrouter_ids = [\"1.1.1.1\", \"2.2.2.2\"]\npassed = 0\nif 64512 <= asn <= 65534:\n    print(f\"PASS: ASN {asn} valid\")\n    passed += 1\nelse:\n    print(f\"FAIL: ASN {asn} invalid\")\ntry:\n    ipaddress.ip_network(prefix)\n    print(f\"PASS: prefix {prefix} valid\")\n    passed += 1\nexcept ValueError:\n    print(f\"FAIL: prefix {prefix} invalid\")\nif len(set(router_ids)) == len(router_ids):\n    print(\"PASS: router IDs unique\")\n    passed += 1\nelse:\n    print(\"FAIL: duplicate router ID\")\nif passed == 3:\n    print(\"GATE: PASS - change may proceed\")\nelse:\n    print(\"GATE: FAIL - change blocked\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Pre-Change Validation Gates technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: ASN 64513 valid\nPASS: prefix 203.0.113.0/24 valid\nPASS: router IDs unique\nGATE: PASS - change may proceed",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "GATE: PASS - change may proceed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Pre-Change Validation Gates is the key idea here: A pre-change validation gate is a set of checks that must pass before a protocol change is applied, such as verifying ASNs are valid, prefixes are well-formed, and router IDs are unique.",
        "approach": "Work through Pre-Change Validation Gates step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-protocols-production-m2",
    "title": "Production Protocol Automation in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-protocols-production-m2-l1",
      "slug": "netauto-protocols-production-m2-l1",
      "title": "Post-Change Verification",
      "concept": "Post-change verification checks the network after a protocol change by comparing the expected state with the recorded state: sessions Established, prefixes present, and path attributes as intended. The verification reads the same structured state the validation checks use, so it is the mirror image of the pre-change gate. A change is only marked complete when post-change verification passes, not when the config is applied.",
      "syntax": "expected: 192.0.2.1 Established, 203.0.113.0/24 present\nactual: matches -> change complete",
      "exampleCode": "expected = {'192.0.2.1': 'Established', '203.0.113.0/24': 'present'}\nactual = {'192.0.2.1': 'Established', '203.0.113.0/24': 'present'}\nprint(expected == actual)  # True",
      "exampleLanguage": "python",
      "mistake": "Marking a change complete when the config is applied, without verifying that the sessions came up and the routes appeared.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Post-Change Verification, but it does not work correctly.",
       "buggyCode": "# config applied at 02:10, change marked complete at 02:10",
       "fixedCode": "# config applied at 02:10, verification passed at 02:12, change marked complete at 02:12",
       "explanation": "Applying the config is only half the change; the change is complete when post-change verification passes."
      },
      "exercise": {
       "title": "Practise Post-Change Verification",
       "type": "write-code",
       "instructions": "Verify the post-change state against the expected state: expected sessions 192.0.2.1 Established and 192.0.2.2 Established; expected prefix 203.0.113.0/24 present. Actual state: 192.0.2.1 Established, 192.0.2.2 Idle, 203.0.113.0/24 present. Print 'PASS: 192.0.2.1 Established' or 'FAIL: <neighbor> <state>' per session, 'PASS: 203.0.113.0/24 present' or the FAIL line, then print 'Verification: 2 passed, 1 failed - change NOT complete'.",
       "starterCode": "expected_sessions = {\"192.0.2.1\": \"Established\", \"192.0.2.2\": \"Established\"}\nactual_sessions = {\"192.0.2.1\": \"Established\", \"192.0.2.2\": \"Idle\"}\nexpected_routes = {\"203.0.113.0/24\": True}\nactual_routes = {\"203.0.113.0/24\": True}\npassed = 0\nfailed = 0\n# TODO: finish the program for Post-Change Verification below.\n",
       "solution": "expected_sessions = {\"192.0.2.1\": \"Established\", \"192.0.2.2\": \"Established\"}\nactual_sessions = {\"192.0.2.1\": \"Established\", \"192.0.2.2\": \"Idle\"}\nexpected_routes = {\"203.0.113.0/24\": True}\nactual_routes = {\"203.0.113.0/24\": True}\npassed = 0\nfailed = 0\nfor neighbor, state in expected_sessions.items():\n    if actual_sessions.get(neighbor) == state:\n        print(f\"PASS: {neighbor} {state}\")\n        passed += 1\n    else:\n        print(f\"FAIL: {neighbor} {actual_sessions.get(neighbor)}\")\n        failed += 1\nfor prefix in expected_routes:\n    if actual_routes.get(prefix):\n        print(f\"PASS: {prefix} present\")\n        passed += 1\n    else:\n        print(f\"FAIL: {prefix} missing\")\n        failed += 1\nprint(f\"Verification: {passed} passed, {failed} failed - change NOT complete\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Post-Change Verification technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: 192.0.2.1 Established\nFAIL: 192.0.2.2 Idle\nPASS: 203.0.113.0/24 present\nVerification: 2 passed, 1 failed - change NOT complete",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Verification: 2 passed, 1 failed - change NOT complete",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Post-Change Verification is the key idea here: Post-change verification checks the network after a protocol change by comparing the expected state with the recorded state: sessions Established, prefixes present, and path attributes as intended.",
        "approach": "Work through Post-Change Verification step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-production-m2-l2",
      "slug": "netauto-protocols-production-m2-l2",
      "title": "Protocol Change Documentation",
      "concept": "Protocol change documentation records what changed, why it changed, who approved it, and how to roll it back, so the next engineer can understand the network without guessing. The documentation is generated from the same change data as the configuration, which keeps the two in agreement. A change without documentation is a mystery for the next person who troubleshoots that part of the network.",
      "syntax": "change: add neighbour 192.0.2.2 AS 64514\nreason: new transit link\napproved by: neteng\nrollback: remove neighbour",
      "exampleCode": "change = {'what': 'add neighbour 192.0.2.2 AS 64514', 'why': 'new transit link', 'approved_by': 'neteng'}\nprint(change['what'])",
      "exampleLanguage": "python",
      "mistake": "Documenting the change in a chat message that scrolls away, instead of in the change record that lives with the config.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Protocol Change Documentation, but it does not work correctly.",
       "buggyCode": "# change documented in a chat thread",
       "fixedCode": "# change documented in the change record, generated from the same data as the config",
       "explanation": "Chat messages disappear; the change record lives with the configuration and is found by the next engineer."
      },
      "exercise": {
       "title": "Check your understanding: Protocol Change Documentation",
       "type": "multiple-choice",
       "instructions": "Which statement about Protocol Change Documentation is correct?",
       "starterCode": "",
       "solution": "Protocol change documentation records what changed, why it changed, who approved it, and how to roll it back, so the next engineer can understand the network without guessing.",
       "solutionExplanation": "Protocol change documentation records what changed, why it changed, who approved it, and how to roll it back, so the next engineer can understand the network without guessing. The other options are false: Protocol Change Documentation is an ordinary, freely available part of network automation.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Protocol change documentation records what changed, why it changed, who approved it, and how to roll it back, so the next engineer can understand the network without guessing.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Protocol Change Documentation from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Protocol change documentation records what changed, why it changed, who approved it, and how to roll it back, so the next engineer can understand the network without guessing.",
        "Protocol Change Documentation can only be used once in a program",
        "Protocol Change Documentation requires a separate paid licence to use",
        "Protocol Change Documentation is not available in Python",
        "Protocol Change Documentation only works when the program prints text"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-protocols-production-m2-l3",
      "slug": "netauto-protocols-production-m2-l3",
      "title": "Automating Rollback",
      "concept": "Automated rollback restores the previous protocol configuration from the saved state captured before the change, without needing a human to remember what the old values were. The rollback config is generated from the previous inventory snapshot, so it is the exact inverse of the change. A rollback is rehearsed in the lab before the change window, because a rollback that has never been tested is not a plan.",
      "syntax": "before: neighbor 192.0.2.1 remote-as 64513\nrollback: restore neighbor 192.0.2.1 remote-as 64513",
      "exampleCode": "from jinja2 import Template\n\ntemplate = Template(' neighbor {{ peer }} remote-as {{ remote_as }}')\nprint(template.render(peer='192.0.2.1', remote_as=64513))",
      "exampleLanguage": "python",
      "mistake": "Writing the rollback by hand during the incident, when the old values are no longer certain and the pressure is highest.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Automating Rollback, but it does not work correctly.",
       "buggyCode": "# rollback written from memory after the failure",
       "fixedCode": "# rollback generated from the snapshot taken before the change",
       "explanation": "The pre-change snapshot holds the exact old values; a rollback written from memory during an incident is a guess."
      },
      "exercise": {
       "title": "Practise Automating Rollback",
       "type": "write-code",
       "instructions": "Generate the rollback configuration from the pre-change snapshot (AS 64512, neighbour 192.0.2.1 remote-as 64513) with Jinja2: print 'router bgp <asn>' and ' neighbor <address> remote-as <remote_as>'. Then print '! Rollback restores the pre-change state'. Print the rendered rollback config.",
       "starterCode": "from jinja2 import Template\ndata = {'asn': 64512, 'peer': '192.0.2.1', 'remote_as': 64513}\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ peer }} remote-as {{ remote_as }}\\n! Rollback restores the pre-change state')\n# TODO: finish the program for Automating Rollback below.\n",
       "solution": "from jinja2 import Template\ndata = {'asn': 64512, 'peer': '192.0.2.1', 'remote_as': 64513}\ntemplate = Template('router bgp {{ asn }}\\n neighbor {{ peer }} remote-as {{ remote_as }}\\n! Rollback restores the pre-change state')\nprint(template.render(**data).strip())\n",
       "solutionExplanation": "The solution builds the required data, applies the Automating Rollback technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "router bgp 64512\n neighbor 192.0.2.1 remote-as 64513\n! Rollback restores the pre-change state",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "! Rollback restores the pre-change state",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Automating Rollback is the key idea here: Automated rollback restores the previous protocol configuration from the saved state captured before the change, without needing a human to remember what the old values were.",
        "approach": "Work through Automating Rollback step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-production-m2-l4",
      "slug": "netauto-protocols-production-m2-l4",
      "title": "Protocol Automation Runbook",
      "concept": "A runbook is a step-by-step document that tells an engineer exactly how to perform a protocol change, including the checks to run before, during, and after. The runbook is generated from the change data so the steps, the device names, and the expected outputs all match the real network. A generated runbook stays accurate as the network changes, while a hand-written one goes stale.",
      "syntax": "runbook: change CHG-42\n1. run pre-change gate\n2. apply to leaf1\n3. verify BGP\n4. apply to the rest",
      "exampleCode": "steps = ['run pre-change gate', 'apply to leaf1', 'verify BGP', 'apply to the rest']\nfor i, step in enumerate(steps, start=1):\n    print(f'{i}. {step}')",
      "exampleLanguage": "python",
      "mistake": "Writing the runbook once and never regenerating it, so the device names and expected outputs go stale as the network changes.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Protocol Automation Runbook, but it does not work correctly.",
       "buggyCode": "# runbook from last year: device names that no longer exist",
       "fixedCode": "# runbook generated from today's change data",
       "explanation": "A runbook is only useful when its steps match the current network; regenerating it from the change data keeps it accurate."
      },
      "exercise": {
       "title": "Practise Protocol Automation Runbook",
       "type": "write-code",
       "instructions": "Generate the runbook for change CHG-42 (add neighbour 192.0.2.2 AS 64514 to R1). Print 'Runbook: CHG-42 - add neighbour 192.0.2.2 AS 64514 to R1', then the numbered steps: '1. Run pre-change gate', '2. Snapshot the current config', '3. Apply to R1', '4. Verify 192.0.2.2 Established', '5. Verify 203.0.113.0/24 present'.",
       "starterCode": "print(\"Runbook: CHG-42 - add neighbour 192.0.2.2 AS 64514 to R1\")\nsteps = [\n    \"Run pre-change gate\",\n    \"Snapshot the current config\",\n    \"Apply to R1\",\n    \"Verify 192.0.2.2 Established\",\n    \"Verify 203.0.113.0/24 present\",\n]\n# TODO: finish the program for Protocol Automation Runbook below.\n",
       "solution": "print(\"Runbook: CHG-42 - add neighbour 192.0.2.2 AS 64514 to R1\")\nsteps = [\n    \"Run pre-change gate\",\n    \"Snapshot the current config\",\n    \"Apply to R1\",\n    \"Verify 192.0.2.2 Established\",\n    \"Verify 203.0.113.0/24 present\",\n]\nfor i, step in enumerate(steps, start=1):\n    print(f\"{i}. {step}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Protocol Automation Runbook technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Runbook: CHG-42 - add neighbour 192.0.2.2 AS 64514 to R1\n1. Run pre-change gate\n2. Snapshot the current config\n3. Apply to R1\n4. Verify 192.0.2.2 Established\n5. Verify 203.0.113.0/24 present",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "5. Verify 203.0.113.0/24 present",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Protocol Automation Runbook is the key idea here: A runbook is a step-by-step document that tells an engineer exactly how to perform a protocol change, including the checks to run before, during, and after.",
        "approach": "Work through Protocol Automation Runbook step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-protocols-production-m2-l5",
      "slug": "netauto-protocols-production-m2-l5",
      "title": "Production Readiness Review",
      "concept": "A production readiness review scores a protocol automation change against a checklist: idempotence, validation gates, rollback plan, documentation, and monitoring, and the change only ships when the score passes the threshold. The review is computed from the change record, so the score is objective and comparable between changes. A low score names exactly which practice is missing, which tells the author what to fix.",
      "syntax": "readiness: idempotent, gate passed, rollback tested, documented, monitored\nscore 5/5 -> ready",
      "exampleCode": "checks = {'idempotent': True, 'gate passed': True, 'rollback tested': True, 'documented': True, 'monitored': True}\nprint(sum(checks.values()), '/', len(checks))",
      "exampleLanguage": "python",
      "mistake": "Scoring readiness by gut feel instead of against the checklist, so two similar changes get different scores for no reason.",
      "bug": {
       "prompt": "Find the bug: this example should demonstrate Production Readiness Review, but it does not work correctly.",
       "buggyCode": "# readiness: looks ready to me",
       "fixedCode": "# readiness: 5/5 against the checklist",
       "explanation": "A checklist score is objective and comparable; a gut-feel score cannot be reviewed or repeated."
      },
      "exercise": {
       "title": "Practise Production Readiness Review",
       "type": "write-code",
       "instructions": "Score the production readiness of change CHG-42 against five checks: idempotent (True), gate passed (True), rollback tested (False), documented (True), monitored (True). Print one line per check in the form 'PASS: <name>' or 'FAIL: <name>', then print 'Readiness: 4/5 - missing: rollback tested' and 'Ready to ship: False' (threshold is 5/5).",
       "starterCode": "checks = [\n    (\"idempotent\", True),\n    (\"gate passed\", True),\n    (\"rollback tested\", False),\n    (\"documented\", True),\n    (\"monitored\", True),\n]\npassed = 0\nmissing = []\n# TODO: finish the program for Production Readiness Review below.\n",
       "solution": "checks = [\n    (\"idempotent\", True),\n    (\"gate passed\", True),\n    (\"rollback tested\", False),\n    (\"documented\", True),\n    (\"monitored\", True),\n]\npassed = 0\nmissing = []\nfor name, ok in checks:\n    print(f\"{'PASS' if ok else 'FAIL'}: {name}\")\n    if ok:\n        passed += 1\n    else:\n        missing.append(name)\nprint(f\"Readiness: {passed}/{len(checks)} - missing: {', '.join(missing)}\")\nprint(f\"Ready to ship: {passed == len(checks)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Production Readiness Review technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: idempotent\nPASS: gate passed\nFAIL: rollback tested\nPASS: documented\nPASS: monitored\nReadiness: 4/5 - missing: rollback tested\nReady to ship: False",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Ready to ship: False",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Production Readiness Review is the key idea here: A production readiness review scores a protocol automation change against a checklist: idempotence, validation gates, rollback plan, documentation, and monitoring, and the change only ships when the score passes the threshold.",
        "approach": "Work through Production Readiness Review step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Production Protocol Automation",
   "type": "write-code",
   "instructions": "Run the production change package for CHG-42: first the pre-change gate, then the readiness review. Gate checks: ASN 64514 valid (64512-65534), prefix 203.0.113.0/24 valid, router IDs ['1.1.1.1', '2.2.2.2'] unique. Print 'PASS: ASN 64514 valid', 'PASS: prefix 203.0.113.0/24 valid', 'PASS: router IDs unique', 'GATE: PASS - change may proceed'. Then the readiness checks: idempotent (True), gate passed (True), rollback tested (True), documented (True), monitored (True). Print one line per check in the form 'PASS: <name>', then print 'Readiness: 5/5' and 'Ready to ship: True'.",
   "starterCode": "import ipaddress\n\nasn = 64514\nprefix = \"203.0.113.0/24\"\nrouter_ids = [\"1.1.1.1\", \"2.2.2.2\"]\ngate = 0\n# TODO: finish the program for Production Protocol Automation Capstone below.\n",
   "solution": "import ipaddress\n\nasn = 64514\nprefix = \"203.0.113.0/24\"\nrouter_ids = [\"1.1.1.1\", \"2.2.2.2\"]\ngate = 0\nif 64512 <= asn <= 65534:\n    print(f\"PASS: ASN {asn} valid\")\n    gate += 1\ntry:\n    ipaddress.ip_network(prefix)\n    print(f\"PASS: prefix {prefix} valid\")\n    gate += 1\nexcept ValueError:\n    print(f\"FAIL: prefix {prefix} invalid\")\nif len(set(router_ids)) == len(router_ids):\n    print(\"PASS: router IDs unique\")\n    gate += 1\nprint(\"GATE: PASS - change may proceed\" if gate == 3 else \"GATE: FAIL - change blocked\")\nchecks = [\n    (\"idempotent\", True),\n    (\"gate passed\", True),\n    (\"rollback tested\", True),\n    (\"documented\", True),\n    (\"monitored\", True),\n]\npassed = 0\nfor name, ok in checks:\n    print(f\"{'PASS' if ok else 'FAIL'}: {name}\")\n    if ok:\n        passed += 1\nprint(f\"Readiness: {passed}/{len(checks)}\")\nprint(f\"Ready to ship: {passed == len(checks)}\")\n",
   "solutionExplanation": "The solution builds the required data, applies the Production Protocol Automation Capstone technique from the lesson, and prints exactly the expected output.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Capstone finished",
     "expectedStdout": "PASS: ASN 64514 valid\nPASS: prefix 203.0.113.0/24 valid\nPASS: router IDs unique\nGATE: PASS - change may proceed\nPASS: idempotent\nPASS: gate passed\nPASS: rollback tested\nPASS: documented\nPASS: monitored\nReadiness: 5/5\nReady to ship: True",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "Ready to ship: True",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Work through Production Protocol Automation Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Python: set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "Production Protocol Automation Capstone Project",
   "description": "Assemble the full production change package: pre-change gate, readiness review, and ship decision.",
   "requirements": [
    "Run the pre-change validation gate for change CHG-42.",
    "Apply at least three of these skills: Idempotent configs, Validation gates, Automated rollback, Production readiness.",
    "Score the change against the readiness checklist with a 5/5 threshold.",
    "State the ship decision and the evidence behind it."
   ],
   "rubric": [
    "The change package is complete and its verdict is correct.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
