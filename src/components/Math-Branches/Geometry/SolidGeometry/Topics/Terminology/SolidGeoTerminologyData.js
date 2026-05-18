import { SOLID_DIAGRAMS as D } from '../../../TermDiagrams';

export const TERMS = [
    { word: "Face", icon: "🔲", def: "A flat or curved surface of a 3D solid. A cube has 6 flat faces; a cylinder has 2 flat and 1 curved face.", example: "Cuboid: 6 faces. Tetrahedron: 4 faces. Sphere: 1 curved face.", diagram: D.Face },
    { word: "Edge", icon: "📏", def: "The line segment where two faces of a polyhedron meet. Edges are straight lines.", example: "Cube: 12 edges. Triangular prism: 9 edges. Tetrahedron: 6 edges.", diagram: D.Edge },
    { word: "Vertex", icon: "📍", def: "A corner point of a 3D solid where three or more edges meet. Plural: vertices.", example: "Cube: 8 vertices. Square pyramid: 5 vertices. Tetrahedron: 4 vertices.", diagram: D.Vertex },
    { word: "Prism", icon: "🔷", def: "A 3D solid with two identical parallel polygonal bases connected by rectangular lateral faces.", example: "Triangular prism: 2 triangular bases, 3 rectangular faces, 9 edges, 6 vertices.", diagram: D.Prism },
    { word: "Cylinder", icon: "🥫", def: "A 3D solid with two identical circular bases connected by a curved lateral surface.", example: "Volume = πr²h. Total SA = 2πr² + 2πrh.", diagram: D.Cylinder },
    { word: "Sphere", icon: "🌍", def: "A perfectly round 3D solid where every point on the surface is the same distance (radius) from the centre.", example: "Volume = ⁴⁄₃πr³. Surface Area = 4πr².", diagram: D.Sphere },
];

export const FIVE_RULES = [
    { name: "Cylinder Formulas", desc: "Volume and total surface area of a cylinder with radius r and height h.", formula: "$$V = \\pi r^2 h, \\quad SA = 2\\pi r(r + h)$$" },
    { name: "Cone Formulas", desc: "Volume and total surface area of a cone with radius r, height h, slant height l.", formula: "$$V = \\frac{1}{3}\\pi r^2 h, \\quad SA = \\pi r(r + l)$$" },
    { name: "Sphere Formulas", desc: "Volume and surface area of a sphere with radius r.", formula: "$$V = \\frac{4}{3}\\pi r^3, \\quad SA = 4\\pi r^2$$" },
    { name: "Euler's Formula", desc: "For any convex polyhedron: Vertices minus Edges plus Faces = 2.", formula: "$$V - E + F = 2$$" },
];

export const VOCAB_QUIZ = [
    { id: 1, q: "How many faces does a cube have?", options: ["4", "6", "8", "12"], correct: 1 },
    { id: 2, q: "What is the volume formula for a cylinder (radius r, height h)?", options: ["πr²h", "2πrh", "⁴⁄₃πr³", "⅓πr²h"], correct: 0 },
    { id: 3, q: "Euler's formula for polyhedra states V − E + F =", options: ["0", "1", "2", "3"], correct: 2 },
    { id: 4, q: "A solid with two identical circular bases is called a:", options: ["Cone", "Sphere", "Pyramid", "Cylinder"], correct: 3 },
];
