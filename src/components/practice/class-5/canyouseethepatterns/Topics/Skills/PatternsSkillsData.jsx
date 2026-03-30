import React from 'react';
import { 
    ArrowUp, ArrowRight, ArrowDown, ArrowLeft,
    Star, Heart, Diamond, Shield, Moon, Sun, Zap, Cloud,
    Square, Circle, Triangle, Pentagon, Hexagon,
    MoveRight, RefreshCw
} from 'lucide-react';

const getNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// 1. NUMBER PATTERNS
const generateNumberPatterns = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const type = i % 4;
        let sequence, next, q, explanation;

        if (type === 0) { // Arithmetic
            const start = getNum(5, 50);
            const diff = getNum(4, 12);
            sequence = [start, start + diff, start + 2 * diff, start + 3 * diff];
            next = start + 4 * diff;
            q = `Identify the next number in the pattern: $${sequence.join(', ')}, \\dots$`;
            explanation = `In this pattern, each number is found by adding $${diff}$ to the previous number. $${sequence[3]} + ${diff} = ${next}$.`;
        } else if (type === 1) { // Geometric (Small numbers)
            const start = getNum(2, 5);
            const ratio = getNum(2, 3);
            sequence = [start, start * ratio, start * ratio * ratio, start * Math.pow(ratio, 3)];
            next = start * Math.pow(ratio, 4);
            q = `Identify the next number in the pattern: $${sequence.join(', ')}, \\dots$`;
            explanation = `In this pattern, each number is multiplied by $${ratio}$ to get the next number. $${sequence[3]} \\times ${ratio} = ${next}$.`;
        } else if (type === 2) { // Square numbers
            const start = getNum(1, 6);
            sequence = [Math.pow(start, 2), Math.pow(start + 1, 2), Math.pow(start + 2, 2), Math.pow(start + 3, 2)];
            next = Math.pow(start + 4, 2);
            q = `Identify the next number in the pattern: $${sequence.join(', ')}, \\dots$`;
            explanation = `These are square numbers ($${start}^2, ${(start + 1)}^2, {(start + 2)}^2, {(start + 3)}^2$). The next one is $${start + 4}^2 = ${next}$.`;
        } else { // Mixed/Jumping
            const start = getNum(100, 200);
            const jump = getNum(10, 20);
            sequence = [start, start - jump, start - 2 * jump, start - 3 * jump];
            next = start - 4 * jump;
            q = `Identify the next number in the pattern: $${sequence.join(', ')}, \\dots$`;
            explanation = `In this pattern, we subtract $${jump}$ from the previous number. $${sequence[3]} - ${jump} = ${next}$.`;
        }

        const options = [next, next + getNum(1, 5), next - getNum(1, 5), next + 10].sort(() => Math.random() - 0.5);
        const uniqueOptions = [...new Set(options)];
        while(uniqueOptions.length < 4) uniqueOptions.push(next + getNum(11, 20));

        questions.push({
            question: q,
            options: uniqueOptions.map(String).map(s => `$${s}$`),
            correct: uniqueOptions.indexOf(next),
            explanation
        });
    }
    return questions;
};

