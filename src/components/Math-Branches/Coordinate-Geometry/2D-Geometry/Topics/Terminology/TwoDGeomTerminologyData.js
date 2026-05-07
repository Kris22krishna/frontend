export const TERMS = [
    {
        word: 'Cartesian Plane',
        def: 'A two-dimensional plane formed by two perpendicular number lines — the x-axis (horizontal) and y-axis (vertical) — intersecting at the origin (0, 0).',
        icon: '📊',
        example: 'The point $(3, 4)$ is located 3 units right and 4 units up from the origin.',
        realLifeExample: 'Every graph you see in newspapers, textbooks, or dashboards uses a Cartesian plane to plot data points.',
    },
    {
        word: 'Origin',
        def: 'The point where the x-axis and y-axis intersect. Its coordinates are always $(0, 0)$.',
        icon: '🎯',
        example: 'All distances and positions on the coordinate plane are measured relative to the origin.',
        realLifeExample: 'In GPS systems, a reference point (like the centre of a city) acts as the "origin" from which all distances are measured.',
    },
    {
        word: 'Quadrant',
        def: 'The four regions created when the x-axis and y-axis divide the Cartesian plane. They are numbered I to IV counter-clockwise starting from the top-right.',
        icon: '🔢',
        example: 'Q1: $(+,+)$, Q2: $(-,+)$, Q3: $(-,-)$, Q4: $(+,-)$.',
        realLifeExample: 'Radar screens divide the view into quadrants to track objects in different sectors.',
    },
    {
        word: 'Abscissa & Ordinate',
        def: 'The abscissa is the x-coordinate (horizontal distance from the y-axis) and the ordinate is the y-coordinate (vertical distance from the x-axis) of a point.',
        icon: '📐',
        example: 'For the point $(5, -3)$: abscissa = 5, ordinate = −3.',
        realLifeExample: 'When reading a chart, you read the horizontal value first (abscissa) then the vertical value (ordinate).',
    },
    {
        word: 'Distance Formula',
        def: 'The formula to calculate the straight-line distance between two points $(x_1, y_1)$ and $(x_2, y_2)$: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.',
        icon: '📏',
        example: 'Distance between $(1,2)$ and $(4,6)$: $d = \\sqrt{9+16} = \\sqrt{25} = 5$.',
        realLifeExample: 'Delivery apps use the distance formula (extended to real coordinates) to estimate straight-line distances between you and a restaurant.',
    },
    {
        word: 'Midpoint Formula',
        def: 'The midpoint of a line segment joining $(x_1, y_1)$ and $(x_2, y_2)$ is $M = \\left(\\frac{x_1+x_2}{2},\\; \\frac{y_1+y_2}{2}\\right)$.',
        icon: '⚖️',
        example: 'Midpoint of $(2, 4)$ and $(6, 8)$ is $\\left(\\frac{2+6}{2}, \\frac{4+8}{2}\\right) = (4, 6)$.',
        realLifeExample: 'Finding the centre of a bridge span between two towers requires the midpoint formula.',
    },
    {
        word: 'Section Formula',
        def: 'If a point $P$ divides the line segment joining $(x_1,y_1)$ and $(x_2,y_2)$ in the ratio $m:n$, then $P = \\left(\\frac{mx_2+nx_1}{m+n},\\; \\frac{my_2+ny_1}{m+n}\\right)$.',
        icon: '✂️',
        example: 'Point dividing $(1,2)$ and $(4,5)$ in ratio $2:1$: $P = \\left(\\frac{8+1}{3}, \\frac{10+2}{3}\\right) = (3, 4)$.',
        realLifeExample: 'Engineers use the section formula to place support pillars at specific ratios along a bridge.',
    },
    {
        word: 'Collinear Points',
        def: 'Three or more points are collinear if they all lie on the same straight line. This can be checked if the area of the triangle formed by them equals zero.',
        icon: '🔗',
        example: 'Points $(1,1)$, $(2,2)$, $(3,3)$ are collinear because they all lie on $y = x$.',
        realLifeExample: 'Checking if fence posts are perfectly aligned along a straight boundary uses the concept of collinearity.',
    },
];

export const KEY_IDENTITIES = [
    {
        name: 'Distance Formula (Pythagorean)',
        desc: 'The distance between two points on the Cartesian plane is derived directly from the Pythagorean theorem by forming a right triangle with horizontal and vertical legs.',
        formula: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}'
    },
    {
        name: 'Midpoint Formula',
        desc: 'The midpoint is the average of the x-coordinates and the average of the y-coordinates. It gives the exact centre of a line segment.',
        formula: 'M = \\left(\\frac{x_1 + x_2}{2},\\; \\frac{y_1 + y_2}{2}\\right)'
    },
    {
        name: 'Section Formula (Internal Division)',
        desc: 'When a point P divides a segment AB internally in the ratio m:n, its coordinates are weighted averages of the endpoints.',
        formula: 'P = \\left(\\frac{mx_2 + nx_1}{m+n},\\; \\frac{my_2 + ny_1}{m+n}\\right)'
    },
    {
        name: 'Area of Triangle',
        desc: 'The area of a triangle with vertices $(x_1,y_1)$, $(x_2,y_2)$, $(x_3,y_3)$ can be computed using the coordinate formula. If the area is zero, the points are collinear.',
        formula: 'A = \\frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|'
    },
    {
        name: 'Distance from Origin',
        desc: 'The distance of any point $(x, y)$ from the origin $(0, 0)$ simplifies to the square root of the sum of squares of its coordinates.',
        formula: 'd = \\sqrt{x^2 + y^2}'
    },
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'In which quadrant does the point (−3, 5) lie?',
        options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
        correct: 1
    },
    {
        id: 2,
        q: 'What is the distance between the origin and the point (3, 4)?',
        options: ['7', '12', '5', '25'],
        correct: 2
    },
    {
        id: 3,
        q: 'The midpoint of (2, 8) and (6, 4) is:',
        options: ['(8, 12)', '(4, 6)', '(3, 5)', '(2, 2)'],
        correct: 1
    },
    {
        id: 4,
        q: 'The x-coordinate of a point is also called:',
        options: ['Ordinate', 'Origin', 'Abscissa', 'Quadrant'],
        correct: 2
    },
    {
        id: 5,
        q: 'Three points are collinear when the area of the triangle formed by them is:',
        options: ['1', '3', 'Maximum', '0'],
        correct: 3
    },
];
