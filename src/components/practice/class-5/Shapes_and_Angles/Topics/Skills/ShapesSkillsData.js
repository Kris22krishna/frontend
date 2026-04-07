// ─── QUESTIONS & DATA FOR SHAPES AND ANGLES ─────────────────────────────────

const getNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generators for different skill sets
const generateAngleIdentificationQuestions = () => {
    const questions = [];
    const types = ['Acute', 'Obtuse', 'Right', 'Straight'];
    for (let i = 0; i < 10; i++) {
        const angle = getNum(10, 170);
        let type, explanation;
        if (angle < 90) {
            type = 'Acute';
            explanation = `$${angle}^\\circ$ is less than $90^\\circ$, so it is an Acute angle.`;
        } else if (angle === 90) {
            type = 'Right';
            explanation = `$90^\\circ$ is an exact L-shape corner, called a Right angle.`;
        } else {
            type = 'Obtuse';
            explanation = `$${angle}^\\circ$ is greater than $90^\\circ$ but less than $180^\\circ$, so it is an Obtuse angle.`;
        }

        const options = [type, ...types.filter(t => t !== type)].slice(0, 4);
        let shuffled = [...options].sort(() => Math.random() - 0.5);

        questions.push({
            question: `What type of angle is $${angle}^\\circ$?`,
            options: shuffled,
            correct: shuffled.indexOf(type),
            explanation
        });
    }
    return questions;
};

const generateMeasuringQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const angle = getNum(1, 18) * 10;
        const options = [`$${angle}^\\circ$`, `$${angle + 10}^\\circ$`, `$${angle - 10}^\\circ$`, `$${180 - angle}^\\circ$`];
        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);

        questions.push({
            question: `If the hands of a clock are at 3 o'clock, what is the angle between them?`,
            options: ['$90^\\circ$', '$45^\\circ$', '$180^\\circ$', '$60^\\circ$'],
            correct: 0,
            explanation: `At 3 o'clock, one hand is at 12 and other at 3, forming a perfect L-shape, which is $90^\\circ$.`
        });
    }
    // Mixing in some generic ones
    questions.push({
        question: `What tool is used to measure an angle accurately?`,
        options: ['Compass', 'Protractor', 'Divider', 'Scale'],
        correct: 1,
        explanation: `A Protractor is a semi-circular tool specifically designed to measure angles in degrees.`
    });
    return questions;
};

const generateRotationQuestions = () => {
    const questions = [];
    const directions = ['Clockwise', 'Anti-clockwise'];
    for (let i = 0; i < 10; i++) {
        const deg = [90, 180, 270, 360][getNum(0, 3)];
        const dir = directions[getNum(0, 1)];
        const turn = deg === 90 ? 'a quarter' : deg === 180 ? 'a half' : deg === 270 ? 'three-quarters' : 'a full';

        questions.push({
            question: `Moving $${deg}^\\circ$ is equal to ${turn} turn.`,
            options: ['True', 'False'],
            correct: 0,
            explanation: `A full turn is $360^\\circ$. So $90^\\circ$ is $1/4$, $180^\\circ$ is $1/2$, and $270^\\circ$ is $3/4$.`
        });
    }
    return questions;
};

const generateAnglesInShapesQuestions = () => {
    const questions = [];
    const shapes = [
        { name: 'Square', angles: 4, type: 'Right' },
        { name: 'Triangle', angles: 3, type: 'various' },
        { name: 'Rectangle', angles: 4, type: 'Right' },
        { name: 'Pentagon', angles: 5, type: 'Obtuse' }
    ];
    for (let i = 0; i < 10; i++) {
        const shape = shapes[getNum(0, 3)];
        questions.push({
            question: `How many angles does a ${shape.name} have?`,
            options: [`$${shape.angles}$`, `$${shape.angles + 1}$`, `$${shape.angles - 1}$`, `$3$`],
            correct: 0,
            explanation: `A ${shape.name} is a polygon with ${shape.angles} sides and ${shape.angles} angles.`
        });
    }
    return questions;
};

// ─── SKILLS CONFIG ──────────────────────────────────────────────────────────

