import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../../../../pages/juniors/JuniorPracticeSession.css';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const SKILL_ID = 9009;
const SKILL_NAME = "Fair Share - Chapter Test";
const TOTAL_QUESTIONS = 15;

// ─── Skill 1: Cutting (SVG food shapes) ──────────────────────────────────────
const generateCuttingSVG = (type, parts) => {
    let svgContent = '';
    const stroke = "#FFF";
    const strokeWidth = 2;

    if (type === 'pizza') {
        const radius = 40, center = 50;
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#FFB74D" stroke="#E65100" stroke-width="4" />`;
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius - 4}" fill="#FFD54F" />`;
        [{ cx: 40, cy: 30 }, { cx: 60, cy: 35 }, { cx: 50, cy: 60 }, { cx: 35, cy: 55 }, { cx: 65, cy: 55 }, { cx: 50, cy: 25 }]
            .forEach(t => { svgContent += `<circle cx="${t.cx}" cy="${t.cy}" r="3" fill="#D32F2F" opacity="0.8" />`; });
        for (let i = 0; i < parts; i++) {
            const angle = ((i * 360 / parts) - 90) * (Math.PI / 180);
            svgContent += `<line x1="${center}" y1="${center}" x2="${center + radius * Math.cos(angle)}" y2="${center + radius * Math.sin(angle)}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" />`;
        }
    } else if (type === 'chocolate') {
        const width = 80, height = 50, x = 10, y = 25;
        svgContent += `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#795548" stroke="#3E2723" stroke-width="3" rx="4" />`;
        const step = width / parts;
        for (let i = 1; i < parts; i++) {
            const xi = x + i * step;
            svgContent += `<line x1="${xi}" y1="${y}" x2="${xi}" y2="${y + height}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
        }
    } else if (type === 'cake') {
        const radius = 40, center = 50;
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#F48FB1" stroke="#C2185B" stroke-width="2" />`;
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius - 10}" fill="none" stroke="#F8BBD0" stroke-width="2" stroke-dasharray="4,4" />`;
        svgContent += `<circle cx="${center}" cy="${center}" r="6" fill="#D81B60" />`;
        for (let i = 0; i < parts; i++) {
            const angle = ((i * 360 / parts) - 90) * (Math.PI / 180);
            svgContent += `<line x1="${center}" y1="${center}" x2="${center + radius * Math.cos(angle)}" y2="${center + radius * Math.sin(angle)}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
        }
    } else if (type === 'orange') {
        const radius = 40, center = 50;
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#FF9800" stroke="#F57C00" stroke-width="2" />`;
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius - 2}" fill="#FFF3E0" />`;
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius - 5}" fill="#FF9800" />`;
        for (let i = 0; i < parts; i++) {
            const angle = ((i * 360 / parts) - 90) * (Math.PI / 180);
            svgContent += `<line x1="${center}" y1="${center}" x2="${center + radius * Math.cos(angle)}" y2="${center + radius * Math.sin(angle)}" stroke="#FFF3E0" stroke-width="3" />`;
        }
    }

    return `<svg viewBox="0 0 100 100" width="160" height="160" style="display:block;margin:12px auto;filter:drop-shadow(4px 6px 8px rgba(0,0,0,0.2));">${svgContent}</svg>`;
};

const generateCuttingQuestion = () => {
    const types = [
        { type: 'pizza', name: 'pizza', validParts: [2, 3, 4, 5, 6, 8] },
        { type: 'chocolate', name: 'chocolate bar', validParts: [2, 3, 4, 5, 6, 8, 10] },
        { type: 'cake', name: 'cake', validParts: [2, 4, 6, 8, 10, 12] },
        { type: 'orange', name: 'orange', validParts: [8, 10, 12] }
    ];
    const sel = types[randomInt(0, types.length - 1)];
    const parts = sel.validParts[randomInt(0, sel.validParts.length - 1)];
    const svg = generateCuttingSVG(sel.type, parts);

    const questionText = `
        <div class='question-container'>
            <p style="font-size:1.05rem;margin-bottom:4px;">Look at this <strong>${sel.name}</strong>. It has been cut into equal parts.</p>
            ${svg}
            <p style="font-size:1.05rem;">How many equal parts are there?</p>
        </div>`;

    let options = [parts.toString()];
    while (options.length < 4) {
        let d = parts + randomInt(-2, 3);
        if (d <= 1) d = parts + 2;
        if (d === parts) d = parts + 1;
        const ds = d.toString();
        if (!options.includes(ds)) options.push(ds);
    }

    return {
        skill: 'Cutting',
        text: questionText,
        correctAnswer: parts.toString(),
        options: shuffle(options),
        solution: `The ${sel.name} is divided into <strong>${parts}</strong> equal parts. Count the slices one by one!`
    };
};

