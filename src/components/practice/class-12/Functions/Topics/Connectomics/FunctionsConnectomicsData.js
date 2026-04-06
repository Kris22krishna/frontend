export const functionsConnectomicsData = {
  conceptMap: {
    nodes: [
      { id: "relation", label: "Relation", icon: "REL", color: "#6366f1" },
      { id: "function", label: "Function", icon: "f(x)", color: "#0891b2" },
      { id: "graph", label: "Graphs", icon: "XY", color: "#f59e0b" },
      { id: "calculus", label: "Calculus", icon: "dy", color: "#ec4899" },
      { id: "modeling", label: "Real Models", icon: "MOD", color: "#10b981" },
      { id: "code", label: "Computation", icon: "CS", color: "#06b6d4" },
      { id: "domain", label: "Domain and Range", icon: "DR", color: "#7c3aed" },
    ],
    links: [
      {
        from: "relation",
        to: "function",
        tooltip:
          "A function is a special kind of relation where each input is assigned exactly one output.",
      },
      {
        from: "function",
        to: "domain",
        tooltip:
          "Once a rule is known, domain and range describe which inputs are allowed and which outputs are produced.",
      },
      {
        from: "function",
        to: "graph",
        tooltip:
          "Graphs turn algebraic rules into visual behavior, making growth, turning points, and restrictions easier to see.",
      },
      {
        from: "graph",
        to: "calculus",
        tooltip:
          "Calculus studies how functions change, so graphs and function rules become the starting point for limits and derivatives.",
      },
      {
        from: "function",
        to: "modeling",
        tooltip:
          "Many real situations like cost, distance, and temperature are modeled as input-output functions.",
      },
      {
        from: "function",
        to: "code",
        tooltip:
          "Programming functions and computational pipelines follow the same idea of feeding inputs and returning outputs.",
      },
    ],
  },
  topicBreakdown: [
    {
      id: "A",
      title: "Functions Grow Out of Relations",
      concepts:
        "The chapter begins with relations, but functions add the stricter one-output rule that makes algebra and calculus predictable.",
    },
    {
      id: "B",
      title: "Functions Become Graphs",
      concepts:
        "Each function can be visualized on the coordinate plane, letting us read intercepts, trends, and restrictions directly.",
    },
    {
      id: "C",
      title: "Functions Drive Calculus",
      concepts:
        "Limits, continuity, derivatives, and integrals all study how functions behave and change.",
    },
    {
      id: "D",
      title: "Functions Model the World",
      concepts:
        "Pricing, population, motion, and engineering systems often become solvable once written as functions.",
    },
  ],
  misconceptions: [
    {
      statement: '"If outputs repeat, it is not a function"',
      truth:
        "False. Repeated outputs are allowed. Only repeated inputs with different outputs break the function rule.",
    },
    {
      statement: '"Domain is always all real numbers"',
      truth:
        "False. Denominator zeros and root restrictions often remove values from the domain.",
    },
    {
      statement: '"Range and codomain are the same thing"',
      truth:
        "False. The codomain is the target set, while the range is the set of outputs actually obtained.",
    },
  ],
};
