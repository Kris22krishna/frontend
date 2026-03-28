function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuestion(question, options, correctAnswer, explanation) {
  const shuffled = shuffleArray(options);
  return {
    question,
    options: shuffled,
    correct: shuffled.indexOf(correctAnswer),
    explanation,
  };
}

export const generateInverseConceptQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion(
        "Inverse of a function exists only when the function is:",
        ["one-one and onto", "periodic and bounded", "continuous and even", "odd and onto"],
        "one-one and onto",
        "A function must be one-one and onto in order to have a proper inverse."
      ),
    () =>
      buildQuestion(
        "Why does $\\sin x$ not have an inverse on $\\mathbb{R}$?",
        ["It is not one-one on $\\mathbb{R}$", "It is undefined for some real numbers", "Its range is too large", "It is decreasing"],
        "It is not one-one on $\\mathbb{R}$",
        "$\\sin x$ repeats values, so a single output can come from many inputs."
      ),
    () =>
      buildQuestion(
        "A standard restricted domain for $\\sin x$ to make it invertible is:",
        ["$[-\\pi/2,\\pi/2]$", "$[0,2\\pi]$", "$[-\\pi,\\pi]$", "$(0,\\pi)$"],
        "$[-\\pi/2,\\pi/2]$",
        "On $[-\\pi/2,\\pi/2]$, sine is one-one and covers the full range $[-1,1]$."
      ),
    () =>
      buildQuestion(
        "The principal range of $\\cos^{-1}x$ is:",
        ["$[0,\\pi]$", "$[-\\pi/2,\\pi/2]$", "$(-\\pi/2,\\pi/2)$", "$(0,2\\pi)$"],
        "$[0,\\pi]$",
        "$\\cos^{-1}x$ returns angles only from $[0,\\pi]$."
      ),
    () =>
      buildQuestion(
        "The principal range of $\\tan^{-1}x$ is:",
        ["$(-\\pi/2,\\pi/2)$", "$[0,\\pi]$", "$[-\\pi/2,\\pi/2]$", "$(0,2\\pi)$"],
        "$(-\\pi/2,\\pi/2)$",
        "$\\tan^{-1}x$ avoids the endpoints where tangent is undefined."
      ),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generateInverseConceptAssessment = () => generateInverseConceptQuestions(10);

export const generateDefinitionValueQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion(
        "Find $\\sin^{-1}(1/2)$.",
        ["$\\pi/6$", "$5\\pi/6$", "$\\pi/3$", "$-\\pi/6$"],
        "$\\pi/6$",
        "The principal angle in $[-\\pi/2,\\pi/2]$ whose sine is $1/2$ is $\\pi/6$."
      ),
    () =>
      buildQuestion(
        "Find $\\cos^{-1}(-1/2)$.",
        ["$2\\pi/3$", "$\\pi/3$", "$4\\pi/3$", "$-2\\pi/3$"],
        "$2\\pi/3$",
        "The principal angle in $[0,\\pi]$ whose cosine is $-1/2$ is $2\\pi/3$."
      ),
    () =>
      buildQuestion(
        "Find $\\tan^{-1}(1)$.",
        ["$\\pi/4$", "$3\\pi/4$", "$\\pi/3$", "$-\\pi/4$"],
        "$\\pi/4$",
        "The principal angle in $(-\\pi/2,\\pi/2)$ whose tangent is 1 is $\\pi/4$."
      ),
    () =>
      buildQuestion(
        "Find $\\cot^{-1}(-1)$.",
        ["$3\\pi/4$", "$\\pi/4$", "$-\\pi/4$", "$5\\pi/4$"],
        "$3\\pi/4$",
        "$\\cot^{-1}x$ takes values in $(0,\\pi)$, so the principal angle with cotangent $-1$ is $3\\pi/4$."
      ),
    () =>
      buildQuestion(
        "Find $\\sec^{-1}(2)$.",
        ["$\\pi/3$", "$2\\pi/3$", "$\\pi/6$", "$-\\pi/3$"],
        "$\\pi/3$",
        "The principal angle whose secant is 2, equivalently whose cosine is $1/2$, is $\\pi/3$."
      ),
    () =>
      buildQuestion(
        "Find $\\csc^{-1}(-2)$.",
        ["$-\\pi/6$", "$\\pi/6$", "$5\\pi/6$", "$-5\\pi/6$"],
        "$-\\pi/6$",
        "Since $\\csc \\theta=-2$, we need $\\sin \\theta=-1/2$ and the principal value is $-\\pi/6$."
      ),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generateDefinitionValueAssessment = () => generateDefinitionValueQuestions(10);

