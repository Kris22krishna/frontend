import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../SolutionsDashboard.module.css';
import MathRenderer from '../../../../../../MathRenderer';
import { TERMS, KEY_LAWS, VOCAB_QUIZ } from './SolutionsTerminologyData';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { SLUG_TO_NODE_ID } from '@/lib/curriculumIds';

export default function SolutionsTerminology() {
    const navigate = useNavigate();
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const nodeId = SLUG_TO_NODE_ID['g12-chem-solutions-terminology'];

    const sessionStartedRef = useRef(false);
    const isFinishedRef = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Tabs state
    const [activeTab, setActiveTab] = useState('terms');

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedLawIdx, setSelectedLawIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        if (activeTab === 'quiz' && !sessionStartedRef.current) {
            startSession({ nodeId, sessionType: 'practice' });
            sessionStartedRef.current = true;
            isFinishedRef.current = false;
        } else if (activeTab !== 'quiz' && sessionStartedRef.current && !isFinishedRef.current) {
            abandonSession({ totalQuestions: VOCAB_QUIZ.length });
            sessionStartedRef.current = false;
        }
    }, [activeTab, nodeId, startSession, abandonSession]);

    useEffect(() => {
        return () => {
            if (sessionStartedRef.current && !isFinishedRef.current) {
                abandonSession({ totalQuestions: VOCAB_QUIZ.length });
            }
        };
    }, [abandonSession]);

    const activeTerm = TERMS[selectedIdx];
    const activeLaw = KEY_LAWS[selectedLawIdx];
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

    const [quizAnswers, setQuizAnswers] = useState(() => Array(VOCAB_QUIZ.length).fill(null));

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        const newAns = [...quizAnswers];
        newAns[quizIdx] = optIdx;
        setQuizAnswers(newAns);

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

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
            isFinishedRef.current = true;
            
            const payload = quizAnswers.map((ans, idx) => {
                if (ans === null && idx !== quizIdx) return null;
                const finalAns = idx === quizIdx ? quizSelected : ans;
                if (finalAns === null) return null;
                const isCorrect = finalAns === VOCAB_QUIZ[idx].correct;
                return {
                    question_index: idx + 1,
                    answer_json: { selection: finalAns },
                    is_correct: isCorrect ? 1.0 : 0.0,
                    marks_awarded: isCorrect ? 1 : 0,
                    marks_possible: 1,
                    time_taken_ms: 0
                };
            }).filter(Boolean);

            finishSession({
                totalQuestions: VOCAB_QUIZ.length,
                questionsAnswered: payload.length,
                answersPayload: payload
            });
        }
    };

