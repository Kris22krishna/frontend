export const TERMS = [
    {
        name: 'Circle & Radius',
        def: 'A set of all points in a plane that are at a given distance (radius) from a fixed point (center).',
        examples: [
            'Center $O$, Radius $r = 5$ cm',
            'Diameter $d = 2r = 10$ cm'
        ],
        inUse: 'Knowing the radius is the starting point for all circular area and length calculations.',
        memory: 'Radius represents a direct straight line from the center to the edge.',
        icon: '⭕',
        color: '#2563eb'
    },
    {
        name: 'Arc Length',
        def: 'A continuous portion of the circumference of a circle. Its length depends on the radius and the angle it subtends at the center.',
        examples: [
            'Minor arc: Shorter than a semicircle.',
            'Major arc: Longer than a semicircle.'
        ],
        inUse: 'Used to measure the curved boundary distance.',
        memory: 'Think of an arc as a slice of the crust of a pizza.',
        icon: '🌊',
        color: '#0891b2'
    },
    {
        name: 'Sector',
        def: 'The region enclosed by two radii and the corresponding arc.',
        examples: [
            'Minor sector: Angle $\\theta < 180^\\circ$',
            'Major sector: Angle exactly $360^\\circ - \\theta$'
        ],
        inUse: 'Finding the area covered by a sweeping wiper blade or a piece of pie.',
        memory: 'A sector looks exactly like a slice of pie or pizza.',
        icon: '🍕',
        color: '#7c3aed'
    },
    {
        name: 'Chord & Segment',
        def: 'A chord is a line connecting two points on the circle. A segment is the region between a chord and its corresponding arc.',
        examples: [
            'Minor segment: Smaller region cut by the chord.',
            'Major segment: Larger region cut by the chord.'
        ],
        inUse: 'Used when a circle is cut by a straight line instead of radii.',
        memory: 'A segment is a slice cut straight across, not from the center.',
        icon: '🔪',
        color: '#ea580c'
    },
    {
        name: 'Central Angle ($\\theta$)',
        def: 'The angle formed at the center of the circle by two radii.',
        examples: [
            'Right angle: $90^\\circ$ forms a quadrant.',
            'Straight line: $180^\\circ$ forms a semicircle.'
        ],
        inUse: 'The central angle tells you what fraction of the whole circle you are looking at.',
        memory: '$\\frac{\\theta}{360}$ is the magic fraction for all formulas.',
        icon: '📐',
        color: '#e11d48'
    }
];

export const FIVE_RULES = [
    {
        num: '1',
        title: 'The Fraction Rule for Area',
        rule: 'Area of a sector of angle $\\theta = \\frac{\\theta}{360} \\times \\pi r^2$',
        detail: 'Since the whole circle area is $\\pi r^2$, a sector is just a fraction of that total area based on its central angle.',
        examples: [
            'If $\\theta = 90^\\circ$, area is $\\frac{1}{4} \\pi r^2$',
            'If $\\theta = 60^\\circ$, area is $\\frac{1}{6} \\pi r^2$'
        ],
        tip: 'Always simplify the fraction $\\frac{\\theta}{360}$ before multiplying.',
        icon: 'pie-chart',
        emoji: '📊',
        color: '#2563eb'
    },
    {
        num: '2',
        title: 'The Fraction Rule for Arc Length',
        rule: 'Length of an arc of angle $\\theta = \\frac{\\theta}{360} \\times 2 \\pi r$',
        detail: 'Just like area, the arc length is a fraction of the total perimeter (circumference) of the circle.',
        examples: [
            '$\\theta = 180^\\circ$, length is $\\pi r$ (semicircle arc)'
        ],
        tip: 'Make sure not to confuse $2\\pi r$ (length) with $\\pi r^2$ (area).',
        icon: 'ruler',
        emoji: '📏',
        color: '#0891b2'
    },
    {
        num: '3',
        title: 'The Segment Area Subtraction',
        rule: 'Area of segment = Area of corresponding sector - Area of corresponding triangle',
        detail: 'To find the region cut precisely by a chord, compute the full sector first, then remove the triangle formed by the radii and the chord.',
        examples: [
            'Sector Area = $50$',
            'Triangle Area = $20$',
            'Segment Area = $50 - 20 = 30$'
        ],
        tip: 'If $\\theta = 90^\\circ$, the triangle area is simply $\\frac{1}{2} \\times r \\times r$.',
        icon: 'minus',
        emoji: '✂️',
        color: '#16a34a'
    },
    {
        num: '4',
        title: 'The Major/Minor Complement',
        rule: 'Area of major region = Total circle area - Area of minor region',
        detail: 'Instead of using large reflex angles like $300^\\circ$, you can just calculate the small minor region and subtract it from the whole circle.',
        examples: [
            'Circle area = $100$',
            'Minor sector = $20$',
            'Major sector = $100 - 20 = 80$'
        ],
        tip: 'This applies to both sectors and segments!',
        icon: 'pie-chart',
        emoji: '🔄',
        color: '#ca8a04'
    },
    {
        num: '5',
        title: 'Handling $\\pi$ Efficiently',
        rule: 'Use $\\pi = \\frac{22}{7}$ unless stated otherwise.',
        detail: 'Most exam problems are designed to let the radius or angle multiply cleanly with $\\frac{22}{7}$ or $3.14$.',
        examples: [
            'If $r$ is a multiple of $7$, use $\\frac{22}{7}$.',
            'If $r$ or $\\theta$ ends in $0$, $3.14$ might be easier.'
        ],
        tip: 'Keep $\\pi$ as a symbol until the very last step to prevent rounding errors.',
        icon: 'hash',
        emoji: '🧮',
        color: '#dc2626'
    }
];

export const VOCAB_QUIZ = [
    {
        question: 'What do we call the region enclosed by two radii and an arc?',
        options: ['Segment', 'Sector', 'Chord', 'Diameter'],
        correct: 1,
        explanation: 'A sector is the "pizza slice" shape enclosed by two radii and the corresponding arc.'
    },
    {
        question: 'Which of the following describes a segment of a circle?',
        options: ['Region between two radii', 'Region enclosed by a chord and an arc', 'The longest chord', 'Distance around the circle'],
        correct: 1,
        explanation: 'A segment is formed by cutting the circle straight across with a chord, separating an arc and the chord.'
    },
    {
        question: 'The length of an arc can be determined if you know:',
        options: ['Radius and chord length', 'Radius and central angle', 'Area of triangle', 'Diameter alone'],
        correct: 1,
        explanation: 'Arc length equals $\\frac{\\theta}{360} \\times 2 \\pi r$, which requires the central angle $\\theta$ and radius $r$.'
    },
    {
        question: 'How do you find the area of a major sector?',
        options: ['Subtract minor sector area from circle area', 'Add circle area to minor sector', 'Divide minor sector by 2', 'Subtract triangle area from minor sector'],
        correct: 0,
        explanation: 'Major and minor sectors perfectly combine to form the total area of the circle.'
    },
    {
        question: 'If the central angle is $90^\\circ$, what fraction of the circle is the sector?',
        options: ['Half', 'One-third', 'One-fourth', 'One-sixth'],
        correct: 2,
        explanation: '$\\frac{90}{360} = \\frac{1}{4}$.'
    }
];
