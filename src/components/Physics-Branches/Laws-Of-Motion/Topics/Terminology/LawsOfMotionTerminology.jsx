import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LawsOfMotionBranch.css';
import { TERMS, THREE_LAWS, VOCAB_QUIZ } from './LawsOfMotionTerminologyData';

export default function LawsOfMotionTerminology() {
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
    const activeRule = THREE_LAWS[selectedRuleIdx];
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
        <div className="lom-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="lom-nav">
                <button className="lom-nav-back" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion')}>
                    ← Back to Dashboard
                </button>
                <div className="lom-nav-links">
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/connectomics')}>🧠 Connectomics</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/introduction')}>🌟 Intro</button>
                    <button className="lom-nav-link active" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/terminology')}>📖 Terminology</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/skills')}>🎯 Skills</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/exam-edge')}>⚡ Exam Edge</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="lom-lexicon-container">

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '3.5rem', fontWeight: 900, color: 'var(--lom-text)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                        Physics <span style={{ background: 'linear-gradient(135deg, var(--lom-indigo), var(--lom-violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lexicon</span>
                    </h1>
                    <p style={{ fontSize: 18, fontWeight: 500, color: 'var(--lom-muted)', maxWidth: '650px', lineHeight: 1.6 }}>
                        {activeTab === 'quiz' ? 'Test your vocabulary and laws knowledge!' : `Explore the foundations with ${activeTab === 'terms' ? '7 key terms' : "Newton's 3 laws"}.`}
                    </p>
                </div>

                {/* Sub Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
                    <button className={`lom-nav-link ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`lom-nav-link ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 3 Laws of Newton</button>
                    <button className={`lom-nav-link ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Rules) ── */
                    <div className="lom-lexicon-grid">
                        <aside className="lom-selector-container">
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`lom-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#fff' : `${term.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 16 }}>{term.name}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                THREE_LAWS.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`lom-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#fff' : `${rule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: isActive ? rule.color : 'inherit' }}>{rule.emoji}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: 15 }}>Law {rule.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{rule.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="lom-details-window" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 18, color: 'var(--lom-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        {activeTerm.def}
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12, fontWeight: 800 }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 20, borderRadius: 16, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <div key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, padding: '8px 12px', borderRadius: 8, fontSize: 15 }}>
                                                            {ex}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--lom-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    {activeTerm.inUse}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: 'var(--lom-indigo)', marginBottom: 12, fontWeight: 800 }}>Quick Memory</h4>
                                            <div style={{ background: 'rgba(29, 78, 216, 0.05)', padding: 20, borderRadius: 16, border: '1px solid rgba(29, 78, 216, 0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 16, color: 'var(--lom-muted)', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--lom-indigo)' }}>💡 Pro-Hint: </span>
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
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>Law {activeRule.num}: {activeRule.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeRule.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 19, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                            {activeRule.rule}
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 18, color: 'var(--lom-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        {activeRule.detail}
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeRule.color, marginBottom: 12, fontWeight: 800 }}>Example Application</h4>
                                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeRule.examples.map((ex, j) => (
                                                        <div key={j} style={{ background: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1px solid #e2e8f0' }}>
                                                            {ex}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: 'var(--lom-teal, #0d9488)', marginBottom: 12, fontWeight: 800 }}>Student Tip</h4>
                                            <div style={{ background: 'rgba(13, 148, 136, 0.05)', padding: 20, borderRadius: 16, border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 16, color: 'var(--lom-muted)', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Survival Tip: </span>
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
                    <div className="lom-quiz-window" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: 40, border: '1px solid var(--lom-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--lom-indigo)', textTransform: 'uppercase', letterSpacing: 2 }}>Question {quizIdx + 1} of {VOCAB_QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--lom-text)', margin: '4px 0 0' }}>Quiz Mode</h3>
                                    </div>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: 'var(--lom-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: 'var(--lom-indigo)' }}>
                                        {quizTotalScore}
                                    </div>
                                </div>

                                <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--lom-text)', lineHeight: 1.5, marginBottom: 32 }}>
                                    {activeQuiz.question}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let bg = '#fff';
                                        let border = '1px solid #e2e8f0';
                                        let color = 'var(--lom-text)';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) { bg = 'rgba(16,185,129,0.1)'; border = '2px solid #10b981'; color = '#065f46'; }
                                            else if (oi === quizSelected) { bg = 'rgba(239,68,68,0.1)'; border = '2px solid #ef4444'; color = '#991b1b'; }
                                        } else if (oi === quizSelected) {
                                            bg = 'rgba(29,78,216,0.05)'; border = '2px solid var(--lom-indigo)';
                                        }
                                        return (
                                            <button
                                                key={oi}
                                                onClick={() => handleQuizSelect(oi)}
                                                disabled={quizAnswered}
                                                style={{ background: bg, border, color, padding: '16px 20px', borderRadius: 14, fontSize: 16, fontWeight: 600, cursor: quizAnswered ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.2s ease' }}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div style={{ background: 'rgba(29, 78, 216, 0.05)', padding: 18, borderRadius: 14, border: '1px solid rgba(29, 78, 216, 0.15)', marginBottom: 28 }}>
                                        <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                                            <strong style={{ color: 'var(--lom-indigo)' }}>Explanation: </strong>
                                            {activeQuiz.explanation}
                                        </p>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={nextQuiz}
                                        disabled={!quizAnswered}
                                        style={{ padding: '14px 44px', fontSize: 16, background: quizAnswered ? 'var(--lom-indigo)' : '#e2e8f0', color: quizAnswered ? '#fff' : '#94a3b8', cursor: quizAnswered ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontWeight: 800, transition: 'all 0.2s ease' }}
                                    >
                                        {quizIdx + 1 === VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 20 }}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Great effort!</h2>
                                <p style={{ color: 'var(--lom-muted)', fontSize: 20, marginBottom: 40 }}>You scored <span style={{ color: 'var(--lom-indigo)', fontWeight: 900 }}>{quizTotalScore} / {VOCAB_QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '14px 32px', background: '#fff', border: '2px solid var(--lom-indigo)', color: 'var(--lom-indigo)', borderRadius: 100, fontWeight: 800, cursor: 'pointer' }}>Try Again</button>
                                    <button onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/skills')} style={{ padding: '14px 32px', background: 'var(--lom-indigo)', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer' }}>Practical Skills →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/skills')} style={{ padding: '12px 32px', fontSize: 16, background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: 100, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        Next Topic: Skills <span style={{ color: 'var(--lom-indigo)' }}>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
