import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Shapes_Around_Us/shapes-around-us.css';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const TERMS = [
    {
        name: 'Top View', color: '#059669', icon: '🐦',
        def: 'What an object looks like when seen from directly above.',
        scene: { visual: '🏠', viewType: 'From Above', example: 'A house from above looks like a rectangle' },
        tryIt: { q: 'What shape does a round table look like from the top?', answer: 'circle', isText: true, hint: 'Think about looking straight down at a round table!' },
        funFact: '🛩️ Pilots see the top view of cities when flying — buildings look like tiny rectangles!',
        character: '🦅'
    },
    {
        name: 'Front View', color: '#0284c7', icon: '👀',
        def: 'What an object looks like when seen from the front.',
        scene: { visual: '🏢', viewType: 'From the Front', example: 'A building front shows windows and doors' },
        tryIt: { q: 'What do you see from the front of a car? (Type "headlights" or "bumper")', answer: 'headlights', isText: true, hint: 'Think about what faces you when you look at a car!' },
        funFact: '📸 When you take a selfie, you\'re capturing the front view of your face!',
        character: '🤳'
    },
    {
        name: 'Side View', color: '#dc2626', icon: '👤',
        def: 'What an object looks like when seen from the left or right side.',
        scene: { visual: '🚗', viewType: 'From the Side', example: 'A car from the side shows wheels and windows' },
        tryIt: { q: 'How many wheels can you see in the side view of a car?', answer: 2, hint: 'You can only see the wheels on one side!' },
        funFact: '🪙 Coins often show a side view of a person\'s face — this is called a "profile"!',
        character: '🗿'
    },
    {
        name: 'Grid', color: '#7c3aed', icon: '🗓️',
        def: 'A pattern of evenly spaced horizontal and vertical lines forming squares or rectangles.',
        scene: { visual: '♟️', viewType: 'Rows & Columns', example: 'A chess board is an 8×8 grid' },
        tryIt: { q: 'How many squares does a chess board have?', answer: 64, hint: '8 rows × 8 columns!' },
        funFact: '🏙️ Many cities like New York have streets built in a grid pattern!',
        character: '🚕'
    },
    {
        name: 'Coordinates', color: '#be185d', icon: '📍',
        def: 'A pair of numbers or letters that tell the exact position on a grid (like B3 or Row 2, Column 4).',
        scene: { visual: '🎯', viewType: 'Position on Grid', example: 'B3 means Row B, Column 3' },
        tryIt: { q: 'In Battleship, what coordinate means Row C, Column 5?', answer: 'c5', isText: true, hint: 'Just combine the row letter and column number!' },
        funFact: '🚢 The game Battleship is all about using coordinates to find hidden ships!',
        character: '⚓'
    },
    {
        name: 'Map', color: '#f59e0b', icon: '🗺️',
        def: 'A drawing or picture that shows places, roads, and features from above (bird\'s eye view).',
        scene: { visual: '🗺️', viewType: 'Bird\'s Eye View', example: 'A map of your school shows all buildings from above' },
        tryIt: { q: 'Is a map a top view or side view?', answer: 'top', isText: true, hint: 'Maps show things as if you\'re looking down from the sky!' },
        funFact: '🌍 The oldest known map is over 4,000 years old, found in ancient Babylon!',
        character: '🧭'
    },
    {
        name: 'Landmark', color: '#0d9488', icon: '🏰',
        def: 'A well-known building or place that helps you find your way — like a temple, park, or school.',
        scene: { visual: '🏛️', viewType: 'Reference Point', example: 'Turn left at the big temple' },
        tryIt: { q: 'Is a school a landmark? (yes/no)', answer: 'yes', isText: true, hint: 'A landmark is any well-known place!' },
        funFact: '🗽 The Statue of Liberty is one of the most famous landmarks in the world!',
        character: '🗼'
    },
    {
        name: 'Route / Path', color: '#ea580c', icon: '🛤️',
        def: 'The way you go from one place to another — the directions you follow.',
        scene: { visual: '🚶', viewType: 'From A to B', example: 'Walk straight, turn right at the park, go 2 blocks' },
        tryIt: { q: 'If you walk North then turn right, which direction are you facing?', answer: 'east', isText: true, hint: 'North → turn right = East!' },
        funFact: '🏃 GPS devices plan the shortest route for you using math!',
        character: '📱'
    },
    {
        name: 'Direction', color: '#6366f1', icon: '🧭',
        def: 'North, South, East, and West — the four main directions used in maps.',
        scene: { visual: '🧭', viewType: 'N-S-E-W', example: 'North is up, South is down on most maps' },
        tryIt: { q: 'If you face North and turn completely around (180°), which direction do you face?', answer: 'south', isText: true, hint: 'The opposite of North!' },
        funFact: '🌅 The Sun rises in the East and sets in the West every day!',
        character: '☀️'
    },
    {
        name: 'Scale', color: '#b45309', icon: '📐',
        def: 'How much smaller a map is compared to the real world — like "1 cm = 1 km".',
        scene: { visual: '📏', viewType: 'Map vs Reality', example: '1 cm on map = 100 meters in real life' },
        tryIt: { q: 'If 1 cm = 2 km on a map, and two cities are 5 cm apart, how many km apart are they?', answer: 10, hint: '5 × 2 = ?' },
        funFact: '🌐 On a world map globe, the entire Earth is shrunk to the size of a basketball!',
        character: '🏀'
    },
];

