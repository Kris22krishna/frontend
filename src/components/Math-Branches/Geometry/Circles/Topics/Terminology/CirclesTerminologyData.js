import { CIR_DIAGRAMS as D } from '../../../TermDiagrams';

export const TERMS = [
    { word: "Radius", icon: "📏", def: "The distance from the centre of a circle to any point on its circumference. All radii of a circle are equal.", example: "If diameter = 10 cm, then radius = 5 cm.", diagram: D.Radius },
    { word: "Chord", icon: "🎵", def: "A straight line segment that joins two points on the circumference of a circle. The diameter is the longest possible chord.", example: "A chord at distance 3 from the centre of a circle with radius 5 has half-length = $$\\sqrt{25-9}=4$$, so length = 8.", diagram: D.Chord },
    { word: "Tangent", icon: "↗️", def: "A line that touches the circle at exactly one point (the point of tangency) and is perpendicular to the radius at that point.", example: "If a tangent is drawn at point P, the angle between the radius OP and the tangent = 90°.", diagram: D.Tangent },
    { word: "Arc", icon: "🌈", def: "A portion of the circumference of a circle. A minor arc is less than a semicircle; a major arc is more than a semicircle.", example: "Arc length = $$\\frac{\\theta}{360°} \\times 2\\pi r$$ where θ is the central angle.", diagram: D.Arc },
    { word: "Sector", icon: "🍕", def: "The region bounded by two radii and an arc — like a pizza slice. Area = fraction of full circle area.", example: "Sector area = $$\\frac{\\theta}{360°} \\times \\pi r^2$$.", diagram: D.Sector },
    { word: "Segment", icon: "🌙", def: "The region between a chord and the arc it cuts off. A minor segment is the smaller region, a major segment is the larger.", example: "Segment area = Sector area − Triangle area formed by the chord and two radii.", diagram: D.Segment },
];

export const FIVE_RULES = [
    { name: "Circumference", desc: "The total distance around a circle. Use this formula with either the radius or diameter.", formula: "$$C = 2\\pi r = \\pi d$$" },
    { name: "Area of a Circle", desc: "The total surface enclosed within the circumference.", formula: "$$A = \\pi r^2$$" },
    { name: "Arc Length", desc: "Length of a portion of the circumference, proportional to the central angle.", formula: "$$l = \\frac{\\theta}{360°} \\times 2\\pi r$$" },
    { name: "Sector Area", desc: "Area of a pie-slice shaped region, proportional to the central angle.", formula: "$$A = \\frac{\\theta}{360°} \\times \\pi r^2$$" },
];

export const VOCAB_QUIZ = [
    { id: 1, q: "What is the formula for the circumference of a circle with radius r?", options: ["πr²", "2πr", "πr", "4πr"], correct: 1 },
    { id: 2, q: "A line touching the circle at exactly one point is called a:", options: ["Chord", "Diameter", "Tangent", "Secant"], correct: 2 },
    { id: 3, q: "A sector has a central angle of 90° in a circle of radius 6. What is its area? (Use π ≈ 3.14)", options: ["28.26 cm²", "113.04 cm²", "56.52 cm²", "18.84 cm²"], correct: 0 },
    { id: 4, q: "The longest chord in a circle is:", options: ["The arc", "The radius", "The diameter", "The tangent"], correct: 2 },
];
