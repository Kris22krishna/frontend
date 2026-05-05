export const TERMS = [
    {
        word: 'Angle of Elevation',
        def: 'The angle formed between the horizontal line of sight and the line of sight looking upward to an object.',
        icon: '⬆️',
        example: 'If you look up at a kite at $45°$ from the ground, that $45°$ is the angle of elevation.',
        realLifeExample: 'Standing at the base of a tower and looking up at its top — the angle your eyes make with the ground is the angle of elevation.',
    },
    {
        word: 'Angle of Depression',
        def: 'The angle formed between the horizontal line of sight and the line of sight looking downward to an object.',
        icon: '⬇️',
        example: 'A pilot looking down at a runway at $30°$ below horizontal — that $30°$ is the angle of depression.',
        realLifeExample: 'A lifeguard on a high tower looking down at a swimmer in the sea.',
    },
    {
        word: 'Sine (sin θ)',
        def: 'In a right-angled triangle, sine of an angle is the ratio of the length of the opposite side to the hypotenuse.',
        icon: '🔺',
        example: '$\\sin\\theta = \\dfrac{\\text{Opposite}}{\\text{Hypotenuse}}$, so $\\sin 30° = \\dfrac{1}{2}$.',
        realLifeExample: 'Sound and light waves are described mathematically using the sine function — your speakers produce sine waves!',
    },
    {
        word: 'Cosine (cos θ)',
        def: 'In a right-angled triangle, cosine of an angle is the ratio of the adjacent side to the hypotenuse.',
        icon: '📐',
        example: '$\\cos\\theta = \\dfrac{\\text{Adjacent}}{\\text{Hypotenuse}}$, so $\\cos 60° = \\dfrac{1}{2}$.',
        realLifeExample: 'GPS satellites use cosine calculations to triangulate your exact position on Earth.',
    },
    {
        word: 'Tangent (tan θ)',
        def: 'The ratio of the opposite side to the adjacent side. Equivalently, $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$.',
        icon: '↗️',
        example: '$\\tan\\theta = \\dfrac{\\text{Opposite}}{\\text{Adjacent}}$, so $\\tan 45° = 1$.',
        realLifeExample: 'The slope (gradient) of a road or ramp is the tangent of its angle with the horizontal.',
    },
    {
        word: 'Hypotenuse',
        def: 'The longest side of a right-angled triangle. It is always opposite the right angle (90°).',
        icon: '🔗',
        example: 'In a 3-4-5 triangle, the side of length 5 is the hypotenuse.',
        realLifeExample: 'The diagonal brace of a ladder leaning against a wall — that brace is the hypotenuse of the triangle formed.',
    },
    {
        word: 'Pythagorean Identity',
        def: 'The fundamental identity of trigonometry: the square of sine plus the square of cosine always equals 1.',
        icon: '⚡',
        example: '$\\sin^2\\theta + \\cos^2\\theta = 1$ for every angle $\\theta$.',
        realLifeExample: 'Used in physics to convert between horizontal and vertical components of forces — always true regardless of angle.',
    },
    {
        word: 'Standard Angle Table',
        def: 'A table of exact trigonometric values for angles 0°, 30°, 45°, 60°, and 90°, used to solve problems without a calculator.',
        icon: '📊',
        example: '$\\sin 30° = \\frac{1}{2},\\; \\cos 45° = \\frac{1}{\\sqrt{2}},\\; \\tan 60° = \\sqrt{3}$.',
        realLifeExample: 'Engineering students worldwide memorise this table to quickly solve structural load problems in exams.',
    },
];

export const KEY_IDENTITIES = [
    {
        name: 'Basic Trig Ratio Definitions (SOH-CAH-TOA)',
        desc: 'The three primary ratios are defined from a right-angled triangle. SOH: Sin = Opposite/Hyp. CAH: Cos = Adjacent/Hyp. TOA: Tan = Opposite/Adjacent.',
        formula: '\\sin\\theta = \\frac{O}{H},\\quad \\cos\\theta = \\frac{A}{H},\\quad \\tan\\theta = \\frac{O}{A}'
    },
    {
        name: 'Reciprocal Ratios',
        desc: 'Each primary ratio has a reciprocal: cosecant (cosec), secant (sec), and cotangent (cot). These are simply 1 divided by the primary ratio.',
        formula: '\\cosec\\theta = \\frac{1}{\\sin\\theta},\\quad \\sec\\theta = \\frac{1}{\\cos\\theta},\\quad \\cot\\theta = \\frac{1}{\\tan\\theta}'
    },
    {
        name: 'Pythagorean Identity',
        desc: 'Derived directly from the Pythagorean theorem applied to a unit right triangle. This is the most important trig identity.',
        formula: '\\sin^2\\theta + \\cos^2\\theta = 1'
    },
    {
        name: 'Complementary Angle Relations',
        desc: 'For two complementary angles A and B (where A + B = 90°), the trig ratios swap between sin/cos, tan/cot, and sec/cosec.',
        formula: '\\sin A = \\cos(90° - A),\\quad \\tan A = \\cot(90° - A)'
    },
    {
        name: 'Standard Angle Values',
        desc: 'The exact values of trig functions at 0°, 30°, 45°, 60°, 90°. The sin row follows the pattern √0/2, √1/2, √2/2, √3/2, √4/2.',
        formula: '\\sin 0°=0,\\; \\sin 30°=\\tfrac{1}{2},\\; \\sin 45°=\\tfrac{\\sqrt{2}}{2},\\; \\sin 60°=\\tfrac{\\sqrt{3}}{2},\\; \\sin 90°=1'
    },
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'In a right triangle, which ratio gives sin θ?',
        options: ['Adjacent / Hypotenuse', 'Opposite / Adjacent', 'Opposite / Hypotenuse', 'Hypotenuse / Opposite'],
        correct: 2
    },
    {
        id: 2,
        q: 'What is the value of tan 45°?',
        options: ['0', '1/2', '√3', '1'],
        correct: 3
    },
    {
        id: 3,
        q: 'Which identity is ALWAYS true for every angle θ?',
        options: ['sin θ = cos θ', 'sin²θ + cos²θ = 1', 'tan θ = sin θ + cos θ', 'sin θ · cos θ = 1'],
        correct: 1
    },
    {
        id: 4,
        q: 'The angle you look UP from horizontal to see an object is called:',
        options: ['Angle of Depression', 'Obtuse Angle', 'Angle of Elevation', 'Reflex Angle'],
        correct: 2
    },
    {
        id: 5,
        q: 'What is cosec θ equal to?',
        options: ['1 / cos θ', '1 / tan θ', 'cos θ / sin θ', '1 / sin θ'],
        correct: 3
    },
];