export const SKILLS = [
    {
        id: 'sa-01',
        nodeId: 'a4051002-0001-0000-0000-000000000000',
        title: 'Angle Types',
        subtitle: 'Identification',
        icon: '📐',
        color: '#6366f1',
        desc: 'Identify Acute, Obtuse, and Right angles.',
        learn: {
            concept: 'Types of Angles',
            rules: [
                {
                    title: 'Right Angle',
                    f: '$$\\text{Angle} = 90^\\circ$$',
                    d: 'An L-shaped corner is a Right angle.',
                    ex: 'Corner of a book',
                    tip: 'Look for the square symbol in the corner!'
                },
                {
                    title: 'Acute Angle',
                    f: '$$\\text{Angle} < 90^\\circ$$',
                    d: 'An angle smaller than a Right angle is called Acute.',
                    ex: 'A partially opened pair of scissors',
                    tip: 'Acute means "sharp" — think of a sharp point!'
                },
                {
                    title: 'Obtuse Angle',
                    f: '$$90^\\circ < \\text{Angle} < 180^\\circ$$',
                    d: 'An angle larger than a Right angle but smaller than a straight line is Obtuse.',
                    ex: 'An open laptop screen',
                    tip: 'Obtuse means "blunt"!'
                }
            ]
        },
        practice: generateAngleIdentificationQuestions,
        assessment: generateAngleIdentificationQuestions
    },
    {
        id: 'sa-02',
        nodeId: 'a4051002-0002-0000-0000-000000000000',
        title: 'Measuring',
        subtitle: 'Using Protractor',
        icon: '📏',
        color: '#8b5cf6',
        desc: 'Learn how to use a protractor to find exact degrees.',
        learn: {
            concept: 'Measuring with Protractor',
            rules: [
                {
                    title: 'The Tool',
                    f: '$$\\text{Unit} = \\text{Degrees } (^\\circ)$$',
                    d: 'We use a Protractor to measure angles correctly.',
                    ex: 'Placing the center of the protractor on the vertex.',
                    tip: 'Make sure one arm of the angle aligns with the zero line!'
                }
            ]
        },
        practice: generateMeasuringQuestions,
        assessment: generateMeasuringQuestions
    },
    {
        id: 'sa-03',
        nodeId: 'a4051002-0003-0000-0000-000000000000',
        title: 'Turn & Rotation',
        subtitle: 'Clockwise & More',
        icon: '🕒',
        color: '#4f46e5',
        desc: 'Understand 1/4, 1/2, and full turns.',
        learn: {
            concept: 'Rotation',
            rules: [
                {
                    title: 'Quarter Turn',
                    f: '$$1/4 \\text{ Turn} = 90^\\circ$$',
                    d: 'A quarter turn creates a Right angle.',
                    ex: 'Turning from North to East.',
                    tip: 'Four quarter turns make a full circle!'
                },
                {
                    title: 'Half Turn',
                    f: '$$1/2 \\text{ Turn} = 180^\\circ$$',
                    d: 'A half turn creates a straight line.',
                    ex: 'Turning to face the opposite direction.',
                    tip: 'A half turn is two Right angles!'
                }
            ]
        },
        practice: generateRotationQuestions,
        assessment: generateRotationQuestions
    },
    {
        id: 'sa-04',
        nodeId: 'a4051002-0004-0000-0000-000000000000',
        title: 'Angles in shapes',
        subtitle: 'Visualization',
        icon: '🧱',
        color: '#6366f1',
        desc: 'Find and count angles in common polygons.',
        learn: {
            concept: 'Geometry in Shapes',
            rules: [
                {
                    title: 'Polygons',
                    f: '$$\\text{Sides} = \\text{Angles}$$',
                    d: 'In a closed shape made of straight lines, the number of sides is always equal to the number of angles.',
                    ex: 'A triangle has $3$ sides and $3$ angles.',
                    tip: 'A square has $4$ Right angles!'
                }
            ]
        },
        practice: generateAnglesInShapesQuestions,
        assessment: generateAnglesInShapesQuestions
    }
];