// ─── Skill 2: Halves & Doubles ────────────────────────────────────────────────
const generateGridSVG = (rows, cols, filled) => {
    const size = 34, width = cols * size, height = rows * size;
    const total = rows * cols;
    const indices = Array.from({ length: total }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const filledSet = new Set(indices.slice(0, filled));
    let rects = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const fill = filledSet.has(idx) ? '#F97316' : '#FFFFFF';
            rects += `<rect x="${c * size}" y="${r * size}" width="${size}" height="${size}" fill="${fill}" stroke="#475569" stroke-width="2" rx="2" />`;
        }
    }
    return `<svg viewBox="0 0 ${width} ${height}" width="${Math.min(width, 240)}" height="${Math.min(height, 160)}" style="display:block;margin:10px auto;filter:drop-shadow(2px 4px 6px rgba(0,0,0,0.1));">${rects}</svg>`;
};

const generateHalvesDoublesQuestion = () => {
    const isVisual = Math.random() < 0.5;

    if (!isVisual) {
        const style = Math.random() < 0.5 ? 'half' : 'double';
        const small = randomInt(2, 20);
        const big = small * 2;
        const items = ['marbles', 'chocolates', 'cookies', 'stars', 'coins'];
        const item = items[randomInt(0, items.length - 1)];

        if (style === 'half') {
            return {
                skill: 'Halves & Doubles',
                text: `<div class='question-container text-center' style="font-size:1.3rem;padding:1rem 0;">
                    <p>${small} ${item} are <span class="annotation-box">_______</span> of ${big} ${item}.</p>
                    </div>`,
                correctAnswer: "Half",
                options: shuffle(["Half", "Double", "Equal", "Quarter"]),
                solution: `${small} is exactly half of ${big}, because ${small} + ${small} = ${big}.`
            };
        } else {
            return {
                skill: 'Halves & Doubles',
                text: `<div class='question-container text-center' style="font-size:1.3rem;padding:1rem 0;">
                    <p>${big} ${item} are <span class="annotation-box">_______</span> of ${small} ${item}.</p>
                    </div>`,
                correctAnswer: "Double",
                options: shuffle(["Double", "Half", "Equal", "Triple"]),
                solution: `${big} is double of ${small}, because ${small} × 2 = ${big}.`
            };
        }
    } else {
        const rows = randomInt(2, 4), cols = randomInt(3, 5);
        const total = rows * cols;
        const even = total % 2 === 0;
        const possibleTargets = ['more', 'less'];
        if (even) possibleTargets.push('half');
        const tgt = possibleTargets[randomInt(0, possibleTargets.length - 1)];

        let filled, answer, solution;
        if (tgt === 'half') {
            filled = total / 2;
            answer = "Exactly Half";
            solution = `There are ${total} blocks. Half of ${total} is ${total / 2}. Since ${filled} blocks are shaded, the answer is <strong>Exactly Half</strong>.`;
        } else if (tgt === 'less') {
            filled = randomInt(1, Math.ceil(total / 2) - 1) || 1;
            answer = "Less than Half";
            solution = `There are ${total} blocks. Half would be ${total / 2}. Since only ${filled} are shaded (less than ${total / 2}), the answer is <strong>Less than Half</strong>.`;
        } else {
            filled = randomInt(Math.ceil(total / 2) + 1, total - 1);
            answer = "More than Half";
            solution = `There are ${total} blocks. Half would be ${total / 2}. Since ${filled} are shaded (more than ${total / 2}), the answer is <strong>More than Half</strong>.`;
        }

        const svg = generateGridSVG(rows, cols, filled);
        return {
            skill: 'Halves & Doubles',
            text: `<div class='question-container'><p>Look at the shaded part of the grid:</p>${svg}<p>How much is shaded?</p></div>`,
            correctAnswer: answer,
            options: shuffle(["Less than Half", "More than Half", "Exactly Half", "Full"]),
            solution
        };
    }
};

