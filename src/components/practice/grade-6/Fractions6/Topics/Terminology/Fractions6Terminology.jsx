import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../fractions6.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { terminologyDocs, terminologyQuiz } from './Fractions6TerminologyData.jsx';

export default function Fractions6Terminology() {
    const navigate = useNavigate();

    // Tabs state
    const [activeTab, setActiveTab] = useState('terms');

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = terminologyDocs[selectedIdx];
    const activeQuiz = terminologyQuiz[quizIdx];

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
        if (quizIdx + 1 < terminologyQuiz.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            background: "#f8fafc",
            minHeight: "100vh"
        }}>
            <style>{`
                .frac-details-window-anim {
                    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .frac-term-btn-mini {
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
                .frac-term-btn-mini::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    z-index: 0;
                    transition: opacity 0.2s;
                    opacity: 1;
                }
                .frac-term-btn-mini:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
                }
                .frac-term-btn-mini:hover::before {
                    opacity: 0.9;
                }
                .frac-term-btn-mini.active {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                    z-index: 2;
                }
                .frac-term-btn-mini.active::before {
                    opacity: 0;
                }
                .frac-term-btn-mini > * {
                    position: relative;
                    z-index: 1;
                }
                
                @media (max-width: 1024px) {
                    .frac-lexicon-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .frac-selector-container {
                        max-width: 600px;
                        margin: 0 auto 16px;
                    }
                }
            `}</style>

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className={styles['frac-intro-nav']}>
                <button className={styles['frac-intro-nav-back']} onClick={() => navigate('/middle/grade/6/fractions-6')}>← Back to Fractions Dashboard</button>
                <div className={styles['frac-intro-nav-links']}>
                    <button className={styles['frac-intro-nav-link']} onClick={() => navigate('/middle/grade/6/fractions-6/introduction')}>🌟 Introduction</button>
                    <button className={`${styles['frac-intro-nav-link']} ${styles['frac-intro-nav-link--active']}`}>📖 Terminology</button>
                    <button className={styles['frac-intro-nav-link']} onClick={() => navigate('/middle/grade/6/fractions-6/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Fractions <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge with 10 interactive questions!' : 'Select any term below to explore details.'}
                    </div>
                </div>

                {/* Sub Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <button className={`${styles['frac-tab']} ${activeTab === 'terms' ? styles.active : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`${styles['frac-tab']} ${activeTab === 'quiz' ? styles.active : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Test Prep</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms) ── */
                    <div className="frac-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="frac-selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr', gap: 10, backdropFilter: 'blur(10px)'
                        }}>
                            {terminologyDocs.map((term, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button key={i} className={`frac-term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: `linear-gradient(135deg, ${term.color}15, ${term.color}05)`,
                                            borderColor: isActive ? term.color : `${term.color}20`,
                                        }}
                                    >
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? term.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: isActive ? 'none' : '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>🔤</div>
                                        <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : '#0f172a' }}>{term.name}</span>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${term.color}, ${term.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="frac-details-window-anim" key={selectedIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: '20px 28px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${activeTerm.color}15`, minHeight: 330
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🔤</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                            </div>
                            <p style={{ fontSize: 17, color: '#0f172a', lineHeight: 1.6, margin: '0 0 16px' }}><MathRenderer text={activeTerm.def} /></p>
                            {activeTerm.interactiveWidget ? (
                                <div style={{ textAlign: 'center', marginBottom: 20, padding: '14px 10px', background: `${activeTerm.color}05`, borderRadius: 14, border: `1px solid ${activeTerm.color}10` }}>
                                    {activeTerm.interactiveWidget}
                                </div>
                            ) : activeTerm.svg && (
                                <div style={{ textAlign: 'center', marginBottom: 20, padding: '14px 10px', background: `${activeTerm.color}05`, borderRadius: 14, border: `1px solid ${activeTerm.color}10`, overflow: 'auto' }}
                                     dangerouslySetInnerHTML={{ __html: activeTerm.svg }} />
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeTerm.color, marginBottom: 10 }}>Example</h4>
                                    <div style={{ background: `${activeTerm.color}05`, padding: 16, borderRadius: 16, border: `1px solid ${activeTerm.color}10` }}>
                                        <code style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, color: activeTerm.color, padding: '4px 10px', borderRadius: 8, display: 'inline-flex', alignItems: 'center' }}>
                                            <MathRenderer text={`$$${activeTerm.ex}$$`} />
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                ) : (
                    /* ── VOCABULARY TEST TAB ── */
                    <div className="frac-details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '32px 40px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of {terminologyQuiz.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 70, height: 70, borderRadius: '50%', border: '5px solid #f1f5f9', borderTopColor: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: '#f59e0b' }}>{quizIdx + 1}/{terminologyQuiz.length}</div>
                                </div>
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
                                        } else if (quizSelected === oi) { bCol = '#f59e0b'; bgCol = 'rgba(245,158,11,0.05)'; }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: '16px 24px', borderRadius: 14, border: `3px solid ${bCol}`, background: bgCol, color: txtCol, fontWeight: quizSelected === oi ? 800 : 600, fontSize: 17, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div style={{ background: 'rgba(245,158,11,0.05)', padding: 16, borderRadius: 12, border: '1px solid rgba(245,158,11,0.2)', marginBottom: 24 }}>
                                        <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}><strong style={{ color: '#f59e0b' }}>Solution: </strong><MathRenderer text={activeQuiz.explanation} /></p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered} style={{ padding: '12px 40px', background: quizAnswered ? '#f59e0b' : '#f1f5f9', color: quizAnswered ? '#fff' : '#94a3b8', borderRadius: 100, border: 'none', cursor: quizAnswered ? 'pointer' : 'not-allowed', fontWeight: 600 }}>{quizIdx + 1 === terminologyQuiz.length ? 'Finish Test' : 'Next Question →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{quizTotalScore >= 8 ? '🏆' : quizTotalScore >= 5 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Test Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: '#f59e0b', fontWeight: 900 }}>{quizTotalScore} / {terminologyQuiz.length}</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button style={{ padding: '12px 30px', background: '#f59e0b', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 600, cursor: 'pointer' }} onClick={resetQuiz}>Try Again</button>
                                    <button style={{ padding: '12px 30px', background: '#fff', color: '#f59e0b', border: '2px solid #f59e0b', borderRadius: 100, fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/middle/grade/6/fractions-6/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button style={{ padding: '12px 30px', background: '#f59e0b', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/middle/grade/6/fractions-6/skills')}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div>
    );
}
