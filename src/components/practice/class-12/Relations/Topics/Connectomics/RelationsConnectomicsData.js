export const relationsConnectomicsData = {
  conceptMap: {
    nodes: [
      { id: "relation", label: "Relation", icon: "🔗", color: "#6366f1" },
      { id: "cartesian", label: "Cartesian Product", icon: "✖️", color: "#0891b2" },
      { id: "function", label: "Function", icon: "🎯", color: "#f59e0b" },
      { id: "graph", label: "Graph Theory", icon: "🕸️", color: "#ec4899" },
      { id: "logic", label: "Logic and Proof", icon: "🧠", color: "#10b981" },
      { id: "database", label: "Databases", icon: "💾", color: "#06b6d4" },
      { id: "equivalence", label: "Equivalence Classes", icon: "👑", color: "#7c3aed" },
    ],
    links: [
      {
        from: "cartesian",
        to: "relation",
        tooltip:
          "A relation is always a subset of a Cartesian product, so pair-building comes first.",
      },
      {
        from: "relation",
        to: "function",
        tooltip:
          "A function is a special relation where each input has exactly one output.",
      },
      {
        from: "relation",
        to: "graph",
        tooltip:
          "Every relation can be visualized as arrows between nodes in a graph or digraph.",
      },
      {
        from: "relation",
        to: "logic",
        tooltip:
          "Reflexive, symmetric, and transitive properties are tested through logical implications.",
      },
      {
        from: "logic",
        to: "equivalence",
        tooltip:
          "When all three key properties hold, the relation creates equivalence classes.",
      },
      {
        from: "relation",
        to: "database",
        tooltip:
          "Tables in relational databases model data through structured relationships between attributes.",
      },
    ],
  },
  topicBreakdown: [
    {
      id: "A",
      title: "Functions Grow Out of Relations",
      concepts:
        "Every function is a relation, but a function adds the one-output rule to each input.",
    },
    {
      id: "B",
      title: "Relations Become Graphs",
      concepts:
        "Ordered pairs can be drawn as arrows, making graph theory a natural visual language for relations.",
    },
    {
      id: "C",
      title: "Relations Organize Algebra",
      concepts:
        "Equivalence relations partition sets into classes, which is central to modular arithmetic and abstract algebra.",
    },
    {
      id: "D",
      title: "Relations Power Databases",
      concepts:
        "Rows, columns, keys, and joins in databases are built around mathematical relationships.",
    },
  ],
  misconceptions: [
    {
      statement: '"Every relation is a function"',
      truth:
        "False. A relation may assign multiple outputs to the same input, which breaks the function rule.",
    },
    {
      statement: '"Domain and range must equal the full two sets"',
      truth:
        "False. They are only the coordinates that actually appear in the relation.",
    },
    {
      statement: '"Symmetric and transitive mean the same thing"',
      truth:
        "False. Symmetric reverses pairs, while transitive completes chains.",
    },
  ],
};
