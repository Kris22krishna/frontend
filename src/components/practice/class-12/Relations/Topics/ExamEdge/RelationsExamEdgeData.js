export const relationsExamEdgeData = {
  highYield: [
    {
      category: "Board Level Focus",
      topics: [
        "Cartesian product and counting ordered pairs",
        "Domain and range from a relation",
        "Reflexive, symmetric, and transitive property checks",
        "Equivalence relation reasoning with examples and counterexamples",
      ],
    },
  ],
  questions: {
    board: [
      {
        level: "Easy",
        q: "Define a relation from set $A$ to set $B$.",
        ans: "A relation from $A$ to $B$ is any subset of the Cartesian product $A \\times B$.",
      },
      {
        level: "Medium",
        q: "If $A=\\{1,2,3\\}$ and $R=\\{(1,1),(2,2),(3,3),(1,2),(2,1)\\}$, test whether $R$ is reflexive and symmetric.",
        ans: "The relation is reflexive because $(1,1)$, $(2,2)$, and $(3,3)$ are all present. It is also symmetric because whenever $(1,2)$ is present, the reverse pair $(2,1)$ is also present. So $R$ is both reflexive and symmetric.",
      },
      {
        level: "Medium",
        q: "Give one example of a transitive relation from daily life and explain why it is transitive.",
        ans: "A good real-life example is 'is an ancestor of'. If A is an ancestor of B and B is an ancestor of C, then A is also an ancestor of C. So the relation is transitive because the shortcut relation always follows from the two-step chain.",
      },
      {
        level: "Medium",
        q: "What is an equivalence relation? Give one standard example.",
        ans: "An equivalence relation is a relation that is reflexive, symmetric, and transitive. Equality on any set is a standard example because every element equals itself, equality works both ways, and equality carries through chains.",
      },
    ],
  },
  tricks: [
    { title: "Diagonal Check", content: "For reflexive relations, inspect every diagonal pair $(x,x)$ first." },
    { title: "Reverse Pair Test", content: "For symmetry, each $(x,y)$ needs its matching $(y,x)$." },
    { title: "Chain Test", content: "For transitivity, search for two-step chains and verify the shortcut pair." },
    { title: "Board Answer Flow", content: "Name the property, test the required pairs, and end with a clear conclusion sentence." },
  ],
  strategy: [
    {
      exam: "Board Level Strategy",
      points: [
        "Use small sets and explicit pair checks when explaining reflexive, symmetric, and transitive properties.",
        "Prefer intuitive examples for symmetry and real-life chain examples for transitivity.",
        "In board answers, write the definition first and then verify it using the given pairs.",
      ],
    },
  ],
  revisionPlan: [
    { phase: "Days 1-3", focus: "Ordered pairs, Cartesian product, domain, and range." },
    { phase: "Days 4-6", focus: "Reflexive and symmetric relations with simple set examples." },
    { phase: "Days 7-9", focus: "Transitive relations and equivalence relation tests." },
    { phase: "Days 10-12", focus: "Board-format short answers and mixed property questions." },
    { phase: "Days 13-14", focus: "Final concept recap with example-based revision." },
  ],
};
