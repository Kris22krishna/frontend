export const functionsExamEdgeData = {
  highYield: [
    {
      category: "Board Level Focus",
      topics: [
        "Definition of a function and checking whether a relation is a function",
        "Domain, codomain, and range from explicit relations or formulas",
        "Identity, constant, polynomial, rational, modulus, and greatest integer functions",
        "Algebra of functions and quotient restrictions",
        "Advanced domain and range with roots and rational expressions",
      ],
    },
  ],
  questions: {
    board: [
      {
        level: "Easy",
        q: "State the condition for a relation to be a function.",
        ans: "A relation is a function if every input has exactly one output.",
      },
      {
        level: "Medium",
        q: "Why is $R=\\{(2,3),(2,5),(4,6)\\}$ not a function?",
        ans: "It is not a function because the input $2$ is assigned two different outputs, $3$ and $5$.",
      },
      {
        level: "Medium",
        q: "Find the domain of $f(x)=\\frac{x}{x^2+3x+2}$.",
        ans: "Factor the denominator: $x^2+3x+2=(x+1)(x+2)$. So the domain is all real numbers except $x=-1,-2$.",
      },
      {
        level: "Medium",
        q: "Find the range of $f(x)=\\sqrt{16-x^2}$.",
        ans: "The square root is always non-negative and reaches a maximum of 4 when $x=0$. So the range is $[0,4]$.",
      },
      {
        level: "Medium",
        q: "Write one real-life example each of an identity function and a constant function.",
        ans: "Identity: a mirror-like unchanged copy where output equals input. Constant: a flat delivery charge that stays the same for every order.",
      },
    ],
  },
  tricks: [
    {
      title: "Input Check",
      content: "To test if a relation is a function, scan repeated first coordinates before doing anything else.",
    },
    {
      title: "Denominator Rule",
      content: "For rational functions and quotients, write the forbidden denominator values beside the answer.",
    },
    {
      title: "Root Rule",
      content: "A square root in the numerator needs non-negative input; in the denominator it needs strictly positive input.",
    },
    {
      title: "Type First",
      content: "If you identify the function family early, domain and range often become almost immediate.",
    },
  ],
  strategy: [
    {
      exam: "Board Level Strategy",
      points: [
        "Start definition-based questions with the precise one-output rule before checking examples.",
        "In domain problems, show the restriction step explicitly instead of jumping to the answer.",
        "For range problems, mention why outputs are bounded above, below, or both.",
      ],
    },
  ],
  revisionPlan: [
    { phase: "Days 1-2", focus: "Definition of function, relation check, and basic domain-range." },
    { phase: "Days 3-5", focus: "Identity, constant, polynomial, rational, modulus, and greatest integer functions." },
    { phase: "Days 6-8", focus: "Addition, subtraction, multiplication, quotient, and scalar multiplication." },
    { phase: "Days 9-11", focus: "Function equations and substitution-based evaluation questions." },
    { phase: "Days 12-14", focus: "Advanced domain-range revision and mixed board-style practice." },
  ],
};