// ─── Skill 3: Guess Who Am I ──────────────────────────────────────────────────
const GWConstraints = {
    MORE_HALF: (n) => ({ text: `more than half of ${n}`, check: (x) => x > n / 2 }),
    LESS_HALF: (n) => ({ text: `less than half of ${n}`, check: (x) => x < n / 2 }),
    MORE_DOUBLE: (n) => ({ text: `more than double of ${n}`, check: (x) => x > n * 2 }),
    LESS_DOUBLE: (n) => ({ text: `less than double of ${n}`, check: (x) => x < n * 2 }),
};

const generateGuessWhoQuestion = () => {
    let valid = false, qData = {};
    while (!valid) {
        const target = randomInt(3, 15);
        const cons = [];

        const n1 = 2 * randomInt(Math.max(1, Math.floor(target / 2) - 2), target - 1);
        if (n1 > 0 && target > n1 / 2) cons.push(GWConstraints.MORE_HALF(n1));

        const n2 = 2 * randomInt(target + 1, target + 5);
        if (target < n2 / 2) cons.push(GWConstraints.LESS_HALF(n2));

        const n3 = randomInt(1, Math.floor((target - 1) / 2));
        if (n3 > 0 && target > n3 * 2) cons.push(GWConstraints.MORE_DOUBLE(n3));

        const n4 = randomInt(Math.ceil((target + 1) / 2), target + 2);
        if (target < n4 * 2) cons.push(GWConstraints.LESS_DOUBLE(n4));

        if (cons.length < 2) continue;
        const picked = shuffle(cons).slice(0, 2);

        let options = [target];
        let attempts = 0;
        while (options.length < 4 && attempts < 50) {
            const d = randomInt(1, 20);
            if (!options.includes(d) && (!picked[0].check(d) || !picked[1].check(d))) options.push(d);
            attempts++;
        }
        if (options.length < 4) continue;

        qData = {
            skill: 'Guess Who Am I',
            text: `<div class="text-xl mb-2 text-center">
                <p class="font-bold mb-2 text-[#31326F]">Who am I?</p>
                <ul class="text-left inline-block bg-blue-50 p-4 rounded-xl border-2 border-blue-100 list-disc pl-8">
                    <li>I am <strong>${picked[0].text}</strong>.</li>
                    <li>I am <strong>${picked[1].text}</strong>.</li>
                </ul></div>`,
            correctAnswer: target,
            options: shuffle(options),
            solution: `Is ${target} ${picked[0].text}? Yes. Is ${target} ${picked[1].text}? Yes. Both fit! The answer is <strong>${target}</strong>.`
        };
        valid = true;
    }
    return qData;
};

// ─── Question bank builder ────────────────────────────────────────────────────
const buildQuestionBank = () => {
    const bank = [];
    for (let i = 0; i < 5; i++) bank.push(generateCuttingQuestion());
    for (let i = 0; i < 5; i++) bank.push(generateHalvesDoublesQuestion());
    for (let i = 0; i < 5; i++) bank.push(generateGuessWhoQuestion());
    return shuffle(bank);
};

// ─── Skill badge colours ──────────────────────────────────────────────────────
const SKILL_COLORS = {
    'Cutting': { bg: '#FFF3E0', text: '#E65100', border: '#FFB74D' },
    'Halves & Doubles': { bg: '#E0F7FA', text: '#00695C', border: '#4DB6AC' },
    'Guess Who Am I': { bg: '#EDE7F6', text: '#512DA8', border: '#9575CD' },
};

