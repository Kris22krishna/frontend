// ─── SVG Helpers for Terminology Illustrations ─────────────────────

function drawSquare(color) {
    return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="25" width="50" height="50" rx="4" fill="${color}20" stroke="${color}" stroke-width="3"/>
        <text x="50" y="55" text-anchor="middle" font-weight="bold" fill="${color}" font-size="12">Area</text>
        <text x="50" y="20" text-anchor="middle" fill="${color}" font-size="10">Side = a</text>
    </svg>`;
}

function drawRectangle(color) {
    return `<svg width="150" height="80" viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="20" width="100" height="40" rx="4" fill="${color}20" stroke="${color}" stroke-width="3"/>
        <text x="75" y="44" text-anchor="middle" font-weight="bold" fill="${color}" font-size="10">Length × Breadth</text>
        <text x="75" y="15" text-anchor="middle" fill="${color}" font-size="10">Length (l)</text>
        <text x="15" y="44" text-anchor="middle" fill="${color}" font-size="10" transform="rotate(-90 15,44)">Breadth (b)</text>
    </svg>`;
}

function drawPerimeter(color) {
    return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,15 85,85 15,85" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="6,4"/>
        <circle cx="50" cy="15" r="4" fill="${color}" />
        <circle cx="85" cy="85" r="4" fill="${color}" />
        <circle cx="15" cy="85" r="4" fill="${color}" />
        <text x="50" y="60" text-anchor="middle" font-weight="bold" fill="${color}" font-size="11">Perimeter</text>
    </svg>`;
}

function drawPolygon(color) {
    return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 90,35 75,85 25,85 10,35" fill="${color}20" stroke="${color}" stroke-width="3"/>
        <text x="50" y="55" text-anchor="middle" font-weight="bold" fill="${color}" font-size="10">Polygon</text>
    </svg>`;
}

function drawRegularHexagon(color) {
    return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="${color}15" stroke="${color}" stroke-width="3"/>
        <line x1="10" y1="50" x2="20" y2="50" stroke="${color}" stroke-width="2"/>
        <line x1="80" y1="50" x2="90" y2="50" stroke="${color}" stroke-width="2"/>
        <line x1="62" y1="16" x2="72" y2="24" stroke="${color}" stroke-width="2"/>
        <line x1="28" y1="16" x2="38" y2="24" stroke="${color}" stroke-width="2"/>
        <text x="50" y="55" text-anchor="middle" font-weight="bold" fill="${color}" font-size="10">Regular</text>
    </svg>`;
}