// 2. SHAPE PATTERNS
const generateShapePatterns = () => {
    const questions = [];
    const iconStyle = { size: 28, strokeWidth: 2.5 };
    
    const allShapes = [
        { icon: <Circle {...iconStyle} />, name: "Circle" },
        { icon: <Square {...iconStyle} />, name: "Square" },
        { icon: <Triangle {...iconStyle} />, name: "Triangle" },
        { icon: <Pentagon {...iconStyle} />, name: "Pentagon" },
        { icon: <Hexagon {...iconStyle} />, name: "Hexagon" },
        { icon: <Star {...iconStyle} />, name: "Star" },
        { icon: <Heart {...iconStyle} />, name: "Heart" },
        { icon: <Diamond {...iconStyle} />, name: "Diamond" },
        { icon: <Shield {...iconStyle} />, name: "Shield" },
        { icon: <Moon {...iconStyle} />, name: "Moon" },
        { icon: <Sun {...iconStyle} />, name: "Sun" },
        { icon: <Zap {...iconStyle} />, name: "Zap" },
        { icon: <Cloud {...iconStyle} />, name: "Cloud" }
    ];

    const directions = [
        { icon: <ArrowUp {...iconStyle} />, name: "Up", angle: 0 },
        { icon: <ArrowRight {...iconStyle} />, name: "Right", angle: 90 },
        { icon: <ArrowDown {...iconStyle} />, name: "Down", angle: 180 },
        { icon: <ArrowLeft {...iconStyle} />, name: "Left", angle: 270 }
    ];

    // --- 1. ROTATION PATTERNS (90 deg) ---
    for (let i = 0; i < 4; i++) {
        const startIdx = getNum(0, 3);
        const sequence = [
            directions[startIdx].icon,
            directions[(startIdx + 1) % 4].icon,
            directions[(startIdx + 2) % 4].icon
        ];
        const correctAnswer = directions[(startIdx + 3) % 4].icon;
        const options = shuffle(directions.map(d => d.icon));

        questions.push({
            question: "Which arrow shows the next 90° clockwise rotation?",
            visualSequence: sequence,
            options: options,
            correct: options.indexOf(correctAnswer),
            explanation: `The arrow is rotating 90° clockwise. The next position after pointing ${directions[(startIdx + 2) % 4].name} is pointing ${directions[(startIdx + 3) % 4].name}.`
        });
    }

    // --- 2. CYCLING PATTERNS (3 shapes) ---
    for (let i = 0; i < 4; i++) {
        const selected = shuffle(allShapes).slice(0, 3);
        const sequence = [selected[0].icon, selected[1].icon, selected[2].icon, selected[0].icon, selected[1].icon];
        const next = selected[2];
        const options = shuffle([...selected.map(s => s.icon), pick(allShapes.filter(s => !selected.includes(s))).icon]);

        questions.push({
            question: `Find the next shape in this repeating sequence: ${selected[0].name}, ${selected[1].name}, ${selected[2].name}...`,
            visualSequence: sequence,
            options: options,
            correct: options.indexOf(next.icon),
            explanation: `This is a repeating pattern of three shapes: ${selected[0].name} → ${selected[1].name} → ${selected[2].name}. After ${selected[1].name}, the next shape is ${selected[2].name}.`
        });
    }

    // --- 3. GROWING PATTERNS ---
    for (let i = 0; i < 4; i++) {
        const shape = pick(allShapes);
        const sequence = [
            <div style={{ display: 'flex' }}>{shape.icon}</div>,
            <div style={{ display: 'flex', gap: 2 }}>{shape.icon}{shape.icon}</div>,
            <div style={{ display: 'flex', gap: 2 }}>{shape.icon}{shape.icon}{shape.icon}</div>
        ];
        const next = <div style={{ display: 'flex', gap: 2 }}>{shape.icon}{shape.icon}{shape.icon}{shape.icon}</div>;
        const distractor1 = <div style={{ display: 'flex', gap: 2 }}>{shape.icon}{shape.icon}{shape.icon}{shape.icon}{shape.icon}</div>;
        const distractor2 = <div style={{ display: 'flex', gap: 2 }}>{shape.icon}</div>;
        const distractor3 = <div style={{ display: 'flex', gap: 2 }}>{pick(allShapes).icon}</div>;
        
        const options = shuffle([next, distractor1, distractor2, distractor3]);

        questions.push({
            question: `Identify the next step in this growing pattern of ${shape.name}s.`,
            visualSequence: sequence,
            options: options,
            correct: options.indexOf(next),
            explanation: `The number of ${shape.name}s increases by one in each step (1, 2, 3...). The next step should have 4 ${shape.name}s.`
        });
    }

    // --- 4. ALTERNATING PATTERNS (AABAAB) ---
    for (let i = 0; i < 4; i++) {
        const [a, b] = shuffle(allShapes).slice(0, 2);
        const sequence = [a.icon, a.icon, b.icon, a.icon, a.icon];
        const next = b.icon;
        const options = shuffle([a.icon, b.icon, pick(allShapes.filter(s => s !== a && s !== b)).icon, pick(allShapes).icon]);

        questions.push({
            question: "What comes next in this alternating pattern?",
            visualSequence: sequence,
            options: options,
            correct: options.indexOf(next),
            explanation: `The pattern is ${a.name}, ${a.name}, ${b.name}. After two ${a.name}s, we always have one ${b.name}.`
        });
    }

    // --- 5. REFLECTION/SYMMETRY (Abstract) ---
    const pairs = [
        { q: [directions[3].icon, directions[1].icon, directions[3].icon], next: directions[1].icon, desc: "Left, Right, Left, ..." },
        { q: [directions[0].icon, directions[2].icon, directions[0].icon], next: directions[2].icon, desc: "Up, Down, Up, ..." }
    ];
    pairs.forEach(p => {
        const options = shuffle(directions.map(d => d.icon));
        questions.push({
            question: "Predict the next direction in this symmetry pattern.",
            visualSequence: p.q,
            options: options,
            correct: options.indexOf(p.next),
            explanation: `This is an alternating pattern. It switches between two opposite directions.`
        });
    });

    return shuffle(questions);
};

