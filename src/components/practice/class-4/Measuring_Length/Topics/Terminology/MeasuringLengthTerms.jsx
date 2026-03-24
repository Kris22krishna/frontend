import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../measuring-length.css';

const TERMS = [
    {
        name: 'Length', color: '#d97706', icon: '📏',
        def: 'How long something is from end to end.',
        tryIt: { q: 'Which is longer: A pencil or a bus?', answer: 'bus', hint: 'Think about what you ride to school!' },
        funFact: '📏 Length helps us compare things and make sure they fit perfectly!',
        character: '🧑‍🏫',
        example: 'The length of your desk.'
    },
    {
        name: 'Centimeter (cm)', color: '#0284c7', icon: '📎',
        def: 'A small unit used for measuring short objects.',
        tryIt: { q: 'About how many cm is a paperclip? (1, 10, or 100)', answer: '1', hint: 'Centimeters are very small!' },
        funFact: '📎 Your pinky finger is about 1 centimeter wide!',
        character: '🤖',
        example: 'A pencil is 15 cm long.'
    },
    {
        name: 'Meter (m)', color: '#dc2626', icon: '🚪',
        def: 'A bigger unit, used for measuring rooms, height, and large objects.',
        tryIt: { q: 'How many centimeters are in 1 meter?', answer: '100', hint: 'Centi means hundred!' },
        funFact: '🚪 A standard doorway is exactly 2 meters tall!',
        character: '🧙‍♂️',
        example: 'A car is about 4 meters long.'
    },
    {
        name: 'Kilometer (km)', color: '#7c3aed', icon: '🛣️',
        def: 'A very large unit used for long distances, like between cities.',
        tryIt: { q: 'How many meters in 1 kilometer?', answer: '1000', hint: 'Kilo means thousand!' },
        funFact: '🛣️ It takes about 10-12 minutes to walk 1 kilometer!',
        character: '👷',
        example: 'The distance to the next town is 15 km.'
    },
    {
        name: 'Ruler', color: '#059669', icon: '📐',
        def: 'A straight tool used to measure small things accurately.',
        tryIt: { q: 'What number should you ALWAYS start at on a ruler?', answer: '0', hint: 'Not 1!' },
        funFact: '📐 Most school rulers are exactly 30 cm long!',
        character: '👩‍🍳',
        example: 'Using a ruler to draw a straight 10 cm line.'
    },
    {
        name: 'Tape Measure', color: '#be185d', icon: '🧵',
        def: 'A flexible measuring tool that rolls up.',
        tryIt: { q: 'What tool is best for measuring around a tree?', answer: 'tape', hint: 'It needs to bend!' },
        funFact: "🧵 Tailors use tape measures because clothes aren't perfectly flat!",
        character: '🦉',
        example: 'Measuring around your waist.'
    },
    {
        name: 'Height', color: '#f59e0b', icon: '🦒',
        def: 'How tall something is, measured from bottom to top.',
        tryIt: { q: 'Which unit is best to measure your height? (cm, km)', answer: 'cm', hint: 'Km is too big!' },
        funFact: '🦒 The tallest animal on land is the giraffe, reaching over 5 meters in height!',
        character: '🤡',
        example: 'Measuring how tall a mountain is.'
    },
    {
        name: 'Distance', color: '#6366f1', icon: '🗺️',
        def: 'How much space there is between two places or things.',
        tryIt: { q: 'We measure distance between cities in which unit?', answer: 'km', hint: 'Think of roads!' },
        funFact: '🗺️ The distance around the entire Earth is about 40,000 kilometers!',
        character: '🥷',
        example: 'The distance from Earth to the Moon.'
    },
    {
        name: 'Estimation', color: '#0d9488', icon: '🤔',
        def: 'Making a smart guess before actually measuring.',
        tryIt: { q: 'If a door is 200cm, what is a smart guess for a window? (100cm or 800cm)', answer: '100', hint: 'Windows are smaller than doors.' },
        funFact: '🤔 Estimation helps us know if our final measurement makes sense!',
        character: '🧑‍🚀',
        example: '"I estimate this table is 2 meters long."'
    },
    {
        name: 'Conversion', color: '#ea580c', icon: '🔄',
        def: 'Changing a measurement from one unit to another (like m to cm).',
        tryIt: { q: 'If 1 m = 100 cm, what is 3 m in cm?', answer: '300', hint: 'Multiply by 100.' },
        funFact: '🔄 Being able to convert means you can understand measurements from anyone in the world!',
        character: '🧙‍♀️',
        example: 'Changing 500 cm into 5 meters.'
    },
];

