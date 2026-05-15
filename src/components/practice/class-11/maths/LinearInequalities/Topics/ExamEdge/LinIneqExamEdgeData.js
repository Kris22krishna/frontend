export const LI_EXAM_DATA = {
  cet: {
    label: "CET",
    icon: "⚡",
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2 0%, #0369a1 100%)",
    tagline: "Speed + Direct Application",
    weightage: "2–4 Marks",
    freq: "Every Year",
    importantTopics: [
      { text: "Solving one-variable linear inequalities (ax + b < c)", hot: true },
      { text: "Number line representation — open vs closed circles", hot: true },
      { text: "Interval notation: $(a, b]$, $(-\\infty, b)$, etc.", hot: false },
      { text: "Sign flip rule: dividing by a negative", hot: true },
      { text: "Compound inequalities: $a < bx + c < d$", hot: false },
      { text: "Graphical solution — identifying correct half-plane", hot: false }
    ],
    traps: [
      { trap: "Forgetting to flip the inequality when dividing by negative", correction: "Always flip: if $-2x > 6$ then $x < -3$" },
      { trap: "Using closed circle for strict inequality on number line", correction: "Strict $<$ or $>$: open circle ○. Non-strict $\\leq$ or $\\geq$: filled circle ●" },
      { trap: "Treating interval notation brackets incorrectly", correction: "Square bracket $[$ = endpoint included (≤ or ≥). Round bracket $($ = excluded (< or >)" },
      { trap: "Adding inequalities in opposite directions", correction: "Only add inequalities pointing the SAME direction ($a < b$ and $c < d \\Rightarrow a+c < b+d$)" }
    ],
    pyqs: [
      {
        question: "Solve $3x - 4 \\leq 8$. The solution set is:",
        options: ["$x \\leq 4$", "$x \\geq 4$", "$x < 4$", "$x \\leq -4$"],
        correct: 0,
        explanation: "$3x \\leq 12 \\Rightarrow x \\leq 4$. In interval notation: $(-\\infty, 4]$."
      },
      {
        question: "Solve $-2x + 1 > 5$. Answer is:",
        options: ["$x < -2$", "$x > -2$", "$x < 2$", "$x > 2$"],
        correct: 0,
        explanation: "$-2x > 4 \\Rightarrow x < -2$ (divide by $-2$, flip sign!)."
      },
      {
        question: "In interval notation, $x > 7$ is written as:",
        options: ["$(7, \\infty)$", "$[7, \\infty)$", "$(-\\infty, 7)$", "$(-\\infty, 7]$"],
        correct: 0,
        explanation: "Strict $>$ means open bracket at $7$. Infinity always open: $(7, \\infty)$."
      },
      {
        question: "The number of integer solutions of $-3 \\leq 2x - 1 < 5$ is:",
        options: ["$4$", "$3$", "$5$", "$2$"],
        correct: 0,
        explanation: "Add 1: $-2 \\leq 2x < 6$. Divide by 2: $-1 \\leq x < 3$. Integers: $-1, 0, 1, 2$ — that is 4."
      },
      {
        question: "Which symbol denotes a boundary included in the solution?",
        options: ["$\\leq$ or $\\geq$", "$<$ or $>$", "$\\neq$", "$=$"],
        correct: 0,
        explanation: "Non-strict inequalities ($\\leq$, $\\geq$) include the boundary (closed circle / square bracket)."
      }
    ]
  },

  jeeMains: {
    label: "JEE Mains",
    icon: "🎯",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    tagline: "Computation + Concept",
    weightage: "4–8 Marks (1–2 Qs)",
    freq: "High Frequency",
    importantTopics: [
      { text: "System of linear inequalities — finding feasible region", hot: true },
      { text: "Corner points of feasible region (intersection of boundary lines)", hot: true },
      { text: "Inequalities combined with number of solutions / integers", hot: true },
      { text: "Inequalities involving absolute values: $|x - a| \\leq b$", hot: false },
      { text: "Inequalities in two variables: graphical solution", hot: false },
      { text: "Connection to linear programming objective functions", hot: false }
    ],
    traps: [
      { trap: "Not checking ALL constraints when finding feasible region", correction: "A point must satisfy EVERY inequality in the system — check all of them." },
      { trap: "Confusing union vs intersection of solution sets", correction: "'OR' problems → union (either region). 'AND' problems → intersection (overlap)." },
      { trap: "Forgetting the non-negativity constraints $x \\geq 0$, $y \\geq 0$", correction: "In most LP and feasibility problems, always include $x \\geq 0$, $y \\geq 0$ unless stated otherwise." },
      { trap: "Evaluating linear objective at interior point instead of corner", correction: "In LP, the optimum always occurs at a CORNER (vertex) of the feasible region — never inside." }
    ],
    pyqs: [
      {
        question: "The solution of $|x - 3| \\leq 4$ is:",
        options: ["$-1 \\leq x \\leq 7$", "$x \\leq -1$ or $x \\geq 7$", "$-4 \\leq x \\leq 4$", "$x \\leq 7$"],
        correct: 0,
        explanation: "$|x - 3| \\leq 4 \\Rightarrow -4 \\leq x-3 \\leq 4 \\Rightarrow -1 \\leq x \\leq 7$."
      },
      {
        question: "The number of integers satisfying $x^2 - 5x + 6 \\leq 0$ is:",
        options: ["$3$ integers: $2, 3, 4$ ... but wait — solve $(x-2)(x-3) \\leq 0$", "Treat as $2 \\leq x \\leq 3$: only integers $2$ and $3$ — that is 2", "$2$ (integers 2 and 3)", "$0$"],
        correct: 2,
        explanation: "$(x-2)(x-3) \\leq 0 \\Rightarrow 2 \\leq x \\leq 3$. Integer solutions: $x = 2$ and $x = 3$ — that is 2 integers."
      },
      {
        question: "The corner point of the feasible region of $x+y\\leq6$, $2x+y\\leq8$, $x\\geq0$, $y\\geq0$ other than the origin is:",
        options: ["$(2, 4)$", "$(4, 2)$", "$(3, 3)$", "$(0, 6)$, $(4, 0)$, $(2, 4)$"],
        correct: 3,
        explanation: "Vertices: $(0,0)$, $(4,0)$ (from $2x+y=8$, $y=0$), $(2,4)$ (intersection of $x+y=6$ and $2x+y=8$), $(0,6)$ (from $x+y=6$, $x=0$)."
      },
      {
        question: "The region represented by $|x| + |y| \\leq 1$ is:",
        options: ["A square with vertices $(\\pm1, 0)$ and $(0, \\pm1)$", "A circle of radius 1", "A square with vertices $(\\pm1, \\pm1)$", "An unbounded region"],
        correct: 0,
        explanation: "$|x|+|y|\\leq1$ in different quadrants gives 4 lines forming a rhombus/diamond: $x+y\\leq1$, $-x+y\\leq1$, $x-y\\leq1$, $-x-y\\leq1$. This is a square rotated 45°."
      }
    ]
  },

  jeeAdvanced: {
    label: "JEE Advanced",
    icon: "🏅",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
    tagline: "Deep Reasoning + Multi-Concept",
    weightage: "Conceptual Foundation",
    freq: "Integrated with other topics",
    importantTopics: [
      { text: "Inequalities from AM-GM: $a^2 + b^2 \\geq 2ab$", hot: true },
      { text: "Combining inequalities with functions — domain analysis", hot: true },
      { text: "Systems with parameters — range of $k$ for feasibility", hot: true },
      { text: "Geometric interpretation of feasible regions", hot: false },
      { text: "Inequalities in sequences and series", hot: false },
      { text: "Absolute value inequalities: $|f(x)| \\leq g(x)$", hot: true }
    ],
    traps: [
      { trap: "Assuming $a > b \\Rightarrow a^2 > b^2$ always", correction: "Only true if $a, b > 0$. If $a = -5$, $b = 3$: $a < b$ but $a^2 = 25 > 9 = b^2$." },
      { trap: "Squaring both sides of an inequality without checking signs", correction: "You can only square both sides of $a < b$ if BOTH sides are non-negative." },
      { trap: "Missing parametric conditions for empty/non-empty feasible regions", correction: "Always find the range of parameter $k$ for which a solution exists. Use boundary analysis." },
      { trap: "Applying triangle inequality incorrectly: $|a + b| \\leq |a| + |b|$", correction: "Triangle inequality states $|a+b| \\leq |a| + |b|$ — equality when $ab \\geq 0$ (same sign or zero)." }
    ],
    pyqs: [
      {
        question: "If $x > 0$ and $y > 0$, prove that $\\frac{x}{y} + \\frac{y}{x} \\geq 2$.",
        type: "proof",
        keyPoints: ["Apply AM-GM: $(x/y + y/x)/2 \\geq \\sqrt{(x/y)(y/x)} = 1$", "So $x/y + y/x \\geq 2$", "Equality when $x/y = y/x$, i.e., $x = y$"]
      },
      {
        question: "For what values of $k$ does the system $x + y \\leq k$ and $x \\geq 2$, $y \\geq 3$ have a solution?",
        options: ["$k \\geq 5$", "$k > 5$", "$k \\leq 5$", "All $k$"],
        correct: 0,
        explanation: "The minimum value of $x + y$ in the feasible region of $x \\geq 2$, $y \\geq 3$ is $2 + 3 = 5$. For $x + y \\leq k$ to be compatible, we need $k \\geq 5$."
      },
      {
        question: "If $|x - 1| + |x - 3| \\geq 4$, then $x \\in$:",
        options: ["$(-\\infty, -1] \\cup [5, \\infty)$", "$[-1, 5]$", "$(-1, 5)$", "$(-\\infty, 1) \\cup (3, \\infty)$"],
        correct: 0,
        explanation: "Case analysis on intervals $(-\\infty,1)$, $[1,3]$, $(3,\\infty)$. On $[1,3]$: $|x-1|+|x-3| = 2 < 4$, not satisfied. Outside: $|x-1|+|x-3| \\geq 4$ gives $x \\leq -1$ or $x \\geq 5$."
      }
    ]
  }
};

