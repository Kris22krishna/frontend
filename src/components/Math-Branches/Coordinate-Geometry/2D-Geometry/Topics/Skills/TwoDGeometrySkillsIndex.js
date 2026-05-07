import { genSkill1Practice, genSkill1Assessment, genSkill2Practice, genSkill2Assessment, genSkill3Practice, genSkill3Assessment } from './TwoDGeometrySkillsData';

export const SKILLS = [
    {
        id: 'distance-midpoint',
        title: 'Distance & Midpoint',
        subtitle: 'Pythagorean Core',
        icon: '📏',
        color: '#10b981',
        desc: 'Use the distance formula and midpoint formula to solve problems on the Cartesian plane.',
        get practice() { return genSkill1Practice(); },
        get assessment() { return genSkill1Assessment(); },
        learn: {
            concept: 'The distance formula is derived from the Pythagorean theorem. By forming a right triangle between two points, the horizontal and vertical differences become the legs, and the distance is the hypotenuse.',
            rules: [
                {
                    title: 'Distance Formula',
                    f: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}',
                    d: 'Calculate the straight-line distance between any two points $(x_1, y_1)$ and $(x_2, y_2)$ on the coordinate plane.',
                    ex: 'Distance between $(1, 2)$ and $(4, 6)$: $d = \\sqrt{9 + 16} = 5$.',
                    tip: 'The distance is always positive. Order of the points does not matter since we square the differences!'
                },
                {
                    title: 'Distance from Origin',
                    f: 'd = \\sqrt{x^2 + y^2}',
                    d: 'A special case when one of the points is the origin $(0,0)$. Simplifies the general formula.',
                    ex: 'Distance of $(5, 12)$ from origin: $d = \\sqrt{25 + 144} = \\sqrt{169} = 13$.',
                    tip: 'Look for Pythagorean triples (3,4,5), (5,12,13), (8,15,17) to speed up calculations!'
                },
                {
                    title: 'Midpoint Formula',
                    f: 'M = \\left(\\frac{x_1 + x_2}{2},\\; \\frac{y_1 + y_2}{2}\\right)',
                    d: 'The midpoint is the average of both coordinates. It divides the segment into two equal halves.',
                    ex: 'Midpoint of $(2, 4)$ and $(6, 8)$: $M = (4, 6)$.',
                    tip: 'The midpoint is a special case of the section formula where the ratio is $1:1$.'
                }
            ]
        }
    },
    {
        id: 'section-formula',
        title: 'Section Formula & Centroid',
        subtitle: 'Dividing Segments',
        icon: '✂️',
        color: '#0ea5e9',
        desc: 'Apply the section formula to divide line segments in a given ratio, and find centroids of triangles.',
        get practice() { return genSkill2Practice(); },
        get assessment() { return genSkill2Assessment(); },
        learn: {
            concept: 'The section formula is a weighted average — it gives the coordinates of a point that divides a segment in a specified ratio. The centroid (intersection of medians) uses ratio 1:1:1 and is the average of all three vertices.',
            rules: [
                {
                    title: 'Internal Division',
                    f: 'P = \\left(\\frac{mx_2 + nx_1}{m+n},\\; \\frac{my_2 + ny_1}{m+n}\\right)',
                    d: 'When point $P$ divides $A(x_1,y_1)$ and $B(x_2,y_2)$ internally in ratio $m:n$.',
                    ex: 'Dividing $(1,2)$ and $(4,5)$ in $2:1$: $P = (3, 4)$.',
                    tip: 'Think of it as a weighted average — the ratio tells you how much weight each endpoint gets.'
                },
                {
                    title: 'Centroid of a Triangle',
                    f: 'G = \\left(\\frac{x_1+x_2+x_3}{3},\\; \\frac{y_1+y_2+y_3}{3}\\right)',
                    d: 'The centroid divides each median in ratio $2:1$ from the vertex. It is the "centre of mass" of the triangle.',
                    ex: 'Centroid of $(0,0)$, $(6,0)$, $(0,9)$: $G = (2, 3)$.',
                    tip: 'The centroid always lies inside the triangle, regardless of its type!'
                }
            ]
        }
    },
    {
        id: 'area-collinearity',
        title: 'Area of Triangle & Collinearity',
        subtitle: 'Coordinate Applications',
        icon: '📐',
        color: '#f43f5e',
        desc: 'Calculate areas of triangles using coordinates and check if three points are collinear.',
        get practice() { return genSkill3Practice(); },
        get assessment() { return genSkill3Assessment(); },
        learn: {
            concept: 'The area formula uses the determinant of a matrix formed by the coordinates. If the area equals zero, the three points lie on the same straight line (are collinear).',
            rules: [
                {
                    title: 'Area of a Triangle',
                    f: 'A = \\frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|',
                    d: 'Given three vertices $(x_1,y_1)$, $(x_2,y_2)$, $(x_3,y_3)$, this formula gives the exact area without needing to draw the triangle.',
                    ex: 'Vertices $(0,0)$, $(4,0)$, $(0,3)$: Area $= \\frac{1}{2}|0+12+0| = 6$.',
                    tip: 'The absolute value is essential — without it, a clockwise ordering gives a negative result!'
                },
                {
                    title: 'Collinearity Test',
                    f: 'x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2) = 0',
                    d: 'Three points are collinear if and only if the area of the triangle formed by them is zero.',
                    ex: 'Points $(1,2)$, $(3,6)$, $(5,10)$: $1(6-10)+3(10-2)+5(2-6) = -4+24-20 = 0$ ✓ Collinear.',
                    tip: 'All points on the line $y = mx + c$ will satisfy the collinearity condition!'
                }
            ]
        }
    }
];
