import { GEO_DIAGRAMS as D } from '../../../TermDiagrams';

export const TERMS = [
    { word: "Point", icon: "•", def: "A location in space with no size, no width, no length, and no depth. It is represented by a dot and named with a capital letter.", example: "Point A, Point B — the most basic building block of geometry.", diagram: D.Point },
    { word: "Line", icon: "📏", def: "A straight path that extends infinitely in both directions. It has no thickness and is defined by any two points on it.", example: "Line AB extends forever in both directions through points A and B.", diagram: D.Line },
    { word: "Ray", icon: "➡️", def: "A part of a line that starts at one point (called the endpoint) and extends infinitely in one direction.", example: "Ray AB starts at A and passes through B, continuing forever.", diagram: D.Ray },
    { word: "Angle", icon: "📐", def: "Formed by two rays sharing a common endpoint (vertex). Measured in degrees (°).", example: "∠ABC = 45° — the angle at vertex B formed by rays BA and BC.", diagram: D.Angle },
    { word: "Triangle", icon: "🔺", def: "A polygon with exactly three sides, three vertices, and three angles. The sum of interior angles is always 180°.", example: "△ABC has angles that always add up to 180°.", diagram: D.Triangle },
    { word: "Polygon", icon: "⬡", def: "A closed figure made of three or more straight line segments. Named by the number of sides (e.g., pentagon = 5 sides).", example: "A hexagon has 6 sides, 6 vertices, and 6 angles.", diagram: D.Polygon },
    { word: "Perpendicular", icon: "⊥", def: "Two lines that intersect at a right angle (90°).", example: "The walls and floor of a room are perpendicular to each other.", diagram: D.Perpendicular },
    { word: "Parallel", icon: "∥", def: "Two lines in the same plane that never intersect, no matter how far they extend.", example: "Railway tracks are parallel lines — they stay the same distance apart forever.", diagram: D.Parallel },
];

export const GEO_RULES = [
    { name: "Angle Sum Property", desc: "The sum of interior angles of a triangle is always 180°.", formula: "∠A + ∠B + ∠C = 180°" },
    { name: "Exterior Angle Theorem", desc: "An exterior angle of a triangle equals the sum of the two non-adjacent interior angles.", formula: "Exterior ∠ = ∠A + ∠B" },
    { name: "Polygon Angle Sum", desc: "The sum of interior angles of a polygon with n sides is (n − 2) × 180°.", formula: "Sum = (n − 2) × 180°" },
];

export const VOCAB_QUIZ = [
    { id: 1, q: "What is the sum of all interior angles of a triangle?", options: ["90°", "180°", "270°", "360°"], correct: 1 },
    { id: 2, q: "Two lines that never intersect are called:", options: ["Perpendicular", "Intersecting", "Parallel", "Concurrent"], correct: 2 },
    { id: 3, q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1 },
];
