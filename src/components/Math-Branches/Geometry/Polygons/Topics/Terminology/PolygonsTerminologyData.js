import { POLY_DIAGRAMS as D } from '../../../TermDiagrams';

export const TERMS = [
    { word: "Quadrilateral", icon: "🔲", def: "A polygon with exactly 4 sides and 4 angles. The interior angles of any quadrilateral always sum to 360°.", example: "Square, rectangle, rhombus, parallelogram, kite, and trapezium are all quadrilaterals.", diagram: D.Quadrilateral },
    { word: "Parallelogram", icon: "▱", def: "A quadrilateral with two pairs of parallel sides. Opposite sides are equal in length and opposite angles are equal.", example: "Area = base × height. Perimeter = 2(a + b). A rectangle is a special parallelogram.", diagram: D.Parallelogram },
    { word: "Rhombus", icon: "🔶", def: "A parallelogram with all four sides equal in length. Diagonals bisect each other at right angles.", example: "Area = (d₁ × d₂) / 2, where d₁ and d₂ are the diagonals. A square is a special rhombus.", diagram: D.Rhombus },
    { word: "Rectangle", icon: "▭", def: "A parallelogram with all four angles equal to 90°. Opposite sides are equal and diagonals are equal in length.", example: "Area = length × width. Perimeter = 2(l + w). Diagonal = √(l² + w²).", diagram: D.Rectangle },
    { word: "Kite", icon: "🪁", def: "A quadrilateral with two pairs of consecutive sides equal. One diagonal bisects the other at right angles.", example: "Area = (d₁ × d₂) / 2. A kite has one line of symmetry along its longer diagonal.", diagram: D.Kite },
    { word: "Trapezium", icon: "🔺", def: "A quadrilateral with exactly one pair of parallel sides, called the parallel sides or bases.", example: "Area = ½ × (a + b) × h, where a and b are the parallel sides and h is the perpendicular height.", diagram: D.Trapezium },
];

export const FIVE_RULES = [
    { name: "Rectangle & Square", desc: "Rectangle: Area = length × width, Perimeter = 2(l + w). Square (special case with l = w = s): Area = s², Perimeter = 4s.", formula: "$$\\text{Rectangle: } A = lw,\\; P = 2(l+w) \\qquad \\text{Square: } A = s^2,\\; P = 4s$$" },
    { name: "Parallelogram & Rhombus", desc: "Parallelogram: Area = base × perpendicular height. Rhombus: Area = half the product of diagonals.", formula: "$$\\text{Parallelogram: } A = bh \\qquad \\text{Rhombus: } A = \\frac{d_1 \\times d_2}{2}$$" },
    { name: "Trapezium (Trapezoid)", desc: "Area equals half the sum of the parallel sides multiplied by the perpendicular height between them.", formula: "$$A = \\frac{(a + b)}{2} \\times h$$" },
    { name: "Kite Area & Angle Sum", desc: "Kite area uses the two diagonals. Any quadrilateral's interior angles sum to 360°.", formula: "$$\\text{Kite: } A = \\frac{d_1 \\times d_2}{2} \\qquad \\text{Angle sum} = 360°$$" },
];

export const VOCAB_QUIZ = [
    { id: 1, q: "A quadrilateral with all sides equal and all angles 90° is called a:", options: ["Rhombus", "Rectangle", "Square", "Kite"], correct: 2 },
    { id: 2, q: "The area formula for a rhombus with diagonals d₁ and d₂ is:", options: ["d₁ + d₂", "d₁ × d₂", "(d₁ × d₂) / 2", "2(d₁ + d₂)"], correct: 2 },
    { id: 3, q: "How many degrees do the interior angles of any quadrilateral sum to?", options: ["180°", "270°", "360°", "540°"], correct: 2 },
    { id: 4, q: "A parallelogram with all four sides equal but angles not necessarily 90° is a:", options: ["Rectangle", "Rhombus", "Kite", "Trapezium"], correct: 1 },
];
