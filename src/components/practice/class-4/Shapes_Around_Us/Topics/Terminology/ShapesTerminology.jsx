import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../shapes-around-us.css';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const TERMS = [
    {
        name: 'Face', color: '#d97706', icon: '🎛️',
        def: 'A flat or curved surface on a 3D shape.',
        scene: { shape: 'Cube', count: 6, label: 'flat faces' },
        tryIt: { q: 'How many faces does a cube have?', answer: 6, hint: 'Count top, bottom, and 4 sides!' },
        funFact: '🧊 Just like a real face, you can touch the face of a shape!',
        character: '🙋'
    },
    {
        name: 'Edge', color: '#0284c7', icon: '📏',
        def: 'The straight line where two faces meet.',
        scene: { shape: 'Pyramid', count: 8, label: 'edges' },
        tryIt: { q: 'How many edges on a square pyramid?', answer: 8, hint: '4 on the base + 4 going up!' },
        funFact: '⛷️ Skiing down the edge of a pyramid would be super fast!',
        character: '🏂'
    },
    {
        name: 'Corner / Vertex', color: '#dc2626', icon: '📍',
        def: 'The sharp point where lines or edges meet.',
        scene: { shape: 'Cube', count: 8, label: 'corners' },
        tryIt: { q: 'How many corners does a cube have?', answer: 8, hint: '4 on top, 4 on the bottom!' },
        funFact: '📌 Vertices are sharp! Ouch! A sphere has NO vertices at all.',
        character: '🦔'
    },
    {
        name: 'Prism', color: '#7c3aed', icon: '🏢',
        def: 'A 3D shape with the same shape on both ends and flat rectangular sides.',
        scene: { shape: 'Triangular Prism', base: 'Triangle', sides: 'Rectangles' },
        tryIt: { q: 'Are the sides of a prism curved or completely flat?', answer: 'flat', isText: true, hint: 'Think of a cardboard box!' },
        funFact: '🏢 Most tall buildings are actually just giant rectangular prisms!',
        character: '👷'
    },
    {
        name: 'Pyramid', color: '#059669', icon: '⛺',
        def: 'A 3D shape with a flat base and triangular sides that meet at a point.',
        scene: { shape: 'Square Pyramid', base: 'Square', top: 'Apex (Point)' },
        tryIt: { q: 'What shape are the sides of a pyramid?', answer: 'triangle', isText: true, hint: 'They all meet at the top!' },
        funFact: '🏜️ The Ancient Egyptians built massive stone square pyramids as tombs!',
        character: '🐪'
    },
    {
        name: 'Angle', color: '#9333ea', icon: '📐',
        def: 'An angle is formed when two straight lines meet at a point.',
        scene: { angle: 'Angle', looksLike: 'Two lines meeting at a point' },
        tryIt: { q: 'Do the hands of a clock form an angle?', answer: 'yes', isText: true, hint: 'The two hands meet at the center!' },
        funFact: '🕐 Every time you open a book or a door, you are making an angle!',
        character: '📖'
    },
    {
        name: 'Right Angle', color: '#be185d', icon: '📐',
        def: 'A perfect "L" shape corner (90 degrees).',
        scene: { angle: 'Right Angle', looksLike: 'Corner of a square' },
        tryIt: { q: 'Does a square have right angles?', answer: 'yes', isText: true, hint: 'Are the corners perfect L shapes?' },
        funFact: '🪟 Look at the corner of your screen—that is a perfect Right Angle!',
        character: '📏'
    },
    {
        name: 'Acute Angle', color: '#f59e0b', icon: '🤏',
        def: 'A sharp, narrow angle that is smaller than a right angle.',
        scene: { angle: 'Acute Angle', looksLike: 'A slice of pizza' },
        tryIt: { q: 'Is a slice of pizza an acute or right angle?', answer: 'acute', isText: true, hint: 'It is very pointy!' },
        funFact: '🍕 It\'s acute because it\'s "a cute" little angle!',
        character: '👶'
    },
    {
        name: 'Obtuse Angle', color: '#6366f1', icon: '👐',
        def: 'A wide angle that is bigger than a right angle.',
        scene: { angle: 'Obtuse Angle', looksLike: 'An open fan' },
        tryIt: { q: 'Is a stretched open book an acute or obtuse angle?', answer: 'obtuse', isText: true, hint: 'It is very wide!' },
        funFact: '🐋 Obtuse angles are big, wide, and stretched open!',
        character: '😮'
    },
    {
        name: 'Radius', color: '#0d9488', icon: '🎯',
        def: 'The distance from the center of a circle to the outer edge.',
        scene: { circlePart: 'Radius', line: 'Center to edge' },
        tryIt: { q: 'If radius is 5cm, what is the diameter? (Hint: double it)', answer: 10, hint: 'Diameter is two radiuses!' },
        funFact: '🚲 The spokes on a bicycle wheel represent the radius of the wheel!',
        character: '🚴'
    },
    {
        name: 'Diameter', color: '#ea580c', icon: '🍔',
        def: 'The distance straight across a circle, passing through the center.',
        scene: { circlePart: 'Diameter', line: 'Edge to Edge through Center' },
        tryIt: { q: 'If diameter is 12cm, what is the radius? (Hint: split in half)', answer: 6, hint: 'Radius is half of diameter!' },
        funFact: '🍔 If you cut a round burger perfectly in half, your cut line is the diameter!',
        character: '🔪'
    },
];

