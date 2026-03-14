export const determinantsConnectomicsData = {
  conceptMap: {
    nodes: [
      { id: "determinant", label: "Determinant", icon: "🔢", color: "#6366f1" },
      { id: "matrix", label: "Matrix", icon: "🧮", color: "#0891b2" },
      { id: "inverse", label: "Inverse", icon: "🔁", color: "#10b981" },
      { id: "geometry", label: "Geometry", icon: "📐", color: "#f59e0b" },
      { id: "systems", label: "Linear Systems", icon: "⚖️", color: "#ef4444" },
      { id: "transform", label: "Transformations", icon: "🌐", color: "#06b6d4" },
    ],
    links: [
      {
        from: "matrix",
        to: "determinant",
        tooltip:
          "Determinants are defined for square matrices and summarize key information about them in one scalar value.",
      },
      {
        from: "determinant",
        to: "inverse",
        tooltip:
          "A non-zero determinant tells us immediately that the matrix is invertible.",
      },
      {
        from: "determinant",
        to: "systems",
        tooltip:
          "Determinants power Cramer's rule and help classify systems as unique, inconsistent, or dependent.",
      },
      {
        from: "determinant",
        to: "geometry",
        tooltip:
          "The absolute value of a determinant measures area in 2D and volume scaling in higher dimensions.",
      },
      {
        from: "geometry",
        to: "transform",
        tooltip:
          "A determinant also tracks orientation and scaling under linear transformations.",
      },
    ],
  },
  topicBreakdown: [
    {
      id: "A",
      title: "Invertibility Check",
      concepts:
        "Determinants act like a quick gatekeeper: if the value is zero, inverse methods stop immediately.",
    },
    {
      id: "B",
      title: "Area and Collinearity",
      concepts:
        "Coordinate geometry uses determinants to compute triangle area and test whether points lie on the same line.",
    },
    {
      id: "C",
      title: "System Solving",
      concepts:
        "Determinants connect algebraic equations to structured matrix methods like Cramer's rule.",
    },
    {
      id: "D",
      title: "Transformations",
      concepts:
        "In graphics and physics, determinants describe stretching, shrinking, and orientation change.",
    },
  ],
  misconceptions: [
    {
      statement: '"Every matrix has a determinant"',
      truth:
        "False. Only square matrices have determinants.",
    },
    {
      statement: '"Negative determinant means impossible"',
      truth:
        "False. A negative determinant is valid and usually indicates orientation reversal.",
    },
    {
      statement: '"If determinant is zero, the system always has no solution"',
      truth:
        "False. It may have no solution or infinitely many solutions depending on the system.",
    },
  ],
};
