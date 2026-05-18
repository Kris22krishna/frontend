import { TRANS_DIAGRAMS as D } from '../../../TermDiagrams';

export const TERMS = [
    { word: "Translation", icon: "➡️", def: "A transformation that slides every point of a shape the same distance in the same direction. It does not change size or orientation.", example: "Translate by (3, -2): point (1, 4) maps to (4, 2). Every point shifts right 3 and down 2.", diagram: D.Translation },
    { word: "Rotation", icon: "🔄", def: "A transformation that turns a shape by a given angle about a fixed centre point. Positive angles are anticlockwise.", example: "Rotate 90° anticlockwise about origin: (x, y) → (−y, x). So (3, 2) → (−2, 3).", diagram: D.Rotation },
    { word: "Reflection", icon: "🪞", def: "A transformation that flips a shape across a mirror line. Each point maps to a point the same perpendicular distance on the other side.", example: "Reflect in x-axis: (x, y) → (x, −y). Reflect in y-axis: (x, y) → (−x, y).", diagram: D.Reflection },
    { word: "Dilation", icon: "🔍", def: "A transformation that enlarges or shrinks a shape by a scale factor k from a centre of dilation. Also called enlargement.", example: "Dilation by scale factor 2 from origin: (x, y) → (2x, 2y). Point (3, 4) → (6, 8).", diagram: D.Dilation },
    { word: "Pre-image", icon: "📐", def: "The original shape before a transformation is applied. The result after transformation is called the image.", example: "If A(2, 3) is rotated to A'(−3, 2), then A is the pre-image and A' is the image.", diagram: D['Pre-image'] },
    { word: "Symmetry", icon: "⚖️", def: "A shape has symmetry if a transformation maps it onto itself. Reflective symmetry: reflected in a line of symmetry. Rotational symmetry: rotated by less than 360°.", example: "A square has 4 lines of reflective symmetry and order-4 rotational symmetry (90° rotations).", diagram: D.Symmetry },
];

export const FIVE_RULES = [
    { name: "Translation Rule", desc: "To translate a point (x, y) by vector (a, b), add a to x and b to y. The shape slides without rotating or flipping.", formula: "$$(x, y) \\to (x + a,\\; y + b)$$" },
    { name: "Reflection Rules", desc: "Common reflection rules: in the x-axis negate y; in the y-axis negate x; in the line y = x swap coordinates.", formula: "$$x\\text{-axis}: (x,y)\\to(x,-y) \\quad y\\text{-axis}: (x,y)\\to(-x,y)$$" },
    { name: "Rotation 90° (Anticlockwise)", desc: "To rotate a point 90° anticlockwise about the origin, negate the x-coordinate and swap. For 180°, negate both.", formula: "$$90°: (x,y)\\to(-y,x) \\qquad 180°: (x,y)\\to(-x,-y)$$" },
    { name: "Dilation Rule", desc: "To dilate from the origin by scale factor k, multiply both coordinates by k. If k > 1 the shape enlarges; 0 < k < 1 shrinks it.", formula: "$$(x, y) \\to (kx,\\; ky)$$" },
];

export const VOCAB_QUIZ = [
    { id: 1, q: "A transformation that slides a shape without rotating or flipping is called a:", options: ["Rotation", "Reflection", "Translation", "Dilation"], correct: 2 },
    { id: 2, q: "Rotating (3, 4) by 90° anticlockwise about the origin gives:", options: ["(4, 3)", "(−3, −4)", "(−4, 3)", "(3, −4)"], correct: 2 },
    { id: 3, q: "Reflecting (5, −2) in the x-axis gives:", options: ["(−5, 2)", "(5, 2)", "(−5, −2)", "(2, 5)"], correct: 1 },
    { id: 4, q: "A dilation with scale factor 3 maps (2, 5) to:", options: ["(5, 8)", "(6, 15)", "(2, 15)", "(6, 5)"], correct: 1 },
];
