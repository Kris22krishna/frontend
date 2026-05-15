import { genAngleRelP, genAngleRelA, genTriangleP, genTriangleA, genPolygonP, genPolygonA } from './GeoSkillsData_Questions';

export const SKILLS = [
    {
        id: 'angle-relationships',
        title: 'Angle Relationships',
        subtitle: 'Foundations',
        icon: '📐',
        color: '#0ea5e9',
        desc: 'Complementary, supplementary, vertically opposite angles and linear pairs.',
        practice: genAngleRelP,
        assessment: genAngleRelA,
        learn: {
            concept: 'Angles formed by intersecting lines and rays follow strict relationships. Understanding these relationships is the key to solving most geometry problems.',
            rules: [
                {
                    title: 'Complementary Angles',
                    f: '\\angle A + \\angle B = 90°',
                    d: 'Two angles are complementary when they add up to 90°. They often appear as the two acute angles in a right triangle.',
                    ex: '$\\text{If } \\angle A = 35°, \\text{ then } \\angle B = 90° - 35° = 55°$',
                    tip: 'Think "corner" — complementary angles form a right angle (a corner).'
                },
                {
                    title: 'Supplementary Angles',
                    f: '\\angle A + \\angle B = 180°',
                    d: 'Two angles are supplementary when they add up to 180°. They form a straight line when placed side by side.',
                    ex: '$\\text{If } \\angle P = 120°, \\text{ then } \\angle Q = 180° - 120° = 60°$',
                    tip: 'Think "straight" — supplementary angles form a straight line (180°).'
                },
                {
                    title: 'Vertically Opposite Angles',
                    f: '\\angle 1 = \\angle 3, \\quad \\angle 2 = \\angle 4',
                    d: 'When two straight lines intersect, they form two pairs of equal angles directly across from each other.',
                    ex: '$\\text{If one angle is } 70°, \\text{ the vertically opposite angle is also } 70°$',
                    tip: 'Vertically opposite angles are always equal — no calculation needed!'
                },
                {
                    title: 'Angles at a Point',
                    f: '\\angle 1 + \\angle 2 + \\angle 3 + \\cdots = 360°',
                    d: 'All angles formed around a single point (a full revolution) always sum to 360°.',
                    ex: '$\\text{If three angles are } 120°, 90°, \\text{ and } x°, \\text{ then } x = 360° - 210° = 150°$',
                    tip: 'A full turn around any point is always 360°.'
                }
            ]
        }
    },
    {
        id: 'triangle-properties',
        title: 'Triangle Properties',
        subtitle: 'Shape Fundamentals',
        icon: '🔺',
        color: '#8b5cf6',
        desc: 'Angle sum property, exterior angles, isosceles and equilateral triangles.',
        practice: genTriangleP,
        assessment: genTriangleA,
        learn: {
            concept: 'Every triangle follows the Angle Sum Property: the three interior angles always add up to exactly 180°. This single rule unlocks most triangle problems.',
            rules: [
                {
                    title: 'Angle Sum Property',
                    f: '\\angle A + \\angle B + \\angle C = 180°',
                    d: 'In any triangle — acute, obtuse, right, scalene, isosceles, or equilateral — the three interior angles always sum to 180°.',
                    ex: '$\\text{If } \\angle A = 50° \\text{ and } \\angle B = 70°, \\text{ then } \\angle C = 180° - 50° - 70° = 60°$',
                    tip: 'Tear off the three corners of a paper triangle — they will line up to form a straight line (180°)!'
                },
                {
                    title: 'Exterior Angle Theorem',
                    f: '\\text{Exterior Angle} = \\angle A + \\angle B',
                    d: 'An exterior angle of a triangle equals the sum of the two non-adjacent (remote) interior angles.',
                    ex: '$\\text{If } \\angle P = 40° \\text{ and } \\angle Q = 65°, \\text{ exterior at } R = 40° + 65° = 105°$',
                    tip: 'The exterior angle is always greater than either remote interior angle.'
                },
                {
                    title: 'Isosceles Triangle',
                    f: '\\text{Base angles are equal}',
                    d: 'An isosceles triangle has two equal sides and the angles opposite those sides (base angles) are equal.',
                    ex: '$\\text{Vertex angle} = 80° \\Rightarrow \\text{Each base angle} = (180° - 80°) / 2 = 50°$',
                    tip: 'If you know the vertex angle, subtract from 180° and divide by 2 to get each base angle.'
                },
                {
                    title: 'Equilateral Triangle',
                    f: '\\text{Each angle} = 60°',
                    d: 'All three sides are equal, so all three angles are equal. Since they must sum to 180°, each is exactly 60°.',
                    ex: '$180° \\div 3 = 60°$',
                    tip: 'An equilateral triangle is the most symmetric triangle possible.'
                }
            ]
        }
    },
    {
        id: 'polygon-properties',
        title: 'Polygon Properties',
        subtitle: 'Multi-Sided Shapes',
        icon: '⬡',
        color: '#f43f5e',
        desc: 'Interior angle sums, exterior angles, diagonals of regular polygons.',
        practice: genPolygonP,
        assessment: genPolygonA,
        learn: {
            concept: 'Any polygon with n sides can be split into (n − 2) triangles by drawing diagonals from one vertex. This gives us the interior angle sum formula.',
            rules: [
                {
                    title: 'Interior Angle Sum',
                    f: 'S = (n - 2) \\times 180°',
                    d: 'The sum of all interior angles of an n-sided polygon is (n − 2) × 180°. A triangle (n=3) gives 180°, a quadrilateral (n=4) gives 360°, and so on.',
                    ex: '$\\text{Hexagon (n=6): } S = (6-2) \\times 180° = 720°$',
                    tip: 'Divide the polygon into triangles from one vertex — count the triangles and multiply by 180°.'
                },
                {
                    title: 'Each Interior Angle (Regular)',
                    f: '\\text{Each} = \\frac{(n-2) \\times 180°}{n}',
                    d: 'In a regular polygon (all sides and angles equal), divide the total angle sum by n.',
                    ex: '$\\text{Regular octagon: } \\frac{(8-2) \\times 180°}{8} = \\frac{1080°}{8} = 135°$',
                    tip: 'As n increases, each interior angle gets closer to 180° but never reaches it.'
                },
                {
                    title: 'Exterior Angle (Regular)',
                    f: '\\text{Each Exterior} = \\frac{360°}{n}',
                    d: 'The exterior angles of any convex polygon always sum to 360°. For a regular polygon, each exterior angle is 360° / n.',
                    ex: '$\\text{Regular pentagon: } \\frac{360°}{5} = 72°$',
                    tip: 'If you know the exterior angle, you can find n: n = 360° / (exterior angle).'
                },
                {
                    title: 'Number of Diagonals',
                    f: 'D = \\frac{n(n-3)}{2}',
                    d: 'Each vertex connects to (n − 3) other vertices via diagonals (not to itself or its two neighbors). Divide by 2 to avoid double counting.',
                    ex: '$\\text{Hexagon: } D = \\frac{6 \\times 3}{2} = 9$',
                    tip: 'A triangle has 0 diagonals, a quadrilateral has 2, a pentagon has 5.'
                }
            ]
        }
    }
];
