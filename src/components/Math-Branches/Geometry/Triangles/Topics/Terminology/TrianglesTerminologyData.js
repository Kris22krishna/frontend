import { TRI_DIAGRAMS as D } from '../../../TermDiagrams';

export const TERMS = [
    { word: "Hypotenuse", icon: "📐", def: "The longest side of a right-angled triangle, always opposite the right angle.", example: "In a right triangle with legs 3 and 4, the hypotenuse = $$\\sqrt{3^2+4^2} = 5$$.", diagram: D.Hypotenuse },
    { word: "Congruent", icon: "🔁", def: "Two triangles are congruent if they have exactly the same shape and size — all three sides and all three angles are equal.", example: "If △ABC ≅ △DEF, then AB = DE, BC = EF, and ∠A = ∠D.", diagram: D.Congruent },
    { word: "Similar", icon: "🔍", def: "Two triangles are similar if they have the same shape but different sizes — all angles match and corresponding sides are proportional.", example: "If △ABC ~ △DEF with ratio 1:2, then DE = 2·AB.", diagram: D.Similar },
    { word: "Altitude", icon: "⬇️", def: "A perpendicular line drawn from a vertex to the opposite side (or its extension). A triangle has three altitudes.", example: "The area of a triangle = ½ × base × altitude.", diagram: D.Altitude },
    { word: "Median", icon: "➕", def: "A line segment from a vertex to the midpoint of the opposite side. All three medians meet at the centroid.", example: "The centroid divides each median in the ratio 2:1 from vertex to midpoint.", diagram: D.Median },
    { word: "Centroid", icon: "⭐", def: "The point where all three medians of a triangle intersect. It is the triangle's centre of gravity.", example: "If vertices are (0,0), (6,0), (3,6), the centroid is at (3, 2).", diagram: D.Centroid },
];

export const FIVE_RULES = [
    { name: "Pythagorean Theorem", desc: "In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides.", formula: "$$a^2 + b^2 = c^2$$" },
    { name: "Angle Sum Property", desc: "The three interior angles of any triangle always sum to exactly 180°.", formula: "$$\\angle A + \\angle B + \\angle C = 180°$$" },
    { name: "Triangle Area", desc: "Area of a triangle equals half the product of its base and perpendicular height.", formula: "$$A = \\frac{1}{2} \\times b \\times h$$" },
    { name: "Exterior Angle Theorem", desc: "An exterior angle of a triangle equals the sum of the two non-adjacent interior angles.", formula: "$$\\text{Ext.} \\angle = \\angle A + \\angle B$$" },
];

export const VOCAB_QUIZ = [
    { id: 1, q: "In a right triangle with legs 5 and 12, what is the hypotenuse?", options: ["13", "17", "15", "11"], correct: 0 },
    { id: 2, q: "What is the sum of interior angles of any triangle?", options: ["90°", "270°", "360°", "180°"], correct: 3 },
    { id: 3, q: "Two triangles with the same shape but different sizes are called:", options: ["Congruent", "Similar", "Parallel", "Symmetric"], correct: 1 },
    { id: 4, q: "The centroid divides each median in what ratio from vertex to midpoint?", options: ["1:1", "1:2", "2:1", "3:1"], correct: 2 },
];
