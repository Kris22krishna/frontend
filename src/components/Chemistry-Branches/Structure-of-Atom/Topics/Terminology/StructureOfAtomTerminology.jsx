import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../StructureOfAtomBranch.css';
import MathRenderer from '../../../../MathRenderer';
import { TERMS, FIVE_RULES, VOCAB_QUIZ } from './StructureOfAtomTerminologyData';

export default function StructureOfAtomTerminology() {
    const navigate = useNavigate();

    // Tabs state
    const [activeTab, setActiveTab] = useState('terms');

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizTotalScore(0);
        setQuizFinished(false);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        if (optIdx === activeQuiz.correct) {
            setQuizTotalScore(s => s + 1);
        }
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="atom-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="atom-nav">
                <button className="atom-nav-back" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom')}>
                    ← Back to Dashboard
                </button>
                <div className="atom-nav-links">
                    <button className="atom-nav-link" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/connectomics')}>🧠 Connectomics</button>
                    <button className="atom-nav-link" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/introduction')}>🌟 Intro</button>
                    <button className="atom-nav-link active" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/terminology')}>📖 Terminology</button>
                    <button className="atom-nav-link" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/skills')}>🎯 Skills</button>
                    <button className="atom-nav-link" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/exam-edge')}>⚡ Exam Edge</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="atom-lexicon-container">

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '3.5rem', fontWeight: 900, color: 'var(--atom-text)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                        Structure of Atom <span style={{ background: 'linear-gradient(135deg, var(--atom-indigo), var(--atom-violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lexicon</span>
                    </h1>
                    <p style={{ fontSize: 18, fontWeight: 500, color: 'var(--atom-muted)', maxWidth: '650px', lineHeight: 1.6 }}>
                        {activeTab === 'quiz' ? 'Test your vocabulary and rules knowledge!' : `Explore the global foundations with ${activeTab === 'terms' ? '5 key terms' : '5 golden rules'}.`}
                    </p>
                </div>

                {/* Sub Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
                    <button className={`atom-nav-link ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`atom-nav-link ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Golden Rules</button>
                    <button className={`atom-nav-link ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Rules) ── */
                    <div className="atom-lexicon-grid">
                        <aside className="atom-selector-container">
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`atom-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#fff' : `${term.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 16 }}>{term.name}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                FIVE_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`atom-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#fff' : `${rule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: isActive ? rule.color : 'inherit' }}>{rule.num}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: 15 }}>Rule {rule.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{rule.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="atom-details-window" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 18, color: 'var(--atom-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeTerm.def} />
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12, fontWeight: 800 }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 20, borderRadius: 16, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <div key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, padding: '8px 12px', borderRadius: 8, fontSize: 15 }}>
                                                            <MathRenderer text={ex} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--atom-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: 'var(--atom-indigo)', marginBottom: 12, fontWeight: 800 }}>Quick Memory</h4>
                                            <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: 20, borderRadius: 16, border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 16, color: 'var(--atom-muted)', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--atom-indigo)' }}>💡 Pro-Hint: </span>
                                                    {activeTerm.memory}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeRule.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 19, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 18, color: 'var(--atom-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeRule.detail} />
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeRule.color, marginBottom: 12, fontWeight: 800 }}>Example Application</h4>
                                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeRule.examples.map((ex, j) => (
                                                        <div key={j} style={{ background: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1px solid #e2e8f0' }}>
                                                            <MathRenderer text={ex} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: 'var(--atom-teal)', marginBottom: 12, fontWeight: 800 }}>Student Tip</h4>
                                            <div style={{ background: 'rgba(13, 148, 136, 0.05)', padding: 20, borderRadius: 16, border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 16, color: 'var(--atom-muted)', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--atom-teal)' }}>🛡️ Survival Tip: </span>
                                                    {activeRule.tip}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── VOCABULARY TEST TAB ── */
                    <div className="atom-quiz-window">
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--atom-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                                        Question {quizIdx + 1} / {VOCAB_QUIZ.length}
                                    </div>
                                    <div style={{ background: 'var(--atom-indigo)', color: '#fff', padding: '4px 12px', borderRadius: 100, fontSize: 14, fontWeight: 800 }}>
                                        Score: {quizTotalScore}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--atom-text)', margin: '0 0 32px', lineHeight: 1.5 }}>
                                    <MathRenderer text={activeQuiz.question} />
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                                    {activeQuiz.options.map((opt, idx) => {
                                        const isSelected = quizSelected === idx;
                                        const isCorrect = idx === activeQuiz.correct;
                                        
                                        let bg = '#fff';
                                        let border = '2px solid #e2e8f0';
                                        
                                        if (quizAnswered) {
                                            if (isCorrect) {
                                                bg = '#f0fdf4';
                                                border = '2px solid #22c55e';
                                            } else if (isSelected) {
                                                bg = '#fef2f2';
                                                border = '2px solid #ef4444';
                                            }
                                        } else if (isSelected) {
                                            bg = '#e0e7ff';
                                            border = '2px solid var(--atom-indigo)';
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                disabled={quizAnswered}
                                                onClick={() => handleQuizSelect(idx)}
                                                style={{
                                                    padding: '16px 24px', borderRadius: 16, border, background: bg, fontSize: 16, fontWeight: 600, color: 'var(--atom-text)', textAlign: 'left', cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                                }}
                                            >
                                                <MathRenderer text={opt} />
                                                {quizAnswered && isCorrect && <span style={{ color: '#22c55e' }}>✓</span>}
                                                {quizAnswered && isSelected && !isCorrect && <span style={{ color: '#ef4444' }}>×</span>}
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div style={{ animation: 'fadeIn 0.3s ease' }}>
                                        <div style={{ padding: 20, background: '#f8fafc', borderRadius: 16, borderLeft: '4px solid var(--atom-indigo)', marginBottom: 24, fontSize: 15, color: 'var(--atom-text)', lineHeight: 1.6 }}>
                                            <strong style={{ color: 'var(--atom-indigo)' }}>Explanation:</strong> <MathRenderer text={activeQuiz.explanation} />
                                        </div>
                                        <button className="atom-btn-filled" onClick={nextQuiz} style={{ width: '100%', padding: '16px', fontSize: 16, '--skill-color': 'var(--atom-text)' }}>
                                            {quizIdx < VOCAB_QUIZ.length - 1 ? 'Next Question →' : 'See Results 🏆'}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease', padding: '40px 0' }}>
                                <div style={{ fontSize: 80, marginBottom: 24 }}>
                                    {quizTotalScore === VOCAB_QUIZ.length ? '🥇' : quizTotalScore >= VOCAB_QUIZ.length / 2 ? '🥈' : '📚'}
                                </div>
                                <h3 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 8px', color: 'var(--atom-text)' }}>
                                    Quiz Complete!
                                </h3>
                                <p style={{ fontSize: 20, color: 'var(--atom-muted)', margin: '0 0 32px' }}>
                                    You scored <strong style={{ color: 'var(--atom-indigo)', fontSize: 24 }}>{quizTotalScore}</strong> out of {VOCAB_QUIZ.length}
                                </p>
                                
                                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                                    <button className="atom-nav-link" onClick={resetQuiz} style={{ border: '1px solid #cbd5e1' }}>
                                        ↻ Retry Quiz
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Footer CTA */}
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/skills')} style={{ padding: '12px 32px', fontSize: 16, background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 100, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        Next Topic: Skills <span style={{ color: 'var(--atom-indigo)' }}>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
