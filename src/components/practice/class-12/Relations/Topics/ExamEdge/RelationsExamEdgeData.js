export const relationsExamEdgeData = {
  highYield: [
    {
      category: "Core Essentials (Both Exams)",
      topics: [
        "Cartesian product and counting ordered pairs",
        "Domain and range from a relation",
        "Total number of relations and reflexive relation counts",
        "Testing reflexive, symmetric, and transitive properties",
      ],
    },
    {
      category: "KCET Specific Focus",
      topics: [
        "Direct counting and identification questions",
        "Quick domain-range extraction from a set of ordered pairs",
        "Fast recognition of equivalence and anti-symmetric examples",
      ],
    },
    {
      category: "JEE Specific Focus",
      topics: [
        "Property proofs and counterexamples",
        "Relation-function distinction in multi-step problems",
        "Composition and inverse relation reasoning",
      ],
    },
  ],
  questions: {
    kcet: [
      {
        level: "Easy",
        q: "If $A=\\{1,2\\}$ and $B=\\{a,b,c\\}$, then $n(A \\times B)$ is",
        options: ["$5$", "$6$", "$2^3$", "$3$"],
        correct: 1,
        explanation: "The Cartesian product count is $n(A) \\times n(B) = 2 \\times 3 = 6$.",
      },
      {
        level: "Easy",
        q: "If $R=\\{(1,a),(2,b),(3,b)\\}$, then the range of $R$ is",
        options: ["$\\{1,2,3\\}$", "$\\{a,b\\}$", "$\\{(a,b)\\}$", "$\\{1,a,b\\}$"],
        correct: 1,
        explanation: "The range is the set of second components appearing in the relation, namely $\\{a,b\\}$.",
      },
      {
        level: "Medium",
        q: "Number of relations from a 2-element set to a 3-element set is",
        options: ["$2^5$", "$2^6$", "$6$", "$12$"],
        correct: 1,
        explanation: "There are $2^{mn}$ relations from an $m$-element set to an $n$-element set, so here it is $2^{2\\times3} = 2^6$.",
      },
      {
        level: "Medium",
        q: "A relation is an equivalence relation if it is",
        options: [
          "reflexive only",
          "symmetric and transitive only",
          "reflexive, symmetric and transitive",
          "anti-symmetric and transitive",
        ],
        correct: 2,
        explanation: "Equivalence relations must satisfy all three properties together: reflexive, symmetric, and transitive.",
      },
    ],
    jee: [
      {
        level: "Easy",
        q: "If $A$ has 3 elements, the number of reflexive relations on $A$ is",
        options: ["$2^3$", "$2^6$", "$2^9$", "$3^2$"],
        correct: 1,
        explanation: "For a set with $n$ elements, the number of reflexive relations is $2^{n(n-1)}$. With $n=3$, that becomes $2^6$.",
      },
      {
        level: "Medium",
        q: "If $R=\\{(1,2),(2,3),(1,3)\\}$ on $A=\\{1,2,3\\}$, then $R$ is",
        options: [
          "transitive but not reflexive",
          "reflexive only",
          "symmetric only",
          "equivalence relation",
        ],
        correct: 0,
        explanation: "The only possible two-step chain is $(1,2)$ and $(2,3)$, and $(1,3)$ is present, so the relation is transitive. It is not reflexive because $(1,1)$, $(2,2)$, and $(3,3)$ are missing.",
      },
      {
        level: "Medium",
        q: "The inverse of $R=\\{(1,a),(2,b)\\}$ is",
        options: [
          "$\\{(a,1),(b,2)\\}$",
          "$\\{(1,a),(2,b)\\}$",
          "$\\{(1,2),(a,b)\\}$",
          "$\\emptyset$",
        ],
        correct: 0,
        explanation: "The inverse relation reverses each ordered pair, so $(1,a)$ becomes $(a,1)$ and $(2,b)$ becomes $(b,2)$.",
      },
      {
        level: "Easy",
        q: "Every function from $A$ to $B$ is",
        options: ["a relation", "an equivalence relation", "symmetric", "transitive"],
        correct: 0,
        explanation: "A function is a special kind of relation with the extra rule that each input has exactly one output.",
      },
      {
        level: "Hard",
        q: "If $A$ has $n$ elements, then the number of anti-reflexive relations on $A$ is",
        options: ["$2^{n^2}$", "$2^{n(n-1)}$", "$2^n$", "$n^2$"],
        correct: 1,
        explanation: "Anti-reflexive relations cannot include any diagonal pair $(x,x)$, leaving $n(n-1)$ off-diagonal positions that may be chosen freely.",
      },
    ],
    jeeAdvanced: [
      {
        q: "Show that the relation $R$ on integers defined by $aRb \\iff a-b$ is divisible by 5 is an equivalence relation.",
        ans: "It is reflexive, symmetric, and transitive because divisibility by 5 is preserved under zero, sign change, and addition.",
      },
      {
        q: "If $A=\\{1,2,3\\}$, construct a relation that is symmetric and transitive but not reflexive.",
        ans: "One example is $\\{(1,1),(2,2)\\}$. It is symmetric and transitive, but misses $(3,3)$ so it is not reflexive.",
      },
      {
        q: "Explain why every function is a relation, but not every relation is a function.",
        ans: "A function is a subset of a Cartesian product with the extra rule that each input has exactly one output. Relations do not need that restriction.",
      },
    ],
  },
  tricks: [
    { title: "Count First", content: "Find $n(A \\times B)$ first. Then subset-counting gives the number of relations." },
    { title: "Diagonal Check", content: "For reflexive relations, inspect every diagonal pair $(x,x)$ before anything else." },
    { title: "Reverse Pair Test", content: "For symmetry, each $(x,y)$ needs its matching $(y,x)$." },
    { title: "Chain Test", content: "For transitivity, look for two-step chains and verify the shortcut pair." },
  ],
  strategy: [
    {
      exam: "KCET Strategy",
      points: [
        "Prioritize direct counting, domain-range, and identification questions first.",
        "Memorize the formulas $2^{mn}$ and $2^{n(n-1)}$ for quick wins.",
        "Use elimination aggressively for property-based MCQs.",
      ],
    },
    {
      exam: "JEE Strategy",
      points: [
        "Expect property checks to hide inside proofs and examples.",
        "Write tiny counterexamples fast when a property fails.",
        "Be very strict about the difference between relation, function, and equivalence relation.",
      ],
    },
  ],
  revisionPlan: [
    { phase: "Days 1-3", focus: "Cartesian product, ordered pairs, domain and range drills." },
    { phase: "Days 4-6", focus: "Counting formulas, inverse relations, identity and universal relations." },
    { phase: "Days 7-9", focus: "Reflexive, symmetric, transitive tests with mixed examples." },
    { phase: "Days 10-12", focus: "Timed MCQs and proof-style questions." },
    { phase: "Days 13-14", focus: "Mistake log revision and quick property review." },
  ],
};
