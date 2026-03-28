export const inverseTrigonometricFunctionsConnectomicsData = {
  conceptMap: {
    nodes: [
      { id: "trig", label: "Trig Functions", icon: "TRIG", color: "#6366f1" },
      { id: "restrict", label: "Restricted Domain", icon: "DOM", color: "#0891b2" },
      { id: "inverse", label: "Inverse Trig", icon: "INV", color: "#f59e0b" },
      { id: "principal", label: "Principal Value", icon: "PV", color: "#ec4899" },
      { id: "triangles", label: "Geometry", icon: "GEO", color: "#10b981" },
      { id: "calculus", label: "Calculus", icon: "CAL", color: "#06b6d4" },
      { id: "complex", label: "Equations", icon: "EQN", color: "#7c3aed" },
    ],
    links: [
      {
        from: "trig",
        to: "restrict",
        tooltip:
          "Trigonometric functions repeat values on all real numbers, so we first restrict the domain to make them one-one.",
      },
      {
        from: "restrict",
        to: "inverse",
        tooltip:
          "Once a suitable interval is chosen, inverse trigonometric functions become well-defined single-valued rules.",
      },
      {
        from: "inverse",
        to: "principal",
        tooltip:
          "Each inverse trig function returns its answer from a standard principal range, which removes ambiguity.",
      },
      {
        from: "principal",
        to: "complex",
        tooltip:
          "Composite expressions like sin^-1(sin x) and cos^-1(cos x) depend on principal values, not just direct cancellation.",
      },
      {
        from: "inverse",
        to: "triangles",
        tooltip:
          "Inverse trig functions convert ratios back into angles, so they are natural tools in right-triangle geometry and angle finding.",
      },
      {
        from: "inverse",
        to: "calculus",
        tooltip:
          "Inverse trig expressions appear in differentiation, integration, and substitution-based simplification in higher mathematics.",
      },
    ],
  },
  topicBreakdown: [
    {
      id: "A",
      title: "Restriction Creates Invertibility",
      concepts:
        "The chapter begins with ordinary trig functions, but inverse trig starts only after choosing intervals where outputs no longer repeat.",
    },
    {
      id: "B",
      title: "Principal Values Standardize Answers",
      concepts:
        "A single standard range keeps each inverse trig function single-valued and makes calculator outputs predictable.",
    },
    {
      id: "C",
      title: "Inverse Trig Connects Ratios to Angles",
      concepts:
        "Whenever a ratio is known and an angle is needed, inverse trig bridges algebraic data and geometric meaning.",
    },
    {
      id: "D",
      title: "Inverse Trig Powers Simplification",
      concepts:
        "Identities such as sin^-1 x + cos^-1 x = pi/2 and branch-based reasoning simplify complex expressions efficiently.",
    },
  ],
  misconceptions: [
    {
      statement: '"sin^-1(sin x) is always x"',
      truth:
        "False. The answer must lie in the principal range of sin^-1, so many angles are converted to an equivalent principal angle.",
    },
    {
      statement: '"All trig functions are invertible on R"',
      truth:
        "False. They are periodic, so inverse trig functions are defined only after domain restriction.",
    },
    {
      statement: '"Principal value means the largest angle"',
      truth:
        "False. Principal value means the standard angle chosen from the fixed principal branch, not the largest one.",
    },
  ],
};
