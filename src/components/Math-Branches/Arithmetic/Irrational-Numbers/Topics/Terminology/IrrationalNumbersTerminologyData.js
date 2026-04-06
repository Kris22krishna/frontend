export const TERMS = [
    {
        word: 'Irrational Number',
        def: 'A real number that cannot be written as a simple fraction (ratio of two integers). Its decimal expansion continues infinitely without ever repeating.',
        icon: '🌀',
        example: '$\\pi$, $\\sqrt{2}$, and $e$ are irrational.',
        realLifeExample: 'The diagonal of a 1×1 square is √2 ≈ 1.41421356... — a length that can never be expressed as an exact fraction.',
        visualType: 'NumberLine-Irrational'
    },
    {
        word: 'Pi (π)',
        def: "The ratio of a circle's circumference to its diameter. It is irrational and its decimal expansion starts with 3.14159...",
        icon: '⭕',
        example: '$\\pi \\approx 3.14159$',
        realLifeExample: 'Wrapping a string around any circular object (a wheel, a plate) and dividing by its width always gives π.',
        visualType: 'Circle-Pi'
    },
    {
        word: "Euler's Number (e)",
        def: 'A famous irrational number used heavily in exponential growth, decay, and compound interest calculations. It starts with 2.718...',
        icon: '📈',
        example: '$e \\approx 2.71828$',
        realLifeExample: 'If you invest ₹100 at 100% interest compounded continuously for 1 year, you end up with ₹100 × e ≈ ₹271.83.',
        visualType: 'Exponential-e'
    },
    {
        word: 'Radical / Root',
        def: 'The mathematical symbol $\\sqrt{}$ used to denote a root (like a square root or cube root). If the number underneath is not a perfect power, the result is irrational.',
        icon: '√',
        example: '$\\sqrt{5}$ is an irrational root.',
        realLifeExample: 'Finding the side length of a square field with area 5 m² — the side is √5 ≈ 2.236 m, an irrational length.',
        visualType: 'NumberLine-Root'
    },
    {
        word: 'Perfect Square',
        def: 'An integer that is the square of another integer. The square root of a perfect square is a strictly RATIONAL number.',
        icon: '🟦',
        example: '$16$ is a perfect square because $4 \\times 4 = 16$. So $\\sqrt{16} = 4$ (Rational).',
        realLifeExample: 'A tile floor of 16 tiles can be arranged into a perfect 4×4 grid — that is what makes 16 a perfect square.',
        visualType: 'NumberLine-PerfectSquare'
    },
    {
        word: 'Surd',
        def: 'An expression that includes a root that cannot be simplified completely into a rational number. Leaving a number as a surd provides exact precision.',
        icon: '🧩',
        example: '$\\sqrt{3}$ is a surd.',
        realLifeExample: 'The height of an equilateral triangle with side 2 is exactly √3 — architects keep it as a surd for precision.',
        visualType: 'NumberLine-Surd'
    }
];

export const FIVE_RULES = [
    {
        name: 'Approximations',
        desc: 'Because irrationals never end, we must approximate them to do basic decimal math.',
        formula: '\\pi \\approx 3.14 \\text{ and } \\sqrt{2} \\approx 1.41'
    },
    {
        name: 'The Perfect Square Test',
        desc: 'If you take the square root of a number, it is ONLY rational if the number is a perfect square (1, 4, 9, 16, 25...). Otherwise, it is irrational.',
        formula: '\\sqrt{9} = 3 (Rational), \\text{ but } \\sqrt{10} \\approx 3.1622... (Irrational)'
    },
    {
        name: 'Rational + Irrational = Irrational',
        desc: 'If you add or subtract a rational number and an irrational number, the result is ALWAYS an irrational number.',
        formula: '2 + \\pi = 5.14159... \\text{ (Irrational)}'
    },
    {
        name: 'Rational × Irrational = Irrational',
        desc: 'If you multiply a non-zero rational number by an irrational number, the result is ALWAYS irrational.',
        formula: '3 \\times \\sqrt{2} = 3\\sqrt{2} \\text{ (Irrational)}'
    },
    {
        name: 'Irrational × Irrational = ?',
        desc: 'Multiplying two irrationals together CAN produce a rational number! Usually, this happens when multiplying the exact same roots.',
        formula: '\\sqrt{2} \\times \\sqrt{2} = \\sqrt{4} = 2 \\text{ (Rational!)}'
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'Which of the following numbers is Irrational?',
        options: ['Square root of 25', '3.14 (terminating)', 'Square root of 11', '1/3'],
        correct: 2
    },
    {
        id: 2,
        q: 'If you add an irrational number to a rational number, what is the result?',
        options: ['Always Rational', 'Always Irrational', 'Sometimes Rational', 'Zero'],
        correct: 1
    },
    {
        id: 3,
        q: 'What does "pi" (π) geometrically represent?',
        options: ['Radius divided by Diameter', 'Circumference divided by Diameter', 'Diameter times Radius', 'Area divided by Diameter'],
        correct: 1
    },
    {
        id: 4,
        q: 'What happens when you calculate √3 × √3?',
        options: ['You get an irrational number', 'You get 9', 'You get 3', 'You get 1'],
        correct: 2
    }
];
