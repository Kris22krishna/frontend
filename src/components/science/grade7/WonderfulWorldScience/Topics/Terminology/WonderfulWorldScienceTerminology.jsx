import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../WonderfulWorldScienceDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { TERMS, COOL_CONTEXTS, VOCAB_QUIZ } from './WonderfulWorldScienceTerminologyData';

export default function WonderfulWorldScienceTerminology() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Tabs state
    const [activeTab, setActiveTab] = useState('terms');

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedContextIdx, setSelectedContextIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeContext = COOL_CONTEXTS[selectedContextIdx];
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

/* ── Main page ───────────────────────────────────── */
    return (
        <div className={styles['chem-page']}>
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/introduction')}>🌟 Intro</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/connectomics')}>🔗 Connectomics</button>
                </div>
            </nav>

            <div className={styles['chem-lexicon-container']}>

                {/* Heading Stack */}
                <div className={styles['chem-lexicon-heading']}>
                    <h1 className={styles['chem-lexicon-title']}>
                        Science Explorer <span className={styles['chem-lexicon-title-accent']}>Lexicon</span>
                    </h1>
                    <p className={styles['chem-lexicon-sub']}>
                        {activeTab === 'quiz' ? 'Test your vocabulary and science knowledge!' : `Explore the foundations with ${activeTab === 'terms' ? '10 key terms' : '5 real-world contexts'}.`}
                    </p>
                </div>

                {/* Sub Tabs */}
                <div className={styles['chem-subtabs']}>
                    <button className={`${styles['chem-nav-link']} ${activeTab === 'terms' ? styles['active'] : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`${styles['chem-nav-link']} ${activeTab === 'contexts' ? styles['active'] : ''}`} onClick={() => setActiveTab('contexts')}>🌍 Real-World Contexts</button>
                    <button className={`${styles['chem-nav-link']} ${activeTab === 'quiz' ? styles['active'] : ''}`} onClick={() => setActiveTab('quiz')}>🎯 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Contexts) ── */
                    <div className={styles['chem-lexicon-grid']}>
                        <aside className={styles['chem-selector-container']}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`${styles['chem-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div className={styles['chem-term-mini-icon']} style={{ background: isActive ? '#fff' : `${term.color}15` }}>{term.icon}</div>
                                            <span className={styles['chem-term-mini-label']}><MathRenderer text={term.name} /></span>
                                        </button>
                                    );
                                })
                            ) : (
                                COOL_CONTEXTS.map((ctx, i) => {
                                    const isActive = selectedContextIdx === i;
                                    return (
                                        <button key={i} className={`${styles['chem-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedContextIdx(i)}>
                                            <div className={styles['chem-term-mini-icon']} style={{ background: isActive ? '#fff' : `${ctx.color}15`, color: isActive ? ctx.color : 'inherit' }}>{ctx.emoji}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className={styles['chem-term-mini-label']}>Context {ctx.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{ctx.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className={styles['chem-details-window']} key={activeTab === 'terms' ? selectedIdx : selectedContextIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div className={styles['chem-detail-header']}>
                                        <div className={styles['chem-detail-icon']} style={{ background: `${activeTerm.color}15` }}>{activeTerm.icon}</div>
                                        <h2 className={styles['chem-detail-title']} style={{ color: activeTerm.color }}>{activeTerm.name}</h2>
                                    </div>
                                    <p className={styles['chem-detail-body']}>
                                        <MathRenderer text={activeTerm.def} />
                                    </p>
                                    <div className={styles['chem-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['chem-detail-sub-label']} style={{ color: activeTerm.color }}>Examples</h4>
                                            <div className={styles['chem-detail-examples-box']} style={{ background: `${activeTerm.color}05`, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <div key={j} className={styles['chem-detail-example-item']} style={{ border: `1px solid ${activeTerm.color}20` }}>
                                                            <MathRenderer text={ex} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--chem-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['chem-detail-sub-label']} style={{ color: 'var(--chem-indigo)' }}>Quick Memory</h4>
                                            <div className={styles['chem-detail-hint-box']} style={{ background: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                                                <p className={styles['chem-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: 'var(--chem-indigo)' }}>💡 Pro-Hint: </span>
                                                    <MathRenderer text={activeTerm.memory} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles['chem-detail-header']}>
                                        <div className={styles['chem-detail-icon']} style={{ background: `${activeContext.color}15`, color: activeContext.color }}>{activeContext.emoji}</div>
                                        <h2 className={styles['chem-detail-title']} style={{ color: activeContext.color }}>C{activeContext.num}: <MathRenderer text={activeContext.title} /></h2>
                                    </div>
                                    <div style={{ background: `${activeContext.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeContext.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 19, fontWeight: 700, color: activeContext.color, margin: 0 }}>
                                            <MathRenderer text={activeContext.rule} />
                                        </p>
                                    </div>
                                    <p className={styles['chem-detail-body']}>
                                        <MathRenderer text={activeContext.detail} />
                                    </p>
                                    <div className={styles['chem-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['chem-detail-sub-label']} style={{ color: activeContext.color }}>Key Fact</h4>
                                            <div className={styles['chem-detail-examples-box']} style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeContext.examples.map((ex, j) => (
                                                        <div key={j} className={styles['chem-detail-example-item']} style={{ border: '1px solid #e2e8f0', fontWeight: 600 }}>
                                                            <MathRenderer text={ex} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['chem-detail-sub-label']} style={{ color: '#0d9488' }}>Student Tip</h4>
                                            <div className={styles['chem-detail-hint-box']} style={{ background: 'rgba(13, 148, 136, 0.05)', border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                                <p className={styles['chem-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Hint: </span>
                                                    <MathRenderer text={activeContext.tip} />
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
                                <div className={styles['chem-quiz-header']}>
                                    <div>
                                        <div className={styles['chem-quiz-meta-label']}>Question {quizIdx + 1} of {VOCAB_QUIZ.length}</div>
                                        <h3 className={styles['chem-quiz-title']}>Quiz Mode</h3>
                                    </div>
                                    <div className={styles['chem-quiz-score-circle']}>
                                        {quizTotalScore}
                                    </div>
                                </div>

                                <div className={styles['chem-quiz-question']}>
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
                                    <div className={styles['chem-quiz-explanation']}>
                                        <p>
                                            <strong style={{ color: '#4f46e5' }}>Explanation: </strong>
                                            <MathRenderer text={activeQuiz.explanation} />
                                        </p>
                                    </div>
                                )}

                                <div className={styles['chem-quiz-nav']}>
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
                            <div className={styles['chem-quiz-result']}>
                                <div className={styles['chem-quiz-result-emoji']}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 className={styles['chem-quiz-result-title']}>Great effort!</h2>
                                <p className={styles['chem-quiz-result-score']}>You scored <span>{quizTotalScore} / {VOCAB_QUIZ.length}</span></p>
                                <div className={styles['chem-quiz-result-actions']}>
                                    <button className={styles['chem-btn-outline']} onClick={resetQuiz} style={{ padding: '14px 32px' }}>Try Again</button>
                                    <button className={styles['chem-btn-filled']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/core-concepts')} style={{ padding: '14px 32px', '--skill-color': '#4f46e5' }}>Core Concepts →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div className={styles['chem-lexicon-footer']}>
                    <button className={styles['chem-btn-filled']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/core-concepts')} style={{ padding: '12px 32px', fontSize: 15, '--skill-color': '#4f46e5' }}>
                        I've mastered the language! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}
