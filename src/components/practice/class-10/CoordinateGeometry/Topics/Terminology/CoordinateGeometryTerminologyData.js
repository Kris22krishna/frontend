export const TERMS = [
    {
        name: 'Cartesian Plane',
        color: '#2563eb',
        icon: '📈',
        def: 'A plane defined by a horizontal number line (x-axis) and a vertical number line (y-axis) intersecting at a right angle at their zero points.',
        examples: ['The point $(3, 4)$ lies in the first quadrant.', 'The origin is at $(0, 0)$'],
        inUse: 'Used to define the precise position of any point in 2D space.',
        memory: 'The grid where algebra meets geometry.'
    },
    {
        name: 'Coordinates',
        color: '#0d9488',
        icon: '📍',
        def: 'An ordered pair of numbers $(x, y)$ that defines the exact location of a point on the Cartesian plane.',
        examples: ['x-coordinate (abscissa): distance from y-axis', 'y-coordinate (ordinate): distance from x-axis'],
        inUse: 'The first number is always the horizontal position, the second is the vertical.',
        memory: 'Alphabetical order: $x$ then $y$.'
    },
    {
        name: 'Distance Formula',
        color: '#f59e0b',
        icon: '📏',
        def: 'A formula to find the straight-line distance between two points $(x_1, y_1)$ and $(x_2, y_2)$ using the Pythagorean theorem.',
        examples: ['$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$'],
        inUse: 'Used to prove shapes are squares, rectangles, or isosceles triangles by finding side lengths.',
        memory: 'Square the differences, add them, take the square root.'
    },
    {
        name: 'Section Formula',
        color: '#ec4899',
        icon: '✂️',
        def: 'Finds the coordinates of a point $P(x,y)$ that divides the line segment joining $A(x_1,y_1)$ and $B(x_2,y_2)$ in the ratio $m_1:m_2$.',
        examples: ['$x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}$', '$y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$'],
        inUse: 'Crucial for finding how a point splits a segment internally.',
        memory: 'Cross-multiply the ratios with the opposite coordinates.'
    },
    {
        name: 'Midpoint Formula',
        color: '#7c3aed',
        icon: '🎯',
        def: 'A special case of the section formula where the ratio is $1:1$. It finds the exact middle point of a line segment.',
        examples: ['$x = \\frac{x_1 + x_2}{2}$', '$y = \\frac{y_1 + y_2}{2}$'],
        inUse: 'Used to find the center of a circle or prove properties of diagonals in parallelograms.',
        memory: 'Just average the $x$ values and average the $y$ values.'
    },
    {
        name: 'Area of a Triangle',
        color: '#3b82f6',
        icon: '📐',
        def: 'A formula to find the area of a triangle given the coordinates of its three vertices $(x_1, y_1)$, $(x_2, y_2)$, and $(x_3, y_3)$.',
        examples: ['Area $= \\frac{1}{2} |x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$'],
        inUse: 'If the area is zero, the three points are collinear.',
        memory: 'Follow the 1-2-3, 2-3-1, 3-1-2 cycle.'
    },
    {
        name: 'Collinear Points',
        color: '#10b981',
        icon: '➖',
        def: 'Three or more points that lie exactly on the same straight line.',
        examples: ['Points $A, B, C$ are collinear if $AB + BC = AC$ or Area$(\\triangle ABC) = 0$'],
        inUse: 'Use the distance formula or area formula to prove points align perfectly.',
        memory: 'Co-linear = together on a line.'
    },
    {
        name: 'Centroid',
        color: '#ef4444',
        icon: '⚖️',
        def: 'The point where the three medians of a triangle intersect. It is the center of gravity of the triangle.',
        examples: ['$x = \\frac{x_1 + x_2 + x_3}{3}$', '$y = \\frac{y_1 + y_2 + y_3}{3}$'],
        inUse: 'Divides each median in a $2:1$ ratio.',
        memory: 'The average of all three vertices.'
    },
    {
        name: 'Equidistant',
        color: '#8b5cf6',
        icon: '⚖️',
        def: 'A point is equidistant from two other points if the distance to each is exactly the same.',
        examples: ['If $P$ is equidistant from $A$ and $B$, then $PA = PB$.'],
        inUse: 'Usually gives an equation equating two distance formulas (square both sides to drop the root).',
        memory: 'Equal distance.'
    }
];

