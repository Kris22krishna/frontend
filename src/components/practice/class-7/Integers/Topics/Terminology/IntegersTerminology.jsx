import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../integers.css';
import MathRenderer from '../../../../../MathRenderer';
import { TERMS, FOUR_RULES, VOCAB_QUIZ } from './IntegersTerminologyData';

export default function IntegersTerminology() {
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
    const activeRule = FOUR_RULES[selectedRuleIdx];
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
        <div className="int-terminology-page">
            <style>{`
                .int-details-window-anim {
                    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .int-term-btn-mini {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.06);
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: left;
                    font-family: 'Outfit', sans-serif;
                    position: relative;
                    overflow: hidden;
                }
                .int-term-btn-mini::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    z-index: 0;
                    transition: opacity 0.2s;
                    opacity: 1;
                }
                .int-term-btn-mini:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
                }
                .int-term-btn-mini:hover::before {
                    opacity: 0.9;
                }
                .int-term-btn-mini.active {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    z-index: 2;
                }
                .int-term-btn-mini.active::before {
                    opacity: 0;
                }
                .int-term-btn-mini > * {
                    position: relative;
                    z-index: 1;
                }
                
                @media (max-width: 1024px) {
                    .int-lexicon-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .int-selector-container {
                        max-width: 600px;
                        margin: 0 auto 16px;
                    }
                }
            `}</style>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="int-intro-nav">
                <button className="int-intro-nav-back" onClick={() => navigate('/middle/grade/7/integers')}>← Back to Integers</button>
                <div className="int-intro-nav-links">
                    <button className="int-intro-nav-link" onClick={() => navigate('/middle/grade/7/integers/introduction')}>🌟 Introduction</button>
                    <button className="int-intro-nav-link int-intro-nav-link--active" onClick={() => navigate('/middle/grade/7/integers/terminology')}>📖 Terminology</button>
                    <button className="int-intro-nav-link" onClick={() => navigate('/middle/grade/7/integers/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="int-lexicon-container" style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--int-text)', margin: '0 0 8px' }}>
                        Integers <span style={{ background: 'linear-gradient(135deg, var(--int-teal), var(--int-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--int-muted)', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge with 10 interactive questions!' : `Select any ${activeTab === 'terms' ? 'term' : 'rule'} below to explore details.`}
                    </div>
                </div>

                {/* Sub Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <button className={`int-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`int-tab ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 4 Golden Rules</button>
                    <button className={`int-tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Test Prep</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Rules) ── */
                    <div className="int-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="int-selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: activeTab === 'terms' ? '1fr 1fr' : '1fr', gap: 10, backdropFilter: 'blur(10px)'
                        }}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`int-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}
                                            style={{
                                                background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`,
                                                borderColor: isActive ? term.color : `${term.color}20`,
                                                gridColumn: i === TERMS.length - 1 ? 'span 2' : 'span 1',
                                                justifyContent: i === TERMS.length - 1 ? 'center' : 'flex-start'
                                            }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? term.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: isActive ? 'none' : '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : 'var(--int-text)' }}>{term.name}</span>
                                            {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${term.color}, ${term.color}dd)`, zIndex: 0 }} />}
                                        </button>
                                    );
                                })
                            ) : (
                                FOUR_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`int-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                            style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20`, padding: '12px 16px' }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: isActive ? '#fff' : rule.color, fontWeight: 900 }}>{rule.num}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : 'var(--int-text)', lineHeight: 1 }}>Rule {rule.num}</span>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--int-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{rule.title}</span>
                                            </div>
                                            {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="int-details-window-anim" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: '20px 28px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${(activeTab === 'terms' ? activeTerm : activeRule).color}15`, minHeight: 330
                        }}>
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
                                                        <code key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, color: activeTerm.color, padding: '4px 10px', borderRadius: 8, display: 'flex', alignItems: 'center' }}>
                                                            <MathRenderer text={ex} />
                                                        </code>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 12, fontSize: 13, color: 'var(--int-muted)', fontStyle: 'italic' }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: 'var(--int-indigo)', marginBottom: 10 }}>Master Hint</h4>
                                            <div style={{ background: 'rgba(108,99,255,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(108,99,255,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: 'var(--int-muted)', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: 'var(--int-indigo)' }}>💡 Hint: </span>{activeTerm.memory}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '16px 20px', borderRadius: 12, borderLeft: `5px solid ${activeRule.color}`, marginBottom: 20 }}>
                                        <p style={{ fontSize: 18, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--int-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeRule.detail} />
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeRule.color, marginBottom: 10 }}>Practical Examples</h4>
                                            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    {activeRule.examples.map((ex, j) => (
                                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeRule.color }} />
                                                            <span style={{ fontSize: 15, background: '#fff', padding: '3px 8px', borderRadius: 6, color: 'var(--int-text)', fontWeight: 600 }}>
                                                                <MathRenderer text={ex} />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: 'var(--int-teal)', marginBottom: 10 }}>Survival Tip</h4>
                                            <div style={{ background: 'rgba(20,184,166,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: 'var(--int-muted)', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: 'var(--int-teal)' }}>🛡️ Pro Tip: </span>{activeRule.tip}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── VOCABULARY TEST TAB ── */
                    <div className="int-details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '32px 40px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--int-blue)', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--int-text)', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 70, height: 70, borderRadius: '50%', border: '5px solid #f1f5f9', borderTopColor: 'var(--int-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: 'var(--int-blue)' }}>{quizIdx + 1}/10</div>
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--int-text)', lineHeight: 1.5, marginBottom: 28 }}>
                                    <MathRenderer text={activeQuiz.question} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let bCol = 'rgba(0,0,0,0.05)';
                                        let bgCol = '#fff';
                                        let txtCol = 'var(--int-text)';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) { bCol = 'var(--int-teal)'; bgCol = 'rgba(20,184,166,0.05)'; txtCol = 'var(--int-teal)'; }
                                            else if (oi === quizSelected) { bCol = 'var(--int-red)'; bgCol = 'rgba(239,68,68,0.05)'; txtCol = 'var(--int-red)'; }
                                        } else if (quizSelected === oi) { bCol = 'var(--int-blue)'; bgCol = 'rgba(59,130,246,0.05)'; }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: '16px 24px', borderRadius: 14, border: `3px solid ${bCol}`, background: bgCol, color: txtCol, fontWeight: quizSelected === oi ? 800 : 600, fontSize: 17, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div style={{ background: 'rgba(59,130,246,0.05)', padding: 16, borderRadius: 12, border: '1px solid rgba(59,130,246,0.2)', marginBottom: 24 }}>
                                        <p style={{ margin: 0, fontSize: 14, color: 'var(--int-muted)', lineHeight: 1.6 }}><strong style={{ color: 'var(--int-blue)' }}>Solution: </strong><MathRenderer text={activeQuiz.explanation} /></p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered} className="int-btn-primary" style={{ padding: '12px 40px', background: quizAnswered ? 'var(--int-blue)' : '#f1f5f9', color: quizAnswered ? '#fff' : '#94a3b8', borderRadius: 100, border: 'none', cursor: quizAnswered ? 'pointer' : 'not-allowed' }}>{quizIdx + 1 === 10 ? 'Finish Test' : 'Next Question →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{quizTotalScore >= 8 ? '🏆' : quizTotalScore >= 5 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Test Complete!</h2>
                                <p style={{ color: 'var(--int-muted)', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: 'var(--int-blue)', fontWeight: 900 }}>{quizTotalScore} / 10</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button className="int-btn-primary" onClick={resetQuiz}>Try Again</button>
                                    <button className="int-btn-secondary" onClick={() => navigate('/middle/grade/7/integers/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button className="int-btn-primary" onClick={() => navigate('/middle/grade/7/integers/skills')} style={{ padding: '10px 28px', fontSize: 13 }}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div>
    );
}
