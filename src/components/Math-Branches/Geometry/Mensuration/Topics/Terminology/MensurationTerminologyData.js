import { MEN_DIAGRAMS as D } from '../../../TermDiagrams';

export const TERMS = [
    { word: "Perimeter", icon: "🔲", def: "The total length of the boundary of a 2D shape — the sum of all its sides.", example: "Rectangle with l=8, w=5: P = 2(l+w) = 2(8+5) = 26 cm.", diagram: D.Perimeter },
    { word: "Area", icon: "🟦", def: "The amount of flat surface enclosed within a 2D shape, measured in square units.", example: "Rectangle with l=8, w=5: A = l×w = 40 cm².", diagram: D.Area },
    { word: "Surface Area", icon: "📦", def: "The total area of all faces of a 3D solid — the sum of areas of every exposed surface.", example: "Cube with side 4 cm: SA = 6 × 4² = 96 cm².", diagram: D['Surface Area'] },
    { word: "Volume", icon: "🧊", def: "The amount of 3D space enclosed within a solid, measured in cubic units.", example: "Cube with side 4 cm: V = 4³ = 64 cm³.", diagram: D.Volume },
    { word: "Composite Shape", icon: "🔷", def: "A shape made up of two or more basic shapes combined. Find the area/perimeter by breaking it into parts.", example: "An L-shape = two rectangles. Add their areas or subtract one from the other.", diagram: D['Composite Shape'] },
    { word: "Lateral Surface Area", icon: "📐", def: "The area of the sides of a 3D shape only — excluding the top and bottom faces.", example: "Cylinder lateral SA = 2πrh (the curved surface, not the circular ends).", diagram: D['Lateral Surface Area'] },
];

export const FIVE_RULES = [
    { name: "Rectangle Area & Perimeter", desc: "For a rectangle with length l and width w.", formula: "$$A = l \\times w, \\quad P = 2(l+w)$$" },
    { name: "Triangle Area", desc: "Half the product of base and perpendicular height.", formula: "$$A = \\frac{1}{2} \\times b \\times h$$" },
    { name: "Circle Area & Circumference", desc: "Circle with radius r.", formula: "$$A = \\pi r^2, \\quad C = 2\\pi r$$" },
    { name: "Cuboid Volume & Surface Area", desc: "Box with length l, width w, height h.", formula: "$$V = lwh, \\quad SA = 2(lw + lh + wh)$$" },
];

export const VOCAB_QUIZ = [
    { id: 1, q: "A rectangle has length 12 cm and width 5 cm. What is its perimeter?", options: ["34 cm", "60 cm", "17 cm", "24 cm"], correct: 0 },
    { id: 2, q: "What are the units for volume?", options: ["cm", "cm²", "cm³", "m²"], correct: 2 },
    { id: 3, q: "A square has side 7 cm. What is its area?", options: ["28 cm²", "49 cm²", "14 cm²", "21 cm²"], correct: 1 },
    { id: 4, q: "Which formula gives the area of a triangle?", options: ["b × h", "b + h", "½ × b × h", "2 × b × h"], correct: 2 },
];
