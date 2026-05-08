import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TERMS, FIVE_RULES, VOCAB_QUIZ } from './MSLTerminologyData';
import MathRenderer from '../../../../MathRenderer';
import MSLNav from '../../MSLNav';
import styles from '../../msl.module.css';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

const BASE = '/senior/grade/11/physics/motion-in-a-straight-line';

export default function MSLTerminology() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const quizStarted = useRef(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'quiz' && !quizStarted.current && NODE_IDS.g11PhysMSLTerminologyQuiz) {
            startSession({ nodeId: NODE_IDS.g11PhysMSLTerminologyQuiz, sessionType: 'practice' });
            quizStarted.current = true;
            answersPayload.current = [];
        }
    };

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQ = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false);
        setQuizScore(0); setQuizFinished(false); quizStarted.current = false;
    };

    const handleQuizSelect = async (i) => {
        if (quizAnswered) return;
        setQuizSelected(i);
        setQuizAnswered(true);
        const correct = i === activeQ.correct;
        if (correct) setQuizScore(s => s + 1);
        const d = { question_index: quizIdx + 1, answer_json: { selected: i, text: activeQ.options[i] }, is_correct: correct ? 1.0 : 0.0, marks_awarded: correct ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
        answersPayload.current.push(d);
        await logAnswer({ questionIndex: d.question_index, answerJson: d.answer_json, isCorrect: d.is_correct });
    };

    const nextQuiz = async () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1); setQuizSelected(null); setQuizAnswered(false);
        } else {
            setQuizFinished(true);
            await finishSession({ totalQuestions: VOCAB_QUIZ.length, questionsAnswered: answersPayload.current.length, answersPayload: answersPayload.current });
        }
    };

    const subTabs = [
        { id: 'terms', label: '📚 Key Terms' },
        { id: 'rules', label: '📏 5 Golden Rules' },
        { id: 'quiz',  label: '🧪 Quiz Time' },
    ];

    return (
        <div className={styles['msl-page']}>
            <MSLNav activeTab="terminology" />

            <div className={styles['msl-hero']}>
                <h1 className={styles['msl-hero-title']}>
                    Kinematics <span className={styles['msl-hero-accent']}>Lexicon</span>
                </h1>
                <p className={styles['msl-hero-sub']}>
                    {activeTab === 'quiz' ? 'Test your vocabulary and golden rules!' :
                     activeTab === 'terms' ? '9 essential terms, defined precisely.' :
                     '5 golden rules that govern rectilinear motion.'}
                </p>
            </div>

            <div className={styles['msl-lexicon-container']}>
                {/* Sub-tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap', paddingTop: 8 }}>
                    {subTabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => handleTabChange(t.id)}
                            className={`${styles['msl-nav-link']}${activeTab === t.id ? ` ${styles['msl-nav-link--active']}` : ''}`}
                            style={{ fontSize: 14, padding: '8px 18px' }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {activeTab !== 'quiz' ? (
                    /* ── MASTER-DETAIL ── */
                    <div className={styles['msl-lexicon-grid']}>
                        <aside className={styles['msl-selector-container']}>
                            <div className={styles['msl-sidebar-label']}>
                                {activeTab === 'terms' ? 'Key Terms' : 'Rules'}
                            </div>
                            {activeTab === 'terms'
                                ? TERMS.map((term, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedIdx(i)}
                                        className={`${styles['msl-term-btn']}${selectedIdx === i ? ` ${styles['msl-term-btn--active']}` : ''}`}
                                        style={{ '--msl-skill-color': term.color }}
                                    >
                                        <span style={{ fontSize: 20 }}>{term.icon}</span>
                                        <span style={{ fontWeight: 700, fontSize: 14, color: selectedIdx === i ? '#fff' : '#1e293b' }}>{term.name}</span>
                                    </button>
                                ))
                                : FIVE_RULES.map((rule, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedRuleIdx(i)}
                                        className={`${styles['msl-term-btn']}${selectedRuleIdx === i ? ` ${styles['msl-term-btn--active']}` : ''}`}
                                        style={{ '--msl-skill-color': rule.color }}
                                    >
                                        <span style={{ fontSize: 18 }}>{rule.emoji}</span>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 13, color: selectedRuleIdx === i ? '#fff' : '#1e293b' }}>Rule {rule.num}</div>
                                            <div style={{ fontSize: 11, opacity: 0.7, color: selectedRuleIdx === i ? '#fff' : '#475569' }}>{rule.title}</div>
                                        </div>
                                    </button>
                                ))
                            }
                        </aside>

                        <main className={styles['msl-details-window']}
                              key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#1e293b', lineHeight: 1.7, margin: '0 0 22px' }}>
                                        <MathRenderer text={activeTerm.def} />
                                    </p>
                                    {activeTerm.graphSvg && (
                                        <div dangerouslySetInnerHTML={{ __html: activeTerm.graphSvg }} />
                                    )}
                                    <div className={styles['msl-rule-split']}>
                                        <div>
                                            <div style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeTerm.color, marginBottom: 10, fontWeight: 800 }}>Examples</div>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 16, borderRadius: 14, border: `1px solid ${activeTerm.color}15` }}>
                                                {activeTerm.examples.map((ex, j) => (
                                                    <div key={j} style={{ background: '#fff', border: `1px solid ${activeTerm.color}20`, padding: '8px 12px', borderRadius: 8, fontSize: 14, marginBottom: j < activeTerm.examples.length - 1 ? 8 : 0 }}>
                                                        <MathRenderer text={ex} />
                                                    </div>
                                                ))}
                                                {activeTerm.inUse && (
                                                    <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 10 }}>
                                                        <MathRenderer text={activeTerm.inUse} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: '#0d9488', marginBottom: 10, fontWeight: 800 }}>Quick Memory</div>
                                            <div style={{ background: 'rgba(13,148,136,0.05)', padding: 16, borderRadius: 14, border: '1px solid rgba(13,148,136,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                                                    <strong style={{ color: '#0d9488' }}>💡 </strong>
                                                    <MathRenderer text={activeTerm.memory} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{activeRule.emoji}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, color: activeRule.color, margin: 0 }}>
                                            Rule {activeRule.num}: <MathRenderer text={activeRule.title} />
                                        </h2>
                                    </div>
                                    <div style={{ background: `${activeRule.color}08`, padding: '16px 20px', borderRadius: 14, borderLeft: `6px solid ${activeRule.color}`, marginBottom: 20 }}>
                                        <p style={{ fontSize: 18, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                            <MathRenderer text={activeRule.rule} />
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 16, color: '#334155', lineHeight: 1.7, margin: '0 0 20px' }}>
                                        <MathRenderer text={activeRule.detail} />
                                    </p>
                                    {activeRule.graphSvg && (
                                        <div dangerouslySetInnerHTML={{ __html: activeRule.graphSvg }} />
                                    )}
                                    <div className={styles['msl-rule-split']}>
                                        <div>
                                            <div style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeRule.color, marginBottom: 10, fontWeight: 800 }}>Examples</div>
                                            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0' }}>
                                                {activeRule.examples.map((ex, j) => (
                                                    <div key={j} style={{ background: '#fff', padding: '8px 12px', borderRadius: 8, fontSize: 14, fontWeight: 600, border: '1px solid #e2e8f0', marginBottom: j < activeRule.examples.length - 1 ? 8 : 0 }}>
                                                        <MathRenderer text={ex} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: '#0d9488', marginBottom: 10, fontWeight: 800 }}>Survival Tip</div>
                                            <div style={{ background: 'rgba(13,148,136,0.05)', padding: 16, borderRadius: 14, border: '1px solid rgba(13,148,136,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                                                    <strong style={{ color: '#0d9488' }}>🛡️ </strong>
                                                    <MathRenderer text={activeRule.tip} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    /* ── QUIZ ── */
                    <div className={styles['msl-details-window']} style={{ maxWidth: 780, margin: '0 auto' }}>
                        {!quizFinished ? (
                            <>
                                <div className={styles['msl-quiz-header']}>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: 2 }}>
                                            Question {quizIdx + 1} of {VOCAB_QUIZ.length}
                                        </div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '4px 0 0' }}>Vocabulary Quiz</h3>
                                    </div>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#0d9488', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#0d9488' }}>
                                        {quizScore}
                                    </div>
                                </div>

                                <div className={styles['msl-progress-bar-wrap']}>
                                    <div className={styles['msl-progress-bar']} style={{ width: `${((quizIdx) / VOCAB_QUIZ.length) * 100}%`, background: '#0d9488' }} />
                                </div>

                                <div style={{ fontSize: 17, fontWeight: 600, color: '#1e293b', lineHeight: 1.55, marginBottom: 24 }}>
                                    <MathRenderer text={activeQ.question} />
                                </div>

                                <div className={styles['msl-quiz-options']}>
                                    {activeQ.options.map((opt, oi) => {
                                        let border = 'rgba(0,0,0,0.07)';
                                        let bg = '#fff';
                                        let clr = '#1e293b';
                                        if (quizAnswered) {
                                            if (oi === activeQ.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; clr = '#059669'; }
                                            else if (oi === quizSelected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; clr = '#ef4444'; }
                                        } else if (quizSelected === oi) {
                                            border = '#0d9488'; bg = 'rgba(13,148,136,0.05)'; clr = '#0d9488';
                                        }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered}
                                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2.5px solid ${border}`, background: bg, cursor: quizAnswered ? 'default' : 'pointer', fontSize: 14, color: clr, textAlign: 'left', transition: 'all 0.2s', fontWeight: quizSelected === oi ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: border, flexShrink: 0 }} />
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>

                                {quizAnswered && (
                                    <div style={{ marginTop: 18, padding: '14px 18px', borderRadius: 12, background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)' }}>
                                        <strong style={{ color: '#0d9488' }}>Explanation: </strong>
                                        <MathRenderer text={activeQ.explanation} />
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered} className={styles['msl-btn-primary']}
                                        style={{ opacity: quizAnswered ? 1 : 0.5, cursor: quizAnswered ? 'pointer' : 'not-allowed' }}>
                                        {quizIdx + 1 === VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={{ fontSize: 64, marginBottom: 16 }}>{quizScore >= 5 ? '🏆' : quizScore >= 3 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 30, fontWeight: 900, marginBottom: 8, color: '#1e293b' }}>
                                    {quizScore >= 5 ? 'Brilliant!' : quizScore >= 3 ? 'Great effort!' : 'Keep going!'}
                                </h2>
                                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>
                                    Score: <span style={{ color: '#0d9488', fontWeight: 900 }}>{quizScore} / {VOCAB_QUIZ.length}</span>
                                </p>
                                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <button className={styles['msl-btn-secondary']} onClick={resetQuiz}>Try Again</button>
                                    <button className={styles['msl-btn-primary']} onClick={() => navigate(`${BASE}/skills`)}>Practical Skills →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer CTA */}
                {activeTab !== 'quiz' && (
                    <div style={{ marginTop: 32, textAlign: 'center' }}>
                        <button className={styles['msl-btn-primary']} onClick={() => navigate(`${BASE}/skills`)}>
                            I've mastered the language! 🎯
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
