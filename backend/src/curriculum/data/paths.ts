// Skill paths, career paths and bootcamps.
// Every courseSlug / capstoneSlug in this file references a real slug in the
// 793-course / 95-project catalog. Validated programmatically by
// backend/tests/features.test.ts (asserts each slug exists in the seeded DB)
// and by scripts/validate-feature-slugs — a dead slug is a defect, not a typo.
export interface PathStep { courseSlug: string; note: string; }
export interface SkillPath {
  id: string; title: string; description: string; level: string;
  estimatedWeeks: number; steps: PathStep[];
}
export interface CareerPath {
  id: string; title: string; description: string; level: string;
  estimatedWeeks: number; steps: PathStep[]; capstoneProjectSlug: string;
  certificateTitle: string;
}
export interface BootcampWeek { week: number; title: string; goal: string; courseSlugs: string[]; }
export interface Bootcamp {
  id: string; title: string; description: string; weeks: number;
  hoursPerWeek: number; plan: BootcampWeek[];
}

export const SKILL_PATHS: SkillPath[] = [
  {
    id: 'python-developer', title: 'Python Developer', level: 'Beginner to Advanced',
    description: 'From first print statement to object-oriented programs, files and errors.',
    estimatedWeeks: 8,
    steps: [
      { courseSlug: 'python', note: 'Core language, all levels' },
      { courseSlug: 'python-first-steps', note: 'Your first programs' },
      { courseSlug: 'python-variables-types', note: 'Variables and types' },
      { courseSlug: 'python-numbers-math', note: 'Numbers and maths' },
      { courseSlug: 'python-strings', note: 'Working with text' },
      { courseSlug: 'python-lists', note: 'Lists and collections' },
      { courseSlug: 'python-conditionals', note: 'Branching logic' },
      { courseSlug: 'python-loops', note: 'Repeating work' },
      { courseSlug: 'python-functions', note: 'Reusable functions' },
      { courseSlug: 'python-function-args', note: 'Arguments and scope' },
      { courseSlug: 'python-classes', note: 'Classes and objects' },
      { courseSlug: 'python-oop-methods', note: 'OOP in depth' },
      { courseSlug: 'python-file-io', note: 'Files and persistence' },
      { courseSlug: 'python-exceptions', note: 'Errors done right' },
      { courseSlug: 'python-modules', note: 'Modules and packaging' },
    ],
  },
  {
    id: 'go-backend', title: 'Go Backend Developer', level: 'Beginner to Advanced',
    description: 'Go fundamentals, concurrency, HTTP servers and REST APIs.',
    estimatedWeeks: 10,
    steps: [
      { courseSlug: 'go', note: 'Core language, all levels' },
      { courseSlug: 'go-setup-modules', note: 'Toolchain and modules' },
      { courseSlug: 'go-variables-types', note: 'Variables and types' },
      { courseSlug: 'go-functions', note: 'Functions and returns' },
      { courseSlug: 'go-control-flow', note: 'Control flow' },
      { courseSlug: 'go-arrays-slices', note: 'Arrays and slices' },
      { courseSlug: 'go-maps', note: 'Maps' },
      { courseSlug: 'go-structs', note: 'Structs and methods' },
      { courseSlug: 'go-interfaces-basics', note: 'Interfaces' },
      { courseSlug: 'go-errors-basics', note: 'Error handling' },
      { courseSlug: 'go-goroutines', note: 'Goroutines' },
      { courseSlug: 'go-channels', note: 'Channels' },
      { courseSlug: 'go-http-servers', note: 'HTTP servers' },
      { courseSlug: 'go-routing', note: 'Routing' },
      { courseSlug: 'go-rest-apis', note: 'REST APIs' },
      { courseSlug: 'go-database-sql', note: 'Databases' },
      { courseSlug: 'go-grpc', note: 'gRPC services' },
      { courseSlug: 'go-microservices', note: 'Microservices' },
      { courseSlug: 'go-testing-basics', note: 'Testing' },
    ],
  },
  {
    id: 'react-frontend', title: 'React Frontend Developer', level: 'Beginner to Advanced',
    description: 'Components, state, routing, data fetching and testing in React.',
    estimatedWeeks: 8,
    steps: [
      { courseSlug: 'react', note: 'Core library, all levels' },
      { courseSlug: 'react-setup-jsx', note: 'Setup and JSX' },
      { courseSlug: 'react-components', note: 'Components' },
      { courseSlug: 'react-props', note: 'Props' },
      { courseSlug: 'react-usestate', note: 'State with hooks' },
      { courseSlug: 'react-useeffect-basics', note: 'Effects' },
      { courseSlug: 'react-router', note: 'Routing' },
      { courseSlug: 'react-data-fetching', note: 'Data fetching' },
      { courseSlug: 'react-forms-advanced', note: 'Forms' },
      { courseSlug: 'react-testing-library', note: 'Component testing' },
      { courseSlug: 'react-redux-toolkit', note: 'Global state' },
    ],
  },
  {
    id: 'rust-systems', title: 'Rust Systems Programmer', level: 'Intermediate to Advanced',
    description: 'Ownership, traits, async Rust and real CLI/networked programs.',
    estimatedWeeks: 10,
    steps: [
      { courseSlug: 'rust', note: 'Core language, all levels' },
      { courseSlug: 'rust-setup-cargo', note: 'Cargo toolchain' },
      { courseSlug: 'rust-variables-mutability', note: 'Variables' },
      { courseSlug: 'rust-ownership-basics', note: 'Ownership' },
      { courseSlug: 'rust-borrowing', note: 'Borrowing' },
      { courseSlug: 'rust-structs', note: 'Structs' },
      { courseSlug: 'rust-enums', note: 'Enums' },
      { courseSlug: 'rust-result-errors', note: 'Error handling' },
      { courseSlug: 'rust-traits', note: 'Traits' },
      { courseSlug: 'rust-async-await', note: 'Async basics' },
      { courseSlug: 'rust-tokio', note: 'Tokio runtime' },
      { courseSlug: 'rust-clap-cli', note: 'CLI apps' },
      { courseSlug: 'rust-serde-json', note: 'Serialization' },
    ],
  },
  {
    id: 'data-ml', title: 'Data Science & Machine Learning', level: 'Beginner to Advanced',
    description: 'Python for data, statistics, ML models, neural networks and MLOps.',
    estimatedWeeks: 12,
    steps: [
      { courseSlug: 'python', note: 'Python foundation' },
      { courseSlug: 'data-science-python', note: 'Data science with Python' },
      { courseSlug: 'machine-learning', note: 'Classical ML' },
      { courseSlug: 'deep-learning', note: 'Deep learning' },
      { courseSlug: 'mlp-neural-networks-scratch', note: 'Neural nets from scratch' },
      { courseSlug: 'mlops', note: 'Shipping models' },
    ],
  },
  {
    id: 'devops-engineer', title: 'DevOps Engineer', level: 'Beginner to Advanced',
    description: 'Linux, containers, orchestration, infrastructure as code and CI/CD.',
    estimatedWeeks: 10,
    steps: [
      { courseSlug: 'linux-bash', note: 'Linux and shell' },
      { courseSlug: 'git-github', note: 'Git and GitHub' },
      { courseSlug: 'docker', note: 'Containers' },
      { courseSlug: 'kubernetes', note: 'Orchestration' },
      { courseSlug: 'terraform', note: 'Infrastructure as code' },
      { courseSlug: 'ansible', note: 'Configuration management' },
      { courseSlug: 'cicd-actions', note: 'CI/CD pipelines' },
    ],
  },
  {
    id: 'fullstack-web', title: 'Full-Stack Web Developer', level: 'Beginner to Advanced',
    description: 'JavaScript, Node, APIs, databases and a React frontend, end to end.',
    estimatedWeeks: 12,
    steps: [
      { courseSlug: 'javascript', note: 'JavaScript foundation' },
      { courseSlug: 'nodejs', note: 'Node.js runtime' },
      { courseSlug: 'expressjs', note: 'Express servers' },
      { courseSlug: 'rest-api-design', note: 'API design' },
      { courseSlug: 'postgresql', note: 'Relational data' },
      { courseSlug: 'sql', note: 'SQL' },
      { courseSlug: 'react', note: 'React frontend' },
      { courseSlug: 'testing-tdd', note: 'Testing' },
    ],
  },
];

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'career-backend-engineer', title: 'Backend Engineer', level: 'Beginner to Job-Ready',
    description: 'Multi-track route to a backend role: language depth, APIs, databases, testing and a capstone service.',
    estimatedWeeks: 20,
    steps: [
      { courseSlug: 'python', note: 'First backend language' },
      { courseSlug: 'go', note: 'Second backend language' },
      { courseSlug: 'rest-api-design', note: 'API design' },
      { courseSlug: 'postgresql', note: 'Relational databases' },
      { courseSlug: 'testing-tdd', note: 'Testing discipline' },
      { courseSlug: 'system-design', note: 'Designing systems' },
      { courseSlug: 'algorithms-refresher', note: 'Interview algorithms' },
      { courseSlug: 'interview-prep', note: 'Interview preparation' },
    ],
    capstoneProjectSlug: 'rest-api-service',
    certificateTitle: 'Professional Certificate — Backend Engineer',
  },
  {
    id: 'career-frontend-engineer', title: 'Frontend Engineer', level: 'Beginner to Job-Ready',
    description: 'JavaScript depth, React mastery, testing and a production-grade frontend capstone.',
    estimatedWeeks: 18,
    steps: [
      { courseSlug: 'javascript', note: 'JavaScript foundation' },
      { courseSlug: 'react', note: 'React, all levels' },
      { courseSlug: 'react-router', note: 'Routing' },
      { courseSlug: 'react-testing-library', note: 'Testing' },
      { courseSlug: 'react-redux-toolkit', note: 'State at scale' },
      { courseSlug: 'testing-tdd', note: 'Testing discipline' },
      { courseSlug: 'algorithms-refresher', note: 'Interview algorithms' },
      { courseSlug: 'interview-prep', note: 'Interview preparation' },
    ],
    capstoneProjectSlug: 'fullstack-ecommerce',
    certificateTitle: 'Professional Certificate — Frontend Engineer',
  },
  {
    id: 'career-data-scientist', title: 'Data Scientist', level: 'Beginner to Job-Ready',
    description: 'Python, statistics, ML, deep learning and a deployed ML capstone.',
    estimatedWeeks: 24,
    steps: [
      { courseSlug: 'python', note: 'Python foundation' },
      { courseSlug: 'data-science-python', note: 'Data science' },
      { courseSlug: 'machine-learning', note: 'Classical ML' },
      { courseSlug: 'deep-learning', note: 'Deep learning' },
      { courseSlug: 'mlp-neural-networks-scratch', note: 'Neural nets from scratch' },
      { courseSlug: 'mlops', note: 'Shipping models' },
      { courseSlug: 'sql', note: 'SQL for data work' },
      { courseSlug: 'interview-prep', note: 'Interview preparation' },
    ],
    capstoneProjectSlug: 'ml-image-classifier-api',
    certificateTitle: 'Professional Certificate — Data Scientist',
  },
  {
    id: 'career-devops-engineer', title: 'DevOps Engineer', level: 'Beginner to Job-Ready',
    description: 'Linux, containers, cloud, IaC and CI/CD, ending in a pipeline capstone.',
    estimatedWeeks: 20,
    steps: [
      { courseSlug: 'linux-bash', note: 'Linux and shell' },
      { courseSlug: 'docker', note: 'Containers' },
      { courseSlug: 'kubernetes', note: 'Orchestration' },
      { courseSlug: 'terraform', note: 'Infrastructure as code' },
      { courseSlug: 'ansible', note: 'Configuration management' },
      { courseSlug: 'cicd-actions', note: 'CI/CD pipelines' },
      { courseSlug: 'system-design', note: 'Designing systems' },
      { courseSlug: 'interview-prep', note: 'Interview preparation' },
    ],
    capstoneProjectSlug: 'cicd-pipeline',
    certificateTitle: 'Professional Certificate — DevOps Engineer',
  },
  {
    id: 'career-fullstack-engineer', title: 'Full-Stack Engineer', level: 'Beginner to Job-Ready',
    description: 'Frontend plus backend plus databases, ending in a full-stack SaaS capstone.',
    estimatedWeeks: 24,
    steps: [
      { courseSlug: 'javascript', note: 'JavaScript foundation' },
      { courseSlug: 'nodejs', note: 'Node.js' },
      { courseSlug: 'expressjs', note: 'Express' },
      { courseSlug: 'postgresql', note: 'Databases' },
      { courseSlug: 'react', note: 'React frontend' },
      { courseSlug: 'rest-api-design', note: 'API design' },
      { courseSlug: 'testing-tdd', note: 'Testing discipline' },
      { courseSlug: 'system-design', note: 'Designing systems' },
      { courseSlug: 'interview-prep', note: 'Interview preparation' },
    ],
    capstoneProjectSlug: 'task-management-saas',
    certificateTitle: 'Professional Certificate — Full-Stack Engineer',
  },
];

