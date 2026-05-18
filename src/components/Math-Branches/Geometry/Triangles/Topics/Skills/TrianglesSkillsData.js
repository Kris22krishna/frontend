import { genPythagorasP, genPythagorasA, genTriAreaP, genTriAreaA, genAngleSumP, genAngleSumA, genCongruenceP, genCongruenceA } from './TrianglesSkillsData_Questions';

export const SKILLS = [
    {
        id: 'pythagorean-theorem',
        title: 'Pythagorean Theorem',
        subtitle: 'Right Triangles',
        icon: '📐',
        color: '#0ea5e9',
        desc: 'Find missing sides of right triangles using a² + b² = c².',
        practice: genPythagorasP,
        assessment: genPythagorasA,
        learn: {
            concept: 'In any right-angled triangle, the square of the hypotenuse (longest side) equals the sum of squares of the other two sides. This single theorem unlocks countless geometry and real-world problems.',
            rules: [
                { title: 'Finding the Hypotenuse', f: 'c = \\sqrt{a^2 + b^2}', d: 'When you know both legs of a right triangle, square each leg, add them, then take the square root.', ex: '$a=3, b=4 \\Rightarrow c=\\sqrt{9+16}=\\sqrt{25}=5$', tip: 'Memorise the Pythagorean triples: 3-4-5, 5-12-13, 8-15-17. They appear in exams constantly.' },
                { title: 'Finding a Missing Leg', f: 'a = \\sqrt{c^2 - b^2}', d: 'Rearrange the theorem: subtract the square of the known leg from the square of the hypotenuse, then take the square root.', ex: '$c=13, b=12 \\Rightarrow a=\\sqrt{169-144}=\\sqrt{25}=5$', tip: 'Always identify the hypotenuse first — it is opposite the right angle and is the longest side.' },
                { title: 'Checking for a Right Triangle', f: 'a^2 + b^2 = c^2 \\text{ ?}', d: 'Given three side lengths, check if the sum of squares of the two smaller sides equals the square of the largest. If yes, it is a right triangle.', ex: '$6, 8, 10: 36+64=100=10^2$ ✓', tip: 'Scale any known triple by a constant to generate new right triangles quickly.' }
            ]
        }
    },
    {
        id: 'triangle-area',
        title: 'Triangle Area',
        subtitle: 'Area Calculations',
        icon: '📏',
        color: '#10b981',
        desc: 'Calculate triangle areas using base-height and other formulas.',
        practice: genTriAreaP,
        assessment: genTriAreaA,
        learn: {
            concept: 'The area of a triangle is always half the product of its base and the perpendicular height drawn to that base. The base can be any of the three sides.',
            rules: [
                { title: 'Base × Height Formula', f: 'A = \\frac{1}{2} \\times b \\times h', d: 'Multiply the base by the perpendicular height (altitude) and divide by 2. The height must be perpendicular to the chosen base.', ex: '$b=10, h=6 \\Rightarrow A=\\frac{1}{2}\\times10\\times6=30$', tip: 'The height can be outside the triangle for obtuse triangles — always draw it perpendicular to the base.' },
                { title: 'Finding Height from Area', f: 'h = \\frac{2A}{b}', d: 'Rearrange the area formula to find the missing height when you know the area and base.', ex: '$A=24, b=8 \\Rightarrow h=\\frac{2\\times24}{8}=6$', tip: 'This rearrangement is commonly tested — practice isolating h from the formula.' }
            ]
        }
    },
    {
        id: 'angle-sum',
        title: 'Angle Sum Property',
        subtitle: 'Interior Angles',
        icon: '📐',
        color: '#f59e0b',
        desc: 'Use the 180° angle sum to find missing angles in triangles.',
        practice: genAngleSumP,
        assessment: genAngleSumA,
        learn: {
            concept: 'The three interior angles of any triangle — regardless of its shape or size — always add up to exactly 180°. This is one of the most powerful tools in geometry.',
            rules: [
                { title: 'Angle Sum Property', f: '\\angle A + \\angle B + \\angle C = 180°', d: 'If you know any two angles, subtract their sum from 180° to find the third.', ex: '$\\angle A=50°, \\angle B=70° \\Rightarrow \\angle C=180°-50°-70°=60°$', tip: 'Tear the three corners off a paper triangle and place them side by side — they always form a straight line!' },
                { title: 'Isosceles Angles', f: '\\text{base angles} = \\frac{180° - \\text{vertex}}{2}', d: 'In an isosceles triangle, the two base angles are equal. Use the angle sum to find them from the vertex angle.', ex: '$\\text{vertex}=80° \\Rightarrow \\text{base}=(180°-80°)/2=50°$', tip: 'Identify the equal sides first — the base angles are opposite those equal sides.' },
                { title: 'Exterior Angle Theorem', f: '\\text{ext.}\\angle = \\angle A + \\angle B', d: 'An exterior angle equals the sum of the two non-adjacent (remote) interior angles.', ex: '$\\angle A=40°, \\angle B=65° \\Rightarrow \\text{ext.}=105°$', tip: 'The exterior angle is always greater than either remote interior angle.' }
            ]
        }
    },
    {
        id: 'congruence-similarity',
        title: 'Congruence & Similarity',
        subtitle: 'Triangle Relationships',
        icon: '🔁',
        color: '#8b5cf6',
        desc: 'Apply SSS, SAS, ASA, AAS congruence rules and similarity ratios.',
        practice: genCongruenceP,
        assessment: genCongruenceA,
        learn: {
            concept: 'Two triangles are congruent if they are identical in shape and size. They are similar if they have the same shape but different sizes, with all corresponding sides in proportion.',
            rules: [
                { title: 'Congruence Rules', f: 'SSS,\\;SAS,\\;ASA,\\;AAS,\\;RHS', d: 'SSS: three sides equal. SAS: two sides and included angle. ASA/AAS: two angles and a side. RHS: right angle, hypotenuse, side.', ex: '$\\triangle ABC \\cong \\triangle DEF$ by SAS if AB=DE, BC=EF, and \\angle B = \\angle E.', tip: 'The most common error: SSA is NOT a valid congruence condition (ambiguous case).' },
                { title: 'Similarity & Ratios', f: '\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} = k', d: 'In similar triangles all corresponding sides are in the same ratio k. Use the ratio to find any unknown side.', ex: '$k=1:2.\\; AB=5 \\Rightarrow DE=10$', tip: 'Area ratio = k² (square the side ratio). This is often tested separately from the side ratio.' }
            ]
        }
    }
];
