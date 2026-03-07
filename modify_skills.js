const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src/components/practice/class-10/SurfaceAreasAndVolumes/Topics/Skills/Skills.jsx');
const destPath = path.join(__dirname, 'src/components/practice/class-10/IntroductionToTrignometry/Topics/Skills/Skills.jsx');

let srcContent = fs.readFileSync(srcPath, 'utf-8');

// Extract QuizEngine
const quizMatch = srcContent.match(/function QuizEngine\([\s\S]*?(?=\n\n(const SKILLS|export default))/);
let quizEngineStr = quizMatch ? quizMatch[0] : '';
if (quizEngineStr.length === 0) {
    console.error("QuizEngine not found");
    process.exit(1);
}

// Extract main component
const mainMatch = srcContent.match(/export default function Skills\([\s\S]*?(?=$)/);
let mainCompStr = mainMatch ? mainMatch[0] : '';

mainCompStr = mainCompStr.replace(/'\/surface-areas-and-volumes'/g, "'/introduction-to-trigonometry'");
mainCompStr = mainCompStr.replace(/'\/surface-areas-and-volumes\//g, "'/introduction-to-trigonometry/");
mainCompStr = mainCompStr.replace(/Surface Areas & <span style={{ color: 'var\(--sv-primary\)' }}>Volumes Skills<\/span>/, 'Introduction to <span style={{ color: "var(--trig-primary)" }}>Trigonometry Skills</span>');
mainCompStr = mainCompStr.replace(/Master 3D geometry from basic identification to complex practical applications./, "Master trigonometry from basic concepts to advanced standard angles and identities.");

const newSkills = `
const SKILLS = [
    {
        id: 'real_life', title: 'Level 1: Real-Life Situations', subtitle: 'Meaning and Applications', icon: '🌍', color: '#3b82f6',
        desc: 'Understand the meaning of trigonometry and its applications in measuring height and distance.',
        practice: [
            { question: "A student observes the top of a tower forming a right triangle with the ground. How can trigonometry find the tower's height?", options: ["By using only the shadow's length", "By using the angle of elevation and shadow length", "By knowing only the time of day", "By guessing"], correct: 1, explanation: "Trigonometric ratios connect the known angle of elevation and the known side (shadow) to the unknown height." }
        ],
        assessment: [
            { question: "Can trigonometry be used to find the width of a river if building height and angle of depression are known?", options: ["Yes", "No", "Only if river is straight", "Cannot be determined"], correct: 0, explanation: "Yes, using tangent or cotangent ratios with the height and angle." }
        ],
        learn: { title: 'Applications', rules: [{ title: 'Concept', d: 'Trigonometry studies relationships between sides and angles of right triangles.', tip: 'Always sketch the triangle first!', f: '', ex: 'Example: finding a tree\\'s height.' }] }
    },
    {
        id: 'trig_ratios', title: 'Level 2: Trigonometric Ratios', subtitle: 'Opposite, Adjacent, Hypotenuse', icon: '📐', color: '#10b981',
        desc: 'Define the six standard trigonometric ratios relative to a right-angled triangle.',
        practice: [
            { question: "In a right triangle, if opposite=6cm and hypotenuse=10cm, find sin A.", options: ["3/5", "4/5", "6/10", "Both A and C"], correct: 3, explanation: "sin A = opp/hyp = 6/10 = 3/5." },
            { question: "In right triangle ABC, right-angled at B, AB=5cm and BC=12cm. Find tan A.", options: ["5/12", "12/5", "12/13", "5/13"], correct: 1, explanation: "tan A = opp/adj = BC/AB = 12/5." }
        ],
        assessment: [
            { question: "Which ratio represents hypotenuse/adjacent?", options: ["sin A", "cos A", "sec A", "cosec A"], correct: 2, explanation: "sec A is the reciprocal of cos A (adj/hyp)." }
        ],
        learn: { title: 'Definition', rules: [{ title: 'Ratios', d: 'sin = O/H, cos = A/H, tan = O/A', tip: 'Remember SOH CAH TOA', f: '\\\\sin A = \\\\frac{\\\\text{Opposite}}{\\\\text{Hypotenuse}}', ex: 'tan A = Opp/Adj' }] }
    },
    {
        id: 'ratios_sides', title: 'Level 3: Ratios from Sides', subtitle: 'Pythagoras Theorem', icon: '📏', color: '#f59e0b',
        desc: 'Use Pythagoras theorem to find missing sides and calculate all trigonometric ratios.',
        practice: [
            { question: "Given tan A = 4/3, what is sin A?", options: ["3/5", "4/5", "3/4", "5/4"], correct: 1, explanation: "Opp=4, Adj=3, Hyp=5. sin A = 4/5." },
            { question: "If sin A = 1/3, find cos A.", options: ["2/3", "√8/3", "1/2", "3"], correct: 1, explanation: "Opp=1, Hyp=3, Adj=√8. cos A = √8/3." }
        ],
        assessment: [
            { question: "If cot A = 7/8, find tan A.", options: ["8/7", "7/8", "√113", "7/√113"], correct: 0, explanation: "tan A is 1/cot A = 8/7." }
        ],
        learn: { title: 'Pythagoras', rules: [{ title: 'Finding Sides', d: 'Use a² + b² = c² to find the 3rd side', tip: 'A known ratio gives you two sides immediately.', f: 'Hyp^2 = Opp^2 + Adj^2', ex: 'If tan=4/3, Hyp = sqrt(16+9) = 5' }] }
    },
    {
        id: 'std_angles', title: 'Level 4: Standard Angles', subtitle: '0°, 30°, 45°, 60°, 90°', icon: '📊', color: '#6366f1',
        desc: 'Find and use values of specific standard angles.',
        practice: [
            { question: "Find the value of sin 30°.", options: ["0", "1/2", "√3/2", "1"], correct: 1, explanation: "sin 30° = 1/2" },
            { question: "Evaluate: sin 60° × cos 30° + sin 30° × cos 60°", options: ["1/2", "√3/4", "1", "0"], correct: 2, explanation: "(√3/2)(√3/2) + (1/2)(1/2) = 3/4 + 1/4 = 1" }
        ],
        assessment: [
            { question: "What is tan 45°?", options: ["0", "1/√3", "1", "√3"], correct: 2, explanation: "tan 45° is 1" }
        ],
        learn: { title: 'Standard Angles', rules: [{ title: 'Table', d: 'Memorize the table for 0,30,45,60,90 degrees', tip: 'sin goes up from 0 to 1, cos goes down from 1 to 0.', f: '\\\\sin(30^\\\\circ) = 1/2', ex: 'tan(45)=1' }] }
    },
    {
        id: 'eval_expressions', title: 'Level 5: Evaluating Expressions', subtitle: 'Substitute standard values', icon: '📝', color: '#ec4899',
        desc: 'Evaluate more complex expressions using values for standard angles.',
        practice: [
            { question: "Evaluate: 2 tan²(45°) + cos²(30°) - sin²(60°)", options: ["1", "2", "0", "1.5"], correct: 1, explanation: "2(1)² + (√3/2)² - (√3/2)² = 2 + 3/4 - 3/4 = 2." },
            { question: "Evaluate: sin 30° + tan 45° - cosec 60°", options: ["1.5 - √3", "(3√3 - 4)/(2√3)", "0", "1"], correct: 1, explanation: "1/2 + 1 - 2/√3 = 3/2 - 2/√3 = (3√3 - 4)/(2√3)." }
        ],
        assessment: [
            { question: "Find value of: cos 60° + sin 30°", options: ["1", "2", "1/2", "√3"], correct: 0, explanation: "1/2 + 1/2 = 1." }
        ],
        learn: { title: 'Substitution', rules: [{ title: 'Expressions', d: 'Carefully square the terms where required.', tip: 'Rationalize the denominator if asked.', f: 'x^2 +/- y^2', ex: '(1/2)^2 = 1/4' }] }
    },
    {
        id: 'trig_identities', title: 'Level 6: Trigonometric Identities', subtitle: 'Fundamental Relationships', icon: '🔗', color: '#8b5cf6',
        desc: 'Understand the three fundamental trigonometric identities.',
        practice: [
            { question: "Complete the identity: sin²A + cos²A = ?", options: ["0", "1", "tan²A", "-1"], correct: 1, explanation: "sin²A + cos²A = 1 for any angle A." },
            { question: "What does 1 + tan²A equal?", options: ["cos²A", "sec²A", "cosec²A", "cot²A"], correct: 1, explanation: "1 + tan²A = sec²A." }
        ],
        assessment: [
            { question: "Which of the following is true?", options: ["1+cot²A=cosec²A", "1+sin²A=cos²A", "1+sec²A=tan²A", "sinA cosA=1"], correct: 0, explanation: "1 + cot²A = cosec²A is the correct Pythagorean identity." }
        ],
        learn: { title: 'Identities', rules: [{ title: 'Three Rules', d: 'sin²+cos²=1, 1+tan²=sec², 1+cot²=cosec²', tip: 'You can rearrange them (e.g. sec²-tan²=1)', f: '\\\\sin^2A + \\\\cos^2A = 1', ex: '' }] }
    },
    {
        id: 'simplify_prove', title: 'Level 7: Simplifying Expressions', subtitle: 'Using Identities', icon: '✨', color: '#14b8a6',
        desc: 'Simplify or prove trigonometric expressions by converting them into sine and cosine factors.',
        practice: [
            { question: "Prove: (sec A + tan A)(1 - sin A). It equals to:", options: ["sin A", "cos A", "sec A", "1"], correct: 1, explanation: "=(1/cos+sin/cos)(1-sin) = (1+sin)(1-sin)/cos = (1-sin^2)/cos = cos^2/cos = cos A." }
        ],
        assessment: [
            { question: "Simplify: 9 sec²A - 9 tan²A", options: ["1", "9", "0", "8"], correct: 1, explanation: "9(sec²A - tan²A) = 9(1) = 9." }
        ],
        learn: { title: 'Proving', rules: [{ title: 'Technique', d: 'Convert all tan, cot, sec, cosec to sin and cos first.', tip: 'Look for algebraic identities like (a+b)(a-b)=a²-b².', f: '\\\\tan A = \\\\frac{\\\\sin A}{\\\\cos A}', ex: '' }] }
    },
    {
        id: 'angle_problems', title: 'Level 8: Angle-Based Problems', subtitle: 'Inverse Reasoning', icon: '🔍', color: '#f43f5e',
        desc: 'Determine unknown side measurements and angles based on known ratios.',
        practice: [
            { question: "If sin(A-B) = 1/2 and cos(A+B) = 1/2, what is A?", options: ["30°", "45°", "60°", "90°"], correct: 1, explanation: "A-B = 30 and A+B = 60. Adding gives 2A = 90 => A = 45°." }
        ],
        assessment: [
            { question: "In triangle PQR right angled at Q, PQ=3cm and PR=6cm. Find angle R.", options: ["30°", "45°", "60°", "90°"], correct: 0, explanation: "sin R = PQ/PR = 3/6 = 1/2. So R is 30°." }
        ],
        learn: { title: 'Angles', rules: [{ title: 'Inverse Concept', d: 'Match the ratio to the standard angle table to find the angle.', tip: 'sin(x)=1/2 implies x=30°.', f: '\\\\sin(A-B)=1/2', ex: 'A-B=30^\\\\circ' }] }
    },
    {
        id: 'chap_assessment', title: 'Level 9: Chapter Assessment', subtitle: 'Final Challenge', icon: '🎓', color: '#0f766e',
        desc: 'A comprehensive mix of all trigonometry exercises, ratios, and identities.',
        practice: [
            { question: "In right triangle ABC at B, AB=24 and BC=7. Find sin A.", options: ["7/25", "24/25", "25/7", "7/24"], correct: 0, explanation: "Hyp = √(24² + 7²) = 25. sin A = 7/25." },
            { question: "Evaluate: 2 tan 30° / (1 + tan²30°)", options: ["sin 60°", "cos 60°", "tan 60°", "sin 30°"], correct: 0, explanation: "2(1/√3) / (1 + 1/3) = (2/√3)/(4/3) = √3/2, which is sin 60°." }
        ],
        assessment: [
            { question: "Simplify: (1+tan²A)/(1+cot²A)", options: ["sec²A", "-1", "cot²A", "tan²A"], correct: 3, explanation: "sec²A / cosec²A = (1/cos²A)/(1/sin²A) = sin²A/cos²A = tan²A." }
        ],
        learn: { title: 'Review', rules: [{ title: 'All Concepts', d: 'Mix of SOH CAH TOA, specific angles, and identities.', tip: 'Take your time and read exactly which angle is the reference.', f: '', ex: '' }] }
    }
];
`;

const imports = "import React, { useState, useEffect } from 'react';\nimport { useNavigate } from 'react-router-dom';\nimport '../../trigonometry.css';\nimport MathRenderer from '../../../../../MathRenderer';\n";

const fullContent = imports + "\n" + quizEngineStr + "\n" + newSkills + "\n" + mainCompStr + "\n";

fs.writeFileSync(destPath, fullContent, 'utf-8');
console.log('Successfully written newly assembled Skills.jsx');
