import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Shapes_Around_Us/shapes-around-us.css';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const TERMS = [
    {
        name: 'Whole', color: '#e11d48', icon: '🍕',
        def: 'The complete, unbroken object or group before it is divided into parts.',
        scene: { visual: '🍕', viewType: 'One Full Pizza', example: 'An uncut pizza is one whole pizza' },
        tryIt: { q: 'If you eat a full apple, did you eat a fraction or a whole?', answer: 'whole', isText: true, hint: 'You ate everything!' },
        funFact: '🌍 The entire Earth is one whole planet!',
        character: '🌎'
    },
    {
        name: 'Equal Parts', color: '#f43f5e', icon: '⚖️',
        def: 'Pieces of a whole that are exactly the same size and shape.',
        scene: { visual: '🟧|🟧', viewType: 'Perfectly Split', example: 'A square cut perfectly down the middle' },
        tryIt: { q: 'If one piece of cake is bigger than the other, are they equal parts? (yes/no)', answer: 'no', isText: true, hint: 'They must be exactly the same size!' },
        funFact: '👯 Twins are like two equal parts of a whole family sharing the same birthday!',
        character: '👶'
    },
    {
        name: 'Fraction', color: '#ea580c', icon: '➗',
        def: 'A number that represents part of a whole, written with a top and bottom number.',
        scene: { visual: '½', viewType: 'Parts of a Whole', example: '1/2 and 3/4 are fractions' },
        tryIt: { q: 'Is 5 a fraction or a whole number?', answer: 'whole', isText: true, hint: 'It doesn\'t have a top and bottom number!' },
        funFact: '📐 The line between the top and bottom number is called a "vinculum"!',
        character: '📏'
    },
    {
        name: 'Half (1/2)', color: '#f97316', icon: '🌗',
        def: 'One of two equal parts that make up a whole.',
        scene: { visual: '🌗', viewType: 'Cut in Two', example: 'Breaking a chocolate bar into 2 equal pieces produces halves.' },
        tryIt: { q: 'How many halves make a whole?', answer: 2, hint: 'Think of two moons coming together!' },
        funFact: '⚽ Many sports games like Football and Basketball are played in "halves"!',
        character: '🥅'
    },
    {
        name: 'Quarter (1/4)', color: '#d97706', icon: '🌘',
        def: 'One of four equal parts that make up a whole. Also called "One-Fourth".',
        scene: { visual: '🪙', viewType: 'Cut in Four', example: 'Four friends sharing a cake equally each get a quarter.' },
        tryIt: { q: 'If you have 4 quarters, how many wholes do you have?', answer: 1, hint: 'Put the 4 pieces back together!' },
        funFact: '💵 In some countries, they have a coin called a "quarter" because it\'s worth 1/4 of a dollar!',
        character: '💰'
    },
    {
        name: 'Numerator', color: '#c026d3', icon: '⬆️',
        def: 'The top number in a fraction. It tells you how many parts you have.',
        scene: { visual: '3️⃣', viewType: 'The Number on Top', example: 'In 3/4, the number 3 is the numerator.' },
        tryIt: { q: 'In the fraction 2/5, what is the numerator?', answer: 2, hint: 'Look at the top number!' },
        funFact: '🧠 "Numerator" comes from a Latin word meaning "to count"! It counts how many pieces you have.',
        character: '🧮'
    },
    {
        name: 'Denominator', color: '#a21caf', icon: '⬇️',
        def: 'The bottom number in a fraction. It tells you how many equal parts the whole is divided into.',
        scene: { visual: '4️⃣', viewType: 'The Number on Bottom', example: 'In 3/4, the number 4 is the denominator.' },
        tryIt: { q: 'In the fraction 1/8, what is the denominator?', answer: 8, hint: 'Remember, Denominator is Down!' },
        funFact: '👇 A great trick: Denominator starts with D, and so does Down!',
        character: '⏬'
    },
    {
        name: 'One-Third (1/3)', color: '#7c3aed', icon: '🍰',
        def: 'One of three equal parts of a whole.',
        scene: { visual: '🚥', viewType: 'Cut in Three', example: 'A garden split perfectly into 3 sections.' },
        tryIt: { q: 'If you cut a pizza into 3 equal slices, what is each slice called?', answer: 'one-third', isText: true, hint: 'It\'s 1 over 3!' },
        funFact: '🌍 The Earth\'s surface is about one-third land and two-thirds water!',
        character: '🌊'
    },
    {
        name: 'Collection', color: '#6d28d9', icon: '📚',
        def: 'A group of items. Fractions can describe parts of a group, not just parts of one object.',
        scene: { visual: '🍪🍪🍪', viewType: 'Group of Items', example: 'Half of 10 cookies is 5 cookies.' },
        tryIt: { q: 'If you have 6 apples and eat half of the collection, how many do you eat?', answer: 3, hint: 'What is 6 divided by 2?' },
        funFact: '🐑 Shepherds use fractions of collections to count their sheep!',
        character: '👨‍🌾'
    },
    {
        name: 'Equivalent', color: '#4f46e5', icon: '🟰',
        def: 'Fractions that look different but show the exact same amount.',
        scene: { visual: '⚖️', viewType: 'Same Value', example: '2/4 is exactly the same amount as 1/2.' },
        tryIt: { q: 'Are 1/2 and 2/4 equivalent? (yes/no)', answer: 'yes', isText: true, hint: 'They are exactly the same size!' },
        funFact: '🦸‍♀️ Equivalent fractions are like superheroes in disguise – they look different but have the same power!',
        character: '🎭'
    },
];

