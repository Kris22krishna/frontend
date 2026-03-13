import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../NumberSystem.css';
import MathRenderer from '../../../../MathRenderer';
import { TERMS, FIVE_RULES, VOCAB_QUIZ } from './NumberSystemTerminologyData';

export default function NumberSystemTerminology() {
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
        <div className="ns-page">

            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="ns-nav">
                <button className="ns-nav-back" onClick={() => navigate('/senior/grade/9/number-system')}>← Back to Hub</button>
                <div className="ns-nav-links">
                    <button className="ns-nav-link" onClick={() => navigate('/senior/grade/9/number-system/introduction')}>🌟 Introduction</button>
                    <button className="ns-nav-link ns-nav-link--active" onClick={() => navigate('/senior/grade/9/number-system/terminology')}>📖 Terminology</button>
                    <button className="ns-nav-link" onClick={() => navigate('/senior/grade/9/number-system/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="ns-section" style={{ marginTop: '24px' }}>

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Number System <span className="ns-accent-text">Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge with interactive questions!' : `Select any ${activeTab === 'terms' ? 'term' : 'rule'} below to explore details.`}
                    </div>
                </div>

                {/* Sub Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                    <button className={`ns-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`ns-tab ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 Key Rules</button>
                    <button className={`ns-tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Test Prep</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Rules) ── */
                    <div className="ns-learn-grid">
                        <aside className="ns-learn-sidebar">
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`ns-sidebar-btn ${isActive ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}
                                            style={{
                                                '--skill-color': term.color
                                            }}
                                        >
                                            <div className="ns-sidebar-btn-num" style={{ background: 'transparent' }}>
                                                {term.icon}
                                            </div>
                                            <span className="ns-sidebar-btn-title">{term.name}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                FIVE_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`ns-sidebar-btn ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                            style={{ '--skill-color': rule.color }}
                                        >
                                            <div className="ns-sidebar-btn-num">{rule.num}</div>
                                            <span className="ns-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="ns-details-window ns-details-window-anim" key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx} style={{
                            border: `2px solid ${(activeTab === 'terms' ? activeTerm : activeRule).color}15`, minHeight: 330
                        }}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div className="ns-learn-header-row">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#1e293b', lineHeight: 1.6, margin: '0 0 24px' }}><MathRenderer text={activeTerm.def} /></p>
                                    <div className="ns-rule-split">
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
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#4f46e5', marginBottom: 10 }}>Master Hint</h4>
                                            <div style={{ background: 'rgba(79,70,229,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(79,70,229,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#64748b', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: '#4f46e5' }}>💡 Hint: </span><MathRenderer text={activeTerm.memory} /></p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="ns-learn-header-row">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                        </div>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '16px 20px', borderRadius: 12, borderLeft: `5px solid ${activeRule.color}`, marginBottom: 20 }}>
                                        <p style={{ fontSize: 18, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#1e293b', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeRule.detail} />
                                    </p>
                                    <div className="ns-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: activeRule.color, marginBottom: 10 }}>Practical Examples</h4>
                                            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 16, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    {activeRule.examples.map((ex, j) => (
                                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeRule.color }} />
                                                            <span style={{ fontSize: 15, background: '#fff', padding: '3px 8px', borderRadius: 6, color: '#1e293b', fontWeight: 600 }}>
                                                                <MathRenderer text={ex} />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#0d9488', marginBottom: 10 }}>Survival Tip</h4>
                                            <div style={{ background: 'rgba(13,148,136,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(13,148,136,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#64748b', lineHeight: 1.6 }}><span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Pro Tip: </span><MathRenderer text={activeRule.tip} /></p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── VOCABULARY TEST TAB ── */
                    <div className="ns-details-window-anim ns-quiz-container">
                        <div className="ns-quiz-card">
                            {!quizFinished ? (
                                <>
                                    <div className="ns-score-header">
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>Vocabulary Check</h3>
                                        </div>
                                        <div style={{ width: 70, height: 70, borderRadius: '50%', border: '5px solid #f1f5f9', borderTopColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: '#0284c7' }}>{quizIdx + 1}/10</div>
                                    </div>
                                    <div style={{ fontSize: 22, fontWeight: 600, color: '#0f172a', lineHeight: 1.5, marginBottom: 28 }}>
                                        <MathRenderer text={activeQuiz.question} />
                                    </div>
                                    <div className="ns-quiz-options" style={{ marginBottom: 28 }}>
                                        {activeQuiz.options.map((opt, oi) => {
                                            let bCol = 'rgba(0,0,0,0.05)';
                                            let bgCol = '#fff';
                                            let txtCol = '#0f172a';
                                            if (quizAnswered) {
                                                if (oi === activeQuiz.correct) { bCol = '#0d9488'; bgCol = 'rgba(13,148,136,0.05)'; txtCol = '#0d9488'; }
                                                else if (oi === quizSelected) { bCol = '#e11d48'; bgCol = 'rgba(225,29,72,0.05)'; txtCol = '#e11d48'; }
                                            } else if (quizSelected === oi) { bCol = '#0284c7'; bgCol = 'rgba(2,132,199,0.05)'; }
                                            return (
                                                <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} style={{ padding: '16px 24px', borderRadius: 14, border: `3px solid ${bCol}`, background: bgCol, color: txtCol, fontWeight: quizSelected === oi ? 800 : 600, fontSize: 17, cursor: quizAnswered ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                                                    <MathRenderer text={opt} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {quizAnswered && (
                                        <div style={{ background: 'rgba(2,132,199,0.05)', padding: 16, borderRadius: 12, border: '1px solid rgba(2,132,199,0.2)', marginBottom: 24 }}>
                                            <p style={{ margin: 0, fontSize: 14, color: '#64748b', lineHeight: 1.6 }}><strong style={{ color: '#0284c7' }}>Solution: </strong><MathRenderer text={activeQuiz.explanation} /></p>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button onClick={nextQuiz} disabled={!quizAnswered} className="ns-btn-primary" style={{ padding: '12px 40px', background: quizAnswered ? '#0284c7' : '#f1f5f9', color: quizAnswered ? '#fff' : '#94a3b8', borderRadius: 100, border: 'none', cursor: quizAnswered ? 'pointer' : 'not-allowed' }}>{quizIdx + 1 === 10 ? 'Finish Test' : 'Next Question →'}</button>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <div style={{ fontSize: 60, marginBottom: 16 }}>{quizTotalScore >= 8 ? '🏆' : quizTotalScore >= 5 ? '🌟' : '💪'}</div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Test Complete!</h2>
                                    <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: '#0284c7', fontWeight: 900 }}>{quizTotalScore} / 10</span></p>
                                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                        <button className="ns-btn-primary" onClick={resetQuiz}>Try Again</button>
                                        <button className="ns-btn-primary" style={{ background: '#312e81' }} onClick={() => navigate('/senior/grade/9/number-system/skills')}>Go to Skills 🎯</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer CTA */}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button className="ns-btn-primary" onClick={() => navigate('/senior/grade/9/number-system/skills')} style={{ padding: '10px 28px', fontSize: 13, background: '#312e81' }}>Explore Skills 🎯</button>
                </div>
            </div>
        </div>
    );
}
