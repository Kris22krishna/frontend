import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LinesAndAngles.css';
import MathRenderer from '@/components/MathRenderer';
import { ArrowLeft } from 'lucide-react';

const TERMS = [
    {
        name: "Point", icon: "📍", color: "#0891b2",
        def: "A location in space represented by a dot. It has no size, no width, and no depth.",
        examples: ["Point $A$", "Center $O$"],
        inUse: "A point is denoted by a single capital letter.",
        memory: "Think of it as a specific GPS coordinate on a map!"
    },
    {
        name: "Line", icon: "↔️", color: "#10b981",
        def: "A straight path of points that extends infinitely in both directions. It has no thickness.",
        examples: ["Line $AB$", "Line $l$"],
        inUse: "Two points are enough to define a unique straight line.",
        memory: "A line is like a never-ending road with no curves!"
    },
    {
        name: "Line Segment", icon: "📏", color: "#f59e0b",
        def: "A part of a line with two fixed endpoints. It has a measurable length.",
        examples: ["Segment $PQ$", "Length $5$ cm"],
        inUse: "The edge of a ruler is a physical model of a line segment.",
        memory: "It's a piece of a line that has a 'start' and an 'end'."
    },
    {
        name: "Ray", icon: "🔦", color: "#ef4444",
        def: "A part of a line that has one endpoint and extends infinitely in the other direction.",
        examples: ["Ray $OA$"],
        inUse: "Sunlight behaves like a ray, starting at the sun and going forever.",
        memory: "Think of a flashlight beam starting at the bulb!"
    },
    {
        name: "Angle", icon: "📐", color: "#6366f1",
        def: "The space or measurement between two rays or line segments that meet at a common vertex.",
        examples: ["$∠ABC$", "$90^\\circ$"],
        inUse: "Angles are measured in degrees using a protractor.",
        memory: "It's the 'opening' between two meeting lines."
    },
    {
        name: "Vertex", icon: "🔗", color: "#7c3aed",
        def: "The common point where two rays or line segments meet to form an angle.",
        examples: ["Vertex $B$ in $∠ABC$"],
        inUse: "The corner of a square is its vertex.",
        memory: "The 'hinge' or 'joint' of an angle!"
    }
];

const FIVE_RULES = [
    {
        num: 1, title: "Angles on a Line", emoji: "➖", color: "#10b981",
        rule: "Sum is always $180^\\circ$.",
        detail: "Angles on a straight line always add up to $180^\\circ$. This is also called a straight angle.",
        examples: ["$120^\\circ + 60^\\circ = 180^\\circ$"], tip: "Half a circle is $180^\\circ$!"
    },
    {
        num: 2, title: "Angles at a Point", emoji: "🔘", color: "#f59e0b",
        rule: "Sum is always $360^\\circ$.",
        detail: "Angles around a single point always add up to a full circle, which is $360^\\circ$.",
        examples: ["$90^\\circ + 90^\\circ + 90^\\circ + 90^\\circ = 360^\\circ$"], tip: "A full turn is $360^\\circ$!"
    },
    {
        num: 3, title: "Vertically Opposite", emoji: "❌", color: "#ef4444",
        rule: "They are ALWAYS equal.",
        detail: "When two lines intersect, the angles opposite to each other are called vertically opposite and are equal.",
        examples: ["$∠1 = ∠3$", "$∠2 = ∠4$"], tip: "Look for the 'X' shape!"
    },
    {
        num: 4, title: "Alternate Interior", emoji: "⚡", color: "#8b5cf6",
        rule: "Equal on Parallel Lines.",
        detail: "When a transversal cuts two parallel lines, the angles on opposite sides of the transversal and inside the parallel lines are equal.",
        examples: ["The 'Z' shape angles."], tip: "Look for the letter 'Z'!"
    },
    {
        num: 5, title: "Corresponding Angles", emoji: "👯", color: "#3b82f6",
        rule: "Equal on Parallel Lines.",
        detail: "Angles in the same relative position at each intersection where a straight line crosses two others are equal if the lines are parallel.",
        examples: ["The 'F' shape angles."], tip: "Look for the letter 'F'!"
    }
];

