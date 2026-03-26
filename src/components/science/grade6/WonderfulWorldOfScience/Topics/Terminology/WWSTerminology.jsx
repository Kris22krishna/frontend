import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../WonderfulWorldOfScienceDashboard.module.css';
import { TERMS, COOL_FACTS, VOCAB_QUIZ } from './WWSTerminologyData';

export default function WWSTerminology() {
    const navigate = useNavigate();
    const BASE = '/middle/grade/6/science/wonderful-world-of-science';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedFactIdx, setSelectedFactIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeFact = COOL_FACTS[selectedFactIdx];
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
        <div className={styles['wws-page']}>
            <nav className={styles['wws-nav']}>
                <button className={styles['wws-nav-back']} onClick={() => navigate(BASE)}>
                    ← Back to Dashboard
                </button>
                <div className={styles['wws-nav-links']}>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button className={`${styles['wws-nav-link']} ${styles['active']}`} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/core-concepts`)}>🎯 Core Concepts</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/connectomics`)}>🔗 Connectomics</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/virtual-lab`)}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['wws-lexicon-container']}>
                <div className={styles['wws-lexicon-heading']}>
                    <h1 className={styles['wws-lexicon-title']}>
                        Science <span className={styles['wws-lexicon-title-accent']}>Lexicon</span>
                    </h1>
                    <p className={styles['wws-lexicon-sub']}>
                        {activeTab === 'quiz' ? 'Test your vocabulary!' : `Explore the foundations with ${activeTab === 'terms' ? '10 key terms' : '5 cool science facts'}.`}
                    </p>
                </div>

                {/* Sub Tabs */}
                <div className={styles['wws-subtabs']}>
                    <button className={`${styles['wws-nav-link']} ${activeTab === 'terms' ? styles['active'] : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`${styles['wws-nav-link']} ${activeTab === 'facts' ? styles['active'] : ''}`} onClick={() => setActiveTab('facts')}>🌈 Cool Facts</button>
                    <button className={`${styles['wws-nav-link']} ${activeTab === 'quiz' ? styles['active'] : ''}`} onClick={() => setActiveTab('quiz')}>🎯 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className={styles['wws-lexicon-grid']}>
                        <aside className={styles['wws-selector-container']}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`${styles['wws-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div className={styles['wws-term-mini-icon']} style={{ background: isActive ? '#fff' : `${term.color}15` }}>{term.icon}</div>
                                            <span className={styles['wws-term-mini-label']}>{term.name}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                COOL_FACTS.map((fact, i) => {
                                    const isActive = selectedFactIdx === i;
                                    return (
                                        <button key={i} className={`${styles['wws-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedFactIdx(i)}>
                                            <div className={styles['wws-term-mini-icon']} style={{ background: isActive ? '#fff' : `${fact.color}15`, color: isActive ? fact.color : 'inherit' }}>{fact.emoji}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className={styles['wws-term-mini-label']}>Fact {fact.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{fact.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className={styles['wws-details-window']} key={activeTab === 'terms' ? selectedIdx : selectedFactIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div className={styles['wws-detail-header']}>
                                        <div className={styles['wws-detail-icon']} style={{ background: `${activeTerm.color}15` }}>{activeTerm.icon}</div>
                                        <h2 className={styles['wws-detail-title']} style={{ color: activeTerm.color }}>{activeTerm.name}</h2>
                                    </div>
                                    <p className={styles['wws-detail-body']}>{activeTerm.def}</p>
                                    <div className={styles['wws-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['wws-detail-sub-label']} style={{ color: activeTerm.color }}>Examples</h4>
                                            <div className={styles['wws-detail-examples-box']} style={{ background: `${activeTerm.color}05`, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <div key={j} className={styles['wws-detail-example-item']} style={{ border: `1px solid ${activeTerm.color}20` }}>
                                                            {ex}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--wws-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    {activeTerm.inUse}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['wws-detail-sub-label']} style={{ color: 'var(--wws-indigo)' }}>Quick Memory</h4>
                                            <div className={styles['wws-detail-hint-box']} style={{ background: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                                                <p className={styles['wws-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: 'var(--wws-indigo)' }}>💡 Pro-Hint: </span>
                                                    {activeTerm.memory}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles['wws-detail-header']}>
                                        <div className={styles['wws-detail-icon']} style={{ background: `${activeFact.color}15`, color: activeFact.color }}>{activeFact.emoji}</div>
                                        <h2 className={styles['wws-detail-title']} style={{ color: activeFact.color }}>Fact {activeFact.num}: {activeFact.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeFact.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeFact.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 19, fontWeight: 700, color: activeFact.color, margin: 0 }}>
                                            {activeFact.rule}
                                        </p>
                                    </div>
                                    <p className={styles['wws-detail-body']}>{activeFact.detail}</p>
                                    <div className={styles['wws-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['wws-detail-sub-label']} style={{ color: activeFact.color }}>Key Fact</h4>
                                            <div className={styles['wws-detail-examples-box']} style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeFact.examples.map((ex, j) => (
                                                        <div key={j} className={styles['wws-detail-example-item']} style={{ border: '1px solid #e2e8f0', fontWeight: 600 }}>
                                                            {ex}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['wws-detail-sub-label']} style={{ color: '#0d9488' }}>Try It!</h4>
                                            <div className={styles['wws-detail-hint-box']} style={{ background: 'rgba(13, 148, 136, 0.05)', border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                                <p className={styles['wws-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Hint: </span>
                                                    {activeFact.tip}
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
                    <div className={styles['wws-quiz-window']}>
                        {!quizFinished ? (
                            <>
                                <div className={styles['wws-quiz-header']}>
                                    <div>
                                        <div className={styles['wws-quiz-meta-label']}>Question {quizIdx + 1} of {VOCAB_QUIZ.length}</div>
                                        <h3 className={styles['wws-quiz-title']}>Quiz Mode</h3>
                                    </div>
                                    <div className={styles['wws-quiz-score-circle']}>
                                        {quizTotalScore}
                                    </div>
                                </div>

                                <div className={styles['wws-quiz-question']}>
                                    {activeQuiz.question}
                                </div>

                                <div className={styles['wws-responsive-grid-2']} style={{ gap: 16, marginBottom: 32 }}>
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
                                                className={`${styles['wws-quiz-option']} ${statusClass}`}
                                                style={quizSelected === oi && !quizAnswered ? { borderColor: '#4f46e5', background: 'rgba(79,70,229,0.05)' } : {}}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div className={styles['wws-quiz-explanation']}>
                                        <p>
                                            <strong style={{ color: '#4f46e5' }}>Explanation: </strong>
                                            {activeQuiz.explanation}
                                        </p>
                                    </div>
                                )}

                                <div className={styles['wws-quiz-nav']}>
                                    <button
                                        onClick={nextQuiz}
                                        disabled={!quizAnswered}
                                        className={styles['wws-btn-filled']}
                                        style={{ padding: '14px 44px', fontSize: 16, background: quizAnswered ? '#4f46e5' : '#e2e8f0', color: quizAnswered ? '#fff' : '#94a3b8', cursor: quizAnswered ? 'pointer' : 'not-allowed', '--skill-color': '#4f46e5' }}
                                    >
                                        {quizIdx + 1 === VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={styles['wws-quiz-result']}>
                                <div className={styles['wws-quiz-result-emoji']}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 className={styles['wws-quiz-result-title']}>Great effort!</h2>
                                <p className={styles['wws-quiz-result-score']}>You scored <span>{quizTotalScore} / {VOCAB_QUIZ.length}</span></p>
                                <div className={styles['wws-quiz-result-actions']}>
                                    <button className={styles['wws-btn-outline']} onClick={resetQuiz} style={{ padding: '14px 32px' }}>Try Again</button>
                                    <button className={styles['wws-btn-filled']} onClick={() => navigate(`${BASE}/core-concepts`)} style={{ padding: '14px 32px', '--skill-color': '#4f46e5' }}>Core Concepts →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div className={styles['wws-lexicon-footer']}>
                    <button className={styles['wws-btn-filled']} onClick={() => navigate(`${BASE}/core-concepts`)} style={{ padding: '12px 32px', fontSize: 15, '--skill-color': '#4f46e5' }}>
                        I've mastered the language! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}
