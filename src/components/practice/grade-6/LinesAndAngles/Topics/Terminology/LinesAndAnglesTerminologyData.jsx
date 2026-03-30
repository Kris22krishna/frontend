// ─── SVG Helpers for Terminology Illustrations ─────────────────────

function drawPoint(color) {
    return `<svg width="100" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="25" r="4" fill="${color}"/>
        <text x="50" y="42" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">Point P</text>
    </svg>`;
}

function drawLineSegment(color) {
    return `<svg width="150" height="50" viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="25" x2="130" y2="25" stroke="${color}" stroke-width="3"/>
        <circle cx="20" cy="25" r="4" fill="${color}"/>
        <circle cx="130" cy="25" r="4" fill="${color}"/>
        <text x="20" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">A</text>
        <text x="130" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">B</text>
    </svg>`;
}

function drawLine(color) {
    return `<svg width="150" height="50" viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="25" x2="130" y2="25" stroke="${color}" stroke-width="3"/>
        <polygon points="10,25 20,20 20,30" fill="${color}"/>
        <polygon points="140,25 130,20 130,30" fill="${color}"/>
        <circle cx="50" cy="25" r="3" fill="${color}"/>
        <circle cx="100" cy="25" r="3" fill="${color}"/>
        <text x="50" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">C</text>
        <text x="100" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">D</text>
    </svg>`;
}

function drawRay(color) {
    return `<svg width="150" height="50" viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="25" x2="120" y2="25" stroke="${color}" stroke-width="3"/>
        <circle cx="30" cy="25" r="4" fill="${color}"/>
        <polygon points="130,25 120,20 120,30" fill="${color}"/>
        <circle cx="80" cy="25" r="3" fill="${color}"/>
        <text x="30" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">O</text>
        <text x="80" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="${color}">P</text>
    </svg>`;
}

function drawIntersecting(color) {
    return `<svg width="150" height="100" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="20" x2="130" y2="80" stroke="${color}" stroke-width="3"/>
        <line x1="130" y1="20" x2="20" y2="80" stroke="${color}" stroke-width="3"/>
        <circle cx="75" cy="50" r="4" fill="#0f172a"/>
        <text x="75" y="40" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">P</text>
    </svg>`;
}

function drawParallel(color) {
    return `<svg width="150" height="60" viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="20" x2="130" y2="20" stroke="${color}" stroke-width="3"/>
        <line x1="20" y1="40" x2="130" y2="40" stroke="${color}" stroke-width="3"/>
    </svg>`;
}

