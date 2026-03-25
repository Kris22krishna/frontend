// ─── TERMINOLOGY DATA WITH DIAGRAMS ─────────────────────────────────────────

export const TERMS = [
    {
        name: 'Line',
        color: '#6366f1',
        icon: '↔️',
        def: 'A straight path that extends infinitely in both directions without any endpoints.',
        examples: ['Line $AB$ (written as $\\overleftrightarrow{AB}$)'],
        inUse: 'A line has no measurable length because it never ends.',
        memory: 'A LINE goes on and on — like a straight highway with no end!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="80" x2="180" y2="80" stroke="#6366f1" stroke-width="3"/>
        <polygon points="20,80 30,75 30,85" fill="#6366f1"/>
        <polygon points="180,80 170,75 170,85" fill="#6366f1"/>
        <circle cx="60" cy="80" r="4" fill="#6366f1"/>
        <circle cx="140" cy="80" r="4" fill="#6366f1"/>
        <text x="60" y="70" text-anchor="middle" fill="#6366f1" font-size="14" font-weight="700">A</text>
        <text x="140" y="70" text-anchor="middle" fill="#6366f1" font-size="14" font-weight="700">B</text>
        </svg>`
    },
    {
        name: 'Line Segment',
        color: '#10b981',
        icon: '➖',
        def: 'A part of a line with two distinct endpoints. It has a fixed, measurable length.',
        examples: ['Segment $PQ$ (written as $\\overline{PQ}$)'],
        inUse: 'A ruler measures the length of a line segment.',
        memory: 'SEGMENT means "piece". It is a piece of a line cropped at both ends!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="80" x2="160" y2="80" stroke="#10b981" stroke-width="3"/>
        <circle cx="40" cy="80" r="5" fill="#10b981"/>
        <circle cx="160" cy="80" r="5" fill="#10b981"/>
        <text x="40" y="70" text-anchor="middle" fill="#10b981" font-size="14" font-weight="700">P</text>
        <text x="160" y="70" text-anchor="middle" fill="#10b981" font-size="14" font-weight="700">Q</text>
        </svg>`
    },
    {
        name: 'Ray',
        color: '#f59e0b',
        icon: '➡️',
        def: 'A part of a line that starts at one endpoint (the origin) and extends infinitely in one direction.',
        examples: ['Ray $OP$ (written as $\\overrightarrow{OP}$)'],
        inUse: 'A laser beam acts like a ray because it starts at a source and points infinitely outward.',
        memory: 'Think of a RAY of sunshine: starts at the sun and goes out forever in one direction!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="80" x2="180" y2="80" stroke="#f59e0b" stroke-width="3"/>
        <circle cx="40" cy="80" r="5" fill="#f59e0b"/>
        <polygon points="180,80 170,75 170,85" fill="#f59e0b"/>
        <circle cx="120" cy="80" r="4" fill="#f59e0b"/>
        <text x="40" y="70" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="700">O</text>
        <text x="120" y="70" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="700">P</text>
        </svg>`
    },
    {
        name: 'Angle',
        color: '#f43f5e',
        icon: '📐',
        def: 'A geometric figure formed when two rays share a common endpoint called the vertex.',
        examples: ['Angle $ABC$ (written as $\\angle ABC$)'],
        inUse: 'The corner of a rectangular room forms an angle of $90°$.',
        memory: 'The middle letter is always the VERTEX where the bend happens!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="120" x2="160" y2="120" stroke="#f43f5e" stroke-width="3"/>
        <line x1="40" y1="120" x2="120" y2="40" stroke="#f43f5e" stroke-width="3"/>
        <polygon points="160,120 150,115 150,125" fill="#f43f5e"/>
        <polygon points="120,40 113,47 122,50" fill="#f43f5e"/>
        <circle cx="40" cy="120" r="5" fill="#f43f5e"/>
        <path d="M 70 120 A 30 30 0 0 0 62 98" fill="none" stroke="#f43f5e" stroke-width="2"/>
        <text x="25" y="130" fill="#f43f5e" font-size="14" font-weight="700">B</text>
        <text x="130" y="35" fill="#f43f5e" font-size="14" font-weight="700">A</text>
        <text x="160" y="140" fill="#f43f5e" font-size="14" font-weight="700">C</text>
        </svg>`
    },
    {
        name: 'Types of Angles',
        color: '#0891b2',
        icon: '📏',
        def: 'Angles are classified by size: Acute (<90°), Right (=90°), Obtuse (>90°, <180°), Straight (=180°), Reflex (>180°).',
        examples: ['$30°$ is Acute', '$90°$ is Right', '$120°$ is Obtuse'],
        inUse: 'A straight angle looks exactly like a straight line segment.',
        memory: 'ACUTE is cute and small! OBTUSE is big and wide!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="100" y1="120" x2="160" y2="120" stroke="#0891b2" stroke-width="2"/>
        <line x1="100" y1="120" x2="150" y2="70" stroke="#0891b2" stroke-width="2"/>
        <path d="M 120 120 A 20 20 0 0 0 115 105" fill="none" stroke="#0891b2" stroke-width="1.5"/>
        <text x="135" y="110" fill="#0891b2" font-size="10">Acute</text>
        
        <line x1="40" y1="120" x2="100" y2="120" stroke="#64748b" stroke-width="2"/>
        <line x1="100" y1="120" x2="100" y2="60" stroke="#64748b" stroke-width="2"/>
        <path d="M 100 110 L 110 110 L 110 120" fill="none" stroke="#64748b" stroke-width="1.5"/>
        <text x="100" y="50" text-anchor="middle" fill="#64748b" font-size="10">Right</text>
        </svg>`
    },
    {
        name: 'Complementary Angles',
        color: '#8b5cf6',
        icon: '🧩',
        def: 'Two angles are complementary if the sum of their measures is exactly $90°$.',
        examples: ['$30°$ and $60°$', '$45°$ and $45°$'],
        inUse: 'If an angle is $30°$, its complement is $60°$.',
        memory: '"C" comes before "S" in the alphabet. $90°$ comes before $180°$. Complementary = $90°$!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="120" x2="160" y2="120" stroke="#8b5cf6" stroke-width="2.5"/>
        <line x1="40" y1="120" x2="40" y2="20" stroke="#8b5cf6" stroke-width="2.5"/>
        <line x1="40" y1="120" x2="120" y2="50" stroke="#8b5cf6" stroke-width="2"/>
        <path d="M 40 100 A 20 20 0 0 1 55 107" fill="rgba(139,92,246,0.3)" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M 65 120 A 25 25 0 0 0 58 109" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="50" y="90" fill="#8b5cf6" font-size="12" font-weight="700">a</text>
        <text x="70" y="110" fill="#f43f5e" font-size="12" font-weight="700">b</text>
        <text x="130" y="110" text-anchor="middle" fill="#334155" font-size="11" font-weight="700">a + b = 90°</text>
        </svg>`
    },
    {
        name: 'Supplementary Angles',
        color: '#ec4899',
        icon: '➕',
        def: 'Two angles are supplementary if the sum of their measures is exactly $180°$.',
        examples: ['$120°$ and $60°$', '$90°$ and $90°$'],
        inUse: 'Angles on a straight line are always supplementary.',
        memory: '"S" comes after "C". $180°$ comes after $90°$. Supplementary = $180°$!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="120" x2="180" y2="120" stroke="#ec4899" stroke-width="2.5"/>
        <line x1="100" y1="120" x2="140" y2="40" stroke="#ec4899" stroke-width="2"/>
        <circle cx="100" cy="120" r="4" fill="#ec4899"/>
        <path d="M 125 120 A 25 25 0 0 0 115 90" fill="rgba(236,72,153,0.3)" stroke="#ec4899" stroke-width="1.5"/>
        <path d="M 100 100 A 20 20 0 0 0 80 120" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="1.5"/>
        <text x="80" y="105" fill="#10b981" font-size="12" font-weight="700">x</text>
        <text x="125" y="105" fill="#ec4899" font-size="12" font-weight="700">y</text>
        <text x="100" y="150" text-anchor="middle" fill="#334155" font-size="11" font-weight="700">x + y = 180°</text>
        </svg>`
    },
    {
        name: 'Intersecting Lines',
        color: '#059669',
        icon: '⚔️',
        def: 'Two lines that cross each other at a single, common point of intersection.',
        examples: ['The letter "X"', 'Crossroads on a map'],
        inUse: 'When two lines intersect, the vertically opposite angles formed are always equal.',
        memory: 'Think of an INTERSECTION where two roads cross!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="40" x2="160" y2="120" stroke="#059669" stroke-width="3"/>
        <line x1="40" y1="120" x2="160" y2="40" stroke="#059669" stroke-width="3"/>
        <circle cx="100" cy="80" r="5" fill="#334155"/>
        <text x="100" y="65" text-anchor="middle" fill="#334155" font-size="10" font-weight="700">Intersection</text>
        </svg>`
    },
    {
        name: 'Transversal',
        color: '#0369a1',
        icon: '⚡',
        def: 'A line that intersects two or more other lines at distinct points. It creates several pairs of angles.',
        examples: ['A zebra crossing across railway tracks', 'A diagonal beam crossing two parallel beams'],
        inUse: 'A transversal crossing two lines creates 8 different interior and exterior angles.',
        memory: 'TRANS means "across". It is a line that travels ACROSS the others!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="50" x2="170" y2="50" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="30" y1="110" x2="170" y2="110" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="70" y1="20" x2="130" y2="140" stroke="#0369a1" stroke-width="3"/>
        <text x="100" y="15" text-anchor="middle" fill="#0369a1" font-size="12" font-weight="700">Transversal</text>
        </svg>`
    },
    {
        name: 'Alternate Interior Angles',
        color: '#b45309',
        icon: '🔀',
        def: 'A pair of angles on opposite sides of the transversal and between the two lines. They form a "Z" shape.',
        examples: ['Angles 3 and 6', 'Angles 4 and 5 (in standard transversal diagrams)'],
        inUse: 'If the two lines are parallel, alternate interior angles are strictly equal.',
        memory: 'Look for the Z shape! The inner crooks of the Z are Alternate Interior.',
        svg: `<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="50" x2="180" y2="50" stroke="#94a3b8" stroke-width="2"/>
        <line x1="20" y1="110" x2="180" y2="110" stroke="#94a3b8" stroke-width="2"/>
        <line x1="60" y1="20" x2="140" y2="140" stroke="#64748b" stroke-width="2"/>
        <path d="M 60 50 L 100 50 L 126 110 L 180 110" fill="none" stroke="#b45309" stroke-width="3" stroke-dasharray="4,2"/>
        <path d="M 85 50 A 15 15 0 0 1 93 68" fill="rgba(180,83,9,0.3)" stroke="#b45309" stroke-width="1.5"/>
        <path d="M 120 90 A 15 15 0 0 1 140 110" fill="rgba(180,83,9,0.3)" stroke="#b45309" stroke-width="1.5"/>
        <text x="145" y="105" fill="#b45309" font-size="12" font-weight="700">y</text>
        <text x="75" y="65" fill="#b45309" font-size="12" font-weight="700">x</text>
        </svg>`
    }
];

export const FOUR_RULES = [
    {
        num: 1,
        title: 'Complementary & Supplementary Property',
        rule: 'To find a missing complement, subtract from $90°$. To find a supplement, subtract from $180°$.',
        emoji: '➖',
        color: '#f59e0b',
        detail: 'These are fixed totals. If angles $A$ and $B$ are complementary, then $A + B = 90°$. If they are supplementary, then $A + B = 180°$.',
        examples: ['Complement of $40° = 90° - 40° = 50°$', 'Supplement of $100° = 180° - 100° = 80°$'],
        tip: 'Check your subtraction twice! Simple arithmetic errors are common here.',
        svg: `<svg viewBox="0 0 220 145" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="100" x2="180" y2="100" stroke="#64748b" stroke-width="2"/>
        <line x1="100" y1="100" x2="100" y2="20" stroke="#f59e0b" stroke-width="2.5"/>
        <path d="M 100 80 L 115 80 L 115 100" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="160" y="80" fill="#f59e0b" font-size="14" font-weight="800">90°</text>
        <path d="M 120 100 A 20 20 0 0 0 80 100" fill="none" stroke="#3b82f6" stroke-width="2"/>
        <text x="30" y="80" fill="#3b82f6" font-size="14" font-weight="800">180°</text>
        </svg>`
    },
    {
        num: 2,
        title: 'Vertically Opposite Angles (VOA)',
        rule: 'When two lines intersect, the vertically opposite angles are ALWAYS equal.',
        emoji: '✌️',
        color: '#10b981',
        detail: 'They form an "X". The angles across from each other at the intersection point measure exactly the same.',
        examples: ['If top angle is $60°$, then the bottom angle is also $60°$'],
        tip: 'Look for any literal "X" shape crossover to spot vertically opposite angles!',
        svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="20" x2="160" y2="110" stroke="#64748b" stroke-width="2"/>
        <line x1="40" y1="110" x2="160" y2="20" stroke="#64748b" stroke-width="2"/>
        <path d="M 100 50 A 15 15 0 0 1 118 64" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="1.5"/>
        <path d="M 100 80 A 15 15 0 0 1 82 66" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="1.5"/>
        <text x="110" y="55" fill="#10b981" font-size="11" font-weight="700">x</text>
        <text x="85" y="85" fill="#10b981" font-size="11" font-weight="700">x</text>
        </svg>`
    },
    {
        num: 3,
        title: 'Parallel Lines: Alternate & Corresponding',
        rule: 'If a transversal hits PARALLEL lines: Corresponding angles are EQUAL, and Alternate Interior angles are EQUAL.',
        emoji: '⏸️',
        color: '#6366f1',
        detail: 'Corresponding form an "F" shape (same corner position at both intersections). Alternate form a "Z" shape (inside, opposite sides).',
        examples: ['If alternate interior $\\angle = 45°$, the other is $45°$ too, given lines are parallel!'],
        tip: 'These equalities ONLY work if there are arrows on the lines indicating they are parallel.',
        svg: `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="30" x2="180" y2="30" stroke="#6366f1" stroke-width="2"/>
        <line x1="20" y1="70" x2="180" y2="70" stroke="#6366f1" stroke-width="2"/>
        <polygon points="175,30 165,26 165,34" fill="#6366f1"/>
        <polygon points="175,70 165,66 165,74" fill="#6366f1"/>
        <line x1="60" y1="10" x2="120" y2="90" stroke="#64748b" stroke-width="2"/>
        <path d="M 90 30 A 15 15 0 0 1 100 45" fill="none" stroke="#6366f1" stroke-width="2"/>
        <path d="M 120 70 A 15 15 0 0 1 130 85" fill="none" stroke="#6366f1" stroke-width="2"/>
        <text x="110" y="45" fill="#6366f1" font-size="10" font-weight="700">F-shape (Corr)</text>
        </svg>`
    }
];

