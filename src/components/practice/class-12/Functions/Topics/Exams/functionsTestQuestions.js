export const exercise1A = [
  {
    id: "fun_1a_1",
    question: "Which of the following relations is a function?",
    options: ["$\\{(2,3),(2,5),(4,6)\\}$", "$\\{(1,2),(2,3),(3,4)\\}$", "$\\{(1,2),(1,3),(2,4)\\}$", "$\\{(a,b),(a,c)\\}$"],
    correctAnswerIndex: 1,
    explanation: "Each input appears with exactly one output only in the second relation.",
    topic: "Functions",
    difficulty: "Easy",
  },
  {
    id: "fun_1a_2",
    question: "If $f(x)=x$, then $f(f(x))=$",
    options: ["$x$", "$x^2$", "$1$", "$0$"],
    correctAnswerIndex: 0,
    explanation: "The identity function returns the same input every time.",
    topic: "Functions",
    difficulty: "Easy",
  },
  {
    id: "fun_1a_3",
    question: "If $f(x)=5$, then the range of $f$ is:",
    options: ["$\\{5\\}$", "$\\mathbb{R}$", "$[0,\\infty)$", "$\\{x\\}$"],
    correctAnswerIndex: 0,
    explanation: "A constant function has a single output value.",
    topic: "Functions",
    difficulty: "Easy",
  },
];

export const exercise1B = [
  {
    id: "fun_1b_1",
    question: "Find the domain of $f(x)=\\frac{1}{x+2}$.",
    options: ["$x \\neq -2$", "$x \\neq 2$", "All real numbers", "$x>-2$"],
    correctAnswerIndex: 0,
    explanation: "The denominator cannot be zero.",
    topic: "Functions",
    difficulty: "Medium",
  },
  {
    id: "fun_1b_2",
    question: "Find $f(2)$ for $f(x)=x^2+3x+1$.",
    options: ["$9$", "$11$", "$7$", "$5$"],
    correctAnswerIndex: 1,
    explanation: "Substitute $x=2$ to get $4+6+1=11$.",
    topic: "Functions",
    difficulty: "Easy",
  },
  {
    id: "fun_1b_3",
    question: "If $f(x)=2x+3$ and $g(x)=x-1$, then $(f-g)(x)=$",
    options: ["$x+4$", "$x+2$", "$3x+2$", "$2x-4$"],
    correctAnswerIndex: 0,
    explanation: "$(2x+3)-(x-1)=x+4$.",
    topic: "Functions",
    difficulty: "Medium",
  },
];

export const exercise1C = [
  {
    id: "fun_1c_1",
    question: "Solve $2x^2-1=1-3x$.",
    options: ["$x=\\frac{1}{2},-2$", "$x=1,-\\frac{1}{2}$", "$x=-1,2$", "$x=0,1$"],
    correctAnswerIndex: 0,
    explanation: "$2x^2+3x-2=0=(2x-1)(x+2)$.",
    topic: "Functions",
    difficulty: "Medium",
  },
  {
    id: "fun_1c_2",
    question: "If $f(x)=2x+1$ and $g(x)=x^2$, then $f(3)+g(-5)=$",
    options: ["$32$", "$31$", "$36$", "$20$"],
    correctAnswerIndex: 0,
    explanation: "$f(3)=7$ and $g(-5)=25$.",
    topic: "Functions",
    difficulty: "Easy",
  },
  {
    id: "fun_1c_3",
    question: "If $f(x)=x^2-1$, then $(2f)(3)$ equals:",
    options: ["$16$", "$8$", "$18$", "$4$"],
    correctAnswerIndex: 0,
    explanation: "$2(9-1)=16$.",
    topic: "Functions",
    difficulty: "Medium",
  },
];

export const exercise2A = [
  {
    id: "fun_2a_1",
    question: "Find the domain of $f(x)=\\frac{1}{\\sqrt{x^2-1}}$.",
    options: ["$x<-1$ or $x>1$", "$-1 \\le x \\le 1$", "$x \\neq \\pm 1$", "All real numbers"],
    correctAnswerIndex: 0,
    explanation: "The expression inside the denominator root must be strictly positive.",
    topic: "Functions",
    difficulty: "Hard",
  },
  {
    id: "fun_2a_2",
    question: "Find the range of $f(x)=\\sqrt{16-x^2}$.",
    options: ["$[0,4]$", "$[-4,4]$", "$[0,16]$", "$(-\\infty,4]$"],
    correctAnswerIndex: 0,
    explanation: "Outputs are non-negative and at most 4.",
    topic: "Functions",
    difficulty: "Medium",
  },
  {
    id: "fun_2a_3",
    question: "Find the range of $f(x)=2-\\sqrt{x-5}$.",
    options: ["$(-\\infty,2]$", "$[2,\\infty)$", "$[0,2]$", "All real numbers"],
    correctAnswerIndex: 0,
    explanation: "$\\sqrt{x-5} \\ge 0$, so subtracting it keeps outputs at most 2.",
    topic: "Functions",
    difficulty: "Medium",
  },
];

export const previousKCET = [
  {
    id: "fun_prev_1",
    question: "Which of the following is an identity function?",
    options: ["$f(x)=x$", "$f(x)=1$", "$f(x)=x^2$", "$f(x)=|x|$"],
    correctAnswerIndex: 0,
    explanation: "Identity function maps every input to itself.",
    topic: "Functions",
    difficulty: "Easy",
  },
  {
    id: "fun_prev_2",
    question: "The range of the constant function $f(x)=7$ is:",
    options: ["$\\{7\\}$", "$\\mathbb{R}$", "$[0,\\infty)$", "$\\{x\\}$"],
    correctAnswerIndex: 0,
    explanation: "Only the value 7 is produced.",
    topic: "Functions",
    difficulty: "Easy",
  },
];

export const allExams = [
  { id: "ex_1a", title: "Exercise 1A", subtitle: "Board Basics", questions: exercise1A, color: "#0891b2" },
  { id: "ex_1b", title: "Exercise 1B", subtitle: "Algebra of Functions", questions: exercise1B, color: "#7c3aed" },
  { id: "ex_1c", title: "Exercise 1C", subtitle: "Evaluation and Equality", questions: exercise1C, color: "#ec4899" },
  { id: "ex_2a", title: "Exercise 2A", subtitle: "Domain and Range", questions: exercise2A, color: "#059669" },
  { id: "prev_board", title: "Previous Board Mix", subtitle: "Quick Revision", questions: previousKCET, color: "#dc2626" },
];
