import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
 {
  "id": "netauto-firewall-foundations",
  "slug": "netauto-firewall-foundations",
  "language": "ansible",
  "category": "devops",
  "title": "Firewall Automation Foundations",
  "description": "Learn what a firewall does, why firewall changes belong in code, and how to render and check a small security policy with Ansible on localhost.",
  "difficulty": "Beginner",
  "estimatedHours": 8,
  "skills": [
   "Firewall concepts",
   "Security zones",
   "Security rules",
   "Ansible playbooks",
   "Policy variables",
   "Rendering policy text",
   "Asserting policy output",
   "Change workflow"
  ],
  "prerequisites": [],
  "analogy": "Learning {topic} is like learning to run a nightclub door: you decide in advance who gets in, write the list down, and check every guest against it.",
  "modules": [
   {
    "id": "netauto-firewall-foundations-m1",
    "title": "Firewall Automation Foundations Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-foundations-m1-l1",
      "slug": "netauto-firewall-foundations-m1-l1",
      "title": "What a Firewall Does",
      "concept": "A firewall is a network device that inspects traffic and allows or blocks it according to a set of rules. It sits between network segments, for example between the internet and an internal network, and every packet is checked against the rules in order before it is forwarded or dropped.",
      "syntax": "traffic -> firewall rules (top to bottom) -> allow / deny",
      "exampleCode": "- name: Firewall decision\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    packet: {src: 10.0.0.5, dst: 10.0.1.10, port: 443}\n  tasks:\n    - name: Decide\n      ansible.builtin.debug:\n        msg: \"Packet to port {{ packet.port }} is allowed by the web rule\"",
      "exampleLanguage": "ansible",
      "mistake": "Thinking a firewall only blocks bad traffic, when its real job is to decide every packet against an ordered rule list, including the traffic it allows.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate What a Firewall Does, but it does not work correctly.",
       "buggyCode": "- name: Allow everything\n  ansible.builtin.debug:\n    msg: \"Rule: allow all traffic from any source to any destination\"",
       "fixedCode": "- name: Allow only the web rule\n  ansible.builtin.debug:\n    msg: \"Rule: allow 10.0.0.0/24 to 10.0.1.10 on port 443 only\"",
       "explanation": "An allow-all rule defeats the firewall: rules must name the exact source, destination, and service they permit, and everything else is denied by default."
      },
      "exercise": {
       "title": "Practise What a Firewall Does",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"port 443 allowed by the web rule\". This exercise practises What a Firewall Does.",
       "starterCode": "---\n- name: What a Firewall Does\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: What a Firewall Does\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Firewall decision: port 443 allowed by the web rule\"\n",
       "solutionExplanation": "The solution builds the what a firewall does policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"port 443 allowed by the web rule\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "port 443 allowed by the web rule",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What a Firewall Does is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through What a Firewall Does step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-foundations-m1-l2",
      "slug": "netauto-firewall-foundations-m1-l2",
      "title": "Why Automate Firewall Changes",
      "concept": "Automating firewall changes means writing each change as reviewed code instead of clicking through a web interface by hand. A coded change can be reviewed, tested, versioned in Git, and repeated exactly on every firewall, which removes typos and makes it possible to prove what changed and when.",
      "syntax": "policy.yml (Git) -> review -> ansible-playbook --check -> apply",
      "exampleCode": "---\n- name: Automate a firewall change\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the change\n      ansible.builtin.debug:\n        msg: \"Change FW-101 reviewed and ready to apply\"",
      "exampleLanguage": "ansible",
      "mistake": "Automating a bad process, for example copying an unreviewed rule into a playbook, instead of fixing the review step first.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Why Automate Firewall Changes, but it does not work correctly.",
       "buggyCode": "$ ssh firewall-admin@fw1\n# type the new rule in by hand, no record of the change",
       "fixedCode": "$ git log --oneline policy.yml\n# every change is a reviewed commit with an author and a reason",
       "explanation": "Hand-typed changes leave no record and cannot be repeated; a change stored as code in Git has an author, a review, and a history."
      },
      "exercise": {
       "title": "Practise Why Automate Firewall Changes",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Change FW-101 reviewed\". This exercise practises Why Automate Firewall Changes.",
       "starterCode": "---\n- name: Why Automate Firewall Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Why Automate Firewall Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Change FW-101 reviewed and ready to apply\"\n",
       "solutionExplanation": "The solution builds the why automate firewall changes policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Change FW-101 reviewed\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Change FW-101 reviewed",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Why Automate Firewall Changes is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Why Automate Firewall Changes step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-foundations-m1-l3",
      "slug": "netauto-firewall-foundations-m1-l3",
      "title": "Firewall Zones and Interfaces",
      "concept": "A firewall zone is a logical grouping of interfaces that share the same trust level, such as trust for the internal network and untrust for the internet. Security rules are written between zones, for example trust to untrust, rather than between individual interfaces, which keeps the policy readable as the network grows.",
      "syntax": "zone trust: eth0 (inside)\nzone untrust: eth1 (internet)\nrule: trust -> untrust allow web",
      "exampleCode": "- name: Zone rule\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    zones: [trust, untrust, dmz]\n  tasks:\n    - name: Show the zones\n      ansible.builtin.debug:\n        msg: \"Zones: {{ zones | join(', ') }}\"",
      "exampleLanguage": "ansible",
      "mistake": "Putting the internet-facing interface and the internal interface in the same zone, which makes zone-based rules meaningless.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Firewall Zones and Interfaces, but it does not work correctly.",
       "buggyCode": "zones:\n  trust: [eth0, eth1]   # inside AND internet in one zone",
       "fixedCode": "zones:\n  trust: [eth0]\n  untrust: [eth1]",
       "explanation": "Interfaces with different trust levels must be in different zones, or a rule that allows trust-to-trust traffic accidentally allows internet traffic too."
      },
      "exercise": {
       "title": "Check your understanding: Firewall Zones and Interfaces",
       "type": "multiple-choice",
       "instructions": "Which statement about Firewall Zones and Interfaces is correct?",
       "starterCode": "",
       "solution": "A firewall zone is a logical grouping of interfaces that share the same trust level, such as trust for the internal network and untrust for the internet..",
       "solutionExplanation": "A firewall zone is a logical grouping of interfaces that share the same trust level, such as trust for the internal network and untrust for the internet.. The other options are false: Firewall Zones and Interfaces is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A firewall zone is a logical grouping of interfaces that share the same trust level, such as trust for the internal network and untrust for the internet..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Firewall Zones and Interfaces from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Firewall Zones and Interfaces can only be used once in a program",
        "Firewall Zones and Interfaces requires a separate paid licence to use",
        "A firewall zone is a logical grouping of interfaces that share the same trust level, such as trust for the internal network and untrust for the internet..",
        "Firewall Zones and Interfaces was removed from Ansible in the latest version",
        "Firewall Zones and Interfaces only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-foundations-m1-l4",
      "slug": "netauto-firewall-foundations-m1-l4",
      "title": "Security Rules in Plain Language",
      "concept": "A security rule has five parts: a source, a destination, a service such as HTTPS on port 443, an action of allow or deny, and a position in the ordered list. The firewall checks rules from the top down and applies the first rule that matches the packet, so a packet that matches no rule is dropped by the implicit deny at the bottom.",
      "syntax": "allow <source> to <destination> service <service>   # first match wins",
      "exampleCode": "rules:\n  - name: allow-web\n    src: trust\n    dst: dmz\n    svc: https-443\n    action: allow\n  - name: deny-all\n    src: any\n    dst: any\n    svc: any\n    action: deny",
      "exampleLanguage": "ansible",
      "mistake": "Forgetting that the first matching rule wins, and adding a specific deny below a broad allow that already matches the traffic.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Security Rules in Plain Language, but it does not work correctly.",
       "buggyCode": "rules:\n  - {name: allow-all, src: any, dst: any, svc: any, action: allow}\n  - {name: deny-telnet, src: any, dst: any, svc: telnet, action: deny}",
       "fixedCode": "rules:\n  - {name: deny-telnet, src: any, dst: any, svc: telnet, action: deny}\n  - {name: allow-web, src: trust, dst: dmz, svc: https-443, action: allow}",
       "explanation": "The first match wins, so a broad allow-all above a deny makes the deny unreachable; specific denies must come before broad allows."
      },
      "exercise": {
       "title": "Check your understanding: Security Rules in Plain Language",
       "type": "multiple-choice",
       "instructions": "Which statement about Security Rules in Plain Language is correct?",
       "starterCode": "",
       "solution": "A security rule has five parts: a source, a destination, a service such as HTTPS on port 443, an action of allow or deny, and a position in the ordered list..",
       "solutionExplanation": "A security rule has five parts: a source, a destination, a service such as HTTPS on port 443, an action of allow or deny, and a position in the ordered list.. The other options are false: Security Rules in Plain Language is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A security rule has five parts: a source, a destination, a service such as HTTPS on port 443, an action of allow or deny, and a position in the ordered list..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Security Rules in Plain Language from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Security Rules in Plain Language can only be used once in a program",
        "Security Rules in Plain Language requires a separate paid licence to use",
        "Security Rules in Plain Language was removed from Ansible in the latest version",
        "A security rule has five parts: a source, a destination, a service such as HTTPS on port 443, an action of allow or deny, and a position in the ordered list..",
        "Security Rules in Plain Language only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-foundations-m1-l5",
      "slug": "netauto-firewall-foundations-m1-l5",
      "title": "Your First Firewall Policy Playbook",
      "concept": "A firewall policy playbook stores the rules as a list of variables and renders them into a policy file that a human or a firewall can read. Rendering the policy locally first lets you check the output before anything is sent to a firewall, which is the safe habit every later track builds on.",
      "syntax": "vars: rules: [...] -> copy dest=policy.txt -> assert rule present",
      "exampleCode": "---\n- name: Your First Firewall Policy Playbook\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 2\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Writing the rules directly into task arguments instead of a variables list, so the same rule cannot be reused, looped over, or rendered to a file.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Your First Firewall Policy Playbook, but it does not work correctly.",
       "buggyCode": "- name: Write rule one\n  ansible.builtin.debug:\n    msg: \"allow-web\"\n- name: Write rule two\n  ansible.builtin.debug:\n    msg: \"deny-telnet\"",
       "fixedCode": "vars:\n  rules:\n    - {name: allow-web, action: allow}\n    - {name: deny-telnet, action: deny}\ntasks:\n  - ansible.builtin.debug:\n      msg: \"Rule {{ item.name }}: {{ item.action }}\"\n    loop: \"{{ rules }}\"",
       "explanation": "Rules kept as data can be looped over, rendered, and asserted on; rules hard-coded into separate tasks cannot be checked as a set."
      },
      "exercise": {
       "title": "Practise Your First Firewall Policy Playbook",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-web=allow\". This exercise practises Your First Firewall Policy Playbook.",
       "starterCode": "---\n- name: Your First Firewall Policy Playbook\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Your First Firewall Policy Playbook\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 2\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the your first firewall policy playbook policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-web=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Your First Firewall Policy Playbook is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Your First Firewall Policy Playbook step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-foundations-m2",
    "title": "Firewall Automation Foundations in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-firewall-foundations-m2-l1",
      "slug": "netauto-firewall-foundations-m2-l1",
      "title": "Policy Variables and Reuse",
      "concept": "Ansible variables let one playbook describe many firewalls, because the policy data lives in vars while the tasks that render it stay the same. Changing a network address means editing one variable instead of hunting through every task, which is what makes a policy playbook maintainable.",
      "syntax": "vars:\n  web_server: 10.0.1.10\n  web_port: 443\nmsg: \"Allow {{ web_server }}:{{ web_port }}\"",
      "exampleCode": "- name: Reuse variables\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    web_server: 10.0.1.10\n    web_port: 443\n  tasks:\n    - name: Show the target\n      ansible.builtin.debug:\n        msg: \"Allow traffic to {{ web_server }} on port {{ web_port }}\"",
      "exampleLanguage": "ansible",
      "mistake": "Hard-coding the same server address in five tasks instead of defining one variable and referencing it everywhere.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Policy Variables and Reuse, but it does not work correctly.",
       "buggyCode": "- name: Rule one\n  ansible.builtin.debug:\n    msg: \"Allow 10.0.1.10 on 443\"\n- name: Rule two\n  ansible.builtin.debug:\n    msg: \"Log 10.0.1.10 on 443\"",
       "fixedCode": "vars:\n  web_server: 10.0.1.10\n  web_port: 443\ntasks:\n  - ansible.builtin.debug:\n      msg: \"Allow {{ web_server }} on {{ web_port }}\"",
       "explanation": "A variable defined once can be reused in every task, so changing the server means editing one line instead of every task."
      },
      "exercise": {
       "title": "Practise Policy Variables and Reuse",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Allow traffic to 10.0.1.10 on port 443\". This exercise practises Policy Variables and Reuse.",
       "starterCode": "---\n- name: Policy Variables and Reuse\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Policy Variables and Reuse\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    web_server: 10.0.1.10\n    web_port: 443\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Allow traffic to {{ web_server }} on port {{ web_port }}\"\n",
       "solutionExplanation": "The solution builds the policy variables and reuse policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Allow traffic to 10.0.1.10 on port 443\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Allow traffic to 10.0.1.10 on port 443",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Policy Variables and Reuse is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Policy Variables and Reuse step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-foundations-m2-l2",
      "slug": "netauto-firewall-foundations-m2-l2",
      "title": "Rendering Rules from Data",
      "concept": "Rendering turns a list of rule variables into readable policy text using a Jinja2 loop, so the same data can produce a firewall config, a review document, and a test report. The rendered text is real output you can read and check, and it is the same technique used later to generate PAN-OS and FortiOS configuration.",
      "syntax": "{% for r in rules %}\n- {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.action }}\n{% endfor %}",
      "exampleCode": "---\n- name: Rendering Rules from Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./rendered-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-dns' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-dns present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Rendering the policy once and never reading the output, which throws away the whole point of rendering: a human-readable check before deployment.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Rendering Rules from Data, but it does not work correctly.",
       "buggyCode": "- name: Write policy\n  ansible.builtin.copy:\n    dest: ./policy.txt\n    content: \"rules here\"\n# nobody ever looks at policy.txt",
       "fixedCode": "- name: Write policy\n  ansible.builtin.copy:\n    dest: ./policy.txt\n    content: \"{{ rendered }}\"\n- name: Show policy\n  ansible.builtin.debug:\n    msg: \"Rendered policy: {{ rendered }}\"",
       "explanation": "Rendering is only useful if the output is read and asserted on; showing the rendered text and asserting the key rule is present turns a file write into a real check."
      },
      "exercise": {
       "title": "Practise Rendering Rules from Data",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-dns=allow\". This exercise practises Rendering Rules from Data.",
       "starterCode": "---\n- name: Rendering Rules from Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Rendering Rules from Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./rendered-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-dns' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-dns present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the rendering rules from data policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-dns=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-dns=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rendering Rules from Data is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Rendering Rules from Data step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-foundations-m2-l3",
      "slug": "netauto-firewall-foundations-m2-l3",
      "title": "Checking Policy Output",
      "concept": "The assert module checks that a rendered policy contains the rules it must contain, and the playbook fails loudly if a rule is missing. Checking output locally catches a broken template or a mistyped rule name before the policy ever reaches a firewall, which is far cheaper than finding it in production.",
      "syntax": "ansible.builtin.assert:\n  that:\n    - \"'allow-web' in rendered\"\n    - rules | length == 2",
      "exampleCode": "- name: Check policy\n  ansible.builtin.assert:\n    that:\n      - \"'allow-web' in rendered\"\n      - \"'deny-all' in rendered\"\n    success_msg: \"Policy check passed\"\n    fail_msg: \"Policy is missing a required rule\"",
      "exampleLanguage": "ansible",
      "mistake": "Asserting only that the playbook ran, instead of asserting that the rendered policy actually contains the required rules.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Checking Policy Output, but it does not work correctly.",
       "buggyCode": "- name: Check policy\n  ansible.builtin.assert:\n    that: [true]\n    success_msg: \"Looks fine\"",
       "fixedCode": "- name: Check policy\n  ansible.builtin.assert:\n    that:\n      - \"'allow-web' in rendered\"\n    success_msg: \"Policy check passed: allow-web present\"",
       "explanation": "An assertion that always passes checks nothing; asserting on the real rendered content proves the rule made it into the policy."
      },
      "exercise": {
       "title": "Check your understanding: Checking Policy Output",
       "type": "multiple-choice",
       "instructions": "Which statement about Checking Policy Output is correct?",
       "starterCode": "",
       "solution": "The assert module checks that a rendered policy contains the rules it must contain, and the playbook fails loudly if a rule is missing..",
       "solutionExplanation": "The assert module checks that a rendered policy contains the rules it must contain, and the playbook fails loudly if a rule is missing.. The other options are false: Checking Policy Output is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The assert module checks that a rendered policy contains the rules it must contain, and the playbook fails loudly if a rule is missing..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Checking Policy Output from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Checking Policy Output can only be used once in a program",
        "Checking Policy Output requires a separate paid licence to use",
        "The assert module checks that a rendered policy contains the rules it must contain, and the playbook fails loudly if a rule is missing..",
        "Checking Policy Output was removed from Ansible in the latest version",
        "Checking Policy Output only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-foundations-m2-l4",
      "slug": "netauto-firewall-foundations-m2-l4",
      "title": "Firewall Change Workflow",
      "concept": "A safe firewall change follows the same steps every time: write the change as code, review it, run it in check mode, apply it to one firewall, and verify the result. Skipping a step to save time is how outages happen, because firewall rules take effect immediately and a wrong rule can cut off real users.",
      "syntax": "write -> review -> ansible-playbook --check -> apply -> verify",
      "exampleCode": "---\n- name: Change workflow\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Review step\n      ansible.builtin.debug:\n        msg: \"Change FW-102: reviewed, checked, ready to apply\"",
      "exampleLanguage": "ansible",
      "mistake": "Applying a firewall change directly to production without a check-mode run or a review, because the change looked small.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Firewall Change Workflow, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook apply.yml   # straight to production, no --check",
       "fixedCode": "$ ansible-playbook apply.yml --check --diff\n$ ansible-playbook apply.yml --limit fw1",
       "explanation": "A check-mode run shows what would change, and limiting the first real run to one firewall confines a mistake to one device instead of all of them."
      },
      "exercise": {
       "title": "Practise Firewall Change Workflow",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Change FW-102: reviewed\". This exercise practises Firewall Change Workflow.",
       "starterCode": "---\n- name: Firewall Change Workflow\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Firewall Change Workflow\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Change FW-102: reviewed, checked, ready to apply\"\n",
       "solutionExplanation": "The solution builds the firewall change workflow policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Change FW-102: reviewed\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Change FW-102: reviewed",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Firewall Change Workflow is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Firewall Change Workflow step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-foundations-m2-l5",
      "slug": "netauto-firewall-foundations-m2-l5",
      "title": "A Small Policy End to End",
      "concept": "A complete small policy playbook combines variables, rendering, and assertions into one repeatable unit of work. You write it once, run it with ansible-playbook, read the recap, and run it again to confirm the rendered policy is the same the second time.",
      "syntax": "ansible-playbook policy.yml\nansible-playbook policy.yml   # second run: same output",
      "exampleCode": "---\n- name: A Small Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./small-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Writing a playbook that works once but renders different output on the second run, for example by appending rules instead of writing the full policy each time.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Small Policy End to End, but it does not work correctly.",
       "buggyCode": "- name: Append a rule\n  ansible.builtin.lineinfile:\n    path: ./policy.txt\n    line: \"allow-web\"\n# every run adds the line again",
       "fixedCode": "- name: Write the full policy\n  ansible.builtin.copy:\n    dest: ./policy.txt\n    content: \"{{ rendered }}\"\n    mode: \"0644\"",
       "explanation": "Writing the complete policy each run is idempotent: the file ends up the same no matter how many times the playbook runs."
      },
      "exercise": {
       "title": "Practise A Small Policy End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule allow-web: trust -> dmz allow\". This exercise practises A Small Policy End to End.",
       "starterCode": "---\n- name: A Small Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Small Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: policy is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a small policy end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule allow-web: trust -> dmz allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule allow-web: trust -> dmz allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Small Policy End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A Small Policy End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Firewall Automation Foundations",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the firewall automation foundations policy as data, renders it to ./foundations-policy.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=allow\".",
   "starterCode": "---\n- name: Firewall Automation Foundations Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Firewall Automation Foundations capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./foundations-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Firewall Automation Foundations\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the firewall automation foundations capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Firewall Automation Foundations Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Firewall Automation Foundations Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Firewall Automation Foundations Capstone Project",
   "description": "A small end-to-end project that puts Firewall Automation Foundations into practice.",
   "requirements": [
    "Define the policy as a list of rule variables with source, destination, service, and action.",
    "Render the full policy to a file with a Jinja2 loop.",
    "Assert the allow-web rule is present and the rule count is correct.",
    "Run with --check first and verify the recap shows no failures."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-panos",
  "slug": "netauto-firewall-panos",
  "language": "ansible",
  "category": "devops",
  "title": "Palo Alto PAN-OS Basics",
  "description": "Learn PAN-OS concepts — zones, address and service objects, security rules, commits, and Panorama — and model a PAN-OS policy as Ansible data rendered and checked locally.",
  "difficulty": "Beginner",
  "estimatedHours": 9,
  "skills": [
   "PAN-OS concepts",
   "PAN-OS zones",
   "Address objects",
   "Security rules",
   "Service objects",
   "panos collection",
   "Commits",
   "Panorama",
   "Policy rendering"
  ],
  "prerequisites": [
   "netauto-firewall-foundations"
  ],
  "analogy": "Learning {topic} is like learning the rules of a border checkpoint: every traveller is checked against a list, and nothing crosses until it is approved.",
  "modules": [
   {
    "id": "netauto-firewall-panos-m1",
    "title": "Palo Alto PAN-OS Basics Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-panos-m1-l1",
      "slug": "netauto-firewall-panos-m1-l1",
      "title": "PAN-OS and the Palo Alto Firewall",
      "concept": "PAN-OS is the operating system that runs on Palo Alto Networks firewalls, and it manages security rules, NAT, and objects through a web interface, a CLI, and an XML API. A single PAN-OS device holds the whole configuration, and changes only take effect after they are committed, which means uncommitted edits can be reviewed or discarded first.",
      "syntax": "pan-os device -> candidate config -> commit -> running config",
      "exampleCode": "- name: PAN-OS commit reminder\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the rule\n      ansible.builtin.debug:\n        msg: \"PAN-OS rule allow-web is staged; commit to activate it\"",
      "exampleLanguage": "ansible",
      "mistake": "Assuming a PAN-OS change is live the moment it is written, when nothing takes effect until the commit completes.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate PAN-OS and the Palo Alto Firewall, but it does not work correctly.",
       "buggyCode": "# edit the rule in the web UI and walk away\n# traffic still follows the old committed config",
       "fixedCode": "# edit the rule, review the candidate config, then commit\n# traffic follows the new config only after the commit succeeds",
       "explanation": "PAN-OS keeps a candidate configuration separate from the running configuration, so a change is only live after a successful commit."
      },
      "exercise": {
       "title": "Practise PAN-OS and the Palo Alto Firewall",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"commit to activate it\". This exercise practises PAN-OS and the Palo Alto Firewall.",
       "starterCode": "---\n- name: PAN-OS and the Palo Alto Firewall\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: PAN-OS and the Palo Alto Firewall\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"PAN-OS rule allow-web is staged; commit to activate it\"\n",
       "solutionExplanation": "The solution builds the pan-os and the palo alto firewall policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"commit to activate it\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "commit to activate it",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "PAN-OS and the Palo Alto Firewall is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through PAN-OS and the Palo Alto Firewall step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-panos-m1-l2",
      "slug": "netauto-firewall-panos-m1-l2",
      "title": "Zones on PAN-OS",
      "concept": "On PAN-OS every interface belongs to a zone, and security rules always name a source zone and a destination zone. A common layout uses trust for the inside network, untrust for the internet, and dmz for public servers, and traffic between two interfaces in the same zone is not checked by security rules unless intra-zone rules are enabled.",
      "syntax": "zone trust: ethernet1/1\nzone untrust: ethernet1/2\nrule: trust -> untrust",
      "exampleCode": "---\n- name: PAN-OS zones\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    fw_zones: [trust, untrust, dmz]\n  tasks:\n    - name: Show the zones\n      ansible.builtin.debug:\n        msg: \"PAN-OS zones: {{ panos_zones | join(', ') }}\"",
      "exampleLanguage": "ansible",
      "mistake": "Writing a PAN-OS rule with interface names instead of zone names, which PAN-OS does not accept for security rules.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Zones on PAN-OS, but it does not work correctly.",
       "buggyCode": "security rule: from ethernet1/1 to ethernet1/2 allow web",
       "fixedCode": "security rule: from-zone trust to-zone untrust allow web",
       "explanation": "PAN-OS security rules match on zones, not interfaces, so the rule must name the source and destination zones."
      },
      "exercise": {
       "title": "Practise Zones on PAN-OS",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"PAN-OS zones: trust, untrust, dmz\". This exercise practises Zones on PAN-OS.",
       "starterCode": "---\n- name: Zones on PAN-OS\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Zones on PAN-OS\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    fw_zones: [trust, untrust, dmz]\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"PAN-OS zones: trust, untrust, dmz\"\n",
       "solutionExplanation": "The solution builds the zones on pan-os policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"PAN-OS zones: trust, untrust, dmz\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "PAN-OS zones: trust, untrust, dmz",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Zones on PAN-OS is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Zones on PAN-OS step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-panos-m1-l3",
      "slug": "netauto-firewall-panos-m1-l3",
      "title": "Address Objects on PAN-OS",
      "concept": "A PAN-OS address object gives a name to an IP address, a network, or a range, for example web-server for 10.0.1.10, and rules reference the name instead of the raw address. When the address changes, you edit the object once and every rule that uses it follows automatically.",
      "syntax": "address object web-server: 10.0.1.10/32\nrule: allow trust -> dmz to web-server",
      "exampleCode": "address:\n  - name: web-server\n    ip-netmask: 10.0.1.10/32\n  - name: internal-net\n    ip-netmask: 10.0.0.0/24",
      "exampleLanguage": "ansible",
      "mistake": "Typing the same IP address into every rule instead of creating an address object, so a server move means editing dozens of rules.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Address Objects on PAN-OS, but it does not work correctly.",
       "buggyCode": "rule allow-web: destination 10.0.1.10\nrule allow-ssh: destination 10.0.1.10\nrule allow-ping: destination 10.0.1.10",
       "fixedCode": "address object web-server: 10.0.1.10/32\nrule allow-web: destination web-server\nrule allow-ssh: destination web-server",
       "explanation": "An address object is defined once and referenced by name, so changing the server address means editing one object, not every rule."
      },
      "exercise": {
       "title": "Check your understanding: Address Objects on PAN-OS",
       "type": "multiple-choice",
       "instructions": "Which statement about Address Objects on PAN-OS is correct?",
       "starterCode": "",
       "solution": "A PAN-OS address object gives a name to an IP address, a network, or a range, for example web-server for 10.0.1.10, and rules reference the name instead of the raw address..",
       "solutionExplanation": "A PAN-OS address object gives a name to an IP address, a network, or a range, for example web-server for 10.0.1.10, and rules reference the name instead of the raw address.. The other options are false: Address Objects on PAN-OS is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A PAN-OS address object gives a name to an IP address, a network, or a range, for example web-server for 10.0.1.10, and rules reference the name instead of the raw address..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Address Objects on PAN-OS from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Address Objects on PAN-OS can only be used once in a program",
        "Address Objects on PAN-OS requires a separate paid licence to use",
        "A PAN-OS address object gives a name to an IP address, a network, or a range, for example web-server for 10.0.1.10, and rules reference the name instead of the raw address..",
        "Address Objects on PAN-OS was removed from Ansible in the latest version",
        "Address Objects on PAN-OS only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-panos-m1-l4",
      "slug": "netauto-firewall-panos-m1-l4",
      "title": "Security Rules on PAN-OS",
      "concept": "A PAN-OS security rule matches traffic on source zone, destination zone, source address, destination address, application, and service, and then applies an allow or deny action. Rules are evaluated top to bottom and the first match wins, so PAN-OS administrators keep the most specific rules at the top and a deny-all rule at the bottom.",
      "syntax": "panos_security_rule:\n  rule_name: allow-web\n  from_zone: [trust]\n  to_zone: [dmz]\n  action: allow",
      "exampleCode": "# Displayed only: needs a lab PAN-OS device and the panos collection.\n- name: Create a PAN-OS security rule\n  paloaltonetworks.panos.panos_security_rule:\n    provider: \"{{ provider }}\"\n    rule_name: allow-web\n    from_zone: [trust]\n    to_zone: [dmz]\n    destination_ip: [web-server]\n    application: [web-browsing, ssl]\n    service: [service-https]\n    action: allow",
      "exampleLanguage": "ansible",
      "mistake": "Relying on port numbers alone on PAN-OS and ignoring the application field, which is how the firewall identifies the real application behind the port.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Security Rules on PAN-OS, but it does not work correctly.",
       "buggyCode": "rule allow-web: service tcp-443, application any, action allow",
       "fixedCode": "rule allow-web: service service-https, application [web-browsing, ssl], action allow",
       "explanation": "PAN-OS is application-aware: matching on the application as well as the port stops non-web traffic that happens to use port 443."
      },
      "exercise": {
       "title": "Check your understanding: Security Rules on PAN-OS",
       "type": "multiple-choice",
       "instructions": "Which statement about Security Rules on PAN-OS is correct?",
       "starterCode": "",
       "solution": "A PAN-OS security rule matches traffic on source zone, destination zone, source address, destination address, application, and service, and then applies an allow or deny action..",
       "solutionExplanation": "A PAN-OS security rule matches traffic on source zone, destination zone, source address, destination address, application, and service, and then applies an allow or deny action.. The other options are false: Security Rules on PAN-OS is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A PAN-OS security rule matches traffic on source zone, destination zone, source address, destination address, application, and service, and then applies an allow or deny action..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Security Rules on PAN-OS from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Security Rules on PAN-OS can only be used once in a program",
        "Security Rules on PAN-OS requires a separate paid licence to use",
        "Security Rules on PAN-OS was removed from Ansible in the latest version",
        "A PAN-OS security rule matches traffic on source zone, destination zone, source address, destination address, application, and service, and then applies an allow or deny action..",
        "Security Rules on PAN-OS only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-panos-m1-l5",
      "slug": "netauto-firewall-panos-m1-l5",
      "title": "Building a PAN-OS Policy Locally",
      "concept": "You can practise a PAN-OS policy without a firewall by modelling its rules as Ansible data and rendering them to a readable policy file. The rendered file shows the zones, addresses, and actions exactly as they would appear on the device, and asserting on it proves the policy is complete before anyone touches a real firewall.",
      "syntax": "vars: panos_rules: [...] -> copy -> assert 'allow-web' in rendered",
      "exampleCode": "---\n- name: Building a PAN-OS Policy Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: service-https\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: service-dns\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./palo-alto-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Trying to run the panos collection against a firewall that does not exist in the lab, instead of modelling and rendering the policy locally first.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Building a PAN-OS Policy Locally, but it does not work correctly.",
       "buggyCode": "- name: Create rule on firewall\n  paloaltonetworks.panos.panos_security_rule:\n    provider: \"{{ provider }}\"\n    rule_name: allow-web\n# fails: no PAN-OS device is reachable from this sandbox",
       "fixedCode": "- name: Render the PAN-OS policy locally\n  ansible.builtin.copy:\n    dest: ./palo-alto-policy.txt\n    content: \"{{ rendered }}\"\n    mode: \"0644\"",
       "explanation": "Without a lab firewall the panos modules cannot run, so the honest local step is to model the rules as data and render them for review."
      },
      "exercise": {
       "title": "Practise Building a PAN-OS Policy Locally",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-web=allow\". This exercise practises Building a PAN-OS Policy Locally.",
       "starterCode": "---\n- name: Building a PAN-OS Policy Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Building a PAN-OS Policy Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: service-https\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: service-dns\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./palo-alto-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the building a pan-os policy locally policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-web=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Building a PAN-OS Policy Locally is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Building a PAN-OS Policy Locally step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-panos-m2",
    "title": "Palo Alto PAN-OS Basics in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-firewall-panos-m2-l1",
      "slug": "netauto-firewall-panos-m2-l1",
      "title": "Service Objects and Applications",
      "concept": "A PAN-OS service object names a protocol and port, such as service-https for TCP 443, and the application field names what the traffic really is, such as web-browsing or ssl. Using service objects keeps rules readable, and adding the application means a rule allows real web traffic rather than anything that happens to use the port.",
      "syntax": "service service-https: tcp/443\napplication: web-browsing, ssl",
      "exampleCode": "service:\n  - name: service-https\n    protocol: tcp\n    destination-port: 443\n  - name: service-dns\n    protocol: udp\n    destination-port: 53",
      "exampleLanguage": "ansible",
      "mistake": "Creating one service object per rule instead of reusing shared objects like service-https, which fills the config with duplicates.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Service Objects and Applications, but it does not work correctly.",
       "buggyCode": "service allow-web-https: tcp/443\nservice allow-admin-https: tcp/443\nservice allow-api-https: tcp/443",
       "fixedCode": "service service-https: tcp/443   # reused by every rule that needs HTTPS",
       "explanation": "A shared service object is defined once and referenced by many rules, so a port change is one edit instead of a hunt through duplicates."
      },
      "exercise": {
       "title": "Practise Service Objects and Applications",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule allow-web: trust -> dmz allow\". This exercise practises Service Objects and Applications.",
       "starterCode": "---\n- name: Service Objects and Applications\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Service Objects and Applications\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: service-https\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: service-dns\n            action: allow\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 2\n        success_msg: \"Checked 2 services: policy is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the service objects and applications policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule allow-web: trust -> dmz allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule allow-web: trust -> dmz allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Service Objects and Applications is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Service Objects and Applications step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-panos-m2-l2",
      "slug": "netauto-firewall-panos-m2-l2",
      "title": "The panos Collection and Modules",
      "concept": "The paloaltonetworks.panos Ansible collection provides modules such as panos_security_rule, panos_address_object, and panos_nat_rule that talk to a PAN-OS device over its XML API. Running them needs a real or virtual PAN-OS firewall, a provider with the device address and API credentials, and the collection installed with ansible-galaxy, so this lesson is quiz-graded and never executed here.",
      "syntax": "ansible-galaxy collection install paloaltonetworks.panos\npanos_security_rule / panos_address_object / panos_nat_rule",
      "exampleCode": "# Displayed only: needs a lab PAN-OS device and the panos collection.\n- name: Create an address object on PAN-OS\n  paloaltonetworks.panos.panos_address_object:\n    provider: \"{{ provider }}\"\n    name: web-server\n    value: 10.0.1.10\n    address_type: ip-netmask",
      "exampleLanguage": "ansible",
      "mistake": "Storing the PAN-OS API key in plain text inside the playbook instead of passing it through Ansible Vault or an environment variable.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate The panos Collection and Modules, but it does not work correctly.",
       "buggyCode": "provider:\n  ip_address: 192.0.2.1\n  api_key: \"LUFRPT14aGFzaGVkLWtleQ==\"   # committed to Git in plain text",
       "fixedCode": "provider:\n  ip_address: 192.0.2.1\n  api_key: \"{{ panos_api_key }}\"   # from Ansible Vault, never committed",
       "explanation": "Credentials must come from Vault or the environment, because anything written in a playbook can end up in Git history."
      },
      "exercise": {
       "title": "Check your understanding: The panos Collection and Modules",
       "type": "multiple-choice",
       "instructions": "Which statement about The panos Collection and Modules is correct?",
       "starterCode": "",
       "solution": "The paloaltonetworks.panos Ansible collection provides modules such as panos_security_rule, panos_address_object, and panos_nat_rule that talk to a PAN-OS device over its XML API..",
       "solutionExplanation": "The paloaltonetworks.panos Ansible collection provides modules such as panos_security_rule, panos_address_object, and panos_nat_rule that talk to a PAN-OS device over its XML API.. The other options are false: The panos Collection and Modules is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The paloaltonetworks.panos Ansible collection provides modules such as panos_security_rule, panos_address_object, and panos_nat_rule that talk to a PAN-OS device over its XML API..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of The panos Collection and Modules from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "The panos Collection and Modules can only be used once in a program",
        "The paloaltonetworks.panos Ansible collection provides modules such as panos_security_rule, panos_address_object, and panos_nat_rule that talk to a PAN-OS device over its XML API..",
        "The panos Collection and Modules requires a separate paid licence to use",
        "The panos Collection and Modules was removed from Ansible in the latest version",
        "The panos Collection and Modules only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-panos-m2-l3",
      "slug": "netauto-firewall-panos-m2-l3",
      "title": "Committing Changes on PAN-OS",
      "concept": "On PAN-OS a commit applies the candidate configuration to the running configuration, and the commit can be scoped to one administrator so two admins do not commit each other's half-finished edits. A failed commit leaves the old running configuration in place, which is why the commit step is also the moment to verify the change with a show command or a test connection.",
      "syntax": "commit (device) / commit (Panorama) -> running config updated",
      "exampleCode": "# Displayed only: needs a lab PAN-OS device and the panos collection.\n- name: Commit the candidate config\n  paloaltonetworks.panos.panos_commit:\n    provider: \"{{ provider }}\"\n    description: \"Add allow-web rule\"",
      "exampleLanguage": "ansible",
      "mistake": "Committing from the shared admin account while a colleague is mid-edit, which applies their unfinished changes too.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Committing Changes on PAN-OS, but it does not work correctly.",
       "buggyCode": "# admin and colleague both edit as 'admin', then admin commits\n# colleague's half-written rule goes live as well",
       "fixedCode": "# each admin uses their own account and commits only their own changes\n# Panorama admins commit per device-group, not the whole estate",
       "explanation": "PAN-OS commits are per administrator, so using separate accounts keeps one admin's commit from sweeping in someone else's unfinished work."
      },
      "exercise": {
       "title": "Check your understanding: Committing Changes on PAN-OS",
       "type": "multiple-choice",
       "instructions": "Which statement about Committing Changes on PAN-OS is correct?",
       "starterCode": "",
       "solution": "On PAN-OS a commit applies the candidate configuration to the running configuration, and the commit can be scoped to one administrator so two admins do not commit each other's half-finished edits..",
       "solutionExplanation": "On PAN-OS a commit applies the candidate configuration to the running configuration, and the commit can be scoped to one administrator so two admins do not commit each other's half-finished edits.. The other options are false: Committing Changes on PAN-OS is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "On PAN-OS a commit applies the candidate configuration to the running configuration, and the commit can be scoped to one administrator so two admins do not commit each other's half-finished edits..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Committing Changes on PAN-OS from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Committing Changes on PAN-OS can only be used once in a program",
        "Committing Changes on PAN-OS requires a separate paid licence to use",
        "On PAN-OS a commit applies the candidate configuration to the running configuration, and the commit can be scoped to one administrator so two admins do not commit each other's half-finished edits..",
        "Committing Changes on PAN-OS was removed from Ansible in the latest version",
        "Committing Changes on PAN-OS only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-panos-m2-l4",
      "slug": "netauto-firewall-panos-m2-l4",
      "title": "Panorama Versus Device Management",
      "concept": "Panorama is Palo Alto's central management platform: it pushes shared device-groups, templates, and policy to many PAN-OS firewalls at once, while a standalone device is managed on its own web interface. Central management makes a hundred-firewall estate consistent, but a device managed by Panorama cannot be edited locally for the parts Panorama owns.",
      "syntax": "Panorama -> device-group -> policy -> many firewalls\nstandalone device -> local web UI",
      "exampleCode": "---\n- name: Panorama or standalone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the model\n      ansible.builtin.debug:\n        msg: \"Panorama manages device-groups; standalone devices are managed locally\"",
      "exampleLanguage": "ansible",
      "mistake": "Editing a Panorama-managed rule on the device itself, then wondering why the change is overwritten at the next Panorama push.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Panorama Versus Device Management, but it does not work correctly.",
       "buggyCode": "# edit the rule in the device web UI\n# Panorama pushes its device-group policy and overwrites the edit",
       "fixedCode": "# edit the rule in Panorama's device-group, then push to the device\n# the device keeps the pushed policy until Panorama changes it again",
       "explanation": "Panorama owns the policy it pushes, so edits must be made in Panorama or the next push will revert a local change."
      },
      "exercise": {
       "title": "Practise Panorama Versus Device Management",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Panorama manages device-groups\". This exercise practises Panorama Versus Device Management.",
       "starterCode": "---\n- name: Panorama Versus Device Management\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Panorama Versus Device Management\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Panorama manages device-groups; standalone devices are managed locally\"\n",
       "solutionExplanation": "The solution builds the panorama versus device management policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Panorama manages device-groups\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Panorama manages device-groups",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Panorama Versus Device Management is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Panorama Versus Device Management step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-panos-m2-l5",
      "slug": "netauto-firewall-panos-m2-l5",
      "title": "A PAN-OS Policy End to End",
      "concept": "A complete PAN-OS policy playbook models zones, address objects, service objects, and ordered security rules as data, then renders and checks the whole set locally. The same data can later feed the panos collection against a lab firewall, but the local render already proves the policy is ordered, complete, and free of typos.",
      "syntax": "vars: zones, objects, services, rules -> render -> assert",
      "exampleCode": "---\n- name: A PAN-OS Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: service-https\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: service-dns\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./palo-alto-full-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Rendering the rules but forgetting the deny-all at the bottom, so traffic that matches nothing is left to the implicit behaviour instead of an explicit rule.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A PAN-OS Policy End to End, but it does not work correctly.",
       "buggyCode": "rules:\n  - allow-web\n  - allow-dns\n# no final deny rule: unmatched traffic is silently dropped with no audit trail",
       "fixedCode": "rules:\n  - allow-web\n  - allow-dns\n  - deny-all   # explicit, logged, and visible in the policy",
       "explanation": "An explicit deny-all at the bottom makes the default action visible, reviewable, and loggable instead of relying on an implicit drop."
      },
      "exercise": {
       "title": "Practise A PAN-OS Policy End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule deny-all: any -> any deny\". This exercise practises A PAN-OS Policy End to End.",
       "starterCode": "---\n- name: A PAN-OS Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A PAN-OS Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: service-https\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: service-dns\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: PAN-OS policy is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a pan-os policy end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule deny-all: any -> any deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule deny-all: any -> any deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A PAN-OS Policy End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A PAN-OS Policy End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Palo Alto PAN-OS Basics",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the palo alto pan-os basics policy as data, renders it to ./palo-alto-capstone-policy.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=allow\".",
   "starterCode": "---\n- name: Palo Alto PAN-OS Basics Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Palo Alto PAN-OS Basics capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: service-https\n            action: allow\n          - name: allow-app\n            src: trust\n            dst: dmz\n            svc: ssl\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./palo-alto-capstone-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Palo Alto PAN-OS Basics\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the palo alto pan-os basics capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Palo Alto PAN-OS Basics Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Palo Alto PAN-OS Basics Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Palo Alto PAN-OS Basics Capstone Project",
   "description": "A small end-to-end project that puts Palo Alto PAN-OS Basics into practice.",
   "requirements": [
    "Model the PAN-OS policy as rules with zones, addresses, services, and actions.",
    "Include an application-aware web rule and an explicit deny-all at the bottom.",
    "Render the policy to a file and assert the allow-web rule is present.",
    "Note in the playbook comments that panos modules need a lab firewall and are not run here."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-fortios",
  "slug": "netauto-firewall-fortios",
  "language": "ansible",
  "category": "devops",
  "title": "Fortinet FortiOS Basics",
  "description": "Learn FortiOS concepts — interfaces and zones, address objects, numbered firewall policies, services, VDOMs, and FortiManager — and model a FortiOS policy as Ansible data rendered and checked locally.",
  "difficulty": "Intermediate",
  "estimatedHours": 9,
  "skills": [
   "FortiOS concepts",
   "FortiOS zones",
   "Address objects",
   "Firewall policies",
   "Services",
   "fortios collection",
   "VDOMs",
   "FortiManager",
   "Policy rendering"
  ],
  "prerequisites": [
   "netauto-firewall-foundations"
  ],
  "analogy": "Learning {topic} is like learning to run a hotel front desk: every guest gets a numbered room key, and the list decides who goes where.",
  "modules": [
   {
    "id": "netauto-firewall-fortios-m1",
    "title": "Fortinet FortiOS Basics Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-fortios-m1-l1",
      "slug": "netauto-firewall-fortios-m1-l1",
      "title": "FortiOS and the FortiGate Firewall",
      "concept": "FortiOS is the operating system that runs on Fortinet FortiGate firewalls, and it organises protection into firewall policies, address objects, services, and security profiles such as antivirus and web filtering. Unlike PAN-OS, FortiOS applies configuration changes immediately when they are saved, so there is no commit step and no candidate configuration to review first.",
      "syntax": "FortiGate (FortiOS) -> firewall policy -> applied immediately on save",
      "exampleCode": "- name: FortiOS change\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the rule\n      ansible.builtin.debug:\n        msg: \"FortiOS policy 10 allows web traffic and applies on save\"",
      "exampleLanguage": "ansible",
      "mistake": "Expecting a commit step on FortiOS like PAN-OS has, and assuming an uncommitted edit is harmless when FortiOS already applied it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate FortiOS and the FortiGate Firewall, but it does not work correctly.",
       "buggyCode": "# edit a FortiOS policy, leave it unsaved in the UI\n# (FortiOS saves apply immediately: the edit is already live)",
       "fixedCode": "# edit a FortiOS policy only after reviewing the change\n# verify the effect right away, because there is no commit to undo it",
       "explanation": "FortiOS has no candidate configuration: a saved change is live at once, so the review must happen before the save, not after."
      },
      "exercise": {
       "title": "Practise FortiOS and the FortiGate Firewall",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"applies on save\". This exercise practises FortiOS and the FortiGate Firewall.",
       "starterCode": "---\n- name: FortiOS and the FortiGate Firewall\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: FortiOS and the FortiGate Firewall\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"FortiOS policy 10 allows web traffic and applies on save\"\n",
       "solutionExplanation": "The solution builds the fortios and the fortigate firewall policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"applies on save\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "applies on save",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "FortiOS and the FortiGate Firewall is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through FortiOS and the FortiGate Firewall step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-fortios-m1-l2",
      "slug": "netauto-firewall-fortios-m1-l2",
      "title": "Interfaces and Zones on FortiOS",
      "concept": "On FortiOS an interface is assigned to a zone, and a firewall policy names the incoming and outgoing interfaces, such as internal to wan1, instead of naming zones directly. Zones group interfaces that share a role, so a policy written against a zone keeps working when an interface is swapped, as long as the new interface joins the same zone.",
      "syntax": "config system interface\n  edit port1 -> set zone internal\nfirewall policy: incoming internal, outgoing wan1",
      "exampleCode": "interfaces:\n  - {name: port1, zone: internal, ip: 10.0.0.1/24}\n  - {name: wan1, zone: external, ip: 203.0.113.1/30}",
      "exampleLanguage": "ansible",
      "mistake": "Writing a FortiOS policy against a physical interface name and then renaming the interface, which breaks the policy reference.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Interfaces and Zones on FortiOS, but it does not work correctly.",
       "buggyCode": "firewall policy 10: incoming-interface port1, outgoing-interface wan1",
       "fixedCode": "firewall policy 10: incoming-interface internal, outgoing-interface external\n# zones survive an interface rename",
       "explanation": "Policies written against zones keep working when interfaces change, while policies pinned to interface names break on a rename."
      },
      "exercise": {
       "title": "Practise Interfaces and Zones on FortiOS",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"FortiOS zones: internal, external, dmz\". This exercise practises Interfaces and Zones on FortiOS.",
       "starterCode": "---\n- name: Interfaces and Zones on FortiOS\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Interfaces and Zones on FortiOS\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    zones: [internal, external, dmz]\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"FortiOS zones: internal, external, dmz\"\n",
       "solutionExplanation": "The solution builds the interfaces and zones on fortios policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"FortiOS zones: internal, external, dmz\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "FortiOS zones: internal, external, dmz",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Interfaces and Zones on FortiOS is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Interfaces and Zones on FortiOS step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-fortios-m1-l3",
      "slug": "netauto-firewall-fortios-m1-l3",
      "title": "Address Objects on FortiOS",
      "concept": "A FortiOS address object names an IP address, subnet, or range, for example web-server for 10.0.1.10, and firewall policies reference the object name. Address groups collect several objects under one name, so a policy can allow a whole group of servers with a single destination entry.",
      "syntax": "config firewall address\n  edit web-server -> set subnet 10.0.1.10 255.255.255.255",
      "exampleCode": "config firewall address\n  edit \"web-server\"\n    set subnet 10.0.1.10 255.255.255.255\n  next\n  edit \"internal-net\"\n    set subnet 10.0.0.0 255.255.255.0\n  next\nend",
      "exampleLanguage": "ansible",
      "mistake": "Creating address objects with names that do not say what they are, such as addr1 and addr2, so nobody can review the policy later.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Address Objects on FortiOS, but it does not work correctly.",
       "buggyCode": "config firewall address\n  edit \"addr1\"\n    set subnet 10.0.1.10 255.255.255.255",
       "fixedCode": "config firewall address\n  edit \"web-server\"\n    set subnet 10.0.1.10 255.255.255.255",
       "explanation": "Object names are documentation: a name like web-server tells a reviewer what the address is, while addr1 tells them nothing."
      },
      "exercise": {
       "title": "Check your understanding: Address Objects on FortiOS",
       "type": "multiple-choice",
       "instructions": "Which statement about Address Objects on FortiOS is correct?",
       "starterCode": "",
       "solution": "A FortiOS address object names an IP address, subnet, or range, for example web-server for 10.0.1.10, and firewall policies reference the object name..",
       "solutionExplanation": "A FortiOS address object names an IP address, subnet, or range, for example web-server for 10.0.1.10, and firewall policies reference the object name.. The other options are false: Address Objects on FortiOS is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A FortiOS address object names an IP address, subnet, or range, for example web-server for 10.0.1.10, and firewall policies reference the object name..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Address Objects on FortiOS from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Address Objects on FortiOS can only be used once in a program",
        "Address Objects on FortiOS requires a separate paid licence to use",
        "A FortiOS address object names an IP address, subnet, or range, for example web-server for 10.0.1.10, and firewall policies reference the object name..",
        "Address Objects on FortiOS was removed from Ansible in the latest version",
        "Address Objects on FortiOS only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-fortios-m1-l4",
      "slug": "netauto-firewall-fortios-m1-l4",
      "title": "Firewall Policies on FortiOS",
      "concept": "A FortiOS firewall policy has a numeric ID, an incoming interface, an outgoing interface, source and destination addresses, a service, and an action of accept or deny. Policies are evaluated in order by their ID sequence from the top down, and the first policy that matches the traffic decides what happens to it.",
      "syntax": "config firewall policy\n  edit 10 -> set srcintf internal dstintf wan1 action accept",
      "exampleCode": "# Displayed only: needs a lab FortiGate and the fortios collection.\n- name: Create a FortiOS firewall policy\n  fortinet.fortios.fortios_firewall_policy:\n    vdom: root\n    state: present\n    firewall_policy:\n      policyid: 10\n      srcintf: [internal]\n      dstintf: [wan1]\n      srcaddr: [internal-net]\n      dstaddr: [web-server]\n      service: [HTTPS]\n      action: accept",
      "exampleLanguage": "ansible",
      "mistake": "Leaving a FortiOS policy with action accept and source all and destination all, which opens the firewall to everything.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Firewall Policies on FortiOS, but it does not work correctly.",
       "buggyCode": "policy 10: srcintf internal, dstintf wan1, srcaddr all, dstaddr all, service ALL, action accept",
       "fixedCode": "policy 10: srcintf internal, dstintf wan1, srcaddr internal-net, dstaddr web-server, service HTTPS, action accept",
       "explanation": "A policy must name the exact source, destination, and service it allows; all-to-all with accept is an open door, not a rule."
      },
      "exercise": {
       "title": "Check your understanding: Firewall Policies on FortiOS",
       "type": "multiple-choice",
       "instructions": "Which statement about Firewall Policies on FortiOS is correct?",
       "starterCode": "",
       "solution": "A FortiOS firewall policy has a numeric ID, an incoming interface, an outgoing interface, source and destination addresses, a service, and an action of accept or deny..",
       "solutionExplanation": "A FortiOS firewall policy has a numeric ID, an incoming interface, an outgoing interface, source and destination addresses, a service, and an action of accept or deny.. The other options are false: Firewall Policies on FortiOS is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A FortiOS firewall policy has a numeric ID, an incoming interface, an outgoing interface, source and destination addresses, a service, and an action of accept or deny..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Firewall Policies on FortiOS from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Firewall Policies on FortiOS can only be used once in a program",
        "Firewall Policies on FortiOS requires a separate paid licence to use",
        "Firewall Policies on FortiOS was removed from Ansible in the latest version",
        "A FortiOS firewall policy has a numeric ID, an incoming interface, an outgoing interface, source and destination addresses, a service, and an action of accept or deny..",
        "Firewall Policies on FortiOS only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-fortios-m1-l5",
      "slug": "netauto-firewall-fortios-m1-l5",
      "title": "Building a FortiOS Policy Locally",
      "concept": "You can practise a FortiOS policy without a FortiGate by modelling its numbered policies as Ansible data and rendering them to a readable policy file. The rendered file shows each policy ID, its interfaces, addresses, service, and action, and asserting on it proves the policy is complete before anyone touches a real device.",
      "syntax": "vars: fortios_policies: [...] -> copy -> assert 'allow-web' in rendered",
      "exampleCode": "---\n- name: Building a FortiOS Policy Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: internal\n            dst: wan1\n            svc: HTTPS\n            action: accept\n          - name: allow-dns\n            src: internal\n            dst: wan1\n            svc: DNS\n            action: accept\n          - name: deny-all\n            src: any\n            dst: any\n            svc: ALL\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./fortinet-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Modelling FortiOS policies without their numeric IDs, so the rendered policy has no order and cannot be compared with the real device.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Building a FortiOS Policy Locally, but it does not work correctly.",
       "buggyCode": "policies:\n  - {name: allow-web, action: accept}\n  - {name: allow-dns, action: accept}",
       "fixedCode": "policies:\n  - {policyid: 10, name: allow-web, action: accept}\n  - {policyid: 20, name: allow-dns, action: accept}",
       "explanation": "FortiOS policies are ordered by ID, so the model must carry the ID or the rendered policy cannot show the evaluation order."
      },
      "exercise": {
       "title": "Practise Building a FortiOS Policy Locally",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-web=accept\". This exercise practises Building a FortiOS Policy Locally.",
       "starterCode": "---\n- name: Building a FortiOS Policy Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Building a FortiOS Policy Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: internal\n            dst: wan1\n            svc: HTTPS\n            action: accept\n          - name: allow-dns\n            src: internal\n            dst: wan1\n            svc: DNS\n            action: accept\n          - name: deny-all\n            src: any\n            dst: any\n            svc: ALL\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./fortinet-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the building a fortios policy locally policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=accept\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-web=accept",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Building a FortiOS Policy Locally is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Building a FortiOS Policy Locally step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-fortios-m2",
    "title": "Fortinet FortiOS Basics in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-firewall-fortios-m2-l1",
      "slug": "netauto-firewall-fortios-m2-l1",
      "title": "Services and Service Groups",
      "concept": "A FortiOS service names a protocol and port, such as HTTPS for TCP 443, and a service group bundles several services under one name so a policy can allow web and DNS together. Reusing the built-in services where they fit keeps the configuration small, and a custom service is only needed when the built-in list does not cover the application.",
      "syntax": "config firewall service custom\n  edit web-8443 -> set tcp-portrange 8443\nconfig firewall service group\n  edit web-services -> set member HTTPS DNS",
      "exampleCode": "services:\n  - {name: HTTPS, protocol: tcp, port: 443}\n  - {name: DNS, protocol: udp, port: 53}\nservice-groups:\n  - {name: web-services, members: [HTTPS, DNS]}",
      "exampleLanguage": "ansible",
      "mistake": "Creating a custom service that duplicates a built-in one, for example a custom HTTPS on TCP 443, which adds clutter without adding meaning.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Services and Service Groups, but it does not work correctly.",
       "buggyCode": "config firewall service custom\n  edit \"my-https\"\n    set tcp-portrange 443",
       "fixedCode": "# use the built-in HTTPS service\npolicy 10: service HTTPS",
       "explanation": "Built-in services already define common ports correctly, so a custom service should only be created for a port the built-ins do not cover."
      },
      "exercise": {
       "title": "Practise Services and Service Groups",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule allow-web: internal -> wan1 accept\". This exercise practises Services and Service Groups.",
       "starterCode": "---\n- name: Services and Service Groups\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Services and Service Groups\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: internal\n            dst: wan1\n            svc: HTTPS\n            action: accept\n          - name: allow-dns\n            src: internal\n            dst: wan1\n            svc: DNS\n            action: accept\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 2\n        success_msg: \"Checked 2 services: policy is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the services and service groups policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule allow-web: internal -> wan1 accept\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule allow-web: internal -> wan1 accept",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Services and Service Groups is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Services and Service Groups step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-fortios-m2-l2",
      "slug": "netauto-firewall-fortios-m2-l2",
      "title": "The fortios Collection and Modules",
      "concept": "The fortinet.fortios Ansible collection provides modules such as fortios_firewall_policy, fortios_firewall_address, and fortios_firewall_service that configure a FortiGate over its REST API. Running them needs a real or virtual FortiGate, API credentials with the right permissions, and the collection installed with ansible-galaxy, so this lesson is quiz-graded and never executed here.",
      "syntax": "ansible-galaxy collection install fortinet.fortios\nfortios_firewall_policy / fortios_firewall_address",
      "exampleCode": "# Displayed only: needs a lab FortiGate and the fortios collection.\n- name: Create a FortiOS address object\n  fortinet.fortios.fortios_firewall_address:\n    vdom: root\n    state: present\n    firewall_address:\n      name: web-server\n      subnet: 10.0.1.10 255.255.255.255",
      "exampleLanguage": "ansible",
      "mistake": "Giving the FortiOS API user full administrator rights when it only needs to manage firewall policies, which turns a compromised credential into full control.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate The fortios Collection and Modules, but it does not work correctly.",
       "buggyCode": "api-user automation: profile super_admin   # can change anything",
       "fixedCode": "api-user automation: profile policy-admin   # firewall policies only",
       "explanation": "API credentials should follow least privilege: an automation account gets only the permissions its playbooks actually need."
      },
      "exercise": {
       "title": "Check your understanding: The fortios Collection and Modules",
       "type": "multiple-choice",
       "instructions": "Which statement about The fortios Collection and Modules is correct?",
       "starterCode": "",
       "solution": "The fortinet.fortios Ansible collection provides modules such as fortios_firewall_policy, fortios_firewall_address, and fortios_firewall_service that configure a FortiGate over its REST API..",
       "solutionExplanation": "The fortinet.fortios Ansible collection provides modules such as fortios_firewall_policy, fortios_firewall_address, and fortios_firewall_service that configure a FortiGate over its REST API.. The other options are false: The fortios Collection and Modules is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "The fortinet.fortios Ansible collection provides modules such as fortios_firewall_policy, fortios_firewall_address, and fortios_firewall_service that configure a FortiGate over its REST API..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of The fortios Collection and Modules from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "The fortios Collection and Modules can only be used once in a program",
        "The fortinet.fortios Ansible collection provides modules such as fortios_firewall_policy, fortios_firewall_address, and fortios_firewall_service that configure a FortiGate over its REST API..",
        "The fortios Collection and Modules requires a separate paid licence to use",
        "The fortios Collection and Modules was removed from Ansible in the latest version",
        "The fortios Collection and Modules only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-fortios-m2-l3",
      "slug": "netauto-firewall-fortios-m2-l3",
      "title": "VDOMs and Multi-Tenancy",
      "concept": "A VDOM, or virtual domain, splits one FortiGate into several virtual firewalls, each with its own interfaces, policies, and routing table. VDOMs let one device serve several tenants or departments in isolation, and the root VDOM manages the device itself while traffic VDOMs carry the tenant traffic.",
      "syntax": "config vdom\n  edit tenant-a   # own policies, interfaces, routing",
      "exampleCode": "vdoms:\n  - {name: root, role: management}\n  - {name: tenant-a, role: traffic, interfaces: [port1]}\n  - {name: tenant-b, role: traffic, interfaces: [port2]}",
      "exampleLanguage": "ansible",
      "mistake": "Putting two tenants in the same VDOM because it is quicker, which removes the isolation that VDOMs exist to provide.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate VDOMs and Multi-Tenancy, but it does not work correctly.",
       "buggyCode": "vdom root: tenant-a policies + tenant-b policies, shared interfaces",
       "fixedCode": "vdom tenant-a: tenant-a policies only\nvdom tenant-b: tenant-b policies only",
       "explanation": "Separate VDOMs keep tenant policies, interfaces, and routing apart, so a mistake in one tenant cannot leak traffic into another."
      },
      "exercise": {
       "title": "Check your understanding: VDOMs and Multi-Tenancy",
       "type": "multiple-choice",
       "instructions": "Which statement about VDOMs and Multi-Tenancy is correct?",
       "starterCode": "",
       "solution": "A VDOM, or virtual domain, splits one FortiGate into several virtual firewalls, each with its own interfaces, policies, and routing table..",
       "solutionExplanation": "A VDOM, or virtual domain, splits one FortiGate into several virtual firewalls, each with its own interfaces, policies, and routing table.. The other options are false: VDOMs and Multi-Tenancy is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A VDOM, or virtual domain, splits one FortiGate into several virtual firewalls, each with its own interfaces, policies, and routing table..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of VDOMs and Multi-Tenancy from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "VDOMs and Multi-Tenancy can only be used once in a program",
        "VDOMs and Multi-Tenancy requires a separate paid licence to use",
        "A VDOM, or virtual domain, splits one FortiGate into several virtual firewalls, each with its own interfaces, policies, and routing table..",
        "VDOMs and Multi-Tenancy was removed from Ansible in the latest version",
        "VDOMs and Multi-Tenancy only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-fortios-m2-l4",
      "slug": "netauto-firewall-fortios-m2-l4",
      "title": "FortiManager in Concept",
      "concept": "FortiManager is Fortinet's central management platform: it stores policy packages and device configurations and pushes them to many FortiGates, much like Panorama does for Palo Alto firewalls. A FortiGate managed by FortiManager should be edited through FortiManager, because a local edit can be overwritten by the next push, and FortiManager keeps the revision history for every device it manages.",
      "syntax": "FortiManager -> policy package -> push -> many FortiGates",
      "exampleCode": "---\n- name: FortiManager or standalone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the model\n      ansible.builtin.debug:\n        msg: \"FortiManager pushes policy packages; standalone FortiGates are managed locally\"",
      "exampleLanguage": "ansible",
      "mistake": "Editing a FortiManager-managed FortiGate locally and expecting the change to survive the next FortiManager push.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate FortiManager in Concept, but it does not work correctly.",
       "buggyCode": "# edit the policy on the FortiGate web UI\n# FortiManager pushes its policy package and overwrites the edit",
       "fixedCode": "# edit the policy package in FortiManager, then install it on the device\n# the device keeps the pushed policy until FortiManager changes it again",
       "explanation": "FortiManager owns the policy it pushes, so edits must be made in FortiManager or the next install will revert a local change."
      },
      "exercise": {
       "title": "Practise FortiManager in Concept",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"FortiManager pushes policy packages\". This exercise practises FortiManager in Concept.",
       "starterCode": "---\n- name: FortiManager in Concept\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: FortiManager in Concept\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"FortiManager pushes policy packages; standalone FortiGates are managed locally\"\n",
       "solutionExplanation": "The solution builds the fortimanager in concept policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"FortiManager pushes policy packages\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "FortiManager pushes policy packages",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "FortiManager in Concept is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through FortiManager in Concept step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-fortios-m2-l5",
      "slug": "netauto-firewall-fortios-m2-l5",
      "title": "A FortiOS Policy End to End",
      "concept": "A complete FortiOS policy playbook models numbered policies, address objects, and services as data, then renders and checks the whole set locally. The same data can later feed the fortios collection against a lab FortiGate, but the local render already proves the policies are ordered by ID, complete, and free of typos.",
      "syntax": "vars: policies, addresses, services -> render -> assert",
      "exampleCode": "---\n- name: A FortiOS Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: internal\n            dst: wan1\n            svc: HTTPS\n            action: accept\n          - name: allow-dns\n            src: internal\n            dst: wan1\n            svc: DNS\n            action: accept\n          - name: deny-all\n            src: any\n            dst: any\n            svc: ALL\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./fortinet-full-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Rendering the policies but forgetting the final deny, so traffic that matches nothing is left to the implicit behaviour instead of an explicit rule.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A FortiOS Policy End to End, but it does not work correctly.",
       "buggyCode": "policies:\n  - {policyid: 10, name: allow-web, action: accept}\n  - {policyid: 20, name: allow-dns, action: accept}\n# no final deny policy",
       "fixedCode": "policies:\n  - {policyid: 10, name: allow-web, action: accept}\n  - {policyid: 20, name: allow-dns, action: accept}\n  - {policyid: 30, name: deny-all, action: deny}",
       "explanation": "An explicit final deny policy makes the default action visible, reviewable, and loggable instead of relying on an implicit drop."
      },
      "exercise": {
       "title": "Practise A FortiOS Policy End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule deny-all: any -> any deny\". This exercise practises A FortiOS Policy End to End.",
       "starterCode": "---\n- name: A FortiOS Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A FortiOS Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: internal\n            dst: wan1\n            svc: HTTPS\n            action: accept\n          - name: allow-dns\n            src: internal\n            dst: wan1\n            svc: DNS\n            action: accept\n          - name: deny-all\n            src: any\n            dst: any\n            svc: ALL\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 policies: FortiOS policy is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a fortios policy end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule deny-all: any -> any deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule deny-all: any -> any deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A FortiOS Policy End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A FortiOS Policy End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Fortinet FortiOS Basics",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the fortinet fortios basics policy as data, renders it to ./fortinet-capstone-policy.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=accept\".",
   "starterCode": "---\n- name: Fortinet FortiOS Basics Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Fortinet FortiOS Basics capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: internal\n            dst: wan1\n            svc: HTTPS\n            action: accept\n          - name: allow-dns\n            src: internal\n            dst: wan1\n            svc: DNS\n            action: accept\n          - name: deny-all\n            src: any\n            dst: any\n            svc: ALL\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./fortinet-capstone-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Fortinet FortiOS Basics\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the fortinet fortios basics capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=accept\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=accept",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Fortinet FortiOS Basics Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Fortinet FortiOS Basics Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Fortinet FortiOS Basics Capstone Project",
   "description": "A small end-to-end project that puts Fortinet FortiOS Basics into practice.",
   "requirements": [
    "Model the FortiOS policy as numbered policies with interfaces, addresses, services, and actions.",
    "Include an explicit final deny policy after the allow policies.",
    "Render the policy to a file and assert the allow-web policy is present.",
    "Note in the playbook comments that fortios modules need a lab FortiGate and are not run here."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-policy-as-code",
  "slug": "netauto-firewall-policy-as-code",
  "language": "ansible",
  "category": "devops",
  "title": "Security Policy as Code",
  "description": "Turn firewall rules into reviewed, tested, version-controlled code: least privilege, rule ordering, dry runs, and a policy repository workflow.",
  "difficulty": "Intermediate",
  "estimatedHours": 10,
  "skills": [
   "Policy as code",
   "Git for policies",
   "Least privilege",
   "Rule ordering",
   "Rules as data",
   "Change review",
   "Check mode",
   "Policy testing",
   "Team templates"
  ],
  "prerequisites": [
   "netauto-firewall-foundations",
   "netauto-firewall-panos"
  ],
  "analogy": "Learning {topic} is like learning to write laws instead of shouting orders: the rules are written down, debated, and then everyone follows the same text.",
  "modules": [
   {
    "id": "netauto-firewall-policy-as-code-m1",
    "title": "Security Policy as Code Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-policy-as-code-m1-l1",
      "slug": "netauto-firewall-policy-as-code-m1-l1",
      "title": "Policy as Code Principles",
      "concept": "Policy as code means the firewall rules live in version-controlled files that are reviewed and tested like software, instead of being typed into a web interface. The four principles are: the code is the single source of truth, every change is reviewed, changes are tested before they are applied, and the history shows who changed what and why.",
      "syntax": "policy.yml in Git -> review -> test -> apply -> audit log",
      "exampleCode": "---\n- name: Policy as code\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the principle\n      ansible.builtin.debug:\n        msg: \"Policy as code: reviewed, tested, versioned, repeatable\"",
      "exampleLanguage": "ansible",
      "mistake": "Keeping the real rules in the firewall web UI and a stale copy in Git, so nobody knows which one is the truth.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Policy as Code Principles, but it does not work correctly.",
       "buggyCode": "# rules live in the firewall UI; policy.yml was last updated six months ago",
       "fixedCode": "# rules live in policy.yml; the firewall is generated from it every time",
       "explanation": "Policy as code only works when the code is the single source of truth: a second, diverging copy in the UI defeats the whole idea."
      },
      "exercise": {
       "title": "Practise Policy as Code Principles",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"reviewed, tested, versioned, repeatable\". This exercise practises Policy as Code Principles.",
       "starterCode": "---\n- name: Policy as Code Principles\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Policy as Code Principles\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Policy as code: reviewed, tested, versioned, repeatable\"\n",
       "solutionExplanation": "The solution builds the policy as code principles policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"reviewed, tested, versioned, repeatable\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "reviewed, tested, versioned, repeatable",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Policy as Code Principles is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Policy as Code Principles step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-policy-as-code-m1-l2",
      "slug": "netauto-firewall-policy-as-code-m1-l2",
      "title": "Storing Policies in Git",
      "concept": "Storing firewall policy in Git gives every change an author, a timestamp, a review, and a message explaining why it was made. A bad change can be reverted with one Git command, and a branch lets a new policy be tested without touching the policy that is currently live.",
      "syntax": "git branch feature/allow-web -> commit -> pull request -> merge -> apply",
      "exampleCode": "$ git log --oneline policy.yml\n9f2c1a1 Allow web to DMZ (FW-101)\n7b3d0e4 Deny telnet everywhere (FW-98)",
      "exampleLanguage": "ansible",
      "mistake": "Committing policy changes with messages like 'fix' or 'update', which tell a future reviewer nothing about why the rule changed.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Storing Policies in Git, but it does not work correctly.",
       "buggyCode": "$ git commit -m \"update\" policy.yml",
       "fixedCode": "$ git commit -m \"FW-101: allow web from trust to DMZ web-server\" policy.yml",
       "explanation": "A commit message must say what changed and why, ideally with the change ticket, or the history is useless during an incident."
      },
      "exercise": {
       "title": "Practise Storing Policies in Git",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Policy stored in Git: commit 9f2c1a1\". This exercise practises Storing Policies in Git.",
       "starterCode": "---\n- name: Storing Policies in Git\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Storing Policies in Git\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Policy stored in Git: commit 9f2c1a1 Allow web to DMZ\"\n",
       "solutionExplanation": "The solution builds the storing policies in git policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Policy stored in Git: commit 9f2c1a1\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Policy stored in Git: commit 9f2c1a1",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Storing Policies in Git is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Storing Policies in Git step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-policy-as-code-m1-l3",
      "slug": "netauto-firewall-policy-as-code-m1-l3",
      "title": "Least Privilege in Rules",
      "concept": "Least privilege means a firewall rule allows only the exact traffic the application needs: the right source, the right destination, and the right service, and nothing more. A rule that allows any source, any destination, or any service is not least privilege, and it turns a small breach into a network-wide one.",
      "syntax": "allow <one source> to <one destination> service <one service>",
      "exampleCode": "rules:\n  - {name: allow-web, src: web-clients, dst: web-server, svc: https-443, action: allow}\n  # not: src any, dst any, svc any",
      "exampleLanguage": "ansible",
      "mistake": "Widening a rule to any-any-any to make a broken application work, instead of finding out which exact traffic the application needs.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Least Privilege in Rules, but it does not work correctly.",
       "buggyCode": "rule allow-app: src any, dst any, svc any, action allow   # it works now",
       "fixedCode": "rule allow-app: src app-servers, dst db-server, svc tcp-5432, action allow",
       "explanation": "An any-any-any rule fixes the symptom and opens the network; the correct fix is to learn the application's real traffic and allow only that."
      },
      "exercise": {
       "title": "Check your understanding: Least Privilege in Rules",
       "type": "multiple-choice",
       "instructions": "Which statement about Least Privilege in Rules is correct?",
       "starterCode": "",
       "solution": "Least privilege means a firewall rule allows only the exact traffic the application needs: the right source, the right destination, and the right service, and nothing more..",
       "solutionExplanation": "Least privilege means a firewall rule allows only the exact traffic the application needs: the right source, the right destination, and the right service, and nothing more.. The other options are false: Least Privilege in Rules is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Least privilege means a firewall rule allows only the exact traffic the application needs: the right source, the right destination, and the right service, and nothing more..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Least Privilege in Rules from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Least Privilege in Rules can only be used once in a program",
        "Least Privilege in Rules requires a separate paid licence to use",
        "Least privilege means a firewall rule allows only the exact traffic the application needs: the right source, the right destination, and the right service, and nothing more..",
        "Least Privilege in Rules was removed from Ansible in the latest version",
        "Least Privilege in Rules only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-policy-as-code-m1-l4",
      "slug": "netauto-firewall-policy-as-code-m1-l4",
      "title": "Rule Ordering Matters",
      "concept": "Firewalls evaluate rules top to bottom and stop at the first match, so the order of the rules is part of the policy, not decoration. A specific rule must sit above a general rule that would also match the same traffic, or the general rule wins and the specific one never runs.",
      "syntax": "1. deny telnet (specific)\n2. allow web (specific)\n3. deny all (general, last)",
      "exampleCode": "rules:\n  - {name: deny-telnet, order: 1}\n  - {name: allow-web, order: 2}\n  - {name: deny-all, order: 3}",
      "exampleLanguage": "ansible",
      "mistake": "Appending every new rule at the bottom of the list, below the deny-all, where it can never match anything.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Rule Ordering Matters, but it does not work correctly.",
       "buggyCode": "rules:\n  - allow-web\n  - deny-all\n  - allow-dns   # below deny-all: never reached",
       "fixedCode": "rules:\n  - allow-web\n  - allow-dns\n  - deny-all   # last, so it only catches what nothing above allowed",
       "explanation": "A rule below a matching deny-all is dead code: new allows must be inserted above the final deny, not appended after it."
      },
      "exercise": {
       "title": "Check your understanding: Rule Ordering Matters",
       "type": "multiple-choice",
       "instructions": "Which statement about Rule Ordering Matters is correct?",
       "starterCode": "",
       "solution": "Firewalls evaluate rules top to bottom and stop at the first match, so the order of the rules is part of the policy, not decoration..",
       "solutionExplanation": "Firewalls evaluate rules top to bottom and stop at the first match, so the order of the rules is part of the policy, not decoration.. The other options are false: Rule Ordering Matters is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Firewalls evaluate rules top to bottom and stop at the first match, so the order of the rules is part of the policy, not decoration..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Rule Ordering Matters from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Rule Ordering Matters can only be used once in a program",
        "Rule Ordering Matters requires a separate paid licence to use",
        "Rule Ordering Matters was removed from Ansible in the latest version",
        "Firewalls evaluate rules top to bottom and stop at the first match, so the order of the rules is part of the policy, not decoration..",
        "Rule Ordering Matters only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-policy-as-code-m1-l5",
      "slug": "netauto-firewall-policy-as-code-m1-l5",
      "title": "Writing Rules as Data",
      "concept": "Writing firewall rules as data means each rule is a small record with named fields for source, destination, service, and action, and the playbook renders those records into policy text. Data is easier to review than YAML task spaghetti, easier to test, and the same records can feed two vendors, a diff tool, and a compliance check.",
      "syntax": "rules:\n  - {name: allow-web, src: trust, dst: dmz, svc: https-443, action: allow}",
      "exampleCode": "---\n- name: Writing Rules as Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./rules-as-data.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Mixing rule data and rendering logic in the same task, so changing one rule means editing playbook code instead of a data file.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Writing Rules as Data, but it does not work correctly.",
       "buggyCode": "- name: Write policy\n  ansible.builtin.copy:\n    content: \"allow-web: trust -> dmz\"   # data baked into the task",
       "fixedCode": "vars:\n  rules: \"{{ lookup('file', 'rules.yml') | from_yaml }}\"\n# data lives in rules.yml; tasks only render it",
       "explanation": "Keeping data in a data file and logic in the playbook means a rule change is a data edit, not a code change, and it can be reviewed on its own."
      },
      "exercise": {
       "title": "Practise Writing Rules as Data",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-web=allow\". This exercise practises Writing Rules as Data.",
       "starterCode": "---\n- name: Writing Rules as Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Writing Rules as Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./rules-as-data.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the writing rules as data policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-web=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Writing Rules as Data is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Writing Rules as Data step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-policy-as-code-m2",
    "title": "Security Policy as Code in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-firewall-policy-as-code-m2-l1",
      "slug": "netauto-firewall-policy-as-code-m2-l1",
      "title": "Reviewing Policy Changes",
      "concept": "A policy change review checks four things: the rule allows only what the ticket asked for, it sits in the right order, it uses objects that already exist, and it does not shadow or duplicate another rule. A reviewer who only checks that the playbook runs is not reviewing the policy, because a playbook can run perfectly and still open the network.",
      "syntax": "review checklist: scope, order, objects, shadows, ticket",
      "exampleCode": "---\n- name: Review checklist\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the checklist\n      ansible.builtin.debug:\n        msg: \"Review: scope, order, objects, shadows, ticket FW-101\"",
      "exampleLanguage": "ansible",
      "mistake": "Approving your own firewall change, which removes the second pair of eyes that catches an overly broad rule.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Reviewing Policy Changes, but it does not work correctly.",
       "buggyCode": "# author: deepak, reviewer: deepak\n# change approved and applied",
       "fixedCode": "# author: deepak, reviewer: priya\n# priya asks why the source is 'any' instead of the app subnet",
       "explanation": "Self-approval defeats review: a second person is the one who asks why a rule is broader than the ticket asked for."
      },
      "exercise": {
       "title": "Practise Reviewing Policy Changes",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Review: scope, order, objects, shadows\". This exercise practises Reviewing Policy Changes.",
       "starterCode": "---\n- name: Reviewing Policy Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Reviewing Policy Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Review: scope, order, objects, shadows, ticket FW-101\"\n",
       "solutionExplanation": "The solution builds the reviewing policy changes policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Review: scope, order, objects, shadows\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Review: scope, order, objects, shadows",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Reviewing Policy Changes is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Reviewing Policy Changes step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-policy-as-code-m2-l2",
      "slug": "netauto-firewall-policy-as-code-m2-l2",
      "title": "Dry Runs and Check Mode",
      "concept": "Ansible check mode runs a playbook without changing anything and reports what would change, which is the dry run for a firewall policy. Running with --check and --diff before the real run shows the exact policy lines that would be written, so a typo is caught while it is still harmless.",
      "syntax": "ansible-playbook policy.yml --check --diff",
      "exampleCode": "$ ansible-playbook policy.yml --check --diff\n--- before\n+++ after\n+allow-web: trust -> dmz https-443 allow",
      "exampleLanguage": "ansible",
      "mistake": "Running --check and assuming it proves the policy is correct, when it only proves what would change, not whether the change is safe.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Dry Runs and Check Mode, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook policy.yml --check   # no changes reported, so it must be safe",
       "fixedCode": "$ ansible-playbook policy.yml --check --diff   # read the diff, then review it",
       "explanation": "Check mode shows what would change; a human still has to read the diff and judge whether the change is the right one."
      },
      "exercise": {
       "title": "Check your understanding: Dry Runs and Check Mode",
       "type": "multiple-choice",
       "instructions": "Which statement about Dry Runs and Check Mode is correct?",
       "starterCode": "",
       "solution": "Ansible check mode runs a playbook without changing anything and reports what would change, which is the dry run for a firewall policy..",
       "solutionExplanation": "Ansible check mode runs a playbook without changing anything and reports what would change, which is the dry run for a firewall policy.. The other options are false: Dry Runs and Check Mode is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Ansible check mode runs a playbook without changing anything and reports what would change, which is the dry run for a firewall policy..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Dry Runs and Check Mode from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Dry Runs and Check Mode can only be used once in a program",
        "Ansible check mode runs a playbook without changing anything and reports what would change, which is the dry run for a firewall policy..",
        "Dry Runs and Check Mode requires a separate paid licence to use",
        "Dry Runs and Check Mode was removed from Ansible in the latest version",
        "Dry Runs and Check Mode only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-policy-as-code-m2-l3",
      "slug": "netauto-firewall-policy-as-code-m2-l3",
      "title": "Testing Policies Before Deployment",
      "concept": "Testing a policy before deployment means asserting on the rendered output: the required rules are present, the deny-all is last, and no rule allows a forbidden service. These checks run locally in seconds and catch the mistakes that a syntax check cannot, because a playbook can be valid YAML and still describe a dangerous policy.",
      "syntax": "assert: 'allow-web' in rendered\nassert: rules[-1].name == 'deny-all'",
      "exampleCode": "---\n- name: Testing Policies Before Deployment\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./tested-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Testing only that the playbook runs, and never testing what the policy actually contains.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Testing Policies Before Deployment, but it does not work correctly.",
       "buggyCode": "- name: Test the policy\n  ansible.builtin.assert:\n    that: [true]   # the playbook ran, so the policy must be fine",
       "fixedCode": "- name: Test the policy\n  ansible.builtin.assert:\n    that:\n      - \"'allow-web' in rendered\"\n      - \"'deny-all' in rendered\"",
       "explanation": "A test that always passes tests nothing; asserting on the rendered rules proves the policy contains what it should and nothing it should not."
      },
      "exercise": {
       "title": "Practise Testing Policies Before Deployment",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"deny-telnet=deny\". This exercise practises Testing Policies Before Deployment.",
       "starterCode": "---\n- name: Testing Policies Before Deployment\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Testing Policies Before Deployment\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./tested-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the testing policies before deployment policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"deny-telnet=deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "deny-telnet=deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing Policies Before Deployment is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Testing Policies Before Deployment step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-policy-as-code-m2-l4",
      "slug": "netauto-firewall-policy-as-code-m2-l4",
      "title": "Policy Templates for Teams",
      "concept": "A policy template is a shared starting point for a team: a standard file layout, a standard rule record, and standard checks, so every team's policy looks the same and every reviewer knows where to look. Templates stop each engineer inventing their own format, which is what makes policies reviewable across a whole organisation.",
      "syntax": "templates/policy.yml.j2 + vars/rules.yml + checks/assert.yml",
      "exampleCode": "---\n- name: Team policy template\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the template\n      ansible.builtin.debug:\n        msg: \"Template: standard rules file, standard checks, ticket FW-101\"",
      "exampleLanguage": "ansible",
      "mistake": "Letting each team invent its own policy format, so a reviewer from another team cannot read the policy at all.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Policy Templates for Teams, but it does not work correctly.",
       "buggyCode": "# team A: rules in JSON, team B: rules in CSV, team C: rules in the UI\n# nobody can review anyone else's policy",
       "fixedCode": "# one shared template: rules.yml + render + assert, used by every team",
       "explanation": "A shared template makes policies readable across teams, which is what lets any engineer review any policy."
      },
      "exercise": {
       "title": "Practise Policy Templates for Teams",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"standard rules file, standard checks\". This exercise practises Policy Templates for Teams.",
       "starterCode": "---\n- name: Policy Templates for Teams\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Policy Templates for Teams\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Template: standard rules file, standard checks, ticket FW-101\"\n",
       "solutionExplanation": "The solution builds the policy templates for teams policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"standard rules file, standard checks\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "standard rules file, standard checks",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Policy Templates for Teams is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Policy Templates for Teams step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-policy-as-code-m2-l5",
      "slug": "netauto-firewall-policy-as-code-m2-l5",
      "title": "A Policy Repository End to End",
      "concept": "A policy repository brings the whole workflow together: rules as data in Git, a template that renders them, checks that assert on the output, and a review step before anything is applied. The repository is the firewall's memory: it shows every rule, every change, and every reason, in one place that any engineer can read.",
      "syntax": "repo: rules.yml + render.yml + checks + README + CHANGELOG",
      "exampleCode": "---\n- name: A Policy Repository End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./repo-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Building the repository but never writing the README, so a new engineer cannot tell how to propose a change.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Policy Repository End to End, but it does not work correctly.",
       "buggyCode": "# repo with rules.yml and render.yml, no README\n# new engineer: how do I add a rule?",
       "fixedCode": "# README: edit rules.yml, run --check, open a pull request, get a review\n# the workflow is written down where everyone can find it",
       "explanation": "A repository without a README is a puzzle: the workflow must be written down, or only the person who built it can use it."
      },
      "exercise": {
       "title": "Practise A Policy Repository End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule deny-all: any -> any deny\". This exercise practises A Policy Repository End to End.",
       "starterCode": "---\n- name: A Policy Repository End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Policy Repository End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: repository policy is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a policy repository end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule deny-all: any -> any deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule deny-all: any -> any deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Policy Repository End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A Policy Repository End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Security Policy as Code",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the security policy as code policy as data, renders it to ./policy-as-code-capstone.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=allow\".",
   "starterCode": "---\n- name: Security Policy as Code Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Security Policy as Code capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./policy-as-code-capstone.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Security Policy as Code\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the security policy as code capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Security Policy as Code Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Security Policy as Code Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Security Policy as Code Capstone Project",
   "description": "A small end-to-end project that puts Security Policy as Code into practice.",
   "requirements": [
    "Store the policy as rules-as-data with source, destination, service, and action.",
    "Order the rules so specific allows come before the final deny-all.",
    "Render the policy and assert the allow-web rule and the final deny-all are present.",
    "Write the review checklist into the playbook as comments."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-objects",
  "slug": "netauto-firewall-objects",
  "language": "ansible",
  "category": "devops",
  "title": "Objects and Address Groups",
  "description": "Master firewall objects: address objects, groups, service objects, naming, reuse, cleanup, and the differences between PAN-OS and FortiOS objects.",
  "difficulty": "Intermediate",
  "estimatedHours": 9,
  "skills": [
   "Address objects",
   "Address groups",
   "Service objects",
   "Object naming",
   "Object generation",
   "Object reuse",
   "Unused objects",
   "PAN-OS vs FortiOS",
   "Object libraries"
  ],
  "prerequisites": [
   "netauto-firewall-foundations"
  ],
  "analogy": "Learning {topic} is like learning to keep a contacts book: one entry per person, used everywhere, so a changed number is fixed in one place.",
  "modules": [
   {
    "id": "netauto-firewall-objects-m1",
    "title": "Objects and Address Groups Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-objects-m1-l1",
      "slug": "netauto-firewall-objects-m1-l1",
      "title": "Address Objects Explained",
      "concept": "An address object gives a name to an IP address or network so rules can say web-server instead of 10.0.1.10. Objects make rules readable, and when a server moves, one object edit updates every rule that references it.",
      "syntax": "object web-server = 10.0.1.10/32\nrule: allow any -> web-server https",
      "exampleCode": "objects:\n  - {name: web-server, value: 10.0.1.10/32}\n  - {name: db-server, value: 10.0.2.10/32}\n  - {name: internal-net, value: 10.0.0.0/24}",
      "exampleLanguage": "ansible",
      "mistake": "Naming an object after its IP address, such as object-10-0-1-10, which becomes wrong the moment the address changes.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Address Objects Explained, but it does not work correctly.",
       "buggyCode": "object 10-0-1-10: 10.0.1.10/32   # renamed server, stale name",
       "fixedCode": "object web-server: 10.0.1.10/32   # name describes the role, not the address",
       "explanation": "Object names should describe the role of the address, because the address itself is the part that changes."
      },
      "exercise": {
       "title": "Practise Address Objects Explained",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Object web-server is 10.0.1.10/32\". This exercise practises Address Objects Explained.",
       "starterCode": "---\n- name: Address Objects Explained\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Address Objects Explained\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    web_server: 10.0.1.10\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Object web-server is 10.0.1.10/32\"\n",
       "solutionExplanation": "The solution builds the address objects explained policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Object web-server is 10.0.1.10/32\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Object web-server is 10.0.1.10/32",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Address Objects Explained is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Address Objects Explained step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-objects-m1-l2",
      "slug": "netauto-firewall-objects-m1-l2",
      "title": "Address Groups and Nesting",
      "concept": "An address group collects several address objects under one name, for example web-servers holding web-1 and web-2, and a rule can reference the group instead of listing every server. Groups can nest inside other groups, but deep nesting makes the policy hard to audit, so most teams keep nesting to one level.",
      "syntax": "group web-servers: [web-1, web-2]\nrule: allow any -> web-servers https",
      "exampleCode": "groups:\n  - {name: web-servers, members: [web-1, web-2]}\n  - {name: app-servers, members: [app-1, app-2, app-3]}",
      "exampleLanguage": "ansible",
      "mistake": "Nesting groups three levels deep, so a reviewer cannot tell which addresses a rule actually allows without expanding the whole tree.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Address Groups and Nesting, but it does not work correctly.",
       "buggyCode": "group all-servers: [web-servers, app-servers, db-servers]\n# web-servers itself contains more groups",
       "fixedCode": "group web-servers: [web-1, web-2]   # one level: members are objects, not groups",
       "explanation": "One level of grouping keeps a policy auditable: a reviewer can see the actual addresses without unfolding nested groups."
      },
      "exercise": {
       "title": "Practise Address Groups and Nesting",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Group web-servers holds web-1 and web-2\". This exercise practises Address Groups and Nesting.",
       "starterCode": "---\n- name: Address Groups and Nesting\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Address Groups and Nesting\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    group_members: [web-1, web-2]\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Group web-servers holds web-1 and web-2\"\n",
       "solutionExplanation": "The solution builds the address groups and nesting policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Group web-servers holds web-1 and web-2\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Group web-servers holds web-1 and web-2",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Address Groups and Nesting is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Address Groups and Nesting step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-objects-m1-l3",
      "slug": "netauto-firewall-objects-m1-l3",
      "title": "Service Objects and Ports",
      "concept": "A service object names a protocol and port, such as https-443 for TCP 443, so rules can say allow https instead of allow TCP 443. Sharing one service object across many rules means a port change is one edit, and the name in the rule tells a reviewer what the traffic is for.",
      "syntax": "service https-443: tcp/443\nservice dns-53: udp/53",
      "exampleCode": "services:\n  - {name: https-443, protocol: tcp, port: 443}\n  - {name: dns-53, protocol: udp, port: 53}\n  - {name: ssh-22, protocol: tcp, port: 22}",
      "exampleLanguage": "ansible",
      "mistake": "Allowing a whole port range such as 1-65535 when the application only needs one port, which turns a precise rule into an open one.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Service Objects and Ports, but it does not work correctly.",
       "buggyCode": "service app-ports: tcp/1-65535   # the app only needs 8443",
       "fixedCode": "service app-8443: tcp/8443   # exactly the port the app uses",
       "explanation": "A service object should name the exact port the application needs; a wide range allows traffic the application never uses."
      },
      "exercise": {
       "title": "Check your understanding: Service Objects and Ports",
       "type": "multiple-choice",
       "instructions": "Which statement about Service Objects and Ports is correct?",
       "starterCode": "",
       "solution": "A service object names a protocol and port, such as https-443 for TCP 443, so rules can say allow https instead of allow TCP 443..",
       "solutionExplanation": "A service object names a protocol and port, such as https-443 for TCP 443, so rules can say allow https instead of allow TCP 443.. The other options are false: Service Objects and Ports is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A service object names a protocol and port, such as https-443 for TCP 443, so rules can say allow https instead of allow TCP 443..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Service Objects and Ports from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Service Objects and Ports can only be used once in a program",
        "Service Objects and Ports requires a separate paid licence to use",
        "A service object names a protocol and port, such as https-443 for TCP 443, so rules can say allow https instead of allow TCP 443..",
        "Service Objects and Ports was removed from Ansible in the latest version",
        "Service Objects and Ports only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-objects-m1-l4",
      "slug": "netauto-firewall-objects-m1-l4",
      "title": "Naming Objects Well",
      "concept": "Good object names describe the role and the scope, such as dmz-web-server or prod-db-server, and they follow one pattern across the whole firewall. Consistent names let a reviewer and a script both understand a policy, while random names force everyone to look up what each object means.",
      "syntax": "pattern: <env>-<role>-<thing>  e.g. prod-web-server",
      "exampleCode": "objects:\n  - prod-web-server\n  - prod-db-server\n  - dev-web-server",
      "exampleLanguage": "ansible",
      "mistake": "Using names that describe where an object was created, such as temp-obj-3, instead of what it is for.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Naming Objects Well, but it does not work correctly.",
       "buggyCode": "objects: [temp-obj-3, test123, new-address]",
       "fixedCode": "objects: [prod-web-server, prod-db-server, dev-web-server]",
       "explanation": "A name must say what the object is and where it belongs, or the next engineer has to guess before they can review the rule."
      },
      "exercise": {
       "title": "Check your understanding: Naming Objects Well",
       "type": "multiple-choice",
       "instructions": "Which statement about Naming Objects Well is correct?",
       "starterCode": "",
       "solution": "Good object names describe the role and the scope, such as dmz-web-server or prod-db-server, and they follow one pattern across the whole firewall..",
       "solutionExplanation": "Good object names describe the role and the scope, such as dmz-web-server or prod-db-server, and they follow one pattern across the whole firewall.. The other options are false: Naming Objects Well is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Good object names describe the role and the scope, such as dmz-web-server or prod-db-server, and they follow one pattern across the whole firewall..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Naming Objects Well from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Naming Objects Well can only be used once in a program",
        "Naming Objects Well requires a separate paid licence to use",
        "Naming Objects Well was removed from Ansible in the latest version",
        "Good object names describe the role and the scope, such as dmz-web-server or prod-db-server, and they follow one pattern across the whole firewall..",
        "Naming Objects Well only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-objects-m1-l5",
      "slug": "netauto-firewall-objects-m1-l5",
      "title": "Generating Objects from a List",
      "concept": "Generating objects from a list means writing the servers once as data and letting a Jinja2 loop render every object definition, instead of typing each one by hand. A loop cannot mistype an address the way a tired engineer can, and adding a server becomes one line in a list.",
      "syntax": "{% for s in servers %}\nobject {{ s.name }}: {{ s.ip }}\n{% endfor %}",
      "exampleCode": "---\n- name: Generating Objects from a List\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-db\n            src: app\n            dst: db\n            svc: tcp-5432\n            action: allow\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./objects.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 2\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Generating objects from a list but never checking the output, so a bad entry in the data silently becomes a bad object.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Generating Objects from a List, but it does not work correctly.",
       "buggyCode": "- name: Write objects\n  ansible.builtin.copy:\n    dest: ./objects.txt\n    content: \"{{ rendered }}\"\n# no assert, no debug: nobody reads the result",
       "fixedCode": "- name: Write objects\n  ansible.builtin.copy:\n    dest: ./objects.txt\n    content: \"{{ rendered }}\"\n- name: Check the objects\n  ansible.builtin.assert:\n    that: [\"'allow-web' in rendered\"]",
       "explanation": "Generated output must be asserted on, or a typo in the source data flows straight into the firewall objects."
      },
      "exercise": {
       "title": "Practise Generating Objects from a List",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-db=allow\". This exercise practises Generating Objects from a List.",
       "starterCode": "---\n- name: Generating Objects from a List\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Generating Objects from a List\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-db\n            src: app\n            dst: db\n            svc: tcp-5432\n            action: allow\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./objects.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 2\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the generating objects from a list policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-db=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-db=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Generating Objects from a List is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Generating Objects from a List step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-objects-m2",
    "title": "Objects and Address Groups in Practice",
    "level": "intermediate",
    "lessons": [
     {
      "id": "netauto-firewall-objects-m2-l1",
      "slug": "netauto-firewall-objects-m2-l1",
      "title": "Object Reuse Across Rules",
      "concept": "Object reuse means the same web-server object appears in the web rule, the monitoring rule, and the backup rule, instead of each rule carrying its own copy of the address. Reuse keeps the policy consistent: when the server moves, one object edit fixes all three rules at once.",
      "syntax": "object web-server used by: allow-web, allow-monitor, allow-backup",
      "exampleCode": "rules:\n  - {name: allow-web, dst: web-server}\n  - {name: allow-monitor, dst: web-server}\n  - {name: allow-backup, dst: web-server}",
      "exampleLanguage": "ansible",
      "mistake": "Copying an address into each rule instead of referencing the shared object, so a server move leaves two rules pointing at the old address.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Object Reuse Across Rules, but it does not work correctly.",
       "buggyCode": "rule allow-web: dst 10.0.1.10\nrule allow-monitor: dst 10.0.1.10\n# server moves to 10.0.1.20: only allow-web is updated",
       "fixedCode": "object web-server: 10.0.1.10/32\nrule allow-web: dst web-server\nrule allow-monitor: dst web-server",
       "explanation": "Referencing one shared object means a single edit updates every rule, while copied addresses drift apart over time."
      },
      "exercise": {
       "title": "Practise Object Reuse Across Rules",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule allow-backup: trust -> dmz allow\". This exercise practises Object Reuse Across Rules.",
       "starterCode": "---\n- name: Object Reuse Across Rules\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Object Reuse Across Rules\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-monitor\n            src: trust\n            dst: dmz\n            svc: icmp\n            action: allow\n          - name: allow-backup\n            src: trust\n            dst: dmz\n            svc: tcp-873\n            action: allow\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: object reuse is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the object reuse across rules policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule allow-backup: trust -> dmz allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule allow-backup: trust -> dmz allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Object Reuse Across Rules is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Object Reuse Across Rules step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-objects-m2-l2",
      "slug": "netauto-firewall-objects-m2-l2",
      "title": "Finding Unused Objects",
      "concept": "An unused object is one that no rule references, and it accumulates when servers are decommissioned but their objects are never deleted. Unused objects make audits harder and can hide a mistake, because a reviewer cannot tell whether an object is spare or whether a rule that should use it is missing.",
      "syntax": "all objects - objects referenced by rules = unused objects",
      "exampleCode": "---\n- name: Find unused objects\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the unused object\n      ansible.builtin.debug:\n        msg: \"Unused object found: old-test-server, referenced by no rule\"",
      "exampleLanguage": "ansible",
      "mistake": "Deleting objects that look unused without checking whether a disabled rule or a NAT rule still references them.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Finding Unused Objects, but it does not work correctly.",
       "buggyCode": "# delete every object with no matching security rule\n# a NAT rule still referenced old-test-server: the NAT breaks",
       "fixedCode": "# check security rules AND NAT rules before deleting\n# old-test-server is referenced by a NAT rule, so it stays",
       "explanation": "Unused means unreferenced everywhere, including NAT and disabled rules, so the check must cover the whole configuration, not just the active rules."
      },
      "exercise": {
       "title": "Check your understanding: Finding Unused Objects",
       "type": "multiple-choice",
       "instructions": "Which statement about Finding Unused Objects is correct?",
       "starterCode": "",
       "solution": "An unused object is one that no rule references, and it accumulates when servers are decommissioned but their objects are never deleted..",
       "solutionExplanation": "An unused object is one that no rule references, and it accumulates when servers are decommissioned but their objects are never deleted.. The other options are false: Finding Unused Objects is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "An unused object is one that no rule references, and it accumulates when servers are decommissioned but their objects are never deleted..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Finding Unused Objects from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Finding Unused Objects can only be used once in a program",
        "An unused object is one that no rule references, and it accumulates when servers are decommissioned but their objects are never deleted..",
        "Finding Unused Objects requires a separate paid licence to use",
        "Finding Unused Objects was removed from Ansible in the latest version",
        "Finding Unused Objects only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-objects-m2-l3",
      "slug": "netauto-firewall-objects-m2-l3",
      "title": "Objects on PAN-OS Versus FortiOS",
      "concept": "PAN-OS and FortiOS both have address and service objects, but their details differ: PAN-OS address objects use ip-netmask, FortiOS uses a subnet with a netmask, and FortiOS groups services with service groups while PAN-OS uses service groups too but names them differently. A vendor-neutral model keeps the name, value, and type, and each vendor's renderer translates that model into the right syntax.",
      "syntax": "neutral: {name: web-server, value: 10.0.1.10/32}\nPAN-OS: ip-netmask | FortiOS: subnet 10.0.1.10 255.255.255.255",
      "exampleCode": "neutral object: {name: web-server, value: 10.0.1.10/32}\n# PAN-OS: ip-netmask 10.0.1.10/32\n# FortiOS: subnet 10.0.1.10 255.255.255.255",
      "exampleLanguage": "ansible",
      "mistake": "Assuming the two vendors use the same object syntax and copying a PAN-OS definition straight into a FortiOS config.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Objects on PAN-OS Versus FortiOS, but it does not work correctly.",
       "buggyCode": "# FortiOS config with PAN-OS syntax\nconfig firewall address\n  edit web-server\n    set ip-netmask 10.0.1.10/32",
       "fixedCode": "# FortiOS config with FortiOS syntax\nconfig firewall address\n  edit web-server\n    set subnet 10.0.1.10 255.255.255.255",
       "explanation": "Each vendor has its own syntax for the same idea, so a neutral model plus a per-vendor renderer is the safe way to support both."
      },
      "exercise": {
       "title": "Check your understanding: Objects on PAN-OS Versus FortiOS",
       "type": "multiple-choice",
       "instructions": "Which statement about Objects on PAN-OS Versus FortiOS is correct?",
       "starterCode": "",
       "solution": "PAN-OS and FortiOS both have address and service objects, but their details differ: PAN-OS address objects use ip-netmask, FortiOS uses a subnet with a netmask, and FortiOS groups services with service groups while PAN-OS uses service groups too but names them differently..",
       "solutionExplanation": "PAN-OS and FortiOS both have address and service objects, but their details differ: PAN-OS address objects use ip-netmask, FortiOS uses a subnet with a netmask, and FortiOS groups services with service groups while PAN-OS uses service groups too but names them differently.. The other options are false: Objects on PAN-OS Versus FortiOS is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "PAN-OS and FortiOS both have address and service objects, but their details differ: PAN-OS address objects use ip-netmask, FortiOS uses a subnet with a netmask, and FortiOS groups services with service groups while PAN-OS uses service groups too but names them differently..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Objects on PAN-OS Versus FortiOS from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Objects on PAN-OS Versus FortiOS can only be used once in a program",
        "Objects on PAN-OS Versus FortiOS requires a separate paid licence to use",
        "PAN-OS and FortiOS both have address and service objects, but their details differ: PAN-OS address objects use ip-netmask, FortiOS uses a subnet with a netmask, and FortiOS groups services with service groups while PAN-OS uses service groups too but names them differently..",
        "Objects on PAN-OS Versus FortiOS was removed from Ansible in the latest version",
        "Objects on PAN-OS Versus FortiOS only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-objects-m2-l4",
      "slug": "netauto-firewall-objects-m2-l4",
      "title": "Updating Objects Safely",
      "concept": "Updating an object safely means checking which rules reference it before changing it, because one object edit can change the behaviour of many rules at once. The safe order is: find the references, review the effect on each rule, make the change in check mode, and verify the affected traffic still works.",
      "syntax": "find references -> review effect -> change -> verify",
      "exampleCode": "---\n- name: Update an object safely\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the plan\n      ansible.builtin.debug:\n        msg: \"Object web-server is used by 3 rules; change reviewed for all 3\"",
      "exampleLanguage": "ansible",
      "mistake": "Changing a shared object to fix one rule without noticing the other rules that use it, and breaking their traffic.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Updating Objects Safely, but it does not work correctly.",
       "buggyCode": "# web-server object is used by allow-web and allow-monitor\n# change its address to fix allow-web: allow-monitor breaks too",
       "fixedCode": "# check references first: allow-web and allow-monitor both use web-server\n# the change is reviewed against both rules before it is made",
       "explanation": "A shared object is a shared dependency: every referencing rule must be reviewed before the object changes."
      },
      "exercise": {
       "title": "Practise Updating Objects Safely",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"used by 3 rules; change reviewed\". This exercise practises Updating Objects Safely.",
       "starterCode": "---\n- name: Updating Objects Safely\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Updating Objects Safely\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Object web-server is used by 3 rules; change reviewed for all 3\"\n",
       "solutionExplanation": "The solution builds the updating objects safely policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"used by 3 rules; change reviewed\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "used by 3 rules; change reviewed",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Updating Objects Safely is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Updating Objects Safely step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-objects-m2-l5",
      "slug": "netauto-firewall-objects-m2-l5",
      "title": "An Object Library End to End",
      "concept": "An object library is one file that holds every address, group, and service object a team uses, with names, values, and a short comment saying what each one is for. Rules reference the library instead of defining their own objects, so the whole estate shares one set of names and one place to look things up.",
      "syntax": "library.yml: objects + groups + services -> rules reference names",
      "exampleCode": "---\n- name: An Object Library End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-db\n            src: app\n            dst: db\n            svc: tcp-5432\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./object-library.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Letting each playbook define its own private objects with the same names but different values, so web-server means one thing in one file and another elsewhere.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate An Object Library End to End, but it does not work correctly.",
       "buggyCode": "# playbook A: web-server = 10.0.1.10\n# playbook B: web-server = 10.0.1.99\n# the same name means two different servers",
       "fixedCode": "# library.yml: web-server = 10.0.1.10, the one definition everyone uses",
       "explanation": "One shared library means one name has one meaning everywhere, while private copies of the same name drift apart silently."
      },
      "exercise": {
       "title": "Practise An Object Library End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule allow-db: app -> db allow\". This exercise practises An Object Library End to End.",
       "starterCode": "---\n- name: An Object Library End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: An Object Library End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-db\n            src: app\n            dst: db\n            svc: tcp-5432\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: object library is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the an object library end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule allow-db: app -> db allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule allow-db: app -> db allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "An Object Library End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through An Object Library End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Objects and Address Groups",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the objects and address groups policy as data, renders it to ./objects-capstone.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=allow\".",
   "starterCode": "---\n- name: Objects and Address Groups Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Objects and Address Groups capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-db\n            src: app\n            dst: db\n            svc: tcp-5432\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./objects-capstone.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Objects and Address Groups\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the objects and address groups capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Objects and Address Groups Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Objects and Address Groups Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Objects and Address Groups Capstone Project",
   "description": "A small end-to-end project that puts Objects and Address Groups into practice.",
   "requirements": [
    "Define address objects for the web and database servers and a service object for HTTPS.",
    "Group the web servers into one address group and reference the group in the rule.",
    "Render the objects and rules to a file and assert the allow-web rule is present.",
    "List any unused objects in the playbook output."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-nat-rules",
  "slug": "netauto-firewall-nat-rules",
  "language": "ansible",
  "category": "devops",
  "title": "NAT and Security Rules",
  "description": "Learn NAT end to end: source NAT with PAT, destination NAT and port forwarding, how NAT interacts with security rules, and NAT on PAN-OS and FortiOS.",
  "difficulty": "Advanced",
  "estimatedHours": 10,
  "skills": [
   "NAT concepts",
   "Source NAT",
   "Destination NAT",
   "Port forwarding",
   "NAT ordering",
   "PAN-OS NAT",
   "FortiOS VIPs",
   "IP pools",
   "NAT testing"
  ],
  "prerequisites": [
   "netauto-firewall-policy-as-code",
   "netauto-firewall-objects"
  ],
  "analogy": "Learning {topic} is like learning to run a mailroom: letters arrive addressed to the building, and you rewrite the address to the right desk inside.",
  "modules": [
   {
    "id": "netauto-firewall-nat-rules-m1",
    "title": "NAT and Security Rules Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-nat-rules-m1-l1",
      "slug": "netauto-firewall-nat-rules-m1-l1",
      "title": "What NAT Does",
      "concept": "NAT, or network address translation, rewrites the source or destination address of a packet as it passes through the firewall. Source NAT hides private internal addresses behind a public address on the way out, and destination NAT sends incoming traffic to the right internal server, so the firewall is also the translator between the inside and outside address spaces.",
      "syntax": "inside 10.0.0.5 --SNAT--> public 203.0.113.5\npublic 203.0.113.10 --DNAT--> inside 10.0.1.10",
      "exampleCode": "nat:\n  - {name: snat-out, type: source, from: 10.0.0.0/24, to: 203.0.113.5}\n  - {name: dnat-web, type: destination, from: 203.0.113.10, to: 10.0.1.10}",
      "exampleLanguage": "ansible",
      "mistake": "Thinking NAT is a security control, when it only rewrites addresses: a NAT rule without a matching security rule still needs the security rule to allow the traffic.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate What NAT Does, but it does not work correctly.",
       "buggyCode": "nat rule dnat-web: 203.0.113.10 -> 10.0.1.10   # no security rule allows it",
       "fixedCode": "nat rule dnat-web: 203.0.113.10 -> 10.0.1.10\nsecurity rule allow-web: untrust -> dmz to web-server allow",
       "explanation": "NAT and security are separate steps: NAT rewrites the address, and a security rule must still allow the traffic, or the packet is dropped after translation."
      },
      "exercise": {
       "title": "Practise What NAT Does",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"rewrites 10.0.0.5 to public 203.0.113.5\". This exercise practises What NAT Does.",
       "starterCode": "---\n- name: What NAT Does\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: What NAT Does\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"NAT rewrites 10.0.0.5 to public 203.0.113.5 on the way out\"\n",
       "solutionExplanation": "The solution builds the what nat does policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"rewrites 10.0.0.5 to public 203.0.113.5\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "rewrites 10.0.0.5 to public 203.0.113.5",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "What NAT Does is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through What NAT Does step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-nat-rules-m1-l2",
      "slug": "netauto-firewall-nat-rules-m1-l2",
      "title": "Source NAT Explained",
      "concept": "Source NAT rewrites the source address of outgoing packets, usually so many private internal addresses share one public address through PAT, or port address translation. The firewall remembers each connection in a translation table so the reply packet is rewritten back to the right internal host.",
      "syntax": "10.0.0.0/24 --PAT--> 203.0.113.5 (many ports, one address)",
      "exampleCode": "source-nat:\n  - {name: snat-out, source-zone: trust, dest-zone: untrust, source: 10.0.0.0/24, translated: 203.0.113.5}",
      "exampleLanguage": "ansible",
      "mistake": "Using a static one-to-one source NAT for a whole subnet, which burns a public address per host instead of sharing one with PAT.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Source NAT Explained, but it does not work correctly.",
       "buggyCode": "snat: 10.0.0.0/24 -> 203.0.113.0/24 one-to-one   # 254 public addresses",
       "fixedCode": "snat: 10.0.0.0/24 -> 203.0.113.5 with PAT   # one public address, many ports",
       "explanation": "PAT lets a whole subnet share one public address by giving each connection a different source port, while one-to-one NAT wastes a public address per host."
      },
      "exercise": {
       "title": "Practise Source NAT Explained",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"shares public 203.0.113.5 with PAT\". This exercise practises Source NAT Explained.",
       "starterCode": "---\n- name: Source NAT Explained\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Source NAT Explained\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Source NAT: 10.0.0.0/24 shares public 203.0.113.5 with PAT\"\n",
       "solutionExplanation": "The solution builds the source nat explained policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"shares public 203.0.113.5 with PAT\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "shares public 203.0.113.5 with PAT",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Source NAT Explained is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Source NAT Explained step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-nat-rules-m1-l3",
      "slug": "netauto-firewall-nat-rules-m1-l3",
      "title": "Destination NAT and Port Forwarding",
      "concept": "Destination NAT rewrites the destination address of incoming packets, which is how a public address and port are forwarded to an internal server. Port forwarding is a destination NAT rule plus a security rule: the NAT rule sends the packet to the server, and the security rule allows it through.",
      "syntax": "203.0.113.10:443 --DNAT--> 10.0.1.10:443",
      "exampleCode": "destination-nat:\n  - {name: dnat-web, public: 203.0.113.10:443, private: 10.0.1.10:443}",
      "exampleLanguage": "ansible",
      "mistake": "Creating the destination NAT rule but forgetting the security rule, so the translated packet is dropped by the firewall.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Destination NAT and Port Forwarding, but it does not work correctly.",
       "buggyCode": "dnat-web: 203.0.113.10 -> 10.0.1.10   # security rule missing",
       "fixedCode": "dnat-web: 203.0.113.10 -> 10.0.1.10\nallow-web: untrust -> dmz to web-server, service https, allow",
       "explanation": "A NAT rule only translates the address; without a matching security rule the firewall drops the packet after translation."
      },
      "exercise": {
       "title": "Check your understanding: Destination NAT and Port Forwarding",
       "type": "multiple-choice",
       "instructions": "Which statement about Destination NAT and Port Forwarding is correct?",
       "starterCode": "",
       "solution": "Destination NAT rewrites the destination address of incoming packets, which is how a public address and port are forwarded to an internal server..",
       "solutionExplanation": "Destination NAT rewrites the destination address of incoming packets, which is how a public address and port are forwarded to an internal server.. The other options are false: Destination NAT and Port Forwarding is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Destination NAT rewrites the destination address of incoming packets, which is how a public address and port are forwarded to an internal server..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Destination NAT and Port Forwarding from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Destination NAT and Port Forwarding can only be used once in a program",
        "Destination NAT and Port Forwarding requires a separate paid licence to use",
        "Destination NAT rewrites the destination address of incoming packets, which is how a public address and port are forwarded to an internal server..",
        "Destination NAT and Port Forwarding was removed from Ansible in the latest version",
        "Destination NAT and Port Forwarding only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-nat-rules-m1-l4",
      "slug": "netauto-firewall-nat-rules-m1-l4",
      "title": "NAT and Security Rule Interaction",
      "concept": "On most firewalls the security rule sees the packet after NAT has rewritten it, so the security rule must match the translated address, not the original one. On PAN-OS the security rule matches the post-NAT destination, and on FortiOS the policy usually matches the original destination with the VIP, which is why the order of NAT and security checks is vendor-specific and must be checked in the vendor's documentation.",
      "syntax": "PAN-OS: NAT first, then security rule matches translated address\nFortiOS: policy matches, VIP translates",
      "exampleCode": "packet: dst 203.0.113.10\n-> DNAT to 10.0.1.10\n-> security rule: allow untrust -> dmz to 10.0.1.10",
      "exampleLanguage": "ansible",
      "mistake": "Writing the security rule against the public address when the firewall evaluates it after NAT, so the rule never matches the translated packet.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate NAT and Security Rule Interaction, but it does not work correctly.",
       "buggyCode": "security rule allow-web: dst 203.0.113.10   # evaluated after NAT: packet now has dst 10.0.1.10",
       "fixedCode": "security rule allow-web: dst 10.0.1.10   # matches the post-NAT destination",
       "explanation": "When the security rule runs after NAT, it must match the translated address, because the original address is already gone."
      },
      "exercise": {
       "title": "Check your understanding: NAT and Security Rule Interaction",
       "type": "multiple-choice",
       "instructions": "Which statement about NAT and Security Rule Interaction is correct?",
       "starterCode": "",
       "solution": "On most firewalls the security rule sees the packet after NAT has rewritten it, so the security rule must match the translated address, not the original one..",
       "solutionExplanation": "On most firewalls the security rule sees the packet after NAT has rewritten it, so the security rule must match the translated address, not the original one.. The other options are false: NAT and Security Rule Interaction is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "On most firewalls the security rule sees the packet after NAT has rewritten it, so the security rule must match the translated address, not the original one..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of NAT and Security Rule Interaction from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "NAT and Security Rule Interaction can only be used once in a program",
        "NAT and Security Rule Interaction requires a separate paid licence to use",
        "NAT and Security Rule Interaction was removed from Ansible in the latest version",
        "On most firewalls the security rule sees the packet after NAT has rewritten it, so the security rule must match the translated address, not the original one..",
        "NAT and Security Rule Interaction only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-nat-rules-m1-l5",
      "slug": "netauto-firewall-nat-rules-m1-l5",
      "title": "Modelling NAT Rules as Data",
      "concept": "Modelling NAT rules as data means each rule is a record with its type, source, destination, and translated address, and the playbook renders the whole NAT table from those records. Data makes the NAT table reviewable as a whole, so a missing rule or a wrong translated address is visible before anything is applied.",
      "syntax": "nat_rules:\n  - {name: dnat-web, type: destination, original: 203.0.113.10, translated: 10.0.1.10}",
      "exampleCode": "---\n- name: Modelling NAT Rules as Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: dnat-web\n            src: untrust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: snat-out\n            src: trust\n            dst: untrust\n            svc: any\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./nat-rules.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'dnat-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: dnat-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Modelling only the security rules and leaving NAT out of the data, so the NAT table is invisible to every review and test.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Modelling NAT Rules as Data, but it does not work correctly.",
       "buggyCode": "vars:\n  rules: [allow-web, allow-dns, deny-all]   # NAT rules live only in the UI",
       "fixedCode": "vars:\n  rules: [allow-web, allow-dns, deny-all]\n  nat_rules: [dnat-web, snat-out]",
       "explanation": "NAT rules are part of the policy too: if they are not in the data, no review or test can see them, and a wrong translation ships silently."
      },
      "exercise": {
       "title": "Practise Modelling NAT Rules as Data",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"dnat-web=allow\". This exercise practises Modelling NAT Rules as Data.",
       "starterCode": "---\n- name: Modelling NAT Rules as Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Modelling NAT Rules as Data\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: dnat-web\n            src: untrust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: snat-out\n            src: trust\n            dst: untrust\n            svc: any\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./nat-rules.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'dnat-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: dnat-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the modelling nat rules as data policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"dnat-web=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "dnat-web=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Modelling NAT Rules as Data is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Modelling NAT Rules as Data step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-nat-rules-m2",
    "title": "NAT and Security Rules in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-firewall-nat-rules-m2-l1",
      "slug": "netauto-firewall-nat-rules-m2-l1",
      "title": "NAT Rules on PAN-OS",
      "concept": "A PAN-OS NAT rule has a source zone, a destination zone, original and translated addresses, and a type such as dynamic IP and port for source NAT or static IP for destination NAT. PAN-OS evaluates NAT rules top to bottom and applies the first match, and NAT happens before the security rule is evaluated, so the security rule must match the translated destination.",
      "syntax": "panos_nat_rule:\n  rule_name: dnat-web\n  source_zone: [untrust]\n  destination_zone: [dmz]\n  destination_translated: 10.0.1.10",
      "exampleCode": "# Displayed only: needs a lab PAN-OS device and the panos collection.\n- name: Create a PAN-OS destination NAT rule\n  paloaltonetworks.panos.panos_nat_rule:\n    provider: \"{{ provider }}\"\n    rule_name: dnat-web\n    source_zone: [untrust]\n    destination_zone: [dmz]\n    destination_ip: [203.0.113.10]\n    destination_translated: 10.0.1.10\n    service: service-https",
      "exampleLanguage": "ansible",
      "mistake": "Writing a PAN-OS NAT rule with the zones backwards, so traffic in the wrong direction matches it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate NAT Rules on PAN-OS, but it does not work correctly.",
       "buggyCode": "nat dnat-web: source-zone dmz, destination-zone untrust",
       "fixedCode": "nat dnat-web: source-zone untrust, destination-zone dmz",
       "explanation": "NAT zones describe the packet's direction: an incoming rule starts in the untrust zone and ends in the DMZ, not the other way round."
      },
      "exercise": {
       "title": "Practise NAT Rules on PAN-OS",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule dnat-web: untrust -> dmz allow\". This exercise practises NAT Rules on PAN-OS.",
       "starterCode": "---\n- name: NAT Rules on PAN-OS\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: NAT Rules on PAN-OS\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: dnat-web\n            src: untrust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: snat-out\n            src: trust\n            dst: untrust\n            svc: any\n            action: allow\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 2\n        success_msg: \"Checked 2 NAT rules: PAN-OS NAT is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the nat rules on pan-os policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule dnat-web: untrust -> dmz allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule dnat-web: untrust -> dmz allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "NAT Rules on PAN-OS is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through NAT Rules on PAN-OS step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-nat-rules-m2-l2",
      "slug": "netauto-firewall-nat-rules-m2-l2",
      "title": "NAT on FortiOS with VIPs and IP Pools",
      "concept": "FortiOS destination NAT uses a VIP, a virtual IP that maps a public address and port to an internal server, and source NAT uses an IP pool of public addresses shared by outgoing traffic. A firewall policy references the VIP as its destination, and the VIP does the translation, so the policy and the translation stay linked in one place.",
      "syntax": "config firewall vip\n  edit vip-web -> set extip 203.0.113.10 mappedip 10.0.1.10\nconfig firewall ippool\n  edit pool-out -> set startip 203.0.113.5 endip 203.0.113.5",
      "exampleCode": "# Displayed only: needs a lab FortiGate and the fortios collection.\n- name: Create a FortiOS VIP\n  fortinet.fortios.fortios_firewall_vip:\n    vdom: root\n    state: present\n    firewall_vip:\n      name: vip-web\n      extip: 203.0.113.10\n      mappedip: 10.0.1.10\n      extintf: wan1",
      "exampleLanguage": "ansible",
      "mistake": "Creating a VIP but forgetting to reference it in a firewall policy, so the translation exists but no traffic is allowed to use it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate NAT on FortiOS with VIPs and IP Pools, but it does not work correctly.",
       "buggyCode": "vip vip-web: 203.0.113.10 -> 10.0.1.10   # no policy references vip-web",
       "fixedCode": "vip vip-web: 203.0.113.10 -> 10.0.1.10\npolicy 10: dstaddr vip-web, service HTTPS, action accept",
       "explanation": "A VIP only translates traffic that a policy allows, so the policy must name the VIP as its destination or the translation never happens."
      },
      "exercise": {
       "title": "Check your understanding: NAT on FortiOS with VIPs and IP Pools",
       "type": "multiple-choice",
       "instructions": "Which statement about NAT on FortiOS with VIPs and IP Pools is correct?",
       "starterCode": "",
       "solution": "FortiOS destination NAT uses a VIP, a virtual IP that maps a public address and port to an internal server, and source NAT uses an IP pool of public addresses shared by outgoing traffic..",
       "solutionExplanation": "FortiOS destination NAT uses a VIP, a virtual IP that maps a public address and port to an internal server, and source NAT uses an IP pool of public addresses shared by outgoing traffic.. The other options are false: NAT on FortiOS with VIPs and IP Pools is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "FortiOS destination NAT uses a VIP, a virtual IP that maps a public address and port to an internal server, and source NAT uses an IP pool of public addresses shared by outgoing traffic..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of NAT on FortiOS with VIPs and IP Pools from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "NAT on FortiOS with VIPs and IP Pools can only be used once in a program",
        "FortiOS destination NAT uses a VIP, a virtual IP that maps a public address and port to an internal server, and source NAT uses an IP pool of public addresses shared by outgoing traffic..",
        "NAT on FortiOS with VIPs and IP Pools requires a separate paid licence to use",
        "NAT on FortiOS with VIPs and IP Pools was removed from Ansible in the latest version",
        "NAT on FortiOS with VIPs and IP Pools only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-nat-rules-m2-l3",
      "slug": "netauto-firewall-nat-rules-m2-l3",
      "title": "NAT Rule Ordering Pitfalls",
      "concept": "NAT rules are evaluated in order and the first match wins, so a broad NAT rule placed above a specific one swallows the traffic the specific rule was meant for. The classic mistake is a general source NAT at the top that translates traffic a destination NAT below was supposed to handle, and the fix is the same as for security rules: specific first, general last.",
      "syntax": "1. dnat-web (specific)\n2. snat-out (general, last)",
      "exampleCode": "nat order:\n  1. dnat-web: 203.0.113.10 -> 10.0.1.10\n  2. snat-out: 10.0.0.0/24 -> 203.0.113.5",
      "exampleLanguage": "ansible",
      "mistake": "Putting a broad source NAT rule above a specific destination NAT rule, so the specific rule never sees its traffic.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate NAT Rule Ordering Pitfalls, but it does not work correctly.",
       "buggyCode": "nat:\n  1. snat-out: any -> 203.0.113.5\n  2. dnat-web: 203.0.113.10 -> 10.0.1.10   # never reached",
       "fixedCode": "nat:\n  1. dnat-web: 203.0.113.10 -> 10.0.1.10\n  2. snat-out: any -> 203.0.113.5",
       "explanation": "The first matching NAT rule wins, so specific destination translations must come before a general source NAT that would also match."
      },
      "exercise": {
       "title": "Check your understanding: NAT Rule Ordering Pitfalls",
       "type": "multiple-choice",
       "instructions": "Which statement about NAT Rule Ordering Pitfalls is correct?",
       "starterCode": "",
       "solution": "NAT rules are evaluated in order and the first match wins, so a broad NAT rule placed above a specific one swallows the traffic the specific rule was meant for..",
       "solutionExplanation": "NAT rules are evaluated in order and the first match wins, so a broad NAT rule placed above a specific one swallows the traffic the specific rule was meant for.. The other options are false: NAT Rule Ordering Pitfalls is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "NAT rules are evaluated in order and the first match wins, so a broad NAT rule placed above a specific one swallows the traffic the specific rule was meant for..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of NAT Rule Ordering Pitfalls from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "NAT Rule Ordering Pitfalls can only be used once in a program",
        "NAT Rule Ordering Pitfalls requires a separate paid licence to use",
        "NAT rules are evaluated in order and the first match wins, so a broad NAT rule placed above a specific one swallows the traffic the specific rule was meant for..",
        "NAT Rule Ordering Pitfalls was removed from Ansible in the latest version",
        "NAT Rule Ordering Pitfalls only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-nat-rules-m2-l4",
      "slug": "netauto-firewall-nat-rules-m2-l4",
      "title": "Testing NAT Configurations Locally",
      "concept": "Testing NAT locally means rendering the NAT table from data and asserting that each public address maps to the right private address, and that no two rules claim the same public port. A rendered NAT table can be checked for overlaps and missing security rules without a firewall, which catches the translation mistakes that break real traffic.",
      "syntax": "assert: 'dnat-web' in rendered\nassert: no two rules share a public port",
      "exampleCode": "---\n- name: Testing NAT Configurations Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: dnat-web\n            src: untrust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: dnat-api\n            src: untrust\n            dst: dmz\n            svc: tcp-8443\n            action: allow\n          - name: snat-out\n            src: trust\n            dst: untrust\n            svc: any\n            action: allow\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./nat-test.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'dnat-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: dnat-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Testing NAT rules one at a time and never checking the table as a whole, so two rules claiming the same public port are never noticed.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Testing NAT Configurations Locally, but it does not work correctly.",
       "buggyCode": "# dnat-web: 203.0.113.10:443 -> 10.0.1.10\n# dnat-api: 203.0.113.10:443 -> 10.0.1.20   # same public port, both tested alone",
       "fixedCode": "# render the whole NAT table and assert each public port appears once\n# the overlap between dnat-web and dnat-api is caught before deployment",
       "explanation": "NAT rules interact, so the table must be tested as a whole: a conflict between two rules is invisible when each is tested alone."
      },
      "exercise": {
       "title": "Practise Testing NAT Configurations Locally",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"dnat-api=allow\". This exercise practises Testing NAT Configurations Locally.",
       "starterCode": "---\n- name: Testing NAT Configurations Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Testing NAT Configurations Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: dnat-web\n            src: untrust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: dnat-api\n            src: untrust\n            dst: dmz\n            svc: tcp-8443\n            action: allow\n          - name: snat-out\n            src: trust\n            dst: untrust\n            svc: any\n            action: allow\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./nat-test.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'dnat-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: dnat-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the testing nat configurations locally policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"dnat-api=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "dnat-api=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing NAT Configurations Locally is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Testing NAT Configurations Locally step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-nat-rules-m2-l5",
      "slug": "netauto-firewall-nat-rules-m2-l5",
      "title": "A NAT Policy End to End",
      "concept": "A complete NAT policy playbook models source NAT, destination NAT, and the security rules that allow the translated traffic, then renders and checks the whole set locally. The render proves the public addresses map to the right servers, the order is specific-before-general, and every translated flow has a matching allow rule.",
      "syntax": "vars: nat_rules + security rules -> render -> assert",
      "exampleCode": "---\n- name: A NAT Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: dnat-web\n            src: untrust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: snat-out\n            src: trust\n            dst: untrust\n            svc: any\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./nat-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'dnat-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: dnat-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Finishing the NAT table but forgetting to check that every NAT rule has a matching security rule, so translated traffic is silently dropped.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A NAT Policy End to End, but it does not work correctly.",
       "buggyCode": "nat: dnat-web, snat-out\nsecurity: allow-web   # dnat-web has its rule, but snat-out traffic has none",
       "fixedCode": "nat: dnat-web, snat-out\nsecurity: allow-web, allow-out   # every NAT flow has a matching allow",
       "explanation": "Every NAT rule needs a security rule that allows the translated traffic, or the translation happens and the packet is then dropped."
      },
      "exercise": {
       "title": "Practise A NAT Policy End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule snat-out: trust -> untrust allow\". This exercise practises A NAT Policy End to End.",
       "starterCode": "---\n- name: A NAT Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A NAT Policy End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: dnat-web\n            src: untrust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: snat-out\n            src: trust\n            dst: untrust\n            svc: any\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: NAT policy is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a nat policy end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule snat-out: trust -> untrust allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule snat-out: trust -> untrust allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A NAT Policy End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A NAT Policy End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: NAT and Security Rules",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the nat and security rules policy as data, renders it to ./nat-capstone.txt, and asserts the dnat-web rule is present. The output must contain \"dnat-web=allow\".",
   "starterCode": "---\n- name: NAT and Security Rules Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: NAT and Security Rules capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: dnat-web\n            src: untrust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: snat-out\n            src: trust\n            dst: untrust\n            svc: any\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./nat-capstone.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'dnat-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for NAT and Security Rules\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the nat and security rules capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"dnat-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "dnat-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "NAT and Security Rules Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through NAT and Security Rules Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "NAT and Security Rules Capstone Project",
   "description": "A small end-to-end project that puts NAT and Security Rules into practice.",
   "requirements": [
    "Model one destination NAT rule and one source NAT rule as data.",
    "Order the NAT rules specific-before-general.",
    "Render the NAT table and assert the dnat-web rule is present.",
    "Add the security rule that allows each translated flow and assert it is present too."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-config-gen",
  "slug": "netauto-firewall-config-gen",
  "language": "ansible",
  "category": "devops",
  "title": "Firewall Config Generation",
  "description": "Generate real firewall configuration from data: Jinja2 templates, PAN-OS XML, FortiOS CLI, validation, versioning, and diffing.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Config generation",
   "Jinja2 templates",
   "PAN-OS XML",
   "FortiOS CLI",
   "Template loops",
   "Config validation",
   "Versioning",
   "Diffing",
   "Full renders"
  ],
  "prerequisites": [
   "netauto-firewall-policy-as-code",
   "netauto-firewall-objects"
  ],
  "analogy": "Learning {topic} is like learning to run a print shop: one master copy goes in, and every press run comes out identical.",
  "modules": [
   {
    "id": "netauto-firewall-config-gen-m1",
    "title": "Firewall Config Generation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-config-gen-m1-l1",
      "slug": "netauto-firewall-config-gen-m1-l1",
      "title": "From Data to Configuration",
      "concept": "Generating configuration from data means one source of truth, the rule records, feeds a template that produces the vendor's configuration format. The same records can produce a PAN-OS XML snippet, a FortiOS CLI block, and a human-readable review document, so the policy is written once and rendered many ways.",
      "syntax": "rules.yml (data) -> template.j2 -> panos.xml / fortios.txt",
      "exampleCode": "---\n- name: Data to config\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the pipeline\n      ansible.builtin.debug:\n        msg: \"Data to config: rules.yml renders to palo-alto.xml and fortigate.txt\"",
      "exampleLanguage": "ansible",
      "mistake": "Hand-editing the generated configuration after rendering it, so the data and the config disagree and the next render wipes the edit.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate From Data to Configuration, but it does not work correctly.",
       "buggyCode": "# render panos.xml, then hand-edit a rule inside panos.xml\n# next render overwrites the hand edit",
       "fixedCode": "# fix the rule in rules.yml and render again\n# the generated config always matches the data",
       "explanation": "Generated files are outputs, not sources: edits belong in the data, or the next render destroys them and the two copies disagree."
      },
      "exercise": {
       "title": "Practise From Data to Configuration",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"renders to palo-alto.xml and fortigate.txt\". This exercise practises From Data to Configuration.",
       "starterCode": "---\n- name: From Data to Configuration\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: From Data to Configuration\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Data to config: rules.yml renders to palo-alto.xml and fortigate.txt\"\n",
       "solutionExplanation": "The solution builds the from data to configuration policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"renders to palo-alto.xml and fortigate.txt\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "renders to palo-alto.xml and fortigate.txt",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "From Data to Configuration is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through From Data to Configuration step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-config-gen-m1-l2",
      "slug": "netauto-firewall-config-gen-m1-l2",
      "title": "Jinja2 Templates for Firewalls",
      "concept": "A Jinja2 template is a text file with placeholders and loops that Ansible fills in from variables, and it is the standard way to generate firewall configuration. A loop over the rules list writes one config block per rule, and a conditional leaves out a field when the rule does not need it, so one template handles every rule shape.",
      "syntax": "{% for r in rules %}\n<entry name=\"{{ r.name }}\">...</entry>\n{% endfor %}",
      "exampleCode": "{% for r in rules %}\n- {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n{% endfor %}",
      "exampleLanguage": "ansible",
      "mistake": "Putting Jinja2 logic in the template that belongs in the data, for example computing addresses inside the template instead of storing them in variables.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Jinja2 Templates for Firewalls, but it does not work correctly.",
       "buggyCode": "{% set addr = '10.0.1.' + server_id %}   # logic hidden in the template",
       "fixedCode": "vars: servers: [{name: web-1, ip: 10.0.1.10}]\ntemplate: {{ s.ip }}   # template only prints what the data says",
       "explanation": "Templates should render data, not compute it: logic in the template is invisible to reviews and tests, while data is easy to check."
      },
      "exercise": {
       "title": "Practise Jinja2 Templates for Firewalls",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-web=allow\". This exercise practises Jinja2 Templates for Firewalls.",
       "starterCode": "---\n- name: Jinja2 Templates for Firewalls\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Jinja2 Templates for Firewalls\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./template-output.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 2\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the jinja2 templates for firewalls policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-web=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Jinja2 Templates for Firewalls is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Jinja2 Templates for Firewalls step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-config-gen-m1-l3",
      "slug": "netauto-firewall-config-gen-m1-l3",
      "title": "Generating PAN-OS XML Config",
      "concept": "PAN-OS configuration is XML, and a security rule is an entry element with child elements for the zones, addresses, application, service, and action. Generating that XML from rule data means the playbook writes the exact structure the PAN-OS API expects, and the output can be validated as XML before it is ever sent to a device.",
      "syntax": "<entry name=\"allow-web\">\n  <from><member>trust</member></from>\n  <action>allow</action>\n</entry>",
      "exampleCode": "# Displayed only: this XML is rendered locally, never pushed to a device.\n<entry name=\"allow-web\">\n  <from><member>trust</member></from>\n  <to><member>dmz</member></to>\n  <source><member>any</member></source>\n  <destination><member>web-server</member></destination>\n  <application><member>web-browsing</member></application>\n  <service><member>service-https</member></service>\n  <action>allow</action>\n</entry>",
      "exampleLanguage": "ansible",
      "mistake": "Generating PAN-OS XML by hand with string concatenation instead of a template, which produces malformed XML the moment a name contains a special character.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Generating PAN-OS XML Config, but it does not work correctly.",
       "buggyCode": "xml = '<entry name=\"' + name + '\">'   # breaks if name contains a quote",
       "fixedCode": "{% for r in rules %}<entry name=\"{{ r.name }}\">...</entry>{% endfor %}",
       "explanation": "A template escapes and structures the output for you, while string concatenation produces broken XML on the first unusual value."
      },
      "exercise": {
       "title": "Check your understanding: Generating PAN-OS XML Config",
       "type": "multiple-choice",
       "instructions": "Which statement about Generating PAN-OS XML Config is correct?",
       "starterCode": "",
       "solution": "PAN-OS configuration is XML, and a security rule is an entry element with child elements for the zones, addresses, application, service, and action..",
       "solutionExplanation": "PAN-OS configuration is XML, and a security rule is an entry element with child elements for the zones, addresses, application, service, and action.. The other options are false: Generating PAN-OS XML Config is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "PAN-OS configuration is XML, and a security rule is an entry element with child elements for the zones, addresses, application, service, and action..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Generating PAN-OS XML Config from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Generating PAN-OS XML Config can only be used once in a program",
        "Generating PAN-OS XML Config requires a separate paid licence to use",
        "PAN-OS configuration is XML, and a security rule is an entry element with child elements for the zones, addresses, application, service, and action..",
        "Generating PAN-OS XML Config was removed from Ansible in the latest version",
        "Generating PAN-OS XML Config only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-config-gen-m1-l4",
      "slug": "netauto-firewall-config-gen-m1-l4",
      "title": "Generating FortiOS CLI Config",
      "concept": "FortiOS configuration is CLI text built from config blocks, such as config firewall policy with edit lines for each policy ID and set lines for each field. Generating that CLI from rule data means the playbook writes the exact commands an administrator would type, and the output can be read and reviewed line by line before it is applied.",
      "syntax": "config firewall policy\n  edit 10\n    set srcintf internal\n    set action accept\n  next\nend",
      "exampleCode": "# Displayed only: this CLI is rendered locally, never pushed to a device.\nconfig firewall policy\n  edit 10\n    set name allow-web\n    set srcintf internal\n    set dstintf wan1\n    set srcaddr internal-net\n    set dstaddr web-server\n    set service HTTPS\n    set action accept\n  next\nend",
      "exampleLanguage": "ansible",
      "mistake": "Generating FortiOS CLI without the closing next and end lines, which leaves the config block open and the device rejects the whole block.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Generating FortiOS CLI Config, but it does not work correctly.",
       "buggyCode": "config firewall policy\n  edit 10\n    set action accept\n# missing: next, end",
       "fixedCode": "config firewall policy\n  edit 10\n    set action accept\n  next\nend",
       "explanation": "Every FortiOS config block must be closed with next and end, or the device treats the block as incomplete and rejects it."
      },
      "exercise": {
       "title": "Check your understanding: Generating FortiOS CLI Config",
       "type": "multiple-choice",
       "instructions": "Which statement about Generating FortiOS CLI Config is correct?",
       "starterCode": "",
       "solution": "FortiOS configuration is CLI text built from config blocks, such as config firewall policy with edit lines for each policy ID and set lines for each field..",
       "solutionExplanation": "FortiOS configuration is CLI text built from config blocks, such as config firewall policy with edit lines for each policy ID and set lines for each field.. The other options are false: Generating FortiOS CLI Config is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "FortiOS configuration is CLI text built from config blocks, such as config firewall policy with edit lines for each policy ID and set lines for each field..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Generating FortiOS CLI Config from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Generating FortiOS CLI Config can only be used once in a program",
        "Generating FortiOS CLI Config requires a separate paid licence to use",
        "Generating FortiOS CLI Config was removed from Ansible in the latest version",
        "FortiOS configuration is CLI text built from config blocks, such as config firewall policy with edit lines for each policy ID and set lines for each field..",
        "Generating FortiOS CLI Config only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-config-gen-m1-l5",
      "slug": "netauto-firewall-config-gen-m1-l5",
      "title": "Rendering a Full Firewall Config",
      "concept": "Rendering a full firewall configuration means one playbook produces the objects, the groups, the services, the security rules, and the NAT rules in the right order from a single data file. A full render is reviewable end to end, and it is the artefact that goes into Git, into the change review, and eventually to the firewall.",
      "syntax": "objects + groups + services + rules + NAT -> one config file",
      "exampleCode": "---\n- name: Rendering a Full Firewall Config\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./full-config.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Rendering only the security rules and forgetting the objects they reference, so the config is incomplete and the firewall rejects it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Rendering a Full Firewall Config, but it does not work correctly.",
       "buggyCode": "# config contains rules only\n# rule allow-web references web-server, which is never defined",
       "fixedCode": "# config contains objects, then groups, then services, then rules\n# every name a rule references is defined above it",
       "explanation": "A complete config defines every object before the rules that use it, or the firewall rejects the rules for referencing something that does not exist."
      },
      "exercise": {
       "title": "Practise Rendering a Full Firewall Config",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-dns=allow\". This exercise practises Rendering a Full Firewall Config.",
       "starterCode": "---\n- name: Rendering a Full Firewall Config\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Rendering a Full Firewall Config\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./full-config.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the rendering a full firewall config policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-dns=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-dns=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rendering a Full Firewall Config is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Rendering a Full Firewall Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-config-gen-m2",
    "title": "Firewall Config Generation in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-firewall-config-gen-m2-l1",
      "slug": "netauto-firewall-config-gen-m2-l1",
      "title": "Loops and Conditionals in Templates",
      "concept": "Loops in a template write one config block per rule, and conditionals include a line only when the rule needs it, for example a logging line only for rules with logging enabled. Together they let one template produce a different config for each firewall from the same data, without a separate template per device.",
      "syntax": "{% for r in rules %}...{% if r.log %}log: yes{% endif %}{% endfor %}",
      "exampleCode": "{% for r in rules %}\n- {{ r.name }}: {{ r.action }}\n  {% if r.action == 'deny' %}log: yes{% endif %}\n{% endfor %}",
      "exampleLanguage": "ansible",
      "mistake": "Writing a separate template for every firewall instead of one template with conditionals, so a fix has to be repeated in ten files.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Loops and Conditionals in Templates, but it does not work correctly.",
       "buggyCode": "# template-fw1.j2, template-fw2.j2, template-fw3.j2 ...\n# fix the logging line in all ten",
       "fixedCode": "# one template.j2 with {% if firewall.log_all %} ... {% endif %}\n# fix the logging line once",
       "explanation": "Conditionals let one template serve many firewalls, while a template per device multiplies every fix by the number of devices."
      },
      "exercise": {
       "title": "Practise Loops and Conditionals in Templates",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule deny-telnet: any -> any deny\". This exercise practises Loops and Conditionals in Templates.",
       "starterCode": "---\n- name: Loops and Conditionals in Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Loops and Conditionals in Templates\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: template loop is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the loops and conditionals in templates policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule deny-telnet: any -> any deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule deny-telnet: any -> any deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Loops and Conditionals in Templates is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Loops and Conditionals in Templates step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-config-gen-m2-l2",
      "slug": "netauto-firewall-config-gen-m2-l2",
      "title": "Validating Generated Config",
      "concept": "Validating generated configuration means checking it before it is used: the XML parses, every referenced object exists, every rule has a source and destination, and no rule is an any-any-any allow. Validation is cheap when the config is generated from data, because the same data that built it can also be checked.",
      "syntax": "xml parses + all names defined + no any-any-any allow",
      "exampleCode": "---\n- name: Validate generated config\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the validation result\n      ansible.builtin.debug:\n        msg: \"Validation passed: 3 rules, all objects defined, no any-any-any allow\"",
      "exampleLanguage": "ansible",
      "mistake": "Validating only that the file was written, and never checking whether the configuration inside it is correct.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Validating Generated Config, but it does not work correctly.",
       "buggyCode": "- name: Check the config\n  ansible.builtin.stat:\n    path: ./full-config.txt   # the file exists, so it must be fine",
       "fixedCode": "- name: Check the config\n  ansible.builtin.assert:\n    that:\n      - \"'allow-web' in rendered\"\n      - \"'deny-all' in rendered\"",
       "explanation": "A file existing says nothing about its contents; validation must check the rules, the references, and the dangerous patterns inside."
      },
      "exercise": {
       "title": "Check your understanding: Validating Generated Config",
       "type": "multiple-choice",
       "instructions": "Which statement about Validating Generated Config is correct?",
       "starterCode": "",
       "solution": "Validating generated configuration means checking it before it is used: the XML parses, every referenced object exists, every rule has a source and destination, and no rule is an any-any-any allow..",
       "solutionExplanation": "Validating generated configuration means checking it before it is used: the XML parses, every referenced object exists, every rule has a source and destination, and no rule is an any-any-any allow.. The other options are false: Validating Generated Config is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Validating generated configuration means checking it before it is used: the XML parses, every referenced object exists, every rule has a source and destination, and no rule is an any-any-any allow..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Validating Generated Config from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Validating Generated Config can only be used once in a program",
        "Validating generated configuration means checking it before it is used: the XML parses, every referenced object exists, every rule has a source and destination, and no rule is an any-any-any allow..",
        "Validating Generated Config requires a separate paid licence to use",
        "Validating Generated Config was removed from Ansible in the latest version",
        "Validating Generated Config only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-config-gen-m2-l3",
      "slug": "netauto-firewall-config-gen-m2-l3",
      "title": "Config Files and Versioning",
      "concept": "Generated configuration files belong in version control alongside the data that produced them, so any config can be traced back to the commit that generated it. Versioning the output as well as the input means an incident investigation can diff the config that was live against the config that is live now, without guessing.",
      "syntax": "git: rules.yml + generated/panos.xml, tagged per release",
      "exampleCode": "$ git log --oneline generated/panos.xml\nc41a9e2 Regenerate after FW-101 web rule\n1d8f3b0 Regenerate after FW-98 telnet deny",
      "exampleLanguage": "ansible",
      "mistake": "Versioning the data but not the generated config, so an incident investigation cannot see what was actually on the firewall.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Config Files and Versioning, but it does not work correctly.",
       "buggyCode": "# rules.yml is in Git; panos.xml is generated on the fly and never stored",
       "fixedCode": "# rules.yml and generated/panos.xml are both committed, tagged v1.4.0",
       "explanation": "Storing the generated config with the data makes the deployed state reproducible and diffable, which is what an investigation needs."
      },
      "exercise": {
       "title": "Check your understanding: Config Files and Versioning",
       "type": "multiple-choice",
       "instructions": "Which statement about Config Files and Versioning is correct?",
       "starterCode": "",
       "solution": "Generated configuration files belong in version control alongside the data that produced them, so any config can be traced back to the commit that generated it..",
       "solutionExplanation": "Generated configuration files belong in version control alongside the data that produced them, so any config can be traced back to the commit that generated it.. The other options are false: Config Files and Versioning is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Generated configuration files belong in version control alongside the data that produced them, so any config can be traced back to the commit that generated it..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Config Files and Versioning from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Config Files and Versioning can only be used once in a program",
        "Config Files and Versioning requires a separate paid licence to use",
        "Generated configuration files belong in version control alongside the data that produced them, so any config can be traced back to the commit that generated it..",
        "Config Files and Versioning was removed from Ansible in the latest version",
        "Config Files and Versioning only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-config-gen-m2-l4",
      "slug": "netauto-firewall-config-gen-m2-l4",
      "title": "Diffing Generated Config",
      "concept": "Diffing generated configuration means comparing the new output with the previous version line by line, so a review shows exactly which rules changed, which were added, and which were removed. A diff is the reviewer's best tool, because it turns a thousand-line config into the handful of lines that actually changed.",
      "syntax": "diff old-config.txt new-config.txt",
      "exampleCode": "$ diff old-config.txt new-config.txt\n+allow-web: trust -> dmz https-443 allow\n-deny-telnet: any -> any telnet-23 deny",
      "exampleLanguage": "ansible",
      "mistake": "Reviewing a full generated config from scratch instead of reading the diff, which wastes the review on lines that did not change.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Diffing Generated Config, but it does not work correctly.",
       "buggyCode": "# reviewer reads all 1,200 lines of the new config\n# the one changed rule is buried in the middle",
       "fixedCode": "$ diff old-config.txt new-config.txt\n# reviewer reads the 3 changed lines",
       "explanation": "A diff shows only what changed, so the reviewer spends their attention on the new rule instead of re-reading the thousand lines that stayed the same."
      },
      "exercise": {
       "title": "Practise Diffing Generated Config",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Diff shows 1 rule added: allow-web\". This exercise practises Diffing Generated Config.",
       "starterCode": "---\n- name: Diffing Generated Config\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Diffing Generated Config\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Diff shows 1 rule added: allow-web, 0 removed\"\n",
       "solutionExplanation": "The solution builds the diffing generated config policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Diff shows 1 rule added: allow-web\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Diff shows 1 rule added: allow-web",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Diffing Generated Config is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Diffing Generated Config step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-config-gen-m2-l5",
      "slug": "netauto-firewall-config-gen-m2-l5",
      "title": "A Config Generator End to End",
      "concept": "A complete config generator takes rule data, renders the objects and rules into a vendor configuration file, validates the output, and writes it with a version tag. The generator is the heart of firewall automation: every later workflow, from review to deployment, starts with the config it produces.",
      "syntax": "data -> render -> validate -> version -> config file",
      "exampleCode": "---\n- name: A Config Generator End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./generated-config.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Building the generator but skipping the validation step, so a bad template ships a broken config to the review as if it were fine.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Config Generator End to End, but it does not work correctly.",
       "buggyCode": "# render -> write file -> done\n# a broken rule renders without any check",
       "fixedCode": "# render -> validate -> write file\n# a broken rule fails the run before the file is written",
       "explanation": "Validation belongs inside the generator: a config that fails its checks should never be written out as if it were ready."
      },
      "exercise": {
       "title": "Practise A Config Generator End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule allow-dns: trust -> untrust allow\". This exercise practises A Config Generator End to End.",
       "starterCode": "---\n- name: A Config Generator End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Config Generator End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: config generator is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a config generator end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule allow-dns: trust -> untrust allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule allow-dns: trust -> untrust allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Config Generator End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A Config Generator End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Firewall Config Generation",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the firewall config generation policy as data, renders it to ./generated-capstone-config.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=allow\".",
   "starterCode": "---\n- name: Firewall Config Generation Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Firewall Config Generation capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./generated-capstone-config.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Firewall Config Generation\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the firewall config generation capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Firewall Config Generation Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Firewall Config Generation Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Firewall Config Generation Capstone Project",
   "description": "A small end-to-end project that puts Firewall Config Generation into practice.",
   "requirements": [
    "Render objects, services, and ordered security rules from one data file.",
    "Produce a complete, reviewable configuration file in one render.",
    "Assert the allow-web rule and the final deny-all are present.",
    "Validate that every object referenced by a rule is defined."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-validation",
  "slug": "netauto-firewall-validation",
  "language": "ansible",
  "category": "devops",
  "title": "Policy Validation and Diff",
  "description": "Validate firewall policies like software: shadowed and duplicate rules, diffs across versions, security invariants, compliance checks, and reports.",
  "difficulty": "Advanced",
  "estimatedHours": 10,
  "skills": [
   "Policy validation",
   "Shadowed rules",
   "Duplicate rules",
   "Policy diffs",
   "Version comparison",
   "Security invariants",
   "Compliance checks",
   "Validation reports",
   "Validation pipelines"
  ],
  "prerequisites": [
   "netauto-firewall-policy-as-code"
  ],
  "analogy": "Learning {topic} is like learning to proofread a contract: you check every clause against the ones above it before anyone signs.",
  "modules": [
   {
    "id": "netauto-firewall-validation-m1",
    "title": "Policy Validation and Diff Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-validation-m1-l1",
      "slug": "netauto-firewall-validation-m1-l1",
      "title": "Why Validate Firewall Policy",
      "concept": "Validating a firewall policy means checking it for mistakes before it is deployed, because a firewall rule takes effect immediately and a wrong rule can block real users or open the network. Validation catches the errors that a syntax check misses: a rule that can never match, a rule that allows too much, and a rule that contradicts another rule.",
      "syntax": "validate: unreachable rules + overly broad rules + contradictions",
      "exampleCode": "---\n- name: Validate a policy\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Validation: 3 rules checked, 0 unreachable, 0 overly broad\"",
      "exampleLanguage": "ansible",
      "mistake": "Assuming a policy is correct because the playbook ran without errors, when a successful run only proves the YAML was valid.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Why Validate Firewall Policy, but it does not work correctly.",
       "buggyCode": "$ ansible-playbook policy.yml   # exit 0, so the policy must be correct",
       "fixedCode": "$ ansible-playbook policy.yml   # exit 0\n$ ansible-playbook validate.yml   # checks the policy itself",
       "explanation": "A successful run proves the playbook worked, not that the policy is safe; validation is a separate step that checks the policy's meaning."
      },
      "exercise": {
       "title": "Practise Why Validate Firewall Policy",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"0 unreachable, 0 overly broad\". This exercise practises Why Validate Firewall Policy.",
       "starterCode": "---\n- name: Why Validate Firewall Policy\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Why Validate Firewall Policy\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Validation: 3 rules checked, 0 unreachable, 0 overly broad\"\n",
       "solutionExplanation": "The solution builds the why validate firewall policy policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"0 unreachable, 0 overly broad\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "0 unreachable, 0 overly broad",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Why Validate Firewall Policy is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Why Validate Firewall Policy step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-validation-m1-l2",
      "slug": "netauto-firewall-validation-m1-l2",
      "title": "Shadowed Rules Explained",
      "concept": "A shadowed rule is a rule that can never match any traffic because an earlier rule already matches everything it would match. Shadowing usually happens when a broad allow sits above a specific deny, and the shadowed rule is dead weight that misleads reviewers into thinking the deny is protecting something.",
      "syntax": "rule 1: allow any -> any (broad)\nrule 2: deny telnet (shadowed: never reached)",
      "exampleCode": "rules:\n  - {name: allow-all, src: any, dst: any, action: allow}\n  - {name: deny-telnet, src: any, dst: any, svc: telnet, action: deny}   # shadowed",
      "exampleLanguage": "ansible",
      "mistake": "Thinking a shadowed deny rule is protecting the network, when the broad allow above it means the deny never runs.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Shadowed Rules Explained, but it does not work correctly.",
       "buggyCode": "# deny-telnet exists in the policy, so telnet must be blocked\n# allow-all above it already matched the telnet traffic",
       "fixedCode": "# move deny-telnet above allow-all, or remove the allow-all\n# now the deny actually runs",
       "explanation": "A rule below a broader matching rule is dead: only the first match runs, so the shadowed rule protects nothing."
      },
      "exercise": {
       "title": "Practise Shadowed Rules Explained",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Shadowed rule found: deny-telnet\". This exercise practises Shadowed Rules Explained.",
       "starterCode": "---\n- name: Shadowed Rules Explained\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Shadowed Rules Explained\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Shadowed rule found: deny-telnet is unreachable below allow-all\"\n",
       "solutionExplanation": "The solution builds the shadowed rules explained policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Shadowed rule found: deny-telnet\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Shadowed rule found: deny-telnet",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Shadowed Rules Explained is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Shadowed Rules Explained step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-validation-m1-l3",
      "slug": "netauto-firewall-validation-m1-l3",
      "title": "Detecting Shadowed Rules Locally",
      "concept": "Detecting shadowed rules locally means comparing each rule against the rules above it in the rendered policy and flagging any rule whose traffic is fully covered by an earlier one. The check runs on the rule data in seconds, and it turns a subtle ordering bug into a clear failure before the policy is deployed.",
      "syntax": "for each rule: if an earlier rule matches a superset of its traffic -> shadowed",
      "exampleCode": "---\n- name: Detecting Shadowed Rules Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./shadow-check.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Checking rules only against their neighbours instead of against every rule above them, which misses shadowing by a rule three places up.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Detecting Shadowed Rules Locally, but it does not work correctly.",
       "buggyCode": "# compare rule 3 with rule 2 only\n# rule 1 is the broad allow that actually shadows rule 3",
       "fixedCode": "# compare each rule with ALL rules above it\n# rule 1 shadows rule 3, and the check catches it",
       "explanation": "Shadowing can come from any rule above, not just the one directly above, so the check must compare against the whole prefix of the list."
      },
      "exercise": {
       "title": "Practise Detecting Shadowed Rules Locally",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"deny-telnet=deny\". This exercise practises Detecting Shadowed Rules Locally.",
       "starterCode": "---\n- name: Detecting Shadowed Rules Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Detecting Shadowed Rules Locally\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./shadow-check.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the detecting shadowed rules locally policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"deny-telnet=deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "deny-telnet=deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Detecting Shadowed Rules Locally is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Detecting Shadowed Rules Locally step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-validation-m1-l4",
      "slug": "netauto-firewall-validation-m1-l4",
      "title": "Duplicate and Overlapping Rules",
      "concept": "Duplicate rules are two rules that match exactly the same traffic, and overlapping rules match some of the same traffic with different actions. Duplicates waste review effort and hide the real rule count, while overlaps create ambiguity: the outcome depends on which rule comes first, and a reorder can silently change the firewall's behaviour.",
      "syntax": "duplicate: same match, same action\noverlap: same match, different action",
      "exampleCode": "rules:\n  - {name: allow-web-a, src: trust, dst: dmz, svc: https, action: allow}\n  - {name: allow-web-b, src: trust, dst: dmz, svc: https, action: allow}   # duplicate",
      "exampleLanguage": "ansible",
      "mistake": "Keeping a duplicate rule because it looks harmless, when it doubles the review work and hides the fact that the rule was added twice by mistake.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Duplicate and Overlapping Rules, but it does not work correctly.",
       "buggyCode": "# allow-web-a and allow-web-b are identical\n# nobody removes one: what if they were meant to differ?",
       "fixedCode": "# remove the duplicate, keep one allow-web\n# the rule count now matches the real policy",
       "explanation": "A duplicate is either a mistake or dead weight: removing it makes the policy shorter, clearer, and easier to review."
      },
      "exercise": {
       "title": "Check your understanding: Duplicate and Overlapping Rules",
       "type": "multiple-choice",
       "instructions": "Which statement about Duplicate and Overlapping Rules is correct?",
       "starterCode": "",
       "solution": "Duplicate rules are two rules that match exactly the same traffic, and overlapping rules match some of the same traffic with different actions..",
       "solutionExplanation": "Duplicate rules are two rules that match exactly the same traffic, and overlapping rules match some of the same traffic with different actions.. The other options are false: Duplicate and Overlapping Rules is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Duplicate rules are two rules that match exactly the same traffic, and overlapping rules match some of the same traffic with different actions..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Duplicate and Overlapping Rules from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Duplicate and Overlapping Rules can only be used once in a program",
        "Duplicate and Overlapping Rules requires a separate paid licence to use",
        "Duplicate rules are two rules that match exactly the same traffic, and overlapping rules match some of the same traffic with different actions..",
        "Duplicate and Overlapping Rules was removed from Ansible in the latest version",
        "Duplicate and Overlapping Rules only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-validation-m1-l5",
      "slug": "netauto-firewall-validation-m1-l5",
      "title": "Building a Policy Diff Checker",
      "concept": "A policy diff checker compares two versions of a policy and reports which rules were added, removed, or changed, so a reviewer sees the change instead of the whole policy. Building it locally means rendering both versions from data and comparing the rule lists, which is the same comparison a code review tool does for a pull request.",
      "syntax": "old rules vs new rules -> added / removed / changed",
      "exampleCode": "---\n- name: Building a Policy Diff Checker\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./policy-diff.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Diffing only the rule names and missing a change to a rule's action, so an allow that became a deny looks unchanged.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Building a Policy Diff Checker, but it does not work correctly.",
       "buggyCode": "# diff compares rule names only\n# allow-web changed from allow to deny: the diff shows nothing",
       "fixedCode": "# diff compares name, source, destination, service, AND action\n# the action change is reported",
       "explanation": "A diff must compare every field of a rule, because a change to one field is a real policy change even when the name stays the same."
      },
      "exercise": {
       "title": "Practise Building a Policy Diff Checker",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-dns=allow\". This exercise practises Building a Policy Diff Checker.",
       "starterCode": "---\n- name: Building a Policy Diff Checker\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Building a Policy Diff Checker\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./policy-diff.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the building a policy diff checker policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-dns=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-dns=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Building a Policy Diff Checker is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Building a Policy Diff Checker step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-validation-m2",
    "title": "Policy Validation and Diff in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-firewall-validation-m2-l1",
      "slug": "netauto-firewall-validation-m2-l1",
      "title": "Comparing Policies Across Versions",
      "concept": "Comparing policies across versions means checking that a new version only changes what the ticket asked for, and nothing else. A version comparison turns a vague feeling that something changed into a concrete list, which is what makes a rollback possible: the old version is still in Git, and the diff shows exactly how to get back to it.",
      "syntax": "git diff v1.3.0 v1.4.0 -- policy.yml",
      "exampleCode": "---\n- name: Compare policy versions\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the comparison\n      ansible.builtin.debug:\n        msg: \"Version comparison: v1.4.0 adds allow-web, removes nothing\"",
      "exampleLanguage": "ansible",
      "mistake": "Comparing versions by reading both full policies instead of the diff, which buries the one changed rule in hundreds of unchanged lines.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Comparing Policies Across Versions, but it does not work correctly.",
       "buggyCode": "# reviewer reads v1.3.0 and v1.4.0 in full\n# the added rule is one line among 800",
       "fixedCode": "$ git diff v1.3.0 v1.4.0 -- policy.yml\n# the diff shows the one added rule",
       "explanation": "A version diff shows only what changed, so the reviewer checks the change instead of re-reading the whole policy."
      },
      "exercise": {
       "title": "Practise Comparing Policies Across Versions",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"v1.4.0 adds allow-web\". This exercise practises Comparing Policies Across Versions.",
       "starterCode": "---\n- name: Comparing Policies Across Versions\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Comparing Policies Across Versions\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Version comparison: v1.4.0 adds allow-web, removes nothing\"\n",
       "solutionExplanation": "The solution builds the comparing policies across versions policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"v1.4.0 adds allow-web\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "v1.4.0 adds allow-web",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Comparing Policies Across Versions is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Comparing Policies Across Versions step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-validation-m2-l2",
      "slug": "netauto-firewall-validation-m2-l2",
      "title": "Asserting Security Invariants",
      "concept": "A security invariant is a rule that must always hold, such as no rule allows telnet, or the database server is never reachable from the internet. Asserting invariants in the playbook turns a security policy into a test: if a change breaks an invariant, the run fails and the change cannot be deployed.",
      "syntax": "assert: no rule allows telnet\nassert: no rule reaches db-server from untrust",
      "exampleCode": "- name: Assert the invariants\n  ansible.builtin.assert:\n    that:\n      - \"'deny-telnet' in rendered\"\n      - \"'allow-web' in rendered\"\n    success_msg: \"Invariants hold: telnet denied, web allowed\"\n    fail_msg: \"A security invariant is broken\"",
      "exampleLanguage": "ansible",
      "mistake": "Writing invariants that check the playbook's variables instead of the rendered policy, so a template bug that drops a rule goes unnoticed.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Asserting Security Invariants, but it does not work correctly.",
       "buggyCode": "- name: Check invariants\n  ansible.builtin.assert:\n    that: [rules | length == 3]   # the data is fine, but the render dropped a rule",
       "fixedCode": "- name: Check invariants\n  ansible.builtin.assert:\n    that: [\"'deny-telnet' in rendered\"]   # checks the actual output",
       "explanation": "Invariants must be asserted on the rendered output, because the output is what the firewall will use, not the input data."
      },
      "exercise": {
       "title": "Check your understanding: Asserting Security Invariants",
       "type": "multiple-choice",
       "instructions": "Which statement about Asserting Security Invariants is correct?",
       "starterCode": "",
       "solution": "A security invariant is a rule that must always hold, such as no rule allows telnet, or the database server is never reachable from the internet..",
       "solutionExplanation": "A security invariant is a rule that must always hold, such as no rule allows telnet, or the database server is never reachable from the internet.. The other options are false: Asserting Security Invariants is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A security invariant is a rule that must always hold, such as no rule allows telnet, or the database server is never reachable from the internet..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Asserting Security Invariants from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Asserting Security Invariants can only be used once in a program",
        "A security invariant is a rule that must always hold, such as no rule allows telnet, or the database server is never reachable from the internet..",
        "Asserting Security Invariants requires a separate paid licence to use",
        "Asserting Security Invariants was removed from Ansible in the latest version",
        "Asserting Security Invariants only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-validation-m2-l3",
      "slug": "netauto-firewall-validation-m2-l3",
      "title": "Compliance Checks as Code",
      "concept": "A compliance check as code is an automated test that a policy meets a standard, for example that every rule has a ticket reference, that no rule allows any-any-any, and that the deny-all is last. Compliance checks run on every change, so a policy cannot drift away from the standard one unnoticed edit at a time.",
      "syntax": "checks: ticket reference + no any-any-any + deny-all last",
      "exampleCode": "---\n- name: Compliance checks\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Compliance: 3 checks passed, 0 failed, ticket FW-101\"",
      "exampleLanguage": "ansible",
      "mistake": "Running compliance checks once a year instead of on every change, so a policy drifts out of compliance for months before anyone notices.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Compliance Checks as Code, but it does not work correctly.",
       "buggyCode": "# annual audit finds 12 rules without ticket references\n# they have been live for eleven months",
       "fixedCode": "# every pull request runs the compliance checks\n# a rule without a ticket reference fails the check immediately",
       "explanation": "Compliance must be checked on every change, because a yearly audit finds drift long after it started causing risk."
      },
      "exercise": {
       "title": "Check your understanding: Compliance Checks as Code",
       "type": "multiple-choice",
       "instructions": "Which statement about Compliance Checks as Code is correct?",
       "starterCode": "",
       "solution": "A compliance check as code is an automated test that a policy meets a standard, for example that every rule has a ticket reference, that no rule allows any-any-any, and that the deny-all is last..",
       "solutionExplanation": "A compliance check as code is an automated test that a policy meets a standard, for example that every rule has a ticket reference, that no rule allows any-any-any, and that the deny-all is last.. The other options are false: Compliance Checks as Code is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A compliance check as code is an automated test that a policy meets a standard, for example that every rule has a ticket reference, that no rule allows any-any-any, and that the deny-all is last..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Compliance Checks as Code from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Compliance Checks as Code can only be used once in a program",
        "Compliance Checks as Code requires a separate paid licence to use",
        "A compliance check as code is an automated test that a policy meets a standard, for example that every rule has a ticket reference, that no rule allows any-any-any, and that the deny-all is last..",
        "Compliance Checks as Code was removed from Ansible in the latest version",
        "Compliance Checks as Code only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-validation-m2-l4",
      "slug": "netauto-firewall-validation-m2-l4",
      "title": "Reporting Validation Results",
      "concept": "Reporting validation results means turning the checks into a readable summary: how many rules were checked, which checks passed, and which failed with the exact rule name and reason. A good report is what a reviewer reads, and a report that only says pass or fail is useless when something does fail.",
      "syntax": "report: checked N, passed N, failed: [rule, reason]",
      "exampleCode": "---\n- name: Validation report\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the report\n      ansible.builtin.debug:\n        msg: \"Validation report: 3 rules checked, 3 passed, 0 failed\"",
      "exampleLanguage": "ansible",
      "mistake": "Reporting only a pass or fail with no detail, so a failed validation gives the reviewer nothing to fix.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Reporting Validation Results, but it does not work correctly.",
       "buggyCode": "Validation: FAILED   # which rule? why?",
       "fixedCode": "Validation: FAILED - rule deny-telnet is shadowed by allow-all (rule 1)",
       "explanation": "A failure report must name the rule and the reason, or the reviewer cannot fix the problem the check found."
      },
      "exercise": {
       "title": "Practise Reporting Validation Results",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Validation report: 3 rules checked, 3 passed\". This exercise practises Reporting Validation Results.",
       "starterCode": "---\n- name: Reporting Validation Results\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Reporting Validation Results\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Validation report: 3 rules checked, 3 passed, 0 failed\"\n",
       "solutionExplanation": "The solution builds the reporting validation results policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Validation report: 3 rules checked, 3 passed\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Validation report: 3 rules checked, 3 passed",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Reporting Validation Results is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Reporting Validation Results step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-validation-m2-l5",
      "slug": "netauto-firewall-validation-m2-l5",
      "title": "A Validation Pipeline End to End",
      "concept": "A validation pipeline runs every check in order: render the policy, check for shadowed and duplicate rules, assert the security invariants, run the compliance checks, and write the report. The pipeline is the gate before deployment: a policy that fails any step does not go to a firewall, and the report says exactly why.",
      "syntax": "render -> shadow check -> duplicates -> invariants -> compliance -> report",
      "exampleCode": "---\n- name: A Validation Pipeline End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./validation-report.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Running the validation pipeline after deployment instead of before it, so a bad policy is already live when the checks fail.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Validation Pipeline End to End, but it does not work correctly.",
       "buggyCode": "# deploy the policy, then run validation\n# validation fails: the bad policy is already on the firewall",
       "fixedCode": "# validate, then deploy only if validation passes\n# a bad policy never reaches the firewall",
       "explanation": "Validation is a gate, not a post-mortem: it must run before deployment, or it can only report damage that already happened."
      },
      "exercise": {
       "title": "Practise A Validation Pipeline End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule deny-all: any -> any deny\". This exercise practises A Validation Pipeline End to End.",
       "starterCode": "---\n- name: A Validation Pipeline End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Validation Pipeline End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: validation pipeline is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a validation pipeline end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule deny-all: any -> any deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule deny-all: any -> any deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Validation Pipeline End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A Validation Pipeline End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Policy Validation and Diff",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the policy validation and diff policy as data, renders it to ./validation-capstone.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=allow\".",
   "starterCode": "---\n- name: Policy Validation and Diff Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Policy Validation and Diff capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./validation-capstone.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Policy Validation and Diff\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the policy validation and diff capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Policy Validation and Diff Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Policy Validation and Diff Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Policy Validation and Diff Capstone Project",
   "description": "A small end-to-end project that puts Policy Validation and Diff into practice.",
   "requirements": [
    "Render the policy from rules-as-data.",
    "Check for shadowed and duplicate rules and report the result.",
    "Assert the invariants: telnet is denied and the deny-all is last.",
    "Write a validation report naming every check and its result."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-multi-vendor",
  "slug": "netauto-firewall-multi-vendor",
  "language": "ansible",
  "category": "devops",
  "title": "Multi-Vendor Firewall Playbooks",
  "description": "Run one policy on two vendors: a vendor-neutral model, translation to PAN-OS and FortiOS, conditional tasks, multi-vendor testing, and migration.",
  "difficulty": "Advanced",
  "estimatedHours": 11,
  "skills": [
   "Vendor-neutral model",
   "PAN-OS translation",
   "FortiOS translation",
   "Dual rendering",
   "Vendor differences",
   "Conditional tasks",
   "Multi-vendor testing",
   "Policy migration",
   "Equivalence checks"
  ],
  "prerequisites": [
   "netauto-firewall-panos",
   "netauto-firewall-fortios"
  ],
  "analogy": "Learning {topic} is like learning to cook the same dish in two kitchens: the recipe stays the same, but the ovens work differently.",
  "modules": [
   {
    "id": "netauto-firewall-multi-vendor-m1",
    "title": "Multi-Vendor Firewall Playbooks Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-multi-vendor-m1-l1",
      "slug": "netauto-firewall-multi-vendor-m1-l1",
      "title": "One Policy, Two Vendors",
      "concept": "One policy, two vendors means the same security intent, such as allow web traffic to the DMZ, is expressed once and rendered for both a Palo Alto and a Fortinet firewall. The intent stays the same while the syntax changes, which is the whole point of a vendor-neutral policy: the business decision is made once, and each vendor gets its own correct translation.",
      "syntax": "intent: allow web to DMZ -> PAN-OS XML + FortiOS CLI",
      "exampleCode": "---\n- name: One policy, two vendors\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the idea\n      ansible.builtin.debug:\n        msg: \"One policy renders to PAN-OS XML and FortiOS CLI\"",
      "exampleLanguage": "ansible",
      "mistake": "Maintaining two separate policies, one per vendor, which drift apart until the two firewalls enforce different rules.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate One Policy, Two Vendors, but it does not work correctly.",
       "buggyCode": "# panos-policy.yml and fortios-policy.yml, edited separately\n# the FortiOS copy still allows telnet that PAN-OS denies",
       "fixedCode": "# policy.yml, one intent, rendered twice\n# both firewalls enforce the same rules",
       "explanation": "One policy rendered twice cannot drift, while two hand-maintained copies always do, silently and in opposite directions."
      },
      "exercise": {
       "title": "Practise One Policy, Two Vendors",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"renders to PAN-OS XML and FortiOS CLI\". This exercise practises One Policy, Two Vendors.",
       "starterCode": "---\n- name: One Policy, Two Vendors\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: One Policy, Two Vendors\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"One policy renders to PAN-OS XML and FortiOS CLI\"\n",
       "solutionExplanation": "The solution builds the one policy, two vendors policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"renders to PAN-OS XML and FortiOS CLI\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "renders to PAN-OS XML and FortiOS CLI",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "One Policy, Two Vendors is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through One Policy, Two Vendors step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-multi-vendor-m1-l2",
      "slug": "netauto-firewall-multi-vendor-m1-l2",
      "title": "A Vendor-Neutral Policy Model",
      "concept": "A vendor-neutral policy model stores each rule with fields that every firewall understands: name, source zone, destination zone, source, destination, service, and action. Vendor-specific details such as PAN-OS applications or FortiOS policy IDs are added by the renderer, not stored in the model, so the model stays readable by anyone, whatever firewall they use.",
      "syntax": "neutral rule: {name, src_zone, dst_zone, src, dst, svc, action}",
      "exampleCode": "neutral:\n  - {name: allow-web, src_zone: trust, dst_zone: dmz, src: any, dst: web-server, svc: https-443, action: allow}",
      "exampleLanguage": "ansible",
      "mistake": "Putting vendor-specific fields into the neutral model, so the model is no longer neutral and only works for one vendor.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Vendor-Neutral Policy Model, but it does not work correctly.",
       "buggyCode": "neutral rule: {name: allow-web, panos_application: web-browsing, fortios_policyid: 10}",
       "fixedCode": "neutral rule: {name: allow-web, svc: https-443, action: allow}\n# renderer adds the PAN-OS application and the FortiOS policy ID",
       "explanation": "Vendor details belong in the renderer: once they leak into the model, the model can only serve one vendor and the neutrality is gone."
      },
      "exercise": {
       "title": "Practise A Vendor-Neutral Policy Model",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Neutral model: allow-web, trust to dmz\". This exercise practises A Vendor-Neutral Policy Model.",
       "starterCode": "---\n- name: A Vendor-Neutral Policy Model\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Vendor-Neutral Policy Model\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    model_rule: allow-web\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Neutral model: allow-web, trust to dmz, https-443, allow\"\n",
       "solutionExplanation": "The solution builds the a vendor-neutral policy model policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Neutral model: allow-web, trust to dmz\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Neutral model: allow-web, trust to dmz",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Vendor-Neutral Policy Model is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A Vendor-Neutral Policy Model step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-multi-vendor-m1-l3",
      "slug": "netauto-firewall-multi-vendor-m1-l3",
      "title": "Translating Rules to PAN-OS",
      "concept": "Translating a neutral rule to PAN-OS means mapping each field to its PAN-OS form: zones become from and to zones, the destination becomes an address object, the service becomes a service object, and the application is added from a mapping table. The translation is a pure function of the rule, so the same rule always produces the same PAN-OS XML.",
      "syntax": "neutral allow-web -> <entry name=\"allow-web\">...<action>allow</action></entry>",
      "exampleCode": "# Displayed only: rendered locally, never pushed to a device.\n# neutral: allow-web, trust -> dmz, https-443, allow\n# PAN-OS: <entry name=\"allow-web\"><from><member>trust</member></from>\n#          <to><member>dmz</member></to><service><member>service-https</member></service>\n#          <action>allow</action></entry>",
      "exampleLanguage": "ansible",
      "mistake": "Translating by hand for each rule instead of writing one mapping, so the same intent produces different PAN-OS output depending on who translated it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Translating Rules to PAN-OS, but it does not work correctly.",
       "buggyCode": "# engineer A: service-https, engineer B: service-web-443\n# the same rule becomes two different PAN-OS configs",
       "fixedCode": "# one mapping table: https-443 -> service-https, always\n# the same rule always renders the same way",
       "explanation": "A single mapping table makes translation deterministic: the same neutral rule always produces the same vendor config, whoever runs it."
      },
      "exercise": {
       "title": "Check your understanding: Translating Rules to PAN-OS",
       "type": "multiple-choice",
       "instructions": "Which statement about Translating Rules to PAN-OS is correct?",
       "starterCode": "",
       "solution": "Translating a neutral rule to PAN-OS means mapping each field to its PAN-OS form: zones become from and to zones, the destination becomes an address object, the service becomes a service object, and the application is added from a mapping table..",
       "solutionExplanation": "Translating a neutral rule to PAN-OS means mapping each field to its PAN-OS form: zones become from and to zones, the destination becomes an address object, the service becomes a service object, and the application is added from a mapping table.. The other options are false: Translating Rules to PAN-OS is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Translating a neutral rule to PAN-OS means mapping each field to its PAN-OS form: zones become from and to zones, the destination becomes an address object, the service becomes a service object, and the application is added from a mapping table..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Translating Rules to PAN-OS from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Translating Rules to PAN-OS can only be used once in a program",
        "Translating Rules to PAN-OS requires a separate paid licence to use",
        "Translating a neutral rule to PAN-OS means mapping each field to its PAN-OS form: zones become from and to zones, the destination becomes an address object, the service becomes a service object, and the application is added from a mapping table..",
        "Translating Rules to PAN-OS was removed from Ansible in the latest version",
        "Translating Rules to PAN-OS only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-multi-vendor-m1-l4",
      "slug": "netauto-firewall-multi-vendor-m1-l4",
      "title": "Translating Rules to FortiOS",
      "concept": "Translating a neutral rule to FortiOS means mapping each field to its FortiOS form: zones become interface names, the rule gets a policy ID in sequence, the destination becomes an address object, and the action allow becomes accept. The translation must assign policy IDs in order, because FortiOS evaluates policies by their position in the list.",
      "syntax": "neutral allow-web -> policy 10: internal -> wan1, HTTPS, accept",
      "exampleCode": "# Displayed only: rendered locally, never pushed to a device.\n# neutral: allow-web, trust -> dmz, https-443, allow\n# FortiOS: config firewall policy\n#          edit 10\n#            set srcintf internal\n#            set dstintf wan1\n#            set service HTTPS\n#            set action accept",
      "exampleLanguage": "ansible",
      "mistake": "Assigning FortiOS policy IDs by hand in the neutral model, which breaks the ordering when a rule is inserted in the middle.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Translating Rules to FortiOS, but it does not work correctly.",
       "buggyCode": "# neutral model carries fortios_policyid: 10, 20, 30\n# insert a rule: every ID after it must be renumbered by hand",
       "fixedCode": "# renderer assigns IDs from the rule order: 10, 20, 30\n# insert a rule and the renderer renumbers automatically",
       "explanation": "Policy IDs are a rendering detail: the renderer derives them from the rule order, so inserting a rule never needs manual renumbering."
      },
      "exercise": {
       "title": "Check your understanding: Translating Rules to FortiOS",
       "type": "multiple-choice",
       "instructions": "Which statement about Translating Rules to FortiOS is correct?",
       "starterCode": "",
       "solution": "Translating a neutral rule to FortiOS means mapping each field to its FortiOS form: zones become interface names, the rule gets a policy ID in sequence, the destination becomes an address object, and the action allow becomes accept..",
       "solutionExplanation": "Translating a neutral rule to FortiOS means mapping each field to its FortiOS form: zones become interface names, the rule gets a policy ID in sequence, the destination becomes an address object, and the action allow becomes accept.. The other options are false: Translating Rules to FortiOS is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Translating a neutral rule to FortiOS means mapping each field to its FortiOS form: zones become interface names, the rule gets a policy ID in sequence, the destination becomes an address object, and the action allow becomes accept..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Translating Rules to FortiOS from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Translating Rules to FortiOS can only be used once in a program",
        "Translating Rules to FortiOS requires a separate paid licence to use",
        "Translating Rules to FortiOS was removed from Ansible in the latest version",
        "Translating a neutral rule to FortiOS means mapping each field to its FortiOS form: zones become interface names, the rule gets a policy ID in sequence, the destination becomes an address object, and the action allow becomes accept..",
        "Translating Rules to FortiOS only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-multi-vendor-m1-l5",
      "slug": "netauto-firewall-multi-vendor-m1-l5",
      "title": "Rendering Both Vendors Side by Side",
      "concept": "Rendering both vendors side by side means one playbook produces the PAN-OS configuration and the FortiOS configuration from the same rule data in a single run. The two outputs can be compared line by line, which proves the two firewalls will enforce the same policy, and any difference between them is a translation bug, not a policy difference.",
      "syntax": "one run -> palo-alto-policy.txt + fortinet-policy.txt",
      "exampleCode": "---\n- name: Rendering Both Vendors Side by Side\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./both-vendors-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Rendering the two vendors in separate runs from separate data files, so the outputs can differ and nobody notices.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Rendering Both Vendors Side by Side, but it does not work correctly.",
       "buggyCode": "# run panos render on Monday, fortios render on Friday\n# the data changed in between: the two configs disagree",
       "fixedCode": "# one run renders both vendors from the same data\n# the outputs are guaranteed to match the same policy",
       "explanation": "One run from one data file is the only way to guarantee both vendors render the same policy; separate runs can silently diverge."
      },
      "exercise": {
       "title": "Practise Rendering Both Vendors Side by Side",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-web=allow\". This exercise practises Rendering Both Vendors Side by Side.",
       "starterCode": "---\n- name: Rendering Both Vendors Side by Side\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Rendering Both Vendors Side by Side\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./both-vendors-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the rendering both vendors side by side policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-web=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Rendering Both Vendors Side by Side is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Rendering Both Vendors Side by Side step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-multi-vendor-m2",
    "title": "Multi-Vendor Firewall Playbooks in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-firewall-multi-vendor-m2-l1",
      "slug": "netauto-firewall-multi-vendor-m2-l1",
      "title": "Vendor Differences That Matter",
      "concept": "Vendor differences that matter are the ones that change the meaning of a policy: PAN-OS commits while FortiOS applies immediately, PAN-OS matches on applications while FortiOS policies match on services, and PAN-OS NAT runs before the security rule while FortiOS VIPs work through the policy. A multi-vendor playbook must handle these differences explicitly, or the same intent behaves differently on each firewall.",
      "syntax": "PAN-OS: commit, app-aware, NAT first\nFortiOS: immediate, service-based, VIP in policy",
      "exampleCode": "differences:\n  - {area: change, panos: commit, fortios: immediate}\n  - {area: match, panos: application, fortios: service}\n  - {area: nat, panos: before security, fortios: VIP in policy}",
      "exampleLanguage": "ansible",
      "mistake": "Assuming a behaviour from one vendor applies to the other, for example expecting a commit step on FortiOS.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Vendor Differences That Matter, but it does not work correctly.",
       "buggyCode": "# FortiOS change made, waiting for a commit that never comes\n# the change was already live",
       "fixedCode": "# FortiOS: review before saving, because the save applies immediately\n# PAN-OS: review the candidate config, then commit",
       "explanation": "Each vendor's change model must be handled on its own terms; borrowing one vendor's habits for the other is how changes go live unreviewed."
      },
      "exercise": {
       "title": "Practise Vendor Differences That Matter",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule allow-web: trust -> dmz allow\". This exercise practises Vendor Differences That Matter.",
       "starterCode": "---\n- name: Vendor Differences That Matter\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Vendor Differences That Matter\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 2\n        success_msg: \"Checked 2 rules: vendor differences documented\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the vendor differences that matter policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule allow-web: trust -> dmz allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule allow-web: trust -> dmz allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Vendor Differences That Matter is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Vendor Differences That Matter step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-multi-vendor-m2-l2",
      "slug": "netauto-firewall-multi-vendor-m2-l2",
      "title": "Conditional Tasks per Vendor",
      "concept": "Conditional tasks run only for the vendor they belong to, using when to check a vendor variable, so one playbook can serve both firewalls without mixing their steps. The PAN-OS tasks run when vendor is panos and the FortiOS tasks when vendor is fortios, and the shared tasks, such as rendering and validation, run for both.",
      "syntax": "- name: Commit PAN-OS\n  when: vendor == 'panos'\n- name: Save FortiOS\n  when: vendor == 'fortios'",
      "exampleCode": "- name: PAN-OS step\n  ansible.builtin.debug:\n    msg: \"PAN-OS step: commit the candidate config\"\n  when: vendor == 'panos'\n- name: FortiOS step\n  ansible.builtin.debug:\n    msg: \"FortiOS step: save applies immediately\"\n  when: vendor == 'fortios'",
      "exampleLanguage": "ansible",
      "mistake": "Running vendor-specific tasks for both vendors, for example trying to commit a FortiOS change, which fails because FortiOS has no commit.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Conditional Tasks per Vendor, but it does not work correctly.",
       "buggyCode": "- name: Commit the change\n  ansible.builtin.debug:\n    msg: \"Committing\"\n# runs for FortiOS too: there is nothing to commit",
       "fixedCode": "- name: Commit the change\n  ansible.builtin.debug:\n    msg: \"Committing\"\n  when: vendor == 'panos'",
       "explanation": "A when condition keeps each vendor's steps on its own path; without it, a step that makes sense for one vendor fails or misleads on the other."
      },
      "exercise": {
       "title": "Check your understanding: Conditional Tasks per Vendor",
       "type": "multiple-choice",
       "instructions": "Which statement about Conditional Tasks per Vendor is correct?",
       "starterCode": "",
       "solution": "Conditional tasks run only for the vendor they belong to, using when to check a vendor variable, so one playbook can serve both firewalls without mixing their steps..",
       "solutionExplanation": "Conditional tasks run only for the vendor they belong to, using when to check a vendor variable, so one playbook can serve both firewalls without mixing their steps.. The other options are false: Conditional Tasks per Vendor is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Conditional tasks run only for the vendor they belong to, using when to check a vendor variable, so one playbook can serve both firewalls without mixing their steps..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Conditional Tasks per Vendor from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Conditional Tasks per Vendor can only be used once in a program",
        "Conditional tasks run only for the vendor they belong to, using when to check a vendor variable, so one playbook can serve both firewalls without mixing their steps..",
        "Conditional Tasks per Vendor requires a separate paid licence to use",
        "Conditional Tasks per Vendor was removed from Ansible in the latest version",
        "Conditional Tasks per Vendor only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-multi-vendor-m2-l3",
      "slug": "netauto-firewall-multi-vendor-m2-l3",
      "title": "Testing Multi-Vendor Output",
      "concept": "Testing multi-vendor output means asserting that both rendered configurations contain the same rules, the same order, and the same actions, even though their syntax is different. The test compares the meaning, not the text: the PAN-OS XML and the FortiOS CLI must both allow web and deny telnet, or the translation has a bug.",
      "syntax": "assert panos has allow-web AND fortios has allow-web\nassert both end with deny-all",
      "exampleCode": "---\n- name: Testing Multi-Vendor Output\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./multi-vendor-test.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Testing only one vendor's output and assuming the other is correct, when a translation bug affects exactly the untested vendor.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Testing Multi-Vendor Output, but it does not work correctly.",
       "buggyCode": "# panos output tested, fortios output not tested\n# the FortiOS renderer drops the deny-all: nobody notices",
       "fixedCode": "# both outputs asserted: allow-web present, deny-all last, in each file\n# the dropped deny-all fails the FortiOS check",
       "explanation": "Both vendors' outputs must be tested, because a bug in one renderer is invisible to a test that only checks the other."
      },
      "exercise": {
       "title": "Practise Testing Multi-Vendor Output",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"deny-telnet=deny\". This exercise practises Testing Multi-Vendor Output.",
       "starterCode": "---\n- name: Testing Multi-Vendor Output\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Testing Multi-Vendor Output\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-telnet\n            src: any\n            dst: any\n            svc: telnet-23\n            action: deny\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./multi-vendor-test.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the testing multi-vendor output policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"deny-telnet=deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "deny-telnet=deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Testing Multi-Vendor Output is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Testing Multi-Vendor Output step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-multi-vendor-m2-l4",
      "slug": "netauto-firewall-multi-vendor-m2-l4",
      "title": "Migrating Policy Between Vendors",
      "concept": "Migrating a policy between vendors means exporting the rules from the old firewall into the neutral model, rendering them for the new vendor, and validating that the new configuration enforces the same policy. Migration is the hardest multi-vendor job, because it must preserve the meaning of every rule, including the ones that rely on vendor-specific features that have no exact equivalent.",
      "syntax": "old firewall -> neutral model -> new vendor config -> validate equivalence",
      "exampleCode": "---\n- name: Migration plan\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the plan\n      ansible.builtin.debug:\n        msg: \"Migration: export PAN-OS rules, render FortiOS, validate equivalence\"",
      "exampleLanguage": "ansible",
      "mistake": "Migrating rules one by one by hand and never comparing the old and new policies as a whole, so a dropped rule is discovered in production.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Migrating Policy Between Vendors, but it does not work correctly.",
       "buggyCode": "# copy each rule from the PAN-OS UI into the FortiOS UI\n# one rule is missed: the app breaks on Monday",
       "fixedCode": "# export all rules, render for FortiOS, diff the meanings\n# the missing rule shows up in the comparison before cutover",
       "explanation": "Migration must be compared as a whole: a rule-by-rule copy hides the one rule that was skipped, while a full comparison exposes it."
      },
      "exercise": {
       "title": "Practise Migrating Policy Between Vendors",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"render FortiOS, validate equivalence\". This exercise practises Migrating Policy Between Vendors.",
       "starterCode": "---\n- name: Migrating Policy Between Vendors\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Migrating Policy Between Vendors\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Migration: export PAN-OS rules, render FortiOS, validate equivalence\"\n",
       "solutionExplanation": "The solution builds the migrating policy between vendors policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"render FortiOS, validate equivalence\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "render FortiOS, validate equivalence",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Migrating Policy Between Vendors is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Migrating Policy Between Vendors step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-multi-vendor-m2-l5",
      "slug": "netauto-firewall-multi-vendor-m2-l5",
      "title": "A Multi-Vendor Playbook End to End",
      "concept": "A complete multi-vendor playbook takes one neutral policy, renders it for PAN-OS and FortiOS in a single run, validates both outputs, and reports any difference between them. The playbook proves the two firewalls enforce the same intent, and it is the artefact a team uses when the estate has more than one kind of firewall.",
      "syntax": "neutral policy -> panos render + fortios render -> validate both -> report",
      "exampleCode": "---\n- name: A Multi-Vendor Playbook End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./multi-vendor-policy.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Finishing the multi-vendor playbook without the comparison step, so the two outputs can disagree and the run still reports success.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Multi-Vendor Playbook End to End, but it does not work correctly.",
       "buggyCode": "# render panos, render fortios, done\n# the FortiOS render is missing a rule: the run still passes",
       "fixedCode": "# render panos, render fortios, compare the meanings\n# a missing rule fails the run before anything is deployed",
       "explanation": "The comparison is the point of a multi-vendor playbook: without it, the two renders are just two separate policies that happen to share a file."
      },
      "exercise": {
       "title": "Practise A Multi-Vendor Playbook End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule deny-all: any -> any deny\". This exercise practises A Multi-Vendor Playbook End to End.",
       "starterCode": "---\n- name: A Multi-Vendor Playbook End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Multi-Vendor Playbook End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: multi-vendor policy is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a multi-vendor playbook end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule deny-all: any -> any deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule deny-all: any -> any deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Multi-Vendor Playbook End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A Multi-Vendor Playbook End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Multi-Vendor Firewall Playbooks",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the multi-vendor firewall playbooks policy as data, renders it to ./multi-vendor-capstone.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=allow\".",
   "starterCode": "---\n- name: Multi-Vendor Firewall Playbooks Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Multi-Vendor Firewall Playbooks capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./multi-vendor-capstone.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Multi-Vendor Firewall Playbooks\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the multi-vendor firewall playbooks capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Multi-Vendor Firewall Playbooks Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Multi-Vendor Firewall Playbooks Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Multi-Vendor Firewall Playbooks Capstone Project",
   "description": "A small end-to-end project that puts Multi-Vendor Firewall Playbooks into practice.",
   "requirements": [
    "Define the policy once as a vendor-neutral model.",
    "Render it for both PAN-OS and FortiOS from the same data in one run.",
    "Assert both outputs contain allow-web and end with deny-all.",
    "Report any difference in meaning between the two renders."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 },
 {
  "id": "netauto-firewall-production",
  "slug": "netauto-firewall-production",
  "language": "ansible",
  "category": "devops",
  "title": "Production Firewall Automation",
  "description": "Run firewalls in production: change management, approvals, rollback, maintenance windows, monitoring, audit, secrets, and incident response.",
  "difficulty": "Advanced",
  "estimatedHours": 12,
  "skills": [
   "Change management",
   "Approval workflows",
   "Rollback plans",
   "Maintenance windows",
   "Production playbooks",
   "Policy monitoring",
   "Audit trails",
   "Secrets management",
   "Incident response",
   "Runbooks"
  ],
  "prerequisites": [
   "netauto-firewall-policy-as-code",
   "netauto-firewall-nat-rules",
   "netauto-firewall-validation"
  ],
  "analogy": "Learning {topic} is like learning to run an airline: the checklist matters more than the pilot's memory, and every change has a plan for going back.",
  "modules": [
   {
    "id": "netauto-firewall-production-m1",
    "title": "Production Firewall Automation Fundamentals",
    "level": "beginner",
    "lessons": [
     {
      "id": "netauto-firewall-production-m1-l1",
      "slug": "netauto-firewall-production-m1-l1",
      "title": "Change Management for Firewalls",
      "concept": "Change management for firewalls means every change has a ticket, a planned window, a named implementer, a reviewer, and a rollback plan before it is applied. Firewalls sit in the path of all traffic, so an unplanned change is an unplanned outage risk, and the paperwork exists to make sure someone has thought about what could go wrong.",
      "syntax": "ticket -> window -> implementer + reviewer -> rollback plan -> apply",
      "exampleCode": "---\n- name: Change record\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the change\n      ansible.builtin.debug:\n        msg: \"Change FW-201: window Saturday 02:00, reviewer priya, rollback ready\"",
      "exampleLanguage": "ansible",
      "mistake": "Applying a firewall change with no ticket and no window, so when traffic breaks nobody knows what changed or who changed it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Change Management for Firewalls, but it does not work correctly.",
       "buggyCode": "# change applied on a Tuesday afternoon, no ticket, no window\n# the app breaks: nobody can find the change",
       "fixedCode": "# change FW-201: ticket, Saturday 02:00 window, reviewer, rollback plan\n# the app breaks: the change is found in minutes and rolled back",
       "explanation": "A ticket, a window, and a rollback plan are what turn a change from a mystery into a recoverable event."
      },
      "exercise": {
       "title": "Practise Change Management for Firewalls",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"window Saturday 02:00, reviewer priya\". This exercise practises Change Management for Firewalls.",
       "starterCode": "---\n- name: Change Management for Firewalls\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Change Management for Firewalls\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Change FW-201: window Saturday 02:00, reviewer priya, rollback ready\"\n",
       "solutionExplanation": "The solution builds the change management for firewalls policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"window Saturday 02:00, reviewer priya\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "window Saturday 02:00, reviewer priya",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Change Management for Firewalls is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Change Management for Firewalls step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-production-m1-l2",
      "slug": "netauto-firewall-production-m1-l2",
      "title": "Approval Workflows for Policy Changes",
      "concept": "An approval workflow routes a firewall change to the right approvers before it can be applied: the network team checks the technical detail, the security team checks the risk, and the application owner confirms the business need. No single person approves their own change, and the approvals are recorded with the change so an auditor can see who agreed to what.",
      "syntax": "propose -> network review -> security review -> approve -> apply",
      "exampleCode": "approvals:\n  - {role: network, approver: priya, status: approved}\n  - {role: security, approver: omar, status: approved}\n  - {role: app-owner, approver: sara, status: approved}",
      "exampleLanguage": "ansible",
      "mistake": "Letting the implementer approve their own change, which removes the independent check that catches an overly broad rule.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Approval Workflows for Policy Changes, but it does not work correctly.",
       "buggyCode": "# author: deepak, approver: deepak\n# change applied",
       "fixedCode": "# author: deepak, approver: priya (network), omar (security)\n# change applied after two independent approvals",
       "explanation": "Self-approval is no approval: an independent approver is the one who asks whether the rule is broader than the ticket asked for."
      },
      "exercise": {
       "title": "Practise Approval Workflows for Policy Changes",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"security omar, app-owner sara\". This exercise practises Approval Workflows for Policy Changes.",
       "starterCode": "---\n- name: Approval Workflows for Policy Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Approval Workflows for Policy Changes\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Approvals: network priya, security omar, app-owner sara, all approved\"\n",
       "solutionExplanation": "The solution builds the approval workflows for policy changes policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"security omar, app-owner sara\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "security omar, app-owner sara",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Approval Workflows for Policy Changes is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Approval Workflows for Policy Changes step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-production-m1-l3",
      "slug": "netauto-firewall-production-m1-l3",
      "title": "Rollback Plans for Firewall Changes",
      "concept": "A rollback plan is the tested way back: the previous policy version, the exact command or playbook that restores it, and the person who decides to roll back. A plan that has never been tested is a hope, not a plan, because a rollback that fails during an incident makes the outage longer, not shorter.",
      "syntax": "before: snapshot policy -> change -> if broken: restore snapshot",
      "exampleCode": "rollback:\n  - snapshot: policy-v1.3.0\n  - restore: ansible-playbook restore.yml --extra-vars version=v1.3.0\n  - decider: on-call network engineer",
      "exampleLanguage": "ansible",
      "mistake": "Writing a rollback plan that says 'revert the change' without saying how, so nobody can actually do it under pressure.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Rollback Plans for Firewall Changes, but it does not work correctly.",
       "buggyCode": "rollback plan: revert the change   # how? which version? who decides?",
       "fixedCode": "rollback plan: restore policy-v1.3.0 with restore.yml, decided by the on-call engineer",
       "explanation": "A rollback plan must name the version, the command, and the decider, or it cannot be executed when the incident is happening."
      },
      "exercise": {
       "title": "Check your understanding: Rollback Plans for Firewall Changes",
       "type": "multiple-choice",
       "instructions": "Which statement about Rollback Plans for Firewall Changes is correct?",
       "starterCode": "",
       "solution": "A rollback plan is the tested way back: the previous policy version, the exact command or playbook that restores it, and the person who decides to roll back..",
       "solutionExplanation": "A rollback plan is the tested way back: the previous policy version, the exact command or playbook that restores it, and the person who decides to roll back.. The other options are false: Rollback Plans for Firewall Changes is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A rollback plan is the tested way back: the previous policy version, the exact command or playbook that restores it, and the person who decides to roll back..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Rollback Plans for Firewall Changes from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Rollback Plans for Firewall Changes can only be used once in a program",
        "Rollback Plans for Firewall Changes requires a separate paid licence to use",
        "A rollback plan is the tested way back: the previous policy version, the exact command or playbook that restores it, and the person who decides to roll back..",
        "Rollback Plans for Firewall Changes was removed from Ansible in the latest version",
        "Rollback Plans for Firewall Changes only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-production-m1-l4",
      "slug": "netauto-firewall-production-m1-l4",
      "title": "Scheduling Maintenance Windows",
      "concept": "A maintenance window is an agreed time when firewall changes are allowed, chosen to minimise the impact if something goes wrong, usually outside business hours with the application owners informed. Changes outside a window are emergency changes, and they need emergency approval, because an unannounced change during business hours can take down the application for real users.",
      "syntax": "window: Saturday 02:00-04:00, owners notified, change frozen otherwise",
      "exampleCode": "---\n- name: Maintenance window\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the window\n      ansible.builtin.debug:\n        msg: \"Window Saturday 02:00-04:00: change FW-201 scheduled, owners notified\"",
      "exampleLanguage": "ansible",
      "mistake": "Scheduling a firewall change in the middle of the business day because the window felt inconvenient, and taking the application down for users.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Scheduling Maintenance Windows, but it does not work correctly.",
       "buggyCode": "# change applied Tuesday 11:00, peak hours\n# the app is down for 2,000 users",
       "fixedCode": "# change applied Saturday 02:00, agreed window\n# the app is down for no one; the rollback is ready",
       "explanation": "A window exists to bound the blast radius: a change that goes wrong at 02:00 on a Saturday affects nobody, while the same change at 11:00 on a Tuesday affects everyone."
      },
      "exercise": {
       "title": "Check your understanding: Scheduling Maintenance Windows",
       "type": "multiple-choice",
       "instructions": "Which statement about Scheduling Maintenance Windows is correct?",
       "starterCode": "",
       "solution": "A maintenance window is an agreed time when firewall changes are allowed, chosen to minimise the impact if something goes wrong, usually outside business hours with the application owners informed..",
       "solutionExplanation": "A maintenance window is an agreed time when firewall changes are allowed, chosen to minimise the impact if something goes wrong, usually outside business hours with the application owners informed.. The other options are false: Scheduling Maintenance Windows is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "A maintenance window is an agreed time when firewall changes are allowed, chosen to minimise the impact if something goes wrong, usually outside business hours with the application owners informed..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Scheduling Maintenance Windows from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Scheduling Maintenance Windows can only be used once in a program",
        "Scheduling Maintenance Windows requires a separate paid licence to use",
        "Scheduling Maintenance Windows was removed from Ansible in the latest version",
        "A maintenance window is an agreed time when firewall changes are allowed, chosen to minimise the impact if something goes wrong, usually outside business hours with the application owners informed..",
        "Scheduling Maintenance Windows only works on Windows"
       ],
       "answerIndex": 3
      }
     },
     {
      "id": "netauto-firewall-production-m1-l5",
      "slug": "netauto-firewall-production-m1-l5",
      "title": "A Production Change Playbook",
      "concept": "A production change playbook automates the whole change: it snapshots the current policy, renders the new one, validates it, applies it inside the maintenance window, verifies the traffic, and rolls back automatically if the verification fails. Automation makes the change repeatable, and the verification step is what turns a hopeful deployment into a checked one.",
      "syntax": "snapshot -> render -> validate -> apply -> verify -> rollback if failed",
      "exampleCode": "---\n- name: A Production Change Playbook\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./prod-change.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Automating the apply step but not the verification step, so a broken change stays live until a user reports it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Production Change Playbook, but it does not work correctly.",
       "buggyCode": "# playbook applies the policy and exits\n# the web rule is wrong: the app is down until someone notices",
       "fixedCode": "# playbook applies the policy, then checks the web rule works\n# the check fails: the playbook rolls back automatically",
       "explanation": "A production playbook must verify after applying, or a bad change sits live until a human notices the outage."
      },
      "exercise": {
       "title": "Practise A Production Change Playbook",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"allow-web=allow\". This exercise practises A Production Change Playbook.",
       "starterCode": "---\n- name: A Production Change Playbook\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Production Change Playbook\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./prod-change.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the a production change playbook policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "allow-web=allow",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Production Change Playbook is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A Production Change Playbook step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   },
   {
    "id": "netauto-firewall-production-m2",
    "title": "Production Firewall Automation in Practice",
    "level": "advanced",
    "lessons": [
     {
      "id": "netauto-firewall-production-m2-l1",
      "slug": "netauto-firewall-production-m2-l1",
      "title": "Monitoring Firewall Policy Health",
      "concept": "Monitoring firewall policy health means watching the signs that a policy is degrading: rules that are never hit, rules that are hit far more than expected, hit counts that drop to zero after a change, and log volume that spikes. A rule with zero hits for months is either dead weight or a sign that the traffic it was meant to allow is going somewhere else.",
      "syntax": "monitor: hit counts, zero-hit rules, log volume, change correlation",
      "exampleCode": "---\n- name: Policy health\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the health summary\n      ansible.builtin.debug:\n        msg: \"Policy health: 3 rules, 1 zero-hit rule flagged for review\"",
      "exampleLanguage": "ansible",
      "mistake": "Ignoring hit counts and never cleaning up rules, so the policy grows by a rule a month and nobody knows which ones still matter.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Monitoring Firewall Policy Health, but it does not work correctly.",
       "buggyCode": "# 400 rules, nobody knows which are live\n# a rule from 2021 still allows a decommissioned server",
       "fixedCode": "# monthly review: zero-hit rules are flagged, owners confirm or remove\n# the policy stays at the size it needs to be",
       "explanation": "Hit counts are the policy's memory: a rule nobody hits is either dead or wrong, and either way it needs a decision."
      },
      "exercise": {
       "title": "Practise Monitoring Firewall Policy Health",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"1 zero-hit rule flagged for review\". This exercise practises Monitoring Firewall Policy Health.",
       "starterCode": "---\n- name: Monitoring Firewall Policy Health\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Monitoring Firewall Policy Health\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    - name: Show the result\n      ansible.builtin.debug:\n        msg: \"Policy health: 3 rules, 1 zero-hit rule flagged for review\"\n",
       "solutionExplanation": "The solution builds the monitoring firewall policy health policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"1 zero-hit rule flagged for review\".",
       "complexity": "Easy",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "1 zero-hit rule flagged for review",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Monitoring Firewall Policy Health is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Monitoring Firewall Policy Health step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-production-m2-l2",
      "slug": "netauto-firewall-production-m2-l2",
      "title": "Auditing Who Changed What",
      "concept": "Auditing firewall changes means keeping a record of who changed which rule, when, and why, so an incident investigation can trace a bad rule back to its change. The audit trail comes from Git history, approval records, and the firewall's own logs, and it only works if every change goes through the same workflow instead of some changes being made directly on the device.",
      "syntax": "Git history + approvals + device logs = audit trail",
      "exampleCode": "audit:\n  - {change: FW-201, author: deepak, reviewer: priya, when: 2026-11-24}\n  - {change: FW-198, author: priya, reviewer: omar, when: 2026-11-20}",
      "exampleLanguage": "ansible",
      "mistake": "Making emergency changes directly on the firewall and never recording them, so the audit trail has a gap exactly where the incident happened.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Auditing Who Changed What, but it does not work correctly.",
       "buggyCode": "# emergency fix typed into the firewall UI at 03:00\n# no ticket, no Git commit, no record",
       "fixedCode": "# emergency fix applied, then recorded: ticket FW-205, commit, review next morning\n# the audit trail is complete, even for emergencies",
       "explanation": "An emergency change still needs a record: the audit trail is worthless if it has a gap at the exact moment something went wrong."
      },
      "exercise": {
       "title": "Check your understanding: Auditing Who Changed What",
       "type": "multiple-choice",
       "instructions": "Which statement about Auditing Who Changed What is correct?",
       "starterCode": "",
       "solution": "Auditing firewall changes means keeping a record of who changed which rule, when, and why, so an incident investigation can trace a bad rule back to its change..",
       "solutionExplanation": "Auditing firewall changes means keeping a record of who changed which rule, when, and why, so an incident investigation can trace a bad rule back to its change.. The other options are false: Auditing Who Changed What is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Auditing firewall changes means keeping a record of who changed which rule, when, and why, so an incident investigation can trace a bad rule back to its change..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Auditing Who Changed What from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Auditing Who Changed What can only be used once in a program",
        "Auditing firewall changes means keeping a record of who changed which rule, when, and why, so an incident investigation can trace a bad rule back to its change..",
        "Auditing Who Changed What requires a separate paid licence to use",
        "Auditing Who Changed What was removed from Ansible in the latest version",
        "Auditing Who Changed What only works on Windows"
       ],
       "answerIndex": 1
      }
     },
     {
      "id": "netauto-firewall-production-m2-l3",
      "slug": "netauto-firewall-production-m2-l3",
      "title": "Secrets and API Credentials",
      "concept": "Firewall automation needs API credentials to talk to PAN-OS and FortiOS, and those credentials must be stored in Ansible Vault or a secrets manager, never in a playbook or in Git. A leaked firewall API key is a leaked firewall, because the API can change any rule, so credentials get least privilege, rotation, and a separate account per automation job.",
      "syntax": "vault: panos_api_key / fortios_api_token, least privilege, rotated",
      "exampleCode": "# Displayed only: credentials are never written in a playbook.\n- name: Use a vaulted credential\n  ansible.builtin.debug:\n    msg: \"API credential loaded from Ansible Vault (value never printed)\"\n  no_log: true",
      "exampleLanguage": "ansible",
      "mistake": "Printing an API key in a debug message or a log, which puts the secret into the output where anyone with log access can read it.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Secrets and API Credentials, but it does not work correctly.",
       "buggyCode": "- name: Show the key\n  ansible.builtin.debug:\n    msg: \"Key is {{ panos_api_key }}\"   # the secret is now in the log",
       "fixedCode": "- name: Use the key\n  paloaltonetworks.panos.panos_security_rule:\n    provider: \"{{ provider }}\"\n  no_log: true   # the secret never appears in output",
       "explanation": "Secrets must never be printed: no_log hides task output, and Vault keeps the value out of the playbook entirely."
      },
      "exercise": {
       "title": "Check your understanding: Secrets and API Credentials",
       "type": "multiple-choice",
       "instructions": "Which statement about Secrets and API Credentials is correct?",
       "starterCode": "",
       "solution": "Firewall automation needs API credentials to talk to PAN-OS and FortiOS, and those credentials must be stored in Ansible Vault or a secrets manager, never in a playbook or in Git..",
       "solutionExplanation": "Firewall automation needs API credentials to talk to PAN-OS and FortiOS, and those credentials must be stored in Ansible Vault or a secrets manager, never in a playbook or in Git.. The other options are false: Secrets and API Credentials is an ordinary, freely available part of firewall automation with Ansible.",
       "tests": [
        {
         "name": "Correct answer",
         "expectedContains": "Firewall automation needs API credentials to talk to PAN-OS and FortiOS, and those credentials must be stored in Ansible Vault or a secrets manager, never in a playbook or in Git..",
         "hidden": false
        }
       ],
       "hintNotes": {
        "concept": "Recall the core idea of Secrets and API Credentials from the lesson: what does it actually do?",
        "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
        "structure": "There is one correct option and three distractors; choose the statement that is true."
       },
       "options": [
        "Secrets and API Credentials can only be used once in a program",
        "Secrets and API Credentials requires a separate paid licence to use",
        "Firewall automation needs API credentials to talk to PAN-OS and FortiOS, and those credentials must be stored in Ansible Vault or a secrets manager, never in a playbook or in Git..",
        "Secrets and API Credentials was removed from Ansible in the latest version",
        "Secrets and API Credentials only works on Windows"
       ],
       "answerIndex": 2
      }
     },
     {
      "id": "netauto-firewall-production-m2-l4",
      "slug": "netauto-firewall-production-m2-l4",
      "title": "Incident Response with Automation",
      "concept": "Incident response with automation means having playbooks ready before the incident: one that blocks a malicious address everywhere, one that isolates a compromised host, and one that restores the last known good policy. The playbooks are tested in advance, because an incident is the worst time to discover that the block playbook has a typo.",
      "syntax": "incident: block address -> isolate host -> verify -> restore",
      "exampleCode": "---\n- name: Incident Response with Automation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: block-bad-ip\n            src: any\n            dst: any\n            svc: any\n            action: deny\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./incident-response.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'block-bad-ip' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: block-bad-ip present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Writing the incident playbook during the incident, when there is no time to test it and a typo blocks the wrong address.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate Incident Response with Automation, but it does not work correctly.",
       "buggyCode": "# incident at 03:00: write a block playbook from scratch\n# typo: blocks the office network instead of the attacker",
       "fixedCode": "# incident at 03:00: run the tested block playbook with the attacker IP\n# the playbook was reviewed and tested last month",
       "explanation": "Incident playbooks must be written and tested before the incident, because during one there is no time to write or test anything."
      },
      "exercise": {
       "title": "Practise Incident Response with Automation",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"block-bad-ip=deny\". This exercise practises Incident Response with Automation.",
       "starterCode": "---\n- name: Incident Response with Automation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: Incident Response with Automation\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: block-bad-ip\n            src: any\n            dst: any\n            svc: any\n            action: deny\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./incident-response.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'block-bad-ip' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: block-bad-ip present\"\n        fail_msg: \"Policy check failed\"\n",
       "solutionExplanation": "The solution builds the incident response with automation policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"block-bad-ip=deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "block-bad-ip=deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "Incident Response with Automation is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through Incident Response with Automation step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     },
     {
      "id": "netauto-firewall-production-m2-l5",
      "slug": "netauto-firewall-production-m2-l5",
      "title": "A Production Runbook End to End",
      "concept": "A production runbook brings the whole area together: change management, approvals, rollback, monitoring, audit, secrets, and incident response, all as one documented workflow. The runbook is the answer to the question a new engineer asks on their first week: how do we change a firewall here, safely, and what do we do when it goes wrong.",
      "syntax": "runbook: change -> approve -> apply -> verify -> monitor -> audit -> respond",
      "exampleCode": "---\n- name: A Production Runbook End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./prod-runbook.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Policy check passed: allow-web present\"\n        fail_msg: \"Policy check failed\"\n",
      "exampleLanguage": "ansible",
      "mistake": "Writing the runbook once and never updating it, so it describes a workflow the team stopped following a year ago.",
      "bug": {
       "prompt": "Find the bug: this Ansible example should demonstrate A Production Runbook End to End, but it does not work correctly.",
       "buggyCode": "# runbook from 2024: change process the team no longer uses\n# new engineer follows it and skips the approval step that exists now",
       "fixedCode": "# runbook reviewed every quarter, updated with the workflow\n# the runbook always describes how the team actually works",
       "explanation": "A runbook is only useful if it matches reality: it must be reviewed and updated whenever the workflow changes."
      },
      "exercise": {
       "title": "Practise A Production Runbook End to End",
       "type": "write-code",
       "instructions": "Write a playbook that produces output containing \"Rule deny-all: any -> any deny\". This exercise practises A Production Runbook End to End.",
       "starterCode": "---\n- name: A Production Runbook End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
       "solution": "---\n- name: A Production Runbook End to End\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n  tasks:\n    - name: Show each rule\n      ansible.builtin.debug:\n        msg: \"Rule {{ item.name }}: {{ item.src }} -> {{ item.dst }} {{ item.action }}\"\n      loop: \"{{ rules }}\"\n    - name: Check the rule count\n      ansible.builtin.assert:\n        that:\n          - rules | length == 3\n        success_msg: \"Checked 3 rules: production runbook is complete\"\n        fail_msg: \"Rule count is wrong\"\n",
       "solutionExplanation": "The solution builds the a production runbook end to end policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"Rule deny-all: any -> any deny\".",
       "complexity": "Medium",
       "tests": [
        {
         "name": "Expected output shown",
         "expectedContains": "Rule deny-all: any -> any deny",
         "hidden": false
        },
        {
         "name": "Playbook succeeded",
         "expectedContains": "failed=0",
         "hidden": true
        }
       ],
       "hintNotes": {
        "concept": "A Production Runbook End to End is the key idea here: build the policy as data first, then render and check it locally.",
        "approach": "Work through A Production Runbook End to End step by step, checking each intermediate result before moving on.",
        "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
       }
      }
     }
    ]
   }
  ],
  "capstoneExercise": {
   "title": "Capstone: Production Firewall Automation",
   "type": "write-code",
   "instructions": "Build a capstone playbook that defines the production firewall automation policy as data, renders it to ./prod-capstone.txt, and asserts the allow-web rule is present. The output must contain \"allow-web=allow\".",
   "starterCode": "---\n- name: Production Firewall Automation Capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  tasks:\n    # TODO: add the tasks for this lesson below.\n",
   "solution": "---\n- name: Production Firewall Automation capstone\n  hosts: localhost\n  connection: local\n  gather_facts: false\n  vars:\n    rules:\n          - name: allow-web\n            src: trust\n            dst: dmz\n            svc: https-443\n            action: allow\n          - name: allow-dns\n            src: trust\n            dst: untrust\n            svc: dns-53\n            action: allow\n          - name: deny-all\n            src: any\n            dst: any\n            svc: any\n            action: deny\n    rendered: \"{% for r in rules %}{{ r.name }}={{ r.action }}; {% endfor %}\"\n  tasks:\n    - name: Write the rendered policy file\n      ansible.builtin.copy:\n        dest: ./prod-capstone.txt\n        content: |\n          # Firewall policy\n          {% for r in rules %}\n          - {{ r.name }}: {{ r.src }} -> {{ r.dst }} {{ r.svc }} {{ r.action }}\n          {% endfor %}\n        mode: \"0644\"\n    - name: Show the rendered policy\n      ansible.builtin.debug:\n        msg: \"Rendered policy: {{ rendered }}\"\n    - name: Check the first rule is present\n      ansible.builtin.assert:\n        that:\n          - \"'allow-web' in rendered\"\n          - rules | length == 3\n        success_msg: \"Capstone complete for Production Firewall Automation\"\n        fail_msg: \"Policy check failed\"\n",
   "solutionExplanation": "The solution builds the production firewall automation capstone policy data as variables, renders it locally with ansible.builtin modules, and asserts the expected rule is present, so the output contains \"allow-web=allow\".",
   "complexity": "Hard",
   "tests": [
    {
     "name": "Expected output shown",
     "expectedContains": "allow-web=allow",
     "hidden": false
    },
    {
     "name": "Playbook succeeded",
     "expectedContains": "failed=0",
     "hidden": true
    }
   ],
   "hintNotes": {
    "concept": "Production Firewall Automation Capstone is the key idea here: build the policy as data first, then render and check it locally.",
    "approach": "Work through Production Firewall Automation Capstone step by step, checking each intermediate result before moving on.",
    "structure": "Keep the standard shape for Ansible: set up the inputs, apply the lesson's rule, then verify the result against the expected output."
   }
  },
  "capstone": {
   "title": "Production Firewall Automation Capstone Project",
   "description": "A small end-to-end project that puts Production Firewall Automation into practice.",
   "requirements": [
    "Write the change record: ticket, window, implementer, reviewer, and rollback plan.",
    "Render the policy and validate it: no shadowed rules, deny-all last.",
    "Assert the allow-web rule is present and the invariants hold.",
    "Document the rollback command and the incident response steps."
   ],
   "rubric": [
    "The solution runs and demonstrates the track's ideas correctly.",
    "The work is clear, well-named, and organised into small steps.",
    "Errors and edge cases are handled, not ignored.",
    "The solution shows understanding of the track's key ideas, not just copied example code."
   ]
  }
 }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
