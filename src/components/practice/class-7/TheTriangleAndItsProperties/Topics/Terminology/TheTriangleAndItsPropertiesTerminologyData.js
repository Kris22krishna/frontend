// ─── TERMINOLOGY DATA WITH DIAGRAMS ─────────────────────────────────────────

export const TERMS = [
    {
        name: 'Elements of a Triangle',
        color: '#6366f1',
        icon: '📐',
        def: 'The fundamental parts that make up a triangle: three sides, three angles, and three vertices.',
        examples: ['$\\triangle ABC$ has vertices $A$, $B$, $C$', 'Sides: $AB$, $BC$, $CA$', 'Angles: $\\angle A$, $\\angle B$, $\\angle C$'],
        inUse: 'In $\\triangle PQR$, the side opposite to $\\angle P$ is $QR$.',
        memory: 'TRI = 3. A triangle always has exactly 3 of everything: sides, angles, vertices!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="100,20 25,140 175,140" fill="none" stroke="#6366f1" stroke-width="2.5"/><circle cx="100" cy="20" r="4" fill="#6366f1"/><circle cx="25" cy="140" r="4" fill="#6366f1"/><circle cx="175" cy="140" r="4" fill="#6366f1"/><text x="100" y="10" text-anchor="middle" fill="#6366f1" font-size="14" font-weight="700">A</text><text x="12" y="150" text-anchor="middle" fill="#6366f1" font-size="14" font-weight="700">B</text><text x="188" y="150" text-anchor="middle" fill="#6366f1" font-size="14" font-weight="700">C</text><text x="50" y="75" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600" transform="rotate(-62.5 50 75)">side</text><text x="150" y="75" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600" transform="rotate(58 150 75)">side</text><text x="100" y="155" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="600">side</text></svg>`
    },
    {
        name: 'Scalene Triangle',
        color: '#10b981',
        icon: '📏',
        def: 'A triangle where all three sides have different lengths, and consequently all three angles are also different.',
        examples: ['Sides: $3$ cm, $4$ cm, $5$ cm', 'Sides: $7$ cm, $9$ cm, $12$ cm'],
        inUse: 'A right triangle with sides $3$, $4$, $5$ is also a scalene triangle.',
        memory: 'SCALENE sounds like "scale" — like different readings on a scale!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="70,20 20,140 180,140" fill="rgba(16,185,129,0.08)" stroke="#10b981" stroke-width="2.5"/><text x="35" y="80" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">a</text><text x="135" y="75" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">b</text><text x="100" y="155" text-anchor="middle" fill="#10b981" font-size="11" font-weight="700">c</text><text x="100" y="100" text-anchor="middle" fill="#64748b" font-size="11" font-style="italic">a ≠ b ≠ c</text></svg>`
    },
    {
        name: 'Isosceles Triangle',
        color: '#f59e0b',
        icon: '⚖️',
        def: 'A triangle with at least two sides of equal length. The angles opposite the equal sides are also equal (base angles).',
        examples: ['Sides: $5$ cm, $5$ cm, $8$ cm', 'Angles: $70°$, $70°$, $40°$'],
        inUse: 'The Eiffel Tower has an isosceles triangular cross-section.',
        memory: 'ISO = same. Isosceles has two SAME sides!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="100,20 35,140 165,140" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="2.5"/>
<g transform="translate(67.5, 80) rotate(-61.5)"><line x1="-3" y1="-8" x2="-3" y2="8" stroke="#f59e0b" stroke-width="2.5"/><line x1="3" y1="-8" x2="3" y2="8" stroke="#f59e0b" stroke-width="2.5"/></g>
<g transform="translate(132.5, 80) rotate(61.5)"><line x1="-3" y1="-8" x2="-3" y2="8" stroke="#f59e0b" stroke-width="2.5"/><line x1="3" y1="-8" x2="3" y2="8" stroke="#f59e0b" stroke-width="2.5"/></g>
<text x="100" y="105" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">2 sides equal</text></svg>`
    },
    {
        name: 'Equilateral Triangle',
        color: '#f43f5e',
        icon: '🔺',
        def: 'A triangle where all three sides are equal in length. Each interior angle is exactly $60°$.',
        examples: ['Sides: $6$ cm, $6$ cm, $6$ cm', 'All angles = $60°$'],
        inUse: 'A yield traffic sign is shaped like an equilateral triangle.',
        memory: 'EQUI = equal + LATERAL = sides. All sides equal!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="100,20 30.72,140 169.28,140" fill="rgba(244,63,94,0.08)" stroke="#f43f5e" stroke-width="2.5"/>
<g transform="translate(65.36, 80) rotate(-60)"><line x1="0" y1="-8" x2="0" y2="8" stroke="#f43f5e" stroke-width="2.5"/></g>
<g transform="translate(134.64, 80) rotate(60)"><line x1="0" y1="-8" x2="0" y2="8" stroke="#f43f5e" stroke-width="2.5"/></g>
<g transform="translate(100, 140)"><line x1="0" y1="-8" x2="0" y2="8" stroke="#f43f5e" stroke-width="2.5"/></g>
<path d="M 90.0 37.3 A 20 20 0 0 0 110.0 37.3" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
<path d="M 50.7 140.0 A 20 20 0 0 0 40.7 122.7" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
<path d="M 159.3 122.7 A 20 20 0 0 0 149.3 140.0" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
<text x="100" y="95" text-anchor="middle" fill="#f43f5e" font-size="12" font-weight="700">60°</text><text x="50" y="132" text-anchor="middle" fill="#f43f5e" font-size="12" font-weight="700">60°</text><text x="150" y="132" text-anchor="middle" fill="#f43f5e" font-size="12" font-weight="700">60°</text></svg>`
    },
    {
        name: 'Acute-angled Triangle',
        color: '#0891b2',
        icon: '📊',
        def: 'A triangle in which ALL three interior angles are strictly less than $90°$ (every angle is acute).',
        examples: ['Angles: $50°$, $60°$, $70°$', 'Angles: $60°$, $60°$, $60°$'],
        inUse: 'An equilateral triangle is always an acute-angled triangle.',
        memory: 'ACUTE = sharp and small. All angles are "cute" and small (< 90°)!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="100,20 25,135 160,135" fill="rgba(8,145,178,0.08)" stroke="#0891b2" stroke-width="2.5"/>
<path d="M 88.0 38.4 A 22 22 0 0 0 110.2 39.5" fill="none" stroke="#0891b2" stroke-width="1.5"/>
<path d="M 47.0 135.0 A 22 22 0 0 0 37.0 116.6" fill="none" stroke="#0891b2" stroke-width="1.5"/>
<path d="M 149.8 115.5 A 22 22 0 0 0 138.0 135.0" fill="none" stroke="#0891b2" stroke-width="1.5"/>
<text x="100" y="95" text-anchor="middle" fill="#0891b2" font-size="11" font-weight="600">All angles &lt; 90°</text></svg>`
    },
    {
        name: 'Right-angled Triangle',
        color: '#8b5cf6',
        icon: '📱',
        def: 'A triangle with exactly one right angle ($90°$). The side opposite the right angle is called the hypotenuse — the longest side.',
        examples: ['Angles: $90°$, $45°$, $45°$', 'Angles: $90°$, $30°$, $60°$'],
        inUse: 'Pythagoras Theorem applies only to right-angled triangles: $a^2 + b^2 = c^2$.',
        memory: 'Look for the little square ◻ in the corner — that marks 90°!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="30,140 30,30 170,140" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" stroke-width="2.5"/><path d="M 30 125 L 45 125 L 45 140" fill="none" stroke="#8b5cf6" stroke-width="1.5"/><text x="105" y="75" text-anchor="middle" fill="#8b5cf6" font-size="12" font-weight="700" transform="rotate(38.1 105 75)">hypotenuse</text><text x="52" y="132" text-anchor="middle" fill="#8b5cf6" font-size="11" font-weight="600">90°</text></svg>`
    },
    {
        name: 'Obtuse-angled Triangle',
        color: '#ec4899',
        icon: '📐',
        def: 'A triangle with exactly one obtuse angle (an angle greater than $90°$ but less than $180°$).',
        examples: ['Angles: $120°$, $30°$, $30°$', 'Angles: $100°$, $50°$, $30°$'],
        inUse: 'If one angle is $120°$, the triangle is obtuse because $120° > 90°$.',
        memory: 'OBTUSE = fat or wide. One angle is wider than 90°!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="30,80 5,140 190,140" fill="rgba(236,72,153,0.08)" stroke="#ec4899" stroke-width="2.5"/><path d="M 20.4 103.1 A 25 25 0 0 0 53.4 88.8" fill="none" stroke="#ec4899" stroke-width="2"/><text x="45" y="125" text-anchor="middle" fill="#ec4899" font-size="12" font-weight="700">&gt;90°</text></svg>`
    },
    {
        name: 'Median',
        color: '#059669',
        icon: '📍',
        def: 'A line segment connecting a vertex of a triangle to the midpoint of the opposite side. Every triangle has 3 medians, and they all meet at a single point called the centroid.',
        examples: ['Median from $A$ to midpoint of $BC$', 'All 3 medians intersect at the centroid'],
        inUse: 'The centroid divides each median in a $2:1$ ratio from the vertex.',
        memory: 'MEDian → MIDpoint. A median goes to the MIDDLE of the opposite side!',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="100,15 20,140 180,140" fill="none" stroke="#94a3b8" stroke-width="1.5"/><line x1="100" y1="15" x2="100" y2="140" stroke="#059669" stroke-width="2.5"/><circle cx="100" cy="140" r="4" fill="#059669"/><text x="108" y="152" fill="#059669" font-size="10" font-weight="700">M (midpoint)</text><text x="96" y="10" fill="#334155" font-size="12" font-weight="700">A</text><text x="7" y="150" fill="#334155" font-size="12" font-weight="700">B</text><text x="185" y="150" fill="#334155" font-size="12" font-weight="700">C</text><text x="108" y="85" fill="#059669" font-size="11" font-weight="700">median</text>
<line x1="56" y1="135" x2="56" y2="145" stroke="#94a3b8" stroke-width="2"/><line x1="64" y1="135" x2="64" y2="145" stroke="#94a3b8" stroke-width="2"/>
<line x1="136" y1="135" x2="136" y2="145" stroke="#94a3b8" stroke-width="2"/><line x1="144" y1="135" x2="144" y2="145" stroke="#94a3b8" stroke-width="2"/>
</svg>`
    },
    {
        name: 'Altitude',
        color: '#0369a1',
        icon: '📏',
        def: 'A perpendicular line segment drawn from a vertex to the opposite side (or its extension). It represents the height of the triangle.',
        examples: ['Altitude from $A$ perpendicular to $BC$', 'A triangle has 3 altitudes'],
        inUse: 'In a right-angled triangle, two sides themselves act as altitudes.',
        memory: 'ALTItude ↔ ALTItude like height of an airplane! It goes straight DOWN from the vertex.',
        svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><polygon points="100,15 20,140 180,140" fill="none" stroke="#94a3b8" stroke-width="1.5"/><line x1="100" y1="15" x2="100" y2="140" stroke="#0369a1" stroke-width="2.5"/><path d="M 100 130 L 110 130 L 110 140" fill="none" stroke="#0369a1" stroke-width="1.5"/><text x="96" y="10" fill="#334155" font-size="12" font-weight="700">A</text><text x="108" y="80" fill="#0369a1" font-size="11" font-weight="700">altitude</text></svg>`
    },
    {
        name: 'Exterior Angle',
        color: '#b45309',
        icon: '↗️',
        def: 'An angle formed between one side of a triangle and the extension of an adjacent side. It is supplementary to the interior angle at that vertex.',
        examples: ['If interior angle is $60°$, exterior = $120°$', 'Exterior angle = sum of remote interior angles'],
        inUse: '$\\angle ACD = \\angle A + \\angle B$ where $D$ is on the extension of $BC$.',
        memory: 'EXTERIOR = outside. It is the angle OUTSIDE the triangle at a vertex!',
        svg: `<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg"><polygon points="60,20 20,130 140,130" fill="none" stroke="#94a3b8" stroke-width="1.5"/><line x1="140" y1="130" x2="210" y2="130" stroke="#b45309" stroke-width="2.5" stroke-dasharray="5,3"/><path d="M 128.2 113.8 A 20 20 0 0 1 160.0 130.0" fill="rgba(180,83,9,0.15)" stroke="#b45309" stroke-width="2"/><text x="162" y="122" fill="#b45309" font-size="12" font-weight="700">ext</text><text x="60" y="12" fill="#334155" font-size="12" font-weight="700">A</text><text x="7" y="140" fill="#334155" font-size="12" font-weight="700">B</text><text x="135" y="145" fill="#334155" font-size="12" font-weight="700">C</text><text x="210" y="145" fill="#b45309" font-size="12" font-weight="700">D</text></svg>`
    }
];