const FIVE_RULES = [
    {
        num: 1, title: 'Objects Look Different from Different Sides', emoji: '👁️', color: '#059669',
        rule: 'The same object can look completely different from the top, front, and side!',
        steps: [
            { text: 'Pick up a cup', example: 'Look at it' },
            { text: 'From the top', example: 'It looks like a circle ⭕' },
            { text: 'From the front', example: 'It looks like a rectangle 🟫' },
        ],
        tryIt: { q: 'How many different standard views of an object are there? (top, front, side)', answer: 3 },
    },
    {
        num: 2, title: 'Grids Have Rows and Columns', emoji: '🗓️', color: '#7c3aed',
        rule: 'Rows go across (left to right), columns go up and down!',
        steps: [
            { text: 'Rows are horizontal', example: '→ Left to Right' },
            { text: 'Columns are vertical', example: '↓ Top to Bottom' },
            { text: 'Each square has a position', example: 'Like Row B, Column 3 = B3' },
        ],
        tryIt: { q: 'In a 5×5 grid, how many squares are there?', answer: 25 },
    },
    {
        num: 3, title: 'Maps Show Top View', emoji: '🗺️', color: '#0284c7',
        rule: 'Maps are always drawn from above — bird\'s eye view!',
        steps: [
            { text: 'Imagine flying above your school', example: 'Bird\'s eye view' },
            { text: 'Draw what you see below', example: 'That\'s a map!' },
            { text: 'Add labels for important places', example: 'School, Park, Temple…' },
        ],
        tryIt: { q: 'From which direction are maps drawn — top, front, or side? (Type 1 for top, 2 for front, 3 for side)', answer: 1 },
    },
    {
        num: 4, title: 'Use Landmarks to Navigate', emoji: '🏰', color: '#f59e0b',
        rule: 'Landmarks are familiar places that help you give and follow directions!',
        steps: [
            { text: 'Find a well-known place', example: 'The big temple' },
            { text: 'Use it as a reference', example: '"Turn left AT the temple"' },
            { text: 'Connect landmarks', example: 'Temple → Park → School' },
        ],
        tryIt: { q: 'To give directions, do you use landmarks or random trees? (Type 1 for landmarks, 2 for random)', answer: 1 },
    },
    {
        num: 5, title: 'The 4 Main Directions', emoji: '🧭', color: '#6366f1',
        rule: 'North, South, East, and West — learn them and never get lost!',
        steps: [
            { text: 'Face North', example: 'North is usually UP on a map' },
            { text: 'Behind you is', example: 'South (opposite of North)' },
            { text: 'Right is East, Left is West', example: 'Sun rises East, sets West' },
        ],
        tryIt: { q: 'If North is up, what direction is to your left?', answer: 'west', isText: true },
    },
];

