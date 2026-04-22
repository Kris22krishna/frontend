// ─── SVG Helpers for Terminology Illustrations ─────────────────────
import liftImg from '../../assets/lift_building_integers_1776748747985.png';
import tempImg from '../../assets/temperature_integers_1776748763645.png';
import seaImg from '../../assets/sea_level_integers_1776748885403.png';
import tokenImg from '../../assets/token_integers_1776748900797.png';

function drawNumberLine(color) {
    return `<svg width="340" height="80" viewBox="0 0 340 80" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="40" x2="330" y2="40" stroke="${color}" stroke-width="3"/>
        <polygon points="330,33 340,40 330,47" fill="${color}"/>
        <polygon points="10,33 0,40 10,47" fill="${color}"/>
        ${[-5,-4,-3,-2,-1,0,1,2,3,4,5].map((n,i)=>{
            const x=30+i*28;
            return `<line x1="${x}" y1="34" x2="${x}" y2="46" stroke="${color}" stroke-width="2"/>
                    <text x="${x}" y="64" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="${color}">${n}</text>`;
        }).join('')}
    </svg>`;
}

function drawBuilding(color) {
    return `<svg width="120" height="160" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="10" width="60" height="140" rx="4" fill="none" stroke="${color}" stroke-width="3"/>
        <line x1="30" y1="80" x2="90" y2="80" stroke="${color}" stroke-width="3"/>
        <text x="60" y="50" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${color}" font-weight="bold">+2</text>
        <text x="60" y="74" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${color}" font-weight="bold">+1</text>
        <text x="60" y="96" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#64748b" font-weight="bold">0</text>
        <text x="60" y="118" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#ef4444" font-weight="bold">-1</text>
        <text x="60" y="142" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#ef4444" font-weight="bold">-2</text>
        <rect x="50" y="86" width="20" height="18" rx="3" fill="${color}" opacity="0.3"/>
    </svg>`;
}

function drawTokenPair(color) {
    return `<svg width="180" height="80" viewBox="0 0 180 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="28" fill="#10b981"/>
        <text x="50" y="50" text-anchor="middle" fill="white" font-weight="bold" font-size="28">+</text>
        <circle cx="130" cy="40" r="28" fill="#ef4444"/>
        <text x="130" y="50" text-anchor="middle" fill="white" font-weight="bold" font-size="28">−</text>
        <text x="90" y="50" text-anchor="middle" fill="${color}" font-weight="900" font-size="24">=0</text>
    </svg>`;
}

function drawInverse(color) {
    return `<svg width="200" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="60" height="40" rx="10" fill="#10b981"/>
        <text x="40" y="48" text-anchor="middle" fill="white" font-weight="bold" font-size="22">+3</text>
        <path d="M 80 40 L 120 40" stroke="${color}" stroke-width="3" marker-end="url(#arrowInv)"/>
        <defs><marker id="arrowInv" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker></defs>
        <rect x="130" y="20" width="60" height="40" rx="10" fill="#ef4444"/>
        <text x="160" y="48" text-anchor="middle" fill="white" font-weight="bold" font-size="22">−3</text>
    </svg>`;
}