const FIVE_RULES = [
    {
        num: 1, title: 'Fractions Must Be Equal Parts', emoji: '⚖️', color: '#e11d48',
        rule: 'To make a fraction, every single piece must be EXACTLY the same size!',
        steps: [
            { text: 'Look at a pizza', example: 'Is it cut fairly?' },
            { text: 'Yes, all pieces are identical', example: 'Then we can use fractions ✅' },
            { text: 'No, one piece is huge', example: 'Not a fraction! ❌' },
        ],
        tryIt: { q: 'Can you have a fraction if someone gets a giant piece and you get a tiny crumb? (yes/no)', answer: 'no', isText: true },
    },
    {
        num: 2, title: 'Denominator is Down', emoji: '⬇️', color: '#ea580c',
        rule: 'The bottom number (Denominator) tells you the TOTAL number of equal slices the whole is cut into.',
        steps: [
            { text: 'Count all the slices', example: 'There are 8 slices total' },
            { text: 'Put that number on the bottom', example: '? / 8' },
            { text: 'Remember the D-trick', example: 'Denominator = Down!' },
        ],
        tryIt: { q: 'If a cake is cut into 10 slices, what is the denominator?', answer: 10 },
    },
    {
        num: 3, title: 'Numerator is Number of Pieces', emoji: '⬆️', color: '#c026d3',
        rule: 'The top number (Numerator) tells you how many slices you actually HAVE or are talking about.',
        steps: [
            { text: 'Count the slices on your plate', example: 'You have 3 slices' },
            { text: 'Put that number on the top', example: '3 / ?' },
            { text: 'Combine with Denominator', example: '3/8 (Three eighths)' },
        ],
        tryIt: { q: 'If you eat 2 slices of a pizza, what is your numerator?', answer: 2 },
    },
    {
        num: 4, title: 'Bigger Bottom = Smaller Slice', emoji: '🔍', color: '#7c3aed',
        rule: 'This feels like a trick! If you share a cake with MORE people (bigger denominator), your slice gets SMALLER.',
        steps: [
            { text: 'Share with 2 people (1/2)', example: 'You get a giant half! 🍰' },
            { text: 'Share with 100 people (1/100)', example: 'You get a tiny crumb! 🤏' },
            { text: 'Bigger denominator', example: 'Means smaller pieces!' },
        ],
        tryIt: { q: 'Which gives you a bigger slice of pizza: 1/4 or 1/8? (Type 4 or 8)', answer: 4 },
    },
    {
        num: 5, title: 'Equivalent Fractions', emoji: '🟰', color: '#4f46e5',
        rule: 'Sometimes different fractions mean the exact same amount! You can slice a half into two quarters.',
        steps: [
            { text: 'Take 1/2 of a cake', example: 'It\'s a big half.' },
            { text: 'Cut that half in two', example: 'Now you have two 1/4s (2/4).' },
            { text: 'Did the amount of cake change?', example: 'No! 1/2 = 2/4' },
        ],
        tryIt: { q: 'Is 2/4 exactly the same amount as 1/2? (yes/no)', answer: 'yes', isText: true },
    },
];