const VOCAB_QUIZ = [
    { question: "What do you call the view of an object seen from directly above?", options: ["Side View", "Front View", "Top View", "Bottom View"], correct: 2, explanation: "The top view (or bird's eye view) is what you see when looking straight down!" },
    { question: "A pattern of horizontal and vertical lines forming squares is called a...", options: ["Map", "Grid", "Route", "Scale"], correct: 1, explanation: "A grid is like graph paper — rows and columns forming squares!" },
    { question: "B3 on a grid means...", options: ["Row B, Column 3", "Block 3", "Building 3", "Bottom Row 3"], correct: 0, explanation: "Coordinates use the row letter and column number to pinpoint a location!" },
    { question: "Which direction does the Sun rise from?", options: ["North", "South", "East", "West"], correct: 2, explanation: "The Sun always rises in the East and sets in the West!" },
    { question: "A well-known place used for giving directions is a...", options: ["Route", "Scale", "Landmark", "Grid"], correct: 2, explanation: "Landmarks like temples, parks, and schools help people navigate!" },
    { question: "Maps are drawn from which view?", options: ["Side View", "Front View", "Top View", "Diagonal View"], correct: 2, explanation: "Maps show the world from above — bird's eye view!" },
    { question: "If 1 cm on a map = 5 km in real life, two places 3 cm apart are how far?", options: ["5 km", "10 km", "15 km", "20 km"], correct: 2, explanation: "Scale: 3 cm × 5 km/cm = 15 km!" },
    { question: "If you face North and turn right, you are now facing...", options: ["South", "East", "West", "North"], correct: 1, explanation: "North → turn right = East. Remember: Never Eat Soggy Waffles!" },
    { question: "The way you travel from one place to another is called a...", options: ["View", "Grid", "Scale", "Route"], correct: 3, explanation: "A route or path is the journey from point A to point B!" },
    { question: "How an object looks from the left or right is called the...", options: ["Top View", "Front View", "Side View", "Map View"], correct: 2, explanation: "The side view shows what an object looks like from the left or right side!" },
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
                <div style={{ marginTop: 10, fontSize: 14, color: '#f59e0b', fontWeight: 600, animation: 'sauBounceIn 0.3s both' }}>
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

export default function HideAndSeekTerminology() {
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
                .sau-terminology-page { background-color: #ecfdf5; min-height: 100vh; }
                .sau-detail-anim { animation: sauBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes sauBounceIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes sauFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes sauPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
                @keyframes sauShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }

                .sau-tab-pill { padding: 12px 24px; border-radius: 50px; border: 2px solid #f1f5f9; background: #fff; color: #64748b;
                    font-weight: 700; cursor: pointer; transition: all 0.25s; font-family: 'Outfit', sans-serif; font-size: 15px;
                    display: flex; align-items: center; gap: 8px; }
                .sau-tab-pill:hover { border-color: #059669; color: #059669; transform: translateY(-2px); }
                .sau-tab-pill.active { background: linear-gradient(135deg, #059669, #10b981); color: white; border-color: transparent;
                    box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35); transform: translateY(-2px); }

                .sau-term-btn2 { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 14px;
                    border: 2px solid transparent; cursor: pointer; transition: all 0.25s; text-align: left;
                    font-family: 'Outfit', sans-serif; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
                .sau-term-btn2:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

                @media (max-width: 900px) { .sau-lex-grid { grid-template-columns: 1fr !important; } .sau-sidebar { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

            <nav className="sau-nav">
                <button className="sau-nav-back" style={{ color: '#059669' }} onClick={() => navigate('/junior/grade/4/hide-and-seek')}>← Back to Hide and Seek</button>
                <div className="sau-nav-links">
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/hide-and-seek/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link sau-nav-link--active" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>📖 Terminology</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/hide-and-seek/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                    <button className={`sau-tab-pill ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`sau-tab-pill ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Spatial Rules</button>
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

                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', margin: '16px 0' }}>
                                <div style={{ fontSize: 40, flexShrink: 0, animation: 'sauFloat 3s infinite ease-in-out' }}>{activeTerm.character}</div>
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

                {/* ────── QUIZ TAB ────── */}
                {activeTab === 'quiz' && (
                    <div className="sau-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quiz Battle ⚔️</h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        {streak >= 2 && (
                                            <div style={{ background: '#d1fae5', padding: '6px 14px', borderRadius: 50, fontSize: 14, fontWeight: 800, color: '#065f46', animation: 'sauBounceIn 0.3s both' }}>
                                                🔥 {streak} streak!
                                            </div>
                                        )}
                                        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#059669' }}>
                                            {quizIdx + 1}<span style={{ fontSize: 11, color: '#94a3b8' }}>/10</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 50, marginBottom: 24, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${((quizIdx + 1) / 10) * 100}%`, background: 'linear-gradient(90deg, #059669, #10b981)', borderRadius: 50, transition: 'width 0.4s ease' }} />
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
                                            background: quizAnswered ? 'linear-gradient(135deg, #059669, #10b981)' : '#f1f5f9',
                                            color: quizAnswered ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 16,
                                            cursor: quizAnswered ? 'pointer' : 'default', fontFamily: 'Outfit, sans-serif',
                                            boxShadow: quizAnswered ? '0 4px 14px rgba(5,150,105,0.4)' : 'none',
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
                                <p style={{ color: '#64748b', fontSize: 18, margin: '0 0 8px' }}>Score: <span style={{ color: '#059669', fontWeight: 900 }}>{quizTotalScore}/10</span></p>
                                {bestStreak >= 2 && <p style={{ color: '#f59e0b', fontWeight: 800, margin: '0 0 24px' }}>🔥 Best streak: {bestStreak} in a row!</p>}
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>Play Again 🔄</button>
                                    <button onClick={() => navigate('/junior/grade/4/hide-and-seek/skills')} style={{ padding: '12px 28px', background: '#f1f5f9', color: '#475569', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
