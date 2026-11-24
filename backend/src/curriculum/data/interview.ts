// Mock-interview question bank. Behavioral questions are scored by the
// learner against a published rubric (self-assessment — the result page
// labels it as such, it is never presented as an examiner's score).
// Technical questions are discussion prompts; the coding round is a real
// challenge run through the executor (see challenges.ts).
export interface InterviewQuestion { id: string; question: string; guidance: string; }
export interface InterviewTrack {
  id: string; title: string; description: string;
  behavioral: InterviewQuestion[];
  technical: InterviewQuestion[];
  codingChallengeId: string;
}
export const INTERVIEW_RUBRIC: { criterion: string; description: string }[] = [
  { criterion: 'Specific example', description: 'Answered with a concrete situation, not generalities.' },
  { criterion: 'Role and actions', description: 'Clearly stated what you personally did, not just the team.' },
  { criterion: 'Outcome and learning', description: 'Stated the result and what you would do differently.' },
];

export const INTERVIEW_TRACKS: InterviewTrack[] = [
  {
    id: 'general', title: 'General Software Engineering', description: 'Core behavioral + technical rounds for any software role.',
    codingChallengeId: 'two-sum-count',
    behavioral: [
      { id: 'gen-b1', question: 'Tell me about a time you debugged a difficult problem.', guidance: 'Use STAR: situation, task, action, result. Name the tools and the turning point.' },
      { id: 'gen-b2', question: 'Describe a disagreement with a teammate and how you resolved it.', guidance: 'Show listening and compromise, not winning the argument.' },
      { id: 'gen-b3', question: 'Tell me about a project you are most proud of and why.', guidance: 'Pick one with measurable impact; explain your specific contribution.' },
    ],
    technical: [
      { id: 'gen-t1', question: 'Explain how a hash map works and when you would avoid one.', guidance: 'Cover hashing, collisions, load factor, and ordered-iteration cases.' },
      { id: 'gen-t2', question: 'What is the difference between a process and a thread?', guidance: 'Memory isolation, context-switch cost, shared state and race conditions.' },
      { id: 'gen-t3', question: 'How would you design a URL shortener?', guidance: 'Requirements, data model, hashing vs counter, scaling, and failure modes.' },
    ],
  },
  {
    id: 'python', title: 'Python Developer', description: 'Python-focused technical round.',
    codingChallengeId: 'is-prime',
    behavioral: [
      { id: 'py-b1', question: 'Tell me about a Python project where performance mattered.', guidance: 'Profiling first, then the fix — not premature optimisation.' },
      { id: 'py-b2', question: 'How do you keep a growing Python codebase maintainable?', guidance: 'Tests, typing, linting, modules, and clear ownership.' },
      { id: 'py-b3', question: 'Describe a time you had to learn a new library under deadline.', guidance: 'How you scoped the learning and validated the choice.' },
    ],
    technical: [
      { id: 'py-t1', question: 'Explain Python’s GIL and what it means for concurrency.', guidance: 'Threads vs processes, I/O-bound vs CPU-bound work.' },
      { id: 'py-t2', question: 'What is the difference between a list, a tuple and a set?', guidance: 'Mutability, ordering, hashing, and lookup cost.' },
      { id: 'py-t3', question: 'How do decorators work in Python?', guidance: 'Functions as values, closures, functools.wraps, and stacking order.' },
    ],
  },
  {
    id: 'go', title: 'Go Backend Engineer', description: 'Go and backend-systems technical round.',
    codingChallengeId: 'two-sum-count',
    behavioral: [
      { id: 'go-b1', question: 'Tell me about a production incident you helped resolve.', guidance: 'Timeline, communication, mitigation before root cause.' },
      { id: 'go-b2', question: 'How do you handle on-call pressure?', guidance: 'Runbooks, alert quality, and blameless follow-up.' },
      { id: 'go-b3', question: 'Describe a time you simplified a complex system.', guidance: 'What you removed and what the trade-off was.' },
    ],
    technical: [
      { id: 'go-t1', question: 'How do goroutines and channels differ from threads and queues?', guidance: 'Scheduling, blocking, and the share-by-communicating model.' },
      { id: 'go-t2', question: 'How would you design a rate limiter for an API?', guidance: 'Token bucket vs fixed window, storage, and failure behaviour.' },
      { id: 'go-t3', question: 'What happens when an HTTP handler in Go panics?', guidance: 'Recovery middleware, connection handling, and observability.' },
    ],
  },
  {
    id: 'react', title: 'React Frontend Engineer', description: 'React and frontend technical round.',
    codingChallengeId: 'fizzbuzz',
    behavioral: [
      { id: 're-b1', question: 'Tell me about a UI bug that was hard to reproduce.', guidance: 'How you narrowed it down and what the fix taught you.' },
      { id: 're-b2', question: 'How do you work with designers and product managers?', guidance: 'Feedback loops, prototypes, and scope negotiation.' },
      { id: 're-b3', question: 'Describe a time you improved a page’s performance.', guidance: 'Measurement first: what metric moved and by how much.' },
    ],
    technical: [
      { id: 're-t1', question: 'Explain React rendering: what triggers a re-render?', guidance: 'State, props, context, and memoisation boundaries.' },
      { id: 're-t2', question: 'How do you manage state in a large React app?', guidance: 'Local vs global state, server state, and when each fits.' },
      { id: 're-t3', question: 'What is the difference between useEffect and useLayoutEffect?', guidance: 'Timing relative to paint and the problems each solves.' },
    ],
  },
  {
    id: 'data', title: 'Data Scientist / ML Engineer', description: 'Data and ML technical round.',
    codingChallengeId: 'sum-of-digits',
    behavioral: [
      { id: 'da-b1', question: 'Tell me about a model that failed in production.', guidance: 'Drift, monitoring, and how you caught it.' },
      { id: 'da-b2', question: 'How do you explain a model’s result to a non-technical stakeholder?', guidance: 'Trade-offs, uncertainty, and business impact in plain language.' },
      { id: 'da-b3', question: 'Describe a time your data contradicted your hypothesis.', guidance: 'What you changed and what you learned.' },
    ],
    technical: [
      { id: 'da-t1', question: 'How do you detect and handle overfitting?', guidance: 'Train/validation splits, regularisation, and cross-validation.' },
      { id: 'da-t2', question: 'Explain precision and recall, and when each matters more.', guidance: 'Class imbalance and the cost of each error type.' },
      { id: 'da-t3', question: 'How would you design a feature pipeline for a real-time model?', guidance: 'Training/serving skew, freshness, and monitoring.' },
    ],
  },
  {
    id: 'devops', title: 'DevOps Engineer', description: 'Infrastructure and reliability technical round.',
    codingChallengeId: 'c-hello-sum',
    behavioral: [
      { id: 'de-b1', question: 'Tell me about a deployment that went wrong.', guidance: 'Rollback, communication, and the fix that prevented repeats.' },
      { id: 'de-b2', question: 'How do you balance shipping speed with reliability?', guidance: 'SLOs, error budgets, and guardrails.' },
      { id: 'de-b3', question: 'Describe a time you automated away toil.', guidance: 'What the toil cost, what you built, and the measured saving.' },
    ],
    technical: [
      { id: 'de-t1', question: 'How do containers differ from virtual machines?', guidance: 'Kernel sharing, isolation boundaries, and startup cost.' },
      { id: 'de-t2', question: 'Explain blue-green vs canary deployments.', guidance: 'Risk, rollback, traffic shifting, and observability.' },
      { id: 'de-t3', question: 'How do you manage secrets in infrastructure as code?', guidance: 'Separation from state, rotation, and least privilege.' },
    ],
  },
];