export const generatePropertyIdentityQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion(
        "Evaluate $\\sin(\\sin^{-1}x)$ for $x\\in[-1,1]$.",
        ["$x$", "$\\sin x$", "$|x|$", "$\\sqrt{1-x^2}$"],
        "$x$",
        "Direct trigonometric function of its matching inverse simplifies to the original input."
      ),
    () =>
      buildQuestion(
        "Evaluate $\\tan(\\tan^{-1}x)$.",
        ["$x$", "$\\tan x$", "$|x|$", "$1+x^2$"],
        "$x$",
        "Tangent and its inverse cancel directly on the domain of $\\tan^{-1}x$."
      ),
    () =>
      buildQuestion(
        "Evaluate $\\cos(\\cos^{-1}x)$ for $x\\in[-1,1]$.",
        ["$x$", "$\\cos x$", "$\\sqrt{1-x^2}$", "$|x|$"],
        "$x$",
        "Cosine of its inverse returns the original value."
      ),
    () =>
      buildQuestion(
        "Simplify $\\sin^{-1}x + \\cos^{-1}x$ for $x\\in[-1,1]$.",
        ["$\\pi/2$", "$\\pi$", "$0$", "$2\\pi$"],
        "$\\pi/2$",
        "This is a standard inverse trigonometric identity."
      ),
    () =>
      buildQuestion(
        "Which statement is always true?",
        [
          "$\\sin(\\sin^{-1}x)=x$",
          "$\\sin^{-1}(\\sin x)=x$ for all real $x$",
          "$\\cos^{-1}(\\cos x)=x$ for all real $x$",
          "$\\tan^{-1}(\\tan x)=x$ for all real $x$",
        ],
        "$\\sin(\\sin^{-1}x)=x$",
        "Only the direct trig-of-inverse identity holds unconditionally on the inverse domain. The reverse composition depends on the principal range."
      ),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generatePropertyIdentityAssessment = () => generatePropertyIdentityQuestions(10);

export const generatePrincipalValueQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion(
        "Find $\\sin^{-1}(\\sin 3\\pi/4)$.",
        ["$\\pi/4$", "$3\\pi/4$", "$-\\pi/4$", "$\\pi/2$"],
        "$\\pi/4$",
        "$\\sin 3\\pi/4 = \\sqrt{2}/2$, and the principal angle in $[-\\pi/2,\\pi/2]$ with that sine is $\\pi/4$."
      ),
    () =>
      buildQuestion(
        "Find $\\cos^{-1}(\\cos 5\\pi/4)$.",
        ["$3\\pi/4$", "$5\\pi/4$", "$\\pi/4$", "$-3\\pi/4$"],
        "$3\\pi/4$",
        "$\\cos 5\\pi/4 = -\\sqrt{2}/2$, and the principal angle in $[0,\\pi]$ with that cosine is $3\\pi/4$."
      ),
    () =>
      buildQuestion(
        "Find $\\tan^{-1}(\\tan 3\\pi/4)$.",
        ["$-\\pi/4$", "$3\\pi/4$", "$\\pi/4$", "$-3\\pi/4$"],
        "$-\\pi/4$",
        "$\\tan 3\\pi/4=-1$, and the principal value of $\\tan^{-1}(-1)$ is $-\\pi/4$."
      ),
    () =>
      buildQuestion(
        "Find $\\sin^{-1}(-1/2)$.",
        ["$-\\pi/6$", "$\\pi/6$", "$-5\\pi/6$", "$5\\pi/6$"],
        "$-\\pi/6$",
        "The principal sine-inverse range is $[-\\pi/2,\\pi/2]$."
      ),
    () =>
      buildQuestion(
        "Find $\\tan^{-1}(\\sqrt{3})$.",
        ["$\\pi/3$", "$2\\pi/3$", "$-\\pi/3$", "$\\pi/6$"],
        "$\\pi/3$",
        "The principal tangent-inverse angle with tangent $\\sqrt{3}$ is $\\pi/3$."
      ),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generatePrincipalValueAssessment = () => generatePrincipalValueQuestions(10);