function drawUnitSquare(color) {
    return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="30" width="40" height="40" fill="${color}40" stroke="${color}" stroke-width="2"/>
        <text x="50" y="55" text-anchor="middle" font-weight="bold" fill="${color}" font-size="12">1 cm²</text>
        <line x1="30" y1="20" x2="70" y2="20" stroke="${color}" stroke-width="1" stroke-dasharray="2,2" />
        <text x="50" y="15" text-anchor="middle" font-size="8" fill="${color}">1 cm</text>
        <line x1="20" y1="30" x2="20" y2="70" stroke="${color}" stroke-width="1" stroke-dasharray="2,2" />
        <text x="15" y="50" text-anchor="middle" font-size="8" fill="${color}" transform="rotate(-90 15,50)">1 cm</text>
    </svg>`;
}

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Perimeter',
        color: '#6366f1',
        icon: '🔗',
        def: 'The distance covered along the boundary forming a closed figure when you go round the figure once.',
        examples: ['Fencing a garden', 'Putting a ribbon around a picture frame'],
        inUse: 'To find the perimeter, simply add up the lengths of all the outer sides.',
        memory: 'Perimeter = The total length of the OUTSIDE.',
        svg: drawPerimeter('#6366f1')
    },
    {
        name: 'Area',
        color: '#10b981',
        icon: '🟩',
        def: 'The amount of surface enclosed by a closed figure.',
        examples: ['Painting a wall', 'Spreading carpet on a floor', 'Planting grass in a lawn'],
        inUse: 'Area is measured in square units, like square centimeters ($cm^2$) or square meters ($m^2$).',
        memory: '"A" is for Area, "A" is for All the space INSIDE!',
        svg: drawSquare('#10b981')
    },
    {
        name: 'Polygon',
        color: '#ef4444',
        icon: '🔺',
        def: 'A closed two-dimensional figure made up entirely of straight line segments.',
        examples: ['Triangles (3 sides)', 'Quadrilaterals (4 sides)', 'Pentagons (5 sides)'],
        inUse: 'A circle is NOT a polygon because it has a curved boundary, not straight lines.',
        memory: 'Poly = Many, Gon = Angles/Sides. Straight lines only!',
        svg: drawPolygon('#ef4444')
    },
    {
        name: 'Regular Polygon',
        color: '#0891b2',
        icon: '⬢',
        def: 'A polygon in which all sides are exactly the same length, and all interior angles are equal.',
        examples: ['Square', 'Equilateral Triangle', 'Regular Hexagon'],
        inUse: 'Because sides are equal, Perimeter = (Number of sides) $\\times$ (length of one side).',
        memory: 'Regular means perfectly even!',
        svg: drawRegularHexagon('#0891b2')
    },
    {
        name: 'Unit Square',
        color: '#f59e0b',
        icon: '🧩',
        def: 'A square with sides of exactly 1 unit (e.g., 1 cm or 1 m). Used to measure the Area of other shapes.',
        examples: ['Measuring a book cover by seeing how many $1 cm^2$ squares fit on it'],
        inUse: 'If a rectangle holds 12 unit squares, its area is $12 \\text{ square units}$.',
        memory: 'The fundamental building block of Area.',
        svg: drawUnitSquare('#f59e0b')
    },
    {
        name: 'Length & Breadth',
        color: '#ec4899',
        icon: '📏',
        def: 'The two dimensions of a rectangle. Length ($l$) is usually the longer side, and Breadth or Width ($b$) is the shorter side.',
        examples: ['A room is 5m long and 4m wide'],
        inUse: 'Perimeter = $2 \\times (l + b)$. Area = $l \\times b$.',
        memory: 'L is for Longest, B is for the Base width.',
        svg: drawRectangle('#ec4899')
    }
];

export const CHART_TYPES = [
    {
        num: 1,
        title: 'Perimeter of a Rectangle',
        rule: 'Perimeter $= 2 \\times (\\text{Length} + \\text{Breadth})$',
        emoji: '▭',
        color: '#10b981',
        detail: 'Since a rectangle has two equal lengths and two equal breadths, we add one length and one breadth together, then double the result.',
        examples: ['If $l=5$ and $b=3$, Perimeter $= 2 \\times (5+3) = 16$'],
        tip: 'Don\'t forget the brackets! Always add length and breadth FIRST, then multiply by 2.',
        svg: drawRectangle('#10b981')
    },
    {
        num: 2,
        title: 'Perimeter of a Square',
        rule: 'Perimeter $= 4 \\times \\text{Length of a side}$',
        emoji: '◽',
        color: '#3b82f6',
        detail: 'A square is a regular polygon with 4 equal sides. Instead of adding $a + a + a + a$, we just multiply by 4.',
        examples: ['If side $a=6$, Perimeter $= 4 \\times 6 = 24$'],
        tip: 'If you know the perimeter of a square and want to find the side, just divide the perimeter by 4.',
        svg: drawSquare('#3b82f6')
    },
    {
        num: 3,
        title: 'Area of a Rectangle',
        rule: 'Area $= \\text{Length} \\times \\text{Breadth}$',
        emoji: '🔲',
        color: '#ef4444',
        detail: 'To find how much space a rectangle covers, multiply its two dimensions. The answer is always in "square units".',
        examples: ['If $l=8cm$ and $b=3cm$, Area $= 24~cm^2$'],
        tip: 'If you know the Area and the Length, you can find the Breadth by dividing: Breadth = Area ÷ Length.',
        svg: drawRectangle('#ef4444')
    },
    {
        num: 4,
        title: 'Area of a Square',
        rule: 'Area $= \\text{side} \\times \\text{side}$',
        emoji: '⬛',
        color: '#f59e0b',
        detail: 'Because a square’s length and breadth are identical, you simply multiply the side length by itself (square it).',
        examples: ['If side is $5cm$, Area $= 5 \\times 5 = 25~cm^2$'],
        tip: 'Side $\\times$ Side is also written algebraically as $a^2$.',
        svg: drawSquare('#f59e0b')
    }
];

export const VOCAB_QUIZ = [
    {
        question: "What is the distance around the boundary of a closed figure called?",
        options: ["Area", "Volume", "Perimeter", "Capacity"],
        correct: 2,
        explanation: "The Perimeter is the total length of the outside boundary of any closed figure."
    },
    {
        question: "The amount of surface space enclosed by a closed figure is known as its:",
        options: ["Perimeter", "Area", "Length", "Surface Boundary"],
        correct: 1,
        explanation: "Area tells us how much flat surface the shape covers on the inside."
    },
    {
        question: "Which of the following is the correct formula for the Perimeter of a Rectangle?",
        options: ["Length × Breadth", "2 × (Length + Breadth)", "4 × Length", "Length + Breadth"],
        correct: 1,
        explanation: "A rectangle has 2 lengths and 2 breadths. So the perimeter is $2 \\times (l + b)$."
    },
    {
        question: "A polygon is 'Regular' ONLY if:",
        options: ["It has more than 4 sides", "All its sides are equal and all angles are equal", "It fits inside a circle", "It has straight lines"],
        correct: 1,
        explanation: "A regular polygon must have both completely equal side lengths and equal interior angles."
    },
    {
        question: "What is the formula for the Area of a Square?",
        options: ["4 × side", "side + side", "side × side", "2 × side"],
        correct: 2,
        explanation: "Area of a square is calculated by multiplying its side by itself (side $\\times$ side)."
    },
    {
        question: "Which of these tasks requires you to find the Area?",
        options: ["Fencing a rectangular park", "Putting a lace border on a tablecloth", "Planting grass over a garden floor", "Walking around a track"],
        correct: 2,
        explanation: "Planting grass covers the INSIDE space, which requires finding the Area."
    },
    {
        question: "If the perimeter of a square is 20 cm, what is the length of one side?",
        options: ["10 cm", "5 cm", "4 cm", "100 cm"],
        correct: 1,
        explanation: "Perimeter = $4 \\times \\text{side}$. Therefore, $\\text{side} = 20 / 4 = 5$ cm."
    },
    {
        question: "What is the Perimeter of an Equilateral Triangle with side 'a'?",
        options: ["a × a", "3 × a", "4 × a", "a + a"],
        correct: 1,
        explanation: "An equilateral triangle has 3 equal sides. So the perimeter is three times its side ($3 \\times a$)."
    },
    {
        question: "If a rectangle has an Area of 40 $cm^2$ and a length of 8 cm, what is its breadth?",
        options: ["32 cm", "5 cm", "48 cm", "8 cm"],
        correct: 1,
        explanation: "Area ($l \\times b$) is 40. Since $l = 8$, we calculate $b = Area / l = 40 / 8 = 5$ cm."
    },
    {
        question: "When measuring Area, which of these is the correct standard unit format?",
        options: ["Centimeters (cm)", "Meters (m)", "Square Centimeters ($cm^2$)", "Cubic Centimeters ($cm^3$)"],
        correct: 2,
        explanation: "Area is always measured in square units, such as square centimeters ($cm^2$) or square meters ($m^2$)."
    }
];
