export const TERMS = [
    {
        word: 'Arcsine (sin⁻¹)',
        def: 'The inverse of the sine function. It returns the angle whose sine is a given number. Its domain is $[-1, 1]$ and range is $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$.',
        icon: '📈',
        example: '$\\arcsin(\\frac{1}{2}) = \\frac{\\pi}{6}$ because $\\sin(\\frac{\\pi}{6}) = \\frac{1}{2}$ and $\\frac{\\pi}{6}$ is within the principal range.',
        realLifeExample: 'Used to find the launch angle of a projectile if you know its initial velocity components.',
    },
    {
        word: 'Arccosine (cos⁻¹)',
        def: 'The inverse of the cosine function. Domain is $[-1, 1]$ and range is $[0, \\pi]$.',
        icon: '📉',
        example: '$\\arccos(-\\frac{1}{2}) = \\frac{2\\pi}{3}$.',
        realLifeExample: 'Used in vector mathematics to find the angle between two spatial vectors.',
    },
    {
        word: 'Arctangent (tan⁻¹)',
        def: 'The inverse of the tangent function. Domain is all real numbers ($\\mathbb{R}$) and range is $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$.',
        icon: '↗️',
        example: '$\\arctan(1) = \\frac{\\pi}{4}$.',
        realLifeExample: 'Used extensively in computer graphics (atan2) to determine the angle of rotation from x and y coordinates.',
    },
    {
        word: 'Domain Restriction',
        def: 'The process of limiting the domain of a periodic function so that it passes the horizontal line test and becomes invertible.',
        icon: '✂️',
        example: 'We restrict $\\sin x$ to $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ to define $\\arcsin x$.',
        realLifeExample: 'Like putting blinkers on a horse — we force the function to only "look" at a small, strictly increasing or decreasing section.',
    },
    {
        word: 'Principal Value Branch',
        def: 'The specific restricted range chosen globally by mathematicians for an inverse trigonometric function.',
        icon: '⭐',
        example: 'The principal value branch of $\\arcsin$ is $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$. There are other branches (like $[\\frac{\\pi}{2}, \\frac{3\\pi}{2}]$), but the principal one is standard.',
        realLifeExample: 'It ensures that your calculator gives you the exact same answer as everyone else\'s calculator.',
    }
];

export const KEY_IDENTITIES = [
    {
        name: 'Composition Properties',
        desc: 'Functions undo their inverses, but only within specific domains.',
        formula: '\\sin(\\arcsin x) = x \\text{ for } x \\in [-1, 1] \\\\ \\arcsin(\\sin y) = y \\text{ for } y \\in [-\\frac{\\pi}{2}, \\frac{\\pi}{2}]'
    },
    {
        name: 'Negative Argument Properties (Odd/Even Analogs)',
        desc: 'How negative inputs behave inside inverse functions. Arcsin and arctan pull the negative out. Arccos subtracts from pi.',
        formula: '\\arcsin(-x) = -\\arcsin x \\\\ \\arccos(-x) = \\pi - \\arccos x'
    },
    {
        name: 'Reciprocal Properties',
        desc: 'Relating inverse functions of reciprocals.',
        formula: '\\text{arccsc}(x) = \\arcsin(\\frac{1}{x})'
    },
    {
        name: 'Complementary Angles',
        desc: 'Summing co-functions of the same value always gives 90 degrees.',
        formula: '\\arcsin x + \\arccos x = \\frac{\\pi}{2}'
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'What is the principal value range for $\\arcsin(x)$?',
        options: ['$[0, \\pi]$', '$(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$', '$[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$', '$(0, \\pi)$'],
        correct: 2
    },
    {
        id: 2,
        q: 'What is the value of $\\arccos(-\\frac{1}{2})$?',
        options: ['$-\\frac{\\pi}{3}$', '$\\frac{2\\pi}{3}$', '$\\frac{4\\pi}{3}$', '$\\frac{5\\pi}{3}$'],
        correct: 1
    },
    {
        id: 3,
        q: 'Why does $\\sin(\\arcsin(2))$ have no real solution?',
        options: ['$2$ is not an angle', 'The domain of $\\arcsin$ is $[-1, 1]$', 'It equals $\\pi$', 'The range of sine is $(0, \\infty)$'],
        correct: 1
    },
    {
        id: 4,
        q: 'What does $\\arctan(1) + \\text{arccot}(1)$ equal?',
        options: ['$\\frac{\\pi}{4}$', '$\\frac{\\pi}{2}$', '$\\pi$', '$0$'],
        correct: 1
    }
];
