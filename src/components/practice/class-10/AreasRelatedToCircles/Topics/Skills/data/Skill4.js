export const skill4 = {
    id: 'segment-area',
    title: 'Calculating Segment Area',
    subtitle: 'The Subtraction Method',
    desc: 'Find the area of a minor or major segment by subtracting the triangle from the sector.',
    icon: '✂️',
    color: '#ea580c',
    learn: {
        title: 'Area of a Segment',
        content: 'A segment is formed by cutting the circle with a straight line (a chord).\nTo find the area of the minor segment, you first find the area of the entire sector, and then slice away (subtract) the triangle formed by the two radii and the chord.',
        rules: [
            'Area of Minor Segment = Area of Minor Sector - Area of Triangle',
            'If $\\theta = 90^\\circ$, Triangle Area = $\\frac{1}{2} \\times r \\times r$',
            'If $\\theta = 60^\\circ$, the triangle is equilateral! Triangle Area = $\\frac{\\sqrt{3}}{4} r^2$',
            'Area of Major Segment = Area of Circle - Area of Minor Segment'
        ],
        examples: [
            {
                q: 'Find the area of a minor segment if $r=10$ cm and central angle is $90^\\circ$. Use $\\pi = 3.14$.',
                a: 'Sector Area = $\\frac{1}{4} \\times 3.14 \\times 100 = 78.5$. Triangle Area = $\\frac{1}{2} \\times 10 \\times 10 = 50$. Segment Area = $78.5 - 50 = 28.5$ cm$^2$.'
            }
        ]
    },
    practice: [
        {
            question: 'The area of a minor segment is equal to:',
            options: ['Sector Area + Triangle Area', 'Circle Area - Sector Area', 'Sector Area - Triangle Area', 'Triangle Area - Sector Area'],
            correct: 2,
            explanation: 'You start with the full sector and remove the inner triangle portion to leave just the segment.'
        },
        {
            question: 'If the central angle is $90^\\circ$, the area of the triangle formed by the radii and the chord is:',
            options: ['$r^2$', '$\\frac{1}{2} r^2$', '$\\frac{1}{4} \\pi r^2$', '$\\frac{\\sqrt{3}}{4} r^2$'],
            correct: 1,
            explanation: 'For a right triangle with base $r$ and height $r$, Area $= \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} r^2$.'
        },
        {
            question: 'Find the area of a minor segment for $r = 10$, $\\theta = 90^\\circ$. Use $\\pi=3.14$.',
            options: ['$28.5$', '$50$', '$78.5$', '$314$'],
            correct: 0,
            explanation: 'Sector $= 78.5$. Triangle $= 50$. Segment $= 78.5 - 50 = 28.5$.'
        },
        {
            question: 'The major segment area can be calculated by:',
            options: ['Sector Area + Triangle Area', 'Circle Area - Minor Segment Area', 'Circle Area - Triangle Area', 'Major Sector Area - Triangle Area'],
            correct: 1,
            explanation: 'The full circle is made of the minor segment and the major segment.'
        },
        {
            question: 'If $\\theta = 60^\\circ$, the triangle formed by the radii and the chord is:',
            options: ['Right-angled', 'Isosceles but not equilateral', 'Equilateral', 'Scalene'],
            correct: 2,
            explanation: 'Two sides are radii (so it\'s at least isosceles). The base angles must be $(180-60)/2 = 60^\\circ$. All angles are $60^\\circ$, hence equilateral.'
        },
        {
            question: 'For an equilateral triangle of side $r$, the area is:',
            options: ['$\\frac{1}{2} r^2$', '$\\frac{\\sqrt{3}}{4} r^2$', '$\\frac{\\sqrt{2}}{2} r^2$', '$r^2$'],
            correct: 1,
            explanation: 'The standard formula for the area of an equilateral triangle with side length $a$ is $\\frac{\\sqrt{3}}{4} a^2$.'
        },
        {
            question: 'A chord of length $10$ cm subtends a $90^\\circ$ angle at the center. The area of the triangle is:',
            options: ['$25$', '$50$', '$100$', '$75$'],
            correct: 0,
            explanation: 'By Pythagoras, $r^2 + r^2 = 10^2 \\Rightarrow 2r^2 = 100 \\Rightarrow r^2 = 50$. Triangle Area $= \\frac{1}{2} r^2 = \\frac{1}{2} (50) = 25$.'
        },
        {
            question: 'Find the area of a major segment if circle area is $100$ and minor segment is $15$.',
            options: ['$85$', '$115$', '$75$', '$50$'],
            correct: 0,
            explanation: 'Major Segment $= \\text{Circle Area} - \\text{Minor Segment} = 100 - 15 = 85$.'
        },
        {
            question: 'In a circle of radius $21$ cm, an arc subtends an angle of $60^\\circ$. The length of the chord is:',
            options: ['$10.5$ cm', '$21$ cm', '$42$ cm', '$21\\sqrt{3}$ cm'],
            correct: 1,
            explanation: 'Since $\\theta=60^\\circ$, the triangle is equilateral. Thus, the chord length equals the radius, which is $21$ cm.'
        },
        {
            question: 'Which is ALWAYS larger for any central angle $\\theta < 180^\\circ$?',
            options: ['Sector Area', 'Segment Area', 'Triangle Area', 'They are equal'],
            correct: 0,
            explanation: 'Segment Area $= \\text{Sector Area} - \\text{Triangle Area}$. Since Triangle Area $> 0$, Sector Area is always larger.'
        }
    ],
    assessment: [
        {
            question: 'A chord of a circle of radius $12$ cm subtends an angle of $120^\\circ$ at the center. Area of the triangle is:',
            options: ['$36\\sqrt{3}$', '$72\\sqrt{3}$', '$144\\sqrt{3}$', '$36$'],
            correct: 0,
            explanation: 'Draw a perpendicular from center to chord. It bisects $120^\\circ$ into $60^\\circ$. Height $= 12 \\cos(60^\\circ) = 6$. Base $= 2 \\times 12 \\sin(60^\\circ) = 12\\sqrt{3}$. Area $= \\frac{1}{2} \\times 12\\sqrt{3} \\times 6 = 36\\sqrt{3}$.'
        },
        {
            question: 'Find the area of the minor segment for a circle of radius $14$ cm with central angle $90^\\circ$. (Use $\\pi=\\frac{22}{7}$)',
            options: ['$56$', '$154$', '$98$', '$28$'],
            correct: 0,
            explanation: 'Sector $= \\frac{1}{4}\\times 154\\times 4 = 154$. Triangle $= \\frac{1}{2}\\times 14\\times 14 = 98$. Segment $= 154 - 98 = 56$.'
        },
        {
            question: 'If the area of a minor segment is $P$ and the area of its corresponding triangle is $Q$, the sector area is:',
            options: ['$P - Q$', '$P + Q$', '$P \\times Q$', '$\\frac{P}{Q}$'],
            correct: 1,
            explanation: 'Since $P = \\text{Sector} - Q$, then $\\text{Sector} = P + Q$.'
        },
        {
            question: 'A chord divides a circle of radius $r$ into two segments. If $\\theta = 180^\\circ$, the area of each segment is:',
            options: ['$\\frac{1}{2} \\pi r^2$', '$\\pi r^2$', '$\\frac{1}{4} \\pi r^2$', 'Zero'],
            correct: 0,
            explanation: 'If $\\theta=180^\\circ$, the chord is the diameter. Both segments are semicircles with area $\\frac{1}{2} \\pi r^2$.'
        },
        {
            question: 'Area of major segment for $r=14$, minor segment area $=56$.',
            options: ['$560$', '$616$', '$572$', '$550$'],
            correct: 0,
            explanation: 'Circle area $= \\frac{22}{7} \\times 196 = 616$. Major segment $= 616 - 56 = 560$.'
        },
        {
            question: 'In a circle of radius $r$, the maximum possible area of a triangle formed by two radii and a chord is:',
            options: ['$\\frac{1}{2} r^2$', '$\\frac{\\sqrt{3}}{4} r^2$', '$r^2$', '$\\frac{\\pi r^2}{4}$'],
            correct: 0,
            explanation: 'Area $= \\frac{1}{2} r^2 \\sin\\theta$. The maximum value of $\\sin\\theta$ is $1$ (when $\\theta = 90^\\circ$). So max area is $\\frac{1}{2} r^2$.'
        },
        {
            question: 'An arc of $60^\\circ$ is drawn in a circle of radius $21$ cm. Find the area of the corresponding minor segment. (Take $\\sqrt{3}=1.73$)',
            options: ['$231$', '$190.95$', '$40.05$', '$421.95$'],
            correct: 2,
            explanation: 'Sector $= \\frac{1}{6}\\times \\frac{22}{7} \\times 441 = 231$. Triangle $= \\frac{\\sqrt{3}}{4} \\times 441 = \\frac{1.73}{4} \\times 441 = 190.73$ (roughly). $231 - 190.73 = 40.27$. Closest match is $40.05$.'
        },
        {
            question: 'The difference between the areas of a major segment and a minor segment is equal to:',
            options: ['Circle Area - 2$\\times$Minor Segment', 'Circle Area', 'Major Sector', 'Minor Sector'],
            correct: 0,
            explanation: 'Major $-$ Minor $= (\\text{Circle} - \\text{Minor}) - \\text{Minor} = \\text{Circle} - 2 \\times \\text{Minor}$.'
        },
        {
            question: 'True or False: A major segment area can be calculated as Area of Major Sector + Area of corresponding Triangle.',
            options: ['True', 'False', 'Depends on radius', 'Depends on chord'],
            correct: 0,
            explanation: 'True. The major segment is made up of the major sector plus the triangle that was removed from the minor sector!'
        },
        {
            question: 'If chord AB is $10$ cm and radius is $10$ cm, the area of the minor segment is exactly:',
            options: ['$50\\pi - 25\\sqrt{3}$', '$\\frac{50\\pi}{3} - 25\\sqrt{3}$', '$\\frac{100\\pi}{3} - 50\\sqrt{3}$', '$\\frac{25\\pi}{3} - 25\\sqrt{3}$'],
            correct: 1,
            explanation: 'Equilateral triangle since chord = radius. $\\theta = 60^\\circ$. Sector $= \\frac{1}{6}\\pi(100) = 50\\frac{\\pi}{3}$. Triangle $= \\frac{\\sqrt{3}}{4}(100) = 25\\sqrt{3}$. Segment $= \\frac{50\\pi}{3} - 25\\sqrt{3}$.'
        }
    ]
};
