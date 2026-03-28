export const inverseTrigonometricFunctionsExamEdgeData = {
  highYield: [
    {
      category: "Board Level Focus",
      topics: [
        "Need for domain restriction before defining inverse trig functions",
        "Principal value ranges of sin^-1 x, cos^-1 x, tan^-1 x, and cot^-1 x",
        "Direct values such as sin^-1(1/2), cos^-1(-1/2), tan^-1(1), and sec^-1(2)",
        "Composite expressions like sin^-1(sin x), cos^-1(cos x), and tan^-1(tan x)",
        "Key identities such as sin^-1 x + cos^-1 x = pi/2 and branch-based simplification",
      ],
    },
  ],
  questions: {
    board: [
      {
        level: "Easy",
        q: "Why does sin x not have an inverse over all real numbers?",
        ans: "Because sin x is periodic and repeats values, it is not one-one on R.",
      },
      {
        level: "Medium",
        q: "State the principal value range of cos^-1 x.",
        ans: "The principal value range of cos^-1 x is [0, pi].",
      },
      {
        level: "Medium",
        q: "Evaluate sin^-1(sin 3pi/4).",
        ans: "sin 3pi/4 = sqrt(2)/2, and the principal angle in [-pi/2, pi/2] with that sine is pi/4.",
      },
      {
        level: "Medium",
        q: "Evaluate tan^-1(1) + cot^-1(1).",
        ans: "tan^-1(1) = pi/4 and cot^-1(1) = pi/4, so the sum is pi/2.",
      },
      {
        level: "Medium",
        q: "Prove that sin^-1 x + cos^-1 x = pi/2 for x in [-1,1].",
        ans: "Let sin^-1 x = theta. Then sin theta = x with theta in [-pi/2, pi/2]. Hence cos(pi/2 - theta) = x, so cos^-1 x = pi/2 - theta. Therefore sin^-1 x + cos^-1 x = pi/2.",
      },
    ],
  },
  tricks: [
    {
      title: "Branch First",
      content: "Before simplifying, identify the principal range of the inverse trig function in the question.",
    },
    {
      title: "Do Not Cancel Blindly",
      content: "sin(sin^-1 x) simplifies directly to x, but sin^-1(sin x) needs principal-value checking.",
    },
    {
      title: "Memorize Anchor Values",
      content: "Keep standard angles ready: 0, pi/6, pi/4, pi/3, and pi/2 solve most direct-value questions fast.",
    },
    {
      title: "Use Complement Pairs",
      content: "Whenever sin^-1 x and cos^-1 x appear together, test whether the expression collapses to pi/2.",
    },
  ],
  strategy: [
    {
      exam: "Board Level Strategy",
      points: [
        "Write the principal range explicitly before evaluating composite inverse trig expressions.",
        "In direct-value problems, identify the trig value first and then choose the angle from the correct branch.",
        "For proofs and simplifications, mention the restricted interval or principal range as part of the reasoning.",
      ],
    },
  ],
  revisionPlan: [
    { phase: "Days 1-2", focus: "Inverse function idea, one-one condition, and why domain restriction is needed." },
    { phase: "Days 3-5", focus: "Definitions, domains, and principal ranges of all inverse trig functions." },
    { phase: "Days 6-8", focus: "Standard values and direct identity-based evaluation." },
    { phase: "Days 9-11", focus: "Composite expressions and principal-value problems." },
    { phase: "Days 12-14", focus: "Expression simplification, proof-style identities, and mixed board revision." },
  ],
};