// 3. PATTERN RULES
const generatePatternRules = () => {
    const questions = [];
    
    // 1. Addition Rules
    for (let i = 0; i < 3; i++) {
        const start = getNum(5, 20);
        const diff = getNum(3, 15);
        const seq = [start, start + diff, start + 2 * diff, start + 3 * diff];
        const options = shuffle([`Add ${diff}`, `Subtract ${diff}`, `Multiply by ${diff}`, `Add ${diff + 2}`]);
        questions.push({
            question: `What is the rule for the pattern: $${seq.join(', ')}, \\dots$?`,
            options,
            correct: options.indexOf(`Add ${diff}`),
            explanation: `Each number is found by adding ${diff} to the previous number ($${seq[0]} + ${diff} = ${seq[1]}$).`
        });
    }

    // 2. Subtraction Rules
    for (let i = 0; i < 3; i++) {
        const start = getNum(80, 150);
        const diff = getNum(5, 12);
        const seq = [start, start - diff, start - 2 * diff, start - 3 * diff];
        const options = shuffle([`Subtract ${diff}`, `Add ${diff}`, `Divide by ${diff}`, `Subtract ${diff + 5}`]);
        questions.push({
            question: `What is the rule for the pattern: $${seq.join(', ')}, \\dots$?`,
            options,
            correct: options.indexOf(`Subtract ${diff}`),
            explanation: `Each number is found by subtracting ${diff} from the previous number ($${seq[0]} - ${diff} = ${seq[1]}$).`
        });
    }

    // 3. Multiplication Rules
    for (let i = 0; i < 3; i++) {
        const start = getNum(2, 6);
        const factor = getNum(2, 4);
        const seq = [start, start * factor, start * factor * factor, start * Math.pow(factor, 3)];
        const options = shuffle([`Multiply by ${factor}`, `Add ${factor}`, `Subtract ${factor}`, `Multiply by ${factor + 1}`]);
        questions.push({
            question: `What is the rule for the pattern: $${seq.join(', ')}, \\dots$?`,
            options,
            correct: options.indexOf(`Multiply by ${factor}`),
            explanation: `Each number is multiplied by ${factor} to get the next number ($${seq[0]} \\times ${factor} = ${seq[1]}$).`
        });
    }

    // 4. Square Numbers
    const startSq = getNum(1, 4);
    const seqSq = [Math.pow(startSq, 2), Math.pow(startSq + 1, 2), Math.pow(startSq + 2, 2), Math.pow(startSq + 3, 2)];
    const optionsSq = shuffle(["Square Numbers", "Add 3", "Multiply by 2", "Subtract 1"]);
    questions.push({
        question: `What rule does this pattern follow: $${seqSq.join(', ')}, \\dots$?`,
        options: optionsSq,
        correct: optionsSq.indexOf("Square Numbers"),
        explanation: `These are square numbers: $${startSq}^2, ${(startSq + 1)}^2, {(startSq + 2)}^2...$`
    });

    // 5. Division Rules (Simple)
    const divisor = 2;
    const startDiv = pick([32, 64, 100, 200]);
    const seqDiv = [startDiv, startDiv / divisor, (startDiv / divisor) / divisor, ((startDiv / divisor) / divisor) / divisor];
    const optionsDiv = shuffle([`Divide by ${divisor}`, `Subtract ${divisor}`, `Add ${divisor}`, `Multiply by ${divisor}`]);
    questions.push({
        question: `Identify the rule: $${seqDiv.join(', ')}, \\dots$`,
        options: optionsDiv,
        correct: optionsDiv.indexOf(`Divide by ${divisor}`),
        explanation: `Each number is divided by ${divisor} to get the next one ($${seqDiv[0]} \\div ${divisor} = ${seqDiv[1]}$).`
    });

    return shuffle(questions);
};

