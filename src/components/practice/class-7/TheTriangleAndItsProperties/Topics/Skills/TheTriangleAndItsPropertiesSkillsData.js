import {
    generateElementsQuestions,
    generateSideClassifyQuestions,
    generateAngleClassifyQuestions,
    generateMediansAltitudesQuestions,
    generateExteriorAngleQuestions,
    generateAngleSumQuestions,
    generateFindUnknownXQuestions,
    generateTriangleInequalityQuestions,
} from './theTriangleAndItsPropertiesQuestions';

export const SKILLS = [
    {
        id: 'elements-of-triangle',
        nodeId: 'a4071006-0001-0000-0000-000000000000',
        title: 'Elements of a Triangle',
        subtitle: 'Main Topic 1',
        icon: '📐',
        color: '#6366f1',
        desc: 'Identify vertices, sides, angles, and understand the structure of a triangle.',
        practice: generateElementsQuestions(),
        assessment: generateElementsQuestions(),
        learn: {
            concept: 'A triangle is a closed figure made of three line segments with three vertices, three sides, and three angles.',
            rules: [
                { title: 'Vertices', f: 'A, B, C', d: 'The three corner points of the triangle are its vertices.', ex: '\\triangle ABC \\text{ has vertices } A, B, C', tip: 'Vertices are named using capital letters.' },
                { title: 'Sides', f: 'AB, BC, CA', d: 'The three line segments connecting the vertices are the sides.', ex: 'Side AB, Side BC, Side CA', tip: 'Each side is opposite to one angle.' },
                { title: 'Angles', f: '\\angle A, \\angle B, \\angle C', d: 'Each vertex forms an interior angle.', ex: '\\angle A + \\angle B + \\angle C = 180°', tip: 'Interior angles always sum to 180°.' },
            ]
        }
    },
    {
        id: 'classify-by-sides',
        nodeId: 'a4071006-0002-0000-0000-000000000000',
        title: 'Classification by Sides',
        subtitle: 'Main Topic 1',
        icon: '📏',
        color: '#10b981',
        desc: 'Classify triangles as Scalene, Isosceles, or Equilateral based on side lengths.',
        practice: generateSideClassifyQuestions(),
        assessment: generateSideClassifyQuestions(),
        learn: {
            concept: 'Triangles can be classified by comparing the lengths of their sides.',
            rules: [
                { title: 'Scalene', f: 'a \\neq b \\neq c', d: 'All three sides have different lengths.', ex: '3, 4, 5 \\text{ cm}', tip: 'SCALENE = all sides are "scaled" differently.' },
                { title: 'Isosceles', f: 'a = b \\neq c', d: 'Exactly two sides are equal. Base angles are also equal.', ex: '5, 5, 8 \\text{ cm}', tip: 'ISO = same. Two same-length sides.' },
                { title: 'Equilateral', f: 'a = b = c', d: 'All three sides are equal, and all angles are 60°.', ex: '6, 6, 6 \\text{ cm}', tip: 'EQUI + LATERAL = equal sides!' },
            ]
        }
    },
    {
        id: 'classify-by-angles',
        nodeId: 'a4071006-0003-0000-0000-000000000000',
        title: 'Classification by Angles',
        subtitle: 'Main Topic 1',
        icon: '📐',
        color: '#f59e0b',
        desc: 'Classify triangles as Acute-angled, Right-angled, or Obtuse-angled.',
        practice: generateAngleClassifyQuestions(),
        assessment: generateAngleClassifyQuestions(),
        learn: {
            concept: 'Triangles can be classified based on the measure of their largest angle.',
            rules: [
                { title: 'Acute-angled', f: '\\text{All angles} < 90°', d: 'Every angle is strictly less than 90°.', ex: '60°, 70°, 50°', tip: 'ACUTE = sharp and small.' },
                { title: 'Right-angled', f: '\\text{One angle} = 90°', d: 'Exactly one angle is 90°. The side opposite is the hypotenuse.', ex: '90°, 45°, 45°', tip: 'Look for the ◻ symbol.' },
                { title: 'Obtuse-angled', f: '\\text{One angle} > 90°', d: 'Exactly one angle is greater than 90°.', ex: '120°, 30°, 30°', tip: 'OBTUSE = wide and fat.' },
            ]
        }
    },
    {
        id: 'medians-altitudes',
        nodeId: 'a4071006-0004-0000-0000-000000000000',
        title: 'Medians & Altitudes',
        subtitle: 'Main Topic 2 & 3',
        icon: '📍',
        color: '#0891b2',
        desc: 'Understand medians (vertex to midpoint) and altitudes (perpendicular from vertex).',
        practice: generateMediansAltitudesQuestions(),
        assessment: generateMediansAltitudesQuestions(),
        learn: {
            concept: 'Medians connect vertices to midpoints; altitudes are perpendicular heights.',
            rules: [
                { title: 'Median', f: '\\text{Vertex} \\to \\text{Midpoint}', d: 'Connects a vertex to the midpoint of the opposite side. 3 medians meet at the centroid.', ex: 'Median AD: A \\to \\text{midpoint of } BC', tip: 'MEDian → MIDpoint!' },
                { title: 'Altitude', f: '\\text{Vertex} \\perp \\text{Side}', d: 'A perpendicular from a vertex to the opposite side (or extension). Represents height.', ex: '\\text{Altitude from } A \\perp BC', tip: 'ALTItude = height, like altitude of an airplane.' },
                { title: 'Centroid', f: '2:1 \\text{ ratio}', d: 'Point where all 3 medians meet. Divides each median in 2:1 from the vertex.', ex: 'G = \\text{centroid}', tip: 'It is the "balance point" of the triangle.' },
            ]
        }
    },
    {
        id: 'exterior-angle',
        nodeId: 'a4071006-0005-0000-0000-000000000000',
        title: 'Exterior Angle Property',
        subtitle: 'Main Topic 4',
        icon: '↗️',
        color: '#f43f5e',
        desc: 'The exterior angle equals the sum of the two interior opposite angles.',
        practice: generateExteriorAngleQuestions(),
        assessment: generateExteriorAngleQuestions(),
        learn: {
            concept: 'An exterior angle of a triangle is equal to the sum of its two remote interior angles.',
            rules: [
                { title: 'Exterior Angle', f: '\\angle_{ext} = \\angle_1 + \\angle_2', d: 'The exterior angle at any vertex equals the sum of the two non-adjacent interior angles.', ex: '\\text{If } \\angle A = 50°, \\angle B = 70° \\text{ then ext at C} = 120°', tip: 'The exterior angle is ALWAYS bigger than either interior opposite angle.' },
            ]
        }
    },
    {
        id: 'angle-sum',
        nodeId: 'a4071006-0006-0000-0000-000000000000',
        title: 'Angle Sum Property',
        subtitle: 'Main Topic 5',
        icon: '🔺',
        color: '#8b5cf6',
        desc: 'The sum of all three interior angles of a triangle is always 180°.',
        practice: generateAngleSumQuestions(),
        assessment: generateAngleSumQuestions(),
        learn: {
            concept: 'The three interior angles of any triangle always add up to exactly 180°.',
            rules: [
                { title: 'Angle Sum', f: '\\angle A + \\angle B + \\angle C = 180°', d: 'No matter the shape or size, interior angles sum to 180°.', ex: '60° + 60° + 60° = 180°', tip: 'Know 2 angles? Third = 180° − (sum of other two).' },
            ]
        }
    },
    {
        id: 'find-unknown-x',
        nodeId: 'a4071006-0007-0000-0000-000000000000',
        title: 'Find the Unknown Angle',
        subtitle: 'Main Topic 5',
        icon: '❓',
        color: '#0ea5e9',
        desc: 'Use angle sum and exterior angle properties to find unknown angles.',
        practice: generateFindUnknownXQuestions(),
        assessment: generateFindUnknownXQuestions(),
        learn: {
            concept: 'Use algebraic thinking with angle properties to find missing angle values.',
            rules: [
                { title: 'Using Angle Sum', f: 'x = 180° - (a + b)', d: 'If two angles are given, subtract their sum from 180°.', ex: 'a=50°, b=60° \\implies x = 70°', tip: 'Always check: do all three add to 180°?' },
            ]
        }
    },
    {
        id: 'triangle-inequality',
        nodeId: 'a4071006-0008-0000-0000-000000000000',
        title: 'Triangle Inequality',
        subtitle: 'Main Topic 6',
        icon: '⚖️',
        color: '#059669',
        desc: 'Determine if three given side lengths can form a valid triangle.',
        practice: generateTriangleInequalityQuestions(),
        assessment: generateTriangleInequalityQuestions(),
        learn: {
            concept: 'The sum of any two sides must be strictly greater than the third side.',
            rules: [
                { title: 'Triangle Inequality', f: 'a + b > c', d: 'This must be true for ALL combinations of sides: a+b>c, b+c>a, a+c>b.', ex: '3+4=7 > 5 \\text{ ✓ Valid}', tip: 'Quick check: add the 2 smallest sides and compare to the biggest.' },
                { title: 'Invalid Triangle', f: 'a + b \\leq c', d: 'If ANY pair sums to less than or equal to the third side, the triangle is impossible.', ex: '2+3=5 \\text{ is NOT} > 6 \\text{ ✗ Invalid}', tip: 'Use this to eliminate impossible triangles in MCQs.' },
            ]
        }
    }
];