const VOCAB_QUIZ = [
    { question: "What is the point where two rays meet to form an angle?", options: ["Segment", "Vertex", "Ray", "Intersection"], correct: 1, explanation: "The vertex is the common endpoint of the two rays that form an angle." },
    { question: "What is the sum of angles on a straight line?", options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"], correct: 1, explanation: "Angles on a straight line form a straight angle, which measures $180^\\circ$." },
    { question: "What do we call a line that has one fixed endpoint and goes on forever in one direction?", options: ["Line Segment", "Parallel Line", "Ray", "Transversal"], correct: 2, explanation: "A ray starts at a point and extends infinitely in one direction." },
    { question: "If two lines never meet no matter how far they are extended, they are:", options: ["Intersecting", "Perpendicular", "Parallel", "Adjacent"], correct: 2, explanation: "Parallel lines maintain the same distance between them and never intersect." },
    { question: "What is the measure of a full turn around a point?", options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$45^\\circ$"], correct: 1, explanation: "Angles at a point add up to a complete rotation, which is $360^\\circ$." }
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
        <div className="matrices-chapter-page">
            <nav className="matrices-chapter-header" style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
                <button
                    className="matrices-back-btn"
                    onClick={() => navigate('/middle/grade/6/lines-and-angles')}
                >
                    <ArrowLeft size={18} /> Back to Chapter
                </button>
                <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Core Terminology</h1>
            </nav>

            <div style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', margin: '0 0 8px' }}>
                        Geometry <span style={{ color: '#4F46E5' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#64748B' }}>
                        {activeTab === 'quiz' ? 'Test your knowledge!' : `Select a ${activeTab === 'terms' ? 'term' : 'rule'} below.`}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                    <button onClick={() => setActiveTab('terms')} style={{ padding: '10px 24px', borderRadius: 20, border: 'none', background: activeTab === 'terms' ? '#4F46E5' : '#F1F5F9', color: activeTab === 'terms' ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}>📚 Terminology</button>
                    <button onClick={() => setActiveTab('rules')} style={{ padding: '10px 24px', borderRadius: 20, border: 'none', background: activeTab === 'rules' ? '#4F46E5' : '#F1F5F9', color: activeTab === 'rules' ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}>📏 5 Key Rules</button>
                    <button onClick={() => setActiveTab('quiz')} style={{ padding: '10px 24px', borderRadius: 20, border: 'none', background: activeTab === 'quiz' ? '#4F46E5' : '#F1F5F9', color: activeTab === 'quiz' ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}>🧪 Test Prep</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 24, alignItems: 'start' }}>
                        <aside style={{ background: '#F8FAFC', padding: '16px', borderRadius: 20, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => (
                                    <button key={i} onClick={() => setSelectedIdx(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, border: '1px solid', borderColor: selectedIdx === i ? term.color : 'transparent', background: selectedIdx === i ? `${term.color}15` : '#fff', cursor: 'pointer', textAlign: 'left', transition: '0.2s' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedIdx === i ? term.color : '#F1F5F9', color: selectedIdx === i ? '#fff' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{term.icon}</div>
                                        <span style={{ fontWeight: 800, fontSize: 16, color: selectedIdx === i ? term.color : '#334155' }}>{term.name}</span>
                                    </button>
                                ))
                            ) : (
                                FIVE_RULES.map((rule, i) => (
                                    <button key={i} onClick={() => setSelectedRuleIdx(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, border: '1px solid', borderColor: selectedRuleIdx === i ? rule.color : 'transparent', background: selectedRuleIdx === i ? `${rule.color}15` : '#fff', cursor: 'pointer', textAlign: 'left', transition: '0.2s' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: selectedRuleIdx === i ? rule.color : '#F1F5F9', color: selectedRuleIdx === i ? '#fff' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900 }}>{rule.num}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 800, fontSize: 16, color: selectedRuleIdx === i ? rule.color : '#334155' }}>Rule {rule.num}</span>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>{rule.title}</span>
                                        </div>
                                    </button>
                                ))
                            )}
                        </aside>

                        <main style={{ background: '#fff', borderRadius: 20, padding: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0', minHeight: 400 }}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: '1.2rem', color: '#334155', lineHeight: 1.6, marginBottom: 32 }}><MathRenderer text={activeTerm.def} /></p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: activeTerm.color, margin: '0 0 12px' }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 20, borderRadius: 16, border: `1px solid ${activeTerm.color}20` }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <span key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}30`, color: activeTerm.color, padding: '6px 12px', borderRadius: 8, fontWeight: 600 }}><MathRenderer text={ex} /></span>
                                                    ))}
                                                </div>
                                                <div style={{ fontSize: 14, color: '#64748B', fontStyle: 'italic' }}>{activeTerm.inUse}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#6366F1', margin: '0 0 12px' }}>Master Hint</h4>
                                            <div style={{ background: '#EEF2FF', padding: 20, borderRadius: 16, border: '1px solid #C7D2FE' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: '#4F46E5' }}>💡 Hint: </span>{activeTerm.memory}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: activeRule.color }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}10`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeRule.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: '1.4rem', fontWeight: 700, color: activeRule.color, margin: 0 }}><MathRenderer text={activeRule.rule} /></p>
                                    </div>
                                    <p style={{ fontSize: '1.2rem', color: '#334155', lineHeight: 1.6, marginBottom: 24 }}><MathRenderer text={activeRule.detail} /></p>
                                    <div style={{ background: '#F8FAFC', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                                        <span style={{ fontWeight: 800, color: '#0F172A' }}>Example: </span>
                                        <span style={{ color: '#475569' }}><MathRenderer text={activeRule.examples[0]} /></span>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '40px', boxShadow: '0 12px 32px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Vocabulary Check ({quizIdx + 1}/5)</h3>
                                </div>
                                <div style={{ fontSize: '1.3rem', fontWeight: 600, color: '#1E293B', lineHeight: 1.5, marginBottom: 32 }}><MathRenderer text={activeQuiz.question} /></div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                                    {activeQuiz.options.map((opt, oi) => (
                                        <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: '16px 20px', borderRadius: 16, border: '2px solid', borderColor: quizSelected === oi ? (opt === activeQuiz.correct ? '#10B981' : '#EF4444') : '#E2E8F0', background: quizSelected === oi ? (opt === activeQuiz.correct ? '#ECFDF5' : '#FEF2F2') : '#fff', color: '#334155', fontWeight: 600, fontSize: '1.1rem', cursor: quizAnswered ? 'default' : 'pointer', textAlign: 'left', transition: '0.2s' }}>
                                            <MathRenderer text={opt} />
                                        </button>
                                    ))}
                                </div>
                                {quizAnswered && (
                                    <div style={{ padding: 16, background: '#F1F5F9', borderRadius: 12, marginBottom: 24, color: '#475569' }}>
                                        <span style={{ fontWeight: 700 }}>Explanation:</span> <MathRenderer text={activeQuiz.explanation} />
                                    </div>
                                )}
                                <button onClick={nextQuiz} disabled={!quizAnswered} style={{ display: 'block', margin: '0 auto', padding: '14px 32px', background: quizAnswered ? '#4F46E5' : '#CBD5E1', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: quizAnswered ? 'pointer' : 'not-allowed', transition: '0.2s' }}>
                                    {quizIdx === 4 ? 'Finish Quiz' : 'Next Question →'}
                                </button>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '4rem', marginBottom: 16 }}>🏆</div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1E293B', margin: '0 0 16px' }}>Quiz Complete!</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748B', marginBottom: 32 }}>Your Scored: <span style={{ fontWeight: 800, color: '#4F46E5' }}>{quizTotalScore} / 5</span></p>
                                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                                    <button onClick={() => { setQuizIdx(0); setQuizAnswered(false); setQuizSelected(null); setQuizFinished(false); setQuizTotalScore(0); }} style={{ padding: '12px 28px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}>Try Again</button>
                                    <button onClick={() => navigate('/middle/grade/6/lines-and-angles/skills')} style={{ padding: '12px 28px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)' }}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button onClick={() => navigate('/middle/grade/6/lines-and-angles/skills')} style={{ padding: '14px 32px', background: '#10B981', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)' }}>
                        Ready to Practice! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}