const FIVE_RULES = [
    {
        num: 1, title: 'Faces Make the Shape', emoji: '⬛', color: '#d97706',
        rule: 'The flat surfaces are the building blocks!',
        steps: [
            { text: 'Look at a box', example: 'Cuboid' },
            { text: 'Count the perfectly flat sides', example: '6 Flat Faces' },
            { text: 'A sphere?', example: '1 Curved Face!' },
        ],
        tryIt: { q: 'How many flat faces does a sphere have?', answer: 0 },
    },
    {
        num: 2, title: 'Vertices = Corners', emoji: '📌', color: '#0284c7',
        rule: 'Vertices is just a fancy math word for corners!',
        steps: [
            { text: 'Find where edges meet', example: 'The pointy bits' },
            { text: '1 Corner =', example: 'Vertex' },
            { text: 'Many Corners =', example: 'Vertices' },
        ],
        tryIt: { q: 'A triangle has how many vertices?', answer: 3 },
    },
    {
        num: 3, title: 'Right Angles are Everywhere', emoji: '🔲', color: '#059669',
        rule: 'The 90 degree "L" shape is the king of angles.',
        steps: [
            { text: 'Look at a door', example: '4 Right Angles' },
            { text: 'Look at a book', example: '4 Right Angles' },
            { text: 'Look at a TV screen', example: '4 Right Angles' },
        ],
        tryIt: { q: 'How many right angles on a standard sheet of paper?', answer: 4 },
    },
    {
        num: 4, title: 'Prism vs Pyramid', emoji: '⛺', color: '#7c3aed',
        rule: 'Prisms are towers, pyramids are tents!',
        steps: [
            { text: 'Does it go straight up?', example: 'PRISM (tower)' },
            { text: 'Does it shrink to a point?', example: 'PYRAMID (tent)' },
            { text: 'Cardboard box?', example: 'Rectangular Prism' },
        ],
        tryIt: { q: 'Is a slice of cake a prism or pyramid? (Type 1 for prism, 2 for pyramid)', answer: 1 },
    },
    {
        num: 5, title: 'Diameter is Double', emoji: '📏', color: '#ea580c',
        rule: 'The diameter is exactly two times the radius!',
        steps: [
            { text: 'Radius = Center to Edge', example: 'Halfway across' },
            { text: 'Diameter = Edge to Edge', example: 'All the way across' },
            { text: 'Formula:', example: 'D = 2 × R' },
        ],
        tryIt: { q: 'If R = 4, D = ?', answer: 8 },
    },
];