export const CHAPTER_TEST_QUESTIONS = [
    {
        question: "What is the unit used to measure angles?",
        options: ["Centimeters", "Degrees ($^\\circ$)", "Kilograms", "Litres"],
        correct: 1,
        explanation: "Angles are measured in degrees using a protractor."
    },
    {
        question: "An angle that is exactly $90^\\circ$ is called:",
        options: ["Acute", "Obtuse", "Right", "Straight"],
        correct: 2,
        explanation: "A $90^\\circ$ angle forms a perfect L-shape and is called a Right angle."
    },
    {
        question: "How many angles does a pentagon have?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation: "A pentagon has 5 sides and 5 angles."
    },
    {
        question: "A quarter turn is equal to how many degrees?",
        options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"],
        correct: 0,
        explanation: "A full turn is $360^\\circ$, so a quarter ($1/4$) turn is $90^\\circ$."
    },
    {
        question: "An angle of $120^\\circ$ is classified as:",
        options: ["Acute", "Right", "Obtuse", "Straight"],
        correct: 2,
        explanation: "$120^\\circ$ is greater than $90^\\circ$ but less than $180^\\circ$, making it an Obtuse angle."
    },
    {
        question: "Which tool is specifically used to measure angles?",
        options: ["Ruler", "Compass", "Protractor", "Thermometer"],
        correct: 2,
        explanation: "A protractor is used to measure and draw angles."
    },
    {
        question: "If you turn from facing North to facing South, what fraction of a turn have you made?",
        options: ["$1/4$ turn", "$1/2$ turn", "$3/4$ turn", "Full turn"],
        correct: 1,
        explanation: "Facing the opposite direction is a half ($1/2$) turn, which is $180^\\circ$."
    },
    {
        question: "Which of these objects typically has right angles at its corners?",
        options: ["A ball", "A book", "A cone", "An egg"],
        correct: 1,
        explanation: "A book is usually rectangular with $90^\\circ$ right angles at its corners."
    },
    {
        question: "An angle of $45^\\circ$ is called an:",
        options: ["Acute angle", "Obtuse angle", "Right angle", "Straight angle"],
        correct: 0,
        explanation: "An angle less than $90^\\circ$ is called an Acute angle."
    },
    {
        question: "How many angles does a triangle have?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "A triangle has 3 sides and 3 angles."
    },
    {
        question: "A straight line forms an angle of:",
        options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"],
        correct: 1,
        explanation: "A straight line is exactly $180^\\circ$, called a straight angle."
    },
    {
        question: "A complete rotation or full turn is:",
        options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"],
        correct: 3,
        explanation: "A full circle or complete turn is $360^\\circ$."
    },
    {
        question: "What is the angle between the hands of a clock at 3 o'clock?",
        options: ["$30^\\circ$", "$60^\\circ$", "$90^\\circ$", "$120^\\circ$"],
        correct: 2,
        explanation: "At 3 o'clock, the hands form a right angle ($90^\\circ$)."
    },
    {
        question: "How many angles does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correct: 1,
        explanation: "A hexagon has 6 sides and 6 angles."
    },
    {
        question: "Three-quarters ($3/4$) of a turn is equal to:",
        options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"],
        correct: 2,
        explanation: "Three quarter turns ($90^\\circ \\times 3$) equals $270^\\circ$."
    },
    {
        question: "An angle of $10^\\circ$ is:",
        options: ["Acute", "Obtuse", "Right", "Straight"],
        correct: 0,
        explanation: "$10^\\circ$ is less than $90^\\circ$, so it is Acute."
    },
    {
        question: "What is the angle between the hands of a clock at 6 o'clock?",
        options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"],
        correct: 1,
        explanation: "At 6 o'clock, the hands form a straight line, which is $180^\\circ$."
    },
    {
        question: "How many right angles are there in a rectangle?",
        options: ["1", "2", "3", "4"],
        correct: 3,
        explanation: "A rectangle has 4 corners, and each corner is a right angle ($90^\\circ$)."
    },
    {
        question: "If an angle is $91^\\circ$, it is:",
        options: ["Acute", "Right", "Obtuse", "Straight"],
        correct: 2,
        explanation: "Since it is slightly more than $90^\\circ$, it is an Obtuse angle."
    },
    {
        question: "How many angles does a square have?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "A square has 4 sides and 4 angles (all of which are $90^\\circ$)."
    },
    {
        question: "What fraction of a turn is $90^\\circ$?",
        options: ["$1/4$ turn", "$1/2$ turn", "$3/4$ turn", "Full turn"],
        correct: 0,
        explanation: "$90^\\circ$ out of $360^\\circ$ is $1/4$ of a turn."
    },
    {
        question: "How many angles does an octagon have?",
        options: ["6", "7", "8", "9"],
        correct: 2,
        explanation: "An octagon has 8 sides and 8 angles."
    },
    {
        question: "What is the angle between the hands of a clock at 1 o'clock?",
        options: ["$15^\\circ$", "$30^\\circ$", "$45^\\circ$", "$60^\\circ$"],
        correct: 1,
        explanation: "Each hour mark on a clock represents $30^\\circ$ ($360/12$)."
    },
    {
        question: "An angle of $179^\\circ$ is:",
        options: ["Acute", "Right", "Obtuse", "Straight"],
        correct: 2,
        explanation: "It is greater than $90^\\circ$ but still less than $180^\\circ$, so it is Obtuse."
    },
    {
        question: "How many degrees are there in half ($1/2$) of a right angle?",
        options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
        correct: 1,
        explanation: "Half of $90^\\circ$ is $45^\\circ$."
    }
];