const FIVE_RULES = [
    {
        num: 1, title: '1 Meter = 100 Centimeters', emoji: '💯', color: '#d97706',
        rule: 'To change meters to cm, multiply by 100 (add two 0s)!',
        steps: [
            { text: 'Start with meters', example: '4 m' },
            { text: 'Multiply by 100', example: '4 × 100 = 400' },
            { text: 'Done! It is cm!', example: '4 m = 400 cm' },
        ],
        tryIt: { q: '7 m = ? cm', answer: 700 },
    },
    {
        num: 2, title: '1 Kilometer = 1000 Meters', emoji: '🏃', color: '#0284c7',
        rule: 'To change km to m, multiply by 1000 (add three 0s)!',
        steps: [
            { text: 'Start with kilometers', example: '5 km' },
            { text: 'Multiply by 1000', example: '5 × 1000 = 5000' },
            { text: 'Done! It is meters!', example: '5 km = 5000 m' },
        ],
        tryIt: { q: '9 km = ? m', answer: 9000 },
    },
    {
        num: 3, title: 'Start at Zero', emoji: '0️⃣', color: '#059669',
        rule: 'ALWAYS line up one end with the 0 mark!',
        steps: [
            { text: 'Place object on ruler', example: 'Pencil' },
            { text: 'Line up the edge', example: 'Exactly on 0' },
            { text: 'Read the other end', example: 'Ends at 14. It is 14 cm!' },
        ],
        tryIt: { q: 'If you start at 2 and end at 10, length is?', answer: 8 },
    },
    {
        num: 4, title: 'Estimate First', emoji: '🧠', color: '#7c3aed',
        rule: 'Make a smart guess before measuring!',
        steps: [
            { text: 'Look at the object', example: 'A book' },
            { text: 'Guess its size', example: 'Maybe 25 cm?' },
            { text: 'Measure to check', example: 'Wow, it is 28 cm! Good guess!' },
        ],
        tryIt: { q: 'Estimate length of a shoe: 20cm or 200cm?', answer: 20 },
    },
    {
        num: 5, title: 'Match Units to Add', emoji: '➕', color: '#ea580c',
        rule: 'Only add cm to cm, and m to m!',
        steps: [
            { text: 'Look at the problem', example: '2 m + 50 cm' },
            { text: 'Can we add 2 + 50 to get 52 m?', example: 'NO! Units are different.' },
            { text: 'Change to same unit', example: '200 cm + 50 cm = 250 cm' },
        ],
        tryIt: { q: '3 m + 100 cm = ? cm', answer: 400 },
    },
];

