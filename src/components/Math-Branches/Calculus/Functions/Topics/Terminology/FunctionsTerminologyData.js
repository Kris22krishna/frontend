export const TERMS = [
    {
        word: "Domain",
        icon: "➡️",
        def: "The complete set of all possible input values (x-values) for which the function is defined.",
        example: "The domain of $$f(x) = \\frac{1}{x}$$ is all real numbers except 0."
    },
    {
        word: "Range",
        icon: "🎯",
        def: "The complete set of all possible output values (y-values) the function can produce.",
        example: "The range of $$f(x) = x^2$$ is all non-negative real numbers."
    },
    {
        word: "Roots/Zeros",
        icon: "🌱",
        def: "The x-values where the function evaluates to exactly zero (where it crosses the x-axis).",
        example: "The roots of $$f(x) = x^2 - 4$$ are $$x=2$$ and $$x=-2$$."
    },
    {
        word: "Asymptote",
        icon: "🚧",
        def: "A line that a curve approaches infinitely closely, but fundamentally never touches.",
        example: "$$f(x) = \\frac{1}{x}$$ has a vertical asymptote at $$x=0$$ and a horizontal asymptote at $$y=0$$."
    }
];

export const FIVE_RULES = [
    {
        name: "Vertical Line Test",
        desc: "Used to determine if a graph represents a function. If any vertical line intersects the graph more than once, it is NOT a function.",
        formula: "1 Input $$\\rightarrow$$ Only 1 Output"
    },
    {
        name: "Horizontal Line Test",
        desc: "Used to determine if a function is 'one-to-one' (injective) and therefore has an inverse function.",
        formula: "1 Output $$\\rightarrow$$ Only 1 Source Input"
    },
    {
        name: "Function Composition",
        desc: "Applying one function to the results of another function.",
        formula: "$$(f \\circ g)(x) = f(g(x))$$"
    },
    {
        name: "Inverse Functions",
        desc: "A function that completely reverses the operation of the original function.",
        formula: "$$f^{-1}(f(x)) = x$$"
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: "What defines the Domain of a function?",
        options: [
            "All the possible output values out of the function",
            "The points where it crosses the y-axis",
            "All the possible valid input values (x)",
            "The highest point on the curve"
        ],
        correct: 2
    },
    {
        id: 2,
        q: "How can you visually test if a drawn curve is a valid function?",
        options: [
            "The Horizontal Line Test",
            "The Vertical Line Test",
            "The Diagonal Test",
            "By checking if it touches 0"
        ],
        correct: 1
    },
    {
        id: 3,
        q: "What is an Asymptote?",
        options: [
            "A line that the curve definitely crosses multiple times",
            "The exact center point of a circle",
            "The highest peak of a sine wave",
            "A invisible line the graph gets infinitely close to, but never truly touches"
        ],
        correct: 3
    }
];