function drawAngleAngle(color, angleType) {
    // 150x100 box
    let ang = 45;
    if (angleType === "Right") ang = 90;
    if (angleType === "Obtuse") ang = 135;
    if (angleType === "Straight") ang = 180;
    if (angleType === "Reflex") ang = 225;
    
    const rad = (ang * Math.PI) / 180;
    let x2 = 75 - 50 * Math.cos(rad);
    let y2 = 75 - 50 * Math.sin(rad);

    let arc = '';
    if (ang === 90) {
        arc = `<polyline points="75,55 55,55 55,75" fill="none" stroke="${color}" stroke-width="2"/>`;
    } else if (ang === 180) {
        arc = `<path d="M 25 75 A 50 50 0 0 1 125 75" fill="none" stroke="${color}" stroke-width="2"/>`;
    } else if (ang > 180) {
        arc = `<path d="M 125 75 A 25 25 0 1 0 ${75 - 25*Math.cos(rad)} ${75 - 25*Math.sin(rad)}" fill="none" stroke="${color}" stroke-width="2"/>`;
    } else {
        arc = `<path d="M 100 75 A 25 25 0 0 0 ${75 - 25*Math.cos(rad)} ${75 - 25*Math.sin(rad)}" fill="none" stroke="${color}" stroke-width="2"/>`;
    }

    return `<svg width="150" height="120" viewBox="0 0 150 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="75" y1="75" x2="125" y2="75" stroke="${color}" stroke-width="3"/>
        <line x1="75" y1="75" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3"/>
        <circle cx="75" cy="75" r="4" fill="#0f172a"/>
        ${arc}
    </svg>`;
}

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Point',
        color: '#6366f1',
        icon: '📍',
        def: 'A point determines a location. It has no length, width, or depth.',
        examples: ['Point A', 'The tip of a compass', 'A star in the sky'],
        inUse: 'A point is usually denoted by a single capital letter like P.',
        memory: 'Think of an invisible dot marking a precise spot!',
        svg: drawPoint('#6366f1')
    },
    {
        name: 'Line Segment',
        color: '#10b981',
        icon: '➖',
        def: 'The shortest distance between two points. It has two distinct end points.',
        examples: ['$AB$', 'The edge of a ruler', 'A stretched piece of thread'],
        inUse: 'Line segment AB connects points A and B directly.',
        memory: 'A segment is a fixed "piece" of a line!',
        svg: drawLineSegment('#10b981')
    },
    {
        name: 'Line',
        color: '#ef4444',
        icon: '🔛',
        def: 'A line segment extended continuously in both directions, endlessly. It has no end points.',
        examples: ['Line $AB$ or Line $l$', 'The horizon (conceptually)'],
        inUse: 'A line contains infinitely many points.',
        memory: 'Lines go on forever and ever in two directions!',
        svg: drawLine('#ef4444')
    },
    {
        name: 'Ray',
        color: '#0891b2',
        icon: '🌞',
        def: 'A portion of a line that starts at one point and goes off endlessly in one direction.',
        examples: ['Ray $OP$', 'A beam of light from a torch', 'Sun rays'],
        inUse: 'A ray has one fixed starting point but no end point.',
        memory: 'Like a flashlight beam—starts at the bulb, goes on forever!',
        svg: drawRay('#0891b2')
    },
    {
        name: 'Intersecting Lines',
        color: '#f59e0b',
        icon: '✖️',
        def: 'Two or more lines that cross each other and meet at exactly one common point.',
        examples: ['The letter X', 'Crossing roads', 'A pair of scissors'],
        inUse: 'The point where they cross is called the point of intersection.',
        memory: 'Intersection = Crossing paths.',
        svg: drawIntersecting('#f59e0b')
    },
    {
        name: 'Parallel Lines',
        color: '#8b5cf6',
        icon: '⏸️',
        def: 'Lines in the same plane that never meet, no matter how far they are extended.',
        examples: ['Railway tracks', 'Opposite edges of a ruler', 'The rungs of a ladder'],
        inUse: 'The perpendicular distance between parallel lines is always constant.',
        memory: 'Parallel lines are like perfect twins who never touch!',
        svg: drawParallel('#8b5cf6')
    },
    {
        name: 'Angle',
        color: '#ec4899',
        icon: '📐',
        def: 'An angle is formed when two rays originate from the same starting point.',
        examples: ['Angle $\\angle AOB$', 'The corners of a room'],
        inUse: 'The amount of rotation between the two rays gives the angle measure.',
        memory: 'An angle is the "turn" between two rays!',
        svg: drawAngleAngle('#ec4899', 'Acute')
    },
    {
        name: 'Vertex & Arms',
        color: '#06b6d4',
        icon: '✌️',
        def: 'The common starting point is the vertex, and the two forming rays are called the arms or sides.',
        examples: ['Vertex $O$', 'Arms $OA$ and $OB$'],
        inUse: 'Angles are usually named with the vertex letter in the middle, like $\\angle AOB$.',
        memory: 'Vertex is the hinge, arms are the swinging doors.',
        svg: drawAngleAngle('#06b6d4', 'Acute')
    }
];