export const FIVE_RULES = [
    {
        num: 1,
        title: 'Distance Formula is Pythagoras',
        rule: 'The distance between two points is the hypotenuse of a right triangle formed by their horizontal and vertical differences.',
        emoji: '📐',
        color: '#2563eb',
        detail: 'The difference in x-coordinates is the base, and the difference in y-coordinates is the height. Squaring them removes negative signs.',
        examples: ['$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$'],
        tip: 'Always group $x$ with $x$ and $y$ with $y$. Never mix them in the same parenthesis!'
    },
    {
        num: 2,
        title: 'Section Formula: Cross Multiply',
        rule: 'Multiply the ratio parts by the opposite coordinates, not the adjacent ones.',
        emoji: '✖️',
        color: '#0d9488',
        detail: 'In ratio $m_1:m_2$, $m_1$ multiplies $(x_2, y_2)$ and $m_2$ multiplies $(x_1, y_1)$.',
        examples: ['$x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}$'],
        tip: 'Drawing a quick line segment and labeling the ratio $m_1$ on the left and $m_2$ on the right prevents careless swaps.'
    },
    {
        num: 3,
        title: 'Midpoint averages coordinates',
        rule: 'The exact center of a line segment is found by averaging the x-values and averaging the y-values.',
        emoji: '🎯',
        color: '#f59e0b',
        detail: 'Since $m_1=1$ and $m_2=1$, the section formula simplifies to division by 2.',
        examples: ['$(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2})$'],
        tip: 'Add first, then divide by 2. Do not subtract!'
    },
    {
        num: 4,
        title: 'Area relies on cyclic order',
        rule: 'When calculating the area of a triangle, follow the strict cycle 1→2→3 for subscripts.',
        emoji: '🔄',
        color: '#7c3aed',
        detail: 'The pattern is $x_1(y_2 - y_3) \\dots x_2(y_3 - y_1) \\dots x_3(y_1 - y_2)$.',
        examples: ['Area $= \\frac{1}{2} |x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$'],
        tip: 'Write 1, 2, 3 in a circle and follow the arrows to avoid sign errors.'
    },
    {
        num: 5,
        title: 'Collinear means zero area',
        rule: 'If three points lie on the same straight line, the area of the triangle they form is exactly zero.',
        emoji: '➖',
        color: '#ec4899',
        detail: 'You can also prove collinearity by showing $AB + BC = AC$ using the distance formula, but the area formula is often faster.',
        examples: ['If Area $= 0$, points are collinear.'],
        tip: 'When asked to find an unknown variable $k$ for collinear points, set the Area formula to 0 and solve.'
    }
];

export const VOCAB_QUIZ = [
    {
        question: 'Which formula finds the straight-line distance between two points?',
        options: ['Midpoint Formula', 'Section Formula', 'Distance Formula', 'Area Formula'],
        correct: 2,
        explanation: 'The distance formula uses the Pythagorean theorem to find the length between points.'
    },
    {
        question: 'If you want to find the exact center of a segment joining $A(1, 2)$ and $B(3, 4)$, you use the:',
        options: ['Distance Formula', 'Midpoint Formula', 'Area Formula', 'Pythagorean Theorem'],
        correct: 1,
        explanation: 'The midpoint formula averages the x values and y values to find the center.'
    },
    {
        question: 'What is the most characteristic property of collinear points?',
        options: ['They form a right triangle', 'They have the same coordinates', 'The area of the triangle they form is zero', 'They are all on the x-axis'],
        correct: 2,
        explanation: 'Three points that form a straight line enclose no space, so their triangle area is 0.'
    },
    {
        question: 'In the section formula, the ratio $m_1:m_2$ is multiplied by the coordinates connected to them in what pattern?',
        options: ['Direct match ($m_1$ with $x_1$)', 'Cross-multiplication ($m_1$ with $x_2$)', 'Add them all up', 'Multiply $m_1 \\times m_2$'],
        correct: 1,
        explanation: 'The standard section formula cross-multiplies ratio parts with the opposite coordinates.'
    },
    {
        question: 'To find the centroid of a triangle, you:',
        options: ['Average the two longest sides', 'Average all three vertices ($x$ and $y$ separately)', 'Find the perpendicular distance', 'Use the section formula in $1:1$ ratio three times'],
        correct: 1,
        explanation: 'The centroid calculation is simply the arithmetic mean of the three vertices.'
    }
];
