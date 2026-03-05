import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../linesAndAnglesHub.css';
import MathRenderer from '@/components/MathRenderer';

// ─── DATA ──────────────────────────────────────────────────────────────────

const TERMS = [
    {
        name: "Point",
        icon: "📍",
        color: "#0891b2",
        def: "A location in space represented by a dot. It has no size, no width, and no depth.",
        examples: ["Point $A$", "Center $O$"],
        inUse: "A point is denoted by a single capital letter.",
        memory: "Think of it as a specific GPS coordinate on a map!"
    },
    {
        name: "Line",
        icon: "↔️",
        color: "#10b981",
        def: "A straight path of points that extends infinitely in both directions. It has no thickness.",
        examples: ["Line $AB$", "Line $l$"],
        inUse: "Two points are enough to define a unique straight line.",
        memory: "A line is like a never-ending road with no curves!"
    },
    {
        name: "Line Segment",
        icon: "📏",
        color: "#f59e0b",
        def: "A part of a line with two fixed endpoints. It has a measurable length.",
        examples: ["Segment $PQ$", "Length $5$ cm"],
        inUse: "The edge of a ruler is a physical model of a line segment.",
        memory: "It's a piece of a line that has a 'start' and an 'end'."
    },
    {
        name: "Ray",
        icon: "🔦",
        color: "#ef4444",
        def: "A part of a line that has one endpoint and extends infinitely in the other direction.",
        examples: ["Ray $OA$"],
        inUse: "Sunlight behaves like a ray, starting at the sun and going forever.",
        memory: "Think of a flashlight beam starting at the bulb!"
    },
    {
        name: "Angle",
        icon: "📐",
        color: "#6366f1",
        def: "The space or measurement between two rays or line segments that meet at a common vertex.",
        examples: ["$∠ABC$", "$90^\\circ$"],
        inUse: "Angles are measured in degrees using a protractor.",
        memory: "It's the 'opening' between two meeting lines."
    },
    {
        name: "Vertex",
        icon: "🔗",
        color: "#7c3aed",
        def: "The common point where two rays or line segments meet to form an angle.",
        examples: ["Vertex $B$ in $∠ABC$"],
        inUse: "The corner of a square is its vertex.",
        memory: "The 'hinge' or 'joint' of an angle!"
    }
];

const FIVE_RULES = [
    {
        num: 1,
        title: "Angles on a Line",
        emoji: "➖",
        color: "#10b981",
        rule: "Sum is always $180^\\circ$.",
        detail: "Angles on a straight line always add up to $180^\\circ$. This is also called a straight angle.",
        examples: ["$120^\\circ + 60^\\circ = 180^\\circ$"],
        tip: "Half a circle is $180^\\circ$!"
    },
    {
        num: 2,
        title: "Angles at a Point",
        emoji: "🔘",
        color: "#f59e0b",
        rule: "Sum is always $360^\\circ$.",
        detail: "Angles around a single point always add up to a full circle, which is $360^\\circ$.",
        examples: ["$90^\\circ + 90^\\circ + 90^\\circ + 90^\\circ = 360^\\circ$"],
        tip: "A full turn is $360^\\circ$!"
    },
    {
        num: 3,
        title: "Vertically Opposite",
        emoji: "❌",
        color: "#ef4444",
        rule: "They are ALWAYS equal.",
        detail: "When two lines intersect, the angles opposite to each other are called vertically opposite and are equal.",
        examples: ["$∠1 = ∠3$", "$∠2 = ∠4$"],
        tip: "Look for the 'X' shape!"
    },
    {
        num: 4,
        title: "Alternate Interior",
        emoji: "⚡",
        color: "#8b5cf6",
        rule: "Equal on Parallel Lines.",
        detail: "When a transversal cuts two parallel lines, the angles on opposite sides of the transversal and inside the parallel lines are equal.",
        examples: ["The 'Z' shape angles."],
        tip: "Look for the letter 'Z'!"
    },
    {
        num: 5,
        title: "Corresponding Angles",
        emoji: "👯",
        color: "#3b82f6",
        rule: "Equal on Parallel Lines.",
        detail: "Angles in the same relative position at each intersection where a straight line crosses two others are equal if the lines are parallel.",
        examples: ["The 'F' shape angles."],
        tip: "Look for the letter 'F'!"
    }
];

