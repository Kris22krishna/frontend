export const TERMS = [
    {
        word: "Antiderivative",
        icon: "⏪",
        def: "A function whose derivative is the given function. It is essentially differentiation in reverse.",
        example: "The antiderivative of $$2x$$ is $$x^2$$, because the derivative of $$x^2$$ is $$2x$$."
    },
    {
        word: "Indefinite Integral",
        icon: "🌊",
        def: "A family of functions (all possible antiderivatives) represented by the integral sign without endpoints. It always includes a constant of integration, + C.",
        example: "$$\\int f(x)dx = F(x) + C$$"
    },
    {
        word: "Definite Integral",
        icon: "🔲",
        def: "The exact net signed area under a curve between two specific boundaries (a and b) on the x-axis.",
        example: "$$\\int_{a}^{b} f(x)dx = \\text{Area}$$"
    },
    {
        word: "Constant of Integration (C)",
        icon: "👻",
        def: "An arbitrary constant added to indefinite integrals because the derivative of any constant is zero, meaning information is lost during differentiation.",
        example: "$$\\int 2x\\,dx = x^2 + C$$"
    }
];

export const FIVE_RULES = [
    {
        name: "Sum/Difference Rule",
        desc: "The integral of a sum is the sum of their individual integrals.",
        formula: "$$\\int [f(x) \\pm g(x)]dx = \\int f(x)dx \\pm \\int g(x)dx$$"
    },
    {
        name: "Constant Multiple Rule",
        desc: "Constants can be pulled out and factored to the front of the integral sign.",
        formula: "$$\\int k \\cdot f(x)dx = k \\int f(x)dx$$"
    },
    {
        name: "Fundamental Theorem of Calculus",
        desc: "If F(x) is an antiderivative of f(x), then the definite integral evaluates to F(b) minus F(a).",
        formula: "$$\\int_{a}^{b} f(x)dx = F(b) - F(a)$$"
    },
    {
        name: "Integration by Parts",
        desc: "The reverse product rule, used when integrating the product of two different types of functions.",
        formula: "$$\\int u \\, dv = uv - \\int v \\, du$$"
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: "Why do we add '+ C' to the end of indefinite integrals?",
        options: [
            "Because integration is imperfect",
            "Because C stands for Calculus",
            "Because the derivative of any constant is 0, so any constant could have been there originally",
            "Because the area can be anything"
        ],
        correct: 2
    },
    {
        id: 2,
        q: "What does the symbol ∫ actually stand for historically?",
        options: [
            "An elongated 'A' for Area",
            "An elongated 'S' for Sum (Summa)",
            "A stylized infinity sign",
            "A musical symbol for 'smooth transition'"
        ],
        correct: 1
    },
    {
        id: 3,
        q: "What is the primary difference between a definite and indefinite integral?",
        options: [
            "Indefinite integrals result in a family of functions, definite integrals result in a number (area).",
            "Definite integrals are positive, indefinite are negative.",
            "Indefinite integrals don't use the dx notation.",
            "There is no difference, they are synonyms."
        ],
        correct: 0
    }
];
