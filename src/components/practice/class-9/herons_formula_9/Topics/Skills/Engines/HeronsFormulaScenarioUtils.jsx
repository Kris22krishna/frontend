import React from 'react';

// Format helper
const formatMath = (math) => <span style={{ fontFamily: 'KaTeX_Math', fontStyle: 'italic' }}>{math}</span>;

// Shuffle helper
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const generateTriangleSVG = (txtA, txtB, txtC) => (
    <svg viewBox="0 0 160 100" width="100%" style={{ maxWidth: 280, display: 'block', margin: '0 auto' }}>
        <path d="M 50 80 L 110 80 L 80 20 Z" fill="rgba(15, 76, 129, 0.05)" stroke="#0f4c81" strokeWidth="2" />
        <text x="80" y="95" fontSize="12" fill="#0f4c81" textAnchor="middle" fontWeight="bold">{txtA}</text>
        <text x="45" y="45" fontSize="12" fill="#0f4c81" textAnchor="end" fontWeight="bold">{txtB}</text>
        <text x="115" y="45" fontSize="12" fill="#0f4c81" textAnchor="start" fontWeight="bold">{txtC}</text>
    </svg>
);

// Generate valid integer Heron triangles (small integer sides with integer area)
// We will pre-generate a list of known integer triangles to avoid messy square roots when possible.
const INTEGER_TRIANGLES = [
    { a: 3, b: 4, c: 5, area: 6 },
    { a: 5, b: 12, c: 13, area: 30 },
    { a: 8, b: 15, c: 17, area: 60 },
    { a: 13, b: 14, c: 15, area: 84 },
    { a: 9, b: 10, c: 17, area: 36 },
    { a: 7, b: 24, c: 25, area: 84 },
    { a: 13, b: 20, c: 21, area: 126 },
    { a: 10, b: 17, c: 21, area: 84 },
    { a: 20, b: 21, c: 29, area: 210 },
    { a: 15, b: 34, c: 35, area: 252 },
    { a: 25, b: 29, c: 36, area: 360 },
    { a: 11, b: 13, c: 20, area: 66 },
    { a: 5, b: 5, c: 6, area: 12 }, // Isosceles
    { a: 5, b: 5, c: 8, area: 12 }, // Isosceles
    { a: 10, b: 10, c: 12, area: 48 }, // Isosceles
];

// Helper to get random integer from range
const rInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate multiple-choice options with a mix of believable distractors
const generateOptions = (correctValue, suffix = '', precision = 0) => {
    const val = parseFloat(correctValue);
    let o1, o2, o3;
    if (precision === 0 && Number.isInteger(val)) {
        o1 = val + rInt(1, 10);
        o2 = val - rInt(1, Math.min(10, val - 1));
        o3 = val + rInt(11, 20);
    } else {
        o1 = (val + Math.random() * 5 + 1).toFixed(precision);
        o2 = Math.max(0.1, val - Math.random() * 5 - 1).toFixed(precision);
        o3 = (val * 1.5).toFixed(precision);
    }
    
    let optArr = [
        val.toString() + suffix,
        o1.toString() + suffix,
        o2.toString() + suffix,
        o3.toString() + suffix
    ];
    
    // De-duplicate in worst case
    optArr = [...new Set(optArr)];
    while (optArr.length < 4) {
        optArr.push((val + Math.random() * 100).toFixed(precision) + suffix);
        optArr = [...new Set(optArr)];
    }
    
    const shuffled = shuffleArray(optArr);
    return {
        options: shuffled,
        correctIndex: shuffled.indexOf(val.toString() + suffix)
    };
};