const VOCAB_QUIZ = [
    { question: "What is a perfectly flat surface on a 3D shape called?", options: ["Corner", "Face", "Edge", "Circle"], correct: 1, explanation: "Faces are the flat parts you can touch like the side of a dice!" },
    { question: "Where two faces meet, they form a straight line called a...", options: ["Radius", "Face", "Corner", "Edge"], correct: 3, explanation: "An edge is the line between faces." },
    { question: "A sharp point where edges meet is a vertex. What is the plural of vertex?", options: ["Vertexes", "Corners", "Vertices", "Points"], correct: 2, explanation: "The plural of vertex is Vertices!" },
    { question: "An angle that is smaller and sharper than a right angle is called...", options: ["Acute", "Obtuse", "Flat", "Corner"], correct: 0, explanation: "Acute angles are sharp, \"cute\" little angles!" },
    { question: "The distance from the exact center of a circle to the edge is the...", options: ["Radius", "Diameter", "Face", "Prism"], correct: 0, explanation: "The radius starts at the center and goes to the edge." },
    { question: "If the radius of a circle is 3, what is the diameter?", options: ["3", "6", "9", "1.5"], correct: 1, explanation: "The diameter is double the radius. 3 + 3 = 6!" },
    { question: "A perfect L-shaped corner in a square is a...", options: ["Acute Angle", "Obtuse Angle", "Right Angle", "Wrong Angle"], correct: 2, explanation: "Squares and rectangles are full of Right Angles!" },
    { question: "A shape with a flat base and triangular sides meeting at a point is a...", options: ["Pyramid", "Prism", "Cube", "Sphere"], correct: 0, explanation: "Pyramids have a point at the top, like the ones in Egypt." },
    { question: "An angle that is very wide and open, bigger than a right angle, is...", options: ["Acute", "Right", "Obtuse", "Straight"], correct: 2, explanation: "Obtuse angles are big, wide open angles!" },
    { question: "A cube is a special type of...", options: ["Pyramid", "Sphere", "Cylinder", "Prism"], correct: 3, explanation: "A cube is actually a rectangular prism where all faces are exactly the same!" },
];

/* ═══════════════════════════════════════════════════════════════
   VISUAL SCENE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function ShapeScene({ scene, color }) {
    if (scene.shape) {
        return (
            <div style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>
                    {scene.shape === 'Cube' ? '🧊' : scene.shape === 'Pyramid' ? '⛺' : '🏢'}
                </div>
                {scene.count && (
                    <div style={{ fontSize: 24, fontWeight: 'bold', color }}>
                        {scene.count} {scene.label}
                    </div>
                )}
                {scene.base && (
                    <div style={{ fontSize: 18, color: '#64748b' }}>
                        Base: {scene.base} <br /> Sides: {scene.sides || scene.top}
                    </div>
                )}
            </div>
        );
    }
    if (scene.angle) {
        return (
                <div style={{ textAlign: 'center', padding: 20 }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>
                    {scene.angle === 'Angle' ? '📏' : scene.angle === 'Right Angle' ? '📐' : scene.angle === 'Acute Angle' ? '🍕' : '👐'}
                </div>
                <div style={{ fontSize: 20, fontWeight: 'bold', color }}>{scene.looksLike}</div>
            </div>
        );
    }
    if (scene.circlePart) {
        return (
            <div style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>⭕</div>
                <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{scene.circlePart}</div>
                <div style={{ fontSize: 18, color: '#64748b' }}>{scene.line}</div>
            </div>
        );
    }
    return null;
}

/* ═══════════════════════════════════════════════════════════════
   TRY-IT INTERACTIVE MINI ACTIVITY
   ═══════════════════════════════════════════════════════════════ */