export const FOUR_RULES = [
    {
        num: 1,
        title: 'Acute Angle',
        rule: 'An angle that is strictly greater than $0^\\circ$ and less than $90^\\circ$.',
        emoji: '🔪',
        color: '#10b981',
        detail: 'Acute angles are "sharp". They represent a small amount of turn, less than a perfect square corner.',
        examples: ['$45^\\circ$', '$89^\\circ$', 'A partially opened door'],
        tip: 'Acute = "A cute" (small) angle!',
        svg: drawAngleAngle('#10b981', 'Acute')
    },
    {
        num: 2,
        title: 'Right & Straight Angles',
        rule: 'A Right Angle is exactly $90^\\circ$. A Straight Angle is exactly $180^\\circ$.',
        emoji: '🧱',
        color: '#ef4444',
        detail: 'A right angle represents a quarter turn (like a book corner). A straight angle is a half turn, forming a perfectly straight line.',
        examples: ['$90^\\circ$ (Right)', '$180^\\circ$ (Straight)', 'The corner of a room, a straight flat road'],
        tip: 'Right = $90$. Straight = $180$.',
        svg: drawAngleAngle('#ef4444', 'Right')
    },
    {
        num: 3,
        title: 'Obtuse Angle',
        rule: 'An angle that is strictly greater than $90^\\circ$ but less than $180^\\circ$.',
        emoji: '🪑',
        color: '#3b82f6',
        detail: 'Obtuse angles are "blunt" or wide. They are formed when you open a hinge past a square corner, but not yet flat.',
        examples: ['$100^\\circ$', '$175^\\circ$', 'A reclining chair'],
        tip: 'Obtuse = Wide and blunt.',
        svg: drawAngleAngle('#3b82f6', 'Obtuse')
    },
    {
        num: 4,
        title: 'Reflex Angle',
        rule: 'An angle that is strictly greater than $180^\\circ$ but less than $360^\\circ$.',
        emoji: '🔄',
        color: '#f59e0b',
        detail: 'A reflex angle represents a turn that goes beyond a straight line. It is the "outside" angle of an acute or obtuse turn.',
        examples: ['$200^\\circ$', '$270^\\circ$', 'Pac-man\\\'s body'],
        tip: 'Reflex bends all the way backwards!',
        svg: drawAngleAngle('#f59e0b', 'Reflex')
    }
];

export const VOCAB_QUIZ = [
    {
        question: "A path that is perfectly straight, has zero thickness, and goes on forever in both directions is a:",
        options: ["Line Segment", "Line", "Ray", "Angle"],
        correct: 1,
        explanation: "A Line extends infinitely in both directions, whereas a Line Segment has bounds.",
        svg: drawLine('#6366f1')
    },
    {
        question: "What is the common starting point of the two rays that make up an angle called?",
        options: ["Intersect", "Endpoint", "Arm", "Vertex"],
        correct: 3,
        explanation: "The vertex is the common origin point where the two arms of the angle meet."
    },
    {
        question: "Which of the following angles is greater than $90^\\circ$ but less than $180^\\circ$?",
        options: ["Acute Angle", "Right Angle", "Obtuse Angle", "Reflex Angle"],
        correct: 2,
        explanation: "An obtuse angle is wide and blunt, falling exactly between $90^\\circ$ and $180^\\circ$."
    },
    {
        question: "The edges of a standard rectangular ruler are examples of:",
        options: ["Intersecting Lines", "Parallel Lines", "Rays", "Reflex Angles"],
        correct: 1,
        explanation: "The opposite edges of a ruler never meet, making them parallel.",
        svg: drawParallel('#8b5cf6')
    },
    {
        question: "If you measure an angle as exactly $180^\\circ$, it forms a straight line. This is known as a:",
        options: ["Straight Angle", "Right Angle", "Reflex Angle", "Acute Angle"],
        correct: 0,
        explanation: "A half-turn measures $180^\\circ$ and forms a perfectly straight line, hence 'Straight Angle'."
    },
    {
        question: "A beam of light given by a laser pointer best represents which geometrical idea?",
        options: ["Point", "Line Segment", "Line", "Ray"],
        correct: 3,
        explanation: "A ray has a starting point (the pointer) and goes on continuously in one direction (the beam shape)."
    },
    {
        question: "An angle of $210^\\circ$ is classified as:",
        options: ["Obtuse", "Reflex", "Straight", "Right"],
        correct: 1,
        explanation: "Any angle between $180^\\circ$ and $360^\\circ$ is a reflex angle."
    },
    {
        question: "Two lines that cross each other at a single point $P$ are called:",
        options: ["Parallel Lines", "Rays", "Intersecting Lines", "Line Segments"],
        correct: 2,
        explanation: "Intersecting lines cross each other at exactly one common point of intersection."
    },
    {
        question: "Which type of angle is strictly smaller than a square corner?",
        options: ["Straight Angle", "Obtuse Angle", "Right Angle", "Acute Angle"],
        correct: 3,
        explanation: "A square corner is $90^\\circ$ (Right), so an angle smaller than that is an Acute angle."
    },
    {
        question: "A line segment $AB$ is different from line $AB$ because:",
        options: ["It has only one endpoint", "It is extremely thick", "It has two distinct endpoints and a precise length", "It is curved"],
        correct: 2,
        explanation: "A line segment is a bounded piece of a line, meaning it has exactly two endpoints and can be measured."
    }
];