function drawComparison(color) {
    return `<svg width="240" height="60" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="30" x2="230" y2="30" stroke="${color}" stroke-width="2"/>
        <circle cx="60" cy="30" r="16" fill="#ef4444" opacity="0.8"/>
        <text x="60" y="36" text-anchor="middle" fill="white" font-weight="bold" font-size="14">−3</text>
        <circle cx="180" cy="30" r="16" fill="#10b981" opacity="0.8"/>
        <text x="180" y="36" text-anchor="middle" fill="white" font-weight="bold" font-size="14">+2</text>
        <text x="120" y="24" text-anchor="middle" fill="${color}" font-weight="900" font-size="20"><</text>
    </svg>`;
}

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Integer',
        color: '#6366f1',
        icon: '🔢',
        def: 'An integer is any whole number, including positive numbers, negative numbers, and zero. Integers do not include fractions or decimals.',
        examples: ['−5, −3, 0, 1, 7', '−100, 0, 42'],
        inUse: 'The set of all integers extends infinitely in both directions: …, −3, −2, −1, 0, 1, 2, 3, …',
        memory: '"Integer" comes from the Latin word meaning "whole"—these are complete, unbroken numbers!',
        svg: drawNumberLine('#6366f1')
    },
    {
        name: 'Positive Number',
        color: '#10b981',
        icon: '➕',
        def: 'A number greater than zero. Written with a "+" sign or simply as the number itself (e.g., +3 or just 3).',
        examples: ['+1, +5, +100', '3, 42, 999'],
        inUse: 'Positive numbers represent things like going UP in a lift, earning money, or a rise in temperature.',
        memory: 'Think of going UP—floors above ground, degrees above freezing!',
        svg: drawBuilding('#10b981')
    },
    {
        name: 'Negative Number',
        color: '#ef4444',
        icon: '➖',
        def: 'A number less than zero. Always written with a "−" sign in front (e.g., −3).',
        examples: ['−1, −5, −100', '−20, −3'],
        inUse: 'Negative numbers represent going DOWN in a lift, spending money, or temperatures below freezing.',
        memory: 'Think of going DOWN—basement floors, debts, or freezing cold!',
        svg: drawBuilding('#ef4444')
    },
    {
        name: 'Zero',
        color: '#f59e0b',
        icon: '⭕',
        def: 'Zero is the reference point on a number line. It is neither positive nor negative.',
        examples: ['Floor 0 (Ground Floor)', 'Sea Level = 0 m', '0°C = Freezing point'],
        inUse: 'Zero acts as the boundary between positive and negative numbers. It is the "starting point".',
        memory: 'Zero is like the ground floor—everything above is positive, everything below is negative!',
        svg: drawNumberLine('#f59e0b')
    },
    {
        name: 'Zero Pair',
        color: '#8b5cf6',
        icon: '⚖️',
        def: 'A pair of a positive token (+1) and a negative token (−1) that together cancel each other out to give zero.',
        examples: ['(+1) + (−1) = 0', '(+5) + (−5) = 0'],
        inUse: 'When you remove all zero pairs, the remaining tokens give you the answer.',
        memory: 'Like adding and removing the same thing—it cancels out!',
        svg: drawTokenPair('#8b5cf6')
    },
    {
        name: 'Inverse / Additive Inverse',
        color: '#0891b2',
        icon: '🔄',
        def: 'Two numbers are inverses if their sum is zero. For any integer a, its inverse is −a.',
        examples: ['Inverse of +3 is −3', 'Inverse of −7 is +7'],
        inUse: 'Pressing +3 then −3 in the lift brings you back to the ground floor: (+3) + (−3) = 0.',
        memory: 'The inverse "undoes" a number—it takes you back to zero!',
        svg: drawInverse('#0891b2')
    }
];