export const VOCAB_QUIZ = [
    {
        question: "What is the primary difference between a line segment and a ray?",
        options: ["A ray has no endpoints, a segment has one.", "A segment has two endpoints, a ray has one.", "A segment extends infinitely backwards.", "They are exactly the same."],
        correct: 1,
        explanation: "A line segment is bounded by two distinct endpoints, whereas a ray starts at an endpoint and goes infinitely in one direction."
    },
    {
        question: "Two angles are supplementary if their sum is exactly:",
        options: ["$90°$", "$360°$", "$180°$", "$270°$"],
        correct: 2,
        explanation: "Supplementary angles add up to $180°$, which is a straight angle."
    },
    {
        question: "If an angle is $35°$, what is its complement?",
        options: ["$55°$", "$145°$", "$45°$", "$65°$"],
        correct: 0,
        explanation: "Complementary angles sum to $90°$. $90° - 35° = 55°$."
    },
    {
        question: "What type of angle is strictly greater than $90°$ and strictly less than $180°$?",
        options: ["Acute", "Obtuse", "Reflex", "Right"],
        correct: 1,
        explanation: "An obtuse angle lies between $90°$ and $180°$."
    },
    {
        question: "A line that cuts across two or more other lines is called a:",
        options: ["Parallel line", "Transversal", "Perpendicular point", "Bisector"],
        correct: 1,
        explanation: "A transversal is a single line that intersects two or more other lines at different points."
    },
    {
        question: "Two lines intersect, forming an angle of $75°$. What is the measure of the vertically opposite angle?",
        options: ["$105°$", "$75°$", "$15°$", "$180°$"],
        correct: 1,
        explanation: "Vertically opposite angles formed by intersecting lines are always exactly equal!"
    },
    {
        question: "If two parallel lines are cut by a transversal, alternate interior angles are:",
        options: ["Always supplementary", "Always complementary", "Always equal", "Always unequal"],
        correct: 2,
        explanation: "The alternate interior angle property states that for parallel lines, they form a Z shape and are completely equal."
    },
    {
        question: "What letter shape do corresponding angles typically form?",
        options: ["The letter Z", "The letter F", "The letter X", "The letter C"],
        correct: 1,
        explanation: "Corresponding angles correspond to the same relative position at each intersection, often forming an 'F' shape."
    },
    {
        question: "If the difference between two supplementary angles is $40°$, what are the angles?",
        options: ["$110°$ and $70°$", "$100°$ and $60°$", "$80°$ and $40°$", "$120°$ and $80°$"],
        correct: 0,
        explanation: "Supplementary sum = 180°. Let them be x and y. x+y=180, x-y=40. Therefore 2x=220, x=110, y=70."
    },
    {
        question: "Which term describes a flat surface that extends infinitely in all directions?",
        options: ["A Ray", "A Line", "A Solid", "A Plane"],
        correct: 3,
        explanation: "A plane is a two-dimensional flat surface extending infinitely. Lines and angles exist on planes."
    }
];
