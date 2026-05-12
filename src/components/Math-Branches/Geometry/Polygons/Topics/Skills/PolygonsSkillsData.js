import { genRectSquareP, genRectSquareA, genParallelogramP, genParallelogramA, genRhombusKiteP, genRhombusKiteA, genTrapeziumP, genTrapeziumA } from './PolygonsSkillsData_Questions';

export const SKILLS = [
    {
        id: 'rect-square', title: 'Rectangle & Square', subtitle: 'Special Quadrilateral', icon: '▭', color: '#10b981',
        desc: 'Calculate area, perimeter, and diagonals of rectangles and squares.',
        practice: genRectSquareP, assessment: genRectSquareA,
        learn: {
            concept: 'A rectangle has four right angles and opposite sides equal. A square is a special rectangle where all four sides are equal. Both have diagonals that bisect each other (and for squares, they are equal and perpendicular).',
            rules: [
                { title: 'Rectangle Formulas', f: 'A = lw,\\quad P = 2(l + w),\\quad d = \\sqrt{l^2 + w^2}', d: 'Area is length × width. Perimeter is twice the sum of length and width. The diagonal uses Pythagoras.', ex: '$l=8, w=5 \\Rightarrow A=40\\text{ cm}^2,\\; P=26\\text{ cm},\\; d=\\sqrt{89}\\approx9.43\\text{ cm}$', tip: 'The diagonal of a rectangle is the hypotenuse of a right-angled triangle with legs l and w.' },
                { title: 'Square Formulas', f: 'A = s^2,\\quad P = 4s,\\quad d = s\\sqrt{2}', d: 'All four sides equal s. Area is s². The diagonal of a square is always s√2 — Pythagoras with both legs equal.', ex: '$s=6 \\Rightarrow A=36\\text{ cm}^2,\\; P=24\\text{ cm},\\; d=6\\sqrt{2}\\approx8.49\\text{ cm}$', tip: 'A square is both a rectangle (all angles 90°) and a rhombus (all sides equal). It inherits both sets of properties.' }
            ]
        }
    },
    {
        id: 'parallelogram', title: 'Parallelogram', subtitle: 'Special Quadrilateral', icon: '▱', color: '#8b5cf6',
        desc: 'Apply area and perimeter formulas for parallelograms and verify their properties.',
        practice: genParallelogramP, assessment: genParallelogramA,
        learn: {
            concept: 'A parallelogram has two pairs of parallel sides. Opposite sides are equal, opposite angles are equal, and consecutive angles are supplementary (sum to 180°). Diagonals bisect each other.',
            rules: [
                { title: 'Area', f: 'A = b \\times h', d: 'The area of a parallelogram is base × perpendicular height (not slant side). The perpendicular height is the distance between the parallel bases.', ex: '$b=10, h=6 \\Rightarrow A=60\\text{ cm}^2$. Note: even if the slant side is 8 cm, use h=6.', tip: 'Cut a parallelogram with a vertical cut and shift the triangle — it becomes a rectangle with the same base and height!' },
                { title: 'Perimeter & Angles', f: 'P = 2(a + b),\\quad \\angle A + \\angle B = 180°', d: 'Perimeter uses both distinct side lengths, each counted twice. Consecutive angles are supplementary.', ex: '$a=8, b=5 \\Rightarrow P=26\\text{ cm}$. If one angle is 70°, the adjacent angle is 110°.', tip: 'A rhombus is a parallelogram with all sides equal. A rectangle is a parallelogram with all angles 90°.' }
            ]
        }
    },
    {
        id: 'rhombus-kite', title: 'Rhombus & Kite', subtitle: 'Special Quadrilateral', icon: '🔶', color: '#f59e0b',
        desc: 'Use diagonal area formulas for rhombuses and kites.',
        practice: genRhombusKiteP, assessment: genRhombusKiteA,
        learn: {
            concept: 'Both rhombuses and kites have an area formula based on their diagonals: Area = (d₁ × d₂) / 2. A rhombus has all sides equal and diagonals that bisect each other at 90°. A kite has two pairs of consecutive equal sides and one diagonal that perpendicularly bisects the other.',
            rules: [
                { title: 'Area via Diagonals', f: 'A = \\frac{d_1 \\times d_2}{2}', d: 'This formula works for both rhombuses and kites. The two diagonals divide the shape into 4 right-angled triangles; the formula sums their areas.', ex: '$d_1=10, d_2=6 \\Rightarrow A=\\frac{10\\times6}{2}=30\\text{ cm}^2$', tip: 'A square is a special rhombus — its diagonals are equal. Area = (d × d)/2 = d²/2, consistent with s² (since d = s√2).' },
                { title: 'Rhombus Perimeter & Properties', f: 'P = 4s,\\quad \\text{Diagonals bisect at } 90°', d: 'All four sides of a rhombus are equal, so perimeter = 4s. The diagonals are perpendicular bisectors of each other.', ex: '$s=7 \\Rightarrow P=28\\text{ cm}$. Diagonals 6 and 8: each half-diagonal is 3 and 4, side = √(9+16) = 5.', tip: 'Given diagonals d₁ and d₂ of a rhombus, find side s = √((d₁/2)² + (d₂/2)²) using Pythagoras.' }
            ]
        }
    },
    {
        id: 'trapezium', title: 'Trapezium & Angle Sum', subtitle: 'Quadrilateral', icon: '🔺', color: '#f43f5e',
        desc: 'Find areas of trapeziums and use the 360° angle sum property.',
        practice: genTrapeziumP, assessment: genTrapeziumA,
        learn: {
            concept: 'A trapezium (trapezoid) has exactly one pair of parallel sides called the bases. Its area formula averages the two bases and multiplies by height. The angle sum property of all quadrilaterals — interior angles sum to 360° — allows us to find missing angles.',
            rules: [
                { title: 'Trapezium Area', f: 'A = \\frac{(a + b)}{2} \\times h', d: 'Average the two parallel sides (a and b) and multiply by the perpendicular height h. This is the "average base × height" formula.', ex: '$a=12, b=6, h=5 \\Rightarrow A=\\frac{18}{2}\\times5=45\\text{ cm}^2$', tip: 'Think of the trapezium as a rectangle with a triangle added or removed — the formula reflects exactly that average.' },
                { title: 'Quadrilateral Angle Sum', f: '\\angle A + \\angle B + \\angle C + \\angle D = 360°', d: 'The four interior angles of any quadrilateral always sum to 360°. Use this to find a missing angle.', ex: 'Angles 95°, 85°, 110° given ⟹ 4th angle = 360 − 95 − 85 − 110 = 70°', tip: 'Any quadrilateral can be split into 2 triangles (diagonal). Each triangle = 180°. Total = 360°.' }
            ]
        }
    }
];