export const generateSimplificationQuestions = (count = 5) => {
  const templates = [
    () =>
      buildQuestion(
        "Simplify $\\sin^{-1}(2x\\sqrt{1-x^2})$ for $0\\le x\\le 1/\\sqrt{2}$.",
        ["$2\\sin^{-1}x$", "$\\sin^{-1}x$", "$\\pi-2\\sin^{-1}x$", "$2\\cos^{-1}x$"],
        "$2\\sin^{-1}x$",
        "Let $\\theta=\\sin^{-1}x$ with $\\theta\\in[0,\\pi/4]$. Then $2x\\sqrt{1-x^2}=\\sin 2\\theta$, and $2\\theta$ stays in the principal sine range."
      ),
    () =>
      buildQuestion(
        "If $x\\in(0,\\pi/2)$, then $\\tan^{-1}\\left(\\frac{1-\\cos x}{\\sin x}\\right)$ simplifies to:",
        ["$x/2$", "$x$", "$\\pi/2-x$", "$\\tan^{-1}(\\tan x)$"],
        "$x/2$",
        "Using half-angle identities, $\\frac{1-\\cos x}{\\sin x}=\\tan(x/2)$, and $x/2$ lies in the principal tangent range."
      ),
    () =>
      buildQuestion(
        "If $x>1$, simplify $\\cot^{-1}\\left(\\frac{1}{\\sqrt{x^2-1}}\\right)$.",
        ["$\\sec^{-1}x$", "$\\csc^{-1}x$", "$\\cos^{-1}(1/x)$", "$\\sin^{-1}(1/x)$"],
        "$\\sec^{-1}x$",
        "Let $x=\\sec \\theta$ with principal angle $\\theta\\in[0,\\pi/2)$. Then $\\sqrt{x^2-1}=\\tan\\theta$, so the expression becomes $\\cot^{-1}(\\cot\\theta)=\\theta=\\sec^{-1}x$."
      ),
    () =>
      buildQuestion(
        "For $x\\in[-1,1]$, simplify $\\cos^{-1}x + \\sin^{-1}x$.",
        ["$\\pi/2$", "$\\pi$", "$0$", "$2\\pi$"],
        "$\\pi/2$",
        "This is a standard identity for inverse trig functions."
      ),
    () =>
      buildQuestion(
        "Which simplification is correct for principal values?",
        [
          "$\\sin^{-1}(\\sin x)=x$ only when $x\\in[-\\pi/2,\\pi/2]$",
          "$\\sin^{-1}(\\sin x)=x$ for all real $x$",
          "$\\cos^{-1}(\\cos x)=x$ for all real $x$",
          "$\\tan^{-1}(\\tan x)=x$ for all real $x$",
        ],
        "$\\sin^{-1}(\\sin x)=x$ only when $x\\in[-\\pi/2,\\pi/2]$",
        "The reverse composition equals the original angle only when that angle already lies in the principal range."
      ),
  ];

  return Array.from({ length: count }, (_, index) => templates[index % templates.length]());
};

export const generateSimplificationAssessment = () => generateSimplificationQuestions(10);
