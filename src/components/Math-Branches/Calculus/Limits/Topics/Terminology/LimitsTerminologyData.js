export const TERMS = [
    {
        word: "Limit",
        icon: "🎯",
        def: "The value that a function or sequence approaches as the input approaches some value.",
        example: "The limit of $$x^2$$ as $$x$$ approaches 3 is 9. Written as $$\\lim_{{x \\to 3}} x^2 = 9$$"
    },
    {
        word: "LHL & RHL",
        icon: "⬅️",
        def: "Left-Hand Limit (LHL) is the value approaching from numbers less than c. Right-Hand Limit (RHL) is coming from greater numbers.",
        example: "LHL: $$\\lim_{{x \\to c^-}} f(x)$$ | RHL: $$\\lim_{{x \\to c^+}} f(x)$$"
    },
    {
        word: "Continuity",
        icon: "🌊",
        def: "A function is continuous at a point if the limit exists there, and the limit matches the actual function value at that point.",
        example: "For continuous $$f(x)$$: $$\\lim_{{x \\to c}} f(x) = f(c)$$"
    },
    {
        word: "Indeterminate Form",
        icon: "❓",
        def: "An algebraic expression obtained by evaluating a limit that lacks sufficient information to determine the limit's final exact value.",
        example: "Common forms include $$\\frac{0}{0}$$, $$\\frac{\\infty}{\\infty}$$, and $$0 \\cdot \\infty$$."
    }
];

export const FIVE_RULES = [
    {
        name: "Sum/Difference Rule",
        desc: "The limit of a sum is the sum of the limits.",
        formula: "$$\\lim_{{x \\to c}}[f(x) \\pm g(x)] = L \\pm M$$"
    },
    {
        name: "Product Rule",
        desc: "The limit of a product is the product of the limits.",
        formula: "$$\\lim_{{x \\to c}}[f(x) \\cdot g(x)] = L \\cdot M$$"
    },
    {
        name: "Quotient Rule",
        desc: "The limit of a quotient is the quotient of the limits (provided the denominator limit is not 0).",
        formula: "$$\\lim_{{x \\to c}}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{L}{M}, M \\neq 0$$"
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: "What does an indeterminate form like 0/0 mean in limits?",
        options: [
            "The limit does not exist.",
            "The answer is always zero.",
            "More algebraic work is needed to find the actual limit.",
            "The limit is infinity."
        ],
        correct: 2
    },
    {
        id: 2,
        q: "If the Left-Hand Limit and Right-Hand Limit are different...",
        options: [
            "The overall limit does not exist.",
            "The limit is the average of the two.",
            "The function must be a straight line.",
            "The right-hand limit takes precedence."
        ],
        correct: 0
    },
    {
        id: 3,
        q: "The Quotient Limit Rule applies ONLY when...",
        options: [
            "The numerator limit is 0.",
            "Both limits are positive.",
            "The denominator limit is NOT 0.",
            "You are evaluating polynomials."
        ],
        correct: 2
    }
];