const VOCAB_QUIZ = [
    { question: "What does the word 'Whole' mean in fractions?", options: ["A piece of pizza", "The complete, unbroken object", "A tiny crumb", "A number on top"], correct: 1, explanation: "A whole is the complete object before it gets divided!" },
    { question: "For a shape to show fractions, its parts must be...", options: ["Different colors", "Different sizes", "Exactly the same size (equal)", "Circle shaped"], correct: 2, explanation: "Fractions only work if all the pieces are exactly the same size!" },
    { question: "What do we call the top number in a fraction?", options: ["Denominator", "Numerator", "Equator", "Fractionator"], correct: 1, explanation: "The Numerator is the number on top telling you how many parts you have." },
    { question: "What helps us remember where the Denominator goes?", options: ["It starts with D for Down", "It's always the biggest number", "It's painted red", "It's on the right"], correct: 0, explanation: "Denominator Down! It goes on the bottom of the fraction." },
    { question: "If you cut an apple into two equal parts, what is one part called?", options: ["A quarter", "A third", "A whole", "A half"], correct: 3, explanation: "One part out of two equal parts is called a half (1/2)!" },
    { question: "Fractions that look different but show the exact same amount are called...", options: ["Equivalent fractions", "Unequal fractions", "Fake fractions", "Magic fractions"], correct: 0, explanation: "Equivalent fractions (like 1/2 and 2/4) represent the exact same value!" },
    { question: "Which fraction gives you a bigger slice of cake?", options: ["1/4", "1/8", "1/10", "1/2"], correct: 3, explanation: "1/2 gives you the biggest slice because you're only sharing with 2 people instead of 4, 8, or 10!" },
    { question: "Can we find fractions of a collection of items (like 10 cookies)?", options: ["No, only pizzas", "Yes, you can divide a group into equal parts", "No, cookies can't be fractions", "Only if they are chocolate chip"], correct: 1, explanation: "Yes! You can find fractions of a collection. Half of 10 cookies is 5 cookies." },
    { question: "What do we call one of four equal parts?", options: ["A half", "A third", "A quarter", "A fifth"], correct: 2, explanation: "One part out of four is called a quarter (1/4)." },
    { question: "In the fraction 3/8, what does the 8 represent?", options: ["How many pieces I ate", "The Numerator", "The Total number of equal parts (Denominator)", "The number of pizzas"], correct: 2, explanation: "The 8 is the denominator on the bottom, showing the pizza was cut into 8 equal parts total!" },
];

/* ═══════════════════════════════════════════════════════════════
   VISUAL SCENE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function SpatialScene({ scene, color }) {
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{scene.visual}</div>
            <div style={{ fontSize: 20, fontWeight: 'bold', color }}>{scene.viewType}</div>
            <div style={{ fontSize: 16, color: '#64748b', marginTop: 6 }}>{scene.example}</div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   TRY-IT INTERACTIVE MINI ACTIVITY
   ═══════════════════════════════════════════════════════════════ */