export const CHART_TYPES = [
    {
        num: 1,
        title: 'Building / Lift Model',
        rule: 'Use floors above (positive) and below (negative) the ground floor to visualise integers.',
        emoji: '🏢',
        color: '#10b981',
        detail: 'Bela\'s Building of Fun has numbered floors: Ground = 0, above = positive, below = negative. A lift moves using "+" (up) and "−" (down) buttons.',
        examples: ['Floor +3 means 3 floors above ground', 'Floor −2 means 2 floors below ground', 'Starting Floor + Movement = Target Floor'],
        tip: 'Starting Floor + Button Presses = Target Floor. This is integer addition!',
        svg: drawBuilding('#10b981')
    },
    {
        num: 2,
        title: 'Number Line Model',
        rule: 'Integers extend infinitely in both directions from zero on a number line.',
        emoji: '📏',
        color: '#3b82f6',
        detail: 'Numbers to the right are greater, numbers to the left are smaller. Moving right = adding a positive, moving left = adding a negative.',
        examples: ['5 + 4 = 9 (move 4 steps right from 5)', '3 + (−5) = −2 (move 5 steps left from 3)', '−3 < 2 because −3 is to the left of 2'],
        tip: 'To subtract, think: "Target − Starting = Movement needed." Then use the number line to verify!',
        svg: drawNumberLine('#3b82f6')
    },
    {
        num: 3,
        title: 'Token Model',
        rule: 'Use green (+) and red (−) tokens to perform addition and subtraction with integers.',
        emoji: '🟢',
        color: '#ef4444',
        detail: 'A positive and a negative token make a "zero pair" and cancel out. After removing all zero pairs, the remaining tokens give the result.',
        examples: ['(+5) + (−3): Remove 3 zero pairs → +2 left', '(+4) − (−6): Add 6 zero pairs, then take 6 red → +10 left', '(−7) − (−5): Take away 5 red → −2 left'],
        tip: 'If you need to take away tokens that are not there, just add zero pairs first!',
        svg: drawTokenPair('#ef4444')
    },
    {
        num: 4,
        title: 'Real-World Contexts',
        rule: 'Credits vs Debits, Above vs Below Sea Level, and Temperature Scales all use integers.',
        emoji: '🌍',
        color: '#f59e0b',
        detail: 'In banking, credits are positive and debits are negative. In geography, heights above sea level are positive and below are negative. In temperature, above 0°C is positive and below is negative.',
        examples: ['Bank: ₹100 (credit) + ₹60 (credit) − ₹150 (debit) = ₹10', 'Mt. Everest: +8849 m; Mariana Trench: −10984 m', 'Leh in winter: −4°C'],
        tip: 'Contexts help you understand WHY negative numbers exist—they describe real things like debt and cold!'
    }
];

export const VOCAB_QUIZ = [
    {
        question: "Which of the following is NOT an integer?",
        options: ["-3", "0", "½", "17"],
        correct: 2,
        explanation: "½ is a fraction, not a whole number. Integers include only whole numbers (positive, negative, and zero)."
    },
    {
        question: "What is the additive inverse of +7?",
        options: ["+7", "0", "-7", "7"],
        correct: 2,
        explanation: "The additive inverse of +7 is −7 because (+7) + (−7) = 0."
    },
    {
        question: "On a number line, which number is to the LEFT of −2?",
        options: ["-1", "0", "-5", "+3"],
        correct: 2,
        explanation: "Numbers further left on the number line are smaller. −5 < −2, so −5 is to the left of −2."
    },
    {
        question: "In Bela's Building of Fun, if you are on Floor +3 and press −5, which floor do you reach?",
        options: ["+8", "+2", "-2", "-8"],
        correct: 2,
        explanation: "Starting Floor + Movement = Target Floor. (+3) + (−5) = −2."
    },
    {
        question: "Zero is classified as:",
        options: ["A positive number", "A negative number", "Neither positive nor negative", "Both positive and negative"],
        correct: 2,
        explanation: "Zero is the boundary between positive and negative. It is neither positive nor negative."
    },
    {
        question: "A positive token and a negative token together form a:",
        options: ["Double pair", "Zero pair", "Full pair", "Token set"],
        correct: 1,
        explanation: "A positive and a negative token cancel each other, forming a 'zero pair' with a value of 0."
    },
    {
        question: "What is (−8) + (+8)?",
        options: ["16", "-16", "0", "8"],
        correct: 2,
        explanation: "(−8) and (+8) are inverses. Their sum is always 0."
    },
    {
        question: "Which is greater: −3 or −7?",
        options: ["-7", "-3", "They are equal", "Cannot be compared"],
        correct: 1,
        explanation: "On a number line, −3 is to the right of −7, so −3 > −7. Think temperature: −3°C is warmer than −7°C."
    },
    {
        question: "To subtract a negative number, we can:",
        options: ["Add the same negative number", "Add the corresponding positive number", "Subtract the corresponding positive number", "Ignore the signs"],
        correct: 1,
        explanation: "Subtracting a negative is the same as adding its corresponding positive. E.g., 5 − (−3) = 5 + 3 = 8."
    },
    {
        question: "If a Bank account starts at ₹0 and has credits of ₹30 and ₹40, and debits of ₹50 and ₹60, the final balance is:",
        options: ["₹120", "₹40", "-₹40", "-₹120"],
        correct: 2,
        explanation: "Credits: +30 + 40 = +70. Debits: −50 + (−60) = −110. Total: 70 + (−110) = −40."
    }
];