export const BOOTCAMPS: Bootcamp[] = [
  {
    id: 'bootcamp-python-6wk', title: 'Python Bootcamp — 6 Weeks', weeks: 6, hoursPerWeek: 10,
    description: 'Six-week structured sprint from zero to a working Python program portfolio.',
    plan: [
      { week: 1, title: 'First programs', goal: 'Write and run your first Python programs.', courseSlugs: ['python-first-steps', 'python-variables-types'] },
      { week: 2, title: 'Data and logic', goal: 'Use strings, lists and conditionals fluently.', courseSlugs: ['python-strings', 'python-lists', 'python-conditionals'] },
      { week: 3, title: 'Loops and functions', goal: 'Automate repetition with loops and functions.', courseSlugs: ['python-loops', 'python-functions', 'python-function-args'] },
      { week: 4, title: 'Objects and files', goal: 'Model data with classes and persist it to files.', courseSlugs: ['python-classes', 'python-oop-methods', 'python-file-io'] },
      { week: 5, title: 'Robust programs', goal: 'Handle errors and organise code into modules.', courseSlugs: ['python-exceptions', 'python-modules'] },
      { week: 6, title: 'Capstone week', goal: 'Finish the Python track and pass its assessment.', courseSlugs: ['python'] },
    ],
  },
  {
    id: 'bootcamp-go-backend-8wk', title: 'Go Backend Bootcamp — 8 Weeks', weeks: 8, hoursPerWeek: 12,
    description: 'Eight weeks to a working Go REST API service with tests.',
    plan: [
      { week: 1, title: 'Go foundations', goal: 'Set up Go and write first programs.', courseSlugs: ['go-setup-modules', 'go-variables-types', 'go-functions'] },
      { week: 2, title: 'Types and control', goal: 'Master slices, maps, structs and interfaces.', courseSlugs: ['go-arrays-slices', 'go-maps', 'go-structs', 'go-interfaces-basics'] },
      { week: 3, title: 'Errors and packages', goal: 'Handle errors and organise packages.', courseSlugs: ['go-errors-basics', 'go-packages'] },
      { week: 4, title: 'Concurrency', goal: 'Use goroutines and channels safely.', courseSlugs: ['go-goroutines', 'go-channels'] },
      { week: 5, title: 'HTTP servers', goal: 'Serve HTTP and route requests.', courseSlugs: ['go-http-servers', 'go-routing'] },
      { week: 6, title: 'REST APIs', goal: 'Build a JSON REST API.', courseSlugs: ['go-rest-apis', 'go-database-sql'] },
      { week: 7, title: 'Services', goal: 'Learn gRPC and microservice patterns.', courseSlugs: ['go-grpc', 'go-microservices'] },
      { week: 8, title: 'Ship it', goal: 'Test the API and finish the Go track.', courseSlugs: ['go-testing-basics', 'go'] },
    ],
  },
  {
    id: 'bootcamp-devops-8wk', title: 'DevOps Bootcamp — 8 Weeks', weeks: 8, hoursPerWeek: 10,
    description: 'Eight weeks from Linux basics to a CI/CD pipeline you can show an employer.',
    plan: [
      { week: 1, title: 'Linux and Git', goal: 'Work confidently in a shell and with Git.', courseSlugs: ['linux-bash', 'git-github'] },
      { week: 2, title: 'Containers', goal: 'Containerise an app with Docker.', courseSlugs: ['docker'] },
      { week: 3, title: 'Orchestration', goal: 'Run workloads on Kubernetes.', courseSlugs: ['kubernetes'] },
      { week: 4, title: 'Infrastructure as code', goal: 'Provision infra with Terraform.', courseSlugs: ['terraform'] },
      { week: 5, title: 'Configuration', goal: 'Manage servers with Ansible.', courseSlugs: ['ansible'] },
      { week: 6, title: 'CI/CD', goal: 'Automate build, test and deploy.', courseSlugs: ['cicd-actions'] },
      { week: 7, title: 'Systems thinking', goal: 'Design reliable systems.', courseSlugs: ['system-design'] },
      { week: 8, title: 'Capstone week', goal: 'Finish the DevOps path and its capstone project.', courseSlugs: ['docker', 'terraform'] },
    ],
  },
];
