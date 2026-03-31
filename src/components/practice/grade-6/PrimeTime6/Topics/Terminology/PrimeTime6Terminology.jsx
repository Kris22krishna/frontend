import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../primeTime6.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { TERMS, CHART_TYPES, VOCAB_QUIZ } from './PrimeTime6TerminologyData.jsx';

export default function PrimeTime6Terminology() {
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
    const activeRule = CHART_TYPES[selectedRuleIdx];
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
        <div className={styles['pt-terminology-page']} style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            background: "#f8fafc",
            minHeight: "100vh"
        }}>
            <style>{`
                .pt-details-window-anim {
                    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .pt-term-btn-mini {
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
                .pt-term-btn-mini::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    z-index: 0;
                    transition: opacity 0.2s;
                    opacity: 1;
                }
                .pt-term-btn-mini:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
                }
                .pt-term-btn-mini:hover::before {
                    opacity: 0.9;
                }
                .pt-term-btn-mini.active {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    z-index: 2;
                }
                .pt-term-btn-mini.active::before {
                    opacity: 0;
                }
                .pt-term-btn-mini > * {
                    position: relative;
                    z-index: 1;
                }
                
                @media (max-width: 1024px) {
                    .pt-lexicon-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .pt-selector-container {
                        max-width: 600px;
                        margin: 0 auto 16px;
                    }
                }
            `}</style>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className={styles['pt-intro-nav']}>
                <button className={styles['pt-intro-nav-back']} onClick={() => navigate('/middle/grade/6/prime-time')}>← Back to Prime Time Dashboard</button>
                <div className={styles['pt-intro-nav-links']}>
                    <button className={styles['pt-intro-nav-link']} onClick={() => navigate('/middle/grade/6/prime-time/introduction')}>🌟 Introduction</button>
                    <button className={`${styles['pt-intro-nav-link']} ${styles['pt-intro-nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['pt-intro-nav-link']} onClick={() => navigate('/middle/grade/6/prime-time/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="pt-lexicon-container" style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Prime Time <span style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge with 10 interactive questions!' : `Select any ${activeTab === 'terms' ? 'term' : 'rule'} below to explore details.`}
                    </div>
                </div>

                {/* Sub Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <button className={`${styles['pt-tab']} ${activeTab === 'terms' ? styles.active : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`${styles['pt-tab']} ${activeTab === 'rules' ? styles.active : ''}`} onClick={() => setActiveTab('rules')}>📏 Divisibility Rules</button>
                    <button className={`${styles['pt-tab']} ${activeTab === 'quiz' ? styles.active : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Test Prep</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Rules) ── */
                    <div className="pt-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="pt-selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: activeTab === 'terms' ? '1fr 1fr' : '1fr', gap: 10, backdropFilter: 'blur(10px)'
                        }}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`pt-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}
                                            style={{
                                                background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`,
                                                borderColor: isActive ? term.color : `${term.color}20`,
                                                gridColumn: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'span 2' : 'span 1',
                                                justifyContent: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'center' : 'flex-start'
                                            }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? term.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: isActive ? 'none' : '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : '#0f172a' }}>{term.name}</span>
                                            {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${term.color}, ${term.color}dd)`, zIndex: 0 }} />}
                                        </button>
                                    );
                                })
                            ) : (
                                CHART_TYPES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`pt-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                            style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20`, padding: '12px 16px' }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: isActive ? '#fff' : rule.color, fontWeight: 900 }}>{rule.emoji}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : '#0f172a', lineHeight: 1 }}>{rule.title}</span>
                                            </div>
                                            {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="pt-details-window-anim" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: '20px 28px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${(activeTab === 'terms' ? activeTerm : activeRule).color}15`, minHeight: 330
                        }}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#0f172a', lineHeight: 1.6, margin: '0 0 16px' }}><MathRenderer text={activeTerm.def} /></p>
                                    {activeTerm.svg && (
                                        <div style={{ textAlign: 'center', marginBottom: 20, padding: '14px 10px', background: `${activeTerm.color}05`, borderRadius: 14, border: `1px solid ${activeTerm.color}10`, overflow: 'auto' }}
                                             dangerouslySetInnerHTML={{ __html: activeTerm.svg }} />
                                    )}
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
                                                <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#6366f1', marginBottom: 10 }}>Master Hint</h4>
                                            <div style={{ background: 'rgba(99,102,241,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(99,102,241,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#64748b', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: '#6366f1' }}>💡 Hint: </span>{activeTerm.memory}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>{activeRule.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '16px 20px', borderRadius: 12, borderLeft: `5px solid ${activeRule.color}`, marginBottom: 20 }}>
                                        <p style={{ fontSize: 18, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>
                                    {activeRule.svg && (
                                        <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 10px', background: `${activeRule.color}05`, borderRadius: 14, border: `1px solid ${activeRule.color}10`, overflow: 'auto' }}
                                             dangerouslySetInnerHTML={{ __html: activeRule.svg }} />
                                    )}
                                    <p style={{ fontSize: 17, color: '#0f172a', lineHeight: 1.6, margin: '0 0 24px' }}>
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
                                                            <span style={{ fontSize: 15, background: '#fff', padding: '3px 8px', borderRadius: 6, color: '#0f172a', fontWeight: 600 }}>
                                                                <MathRenderer text={ex} />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#0891b2', marginBottom: 10 }}>Survival Tip</h4>
                                            <div style={{ background: 'rgba(8,145,178,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(8,145,178,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#64748b', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: '#0891b2' }}>🛡️ Pro Tip: </span>{activeRule.tip}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── VOCABULARY TEST TAB ── */
                    <div className="pt-details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '32px 40px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 70, height: 70, borderRadius: '50%', border: '5px solid #f1f5f9', borderTopColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: '#7c3aed' }}>{quizIdx + 1}/10</div>
                                </div>
                                {activeQuiz.svg && (
                                    <div style={{ textAlign: 'center', marginBottom: 16, padding: '12px 10px', background: '#f8fafc', borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)', overflow: 'auto' }}
                                         dangerouslySetInnerHTML={{ __html: activeQuiz.svg }} />
                                )}
                                <div style={{ fontSize: 22, fontWeight: 600, color: '#0f172a', lineHeight: 1.5, marginBottom: 28 }}>
                                    <MathRenderer text={activeQuiz.question} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let bCol = 'rgba(0,0,0,0.05)';
                                        let bgCol = '#fff';
                                        let txtCol = '#0f172a';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) { bCol = '#10b981'; bgCol = 'rgba(16,185,129,0.05)'; txtCol = '#10b981'; }
                                            else if (oi === quizSelected) { bCol = '#ef4444'; bgCol = 'rgba(239,68,68,0.05)'; txtCol = '#ef4444'; }
                                        } else if (quizSelected === oi) { bCol = '#7c3aed'; bgCol = 'rgba(124,58,237,0.05)'; }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: '16px 24px', borderRadius: 14, border: `3px solid ${bCol}`, background: bgCol, color: txtCol, fontWeight: quizSelected === oi ? 800 : 600, fontSize: 17, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div style={{ background: 'rgba(124,58,237,0.05)', padding: 16, borderRadius: 12, border: '1px solid rgba(124,58,237,0.2)', marginBottom: 24 }}>
                                        <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}><strong style={{ color: '#7c3aed' }}>Solution: </strong><MathRenderer text={activeQuiz.explanation} /></p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered} style={{ padding: '12px 40px', background: quizAnswered ? '#7c3aed' : '#f1f5f9', color: quizAnswered ? '#fff' : '#94a3b8', borderRadius: 100, border: 'none', cursor: quizAnswered ? 'pointer' : 'not-allowed', fontWeight: 600 }}>{quizIdx + 1 === 10 ? 'Finish Test' : 'Next Question →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{quizTotalScore >= 8 ? '🏆' : quizTotalScore >= 5 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Test Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: '#7c3aed', fontWeight: 900 }}>{quizTotalScore} / 10</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button style={{ padding: '12px 30px', background: '#7c3aed', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 600, cursor: 'pointer' }} onClick={resetQuiz}>Try Again</button>
                                    <button style={{ padding: '12px 30px', background: '#fff', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: 100, fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/middle/grade/6/prime-time/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button style={{ padding: '12px 30px', background: '#7c3aed', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/middle/grade/6/prime-time/skills')}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div>
    );
}
