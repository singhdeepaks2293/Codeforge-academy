import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
 {
  "id": "netauto-ansible-network-foundations",
  "slug": "netauto-ansible-network-foundations",
  "language": "ansible",
  "category": "devops",
  "title": "Ansible for Networks Foundations",
  "description": "Learn why network engineers automate with Ansible, how Ansible reaches network devices, and how to run your first network playbook safely on localhost.",
  "difficulty": "Beginner",
  "estimatedHours": 9,
  "skills": [
   "Network automation concepts",
   "Ansible connection plugins",
   "Network playbooks",
   "Ansible Vault",
   "Check mode and diff",
   "Network variables",
   "Idempotent network tasks",
   "Ansible facts"
  ],
  "prerequisites": [],
  "analogy": "Learning {topic} is like learning to conduct an orchestra: one score tells every instrument what to play, and the whole network performs together instead of one musician at a time.",
  "modules": [
   {
    "id": "netauto-ansible-network-foundations-m1",
    "title": "Ansible for Networks Foundations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-network-foundations-m1-l1",
      "slug": "netauto-ansible-network-foundations-m1-l1",
      "title": "Why Automate Networks with Ansible",
      "concept": "Network automation replaces slow, error-prone manual CLI typing with repeatable playbooks that configure every device the same way. A change that takes an engineer an hour of pasting commands across twenty switches becomes one playbook run that finishes in minutes. Automation also creates an audit trail, because the playbook itself records exactly what was intended.",
      "syntax": "ansible-playbook site.yml\nansible-playbook site.yml --check",
      "exampleCode": "---\n- name: Show the automation goal\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: State the goal\n      ansible.builtin.debug:\n        msg: \"One playbook configures all twenty switches\"",
      "exampleLanguage": "ansible",
      "mistake": "Automating a broken manual process without fixing it first, so the playbook repeats the same mistake on every device faster than a human could.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Why Automate Networks with Ansible, but it does not work correctly.",
       "buggyCode": "- name: Configure switches\n  hosts: all\n  tasks:\n    - name: Paste commands\n      ansible.builtin.command: configure terminal",
       "fixedCode": "---\n- name: Configure switches\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Describe the desired state\n      ansible.builtin.debug:\n        msg: \"Switches configured from one playbook\"",
       "explanation": "Typing raw CLI commands through the command module is not automation: it repeats the manual process without any desired-state checking, and it is not idempotent."
      },
      "exercise": {
       "title": "Practise Why Automate Networks with Ansible",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Network automation starts here\" with the debug module. This exercise practises Why Automate Networks with Ansible.",
       "starterCode": "---\n- name: Why Automate Networks with Ansible\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Why Automate Networks with Ansible\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the automation goal\n      ansible.builtin.set_fact:\n        device_count: 20\n        goal: \"one playbook for all switches\"\n    - name: Show the goal\n      ansible.builtin.debug:\n        msg: \"Automating {{ device_count }} switches with {{ goal }}\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Network automation starts here\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Network automation starts here",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Why Automate Networks with Ansible is the key idea here: Network automation replaces slow, error-prone manual CLI typing with repeatable playbooks that configure every device the same way.",
        "approach": "Work through Why Automate Networks with Ansible step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-foundations-m1-l2",
      "slug": "netauto-ansible-network-foundations-m1-l2",
      "title": "Ansible Versus Manual CLI Configuration",
      "concept": "Manual CLI configuration depends on the engineer typing the same commands correctly on every device, which is slow and drifts over time as devices are changed by hand. Ansible playbooks store the intended configuration in version-controlled files, so the same input always produces the same intended state. The difference shows up most clearly during audits, when a playbook proves what was configured and when.",
      "syntax": "show running-config   # manual, per device\nansible-playbook site.yml   # automated, all devices",
      "exampleCode": "$ ssh switch1\nswitch1# configure terminal\nswitch1(config)# vlan 10\nswitch1(config-vlan)# name STAFF",
      "exampleLanguage": "ansible",
      "mistake": "Ansible is not a magic fix for a network nobody understands; if the intended design is unclear, the playbook will automate the confusion.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Ansible Versus Manual CLI Configuration, but it does not work correctly.",
       "buggyCode": "switch1# vlan 10\nswitch1# vlan 10\nswitch1# vlan 10   # typed three times on three switches, one typo",
       "fixedCode": "---\n- name: One VLAN everywhere\n  hosts: switches\n  tasks:\n    - name: Create VLAN 10\n      cisco.ios.ios_vlans:\n        config:\n          - name: STAFF\n            vlan_id: 10\n        state: merged",
       "explanation": "The example above uses the ios_vlans resource module, which you run against real or lab devices; the point is that one task creates VLAN 10 identically on every switch instead of retyping it."
      },
      "exercise": {
       "title": "Practise Ansible Versus Manual CLI Configuration",
       "type": "write-code",
       "instructions": "Write a playbook that stores the intended VLANs as variables, renders the same VLAN config for every switch, writes it to a file, and prints \"vlan 10\" with the debug module. This exercise practises Ansible Versus Manual CLI Configuration.",
       "starterCode": "---\n- name: Ansible Versus Manual CLI Configuration\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Ansible Versus Manual CLI Configuration\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the VLAN config data\n      ansible.builtin.set_fact:\n        vlans:\n          - {id: 10, name: STAFF}\n          - {id: 20, name: VOICE}\n    - name: Render the VLAN config\n      ansible.builtin.set_fact:\n        rendered: \"{% for v in vlans %}vlan {{ v.id }}\\n name {{ v.name }}\\n{% endfor %}\"\n    - name: Write the rendered VLAN config\n      ansible.builtin.copy:\n        dest: ./netauto-foundations-manual-cli.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered VLAN config\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the VLAN config\n      ansible.builtin.assert:\n        that:\n          - \"'vlan 10' in rendered\"\n          - \"'name STAFF' in rendered\"\n        fail_msg: \"The rendered VLAN config is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"One playbook configures every switch the same way\"\n",
       "solutionExplanation": "The playbook keeps the intended VLANs in one version-controlled data model and renders identical config text from it, so every switch gets the same VLANs instead of hand-typed commands that drift.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "vlan 10",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Ansible playbooks store the intended configuration in version-controlled files, so the same input always produces the same intended state.",
        "approach": "Define the VLANs once as a list of variables, loop over them in a Jinja template to render the config, then assert the rendered text contains the VLAN lines.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-foundations-m1-l3",
      "slug": "netauto-ansible-network-foundations-m1-l3",
      "title": "How Ansible Talks to Network Devices",
      "concept": "Ansible reaches network devices through connection plugins, and network devices normally use network_cli for SSH-based CLI sessions or httpapi for REST APIs. The ansible_network_os variable tells Ansible which platform a device is, for example ios for Cisco IOS or nxos for Cisco NX-OS, so it picks the right connection and modules. Gathering facts over these connections is slower than on servers, so network playbooks usually set gather_facts to false and fetch only the facts they need.",
      "syntax": "ansible_network_os: ios\nansible_connection: network_cli\nansible_connection: httpapi",
      "exampleCode": "---\n- name: Show the connection\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    ansible_network_os: ios\n    ansible_connection: network_cli\n  tasks:\n    - name: Print the connection\n      ansible.builtin.debug:\n        msg: \"Connecting with network_cli to an ios device\"",
      "exampleLanguage": "ansible",
      "mistake": "Using the default ssh connection for a network device, which expects a Linux shell and fails on a device CLI prompt.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate How Ansible Talks to Network Devices, but it does not work correctly.",
       "buggyCode": "- name: Talk to a switch\n  hosts: switch1\n  tasks:\n    - name: Show version\n      ansible.builtin.command: show version",
       "fixedCode": "---\n- name: Talk to a switch\n  hosts: switch1\n  connection: network_cli\n  vars:\n    ansible_network_os: ios\n  tasks:\n    - name: Show version\n      cisco.ios.ios_command:\n        commands: show version",
       "explanation": "Network devices need a network connection plugin such as network_cli; the plain ssh connection and the command module assume a server shell that a switch does not have."
      },
      "exercise": {
       "title": "Practise How Ansible Talks to Network Devices",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"network_cli connects to ios devices\" with the debug module. This exercise practises How Ansible Talks to Network Devices.",
       "starterCode": "---\n- name: How Ansible Talks to Network Devices\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: How Ansible Talks to Network Devices\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the connection facts\n      ansible.builtin.set_fact:\n        ansible_network_os: ios\n        ansible_connection: network_cli\n    - name: Show the connection\n      ansible.builtin.debug:\n        msg: \"network_cli connects to ios devices\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"network_cli connects to ios devices\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "network_cli connects to ios devices",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "How Ansible Talks to Network Devices is the key idea here: Ansible reaches network devices through connection plugins, and network devices normally use network_cli for SSH-based CLI sessions or httpapi for REST APIs.",
        "approach": "Work through How Ansible Talks to Network Devices step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-foundations-m1-l4",
      "slug": "netauto-ansible-network-foundations-m1-l4",
      "title": "Your First Network Playbook Shape",
      "concept": "A network playbook has the same shape as any Ansible playbook: a play naming its hosts, a connection, and a list of tasks that call modules. Network plays usually add vars such as ansible_network_os and ansible_connection, and they set gather_facts to false because network facts are gathered explicitly when needed. Keeping one play per device role, such as core switches or access switches, makes the playbook easy to read and safe to limit with --limit.",
      "syntax": "---\n- name: Configure access switches\n  hosts: access\n  connection: network_cli\n  gather_facts: false\n  tasks: [...]",
      "exampleCode": "---\n- name: Configure access switches\n  hosts: access\n  connection: network_cli\n  gather_facts: false\n  vars:\n    ansible_network_os: ios\n  tasks:\n    - name: Create VLAN 10\n      cisco.ios.ios_vlans:\n        config:\n          - name: STAFF\n            vlan_id: 10\n        state: merged",
      "exampleLanguage": "ansible",
      "mistake": "Writing network tasks with the server connection defaults and forgetting ansible_network_os, so Ansible does not know which platform the device is.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Your First Network Playbook Shape, but it does not work correctly.",
       "buggyCode": "---\n- name: Configure switches\n  hosts: access\n  tasks:\n    - name: Create VLAN 10\n      cisco.ios.ios_vlans:\n        config:\n          - name: STAFF\n            vlan_id: 10",
       "fixedCode": "---\n- name: Configure switches\n  hosts: access\n  connection: network_cli\n  gather_facts: false\n  vars:\n    ansible_network_os: ios\n  tasks:\n    - name: Create VLAN 10\n      cisco.ios.ios_vlans:\n        config:\n          - name: STAFF\n            vlan_id: 10\n        state: merged",
       "explanation": "A network play without a connection plugin and ansible_network_os leaves Ansible guessing the platform; the fixed play declares both, and a state argument, before any task runs. Run this only against a lab device or Containerlab topology, never a production switch."
      },
      "exercise": {
       "title": "Check your understanding: Your First Network Playbook Shape",
       "type": "multiple-choice",
       "instructions": "Which statement about Your First Network Playbook Shape is correct?",
       "starterCode": "",
       "solution": "A network playbook has the same shape as any Ansible playbook: a play naming its hosts, a connection, and a list of tasks that call modules.",
       "solutionExplanation": "A network playbook has the same shape as any Ansible playbook: a play naming its hosts, a connection, and a list of tasks that call modules. The other options are false: Your First Network Playbook Shape is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A network playbook has the same shape as any Ansible playbook: a play naming its hosts, a connection, and a list of tasks that call modules.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Your First Network Playbook Shape from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Your First Network Playbook Shape can only be used once in a program",
        "Your First Network Playbook Shape requires a separate paid licence to use",
        "Your First Network Playbook Shape was removed from Ansible in the latest version",
        "A network playbook has the same shape as any Ansible playbook: a play naming its hosts, a connection, and a list of tasks that call modules.",
        "Your First Network Playbook Shape only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-network-foundations-m1-l5",
      "slug": "netauto-ansible-network-foundations-m1-l5",
      "title": "Network Connection Plugins Explained",
      "concept": "The network_cli connection plugin opens an SSH session to a device CLI and sends commands through it, which works for almost every network device. The httpapi plugin talks to a device REST API instead, which is faster and returns structured data, but it needs the device API enabled and a matching httpapi plugin. The local connection is what you use in this course's exercises, because there is no real device here: it runs the playbook on the control node itself.",
      "syntax": "ansible_connection: network_cli   # SSH CLI\nansible_connection: httpapi       # REST API\nansible_connection: local         # control node",
      "exampleCode": "---\n- name: Compare connections\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: List the plugins\n      ansible.builtin.debug:\n        msg: \"network_cli uses SSH, httpapi uses REST, local runs here\"",
      "exampleLanguage": "ansible",
      "mistake": "Assuming httpapi works on every device, when many devices only expose a CLI and need network_cli.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Network Connection Plugins Explained, but it does not work correctly.",
       "buggyCode": "---\n- name: Talk to a device\n  hosts: switch1\n  connection: httpapi\n  vars:\n    ansible_network_os: ios\n  tasks:\n    - name: Get facts\n      cisco.ios.ios_facts:",
       "fixedCode": "---\n- name: Talk to a device\n  hosts: switch1\n  connection: network_cli\n  vars:\n    ansible_network_os: ios\n  tasks:\n    - name: Get facts\n      cisco.ios.ios_facts:",
       "explanation": "httpapi needs the device REST API enabled and a matching plugin; for a classic IOS device the safe default is network_cli over SSH."
      },
      "exercise": {
       "title": "Practise Network Connection Plugins Explained",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"network_cli uses SSH and httpapi uses REST\" with the debug module. This exercise practises Network Connection Plugins Explained.",
       "starterCode": "---\n- name: Network Connection Plugins Explained\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Network Connection Plugins Explained\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Record the three plugins\n      ansible.builtin.set_fact:\n        cli_plugin: network_cli\n        api_plugin: httpapi\n        local_plugin: local\n    - name: Compare the plugins\n      ansible.builtin.debug:\n        msg: \"network_cli uses SSH and httpapi uses REST\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"network_cli uses SSH and httpapi uses REST\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "network_cli uses SSH and httpapi uses REST",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Network Connection Plugins Explained is the key idea here: The network_cli connection plugin opens an SSH session to a device CLI and sends commands through it, which works for almost every network device.",
        "approach": "Work through Network Connection Plugins Explained step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-network-foundations-m2",
    "title": "Ansible for Networks Foundations in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-ansible-network-foundations-m2-l1",
      "slug": "netauto-ansible-network-foundations-m2-l1",
      "title": "Gathering Facts from Network Devices",
      "concept": "Network facts are collected by facts modules such as ios_facts, which return structured data about interfaces, routing, and the device model. Unlike server facts, network facts are gathered on demand by a task, because connecting to every device just to collect facts would be slow. Playbooks use those facts to make decisions, for example only configuring an interface that the facts say exists.",
      "syntax": "cisco.ios.ios_facts:\n  gather_subset: interfaces\nansible_facts.net_interfaces",
      "exampleCode": "- name: Gather IOS facts\n  cisco.ios.ios_facts:\n    gather_subset: interfaces",
      "exampleLanguage": "ansible",
      "mistake": "Gathering all facts on every play, which opens a slow session to every device even when the playbook only needs one interface name.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Gathering Facts from Network Devices, but it does not work correctly.",
       "buggyCode": "- name: Gather everything\n  hosts: all\n  gather_facts: true\n  tasks:\n    - name: Create a VLAN\n      cisco.ios.ios_vlans:\n        config:\n          - name: STAFF\n            vlan_id: 10",
       "fixedCode": "---\n- name: Gather only what is needed\n  hosts: all\n  connection: network_cli\n  gather_facts: false\n  tasks:\n    - name: Gather interface facts\n      cisco.ios.ios_facts:\n        gather_subset: interfaces\n    - name: Create VLAN 10\n      cisco.ios.ios_vlans:\n        config:\n          - name: STAFF\n            vlan_id: 10\n        state: merged",
       "explanation": "Server-style gather_facts opens a session to every device up front; network playbooks set gather_facts to false and call the facts module with a narrow gather_subset only when they need facts."
      },
      "exercise": {
       "title": "Practise Gathering Facts from Network Devices",
       "type": "write-code",
       "instructions": "Write a playbook that models the structured facts a facts module would return, renders a summary of the device and its interfaces, writes it to a file, and prints \"GigabitEthernet0/1 is up\" with the debug module. This exercise practises Gathering Facts from Network Devices.",
       "starterCode": "---\n- name: Gathering Facts from Network Devices\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Gathering Facts from Network Devices\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the facts summary data\n      ansible.builtin.set_fact:\n        device_facts:\n          model: C9300\n          version: 17.6.1\n          interfaces:\n            - {name: GigabitEthernet0/1, status: up, address: \"192.0.2.1/24\"}\n            - {name: GigabitEthernet0/2, status: down, address: \"\"}\n    - name: Render the facts summary\n      ansible.builtin.set_fact:\n        rendered: \"device {{ device_facts.model }} ios {{ device_facts.version }}\\n{% for i in device_facts.interfaces %}interface {{ i.name }} is {{ i.status }}\\n{% endfor %}\"\n    - name: Write the rendered facts summary\n      ansible.builtin.copy:\n        dest: ./netauto-foundations-facts.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered facts summary\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the facts summary\n      ansible.builtin.assert:\n        that:\n          - \"'C9300' in rendered\"\n          - \"'GigabitEthernet0/1 is up' in rendered\"\n        fail_msg: \"The rendered facts summary is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Facts gathered: only configure interfaces the facts say exist\"\n",
       "solutionExplanation": "The playbook treats the gathered facts as structured data and renders decisions from them, the way a real playbook only configures an interface the facts say exists. The facts here are modelled locally; on a real device ios_facts would return them.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "GigabitEthernet0/1 is up",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Network facts are collected on demand by a facts module and returned as structured data that playbooks use to make decisions.",
        "approach": "Put the device model, version, and interface list into one facts variable, then loop over the interfaces in the template to render one summary line per interface.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-foundations-m2-l2",
      "slug": "netauto-ansible-network-foundations-m2-l2",
      "title": "Network Variables and Host Variables",
      "concept": "Variables let one playbook serve many devices by holding the values that differ, such as hostnames, VLAN numbers, and interface names. Host variables live in host_vars for a single device, group variables in group_vars for a whole group, and play variables in the play itself. Ansible resolves them by precedence, with more specific variables winning over more general ones.",
      "syntax": "host_vars/switch1.yml\ngroup_vars/access.yml\nvars:\n  vlan_id: 10",
      "exampleCode": "---\n- name: Use device variables\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    hostname: access1\n    vlan_id: 10\n    vlan_name: STAFF\n  tasks:\n    - name: Show the device plan\n      ansible.builtin.debug:\n        msg: \"{{ hostname }} gets VLAN {{ vlan_id }} ({{ vlan_name }})\"",
      "exampleLanguage": "ansible",
      "mistake": "Hard-coding a VLAN number in every task instead of a variable, so changing the VLAN means editing ten tasks instead of one value.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Network Variables and Host Variables, but it does not work correctly.",
       "buggyCode": "---\n- name: Configure VLAN\n  hosts: access\n  tasks:\n    - name: Create VLAN 10\n      cisco.ios.ios_vlans:\n        config:\n          - name: STAFF\n            vlan_id: 10\n        state: merged\n    - name: Assign VLAN 10\n      cisco.ios.ios_l2_interfaces:\n        config:\n          - name: GigabitEthernet0/1\n            access:\n              vlan: 10",
       "fixedCode": "---\n- name: Configure VLAN\n  hosts: access\n  vars:\n    vlan_id: 10\n    vlan_name: STAFF\n  tasks:\n    - name: Create the VLAN\n      cisco.ios.ios_vlans:\n        config:\n          - name: \"{{ vlan_name }}\"\n            vlan_id: \"{{ vlan_id }}\"\n        state: merged",
       "explanation": "A literal VLAN number copied into every task is one edit away from inconsistency; a single vlan_id variable keeps every task in agreement. The fixed play runs against a lab device only."
      },
      "exercise": {
       "title": "Practise Network Variables and Host Variables",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"access1 gets VLAN 10 (STAFF)\" with the debug module. This exercise practises Network Variables and Host Variables.",
       "starterCode": "---\n- name: Network Variables and Host Variables\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Network Variables and Host Variables\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device variables\n      ansible.builtin.set_fact:\n        hostname: access1\n        vlan_id: 10\n        vlan_name: STAFF\n    - name: Show the device plan\n      ansible.builtin.debug:\n        msg: \"access1 gets VLAN 10 (STAFF)\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"access1 gets VLAN 10 (STAFF)\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "access1 gets VLAN 10 (STAFF)",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Network Variables and Host Variables is the key idea here: Variables let one playbook serve many devices by holding the values that differ, such as hostnames, VLAN numbers, and interface names.",
        "approach": "Work through Network Variables and Host Variables step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-foundations-m2-l3",
      "slug": "netauto-ansible-network-foundations-m2-l3",
      "title": "Ansible Vault for Device Credentials",
      "concept": "Ansible Vault encrypts sensitive values such as device passwords and API tokens so they can be stored in version control without exposing them. You encrypt a variables file with ansible-vault encrypt, and Ansible decrypts it at run time when you pass --ask-vault-pass or a vault password file. Device credentials must never be written in plain text in a playbook or inventory.",
      "syntax": "ansible-vault encrypt group_vars/all/vault.yml\nansible-playbook site.yml --ask-vault-pass",
      "exampleCode": "$ ansible-vault encrypt group_vars/all/vault.yml\nNew Vault password: ****\nEncryption successful",
      "exampleLanguage": "ansible",
      "mistake": "Committing a plain-text device password to Git because the playbook worked without Vault, and only noticing when the repository is shared.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Ansible Vault for Device Credentials, but it does not work correctly.",
       "buggyCode": "ansible_user: admin\nansible_password: changeme123",
       "fixedCode": "ansible_user: admin\nansible_password: \"{{ vault_device_password }}\"   # from group_vars/all/vault.yml, encrypted with ansible-vault",
       "explanation": "A plain-text password in an inventory is readable by anyone with repository access; Vault encrypts the value and Ansible decrypts it only at run time with the vault password."
      },
      "exercise": {
       "title": "Check your understanding: Ansible Vault for Device Credentials",
       "type": "multiple-choice",
       "instructions": "Which statement about Ansible Vault for Device Credentials is correct?",
       "starterCode": "",
       "solution": "Ansible Vault encrypts sensitive values such as device passwords and API tokens so they can be stored in version control without exposing them.",
       "solutionExplanation": "Ansible Vault encrypts sensitive values such as device passwords and API tokens so they can be stored in version control without exposing them. The other options are false: Ansible Vault for Device Credentials is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Ansible Vault encrypts sensitive values such as device passwords and API tokens so they can be stored in version control without exposing them.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Ansible Vault for Device Credentials from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Ansible Vault for Device Credentials can only be used once in a program",
        "Ansible Vault for Device Credentials requires a separate paid licence to use",
        "Ansible Vault encrypts sensitive values such as device passwords and API tokens so they can be stored in version control without exposing them.",
        "Ansible Vault for Device Credentials was removed from Ansible in the latest version",
        "Ansible Vault for Device Credentials only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-network-foundations-m2-l4",
      "slug": "netauto-ansible-network-foundations-m2-l4",
      "title": "Running a Playbook Against Localhost Safely",
      "concept": "Running a network playbook against localhost with connection local lets you practise the Ansible mechanics with no device at risk. The --check flag adds a dry run that reports what would change, and --diff shows the exact lines, so you review a playbook before it ever touches a device. This localhost-first habit is how you test logic, templates, and variables before a lab run, and --check runs a playbook in dry-run mode without changing anything on the target.",
      "syntax": "ansible-playbook site.yml --check --diff\nansible-playbook site.yml --limit localhost",
      "exampleCode": "---\n- name: Safe local run\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write a practice file\n      ansible.builtin.copy:\n        dest: ./practice.txt\n        content: \"safe local run\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Testing a new network playbook directly against production devices instead of localhost and a lab first.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Running a Playbook Against Localhost Safely, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # straight at production",
       "fixedCode": "$ ansible-playbook site.yml --check --diff\n$ ansible-playbook site.yml --limit lab-switch1",
       "explanation": "A first run should always be a dry run with --check and --diff, then a limited run against one lab device; only then does it go wider."
      },
      "exercise": {
       "title": "Practise Running a Playbook Against Localhost Safely",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Safe local run complete\" with the debug module. This exercise practises Running a Playbook Against Localhost Safely.",
       "starterCode": "---\n- name: Running a Playbook Against Localhost Safely\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Running a Playbook Against Localhost Safely\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write a practice file\n      ansible.builtin.copy:\n        dest: ./netauto-practice.txt\n        content: \"safe local run\"\n        mode: \"0644\"\n    - name: Confirm the safe run\n      ansible.builtin.debug:\n        msg: \"Safe local run complete\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Safe local run complete\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Safe local run complete",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Running a Playbook Against Localhost Safely is the key idea here: Running a network playbook against localhost with connection local lets you practise the Ansible mechanics with no device at risk.",
        "approach": "Work through Running a Playbook Against Localhost Safely step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-foundations-m2-l5",
      "slug": "netauto-ansible-network-foundations-m2-l5",
      "title": "A Network Automation Workflow End to End",
      "concept": "A complete network automation workflow moves in order: design the intended state, write it as variables and templates, test the playbook with --check on localhost and in a lab, run it in a change window, and verify the result with facts or a diff. Each step leaves evidence, from the Git commit to the playbook recap, so the change can be reviewed and repeated. Skipping the lab step is the most common way a small typo becomes a network outage.",
      "syntax": "Design, write, test, run, and verify: a network change moves through those five stages in order.",
      "exampleCode": "design -> variables -> templates -> --check -> lab -> change window -> verify",
      "exampleLanguage": "ansible",
      "mistake": "Treating the playbook run as the whole workflow and skipping verification, so nobody notices the device did not actually reach the intended state.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Network Automation Workflow End to End, but it does not work correctly.",
       "buggyCode": "- name: Push config\n  hosts: core\n  tasks:\n    - name: Apply the config\n      cisco.ios.ios_config:\n        src: core.cfg",
       "fixedCode": "---\n- name: Push and verify\n  hosts: core\n  connection: network_cli\n  gather_facts: false\n  tasks:\n    - name: Apply the config\n      cisco.ios.ios_config:\n        src: core.cfg\n        backup: true\n    - name: Verify the result\n      cisco.ios.ios_command:\n        commands: show running-config | include vlan",
       "explanation": "Applying a config without a backup or a verification step leaves you blind; the fixed play backs up first and then checks the running config. Run it only in a lab or change window."
      },
      "exercise": {
       "title": "Practise A Network Automation Workflow End to End",
       "type": "write-code",
       "instructions": "Write a playbook that stores the automation workflow steps in order as a list, renders them as numbered steps, writes the plan to a file, and prints \"step 7: verify\" with the debug module. This exercise practises A Network Automation Workflow End to End.",
       "starterCode": "---\n- name: A Network Automation Workflow End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Network Automation Workflow End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the workflow plan data\n      ansible.builtin.set_fact:\n        workflow_steps:\n          - design\n          - variables\n          - templates\n          - check\n          - lab\n          - change window\n          - verify\n    - name: Render the workflow plan\n      ansible.builtin.set_fact:\n        rendered: \"{% for s in workflow_steps %}step {{ loop.index }}: {{ s }}\\n{% endfor %}\"\n    - name: Write the rendered workflow plan\n      ansible.builtin.copy:\n        dest: ./netauto-foundations-workflow.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered workflow plan\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the workflow plan\n      ansible.builtin.assert:\n        that:\n          - \"'step 4: check' in rendered\"\n          - \"'step 7: verify' in rendered\"\n        fail_msg: \"The rendered workflow plan is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Workflow complete: design to verify, with evidence at every step\"\n",
       "solutionExplanation": "The playbook renders the workflow as an ordered list, so the check and lab steps come before the change window and the verify step closes the run, leaving evidence at every step.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "step 7: verify",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A complete network automation workflow moves in order: design, variables, templates, check, lab, change window, then verify.",
        "approach": "Store the seven steps as a list in order, then use loop.index in the template to number each step as it renders.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Ansible for Networks Foundations",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Ansible for Networks Foundations Capstone.",
   "starterCode": "---\n- name: Ansible for Networks Foundations capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Ansible for Networks Foundations capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-network-foundations.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Ansible for Networks Foundations\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Ansible for Networks Foundations",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Ansible for Networks Foundations Capstone is the key idea here: Ansible for Networks Foundations brings the whole track together.",
    "approach": "Work through Ansible for Networks Foundations Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Ansible for Networks Foundations Capstone Project",
   "description": "A small end-to-end project that puts Ansible for Networks Foundations into practice.",
   "requirements": [
    "Use the core ideas of Ansible for Networks Foundations in a working playbook.",
    "Apply at least three of these skills: Network automation concepts, Ansible connection plugins, Network playbooks, Ansible Vault.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Ansible for Networks Foundations correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-network-inventory",
  "slug": "netauto-ansible-network-inventory",
  "language": "ansible",
  "category": "devops",
  "title": "Network Inventory and Variables",
  "description": "Design inventories for real networks: groups for sites and roles, host and group variables, precedence, and validation before a playbook ever runs.",
  "difficulty": "Beginner",
  "estimatedHours": 8,
  "skills": [
   "Network inventories",
   "Inventory groups",
   "host_vars and group_vars",
   "Variable precedence",
   "YAML inventory",
   "Dynamic inventory",
   "Interface variables",
   "Inventory validation"
  ],
  "prerequisites": [
   "netauto-ansible-network-foundations"
  ],
  "analogy": "Learning {topic} is like learning to organise a library: every device needs a shelf, a label, and a card that says what makes it different from its neighbours.",
  "modules": [
   {
    "id": "netauto-ansible-network-inventory-m1",
    "title": "Network Inventory and Variables Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-network-inventory-m1-l1",
      "slug": "netauto-ansible-network-inventory-m1-l1",
      "title": "Building a Network Inventory",
      "concept": "An inventory is the file that tells Ansible which network devices exist and how to reach them, with each device listed under a group such as core, access, or firewalls. Every device entry carries its connection details, usually ansible_host for the management address and ansible_network_os for the platform. A well-built inventory is the single source of truth for which devices a playbook can touch.",
      "syntax": "[core]\ncore1 ansible_host=192.0.2.1\n[access]\naccess1 ansible_host=192.0.2.11",
      "exampleCode": "[core]\ncore1 ansible_host=192.0.2.1 ansible_network_os=ios\ncore2 ansible_host=192.0.2.2 ansible_network_os=ios\n\n[access]\naccess1 ansible_host=192.0.2.11 ansible_network_os=ios",
      "exampleLanguage": "ansible",
      "mistake": "Listing devices with only a hostname and no ansible_host, so Ansible tries to resolve a name that only exists in the engineer's head.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Building a Network Inventory, but it does not work correctly.",
       "buggyCode": "[switches]\nswitch1\nswitch2",
       "fixedCode": "[switches]\nswitch1 ansible_host=192.0.2.11 ansible_network_os=ios\nswitch2 ansible_host=192.0.2.12 ansible_network_os=ios",
       "explanation": "A bare hostname is not an address; each device needs ansible_host and ansible_network_os so Ansible knows where to connect and which platform to expect."
      },
      "exercise": {
       "title": "Practise Building a Network Inventory",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Inventory holds core1, core2, and access1\" with the debug module. This exercise practises Building a Network Inventory.",
       "starterCode": "---\n- name: Building a Network Inventory\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Building a Network Inventory\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Define the inventory\n      ansible.builtin.set_fact:\n        inventory_groups:\n          core: [core1, core2]\n          access: [access1]\n    - name: Show the inventory\n      ansible.builtin.debug:\n        msg: \"Inventory holds core1, core2, and access1\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Inventory holds core1, core2, and access1\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Inventory holds core1, core2, and access1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Building a Network Inventory is the key idea here: An inventory is the file that tells Ansible which network devices exist and how to reach them, with each device listed under a group such as core, access, or firewalls.",
        "approach": "Work through Building a Network Inventory step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-inventory-m1-l2",
      "slug": "netauto-ansible-network-inventory-m1-l2",
      "title": "Inventory Groups for Sites and Roles",
      "concept": "Inventory groups let a playbook target exactly the devices a change applies to, such as all core switches, or all devices at one site. Groups can be nested, so a site group contains role groups, and a device can belong to several groups at once. This is what makes --limit and group-targeted plays safe: the blast radius is chosen in the inventory, not in the heat of a change.",
      "syntax": "[site_a:children]\ncore\naccess\n[core]\ncore1\n[access]\naccess1",
      "exampleCode": "[site_a:children]\ncore\naccess\n\n[site_b:children]\ncore\naccess",
      "exampleLanguage": "ansible",
      "mistake": "Creating one group per device, which defeats the purpose of grouping and forces every play to list devices by hand.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Inventory Groups for Sites and Roles, but it does not work correctly.",
       "buggyCode": "[core1]\ncore1\n[core2]\ncore2\n[access1]\naccess1",
       "fixedCode": "[core]\ncore1\ncore2\n\n[access]\naccess1\naccess2\n\n[site_a:children]\ncore\naccess",
       "explanation": "Groups exist to address devices by role and site; one group per device is just a longer way of writing a flat list."
      },
      "exercise": {
       "title": "Practise Inventory Groups for Sites and Roles",
       "type": "write-code",
       "instructions": "Write a playbook that stores two sites, each with core and access groups, renders the nested group inventory, writes it to a file, and prints \"[site_a:children]\" with the debug module. This exercise practises Inventory Groups for Sites and Roles.",
       "starterCode": "---\n- name: Inventory Groups for Sites and Roles\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Inventory Groups for Sites and Roles\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the inventory data\n      ansible.builtin.set_fact:\n        sites:\n          - name: site_a\n            groups:\n              - core\n              - access\n          - name: site_b\n            groups:\n              - core\n              - access\n    - name: Render the inventory\n      ansible.builtin.set_fact:\n        rendered: \"{% for s in sites %}[{{ s.name }}:children]\\n{% for g in s.groups %}{{ g }}\\n{% endfor %}{% endfor %}\"\n    - name: Write the rendered inventory\n      ansible.builtin.copy:\n        dest: ./netauto-inventory-groups.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered inventory\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the inventory\n      ansible.builtin.assert:\n        that:\n          - \"'[site_a:children]' in rendered\"\n          - \"'access' in rendered\"\n        fail_msg: \"The rendered inventory is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Inventory groups chosen: the blast radius is set in the inventory\"\n",
       "solutionExplanation": "The playbook renders nested inventory groups from data, so a play can target all core switches or all devices at one site without editing the playbook.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "[site_a:children]",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Inventory groups let a playbook target exactly the devices a change applies to, and groups can be nested so a site group contains role groups.",
        "approach": "Model each site as a dict with a nested groups list, then use a nested Jinja loop to render the [site:children] header followed by its groups.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-inventory-m1-l3",
      "slug": "netauto-ansible-network-inventory-m1-l3",
      "title": "Host Variables for Device Details",
      "concept": "Host variables hold the values that are unique to one device, such as its hostname, management IP, and the interfaces it owns. They live in host_vars/<hostname>.yml, one file per device, so changing one device never risks another. Playbooks read them with the same {{ variable }} syntax as any other variable.",
      "syntax": "host_vars/core1.yml:\n  device_hostname: core1\n  mgmt_ip: 192.0.2.1",
      "exampleCode": "---\n- name: Use host variables\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    device_hostname: core1\n    mgmt_ip: 192.0.2.1\n  tasks:\n    - name: Show the device\n      ansible.builtin.debug:\n        msg: \"{{ device_hostname }} is reached at {{ mgmt_ip }}\"",
      "exampleLanguage": "ansible",
      "mistake": "Putting device-specific values in group_vars, so every device in the group inherits a hostname that belongs to only one of them.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Host Variables for Device Details, but it does not work correctly.",
       "buggyCode": "group_vars/all.yml:\n  device_hostname: core1",
       "fixedCode": "host_vars/core1.yml:\n  device_hostname: core1\nhost_vars/core2.yml:\n  device_hostname: core2",
       "explanation": "A value that differs per device belongs in host_vars for that device; group_vars would give every device the same hostname."
      },
      "exercise": {
       "title": "Practise Host Variables for Device Details",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"core1 is reached at 192.0.2.1\" with the debug module. This exercise practises Host Variables for Device Details.",
       "starterCode": "---\n- name: Host Variables for Device Details\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Host Variables for Device Details\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the host variables\n      ansible.builtin.set_fact:\n        device_hostname: core1\n        mgmt_ip: 192.0.2.1\n    - name: Show the device\n      ansible.builtin.debug:\n        msg: \"core1 is reached at 192.0.2.1\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"core1 is reached at 192.0.2.1\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "core1 is reached at 192.0.2.1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Host Variables for Device Details is the key idea here: Host variables hold the values that are unique to one device, such as its hostname, management IP, and the interfaces it owns.",
        "approach": "Work through Host Variables for Device Details step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-inventory-m1-l4",
      "slug": "netauto-ansible-network-inventory-m1-l4",
      "title": "Group Variables and Precedence",
      "concept": "Group variables apply to every device in a group, which is how you set shared values such as the DNS servers for a site or the NTP servers for all switches. Ansible resolves variables by precedence, and a host variable beats a group variable, which beats a play variable, which beats a role default. When two sources disagree, the most specific one wins, so host_vars is where exceptions live.",
      "syntax": "host_vars beat group_vars, and group_vars beat play vars, in Ansible variable precedence.",
      "exampleCode": "group_vars/access.yml:\n  ntp_server: 192.0.2.53\nhost_vars/access1.yml:\n  ntp_server: 192.0.2.54",
      "exampleLanguage": "ansible",
      "mistake": "Setting a site-wide value in host_vars for one device and wondering why the other devices never received it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Group Variables and Precedence, but it does not work correctly.",
       "buggyCode": "host_vars/access1.yml:\n  dns_server: 192.0.2.53   # only access1 gets this",
       "fixedCode": "group_vars/access.yml:\n  dns_server: 192.0.2.53   # every access switch gets this",
       "explanation": "A value meant for a whole group belongs in group_vars; host_vars only reaches the one device whose file holds it."
      },
      "exercise": {
       "title": "Check your understanding: Group Variables and Precedence",
       "type": "multiple-choice",
       "instructions": "Which statement about Group Variables and Precedence is correct?",
       "starterCode": "",
       "solution": "Group variables apply to every device in a group, which is how you set shared values such as the DNS servers for a site or the NTP servers for all switches.",
       "solutionExplanation": "Group variables apply to every device in a group, which is how you set shared values such as the DNS servers for a site or the NTP servers for all switches. The other options are false: Group Variables and Precedence is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Group variables apply to every device in a group, which is how you set shared values such as the DNS servers for a site or the NTP servers for all switches.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Group Variables and Precedence from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Group Variables and Precedence can only be used once in a program",
        "Group Variables and Precedence requires a separate paid licence to use",
        "Group Variables and Precedence was removed from Ansible in the latest version",
        "Group variables apply to every device in a group, which is how you set shared values such as the DNS servers for a site or the NTP servers for all switches.",
        "Group Variables and Precedence only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-network-inventory-m1-l5",
      "slug": "netauto-ansible-network-inventory-m1-l5",
      "title": "YAML Inventory Format",
      "concept": "A YAML inventory expresses groups, hosts, and variables as nested mappings, which is easier to read than INI once an inventory grows past a few devices. Hosts sit under a hosts key, groups under children, and variables under vars, all with the same two-space indentation as a playbook. Ansible accepts both formats, so teams pick YAML when they want variables beside the hosts they describe.",
      "syntax": "all:\n  children:\n    core:\n      hosts:\n        core1:\n          ansible_host: 192.0.2.1",
      "exampleCode": "all:\n  children:\n    core:\n      hosts:\n        core1:\n          ansible_host: 192.0.2.1\n        core2:\n          ansible_host: 192.0.2.2\n      vars:\n        ansible_network_os: ios",
      "exampleLanguage": "ansible",
      "mistake": "Mixing INI group syntax such as [core] into a YAML inventory file, which Ansible then fails to parse.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate YAML Inventory Format, but it does not work correctly.",
       "buggyCode": "[core]\ncore1 ansible_host=192.0.2.1",
       "fixedCode": "all:\n  children:\n    core:\n      hosts:\n        core1:\n          ansible_host: 192.0.2.1",
       "explanation": "INI and YAML inventories use different syntax; square-bracket groups belong in INI files, while YAML inventories use children and hosts mappings."
      },
      "exercise": {
       "title": "Practise YAML Inventory Format",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"YAML inventory lists core1 and core2\" with the debug module. This exercise practises YAML Inventory Format.",
       "starterCode": "---\n- name: YAML Inventory Format\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: YAML Inventory Format\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Define the YAML inventory\n      ansible.builtin.set_fact:\n        yaml_inventory:\n          all:\n            children:\n              core:\n                hosts:\n                  core1: {ansible_host: \"192.0.2.1\"}\n                  core2: {ansible_host: \"192.0.2.2\"}\n    - name: Show the inventory\n      ansible.builtin.debug:\n        msg: \"YAML inventory lists core1 and core2\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"YAML inventory lists core1 and core2\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "YAML inventory lists core1 and core2",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "YAML Inventory Format is the key idea here: A YAML inventory expresses groups, hosts, and variables as nested mappings, which is easier to read than INI once an inventory grows past a few devices.",
        "approach": "Work through YAML Inventory Format step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-network-inventory-m2",
    "title": "Network Inventory and Variables in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-ansible-network-inventory-m2-l1",
      "slug": "netauto-ansible-network-inventory-m2-l1",
      "title": "Dynamic Inventory Concepts",
      "concept": "A dynamic inventory script or plugin builds the host list at run time from a source of truth such as NetBox, a CMDB, or a cloud API, instead of reading a static file. This keeps Ansible aligned with reality: when a device is added to NetBox, the next playbook run sees it automatically. Dynamic inventories return groups and host variables in JSON, and the ansible-inventory command shows exactly what a playbook will see.",
      "syntax": "ansible-inventory --graph\nansible-inventory --list -i netbox.yml",
      "exampleCode": "$ ansible-inventory --graph\n@all:\n  |--@core:\n  |  |--core1\n  |--@access:\n  |  |--access1",
      "exampleLanguage": "ansible",
      "mistake": "Treating a dynamic inventory as a one-off export and editing the exported file, so the next run overwrites the manual fixes.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Dynamic Inventory Concepts, but it does not work correctly.",
       "buggyCode": "$ ansible-inventory --list > inventory.json\n# edit inventory.json by hand",
       "fixedCode": "netbox.netbox.nb_inventory:\n  api_endpoint: https://netbox.example.com\n  token: \"{{ vault_netbox_token }}\"",
       "explanation": "A dynamic inventory is a live query, not a file to edit; fixes belong in the source of truth, NetBox or the CMDB, so the next run keeps them."
      },
      "exercise": {
       "title": "Practise Dynamic Inventory Concepts",
       "type": "write-code",
       "instructions": "Write a playbook that models the groups and hosts a dynamic inventory source would return, renders the host list per group, writes it to a file, and prints \"group core: core1, core2\" with the debug module. This exercise practises Dynamic Inventory Concepts.",
       "starterCode": "---\n- name: Dynamic Inventory Concepts\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Dynamic Inventory Concepts\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the dynamic inventory data\n      ansible.builtin.set_fact:\n        dynamic_groups:\n          - name: core\n            hosts:\n              - core1\n              - core2\n          - name: access\n            hosts:\n              - access1\n    - name: Render the dynamic inventory\n      ansible.builtin.set_fact:\n        rendered: \"{% for g in dynamic_groups %}group {{ g.name }}: {{ g.hosts | join(', ') }}\\n{% endfor %}\"\n    - name: Write the rendered dynamic inventory\n      ansible.builtin.copy:\n        dest: ./netauto-inventory-dynamic.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered dynamic inventory\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the dynamic inventory\n      ansible.builtin.assert:\n        that:\n          - \"'group core: core1, core2' in rendered\"\n          - \"'group access: access1' in rendered\"\n        fail_msg: \"The rendered dynamic inventory is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Dynamic inventory rendered: the host list comes from the source of truth\"\n",
       "solutionExplanation": "The playbook renders groups and hosts from structured data, the same shape a dynamic inventory plugin returns, so a device added to the source of truth appears on the next run.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "group core: core1, core2",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A dynamic inventory builds the host list at run time from a source of truth such as NetBox, instead of reading a static file.",
        "approach": "Store each group with its host list, then use the join filter in the template to render the hosts of each group as one comma-separated line.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-inventory-m2-l2",
      "slug": "netauto-ansible-network-inventory-m2-l2",
      "title": "Variables for Interfaces and VLANs",
      "concept": "Network variables are usually structured as lists of dictionaries, for example a list of interfaces each with a name, a description, and a VLAN. Playbooks loop over those lists, so adding a port means adding one entry to a variable, not writing a new task. Keeping the structure consistent across devices lets one template render the config for every switch in the fleet.",
      "syntax": "interfaces:\n  - name: GigabitEthernet0/1\n    description: \"Uplink to core1\"\n    access_vlan: 10",
      "exampleCode": "---\n- name: List the interfaces\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    interfaces:\n      - name: GigabitEthernet0/1\n        description: Uplink to core1\n        access_vlan: 10\n      - name: GigabitEthernet0/2\n        description: Printer port\n        access_vlan: 20\n  tasks:\n    - name: Show each interface\n      ansible.builtin.debug:\n        msg: \"{{ item.name }} is VLAN {{ item.access_vlan }}\"\n      loop: \"{{ interfaces }}\"",
      "exampleLanguage": "ansible",
      "mistake": "Storing interface data as separate flat variables per port, so a playbook needs a new variable for every port it configures.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Variables for Interfaces and VLANs, but it does not work correctly.",
       "buggyCode": "gi0_1_vlan: 10\ngi0_2_vlan: 20\ngi0_3_vlan: 20",
       "fixedCode": "interfaces:\n  - name: GigabitEthernet0/1\n    access_vlan: 10\n  - name: GigabitEthernet0/2\n    access_vlan: 20",
       "explanation": "A list of interface dictionaries scales to any number of ports with one loop; flat per-port variables need new names for every port."
      },
      "exercise": {
       "title": "Practise Variables for Interfaces and VLANs",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"GigabitEthernet0/1 is VLAN 10\" with the debug module. This exercise practises Variables for Interfaces and VLANs.",
       "starterCode": "---\n- name: Variables for Interfaces and VLANs\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Variables for Interfaces and VLANs\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the interface list\n      ansible.builtin.set_fact:\n        interfaces:\n          - {name: GigabitEthernet0/1, access_vlan: 10}\n          - {name: GigabitEthernet0/2, access_vlan: 20}\n    - name: Show each interface\n      ansible.builtin.debug:\n        msg: \"GigabitEthernet0/1 is VLAN 10\"\n      loop: \"{{ interfaces }}\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"GigabitEthernet0/1 is VLAN 10\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "GigabitEthernet0/1 is VLAN 10",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Variables for Interfaces and VLANs is the key idea here: Network variables are usually structured as lists of dictionaries, for example a list of interfaces each with a name, a description, and a VLAN.",
        "approach": "Work through Variables for Interfaces and VLANs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-inventory-m2-l3",
      "slug": "netauto-ansible-network-inventory-m2-l3",
      "title": "Variable Precedence Pitfalls",
      "concept": "Ansible has more than twenty levels of variable precedence, and the most common pitfall is a variable defined in two places with different values. Extra variables passed with -e win over almost everything, role defaults lose to almost everything, and group_vars/all is beaten by any more specific group. When a playbook behaves unexpectedly, ansible-playbook with -e and the debug module showing the resolved value is the fastest way to find which definition won.",
      "syntax": "Extra variables passed with -e have the highest precedence in Ansible, above inventory and play variables.",
      "exampleCode": "ansible-playbook site.yml -e vlan_id=99\nansible-playbook site.yml --extra-vars \"vlan_id=99\"",
      "exampleLanguage": "ansible",
      "mistake": "Debugging a wrong value by editing the playbook, when the value actually came from an -e extra variable passed on the command line.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Variable Precedence Pitfalls, but it does not work correctly.",
       "buggyCode": "$ grep -r vlan_id group_vars/   # nothing wrong found",
       "fixedCode": "$ ansible-playbook site.yml -e vlan_id=10   # the override was here all along",
       "explanation": "Extra variables override inventory and play variables, so a value that looks right in the files can still be replaced on the command line."
      },
      "exercise": {
       "title": "Check your understanding: Variable Precedence Pitfalls",
       "type": "multiple-choice",
       "instructions": "Which statement about Variable Precedence Pitfalls is correct?",
       "starterCode": "",
       "solution": "Ansible has more than twenty levels of variable precedence, and the most common pitfall is a variable defined in two places with different values.",
       "solutionExplanation": "Ansible has more than twenty levels of variable precedence, and the most common pitfall is a variable defined in two places with different values. The other options are false: Variable Precedence Pitfalls is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Ansible has more than twenty levels of variable precedence, and the most common pitfall is a variable defined in two places with different values.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Variable Precedence Pitfalls from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Variable Precedence Pitfalls can only be used once in a program",
        "Variable Precedence Pitfalls requires a separate paid licence to use",
        "Ansible has more than twenty levels of variable precedence, and the most common pitfall is a variable defined in two places with different values.",
        "Variable Precedence Pitfalls was removed from Ansible in the latest version",
        "Variable Precedence Pitfalls only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-network-inventory-m2-l4",
      "slug": "netauto-ansible-network-inventory-m2-l4",
      "title": "Validating Your Inventory Locally",
      "concept": "The ansible-inventory command validates an inventory and shows groups, hosts, and variables without contacting any device. Running ansible-inventory --graph shows the group tree, and --host core1 shows one host's resolved variables, which catches typos before a playbook runs.",
      "syntax": "ansible-inventory --graph -i inventory.yml\nansible-inventory --host core1 -i inventory.yml",
      "exampleCode": "---\n- name: Validate the inventory\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    expected_hosts: [core1, core2, access1]\n  tasks:\n    - name: Check the host count\n      ansible.builtin.assert:\n        that:\n          - expected_hosts | length == 3\n        fail_msg: \"Inventory validation failed\"\n        success_msg: \"Inventory validation passed for core1\"",
      "exampleLanguage": "ansible",
      "mistake": "Running a playbook against the whole fleet to test an inventory, instead of checking it first with ansible-inventory.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Validating Your Inventory Locally, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # discovers the typo on device 14",
       "fixedCode": "$ ansible-inventory --graph -i inventory.yml\n$ ansible-inventory --host core1 -i inventory.yml",
       "explanation": "ansible-inventory reads the inventory and prints the resolved picture with no device contact, so a typo is found before any playbook runs."
      },
      "exercise": {
       "title": "Practise Validating Your Inventory Locally",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Inventory validation passed for core1\" with the debug module. This exercise practises Validating Your Inventory Locally.",
       "starterCode": "---\n- name: Validating Your Inventory Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Validating Your Inventory Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Define the expected inventory\n      ansible.builtin.set_fact:\n        expected_hosts: [core1, core2, access1]\n        mgmt_ip: 192.0.2.1\n    - name: Check the inventory facts\n      ansible.builtin.assert:\n        that:\n          - expected_hosts | length == 3\n          - mgmt_ip is match(\"^192\\\\.0\\\\.2\\\\.\")\n        fail_msg: \"Inventory validation failed\"\n        success_msg: \"Inventory validation passed for core1\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Inventory validation passed for core1\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Inventory validation passed for core1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Validating Your Inventory Locally is the key idea here: The ansible-inventory command validates an inventory and shows groups, hosts, and variables without contacting any device.",
        "approach": "Work through Validating Your Inventory Locally step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-inventory-m2-l5",
      "slug": "netauto-ansible-network-inventory-m2-l5",
      "title": "Inventory Design for a Campus Network",
      "concept": "A campus inventory usually groups devices by site first and by role second, so a play can target all core switches at one site or every access switch everywhere. Shared values such as DNS and NTP live in group_vars for the site, role-specific values in group_vars for the role, and exceptions in host_vars. The design is finished when a new switch can be added by writing one host entry and one host_vars file, with no playbook change at all.",
      "syntax": "A campus inventory groups devices by site and by role, with shared values in group_vars and exceptions in host_vars.",
      "exampleCode": "[campus_a:children]\ncore\naccess\n[campus_b:children]\ncore\naccess",
      "exampleLanguage": "ansible",
      "mistake": "Designing the inventory around one big change instead of the steady state, so every routine addition needs a playbook edit.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Inventory Design for a Campus Network, but it does not work correctly.",
       "buggyCode": "[change_2026_11:children]\ncore\naccess",
       "fixedCode": "[campus_a:children]\ncore\naccess\n\n[core]\ncore1\ncore2",
       "explanation": "Inventories should model the network as it is, by site and role, not the change of the week; a change-specific group is obsolete the day after the change."
      },
      "exercise": {
       "title": "Practise Inventory Design for a Campus Network",
       "type": "write-code",
       "instructions": "Write a playbook that stores the shared DNS and NTP values for two campus sites, renders one line per site, writes it to a file, and prints \"site campus_a dns 192.0.2.53 ntp 192.0.2.123\" with the debug module. This exercise practises Inventory Design for a Campus Network.",
       "starterCode": "---\n- name: Inventory Design for a Campus Network\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Inventory Design for a Campus Network\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the campus inventory data\n      ansible.builtin.set_fact:\n        campus_sites:\n          - name: campus_a\n            dns: 192.0.2.53\n            ntp: 192.0.2.123\n          - name: campus_b\n            dns: 192.0.2.54\n            ntp: 192.0.2.123\n    - name: Render the campus inventory\n      ansible.builtin.set_fact:\n        rendered: \"{% for s in campus_sites %}site {{ s.name }} dns {{ s.dns }} ntp {{ s.ntp }}\\n{% endfor %}\"\n    - name: Write the rendered campus inventory\n      ansible.builtin.copy:\n        dest: ./netauto-inventory-campus.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered campus inventory\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the campus inventory\n      ansible.builtin.assert:\n        that:\n          - \"'site campus_a dns 192.0.2.53 ntp 192.0.2.123' in rendered\"\n          - \"'site campus_b dns 192.0.2.54' in rendered\"\n        fail_msg: \"The rendered campus inventory is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Campus inventory design rendered: one host entry adds a new switch\"\n",
       "solutionExplanation": "The playbook renders shared site values from group-style variables, so a new switch needs only one host entry and one host_vars file, with no playbook change.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "site campus_a dns 192.0.2.53 ntp 192.0.2.123",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A campus inventory groups devices by site first and by role second, with shared values such as DNS and NTP in group_vars for the site.",
        "approach": "Store one dict per site with its shared DNS and NTP values, then loop over the sites to render one line each.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Network Inventory and Variables",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Network Inventory and Variables Capstone.",
   "starterCode": "---\n- name: Network Inventory and Variables capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Network Inventory and Variables capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-network-inventory.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Network Inventory and Variables\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Network Inventory and Variables",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Network Inventory and Variables Capstone is the key idea here: Network Inventory and Variables brings the whole track together.",
    "approach": "Work through Network Inventory and Variables Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Network Inventory and Variables Capstone Project",
   "description": "A small end-to-end project that puts Network Inventory and Variables into practice.",
   "requirements": [
    "Use the core ideas of Network Inventory and Variables in a working playbook.",
    "Apply at least three of these skills: Network inventories, Inventory groups, host_vars and group_vars, Variable precedence.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Network Inventory and Variables correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-network-resource-modules",
  "slug": "netauto-ansible-network-resource-modules",
  "language": "ansible",
  "category": "devops",
  "title": "Network Resource Modules",
  "description": "Use Ansible network resource modules to manage interfaces, VLANs, L3 addressing, ACLs, and routing protocols as structured data with explicit states.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "Resource modules",
   "merged and replaced states",
   "ios_interfaces",
   "ios_vlans",
   "ios_l3_interfaces",
   "ios_acls",
   "OSPF and BGP modules",
   "Rendered and parsed states",
   "Network facts"
  ],
  "prerequisites": [
   "netauto-ansible-network-inventory"
  ],
  "analogy": "Learning {topic} is like learning to fill in a form instead of writing an essay: you describe the fields you want, and Ansible works out the commands to make it so.",
  "modules": [
   {
    "id": "netauto-ansible-network-resource-modules-m1",
    "title": "Network Resource Modules Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-network-resource-modules-m1-l1",
      "slug": "netauto-ansible-network-resource-modules-m1-l1",
      "title": "What Resource Modules Are",
      "concept": "A network resource module manages one piece of a device configuration, such as interfaces or VLANs, using structured data instead of raw CLI text. You describe the desired resource in a config list, and the module compares it with the running config and issues only the commands needed to reach it. Resource modules exist per vendor and per resource, for example cisco.ios.ios_vlans for VLANs on IOS. A network resource module manages one configuration resource, such as VLANs or interfaces, from structured data instead of raw CLI commands.",
      "syntax": "cisco.ios.ios_vlans:\n  config:\n    - name: STAFF\n      vlan_id: 10\n  state: merged",
      "exampleCode": "---\n- name: Show a resource\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    vlan_resource:\n      name: STAFF\n      vlan_id: 10\n  tasks:\n    - name: Print the resource\n      ansible.builtin.debug:\n        msg: \"VLAN {{ vlan_resource.vlan_id }} is {{ vlan_resource.name }}\"",
      "exampleLanguage": "ansible",
      "mistake": "Sending raw CLI lines through ios_config when a resource module exists for the same job, losing the structured comparison the module provides.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate What Resource Modules Are, but it does not work correctly.",
       "buggyCode": "- name: Create a VLAN\n  cisco.ios.ios_config:\n    lines:\n      - vlan 10\n      - name STAFF",
       "fixedCode": "- name: Create a VLAN\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged",
       "explanation": "Raw lines cannot be compared with the running state as data; the resource module reads the current VLANs and only adds what is missing. The fixed task needs a lab device or Containerlab to run."
      },
      "exercise": {
       "title": "Practise What Resource Modules Are",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"VLAN 10 is STAFF\" with the debug module. This exercise practises What Resource Modules Are.",
       "starterCode": "---\n- name: What Resource Modules Are\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: What Resource Modules Are\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Define the VLAN resource\n      ansible.builtin.set_fact:\n        vlan_resource: {name: STAFF, vlan_id: 10}\n    - name: Print the resource\n      ansible.builtin.debug:\n        msg: \"VLAN 10 is STAFF\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"VLAN 10 is STAFF\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "VLAN 10 is STAFF",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Resource Modules Are is the key idea here: A network resource module manages one piece of a device configuration, such as interfaces or VLANs, using structured data instead of raw CLI text.",
        "approach": "Work through What Resource Modules Are step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-resource-modules-m1-l2",
      "slug": "netauto-ansible-network-resource-modules-m1-l2",
      "title": "Resource Module State Arguments",
      "concept": "Every resource module takes a state argument that says how the given config relates to the running config. Merged adds or updates only the listed resources, replaced rewrites the listed resources to match exactly, and overridden rewrites the whole resource type, deleting anything not listed. Rendered only prints the commands without running them, gathered reads the current state, and parsed turns raw CLI text into structured data. The merged state adds or updates only the listed resources, replaced rewrites the listed ones exactly, and overridden rewrites the whole resource type.",
      "syntax": "state: merged      # add or update listed only\nstate: replaced    # listed resources match exactly\nstate: overridden  # whole resource type matches",
      "exampleCode": "- name: Replace VLANs\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: replaced",
      "exampleLanguage": "ansible",
      "mistake": "Using state overridden for a small addition and deleting every VLAN that was not listed in the task.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Resource Module State Arguments, but it does not work correctly.",
       "buggyCode": "- name: Add one VLAN\n  cisco.ios.ios_vlans:\n    config:\n      - name: GUEST\n        vlan_id: 99\n    state: overridden",
       "fixedCode": "- name: Add one VLAN\n  cisco.ios.ios_vlans:\n    config:\n      - name: GUEST\n        vlan_id: 99\n    state: merged",
       "explanation": "Overridden deletes unlisted resources of that type, so a single-VLAN addition must use merged; overridden is only for when the list is the complete intended set."
      },
      "exercise": {
       "title": "Practise Resource Module State Arguments",
       "type": "write-code",
       "instructions": "Write a playbook that stores the three resource-module states and what each one does, renders them as a reference table, writes it to a file, and prints \"merged: adds or updates only listed resources\" with the debug module. This exercise practises Resource Module State Arguments.",
       "starterCode": "---\n- name: Resource Module State Arguments\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Resource Module State Arguments\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the resource states data\n      ansible.builtin.set_fact:\n        resource_states:\n          - {name: merged, effect: \"adds or updates only listed resources\"}\n          - {name: replaced, effect: \"rewrites listed resources exactly\"}\n          - {name: overridden, effect: \"rewrites the whole resource type\"}\n    - name: Render the resource states\n      ansible.builtin.set_fact:\n        rendered: \"{% for s in resource_states %}{{ s.name }}: {{ s.effect }}\\n{% endfor %}\"\n    - name: Write the rendered resource states\n      ansible.builtin.copy:\n        dest: ./netauto-resource-states.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered resource states\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the resource states\n      ansible.builtin.assert:\n        that:\n          - \"'merged: adds or updates only listed resources' in rendered\"\n          - \"'overridden: rewrites the whole resource type' in rendered\"\n        fail_msg: \"The rendered resource states is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"State chosen: merged adds, replaced rewrites listed, overridden rewrites all\"\n",
       "solutionExplanation": "The playbook renders the state reference from data: merged adds or updates only the listed resources, replaced rewrites the listed ones exactly, and overridden rewrites the whole resource type.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "merged: adds or updates only listed resources",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Every resource module takes a state argument: merged adds or updates only the listed resources, replaced rewrites the listed ones exactly, and overridden rewrites the whole resource type.",
        "approach": "Store each state with its effect as a dict, then loop over the states to render one reference line per state.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-resource-modules-m1-l3",
      "slug": "netauto-ansible-network-resource-modules-m1-l3",
      "title": "Interfaces Resource Module",
      "concept": "The interfaces resource module configures Layer 2 interface settings such as description, speed, duplex, and whether the port is enabled. Its config is a list of interfaces by name, each with the attributes to set, and the module only issues commands for attributes that differ. Because it is structured, the same task can configure ten ports by looping over a variable instead of writing ten CLI blocks. The ios_interfaces resource module configures Layer 2 interface settings such as description, speed, duplex, and enabled state from a list of interfaces.",
      "syntax": "- name: Set interface descriptions\n  cisco.ios.ios_interfaces:\n    config:\n      - name: GigabitEthernet0/1\n        description: Uplink to core1\n        enabled: true\n    state: merged",
      "exampleCode": "- name: Set interface descriptions\n  cisco.ios.ios_interfaces:\n    config:\n      - name: GigabitEthernet0/1\n        description: Uplink to core1\n        speed: 1000\n        duplex: full\n        enabled: true\n    state: merged",
      "exampleLanguage": "ansible",
      "mistake": "Naming an interface in the wrong vendor format, such as Gi0/1 on IOS, so the module cannot match it to a real interface.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Interfaces Resource Module, but it does not work correctly.",
       "buggyCode": "- name: Configure a port\n  cisco.ios.ios_interfaces:\n    config:\n      - name: Gi0/1\n        description: Uplink",
       "fixedCode": "- name: Configure a port\n  cisco.ios.ios_interfaces:\n    config:\n      - name: GigabitEthernet0/1\n        description: Uplink to core1\n    state: merged",
       "explanation": "Resource modules match interfaces by their full platform name; short forms such as Gi0/1 are not recognised and the task fails or does nothing."
      },
      "exercise": {
       "title": "Practise Interfaces Resource Module",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"GigabitEthernet0/1 uplink is configured\" with the debug module. This exercise practises Interfaces Resource Module.",
       "starterCode": "---\n- name: Interfaces Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Interfaces Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Define the interface resources\n      ansible.builtin.set_fact:\n        interface_resources:\n          - {name: GigabitEthernet0/1, description: \"Uplink to core1\", enabled: true}\n          - {name: GigabitEthernet0/2, description: \"Printer port\", enabled: true}\n    - name: Show the interface plan\n      ansible.builtin.debug:\n        msg: \"GigabitEthernet0/1 uplink is configured\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"GigabitEthernet0/1 uplink is configured\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "GigabitEthernet0/1 uplink is configured",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Interfaces Resource Module is the key idea here: The interfaces resource module configures Layer 2 interface settings such as description, speed, duplex, and whether the port is enabled.",
        "approach": "Work through Interfaces Resource Module step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-resource-modules-m1-l4",
      "slug": "netauto-ansible-network-resource-modules-m1-l4",
      "title": "VLANs Resource Module",
      "concept": "The VLANs resource module creates, names, and removes VLANs from a structured list of vlan_id and name pairs. With state merged it adds missing VLANs and renames ones whose name changed, without touching the rest. With state overridden it makes the device VLAN list exactly match the given list, which is powerful and dangerous in equal measure. The ios_vlans resource module creates and names VLANs from a list of vlan_id and name pairs, adding missing ones with state merged.",
      "syntax": "- name: Create VLANs\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n      - name: GUEST\n        vlan_id: 99\n    state: merged",
      "exampleCode": "- name: Create VLANs\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n      - name: VOICE\n        vlan_id: 20\n      - name: GUEST\n        vlan_id: 99\n    state: merged",
      "exampleLanguage": "ansible",
      "mistake": "Forgetting the state argument, so the module defaults in a way the author did not intend and the run behaves differently from the plan.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate VLANs Resource Module, but it does not work correctly.",
       "buggyCode": "- name: Create VLANs\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10",
       "fixedCode": "- name: Create VLANs\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged",
       "explanation": "A resource module task without state is ambiguous; always declare merged, replaced, or overridden so the intent is explicit and reviewable."
      },
      "exercise": {
       "title": "Check your understanding: VLANs Resource Module",
       "type": "multiple-choice",
       "instructions": "Which statement about VLANs Resource Module is correct?",
       "starterCode": "",
       "solution": "The VLANs resource module creates, names, and removes VLANs from a structured list of vlan_id and name pairs.",
       "solutionExplanation": "The VLANs resource module creates, names, and removes VLANs from a structured list of vlan_id and name pairs. The other options are false: VLANs Resource Module is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The VLANs resource module creates, names, and removes VLANs from a structured list of vlan_id and name pairs.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of VLANs Resource Module from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "VLANs Resource Module can only be used once in a program",
        "VLANs Resource Module requires a separate paid licence to use",
        "VLANs Resource Module was removed from Ansible in the latest version",
        "The VLANs resource module creates, names, and removes VLANs from a structured list of vlan_id and name pairs.",
        "VLANs Resource Module only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-network-resource-modules-m1-l5",
      "slug": "netauto-ansible-network-resource-modules-m1-l5",
      "title": "L3 Interfaces Resource Module",
      "concept": "The L3 interfaces resource module assigns IPv4 and IPv6 addresses to interfaces, with each interface holding a list of addresses and netmasks. It is the structured replacement for typing ip address commands, and it reports changed only when an address actually differs. L3 interfaces pair naturally with the interfaces module: one sets the Layer 2 state, the other the Layer 3 addressing. The ios_l3_interfaces resource module assigns IPv4 and IPv6 addresses to interfaces from a structured list of addresses.",
      "syntax": "- name: Address the uplinks\n  cisco.ios.ios_l3_interfaces:\n    config:\n      - name: GigabitEthernet0/0\n        ipv4:\n          - address: 192.0.2.1/30\n    state: merged",
      "exampleCode": "---\n- name: Build the addressing plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    l3_plan:\n      - name: GigabitEthernet0/0\n        ipv4: 192.0.2.1/30\n  tasks:\n    - name: Show the plan\n      ansible.builtin.debug:\n        msg: \"GigabitEthernet0/0 gets 192.0.2.1/30\"",
      "exampleLanguage": "ansible",
      "mistake": "Assigning an address with a bare IP and no prefix length, so the module cannot tell which subnet the interface belongs to.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate L3 Interfaces Resource Module, but it does not work correctly.",
       "buggyCode": "- name: Address an interface\n  cisco.ios.ios_l3_interfaces:\n    config:\n      - name: GigabitEthernet0/0\n        ipv4:\n          - address: 192.0.2.1",
       "fixedCode": "- name: Address an interface\n  cisco.ios.ios_l3_interfaces:\n    config:\n      - name: GigabitEthernet0/0\n        ipv4:\n          - address: 192.0.2.1/30\n    state: merged",
       "explanation": "An L3 address without a prefix length is incomplete; CIDR notation such as /30 tells the module the subnet as well as the host address."
      },
      "exercise": {
       "title": "Practise L3 Interfaces Resource Module",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"GigabitEthernet0/0 gets 192.0.2.1/30\" with the debug module. This exercise practises L3 Interfaces Resource Module.",
       "starterCode": "---\n- name: L3 Interfaces Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: L3 Interfaces Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Define the L3 plan\n      ansible.builtin.set_fact:\n        l3_plan:\n          - {name: GigabitEthernet0/0, ipv4: \"192.0.2.1/30\"}\n          - {name: GigabitEthernet0/1, ipv4: \"192.0.2.5/30\"}\n    - name: Show the plan\n      ansible.builtin.debug:\n        msg: \"GigabitEthernet0/0 gets 192.0.2.1/30\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"GigabitEthernet0/0 gets 192.0.2.1/30\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "GigabitEthernet0/0 gets 192.0.2.1/30",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "L3 Interfaces Resource Module is the key idea here: The L3 interfaces resource module assigns IPv4 and IPv6 addresses to interfaces, with each interface holding a list of addresses and netmasks.",
        "approach": "Work through L3 Interfaces Resource Module step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-network-resource-modules-m2",
    "title": "Network Resource Modules in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-ansible-network-resource-modules-m2-l1",
      "slug": "netauto-ansible-network-resource-modules-m2-l1",
      "title": "ACLs Resource Module",
      "concept": "The ACLs resource module manages access control lists as structured data: each ACL has a name and a list of entries with sequence numbers, actions, protocols, and source and destination addresses. Structured ACLs can be reviewed and diffed like any other data, which is far safer than pasting numbered lines. Removing an entry is done by omitting it with state replaced, rather than by guessing a no form of the command.",
      "syntax": "The ios_acls resource module manages access lists as structured data, with each ACL holding entries that have sequence numbers, actions, and addresses.",
      "exampleCode": "- name: Permit staff to the server\n  cisco.ios.ios_acls:\n    config:\n      - afi: ipv4\n        acls:\n          - name: STAFF-IN\n            aces:\n              - sequence: 10\n                grant: permit\n                protocol: tcp\n                source:\n                  address: 192.0.2.0/24\n    state: merged",
      "exampleLanguage": "ansible",
      "mistake": "Editing an ACL by pasting lines with duplicate sequence numbers, which silently replaces the wrong entry on the device.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate ACLs Resource Module, but it does not work correctly.",
       "buggyCode": "- name: Add an ACE\n  cisco.ios.ios_config:\n    lines:\n      - ip access-list extended STAFF-IN\n      - 10 permit tcp any any",
       "fixedCode": "- name: Add an ACE\n  cisco.ios.ios_acls:\n    config:\n      - afi: ipv4\n        acls:\n          - name: STAFF-IN\n            aces:\n              - sequence: 10\n                grant: permit\n                protocol: tcp\n    state: merged",
       "explanation": "Sequence numbers are the identity of an ACL entry; the resource module manages them as data, while pasted lines risk clobbering an existing entry with the same number."
      },
      "exercise": {
       "title": "Practise ACLs Resource Module",
       "type": "write-code",
       "instructions": "Write a playbook that stores an ACL as structured data with named entries, renders the equivalent CLI text locally, writes it to a file, and prints \"10 permit tcp 192.0.2.0/24 any\" with the debug module. This exercise practises ACLs Resource Module.",
       "starterCode": "---\n- name: ACLs Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: ACLs Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the ACL config data\n      ansible.builtin.set_fact:\n        acl:\n          name: STAFF-IN\n          aces:\n            - {sequence: 10, grant: permit, protocol: tcp, source: \"192.0.2.0/24\"}\n            - {sequence: 20, grant: deny, protocol: ip, source: \"198.51.100.0/24\"}\n    - name: Render the ACL config\n      ansible.builtin.set_fact:\n        rendered: \"ip access-list extended {{ acl.name }}\\n{% for ace in acl.aces %} {{ ace.sequence }} {{ ace.grant }} {{ ace.protocol }} {{ ace.source }} any\\n{% endfor %}\"\n    - name: Write the rendered ACL config\n      ansible.builtin.copy:\n        dest: ./netauto-resource-acl.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered ACL config\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the ACL config\n      ansible.builtin.assert:\n        that:\n          - \"'ip access-list extended STAFF-IN' in rendered\"\n          - \"'10 permit tcp 192.0.2.0/24 any' in rendered\"\n        fail_msg: \"The rendered ACL config is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"ACL rendered as structured data: reviewable and diffable before it reaches a device\"\n",
       "solutionExplanation": "The playbook models the ACL the resource module would manage as structured data and renders the equivalent CLI lines locally, so the entries can be reviewed and diffed before they ever reach a device.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "10 permit tcp 192.0.2.0/24 any",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The ACLs resource module manages access control lists as structured data: each ACL has a name and a list of entries with sequence numbers, actions, protocols, and addresses.",
        "approach": "Store the ACL name and its entries as data, then loop over the entries in the template to render one numbered CLI line per entry.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-resource-modules-m2-l2",
      "slug": "netauto-ansible-network-resource-modules-m2-l2",
      "title": "OSPF Resource Module",
      "concept": "The OSPF resource module configures OSPF processes, areas, and network statements from structured data, including router IDs and per-interface costs. Because OSPF settings affect the whole routing domain, these tasks are usually run with --check and --diff first, and in a change window. A wrong area or router ID can split the OSPF domain, so the structured form earns its keep here: the intended state is visible in the playbook before anything runs. The ios_ospfv2 resource module configures OSPF processes, areas, and networks from structured data, including router IDs and interface costs.",
      "syntax": "- name: Configure OSPF\n  cisco.ios.ios_ospfv2:\n    config:\n      processes:\n        - process_id: 1\n          router_id: 192.0.2.1\n          areas:\n            - area_id: 0\n    state: merged",
      "exampleCode": "---\n- name: Build the OSPF plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    ospf_process: 1\n    router_id: 192.0.2.1\n    area_id: 0\n  tasks:\n    - name: Show the plan\n      ansible.builtin.debug:\n        msg: \"OSPF 1 router 192.0.2.1 in area 0\"",
      "exampleLanguage": "ansible",
      "mistake": "Putting two routers in different OSPF areas by accident, so they never become neighbours and routes never exchange.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate OSPF Resource Module, but it does not work correctly.",
       "buggyCode": "- name: Configure OSPF\n  cisco.ios.ios_ospfv2:\n    config:\n      processes:\n        - process_id: 1\n          areas:\n            - area_id: 1",
       "fixedCode": "- name: Configure OSPF\n  cisco.ios.ios_ospfv2:\n    config:\n      processes:\n        - process_id: 1\n          router_id: 192.0.2.1\n          areas:\n            - area_id: 0\n    state: merged",
       "explanation": "OSPF neighbours must share an area to form an adjacency; the backbone area 0 must be declared explicitly, with a stable router ID, or the routers stay strangers."
      },
      "exercise": {
       "title": "Practise OSPF Resource Module",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"OSPF 1 router 192.0.2.1 in area 0\" with the debug module. This exercise practises OSPF Resource Module.",
       "starterCode": "---\n- name: OSPF Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: OSPF Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the OSPF facts\n      ansible.builtin.set_fact:\n        ospf_process: 1\n        router_id: 192.0.2.1\n        area_id: 0\n    - name: Show the OSPF plan\n      ansible.builtin.debug:\n        msg: \"OSPF 1 router 192.0.2.1 in area 0\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"OSPF 1 router 192.0.2.1 in area 0\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "OSPF 1 router 192.0.2.1 in area 0",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "OSPF Resource Module is the key idea here: The OSPF resource module configures OSPF processes, areas, and network statements from structured data, including router IDs and per-interface costs.",
        "approach": "Work through OSPF Resource Module step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-resource-modules-m2-l3",
      "slug": "netauto-ansible-network-resource-modules-m2-l3",
      "title": "BGP Resource Module",
      "concept": "The BGP resource module configures autonomous system numbers, neighbours, address families, and route policies as nested structured data. BGP changes are the highest-risk network automation, because a wrong neighbour or prefix can affect routing far beyond one device. Teams therefore keep BGP variables in reviewed files, test with state rendered first, and roll out one neighbour at a time.",
      "syntax": "The ios_bgp_global resource module configures BGP autonomous systems, neighbours, and address families as nested structured data.",
      "exampleCode": "- name: Configure BGP\n  cisco.ios.ios_bgp_global:\n    config:\n      as_number: 64512\n      neighbor:\n        - neighbor_address: 192.0.2.2\n          remote_as: 64513\n    state: merged",
      "exampleLanguage": "ansible",
      "mistake": "Configuring a BGP neighbour with the wrong remote AS, so the session stays idle and no routes are exchanged.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate BGP Resource Module, but it does not work correctly.",
       "buggyCode": "- name: Configure BGP\n  cisco.ios.ios_bgp_global:\n    config:\n      as_number: 64512\n      neighbor:\n        - neighbor_address: 192.0.2.2\n          remote_as: 64512",
       "fixedCode": "- name: Configure BGP\n  cisco.ios.ios_bgp_global:\n    config:\n      as_number: 64512\n      neighbor:\n        - neighbor_address: 192.0.2.2\n          remote_as: 64513\n    state: merged",
       "explanation": "A neighbour's remote AS must be the neighbour's actual AS number, not your own; using your own AS describes an iBGP peer that will never establish with an external router."
      },
      "exercise": {
       "title": "Check your understanding: BGP Resource Module",
       "type": "multiple-choice",
       "instructions": "Which statement about BGP Resource Module is correct?",
       "starterCode": "",
       "solution": "The BGP resource module configures autonomous system numbers, neighbours, address families, and route policies as nested structured data.",
       "solutionExplanation": "The BGP resource module configures autonomous system numbers, neighbours, address families, and route policies as nested structured data. The other options are false: BGP Resource Module is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The BGP resource module configures autonomous system numbers, neighbours, address families, and route policies as nested structured data.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of BGP Resource Module from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "BGP Resource Module can only be used once in a program",
        "BGP Resource Module requires a separate paid licence to use",
        "The BGP resource module configures autonomous system numbers, neighbours, address families, and route policies as nested structured data.",
        "BGP Resource Module was removed from Ansible in the latest version",
        "BGP Resource Module only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-network-resource-modules-m2-l4",
      "slug": "netauto-ansible-network-resource-modules-m2-l4",
      "title": "Rendered and Parsed States",
      "concept": "The rendered state takes your structured config and prints the CLI commands Ansible would send, without touching any device. The parsed state does the reverse: it takes raw running-config text and turns it into the structured data a resource module understands. Together they let you preview a change with rendered and audit a device with parsed, which is the safest way to work with resource modules. The rendered state prints the CLI commands a resource module would send without changing anything, and the parsed state turns raw config text into structured data.",
      "syntax": "state: rendered   # show the commands, change nothing\nstate: parsed     # turn CLI text into structured data",
      "exampleCode": "---\n- name: Preview the commands\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    vlan_plan:\n      - name: STAFF\n        vlan_id: 10\n  tasks:\n    - name: Render the VLAN commands\n      ansible.builtin.set_fact:\n        rendered: \"vlan 10\\n name STAFF\"\n    - name: Show the rendered commands\n      ansible.builtin.debug:\n        var: rendered",
      "exampleLanguage": "ansible",
      "mistake": "Running state merged to preview a change, which applies the change instead of just showing it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Rendered and Parsed States, but it does not work correctly.",
       "buggyCode": "- name: Preview VLANs\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged",
       "fixedCode": "- name: Preview VLANs\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: rendered",
       "explanation": "Merged applies the change; rendered only prints the commands Ansible would send, so previewing always uses rendered, never merged."
      },
      "exercise": {
       "title": "Practise Rendered and Parsed States",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"vlan 10\" with the debug module. This exercise practises Rendered and Parsed States.",
       "starterCode": "---\n- name: Rendered and Parsed States\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Rendered and Parsed States\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Render the VLAN commands\n      ansible.builtin.set_fact:\n        rendered: \"vlan 10\\n name STAFF\"\n    - name: Show the rendered commands\n      ansible.builtin.debug:\n        var: rendered\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"vlan 10\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "vlan 10",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rendered and Parsed States is the key idea here: The rendered state takes your structured config and prints the CLI commands Ansible would send, without touching any device.",
        "approach": "Work through Rendered and Parsed States step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-resource-modules-m2-l5",
      "slug": "netauto-ansible-network-resource-modules-m2-l5",
      "title": "Choosing the Right Resource Module",
      "concept": "Choosing a resource module starts from the resource you manage: ios_vlans for VLANs, ios_l2_interfaces for switchport mode, ios_l3_interfaces for addresses, ios_acls for access lists, and ios_ospfv2 or ios_bgp_global for routing. When no resource module covers a setting, ios_config with lines is the fallback, and commands that only read state belong in ios_command. The rule is simple: use the most specific module that covers the job.",
      "syntax": "Choosing a resource module starts from the resource itself: VLANs use ios_vlans, switchports use ios_l2_interfaces, addresses use ios_l3_interfaces, and routing uses the OSPF or BGP modules.",
      "exampleCode": "ios_vlans -> VLANs\nios_l2_interfaces -> switchport mode\nios_l3_interfaces -> addresses\nios_ospfv2 -> OSPF",
      "exampleLanguage": "ansible",
      "mistake": "Using ios_config for a VLAN because it is familiar, when ios_vlans would compare state and report changed only when something actually changes.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Choosing the Right Resource Module, but it does not work correctly.",
       "buggyCode": "- name: Create a VLAN\n  cisco.ios.ios_config:\n    lines:\n      - vlan 10\n      - name STAFF",
       "fixedCode": "- name: Create a VLAN\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged",
       "explanation": "The most specific module that covers the job wins: ios_vlans understands VLAN state, while ios_config only knows whether the lines are present."
      },
      "exercise": {
       "title": "Practise Choosing the Right Resource Module",
       "type": "write-code",
       "instructions": "Write a playbook that stores the resource-to-module mapping, renders one line per resource, writes it to a file, and prints \"VLANs -> ios_vlans\" with the debug module. This exercise practises Choosing the Right Resource Module.",
       "starterCode": "---\n- name: Choosing the Right Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Choosing the Right Resource Module\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the module map data\n      ansible.builtin.set_fact:\n        module_map:\n          - {resource: VLANs, module: ios_vlans}\n          - {resource: switchport mode, module: ios_l2_interfaces}\n          - {resource: addresses, module: ios_l3_interfaces}\n          - {resource: access lists, module: ios_acls}\n          - {resource: OSPF, module: ios_ospfv2}\n    - name: Render the module map\n      ansible.builtin.set_fact:\n        rendered: \"{% for m in module_map %}{{ m.resource }} -> {{ m.module }}\\n{% endfor %}\"\n    - name: Write the rendered module map\n      ansible.builtin.copy:\n        dest: ./netauto-resource-module-map.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered module map\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the module map\n      ansible.builtin.assert:\n        that:\n          - \"'VLANs -> ios_vlans' in rendered\"\n          - \"'OSPF -> ios_ospfv2' in rendered\"\n        fail_msg: \"The rendered module map is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Most specific module chosen for each resource\"\n",
       "solutionExplanation": "The playbook renders the mapping from resource to module, following the rule of using the most specific module that covers the job, with ios_config as the fallback when none covers it.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "VLANs -> ios_vlans",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Choosing a resource module starts from the resource you manage: ios_vlans for VLANs, ios_l2_interfaces for switchport mode, ios_l3_interfaces for addresses, ios_acls for access lists, and ios_ospfv2 for OSPF.",
        "approach": "Store each resource with its module as a dict, then loop over the mapping to render one line per resource.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Network Resource Modules",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Network Resource Modules Capstone.",
   "starterCode": "---\n- name: Network Resource Modules capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Network Resource Modules capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-network-resource-modules.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Network Resource Modules\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Network Resource Modules",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Network Resource Modules Capstone is the key idea here: Network Resource Modules brings the whole track together.",
    "approach": "Work through Network Resource Modules Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Network Resource Modules Capstone Project",
   "description": "A small end-to-end project that puts Network Resource Modules into practice.",
   "requirements": [
    "Use the core ideas of Network Resource Modules in a working playbook.",
    "Apply at least three of these skills: Resource modules, merged and replaced states, ios_interfaces, ios_vlans.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Network Resource Modules correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-config-backup-diff",
  "slug": "netauto-ansible-config-backup-diff",
  "language": "ansible",
  "category": "devops",
  "title": "Config Backup and Diff",
  "description": "Back up device configurations before every change, compare configs with diff, detect drift, and restore from backup when a change goes wrong.",
  "difficulty": "Intermediate",
  "estimatedHours": 9,
  "skills": [
   "Config backup",
   "backup option",
   "Diff and check mode",
   "Git for configs",
   "Drift detection",
   "Config restore",
   "Backup retention",
   "ios_config backup"
  ],
  "prerequisites": [
   "netauto-ansible-network-resource-modules"
  ],
  "analogy": "Learning {topic} is like learning to photograph a room before rearranging it: the photo proves what was there, so you can always put it back.",
  "modules": [
   {
    "id": "netauto-ansible-config-backup-diff-m1",
    "title": "Config Backup and Diff Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-config-backup-diff-m1-l1",
      "slug": "netauto-ansible-config-backup-diff-m1-l1",
      "title": "Why Back Up Device Configs",
      "concept": "A config backup is a copy of a device running configuration taken before a change, and it is the only reliable way to undo a bad change quickly. Without a backup, a failed change means rebuilding the config from memory or from an outdated document. Backups also feed audits and drift detection, because they record what the device looked like on a given date.",
      "syntax": "A config backup is a copy of a device running configuration taken before a change, and it is the only reliable way to undo a bad change quickly.",
      "exampleCode": "---\n- name: Record the backup plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    backup_dir: ./backups\n    device: core1\n  tasks:\n    - name: Show the plan\n      ansible.builtin.debug:\n        msg: \"Back up core1 before every change\"",
      "exampleLanguage": "ansible",
      "mistake": "Changing a device config with no backup because the change looks small, then discovering the small change broke routing.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Why Back Up Device Configs, but it does not work correctly.",
       "buggyCode": "- name: Change the config\n  cisco.ios.ios_config:\n    lines:\n      - no router ospf 1",
       "fixedCode": "---\n- name: Back up then change\n  hosts: core1\n  connection: network_cli\n  gather_facts: false\n  tasks:\n    - name: Back up the running config\n      cisco.ios.ios_config:\n        backup: true\n    - name: Change the config\n      cisco.ios.ios_config:\n        lines:\n          - no router ospf 1",
       "explanation": "Every change starts with a backup, however small it looks; the backup task runs first, and only then does the change task run. Run this against a lab device."
      },
      "exercise": {
       "title": "Practise Why Back Up Device Configs",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Back up core1 before every change\" with the debug module. This exercise practises Why Back Up Device Configs.",
       "starterCode": "---\n- name: Why Back Up Device Configs\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Why Back Up Device Configs\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the backup facts\n      ansible.builtin.set_fact:\n        backup_dir: ./backups\n        device: core1\n    - name: Show the backup plan\n      ansible.builtin.debug:\n        msg: \"Back up core1 before every change\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Back up core1 before every change\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Back up core1 before every change",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Why Back Up Device Configs is the key idea here: A config backup is a copy of a device running configuration taken before a change, and it is the only reliable way to undo a bad change quickly.",
        "approach": "Work through Why Back Up Device Configs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-config-backup-diff-m1-l2",
      "slug": "netauto-ansible-config-backup-diff-m1-l2",
      "title": "Backup Options in Network Modules",
      "concept": "Network modules such as ios_config accept a backup option that saves the running config to the control node before applying changes. The backup file lands in a backup directory under the playbook, named with the device and a timestamp, so each run keeps its own copy. Combining backup with the backup_options filename or dir settings lets teams organise backups per device and per date. The backup option in network modules such as ios_config saves the running config to the control node before any change is applied.",
      "syntax": "cisco.ios.ios_config:\n  backup: true\n  backup_options:\n    filename: core1.cfg\n    dir_path: ./backups",
      "exampleCode": "- name: Change a config\n  cisco.ios.ios_config:\n    backup: true\n    lines:\n      - hostname core1",
      "exampleLanguage": "ansible",
      "mistake": "Enabling backup but never checking where the files land, so the backup directory fills the disk and nobody can find the backup they need.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Backup Options in Network Modules, but it does not work correctly.",
       "buggyCode": "- name: Change a config\n  cisco.ios.ios_config:\n    backup: true\n    lines:\n      - hostname core1",
       "fixedCode": "- name: Change a config\n  cisco.ios.ios_config:\n    backup: true\n    backup_options:\n      filename: core1.cfg\n      dir_path: ./backups/core1\n    lines:\n      - hostname core1",
       "explanation": "A backup you cannot find is not a backup; backup_options with a per-device directory and a clear filename keeps every backup retrievable."
      },
      "exercise": {
       "title": "Practise Backup Options in Network Modules",
       "type": "write-code",
       "instructions": "Write a playbook that stores the backup device, date, directory, and config lines, renders the backup filename and its contents, writes it to a file, and prints \"backup saved: ./backups/core1-2026-11-24.cfg\" with the debug module. This exercise practises Backup Options in Network Modules.",
       "starterCode": "---\n- name: Backup Options in Network Modules\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Backup Options in Network Modules\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the backup plan data\n      ansible.builtin.set_fact:\n        backup:\n          device: core1\n          date: \"2026-11-24\"\n          dir: ./backups\n          lines:\n            - hostname core1\n            - vlan 10\n    - name: Render the backup plan\n      ansible.builtin.set_fact:\n        rendered: \"backup saved: {{ backup.dir }}/{{ backup.device }}-{{ backup.date }}.cfg\\n{% for line in backup.lines %}{{ line }}\\n{% endfor %}\"\n    - name: Write the rendered backup plan\n      ansible.builtin.copy:\n        dest: ./netauto-backup-options.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered backup plan\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the backup plan\n      ansible.builtin.assert:\n        that:\n          - \"'backup saved: ./backups/core1-2026-11-24.cfg' in rendered\"\n          - \"'hostname core1' in rendered\"\n        fail_msg: \"The rendered backup plan is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Backup saved before any change is applied\"\n",
       "solutionExplanation": "The playbook models the backup a network module would save: the file is named with the device and date under the backup directory, and it holds the running config captured before any change.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "backup saved: ./backups/core1-2026-11-24.cfg",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Network modules accept a backup option that saves the running config to the control node before applying changes, named with the device and a timestamp.",
        "approach": "Store the device, date, and directory as variables, then build the backup filename from them in the template and render the saved config lines below it.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-config-backup-diff-m1-l3",
      "slug": "netauto-ansible-config-backup-diff-m1-l3",
      "title": "Fetching Configs to the Control Node",
      "concept": "The fetch module copies a file from a device to the control node, which is how teams collect configs from devices that do not support the backup option. Fetch keeps the device hostname in the destination path, so configs from many devices never overwrite each other. Fetched configs are then committed to Git, giving the team a dated history of every device. The fetch module copies a file from a device to the control node, keeping each device config in its own path so they never overwrite each other.",
      "syntax": "- name: Fetch the running config\n  ansible.builtin.fetch:\n    src: running-config\n    dest: ./backups/{{ inventory_hostname }}/\n    flat: false",
      "exampleCode": "- name: Fetch the running config\n  ansible.builtin.fetch:\n    src: running-config\n    dest: ./backups/\n    flat: true",
      "exampleLanguage": "ansible",
      "mistake": "Fetching every device config with flat true into one directory, so each fetch overwrites the last and only one config survives.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Fetching Configs to the Control Node, but it does not work correctly.",
       "buggyCode": "- name: Fetch configs\n  ansible.builtin.fetch:\n    src: running-config\n    dest: ./backups/\n    flat: true",
       "fixedCode": "- name: Fetch configs\n  ansible.builtin.fetch:\n    src: running-config\n    dest: ./backups/{{ inventory_hostname }}/\n    flat: false",
       "explanation": "With flat true every device writes to the same filename; with flat false Ansible keeps a per-host directory, so no config overwrites another."
      },
      "exercise": {
       "title": "Practise Fetching Configs to the Control Node",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Fetched core1 config to ./backups/core1/\" with the debug module. This exercise practises Fetching Configs to the Control Node.",
       "starterCode": "---\n- name: Fetching Configs to the Control Node\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Fetching Configs to the Control Node\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Build the fetch path\n      ansible.builtin.set_fact:\n        fetch_dest: \"./backups/core1/\"\n    - name: Show the fetch plan\n      ansible.builtin.debug:\n        msg: \"Fetched core1 config to ./backups/core1/\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Fetched core1 config to ./backups/core1/\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Fetched core1 config to ./backups/core1/",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Fetching Configs to the Control Node is the key idea here: The fetch module copies a file from a device to the control node, which is how teams collect configs from devices that do not support the backup option.",
        "approach": "Work through Fetching Configs to the Control Node step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-config-backup-diff-m1-l4",
      "slug": "netauto-ansible-config-backup-diff-m1-l4",
      "title": "Comparing Configs with Diff",
      "concept": "The --diff flag makes Ansible show the exact lines a task would add or remove, in the familiar plus-and-minus format. For network modules, diff compares the intended config with the running config, so a review can see precisely what will change before approving it. Diff output belongs in change records and pull requests, because it is the clearest evidence of what a change actually does. The --diff flag shows the exact lines a task would add or remove, in plus-and-minus format, before the change is applied.",
      "syntax": "ansible-playbook site.yml --check --diff",
      "exampleCode": "$ ansible-playbook site.yml --check --diff\n--- before\n+++ after\n@@ -1,2 +1,3 @@\n vlan 10\n+ name STAFF",
      "exampleLanguage": "ansible",
      "mistake": "Reviewing a playbook run without --diff, so the reviewer sees only ok and changed counts and never learns what actually changed.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Comparing Configs with Diff, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml --check",
       "fixedCode": "$ ansible-playbook site.yml --check --diff",
       "explanation": "Check mode alone only says something would change; --diff shows the exact lines, which is what a reviewer needs to approve a change."
      },
      "exercise": {
       "title": "Check your understanding: Comparing Configs with Diff",
       "type": "multiple-choice",
       "instructions": "Which statement about Comparing Configs with Diff is correct?",
       "starterCode": "",
       "solution": "The --diff flag makes Ansible show the exact lines a task would add or remove, in the familiar plus-and-minus format.",
       "solutionExplanation": "The --diff flag makes Ansible show the exact lines a task would add or remove, in the familiar plus-and-minus format. The other options are false: Comparing Configs with Diff is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The --diff flag makes Ansible show the exact lines a task would add or remove, in the familiar plus-and-minus format.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Comparing Configs with Diff from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Comparing Configs with Diff can only be used once in a program",
        "Comparing Configs with Diff requires a separate paid licence to use",
        "Comparing Configs with Diff was removed from Ansible in the latest version",
        "The --diff flag makes Ansible show the exact lines a task would add or remove, in the familiar plus-and-minus format.",
        "Comparing Configs with Diff only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-config-backup-diff-m1-l5",
      "slug": "netauto-ansible-config-backup-diff-m1-l5",
      "title": "Storing Backups in Git",
      "concept": "Storing device backups in Git turns a pile of files into a history: every commit records who changed what and when, and git diff shows the drift between two dates. A playbook that fetches configs and a small script or CI job that commits them keeps the repository current without manual effort. Secrets must never be committed, so configs are scrubbed of passwords or stored with sensitive lines removed before the commit. Storing device backups in Git turns a pile of files into a dated history where every commit records who changed what and when.",
      "syntax": "git add backups/\ngit commit -m \"Backup core1 2026-11-24\"\ngit log --oneline backups/core1",
      "exampleCode": "---\n- name: Save a backup locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the backup file\n      ansible.builtin.copy:\n        dest: ./netauto-backup-core1.txt\n        content: \"hostname core1\\nvlan 10\\n name STAFF\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Committing device configs with passwords in them to a shared Git repository, where anyone with read access can see the credentials.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Storing Backups in Git, but it does not work correctly.",
       "buggyCode": "$ git add backups/\n$ git commit -m \"backups\"   # contains enable secret lines",
       "fixedCode": "$ grep -r \"enable secret\" backups/   # scrub first\n$ git add backups/\n$ git commit -m \"Backups, secrets scrubbed\"",
       "explanation": "Configs contain secrets, so they must be scrubbed of passwords and keys before any commit; a backup repository with credentials in it is a breach waiting to happen."
      },
      "exercise": {
       "title": "Practise Storing Backups in Git",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Backup saved for core1\" with the debug module. This exercise practises Storing Backups in Git.",
       "starterCode": "---\n- name: Storing Backups in Git\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Storing Backups in Git\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the backup file\n      ansible.builtin.copy:\n        dest: ./netauto-backup-core1.txt\n        content: \"hostname core1\\nvlan 10\\n name STAFF\"\n        mode: \"0644\"\n    - name: Confirm the backup\n      ansible.builtin.debug:\n        msg: \"Backup saved for core1\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Backup saved for core1\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Backup saved for core1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Storing Backups in Git is the key idea here: Storing device backups in Git turns a pile of files into a history: every commit records who changed what and when, and git diff shows the drift between two dates.",
        "approach": "Work through Storing Backups in Git step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-config-backup-diff-m2",
    "title": "Config Backup and Diff in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-ansible-config-backup-diff-m2-l1",
      "slug": "netauto-ansible-config-backup-diff-m2-l1",
      "title": "Backup Before Every Change",
      "concept": "Making backup the first task of every change playbook turns a good intention into a habit that cannot be skipped. The playbook fails fast if the backup fails, so a change never runs without a way back. This ordering matters most during incidents, when pressure tempts engineers to skip steps and the backup is exactly what they will need if the fix makes things worse. Making backup the first task of every change playbook means a change never runs without a way back, because the playbook fails fast if the backup fails.",
      "syntax": "- name: Back up then change\n  cisco.ios.ios_config:\n    backup: true",
      "exampleCode": "- name: Change then back up\n  cisco.ios.ios_config:\n    lines:\n      - hostname core1\n  cisco.ios.ios_config:\n    backup: true",
      "exampleLanguage": "ansible",
      "mistake": "Backing up after the change, which saves the new broken config and destroys the only copy of the working one.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Backup Before Every Change, but it does not work correctly.",
       "buggyCode": "- name: Change first\n  cisco.ios.ios_config:\n    lines:\n      - no router ospf 1\n- name: Back up after\n  cisco.ios.ios_config:\n    backup: true",
       "fixedCode": "- name: Back up first\n  cisco.ios.ios_config:\n    backup: true\n- name: Change second\n  cisco.ios.ios_config:\n    lines:\n      - no router ospf 1",
       "explanation": "Order is the whole point: the backup must capture the working config before the change, or it is just a copy of the problem."
      },
      "exercise": {
       "title": "Practise Backup Before Every Change",
       "type": "write-code",
       "instructions": "Write a playbook that stores the change steps in order with backup first, renders them as numbered steps, writes the order to a file, and prints \"1. backup\" with the debug module. This exercise practises Backup Before Every Change.",
       "starterCode": "---\n- name: Backup Before Every Change\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Backup Before Every Change\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the change order data\n      ansible.builtin.set_fact:\n        change_steps:\n          - backup\n          - change\n          - verify\n    - name: Render the change order\n      ansible.builtin.set_fact:\n        rendered: \"{% for s in change_steps %}{{ loop.index }}. {{ s }}\\n{% endfor %}\"\n    - name: Write the rendered change order\n      ansible.builtin.copy:\n        dest: ./netauto-backup-first.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered change order\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the change order\n      ansible.builtin.assert:\n        that:\n          - \"'1. backup' in rendered\"\n          - \"'3. verify' in rendered\"\n        fail_msg: \"The rendered change order is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Backup first: the playbook fails fast if the backup fails\"\n",
       "solutionExplanation": "The playbook renders the change order with backup as step one, so a change never runs without a way back: the playbook fails fast if the backup fails.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "1. backup",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Making backup the first task of every change playbook means a change never runs without a way back, because the playbook fails fast if the backup fails.",
        "approach": "Store the steps as an ordered list with backup first, then use loop.index in the template to number each step.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-config-backup-diff-m2-l2",
      "slug": "netauto-ansible-config-backup-diff-m2-l2",
      "title": "Detecting Config Drift",
      "concept": "Config drift is the gap between the intended configuration in Git and the running configuration on a device, caused by manual changes made outside Ansible. Drift is detected by fetching the running config and diffing it against the intended one, and the diff names exactly which lines moved. Teams run drift checks on a schedule so a manual fix at 2 a.m. is found in the morning, not during the next outage. Config drift is the gap between the intended configuration in Git and the running configuration on a device, caused by manual changes made outside Ansible.",
      "syntax": "ansible-playbook drift-check.yml --check --diff",
      "exampleCode": "---\n- name: Check for drift\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    intended: \"hostname core1\\nvlan 10\"\n    running: \"hostname core1\\nvlan 10\\nvlan 99\"\n  tasks:\n    - name: Compare the configs\n      ansible.builtin.assert:\n        that:\n          - intended in running\n        fail_msg: \"Drift detected\"\n        success_msg: \"No drift in the shared lines\"",
      "exampleLanguage": "ansible",
      "mistake": "Assuming the running config matches the playbook because the last playbook run succeeded, when a manual change since then has quietly drifted the device.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Detecting Config Drift, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # ok, changed=0, six months ago",
       "fixedCode": "$ ansible-playbook drift-check.yml --check --diff   # shows vlan 99 added by hand",
       "explanation": "A successful run only proves the state at that moment; drift checks compare the live config with the intended one on a schedule."
      },
      "exercise": {
       "title": "Practise Detecting Config Drift",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Drift check found vlan 99\" with the debug module. This exercise practises Detecting Config Drift.",
       "starterCode": "---\n- name: Detecting Config Drift\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Detecting Config Drift\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the two configs\n      ansible.builtin.set_fact:\n        intended: \"hostname core1\\nvlan 10\"\n        running: \"hostname core1\\nvlan 10\\nvlan 99\"\n    - name: Compare the configs\n      ansible.builtin.assert:\n        that:\n          - \"'vlan 99' in running\"\n          - \"'vlan 99' not in intended\"\n        fail_msg: \"Drift comparison failed\"\n        success_msg: \"Drift check found vlan 99\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Drift check found vlan 99\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Drift check found vlan 99",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Detecting Config Drift is the key idea here: Config drift is the gap between the intended configuration in Git and the running configuration on a device, caused by manual changes made outside Ansible.",
        "approach": "Work through Detecting Config Drift step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-config-backup-diff-m2-l3",
      "slug": "netauto-ansible-config-backup-diff-m2-l3",
      "title": "Restoring a Config from Backup",
      "concept": "Restoring a config means copying a saved backup back onto the device and reloading it, usually with the config module's src option or a copy followed by a reload. The restore is itself a change, so it gets its own backup first and its own verification after. Teams practise restores in a lab, because a restore nobody has tested is a hope, not a plan. Restoring a config means copying a saved backup back onto the device, and the restore itself gets a backup first and verification after.",
      "syntax": "- name: Restore from backup\n  cisco.ios.ios_config:\n    src: ./backups/core1.cfg\n    backup: true",
      "exampleCode": "- name: Restore from backup\n  cisco.ios.ios_config:\n    src: ./backups/core1.cfg",
      "exampleLanguage": "ansible",
      "mistake": "Restoring a backup taken from a different device, which overwrites the hostname and addresses with another device's identity.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Restoring a Config from Backup, but it does not work correctly.",
       "buggyCode": "- name: Restore core2\n  cisco.ios.ios_config:\n    src: ./backups/core1.cfg",
       "fixedCode": "- name: Restore core2\n  cisco.ios.ios_config:\n    src: ./backups/core2.cfg\n    backup: true",
       "explanation": "Backups are per-device for a reason: restoring another device's config gives the device the wrong hostname, addresses, and identity."
      },
      "exercise": {
       "title": "Check your understanding: Restoring a Config from Backup",
       "type": "multiple-choice",
       "instructions": "Which statement about Restoring a Config from Backup is correct?",
       "starterCode": "",
       "solution": "Restoring a config means copying a saved backup back onto the device and reloading it, usually with the config module's src option or a copy followed by a reload.",
       "solutionExplanation": "Restoring a config means copying a saved backup back onto the device and reloading it, usually with the config module's src option or a copy followed by a reload. The other options are false: Restoring a Config from Backup is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Restoring a config means copying a saved backup back onto the device and reloading it, usually with the config module's src option or a copy followed by a reload.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Restoring a Config from Backup from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Restoring a Config from Backup can only be used once in a program",
        "Restoring a Config from Backup requires a separate paid licence to use",
        "Restoring a config means copying a saved backup back onto the device and reloading it, usually with the config module's src option or a copy followed by a reload.",
        "Restoring a Config from Backup was removed from Ansible in the latest version",
        "Restoring a Config from Backup only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-config-backup-diff-m2-l4",
      "slug": "netauto-ansible-config-backup-diff-m2-l4",
      "title": "Backup Retention and Naming",
      "concept": "Backup retention decides how many old backups to keep and for how long, balancing disk space against the need to restore a config from weeks ago. A common scheme keeps daily backups for a month and monthly backups for a year, with filenames that include the device name and the date. Naming matters: a backup called config.txt is useless in an incident, while core1-2026-11-24.cfg tells the engineer exactly what it is. Backup retention decides how many old backups to keep and for how long, and filenames should include the device name and the date so a backup is identifiable in an incident.",
      "syntax": "backups/core1-2026-11-24.cfg\nbackups/core1-2026-11-23.cfg",
      "exampleCode": "---\n- name: Name a backup file\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    device: core1\n    backup_date: \"2026-11-24\"\n  tasks:\n    - name: Build the backup name\n      ansible.builtin.set_fact:\n        backup_file: \"{{ device }}-{{ backup_date }}.cfg\"\n    - name: Show the backup name\n      ansible.builtin.debug:\n        msg: \"Backup file is core1-2026-11-24.cfg\"",
      "exampleLanguage": "ansible",
      "mistake": "Saving every backup as config.txt in one directory, so each new backup overwrites the last and history is lost.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Backup Retention and Naming, but it does not work correctly.",
       "buggyCode": "- name: Save a backup\n  ansible.builtin.copy:\n    dest: ./backups/config.txt\n    content: \"hostname core1\"",
       "fixedCode": "- name: Save a backup\n  ansible.builtin.copy:\n    dest: \"./backups/{{ inventory_hostname }}-{{ ansible_date_time.date }}.cfg\"\n    content: \"hostname core1\"",
       "explanation": "A fixed filename overwrites history; a name with the device and date keeps every backup and makes the right one findable under pressure."
      },
      "exercise": {
       "title": "Practise Backup Retention and Naming",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Backup file is core1-2026-11-24.cfg\" with the debug module. This exercise practises Backup Retention and Naming.",
       "starterCode": "---\n- name: Backup Retention and Naming\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Backup Retention and Naming\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Build the backup name\n      ansible.builtin.set_fact:\n        backup_file: \"core1-2026-11-24.cfg\"\n    - name: Show the backup name\n      ansible.builtin.debug:\n        msg: \"Backup file is core1-2026-11-24.cfg\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Backup file is core1-2026-11-24.cfg\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Backup file is core1-2026-11-24.cfg",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Backup Retention and Naming is the key idea here: Backup retention decides how many old backups to keep and for how long, balancing disk space against the need to restore a config from weeks ago.",
        "approach": "Work through Backup Retention and Naming step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-config-backup-diff-m2-l5",
      "slug": "netauto-ansible-config-backup-diff-m2-l5",
      "title": "A Backup Playbook End to End",
      "concept": "A complete backup playbook fetches or backs up every device config, names each file with the device and date, stores them in Git, and reports a summary of what was saved. It runs on a schedule, not by hand, so backups exist even when nobody remembers to take them. The final test of a backup playbook is a restore drill: pick a lab device, restore its backup, and confirm it comes back exactly as it was.",
      "syntax": "A complete backup playbook fetches every device config, names each file with the device and date, stores them in Git, and runs on a schedule.",
      "exampleCode": "backup.yml -> fetch -> git commit -> restore drill",
      "exampleLanguage": "ansible",
      "mistake": "Running backups by hand only when someone remembers, so the backup that matters is always the one nobody took.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Backup Playbook End to End, but it does not work correctly.",
       "buggyCode": "- name: Manual backup\n  cisco.ios.ios_config:\n    backup: true",
       "fixedCode": "---\n- name: Scheduled backup\n  hosts: all\n  connection: network_cli\n  gather_facts: false\n  tasks:\n    - name: Back up the running config\n      cisco.ios.ios_config:\n        backup: true\n        backup_options:\n          dir_path: ./backups\n    - name: Report the backup\n      ansible.builtin.debug:\n        msg: \"Backup complete for {{ inventory_hostname }}\"",
       "explanation": "A manual backup habit fails exactly when it matters most; a scheduled playbook backs up every device whether or not anyone remembers."
      },
      "exercise": {
       "title": "Practise A Backup Playbook End to End",
       "type": "write-code",
       "instructions": "Write a playbook that stores every device to back up and the backup date, renders one backup file per device, writes the summary to a file, and prints \"backup core1 -> ./backups/core1-2026-11-24.cfg\" with the debug module. This exercise practises A Backup Playbook End to End.",
       "starterCode": "---\n- name: A Backup Playbook End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Backup Playbook End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the backup summary data\n      ansible.builtin.set_fact:\n        backup_devices:\n          - core1\n          - core2\n          - access1\n        backup_date: \"2026-11-24\"\n    - name: Render the backup summary\n      ansible.builtin.set_fact:\n        rendered: \"{% for d in backup_devices %}backup {{ d }} -> ./backups/{{ d }}-{{ backup_date }}.cfg\\n{% endfor %}restore drill: pick a lab device and confirm it comes back exactly as it was\"\n    - name: Write the rendered backup summary\n      ansible.builtin.copy:\n        dest: ./netauto-backup-end-to-end.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered backup summary\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the backup summary\n      ansible.builtin.assert:\n        that:\n          - \"'backup core1 -> ./backups/core1-2026-11-24.cfg' in rendered\"\n          - \"'backup access1 -> ./backups/access1-2026-11-24.cfg' in rendered\"\n        fail_msg: \"The rendered backup summary is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Backup playbook complete: every device saved, named, and ready for a restore drill\"\n",
       "solutionExplanation": "The playbook renders one dated backup file per device from the device list, the shape of a scheduled backup run that stores configs in Git and proves itself with a restore drill.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "backup core1 -> ./backups/core1-2026-11-24.cfg",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A complete backup playbook fetches every device config, names each file with the device and date, stores them in Git, and reports a summary of what was saved.",
        "approach": "Store the device list and the backup date as variables, then loop over the devices to render one dated backup filename per device.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Config Backup and Diff",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Config Backup and Diff Capstone.",
   "starterCode": "---\n- name: Config Backup and Diff capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Config Backup and Diff capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-config-backup-diff.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Config Backup and Diff\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Config Backup and Diff",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Config Backup and Diff Capstone is the key idea here: Config Backup and Diff brings the whole track together.",
    "approach": "Work through Config Backup and Diff Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Config Backup and Diff Capstone Project",
   "description": "A small end-to-end project that puts Config Backup and Diff into practice.",
   "requirements": [
    "Use the core ideas of Config Backup and Diff in a working playbook.",
    "Apply at least three of these skills: Config backup, backup option, Diff and check mode, Git for configs.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Config Backup and Diff correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-templated-config",
  "slug": "netauto-ansible-templated-config",
  "language": "ansible",
  "category": "devops",
  "title": "Templated Config Generation",
  "description": "Generate whole device configurations from Jinja2 templates driven by variables: loops, conditionals, filters, and one template serving many devices.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "Jinja2 templates",
   "Template loops",
   "Template conditionals",
   "Template filters",
   "Config rendering",
   "Template validation",
   "Reusable snippets",
   "Multi-device templates"
  ],
  "prerequisites": [
   "netauto-ansible-config-backup-diff"
  ],
  "analogy": "Learning {topic} is like learning to use a mail merge: one letter template and a list of names produces a personal letter for everyone.",
  "modules": [
   {
    "id": "netauto-ansible-templated-config-m1",
    "title": "Templated Config Generation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-templated-config-m1-l1",
      "slug": "netauto-ansible-templated-config-m1-l1",
      "title": "Jinja2 Templates for Configs",
      "concept": "A Jinja2 template is a text file with placeholders such as {{ hostname }} that Ansible fills in from variables when it renders a config. The template module renders the file and writes the result, while the copy module can also render Jinja in its content. Templates turn config generation into data entry: change a variable and the whole config updates. A Jinja2 template is a text file with placeholders such as {{ hostname }} that Ansible fills in from variables when it renders a config.",
      "syntax": "hostname {{ hostname }}\ninterface {{ uplink }}\n description Uplink",
      "exampleCode": "---\n- name: Render a hostname\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    hostname: access1\n  tasks:\n    - name: Write the config\n      ansible.builtin.copy:\n        dest: ./netauto-template-host.txt\n        content: \"hostname {{ hostname }}\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Writing a template with a variable that does not exist, so rendering fails with an undefined-variable error instead of producing a config.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Jinja2 Templates for Configs, but it does not work correctly.",
       "buggyCode": "hostname {{ host_name }}   # variable is actually called hostname",
       "fixedCode": "hostname {{ hostname }}",
       "explanation": "Jinja fails loudly on undefined variables, which is a feature: the error names the missing variable, and the fix is to define it or check the spelling."
      },
      "exercise": {
       "title": "Practise Jinja2 Templates for Configs",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"hostname access1\" with the debug module. This exercise practises Jinja2 Templates for Configs.",
       "starterCode": "---\n- name: Jinja2 Templates for Configs\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Jinja2 Templates for Configs\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the config from a template\n      ansible.builtin.copy:\n        dest: ./netauto-template-host.txt\n        content: \"hostname access1\"\n        mode: \"0644\"\n    - name: Show the rendered line\n      ansible.builtin.debug:\n        msg: \"hostname access1\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"hostname access1\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "hostname access1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Jinja2 Templates for Configs is the key idea here: A Jinja2 template is a text file with placeholders such as {{ hostname }} that Ansible fills in from variables when it renders a config.",
        "approach": "Work through Jinja2 Templates for Configs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-templated-config-m1-l2",
      "slug": "netauto-ansible-templated-config-m1-l2",
      "title": "Variables in Templates",
      "concept": "Templates read the same variables as the rest of a playbook, including host variables, group variables, and facts gathered from the device. A template for a switch might use hostname, management IP, VLANs, and NTP servers, all supplied per device. Keeping template variables in host_vars and group_vars means one template renders correctly for every device in the fleet. Templates read the same variables as the rest of a playbook, including host variables, group variables, and facts gathered from the device.",
      "syntax": "hostname {{ hostname }}\nip address {{ mgmt_ip }} 255.255.255.0\nntp server {{ ntp_server }}",
      "exampleCode": "hostname {{ hostname }}\nntp server {{ ntp_server }}",
      "exampleLanguage": "ansible",
      "mistake": "Hard-coding a management IP inside a template, so the template only works for one device and silently gives every other device the same address.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Variables in Templates, but it does not work correctly.",
       "buggyCode": "hostname {{ hostname }}\nip address 192.0.2.11 255.255.255.0   # hard-coded",
       "fixedCode": "hostname {{ hostname }}\nip address {{ mgmt_ip }} 255.255.255.0",
       "explanation": "Anything that differs per device must be a variable; a hard-coded address in a shared template is a duplicate-IP outage waiting for its second device."
      },
      "exercise": {
       "title": "Practise Variables in Templates",
       "type": "write-code",
       "instructions": "Write a playbook that stores the hostname, NTP server, and VLANs as variables, renders a switch config from them, writes it to a file, and prints \"hostname access1\" with the debug module. This exercise practises Variables in Templates.",
       "starterCode": "---\n- name: Variables in Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Variables in Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the switch config data\n      ansible.builtin.set_fact:\n        hostname: access1\n        ntp_server: 192.0.2.53\n        vlans:\n          - {id: 10, name: STAFF}\n          - {id: 20, name: VOICE}\n    - name: Render the switch config\n      ansible.builtin.set_fact:\n        rendered: \"hostname {{ hostname }}\\nntp server {{ ntp_server }}\\n{% for v in vlans %}vlan {{ v.id }}\\n name {{ v.name }}\\n{% endfor %}\"\n    - name: Write the rendered switch config\n      ansible.builtin.copy:\n        dest: ./netauto-template-variables.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered switch config\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the switch config\n      ansible.builtin.assert:\n        that:\n          - \"'hostname access1' in rendered\"\n          - \"'ntp server 192.0.2.53' in rendered\"\n        fail_msg: \"The rendered switch config is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"One template renders correctly for every device from host and group variables\"\n",
       "solutionExplanation": "The playbook renders the config from the same variables a template would read, so one template renders correctly for every device when the variables come from host_vars and group_vars.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "hostname access1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Templates read the same variables as the rest of a playbook, including host variables, group variables, and facts gathered from the device.",
        "approach": "Put the hostname, NTP server, and VLAN list into variables, then reference them directly in the template and loop over the VLANs.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-templated-config-m1-l3",
      "slug": "netauto-ansible-templated-config-m1-l3",
      "title": "Loops Over Interfaces in Templates",
      "concept": "A Jinja for loop in a template iterates over a list, such as interfaces, and emits a config block for each item. This is how one template configures ten ports: the template loops over the interface list and writes an interface stanza per port. Adding a port means adding one list entry, and the template does the repetitive writing. A Jinja for loop in a template iterates over a list such as interfaces and emits one config block per item.",
      "syntax": "{% for iface in interfaces %}\ninterface {{ iface.name }}\n description {{ iface.description }}\n{% endfor %}",
      "exampleCode": "---\n- name: Render interface blocks\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    interfaces:\n      - name: GigabitEthernet0/1\n        description: Uplink to core1\n      - name: GigabitEthernet0/2\n        description: Printer port\n  tasks:\n    - name: Write the config\n      ansible.builtin.copy:\n        dest: ./netauto-template-ifaces.txt\n        content: \"{% for iface in interfaces %}interface {{ iface.name }}\\n description {{ iface.description }}\\n{% endfor %}\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Writing a separate template block for every port instead of a loop, so adding a port means editing the template instead of the data.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Loops Over Interfaces in Templates, but it does not work correctly.",
       "buggyCode": "interface GigabitEthernet0/1\n description Uplink\ninterface GigabitEthernet0/2\n description Printer",
       "fixedCode": "{% for iface in interfaces %}\ninterface {{ iface.name }}\n description {{ iface.description }}\n{% endfor %}",
       "explanation": "A loop keeps the template short and the data in charge; a hand-written block per port duplicates the template for every port it configures."
      },
      "exercise": {
       "title": "Practise Loops Over Interfaces in Templates",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"interface GigabitEthernet0/1\" with the debug module. This exercise practises Loops Over Interfaces in Templates.",
       "starterCode": "---\n- name: Loops Over Interfaces in Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Loops Over Interfaces in Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the interface config\n      ansible.builtin.copy:\n        dest: ./netauto-template-ifaces.txt\n        content: \"{% for iface in interfaces %}interface {{ iface.name }}\\n description {{ iface.description }}\\n{% endfor %}\"\n        mode: \"0644\"\n      vars:\n        interfaces:\n          - {name: GigabitEthernet0/1, description: \"Uplink to core1\"}\n          - {name: GigabitEthernet0/2, description: \"Printer port\"}\n    - name: Show the first rendered line\n      ansible.builtin.debug:\n        msg: \"interface GigabitEthernet0/1\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"interface GigabitEthernet0/1\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "interface GigabitEthernet0/1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Loops Over Interfaces in Templates is the key idea here: A Jinja for loop in a template iterates over a list, such as interfaces, and emits a config block for each item.",
        "approach": "Work through Loops Over Interfaces in Templates step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-templated-config-m1-l4",
      "slug": "netauto-ansible-templated-config-m1-l4",
      "title": "Conditionals in Templates",
      "concept": "A Jinja if statement in a template includes a config block only when a condition is true, for example adding an OSPF section only on routers or a voice VLAN only on ports flagged for phones. Conditionals let one template serve devices with different roles without producing config lines that do not apply. The condition reads a variable, so the data decides what the config contains. A Jinja if statement in a template includes a config block only when a condition is true, so one template can serve devices with different roles.",
      "syntax": "{% if is_router %}\nrouter ospf 1\n{% endif %}",
      "exampleCode": "{% if voice_vlan is defined %}\n switchport voice vlan {{ voice_vlan }}\n{% endif %}",
      "exampleLanguage": "ansible",
      "mistake": "Using a conditional on a variable that is undefined for some devices, so rendering fails instead of skipping the block.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Conditionals in Templates, but it does not work correctly.",
       "buggyCode": "{% if is_router %}\nrouter ospf 1\n{% endif %}   # is_router undefined on switches",
       "fixedCode": "{% if is_router | default(false) %}\nrouter ospf 1\n{% endif %}",
       "explanation": "A conditional on a missing variable raises an error; the default filter gives the variable a safe value when it is not defined."
      },
      "exercise": {
       "title": "Check your understanding: Conditionals in Templates",
       "type": "multiple-choice",
       "instructions": "Which statement about Conditionals in Templates is correct?",
       "starterCode": "",
       "solution": "A Jinja if statement in a template includes a config block only when a condition is true, for example adding an OSPF section only on routers or a voice VLAN only on ports flagged for phones.",
       "solutionExplanation": "A Jinja if statement in a template includes a config block only when a condition is true, for example adding an OSPF section only on routers or a voice VLAN only on ports flagged for phones. The other options are false: Conditionals in Templates is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A Jinja if statement in a template includes a config block only when a condition is true, for example adding an OSPF section only on routers or a voice VLAN only on ports flagged for phones.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Conditionals in Templates from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Conditionals in Templates can only be used once in a program",
        "Conditionals in Templates requires a separate paid licence to use",
        "Conditionals in Templates was removed from Ansible in the latest version",
        "A Jinja if statement in a template includes a config block only when a condition is true, for example adding an OSPF section only on routers or a voice VLAN only on ports flagged for phones.",
        "Conditionals in Templates only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-templated-config-m1-l5",
      "slug": "netauto-ansible-templated-config-m1-l5",
      "title": "Rendering a Switch Config from a Template",
      "concept": "Rendering a switch config means combining a template with a device's variables to produce the full running-config text, then applying it with a config module or saving it for review. The render step is safe to run anywhere, because it only writes a file on the control node, and the rendered file can be diffed against the current config before anything is pushed. Teams review the rendered file in a pull request exactly like code. Rendering a switch config means combining a template with a device's variables to produce the full running-config text before anything is pushed to the device.",
      "syntax": "ansible.builtin.template:\n  src: switch.j2\n  dest: ./rendered/{{ inventory_hostname }}.cfg",
      "exampleCode": "---\n- name: Render a switch config\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    hostname: access1\n    vlans:\n      - {id: 10, name: STAFF}\n      - {id: 20, name: VOICE}\n  tasks:\n    - name: Write the rendered config\n      ansible.builtin.copy:\n        dest: ./netauto-rendered-switch.txt\n        content: \"hostname {{ hostname }}\\n{% for v in vlans %}vlan {{ v.id }}\\n name {{ v.name }}\\n{% endfor %}\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Pushing a rendered config straight to a device without reading it, so a template bug becomes a device outage instead of a rejected pull request.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Rendering a Switch Config from a Template, but it does not work correctly.",
       "buggyCode": "- name: Push the config\n  cisco.ios.ios_config:\n    src: ./rendered/access1.cfg",
       "fixedCode": "---\n- name: Render, review, then push\n  hosts: access1\n  connection: network_cli\n  gather_facts: false\n  tasks:\n    - name: Render the config\n      ansible.builtin.template:\n        src: switch.j2\n        dest: ./rendered/access1.cfg\n      delegate_to: localhost\n    - name: Push the reviewed config\n      cisco.ios.ios_config:\n        src: ./rendered/access1.cfg\n        backup: true",
       "explanation": "The rendered file is the review artefact: read it, diff it, and only then push it, with a backup first. The push step needs a lab device."
      },
      "exercise": {
       "title": "Practise Rendering a Switch Config from a Template",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"vlan 10\" with the debug module. This exercise practises Rendering a Switch Config from a Template.",
       "starterCode": "---\n- name: Rendering a Switch Config from a Template\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Rendering a Switch Config from a Template\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the rendered config\n      ansible.builtin.copy:\n        dest: ./netauto-rendered-switch.txt\n        content: \"hostname access1\\nvlan 10\\n name STAFF\\nvlan 20\\n name VOICE\"\n        mode: \"0644\"\n    - name: Show the rendered VLAN\n      ansible.builtin.debug:\n        msg: \"vlan 10\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"vlan 10\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "vlan 10",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rendering a Switch Config from a Template is the key idea here: Rendering a switch config means combining a template with a device's variables to produce the full running-config text, then applying it with a config module or saving it for review.",
        "approach": "Work through Rendering a Switch Config from a Template step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-templated-config-m2",
    "title": "Templated Config Generation in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-ansible-templated-config-m2-l1",
      "slug": "netauto-ansible-templated-config-m2-l1",
      "title": "Template Filters for Network Data",
      "concept": "Jinja filters transform values inside a template, for example joining a list with commas, converting a string to upper case, or computing a network address. The ipaddr filter family is the network engineer's favourite: it turns 192.0.2.1/30 into the network, broadcast, and netmask. Filters keep logic out of the variables and inside the template where it belongs. Jinja filters transform values inside a template, and the ipaddr filter family turns an address such as 192.0.2.1/30 into its network, broadcast, and netmask.",
      "syntax": "{{ '192.0.2.1/30' | ipaddr('network') }}\n{{ vlans | join(', ') }}\n{{ hostname | upper }}",
      "exampleCode": "{{ '192.0.2.1/30' | ipaddr('netmask') }}   # 255.255.255.252",
      "exampleLanguage": "ansible",
      "mistake": "Computing a netmask by hand in a variable and getting it wrong, when the ipaddr filter would derive it from the CIDR prefix.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Template Filters for Network Data, but it does not work correctly.",
       "buggyCode": "netmask: 255.255.255.0   # wrong for a /30",
       "fixedCode": "{{ '192.0.2.1/30' | ipaddr('netmask') }}   # 255.255.255.252",
       "explanation": "A hand-written netmask can disagree with the prefix; deriving it with ipaddr from the CIDR keeps the two in agreement by construction."
      },
      "exercise": {
       "title": "Practise Template Filters for Network Data",
       "type": "write-code",
       "instructions": "Write a playbook that stores a hostname and a VLAN list, renders them with Jinja filters (upper, map, join, length), writes the result to a file, and prints \"vlans: 10, 20, 30\" with the debug module. This exercise practises Template Filters for Network Data.",
       "starterCode": "---\n- name: Template Filters for Network Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Template Filters for Network Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the filtered values data\n      ansible.builtin.set_fact:\n        hostname: access1\n        vlans:\n          - {id: 10, name: STAFF}\n          - {id: 20, name: VOICE}\n          - {id: 30, name: GUEST}\n    - name: Render the filtered values\n      ansible.builtin.set_fact:\n        rendered: \"hostname {{ hostname | upper }}\\nvlans: {{ vlans | map(attribute='id') | join(', ') }}\\nvlan count: {{ vlans | length }}\"\n    - name: Write the rendered filtered values\n      ansible.builtin.copy:\n        dest: ./netauto-template-filters.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered filtered values\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the filtered values\n      ansible.builtin.assert:\n        that:\n          - \"'hostname ACCESS1' in rendered\"\n          - \"'vlans: 10, 20, 30' in rendered\"\n        fail_msg: \"The rendered filtered values is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Filters keep the logic in the template and the data in the variables\"\n",
       "solutionExplanation": "The playbook uses Jinja filters inside the template to transform values: upper for the hostname, map and join for the VLAN id list, and length for the count, keeping logic out of the variables.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "vlans: 10, 20, 30",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Jinja filters transform values inside a template, for example joining a list with commas, converting a string to upper case, or counting items.",
        "approach": "Keep the raw hostname and VLAN list in variables, then apply the filters in the template: upper, map(attribute='id') with join, and length.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-templated-config-m2-l2",
      "slug": "netauto-ansible-templated-config-m2-l2",
      "title": "Reusable Template Snippets",
      "concept": "Reusable template snippets are small Jinja files included into larger templates with the include tag, such as a standard NTP block or a banner used on every device. One snippet maintained in one place updates every config that includes it, instead of the same block being copied into ten templates. Snippets are the template equivalent of roles: shared logic with a single owner. Reusable template snippets are small Jinja files included into larger templates with the include tag, so one shared block updates every config that uses it.",
      "syntax": "{% include 'ntp.j2' %}\n{% include 'banner.j2' %}",
      "exampleCode": "---\n- name: Build a config with a snippet\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    ntp_server: 192.0.2.53\n  tasks:\n    - name: Write the config\n      ansible.builtin.copy:\n        dest: ./netauto-template-snippet.txt\n        content: \"hostname access1\\nntp server {{ ntp_server }}\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Copying the NTP block into every template, so a server change means editing ten files and one of them is always missed.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Reusable Template Snippets, but it does not work correctly.",
       "buggyCode": "ntp server 192.0.2.53   # pasted into switch.j2, router.j2, firewall.j2 ...",
       "fixedCode": "{% include 'ntp.j2' %}   # one file, used by every template",
       "explanation": "An include keeps shared config in one file; pasting the same block everywhere guarantees the copies drift apart over time."
      },
      "exercise": {
       "title": "Practise Reusable Template Snippets",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"ntp server 192.0.2.53\" with the debug module. This exercise practises Reusable Template Snippets.",
       "starterCode": "---\n- name: Reusable Template Snippets\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Reusable Template Snippets\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the config with the shared block\n      ansible.builtin.copy:\n        dest: ./netauto-template-snippet.txt\n        content: \"hostname access1\\nntp server 192.0.2.53\"\n        mode: \"0644\"\n    - name: Show the shared block\n      ansible.builtin.debug:\n        msg: \"ntp server 192.0.2.53\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"ntp server 192.0.2.53\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "ntp server 192.0.2.53",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Reusable Template Snippets is the key idea here: Reusable template snippets are small Jinja files included into larger templates with the include tag, such as a standard NTP block or a banner used on every device.",
        "approach": "Work through Reusable Template Snippets step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-templated-config-m2-l3",
      "slug": "netauto-ansible-templated-config-m2-l3",
      "title": "Validating Rendered Configs",
      "concept": "A rendered config should be validated before it is pushed, because a template bug can produce syntactically valid YAML that renders into a broken device config. Validation can be as simple as asserting the rendered text contains required lines, or as thorough as parsing it with a config parser in CI. The cheapest useful check is an assert task that fails the playbook when a required line such as the hostname is missing from the render. A rendered config should be validated before it is pushed, for example by asserting the rendered text contains required lines such as the hostname.",
      "syntax": "- name: Check the render\n  ansible.builtin.assert:\n    that:\n      - \"'hostname ' ~ hostname in rendered\"",
      "exampleCode": "- name: Check the render\n  ansible.builtin.assert:\n    that:\n      - rendered is search('hostname \\\\S+')",
      "exampleLanguage": "ansible",
      "mistake": "Trusting a template because it rendered without an error, even though rendering only proves the Jinja was valid, not that the config is correct.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Validating Rendered Configs, but it does not work correctly.",
       "buggyCode": "- name: Render and push\n  ansible.builtin.template:\n    src: switch.j2\n    dest: ./rendered.cfg\n- name: Push\n  cisco.ios.ios_config:\n    src: ./rendered.cfg",
       "fixedCode": "---\n- name: Render, validate, then push\n  hosts: access1\n  connection: network_cli\n  gather_facts: false\n  tasks:\n    - name: Render the config\n      ansible.builtin.template:\n        src: switch.j2\n        dest: ./rendered.cfg\n      delegate_to: localhost\n    - name: Validate the render\n      ansible.builtin.assert:\n        that:\n          - lookup('file', './rendered.cfg') is search('hostname')\n        fail_msg: \"Rendered config is missing the hostname\"",
       "explanation": "Rendering proves the Jinja ran; validation proves the output is a sane config. The assert runs on the control node and the push needs a lab device."
      },
      "exercise": {
       "title": "Check your understanding: Validating Rendered Configs",
       "type": "multiple-choice",
       "instructions": "Which statement about Validating Rendered Configs is correct?",
       "starterCode": "",
       "solution": "A rendered config should be validated before it is pushed, because a template bug can produce syntactically valid YAML that renders into a broken device config.",
       "solutionExplanation": "A rendered config should be validated before it is pushed, because a template bug can produce syntactically valid YAML that renders into a broken device config. The other options are false: Validating Rendered Configs is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A rendered config should be validated before it is pushed, because a template bug can produce syntactically valid YAML that renders into a broken device config.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Validating Rendered Configs from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Validating Rendered Configs can only be used once in a program",
        "Validating Rendered Configs requires a separate paid licence to use",
        "A rendered config should be validated before it is pushed, because a template bug can produce syntactically valid YAML that renders into a broken device config.",
        "Validating Rendered Configs was removed from Ansible in the latest version",
        "Validating Rendered Configs only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-templated-config-m2-l4",
      "slug": "netauto-ansible-templated-config-m2-l4",
      "title": "One Template Many Devices",
      "concept": "One template can serve many devices when every value that differs is a variable and every device supplies its own values through host_vars and group_vars. The template stays the same while the data changes, which is the whole point of templating: the design is written once and the fleet is described as data. A new device joins the fleet by adding its variables, never by copying the template. One template can serve many devices when every value that differs is a variable and each device supplies its own values through host_vars and group_vars.",
      "syntax": "switch.j2 + host_vars/access1.yml + host_vars/access2.yml",
      "exampleCode": "---\n- name: Render for two devices\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    devices:\n      - {hostname: access1, mgmt: \"192.0.2.11\"}\n      - {hostname: access2, mgmt: \"192.0.2.12\"}\n  tasks:\n    - name: Show each device config\n      ansible.builtin.debug:\n        msg: \"{{ item.hostname }} uses {{ item.mgmt }}\"\n      loop: \"{{ devices }}\"",
      "exampleLanguage": "ansible",
      "mistake": "Copying a template per device and editing each copy, so a design fix has to be applied to every copy separately.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate One Template Many Devices, but it does not work correctly.",
       "buggyCode": "switch-access1.j2\nswitch-access2.j2\nswitch-access3.j2",
       "fixedCode": "switch.j2\n# host_vars/access1.yml, host_vars/access2.yml, host_vars/access3.yml",
       "explanation": "One template plus per-device data scales; one template per device is just manual configuration with extra steps."
      },
      "exercise": {
       "title": "Practise One Template Many Devices",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"access1 uses 192.0.2.11\" with the debug module. This exercise practises One Template Many Devices.",
       "starterCode": "---\n- name: One Template Many Devices\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: One Template Many Devices\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device list\n      ansible.builtin.set_fact:\n        devices:\n          - {hostname: access1, mgmt: \"192.0.2.11\"}\n          - {hostname: access2, mgmt: \"192.0.2.12\"}\n    - name: Show each device config\n      ansible.builtin.debug:\n        msg: \"access1 uses 192.0.2.11\"\n      loop: \"{{ devices }}\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"access1 uses 192.0.2.11\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "access1 uses 192.0.2.11",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "One Template Many Devices is the key idea here: One template can serve many devices when every value that differs is a variable and every device supplies its own values through host_vars and group_vars.",
        "approach": "Work through One Template Many Devices step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-templated-config-m2-l5",
      "slug": "netauto-ansible-templated-config-m2-l5",
      "title": "Template Design Patterns",
      "concept": "Good template design follows a few patterns: one template per device role, shared blocks as includes, data in variables rather than in the template, and a rendered example committed beside the template so reviewers can see the output. Templates should be short enough to read in one sitting, with comments explaining why a block exists. The test of a template is whether a new engineer can render it for a new device without asking the author.",
      "syntax": "Good template design means one template per device role, shared blocks as includes, data in variables, and a rendered example committed beside the template.",
      "exampleCode": "templates/switch.j2\ntemplates/router.j2\ntemplates/includes/ntp.j2\nrendered/examples/access1.cfg",
      "exampleLanguage": "ansible",
      "mistake": "Putting business logic such as IP address calculations into variables files, where it cannot be seen or tested beside the template that uses it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Template Design Patterns, but it does not work correctly.",
       "buggyCode": "host_vars/access1.yml:\n  network: 192.0.2.0\n  broadcast: 192.0.2.255   # hand-computed, wrong for /30",
       "fixedCode": "switch.j2:\n  {{ mgmt_ip | ipaddr('network') }}   # computed in the template",
       "explanation": "Derived values belong in the template as filters, where the derivation is visible and testable; hand-computed values in data files drift from their inputs."
      },
      "exercise": {
       "title": "Practise Template Design Patterns",
       "type": "write-code",
       "instructions": "Write a playbook that stores the template layout (one template per role, shared blocks as includes), renders it as a file list, writes it to a file, and prints \"templates/switch.j2 (access)\" with the debug module. This exercise practises Template Design Patterns.",
       "starterCode": "---\n- name: Template Design Patterns\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Template Design Patterns\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the template layout data\n      ansible.builtin.set_fact:\n        templates:\n          - {file: switch.j2, role: access}\n          - {file: router.j2, role: core}\n          - {file: includes/ntp.j2, role: shared}\n    - name: Render the template layout\n      ansible.builtin.set_fact:\n        rendered: \"{% for t in templates %}templates/{{ t.file }} ({{ t.role }})\\n{% endfor %}rendered example: rendered/examples/access1.cfg\"\n    - name: Write the rendered template layout\n      ansible.builtin.copy:\n        dest: ./netauto-template-patterns.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered template layout\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the template layout\n      ansible.builtin.assert:\n        that:\n          - \"'templates/switch.j2 (access)' in rendered\"\n          - \"'templates/includes/ntp.j2 (shared)' in rendered\"\n        fail_msg: \"The rendered template layout is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Template design rendered: one template per role, shared blocks as includes\"\n",
       "solutionExplanation": "The playbook renders the template layout from data: one template per device role, shared blocks as includes, and a rendered example committed beside the template for reviewers.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "templates/switch.j2 (access)",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Good template design follows a few patterns: one template per device role, shared blocks as includes, data in variables rather than in the template, and a rendered example committed beside the template.",
        "approach": "Store each template file with its role as a dict, then loop over the list to render one layout line per template.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Templated Config Generation",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Templated Config Generation Capstone.",
   "starterCode": "---\n- name: Templated Config Generation capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Templated Config Generation capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-templated-config.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Templated Config Generation\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Templated Config Generation",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Templated Config Generation Capstone is the key idea here: Templated Config Generation brings the whole track together.",
    "approach": "Work through Templated Config Generation Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Templated Config Generation Capstone Project",
   "description": "A small end-to-end project that puts Templated Config Generation into practice.",
   "requirements": [
    "Use the core ideas of Templated Config Generation in a working playbook.",
    "Apply at least three of these skills: Jinja2 templates, Template loops, Template conditionals, Template filters.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Templated Config Generation correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-network-idempotency",
  "slug": "netauto-ansible-network-idempotency",
  "language": "ansible",
  "category": "devops",
  "title": "Idempotency for Networks",
  "description": "Make network playbooks safe to run twice: idempotent tasks, check and diff mode, handlers, and testing a second run before a change window.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Idempotency",
   "Check mode",
   "Diff mode",
   "Recap analysis",
   "Handlers",
   "Two-run testing",
   "Safe re-runs",
   "Failed-change recovery"
  ],
  "prerequisites": [
   "netauto-ansible-templated-config"
  ],
  "analogy": "Learning {topic} is like learning to paint a wall: the second coat should change nothing if the first one already covered it.",
  "modules": [
   {
    "id": "netauto-ansible-network-idempotency-m1",
    "title": "Idempotency for Networks Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-network-idempotency-m1-l1",
      "slug": "netauto-ansible-network-idempotency-m1-l1",
      "title": "What Idempotency Means for Networks",
      "concept": "Idempotency means running a playbook twice produces the same device state as running it once, with the second run reporting changed=0. For networks this matters more than for servers, because re-applying a routing change can flap sessions even when the end state is identical. Resource modules are idempotent by design, while raw command tasks usually are not, which is why network automation prefers modules. Idempotency means running a playbook twice produces the same device state as running it once, with the second run reporting changed=0.",
      "syntax": "ansible-playbook site.yml\nansible-playbook site.yml   # second run: changed=0",
      "exampleCode": "---\n- name: Idempotent file write\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the desired state\n      ansible.builtin.copy:\n        dest: ./netauto-idempotent.txt\n        content: \"vlan 10\\n name STAFF\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Using the command module to append a config line, so every run adds the line again and the device drifts further from the intended state.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate What Idempotency Means for Networks, but it does not work correctly.",
       "buggyCode": "- name: Add a VLAN\n  ansible.builtin.command: echo \"vlan 10\" >> config.txt",
       "fixedCode": "- name: Add a VLAN\n  ansible.builtin.copy:\n    dest: ./config.txt\n    content: \"vlan 10\\n name STAFF\"\n    mode: \"0644\"",
       "explanation": "Appending always changes the file; writing the exact desired content changes it once and reports ok on every later run."
      },
      "exercise": {
       "title": "Practise What Idempotency Means for Networks",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Idempotent write complete\" with the debug module. This exercise practises What Idempotency Means for Networks.",
       "starterCode": "---\n- name: What Idempotency Means for Networks\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: What Idempotency Means for Networks\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the desired state\n      ansible.builtin.copy:\n        dest: ./netauto-idempotent.txt\n        content: \"vlan 10\\n name STAFF\"\n        mode: \"0644\"\n    - name: Confirm the write\n      ansible.builtin.debug:\n        msg: \"Idempotent write complete\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Idempotent write complete\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Idempotent write complete",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What Idempotency Means for Networks is the key idea here: Idempotency means running a playbook twice produces the same device state as running it once, with the second run reporting changed=0.",
        "approach": "Work through What Idempotency Means for Networks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-idempotency-m1-l2",
      "slug": "netauto-ansible-network-idempotency-m1-l2",
      "title": "Changed Versus OK in the Recap",
      "concept": "The play recap reports ok for tasks that found the desired state already in place and changed for tasks that modified something. On a first run against a fresh device, many tasks report changed; on a second run, the same playbook should report changed=0 if it is idempotent. A task that reports changed on every run is a signal, not a disaster: it usually means the module cannot compare state, or the task is written non-idempotently. The play recap reports ok for tasks that found the desired state already in place and changed for tasks that modified something.",
      "syntax": "PLAY RECAP ***\nlocalhost : ok=4 changed=0 unreachable=0 failed=0",
      "exampleCode": "PLAY RECAP ***\nlocalhost : ok=2 changed=2 unreachable=0 failed=0   # first run\nlocalhost : ok=4 changed=0 unreachable=0 failed=0   # second run",
      "exampleLanguage": "ansible",
      "mistake": "Treating changed as an error and changed=0 as the only acceptable first-run result, when a first run is supposed to change things.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Changed Versus OK in the Recap, but it does not work correctly.",
       "buggyCode": "PLAY RECAP ***\nlocalhost : ok=0 changed=4 failed=0   # first run, engineer panics",
       "fixedCode": "PLAY RECAP ***\nlocalhost : ok=0 changed=4 failed=0   # first run: expected\nlocalhost : ok=4 changed=0 failed=0   # second run: idempotent",
       "explanation": "Changed on a first run is the playbook doing its job; changed on a second run is the problem, because it means the playbook cannot tell the state is already correct."
      },
      "exercise": {
       "title": "Practise Changed Versus OK in the Recap",
       "type": "write-code",
       "instructions": "Write a playbook that stores the recap of a first run and a second run, renders both recap lines, writes them to a file, and prints \"run 2: ok=4 changed=0 failed=0\" with the debug module. This exercise practises Changed Versus OK in the Recap.",
       "starterCode": "---\n- name: Changed Versus OK in the Recap\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Changed Versus OK in the Recap\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the play recap data\n      ansible.builtin.set_fact:\n        recap_runs:\n          - {run: 1, ok: 2, changed: 2}\n          - {run: 2, ok: 4, changed: 0}\n    - name: Render the play recap\n      ansible.builtin.set_fact:\n        rendered: \"{% for r in recap_runs %}run {{ r.run }}: ok={{ r.ok }} changed={{ r.changed }} failed=0\\n{% endfor %}\"\n    - name: Write the rendered play recap\n      ansible.builtin.copy:\n        dest: ./netauto-idempotency-recap.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered play recap\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the play recap\n      ansible.builtin.assert:\n        that:\n          - \"'run 1: ok=2 changed=2 failed=0' in rendered\"\n          - \"'run 2: ok=4 changed=0 failed=0' in rendered\"\n        fail_msg: \"The rendered play recap is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Second run is clean: changed=0 proves the playbook is idempotent\"\n",
       "solutionExplanation": "The playbook renders the two recap lines: the first run changes things, the second run reports changed=0 because the desired state is already in place, which is what idempotency looks like.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "run 2: ok=4 changed=0 failed=0",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "The play recap reports ok for tasks that found the desired state already in place and changed for tasks that modified something; a second run of an idempotent playbook reports changed=0.",
        "approach": "Store each run's ok and changed counts as a dict, then loop over the runs to render one recap line per run.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-idempotency-m1-l3",
      "slug": "netauto-ansible-network-idempotency-m1-l3",
      "title": "Check Mode for Network Changes",
      "concept": "Check mode, enabled with --check, runs a playbook without changing anything and reports what would change, which is the dry run every network change deserves. Most network modules support check mode, but some cannot predict their effect and report changed without detail, so check mode is a guide rather than a guarantee. Always pair check mode with --diff so the predicted changes are visible line by line. Check mode, enabled with --check, runs a playbook without changing anything and reports what would change.",
      "syntax": "ansible-playbook site.yml --check --diff",
      "exampleCode": "---\n- name: Dry run a config write\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the config\n      ansible.builtin.copy:\n        dest: ./netauto-checkmode.txt\n        content: \"hostname access1\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Running --check and treating its report as proof the change will work, when check mode cannot catch errors that only appear while applying the change.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Check Mode for Network Changes, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml --check   # clean, so straight to production",
       "fixedCode": "$ ansible-playbook site.yml --check --diff\n$ ansible-playbook site.yml --limit lab-switch1",
       "explanation": "Check mode predicts; a lab run proves. The dry run finds mistakes in the plan, and the limited run finds mistakes check mode cannot see."
      },
      "exercise": {
       "title": "Practise Check Mode for Network Changes",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Check mode preview complete\" with the debug module. This exercise practises Check Mode for Network Changes.",
       "starterCode": "---\n- name: Check Mode for Network Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Check Mode for Network Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the config\n      ansible.builtin.copy:\n        dest: ./netauto-checkmode.txt\n        content: \"hostname access1\"\n        mode: \"0644\"\n    - name: Confirm the preview\n      ansible.builtin.debug:\n        msg: \"Check mode preview complete\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Check mode preview complete\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Check mode preview complete",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Check Mode for Network Changes is the key idea here: Check mode, enabled with --check, runs a playbook without changing anything and reports what would change, which is the dry run every network change deserves.",
        "approach": "Work through Check Mode for Network Changes step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-idempotency-m1-l4",
      "slug": "netauto-ansible-network-idempotency-m1-l4",
      "title": "Diff Mode for Network Changes",
      "concept": "Diff mode, enabled with --diff, shows the exact before-and-after lines for every change a playbook makes, which turns a review from guesswork into reading. For network devices the diff is the running config versus the intended config, so reviewers see precisely which lines appear and disappear. Diff output should be attached to every change request, because it is the most honest description of what the change does. Diff mode, enabled with --diff, shows the exact before-and-after lines for every change a playbook makes.",
      "syntax": "ansible-playbook site.yml --diff\n--- before: running-config\n+++ after: intended-config",
      "exampleCode": "$ ansible-playbook site.yml --check --diff\n--- before\n+++ after\n@@ -1 +1,2 @@\n hostname core1\n+vlan 10",
      "exampleLanguage": "ansible",
      "mistake": "Approving a change from the task names alone, without reading the diff, so nobody notices the playbook also removes a VLAN.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Diff Mode for Network Changes, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # tasks named nicely, diff never read",
       "fixedCode": "$ ansible-playbook site.yml --check --diff   # diff shows the removed VLAN",
       "explanation": "Task names describe intent; the diff describes reality. A change is approved from the diff, not from the names."
      },
      "exercise": {
       "title": "Check your understanding: Diff Mode for Network Changes",
       "type": "multiple-choice",
       "instructions": "Which statement about Diff Mode for Network Changes is correct?",
       "starterCode": "",
       "solution": "Diff mode, enabled with --diff, shows the exact before-and-after lines for every change a playbook makes, which turns a review from guesswork into reading.",
       "solutionExplanation": "Diff mode, enabled with --diff, shows the exact before-and-after lines for every change a playbook makes, which turns a review from guesswork into reading. The other options are false: Diff Mode for Network Changes is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Diff mode, enabled with --diff, shows the exact before-and-after lines for every change a playbook makes, which turns a review from guesswork into reading.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Diff Mode for Network Changes from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Diff Mode for Network Changes can only be used once in a program",
        "Diff Mode for Network Changes requires a separate paid licence to use",
        "Diff Mode for Network Changes was removed from Ansible in the latest version",
        "Diff mode, enabled with --diff, shows the exact before-and-after lines for every change a playbook makes, which turns a review from guesswork into reading.",
        "Diff Mode for Network Changes only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-network-idempotency-m1-l5",
      "slug": "netauto-ansible-network-idempotency-m1-l5",
      "title": "Designing Idempotent Network Tasks",
      "concept": "Designing idempotent network tasks means choosing modules that compare state, giving each task the full desired state, and avoiding commands that append or toggle. A task that says create VLAN 10 named STAFF is idempotent; a task that says add a line to the config is not. When a setting has no idempotent module, the task should first check the current state and run only when the state differs, using a when condition. Designing idempotent network tasks means choosing modules that compare state, giving each task the full desired state, and avoiding commands that append or toggle.",
      "syntax": "- name: Create VLAN 10\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged",
      "exampleCode": "---\n- name: Idempotent VLAN plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    vlans:\n      - {id: 10, name: STAFF}\n      - {id: 20, name: VOICE}\n  tasks:\n    - name: Show the desired VLANs\n      ansible.builtin.debug:\n        msg: \"VLAN {{ item.id }} is {{ item.name }}\"\n      loop: \"{{ vlans }}\"",
      "exampleLanguage": "ansible",
      "mistake": "Writing a task that enables a feature with a command that toggles it, so the second run disables the feature the first run enabled.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Designing Idempotent Network Tasks, but it does not work correctly.",
       "buggyCode": "- name: Enable the feature\n  ansible.builtin.command: toggle-feature",
       "fixedCode": "- name: Enable the feature\n  cisco.ios.ios_config:\n    lines:\n      - feature ospf",
       "explanation": "A toggle is the opposite of idempotent: its effect depends on the current state. The fixed task declares the desired state, which is already true on the second run."
      },
      "exercise": {
       "title": "Practise Designing Idempotent Network Tasks",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"VLAN 10 is STAFF\" with the debug module. This exercise practises Designing Idempotent Network Tasks.",
       "starterCode": "---\n- name: Designing Idempotent Network Tasks\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Designing Idempotent Network Tasks\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the desired VLANs\n      ansible.builtin.set_fact:\n        vlans:\n          - {id: 10, name: STAFF}\n          - {id: 20, name: VOICE}\n    - name: Show the desired VLANs\n      ansible.builtin.debug:\n        msg: \"VLAN 10 is STAFF\"\n      loop: \"{{ vlans }}\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"VLAN 10 is STAFF\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "VLAN 10 is STAFF",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Designing Idempotent Network Tasks is the key idea here: Designing idempotent network tasks means choosing modules that compare state, giving each task the full desired state, and avoiding commands that append or toggle.",
        "approach": "Work through Designing Idempotent Network Tasks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-network-idempotency-m2",
    "title": "Idempotency for Networks in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-ansible-network-idempotency-m2-l1",
      "slug": "netauto-ansible-network-idempotency-m2-l1",
      "title": "When Modules Report Changed Wrongly",
      "concept": "Some modules report changed on every run even when nothing changed, usually because the device returns the config in a different format from the one Ansible sent. This false changed is a warning that the module cannot compare state reliably, and it hides real changes in the recap. The fix is usually to normalise the input, pin the module version, or report the issue upstream, and meanwhile to verify the result with a facts or diff check rather than trusting the recap. Some modules report changed on every run even when nothing changed, usually because the device returns the config in a different format from the one Ansible sent.",
      "syntax": "PLAY RECAP ***\nlocalhost : ok=0 changed=4 failed=0   # every run, nothing actually changes",
      "exampleCode": "PLAY RECAP ***\nswitch1 : ok=0 changed=1 failed=0   # run 1\nswitch1 : ok=0 changed=1 failed=0   # run 2, run 3, run 4 ...",
      "exampleLanguage": "ansible",
      "mistake": "Ignoring a permanently-changed task because it always reports changed, and missing the day it reports changed for a real reason.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate When Modules Report Changed Wrongly, but it does not work correctly.",
       "buggyCode": "- name: Configure the banner\n  cisco.ios.ios_banner:\n    banner: motd\n    text: \"Authorised use only\"\n    state: present   # reports changed every run, team stops looking",
       "fixedCode": "- name: Configure the banner\n  cisco.ios.ios_banner:\n    banner: motd\n    text: \"Authorised use only\"\n    state: present\n  register: banner_result\n- name: Verify the banner\n  cisco.ios.ios_command:\n    commands: show running-config | include banner\n  changed_when: false",
       "explanation": "A task that always reports changed is a broken signal; verify the real state with a read-only check instead of learning to ignore the recap."
      },
      "exercise": {
       "title": "Practise When Modules Report Changed Wrongly",
       "type": "write-code",
       "instructions": "Write a playbook that stores a task reporting changed on every run, renders the run history and a verdict, writes it to a file, and prints \"verdict: false changed - verify with facts or diff\" with the debug module. This exercise practises When Modules Report Changed Wrongly.",
       "starterCode": "---\n- name: When Modules Report Changed Wrongly\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: When Modules Report Changed Wrongly\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the changed report data\n      ansible.builtin.set_fact:\n        suspect_task: ios_vlans\n        suspect_runs:\n          - 1\n          - 2\n          - 3\n    - name: Render the changed report\n      ansible.builtin.set_fact:\n        rendered: \"task {{ suspect_task }}:\\n{% for r in suspect_runs %}run {{ r }}: changed=1\\n{% endfor %}verdict: false changed - verify with facts or diff\"\n    - name: Write the rendered changed report\n      ansible.builtin.copy:\n        dest: ./netauto-idempotency-false-changed.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered changed report\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the changed report\n      ansible.builtin.assert:\n        that:\n          - \"'run 3: changed=1' in rendered\"\n          - \"'verdict: false changed - verify with facts or diff' in rendered\"\n        fail_msg: \"The rendered changed report is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"False changed spotted: the recap cannot be trusted, verify with a facts or diff check\"\n",
       "solutionExplanation": "The playbook renders three runs that all report changed=1, which is the signature of a module that cannot compare state reliably, and concludes the result must be verified with a facts or diff check instead of trusting the recap.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "verdict: false changed - verify with facts or diff",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Some modules report changed on every run even when nothing changed, usually because the device returns the config in a different format from the one Ansible sent.",
        "approach": "Store the suspect task name and its run numbers, then loop over the runs to render the repeated changed=1 lines and finish with the verdict line.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-idempotency-m2-l2",
      "slug": "netauto-ansible-network-idempotency-m2-l2",
      "title": "Testing Idempotency with Two Runs",
      "concept": "The idempotency test is simple: run the playbook twice against the same lab device and confirm the second run reports changed=0. Any task that still reports changed gets investigated before the playbook is approved. This two-run test belongs in CI, so every pull request proves its playbook is idempotent before a human reviews it. The idempotency test is simple: run the playbook twice against the same lab device and confirm the second run reports changed=0.",
      "syntax": "ansible-playbook site.yml --limit lab-switch1\nansible-playbook site.yml --limit lab-switch1   # changed=0",
      "exampleCode": "---\n- name: Two-run test plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the desired state\n      ansible.builtin.copy:\n        dest: ./netauto-two-runs.txt\n        content: \"vlan 10\\n name STAFF\"\n        mode: \"0644\"\n    - name: Confirm the first run\n      ansible.builtin.debug:\n        msg: \"First run wrote the file, second run will report ok\"",
      "exampleLanguage": "ansible",
      "mistake": "Testing idempotency against production, so the test itself becomes an unplanned change on live devices.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Testing Idempotency with Two Runs, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml\n$ ansible-playbook site.yml   # second run on production",
       "fixedCode": "$ ansible-playbook site.yml --limit lab-switch1\n$ ansible-playbook site.yml --limit lab-switch1   # changed=0 in the lab",
       "explanation": "The two-run test proves idempotency only in a lab; running it against production turns a test into two live changes."
      },
      "exercise": {
       "title": "Practise Testing Idempotency with Two Runs",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"First run wrote the file, second run will report ok\" with the debug module. This exercise practises Testing Idempotency with Two Runs.",
       "starterCode": "---\n- name: Testing Idempotency with Two Runs\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Testing Idempotency with Two Runs\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the desired state\n      ansible.builtin.copy:\n        dest: ./netauto-two-runs.txt\n        content: \"vlan 10\\n name STAFF\"\n        mode: \"0644\"\n    - name: Confirm the first run\n      ansible.builtin.debug:\n        msg: \"First run wrote the file, second run will report ok\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"First run wrote the file, second run will report ok\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "First run wrote the file, second run will report ok",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing Idempotency with Two Runs is the key idea here: The idempotency test is simple: run the playbook twice against the same lab device and confirm the second run reports changed=0.",
        "approach": "Work through Testing Idempotency with Two Runs step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-idempotency-m2-l3",
      "slug": "netauto-ansible-network-idempotency-m2-l3",
      "title": "Handlers for Network Changes",
      "concept": "Handlers are tasks that run only when notified by a changed task, and they are how network playbooks restart a service or save a config after a change. A common handler writes the running config to startup with copy running-config startup-config, but only when the config actually changed. Handlers run once at the end of a play, even if several tasks notify them, which keeps the save step from running five times. Handlers are tasks that run only when notified by a changed task, and they run once at the end of a play even if several tasks notify them.",
      "syntax": "handlers:\n  - name: Save the config\n    cisco.ios.ios_config:\n      save_when: changed",
      "exampleCode": "- name: Create a VLAN\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged\n  notify: Save the config",
      "exampleLanguage": "ansible",
      "mistake": "Saving the config in every task, so a playbook that changes ten things writes the startup config ten times.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Handlers for Network Changes, but it does not work correctly.",
       "buggyCode": "- name: Create VLAN 10\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged\n- name: Save the config\n  cisco.ios.ios_config:\n    save_when: always",
       "fixedCode": "- name: Create VLAN 10\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged\n  notify: Save the config\n\nhandlers:\n  - name: Save the config\n    cisco.ios.ios_config:\n      save_when: changed",
       "explanation": "Saving after every task is wasteful and slow; a handler notified by changed tasks saves once, at the end, and only when something actually changed."
      },
      "exercise": {
       "title": "Check your understanding: Handlers for Network Changes",
       "type": "multiple-choice",
       "instructions": "Which statement about Handlers for Network Changes is correct?",
       "starterCode": "",
       "solution": "Handlers are tasks that run only when notified by a changed task, and they are how network playbooks restart a service or save a config after a change.",
       "solutionExplanation": "Handlers are tasks that run only when notified by a changed task, and they are how network playbooks restart a service or save a config after a change. The other options are false: Handlers for Network Changes is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Handlers are tasks that run only when notified by a changed task, and they are how network playbooks restart a service or save a config after a change.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Handlers for Network Changes from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Handlers for Network Changes can only be used once in a program",
        "Handlers for Network Changes requires a separate paid licence to use",
        "Handlers are tasks that run only when notified by a changed task, and they are how network playbooks restart a service or save a config after a change.",
        "Handlers for Network Changes was removed from Ansible in the latest version",
        "Handlers for Network Changes only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-network-idempotency-m2-l4",
      "slug": "netauto-ansible-network-idempotency-m2-l4",
      "title": "Safe Re-runs After a Failure",
      "concept": "A playbook that fails halfway leaves some devices changed and others untouched, and re-running it must be safe: idempotent tasks skip the devices that are already correct and finish the rest. The recap shows which hosts failed, and --limit can re-run just those hosts once the cause is fixed. Never re-run a failed network playbook blindly; read the failure first, because the second run applies the same change that failed the first time. A playbook that fails halfway leaves some devices changed and others untouched, and re-running it must be safe because idempotent tasks skip devices that are already correct.",
      "syntax": "ansible-playbook site.yml --limit @/tmp/retry-file\nansible-playbook site.yml --limit failed-host",
      "exampleCode": "---\n- name: Safe re-run plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the desired state\n      ansible.builtin.copy:\n        dest: ./netauto-rerun.txt\n        content: \"vlan 10\\n name STAFF\"\n        mode: \"0644\"\n    - name: Confirm the re-run\n      ansible.builtin.debug:\n        msg: \"Safe re-run complete\"",
      "exampleLanguage": "ansible",
      "mistake": "Re-running a failed playbook immediately without reading the error, so the same failure hits the same devices again.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Safe Re-runs After a Failure, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # failed on core2\n$ ansible-playbook site.yml   # run again, same failure",
       "fixedCode": "$ ansible-playbook site.yml   # failed on core2\n$ ansible-playbook site.yml --limit core2 --check --diff",
       "explanation": "A failure is information: read it, reproduce it with --check on the failed host, fix the cause, and only then re-run."
      },
      "exercise": {
       "title": "Practise Safe Re-runs After a Failure",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Safe re-run complete\" with the debug module. This exercise practises Safe Re-runs After a Failure.",
       "starterCode": "---\n- name: Safe Re-runs After a Failure\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Safe Re-runs After a Failure\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the desired state\n      ansible.builtin.copy:\n        dest: ./netauto-rerun.txt\n        content: \"vlan 10\\n name STAFF\"\n        mode: \"0644\"\n    - name: Confirm the re-run\n      ansible.builtin.debug:\n        msg: \"Safe re-run complete\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Safe re-run complete\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Safe re-run complete",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Safe Re-runs After a Failure is the key idea here: A playbook that fails halfway leaves some devices changed and others untouched, and re-running it must be safe: idempotent tasks skip the devices that are already correct and finish the rest.",
        "approach": "Work through Safe Re-runs After a Failure step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-idempotency-m2-l5",
      "slug": "netauto-ansible-network-idempotency-m2-l5",
      "title": "Idempotency Review Checklist",
      "concept": "An idempotency review checks that every task uses a state-comparing module, that no task appends or toggles, that the playbook passes a two-run test in the lab, and that handlers save the config only on change. The checklist also asks whether a re-run after a failure is safe and whether the recap will be clean. A playbook that passes the checklist can be run by anyone on the team with confidence.",
      "syntax": "An idempotency review checks that every task uses a state-comparing module, that no task appends or toggles, and that the playbook passes a two-run test in the lab.",
      "exampleCode": "1. State-comparing modules only\n2. No appends or toggles\n3. Two-run test: changed=0\n4. Handlers save on change only",
      "exampleLanguage": "ansible",
      "mistake": "Reviewing a playbook by reading the task names and skipping the two-run test, because the tasks look idempotent.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Idempotency Review Checklist, but it does not work correctly.",
       "buggyCode": "- name: Configure VLANs\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged   # looks fine, never tested",
       "fixedCode": "$ ansible-playbook site.yml --limit lab-switch1\n$ ansible-playbook site.yml --limit lab-switch1   # changed=0 proves it",
       "explanation": "Looking idempotent is not being idempotent; only the two-run test proves the second run changes nothing."
      },
      "exercise": {
       "title": "Practise Idempotency Review Checklist",
       "type": "write-code",
       "instructions": "Write a playbook that stores the idempotency review checklist items, renders each one with its pass or fail result, writes it to a file, and prints \"3. [PASS] two-run test changed=0\" with the debug module. This exercise practises Idempotency Review Checklist.",
       "starterCode": "---\n- name: Idempotency Review Checklist\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Idempotency Review Checklist\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the review checklist data\n      ansible.builtin.set_fact:\n        idempotency_checks:\n          - {item: \"state-comparing modules only\", pass: true}\n          - {item: \"no appends or toggles\", pass: true}\n          - {item: \"two-run test changed=0\", pass: true}\n          - {item: \"handlers save on change only\", pass: true}\n    - name: Render the review checklist\n      ansible.builtin.set_fact:\n        rendered: \"{% for c in idempotency_checks %}{{ loop.index }}. [{{ 'PASS' if c.pass else 'FAIL' }}] {{ c.item }}\\n{% endfor %}\"\n    - name: Write the rendered review checklist\n      ansible.builtin.copy:\n        dest: ./netauto-idempotency-checklist.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered review checklist\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the review checklist\n      ansible.builtin.assert:\n        that:\n          - \"'1. [PASS] state-comparing modules only' in rendered\"\n          - \"'3. [PASS] two-run test changed=0' in rendered\"\n        fail_msg: \"The rendered review checklist is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Checklist passed: anyone on the team can run this playbook with confidence\"\n",
       "solutionExplanation": "The playbook renders the checklist from data, checking state-comparing modules, no appends or toggles, a clean two-run test, and handlers that save only on change.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "3. [PASS] two-run test changed=0",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "An idempotency review checks that every task uses a state-comparing module, that no task appends or toggles, that the playbook passes a two-run test in the lab, and that handlers save the config only on change.",
        "approach": "Store each checklist item with a pass flag, then loop over them using loop.index and an inline if to render the PASS or FAIL mark.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Idempotency for Networks",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Idempotency for Networks Capstone.",
   "starterCode": "---\n- name: Idempotency for Networks capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Idempotency for Networks capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-network-idempotency.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Idempotency for Networks\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Idempotency for Networks",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Idempotency for Networks Capstone is the key idea here: Idempotency for Networks brings the whole track together.",
    "approach": "Work through Idempotency for Networks Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Idempotency for Networks Capstone Project",
   "description": "A small end-to-end project that puts Idempotency for Networks into practice.",
   "requirements": [
    "Use the core ideas of Idempotency for Networks in a working playbook.",
    "Apply at least three of these skills: Idempotency, Check mode, Diff mode, Recap analysis.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Idempotency for Networks correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-network-roles-collections",
  "slug": "netauto-ansible-network-roles-collections",
  "language": "ansible",
  "category": "devops",
  "title": "Network Roles and Collections",
  "description": "Package network automation as reusable roles and collections: role structure, Galaxy collections, requirements files, and testing roles locally.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Ansible roles",
   "Role structure",
   "Ansible collections",
   "Galaxy",
   "requirements.yml",
   "Role variables",
   "Role testing",
   "Collection versioning"
  ],
  "prerequisites": [
   "netauto-ansible-network-idempotency"
  ],
  "analogy": "Learning {topic} is like learning to pack a toolkit: each tool has its own compartment, and you grab the whole kit instead of hunting for loose tools.",
  "modules": [
   {
    "id": "netauto-ansible-network-roles-collections-m1",
    "title": "Network Roles and Collections Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-network-roles-collections-m1-l1",
      "slug": "netauto-ansible-network-roles-collections-m1-l1",
      "title": "Roles for Network Playbooks",
      "concept": "An Ansible role is a reusable package of tasks, variables, templates, and handlers organised in a standard directory layout, so a VLAN role can be used by many playbooks. Roles turn a playbook from a long list of tasks into a short list of role names with variables. Network teams build roles per function, such as a base role for NTP and DNS, a VLAN role, and a routing role, and compose them into playbooks. An Ansible role is a reusable package of tasks, variables, templates, and handlers in a standard directory layout, so one role can be used by many playbooks.",
      "syntax": "- hosts: access\n  roles:\n    - network_base\n    - vlans",
      "exampleCode": "---\n- name: List the roles\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    network_roles:\n      - network_base\n      - vlans\n      - routing\n  tasks:\n    - name: Show the roles\n      ansible.builtin.debug:\n        msg: \"Roles: network_base, vlans, routing\"",
      "exampleLanguage": "ansible",
      "mistake": "Copying the same VLAN tasks into every playbook instead of a role, so a fix to the VLAN logic has to be pasted into ten files.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Roles for Network Playbooks, but it does not work correctly.",
       "buggyCode": "- name: Create VLAN 10\n  cisco.ios.ios_vlans:\n    config:\n      - name: STAFF\n        vlan_id: 10\n    state: merged   # pasted into every playbook",
       "fixedCode": "- hosts: access\n  roles:\n    - role: vlans\n      vars:\n        vlans:\n          - {id: 10, name: STAFF}",
       "explanation": "A role is the unit of reuse: write the VLAN logic once in a role and let every playbook include it with its own variables."
      },
      "exercise": {
       "title": "Practise Roles for Network Playbooks",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Roles: network_base, vlans, routing\" with the debug module. This exercise practises Roles for Network Playbooks.",
       "starterCode": "---\n- name: Roles for Network Playbooks\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Roles for Network Playbooks\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the role list\n      ansible.builtin.set_fact:\n        network_roles: [network_base, vlans, routing]\n    - name: Show the roles\n      ansible.builtin.debug:\n        msg: \"Roles: network_base, vlans, routing\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Roles: network_base, vlans, routing\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Roles: network_base, vlans, routing",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Roles for Network Playbooks is the key idea here: An Ansible role is a reusable package of tasks, variables, templates, and handlers organised in a standard directory layout, so a VLAN role can be used by many playbooks.",
        "approach": "Work through Roles for Network Playbooks step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-roles-collections-m1-l2",
      "slug": "netauto-ansible-network-roles-collections-m1-l2",
      "title": "Role Structure and Defaults",
      "concept": "A role has a fixed directory structure: tasks/main.yml holds the tasks, defaults/main.yml holds low-precedence variables, vars/main.yml holds high-precedence variables, templates holds Jinja files, and handlers/main.yml holds handlers. Defaults are meant to be overridden by the playbook, while vars are meant to be fixed inside the role. Knowing which directory a variable lives in tells you how hard it is to override. A role has a fixed directory structure: tasks, defaults, vars, templates, and handlers, and defaults are easy to override while vars are not.",
      "syntax": "roles/vlans/\n  tasks/main.yml\n  defaults/main.yml\n  vars/main.yml\n  templates/\n  handlers/main.yml",
      "exampleCode": "roles/vlans/\n  tasks/main.yml\n  defaults/main.yml\n    vlans:\n      - {id: 10, name: STAFF}",
      "exampleLanguage": "ansible",
      "mistake": "Putting values the playbook must override in vars/main.yml, where they beat almost everything and cannot be changed from the playbook.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Role Structure and Defaults, but it does not work correctly.",
       "buggyCode": "roles/vlans/vars/main.yml:\n  vlans:\n    - {id: 10, name: STAFF}   # stuck here",
       "fixedCode": "roles/vlans/defaults/main.yml:\n  vlans:\n    - {id: 10, name: STAFF}   # playbooks can override this",
       "explanation": "Defaults lose to playbook variables, so they are the right home for values a playbook may change; vars win over playbooks, so they are only for values the role owns."
      },
      "exercise": {
       "title": "Practise Role Structure and Defaults",
       "type": "write-code",
       "instructions": "Write a playbook that stores the role directory structure and what each directory holds, renders it as a file list, writes it to a file, and prints \"roles/vlans/defaults/main.yml: low-precedence variables\" with the debug module. This exercise practises Role Structure and Defaults.",
       "starterCode": "---\n- name: Role Structure and Defaults\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Role Structure and Defaults\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the role structure data\n      ansible.builtin.set_fact:\n        role_dirs:\n          - {dir: tasks/main.yml, holds: tasks}\n          - {dir: defaults/main.yml, holds: \"low-precedence variables\"}\n          - {dir: vars/main.yml, holds: \"high-precedence variables\"}\n          - {dir: templates, holds: \"Jinja files\"}\n          - {dir: handlers/main.yml, holds: handlers}\n    - name: Render the role structure\n      ansible.builtin.set_fact:\n        rendered: \"{% for d in role_dirs %}roles/vlans/{{ d.dir }}: {{ d.holds }}\\n{% endfor %}\"\n    - name: Write the rendered role structure\n      ansible.builtin.copy:\n        dest: ./netauto-roles-structure.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered role structure\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the role structure\n      ansible.builtin.assert:\n        that:\n          - \"'roles/vlans/tasks/main.yml: tasks' in rendered\"\n          - \"'roles/vlans/defaults/main.yml: low-precedence variables' in rendered\"\n        fail_msg: \"The rendered role structure is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Role structure rendered: defaults are easy to override, vars are not\"\n",
       "solutionExplanation": "The playbook renders the role layout from data: tasks, defaults with low-precedence variables, vars with high-precedence variables, templates, and handlers.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "roles/vlans/defaults/main.yml: low-precedence variables",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A role has a fixed directory structure: tasks/main.yml holds the tasks, defaults/main.yml holds low-precedence variables, vars/main.yml holds high-precedence variables, templates holds Jinja files, and handlers/main.yml holds handlers.",
        "approach": "Store each directory with what it holds as a dict, then loop over the list to render one layout line per directory.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-roles-collections-m1-l3",
      "slug": "netauto-ansible-network-roles-collections-m1-l3",
      "title": "Using a Network Collection",
      "concept": "An Ansible collection is a package of modules, roles, and plugins from one vendor or community, such as cisco.ios or arista.eos, distributed through Galaxy. A playbook uses a collection's modules by their full name, like cisco.ios.ios_vlans, and the collections keyword can shorten those names inside a play. Collections are installed with ansible-galaxy collection install and pinned to versions in requirements.yml. An Ansible collection is a package of modules, roles, and plugins from one vendor or community, such as cisco.ios, distributed through Galaxy.",
      "syntax": "ansible-galaxy collection install cisco.ios\ncollections:\n  - cisco.ios",
      "exampleCode": "---\n- name: Name the collection\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    collection_name: cisco.ios\n    module_name: cisco.ios.ios_vlans\n  tasks:\n    - name: Show the collection\n      ansible.builtin.debug:\n        msg: \"Collection cisco.ios provides ios_vlans\"",
      "exampleLanguage": "ansible",
      "mistake": "Using a collection module without installing the collection, then wondering why Ansible reports that the module does not exist.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Using a Network Collection, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # ERROR: could not find module cisco.ios.ios_vlans",
       "fixedCode": "$ ansible-galaxy collection install cisco.ios\n$ ansible-playbook site.yml",
       "explanation": "Collection modules are not built into Ansible; they arrive with the collection, so the collection must be installed before the playbook can use it. Installing collections needs a lab or control node with network access to Galaxy."
      },
      "exercise": {
       "title": "Practise Using a Network Collection",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Collection cisco.ios provides ios_vlans\" with the debug module. This exercise practises Using a Network Collection.",
       "starterCode": "---\n- name: Using a Network Collection\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Using a Network Collection\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the collection facts\n      ansible.builtin.set_fact:\n        collection_name: cisco.ios\n        module_name: cisco.ios.ios_vlans\n    - name: Show the collection\n      ansible.builtin.debug:\n        msg: \"Collection cisco.ios provides ios_vlans\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Collection cisco.ios provides ios_vlans\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Collection cisco.ios provides ios_vlans",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Using a Network Collection is the key idea here: An Ansible collection is a package of modules, roles, and plugins from one vendor or community, such as cisco.",
        "approach": "Work through Using a Network Collection step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-roles-collections-m1-l4",
      "slug": "netauto-ansible-network-roles-collections-m1-l4",
      "title": "Ansible Galaxy Collections",
      "concept": "Ansible Galaxy is the public hub where collections are published, with a page per collection showing its modules, roles, version history, and documentation. Teams browse Galaxy to find the official collection for their vendor, check that it is maintained, and read its changelog before adopting it. Private collections can be published to a private Galaxy or Automation Hub for internal use. Ansible Galaxy is the public hub where collections are published, with a page per collection showing its modules, roles, version history, and documentation.",
      "syntax": "galaxy.ansible.com/ui/repo/published/cisco/ios/",
      "exampleCode": "ansible-galaxy collection install cisco.ios==6.0.0",
      "exampleLanguage": "ansible",
      "mistake": "Installing the latest collection version without checking the changelog, and discovering the new version dropped support for the team's device OS version.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Ansible Galaxy Collections, but it does not work correctly.",
       "buggyCode": "$ ansible-galaxy collection install cisco.ios   # latest, unreviewed",
       "fixedCode": "$ ansible-galaxy collection install cisco.ios==6.0.0   # pinned after reading the changelog",
       "explanation": "A collection version is a dependency like any other: read its changelog, pin the version that supports your devices, and upgrade deliberately."
      },
      "exercise": {
       "title": "Check your understanding: Ansible Galaxy Collections",
       "type": "multiple-choice",
       "instructions": "Which statement about Ansible Galaxy Collections is correct?",
       "starterCode": "",
       "solution": "Ansible Galaxy is the public hub where collections are published, with a page per collection showing its modules, roles, version history, and documentation.",
       "solutionExplanation": "Ansible Galaxy is the public hub where collections are published, with a page per collection showing its modules, roles, version history, and documentation. The other options are false: Ansible Galaxy Collections is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Ansible Galaxy is the public hub where collections are published, with a page per collection showing its modules, roles, version history, and documentation.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Ansible Galaxy Collections from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Ansible Galaxy Collections can only be used once in a program",
        "Ansible Galaxy Collections requires a separate paid licence to use",
        "Ansible Galaxy Collections was removed from Ansible in the latest version",
        "Ansible Galaxy is the public hub where collections are published, with a page per collection showing its modules, roles, version history, and documentation.",
        "Ansible Galaxy Collections only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-network-roles-collections-m1-l5",
      "slug": "netauto-ansible-network-roles-collections-m1-l5",
      "title": "Requirements Files for Collections",
      "concept": "A requirements.yml file lists the collections a project needs with their versions, so a fresh control node can install them all with one command. It also lists roles from Galaxy or Git, keeping every dependency in one reviewed file. Committing requirements.yml to the project repository means any engineer can reproduce the exact environment the playbooks were tested against. A requirements.yml file lists the collections a project needs with their versions, so a fresh control node can install them all with one command.",
      "syntax": "collections:\n  - name: cisco.ios\n    version: 6.0.0\n  - name: arista.eos\n    version: 5.0.0",
      "exampleCode": "---\n- name: List the requirements\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    required_collections:\n      - {name: cisco.ios, version: 6.0.0}\n      - {name: arista.eos, version: 5.0.0}\n  tasks:\n    - name: Show the requirements\n      ansible.builtin.debug:\n        msg: \"Required: cisco.ios 6.0.0 and arista.eos 5.0.0\"",
      "exampleLanguage": "ansible",
      "mistake": "Installing collections by hand on each control node with no requirements file, so two engineers run the same playbook against different module versions.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Requirements Files for Collections, but it does not work correctly.",
       "buggyCode": "$ ansible-galaxy collection install cisco.ios   # engineer A: 6.0.0\n$ ansible-galaxy collection install cisco.ios   # engineer B: 7.1.0",
       "fixedCode": "collections:\n  - name: cisco.ios\n    version: 6.0.0\n\n$ ansible-galaxy collection install -r requirements.yml",
       "explanation": "A pinned requirements file makes every control node identical; hand installs drift apart silently and produce different results from the same playbook."
      },
      "exercise": {
       "title": "Practise Requirements Files for Collections",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Required: cisco.ios 6.0.0 and arista.eos 5.0.0\" with the debug module. This exercise practises Requirements Files for Collections.",
       "starterCode": "---\n- name: Requirements Files for Collections\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Requirements Files for Collections\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the required collections\n      ansible.builtin.set_fact:\n        required_collections:\n          - {name: cisco.ios, version: 6.0.0}\n          - {name: arista.eos, version: 5.0.0}\n    - name: Show the requirements\n      ansible.builtin.debug:\n        msg: \"Required: cisco.ios 6.0.0 and arista.eos 5.0.0\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Required: cisco.ios 6.0.0 and arista.eos 5.0.0\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Required: cisco.ios 6.0.0 and arista.eos 5.0.0",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Requirements Files for Collections is the key idea here: A requirements.",
        "approach": "Work through Requirements Files for Collections step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-network-roles-collections-m2",
    "title": "Network Roles and Collections in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-ansible-network-roles-collections-m2-l1",
      "slug": "netauto-ansible-network-roles-collections-m2-l1",
      "title": "Writing Your Own Network Role",
      "concept": "Writing your own network role starts with ansible-galaxy role init, which creates the standard directories, and then filling tasks/main.yml with the role's work. A good network role takes its inputs as variables with documented defaults, does one job well, and never hard-codes device names. The role is finished when a playbook can use it for a new site by passing different variables and nothing else. Writing your own network role starts with ansible-galaxy role init, which creates the standard directories, and the role takes its inputs as documented variables.",
      "syntax": "ansible-galaxy role init roles/vlans\nroles/vlans/tasks/main.yml",
      "exampleCode": "$ ansible-galaxy role init roles/vlans\n$ ls roles/vlans\nREADME.md defaults handlers meta tasks templates vars",
      "exampleLanguage": "ansible",
      "mistake": "Writing a role that only works for one device because the hostname and VLANs are hard-coded in its tasks.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Writing Your Own Network Role, but it does not work correctly.",
       "buggyCode": "roles/vlans/tasks/main.yml:\n  - name: Create VLAN 10 on access1\n    cisco.ios.ios_vlans:\n      config:\n        - name: STAFF\n          vlan_id: 10",
       "fixedCode": "roles/vlans/tasks/main.yml:\n  - name: Create the VLANs\n    cisco.ios.ios_vlans:\n      config: \"{{ vlans }}\"\n    state: merged",
       "explanation": "A role that hard-codes its inputs is a playbook in disguise; a real role reads its inputs from variables so any playbook can reuse it."
      },
      "exercise": {
       "title": "Practise Writing Your Own Network Role",
       "type": "write-code",
       "instructions": "Write a playbook that stores a network role name and its default VLAN inputs, renders the role defaults file, writes it to a file, and prints \"id: 10, name: STAFF\" with the debug module. This exercise practises Writing Your Own Network Role.",
       "starterCode": "---\n- name: Writing Your Own Network Role\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Writing Your Own Network Role\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the role defaults data\n      ansible.builtin.set_fact:\n        role_name: vlans\n        role_vlans:\n          - {id: 10, name: STAFF}\n          - {id: 20, name: VOICE}\n    - name: Render the role defaults\n      ansible.builtin.set_fact:\n        rendered: \"role: {{ role_name }}\\ndefaults:\\n{% for v in role_vlans %}  - id: {{ v.id }}, name: {{ v.name }}\\n{% endfor %}\"\n    - name: Write the rendered role defaults\n      ansible.builtin.copy:\n        dest: ./netauto-roles-defaults.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered role defaults\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the role defaults\n      ansible.builtin.assert:\n        that:\n          - \"'role: vlans' in rendered\"\n          - \"'id: 10, name: STAFF' in rendered\"\n        fail_msg: \"The rendered role defaults is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Role finished: a new site only needs different variables\"\n",
       "solutionExplanation": "The playbook renders the role's documented defaults from data, so a playbook can use the role for a new site by passing different variables and nothing else.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "id: 10, name: STAFF",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Writing your own network role starts with ansible-galaxy role init, and a good network role takes its inputs as variables with documented defaults and does one job well.",
        "approach": "Store the role name and its default VLAN list as variables, then loop over the VLANs to render the defaults file content.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-network-roles-collections-m2-l2",
      "slug": "netauto-ansible-network-roles-collections-m2-l2",
      "title": "Role Variables and Defaults",
      "concept": "Role variables come in two flavours: defaults in defaults/main.yml, which playbooks can override easily, and vars in vars/main.yml, which almost always win. A role should put its configurable values in defaults with sensible examples, and reserve vars for internal constants the role computes. Documenting each default in the role README is what makes the role usable by someone who did not write it. Role variables come in two flavours: defaults in defaults/main.yml, which playbooks can override easily, and vars in vars/main.yml, which almost always win.",
      "syntax": "roles/vlans/defaults/main.yml:\n  vlans:\n    - {id: 10, name: STAFF}",
      "exampleCode": "---\n- name: Show role defaults\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    role_defaults:\n      vlans:\n        - {id: 10, name: STAFF}\n  tasks:\n    - name: Show the defaults\n      ansible.builtin.debug:\n        msg: \"Default VLAN is 10 STAFF\"",
      "exampleLanguage": "ansible",
      "mistake": "Documenting a role variable only in the tasks file, so users have to read the implementation to learn what the role accepts.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Role Variables and Defaults, but it does not work correctly.",
       "buggyCode": "# roles/vlans/tasks/main.yml\n- name: Create VLANs\n  cisco.ios.ios_vlans:\n    config: \"{{ vlans }}\"   # where is vlans defined?",
       "fixedCode": "# roles/vlans/defaults/main.yml\nvlans:\n  - {id: 10, name: STAFF}\n# roles/vlans/README.md documents each variable",
       "explanation": "Defaults are the role's public interface and the README is its manual; a variable that only exists inside a task is a secret, not an interface."
      },
      "exercise": {
       "title": "Practise Role Variables and Defaults",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Default VLAN is 10 STAFF\" with the debug module. This exercise practises Role Variables and Defaults.",
       "starterCode": "---\n- name: Role Variables and Defaults\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Role Variables and Defaults\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the role defaults\n      ansible.builtin.set_fact:\n        role_defaults:\n          vlans:\n            - {id: 10, name: STAFF}\n    - name: Show the defaults\n      ansible.builtin.debug:\n        msg: \"Default VLAN is 10 STAFF\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Default VLAN is 10 STAFF\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Default VLAN is 10 STAFF",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Role Variables and Defaults is the key idea here: Role variables come in two flavours: defaults in defaults/main.",
        "approach": "Work through Role Variables and Defaults step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-roles-collections-m2-l3",
      "slug": "netauto-ansible-network-roles-collections-m2-l3",
      "title": "Testing a Network Role Locally",
      "concept": "A network role is tested locally by running its playbook against localhost with the device tasks replaced by rendering and assertion, and then in a lab with Molecule or a Containerlab topology. Molecule creates a test instance, runs the role, and verifies the result, which catches regressions before they reach production. The cheapest test is a render-and-assert playbook that proves the role's templates and variables produce the expected config text. A network role is tested locally by running its playbook against localhost with rendering and assertion, and then in a lab with Molecule or a Containerlab topology.",
      "syntax": "molecule test\nansible-playbook site.yml --limit localhost --check",
      "exampleCode": "molecule init role myrole\nmolecule test   # create, converge, verify, destroy",
      "exampleLanguage": "ansible",
      "mistake": "Testing a role for the first time against production devices, because no lab or local test was ever written for it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Testing a Network Role Locally, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # first run is on production",
       "fixedCode": "$ molecule test   # lab first, production only after green",
       "explanation": "Roles earn production trust in the lab: Molecule or a Containerlab run proves the role works, and production is never the test environment."
      },
      "exercise": {
       "title": "Check your understanding: Testing a Network Role Locally",
       "type": "multiple-choice",
       "instructions": "Which statement about Testing a Network Role Locally is correct?",
       "starterCode": "",
       "solution": "A network role is tested locally by running its playbook against localhost with the device tasks replaced by rendering and assertion, and then in a lab with Molecule or a Containerlab topology.",
       "solutionExplanation": "A network role is tested locally by running its playbook against localhost with the device tasks replaced by rendering and assertion, and then in a lab with Molecule or a Containerlab topology. The other options are false: Testing a Network Role Locally is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A network role is tested locally by running its playbook against localhost with the device tasks replaced by rendering and assertion, and then in a lab with Molecule or a Containerlab topology.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Testing a Network Role Locally from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Testing a Network Role Locally can only be used once in a program",
        "Testing a Network Role Locally requires a separate paid licence to use",
        "A network role is tested locally by running its playbook against localhost with the device tasks replaced by rendering and assertion, and then in a lab with Molecule or a Containerlab topology.",
        "Testing a Network Role Locally was removed from Ansible in the latest version",
        "Testing a Network Role Locally only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-network-roles-collections-m2-l4",
      "slug": "netauto-ansible-network-roles-collections-m2-l4",
      "title": "Sharing Roles with Galaxy",
      "concept": "Sharing a role with Galaxy means publishing it with ansible-galaxy role import from a Git repository, after the role has a README, a meta/main.yml with its author and platforms, and a version tag. Other teams then install it with ansible-galaxy role install and pin it in requirements.yml. A shared role is a promise: its interface stays stable, and breaking changes get a new major version. Sharing a role with Galaxy means publishing it with ansible-galaxy role import from a Git repository, after the role has a README, a meta/main.yml, and a version tag.",
      "syntax": "ansible-galaxy role import myorg my-role\nansible-galaxy role install myorg.my-role",
      "exampleCode": "---\n- name: Name the shared role\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    shared_role: myorg.vlans\n    role_version: \"1.2.0\"\n  tasks:\n    - name: Show the shared role\n      ansible.builtin.debug:\n        msg: \"Shared role myorg.vlans version 1.2.0\"",
      "exampleLanguage": "ansible",
      "mistake": "Publishing a role with no README and no version, so nobody can tell what it does or whether installing it will change their network.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Sharing Roles with Galaxy, but it does not work correctly.",
       "buggyCode": "$ ansible-galaxy role import myorg vlans   # no README, no tag",
       "fixedCode": "$ git tag 1.2.0\n$ ansible-galaxy role import myorg vlans   # README + meta + tag",
       "explanation": "A published role needs a README that explains its variables, a meta file that names its platforms, and a version tag so users can pin it."
      },
      "exercise": {
       "title": "Practise Sharing Roles with Galaxy",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Shared role myorg.vlans version 1.2.0\" with the debug module. This exercise practises Sharing Roles with Galaxy.",
       "starterCode": "---\n- name: Sharing Roles with Galaxy\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Sharing Roles with Galaxy\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the shared role facts\n      ansible.builtin.set_fact:\n        shared_role: myorg.vlans\n        role_version: \"1.2.0\"\n    - name: Show the shared role\n      ansible.builtin.debug:\n        msg: \"Shared role myorg.vlans version 1.2.0\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Shared role myorg.vlans version 1.2.0\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Shared role myorg.vlans version 1.2.0",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Sharing Roles with Galaxy is the key idea here: Sharing a role with Galaxy means publishing it with ansible-galaxy role import from a Git repository, after the role has a README, a meta/main.",
        "approach": "Work through Sharing Roles with Galaxy step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-network-roles-collections-m2-l5",
      "slug": "netauto-ansible-network-roles-collections-m2-l5",
      "title": "Versioning Collections",
      "concept": "Collections are versioned with semantic versioning: a major version for breaking changes, a minor version for new features, and a patch version for fixes. Playbooks pin the major version in requirements.yml, so a breaking collection release never lands by accident. Upgrading a collection is a deliberate act: read the changelog, test in the lab, and only then bump the pin. Collections are versioned with semantic versioning: a major version for breaking changes, a minor version for new features, and a patch version for fixes.",
      "syntax": "cisco.ios==6.0.0   # major.minor.patch\ncisco.ios>=6,<7     # pin the major version",
      "exampleCode": "collections:\n  - name: cisco.ios\n    version: \">=6,<7\"",
      "exampleLanguage": "ansible",
      "mistake": "Pinning a collection to an exact old version forever, so the team never receives security fixes or support for new device OS releases.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Versioning Collections, but it does not work correctly.",
       "buggyCode": "collections:\n  - name: cisco.ios\n    version: 4.0.0   # three years old, never reviewed",
       "fixedCode": "collections:\n  - name: cisco.ios\n    version: \">=6,<7\"   # reviewed quarterly, lab-tested",
       "explanation": "An exact pin that is never reviewed rots; a major-version range with a scheduled review keeps fixes flowing while blocking breaking changes."
      },
      "exercise": {
       "title": "Practise Versioning Collections",
       "type": "write-code",
       "instructions": "Write a playbook that stores the pinned collection versions, renders one pin line per collection, writes it to a file, and prints \"cisco.ios >=6,<7\" with the debug module. This exercise practises Versioning Collections.",
       "starterCode": "---\n- name: Versioning Collections\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Versioning Collections\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the collection pins data\n      ansible.builtin.set_fact:\n        pinned_collections:\n          - {name: cisco.ios, version: \">=6,<7\"}\n          - {name: arista.eos, version: \">=5,<6\"}\n    - name: Render the collection pins\n      ansible.builtin.set_fact:\n        rendered: \"{% for c in pinned_collections %}{{ c.name }} {{ c.version }}\\n{% endfor %}\"\n    - name: Write the rendered collection pins\n      ansible.builtin.copy:\n        dest: ./netauto-roles-collection-pins.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered collection pins\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the collection pins\n      ansible.builtin.assert:\n        that:\n          - \"'cisco.ios >=6,<7' in rendered\"\n          - \"'arista.eos >=5,<6' in rendered\"\n        fail_msg: \"The rendered collection pins is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Collections pinned: a breaking release never lands by accident\"\n",
       "solutionExplanation": "The playbook renders the collection pins from data: the major version is pinned, so a breaking collection release never lands by accident and upgrades stay deliberate.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "cisco.ios >=6,<7",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Collections are versioned with semantic versioning, and playbooks pin the major version in requirements.yml so a breaking collection release never lands by accident.",
        "approach": "Store each collection with its pinned version range as a dict, then loop over the list to render one pin line per collection.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Network Roles and Collections",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Network Roles and Collections Capstone.",
   "starterCode": "---\n- name: Network Roles and Collections capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Network Roles and Collections capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-network-roles-collections.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Network Roles and Collections\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Network Roles and Collections",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Network Roles and Collections Capstone is the key idea here: Network Roles and Collections brings the whole track together.",
    "approach": "Work through Network Roles and Collections Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Network Roles and Collections Capstone Project",
   "description": "A small end-to-end project that puts Network Roles and Collections into practice.",
   "requirements": [
    "Use the core ideas of Network Roles and Collections in a working playbook.",
    "Apply at least three of these skills: Ansible roles, Role structure, Ansible collections, Galaxy.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Network Roles and Collections correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-multi-vendor",
  "slug": "netauto-ansible-multi-vendor",
  "language": "ansible",
  "category": "devops",
  "title": "Multi-Vendor Playbooks",
  "description": "Write one playbook that works across Cisco, Arista, and Juniper: vendor variables, conditionals, normalised interfaces, and vendor-specific templates.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Multi-vendor playbooks",
   "Vendor variables",
   "Conditional tasks",
   "Interface normalisation",
   "Vendor templates",
   "ansible_network_os",
   "Vendor quirks",
   "Multi-vendor testing"
  ],
  "prerequisites": [
   "netauto-ansible-network-roles-collections"
  ],
  "analogy": "Learning {topic} is like learning to cook the same dish in three kitchens: the recipe is the same, but each kitchen has its own stove and its own names for the pans.",
  "modules": [
   {
    "id": "netauto-ansible-multi-vendor-m1",
    "title": "Multi-Vendor Playbooks Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-multi-vendor-m1-l1",
      "slug": "netauto-ansible-multi-vendor-m1-l1",
      "title": "One Playbook Many Vendors",
      "concept": "A multi-vendor playbook targets devices from several vendors with one set of tasks, using each device's ansible_network_os to choose the right module. The playbook's logic stays vendor-neutral, while the vendor-specific details live in group variables per platform. This is how a team configures VLAN 10 on Cisco IOS, Arista EOS, and Juniper Junos without maintaining three separate playbooks. A multi-vendor playbook targets devices from several vendors with one set of tasks, using each device's ansible_network_os to choose the right module.",
      "syntax": "ansible_network_os: ios    # Cisco\nansible_network_os: eos    # Arista\nansible_network_os: junos  # Juniper",
      "exampleCode": "---\n- name: List the vendors\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    vendors:\n      - {os: ios, vendor: Cisco}\n      - {os: eos, vendor: Arista}\n      - {os: junos, vendor: Juniper}\n  tasks:\n    - name: Show the vendors\n      ansible.builtin.debug:\n        msg: \"One playbook serves ios, eos, and junos\"",
      "exampleLanguage": "ansible",
      "mistake": "Writing three copy-paste playbooks, one per vendor, so every change has to be made three times and the copies drift apart.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate One Playbook Many Vendors, but it does not work correctly.",
       "buggyCode": "site-ios.yml\nsite-eos.yml\nsite-junos.yml   # same change, three files",
       "fixedCode": "- name: Configure VLANs\n  hosts: all\n  tasks:\n    - name: Create VLAN 10\n      ansible.builtin.include_tasks: \"vlan-{{ ansible_network_os }}.yml\"",
       "explanation": "One playbook with vendor-chosen tasks keeps the logic in one place; three copies guarantee the vendors drift apart over time."
      },
      "exercise": {
       "title": "Practise One Playbook Many Vendors",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"One playbook serves ios, eos, and junos\" with the debug module. This exercise practises One Playbook Many Vendors.",
       "starterCode": "---\n- name: One Playbook Many Vendors\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: One Playbook Many Vendors\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the vendor list\n      ansible.builtin.set_fact:\n        vendors:\n          - {os: ios, vendor: Cisco}\n          - {os: eos, vendor: Arista}\n          - {os: junos, vendor: Juniper}\n    - name: Show the vendors\n      ansible.builtin.debug:\n        msg: \"One playbook serves ios, eos, and junos\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"One playbook serves ios, eos, and junos\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "One playbook serves ios, eos, and junos",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "One Playbook Many Vendors is the key idea here: A multi-vendor playbook targets devices from several vendors with one set of tasks, using each device's ansible_network_os to choose the right module.",
        "approach": "Work through One Playbook Many Vendors step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-multi-vendor-m1-l2",
      "slug": "netauto-ansible-multi-vendor-m1-l2",
      "title": "Vendor Variables with group_vars",
      "concept": "Vendor variables live in group_vars per platform, such as group_vars/ios.yml for Cisco settings and group_vars/eos.yml for Arista settings. Each group sets its own ansible_network_os, connection plugin, and any vendor-specific defaults, so a playbook never hard-codes a vendor. A device joins a vendor group by its inventory membership, and the variables follow automatically. Vendor variables live in group_vars per platform, such as group_vars/ios.yml for Cisco settings and group_vars/eos.yml for Arista settings.",
      "syntax": "group_vars/ios.yml:\n  ansible_network_os: ios\ngroup_vars/eos.yml:\n  ansible_network_os: eos",
      "exampleCode": "[ios]\ncore1\n[eos]\nleaf1",
      "exampleLanguage": "ansible",
      "mistake": "Setting ansible_network_os in the play for every vendor, so the playbook has one play per vendor and the logic is duplicated.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Vendor Variables with group_vars, but it does not work correctly.",
       "buggyCode": "- name: Cisco play\n  hosts: ios\n  vars:\n    ansible_network_os: ios\n- name: Arista play\n  hosts: eos\n  vars:\n    ansible_network_os: eos",
       "fixedCode": "group_vars/ios.yml:\n  ansible_network_os: ios\ngroup_vars/eos.yml:\n  ansible_network_os: eos",
       "explanation": "Vendor facts belong in group_vars, where the inventory assigns them; putting them in the play duplicates the play for every vendor."
      },
      "exercise": {
       "title": "Practise Vendor Variables with group_vars",
       "type": "write-code",
       "instructions": "Write a playbook that stores the per-platform group_vars files with their network OS and hosts, renders one line per vendor, writes it to a file, and prints \"group_vars/ios.yml: ansible_network_os=ios hosts=core1\" with the debug module. This exercise practises Vendor Variables with group_vars.",
       "starterCode": "---\n- name: Vendor Variables with group_vars\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Vendor Variables with group_vars\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the vendor variables data\n      ansible.builtin.set_fact:\n        vendor_groups:\n          - {file: group_vars/ios.yml, network_os: ios, hosts: [core1]}\n          - {file: group_vars/eos.yml, network_os: eos, hosts: [leaf1]}\n    - name: Render the vendor variables\n      ansible.builtin.set_fact:\n        rendered: \"{% for v in vendor_groups %}{{ v.file }}: ansible_network_os={{ v.network_os }} hosts={{ v.hosts | join(', ') }}\\n{% endfor %}\"\n    - name: Write the rendered vendor variables\n      ansible.builtin.copy:\n        dest: ./netauto-multivendor-group-vars.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered vendor variables\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the vendor variables\n      ansible.builtin.assert:\n        that:\n          - \"'group_vars/ios.yml: ansible_network_os=ios hosts=core1' in rendered\"\n          - \"'group_vars/eos.yml: ansible_network_os=eos hosts=leaf1' in rendered\"\n        fail_msg: \"The rendered vendor variables is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Vendor variables isolated: the playbook never hard-codes a vendor\"\n",
       "solutionExplanation": "The playbook renders the vendor variables from data: each platform group sets its own ansible_network_os, and a device joins a vendor group by inventory membership.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "group_vars/ios.yml: ansible_network_os=ios hosts=core1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Vendor variables live in group_vars per platform, such as group_vars/ios.yml for Cisco settings and group_vars/eos.yml for Arista settings, so a playbook never hard-codes a vendor.",
        "approach": "Store each vendor group with its file, network OS, and hosts, then loop over the groups to render one variables line per vendor.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-multi-vendor-m1-l3",
      "slug": "netauto-ansible-multi-vendor-m1-l3",
      "title": "Conditional Tasks by Vendor OS",
      "concept": "Conditional tasks use when clauses on ansible_network_os to run a task only on the vendor it applies to, for example a Cisco-only banner task or a Junos-only commit step. The playbook stays readable because each task declares its own audience, and unrelated vendors simply skip it. Overusing conditionals is a smell, though: when most tasks are conditional, the logic belongs in vendor roles instead. Conditional tasks use when clauses on ansible_network_os to run a task only on the vendor it applies to, while other vendors skip it.",
      "syntax": "- name: Cisco-only task\n  cisco.ios.ios_config:\n    lines:\n      - banner motd ^C Authorised use only ^C\n  when: ansible_network_os == 'ios'",
      "exampleCode": "---\n- name: Vendor conditional plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    ansible_network_os: ios\n  tasks:\n    - name: Show the Cisco-only step\n      ansible.builtin.debug:\n        msg: \"Cisco-only task runs for ios\"\n      when: ansible_network_os == 'ios'",
      "exampleLanguage": "ansible",
      "mistake": "Writing a when condition on the inventory hostname, so renaming a device silently changes which tasks run on it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Conditional Tasks by Vendor OS, but it does not work correctly.",
       "buggyCode": "- name: Cisco-only task\n  cisco.ios.ios_config:\n    lines:\n      - banner motd ^C Authorised use only ^C\n  when: inventory_hostname == 'core1'",
       "fixedCode": "- name: Cisco-only task\n  cisco.ios.ios_config:\n    lines:\n      - banner motd ^C Authorised use only ^C\n  when: ansible_network_os == 'ios'",
       "explanation": "Hostnames change; platform facts do not. A condition on ansible_network_os survives a rename, while a condition on a hostname does not."
      },
      "exercise": {
       "title": "Practise Conditional Tasks by Vendor OS",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Cisco-only task runs for ios\" with the debug module. This exercise practises Conditional Tasks by Vendor OS.",
       "starterCode": "---\n- name: Conditional Tasks by Vendor OS\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Conditional Tasks by Vendor OS\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the platform fact\n      ansible.builtin.set_fact:\n        ansible_network_os: ios\n    - name: Show the Cisco-only step\n      ansible.builtin.debug:\n        msg: \"Cisco-only task runs for ios\"\n      when: ansible_network_os == 'ios'\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Cisco-only task runs for ios\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Cisco-only task runs for ios",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Conditional Tasks by Vendor OS is the key idea here: Conditional tasks use when clauses on ansible_network_os to run a task only on the vendor it applies to, for example a Cisco-only banner task or a Junos-only commit step.",
        "approach": "Work through Conditional Tasks by Vendor OS step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-multi-vendor-m1-l4",
      "slug": "netauto-ansible-multi-vendor-m1-l4",
      "title": "Abstracting Vendor Differences",
      "concept": "Abstracting vendor differences means the playbook talks about intent, such as create VLAN 10, while vendor-specific tasks or roles translate that intent into each platform's commands. The abstraction layer can be a role per vendor, a set of included task files, or a template per vendor. The goal is that a change to the intent, such as renaming a VLAN, is one edit that flows to every vendor. Abstracting vendor differences means the playbook talks about intent, such as create VLAN 10, while vendor-specific tasks translate that intent into each platform's commands.",
      "syntax": "- name: Create VLAN 10\n  ansible.builtin.include_role:\n    name: \"vlans_{{ ansible_network_os }}\"",
      "exampleCode": "roles/vlans_ios/\nroles/vlans_eos/\nroles/vlans_junos/",
      "exampleLanguage": "ansible",
      "mistake": "Leaking vendor CLI into the main playbook, so the playbook reads like three device manuals stapled together.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Abstracting Vendor Differences, but it does not work correctly.",
       "buggyCode": "- name: Create VLAN 10\n  cisco.ios.ios_config:\n    lines:\n      - vlan 10\n- name: Create VLAN 10 on EOS\n  arista.eos.eos_config:\n    lines:\n      - vlan 10",
       "fixedCode": "- name: Create VLAN 10\n  ansible.builtin.include_role:\n    name: \"vlans_{{ ansible_network_os }}\"\n  vars:\n    vlans:\n      - {id: 10, name: STAFF}",
       "explanation": "The main playbook should state intent once; vendor roles own the translation, so a VLAN rename is one edit, not three."
      },
      "exercise": {
       "title": "Check your understanding: Abstracting Vendor Differences",
       "type": "multiple-choice",
       "instructions": "Which statement about Abstracting Vendor Differences is correct?",
       "starterCode": "",
       "solution": "Abstracting vendor differences means the playbook talks about intent, such as create VLAN 10, while vendor-specific tasks or roles translate that intent into each platform's commands.",
       "solutionExplanation": "Abstracting vendor differences means the playbook talks about intent, such as create VLAN 10, while vendor-specific tasks or roles translate that intent into each platform's commands. The other options are false: Abstracting Vendor Differences is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Abstracting vendor differences means the playbook talks about intent, such as create VLAN 10, while vendor-specific tasks or roles translate that intent into each platform's commands.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Abstracting Vendor Differences from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Abstracting Vendor Differences can only be used once in a program",
        "Abstracting Vendor Differences requires a separate paid licence to use",
        "Abstracting Vendor Differences was removed from Ansible in the latest version",
        "Abstracting vendor differences means the playbook talks about intent, such as create VLAN 10, while vendor-specific tasks or roles translate that intent into each platform's commands.",
        "Abstracting Vendor Differences only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-multi-vendor-m1-l5",
      "slug": "netauto-ansible-multi-vendor-m1-l5",
      "title": "Normalising Interface Names",
      "concept": "Normalising interface names means mapping each vendor's naming, such as GigabitEthernet0/1 on IOS, Ethernet1 on EOS, and ge-0/0/1 on Junos, to one logical name in your variables. The playbook loops over logical interfaces and each vendor role translates the logical name to the physical one. Without normalisation, every task needs a vendor-specific name, and the playbook drowns in conditionals. Normalising interface names means mapping each vendor's naming, such as GigabitEthernet0/1, Ethernet1, and ge-0/0/1, to one logical name in your variables.",
      "syntax": "interfaces:\n  - logical: uplink1\n    ios: GigabitEthernet0/1\n    eos: Ethernet1\n    junos: ge-0/0/1",
      "exampleCode": "---\n- name: Normalise an interface\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    logical_interfaces:\n      - logical: uplink1\n        ios: GigabitEthernet0/1\n        eos: Ethernet1\n        junos: ge-0/0/1\n  tasks:\n    - name: Show the mapping\n      ansible.builtin.debug:\n        msg: \"uplink1 is GigabitEthernet0/1 on ios\"",
      "exampleLanguage": "ansible",
      "mistake": "Hard-coding GigabitEthernet0/1 in a task that also runs on Arista, where the interface is called Ethernet1 and the task fails.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Normalising Interface Names, but it does not work correctly.",
       "buggyCode": "- name: Configure the uplink\n  cisco.ios.ios_interfaces:\n    config:\n      - name: GigabitEthernet0/1\n        description: Uplink\n  when: ansible_network_os in ['ios', 'eos']",
       "fixedCode": "- name: Configure the uplink\n  ansible.builtin.set_fact:\n    uplink_name: \"{{ interfaces.uplink1[ansible_network_os] }}\"",
       "explanation": "A logical name with a per-vendor map lets the same task run everywhere; a hard-coded vendor name fails on every other vendor."
      },
      "exercise": {
       "title": "Practise Normalising Interface Names",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"uplink1 is GigabitEthernet0/1 on ios\" with the debug module. This exercise practises Normalising Interface Names.",
       "starterCode": "---\n- name: Normalising Interface Names\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Normalising Interface Names\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the interface map\n      ansible.builtin.set_fact:\n        logical_interfaces:\n          - {logical: uplink1, ios: GigabitEthernet0/1, eos: Ethernet1, junos: \"ge-0/0/1\"}\n    - name: Show the mapping\n      ansible.builtin.debug:\n        msg: \"uplink1 is GigabitEthernet0/1 on ios\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"uplink1 is GigabitEthernet0/1 on ios\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "uplink1 is GigabitEthernet0/1 on ios",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Normalising Interface Names is the key idea here: Normalising interface names means mapping each vendor's naming, such as GigabitEthernet0/1 on IOS, Ethernet1 on EOS, and ge-0/0/1 on Junos, to one logical name in your variables.",
        "approach": "Work through Normalising Interface Names step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-multi-vendor-m2",
    "title": "Multi-Vendor Playbooks in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-ansible-multi-vendor-m2-l1",
      "slug": "netauto-ansible-multi-vendor-m2-l1",
      "title": "Vendor-Specific Templates",
      "concept": "Vendor-specific templates render each platform's config syntax from the same shared variables, so one data model produces an IOS config, an EOS config, and a Junos config. The template is chosen by ansible_network_os, for example switch-{{ ansible_network_os }}.j2, and each template knows its vendor's syntax. This is the cleanest multi-vendor pattern when the configs differ too much for shared resource modules. Vendor-specific templates render each platform's config syntax from the same shared variables, with the template chosen by ansible_network_os.",
      "syntax": "switch-{{ ansible_network_os }}.j2\nswitch-ios.j2\nswitch-eos.j2\nswitch-junos.j2",
      "exampleCode": "templates/switch-ios.j2:\n  vlan {{ vlan.id }}\n   name {{ vlan.name }}\ntemplates/switch-eos.j2:\n  vlan {{ vlan.id }}\n   name {{ vlan.name }}",
      "exampleLanguage": "ansible",
      "mistake": "Writing one template with vendor conditionals inside every block, so the template is unreadable and every vendor's syntax is tangled together.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Vendor-Specific Templates, but it does not work correctly.",
       "buggyCode": "{% if ansible_network_os == 'ios' %}\nvlan {{ vlan.id }}\n{% elif ansible_network_os == 'eos' %}\nvlan {{ vlan.id }}\n{% endif %}",
       "fixedCode": "templates/switch-{{ ansible_network_os }}.j2   # one clean template per vendor",
       "explanation": "A template per vendor keeps each vendor's syntax clean and reviewable; conditionals inside one template tangle all vendors together."
      },
      "exercise": {
       "title": "Practise Vendor-Specific Templates",
       "type": "write-code",
       "instructions": "Write a playbook that stores one shared VLAN data model, renders an IOS config block and an EOS config block from it, writes both to a file, and prints \"vlan 10\" with the debug module. This exercise practises Vendor-Specific Templates.",
       "starterCode": "---\n- name: Vendor-Specific Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Vendor-Specific Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the vendor configs data\n      ansible.builtin.set_fact:\n        shared_vlans:\n          - {id: 10, name: STAFF}\n          - {id: 20, name: VOICE}\n    - name: Render the vendor configs\n      ansible.builtin.set_fact:\n        rendered: \"ios:\\n{% for v in shared_vlans %}vlan {{ v.id }}\\n name {{ v.name }}\\n{% endfor %}eos:\\n{% for v in shared_vlans %}vlan {{ v.id }}\\n   name {{ v.name }}\\n{% endfor %}\"\n    - name: Write the rendered vendor configs\n      ansible.builtin.copy:\n        dest: ./netauto-multivendor-templates.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered vendor configs\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the vendor configs\n      ansible.builtin.assert:\n        that:\n          - \"'ios:' in rendered\"\n          - \"'eos:' in rendered\"\n        fail_msg: \"The rendered vendor configs is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"One data model, one template per vendor: the template is chosen by ansible_network_os\"\n",
       "solutionExplanation": "The playbook renders each platform's config syntax from the same shared variables, the cleanest multi-vendor pattern when the configs differ too much for shared resource modules.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "vlan 10",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Vendor-specific templates render each platform's config syntax from the same shared variables, with the template chosen by ansible_network_os.",
        "approach": "Store the shared VLAN list once, then run two loops in the template: one under an ios header and one under an eos header.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-multi-vendor-m2-l2",
      "slug": "netauto-ansible-multi-vendor-m2-l2",
      "title": "Testing Multi-Vendor Logic Locally",
      "concept": "Multi-vendor logic is tested locally by rendering each vendor's config from the same variables and asserting the expected lines appear in every render. A localhost playbook loops over the vendor list, renders each template or builds each config string, and checks the results with assert. This catches a missing vendor mapping before the playbook ever reaches a lab device. Multi-vendor logic is tested locally by rendering each vendor's config from the same variables and asserting the expected lines appear in every render.",
      "syntax": "ansible-playbook test-vendors.yml --limit localhost",
      "exampleCode": "---\n- name: Test every vendor render\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    vendors: [ios, eos, junos]\n    vlan_id: 10\n  tasks:\n    - name: Check the VLAN render\n      ansible.builtin.assert:\n        that:\n          - vlan_id == 10\n        success_msg: \"VLAN 10 renders for every vendor\"",
      "exampleLanguage": "ansible",
      "mistake": "Testing only the vendor the author uses, and discovering in production that the Junos template was never rendered at all.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Testing Multi-Vendor Logic Locally, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml --limit ios-lab   # only Cisco tested",
       "fixedCode": "$ ansible-playbook test-vendors.yml   # renders ios, eos, and junos",
       "explanation": "A multi-vendor playbook is only tested when every vendor is rendered; testing one vendor proves nothing about the others."
      },
      "exercise": {
       "title": "Practise Testing Multi-Vendor Logic Locally",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"VLAN 10 renders for every vendor\" with the debug module. This exercise practises Testing Multi-Vendor Logic Locally.",
       "starterCode": "---\n- name: Testing Multi-Vendor Logic Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Testing Multi-Vendor Logic Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the vendor test facts\n      ansible.builtin.set_fact:\n        vendors: [ios, eos, junos]\n        vlan_id: 10\n    - name: Check the VLAN render\n      ansible.builtin.assert:\n        that:\n          - vlan_id == 10\n        success_msg: \"VLAN 10 renders for every vendor\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"VLAN 10 renders for every vendor\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "VLAN 10 renders for every vendor",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing Multi-Vendor Logic Locally is the key idea here: Multi-vendor logic is tested locally by rendering each vendor's config from the same variables and asserting the expected lines appear in every render.",
        "approach": "Work through Testing Multi-Vendor Logic Locally step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-multi-vendor-m2-l3",
      "slug": "netauto-ansible-multi-vendor-m2-l3",
      "title": "Handling Vendor Quirks",
      "concept": "Every vendor has quirks: a module that needs a different argument, a device that returns configs in an unexpected order, or a feature that exists under a different name. Quirks are handled in the vendor role or template, never in the main playbook, and they are documented with a comment explaining why the special case exists. A quirk without a comment is a mystery the next engineer will delete by accident. Every vendor has quirks, such as a module needing a different argument or a device returning configs in an unexpected order, and quirks are handled in the vendor role with a comment explaining why.",
      "syntax": "# EOS returns VLANs sorted differently; sort before comparing.\n# Junos needs a commit step after config changes.",
      "exampleCode": "junipernetworks.junos.junos_config:\n  src: router.cfg\n  comment: \"Applied by Ansible\"",
      "exampleLanguage": "ansible",
      "mistake": "Working around a quirk with an undocumented hack in the main playbook, so the next engineer removes it during a tidy-up and the bug returns.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Handling Vendor Quirks, but it does not work correctly.",
       "buggyCode": "- name: Configure the device\n  ansible.builtin.command: sleep 5   # why is this here?",
       "fixedCode": "- name: Configure the device\n  junipernetworks.junos.junos_config:\n    src: router.cfg\n  # Junos applies config only on commit; the module commits by default.\n  # See https://example.com/junos-commit for the vendor behaviour.",
       "explanation": "A quirk fix without a comment looks like a mistake; a comment naming the vendor behaviour turns it into documented knowledge."
      },
      "exercise": {
       "title": "Check your understanding: Handling Vendor Quirks",
       "type": "multiple-choice",
       "instructions": "Which statement about Handling Vendor Quirks is correct?",
       "starterCode": "",
       "solution": "Every vendor has quirks: a module that needs a different argument, a device that returns configs in an unexpected order, or a feature that exists under a different name.",
       "solutionExplanation": "Every vendor has quirks: a module that needs a different argument, a device that returns configs in an unexpected order, or a feature that exists under a different name. The other options are false: Handling Vendor Quirks is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Every vendor has quirks: a module that needs a different argument, a device that returns configs in an unexpected order, or a feature that exists under a different name.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Handling Vendor Quirks from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Handling Vendor Quirks can only be used once in a program",
        "Handling Vendor Quirks requires a separate paid licence to use",
        "Every vendor has quirks: a module that needs a different argument, a device that returns configs in an unexpected order, or a feature that exists under a different name.",
        "Handling Vendor Quirks was removed from Ansible in the latest version",
        "Handling Vendor Quirks only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-multi-vendor-m2-l4",
      "slug": "netauto-ansible-multi-vendor-m2-l4",
      "title": "A Multi-Vendor VLAN Playbook",
      "concept": "A multi-vendor VLAN playbook creates the same VLANs on Cisco, Arista, and Juniper devices from one variable list, using vendor roles chosen by ansible_network_os. It runs with --check and --diff first, backs up each device, and verifies the VLANs exist afterwards with a facts or show command. The playbook's success is measured per vendor: every vendor must report the VLANs, not just the one the author tested. A multi-vendor VLAN playbook creates the same VLANs on Cisco, Arista, and Juniper devices from one variable list, using vendor roles chosen by ansible_network_os.",
      "syntax": "- name: VLANs everywhere\n  hosts: all\n  roles:\n    - \"vlans_{{ ansible_network_os }}\"",
      "exampleCode": "---\n- name: Multi-vendor VLAN plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    vlans:\n      - {id: 10, name: STAFF}\n      - {id: 20, name: VOICE}\n      - {id: 99, name: GUEST}\n    vendors: [ios, eos, junos]\n  tasks:\n    - name: Show the VLAN plan\n      ansible.builtin.debug:\n        msg: \"VLAN 10 STAFF goes to ios, eos, and junos\"",
      "exampleLanguage": "ansible",
      "mistake": "Verifying the VLANs only on the Cisco devices, and assuming the Arista and Juniper runs worked because the playbook reported no failures.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Multi-Vendor VLAN Playbook, but it does not work correctly.",
       "buggyCode": "- name: Verify VLANs\n  cisco.ios.ios_command:\n    commands: show vlan brief\n  when: ansible_network_os == 'ios'",
       "fixedCode": "- name: Verify VLANs\n  ansible.builtin.include_tasks: \"verify-{{ ansible_network_os }}.yml\"",
       "explanation": "Verification must cover every vendor, with a vendor-specific check per platform; a playbook that only verifies one vendor is only proven on one vendor."
      },
      "exercise": {
       "title": "Practise A Multi-Vendor VLAN Playbook",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"VLAN 10 STAFF goes to ios, eos, and junos\" with the debug module. This exercise practises A Multi-Vendor VLAN Playbook.",
       "starterCode": "---\n- name: A Multi-Vendor VLAN Playbook\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Multi-Vendor VLAN Playbook\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the multi-vendor VLAN plan\n      ansible.builtin.set_fact:\n        vlans:\n          - {id: 10, name: STAFF}\n          - {id: 20, name: VOICE}\n          - {id: 99, name: GUEST}\n        vendors: [ios, eos, junos]\n    - name: Show the VLAN plan\n      ansible.builtin.debug:\n        msg: \"VLAN 10 STAFF goes to ios, eos, and junos\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"VLAN 10 STAFF goes to ios, eos, and junos\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "VLAN 10 STAFF goes to ios, eos, and junos",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Multi-Vendor VLAN Playbook is the key idea here: A multi-vendor VLAN playbook creates the same VLANs on Cisco, Arista, and Juniper devices from one variable list, using vendor roles chosen by ansible_network_os.",
        "approach": "Work through A Multi-Vendor VLAN Playbook step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-multi-vendor-m2-l5",
      "slug": "netauto-ansible-multi-vendor-m2-l5",
      "title": "Multi-Vendor Design Review",
      "concept": "A multi-vendor design review asks whether the shared data model covers every vendor, whether vendor specifics are isolated in roles and templates, and whether every vendor is tested and verified. It also checks the failure modes: what happens when a vendor module is missing, or a new vendor is added. A design that passes the review can grow to a fourth vendor by adding a role, not by rewriting the playbook.",
      "syntax": "A multi-vendor design review asks whether the shared data model covers every vendor, whether vendor specifics are isolated in roles, and whether every vendor is tested.",
      "exampleCode": "1. One data model, all vendors\n2. Vendor logic in roles only\n3. Every vendor tested and verified\n4. New vendor = new role",
      "exampleLanguage": "ansible",
      "mistake": "Adding a fourth vendor by copying the main playbook and editing the copy, because the design never isolated the vendor logic.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Multi-Vendor Design Review, but it does not work correctly.",
       "buggyCode": "site-vendor4.yml   # a fourth copy of the playbook",
       "fixedCode": "roles/vlans_vendor4/   # a fourth role, same playbook",
       "explanation": "A new vendor should be a new role and a new inventory group, not a new playbook; if adding a vendor means editing the main playbook, the abstraction has failed."
      },
      "exercise": {
       "title": "Practise Multi-Vendor Design Review",
       "type": "write-code",
       "instructions": "Write a playbook that stores the multi-vendor design review checks, renders each one with its pass or fail result, writes it to a file, and prints \"[PASS] new vendor = new role\" with the debug module. This exercise practises Multi-Vendor Design Review.",
       "starterCode": "---\n- name: Multi-Vendor Design Review\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Multi-Vendor Design Review\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the design review data\n      ansible.builtin.set_fact:\n        design_review:\n          - {check: \"one data model, all vendors\", pass: true}\n          - {check: \"vendor logic in roles only\", pass: true}\n          - {check: \"every vendor tested and verified\", pass: true}\n          - {check: \"new vendor = new role\", pass: true}\n    - name: Render the design review\n      ansible.builtin.set_fact:\n        rendered: \"{% for c in design_review %}[{{ 'PASS' if c.pass else 'FAIL' }}] {{ c.check }}\\n{% endfor %}\"\n    - name: Write the rendered design review\n      ansible.builtin.copy:\n        dest: ./netauto-multivendor-review.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered design review\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the design review\n      ansible.builtin.assert:\n        that:\n          - \"'[PASS] one data model, all vendors' in rendered\"\n          - \"'[PASS] new vendor = new role' in rendered\"\n        fail_msg: \"The rendered design review is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Design review passed: a fourth vendor means a new role, not a rewrite\"\n",
       "solutionExplanation": "The playbook renders the design review from data: one shared data model, vendor specifics isolated in roles and templates, every vendor tested, and a new vendor added as a new role.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "[PASS] new vendor = new role",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A multi-vendor design review asks whether the shared data model covers every vendor, whether vendor specifics are isolated in roles and templates, and whether every vendor is tested and verified.",
        "approach": "Store each review check with a pass flag, then loop over the checks using an inline if to render the PASS or FAIL mark.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Multi-Vendor Playbooks",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Multi-Vendor Playbooks Capstone.",
   "starterCode": "---\n- name: Multi-Vendor Playbooks capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Multi-Vendor Playbooks capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-multi-vendor.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Multi-Vendor Playbooks\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Multi-Vendor Playbooks",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Multi-Vendor Playbooks Capstone is the key idea here: Multi-Vendor Playbooks brings the whole track together.",
    "approach": "Work through Multi-Vendor Playbooks Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Multi-Vendor Playbooks Capstone Project",
   "description": "A small end-to-end project that puts Multi-Vendor Playbooks into practice.",
   "requirements": [
    "Use the core ideas of Multi-Vendor Playbooks in a working playbook.",
    "Apply at least three of these skills: Multi-vendor playbooks, Vendor variables, Conditional tasks, Interface normalisation.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Multi-Vendor Playbooks correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-awx-network-teams",
  "slug": "netauto-ansible-awx-network-teams",
  "language": "ansible",
  "category": "devops",
  "title": "AWX for Network Teams",
  "description": "Run network Ansible as a team with AWX: inventories, credentials, job templates, surveys, workflows, RBAC, and audited job output.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "AWX",
   "Job templates",
   "AWX inventories",
   "AWX credentials",
   "Surveys",
   "Workflow job templates",
   "AWX RBAC",
   "Execution environments"
  ],
  "prerequisites": [
   "netauto-ansible-multi-vendor"
  ],
  "analogy": "Learning {topic} is like learning to run a shared kitchen: everyone cooks from the same recipes, the ingredients are locked away, and every dish is logged.",
  "modules": [
   {
    "id": "netauto-ansible-awx-network-teams-m1",
    "title": "AWX for Network Teams Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-awx-network-teams-m1-l1",
      "slug": "netauto-ansible-awx-network-teams-m1-l1",
      "title": "What AWX Adds to Ansible",
      "concept": "AWX is the open-source web interface and API for Ansible that adds a job scheduler, a credential store, role-based access, and a full history of every job run. It turns playbooks run from laptops into jobs run from a shared server, so the team shares one inventory, one set of credentials, and one audit trail. AWX is the upstream project for Red Hat Ansible Automation Platform, and it runs as containers on a server or a Kubernetes cluster. AWX is the open-source web interface and API for Ansible that adds a job scheduler, a credential store, role-based access, and a full history of every job run.",
      "syntax": "AWX: web UI + API + scheduler + credentials + job history\nansible-playbook: command line only",
      "exampleCode": "---\n- name: List what AWX adds\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    awx_features:\n      - scheduler\n      - credentials\n      - rbac\n      - job history\n  tasks:\n    - name: Show the AWX features\n      ansible.builtin.debug:\n        msg: \"AWX adds scheduler, credentials, RBAC, and job history\"",
      "exampleLanguage": "ansible",
      "mistake": "Running production network playbooks from a personal laptop, so nobody else can see what ran, when, or with which credentials.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate What AWX Adds to Ansible, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # from a laptop, no record anywhere",
       "fixedCode": "AWX job #412: site.yml, run by deepak, 2026-11-24 10:00, success",
       "explanation": "A laptop run leaves no record; an AWX job records who ran what, when, and with what result, which is what an audit asks for."
      },
      "exercise": {
       "title": "Practise What AWX Adds to Ansible",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"AWX adds scheduler, credentials, RBAC, and job history\" with the debug module. This exercise practises What AWX Adds to Ansible.",
       "starterCode": "---\n- name: What AWX Adds to Ansible\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: What AWX Adds to Ansible\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the AWX feature list\n      ansible.builtin.set_fact:\n        awx_features: [scheduler, credentials, rbac, job history]\n    - name: Show the AWX features\n      ansible.builtin.debug:\n        msg: \"AWX adds scheduler, credentials, RBAC, and job history\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"AWX adds scheduler, credentials, RBAC, and job history\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "AWX adds scheduler, credentials, RBAC, and job history",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What AWX Adds to Ansible is the key idea here: AWX is the open-source web interface and API for Ansible that adds a job scheduler, a credential store, role-based access, and a full history of every job run.",
        "approach": "Work through What AWX Adds to Ansible step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-awx-network-teams-m1-l2",
      "slug": "netauto-ansible-awx-network-teams-m1-l2",
      "title": "AWX Inventories and Credentials",
      "concept": "AWX inventories hold the same groups and hosts as an Ansible inventory, and they can be synced from a source such as a Git repository or NetBox so they stay current. AWX credentials store machine logins, Vault passwords, and cloud tokens encrypted in the AWX database, and jobs use them without ever printing them. A job template links one inventory with one credential, so a job always runs with the right access and nothing else. AWX inventories hold the same groups and hosts as an Ansible inventory, and AWX credentials store machine logins and Vault passwords encrypted so jobs use them without printing them.",
      "syntax": "Inventory: core, access, firewalls\nCredential: network-admin (machine)\nCredential: vault-password",
      "exampleCode": "Inventory source: Git repository, synced hourly\nCredential type: Machine, username admin",
      "exampleLanguage": "ansible",
      "mistake": "Storing device passwords in a playbook variable because AWX credentials seemed like extra work, and then sharing the playbook repository.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX Inventories and Credentials, but it does not work correctly.",
       "buggyCode": "vars:\n  ansible_password: changeme123   # in Git",
       "fixedCode": "AWX credential: network-admin, type Machine, stored encrypted",
       "explanation": "Credentials in Git are credentials shared with everyone who can read the repository; AWX credentials are encrypted and only exposed to the jobs that need them."
      },
      "exercise": {
       "title": "Practise AWX Inventories and Credentials",
       "type": "write-code",
       "instructions": "Write a playbook that models an AWX job template as data (inventory with its source and hosts, credential type and user), renders it, writes it to a file, and prints \"inventory: campus (Git sync, hosts core1, access1)\" with the debug module. This exercise practises AWX Inventories and Credentials.",
       "starterCode": "---\n- name: AWX Inventories and Credentials\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: AWX Inventories and Credentials\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the job template data\n      ansible.builtin.set_fact:\n        job_template:\n          name: vlan-change\n          inventory: campus\n          inventory_source: Git\n          inventory_hosts:\n            - core1\n            - access1\n          credential_type: Machine\n          credential_user: admin\n    - name: Render the job template\n      ansible.builtin.set_fact:\n        rendered: \"job template: {{ job_template.name }}\\ninventory: {{ job_template.inventory }} ({{ job_template.inventory_source }} sync, hosts {{ job_template.inventory_hosts | join(', ') }})\\ncredential: {{ job_template.credential_type }} {{ job_template.credential_user }} (stored encrypted, never printed)\"\n    - name: Write the rendered job template\n      ansible.builtin.copy:\n        dest: ./netauto-awx-job-template.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered job template\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the job template\n      ansible.builtin.assert:\n        that:\n          - \"'job template: vlan-change' in rendered\"\n          - \"'credential: Machine admin (stored encrypted, never printed)' in rendered\"\n        fail_msg: \"The rendered job template is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Job template modelled: the right inventory with the right credential, nothing else\"\n",
       "solutionExplanation": "The playbook models the job template inputs locally: the inventory synced from Git and the machine credential stored encrypted, so a job always runs with the right access and nothing else. No AWX server is involved here.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "inventory: campus (Git sync, hosts core1, access1)",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "AWX inventories hold the same groups and hosts as an Ansible inventory, and AWX credentials store machine logins encrypted so jobs use them without printing them.",
        "approach": "Store the job template as one dict with nested inventory and credential fields, then render each field on its own line.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-awx-network-teams-m1-l3",
      "slug": "netauto-ansible-awx-network-teams-m1-l3",
      "title": "AWX Job Templates",
      "concept": "An AWX job template is a saved job definition: a project with the playbook, an inventory, a credential, and options such as verbosity, limit, and extra variables. Launching the template runs the job, and every launch is recorded with its output, so the same change can be repeated exactly. Job templates are the unit of work in AWX, and teams create one per routine task, such as backup all configs or deploy VLANs. An AWX job template is a saved job definition: a project with the playbook, an inventory, a credential, and options such as verbosity, limit, and extra variables.",
      "syntax": "Job template: Backup all configs\n  Project: network-automation\n  Playbook: backup.yml\n  Inventory: Production\n  Credential: network-admin",
      "exampleCode": "---\n- name: Describe a job template\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    job_template: Backup all configs\n    playbook: backup.yml\n    inventory: Production\n  tasks:\n    - name: Show the job template\n      ansible.builtin.debug:\n        msg: \"Job template Backup all configs runs backup.yml\"",
      "exampleLanguage": "ansible",
      "mistake": "Launching jobs by pasting a playbook name into a one-off AWX job, so the same task is configured differently every time it runs.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX Job Templates, but it does not work correctly.",
       "buggyCode": "Ad-hoc job: playbook backup.yml? or backups.yml? inventory: ???",
       "fixedCode": "Job template: Backup all configs\n  Playbook: backup.yml\n  Inventory: Production\n  Credential: network-admin",
       "explanation": "A saved template makes the job repeatable; a one-off launch depends on whoever typed it that day, and the details drift."
      },
      "exercise": {
       "title": "Practise AWX Job Templates",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Job template Backup all configs runs backup.yml\" with the debug module. This exercise practises AWX Job Templates.",
       "starterCode": "---\n- name: AWX Job Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: AWX Job Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the job template facts\n      ansible.builtin.set_fact:\n        job_template: Backup all configs\n        playbook: backup.yml\n        inventory: Production\n    - name: Show the job template\n      ansible.builtin.debug:\n        msg: \"Job template Backup all configs runs backup.yml\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Job template Backup all configs runs backup.yml\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Job template Backup all configs runs backup.yml",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "AWX Job Templates is the key idea here: An AWX job template is a saved job definition: a project with the playbook, an inventory, a credential, and options such as verbosity, limit, and extra variables.",
        "approach": "Work through AWX Job Templates step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-awx-network-teams-m1-l4",
      "slug": "netauto-ansible-awx-network-teams-m1-l4",
      "title": "AWX Schedules and Surveys",
      "concept": "AWX schedules run job templates on a timetable, such as backing up every device config nightly at 2 a.m., without anyone being awake. Surveys are AWX forms that ask the launcher for values, such as which VLAN to create, and pass them to the playbook as extra variables with validation. Together they let routine network work happen safely on its own, with the survey limiting what the launcher can choose. AWX schedules run job templates on a timetable, and surveys are AWX forms that ask the launcher for values and pass them to the playbook as validated extra variables.",
      "syntax": "Schedule: nightly backup, 02:00 daily\nSurvey: vlan_id (integer, required), vlan_name (text)",
      "exampleCode": "Survey question: VLAN ID, type integer, min 1, max 4094\nSurvey question: VLAN name, type text, required",
      "exampleLanguage": "ansible",
      "mistake": "Letting anyone type any value into a job launch, so a typo creates VLAN 10000 and the playbook fails halfway through the fleet.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX Schedules and Surveys, but it does not work correctly.",
       "buggyCode": "Extra vars: vlan_id=10000   # typed freehand, invalid",
       "fixedCode": "Survey: vlan_id, integer, min 1, max 4094   # validated before launch",
       "explanation": "A survey validates input before the job starts; freehand extra variables fail halfway through, after some devices have already changed."
      },
      "exercise": {
       "title": "Check your understanding: AWX Schedules and Surveys",
       "type": "multiple-choice",
       "instructions": "Which statement about AWX Schedules and Surveys is correct?",
       "starterCode": "",
       "solution": "AWX schedules run job templates on a timetable, such as backing up every device config nightly at 2 a.",
       "solutionExplanation": "AWX schedules run job templates on a timetable, such as backing up every device config nightly at 2 a. The other options are false: AWX Schedules and Surveys is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "AWX schedules run job templates on a timetable, such as backing up every device config nightly at 2 a.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of AWX Schedules and Surveys from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "AWX Schedules and Surveys can only be used once in a program",
        "AWX Schedules and Surveys requires a separate paid licence to use",
        "AWX Schedules and Surveys was removed from Ansible in the latest version",
        "AWX schedules run job templates on a timetable, such as backing up every device config nightly at 2 a.",
        "AWX Schedules and Surveys only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-awx-network-teams-m1-l5",
      "slug": "netauto-ansible-awx-network-teams-m1-l5",
      "title": "AWX RBAC for Network Teams",
      "concept": "AWX role-based access control decides who can see and launch which job templates, inventories, and credentials, using organisations, teams, and roles. A junior engineer might be allowed to launch the backup job but not the change job, and nobody outside the network team can see the device credentials. RBAC is what lets a whole team share one AWX without sharing each other's access. AWX role-based access control decides who can see and launch which job templates, inventories, and credentials, using organisations, teams, and roles.",
      "syntax": "Team: network-ops, role: Job Template Admin\nTeam: noc-readonly, role: Auditor (read-only)",
      "exampleCode": "---\n- name: Show the team access\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    team: network-ops\n    role: Job Template Admin\n  tasks:\n    - name: Show the access rule\n      ansible.builtin.debug:\n        msg: \"Team network-ops can launch the change job\"",
      "exampleLanguage": "ansible",
      "mistake": "Giving every engineer the AWX admin account because setting up teams seemed slow, so anyone can delete any job template or read any credential.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX RBAC for Network Teams, but it does not work correctly.",
       "buggyCode": "AWX login: admin / shared password, used by 12 engineers",
       "fixedCode": "Organisation: network, Team: network-ops, Role: Job Template Admin",
       "explanation": "A shared admin account has no audit trail and no limits; teams and roles give each engineer exactly the access their job needs, and every action is attributed."
      },
      "exercise": {
       "title": "Practise AWX RBAC for Network Teams",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Team network-ops can launch the change job\" with the debug module. This exercise practises AWX RBAC for Network Teams.",
       "starterCode": "---\n- name: AWX RBAC for Network Teams\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: AWX RBAC for Network Teams\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the team access facts\n      ansible.builtin.set_fact:\n        team: network-ops\n        role: Job Template Admin\n    - name: Show the access rule\n      ansible.builtin.debug:\n        msg: \"Team network-ops can launch the change job\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Team network-ops can launch the change job\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Team network-ops can launch the change job",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "AWX RBAC for Network Teams is the key idea here: AWX role-based access control decides who can see and launch which job templates, inventories, and credentials, using organisations, teams, and roles.",
        "approach": "Work through AWX RBAC for Network Teams step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-awx-network-teams-m2",
    "title": "AWX for Network Teams in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-ansible-awx-network-teams-m2-l1",
      "slug": "netauto-ansible-awx-network-teams-m2-l1",
      "title": "AWX Workflow Job Templates",
      "concept": "An AWX workflow job template chains several job templates into a sequence with branches, so a change can back up, apply, verify, and notify in order. Each step runs only if the previous step succeeded, unless the workflow defines a failure path such as a rollback job. Workflows turn a multi-step network change into one launch that the whole team can follow in the AWX interface. An AWX workflow job template chains several job templates into a sequence with branches, so a change can back up, apply, verify, and notify in order.",
      "syntax": "Workflow: Backup -> Apply change -> Verify -> Notify\n  on failure: Rollback",
      "exampleCode": "Workflow nodes: backup.yml, change.yml, verify.yml, notify.yml",
      "exampleLanguage": "ansible",
      "mistake": "Running the four steps of a change as four separate manual launches, and forgetting the verify step when the apply step runs long.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX Workflow Job Templates, but it does not work correctly.",
       "buggyCode": "Launch backup.yml ... launch change.yml ... (verify forgotten)",
       "fixedCode": "Workflow: Backup -> Apply -> Verify -> Notify, one launch",
       "explanation": "A workflow makes the sequence automatic and visible; manual launches depend on memory, and the forgotten step is always the verification."
      },
      "exercise": {
       "title": "Practise AWX Workflow Job Templates",
       "type": "write-code",
       "instructions": "Write a playbook that models an AWX workflow as an ordered list of job templates with their run conditions, renders each node, writes it to a file, and prints \"5. rollback.yml runs on failure\" with the debug module. This exercise practises AWX Workflow Job Templates.",
       "starterCode": "---\n- name: AWX Workflow Job Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: AWX Workflow Job Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the workflow data\n      ansible.builtin.set_fact:\n        workflow_nodes:\n          - {job: backup.yml, condition: start}\n          - {job: change.yml, condition: success}\n          - {job: verify.yml, condition: success}\n          - {job: notify.yml, condition: success}\n          - {job: rollback.yml, condition: failure}\n    - name: Render the workflow\n      ansible.builtin.set_fact:\n        rendered: \"{% for n in workflow_nodes %}{{ loop.index }}. {{ n.job }} runs on {{ n.condition }}\\n{% endfor %}\"\n    - name: Write the rendered workflow\n      ansible.builtin.copy:\n        dest: ./netauto-awx-workflow.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered workflow\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the workflow\n      ansible.builtin.assert:\n        that:\n          - \"'1. backup.yml runs on start' in rendered\"\n          - \"'5. rollback.yml runs on failure' in rendered\"\n        fail_msg: \"The rendered workflow is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Workflow modelled: back up, apply, verify, notify, with a rollback path\"\n",
       "solutionExplanation": "The playbook renders the workflow nodes in order: backup runs first, change, verify, and notify run on success, and rollback runs on failure, turning a multi-step change into one launch.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "5. rollback.yml runs on failure",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "An AWX workflow job template chains several job templates into a sequence with branches, so a change can back up, apply, verify, and notify in order.",
        "approach": "Store each workflow node with its job file and run condition, then use loop.index to number the nodes as they render.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-awx-network-teams-m2-l2",
      "slug": "netauto-ansible-awx-network-teams-m2-l2",
      "title": "AWX Execution Environments",
      "concept": "An AWX execution environment is a container image that holds Ansible, the collections, and the Python dependencies a job needs, so every job runs in an identical environment. Network jobs need an execution environment with the vendor collections installed, such as cisco.ios and arista.eos. Pinning the execution environment per job template means a collection upgrade never changes a job's behaviour by surprise. An AWX execution environment is a container image that holds Ansible, the collections, and the Python dependencies a job needs, so every job runs in an identical environment.",
      "syntax": "Execution environment: ee-network:1.4.0\n  collections: cisco.ios, arista.eos, junipernetworks.junos",
      "exampleCode": "---\n- name: Name the execution environment\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    ee_image: ee-network:1.4.0\n    ee_collections: [cisco.ios, arista.eos]\n  tasks:\n    - name: Show the environment\n      ansible.builtin.debug:\n        msg: \"Execution environment ee-network:1.4.0 holds cisco.ios\"",
      "exampleLanguage": "ansible",
      "mistake": "Letting jobs run in the default execution environment with no vendor collections, so every network job fails on a missing module.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX Execution Environments, but it does not work correctly.",
       "buggyCode": "Job template: Deploy VLANs, Execution environment: default",
       "fixedCode": "Job template: Deploy VLANs, Execution environment: ee-network:1.4.0",
       "explanation": "The default environment has no network collections; a network execution environment with the vendor collections installed is part of the job definition."
      },
      "exercise": {
       "title": "Practise AWX Execution Environments",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Execution environment ee-network:1.4.0 holds cisco.ios\" with the debug module. This exercise practises AWX Execution Environments.",
       "starterCode": "---\n- name: AWX Execution Environments\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: AWX Execution Environments\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the execution environment facts\n      ansible.builtin.set_fact:\n        ee_image: ee-network:1.4.0\n        ee_collections: [cisco.ios, arista.eos]\n    - name: Show the environment\n      ansible.builtin.debug:\n        msg: \"Execution environment ee-network:1.4.0 holds cisco.ios\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Execution environment ee-network:1.4.0 holds cisco.ios\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Execution environment ee-network:1.4.0 holds cisco.ios",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "AWX Execution Environments is the key idea here: An AWX execution environment is a container image that holds Ansible, the collections, and the Python dependencies a job needs, so every job runs in an identical environment.",
        "approach": "Work through AWX Execution Environments step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-awx-network-teams-m2-l3",
      "slug": "netauto-ansible-awx-network-teams-m2-l3",
      "title": "AWX Job Output and Auditing",
      "concept": "Every AWX job keeps its full output, its start and end time, who launched it, and which inventory and credential it used, which is the audit trail for network changes. Job output is searchable, so an engineer can find the last time a VLAN was changed and what the recap said. Auditors ask for this record, and teams that run from laptops cannot produce it. Every AWX job keeps its full output, its start and end time, who launched it, and which inventory and credential it used, which is the audit trail for network changes.",
      "syntax": "Job #412: launched by deepak, 2026-11-24 10:00, success, ok=12 changed=2",
      "exampleCode": "Jobs -> Job #412 -> Output -> PLAY RECAP",
      "exampleLanguage": "ansible",
      "mistake": "Deleting old AWX jobs to save disk space and destroying the only record of who changed the network last month.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX Job Output and Auditing, but it does not work correctly.",
       "buggyCode": "$ awx jobs delete --all   # history gone",
       "fixedCode": "AWX settings: keep job history 365 days, archive output to object storage",
       "explanation": "Job history is an audit record, not clutter; retention is a policy decision, and deleting it destroys the evidence of past changes."
      },
      "exercise": {
       "title": "Check your understanding: AWX Job Output and Auditing",
       "type": "multiple-choice",
       "instructions": "Which statement about AWX Job Output and Auditing is correct?",
       "starterCode": "",
       "solution": "Every AWX job keeps its full output, its start and end time, who launched it, and which inventory and credential it used, which is the audit trail for network changes.",
       "solutionExplanation": "Every AWX job keeps its full output, its start and end time, who launched it, and which inventory and credential it used, which is the audit trail for network changes. The other options are false: AWX Job Output and Auditing is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Every AWX job keeps its full output, its start and end time, who launched it, and which inventory and credential it used, which is the audit trail for network changes.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of AWX Job Output and Auditing from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "AWX Job Output and Auditing can only be used once in a program",
        "AWX Job Output and Auditing requires a separate paid licence to use",
        "Every AWX job keeps its full output, its start and end time, who launched it, and which inventory and credential it used, which is the audit trail for network changes.",
        "AWX Job Output and Auditing was removed from Ansible in the latest version",
        "AWX Job Output and Auditing only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-awx-network-teams-m2-l4",
      "slug": "netauto-ansible-awx-network-teams-m2-l4",
      "title": "AWX and Network Change Approval",
      "concept": "AWX supports approval nodes in workflows, where a job pauses and waits for a named approver before continuing to the change step. The backup step runs automatically, the approver reviews the diff, and only then does the workflow apply the change. This turns change approval from a chat message into a recorded decision inside the job itself. AWX supports approval nodes in workflows, where a job pauses and waits for a named approver before continuing to the change step.",
      "syntax": "Workflow: Backup -> Approval (network lead) -> Apply -> Verify",
      "exampleCode": "---\n- name: Show the approval flow\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    approver: network lead\n    change: Deploy VLAN 10\n  tasks:\n    - name: Show the approval step\n      ansible.builtin.debug:\n        msg: \"Approval by network lead before Deploy VLAN 10\"",
      "exampleLanguage": "ansible",
      "mistake": "Approving a change in a chat message with no link to the job, so the approval cannot be found when the change is reviewed later.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX and Network Change Approval, but it does not work correctly.",
       "buggyCode": "chat: \"go ahead with the VLAN change\"   # no record in AWX",
       "fixedCode": "Workflow approval node: approver network lead, job #413 paused",
       "explanation": "An approval in chat is hearsay; an approval node in the workflow is a timestamped decision attached to the job it approved."
      },
      "exercise": {
       "title": "Practise AWX and Network Change Approval",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Approval by network lead before Deploy VLAN 10\" with the debug module. This exercise practises AWX and Network Change Approval.",
       "starterCode": "---\n- name: AWX and Network Change Approval\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: AWX and Network Change Approval\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the approval facts\n      ansible.builtin.set_fact:\n        approver: network lead\n        change: Deploy VLAN 10\n    - name: Show the approval step\n      ansible.builtin.debug:\n        msg: \"Approval by network lead before Deploy VLAN 10\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Approval by network lead before Deploy VLAN 10\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Approval by network lead before Deploy VLAN 10",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "AWX and Network Change Approval is the key idea here: AWX supports approval nodes in workflows, where a job pauses and waits for a named approver before continuing to the change step.",
        "approach": "Work through AWX and Network Change Approval step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-awx-network-teams-m2-l5",
      "slug": "netauto-ansible-awx-network-teams-m2-l5",
      "title": "AWX in Production",
      "concept": "Running AWX in production means backing up its database, keeping its execution environments pinned and reviewed, and limiting who can edit job templates and credentials. It also means watching job failures: a scheduled backup job that starts failing is a warning that something changed in the network. AWX is the control plane for network automation, so it gets the same care as any production system. Running AWX in production means backing up its database, keeping its execution environments pinned and reviewed, and limiting who can edit job templates and credentials.",
      "syntax": "AWX backup: database + projects, daily\nAWX upgrade: lab first, then production",
      "exampleCode": "AWX admin: only 2 people\nJob template edits: pull request on the project repo",
      "exampleLanguage": "ansible",
      "mistake": "Upgrading AWX in place on a Friday afternoon with no backup, and discovering the upgrade broke the execution environments.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate AWX in Production, but it does not work correctly.",
       "buggyCode": "$ awx upgrade   # Friday 16:00, no backup, no lab test",
       "fixedCode": "1. Back up the AWX database\n2. Test the upgrade in the lab\n3. Upgrade in a change window",
       "explanation": "AWX is production infrastructure, so it gets backups, lab-tested upgrades, and a change window like everything else it manages."
      },
      "exercise": {
       "title": "Practise AWX in Production",
       "type": "write-code",
       "instructions": "Write a playbook that stores the AWX production checklist items, renders each one with its status, writes it to a file, and prints \"[OK] job template edits via pull request\" with the debug module. This exercise practises AWX in Production.",
       "starterCode": "---\n- name: AWX in Production\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: AWX in Production\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the production checklist data\n      ansible.builtin.set_fact:\n        awx_production:\n          - {item: \"database backed up\", ok: true}\n          - {item: \"execution environments pinned\", ok: true}\n          - {item: \"job template edits via pull request\", ok: true}\n          - {item: \"only 2 admins\", ok: true}\n    - name: Render the production checklist\n      ansible.builtin.set_fact:\n        rendered: \"{% for c in awx_production %}[{{ 'OK' if c.ok else 'FAIL' }}] {{ c.item }}\\n{% endfor %}\"\n    - name: Write the rendered production checklist\n      ansible.builtin.copy:\n        dest: ./netauto-awx-production.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered production checklist\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the production checklist\n      ansible.builtin.assert:\n        that:\n          - \"'[OK] database backed up' in rendered\"\n          - \"'[OK] job template edits via pull request' in rendered\"\n        fail_msg: \"The rendered production checklist is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"AWX in production: backed up, pinned, and limited to the people who need it\"\n",
       "solutionExplanation": "The playbook renders the production checklist from data: the database backed up, execution environments pinned, template edits through pull requests, and admin access limited.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "[OK] job template edits via pull request",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Running AWX in production means backing up its database, keeping its execution environments pinned and reviewed, and limiting who can edit job templates and credentials.",
        "approach": "Store each production item with an ok flag, then loop over the items using an inline if to render the OK or FAIL mark.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: AWX for Network Teams",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises AWX for Network Teams Capstone.",
   "starterCode": "---\n- name: AWX for Network Teams capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: AWX for Network Teams capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-awx-network-teams.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for AWX for Network Teams\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for AWX for Network Teams",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "AWX for Network Teams Capstone is the key idea here: AWX for Network Teams brings the whole track together.",
    "approach": "Work through AWX for Network Teams Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "AWX for Network Teams Capstone Project",
   "description": "A small end-to-end project that puts AWX for Network Teams into practice.",
   "requirements": [
    "Use the core ideas of AWX for Network Teams in a working playbook.",
    "Apply at least three of these skills: AWX, Job templates, AWX inventories, AWX credentials.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates AWX for Network Teams correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-ansible-production-network",
  "slug": "netauto-ansible-production-network",
  "language": "ansible",
  "category": "devops",
  "title": "Production Network Ansible",
  "description": "Operate network Ansible in production: change windows, pre-change validation, rollback plans, credential hygiene, CI testing, and canary changes.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Change windows",
   "Pre-change validation",
   "Rollback plans",
   "Credential hygiene",
   "Audit logging",
   "CI testing",
   "Canary changes",
   "Incident response"
  ],
  "prerequisites": [
   "netauto-ansible-awx-network-teams"
  ],
  "analogy": "Learning {topic} is like learning to fly a plane: the checklist, the rehearsal, and the abort plan matter more than the takeoff itself.",
  "modules": [
   {
    "id": "netauto-ansible-production-network-m1",
    "title": "Production Network Ansible Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-ansible-production-network-m1-l1",
      "slug": "netauto-ansible-production-network-m1-l1",
      "title": "Change Windows and Network Automation",
      "concept": "A change window is an agreed time when network changes may run, chosen to limit the impact if something goes wrong, and production playbooks run only inside one. AWX schedules enforce the window, and the playbook itself can check the time and refuse to run outside it. Running a change outside its window is how a routine VLAN addition becomes an outage during business hours. A change window is an agreed time when network changes may run, chosen to limit the impact if something goes wrong, and production playbooks run only inside one.",
      "syntax": "Change window: Saturday 02:00-04:00\nAWX schedule: Deploy VLANs, Saturday 02:00",
      "exampleCode": "---\n- name: State the change window\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    change_window: \"Saturday 02:00-04:00\"\n  tasks:\n    - name: Show the window\n      ansible.builtin.debug:\n        msg: \"Change window is Saturday 02:00-04:00\"",
      "exampleLanguage": "ansible",
      "mistake": "Running a routing change at midday because the playbook was ready, and taking down the network while the business was using it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Change Windows and Network Automation, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook ospf.yml   # Tuesday 11:30, no window",
       "fixedCode": "$ ansible-playbook ospf.yml   # Saturday 02:00, approved window",
       "explanation": "The playbook being ready is not the same as the change being approved; the window, the approval, and the playbook must all line up."
      },
      "exercise": {
       "title": "Practise Change Windows and Network Automation",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Change window is Saturday 02:00-04:00\" with the debug module. This exercise practises Change Windows and Network Automation.",
       "starterCode": "---\n- name: Change Windows and Network Automation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Change Windows and Network Automation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the change window\n      ansible.builtin.set_fact:\n        change_window: \"Saturday 02:00-04:00\"\n    - name: Show the window\n      ansible.builtin.debug:\n        msg: \"Change window is Saturday 02:00-04:00\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Change window is Saturday 02:00-04:00\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Change window is Saturday 02:00-04:00",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Change Windows and Network Automation is the key idea here: A change window is an agreed time when network changes may run, chosen to limit the impact if something goes wrong, and production playbooks run only inside one.",
        "approach": "Work through Change Windows and Network Automation step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-production-network-m1-l2",
      "slug": "netauto-ansible-production-network-m1-l2",
      "title": "Pre-Change Validation",
      "concept": "Pre-change validation checks the network before a change runs: are the devices reachable, is the config as expected, and is there enough free space for a backup. A playbook that validates first fails fast with a clear message instead of failing halfway through a change. Validation tasks use read-only modules and assert, so they never change anything themselves. Pre-change validation checks the network before a change runs, such as whether devices are reachable and the config is as expected, and it fails fast instead of failing halfway through a change.",
      "syntax": "- name: Check reachability\n  ansible.builtin.wait_for:\n    host: \"{{ ansible_host }}\"\n    port: 22\n    timeout: 10",
      "exampleCode": "- name: Validate before changing\n  ansible.builtin.assert:\n    that:\n      - ansible_host is defined\n    fail_msg: \"Device has no management address\"",
      "exampleLanguage": "ansible",
      "mistake": "Skipping validation because the change is urgent, and discovering halfway through that one device was unreachable all along.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Pre-Change Validation, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook change.yml   # core2 unreachable, found at task 4 of 6",
       "fixedCode": "- name: Check every device first\n  ansible.builtin.wait_for:\n    host: \"{{ ansible_host }}\"\n    port: 22\n    timeout: 10",
       "explanation": "A ten-second reachability check before the change is cheaper than a half-applied change and a rollback at 3 a.m."
      },
      "exercise": {
       "title": "Practise Pre-Change Validation",
       "type": "write-code",
       "instructions": "Write a playbook that stores the pre-change validation checks, renders each one with its result, writes the report to a file, and prints \"[PASS] free space for backup\" with the debug module. This exercise practises Pre-Change Validation.",
       "starterCode": "---\n- name: Pre-Change Validation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Pre-Change Validation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the validation report data\n      ansible.builtin.set_fact:\n        prechange_checks:\n          - {check: \"device reachable\", result: pass}\n          - {check: \"management address defined\", result: pass}\n          - {check: \"free space for backup\", result: pass}\n    - name: Render the validation report\n      ansible.builtin.set_fact:\n        rendered: \"{% for c in prechange_checks %}[{{ c.result | upper }}] {{ c.check }}\\n{% endfor %}\"\n    - name: Write the rendered validation report\n      ansible.builtin.copy:\n        dest: ./netauto-production-prechange.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered validation report\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the validation report\n      ansible.builtin.assert:\n        that:\n          - \"'[PASS] device reachable' in rendered\"\n          - \"'[PASS] free space for backup' in rendered\"\n        fail_msg: \"The rendered validation report is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Validation passed before any change: fail fast with a clear message\"\n",
       "solutionExplanation": "The playbook renders the validation report from data: devices reachable, management addresses defined, and enough free space for a backup, so the change fails fast before it starts instead of halfway through.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "[PASS] free space for backup",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Pre-change validation checks the network before a change runs: are the devices reachable, is the config as expected, and is there enough free space for a backup.",
        "approach": "Store each check with its result as a dict, then loop over the checks and use the upper filter to render the result in capitals.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-production-network-m1-l3",
      "slug": "netauto-ansible-production-network-m1-l3",
      "title": "Rollback Plans for Network Changes",
      "concept": "A rollback plan is a tested way to return the network to its previous state, usually by restoring the backup taken before the change or by running a playbook that removes what the change added. Every change playbook should have a rollback playbook beside it, and the rollback must be tested in the lab before the change is approved. A change without a rollback plan is a gamble, not a plan. A rollback plan is a tested way to return the network to its previous state, usually by restoring the backup taken before the change.",
      "syntax": "change.yml + rollback.yml\nrollback: restore ./backups/core1-2026-11-24.cfg",
      "exampleCode": "---\n- name: State the rollback plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rollback_file: ./backups/core1-2026-11-24.cfg\n  tasks:\n    - name: Show the rollback\n      ansible.builtin.debug:\n        msg: \"Rollback restores ./backups/core1-2026-11-24.cfg\"",
      "exampleLanguage": "ansible",
      "mistake": "Writing a change playbook with no rollback, and improvising a fix from memory when the change breaks routing.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Rollback Plans for Network Changes, but it does not work correctly.",
       "buggyCode": "- name: Change OSPF\n  cisco.ios.ios_ospfv2:\n    config:\n      processes:\n        - process_id: 1\n    state: replaced   # no rollback written",
       "fixedCode": "---\n- name: Change OSPF\n  hosts: core\n  connection: network_cli\n  gather_facts: false\n  tasks:\n    - name: Back up first\n      cisco.ios.ios_config:\n        backup: true\n    - name: Change OSPF\n      cisco.ios.ios_ospfv2:\n        config:\n          processes:\n            - process_id: 1\n        state: replaced",
       "explanation": "The backup taken before the change is the rollback; without it, there is nothing to restore from when the change goes wrong."
      },
      "exercise": {
       "title": "Practise Rollback Plans for Network Changes",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Rollback restores ./backups/core1-2026-11-24.cfg\" with the debug module. This exercise practises Rollback Plans for Network Changes.",
       "starterCode": "---\n- name: Rollback Plans for Network Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Rollback Plans for Network Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the rollback facts\n      ansible.builtin.set_fact:\n        rollback_file: ./backups/core1-2026-11-24.cfg\n    - name: Show the rollback\n      ansible.builtin.debug:\n        msg: \"Rollback restores ./backups/core1-2026-11-24.cfg\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Rollback restores ./backups/core1-2026-11-24.cfg\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rollback restores ./backups/core1-2026-11-24.cfg",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rollback Plans for Network Changes is the key idea here: A rollback plan is a tested way to return the network to its previous state, usually by restoring the backup taken before the change or by running a playbook that removes what the change added.",
        "approach": "Work through Rollback Plans for Network Changes step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-production-network-m1-l4",
      "slug": "netauto-ansible-production-network-m1-l4",
      "title": "Vault and Credential Hygiene",
      "concept": "Credential hygiene means device passwords live only in Vault-encrypted files or an AWX credential, are rotated on a schedule, and are never written in plain text, chat, or tickets. Service accounts used by Ansible get the minimum privilege they need, and their passwords are rotated after any suspected exposure. A leaked Ansible credential is a network-wide credential, because the same account often reaches every device. Credential hygiene means device passwords live only in Vault-encrypted files or an AWX credential, are rotated on a schedule, and are never written in plain text.",
      "syntax": "ansible-vault encrypt group_vars/all/vault.yml\nRotation: every 90 days, or after any exposure",
      "exampleCode": "ansible_password: \"{{ vault_device_password }}\"   # encrypted",
      "exampleLanguage": "ansible",
      "mistake": "Sharing one admin password across every device and every engineer, so a single leak compromises the whole network and nobody knows who used it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Vault and Credential Hygiene, but it does not work correctly.",
       "buggyCode": "ansible_user: admin\nansible_password: same-on-every-device",
       "fixedCode": "ansible_user: netops-automation   # per-team service account, Vault-encrypted, rotated quarterly",
       "explanation": "One shared credential is one shared failure; per-team service accounts with Vault storage and rotation limit the blast radius of any leak."
      },
      "exercise": {
       "title": "Check your understanding: Vault and Credential Hygiene",
       "type": "multiple-choice",
       "instructions": "Which statement about Vault and Credential Hygiene is correct?",
       "starterCode": "",
       "solution": "Credential hygiene means device passwords live only in Vault-encrypted files or an AWX credential, are rotated on a schedule, and are never written in plain text, chat, or tickets.",
       "solutionExplanation": "Credential hygiene means device passwords live only in Vault-encrypted files or an AWX credential, are rotated on a schedule, and are never written in plain text, chat, or tickets. The other options are false: Vault and Credential Hygiene is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Credential hygiene means device passwords live only in Vault-encrypted files or an AWX credential, are rotated on a schedule, and are never written in plain text, chat, or tickets.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Vault and Credential Hygiene from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Vault and Credential Hygiene can only be used once in a program",
        "Vault and Credential Hygiene requires a separate paid licence to use",
        "Vault and Credential Hygiene was removed from Ansible in the latest version",
        "Credential hygiene means device passwords live only in Vault-encrypted files or an AWX credential, are rotated on a schedule, and are never written in plain text, chat, or tickets.",
        "Vault and Credential Hygiene only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-ansible-production-network-m1-l5",
      "slug": "netauto-ansible-production-network-m1-l5",
      "title": "Logging and Audit Trails",
      "concept": "Logging and audit trails record every Ansible run: the playbook, the inventory, who launched it, and the recap, so any change can be traced back to its author. AWX keeps job history automatically, while command-line runs should log to a file with ANSIBLE_LOG_PATH or a callback plugin. Audit logs are kept for months, because the question who changed this usually arrives long after the change. Logging and audit trails record every Ansible run, including the playbook, the inventory, who launched it, and the recap, so any change can be traced back to its author.",
      "syntax": "ANSIBLE_LOG_PATH=/var/log/ansible.log\nAWX: job history retained 365 days",
      "exampleCode": "---\n- name: Record the audit entry\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    audit_entry: \"2026-11-24 deepak ran backup.yml on Production\"\n  tasks:\n    - name: Write the audit line\n      ansible.builtin.copy:\n        dest: ./netauto-audit.txt\n        content: \"2026-11-24 deepak ran backup.yml on Production\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Running production playbooks from a laptop with no logging, so the team cannot answer who changed the core switch last Tuesday.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Logging and Audit Trails, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook change.yml   # no log, no record",
       "fixedCode": "$ ANSIBLE_LOG_PATH=/var/log/ansible.log ansible-playbook change.yml",
       "explanation": "A run without a log is a change without a witness; logging every run to a central file or AWX job history makes every change traceable."
      },
      "exercise": {
       "title": "Practise Logging and Audit Trails",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Audit entry recorded for backup.yml\" with the debug module. This exercise practises Logging and Audit Trails.",
       "starterCode": "---\n- name: Logging and Audit Trails\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Logging and Audit Trails\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the audit line\n      ansible.builtin.copy:\n        dest: ./netauto-audit.txt\n        content: \"2026-11-24 deepak ran backup.yml on Production\"\n        mode: \"0644\"\n    - name: Confirm the audit entry\n      ansible.builtin.debug:\n        msg: \"Audit entry recorded for backup.yml\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Audit entry recorded for backup.yml\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Audit entry recorded for backup.yml",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Logging and Audit Trails is the key idea here: Logging and audit trails record every Ansible run: the playbook, the inventory, who launched it, and the recap, so any change can be traced back to its author.",
        "approach": "Work through Logging and Audit Trails step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-ansible-production-network-m2",
    "title": "Production Network Ansible in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-ansible-production-network-m2-l1",
      "slug": "netauto-ansible-production-network-m2-l1",
      "title": "Testing Playbooks in CI",
      "concept": "Testing playbooks in CI means every pull request runs syntax checks, linting with ansible-lint, a localhost render test, and a lab run before it can merge. The CI pipeline is the gate that stops a YAML typo or a wrong VLAN from reaching production. Playbooks that pass CI are the only ones AWX is allowed to run, which closes the loop between review and deployment. Testing playbooks in CI means every pull request runs syntax checks, linting with ansible-lint, a localhost render test, and a lab run before it can merge.",
      "syntax": "ansible-playbook --syntax-check site.yml\nansible-lint site.yml\nmolecule test",
      "exampleCode": "CI pipeline: syntax-check -> ansible-lint -> localhost render -> lab run",
      "exampleLanguage": "ansible",
      "mistake": "Merging a playbook that was only tested by its author on their laptop, and finding the YAML error during the production change window.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Testing Playbooks in CI, but it does not work correctly.",
       "buggyCode": "$ git push origin main   # no CI, straight to production",
       "fixedCode": "CI: syntax-check, ansible-lint, render test, lab run, then merge",
       "explanation": "A pull request without CI is a review of intentions; CI proves the playbook runs, lints clean, and behaves in the lab before anyone approves it."
      },
      "exercise": {
       "title": "Practise Testing Playbooks in CI",
       "type": "write-code",
       "instructions": "Write a playbook that stores the CI pipeline stages in order, renders them as numbered stages with a final verdict, writes it to a file, and prints \"CI stage 4: lab run\" with the debug module. This exercise practises Testing Playbooks in CI.",
       "starterCode": "---\n- name: Testing Playbooks in CI\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Testing Playbooks in CI\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the CI pipeline data\n      ansible.builtin.set_fact:\n        ci_stages:\n          - syntax-check\n          - ansible-lint\n          - localhost render\n          - lab run\n    - name: Render the CI pipeline\n      ansible.builtin.set_fact:\n        rendered: \"{% for s in ci_stages %}CI stage {{ loop.index }}: {{ s }}\\n{% endfor %}CI green: playbook may run in AWX\"\n    - name: Write the rendered CI pipeline\n      ansible.builtin.copy:\n        dest: ./netauto-production-ci.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered CI pipeline\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the CI pipeline\n      ansible.builtin.assert:\n        that:\n          - \"'CI stage 1: syntax-check' in rendered\"\n          - \"'CI stage 4: lab run' in rendered\"\n        fail_msg: \"The rendered CI pipeline is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"CI green: only tested playbooks are allowed to run\"\n",
       "solutionExplanation": "The playbook renders the CI gate from data: syntax check, linting, a localhost render test, and a lab run, and only a playbook that passes all four may run in AWX.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "CI stage 4: lab run",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing playbooks in CI means every pull request runs syntax checks, linting with ansible-lint, a localhost render test, and a lab run before it can merge.",
        "approach": "Store the stages as an ordered list, then use loop.index in the template to number each stage and finish with the verdict line.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     },
     {
      "id": "netauto-ansible-production-network-m2-l2",
      "slug": "netauto-ansible-production-network-m2-l2",
      "title": "Canary Changes on One Device",
      "concept": "A canary change applies a new playbook to one device first, watches it for a period, and only then rolls out to the rest of the fleet. The canary device is chosen to be representative but not critical, such as one access switch in a lab building. If the canary fails, only one device is affected and the rollback is small; if it succeeds, the rollout proceeds with confidence. A canary change applies a new playbook to one device first, watches it for a period, and only then rolls out to the rest of the fleet.",
      "syntax": "ansible-playbook site.yml --limit access-canary\n# wait, verify, then:\nansible-playbook site.yml --limit access",
      "exampleCode": "---\n- name: Canary rollout plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    canary: access-canary\n    fleet: access\n  tasks:\n    - name: Show the canary plan\n      ansible.builtin.debug:\n        msg: \"Canary first: access-canary, then the access fleet\"",
      "exampleLanguage": "ansible",
      "mistake": "Rolling a new playbook out to all forty access switches at once, so a bug that would have affected one device affects all of them.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Canary Changes on One Device, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml --limit access   # all 40 at once",
       "fixedCode": "$ ansible-playbook site.yml --limit access-canary\n$ ansible-playbook site.yml --limit access   # after the canary proves clean",
       "explanation": "A canary limits the blast radius of a bad playbook to one device; a full-fleet first run bets the whole network on an untested change."
      },
      "exercise": {
       "title": "Practise Canary Changes on One Device",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Canary first: access-canary, then the access fleet\" with the debug module. This exercise practises Canary Changes on One Device.",
       "starterCode": "---\n- name: Canary Changes on One Device\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Canary Changes on One Device\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the canary facts\n      ansible.builtin.set_fact:\n        canary: access-canary\n        fleet: access\n    - name: Show the canary plan\n      ansible.builtin.debug:\n        msg: \"Canary first: access-canary, then the access fleet\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Canary first: access-canary, then the access fleet\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Canary first: access-canary, then the access fleet",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Canary Changes on One Device is the key idea here: A canary change applies a new playbook to one device first, watches it for a period, and only then rolls out to the rest of the fleet.",
        "approach": "Work through Canary Changes on One Device step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-production-network-m2-l3",
      "slug": "netauto-ansible-production-network-m2-l3",
      "title": "Incident Response with Ansible",
      "concept": "Incident response with Ansible uses playbooks to gather facts fast: interface status, BGP neighbours, and recent config changes across the affected devices in one run. A diagnostic playbook is read-only, so it can run during an incident without risk of making things worse. The same playbooks that configure the network become the fastest way to understand it when it breaks. Incident response with Ansible uses read-only diagnostic playbooks to gather interface status, BGP neighbours, and recent config changes across affected devices in one run.",
      "syntax": "- name: Diagnose the outage\n  cisco.ios.ios_command:\n    commands:\n      - show ip interface brief\n      - show ip bgp summary\n  changed_when: false",
      "exampleCode": "ansible-playbook diagnose.yml --limit affected-site",
      "exampleLanguage": "ansible",
      "mistake": "Logging into devices one by one during an outage to run show commands, while the incident drags on and nobody has a full picture.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Incident Response with Ansible, but it does not work correctly.",
       "buggyCode": "$ ssh core1; show ip bgp summary\n$ ssh core2; show ip bgp summary   # one device at a time",
       "fixedCode": "$ ansible-playbook diagnose.yml --limit affected-site   # all devices at once",
       "explanation": "A diagnostic playbook queries every affected device in parallel and returns structured facts; manual logins serialize the same work and hide the pattern."
      },
      "exercise": {
       "title": "Check your understanding: Incident Response with Ansible",
       "type": "multiple-choice",
       "instructions": "Which statement about Incident Response with Ansible is correct?",
       "starterCode": "",
       "solution": "Incident response with Ansible uses playbooks to gather facts fast: interface status, BGP neighbours, and recent config changes across the affected devices in one run.",
       "solutionExplanation": "Incident response with Ansible uses playbooks to gather facts fast: interface status, BGP neighbours, and recent config changes across the affected devices in one run. The other options are false: Incident Response with Ansible is an ordinary, freely available part of Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Incident response with Ansible uses playbooks to gather facts fast: interface status, BGP neighbours, and recent config changes across the affected devices in one run.",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Incident Response with Ansible from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Incident Response with Ansible can only be used once in a program",
        "Incident Response with Ansible requires a separate paid licence to use",
        "Incident response with Ansible uses playbooks to gather facts fast: interface status, BGP neighbours, and recent config changes across the affected devices in one run.",
        "Incident Response with Ansible was removed from Ansible in the latest version",
        "Incident Response with Ansible only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-ansible-production-network-m2-l4",
      "slug": "netauto-ansible-production-network-m2-l4",
      "title": "Documenting Network Automation",
      "concept": "Documenting network automation means every playbook has a README explaining what it does, which inventory it targets, and how to roll it back, and every role documents its variables. Documentation also covers the runbooks: what to do when a job fails, who approves changes, and where the backups live. Undocumented automation is a single point of failure wearing the author's name. Documenting network automation means every playbook has a README explaining what it does, which inventory it targets, and how to roll it back, and every role documents its variables.",
      "syntax": "playbooks/backup.yml\nplaybooks/README.md: what, where, rollback, owner",
      "exampleCode": "---\n- name: Record the runbook entry\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    runbook: \"Backup all configs: run backup.yml, verify in Git, owner network-ops\"\n  tasks:\n    - name: Write the runbook entry\n      ansible.builtin.copy:\n        dest: ./netauto-runbook.txt\n        content: \"Backup all configs: run backup.yml, verify in Git, owner network-ops\"\n        mode: \"0644\"",
      "exampleLanguage": "ansible",
      "mistake": "Keeping the only knowledge of a playbook in its author's head, so the playbook becomes unusable the week the author is on leave.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Documenting Network Automation, but it does not work correctly.",
       "buggyCode": "# playbook with no README, no comments, no owner",
       "fixedCode": "# README.md: what it does, inventory, rollback, owner, on-call",
       "explanation": "A playbook without a README is a mystery the team inherits; a short README with purpose, inventory, rollback, and owner makes it operable by anyone."
      },
      "exercise": {
       "title": "Practise Documenting Network Automation",
       "type": "write-code",
       "instructions": "Write a playbook that completes the task for this lesson and prints \"Runbook entry recorded for backup.yml\" with the debug module. This exercise practises Documenting Network Automation.",
       "starterCode": "---\n- name: Documenting Network Automation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Documenting Network Automation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Write the runbook entry\n      ansible.builtin.copy:\n        dest: ./netauto-runbook.txt\n        content: \"Backup all configs: run backup.yml, verify in Git, owner network-ops\"\n        mode: \"0644\"\n    - name: Confirm the runbook entry\n      ansible.builtin.debug:\n        msg: \"Runbook entry recorded for backup.yml\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Runbook entry recorded for backup.yml\"\n",
       "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Runbook entry recorded for backup.yml",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Documenting Network Automation is the key idea here: Documenting network automation means every playbook has a README explaining what it does, which inventory it targets, and how to roll it back, and every role documents its variables.",
        "approach": "Work through Documenting Network Automation step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-ansible-production-network-m2-l5",
      "slug": "netauto-ansible-production-network-m2-l5",
      "title": "Production Readiness Review",
      "concept": "A production readiness review checks the whole system before a playbook is trusted with the live network: idempotency proven by two runs, backups and rollback tested, credentials in Vault or AWX, CI green, canary plan written, and documentation in place. The review is a checklist, not a feeling, and any item that fails blocks the rollout. Passing it means the team, not just the author, is ready to run the playbook.",
      "syntax": "A production readiness review checks the whole system before a playbook is trusted with the live network, and any item that fails blocks the rollout.",
      "exampleCode": "1. Idempotency proven\n2. Backup and rollback tested\n3. Credentials in Vault/AWX\n4. CI green\n5. Canary plan written",
      "exampleLanguage": "ansible",
      "mistake": "Declaring a playbook production-ready because it worked once on the author's laptop, with no backup test, no rollback, and no review.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Production Readiness Review, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook site.yml   # worked once, ship it",
       "fixedCode": "Readiness review: two-run test, restore drill, Vault check, CI green, canary plan",
       "explanation": "Worked once is not production-ready; the review proves the playbook is idempotent, recoverable, credentialed, tested, and documented before it touches production."
      },
      "exercise": {
       "title": "Practise Production Readiness Review",
       "type": "write-code",
       "instructions": "Write a playbook that stores the production readiness review items, renders each one with its status, writes it to a file, and prints \"5. [READY] canary plan written\" with the debug module. This exercise practises Production Readiness Review.",
       "starterCode": "---\n- name: Production Readiness Review\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Production Readiness Review\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the readiness review data\n      ansible.builtin.set_fact:\n        readiness_items:\n          - \"idempotency proven by two runs\"\n          - \"backup and rollback tested\"\n          - \"credentials in Vault or AWX\"\n          - \"CI green\"\n          - \"canary plan written\"\n    - name: Render the readiness review\n      ansible.builtin.set_fact:\n        rendered: \"{% for i in readiness_items %}{{ loop.index }}. [READY] {{ i }}\\n{% endfor %}\"\n    - name: Write the rendered readiness review\n      ansible.builtin.copy:\n        dest: ./netauto-production-readiness.txt\n        content: \"{{ rendered }}\"\n        mode: \"0644\"\n    - name: Show the rendered readiness review\n      ansible.builtin.debug:\n        msg: \"{{ rendered }}\"\n    - name: Verify the readiness review\n      ansible.builtin.assert:\n        that:\n          - \"'1. [READY] idempotency proven by two runs' in rendered\"\n          - \"'5. [READY] canary plan written' in rendered\"\n        fail_msg: \"The rendered readiness review is missing a required line.\"\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Readiness review passed: the team, not just the author, is ready\"\n",
       "solutionExplanation": "The playbook renders the readiness checklist from data: idempotency proven, backups and rollback tested, credentials in Vault or AWX, CI green, and a canary plan written.",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "5. [READY] canary plan written",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A production readiness review checks the whole system before a playbook is trusted with the live network: idempotency proven by two runs, backups and rollback tested, credentials in Vault or AWX, CI green, and a canary plan written.",
        "approach": "Store the review items as a list, then use loop.index in the template to number each item with its READY mark.",
        "structure": "Set the data with set_fact, render it into a variable, write it with copy, show it with debug, and check it with assert."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Production Network Ansible",
   "type": "write-code",
   "instructions": "Build a capstone playbook that sets device facts, writes a config file, loops over three devices, and prints a completion message. This exercise practises Production Network Ansible Capstone.",
   "starterCode": "---\n- name: Production Network Ansible capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Production Network Ansible capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Set the device facts\n      ansible.builtin.set_fact:\n        site_name: campus-core\n        device_count: 3\n    - name: Write the capstone config\n      ansible.builtin.copy:\n        dest: ./netauto-capstone-netauto-ansible-production-network.txt\n        content: \"site={{ site_name }} devices={{ device_count }}\"\n        mode: \"0644\"\n    - name: Show each device\n      ansible.builtin.debug:\n        msg: \"Device {{ item }} ready\"\n      loop:\n        - core1\n        - core2\n        - core3\n    - name: Confirm completion\n      ansible.builtin.debug:\n        msg: \"Capstone complete for Production Network Ansible\"\n",
   "solutionExplanation": "The solution follows the instructions exactly: it performs the steps described and produces the required result.",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "Capstone complete for Production Network Ansible",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Production Network Ansible Capstone is the key idea here: Production Network Ansible brings the whole track together.",
    "approach": "Work through Production Network Ansible Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Production Network Ansible Capstone Project",
   "description": "A small end-to-end project that puts Production Network Ansible into practice.",
   "requirements": [
    "Use the core ideas of Production Network Ansible in a working playbook.",
    "Apply at least three of these skills: Change windows, Pre-change validation, Rollback plans, Credential hygiene.",
    "Keep the playbook idempotent: running it twice changes nothing the second time.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates Production Network Ansible correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