export const FORMULA_SHEET = [
  {
    category: "Basic Properties",
    color: "#6366f1",
    formulas: [
      { name: "Addition Property", formula: "a > b \\Rightarrow a + c > b + c", note: "Adding any number to both sides preserves the inequality." },
      { name: "Subtraction Property", formula: "a > b \\Rightarrow a - c > b - c", note: "Subtracting any number preserves the direction." },
      { name: "Multiplication (positive)", formula: "a > b, c > 0 \\Rightarrow ac > bc", note: "Multiplying by a positive number — no flip." },
      { name: "Multiplication (negative)", formula: "a > b, c < 0 \\Rightarrow ac < bc", note: "Multiplying by a NEGATIVE — FLIP the sign!" },
      { name: "Transitive Property", formula: "a > b \\text{ and } b > c \\Rightarrow a > c", note: "The greater-than relationship is transitive." }
    ]
  },
  {
    category: "Absolute Value Inequalities",
    color: "#0891b2",
    formulas: [
      { name: "Less than", formula: "|x| < a \\Leftrightarrow -a < x < a \\quad (a > 0)", note: "The solution is an interval between $-a$ and $a$." },
      { name: "Greater than", formula: "|x| > a \\Leftrightarrow x < -a \\text{ or } x > a", note: "The solution is the union of two rays." },
      { name: "Less than or equal", formula: "|x| \\leq a \\Leftrightarrow -a \\leq x \\leq a", note: "Closed interval $[-a, a]$." },
      { name: "General form", formula: "|x - a| < b \\Leftrightarrow a - b < x < a + b", note: "Shift: centre at $a$, radius $b$." }
    ]
  },
  {
    category: "Interval Notation",
    color: "#f59e0b",
    formulas: [
      { name: "Open interval", formula: "(a, b) \\Leftrightarrow a < x < b", note: "Both endpoints excluded (strict inequalities)." },
      { name: "Closed interval", formula: "[a, b] \\Leftrightarrow a \\leq x \\leq b", note: "Both endpoints included (non-strict)." },
      { name: "Half-open (left)", formula: "[a, b) \\Leftrightarrow a \\leq x < b", note: "Left endpoint included, right excluded." },
      { name: "Half-open (right)", formula: "(a, b] \\Leftrightarrow a < x \\leq b", note: "Left excluded, right included." },
      { name: "Rays", formula: "[a, \\infty) \\Leftrightarrow x \\geq a; \\quad (-\\infty, b) \\Leftrightarrow x < b", note: "Infinity always uses open parenthesis." }
    ]
  },
  {
    category: "Two-Variable Inequalities",
    color: "#ec4899",
    formulas: [
      { name: "Boundary line", formula: "ax + by = c", note: "Dashed if strict ($<$/$>$); solid if non-strict ($\\leq$/$\\geq$)." },
      { name: "Half-plane (below)", formula: "ax + by < c: \\text{ shade region below line}", note: "Verify by substituting a test point." },
      { name: "Half-plane (above)", formula: "ax + by > c: \\text{ shade region above line}", note: "If test point satisfies, shade that side." },
      { name: "Non-negativity", formula: "x \\geq 0, \\; y \\geq 0: \\text{ first quadrant (Q1)}", note: "Standard constraints in LP problems." }
    ]
  },
  {
    category: "System of Inequalities",
    color: "#7c3aed",
    formulas: [
      { name: "Feasible region", formula: "\\text{Feasible region} = \\bigcap_{i} \\{(x,y) : a_i x + b_i y \\leq c_i\\}", note: "Intersection of all half-planes satisfying every constraint." },
      { name: "Corner point", formula: "\\text{Vertex} = \\text{intersection of two boundary lines}", note: "Solve the two equations simultaneously." },
      { name: "Empty feasible region", formula: "\\text{System inconsistent} \\Rightarrow \\text{no solution}", note: "Constraints contradict each other." }
    ]
  },
  {
    category: "Key Inequalities",
    color: "#10b981",
    formulas: [
      { name: "AM-GM Inequality", formula: "\\frac{a+b}{2} \\geq \\sqrt{ab} \\quad (a, b \\geq 0)", note: "Arithmetic mean ≥ Geometric mean. Equality when $a = b$." },
      { name: "Square non-negativity", formula: "(a - b)^2 \\geq 0 \\Rightarrow a^2 + b^2 \\geq 2ab", note: "Always true for all real $a$, $b$." },
      { name: "Triangle inequality", formula: "|a + b| \\leq |a| + |b|", note: "Equality when $ab \\geq 0$ (same sign or zero)." },
      { name: "Cauchy-Schwarz", formula: "(ac + bd)^2 \\leq (a^2 + b^2)(c^2 + d^2)", note: "Used in advanced inequality problems." }
    ]
  }
];