const VOCAB_QUIZ = [
    {
        question: "What is the point where two rays meet to form an angle?",
        options: ["Segment", "Vertex", "Ray", "Intersection"],
        correct: 1,
        explanation: "The vertex is the common endpoint of the two rays that form an angle."
    },
    {
        question: "What is the sum of angles on a straight line?",
        options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"],
        correct: 1,
        explanation: "Angles on a straight line form a straight angle, which measures $180^\\circ$."
    },
    {
        question: "What do we call a line that has one fixed endpoint and goes on forever in one direction?",
        options: ["Line Segment", "Parallel Line", "Ray", "Transversal"],
        correct: 2,
        explanation: "A ray starts at a point and extends infinitely in one direction."
    },
    {
        question: "If two lines never meet no matter how far they are extended, they are:",
        options: ["Intersecting", "Perpendicular", "Parallel", "Adjacent"],
        correct: 2,
        explanation: "Parallel lines maintain the same distance between them and never intersect."
    },
    {
        question: "What is the measure of a full turn around a point?",
        options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$45^\\circ$"],
        correct: 1,
        explanation: "Angles at a point add up to a complete rotation, which is $360^\\circ$."
    }
];

export default function LinesAndAnglesTerminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false); setQuizTotalScore(0); setQuizFinished(false);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        if (optIdx === activeQuiz.correct) setQuizTotalScore(s => s + 1);
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1); setQuizSelected(null); setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="terminology-page">
            <style>{`
                .details-window-anim { animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
                @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
                .term-btn-mini { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); text-align: left; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
                .term-btn-mini::before { content: ''; position: absolute; inset: 0; background: #fff; z-index: 0; transition: opacity 0.2s; opacity: 1; }
                .term-btn-mini:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.08); }
                .term-btn-mini:hover::before { opacity: 0.9; }
                .term-btn-mini.active { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); z-index: 2; }
                .term-btn-mini.active::before { opacity: 0; }
                .term-btn-mini > * { position: relative; z-index: 1; }
            `}</style>

            <nav className="intro-nav">
                <button
                    className="intro-nav-back"
                    onClick={() => navigate('/middle/grade/6/lines-and-angles/hub')}
                >
                    ← Back to Lines & Angles
                </button>
                <div className="intro-nav-links">
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/middle/grade/6/lines-and-angles/introduction-hub')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="intro-nav-link intro-nav-link--active"
                        onClick={() => navigate('/middle/grade/6/lines-and-angles/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/middle/grade/6/lines-and-angles/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            <div className="int-lexicon-container" style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--int-text)', margin: '0 0 8px' }}>
                        Geometry <span style={{ background: 'linear-gradient(135deg, var(--int-teal), var(--int-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--int-muted)', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge!' : `Select a ${activeTab === 'terms' ? 'term' : 'rule'} below.`}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <button className={`int-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`int-tab ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Key Rules</button>
                    <button className={`int-tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Test Prep</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className="int-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="selector-container" style={{ background: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', display: 'grid', gridTemplateColumns: activeTab === 'terms' ? '1fr 1fr' : '1fr', gap: 10, backdropFilter: 'blur(10px)' }}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => (
                                    <button key={i} className={`term-btn-mini ${selectedIdx === i ? 'active' : ''}`} onClick={() => setSelectedIdx(i)} style={{ background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`, borderColor: selectedIdx === i ? term.color : `${term.color}20`, gridColumn: i === TERMS.length - 1 && i % 2 === 0 ? 'span 2' : 'span 1' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedIdx === i ? term.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{term.icon}</div>
                                        <span style={{ fontWeight: 800, fontSize: 16, color: selectedIdx === i ? '#fff' : 'var(--int-text)' }}>{term.name}</span>
                                        {selectedIdx === i && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${term.color}, ${term.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                ))
                            ) : (
                                FIVE_RULES.map((rule, i) => (
                                    <button key={i} className={`term-btn-mini ${selectedRuleIdx === i ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)} style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: selectedRuleIdx === i ? rule.color : `${rule.color}20` }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedRuleIdx === i ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: selectedRuleIdx === i ? '#fff' : rule.color, fontWeight: 900 }}>{rule.num}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 800, fontSize: 16, color: selectedRuleIdx === i ? '#fff' : 'var(--int-text)', lineHeight: 1 }}>Rule {rule.num}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: selectedRuleIdx === i ? 'rgba(255,255,255,0.8)' : 'var(--int-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{rule.title}</span>
                                        </div>
                                        {selectedRuleIdx === i && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                ))
                            )}
                        </aside>

                        <main className="details-window-anim" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx} style={{ background: '#ffffff', borderRadius: 20, padding: '20px 28px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)', border: `2px solid ${(activeTab === 'terms' ? activeTerm : activeRule).color}15`, minHeight: 400 }}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--int-text)', lineHeight: 1.6, margin: '0 0 24px' }}><MathRenderer text={activeTerm.def} /></p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeTerm.color, marginBottom: 10 }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 16, borderRadius: 16, border: `1px solid ${activeTerm.color}10` }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <code key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, color: activeTerm.color, padding: '4px 10px', borderRadius: 8 }}><MathRenderer text={ex} /></code>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 12, fontSize: 13, color: 'var(--int-muted)', fontStyle: 'italic' }}>{activeTerm.inUse}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: 'var(--int-indigo)', marginBottom: 10 }}>Master Hint</h4>
                                            <div style={{ background: 'rgba(99,102,241,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(99,102,241,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: 'var(--int-muted)', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: 'var(--int-indigo)' }}>💡 Hint: </span>{activeTerm.memory}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: activeRule.color }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '16px 20px', borderRadius: 12, borderLeft: `5px solid ${activeRule.color}`, marginBottom: 20 }}>
                                        <p style={{ fontSize: 18, fontWeight: 700, color: activeRule.color, margin: 0 }}><MathRenderer text={activeRule.rule} /></p>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--int-text)', lineHeight: 1.6, margin: '0 0 24px' }}><MathRenderer text={activeRule.detail} /></p>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className="details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '32px 40px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--int-text)', margin: 0 }}>Vocabulary Check ({quizIdx + 1}/5)</h3>
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--int-text)', lineHeight: 1.5, marginBottom: 28 }}><MathRenderer text={activeQuiz.question} /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                                    {activeQuiz.options.map((opt, oi) => (
                                        <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: '12px 18px', borderRadius: 12, border: '2px solid #eee', background: quizSelected === oi ? (opt === activeQuiz.correct ? '#f0fdf4' : '#fef2f2') : '#fff', cursor: 'pointer' }}>
                                            <MathRenderer text={opt} />
                                        </button>
                                    ))}
                                </div>
                                <button onClick={nextQuiz} disabled={!quizAnswered} className="int-btn-primary" style={{ display: 'block', margin: '0 auto' }}>Next Question →</button>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{ fontSize: 32, fontWeight: 900 }}>Score: {quizTotalScore}/5</h2>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                                    <button className="int-btn-primary" onClick={resetQuiz}>Try Again</button>
                                    <button className="int-btn-secondary" onClick={() => navigate('/middle/grade/6/lines-and-angles/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button className="int-btn-primary" onClick={() => navigate('/middle/grade/6/lines-and-angles/skills')} style={{ padding: '10px 28px', fontSize: 13 }}>Ready to Practice! 🎯</button>
                </div>
            </div>
        </div>
    );
}
