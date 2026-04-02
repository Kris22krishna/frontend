export const exercise1A = [
  {
    id: "itf_1a_1",
    question: "The inverse of a function exists only when the function is:",
    options: ["constant", "periodic", "one-one and onto", "even"],
    correctAnswerIndex: 2,
    explanation: "A function must be both one-one and onto to possess an inverse.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Easy",
  },
  {
    id: "itf_1a_2",
    question: "Why is $\\sin x$ not invertible on $\\mathbb{R}$?",
    options: ["Its range is empty", "It is not one-one", "It is undefined at 0", "It is always positive"],
    correctAnswerIndex: 1,
    explanation: "Since $\\sin x$ repeats values on $\\mathbb{R}$, it is not one-one there.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Easy",
  },
  {
    id: "itf_1a_3",
    question: "A standard restricted domain for $\\sin x$ to define $\\sin^{-1}x$ is:",
    options: ["$[0,\\pi]$", "$[-\\pi/2,\\pi/2]$", "$(0,\\pi)$", "$[-\\pi,\\pi]$"],
    correctAnswerIndex: 1,
    explanation: "$\\sin x$ is one-one on $[-\\pi/2,\\pi/2]$, so that interval is used for $\\sin^{-1}x$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Easy",
  },
];

export const exercise1B = [
  {
    id: "itf_1b_1",
    question: "The principal value range of $\\cos^{-1}x$ is:",
    options: ["$[-\\pi/2,\\pi/2]$", "$[0,\\pi]$", "$(0,\\pi)$", "$(-\\pi/2,\\pi/2)$"],
    correctAnswerIndex: 1,
    explanation: "$\\cos^{-1}x$ returns its principal value in the interval $[0,\\pi]$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Medium",
  },
  {
    id: "itf_1b_2",
    question: "Evaluate $\\sin^{-1}(1/2)$.",
    options: ["$\\pi/6$", "$\\pi/4$", "$\\pi/3$", "$5\\pi/6$"],
    correctAnswerIndex: 0,
    explanation: "The principal angle in $[-\\pi/2,\\pi/2]$ whose sine is $1/2$ is $\\pi/6$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Easy",
  },
  {
    id: "itf_1b_3",
    question: "Evaluate $\\cos^{-1}(-1/2)$.",
    options: ["$\\pi/3$", "$2\\pi/3$", "$4\\pi/3$", "$5\\pi/6$"],
    correctAnswerIndex: 1,
    explanation: "The principal angle in $[0,\\pi]$ whose cosine is $-1/2$ is $2\\pi/3$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Medium",
  },
];

export const exercise1C = [
  {
    id: "itf_1c_1",
    question: "Evaluate $\\tan^{-1}(1)$.",
    options: ["$\\pi/6$", "$\\pi/4$", "$\\pi/3$", "$3\\pi/4$"],
    correctAnswerIndex: 1,
    explanation: "The principal angle in $(-\\pi/2,\\pi/2)$ whose tangent is 1 is $\\pi/4$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Easy",
  },
  {
    id: "itf_1c_2",
    question: "Evaluate $\\cot^{-1}(-1)$.",
    options: ["$-\\pi/4$", "$\\pi/4$", "$3\\pi/4$", "$5\\pi/4$"],
    correctAnswerIndex: 2,
    explanation: "For principal range $(0,\\pi)$, the angle whose cotangent is $-1$ is $3\\pi/4$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Medium",
  },
  {
    id: "itf_1c_3",
    question: "Evaluate $\\sec^{-1}(2)$.",
    options: ["$\\pi/6$", "$\\pi/4$", "$\\pi/3$", "$2\\pi/3$"],
    correctAnswerIndex: 2,
    explanation: "Since $\\sec \\theta = 2$ means $\\cos \\theta = 1/2$, the principal value is $\\pi/3$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Medium",
  },
];

export const exercise2A = [
  {
    id: "itf_2a_1",
    question: "Evaluate $\\sin^{-1}(\\sin 3\\pi/4)$.",
    options: ["$3\\pi/4$", "$\\pi/4$", "$-\\pi/4$", "$\\pi/2$"],
    correctAnswerIndex: 1,
    explanation: "$\\sin 3\\pi/4 = \\sqrt{2}/2$, and the principal angle in $[-\\pi/2,\\pi/2]$ with that sine is $\\pi/4$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Hard",
  },
  {
    id: "itf_2a_2",
    question: "Evaluate $\\cos^{-1}(\\cos 5\\pi/4)$.",
    options: ["$\\pi/4$", "$3\\pi/4$", "$5\\pi/4$", "$7\\pi/4$"],
    correctAnswerIndex: 1,
    explanation: "$\\cos 5\\pi/4 = -\\sqrt{2}/2$, and the principal angle in $[0,\\pi]$ with that cosine is $3\\pi/4$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Hard",
  },
  {
    id: "itf_2a_3",
    question: "Evaluate $\\tan^{-1}(\\tan 3\\pi/4)$.",
    options: ["$3\\pi/4$", "$-\\pi/4$", "$\\pi/4$", "$-3\\pi/4$"],
    correctAnswerIndex: 1,
    explanation: "$\\tan 3\\pi/4 = -1$, and the principal angle in $(-\\pi/2,\\pi/2)$ with tangent $-1$ is $-\\pi/4$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Hard",
  },
];

export const previousKCET = [
  {
    id: "itf_prev_1",
    question: "If $x \\in [-1,1]$, then $\\sin^{-1}x + \\cos^{-1}x =$",
    options: ["$0$", "$\\pi/4$", "$\\pi/2$", "$\\pi$"],
    correctAnswerIndex: 2,
    explanation: "This is a standard inverse-trig identity: $\\sin^{-1}x + \\cos^{-1}x = \\pi/2$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Medium",
  },
  {
    id: "itf_prev_2",
    question: "Evaluate $\\tan^{-1}(\\sqrt{3})$.",
    options: ["$\\pi/6$", "$\\pi/4$", "$\\pi/3$", "$2\\pi/3$"],
    correctAnswerIndex: 2,
    explanation: "The principal angle in $(-\\pi/2,\\pi/2)$ whose tangent is $\\sqrt{3}$ is $\\pi/3$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Easy",
  },
  {
    id: "itf_prev_3",
    question: "Evaluate $\\csc^{-1}(-2)$.",
    options: ["$-\\pi/6$", "$\\pi/6$", "$5\\pi/6$", "$-5\\pi/6$"],
    correctAnswerIndex: 0,
    explanation: "Since $\\csc \\theta = -2$ means $\\sin \\theta = -1/2$, the principal value is $-\\pi/6$.",
    topic: "Inverse Trigonometric Functions",
    difficulty: "Medium",
  },
];

export const allExams = [
  { id: "ex_1a", title: "Exercise 1A", subtitle: "Concept and Restriction", questions: exercise1A, color: "#0891b2" },
  { id: "ex_1b", title: "Exercise 1B", subtitle: "Definitions and Ranges", questions: exercise1B, color: "#7c3aed" },
  { id: "ex_1c", title: "Exercise 1C", subtitle: "Standard Values", questions: exercise1C, color: "#ec4899" },
  { id: "ex_2a", title: "Exercise 2A", subtitle: "Principal Value Practice", questions: exercise2A, color: "#059669" },
  { id: "prev_board", title: "Previous Board Mix", subtitle: "Identity and Value Revision", questions: previousKCET, color: "#dc2626" },
];
