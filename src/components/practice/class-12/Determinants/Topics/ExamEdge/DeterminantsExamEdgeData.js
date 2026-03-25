export const determinantsExamEdgeData = {
  highYield: [
    {
      category: "Board Level Focus",
      topics: [
        "2x2 and 3x3 determinant evaluation",
        "Properties of determinants and row operations",
        "Minors, cofactors, adjoint, and inverse linkage",
        "Area of triangle, collinearity, and short board-format reasoning",
      ],
    },
  ],
  questions: {
    board: [
      {
        level: "Easy",
        q: "State the effect on a determinant when two rows are interchanged.",
        ans: "Interchanging any two rows changes the sign of the determinant.",
      },
      {
        level: "Medium",
        q: "Find the determinant of $\\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix}$.",
        ans: "For a $2 \\times 2$ matrix, $|A| = ad-bc = (2)(4) - (3)(1) = 5$.",
      },
      {
        level: "Medium",
        q: "Find the area of the triangle formed by the line $x + y = 2$ and the coordinate axes.",
        ans: "First write the equation of the line in intercept form idea: the line $x + y = 2$ meets the x-axis at $(2,0)$ and the y-axis at $(0,2)$. So the triangle is formed by $(0,0)$, $(2,0)$, and $(0,2)$. Now apply the determinant area formula: $\\text{Area} = \\frac{1}{2}\\left|\\begin{vmatrix} 0 & 0 & 1 \\\\ 2 & 0 & 1 \\\\ 0 & 2 & 1 \\end{vmatrix}\\right| = \\frac{1}{2}|4| = 2$ square units.",
      },
      {
        level: "Medium",
        q: "How do determinants help decide whether a square matrix is invertible?",
        ans: "A square matrix is invertible exactly when its determinant is non-zero. If the determinant is zero, the matrix is singular and has no inverse.",
      },
    ],
  },
  tricks: [
    { title: "Zero Row First", content: "Expand along the row or column with the most zeros to cut work immediately." },
    { title: "2x2 Shortcut", content: "For $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, remember main diagonal minus cross diagonal." },
    { title: "Sign Pattern", content: "Use the cofactor sign grid $+,-,+ / -,+,- / +,-,+$." },
    { title: "Line Before Formula", content: "For geometry applications, identify the line and intercept points first, then apply the determinant area formula." },
  ],
  strategy: [
    {
      exam: "Board Level Strategy",
      points: [
        "Write the determinant property in words first, then use it in the calculation.",
        "For geometry questions, identify the points from the line equation before substituting into the area formula.",
        "Keep board answers stepwise: property, substitution, simplification, final statement.",
      ],
    },
  ],
  revisionPlan: [
    { phase: "Days 1-3", focus: "2x2 and 3x3 determinant basics plus quick simplification." },
    { phase: "Days 4-6", focus: "Properties, row operations, minors, and cofactors." },
    { phase: "Days 7-9", focus: "Adjoint, inverse, and determinant-based reasoning." },
    { phase: "Days 10-12", focus: "Area of triangle, collinearity, and board-answer presentation." },
    { phase: "Days 13-14", focus: "Final board-level mixed revision." },
  ],
};