export const FOUR_RULES = [
    {
        num: 1,
        title: 'Exterior Angle Property',
        rule: 'An exterior angle of a triangle equals the sum of its two interior opposite angles.',
        emoji: '📐',
        color: '#f59e0b',
        detail: 'If the exterior angle at vertex $C$ is $\\angle ACD$, then $\\angle ACD = \\angle A + \\angle B$. This is because $\\angle ACB + \\angle ACD = 180°$ and $\\angle A + \\angle B + \\angle ACB = 180°$.',
        examples: ['If $\\angle A = 50°$ and $\\angle B = 60°$, exterior $= 110°$', 'If $\\angle A = 40°$ and $\\angle B = 70°$, exterior $= 110°$'],
        tip: 'The exterior angle is always BIGGER than either of the two interior opposite angles!',
        svg: `<svg viewBox="0 0 220 145" xmlns="http://www.w3.org/2000/svg"><polygon points="60,25 20,125 140,125" fill="rgba(245,158,11,0.04)" stroke="#94a3b8" stroke-width="1.5"/><line x1="140" y1="125" x2="210" y2="125" stroke="#f59e0b" stroke-width="2.5"/><path d="M 51.8 45.4 A 22 22 0 0 0 73.7 42.2" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" stroke-width="1.5"/><text x="60" y="65" fill="#3b82f6" font-size="11" font-weight="700">∠A</text><path d="M 42.0 125.0 A 22 22 0 0 0 28.2 104.6" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="1.5"/><text x="50" y="118" fill="#10b981" font-size="11" font-weight="700">∠B</text><path d="M 125.0 106.3 A 24 24 0 0 1 164.0 125.0" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="2"/><text x="156" y="115" fill="#f59e0b" font-size="11" font-weight="800">∠A + ∠B</text><text x="60" y="15" fill="#334155" font-size="12" font-weight="700">A</text><text x="7" y="135" fill="#334155" font-size="12" font-weight="700">B</text><text x="135" y="140" fill="#334155" font-size="12" font-weight="700">C</text></svg>`
    },
    {
        num: 2,
        title: 'Angle Sum Property',
        rule: 'The sum of the three interior angles of a triangle is always $180°$.',
        emoji: '🔺',
        color: '#10b981',
        detail: 'For any triangle $\\triangle ABC$: $\\angle A + \\angle B + \\angle C = 180°$. This is one of the most fundamental properties and is used to find unknown angles.',
        examples: ['$60° + 60° + 60° = 180°$ (equilateral)', '$90° + 45° + 45° = 180°$ (right isosceles)'],
        tip: 'If you know two angles, the third is simply $180° -$ (sum of the other two)!',
        svg: `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><polygon points="100,15 20,115 180,115" fill="rgba(16,185,129,0.06)" stroke="#10b981" stroke-width="2.5"/><path d="M 86.3 32.2 A 22 22 0 0 0 113.7 32.2" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.5"/><path d="M 42.0 115.0 A 22 22 0 0 0 33.7 97.8" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.5"/><path d="M 166.3 97.8 A 22 22 0 0 0 158.0 115.0" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.5"/><text x="100" y="80" text-anchor="middle" fill="#10b981" font-size="14" font-weight="800">A + B + C = 180°</text></svg>`
    },
    {
        num: 3,
        title: 'Triangle Inequality Theorem',
        rule: 'The sum of any two sides of a triangle must be strictly greater than the third side.',
        emoji: '📏',
        color: '#6366f1',
        detail: 'For sides $a$, $b$, $c$: $a + b > c$, $b + c > a$, and $a + c > b$ must ALL be true. If any fails, the triangle cannot exist.',
        examples: ['$3 + 4 = 7 > 5$ ✓ (valid triangle)', '$2 + 3 = 5$ is NOT $> 6$ ✗ (invalid!)'],
        tip: 'Quick check: add the two SMALLEST sides. If the sum is greater than the LARGEST side, it works!',
        svg: `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg"><line x1="20" y1="70" x2="200" y2="70" stroke="#6366f1" stroke-width="3"/><text x="110" y="90" text-anchor="middle" fill="#6366f1" font-size="14" font-weight="800">c</text><line x1="20" y1="70" x2="90" y2="15" stroke="#6366f1" stroke-width="3"/><text x="45" y="35" fill="#6366f1" font-size="14" font-weight="800">a</text><line x1="90" y1="15" x2="200" y2="70" stroke="#6366f1" stroke-width="3"/><text x="155" y="35" fill="#6366f1" font-size="14" font-weight="800">b</text><text x="110" y="15" text-anchor="middle" fill="#334155" font-size="12" font-weight="700">a + b &gt; c</text></svg>`
    }
];