const VOCAB_QUIZ = [
    { question: "Which unit is the smallest?", options: ["Kilometer", "Centimeter", "Meter", "Mile"], correct: 1, explanation: "Centimeters are very small, about the width of your pinky finger!" },
    { question: "How many centimeters are in 1 meter?", options: ["10", "100", "1000", "50"], correct: 1, explanation: "1 meter = exactly 100 centimeters." },
    { question: "What should you line up an object with when using a ruler?", options: ["The number 1", "The very edge of the ruler", "The number 0", "The middle"], correct: 2, explanation: "Always start precisely at the zero mark!" },
    { question: "Which unit is best to measure the distance between two cities?", options: ["Millimeters", "Centimeters", "Meters", "Kilometers"], correct: 3, explanation: "Kilometers are used for very long distances." },
    { question: "If you add 2 meters and 3 meters, you get:", options: ["5 centimeters", "5 kilometers", "5 meters", "6 meters"], correct: 2, explanation: "Since both are meters, just add 2 + 3 = 5 m." },
    { question: "What tool is best for measuring around a tree trunk?", options: ["Ruler", "Scale", "Tape Measure", "Protractor"], correct: 2, explanation: "A tape measure is flexible and can wrap around curves." },
    { question: "How many meters in 3 kilometers?", options: ["30", "300", "3000", "3"], correct: 2, explanation: "1 km=1000m, so 3 km = 3000m." },
    { question: "True or False: A giraffe is measured in kilometers.", options: ["True", "False"], correct: 1, explanation: "False! Giraffes are tall, but measured in meters (around 5m). Kilometers are for distances like towns!" },
    { question: "A smart guess before measuring is called an:", options: ["Estimate", "Addition", "Error", "Equation"], correct: 0, explanation: "Estimation is guessing based on what you already know." },
    { question: "If an object starts at 2cm and ends at 7cm on a ruler, how long is it?", options: ["7 cm", "2 cm", "9 cm", "5 cm"], correct: 3, explanation: "7 - 2 = 5cm!" },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function TryItTextActivity({ tryIt, color }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => { setUserAnswer(''); setResult(null); }, [tryIt]);

    const check = () => {
        if (userAnswer.trim().toLowerCase() === tryIt.answer.toString().toLowerCase() ||
            userAnswer.includes(tryIt.answer)) {
            setResult('correct');
        } else {
            setResult('wrong');
        }
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
                    type="text"
                    value={userAnswer}
                    onChange={e => { setUserAnswer(e.target.value); setResult(null); }}
                    onKeyDown={e => e.key === 'Enter' && check()}
                    placeholder="Type answer..."
                    style={{
                        width: 140, padding: '10px 16px', borderRadius: 14, fontSize: 18, fontWeight: 700,
                        border: `2px solid ${result === 'correct' ? '#10b981' : result === 'wrong' ? '#ef4444' : color + '40'}`,
                        background: result === 'correct' ? '#f0fdf4' : result === 'wrong' ? '#fef2f2' : '#fff',
                        outline: 'none', fontFamily: 'Outfit, sans-serif', color: '#0f172a',
                        transition: 'all 0.2s'
                    }}
                />
                <button
                    onClick={check}
                    disabled={!userAnswer}
                    style={{
                        padding: '10px 22px', borderRadius: 14, border: 'none',
                        background: userAnswer ? color : '#e2e8f0', color: userAnswer ? '#fff' : '#94a3b8',
                        fontWeight: 800, fontSize: 15, cursor: userAnswer ? 'pointer' : 'default',
                        fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    }}
                >
                    Check ✓
                </button>
                {result === 'correct' && <span style={{ fontSize: 28, animation: 'mlBounceIn 0.4s both' }}>🎉</span>}
                {result === 'wrong' && <span style={{ fontSize: 28, animation: 'mlShake 0.5s' }}>🤔</span>}
            </div>
            {result === 'wrong' && (
                <div style={{ marginTop: 10, fontSize: 14, color: '#f59e0b', fontWeight: 600, animation: 'mlBounceIn 0.3s both' }}>
                    💡 Hint: {tryIt.hint}
                </div>
            )}
            {result === 'correct' && (
                <div style={{ marginTop: 10, fontSize: 15, color: '#059669', fontWeight: 700, animation: 'mlBounceIn 0.3s both' }}>
                    ✅ Awesome!
                </div>
            )}
        </div>
    );
}