// 4. CONTINUING PATTERNS
const generateContinuingPatterns = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
        const start = getNum(1, 10);
        const rule = i % 2 === 0 ? "Add 7" : "Subtract 3";
        const seq = [];
        let curr = start;
        for (let j = 0; j < 4; j++) {
            seq.push(curr);
            curr = i % 2 === 0 ? curr + 7 : curr - 3;
        }
        const next = curr;

        questions.push({
            question: `Continue the pattern by applying the rule "${rule}": $${seq.join(', ')}, \\dots$`,
            options: [`$${next}$`, `$${next + 1}$`, `$${next - 1}$`, `$${next + 10}$`],
            correct: 0,
            explanation: `Following the rule "${rule}", $${seq[3]} ${i % 2 === 0 ? '+' : '-'} ${i % 2 === 0 ? 7 : 3} = ${next}$.`
        });
    }
    return questions;
};

export const SKILLS = [
    {
        id: 'pat-01',
        title: 'Number Patterns',
        subtitle: 'Sequences & Jumps',
        icon: '🔢',
        color: '#4f46e5',
        desc: 'Master arithmetic and geometric number sequences.',
        learn: {
            concept: 'Types of Number Patterns',
            rules: [
                {
                    title: 'Addition Patterns',
                    f: '$$x, x+d, x+2d, \\dots$$',
                    d: 'Each term is found by adding a constant difference.',
                    ex: '2, 5, 8, 11 (Rule: +3)',
                    tip: 'Find the difference between two consecutive numbers!'
                },
                {
                    title: 'Multiplication Patterns',
                    f: '$$x, x \\times r, x \\times r^2, \\dots$$',
                    d: 'Each term is found by multiplying by a constant ratio.',
                    ex: '3, 6, 12, 24 (Rule: \\times 2)',
                    tip: 'Check if each number is double or triple the last one!'
                }
            ]
        },
        practice: generateNumberPatterns,
        assessment: generateNumberPatterns
    },
    {
        id: 'pat-02',
        title: 'Shape Patterns',
        subtitle: 'Rotations & Symmetry',
        icon: '🔺',
        color: '#7c3aed',
        desc: 'Identify visual patterns and geometric transformations.',
        learn: {
            concept: 'Understanding Visual Patterns',
            rules: [
                {
                    title: 'Clockwise Rotation',
                    f: '$$0^\\circ \\rightarrow 90^\\circ \\rightarrow 180^\\circ \\rightarrow 270^\\circ$$',
                    d: 'Shapes can rotate centered around a point, usually 90 degrees at a time.',
                    ex: 'Up ⬆️ to Right ➡️ is a 90° clockwise turn.',
                    tip: 'Imagine a clock hand moving to the next quarter hour!'
                }
            ]
        },
        practice: generateShapePatterns,
        assessment: generateShapePatterns
    },
    {
        id: 'pat-03',
        title: 'Pattern Rules',
        subtitle: 'Logic & Reasoning',
        icon: '💡',
        color: '#6366f1',
        desc: 'Identify the underlying rule that builds a sequence.',
        learn: {
            concept: 'Finding the Rule',
            rules: [
                {
                    title: 'Subtracting Patterns',
                    f: '$$x, x-d, x-2d, \\dots$$',
                    d: 'Identify the amount being removed from each successive term.',
                    ex: '100, 95, 90, 85 (Rule: -5)',
                    tip: 'If the numbers are getting smaller, you are likely subtracting or dividing!'
                }
            ]
        },
        practice: generatePatternRules,
        assessment: generatePatternRules
    },
    {
        id: 'pat-04',
        title: 'Continuing Patterns',
        subtitle: 'Predictive Reasoning',
        icon: '⏭️',
        color: '#818cf8',
        desc: 'Predict future elements in a complex pattern.',
        learn: {
            concept: 'Predictive Patterns',
            rules: [
                {
                    title: 'Next Term Prediction',
                    f: '$$\\text{Term}_{n+1} = f(\\text{Term}_n)$$',
                    d: 'Use the established rule to find any subsequent number in the sequence.',
                    ex: 'Rule +7: 1, 8, 15, 22... Next is 29.',
                    tip: 'Always re-check the rule on the last known term!'
                }
            ]
        },
        practice: generateContinuingPatterns,
        assessment: generateContinuingPatterns
    }
];
