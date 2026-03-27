export const matricesExamEdgeData = {
  hero: {
    badge: "Strategy Dashboard",
    title: "Exam Edge",
    subtitle:
      "Board-first revision for core Class 12 matrix questions, followed by KCET-style speed practice for the matrices chapter.",
  },
  highYield: [
    {
      category: "Board Level Focus",
      topics: [
        "Matrix order, equality, and common matrix types",
        "Addition, multiplication, transpose, and basic properties",
        "Inverse of a matrix and the condition for existence",
        "Short-answer reasoning on identity, diagonal, and scalar matrices",
      ],
    },
    {
      category: "KCET Focus",
      topics: [
        "Fast identification of matrix types in MCQ format",
        "Direct determinant and inverse-existence checks",
        "Speed-based computation on diagonal and scalar matrices",
        "One-step transpose and symmetric-matrix recognition",
      ],
    },
  ],
  questions: {
    board: [
      {
        level: "Easy",
        q: "State the condition under which the inverse of a square matrix exists.",
        ans: "A square matrix has an inverse if and only if its determinant is non-zero.",
      },
      {
        level: "Easy",
        q: "Write one example of a scalar matrix of order $2$.",
        ans: "One example is $\\begin{bmatrix} 4 & 0 \\\\ 0 & 4 \\end{bmatrix}$. It is diagonal and both diagonal entries are the same scalar.",
      },
      {
        level: "Medium",
        q: "Differentiate between a diagonal matrix and a scalar matrix.",
        ans: "In a diagonal matrix, all off-diagonal entries are zero. In a scalar matrix, all off-diagonal entries are zero and every diagonal entry is equal to the same scalar. So every scalar matrix is diagonal, but every diagonal matrix need not be scalar.",
      },
      {
        level: "Medium",
        q: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 5 \\end{bmatrix}$, find $A^{-1}$.",
        ans: "$|A| = 1\\cdot 5 - 2\\cdot 3 = -1$. Hence $A^{-1} = \\frac{1}{-1}\\begin{bmatrix} 5 & -2 \\\\ -3 & 1 \\end{bmatrix} = \\begin{bmatrix} -5 & 2 \\\\ 3 & -1 \\end{bmatrix}$.",
      },
    ],
    kcet: [
      {
        level: "Easy",
        q: "If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$, find $|A|$.",
        options: ["-2", "2", "10", "4"],
        correct: 0,
        explanation: "For a $2 \\times 2$ matrix, $|A| = ad - bc = (1)(4) - (2)(3) = -2$.",
      },
      {
        level: "Easy",
        q: "Which of the following is a scalar matrix?",
        options: [
          "$\\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix}$",
          "$\\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$",
          "$\\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$",
          "$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$",
        ],
        correct: 1,
        explanation: "A scalar matrix is a diagonal matrix with all diagonal entries equal. Only $\\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$ fits.",
      },
      {
        level: "Medium",
        q: "For a 3x3 matrix $A$, if $|A| = 0$, which statement is correct?",
        options: [
          "$A^{-1}$ exists",
          "System $AX=B$ trivially has a unique solution",
          "$A$ is singular",
          "$A$ is an identity matrix",
        ],
        correct: 2,
        explanation: "A zero determinant means the matrix is singular, so it is not invertible.",
      },
      {
        level: "Medium",
        q: "If $A = \\text{diag}[2, -1, 3]$ and $B = \\text{diag}[-1, 3, 2]$, find $A^2 B$.",
        options: [
          "$\\text{diag}[-4, 3, 18]$",
          "$\\text{diag}[4, 1, 9]$",
          "$\\text{diag}[-2, -3, 6]$",
          "$\\text{diag}[8, 9, 12]$",
        ],
        correct: 0,
        explanation: "First square $A$: $A^2 = \\text{diag}[4, 1, 9]$. Then multiply diagonal entries with $B$ to get $\\text{diag}[-4, 3, 18]$.",
      },
    ],
  },
  tricks: [
    { title: "Type Ladder", content: "Identity matrix is a scalar matrix, and every scalar matrix is a diagonal matrix." },
    { title: "2x2 Inverse Trigger", content: "For $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, first check $ad-bc \\neq 0$ before computing $A^{-1}$." },
    { title: "Transpose Check", content: "A matrix is symmetric exactly when it matches its transpose entry by entry." },
    { title: "Diagonal Shortcut", content: "For diagonal matrices, operations often reduce to working only with diagonal entries." },
  ],
  strategy: [
    {
      exam: "Board Level Strategy",
      points: [
        "Start with definitions and one-mark distinctions: diagonal, scalar, identity, transpose, and inverse.",
        "For board answers, write the condition first and then the worked step cleanly.",
        "Practice one full 2x2 inverse question and one short conceptual difference question.",
      ],
    },
    {
      exam: "KCET Strategy",
      points: [
        "Prioritize recognition-based MCQs on matrix type, transpose, and inverse existence.",
        "Use elimination fast when only one option matches the definition of scalar or symmetric matrix.",
        "For direct computation, aim to finish each matrix question in one clean pass.",
      ],
    },
  ],
  revisionPlan: [
    { phase: "Days 1-3", focus: "Definitions, types of matrices, and matrix order practice." },
    { phase: "Days 4-6", focus: "Operations, transpose, and simple property-based questions." },
    { phase: "Days 7-9", focus: "Inverse of matrices and determinant condition for invertibility." },
    { phase: "Days 10-12", focus: "Board answers first, then KCET timed MCQ drills." },
    { phase: "Days 13-14", focus: "Quick recap of mistakes and final mixed revision." },
  ],
};