export const VOCAB_QUIZ = [
    {
        question: "How many medians does a triangle have?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        explanation: "A triangle has 3 vertices, and a median can be drawn from each vertex to the midpoint of the opposite side."
    },
    {
        question: "What is the sum of all interior angles in a triangle?",
        options: ["$90°$", "$180°$", "$270°$", "$360°$"],
        correct: 1,
        explanation: "The Angle Sum Property states that the sum of all three interior angles is always $180°$."
    },
    {
        question: "If the two equal sides of an isosceles triangle are $5$ cm each, which of these could be the third side?",
        options: ["$10$ cm", "$12$ cm", "$8$ cm", "$15$ cm"],
        correct: 2,
        explanation: "By the Triangle Inequality, $5 + 5 = 10 > 8$, but $5 + 5 = 10$ is NOT $> 10$, $12$, or $15$. Only $8$ cm works."
    },
    {
        question: "What type of triangle has all angles less than $90°$?",
        options: ["Right-angled", "Obtuse-angled", "Acute-angled", "Equilateral"],
        correct: 2,
        explanation: "An acute-angled triangle has all three angles strictly less than $90°$."
    },
    {
        question: "Where do the medians of a triangle always lie?",
        options: ["Completely inside", "On the boundary", "Outside", "Depends on the type"],
        correct: 0,
        explanation: "Medians always lie entirely within the interior of the triangle regardless of the triangle type."
    },
    {
        question: "For an obtuse triangle, where does the altitude from an acute-angle vertex fall?",
        options: ["Inside", "Outside", "On a side", "Cannot be drawn"],
        correct: 1,
        explanation: "In an obtuse triangle, altitudes from acute-angle vertices fall outside the triangle to meet the extended opposite side."
    },
    {
        question: "If $\\angle A = 40°$ and $\\angle B = 60°$, what is the exterior angle at $C$?",
        options: ["$80°$", "$100°$", "$140°$", "$20°$"],
        correct: 1,
        explanation: "By the Exterior Angle Property, exterior angle at $C$ $= \\angle A + \\angle B = 40° + 60° = 100°$."
    },
    {
        question: "A triangle with sides $2$ cm, $3$ cm, and $6$ cm is:",
        options: ["Scalene", "Not possible", "Isosceles", "Right-angled"],
        correct: 1,
        explanation: "By Triangle Inequality: $2 + 3 = 5$, which is NOT $> 6$. This triangle cannot exist."
    },
    {
        question: "Each angle of an equilateral triangle measures:",
        options: ["$90°$", "$45°$", "$60°$", "$120°$"],
        correct: 2,
        explanation: "In an equilateral triangle, all angles are equal. Since they sum to $180°$, each angle $= 180° ÷ 3 = 60°$."
    },
    {
        question: "The point where all three medians of a triangle meet is called the:",
        options: ["Circumcentre", "Incentre", "Centroid", "Orthocentre"],
        correct: 2,
        explanation: "The centroid is the point of intersection of all three medians. It divides each median in a $2:1$ ratio."
    }
];