function RuleSteps({ rule }) {
    const [activeStep, setActiveStep] = useState(0);
    const [ruleAnswer, setRuleAnswer] = useState('');
    const [ruleResult, setRuleResult] = useState(null);

    useEffect(() => { setActiveStep(0); setRuleAnswer(''); setRuleResult(null); }, [rule]);

    return (
        <div>
            {/* Animated Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {rule.steps.map((s, i) => (
                    <div
                        key={i}
                        onClick={() => setActiveStep(i)}
                        style={{
                            display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px',
                            borderRadius: 16, cursor: 'pointer', transition: 'all 0.3s',
                            background: activeStep === i ? `${rule.color}10` : '#f8fafc',
                            border: `2px solid ${activeStep === i ? rule.color : 'transparent'}`,
                            transform: activeStep === i ? 'scale(1.02)' : 'scale(1)',
                            animation: `mlBounceIn 0.4s ${i * 0.15}s both`
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

            {/* Rule Try-It */}
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
                        type="number"
                        value={ruleAnswer}
                        onChange={e => { setRuleAnswer(e.target.value); setRuleResult(null); }}
                        onKeyDown={e => e.key === 'Enter' && setRuleResult(parseInt(ruleAnswer) === rule.tryIt.answer ? 'correct' : 'wrong')}
                        placeholder="?"
                        style={{
                            width: 100, padding: '8px 14px', borderRadius: 12, fontSize: 18, fontWeight: 700,
                            border: `2px solid ${ruleResult === 'correct' ? '#10b981' : ruleResult === 'wrong' ? '#ef4444' : '#e2e8f0'}`,
                            background: ruleResult === 'correct' ? '#f0fdf4' : '#fff',
                            outline: 'none', fontFamily: 'Outfit, sans-serif'
                        }}
                    />
                    <button
                        onClick={() => setRuleResult(parseInt(ruleAnswer) === rule.tryIt.answer ? 'correct' : 'wrong')}
                        style={{
                            padding: '8px 18px', borderRadius: 12, border: 'none',
                            background: ruleAnswer ? rule.color : '#e2e8f0', color: ruleAnswer ? '#fff' : '#94a3b8',
                            fontWeight: 800, cursor: ruleAnswer ? 'pointer' : 'default', fontSize: 14
                        }}
                    >Go!</button>
                    {ruleResult === 'correct' && <span style={{ fontSize: 24, animation: 'mlBounceIn 0.3s both' }}>🎉</span>}
                    {ruleResult === 'wrong' && <span style={{ fontSize: 24, animation: 'mlShake 0.5s' }}>❌</span>}
                </div>
            </div>
        </div>
    );
}