// ─── Helper: format time ──────────────────────────────────────────────────────
const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// ─── Results / Report Screen ──────────────────────────────────────────────────
const ResultsScreen = ({ questions, userAnswers, timeElapsed, onExit }) => {
    const correct = questions.filter((q, i) => String(userAnswers[i]) === String(q.correctAnswer)).length;
    const pct = Math.round((correct / TOTAL_QUESTIONS) * 100);

    const scoreColor = pct >= 80 ? '#16A34A' : pct >= 50 ? '#D97706' : '#DC2626';
    const scoreBg = pct >= 80 ? '#F0FDF4' : pct >= 50 ? '#FFFBEB' : '#FEF2F2';
    const scoreBorder = pct >= 80 ? '#86EFAC' : pct >= 50 ? '#FDE68A' : '#FECACA';
    const emoji = pct >= 80 ? '🌟' : pct >= 50 ? '👍' : '💪';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #E8FFF5 100%)',
                fontFamily: '"Open Sans", sans-serif',
                padding: '0 0 40px 0',
                overflowY: 'auto'
            }}
        >
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                color: 'white',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 16px rgba(99,102,241,0.3)'
            }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Chapter Test Report</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, opacity: 0.9 }}>Fair Share - Grade 3</div>
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '24px 16px' }}>

                {/* Score card */}
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    style={{
                        background: scoreBg,
                        border: `3px solid ${scoreBorder}`,
                        borderRadius: '20px',
                        padding: '24px',
                        textAlign: 'center',
                        marginBottom: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                >
                    <div style={{ fontSize: '1.1rem', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Your Score</div>
                    <div style={{ fontSize: '3rem', fontWeight: 900, color: scoreColor, lineHeight: 1 }}>{pct}%</div>
                    <div style={{ fontSize: '1rem', color: '#64748B', marginTop: '8px' }}>
                        <strong style={{ color: scoreColor }}>{correct}</strong> correct out of <strong>{TOTAL_QUESTIONS}</strong>
                    </div>
                    <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#16A34A' }}>{correct}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>CORRECT</div>
                        </div>
                        <div style={{ width: '1px', background: '#E2E8F0' }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#DC2626' }}>{TOTAL_QUESTIONS - correct}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>WRONG</div>
                        </div>
                        <div style={{ width: '1px', background: '#E2E8F0' }} />
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6366F1' }}>{formatTime(timeElapsed)}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>TIME</div>
                        </div>
                    </div>
                </motion.div>

                {/* Detailed question review */}
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E3A8A', marginBottom: '12px' }}>
                        Detailed Question Review
                    </div>

                    {questions.map((q, i) => {
                        const userAns = userAnswers[i];
                        const isRight = String(userAns) === String(q.correctAnswer);
                        const sc = SKILL_COLORS[q.skill] || { bg: '#F8FAFC', text: '#475569', border: '#CBD5E1' };

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i, duration: 0.35 }}
                                style={{
                                    background: 'white',
                                    borderRadius: '14px',
                                    border: `2px solid ${isRight ? '#86EFAC' : '#FECACA'}`,
                                    padding: '14px 16px',
                                    marginBottom: '10px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                                }}
                            >
                                {/* Row 1: Q number + skill badge + pass/fail */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '28px', height: '28px', borderRadius: '50%',
                                            background: isRight ? '#16A34A' : '#DC2626',
                                            color: 'white', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0
                                        }}>
                                            {i + 1}
                                        </div>
                                        <span style={{
                                            fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px',
                                            borderRadius: '20px', background: sc.bg, color: sc.text, border: `1.5px solid ${sc.border}`
                                        }}>
                                            {q.skill}
                                        </span>
                                    </div>
                                    {isRight
                                        ? <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Check size={16} /> Correct
                                        </span>
                                        : <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <X size={16} /> Wrong
                                        </span>
                                    }
                                </div>

                                {/* Question text (stripped of HTML for readability) */}
                                <div style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '8px', lineHeight: '1.4' }}>
                                    {q.skill === 'Cutting' && <span>Identify equal parts of the food item — <em>How many equal parts?</em></span>}
                                    {q.skill === 'Halves & Doubles' && <span>Fill in the blank: half / double relationship question</span>}
                                    {q.skill === 'Guess Who Am I' && <span>Guess the number using the two clues given</span>}
                                </div>

                                {/* Answers row */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                                    <div style={{
                                        padding: '4px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700,
                                        background: isRight ? '#F0FDF4' : '#FEF2F2',
                                        border: `1.5px solid ${isRight ? '#86EFAC' : '#FECACA'}`,
                                        color: isRight ? '#16A34A' : '#DC2626'
                                    }}>
                                        Your answer: {String(userAns ?? '—')}
                                    </div>
                                    {!isRight && (
                                        <div style={{
                                            padding: '4px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700,
                                            background: '#F0FDF4', border: '1.5px solid #86EFAC', color: '#16A34A'
                                        }}>
                                            ✓ Correct: {String(q.correctAnswer)}
                                        </div>
                                    )}
                                </div>

                                {/* Explanation for wrong answers */}
                                {!isRight && (
                                    <div style={{
                                        marginTop: '8px', padding: '8px 12px', borderRadius: '8px',
                                        background: '#FFFBEB', border: '1px solid #FDE68A', fontSize: '0.8rem', color: '#92400E'
                                    }}
                                        dangerouslySetInnerHTML={{ __html: q.solution }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Go back button */}
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <button
                        onClick={onExit}
                        style={{
                            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                            color: 'white', border: 'none', borderRadius: '14px',
                            padding: '14px 36px', fontSize: '1.05rem', fontWeight: 800,
                            cursor: 'pointer', boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                            display: 'inline-flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Home size={20} /> Back to Skills
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const FairShareChapterTest = () => {
    const navigate = useNavigate();

    const [questions] = useState(() => buildQuestionBank());
    const [qIndex, setQIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // { 0: 'ans', 1: 'ans', ... }
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    // selectedNow = the option the user has highlighted on the current question
    const [selectedNow, setSelectedNow] = useState(null);
    const [navDirection, setNavDirection] = useState(1); // 1 = forward, -1 = backward

    const timerRef = useRef(null);

    // Create session + start timer
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(userId, SKILL_ID)
                .then(sess => { if (sess?.session_id) setSessionId(sess.session_id); })
                .catch(console.error);
        }
        timerRef.current = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    // When question index changes, restore any previously saved answer
    useEffect(() => {
        setSelectedNow(userAnswers[qIndex] ?? null);
    }, [qIndex]);

    const currentQuestion = questions[qIndex];

    // Selecting an option just highlights it — no auto-advance
    const handleOptionClick = (option) => {
        const optStr = String(option);
        setSelectedNow(optStr);
        setUserAnswers(prev => ({ ...prev, [qIndex]: optStr }));
    };

    const handlePrev = () => {
        if (qIndex === 0) return;
        setNavDirection(-1);
        setQIndex(p => p - 1);
    };

    const handleNext = async () => {
        if (!selectedNow) return; // must answer before advancing
        setNavDirection(1);

        // Record attempt for this question
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            const isRight = selectedNow === String(currentQuestion.correctAnswer);
            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: 'Mixed',
                question_text: `Chapter Test Q${qIndex + 1} [${currentQuestion.skill}]`,
                correct_answer: String(currentQuestion.correctAnswer),
                student_answer: selectedNow,
                is_correct: isRight,
                solution_text: String(currentQuestion.solution),
                time_spent_seconds: 0
            }).catch(console.error);
        }

        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(p => p + 1);
        } else {
            // All answered — show results
            clearInterval(timerRef.current);
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const finalAnswers = { ...userAnswers, [qIndex]: selectedNow };
            if (userId) {
                const totalCorrect = Object.keys(finalAnswers)
                    .filter(i => finalAnswers[i] === String(questions[i]?.correctAnswer)).length;
                api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: {
                        skill_id: SKILL_ID, skill_name: SKILL_NAME,
                        total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect,
                        timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            setShowResults(true);
        }
    };

    if (showResults) {
        return (
            <ResultsScreen
                questions={questions}
                userAnswers={userAnswers}
                timeElapsed={timeElapsed}
                onExit={() => navigate(-1)}
            />
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    const sc = SKILL_COLORS[currentQuestion.skill] || { bg: '#F8FAFC', text: '#475569', border: '#CBD5E1' };

    return (
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>

            {/* ── Header ── */}
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            {/* Progress bar */}
            <div style={{ height: '6px', background: '#E0F2FE', position: 'relative' }}>
                <motion.div
                    style={{ height: '100%', background: 'linear-gradient(90deg,#6366F1,#8B5CF6)', borderRadius: '0 4px 4px 0' }}
                    animate={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
                    transition={{ duration: 0.4 }}
                />
            </div>

            {/* ── Main ── */}
            <main className="practice-content-wrapper" style={{ padding: '0.75rem 1rem 80px 1rem', flex: 1 }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait" custom={navDirection}>
                            <motion.div
                                key={qIndex}
                                custom={navDirection}
                                initial={{ x: navDirection * 60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: navDirection * -60, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ width: '100%' }}
                            >
                                <div className="question-card-modern" style={{ paddingLeft: '1.5rem', paddingTop: '1rem' }}>
                                    {/* Skill badge */}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                                        <span style={{
                                            fontSize: '0.75rem', fontWeight: 700, padding: '3px 14px',
                                            borderRadius: '20px', background: sc.bg, color: sc.text, border: `1.5px solid ${sc.border}`
                                        }}>
                                            {currentQuestion.skill}
                                        </span>
                                    </div>

                                    {/* Question */}
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'center', overflow: 'visible', width: '100%' }}>
                                            <span dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
                                        </h2>
                                    </div>

                                    {/* Options — click to select, Next button advances */}
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern" style={{ gap: '0.75rem' }}>
                                            {currentQuestion.options.map((option, idx) => {
                                                const optStr = String(option);
                                                const isSelected = selectedNow === optStr;
                                                return (
                                                    <motion.button
                                                        key={idx}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        className={`option-btn-modern ${isSelected ? 'selected' : ''}`}
                                                        style={{
                                                            fontWeight: '600', fontSize: '1.1rem', minHeight: '52px',
                                                            transition: 'all 0.2s ease',
                                                            ...(isSelected ? {
                                                                background: '#DBEAFE',
                                                                borderColor: '#3B82F6',
                                                                color: '#1D4ED8',
                                                                boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                                                            } : {})
                                                        }}
                                                        onClick={() => handleOptionClick(option)}
                                                    >
                                                        <LatexContent html={optStr} />
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        {/* Hint when nothing selected */}
                                        {!selectedNow && (
                                            <div style={{
                                                textAlign: 'center', marginTop: '12px',
                                                fontSize: '0.78rem', color: '#94A3B8', fontStyle: 'italic'
                                            }}>
                                                Select an option, then click Next
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="junior-bottom-bar">
                {/* Desktop */}
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                clearInterval(timerRef.current);
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <X size={18} /> Exit Test
                        </button>
                    </div>
                    <div className="bottom-center">
                        <div style={{ fontSize: '0.85rem', color: '#6366F1', fontWeight: 700 }}>
                            Question {qIndex + 1} of {TOTAL_QUESTIONS}
                        </div>
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group" style={{ display: 'flex', gap: '10px' }}>
                            {/* Previous */}
                            <button
                                className="nav-pill-next-btn"
                                style={{
                                    background: qIndex === 0 ? '#E2E8F0' : 'white',
                                    color: qIndex === 0 ? '#94A3B8' : '#6366F1',
                                    border: '2px solid',
                                    borderColor: qIndex === 0 ? '#E2E8F0' : '#6366F1',
                                    cursor: qIndex === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '10px 20px', borderRadius: '14px', fontWeight: 700
                                }}
                                onClick={handlePrev}
                                disabled={qIndex === 0}
                            >
                                <ChevronLeft size={22} strokeWidth={3} /> Previous
                            </button>
                            {/* Next / Finish */}
                            <button
                                className="nav-pill-next-btn"
                                style={{
                                    opacity: selectedNow ? 1 : 0.45,
                                    cursor: selectedNow ? 'pointer' : 'not-allowed'
                                }}
                                onClick={handleNext}
                                disabled={!selectedNow}
                            >
                                {qIndex < TOTAL_QUESTIONS - 1
                                    ? <><span>Next</span> <ChevronRight size={22} strokeWidth={3} /></>
                                    : <><span>Finish Test</span> <Check size={22} strokeWidth={3} /></>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className="mobile-footer-controls">
                    <button
                        className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                        onClick={async () => {
                            clearInterval(timerRef.current);
                            if (sessionId) await api.finishSession(sessionId).catch(console.error);
                            navigate(-1);
                        }}
                    >
                        <X size={20} />
                    </button>
                    <div style={{ fontSize: '0.85rem', color: '#6366F1', fontWeight: 700 }}>
                        Q{qIndex + 1}/{TOTAL_QUESTIONS}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            className="nav-pill-next-btn"
                            style={{
                                padding: '8px 14px', fontSize: '0.9rem',
                                background: qIndex === 0 ? '#E2E8F0' : 'white',
                                color: qIndex === 0 ? '#94A3B8' : '#6366F1',
                                border: '2px solid',
                                borderColor: qIndex === 0 ? '#E2E8F0' : '#6366F1',
                                cursor: qIndex === 0 ? 'not-allowed' : 'pointer',
                                borderRadius: '12px', fontWeight: 700,
                                display: 'flex', alignItems: 'center', gap: '4px'
                            }}
                            onClick={handlePrev}
                            disabled={qIndex === 0}
                        >
                            <ChevronLeft size={18} strokeWidth={3} />
                        </button>
                        <button
                            className="nav-pill-next-btn"
                            style={{
                                padding: '8px 14px', fontSize: '0.9rem',
                                opacity: selectedNow ? 1 : 0.45,
                                cursor: selectedNow ? 'pointer' : 'not-allowed'
                            }}
                            onClick={handleNext}
                            disabled={!selectedNow}
                        >
                            {qIndex < TOTAL_QUESTIONS - 1
                                ? <ChevronRight size={18} strokeWidth={3} />
                                : <Check size={18} strokeWidth={3} />}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FairShareChapterTest;
