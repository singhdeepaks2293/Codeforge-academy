import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
 {
  "id": "netauto-python-netmiko",
  "slug": "netauto-python-netmiko",
  "language": "python",
  "category": "devops",
  "title": "Netmiko Foundations",
  "description": "Connect to network devices with Netmiko: connection parameters, sending commands, applying configuration, and handling errors, with all offline practice done on real data.",
  "difficulty": "Beginner",
  "estimatedHours": 10,
  "skills": [
   "Netmiko",
   "ConnectHandler",
   "Device types",
   "send_command",
   "send_config_set",
   "Connection dictionaries",
   "Error handling",
   "Inventory validation"
  ],
  "prerequisites": [],
  "analogy": "Learning {topic} is like learning to drive a delivery van: once you know the controls, the same skill takes you to every address on the route.",
  "modules": [
   {
    "id": "netauto-python-netmiko-m1",
    "title": "Netmiko Foundations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-netmiko-m1-l1",
      "slug": "netauto-python-netmiko-m1-l1",
      "title": "What Is Netmiko?",
      "concept": "Netmiko is a Python library that simplifies SSH connections to network devices by wrapping Paramiko with a uniform interface. It supports many vendors through device_type strings such as cisco_ios and juniper_junos, so the same code can send commands to different kinds of devices. Netmiko was written by Kirk Byers and is the usual starting point for Python network automation.",
      "syntax": "from netmiko import ConnectHandler\ndevice = {'device_type': 'cisco_ios', 'host': '192.0.2.10', 'username': 'admin', 'password': 'secret'}",
      "exampleCode": "from netmiko import ConnectHandler\n\ndevice = {\n    'device_type': 'cisco_ios',\n    'host': '192.0.2.10',\n    'username': 'admin',\n    'password': 'secret',\n}\n# A real connection needs a reachable device or lab (Containerlab / EVE-NG).\n# with ConnectHandler(**device) as conn:\n#     print(conn.send_command('show version'))",
      "exampleLanguage": "python",
      "mistake": "Hard-coding the device password in the script instead of reading it from a secure source such as an environment variable or a vault.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is Netmiko?, but it does not work correctly.",
       "buggyCode": "device = {'host': '192.0.2.10', 'username': 'admin', 'password': 'secret'}\nconn = ConnectHandler(**device)",
       "fixedCode": "device = {'device_type': 'cisco_ios', 'host': '192.0.2.10', 'username': 'admin', 'password': 'secret'}\nconn = ConnectHandler(**device)",
       "explanation": "ConnectHandler cannot pick a driver without device_type, so the call fails; the device_type string selects the vendor driver."
      },
      "exercise": {
       "title": "Practise What Is Netmiko?",
       "type": "write-code",
       "instructions": "Build the Netmiko connection dictionary for a Cisco IOS device at 192.0.2.10 (username admin, password secret). Print a one-line summary of the connection parameters and a second line listing the dictionary keys in sorted order. Do not connect: a real connection needs a lab device.",
       "starterCode": "device = {\n    \"device_type\": \"cisco_ios\",\n    \"host\": \"192.0.2.10\",\n    \"username\": \"admin\",\n    \"password\": \"secret\",\n}\n# TODO: complete the program below.\n",
       "solution": "device = {\n    \"device_type\": \"cisco_ios\",\n    \"host\": \"192.0.2.10\",\n    \"username\": \"admin\",\n    \"password\": \"secret\",\n}\nprint(f\"Connecting to {device['host']} as {device['username']} with driver {device['device_type']}\")\nprint(f\"Keys: {', '.join(sorted(device.keys()))}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What Is Netmiko? technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Connecting to 192.0.2.10 as admin with driver cisco_ios\nKeys: device_type, host, password, username",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "cisco_ios",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Is Netmiko? is the key idea here: Netmiko is a Python library that simplifies SSH connections to network devices by wrapping Paramiko with a uniform interface.",
        "approach": "Work through What Is Netmiko? step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-netmiko-m1-l2",
      "slug": "netauto-python-netmiko-m1-l2",
      "title": "Installing Netmiko",
      "concept": "Netmiko is installed from PyPI with pip install netmiko, and you confirm the install by importing netmiko and printing netmiko.__version__. It requires Python 3.8 or newer, and pip installs Paramiko automatically as a dependency. A virtual environment keeps the install separate from the system Python packages.",
      "syntax": "pip install netmiko\npython3 -c \"import netmiko; print(netmiko.__version__)\"",
      "exampleCode": "$ pip install netmiko\n$ python3 -c \"import netmiko; print(netmiko.__version__)\"\n4.3.0",
      "exampleLanguage": "python",
      "mistake": "Installing Netmiko into the system Python instead of a virtual environment, which can conflict with packages the operating system depends on.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Installing Netmiko, but it does not work correctly.",
       "buggyCode": "$ python3 -m venv venv\n$ pip install netmiko\n$ python3 -c \"import netmiko\"\nModuleNotFoundError: No module named 'netmiko'",
       "fixedCode": "$ python3 -m venv venv\n$ source venv/bin/activate\n$ pip install netmiko\n$ python3 -c \"import netmiko; print('ok')\"",
       "explanation": "The package was installed into the virtual environment, but the shell never activated it, so python3 used the system interpreter that has no Netmiko."
      },
      "exercise": {
       "title": "Practise Installing Netmiko",
       "type": "write-code",
       "instructions": "Build the install-check record for Netmiko: the package name, the pip install command, the import used to verify it, the minimum Python version, and whether a virtual environment is used. Validate that the install command names the package and the verify step imports it, then print the five-line summary exactly as shown. This is the local record of the install steps from the lesson - installing on a real machine and connecting to a device both need a lab.",
       "starterCode": "package = \"netmiko\"\ninstall_cmd = \"pip install netmiko\"\nverify_cmd = \"import netmiko\"\nmin_python = \"3.8\"\nuse_venv = True\n# TODO: complete the program below.\n",
       "solution": "package = \"netmiko\"\ninstall_cmd = \"pip install netmiko\"\nverify_cmd = \"import netmiko\"\nmin_python = \"3.8\"\nuse_venv = True\nassert install_cmd == f\"pip install {package}\"\nassert verify_cmd == f\"import {package}\"\nprint(f\"Package: {package}\")\nprint(f\"Install: {install_cmd}\")\nprint(f\"Verify: {verify_cmd}\")\nprint(f\"Python: {min_python} or newer\")\nprint(f\"Venv: {'yes' if use_venv else 'no'}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Installing Netmiko technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Package: netmiko\nInstall: pip install netmiko\nVerify: import netmiko\nPython: 3.8 or newer\nVenv: yes",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "pip install netmiko",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Installing Netmiko is the key idea here: Netmiko is installed from PyPI with pip install netmiko, and you confirm the install by importing netmiko and printing netmiko.__version__.",
        "approach": "Work through Installing Netmiko step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-netmiko-m1-l3",
      "slug": "netauto-python-netmiko-m1-l3",
      "title": "Connection Parameters",
      "concept": "Every Netmiko connection is described by a dictionary of parameters, and device_type, host, username, and password are the four that are almost always required. The device_type string selects the driver, for example cisco_ios for Cisco IOS, cisco_nxos for NX-OS, and juniper_junos for Junos. Optional parameters include port for a non-standard SSH port, secret for the enable password, and timeout values.",
      "syntax": "device = {'device_type': 'cisco_ios', 'host': '192.0.2.10', 'username': 'admin', 'password': 'secret', 'port': 22, 'secret': 'enable-secret'}",
      "exampleCode": "devices = [\n    {'device_type': 'cisco_ios', 'host': '192.0.2.10'},\n    {'device_type': 'cisco_nxos', 'host': '192.0.2.11'},\n    {'device_type': 'juniper_junos', 'host': '192.0.2.12'},\n]\nfor device in devices:\n    print(device['host'], 'uses', device['device_type'])",
      "exampleLanguage": "python",
      "mistake": "Using the wrong device_type for a device, for example cisco_ios for an NX-OS switch, so Netmiko waits for the wrong prompt and the session times out.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Connection Parameters, but it does not work correctly.",
       "buggyCode": "device = {'device_type': 'cisco_ios', 'host': '192.0.2.11', 'username': 'admin', 'password': 'secret'}\n# 192.0.2.11 is actually an NX-OS switch",
       "fixedCode": "device = {'device_type': 'cisco_nxos', 'host': '192.0.2.11', 'username': 'admin', 'password': 'secret'}\n# device_type must match the real operating system",
       "explanation": "The driver was chosen for IOS, but the device runs NX-OS, so prompt detection fails; device_type must match the device's operating system."
      },
      "exercise": {
       "title": "Practise Connection Parameters",
       "type": "write-code",
       "instructions": "You have three devices with different operating systems. Build the list of connection dictionaries and print one line per device in the form '<host> uses <device_type>'.",
       "starterCode": "devices = [\n    {\"device_type\": \"cisco_ios\", \"host\": \"192.0.2.10\"},\n    {\"device_type\": \"cisco_nxos\", \"host\": \"192.0.2.11\"},\n    {\"device_type\": \"juniper_junos\", \"host\": \"192.0.2.12\"},\n]\n# TODO: complete the program below.\n",
       "solution": "devices = [\n    {\"device_type\": \"cisco_ios\", \"host\": \"192.0.2.10\"},\n    {\"device_type\": \"cisco_nxos\", \"host\": \"192.0.2.11\"},\n    {\"device_type\": \"juniper_junos\", \"host\": \"192.0.2.12\"},\n]\nfor device in devices:\n    print(f\"{device['host']} uses {device['device_type']}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Connection Parameters technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "192.0.2.10 uses cisco_ios\n192.0.2.11 uses cisco_nxos\n192.0.2.12 uses juniper_junos",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "juniper_junos",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Connection Parameters is the key idea here: Every Netmiko connection is described by a dictionary of parameters, and device_type, host, username, and password are the four that are almost always required.",
        "approach": "Work through Connection Parameters step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-netmiko-m1-l4",
      "slug": "netauto-python-netmiko-m1-l4",
      "title": "The ConnectHandler Pattern",
      "concept": "ConnectHandler is the factory function that returns the right connection object for the device_type you pass in, and it is normally used as a context manager with a with statement. The with block opens the SSH session on entry and closes it cleanly on exit, even if an error happens inside the block. Running this code for real needs a reachable device, so in this course you practise the pattern against a lab device such as Containerlab or EVE-NG.",
      "syntax": "with ConnectHandler(**device) as conn:\n    output = conn.send_command('show version')",
      "exampleCode": "from netmiko import ConnectHandler\n\nwith ConnectHandler(**device) as conn:\n    output = conn.send_command('show version')\n    print(output)\n# the session is closed automatically when the with block ends",
      "exampleLanguage": "python",
      "mistake": "Creating the connection without a with statement and forgetting to call disconnect, which leaves SSH sessions open on the device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The ConnectHandler Pattern, but it does not work correctly.",
       "buggyCode": "conn = ConnectHandler(**device)\noutput = conn.send_command('show version')\nprint(output)\n# script ends without disconnect()",
       "fixedCode": "with ConnectHandler(**device) as conn:\n    output = conn.send_command('show version')\n    print(output)",
       "explanation": "Without the with statement the session stays open if the script exits early or raises; the context manager guarantees disconnect runs."
      },
      "exercise": {
       "title": "Check your understanding: The ConnectHandler Pattern",
       "type": "multiple-choice",
       "instructions": "Which statement about The ConnectHandler Pattern is correct?",
       "starterCode": "",
       "solution": "ConnectHandler is the factory function that returns the right connection object for the device_type you pass in, and it is normally used as a context manager with a with statement.",
       "solutionExplanation": "ConnectHandler is the factory function that returns the right connection object for the device_type you pass in, and it is normally used as a context manager with a with statement. The other options are false: The ConnectHandler Pattern is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "ConnectHandler is the factory function that returns the right connection object for the device_type you pass in, and it is normally used as a context manager with a with statement.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of The ConnectHandler Pattern from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "The ConnectHandler Pattern only works on Windows",
        "The ConnectHandler Pattern was removed from Python in the latest version",
        "ConnectHandler is the factory function that returns the right connection object for the device_type you pass in, and it is normally used as a context manager with a with statement.",
        "The ConnectHandler Pattern can only be used once in a program",
        "The ConnectHandler Pattern requires a separate paid licence to use"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-python-netmiko-m1-l5",
      "slug": "netauto-python-netmiko-m1-l5",
      "title": "Sending a Command",
      "concept": "The send_command method sends one CLI command to a connected device and returns its output as a string, and it waits for the device prompt before returning. You normally pass the exact command string the device expects, such as show ip interface brief on Cisco IOS. Building the list of commands to send is work you can practise without a device, and this lesson does exactly that.",
      "syntax": "output = conn.send_command('show ip interface brief')\noutput = conn.send_command('show version', use_textfsm=True)",
      "exampleCode": "from netmiko import ConnectHandler\n\nCOMMANDS = {\n    'cisco_ios': ['show version', 'show ip interface brief', 'show ip route'],\n    'juniper_junos': ['show version', 'show interfaces terse', 'show route'],\n}\n# with ConnectHandler(**device) as conn:\n#     for cmd in COMMANDS['cisco_ios']:\n#         print(conn.send_command(cmd))",
      "exampleLanguage": "python",
      "mistake": "Passing several commands in one string separated by semicolons, which most network CLIs do not understand; send one command per send_command call.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Sending a Command, but it does not work correctly.",
       "buggyCode": "output = conn.send_command('show version; show ip route')",
       "fixedCode": "output = conn.send_command('show version')\noutput2 = conn.send_command('show ip route')",
       "explanation": "A network CLI runs one command per line, so a semicolon-separated string is rejected as an unknown command; call send_command once per command."
      },
      "exercise": {
       "title": "Practise Sending a Command",
       "type": "write-code",
       "instructions": "A facts-gathering job needs three commands on a Cisco IOS device. Build the command list for the cisco_ios vendor from the COMMANDS dictionary and print one command per line, in order. You are only building the list here; sending it needs a lab device.",
       "starterCode": "COMMANDS = {\n    \"cisco_ios\": [\"show version\", \"show ip interface brief\", \"show ip route\"],\n    \"juniper_junos\": [\"show version\", \"show interfaces terse\", \"show route\"],\n}\nvendor = \"cisco_ios\"\n# TODO: complete the program below.\n",
       "solution": "COMMANDS = {\n    \"cisco_ios\": [\"show version\", \"show ip interface brief\", \"show ip route\"],\n    \"juniper_junos\": [\"show version\", \"show interfaces terse\", \"show route\"],\n}\nvendor = \"cisco_ios\"\nfor cmd in COMMANDS[vendor]:\n    print(cmd)\n",
       "solutionExplanation": "The solution builds the required data, applies the Sending a Command technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "show version\nshow ip interface brief\nshow ip route",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "show ip interface brief",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Sending a Command is the key idea here: The send_command method sends one CLI command to a connected device and returns its output as a string, and it waits for the device prompt before returning.",
        "approach": "Work through Sending a Command step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-netmiko-m2",
    "title": "Netmiko Foundations in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-python-netmiko-m2-l1",
      "slug": "netauto-python-netmiko-m2-l1",
      "title": "Reading Command Output",
      "concept": "The string returned by send_command is the raw text the device printed, including headers, blank lines, and sometimes the command echo. Netmiko does not parse that text for you, so you strip it, split it into lines, or hand it to a parser such as TextFSM. You can practise parsing on saved output files without any device attached.",
      "syntax": "output = conn.send_command('show ip interface brief')\nlines = output.strip().splitlines()\nfirst = lines[0]",
      "exampleCode": "output = conn.send_command('show ip interface brief')\nfor line in output.strip().splitlines():\n    print(line)",
      "exampleLanguage": "python",
      "mistake": "Assuming the returned string is already structured data and indexing it like a dictionary, which raises a TypeError because it is plain text.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reading Command Output, but it does not work correctly.",
       "buggyCode": "output = conn.send_command('show ip interface brief')\nprint(output['GigabitEthernet0/0'])",
       "fixedCode": "output = conn.send_command('show ip interface brief')\nfor line in output.splitlines():\n    if line.startswith('GigabitEthernet0/0'):\n        print(line)",
       "explanation": "send_command returns a plain string, not a dictionary; you must split the text into lines and search them yourself or use a parser."
      },
      "exercise": {
       "title": "Practise Reading Command Output",
       "type": "write-code",
       "instructions": "You have a saved copy of command output held locally (the raw text a device printed, stored as a string - no device is attached). Parse it the way the lesson describes: strip it, split it into lines, skip the header line, and pull the interface name and status out of each row. Print the interface count, the up count, the down count, then one '<name> <status>' line per interface.",
       "starterCode": "saved_output = \"\"\"Interface              IP-Address      Status\nGigabitEthernet0/0   192.0.2.1       up\nGigabitEthernet0/1   192.0.2.2       down\nLoopback0            192.0.2.3       up\n\"\"\"\n# TODO: complete the program below.\n",
       "solution": "saved_output = \"\"\"Interface              IP-Address      Status\nGigabitEthernet0/0   192.0.2.1       up\nGigabitEthernet0/1   192.0.2.2       down\nLoopback0            192.0.2.3       up\n\"\"\"\nlines = saved_output.strip().splitlines()[1:]\ninterfaces = []\nfor line in lines:\n    parts = line.split()\n    interfaces.append((parts[0], parts[2]))\nup = sum(1 for _, status in interfaces if status == \"up\")\ndown = sum(1 for _, status in interfaces if status == \"down\")\nprint(f\"Interfaces: {len(interfaces)}\")\nprint(f\"Up: {up}\")\nprint(f\"Down: {down}\")\nfor name, status in interfaces:\n    print(f\"{name} {status}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Reading Command Output technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Interfaces: 3\nUp: 2\nDown: 1\nGigabitEthernet0/0 up\nGigabitEthernet0/1 down\nLoopback0 up",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "GigabitEthernet0/1 down",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Reading Command Output is the key idea here: The string returned by send_command is the raw text the device printed, including headers, blank lines, and sometimes the command echo.",
        "approach": "Work through Reading Command Output step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-netmiko-m2-l2",
      "slug": "netauto-python-netmiko-m2-l2",
      "title": "Entering Configuration Mode",
      "concept": "Netmiko enters configuration mode with config_mode() or implicitly when you call send_config_set, and it tracks the prompt so it knows when it is in config mode. The send_config_set method takes a list of configuration commands and applies them in order, exiting configuration mode when it finishes. Any real run needs a lab device, because configuration commands change a device's running state.",
      "syntax": "conn.config_mode()\nconn.send_config_set(['interface GigabitEthernet0/0', 'description Uplink', 'no shutdown'])\nconn.exit_config_mode()",
      "exampleCode": "from netmiko import ConnectHandler\n\nwith ConnectHandler(**device) as conn:\n    conn.send_config_set([\n        'interface GigabitEthernet0/0',\n        'description Uplink to core',\n        'no shutdown',\n    ])",
      "exampleLanguage": "python",
      "mistake": "Sending configuration commands with send_command instead of send_config_set, so the device rejects them because it is still in exec mode.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Entering Configuration Mode, but it does not work correctly.",
       "buggyCode": "conn.send_command('interface GigabitEthernet0/0')\nconn.send_command('description Uplink')",
       "fixedCode": "conn.send_config_set(['interface GigabitEthernet0/0', 'description Uplink'])",
       "explanation": "send_command runs in exec mode, where interface commands are invalid; send_config_set enters configuration mode first and then applies the list."
      },
      "exercise": {
       "title": "Check your understanding: Entering Configuration Mode",
       "type": "multiple-choice",
       "instructions": "Which statement about Entering Configuration Mode is correct?",
       "starterCode": "",
       "solution": "Netmiko enters configuration mode with config_mode() or implicitly when you call send_config_set, and it tracks the prompt so it knows when it is in config mode.",
       "solutionExplanation": "Netmiko enters configuration mode with config_mode() or implicitly when you call send_config_set, and it tracks the prompt so it knows when it is in config mode. The other options are false: Entering Configuration Mode is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Netmiko enters configuration mode with config_mode() or implicitly when you call send_config_set, and it tracks the prompt so it knows when it is in config mode.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Entering Configuration Mode from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Entering Configuration Mode requires a separate paid licence to use",
        "Entering Configuration Mode is not available in Python",
        "Entering Configuration Mode only works on Windows",
        "Netmiko enters configuration mode with config_mode() or implicitly when you call send_config_set, and it tracks the prompt so it knows when it is in config mode.",
        "Entering Configuration Mode was removed from Python in the latest version"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-python-netmiko-m2-l3",
      "slug": "netauto-python-netmiko-m2-l3",
      "title": "Sending Configuration Commands",
      "concept": "Configuration is sent to a device as an ordered list of command strings, and the order matters because later lines depend on earlier ones, such as entering an interface before setting its description. Generating that list from data, a hostname, an interface name, and a description, is real automation work you can do and test without a device. Netmiko's send_config_set takes the list and applies it, but the list itself is plain Python you can build and check here.",
      "syntax": "commands = ['interface GigabitEthernet0/0', 'description Uplink', 'no shutdown']\nconn.send_config_set(commands)",
      "exampleCode": "interface = {'name': 'GigabitEthernet0/0', 'description': 'Link to core switch', 'ip': '192.0.2.1 255.255.255.0'}\ncommands = [\n    f\"interface {interface['name']}\",\n    f\" description {interface['description']}\",\n    f\" ip address {interface['ip']}\",\n    ' no shutdown',\n]\nfor cmd in commands:\n    print(cmd)",
      "exampleLanguage": "python",
      "mistake": "Putting the IP address line before the interface line, so the device has no interface context yet and rejects the address command.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Sending Configuration Commands, but it does not work correctly.",
       "buggyCode": "commands = [' ip address 192.0.2.1 255.255.255.0', 'interface GigabitEthernet0/0', ' no shutdown']",
       "fixedCode": "commands = ['interface GigabitEthernet0/0', ' ip address 192.0.2.1 255.255.255.0', ' no shutdown']",
       "explanation": "Configuration lines run in order, so the interface must be entered before any command that configures it; the address line first has no context."
      },
      "exercise": {
       "title": "Practise Sending Configuration Commands",
       "type": "write-code",
       "instructions": "Generate the configuration commands for one interface from the interface dictionary: the interface line, then the description, then the IP address, then 'no shutdown'. Print one command per line, in that order. This is the list send_config_set would apply on a lab device.",
       "starterCode": "interface = {\n    \"name\": \"GigabitEthernet0/0\",\n    \"description\": \"Link to core switch\",\n    \"ip\": \"192.0.2.1 255.255.255.0\",\n}\n# TODO: complete the program below.\n",
       "solution": "interface = {\n    \"name\": \"GigabitEthernet0/0\",\n    \"description\": \"Link to core switch\",\n    \"ip\": \"192.0.2.1 255.255.255.0\",\n}\ncommands = [\n    f\"interface {interface['name']}\",\n    f\" description {interface['description']}\",\n    f\" ip address {interface['ip']}\",\n    \" no shutdown\",\n]\nfor cmd in commands:\n    print(cmd)\n",
       "solutionExplanation": "The solution builds the required data, applies the Sending Configuration Commands technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interface GigabitEthernet0/0\n description Link to core switch\n ip address 192.0.2.1 255.255.255.0\n no shutdown",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "no shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Sending Configuration Commands is the key idea here: Configuration is sent to a device as an ordered list of command strings, and the order matters because later lines depend on earlier ones, such as entering an interface before setting its description.",
        "approach": "Work through Sending Configuration Commands step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-netmiko-m2-l4",
      "slug": "netauto-python-netmiko-m2-l4",
      "title": "Handling Connection Errors",
      "concept": "Netmiko raises NetmikoTimeoutException when a device does not answer and NetmikoAuthenticationException when the username or password is wrong, and both are exceptions you can catch separately. Good automation catches these exceptions, logs which device failed, and continues with the next device instead of crashing. You can practise the validation half of this locally by checking an inventory for missing fields and bad addresses before any connection is attempted.",
      "syntax": "from netmiko import ConnectHandler\nfrom netmiko import NetmikoTimeoutException, NetmikoAuthenticationException\ntry:\n    conn = ConnectHandler(**device)\nexcept NetmikoTimeoutException:\n    print('device did not answer')",
      "exampleCode": "import ipaddress\n\ndevices = [\n    {'host': '192.0.2.10', 'username': 'admin', 'password': 'secret'},\n    {'host': '999.1.1.1', 'username': 'admin', 'password': 'secret'},\n    {'host': '192.0.2.12', 'username': 'admin'},\n]\nfor device in devices:\n    try:\n        ipaddress.ip_address(device['host'])\n        password = device['password']\n        print(f\"OK {device['host']}\")\n    except ValueError:\n        print(f\"ERROR {device['host']}: bad IP address\")\n    except KeyError:\n        print(f\"ERROR {device['host']}: missing password\")",
      "exampleLanguage": "python",
      "mistake": "Catching the broad Exception and silently continuing, which hides authentication failures and makes a bad password look like a network outage.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handling Connection Errors, but it does not work correctly.",
       "buggyCode": "try:\n    conn = ConnectHandler(**device)\nexcept Exception:\n    pass  # ignore every failure",
       "fixedCode": "from netmiko import NetmikoAuthenticationException, NetmikoTimeoutException\ntry:\n    conn = ConnectHandler(**device)\nexcept NetmikoAuthenticationException:\n    print('bad credentials for', device['host'])\nexcept NetmikoTimeoutException:\n    print('no answer from', device['host'])",
       "explanation": "A bare except swallows the reason for the failure; catching the two Netmiko exceptions separately tells you whether it was credentials or reachability."
      },
      "exercise": {
       "title": "Practise Handling Connection Errors",
       "type": "write-code",
       "instructions": "Validate the inventory before connecting: for each device, check that the host is a valid IP address and that a password is present. Print 'OK <host>' for valid devices, 'ERROR <host>: bad IP address' for a bad address, and 'ERROR <host>: missing password' when the password key is absent.",
       "starterCode": "import ipaddress\n\ndevices = [\n    {\"host\": \"192.0.2.10\", \"username\": \"admin\", \"password\": \"secret\"},\n    {\"host\": \"999.1.1.1\", \"username\": \"admin\", \"password\": \"secret\"},\n    {\"host\": \"192.0.2.12\", \"username\": \"admin\"},\n]\n# TODO: complete the program below.\n",
       "solution": "import ipaddress\n\ndevices = [\n    {\"host\": \"192.0.2.10\", \"username\": \"admin\", \"password\": \"secret\"},\n    {\"host\": \"999.1.1.1\", \"username\": \"admin\", \"password\": \"secret\"},\n    {\"host\": \"192.0.2.12\", \"username\": \"admin\"},\n]\nfor device in devices:\n    try:\n        ipaddress.ip_address(device[\"host\"])\n        password = device[\"password\"]\n        print(f\"OK {device['host']}\")\n    except ValueError:\n        print(f\"ERROR {device['host']}: bad IP address\")\n    except KeyError:\n        print(f\"ERROR {device['host']}: missing password\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Handling Connection Errors technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "OK 192.0.2.10\nERROR 999.1.1.1: bad IP address\nERROR 192.0.2.12: missing password",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "bad IP address",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Handling Connection Errors is the key idea here: Netmiko raises NetmikoTimeoutException when a device does not answer and NetmikoAuthenticationException when the username or password is wrong, and both are exceptions you can catch separately.",
        "approach": "Work through Handling Connection Errors step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-netmiko-m2-l5",
      "slug": "netauto-python-netmiko-m2-l5",
      "title": "A Netmiko Script End to End",
      "concept": "A complete Netmiko script reads an inventory, opens a connection to each device, sends its commands, saves the output, and disconnects cleanly, handling errors per device. The script is usually run from a jump host or automation server that can reach the devices over SSH. Running it end to end needs a lab, but every piece, inventory, command lists, config generation, and error handling, is covered in this track.",
      "syntax": "for device in inventory:\n    with ConnectHandler(**device) as conn:\n        output = conn.send_command('show version')\n        save(device['host'], output)",
      "exampleCode": "from netmiko import ConnectHandler\nfrom netmiko import NetmikoTimeoutException\n\nfor device in inventory:\n    try:\n        with ConnectHandler(**device) as conn:\n            output = conn.send_command('show version')\n            save(device['host'], output)\n    except NetmikoTimeoutException:\n        print('unreachable:', device['host'])",
      "exampleLanguage": "python",
      "mistake": "Stopping the whole script when one device fails, instead of catching the error per device and continuing with the rest of the inventory.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Netmiko Script End to End, but it does not work correctly.",
       "buggyCode": "for device in inventory:\n    conn = ConnectHandler(**device)\n    print(conn.send_command('show version'))",
       "fixedCode": "for device in inventory:\n    try:\n        with ConnectHandler(**device) as conn:\n            print(conn.send_command('show version'))\n    except NetmikoTimeoutException:\n        print('unreachable:', device['host'])",
       "explanation": "One unreachable device would abort the loop for every device after it; catching the exception inside the loop lets the script finish the inventory."
      },
      "exercise": {
       "title": "Practise A Netmiko Script End to End",
       "type": "write-code",
       "instructions": "Build the job plan for a complete Netmiko script from the local inventory and command list: validate each device record (it needs device_type and host), skip invalid records while counting them, and print the job count, the skipped count, then one '<host> (<device_type>): <n> commands' line per valid device. Sending the commands needs a lab device - this exercise builds and validates the plan only, and never stops the whole plan for one bad record.",
       "starterCode": "inventory = [\n    {\"device_type\": \"cisco_ios\", \"host\": \"192.0.2.10\", \"username\": \"admin\"},\n    {\"device_type\": \"cisco_nxos\", \"host\": \"192.0.2.11\", \"username\": \"admin\"},\n    {\"device_type\": \"cisco_ios\", \"username\": \"admin\"},\n]\ncommands = [\"show version\", \"show ip interface brief\"]\n# TODO: complete the program below.\n",
       "solution": "inventory = [\n    {\"device_type\": \"cisco_ios\", \"host\": \"192.0.2.10\", \"username\": \"admin\"},\n    {\"device_type\": \"cisco_nxos\", \"host\": \"192.0.2.11\", \"username\": \"admin\"},\n    {\"device_type\": \"cisco_ios\", \"username\": \"admin\"},\n]\ncommands = [\"show version\", \"show ip interface brief\"]\njobs = []\nskipped = 0\nfor device in inventory:\n    if \"host\" not in device or \"device_type\" not in device:\n        skipped += 1\n        continue\n    jobs.append(device)\nprint(f\"Jobs: {len(jobs)}\")\nprint(f\"Skipped: {skipped}\")\nfor device in jobs:\n    print(f\"{device['host']} ({device['device_type']}): {len(commands)} commands\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A Netmiko Script End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Jobs: 2\nSkipped: 1\n192.0.2.10 (cisco_ios): 2 commands\n192.0.2.11 (cisco_nxos): 2 commands",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "192.0.2.11 (cisco_nxos): 2 commands",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Netmiko Script End to End is the key idea here: A complete Netmiko script reads an inventory, opens a connection to each device, sends its commands, saves the output, and disconnects cleanly, handling errors per device.",
        "approach": "Work through A Netmiko Script End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise Netmiko Foundations Capstone",
   "type": "write-code",
   "instructions": "Read the YAML inventory below, validate each device (valid IP address and a password present), and generate the interface configuration for each valid device. Print one line 'OK <host>' per valid device followed by its four configuration lines, and one line 'SKIP <host>: <reason>' per invalid device. The configuration uses interface GigabitEthernet0/0 with description 'Managed by Netmiko' and address 192.0.2.1 255.255.255.0 on every device. No connection is made: this is the offline half of a Netmiko job.",
   "starterCode": "import ipaddress\nimport yaml\n\nINVENTORY_YAML = \"\"\"\ndevices:\n  - host: 192.0.2.10\n    device_type: cisco_ios\n    username: admin\n    password: secret\n  - host: 999.1.1.1\n    device_type: cisco_ios\n    username: admin\n    password: secret\n  - host: 192.0.2.12\n    device_type: cisco_ios\n    username: admin\n\"\"\"\n# TODO: complete the capstone program below.\n",
   "solution": "import ipaddress\nimport yaml\n\nINVENTORY_YAML = \"\"\"\ndevices:\n  - host: 192.0.2.10\n    device_type: cisco_ios\n    username: admin\n    password: secret\n  - host: 999.1.1.1\n    device_type: cisco_ios\n    username: admin\n    password: secret\n  - host: 192.0.2.12\n    device_type: cisco_ios\n    username: admin\n\"\"\"\ninventory = yaml.safe_load(INVENTORY_YAML)\nfor device in inventory[\"devices\"]:\n    host = device[\"host\"]\n    try:\n        ipaddress.ip_address(host)\n        password = device[\"password\"]\n    except ValueError:\n        print(f\"SKIP {host}: bad IP address\")\n        continue\n    except KeyError:\n        print(f\"SKIP {host}: missing password\")\n        continue\n    print(f\"OK {host}\")\n    print(\"interface GigabitEthernet0/0\")\n    print(\" description Managed by Netmiko\")\n    print(\" ip address 192.0.2.1 255.255.255.0\")\n    print(\" no shutdown\")\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "OK 192.0.2.10\ninterface GigabitEthernet0/0\n description Managed by Netmiko\n ip address 192.0.2.1 255.255.255.0\n no shutdown\nSKIP 999.1.1.1: bad IP address\nSKIP 192.0.2.12: missing password",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "Managed by Netmiko",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "Netmiko Foundations Capstone Project",
   "description": "A small end-to-end offline Netmiko job: validate a YAML inventory and generate the interface configuration each valid device would receive.",
   "requirements": [
    "Use the core ideas of Netmiko Foundations in a working Python program.",
    "Validate every device in the YAML inventory before generating anything.",
    "Generate the same four-line interface configuration for each valid device.",
    "Print SKIP lines with a reason for every invalid device.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and validates the inventory correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-paramiko",
  "slug": "netauto-python-paramiko",
  "language": "python",
  "category": "devops",
  "title": "Paramiko and SSH Essentials",
  "description": "Go one level deeper than Netmiko: SSH itself, Paramiko clients, host keys, remote commands, SFTP, and timeouts, with offline practice on real validation and scheduling logic.",
  "difficulty": "Beginner",
  "estimatedHours": 9,
  "skills": [
   "SSH",
   "Paramiko",
   "SSHClient",
   "Host keys",
   "exec_command",
   "SFTP",
   "Exit statuses",
   "Exponential backoff"
  ],
  "prerequisites": [
   "netauto-python-netmiko"
  ],
  "analogy": "Learning {topic} is like learning to make a phone call: you dial the right number, prove who you are, and then you can talk.",
  "modules": [
   {
    "id": "netauto-python-paramiko-m1",
    "title": "Paramiko and SSH Essentials Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-paramiko-m1-l1",
      "slug": "netauto-python-paramiko-m1-l1",
      "title": "What Is SSH?",
      "concept": "SSH is a network protocol that gives you an encrypted shell session on a remote machine, and it authenticates the server with a host key and the user with a password or a key pair. Paramiko is a Python implementation of the SSH protocol, and Netmiko is built on top of it. Every SSH connection needs a hostname, a port (22 by default), a username, and a credential.",
      "syntax": "ssh admin@192.0.2.10\nssh -p 2222 admin@192.0.2.10",
      "exampleCode": "import paramiko\n\nclient = paramiko.SSHClient()\nclient.set_missing_host_key_policy(paramiko.AutoAddPolicy())\n# A real connection needs a reachable SSH server or lab device.\n# client.connect('192.0.2.10', username='admin', password='secret')",
      "exampleLanguage": "python",
      "mistake": "Treating SSH like Telnet and sending a password over an unencrypted connection, which exposes the credential to anyone on the path.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is SSH?, but it does not work correctly.",
       "buggyCode": "client.connect('192.0.2.10', username='admin', password='secret')\n# no host key policy set at all",
       "fixedCode": "client = paramiko.SSHClient()\nclient.set_missing_host_key_policy(paramiko.RejectPolicy())\nclient.connect('192.0.2.10', username='admin', password='secret')",
       "explanation": "Without a host key policy Paramiko refuses to connect, because it has no rule for unknown host keys; you must set a policy explicitly before connecting."
      },
      "exercise": {
       "title": "Practise What Is SSH?",
       "type": "write-code",
       "instructions": "Build the SSH connection summary for host 192.0.2.10, user admin, port 22. Print the equivalent ssh command line first, then one line each for Host, Port, and User.",
       "starterCode": "host = \"192.0.2.10\"\nusername = \"admin\"\nport = 22\n# TODO: complete the program below.\n",
       "solution": "host = \"192.0.2.10\"\nusername = \"admin\"\nport = 22\nprint(f\"ssh {username}@{host} -p {port}\")\nprint(f\"Host: {host}\")\nprint(f\"Port: {port}\")\nprint(f\"User: {username}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What Is SSH? technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ssh admin@192.0.2.10 -p 22\nHost: 192.0.2.10\nPort: 22\nUser: admin",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "ssh admin@192.0.2.10",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Is SSH? is the key idea here: SSH is a network protocol that gives you an encrypted shell session on a remote machine, and it authenticates the server with a host key and the user with a password or a key pair.",
        "approach": "Work through What Is SSH? step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-paramiko-m1-l2",
      "slug": "netauto-python-paramiko-m1-l2",
      "title": "Installing Paramiko",
      "concept": "Paramiko is installed from PyPI with pip install paramiko, and you confirm the install by importing paramiko and printing paramiko.__version__. It depends on the cryptography library, which pip installs automatically. Paramiko is pure Python on top of cryptography, so it installs on Linux, macOS, and Windows without a compiler in most cases.",
      "syntax": "pip install paramiko\npython3 -c \"import paramiko; print(paramiko.__version__)\"",
      "exampleCode": "$ pip install paramiko\n$ python3 -c \"import paramiko; print(paramiko.__version__)\"\n3.4.0",
      "exampleLanguage": "python",
      "mistake": "Installing Paramiko but never verifying the import, then discovering the failure only when a script tries to connect.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Installing Paramiko, but it does not work correctly.",
       "buggyCode": "$ pip install paramiko\n$ python -c \"import paramiko\"\nModuleNotFoundError: No module named 'paramiko'",
       "fixedCode": "$ pip install paramiko\n$ python3 -c \"import paramiko; print(paramiko.__version__)\"",
       "explanation": "pip installed the package for python3, but the script ran under a different python interpreter; always verify with the same interpreter that will run the script."
      },
      "exercise": {
       "title": "Practise Installing Paramiko",
       "type": "write-code",
       "instructions": "Build the install-check record for Paramiko: the package name, the pip install command, the import used to verify it, and the dependency pip installs automatically. Validate that the install command names the package and the verify step imports it, then print the four-line summary exactly as shown. This is the local record of the install steps from the lesson - installing on a real machine and connecting to a device both need a lab.",
       "starterCode": "package = \"paramiko\"\ninstall_cmd = \"pip install paramiko\"\nverify_cmd = \"import paramiko\"\ndependency = \"cryptography\"\n# TODO: complete the program below.\n",
       "solution": "package = \"paramiko\"\ninstall_cmd = \"pip install paramiko\"\nverify_cmd = \"import paramiko\"\ndependency = \"cryptography\"\nassert install_cmd == f\"pip install {package}\"\nassert verify_cmd == f\"import {package}\"\nprint(f\"Package: {package}\")\nprint(f\"Install: {install_cmd}\")\nprint(f\"Verify: {verify_cmd}\")\nprint(f\"Dependency: {dependency}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Installing Paramiko technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Package: paramiko\nInstall: pip install paramiko\nVerify: import paramiko\nDependency: cryptography",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "pip install paramiko",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Installing Paramiko is the key idea here: Paramiko is installed from PyPI with pip install paramiko, and you confirm the install by importing paramiko and printing paramiko.__version__.",
        "approach": "Work through Installing Paramiko step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-paramiko-m1-l3",
      "slug": "netauto-python-paramiko-m1-l3",
      "title": "The SSHClient Object",
      "concept": "SSHClient is Paramiko's high-level class for opening an SSH session, and you create one instance per connection. Its connect method takes the hostname, username, and either a password or a key file, and it raises an exception when the server cannot be reached or the credentials are wrong. Running connect for real needs a reachable SSH server, so this lesson practises the object shape, not a live login.",
      "syntax": "client = paramiko.SSHClient()\nclient.connect(hostname, username='admin', password='secret')\nclient.close()",
      "exampleCode": "import paramiko\n\nclient = paramiko.SSHClient()\nclient.set_missing_host_key_policy(paramiko.AutoAddPolicy())\n# client.connect('192.0.2.10', username='admin', password='secret')\n# client.close()",
      "exampleLanguage": "python",
      "mistake": "Reusing one SSHClient for many devices at once, which does not work because one client holds exactly one session.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The SSHClient Object, but it does not work correctly.",
       "buggyCode": "client = paramiko.SSHClient()\nclient.connect('192.0.2.10', username='admin', password='secret')\nclient.connect('192.0.2.11', username='admin', password='secret')",
       "fixedCode": "for host in ['192.0.2.10', '192.0.2.11']:\n    client = paramiko.SSHClient()\n    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())\n    client.connect(host, username='admin', password='secret')\n    client.close()",
       "explanation": "One SSHClient holds one session, so connecting a second host on the same client replaces the first; create a fresh client per device."
      },
      "exercise": {
       "title": "Check your understanding: The SSHClient Object",
       "type": "multiple-choice",
       "instructions": "Which statement about The SSHClient Object is correct?",
       "starterCode": "",
       "solution": "SSHClient is Paramiko's high-level class for opening an SSH session, and you create one instance per connection.",
       "solutionExplanation": "SSHClient is Paramiko's high-level class for opening an SSH session, and you create one instance per connection. The other options are false: The SSHClient Object is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "SSHClient is Paramiko's high-level class for opening an SSH session, and you create one instance per connection.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of The SSHClient Object from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "SSHClient is Paramiko's high-level class for opening an SSH session, and you create one instance per connection.",
        "The SSHClient Object is not available in Python",
        "The SSHClient Object only works on Windows",
        "The SSHClient Object was removed from Python in the latest version",
        "The SSHClient Object can only be used once in a program"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-python-paramiko-m1-l4",
      "slug": "netauto-python-paramiko-m1-l4",
      "title": "Host Keys and Security Policies",
      "concept": "Paramiko checks the server's host key against the known-hosts file, and the missing-host-key policy decides what happens for a key it has never seen. AutoAddPolicy accepts and stores any unknown key, which is convenient in a lab but unsafe on a real network, while RejectPolicy refuses unknown keys outright. The safe production choice is to load known hosts with load_system_host_keys and use RejectPolicy.",
      "syntax": "client.load_system_host_keys()\nclient.set_missing_host_key_policy(paramiko.RejectPolicy())",
      "exampleCode": "import paramiko\n\nclient = paramiko.SSHClient()\nclient.load_system_host_keys()\nclient.set_missing_host_key_policy(paramiko.RejectPolicy())\n# unknown hosts are now refused instead of silently trusted",
      "exampleLanguage": "python",
      "mistake": "Using AutoAddPolicy in production, which silently trusts any server, including an impostor running a man-in-the-middle attack.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Host Keys and Security Policies, but it does not work correctly.",
       "buggyCode": "client.set_missing_host_key_policy(paramiko.AutoAddPolicy())\n# used on the production network",
       "fixedCode": "client.load_system_host_keys()\nclient.set_missing_host_key_policy(paramiko.RejectPolicy())",
       "explanation": "AutoAddPolicy trusts the first key it sees with no check, so an attacker can impersonate the device; RejectPolicy only trusts keys already in known hosts."
      },
      "exercise": {
       "title": "Check your understanding: Host Keys and Security Policies",
       "type": "multiple-choice",
       "instructions": "Which statement about Host Keys and Security Policies is correct?",
       "starterCode": "",
       "solution": "Paramiko checks the server's host key against the known-hosts file, and the missing-host-key policy decides what happens for a key it has never seen.",
       "solutionExplanation": "Paramiko checks the server's host key against the known-hosts file, and the missing-host-key policy decides what happens for a key it has never seen. The other options are false: Host Keys and Security Policies is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Paramiko checks the server's host key against the known-hosts file, and the missing-host-key policy decides what happens for a key it has never seen.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Host Keys and Security Policies from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Host Keys and Security Policies only works on Windows",
        "Host Keys and Security Policies was removed from Python in the latest version",
        "Paramiko checks the server's host key against the known-hosts file, and the missing-host-key policy decides what happens for a key it has never seen.",
        "Host Keys and Security Policies can only be used once in a program",
        "Host Keys and Security Policies requires a separate paid licence to use"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-python-paramiko-m1-l5",
      "slug": "netauto-python-paramiko-m1-l5",
      "title": "Running a Remote Command",
      "concept": "The exec_command method runs one command on the remote host and returns three file-like objects: stdin, stdout, and stderr. You read the command's output from stdout and its exit status with recv_exit_status, which blocks until the command finishes. Mapping exit statuses to meanings is local work you can practise without a server, and this lesson does exactly that.",
      "syntax": "stdin, stdout, stderr = client.exec_command('uptime')\nprint(stdout.read().decode())\nprint(stdout.channel.recv_exit_status())",
      "exampleCode": "EXIT_MEANINGS = {0: 'success', 1: 'general error', 2: 'misuse of command', 127: 'command not found'}\nresults = [('uptime', 0), ('show version', 127), ('ls /tmp', 1)]\nfor command, status in results:\n    print(f\"{command}: exit {status} ({EXIT_MEANINGS.get(status, 'unknown')})\")",
      "exampleLanguage": "python",
      "mistake": "Reading stdout without checking the exit status, so a failed command's empty output is treated as a successful result.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Running a Remote Command, but it does not work correctly.",
       "buggyCode": "stdin, stdout, stderr = client.exec_command('show version')\nprint(stdout.read().decode())  # empty, but treated as success",
       "fixedCode": "stdin, stdout, stderr = client.exec_command('show version')\nstatus = stdout.channel.recv_exit_status()\nif status != 0:\n    print('failed:', stderr.read().decode())",
       "explanation": "A failed command often prints nothing to stdout, so empty output looks like success; the exit status is the reliable signal."
      },
      "exercise": {
       "title": "Practise Running a Remote Command",
       "type": "write-code",
       "instructions": "Map each command result to its meaning: for each (command, exit status) pair in results, print '<command>: exit <status> (<meaning>)' using the EXIT_MEANINGS dictionary, with 'unknown' for any status not listed.",
       "starterCode": "EXIT_MEANINGS = {0: \"success\", 1: \"general error\", 2: \"misuse of command\", 127: \"command not found\"}\nresults = [(\"uptime\", 0), (\"show version\", 127), (\"ls /tmp\", 1)]\n# TODO: complete the program below.\n",
       "solution": "EXIT_MEANINGS = {0: \"success\", 1: \"general error\", 2: \"misuse of command\", 127: \"command not found\"}\nresults = [(\"uptime\", 0), (\"show version\", 127), (\"ls /tmp\", 1)]\nfor command, status in results:\n    print(f\"{command}: exit {status} ({EXIT_MEANINGS.get(status, 'unknown')})\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Running a Remote Command technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "uptime: exit 0 (success)\nshow version: exit 127 (command not found)\nls /tmp: exit 1 (general error)",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "command not found",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Running a Remote Command is the key idea here: The exec_command method runs one command on the remote host and returns three file-like objects: stdin, stdout, and stderr.",
        "approach": "Work through Running a Remote Command step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-paramiko-m2",
    "title": "Paramiko and SSH Essentials in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-python-paramiko-m2-l1",
      "slug": "netauto-python-paramiko-m2-l1",
      "title": "Reading stdout, stderr, and Exit Status",
      "concept": "The exec_command method returns three separate streams, so normal output goes to stdout, error text goes to stderr, and the numeric result goes to the channel's exit status. You must read stderr as well as stdout, because a command can fail while printing nothing to stdout. Reading one stream fully before the other can deadlock on large output, so Paramiko code usually reads both or uses recv_exit_status to wait first.",
      "syntax": "stdin, stdout, stderr = client.exec_command('ls /nope')\nprint('out:', stdout.read().decode())\nprint('err:', stderr.read().decode())\nprint('status:', stdout.channel.recv_exit_status())",
      "exampleCode": "stdin, stdout, stderr = client.exec_command('ls /nope')\nstatus = stdout.channel.recv_exit_status()\nprint('status:', status)\nprint('err:', stderr.read().decode())",
      "exampleLanguage": "python",
      "mistake": "Ignoring stderr entirely, so the error message that explains a failure is never seen.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Reading stdout, stderr, and Exit Status, but it does not work correctly.",
       "buggyCode": "stdin, stdout, stderr = client.exec_command('ls /nope')\nprint(stdout.read().decode())",
       "fixedCode": "stdin, stdout, stderr = client.exec_command('ls /nope')\nstatus = stdout.channel.recv_exit_status()\nif status != 0:\n    print(stderr.read().decode())",
       "explanation": "The failure's explanation is written to stderr, not stdout, so reading only stdout shows an empty result and no reason."
      },
      "exercise": {
       "title": "Practise Reading stdout, stderr, and Exit Status",
       "type": "write-code",
       "instructions": "Each recorded result below has separate stdout, stderr, and exit status, exactly as exec_command returns them. Judge each command by its exit status AND its stderr - a command can fail while printing nothing to stdout, so never look at stdout alone - and print one '<command>: ok|failed (status <n>)' line per result, then a 'Failed: <n>' total. These are recorded results held locally; no SSH session is opened.",
       "starterCode": "results = [\n    {\"command\": \"echo ready\", \"stdout\": \"ready\", \"stderr\": \"\", \"status\": 0},\n    {\"command\": \"ls /nope\", \"stdout\": \"\", \"stderr\": \"no such file\", \"status\": 2},\n]\n# TODO: complete the program below.\n",
       "solution": "results = [\n    {\"command\": \"echo ready\", \"stdout\": \"ready\", \"stderr\": \"\", \"status\": 0},\n    {\"command\": \"ls /nope\", \"stdout\": \"\", \"stderr\": \"no such file\", \"status\": 2},\n]\nfailed = 0\nfor result in results:\n    ok = result[\"status\"] == 0 and result[\"stderr\"] == \"\"\n    if not ok:\n        failed += 1\n    print(f\"{result['command']}: {'ok' if ok else 'failed'} (status {result['status']})\")\nprint(f\"Failed: {failed}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Reading stdout, stderr, and Exit Status technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "echo ready: ok (status 0)\nls /nope: failed (status 2)\nFailed: 1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "ls /nope: failed (status 2)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Reading stdout, stderr, and Exit Status is the key idea here: The exec_command method returns three separate streams, so normal output goes to stdout, error text goes to stderr, and the numeric result goes to the channel's exit status.",
        "approach": "Work through Reading stdout, stderr, and Exit Status step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-paramiko-m2-l2",
      "slug": "netauto-python-paramiko-m2-l2",
      "title": "Interactive Shells and Channels",
      "concept": "The invoke_shell method opens an interactive shell channel that behaves like a terminal, keeping state between commands, while exec_command runs one command and exits. An interactive shell is what Netmiko uses, because network devices keep prompt and configuration state between commands. You read from a shell channel with recv, and you usually wait for the prompt string before sending the next command.",
      "syntax": "channel = client.invoke_shell()\nchannel.send('terminal length 0\\n')\noutput = channel.recv(65535).decode()",
      "exampleCode": "channel = client.invoke_shell()\nchannel.send('show version\\n')\nimport time\ntime.sleep(1)\nprint(channel.recv(65535).decode())",
      "exampleLanguage": "python",
      "mistake": "Using exec_command for a device CLI that needs interactive prompts, which fails because each exec_command call starts a fresh session with no state.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Interactive Shells and Channels, but it does not work correctly.",
       "buggyCode": "stdin, stdout, stderr = client.exec_command('configure terminal')\nstdin, stdout, stderr = client.exec_command('hostname R1')",
       "fixedCode": "channel = client.invoke_shell()\nchannel.send('configure terminal\\n')\nchannel.send('hostname R1\\n')",
       "explanation": "Each exec_command call is a separate session, so the second one is not in configuration mode; an interactive shell keeps the state between commands."
      },
      "exercise": {
       "title": "Check your understanding: Interactive Shells and Channels",
       "type": "multiple-choice",
       "instructions": "Which statement about Interactive Shells and Channels is correct?",
       "starterCode": "",
       "solution": "The invoke_shell method opens an interactive shell channel that behaves like a terminal, keeping state between commands, while exec_command runs one command and exits.",
       "solutionExplanation": "The invoke_shell method opens an interactive shell channel that behaves like a terminal, keeping state between commands, while exec_command runs one command and exits. The other options are false: Interactive Shells and Channels is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The invoke_shell method opens an interactive shell channel that behaves like a terminal, keeping state between commands, while exec_command runs one command and exits.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Interactive Shells and Channels from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Interactive Shells and Channels requires a separate paid licence to use",
        "Interactive Shells and Channels is not available in Python",
        "Interactive Shells and Channels only works on Windows",
        "The invoke_shell method opens an interactive shell channel that behaves like a terminal, keeping state between commands, while exec_command runs one command and exits.",
        "Interactive Shells and Channels was removed from Python in the latest version"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-python-paramiko-m2-l3",
      "slug": "netauto-python-paramiko-m2-l3",
      "title": "SFTP File Transfer Basics",
      "concept": "Paramiko's SFTPClient transfers files over the same SSH connection, and you open one with client.open_sftp(). The get method downloads a remote file to a local path and put uploads a local file to a remote path. Planning which files move in which direction is local work, and this lesson builds a transfer plan you can check without a server.",
      "syntax": "sftp = client.open_sftp()\nsftp.get('/remote/running-config', './running-config')\nsftp.put('./new-config', '/remote/new-config')\nsftp.close()",
      "exampleCode": "transfers = [\n    ('get', '/remote/running-config', './backups/r1-running.cfg'),\n    ('put', './new-config.cfg', '/remote/new-config.cfg'),\n    ('get', '/remote/startup-config', './backups/r1-startup.cfg'),\n]\nfor direction, source, target in transfers:\n    print(f\"{direction.upper()} {source} -> {target}\")",
      "exampleLanguage": "python",
      "mistake": "Opening a second SSH connection just for file transfer, instead of reusing the existing client's SFTP session.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate SFTP File Transfer Basics, but it does not work correctly.",
       "buggyCode": "client2 = paramiko.SSHClient()\nclient2.connect('192.0.2.10', username='admin', password='secret')\nsftp = client2.open_sftp()",
       "fixedCode": "sftp = client.open_sftp()  # reuse the connected client",
       "explanation": "SFTP runs over the SSH connection you already have, so a second login wastes a session and a second authentication; open_sftp on the existing client is enough."
      },
      "exercise": {
       "title": "Practise SFTP File Transfer Basics",
       "type": "write-code",
       "instructions": "Build the SFTP transfer plan from the transfers list. Print one line per transfer in the form '<DIRECTION> <source> -> <target>' with the direction in upper case, in list order.",
       "starterCode": "transfers = [\n    (\"get\", \"/remote/running-config\", \"./backups/r1-running.cfg\"),\n    (\"put\", \"./new-config.cfg\", \"/remote/new-config.cfg\"),\n    (\"get\", \"/remote/startup-config\", \"./backups/r1-startup.cfg\"),\n]\n# TODO: complete the program below.\n",
       "solution": "transfers = [\n    (\"get\", \"/remote/running-config\", \"./backups/r1-running.cfg\"),\n    (\"put\", \"./new-config.cfg\", \"/remote/new-config.cfg\"),\n    (\"get\", \"/remote/startup-config\", \"./backups/r1-startup.cfg\"),\n]\nfor direction, source, target in transfers:\n    print(f\"{direction.upper()} {source} -> {target}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the SFTP File Transfer Basics technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GET /remote/running-config -> ./backups/r1-running.cfg\nPUT ./new-config.cfg -> /remote/new-config.cfg\nGET /remote/startup-config -> ./backups/r1-startup.cfg",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "backups/r1-running.cfg",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "SFTP File Transfer Basics is the key idea here: Paramiko's SFTPClient transfers files over the same SSH connection, and you open one with client.",
        "approach": "Work through SFTP File Transfer Basics step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-paramiko-m2-l4",
      "slug": "netauto-python-paramiko-m2-l4",
      "title": "Handling Timeouts and Retries",
      "concept": "Paramiko's connect method accepts a timeout in seconds, and a retry loop with a growing delay, called exponential backoff, is the standard way to survive a device that is briefly busy. The delays usually double on each attempt, for example 1, 2, 4, then 8 seconds, and the loop gives up after a fixed number of tries. Computing the backoff schedule is pure arithmetic you can test locally, and this lesson does exactly that.",
      "syntax": "for attempt in range(4):\n    try:\n        client.connect(host, timeout=10)\n        break\n    except socket.timeout:\n        time.sleep(2 ** attempt)",
      "exampleCode": "attempts = 4\nbase_delay = 1\nfor attempt in range(attempts):\n    delay = base_delay * (2 ** attempt)\n    print(f\"attempt {attempt + 1}: wait {delay}s before retry\")",
      "exampleLanguage": "python",
      "mistake": "Retrying immediately in a tight loop with no delay, which hammers a struggling device and can make the outage worse.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handling Timeouts and Retries, but it does not work correctly.",
       "buggyCode": "for attempt in range(10):\n    client.connect(host, username='admin', password='secret')",
       "fixedCode": "for attempt in range(4):\n    try:\n        client.connect(host, username='admin', password='secret')\n        break\n    except Exception:\n        time.sleep(2 ** attempt)",
       "explanation": "Immediate retries flood the device with new connection attempts; waiting with exponential backoff gives it time to recover."
      },
      "exercise": {
       "title": "Practise Handling Timeouts and Retries",
       "type": "write-code",
       "instructions": "Compute the exponential backoff schedule for 4 attempts with a base delay of 1 second: the delay for attempt n is 1 times 2 to the power (n - 1). Print one line per attempt: 'attempt <n>: wait <delay>s before retry'.",
       "starterCode": "attempts = 4\nbase_delay = 1\n# TODO: complete the program below.\n",
       "solution": "attempts = 4\nbase_delay = 1\nfor attempt in range(attempts):\n    delay = base_delay * (2 ** attempt)\n    print(f\"attempt {attempt + 1}: wait {delay}s before retry\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Handling Timeouts and Retries technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "attempt 1: wait 1s before retry\nattempt 2: wait 2s before retry\nattempt 3: wait 4s before retry\nattempt 4: wait 8s before retry",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "wait 8s before retry",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Handling Timeouts and Retries is the key idea here: Paramiko's connect method accepts a timeout in seconds, and a retry loop with a growing delay, called exponential backoff, is the standard way to survive a device that is briefly busy.",
        "approach": "Work through Handling Timeouts and Retries step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-paramiko-m2-l5",
      "slug": "netauto-python-paramiko-m2-l5",
      "title": "A Paramiko Script End to End",
      "concept": "A complete Paramiko script loads its connection details, opens one SSHClient per device, runs its commands, checks every exit status, and closes the client in a finally block. Credentials come from a secure source, never from the script itself, and failures are reported per device so one bad host cannot hide the results of the others. The validation half of this script, checking connection details before dialling, is what this lesson practises.",
      "syntax": "client = paramiko.SSHClient()\ntry:\n    client.connect(host, username=user, password=pw, timeout=10)\n    run_commands(client)\nfinally:\n    client.close()",
      "exampleCode": "import ipaddress\n\nservers = [\n    {'host': '192.0.2.10', 'username': 'admin', 'password': 'secret', 'port': 22},\n    {'host': '192.0.2.11', 'username': 'admin', 'password': 'secret', 'port': 2222},\n    {'host': '192.0.2.12', 'username': '', 'password': 'secret', 'port': 22},\n]\nfor server in servers:\n    try:\n        ipaddress.ip_address(server['host'])\n        if not server['username']:\n            raise ValueError('missing username')\n        if not 1 <= server['port'] <= 65535:\n            raise ValueError('bad port')\n        print(f\"READY {server['host']}:{server['port']}\")\n    except ValueError as exc:\n        print(f\"NOT READY {server['host']}: {exc}\")",
      "exampleLanguage": "python",
      "mistake": "Putting the client.close() call only after the successful path, so a failed connection leaves the client object open.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Paramiko Script End to End, but it does not work correctly.",
       "buggyCode": "client.connect(host, username=user, password=pw)\nrun_commands(client)\nclient.close()",
       "fixedCode": "try:\n    client.connect(host, username=user, password=pw)\n    run_commands(client)\nfinally:\n    client.close()",
       "explanation": "If run_commands raises, the plain close line never runs; a finally block closes the client whether the work succeeded or failed."
      },
      "exercise": {
       "title": "Practise A Paramiko Script End to End",
       "type": "write-code",
       "instructions": "Validate the SSH server list before dialling: each server needs a valid IP address, a non-empty username, and a port between 1 and 65535. Print 'READY <host>:<port>' for valid servers and 'NOT READY <host>: <reason>' for invalid ones.",
       "starterCode": "import ipaddress\n\nservers = [\n    {\"host\": \"192.0.2.10\", \"username\": \"admin\", \"password\": \"secret\", \"port\": 22},\n    {\"host\": \"192.0.2.11\", \"username\": \"admin\", \"password\": \"secret\", \"port\": 2222},\n    {\"host\": \"192.0.2.12\", \"username\": \"\", \"password\": \"secret\", \"port\": 22},\n]\n# TODO: complete the program below.\n",
       "solution": "import ipaddress\n\nservers = [\n    {\"host\": \"192.0.2.10\", \"username\": \"admin\", \"password\": \"secret\", \"port\": 22},\n    {\"host\": \"192.0.2.11\", \"username\": \"admin\", \"password\": \"secret\", \"port\": 2222},\n    {\"host\": \"192.0.2.12\", \"username\": \"\", \"password\": \"secret\", \"port\": 22},\n]\nfor server in servers:\n    try:\n        ipaddress.ip_address(server[\"host\"])\n        if not server[\"username\"]:\n            raise ValueError(\"missing username\")\n        if not 1 <= server[\"port\"] <= 65535:\n            raise ValueError(\"bad port\")\n        print(f\"READY {server['host']}:{server['port']}\")\n    except ValueError as exc:\n        print(f\"NOT READY {server['host']}: {exc}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A Paramiko Script End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "READY 192.0.2.10:22\nREADY 192.0.2.11:2222\nNOT READY 192.0.2.12: missing username",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "READY 192.0.2.11:2222",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Paramiko Script End to End is the key idea here: A complete Paramiko script loads its connection details, opens one SSHClient per device, runs its commands, checks every exit status, and closes the client in a finally block.",
        "approach": "Work through A Paramiko Script End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise Paramiko and SSH Essentials Capstone",
   "type": "write-code",
   "instructions": "Build the connection plan for three SSH servers: validate each one (valid IP, non-empty username, port 1-65535), print 'READY <host>:<port> as <username>' for valid servers and 'NOT READY <host>: <reason>' for invalid ones, then print the exponential backoff schedule (base 2 seconds, 3 attempts) as 'retry <n>: wait <delay>s'. The servers are 192.0.2.10 admin port 22, 192.0.2.11 admin port 2222, and 192.0.2.12 with an empty username on port 22.",
   "starterCode": "import ipaddress\n\nservers = [\n    {\"host\": \"192.0.2.10\", \"username\": \"admin\", \"port\": 22},\n    {\"host\": \"192.0.2.11\", \"username\": \"admin\", \"port\": 2222},\n    {\"host\": \"192.0.2.12\", \"username\": \"\", \"port\": 22},\n]\n# TODO: complete the capstone program below.\n",
   "solution": "import ipaddress\n\nservers = [\n    {\"host\": \"192.0.2.10\", \"username\": \"admin\", \"port\": 22},\n    {\"host\": \"192.0.2.11\", \"username\": \"admin\", \"port\": 2222},\n    {\"host\": \"192.0.2.12\", \"username\": \"\", \"port\": 22},\n]\nfor server in servers:\n    try:\n        ipaddress.ip_address(server[\"host\"])\n        if not server[\"username\"]:\n            raise ValueError(\"missing username\")\n        if not 1 <= server[\"port\"] <= 65535:\n            raise ValueError(\"bad port\")\n        print(f\"READY {server['host']}:{server['port']} as {server['username']}\")\n    except ValueError as exc:\n        print(f\"NOT READY {server['host']}: {exc}\")\nfor attempt in range(3):\n    print(f\"retry {attempt + 1}: wait {2 * (2 ** attempt)}s\")\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "READY 192.0.2.10:22 as admin\nREADY 192.0.2.11:2222 as admin\nNOT READY 192.0.2.12: missing username\nretry 1: wait 2s\nretry 2: wait 4s\nretry 3: wait 8s",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "retry 3: wait 8s",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "Paramiko and SSH Essentials Capstone Project",
   "description": "A small end-to-end offline Paramiko job: validate an SSH server list and compute the retry schedule the script would use.",
   "requirements": [
    "Use the core ideas of Paramiko and SSH Essentials in a working Python program.",
    "Validate every server in the list before planning any connection.",
    "Print READY lines for valid servers and NOT READY lines with reasons for the rest.",
    "Compute the exponential backoff schedule for three retries.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and validates the server list correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-napalm",
  "slug": "netauto-python-napalm",
  "language": "python",
  "category": "devops",
  "title": "NAPALM Unified APIs",
  "description": "One API for every vendor: NAPALM drivers, getters, candidate configs, diffs, commits, and compliance reports, with offline practice on real data.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "NAPALM",
   "Drivers",
   "Getters",
   "get_facts",
   "Candidate configs",
   "compare_config",
   "Compliance reports",
   "difflib"
  ],
  "prerequisites": [
   "netauto-python-netmiko",
   "netauto-python-paramiko"
  ],
  "analogy": "Learning {topic} is like learning one remote control that works with every brand of television in the house.",
  "modules": [
   {
    "id": "netauto-python-napalm-m1",
    "title": "NAPALM Unified APIs Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-napalm-m1-l1",
      "slug": "netauto-python-napalm-m1-l1",
      "title": "What Is NAPALM?",
      "concept": "NAPALM is a Python library that gives every supported network operating system the same API, so get_facts() returns the same dictionary shape on Cisco IOS, Junos, and Arista EOS. It works by loading a driver for the device's operating system and translating the common calls into that vendor's commands. NAPALM is the right tool when you need the same data, facts, interfaces, or configuration, from a mixed-vendor network.",
      "syntax": "from napalm import get_network_driver\ndriver = get_network_driver('ios')\ndevice = driver('192.0.2.10', 'admin', 'secret')",
      "exampleCode": "DRIVERS = {'ios': 'Cisco IOS', 'nxos': 'Cisco NX-OS', 'junos': 'Juniper Junos', 'eos': 'Arista EOS'}\nfor name, vendor in sorted(DRIVERS.items()):\n    print(f\"{name}: {vendor}\")",
      "exampleLanguage": "python",
      "mistake": "Assuming NAPALM supports every command on every vendor, when some getters are optional and raise NotImplementedError on drivers that do not provide them.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is NAPALM?, but it does not work correctly.",
       "buggyCode": "device = driver('192.0.2.10', 'admin', 'secret')\ndevice.open()\nprint(device.get_bgp_neighbors())  # assumed to work everywhere",
       "fixedCode": "device = driver('192.0.2.10', 'admin', 'secret')\ndevice.open()\ntry:\n    print(device.get_bgp_neighbors())\nexcept NotImplementedError:\n    print('BGP getter not supported by this driver')",
       "explanation": "Optional getters raise NotImplementedError on drivers that do not implement them, so code must handle that case instead of assuming every getter works everywhere."
      },
      "exercise": {
       "title": "Practise What Is NAPALM?",
       "type": "write-code",
       "instructions": "Print the NAPALM driver table: one line per driver in the form '<driver name>: <vendor>', sorted by driver name.",
       "starterCode": "DRIVERS = {\"ios\": \"Cisco IOS\", \"nxos\": \"Cisco NX-OS\", \"junos\": \"Juniper Junos\", \"eos\": \"Arista EOS\"}\n# TODO: complete the program below.\n",
       "solution": "DRIVERS = {\"ios\": \"Cisco IOS\", \"nxos\": \"Cisco NX-OS\", \"junos\": \"Juniper Junos\", \"eos\": \"Arista EOS\"}\nfor name, vendor in sorted(DRIVERS.items()):\n    print(f\"{name}: {vendor}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What Is NAPALM? technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "eos: Arista EOS\nios: Cisco IOS\njunos: Juniper Junos\nnxos: Cisco NX-OS",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "junos: Juniper Junos",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Is NAPALM? is the key idea here: NAPALM is a Python library that gives every supported network operating system the same API, so get_facts() returns the same dictionary shape on Cisco IOS, Junos, and Arista EOS.",
        "approach": "Work through What Is NAPALM? step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-napalm-m1-l2",
      "slug": "netauto-python-napalm-m1-l2",
      "title": "Installing NAPALM",
      "concept": "NAPALM is installed from PyPI with pip install napalm, and you confirm the install by importing napalm and printing napalm.__version__. The base package includes drivers for the major vendors, while extra drivers live in separate packages such as napalm-ansible. NAPALM pulls in Netmiko and several parsing libraries, so the install takes longer than a small pure-Python package.",
      "syntax": "pip install napalm\npython3 -c \"import napalm; print(napalm.__version__)\"",
      "exampleCode": "$ pip install napalm\n$ python3 -c \"import napalm; print(napalm.__version__)\"\n4.1.0",
      "exampleLanguage": "python",
      "mistake": "Installing NAPALM but not checking that the driver you need is included, then finding at runtime that your vendor needs an extra package.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Installing NAPALM, but it does not work correctly.",
       "buggyCode": "$ pip install napalm\n$ python3 -c \"from napalm import get_network_driver; get_network_driver('myos')\"",
       "fixedCode": "$ pip install napalm\n$ python3 -c \"from napalm import get_network_driver; print(get_network_driver('ios'))\"",
       "explanation": "An unknown driver name raises an exception at runtime; checking the driver loads right after install catches a missing extra package early."
      },
      "exercise": {
       "title": "Practise Installing NAPALM",
       "type": "write-code",
       "instructions": "Build the install-check record for NAPALM: the package name, the pip install command, the import used to verify it, and which drivers the base package includes. Validate that the install command names the package and the verify step imports it, then print the four-line summary exactly as shown. This is the local record of the install steps from the lesson - installing on a real machine and connecting to a device both need a lab.",
       "starterCode": "package = \"napalm\"\ninstall_cmd = \"pip install napalm\"\nverify_cmd = \"import napalm\"\ndrivers = \"base package\"\n# TODO: complete the program below.\n",
       "solution": "package = \"napalm\"\ninstall_cmd = \"pip install napalm\"\nverify_cmd = \"import napalm\"\ndrivers = \"base package\"\nassert install_cmd == f\"pip install {package}\"\nassert verify_cmd == f\"import {package}\"\nprint(f\"Package: {package}\")\nprint(f\"Install: {install_cmd}\")\nprint(f\"Verify: {verify_cmd}\")\nprint(f\"Drivers: {drivers}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Installing NAPALM technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Package: napalm\nInstall: pip install napalm\nVerify: import napalm\nDrivers: base package",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "pip install napalm",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Installing NAPALM is the key idea here: NAPALM is installed from PyPI with pip install napalm, and you confirm the install by importing napalm and printing napalm.__version__.",
        "approach": "Work through Installing NAPALM step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-napalm-m1-l3",
      "slug": "netauto-python-napalm-m1-l3",
      "title": "Getting a Driver and Opening a Session",
      "concept": "The get_network_driver function takes a driver name such as ios and returns the driver class, and calling that class with hostname, username, and password builds a device object. The device object does nothing on the network until you call open(), which starts the SSH session, and close() ends it. Running this for real needs a lab device, so this lesson practises the call sequence, not a live login.",
      "syntax": "from napalm import get_network_driver\ndriver = get_network_driver('ios')\ndevice = driver('192.0.2.10', 'admin', 'secret')\ndevice.open()\ndevice.close()",
      "exampleCode": "from napalm import get_network_driver\n\ndriver = get_network_driver('ios')\ndevice = driver('192.0.2.10', 'admin', 'secret')\ndevice.open()\nprint(device.get_facts())\ndevice.close()",
      "exampleLanguage": "python",
      "mistake": "Calling a getter before open(), which fails because no session exists yet.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Getting a Driver and Opening a Session, but it does not work correctly.",
       "buggyCode": "device = driver('192.0.2.10', 'admin', 'secret')\nprint(device.get_facts())",
       "fixedCode": "device = driver('192.0.2.10', 'admin', 'secret')\ndevice.open()\nprint(device.get_facts())\ndevice.close()",
       "explanation": "Building the device object only stores the connection details; open() must run first or the getter has no session to use."
      },
      "exercise": {
       "title": "Check your understanding: Getting a Driver and Opening a Session",
       "type": "multiple-choice",
       "instructions": "Which statement about Getting a Driver and Opening a Session is correct?",
       "starterCode": "",
       "solution": "The get_network_driver function takes a driver name such as ios and returns the driver class, and calling that class with hostname, username, and password builds a device object.",
       "solutionExplanation": "The get_network_driver function takes a driver name such as ios and returns the driver class, and calling that class with hostname, username, and password builds a device object. The other options are false: Getting a Driver and Opening a Session is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The get_network_driver function takes a driver name such as ios and returns the driver class, and calling that class with hostname, username, and password builds a device object.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Getting a Driver and Opening a Session from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "The get_network_driver function takes a driver name such as ios and returns the driver class, and calling that class with hostname, username, and password builds a device object.",
        "Getting a Driver and Opening a Session is not available in Python",
        "Getting a Driver and Opening a Session only works on Windows",
        "Getting a Driver and Opening a Session was removed from Python in the latest version",
        "Getting a Driver and Opening a Session can only be used once in a program"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-python-napalm-m1-l4",
      "slug": "netauto-python-napalm-m1-l4",
      "title": "Getters: Facts, Interfaces, and Config",
      "concept": "NAPALM getters are methods that return structured data, and get_facts() returns a dictionary with hostname, model, vendor, and os_version, while get_interfaces() returns one entry per interface with its state and speed. The get_config() method returns the running, startup, and candidate configurations in one dictionary. Because every driver returns the same shapes, one script can collect facts from a mixed-vendor network without vendor-specific parsing.",
      "syntax": "facts = device.get_facts()\nprint(facts['hostname'], facts['model'])\ninterfaces = device.get_interfaces()\nconfig = device.get_config()",
      "exampleCode": "facts = device.get_facts()\nprint(facts['hostname'])\nprint(facts['model'])\nprint(facts['os_version'])\nprint(facts['vendor'])",
      "exampleLanguage": "python",
      "mistake": "Treating get_facts() output as free text and searching it with string methods, instead of reading the dictionary keys it documents.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Getters: Facts, Interfaces, and Config, but it does not work correctly.",
       "buggyCode": "facts = device.get_facts()\nprint('R1' in str(facts))",
       "fixedCode": "facts = device.get_facts()\nprint(facts['hostname'])",
       "explanation": "get_facts returns a dictionary with documented keys, so reading facts['hostname'] is exact; searching the string form is fragile and slow."
      },
      "exercise": {
       "title": "Check your understanding: Getters: Facts, Interfaces, and Config",
       "type": "multiple-choice",
       "instructions": "Which statement about Getters: Facts, Interfaces, and Config is correct?",
       "starterCode": "",
       "solution": "NAPALM getters are methods that return structured data, and get_facts() returns a dictionary with hostname, model, vendor, and os_version, while get_interfaces() returns one entry per interface with its state and speed.",
       "solutionExplanation": "NAPALM getters are methods that return structured data, and get_facts() returns a dictionary with hostname, model, vendor, and os_version, while get_interfaces() returns one entry per interface with its state and speed. The other options are false: Getters: Facts, Interfaces, and Config is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "NAPALM getters are methods that return structured data, and get_facts() returns a dictionary with hostname, model, vendor, and os_version, while get_interfaces() returns one entry per interface with its state and speed.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Getters: Facts, Interfaces, and Config from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Getters: Facts, Interfaces, and Config only works on Windows",
        "Getters: Facts, Interfaces, and Config was removed from Python in the latest version",
        "NAPALM getters are methods that return structured data, and get_facts() returns a dictionary with hostname, model, vendor, and os_version, while get_interfaces() returns one entry per interface with its state and speed.",
        "Getters: Facts, Interfaces, and Config can only be used once in a program",
        "Getters: Facts, Interfaces, and Config requires a separate paid licence to use"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-python-napalm-m1-l5",
      "slug": "netauto-python-napalm-m1-l5",
      "title": "Comparing Configurations",
      "concept": "NAPALM's compare_config method diffs the candidate configuration against the running configuration and returns the difference as text. Python's difflib module does the same job offline: unified_diff takes two lists of lines and yields the changed lines with + and - markers. Comparing configurations before applying them is how you preview a change, and this lesson practises the diff itself on local config text.",
      "syntax": "diff = device.compare_config()\nprint(diff)",
      "exampleCode": "import difflib\n\nrunning = ['hostname R1', 'interface GigabitEthernet0/0', ' description Old link', ' no shutdown']\ncandidate = ['hostname R1', 'interface GigabitEthernet0/0', ' description New link', ' no shutdown']\nfor line in difflib.unified_diff(running, candidate, lineterm=''):\n    print(line)",
      "exampleLanguage": "python",
      "mistake": "Comparing the configurations as one long string with ==, which only tells you they differ and never shows which lines changed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Comparing Configurations, but it does not work correctly.",
       "buggyCode": "if running_text == candidate_text:\n    print('same')\nelse:\n    print('different')",
       "fixedCode": "for line in difflib.unified_diff(running, candidate, lineterm=''):\n    print(line)",
       "explanation": "Equality only says the configs differ; a unified diff shows exactly which lines were added, removed, or changed."
      },
      "exercise": {
       "title": "Practise Comparing Configurations",
       "type": "write-code",
       "instructions": "Diff the running and candidate configurations with difflib.unified_diff (empty lineterm so lines are not doubled). Print every line of the diff, in order.",
       "starterCode": "import difflib\n\nrunning = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description Old link\", \" no shutdown\"]\ncandidate = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description New link\", \" no shutdown\"]\n# TODO: complete the program below.\n",
       "solution": "import difflib\n\nrunning = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description Old link\", \" no shutdown\"]\ncandidate = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description New link\", \" no shutdown\"]\nfor line in difflib.unified_diff(running, candidate, lineterm=\"\"):\n    print(line)\n",
       "solutionExplanation": "The solution builds the required data, applies the Comparing Configurations technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "--- \n+++ \n@@ -1,4 +1,4 @@\n hostname R1\n interface GigabitEthernet0/0\n- description Old link\n+ description New link\n  no shutdown",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "+ description New link",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Comparing Configurations is the key idea here: NAPALM's compare_config method diffs the candidate configuration against the running configuration and returns the difference as text.",
        "approach": "Work through Comparing Configurations step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-napalm-m2",
    "title": "NAPALM Unified APIs in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-python-napalm-m2-l1",
      "slug": "netauto-python-napalm-m2-l1",
      "title": "Loading Candidate Configs",
      "concept": "The load_merge_candidate method stages configuration changes to merge with the running config, while load_replace_candidate stages a full replacement of it. Both methods take either a filename or a config string, and neither changes the device until you call commit_config(). Staging first and committing second is what makes NAPALM changes reviewable: you can diff and discard before anything is applied.",
      "syntax": "device.load_merge_candidate(config='hostname R1\\n')\nprint(device.compare_config())\ndevice.commit_config()",
      "exampleCode": "device.load_merge_candidate(filename='new-config.txt')\nprint(device.compare_config())\ndevice.commit_config()",
      "exampleLanguage": "python",
      "mistake": "Calling commit_config() without loading a candidate first, which commits nothing and silently succeeds.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Loading Candidate Configs, but it does not work correctly.",
       "buggyCode": "device.commit_config()\nprint('done')",
       "fixedCode": "device.load_merge_candidate(config='hostname R1\\n')\nprint(device.compare_config())\ndevice.commit_config()",
       "explanation": "Commit applies whatever candidate was staged, and with no candidate staged there is nothing to apply; load the candidate before committing."
      },
      "exercise": {
       "title": "Practise Loading Candidate Configs",
       "type": "write-code",
       "instructions": "Stage a merge candidate locally and compare it with the running config, the way load_merge_candidate and compare_config work: count the candidate lines, count the lines added and the lines removed relative to the running config, and print the counts plus 'Commit: no' - nothing is committed until the diff has been reviewed. No device is involved; both configs are local strings, and staging changes nothing until commit.",
       "starterCode": "running = \"hostname R0\\ninterface GigabitEthernet0/0\\n description old\\n\"\ncandidate = \"hostname R1\\ninterface GigabitEthernet0/0\\n description uplink\\n\"\n# TODO: complete the program below.\n",
       "solution": "running = \"hostname R0\\ninterface GigabitEthernet0/0\\n description old\\n\"\ncandidate = \"hostname R1\\ninterface GigabitEthernet0/0\\n description uplink\\n\"\nrunning_lines = set(running.strip().splitlines())\ncandidate_lines = candidate.strip().splitlines()\nadded = [line for line in candidate_lines if line not in running_lines]\nremoved = [line for line in running_lines if line not in set(candidate_lines)]\nprint(f\"Candidate lines: {len(candidate_lines)}\")\nprint(f\"Added: {len(added)}\")\nprint(f\"Removed: {len(removed)}\")\nprint(\"Commit: no\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Loading Candidate Configs technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Candidate lines: 3\nAdded: 2\nRemoved: 2\nCommit: no",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Added: 2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Loading Candidate Configs is the key idea here: The load_merge_candidate method stages configuration changes to merge with the running config, while load_replace_candidate stages a full replacement of it.",
        "approach": "Work through Loading Candidate Configs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-napalm-m2-l2",
      "slug": "netauto-python-napalm-m2-l2",
      "title": "Committing and Discarding Changes",
      "concept": "The commit_config method applies the staged candidate configuration to the device, and discard_config throws the candidate away without applying it. The safe workflow is load, compare, then commit only when the diff looks right, and discard when it does not. A failed commit leaves the running configuration unchanged, which is why staging plus an explicit commit is safer than sending commands directly.",
      "syntax": "device.load_merge_candidate(config='hostname R1\\n')\nif device.compare_config():\n    device.commit_config()\nelse:\n    device.discard_config()",
      "exampleCode": "device.load_merge_candidate(config='hostname R1\\n')\ndiff = device.compare_config()\nif diff.strip():\n    device.commit_config()\nelse:\n    device.discard_config()",
      "exampleLanguage": "python",
      "mistake": "Discarding a good candidate by checking the diff the wrong way round, so a real change is thrown away and an empty change is committed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Committing and Discarding Changes, but it does not work correctly.",
       "buggyCode": "if not device.compare_config():\n    device.commit_config()",
       "fixedCode": "if device.compare_config().strip():\n    device.commit_config()\nelse:\n    device.discard_config()",
       "explanation": "An empty diff means nothing changed, so committing it is pointless; a non-empty diff is the change to commit."
      },
      "exercise": {
       "title": "Check your understanding: Committing and Discarding Changes",
       "type": "multiple-choice",
       "instructions": "Which statement about Committing and Discarding Changes is correct?",
       "starterCode": "",
       "solution": "The commit_config method applies the staged candidate configuration to the device, and discard_config throws the candidate away without applying it.",
       "solutionExplanation": "The commit_config method applies the staged candidate configuration to the device, and discard_config throws the candidate away without applying it. The other options are false: Committing and Discarding Changes is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The commit_config method applies the staged candidate configuration to the device, and discard_config throws the candidate away without applying it.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Committing and Discarding Changes from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Committing and Discarding Changes requires a separate paid licence to use",
        "Committing and Discarding Changes is not available in Python",
        "Committing and Discarding Changes only works on Windows",
        "The commit_config method applies the staged candidate configuration to the device, and discard_config throws the candidate away without applying it.",
        "Committing and Discarding Changes was removed from Python in the latest version"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-python-napalm-m2-l3",
      "slug": "netauto-python-napalm-m2-l3",
      "title": "Validating with Compliance Reports",
      "concept": "NAPALM's compliance_report method takes a validation file that states what the device should look like and returns a report saying which checks passed and which failed. The validation file lists getters such as get_facts with the expected values, and the report has a complies flag plus one entry per check. The same idea works offline: compare a facts dictionary against expected values and report pass or fail per rule, which is what this lesson practises.",
      "syntax": "report = device.compliance_report(validation_file='validate.yml')\nprint(report['complies'])",
      "exampleCode": "facts = {'hostname': 'R1', 'model': 'ISR4451', 'os_version': '17.6.1', 'vendor': 'Cisco'}\nexpected = {'hostname': 'R1', 'model': 'ISR4451', 'os_version': '17.9.2', 'vendor': 'Cisco'}\nfor key, wanted in expected.items():\n    actual = facts[key]\n    status = 'PASS' if actual == wanted else 'FAIL'\n    print(f\"{key}: {status} (expected {wanted}, got {actual})\")",
      "exampleLanguage": "python",
      "mistake": "Checking only the overall complies flag and never reading which rule failed, so a failing report gives no clue what to fix.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Validating with Compliance Reports, but it does not work correctly.",
       "buggyCode": "report = device.compliance_report(validation_file='validate.yml')\nprint(report['complies'])",
       "fixedCode": "report = device.compliance_report(validation_file='validate.yml')\nfor check, result in report.items():\n    if isinstance(result, dict):\n        print(check, result.get('complies'))",
       "explanation": "The top-level flag only says something failed; the per-check entries name the failing rule, which is what you need to fix the device."
      },
      "exercise": {
       "title": "Practise Validating with Compliance Reports",
       "type": "write-code",
       "instructions": "Validate the facts dictionary against the expected values: for each key in expected, print '<key>: PASS (expected <wanted>, got <actual>)' when they match and '<key>: FAIL (expected <wanted>, got <actual>)' when they do not.",
       "starterCode": "facts = {\"hostname\": \"R1\", \"model\": \"ISR4451\", \"os_version\": \"17.6.1\", \"vendor\": \"Cisco\"}\nexpected = {\"hostname\": \"R1\", \"model\": \"ISR4451\", \"os_version\": \"17.9.2\", \"vendor\": \"Cisco\"}\n# TODO: complete the program below.\n",
       "solution": "facts = {\"hostname\": \"R1\", \"model\": \"ISR4451\", \"os_version\": \"17.6.1\", \"vendor\": \"Cisco\"}\nexpected = {\"hostname\": \"R1\", \"model\": \"ISR4451\", \"os_version\": \"17.9.2\", \"vendor\": \"Cisco\"}\nfor key, wanted in expected.items():\n    actual = facts[key]\n    status = \"PASS\" if actual == wanted else \"FAIL\"\n    print(f\"{key}: {status} (expected {wanted}, got {actual})\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Validating with Compliance Reports technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname: PASS (expected R1, got R1)\nmodel: PASS (expected ISR4451, got ISR4451)\nos_version: FAIL (expected 17.9.2, got 17.6.1)\nvendor: PASS (expected Cisco, got Cisco)",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "os_version: FAIL",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating with Compliance Reports is the key idea here: NAPALM's compliance_report method takes a validation file that states what the device should look like and returns a report saying which checks passed and which failed.",
        "approach": "Work through Validating with Compliance Reports step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-napalm-m2-l4",
      "slug": "netauto-python-napalm-m2-l4",
      "title": "Handling Unsupported Getters",
      "concept": "Some NAPALM getters are optional, and a driver that does not implement one raises NotImplementedError when you call it. A support table that records which getters each driver provides lets your code check before calling, instead of crashing at runtime. Building that table from a dictionary and reporting the gaps is local work, and this lesson does exactly that.",
      "syntax": "try:\n    bgp = device.get_bgp_neighbors()\nexcept NotImplementedError:\n    print('BGP getter not supported')",
      "exampleCode": "SUPPORT = {\n    'ios': ['get_facts', 'get_interfaces', 'get_config', 'get_bgp_neighbors'],\n    'junos': ['get_facts', 'get_interfaces', 'get_config'],\n}\nwanted = ['get_facts', 'get_interfaces', 'get_bgp_neighbors']\nfor driver, getters in sorted(SUPPORT.items()):\n    missing = [g for g in wanted if g not in getters]\n    print(f\"{driver}: supported={len([g for g in wanted if g in getters])} missing={missing}\")",
      "exampleLanguage": "python",
      "mistake": "Catching NotImplementedError around the whole script instead of around the single optional call, which hides the exact getter that failed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handling Unsupported Getters, but it does not work correctly.",
       "buggyCode": "try:\n    run_all_getters(device)\nexcept NotImplementedError:\n    print('something unsupported')",
       "fixedCode": "try:\n    bgp = device.get_bgp_neighbors()\nexcept NotImplementedError:\n    print('BGP getter not supported by this driver')",
       "explanation": "A broad try hides which getter failed; wrapping only the optional call names the missing feature exactly."
      },
      "exercise": {
       "title": "Practise Handling Unsupported Getters",
       "type": "write-code",
       "instructions": "For each driver in the SUPPORT table (sorted by name), count how many of the wanted getters it provides and list the missing ones. Print '<driver>: supported=<n> missing=<list>' per driver.",
       "starterCode": "SUPPORT = {\n    \"ios\": [\"get_facts\", \"get_interfaces\", \"get_config\", \"get_bgp_neighbors\"],\n    \"junos\": [\"get_facts\", \"get_interfaces\", \"get_config\"],\n}\nwanted = [\"get_facts\", \"get_interfaces\", \"get_bgp_neighbors\"]\n# TODO: complete the program below.\n",
       "solution": "SUPPORT = {\n    \"ios\": [\"get_facts\", \"get_interfaces\", \"get_config\", \"get_bgp_neighbors\"],\n    \"junos\": [\"get_facts\", \"get_interfaces\", \"get_config\"],\n}\nwanted = [\"get_facts\", \"get_interfaces\", \"get_bgp_neighbors\"]\nfor driver, getters in sorted(SUPPORT.items()):\n    missing = [g for g in wanted if g not in getters]\n    print(f\"{driver}: supported={len([g for g in wanted if g in getters])} missing={missing}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Handling Unsupported Getters technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ios: supported=3 missing=[]\njunos: supported=2 missing=['get_bgp_neighbors']",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "missing=['get_bgp_neighbors']",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Handling Unsupported Getters is the key idea here: Some NAPALM getters are optional, and a driver that does not implement one raises NotImplementedError when you call it.",
        "approach": "Work through Handling Unsupported Getters step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-napalm-m2-l5",
      "slug": "netauto-python-napalm-m2-l5",
      "title": "A NAPALM Workflow End to End",
      "concept": "A complete NAPALM workflow opens a session, reads the facts, loads a candidate configuration, compares it, commits it when the diff is right, and validates the result with a compliance report. Every step uses the same API on every vendor, so the workflow script does not change when a Junos device joins an IOS network. Running it end to end needs lab devices, but the pieces, getters, diffing, and validation, are all covered in this track.",
      "syntax": "device.open()\nfacts = device.get_facts()\ndevice.load_merge_candidate(config=new_config)\ndevice.commit_config()\nprint(device.compliance_report(validation_file='validate.yml')['complies'])\ndevice.close()",
      "exampleCode": "from napalm import get_network_driver\n\ndriver = get_network_driver('ios')\ndevice = driver('192.0.2.10', 'admin', 'secret')\ndevice.open()\ndevice.load_merge_candidate(config='hostname R1\\n')\nif device.compare_config().strip():\n    device.commit_config()\ndevice.close()",
      "exampleLanguage": "python",
      "mistake": "Committing a candidate without comparing it first, so a bad merge is applied before anyone has seen the diff.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A NAPALM Workflow End to End, but it does not work correctly.",
       "buggyCode": "device.load_merge_candidate(config=new_config)\ndevice.commit_config()",
       "fixedCode": "device.load_merge_candidate(config=new_config)\nprint(device.compare_config())\ndevice.commit_config()",
       "explanation": "Committing blind applies whatever was staged; comparing first shows the exact change and lets you discard a bad candidate."
      },
      "exercise": {
       "title": "Practise A NAPALM Workflow End to End",
       "type": "write-code",
       "instructions": "Run a complete NAPALM workflow over local data: read the facts record, load the candidate config, compare it with the running config, and validate the result against the checks - the same steps as open, get_facts, load_merge_candidate, compare_config, and compliance_report. Print the facts line, the candidate line count, the diff line count, the checks passed, and whether the run complies. Committing and talking to a real device need a lab; this exercise runs every step on local data.",
       "starterCode": "facts = {\"hostname\": \"R1\", \"model\": \"ISR4331\", \"os_version\": \"17.6.1\"}\nrunning = \"hostname R1\\n\"\ncandidate = \"hostname R1\\n\"\nchecks = {\"hostname\": \"R1\", \"os_version\": \"17.6.1\"}\n# TODO: complete the program below.\n",
       "solution": "facts = {\"hostname\": \"R1\", \"model\": \"ISR4331\", \"os_version\": \"17.6.1\"}\nrunning = \"hostname R1\\n\"\ncandidate = \"hostname R1\\n\"\nchecks = {\"hostname\": \"R1\", \"os_version\": \"17.6.1\"}\ndiff_lines = [line for line in candidate.strip().splitlines() if line not in running.strip().splitlines()]\npassed = sum(1 for key, value in checks.items() if facts.get(key) == value)\nprint(f\"Facts: {facts['hostname']} ({facts['model']}, {facts['os_version']})\")\nprint(f\"Candidate lines: {len(candidate.strip().splitlines())}\")\nprint(f\"Diff lines: {len(diff_lines)}\")\nprint(f\"Checks passed: {passed}/{len(checks)}\")\nprint(f\"Complies: {'yes' if passed == len(checks) else 'no'}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A NAPALM Workflow End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Facts: R1 (ISR4331, 17.6.1)\nCandidate lines: 1\nDiff lines: 0\nChecks passed: 2/2\nComplies: yes",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Checks passed: 2/2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A NAPALM Workflow End to End is the key idea here: A complete NAPALM workflow opens a session, reads the facts, loads a candidate configuration, compares it, commits it when the diff is right, and validates the result with a compliance report.",
        "approach": "Work through A NAPALM Workflow End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise NAPALM Unified APIs Capstone",
   "type": "write-code",
   "instructions": "Run an offline NAPALM-style workflow on local data: print the driver table sorted by name ('<driver>: <vendor>'), then validate the facts dictionary against the expected values printing '<key>: PASS' or '<key>: FAIL' per key, then diff the running and candidate configurations with difflib.unified_diff (empty lineterm) and print every diff line. Facts: hostname R1, model ISR4451, os_version 17.6.1, vendor Cisco. Expected: same except os_version 17.9.2. Running config lines: 'hostname R1', 'interface GigabitEthernet0/0', ' description Old link', ' no shutdown'. Candidate: same except ' description New link'.",
   "starterCode": "import difflib\n\nDRIVERS = {\"ios\": \"Cisco IOS\", \"junos\": \"Juniper Junos\"}\nfacts = {\"hostname\": \"R1\", \"model\": \"ISR4451\", \"os_version\": \"17.6.1\", \"vendor\": \"Cisco\"}\nexpected = {\"hostname\": \"R1\", \"model\": \"ISR4451\", \"os_version\": \"17.9.2\", \"vendor\": \"Cisco\"}\nrunning = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description Old link\", \" no shutdown\"]\ncandidate = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description New link\", \" no shutdown\"]\n# TODO: complete the capstone program below.\n",
   "solution": "import difflib\n\nDRIVERS = {\"ios\": \"Cisco IOS\", \"junos\": \"Juniper Junos\"}\nfacts = {\"hostname\": \"R1\", \"model\": \"ISR4451\", \"os_version\": \"17.6.1\", \"vendor\": \"Cisco\"}\nexpected = {\"hostname\": \"R1\", \"model\": \"ISR4451\", \"os_version\": \"17.9.2\", \"vendor\": \"Cisco\"}\nrunning = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description Old link\", \" no shutdown\"]\ncandidate = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description New link\", \" no shutdown\"]\nfor name, vendor in sorted(DRIVERS.items()):\n    print(f\"{name}: {vendor}\")\nfor key, wanted in expected.items():\n    print(f\"{key}: {'PASS' if facts[key] == wanted else 'FAIL'}\")\nfor line in difflib.unified_diff(running, candidate, lineterm=\"\"):\n    print(line)\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "ios: Cisco IOS\njunos: Juniper Junos\nhostname: PASS\nmodel: PASS\nos_version: FAIL\nvendor: PASS\n--- \n+++ \n@@ -1,4 +1,4 @@\n hostname R1\n interface GigabitEthernet0/0\n- description Old link\n+ description New link\n  no shutdown",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "os_version: FAIL",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "NAPALM Unified APIs Capstone Project",
   "description": "A small end-to-end offline NAPALM workflow: list drivers, validate facts, and diff a candidate configuration.",
   "requirements": [
    "Use the core ideas of NAPALM Unified APIs in a working Python program.",
    "Print the driver table sorted by driver name.",
    "Validate every fact against the expected value with PASS/FAIL per key.",
    "Diff the running and candidate configurations and print the full diff.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and produces the driver table, validation, and diff correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-nornir",
  "slug": "netauto-python-nornir",
  "language": "python",
  "category": "devops",
  "title": "Nornir Inventory and Tasks",
  "description": "Run tasks across a whole inventory with Nornir: hosts, groups, defaults, task functions, filtering, and reading the aggregated result.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "Nornir",
   "Inventory",
   "Hosts and groups",
   "Tasks",
   "nr.run",
   "AggregatedResult",
   "Filtering",
   "YAML inventory"
  ],
  "prerequisites": [
   "netauto-python-netmiko"
  ],
  "analogy": "Learning {topic} is like learning to conduct an orchestra: you write one score, and every musician plays their part at the same time.",
  "modules": [
   {
    "id": "netauto-python-nornir-m1",
    "title": "Nornir Inventory and Tasks Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-nornir-m1-l1",
      "slug": "netauto-python-nornir-m1-l1",
      "title": "What Is Nornir?",
      "concept": "Nornir is a Python automation framework that runs tasks across an inventory of hosts, and it is built for network engineers who want plain Python instead of a domain-specific language. You describe your devices once in an inventory, write tasks as ordinary Python functions, and Nornir runs them, by default in parallel threads, and collects one result per host. Nornir itself does not connect to devices; plugins such as netmiko do the connecting, while Nornir handles inventory, filtering, and results.",
      "syntax": "from nornir import InitNornir\nnr = InitNornir(config_file='config.yaml')\nresult = nr.run(task=my_task)",
      "exampleCode": "hosts = {\n    'r1': {'hostname': '192.0.2.10', 'platform': 'cisco_ios', 'role': 'core'},\n    'r2': {'hostname': '192.0.2.11', 'platform': 'cisco_ios', 'role': 'edge'},\n    'sw1': {'hostname': '192.0.2.12', 'platform': 'cisco_nxos', 'role': 'access'},\n}\nprint(f\"Inventory has {len(hosts)} hosts\")\nfor name, data in sorted(hosts.items()):\n    print(f\"{name}: {data['hostname']} ({data['platform']}, {data['role']})\")",
      "exampleLanguage": "python",
      "mistake": "Treating Nornir like Ansible and writing YAML playbooks, when Nornir tasks are plain Python functions and the YAML only holds inventory and configuration.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is Nornir?, but it does not work correctly.",
       "buggyCode": "result = nr.run(task='show version')  # a string is not a task",
       "fixedCode": "def show_version(task):\n    return task.run(task=netmiko_send_command, command_string='show version')\nresult = nr.run(task=show_version)",
       "explanation": "Nornir runs task functions, not command strings; the task is a Python function that receives a task object and returns a result."
      },
      "exercise": {
       "title": "Practise What Is Nornir?",
       "type": "write-code",
       "instructions": "Build the three-host Nornir inventory as a dictionary. Print 'Inventory has <n> hosts' first, then one line per host in sorted name order: '<name>: <hostname> (<platform>, <role>)'.",
       "starterCode": "hosts = {\n    \"r1\": {\"hostname\": \"192.0.2.10\", \"platform\": \"cisco_ios\", \"role\": \"core\"},\n    \"r2\": {\"hostname\": \"192.0.2.11\", \"platform\": \"cisco_ios\", \"role\": \"edge\"},\n    \"sw1\": {\"hostname\": \"192.0.2.12\", \"platform\": \"cisco_nxos\", \"role\": \"access\"},\n}\n# TODO: complete the program below.\n",
       "solution": "hosts = {\n    \"r1\": {\"hostname\": \"192.0.2.10\", \"platform\": \"cisco_ios\", \"role\": \"core\"},\n    \"r2\": {\"hostname\": \"192.0.2.11\", \"platform\": \"cisco_ios\", \"role\": \"edge\"},\n    \"sw1\": {\"hostname\": \"192.0.2.12\", \"platform\": \"cisco_nxos\", \"role\": \"access\"},\n}\nprint(f\"Inventory has {len(hosts)} hosts\")\nfor name, data in sorted(hosts.items()):\n    print(f\"{name}: {data['hostname']} ({data['platform']}, {data['role']})\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What Is Nornir? technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Inventory has 3 hosts\nr1: 192.0.2.10 (cisco_ios, core)\nr2: 192.0.2.11 (cisco_ios, edge)\nsw1: 192.0.2.12 (cisco_nxos, access)",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "sw1: 192.0.2.12",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Is Nornir? is the key idea here: Nornir is a Python automation framework that runs tasks across an inventory of hosts, and it is built for network engineers who want plain Python instead of a domain-specific language.",
        "approach": "Work through What Is Nornir? step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-m1-l2",
      "slug": "netauto-python-nornir-m1-l2",
      "title": "Installing Nornir",
      "concept": "Nornir is installed from PyPI with pip install nornir, and you confirm the install by importing nornir and printing nornir.__version__. The core package is deliberately small, and the pieces you need, such as the Netmiko plugin, come as separate packages like nornir-netmiko. Installing only the core first and adding plugins as you need them keeps the environment lean and the versions explicit.",
      "syntax": "pip install nornir nornir-netmiko\npython3 -c \"import nornir; print(nornir.__version__)\"",
      "exampleCode": "$ pip install nornir nornir-netmiko\n$ python3 -c \"import nornir; print(nornir.__version__)\"\n3.4.0",
      "exampleLanguage": "python",
      "mistake": "Installing nornir but not nornir-netmiko, then failing at runtime when the task tries to import the Netmiko plugin.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Installing Nornir, but it does not work correctly.",
       "buggyCode": "$ pip install nornir\n$ python3 run.py  # imports nornir_netmiko\nModuleNotFoundError: No module named 'nornir_netmiko'",
       "fixedCode": "$ pip install nornir nornir-netmiko\n$ python3 -c \"import nornir_netmiko\"",
       "explanation": "The Netmiko plugin is a separate package, not part of core Nornir; importing it without installing it fails at runtime."
      },
      "exercise": {
       "title": "Practise Installing Nornir",
       "type": "write-code",
       "instructions": "Build the install-check record for Nornir: the package name, the pip install command (core plus the Netmiko plugin), the import used to verify it, and the plugin package name. Validate that the install command names the package and the plugin, then print the four-line summary exactly as shown. This is the local record of the install steps from the lesson - installing on a real machine and running tasks against devices both need a lab.",
       "starterCode": "package = \"nornir\"\ninstall_cmd = \"pip install nornir nornir-netmiko\"\nverify_cmd = \"import nornir\"\nplugin = \"nornir-netmiko\"\n# TODO: complete the program below.\n",
       "solution": "package = \"nornir\"\ninstall_cmd = \"pip install nornir nornir-netmiko\"\nverify_cmd = \"import nornir\"\nplugin = \"nornir-netmiko\"\nassert install_cmd == f\"pip install {package} {plugin}\"\nassert verify_cmd == f\"import {package}\"\nprint(f\"Package: {package}\")\nprint(f\"Install: {install_cmd}\")\nprint(f\"Verify: {verify_cmd}\")\nprint(f\"Plugin: {plugin}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Installing Nornir technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Package: nornir\nInstall: pip install nornir nornir-netmiko\nVerify: import nornir\nPlugin: nornir-netmiko",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "pip install nornir nornir-netmiko",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Installing Nornir is the key idea here: Nornir is installed from PyPI with pip install nornir, and you confirm the install by importing nornir and printing nornir.__version__.",
        "approach": "Work through Installing Nornir step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-m1-l3",
      "slug": "netauto-python-nornir-m1-l3",
      "title": "The Inventory: Hosts, Groups, Defaults",
      "concept": "A Nornir inventory has three layers: hosts hold per-device data, groups hold data shared by several hosts, and defaults hold data shared by everything. When Nornir resolves a host, group data fills in keys the host does not define, and defaults fill in the rest, so shared values are written once. Merging dictionaries in the right order, defaults, then groups, then host, reproduces that resolution exactly, and this lesson practises it locally.",
      "syntax": "nr = InitNornir(config_file='config.yaml')\nhost = nr.inventory.hosts['r1']\nprint(host['username'], host['platform'])",
      "exampleCode": "defaults = {'username': 'admin', 'password': 'secret', 'port': 22}\ngroups = {'core': {'platform': 'cisco_ios', 'site': 'dc1'}}\nhosts = {'r1': {'hostname': '192.0.2.10', 'groups': ['core']}}\nresolved = {}\nfor name, host in hosts.items():\n    merged = dict(defaults)\n    for group in host['groups']:\n        merged.update(groups[group])\n    merged.update({k: v for k, v in host.items() if k != 'groups'})\n    resolved[name] = merged\nfor name, data in sorted(resolved.items()):\n    print(f\"{name}: {data['hostname']} {data['platform']} {data['username']} {data['site']}\")",
      "exampleLanguage": "python",
      "mistake": "Copying the same username and password into every host entry instead of putting shared values in groups or defaults.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The Inventory: Hosts, Groups, Defaults, but it does not work correctly.",
       "buggyCode": "hosts = {'r1': {'username': 'admin', 'password': 'secret'}, 'r2': {'username': 'admin', 'password': 'secret'}}",
       "fixedCode": "defaults = {'username': 'admin', 'password': 'secret'}\nhosts = {'r1': {}, 'r2': {}}",
       "explanation": "Shared values belong in defaults so they are written once; duplicating them in every host means a password change touches every entry."
      },
      "exercise": {
       "title": "Practise The Inventory: Hosts, Groups, Defaults",
       "type": "write-code",
       "instructions": "Resolve host r1 by merging dictionaries in Nornir's order: defaults first, then each group, then the host's own keys (except 'groups'). Print '<name>: <hostname> <platform> <username> <site>'.",
       "starterCode": "defaults = {\"username\": \"admin\", \"password\": \"secret\", \"port\": 22}\ngroups = {\"core\": {\"platform\": \"cisco_ios\", \"site\": \"dc1\"}}\nhosts = {\"r1\": {\"hostname\": \"192.0.2.10\", \"groups\": [\"core\"]}}\n# TODO: complete the program below.\n",
       "solution": "defaults = {\"username\": \"admin\", \"password\": \"secret\", \"port\": 22}\ngroups = {\"core\": {\"platform\": \"cisco_ios\", \"site\": \"dc1\"}}\nhosts = {\"r1\": {\"hostname\": \"192.0.2.10\", \"groups\": [\"core\"]}}\nresolved = {}\nfor name, host in hosts.items():\n    merged = dict(defaults)\n    for group in host[\"groups\"]:\n        merged.update(groups[group])\n    merged.update({k: v for k, v in host.items() if k != \"groups\"})\n    resolved[name] = merged\nfor name, data in sorted(resolved.items()):\n    print(f\"{name}: {data['hostname']} {data['platform']} {data['username']} {data['site']}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the The Inventory: Hosts, Groups, Defaults technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: 192.0.2.10 cisco_ios admin dc1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "cisco_ios admin dc1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The Inventory: Hosts, Groups, Defaults is the key idea here: A Nornir inventory has three layers: hosts hold per-device data, groups hold data shared by several hosts, and defaults hold data shared by everything.",
        "approach": "Work through The Inventory: Hosts, Groups, Defaults step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-m1-l4",
      "slug": "netauto-python-nornir-m1-l4",
      "title": "Writing Your First Task",
      "concept": "A Nornir task is a Python function that takes one argument, the task object, and returns a Result, and it usually delegates the real work to a subtask with task.run. Inside the task you reach the current host through task.host, which gives you its inventory data such as hostname and platform. Tasks run against a lab device in real use, but the function shape is plain Python you can read and write without any device.",
      "syntax": "from nornir.core.task import Result, Task\n\ndef hello(task: Task):\n    return Result(host=task.host, result=f\"hello from {task.host.name}\")",
      "exampleCode": "from nornir.core.task import Result, Task\n\ndef hello(task: Task):\n    return Result(host=task.host, result=f\"hello from {task.host.name}\")\n\nresult = nr.run(task=hello)\nprint(result['r1'].result)",
      "exampleLanguage": "python",
      "mistake": "Writing a task that returns a plain string instead of a Result, so Nornir cannot record whether it succeeded or failed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Writing Your First Task, but it does not work correctly.",
       "buggyCode": "def hello(task):\n    return 'hello'",
       "fixedCode": "from nornir.core.task import Result\n\ndef hello(task):\n    return Result(host=task.host, result='hello')",
       "explanation": "Nornir tracks success and failure through Result objects; a plain string carries no host or status, so the framework cannot record the outcome."
      },
      "exercise": {
       "title": "Check your understanding: Writing Your First Task",
       "type": "multiple-choice",
       "instructions": "Which statement about Writing Your First Task is correct?",
       "starterCode": "",
       "solution": "A Nornir task is a Python function that takes one argument, the task object, and returns a Result, and it usually delegates the real work to a subtask with task.",
       "solutionExplanation": "A Nornir task is a Python function that takes one argument, the task object, and returns a Result, and it usually delegates the real work to a subtask with task. The other options are false: Writing Your First Task is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A Nornir task is a Python function that takes one argument, the task object, and returns a Result, and it usually delegates the real work to a subtask with task.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Writing Your First Task from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Writing Your First Task only works on Windows",
        "Writing Your First Task was removed from Python in the latest version",
        "A Nornir task is a Python function that takes one argument, the task object, and returns a Result, and it usually delegates the real work to a subtask with task.",
        "Writing Your First Task can only be used once in a program",
        "Writing Your First Task requires a separate paid licence to use"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-python-nornir-m1-l5",
      "slug": "netauto-python-nornir-m1-l5",
      "title": "Running Tasks with nr.run",
      "concept": "The nr.run method runs a task against every host in the inventory and returns an AggregatedResult with one entry per host. By default the hosts run in parallel threads, and nr.run waits until all of them finish before returning. Summarising an aggregated result, one line per host with its status, is local work on ordinary dictionaries, and this lesson practises it.",
      "syntax": "result = nr.run(task=hello)\nprint(result['r1'].result)",
      "exampleCode": "results = {\n    'r1': {'failed': False, 'result': 'hello from r1'},\n    'r2': {'failed': True, 'result': 'connection timed out'},\n    'sw1': {'failed': False, 'result': 'hello from sw1'},\n}\nfor name, entry in sorted(results.items()):\n    status = 'FAILED' if entry['failed'] else 'OK'\n    print(f\"{name}: {status} - {entry['result']}\")\nfailed = [name for name, entry in results.items() if entry['failed']]\nprint(f\"failed hosts: {', '.join(failed) if failed else 'none'}\")",
      "exampleLanguage": "python",
      "mistake": "Assuming nr.run returns after the first host finishes, when it actually waits for every host before returning.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Running Tasks with nr.run, but it does not work correctly.",
       "buggyCode": "result = nr.run(task=hello)\nprint(result['r1'].result)  # assumed r1 finished first",
       "fixedCode": "result = nr.run(task=hello)\nfor host, res in result.items():\n    print(host, res.result)",
       "explanation": "nr.run blocks until all hosts finish, so reading one entry early is unnecessary; iterate the whole AggregatedResult once it returns."
      },
      "exercise": {
       "title": "Practise Running Tasks with nr.run",
       "type": "write-code",
       "instructions": "Summarise the aggregated result: print one line per host in sorted order, '<name>: OK - <result>' or '<name>: FAILED - <result>', then a final line 'failed hosts: <names>' or 'failed hosts: none'.",
       "starterCode": "results = {\n    \"r1\": {\"failed\": False, \"result\": \"hello from r1\"},\n    \"r2\": {\"failed\": True, \"result\": \"connection timed out\"},\n    \"sw1\": {\"failed\": False, \"result\": \"hello from sw1\"},\n}\n# TODO: complete the program below.\n",
       "solution": "results = {\n    \"r1\": {\"failed\": False, \"result\": \"hello from r1\"},\n    \"r2\": {\"failed\": True, \"result\": \"connection timed out\"},\n    \"sw1\": {\"failed\": False, \"result\": \"hello from sw1\"},\n}\nfor name, entry in sorted(results.items()):\n    status = \"FAILED\" if entry[\"failed\"] else \"OK\"\n    print(f\"{name}: {status} - {entry['result']}\")\nfailed = [name for name, entry in results.items() if entry[\"failed\"]]\nprint(f\"failed hosts: {', '.join(failed) if failed else 'none'}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Running Tasks with nr.run technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: OK - hello from r1\nr2: FAILED - connection timed out\nsw1: OK - hello from sw1\nfailed hosts: r2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "failed hosts: r2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Running Tasks with nr.run is the key idea here: The nr.",
        "approach": "Work through Running Tasks with nr.run step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-nornir-m2",
    "title": "Nornir Inventory and Tasks in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-python-nornir-m2-l1",
      "slug": "netauto-python-nornir-m2-l1",
      "title": "Understanding Results and AggregatedResult",
      "concept": "Every Nornir task returns an AggregatedResult, which maps each host name to its own Result, and each Result carries the host, the returned value, and a failed flag. You check overall success with the failed attribute of the AggregatedResult, and you read a single host's value with result['r1'].result. A task that raises an exception marks its host failed instead of crashing the whole run, so the other hosts still finish.",
      "syntax": "result = nr.run(task=hello)\nprint('any failed:', result.failed)\nprint(result['r1'].result)",
      "exampleCode": "result = nr.run(task=hello)\nif result.failed:\n    print('some hosts failed')\nfor host, res in result.items():\n    print(host, 'failed' if res.failed else 'ok')",
      "exampleLanguage": "python",
      "mistake": "Reading result.result on the AggregatedResult, which has no single result because it holds one per host.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Understanding Results and AggregatedResult, but it does not work correctly.",
       "buggyCode": "result = nr.run(task=hello)\nprint(result.result)",
       "fixedCode": "result = nr.run(task=hello)\nprint(result['r1'].result)",
       "explanation": "The AggregatedResult holds one Result per host, so there is no single .result; index by host name first, then read that host's result."
      },
      "exercise": {
       "title": "Practise Understanding Results and AggregatedResult",
       "type": "write-code",
       "instructions": "You have a local AggregatedResult-style mapping: each host name maps to its own Result with a value and a failed flag. Print one '<host>: ok|failed' line per host in sorted order, then 'Any failed: True/False' for the whole run. Read the per-host result and the overall failed flag - never a single result on the AggregatedResult itself, because it holds one result per host.",
       "starterCode": "results = {\n    \"r1\": {\"result\": \"ok\", \"failed\": False},\n    \"r2\": {\"result\": \"ok\", \"failed\": False},\n    \"r3\": {\"result\": \"timeout\", \"failed\": True},\n}\n# TODO: complete the program below.\n",
       "solution": "results = {\n    \"r1\": {\"result\": \"ok\", \"failed\": False},\n    \"r2\": {\"result\": \"ok\", \"failed\": False},\n    \"r3\": {\"result\": \"timeout\", \"failed\": True},\n}\nfor host in sorted(results):\n    print(f\"{host}: {'failed' if results[host]['failed'] else 'ok'}\")\nprint(f\"Any failed: {any(res['failed'] for res in results.values())}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Understanding Results and AggregatedResult technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: ok\nr2: ok\nr3: failed\nAny failed: True",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "r3: failed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Understanding Results and AggregatedResult is the key idea here: Every Nornir task returns an AggregatedResult, which maps each host name to its own Result, and each Result carries the host, the returned value, and a failed flag.",
        "approach": "Work through Understanding Results and AggregatedResult step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-m2-l2",
      "slug": "netauto-python-nornir-m2-l2",
      "title": "Filtering Hosts",
      "concept": "Nornir filters the inventory before a run, so a task only executes on the hosts that match, and the filter method returns a new Nornir object with the smaller inventory. Common filters match on platform, role, or site, and you can combine them with the F object for AND and OR logic. Filtering a list of host dictionaries with a predicate is the same logic in plain Python, and this lesson practises it.",
      "syntax": "core = nr.filter(platform='cisco_ios')\nresult = core.run(task=hello)",
      "exampleCode": "hosts = [\n    {'name': 'r1', 'platform': 'cisco_ios', 'role': 'core'},\n    {'name': 'r2', 'platform': 'cisco_ios', 'role': 'edge'},\n    {'name': 'sw1', 'platform': 'cisco_nxos', 'role': 'access'},\n    {'name': 'sw2', 'platform': 'cisco_nxos', 'role': 'access'},\n]\nchosen = [h['name'] for h in hosts if h['platform'] == 'cisco_ios']\nprint('ios hosts:', ', '.join(chosen))\nchosen = [h['name'] for h in hosts if h['role'] == 'access']\nprint('access hosts:', ', '.join(chosen))",
      "exampleLanguage": "python",
      "mistake": "Filtering after nr.run instead of before it, so the task runs on every host and the filter only hides results afterwards.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Filtering Hosts, but it does not work correctly.",
       "buggyCode": "result = nr.run(task=hello)\nresult = result.filter(platform='cisco_ios')",
       "fixedCode": "core = nr.filter(platform='cisco_ios')\nresult = core.run(task=hello)",
       "explanation": "Filtering must happen before the run, or the task already executed everywhere; filter the inventory first, then run."
      },
      "exercise": {
       "title": "Practise Filtering Hosts",
       "type": "write-code",
       "instructions": "Filter the host list twice: first the hosts whose platform is cisco_ios, then the hosts whose role is access. Print 'ios hosts: <names>' and 'access hosts: <names>', names joined with ', '.",
       "starterCode": "hosts = [\n    {\"name\": \"r1\", \"platform\": \"cisco_ios\", \"role\": \"core\"},\n    {\"name\": \"r2\", \"platform\": \"cisco_ios\", \"role\": \"edge\"},\n    {\"name\": \"sw1\", \"platform\": \"cisco_nxos\", \"role\": \"access\"},\n    {\"name\": \"sw2\", \"platform\": \"cisco_nxos\", \"role\": \"access\"},\n]\n# TODO: complete the program below.\n",
       "solution": "hosts = [\n    {\"name\": \"r1\", \"platform\": \"cisco_ios\", \"role\": \"core\"},\n    {\"name\": \"r2\", \"platform\": \"cisco_ios\", \"role\": \"edge\"},\n    {\"name\": \"sw1\", \"platform\": \"cisco_nxos\", \"role\": \"access\"},\n    {\"name\": \"sw2\", \"platform\": \"cisco_nxos\", \"role\": \"access\"},\n]\nchosen = [h[\"name\"] for h in hosts if h[\"platform\"] == \"cisco_ios\"]\nprint(\"ios hosts:\", \", \".join(chosen))\nchosen = [h[\"name\"] for h in hosts if h[\"role\"] == \"access\"]\nprint(\"access hosts:\", \", \".join(chosen))\n",
       "solutionExplanation": "The solution builds the required data, applies the Filtering Hosts technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "ios hosts: r1, r2\naccess hosts: sw1, sw2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "access hosts: sw1, sw2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Filtering Hosts is the key idea here: Nornir filters the inventory before a run, so a task only executes on the hosts that match, and the filter method returns a new Nornir object with the smaller inventory.",
        "approach": "Work through Filtering Hosts step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-m2-l3",
      "slug": "netauto-python-nornir-m2-l3",
      "title": "Groups and Inheritance",
      "concept": "Groups in Nornir can contain other groups, so a host inherits data from its group and from that group's parent groups, with the most specific value winning. A host in group core, which is itself in group dc1, picks up the site from dc1 and the platform from core, and its own keys override both. Resolving that chain is dictionary merging in parent-to-child order, which is what this lesson practises.",
      "syntax": "groups = {'dc1': {'site': 'dc1'}, 'core': {'platform': 'cisco_ios'}}\n# r1 is in core, core is in dc1",
      "exampleCode": "defaults = {'username': 'admin', 'port': 22}\ngroups = {'dc1': {'site': 'dc1', 'domain': 'example.net'}, 'core': {'platform': 'cisco_ios', 'site': 'dc1-core'}}\nhost = {'hostname': '192.0.2.10', 'groups': ['dc1', 'core']}\nmerged = dict(defaults)\nfor group in host['groups']:\n    merged.update(groups[group])\nmerged.update({k: v for k, v in host.items() if k != 'groups'})\nfor key in ['hostname', 'platform', 'site', 'domain', 'username']:\n    print(f\"{key}={merged[key]}\")",
      "exampleLanguage": "python",
      "mistake": "Expecting a host's own value to lose to a group value, when the order is the opposite: host data always overrides group data.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Groups and Inheritance, but it does not work correctly.",
       "buggyCode": "merged = dict(host)\nmerged.update(groups['core'])  # group wins",
       "fixedCode": "merged = dict(defaults)\nmerged.update(groups['core'])\nmerged.update(host)  # host wins",
       "explanation": "Merging must go from least specific to most specific, so the host's own keys are applied last and override the group values."
      },
      "exercise": {
       "title": "Practise Groups and Inheritance",
       "type": "write-code",
       "instructions": "Resolve host r1 through its group chain: merge defaults, then the groups in order (dc1, then core), then the host's own keys. Print one 'key=value' line per key in this order: hostname, platform, site, domain, username. Note that core's site wins over dc1's.",
       "starterCode": "defaults = {\"username\": \"admin\", \"port\": 22}\ngroups = {\"dc1\": {\"site\": \"dc1\", \"domain\": \"example.net\"}, \"core\": {\"platform\": \"cisco_ios\", \"site\": \"dc1-core\"}}\nhost = {\"hostname\": \"192.0.2.10\", \"groups\": [\"dc1\", \"core\"]}\n# TODO: complete the program below.\n",
       "solution": "defaults = {\"username\": \"admin\", \"port\": 22}\ngroups = {\"dc1\": {\"site\": \"dc1\", \"domain\": \"example.net\"}, \"core\": {\"platform\": \"cisco_ios\", \"site\": \"dc1-core\"}}\nhost = {\"hostname\": \"192.0.2.10\", \"groups\": [\"dc1\", \"core\"]}\nmerged = dict(defaults)\nfor group in host[\"groups\"]:\n    merged.update(groups[group])\nmerged.update({k: v for k, v in host.items() if k != \"groups\"})\nfor key in [\"hostname\", \"platform\", \"site\", \"domain\", \"username\"]:\n    print(f\"{key}={merged[key]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Groups and Inheritance technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname=192.0.2.10\nplatform=cisco_ios\nsite=dc1-core\ndomain=example.net\nusername=admin",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "site=dc1-core",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Groups and Inheritance is the key idea here: Groups in Nornir can contain other groups, so a host inherits data from its group and from that group's parent groups, with the most specific value winning.",
        "approach": "Work through Groups and Inheritance step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-m2-l4",
      "slug": "netauto-python-nornir-m2-l4",
      "title": "Storing Inventory in YAML Files",
      "concept": "Nornir's SimpleInventory plugin reads hosts, groups, and defaults from three YAML files, so the inventory lives in version-controlled text instead of Python code. Each host file entry gives a hostname and can list groups, and group entries give the shared data for their members. Loading that YAML with yaml.safe_load and printing the hosts is exactly how the plugin starts, and this lesson practises it.",
      "syntax": "inventory:\n  plugin: SimpleInventory\n  options:\n    host_file: 'hosts.yaml'\n    group_file: 'groups.yaml'\n    defaults_file: 'defaults.yaml'",
      "exampleCode": "import yaml\n\nHOSTS_YAML = '''\nr1:\n  hostname: 192.0.2.10\n  platform: cisco_ios\n  groups: [core]\nr2:\n  hostname: 192.0.2.11\n  platform: cisco_ios\n  groups: [edge]\n'''\nhosts = yaml.safe_load(HOSTS_YAML)\nfor name, data in sorted(hosts.items()):\n    print(f\"{name}: {data['hostname']} {data['platform']} groups={','.join(data['groups'])}\")",
      "exampleLanguage": "python",
      "mistake": "Writing the inventory in YAML but using tabs for indentation, which YAML forbids and the parser rejects.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Storing Inventory in YAML Files, but it does not work correctly.",
       "buggyCode": "r1:\n\thostname: 192.0.2.10",
       "fixedCode": "r1:\n  hostname: 192.0.2.10",
       "explanation": "YAML indentation must use spaces, never tabs; a tab-indented file fails to parse."
      },
      "exercise": {
       "title": "Practise Storing Inventory in YAML Files",
       "type": "write-code",
       "instructions": "Load the hosts YAML with yaml.safe_load and print one line per host in sorted name order: '<name>: <hostname> <platform> groups=<comma-joined groups>'.",
       "starterCode": "import yaml\n\nHOSTS_YAML = \"\"\"\nr1:\n  hostname: 192.0.2.10\n  platform: cisco_ios\n  groups: [core]\nr2:\n  hostname: 192.0.2.11\n  platform: cisco_ios\n  groups: [edge]\n\"\"\"\n# TODO: complete the program below.\n",
       "solution": "import yaml\n\nHOSTS_YAML = \"\"\"\nr1:\n  hostname: 192.0.2.10\n  platform: cisco_ios\n  groups: [core]\nr2:\n  hostname: 192.0.2.11\n  platform: cisco_ios\n  groups: [edge]\n\"\"\"\nhosts = yaml.safe_load(HOSTS_YAML)\nfor name, data in sorted(hosts.items()):\n    print(f\"{name}: {data['hostname']} {data['platform']} groups={ ','.join(data['groups'])}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Storing Inventory in YAML Files technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: 192.0.2.10 cisco_ios groups=core\nr2: 192.0.2.11 cisco_ios groups=edge",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "groups=core",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Storing Inventory in YAML Files is the key idea here: Nornir's SimpleInventory plugin reads hosts, groups, and defaults from three YAML files, so the inventory lives in version-controlled text instead of Python code.",
        "approach": "Work through Storing Inventory in YAML Files step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-m2-l5",
      "slug": "netauto-python-nornir-m2-l5",
      "title": "A Nornir Run End to End",
      "concept": "A complete Nornir run loads the inventory from YAML, filters to the hosts you want, runs a task that delegates to a plugin such as Netmiko, and prints a summary of the AggregatedResult. The run object is reusable: you can filter it differently and run another task without reloading the inventory. Running it end to end needs lab devices, but every piece, inventory, filtering, tasks, and results, is covered in this track.",
      "syntax": "nr = InitNornir(config_file='config.yaml')\nresult = nr.filter(platform='cisco_ios').run(task=backup)\nprint(result.failed)",
      "exampleCode": "nr = InitNornir(config_file='config.yaml')\nresult = nr.filter(role='core').run(task=backup_config)\nfor host, res in result.items():\n    print(host, 'ok' if not res.failed else 'failed')",
      "exampleLanguage": "python",
      "mistake": "Reloading the inventory from disk before every task, instead of filtering and reusing the one Nornir object.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Nornir Run End to End, but it does not work correctly.",
       "buggyCode": "nr1 = InitNornir(config_file='config.yaml')\nnr1.run(task=task_a)\nnr2 = InitNornir(config_file='config.yaml')\nnr2.run(task=task_b)",
       "fixedCode": "nr = InitNornir(config_file='config.yaml')\nnr.run(task=task_a)\nnr.run(task=task_b)",
       "explanation": "One InitNornir load is enough for the whole script; reloading before each task wastes time and can drift if the files change mid-run."
      },
      "exercise": {
       "title": "Practise A Nornir Run End to End",
       "type": "write-code",
       "instructions": "Run a complete Nornir run over local data: load the inventory from the YAML string, filter it to the cisco_ios hosts, and build the task plan for the filtered hosts. Print the host count, the filtered count, one '<host>: <hostname>' line per filtered host in sorted order, and the task count. Loading inventory and filtering are real here; running the task against devices needs a lab.",
       "starterCode": "import yaml\n\ninventory_yaml = \"\"\"\nhosts:\n  r1:\n    hostname: 192.0.2.10\n    platform: cisco_ios\n    role: core\n  r2:\n    hostname: 192.0.2.11\n    platform: cisco_nxos\n    role: access\n  r3:\n    hostname: 192.0.2.12\n    platform: cisco_ios\n    role: core\n\"\"\"\n# TODO: complete the program below.\n",
       "solution": "import yaml\n\ninventory_yaml = \"\"\"\nhosts:\n  r1:\n    hostname: 192.0.2.10\n    platform: cisco_ios\n    role: core\n  r2:\n    hostname: 192.0.2.11\n    platform: cisco_nxos\n    role: access\n  r3:\n    hostname: 192.0.2.12\n    platform: cisco_ios\n    role: core\n\"\"\"\ninventory = yaml.safe_load(inventory_yaml)\nhosts = inventory[\"hosts\"]\nfiltered = {name: host for name, host in hosts.items() if host[\"platform\"] == \"cisco_ios\"}\nprint(f\"Hosts: {len(hosts)}\")\nprint(f\"Filtered: {len(filtered)}\")\nfor name in sorted(filtered):\n    print(f\"{name}: {filtered[name]['hostname']}\")\nprint(f\"Tasks: {len(filtered)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A Nornir Run End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Hosts: 3\nFiltered: 2\nr1: 192.0.2.10\nr3: 192.0.2.12\nTasks: 2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "r3: 192.0.2.12",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Nornir Run End to End is the key idea here: A complete Nornir run loads the inventory from YAML, filters to the hosts you want, runs a task that delegates to a plugin such as Netmiko, and prints a summary of the AggregatedResult.",
        "approach": "Work through A Nornir Run End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise Nornir Inventory and Tasks Capstone",
   "type": "write-code",
   "instructions": "Load the hosts YAML below with yaml.safe_load, merge each host with the group defaults (group core gives platform cisco_ios and site dc1; group edge gives platform cisco_ios and site dc2), then print one line per host in sorted name order: '<name>: <hostname> <platform> <site>'. Finally, summarise a results dictionary (r1 OK 'backed up', r2 FAILED 'connection timed out') by printing one line per host '<name>: OK - <result>' or '<name>: FAILED - <result>' and a final line 'failed hosts: r2'. Hosts: r1 192.0.2.10 groups [core], r2 192.0.2.11 groups [edge].",
   "starterCode": "import yaml\n\nHOSTS_YAML = \"\"\"\nr1:\n  hostname: 192.0.2.10\n  groups: [core]\nr2:\n  hostname: 192.0.2.11\n  groups: [edge]\n\"\"\"\nGROUPS = {\"core\": {\"platform\": \"cisco_ios\", \"site\": \"dc1\"}, \"edge\": {\"platform\": \"cisco_ios\", \"site\": \"dc2\"}}\nRESULTS = {\"r1\": {\"failed\": False, \"result\": \"backed up\"}, \"r2\": {\"failed\": True, \"result\": \"connection timed out\"}}\n# TODO: complete the capstone program below.\n",
   "solution": "import yaml\n\nHOSTS_YAML = \"\"\"\nr1:\n  hostname: 192.0.2.10\n  groups: [core]\nr2:\n  hostname: 192.0.2.11\n  groups: [edge]\n\"\"\"\nGROUPS = {\"core\": {\"platform\": \"cisco_ios\", \"site\": \"dc1\"}, \"edge\": {\"platform\": \"cisco_ios\", \"site\": \"dc2\"}}\nRESULTS = {\"r1\": {\"failed\": False, \"result\": \"backed up\"}, \"r2\": {\"failed\": True, \"result\": \"connection timed out\"}}\nhosts = yaml.safe_load(HOSTS_YAML)\nfor name, data in sorted(hosts.items()):\n    merged = {}\n    for group in data[\"groups\"]:\n        merged.update(GROUPS[group])\n    merged.update(data)\n    print(f\"{name}: {merged['hostname']} {merged['platform']} {merged['site']}\")\nfor name, entry in sorted(RESULTS.items()):\n    status = \"FAILED\" if entry[\"failed\"] else \"OK\"\n    print(f\"{name}: {status} - {entry['result']}\")\nfailed = [name for name, entry in RESULTS.items() if entry[\"failed\"]]\nprint(f\"failed hosts: {', '.join(failed) if failed else 'none'}\")\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "r1: 192.0.2.10 cisco_ios dc1\nr2: 192.0.2.11 cisco_ios dc2\nr1: OK - backed up\nr2: FAILED - connection timed out\nfailed hosts: r2",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "failed hosts: r2",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "Nornir Inventory and Tasks Capstone Project",
   "description": "A small end-to-end offline Nornir job: load a YAML inventory, resolve groups, and summarise a run result.",
   "requirements": [
    "Use the core ideas of Nornir Inventory and Tasks in a working Python program.",
    "Load the hosts from YAML and resolve each host's group data.",
    "Print one resolved line per host in sorted name order.",
    "Summarise the run result with OK/FAILED per host and a failed-hosts line.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and resolves the inventory and results correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-nornir-plugins",
  "slug": "netauto-python-nornir-plugins",
  "language": "python",
  "category": "devops",
  "title": "Nornir Plugins and Filtering",
  "description": "Extend Nornir with plugins: inventory sources, the F filter object, custom filters, runners, the Netmiko and NAPALM task plugins, and result reporting.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "Nornir plugins",
   "Inventory plugins",
   "F filters",
   "Custom filters",
   "Runners",
   "netmiko_send_command",
   "napalm_get",
   "print_result"
  ],
  "prerequisites": [
   "netauto-python-nornir"
  ],
  "analogy": "Learning {topic} is like learning to use snap-on tools: the same handle drives many heads, and you pick the head that fits the job.",
  "modules": [
   {
    "id": "netauto-python-nornir-plugins-m1",
    "title": "Nornir Plugins and Filtering Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-nornir-plugins-m1-l1",
      "slug": "netauto-python-nornir-plugins-m1-l1",
      "title": "What Are Nornir Plugins?",
      "concept": "Nornir plugins are small packages that extend the framework, and there are four kinds: inventory plugins load hosts, runner plugins decide how tasks execute, connection plugins open sessions, and task plugins do the work. The core framework stays small on purpose, and you install only the plugins your automation needs. A plugin is registered by name in the configuration file, so swapping one, for example the threaded runner for the serial runner, is a one-line change.",
      "syntax": "inventory:\n  plugin: SimpleInventory\nrunner:\n  plugin: threaded\n  options:\n    num_workers: 20",
      "exampleCode": "inventory:\n  plugin: SimpleInventory\n  options:\n    host_file: 'hosts.yaml'\nrunner:\n  plugin: threaded\n  options:\n    num_workers: 20",
      "exampleLanguage": "python",
      "mistake": "Writing your own inventory loader when a plugin already exists for your source of truth, such as NetBox or a YAML file.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Are Nornir Plugins?, but it does not work correctly.",
       "buggyCode": "import csv\n# hand-rolled loader that reads hosts.csv line by line",
       "fixedCode": "inventory:\n  plugin: SimpleInventory\n  options:\n    host_file: 'hosts.yaml'",
       "explanation": "Nornir ships inventory plugins for the common sources, and a hand-rolled loader duplicates their tested code and their edge cases."
      },
      "exercise": {
       "title": "Practise What Are Nornir Plugins?",
       "type": "write-code",
       "instructions": "Print the four Nornir plugin kinds and their jobs, one '<kind>: <job>' line per kind, in this order: inventory, runner, connection, task.",
       "starterCode": "plugins = [\n    (\"inventory\", \"loads hosts\"),\n    (\"runner\", \"decides how tasks execute\"),\n    (\"connection\", \"opens sessions\"),\n    (\"task\", \"does the work\"),\n]\n# TODO: complete the program below.\n",
       "solution": "plugins = [\n    (\"inventory\", \"loads hosts\"),\n    (\"runner\", \"decides how tasks execute\"),\n    (\"connection\", \"opens sessions\"),\n    (\"task\", \"does the work\"),\n]\nfor kind, job in plugins:\n    print(f\"{kind}: {job}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What Are Nornir Plugins? technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "inventory: loads hosts\nrunner: decides how tasks execute\nconnection: opens sessions\ntask: does the work",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "runner: decides how tasks execute",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Are Nornir Plugins? is the key idea here: Nornir plugins are small packages that extend the framework, and there are four kinds: inventory plugins load hosts, runner plugins decide how tasks execute, connection plugins open sessions, and task plugins do the work.",
        "approach": "Work through What Are Nornir Plugins? step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-plugins-m1-l2",
      "slug": "netauto-python-nornir-plugins-m1-l2",
      "title": "Inventory Plugins",
      "concept": "An inventory plugin turns an external source into Nornir hosts, and the SimpleInventory plugin does it from YAML files while others read NetBox, a CSV file, or a database. Whatever the source, every host ends up with the same fields: a hostname, a platform, and its data. Building hosts from a CSV string with the csv module is the same transformation in plain Python, and this lesson practises it.",
      "syntax": "inventory:\n  plugin: SimpleInventory\n  options:\n    host_file: 'hosts.yaml'",
      "exampleCode": "import csv\nimport io\n\nCSV = 'name,hostname,platform\\nr1,192.0.2.10,cisco_ios\\nr2,192.0.2.11,cisco_ios\\n'\nreader = csv.DictReader(io.StringIO(CSV))\nfor row in reader:\n    print(f\"{row['name']}: {row['hostname']} ({row['platform']})\")",
      "exampleLanguage": "python",
      "mistake": "Hard-coding host data in the script when an inventory plugin could load it from a file that the team edits without touching code.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Inventory Plugins, but it does not work correctly.",
       "buggyCode": "hosts = {'r1': {'hostname': '192.0.2.10'}}  # edited in code",
       "fixedCode": "inventory:\n  plugin: SimpleInventory\n  options:\n    host_file: 'hosts.yaml'",
       "explanation": "Host data changes often and belongs in a file the team can edit; hard-coding it means a new device requires a code change and a redeploy."
      },
      "exercise": {
       "title": "Practise Inventory Plugins",
       "type": "write-code",
       "instructions": "Build the inventory from the CSV text with csv.DictReader: print one line per host, '<name>: <hostname> (<platform>)', in file order.",
       "starterCode": "import csv\nimport io\n\nCSV = \"name,hostname,platform\\nr1,192.0.2.10,cisco_ios\\nr2,192.0.2.11,cisco_ios\\n\"\n# TODO: complete the program below.\n",
       "solution": "import csv\nimport io\n\nCSV = \"name,hostname,platform\\nr1,192.0.2.10,cisco_ios\\nr2,192.0.2.11,cisco_ios\\n\"\nreader = csv.DictReader(io.StringIO(CSV))\nfor row in reader:\n    print(f\"{row['name']}: {row['hostname']} ({row['platform']})\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Inventory Plugins technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: 192.0.2.10 (cisco_ios)\nr2: 192.0.2.11 (cisco_ios)",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "r2: 192.0.2.11 (cisco_ios)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Inventory Plugins is the key idea here: An inventory plugin turns an external source into Nornir hosts, and the SimpleInventory plugin does it from YAML files while others read NetBox, a CSV file, or a database.",
        "approach": "Work through Inventory Plugins step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-plugins-m1-l3",
      "slug": "netauto-python-nornir-plugins-m1-l3",
      "title": "The F Filter Object",
      "concept": "The F object builds filter expressions from host attributes, and you combine them with & for AND, | for OR, and ~ for NOT. F(platform='cisco_ios') & F(role='core') matches only IOS core devices, while F(site='dc1') | F(site='dc2') matches either site. The same AND/OR/NOT logic works on plain Python predicates over dictionaries, and this lesson practises it.",
      "syntax": "from nornir.core.filter import F\ncore_ios = nr.filter(F(platform='cisco_ios') & F(role='core'))",
      "exampleCode": "hosts = [\n    {'name': 'r1', 'platform': 'cisco_ios', 'role': 'core', 'site': 'dc1'},\n    {'name': 'r2', 'platform': 'cisco_ios', 'role': 'edge', 'site': 'dc1'},\n    {'name': 'sw1', 'platform': 'cisco_nxos', 'role': 'access', 'site': 'dc2'},\n]\ncore_ios = [h['name'] for h in hosts if h['platform'] == 'cisco_ios' and h['role'] == 'core']\nprint('core ios:', ', '.join(core_ios))\neither_site = [h['name'] for h in hosts if h['site'] in ('dc1', 'dc2')]\nprint('either site:', ', '.join(either_site))\nnot_edge = [h['name'] for h in hosts if h['role'] != 'edge']\nprint('not edge:', ', '.join(not_edge))",
      "exampleLanguage": "python",
      "mistake": "Chaining two filter calls when one combined F expression would do, which is slower to read and easy to get wrong.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The F Filter Object, but it does not work correctly.",
       "buggyCode": "nr.filter(platform='cisco_ios').filter(role='core')",
       "fixedCode": "nr.filter(F(platform='cisco_ios') & F(role='core'))",
       "explanation": "Two separate filters are harder to read than one combined expression, and the F object exists precisely to combine conditions with & and |."
      },
      "exercise": {
       "title": "Practise The F Filter Object",
       "type": "write-code",
       "instructions": "Filter the hosts three ways: platform cisco_ios AND role core; site dc1 OR dc2; and role NOT edge. Print 'core ios: <names>', 'either site: <names>', and 'not edge: <names>'.",
       "starterCode": "hosts = [\n    {\"name\": \"r1\", \"platform\": \"cisco_ios\", \"role\": \"core\", \"site\": \"dc1\"},\n    {\"name\": \"r2\", \"platform\": \"cisco_ios\", \"role\": \"edge\", \"site\": \"dc1\"},\n    {\"name\": \"sw1\", \"platform\": \"cisco_nxos\", \"role\": \"access\", \"site\": \"dc2\"},\n]\n# TODO: complete the program below.\n",
       "solution": "hosts = [\n    {\"name\": \"r1\", \"platform\": \"cisco_ios\", \"role\": \"core\", \"site\": \"dc1\"},\n    {\"name\": \"r2\", \"platform\": \"cisco_ios\", \"role\": \"edge\", \"site\": \"dc1\"},\n    {\"name\": \"sw1\", \"platform\": \"cisco_nxos\", \"role\": \"access\", \"site\": \"dc2\"},\n]\ncore_ios = [h[\"name\"] for h in hosts if h[\"platform\"] == \"cisco_ios\" and h[\"role\"] == \"core\"]\nprint(\"core ios:\", \", \".join(core_ios))\neither_site = [h[\"name\"] for h in hosts if h[\"site\"] in (\"dc1\", \"dc2\")]\nprint(\"either site:\", \", \".join(either_site))\nnot_edge = [h[\"name\"] for h in hosts if h[\"role\"] != \"edge\"]\nprint(\"not edge:\", \", \".join(not_edge))\n",
       "solutionExplanation": "The solution builds the required data, applies the The F Filter Object technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "core ios: r1\neither site: r1, r2, sw1\nnot edge: r1, sw1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "not edge: r1, sw1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The F Filter Object is the key idea here: The F object builds filter expressions from host attributes, and you combine them with & for AND, | for OR, and ~ for NOT.",
        "approach": "Work through The F Filter Object step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-plugins-m1-l4",
      "slug": "netauto-python-nornir-plugins-m1-l4",
      "title": "Custom Filter Functions",
      "concept": "When the F object cannot express a condition, you pass a plain function to filter, and Nornir calls it once per host with the host object. The function returns True for hosts to keep and False for hosts to drop, so any Python logic, a version comparison or a subnet check, can become a filter. Writing that predicate over dictionaries is the same skill, and this lesson practises it.",
      "syntax": "def is_old_ios(host):\n    return host['platform'] == 'cisco_ios' and host['version'] < '17.0'\nold = nr.filter(filter_func=is_old_ios)",
      "exampleCode": "import ipaddress\n\nhosts = [\n    {'name': 'r1', 'hostname': '192.0.2.10', 'platform': 'cisco_ios'},\n    {'name': 'r2', 'hostname': '10.0.0.5', 'platform': 'cisco_ios'},\n    {'name': 'sw1', 'hostname': '192.0.2.12', 'platform': 'cisco_nxos'},\n]\ndef in_lab_subnet(host):\n    return ipaddress.ip_address(host['hostname']) in ipaddress.ip_network('192.0.2.0/24')\nchosen = [h['name'] for h in hosts if in_lab_subnet(h)]\nprint('lab subnet:', ', '.join(chosen))",
      "exampleLanguage": "python",
      "mistake": "Writing a filter function that returns the host instead of True or False, which Nornir treats as truthy for every host and filters nothing.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Custom Filter Functions, but it does not work correctly.",
       "buggyCode": "def is_ios(host):\n    return host  # wrong: returns the host object",
       "fixedCode": "def is_ios(host):\n    return host['platform'] == 'cisco_ios'",
       "explanation": "A filter function must return a boolean; returning the host object is always truthy, so every host passes the filter."
      },
      "exercise": {
       "title": "Practise Custom Filter Functions",
       "type": "write-code",
       "instructions": "Write the predicate in_lab_subnet: it returns True when a host's address falls inside 192.0.2.0/24. Print 'lab subnet: <names>' for the matching hosts.",
       "starterCode": "import ipaddress\n\nhosts = [\n    {\"name\": \"r1\", \"hostname\": \"192.0.2.10\", \"platform\": \"cisco_ios\"},\n    {\"name\": \"r2\", \"hostname\": \"10.0.0.5\", \"platform\": \"cisco_ios\"},\n    {\"name\": \"sw1\", \"hostname\": \"192.0.2.12\", \"platform\": \"cisco_nxos\"},\n]\n# TODO: complete the program below.\n",
       "solution": "import ipaddress\n\nhosts = [\n    {\"name\": \"r1\", \"hostname\": \"192.0.2.10\", \"platform\": \"cisco_ios\"},\n    {\"name\": \"r2\", \"hostname\": \"10.0.0.5\", \"platform\": \"cisco_ios\"},\n    {\"name\": \"sw1\", \"hostname\": \"192.0.2.12\", \"platform\": \"cisco_nxos\"},\n]\ndef in_lab_subnet(host):\n    return ipaddress.ip_address(host[\"hostname\"]) in ipaddress.ip_network(\"192.0.2.0/24\")\nchosen = [h[\"name\"] for h in hosts if in_lab_subnet(h)]\nprint(\"lab subnet:\", \", \".join(chosen))\n",
       "solutionExplanation": "The solution builds the required data, applies the Custom Filter Functions technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "lab subnet: r1, sw1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "lab subnet: r1, sw1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Custom Filter Functions is the key idea here: When the F object cannot express a condition, you pass a plain function to filter, and Nornir calls it once per host with the host object.",
        "approach": "Work through Custom Filter Functions step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-plugins-m1-l5",
      "slug": "netauto-python-nornir-plugins-m1-l5",
      "title": "Runner Plugins: Serial vs Threaded",
      "concept": "The runner plugin decides how Nornir executes tasks, and the threaded runner runs hosts in parallel with a pool of workers while the serial runner does one host at a time. Threaded is the default and much faster for independent hosts, while serial is easier to debug and safer when tasks depend on a shared resource. You choose the runner and its worker count in the configuration file, and num_workers caps how many hosts run at once.",
      "syntax": "runner:\n  plugin: threaded\n  options:\n    num_workers: 20",
      "exampleCode": "runner:\n  plugin: threaded\n  options:\n    num_workers: 20\n# switch to serial for debugging:\n# runner:\n#   plugin: serial",
      "exampleLanguage": "python",
      "mistake": "Setting num_workers to 500 for a 500-host inventory, which opens hundreds of simultaneous SSH sessions and exhausts the jump host.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Runner Plugins: Serial vs Threaded, but it does not work correctly.",
       "buggyCode": "runner:\n  plugin: threaded\n  options:\n    num_workers: 500",
       "fixedCode": "runner:\n  plugin: threaded\n  options:\n    num_workers: 20",
       "explanation": "Each worker holds an SSH session, so 500 workers means 500 simultaneous logins; a modest pool such as 20 is fast without overwhelming the hosts or the jump box."
      },
      "exercise": {
       "title": "Practise Runner Plugins: Serial vs Threaded",
       "type": "write-code",
       "instructions": "Compute the run times for 20 hosts at 5 seconds each: the serial total, the threaded total with 5 workers (hosts rounded up to whole batches times seconds per host), and the time saved. Print 'hosts: <n>', 'serial: <n>s', 'threaded (5 workers): about <n>s', and 'time saved: <n>s'.",
       "starterCode": "hosts = 20\nseconds_per_host = 5\nworkers = 5\n# TODO: complete the program below.\n",
       "solution": "hosts = 20\nseconds_per_host = 5\nworkers = 5\nserial = hosts * seconds_per_host\nbatches = (hosts + workers - 1) // workers\nthreaded = batches * seconds_per_host\nprint(f\"hosts: {hosts}\")\nprint(f\"serial: {serial}s\")\nprint(f\"threaded ({workers} workers): about {threaded}s\")\nprint(f\"time saved: {serial - threaded}s\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Runner Plugins: Serial vs Threaded technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hosts: 20\nserial: 100s\nthreaded (5 workers): about 20s\ntime saved: 80s",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "time saved: 80s",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Runner Plugins: Serial vs Threaded is the key idea here: The runner plugin decides how Nornir executes tasks, and the threaded runner runs hosts in parallel with a pool of workers while the serial runner does one host at a time.",
        "approach": "Work through Runner Plugins: Serial vs Threaded step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-nornir-plugins-m2",
    "title": "Nornir Plugins and Filtering in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-python-nornir-plugins-m2-l1",
      "slug": "netauto-python-nornir-plugins-m2-l1",
      "title": "The Netmiko Plugin (netmiko_send_command)",
      "concept": "The nornir-netmiko package adds task plugins such as netmiko_send_command, which runs one command on the host's device using its inventory connection details. You call it inside your own task with task.run(task=netmiko_send_command, command_string='show version'), and the result holds the device's output string. Running it for real needs lab devices, because it opens an SSH session to each host it runs against.",
      "syntax": "from nornir_netmiko.tasks import netmiko_send_command\n\ndef get_version(task):\n    return task.run(task=netmiko_send_command, command_string='show version')",
      "exampleCode": "from nornir_netmiko.tasks import netmiko_send_command, netmiko_send_config\n\ndef get_version(task):\n    return task.run(task=netmiko_send_command, command_string='show version')\n\nresult = nr.run(task=get_version)",
      "exampleLanguage": "python",
      "mistake": "Calling netmiko_send_command directly with nr.run, instead of wrapping it in your own task that can add logging and error handling.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The Netmiko Plugin (netmiko_send_command), but it does not work correctly.",
       "buggyCode": "result = nr.run(task=netmiko_send_command, command_string='show version')",
       "fixedCode": "def get_version(task):\n    return task.run(task=netmiko_send_command, command_string='show version')\nresult = nr.run(task=get_version)",
       "explanation": "Running the plugin directly works, but wrapping it in your own task lets you add per-host logging, retries, and result handling in one place."
      },
      "exercise": {
       "title": "Practise The Netmiko Plugin (netmiko_send_command)",
       "type": "write-code",
       "instructions": "Build the task-call plan for the Netmiko plugin: the task name netmiko_send_command, the command_string, and the hosts it will run against. Print the task, the command, then one '<host>: queued' line per host. This is the plan for wrapping the plugin call in your own task - running it opens an SSH session to each host, so it needs lab devices.",
       "starterCode": "hosts = [\"r1\", \"r2\"]\ncommand = \"show version\"\ntask_name = \"netmiko_send_command\"\n# TODO: complete the program below.\n",
       "solution": "hosts = [\"r1\", \"r2\"]\ncommand = \"show version\"\ntask_name = \"netmiko_send_command\"\nprint(f\"Task: {task_name}\")\nprint(f\"Command: {command}\")\nfor host in hosts:\n    print(f\"{host}: queued\")\n",
       "solutionExplanation": "The solution builds the required data, applies the The Netmiko Plugin (netmiko_send_command) technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Task: netmiko_send_command\nCommand: show version\nr1: queued\nr2: queued",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "r2: queued",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The Netmiko Plugin (netmiko_send_command) is the key idea here: The nornir-netmiko package adds task plugins such as netmiko_send_command, which runs one command on the host's device using its inventory connection details.",
        "approach": "Work through The Netmiko Plugin (netmiko_send_command) step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-plugins-m2-l2",
      "slug": "netauto-python-nornir-plugins-m2-l2",
      "title": "The NAPALM Plugin",
      "concept": "The nornir-napalm package adds task plugins such as napalm_get, which calls a NAPALM getter on each host and returns its structured result. You pass the getter name, for example napalm_get with getters=['facts', 'interfaces'], and the plugin opens the NAPALM driver for the host's platform. Running it for real needs lab devices, because it connects to each host over SSH.",
      "syntax": "from nornir_napalm.plugins.tasks import napalm_get\n\ndef get_facts(task):\n    return task.run(task=napalm_get, getters=['facts'])",
      "exampleCode": "from nornir_napalm.plugins.tasks import napalm_get\n\ndef get_facts(task):\n    return task.run(task=napalm_get, getters=['facts', 'interfaces'])\n\nresult = nr.run(task=get_facts)\nprint(result['r1'].result['facts']['hostname'])",
      "exampleLanguage": "python",
      "mistake": "Asking napalm_get for a getter the host's driver does not support, which raises NotImplementedError for that host.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The NAPALM Plugin, but it does not work correctly.",
       "buggyCode": "task.run(task=napalm_get, getters=['bgp_neighbors'])  # on a driver without BGP",
       "fixedCode": "task.run(task=napalm_get, getters=['facts'])",
       "explanation": "Optional getters are not implemented by every driver, so requesting one that is missing fails that host; stick to getters the driver documents."
      },
      "exercise": {
       "title": "Check your understanding: The NAPALM Plugin",
       "type": "multiple-choice",
       "instructions": "Which statement about The NAPALM Plugin is correct?",
       "starterCode": "",
       "solution": "The nornir-napalm package adds task plugins such as napalm_get, which calls a NAPALM getter on each host and returns its structured result.",
       "solutionExplanation": "The nornir-napalm package adds task plugins such as napalm_get, which calls a NAPALM getter on each host and returns its structured result. The other options are false: The NAPALM Plugin is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The nornir-napalm package adds task plugins such as napalm_get, which calls a NAPALM getter on each host and returns its structured result.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of The NAPALM Plugin from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "The NAPALM Plugin requires a separate paid licence to use",
        "The NAPALM Plugin is not available in Python",
        "The NAPALM Plugin only works on Windows",
        "The nornir-napalm package adds task plugins such as napalm_get, which calls a NAPALM getter on each host and returns its structured result.",
        "The NAPALM Plugin was removed from Python in the latest version"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-python-nornir-plugins-m2-l3",
      "slug": "netauto-python-nornir-plugins-m2-l3",
      "title": "Writing a Custom Task Plugin",
      "concept": "A custom task plugin is just a task function packaged for reuse, and it follows the same shape as any task: take the task object, use task.host for inventory data, and return a Result. Teams write them for jobs they repeat, such as generating a device's configuration from its inventory data and returning the text. Generating that configuration from host data is local work, and this lesson practises exactly that.",
      "syntax": "from nornir.core.task import Result\n\ndef gen_interface_config(task):\n    host = task.host\n    config = f\"interface {host['mgmt_if']}\\n description {host['description']}\\n\"\n    return Result(host=task.host, result=config)",
      "exampleCode": "host = {'name': 'r1', 'mgmt_if': 'GigabitEthernet0/0', 'description': 'Uplink to core', 'ip': '192.0.2.1 255.255.255.0'}\nlines = [\n    f\"interface {host['mgmt_if']}\",\n    f\" description {host['description']}\",\n    f\" ip address {host['ip']}\",\n    ' no shutdown',\n]\nprint('\\n'.join(lines))",
      "exampleLanguage": "python",
      "mistake": "Reading inventory data from a global variable inside the task instead of from task.host, which breaks when the task runs on a different host.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Writing a Custom Task Plugin, but it does not work correctly.",
       "buggyCode": "HOST = {'mgmt_if': 'GigabitEthernet0/0'}\ndef gen_config(task):\n    return Result(host=task.host, result=f\"interface {HOST['mgmt_if']}\")",
       "fixedCode": "def gen_config(task):\n    return Result(host=task.host, result=f\"interface {task.host['mgmt_if']}\")",
       "explanation": "A global holds one host's data, so every host would get the same configuration; task.host gives the data of the host the task is running on."
      },
      "exercise": {
       "title": "Practise Writing a Custom Task Plugin",
       "type": "write-code",
       "instructions": "Write the task plugin's core logic: generate the four-line interface configuration from the host dictionary (interface, description, IP address, no shutdown) and print it.",
       "starterCode": "host = {\"name\": \"r1\", \"mgmt_if\": \"GigabitEthernet0/0\", \"description\": \"Uplink to core\", \"ip\": \"192.0.2.1 255.255.255.0\"}\n# TODO: complete the program below.\n",
       "solution": "host = {\"name\": \"r1\", \"mgmt_if\": \"GigabitEthernet0/0\", \"description\": \"Uplink to core\", \"ip\": \"192.0.2.1 255.255.255.0\"}\nlines = [\n    f\"interface {host['mgmt_if']}\",\n    f\" description {host['description']}\",\n    f\" ip address {host['ip']}\",\n    \" no shutdown\",\n]\nprint(\"\\n\".join(lines))\n",
       "solutionExplanation": "The solution builds the required data, applies the Writing a Custom Task Plugin technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interface GigabitEthernet0/0\n description Uplink to core\n ip address 192.0.2.1 255.255.255.0\n no shutdown",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Uplink to core",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Writing a Custom Task Plugin is the key idea here: A custom task plugin is just a task function packaged for reuse, and it follows the same shape as any task: take the task object, use task.",
        "approach": "Work through Writing a Custom Task Plugin step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-plugins-m2-l4",
      "slug": "netauto-python-nornir-plugins-m2-l4",
      "title": "Using the Print Result Plugin",
      "concept": "Nornir's print_result function renders an AggregatedResult as a readable per-host report, with one section per host and the task output underneath. It is the quickest way to inspect a run while developing, and it takes the result object as its only argument. Formatting the same report yourself, aligned columns with one line per host, is ordinary string work, and this lesson practises it.",
      "syntax": "from nornir_utils.plugins.functions import print_result\nresult = nr.run(task=hello)\nprint_result(result)",
      "exampleCode": "results = {'r1': 'hello from r1', 'r2': 'hello from r2', 'sw1': 'hello from sw1'}\nwidth = max(len(name) for name in results)\nfor name, output in sorted(results.items()):\n    print(f\"{name:<{width}} | {output}\")",
      "exampleLanguage": "python",
      "mistake": "Calling print_result on every run in production, where the output is long, unstructured, and hard for other tools to parse.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Using the Print Result Plugin, but it does not work correctly.",
       "buggyCode": "print_result(result)  # in a nightly job writing to a log file",
       "fixedCode": "for host, res in result.items():\n    log(host, res.result)",
       "explanation": "print_result is a human-readable debug aid; production jobs should log structured per-host results that monitoring tools can parse."
      },
      "exercise": {
       "title": "Practise Using the Print Result Plugin",
       "type": "write-code",
       "instructions": "Format the results as an aligned table: one line per host in sorted order, '<name padded to the longest name> | <output>'.",
       "starterCode": "results = {\"r1\": \"hello from r1\", \"r2\": \"hello from r2\", \"sw1\": \"hello from sw1\"}\n# TODO: complete the program below.\n",
       "solution": "results = {\"r1\": \"hello from r1\", \"r2\": \"hello from r2\", \"sw1\": \"hello from sw1\"}\nwidth = max(len(name) for name in results)\nfor name, output in sorted(results.items()):\n    print(f\"{name:<{width}} | {output}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Using the Print Result Plugin technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1  | hello from r1\nr2  | hello from r2\nsw1 | hello from sw1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "sw1 | hello from sw1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Using the Print Result Plugin is the key idea here: Nornir's print_result function renders an AggregatedResult as a readable per-host report, with one section per host and the task output underneath.",
        "approach": "Work through Using the Print Result Plugin step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-nornir-plugins-m2-l5",
      "slug": "netauto-python-nornir-plugins-m2-l5",
      "title": "A Plugin-Based Workflow End to End",
      "concept": "A plugin-based Nornir workflow loads the inventory with an inventory plugin, filters with F expressions, runs tasks that delegate to the Netmiko and NAPALM plugins, and prints the result with print_result. Each plugin handles one concern, so the workflow script itself stays short and readable. Running it end to end needs lab devices, but every plugin kind is covered in this track.",
      "syntax": "nr = InitNornir(config_file='config.yaml')\nresult = nr.filter(F(platform='cisco_ios')).run(task=collect_facts)\nprint_result(result)",
      "exampleCode": "from nornir.core.filter import F\nfrom nornir_utils.plugins.functions import print_result\n\nnr = InitNornir(config_file='config.yaml')\nresult = nr.filter(F(platform='cisco_ios')).run(task=collect_facts)\nprint_result(result)",
      "exampleLanguage": "python",
      "mistake": "Mixing plugin concerns in one task, for example loading inventory inside a task function, instead of letting each plugin do its own job.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Plugin-Based Workflow End to End, but it does not work correctly.",
       "buggyCode": "def collect(task):\n    nr2 = InitNornir(config_file='config.yaml')  # inside a task",
       "fixedCode": "nr = InitNornir(config_file='config.yaml')\nresult = nr.run(task=collect)",
       "explanation": "Loading the inventory inside a task runs once per host and wastes time; the inventory loads once at the top of the script."
      },
      "exercise": {
       "title": "Practise A Plugin-Based Workflow End to End",
       "type": "write-code",
       "instructions": "Build a plugin-based Nornir workflow over local data: start from the inventory list, filter it to the core cisco_ios hosts (the F-expression filter from the lesson), assign the collect_facts task to each filtered host, and print the inventory count, the filtered count, one '<host>: <task>' line per filtered host, and the plugins the workflow uses. Running the tasks against devices needs a lab; the inventory, filtering, and planning are real here.",
       "starterCode": "hosts = [\n    {\"name\": \"r1\", \"platform\": \"cisco_ios\", \"role\": \"core\"},\n    {\"name\": \"r2\", \"platform\": \"cisco_nxos\", \"role\": \"core\"},\n    {\"name\": \"r3\", \"platform\": \"cisco_ios\", \"role\": \"access\"},\n]\ntask = \"collect_facts\"\n# TODO: complete the program below.\n",
       "solution": "hosts = [\n    {\"name\": \"r1\", \"platform\": \"cisco_ios\", \"role\": \"core\"},\n    {\"name\": \"r2\", \"platform\": \"cisco_nxos\", \"role\": \"core\"},\n    {\"name\": \"r3\", \"platform\": \"cisco_ios\", \"role\": \"access\"},\n]\ntask = \"collect_facts\"\nfiltered = [host for host in hosts if host[\"platform\"] == \"cisco_ios\" and host[\"role\"] == \"core\"]\nprint(f\"Inventory: {len(hosts)} hosts\")\nprint(f\"Filtered: {len(filtered)}\")\nfor host in filtered:\n    print(f\"{host['name']}: {task}\")\nprint(\"Plugins: netmiko, napalm\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A Plugin-Based Workflow End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Inventory: 3 hosts\nFiltered: 1\nr1: collect_facts\nPlugins: netmiko, napalm",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "r1: collect_facts",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Plugin-Based Workflow End to End is the key idea here: A plugin-based Nornir workflow loads the inventory with an inventory plugin, filters with F expressions, runs tasks that delegate to the Netmiko and NAPALM plugins, and prints the result with print_result.",
        "approach": "Work through A Plugin-Based Workflow End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise Nornir Plugins and Filtering Capstone",
   "type": "write-code",
   "instructions": "Build an inventory from the CSV text with csv.DictReader, then filter it three ways and print the results: 'ios hosts: <names>' for platform cisco_ios, 'core hosts: <names>' for role core, and 'lab subnet: <names>' for hosts whose address is inside 192.0.2.0/24 (use the ipaddress module). Finally print the results table with aligned columns, one line per host in sorted order: '<name padded to the longest name> | hello from <name>'. CSV rows: r1,192.0.2.10,cisco_ios,core; r2,192.0.2.11,cisco_ios,edge; sw1,192.0.2.12,cisco_nxos,access.",
   "starterCode": "import csv\nimport io\nimport ipaddress\n\nCSV = \"name,hostname,platform,role\\nr1,192.0.2.10,cisco_ios,core\\nr2,192.0.2.11,cisco_ios,edge\\nsw1,192.0.2.12,cisco_nxos,access\\n\"\n# TODO: complete the capstone program below.\n",
   "solution": "import csv\nimport io\nimport ipaddress\n\nCSV = \"name,hostname,platform,role\\nr1,192.0.2.10,cisco_ios,core\\nr2,192.0.2.11,cisco_ios,edge\\nsw1,192.0.2.12,cisco_nxos,access\\n\"\nhosts = list(csv.DictReader(io.StringIO(CSV)))\nios = [h[\"name\"] for h in hosts if h[\"platform\"] == \"cisco_ios\"]\nprint(\"ios hosts:\", \", \".join(ios))\ncore = [h[\"name\"] for h in hosts if h[\"role\"] == \"core\"]\nprint(\"core hosts:\", \", \".join(core))\nlab = [h[\"name\"] for h in hosts if ipaddress.ip_address(h[\"hostname\"]) in ipaddress.ip_network(\"192.0.2.0/24\")]\nprint(\"lab subnet:\", \", \".join(lab))\nprint(\"greeting table:\")\nwidth = max(len(h[\"name\"]) for h in hosts)\nfor host in sorted(hosts, key=lambda h: h[\"name\"]):\n    print(f\"{host['name']:<{width}} | hello from {host['name']}\")\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "ios hosts: r1, r2\ncore hosts: r1\nlab subnet: r1, r2, sw1\ngreeting table:\nr1  | hello from r1\nr2  | hello from r2\nsw1 | hello from sw1",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "core hosts: r1",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "Nornir Plugins and Filtering Capstone Project",
   "description": "A small end-to-end offline plugin workflow: build an inventory from CSV, filter it three ways, and print an aligned results table.",
   "requirements": [
    "Use the core ideas of Nornir Plugins and Filtering in a working Python program.",
    "Build the inventory from CSV with csv.DictReader.",
    "Filter the inventory three ways and print each result.",
    "Print the aligned greeting table for all hosts.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and filters the inventory correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-pyats",
  "slug": "netauto-python-pyats",
  "language": "python",
  "category": "devops",
  "title": "pyATS Testbeds and aetest",
  "description": "Test the network with pyATS: testbed files, loading devices, aetest testcases and sections, assertions, Genie parsing, and mock-data development.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "pyATS",
   "Testbeds",
   "aetest",
   "Testcases",
   "Assertions",
   "Genie parsers",
   "Mock data",
   "YAML"
  ],
  "prerequisites": [
   "netauto-python-netmiko",
   "netauto-python-nornir"
  ],
  "analogy": "Learning {topic} is like learning to run a medical check-up: you measure the patient against known healthy values and report exactly what failed.",
  "modules": [
   {
    "id": "netauto-python-pyats-m1",
    "title": "pyATS Testbeds and aetest Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-pyats-m1-l1",
      "slug": "netauto-python-pyats-m1-l1",
      "title": "What Is pyATS?",
      "concept": "pyATS is Cisco's Python framework for network test automation, and it combines a testbed model of your devices with the aetest test framework and the Genie parsing library. You describe devices once in a testbed file, write testcases that check the network's state, and pyATS runs them and reports pass or fail per testcase. pyATS is aimed at testing rather than configuring: its job is to prove the network behaves as designed.",
      "syntax": "pip install pyats\npyats version check",
      "exampleCode": "import pyats\nfrom genie.testbed import load\n\ntestbed = load('testbed.yaml')\ndevice = testbed.devices['r1']\ndevice.connect()\nprint(device.parse('show version'))",
      "exampleLanguage": "python",
      "mistake": "Treating pyATS like Netmiko and using it to push configuration, when its strength is running structured tests against the network's state.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is pyATS?, but it does not work correctly.",
       "buggyCode": "device = testbed.devices['r1']\ndevice.configure('hostname R2')  # using pyATS as a config tool",
       "fixedCode": "device = testbed.devices['r1']\ndevice.connect()\noutput = device.parse('show version')\nassert output['version'] == '17.6.1'",
       "explanation": "pyATS can send configuration, but its purpose is verification; the test asserts the version instead of changing the device."
      },
      "exercise": {
       "title": "Practise What Is pyATS?",
       "type": "write-code",
       "instructions": "Print the three parts of pyATS and their jobs, one '<name>: <job>' line per part, in this order: pyATS, aetest, Genie.",
       "starterCode": "components = [\n    (\"pyATS\", \"test framework and CLI\"),\n    (\"aetest\", \"testcases and sections\"),\n    (\"Genie\", \"device parsers and testbed model\"),\n]\n# TODO: complete the program below.\n",
       "solution": "components = [\n    (\"pyATS\", \"test framework and CLI\"),\n    (\"aetest\", \"testcases and sections\"),\n    (\"Genie\", \"device parsers and testbed model\"),\n]\nfor name, job in components:\n    print(f\"{name}: {job}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What Is pyATS? technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "pyATS: test framework and CLI\naetest: testcases and sections\nGenie: device parsers and testbed model",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Genie: device parsers and testbed model",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Is pyATS? is the key idea here: pyATS is Cisco's Python framework for network test automation, and it combines a testbed model of your devices with the aetest test framework and the Genie parsing library.",
        "approach": "Work through What Is pyATS? step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-pyats-m1-l2",
      "slug": "netauto-python-pyats-m1-l2",
      "title": "Installing pyATS",
      "concept": "pyATS is installed from PyPI with pip install pyats, and you confirm the install with the pyats version check command. The install is large because it includes the Genie libraries with parsers for many commands and platforms. A virtual environment is recommended, because pyATS pins several dependencies and can conflict with other automation packages.",
      "syntax": "pip install pyats\npyats version check",
      "exampleCode": "$ pip install pyats\n$ pyats version check\npyats version: 23.10",
      "exampleLanguage": "python",
      "mistake": "Installing pyATS into the same environment as an old Nornir and letting pip resolve the conflict by downgrading a shared dependency.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Installing pyATS, but it does not work correctly.",
       "buggyCode": "$ pip install pyats  # in the shared automation environment",
       "fixedCode": "$ python3 -m venv pyats-env\n$ source pyats-env/bin/activate\n$ pip install pyats",
       "explanation": "pyATS pins several shared libraries, so installing it into a shared environment can downgrade packages other tools depend on; a dedicated virtual environment avoids that."
      },
      "exercise": {
       "title": "Practise Installing pyATS",
       "type": "write-code",
       "instructions": "Build the install-check record for pyATS: the package name, the pip install command, the version-check command, and whether a virtual environment is used. Validate that the install command names the package and the verify step is the pyats version check, then print the four-line summary exactly as shown. This is the local record of the install steps from the lesson - installing on a real machine and connecting to a device both need a lab.",
       "starterCode": "package = \"pyats\"\ninstall_cmd = \"pip install pyats\"\nverify_cmd = \"pyats version check\"\nuse_venv = True\n# TODO: complete the program below.\n",
       "solution": "package = \"pyats\"\ninstall_cmd = \"pip install pyats\"\nverify_cmd = \"pyats version check\"\nuse_venv = True\nassert install_cmd == f\"pip install {package}\"\nassert \"pyats version\" in verify_cmd\nprint(f\"Package: {package}\")\nprint(f\"Install: {install_cmd}\")\nprint(f\"Verify: {verify_cmd}\")\nprint(f\"Venv: {'yes' if use_venv else 'no'}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Installing pyATS technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Package: pyats\nInstall: pip install pyats\nVerify: pyats version check\nVenv: yes",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "pip install pyats",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Installing pyATS is the key idea here: pyATS is installed from PyPI with pip install pyats, and you confirm the install with the pyats version check command.",
        "approach": "Work through Installing pyATS step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-pyats-m1-l3",
      "slug": "netauto-python-pyats-m1-l3",
      "title": "The Testbed YAML File",
      "concept": "A pyATS testbed is a YAML file that lists every device with its operating system, connection details, and credentials. Each device entry names its os, such as ios or nxos, and gives connection details under connections, including the protocol and the IP address. Loading that YAML with yaml.safe_load and listing the devices is the first step of any pyATS run, and this lesson practises it.",
      "syntax": "devices:\n  r1:\n    os: ios\n    type: router\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.10",
      "exampleCode": "import yaml\n\nTESTBED_YAML = '''\ndevices:\n  r1:\n    os: ios\n    type: router\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.10\n  sw1:\n    os: nxos\n    type: switch\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.12\n'''\ntestbed = yaml.safe_load(TESTBED_YAML)\nfor name, device in sorted(testbed['devices'].items()):\n    ip = device['connections']['cli']['ip']\n    print(f\"{name}: {device['os']} {device['type']} {ip}\")",
      "exampleLanguage": "python",
      "mistake": "Putting credentials directly in the testbed YAML, where they end up committed to version control with the rest of the file.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate The Testbed YAML File, but it does not work correctly.",
       "buggyCode": "devices:\n  r1:\n    credentials:\n      default:\n        username: admin\n        password: secret",
       "fixedCode": "devices:\n  r1:\n    credentials:\n      default:\n        username: '%ENV{PYATS_USERNAME}'\n        password: '%ENV{PYATS_PASSWORD}'",
       "explanation": "Credentials in the testbed file are committed to Git along with it; pyATS supports %ENV references so secrets stay in the environment."
      },
      "exercise": {
       "title": "Practise The Testbed YAML File",
       "type": "write-code",
       "instructions": "Load the testbed YAML with yaml.safe_load and print one line per device in sorted name order: '<name>: <os> <type> <cli ip>'.",
       "starterCode": "import yaml\n\nTESTBED_YAML = \"\"\"\ndevices:\n  r1:\n    os: ios\n    type: router\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.10\n  sw1:\n    os: nxos\n    type: switch\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.12\n\"\"\"\n# TODO: complete the program below.\n",
       "solution": "import yaml\n\nTESTBED_YAML = \"\"\"\ndevices:\n  r1:\n    os: ios\n    type: router\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.10\n  sw1:\n    os: nxos\n    type: switch\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.12\n\"\"\"\ntestbed = yaml.safe_load(TESTBED_YAML)\nfor name, device in sorted(testbed[\"devices\"].items()):\n    ip = device[\"connections\"][\"cli\"][\"ip\"]\n    print(f\"{name}: {device['os']} {device['type']} {ip}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the The Testbed YAML File technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: ios router 192.0.2.10\nsw1: nxos switch 192.0.2.12",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "sw1: nxos switch",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The Testbed YAML File is the key idea here: A pyATS testbed is a YAML file that lists every device with its operating system, connection details, and credentials.",
        "approach": "Work through The Testbed YAML File step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-pyats-m1-l4",
      "slug": "netauto-python-pyats-m1-l4",
      "title": "Loading a Testbed in Python",
      "concept": "The genie.testbed.load function reads a testbed YAML file and returns a testbed object whose devices attribute maps names to device objects. Each device object knows its operating system and connection details, and device.connect() opens the session using them. Running load and connect for real needs a lab testbed, so this lesson practises the call shape, not a live connection.",
      "syntax": "from genie.testbed import load\ntestbed = load('testbed.yaml')\ndevice = testbed.devices['r1']\ndevice.connect()",
      "exampleCode": "from genie.testbed import load\n\ntestbed = load('testbed.yaml')\ndevice = testbed.devices['r1']\ndevice.connect()\nprint('connected to', device.name)",
      "exampleLanguage": "python",
      "mistake": "Creating device objects by hand instead of loading the testbed, which duplicates the connection details the YAML already holds.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Loading a Testbed in Python, but it does not work correctly.",
       "buggyCode": "device = Device('r1', os='ios')\ndevice.connect()",
       "fixedCode": "testbed = load('testbed.yaml')\ndevice = testbed.devices['r1']\ndevice.connect()",
       "explanation": "Hand-built device objects duplicate the YAML and drift from it; loading the testbed keeps one source of truth for every device."
      },
      "exercise": {
       "title": "Check your understanding: Loading a Testbed in Python",
       "type": "multiple-choice",
       "instructions": "Which statement about Loading a Testbed in Python is correct?",
       "starterCode": "",
       "solution": "The genie.",
       "solutionExplanation": "The genie. The other options are false: Loading a Testbed in Python is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The genie.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Loading a Testbed in Python from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Loading a Testbed in Python only works on Windows",
        "Loading a Testbed in Python was removed from Python in the latest version",
        "The genie.",
        "Loading a Testbed in Python can only be used once in a program",
        "Loading a Testbed in Python requires a separate paid licence to use"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-python-pyats-m1-l5",
      "slug": "netauto-python-pyats-m1-l5",
      "title": "Connecting to Testbed Devices",
      "concept": "A pyATS device connects with device.connect(), which opens the session described in the testbed, and the connection stays open until device.disconnect() or the script ends. The device object remembers its operating system, so parse and execute pick the right command syntax for it. Connecting for real needs lab devices, and a failed connect raises an exception you catch per device so one bad host does not stop the run.",
      "syntax": "device.connect()\noutput = device.execute('show version')\ndevice.disconnect()",
      "exampleCode": "device = testbed.devices['r1']\ntry:\n    device.connect()\n    print(device.execute('show version'))\nfinally:\n    device.disconnect()",
      "exampleLanguage": "python",
      "mistake": "Forgetting to disconnect, which leaves sessions open on the device until they time out.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Connecting to Testbed Devices, but it does not work correctly.",
       "buggyCode": "device.connect()\ndevice.execute('show version')",
       "fixedCode": "try:\n    device.connect()\n    device.execute('show version')\nfinally:\n    device.disconnect()",
       "explanation": "A connect without a matching disconnect leaks the session; a finally block closes it whether the work succeeded or failed."
      },
      "exercise": {
       "title": "Practise Connecting to Testbed Devices",
       "type": "write-code",
       "instructions": "Validate each testbed device CLI connection before connecting: the protocol must be ssh and the IP must be valid. Print NAME: ready to connect (OS at IP) for valid devices, NAME: NOT READY: protocol is not ssh for a non-SSH protocol, and NAME: NOT READY: bad IP address for a bad IP.",
       "starterCode": "import ipaddress\n\ndevices = {\n    \"r1\": {\"os\": \"ios\", \"protocol\": \"ssh\", \"ip\": \"192.0.2.10\"},\n    \"r2\": {\"os\": \"ios\", \"protocol\": \"telnet\", \"ip\": \"192.0.2.11\"},\n    \"sw1\": {\"os\": \"nxos\", \"protocol\": \"ssh\", \"ip\": \"999.1.1.1\"},\n}\n# TODO: complete the program below.\n",
       "solution": "import ipaddress\n\ndevices = {\n    \"r1\": {\"os\": \"ios\", \"protocol\": \"ssh\", \"ip\": \"192.0.2.10\"},\n    \"r2\": {\"os\": \"ios\", \"protocol\": \"telnet\", \"ip\": \"192.0.2.11\"},\n    \"sw1\": {\"os\": \"nxos\", \"protocol\": \"ssh\", \"ip\": \"999.1.1.1\"},\n}\nfor name, device in sorted(devices.items()):\n    if device[\"protocol\"] != \"ssh\":\n        print(f\"{name}: NOT READY: protocol is not ssh\")\n        continue\n    try:\n        ipaddress.ip_address(device[\"ip\"])\n    except ValueError:\n        print(f\"{name}: NOT READY: bad IP address\")\n        continue\n    print(f\"{name}: ready to connect ({device['os']} at {device['ip']})\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Connecting to Testbed Devices technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: ready to connect (ios at 192.0.2.10)\nr2: NOT READY: protocol is not ssh\nsw1: NOT READY: bad IP address",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "r1: ready to connect (ios at 192.0.2.10)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Connecting to Testbed Devices is the key idea here: A pyATS device connects with device.",
        "approach": "Work through Connecting to Testbed Devices step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-pyats-m2",
    "title": "pyATS Testbeds and aetest in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-python-pyats-m2-l1",
      "slug": "netauto-python-pyats-m2-l1",
      "title": "aetest: Testcases and Sections",
      "concept": "An aetest testcase is a Python class with sections that run in a fixed order: setup prepares, test checks one thing, and cleanup tidies up afterwards. Each section is a method, and aetest runs them in order and records pass or fail per section. Running that order with plain functions and printing each section's result is the same structure in miniature, and this lesson practises it.",
      "syntax": "from pyats import aetest\n\nclass CheckVersion(aetest.Testcase):\n    @aetest.setup\n    def setup(self):\n        pass\n    @aetest.test\n    def test_version(self):\n        pass\n    @aetest.cleanup\n    def cleanup(self):\n        pass",
      "exampleCode": "sections = []\n\ndef setup():\n    sections.append(('setup', 'PASS'))\n\ndef test_version():\n    sections.append(('test_version', 'PASS'))\n\ndef test_interfaces():\n    sections.append(('test_interfaces', 'FAIL'))\n\ndef cleanup():\n    sections.append(('cleanup', 'PASS'))\n\nfor step in [setup, test_version, test_interfaces, cleanup]:\n    step()\nfor name, result in sections:\n    print(f\"{name}: {result}\")\nfailed = [name for name, result in sections if result == 'FAIL']\nprint(f\"failed sections: {', '.join(failed) if failed else 'none'}\")",
      "exampleLanguage": "python",
      "mistake": "Putting the check and the setup in the same section, so a setup failure looks like a test failure and the real cause is hidden.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate aetest: Testcases and Sections, but it does not work correctly.",
       "buggyCode": "class CheckVersion(aetest.Testcase):\n    @aetest.test\n    def test_version(self):\n        device.connect()  # setup inside the test\n        assert device.parse('show version')",
       "fixedCode": "class CheckVersion(aetest.Testcase):\n    @aetest.setup\n    def setup(self):\n        device.connect()\n    @aetest.test\n    def test_version(self):\n        assert device.parse('show version')",
       "explanation": "Setup belongs in its own section so a connection failure is reported as a setup failure, not as a failed version check."
      },
      "exercise": {
       "title": "Practise aetest: Testcases and Sections",
       "type": "write-code",
       "instructions": "Run the four aetest sections in order (setup, test_version, test_interfaces, cleanup), recording each result. Print one '<section>: <result>' line per section, then a final line 'failed sections: <names>' or 'failed sections: none'.",
       "starterCode": "sections = []\n\ndef setup():\n    sections.append((\"setup\", \"PASS\"))\n\ndef test_version():\n    sections.append((\"test_version\", \"PASS\"))\n\ndef test_interfaces():\n    sections.append((\"test_interfaces\", \"FAIL\"))\n\ndef cleanup():\n    sections.append((\"cleanup\", \"PASS\"))\n# TODO: complete the program below.\n",
       "solution": "sections = []\n\ndef setup():\n    sections.append((\"setup\", \"PASS\"))\n\ndef test_version():\n    sections.append((\"test_version\", \"PASS\"))\n\ndef test_interfaces():\n    sections.append((\"test_interfaces\", \"FAIL\"))\n\ndef cleanup():\n    sections.append((\"cleanup\", \"PASS\"))\nfor step in [setup, test_version, test_interfaces, cleanup]:\n    step()\nfor name, result in sections:\n    print(f\"{name}: {result}\")\nfailed = [name for name, result in sections if result == \"FAIL\"]\nprint(f\"failed sections: {', '.join(failed) if failed else 'none'}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the aetest: Testcases and Sections technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "setup: PASS\ntest_version: PASS\ntest_interfaces: FAIL\ncleanup: PASS\nfailed sections: test_interfaces",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "failed sections: test_interfaces",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "aetest: Testcases and Sections is the key idea here: An aetest testcase is a Python class with sections that run in a fixed order: setup prepares, test checks one thing, and cleanup tidies up afterwards.",
        "approach": "Work through aetest: Testcases and Sections step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-pyats-m2-l2",
      "slug": "netauto-python-pyats-m2-l2",
      "title": "Writing Assertions for Network State",
      "concept": "A pyATS test asserts facts about the network, for example that the version equals 17.6.1 or that every interface is up, and a failed assertion fails the testcase. The assert statement is the mechanism: assert actual == expected stops the section with a clear message when the values differ. Writing those checks against a local facts dictionary is the same logic without a device, and this lesson practises it.",
      "syntax": "output = device.parse('show version')\nassert output['version'] == '17.6.1', 'wrong version'",
      "exampleCode": "facts = {'hostname': 'R1', 'version': '17.6.1', 'interfaces_up': 3, 'interfaces_total': 4}\nchecks = [\n    ('hostname is R1', facts['hostname'] == 'R1'),\n    ('version is 17.6.1', facts['version'] == '17.6.1'),\n    ('all interfaces up', facts['interfaces_up'] == facts['interfaces_total']),\n]\nfor name, passed in checks:\n    print(f\"{'PASS' if passed else 'FAIL'}: {name}\")",
      "exampleLanguage": "python",
      "mistake": "Asserting on the raw command output string instead of the parsed dictionary, so a formatting change breaks the test even when the network is fine.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Writing Assertions for Network State, but it does not work correctly.",
       "buggyCode": "output = device.execute('show version')\nassert '17.6.1' in output",
       "fixedCode": "output = device.parse('show version')\nassert output['version'] == '17.6.1'",
       "explanation": "String matching breaks when the output format changes; asserting on the parsed value tests the fact, not the formatting."
      },
      "exercise": {
       "title": "Practise Writing Assertions for Network State",
       "type": "write-code",
       "instructions": "Run the three checks against the facts dictionary and print one line per check: 'PASS: <name>' or 'FAIL: <name>', in list order.",
       "starterCode": "facts = {\"hostname\": \"R1\", \"version\": \"17.6.1\", \"interfaces_up\": 3, \"interfaces_total\": 4}\nchecks = [\n    (\"hostname is R1\", facts[\"hostname\"] == \"R1\"),\n    (\"version is 17.6.1\", facts[\"version\"] == \"17.6.1\"),\n    (\"all interfaces up\", facts[\"interfaces_up\"] == facts[\"interfaces_total\"]),\n]\n# TODO: complete the program below.\n",
       "solution": "facts = {\"hostname\": \"R1\", \"version\": \"17.6.1\", \"interfaces_up\": 3, \"interfaces_total\": 4}\nchecks = [\n    (\"hostname is R1\", facts[\"hostname\"] == \"R1\"),\n    (\"version is 17.6.1\", facts[\"version\"] == \"17.6.1\"),\n    (\"all interfaces up\", facts[\"interfaces_up\"] == facts[\"interfaces_total\"]),\n]\nfor name, passed in checks:\n    print(f\"{'PASS' if passed else 'FAIL'}: {name}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Writing Assertions for Network State technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: hostname is R1\nPASS: version is 17.6.1\nFAIL: all interfaces up",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "FAIL: all interfaces up",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Writing Assertions for Network State is the key idea here: A pyATS test asserts facts about the network, for example that the version equals 17.",
        "approach": "Work through Writing Assertions for Network State step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-pyats-m2-l3",
      "slug": "netauto-python-pyats-m2-l3",
      "title": "Parsing Output with Genie",
      "concept": "Genie parsers turn raw command output into structured Python dictionaries, and device.parse('show version') returns the parsed form instead of text. There is one parser per command per operating system, and the parsed keys are documented, so tests read output['version'] instead of searching strings. Parsing for real needs a device or saved output, and an unknown command raises an exception because no parser exists for it.",
      "syntax": "output = device.parse('show ip interface brief')\nprint(output['interface']['GigabitEthernet0/0']['status'])",
      "exampleCode": "output = device.parse('show version')\nprint(output['version'])\nprint(output['hostname'])",
      "exampleLanguage": "python",
      "mistake": "Using device.execute and string searching when a Genie parser exists for the command, which is slower and breaks on formatting changes.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Parsing Output with Genie, but it does not work correctly.",
       "buggyCode": "output = device.execute('show ip interface brief')\nassert 'up' in output",
       "fixedCode": "output = device.parse('show ip interface brief')\nassert output['interface']['GigabitEthernet0/0']['status'] == 'up'",
       "explanation": "The parser gives you the interface status as a dictionary value; searching the raw text cannot tell which interface the word 'up' belongs to."
      },
      "exercise": {
       "title": "Check your understanding: Parsing Output with Genie",
       "type": "multiple-choice",
       "instructions": "Which statement about Parsing Output with Genie is correct?",
       "starterCode": "",
       "solution": "Genie parsers turn raw command output into structured Python dictionaries, and device.",
       "solutionExplanation": "Genie parsers turn raw command output into structured Python dictionaries, and device. The other options are false: Parsing Output with Genie is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Genie parsers turn raw command output into structured Python dictionaries, and device.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Parsing Output with Genie from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Genie parsers turn raw command output into structured Python dictionaries, and device.",
        "Parsing Output with Genie is not available in Python",
        "Parsing Output with Genie only works on Windows",
        "Parsing Output with Genie was removed from Python in the latest version",
        "Parsing Output with Genie can only be used once in a program"
       ],
       "answerIndex": 0
      }
     },
     {
      "id": "netauto-python-pyats-m2-l4",
      "slug": "netauto-python-pyats-m2-l4",
      "title": "Testbeds Without Devices: Mock Data",
      "concept": "You can develop pyATS tests without devices by feeding them mock data shaped exactly like the parsed output a real device would return. The test code does not change: it reads the same dictionary keys, so a test that passes on mock data will run unchanged against the real parser output. Building that mock dictionary and running the same assertions on it is the honest way to practise test logic offline, and this lesson does exactly that.",
      "syntax": "mock = {'version': '17.6.1', 'hostname': 'R1', 'interface': {'GigabitEthernet0/0': {'status': 'up'}}}\nassert mock['version'] == '17.6.1'",
      "exampleCode": "mock = {\n    'hostname': 'R1',\n    'version': '17.6.1',\n    'interface': {\n        'GigabitEthernet0/0': {'status': 'up', 'protocol': 'up'},\n        'GigabitEthernet0/1': {'status': 'down', 'protocol': 'down'},\n    },\n}\nup = [name for name, data in mock['interface'].items() if data['status'] == 'up']\nprint(f\"hostname: {mock['hostname']}\")\nprint(f\"version: {mock['version']}\")\nprint(f\"up interfaces: {', '.join(up)}\")\nprint(f\"down interfaces: {len(mock['interface']) - len(up)}\")",
      "exampleLanguage": "python",
      "mistake": "Shaping mock data differently from the real parser output, so a test that passes on the mock fails on the device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testbeds Without Devices: Mock Data, but it does not work correctly.",
       "buggyCode": "mock = {'version': '17.6.1', 'interfaces': ['GigabitEthernet0/0']}",
       "fixedCode": "mock = {'version': '17.6.1', 'interface': {'GigabitEthernet0/0': {'status': 'up'}}}",
       "explanation": "Mock data must use the same keys and nesting as the Genie parser returns, or the test reads keys that do not exist on real output."
      },
      "exercise": {
       "title": "Practise Testbeds Without Devices: Mock Data",
       "type": "write-code",
       "instructions": "Run the test logic against the mock parsed output: print the hostname, the version, the up interfaces joined with ', ', and the count of down interfaces.",
       "starterCode": "mock = {\n    \"hostname\": \"R1\",\n    \"version\": \"17.6.1\",\n    \"interface\": {\n        \"GigabitEthernet0/0\": {\"status\": \"up\", \"protocol\": \"up\"},\n        \"GigabitEthernet0/1\": {\"status\": \"down\", \"protocol\": \"down\"},\n    },\n}\n# TODO: complete the program below.\n",
       "solution": "mock = {\n    \"hostname\": \"R1\",\n    \"version\": \"17.6.1\",\n    \"interface\": {\n        \"GigabitEthernet0/0\": {\"status\": \"up\", \"protocol\": \"up\"},\n        \"GigabitEthernet0/1\": {\"status\": \"down\", \"protocol\": \"down\"},\n    },\n}\nup = [name for name, data in mock[\"interface\"].items() if data[\"status\"] == \"up\"]\nprint(f\"hostname: {mock['hostname']}\")\nprint(f\"version: {mock['version']}\")\nprint(f\"up interfaces: {', '.join(up)}\")\nprint(f\"down interfaces: {len(mock['interface']) - len(up)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Testbeds Without Devices: Mock Data technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname: R1\nversion: 17.6.1\nup interfaces: GigabitEthernet0/0\ndown interfaces: 1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "down interfaces: 1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testbeds Without Devices: Mock Data is the key idea here: You can develop pyATS tests without devices by feeding them mock data shaped exactly like the parsed output a real device would return.",
        "approach": "Work through Testbeds Without Devices: Mock Data step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-pyats-m2-l5",
      "slug": "netauto-python-pyats-m2-l5",
      "title": "A pyATS Test End to End",
      "concept": "A complete pyATS run loads the testbed, connects to each device, runs the aetest testcases, and writes a report of pass and fail per testcase. You launch it with the pyats run job command, which finds the job file, runs it, and stores the results for later review. Running it end to end needs lab devices, but every piece, testbed, aetest sections, assertions, and Genie parsing, is covered in this track.",
      "syntax": "pyats run job job.py --testbed-file testbed.yaml",
      "exampleCode": "from pyats import aetest\nfrom genie.testbed import load\n\ntestbed = load('testbed.yaml')\n\nclass CheckVersion(aetest.Testcase):\n    @aetest.test\n    def test_version(self, testbed):\n        device = testbed.devices['r1']\n        device.connect()\n        assert device.parse('show version')['version'] == '17.6.1'",
      "exampleLanguage": "python",
      "mistake": "Running the test file directly with python instead of pyats run job, which skips the aetest runner and its reporting.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A pyATS Test End to End, but it does not work correctly.",
       "buggyCode": "$ python3 test_version.py",
       "fixedCode": "$ pyats run job job.py --testbed-file testbed.yaml",
       "explanation": "Running the file with plain python executes the code without the aetest runner, so sections, results, and reports are never produced."
      },
      "exercise": {
       "title": "Practise A pyATS Test End to End",
       "type": "write-code",
       "instructions": "Run a complete pyATS test over local data: build the testbed record, then run the check logic from the lesson's testcase over it - for each device, assert its recorded version equals the expected version. Print the testcase count, one '<device>: pass|fail' line per device in sorted order, then 'Passed: <n>/<total>'. This runs the assertion logic on local state dicts; connecting to real devices and running pyats run job need a lab.",
       "starterCode": "testbed = {\n    \"r1\": {\"os\": \"ios\", \"version\": \"17.6.1\"},\n    \"r2\": {\"os\": \"ios\", \"version\": \"17.6.1\"},\n}\nexpected_version = \"17.6.1\"\n# TODO: complete the program below.\n",
       "solution": "testbed = {\n    \"r1\": {\"os\": \"ios\", \"version\": \"17.6.1\"},\n    \"r2\": {\"os\": \"ios\", \"version\": \"17.6.1\"},\n}\nexpected_version = \"17.6.1\"\npassed = 0\nprint(f\"Testcases: {len(testbed)}\")\nfor name in sorted(testbed):\n    ok = testbed[name][\"version\"] == expected_version\n    if ok:\n        passed += 1\n    print(f\"{name}: {'pass' if ok else 'fail'}\")\nprint(f\"Passed: {passed}/{len(testbed)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A pyATS Test End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "Testcases: 2\nr1: pass\nr2: pass\nPassed: 2/2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Passed: 2/2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A pyATS Test End to End is the key idea here: A complete pyATS run loads the testbed, connects to each device, runs the aetest testcases, and writes a report of pass and fail per testcase.",
        "approach": "Work through A pyATS Test End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise pyATS Testbeds and aetest Capstone",
   "type": "write-code",
   "instructions": "Run an offline pyATS-style job: load the testbed YAML with yaml.safe_load and print one line per device in sorted order ('<name>: <os> <type> <cli ip>'), then run the three assertions against the mock parsed output and print 'PASS: <name>' or 'FAIL: <name>' per check, then print the section summary: run setup/test/cleanup in order recording PASS, PASS, PASS and print one '<section>: <result>' line each plus 'failed sections: none'. Testbed: r1 ios router 192.0.2.10, sw1 nxos switch 192.0.2.12. Mock: hostname R1, version 17.6.1, interfaces_up 4, interfaces_total 4. Checks: hostname is R1, version is 17.6.1, all interfaces up.",
   "starterCode": "import yaml\n\nTESTBED_YAML = \"\"\"\ndevices:\n  r1:\n    os: ios\n    type: router\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.10\n  sw1:\n    os: nxos\n    type: switch\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.12\n\"\"\"\nmock = {\"hostname\": \"R1\", \"version\": \"17.6.1\", \"interfaces_up\": 4, \"interfaces_total\": 4}\n# TODO: complete the capstone program below.\n",
   "solution": "import yaml\n\nTESTBED_YAML = \"\"\"\ndevices:\n  r1:\n    os: ios\n    type: router\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.10\n  sw1:\n    os: nxos\n    type: switch\n    connections:\n      cli:\n        protocol: ssh\n        ip: 192.0.2.12\n\"\"\"\nmock = {\"hostname\": \"R1\", \"version\": \"17.6.1\", \"interfaces_up\": 4, \"interfaces_total\": 4}\ntestbed = yaml.safe_load(TESTBED_YAML)\nfor name, device in sorted(testbed[\"devices\"].items()):\n    print(f\"{name}: {device['os']} {device['type']} {device['connections']['cli']['ip']}\")\nchecks = [\n    (\"hostname is R1\", mock[\"hostname\"] == \"R1\"),\n    (\"version is 17.6.1\", mock[\"version\"] == \"17.6.1\"),\n    (\"all interfaces up\", mock[\"interfaces_up\"] == mock[\"interfaces_total\"]),\n]\nfor name, passed in checks:\n    print(f\"{'PASS' if passed else 'FAIL'}: {name}\")\nfor section in [\"setup\", \"test\", \"cleanup\"]:\n    print(f\"{section}: PASS\")\nprint(\"failed sections: none\")\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "r1: ios router 192.0.2.10\nsw1: nxos switch 192.0.2.12\nPASS: hostname is R1\nPASS: version is 17.6.1\nPASS: all interfaces up\nsetup: PASS\ntest: PASS\ncleanup: PASS\nfailed sections: none",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "PASS: all interfaces up",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "pyATS Testbeds and aetest Capstone Project",
   "description": "A small end-to-end offline pyATS job: load a testbed, assert on mock parsed output, and summarise the sections.",
   "requirements": [
    "Use the core ideas of pyATS Testbeds and aetest in a working Python program.",
    "Load the testbed YAML and list every device.",
    "Run the three assertions against the mock parsed output.",
    "Print the section summary with no failures.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and loads the testbed and checks correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-textfsm",
  "slug": "netauto-python-textfsm",
  "language": "python",
  "category": "devops",
  "title": "Parsing CLI Output with TextFSM",
  "description": "Turn raw CLI text into structured data with TextFSM: templates, values, states, Continue, and full parsing pipelines on sample output.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "TextFSM",
   "Templates",
   "Values and states",
   "Continue",
   "Interface parsing",
   "Route parsing",
   "JSON output",
   "Regular expressions"
  ],
  "prerequisites": [
   "netauto-python-netmiko"
  ],
  "analogy": "Learning {topic} is like learning to read a timetable: the text looks like a wall of letters until you know which column means what.",
  "modules": [
   {
    "id": "netauto-python-textfsm-m1",
    "title": "Parsing CLI Output with TextFSM Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-textfsm-m1-l1",
      "slug": "netauto-python-textfsm-m1-l1",
      "title": "What Is TextFSM?",
      "concept": "TextFSM is a Python library that turns unstructured CLI output into structured data using a template of values and matching rules. You write a template that names the fields to capture, and TextFSM scans the text line by line, filling in the values and emitting one record per match. The sample text in these lessons is practice input for the parser, and the program's real output is the parsed structure it produces.",
      "syntax": "import textfsm\n\ntemplate = '''Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n'''",
      "exampleCode": "import io\nimport textfsm\n\nTEMPLATE = '''Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n'''\nSAMPLE = 'GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    print(f\"{row[0]}: {row[1]}\")",
      "exampleLanguage": "python",
      "mistake": "Writing a template that matches the header line of the output, so the header becomes a bogus data record.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Is TextFSM?, but it does not work correctly.",
       "buggyCode": "Start\n  ^${Interface} ${Status} -> Record  # also matches 'Interface Status'",
       "fixedCode": "Start\n  ^Interface Status -> Continue\n  ^${Interface} ${Status} -> Record",
       "explanation": "The header line matches the same pattern as the data lines, so it is captured as a record; a rule that skips the header first keeps it out."
      },
      "exercise": {
       "title": "Practise What Is TextFSM?",
       "type": "write-code",
       "instructions": "Parse the sample interface-status text with the TextFSM template: print one '<interface>: <status>' line per parsed row.",
       "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    print(f\"{row[0]}: {row[1]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What Is TextFSM? technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GigabitEthernet0/0: up\nGigabitEthernet0/1: down",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "GigabitEthernet0/1: down",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Is TextFSM? is the key idea here: TextFSM is a Python library that turns unstructured CLI output into structured data using a template of values and matching rules.",
        "approach": "Work through What Is TextFSM? step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-textfsm-m1-l2",
      "slug": "netauto-python-textfsm-m1-l2",
      "title": "TextFSM Templates: Values and States",
      "concept": "A TextFSM template has two parts: Value lines that declare the fields to capture with a regular expression, and states that hold the rules for matching lines. The Start state is where parsing begins, and each rule is a pattern with an action such as Record, which emits the current values as a row. A template with two values and one rule is enough to parse a simple two-column listing, which is what this lesson builds.",
      "syntax": "Value Name (\\S+)\nValue Age (\\d+)\n\nStart\n  ^${Name} ${Age} -> Record",
      "exampleCode": "import io\nimport textfsm\n\nTEMPLATE = '''Value Interface (\\\\S+)\nValue IP (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${IP} ${Status} -> Record\n'''\nSAMPLE = 'GigabitEthernet0/0 192.0.2.1 up\\nGigabitEthernet0/1 unassigned down\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    print(f\"{row[0]} {row[1]} {row[2]}\")",
      "exampleLanguage": "python",
      "mistake": "Declaring a Value with a pattern that is too greedy, such as (.+), so it swallows the rest of the line and later values stay empty.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate TextFSM Templates: Values and States, but it does not work correctly.",
       "buggyCode": "Value Interface (.+)\nValue Status (up|down)",
       "fixedCode": "Value Interface (\\\\S+)\nValue Status (up|down)",
       "explanation": "A greedy (.+) captures the whole line including the status, so the Status value never matches; \\S+ stops at the first space."
      },
      "exercise": {
       "title": "Practise TextFSM Templates: Values and States",
       "type": "write-code",
       "instructions": "Parse the sample three-column text with the template: print one '<interface> <ip> <status>' line per parsed row.",
       "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue IP (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${IP} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 192.0.2.1 up\\nGigabitEthernet0/1 unassigned down\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue IP (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${IP} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 192.0.2.1 up\\nGigabitEthernet0/1 unassigned down\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    print(f\"{row[0]} {row[1]} {row[2]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the TextFSM Templates: Values and States technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GigabitEthernet0/0 192.0.2.1 up\nGigabitEthernet0/1 unassigned down",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "GigabitEthernet0/1 unassigned down",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "TextFSM Templates: Values and States is the key idea here: A TextFSM template has two parts: Value lines that declare the fields to capture with a regular expression, and states that hold the rules for matching lines.",
        "approach": "Work through TextFSM Templates: Values and States step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-textfsm-m1-l3",
      "slug": "netauto-python-textfsm-m1-l3",
      "title": "Rules, Match, and Continue",
      "concept": "A TextFSM rule has a pattern and an action, and the two actions you use most are Record, which emits a row, and Continue, which keeps matching more rules on the same line. Continue.Record does both: it records the row and keeps matching, which is how one line can fill values from several rules. A template that collects three fields across three lines with Continue and records on the last one is the classic pattern, and this lesson builds it.",
      "syntax": "Value Model (\\S+)\nValue Version (\\S+)\n\nStart\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Record",
      "exampleCode": "import io\nimport textfsm\n\nTEMPLATE = '''Value Model (\\\\S+)\nValue Version (\\\\S+)\nValue Serial (\\\\S+)\n\nStart\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Continue\n  ^Serial: ${Serial} -> Record\n'''\nSAMPLE = 'Model: ISR4451\\nVersion: 17.6.1\\nSerial: FOC1234A5B6\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    print(f\"model={row[0]} version={row[1]} serial={row[2]}\")",
      "exampleLanguage": "python",
      "mistake": "Using Record on the first line of a multi-line record, which emits a half-empty row before the later values are filled in.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rules, Match, and Continue, but it does not work correctly.",
       "buggyCode": "Start\n  ^Model: ${Model} -> Record\n  ^Version: ${Version} -> Record",
       "fixedCode": "Start\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Record",
       "explanation": "Recording on the first line emits a row with the version still empty; Continue waits until the last line fills every value."
      },
      "exercise": {
       "title": "Practise Rules, Match, and Continue",
       "type": "write-code",
       "instructions": "Parse the three-line sample with the Continue template: print one line 'model=<model> version=<version> serial=<serial>'.",
       "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Model (\\\\S+)\nValue Version (\\\\S+)\nValue Serial (\\\\S+)\n\nStart\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Continue\n  ^Serial: ${Serial} -> Record\n\"\"\"\nSAMPLE = \"Model: ISR4451\\nVersion: 17.6.1\\nSerial: FOC1234A5B6\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Model (\\\\S+)\nValue Version (\\\\S+)\nValue Serial (\\\\S+)\n\nStart\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Continue\n  ^Serial: ${Serial} -> Record\n\"\"\"\nSAMPLE = \"Model: ISR4451\\nVersion: 17.6.1\\nSerial: FOC1234A5B6\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    print(f\"model={row[0]} version={row[1]} serial={row[2]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Rules, Match, and Continue technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "model=ISR4451 version=17.6.1 serial=FOC1234A5B6",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "serial=FOC1234A5B6",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rules, Match, and Continue is the key idea here: A TextFSM rule has a pattern and an action, and the two actions you use most are Record, which emits a row, and Continue, which keeps matching more rules on the same line.",
        "approach": "Work through Rules, Match, and Continue step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-textfsm-m1-l4",
      "slug": "netauto-python-textfsm-m1-l4",
      "title": "Parsing Interface Status",
      "concept": "The interface brief output lists one interface per line with its address, status, and protocol, and a TextFSM template captures those columns into records. The template skips the header line, matches each data line, and records the interface name, IP address, status, and protocol. Parsing this listing is the most common TextFSM job in network automation, and this lesson works through it on sample text.",
      "syntax": "Value Interface (\\S+)\nValue IP (\\S+)\nValue Status (up|down)\nValue Protocol (up|down)\n\nStart\n  ^Interface -> Continue\n  ^${Interface} ${IP} \\S+ \\S+ ${Status} ${Protocol} -> Record",
      "exampleCode": "import io\nimport textfsm\n\nTEMPLATE = '''Value Interface (\\\\S+)\nValue IP (\\\\S+)\nValue Status (up|down)\nValue Protocol (up|down)\n\nStart\n  ^Interface -> Continue\n  ^${Interface} ${IP} \\\\S+ \\\\S+ ${Status} ${Protocol} -> Record\n'''\nSAMPLE = 'Interface IP-Address OK? Method Status Protocol\\nGigabitEthernet0/0 192.0.2.1 YES manual up up\\nGigabitEthernet0/1 unassigned YES unset down down\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    print(f\"{row[0]} {row[1]} status={row[2]} protocol={row[3]}\")",
      "exampleLanguage": "python",
      "mistake": "Forgetting to skip the header line, so 'Interface' is captured as an interface name in the first record.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Parsing Interface Status, but it does not work correctly.",
       "buggyCode": "Start\n  ^${Interface} ${IP} \\\\S+ \\\\S+ ${Status} ${Protocol} -> Record",
       "fixedCode": "Start\n  ^Interface -> Continue\n  ^${Interface} ${IP} \\\\S+ \\\\S+ ${Status} ${Protocol} -> Record",
       "explanation": "The header line starts with 'Interface' and would match the data pattern; a rule that skips it first keeps the records clean."
      },
      "exercise": {
       "title": "Practise Parsing Interface Status",
       "type": "write-code",
       "instructions": "Parse the sample interface-brief text: print one line per interface, '<interface> <ip> status=<status> protocol=<protocol>'.",
       "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue IP (\\\\S+)\nValue Status (up|down)\nValue Protocol (up|down)\n\nStart\n  ^Interface -> Continue\n  ^${Interface} ${IP} \\\\S+ \\\\S+ ${Status} ${Protocol} -> Record\n\"\"\"\nSAMPLE = \"Interface IP-Address OK? Method Status Protocol\\nGigabitEthernet0/0 192.0.2.1 YES manual up up\\nGigabitEthernet0/1 unassigned YES unset down down\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue IP (\\\\S+)\nValue Status (up|down)\nValue Protocol (up|down)\n\nStart\n  ^Interface -> Continue\n  ^${Interface} ${IP} \\\\S+ \\\\S+ ${Status} ${Protocol} -> Record\n\"\"\"\nSAMPLE = \"Interface IP-Address OK? Method Status Protocol\\nGigabitEthernet0/0 192.0.2.1 YES manual up up\\nGigabitEthernet0/1 unassigned YES unset down down\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    print(f\"{row[0]} {row[1]} status={row[2]} protocol={row[3]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Parsing Interface Status technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GigabitEthernet0/0 192.0.2.1 status=up protocol=up\nGigabitEthernet0/1 unassigned status=down protocol=down",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "status=down protocol=down",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Parsing Interface Status is the key idea here: The interface brief output lists one interface per line with its address, status, and protocol, and a TextFSM template captures those columns into records.",
        "approach": "Work through Parsing Interface Status step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-textfsm-m1-l5",
      "slug": "netauto-python-textfsm-m1-l5",
      "title": "Parsing Routing Tables",
      "concept": "A routing table lists one route per line with a code, a network, and either a next hop or a directly-connected interface, and a TextFSM template captures those fields. Two rules handle the two shapes: one matches 'via <next hop>' lines and one matches 'is directly connected' lines, and both record a row. Routes with no next hop leave that value empty, which the code can read as a directly connected route, and this lesson shows that.",
      "syntax": "Value Code (\\S)\nValue Network (\\S+)\nValue NextHop (\\S+)\n\nStart\n  ^${Code} ${Network} .* via ${NextHop} -> Record\n  ^${Code} ${Network} is directly connected -> Record",
      "exampleCode": "import io\nimport textfsm\n\nTEMPLATE = '''Value Code (\\\\S)\nValue Network (\\\\S+)\nValue NextHop (\\\\S+)\n\nStart\n  ^${Code} ${Network} .* via ${NextHop} -> Record\n  ^${Code} ${Network} is directly connected -> Record\n'''\nSAMPLE = 'S 10.0.0.0/8 [1/0] via 192.0.2.1\\nC 192.0.2.0/24 is directly connected, GigabitEthernet0/0\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    next_hop = row[2] if row[2] else 'direct'\n    print(f\"{row[0]} {row[1]} via {next_hop}\")",
      "exampleLanguage": "python",
      "mistake": "Writing one rule that only matches 'via' lines, so directly connected routes silently disappear from the parsed result.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Parsing Routing Tables, but it does not work correctly.",
       "buggyCode": "Start\n  ^${Code} ${Network} .* via ${NextHop} -> Record",
       "fixedCode": "Start\n  ^${Code} ${Network} .* via ${NextHop} -> Record\n  ^${Code} ${Network} is directly connected -> Record",
       "explanation": "Directly connected routes have no 'via', so a single rule drops them; a second rule records them with an empty next hop."
      },
      "exercise": {
       "title": "Practise Parsing Routing Tables",
       "type": "write-code",
       "instructions": "Parse the sample routing table: print one line per route, '<code> <network> via <next hop>', using 'direct' when the next hop is empty.",
       "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Code (\\\\S)\nValue Network (\\\\S+)\nValue NextHop (\\\\S+)\n\nStart\n  ^${Code} ${Network} .* via ${NextHop} -> Record\n  ^${Code} ${Network} is directly connected -> Record\n\"\"\"\nSAMPLE = \"S 10.0.0.0/8 [1/0] via 192.0.2.1\\nC 192.0.2.0/24 is directly connected, GigabitEthernet0/0\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Code (\\\\S)\nValue Network (\\\\S+)\nValue NextHop (\\\\S+)\n\nStart\n  ^${Code} ${Network} .* via ${NextHop} -> Record\n  ^${Code} ${Network} is directly connected -> Record\n\"\"\"\nSAMPLE = \"S 10.0.0.0/8 [1/0] via 192.0.2.1\\nC 192.0.2.0/24 is directly connected, GigabitEthernet0/0\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nfor row in parser.ParseText(SAMPLE):\n    next_hop = row[2] if row[2] else \"direct\"\n    print(f\"{row[0]} {row[1]} via {next_hop}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Parsing Routing Tables technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "S 10.0.0.0/8 via 192.0.2.1\nC 192.0.2.0/24 via direct",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "via direct",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Parsing Routing Tables is the key idea here: A routing table lists one route per line with a code, a network, and either a next hop or a directly-connected interface, and a TextFSM template captures those fields.",
        "approach": "Work through Parsing Routing Tables step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-textfsm-m2",
    "title": "Parsing CLI Output with TextFSM in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-python-textfsm-m2-l1",
      "slug": "netauto-python-textfsm-m2-l1",
      "title": "Parsing Version Information",
      "concept": "Version output mixes model, software version, and serial number across several lines, and a TextFSM template with Continue collects them into one record. Each rule captures one field and continues, and the last rule records the completed row. The parsed record is then easy to check, for example asserting the version equals the expected release, which is what this lesson does.",
      "syntax": "Value Model (\\S+)\nValue Version (\\S+)\nValue Serial (\\S+)\n\nStart\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Continue\n  ^Serial: ${Serial} -> Record",
      "exampleCode": "import io\nimport textfsm\n\nTEMPLATE = '''Value Model (\\\\S+)\nValue Version (\\\\S+)\nValue Serial (\\\\S+)\n\nStart\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Continue\n  ^Serial: ${Serial} -> Record\n'''\nSAMPLE = 'Model: ISR4451\\nVersion: 17.6.1\\nSerial: FOC1234A5B6\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrows = parser.ParseText(SAMPLE)\nmodel, version, serial = rows[0]\nexpected = '17.6.1'\nprint(f\"model: {model}\")\nprint(f\"version: {version} ({'MATCH' if version == expected else 'MISMATCH'})\")\nprint(f\"serial: {serial}\")",
      "exampleLanguage": "python",
      "mistake": "Matching the version line with a pattern that also matches the image filename, so the wrong string is captured as the version.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Parsing Version Information, but it does not work correctly.",
       "buggyCode": "Start\n  ^.*Version (\\\\S+) -> Record  # also matches the image line",
       "fixedCode": "Start\n  ^Version: ${Version} -> Record",
       "explanation": "A loose pattern matches the first line containing the word Version, which may be the image filename; anchoring on 'Version:' matches only the version line."
      },
      "exercise": {
       "title": "Practise Parsing Version Information",
       "type": "write-code",
       "instructions": "Parse the sample version text and check the version against the expected release 17.6.1. Print 'model: <model>', 'version: <version> (MATCH|MISMATCH)', and 'serial: <serial>'.",
       "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Model (\\\\S+)\nValue Version (\\\\S+)\nValue Serial (\\\\S+)\n\nStart\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Continue\n  ^Serial: ${Serial} -> Record\n\"\"\"\nSAMPLE = \"Model: ISR4451\\nVersion: 17.6.1\\nSerial: FOC1234A5B6\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Model (\\\\S+)\nValue Version (\\\\S+)\nValue Serial (\\\\S+)\n\nStart\n  ^Model: ${Model} -> Continue\n  ^Version: ${Version} -> Continue\n  ^Serial: ${Serial} -> Record\n\"\"\"\nSAMPLE = \"Model: ISR4451\\nVersion: 17.6.1\\nSerial: FOC1234A5B6\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrows = parser.ParseText(SAMPLE)\nmodel, version, serial = rows[0]\nexpected = \"17.6.1\"\nprint(f\"model: {model}\")\nprint(f\"version: {version} ({'MATCH' if version == expected else 'MISMATCH'})\")\nprint(f\"serial: {serial}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Parsing Version Information technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "model: ISR4451\nversion: 17.6.1 (MATCH)\nserial: FOC1234A5B6",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "version: 17.6.1 (MATCH)",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Parsing Version Information is the key idea here: Version output mixes model, software version, and serial number across several lines, and a TextFSM template with Continue collects them into one record.",
        "approach": "Work through Parsing Version Information step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-textfsm-m2-l2",
      "slug": "netauto-python-textfsm-m2-l2",
      "title": "From Parsed Data to Structured Data",
      "concept": "TextFSM returns rows as lists of strings, and the useful step is converting each row into a dictionary with the field names as keys. The parser's header attribute holds the field names in order, so zip(parser.header, row) builds the dictionary for each row. Once the data is a list of dictionaries you can dump it to JSON, filter it, or feed it to the next step of the pipeline, which is what this lesson does.",
      "syntax": "parser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrows = parser.ParseText(SAMPLE)\nrecords = [dict(zip(parser.header, row)) for row in rows]\nprint(json.dumps(records, indent=2))",
      "exampleCode": "import io\nimport json\nimport textfsm\n\nTEMPLATE = '''Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n'''\nSAMPLE = 'GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrecords = [dict(zip(parser.header, row)) for row in parser.ParseText(SAMPLE)]\nfor record in records:\n    print(json.dumps(record))",
      "exampleLanguage": "python",
      "mistake": "Using the row list positions directly everywhere, so adding a field to the template silently shifts every index and breaks the code.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate From Parsed Data to Structured Data, but it does not work correctly.",
       "buggyCode": "for row in parser.ParseText(SAMPLE):\n    print(row[0], row[1])  # breaks if a field is added",
       "fixedCode": "records = [dict(zip(parser.header, row)) for row in parser.ParseText(SAMPLE)]\nfor record in records:\n    print(record['Interface'], record['Status'])",
       "explanation": "Positional indexes break when the template gains a field; dictionaries keyed by the header names keep working."
      },
      "exercise": {
       "title": "Practise From Parsed Data to Structured Data",
       "type": "write-code",
       "instructions": "Parse the sample text, convert each row to a dictionary with dict(zip(parser.header, row)), and print one JSON object per record.",
       "starterCode": "import io\nimport json\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport json\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrecords = [dict(zip(parser.header, row)) for row in parser.ParseText(SAMPLE)]\nfor record in records:\n    print(json.dumps(record))\n",
       "solutionExplanation": "The solution builds the required data, applies the From Parsed Data to Structured Data technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "{\"Interface\": \"GigabitEthernet0/0\", \"Status\": \"up\"}\n{\"Interface\": \"GigabitEthernet0/1\", \"Status\": \"down\"}",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "\"Status\": \"down\"",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "From Parsed Data to Structured Data is the key idea here: TextFSM returns rows as lists of strings, and the useful step is converting each row into a dictionary with the field names as keys.",
        "approach": "Work through From Parsed Data to Structured Data step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-textfsm-m2-l3",
      "slug": "netauto-python-textfsm-m2-l3",
      "title": "TextFSM vs Regular Expressions",
      "concept": "TextFSM is built on regular expressions, and for a one-off extraction a plain re.search is often simpler than writing a template. The re module's findall returns every match of a pattern, and named groups, (?P<name>...), give the matches readable names. Knowing when a quick regex is enough and when a template is worth it is the practical skill, and this lesson does the same extraction both ways in spirit, with regex here.",
      "syntax": "import re\nmatches = re.findall(r'(\\S+)\\s+(up|down)', text)",
      "exampleCode": "import re\n\nSAMPLE = 'GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n'\nfor match in re.finditer(r'(?P<interface>\\S+)\\s+(?P<status>up|down)', SAMPLE):\n    print(f\"{match.group('interface')}: {match.group('status')}\")",
      "exampleLanguage": "python",
      "mistake": "Using re.match on a line that has leading spaces, which fails because match only tries at the start of the string.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate TextFSM vs Regular Expressions, but it does not work correctly.",
       "buggyCode": "for line in SAMPLE.splitlines():\n    m = re.match(r'(\\S+) (up|down)', line)",
       "fixedCode": "for line in SAMPLE.splitlines():\n    m = re.search(r'(\\S+)\\s+(up|down)', line)",
       "explanation": "re.match anchors at the start of the string, so leading spaces break it; re.search finds the pattern anywhere in the line."
      },
      "exercise": {
       "title": "Practise TextFSM vs Regular Expressions",
       "type": "write-code",
       "instructions": "Extract the interface and status from each line of the sample text with a single regular expression using named groups. Print one '<interface>: <status>' line per match.",
       "starterCode": "import re\n\nSAMPLE = \"GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n\"\n# TODO: complete the program below.\n",
       "solution": "import re\n\nSAMPLE = \"GigabitEthernet0/0 up\\nGigabitEthernet0/1 down\\n\"\nfor match in re.finditer(r\"(?P<interface>\\S+)\\s+(?P<status>up|down)\", SAMPLE):\n    print(f\"{match.group('interface')}: {match.group('status')}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the TextFSM vs Regular Expressions technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "GigabitEthernet0/0: up\nGigabitEthernet0/1: down",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "GigabitEthernet0/1: down",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "TextFSM vs Regular Expressions is the key idea here: TextFSM is built on regular expressions, and for a one-off extraction a plain re.",
        "approach": "Work through TextFSM vs Regular Expressions step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-textfsm-m2-l4",
      "slug": "netauto-python-textfsm-m2-l4",
      "title": "Handling Unmatched Lines",
      "concept": "Real command output contains lines a template does not care about, such as blank lines, notes, and footers, and TextFSM silently skips lines that match no rule. That is usually what you want, but you should still count what was skipped, so a template that matches nothing does not look like an empty device. Comparing the number of input lines with the number of parsed rows tells you how much was skipped, and this lesson does exactly that.",
      "syntax": "parser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrows = parser.ParseText(SAMPLE)\nprint('parsed:', len(rows))",
      "exampleCode": "import io\nimport textfsm\n\nTEMPLATE = '''Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n'''\nSAMPLE = 'GigabitEthernet0/0 up\\nNote: one interface is down for maintenance\\nGigabitEthernet0/1 down\\n\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nlines = [line for line in SAMPLE.splitlines() if line.strip()]\nrows = parser.ParseText(SAMPLE)\nprint(f\"parsed rows: {len(rows)}\")\nprint(f\"skipped lines: {len(lines) - len(rows)}\")\nfor row in rows:\n    print(f\"{row[0]}: {row[1]}\")",
      "exampleLanguage": "python",
      "mistake": "Assuming every input line produced a row, so a template that matches nothing is mistaken for a device with no interfaces.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handling Unmatched Lines, but it does not work correctly.",
       "buggyCode": "rows = parser.ParseText(SAMPLE)\nprint('interfaces:', len(rows))  # 0 looks like no interfaces",
       "fixedCode": "rows = parser.ParseText(SAMPLE)\nlines = [l for l in SAMPLE.splitlines() if l.strip()]\nprint(f\"parsed rows: {len(rows)} of {len(lines)} lines\")",
       "explanation": "Zero rows can mean an empty device or a broken template; comparing rows against input lines tells you how much was skipped."
      },
      "exercise": {
       "title": "Practise Handling Unmatched Lines",
       "type": "write-code",
       "instructions": "Parse the sample text, counting only non-blank lines as input. Print 'parsed rows: <n>', 'skipped lines: <n>', then one '<interface>: <status>' line per parsed row.",
       "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 up\\nNote: one interface is down for maintenance\\nGigabitEthernet0/1 down\\n\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 up\\nNote: one interface is down for maintenance\\nGigabitEthernet0/1 down\\n\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nlines = [line for line in SAMPLE.splitlines() if line.strip()]\nrows = parser.ParseText(SAMPLE)\nprint(f\"parsed rows: {len(rows)}\")\nprint(f\"skipped lines: {len(lines) - len(rows)}\")\nfor row in rows:\n    print(f\"{row[0]}: {row[1]}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Handling Unmatched Lines technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "parsed rows: 2\nskipped lines: 1\nGigabitEthernet0/0: up\nGigabitEthernet0/1: down",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "skipped lines: 1",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Handling Unmatched Lines is the key idea here: Real command output contains lines a template does not care about, such as blank lines, notes, and footers, and TextFSM silently skips lines that match no rule.",
        "approach": "Work through Handling Unmatched Lines step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-textfsm-m2-l5",
      "slug": "netauto-python-textfsm-m2-l5",
      "title": "A Parsing Pipeline End to End",
      "concept": "A complete parsing pipeline has three steps: parse the raw text into records, filter the records to the ones you care about, and summarise them into a short report. Each step is plain Python on lists and dictionaries, so you can test each one on its own before chaining them. This lesson chains all three on sample interface text and prints the summary a nightly report would carry.",
      "syntax": "rows = parser.ParseText(SAMPLE)\nup = [r for r in rows if r[1] == 'up']\nprint(f\"{len(up)} up, {len(rows) - len(up)} down\")",
      "exampleCode": "import io\nimport textfsm\n\nTEMPLATE = '''Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n'''\nSAMPLE = 'GigabitEthernet0/0 up\\nGigabitEthernet0/1 up\\nGigabitEthernet0/2 down\\n'\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrecords = [dict(zip(parser.header, row)) for row in parser.ParseText(SAMPLE)]\nup = [r for r in records if r['Status'] == 'up']\ndown = [r for r in records if r['Status'] == 'down']\nprint(f\"total interfaces: {len(records)}\")\nprint(f\"up: {', '.join(r['Interface'] for r in up)}\")\nprint(f\"down: {', '.join(r['Interface'] for r in down)}\")",
      "exampleLanguage": "python",
      "mistake": "Filtering the raw text before parsing, which throws away lines the template needs to tell data apart from headers.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Parsing Pipeline End to End, but it does not work correctly.",
       "buggyCode": "lines = [l for l in SAMPLE.splitlines() if 'up' in l]\nrows = parser.ParseText('\\n'.join(lines))",
       "fixedCode": "records = [dict(zip(parser.header, row)) for row in parser.ParseText(SAMPLE)]\nup = [r for r in records if r['Status'] == 'up']",
       "explanation": "Filtering raw text first can remove the context the template needs; parse everything, then filter the structured records."
      },
      "exercise": {
       "title": "Practise A Parsing Pipeline End to End",
       "type": "write-code",
       "instructions": "Run the full pipeline on the sample text: parse it, convert rows to dictionaries, then print 'total interfaces: <n>', 'up: <names>', and 'down: <names>'.",
       "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 up\\nGigabitEthernet0/1 up\\nGigabitEthernet0/2 down\\n\"\n# TODO: complete the program below.\n",
       "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue Status (up|down)\n\nStart\n  ^${Interface} ${Status} -> Record\n\"\"\"\nSAMPLE = \"GigabitEthernet0/0 up\\nGigabitEthernet0/1 up\\nGigabitEthernet0/2 down\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrecords = [dict(zip(parser.header, row)) for row in parser.ParseText(SAMPLE)]\nup = [r for r in records if r[\"Status\"] == \"up\"]\ndown = [r for r in records if r[\"Status\"] == \"down\"]\nprint(f\"total interfaces: {len(records)}\")\nprint(f\"up: {', '.join(r['Interface'] for r in up)}\")\nprint(f\"down: {', '.join(r['Interface'] for r in down)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A Parsing Pipeline End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "total interfaces: 3\nup: GigabitEthernet0/0, GigabitEthernet0/1\ndown: GigabitEthernet0/2",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "down: GigabitEthernet0/2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Parsing Pipeline End to End is the key idea here: A complete parsing pipeline has three steps: parse the raw text into records, filter the records to the ones you care about, and summarise them into a short report.",
        "approach": "Work through A Parsing Pipeline End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise Parsing CLI Output with TextFSM Capstone",
   "type": "write-code",
   "instructions": "Parse the sample interface-brief text with the TextFSM template (skip the header, capture interface, IP, status, protocol), convert the rows to dictionaries, and print a report: 'total interfaces: <n>', then one line per interface '<interface> <ip> status=<status> protocol=<protocol>', then 'up: <names>' and 'down: <names>'. Sample lines: header 'Interface IP-Address OK? Method Status Protocol', 'GigabitEthernet0/0 192.0.2.1 YES manual up up', 'GigabitEthernet0/1 unassigned YES unset down down', 'GigabitEthernet0/2 192.0.2.2 YES manual up up'.",
   "starterCode": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue IP (\\\\S+)\nValue Status (up|down)\nValue Protocol (up|down)\n\nStart\n  ^Interface -> Continue\n  ^${Interface} ${IP} \\\\S+ \\\\S+ ${Status} ${Protocol} -> Record\n\"\"\"\nSAMPLE = \"Interface IP-Address OK? Method Status Protocol\\nGigabitEthernet0/0 192.0.2.1 YES manual up up\\nGigabitEthernet0/1 unassigned YES unset down down\\nGigabitEthernet0/2 192.0.2.2 YES manual up up\\n\"\n# TODO: complete the capstone program below.\n",
   "solution": "import io\nimport textfsm\n\nTEMPLATE = \"\"\"Value Interface (\\\\S+)\nValue IP (\\\\S+)\nValue Status (up|down)\nValue Protocol (up|down)\n\nStart\n  ^Interface -> Continue\n  ^${Interface} ${IP} \\\\S+ \\\\S+ ${Status} ${Protocol} -> Record\n\"\"\"\nSAMPLE = \"Interface IP-Address OK? Method Status Protocol\\nGigabitEthernet0/0 192.0.2.1 YES manual up up\\nGigabitEthernet0/1 unassigned YES unset down down\\nGigabitEthernet0/2 192.0.2.2 YES manual up up\\n\"\nparser = textfsm.TextFSM(io.StringIO(TEMPLATE))\nrecords = [dict(zip(parser.header, row)) for row in parser.ParseText(SAMPLE)]\nprint(f\"total interfaces: {len(records)}\")\nfor record in records:\n    print(f\"{record['Interface']} {record['IP']} status={record['Status']} protocol={record['Protocol']}\")\nup = [r[\"Interface\"] for r in records if r[\"Status\"] == \"up\"]\ndown = [r[\"Interface\"] for r in records if r[\"Status\"] == \"down\"]\nprint(f\"up: {', '.join(up)}\")\nprint(f\"down: {', '.join(down)}\")\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "total interfaces: 3\nGigabitEthernet0/0 192.0.2.1 status=up protocol=up\nGigabitEthernet0/1 unassigned status=down protocol=down\nGigabitEthernet0/2 192.0.2.2 status=up protocol=up\nup: GigabitEthernet0/0, GigabitEthernet0/2\ndown: GigabitEthernet0/1",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "down: GigabitEthernet0/1",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "Parsing CLI Output with TextFSM Capstone Project",
   "description": "A small end-to-end parsing pipeline: parse an interface brief, convert rows to dictionaries, and print a summary report.",
   "requirements": [
    "Use the core ideas of Parsing CLI Output with TextFSM in a working Python program.",
    "Parse the sample interface brief with a TextFSM template.",
    "Convert the parsed rows to dictionaries.",
    "Print one detail line per interface plus up/down summary lines.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and parses the sample text correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-network-data",
  "slug": "netauto-python-network-data",
  "language": "python",
  "category": "devops",
  "title": "Network Data with Python",
  "description": "Work with network data in pure Python: ipaddress calculations, JSON and YAML, Jinja2 config templates, diffs, and validation checks.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "ipaddress",
   "Subnetting",
   "Validation",
   "JSON",
   "YAML",
   "Jinja2",
   "Templates",
   "difflib"
  ],
  "prerequisites": [],
  "analogy": "Learning {topic} is like learning to keep a ledger: once the numbers are in order, every decision that follows is easy to check.",
  "modules": [
   {
    "id": "netauto-python-network-data-m1",
    "title": "Network Data with Python Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-network-data-m1-l1",
      "slug": "netauto-python-network-data-m1-l1",
      "title": "IP Addresses with the ipaddress Module",
      "concept": "Python's ipaddress module represents addresses and networks as objects, and ip_network('192.0.2.0/24') knows its network address, broadcast address, and how many hosts it holds. The module validates input for you: an address outside the range raises a ValueError instead of silently producing a wrong answer. Every later lesson in this track builds on these objects, so this lesson practises the basic calculations.",
      "syntax": "import ipaddress\nnetwork = ipaddress.ip_network('192.0.2.0/24')\nprint(network.network_address, network.broadcast_address, network.num_addresses)",
      "exampleCode": "import ipaddress\n\nnetwork = ipaddress.ip_network('192.0.2.0/24')\nprint(f\"network: {network.network_address}\")\nprint(f\"broadcast: {network.broadcast_address}\")\nprint(f\"addresses: {network.num_addresses}\")\nprint(f\"hosts: {len(list(network.hosts()))}\")",
      "exampleLanguage": "python",
      "mistake": "Computing the broadcast address by adding 255 to the last octet by hand, which breaks for any prefix other than /24.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate IP Addresses with the ipaddress Module, but it does not work correctly.",
       "buggyCode": "network = '192.0.2.0/24'\nlast = int(network.split('.')[3].split('/')[0]) + 255\nprint(f\"broadcast: 192.0.2.{last}\")",
       "fixedCode": "import ipaddress\nnetwork = ipaddress.ip_network('192.0.2.0/24')\nprint(f\"broadcast: {network.broadcast_address}\")",
       "explanation": "Hand arithmetic assumes a /24; the ipaddress module computes the broadcast correctly for any prefix length."
      },
      "exercise": {
       "title": "Practise IP Addresses with the ipaddress Module",
       "type": "write-code",
       "instructions": "For the network 192.0.2.0/24, print 'network: <address>', 'broadcast: <address>', 'addresses: <count>', and 'hosts: <count>' using the ipaddress module.",
       "starterCode": "import ipaddress\n\nnetwork = ipaddress.ip_network(\"192.0.2.0/24\")\n# TODO: complete the program below.\n",
       "solution": "import ipaddress\n\nnetwork = ipaddress.ip_network(\"192.0.2.0/24\")\nprint(f\"network: {network.network_address}\")\nprint(f\"broadcast: {network.broadcast_address}\")\nprint(f\"addresses: {network.num_addresses}\")\nprint(f\"hosts: {len(list(network.hosts()))}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the IP Addresses with the ipaddress Module technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "network: 192.0.2.0\nbroadcast: 192.0.2.255\naddresses: 256\nhosts: 254",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "hosts: 254",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "IP Addresses with the ipaddress Module is the key idea here: Python's ipaddress module represents addresses and networks as objects, and ip_network('192.",
        "approach": "Work through IP Addresses with the ipaddress Module step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-network-data-m1-l2",
      "slug": "netauto-python-network-data-m1-l2",
      "title": "Subnetting in Python",
      "concept": "The subnets method of an ip_network splits it into smaller networks of a longer prefix, and list(network.subnets(new_prefix=26)) gives every /26 inside a /24. There are exactly four /26 networks inside a /24, because each extra prefix bit doubles the count. Generating the subnets in code removes the arithmetic errors that hand subnetting invites, and this lesson practises it.",
      "syntax": "import ipaddress\nnetwork = ipaddress.ip_network('192.0.2.0/24')\nfor subnet in network.subnets(new_prefix=26):\n    print(subnet)",
      "exampleCode": "import ipaddress\n\nnetwork = ipaddress.ip_network('192.0.2.0/24')\nfor subnet in network.subnets(new_prefix=26):\n    print(subnet)",
      "exampleLanguage": "python",
      "mistake": "Forgetting that subnets() returns an iterator, so iterating it twice gives an empty result the second time.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Subnetting in Python, but it does not work correctly.",
       "buggyCode": "subs = network.subnets(new_prefix=26)\nprint(len(list(subs)))\nprint(list(subs))  # empty!",
       "fixedCode": "subs = list(network.subnets(new_prefix=26))\nprint(len(subs))\nfor subnet in subs:\n    print(subnet)",
       "explanation": "subnets() returns a one-shot iterator; converting it to a list first lets you use the subnets as many times as you like."
      },
      "exercise": {
       "title": "Practise Subnetting in Python",
       "type": "write-code",
       "instructions": "Split 192.0.2.0/24 into /26 subnets with subnets(new_prefix=26) and print one subnet per line, in order.",
       "starterCode": "import ipaddress\n\nnetwork = ipaddress.ip_network(\"192.0.2.0/24\")\n# TODO: complete the program below.\n",
       "solution": "import ipaddress\n\nnetwork = ipaddress.ip_network(\"192.0.2.0/24\")\nfor subnet in network.subnets(new_prefix=26):\n    print(subnet)\n",
       "solutionExplanation": "The solution builds the required data, applies the Subnetting in Python technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "192.0.2.0/26\n192.0.2.64/26\n192.0.2.128/26\n192.0.2.192/26",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "192.0.2.192/26",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Subnetting in Python is the key idea here: The subnets method of an ip_network splits it into smaller networks of a longer prefix, and list(network.",
        "approach": "Work through Subnetting in Python step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-network-data-m1-l3",
      "slug": "netauto-python-network-data-m1-l3",
      "title": "Validating Network Input",
      "concept": "Validation means checking input before using it, and the ipaddress module does it by raising ValueError for anything that is not a real address or network. A try/except around ip_address or ip_network turns bad input into a clear error message instead of a crash or a wrong configuration. Validating an inventory of addresses and prefixes is exactly the check a real automation job runs first, and this lesson practises it.",
      "syntax": "import ipaddress\ntry:\n    ipaddress.ip_address('999.1.1.1')\nexcept ValueError:\n    print('bad address')",
      "exampleCode": "import ipaddress\n\ncandidates = ['192.0.2.10', '999.1.1.1', '10.0.0.0/8', '10.0.0.0/33']\nfor candidate in candidates:\n    try:\n        if '/' in candidate:\n            ipaddress.ip_network(candidate)\n        else:\n            ipaddress.ip_address(candidate)\n        print(f\"{candidate}: valid\")\n    except ValueError:\n        print(f\"{candidate}: invalid\")",
      "exampleLanguage": "python",
      "mistake": "Checking an address with a regular expression instead of ipaddress, which accepts values like 999.1.1.1 that no real host can use.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Validating Network Input, but it does not work correctly.",
       "buggyCode": "import re\nprint(bool(re.match(r'\\d+\\.\\d+\\.\\d+\\.\\d+', '999.1.1.1')))",
       "fixedCode": "import ipaddress\ntry:\n    ipaddress.ip_address('999.1.1.1')\nexcept ValueError:\n    print('invalid')",
       "explanation": "A regex checks the shape, not the range, so 999 passes; ip_address checks every octet is 0-255 and rejects it."
      },
      "exercise": {
       "title": "Practise Validating Network Input",
       "type": "write-code",
       "instructions": "Validate each candidate: addresses with ip_address, prefixes with ip_network. Print '<candidate>: valid' or '<candidate>: invalid' for each, in list order.",
       "starterCode": "import ipaddress\n\ncandidates = [\"192.0.2.10\", \"999.1.1.1\", \"10.0.0.0/8\", \"10.0.0.0/33\"]\n# TODO: complete the program below.\n",
       "solution": "import ipaddress\n\ncandidates = [\"192.0.2.10\", \"999.1.1.1\", \"10.0.0.0/8\", \"10.0.0.0/33\"]\nfor candidate in candidates:\n    try:\n        if \"/\" in candidate:\n            ipaddress.ip_network(candidate)\n        else:\n            ipaddress.ip_address(candidate)\n        print(f\"{candidate}: valid\")\n    except ValueError:\n        print(f\"{candidate}: invalid\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Validating Network Input technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "192.0.2.10: valid\n999.1.1.1: invalid\n10.0.0.0/8: valid\n10.0.0.0/33: invalid",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "10.0.0.0/33: invalid",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating Network Input is the key idea here: Validation means checking input before using it, and the ipaddress module does it by raising ValueError for anything that is not a real address or network.",
        "approach": "Work through Validating Network Input step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-network-data-m1-l4",
      "slug": "netauto-python-network-data-m1-l4",
      "title": "Working with JSON Network Data",
      "concept": "JSON is the format most network APIs return, and Python's json module turns it into dictionaries and lists with json.loads. Once loaded, the data is ordinary Python: you read device['hostname'] or loop over device['interfaces'] the same way as any dictionary. Loading a device facts document from JSON and summarising it is everyday automation work, and this lesson practises it.",
      "syntax": "import json\ndata = json.loads('{\"hostname\": \"R1\", \"model\": \"ISR4451\"}')\nprint(data['hostname'])",
      "exampleCode": "import json\n\nFACTS_JSON = '{\"hostname\": \"R1\", \"model\": \"ISR4451\", \"interfaces\": {\"GigabitEthernet0/0\": {\"status\": \"up\"}, \"GigabitEthernet0/1\": {\"status\": \"down\"}}}'\nfacts = json.loads(FACTS_JSON)\nprint(f\"hostname: {facts['hostname']}\")\nprint(f\"model: {facts['model']}\")\nfor name, data in sorted(facts['interfaces'].items()):\n    print(f\"{name}: {data['status']}\")",
      "exampleLanguage": "python",
      "mistake": "Using json.loads on a string that is already a dictionary, which raises a TypeError because loads expects text.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Working with JSON Network Data, but it does not work correctly.",
       "buggyCode": "facts = {'hostname': 'R1'}\nprint(json.loads(facts))",
       "fixedCode": "facts = json.loads('{\"hostname\": \"R1\"}')\nprint(facts['hostname'])",
       "explanation": "json.loads parses text into data; passing it an already-parsed dictionary is a type error, so only call it on strings."
      },
      "exercise": {
       "title": "Practise Working with JSON Network Data",
       "type": "write-code",
       "instructions": "Load the facts JSON with json.loads and print the hostname, the model, then one '<interface>: <status>' line per interface in sorted order.",
       "starterCode": "import json\n\nFACTS_JSON = '{\"hostname\": \"R1\", \"model\": \"ISR4451\", \"interfaces\": {\"GigabitEthernet0/0\": {\"status\": \"up\"}, \"GigabitEthernet0/1\": {\"status\": \"down\"}}}'\n# TODO: complete the program below.\n",
       "solution": "import json\n\nFACTS_JSON = '{\"hostname\": \"R1\", \"model\": \"ISR4451\", \"interfaces\": {\"GigabitEthernet0/0\": {\"status\": \"up\"}, \"GigabitEthernet0/1\": {\"status\": \"down\"}}}'\nfacts = json.loads(FACTS_JSON)\nprint(f\"hostname: {facts['hostname']}\")\nprint(f\"model: {facts['model']}\")\nfor name, data in sorted(facts[\"interfaces\"].items()):\n    print(f\"{name}: {data['status']}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Working with JSON Network Data technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname: R1\nmodel: ISR4451\nGigabitEthernet0/0: up\nGigabitEthernet0/1: down",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "GigabitEthernet0/1: down",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Working with JSON Network Data is the key idea here: JSON is the format most network APIs return, and Python's json module turns it into dictionaries and lists with json.",
        "approach": "Work through Working with JSON Network Data step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-network-data-m1-l5",
      "slug": "netauto-python-network-data-m1-l5",
      "title": "YAML for Network Configuration",
      "concept": "YAML is the format most network automation uses for inventories and variables, because it is readable and supports nested data. Python reads it with yaml.safe_load, which returns dictionaries and lists, and safe_load is the call to use because it refuses to construct arbitrary Python objects. Loading a device variables file and reading its values is the first step of a templating job, and this lesson practises it.",
      "syntax": "import yaml\nvars = yaml.safe_load('hostname: R1\\nmgmt_ip: 192.0.2.10\\n')\nprint(vars['hostname'])",
      "exampleCode": "import yaml\n\nVARS_YAML = '''\nhostname: R1\nmgmt_ip: 192.0.2.10\ninterfaces:\n  - name: GigabitEthernet0/0\n    description: Uplink to core\n  - name: GigabitEthernet0/1\n    description: Link to branch\n'''\nvars = yaml.safe_load(VARS_YAML)\nprint(f\"hostname: {vars['hostname']}\")\nprint(f\"mgmt_ip: {vars['mgmt_ip']}\")\nfor interface in vars['interfaces']:\n    print(f\"{interface['name']}: {interface['description']}\")",
      "exampleLanguage": "python",
      "mistake": "Using yaml.load without a Loader, which is unsafe and raises an error in recent PyYAML versions.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate YAML for Network Configuration, but it does not work correctly.",
       "buggyCode": "vars = yaml.load(VARS_YAML)",
       "fixedCode": "vars = yaml.safe_load(VARS_YAML)",
       "explanation": "yaml.load without a Loader can construct arbitrary objects and is blocked by default; safe_load only builds plain data."
      },
      "exercise": {
       "title": "Practise YAML for Network Configuration",
       "type": "write-code",
       "instructions": "Load the variables YAML with yaml.safe_load and print the hostname, the management IP, then one '<name>: <description>' line per interface, in file order.",
       "starterCode": "import yaml\n\nVARS_YAML = \"\"\"\nhostname: R1\nmgmt_ip: 192.0.2.10\ninterfaces:\n  - name: GigabitEthernet0/0\n    description: Uplink to core\n  - name: GigabitEthernet0/1\n    description: Link to branch\n\"\"\"\n# TODO: complete the program below.\n",
       "solution": "import yaml\n\nVARS_YAML = \"\"\"\nhostname: R1\nmgmt_ip: 192.0.2.10\ninterfaces:\n  - name: GigabitEthernet0/0\n    description: Uplink to core\n  - name: GigabitEthernet0/1\n    description: Link to branch\n\"\"\"\nvars = yaml.safe_load(VARS_YAML)\nprint(f\"hostname: {vars['hostname']}\")\nprint(f\"mgmt_ip: {vars['mgmt_ip']}\")\nfor interface in vars[\"interfaces\"]:\n    print(f\"{interface['name']}: {interface['description']}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the YAML for Network Configuration technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname: R1\nmgmt_ip: 192.0.2.10\nGigabitEthernet0/0: Uplink to core\nGigabitEthernet0/1: Link to branch",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "Link to branch",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "YAML for Network Configuration is the key idea here: YAML is the format most network automation uses for inventories and variables, because it is readable and supports nested data.",
        "approach": "Work through YAML for Network Configuration step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-network-data-m2",
    "title": "Network Data with Python in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-python-network-data-m2-l1",
      "slug": "netauto-python-network-data-m2-l1",
      "title": "Jinja2 Templates for Config",
      "concept": "Jinja2 is a templating engine that turns a text template plus a dictionary of variables into finished configuration. Placeholders look like {{ hostname }}, and the render method fills them in, so one template produces the config for every device. Rendering an interface template from variables is the core skill of config generation, and this lesson practises it.",
      "syntax": "from jinja2 import Template\nt = Template('hostname {{ hostname }}')\nprint(t.render(hostname='R1'))",
      "exampleCode": "from jinja2 import Template\n\nTEMPLATE = '''interface {{ name }}\n description {{ description }}\n ip address {{ ip }} {{ mask }}\n no shutdown'''\ntemplate = Template(TEMPLATE)\nprint(template.render(name='GigabitEthernet0/0', description='Uplink to core', ip='192.0.2.1', mask='255.255.255.0'))",
      "exampleLanguage": "python",
      "mistake": "Building configuration with string concatenation and + instead of a template, which becomes unreadable once the config grows past a few lines.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Jinja2 Templates for Config, but it does not work correctly.",
       "buggyCode": "config = 'interface ' + name + '\\n description ' + desc",
       "fixedCode": "template = Template('interface {{ name }}\\n description {{ description }}')\nconfig = template.render(name=name, description=desc)",
       "explanation": "Concatenation mixes code and config in one expression; a template keeps the config readable and the variables separate."
      },
      "exercise": {
       "title": "Practise Jinja2 Templates for Config",
       "type": "write-code",
       "instructions": "Render the interface template with name GigabitEthernet0/0, description 'Uplink to core', IP 192.0.2.1, and mask 255.255.255.0. Print the rendered configuration.",
       "starterCode": "from jinja2 import Template\n\nTEMPLATE = \"\"\"interface {{ name }}\n description {{ description }}\n ip address {{ ip }} {{ mask }}\n no shutdown\"\"\"\n# TODO: complete the program below.\n",
       "solution": "from jinja2 import Template\n\nTEMPLATE = \"\"\"interface {{ name }}\n description {{ description }}\n ip address {{ ip }} {{ mask }}\n no shutdown\"\"\"\ntemplate = Template(TEMPLATE)\nprint(template.render(name=\"GigabitEthernet0/0\", description=\"Uplink to core\", ip=\"192.0.2.1\", mask=\"255.255.255.0\"))\n",
       "solutionExplanation": "The solution builds the required data, applies the Jinja2 Templates for Config technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interface GigabitEthernet0/0\n description Uplink to core\n ip address 192.0.2.1 255.255.255.0\n no shutdown",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "no shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Jinja2 Templates for Config is the key idea here: Jinja2 is a templating engine that turns a text template plus a dictionary of variables into finished configuration.",
        "approach": "Work through Jinja2 Templates for Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-network-data-m2-l2",
      "slug": "netauto-python-network-data-m2-l2",
      "title": "Jinja2 Loops and Conditionals",
      "concept": "Jinja2 templates can loop with {% for %} and branch with {% if %}, so one template renders any number of interfaces and includes optional lines only when the data asks for them. A loop over an interfaces list renders one block per interface, and an if around the shutdown line adds 'no shutdown' only for interfaces marked enabled. Those two constructs turn a single-interface template into a whole-device template, which is what this lesson builds.",
      "syntax": "{% for interface in interfaces %}\ninterface {{ interface.name }}\n{% if interface.enabled %} no shutdown{% endif %}\n{% endfor %}",
      "exampleCode": "from jinja2 import Template\n\nTEMPLATE = '''{% for interface in interfaces %}interface {{ interface.name }}\n description {{ interface.description }}\n{% if interface.enabled %} no shutdown\n{% else %} shutdown\n{% endif %}{% endfor %}'''\ntemplate = Template(TEMPLATE)\ninterfaces = [\n    {'name': 'GigabitEthernet0/0', 'description': 'Uplink to core', 'enabled': True},\n    {'name': 'GigabitEthernet0/1', 'description': 'Spare', 'enabled': False},\n]\nprint(template.render(interfaces=interfaces))",
      "exampleLanguage": "python",
      "mistake": "Forgetting the {% endfor %} tag, which makes Jinja2 raise a TemplateSyntaxError when the template is compiled.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Jinja2 Loops and Conditionals, but it does not work correctly.",
       "buggyCode": "template = Template('{% for i in interfaces %}interface {{ i.name }}')",
       "fixedCode": "template = Template('{% for i in interfaces %}interface {{ i.name }}\\n{% endfor %}')",
       "explanation": "Every {% for %} needs its {% endfor %}; without it the template cannot compile and Jinja2 raises TemplateSyntaxError."
      },
      "exercise": {
       "title": "Practise Jinja2 Loops and Conditionals",
       "type": "write-code",
       "instructions": "Render the template for both interfaces: each gets an interface line and a description, plus 'no shutdown' when enabled and 'shutdown' when not. Print the rendered configuration.",
       "starterCode": "from jinja2 import Template\n\nTEMPLATE = \"\"\"{% for interface in interfaces %}interface {{ interface.name }}\n description {{ interface.description }}\n{% if interface.enabled %} no shutdown\n{% else %} shutdown\n{% endif %}{% endfor %}\"\"\"\ninterfaces = [\n    {\"name\": \"GigabitEthernet0/0\", \"description\": \"Uplink to core\", \"enabled\": True},\n    {\"name\": \"GigabitEthernet0/1\", \"description\": \"Spare\", \"enabled\": False},\n]\n# TODO: complete the program below.\n",
       "solution": "from jinja2 import Template\n\nTEMPLATE = \"\"\"{% for interface in interfaces %}interface {{ interface.name }}\n description {{ interface.description }}\n{% if interface.enabled %} no shutdown\n{% else %} shutdown\n{% endif %}{% endfor %}\"\"\"\ninterfaces = [\n    {\"name\": \"GigabitEthernet0/0\", \"description\": \"Uplink to core\", \"enabled\": True},\n    {\"name\": \"GigabitEthernet0/1\", \"description\": \"Spare\", \"enabled\": False},\n]\ntemplate = Template(TEMPLATE)\nprint(template.render(interfaces=interfaces))\n",
       "solutionExplanation": "The solution builds the required data, applies the Jinja2 Loops and Conditionals technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "interface GigabitEthernet0/0\n description Uplink to core\n no shutdown\ninterface GigabitEthernet0/1\n description Spare\n shutdown\n",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Jinja2 Loops and Conditionals is the key idea here: Jinja2 templates can loop with {% for %} and branch with {% if %}, so one template renders any number of interfaces and includes optional lines only when the data asks for them.",
        "approach": "Work through Jinja2 Loops and Conditionals step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-network-data-m2-l3",
      "slug": "netauto-python-network-data-m2-l3",
      "title": "Diffing Configurations",
      "concept": "A diff shows exactly which lines changed between two configurations, and Python's difflib.unified_diff produces the standard format with - for removed lines and + for added lines. You pass it two lists of lines and an empty lineterm so the output lines are not doubled. Diffing before applying a change is how you review automation output, and this lesson practises it on two interface configs.",
      "syntax": "import difflib\nfor line in difflib.unified_diff(old, new, lineterm=''):\n    print(line)",
      "exampleCode": "import difflib\n\nold = ['hostname R1', 'interface GigabitEthernet0/0', ' shutdown']\nnew = ['hostname R1', 'interface GigabitEthernet0/0', ' no shutdown']\nfor line in difflib.unified_diff(old, new, lineterm=''):\n    print(line)",
      "exampleLanguage": "python",
      "mistake": "Diffing the configurations as single strings, which compares character by character and produces a useless diff.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Diffing Configurations, but it does not work correctly.",
       "buggyCode": "for line in difflib.unified_diff(old_text, new_text):\n    print(line)",
       "fixedCode": "for line in difflib.unified_diff(old_text.splitlines(), new_text.splitlines(), lineterm=''):\n    print(line)",
       "explanation": "unified_diff works on sequences of lines, not on whole strings; passing strings diffs character by character."
      },
      "exercise": {
       "title": "Practise Diffing Configurations",
       "type": "write-code",
       "instructions": "Diff the old and new configuration lists with difflib.unified_diff (empty lineterm) and print every diff line, in order.",
       "starterCode": "import difflib\n\nold = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" shutdown\"]\nnew = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" no shutdown\"]\n# TODO: complete the program below.\n",
       "solution": "import difflib\n\nold = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" shutdown\"]\nnew = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" no shutdown\"]\nfor line in difflib.unified_diff(old, new, lineterm=\"\"):\n    print(line)\n",
       "solutionExplanation": "The solution builds the required data, applies the Diffing Configurations technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "--- \n+++ \n@@ -1,3 +1,3 @@\n hostname R1\n interface GigabitEthernet0/0\n- shutdown\n+ no shutdown",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "+ no shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Diffing Configurations is the key idea here: A diff shows exactly which lines changed between two configurations, and Python's difflib.",
        "approach": "Work through Diffing Configurations step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-network-data-m2-l4",
      "slug": "netauto-python-network-data-m2-l4",
      "title": "Data Validation with Checks",
      "concept": "Validation checks turn rules into code: each check returns True or False, and the program reports pass or fail per rule with the values it saw. Typical network checks are that every interface has a description, that every address is valid, and that no two devices share a management IP. Running those checks on a local device dictionary is the same logic a pre-change validation job runs, and this lesson practises it.",
      "syntax": "checks = [('has description', bool(device.get('description')))]\nfor name, passed in checks:\n    print(f\"{'PASS' if passed else 'FAIL'}: {name}\")",
      "exampleCode": "import ipaddress\n\ndevice = {'hostname': 'R1', 'mgmt_ip': '192.0.2.10', 'description': 'Core router', 'interfaces': 4}\nchecks = []\ntry:\n    ipaddress.ip_address(device['mgmt_ip'])\n    checks.append(('mgmt IP is valid', True))\nexcept ValueError:\n    checks.append(('mgmt IP is valid', False))\nchecks.append(('has description', bool(device.get('description'))))\nchecks.append(('hostname is set', bool(device.get('hostname'))))\nchecks.append(('has interfaces', device.get('interfaces', 0) > 0))\nfor name, passed in checks:\n    print(f\"{'PASS' if passed else 'FAIL'}: {name}\")",
      "exampleLanguage": "python",
      "mistake": "Validating only the happy path and never testing what happens with a missing key, so the first incomplete device crashes the check.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Data Validation with Checks, but it does not work correctly.",
       "buggyCode": "checks.append(('has description', len(device['description']) > 0))",
       "fixedCode": "checks.append(('has description', bool(device.get('description'))))",
       "explanation": "Indexing device['description'] raises KeyError when the key is missing; .get returns None, which bool turns into a clean FAIL."
      },
      "exercise": {
       "title": "Practise Data Validation with Checks",
       "type": "write-code",
       "instructions": "Run the four validation checks on the device dictionary: a valid management IP, a non-empty description, a hostname set, and at least one interface. Print 'PASS: <name>' or 'FAIL: <name>' per check, in order.",
       "starterCode": "import ipaddress\n\ndevice = {\"hostname\": \"R1\", \"mgmt_ip\": \"192.0.2.10\", \"description\": \"Core router\", \"interfaces\": 4}\n# TODO: complete the program below.\n",
       "solution": "import ipaddress\n\ndevice = {\"hostname\": \"R1\", \"mgmt_ip\": \"192.0.2.10\", \"description\": \"Core router\", \"interfaces\": 4}\nchecks = []\ntry:\n    ipaddress.ip_address(device[\"mgmt_ip\"])\n    checks.append((\"mgmt IP is valid\", True))\nexcept ValueError:\n    checks.append((\"mgmt IP is valid\", False))\nchecks.append((\"has description\", bool(device.get(\"description\"))))\nchecks.append((\"hostname is set\", bool(device.get(\"hostname\"))))\nchecks.append((\"has interfaces\", device.get(\"interfaces\", 0) > 0))\nfor name, passed in checks:\n    print(f\"{'PASS' if passed else 'FAIL'}: {name}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Data Validation with Checks technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "PASS: mgmt IP is valid\nPASS: has description\nPASS: hostname is set\nPASS: has interfaces",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "PASS: has interfaces",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Data Validation with Checks is the key idea here: Validation checks turn rules into code: each check returns True or False, and the program reports pass or fail per rule with the values it saw.",
        "approach": "Work through Data Validation with Checks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-network-data-m2-l5",
      "slug": "netauto-python-network-data-m2-l5",
      "title": "A Data Pipeline End to End",
      "concept": "A complete data pipeline has four steps: load the inventory from YAML, validate each device, render its configuration from a Jinja2 template, and print the result. Each step is a small function that takes data in and returns data out, so you can test each one alone before chaining them. This lesson chains all four on a two-device inventory and prints the configuration each device would receive.",
      "syntax": "vars = yaml.safe_load(VARS_YAML)\nconfig = template.render(**vars)\nprint(config)",
      "exampleCode": "import yaml\nfrom jinja2 import Template\n\nINVENTORY_YAML = '''\ndevices:\n  - hostname: R1\n    mgmt_ip: 192.0.2.10\n  - hostname: R2\n    mgmt_ip: 192.0.2.11\n'''\nTEMPLATE = 'hostname {{ hostname }}\\ninterface GigabitEthernet0/0\\n ip address {{ mgmt_ip }} 255.255.255.0\\n no shutdown'\ntemplate = Template(TEMPLATE)\ninventory = yaml.safe_load(INVENTORY_YAML)\nfor device in inventory['devices']:\n    print(f\"# {device['hostname']}\")\n    print(template.render(hostname=device['hostname'], mgmt_ip=device['mgmt_ip']))",
      "exampleLanguage": "python",
      "mistake": "Rendering the template before validating the inventory, so a device with a bad IP gets a configuration that will fail on the device.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Data Pipeline End to End, but it does not work correctly.",
       "buggyCode": "for device in inventory['devices']:\n    print(template.render(**device))",
       "fixedCode": "for device in inventory['devices']:\n    ipaddress.ip_address(device['mgmt_ip'])\n    print(template.render(**device))",
       "explanation": "Rendering first means bad data becomes bad config; validating the address first stops the pipeline before anything is generated."
      },
      "exercise": {
       "title": "Practise A Data Pipeline End to End",
       "type": "write-code",
       "instructions": "Run the pipeline: load the YAML inventory, then for each device print a '# <hostname>' header followed by the rendered template (hostname, interface GigabitEthernet0/0, management IP with a /24 mask, no shutdown).",
       "starterCode": "import yaml\nfrom jinja2 import Template\n\nINVENTORY_YAML = \"\"\"\ndevices:\n  - hostname: R1\n    mgmt_ip: 192.0.2.10\n  - hostname: R2\n    mgmt_ip: 192.0.2.11\n\"\"\"\nTEMPLATE = \"hostname {{ hostname }}\\ninterface GigabitEthernet0/0\\n ip address {{ mgmt_ip }} 255.255.255.0\\n no shutdown\"\n# TODO: complete the program below.\n",
       "solution": "import yaml\nfrom jinja2 import Template\n\nINVENTORY_YAML = \"\"\"\ndevices:\n  - hostname: R1\n    mgmt_ip: 192.0.2.10\n  - hostname: R2\n    mgmt_ip: 192.0.2.11\n\"\"\"\nTEMPLATE = \"hostname {{ hostname }}\\ninterface GigabitEthernet0/0\\n ip address {{ mgmt_ip }} 255.255.255.0\\n no shutdown\"\ntemplate = Template(TEMPLATE)\ninventory = yaml.safe_load(INVENTORY_YAML)\nfor device in inventory[\"devices\"]:\n    print(f\"# {device['hostname']}\")\n    print(template.render(hostname=device[\"hostname\"], mgmt_ip=device[\"mgmt_ip\"]))\n",
       "solutionExplanation": "The solution builds the required data, applies the A Data Pipeline End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "# R1\nhostname R1\ninterface GigabitEthernet0/0\n ip address 192.0.2.10 255.255.255.0\n no shutdown\n# R2\nhostname R2\ninterface GigabitEthernet0/0\n ip address 192.0.2.11 255.255.255.0\n no shutdown",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "# R2",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Data Pipeline End to End is the key idea here: A complete data pipeline has four steps: load the inventory from YAML, validate each device, render its configuration from a Jinja2 template, and print the result.",
        "approach": "Work through A Data Pipeline End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise Network Data with Python Capstone",
   "type": "write-code",
   "instructions": "Run the full data pipeline: load the YAML inventory (R1 192.0.2.10, R2 192.0.2.11), validate each management IP with ipaddress, split 192.0.2.0/24 into /26 subnets and print them, then render each device's configuration from the Jinja2 template and print it under a '# <hostname>' header. Template: 'hostname {{ hostname }}' then 'interface GigabitEthernet0/0' then ' ip address {{ mgmt_ip }} 255.255.255.0' then ' no shutdown'. Print the subnets first, then the device configs.",
   "starterCode": "import ipaddress\nimport yaml\nfrom jinja2 import Template\n\nINVENTORY_YAML = \"\"\"\ndevices:\n  - hostname: R1\n    mgmt_ip: 192.0.2.10\n  - hostname: R2\n    mgmt_ip: 192.0.2.11\n\"\"\"\nTEMPLATE = \"hostname {{ hostname }}\\ninterface GigabitEthernet0/0\\n ip address {{ mgmt_ip }} 255.255.255.0\\n no shutdown\"\n# TODO: complete the capstone program below.\n",
   "solution": "import ipaddress\nimport yaml\nfrom jinja2 import Template\n\nINVENTORY_YAML = \"\"\"\ndevices:\n  - hostname: R1\n    mgmt_ip: 192.0.2.10\n  - hostname: R2\n    mgmt_ip: 192.0.2.11\n\"\"\"\nTEMPLATE = \"hostname {{ hostname }}\\ninterface GigabitEthernet0/0\\n ip address {{ mgmt_ip }} 255.255.255.0\\n no shutdown\"\nnetwork = ipaddress.ip_network(\"192.0.2.0/24\")\nfor subnet in network.subnets(new_prefix=26):\n    print(subnet)\ntemplate = Template(TEMPLATE)\ninventory = yaml.safe_load(INVENTORY_YAML)\nfor device in inventory[\"devices\"]:\n    ipaddress.ip_address(device[\"mgmt_ip\"])\n    print(f\"# {device['hostname']}\")\n    print(template.render(hostname=device[\"hostname\"], mgmt_ip=device[\"mgmt_ip\"]))\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "192.0.2.0/26\n192.0.2.64/26\n192.0.2.128/26\n192.0.2.192/26\n# R1\nhostname R1\ninterface GigabitEthernet0/0\n ip address 192.0.2.10 255.255.255.0\n no shutdown\n# R2\nhostname R2\ninterface GigabitEthernet0/0\n ip address 192.0.2.11 255.255.255.0\n no shutdown",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "# R2",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "Network Data with Python Capstone Project",
   "description": "A small end-to-end data pipeline: subnet a network, load and validate a YAML inventory, and render each device's configuration.",
   "requirements": [
    "Use the core ideas of Network Data with Python in a working Python program.",
    "Split 192.0.2.0/24 into /26 subnets and print them.",
    "Load the YAML inventory and validate every management IP.",
    "Render each device's configuration from the Jinja2 template.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and produces the subnets and configurations correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-concurrent",
  "slug": "netauto-python-concurrent",
  "language": "python",
  "category": "devops",
  "title": "Concurrent Network Automation",
  "description": "Run automation across many devices at once: threads, ThreadPoolExecutor, locks, futures, timeouts, asyncio, and choosing between them.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Concurrency",
   "Threads",
   "ThreadPoolExecutor",
   "Locks",
   "Futures",
   "Timeouts",
   "asyncio",
   "gather"
  ],
  "prerequisites": [
   "netauto-python-netmiko",
   "netauto-python-nornir"
  ],
  "analogy": "Learning {topic} is like learning to run a kitchen with several cooks: everyone works at once, but only one person uses the stove at a time.",
  "modules": [
   {
    "id": "netauto-python-concurrent-m1",
    "title": "Concurrent Network Automation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-concurrent-m1-l1",
      "slug": "netauto-python-concurrent-m1-l1",
      "title": "Why Concurrency Matters",
      "concept": "Automation against one device at a time is slow, because most of the time is spent waiting for the network, and waiting on ten devices in sequence takes ten times as long as waiting on one. Concurrency overlaps those waits, so ten devices that each take 5 seconds finish in about 5 seconds instead of 50. The saving is simple arithmetic on the number of devices and the time per device, and this lesson computes it.",
      "syntax": "sequential = len(devices) * seconds_per_device\nconcurrent = seconds_per_device\nprint('saved:', sequential - concurrent)",
      "exampleCode": "devices = 10\nseconds_per_device = 5\nsequential = devices * seconds_per_device\nconcurrent = seconds_per_device\nprint(f\"devices: {devices}\")\nprint(f\"sequential: {sequential}s\")\nprint(f\"concurrent: about {concurrent}s\")\nprint(f\"time saved: {sequential - concurrent}s\")",
      "exampleLanguage": "python",
      "mistake": "Assuming concurrency makes the work itself faster, when it only overlaps waiting; a CPU-bound task gains nothing from threads.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Why Concurrency Matters, but it does not work correctly.",
       "buggyCode": "threads = 10  # to speed up a slow calculation",
       "fixedCode": "threads = 10  # to overlap waiting on ten devices",
       "explanation": "Threads help when the task waits on the network, because one thread waits while another works; a pure calculation still uses one core at a time."
      },
      "exercise": {
       "title": "Practise Why Concurrency Matters",
       "type": "write-code",
       "instructions": "Compute the run times for 10 devices at 5 seconds each: the sequential total, the concurrent total (about one device's time), and the time saved. Print 'devices: <n>', 'sequential: <n>s', 'concurrent: about <n>s', and 'time saved: <n>s'.",
       "starterCode": "devices = 10\nseconds_per_device = 5\n# TODO: complete the program below.\n",
       "solution": "devices = 10\nseconds_per_device = 5\nsequential = devices * seconds_per_device\nconcurrent = seconds_per_device\nprint(f\"devices: {devices}\")\nprint(f\"sequential: {sequential}s\")\nprint(f\"concurrent: about {concurrent}s\")\nprint(f\"time saved: {sequential - concurrent}s\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Why Concurrency Matters technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "devices: 10\nsequential: 50s\nconcurrent: about 5s\ntime saved: 45s",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "time saved: 45s",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Why Concurrency Matters is the key idea here: Automation against one device at a time is slow, because most of the time is spent waiting for the network, and waiting on ten devices in sequence takes ten times as long as waiting on one.",
        "approach": "Work through Why Concurrency Matters step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-concurrent-m1-l2",
      "slug": "netauto-python-concurrent-m1-l2",
      "title": "Threads with concurrent.futures",
      "concept": "The concurrent.futures module runs functions in a pool of threads, and ThreadPoolExecutor.map applies a function to every item and returns the results in the original order. The with statement creates the pool and shuts it down cleanly when the block ends, waiting for every task to finish. Mapping a local function over a list of hostnames is the same pattern without any network, and this lesson practises it.",
      "syntax": "from concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(max_workers=4) as pool:\n    results = list(pool.map(check, hosts))",
      "exampleCode": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = ['r1', 'r2', 'sw1']\n\ndef check(host):\n    return f\"{host}: checked\"\n\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    results = list(pool.map(check, hosts))\nfor result in results:\n    print(result)",
      "exampleLanguage": "python",
      "mistake": "Creating a new ThreadPoolExecutor inside a loop over hosts, which spawns a fresh pool per host and defeats the purpose.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Threads with concurrent.futures, but it does not work correctly.",
       "buggyCode": "for host in hosts:\n    with ThreadPoolExecutor() as pool:\n        pool.submit(check, host)",
       "fixedCode": "with ThreadPoolExecutor(max_workers=4) as pool:\n    results = list(pool.map(check, hosts))",
       "explanation": "One pool serves all the hosts; creating a pool per host adds the startup cost of a pool to every single task."
      },
      "exercise": {
       "title": "Practise Threads with concurrent.futures",
       "type": "write-code",
       "instructions": "Run check over the three hosts with a ThreadPoolExecutor of 3 workers, collecting the results with map (which keeps the original order), and print one result per line.",
       "starterCode": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = [\"r1\", \"r2\", \"sw1\"]\n\ndef check(host):\n    return f\"{host}: checked\"\n# TODO: complete the program below.\n",
       "solution": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = [\"r1\", \"r2\", \"sw1\"]\n\ndef check(host):\n    return f\"{host}: checked\"\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    results = list(pool.map(check, hosts))\nfor result in results:\n    print(result)\n",
       "solutionExplanation": "The solution builds the required data, applies the Threads with concurrent.futures technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: checked\nr2: checked\nsw1: checked",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "sw1: checked",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Threads with concurrent.futures is the key idea here: The concurrent.",
        "approach": "Work through Threads with concurrent.futures step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-concurrent-m1-l3",
      "slug": "netauto-python-concurrent-m1-l3",
      "title": "ThreadPoolExecutor in Practice",
      "concept": "In practice you submit one task per device and collect the futures, or you use map when the tasks are independent and order matters. The max_workers argument caps the pool size, and a good starting point is 10 to 20 workers for network jobs, because each worker mostly waits on the network. Computing a per-host value, such as the length of the config each host would receive, in a pool is the same pattern, and this lesson practises it.",
      "syntax": "from concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(max_workers=10) as pool:\n    lengths = list(pool.map(len, configs))",
      "exampleCode": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = {'r1': 'hostname R1', 'r2': 'hostname R2', 'sw1': 'hostname SW1'}\n\ndef config_length(item):\n    name, config = item\n    return f\"{name}: {len(config)} chars\"\n\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    results = list(pool.map(config_length, hosts.items()))\nfor result in results:\n    print(result)",
      "exampleLanguage": "python",
      "mistake": "Setting max_workers to the number of hosts for a 500-host inventory, which opens hundreds of sessions at once and overloads the jump host.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate ThreadPoolExecutor in Practice, but it does not work correctly.",
       "buggyCode": "ThreadPoolExecutor(max_workers=500)",
       "fixedCode": "ThreadPoolExecutor(max_workers=20)",
       "explanation": "Each worker holds a session, so 500 workers means 500 simultaneous logins; a pool of 10 to 20 is fast without overwhelming anything."
      },
      "exercise": {
       "title": "Practise ThreadPoolExecutor in Practice",
       "type": "write-code",
       "instructions": "Compute the configuration length for each host in a pool of 3 workers using map, and print one '<host>: <n> chars' line per host, in dictionary order.",
       "starterCode": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = {\"r1\": \"hostname R1\", \"r2\": \"hostname R2\", \"sw1\": \"hostname SW1\"}\n\ndef config_length(item):\n    name, config = item\n    return f\"{name}: {len(config)} chars\"\n# TODO: complete the program below.\n",
       "solution": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = {\"r1\": \"hostname R1\", \"r2\": \"hostname R2\", \"sw1\": \"hostname SW1\"}\n\ndef config_length(item):\n    name, config = item\n    return f\"{name}: {len(config)} chars\"\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    results = list(pool.map(config_length, hosts.items()))\nfor result in results:\n    print(result)\n",
       "solutionExplanation": "The solution builds the required data, applies the ThreadPoolExecutor in Practice technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: 11 chars\nr2: 11 chars\nsw1: 12 chars",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "sw1: 12 chars",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "ThreadPoolExecutor in Practice is the key idea here: In practice you submit one task per device and collect the futures, or you use map when the tasks are independent and order matters.",
        "approach": "Work through ThreadPoolExecutor in Practice step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-concurrent-m1-l4",
      "slug": "netauto-python-concurrent-m1-l4",
      "title": "Sharing Data Safely Between Threads",
      "concept": "Threads share the same memory, so two threads that update one counter at the same time can overwrite each other's result and lose a count. A threading.Lock makes the update atomic: only the thread holding the lock runs the critical section, and the others wait their turn. Counting completed hosts with a lock is the pattern every concurrent run uses for its summary, and this lesson practises it.",
      "syntax": "import threading\nlock = threading.Lock()\nwith lock:\n    counter[0] += 1",
      "exampleCode": "import threading\nfrom concurrent.futures import ThreadPoolExecutor\n\ncounter = [0]\nlock = threading.Lock()\n\ndef count(host):\n    with lock:\n        counter[0] += 1\n    return host\n\nhosts = ['r1', 'r2', 'sw1']\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    list(pool.map(count, hosts))\nprint(f\"completed: {counter[0]} of {len(hosts)}\")",
      "exampleLanguage": "python",
      "mistake": "Updating a shared counter without a lock, which loses counts when two threads read and write at the same moment.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Sharing Data Safely Between Threads, but it does not work correctly.",
       "buggyCode": "counter = [0]\ndef count(host):\n    counter[0] += 1  # no lock",
       "fixedCode": "lock = threading.Lock()\ndef count(host):\n    with lock:\n        counter[0] += 1",
       "explanation": "Two threads can read the same value before either writes back, so one increment is lost; the lock makes read and write one atomic step."
      },
      "exercise": {
       "title": "Practise Sharing Data Safely Between Threads",
       "type": "write-code",
       "instructions": "Count the three completed hosts with a shared counter protected by a lock, running count in a pool of 3 workers. Print 'completed: <n> of <total>'.",
       "starterCode": "import threading\nfrom concurrent.futures import ThreadPoolExecutor\n\ncounter = [0]\nlock = threading.Lock()\n\ndef count(host):\n    with lock:\n        counter[0] += 1\n    return host\n\nhosts = [\"r1\", \"r2\", \"sw1\"]\n# TODO: complete the program below.\n",
       "solution": "import threading\nfrom concurrent.futures import ThreadPoolExecutor\n\ncounter = [0]\nlock = threading.Lock()\n\ndef count(host):\n    with lock:\n        counter[0] += 1\n    return host\n\nhosts = [\"r1\", \"r2\", \"sw1\"]\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    list(pool.map(count, hosts))\nprint(f\"completed: {counter[0]} of {len(hosts)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Sharing Data Safely Between Threads technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "completed: 3 of 3",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "completed: 3 of 3",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Sharing Data Safely Between Threads is the key idea here: Threads share the same memory, so two threads that update one counter at the same time can overwrite each other's result and lose a count.",
        "approach": "Work through Sharing Data Safely Between Threads step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-concurrent-m1-l5",
      "slug": "netauto-python-concurrent-m1-l5",
      "title": "Handling Failures in Concurrent Runs",
      "concept": "When a task in a pool raises, the exception is stored in its future and re-raised only when you call future.result(), so one failed host never stops the others. The pattern is to submit every task, then loop over the futures with as_completed, catching exceptions per future and recording the failure. Simulating that with a function that fails for one host is local work, and this lesson practises it.",
      "syntax": "from concurrent.futures import ThreadPoolExecutor, as_completed\nfutures = {pool.submit(check, h): h for h in hosts}\nfor future in as_completed(futures):\n    try:\n        print(future.result())\n    except Exception as exc:\n        print(futures[future], 'failed:', exc)",
      "exampleCode": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = ['r1', 'r2', 'sw1']\n\ndef check(host):\n    if host == 'r2':\n        raise ConnectionError('connection timed out')\n    return f\"{host}: OK\"\n\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    futures = {pool.submit(check, host): host for host in hosts}\n    for host in hosts:\n        future = [f for f, h in futures.items() if h == host][0]\n        try:\n            print(future.result())\n        except ConnectionError as exc:\n            print(f\"{host}: FAILED - {exc}\")",
      "exampleLanguage": "python",
      "mistake": "Letting one future's exception escape the loop, which abandons the results of every host that has not been collected yet.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Handling Failures in Concurrent Runs, but it does not work correctly.",
       "buggyCode": "for future in as_completed(futures):\n    print(future.result())  # raises on the first failure",
       "fixedCode": "for future in as_completed(futures):\n    try:\n        print(future.result())\n    except Exception as exc:\n        print('failed:', exc)",
       "explanation": "An uncaught exception from one future stops the collection loop, so the remaining hosts' results are never read; catch per future."
      },
      "exercise": {
       "title": "Practise Handling Failures in Concurrent Runs",
       "type": "write-code",
       "instructions": "Run check on the three hosts in a pool: r2 raises ConnectionError, the others return '<host>: OK'. Collect the futures in host order, printing '<host>: OK' or '<host>: FAILED - <error>' per host.",
       "starterCode": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = [\"r1\", \"r2\", \"sw1\"]\n\ndef check(host):\n    if host == \"r2\":\n        raise ConnectionError(\"connection timed out\")\n    return f\"{host}: OK\"\n# TODO: complete the program below.\n",
       "solution": "from concurrent.futures import ThreadPoolExecutor\n\nhosts = [\"r1\", \"r2\", \"sw1\"]\n\ndef check(host):\n    if host == \"r2\":\n        raise ConnectionError(\"connection timed out\")\n    return f\"{host}: OK\"\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    futures = {pool.submit(check, host): host for host in hosts}\n    for host in hosts:\n        future = [f for f, h in futures.items() if h == host][0]\n        try:\n            print(future.result())\n        except ConnectionError as exc:\n            print(f\"{host}: FAILED - {exc}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Handling Failures in Concurrent Runs technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: OK\nr2: FAILED - connection timed out\nsw1: OK",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "r2: FAILED - connection timed out",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Handling Failures in Concurrent Runs is the key idea here: When a task in a pool raises, the exception is stored in its future and re-raised only when you call future.",
        "approach": "Work through Handling Failures in Concurrent Runs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-concurrent-m2",
    "title": "Concurrent Network Automation in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-python-concurrent-m2-l1",
      "slug": "netauto-python-concurrent-m2-l1",
      "title": "Timeouts and Limits",
      "concept": "Every concurrent task needs a timeout, because a device that never answers would otherwise hold its worker forever and stall the run. The future.result(timeout=...) call raises TimeoutError when a task runs too long, and the run should record that host as timed out and move on. Limits also apply to the pool itself: max_workers bounds how many sessions exist at once, which protects both the jump host and the devices.",
      "syntax": "future.result(timeout=30)",
      "exampleCode": "from concurrent.futures import ThreadPoolExecutor\n\nwith ThreadPoolExecutor(max_workers=5) as pool:\n    future = pool.submit(slow_check, 'r1')\n    try:\n        print(future.result(timeout=30))\n    except TimeoutError:\n        print('r1: timed out after 30s')",
      "exampleLanguage": "python",
      "mistake": "Running a pool with no timeout at all, so one hung device blocks the whole run indefinitely.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Timeouts and Limits, but it does not work correctly.",
       "buggyCode": "future.result()  # waits forever",
       "fixedCode": "future.result(timeout=30)",
       "explanation": "Without a timeout a hung task waits forever and the run never finishes; a timeout turns it into a recorded failure instead."
      },
      "exercise": {
       "title": "Practise Timeouts and Limits",
       "type": "write-code",
       "instructions": "Run two local checks in a ThreadPoolExecutor with max_workers=5: a quick check that returns at once and a slow check that sleeps 1 second. Collect each future with future.result(timeout=0.2), catch TimeoutError for the slow host and print its timeout line, and print the pool size last. The checks run locally - the lesson's point is the timeout and the pool limit, not a device.",
       "starterCode": "import time\nfrom concurrent.futures import ThreadPoolExecutor, TimeoutError\n\ndef quick_check(host):\n    return f\"{host}: ok\"\n\ndef slow_check(host):\n    time.sleep(1.0)\n    return f\"{host}: ok\"\n\n# TODO: complete the program below.\n",
       "solution": "import time\nfrom concurrent.futures import ThreadPoolExecutor, TimeoutError\n\ndef quick_check(host):\n    return f\"{host}: ok\"\n\ndef slow_check(host):\n    time.sleep(1.0)\n    return f\"{host}: ok\"\n\nmax_workers = 5\ntimeout = 0.2\nwith ThreadPoolExecutor(max_workers=max_workers) as pool:\n    quick = pool.submit(quick_check, \"r1\")\n    slow = pool.submit(slow_check, \"r2\")\n    print(quick.result(timeout=timeout))\n    try:\n        print(slow.result(timeout=timeout))\n    except TimeoutError:\n        print(f\"r2: timed out after {timeout}s\")\nprint(f\"Max workers: {max_workers}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Timeouts and Limits technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: ok\nr2: timed out after 0.2s\nMax workers: 5",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "timed out after 0.2s",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Timeouts and Limits is the key idea here: Every concurrent task needs a timeout, because a device that never answers would otherwise hold its worker forever and stall the run.",
        "approach": "Work through Timeouts and Limits step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-concurrent-m2-l2",
      "slug": "netauto-python-concurrent-m2-l2",
      "title": "Asyncio Basics",
      "concept": "Asyncio runs many tasks in one thread by switching between them whenever one waits, and async def defines a coroutine that asyncio.run executes. The await keyword marks the waiting points, and asyncio.gather runs several coroutines together and returns their results in order. Gathering three small local coroutines is the same structure as gathering three network checks, and this lesson practises it.",
      "syntax": "import asyncio\n\nasync def check(host):\n    return f'{host}: checked'\n\nasync def main():\n    return await asyncio.gather(*(check(h) for h in ['r1', 'r2']))\n\nprint(asyncio.run(main()))",
      "exampleCode": "import asyncio\n\nasync def check(host):\n    await asyncio.sleep(0)\n    return f\"{host}: checked\"\n\nasync def main():\n    return await asyncio.gather(check('r1'), check('r2'), check('sw1'))\n\nresults = asyncio.run(main())\nfor result in results:\n    print(result)",
      "exampleLanguage": "python",
      "mistake": "Calling a coroutine without await, which returns a coroutine object instead of running the code inside it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Asyncio Basics, but it does not work correctly.",
       "buggyCode": "result = check('r1')\nprint(result)  # a coroutine object, not a result",
       "fixedCode": "result = asyncio.run(check('r1'))\nprint(result)",
       "explanation": "Calling an async function only builds the coroutine; it runs only when awaited or passed to asyncio.run."
      },
      "exercise": {
       "title": "Practise Asyncio Basics",
       "type": "write-code",
       "instructions": "Gather check over r1, r2, and sw1 with asyncio.gather (which returns results in order) and print one result per line.",
       "starterCode": "import asyncio\n\nasync def check(host):\n    await asyncio.sleep(0)\n    return f\"{host}: checked\"\n\nasync def main():\n    return await asyncio.gather(check(\"r1\"), check(\"r2\"), check(\"sw1\"))\n# TODO: complete the program below.\n",
       "solution": "import asyncio\n\nasync def check(host):\n    await asyncio.sleep(0)\n    return f\"{host}: checked\"\n\nasync def main():\n    return await asyncio.gather(check(\"r1\"), check(\"r2\"), check(\"sw1\"))\nresults = asyncio.run(main())\nfor result in results:\n    print(result)\n",
       "solutionExplanation": "The solution builds the required data, applies the Asyncio Basics technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: checked\nr2: checked\nsw1: checked",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "sw1: checked",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Asyncio Basics is the key idea here: Asyncio runs many tasks in one thread by switching between them whenever one waits, and async def defines a coroutine that asyncio.",
        "approach": "Work through Asyncio Basics step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-concurrent-m2-l3",
      "slug": "netauto-python-concurrent-m2-l3",
      "title": "Asyncio for Network Tasks",
      "concept": "Asyncio fits network automation because the work is waiting on sockets, and libraries such as asyncssh provide awaitable SSH clients that fit the pattern. Each device gets one coroutine that connects, runs its commands, and returns the result, and gather runs all of them together in a single thread. The structure is identical for local coroutines that return a per-host string, which is what this lesson practises without any network.",
      "syntax": "import asyncio\n\nasync def check(host):\n    return f'{host}: OK'\n\nasync def main():\n    return await asyncio.gather(check('r1'), check('r2'))",
      "exampleCode": "import asyncio\n\nasync def check(host):\n    await asyncio.sleep(0)\n    return f\"{host}: OK\"\n\nasync def main():\n    tasks = [check(host) for host in ['r1', 'r2', 'sw1']]\n    results = await asyncio.gather(*tasks, return_exceptions=True)\n    for result in results:\n        print(result)\n\nasyncio.run(main())",
      "exampleLanguage": "python",
      "mistake": "Forgetting return_exceptions=True in gather, so one failing coroutine cancels the results of all the others.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Asyncio for Network Tasks, but it does not work correctly.",
       "buggyCode": "results = await asyncio.gather(check('r1'), check('r2'))",
       "fixedCode": "results = await asyncio.gather(check('r1'), check('r2'), return_exceptions=True)",
       "explanation": "Without return_exceptions, the first exception propagates and the other results are lost; with it, each result or exception is reported per task."
      },
      "exercise": {
       "title": "Practise Asyncio for Network Tasks",
       "type": "write-code",
       "instructions": "Build one check coroutine per host (r1, r2, sw1), gather them with return_exceptions=True, and print one result per line.",
       "starterCode": "import asyncio\n\nasync def check(host):\n    await asyncio.sleep(0)\n    return f\"{host}: OK\"\n\nasync def main():\n    tasks = [check(host) for host in [\"r1\", \"r2\", \"sw1\"]]\n    results = await asyncio.gather(*tasks, return_exceptions=True)\n    for result in results:\n        print(result)\n# TODO: complete the program below.\n",
       "solution": "import asyncio\n\nasync def check(host):\n    await asyncio.sleep(0)\n    return f\"{host}: OK\"\n\nasync def main():\n    tasks = [check(host) for host in [\"r1\", \"r2\", \"sw1\"]]\n    results = await asyncio.gather(*tasks, return_exceptions=True)\n    for result in results:\n        print(result)\nasyncio.run(main())\n",
       "solutionExplanation": "The solution builds the required data, applies the Asyncio for Network Tasks technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: OK\nr2: OK\nsw1: OK",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "sw1: OK",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Asyncio for Network Tasks is the key idea here: Asyncio fits network automation because the work is waiting on sockets, and libraries such as asyncssh provide awaitable SSH clients that fit the pattern.",
        "approach": "Work through Asyncio for Network Tasks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-concurrent-m2-l4",
      "slug": "netauto-python-concurrent-m2-l4",
      "title": "Choosing Threads vs Asyncio",
      "concept": "Threads and asyncio both overlap waiting, and the choice depends on the libraries you use: threads work with any blocking library such as Netmiko, while asyncio needs async libraries such as asyncssh. Threads are simpler to add to existing blocking code, and asyncio scales further because it has no per-thread stack cost. A small decision table over task traits gives the recommendation per task, and this lesson builds one.",
      "syntax": "choice = 'threads' if library == 'netmiko' else 'asyncio'",
      "exampleCode": "tasks = [\n    {'name': 'netmiko backup', 'library': 'netmiko', 'hosts': 50},\n    {'name': 'asyncssh check', 'library': 'asyncssh', 'hosts': 500},\n    {'name': 'napalm facts', 'library': 'napalm', 'hosts': 20},\n]\nfor task in tasks:\n    choice = 'threads' if task['library'] in ('netmiko', 'napalm') else 'asyncio'\n    print(f\"{task['name']}: use {choice} for {task['hosts']} hosts\")",
      "exampleLanguage": "python",
      "mistake": "Choosing asyncio for a Netmiko-based job, which blocks the event loop because Netmiko has no async interface.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Choosing Threads vs Asyncio, but it does not work correctly.",
       "buggyCode": "async def run():\n    conn.send_command('show version')  # blocks the loop",
       "fixedCode": "with ThreadPoolExecutor() as pool:\n    pool.map(run_netmiko, hosts)",
       "explanation": "Netmiko calls block, so running them in a coroutine freezes every other task; blocking libraries belong in threads."
      },
      "exercise": {
       "title": "Practise Choosing Threads vs Asyncio",
       "type": "write-code",
       "instructions": "For each task, choose threads when the library is netmiko or napalm (blocking) and asyncio otherwise. Print '<name>: use <choice> for <n> hosts' per task.",
       "starterCode": "tasks = [\n    {\"name\": \"netmiko backup\", \"library\": \"netmiko\", \"hosts\": 50},\n    {\"name\": \"asyncssh check\", \"library\": \"asyncssh\", \"hosts\": 500},\n    {\"name\": \"napalm facts\", \"library\": \"napalm\", \"hosts\": 20},\n]\n# TODO: complete the program below.\n",
       "solution": "tasks = [\n    {\"name\": \"netmiko backup\", \"library\": \"netmiko\", \"hosts\": 50},\n    {\"name\": \"asyncssh check\", \"library\": \"asyncssh\", \"hosts\": 500},\n    {\"name\": \"napalm facts\", \"library\": \"napalm\", \"hosts\": 20},\n]\nfor task in tasks:\n    choice = \"threads\" if task[\"library\"] in (\"netmiko\", \"napalm\") else \"asyncio\"\n    print(f\"{task['name']}: use {choice} for {task['hosts']} hosts\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Choosing Threads vs Asyncio technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "netmiko backup: use threads for 50 hosts\nasyncssh check: use asyncio for 500 hosts\nnapalm facts: use threads for 20 hosts",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "napalm facts: use threads for 20 hosts",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Choosing Threads vs Asyncio is the key idea here: Threads and asyncio both overlap waiting, and the choice depends on the libraries you use: threads work with any blocking library such as Netmiko, while asyncio needs async libraries such as asyncssh.",
        "approach": "Work through Choosing Threads vs Asyncio step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-concurrent-m2-l5",
      "slug": "netauto-python-concurrent-m2-l5",
      "title": "A Concurrent Run End to End",
      "concept": "A complete concurrent run loads the inventory, submits one task per device to a pool, collects the futures with per-host error handling, and prints a summary of how many hosts succeeded, failed, or timed out. The pool size stays modest, every task has a timeout, and the summary is printed even when some hosts fail. Running it end to end needs lab devices, but every piece, pools, locks, futures, and timeouts, is covered in this track.",
      "syntax": "with ThreadPoolExecutor(max_workers=10) as pool:\n    futures = {pool.submit(run, h): h for h in hosts}\n    for future in as_completed(futures):\n        record(futures[future], future)",
      "exampleCode": "from concurrent.futures import ThreadPoolExecutor, as_completed\n\nwith ThreadPoolExecutor(max_workers=10) as pool:\n    futures = {pool.submit(run_check, host): host for host in hosts}\n    for future in as_completed(futures):\n        host = futures[future]\n        try:\n            print(host, future.result(timeout=30))\n        except Exception as exc:\n            print(host, 'failed:', exc)",
      "exampleLanguage": "python",
      "mistake": "Collecting futures in submission order instead of as_completed, which waits on a slow host while faster hosts' results sit unread.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Concurrent Run End to End, but it does not work correctly.",
       "buggyCode": "for future in futures:\n    print(future.result())",
       "fixedCode": "for future in as_completed(futures):\n    print(future.result())",
       "explanation": "Iterating the futures in order waits on the first one even when others finished; as_completed yields each result as soon as it is ready."
      },
      "exercise": {
       "title": "Practise A Concurrent Run End to End",
       "type": "write-code",
       "instructions": "Run a complete concurrent run over local checks: submit one local check per host to a ThreadPoolExecutor (max_workers=3), collect the futures with as_completed and a 0.2s timeout, and record each host as ok, failed, or timed out - one check succeeds, one raises, and one sleeps past the timeout. Print one line per host in sorted order, then the succeeded, failed, and timed-out counts. The checks are local functions, so the pool, timeout, and summary logic are exercised for real without any device.",
       "starterCode": "import time\nfrom concurrent.futures import ThreadPoolExecutor, TimeoutError, as_completed\n\ndef run_check(host):\n    if host == \"r2\":\n        raise ValueError(\"simulated failure\")\n    if host == \"r3\":\n        time.sleep(1.0)\n    return f\"{host}: ok\"\n\nhosts = [\"r1\", \"r2\", \"r3\"]\n# TODO: complete the program below.\n",
       "solution": "import time\nfrom concurrent.futures import ThreadPoolExecutor, TimeoutError, as_completed\n\ndef run_check(host):\n    if host == \"r2\":\n        raise ValueError(\"simulated failure\")\n    if host == \"r3\":\n        time.sleep(1.0)\n    return f\"{host}: ok\"\n\nhosts = [\"r1\", \"r2\", \"r3\"]\nmax_workers = 3\ntimeout = 0.2\noutcomes = {}\nwith ThreadPoolExecutor(max_workers=max_workers) as pool:\n    futures = {pool.submit(run_check, host): host for host in hosts}\n    try:\n        for future in as_completed(futures, timeout=timeout):\n            host = futures[future]\n            try:\n                outcomes[host] = future.result()\n            except Exception:\n                outcomes[host] = f\"{host}: failed\"\n    except TimeoutError:\n        for host in hosts:\n            outcomes.setdefault(host, f\"{host}: timed out\")\nfor host in sorted(outcomes):\n    print(outcomes[host])\nsucceeded = sum(1 for value in outcomes.values() if value.endswith(\": ok\"))\nfailed = sum(1 for value in outcomes.values() if value.endswith(\": failed\"))\ntimed_out = sum(1 for value in outcomes.values() if value.endswith(\": timed out\"))\nprint(f\"Succeeded: {succeeded}\")\nprint(f\"Failed: {failed}\")\nprint(f\"Timed out: {timed_out}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A Concurrent Run End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "r1: ok\nr2: failed\nr3: timed out\nSucceeded: 1\nFailed: 1\nTimed out: 1",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "r3: timed out",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Concurrent Run End to End is the key idea here: A complete concurrent run loads the inventory, submits one task per device to a pool, collects the futures with per-host error handling, and prints a summary of how many hosts succeeded, failed, or timed out.",
        "approach": "Work through A Concurrent Run End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise Concurrent Network Automation Capstone",
   "type": "write-code",
   "instructions": "Run a concurrent job offline: compute the sequential and concurrent times for 8 devices at 4 seconds each and print 'sequential: <n>s', 'concurrent: about <n>s', and 'time saved: <n>s'. Then run check over r1, r2, sw1 in a ThreadPoolExecutor of 3 workers where r2 raises ConnectionError, collecting futures in host order and printing '<host>: OK' or '<host>: FAILED - <error>' per host. Finally gather three asyncio coroutines returning '<host>: checked' for r1, r2, sw1 and print one per line. Print the three sections in that order.",
   "starterCode": "import asyncio\nfrom concurrent.futures import ThreadPoolExecutor\n\ndevices = 8\nseconds = 4\nhosts = [\"r1\", \"r2\", \"sw1\"]\n\ndef check(host):\n    if host == \"r2\":\n        raise ConnectionError(\"connection timed out\")\n    return f\"{host}: OK\"\n\nasync def async_check(host):\n    await asyncio.sleep(0)\n    return f\"{host}: checked\"\n# TODO: complete the capstone program below.\n",
   "solution": "import asyncio\nfrom concurrent.futures import ThreadPoolExecutor\n\ndevices = 8\nseconds = 4\nhosts = [\"r1\", \"r2\", \"sw1\"]\n\ndef check(host):\n    if host == \"r2\":\n        raise ConnectionError(\"connection timed out\")\n    return f\"{host}: OK\"\n\nasync def async_check(host):\n    await asyncio.sleep(0)\n    return f\"{host}: checked\"\nprint(f\"sequential: {devices * seconds}s\")\nprint(f\"concurrent: about {seconds}s\")\nprint(f\"time saved: {devices * seconds - seconds}s\")\nwith ThreadPoolExecutor(max_workers=3) as pool:\n    futures = {pool.submit(check, host): host for host in hosts}\n    for host in hosts:\n        future = [f for f, h in futures.items() if h == host][0]\n        try:\n            print(future.result())\n        except ConnectionError as exc:\n            print(f\"{host}: FAILED - {exc}\")\nasync def main():\n    return await asyncio.gather(async_check(\"r1\"), async_check(\"r2\"), async_check(\"sw1\"))\n\nresults = asyncio.run(main())\nfor result in results:\n    print(result)\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "sequential: 32s\nconcurrent: about 4s\ntime saved: 28s\nr1: OK\nr2: FAILED - connection timed out\nsw1: OK\nr1: checked\nr2: checked\nsw1: checked",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "time saved: 28s",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "Concurrent Network Automation Capstone Project",
   "description": "A small end-to-end concurrent job: compute the time saving, run a threaded check with one failure, and gather asyncio results.",
   "requirements": [
    "Use the core ideas of Concurrent Network Automation in a working Python program.",
    "Compute and print the sequential, concurrent, and saved times.",
    "Run the threaded check with per-host error handling.",
    "Gather the asyncio checks and print them in order.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and produces the timing, threaded, and asyncio results correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-python-production",
  "slug": "netauto-python-production",
  "language": "python",
  "category": "devops",
  "title": "Production Network Automation",
  "description": "Take automation to production: idempotency, dry runs, logging, secrets, testing, version control, scheduling, and rollback plans.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Idempotency",
   "Dry runs",
   "Logging",
   "Secrets",
   "Testing",
   "Version control",
   "Scheduling",
   "Rollback"
  ],
  "prerequisites": [
   "netauto-python-netmiko",
   "netauto-python-nornir",
   "netauto-python-network-data"
  ],
  "analogy": "Learning {topic} is like learning to fly a plane: the checklist matters more than the controls, because it is what keeps everyone safe.",
  "modules": [
   {
    "id": "netauto-python-production-m1",
    "title": "Production Network Automation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-python-production-m1-l1",
      "slug": "netauto-python-production-m1-l1",
      "title": "What Makes Automation Production-Ready?",
      "concept": "Production-ready automation is automation you can trust with real devices, and it has five properties: it is idempotent, it previews changes before applying them, it logs what it did, it handles errors per device, and it can roll back. A checklist that scores a job against those five properties is how teams decide whether a script is ready to run on the production network. Scoring a checklist from a dictionary is local work, and this lesson practises it.",
      "syntax": "checks = {'idempotent': True, 'dry_run': True, 'logging': True, 'error_handling': True, 'rollback': False}",
      "exampleCode": "checks = {'idempotent': True, 'dry_run': True, 'logging': True, 'error_handling': True, 'rollback': False}\nfor name, done in checks.items():\n    print(f\"{'[x]' if done else '[ ]'} {name}\")\nready = all(checks.values())\nprint(f\"production ready: {'yes' if ready else 'no'}\")\nmissing = [name for name, done in checks.items() if not done]\nprint(f\"missing: {', '.join(missing) if missing else 'none'}\")",
      "exampleLanguage": "python",
      "mistake": "Calling a script production-ready because it worked once on a lab device, without checking idempotency, logging, or rollback.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate What Makes Automation Production-Ready?, but it does not work correctly.",
       "buggyCode": "print('it worked in the lab, ship it')",
       "fixedCode": "checks = {'idempotent': True, 'dry_run': True, 'logging': True, 'error_handling': True, 'rollback': True}\nprint('ready:', all(checks.values()))",
       "explanation": "One successful lab run proves nothing about the second run or a failure; the checklist scores the properties that make a script safe to repeat."
      },
      "exercise": {
       "title": "Practise What Makes Automation Production-Ready?",
       "type": "write-code",
       "instructions": "Score the production-readiness checklist: print one '[x] <name>' or '[ ] <name>' line per check, then 'production ready: yes|no', then 'missing: <names>' or 'missing: none'.",
       "starterCode": "checks = {\"idempotent\": True, \"dry_run\": True, \"logging\": True, \"error_handling\": True, \"rollback\": False}\n# TODO: complete the program below.\n",
       "solution": "checks = {\"idempotent\": True, \"dry_run\": True, \"logging\": True, \"error_handling\": True, \"rollback\": False}\nfor name, done in checks.items():\n    print(f\"{'[x]' if done else '[ ]'} {name}\")\nready = all(checks.values())\nprint(f\"production ready: {'yes' if ready else 'no'}\")\nmissing = [name for name, done in checks.items() if not done]\nprint(f\"missing: {', '.join(missing) if missing else 'none'}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the What Makes Automation Production-Ready? technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "[x] idempotent\n[x] dry_run\n[x] logging\n[x] error_handling\n[ ] rollback\nproduction ready: no\nmissing: rollback",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "missing: rollback",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Makes Automation Production-Ready? is the key idea here: Production-ready automation is automation you can trust with real devices, and it has five properties: it is idempotent, it previews changes before applying them, it logs what it did, it handles errors per device, and it can roll back.",
        "approach": "Work through What Makes Automation Production-Ready? step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-production-m1-l2",
      "slug": "netauto-python-production-m1-l2",
      "title": "Idempotency",
      "concept": "An idempotent operation produces the same result no matter how many times it runs, and that is what makes automation safe to re-run after a failure. A configuration generator is idempotent when the same input always renders the same output, so running it twice changes nothing the second time. Comparing the output of two runs is the direct test, and this lesson practises it.",
      "syntax": "first = render(device)\nsecond = render(device)\nprint('idempotent:', first == second)",
      "exampleCode": "def render(device):\n    return f\"hostname {device['hostname']}\\ninterface {device['mgmt_if']}\\n no shutdown\"\n\ndevice = {'hostname': 'R1', 'mgmt_if': 'GigabitEthernet0/0'}\nfirst = render(device)\nsecond = render(device)\nprint(first)\nprint(f\"idempotent: {'yes' if first == second else 'no'}\")",
      "exampleLanguage": "python",
      "mistake": "Appending to a configuration file on every run, so the second run duplicates lines the first run already wrote.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Idempotency, but it does not work correctly.",
       "buggyCode": "with open('config.txt', 'a') as f:\n    f.write('hostname R1\\n')  # appends every run",
       "fixedCode": "with open('config.txt', 'w') as f:\n    f.write('hostname R1\\n')  # writes the full content",
       "explanation": "Appending adds the line again on every run; writing the full desired content makes the second run produce the same file as the first."
      },
      "exercise": {
       "title": "Practise Idempotency",
       "type": "write-code",
       "instructions": "Render the device configuration twice with the render function and print it once, then print 'idempotent: yes' if both runs agree or 'idempotent: no' if they differ.",
       "starterCode": "def render(device):\n    return f\"hostname {device['hostname']}\\ninterface {device['mgmt_if']}\\n no shutdown\"\n\ndevice = {\"hostname\": \"R1\", \"mgmt_if\": \"GigabitEthernet0/0\"}\n# TODO: complete the program below.\n",
       "solution": "def render(device):\n    return f\"hostname {device['hostname']}\\ninterface {device['mgmt_if']}\\n no shutdown\"\n\ndevice = {\"hostname\": \"R1\", \"mgmt_if\": \"GigabitEthernet0/0\"}\nfirst = render(device)\nsecond = render(device)\nprint(first)\nprint(f\"idempotent: {'yes' if first == second else 'no'}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Idempotency technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "hostname R1\ninterface GigabitEthernet0/0\n no shutdown\nidempotent: yes",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "idempotent: yes",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Idempotency is the key idea here: An idempotent operation produces the same result no matter how many times it runs, and that is what makes automation safe to re-run after a failure.",
        "approach": "Work through Idempotency step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-production-m1-l3",
      "slug": "netauto-python-production-m1-l3",
      "title": "Dry Runs and Change Previews",
      "concept": "A dry run shows what a change would do without doing it, and the preview is usually a diff between the current configuration and the desired one. The operator reads the diff, approves it, and only then does the job apply the change for real. Diffing the current and desired configs and listing the planned changes is the preview step, and this lesson practises it.",
      "syntax": "import difflib\nfor line in difflib.unified_diff(current, desired, lineterm=''):\n    print(line)",
      "exampleCode": "import difflib\n\ncurrent = ['hostname R1', 'interface GigabitEthernet0/0', ' shutdown']\ndesired = ['hostname R1', 'interface GigabitEthernet0/0', ' description Uplink to core', ' no shutdown']\nadded = [line[2:] for line in difflib.unified_diff(current, desired, lineterm='') if line.startswith('+') and not line.startswith('+++')]\nremoved = [line[2:] for line in difflib.unified_diff(current, desired, lineterm='') if line.startswith('-') and not line.startswith('---')]\nprint('planned changes:')\nfor line in removed:\n    print(f\"  remove: {line}\")\nfor line in added:\n    print(f\"  add: {line}\")",
      "exampleLanguage": "python",
      "mistake": "Applying a change and then diffing to see what happened, which is a report after the fact instead of a preview before it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Dry Runs and Change Previews, but it does not work correctly.",
       "buggyCode": "apply(desired)\nprint(difflib.unified_diff(current, desired))",
       "fixedCode": "print(difflib.unified_diff(current, desired))\napply(desired)  # only after review",
       "explanation": "Diffing after applying tells you what changed, but the device is already changed; the preview must come first so a bad change is never applied."
      },
      "exercise": {
       "title": "Practise Dry Runs and Change Previews",
       "type": "write-code",
       "instructions": "Preview the change: diff the current and desired configurations and print 'planned changes:' followed by one '  remove: <line>' per removed line and one '  add: <line>' per added line.",
       "starterCode": "import difflib\n\ncurrent = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" shutdown\"]\ndesired = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description Uplink to core\", \" no shutdown\"]\n# TODO: complete the program below.\n",
       "solution": "import difflib\n\ncurrent = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" shutdown\"]\ndesired = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description Uplink to core\", \" no shutdown\"]\nadded = [line[2:] for line in difflib.unified_diff(current, desired, lineterm=\"\") if line.startswith(\"+\") and not line.startswith(\"+++\")]\nremoved = [line[2:] for line in difflib.unified_diff(current, desired, lineterm=\"\") if line.startswith(\"-\") and not line.startswith(\"---\")]\nprint(\"planned changes:\")\nfor line in removed:\n    print(f\"  remove: {line}\")\nfor line in added:\n    print(f\"  add: {line}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Dry Runs and Change Previews technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "planned changes:\n  remove: shutdown\n  add: description Uplink to core\n  add: no shutdown",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "add: no shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Dry Runs and Change Previews is the key idea here: A dry run shows what a change would do without doing it, and the preview is usually a diff between the current configuration and the desired one.",
        "approach": "Work through Dry Runs and Change Previews step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-production-m1-l4",
      "slug": "netauto-python-production-m1-l4",
      "title": "Logging Automation Runs",
      "concept": "Logging records what an automation run did, and the logging module writes timestamped lines at levels such as INFO for normal progress and ERROR for failures. A run that logs each device, each change, and each error can be audited afterwards, while a run that only prints to the screen leaves no record. Formatting log lines with a timestamp, a level, and a message is the skill, and this lesson practises the message part on plain strings.",
      "syntax": "import logging\nlogging.basicConfig(level=logging.INFO, format='%(levelname)s %(message)s')\nlogging.info('starting run for r1')",
      "exampleCode": "entries = [('INFO', 'starting run for r1'), ('INFO', 'r1: config applied'), ('ERROR', 'r2: connection timed out'), ('INFO', 'run finished: 1 ok, 1 failed')]\nfor level, message in entries:\n    print(f\"{level}: {message}\")",
      "exampleLanguage": "python",
      "mistake": "Logging only errors and never the successful steps, so a finished run's log cannot show what actually changed.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Logging Automation Runs, but it does not work correctly.",
       "buggyCode": "logging.error('r2 failed')  # the only log line",
       "fixedCode": "logging.info('r1: config applied')\nlogging.error('r2: connection timed out')",
       "explanation": "A log with only errors cannot prove what succeeded; logging each step makes the run auditable from start to finish."
      },
      "exercise": {
       "title": "Practise Logging Automation Runs",
       "type": "write-code",
       "instructions": "Print the run log: one '<LEVEL>: <message>' line per entry, in list order.",
       "starterCode": "entries = [(\"INFO\", \"starting run for r1\"), (\"INFO\", \"r1: config applied\"), (\"ERROR\", \"r2: connection timed out\"), (\"INFO\", \"run finished: 1 ok, 1 failed\")]\n# TODO: complete the program below.\n",
       "solution": "entries = [(\"INFO\", \"starting run for r1\"), (\"INFO\", \"r1: config applied\"), (\"ERROR\", \"r2: connection timed out\"), (\"INFO\", \"run finished: 1 ok, 1 failed\")]\nfor level, message in entries:\n    print(f\"{level}: {message}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Logging Automation Runs technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "INFO: starting run for r1\nINFO: r1: config applied\nERROR: r2: connection timed out\nINFO: run finished: 1 ok, 1 failed",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "run finished: 1 ok, 1 failed",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Logging Automation Runs is the key idea here: Logging records what an automation run did, and the logging module writes timestamped lines at levels such as INFO for normal progress and ERROR for failures.",
        "approach": "Work through Logging Automation Runs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-production-m1-l5",
      "slug": "netauto-python-production-m1-l5",
      "title": "Secrets and Credentials",
      "concept": "Secrets such as passwords and API tokens must never appear in code, logs, or version control, and the safe pattern is to read them from a vault or an environment variable at runtime. When a secret must pass through text, for example a configuration being printed for review, it is masked, replaced with asterisks, before it is shown. Masking a password inside a configuration string is a small, testable function, and this lesson practises it.",
      "syntax": "import os\npassword = os.environ['NET_PASSWORD']  # read at runtime, never in code",
      "exampleCode": "config = 'username admin password secret123\\nusername backup password hunter2'\nmasked = []\nfor line in config.splitlines():\n    parts = line.split()\n    if len(parts) == 4 and parts[2] == 'password':\n        masked.append(f\"{parts[0]} {parts[1]} password ***\")\n    else:\n        masked.append(line)\nprint('\\n'.join(masked))",
      "exampleLanguage": "python",
      "mistake": "Printing a configuration that contains a real password to the screen or a log file, where anyone with access can read it.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Secrets and Credentials, but it does not work correctly.",
       "buggyCode": "print(config)  # contains 'password secret123'",
       "fixedCode": "print(mask(config))  # passwords replaced with ***",
       "explanation": "Printing the raw config leaks the password to the screen, the log, and anyone who reads it later; masking replaces it before printing."
      },
      "exercise": {
       "title": "Practise Secrets and Credentials",
       "type": "write-code",
       "instructions": "Mask the secrets in the configuration text: for each line of the form 'username <name> password <secret>', print 'username <name> password ***'. Print every line, masked or not.",
       "starterCode": "config = \"username admin password secret123\\nusername backup password hunter2\"\n# TODO: complete the program below.\n",
       "solution": "config = \"username admin password secret123\\nusername backup password hunter2\"\nmasked = []\nfor line in config.splitlines():\n    parts = line.split()\n    if len(parts) == 4 and parts[2] == \"password\":\n        masked.append(f\"{parts[0]} {parts[1]} password ***\")\n    else:\n        masked.append(line)\nprint(\"\\n\".join(masked))\n",
       "solutionExplanation": "The solution builds the required data, applies the Secrets and Credentials technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "username admin password ***\nusername backup password ***",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "username backup password ***",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Secrets and Credentials is the key idea here: Secrets such as passwords and API tokens must never appear in code, logs, or version control, and the safe pattern is to read them from a vault or an environment variable at runtime.",
        "approach": "Work through Secrets and Credentials step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-python-production-m2",
    "title": "Production Network Automation in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-python-production-m2-l1",
      "slug": "netauto-python-production-m2-l1",
      "title": "Testing Automation Code",
      "concept": "Automation code deserves tests just like any other code, and the simplest test is a function that runs the code on known input and asserts the expected output. A test for a config generator feeds it a device dictionary and checks the rendered lines, which catches regressions before the generator runs against real devices. Writing that test as a small assert-based check is the skill, and this lesson practises it.",
      "syntax": "def test_render():\n    assert render({'hostname': 'R1'}) == 'hostname R1'\ntest_render()\nprint('test passed')",
      "exampleCode": "def render(device):\n    return f\"hostname {device['hostname']}\"\n\ndef test_render():\n    assert render({'hostname': 'R1'}) == 'hostname R1'\n    assert render({'hostname': 'R2'}) == 'hostname R2'\n    return 'test_render'\n\nfor test in [test_render]:\n    print(f\"{test()}: PASS\")",
      "exampleLanguage": "python",
      "mistake": "Testing the generator only with the one device it was written for, so a second device with different data breaks it in production.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Testing Automation Code, but it does not work correctly.",
       "buggyCode": "assert render({'hostname': 'R1'}) == 'hostname R1'  # only test",
       "fixedCode": "assert render({'hostname': 'R1'}) == 'hostname R1'\nassert render({'hostname': 'R2'}) == 'hostname R2'",
       "explanation": "One example proves the function works for one input; testing a second device catches assumptions baked in from the first."
      },
      "exercise": {
       "title": "Practise Testing Automation Code",
       "type": "write-code",
       "instructions": "Run the test function test_render, which asserts the render output for R1 and R2, and print '<test name>: PASS' when it returns.",
       "starterCode": "def render(device):\n    return f\"hostname {device['hostname']}\"\n\ndef test_render():\n    assert render({\"hostname\": \"R1\"}) == \"hostname R1\"\n    assert render({\"hostname\": \"R2\"}) == \"hostname R2\"\n    return \"test_render\"\n# TODO: complete the program below.\n",
       "solution": "def render(device):\n    return f\"hostname {device['hostname']}\"\n\ndef test_render():\n    assert render({\"hostname\": \"R1\"}) == \"hostname R1\"\n    assert render({\"hostname\": \"R2\"}) == \"hostname R2\"\n    return \"test_render\"\nfor test in [test_render]:\n    print(f\"{test()}: PASS\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Testing Automation Code technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "test_render: PASS",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "test_render: PASS",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing Automation Code is the key idea here: Automation code deserves tests just like any other code, and the simplest test is a function that runs the code on known input and asserts the expected output.",
        "approach": "Work through Testing Automation Code step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-production-m2-l2",
      "slug": "netauto-python-production-m2-l2",
      "title": "Version Control for Network Configs",
      "concept": "Network configurations belong in version control, and the standard pattern is one Git repository holding the rendered configs, with one commit per change. A commit message names the device and the change, so git log shows the history of every device, and git diff shows exactly what changed between two versions. Backing up a config means committing it, not copying the file to a new name with a date in it.",
      "syntax": "git add configs/r1.cfg\ngit commit -m 'r1: add uplink description'\ngit log --oneline",
      "exampleCode": "$ git add configs/r1.cfg\n$ git commit -m 'r1: add uplink description'\n$ git log --oneline\n9f3a2c1 r1: add uplink description",
      "exampleLanguage": "python",
      "mistake": "Copying configs to files named config-2026-11-24.bak instead of committing them, which loses history and makes diffs manual.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Version Control for Network Configs, but it does not work correctly.",
       "buggyCode": "$ cp r1.cfg r1.cfg.2026-11-24.bak",
       "fixedCode": "$ git add configs/r1.cfg\n$ git commit -m 'r1: add uplink description'",
       "explanation": "Dated copies pile up with no history or diff; a commit records the change, its author, and its message in one place."
      },
      "exercise": {
       "title": "Check your understanding: Version Control for Network Configs",
       "type": "multiple-choice",
       "instructions": "Which statement about Version Control for Network Configs is correct?",
       "starterCode": "",
       "solution": "Network configurations belong in version control, and the standard pattern is one Git repository holding the rendered configs, with one commit per change.",
       "solutionExplanation": "Network configurations belong in version control, and the standard pattern is one Git repository holding the rendered configs, with one commit per change. The other options are false: Version Control for Network Configs is an ordinary, freely available part of Python network automation.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Network configurations belong in version control, and the standard pattern is one Git repository holding the rendered configs, with one commit per change.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Version Control for Network Configs from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and four distractors; choose the statement that is true."
       },
       "options": [
        "Version Control for Network Configs requires a separate paid licence to use",
        "Version Control for Network Configs is not available in Python",
        "Version Control for Network Configs only works on Windows",
        "Network configurations belong in version control, and the standard pattern is one Git repository holding the rendered configs, with one commit per change.",
        "Version Control for Network Configs was removed from Python in the latest version"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-python-production-m2-l3",
      "slug": "netauto-python-production-m2-l3",
      "title": "Scheduling and Running Regularly",
      "concept": "Automation jobs usually run on a schedule, for example a nightly backup, and the schedule is described by a start time plus a repeat interval. Computing the next run times from a start datetime and an interval is datetime arithmetic: add a timedelta once per run. This lesson computes the next three nightly runs from a start time, which is the same calculation a scheduler does.",
      "syntax": "from datetime import datetime, timedelta\nstart = datetime(2026, 11, 24, 2, 0)\nfor i in range(3):\n    print(start + timedelta(days=i))",
      "exampleCode": "from datetime import datetime, timedelta\n\nstart = datetime(2026, 11, 24, 2, 0)\nfor i in range(3):\n    run = start + timedelta(days=i)\n    print(f\"run {i + 1}: {run.strftime('%Y-%m-%d %H:%M')}\")",
      "exampleLanguage": "python",
      "mistake": "Scheduling the job with a relative delay from when the script starts, so a late start shifts every later run.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Scheduling and Running Regularly, but it does not work correctly.",
       "buggyCode": "time.sleep(86400)  # wait a day from now",
       "fixedCode": "next_run = datetime(2026, 11, 25, 2, 0)  # fixed clock time",
       "explanation": "A relative delay drifts with every late start; scheduling on a fixed clock time keeps the nightly run at 02:00 every day."
      },
      "exercise": {
       "title": "Practise Scheduling and Running Regularly",
       "type": "write-code",
       "instructions": "Compute the next three nightly runs starting 2026-11-24 02:00, one day apart. Print 'run <n>: <YYYY-MM-DD HH:MM>' per run.",
       "starterCode": "from datetime import datetime, timedelta\n\nstart = datetime(2026, 11, 24, 2, 0)\n# TODO: complete the program below.\n",
       "solution": "from datetime import datetime, timedelta\n\nstart = datetime(2026, 11, 24, 2, 0)\nfor i in range(3):\n    run = start + timedelta(days=i)\n    print(f\"run {i + 1}: {run.strftime('%Y-%m-%d %H:%M')}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Scheduling and Running Regularly technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "run 1: 2026-11-24 02:00\nrun 2: 2026-11-25 02:00\nrun 3: 2026-11-26 02:00",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "run 3: 2026-11-26 02:00",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Scheduling and Running Regularly is the key idea here: Automation jobs usually run on a schedule, for example a nightly backup, and the schedule is described by a start time plus a repeat interval.",
        "approach": "Work through Scheduling and Running Regularly step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-production-m2-l4",
      "slug": "netauto-python-production-m2-l4",
      "title": "Rollback Plans",
      "concept": "Every change needs a rollback plan, and the simplest one is the inverse of the change: for each line added, remove it, and for each line removed, add it back. A rollback config is generated from the change list before the change is applied, so it is ready the moment something goes wrong. Generating that inverse list from a list of additions and removals is local work, and this lesson practises it.",
      "syntax": "changes = [('add', 'description Uplink'), ('remove', 'shutdown')]",
      "exampleCode": "changes = [('add', ' description Uplink to core'), ('remove', ' shutdown')]\nrollback = []\nfor action, line in changes:\n    if action == 'add':\n        rollback.append(f\"no {line.strip()}\" if not line.strip().startswith('no ') else line.strip()[3:])\n    else:\n        rollback.append(line.strip())\nprint('rollback plan:')\nfor line in rollback:\n    print(f\"  {line}\")",
      "exampleLanguage": "python",
      "mistake": "Planning a rollback by restoring the whole device from backup, when a small inverse change would restore service in seconds.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate Rollback Plans, but it does not work correctly.",
       "buggyCode": "rollback = 'restore backup from last night'",
       "fixedCode": "rollback = ['no description Uplink to core', 'shutdown']",
       "explanation": "A full restore takes the device offline for the whole restore; an inverse change undoes just the bad lines and is far faster."
      },
      "exercise": {
       "title": "Practise Rollback Plans",
       "type": "write-code",
       "instructions": "Build the rollback plan from the change list: an added line is undone with 'no <line>', a removed line is added back as-is. Print 'rollback plan:' followed by one '  <line>' per rollback line.",
       "starterCode": "changes = [(\"add\", \" description Uplink to core\"), (\"remove\", \" shutdown\")]\n# TODO: complete the program below.\n",
       "solution": "changes = [(\"add\", \" description Uplink to core\"), (\"remove\", \" shutdown\")]\nrollback = []\nfor action, line in changes:\n    if action == \"add\":\n        rollback.append(f\"no {line.strip()}\" if not line.strip().startswith(\"no \") else line.strip()[3:])\n    else:\n        rollback.append(line.strip())\nprint(\"rollback plan:\")\nfor line in rollback:\n    print(f\"  {line}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the Rollback Plans technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "rollback plan:\n  no description Uplink to core\n  shutdown",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "shutdown",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rollback Plans is the key idea here: Every change needs a rollback plan, and the simplest one is the inverse of the change: for each line added, remove it, and for each line removed, add it back.",
        "approach": "Work through Rollback Plans step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     },
     {
      "id": "netauto-python-production-m2-l5",
      "slug": "netauto-python-production-m2-l5",
      "title": "A Production Runbook End to End",
      "concept": "A runbook is the ordered list of steps for a production job, and each step names what it does, what it checks, and what to do if it fails. The steps run in order: validate the inventory, preview the change, apply it, verify the result, and log the outcome. Assembling that ordered list from a steps dictionary and printing it is the runbook itself in miniature, and this lesson practises it.",
      "syntax": "steps = ['validate inventory', 'preview change', 'apply change', 'verify result', 'log outcome']",
      "exampleCode": "steps = [\n    ('validate inventory', 'all devices reachable'),\n    ('preview change', 'diff reviewed'),\n    ('apply change', 'no errors'),\n    ('verify result', 'checks pass'),\n    ('log outcome', 'run recorded'),\n]\nfor i, (step, check) in enumerate(steps, 1):\n    print(f\"step {i}: {step} (check: {check})\")\nprint(f\"total steps: {len(steps)}\")",
      "exampleLanguage": "python",
      "mistake": "Writing a runbook that lists what to do but never says how to check each step, so the operator cannot tell whether a step worked.",
      "bug": {
       "prompt": "Find the bug: this Python example should demonstrate A Production Runbook End to End, but it does not work correctly.",
       "buggyCode": "steps = ['validate', 'preview', 'apply', 'verify', 'log']",
       "fixedCode": "steps = [('validate', 'all devices reachable'), ('verify', 'checks pass')]",
       "explanation": "A step without its check is a guess; pairing each step with its success check tells the operator when to stop and roll back."
      },
      "exercise": {
       "title": "Practise A Production Runbook End to End",
       "type": "write-code",
       "instructions": "Print the runbook: one 'step <n>: <step> (check: <check>)' line per step, in order, then 'total steps: <n>'.",
       "starterCode": "steps = [\n    (\"validate inventory\", \"all devices reachable\"),\n    (\"preview change\", \"diff reviewed\"),\n    (\"apply change\", \"no errors\"),\n    (\"verify result\", \"checks pass\"),\n    (\"log outcome\", \"run recorded\"),\n]\n# TODO: complete the program below.\n",
       "solution": "steps = [\n    (\"validate inventory\", \"all devices reachable\"),\n    (\"preview change\", \"diff reviewed\"),\n    (\"apply change\", \"no errors\"),\n    (\"verify result\", \"checks pass\"),\n    (\"log outcome\", \"run recorded\"),\n]\nfor i, (step, check) in enumerate(steps, 1):\n    print(f\"step {i}: {step} (check: {check})\")\nprint(f\"total steps: {len(steps)}\")\n",
       "solutionExplanation": "The solution builds the required data, applies the A Production Runbook End to End technique from the lesson, and prints exactly the expected output.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output",
         "expectedStdout": "step 1: validate inventory (check: all devices reachable)\nstep 2: preview change (check: diff reviewed)\nstep 3: apply change (check: no errors)\nstep 4: verify result (check: checks pass)\nstep 5: log outcome (check: run recorded)\ntotal steps: 5",
         "hidden": false
        },
        {
         "name": "Key output present",
         "expectedContains": "total steps: 5",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Production Runbook End to End is the key idea here: A runbook is the ordered list of steps for a production job, and each step names what it does, what it checks, and what to do if it fails.",
        "approach": "Work through A Production Runbook End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape: set up the inputs, apply the lesson's rule, then print the result in the exact format requested."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Practise Production Network Automation Capstone",
   "type": "write-code",
   "instructions": "Run a production job offline: score the readiness checklist (idempotent True, dry_run True, logging True, error_handling True, rollback False) printing one '[x] <name>' or '[ ] <name>' line each, then 'production ready: yes|no' and 'missing: <names>'. Then preview the change by diffing current ['hostname R1', 'interface GigabitEthernet0/0', ' shutdown'] against desired ['hostname R1', 'interface GigabitEthernet0/0', ' description Uplink to core', ' no shutdown'] with difflib.unified_diff (empty lineterm) and print every diff line. Then print the rollback plan lines 'rollback plan:', '  no description Uplink to core', '  shutdown'. Then print the runbook: 'step 1: validate inventory (check: all devices reachable)', 'step 2: apply change (check: no errors)', 'step 3: verify result (check: checks pass)'.",
   "starterCode": "import difflib\n\nchecks = {\"idempotent\": True, \"dry_run\": True, \"logging\": True, \"error_handling\": True, \"rollback\": False}\ncurrent = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" shutdown\"]\ndesired = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description Uplink to core\", \" no shutdown\"]\n# TODO: complete the capstone program below.\n",
   "solution": "import difflib\n\nchecks = {\"idempotent\": True, \"dry_run\": True, \"logging\": True, \"error_handling\": True, \"rollback\": False}\ncurrent = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" shutdown\"]\ndesired = [\"hostname R1\", \"interface GigabitEthernet0/0\", \" description Uplink to core\", \" no shutdown\"]\nfor name, done in checks.items():\n    print(f\"{'[x]' if done else '[ ]'} {name}\")\nprint(f\"production ready: {'yes' if all(checks.values()) else 'no'}\")\nmissing = [name for name, done in checks.items() if not done]\nprint(f\"missing: {', '.join(missing) if missing else 'none'}\")\nfor line in difflib.unified_diff(current, desired, lineterm=\"\"):\n    print(line)\nprint(\"rollback plan:\")\nprint(\"  no description Uplink to core\")\nprint(\"  shutdown\")\nprint(\"step 1: validate inventory (check: all devices reachable)\")\nprint(\"step 2: apply change (check: no errors)\")\nprint(\"step 3: verify result (check: checks pass)\")\n",
   "solutionExplanation": "The solution combines the track's techniques: it reads the input data, validates it, builds the required output, and prints exactly the expected result.",
   "complexity": "Medium",
   "tests": [
    {
     "name": "Expected output",
     "expectedStdout": "[x] idempotent\n[x] dry_run\n[x] logging\n[x] error_handling\n[ ] rollback\nproduction ready: no\nmissing: rollback\n--- \n+++ \n@@ -1,3 +1,4 @@\n hostname R1\n interface GigabitEthernet0/0\n- shutdown\n+ description Uplink to core\n+ no shutdown\nrollback plan:\n  no description Uplink to core\n  shutdown\nstep 1: validate inventory (check: all devices reachable)\nstep 2: apply change (check: no errors)\nstep 3: verify result (check: checks pass)",
     "hidden": false
    },
    {
     "name": "Key output present",
     "expectedContains": "missing: rollback",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Combine the track's core ideas: data in, validation, then output.",
    "approach": "Break the capstone into small steps and test each one before moving on.",
    "structure": "Set up the inputs, validate them, build the output, then print it."
   }
  },
  "capstone": {
   "title": "Production Network Automation Capstone Project",
   "description": "A small end-to-end production job: score readiness, preview a change, print the rollback plan, and run the runbook.",
   "requirements": [
    "Use the core ideas of Production Network Automation in a working Python program.",
    "Score the readiness checklist and report what is missing.",
    "Preview the change with a full diff before applying anything.",
    "Print the rollback plan for the change.",
    "Verify the output matches the expected result exactly."
   ],
   "rubric": [
    "The solution runs and scores, diffs, and plans correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