function TryItActivity({ tryIt, color }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => { setUserAnswer(''); setResult(null); }, [tryIt]);

    const check = () => {
        let isCorrect = false;
        if (tryIt.isText) {
            isCorrect = userAnswer.toLowerCase().trim() === tryIt.answer.toLowerCase();
        } else {
            isCorrect = parseInt(userAnswer) === tryIt.answer;
        }
        setResult(isCorrect ? 'correct' : 'wrong');
    };

    return (
        <div style={{
            background: `linear-gradient(135deg, ${color}08, ${color}03)`,
            borderRadius: 20, padding: '20px 24px', border: `2px dashed ${color}30`,
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 20 }}>🎮</span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color }}>Try It!</span>
            </div>
            <p style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 14px', lineHeight: 1.5 }}>{tryIt.q}</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                    ref={inputRef}
                    type={tryIt.isText ? "text" : "number"}
                    value={userAnswer}
                    onChange={e => { setUserAnswer(e.target.value); setResult(null); }}
                    onKeyDown={e => e.key === 'Enter' && check()}
                    placeholder="Type answer..."
                    style={{
                        width: 140, padding: '10px 16px', borderRadius: 14, fontSize: 18, fontWeight: 700,
                        border: `2px solid ${result === 'correct' ? '#10b981' : result === 'wrong' ? '#ef4444' : color + '40'}`,
                        background: result === 'correct' ? '#f0fdf4' : result === 'wrong' ? '#fef2f2' : '#fff',
                        outline: 'none', fontFamily: 'Outfit, sans-serif', color: '#0f172a', transition: 'all 0.2s'
                    }}
                />
                <button
                    onClick={check} disabled={!userAnswer}
                    style={{
                        padding: '10px 22px', borderRadius: 14, border: 'none',
                        background: userAnswer ? color : '#e2e8f0', color: userAnswer ? '#fff' : '#94a3b8',
                        fontWeight: 800, fontSize: 15, cursor: userAnswer ? 'pointer' : 'default',
                        fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    }}
                >Check ✓</button>
                {result === 'correct' && <span style={{ fontSize: 28, animation: 'sauBounceIn 0.4s both' }}>🎉</span>}
                {result === 'wrong' && <span style={{ fontSize: 28, animation: 'sauShake 0.5s' }}>🤔</span>}
            </div>
            {result === 'wrong' && (
                <div style={{ marginTop: 10, fontSize: 14, color: '#ea580c', fontWeight: 600, animation: 'sauBounceIn 0.3s both' }}>
                    💡 Hint: {tryIt.hint}
                </div>
            )}
            {result === 'correct' && (
                <div style={{ marginTop: 10, fontSize: 15, color: '#059669', fontWeight: 700, animation: 'sauBounceIn 0.3s both' }}>
                    ✅ Awesome! The answer is {tryIt.answer}!
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   RULE STEP-BY-STEP VISUAL
   ═══════════════════════════════════════════════════════════════ */

function RuleSteps({ rule }) {
    const [activeStep, setActiveStep] = useState(0);
    const [ruleAnswer, setRuleAnswer] = useState('');
    const [ruleResult, setRuleResult] = useState(null);

    useEffect(() => { setActiveStep(0); setRuleAnswer(''); setRuleResult(null); }, [rule]);

    const checkRule = () => {
        if (rule.tryIt.isText) {
            setRuleResult(ruleAnswer.toLowerCase().trim() === rule.tryIt.answer.toLowerCase() ? 'correct' : 'wrong');
        } else {
            setRuleResult(parseInt(ruleAnswer) === rule.tryIt.answer ? 'correct' : 'wrong');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {rule.steps.map((s, i) => (
                    <div
                        key={i} onClick={() => setActiveStep(i)}
                        style={{
                            display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px',
                            borderRadius: 16, cursor: 'pointer', transition: 'all 0.3s',
                            background: activeStep === i ? `${rule.color}10` : '#f8fafc',
                            border: `2px solid ${activeStep === i ? rule.color : 'transparent'}`,
                            transform: activeStep === i ? 'scale(1.02)' : 'scale(1)',
                            animation: `sauBounceIn 0.4s ${i * 0.15}s both`
                        }}
                    >
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: activeStep >= i ? rule.color : '#e2e8f0',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 16, fontWeight: 900, flexShrink: 0, transition: 'all 0.3s'
                        }}>
                            {activeStep > i ? '✓' : i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{s.text}</div>
                            <div style={{
                                fontSize: 20, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace',
                                color: activeStep === i ? rule.color : '#94a3b8', transition: 'color 0.3s'
                            }}>
                                {s.example}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                background: `linear-gradient(135deg, ${rule.color}08, ${rule.color}03)`,
                borderRadius: 16, padding: '16px 20px', border: `2px dashed ${rule.color}30`
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>🧪</span>
                    <span style={{ fontWeight: 800, fontSize: 14, color: rule.color }}>Quick Check!</span>
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>{rule.tryIt.q}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                        type={rule.tryIt.isText ? "text" : "number"}
                        value={ruleAnswer}
                        onChange={e => { setRuleAnswer(e.target.value); setRuleResult(null); }}
                        onKeyDown={e => e.key === 'Enter' && checkRule()}
                        placeholder="?"
                        style={{
                            width: 100, padding: '8px 14px', borderRadius: 12, fontSize: 18, fontWeight: 700,
                            border: `2px solid ${ruleResult === 'correct' ? '#10b981' : ruleResult === 'wrong' ? '#ef4444' : '#e2e8f0'}`,
                            background: ruleResult === 'correct' ? '#f0fdf4' : '#fff',
                            outline: 'none', fontFamily: 'Outfit, sans-serif'
                        }}
                    />
                    <button
                        onClick={checkRule}
                        style={{
                            padding: '8px 18px', borderRadius: 12, border: 'none',
                            background: ruleAnswer ? rule.color : '#e2e8f0', color: ruleAnswer ? '#fff' : '#94a3b8',
                            fontWeight: 800, cursor: ruleAnswer ? 'pointer' : 'default', fontSize: 14
                        }}
                    >Go!</button>
                    {ruleResult === 'correct' && <span style={{ fontSize: 24, animation: 'sauBounceIn 0.3s both' }}>🎉</span>}
                    {ruleResult === 'wrong' && <span style={{ fontSize: 24, animation: 'sauShake 0.5s' }}>❌</span>}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function SharingAndMeasuringTerminology() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false);
        setQuizTotalScore(0); setQuizFinished(false); setStreak(0); setBestStreak(0);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        const isCorrect = optIdx === activeQuiz.correct;
        if (isCorrect) {
            setQuizTotalScore(s => s + 1);
            setStreak(s => { const newS = s + 1; if (newS > bestStreak) setBestStreak(newS); return newS; });
        } else {
            setStreak(0);
        }
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1); setQuizSelected(null); setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="sau-terminology-page">
            <style>{`
                .sau-terminology-page { background-color: #fdf2f8; min-height: 100vh; }
                .sau-detail-anim { animation: sauBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes sauBounceIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes sauFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes sauPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
                @keyframes sauShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }

                .sau-tab-pill { padding: 12px 24px; border-radius: 50px; border: 2px solid #fce7f3; background: #fff; color: #64748b;
                    font-weight: 700; cursor: pointer; transition: all 0.25s; font-family: 'Outfit', sans-serif; font-size: 15px;
                    display: flex; align-items: center; gap: 8px; }
                .sau-tab-pill:hover { border-color: #e11d48; color: #e11d48; transform: translateY(-2px); }
                .sau-tab-pill.active { background: linear-gradient(135deg, #e11d48, #fb7185); color: white; border-color: transparent;
                    box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35); transform: translateY(-2px); }

                .sau-term-btn2 { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 14px;
                    border: 2px solid transparent; cursor: pointer; transition: all 0.25s; text-align: left;
                    font-family: 'Outfit', sans-serif; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
                .sau-term-btn2:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

                @media (max-width: 900px) { .sau-lex-grid { grid-template-columns: 1fr !important; } .sau-sidebar { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

            <nav className="sau-nav">
                <button className="sau-nav-back" style={{ color: '#db2777' }} onClick={() => navigate('/junior/grade/4/sharing-and-measuring')}>← Back to Sharing and Measuring</button>
                <div className="sau-nav-links">
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/sharing-and-measuring/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link sau-nav-link--active" style={{ background: 'linear-gradient(135deg, #ea580c, #fb923c)' }}>📖 Terminology</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/sharing-and-measuring/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="sau-intro-hero" style={{ padding: '16px 24px 20px', background: 'linear-gradient(135deg, #ffedd5 0%, #ffedd5 100%)', textAlign: 'center' }}>
                <div className="sau-intro-hero-deco sau-intro-hero-deco-a" style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, transparent 70%)' }} />
                <div className="sau-intro-hero-deco sau-intro-hero-deco-b" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />
                <div className="sau-intro-hero-inner">
                    <h1 className="sau-intro-hero-title">
                        Master the{' '}
                        <span className="sau-intro-hero-highlight" style={{ background: 'linear-gradient(90deg, #ea580c, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>10 Key Terms</span>
                    </h1>
                    <p className="sau-intro-hero-sub">Learn the puzzle language of sharing and fractions 🧩</p>
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 24px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                    <button className={`sau-tab-pill ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`sau-tab-pill ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Fraction Rules</button>
                    <button className={`sau-tab-pill ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Quiz Battle</button>
                </div>

                {/* ────── TERMS TAB ────── */}
                {activeTab === 'terms' && (
                    <div className="sau-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="sau-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {TERMS.map((term, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button key={i} className="sau-term-btn2" onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: isActive ? `linear-gradient(135deg, ${term.color}, ${term.color}cc)` : `${term.color}06`,
                                            borderColor: isActive ? term.color : `${term.color}20`,
                                            color: isActive ? '#fff' : '#0f172a',
                                            transform: isActive ? 'scale(1.03)' : undefined,
                                            boxShadow: isActive ? `0 6px 20px ${term.color}30` : undefined,
                                        }}
                                    >
                                        <span style={{ fontSize: 22, filter: isActive ? 'brightness(1.3)' : 'none' }}>{term.icon}</span>
                                        <span style={{ fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>{term.name}</span>
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="sau-detail-anim" key={selectedIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 500 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{activeTerm.icon}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    <p style={{ margin: 0, fontSize: 16, color: '#475569', fontWeight: 600 }}>{activeTerm.def}</p>
                                </div>
                            </div>

                            <div style={{ background: '#fafafa', borderRadius: 20, padding: '20px 16px', margin: '16px 0', border: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12, textAlign: 'center' }}>
                                    👀 See It!
                                </div>
                                <SpatialScene scene={activeTerm.scene} color={activeTerm.color} />
                            </div>

                            <div style={{ margin: '16px 0' }}>
                                <TryItActivity tryIt={activeTerm.tryIt} color={activeTerm.color} />
                            </div>

                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', margin: '24px 0 16px' }}>
                                <div style={{ fontSize: 40, flexShrink: 0, animation: 'sauFloat 3s infinite ease-in-out' }}>{activeTerm.character}</div>
                                <div style={{
                                    background: '#fdf2f8', padding: '14px 20px', borderRadius: '4px 18px 18px 18px',
                                    border: '1px solid #fce7f3', flex: 1, position: 'relative'
                                }}>
                                    <div style={{ fontSize: 15, color: '#be185d', fontWeight: 700, lineHeight: 1.6 }}>
                                        {activeTerm.funFact}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {/* ────── RULES TAB ────── */}
                {activeTab === 'rules' && (
                    <div className="sau-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="sau-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FIVE_RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className="sau-term-btn2" onClick={() => setSelectedRuleIdx(i)}
                                        style={{
                                            background: isActive ? `linear-gradient(135deg, ${rule.color}, ${rule.color}cc)` : `${rule.color}06`,
                                            borderColor: isActive ? rule.color : `${rule.color}15`,
                                            color: isActive ? '#fff' : '#0f172a', padding: '14px 18px',
                                        }}
                                    >
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.25)' : `${rule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: isActive ? '#fff' : rule.color }}>{rule.emoji}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1 }}>Rule {rule.num}</div>
                                            <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.8, marginTop: 3 }}>{rule.title}</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="sau-detail-anim" key={selectedRuleIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 400 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{ fontSize: 36 }}>{activeRule.emoji}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    <p style={{ margin: '4px 0 0', fontSize: 17, fontWeight: 700, color: '#475569' }}>{activeRule.rule}</p>
                                </div>
                            </div>
                            <RuleSteps rule={activeRule} />
                        </main>
                    </div>
                )}

                {/* ────── QUIZ TAB ────── */}
                {activeTab === 'quiz' && (
                    <div className="sau-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quiz Battle ⚔️</h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        {streak >= 2 && (
                                            <div style={{ background: '#fee2e2', padding: '6px 14px', borderRadius: 50, fontSize: 14, fontWeight: 800, color: '#9f1239', animation: 'sauBounceIn 0.3s both' }}>
                                                🔥 {streak} streak!
                                            </div>
                                        )}
                                        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#e11d48' }}>
                                            {quizIdx + 1}<span style={{ fontSize: 11, color: '#94a3b8' }}>/10</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 50, marginBottom: 24, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${((quizIdx + 1) / 10) * 100}%`, background: 'linear-gradient(90deg, #e11d48, #fb7185)', borderRadius: 50, transition: 'width 0.4s ease' }} />
                                </div>

                                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', lineHeight: 1.5, marginBottom: 24 }}>{activeQuiz.question}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let bg = '#fff', bdr = '#e2e8f0', txt = '#0f172a';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) { bg = '#f0fdf4'; bdr = '#10b981'; txt = '#059669'; }
                                            else if (oi === quizSelected) { bg = '#fef2f2'; bdr = '#ef4444'; txt = '#dc2626'; }
                                        }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered}
                                                style={{
                                                    padding: '14px 20px', borderRadius: 16, border: `3px solid ${bdr}`, background: bg,
                                                    color: txt, fontWeight: 700, fontSize: 16, cursor: quizAnswered ? 'default' : 'pointer',
                                                    transition: 'all 0.2s', textAlign: 'left', position: 'relative'
                                                }}
                                            >
                                                {opt}
                                                {quizAnswered && oi === activeQuiz.correct && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>✅</span>}
                                                {quizAnswered && oi === quizSelected && oi !== activeQuiz.correct && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>❌</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div style={{
                                        background: quizSelected === activeQuiz.correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)',
                                        padding: 16, borderRadius: 16, marginBottom: 20,
                                        border: `1px solid ${quizSelected === activeQuiz.correct ? '#bbf7d0' : '#fecaca'}`,
                                        animation: 'sauBounceIn 0.3s both'
                                    }}>
                                        <div style={{ fontSize: 22, marginBottom: 6 }}>
                                            {quizSelected === activeQuiz.correct ? '🎉 Correct!' : '💡 Let\'s learn!'}
                                        </div>
                                        <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{activeQuiz.explanation}</p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={nextQuiz} disabled={!quizAnswered}
                                        style={{
                                            padding: '12px 36px', borderRadius: 100, border: 'none',
                                            background: quizAnswered ? 'linear-gradient(135deg, #e11d48, #fb7185)' : '#f1f5f9',
                                            color: quizAnswered ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 16,
                                            cursor: quizAnswered ? 'pointer' : 'default', fontFamily: 'Outfit, sans-serif',
                                            boxShadow: quizAnswered ? '0 4px 14px rgba(225,29,72,0.4)' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >{quizIdx + 1 === 10 ? '🏆 Finish!' : 'Next →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 12, animation: 'sauBounceIn 0.5s both' }}>
                                    {quizTotalScore >= 9 ? '🏆' : quizTotalScore >= 7 ? '🌟' : quizTotalScore >= 5 ? '👏' : '💪'}
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, margin: '0 0 8px' }}>Quiz Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, margin: '0 0 8px' }}>Score: <span style={{ color: '#e11d48', fontWeight: 900 }}>{quizTotalScore}/10</span></p>
                                {bestStreak >= 2 && <p style={{ color: '#ea580c', fontWeight: 800, margin: '0 0 24px' }}>🔥 Best streak: {bestStreak} in a row!</p>}
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #e11d48, #fb7185)', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>Play Again 🔄</button>
                                    <button onClick={() => navigate('/junior/grade/4/sharing-and-measuring/skills')} style={{ padding: '12px 28px', background: '#f1f5f9', color: '#475569', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