export default function MeasuringLengthTerms() {
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
        <div className="ml-terminology-page">
            <style>{`
                .ml-terminology-page { background-color: #fcfaf3; min-height: 100vh; font-family: 'Inter', sans-serif;}
                .ml-detail-anim { animation: mlBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes mlBounceIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes mlFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes mlPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
                @keyframes mlShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }

                .ml-tab-pill { padding: 12px 24px; border-radius: 50px; border: 2px solid #f1f5f9; background: #fff; color: #64748b;
                    font-weight: 700; cursor: pointer; transition: all 0.25s; font-family: 'Outfit', sans-serif; font-size: 15px;
                    display: flex; align-items: center; gap: 8px; }
                .ml-tab-pill:hover { border-color: #d97706; color: #d97706; transform: translateY(-2px); }
                .ml-tab-pill.active { background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; border-color: transparent;
                    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.35); transform: translateY(-2px); }

                .ml-term-btn2 { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 14px;
                    border: 2px solid transparent; cursor: pointer; transition: all 0.25s; text-align: left;
                    font-family: 'Outfit', sans-serif; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
                .ml-term-btn2:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

                @media (max-width: 900px) { .ml-lex-grid { grid-template-columns: 1fr !important; } .ml-sidebar { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

            <nav className="ml-nav">
                <button className="ml-nav-back" onClick={() => navigate('/measuring-length')}>← Back to Measuring Length</button>
                <div className="ml-nav-links">
                    <button className="ml-nav-link" onClick={() => navigate('/measuring-length/introduction')}>🌟 Introduction</button>
                    <button className="ml-nav-link ml-nav-link--active">📖 Terminology</button>
                    <button className="ml-nav-link" onClick={() => navigate('/measuring-length/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                    <button className={`ml-tab-pill ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`ml-tab-pill ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Golden Rules</button>
                    <button className={`ml-tab-pill ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Quiz Battle</button>
                </div>

                {activeTab === 'terms' && (
                    <div className="ml-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="ml-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {TERMS.map((term, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button key={i} className="ml-term-btn2" onClick={() => setSelectedIdx(i)}
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

                        <main className="ml-detail-anim" key={selectedIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 500 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{activeTerm.icon}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    <p style={{ margin: 0, fontSize: 16, color: '#475569', fontWeight: 600 }}>{activeTerm.def}</p>
                                </div>
                            </div>

                            <div style={{ background: '#fafafa', borderRadius: 20, padding: '20px 24px', margin: '16px 0', border: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12 }}>
                                    ✨ For example:
                                </div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: '#334155' }}>
                                    {activeTerm.example}
                                </div>
                            </div>

                            <div style={{ margin: '16px 0' }}>
                                <TryItTextActivity tryIt={activeTerm.tryIt} color={activeTerm.color} />
                            </div>

                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', margin: '16px 0' }}>
                                <div style={{ fontSize: 40, flexShrink: 0, animation: 'mlFloat 3s infinite ease-in-out' }}>{activeTerm.character}</div>
                                <div style={{
                                    background: '#f0f9ff', padding: '14px 20px', borderRadius: '4px 18px 18px 18px',
                                    border: '1px solid #e0f2fe', flex: 1, position: 'relative'
                                }}>
                                    <div style={{ fontSize: 15, color: '#0369a1', fontWeight: 700, lineHeight: 1.6 }}>
                                        {activeTerm.funFact}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {activeTab === 'rules' && (
                    <div className="ml-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="ml-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FIVE_RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className="ml-term-btn2" onClick={() => setSelectedRuleIdx(i)}
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

                        <main className="ml-detail-anim" key={selectedRuleIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 400 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
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

                {activeTab === 'quiz' && (
                    <div className="ml-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quiz Battle ⚔️</h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        {streak >= 2 && (
                                            <div style={{ background: '#fef3c7', padding: '6px 14px', borderRadius: 50, fontSize: 14, fontWeight: 800, color: '#92400e', animation: 'mlBounceIn 0.3s both' }}>
                                                🔥 {streak} streak!
                                            </div>
                                        )}
                                        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#6366f1' }}>
                                            {quizIdx + 1}<span style={{ fontSize: 11, color: '#94a3b8' }}>/10</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 50, marginBottom: 24, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${((quizIdx + 1) / 10) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: 50, transition: 'width 0.4s ease' }} />
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
                                        animation: 'mlBounceIn 0.3s both'
                                    }}>
                                        <div style={{ fontSize: 22, marginBottom: 6 }}>
                                            {quizSelected === activeQuiz.correct ? '🎉 Correct!' : "💡 Let's learn!"}
                                        </div>
                                        <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{activeQuiz.explanation}</p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={nextQuiz} disabled={!quizAnswered}
                                        style={{
                                            padding: '12px 36px', borderRadius: 100, border: 'none',
                                            background: quizAnswered ? 'linear-gradient(135deg, #6366f1, #a855f7)' : '#f1f5f9',
                                            color: quizAnswered ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 16,
                                            cursor: quizAnswered ? 'pointer' : 'default', fontFamily: 'Outfit, sans-serif',
                                            boxShadow: quizAnswered ? '0 4px 14px rgba(99,102,241,0.4)' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >{quizIdx + 1 === 10 ? '🏆 Finish!' : 'Next →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 12, animation: 'mlBounceIn 0.5s both' }}>
                                    {quizTotalScore >= 9 ? '🏆' : quizTotalScore >= 7 ? '🌟' : quizTotalScore >= 5 ? '👏' : '💪'}
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, margin: '0 0 8px' }}>Quiz Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, margin: '0 0 8px' }}>Score: <span style={{ color: '#6366f1', fontWeight: 900 }}>{quizTotalScore}/10</span></p>
                                {bestStreak >= 2 && <p style={{ color: '#f59e0b', fontWeight: 800, margin: '0 0 24px' }}>🔥 Best streak: {bestStreak} in a row!</p>}
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>Play Again 🔄</button>
                                    <button onClick={() => navigate('/measuring-length/skills')} style={{ padding: '12px 28px', background: '#f1f5f9', color: '#475569', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
