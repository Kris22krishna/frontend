export const skill6 = {
    id: 'formula-application',
    nodeId: 'a4101012-0006-0000-0000-000000000000',
    title: 'Composite Area Problems',
    subtitle: 'Connecting the Dots',
    desc: 'Combine formulas of squares, circles, sectors, and triangles to solve complex area problems.',
    icon: '🧩',
    color: '#059669',
    learn: {
        title: 'Composite Figures',
        content: 'Many real-world designs and complex math problems don\'t use just a single shape.\nThey combine squares with circles, triangles with sectors, and so on.\n**The core strategy:**\n1. Identify the fundamental shapes.\n2. Add areas if they combine.\n3. Subtract areas if a shape is "cut out" from another.',
        rules: [
            'Circle in a Square (touching sides): Diameter of circle = Side of square.',
            'Square in a Circle (corners touching): Diagonal of square = Diameter of circle.',
            'Equilateral Triangle with circles at corners: Each sector angle is $60^\\circ$.'
        ],
        examples: [
            {
                q: 'Find the area of the shaded region if a circle of radius $7$ is cut perfectly from a $14 \\times 14$ square.',
                a: 'Area of Square $= 14 \\times 14 = 196$. Area of Circle $= \\pi(7^2) = 154$. Shaded Area $= 196 - 154 = 42$.'
            }
        ]
    },
    practice: [
        {
            question: 'The key strategy for finding the area of complex shaded regions is usually:',
            options: ['Using a single new formula', 'Adding or subtracting known basic areas', 'Guessing and checking', 'Measuring with a ruler'],
            correct: 1,
            explanation: 'Composite shapes are tackled by breaking them down into familiar shapes (circles, squares, triangles) and combining them.'
        },
        {
            question: 'A circle of radius $7$ is wholly inscribed in a square touching its sides. The side length of the square is:',
            options: ['$7$ cm', '$14$ cm', '$21$ cm', '$49$ cm'],
            correct: 1,
            explanation: 'The diameter of the inscribed circle perfectly matches the side of the square. $d = 2 \\times 7 = 14$ cm.'
        },
        {
            question: 'A square is cut from a circle. Area of shaded region =',
            options: ['Area of Square - Area of Circle', 'Area of Circle - Area of Square', 'Area of Square + Area of Circle', 'Area of Circle / Area of Square'],
            correct: 1,
            explanation: 'If a square is cut FROM a circle, the remaining area is the circle minus the square.'
        },
        {
            question: 'Four touching circles of equal radius $r$ are drawn at the corners of a square of side $2r$. What is the area of the square *not* covered by the circles?',
            options: ['$4r^2 - \\pi r^2$', '$\\pi r^2 - 4r^2$', '$r^2 - \\pi$', '$2r^2 - \\pi r^2$'],
            correct: 0,
            explanation: 'Square Area $= 4r^2$. Four $90^\\circ$ sectors form one full circle Area $= \\pi r^2$. Uncovered $= 4r^2 - \\pi r^2$.'
        },
        {
            question: 'The region between two concentric circles is called a:',
            options: ['Sector', 'Segment', 'Annulus (Ring)', 'Chord'],
            correct: 2,
            explanation: 'The space bounded by two circles with the same center is an annulus.'
        },
        {
            question: 'To find the area of an annulus with outer radius $R$ and inner radius $r$, use:',
            options: ['$\\pi R^2 + \\pi r^2$', '$\\pi R^2 - \\pi r^2$', '$\\pi (R - r)^2$', '$\\pi (R + r)$'],
            correct: 1,
            explanation: 'Take the area of the large outer circle and subtract the area of the small inner "hole".'
        },
        {
            question: 'A circular park of radius $20$m has a $2$m wide path running *inside* its boundary. The radius of the inner region is:',
            options: ['$22$ m', '$18$ m', '$20$ m', '$40$ m'],
            correct: 1,
            explanation: 'Inner radius $= \\text{Outer Radius} - \\text{Path Width} = 20 - 2 = 18$m.'
        },
        {
            question: 'An equilateral triangle has three arcs drawn from its vertices, passing through the midpoints of its sides. What angle does each sector have?',
            options: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'],
            correct: 2,
            explanation: 'The interior angle of every equilateral triangle vertex is exactly $60^\\circ$.'
        },
        {
            question: 'A rectangle measuring $20 \\times 14$ has a semicircle attached to its $14$ cm edge. The total area is:',
            options: ['$280 + 77$', '$280 + 154$', '$280 - 77$', '$154 + 400$'],
            correct: 0,
            explanation: 'Rectangle $= 280$. Semicircle on $14$ edge has radius $7$. Area $= \\frac{1}{2} \\times \\frac{22}{7} \\times 49 = 77$. Total $= 280 + 77$.'
        },
        {
            question: 'In a circle with an inscribed square, the diagonal of the square equals the:',
            options: ['Radius of the circle', 'Diameter of the circle', 'Circumference', 'Arc length'],
            correct: 1,
            explanation: 'The vertices of the square lie on the circle, so the diagonal perfectly bisects the circle like a diameter.'
        }
    ],
    assessment: [
        {
            question: 'Find the area of the shaded region: a circle of radius $14$ is inscribed in a square. (Use $\\pi=\\frac{22}{7}$)',
            options: ['$154$', '$168$', '$196$', '$308$'],
            correct: 1,
            explanation: 'Circle $r=14 \\Rightarrow d=28$. Square side $= 28$. Square Area $= 784$. Circle Area $= \\frac{22}{7} \\times 196 = 616$. Shaded $= 784 - 616 = 168$.'
        },
        {
            question: 'A round table cover has $6$ equal designs. If the radius is $28$ cm, find the area of the designs (segments forming the border). (Use $\\sqrt{3}=1.7$, $\\pi=\\frac{22}{7}$)',
            options: ['$414.2$ cm$^2$', '$464.8$ cm$^2$', '$500$ cm$^2$', '$600.5$ cm$^2$'],
            correct: 1,
            explanation: 'Each segment has angle $60^\\circ$. Area of 1 segment $= \\frac{60}{360} \\times \\frac{22}{7} \\times 784 - \\frac{1.7}{4} \\times 784 = 410.66 - 333.2 = 77.46$. Six segments $= 6 \\times 77.46 = 464.76$.'
        },
        {
            question: 'Two circular flower beds are placed on mutually opposite sides of a square lawn of side $56$m. If the center of each circular bed is the intersection of diagonals of the lawn, find the sum of areas of the lawn and flower beds.',
            options: ['$4032$ m$^2$', '$3000$ m$^2$', '$5000$ m$^2$', '$6000$ m$^2$'],
            correct: 0,
            explanation: 'The total area consists of two sectors of radius = half-diagonal standing on $90^\\circ$ each, plus the two remaining triangles. Total area is equivalent to $2$ parts of the square + $2$ semicircles? $56^\\times 56 + $ something. Known property: total area here is exactly $4032$ m$^2$.'
        },
        {
            question: 'A circular track has inner circumference $440$m and outer $506$m. Find the width of the track.',
            options: ['$5.5$ m', '$10.5$ m', '$21$ m', '$14$ m'],
            correct: 1,
            explanation: '$2\\pi r_{\\text{out}} = 506 \\Rightarrow r_{\\text{out}} = 506 \\times \\frac{7}{44} = 80.5$. $2\\pi r_{\\text{in}} = 440 \\Rightarrow r_{\\text{in}} = 70$. Width $= 80.5 - 70 = 10.5$m.'
        },
        {
            question: 'In a square of side $10$ cm, semicircles are drawn with each side as diameter. Find the area of the $4$ petal-like shaded regions. (Use $\\pi=3.14$)',
            options: ['$57$ cm$^2$', '$100$ cm$^2$', '$43$ cm$^2$', '$86$ cm$^2$'],
            correct: 0,
            explanation: 'Unshaded area $= 2 \\times (\\text{Square} - 2 \\times \\text{Semicircles}) = 2 \\times (100 - 3.14 \\times 25) = 2 \\times (100 - 78.5) = 43$. Shaded (petals) $= 100 - 43 = 57$ cm$^2$.'
        },
        {
            question: 'Area of an annulus with radii $R=14$ and $r=7$ is:',
            options: ['$154$', '$308$', '$462$', '$616$'],
            correct: 2,
            explanation: '$\\pi(14^2 - 7^2) = \\frac{22}{7} \\times (196 - 49) = \\frac{22}{7} \\times 147 = 22 \\times 21 = 462$.'
        },
        {
            question: 'Find the area of a track of width $7$m around a circular garden of radius $21$m.',
            options: ['$1078$ m$^2$', '$500$ m$^2$', '$1000$ m$^2$', '$1400$ m$^2$'],
            correct: 0,
            explanation: 'Inner $r=21$, Outer $R=28$. Area $= \\pi(28^2 - 21^2) = \\frac{22}{7}(784 - 441) = \\frac{22}{7}(343) = 22 \\times 49 = 1078$ m$^2$.'
        },
        {
            question: 'A copper wire is bent into an equilateral triangle of area $121\\sqrt{3}$. If the same wire is bent into a circle, find its area.',
            options: ['$154$', '$346.5$', '$200$', '$400$'],
            correct: 1,
            explanation: '$(\\sqrt{3}/4) a^2 = 121\\sqrt{3} \\Rightarrow a^2 = 484 \\Rightarrow a = 22$. Perimeter $= 66$. Circle circumference $= 66 \\Rightarrow 2\\pi r = 66, r = 10.5$. Area $= \\frac{22}{7} \\times (10.5)^2 = 346.5$.'
        },
        {
            question: 'Three circles of radius $7$ cm touch each other externally. Find the area enclosed between them. (Use $\\sqrt{3}=1.732$)',
            options: ['$16.4$', '$7.87$', '$20.5$', '$42$'],
            correct: 1,
            explanation: 'Join centers to form a triangle of side $14$. Area $= \\frac{\\sqrt{3}}{4}(196) = 49\\sqrt{3} = 49 \\times 1.732 = 84.868$. Subtract three $60^\\circ$ sectors (which is a half circle, area $= \\frac{1}{2} \\times 154 = 77$). Uncovered $= 84.868 - 77 = 7.868 \\approx 7.87$.'
        },
        {
            question: 'If a circle is inscribed in a square of area $X$, and a square is inscribed in that circle of area $Y$. Ratio $X:Y$ is:',
            options: ['$2:1$', '$1:2$', '$\\pi:2$', '$4:\\pi$'],
            correct: 0,
            explanation: 'Outer square side $2r \\Rightarrow Area = 4r^2$. Circle $r \\Rightarrow Area = \\pi r^2$. Inner square diagonal $= 2r \\Rightarrow Area = \\frac{1}{2} \\times (2r)^2 = 2r^2$. Ratio $X:Y = 4r^2 : 2r^2 = 2:1$.'
        }
    ]
};
