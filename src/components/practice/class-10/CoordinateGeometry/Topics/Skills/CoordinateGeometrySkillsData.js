export const SKILLS = [
    {
        id: 'distance-formula',
        nodeId: 'a4101007-0001-0000-0000-000000000000',
        title: 'The Distance Formula',
        subtitle: 'Measuring Space',
        desc: 'Calculate the exact straight-line distance between any two points on the Cartesian plane.',
        icon: '📏',
        color: '#2563eb',
        learn: {
            title: 'Pythagoras on a Grid',
            content: `The distance formula is just the Pythagorean theorem adapted for coordinates.
            
To find the distance $d$ between two points $A(x_1, y_1)$ and $B(x_2, y_2)$:
1. Find the horizontal distance: $(x_2 - x_1)$
2. Find the vertical distance: $(y_2 - y_1)$
3. Apply Pythagoras: $d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$
4. Take the square root: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$`,
            rules: [
                'Always subtract coordinates in the same order.',
                'Squaring a negative number makes it positive.',
                'Distance is always a non-negative value.'
            ],
            examples: [
                { q: 'Distance between $(0, 0)$ and $(3, 4)$?', a: '$\\sqrt{(3-0)^2 + (4-0)^2} = \\sqrt{9+16} = \\sqrt{25} = 5$.' },
                { q: 'Distance between $(-1, 2)$ and $(2, -2)$?', a: '$\\sqrt{(2 - (-1))^2 + (-2 - 2)^2} = \\sqrt{3^2 + (-4)^2} = \\sqrt{9+16} = 5$.' }
            ]
        },
        practice: [
            { question: 'The distance formula is derived from:', options: ['Thales theorem', 'Pythagorean theorem', 'Euler formula', 'Area of a triangle'], correct: 1, explanation: 'It uses a right triangle formed by the horizontal and vertical differences.' },
            { question: 'The distance between the origin and $(x, y)$ is:', options: ['$x + y$', '$\\sqrt{x^2 - y^2}$', '$\\sqrt{x^2 + y^2}$', '$xy$'], correct: 2, explanation: 'Using the origin $(0,0)$, the formula simplifies to $\\sqrt{(x-0)^2 + (y-0)^2}$.' },
            { question: 'Find the distance between $(2, 3)$ and $(5, 7)$:', options: ['3', '4', '5', '6'], correct: 2, explanation: '$\\sqrt{(5-2)^2 + (7-3)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = 5$.' },
            { question: 'If the distance between $(a, 0)$ and $(0, 4)$ is 5, then $a$ is:', options: ['Only 3', 'Only -3', '$\\pm 3$', '9'], correct: 2, explanation: '$\\sqrt{(a-0)^2 + (0-4)^2} = 5 \\Rightarrow a^2 + 16 = 25 \\Rightarrow a^2 = 9 \\Rightarrow a = \\pm 3$.' },
            { question: 'The distance between $(-5, 7)$ and $(-1, 4)$ is:', options: ['5', '6', '7', '8'], correct: 0, explanation: '$\\sqrt{(-1 - (-5))^2 + (4 - 7)^2} = \\sqrt{4^2 + (-3)^2} = \\sqrt{16+9} = 5$.' },
            { question: 'Squaring the difference of coordinates ensures that:', options: ['The values are negative', 'The right triangle is similar', 'Direction does not matter', 'Fractions are avoided'], correct: 2, explanation: 'Since $(a-b)^2 = (b-a)^2$, the order of subtraction does not affect the positive distance.' },
            { question: 'Find the distance between $(0, -5)$ and $(0, 5)$:', options: ['0', '5', '10', '25'], correct: 2, explanation: 'Points are on the same vertical line, so distance is $|5 - (-5)| = 10$.' },
            { question: 'The distance of the point $P(2, 3)$ from the x-axis is:', options: ['2', '3', '1', '5'], correct: 1, explanation: 'The distance to the x-axis is the absolute value of the y-coordinate, which is 3.' },
            { question: 'If points $A(0,0)$, $B(3,0)$, and $C(0,4)$ form a triangle, its perimeter is:', options: ['10', '12', '14', '7'], correct: 1, explanation: '$AB=3$, $AC=4$, $BC=5$ (a 3-4-5 right triangle). Perimeter = $3+4+5=12$.' },
            { question: 'Points $(a, a)$, $(-a, -a)$, and $(-\\sqrt{3}a, \\sqrt{3}a)$ form:' , options: ['A right triangle', 'An isosceles triangle', 'An equilateral triangle', 'A straight line'], correct: 2, explanation: 'Calculating the distance between any two pairs of points yields $2\\sqrt{2}a$, so it is equilateral.' }
        ],
        assessment: [
            { question: 'What is the distance between $(6, 8)$ and the origin?', options: ['10', '14', '100', '48'], correct: 0, explanation: '$\\sqrt{6^2 + 8^2} = \\sqrt{36+64} = \\sqrt{100} = 10$.' },
            { question: 'Find the distance between $(1, -3)$ and $(4, 1)$:', options: ['4', '5', '6', '7'], correct: 1, explanation: '$\\sqrt{(4-1)^2 + (1 - (-3))^2} = \\sqrt{3^2 + 4^2} = 5$.' },
            { question: 'If the distance between $(4, k)$ and $(1, 0)$ is 5, find $k$:', options: ['$\\pm 2$', '$\\pm 3$', '$\\pm 4$', '$\\pm 5$'], correct: 2, explanation: '$\\sqrt{(1-4)^2 + (0-k)^2} = 5 \\Rightarrow 9 + k^2 = 25 \\Rightarrow k^2 = 16 \\Rightarrow k = \\pm 4$.' },
            { question: 'The distance of the point $P(4, -3)$ from the y-axis is:', options: ['3', '-3', '4', '5'], correct: 2, explanation: 'The distance to the y-axis is the absolute value of the x-coordinate, which is 4.' },
            { question: 'Points $A(3, 2)$, $B(-2, -3)$, and $C(2, 3)$ form a triangle. It is:', options: ['Equilateral', 'Isosceles', 'Right angled', 'None of these'], correct: 3, explanation: 'Calculating all three sides $AB$, $BC$, and $AC$ confirms they are all different lengths, so it is a scalene triangle.' },
            { question: 'Find the perimeter of a triangle with vertices $(0,4)$, $(0,0)$, and $(3,0)$:', options: ['7', '8', '11', '12'], correct: 3, explanation: 'The side lengths are 3, 4, and 5. Perimeter = $3+4+5 = 12$.' },
            { question: 'The distance between $(\\cos \\theta, \\sin \\theta)$ and $(\\sin \\theta, -\\cos \\theta)$ is:', options: ['$\\sqrt{2}$', '2', '1', '$\\sqrt{3}$'], correct: 0, explanation: 'Using the distance formula and $\\sin^2 \\theta + \\cos^2 \\theta = 1$, it simplifies to $\\sqrt{2}$.' },
            { question: 'If the point $(x, y)$ is equidistant from $(7, 1)$ and $(3, 5)$, then:', options: ['$x + y = 2$', '$x - y = 4$', '$x - y = 2$', '$x + y = 4$'], correct: 2, explanation: 'Equating squares of distances: $(x-7)^2 + (y-1)^2 = (x-3)^2 + (y-5)^2$. This simplifies to $x - y = 2$.' },
            { question: 'The point on the x-axis which is equidistant from $(2, -5)$ and $(-2, 9)$ is:', options: ['(-7, 0)', '(7, 0)', '(-8, 0)', '(8, 0)'], correct: 0, explanation: 'Let the point be $(x, 0)$. Then $(x-2)^2 + (-5)^2 = (x+2)^2 + 9^2$. Solving yields $x = -7$.' },
            { question: 'The distance between the points $(a+b, a-b)$ and $(a-b, a+b)$ is:', options: ['$2\\sqrt{a^2+b^2}$', '$2\\sqrt{a^2-b^2}$', '$a^2+b^2$', '$2b\\sqrt{2}$'], correct: 3, explanation: '$\\sqrt{((a-b)-(a+b))^2 + ((a+b)-(a-b))^2} = \\sqrt{(-2b)^2 + (2b)^2} = \\sqrt{8b^2} = 2b\\sqrt{2}$.' }
        ]
    },
    {
        id: 'section-formula',
        nodeId: 'a4101007-0002-0000-0000-000000000000',
        title: 'The Section Formula',
        subtitle: 'Dividing the Line',
        desc: 'Find the exact coordinates of a point that divides a line segment in a specific ratio.',
        icon: '✂️',
        color: '#0d9488',
        learn: {
            title: 'Weighted Averages',
            content: `The section formula finds a point $P(x, y)$ that divides a segment into a ratio $m_1:m_2$. It acts like a weighted average.
             
Given points $A(x_1, y_1)$ and $B(x_2, y_2)$:
$$x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}$$
$$y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$$

Tip: The "cross-multiplication" trick helps you remember which ratio goes with which coordinate.`,
            rules: [
                'Multiply the first ratio part by the second point\'s coordinates.',
                'Multiply the second ratio part by the first point\'s coordinates.',
                'Add the products, then divide by the sum of the ratio parts.'
            ],
            examples: [
                { q: 'Divide $(2,3)$ and $(6,11)$ in ratio $1:3$ (internally)', a: '$x = \\frac{1(6) + 3(2)}{1+3} = \\frac{12}{4} = 3$. $y = \\frac{1(11) + 3(3)}{1+3} = \\frac{20}{4} = 5$. Point is $(3, 5)$.' },
                { q: 'What is the midpoint formula?', a: 'When $m_1:m_2 = 1:1$, the formula simplifies to $(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2})$.' }
            ]
        },
        practice: [
            { question: 'The coordinates of the midpoint of the line segment joining $(x_1, y_1)$ and $(x_2, y_2)$ are:', options: ['$(\\frac{x_1-x_2}{2}, \\frac{y_1-y_2}{2})$', '$(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})$', '$(x_1+x_2, y_1+y_2)$', '$(\\frac{x_1+y_1}{2}, \\frac{x_2+y_2}{2})$'], correct: 1, explanation: 'The midpoint is simply the average of the coordinates.' },
            { question: 'Find the midpoint of the segment connecting $(2, 4)$ and $(6, 8)$:', options: ['(3, 5)', '(4, 6)', '(8, 12)', '(5, 7)'], correct: 1, explanation: '$x = \\frac{2+6}{2} = 4$, $y = \\frac{4+8}{2} = 6$.' },
            { question: 'The point which divides the line segment joining the points $(7, -6)$ and $(3, 4)$ in ratio $1:2$ internally lies in the:', options: ['I quadrant', 'II quadrant', 'III quadrant', 'IV quadrant'], correct: 3, explanation: 'Using the formula: $x = \\frac{1(3)+2(7)}{3} = \\frac{17}{3}$. $y = \\frac{1(4)+2(-6)}{3} = \\frac{-8}{3}$. A positive $x$ and negative $y$ puts it in Quadrant IV.' },
            { question: 'If point $P(x, y)$ divides segment $AB$ in ratio $k:1$, then $x$ is:', options: ['$\\frac{k x_2 + x_1}{k+1}$', '$\\frac{k x_1 + x_2}{k+1}$', '$\\frac{x_1 + x_2}{k}$', '$\\frac{k x_2 - x_1}{k-1}$'], correct: 0, explanation: 'Substituting $m_1=k$ and $m_2=1$ into the section formula yields this result.' },
            { question: 'What is the ratio in which the x-axis divides the line segment joining the points $(5, 3)$ and $(-3, -2)$?', options: ['2:3', '3:2', '1:2', '2:1'], correct: 1, explanation: 'On the x-axis, $y=0$. Using $k:1$ ratio: $0 = \\frac{k(-2) + 1(3)}{k+1} \\Rightarrow 2k = 3 \\Rightarrow k = \\frac{3}{2}$, so the ratio is $3:2$.' },
            { question: 'The coordinates of a point $P$ on a line segment joining $A(1, 2)$ and $B(6, 7)$ such that $AP = \\frac{2}{5}AB$ are:', options: ['(2, 3)', '(3, 4)', '(4, 5)', '(2, 4)'], correct: 1, explanation: 'If $AP = \\frac{2}{5}AB$, then $AP:PB = 2:3$. Using section formula: $x = \\frac{2(6)+3(1)}{5} = 3$, $y = \\frac{2(7)+3(2)}{5} = 4$.' },
            { question: 'In what ratio does the y-axis divide the segment joining $(-3, -4)$ and $(1, -2)$?', options: ['1:3', '2:3', '3:1', '3:2'], correct: 2, explanation: 'On the y-axis, $x=0$. Using $k:1$ ratio: $0 = \\frac{k(1) + 1(-3)}{k+1} \\Rightarrow k = 3$. Ratio is $3:1$.' },
            { question: 'If the midpoint of $(x, 5)$ and $(4, y)$ is $(3, 6)$, find $x$ and $y$:', options: ['$x=2, y=7$', '$x=3, y=6$', '$x=1, y=8$', '$x=7, y=2$'], correct: 0, explanation: '$\\frac{x+4}{2} = 3 \\Rightarrow x=2$. $\\frac{5+y}{2} = 6 \\Rightarrow y=7$.' },
            { question: 'The line segment joining $(2, -3)$ and $(5, 6)$ is divided by the x-axis in the ratio:', options: ['1:2', '2:1', '3:1', '1:3'], correct: 0, explanation: 'On x-axis, $y=0$. $0 = \\frac{k(6) + 1(-3)}{k+1} \\Rightarrow 6k = 3 \\Rightarrow k = \\frac{1}{2}$. Ratio is $1:2$.' },
            { question: 'The coordinates of one end point of a diameter of a circle are $(4, -1)$ and the center is $(1, -3)$. The coordinates of the other end are:', options: ['(-2, 5)', '(2, -5)', '(-2, -5)', '(2, 5)'], correct: 2, explanation: 'Let other end be $(x, y)$. Center is midpoint: $1 = \\frac{4+x}{2} \\Rightarrow x = -2$. $-3 = \\frac{-1+y}{2} \\Rightarrow y = -5$. Point is $(-2, -5)$.' }
        ],
        assessment: [
            { question: 'Find the coordinates of the point dividing the segment from $(1, 3)$ to $(4, 6)$ internally in the ratio $2:1$.', options: ['(2, 4)', '(3, 5)', '(2.5, 4.5)', '(3.5, 5.5)'], correct: 1, explanation: '$x = \\frac{2(4)+1(1)}{3} = 3$. $y = \\frac{2(6)+1(3)}{3} = 5$.' },
            { question: 'The midpoint of the segment joining $(3, -4)$ and $(1, 2)$ is:', options: ['(2, -1)', '(1, -1)', '(4, -2)', '(2, 1)'], correct: 0, explanation: '$x = \\frac{3+1}{2} = 2$. $y = \\frac{-4+2}{2} = -1$.' },
            { question: 'In what ratio does the point $(-4, 6)$ divide the segment joining $(-6, 10)$ and $(3, -8)$?', options: ['2:7', '7:2', '1:3', '3:1'], correct: 0, explanation: 'Use x-coordinate: $-4 = \\frac{k(3) + 1(-6)}{k+1} \\Rightarrow -4k - 4 = 3k - 6 \\Rightarrow 7k = 2 \\Rightarrow k = \\frac{2}{7}$.' },
            { question: 'Find the lengths of the medians of a triangle with vertices $A(0,0)$, $B(6,0)$, $C(0,8)$.', options: ['5, 5, 5', '5, $\\sqrt{73}$, $\\sqrt{52}$', '$5, 2\\sqrt{13}, \\sqrt{73}$', '$10, \\sqrt{52}, \\sqrt{73}$'], correct: 1, explanation: 'The midpoints of sides are $(3,0)$, $(0,4)$, and $(3,4)$. Distances from opposite vertices are: $A(0,0)$ to $(3,4) = 5$. $B(6,0)$ to $(0,4) = \\sqrt{36+16} = \\sqrt{52}$. $C(0,8)$ to $(3,0) = \\sqrt{9+64} = \\sqrt{73}$.' },
            { question: 'If point $P$ divides the line segment joining $A(-3, 3)$ and $B(2, -7)$ such that $2AP = 3PB$, its coordinates are:', options: ['$(1, -1)$', '$(0, -3)$', '$(-1, 1)$', '$(0, 3)$'], correct: 1, explanation: '$AP/PB = 3/2$, so ratio is $3:2$. $x = \\frac{3(2) + 2(-3)}{5} = 0$. $y = \\frac{3(-7) + 2(3)}{5} = -3$.' },
            { question: 'A circle has center at the origin and passes through the point $(4, 3)$. The other end of the diameter is:', options: ['(-4, 3)', '(4, -3)', '(-4, -4)', '(-4, -3)'], correct: 3, explanation: 'Since origin $(0,0)$ is the midpoint of diameter, $(4+x)/2 = 0 \\Rightarrow x=-4$ and $(3+y)/2 = 0 \\Rightarrow y=-3$.' },
            { question: 'Points dividing a line segment in three equal parts are called points of:', options: ['Bisection', 'Trisection', 'Intersection', 'Collinearity'], correct: 1, explanation: 'Trisection implies dividing into three equal parts (ratios 1:2 and 2:1).' },
            { question: 'To find the points of trisection of a line segment, the internal ratios used are:', options: ['1:1 and 2:2', '1:2 and 2:1', '1:3 and 3:1', '1:4 and 4:1'], correct: 1, explanation: 'One point divides it $1:2$, the other divides it $2:1$.' },
            { question: 'The coordinates of the centroid of a triangle with vertices $(x_1, y_1)$, $(x_2, y_2)$, and $(x_3, y_3)$ are:', options: ['$(\\frac{x_1+x_2+x_3}{2}, \\frac{y_1+y_2+y_3}{2})$', '$(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3})$', '$(x_1+x_2+x_3, y_1+y_2+y_3)$', 'Cannot be determined'], correct: 1, explanation: 'The centroid is the average of the coordinates of the three vertices.' },
            { question: 'The centroid of the triangle whose vertices are $(3, -7)$, $(-8, 6)$, and $(5, 10)$ is:', options: ['(0, 3)', '(0, 9)', '(1, 3)', '(3, 5)'], correct: 0, explanation: '$x = \\frac{3-8+5}{3} = 0$, $y = \\frac{-7+6+10}{3} = 3$. Point is $(0, 3)$.' }
        ]
    },
    {
        id: 'area-of-triangle',
        nodeId: 'a4101007-0003-0000-0000-000000000000',
        title: 'Area of a Triangle',
        subtitle: 'Measuring Enclosed Space',
        desc: 'Calculate the area of a triangle given the coordinates of its three vertices.',
        icon: '📐',
        color: '#f59e0b',
        learn: {
            title: 'The Shoelace Trick',
            content: `Instead of treating a triangle as "half base times height", we can calculate its area directly from the coordinates of its vertices.

Given vertices $A(x_1, y_1)$, $B(x_2, y_2)$, and $C(x_3, y_3)$:
$$\\text{Area} = \\frac{1}{2} | x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2) |$$

The absolute value lines $| ... |$ are required because area cannot be negative!`,
            rules: [
                'Write coordinates in order (e.g. anti-clockwise).',
                'If the calculated area is negative, just take its positive value.',
                'If the area is exactly 0, the three points are a straight line (collinear).'
            ],
            examples: [
                { q: 'Area of triangle $(0,0)$, $(4,0)$, $(0,3)$?', a: '$\\frac{1}{2} | 0(0-3) + 4(3-0) + 0(0-0) | = \\frac{1}{2} | 12 | = 6$.' },
                { q: 'What does Area = 0 mean?', a: 'The points don\'t form a triangle; they all lie on a single straight line.' }
            ]
        },
        practice: [
            { question: 'The area of a triangle with vertices $(x_1, y_1)$, $(x_2, y_2)$, $(x_3, y_3)$ is:', options: ['$\\frac{1}{2} [x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)]$', '$\\frac{1}{2} [y_1(x_2-x_3) + y_2(x_3-x_1) + y_3(x_1-x_2)]$', 'Both of these', 'None of these'], correct: 2, explanation: 'Both formulas are mathematically equivalent derivations of the determinant/shoelace formula.' },
            { question: 'If the area of a triangle is zero, the three vertices are:', options: ['Concyclic', 'Collinear', 'Perpendicular', 'Coincident'], correct: 1, explanation: 'A closed shape with zero area implies its boundaries have collapsed onto a single straight line.' },
            { question: 'Find the area of a triangle whose vertices are $(1, -1)$, $(-4, 6)$, and $(-3, -5)$:', options: ['24', '28', '32', '36'], correct: 0, explanation: '$\\frac{1}{2}|1(6 - (-5)) + (-4)(-5 - (-1)) + (-3)(-1 - 6)| = \\frac{1}{2}|1(11) - 4(-4) - 3(-7)| = \\frac{1}{2}|11 + 16 + 21| = \\frac{1}{2}(48) = 24$.' },
            { question: 'The area of the triangle formed by the points $A(2, 0)$, $B(6, 0)$ and $C(4, 6)$ is:', options: ['10', '12', '14', '18'], correct: 1, explanation: 'Base on x-axis is $6-2=4$. Height is $6$. Area = $\\frac{1}{2} \\times 4 \\times 6 = 12$. Or use coordinate formula: $\\frac{1}{2}|2(0-6) + 6(6-0) + 4(0-0)| = \\frac{1}{2}|-12 + 36| = 12$.' },
            { question: 'Given points $(a, 0)$, $(0, b)$, and $(1, 1)$ are collinear. What is the relation between $a$ and $b$?', options: ['$\\frac{1}{a} + \\frac{1}{b} = 1$', '$a + b = 1$', '$ab = 1$', '$\\frac{1}{a} - \\frac{1}{b} = 1$'], correct: 0, explanation: 'Since they are collinear, area = 0. $\\frac{1}{2}|a(b-1) + 0(1-0) + 1(0-b)| = 0 \\Rightarrow ab - a - b = 0 \\Rightarrow ab = a+b \\Rightarrow 1 = \\frac{1}{a} + \\frac{1}{b}$.' },
            { question: 'The area of the triangle with vertices $(0, 0)$, $(a, 0)$, and $(0, b)$ is:', options: ['$ab$', '$\\frac{1}{2}ab$', '$\\frac{1}{3}ab$', '$a+b$'], correct: 1, explanation: 'This is a right triangle with base $a$ and height $b$. Area is $\\frac{1}{2}ab$.' },
            { question: 'Find the value of $k$ if the points $A(2, 3)$, $B(4, k)$, and $C(6, -3)$ are collinear.', options: ['0', '1', '-1', '2'], correct: 0, explanation: 'Area = 0. $2(k - (-3)) + 4(-3 - 3) + 6(3 - k) = 0 \\Rightarrow 2k + 6 - 24 + 18 - 6k = 0 \\Rightarrow -4k = 0 \\Rightarrow k = 0$.' },
            { question: 'If the vertices of a triangle are $(1, 2)$, $(4, y)$, and $(x, 6)$ and its area is 0, what does this mean?', options: ['The area formula broke', 'The points lie on the same straight line', 'The shape is a square', 'The points are all $(0,0)$'], correct: 1, explanation: 'Zero area always signifies collinearity.' },
            { question: 'The area of a quadrilateral $ABCD$ can be found by adding the areas of:', options: ['Two identical squares', 'Triangles $ABC$ and $ADC$', 'Three right triangles', 'Only parallelograms'], correct: 1, explanation: 'Drawing a diagonal splits any quadrilateral into two triangles whose areas can be calculated and summed.' },
            { question: 'If the calculated expression for the area inside the brackets evaluates to -15, the actual area is:', options: ['-15 sq units', '+15 sq units', '0', 'undefined'], correct: 1, explanation: 'Area is always positive, which is why we take the absolute value $| -15 | = 15$.' }
        ],
        assessment: [
            { question: 'What is the area of a triangle with vertices $A(3, 2)$, $B(11, 8)$, and $C(8, 12)$?', options: ['25', '30', '40', '50'], correct: 0, explanation: '$\\frac{1}{2}|3(8-12) + 11(12-2) + 8(2-8)| = \\frac{1}{2}|3(-4) + 11(10) + 8(-6)| = \\frac{1}{2}|-12 + 110 - 48| = \\frac{1}{2}(50) = 25$.' },
            { question: 'For what value of $p$ are the points $(p, -1)$, $(2, 1)$, and $(4, 5)$ collinear?', options: ['1', '2', '3', '4'], correct: 0, explanation: '$p(1-5) + 2(5 - (-1)) + 4(-1 - 1) = 0 \\Rightarrow -4p + 12 - 8 = 0 \\Rightarrow -4p = -4 \\Rightarrow p = 1$.' },
            { question: 'Find the area of the triangle formed by $(0,0)$, $(0,-5)$, and $(4,0)$.', options: ['10', '20', '-10', '5'], correct: 0, explanation: 'It is a right triangle with base 4 and height 5. Area = $0.5 \\times 4 \\times 5 = 10$.' },
            { question: 'The area of the triangle whose vertices are $(-2, -3)$, $(3, 2)$, and $(-1, -8)$ is:', options: ['15', '20', '30', '40'], correct: 0, explanation: '$\\frac{1}{2}|-2(2 - (-8)) + 3(-8 - (-3)) + (-1)(-3 - 2)| = \\frac{1}{2}|-2(10) + 3(-5) -1(-5)| = \\frac{1}{2}|-20 - 15 + 5| = \\frac{1}{2}|-30| = 15$.' },
            { question: ' If points $(a, 0)$, $(0, b)$, and $(x, y)$ are collinear, then:', options: ['$\\frac{x}{a} + \\frac{y}{b} = 1$', '$\\frac{x}{a} - \\frac{y}{b} = 1$', '$ax + by = 1$', '$x + y = ab$'], correct: 0, explanation: 'Area = 0. $a(b-y) + 0 + x(0-b) = 0 \\Rightarrow ab - ay - bx = 0 \\Rightarrow ab = bx + ay$. Dividing by $ab$ gives $\\frac{x}{a} + \\frac{y}{b} = 1$.' },
            { question: 'If the area of a triangle with vertices $(x, y)$, $(1, 2)$, and $(2, 1)$ is 6 square units, this gives rise to:', options: ['One linear equation', 'Two linear equations', 'A quadratic equation', 'No real solutions'], correct: 1, explanation: 'Because of the absolute value $|\dots| = 12$, we get two possible equations: $\dots = 12$ and $\dots = -12$.' },
            { question: 'A student uses the area formula on three points and gets an area of $0.001$. This means the points are:', options: ['Perfectly collinear', 'Not perfectly collinear, but very close to forming a straight line', 'Perpendicular', 'In the first quadrant'], correct: 1, explanation: 'Area is small but non-zero, so they form a very "thin" triangle, not a straight line.' },
            { question: 'Find the area of a rhombus whose consecutive vertices are $(3, 0)$, $(4, 5)$, $(-1, 4)$, and $(-2, -1)$.', options: ['12', '24', '30', '48'], correct: 1, explanation: 'Diagonals are $(3,0)$ to $(-1,4)$ and $(4,5)$ to $(-2,-1)$. $d_1 = \\sqrt{16+16} = 4\\sqrt{2}$. $d_2 = \\sqrt{36+36} = 6\\sqrt{2}$. Area = $\\frac{1}{2} d_1 d_2 = \\frac{1}{2}(4\\sqrt{2})(6\\sqrt{2}) = 24$.' },
            { question: 'Which formula represents the area of a triangle by traversing the vertices $(x_1, y_1)$, $(x_2, y_2)$, $(x_3, y_3)$?', options: ['Midpoint formula', 'Distance formula', 'Shoelace method', 'Pythagorean theorem'], correct: 2, explanation: 'The coordinate formula for area is commonly known as the Shoelace trick or surveyor\'s formula.' },
            { question: 'Points $(0,0)$, $(-3,0)$, and $(0,-4)$ form a triangle. Its area is:', options: ['6', '12', '-6', '7'], correct: 0, explanation: 'Base is 3 (along negative x-axis), height is 4 (along negative y-axis). Area = $\\frac{1}{2} \\times 3 \\times 4 = 6$.' }
        ]
    },
    {
        id: 'collinear-points',
        nodeId: 'a4101007-0004-0000-0000-000000000000',
        title: 'Collinear Points',
        subtitle: 'Proving Lines are Straight',
        desc: 'Prove that three or more points lie exactly on the same straight line.',
        icon: '➖',
        color: '#7c3aed',
        learn: {
            title: 'No Curves, No Corners',
            content: `Collinear points all lie on a single straight line. 

There are two main ways to prove three points $A$, $B$, and $C$ are collinear:

Method 1 (Distance): Show that $AB + BC = AC$ (the sum of the two smaller distances equals the longest one).
Method 2 (Area): Show that the Area of triangle $ABC = 0$.`,
            rules: [
                'The area method is usually much faster than calculating three square roots.',
                'For collinearity by distance, you must identify which points are the endpoints.',
                'If area is not exactly zero, the points form a triangle.'
            ],
            examples: [
                { q: 'Are $(0,1)$, $(1,2)$, and $(2,3)$ collinear?', a: 'Yes. The slope between any two pairs is $1$, or area is $0$.' },
                { q: 'When $AB + BC = AC$, where is $B$?', a: 'Point $B$ lies exactly on the line segment between $A$ and $C$.' }
            ]
        },
        practice: [
            { question: 'Three points $A$, $B$, $C$ are collinear if:', options: ['They form a right triangle', 'Area of $\\triangle ABC = 0$', '$AB^2 + BC^2 = AC^2$', 'They are equidistant from the origin'], correct: 1, explanation: 'Zero area means they do not enclose any space, forming a line.' },
            { question: 'If points $A$, $B$, $C$ are collinear, which distance relation might be true?', options: ['$AB + BC = AC$', '$AB - BC = AC$', '$AB + AC = 0$', '$AB = BC$ always'], correct: 0, explanation: 'If $B$ lies between $A$ and $C$, then $AB + BC = AC$.' },
            { question: 'The fastest method to check collinearity of three given coordinates is usually:', options: ['Distance formula three times', 'Area of triangle method', 'Finding the midpoint', 'Drawing a graph'], correct: 1, explanation: 'The area formula involves simple multiplication and addition, avoiding square roots.' },
            { question: 'Are points $(1, 5)$, $(2, 3)$, and $(-2, -11)$ collinear?', options: ['Yes', 'No', 'Need more info', 'They form an equilateral triangle'], correct: 1, explanation: 'Calculate area: $\\frac{1}{2}|1(3 - (-11)) + 2(-11 - 5) + (-2)(5 - 3)| = \\frac{1}{2}|14 - 32 - 4| = \\frac{1}{2}|-22| = 11$. Since Area $\\ne 0$, they are not collinear.' },
            { question: 'If points $(a, 0)$, $(0, b)$ and $(1, 1)$ are collinear, then $\\frac{1}{a} + \\frac{1}{b} =$', options: ['-1', '0', '1', '2'], correct: 2, explanation: 'From earlier, area = 0 leads to $a+b = ab$, which means $\\frac{1}{a} + \\frac{1}{b} = 1$.' },
            { question: 'Find $k$ if points $(7, -2)$, $(5, 1)$, and $(3, k)$ are collinear.', options: ['2', '3', '4', '5'], correct: 2, explanation: '$7(1 - k) + 5(k - (-2)) + 3(-2 - 1) = 0 \\Rightarrow 7 - 7k + 5k + 10 - 9 = 0 \\Rightarrow -2k + 8 = 0 \\Rightarrow k = 4$.' },
            { question: 'If point $P$ lies on the line segment joining $A$ and $B$, then:', options: ['$AP + PB = AB$', '$AP^2 + PB^2 = AB^2$', '$AP - PB = AB$', 'Area of $\\triangle APB = 100$'], correct: 0, explanation: 'This is the definition of "betweenness" on a line segment.' },
            { question: 'Let $A=(-2, 1)$, $B=(a, b)$, $C=(4, -1)$ be collinear. If $a=1$, what is $b$?', options: ['0', '1', '-1', '2'], correct: 0, explanation: 'Use area $= 0$. $-2(b - (-1)) + 1(-1 - 1) + 4(1 - b) = 0 \\Rightarrow -2b - 2 - 2 + 4 - 4b = 0 \\Rightarrow -6b = 0 \\Rightarrow b = 0$.' },
            { question: 'Why is $AB + BC = AC$ not always true for three collinear points?', options: ['The line might be curved', '$C$ could be between $A$ and $B$', 'Distances can be negative', 'It is physically impossible'], correct: 1, explanation: 'If $C$ is between $A$ and $B$, then $AC + CB = AB$ instead.' },
            { question: 'If the area calculated for points $P, Q, R$ is exactly 0, then:', options: ['You made a calculation mistake', 'The points are random', '$P, Q, R$ are collinear', '$P, Q, R$ form an isosceles triangle'], correct: 2, explanation: 'Area of 0 is the mathematical proof of collinearity.' }
        ],
        assessment: [
            { question: 'Determine if $(1, -1)$, $(2, 1)$, and $(4, 5)$ are collinear.', options: ['Yes', 'No', 'Not possible to tell', 'Only in 3D'], correct: 0, explanation: 'Area = $0.5|1(1-5) + 2(5 - (-1)) + 4(-1-1)| = 0.5|-4 + 12 - 8| = 0$. They are collinear.' },
            { question: 'If the points $(k, 2k)$, $(3k, 3k)$, and $(3, 1)$ are collinear, then $k=$', options: ['$\\frac{1}{3}$', '$-\\frac{1}{3}$', '$\\frac{3}{2}$', '2'], correct: 1, explanation: 'Area = 0. $k(3k - 1) + 3k(1 - 2k) + 3(2k - 3k) = 0 \\Rightarrow 3k^2 - k + 3k - 6k^2 - 3k = 0 \\Rightarrow -3k^2 - k = 0 \\Rightarrow -k(3k+1)=0$. So $k=0$ or $k=-1/3$.' },
            { question: 'If the distance between $A$ and $B$ is 5, distance between $B$ and $C$ is 7, and $A, B, C$ are collinear with $B$ between $A$ and $C$, what is the distance between $A$ and $C$?', options: ['2', '12', '$\\sqrt{74}$', '35'], correct: 1, explanation: 'Since $B$ is between them, $AC = AB + BC = 5 + 7 = 12$.' },
            { question: 'Four points $A$, $B$, $C$, $D$ are collinear. Which must be true?', options: ['Area of $\\triangle ABC = 0$', 'Area of quadrilateral $ABCD = 0$', 'Both of these', 'None of these'], correct: 2, explanation: 'Any subset of 3 points is collinear, and the shape they form has zero area overall.' },
            { question: 'What is the relation between $x$ and $y$ if the points $(x, y)$, $(1, 2)$ and $(7, 0)$ are collinear?', options: ['$x+3y = 7$', '$3x+y = 7$', '$x-3y = 7$', '$x+y=7$'], correct: 0, explanation: 'Area=0. $x(2-0) + 1(0-y) + 7(y-2) = 0 \\Rightarrow 2x - y + 7y - 14 = 0 \\Rightarrow 2x + 6y = 14 \\Rightarrow x+3y = 7$.' },
            { question: 'If distance $AB = 4$, $BC = 8$, and $AC = 4$, describe the points.', options: ['A is between B and C', 'B is between A and C', 'C is between A and B', 'They form a triangle'], correct: 0, explanation: '$AB + AC = 4 + 4 = 8 = BC$. This satisfies collinearity, meaning $A$ is precisely between $B$ and $C$.' },
            { question: 'Which tool is NOT helpful for proving collinearity?', options: ['Section Formula', 'Area of Triangle formula', 'Distance Formula', 'Pythagoras rule on single coordinates'], correct: 3, explanation: 'While Pythagoras is used in the distance formula, simply squaring individual coordinates does not prove collinearity. Area and Distance formulas are the direct proofs.' },
            { question: 'Find $a$ such that $(a, 2)$, $(2, 5)$, and $(3, 3)$ are collinear.', options: ['0.5', '1', '1.5', '3.5'], correct: 3, explanation: 'Area=0. $a(5-3) + 2(3-2) + 3(2-5) = 0 \\Rightarrow 2a + 2 - 9 = 0 \\Rightarrow 2a = 7 \\Rightarrow a = 3.5$.' },
            { question: 'If three points lie on the x-axis, they are inherently collinear. What is the area of the triangle they form?', options: ['1', 'Their x-intercept sum', '0', 'Positive infinity'], correct: 2, explanation: 'Any points on a single straight line form a degenerate triangle with no height, thus exactly 0 area.' },
            { question: 'Two points are always collinear. Can four points be collinear?', options: ['Never', 'Sometimes', 'Always', 'Only on Sundays'], correct: 1, explanation: 'Four points can lie on the same straight line, making them collinear, but they do not have to.' }
        ]
    },
    {
        id: 'geometric-figures',
        nodeId: 'a4101007-0005-0000-0000-000000000000',
        title: 'Verifying Figures',
        subtitle: 'Proving Shapes from Points',
        desc: 'Use distances and coordinates to prove that four points form a specific quadrilateral (like a square or rhombus).',
        icon: '🔲',
        color: '#ec4899',
        learn: {
            title: 'Building Proofs',
            content: `Given four vertices, you can prove the type of quadrilateral by calculating side lengths and diagonals using the distance formula.

- Parallelogram: opposite sides are equal.
- Rectangle: opposite sides equal AND diagonals equal.
- Rhombus: all four sides are equal.
- Square: all four sides equal AND diagonals equal.

Tip: The section formula can also prove a parallelogram if diagonals bisect each other (same midpoint).`,
            rules: [
                'Do not assume a shape from a sketch; prove it with calculations.',
                'A square is a special rhombus with equal diagonals.',
                'A rectangle is a special parallelogram with equal diagonals.'
            ],
            examples: [
                { q: 'How do you prove a square?', a: 'Calculate all 4 sides (must be equal) and both diagonals (must be equal).' },
                { q: 'Four equal sides mean...', a: 'It is definitively a rhombus. Check diagonals to see if it is also a square.' }
            ]
        },
        practice: [
            { question: 'To prove a quadrilateral is a parallelogram, show that:', options: ['Opposite sides are equal', 'All sides are equal', 'Diagonals are perpendicular', 'Diagonals do not bisect'], correct: 0, explanation: 'If opposite pairs of sides equal each other in length, it is a parallelogram.' },
            { question: 'To prove a figure is a rectangle and not just a parallelogram, you must also show:', options: ['Adjacent sides are equal', 'Diagonals are equal', 'Opposite angles are unequal', 'Area is 100'], correct: 1, explanation: 'Parallelograms with equal diagonals are rectangles.' },
            { question: 'A quadrilateral has all four sides equal. Which shape must it be?', options: ['Square', 'Rectangle', 'Rhombus', 'Trapezoid'], correct: 2, explanation: 'Four equal sides define a rhombus. It may or may not be a square.' },
            { question: 'To prove a rhombus is actually a square, demonstrate that:', options: ['Diagonals are equal', 'Opposite sides are parallel', 'Adjacent angles sum to $180^\\circ$', 'It has an area'], correct: 0, explanation: 'A rhombus with equal diagonals has $90^\\circ$ corner angles, making it a square.' },
            { question: 'Points $(1, 7)$, $(4, 2)$, $(-1, -1)$ and $(-4, 4)$ form a:', options: ['Square', 'Rectangle', 'Rhombus', 'Trapezoid'], correct: 0, explanation: 'Calculating sides gives $\\sqrt{34}$ for all four. Calculating diagonals gives $\\sqrt{68}$ for both. Equal sides + equal diagonals = square.' },
            { question: 'Using the midpoint formula to check if diagonals bisect each other is a fast way to prove a:', options: ['Parallelogram', 'Kite', 'Trapezoid', 'Cyclic quadrilateral'], correct: 0, explanation: 'If the midpoint of diagonal $AC$ is the same as the midpoint of diagonal $BD$, the shape is a parallelogram.' },
            { question: 'An isosceles triangle must satisfy:', options: ['All three sides equal', 'Area is zero', 'Two side lengths are equal', 'One angle is $90^\\circ$'], correct: 2, explanation: 'Applying the distance formula between vertices must yield two equal lengths.' },
            { question: 'If $AB=BC=CD=DA$ and $AC \\ne BD$, the figure $ABCD$ is a:', options: ['Square', 'Rectangle', 'Rhombus', 'None of these'], correct: 2, explanation: 'Equal sides but unequal diagonals defines a general rhombus that is not a square.' },
            { question: 'To prove points form a right-angled triangle, calculate all three side lengths and check:', options: ['Midpoint formula', 'Area formula', 'Shoelace method', 'Pythagorean relation $a^2+b^2=c^2$'], correct: 3, explanation: 'If the squares of the two shorter sides sum to the square of the longest, there is a right angle.' },
            { question: 'Points $(-4, 0)$, $(4, 0)$, $(0, 3)$ form a triangle. It is:', options: ['Equilateral', 'Isosceles', 'Right angled', 'Scalene'], correct: 1, explanation: 'Side lengths are 8, 5, and 5. Having two equal sides makes it an isosceles triangle.' }
        ],
        assessment: [
            { question: 'The points $(a, a)$, $(-a, -a)$, and $(-\\sqrt{3}a, \\sqrt{3}a)$ form an equilateral triangle. What is the length of every side?', options: ['$a\\sqrt{2}$', '$2a$', '$2\\sqrt{2}a$', '$\\sqrt{6}a$'], correct: 2, explanation: 'The distance between $(a,a)$ and $(-a,-a)$ is $\\sqrt{(2a)^2+(2a)^2} = \\sqrt{8a^2} = 2\\sqrt{2}a$.' },
            { question: 'If opposite sides of a quadrilateral are equal, but diagonals are unequal, it is a:', options: ['Square', 'Rectangle', 'Parallelogram', 'Trapezium'], correct: 2, explanation: 'This describes a general parallelogram that is not a rectangle.' },
            { question: 'Given coordinates $A, B, C, D$ in order. $AC$ and $BD$ are the:', options: ['Opposite sides', 'Adjacent sides', 'Perimeters', 'Diagonals'], correct: 3, explanation: 'Vertices connected non-consecutively form the diagonals of the shape.' },
            { question: 'If $P$, $Q$, $R$, $S$ form a rectangle, then logically:', options: ['$PQ=RS, QR=SP, PR \\ne QS$', '$PQ=RS, QR=SP, PR = QS$', '$PQ=QR=RS=SP, PR = QS$', '$PQ=QR=RS=SP, PR \\ne QS$'], correct: 1, explanation: 'Opposite sides are equal and diagonals are equal.' },
            { question: 'Are points $(3, 2)$, $(0, 5)$, $(-3, 2)$, and $(0, -1)$ the vertices of a square?', options: ['Yes', 'No', 'It is a rectangle', 'It is a parallelogram only'], correct: 0, explanation: 'All sides are length $\\sqrt{18}$. Both diagonals ($AC$ and $BD$) are length 6. Equal sides + equal diagonals = square.' },
            { question: 'Provide the fastest proof that $(1, 1)$, $(4, 4)$, $(4, 8)$, and $(1, 5)$ form a parallelogram.', options: ['Check all 4 sides', 'Check if midpoints of diagonals $(1,1)$ to $(4,8)$ and $(4,4)$ to $(1,5)$ are the same', 'Check area', 'Calculate all angles'], correct: 1, explanation: 'Diagonals bisecting each other (having the same midpoint, $(2.5, 4.5)$ here) is a sufficient and fast proof.' },
            { question: 'Points $A(9, 0)$, $B(9, 6)$, $C(-9, 6)$, $D(-9, 0)$ form a rectangle. What is the length of its diagonal?', options: ['18', '24', '$6\\sqrt{10}$', '12'], correct: 2, explanation: 'Diagonal $AC$ is from $(9,0)$ to $(-9, 6)$. Distance = $\\sqrt{(-18)^2 + 6^2} = \\sqrt{324+36} = \\sqrt{360} = 6\\sqrt{10}$.' },
            { question: 'Prove the triangle formed by $(0,0)$, $(5,0)$, and $(0,12)$ is a right triangle.', options: ['Shoelace formula', 'Check if $5^2 + 12^2 = c^2$', 'Centroid formula', 'Area must be 0'], correct: 1, explanation: 'Side lengths are 5, 12, and the hypotenuse is $\\sqrt{5^2+12^2}=13$. Since $25+144=169$, it is a right triangle.' },
            { question: 'A quadrilateral has midpoints of its diagonals at the exact same coordinate. What MUST it be?', options: ['Square', 'Parallelogram', 'Trapezoid', 'Kite'], correct: 1, explanation: 'Diagonals that bisect each other guarantee a parallelogram.' },
            { question: 'What is the most exhaustive property proof required for a Square?', options: ['Show 4 sides equal', 'Show 2 opposite sides equal', 'Show diagonals equal', 'Show 4 sides equal AND diagonals equal'], correct: 3, explanation: 'Both conditions are necessary to differentiate from a non-square rhombus.' }
        ]
    }
];
