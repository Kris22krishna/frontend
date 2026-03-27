import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../MatterInOurSurroundingsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { MATTER_TERMS, STATE_CHANGES, TERMINOLOGY_QUIZ } from './MatterTerminologyData';
import { BookOpen, Activity, Award, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export default function MatterTerminology() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Tabs state
    const [activeTab, setActiveTab] = useState('terms');

    // Selection state for Master-Detail
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedChangeIdx, setSelectedChangeIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = MATTER_TERMS[selectedIdx];
    const activeChange = STATE_CHANGES[selectedChangeIdx];
    const activeQuiz = TERMINOLOGY_QUIZ[quizIdx];

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
        if (quizIdx + 1 < TERMINOLOGY_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className={styles['matter-page']}>
            <nav className={styles['matter-nav']}>
                <button className={styles['matter-nav-back']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['matter-nav-links']}>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/introduction')}>🌟 Intro</button>
                    <button className={`${styles['matter-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/terminology')}>📖 Terminology</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['matter-lexicon-container']}>
                {/* Heading */}
                <div className={styles['matter-lexicon-heading']}>
                    <h1 className={styles['matter-lexicon-title']}>
                        Matter <span style={{ color: '#0ea5e9' }}>Lexicon</span>
                    </h1>
                    <p className={styles['matter-lexicon-sub']}>
                        Master the language of physical science. Explore key terms, state changes, and test your knowledge.
                    </p>
                </div>

                {/* Sub Tabs */}
                <div className={styles['matter-nav-links']} style={{ justifyContent: 'center', marginBottom: '32px' }}>
                    <button className={`${styles['matter-nav-link']} ${activeTab === 'terms' ? styles['active'] : ''}`} onClick={() => setActiveTab('terms')}>📚 Key Terms</button>
                    <button className={`${styles['matter-nav-link']} ${activeTab === 'changes' ? styles['active'] : ''}`} onClick={() => setActiveTab('changes')}>🔄 State Changes</button>
                    <button className={`${styles['matter-nav-link']} ${activeTab === 'quiz' ? styles['active'] : ''}`} onClick={() => setActiveTab('quiz')}>🎯 Quiz Time</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className={styles['matter-lexicon-grid']}>
                        <aside className={styles['matter-selector-container']}>
                            {activeTab === 'terms' ? (
                                MATTER_TERMS.map((term, i) => (
                                    <button 
                                        key={i} 
                                        className={`${styles['matter-term-btn-mini']} ${selectedIdx === i ? styles['active'] : ''}`} 
                                        onClick={() => setSelectedIdx(i)}
                                    >
                                        <div className={styles['matter-term-mini-icon']} style={{ background: selectedIdx === i ? '#fff' : `${term.color}15` }}>{term.icon}</div>
                                        <span className={styles['matter-term-mini-label']}><MathRenderer text={term.name} /></span>
                                    </button>
                                ))
                            ) : (
                                STATE_CHANGES.map((change, i) => (
                                    <button 
                                        key={i} 
                                        className={`${styles['matter-term-btn-mini']} ${selectedChangeIdx === i ? styles['active'] : ''}`} 
                                        onClick={() => setSelectedChangeIdx(i)}
                                    >
                                        <div className={styles['matter-term-mini-icon']} style={{ background: selectedChangeIdx === i ? '#fff' : `${change.color}15`, color: selectedChangeIdx === i ? change.color : 'inherit' }}>{change.emoji}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span className={styles['matter-term-mini-label']}>{change.title}</span>
                                            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{change.rule}</span>
                                        </div>
                                    </button>
                                ))
                            )}
                        </aside>

                        <main className={styles['matter-details-window']} key={activeTab === 'terms' ? selectedIdx : selectedChangeIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div className={styles['matter-detail-header']}>
                                        <div className={styles['matter-detail-icon']} style={{ background: `${activeTerm.color}15` }}>{activeTerm.icon}</div>
                                        <h2 className={styles['matter-detail-title']} style={{ color: activeTerm.color }}>{activeTerm.name}</h2>
                                    </div>
                                    <p className={styles['matter-detail-body']}>
                                        <MathRenderer text={activeTerm.def} />
                                    </p>
                                    <div className={styles['matter-responsive-grid-2']} style={{ gap: '24px' }}>
                                        <div>
                                            <h4 className={styles['matter-detail-sub-label']} style={{ color: activeTerm.color }}>Examples</h4>
                                            <div style={{ background: `${activeTerm.color}05`, border: `1px solid ${activeTerm.color}15`, padding: '20px', borderRadius: '16px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    {activeTerm.examples.map((ex, j) => (
                                                        <div key={j} style={{ background: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '15px', border: `1px solid ${activeTerm.color}20` }}>
                                                            <MathRenderer text={ex} />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div style={{ marginTop: '14px', fontSize: '13px', color: '#64748b', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                                                    <MathRenderer text={activeTerm.inUse} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['matter-detail-sub-label']} style={{ color: '#4f46e5' }}>Quick Memory</h4>
                                            <div style={{ background: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.1)', padding: '20px', borderRadius: '16px' }}>
                                                <p style={{ margin: 0, fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                                                    <span style={{ fontWeight: 800, color: '#4f46e5' }}>💡 Pro-Hint: </span>
                                                    <MathRenderer text={activeTerm.memory} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles['matter-detail-header']}>
                                        <div className={styles['matter-detail-icon']} style={{ background: `${activeChange.color}15`, color: activeChange.color }}>{activeChange.emoji}</div>
                                        <h2 className={styles['matter-detail-title']} style={{ color: activeChange.color }}><MathRenderer text={activeChange.title} /></h2>
                                    </div>
                                    <div style={{ background: `${activeChange.color}08`, padding: '20px 24px', borderRadius: '16px', borderLeft: `6px solid ${activeChange.color}`, marginBottom: '24px' }}>
                                        <p style={{ fontSize: '19px', fontWeight: 700, color: activeChange.color, margin: 0 }}>
                                            <MathRenderer text={activeChange.rule} />
                                        </p>
                                    </div>
                                    <p className={styles['matter-detail-body']}>
                                        <MathRenderer text={activeChange.detail} />
                                    </p>
                                    <div className={styles['matter-responsive-grid-2']} style={{ gap: '24px' }}>
                                        <div>
                                            <h4 className={styles['matter-detail-sub-label']} style={{ color: activeChange.color }}>Key Example</h4>
                                            <div style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.05)', padding: '20px', borderRadius: '16px' }}>
                                                {activeChange.examples.map((ex, j) => (
                                                    <div key={j} style={{ background: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '15px', border: '1px solid #e2e8f0', fontWeight: 600 }}>
                                                        <MathRenderer text={ex} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={styles['matter-detail-sub-label']} style={{ color: '#0d9488' }}>Student Tip</h4>
                                            <div style={{ background: 'rgba(13, 148, 136, 0.05)', border: '1px solid rgba(13, 148, 136, 0.1)', padding: '20px', borderRadius: '16px' }}>
                                                <p style={{ margin: 0, fontSize: '16px', color: '#64748b', lineHeight: '1.6' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Hint: </span>
                                                    <MathRenderer text={activeChange.tip} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className={styles['matter-quiz-window']}>
                        {!quizFinished ? (
                            <>
                                <div className={styles['matter-quiz-header']}>
                                    <div>
                                        <div className={styles['matter-quiz-meta-label']}>Question {quizIdx + 1} of {TERMINOLOGY_QUIZ.length}</div>
                                        <h3 className={styles['matter-quiz-title']}>Quiz Mode</h3>
                                    </div>
                                    <div className={styles['matter-quiz-score-circle']}>{quizTotalScore}</div>
                                </div>

                                <div className={styles['matter-quiz-question']}>
                                    <MathRenderer text={activeQuiz.question} />
                                </div>

                                <div className={styles['matter-responsive-grid-2']} style={{ gap: '16px', marginBottom: '32px' }}>
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
                                                className={`${styles['matter-quiz-option']} ${statusClass}`}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div className={styles['matter-quiz-explanation']}>
                                        <p>
                                            <strong style={{ color: '#4f46e5' }}>Explanation: </strong>
                                            <MathRenderer text={activeQuiz.explanation} />
                                        </p>
                                    </div>
                                )}

                                <div className={styles['matter-quiz-nav']}>
                                    <button 
                                        onClick={nextQuiz} 
                                        disabled={!quizAnswered} 
                                        className={styles['matter-btn-filled']}
                                        style={{ padding: '14px 44px', fontSize: 16, background: quizAnswered ? '#0ea5e9' : '#e2e8f0', cursor: quizAnswered ? 'pointer' : 'not-allowed' }}
                                    >
                                        {quizIdx + 1 === TERMINOLOGY_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={{ fontSize: '72px', marginBottom: '20px' }}>🏆</div>
                                <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '12px', color: '#0f172a' }}>Great effort!</h2>
                                <p style={{ color: '#64748b', fontSize: '20px', marginBottom: '40px' }}>You scored <span style={{ color: '#0ea5e9', fontWeight: 900 }}>{quizTotalScore} / {TERMINOLOGY_QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                    <button className={styles['matter-btn-outline']} onClick={resetQuiz} style={{ padding: '14px 32px' }}>Try Again</button>
                                    <button className={styles['matter-btn-filled']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/core-concepts')} style={{ padding: '14px 32px', background: '#0ea5e9' }}>Core Concepts →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
