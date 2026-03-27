import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../WaterEssenceOfLifeDashboard.module.css';
import { TERMS, COOL_FACTS, VOCAB_QUIZ } from './WELTerminologyData';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

export default function WELTerminology() {
    // v4 Logging
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const isFinishedRef = useRef(false);
    const sessionStartedRef = useRef(false);
    useEffect(() => {
        if (activeTab === 'quiz' && !sessionStartedRef.current) {
            startSession({ nodeId: NODE_IDS.g5ScienceWaterTerminologyQuiz, sessionType: 'practice' });
            sessionStartedRef.current = true;
        }
    }, [activeTab, startSession]);

    useEffect(() => {
        return () => {
            if (activeTab === 'quiz' && sessionStartedRef.current && !isFinishedRef.current) {
                abandonSession({ totalQuestions: VOCAB_QUIZ.length });
            }
        };
    }, [activeTab, abandonSession]);

    const navigate = useNavigate();
    const BASE = '/middle/grade/5/science/water-essence-of-life';

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
        isFinishedRef.current = false;
        sessionStartedRef.current = false;
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        const correct = optIdx === activeQuiz.correct;
        if (correct) {
            setQuizTotalScore(s => s + 1);
        }

        logAnswer({
            question_index: quizIdx + 1,
            answer_json: { selection: optIdx },
            is_correct: correct ? 1.0 : 0.0,
            marks_awarded: correct ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0
        });
    };

    const nextQuiz = async () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            await finishSession({
                totalQuestions: VOCAB_QUIZ.length,
                questionsAnswered: VOCAB_QUIZ.length
            });
            isFinishedRef.current = true;
            setQuizFinished(true);
        }
    };

    return (
        <div className={styles['wel-page']}>
            <nav className={styles['wel-nav']}>
                <button className={styles['wel-nav-back']} onClick={() => navigate(BASE)}>
                    ← Back to Dashboard
                </button>
                <div className={styles['wel-nav-links']}>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button className={`${styles['wel-nav-link']} ${styles['active']}`}>📖 Terminology</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/core-concepts`)}>🎯 Core Concepts</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/connectomics`)}>🔗 Connectomics</button>
                    <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/virtual-lab`)}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['wel-lexicon-container']}>
                <div className={styles['wel-lexicon-heading']}>
                    <h1 className={styles['wel-lexicon-title']}>
                        Water <span className={styles['wel-lexicon-title-accent']}>Lexicon</span>
                    </h1>
                    <p className={styles['wel-lexicon-sub']}>
                        {activeTab === 'quiz' ? 'Test your vocabulary!' : `Explore the foundations with ${activeTab === 'terms' ? '10 key terms' : '5 fascinating water facts'}.`}
                    </p>
                </div>

                {/* Sub Tabs */}
                <div className={styles['wel-subtabs']}>
                    <button className={`${styles['wel-nav-link']} ${activeTab === 'terms' ? styles['active'] : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`${styles['wel-nav-link']} ${activeTab === 'facts' ? styles['active'] : ''}`} onClick={() => setActiveTab('facts')}>🌈 Cool Facts</button>
                    <button className={`${styles['wel-nav-link']} ${activeTab === 'quiz' ? styles['active'] : ''}`} onClick={() => setActiveTab('quiz')}>🎯 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className={styles['wel-lexicon-grid']}>
                        <aside className={styles['wel-selector-container']}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`${styles['wel-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div className={styles['wel-term-mini-icon']} style={{ background: isActive ? '#fff' : `${term.color}15` }}>{term.icon}</div>
                                            <span className={styles['wel-term-mini-label']}>{term.name}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                COOL_FACTS.map((fact, i) => {
                                    const isActive = selectedFactIdx === i;
                                    return (
                                        <button key={i} className={`${styles['wel-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedFactIdx(i)}>
                                            <div className={styles['wel-term-mini-icon']} style={{ background: isActive ? '#fff' : `${fact.color}15`, color: isActive ? fact.color : 'inherit' }}>{fact.emoji}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className={styles['wel-term-mini-label']}>Fact {fact.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{fact.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className={styles['wel-details-window']} key={activeTab === 'terms' ? selectedIdx : selectedFactIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div className={styles['wel-detail-header']}>
                                        <div className={styles['wel-detail-icon']} style={{ background: `${activeTerm.color}15` }}>{activeTerm.icon}</div>
                                        <h2 className={styles['wel-detail-title']} style={{ color: activeTerm.color }}>{activeTerm.name}</h2>
                                    </div>
                                    <p className={styles['wel-detail-body']}>{activeTerm.def}</p>
                                    <div className={styles['wel-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['wel-detail-sub-label']} style={{ color: activeTerm.color }}>Examples</h4>
                                            <div className={styles['wel-detail-examples-box']} style={{ background: `${activeTerm.color}05`, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <div key={j} className={styles['wel-detail-example-item']} style={{ border: `1px solid ${activeTerm.color}20` }}>
                                                            {ex}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--wel-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    {activeTerm.inUse}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['wel-detail-sub-label']} style={{ color: 'var(--wel-indigo)' }}>Quick Memory</h4>
                                            <div className={styles['wel-detail-hint-box']} style={{ background: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                                                <p className={styles['wel-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: 'var(--wel-indigo)' }}>💡 Pro-Hint: </span>
                                                    {activeTerm.memory}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles['wel-detail-header']}>
                                        <div className={styles['wel-detail-icon']} style={{ background: `${activeFact.color}15`, color: activeFact.color }}>{activeFact.emoji}</div>
                                        <h2 className={styles['wel-detail-title']} style={{ color: activeFact.color }}>Fact {activeFact.num}: {activeFact.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeFact.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeFact.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 19, fontWeight: 700, color: activeFact.color, margin: 0 }}>
                                            {activeFact.rule}
                                        </p>
                                    </div>
                                    <p className={styles['wel-detail-body']}>{activeFact.detail}</p>
                                    <div className={styles['wel-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['wel-detail-sub-label']} style={{ color: activeFact.color }}>Key Fact</h4>
                                            <div className={styles['wel-detail-examples-box']} style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeFact.examples.map((ex, j) => (
                                                        <div key={j} className={styles['wel-detail-example-item']} style={{ border: '1px solid #e2e8f0', fontWeight: 600 }}>
                                                            {ex}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['wel-detail-sub-label']} style={{ color: '#0d9488' }}>Try It!</h4>
                                            <div className={styles['wel-detail-hint-box']} style={{ background: 'rgba(13, 148, 136, 0.05)', border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                                <p className={styles['wel-detail-hint-text']}>
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
                    <div className={styles['wel-quiz-window']}>
                        {!quizFinished ? (
                            <>
                                <div className={styles['wel-quiz-header']}>
                                    <div>
                                        <div className={styles['wel-quiz-meta-label']}>Question {quizIdx + 1} of {VOCAB_QUIZ.length}</div>
                                        <h3 className={styles['wel-quiz-title']}>Quiz Mode</h3>
                                    </div>
                                    <div className={styles['wel-quiz-score-circle']}>
                                        {quizTotalScore}
                                    </div>
                                </div>

                                <div className={styles['wel-quiz-question']}>
                                    {activeQuiz.question}
                                </div>

                                <div className={styles['wel-responsive-grid-2']} style={{ gap: 16, marginBottom: 32 }}>
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
                                                className={`${styles['wel-quiz-option']} ${statusClass}`}
                                                style={quizSelected === oi && !quizAnswered ? { borderColor: '#4f46e5', background: 'rgba(79,70,229,0.05)' } : {}}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div className={styles['wel-quiz-explanation']}>
                                        <p>
                                            <strong style={{ color: '#4f46e5' }}>Explanation: </strong>
                                            {activeQuiz.explanation}
                                        </p>
                                    </div>
                                )}

                                <div className={styles['wel-quiz-nav']}>
                                    <button
                                        onClick={nextQuiz}
                                        disabled={!quizAnswered}
                                        className={styles['wel-btn-filled']}
                                        style={{ padding: '14px 44px', fontSize: 16, background: quizAnswered ? '#4f46e5' : '#e2e8f0', color: quizAnswered ? '#fff' : '#94a3b8', cursor: quizAnswered ? 'pointer' : 'not-allowed', '--skill-color': '#4f46e5' }}
                                    >
                                        {quizIdx + 1 === VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={styles['wel-quiz-result']}>
                                <div className={styles['wel-quiz-result-emoji']}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 className={styles['wel-quiz-result-title']}>Great effort!</h2>
                                <p className={styles['wel-quiz-result-score']}>You scored <span>{quizTotalScore} / {VOCAB_QUIZ.length}</span></p>
                                <div className={styles['wel-quiz-result-actions']}>
                                    <button className={styles['wel-btn-outline']} onClick={resetQuiz} style={{ padding: '14px 32px' }}>Try Again</button>
                                    <button className={styles['wel-btn-filled']} onClick={() => navigate(`${BASE}/core-concepts`)} style={{ padding: '14px 32px', '--skill-color': '#4f46e5' }}>Core Concepts →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div className={styles['wel-lexicon-footer']}>
                    <button className={styles['wel-btn-filled']} onClick={() => navigate(`${BASE}/core-concepts`)} style={{ padding: '12px 32px', fontSize: 15, '--skill-color': '#4f46e5' }}>
                        I've mastered the language! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}