// ─── SKILL 1: DIRECT APPLICATION ──────────────────────────────────────────────
export const generateBasicHeronScenarios = (count = 20) => {
    const scenarios = [];
    
    for (let i = 0; i < count; i++) {
        // Pick a random base integer triangle
        const base = INTEGER_TRIANGLES[Math.floor(Math.random() * INTEGER_TRIANGLES.length)];
        
        // Scale it randomly to keep it fresh
        const scale = rInt(1, 5);
        const a = base.a * scale;
        const b = base.b * scale;
        const c = base.c * scale;
        const s = (a + b + c) / 2;
        const area = base.area * scale * scale;

        const qType = Math.random();
        
        if (qType < 0.25) {
            // Find s
            const { options, correctIndex } = generateOptions(s);
            scenarios.push({
                question: `A triangular park has sides measuring $${a}\\text{ m}$, $${b}\\text{ m}$, and $${c}\\text{ m}$. What is the semi-perimeter ($s$) of the park?`,
                options: options.map(o => `$${o}$`),
                correctIndex,
                explanation: `First, add all the sides to find the perimeter: $a+b+c = ${a} + ${b} + ${c} = ${s*2}$.
Then divide by $2$: $s = \\frac{${s*2}}{2} = ${s}\\text{ m}$.`,
                svg: generateTriangleSVG(`a = ${a}`, `b = ${b}`, `c = ${c}`)
            });
        } else {
            // Find Area
            let unit = Math.random() > 0.5 ? '\\text{ cm}' : '\\text{ m}';
            let unit2 = unit + '^2';
            const { options, correctIndex } = generateOptions(area, unit2);
            scenarios.push({
                question: `Find the area of a triangle with sides $a = ${a}${unit}$, $b = ${b}${unit}$, and $c = ${c}${unit}$ using Heron's Formula.`,
                options: options.map(o => `$${o}$`),
                correctIndex,
                explanation: `Step 1: Semi-perimeter $s = \\frac{${a} + ${b} + ${c}}{2} = ${s}$.
Step 2: Calculate $(s-a) = ${s-a}$, $(s-b) = ${s-b}$, $(s-c) = ${s-c}$.
Step 3: Area = $\\sqrt{${s}(${s-a})(${s-b})(${s-c})}$
Area = $\\sqrt{${s * (s-a) * (s-b) * (s-c)}}$
Area = $${area}${unit2}$.`,
                svg: generateTriangleSVG(`a = ${a}`, `b = ${b}`, `c = ${c}`)
            });
        }
    }
    
    return scenarios;
};


// ─── SKILL 2: RATIOS & PERIMETERS ────────────────────────────────────────────
export const generateRatioPerimeterScenarios = (count = 20) => {
    const scenarios = [];
    
    for (let i = 0; i < count; i++) {
        const qType = Math.random();
        
        if (qType < 0.5) {
            // Missing side from Perimeter
            const base = INTEGER_TRIANGLES[Math.floor(Math.random() * INTEGER_TRIANGLES.length)];
            const scale = rInt(1, 5);
            const a = base.a * scale;
            const b = base.b * scale;
            const c = base.c * scale;
            const perimeter = a + b + c;
            const area = base.area * scale * scale;

            const targetIsSide = Math.random() > 0.5;

            if (targetIsSide) {
                const { options, correctIndex } = generateOptions(c, '\\text{ cm}');
                scenarios.push({
                    question: `Two sides of a triangle are $${a}\\text{ cm}$ and $${b}\\text{ cm}$. If its perimeter is $${perimeter}\\text{ cm}$, what is the length of the third side?`,
                    options: options.map(o => `$${o}$`),
                    correctIndex,
                    explanation: `Perimeter is the total length of the boundary.
Perimeter $= a + b + c$
$${perimeter} = ${a} + ${b} + c$
$${perimeter} = ${a+b} + c$
$c = ${perimeter} - ${a+b} = ${c}\\text{ cm}$.`,
                    svg: generateTriangleSVG(`a = ${a}`, `b = ${b}`, `c = ?`)
                });
            } else {
                const { options, correctIndex } = generateOptions(area, '\\text{ cm}^2');
                scenarios.push({
                    question: `Two sides of a triangle are $${a}\\text{ cm}$ and $${b}\\text{ cm}$. The perimeter is $${perimeter}\\text{ cm}$. Find the area of the triangle.`,
                    options: options.map(o => `$${o}$`),
                    correctIndex,
                    explanation: `First, find the third side: $c = ${perimeter} - (${a} + ${b}) = ${c}\\text{ cm}$.
Next, the semi-perimeter $s = \\frac{\\text{Perimeter}}{2} = \\frac{${perimeter}}{2} = ${perimeter/2}$.
Using Heron's formula: $\\sqrt{${perimeter/2}(${perimeter/2-a})(${perimeter/2-b})(${perimeter/2-c})} = ${area}\\text{ cm}^2$.`,
                    svg: generateTriangleSVG(`a = ${a}`, `b = ${b}`, `c = ?`)
                });
            }
        } else {
            // Sides from Ratio
            const base = INTEGER_TRIANGLES[Math.floor(Math.random() * INTEGER_TRIANGLES.length)];
            // Avoid complicated ratios, keep basic integer triangles but stripped of common factors
            const gcd = (x, y) => (!y ? x : gcd(y, x % y));
            let rGcd = gcd(gcd(base.a, base.b), base.c);
            let rA = base.a / rGcd;
            let rB = base.b / rGcd;
            let rC = base.c / rGcd;
            
            const multiplier = rInt(2, 6);
            const perimeter = (rA + rB + rC) * multiplier;
            
            const realA = rA * multiplier;
            const realB = rB * multiplier;
            const realC = rC * multiplier;
            const s = perimeter / 2;
            const area = Math.sqrt(s * (s - realA) * (s - realB) * (s - realC));

            const { options, correctIndex } = generateOptions(area, '\\text{ m}^2');
            scenarios.push({
                question: `The sides of a triangular plot are in the ratio of $${rA}:${rB}:${rC}$ and its perimeter is $${perimeter}\\text{ m}$. Find its area.`,
                options: options.map(o => `$${o}$`),
                correctIndex,
                explanation: `Let the sides be $${rA}x$, $${rB}x$, and $${rC}x$.
Sum of sides = Perimeter $\\implies ${rA}x + ${rB}x + ${rC}x = ${perimeter}$
$${rA+rB+rC}x = ${perimeter} \\implies x = ${multiplier}$.
The sides are $${realA}\\text{ m}$, $${realB}\\text{ m}$, and $${realC}\\text{ m}$.
$s = \\frac{${perimeter}}{2} = ${s}$.
Area = $\\sqrt{${s}(${s-realA})(${s-realB})(${s-realC})} = ${area}\\text{ m}^2$.`,
                svg: generateTriangleSVG(`Ratio: ${rA}x`, `Ratio: ${rB}x`, `Ratio: ${rC}x`)
            });
        }
    }
    
    return scenarios;
};


