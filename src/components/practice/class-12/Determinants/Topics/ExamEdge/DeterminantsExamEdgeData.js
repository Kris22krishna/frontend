export const determinantsExamEdgeData = {
  highYield: [
    {
      category: "Core Essentials (Both Exams)",
      topics: [
        "2x2 and 3x3 determinant evaluation",
        "Properties of determinants and row operations",
        "Minors, cofactors, adjoint and inverse",
        "Area, collinearity, and Cramer's rule",
      ],
    },
    {
      category: "KCET Specific Focus",
      topics: [
        "Direct determinant evaluation",
        "Quick inverse existence checks",
        "Formula-based area and collinearity questions",
      ],
    },
    {
      category: "JEE Specific Focus",
      topics: [
        "Multi-step determinant simplification",
        "Proof-heavy cofactor and adjoint reasoning",
        "Systems of equations through matrix methods",
      ],
    },
  ],
  questions: {
    kcet: [
      {
        level: "Easy",
        q: "If $A = \\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix}$, then $|A|$ is",
        options: ["$5$", "$8$", "$11$", "$-5$"],
        correct: 0,
        explanation: "For a $2 \\times 2$ matrix, $|A| = ad - bc = (2)(4) - (3)(1) = 5$.",
      },
      {
        level: "Easy",
        q: "A square matrix is invertible when",
        options: ["$|A|=0$", "$|A|\\neq 0$", "$A$ is symmetric", "$A$ is diagonal"],
        correct: 1,
        explanation: "A square matrix has an inverse exactly when its determinant is non-zero.",
      },
      {
        level: "Medium",
        q: "If two rows of a determinant are identical, its value is",
        options: ["$1$", "$-1$", "$0$", "undefined"],
        correct: 2,
        explanation: "Equal rows make the determinant zero because the rows are linearly dependent.",
      },
      {
        level: "Medium",
        q: "Three points are collinear when the area of the triangle formed by them is",
        options: ["$1$", "$2$", "$0$", "$-1$"],
        correct: 2,
        explanation: "Collinear points form no triangle, so the enclosed area is $0$.",
      },
    ],
    jee: [
      {
        level: "Medium",
        q: "If $|A| = 3$ and $|B| = -2$, then $|AB|$ equals",
        options: ["$-6$", "$6$", "$1$", "$-1$"],
        correct: 0,
        explanation: "Use $|AB| = |A||B| = 3 \\times (-2) = -6$.",
      },
      {
        level: "Easy",
        q: "The cofactor of $a_{ij}$ is",
        options: ["$M_{ij}$", "$(-1)^{i+j}M_{ij}$", "$(-1)^{ij}M_{ij}$", "$A_{ji}$"],
        correct: 1,
        explanation: "A cofactor is the corresponding minor multiplied by the sign factor $(-1)^{i+j}$.",
      },
      {
        level: "Medium",
        q: "For a $3 \\times 3$ matrix, if one row is multiplied by 5, the determinant becomes",
        options: ["$5|A|$", "$15|A|$", "$25|A|$", "$125|A|$"],
        correct: 0,
        explanation: "Scaling one row by 5 scales the entire determinant by the same factor 5.",
      },
      {
        level: "Hard",
        q: "If $|A| = 0$, then the system $AX=B$",
        options: [
          "always has no solution",
          "always has a unique solution",
          "may have none or infinitely many solutions",
          "always has infinitely many solutions",
        ],
        correct: 2,
        explanation: "When $|A| = 0$, the coefficient matrix is singular, so a unique solution is impossible. Depending on consistency, there may be no solution or infinitely many.",
      },
    ],
    jeeAdvanced: [
      {
        q: "Explain why swapping two rows changes the sign of a determinant.",
        ans: "A determinant is alternating in its rows. Swapping two rows reverses orientation, so the value changes sign.",
      },
      {
        q: "Show how determinants detect whether a matrix is invertible.",
        ans: "A matrix is invertible exactly when its determinant is non-zero, because the inverse formula divides by the determinant.",
      },
      {
        q: "Why does a zero determinant correspond to zero area scaling?",
        ans: "A zero determinant means the transformation collapses area or volume into a lower dimension, so the scale factor is zero.",
      },
    ],
  },
  tricks: [
    { title: "Zero Row First", content: "Expand along the row or column with the most zeros to cut work immediately." },
    { title: "2x2 Shortcut", content: "For $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, remember main diagonal minus cross diagonal." },
    { title: "Checkerboard Signs", content: "Use the cofactor sign grid $+,-,+ / -,+,- / +,-,+$." },
    { title: "Invertibility Rule", content: "Before inverse questions, check $|A| \\neq 0$ first." },
  ],
  strategy: [
    {
      exam: "KCET Strategy",
      points: [
        "Prioritize direct computation and formula questions first.",
        "Memorize common determinant properties to save time.",
        "Use elimination when options are numerically far apart.",
      ],
    },
    {
      exam: "JEE Strategy",
      points: [
        "Expect determinants to combine with matrices and system-solving in one problem.",
        "Stay organized with row operations and sign changes.",
        "Choose the fastest expansion route, not the most obvious one.",
      ],
    },
  ],
  revisionPlan: [
    { phase: "Days 1-3", focus: "2x2 and 3x3 determinant basics plus shortcut expansions." },
    { phase: "Days 4-6", focus: "Properties, row operations, and minors-cofactors." },
    { phase: "Days 7-9", focus: "Adjoint, inverse, and determinant-based system solving." },
    { phase: "Days 10-12", focus: "Geometry applications, Cramer's rule, and timed drills." },
    { phase: "Days 13-14", focus: "Mistake review and last-round mixed practice." },
  ],
};
