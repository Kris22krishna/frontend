export const TERMS = [
    {
        word: 'Radian Measure',
        def: 'A unit of angle measure. One radian is the angle subtended at the center of a circle by an arc equal in length to the radius.',
        icon: '🥧',
        example: '$180° = \\pi \\text{ radians}$. To convert degrees to radians, multiply by $\\frac{\\pi}{180}$.',
        realLifeExample: 'Calculus formulas for physics (like rotational velocity) require angles to be in radians to work without messy constants.',
    },
    {
        word: 'Unit Circle',
        def: 'A circle with a radius of 1, centered at the origin (0,0) of a coordinate plane.',
        icon: '⭕',
        example: 'Any point $(x, y)$ on the unit circle corresponds to $(\\cos\\theta, \\sin\\theta)$.',
        realLifeExample: 'The fundamental tool used to define sine and cosine for angles greater than 90° or less than 0°.',
    },
    {
        word: 'Period',
        def: 'The length of the smallest interval over which a function repeats its values.',
        icon: '🔁',
        example: 'The period of $\\sin(x)$ and $\\cos(x)$ is $2\\pi$. The period of $\\tan(x)$ is $\\pi$.',
        realLifeExample: 'The time it takes for a pendulum to complete one full swing back and forth is its period.',
    },
    {
        word: 'Amplitude',
        def: 'Half the distance between the maximum and minimum values of a periodic wave.',
        icon: '🌊',
        example: 'For $y = 3 \\sin(x)$, the amplitude is 3.',
        realLifeExample: 'In sound waves, amplitude determines volume (loudness). In ocean waves, it determines the height of the swell.',
    },
    {
        word: 'Odd/Even Functions',
        def: 'Even functions are symmetric across the y-axis ($f(-x) = f(x)$). Odd functions have rotational symmetry about the origin ($f(-x) = -f(x)$).',
        icon: '🦋',
        example: 'Cosine is even: $\\cos(-\\theta) = \\cos(\\theta)$. Sine is odd: $\\sin(-\\theta) = -\\sin(\\theta)$.',
        realLifeExample: 'Understanding symmetry halves the amount of work needed to graph or evaluate these functions.',
    },
    {
        word: 'Principal Solution',
        def: 'The solution(s) to a trigonometric equation that fall within one specific interval, usually $[0, 2\\pi)$ for sine and cosine.',
        icon: '🔑',
        example: 'For $\\sin x = 1/2$, the principal solutions are $x = \\pi/6$ and $x = 5\\pi/6$.',
        realLifeExample: 'When you use inverse trig on a calculator, it gives you a principal solution.',
    },
    {
        word: 'Sine Rule',
        def: 'In any triangle, the ratio of a side to the sine of its opposite angle is constant.',
        icon: '📐',
        example: '$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$',
        realLifeExample: 'Used to solve triangles when you know two angles and one side (AAS or ASA).',
    },
    {
        word: 'Cosine Rule',
        def: 'A generalization of the Pythagorean theorem for any triangle, relating the lengths of the sides to the cosine of one of its angles.',
        icon: '📏',
        example: '$a^2 = b^2 + c^2 - 2bc \\cos A$',
        realLifeExample: 'Used to solve triangles when you know two sides and the included angle (SAS) or all three sides (SSS).',
    }
];

export const KEY_IDENTITIES = [
    {
        name: 'ASTC Rule (Signs in Quadrants)',
        desc: 'Quadrant 1: All positive. Q2: Sine positive. Q3: Tangent positive. Q4: Cosine positive.',
        formula: '\\text{Add Sugar To Coffee}'
    },
    {
        name: 'Sum and Difference Formulas',
        desc: 'Formulas for expanding trig functions of sums or differences of two angles.',
        formula: '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B'
    },
    {
        name: 'Double Angle Formulas',
        desc: 'Special cases of the sum formulas when both angles are the same.',
        formula: '\\sin(2A) = 2\\sin A \\cos A, \\quad \\cos(2A) = \\cos^2 A - \\sin^2 A'
    },
    {
        name: 'General Solutions',
        desc: 'Formulas to find ALL solutions to an equation, incorporating the period.',
        formula: '\\sin \\theta = \\sin \\alpha \\implies \\theta = n\\pi + (-1)^n \\alpha'
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'What is the period of the function y = sin(x)?',
        options: ['π', '2π', 'π/2', '4π'],
        correct: 1
    },
    {
        id: 2,
        q: 'Which trigonometric function is an EVEN function?',
        options: ['Sine', 'Tangent', 'Cosine', 'Cosecant'],
        correct: 2
    },
    {
        id: 3,
        q: 'In which quadrant are BOTH sine and cosine negative?',
        options: ['Quadrant 1', 'Quadrant 2', 'Quadrant 3', 'Quadrant 4'],
        correct: 2
    },
    {
        id: 4,
        q: 'How many radians are in a full circle (360 degrees)?',
        options: ['π', '2π', 'π/2', '4π'],
        correct: 1
    },
    {
        id: 5,
        q: 'Which rule do you use to solve a triangle if you are given all 3 sides (SSS)?',
        options: ['ASTC Rule', 'Sine Rule', 'Cosine Rule', 'Tangent Rule'],
        correct: 2
    }
];
