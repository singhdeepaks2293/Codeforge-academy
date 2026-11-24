import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
 {
  "id": "netauto-apis-netconf",
  "slug": "netauto-apis-netconf",
  "language": "python",
  "category": "devops",
  "title": "NETCONF Foundations",
  "description": "Learn netconf foundations for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Beginner",
  "estimatedHours": 9,
  "skills": [
   "NETCONF concepts",
   "NETCONF over SSH",
   "RPC messages",
   "Datastores",
   "get-config",
   "edit-config",
   "Locking and candidate datastore",
   "XML with ElementTree"
  ],
  "prerequisites": [],
  "analogy": "Learning {topic} is like learning to send a formal letter: the envelope, the address and the reply format are fixed, and once you follow the format the message always gets through.",
  "modules": [
   {
    "id": "netauto-apis-netconf-m1",
    "title": "NETCONF Foundations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-netconf-m1-l1",
      "slug": "netauto-apis-netconf-m1-l1",
      "title": "What Is NETCONF?",
      "concept": "NETCONF is a protocol defined in RFC 6241 that lets a client read and change the configuration of a network device over an SSH session using XML messages. It replaces screen-scraping CLI output with structured data, so automation can rely on exact values instead of parsing text. Every NETCONF exchange is a remote procedure call: the client sends an <rpc> document and the device answers with an <rpc-reply>.",
      "syntax": "<rpc message-id=\"101\"><get-config>...</get-config></rpc>",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\nhello = ET.Element(\"{%s}hello\" % NS)\nprint(ET.tostring(hello, encoding=\"unicode\"))",
      "exampleLanguage": "python",
      "mistake": "Assuming NETCONF works over plain HTTP like a web API, when it normally runs over SSH on port 830.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is NETCONF?, but it does not work correctly.",
       "buggyCode": "import xml.etree.ElementTree as ET\n\nrpc = ET.Element(\"rpc\", {\"message-id\": \"101\"})\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
       "fixedCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\nrpc = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": \"101\"})\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
       "explanation": "Without the NETCONF namespace the device cannot recognise the message as a NETCONF RPC, so it rejects it instead of running the operation."
      },
      "exercise": {
       "title": "Practise What Is NETCONF?",
       "type": "write-code",
       "instructions": "Build a NETCONF <hello> message with one capability (urn:ietf:params:netconf:base:1.0) using xml.etree and print it.",
       "starterCode": "# Build a NETCONF <hello> message.\n# TODO: build the hello element and print it.\n",
       "solution": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\nhello = ET.Element(\"{%s}hello\" % NS)\ncaps = ET.SubElement(hello, \"{%s}capabilities\" % NS)\ncap = ET.SubElement(caps, \"{%s}capability\" % NS)\ncap.text = \"urn:ietf:params:netconf:base:1.0\"\nprint(ET.tostring(hello, encoding=\"unicode\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "<hello xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"><capabilities><capability>urn:ietf:params:netconf:base:1.0</capability></capabilities></hello>",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "<hello xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"><capabilities><capability>urn:ietf:params:netconf:base:1.0</capability></capabilities></hello>",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "NETCONF is a protocol defined in RFC 6241 that lets a client read and change the configuration of a network device over an SSH session using XML messages. It replaces screen-scraping CLI output with structured data, so automation can rely on exact values instead of parsing text. Every NETCONF exchange is a remote procedure call: the client sends an <rpc> document and the device answers with an <rpc-reply>.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-netconf-m1-l2",
      "slug": "netauto-apis-netconf-m1-l2",
      "title": "NETCONF Sessions and SSH",
      "concept": "A NETCONF session starts with an SSH connection to the device, usually on TCP port 830, followed by both sides exchanging <hello> messages that list their capabilities. The session stays open for many RPCs, and it ends when either side sends <close-session> or the SSH connection drops. Capabilities such as :candidate and :confirmed-commit are negotiated in the hello exchange, so the client knows which features the device supports before it tries to use them.",
      "syntax": "ssh -p 830 admin@192.0.2.1 -s netconf",
      "exampleCode": "# A NETCONF session is an SSH subsystem session on port 830.\n# $ ssh -p 830 admin@192.0.2.1 -s netconf\n# Both sides then exchange <hello> messages listing capabilities.\n# Running this needs a lab device or a real device with NETCONF enabled.",
      "exampleLanguage": "python",
      "mistake": "Forgetting that the session-id in the device hello identifies your session, and reusing another session's id in later RPCs.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate NETCONF Sessions and SSH, but it does not work correctly.",
       "buggyCode": "import xml.etree.ElementTree as ET\n\nroot = ET.fromstring(\"<hello><session-id>42</session-id></hello>\")\nprint(root.findtext(\"session-id\"))",
       "fixedCode": "import xml.etree.ElementTree as ET\n\nNS = {\"n\": \"urn:ietf:params:xml:ns:netconf:base:1.0\"}\nroot = ET.fromstring('<hello xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"><session-id>42</session-id></hello>')\nprint(root.findtext(\"n:session-id\", namespaces=NS))",
       "explanation": "ElementTree findtext without a namespace map cannot see namespaced elements, so it returns None even though the session-id is present."
      },
      "exercise": {
       "title": "Practise NETCONF Sessions and SSH",
       "type": "write-code",
       "instructions": "Parse the sample <hello> message in the starter code, then print the session-id and each capability on its own line.",
       "starterCode": "# Parse the <hello> message below and print the session-id and capabilities.\n# TODO: parse HELLO and print the values.\nHELLO = \"\"\"<hello xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n  <capabilities>\n    <capability>urn:ietf:params:netconf:base:1.0</capability>\n    <capability>urn:ietf:params:netconf:capability:candidate:1.0</capability>\n    <capability>urn:ietf:params:netconf:capability:confirmed-commit:1.0</capability>\n  </capabilities>\n  <session-id>42</session-id>\n</hello>\"\"\"\n",
       "solution": "import xml.etree.ElementTree as ET\n\nHELLO = \"\"\"<hello xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n  <capabilities>\n    <capability>urn:ietf:params:netconf:base:1.0</capability>\n    <capability>urn:ietf:params:netconf:capability:candidate:1.0</capability>\n    <capability>urn:ietf:params:netconf:capability:confirmed-commit:1.0</capability>\n  </capabilities>\n  <session-id>42</session-id>\n</hello>\"\"\"\nNS = {\"n\": \"urn:ietf:params:xml:ns:netconf:base:1.0\"}\nroot = ET.fromstring(HELLO)\ncaps = [c.text for c in root.findall(\".//n:capability\", NS)]\nprint(\"session-id:\", root.findtext(\"n:session-id\", namespaces=NS))\nprint(\"capabilities:\", len(caps))\nfor c in caps:\n    print(c)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "session-id: 42\ncapabilities: 3\nurn:ietf:params:netconf:base:1.0\nurn:ietf:params:netconf:capability:candidate:1.0\nurn:ietf:params:netconf:capability:confirmed-commit:1.0",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "session-id: 42\ncapabilities: 3\nurn:ietf:params:netconf:base:1.0\nurn:ietf:params:netconf:capability:candidate:1.0\nurn:ietf:params:netconf:capability:confirmed-commit:1.0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A NETCONF session starts with an SSH connection to the device, usually on TCP port 830, followed by both sides exchanging <hello> messages that list their capabilities. The session stays open for many RPCs, and it ends when either side sends <close-session> or the SSH connection drops. Capabilities such as :candidate and :confirmed-commit are negotiated in the hello exchange, so the client knows which features the device supports before it tries to use them.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-netconf-m1-l3",
      "slug": "netauto-apis-netconf-m1-l3",
      "title": "The RPC and Reply Exchange",
      "concept": "Every NETCONF request is an <rpc> element with a unique message-id attribute, and every response is an <rpc-reply> carrying the same message-id so the client can match replies to requests. A successful reply contains a <data> or <ok/> element, while a failed one contains an <rpc-error> element describing what went wrong. The message-id is how a client keeps track when several RPCs are in flight on one session.",
      "syntax": "<rpc message-id=\"101\">...</rpc>\n<rpc-reply message-id=\"101\"><ok/></rpc-reply>",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nreply = '<rpc-reply message-id=\"101\"><ok/></rpc-reply>'\nroot = ET.fromstring(reply)\nprint(\"ok\" if root.find(\"ok\") is not None else \"error\")",
      "exampleLanguage": "python",
      "mistake": "Reusing the same message-id for every RPC, so replies can no longer be matched to the request that caused them.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The RPC and Reply Exchange, but it does not work correctly.",
       "buggyCode": "import xml.etree.ElementTree as ET\n\nreply = '<rpc-reply message-id=\"101\"><rpc-error><error-tag>bad-element</error-tag></rpc-error></rpc-reply>'\nroot = ET.fromstring(reply)\nprint(\"ok\" if root.find(\"ok\") is not None else \"no error\")",
       "fixedCode": "import xml.etree.ElementTree as ET\n\nreply = '<rpc-reply message-id=\"101\"><rpc-error><error-tag>bad-element</error-tag></rpc-error></rpc-reply>'\nroot = ET.fromstring(reply)\nerr = root.find(\"rpc-error/error-tag\")\nprint(\"error: \" + err.text if err is not None else \"ok\")",
       "explanation": "Printing 'no error' whenever <ok/> is absent hides the rpc-error; the reply must be checked for rpc-error and its error-tag reported."
      },
      "exercise": {
       "title": "Check your understanding: The RPC and Reply Exchange",
       "type": "multiple-choice",
       "instructions": "Which statement about The RPC and Reply Exchange is correct?",
       "starterCode": "",
       "solution": "Every NETCONF request is an <rpc> element with a unique message-id attribute, and every response is an <rpc-reply> carrying the same message-id so the client can match replies to requests.",
       "solutionExplanation": "Every NETCONF request is an <rpc> element with a unique message-id attribute, and every response is an <rpc-reply> carrying the same message-id so the client can match replies to requests. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Every NETCONF request is an <rpc> element with a unique message-id attribute, and every response is an <rpc-reply> carrying the same message-id so the client can match replies to requests.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of The RPC and Reply Exchange from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "Every NETCONF request is an <rpc> element with a unique message-id attribute, and every response is an <rpc-reply> carrying the same message-id so the client can match replies to requests.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-netconf-m1-l4",
      "slug": "netauto-apis-netconf-m1-l4",
      "title": "NETCONF Datastores",
      "concept": "NETCONF keeps configuration in datastores, and the two every device has are <running>, the live configuration, and <startup>, the configuration loaded at boot. Devices with the :candidate capability add a <candidate> datastore where changes are staged before they are committed to <running>. Reading from <running> shows what the device is doing now, while editing <candidate> lets you prepare and check a change before it takes effect.",
      "syntax": "<get-config><source><running/></source></get-config>",
      "exampleCode": "# Datastores: <running> (live), <startup> (boot), <candidate> (staged).\n# <get-config><source><running/></source></get-config>\n# <edit-config><target><candidate/></target>...</edit-config>",
      "exampleLanguage": "python",
      "mistake": "Editing <running> directly on a device that supports :candidate, instead of staging the change in <candidate> and committing it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate NETCONF Datastores, but it does not work correctly.",
       "buggyCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nrpc = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": \"101\"})\nedit = ET.SubElement(rpc, \"{%s}edit-config\" % NS)\ntarget = ET.SubElement(edit, \"{%s}target\" % NS)\nET.SubElement(target, \"{%s}running\" % NS)  # edits live config directly\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
       "fixedCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nrpc = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": \"101\"})\nedit = ET.SubElement(rpc, \"{%s}edit-config\" % NS)\ntarget = ET.SubElement(edit, \"{%s}target\" % NS)\nET.SubElement(target, \"{%s}candidate\" % NS)  # stage first, commit later\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
       "explanation": "Editing <running> applies the change immediately with no chance to validate or roll back; staging in <candidate> lets you check the change before committing it."
      },
      "exercise": {
       "title": "Check your understanding: NETCONF Datastores",
       "type": "multiple-choice",
       "instructions": "Which statement about NETCONF Datastores is correct?",
       "starterCode": "",
       "solution": "NETCONF keeps configuration in datastores, and the two every device has are <running>, the live configuration, and <startup>, the configuration loaded at boot.",
       "solutionExplanation": "NETCONF keeps configuration in datastores, and the two every device has are <running>, the live configuration, and <startup>, the configuration loaded at boot. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "NETCONF keeps configuration in datastores, and the two every device has are <running>, the live configuration, and <startup>, the configuration loaded at boot.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of NETCONF Datastores from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "NETCONF keeps configuration in datastores, and the two every device has are <running>, the live configuration, and <startup>, the configuration loaded at boot.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-netconf-m1-l5",
      "slug": "netauto-apis-netconf-m1-l5",
      "title": "Building a get-config Request",
      "concept": "The get-config operation reads configuration from a chosen datastore, and a <filter> element limits the reply to one part of the configuration such as the interfaces subtree. A subtree filter names the elements to return, and the device replies with only the matching configuration. Without a filter, get-config returns the whole configuration, which can be very large on a real device.",
      "syntax": "<get-config><source><running/></source><filter type=\"subtree\"><interfaces/></filter></get-config>",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\nrpc = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": \"101\"})\nget = ET.SubElement(rpc, \"{%s}get-config\" % NS)\nsource = ET.SubElement(get, \"{%s}source\" % NS)\nET.SubElement(source, \"{%s}running\" % NS)\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
      "exampleLanguage": "python",
      "mistake": "Putting the <filter> outside <get-config>, where the device ignores it and returns the whole configuration.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building a get-config Request, but it does not work correctly.",
       "buggyCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nrpc = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": \"101\"})\nget = ET.SubElement(rpc, \"{%s}get-config\" % NS)\nET.SubElement(rpc, \"{%s}filter\" % NS, {\"type\": \"subtree\"})  # wrong parent\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
       "fixedCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nrpc = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": \"101\"})\nget = ET.SubElement(rpc, \"{%s}get-config\" % NS)\nET.SubElement(get, \"{%s}filter\" % NS, {\"type\": \"subtree\"})  # inside get-config\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
       "explanation": "A filter is only honoured as a child of get-config (or get); attached to the rpc element it is ignored and the device returns everything."
      },
      "exercise": {
       "title": "Practise Building a get-config Request",
       "type": "write-code",
       "instructions": "Build a get-config RPC (message-id 101) that reads <running> with a subtree filter for <interfaces>, and print the XML.",
       "starterCode": "# Build a get-config RPC for the running interfaces.\n# TODO: build the rpc element and print it.\n",
       "solution": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\nrpc = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": \"101\"})\nget = ET.SubElement(rpc, \"{%s}get-config\" % NS)\nsource = ET.SubElement(get, \"{%s}source\" % NS)\nET.SubElement(source, \"{%s}running\" % NS)\nfilt = ET.SubElement(get, \"{%s}filter\" % NS, {\"type\": \"subtree\"})\nET.SubElement(filt, \"{%s}interfaces\" % NS)\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "<rpc xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"101\"><get-config><source><running /></source><filter type=\"subtree\"><interfaces /></filter></get-config></rpc>",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "<rpc xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"101\"><get-config><source><running /></source><filter type=\"subtree\"><interfaces /></filter></get-config></rpc>",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The get-config operation reads configuration from a chosen datastore, and a <filter> element limits the reply to one part of the configuration such as the interfaces subtree. A subtree filter names the elements to return, and the device replies with only the matching configuration. Without a filter, get-config returns the whole configuration, which can be very large on a real device.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-netconf-m2",
    "title": "NETCONF Foundations in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-apis-netconf-m2-l1",
      "slug": "netauto-apis-netconf-m2-l1",
      "title": "Reading a Configuration Reply",
      "concept": "A get-config reply wraps the requested configuration in <data> inside the <rpc-reply>, using the same YANG-modelled element names as the request filter. The client walks the XML tree to find the values it needs, for example the name and description of each interface. Because the reply is structured XML, the client can extract exact values instead of guessing from CLI text.",
      "syntax": "root.findall('.//n:interface', NS)",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nNS = {\"n\": \"urn:ietf:params:xml:ns:netconf:base:1.0\"}\nreply = \"<rpc-reply><data><interfaces/></data></rpc-reply>\"\nroot = ET.fromstring(reply)\nprint(len(root.findall(\".//n:interface\", NS)), \"interfaces\")",
      "exampleLanguage": "python",
      "mistake": "Searching the reply with findall('interface') and no namespace map, which finds nothing in a namespaced document.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reading a Configuration Reply, but it does not work correctly.",
       "buggyCode": "import xml.etree.ElementTree as ET\n\nroot = ET.fromstring(\"<data><interface><name>eth0</name></interface></data>\")\nprint(root.find(\"interface/name\").text)",
       "fixedCode": "import xml.etree.ElementTree as ET\n\nNS = {\"n\": \"urn:ietf:params:xml:ns:netconf:base:1.0\"}\nroot = ET.fromstring('<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"><interface><name>eth0</name></interface></data>')\nprint(root.findtext(\"n:interface/n:name\", namespaces=NS))",
       "explanation": "Without the namespace map, find returns None for namespaced elements; the namespace must be declared and used in every path."
      },
      "exercise": {
       "title": "Practise Reading a Configuration Reply",
       "type": "write-code",
       "instructions": "Parse the sample get-config reply in the starter code and print each interface as 'name: description' on its own line.",
       "starterCode": "# Parse the sample reply and print each interface.\n# TODO: parse REPLY and print 'name: description' per interface.\nREPLY = \"\"\"<rpc-reply xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"101\">\n  <data>\n    <interfaces>\n      <interface><name>GigabitEthernet1</name><description>Uplink to core</description></interface>\n      <interface><name>GigabitEthernet2</name><description>Server segment</description></interface>\n    </interfaces>\n  </data>\n</rpc-reply>\"\"\"\n",
       "solution": "import xml.etree.ElementTree as ET\n\nREPLY = \"\"\"<rpc-reply xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"101\">\n  <data>\n    <interfaces>\n      <interface><name>GigabitEthernet1</name><description>Uplink to core</description></interface>\n      <interface><name>GigabitEthernet2</name><description>Server segment</description></interface>\n    </interfaces>\n  </data>\n</rpc-reply>\"\"\"\nNS = {\"n\": \"urn:ietf:params:xml:ns:netconf:base:1.0\"}\nroot = ET.fromstring(REPLY)\nfor iface in root.findall(\".//n:interface\", NS):\n    name = iface.findtext(\"n:name\", namespaces=NS)\n    desc = iface.findtext(\"n:description\", namespaces=NS)\n    print(name + \": \" + desc)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GigabitEthernet1: Uplink to core\nGigabitEthernet2: Server segment",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "GigabitEthernet1: Uplink to core\nGigabitEthernet2: Server segment",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A get-config reply wraps the requested configuration in <data> inside the <rpc-reply>, using the same YANG-modelled element names as the request filter. The client walks the XML tree to find the values it needs, for example the name and description of each interface. Because the reply is structured XML, the client can extract exact values instead of guessing from CLI text.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-netconf-m2-l2",
      "slug": "netauto-apis-netconf-m2-l2",
      "title": "edit-config and Operations",
      "concept": "The edit-config operation changes configuration in a target datastore, and each change carries an operation attribute such as merge, replace, create, delete, or remove. Merge is the default: it adds or updates the given elements and leaves everything else untouched. Delete removes the named element, while replace swaps the whole element, so choosing the wrong operation can remove configuration you meant to keep.",
      "syntax": "<edit-config><target><candidate/></target><config><interfaces><interface operation=\"merge\">...</interface></interfaces></config></edit-config>",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\nrpc = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": \"102\"})\nedit = ET.SubElement(rpc, \"{%s}edit-config\" % NS)\ntarget = ET.SubElement(edit, \"{%s}target\" % NS)\nET.SubElement(target, \"{%s}candidate\" % NS)\nconfig = ET.SubElement(edit, \"{%s}config\" % NS)\nifaces = ET.SubElement(config, \"{%s}interfaces\" % NS)\niface = ET.SubElement(ifaces, \"{%s}interface\" % NS, {\"operation\": \"merge\"})\nname = ET.SubElement(iface, \"{%s}name\" % NS)\nname.text = \"GigabitEthernet1\"\nprint(ET.tostring(rpc, encoding=\"unicode\"))",
      "exampleLanguage": "python",
      "mistake": "Using operation=\"replace\" on an interface when you only meant to change its description, which wipes the rest of the interface configuration.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate edit-config and Operations, but it does not work correctly.",
       "buggyCode": "config = \"<interface operation=\\\"replace\\\"><name>eth0</name><description>new</description></interface>\"",
       "fixedCode": "config = \"<interface operation=\\\"merge\\\"><name>eth0</name><description>new</description></interface>\"",
       "explanation": "Replace swaps the whole interface element, deleting settings not included in the new copy; merge only updates the elements you supply."
      },
      "exercise": {
       "title": "Check your understanding: edit-config and Operations",
       "type": "multiple-choice",
       "instructions": "Which statement about edit-config and Operations is correct?",
       "starterCode": "",
       "solution": "The edit-config operation changes configuration in a target datastore, and each change carries an operation attribute such as merge, replace, create, delete, or remove.",
       "solutionExplanation": "The edit-config operation changes configuration in a target datastore, and each change carries an operation attribute such as merge, replace, create, delete, or remove. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The edit-config operation changes configuration in a target datastore, and each change carries an operation attribute such as merge, replace, create, delete, or remove.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of edit-config and Operations from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The edit-config operation changes configuration in a target datastore, and each change carries an operation attribute such as merge, replace, create, delete, or remove.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-netconf-m2-l3",
      "slug": "netauto-apis-netconf-m2-l3",
      "title": "Locking and Candidate Datastore",
      "concept": "The lock operation takes an exclusive lock on a datastore so no other session can change it while you work, and unlock releases it again. The usual safe pattern is lock the candidate datastore, edit it, validate it, commit it to running, and then unlock it. A session that locks a datastore and disconnects without unlocking can leave the lock held until it times out, so always unlock in a finally block.",
      "syntax": "<lock><target><candidate/></target></lock>",
      "exampleCode": "# Safe change pattern (needs a lab device to run):\n# lock candidate -> edit-config candidate -> validate -> commit -> unlock\n# <rpc message-id=\"103\"><lock><target><candidate/></target></lock></rpc>",
      "exampleLanguage": "python",
      "mistake": "Locking the candidate datastore and then forgetting to unlock it when an error occurs, blocking every other session.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Locking and Candidate Datastore, but it does not work correctly.",
       "buggyCode": "try:\n    lock()\n    edit()\nfinally:\n    pass  # forgot unlock()",
       "fixedCode": "try:\n    lock()\n    edit()\nfinally:\n    unlock()  # always release the lock",
       "explanation": "A lock held by a crashed or forgotten session blocks other operators until it times out; releasing it in a finally block guarantees it is freed."
      },
      "exercise": {
       "title": "Check your understanding: Locking and Candidate Datastore",
       "type": "multiple-choice",
       "instructions": "Which statement about Locking and Candidate Datastore is correct?",
       "starterCode": "",
       "solution": "The lock operation takes an exclusive lock on a datastore so no other session can change it while you work, and unlock releases it again.",
       "solutionExplanation": "The lock operation takes an exclusive lock on a datastore so no other session can change it while you work, and unlock releases it again. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The lock operation takes an exclusive lock on a datastore so no other session can change it while you work, and unlock releases it again.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Locking and Candidate Datastore from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The lock operation takes an exclusive lock on a datastore so no other session can change it while you work, and unlock releases it again.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-netconf-m2-l4",
      "slug": "netauto-apis-netconf-m2-l4",
      "title": "Validating a NETCONF Message",
      "concept": "Before sending an RPC, a client can check that the message is well-formed XML, carries the NETCONF namespace, and has a message-id, because a device rejects malformed messages with an rpc-error. The validate operation goes further and asks the device to check a candidate configuration against its YANG models without applying it. Catching these problems locally saves a round trip and avoids leaving a device in a half-changed state.",
      "syntax": "ET.fromstring(rpc)  # ParseError means malformed XML",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nrpc = '<rpc message-id=\"201\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"><get-config/></rpc>'\nroot = ET.fromstring(rpc)\nprint(\"namespace ok:\", root.tag.startswith(\"{urn:ietf:params:xml:ns:netconf:base:1.0}\"))",
      "exampleLanguage": "python",
      "mistake": "Checking only that the XML parses, and never checking the namespace or message-id, so a message the device will reject passes local checks.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Validating a NETCONF Message, but it does not work correctly.",
       "buggyCode": "import xml.etree.ElementTree as ET\n\nroot = ET.fromstring(\"<rpc><get-config/></rpc>\")\nprint(\"valid\" if root.tag == \"rpc\" else \"invalid\")",
       "fixedCode": "import xml.etree.ElementTree as ET\n\nroot = ET.fromstring('<rpc message-id=\"1\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"><get-config/></rpc>')\nok = root.tag == \"{urn:ietf:params:xml:ns:netconf:base:1.0}rpc\" and root.get(\"message-id\")\nprint(\"valid\" if ok else \"invalid\")",
       "explanation": "A bare <rpc> without the NETCONF namespace or a message-id is not a valid NETCONF message; the check must verify namespace, message-id, and that an operation is present."
      },
      "exercise": {
       "title": "Practise Validating a NETCONF Message",
       "type": "write-code",
       "instructions": "Write a validator that parses the RPC string in the starter code, checks it is well-formed XML with the NETCONF namespace, a message-id, and an operation, and prints 'valid' or the problems found.",
       "starterCode": "# Validate the RPC string below.\n# TODO: parse RPC, check namespace, message-id and operation, print 'valid' or the errors.\nRPC = \"\"\"<rpc message-id=\"201\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n  <get-config><source><running/></source></get-config>\n</rpc>\"\"\"\n",
       "solution": "import xml.etree.ElementTree as ET\n\nRPC = \"\"\"<rpc message-id=\"201\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n  <get-config><source><running/></source></get-config>\n</rpc>\"\"\"\nerrors = []\ntry:\n    root = ET.fromstring(RPC)\nexcept ET.ParseError as e:\n    errors.append(\"not well-formed XML: \" + str(e))\nelse:\n    if root.tag != \"{urn:ietf:params:xml:ns:netconf:base:1.0}rpc\":\n        errors.append(\"missing NETCONF namespace on rpc\")\n    if not root.get(\"message-id\"):\n        errors.append(\"missing message-id\")\n    if len(root) == 0:\n        errors.append(\"rpc has no operation\")\nprint(\"valid\" if not errors else \"invalid: \" + \"; \".join(errors))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "valid",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "valid",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Before sending an RPC, a client can check that the message is well-formed XML, carries the NETCONF namespace, and has a message-id, because a device rejects malformed messages with an rpc-error. The validate operation goes further and asks the device to check a candidate configuration against its YANG models without applying it. Catching these problems locally saves a round trip and avoids leaving a device in a half-changed state.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-netconf-m2-l5",
      "slug": "netauto-apis-netconf-m2-l5",
      "title": "NETCONF in Real Operations",
      "concept": "In real operations NETCONF is used through a lab first: engineers practise against Containerlab or EVE-NG devices, or a real device with NETCONF enabled, before touching production. A production change follows the same safe pattern every time: lock, edit the candidate, validate, commit, verify with get-config, and unlock. Running NETCONF calls needs a lab or a real device, so this course teaches the message formats and checks them locally with Python instead of pretending to reach a device.",
      "syntax": "lock -> edit-config -> validate -> commit -> verify -> unlock",
      "exampleCode": "# Safe change checklist (run against a lab device only):\n# 1. lock candidate   2. edit-config   3. validate\n# 4. commit           5. get-config to verify   6. unlock",
      "exampleLanguage": "python",
      "mistake": "Practising a NETCONF change for the first time directly on a production device instead of in a lab.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate NETCONF in Real Operations, but it does not work correctly.",
       "buggyCode": "# first try on the production router\nedit_config(target=\"candidate\", config=new_config)",
       "fixedCode": "# first try on the Containerlab device\nedit_config(target=\"candidate\", config=new_config)  # lab only",
       "explanation": "A first attempt belongs in a lab (Containerlab or EVE-NG) where a mistake costs nothing; production changes come only after the workflow is proven."
      },
      "exercise": {
       "title": "Practise NETCONF in Real Operations",
       "type": "write-code",
       "instructions": "Print the six steps of the safe NETCONF change pattern in order, then print 'safe change complete' on the last line.",
       "starterCode": "# Print the safe change checklist.\n# TODO: print the six steps in order, then 'safe change complete'.\n",
       "solution": "steps = [\n    \"1. lock candidate\",\n    \"2. edit-config candidate\",\n    \"3. validate candidate\",\n    \"4. commit\",\n    \"5. get-config running to verify\",\n    \"6. unlock candidate\",\n]\nfor s in steps:\n    print(s)\nprint(\"safe change complete\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. lock candidate\n2. edit-config candidate\n3. validate candidate\n4. commit\n5. get-config running to verify\n6. unlock candidate\nsafe change complete",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "1. lock candidate\n2. edit-config candidate\n3. validate candidate\n4. commit\n5. get-config running to verify\n6. unlock candidate\nsafe change complete",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "In real operations NETCONF is used through a lab first: engineers practise against Containerlab or EVE-NG devices, or a real device with NETCONF enabled, before touching production. A production change follows the same safe pattern every time: lock, edit the candidate, validate, commit, verify with get-config, and unlock. Running NETCONF calls needs a lab or a real device, so this course teaches the message formats and checks them locally with Python instead of pretending to reach a device.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: NETCONF Foundations",
   "type": "write-code",
   "instructions": "Build the three RPCs of a safe NETCONF change: lock the candidate datastore (message-id 301), edit-config the description of GigabitEthernet1 in candidate (302), and commit (303). Print each RPC on its own line.",
   "starterCode": "# Build lock, edit-config and commit RPCs.\n# TODO: build the three RPCs and print each one.\n",
   "solution": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\n\n\ndef rpc(mid, op, body):\n    r = ET.Element(\"{%s}rpc\" % NS, {\"message-id\": str(mid)})\n    el = ET.SubElement(r, \"{%s}%s\" % (NS, op))\n    body(el)\n    return ET.tostring(r, encoding=\"unicode\")\n\n\ndef lock_body(el):\n    t = ET.SubElement(el, \"{%s}target\" % NS)\n    ET.SubElement(t, \"{%s}candidate\" % NS)\n\n\ndef edit_body(el):\n    t = ET.SubElement(el, \"{%s}target\" % NS)\n    ET.SubElement(t, \"{%s}candidate\" % NS)\n    cfg = ET.SubElement(el, \"{%s}config\" % NS)\n    ifaces = ET.SubElement(cfg, \"{%s}interfaces\" % NS)\n    iface = ET.SubElement(ifaces, \"{%s}interface\" % NS, {\"operation\": \"merge\"})\n    name = ET.SubElement(iface, \"{%s}name\" % NS)\n    name.text = \"GigabitEthernet1\"\n    desc = ET.SubElement(iface, \"{%s}description\" % NS)\n    desc.text = \"Uplink to core\"\n\n\nprint(rpc(301, \"lock\", lock_body))\nprint(rpc(302, \"edit-config\", edit_body))\nprint(rpc(303, \"commit\", lambda el: None))",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "<rpc xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"301\"><lock><target><candidate /></target></lock></rpc>\n<rpc xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"302\"><edit-config><target><candidate /></target><config><interfaces><interface operation=\"merge\"><name>GigabitEthernet1</name><description>Uplink to core</description></interface></interfaces></config></edit-config></rpc>\n<rpc xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"303\"><commit /></rpc>",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "<rpc xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"301\"><lock><target><candidate /></target></lock></rpc>\n<rpc xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"302\"><edit-config><target><candidate /></target><config><interfaces><interface operation=\"merge\"><name>GigabitEthernet1</name><description>Uplink to core</description></interface></interfaces></config></edit-config></rpc>\n<rpc xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" message-id=\"303\"><commit /></rpc>",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "NETCONF Foundations brings the whole track together: build the lock, edit-config and commit RPCs for a safe change.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "NETCONF Foundations Capstone Project",
   "description": "A small end-to-end project that puts NETCONF Foundations into practice.",
   "requirements": [
    "Build lock, edit-config and commit RPCs with the correct NETCONF namespace and message-ids.",
    "Apply at least three of these skills: RPC messages, Datastores, get-config, edit-config, Locking and candidate datastore.",
    "Validate each RPC locally before printing it: well-formed XML, namespace, message-id, operation.",
    "Label clearly that running these RPCs needs a lab device with NETCONF enabled."
   ],
   "rubric": [
    "The RPCs are well-formed XML with the NETCONF namespace and unique message-ids.",
    "The change follows the safe pattern: lock, edit candidate, commit.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-yang",
  "slug": "netauto-apis-yang",
  "language": "python",
  "category": "devops",
  "title": "YANG Models Explained",
  "description": "Learn yang models explained for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Beginner",
  "estimatedHours": 8,
  "skills": [
   "YANG syntax",
   "Modules and namespaces",
   "Leaves and leaf-lists",
   "Containers and lists",
   "Types and constraints",
   "Groupings",
   "RPCs and notifications",
   "Reading ietf-interfaces"
  ],
  "prerequisites": [
   "netauto-apis-netconf"
  ],
  "analogy": "Learning {topic} is like learning the blueprint of a house: once you can read the plan, you know exactly which rooms exist and what fits in each one.",
  "modules": [
   {
    "id": "netauto-apis-yang-m1",
    "title": "YANG Models Explained Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-yang-m1-l1",
      "slug": "netauto-apis-yang-m1-l1",
      "title": "What Is a YANG Model?",
      "concept": "YANG is a data modelling language defined in RFC 6020 that describes exactly what configuration and state a network device exposes, including the names, types, and structure of every value. A YANG model is a contract: if a leaf is defined as a string of a certain length, the device will only accept values that fit that definition. NETCONF, RESTCONF, and gNMI all use YANG models to agree on the shape of the data they exchange.",
      "syntax": "module example-interfaces {\n  namespace \"urn:example:interfaces\";\n  prefix ex-if;\n}",
      "exampleCode": "module example-interfaces {\n  namespace \"urn:example:interfaces\";\n  prefix ex-if;\n\n  container interfaces {\n    list interface {\n      key \"name\";\n      leaf name { type string; }\n    }\n  }\n}",
      "exampleLanguage": "python",
      "mistake": "Treating YANG as a programming language that runs code, instead of a modelling language that describes data.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is a YANG Model?, but it does not work correctly.",
       "buggyCode": "module broken {\n  leaf name { type string; }\n  print(name)  # YANG has no print statement\n}",
       "fixedCode": "module fixed {\n  leaf name { type string; }\n  leaf description { type string; }\n}",
       "explanation": "YANG describes data, it does not execute statements; a leaf definition is a declaration of a value, not a line of code that runs."
      },
      "exercise": {
       "title": "Practise What Is a YANG Model?",
       "type": "write-code",
       "instructions": "Represent a YANG module header as a Python dictionary with name, namespace, prefix and revision, then print each field on its own labelled line.",
       "starterCode": "# Represent a YANG module header as a dict.\n# TODO: build the dict and print its fields.\n",
       "solution": "module = {\n    \"name\": \"example-interfaces\",\n    \"namespace\": \"urn:example:interfaces\",\n    \"prefix\": \"ex-if\",\n    \"revision\": \"2026-11-24\",\n}\nprint(\"module:\", module[\"name\"])\nprint(\"namespace:\", module[\"namespace\"])\nprint(\"prefix:\", module[\"prefix\"])\nprint(\"revision:\", module[\"revision\"])",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "module: example-interfaces\nnamespace: urn:example:interfaces\nprefix: ex-if\nrevision: 2026-11-24",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "module: example-interfaces\nnamespace: urn:example:interfaces\nprefix: ex-if\nrevision: 2026-11-24",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "YANG is a data modelling language defined in RFC 6020 that describes exactly what configuration and state a network device exposes, including the names, types, and structure of every value. A YANG model is a contract: if a leaf is defined as a string of a certain length, the device will only accept values that fit that definition. NETCONF, RESTCONF, and gNMI all use YANG models to agree on the shape of the data they exchange.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-yang-m1-l2",
      "slug": "netauto-apis-yang-m1-l2",
      "title": "Modules, Namespaces and Prefixes",
      "concept": "Every YANG module starts with a header naming the module, its namespace, and its prefix, and the namespace is a globally unique URI that keeps names from different modules apart. The prefix is the short label used in front of names when the module is referenced, for example if:interfaces. Two modules can both define a leaf called name, but their different namespaces mean the names never collide.",
      "syntax": "module ietf-interfaces {\n  namespace \"urn:ietf:params:xml:ns:yang:ietf-interfaces\";\n  prefix if;\n}",
      "exampleCode": "module ietf-interfaces {\n  namespace \"urn:ietf:params:xml:ns:yang:ietf-interfaces\";\n  prefix if;\n  revision 2018-02-20;\n}",
      "exampleLanguage": "python",
      "mistake": "Using the same prefix for two different modules in one document, so references become ambiguous.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Modules, Namespaces and Prefixes, but it does not work correctly.",
       "buggyCode": "prefix if;  # ietf-interfaces\nprefix if;  # my-interfaces -- same prefix, different module",
       "fixedCode": "prefix if;   # ietf-interfaces\nprefix my;  # my-interfaces -- each module gets its own prefix",
       "explanation": "A prefix is the short name for one module's namespace; reusing it for another module makes it impossible to tell which module a name belongs to."
      },
      "exercise": {
       "title": "Practise Modules, Namespaces and Prefixes",
       "type": "write-code",
       "instructions": "Print the module name with its prefix, then the namespace, then whether the namespace starts with the IETF YANG prefix.",
       "starterCode": "# Print module, prefix and namespace details.\n# TODO: print the three lines from the header dict.\nheader = {\"module\": \"ietf-interfaces\", \"namespace\": \"urn:ietf:params:xml:ns:yang:ietf-interfaces\", \"prefix\": \"if\"}\n",
       "solution": "header = {\"module\": \"ietf-interfaces\", \"namespace\": \"urn:ietf:params:xml:ns:yang:ietf-interfaces\", \"prefix\": \"if\"}\nprint(header[\"module\"] + \" uses prefix \" + header[\"prefix\"])\nprint(\"namespace: \" + header[\"namespace\"])\nprint(\"unique:\", header[\"namespace\"].startswith(\"urn:ietf:params:xml:ns:yang:\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ietf-interfaces uses prefix if\nnamespace: urn:ietf:params:xml:ns:yang:ietf-interfaces\nunique: True",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "ietf-interfaces uses prefix if\nnamespace: urn:ietf:params:xml:ns:yang:ietf-interfaces\nunique: True",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Every YANG module starts with a header naming the module, its namespace, and its prefix, and the namespace is a globally unique URI that keeps names from different modules apart. The prefix is the short label used in front of names when the module is referenced, for example if:interfaces. Two modules can both define a leaf called name, but their different namespaces mean the names never collide.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-yang-m1-l3",
      "slug": "netauto-apis-yang-m1-l3",
      "title": "Leaves and Leaf-Lists",
      "concept": "A leaf is a single value in a YANG model, such as an interface name or an MTU number, and it has exactly one type. A leaf-list is an ordered list of values of the same type, such as the list of DNS servers on a device. A leaf holds one value and a leaf-list holds many, and confusing the two is one of the most common modelling mistakes.",
      "syntax": "leaf name { type string; }\nleaf-list dns-server { type string; }",
      "exampleCode": "leaf name { type string; }\nleaf enabled { type boolean; default true; }\nleaf-list dns-server { type inet:ip-address; }",
      "exampleLanguage": "python",
      "mistake": "Modelling a value that can repeat, like DNS servers, as a single leaf instead of a leaf-list.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Leaves and Leaf-Lists, but it does not work correctly.",
       "buggyCode": "leaf dns-server { type string; }  # only one server fits",
       "fixedCode": "leaf-list dns-server { type string; }  # as many servers as needed",
       "explanation": "A leaf holds exactly one value, so a second DNS server would overwrite the first; a leaf-list is designed to hold many values of the same type."
      },
      "exercise": {
       "title": "Check your understanding: Leaves and Leaf-Lists",
       "type": "multiple-choice",
       "instructions": "Which statement about Leaves and Leaf-Lists is correct?",
       "starterCode": "",
       "solution": "A leaf is a single value in a YANG model, such as an interface name or an MTU number, and it has exactly one type.",
       "solutionExplanation": "A leaf is a single value in a YANG model, such as an interface name or an MTU number, and it has exactly one type. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A leaf is a single value in a YANG model, such as an interface name or an MTU number, and it has exactly one type.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Leaves and Leaf-Lists from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A leaf is a single value in a YANG model, such as an interface name or an MTU number, and it has exactly one type.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-yang-m1-l4",
      "slug": "netauto-apis-yang-m1-l4",
      "title": "Containers and Lists",
      "concept": "A container groups related nodes under one name without adding a value of its own, for example an interfaces container holding the interface list. A list is a container-like node with many entries, each identified by a key leaf, such as the interface list keyed by name. Containers organise the tree, lists hold the repeating entries, and the key leaf is what makes each list entry addressable.",
      "syntax": "container interfaces {\n  list interface {\n    key \"name\";\n  }\n}",
      "exampleCode": "container interfaces {\n  list interface {\n    key \"name\";\n    leaf name { type string; }\n    leaf enabled { type boolean; }\n  }\n}",
      "exampleLanguage": "python",
      "mistake": "Forgetting the key statement on a list, so entries cannot be addressed or distinguished from each other.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Containers and Lists, but it does not work correctly.",
       "buggyCode": "list interface {\n  leaf name { type string; }\n}  # no key: entries cannot be addressed",
       "fixedCode": "list interface {\n  key \"name\";\n  leaf name { type string; }\n}  # key \"name\" identifies each entry",
       "explanation": "A list without a key has no way to name one entry, so NETCONF and RESTCONF cannot address, update, or delete a single entry."
      },
      "exercise": {
       "title": "Check your understanding: Containers and Lists",
       "type": "multiple-choice",
       "instructions": "Which statement about Containers and Lists is correct?",
       "starterCode": "",
       "solution": "A container groups related nodes under one name without adding a value of its own, for example an interfaces container holding the interface list.",
       "solutionExplanation": "A container groups related nodes under one name without adding a value of its own, for example an interfaces container holding the interface list. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A container groups related nodes under one name without adding a value of its own, for example an interfaces container holding the interface list.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Containers and Lists from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A container groups related nodes under one name without adding a value of its own, for example an interfaces container holding the interface list.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-yang-m1-l5",
      "slug": "netauto-apis-yang-m1-l5",
      "title": "Types and Constraints in YANG",
      "concept": "YANG leaf types carry constraints, such as a uint32 that must be between 0 and 4294967295, a string with a length range, or a pattern that a value must match. A leaf can also be mandatory, have a default value, or be restricted to a fixed set of values with an enumeration. These constraints are enforced when data is validated, so bad values are rejected before they ever reach the device.",
      "syntax": "leaf mtu { type uint16 { range \"68..65535\"; } }",
      "exampleCode": "leaf mtu { type uint16 { range \"68..65535\"; } }\nleaf hostname { type string { length \"1..64\"; } }\nleaf mode { type enumeration { enum access; enum trunk; } }",
      "exampleLanguage": "python",
      "mistake": "Assuming a leaf accepts any value because its type is string, and ignoring the length or pattern constraint on it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Types and Constraints in YANG, but it does not work correctly.",
       "buggyCode": "def check_hostname(value):\n    return isinstance(value, str)  # ignores the 1..64 length rule",
       "fixedCode": "def check_hostname(value):\n    return isinstance(value, str) and 1 <= len(value) <= 64",
       "explanation": "A YANG string leaf usually carries a length or pattern constraint; checking only the type lets illegal values through to the device."
      },
      "exercise": {
       "title": "Practise Types and Constraints in YANG",
       "type": "write-code",
       "instructions": "Write two checker functions, one for a uint32 range and one for a string length range, and print the results for a valid and an invalid value of each.",
       "starterCode": "# Write checkers for a uint32 and a length-limited string.\n# TODO: define the checkers and print four results.\n",
       "solution": "def check_uint32(value):\n    return isinstance(value, int) and 0 <= value <= 4294967295\n\n\ndef check_string(value, min_len, max_len):\n    return isinstance(value, str) and min_len <= len(value) <= max_len\n\n\nprint(\"mtu 1500:\", check_uint32(1500))\nprint(\"mtu -1:\", check_uint32(-1))\nprint(\"name 'eth0':\", check_string(\"eth0\", 1, 64))\nprint(\"name '':\", check_string(\"\", 1, 64))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "mtu 1500: True\nmtu -1: False\nname 'eth0': True\nname '': False",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "mtu 1500: True\nmtu -1: False\nname 'eth0': True\nname '': False",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "YANG leaf types carry constraints, such as a uint32 that must be between 0 and 4294967295, a string with a length range, or a pattern that a value must match. A leaf can also be mandatory, have a default value, or be restricted to a fixed set of values with an enumeration. These constraints are enforced when data is validated, so bad values are rejected before they ever reach the device.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-yang-m2",
    "title": "YANG Models Explained in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-apis-yang-m2-l1",
      "slug": "netauto-apis-yang-m2-l1",
      "title": "Groupings and Reuse",
      "concept": "A YANG grouping is a reusable bundle of nodes that can be included in several places with the uses statement, so the same structure is defined once and shared. Groupings keep large models readable and stop the same leaf definitions from being copied and pasted in many places. When a grouping is used, its nodes appear in the using container exactly as if they had been written there directly.",
      "syntax": "grouping address {\n  leaf ip { type string; }\n}\nuses address;",
      "exampleCode": "grouping address {\n  leaf ip { type string; }\n  leaf prefix-length { type uint8; }\n}\ncontainer management { uses address; }\ncontainer loopback { uses address; }",
      "exampleLanguage": "python",
      "mistake": "Copying the same leaves into ten places instead of defining a grouping once and using it everywhere.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Groupings and Reuse, but it does not work correctly.",
       "buggyCode": "container a { leaf ip { type string; } }\ncontainer b { leaf ip { type string; } }  # copied, drifts apart",
       "fixedCode": "grouping address { leaf ip { type string; } }\ncontainer a { uses address; }\ncontainer b { uses address; }  # one definition",
       "explanation": "Copied definitions drift apart when one copy is updated and the other is not; a grouping defines the structure once and every use stays identical."
      },
      "exercise": {
       "title": "Practise Groupings and Reuse",
       "type": "write-code",
       "instructions": "Model a YANG grouping as a dict of leaf names to types, apply it to an interface dict, and print the resulting fields.",
       "starterCode": "# Apply a grouping dict to an interface dict.\n# TODO: merge the grouping into the interface and print the fields.\n",
       "solution": "grouping = {\"address\": \"string\", \"prefix-length\": \"uint8\"}\ninterface = {\"name\": \"eth0\", \"enabled\": True}\ninterface.update(grouping)\nprint(\"interface:\", interface[\"name\"])\nprint(\"address type:\", interface[\"address\"])\nprint(\"prefix-length type:\", interface[\"prefix-length\"])\nprint(\"enabled:\", interface[\"enabled\"])",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interface: eth0\naddress type: string\nprefix-length type: uint8\nenabled: True",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "interface: eth0\naddress type: string\nprefix-length type: uint8\nenabled: True",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A YANG grouping is a reusable bundle of nodes that can be included in several places with the uses statement, so the same structure is defined once and shared. Groupings keep large models readable and stop the same leaf definitions from being copied and pasted in many places. When a grouping is used, its nodes appear in the using container exactly as if they had been written there directly.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-yang-m2-l2",
      "slug": "netauto-apis-yang-m2-l2",
      "title": "RPCs and Notifications in YANG",
      "concept": "A YANG rpc statement defines an operation a client can call, with input and output parameters, such as a ping operation that takes a destination and returns the result. A notification defines an event the device can send without being asked, such as an interface going down. RPCs are client-initiated calls and notifications are device-initiated events, and both are defined in the model so clients know their exact shape.",
      "syntax": "rpc ping {\n  input { leaf destination { type string; } }\n  output { leaf result { type string; } }\n}",
      "exampleCode": "rpc ping {\n  input { leaf destination { type string; } }\n  output { leaf result { type string; } }\n}\nnotification interface-down {\n  leaf interface-name { type string; }\n}",
      "exampleLanguage": "python",
      "mistake": "Modelling an event like interface-down as an rpc, which a client would have to call instead of receiving when it happens.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate RPCs and Notifications in YANG, but it does not work correctly.",
       "buggyCode": "rpc interface-down {  # wrong: events are not calls\n  input { leaf interface-name { type string; } }\n}",
       "fixedCode": "notification interface-down {  # right: the device sends it\n  leaf interface-name { type string; }\n}",
       "explanation": "An rpc is something a client calls; an event the device sends on its own is a notification, and modelling it as an rpc means nobody ever receives it."
      },
      "exercise": {
       "title": "Check your understanding: RPCs and Notifications in YANG",
       "type": "multiple-choice",
       "instructions": "Which statement about RPCs and Notifications in YANG is correct?",
       "starterCode": "",
       "solution": "A YANG rpc statement defines an operation a client can call, with input and output parameters, such as a ping operation that takes a destination and returns the result.",
       "solutionExplanation": "A YANG rpc statement defines an operation a client can call, with input and output parameters, such as a ping operation that takes a destination and returns the result. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A YANG rpc statement defines an operation a client can call, with input and output parameters, such as a ping operation that takes a destination and returns the result.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of RPCs and Notifications in YANG from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A YANG rpc statement defines an operation a client can call, with input and output parameters, such as a ping operation that takes a destination and returns the result.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-yang-m2-l3",
      "slug": "netauto-apis-yang-m2-l3",
      "title": "Augment and Deviation",
      "concept": "The augment statement adds new nodes to a model defined by someone else, for example adding a vendor-specific leaf to the standard ietf-interfaces model without editing the original file. A deviation records that a device does not fully implement a model, for example by marking a leaf as not-supported. Augment extends a model and deviation documents where a device differs from it, and both keep the original model untouched.",
      "syntax": "augment \"/if:interfaces/if:interface\" {\n  leaf vendor-id { type string; }\n}",
      "exampleCode": "augment \"/if:interfaces/if:interface\" {\n  leaf vendor-id { type string; }\n}\ndeviation \"/if:interfaces/if:interface/if:enabled\" {\n  deviate not-supported;\n}",
      "exampleLanguage": "python",
      "mistake": "Editing the standard ietf-interfaces file to add a vendor leaf, instead of augmenting it from a separate module.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Augment and Deviation, but it does not work correctly.",
       "buggyCode": "# edited ietf-interfaces.yang directly -- breaks on upgrade\nleaf vendor-id { type string; }",
       "fixedCode": "# separate vendor module augments the standard model\naugment \"/if:interfaces/if:interface\" {\n  leaf vendor-id { type string; }\n}",
       "explanation": "Editing a standard model means the change is lost on the next model update; an augment in a separate module survives upgrades and keeps the standard file intact."
      },
      "exercise": {
       "title": "Check your understanding: Augment and Deviation",
       "type": "multiple-choice",
       "instructions": "Which statement about Augment and Deviation is correct?",
       "starterCode": "",
       "solution": "The augment statement adds new nodes to a model defined by someone else, for example adding a vendor-specific leaf to the standard ietf-interfaces model without editing the original file.",
       "solutionExplanation": "The augment statement adds new nodes to a model defined by someone else, for example adding a vendor-specific leaf to the standard ietf-interfaces model without editing the original file. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The augment statement adds new nodes to a model defined by someone else, for example adding a vendor-specific leaf to the standard ietf-interfaces model without editing the original file.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Augment and Deviation from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The augment statement adds new nodes to a model defined by someone else, for example adding a vendor-specific leaf to the standard ietf-interfaces model without editing the original file.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-yang-m2-l4",
      "slug": "netauto-apis-yang-m2-l4",
      "title": "Reading the ietf-interfaces Model",
      "concept": "The ietf-interfaces model is the standard YANG model for network interfaces, and it defines a list of interfaces where each entry has a name, a type, and an enabled leaf, plus statistics in its state data. Because it is a standard model, the same interface configuration works across vendors that implement it, instead of each vendor inventing its own layout. Learning to read ietf-interfaces is the fastest way to read real device configuration.",
      "syntax": "list interface {\n  key \"name\";\n  leaf name { type string; }\n  leaf type { type identityref; }\n  leaf enabled { type boolean; }\n}",
      "exampleCode": "list interface {\n  key \"name\";\n  leaf name { type string; }\n  leaf description { type string; }\n  leaf type { type identityref; }\n  leaf enabled { type boolean; default true; }\n  leaf mtu { type uint16; }\n}",
      "exampleLanguage": "python",
      "mistake": "Reading the interface name as the key and the type as a plain string, when type is an identityref that only accepts defined interface types.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reading the ietf-interfaces Model, but it does not work correctly.",
       "buggyCode": "{\"name\": \"eth0\", \"type\": \"anything-goes\"}  # not a real identity",
       "fixedCode": "{\"name\": \"eth0\", \"type\": \"ethernetCsmacd\"}  # a defined identity",
       "explanation": "The type leaf is an identityref, so only identities defined in the model (like ethernetCsmacd) are legal; an arbitrary string is rejected by validation."
      },
      "exercise": {
       "title": "Practise Reading the ietf-interfaces Model",
       "type": "write-code",
       "instructions": "Given a list of interface dicts with name, type and enabled fields, print each one as 'name (type): up' or 'name (type): down'.",
       "starterCode": "# Print each interface with its state.\n# TODO: loop over interfaces and print name, type and up/down.\ninterfaces = [\n    {\"name\": \"GigabitEthernet1\", \"type\": \"ethernetCsmacd\", \"enabled\": True},\n    {\"name\": \"GigabitEthernet2\", \"type\": \"ethernetCsmacd\", \"enabled\": False},\n    {\"name\": \"Loopback0\", \"type\": \"softwareLoopback\", \"enabled\": True},\n]\n",
       "solution": "interfaces = [\n    {\"name\": \"GigabitEthernet1\", \"type\": \"ethernetCsmacd\", \"enabled\": True},\n    {\"name\": \"GigabitEthernet2\", \"type\": \"ethernetCsmacd\", \"enabled\": False},\n    {\"name\": \"Loopback0\", \"type\": \"softwareLoopback\", \"enabled\": True},\n]\nfor iface in interfaces:\n    state = \"up\" if iface[\"enabled\"] else \"down\"\n    print(iface[\"name\"] + \" (\" + iface[\"type\"] + \"): \" + state)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GigabitEthernet1 (ethernetCsmacd): up\nGigabitEthernet2 (ethernetCsmacd): down\nLoopback0 (softwareLoopback): up",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "GigabitEthernet1 (ethernetCsmacd): up\nGigabitEthernet2 (ethernetCsmacd): down\nLoopback0 (softwareLoopback): up",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The ietf-interfaces model is the standard YANG model for network interfaces, and it defines a list of interfaces where each entry has a name, a type, and an enabled leaf, plus statistics in its state data. Because it is a standard model, the same interface configuration works across vendors that implement it, instead of each vendor inventing its own layout. Learning to read ietf-interfaces is the fastest way to read real device configuration.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-yang-m2-l5",
      "slug": "netauto-apis-yang-m2-l5",
      "title": "YANG as a Contract",
      "concept": "A YANG model is a contract between the device and the automation that talks to it: both sides agree on names, types, and constraints before any configuration is exchanged. Reading a model tells you what you can configure, what values are legal, and what state you can read back. When a model changes, the contract changes, so models are versioned with revision dates and old revisions are kept for compatibility.",
      "syntax": "revision 2018-02-20;\n// a new revision keeps old names working",
      "exampleCode": "module ietf-interfaces {\n  namespace \"urn:ietf:params:xml:ns:yang:ietf-interfaces\";\n  prefix if;\n  revision 2018-02-20 { description \"Latest revision.\"; }\n}",
      "exampleLanguage": "python",
      "mistake": "Changing a leaf name in a new revision without keeping the old name, which breaks every client that used it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate YANG as a Contract, but it does not work correctly.",
       "buggyCode": "revision 2026-01-01 {\n  # renamed leaf \"name\" to \"if-name\" -- breaks all clients\n}",
       "fixedCode": "revision 2026-01-01 {\n  # leaf \"name\" kept; new leaves added alongside it\n}",
       "explanation": "A model is a contract: renaming a leaf breaks every client that agreed to the old name, so revisions add rather than rename."
      },
      "exercise": {
       "title": "Practise YANG as a Contract",
       "type": "write-code",
       "instructions": "Print the five lines of the ietf-interfaces contract summary, then print 'contract agreed' on the last line.",
       "starterCode": "# Print the contract summary lines.\n# TODO: print each contract line, then 'contract agreed'.\n",
       "solution": "contract = [\n    \"model: ietf-interfaces\",\n    \"revision: 2018-02-20\",\n    \"leaf name: string, mandatory\",\n    \"leaf enabled: boolean, default true\",\n    \"leaf mtu: uint16, range 68..65535\",\n]\nfor line in contract:\n    print(line)\nprint(\"contract agreed\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "model: ietf-interfaces\nrevision: 2018-02-20\nleaf name: string, mandatory\nleaf enabled: boolean, default true\nleaf mtu: uint16, range 68..65535\ncontract agreed",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "model: ietf-interfaces\nrevision: 2018-02-20\nleaf name: string, mandatory\nleaf enabled: boolean, default true\nleaf mtu: uint16, range 68..65535\ncontract agreed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A YANG model is a contract between the device and the automation that talks to it: both sides agree on names, types, and constraints before any configuration is exchanged. Reading a model tells you what you can configure, what values are legal, and what state you can read back. When a model changes, the contract changes, so models are versioned with revision dates and old revisions are kept for compatibility.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: YANG Models Explained",
   "type": "write-code",
   "instructions": "Model a small device in Python: a module header plus two containers (system with hostname and contact leaves, interfaces with an interface list of name, enabled and mtu). Print the module, namespace, each container's leaves, and the total leaf count.",
   "starterCode": "# Model a small device in YANG terms.\n# TODO: build the model dict and print the summary.\n",
   "solution": "model = {\n    \"module\": \"example-device\",\n    \"namespace\": \"urn:example:device\",\n    \"prefix\": \"ex\",\n    \"containers\": {\n        \"system\": {\"hostname\": \"string\", \"contact\": \"string\"},\n        \"interfaces\": {\"interface\": [\"name\", \"enabled\", \"mtu\"]},\n    },\n}\nprint(\"module:\", model[\"module\"])\nprint(\"namespace:\", model[\"namespace\"])\nfor container, nodes in model[\"containers\"].items():\n    if isinstance(nodes, dict):\n        print(container + \": \" + \", \".join(nodes))\n    else:\n        print(container + \": \" + \", \".join(nodes[\"interface\"]))\nprint(\"leaves defined:\", 5)",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "module: example-device\nnamespace: urn:example:device\nsystem: hostname, contact\ninterfaces: interface\nleaves defined: 5",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "module: example-device\nnamespace: urn:example:device\nsystem: hostname, contact\ninterfaces: interface\nleaves defined: 5",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "YANG Models Explained brings the whole track together: model a device as a module with containers, lists and leaves.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "YANG Models Explained Capstone Project",
   "description": "A small end-to-end project that puts YANG Models Explained into practice.",
   "requirements": [
    "Model a device as a module with a namespace, prefix, containers, a list and typed leaves.",
    "Apply at least three of these skills: Modules and namespaces, Leaves and leaf-lists, Containers and lists, Types and constraints.",
    "Include a key on the interface list and a range constraint on the MTU leaf.",
    "Print a readable summary of the model that a teammate could check against the real device."
   ],
   "rubric": [
    "The model has a module header, containers, a keyed list and typed leaves.",
    "Constraints are stated and checked, not just described.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-ncclient",
  "slug": "netauto-apis-ncclient",
  "language": "python",
  "category": "devops",
  "title": "ncclient in Practice",
  "description": "Learn ncclient in practice for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "ncclient",
   "manager.connect",
   "get-config filters",
   "edit-config",
   "RPCError handling",
   "Lock and commit",
   "copy-config",
   "Parsing NETCONF replies"
  ],
  "prerequisites": [
   "netauto-apis-netconf",
   "netauto-apis-yang"
  ],
  "analogy": "Learning {topic} is like learning to drive with an instructor: the library handles the gears and the pedals, and you focus on steering the change safely.",
  "modules": [
   {
    "id": "netauto-apis-ncclient-m1",
    "title": "ncclient in Practice Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-ncclient-m1-l1",
      "slug": "netauto-apis-ncclient-m1-l1",
      "title": "What Is ncclient?",
      "concept": "ncclient is a Python library that implements the NETCONF client side: it opens the SSH session, exchanges <hello> messages, and sends and receives RPCs for you. Instead of building XML by hand, you call methods like get_config, edit_config, and commit, and ncclient turns them into the right RPC documents. Running ncclient needs a lab device or a real device with NETCONF enabled, so in this course the connection calls are shown as examples and the message building is practised locally.",
      "syntax": "manager.connect(host=..., port=830, username=..., password=..., device_params={\"name\": \"iosxe\"})",
      "exampleCode": "# ncclient wraps NETCONF in Python method calls.\n# ncclient manager.connect -- needs a lab device to run:\n# with manager.connect(host=\"192.0.2.1\", port=830,\n#                      username=\"netconf-user\", password=\"...\",\n#                      hostkey_verify=False,\n#                      device_params={\"name\": \"iosxe\"}) as m:\n#     print(m.get_config(source=\"running\").data_xml)\n# Running this needs a lab device with NETCONF enabled.",
      "exampleLanguage": "python",
      "mistake": "Importing ncclient and calling manager.connect with no host, expecting it to find a device on its own.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is ncclient?, but it does not work correctly.",
       "buggyCode": "m = manager_connect()  # no host, no credentials (ncclient call)",
       "fixedCode": "m = manager_connect(host=\"192.0.2.1\", port=830,\n                    username=\"netconf-user\", password=\"lab-password\",\n                    hostkey_verify=False,\n                    device_params={\"name\": \"iosxe\"})  # ncclient call",
       "explanation": "manager.connect needs the device address, credentials, and device type; with no arguments it has nowhere to connect and no way to log in."
      },
      "exercise": {
       "title": "Practise What Is ncclient?",
       "type": "write-code",
       "instructions": "Build a dict of ncclient connection parameters (host 192.0.2.1, port 830, username netconf-user, hostkey_verify False, device iosxe) and print each field on its own labelled line.",
       "starterCode": "# Build the ncclient connection parameters.\n# TODO: build the params dict and print its fields.\n",
       "solution": "params = {\n    \"host\": \"192.0.2.1\",\n    \"port\": 830,\n    \"username\": \"netconf-user\",\n    \"hostkey_verify\": False,\n    \"device_params\": {\"name\": \"iosxe\"},\n}\nprint(\"host:\", params[\"host\"])\nprint(\"port:\", params[\"port\"])\nprint(\"username:\", params[\"username\"])\nprint(\"device:\", params[\"device_params\"][\"name\"])",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "host: 192.0.2.1\nport: 830\nusername: netconf-user\ndevice: iosxe",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "host: 192.0.2.1\nport: 830\nusername: netconf-user\ndevice: iosxe",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "ncclient is a Python library that implements the NETCONF client side: it opens the SSH session, exchanges <hello> messages, and sends and receives RPCs for you. Instead of building XML by hand, you call methods like get_config, edit_config, and commit, and ncclient turns them into the right RPC documents. Running ncclient needs a lab device or a real device with NETCONF enabled, so in this course the connection calls are shown as examples and the message building is practised locally.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-ncclient-m1-l2",
      "slug": "netauto-apis-ncclient-m1-l2",
      "title": "Connecting with manager.connect",
      "concept": "The ncclient manager.connect call opens a NETCONF session, and it takes the device host, port 830, username, password, and device_params naming the device type. The call returns a manager object whose methods send RPCs, and the session must be closed when the work is done, usually with a with statement so it closes even on error. The hostkey_verify setting controls whether the device SSH host key is checked, and it should only be disabled in a lab.",
      "syntax": "manager.connect(host=..., port=830, username=..., password=..., device_params={\"name\": \"iosxe\"})",
      "exampleCode": "# Display only -- needs a lab device to run:\n# ncclient manager.connect -- needs a lab device to run:\n# with manager.connect(host=\"192.0.2.1\", port=830,\n#                      username=\"netconf-user\", password=\"lab-password\",\n#                      hostkey_verify=False,\n#                      device_params={\"name\": \"iosxe\"},\n#                      timeout=30) as m:\n#     print(\"session-id:\", m.session_id)\n#     print(\"server capabilities:\", m.server_capabilities)",
      "exampleLanguage": "python",
      "mistake": "Disabling hostkey_verify in production because it is convenient, instead of only in a lab.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Connecting with manager.connect, but it does not work correctly.",
       "buggyCode": "manager.connect(host=\"192.0.2.1\", hostkey_verify=False)  # production",
       "fixedCode": "manager.connect(host=\"192.0.2.1\", hostkey_verify=True)  # production",
       "explanation": "hostkey_verify=False skips checking the device identity, which is acceptable in a lab but lets an attacker impersonate the device in production."
      },
      "exercise": {
       "title": "Practise Connecting with manager.connect",
       "type": "write-code",
       "instructions": "Build the manager.connect keyword arguments as a dict (host, port 830, username, password, hostkey_verify False, device iosxe, timeout 30) and print the five fields in order.",
       "starterCode": "# Build the manager.connect arguments.\n# TODO: build the dict and print host, port, username, device_params and timeout.\n",
       "solution": "connect_kwargs = {\n    \"host\": \"192.0.2.1\",\n    \"port\": 830,\n    \"username\": \"netconf-user\",\n    \"password\": \"lab-password\",\n    \"hostkey_verify\": False,\n    \"device_params\": {\"name\": \"iosxe\"},\n    \"timeout\": 30,\n}\nfor key in [\"host\", \"port\", \"username\", \"device_params\", \"timeout\"]:\n    print(key + \": \" + str(connect_kwargs[key]))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "host: 192.0.2.1\nport: 830\nusername: netconf-user\ndevice_params: {'name': 'iosxe'}\ntimeout: 30",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "host: 192.0.2.1\nport: 830\nusername: netconf-user\ndevice_params: {'name': 'iosxe'}\ntimeout: 30",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The ncclient manager.connect call opens a NETCONF session, and it takes the device host, port 830, username, password, and device_params naming the device type. The call returns a manager object whose methods send RPCs, and the session must be closed when the work is done, usually with a with statement so it closes even on error. The hostkey_verify setting controls whether the device SSH host key is checked, and it should only be disabled in a lab.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-ncclient-m1-l3",
      "slug": "netauto-apis-ncclient-m1-l3",
      "title": "get-config with a Filter",
      "concept": "The ncclient get_config method reads configuration from a source datastore, and passing a filter argument limits the reply to one subtree. A filter is given as a tuple of ('subtree', filter_xml) or ('xpath', xpath_string), and the method returns an object whose data_xml holds the reply. Filtering on the device side is faster than fetching the whole configuration and searching it locally.",
      "syntax": "m.get_config(source=\"running\", filter=(\"subtree\", \"<interfaces/>\"))",
      "exampleCode": "# Display only -- needs a lab device to run:\n# reply = m.get_config(source=\"running\",\n#                      filter=(\"subtree\", \"<interfaces/>\"))\n# print(reply.data_xml)",
      "exampleLanguage": "python",
      "mistake": "Passing the filter as a plain string instead of a ('subtree', xml) tuple, so ncclient sends no filter at all.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate get-config with a Filter, but it does not work correctly.",
       "buggyCode": "reply = m.get_config(source=\"running\", filter=\"<interfaces/>\")",
       "fixedCode": "reply = m.get_config(source=\"running\",\n                     filter=(\"subtree\", \"<interfaces/>\"))",
       "explanation": "ncclient expects the filter as a tuple naming the filter type and the XML; a bare string is not recognised as a filter and the whole configuration is returned."
      },
      "exercise": {
       "title": "Check your understanding: get-config with a Filter",
       "type": "multiple-choice",
       "instructions": "Which statement about get-config with a Filter is correct?",
       "starterCode": "",
       "solution": "The ncclient get_config method reads configuration from a source datastore, and passing a filter argument limits the reply to one subtree.",
       "solutionExplanation": "The ncclient get_config method reads configuration from a source datastore, and passing a filter argument limits the reply to one subtree. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The ncclient get_config method reads configuration from a source datastore, and passing a filter argument limits the reply to one subtree.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of get-config with a Filter from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The ncclient get_config method reads configuration from a source datastore, and passing a filter argument limits the reply to one subtree.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-ncclient-m1-l4",
      "slug": "netauto-apis-ncclient-m1-l4",
      "title": "edit-config with ncclient",
      "concept": "The ncclient edit_config method sends a change to a target datastore, and it takes the config as an XML string plus optional arguments such as default_operation and test_option. The config XML must use the same element names as the YANG model, and each element can carry an operation attribute such as merge or delete. After edit_config, the change sits in the target datastore until it is committed or discarded.",
      "syntax": "m.edit_config(target=\"candidate\", config=\"<config>...</config>\")",
      "exampleCode": "# Display only -- needs a lab device to run:\n# config = \"\"\"<config><interfaces><interface operation=\"merge\">\n#   <name>GigabitEthernet1</name>\n#   <description>Uplink to core</description>\n# </interface></interfaces></config>\"\"\"\n# m.edit_config(target=\"candidate\", config=config)",
      "exampleLanguage": "python",
      "mistake": "Forgetting to wrap the configuration in a top-level <config> element, so the device rejects the edit.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate edit-config with ncclient, but it does not work correctly.",
       "buggyCode": "m.edit_config(target=\"candidate\",\n              config=\"<interfaces><interface>...</interface></interfaces>\")",
       "fixedCode": "m.edit_config(target=\"candidate\",\n              config=\"<config><interfaces><interface>...</interface></interfaces></config>\")",
       "explanation": "edit-config expects the new configuration inside a <config> element; without it the device cannot tell where the configuration starts."
      },
      "exercise": {
       "title": "Check your understanding: edit-config with ncclient",
       "type": "multiple-choice",
       "instructions": "Which statement about edit-config with ncclient is correct?",
       "starterCode": "",
       "solution": "The ncclient edit_config method sends a change to a target datastore, and it takes the config as an XML string plus optional arguments such as default_operation and test_option.",
       "solutionExplanation": "The ncclient edit_config method sends a change to a target datastore, and it takes the config as an XML string plus optional arguments such as default_operation and test_option. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The ncclient edit_config method sends a change to a target datastore, and it takes the config as an XML string plus optional arguments such as default_operation and test_option.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of edit-config with ncclient from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The ncclient edit_config method sends a change to a target datastore, and it takes the config as an XML string plus optional arguments such as default_operation and test_option.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-ncclient-m1-l5",
      "slug": "netauto-apis-ncclient-m1-l5",
      "title": "Building Filters with XML",
      "concept": "A NETCONF filter is an XML document that names the subtree to return, and ncclient takes it as a string or an XML element in the get_config call. A subtree filter for the interfaces container returns only interface configuration, which keeps the reply small and fast. The filter must use the same element names as the YANG model, or the device returns an empty data element instead of an error.",
      "syntax": "<filter type=\"subtree\"><interfaces><interface><name>GigabitEthernet1</name></interface></interfaces></filter>",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\nfilt = ET.Element(\"{%s}filter\" % NS, {\"type\": \"subtree\"})\nET.SubElement(filt, \"{%s}interfaces\" % NS)\nprint(ET.tostring(filt, encoding=\"unicode\"))",
      "exampleLanguage": "python",
      "mistake": "Building the filter with plain string concatenation and forgetting to escape an interface name that contains special characters.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building Filters with XML, but it does not work correctly.",
       "buggyCode": "filt = \"<filter><interface><name>\" + name + \"</name></interface></filter>\"",
       "fixedCode": "filt = ET.Element(\"filter\")\niface = ET.SubElement(filt, \"interface\")\nET.SubElement(iface, \"name\").text = name  # ElementTree escapes for you",
       "explanation": "String concatenation puts raw values into XML, so a name containing < or & breaks the document; ElementTree escapes text automatically."
      },
      "exercise": {
       "title": "Practise Building Filters with XML",
       "type": "write-code",
       "instructions": "Build a subtree filter for the interface named GigabitEthernet1 using xml.etree and print the filter XML.",
       "starterCode": "# Build a subtree filter for GigabitEthernet1.\n# TODO: build the filter element and print it.\n",
       "solution": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\nfilt = ET.Element(\"{%s}filter\" % NS, {\"type\": \"subtree\"})\nifaces = ET.SubElement(filt, \"{%s}interfaces\" % NS)\niface = ET.SubElement(ifaces, \"{%s}interface\" % NS)\nname = ET.SubElement(iface, \"{%s}name\" % NS)\nname.text = \"GigabitEthernet1\"\nprint(ET.tostring(filt, encoding=\"unicode\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "<filter xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" type=\"subtree\"><interfaces><interface><name>GigabitEthernet1</name></interface></interfaces></filter>",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "<filter xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" type=\"subtree\"><interfaces><interface><name>GigabitEthernet1</name></interface></interfaces></filter>",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A NETCONF filter is an XML document that names the subtree to return, and ncclient takes it as a string or an XML element in the get_config call. A subtree filter for the interfaces container returns only interface configuration, which keeps the reply small and fast. The filter must use the same element names as the YANG model, or the device returns an empty data element instead of an error.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-ncclient-m2",
    "title": "ncclient in Practice in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-apis-ncclient-m2-l1",
      "slug": "netauto-apis-ncclient-m2-l1",
      "title": "Handling NETCONF Errors",
      "concept": "When a NETCONF operation fails, the device answers with an <rpc-error> element that carries an error-type, an error-tag such as bad-element or data-missing, an error-severity, and often an error-message explaining the problem. ncclient raises an RPCError exception carrying these fields, so a good script catches it and prints the tag and message instead of crashing. Reading the error-tag is the fastest way to know whether the problem is a bad message, missing data, or a device-side failure.",
      "syntax": "try:\n    m.edit_config(...)\nexcept RPCError as e:  # ncclient RPCError\n    print(e.tag, e.message)",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nERROR = \"<rpc-error><error-tag>data-missing</error-tag></rpc-error>\"\nroot = ET.fromstring(ERROR)\nprint(\"error-tag:\", root.findtext(\"error-tag\"))",
      "exampleLanguage": "python",
      "mistake": "Catching a broad Exception and printing a generic message, hiding the error-tag that says what actually went wrong.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handling NETCONF Errors, but it does not work correctly.",
       "buggyCode": "try:\n    m.edit_config(target=\"candidate\", config=config)\nexcept Exception:\n    print(\"something went wrong\")",
       "fixedCode": "# ncclient RPCError -- the exception edit_config raises on failure\ntry:\n    m.edit_config(target=\"candidate\", config=config)\nexcept RPCError as e:\n    print(\"error-tag:\", e.tag)\n    print(\"message:\", e.message)",
       "explanation": "A bare except hides the structured error; catching RPCError gives the error-tag and message that identify the real problem."
      },
      "exercise": {
       "title": "Practise Handling NETCONF Errors",
       "type": "write-code",
       "instructions": "Parse the sample <rpc-error> in the starter code and print its error-type, error-tag, error-severity and error-message, each on its own labelled line.",
       "starterCode": "# Parse the sample rpc-error and print its fields.\n# TODO: parse ERROR and print the four fields.\nERROR = \"\"\"<rpc-error>\n  <error-type>application</error-type>\n  <error-tag>data-missing</error-tag>\n  <error-severity>error</error-severity>\n  <error-message>Interface GigabitEthernet9 does not exist</error-message>\n</rpc-error>\"\"\"\n",
       "solution": "import xml.etree.ElementTree as ET\n\nERROR = \"\"\"<rpc-error>\n  <error-type>application</error-type>\n  <error-tag>data-missing</error-tag>\n  <error-severity>error</error-severity>\n  <error-message>Interface GigabitEthernet9 does not exist</error-message>\n</rpc-error>\"\"\"\nroot = ET.fromstring(ERROR)\nprint(\"error-type:\", root.findtext(\"error-type\"))\nprint(\"error-tag:\", root.findtext(\"error-tag\"))\nprint(\"error-severity:\", root.findtext(\"error-severity\"))\nprint(\"error-message:\", root.findtext(\"error-message\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "error-type: application\nerror-tag: data-missing\nerror-severity: error\nerror-message: Interface GigabitEthernet9 does not exist",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "error-type: application\nerror-tag: data-missing\nerror-severity: error\nerror-message: Interface GigabitEthernet9 does not exist",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "When a NETCONF operation fails, the device answers with an <rpc-error> element that carries an error-type, an error-tag such as bad-element or data-missing, an error-severity, and often an error-message explaining the problem. ncclient raises an RPCError exception carrying these fields, so a good script catches it and prints the tag and message instead of crashing. Reading the error-tag is the fastest way to know whether the problem is a bad message, missing data, or a device-side failure.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-ncclient-m2-l2",
      "slug": "netauto-apis-ncclient-m2-l2",
      "title": "Lock, Commit and Discard",
      "concept": "The ncclient manager offers lock, unlock, commit, and discard_changes methods that map directly to the NETCONF operations of the same names. Commit copies the candidate datastore into running, while discard_changes throws the candidate away and restores it from running. A change that fails validation should be discarded, never committed, and the lock must be released in a finally block either way.",
      "syntax": "m.lock(target='candidate')\nm.commit()\nm.discard_changes()\nm.unlock(target='candidate')",
      "exampleCode": "# Display only -- needs a lab device to run:\n# m.lock(target=\"candidate\")\n# try:\n#     m.edit_config(target=\"candidate\", config=config)\n#     m.commit()\n# except RPCError:\n#     m.discard_changes()\n# finally:\n#     m.unlock(target=\"candidate\")",
      "exampleLanguage": "python",
      "mistake": "Calling commit after an edit that raised an error, which commits a half-finished candidate.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Lock, Commit and Discard, but it does not work correctly.",
       "buggyCode": "try:\n    m.edit_config(target=\"candidate\", config=config)\nexcept RPCError:\n    pass\nm.commit()  # commits whatever is in candidate",
       "fixedCode": "try:\n    m.edit_config(target=\"candidate\", config=config)\n    m.commit()\nexcept RPCError:\n    m.discard_changes()  # throw the broken candidate away",
       "explanation": "Committing after a failed edit applies whatever partial change is in the candidate; the error path must discard the candidate instead."
      },
      "exercise": {
       "title": "Check your understanding: Lock, Commit and Discard",
       "type": "multiple-choice",
       "instructions": "Which statement about Lock, Commit and Discard is correct?",
       "starterCode": "",
       "solution": "The ncclient manager offers lock, unlock, commit, and discard_changes methods that map directly to the NETCONF operations of the same names.",
       "solutionExplanation": "The ncclient manager offers lock, unlock, commit, and discard_changes methods that map directly to the NETCONF operations of the same names. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The ncclient manager offers lock, unlock, commit, and discard_changes methods that map directly to the NETCONF operations of the same names.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Lock, Commit and Discard from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The ncclient manager offers lock, unlock, commit, and discard_changes methods that map directly to the NETCONF operations of the same names.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-ncclient-m2-l3",
      "slug": "netauto-apis-ncclient-m2-l3",
      "title": "Saving Configurations",
      "concept": "The copy-config operation copies one datastore into another, and the usual use is copying <running> to <startup> so the current configuration survives a reboot. ncclient exposes it as copy_config(source='running', target='startup'). Saving is a separate step from committing: commit makes a change live, and only copy-config makes it survive a restart.",
      "syntax": "m.copy_config(source='running', target='startup')",
      "exampleCode": "# Display only -- needs a lab device to run:\n# m.copy_config(source=\"running\", target=\"startup\")\n# print(\"running config saved to startup\")",
      "exampleLanguage": "python",
      "mistake": "Assuming a committed change survives a reboot, when only a copy to <startup> makes it persistent.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Saving Configurations, but it does not work correctly.",
       "buggyCode": "m.commit()  # live now, but not saved for the next boot",
       "fixedCode": "m.commit()\nm.copy_config(source=\"running\", target=\"startup\")  # saved for reboot",
       "explanation": "Commit only updates the running datastore; without copy-config to startup, the next reboot loads the old configuration."
      },
      "exercise": {
       "title": "Check your understanding: Saving Configurations",
       "type": "multiple-choice",
       "instructions": "Which statement about Saving Configurations is correct?",
       "starterCode": "",
       "solution": "The copy-config operation copies one datastore into another, and the usual use is copying <running> to <startup> so the current configuration survives a reboot.",
       "solutionExplanation": "The copy-config operation copies one datastore into another, and the usual use is copying <running> to <startup> so the current configuration survives a reboot. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The copy-config operation copies one datastore into another, and the usual use is copying <running> to <startup> so the current configuration survives a reboot.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Saving Configurations from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The copy-config operation copies one datastore into another, and the usual use is copying <running> to <startup> so the current configuration survives a reboot.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-ncclient-m2-l4",
      "slug": "netauto-apis-ncclient-m2-l4",
      "title": "Parsing Replies with XML",
      "concept": "An ncclient get_config call returns an object whose data_xml property holds the reply as an XML string, and the usual next step is to parse it with xml.etree. The parsed tree is walked with namespace-aware find calls to pull out the values the script needs, such as interface names and descriptions. Keeping the parsing in one small helper function means every lesson that reads configuration can reuse it instead of repeating the same code.",
      "syntax": "ET.fromstring(reply.data_xml)",
      "exampleCode": "import xml.etree.ElementTree as ET\n\nNS = {\"n\": \"urn:ietf:params:xml:ns:netconf:base:1.0\"}\nroot = ET.fromstring('<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"/>')\nprint(root.findall(\".//n:interface\", NS))",
      "exampleLanguage": "python",
      "mistake": "Parsing reply.data_xml as a JSON string, when it is XML and needs an XML parser.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Parsing Replies with XML, but it does not work correctly.",
       "buggyCode": "import json\n\ndata = json.loads(reply.data_xml)  # data_xml is XML, not JSON",
       "fixedCode": "import xml.etree.ElementTree as ET\n\nroot = ET.fromstring(reply.data_xml)  # XML needs an XML parser",
       "explanation": "data_xml holds an XML document, so json.loads fails on it; xml.etree is the right parser for it."
      },
      "exercise": {
       "title": "Practise Parsing Replies with XML",
       "type": "write-code",
       "instructions": "Parse the sample <data> document in the starter code into a dict of interface name to enabled boolean, then print each entry sorted by name as 'name: enabled=True/False'.",
       "starterCode": "# Parse the sample data document into a dict.\n# TODO: parse DATA_XML and print each interface sorted by name.\nDATA_XML = \"\"\"<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n  <interfaces>\n    <interface><name>GigabitEthernet1</name><enabled>true</enabled></interface>\n    <interface><name>GigabitEthernet2</name><enabled>false</enabled></interface>\n  </interfaces>\n</data>\"\"\"\n",
       "solution": "import xml.etree.ElementTree as ET\n\nDATA_XML = \"\"\"<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n  <interfaces>\n    <interface><name>GigabitEthernet1</name><enabled>true</enabled></interface>\n    <interface><name>GigabitEthernet2</name><enabled>false</enabled></interface>\n  </interfaces>\n</data>\"\"\"\nNS = {\"n\": \"urn:ietf:params:xml:ns:netconf:base:1.0\"}\nroot = ET.fromstring(DATA_XML)\nresult = {}\nfor iface in root.findall(\".//n:interface\", NS):\n    name = iface.findtext(\"n:name\", namespaces=NS)\n    result[name] = iface.findtext(\"n:enabled\", namespaces=NS) == \"true\"\nfor name in sorted(result):\n    print(name + \": enabled=\" + str(result[name]))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GigabitEthernet1: enabled=True\nGigabitEthernet2: enabled=False",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "GigabitEthernet1: enabled=True\nGigabitEthernet2: enabled=False",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "An ncclient get_config call returns an object whose data_xml property holds the reply as an XML string, and the usual next step is to parse it with xml.etree. The parsed tree is walked with namespace-aware find calls to pull out the values the script needs, such as interface names and descriptions. Keeping the parsing in one small helper function means every lesson that reads configuration can reuse it instead of repeating the same code.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-ncclient-m2-l5",
      "slug": "netauto-apis-ncclient-m2-l5",
      "title": "A Safe ncclient Workflow",
      "concept": "A safe ncclient workflow wraps the whole change in a with manager.connect block, locks the candidate datastore, edits it, validates it, commits it, verifies with get_config, and unlocks in a finally block. Every step checks its result before moving on, and any RPCError discards the candidate so a failed change never reaches running. This workflow is only run against a lab device or a real device with NETCONF enabled, never against a device you cannot afford to break.",
      "syntax": "with manager.connect(...) as m:\n    lock -> edit -> validate -> commit -> verify -> unlock",
      "exampleCode": "# Safe ncclient workflow (needs a lab device to run):\n# with manager.connect(...) as m:\n#     m.lock(target=\"candidate\")\n#     try:\n#         m.edit_config(target=\"candidate\", config=config)\n#         m.validate(source=\"candidate\")\n#         m.commit()\n#         m.get_config(source=\"running\")\n#     except RPCError:\n#         m.discard_changes()\n#     finally:\n#         m.unlock(target=\"candidate\")",
      "exampleLanguage": "python",
      "mistake": "Putting the unlock call after the try block instead of in a finally, so an exception leaves the datastore locked.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Safe ncclient Workflow, but it does not work correctly.",
       "buggyCode": "m.lock(target=\"candidate\")\nm.edit_config(target=\"candidate\", config=config)\nm.commit()\nm.unlock(target=\"candidate\")  # skipped if edit_config raises",
       "fixedCode": "m.lock(target=\"candidate\")\ntry:\n    m.edit_config(target=\"candidate\", config=config)\n    m.commit()\nfinally:\n    m.unlock(target=\"candidate\")  # always runs",
       "explanation": "Code after a failing call never runs, so the unlock must be in a finally block to be released even when the edit fails."
      },
      "exercise": {
       "title": "Practise A Safe ncclient Workflow",
       "type": "write-code",
       "instructions": "Print the seven steps of the safe ncclient workflow in order, then print 'workflow ready for the lab' on the last line.",
       "starterCode": "# Print the safe ncclient workflow steps.\n# TODO: print the seven steps, then 'workflow ready for the lab'.\n",
       "solution": "workflow = [\n    \"1. with manager.connect(...) as m:\",\n    \"2. m.lock(target='candidate')\",\n    \"3. m.edit_config(target='candidate', config=config_xml)\",\n    \"4. m.validate(source='candidate')\",\n    \"5. m.commit()\",\n    \"6. m.get_config(source='running') to verify\",\n    \"7. m.unlock(target='candidate') in finally\",\n]\nfor step in workflow:\n    print(step)\nprint(\"workflow ready for the lab\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. with manager.connect(...) as m:\n2. m.lock(target='candidate')\n3. m.edit_config(target='candidate', config=config_xml)\n4. m.validate(source='candidate')\n5. m.commit()\n6. m.get_config(source='running') to verify\n7. m.unlock(target='candidate') in finally\nworkflow ready for the lab",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "1. with manager.connect(...) as m:\n2. m.lock(target='candidate')\n3. m.edit_config(target='candidate', config=config_xml)\n4. m.validate(source='candidate')\n5. m.commit()\n6. m.get_config(source='running') to verify\n7. m.unlock(target='candidate') in finally\nworkflow ready for the lab",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A safe ncclient workflow wraps the whole change in a with manager.connect block, locks the candidate datastore, edits it, validates it, commits it, verifies with get_config, and unlocks in a finally block. Every step checks its result before moving on, and any RPCError discards the candidate so a failed change never reaches running. This workflow is only run against a lab device or a real device with NETCONF enabled, never against a device you cannot afford to break.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: ncclient in Practice",
   "type": "write-code",
   "instructions": "Write two helpers: build_filter(interface) that returns a subtree filter XML string for one interface, and parse_interfaces(data_xml) that returns a dict of interface name to description. Print the filter for GigabitEthernet1, then print the parsed interfaces from the sample data document.",
   "starterCode": "# Write build_filter and parse_interfaces helpers.\n# TODO: define both helpers and print the filter and the parsed interfaces.\n",
   "solution": "import xml.etree.ElementTree as ET\n\nNS = \"urn:ietf:params:xml:ns:netconf:base:1.0\"\nET.register_namespace(\"\", NS)\n\n\ndef build_filter(interface):\n    filt = ET.Element(\"{%s}filter\" % NS, {\"type\": \"subtree\"})\n    ifaces = ET.SubElement(filt, \"{%s}interfaces\" % NS)\n    iface = ET.SubElement(ifaces, \"{%s}interface\" % NS)\n    ET.SubElement(iface, \"{%s}name\" % NS).text = interface\n    return ET.tostring(filt, encoding=\"unicode\")\n\n\ndef parse_interfaces(data_xml):\n    ns = {\"n\": NS}\n    root = ET.fromstring(data_xml)\n    out = {}\n    for iface in root.findall(\".//n:interface\", ns):\n        out[iface.findtext(\"n:name\", namespaces=ns)] = iface.findtext(\n            \"n:description\", namespaces=ns)\n    return out\n\n\nDATA_XML = \"\"\"<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n  <interfaces>\n    <interface><name>GigabitEthernet1</name><description>Uplink to core</description></interface>\n  </interfaces>\n</data>\"\"\"\nprint(build_filter(\"GigabitEthernet1\"))\nfor name, desc in parse_interfaces(DATA_XML).items():\n    print(name + \": \" + desc)",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "<filter xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" type=\"subtree\"><interfaces><interface><name>GigabitEthernet1</name></interface></interfaces></filter>\nGigabitEthernet1: Uplink to core",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "<filter xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\" type=\"subtree\"><interfaces><interface><name>GigabitEthernet1</name></interface></interfaces></filter>\nGigabitEthernet1: Uplink to core",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "ncclient in Practice brings the whole track together: build filters and parse replies the way an ncclient script does.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "ncclient in Practice Capstone Project",
   "description": "A small end-to-end project that puts ncclient in Practice into practice.",
   "requirements": [
    "Build a subtree filter and a reply parser as reusable Python helpers.",
    "Apply at least three of these skills: get-config filters, edit-config, RPCError handling, Parsing NETCONF replies.",
    "Handle errors by printing the error-tag and message, never by crashing silently.",
    "Label clearly that the helpers are practised locally and the live calls need a lab device."
   ],
   "rubric": [
    "The filter XML is well-formed, namespaced, and targets one interface.",
    "The parser returns exact values from the reply, not guessed text.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-restconf",
  "slug": "netauto-apis-restconf",
  "language": "python",
  "category": "devops",
  "title": "RESTCONF APIs",
  "description": "Learn restconf apis for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Intermediate",
  "estimatedHours": 9,
  "skills": [
   "RESTCONF concepts",
   "RESTCONF URLs",
   "Datastores over HTTP",
   "GET PUT PATCH POST DELETE",
   "YANG data in JSON",
   "Status codes and errors",
   "Query parameters",
   "RESTCONF vs NETCONF"
  ],
  "prerequisites": [
   "netauto-apis-netconf"
  ],
  "analogy": "Learning {topic} is like learning to order from a menu by number: the URL names the dish, the verb says what to do with it, and the kitchen answers in a format you can read.",
  "modules": [
   {
    "id": "netauto-apis-restconf-m1",
    "title": "RESTCONF APIs Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-restconf-m1-l1",
      "slug": "netauto-apis-restconf-m1-l1",
      "title": "What Is RESTCONF?",
      "concept": "RESTCONF is a protocol defined in RFC 8040 that exposes YANG-modelled device data over HTTP, using the same data models as NETCONF but with REST verbs and URLs instead of XML RPCs. A GET request reads data, PUT replaces it, PATCH merges a change, POST creates a resource or invokes an operation, and DELETE removes it. RESTCONF runs over HTTPS, usually on port 443, and represents data as JSON or XML.",
      "syntax": "GET https://192.0.2.1/restconf/data/ietf-interfaces:interfaces",
      "exampleCode": "# RESTCONF: YANG data over HTTP.\n# GET    /restconf/data/...   read\n# PUT    /restconf/data/...   replace\n# PATCH  /restconf/data/...   merge a change\n# POST   /restconf/data/...   create, or /restconf/operations/... invoke\n# DELETE /restconf/data/...   remove",
      "exampleLanguage": "python",
      "mistake": "Assuming RESTCONF uses the same XML RPC messages as NETCONF, instead of HTTP verbs and URLs.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is RESTCONF?, but it does not work correctly.",
       "buggyCode": "<rpc message-id=\"101\"><get-config/></rpc>  # NETCONF, not RESTCONF",
       "fixedCode": "GET https://192.0.2.1/restconf/data/ietf-interfaces:interfaces  # RESTCONF",
       "explanation": "RESTCONF speaks HTTP: a GET request to a URL, not an XML <rpc> document; the two protocols share YANG models but not the message format."
      },
      "exercise": {
       "title": "Practise What Is RESTCONF?",
       "type": "write-code",
       "instructions": "Build the RESTCONF root URLs from a device base URL (https://192.0.2.1) and print the base, the restconf root, the data root, and the operations root.",
       "starterCode": "# Build the RESTCONF root URLs.\n# TODO: build the four URLs and print them.\n",
       "solution": "base = \"https://192.0.2.1\"\nroot = base + \"/restconf\"\nprint(\"base:\", base)\nprint(\"restconf root:\", root)\nprint(\"data root:\", root + \"/data\")\nprint(\"operations root:\", root + \"/operations\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "base: https://192.0.2.1\nrestconf root: https://192.0.2.1/restconf\ndata root: https://192.0.2.1/restconf/data\noperations root: https://192.0.2.1/restconf/operations",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "base: https://192.0.2.1\nrestconf root: https://192.0.2.1/restconf\ndata root: https://192.0.2.1/restconf/data\noperations root: https://192.0.2.1/restconf/operations",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "RESTCONF is a protocol defined in RFC 8040 that exposes YANG-modelled device data over HTTP, using the same data models as NETCONF but with REST verbs and URLs instead of XML RPCs. A GET request reads data, PUT replaces it, PATCH merges a change, POST creates a resource or invokes an operation, and DELETE removes it. RESTCONF runs over HTTPS, usually on port 443, and represents data as JSON or XML.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-restconf-m1-l2",
      "slug": "netauto-apis-restconf-m1-l2",
      "title": "RESTCONF URLs and Datastores",
      "concept": "A RESTCONF URL starts with /restconf/data followed by the YANG path of the resource, for example /restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1. The datastore is chosen with a query parameter or a path segment such as /restconf/ds/ietf-datastores:running. List entries are addressed by their key in the path, so the URL itself names exactly one resource.",
      "syntax": "/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1",
      "exampleCode": "# Address one interface by its key in the URL:\n# /restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\n# Datastores:\n# /restconf/ds/ietf-datastores:running\n# /restconf/ds/ietf-datastores:operational",
      "exampleLanguage": "python",
      "mistake": "Writing the interface name in the URL without the module prefix, so the server cannot tell which model the name belongs to.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate RESTCONF URLs and Datastores, but it does not work correctly.",
       "buggyCode": "/restconf/data/interfaces/interface=GigabitEthernet1  # missing prefix",
       "fixedCode": "/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1",
       "explanation": "RESTCONF paths use the module prefix before the container name (ietf-interfaces:interfaces); without it the path is ambiguous and the server rejects it."
      },
      "exercise": {
       "title": "Practise RESTCONF URLs and Datastores",
       "type": "write-code",
       "instructions": "Build four RESTCONF URLs from the base https://192.0.2.1/restconf: the interfaces list, one interface by key, the startup datastore, and the operational datastore. Print each on its own labelled line.",
       "starterCode": "# Build RESTCONF URLs for datastores and resources.\n# TODO: build the four URLs and print them.\n",
       "solution": "base = \"https://192.0.2.1/restconf\"\nprint(\"running interfaces:\", base + \"/data/ietf-interfaces:interfaces\")\nprint(\"one interface:\", base + \"/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\")\nprint(\"startup:\", base + \"/ds/ietf-datastores:startup\")\nprint(\"operational:\", base + \"/ds/ietf-datastores:operational\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "running interfaces: https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\none interface: https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\nstartup: https://192.0.2.1/restconf/ds/ietf-datastores:startup\noperational: https://192.0.2.1/restconf/ds/ietf-datastores:operational",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "running interfaces: https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\none interface: https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\nstartup: https://192.0.2.1/restconf/ds/ietf-datastores:startup\noperational: https://192.0.2.1/restconf/ds/ietf-datastores:operational",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A RESTCONF URL starts with /restconf/data followed by the YANG path of the resource, for example /restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1. The datastore is chosen with a query parameter or a path segment such as /restconf/ds/ietf-datastores:running. List entries are addressed by their key in the path, so the URL itself names exactly one resource.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-restconf-m1-l3",
      "slug": "netauto-apis-restconf-m1-l3",
      "title": "GET: Reading Configuration",
      "concept": "A RESTCONF GET request reads a resource, and the server answers with the resource as JSON or XML plus a 200 status code. Reading a container returns everything under it, while reading a list entry by key returns just that entry. A GET never changes anything, so it is always safe to repeat, and it is the first step of any change workflow.",
      "syntax": "GET /restconf/data/ietf-interfaces:interfaces",
      "exampleCode": "# Display only -- needs a lab device to run:\n# GET https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\n# Accept: application/yang-data+json\n# -> 200 OK, body is the interfaces JSON",
      "exampleLanguage": "python",
      "mistake": "Using GET to change configuration, when GET is read-only and a change needs PUT, PATCH, or POST.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate GET: Reading Configuration, but it does not work correctly.",
       "buggyCode": "GET /restconf/data/ietf-interfaces:interfaces  # with a body that \"sets\" a description",
       "fixedCode": "PATCH /restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\n# body: {\"ietf-interfaces:interface\": {\"description\": \"Uplink to core\"}}",
       "explanation": "GET never changes state; sending a body with a GET does not apply a change, and the description can only be set with PATCH or PUT."
      },
      "exercise": {
       "title": "Check your understanding: GET: Reading Configuration",
       "type": "multiple-choice",
       "instructions": "Which statement about GET: Reading Configuration is correct?",
       "starterCode": "",
       "solution": "A RESTCONF GET request reads a resource, and the server answers with the resource as JSON or XML plus a 200 status code.",
       "solutionExplanation": "A RESTCONF GET request reads a resource, and the server answers with the resource as JSON or XML plus a 200 status code. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A RESTCONF GET request reads a resource, and the server answers with the resource as JSON or XML plus a 200 status code.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of GET: Reading Configuration from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A RESTCONF GET request reads a resource, and the server answers with the resource as JSON or XML plus a 200 status code.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-restconf-m1-l4",
      "slug": "netauto-apis-restconf-m1-l4",
      "title": "PUT, PATCH and POST",
      "concept": "PUT replaces the whole resource at a URL, so the body must contain the complete resource or the missing fields are removed. PATCH merges a change into the resource, updating only the fields in the body and leaving the rest alone. POST creates a new list entry under a container, or invokes a YANG-defined operation under /restconf/operations. Choosing PUT when you meant PATCH is the most common way to accidentally delete configuration.",
      "syntax": "PUT = replace whole resource\nPATCH = merge a change\nPOST = create entry or invoke operation",
      "exampleCode": "# PUT replaces everything at the URL:\n# PUT /restconf/data/.../interface=GigabitEthernet1\n# PATCH merges only the fields in the body:\n# PATCH /restconf/data/.../interface=GigabitEthernet1\n# POST creates a new entry:\n# POST /restconf/data/ietf-interfaces:interfaces",
      "exampleLanguage": "python",
      "mistake": "Sending a PUT with only the description field, which replaces the whole interface and deletes its other settings.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate PUT, PATCH and POST, but it does not work correctly.",
       "buggyCode": "PUT /restconf/data/.../interface=GigabitEthernet1\n{\"ietf-interfaces:interface\": {\"description\": \"new\"}}  # replaces everything",
       "fixedCode": "PATCH /restconf/data/.../interface=GigabitEthernet1\n{\"ietf-interfaces:interface\": {\"description\": \"new\"}}  # merges only this",
       "explanation": "PUT replaces the entire resource, so fields not in the body are removed; PATCH only updates the fields it is given."
      },
      "exercise": {
       "title": "Check your understanding: PUT, PATCH and POST",
       "type": "multiple-choice",
       "instructions": "Which statement about PUT, PATCH and POST is correct?",
       "starterCode": "",
       "solution": "PUT replaces the whole resource at a URL, so the body must contain the complete resource or the missing fields are removed.",
       "solutionExplanation": "PUT replaces the whole resource at a URL, so the body must contain the complete resource or the missing fields are removed. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "PUT replaces the whole resource at a URL, so the body must contain the complete resource or the missing fields are removed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of PUT, PATCH and POST from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "PUT replaces the whole resource at a URL, so the body must contain the complete resource or the missing fields are removed.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-restconf-m1-l5",
      "slug": "netauto-apis-restconf-m1-l5",
      "title": "Building a RESTCONF Request",
      "concept": "A RESTCONF request is an HTTP request with four parts: the method (GET, PUT, PATCH, POST, or DELETE), the URL naming the resource, headers such as Accept and Content-Type, and an optional JSON or XML body carrying the data. The Accept header chooses the reply format, and the Content-Type header describes the body format. Building the request correctly matters more than sending it: a wrong header or a wrong URL returns an error before any data is touched.",
      "syntax": "{\"method\": \"PUT\", \"url\": \"...\", \"headers\": {...}, \"body\": {...}}",
      "exampleCode": "import json\n\nrequest = {\n    \"method\": \"GET\",\n    \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\",\n    \"headers\": {\"Accept\": \"application/yang-data+json\"},\n    \"body\": None,\n}\nprint(json.dumps(request, indent=2))",
      "exampleLanguage": "python",
      "mistake": "Sending a JSON body without the Content-Type: application/yang-data+json header, so the server cannot tell the body is YANG data.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building a RESTCONF Request, but it does not work correctly.",
       "buggyCode": "headers = {\"Accept\": \"application/yang-data+json\"}  # no Content-Type",
       "fixedCode": "headers = {\"Accept\": \"application/yang-data+json\",\n           \"Content-Type\": \"application/yang-data+json\"}",
       "explanation": "Accept says what reply format you want; Content-Type says what format the body is in, and without it the server may reject the body."
      },
      "exercise": {
       "title": "Practise Building a RESTCONF Request",
       "type": "write-code",
       "instructions": "Build a PUT request dict for the interface GigabitEthernet1 (method, URL, Accept and Content-Type headers, JSON body with name, description 'Uplink to core' and enabled true) and print it as sorted, indented JSON.",
       "starterCode": "# Build a PUT request dict.\n# TODO: build the request dict and print it as JSON.\n",
       "solution": "import json\n\nrequest = {\n    \"method\": \"PUT\",\n    \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\",\n    \"headers\": {\n        \"Accept\": \"application/yang-data+json\",\n        \"Content-Type\": \"application/yang-data+json\",\n    },\n    \"body\": {\"ietf-interfaces:interface\": {\"name\": \"GigabitEthernet1\", \"description\": \"Uplink to core\", \"enabled\": True}},\n}\nprint(json.dumps(request, indent=2, sort_keys=True))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\n  \"body\": {\n    \"ietf-interfaces:interface\": {\n      \"description\": \"Uplink to core\",\n      \"enabled\": true,\n      \"name\": \"GigabitEthernet1\"\n    }\n  },\n  \"headers\": {\n    \"Accept\": \"application/yang-data+json\",\n    \"Content-Type\": \"application/yang-data+json\"\n  },\n  \"method\": \"PUT\",\n  \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\"\n}",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{\n  \"body\": {\n    \"ietf-interfaces:interface\": {\n      \"description\": \"Uplink to core\",\n      \"enabled\": true,\n      \"name\": \"GigabitEthernet1\"\n    }\n  },\n  \"headers\": {\n    \"Accept\": \"application/yang-data+json\",\n    \"Content-Type\": \"application/yang-data+json\"\n  },\n  \"method\": \"PUT\",\n  \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\"\n}",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A RESTCONF request is an HTTP request with four parts: the method (GET, PUT, PATCH, POST, or DELETE), the URL naming the resource, headers such as Accept and Content-Type, and an optional JSON or XML body carrying the data. The Accept header chooses the reply format, and the Content-Type header describes the body format. Building the request correctly matters more than sending it: a wrong header or a wrong URL returns an error before any data is touched.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-restconf-m2",
    "title": "RESTCONF APIs in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-apis-restconf-m2-l1",
      "slug": "netauto-apis-restconf-m2-l1",
      "title": "RESTCONF and YANG in JSON",
      "concept": "RESTCONF represents YANG data as JSON, and every object key is the module name and leaf name joined by a colon, such as ietf-interfaces:interface. A YANG list becomes a JSON array, a leaf becomes a JSON value, and a container becomes a nested JSON object. The JSON form follows the model exactly, so the same names and types you learned in YANG appear in the JSON body.",
      "syntax": "{\"ietf-interfaces:interface\": {\"name\": \"...\", \"enabled\": true}}",
      "exampleCode": "import json\n\nbody = {\"ietf-interfaces:interface\": {\n    \"name\": \"GigabitEthernet1\",\n    \"description\": \"Uplink to core\",\n    \"enabled\": True,\n}}\nprint(json.dumps(body, indent=2))",
      "exampleLanguage": "python",
      "mistake": "Writing the body with plain keys like \"interface\" instead of the prefixed \"ietf-interfaces:interface\", so the server cannot match it to the model.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate RESTCONF and YANG in JSON, but it does not work correctly.",
       "buggyCode": "{\"interface\": {\"name\": \"GigabitEthernet1\"}}  # missing module prefix",
       "fixedCode": "{\"ietf-interfaces:interface\": {\"name\": \"GigabitEthernet1\"}}",
       "explanation": "RESTCONF JSON keys carry the module prefix because the model namespace is part of the name; a bare key does not match any YANG node."
      },
      "exercise": {
       "title": "Practise RESTCONF and YANG in JSON",
       "type": "write-code",
       "instructions": "Build the JSON payload for the interfaces container with two interfaces (GigabitEthernet1 and Loopback0, both enabled) and print it as sorted, indented JSON.",
       "starterCode": "# Build the interfaces JSON payload.\n# TODO: build the payload dict and print it as JSON.\n",
       "solution": "import json\n\npayload = {\n    \"ietf-interfaces:interfaces\": {\n        \"interface\": [\n            {\"name\": \"GigabitEthernet1\", \"description\": \"Uplink to core\", \"enabled\": True},\n            {\"name\": \"Loopback0\", \"description\": \"Management loopback\", \"enabled\": True},\n        ]\n    }\n}\nprint(json.dumps(payload, indent=2, sort_keys=True))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\n  \"ietf-interfaces:interfaces\": {\n    \"interface\": [\n      {\n        \"description\": \"Uplink to core\",\n        \"enabled\": true,\n        \"name\": \"GigabitEthernet1\"\n      },\n      {\n        \"description\": \"Management loopback\",\n        \"enabled\": true,\n        \"name\": \"Loopback0\"\n      }\n    ]\n  }\n}",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{\n  \"ietf-interfaces:interfaces\": {\n    \"interface\": [\n      {\n        \"description\": \"Uplink to core\",\n        \"enabled\": true,\n        \"name\": \"GigabitEthernet1\"\n      },\n      {\n        \"description\": \"Management loopback\",\n        \"enabled\": true,\n        \"name\": \"Loopback0\"\n      }\n    ]\n  }\n}",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "RESTCONF represents YANG data as JSON, and every object key is the module name and leaf name joined by a colon, such as ietf-interfaces:interface. A YANG list becomes a JSON array, a leaf becomes a JSON value, and a container becomes a nested JSON object. The JSON form follows the model exactly, so the same names and types you learned in YANG appear in the JSON body.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-restconf-m2-l2",
      "slug": "netauto-apis-restconf-m2-l2",
      "title": "RESTCONF Errors and Status Codes",
      "concept": "RESTCONF answers every request with an HTTP status code, and a 2xx code means success: 200 for a GET that returns data, 201 when a POST creates a resource, and 204 when a change succeeds with no body. A 4xx code means the request was wrong, such as 400 for a bad body or 404 for a missing resource, and a 5xx code means the server failed. The error body carries a YANG-modelled error with an error-tag and error-message, just like a NETCONF rpc-error.",
      "syntax": "200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Server Error",
      "exampleCode": "# 200 GET ok, 201 POST created, 204 change ok (no body)\n# 400 bad request, 401 unauthorised, 404 not found\n# 500 server error -- check the error body for the error-tag",
      "exampleLanguage": "python",
      "mistake": "Treating any non-200 status as a total failure, and ignoring 201 and 204 which are also successes.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate RESTCONF Errors and Status Codes, but it does not work correctly.",
       "buggyCode": "if status != 200:\n    print(\"failed\")  # wrong: 201 and 204 are successes too",
       "fixedCode": "if status in (200, 201, 204):\n    print(\"success\")\nelse:\n    print(\"failed:\", status)",
       "explanation": "RESTCONF success is any 2xx code: 201 means a resource was created and 204 means a change applied with no body, and both are successes."
      },
      "exercise": {
       "title": "Check your understanding: RESTCONF Errors and Status Codes",
       "type": "multiple-choice",
       "instructions": "Which statement about RESTCONF Errors and Status Codes is correct?",
       "starterCode": "",
       "solution": "RESTCONF answers every request with an HTTP status code, and a 2xx code means success: 200 for a GET that returns data, 201 when a POST creates a resource, and 204 when a change succeeds with no body.",
       "solutionExplanation": "RESTCONF answers every request with an HTTP status code, and a 2xx code means success: 200 for a GET that returns data, 201 when a POST creates a resource, and 204 when a change succeeds with no body. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "RESTCONF answers every request with an HTTP status code, and a 2xx code means success: 200 for a GET that returns data, 201 when a POST creates a resource, and 204 when a change succeeds with no body.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of RESTCONF Errors and Status Codes from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "RESTCONF answers every request with an HTTP status code, and a 2xx code means success: 200 for a GET that returns data, 201 when a POST creates a resource, and 204 when a change succeeds with no body.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-restconf-m2-l3",
      "slug": "netauto-apis-restconf-m2-l3",
      "title": "Query Parameters",
      "concept": "RESTCONF query parameters change what a GET returns without changing the URL path: depth limits how many levels of the tree are returned, fields selects only named fields, and filter applies an XPath expression to the data. The with-defaults parameter controls whether default values appear in the reply. Query parameters keep replies small and focused, which matters when a device has thousands of interfaces.",
      "syntax": "GET /restconf/data/...?depth=2&fields=name;enabled",
      "exampleCode": "# GET /restconf/data/ietf-interfaces:interfaces?depth=2\n# GET /restconf/data/ietf-interfaces:interfaces?fields=name;enabled\n# GET /restconf/data/ietf-interfaces:interfaces?with-defaults=report-all",
      "exampleLanguage": "python",
      "mistake": "Fetching the whole interfaces tree and filtering it locally, when a fields query parameter would have returned only the two fields needed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Query Parameters, but it does not work correctly.",
       "buggyCode": "GET /restconf/data/ietf-interfaces:interfaces  # everything, then filter locally",
       "fixedCode": "GET /restconf/data/ietf-interfaces:interfaces?fields=name;enabled",
       "explanation": "A fields parameter makes the device return only the requested fields, which is faster and uses less bandwidth than fetching everything and discarding most of it."
      },
      "exercise": {
       "title": "Check your understanding: Query Parameters",
       "type": "multiple-choice",
       "instructions": "Which statement about Query Parameters is correct?",
       "starterCode": "",
       "solution": "RESTCONF query parameters change what a GET returns without changing the URL path: depth limits how many levels of the tree are returned, fields selects only named fields, and filter applies an XPath expression to the data.",
       "solutionExplanation": "RESTCONF query parameters change what a GET returns without changing the URL path: depth limits how many levels of the tree are returned, fields selects only named fields, and filter applies an XPath expression to the data. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "RESTCONF query parameters change what a GET returns without changing the URL path: depth limits how many levels of the tree are returned, fields selects only named fields, and filter applies an XPath expression to the data.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Query Parameters from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "RESTCONF query parameters change what a GET returns without changing the URL path: depth limits how many levels of the tree are returned, fields selects only named fields, and filter applies an XPath expression to the data.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-restconf-m2-l4",
      "slug": "netauto-apis-restconf-m2-l4",
      "title": "RESTCONF vs NETCONF",
      "concept": "RESTCONF and NETCONF share the same YANG models and datastores, but they differ in transport and style: NETCONF is a stateful XML RPC session over SSH on port 830, while RESTCONF is stateless HTTP over HTTPS on port 443. NETCONF supports transactions with lock, candidate, and confirmed commit, while RESTCONF applies each request on its own. Choose NETCONF for careful multi-step changes and RESTCONF for simple reads and single-resource writes.",
      "syntax": "NETCONF: SSH 830, XML, stateful\nRESTCONF: HTTPS 443, HTTP verbs, stateless",
      "exampleCode": "# NETCONF:  SSH, port 830, XML RPCs, lock/candidate/commit\n# RESTCONF: HTTPS, port 443, GET/PUT/PATCH/POST/DELETE, stateless\n# Shared:   YANG models, datastores, error-tags",
      "exampleLanguage": "python",
      "mistake": "Picking RESTCONF for a multi-step change that needs a candidate datastore and a confirmed commit, which only NETCONF provides.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate RESTCONF vs NETCONF, but it does not work correctly.",
       "buggyCode": "# multi-step change with rollback -- RESTCONF has no candidate",
       "fixedCode": "# multi-step change with rollback -- use NETCONF candidate + commit",
       "explanation": "RESTCONF applies each request on its own and has no candidate datastore, so a change that must be staged, validated, and rolled back belongs in NETCONF."
      },
      "exercise": {
       "title": "Practise RESTCONF vs NETCONF",
       "type": "write-code",
       "instructions": "Print five comparison lines: NETCONF transport, RESTCONF transport, NETCONF transactions, RESTCONF style, and what both share.",
       "starterCode": "# Print the RESTCONF vs NETCONF comparison.\n# TODO: print the five comparison lines.\n",
       "solution": "rows = [\n    \"NETCONF: SSH port 830, XML RPCs, stateful session\",\n    \"RESTCONF: HTTPS port 443, HTTP verbs, stateless\",\n    \"NETCONF: lock, candidate, confirmed commit\",\n    \"RESTCONF: one request, one change, no session\",\n    \"Both: same YANG models, same datastores\",\n]\nfor row in rows:\n    print(row)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "NETCONF: SSH port 830, XML RPCs, stateful session\nRESTCONF: HTTPS port 443, HTTP verbs, stateless\nNETCONF: lock, candidate, confirmed commit\nRESTCONF: one request, one change, no session\nBoth: same YANG models, same datastores",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "NETCONF: SSH port 830, XML RPCs, stateful session\nRESTCONF: HTTPS port 443, HTTP verbs, stateless\nNETCONF: lock, candidate, confirmed commit\nRESTCONF: one request, one change, no session\nBoth: same YANG models, same datastores",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "RESTCONF and NETCONF share the same YANG models and datastores, but they differ in transport and style: NETCONF is a stateful XML RPC session over SSH on port 830, while RESTCONF is stateless HTTP over HTTPS on port 443. NETCONF supports transactions with lock, candidate, and confirmed commit, while RESTCONF applies each request on its own. Choose NETCONF for careful multi-step changes and RESTCONF for simple reads and single-resource writes.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-restconf-m2-l5",
      "slug": "netauto-apis-restconf-m2-l5",
      "title": "Designing a RESTCONF Workflow",
      "concept": "A RESTCONF workflow for a change reads the current resource with GET, builds the new body from the YANG model, sends it with PUT or PATCH, and reads it back with GET to verify. Each step checks the HTTP status code before moving on, and a failed step stops the workflow instead of pushing on with bad data. The workflow is practised offline first, and it is only run against a lab device or a real device with RESTCONF enabled.",
      "syntax": "GET -> build body -> PUT/PATCH -> check status -> GET to verify",
      "exampleCode": "# Change workflow (needs a lab device to run):\n# 1. GET the resource\n# 2. Build the new body from the YANG model\n# 3. PUT or PATCH it\n# 4. Check the status code\n# 5. GET again to verify",
      "exampleLanguage": "python",
      "mistake": "Skipping the final verification GET, so a change that silently failed is never noticed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Designing a RESTCONF Workflow, but it does not work correctly.",
       "buggyCode": "PUT the change\nprint(\"done\")  # never checked the result",
       "fixedCode": "PUT the change\ncheck status code\nGET the resource and compare it with what was sent",
       "explanation": "A successful status code only says the request was accepted; only reading the resource back proves the change is actually in place."
      },
      "exercise": {
       "title": "Practise Designing a RESTCONF Workflow",
       "type": "write-code",
       "instructions": "Print the five steps of the RESTCONF change workflow in order, then print 'workflow ready for the lab' on the last line.",
       "starterCode": "# Print the RESTCONF change workflow.\n# TODO: print the five steps, then 'workflow ready for the lab'.\n",
       "solution": "steps = [\n    \"1. GET the resource to read the current state\",\n    \"2. Build the new body from the YANG model\",\n    \"3. PUT or PATCH the resource\",\n    \"4. Check the status code (200 or 204 means success)\",\n    \"5. GET the resource again to verify\",\n]\nfor step in steps:\n    print(step)\nprint(\"workflow ready for the lab\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. GET the resource to read the current state\n2. Build the new body from the YANG model\n3. PUT or PATCH the resource\n4. Check the status code (200 or 204 means success)\n5. GET the resource again to verify\nworkflow ready for the lab",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "1. GET the resource to read the current state\n2. Build the new body from the YANG model\n3. PUT or PATCH the resource\n4. Check the status code (200 or 204 means success)\n5. GET the resource again to verify\nworkflow ready for the lab",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A RESTCONF workflow for a change reads the current resource with GET, builds the new body from the YANG model, sends it with PUT or PATCH, and reads it back with GET to verify. Each step checks the HTTP status code before moving on, and a failed step stops the workflow instead of pushing on with bad data. The workflow is practised offline first, and it is only run against a lab device or a real device with RESTCONF enabled.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: RESTCONF APIs",
   "type": "write-code",
   "instructions": "Write two helpers: url(path) that joins a RESTCONF data path onto the base https://192.0.2.1/restconf/data, and interface_body(name, description, enabled) that returns the prefixed JSON body for one interface. Print the URL and body for GigabitEthernet1 and for Loopback0.",
   "starterCode": "# Write url() and interface_body() helpers.\n# TODO: define both helpers and print the URL and body for two interfaces.\n",
   "solution": "import json\n\nBASE = \"https://192.0.2.1/restconf/data\"\n\n\ndef url(path):\n    return BASE + \"/\" + path\n\n\ndef interface_body(name, description, enabled):\n    return {\"ietf-interfaces:interface\": {\"name\": name, \"description\": description, \"enabled\": enabled}}\n\n\nprint(url(\"ietf-interfaces:interfaces/interface=GigabitEthernet1\"))\nprint(json.dumps(interface_body(\"GigabitEthernet1\", \"Uplink to core\", True), sort_keys=True))\nprint(url(\"ietf-interfaces:interfaces/interface=Loopback0\"))\nprint(json.dumps(interface_body(\"Loopback0\", \"Management loopback\", True), sort_keys=True))",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\n{\"ietf-interfaces:interface\": {\"description\": \"Uplink to core\", \"enabled\": true, \"name\": \"GigabitEthernet1\"}}\nhttps://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=Loopback0\n{\"ietf-interfaces:interface\": {\"description\": \"Management loopback\", \"enabled\": true, \"name\": \"Loopback0\"}}",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\n{\"ietf-interfaces:interface\": {\"description\": \"Uplink to core\", \"enabled\": true, \"name\": \"GigabitEthernet1\"}}\nhttps://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=Loopback0\n{\"ietf-interfaces:interface\": {\"description\": \"Management loopback\", \"enabled\": true, \"name\": \"Loopback0\"}}",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "RESTCONF APIs brings the whole track together: build correct URLs and YANG-prefixed JSON bodies.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "RESTCONF APIs Capstone Project",
   "description": "A small end-to-end project that puts RESTCONF APIs into practice.",
   "requirements": [
    "Build correct RESTCONF URLs with module prefixes and list keys.",
    "Apply at least three of these skills: RESTCONF URLs, YANG data in JSON, GET PUT PATCH POST DELETE, Status codes and errors.",
    "Use PUT for a full replacement and PATCH for a merge, and say which one each helper performs.",
    "Label clearly that the requests are built locally and sending them needs a lab device."
   ],
   "rubric": [
    "The URLs use module prefixes and the correct datastore path.",
    "The JSON bodies use prefixed keys that match the YANG model.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-restconf-python",
  "slug": "netauto-apis-restconf-python",
  "language": "python",
  "category": "devops",
  "title": "RESTCONF with Python Requests",
  "description": "Learn restconf with python requests for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "requests library",
   "Basic authentication",
   "RESTCONF GET",
   "PUT and PATCH",
   "Building JSON payloads",
   "Error handling",
   "Query parameters",
   "Client modules"
  ],
  "prerequisites": [
   "netauto-apis-restconf"
  ],
  "analogy": "Learning {topic} is like learning to write a letter in a foreign language: the requests library is the postman, and you still have to get the address, the greeting, and the message right.",
  "modules": [
   {
    "id": "netauto-apis-restconf-python-m1",
    "title": "RESTCONF with Python Requests Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-restconf-python-m1-l1",
      "slug": "netauto-apis-restconf-python-m1-l1",
      "title": "Requests Basics for RESTCONF",
      "concept": "The requests library sends HTTP requests from Python, and a RESTCONF call is one requests.get, requests.put, requests.patch, requests.post, or requests.delete call with a URL, headers, and an optional JSON body. The response object carries the status code, the headers, and the body, which is parsed with response.json(). This course shows requests calls as examples and practises them locally by building the same request dictionaries and parsing sample JSON, because sending them needs a lab device with RESTCONF enabled.",
      "syntax": "requests.get(url, headers={\"Accept\": \"application/yang-data+json\"}, timeout=10)",
      "exampleCode": "# Display only -- needs a lab device to run:\n# requests.get(...) -- needs a lab device to run:\n# url = \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\"\n# response = requests.get(url,\n#                         headers={\"Accept\": \"application/yang-data+json\"},\n#                         auth=(\"netconf-user\", \"lab-password\"),\n#                         timeout=10, verify=False)\n# print(response.status_code)\n# print(response.json())",
      "exampleLanguage": "python",
      "mistake": "Calling requests.get without a timeout, so a hung device can block the script forever.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Requests Basics for RESTCONF, but it does not work correctly.",
       "buggyCode": "response = requests.get(url, headers=headers)  # no timeout",
       "fixedCode": "response = requests.get(url, headers=headers, timeout=10)",
       "explanation": "Without a timeout, a request to a device that never answers waits forever; a timeout of ten seconds bounds the wait and lets the script fail cleanly."
      },
      "exercise": {
       "title": "Practise Requests Basics for RESTCONF",
       "type": "write-code",
       "instructions": "Build a GET request dict for the interfaces list (method, URL, Accept header, body None, timeout 10) and print it as sorted, indented JSON.",
       "starterCode": "# Build a GET request dict.\n# TODO: build the request dict and print it as JSON.\n",
       "solution": "import json\n\nrequest = {\n    \"method\": \"GET\",\n    \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\",\n    \"headers\": {\"Accept\": \"application/yang-data+json\"},\n    \"body\": None,\n    \"timeout\": 10,\n}\nprint(json.dumps(request, indent=2, sort_keys=True))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\n  \"body\": null,\n  \"headers\": {\n    \"Accept\": \"application/yang-data+json\"\n  },\n  \"method\": \"GET\",\n  \"timeout\": 10,\n  \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\"\n}",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{\n  \"body\": null,\n  \"headers\": {\n    \"Accept\": \"application/yang-data+json\"\n  },\n  \"method\": \"GET\",\n  \"timeout\": 10,\n  \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\"\n}",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The requests library sends HTTP requests from Python, and a RESTCONF call is one requests.get, requests.put, requests.patch, requests.post, or requests.delete call with a URL, headers, and an optional JSON body. The response object carries the status code, the headers, and the body, which is parsed with response.json(). This course shows requests calls as examples and practises them locally by building the same request dictionaries and parsing sample JSON, because sending them needs a lab device with RESTCONF enabled.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-restconf-python-m1-l2",
      "slug": "netauto-apis-restconf-python-m1-l2",
      "title": "Authentication and Headers",
      "concept": "RESTCONF servers check who is calling, and the usual ways to prove it are HTTP Basic authentication, which sends a base64-encoded username and password in the Authorization header, or a bearer token in the same header. Basic authentication is only safe over HTTPS, because over plain HTTP the credentials travel in the open. The header must be built exactly as the server expects, with no extra spaces or missing colons.",
      "syntax": "{\"Authorization\": \"Basic <base64>\", \"Accept\": \"application/yang-data+json\"}",
      "exampleCode": "import base64\n\ntoken = base64.b64encode(b\"netconf-user:lab-password\").decode(\"ascii\")\nheaders = {\"Authorization\": \"Basic \" + token,\n           \"Accept\": \"application/yang-data+json\"}",
      "exampleLanguage": "python",
      "mistake": "Sending Basic authentication over plain http:// instead of https://, which exposes the credentials.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Authentication and Headers, but it does not work correctly.",
       "buggyCode": "requests.get(\"http://192.0.2.1/restconf/data/...\", auth=(\"user\", \"pass\"))",
       "fixedCode": "requests.get(\"https://192.0.2.1/restconf/data/...\", auth=(\"user\", \"pass\"))",
       "explanation": "Basic authentication is only a base64 encoding, not encryption, so over plain HTTP anyone on the path can read the credentials; it must only be used over HTTPS."
      },
      "exercise": {
       "title": "Practise Authentication and Headers",
       "type": "write-code",
       "instructions": "Build a Basic authentication header from the username netconf-user and password lab-password using base64, then print the Authorization header, the Accept header, and the first eight characters of the token.",
       "starterCode": "# Build the Basic auth header.\n# TODO: base64-encode 'username:password' and print the headers.\n",
       "solution": "import base64\n\nusername = \"netconf-user\"\npassword = \"lab-password\"\ntoken = base64.b64encode((username + \":\" + password).encode(\"ascii\")).decode(\"ascii\")\nheaders = {\n    \"Authorization\": \"Basic \" + token,\n    \"Accept\": \"application/yang-data+json\",\n}\nprint(\"Authorization:\", headers[\"Authorization\"])\nprint(\"Accept:\", headers[\"Accept\"])\nprint(\"basic token starts with:\", token[:8])",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Authorization: Basic bmV0Y29uZi11c2VyOmxhYi1wYXNzd29yZA==\nAccept: application/yang-data+json\nbasic token starts with: bmV0Y29u",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "Authorization: Basic bmV0Y29uZi11c2VyOmxhYi1wYXNzd29yZA==\nAccept: application/yang-data+json\nbasic token starts with: bmV0Y29u",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "RESTCONF servers check who is calling, and the usual ways to prove it are HTTP Basic authentication, which sends a base64-encoded username and password in the Authorization header, or a bearer token in the same header. Basic authentication is only safe over HTTPS, because over plain HTTP the credentials travel in the open. The header must be built exactly as the server expects, with no extra spaces or missing colons.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-restconf-python-m1-l3",
      "slug": "netauto-apis-restconf-python-m1-l3",
      "title": "Reading Data with GET",
      "concept": "A RESTCONF GET in Python is requests.get with the resource URL and the Accept header set to application/yang-data+json, and the reply is read with response.json(). The status code must be checked before parsing: a 404 means the resource does not exist, and parsing its error body as data gives nonsense. A GET that returns 200 can be parsed straight into the dictionaries the rest of the program uses.",
      "syntax": "response = requests.get(url, headers=headers, timeout=10)\ndata = response.json()",
      "exampleCode": "# Display only -- needs a lab device to run:\n# response = requests.get(url, headers=headers, timeout=10)\n# if response.status_code == 200:\n#     data = response.json()\n#     print(data[\"ietf-interfaces:interfaces\"])",
      "exampleLanguage": "python",
      "mistake": "Calling response.json() before checking the status code, so a 404 error body is treated as interface data.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reading Data with GET, but it does not work correctly.",
       "buggyCode": "response = requests.get(url, headers=headers)\ndata = response.json()  # may be an error body, not data",
       "fixedCode": "response = requests.get(url, headers=headers)\nif response.status_code == 200:\n    data = response.json()",
       "explanation": "An error response is still valid JSON, so parsing it without checking the status code turns an error into data that looks real but is not."
      },
      "exercise": {
       "title": "Check your understanding: Reading Data with GET",
       "type": "multiple-choice",
       "instructions": "Which statement about Reading Data with GET is correct?",
       "starterCode": "",
       "solution": "A RESTCONF GET in Python is requests.",
       "solutionExplanation": "A RESTCONF GET in Python is requests. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A RESTCONF GET in Python is requests.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Reading Data with GET from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A RESTCONF GET in Python is requests.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-restconf-python-m1-l4",
      "slug": "netauto-apis-restconf-python-m1-l4",
      "title": "Writing Data with PUT and PATCH",
      "concept": "A RESTCONF write in Python is requests.put or requests.patch with the resource URL, the Content-Type header set to application/yang-data+json, and the body passed as the json argument. PUT sends the complete resource and PATCH sends only the changed fields, so the body for a PATCH is usually much smaller. A 204 status code means the change was applied with no body to parse, and a 200 means the server returned the updated resource.",
      "syntax": "requests.put(url, json=body, headers=headers, timeout=10)",
      "exampleCode": "# Display only -- needs a lab device to run:\n# body = {\"ietf-interfaces:interface\": {\"description\": \"Uplink to core\"}}\n# response = requests.patch(url, json=body, headers=headers, timeout=10)\n# print(response.status_code)  # 204 means applied",
      "exampleLanguage": "python",
      "mistake": "Passing the body as data=json.dumps(body) without a Content-Type header, so the server does not know the body is YANG JSON.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Writing Data with PUT and PATCH, but it does not work correctly.",
       "buggyCode": "requests.patch(url, data=json.dumps(body))  # no Content-Type",
       "fixedCode": "requests.patch(url, json=body, headers=headers)  # sets Content-Type",
       "explanation": "The json argument sets the Content-Type header to application/json automatically and serialises the dict; the data argument sends raw text with no content type at all."
      },
      "exercise": {
       "title": "Check your understanding: Writing Data with PUT and PATCH",
       "type": "multiple-choice",
       "instructions": "Which statement about Writing Data with PUT and PATCH is correct?",
       "starterCode": "",
       "solution": "A RESTCONF write in Python is requests.",
       "solutionExplanation": "A RESTCONF write in Python is requests. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A RESTCONF write in Python is requests.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Writing Data with PUT and PATCH from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A RESTCONF write in Python is requests.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-restconf-python-m1-l5",
      "slug": "netauto-apis-restconf-python-m1-l5",
      "title": "Building RESTCONF Payloads in Python",
      "concept": "A RESTCONF payload is built in Python as a dictionary that mirrors the YANG model, with prefixed keys such as ietf-interfaces:interface and values of the right JSON types. The dictionary is turned into JSON with json.dumps, and the same dictionary can be reused for several interfaces by filling in different values. Building the payload from variables instead of writing JSON by hand stops typos in names and keeps numbers as numbers instead of strings.",
      "syntax": "{\"ietf-interfaces:interface\": {\"name\": name, \"description\": desc, \"enabled\": True}}",
      "exampleCode": "import json\n\n\ndef interface_payload(name, description, enabled):\n    return {\"ietf-interfaces:interface\": {\n        \"name\": name, \"description\": description, \"enabled\": enabled}}\n\nprint(json.dumps(interface_payload(\"GigabitEthernet1\", \"Uplink to core\", True)))",
      "exampleLanguage": "python",
      "mistake": "Building the payload with an f-string, which turns numbers into strings and breaks on quotes in a description.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building RESTCONF Payloads in Python, but it does not work correctly.",
       "buggyCode": "body = '{\"ietf-interfaces:interface\": {\"name\": \"%s\", \"mtu\": \"%s\"}}' % (name, mtu)",
       "fixedCode": "body = {\"ietf-interfaces:interface\": {\"name\": name, \"mtu\": mtu}}\njson.dumps(body)  # numbers stay numbers, quotes are escaped",
       "explanation": "String formatting cannot tell a number from a string and breaks on special characters; building a dict and calling json.dumps keeps the types right and escapes values correctly."
      },
      "exercise": {
       "title": "Practise Building RESTCONF Payloads in Python",
       "type": "write-code",
       "instructions": "Write interface_payload(name, description, enabled, mtu=None) that returns the prefixed body dict, adding mtu only when given. Print the JSON for GigabitEthernet1 (mtu 9000) and Loopback0 (no mtu).",
       "starterCode": "# Write interface_payload and print two payloads.\n# TODO: define the function and print both payloads as JSON.\n",
       "solution": "import json\n\n\ndef interface_payload(name, description, enabled, mtu=None):\n    iface = {\"name\": name, \"description\": description, \"enabled\": enabled}\n    if mtu is not None:\n        iface[\"mtu\"] = mtu\n    return {\"ietf-interfaces:interface\": iface}\n\n\nprint(json.dumps(interface_payload(\"GigabitEthernet1\", \"Uplink to core\", True, 9000), sort_keys=True))\nprint(json.dumps(interface_payload(\"Loopback0\", \"Management loopback\", True), sort_keys=True))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\"ietf-interfaces:interface\": {\"description\": \"Uplink to core\", \"enabled\": true, \"mtu\": 9000, \"name\": \"GigabitEthernet1\"}}\n{\"ietf-interfaces:interface\": {\"description\": \"Management loopback\", \"enabled\": true, \"name\": \"Loopback0\"}}",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{\"ietf-interfaces:interface\": {\"description\": \"Uplink to core\", \"enabled\": true, \"mtu\": 9000, \"name\": \"GigabitEthernet1\"}}\n{\"ietf-interfaces:interface\": {\"description\": \"Management loopback\", \"enabled\": true, \"name\": \"Loopback0\"}}",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A RESTCONF payload is built in Python as a dictionary that mirrors the YANG model, with prefixed keys such as ietf-interfaces:interface and values of the right JSON types. The dictionary is turned into JSON with json.dumps, and the same dictionary can be reused for several interfaces by filling in different values. Building the payload from variables instead of writing JSON by hand stops typos in names and keeps numbers as numbers instead of strings.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-restconf-python-m2",
    "title": "RESTCONF with Python Requests in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-apis-restconf-python-m2-l1",
      "slug": "netauto-apis-restconf-python-m2-l1",
      "title": "Handling Errors and Timeouts",
      "concept": "A RESTCONF call can fail in several ways, and each one needs a different response: a 4xx status means the request was wrong and retrying it unchanged will fail again, a 5xx status means the server failed and a retry may work, and a timeout means the server did not answer in time. A good script checks the status code first, prints the error body for a 4xx, and only retries on 5xx or timeouts, with a limit so it never loops forever.",
      "syntax": "if response.status_code == 200: ...\nelif response.status_code == 404: ...",
      "exampleCode": "import json\n\n\ndef is_success(status):\n    return status in (200, 201, 204)\n\nprint(is_success(200), is_success(404), is_success(500))",
      "exampleLanguage": "python",
      "mistake": "Retrying a 400 Bad Request in a loop, when the request itself is wrong and will fail the same way every time.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handling Errors and Timeouts, but it does not work correctly.",
       "buggyCode": "while True:\n    response = requests.put(url, json=body)  # 400 every time",
       "fixedCode": "response = requests.put(url, json=body)\nif response.status_code == 400:\n    print(\"fix the request:\", response.text)\nelif response.status_code >= 500:\n    print(\"server error, retry once\")",
       "explanation": "A 400 means the request is wrong, so retrying it unchanged just repeats the failure; only 5xx errors and timeouts are worth retrying."
      },
      "exercise": {
       "title": "Practise Handling Errors and Timeouts",
       "type": "write-code",
       "instructions": "Write classify(status) returning 'success' for 200/201/204, a client-error message for 4xx, and a server-error message for 5xx. Print the classification for 200, 201, 204, 400, 404, 500 and 503.",
       "starterCode": "# Write classify(status) and print seven classifications.\n# TODO: define classify and print the results.\n",
       "solution": "def classify(status):\n    if status in (200, 201, 204):\n        return \"success\"\n    if 400 <= status < 500:\n        return \"client error: fix the request, do not retry\"\n    if 500 <= status < 600:\n        return \"server error: retry once, then stop\"\n    return \"unknown status\"\n\n\nfor status in (200, 201, 204, 400, 404, 500, 503):\n    print(status, \"->\", classify(status))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "200 -> success\n201 -> success\n204 -> success\n400 -> client error: fix the request, do not retry\n404 -> client error: fix the request, do not retry\n500 -> server error: retry once, then stop\n503 -> server error: retry once, then stop",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "200 -> success\n201 -> success\n204 -> success\n400 -> client error: fix the request, do not retry\n404 -> client error: fix the request, do not retry\n500 -> server error: retry once, then stop\n503 -> server error: retry once, then stop",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A RESTCONF call can fail in several ways, and each one needs a different response: a 4xx status means the request was wrong and retrying it unchanged will fail again, a 5xx status means the server failed and a retry may work, and a timeout means the server did not answer in time. A good script checks the status code first, prints the error body for a 4xx, and only retries on 5xx or timeouts, with a limit so it never loops forever.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-restconf-python-m2-l2",
      "slug": "netauto-apis-restconf-python-m2-l2",
      "title": "Paginating and Filtering Results",
      "concept": "A device with thousands of interfaces returns a huge reply to a plain GET, so RESTCONF offers fields to select only the needed fields, depth to limit the tree, and filter to apply an XPath expression. In Python the reply is then a smaller dictionary, and the program works through it page by page instead of holding everything at once. Fetching only what you need is faster, uses less memory, and puts less load on the device.",
      "syntax": "requests.get(url + \"?fields=name;enabled\", headers=headers)",
      "exampleCode": "# Display only -- needs a lab device to run:\n# url = base + \"/ietf-interfaces:interfaces?fields=name;enabled\"\n# response = requests.get(url, headers=headers, timeout=10)\n# names = [i[\"name\"] for i in response.json()[\"ietf-interfaces:interfaces\"][\"interface\"]]",
      "exampleLanguage": "python",
      "mistake": "Fetching the full interfaces tree for a device with ten thousand interfaces just to get their names.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Paginating and Filtering Results, but it does not work correctly.",
       "buggyCode": "response = requests.get(base + \"/ietf-interfaces:interfaces\")  # everything",
       "fixedCode": "response = requests.get(base + \"/ietf-interfaces:interfaces?fields=name\")",
       "explanation": "A fields query parameter makes the device return only the names, which is a small reply instead of a huge one that has to be parsed and thrown away."
      },
      "exercise": {
       "title": "Check your understanding: Paginating and Filtering Results",
       "type": "multiple-choice",
       "instructions": "Which statement about Paginating and Filtering Results is correct?",
       "starterCode": "",
       "solution": "A device with thousands of interfaces returns a huge reply to a plain GET, so RESTCONF offers fields to select only the needed fields, depth to limit the tree, and filter to apply an XPath expression.",
       "solutionExplanation": "A device with thousands of interfaces returns a huge reply to a plain GET, so RESTCONF offers fields to select only the needed fields, depth to limit the tree, and filter to apply an XPath expression. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A device with thousands of interfaces returns a huge reply to a plain GET, so RESTCONF offers fields to select only the needed fields, depth to limit the tree, and filter to apply an XPath expression.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Paginating and Filtering Results from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A device with thousands of interfaces returns a huge reply to a plain GET, so RESTCONF offers fields to select only the needed fields, depth to limit the tree, and filter to apply an XPath expression.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-restconf-python-m2-l3",
      "slug": "netauto-apis-restconf-python-m2-l3",
      "title": "Sessions and Connection Reuse",
      "concept": "A requests.Session object keeps one connection open and reuses it for many RESTCONF calls, which is much faster than opening a new HTTPS connection for every request. The session also holds the headers and authentication that every call needs, so they are set once instead of repeated. A session must be closed when the work is done, and a with requests.Session() as s block does that automatically.",
      "syntax": "with requests.Session() as s:\n    s.headers.update({...})\n    s.get(url)",
      "exampleCode": "# Display only -- needs a lab device to run:\n# with requests.Session() as s:\n#     s.auth = (\"netconf-user\", \"lab-password\")\n#     s.headers.update({\"Accept\": \"application/yang-data+json\"})\n#     print(s.get(url1).status_code)\n#     print(s.get(url2).status_code)",
      "exampleLanguage": "python",
      "mistake": "Creating a new requests.get call with fresh authentication for every one of a hundred resources, opening a hundred HTTPS connections.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Sessions and Connection Reuse, but it does not work correctly.",
       "buggyCode": "for url in urls:\n    requests.get(url, auth=(user, password))  # new connection each time",
       "fixedCode": "with requests.Session() as s:\n    s.auth = (user, password)\n    for url in urls:\n        s.get(url)  # one connection, reused",
       "explanation": "A session reuses one connection and one set of credentials for all the calls, which is faster and puts less load on the device than a new connection per request."
      },
      "exercise": {
       "title": "Check your understanding: Sessions and Connection Reuse",
       "type": "multiple-choice",
       "instructions": "Which statement about Sessions and Connection Reuse is correct?",
       "starterCode": "",
       "solution": "A requests.",
       "solutionExplanation": "A requests. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A requests.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Sessions and Connection Reuse from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A requests.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-restconf-python-m2-l4",
      "slug": "netauto-apis-restconf-python-m2-l4",
      "title": "A RESTCONF Client Module",
      "concept": "A RESTCONF client module wraps the repetitive parts of every call into one place: the base URL, the authentication header, the Accept header, and a helper that sends a request and checks the status code. The rest of the program then calls small methods like get_interface or set_description instead of repeating URLs and headers. Keeping the client in one module means a change to authentication or the base URL is made once, not in every script.",
      "syntax": "class RestconfClient:\n    def get_request(self, path): ...",
      "exampleCode": "import json\n\n\nclass RestconfClient:\n    def __init__(self, base_url):\n        self.base_url = base_url\n\n    def url(self, path):\n        return self.base_url + \"/restconf/data/\" + path\n\n\nclient = RestconfClient(\"https://192.0.2.1\")\nprint(client.url(\"ietf-interfaces:interfaces\"))",
      "exampleLanguage": "python",
      "mistake": "Copying the base URL, headers, and auth into every function that makes a RESTCONF call, so a change to any of them means editing ten places.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A RESTCONF Client Module, but it does not work correctly.",
       "buggyCode": "def get_interfaces():\n    return requests.get(\"https://192.0.2.1/restconf/data/...\", headers={...})",
       "fixedCode": "class RestconfClient:\n    def __init__(self, base_url):\n        self.base_url = base_url\n        self.headers = {\"Accept\": \"application/yang-data+json\"}",
       "explanation": "Duplicated URLs and headers drift apart when one copy is updated and another is not; one client class holds them once and every call uses the same values."
      },
      "exercise": {
       "title": "Practise A RESTCONF Client Module",
       "type": "write-code",
       "instructions": "Write a RestconfClient class with a url(path) method and get_request/patch_request methods that return request dicts. Print the GET request dict for the interfaces list and the URL for one interface.",
       "starterCode": "# Write the RestconfClient class.\n# TODO: define the class, build a client, and print the GET request and one URL.\n",
       "solution": "import json\n\n\nclass RestconfClient:\n    def __init__(self, base_url):\n        self.base_url = base_url\n\n    def url(self, path):\n        return self.base_url + \"/restconf/data/\" + path\n\n    def get_request(self, path):\n        return {\"method\": \"GET\", \"url\": self.url(path),\n                \"headers\": {\"Accept\": \"application/yang-data+json\"}}\n\n    def patch_request(self, path, body):\n        return {\"method\": \"PATCH\", \"url\": self.url(path),\n                \"headers\": {\"Accept\": \"application/yang-data+json\",\n                            \"Content-Type\": \"application/yang-data+json\"},\n                \"body\": body}\n\n\nclient = RestconfClient(\"https://192.0.2.1\")\nprint(json.dumps(client.get_request(\"ietf-interfaces:interfaces\"), sort_keys=True))\nprint(client.url(\"ietf-interfaces:interfaces/interface=GigabitEthernet1\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\"headers\": {\"Accept\": \"application/yang-data+json\"}, \"method\": \"GET\", \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\"}\nhttps://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{\"headers\": {\"Accept\": \"application/yang-data+json\"}, \"method\": \"GET\", \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\"}\nhttps://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A RESTCONF client module wraps the repetitive parts of every call into one place: the base URL, the authentication header, the Accept header, and a helper that sends a request and checks the status code. The rest of the program then calls small methods like get_interface or set_description instead of repeating URLs and headers. Keeping the client in one module means a change to authentication or the base URL is made once, not in every script.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-restconf-python-m2-l5",
      "slug": "netauto-apis-restconf-python-m2-l5",
      "title": "Testing Without a Device",
      "concept": "Code that talks to a device should be testable without a device, and the usual way is to put the HTTP call behind a small transport function that the tests replace with a fake. The fake returns a fixed status code and body, so the test checks the parsing and the error handling without any network. A function that only works when a real device answers cannot be tested in CI, and a function tested only against a live device cannot be trusted to behave on errors.",
      "syntax": "class FakeTransport:\n    def get(self, url): return 200, {...}",
      "exampleCode": "def parse_interfaces(body):\n    interfaces = body[\"ietf-interfaces:interfaces\"][\"interface\"]\n    return {i[\"name\"]: i[\"enabled\"] for i in interfaces}\n\n\nbody = {\"ietf-interfaces:interfaces\": {\"interface\": [\n    {\"name\": \"GigabitEthernet1\", \"enabled\": True}]}}\nprint(parse_interfaces(body))",
      "exampleLanguage": "python",
      "mistake": "Writing the parsing code inside the function that makes the HTTP call, so it can only be tested against a live device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testing Without a Device, but it does not work correctly.",
       "buggyCode": "def get_interface_states():\n    response = requests.get(url)  # parsing buried inside\n    return {i[\"name\"]: i[\"enabled\"] for i in response.json()[...][\"interface\"]}",
       "fixedCode": "def parse_interfaces(body):  # pure function, testable offline\n    return {i[\"name\"]: i[\"enabled\"] for i in body[\"ietf-interfaces:interfaces\"][\"interface\"]}",
       "explanation": "Parsing buried inside the HTTP call cannot be tested without a device; a pure parse function takes a body dict and can be tested with a fake one."
      },
      "exercise": {
       "title": "Practise Testing Without a Device",
       "type": "write-code",
       "instructions": "Write parse_interfaces(body) that turns a RESTCONF JSON body into a dict of name to enabled, plus a FakeTransport whose get returns a 200 status and a sample body. Print the status, each interface sorted by name, and 'offline test passed'.",
       "starterCode": "# Test the parser with a fake transport.\n# TODO: define parse_interfaces and FakeTransport, then print the results.\n",
       "solution": "def parse_interfaces(body):\n    interfaces = body[\"ietf-interfaces:interfaces\"][\"interface\"]\n    return {i[\"name\"]: i[\"enabled\"] for i in interfaces}\n\n\nclass FakeTransport:\n    def get(self, url):\n        return 200, {\"ietf-interfaces:interfaces\": {\"interface\": [\n            {\"name\": \"GigabitEthernet1\", \"enabled\": True},\n            {\"name\": \"Loopback0\", \"enabled\": True},\n        ]}}\n\n\ntransport = FakeTransport()\nstatus, body = transport.get(\"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces\")\nprint(\"status:\", status)\nfor name, enabled in sorted(parse_interfaces(body).items()):\n    print(name + \": enabled=\" + str(enabled))\nprint(\"offline test passed\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "status: 200\nGigabitEthernet1: enabled=True\nLoopback0: enabled=True\noffline test passed",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "status: 200\nGigabitEthernet1: enabled=True\nLoopback0: enabled=True\noffline test passed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Code that talks to a device should be testable without a device, and the usual way is to put the HTTP call behind a small transport function that the tests replace with a fake. The fake returns a fixed status code and body, so the test checks the parsing and the error handling without any network. A function that only works when a real device answers cannot be tested in CI, and a function tested only against a live device cannot be trusted to behave on errors.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: RESTCONF with Python Requests",
   "type": "write-code",
   "instructions": "Build a RestconfClient class that stores the base URL and builds Basic auth headers, with get_interface(name) and set_description(name, description) methods returning request dicts. Print both request dicts as sorted, indented JSON for GigabitEthernet1.",
   "starterCode": "# Build the RestconfClient class.\n# TODO: define the class, build a client, and print the two request dicts.\n",
   "solution": "import base64\nimport json\n\n\nclass RestconfClient:\n    def __init__(self, base_url, username, password):\n        self.base_url = base_url\n        token = base64.b64encode((username + \":\" + password).encode(\"ascii\")).decode(\"ascii\")\n        self.headers = {\"Authorization\": \"Basic \" + token,\n                        \"Accept\": \"application/yang-data+json\",\n                        \"Content-Type\": \"application/yang-data+json\"}\n\n    def url(self, path):\n        return self.base_url + \"/restconf/data/\" + path\n\n    def get_interface(self, name):\n        return {\"method\": \"GET\", \"url\": self.url(\"ietf-interfaces:interfaces/interface=\" + name),\n                \"headers\": self.headers}\n\n    def set_description(self, name, description):\n        body = {\"ietf-interfaces:interface\": {\"name\": name, \"description\": description}}\n        return {\"method\": \"PATCH\", \"url\": self.url(\"ietf-interfaces:interfaces/interface=\" + name),\n                \"headers\": self.headers, \"body\": body}\n\n\nclient = RestconfClient(\"https://192.0.2.1\", \"netconf-user\", \"lab-password\")\nprint(json.dumps(client.get_interface(\"GigabitEthernet1\"), indent=2, sort_keys=True))\nprint(json.dumps(client.set_description(\"GigabitEthernet1\", \"Uplink to core\"), indent=2, sort_keys=True))",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "{\n  \"headers\": {\n    \"Accept\": \"application/yang-data+json\",\n    \"Authorization\": \"Basic bmV0Y29uZi11c2VyOmxhYi1wYXNzd29yZA==\",\n    \"Content-Type\": \"application/yang-data+json\"\n  },\n  \"method\": \"GET\",\n  \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\"\n}\n{\n  \"body\": {\n    \"ietf-interfaces:interface\": {\n      \"description\": \"Uplink to core\",\n      \"name\": \"GigabitEthernet1\"\n    }\n  },\n  \"headers\": {\n    \"Accept\": \"application/yang-data+json\",\n    \"Authorization\": \"Basic bmV0Y29uZi11c2VyOmxhYi1wYXNzd29yZA==\",\n    \"Content-Type\": \"application/yang-data+json\"\n  },\n  \"method\": \"PATCH\",\n  \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\"\n}",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "{\n  \"headers\": {\n    \"Accept\": \"application/yang-data+json\",\n    \"Authorization\": \"Basic bmV0Y29uZi11c2VyOmxhYi1wYXNzd29yZA==\",\n    \"Content-Type\": \"application/yang-data+json\"\n  },\n  \"method\": \"GET\",\n  \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\"\n}\n{\n  \"body\": {\n    \"ietf-interfaces:interface\": {\n      \"description\": \"Uplink to core\",\n      \"name\": \"GigabitEthernet1\"\n    }\n  },\n  \"headers\": {\n    \"Accept\": \"application/yang-data+json\",\n    \"Authorization\": \"Basic bmV0Y29uZi11c2VyOmxhYi1wYXNzd29yZA==\",\n    \"Content-Type\": \"application/yang-data+json\"\n  },\n  \"method\": \"PATCH\",\n  \"url\": \"https://192.0.2.1/restconf/data/ietf-interfaces:interfaces/interface=GigabitEthernet1\"\n}",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "RESTCONF with Python Requests brings the whole track together: a small client module with auth, headers and request builders.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "RESTCONF with Python Requests Capstone Project",
   "description": "A small end-to-end project that puts RESTCONF with Python Requests into practice.",
   "requirements": [
    "Build a client class that holds the base URL, auth header, and Accept/Content-Type headers.",
    "Apply at least three of these skills: Basic authentication, Building JSON payloads, PUT and PATCH, Error handling.",
    "Keep the HTTP call behind a method so the parsing can be tested offline with a fake transport.",
    "Label clearly that sending the requests needs a lab device with RESTCONF enabled."
   ],
   "rubric": [
    "The client builds correct URLs, headers, and prefixed JSON bodies.",
    "Basic auth is built with base64 and only used over HTTPS.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-pyang",
  "slug": "netauto-apis-pyang",
  "language": "python",
  "category": "devops",
  "title": "YANG Validation and pyang",
  "description": "Learn yang validation and pyang for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "YANG validation",
   "pyang",
   "Syntax and semantics",
   "Data validation",
   "Tree diagrams",
   "Model errors",
   "Revisions",
   "Linting in CI"
  ],
  "prerequisites": [
   "netauto-apis-yang"
  ],
  "analogy": "Learning {topic} is like learning to proofread a contract: the checks are boring, but they are what stop a bad clause from costing you later.",
  "modules": [
   {
    "id": "netauto-apis-pyang-m1",
    "title": "YANG Validation and pyang Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-pyang-m1-l1",
      "slug": "netauto-apis-pyang-m1-l1",
      "title": "Why Validate YANG?",
      "concept": "Validating a YANG model means checking that it follows the language rules and that data written against it obeys its types and constraints, and catching problems before they reach a device. A model with a syntax error cannot be loaded at all, and data that breaks a constraint is rejected by the device, so validation saves failed changes and confusing errors. pyang is the standard open-source tool for checking YANG models, but it is not installed in this sandbox, so this track teaches the checks as Python programs that validate structure and data directly.",
      "syntax": "pyang --strict model.yang   # pyang is not installed here; checks are practised in Python",
      "exampleCode": "# A YANG module must contain at least:\n#   module <name> { namespace \"...\"; prefix ...; }\n# Missing any of these makes the module unloadable.\n# pyang --strict model.yang reports the problems (not installed here).",
      "exampleLanguage": "python",
      "mistake": "Loading an unvalidated model onto a device and discovering the error only when the device rejects it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Why Validate YANG?, but it does not work correctly.",
       "buggyCode": "# copy model.yang to the device and hope it loads",
       "fixedCode": "# validate first: pyang --strict model.yang (or the Python checks here)",
       "explanation": "A model that fails validation cannot be loaded at all, so checking it before it reaches the device saves a failed change and a confusing error."
      },
      "exercise": {
       "title": "Practise Why Validate YANG?",
       "type": "write-code",
       "instructions": "Check the module text in the starter code for the six required statements (module, namespace, prefix, container, list, key) and print the missing ones, or 'none', then print 'valid' or 'invalid'.",
       "starterCode": "# Check the module text for required statements.\n# TODO: find the missing statements and print the result.\nmodule_text = \"\"\"module example-interfaces {\n  namespace \"urn:example:interfaces\";\n  prefix ex-if;\n  container interfaces {\n    list interface {\n      key \"name\";\n      leaf name { type string; }\n    }\n  }\n}\"\"\"\n",
       "solution": "module_text = \"\"\"module example-interfaces {\n  namespace \"urn:example:interfaces\";\n  prefix ex-if;\n  container interfaces {\n    list interface {\n      key \"name\";\n      leaf name { type string; }\n    }\n  }\n}\"\"\"\nrequired = [\"module \", \"namespace \", \"prefix \", \"container \", \"list \", \"key \"]\nmissing = [r.strip() for r in required if r not in module_text]\nprint(\"missing:\", missing if missing else \"none\")\nprint(\"valid\" if not missing else \"invalid\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "missing: none\nvalid",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "missing: none\nvalid",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating a YANG model means checking that it follows the language rules and that data written against it obeys its types and constraints, and catching problems before they reach a device. A model with a syntax error cannot be loaded at all, and data that breaks a constraint is rejected by the device, so validation saves failed changes and confusing errors. pyang is the standard open-source tool for checking YANG models, but it is not installed in this sandbox, so this track teaches the checks as Python programs that validate structure and data directly.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-pyang-m1-l2",
      "slug": "netauto-apis-pyang-m1-l2",
      "title": "pyang Basics",
      "concept": "pyang is a command-line tool that reads YANG files and checks them, and its basic use is pyang --strict model.yang, which reports errors and warnings about the model. pyang can also print a model as a tree with pyang -f tree, convert it to other formats, and check that data in XML or JSON matches the model. Because pyang is not installed in this sandbox, this track practises the same checks in Python: parsing headers, walking the tree, and testing values against constraints.",
      "syntax": "pyang --strict model.yang\npyang -f tree model.yang",
      "exampleCode": "# pyang (not installed in this sandbox) reads YANG files:\n#   pyang --strict model.yang   check the model\n#   pyang -f tree model.yang    print the tree\n#   pyang -f yang model.yang    print the normalised model\n# The same checks are practised in Python in this track.",
      "exampleLanguage": "python",
      "mistake": "Running pyang on a file and ignoring its warnings, when a warning often points at a real modelling mistake.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate pyang Basics, but it does not work correctly.",
       "buggyCode": "$ pyang model.yang\n# warnings printed, ignored, model shipped anyway",
       "fixedCode": "$ pyang --strict model.yang\n# warnings become errors; fix them before shipping",
       "explanation": "pyang warnings usually mean the model is ambiguous or incomplete; --strict turns them into errors so they cannot be ignored."
      },
      "exercise": {
       "title": "Practise pyang Basics",
       "type": "write-code",
       "instructions": "Parse the YANG module header text in the starter code into a dict of module, namespace, prefix and revision, and print each field on its own labelled line.",
       "starterCode": "# Parse a YANG module header.\n# TODO: parse header_text and print the four fields.\nheader_text = \"\"\"module ietf-interfaces {\n  namespace \"urn:ietf:params:xml:ns:yang:ietf-interfaces\";\n  prefix if;\n  revision 2018-02-20;\n}\"\"\"\n",
       "solution": "header_text = \"\"\"module ietf-interfaces {\n  namespace \"urn:ietf:params:xml:ns:yang:ietf-interfaces\";\n  prefix if;\n  revision 2018-02-20;\n}\"\"\"\nheader = {}\nfor line in header_text.splitlines():\n    parts = line.strip().rstrip(\";\").split(None, 1)\n    if len(parts) == 2 and parts[0] in (\"module\", \"namespace\", \"prefix\", \"revision\"):\n        header[parts[0]] = parts[1].strip('\"')\nprint(\"module:\", header[\"module\"])\nprint(\"namespace:\", header[\"namespace\"])\nprint(\"prefix:\", header[\"prefix\"])\nprint(\"revision:\", header[\"revision\"])",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "module: ietf-interfaces {\nnamespace: urn:ietf:params:xml:ns:yang:ietf-interfaces\nprefix: if\nrevision: 2018-02-20",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "module: ietf-interfaces {\nnamespace: urn:ietf:params:xml:ns:yang:ietf-interfaces\nprefix: if\nrevision: 2018-02-20",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "pyang is a command-line tool that reads YANG files and checks them, and its basic use is pyang --strict model.yang, which reports errors and warnings about the model. pyang can also print a model as a tree with pyang -f tree, convert it to other formats, and check that data in XML or JSON matches the model. Because pyang is not installed in this sandbox, this track practises the same checks in Python: parsing headers, walking the tree, and testing values against constraints.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-pyang-m1-l3",
      "slug": "netauto-apis-pyang-m1-l3",
      "title": "Checking Syntax and Semantics",
      "concept": "Syntax checking catches the mistakes a parser can see, such as a missing semicolon, an unclosed brace, or a statement in the wrong place. Semantic checking catches the mistakes a parser cannot see, such as a uses statement naming a grouping that does not exist, or a leaf referencing a type that was never defined. pyang does both, and a model must pass both before it can be used.",
      "syntax": "pyang --strict model.yang   # syntax + semantics",
      "exampleCode": "# Syntax error:   missing semicolon, unclosed brace\n# Semantic error: uses a grouping that does not exist,\n#                 a leaf with an unknown type,\n#                 a list without a key",
      "exampleLanguage": "python",
      "mistake": "Assuming a model is correct because it parses, when a uses statement can name a grouping that was never defined.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Checking Syntax and Semantics, but it does not work correctly.",
       "buggyCode": "grouping address { leaf ip { type string; } }\ncontainer a { uses address; }   # parses fine\ncontainer b { uses location; }  # parses, but \"location\" does not exist",
       "fixedCode": "grouping address { leaf ip { type string; } }\ngrouping location { leaf city { type string; } }\ncontainer b { uses location; }  # now the grouping exists",
       "explanation": "Parsing only checks the shape of the text; semantic checking resolves every reference, and an undefined grouping is an error even though the file parses."
      },
      "exercise": {
       "title": "Check your understanding: Checking Syntax and Semantics",
       "type": "multiple-choice",
       "instructions": "Which statement about Checking Syntax and Semantics is correct?",
       "starterCode": "",
       "solution": "Syntax checking catches the mistakes a parser can see, such as a missing semicolon, an unclosed brace, or a statement in the wrong place.",
       "solutionExplanation": "Syntax checking catches the mistakes a parser can see, such as a missing semicolon, an unclosed brace, or a statement in the wrong place. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Syntax checking catches the mistakes a parser can see, such as a missing semicolon, an unclosed brace, or a statement in the wrong place.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Checking Syntax and Semantics from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "Syntax checking catches the mistakes a parser can see, such as a missing semicolon, an unclosed brace, or a statement in the wrong place.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-pyang-m1-l4",
      "slug": "netauto-apis-pyang-m1-l4",
      "title": "Validating Data Against a Model",
      "concept": "Validating data against a model means checking that every value in a configuration matches the leaf that defines it: the right type, inside the range or length, and present when the leaf is mandatory. A device runs the same checks when it receives a configuration, and it rejects the whole change if any value fails. Validating locally first means the device never sees bad data, and the error message names the exact leaf that is wrong.",
      "syntax": "pyang --data model.yang data.json   # conceptually; practised in Python here",
      "exampleCode": "# Data: {\"name\": \"eth0\", \"mtu\": 1500}\n# Model: leaf name { type string; mandatory true; }\n#        leaf mtu  { type uint16 { range \"68..65535\"; } }\n# Both values fit, so the data validates.",
      "exampleLanguage": "python",
      "mistake": "Validating only the first field and stopping, so a bad value later in the data is never found.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Validating Data Against a Model, but it does not work correctly.",
       "buggyCode": "errors = []\nif not check(data[\"name\"]):\n    errors.append(\"name\")\n# never checks mtu, enabled, or the rest",
       "fixedCode": "errors = []\nfor leaf, rule in schema.items():\n    if not check(data.get(leaf), rule):\n        errors.append(leaf)",
       "explanation": "A validator that stops at the first problem hides the rest; checking every leaf and reporting all the errors at once saves repeated rounds of fixing."
      },
      "exercise": {
       "title": "Check your understanding: Validating Data Against a Model",
       "type": "multiple-choice",
       "instructions": "Which statement about Validating Data Against a Model is correct?",
       "starterCode": "",
       "solution": "Validating data against a model means checking that every value in a configuration matches the leaf that defines it: the right type, inside the range or length, and present when the leaf is mandatory.",
       "solutionExplanation": "Validating data against a model means checking that every value in a configuration matches the leaf that defines it: the right type, inside the range or length, and present when the leaf is mandatory. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Validating data against a model means checking that every value in a configuration matches the leaf that defines it: the right type, inside the range or length, and present when the leaf is mandatory.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Validating Data Against a Model from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "Validating data against a model means checking that every value in a configuration matches the leaf that defines it: the right type, inside the range or length, and present when the leaf is mandatory.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-pyang-m1-l5",
      "slug": "netauto-apis-pyang-m1-l5",
      "title": "Writing a YANG Validator in Python",
      "concept": "Validating data against a YANG model means walking the data and checking every value against the leaf that defines it: the type, the range or length, whether the leaf is mandatory, and whether a list entry has its key. A validator collects all the problems it finds and reports them together, instead of stopping at the first one. The checks are the same ones a device runs when it receives a configuration, so data that passes local validation is data the device will accept.",
      "syntax": "validate(data) -> list of error strings",
      "exampleCode": "schema = {\n    \"name\": {\"type\": \"string\", \"min\": 1, \"max\": 64, \"mandatory\": True},\n    \"mtu\": {\"type\": \"uint16\", \"min\": 68, \"max\": 65535, \"mandatory\": False},\n}\n# validate() checks type, range, length, and mandatory leaves.",
      "exampleLanguage": "python",
      "mistake": "Checking a uint16 by testing value < 65536 but forgetting the lower bound, so a negative MTU passes.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Writing a YANG Validator in Python, but it does not work correctly.",
       "buggyCode": "def check_mtu(value):\n    return isinstance(value, int) and value <= 65535  # -1 passes",
       "fixedCode": "def check_mtu(value):\n    return isinstance(value, int) and 68 <= value <= 65535",
       "explanation": "A range has two ends: checking only the upper bound lets negative values through, and a uint16 must never be below zero."
      },
      "exercise": {
       "title": "Practise Writing a YANG Validator in Python",
       "type": "write-code",
       "instructions": "Write validate(data) against the schema in the starter code (name string 1..64 mandatory, mtu uint16 68..65535, enabled boolean). Print 'valid' or the errors for each of the three sample data dicts.",
       "starterCode": "# Write validate(data) against the schema.\n# TODO: define validate and print the result for each sample.\n",
       "solution": "schema = {\n    \"name\": {\"type\": \"string\", \"min\": 1, \"max\": 64, \"mandatory\": True},\n    \"mtu\": {\"type\": \"uint16\", \"min\": 68, \"max\": 65535, \"mandatory\": False},\n    \"enabled\": {\"type\": \"boolean\", \"mandatory\": False},\n}\n\n\ndef validate(data):\n    errors = []\n    for leaf, rule in schema.items():\n        if leaf not in data:\n            if rule[\"mandatory\"]:\n                errors.append(leaf + \" is mandatory but missing\")\n            continue\n        value = data[leaf]\n        if rule[\"type\"] == \"string\" and not isinstance(value, str):\n            errors.append(leaf + \" must be a string\")\n        elif rule[\"type\"] == \"uint16\" and not (isinstance(value, int) and rule[\"min\"] <= value <= rule[\"max\"]):\n            errors.append(leaf + \" must be between \" + str(rule[\"min\"]) + \" and \" + str(rule[\"max\"]))\n        elif rule[\"type\"] == \"boolean\" and not isinstance(value, bool):\n            errors.append(leaf + \" must be a boolean\")\n    return errors\n\n\nfor data in ({\"name\": \"eth0\", \"mtu\": 1500, \"enabled\": True},\n             {\"mtu\": 99999},\n             {\"name\": \"\", \"enabled\": \"yes\"}):\n    errors = validate(data)\n    print(\"valid\" if not errors else \"invalid: \" + \"; \".join(errors))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "valid\ninvalid: name is mandatory but missing; mtu must be between 68 and 65535\ninvalid: enabled must be a boolean",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "valid\ninvalid: name is mandatory but missing; mtu must be between 68 and 65535\ninvalid: enabled must be a boolean",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating data against a YANG model means walking the data and checking every value against the leaf that defines it: the type, the range or length, whether the leaf is mandatory, and whether a list entry has its key. A validator collects all the problems it finds and reports them together, instead of stopping at the first one. The checks are the same ones a device runs when it receives a configuration, so data that passes local validation is data the device will accept.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-pyang-m2",
    "title": "YANG Validation and pyang in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-apis-pyang-m2-l1",
      "slug": "netauto-apis-pyang-m2-l1",
      "title": "Tree Diagrams and Documentation",
      "concept": "A tree diagram shows a YANG model as an indented outline, with one line per node and markers showing whether a node is a container, a list, a leaf, or a leaf-list. The pyang tree format is the standard way to read a model at a glance, and it is the output engineers paste into reviews and documentation. Generating the same outline from a nested Python dictionary teaches the structure of the model without needing pyang installed.",
      "syntax": "pyang -f tree model.yang",
      "exampleCode": "# pyang -f tree output looks like:\n# +--rw interfaces\n#    +--rw interface* [name]\n#       +--rw name       string\n#       +--rw enabled    boolean\n#       +--rw mtu        uint16",
      "exampleLanguage": "python",
      "mistake": "Documenting a model by pasting a screenshot of the tree, which nobody can search or copy from.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Tree Diagrams and Documentation, but it does not work correctly.",
       "buggyCode": "# screenshot of the tree diagram in the wiki",
       "fixedCode": "# pyang -f tree model.yang > docs/tree.txt  # text, searchable",
       "explanation": "A tree diagram saved as text can be searched, diffed, and reviewed in a pull request; a screenshot cannot do any of those things."
      },
      "exercise": {
       "title": "Practise Tree Diagrams and Documentation",
       "type": "write-code",
       "instructions": "Write show_tree(node, indent) that prints a nested model dict as an indented tree with '+-- ' markers and leaf types. Print the tree for the interfaces model.",
       "starterCode": "# Print the model as a tree diagram.\n# TODO: define show_tree and print the tree.\nmodel = {\n    \"interfaces\": {\n        \"interface\": {\n            \"name\": \"leaf (string)\",\n            \"enabled\": \"leaf (boolean)\",\n            \"mtu\": \"leaf (uint16)\",\n        }\n    }\n}\n",
       "solution": "model = {\n    \"interfaces\": {\n        \"interface\": {\n            \"name\": \"leaf (string)\",\n            \"enabled\": \"leaf (boolean)\",\n            \"mtu\": \"leaf (uint16)\",\n        }\n    }\n}\n\n\ndef show_tree(node, indent=0):\n    for key in sorted(node):\n        value = node[key]\n        if isinstance(value, dict):\n            print(\"  \" * indent + \"+-- \" + key)\n            show_tree(value, indent + 1)\n        else:\n            print(\"  \" * indent + \"+-- \" + key + \" : \" + value)\n\n\nshow_tree(model)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "+-- interfaces\n  +-- interface\n    +-- enabled : leaf (boolean)\n    +-- mtu : leaf (uint16)\n    +-- name : leaf (string)",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "+-- interfaces\n  +-- interface\n    +-- enabled : leaf (boolean)\n    +-- mtu : leaf (uint16)\n    +-- name : leaf (string)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A tree diagram shows a YANG model as an indented outline, with one line per node and markers showing whether a node is a container, a list, a leaf, or a leaf-list. The pyang tree format is the standard way to read a model at a glance, and it is the output engineers paste into reviews and documentation. Generating the same outline from a nested Python dictionary teaches the structure of the model without needing pyang installed.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-pyang-m2-l2",
      "slug": "netauto-apis-pyang-m2-l2",
      "title": "Finding Model Errors",
      "concept": "The most common YANG model errors are a list without a key, a leaf without a type, a uses statement naming a missing grouping, and a namespace that does not match the module name. Each one has a distinct pyang error message, and learning to read those messages is faster than guessing. A checklist of the common errors, run in order, finds most problems in a new model within minutes.",
      "syntax": "pyang model.yang   # read the error, fix the named line",
      "exampleCode": "# Common pyang errors:\n#   \"error: the list 'interface' has no key\"\n#   \"error: the leaf 'mtu' has no type\"\n#   \"error: grouping 'address' is not defined\"",
      "exampleLanguage": "python",
      "mistake": "Fixing the first error in a long list and re-running pyang, instead of reading all the errors first and fixing the root cause.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Finding Model Errors, but it does not work correctly.",
       "buggyCode": "# 20 errors, fix the first, re-run, 19 errors left",
       "fixedCode": "# read all 20: they all come from one missing grouping",
       "explanation": "Many errors share one root cause, such as a missing grouping; reading the whole list first often shows that one fix clears them all."
      },
      "exercise": {
       "title": "Check your understanding: Finding Model Errors",
       "type": "multiple-choice",
       "instructions": "Which statement about Finding Model Errors is correct?",
       "starterCode": "",
       "solution": "The most common YANG model errors are a list without a key, a leaf without a type, a uses statement naming a missing grouping, and a namespace that does not match the module name.",
       "solutionExplanation": "The most common YANG model errors are a list without a key, a leaf without a type, a uses statement naming a missing grouping, and a namespace that does not match the module name. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The most common YANG model errors are a list without a key, a leaf without a type, a uses statement naming a missing grouping, and a namespace that does not match the module name.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Finding Model Errors from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The most common YANG model errors are a list without a key, a leaf without a type, a uses statement naming a missing grouping, and a namespace that does not match the module name.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-pyang-m2-l3",
      "slug": "netauto-apis-pyang-m2-l3",
      "title": "Versioning and Revisions",
      "concept": "YANG modules are versioned with revision statements carrying a date, and a new revision must not break clients that used the old one. The safe changes are adding new leaves, adding new values to an enumeration, and tightening nothing; the unsafe changes are renaming a leaf, removing a leaf, or changing a type. A revision history in the module file records what changed and when, so a client can tell whether an upgrade is safe.",
      "syntax": "revision 2026-11-24 {\n  description \"Added the mtu leaf.\";\n}",
      "exampleCode": "module example-interfaces {\n  revision 2026-11-24 { description \"Added mtu leaf.\"; }\n  revision 2026-01-15 { description \"Initial version.\"; }\n}",
      "exampleLanguage": "python",
      "mistake": "Removing a leaf in a new revision because nothing on the team uses it any more, when a client outside the team still does.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Versioning and Revisions, but it does not work correctly.",
       "buggyCode": "revision 2026-11-24 {\n  # removed leaf \"description\" -- breaks external clients\n}",
       "fixedCode": "revision 2026-11-24 {\n  # leaf \"description\" kept; marked deprecated instead\n}",
       "explanation": "Removing a leaf breaks every client that reads it, including ones outside your team; deprecating it keeps it working while signalling that it will go away."
      },
      "exercise": {
       "title": "Check your understanding: Versioning and Revisions",
       "type": "multiple-choice",
       "instructions": "Which statement about Versioning and Revisions is correct?",
       "starterCode": "",
       "solution": "YANG modules are versioned with revision statements carrying a date, and a new revision must not break clients that used the old one.",
       "solutionExplanation": "YANG modules are versioned with revision statements carrying a date, and a new revision must not break clients that used the old one. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "YANG modules are versioned with revision statements carrying a date, and a new revision must not break clients that used the old one.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Versioning and Revisions from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "YANG modules are versioned with revision statements carrying a date, and a new revision must not break clients that used the old one.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-pyang-m2-l4",
      "slug": "netauto-apis-pyang-m2-l4",
      "title": "YANG Linting in CI",
      "concept": "YANG linting in CI means running the same checks on every change to a model file, so a bad model never reaches the main branch. The lint rules cover the basics: every module has a namespace and a prefix, every list has a key, every leaf has a type, and names use the agreed style. A lint step that fails the build on violations is worth more than a style guide nobody reads, because it catches the problem at the moment it is introduced.",
      "syntax": "pyang --strict model.yang   # fails the build on any error or warning",
      "exampleCode": "# CI lint step:\n#   pyang --strict models/*.yang\n# Fails the build when a model has an error or a warning,\n# so a bad model never reaches the main branch.",
      "exampleLanguage": "python",
      "mistake": "Linting only the model files that changed, when a change to one model can break another that imports it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate YANG Linting in CI, but it does not work correctly.",
       "buggyCode": "# CI lints only changed files -- a shared grouping breaks silently",
       "fixedCode": "# CI lints every model, every time -- imports are checked too",
       "explanation": "A model that imports a changed grouping can break even though it did not change itself; linting all models catches the break where linting only changed files misses it."
      },
      "exercise": {
       "title": "Practise YANG Linting in CI",
       "type": "write-code",
       "instructions": "Write lint(module) that checks a module dict for a missing namespace, a prefix containing a hyphen, and lists without keys. Print the result for each of the three sample modules.",
       "starterCode": "# Write lint(module) and check three modules.\n# TODO: define lint and print the result for each module.\nmodules = [\n    {\"module\": \"good-model\", \"namespace\": \"urn:example:good\", \"prefix\": \"gd\", \"lists\": {\"interface\": \"name\"}},\n    {\"module\": \"bad-model\", \"namespace\": \"\", \"prefix\": \"bad\", \"lists\": {\"interface\": \"\"}},\n    {\"module\": \"also-bad\", \"namespace\": \"urn:example:also-bad\", \"prefix\": \"also-bad\", \"lists\": {\"route\": \"\"}},\n]\n",
       "solution": "modules = [\n    {\"module\": \"good-model\", \"namespace\": \"urn:example:good\", \"prefix\": \"gd\", \"lists\": {\"interface\": \"name\"}},\n    {\"module\": \"bad-model\", \"namespace\": \"\", \"prefix\": \"bad\", \"lists\": {\"interface\": \"\"}},\n    {\"module\": \"also-bad\", \"namespace\": \"urn:example:also-bad\", \"prefix\": \"also-bad\", \"lists\": {\"route\": \"\"}},\n]\n\n\ndef lint(module):\n    problems = []\n    if not module[\"namespace\"]:\n        problems.append(\"missing namespace\")\n    if \"-\" in module[\"prefix\"]:\n        problems.append(\"prefix must not contain a hyphen\")\n    for name, key in module[\"lists\"].items():\n        if not key:\n            problems.append(\"list \" + name + \" has no key\")\n    return problems\n\n\nfor module in modules:\n    problems = lint(module)\n    print(module[\"module\"] + \": \" + (\"clean\" if not problems else \"; \".join(problems)))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "good-model: clean\nbad-model: missing namespace; list interface has no key\nalso-bad: prefix must not contain a hyphen; list route has no key",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "good-model: clean\nbad-model: missing namespace; list interface has no key\nalso-bad: prefix must not contain a hyphen; list route has no key",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "YANG linting in CI means running the same checks on every change to a model file, so a bad model never reaches the main branch. The lint rules cover the basics: every module has a namespace and a prefix, every list has a key, every leaf has a type, and names use the agreed style. A lint step that fails the build on violations is worth more than a style guide nobody reads, because it catches the problem at the moment it is introduced.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-pyang-m2-l5",
      "slug": "netauto-apis-pyang-m2-l5",
      "title": "A Validation Pipeline",
      "concept": "A validation pipeline runs the checks in order: parse the module, check the syntax and the header, walk the tree for missing keys and types, validate the data against the model, and report every problem found. Each step only runs if the previous one passed, and the pipeline exits with a failure code when anything is wrong so CI can block the change. A pipeline that runs the same checks every time is the difference between a model that is usually right and a model that is always right.",
      "syntax": "parse -> header -> tree -> data -> report",
      "exampleCode": "# Validation pipeline:\n# 1. parse the module        2. check the header\n# 3. walk the tree            4. validate the data\n# 5. report every problem, exit non-zero on failure",
      "exampleLanguage": "python",
      "mistake": "Running the data validation step even when the module failed to parse, which produces confusing errors about data that was never the problem.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Validation Pipeline, but it does not work correctly.",
       "buggyCode": "parse_module()  # fails\nvalidate_data()  # runs anyway, reports nonsense",
       "fixedCode": "if parse_module():\n    validate_data()\nelse:\n    print(\"module did not parse; skipping data checks\")",
       "explanation": "Each pipeline step depends on the previous one, so a failed parse must stop the pipeline; running later steps on a broken model only adds noise."
      },
      "exercise": {
       "title": "Practise A Validation Pipeline",
       "type": "write-code",
       "instructions": "Run the five pipeline checks in order, printing 'PASS name' or 'FAIL name' for each, then print the pipeline summary line.",
       "starterCode": "# Run the validation pipeline checks.\n# TODO: print each check result, then the summary.\nchecks = [\n    (\"parse module\", True),\n    (\"header complete\", True),\n    (\"every list has a key\", True),\n    (\"every leaf has a type\", True),\n    (\"data validates\", False),\n]\n",
       "solution": "checks = [\n    (\"parse module\", True),\n    (\"header complete\", True),\n    (\"every list has a key\", True),\n    (\"every leaf has a type\", True),\n    (\"data validates\", False),\n]\nfailed = [name for name, ok in checks if not ok]\nfor name, ok in checks:\n    print((\"PASS \" if ok else \"FAIL \") + name)\nprint(\"pipeline: \" + (\"FAILED: \" + \", \".join(failed) if failed else \"all checks passed\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS parse module\nPASS header complete\nPASS every list has a key\nPASS every leaf has a type\nFAIL data validates\npipeline: FAILED: data validates",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "PASS parse module\nPASS header complete\nPASS every list has a key\nPASS every leaf has a type\nFAIL data validates\npipeline: FAILED: data validates",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A validation pipeline runs the checks in order: parse the module, check the syntax and the header, walk the tree for missing keys and types, validate the data against the model, and report every problem found. Each step only runs if the previous one passed, and the pipeline exits with a failure code when anything is wrong so CI can block the change. A pipeline that runs the same checks every time is the difference between a model that is usually right and a model that is always right.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: YANG Validation and pyang",
   "type": "write-code",
   "instructions": "Write a small validator: check_header(text) that reports missing module/namespace/prefix statements, and validate(data) against the schema (hostname string 1..64 mandatory, mtu uint16 68..65535, enabled boolean). Print the header result, then validate the two sample data dicts.",
   "starterCode": "# Write the header check and the data validator.\n# TODO: define both functions and print the results.\n",
   "solution": "schema = {\n    \"hostname\": {\"type\": \"string\", \"min\": 1, \"max\": 64, \"mandatory\": True},\n    \"mtu\": {\"type\": \"uint16\", \"min\": 68, \"max\": 65535, \"mandatory\": False},\n    \"enabled\": {\"type\": \"boolean\", \"mandatory\": False},\n}\nmodule_text = \"\"\"module example-device {\n  namespace \"urn:example:device\";\n  prefix ex;\n  container system {\n    leaf hostname { type string; }\n  }\n}\"\"\"\n\n\ndef check_header(text):\n    missing = [s for s in (\"module \", \"namespace \", \"prefix \") if s not in text]\n    return missing\n\n\ndef validate(data):\n    errors = []\n    for leaf, rule in schema.items():\n        if leaf not in data:\n            if rule[\"mandatory\"]:\n                errors.append(leaf + \" is mandatory but missing\")\n            continue\n        value = data[leaf]\n        if rule[\"type\"] == \"string\" and not (isinstance(value, str) and rule[\"min\"] <= len(value) <= rule[\"max\"]):\n            errors.append(leaf + \" must be a string of length \" + str(rule[\"min\"]) + \"..\" + str(rule[\"max\"]))\n        elif rule[\"type\"] == \"uint16\" and not (isinstance(value, int) and rule[\"min\"] <= value <= rule[\"max\"]):\n            errors.append(leaf + \" must be between \" + str(rule[\"min\"]) + \" and \" + str(rule[\"max\"]))\n        elif rule[\"type\"] == \"boolean\" and not isinstance(value, bool):\n            errors.append(leaf + \" must be a boolean\")\n    return errors\n\n\nmissing = check_header(module_text)\nprint(\"header: \" + (\"complete\" if not missing else \"missing \" + \", \".join(missing)))\nfor data in ({\"hostname\": \"core-1\", \"mtu\": 9000, \"enabled\": True},\n             {\"hostname\": \"core-2\", \"mtu\": 10}):\n    errors = validate(data)\n    print(\"valid\" if not errors else \"invalid: \" + \"; \".join(errors))",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "header: complete\nvalid\ninvalid: mtu must be between 68 and 65535",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "header: complete\nvalid\ninvalid: mtu must be between 68 and 65535",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "YANG Validation and pyang brings the whole track together: check a module header and validate data against its schema.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "YANG Validation and pyang Capstone Project",
   "description": "A small end-to-end project that puts YANG Validation and pyang into practice.",
   "requirements": [
    "Check a module header for the required statements and validate data against a schema.",
    "Apply at least three of these skills: Syntax and semantics, Data validation, Model errors, Linting in CI.",
    "Report every problem found, not just the first one.",
    "Note that pyang itself is not installed here, so the checks are implemented in Python."
   ],
   "rubric": [
    "The header check finds missing statements and the validator checks type, range, and mandatory leaves.",
    "All problems are reported together, not one at a time.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-gnmi",
  "slug": "netauto-apis-gnmi",
  "language": "python",
  "category": "devops",
  "title": "gNMI and Streaming Telemetry",
  "description": "Learn gnmi and streaming telemetry for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Advanced",
  "estimatedHours": 10,
  "skills": [
   "gNMI concepts",
   "gNMI paths",
   "Capabilities and Get",
   "Subscribe Sample mode",
   "Subscribe ON_CHANGE mode",
   "Telemetry encodings",
   "gNMI vs SNMP",
   "Streaming decisions"
  ],
  "prerequisites": [
   "netauto-apis-netconf"
  ],
  "analogy": "Learning {topic} is like learning to listen to a radio station instead of calling the station to ask what song is playing: the updates come to you when something changes.",
  "modules": [
   {
    "id": "netauto-apis-gnmi-m1",
    "title": "gNMI and Streaming Telemetry Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-gnmi-m1-l1",
      "slug": "netauto-apis-gnmi-m1-l1",
      "title": "What Is gNMI?",
      "concept": "gNMI is a protocol defined by the OpenConfig working group that lets a client read state and subscribe to streaming telemetry from a network device over gRPC. It offers four RPCs: Capabilities, which lists the models the device supports; Get, which reads a value once; Set, which changes a value; and Subscribe, which streams updates as values change. Running gNMI needs a lab device with gNMI enabled, so this course teaches paths and subscriptions in Python and practises them locally.",
      "syntax": "Capabilities / Get / Set / Subscribe",
      "exampleCode": "# gNMI runs over gRPC, usually on TCP port 57400.\n#   Capabilities: which YANG models does the device support?\n#   Get:          read a value once\n#   Set:          change a value\n#   Subscribe:    stream updates as values change\n# Running gNMI needs a lab device with gNMI enabled.",
      "exampleLanguage": "python",
      "mistake": "Assuming gNMI is just SNMP with a new name, when it is a gRPC protocol with YANG-modelled paths.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is gNMI?, but it does not work correctly.",
       "buggyCode": "# poll the device every 60s with SNMP -- \"that is gNMI\"",
       "fixedCode": "# subscribe to a path with gNMI -- the device pushes updates",
       "explanation": "SNMP polls OID values on a schedule; gNMI subscribes to YANG paths and the device pushes updates, which is a different model of telemetry entirely."
      },
      "exercise": {
       "title": "Practise What Is gNMI?",
       "type": "write-code",
       "instructions": "Print the four gNMI RPCs in order (Capabilities, Get, Set, Subscribe) with a one-line description of each.",
       "starterCode": "# Print the four gNMI RPCs.\n# TODO: print each RPC name and its description.\n",
       "solution": "rpcs = {\n    \"Capabilities\": \"list the YANG models the device supports\",\n    \"Get\": \"read a value once, like a single GET\",\n    \"Set\": \"change a value, like a single PUT\",\n    \"Subscribe\": \"stream updates as values change\",\n}\nfor name in [\"Capabilities\", \"Get\", \"Set\", \"Subscribe\"]:\n    print(name + \": \" + rpcs[name])",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Capabilities: list the YANG models the device supports\nGet: read a value once, like a single GET\nSet: change a value, like a single PUT\nSubscribe: stream updates as values change",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "Capabilities: list the YANG models the device supports\nGet: read a value once, like a single GET\nSet: change a value, like a single PUT\nSubscribe: stream updates as values change",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "gNMI is a protocol defined by the OpenConfig working group that lets a client read state and subscribe to streaming telemetry from a network device over gRPC. It offers four RPCs: Capabilities, which lists the models the device supports; Get, which reads a value once; Set, which changes a value; and Subscribe, which streams updates as values change. Running gNMI needs a lab device with gNMI enabled, so this course teaches paths and subscriptions in Python and practises them locally.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-gnmi-m1-l2",
      "slug": "netauto-apis-gnmi-m1-l2",
      "title": "gNMI Paths",
      "concept": "A gNMI path names a value in the YANG tree as a sequence of elements, for example /interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets. Each element is a node name, and list entries carry their key in brackets, so the path points at exactly one leaf. Paths are the addresses of telemetry: a subscription is a list of paths, and each update the device sends carries the path of the value that changed.",
      "syntax": "/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets",
      "exampleCode": "path = \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\"\n# elements: interfaces -> interface[name=GigabitEthernet1]\n#           -> state -> counters -> in-octets",
      "exampleLanguage": "python",
      "mistake": "Writing a path without the list key, so it names every interface instead of one.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate gNMI Paths, but it does not work correctly.",
       "buggyCode": "\"/interfaces/interface/state/oper-status\"  # all interfaces",
       "fixedCode": "\"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\"",
       "explanation": "A path without a key matches every entry in the list, so the subscription streams every interface; the key in brackets narrows it to one."
      },
      "exercise": {
       "title": "Practise gNMI Paths",
       "type": "write-code",
       "instructions": "Parse the gNMI path in the starter code into its elements, splitting on '/' and keeping each list key in brackets. Print the path, the element count, and each element on its own indented line.",
       "starterCode": "# Parse a gNMI path into elements.\n# TODO: split the path and print each element.\npath = \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\"\n",
       "solution": "import re\n\npath = \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\"\nelements = []\nfor part in path.strip(\"/\").split(\"/\"):\n    m = re.match(r\"([a-z-]+)(?:\\[([a-z-]+)=([^\\]]+)\\])?\", part)\n    name, key, value = m.groups()\n    if key:\n        elements.append(name + \"[\" + key + \"=\" + value + \"]\")\n    else:\n        elements.append(name)\nprint(\"path:\", path)\nprint(\"elements:\", len(elements))\nfor element in elements:\n    print(\"  \" + element)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "path: /interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\nelements: 5\n  interfaces\n  interface[name=GigabitEthernet1]\n  state\n  counters\n  in-octets",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "path: /interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\nelements: 5\n  interfaces\n  interface[name=GigabitEthernet1]\n  state\n  counters\n  in-octets",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A gNMI path names a value in the YANG tree as a sequence of elements, for example /interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets. Each element is a node name, and list entries carry their key in brackets, so the path points at exactly one leaf. Paths are the addresses of telemetry: a subscription is a list of paths, and each update the device sends carries the path of the value that changed.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-gnmi-m1-l3",
      "slug": "netauto-apis-gnmi-m1-l3",
      "title": "Capabilities and Get",
      "concept": "The gNMI Capabilities RPC asks the device which YANG models it supports and which encodings it can send, and the answer lists the model names, organisations, and versions. The Get RPC reads the value at one or more paths, once, and the reply carries the values with their paths and timestamps. Capabilities is always the first call a client makes, because there is no point asking for a path the device does not support.",
      "syntax": "Capabilities -> Get",
      "exampleCode": "# Display only -- needs a lab device to run:\n# capabilities = stub.Capabilities(CapabilityRequest())\n# print([m.name for m in capabilities.supported_models])\n# response = stub.Get(GetRequest(path=[path]))\n# print(response.notification.update[0].val)",
      "exampleLanguage": "python",
      "mistake": "Calling Get on a path without first checking Capabilities, and wondering why a path the device does not support returns an error.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Capabilities and Get, but it does not work correctly.",
       "buggyCode": "response = stub.Get(GetRequest(path=[\"/openconfig-foo:bar\"]))  # never checked",
       "fixedCode": "caps = stub.Capabilities(CapabilityRequest())\nif \"openconfig-foo\" in [m.name for m in caps.supported_models]:\n    response = stub.Get(GetRequest(path=[\"/openconfig-foo:bar\"]))",
       "explanation": "A Get on an unsupported model fails; Capabilities tells you which models exist, so checking it first avoids asking for something the device cannot provide."
      },
      "exercise": {
       "title": "Check your understanding: Capabilities and Get",
       "type": "multiple-choice",
       "instructions": "Which statement about Capabilities and Get is correct?",
       "starterCode": "",
       "solution": "The gNMI Capabilities RPC asks the device which YANG models it supports and which encodings it can send, and the answer lists the model names, organisations, and versions.",
       "solutionExplanation": "The gNMI Capabilities RPC asks the device which YANG models it supports and which encodings it can send, and the answer lists the model names, organisations, and versions. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The gNMI Capabilities RPC asks the device which YANG models it supports and which encodings it can send, and the answer lists the model names, organisations, and versions.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Capabilities and Get from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "The gNMI Capabilities RPC asks the device which YANG models it supports and which encodings it can send, and the answer lists the model names, organisations, and versions.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-gnmi-m1-l4",
      "slug": "netauto-apis-gnmi-m1-l4",
      "title": "Subscribe: Sample Mode",
      "concept": "A gNMI subscription in Sample mode sends the current value of each subscribed path at a fixed interval, such as every ten seconds, whether or not the value changed. Sample mode is the right choice for counters and rates that change constantly, because the collector needs regular readings to compute a rate. The interval is a trade-off: a short interval gives fresher data but more traffic, and a long interval gives less traffic but a coarser picture.",
      "syntax": "Subscribe mode=STREAM, subscription mode=SAMPLE, sample_interval=10s",
      "exampleCode": "# Display only -- needs a lab device to run:\n# request = SubscribeRequest(subscribe=SubscriptionList(\n#     mode=SubscriptionList.STREAM,\n#     subscription=[Subscription(path=path, mode=Subscription.SAMPLE,\n#                                sample_interval=10_000_000_000)]))",
      "exampleLanguage": "python",
      "mistake": "Choosing a one-second sample interval for a hundred counters on a hundred devices, and flooding the collector with data it cannot process.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Subscribe: Sample Mode, but it does not work correctly.",
       "buggyCode": "sample_interval = 1_000_000_000  # 1s, for everything",
       "fixedCode": "sample_interval = 30_000_000_000  # 30s is enough for most counters",
       "explanation": "A one-second interval multiplies the traffic by the number of paths and devices; most counters are fine at ten or thirty seconds, and only a few need anything faster."
      },
      "exercise": {
       "title": "Check your understanding: Subscribe: Sample Mode",
       "type": "multiple-choice",
       "instructions": "Which statement about Subscribe: Sample Mode is correct?",
       "starterCode": "",
       "solution": "A gNMI subscription in Sample mode sends the current value of each subscribed path at a fixed interval, such as every ten seconds, whether or not the value changed.",
       "solutionExplanation": "A gNMI subscription in Sample mode sends the current value of each subscribed path at a fixed interval, such as every ten seconds, whether or not the value changed. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A gNMI subscription in Sample mode sends the current value of each subscribed path at a fixed interval, such as every ten seconds, whether or not the value changed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Subscribe: Sample Mode from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A gNMI subscription in Sample mode sends the current value of each subscribed path at a fixed interval, such as every ten seconds, whether or not the value changed.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-gnmi-m1-l5",
      "slug": "netauto-apis-gnmi-m1-l5",
      "title": "Subscribe: ON_CHANGE Mode",
      "concept": "A gNMI subscription in ON_CHANGE mode sends an update only when a subscribed value actually changes, which makes it ideal for watching state that rarely moves, such as whether an interface is up or a BGP session is established. The first message after subscribing carries the current value, so the client starts from a known state instead of waiting for a change. ON_CHANGE uses far less bandwidth than sampling the same value every few seconds, but it tells you nothing about values that change constantly, which need Sample mode instead.",
      "syntax": "{\"subscribe\": {\"mode\": \"STREAM\", \"subscriptions\": [{\"path\": \"...\", \"mode\": \"ON_CHANGE\"}]}}",
      "exampleCode": "import json\n\nrequest = {\"subscribe\": {\"mode\": \"STREAM\", \"subscriptions\": [\n    {\"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\",\n     \"mode\": \"ON_CHANGE\"}]}}\nprint(json.dumps(request, indent=2))",
      "exampleLanguage": "python",
      "mistake": "Using ON_CHANGE for a counter that increases constantly, which sends an update on every single change and floods the collector.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Subscribe: ON_CHANGE Mode, but it does not work correctly.",
       "buggyCode": "{\"path\": \".../counters/in-octets\", \"mode\": \"ON_CHANGE\"}  # changes all the time",
       "fixedCode": "{\"path\": \".../counters/in-octets\", \"mode\": \"SAMPLE\", \"sample_interval\": 10000000000}",
       "explanation": "ON_CHANGE fires on every change, and a counter changes on every packet; counters belong in Sample mode, and ON_CHANGE belongs to state that rarely moves."
      },
      "exercise": {
       "title": "Practise Subscribe: ON_CHANGE Mode",
       "type": "write-code",
       "instructions": "Build a SubscribeRequest dict in STREAM mode with two ON_CHANGE subscriptions (the oper-status of GigabitEthernet1 and the BGP session-state) and print it as sorted, indented JSON.",
       "starterCode": "# Build an ON_CHANGE SubscribeRequest.\n# TODO: build the request dict and print it as JSON.\n",
       "solution": "import json\n\nrequest = {\n    \"subscribe\": {\n        \"mode\": \"STREAM\",\n        \"subscriptions\": [\n            {\n                \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\",\n                \"mode\": \"ON_CHANGE\",\n            },\n            {\n                \"path\": \"/network-instances/network-instance[name=default]/protocols/bgp/neighbors/neighbor/state/session-state\",\n                \"mode\": \"ON_CHANGE\",\n            },\n        ],\n    }\n}\nprint(json.dumps(request, indent=2, sort_keys=True))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\n  \"subscribe\": {\n    \"mode\": \"STREAM\",\n    \"subscriptions\": [\n      {\n        \"mode\": \"ON_CHANGE\",\n        \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\"\n      },\n      {\n        \"mode\": \"ON_CHANGE\",\n        \"path\": \"/network-instances/network-instance[name=default]/protocols/bgp/neighbors/neighbor/state/session-state\"\n      }\n    ]\n  }\n}",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{\n  \"subscribe\": {\n    \"mode\": \"STREAM\",\n    \"subscriptions\": [\n      {\n        \"mode\": \"ON_CHANGE\",\n        \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\"\n      },\n      {\n        \"mode\": \"ON_CHANGE\",\n        \"path\": \"/network-instances/network-instance[name=default]/protocols/bgp/neighbors/neighbor/state/session-state\"\n      }\n    ]\n  }\n}",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A gNMI subscription in ON_CHANGE mode sends an update only when a subscribed value actually changes, which makes it ideal for watching state that rarely moves, such as whether an interface is up or a BGP session is established. The first message after subscribing carries the current value, so the client starts from a known state instead of waiting for a change. ON_CHANGE uses far less bandwidth than sampling the same value every few seconds, but it tells you nothing about values that change constantly, which need Sample mode instead.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-gnmi-m2",
    "title": "gNMI and Streaming Telemetry in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-apis-gnmi-m2-l1",
      "slug": "netauto-apis-gnmi-m2-l1",
      "title": "Building a gNMI Path in Python",
      "concept": "A gNMI path is built in Python as a list of elements, where each element is a node name plus an optional key dictionary for list entries. Building paths from parts instead of writing them as strings stops typos in the key names and keeps the interface name in one variable. The path is rendered as a string only when it is printed or sent, so the program works with the structured form everywhere else.",
      "syntax": "build_path(('interfaces', None), ('interface', {'name': 'GigabitEthernet1'}), ...)",
      "exampleCode": "def build_path(*parts):\n    rendered = []\n    for name, key in parts:\n        if key:\n            k, v = next(iter(key.items()))\n            rendered.append(name + \"[\" + k + \"=\" + v + \"]\")\n        else:\n            rendered.append(name)\n    return \"/\" + \"/\".join(rendered)",
      "exampleLanguage": "python",
      "mistake": "Building a path with an f-string and forgetting the brackets around a list key, so the path names the whole list.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building a gNMI Path in Python, but it does not work correctly.",
       "buggyCode": "f\"/interfaces/interface{name}/state\"  # missing [name=...]",
       "fixedCode": "f\"/interfaces/interface[name={name}]/state\"  # key in brackets",
       "explanation": "A list entry in a gNMI path carries its key in brackets; without them the path matches every entry in the list instead of one."
      },
      "exercise": {
       "title": "Practise Building a gNMI Path in Python",
       "type": "write-code",
       "instructions": "Write build_path(*parts) where each part is (name, key-dict-or-None) and render it as a gNMI path string. Print the in-octets path for GigabitEthernet1 and the oper-status path for Loopback0.",
       "starterCode": "# Write build_path and print two paths.\n# TODO: define build_path and print both paths.\n",
       "solution": "def build_path(*parts):\n    rendered = []\n    for name, key in parts:\n        if key:\n            k, v = next(iter(key.items()))\n            rendered.append(name + \"[\" + k + \"=\" + v + \"]\")\n        else:\n            rendered.append(name)\n    return \"/\" + \"/\".join(rendered)\n\n\nprint(build_path((\"interfaces\", None), (\"interface\", {\"name\": \"GigabitEthernet1\"}),\n                 (\"state\", None), (\"counters\", None), (\"in-octets\", None)))\nprint(build_path((\"interfaces\", None), (\"interface\", {\"name\": \"Loopback0\"}),\n                 (\"state\", None), (\"oper-status\", None)))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\n/interfaces/interface[name=Loopback0]/state/oper-status",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\n/interfaces/interface[name=Loopback0]/state/oper-status",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A gNMI path is built in Python as a list of elements, where each element is a node name plus an optional key dictionary for list entries. Building paths from parts instead of writing them as strings stops typos in the key names and keeps the interface name in one variable. The path is rendered as a string only when it is printed or sent, so the program works with the structured form everywhere else.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-gnmi-m2-l2",
      "slug": "netauto-apis-gnmi-m2-l2",
      "title": "Telemetry Data Formats",
      "concept": "A gNMI update carries a path, a value, and a timestamp, and the value can be encoded as JSON, as a JSON_IETF document, or as a typed scalar such as a string, an integer, or a boolean. JSON encoding is the most common because it matches the YANG model and is easy to parse, while the typed encodings are smaller on the wire. The encoding is chosen in the subscription, and the collector must decode the format it asked for.",
      "syntax": "encoding: JSON, JSON_IETF, BYTES, PROTO, ASCII",
      "exampleCode": "# A gNMI update:\n#   path: /interfaces/interface[name=eth0]/state/counters/in-octets\n#   val:  123456789 (uint)\n#   timestamp: 1793123456789000000 (nanoseconds)",
      "exampleLanguage": "python",
      "mistake": "Assuming the value in an update is always a string, when it can be an integer, a boolean, or a JSON document.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Telemetry Data Formats, but it does not work correctly.",
       "buggyCode": "value = update.val.string_val  # wrong for a counter",
       "fixedCode": "value = update.val.uint_val  # a counter is an unsigned integer",
       "explanation": "A gNMI value is typed, and reading it with the wrong accessor gives an empty value; the type must match what the leaf defines."
      },
      "exercise": {
       "title": "Check your understanding: Telemetry Data Formats",
       "type": "multiple-choice",
       "instructions": "Which statement about Telemetry Data Formats is correct?",
       "starterCode": "",
       "solution": "A gNMI update carries a path, a value, and a timestamp, and the value can be encoded as JSON, as a JSON_IETF document, or as a typed scalar such as a string, an integer, or a boolean.",
       "solutionExplanation": "A gNMI update carries a path, a value, and a timestamp, and the value can be encoded as JSON, as a JSON_IETF document, or as a typed scalar such as a string, an integer, or a boolean. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A gNMI update carries a path, a value, and a timestamp, and the value can be encoded as JSON, as a JSON_IETF document, or as a typed scalar such as a string, an integer, or a boolean.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Telemetry Data Formats from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A gNMI update carries a path, a value, and a timestamp, and the value can be encoded as JSON, as a JSON_IETF document, or as a typed scalar such as a string, an integer, or a boolean.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-gnmi-m2-l3",
      "slug": "netauto-apis-gnmi-m2-l3",
      "title": "Encoding and Decoding Updates",
      "concept": "Decoding a gNMI update means reading its path to know which value changed, reading its value in the encoding that was agreed, and reading its timestamp to know when the value was measured. The timestamp is in nanoseconds since the Unix epoch, so it must be divided by a billion to become seconds. A collector that ignores the timestamp cannot tell a late update from a fresh one, and a collector that ignores the path cannot tell which interface the value belongs to.",
      "syntax": "timestamp_ns / 1_000_000_000 = seconds",
      "exampleCode": "import datetime\n\ntimestamp_ns = 1793123456789000000\nseconds = timestamp_ns / 1_000_000_000\nprint(datetime.datetime.fromtimestamp(seconds, datetime.timezone.utc))",
      "exampleLanguage": "python",
      "mistake": "Treating the nanosecond timestamp as seconds, which produces a date tens of thousands of years in the future.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Encoding and Decoding Updates, but it does not work correctly.",
       "buggyCode": "datetime.datetime.fromtimestamp(1793123456789000000)  # nanoseconds as seconds",
       "fixedCode": "datetime.datetime.fromtimestamp(1793123456789000000 / 1_000_000_000)",
       "explanation": "A gNMI timestamp is in nanoseconds, and fromtimestamp expects seconds; dividing by a billion first gives the real measurement time."
      },
      "exercise": {
       "title": "Check your understanding: Encoding and Decoding Updates",
       "type": "multiple-choice",
       "instructions": "Which statement about Encoding and Decoding Updates is correct?",
       "starterCode": "",
       "solution": "Decoding a gNMI update means reading its path to know which value changed, reading its value in the encoding that was agreed, and reading its timestamp to know when the value was measured.",
       "solutionExplanation": "Decoding a gNMI update means reading its path to know which value changed, reading its value in the encoding that was agreed, and reading its timestamp to know when the value was measured. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Decoding a gNMI update means reading its path to know which value changed, reading its value in the encoding that was agreed, and reading its timestamp to know when the value was measured.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Encoding and Decoding Updates from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "Decoding a gNMI update means reading its path to know which value changed, reading its value in the encoding that was agreed, and reading its timestamp to know when the value was measured.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-gnmi-m2-l4",
      "slug": "netauto-apis-gnmi-m2-l4",
      "title": "gNMI vs SNMP Polling",
      "concept": "SNMP polling asks the device for the same values on a fixed schedule, which means the polling system does the work even when nothing has changed, and it only learns about a change at the next poll. gNMI streaming reverses this: the device pushes an update the moment a value changes, or on a chosen sample interval, so the collector sees changes quickly and the device sends less data when nothing is happening. Polling is simpler to run, but streaming is faster and scales better when the values you watch change rarely.",
      "syntax": "SNMP: poll every N seconds, same data whether it changed\n  gNMI: push on change, or sample at an interval",
      "exampleCode": "# 10 interfaces, 60s poll, 24h: 10 * 60 * 24 = 14,400 samples\n# gNMI ON_CHANGE, 5 changes/hour: 5 * 24 = 120 updates\n# Streaming sends data only when there is something to say.",
      "exampleLanguage": "python",
      "mistake": "Comparing SNMP and gNMI only on speed, and ignoring the traffic and the load each one puts on the device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate gNMI vs SNMP Polling, but it does not work correctly.",
       "buggyCode": "# \"gNMI is faster, so always use gNMI\"",
       "fixedCode": "# \"gNMI is faster AND sends less data when nothing changes\"",
       "explanation": "Speed is only half the story: polling sends the same data whether or not anything changed, while streaming sends data only when there is a change to report."
      },
      "exercise": {
       "title": "Practise gNMI vs SNMP Polling",
       "type": "write-code",
       "instructions": "Compute the samples per day for SNMP polling (10 interfaces, 60-second interval) and for gNMI ON_CHANGE (5 changes per hour), and print both counts plus the number of samples gNMI saves.",
       "starterCode": "# Compare SNMP polling with gNMI streaming.\n# TODO: compute the sample counts and print them.\n",
       "solution": "def snmp_samples(interfaces, interval_seconds, hours):\n    return interfaces * (3600 // interval_seconds) * hours\n\n\ndef gnmi_samples(changes_per_hour, hours):\n    return changes_per_hour * hours\n\n\nprint(\"SNMP, 10 interfaces, 60s poll, 1h:\", snmp_samples(10, 60, 1))\nprint(\"SNMP, 10 interfaces, 60s poll, 24h:\", snmp_samples(10, 60, 24))\nprint(\"gNMI ON_CHANGE, 5 changes/hour, 24h:\", gnmi_samples(5, 24))\nprint(\"gNMI saves:\", snmp_samples(10, 60, 24) - gnmi_samples(5, 24), \"samples a day\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "SNMP, 10 interfaces, 60s poll, 1h: 600\nSNMP, 10 interfaces, 60s poll, 24h: 14400\ngNMI ON_CHANGE, 5 changes/hour, 24h: 120\ngNMI saves: 14280 samples a day",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "SNMP, 10 interfaces, 60s poll, 1h: 600\nSNMP, 10 interfaces, 60s poll, 24h: 14400\ngNMI ON_CHANGE, 5 changes/hour, 24h: 120\ngNMI saves: 14280 samples a day",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "SNMP polling asks the device for the same values on a fixed schedule, which means the polling system does the work even when nothing has changed, and it only learns about a change at the next poll. gNMI streaming reverses this: the device pushes an update the moment a value changes, or on a chosen sample interval, so the collector sees changes quickly and the device sends less data when nothing is happening. Polling is simpler to run, but streaming is faster and scales better when the values you watch change rarely.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-gnmi-m2-l5",
      "slug": "netauto-apis-gnmi-m2-l5",
      "title": "When to Stream, When to Poll",
      "concept": "Stream with gNMI when you need to know about a change within seconds, when the value changes rarely, or when you are watching hundreds of devices and polling would drown them. Poll with SNMP or a RESTCONF GET when the value is read once a day, when the device has no gNMI support, or when the data is needed for a report rather than an alert. The decision is about how fast you must know and how much traffic you can afford, not about which protocol is newer.",
      "syntax": "seconds matter -> stream; daily report -> poll",
      "exampleCode": "# Stream: alerts in seconds, rare changes, many devices\n# Poll:   daily reports, devices without gNMI, one-off reads",
      "exampleLanguage": "python",
      "mistake": "Streaming every counter from every device at one-second intervals, when only three counters are ever looked at.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate When to Stream, When to Poll, but it does not work correctly.",
       "buggyCode": "# subscribe to everything, sample every second",
       "fixedCode": "# subscribe to the three counters the dashboard shows, every 30s",
       "explanation": "Telemetry should be collected for a purpose: subscribing to everything at the fastest rate wastes bandwidth and storage on data nobody reads."
      },
      "exercise": {
       "title": "Practise When to Stream, When to Poll",
       "type": "write-code",
       "instructions": "Print the five stream-or-poll decision rules in order, then print 'decision made' on the last line.",
       "starterCode": "# Print the stream-or-poll rules.\n# TODO: print the five rules, then 'decision made'.\n",
       "solution": "rules = [\n    \"need it in seconds -> stream with gNMI Subscribe\",\n    \"value rarely changes -> ON_CHANGE subscription\",\n    \"value changes constantly -> Sample mode, 10s or 30s\",\n    \"device has no gNMI -> poll with SNMP or RESTCONF GET\",\n    \"daily report, not an alert -> poll once, keep it simple\",\n]\nfor rule in rules:\n    print(rule)\nprint(\"decision made\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "need it in seconds -> stream with gNMI Subscribe\nvalue rarely changes -> ON_CHANGE subscription\nvalue changes constantly -> Sample mode, 10s or 30s\ndevice has no gNMI -> poll with SNMP or RESTCONF GET\ndaily report, not an alert -> poll once, keep it simple\ndecision made",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "need it in seconds -> stream with gNMI Subscribe\nvalue rarely changes -> ON_CHANGE subscription\nvalue changes constantly -> Sample mode, 10s or 30s\ndevice has no gNMI -> poll with SNMP or RESTCONF GET\ndaily report, not an alert -> poll once, keep it simple\ndecision made",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Stream with gNMI when you need to know about a change within seconds, when the value changes rarely, or when you are watching hundreds of devices and polling would drown them. Poll with SNMP or a RESTCONF GET when the value is read once a day, when the device has no gNMI support, or when the data is needed for a report rather than an alert. The decision is about how fast you must know and how much traffic you can afford, not about which protocol is newer.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: gNMI and Streaming Telemetry",
   "type": "write-code",
   "instructions": "Write build_path(*parts) and parse_path(path) helpers, then build a SubscribeRequest in STREAM mode: a 10-second Sample subscription for the in-octets counter of GigabitEthernet1 and an ON_CHANGE subscription for its oper-status. Print the counter path, its element count, and the request as sorted, indented JSON.",
   "starterCode": "# Build the gNMI path helpers and the subscription.\n# TODO: define both helpers, build the request, and print the results.\n",
   "solution": "import json\nimport re\n\n\ndef build_path(*parts):\n    rendered = []\n    for name, key in parts:\n        if key:\n            k, v = next(iter(key.items()))\n            rendered.append(name + \"[\" + k + \"=\" + v + \"]\")\n        else:\n            rendered.append(name)\n    return \"/\" + \"/\".join(rendered)\n\n\ndef parse_path(path):\n    elements = []\n    for part in path.strip(\"/\").split(\"/\"):\n        m = re.match(r\"([a-z-]+)(?:\\[([a-z-]+)=([^\\]]+)\\])?\", part)\n        name, key, value = m.groups()\n        elements.append((name, {key: value} if key else None))\n    return elements\n\n\npath = build_path((\"interfaces\", None), (\"interface\", {\"name\": \"GigabitEthernet1\"}),\n                  (\"state\", None), (\"counters\", None), (\"in-octets\", None))\nprint(path)\nprint(\"elements:\", len(parse_path(path)))\nrequest = {\n    \"subscribe\": {\n        \"mode\": \"STREAM\",\n        \"subscriptions\": [\n            {\"path\": path, \"mode\": \"SAMPLE\", \"sample_interval\": 10000000000},\n            {\"path\": build_path((\"interfaces\", None), (\"interface\", {\"name\": \"GigabitEthernet1\"}),\n                                (\"state\", None), (\"oper-status\", None)),\n             \"mode\": \"ON_CHANGE\"},\n        ],\n    }\n}\nprint(json.dumps(request, indent=2, sort_keys=True))",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\nelements: 5\n{\n  \"subscribe\": {\n    \"mode\": \"STREAM\",\n    \"subscriptions\": [\n      {\n        \"mode\": \"SAMPLE\",\n        \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\",\n        \"sample_interval\": 10000000000\n      },\n      {\n        \"mode\": \"ON_CHANGE\",\n        \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\"\n      }\n    ]\n  }\n}",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\nelements: 5\n{\n  \"subscribe\": {\n    \"mode\": \"STREAM\",\n    \"subscriptions\": [\n      {\n        \"mode\": \"SAMPLE\",\n        \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\",\n        \"sample_interval\": 10000000000\n      },\n      {\n        \"mode\": \"ON_CHANGE\",\n        \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\"\n      }\n    ]\n  }\n}",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "gNMI and Streaming Telemetry brings the whole track together: build paths and a mixed Sample/ON_CHANGE subscription.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "gNMI and Streaming Telemetry Capstone Project",
   "description": "A small end-to-end project that puts gNMI and Streaming Telemetry into practice.",
   "requirements": [
    "Build gNMI paths from structured parts and parse them back into elements.",
    "Apply at least three of these skills: gNMI paths, Subscribe Sample mode, Subscribe ON_CHANGE mode, Telemetry encodings.",
    "Use Sample mode for counters and ON_CHANGE mode for state that rarely changes.",
    "Label clearly that subscribing needs a lab device with gNMI enabled."
   ],
   "rubric": [
    "The paths are well-formed with list keys in brackets.",
    "Sample and ON_CHANGE modes are used for the right kinds of values.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-telemetry",
  "slug": "netauto-apis-telemetry",
  "language": "python",
  "category": "devops",
  "title": "Model-Driven Telemetry Pipelines",
  "description": "Learn model-driven telemetry pipelines for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Telemetry rates",
   "Collectors",
   "Normalisation",
   "Time-series storage",
   "Thresholds and alerting",
   "Dashboards",
   "Backpressure",
   "Telemetry security"
  ],
  "prerequisites": [
   "netauto-apis-gnmi"
  ],
  "analogy": "Learning {topic} is like learning to run a weather station: the sensors send numbers all day, and the pipeline is what turns them into a forecast anyone can use.",
  "modules": [
   {
    "id": "netauto-apis-telemetry-m1",
    "title": "Model-Driven Telemetry Pipelines Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-telemetry-m1-l1",
      "slug": "netauto-apis-telemetry-m1-l1",
      "title": "From Telemetry to Insight",
      "concept": "Telemetry becomes insight only when raw counter values are turned into rates, changes, and comparisons: an in-octets counter on its own says nothing, but the difference between two readings divided by the time between them is the interface throughput in bits per second. A pipeline takes the stream of updates, normalises them into records with a path, a value, and a timestamp, and then computes the rates and thresholds that operators actually watch.",
      "syntax": "rate = (value2 - value1) * 8 / seconds",
      "exampleCode": "def rate(first_value, second_value, seconds):\n    return (second_value - first_value) * 8 / seconds\n\n\nprint(rate(1000000, 1125000, 10), \"bps\")  # 100,000 bps",
      "exampleLanguage": "python",
      "mistake": "Reading a single counter value and calling it the throughput, when a counter only ever goes up and says nothing on its own.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate From Telemetry to Insight, but it does not work correctly.",
       "buggyCode": "print(\"throughput:\", in_octets, \"bps\")  # a counter is not a rate",
       "fixedCode": "print(\"throughput:\", rate(first, second, seconds), \"bps\")",
       "explanation": "A counter is a total since the device started; only the difference between two readings divided by the time between them is a rate."
      },
      "exercise": {
       "title": "Practise From Telemetry to Insight",
       "type": "write-code",
       "instructions": "Write rate(first, second, seconds) that returns the bit rate between two octet-counter readings, and print the rate for three pairs of readings.",
       "starterCode": "# Write rate() and compute three bit rates.\n# TODO: define rate and print the three results.\n",
       "solution": "def rate(first_value, second_value, seconds):\n    return (second_value - first_value) * 8 / seconds\n\n\nprint(\"in-octets 1000000 -> 1125000 in 10s:\", rate(1000000, 1125000, 10), \"bps\")\nprint(\"in-octets 1125000 -> 1375000 in 10s:\", rate(1125000, 1375000, 10), \"bps\")\nprint(\"out-octets 500000 -> 550000 in 10s:\", rate(500000, 550000, 10), \"bps\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "in-octets 1000000 -> 1125000 in 10s: 100000.0 bps\nin-octets 1125000 -> 1375000 in 10s: 200000.0 bps\nout-octets 500000 -> 550000 in 10s: 40000.0 bps",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "in-octets 1000000 -> 1125000 in 10s: 100000.0 bps\nin-octets 1125000 -> 1375000 in 10s: 200000.0 bps\nout-octets 500000 -> 550000 in 10s: 40000.0 bps",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Telemetry becomes insight only when raw counter values are turned into rates, changes, and comparisons: an in-octets counter on its own says nothing, but the difference between two readings divided by the time between them is the interface throughput in bits per second. A pipeline takes the stream of updates, normalises them into records with a path, a value, and a timestamp, and then computes the rates and thresholds that operators actually watch.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-telemetry-m1-l2",
      "slug": "netauto-apis-telemetry-m1-l2",
      "title": "Collectors and Subscriptions",
      "concept": "A telemetry collector holds the subscriptions for every device it watches, and it keeps one subscription per path per device so that each value arrives exactly once. The collector reconnects when a stream drops, and it resubscribes from the last known state so that no updates are lost. A collector that subscribes to the same path twice gets every update twice, which doubles the work downstream for no benefit.",
      "syntax": "one subscription per path per device",
      "exampleCode": "subscriptions = [\n    {\"device\": \"core-1\", \"path\": \".../in-octets\", \"mode\": \"SAMPLE\", \"interval\": 10},\n    {\"device\": \"core-1\", \"path\": \".../oper-status\", \"mode\": \"ON_CHANGE\"},\n]",
      "exampleLanguage": "python",
      "mistake": "Subscribing to the same path twice on one device, so every update arrives twice and is stored twice.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Collectors and Subscriptions, but it does not work correctly.",
       "buggyCode": "subs = [path, path]  # duplicate subscription",
       "fixedCode": "subs = list({path})  # deduplicate before subscribing",
       "explanation": "A duplicated subscription doubles the traffic and the storage for no extra information; the subscription list must be deduplicated before it is sent."
      },
      "exercise": {
       "title": "Practise Collectors and Subscriptions",
       "type": "write-code",
       "instructions": "Print the three subscriptions in the starter list (device, path, mode) and the total count on the first line.",
       "starterCode": "# Print the subscription list.\n# TODO: print the count, then each subscription.\nsubscriptions = [\n    {\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"mode\": \"SAMPLE\", \"interval\": 10},\n    {\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\", \"mode\": \"ON_CHANGE\"},\n    {\"device\": \"edge-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"mode\": \"SAMPLE\", \"interval\": 10},\n]\n",
       "solution": "subscriptions = [\n    {\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"mode\": \"SAMPLE\", \"interval\": 10},\n    {\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\", \"mode\": \"ON_CHANGE\"},\n    {\"device\": \"edge-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"mode\": \"SAMPLE\", \"interval\": 10},\n]\nprint(\"subscriptions:\", len(subscriptions))\nfor sub in subscriptions:\n    print(sub[\"device\"] + \" \" + sub[\"path\"] + \" [\" + sub[\"mode\"] + \"]\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "subscriptions: 3\ncore-1 /interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets [SAMPLE]\ncore-1 /interfaces/interface[name=GigabitEthernet1]/state/oper-status [ON_CHANGE]\nedge-1 /interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets [SAMPLE]",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "subscriptions: 3\ncore-1 /interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets [SAMPLE]\ncore-1 /interfaces/interface[name=GigabitEthernet1]/state/oper-status [ON_CHANGE]\nedge-1 /interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets [SAMPLE]",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A telemetry collector holds the subscriptions for every device it watches, and it keeps one subscription per path per device so that each value arrives exactly once. The collector reconnects when a stream drops, and it resubscribes from the last known state so that no updates are lost. A collector that subscribes to the same path twice gets every update twice, which doubles the work downstream for no benefit.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-telemetry-m1-l3",
      "slug": "netauto-apis-telemetry-m1-l3",
      "title": "Normalising Telemetry Data",
      "concept": "Normalising telemetry means turning updates from different devices and encodings into records with the same four fields: device, path, value, and timestamp. A record for an interface counter and a record for a BGP state look the same once normalised, so the rest of the pipeline can treat them identically. Without normalisation, every step downstream has to know about every device type and every encoding.",
      "syntax": "{\"device\": ..., \"path\": ..., \"value\": ..., \"timestamp\": ...}",
      "exampleCode": "record = {\n    \"device\": \"core-1\",\n    \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\",\n    \"value\": \"UP\",\n    \"timestamp\": 1793123456,\n}",
      "exampleLanguage": "python",
      "mistake": "Passing raw gNMI updates straight to the dashboard, so the dashboard has to understand every encoding and every device type.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Normalising Telemetry Data, but it does not work correctly.",
       "buggyCode": "dashboard.show(update)  # raw update, every format different",
       "fixedCode": "record = normalise(update)  # one shape\ndashboard.show(record)",
       "explanation": "Raw updates differ by device and encoding, so a dashboard that reads them directly must handle every variation; normalised records give it one shape to work with."
      },
      "exercise": {
       "title": "Check your understanding: Normalising Telemetry Data",
       "type": "multiple-choice",
       "instructions": "Which statement about Normalising Telemetry Data is correct?",
       "starterCode": "",
       "solution": "Normalising telemetry means turning updates from different devices and encodings into records with the same four fields: device, path, value, and timestamp.",
       "solutionExplanation": "Normalising telemetry means turning updates from different devices and encodings into records with the same four fields: device, path, value, and timestamp. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Normalising telemetry means turning updates from different devices and encodings into records with the same four fields: device, path, value, and timestamp.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Normalising Telemetry Data from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "Normalising telemetry means turning updates from different devices and encodings into records with the same four fields: device, path, value, and timestamp.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-telemetry-m1-l4",
      "slug": "netauto-apis-telemetry-m1-l4",
      "title": "Storing Time-Series Data",
      "concept": "Telemetry records are time-series data: each one is a value at a moment in time, and the questions asked of it are about time, such as what the rate was at 3 a.m. or how it changed over the last day. A time-series store keeps records ordered by timestamp and answers those questions quickly, while a normal database would scan the whole table for each one. Old records are downsampled or deleted on a retention policy, because keeping every second of every counter forever is not affordable.",
      "syntax": "timestamp -> value, ordered by time",
      "exampleCode": "# Time-series store:\n#   (timestamp, device, path) -> value\n# Retention: 10s samples for 7 days, then 5-minute averages for 90 days.",
      "exampleLanguage": "python",
      "mistake": "Storing every raw sample forever with no retention policy, until the disk fills up and the store stops working.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Storing Time-Series Data, but it does not work correctly.",
       "buggyCode": "# keep everything, forever",
       "fixedCode": "# retention: raw for 7 days, then downsampled averages",
       "explanation": "Telemetry grows without limit, so a retention policy that downsamples old data and deletes the oldest is part of the design, not an afterthought."
      },
      "exercise": {
       "title": "Check your understanding: Storing Time-Series Data",
       "type": "multiple-choice",
       "instructions": "Which statement about Storing Time-Series Data is correct?",
       "starterCode": "",
       "solution": "Telemetry records are time-series data: each one is a value at a moment in time, and the questions asked of it are about time, such as what the rate was at 3 a.",
       "solutionExplanation": "Telemetry records are time-series data: each one is a value at a moment in time, and the questions asked of it are about time, such as what the rate was at 3 a. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Telemetry records are time-series data: each one is a value at a moment in time, and the questions asked of it are about time, such as what the rate was at 3 a.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Storing Time-Series Data from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "Telemetry records are time-series data: each one is a value at a moment in time, and the questions asked of it are about time, such as what the rate was at 3 a.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-telemetry-m1-l5",
      "slug": "netauto-apis-telemetry-m1-l5",
      "title": "Building a Telemetry Pipeline in Python",
      "concept": "A telemetry pipeline is a chain of small steps: collect the update, normalise it into a record with device, path, value, and timestamp, store it, compute rates and thresholds, and hand the results to dashboards and alerts. Each step takes a record in and passes a record out, so a step can be tested on its own with a fixed input. A pipeline built this way is easy to extend: adding a new calculation is adding one step, not rewriting the collector.",
      "syntax": "normalise(device, path, value, timestamp_ns) -> record",
      "exampleCode": "import json\n\n\ndef normalise(device, path, value, timestamp_ns):\n    return {\"device\": device, \"path\": path, \"value\": value,\n            \"timestamp\": timestamp_ns // 1_000_000_000}\n\n\nprint(json.dumps(normalise(\"core-1\", \".../in-octets\", 1000000, 1793123456000000000)))",
      "exampleLanguage": "python",
      "mistake": "Storing the nanosecond timestamp as-is in the record, so the dashboard shows dates in the year 58000.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building a Telemetry Pipeline in Python, but it does not work correctly.",
       "buggyCode": "record = {\"timestamp\": 1793123456000000000}  # nanoseconds, not seconds",
       "fixedCode": "record = {\"timestamp\": 1793123456000000000 // 1_000_000_000}  # seconds",
       "explanation": "A gNMI timestamp is in nanoseconds, and most stores and dashboards expect seconds; the normalise step must convert it once, in one place."
      },
      "exercise": {
       "title": "Practise Building a Telemetry Pipeline in Python",
       "type": "write-code",
       "instructions": "Write normalise(device, path, value, timestamp_ns) that returns a record dict with the timestamp converted to seconds. Print the normalised JSON for two sample updates.",
       "starterCode": "# Write normalise() and print two records.\n# TODO: define normalise and print the two records as JSON.\nupdates = [\n    (\"core-1\", \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", 1000000, 1793123456000000000),\n    (\"core-1\", \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\", \"UP\", 1793123456000000000),\n]\n",
       "solution": "import json\n\n\ndef normalise(device, path, value, timestamp_ns):\n    return {\n        \"device\": device,\n        \"path\": path,\n        \"value\": value,\n        \"timestamp\": timestamp_ns // 1_000_000_000,\n    }\n\n\nupdates = [\n    (\"core-1\", \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", 1000000, 1793123456000000000),\n    (\"core-1\", \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\", \"UP\", 1793123456000000000),\n]\nfor device, path, value, timestamp in updates:\n    print(json.dumps(normalise(device, path, value, timestamp), sort_keys=True))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"timestamp\": 1793123456, \"value\": 1000000}\n{\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\", \"timestamp\": 1793123456, \"value\": \"UP\"}",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"timestamp\": 1793123456, \"value\": 1000000}\n{\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/oper-status\", \"timestamp\": 1793123456, \"value\": \"UP\"}",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A telemetry pipeline is a chain of small steps: collect the update, normalise it into a record with device, path, value, and timestamp, store it, compute rates and thresholds, and hand the results to dashboards and alerts. Each step takes a record in and passes a record out, so a step can be tested on its own with a fixed input. A pipeline built this way is easy to extend: adding a new calculation is adding one step, not rewriting the collector.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-telemetry-m2",
    "title": "Model-Driven Telemetry Pipelines in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-apis-telemetry-m2-l1",
      "slug": "netauto-apis-telemetry-m2-l1",
      "title": "Thresholds and Alerting",
      "concept": "A threshold turns a stream of numbers into an alert: when a value crosses the threshold, the pipeline raises an alert, and when it falls back below the threshold the alert clears. A good threshold has a warning level and a critical level, and it waits for the value to stay over the threshold for a short time before alerting, so a single spike does not page anyone. Alerting on every crossing without that delay is how teams end up ignoring their alerts.",
      "syntax": "if value >= critical: CRITICAL\nelif value >= warning: WARNING\nelse: OK",
      "exampleCode": "def check(value, warning, critical):\n    if value >= critical:\n        return \"CRITICAL\"\n    if value >= warning:\n        return \"WARNING\"\n    return \"OK\"\n\n\nprint(check(96, 80, 95))  # CRITICAL",
      "exampleLanguage": "python",
      "mistake": "Alerting on a single reading over the threshold, so a one-second spike pages the on-call engineer.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Thresholds and Alerting, but it does not work correctly.",
       "buggyCode": "if value > 90:\n    page_oncall()  # one spike is enough",
       "fixedCode": "if value > 90 for 5 minutes:\n    page_oncall()  # sustained, not a spike",
       "explanation": "A single reading over a threshold is usually noise; waiting for the value to stay over the threshold for a few minutes filters out spikes that fix themselves."
      },
      "exercise": {
       "title": "Practise Thresholds and Alerting",
       "type": "write-code",
       "instructions": "Write check(value, warning, critical) returning CRITICAL, WARNING, or OK, and print the result for five sample readings (cpu 45, 82, 96 and interface-errors 0, 12) with warning 80 and critical 95.",
       "starterCode": "# Write check() and classify five readings.\n# TODO: define check and print the five results.\nreadings = [(\"cpu\", 45), (\"cpu\", 82), (\"cpu\", 96), (\"interface-errors\", 0), (\"interface-errors\", 12)]\n",
       "solution": "def check(value, warning, critical):\n    if value >= critical:\n        return \"CRITICAL\"\n    if value >= warning:\n        return \"WARNING\"\n    return \"OK\"\n\n\nreadings = [(\"cpu\", 45), (\"cpu\", 82), (\"cpu\", 96), (\"interface-errors\", 0), (\"interface-errors\", 12)]\nfor name, value in readings:\n    print(name + \" \" + str(value) + \": \" + check(value, 80, 95))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "cpu 45: OK\ncpu 82: WARNING\ncpu 96: CRITICAL\ninterface-errors 0: OK\ninterface-errors 12: OK",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "cpu 45: OK\ncpu 82: WARNING\ncpu 96: CRITICAL\ninterface-errors 0: OK\ninterface-errors 12: OK",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A threshold turns a stream of numbers into an alert: when a value crosses the threshold, the pipeline raises an alert, and when it falls back below the threshold the alert clears. A good threshold has a warning level and a critical level, and it waits for the value to stay over the threshold for a short time before alerting, so a single spike does not page anyone. Alerting on every crossing without that delay is how teams end up ignoring their alerts.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-telemetry-m2-l2",
      "slug": "netauto-apis-telemetry-m2-l2",
      "title": "Dashboards from Telemetry",
      "concept": "A dashboard is a set of panels that each show one question about the telemetry: the throughput of an interface, the error rate over the last hour, or the state of every BGP session. Each panel is a query against the time-series store, and the dashboard refreshes it on a schedule. A dashboard that shows everything at once is unreadable, so the best ones show a few panels that answer the questions operators actually ask.",
      "syntax": "one panel = one question, one query",
      "exampleCode": "# Dashboard panels:\n#   Interface throughput (last 1h) -- rate of in-octets\n#   Interface errors (last 1h)     -- rate of in-errors\n#   BGP sessions                  -- current session-state",
      "exampleLanguage": "python",
      "mistake": "Putting every counter from every device on one dashboard, so nobody can find the panel that matters during an outage.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Dashboards from Telemetry, but it does not work correctly.",
       "buggyCode": "# 200 panels, one dashboard",
       "fixedCode": "# 6 panels: the ones that answer \"is the network healthy?\"",
       "explanation": "A dashboard is a tool for answering questions under pressure; a few panels that answer the important questions beat two hundred panels that answer none of them quickly."
      },
      "exercise": {
       "title": "Check your understanding: Dashboards from Telemetry",
       "type": "multiple-choice",
       "instructions": "Which statement about Dashboards from Telemetry is correct?",
       "starterCode": "",
       "solution": "A dashboard is a set of panels that each show one question about the telemetry: the throughput of an interface, the error rate over the last hour, or the state of every BGP session.",
       "solutionExplanation": "A dashboard is a set of panels that each show one question about the telemetry: the throughput of an interface, the error rate over the last hour, or the state of every BGP session. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A dashboard is a set of panels that each show one question about the telemetry: the throughput of an interface, the error rate over the last hour, or the state of every BGP session.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Dashboards from Telemetry from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A dashboard is a set of panels that each show one question about the telemetry: the throughput of an interface, the error rate over the last hour, or the state of every BGP session.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-telemetry-m2-l3",
      "slug": "netauto-apis-telemetry-m2-l3",
      "title": "Backpressure and Buffering",
      "concept": "Backpressure is what happens when updates arrive faster than the pipeline can process them, and the pipeline must decide what to do: buffer them in a queue, drop the oldest ones, or slow the collector down. A queue that grows without a limit eventually runs out of memory, so every buffer needs a maximum size and a policy for when it is full. Dropping old samples is usually the right policy for telemetry, because a late value is less useful than a fresh one.",
      "syntax": "queue with a max size + a drop policy",
      "exampleCode": "# Pipeline queue:\n#   max 10,000 records\n#   full -> drop the oldest, keep the newest\n#   alert when the queue is over 80% full",
      "exampleLanguage": "python",
      "mistake": "Giving the queue no maximum size, so a slow downstream step lets it grow until the collector runs out of memory.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Backpressure and Buffering, but it does not work correctly.",
       "buggyCode": "queue = []  # grows forever",
       "fixedCode": "from collections import deque\nqueue = deque(maxlen=10000)  # oldest dropped when full",
       "explanation": "An unbounded queue turns a slow downstream step into an out-of-memory crash; a bounded queue with a drop policy keeps the pipeline alive and the data fresh."
      },
      "exercise": {
       "title": "Check your understanding: Backpressure and Buffering",
       "type": "multiple-choice",
       "instructions": "Which statement about Backpressure and Buffering is correct?",
       "starterCode": "",
       "solution": "Backpressure is what happens when updates arrive faster than the pipeline can process them, and the pipeline must decide what to do: buffer them in a queue, drop the oldest ones, or slow the collector down.",
       "solutionExplanation": "Backpressure is what happens when updates arrive faster than the pipeline can process them, and the pipeline must decide what to do: buffer them in a queue, drop the oldest ones, or slow the collector down. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Backpressure is what happens when updates arrive faster than the pipeline can process them, and the pipeline must decide what to do: buffer them in a queue, drop the oldest ones, or slow the collector down.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Backpressure and Buffering from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "Backpressure is what happens when updates arrive faster than the pipeline can process them, and the pipeline must decide what to do: buffer them in a queue, drop the oldest ones, or slow the collector down.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-telemetry-m2-l4",
      "slug": "netauto-apis-telemetry-m2-l4",
      "title": "Securing Telemetry Streams",
      "concept": "Telemetry streams carry real information about a network, so they must be protected like any other management traffic: the gNMI connection runs over TLS, the client authenticates with a certificate or a token, and the collector only subscribes to the paths it needs. A stream that runs without TLS exposes interface names, addresses, and traffic rates to anyone on the path. Security is part of the pipeline design, not something added after the dashboards are built.",
      "syntax": "gNMI over TLS + client certificate or token",
      "exampleCode": "# Telemetry security checklist:\n#   TLS on the gNMI connection\n#   client certificate or token\n#   subscribe only to the paths needed\n#   collector in the management network",
      "exampleLanguage": "python",
      "mistake": "Running gNMI without TLS because it is a lab, and then copying the same configuration to production.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Securing Telemetry Streams, but it does not work correctly.",
       "buggyCode": "# lab: no TLS, no auth -- \"it is only a lab\"",
       "fixedCode": "# lab and production: TLS + auth, same as production",
       "explanation": "A lab configuration that skips security becomes the production configuration when it is copied; the lab should run the same TLS and authentication as production."
      },
      "exercise": {
       "title": "Practise Securing Telemetry Streams",
       "type": "write-code",
       "instructions": "Print the five telemetry security checklist items, each prefixed with 'CHECK ', then print 'telemetry secured' on the last line.",
       "starterCode": "# Print the telemetry security checklist.\n# TODO: print the five items, then 'telemetry secured'.\n",
       "solution": "checklist = [\n    \"gNMI over TLS, never plain text\",\n    \"client certificate or token authentication\",\n    \"subscribe only to the paths you need\",\n    \"collector in the management network, not the public one\",\n    \"rotate credentials on a schedule\",\n]\nfor item in checklist:\n    print(\"CHECK \" + item)\nprint(\"telemetry secured\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "CHECK gNMI over TLS, never plain text\nCHECK client certificate or token authentication\nCHECK subscribe only to the paths you need\nCHECK collector in the management network, not the public one\nCHECK rotate credentials on a schedule\ntelemetry secured",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "CHECK gNMI over TLS, never plain text\nCHECK client certificate or token authentication\nCHECK subscribe only to the paths you need\nCHECK collector in the management network, not the public one\nCHECK rotate credentials on a schedule\ntelemetry secured",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Telemetry streams carry real information about a network, so they must be protected like any other management traffic: the gNMI connection runs over TLS, the client authenticates with a certificate or a token, and the collector only subscribes to the paths it needs. A stream that runs without TLS exposes interface names, addresses, and traffic rates to anyone on the path. Security is part of the pipeline design, not something added after the dashboards are built.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-telemetry-m2-l5",
      "slug": "netauto-apis-telemetry-m2-l5",
      "title": "A Telemetry Pipeline End to End",
      "concept": "A complete telemetry pipeline starts with a subscription, normalises every update into a record, stores the records in a time-series store, computes rates and thresholds, and shows the results on a dashboard while alerts go to the on-call channel. Each part is small and testable, and the whole pipeline can be run end to end on recorded updates before it is connected to a real device. The pipeline is the difference between having telemetry and using it.",
      "syntax": "subscribe -> normalise -> store -> rates -> thresholds -> dashboard",
      "exampleCode": "# End-to-end pipeline:\n# 1. subscribe   2. normalise   3. store\n# 4. rates       5. thresholds  6. dashboard",
      "exampleLanguage": "python",
      "mistake": "Building the dashboard first and the collector last, so the dashboard has no data to show for weeks.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Telemetry Pipeline End to End, but it does not work correctly.",
       "buggyCode": "# dashboard first, collector \"later\"",
       "fixedCode": "# collector first, then storage, then the dashboard",
       "explanation": "A pipeline is built in the order the data flows: without a collector there is nothing to store, and without stored data there is nothing to show."
      },
      "exercise": {
       "title": "Practise A Telemetry Pipeline End to End",
       "type": "write-code",
       "instructions": "Print the six steps of the telemetry pipeline in order, then print 'pipeline complete' on the last line.",
       "starterCode": "# Print the telemetry pipeline steps.\n# TODO: print the six steps, then 'pipeline complete'.\n",
       "solution": "pipeline = [\n    \"1. subscribe to paths on the device\",\n    \"2. normalise updates into records\",\n    \"3. store records in a time-series store\",\n    \"4. compute rates from counters\",\n    \"5. check thresholds and raise alerts\",\n    \"6. show the results on a dashboard\",\n]\nfor step in pipeline:\n    print(step)\nprint(\"pipeline complete\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. subscribe to paths on the device\n2. normalise updates into records\n3. store records in a time-series store\n4. compute rates from counters\n5. check thresholds and raise alerts\n6. show the results on a dashboard\npipeline complete",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "1. subscribe to paths on the device\n2. normalise updates into records\n3. store records in a time-series store\n4. compute rates from counters\n5. check thresholds and raise alerts\n6. show the results on a dashboard\npipeline complete",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A complete telemetry pipeline starts with a subscription, normalises every update into a record, stores the records in a time-series store, computes rates and thresholds, and shows the results on a dashboard while alerts go to the on-call channel. Each part is small and testable, and the whole pipeline can be run end to end on recorded updates before it is connected to a real device. The pipeline is the difference between having telemetry and using it.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Model-Driven Telemetry Pipelines",
   "type": "write-code",
   "instructions": "Build a mini pipeline: normalise two in-octets readings for GigabitEthernet1 on core-1 (1000000 at 1793123456s, 1125000 ten seconds later) into records, print each record as sorted JSON, compute the throughput in bps, and print the status with warning 80000 and critical 150000.",
   "starterCode": "# Build the mini telemetry pipeline.\n# TODO: normalise the readings, compute the rate, and print the status.\n",
   "solution": "import json\n\n\ndef rate(first_value, second_value, seconds):\n    return (second_value - first_value) * 8 / seconds\n\n\ndef check(value, warning, critical):\n    if value >= critical:\n        return \"CRITICAL\"\n    if value >= warning:\n        return \"WARNING\"\n    return \"OK\"\n\n\ndef normalise(device, path, value, timestamp_ns):\n    return {\"device\": device, \"path\": path, \"value\": value,\n            \"timestamp\": timestamp_ns // 1_000_000_000}\n\n\nreadings = [\n    (\"core-1\", \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", 1000000, 1793123456000000000),\n    (\"core-1\", \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", 1125000, 1793123466000000000),\n]\nrecords = [normalise(*r) for r in readings]\nfor record in records:\n    print(json.dumps(record, sort_keys=True))\nthroughput = rate(records[0][\"value\"], records[1][\"value\"],\n                  records[1][\"timestamp\"] - records[0][\"timestamp\"])\nprint(\"throughput:\", throughput, \"bps\")\nprint(\"status:\", check(throughput, 80000, 150000))",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "{\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"timestamp\": 1793123456, \"value\": 1000000}\n{\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"timestamp\": 1793123466, \"value\": 1125000}\nthroughput: 100000.0 bps\nstatus: WARNING",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "{\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"timestamp\": 1793123456, \"value\": 1000000}\n{\"device\": \"core-1\", \"path\": \"/interfaces/interface[name=GigabitEthernet1]/state/counters/in-octets\", \"timestamp\": 1793123466, \"value\": 1125000}\nthroughput: 100000.0 bps\nstatus: WARNING",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Model-Driven Telemetry Pipelines brings the whole track together: normalise updates, compute a rate, and check a threshold.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "Model-Driven Telemetry Pipelines Capstone Project",
   "description": "A small end-to-end project that puts Model-Driven Telemetry Pipelines into practice.",
   "requirements": [
    "Normalise telemetry updates into records with device, path, value, and timestamp.",
    "Apply at least three of these skills: Telemetry rates, Normalisation, Thresholds and alerting, Time-series storage.",
    "Compute a rate from two counter readings and check it against warning and critical thresholds.",
    "Keep the pipeline testable offline with fixed sample updates, no live device needed."
   ],
   "rubric": [
    "The records carry device, path, value, and a timestamp in seconds.",
    "The rate is computed from the difference between two readings.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-config-mgmt",
  "slug": "netauto-apis-config-mgmt",
  "language": "python",
  "category": "devops",
  "title": "NETCONF Config Management",
  "description": "Learn netconf config management for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Configuration as data",
   "Templates",
   "Diffs",
   "Confirmed commit",
   "Backups",
   "Compliance checks",
   "Multi-device rollouts",
   "Drift detection"
  ],
  "prerequisites": [
   "netauto-apis-ncclient",
   "netauto-apis-restconf"
  ],
  "analogy": "Learning {topic} is like learning to keep a ledger: every change is written down, checked against the book, and reversible when it is wrong.",
  "modules": [
   {
    "id": "netauto-apis-config-mgmt-m1",
    "title": "NETCONF Config Management Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-config-mgmt-m1-l1",
      "slug": "netauto-apis-config-mgmt-m1-l1",
      "title": "Configuration as Data",
      "concept": "Configuration as data means treating a device configuration as a structured document, such as YAML or JSON, instead of a pile of CLI lines. The document names the interfaces, their descriptions, and their addresses, and a program turns it into the NETCONF or RESTCONF calls that apply it. Data can be validated, diffed, and stored in Git; CLI text can only be read by a human.",
      "syntax": "yaml.safe_load(config_text)",
      "exampleCode": "import yaml\n\nconfig = yaml.safe_load(\"\"\"\ninterfaces:\n  - name: GigabitEthernet1\n    description: Uplink to core\n    enabled: true\n\"\"\")\nprint(config[\"interfaces\"][0][\"name\"])",
      "exampleLanguage": "python",
      "mistake": "Keeping the source of truth as CLI text pasted into a wiki page, which no program can validate or diff.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Configuration as Data, but it does not work correctly.",
       "buggyCode": "# wiki page with CLI lines, copied by hand",
       "fixedCode": "# config.yaml in Git, validated and rendered by a program",
       "explanation": "CLI text in a wiki cannot be validated, diffed, or rendered by a program; structured data in version control can do all three."
      },
      "exercise": {
       "title": "Practise Configuration as Data",
       "type": "write-code",
       "instructions": "Load the YAML configuration in the starter code with yaml.safe_load, print the interface count, then print each interface as 'name: description'.",
       "starterCode": "# Load the YAML configuration and print it.\n# TODO: load CONFIG_YAML and print the interfaces.\nCONFIG_YAML = \"\"\"\ninterfaces:\n  - name: GigabitEthernet1\n    description: Uplink to core\n    enabled: true\n  - name: GigabitEthernet2\n    description: Server segment\n    enabled: true\n  - name: Loopback0\n    description: Management loopback\n    enabled: true\n\"\"\"\n",
       "solution": "import yaml\n\nCONFIG_YAML = \"\"\"\ninterfaces:\n  - name: GigabitEthernet1\n    description: Uplink to core\n    enabled: true\n  - name: GigabitEthernet2\n    description: Server segment\n    enabled: true\n  - name: Loopback0\n    description: Management loopback\n    enabled: true\n\"\"\"\ndata = yaml.safe_load(CONFIG_YAML)\nprint(\"interfaces:\", len(data[\"interfaces\"]))\nfor iface in data[\"interfaces\"]:\n    print(iface[\"name\"] + \": \" + iface[\"description\"])",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interfaces: 3\nGigabitEthernet1: Uplink to core\nGigabitEthernet2: Server segment\nLoopback0: Management loopback",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "interfaces: 3\nGigabitEthernet1: Uplink to core\nGigabitEthernet2: Server segment\nLoopback0: Management loopback",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Configuration as data means treating a device configuration as a structured document, such as YAML or JSON, instead of a pile of CLI lines. The document names the interfaces, their descriptions, and their addresses, and a program turns it into the NETCONF or RESTCONF calls that apply it. Data can be validated, diffed, and stored in Git; CLI text can only be read by a human.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-config-mgmt-m1-l2",
      "slug": "netauto-apis-config-mgmt-m1-l2",
      "title": "Templates and Variables",
      "concept": "A configuration template is a text file with placeholders for the values that change between devices, such as the interface name, the description, and the address. Rendering the template with the values for one device produces that device's configuration, and the same template produces every other device's configuration from its own values. Templates stop the copy-and-paste errors that come from editing one device's configuration by hand to make another's.",
      "syntax": "template.format(name=..., description=..., address=...)",
      "exampleCode": "template = \"\"\"interface {name}\n description {description}\n ip address {address} {mask}\n no shutdown\"\"\"\n\nprint(template.format(name=\"GigabitEthernet1\", description=\"Uplink to core\",\n                      address=\"192.0.2.1\", mask=\"255.255.255.0\"))",
      "exampleLanguage": "python",
      "mistake": "Hard-coding the interface name and address into the template, so a new device needs a new template.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Templates and Variables, but it does not work correctly.",
       "buggyCode": "template = \"\"\"interface GigabitEthernet1\n ip address 192.0.2.1 255.255.255.0\"\"\"  # works for one device only",
       "fixedCode": "template = \"\"\"interface {name}\n ip address {address} {mask}\"\"\"  # works for every device",
       "explanation": "A template with values baked in is just a configuration with extra steps; placeholders for the values that change are what make a template reusable."
      },
      "exercise": {
       "title": "Practise Templates and Variables",
       "type": "write-code",
       "instructions": "Write render(name, description, address, mask) that fills the interface template with str.format. Print the rendered configuration for GigabitEthernet1 and for Loopback0, separated by a line of three dashes.",
       "starterCode": "# Write render() and render two interfaces.\n# TODO: define render and print both configurations.\ntemplate = \"\"\"interface {name}\n description {description}\n ip address {address} {mask}\n no shutdown\"\"\"\n",
       "solution": "template = \"\"\"interface {name}\n description {description}\n ip address {address} {mask}\n no shutdown\"\"\"\n\n\ndef render(name, description, address, mask):\n    return template.format(name=name, description=description, address=address, mask=mask)\n\n\nprint(render(\"GigabitEthernet1\", \"Uplink to core\", \"192.0.2.1\", \"255.255.255.0\"))\nprint(\"---\")\nprint(render(\"Loopback0\", \"Management loopback\", \"10.0.0.1\", \"255.255.255.255\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interface GigabitEthernet1\n description Uplink to core\n ip address 192.0.2.1 255.255.255.0\n no shutdown\n---\ninterface Loopback0\n description Management loopback\n ip address 10.0.0.1 255.255.255.255\n no shutdown",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "interface GigabitEthernet1\n description Uplink to core\n ip address 192.0.2.1 255.255.255.0\n no shutdown\n---\ninterface Loopback0\n description Management loopback\n ip address 10.0.0.1 255.255.255.255\n no shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A configuration template is a text file with placeholders for the values that change between devices, such as the interface name, the description, and the address. Rendering the template with the values for one device produces that device's configuration, and the same template produces every other device's configuration from its own values. Templates stop the copy-and-paste errors that come from editing one device's configuration by hand to make another's.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-config-mgmt-m1-l3",
      "slug": "netauto-apis-config-mgmt-m1-l3",
      "title": "Diff Before You Apply",
      "concept": "A diff shows exactly what a change will do before it is applied, and the rule is simple: read the diff, and apply the change only when the diff is the change you intended. A diff with a line you did not expect means the template, the data, or the device state is not what you thought. Applying a change without reading its diff is how a small typo becomes a large outage.",
      "syntax": "diff(intended, running)",
      "exampleCode": "# Before applying:\n#   intended = render(template, values)\n#   running  = get_config(source=\"running\")\n#   print(diff(running, intended))\n# Apply only when the diff is exactly what you expect.",
      "exampleLanguage": "python",
      "mistake": "Applying a change and then checking the diff, when the diff was the thing that would have caught the mistake.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Diff Before You Apply, but it does not work correctly.",
       "buggyCode": "apply(change)\nprint(diff())  # too late, the change is live",
       "fixedCode": "print(diff())  # read it first\napply(change)  # only when the diff is right",
       "explanation": "A diff after the change only describes damage already done; a diff before the change is the last chance to catch a mistake cheaply."
      },
      "exercise": {
       "title": "Check your understanding: Diff Before You Apply",
       "type": "multiple-choice",
       "instructions": "Which statement about Diff Before You Apply is correct?",
       "starterCode": "",
       "solution": "A diff shows exactly what a change will do before it is applied, and the rule is simple: read the diff, and apply the change only when the diff is the change you intended.",
       "solutionExplanation": "A diff shows exactly what a change will do before it is applied, and the rule is simple: read the diff, and apply the change only when the diff is the change you intended. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A diff shows exactly what a change will do before it is applied, and the rule is simple: read the diff, and apply the change only when the diff is the change you intended.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Diff Before You Apply from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A diff shows exactly what a change will do before it is applied, and the rule is simple: read the diff, and apply the change only when the diff is the change you intended.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-config-mgmt-m1-l4",
      "slug": "netauto-apis-config-mgmt-m1-l4",
      "title": "Rollback and Confirmed Commit",
      "concept": "A confirmed commit applies a change and then waits: if nobody confirms it within the timeout, the device rolls the change back automatically. It is the safety net for a change that might cut off the very connection used to make it, because the rollback happens even when the operator can no longer reach the device. A confirmed commit with a short timeout is the standard way to make a risky change to a remote device.",
      "syntax": "<commit><confirmed/><confirm-timeout>120</confirm-timeout></commit>",
      "exampleCode": "# NETCONF confirmed commit (needs a lab device to run):\n# <rpc message-id=\"104\"><commit>\n#   <confirmed/><confirm-timeout>120</confirm-timeout>\n# </commit></rpc>\n# Confirm within 120 seconds, or the device rolls back.",
      "exampleLanguage": "python",
      "mistake": "Committing a change to a remote device without a confirmed commit, so a mistake that breaks access cannot be undone remotely.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rollback and Confirmed Commit, but it does not work correctly.",
       "buggyCode": "m.commit()  # if this breaks access, nobody can fix it",
       "fixedCode": "m.commit(confirmed=True, timeout=120)  # rolls back if not confirmed",
       "explanation": "A plain commit is permanent the moment it is applied; a confirmed commit rolls back on its own if the operator cannot confirm, which is what saves a remote device."
      },
      "exercise": {
       "title": "Check your understanding: Rollback and Confirmed Commit",
       "type": "multiple-choice",
       "instructions": "Which statement about Rollback and Confirmed Commit is correct?",
       "starterCode": "",
       "solution": "A confirmed commit applies a change and then waits: if nobody confirms it within the timeout, the device rolls the change back automatically.",
       "solutionExplanation": "A confirmed commit applies a change and then waits: if nobody confirms it within the timeout, the device rolls the change back automatically. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A confirmed commit applies a change and then waits: if nobody confirms it within the timeout, the device rolls the change back automatically.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Rollback and Confirmed Commit from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A confirmed commit applies a change and then waits: if nobody confirms it within the timeout, the device rolls the change back automatically.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-config-mgmt-m1-l5",
      "slug": "netauto-apis-config-mgmt-m1-l5",
      "title": "Building a Config Diff in Python",
      "concept": "A configuration diff compares the intended configuration with the running configuration and lists exactly what would change: the lines added, the lines removed, and the lines modified. Reviewing the diff before applying it is how an engineer catches a mistake while it is still cheap to fix. A change with an empty diff is a change that does nothing, and a change with a surprising diff is a change that should not be applied yet.",
      "syntax": "diff(old, new) -> ['+ added', '- removed', '~ changed']",
      "exampleCode": "def diff(old, new):\n    lines = []\n    for key in sorted(set(old) | set(new)):\n        if key not in old:\n            lines.append(\"+ \" + key + \" = \" + str(new[key]))\n        elif key not in new:\n            lines.append(\"- \" + key + \" = \" + str(old[key]))\n        elif old[key] != new[key]:\n            lines.append(\"~ \" + key + \": \" + str(old[key]) + \" -> \" + str(new[key]))\n    return lines",
      "exampleLanguage": "python",
      "mistake": "Comparing only the keys that exist in both configurations, so added and removed settings never appear in the diff.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building a Config Diff in Python, but it does not work correctly.",
       "buggyCode": "for key in old:\n    if key in new and old[key] != new[key]:\n        print(\"~\", key)  # additions and removals invisible",
       "fixedCode": "for key in sorted(set(old) | set(new)):\n    # union of keys: additions, removals, and changes all appear",
       "explanation": "A diff over the intersection of the keys hides the most dangerous changes, the ones that add or remove a setting entirely; the union of the keys shows all three kinds."
      },
      "exercise": {
       "title": "Practise Building a Config Diff in Python",
       "type": "write-code",
       "instructions": "Write diff(old, new) that returns lines marked '+ ' for added keys, '- ' for removed keys, and '~ ' for changed keys. Print the diff between the two sample interface dicts.",
       "starterCode": "# Write diff(old, new) and print the diff.\n# TODO: define diff and print the result.\nold = {\"description\": \"Old uplink\", \"enabled\": True, \"mtu\": 1500}\nnew = {\"description\": \"Uplink to core\", \"enabled\": True, \"mtu\": 9000}\n",
       "solution": "def diff(old, new):\n    lines = []\n    for key in sorted(set(old) | set(new)):\n        if key not in old:\n            lines.append(\"+ \" + key + \" = \" + str(new[key]))\n        elif key not in new:\n            lines.append(\"- \" + key + \" = \" + str(old[key]))\n        elif old[key] != new[key]:\n            lines.append(\"~ \" + key + \": \" + str(old[key]) + \" -> \" + str(new[key]))\n    return lines\n\n\nold = {\"description\": \"Old uplink\", \"enabled\": True, \"mtu\": 1500}\nnew = {\"description\": \"Uplink to core\", \"enabled\": True, \"mtu\": 9000}\nfor line in diff(old, new):\n    print(line)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "~ description: Old uplink -> Uplink to core\n~ mtu: 1500 -> 9000",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "~ description: Old uplink -> Uplink to core\n~ mtu: 1500 -> 9000",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A configuration diff compares the intended configuration with the running configuration and lists exactly what would change: the lines added, the lines removed, and the lines modified. Reviewing the diff before applying it is how an engineer catches a mistake while it is still cheap to fix. A change with an empty diff is a change that does nothing, and a change with a surprising diff is a change that should not be applied yet.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-config-mgmt-m2",
    "title": "NETCONF Config Management in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-apis-config-mgmt-m2-l1",
      "slug": "netauto-apis-config-mgmt-m2-l1",
      "title": "Backups and Version Control",
      "concept": "A configuration backup is a copy of a device's running configuration, stored with the device name and the date it was taken, in a place it can be found again. Backups are taken on a schedule, not by hand, and they are stored in version control so that any past configuration can be retrieved. The only backup that matters is one that has been tested by restoring it to a lab device and confirming the device comes back as it was.",
      "syntax": "backups/<device>-<date>.cfg, committed to Git",
      "exampleCode": "import json\n\nbackup = {\"device\": \"core-1\", \"date\": \"2026-11-24\",\n          \"source\": \"running\",\n          \"file\": \"backups/core-1-2026-11-24.cfg\",\n          \"stored_in\": \"git\"}\nprint(json.dumps(backup, indent=2, sort_keys=True))",
      "exampleLanguage": "python",
      "mistake": "Storing backups in a folder with no device name or date, so nobody can tell which backup belongs to which device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Backups and Version Control, but it does not work correctly.",
       "buggyCode": "backups/config.cfg  # which device? which date?",
       "fixedCode": "backups/core-1-2026-11-24.cfg  # device and date in the name",
       "explanation": "A backup without a device name and a date is useless in an emergency, because the operator cannot tell which file to restore; the name must carry both."
      },
      "exercise": {
       "title": "Practise Backups and Version Control",
       "type": "write-code",
       "instructions": "Build a backup record dict (device core-1, date 2026-11-24, source running, file backups/core-1-2026-11-24.cfg, 128 lines, stored in git) and print it as sorted, indented JSON.",
       "starterCode": "# Build a backup record.\n# TODO: build the dict and print it as JSON.\n",
       "solution": "import json\n\nbackup = {\n    \"device\": \"core-1\",\n    \"date\": \"2026-11-24\",\n    \"source\": \"running\",\n    \"file\": \"backups/core-1-2026-11-24.cfg\",\n    \"lines\": 128,\n    \"stored_in\": \"git\",\n}\nprint(json.dumps(backup, indent=2, sort_keys=True))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\n  \"date\": \"2026-11-24\",\n  \"device\": \"core-1\",\n  \"file\": \"backups/core-1-2026-11-24.cfg\",\n  \"lines\": 128,\n  \"source\": \"running\",\n  \"stored_in\": \"git\"\n}",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{\n  \"date\": \"2026-11-24\",\n  \"device\": \"core-1\",\n  \"file\": \"backups/core-1-2026-11-24.cfg\",\n  \"lines\": 128,\n  \"source\": \"running\",\n  \"stored_in\": \"git\"\n}",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A configuration backup is a copy of a device's running configuration, stored with the device name and the date it was taken, in a place it can be found again. Backups are taken on a schedule, not by hand, and they are stored in version control so that any past configuration can be retrieved. The only backup that matters is one that has been tested by restoring it to a lab device and confirming the device comes back as it was.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-config-mgmt-m2-l2",
      "slug": "netauto-apis-config-mgmt-m2-l2",
      "title": "Compliance Checks",
      "concept": "A compliance check compares a device's running configuration against the rules the team agreed, such as every interface having a description, or no interface being left with a default password. The check runs on a schedule and reports the devices that break the rules, so the team fixes them before an audit finds them. Compliance is a program that runs, not a document that is read once a year.",
      "syntax": "check(running) -> list of violations",
      "exampleCode": "# Compliance rules:\n#   every interface has a description\n#   every interface has an MTU in the allowed range\n#   no interface is enabled without a description",
      "exampleLanguage": "python",
      "mistake": "Running compliance checks by hand once a year, when drift happens every week.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Compliance Checks, but it does not work correctly.",
       "buggyCode": "# yearly manual audit",
       "fixedCode": "# nightly automated check, report every morning",
       "explanation": "A yearly check finds a year of drift at once; a nightly check finds each problem while it is still small and fresh."
      },
      "exercise": {
       "title": "Check your understanding: Compliance Checks",
       "type": "multiple-choice",
       "instructions": "Which statement about Compliance Checks is correct?",
       "starterCode": "",
       "solution": "A compliance check compares a device's running configuration against the rules the team agreed, such as every interface having a description, or no interface being left with a default password.",
       "solutionExplanation": "A compliance check compares a device's running configuration against the rules the team agreed, such as every interface having a description, or no interface being left with a default password. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A compliance check compares a device's running configuration against the rules the team agreed, such as every interface having a description, or no interface being left with a default password.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Compliance Checks from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A compliance check compares a device's running configuration against the rules the team agreed, such as every interface having a description, or no interface being left with a default password.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-config-mgmt-m2-l3",
      "slug": "netauto-apis-config-mgmt-m2-l3",
      "title": "Multi-Device Rollouts",
      "concept": "A multi-device rollout applies the same change to many devices in waves: a small wave of lab or low-risk devices first, then larger waves, with a check after each wave. A failure in an early wave stops the rollout before it reaches the rest of the fleet. Rolling out to every device at once means a single mistake hits every device at the same time.",
      "syntax": "wave 1: lab -> wave 2: 10% -> wave 3: rest",
      "exampleCode": "# Rollout waves:\n#   wave 1: 2 lab devices, verify\n#   wave 2: 10% of production, verify\n#   wave 3: the rest, verify",
      "exampleLanguage": "python",
      "mistake": "Pushing a change to all two hundred devices at once, so a bad template takes the whole network down together.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Multi-Device Rollouts, but it does not work correctly.",
       "buggyCode": "for device in all_devices:\n    apply(change)  # all at once",
       "fixedCode": "for wave in [lab, ten_percent, rest]:\n    apply(wave)\n    verify(wave)  # stop on failure",
       "explanation": "A change pushed everywhere at once fails everywhere at once; waves with a verification step after each one contain the damage to the first wave."
      },
      "exercise": {
       "title": "Check your understanding: Multi-Device Rollouts",
       "type": "multiple-choice",
       "instructions": "Which statement about Multi-Device Rollouts is correct?",
       "starterCode": "",
       "solution": "A multi-device rollout applies the same change to many devices in waves: a small wave of lab or low-risk devices first, then larger waves, with a check after each wave.",
       "solutionExplanation": "A multi-device rollout applies the same change to many devices in waves: a small wave of lab or low-risk devices first, then larger waves, with a check after each wave. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A multi-device rollout applies the same change to many devices in waves: a small wave of lab or low-risk devices first, then larger waves, with a check after each wave.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Multi-Device Rollouts from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A multi-device rollout applies the same change to many devices in waves: a small wave of lab or low-risk devices first, then larger waves, with a check after each wave.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-config-mgmt-m2-l4",
      "slug": "netauto-apis-config-mgmt-m2-l4",
      "title": "Drift Detection",
      "concept": "Configuration drift is the difference between the intended configuration in version control and the running configuration on the device, and it happens when someone changes a device by hand and forgets to update the source of truth. Drift detection reads the running configuration, compares it with the intended one, and reports every difference. A device with drift is a device whose next automated change may undo a fix nobody recorded, so drift must be found and resolved before the next change.",
      "syntax": "compare intended (Git) with running (device), report differences",
      "exampleCode": "intended = {\"GigabitEthernet1\": \"Uplink to core\"}\nrunning = {\"GigabitEthernet1\": \"Uplink to core\"}\nprint(\"drift:\", [k for k in intended if intended[k] != running.get(k)])",
      "exampleLanguage": "python",
      "mistake": "Treating drift as harmless because the device still works, when drift means the next automated change may undo an unrecorded fix.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Drift Detection, but it does not work correctly.",
       "buggyCode": "# \"it works, so the drift does not matter\"",
       "fixedCode": "# drift means the source of truth is wrong; fix it first",
       "explanation": "A device that works with drift is a device whose source of truth is wrong, and the next automated change will overwrite the unrecorded fix that keeps it working."
      },
      "exercise": {
       "title": "Practise Drift Detection",
       "type": "write-code",
       "instructions": "Compare the intended descriptions with the running descriptions and print 'drift found:' followed by one line per drifted interface, or 'no drift' if they match.",
       "starterCode": "# Detect configuration drift.\n# TODO: compare intended and running, and print the drift.\nintended = {\"GigabitEthernet1\": \"Uplink to core\", \"GigabitEthernet2\": \"Server segment\"}\nrunning = {\"GigabitEthernet1\": \"Uplink to core\", \"GigabitEthernet2\": \"Old server link\"}\n",
       "solution": "intended = {\"GigabitEthernet1\": \"Uplink to core\", \"GigabitEthernet2\": \"Server segment\"}\nrunning = {\"GigabitEthernet1\": \"Uplink to core\", \"GigabitEthernet2\": \"Old server link\"}\ndrift = []\nfor name in sorted(set(intended) | set(running)):\n    if intended.get(name) != running.get(name):\n        drift.append(name + \": intended '\" + str(intended.get(name)) + \"' but running '\" + str(running.get(name)) + \"'\")\nif drift:\n    print(\"drift found:\")\n    for line in drift:\n        print(\"  \" + line)\nelse:\n    print(\"no drift\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "drift found:\n  GigabitEthernet2: intended 'Server segment' but running 'Old server link'",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "drift found:\n  GigabitEthernet2: intended 'Server segment' but running 'Old server link'",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Configuration drift is the difference between the intended configuration in version control and the running configuration on the device, and it happens when someone changes a device by hand and forgets to update the source of truth. Drift detection reads the running configuration, compares it with the intended one, and reports every difference. A device with drift is a device whose next automated change may undo a fix nobody recorded, so drift must be found and resolved before the next change.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-config-mgmt-m2-l5",
      "slug": "netauto-apis-config-mgmt-m2-l5",
      "title": "A Config Management Workflow",
      "concept": "A configuration management workflow turns an idea into a safe change: write the intended configuration as data, render it from a template, validate it against the YANG model, diff it against the running configuration, apply it with NETCONF in a lab first, verify it, and commit the result to version control. Each step is small and checkable, and a failure at any step stops the workflow before the device is touched. The workflow is the same for one device or a hundred.",
      "syntax": "data -> template -> validate -> diff -> lab -> verify -> Git",
      "exampleCode": "# Workflow:\n# 1. data  2. template  3. validate  4. diff\n# 5. lab   6. verify    7. Git",
      "exampleLanguage": "python",
      "mistake": "Skipping the lab step for a change that looks small, when small changes are the ones that most often carry a typo.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Config Management Workflow, but it does not work correctly.",
       "buggyCode": "# \"it is only a description, skip the lab\"",
       "fixedCode": "# every change runs in the lab first, however small",
       "explanation": "The size of a change says nothing about its risk; a one-word typo in a description is harmless, but the same typo in an address is an outage, and only the lab step tells them apart."
      },
      "exercise": {
       "title": "Practise A Config Management Workflow",
       "type": "write-code",
       "instructions": "Print the seven steps of the configuration management workflow in order, then print 'workflow complete' on the last line.",
       "starterCode": "# Print the config management workflow.\n# TODO: print the seven steps, then 'workflow complete'.\n",
       "solution": "steps = [\n    \"1. write the intended configuration as data\",\n    \"2. render it from a template\",\n    \"3. validate it against the YANG model\",\n    \"4. diff it against the running configuration\",\n    \"5. apply it with NETCONF in the lab\",\n    \"6. verify with get-config\",\n    \"7. commit the result to version control\",\n]\nfor step in steps:\n    print(step)\nprint(\"workflow complete\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. write the intended configuration as data\n2. render it from a template\n3. validate it against the YANG model\n4. diff it against the running configuration\n5. apply it with NETCONF in the lab\n6. verify with get-config\n7. commit the result to version control\nworkflow complete",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "1. write the intended configuration as data\n2. render it from a template\n3. validate it against the YANG model\n4. diff it against the running configuration\n5. apply it with NETCONF in the lab\n6. verify with get-config\n7. commit the result to version control\nworkflow complete",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A configuration management workflow turns an idea into a safe change: write the intended configuration as data, render it from a template, validate it against the YANG model, diff it against the running configuration, apply it with NETCONF in a lab first, verify it, and commit the result to version control. Each step is small and checkable, and a failure at any step stops the workflow before the device is touched. The workflow is the same for one device or a hundred.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: NETCONF Config Management",
   "type": "write-code",
   "instructions": "Load the YAML configuration, build the intended descriptions dict, and diff it against the running descriptions. Print the intended interface count, each diff line, and 'drift detected' or 'no drift'.",
   "starterCode": "# Diff intended configuration against running.\n# TODO: load the YAML, build the intended dict, and print the diff.\n",
   "solution": "import yaml\n\nCONFIG_YAML = \"\"\"\ninterfaces:\n  - name: GigabitEthernet1\n    description: Uplink to core\n    enabled: true\n    mtu: 9000\n  - name: GigabitEthernet2\n    description: Server segment\n    enabled: true\n    mtu: 1500\n\"\"\"\nrunning = {\"GigabitEthernet1\": \"Uplink to core\", \"GigabitEthernet2\": \"Old server link\"}\n\n\ndef diff(old, new):\n    lines = []\n    for key in sorted(set(old) | set(new)):\n        if key not in old:\n            lines.append(\"+ \" + key + \" = \" + str(new[key]))\n        elif key not in new:\n            lines.append(\"- \" + key + \" = \" + str(old[key]))\n        elif old[key] != new[key]:\n            lines.append(\"~ \" + key + \": \" + str(old[key]) + \" -> \" + str(new[key]))\n    return lines\n\n\ndata = yaml.safe_load(CONFIG_YAML)\nintended = {i[\"name\"]: i[\"description\"] for i in data[\"interfaces\"]}\nprint(\"intended interfaces:\", len(intended))\nfor line in diff(running, intended):\n    print(line)\nprint(\"drift detected\" if diff(running, intended) else \"no drift\")",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "intended interfaces: 2\n~ GigabitEthernet2: Old server link -> Server segment\ndrift detected",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "intended interfaces: 2\n~ GigabitEthernet2: Old server link -> Server segment\ndrift detected",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "NETCONF Config Management brings the whole track together: load config as data, diff it, and detect drift.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "NETCONF Config Management Capstone Project",
   "description": "A small end-to-end project that puts NETCONF Config Management into practice.",
   "requirements": [
    "Load the intended configuration from YAML and diff it against the running configuration.",
    "Apply at least three of these skills: Configuration as data, Diffs, Drift detection, Backups.",
    "Report drift with the intended and running values side by side.",
    "Note that applying the change needs a lab device with NETCONF enabled."
   ],
   "rubric": [
    "The intended configuration is loaded from structured data, not pasted text.",
    "The diff shows added, removed, and changed values clearly.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-apis-api-first",
  "slug": "netauto-apis-api-first",
  "language": "python",
  "category": "devops",
  "title": "API-First Network Operations",
  "description": "Learn api-first network operations for network automation: hands-on Python practice with real message formats, honest lab notes, and no faked device output.",
  "difficulty": "Advanced",
  "estimatedHours": 10,
  "skills": [
   "API-first design",
   "Designing network APIs",
   "Idempotency",
   "API versioning",
   "Client libraries",
   "Offline testing",
   "Audit logs",
   "Rate limits"
  ],
  "prerequisites": [
   "netauto-apis-config-mgmt",
   "netauto-apis-telemetry"
  ],
  "analogy": "Learning {topic} is like learning to run a restaurant from written orders instead of shouted ones: every order is recorded, checked, and repeatable.",
  "modules": [
   {
    "id": "netauto-apis-api-first-m1",
    "title": "API-First Network Operations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-apis-api-first-m1-l1",
      "slug": "netauto-apis-api-first-m1-l1",
      "title": "What Does API-First Mean?",
      "concept": "API-first means designing the network so that every operation is available through an API before it is available through a CLI or a web page, and the CLI becomes a thin wrapper around the same API. When the API is the real interface, automation, dashboards, and humans all use the same operations and see the same data. API-first is a design choice, not a product: it is decided when the operation is designed, not after it is built.",
      "syntax": "API first, CLI second",
      "exampleCode": "# API-first:\n#   1. design the API operation\n#   2. build the API\n#   3. build the CLI on top of the API\n# Automation, dashboards, and humans all use the same API.",
      "exampleLanguage": "python",
      "mistake": "Building the CLI first and adding an API later as an afterthought, so the API exposes a different model from the one operators use.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Does API-First Mean?, but it does not work correctly.",
       "buggyCode": "# CLI first, API later -- two different models",
       "fixedCode": "# API first, CLI on top -- one model, used by everyone",
       "explanation": "An API added after the CLI usually exposes the CLI's quirks instead of a clean model; designing the API first gives everyone the same operations."
      },
      "exercise": {
       "title": "Practise What Does API-First Mean?",
       "type": "write-code",
       "instructions": "Print the five API-first principles, each prefixed with '- ', then print 'api-first' on the last line.",
       "starterCode": "# Print the API-first principles.\n# TODO: print the five principles, then 'api-first'.\n",
       "solution": "principles = [\n    \"every operation is available through an API\",\n    \"the API is designed before the CLI\",\n    \"automation and humans use the same operations\",\n    \"changes go through the API, not around it\",\n    \"the API is versioned and documented\",\n]\nfor principle in principles:\n    print(\"- \" + principle)\nprint(\"api-first\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "- every operation is available through an API\n- the API is designed before the CLI\n- automation and humans use the same operations\n- changes go through the API, not around it\n- the API is versioned and documented\napi-first",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "- every operation is available through an API\n- the API is designed before the CLI\n- automation and humans use the same operations\n- changes go through the API, not around it\n- the API is versioned and documented\napi-first",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "API-first means designing the network so that every operation is available through an API before it is available through a CLI or a web page, and the CLI becomes a thin wrapper around the same API. When the API is the real interface, automation, dashboards, and humans all use the same operations and see the same data. API-first is a design choice, not a product: it is decided when the operation is designed, not after it is built.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-api-first-m1-l2",
      "slug": "netauto-apis-api-first-m1-l2",
      "title": "Designing a Network API",
      "concept": "Designing a network API starts with the resources it exposes, such as interfaces, routes, and BGP neighbours, and the operations on each one: read it, create it, update it, and delete it. Each operation gets a clear name, a clear input, and a clear output, and the same naming is used everywhere so that learning one resource teaches the rest. A well-designed API reads like the network it manages, not like the database underneath it.",
      "syntax": "GET /api/v1/interfaces\nGET /api/v1/interfaces/{name}\nPATCH /api/v1/interfaces/{name}",
      "exampleCode": "# Resources: interfaces, routes, bgp-neighbours\n# Operations: list, read, create, update, delete\n# GET /api/v1/interfaces\n# GET /api/v1/interfaces/{name}\n# PATCH /api/v1/interfaces/{name}",
      "exampleLanguage": "python",
      "mistake": "Naming the endpoints after the database tables underneath, so the API exposes internal details that change with every refactor.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Designing a Network API, but it does not work correctly.",
       "buggyCode": "GET /api/v1/interface_table_rows",
       "fixedCode": "GET /api/v1/interfaces",
       "explanation": "An API should name the resources operators think in, like interfaces, not the tables that store them; internal names leak implementation details that change."
      },
      "exercise": {
       "title": "Practise Designing a Network API",
       "type": "write-code",
       "instructions": "Print the five endpoints of the interfaces API (method, path, description) in order.",
       "starterCode": "# Print the interfaces API endpoints.\n# TODO: print the five endpoints.\n",
       "solution": "endpoints = [\n    (\"GET\", \"/api/v1/interfaces\", \"list all interfaces\"),\n    (\"GET\", \"/api/v1/interfaces/{name}\", \"read one interface\"),\n    (\"PATCH\", \"/api/v1/interfaces/{name}\", \"update one interface\"),\n    (\"POST\", \"/api/v1/interfaces\", \"create an interface\"),\n    (\"DELETE\", \"/api/v1/interfaces/{name}\", \"delete an interface\"),\n]\nfor method, path, description in endpoints:\n    print(method + \" \" + path + \" -- \" + description)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GET /api/v1/interfaces -- list all interfaces\nGET /api/v1/interfaces/{name} -- read one interface\nPATCH /api/v1/interfaces/{name} -- update one interface\nPOST /api/v1/interfaces -- create an interface\nDELETE /api/v1/interfaces/{name} -- delete an interface",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "GET /api/v1/interfaces -- list all interfaces\nGET /api/v1/interfaces/{name} -- read one interface\nPATCH /api/v1/interfaces/{name} -- update one interface\nPOST /api/v1/interfaces -- create an interface\nDELETE /api/v1/interfaces/{name} -- delete an interface",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Designing a network API starts with the resources it exposes, such as interfaces, routes, and BGP neighbours, and the operations on each one: read it, create it, update it, and delete it. Each operation gets a clear name, a clear input, and a clear output, and the same naming is used everywhere so that learning one resource teaches the rest. A well-designed API reads like the network it manages, not like the database underneath it.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-api-first-m1-l3",
      "slug": "netauto-apis-api-first-m1-l3",
      "title": "Idempotency and Safe Retries",
      "concept": "An idempotent operation gives the same result whether it runs once or ten times, and it is what makes retries safe: if a request times out, the client can send it again without worrying that it will be applied twice. Setting a description to the same value is idempotent, but creating a new resource with a random name is not. APIs that are idempotent let clients retry on timeouts and 5xx errors, which is how automation survives a flaky network.",
      "syntax": "PUT / PATCH with the same body -> same result",
      "exampleCode": "# Idempotent:  PATCH description to \"Uplink to core\" (same every time)\n# Not idempotent: POST a new interface with a random name (creates a new one each time)\n# Safe retry: timeout or 5xx -> send the same request again",
      "exampleLanguage": "python",
      "mistake": "Retrying a non-idempotent POST after a timeout, and creating the same resource twice.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Idempotency and Safe Retries, but it does not work correctly.",
       "buggyCode": "response = requests.post(url, json=body)  # times out\nresponse = requests.post(url, json=body)  # creates it twice",
       "fixedCode": "response = requests.post(url, json=body, headers={\"Idempotency-Key\": key})\n# same key -> the server applies it once",
       "explanation": "A retried POST without an idempotency key creates a second resource; an idempotency key tells the server to apply the same request only once."
      },
      "exercise": {
       "title": "Check your understanding: Idempotency and Safe Retries",
       "type": "multiple-choice",
       "instructions": "Which statement about Idempotency and Safe Retries is correct?",
       "starterCode": "",
       "solution": "An idempotent operation gives the same result whether it runs once or ten times, and it is what makes retries safe: if a request times out, the client can send it again without worrying that it will be applied twice.",
       "solutionExplanation": "An idempotent operation gives the same result whether it runs once or ten times, and it is what makes retries safe: if a request times out, the client can send it again without worrying that it will be applied twice. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "An idempotent operation gives the same result whether it runs once or ten times, and it is what makes retries safe: if a request times out, the client can send it again without worrying that it will be applied twice.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Idempotency and Safe Retries from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "An idempotent operation gives the same result whether it runs once or ten times, and it is what makes retries safe: if a request times out, the client can send it again without worrying that it will be applied twice.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-api-first-m1-l4",
      "slug": "netauto-apis-api-first-m1-l4",
      "title": "Versioning Network APIs",
      "concept": "A network API is versioned in its URL, such as /api/v1/interfaces, so that a new version can change the model without breaking clients that use the old one. The old version keeps working while clients migrate, and it is only removed after every client has moved. Changing a versioned API without changing the version number breaks every client that trusted the old contract.",
      "syntax": "/api/v1/interfaces, /api/v2/interfaces",
      "exampleCode": "# /api/v1/interfaces -- original\n# /api/v2/interfaces -- new fields, old clients unaffected\n# v1 removed only after every client has migrated",
      "exampleLanguage": "python",
      "mistake": "Changing the shape of a v1 response in place, when clients were written against the old shape.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Versioning Network APIs, but it does not work correctly.",
       "buggyCode": "# v1 now returns a different field name -- every client breaks",
       "fixedCode": "# v2 returns the new field name; v1 keeps the old one",
       "explanation": "A version number is a promise that the shape will not change; breaking that promise in place breaks every client that trusted it."
      },
      "exercise": {
       "title": "Check your understanding: Versioning Network APIs",
       "type": "multiple-choice",
       "instructions": "Which statement about Versioning Network APIs is correct?",
       "starterCode": "",
       "solution": "A network API is versioned in its URL, such as /api/v1/interfaces, so that a new version can change the model without breaking clients that use the old one.",
       "solutionExplanation": "A network API is versioned in its URL, such as /api/v1/interfaces, so that a new version can change the model without breaking clients that use the old one. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A network API is versioned in its URL, such as /api/v1/interfaces, so that a new version can change the model without breaking clients that use the old one.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Versioning Network APIs from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A network API is versioned in its URL, such as /api/v1/interfaces, so that a new version can change the model without breaking clients that use the old one.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-api-first-m1-l5",
      "slug": "netauto-apis-api-first-m1-l5",
      "title": "Building an API Client Library",
      "concept": "An API client library wraps the HTTP calls for a network API into small methods with clear names, such as get_interface, set_description, and list_interfaces, so the rest of the program never sees a URL or a header. The library handles authentication, retries, and error checking once, and every script that uses it gets those behaviours for free. A good client library is the difference between a team that automates and a team that writes the same HTTP code in every script.",
      "syntax": "class NetworkApiClient:\n    def get_interface(self, name): ...",
      "exampleCode": "class NetworkApiClient:\n    def __init__(self, base_url):\n        self.base_url = base_url\n\n    def get_interface(self, name):\n        return {\"method\": \"GET\",\n                \"url\": self.base_url + \"/api/v1/interfaces/\" + name}",
      "exampleLanguage": "python",
      "mistake": "Returning raw HTTP responses from the client library, so every caller has to check status codes and parse JSON itself.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Building an API Client Library, but it does not work correctly.",
       "buggyCode": "def get_interface(self, name):\n    return requests.get(self.base_url + \"/api/v1/interfaces/\" + name)",
       "fixedCode": "def get_interface(self, name):\n    response = requests.get(self.base_url + \"/api/v1/interfaces/\" + name)\n    response.raise_for_status()\n    return response.json()",
       "explanation": "A client library that returns raw responses pushes the error handling onto every caller; checking the status and returning the parsed data keeps the callers simple."
      },
      "exercise": {
       "title": "Practise Building an API Client Library",
       "type": "write-code",
       "instructions": "Write a NetworkApiClient class with list_interfaces, get_interface(name), and set_description(name, description) methods that return request dicts. Print the three request dicts for the interfaces API.",
       "starterCode": "# Write the NetworkApiClient class.\n# TODO: define the class and print the three request dicts.\n",
       "solution": "class NetworkApiClient:\n    def __init__(self, base_url):\n        self.base_url = base_url\n\n    def list_interfaces(self):\n        return {\"method\": \"GET\", \"url\": self.base_url + \"/api/v1/interfaces\"}\n\n    def get_interface(self, name):\n        return {\"method\": \"GET\", \"url\": self.base_url + \"/api/v1/interfaces/\" + name}\n\n    def set_description(self, name, description):\n        return {\"method\": \"PATCH\",\n                \"url\": self.base_url + \"/api/v1/interfaces/\" + name,\n                \"body\": {\"description\": description}}\n\n\nclient = NetworkApiClient(\"https://192.0.2.1\")\nprint(client.list_interfaces())\nprint(client.get_interface(\"GigabitEthernet1\"))\nprint(client.set_description(\"GigabitEthernet1\", \"Uplink to core\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{'method': 'GET', 'url': 'https://192.0.2.1/api/v1/interfaces'}\n{'method': 'GET', 'url': 'https://192.0.2.1/api/v1/interfaces/GigabitEthernet1'}\n{'method': 'PATCH', 'url': 'https://192.0.2.1/api/v1/interfaces/GigabitEthernet1', 'body': {'description': 'Uplink to core'}}",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "{'method': 'GET', 'url': 'https://192.0.2.1/api/v1/interfaces'}\n{'method': 'GET', 'url': 'https://192.0.2.1/api/v1/interfaces/GigabitEthernet1'}\n{'method': 'PATCH', 'url': 'https://192.0.2.1/api/v1/interfaces/GigabitEthernet1', 'body': {'description': 'Uplink to core'}}",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "An API client library wraps the HTTP calls for a network API into small methods with clear names, such as get_interface, set_description, and list_interfaces, so the rest of the program never sees a URL or a header. The library handles authentication, retries, and error checking once, and every script that uses it gets those behaviours for free. A good client library is the difference between a team that automates and a team that writes the same HTTP code in every script.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-apis-api-first-m2",
    "title": "API-First Network Operations in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-apis-api-first-m2-l1",
      "slug": "netauto-apis-api-first-m2-l1",
      "title": "Testing API Workflows Offline",
      "concept": "API workflows are tested offline by replacing the HTTP transport with a fake that returns fixed responses, so the tests check the workflow logic without a device or a server. The fake returns a success for the happy path and an error for each failure the workflow must handle, and the test asserts that the workflow behaves correctly in both cases. A workflow that is only tested against a live API cannot be run in CI, and a workflow that is never tested fails for the first time in production.",
      "syntax": "class FakeApi:\n    def get(self, path): return 200, {...}",
      "exampleCode": "class FakeApi:\n    def __init__(self):\n        self.data = {\"GigabitEthernet1\": \"Uplink to core\"}\n\n    def get(self, path):\n        name = path.rsplit(\"/\", 1)[-1]\n        return 200, {\"name\": name, \"description\": self.data[name]}",
      "exampleLanguage": "python",
      "mistake": "Testing the workflow only against the live API, so the tests cannot run in CI and fail whenever the lab is down.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testing API Workflows Offline, but it does not work correctly.",
       "buggyCode": "# tests need the lab device up",
       "fixedCode": "# tests use FakeApi -- they run anywhere, any time",
       "explanation": "Tests that need a live device cannot run in CI and fail for reasons that have nothing to do with the code; a fake transport makes them fast and reliable."
      },
      "exercise": {
       "title": "Practise Testing API Workflows Offline",
       "type": "write-code",
       "instructions": "Write a FakeApi class with get (200 with the interface, or 404) and patch (updates the description, returns 204). Print the results of a GET for an existing interface, a GET for a missing one, a PATCH, and a GET after the PATCH.",
       "starterCode": "# Write FakeApi and test the workflow offline.\n# TODO: define FakeApi and print the four calls.\n",
       "solution": "class FakeApi:\n    def __init__(self):\n        self.data = {\"GigabitEthernet1\": \"Uplink to core\"}\n\n    def get(self, path):\n        name = path.rsplit(\"/\", 1)[-1]\n        if name in self.data:\n            return 200, {\"name\": name, \"description\": self.data[name]}\n        return 404, {\"error\": \"not found\"}\n\n    def patch(self, path, body):\n        name = path.rsplit(\"/\", 1)[-1]\n        self.data[name] = body[\"description\"]\n        return 204, None\n\n\napi = FakeApi()\nprint(api.get(\"/api/v1/interfaces/GigabitEthernet1\"))\nprint(api.get(\"/api/v1/interfaces/GigabitEthernet9\"))\nprint(api.patch(\"/api/v1/interfaces/GigabitEthernet1\", {\"description\": \"New uplink\"}))\nprint(api.get(\"/api/v1/interfaces/GigabitEthernet1\"))",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "(200, {'name': 'GigabitEthernet1', 'description': 'Uplink to core'})\n(404, {'error': 'not found'})\n(204, None)\n(200, {'name': 'GigabitEthernet1', 'description': 'New uplink'})",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "(200, {'name': 'GigabitEthernet1', 'description': 'Uplink to core'})\n(404, {'error': 'not found'})\n(204, None)\n(200, {'name': 'GigabitEthernet1', 'description': 'New uplink'})",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "API workflows are tested offline by replacing the HTTP transport with a fake that returns fixed responses, so the tests check the workflow logic without a device or a server. The fake returns a success for the happy path and an error for each failure the workflow must handle, and the test asserts that the workflow behaves correctly in both cases. A workflow that is only tested against a live API cannot be run in CI, and a workflow that is never tested fails for the first time in production.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-api-first-m2-l2",
      "slug": "netauto-apis-api-first-m2-l2",
      "title": "Audit Logs and Change Records",
      "concept": "An audit log records every change made through the API: who made it, what changed, when it happened, and which ticket it belongs to. The log is append-only, so a change cannot be made and then hidden, and it is the first place an investigation looks when something goes wrong. A change without a record is a change that cannot be explained, and in a regulated environment it is a change that should not have happened.",
      "syntax": "who, what, when, ticket -- append-only",
      "exampleCode": "# Audit record:\n#   {\"who\": \"deepak\", \"what\": \"set description on GigabitEthernet1\",\n#    \"when\": \"2026-11-24T15:00:00Z\", \"ticket\": \"CHG-1234\"}",
      "exampleLanguage": "python",
      "mistake": "Logging changes in a file that the operator can edit, so a bad change can be erased from the record.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Audit Logs and Change Records, but it does not work correctly.",
       "buggyCode": "# changes.log, editable by anyone",
       "fixedCode": "# append-only audit log, no edits or deletes",
       "explanation": "An editable log is not evidence, because the record of a bad change can be removed; an append-only log keeps every change, including the bad ones."
      },
      "exercise": {
       "title": "Check your understanding: Audit Logs and Change Records",
       "type": "multiple-choice",
       "instructions": "Which statement about Audit Logs and Change Records is correct?",
       "starterCode": "",
       "solution": "An audit log records every change made through the API: who made it, what changed, when it happened, and which ticket it belongs to.",
       "solutionExplanation": "An audit log records every change made through the API: who made it, what changed, when it happened, and which ticket it belongs to. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "An audit log records every change made through the API: who made it, what changed, when it happened, and which ticket it belongs to.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Audit Logs and Change Records from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "An audit log records every change made through the API: who made it, what changed, when it happened, and which ticket it belongs to.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-api-first-m2-l3",
      "slug": "netauto-apis-api-first-m2-l3",
      "title": "Rate Limits and Timeouts",
      "concept": "A rate limit caps how many API requests a client may make in a period, and a server that is rate-limited answers with 429 and a Retry-After header saying when to try again. A client that ignores the limit and keeps sending requests gets blocked for longer, while a client that backs off and retries later succeeds. Timeouts and rate limits are the API's way of protecting itself, and a good client respects both.",
      "syntax": "429 + Retry-After -> wait, then retry",
      "exampleCode": "# 429 Too Many Requests\n# Retry-After: 60\n# A good client waits 60 seconds and tries again.",
      "exampleLanguage": "python",
      "mistake": "Retrying a rate-limited request immediately in a tight loop, which extends the block instead of clearing it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rate Limits and Timeouts, but it does not work correctly.",
       "buggyCode": "while True:\n    response = requests.get(url)  # 429, again and again",
       "fixedCode": "if response.status_code == 429:\n    time.sleep(int(response.headers[\"Retry-After\"]))\n    response = requests.get(url)",
       "explanation": "A 429 means the server asked you to wait, and retrying immediately is what the limit is there to stop; waiting for the Retry-After period is what clears it."
      },
      "exercise": {
       "title": "Check your understanding: Rate Limits and Timeouts",
       "type": "multiple-choice",
       "instructions": "Which statement about Rate Limits and Timeouts is correct?",
       "starterCode": "",
       "solution": "A rate limit caps how many API requests a client may make in a period, and a server that is rate-limited answers with 429 and a Retry-After header saying when to try again.",
       "solutionExplanation": "A rate limit caps how many API requests a client may make in a period, and a server that is rate-limited answers with 429 and a Retry-After header saying when to try again. The other options are false.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A rate limit caps how many API requests a client may make in a period, and a server that is rate-limited answers with 429 and a Retry-After header saying when to try again.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Rate Limits and Timeouts from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "It can only be used once in a program",
        "It requires a separate paid licence to use",
        "A rate limit caps how many API requests a client may make in a period, and a server that is rate-limited answers with 429 and a Retry-After header saying when to try again.",
        "It is not available in Python",
        "It only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-apis-api-first-m2-l4",
      "slug": "netauto-apis-api-first-m2-l4",
      "title": "From CLI Habits to API Habits",
      "concept": "Moving from CLI habits to API habits means replacing a remembered command with a recorded operation: the change is written as data, validated, diffed, applied through the API, and verified by reading the resource back. A CLI change lives in one person's memory and cannot be reviewed; an API change lives in version control and can be reviewed, tested, and rolled back. The habit that matters is not the tool, it is writing the change down before making it.",
      "syntax": "CLI: remembered, typed, unverified\nAPI: recorded, validated, verified",
      "exampleCode": "# CLI habit: ssh in, type the command, look at the screen\n# API habit: write the change as data, validate it, apply it,\n#            read the resource back to verify it",
      "exampleLanguage": "python",
      "mistake": "Using the API to run CLI commands, which keeps every bad habit of the CLI and adds none of the benefits of the API.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate From CLI Habits to API Habits, but it does not work correctly.",
       "buggyCode": "# POST /api/v1/cli {\"command\": \"configure terminal ...\"}",
       "fixedCode": "# PATCH /api/v1/interfaces/GigabitEthernet1 {\"description\": \"...\"}",
       "explanation": "An API that just runs CLI commands is a CLI with extra steps; the benefit of the API is structured data that can be validated, diffed, and verified."
      },
      "exercise": {
       "title": "Practise From CLI Habits to API Habits",
       "type": "write-code",
       "instructions": "Print the six CLI-vs-API comparison lines in order.",
       "starterCode": "# Print the CLI vs API comparison.\n# TODO: print the six lines.\n",
       "solution": "rows = [\n    \"CLI: remembered command, typed by hand\",\n    \"API: recorded operation, written as data\",\n    \"CLI: verified by looking at the screen\",\n    \"API: verified by reading the resource back\",\n    \"CLI: lives in one person's memory\",\n    \"API: lives in version control, reviewed and tested\",\n]\nfor row in rows:\n    print(row)",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "CLI: remembered command, typed by hand\nAPI: recorded operation, written as data\nCLI: verified by looking at the screen\nAPI: verified by reading the resource back\nCLI: lives in one person's memory\nAPI: lives in version control, reviewed and tested",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "CLI: remembered command, typed by hand\nAPI: recorded operation, written as data\nCLI: verified by looking at the screen\nAPI: verified by reading the resource back\nCLI: lives in one person's memory\nAPI: lives in version control, reviewed and tested",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Moving from CLI habits to API habits means replacing a remembered command with a recorded operation: the change is written as data, validated, diffed, applied through the API, and verified by reading the resource back. A CLI change lives in one person's memory and cannot be reviewed; an API change lives in version control and can be reviewed, tested, and rolled back. The habit that matters is not the tool, it is writing the change down before making it.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     },
     {
      "id": "netauto-apis-api-first-m2-l5",
      "slug": "netauto-apis-api-first-m2-l5",
      "title": "An API-First Runbook",
      "concept": "An API-first runbook is a written procedure for a common operation, such as adding an interface description, that lists the API calls in order, the checks after each one, and the rollback step if a check fails. The runbook is tested in the lab before it is used in production, and it is stored in version control so that every operator follows the same steps. A runbook that is only in one person's head is not a runbook, it is a risk.",
      "syntax": "GET -> build -> PATCH -> check status -> GET to verify -> audit log",
      "exampleCode": "# Runbook: add an interface description\n# 1. GET the interface\n# 2. build the description from the ticket\n# 3. PATCH it\n# 4. check the status, 5. verify with GET, 6. audit log",
      "exampleLanguage": "python",
      "mistake": "Writing a runbook that only lists the happy path, with no rollback step for the case where a check fails.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate An API-First Runbook, but it does not work correctly.",
       "buggyCode": "# runbook: 1. PATCH  2. done",
       "fixedCode": "# runbook: 1. PATCH  2. check  3. if the check fails, roll back",
       "explanation": "A runbook without a rollback step leaves the operator improvising at the worst moment; the rollback must be written down before the change is made."
      },
      "exercise": {
       "title": "Practise An API-First Runbook",
       "type": "write-code",
       "instructions": "Print the six steps of the API-first runbook in order, then print 'runbook complete' on the last line.",
       "starterCode": "# Print the API-first runbook.\n# TODO: print the six steps, then 'runbook complete'.\n",
       "solution": "runbook = [\n    \"1. read the current interface with GET\",\n    \"2. build the new description from the ticket\",\n    \"3. PATCH the interface\",\n    \"4. check the status code is 200 or 204\",\n    \"5. GET the interface and verify the description\",\n    \"6. record the change in the audit log\",\n]\nfor step in runbook:\n    print(step)\nprint(\"runbook complete\")",
       "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "1. read the current interface with GET\n2. build the new description from the ticket\n3. PATCH the interface\n4. check the status code is 200 or 204\n5. GET the interface and verify the description\n6. record the change in the audit log\nrunbook complete",
         "hidden": false
        },
        {
         "name": "Expected output (hidden check)",
         "expectedStdout": "1. read the current interface with GET\n2. build the new description from the ticket\n3. PATCH the interface\n4. check the status code is 200 or 204\n5. GET the interface and verify the description\n6. record the change in the audit log\nrunbook complete",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "An API-first runbook is a written procedure for a common operation, such as adding an interface description, that lists the API calls in order, the checks after each one, and the rollback step if a check fails. The runbook is tested in the lab before it is used in production, and it is stored in version control so that every operator follows the same steps. A runbook that is only in one person's head is not a runbook, it is a risk.",
        "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
        "structure": "Set up the inputs, apply the lesson's rule, then print the result."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: API-First Network Operations",
   "type": "write-code",
   "instructions": "Combine the client library and the fake API: build a NetworkApiClient with get_interface and set_description, and a FakeApi that answers GET and PATCH from an in-memory dict. Run the runbook offline: GET GigabitEthernet1, PATCH its description to 'Uplink to core', GET it again, and print 'runbook verified offline'.",
   "starterCode": "# Run the API-first runbook offline.\n# TODO: define the client and the fake, run the runbook, and print the results.\n",
   "solution": "class NetworkApiClient:\n    def __init__(self, base_url):\n        self.base_url = base_url\n\n    def get_interface(self, name):\n        return {\"method\": \"GET\", \"url\": self.base_url + \"/api/v1/interfaces/\" + name}\n\n    def set_description(self, name, description):\n        return {\"method\": \"PATCH\",\n                \"url\": self.base_url + \"/api/v1/interfaces/\" + name,\n                \"body\": {\"description\": description}}\n\n\nclass FakeApi:\n    def __init__(self):\n        self.data = {\"GigabitEthernet1\": \"Old uplink\"}\n\n    def request(self, call):\n        if call[\"method\"] == \"GET\":\n            name = call[\"url\"].rsplit(\"/\", 1)[-1]\n            return 200, {\"name\": name, \"description\": self.data.get(name)}\n        if call[\"method\"] == \"PATCH\":\n            name = call[\"url\"].rsplit(\"/\", 1)[-1]\n            self.data[name] = call[\"body\"][\"description\"]\n            return 204, None\n        return 400, {\"error\": \"unsupported method\"}\n\n\nclient = NetworkApiClient(\"https://192.0.2.1\")\napi = FakeApi()\nprint(api.request(client.get_interface(\"GigabitEthernet1\")))\nprint(api.request(client.set_description(\"GigabitEthernet1\", \"Uplink to core\")))\nprint(api.request(client.get_interface(\"GigabitEthernet1\")))\nprint(\"runbook verified offline\")",
   "solutionExplanation": "The solution builds the required output step by step and prints exactly what the tests expect.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "(200, {'name': 'GigabitEthernet1', 'description': 'Old uplink'})\n(204, None)\n(200, {'name': 'GigabitEthernet1', 'description': 'Uplink to core'})\nrunbook verified offline",
     "hidden": false
    },
    {
     "name": "Expected output (hidden check)",
     "expectedStdout": "(200, {'name': 'GigabitEthernet1', 'description': 'Old uplink'})\n(204, None)\n(200, {'name': 'GigabitEthernet1', 'description': 'Uplink to core'})\nrunbook verified offline",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "API-First Network Operations brings the whole track together: a client library, a fake API, and a verified runbook.",
    "approach": "Build the output piece by piece and print it, then compare it with the expected output.",
    "structure": "Set up the inputs, apply the lesson's rule, then print the result."
   }
  },
  "capstone": {
   "title": "API-First Network Operations Capstone Project",
   "description": "A small end-to-end project that puts API-First Network Operations into practice.",
   "requirements": [
    "Build a client library with named methods for the interfaces API.",
    "Apply at least three of these skills: Client libraries, Offline testing, Idempotency, Audit logs.",
    "Test the runbook offline with a fake API before it is used against a real one.",
    "Record every change in an audit log entry with who, what, when, and ticket."
   ],
   "rubric": [
    "The client library hides URLs and headers behind named methods.",
    "The runbook is verified offline against the fake API.",
    "The work is clear, well-named, and organised into small steps.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