// ─── SKILL 3: WORD PROBLEMS (COSTS) ──────────────────────────────────────────
export const generateWordProblemScenarios = (count = 20) => {
    const scenarios = [];
    
    for (let i = 0; i < count; i++) {
        // We use known integer triangles so area is a clean number
        const base = INTEGER_TRIANGLES[Math.floor(Math.random() * INTEGER_TRIANGLES.length)];
        const scale = rInt(5, 15); // Large enough to be realistic for land
        const a = base.a * scale;
        const b = base.b * scale;
        const c = base.c * scale;
        const perimeter = a + b + c;
        const area = base.area * scale * scale;

        const isFencing = Math.random() < 0.5;

        // Names
        const roles = ['gardener', 'painter', 'contractor', 'architect'];
        const role = roles[Math.floor(Math.random() * roles.length)];
        
        if (isFencing) {
            // Cost of Fencing (Perimeter)
            const rate = [10, 15, 20, 25, 50][Math.floor(Math.random() * 5)];
            const gateWidth = rInt(2, 5); // Usually subtract a gate
            const effectiveLength = perimeter - gateWidth;
            const cost = effectiveLength * rate;

            const { options, correctIndex } = generateOptions(cost, '', 0); // Cost in currency
            scenarios.push({
                question: `A triangular park has sides $${a}\\text{ m}$, $${b}\\text{ m}$, and $${c}\\text{ m}$. A ${role} has to put a fence all around it, leaving a space $${gateWidth}\\text{m}$ wide for a gate on one side. What will be the total cost of fencing it at a rate of $₹${rate}$ per meter?`,
                options: options.map(o => '₹' + o),
                correctIndex,
                explanation: `Fencing requires the perimeter. Total boundary length $= ${a} + ${b} + ${c} = ${perimeter}\\text{ m}$.
Since a $${gateWidth}\\text{m}$ gate is needed, wire length $= ${perimeter} - ${gateWidth} = ${effectiveLength}\\text{ m}$.
Total cost = ${effectiveLength} $\\times ₹${rate} = ₹${cost}$.`,
                svg: generateTriangleSVG(`a = ${a}`, `b = ${b}`, `c = ${c}`)
            });
        } else {
            // Cost of Surface treatment (Area)
            const rate = [5, 10, 50, 100][Math.floor(Math.random() * 4)];
            const cost = area * rate;

            const actions = ['plant grass inside', 'paint a mural on', 'lay tiles over'];
            const action = actions[Math.floor(Math.random() * actions.length)];

            const { options, correctIndex } = generateOptions(cost, '', 0);
            scenarios.push({
                question: `A triangular wall has sides measuring $${a}\\text{ m}$, $${b}\\text{ m}$, and $${c}\\text{ m}$. A ${role} needs to ${action} it.
If the contract pays $₹${rate}$ per square meter ($\\text{m}^2$), how much total money will be earned?`,
                options: options.map(o => '₹' + o),
                correctIndex,
                explanation: `Surface treatments require finding the Area. Use Heron's Formula!
$s = \\frac{${a} + ${b} + ${c}}{2} = ${perimeter/2}$.
Area = $\\sqrt{${perimeter/2}(${perimeter/2-a})(${perimeter/2-b})(${perimeter/2-c})} = ${area}\\text{ m}^2$.
Total earning = Area $\\times$ Rate = ${area} $\\times ₹${rate} = ₹${cost}$.`,
                svg: generateTriangleSVG(`a = ${a}`, `b = ${b}`, `c = ${c}`)
            });
        }
    }
    
    return scenarios;
};
