import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../InvestigativeScienceDashboard.module.css';
import { SCIENCE_TERMS, SCIENCE_REACTION_CASES, SCIENCE_VOCAB_QUIZ } from './ScienceTerminologyData';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { SLUG_TO_NODE_ID } from '@/lib/curriculumIds';

export default function ScienceTerminology() {
    const navigate = useNavigate();
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const nodeId = SLUG_TO_NODE_ID['g8-science-eis-terminology'];

    const sessionStartedRef = useRef(false);
    const isFinishedRef = useRef(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = SCIENCE_TERMS[selectedIdx];
    const activeCase = SCIENCE_REACTION_CASES[selectedCaseIdx];
    const activeQuiz = SCIENCE_VOCAB_QUIZ[quizIdx];

    useEffect(() => {
        if (activeTab === 'quiz' && !sessionStartedRef.current) {
            startSession({ nodeId, sessionType: 'practice' });
            sessionStartedRef.current = true;
        }
    }, [activeTab, nodeId, startSession]);

    useEffect(() => {
        return () => {
            if (sessionStartedRef.current && !isFinishedRef.current) {
                abandonSession({ totalQuestions: SCIENCE_VOCAB_QUIZ.length });
            }
        };
    }, [abandonSession]);

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizTotalScore(0);
        setQuizFinished(false);
        isFinishedRef.current = false;
        if (sessionStartedRef.current) {
            startSession({ nodeId, sessionType: 'practice' });
        }
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        const correct = optIdx === activeQuiz.correct;
        if (correct) setQuizTotalScore(s => s + 1);

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
        if (quizIdx + 1 < SCIENCE_VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
            isFinishedRef.current = true;
            finishSession({
                totalQuestions: SCIENCE_VOCAB_QUIZ.length,
                totalScore: quizTotalScore
            });
        }
    };

    const navLinks = [
        { path: '/senior/grade/8/science/investigative-science/introduction', label: '🌟 Intro' },
        { path: '/senior/grade/8/science/investigative-science/terminology', label: '📖 Terminology', active: true },
        { path: '/senior/grade/8/science/investigative-science/core-concepts', label: '🎯 Core Concepts' },
        { path: '/senior/grade/8/science/investigative-science/connectomics', label: '🔗 Connectomics' },
        { path: '/senior/grade/8/science/investigative-science/virtual-lab', label: '🧪 Virtual Lab' },

    ];

    return (
        <div className={styles['inv-page']}>
            <nav className={styles['inv-nav']}>
                <button className={styles['inv-nav-back']} onClick={() => navigate('/senior/grade/8/science/investigative-science')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['inv-nav-links']}>
                    {navLinks.map(l => (
                        <button key={l.path} className={`${styles['inv-nav-link']} ${l.active ? styles['active'] : ''}`} onClick={() => navigate(l.path)}>
                            {l.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className={styles['inv-lexicon-container']}>
                <div className={styles['inv-lexicon-heading']}>
                    <h1 className={styles['inv-lexicon-title']}>
                        Investigative Science <span className={styles['inv-lexicon-title-accent']}>Lexicon</span>
                    </h1>
                    <p className={styles['inv-lexicon-sub']}>
                        {activeTab === 'quiz' ? 'Test your vocabulary!' : `Explore ${activeTab === 'terms' ? '10 key scientific terms' : '5 investigation case studies'}.`}
                    </p>
                </div>

                <div className={styles['inv-subtabs']}>
                    <button className={`${styles['inv-nav-link']} ${activeTab === 'terms' ? styles['active'] : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`${styles['inv-nav-link']} ${activeTab === 'cases' ? styles['active'] : ''}`} onClick={() => setActiveTab('cases')}>🔬 Investigation Cases</button>
                    <button className={`${styles['inv-nav-link']} ${activeTab === 'quiz' ? styles['active'] : ''}`} onClick={() => setActiveTab('quiz')}>🎯 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className={styles['inv-lexicon-grid']}>
                        <aside className={styles['inv-selector-container']}>
                            {activeTab === 'terms' ? (
                                SCIENCE_TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`${styles['inv-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedIdx(i)}>
                                            <div className={styles['inv-term-mini-icon']} style={{ background: isActive ? 'rgba(255,255,255,0.2)' : `${term.color}15` }}>{term.icon}</div>
                                            <span className={styles['inv-term-mini-label']}>{term.name}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                SCIENCE_REACTION_CASES.map((c, i) => {
                                    const isActive = selectedCaseIdx === i;
                                    return (
                                        <button key={i} className={`${styles['inv-term-btn-mini']} ${isActive ? styles['active'] : ''}`} onClick={() => setSelectedCaseIdx(i)}>
                                            <div className={styles['inv-term-mini-icon']} style={{ background: isActive ? 'rgba(255,255,255,0.2)' : `${c.color}15` }}>{c.emoji}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className={styles['inv-term-mini-label']}>Case {c.num}</span>
                                                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{c.title}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className={styles['inv-details-window']} key={activeTab === 'terms' ? selectedIdx : selectedCaseIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div className={styles['inv-detail-header']}>
                                        <div className={styles['inv-detail-icon']} style={{ background: `${activeTerm.color}15` }}>{activeTerm.icon}</div>
                                        <h2 className={styles['inv-detail-title']} style={{ color: activeTerm.color }}>{activeTerm.name}</h2>
                                    </div>
                                    <p className={styles['inv-detail-body']}>{activeTerm.def}</p>
                                    <div className={styles['inv-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['inv-detail-sub-label']} style={{ color: activeTerm.color }}>Examples</h4>
                                            <div className={styles['inv-detail-examples-box']} style={{ background: `${activeTerm.color}05`, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <div key={j} className={styles['inv-detail-example-item']} style={{ border: `1px solid ${activeTerm.color}20` }}>{ex}</div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: 14, fontSize: 13, color: 'var(--inv-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                                                    {activeTerm.inUse}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['inv-detail-sub-label']} style={{ color: 'var(--inv-cyan)' }}>Quick Memory</h4>
                                            <div className={styles['inv-detail-hint-box']} style={{ background: 'rgba(14,116,144,0.05)', border: '1px solid rgba(14,116,144,0.1)' }}>
                                                <p className={styles['inv-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: 'var(--inv-cyan)' }}>💡 Pro-Hint: </span>
                                                    {activeTerm.memory}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles['inv-detail-header']}>
                                        <div className={styles['inv-detail-icon']} style={{ background: `${activeCase.color}15`, color: activeCase.color }}>{activeCase.emoji}</div>
                                        <h2 className={styles['inv-detail-title']} style={{ color: activeCase.color }}>Case {activeCase.num}: {activeCase.title}</h2>
                                    </div>
                                    <div style={{ background: `${activeCase.color}08`, padding: '20px 24px', borderRadius: 16, borderLeft: `6px solid ${activeCase.color}`, marginBottom: 24 }}>
                                        <p style={{ fontSize: 18, fontWeight: 700, color: activeCase.color, margin: 0 }}>{activeCase.rule}</p>
                                    </div>
                                    <p className={styles['inv-detail-body']}>{activeCase.detail}</p>
                                    <div className={styles['inv-responsive-grid-2']} style={{ gap: 24 }}>
                                        <div>
                                            <h4 className={styles['inv-detail-sub-label']} style={{ color: activeCase.color }}>Variables & Design</h4>
                                            <div className={styles['inv-detail-examples-box']} style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                    {activeCase.examples.map((ex, j) => (
                                                        <div key={j} className={styles['inv-detail-example-item']} style={{ border: '1px solid #e2e8f0', fontWeight: 600 }}>{ex}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['inv-detail-sub-label']} style={{ color: 'var(--inv-teal)' }}>Student Tip</h4>
                                            <div className={styles['inv-detail-hint-box']} style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.1)' }}>
                                                <p className={styles['inv-detail-hint-text']}>
                                                    <span style={{ fontWeight: 800, color: 'var(--inv-teal)' }}>🛡️ Tip: </span>
                                                    {activeCase.tip}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className={styles['inv-quiz-window']}>
                        {!quizFinished ? (
                            <>
                                <div className={styles['inv-quiz-header']}>
                                    <div>
                                        <div className={styles['inv-quiz-meta-label']}>Question {quizIdx + 1} of {SCIENCE_VOCAB_QUIZ.length}</div>
                                        <h3 className={styles['inv-quiz-title']}>Vocabulary Quiz</h3>
                                    </div>
                                    <div className={styles['inv-quiz-score-circle']}>{quizTotalScore}</div>
                                </div>
                                <div className={styles['inv-quiz-question']}>{activeQuiz.question}</div>
                                <div className={styles['inv-responsive-grid-2']} style={{ gap: 12, marginBottom: 24 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let cls = styles['inv-quiz-option'];
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) cls += ' ' + styles['correct'];
                                            else if (oi === quizSelected) cls += ' ' + styles['wrong'];
                                        }
                                        return <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered} className={cls}>{opt}</button>;
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div className={styles['inv-quiz-explanation']}>
                                        <p><strong style={{ color: 'var(--inv-cyan)' }}>Explanation: </strong>{activeQuiz.explanation}</p>
                                    </div>
                                )}
                                <div className={styles['inv-quiz-nav']}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered} className={styles['inv-btn-filled']}
                                        style={{ '--skill-color': 'var(--inv-cyan)', opacity: quizAnswered ? 1 : 0.4, cursor: quizAnswered ? 'pointer' : 'not-allowed' }}>
                                        {quizIdx + 1 === SCIENCE_VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={styles['inv-quiz-result']}>
                                <div className={styles['inv-quiz-result-emoji']}>{quizTotalScore >= 4 ? '🏆' : '💪'}</div>
                                <h2 className={styles['inv-quiz-result-title']}>Great effort!</h2>
                                <p className={styles['inv-quiz-result-score']}>You scored <span>{quizTotalScore} / {SCIENCE_VOCAB_QUIZ.length}</span></p>
                                <div className={styles['inv-quiz-result-actions']}>
                                    <button className={styles['inv-btn-outline']} onClick={resetQuiz}>Try Again</button>
                                    <button className={styles['inv-btn-filled']} onClick={() => navigate('/senior/grade/8/science/investigative-science/core-concepts')} style={{ '--skill-color': 'var(--inv-cyan)' }}>
                                        Core Concepts →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className={styles['inv-lexicon-footer']}>
                    <button className={styles['inv-btn-filled']} onClick={() => navigate('/senior/grade/8/science/investigative-science/core-concepts')} style={{ '--skill-color': 'var(--inv-cyan)' }}>
                        I've mastered the vocabulary! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}
