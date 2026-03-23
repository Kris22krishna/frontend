export const TERMS = [
    {
        word: "Derivative",
        icon: "📉",
        def: "The exact rate at which a function is changing at any given point.",
        example: "The derivative of $$x^2$$ is $$2x$$. Written as $$\\frac{d}{dx}(x^2) = 2x$$"
    },
    {
        word: "Tangent Line",
        icon: "📐",
        def: "A straight line that touches a curve at a single point, representing its exact slope at that instant.",
        example: "The slope of the tangent to $$y=x^2$$ at $$x=3$$ is $$6$$."
    },
    {
        word: "Chain Rule",
        icon: "🔗",
        def: "A formula to compute the derivative of a composite function (a function inside another function).",
        example: "$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$"
    },
    {
        word: "Implicit Function",
        icon: "🎭",
        def: "A function where $$y$$ is not isolated on one side, but is mixed with $$x$$.",
        example: "$$x^2 + y^2 = 25$$ (Equation of a circle)"
    }
];

export const FIVE_RULES = [
    {
        name: "Sum/Difference Rule",
        desc: "The derivative of a sum is the sum of the derivatives.",
        formula: "$$\\frac{d}{dx}[f(x) \\pm g(x)] = f'(x) \\pm g'(x)$$"
    },
    {
        name: "Product Rule",
        desc: "First times derivative of second, plus second times derivative of first.",
        formula: "$$\\frac{d}{dx}[u \\cdot v] = u \\cdot v' + v \\cdot u'$$"
    },
    {
        name: "Quotient Rule",
        desc: "Bottom times derivative of top minus top times derivative of bottom, all over bottom squared. (Low dHigh - High dLow over Low Squared)",
        formula: "$$\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{v \\cdot u' - u \\cdot v'}{v^2}$$"
    },
    {
        name: "Parametric Rule",
        desc: "When x and y are defined by a third variable (parameter) t.",
        formula: "$$\\frac{dy}{dx} = \\frac{\\frac{dy}{dt}}{\\frac{dx}{dt}}$$"
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: "Which rule do you use when differentiating a function inside a function, like sin(x²)?",
        options: [
            "Product Rule",
            "Quotient Rule",
            "Chain Rule",
            "Power Rule"
        ],
        correct: 2
    },
    {
        id: 2,
        q: "What is an implicit equation?",
        options: [
            "An equation where y is clearly isolated, like y = 3x + 2",
            "An equation where x and y are mixed together, like x² + y² = 4",
            "An equation with no variables",
            "An equation that approaches infinity"
        ],
        correct: 1
    },
    {
        id: 3,
        q: "What does the Product Rule dictate for u * v?",
        options: [
            "Just multiply their derivatives: u' * v'",
            "Add their derivatives: u' + v'",
            "First times derivative of second + second times derivative of first",
            "Square both terms"
        ],
        correct: 2
    }
];
