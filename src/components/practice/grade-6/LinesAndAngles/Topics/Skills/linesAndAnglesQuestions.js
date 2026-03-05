export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = (array) => {
    const res = [...array];
    for (let i = res.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
};

export const generateLinesAndAnglesQuestions = (topicId, count = 10) => {
    let pool = [];
    switch (topicId) {
        case 'intro':
        case 'introduction': pool = generateIntroPool(); break;
        case 'lsr':
        case 'line-segment-ray': pool = generateLSRPool(); break;
        case 'lt':
        case 'line-types': pool = generateLTPool(); break;
        case 'at':
        case 'angle-types': pool = generateATPool(); break;
        case 'aa':
        case 'adjacent-angles': pool = generateAAPool(); break;
        case 'lp':
        case 'linear-pair': pool = generateLPPool(); break;
        case 'vo':
        case 'vertically-opposite': pool = generateVOPool(); break;
        case 'trans':
        case 'transversal-angles': pool = generateTransPool(); break;
        case 'ap':
        case 'angles-at-point': pool = generateAPPool(); break;
        case 'rl':
        case 'real-life-examples': pool = generateRLPool(); break;
        default: pool = generateIntroPool();
    }

    // Shuffle and pick
    let selected = shuffle(pool).slice(0, count);

    // If we need more (unlikely with 15+ templates per topic), duplicate with unique IDs
    while (selected.length < count) {
        const extra = { ...pool[Math.floor(Math.random() * pool.length)], id: Math.random() };
        selected.push(extra);
    }

    return selected;
};

const generateIntroPool = () => [
    { question: "A ________ has no length, breadth, or thickness. It only shows position.", options: ["Line", "Ray", "Point", "Plane"], correct: 2, explanation: "In geometry, a point is a location with no size. It's often shown by a tiny dot." },
    { question: "Which of the following can be extended infinitely in both directions?", options: ["Line Segment", "Ray", "Line", "Point"], correct: 2, explanation: "A line is a straight path that goes on forever in both directions. It has no start or end point." },
    { question: "What is formed when two rays originate from a common starting point?", options: ["Line", "Angle", "Segment", "Circle"], correct: 1, explanation: "An angle is made of two rays (arms) sharing the same endpoint (vertex)." },
    { question: "The common endpoint where two rays meet to form an angle is called the:", options: ["Vertex", "Base", "Center", "Arm"], correct: 0, explanation: "The vertex is the corner point where the two arms of an angle meet." },
    { question: "Space between two rays meeting at a point is measured in:", options: ["Meters", "Kilograms", "Degrees", "Liters"], correct: 2, explanation: "Angles are measured in degrees using a protractor." },
    { question: "How many lines can be drawn passing through a single point?", options: ["Only One", "Two", "Ten", "Infinitely Many"], correct: 3, explanation: "You can draw as many lines as you want through a single dot; they just cross at that dot." },
    { question: "Which shape has a definite length and two fixed endpoints?", options: ["Line", "Ray", "Line Segment", "Point"], correct: 2, explanation: "A line segment is a measurable portion of a line." },
    { question: "A dot used to represent a location in space is a:", options: ["Point", "Line", "Surface", "Solid"], correct: 0, explanation: "Points have no dimensions, just location." },
    { question: "A ray has ____ starting point and extends infinitely in the other direction.", options: ["Zero", "One", "Two", "Three"], correct: 1, explanation: "A ray starts at a point (origin) and travels forever in one direction." },
    { question: "The union of two non-collinear rays with a common vertex is a:", options: ["Triangle", "Rectangle", "Angle", "Line"], correct: 2, explanation: "This is the formal definition of an angle." },
    { question: "Which instrument is used to measure an angle?", options: ["Ruler", "Compass", "Protractor", "Divider"], correct: 2, explanation: "A protractor is a circular or semi-circular tool used to measure angles." },
    { question: "If you draw a straight path on a paper that doesn't end, you've drawn a:", options: ["Ray", "Line", "Segment", "Curve"], correct: 1, explanation: "Lines extend forever in both directions." },
    { question: "The rays that form an angle are called its:", options: ["Legs", "Vertices", "Arms", "Edges"], correct: 2, explanation: "The sides of an angle are called arms." },
    { question: "A plane has length and breadth but no:", options: ["Height", "Thickness", "Area", "Boundary"], correct: 1, explanation: "A plane is a flat two-dimensional surface." },
    { question: "Collinear points are points that lie on the same:", options: ["Circle", "Angle", "Line", "Plane"], correct: 2, explanation: "Collinear points form a straight line." }
];

const generateLSRPool = () => [
    { question: "A part of a line with two fixed endpoints is a:", options: ["Ray", "Line Segment", "Line", "Angle"], correct: 1, explanation: "Segments have a start and an end." },
    { question: "A path starting at point A and passing through B infinitely is:", options: ["Line AB", "Segment AB", "Ray AB", "Point AB"], correct: 2, explanation: "Starting at one point and going forever in one direction is a ray." },
    { question: "How many lines can pass through two distinct points?", options: ["Zero", "One", "Two", "Infinite"], correct: 1, explanation: "Only one straight line can connect two specific points." },
    { question: "A ray has how many endpoints?", options: ["0", "1", "2", "Unlimited"], correct: 1, explanation: "One fixed starting point, the other side is infinite." },
    { question: "Which of these can be measured using a ruler?", options: ["Line", "Ray", "Line Segment", "Plane"], correct: 2, explanation: "Only segments have a finite, measurable length." },
    { question: "The symbol $\\overline{AB}$ represents a:", options: ["Line", "Ray", "Segment", "Point"], correct: 2, explanation: "The bar symbol is for a line segment." },
    { question: "The symbol $\\overrightarrow{AB}$ represents a:", options: ["Line", "Ray", "Segment", "Angle"], correct: 1, explanation: "The arrow indicates a ray starting at A." },
    { question: "The symbol $\\overleftrightarrow{AB}$ represents a:", options: ["Line", "Ray", "Segment", "Vector"], correct: 0, explanation: "Double arrows indicate a line extending infinitely both ways." },
    { question: "If a ray AB has endpoint A, which direction does it go?", options: ["To A", "Away from A through B", "Through A from B", "Both ways"], correct: 1, explanation: "It starts at the first letter and goes through the second." },
    { question: "A set of points that extends infinitely in both directions is a:", options: ["Line", "Ray", "Line Segment", "Plane"], correct: 0, explanation: "This is the definition of a line." },
    { question: "Two line segments are equal if they have the same:", options: ["Color", "Direction", "Length", "Thickness"], correct: 2, explanation: "Length is the only property of a segment." },
    { question: "A line segment has ______ endpoints.", options: ["No", "One", "Two", "Three"], correct: 2, explanation: "It starts at one point and stops at another." },
    { question: "Which of these is like a sunbeam?", options: ["Line", "Ray", "Segment", "Point"], correct: 1, explanation: "Light rays start at the sun and go infinitely away." },
    { question: "How many points make up a line?", options: ["2", "100", "1000", "Infinite"], correct: 3, explanation: "A line is a continuous collection of infinite points." },
    { question: "A point where two line segments meet is called a:", options: ["Base", "Intersection", "Endpoint", "Vertex"], correct: 3, explanation: "Meeting points or corners are vertices." }
];

const generateLTPool = () => [
    { question: "Lines that are always the same distance apart and never meet are:", options: ["Intersecting", "Parallel", "Perpendicular", "Skew"], correct: 1, explanation: "Parallel lines stay apart forever." },
    { question: "Lines that cross each other at exactly one point are:", options: ["Parallel", "Intersecting", "Collinear", "Longitudinal"], correct: 1, explanation: "Intersecting lines 'share' a point." },
    { question: "Lines intersecting at $90^\\circ$ are:", options: ["Parallel", "Perpendicular", "Symmetric", "Horizontal"], correct: 1, explanation: "Perpendicular lines form right angles." },
    { question: "The common point of two intersecting lines is called the:", options: ["Center", "Origin", "Point of Intersection", "Vertex"], correct: 2, explanation: "It's the specific point where they cross." },
    { question: "Railway tracks are an example of:", options: ["Intersecting Lines", "Parallel Lines", "Perpendicular Lines", "Curved Lines"], correct: 1, explanation: "Tracks never meet." },
    { question: "The letter 'X' represents:", options: ["Parallel Lines", "Intersecting Lines", "Perpendicular Lines", "Horizontal Lines"], correct: 1, explanation: "The two bars cross in the middle." },
    { question: "The letter 'L' represents:", options: ["Parallel Lines", "Intersecting Lines", "Perpendicular Lines", "Curved Lines"], correct: 2, explanation: "Vertical and horizontal arms meet at $90^\\circ$." },
    { question: "How many points of intersection can two straight lines have?", options: ["0 or 1", "Exactly 2", "Infinite", "0, 1, or Infinite"], correct: 3, explanation: "They don't meet (parallel), meet once, or are the same line (overlap)." },
    { question: "A horizontal and vertical line are always:", options: ["Parallel", "Perpendicular", "Coincident", "Skew"], correct: 1, explanation: "They meet at a $90$-degree angle." },
    { question: "If two lines in a plane don't intersect, they MUST be:", options: ["Perpendicular", "Skew", "Parallel", "Curved"], correct: 2, explanation: "In a 2D plane, if they don't cross, they are parallel." },
    { question: "The symbol $\\parallel$ denotes:", options: ["Intersection", "Equality", "Parallelism", "Perpendicularity"], correct: 2, explanation: "Two vertical bars mean parallel." },
    { question: "The symbol $\\perp$ denotes:", options: ["Parallel", "Perpendicular", "Angle", "Triangle"], correct: 1, explanation: "An upside-down 'T' means perpendicular." },
    { question: "Adjacent edges of a notebook are:", options: ["Parallel", "Perpendicular", "Circular", "None"], correct: 1, explanation: "Pages are rectangular, meeting at $90^\\circ$ corners." },
    { question: "Opposite edges of a rectangular door are:", options: ["Parallel", "Perpendicular", "Intersecting", "Reflex"], correct: 0, explanation: "Opposite sides never meet." },
    { question: "Lines that meet at more than one point are:", options: ["Intersecting", "Parallel", "Coincident (Overlapping)", "Diagonal"], correct: 2, explanation: "If they share two points, they are the same line." }
];

const generateATPool = () => [
    { question: "An angle less than $90^\\circ$ is:", options: ["Right", "Obtuse", "Acute", "Reflex"], correct: 2, explanation: "Acute angles are sharp and small." },
    { question: "An angle between $90^\\circ$ and $180^\\circ$ is:", options: ["Acute", "Obtuse", "Straight", "Right"], correct: 1, explanation: "Obtuse angles are wide." },
    { question: "An angle of exactly $90^\\circ$ is:", options: ["Acute", "Right", "Straight", "Complete"], correct: 1, explanation: "Right angles form square corners." },
    { question: "An angle of exactly $180^\\circ$ is:", options: ["Obtuse", "Straight", "Reflex", "Right"], correct: 1, explanation: "Straight angles look like a flat line." },
    { question: "An angle greater than $180^\\circ$ but less than $360^\\circ$ is:", options: ["Reflex", "Straight", "Obtuse", "Acute"], correct: 0, explanation: "Reflex angles bend backwards." },
    { question: "An angle of exactly $360^\\circ$ is a:", options: ["Zero Angle", "Right Angle", "Complete Angle", "Straight Angle"], correct: 2, explanation: "A full rotation is a complete angle." },
    { question: "If an angle is $145^\\circ$, it is:", options: ["Acute", "Obtuse", "Reflex", "Right"], correct: 1, explanation: "Between $90$ and $180$ is obtuse." },
    { question: "If an angle is $35^\\circ$, it is:", options: ["Acute", "Obtuse", "Reflex", "Straight"], correct: 0, explanation: "Less than $90$ is acute." },
    { question: "If an angle is $210^\\circ$, it is:", options: ["Obtuse", "Straight", "Reflex", "Acute"], correct: 2, explanation: "Between $180$ and $360$ is reflex." },
    { question: "Two right angles put together make a:", options: ["Acute Angle", "Obtuse Angle", "Straight Angle", "Complete Angle"], correct: 2, explanation: "$90 + 90 = 180$, which is a straight angle." },
    { question: "Four right angles make a:", options: ["Straight Angle", "Reflex Angle", "Complete Angle", "Acute Angle"], correct: 2, explanation: "$4 \\times 90 = 360$, a full circle." },
    { question: "A half-complete angle measures:", options: ["$90^\\circ$", "$180^\\circ$", "$45^\\circ$", "$120^\\circ$"], correct: 1, explanation: "Half of $360$ is $180$." },
    { question: "An angle formed at 6:00 on a clock is:", options: ["Right", "Obtuse", "Straight", "Acute"], correct: 2, explanation: "Hands at 12 and 6 form a straight line." },
    { question: "An angle formed at 3:00 on a clock is:", options: ["Right", "Acute", "Straight", "Obtuse"], correct: 0, explanation: "Hands at 12 and 3 form a $90$-degree corner." },
    { question: "Which angle is like an open book sitting flat on a table?", options: ["Acute", "Right", "Straight", "Reflex"], correct: 2, explanation: "Flat surfaces form $180$-degree angles." }
];

const generateAAPool = () => [
    { question: "Adjacent angles share a common vertex and a common:", options: ["Interior", "Arm", "Degree", "Base"], correct: 1, explanation: "They share one side and the corner point." },
    { question: "True or False: Adjacent angles must overlap.", options: ["True", "False"], correct: 1, explanation: "They stay side-by-side without overlapping their inner space." },
    { question: "Two angles that have no common interior points but share a vertex and side are:", options: ["Vertical", "Parallel", "Adjacent", "Reflex"], correct: 2, explanation: "This is the definition of adjacent angles." },
    { question: "In the letter 'V', the two sides form an angle at the corner. This corner is the:", options: ["Arm", "Segment", "Vertex", "Intersection"], correct: 2, explanation: "Vertices are meeting points." },
    { question: "If $\\angle ABD$ and $\\angle DBC$ share arm $BD$, they are:", options: ["Opposite", "Adjacent", "Vertical", "Complete"], correct: 1, explanation: "Sharing a middle side makes them adjacent." },
    { question: "Which of these is NOT required for angles to be adjacent?", options: ["Common Vertex", "Common Arm", "Equal Measure", "No Overlap"], correct: 2, explanation: "Adjacent angles can have any measure; they don't have to be equal." },
    { question: "Angles in a Linear Pair are always:", options: ["Parallel", "Adjacent", "Vertical", "Reflex"], correct: 1, explanation: "A linear pair is a special kind of adjacent angle pair." },
    { question: "True or False: Vertical angles are adjacent.", options: ["True", "False"], correct: 1, explanation: "Vertical angles are opposite each other, not next to each other." },
    { question: "If two angles share a vertex but NOT an arm, are they adjacent?", options: ["Yes", "No"], correct: 1, explanation: "They must share a side to be neighbors." },
    { question: "Adjacent angles together form a larger:", options: ["Point", "Ray", "Angle", "Solid"], correct: 2, explanation: "Adding two adjacent angles creates one bigger angle." }
];

const generateLPPool = () => {
    const list = [];
    [30, 45, 60, 90, 110, 135, 150].forEach(val => {
        list.push({
            question: `In a linear pair, if one angle is $${val}^\\circ$, what is the measure of the other?`,
            options: [`$${180 - val}^\\circ$`, `$${val}^\\circ$`, `$${90 - val}^\\circ$`, `$${360 - val}^\\circ$`],
            correct: 0,
            explanation: `Supplementary angles in a linear pair add up to $180^\\circ$. $180 - ${val} = ${180 - val}$.`
        });
    });
    list.push({ question: "The sum of angles in a linear pair is always:", options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$270^\\circ$"], correct: 1, explanation: "Linear pairs form a straight line ($180^\\circ$)." });
    list.push({ question: "Angles in a linear pair are always:", options: ["Complementary", "Supplementary", "Vertical", "Right"], correct: 1, explanation: "Supplementary means they add to $180^\\circ$." });
    list.push({ question: "If both angles in a linear pair are equal, each measure is:", options: ["$45^\\circ$", "$90^\\circ$", "$180^\\circ$", "$360^\\circ$"], correct: 1, explanation: "Half of $180$ is $90$." });
    list.push({ question: "A linear pair consists of how many angles?", options: ["One", "Two", "Three", "Four"], correct: 1, explanation: "A 'pair' means two." });
    return list;
};

const generateVOPool = () => {
    const list = [
        { question: "When two lines intersect, the vertically opposite angles are:", options: ["Equal", "Supplementary", "Right", "Acute"], correct: 0, explanation: "Opposite angles in an 'X' are always equal." },
        { question: "Vertical angles share a common ______ but no common arm.", options: ["Area", "Vertex", "Measurement", "Line"], correct: 1, explanation: "They meet at the point of intersection." }
    ];
    [40, 75, 115, 90].forEach(val => {
        list.push({
            question: `If one angle in a vertically opposite pair is $${val}^\\circ$, the other is:`,
            options: [`$${180 - val}^\\circ$`, `$${val}^\\circ$`, `$${90 - val}^\\circ$`, `$${360 - val}^\\circ$`],
            correct: 1,
            explanation: `Vertical angles are equal. So if one is $${val}^\\circ$, the other must be $${val}^\\circ$.`
        });
    });
    return list;
};

const generateTransPool = () => [
    { question: "A line that intersects two or more lines at distinct points is a:", options: ["Parallel Line", "Perpendicular Line", "Transversal", "Tangent"], correct: 2, explanation: "A transversal 'crosses' other lines." },
    { question: "If a transversal cuts two parallel lines, corresponding angles are:", options: ["Equal", "Supplementary", "Reflex", "None"], correct: 0, explanation: "Corresponding angles are in matching corners." },
    { question: "Alternate interior angles formed by a transversal on parallel lines are:", options: ["Equal", "Supplementary", "Vertical", "Complementary"], correct: 0, explanation: "They form 'Z' shapes and are equal." },
    { question: "Co-interior angles (on same side) of a transversal on parallel lines are:", options: ["Equal", "Supplementary", "Reflex", "Right"], correct: 1, explanation: "They add up to $180$-degrees." },
    { question: "How many angles are formed when a transversal cuts two lines?", options: ["2", "4", "6", "8"], correct: 3, explanation: "4 angles at each intersection point." },
    { question: "Corresponding angles form which letter shape?", options: ["Z", "F", "X", "L"], correct: 1, explanation: "The 'F' shape identifies corresponding angles." },
    { question: "Alternate interior angles form which letter shape?", options: ["Z", "F", "C", "T"], correct: 0, explanation: "The 'Z' shape identifies alternate angles." },
    { question: "Co-interior angles form which letter shape?", options: ["F", "Z", "U or C", "X"], correct: 2, explanation: "They are contained inside the parallel lines on one side." }
];

const generateAPPool = () => {
    const list = [
        { question: "The sum of all angles around a single point is:", options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"], correct: 3, explanation: "A full circle is $360$ degrees." }
    ];
    for (let i = 0; i < 5; i++) {
        const v1 = 50 + i * 20;
        const v2 = 60 + i * 15;
        const v3 = 70 + i * 10;
        const res = 360 - v1 - v2 - v3;
        list.push({
            question: `Four angles meet at a point. If three are $${v1}^\\circ$, $${v2}^\\circ$, and $${v3}^\\circ$, the fourth is:`,
            options: [`$${res}^\\circ$`, `$${res + 20}^\\circ$`, `$${180 - v1}^\\circ$`, `$${res - 10}^\\circ$`],
            correct: 0,
            explanation: `Total sum is $360^\\circ$. $360 - (${v1} + ${v2} + ${v3}) = ${res}$.`
        });
    }
    return list;
};

const generateRLPool = () => [
    { question: "Railway tracks represent:", options: ["Parallel Lines", "Intersecting Lines", "Ray", "Point"], correct: 0, explanation: "They never meet." },
    { question: "A half-opened pair of scissors represents:", options: ["Parallel Lines", "Intersecting Lines", "Straight Angle", "Point"], correct: 1, explanation: "Blades cross at the hinge." },
    { question: "The hands of a clock at 3:00 form a:", options: ["Obtuse Angle", "Straight Angle", "Right Angle", "Acute Angle"], correct: 2, explanation: "$90$ degrees." },
    { question: "A slice of pizza represents an:", options: ["Obtuse Angle", "Reflex Angle", "Acute Angle", "Right Angle"], correct: 2, explanation: "Usually less than $90$ degrees." },
    { question: "The edges of a square tile are:", options: ["Parallel", "Perpendicular", "Both A & B", "None"], correct: 2, explanation: "Opposite are parallel, adjacent are perpendicular." },
    { question: "A ladder leaning against a wall forms which angle with the ground?", options: ["Acute", "Obtuse", "Right", "Straight"], correct: 0, explanation: "Ladders lean at an angle less than $90$." },
    { question: "A flat open laptop usually forms an ______ angle.", options: ["Acute", "Obtuse", "Straight", "Right"], correct: 1, explanation: "Screens are usually opened wider than $90$." },
    { question: "The cross on a window pane represents:", options: ["Parallel Lines", "Perpendicular Lines", "Curved Lines", "Reflex Angles"], correct: 1, explanation: "The bars cross at $90$ degrees." }
];

export const SKILL_LEARN_DATA = {
    introduction: {
        concept: "Geometry starts with simple building blocks: Points, Lines, and Angles.",
        rules: [
            { title: "The Point", f: ".", d: "A point is a location with no dimension. Point A is a dot.", ex: "Vertex of an angle is a point.", tip: "Think of it as a GPS coordinate!" },
            { title: "The Line", f: "\\leftrightarrow", d: "A line extends infinitely in both directions.", ex: "Line AB", tip: "It has no ends!" }
        ]
    },
    'line-segment-ray': {
        concept: "Different types of straight paths have different names based on their endpoints.",
        rules: [
            { title: "Line Segment", f: "A \\rule{1cm}{0.4pt} B", d: "A part of a line with two endpoints. It has a fixed length.", ex: "Edge of a ruler.", tip: "You can measure a segment!" },
            { title: "Ray", f: "A \\rightarrow", d: "Starts at one point and goes forever in one direction.", ex: "Flashlight beam.", tip: "It has one starting point!" }
        ]
    },
    'line-types': {
        concept: "Lines can interact in three main ways.",
        rules: [
            { title: "Parallel Lines", f: "L_1 \\parallel L_2", d: "Lines that never meet, no matter how long they grow.", ex: "Railway tracks.", tip: "They stay 'socially distanced' forever!" },
            { title: "Intersecting Lines", f: "X", d: "Lines that cross at exactly one point.", ex: "Letter 'X'.", tip: "They have a hub!" },
            { title: "Perpendicular", f: "\\perp", d: "Lines that cross at a perfect $90^{\\circ}$ angle.", ex: "Corner of a paper.", tip: "Think of the letter 'L' or 'T'." }
        ]
    },
    'angle-types': {
        concept: "Angles are classified by their measurement in degrees.",
        rules: [
            { title: "Acute Angle", f: "< 90^\\circ", d: "Smaller than a right angle ($0 < \\theta < 90$).", ex: "Slice of pizza.", tip: "Think of it as 'a-cute' (small) angle!" },
            { title: "Obtuse Angle", f: "> 90^\\circ", d: "Larger than a right angle but smaller than a straight line ($90 < \\theta < 180$).", ex: "A wide-open laptop.", tip: "It's 'obese' (wide)!" },
            { title: "Right Angle", f: "= 90^\\circ", d: "Exactly $90$ degrees. Formed by vertical and horizontal lines.", ex: "Wall meeting a floor.", tip: "Look for the small square symbol." }
        ]
    },
    'adjacent-angles': {
        concept: "Adjacent angles are side-by-side neighbors.",
        rules: [
            { title: "The Rules of Adjacency", f: "\\text{Common Vertex + Arm}", d: "They share a vertex and an arm, but no interior space.", ex: "Adjacent slices in a pie.", tip: "Neighbors share a wall!" }
        ]
    },
    'linear-pair': {
        concept: "A linear pair forms a straight line.",
        rules: [
            { title: "Linear Pair Rule", f: "\\angle 1 + \\angle 2 = 180^\\circ", d: "Two adjacent angles that form a straight line.", ex: "Angles on a flat table.", tip: "They are always supplementary!" }
        ]
    },
    'vertically-opposite': {
        concept: "Intersection creates equal opposite angles.",
        rules: [
            { title: "X Rule", f: "VO_1 = VO_2", d: "Angles opposite the vertex in an intersection are equal.", ex: "Scissors blades and handles.", tip: "Look for the 'X' shape!" }
        ]
    },
    'transversal-angles': {
        concept: "A transversal creates multiple equal angle pairs across parallel lines.",
        rules: [
            { title: "Corresponding", f: "F-\\text{shape}", d: "Angles in the same position are equal.", ex: "Angles on stairs.", tip: "Look for the letter 'F'." },
            { title: "Alternate Interior", f: "Z-\\text{shape}", d: "Inner angles on opposite sides are equal.", ex: "The joints in a zigzag.", tip: "Look for the letter 'Z'." }
        ]
    },
    'angles-at-point': {
        concept: "A point is the center of a full rotation.",
        rules: [
            { title: "Full Circle", f: "\\Sigma \\angle = 360^\\circ", d: "All angles around a central point add up to a full circle.", ex: "Clock face.", tip: "Think of a spinner!" }
        ]
    },
    'real-life-examples': {
        concept: "Geometry is everywhere in our daily life.",
        rules: [
            { title: "Spotting Angles", f: "\\text{World} \\rightarrow \\text{Geometry}", d: "From maps to architecture, lines and angles define structures.", ex: "Bridges, house roofs.", tip: "Look for shapes in your room!" }
        ]
    }
};