function TryItActivity({ tryIt, color }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
    const inputRef = useRef(null);

    useEffect(() => { setUserAnswer(''); setResult(null); }, [tryIt]);

    const check = () => {
        let isCorrect = false;
        if (tryIt.isText) {
            isCorrect = userAnswer.toLowerCase().trim() === tryIt.answer.toLowerCase();
        } else {
            isCorrect = parseInt(userAnswer) === tryIt.answer;
        }

        if (isCorrect) {
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

export default function ShapesTerminology() {
    const navigate = useNavigate();
    const { startSession, logAnswer, finishSession } = useSessionLogger();

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [answersMap, setAnswersMap] = useState({});

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    useEffect(() => {
        startSession({ nodeId: NODE_IDS.g4MathShapesTerminologyQuiz, sessionType: 'practice' });
    }, [startSession]);

    const handleNavigate = useCallback((path) => {
        finishSession({
            totalQuestions: 10,
            questionsAnswered: Object.keys(answersMap).length,
            answersPayload: answersMap
        });
        navigate(path);
    }, [answersMap, finishSession, navigate]);

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false);
        setQuizTotalScore(0); setQuizFinished(false); setStreak(0); setBestStreak(0);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        const isCorrect = optIdx === activeQuiz.correct;
        
        const answerData = {
            question: activeQuiz.question,
            selected: activeQuiz.options[optIdx],
            correct: activeQuiz.options[activeQuiz.correct],
            isCorrect
        };
        setAnswersMap(prev => ({ ...prev, [quizIdx]: answerData }));

        logAnswer({
            question_index: quizIdx,
            answer_json: answerData,
            is_correct: isCorrect ? 1 : 0
        });

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
                .sau-terminology-page { background-color: #fcfaf3; min-height: 100vh; }
                .sau-detail-anim { animation: sauBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes sauBounceIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes sauFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes sauPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
                @keyframes sauShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }

                .sau-tab-pill { padding: 12px 24px; border-radius: 50px; border: 2px solid #f1f5f9; background: #fff; color: #64748b;
                    font-weight: 700; cursor: pointer; transition: all 0.25s; font-family: 'Outfit', sans-serif; font-size: 15px;
                    display: flex; align-items: center; gap: 8px; }
                .sau-tab-pill:hover { border-color: #d97706; color: #d97706; transform: translateY(-2px); }
                .sau-tab-pill.active { background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; border-color: transparent;
                    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.35); transform: translateY(-2px); }

                .sau-term-btn2 { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 14px;
                    border: 2px solid transparent; cursor: pointer; transition: all 0.25s; text-align: left;
                    font-family: 'Outfit', sans-serif; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
                .sau-term-btn2:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

                @media (max-width: 900px) { .sau-lex-grid { grid-template-columns: 1fr !important; } .sau-sidebar { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

            <nav className="sau-nav">
                <button className="sau-nav-back" onClick={() => handleNavigate('/junior/grade/4/shapes-around-us')}>← Back to Shapes Around Us</button>
                <div className="sau-nav-links">
                    <button className="sau-nav-link" onClick={() => handleNavigate('/junior/grade/4/shapes-around-us/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link sau-nav-link--active">📖 Terminology</button>
                    <button className="sau-nav-link" onClick={() => handleNavigate('/junior/grade/4/shapes-around-us/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 24px' }}>
                {/* Tab switcher */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                    <button className={`sau-tab-pill ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`sau-tab-pill ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Shape Rules</button>
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
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{activeTerm.icon}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    <p style={{ margin: 0, fontSize: 16, color: '#475569', fontWeight: 600 }}>{activeTerm.def}</p>
                                </div>
                            </div>

                            {/* Animated Visual Scene */}
                            <div style={{ background: '#fafafa', borderRadius: 20, padding: '20px 16px', margin: '16px 0', border: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12, textAlign: 'center' }}>
                                    👀 See It!
                                </div>
                                <ShapeScene scene={activeTerm.scene} color={activeTerm.color} />
                            </div>

                            {/* Try It Activity */}
                            <div style={{ margin: '16px 0' }}>
                                <TryItActivity tryIt={activeTerm.tryIt} color={activeTerm.color} />
                            </div>

                            {/* Fun Fact Speech Bubble */}
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
                                {/* Header with streak */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quiz Battle ⚔️</h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        {streak >= 2 && (
                                            <div style={{ background: '#fef3c7', padding: '6px 14px', borderRadius: 50, fontSize: 14, fontWeight: 800, color: '#92400e', animation: 'sauBounceIn 0.3s both' }}>
                                                🔥 {streak} streak!
                                            </div>
                                        )}
                                        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#6366f1' }}>
                                            {quizIdx + 1}<span style={{ fontSize: 11, color: '#94a3b8' }}>/10</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress bar */}
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
                                <div style={{ fontSize: 72, marginBottom: 12, animation: 'sauBounceIn 0.5s both' }}>
                                    {quizTotalScore >= 9 ? '🏆' : quizTotalScore >= 7 ? '🌟' : quizTotalScore >= 5 ? '👏' : '💪'}
                                </div>
                                <h2 style={{ color: '#060606ff', fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, margin: '0 0 8px' }}>Quiz Complete!</h2>
                                <p style={{ color: '#060606ff', fontSize: 18, margin: '0 0 8px' }}>Score: <span style={{ color: '#6366f1', fontWeight: 900 }}>{quizTotalScore}/10</span></p>
                                {bestStreak >= 2 && <p style={{ color: '#f59e0b', fontWeight: 800, margin: '0 0 24px' }}>🔥 Best streak: {bestStreak} in a row!</p>}
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>Play Again 🔄</button>
                                    <button onClick={() => handleNavigate('/junior/grade/4/shapes-around-us/skills')} style={{ padding: '12px 28px', background: '#f1f5f9', color: '#475569', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
