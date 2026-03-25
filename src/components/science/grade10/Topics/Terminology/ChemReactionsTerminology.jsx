import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../ChemicalReactionsDashboard.module.css';
import MathRenderer from '../../../../MathRenderer';
import { TERMS, COOL_REACTIONS, VOCAB_QUIZ } from './ChemReactionsTerminologyData';

export default function ChemReactionsTerminology() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Tabs state
    const [activeTab, setActiveTab] = useState('terms');

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedReactionIdx, setSelectedReactionIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeReaction = COOL_REACTIONS[selectedReactionIdx];
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
        <div className={styles['chem-page']}>
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className={styles['chem-lexicon-container']}>

                {/* Heading Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', fontWeight: 900, color: 'var(--rn-text)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                        Chemical Reactions <span style={{ background: 'linear-gradient(135deg, #0d9488, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lexicon</span>
                    </h1>
                    <p style={{ fontSize: 18, fontWeight: 500, color: 'var(--rn-muted)', maxWidth: '650px', lineHeight: 1.6 }}>
                        {activeTab === 'quiz' ? 'Test your vocabulary and reaction knowledge!' : `Explore the foundations with ${activeTab === 'terms' ? '10 key terms' : '5 core reactions'}.`}
                    </p>
                </div>

                {/* Sub Tabs */}
                <div className={styles['chem-subtabs']} style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
                    <button className={`${styles['chem-nav-link']} ${activeTab === 'terms' ? styles['active'] : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`${styles['chem-nav-link']} ${activeTab === 'reactions' ? styles['active'] : ''}`} onClick={() => setActiveTab('reactions')}>🧪 5 Core Reactions</button>
                    <button className={`${styles['chem-nav-link']} ${activeTab === 'quiz' ? styles['active'] : ''}`} onClick={() => setActiveTab('quiz')}>🎯 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Reactions) ── */
                    <div className={styles['chem-lexicon-grid']}>
                        <aside className={styles['chem-selector-container']}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`${styles['chem-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#fff' : `${term.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 16 }}><MathRenderer text={term.name} /></span>
                                        </button>
                                    );
                                })
                            ) : (
                                COOL_REACTIONS.map((reaction, i) => {
                                    const isActive = selectedReactionIdx === i;
                                    return (
                                        <button key={i} className={`${styles['chem-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedReactionIdx(i)}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#fff' : `${reaction.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: isActive ? reaction.color : 'inherit' }}>{reaction.emoji}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: 15 }}>Reaction {reaction.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{reaction.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className={styles['chem-details-window']} key={activeTab === 'terms' ? selectedIdx : selectedReactionIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 18, color: 'var(--rn-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeTerm.def} />
                                    </p>
                                    <div className={styles['chem-responsive-grid-2']} style={{ gap: 24 }}>
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
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--rn-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: 'var(--rn-indigo)', marginBottom: 12, fontWeight: 800 }}>Quick Memory</h4>
                                            <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: 20, borderRadius: 16, border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 16, color: 'var(--rn-muted)', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--rn-indigo)' }}>💡 Pro-Hint: </span>
                                                    <MathRenderer text={activeTerm.memory} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeReaction.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: activeReaction.color, fontWeight: 900 }}>{activeReaction.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: activeReaction.color, margin: 0 }}>R{activeReaction.num}: <MathRenderer text={activeReaction.title} /></h2>
                                    </div>
                                    <div style={{ background: `${activeReaction.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeReaction.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 19, fontWeight: 700, color: activeReaction.color, margin: 0 }}>
                                            <MathRenderer text={activeReaction.rule} />
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 18, color: 'var(--rn-text)', lineHeight: 1.6, margin: '0 0 24px' }}>
                                        <MathRenderer text={activeReaction.detail} />
                                    </p>
                                    <div className={styles['chem-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeReaction.color, marginBottom: 12, fontWeight: 800 }}>Key Fact</h4>
                                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeReaction.examples.map((ex, j) => (
                                                        <div key={j} style={{ background: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1px solid #e2e8f0' }}>
                                                            <MathRenderer text={ex} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: '#0d9488', marginBottom: 12, fontWeight: 800 }}>Student Tip</h4>
                                            <div style={{ background: 'rgba(13, 148, 136, 0.05)', padding: 20, borderRadius: 16, border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 16, color: 'var(--rn-muted)', lineHeight: 1.6 }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Hint: </span>
                                                    <MathRenderer text={activeReaction.tip} />
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
                    <div className={styles['chem-quiz-window']}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: 2 }}>Question {quizIdx + 1} of {VOCAB_QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--rn-text)', margin: '4px 0 0' }}>Quiz Mode</h3>
                                    </div>
                                    <div style={{ width: 64, height: 64, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#4f46e5' }}>
                                        {quizTotalScore}
                                    </div>
                                </div>

                                <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--rn-text)', lineHeight: 1.5, marginBottom: 32 }}>
                                    <MathRenderer text={activeQuiz.question} />
                                </div>

                                <div className={styles['chem-responsive-grid-2']} style={{ gap: 16, marginBottom: 32 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let statusClass = '';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) statusClass = styles['correct'];
                                            else if (oi === quizSelected) statusClass = styles['wrong'];
                                        }
                                        return (
                                            <button 
                                                key={oi} 
                                                onClick={() => handleQuizSelect(oi)} 
                                                disabled={quizAnswered} 
                                                className={`${styles['chem-quiz-option']} ${statusClass}`}
                                                style={quizSelected === oi && !quizAnswered ? { borderColor: '#4f46e5', background: 'rgba(79,70,229,0.05)' } : {}}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: 18, borderRadius: 14, border: '1px solid rgba(79, 70, 229, 0.15)', marginBottom: 28 }}>
                                        <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                                            <strong style={{ color: '#4f46e5' }}>Explanation: </strong>
                                            <MathRenderer text={activeQuiz.explanation} />
                                        </p>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button 
                                        onClick={nextQuiz} 
                                        disabled={!quizAnswered} 
                                        className={styles['chem-btn-filled']}
                                        style={{ padding: '14px 44px', fontSize: 16, background: quizAnswered ? '#4f46e5' : '#e2e8f0', color: quizAnswered ? '#fff' : '#94a3b8', cursor: quizAnswered ? 'pointer' : 'not-allowed', '--skill-color': '#4f46e5' }}
                                    >
                                        {quizIdx + 1 === VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 20 }}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, marginBottom: 12, color: 'var(--rn-text)' }}>Great effort!</h2>
                                <p style={{ color: 'var(--rn-muted)', fontSize: 20, marginBottom: 40 }}>You scored <span style={{ color: '#4f46e5', fontWeight: 900 }}>{quizTotalScore} / {VOCAB_QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                                    <button className={styles['chem-btn-outline']} onClick={resetQuiz} style={{ padding: '14px 32px' }}>Try Again</button>
                                    <button className={styles['chem-btn-filled']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/core-concepts')} style={{ padding: '14px 32px', '--skill-color': '#4f46e5' }}>Core Concepts →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button className={styles['chem-btn-filled']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/core-concepts')} style={{ padding: '12px 32px', fontSize: 15, '--skill-color': '#4f46e5' }}>
                        I've mastered the language! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}