/* ── Main page ───────────────────────────────────── */
    return (
        <div className={styles['sol-page']}>
            <nav className={styles['sol-nav']}>
                <button className={styles['sol-nav-back']} onClick={() => navigate('/senior/grade/12/chemistry/solutions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['sol-nav-links']}>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/introduction')}>🌟 Intro</button>
                    <button className={`${styles['sol-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/12/chemistry/solutions/terminology')}>📖 Terminology</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/exam-edge')}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles['sol-lexicon-container']}>

                {/* Heading Stack */}
                <div className={styles['sol-lexicon-heading']}>
                    <h1 className={styles['sol-lexicon-title']}>
                        Solutions <span className={styles['sol-lexicon-title-accent']}>Lexicon</span>
                    </h1>
                    <p className={styles['sol-lexicon-sub']}>
                        {activeTab === 'quiz' ? 'Test your vocabulary and concept knowledge!' : `Explore the foundations with ${activeTab === 'terms' ? '10 key terms' : '5 key laws'}.`}
                    </p>
                </div>

                {/* Sub Tabs */}
                <div className={styles['sol-subtabs']}>
                    <button className={`${styles['sol-nav-link']} ${activeTab === 'terms' ? styles['active'] : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`${styles['sol-nav-link']} ${activeTab === 'laws' ? styles['active'] : ''}`} onClick={() => setActiveTab('laws')}>⚗️ 5 Key Laws</button>
                    <button className={`${styles['sol-nav-link']} ${activeTab === 'quiz' ? styles['active'] : ''}`} onClick={() => setActiveTab('quiz')}>🎯 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL VIEW (Terms or Laws) ── */
                    <div className={styles['sol-lexicon-grid']}>
                        <aside className={styles['sol-selector-container']}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`${styles['sol-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div className={styles['sol-term-mini-icon']} style={{ background: isActive ? '#fff' : `${term.color}15` }}>{term.icon}</div>
                                            <span className={styles['sol-term-mini-label']}><MathRenderer text={term.name} /></span>
                                        </button>
                                    );
                                })
                            ) : (
                                KEY_LAWS.map((law, i) => {
                                    const isActive = selectedLawIdx === i;
                                    return (
                                        <button key={i} className={`${styles['sol-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedLawIdx(i)}>
                                            <div className={styles['sol-term-mini-icon']} style={{ background: isActive ? '#fff' : `${law.color}15`, color: isActive ? law.color : 'inherit' }}>{law.emoji}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className={styles['sol-term-mini-label']}>Law {law.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{law.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className={styles['sol-details-window']} key={activeTab === 'terms' ? selectedIdx : selectedLawIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div className={styles['sol-detail-header']}>
                                        <div className={styles['sol-detail-icon']} style={{ background: `${activeTerm.color}15` }}>{activeTerm.icon}</div>
                                        <h2 className={styles['sol-detail-title']} style={{ color: activeTerm.color }}>{activeTerm.name}</h2>
                                    </div>
                                    <p className={styles['sol-detail-body']}>
                                        <MathRenderer text={activeTerm.def} />
                                    </p>
                                    <div className={styles['sol-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['sol-detail-sub-label']} style={{ color: activeTerm.color }}>Examples</h4>
                                            <div className={styles['sol-detail-examples-box']} style={{ background: `${activeTerm.color}05`, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <div key={j} className={styles['sol-detail-example-item']} style={{ border: `1px solid ${activeTerm.color}20` }}>
                                                            <MathRenderer text={ex} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--sol-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['sol-detail-sub-label']} style={{ color: 'var(--sol-indigo)' }}>Quick Memory</h4>
                                            <div className={styles['sol-detail-hint-box']} style={{ background: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.1)' }}>
                                                <p className={styles['sol-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: 'var(--sol-indigo)' }}>💡 Pro-Hint: </span>
                                                    <MathRenderer text={activeTerm.memory} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles['sol-detail-header']}>
                                        <div className={styles['sol-detail-icon']} style={{ background: `${activeLaw.color}15`, color: activeLaw.color }}>{activeLaw.emoji}</div>
                                        <h2 className={styles['sol-detail-title']} style={{ color: activeLaw.color }}>L{activeLaw.num}: <MathRenderer text={activeLaw.title} /></h2>
                                    </div>
                                    <div style={{ background: `${activeLaw.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeLaw.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 19, fontWeight: 700, color: activeLaw.color, margin: 0 }}>
                                            <MathRenderer text={activeLaw.rule} />
                                        </p>
                                    </div>
                                    <p className={styles['sol-detail-body']}>
                                        <MathRenderer text={activeLaw.detail} />
                                    </p>
                                    <div className={styles['sol-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['sol-detail-sub-label']} style={{ color: activeLaw.color }}>Key Fact</h4>
                                            <div className={styles['sol-detail-examples-box']} style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeLaw.examples.map((ex, j) => (
                                                        <div key={j} className={styles['sol-detail-example-item']} style={{ border: '1px solid #e2e8f0', fontWeight: 600 }}>
                                                            <MathRenderer text={ex} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['sol-detail-sub-label']} style={{ color: '#0d9488' }}>Student Tip</h4>
                                            <div className={styles['sol-detail-hint-box']} style={{ background: 'rgba(13, 148, 136, 0.05)', border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                                <p className={styles['sol-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Hint: </span>
                                                    <MathRenderer text={activeLaw.tip} />
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
                    <div className={styles['sol-quiz-window']}>
                        {!quizFinished ? (
                            <>
                                <div className={styles['sol-quiz-header']}>
                                    <div>
                                        <div className={styles['sol-quiz-meta-label']}>Question {quizIdx + 1} of {VOCAB_QUIZ.length}</div>
                                        <h3 className={styles['sol-quiz-title']}>Quiz Mode</h3>
                                    </div>
                                    <div className={styles['sol-quiz-score-circle']}>
                                        {quizTotalScore}
                                    </div>
                                </div>

                                <div className={styles['sol-quiz-question']}>
                                    <MathRenderer text={activeQuiz.question} />
                                </div>

                                <div className={styles['sol-responsive-grid-2']} style={{ gap: 16, marginBottom: 32 }}>
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
                                                className={`${styles['sol-quiz-option']} ${statusClass}`}
                                                style={quizSelected === oi && !quizAnswered ? { borderColor: '#4f46e5', background: 'rgba(79,70,229,0.05)' } : {}}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div className={styles['sol-quiz-explanation']}>
                                        <p>
                                            <strong style={{ color: '#4f46e5' }}>Explanation: </strong>
                                            <MathRenderer text={activeQuiz.explanation} />
                                        </p>
                                    </div>
                                )}

                                <div className={styles['sol-quiz-nav']}>
                                    <button 
                                        onClick={nextQuiz} 
                                        disabled={!quizAnswered} 
                                        className={styles['sol-btn-filled']}
                                        style={{ padding: '14px 44px', fontSize: 16, background: quizAnswered ? '#4f46e5' : '#e2e8f0', color: quizAnswered ? '#fff' : '#94a3b8', cursor: quizAnswered ? 'pointer' : 'not-allowed', '--skill-color': '#4f46e5' }}
                                    >
                                        {quizIdx + 1 === VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={styles['sol-quiz-result']}>
                                <div className={styles['sol-quiz-result-emoji']}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 className={styles['sol-quiz-result-title']}>Great effort!</h2>
                                <p className={styles['sol-quiz-result-score']}>You scored <span>{quizTotalScore} / {VOCAB_QUIZ.length}</span></p>
                                <div className={styles['sol-quiz-result-actions']}>
                                    <button className={styles['sol-btn-outline']} onClick={resetQuiz} style={{ padding: '14px 32px' }}>Try Again</button>
                                    <button className={styles['sol-btn-filled']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/core-concepts')} style={{ padding: '14px 32px', '--skill-color': '#4f46e5' }}>Core Concepts →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                <div className={styles['sol-lexicon-footer']}>
                    <button className={styles['sol-btn-filled']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/core-concepts')} style={{ padding: '12px 32px', fontSize: 15, '--skill-color': '#4f46e5' }}>
                        I've mastered the language! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}
