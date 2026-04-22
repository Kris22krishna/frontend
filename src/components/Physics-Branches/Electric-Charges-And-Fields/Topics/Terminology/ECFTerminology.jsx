import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ECFTerminologyData,
    ECF_RULES,
    ECF_VOCAB_QUIZ,
} from './ECFTerminologyData';
import MathRenderer from '../../../../MathRenderer';
import ECFNav from '../../ECFNav';
import styles from '../../ecf.module.css';

const BASE = '/senior/grade/12/physics/electric-charges-and-fields';

export default function ECFTerminology() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const activeTerm = ECFTerminologyData[selectedIdx];
    const activeRule = ECF_RULES[selectedRuleIdx];
    const activeQ = ECF_VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizAnswered(false);
        setQuizScore(0);
        setQuizFinished(false);
    };

    const handleQuizSelect = (i) => {
        if (quizAnswered) return;
        setQuizSelected(i);
        setQuizAnswered(true);
        if (i === activeQ.correct) setQuizScore(s => s + 1);
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < ECF_VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    const subTabs = [
        { id: 'terms', label: '📚 Key Terms' },
        { id: 'rules', label: '📏 5 Golden Rules' },
        { id: 'quiz',  label: '🧪 Quiz Time' },
    ];

    return (
        <div className={styles['ecf-page']}>
            <ECFNav activeTab="terminology" />

            <div className={styles['ecf-hero']}>
                <h1 className={styles['ecf-hero-title']}>
                    Electrostatics <span className={styles['ecf-hero-accent']}>Lexicon</span>
                </h1>
                <p className={styles['ecf-hero-sub']}>
                    {activeTab === 'quiz' ? 'Test your vocabulary and rule clarity.' :
                     activeTab === 'terms' ? 'Core terms and formulas for Electric Charges & Fields.' :
                     'Five rules that prevent most electrostatics mistakes.'}
                </p>
            </div>

            <div className={styles['ecf-lexicon-container']}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 28, flexWrap: 'wrap', paddingTop: 8 }}>
                    {subTabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`${styles['ecf-nav-link']}${activeTab === t.id ? ` ${styles['ecf-nav-link--active']}` : ''}`}
                            style={{ fontSize: 14, padding: '8px 18px' }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {activeTab !== 'quiz' ? (
                    <div className={styles['ecf-lexicon-grid']}>
                        <aside className={styles['ecf-selector-container']}>
                            <div className={styles['ecf-sidebar-label']}>
                                {activeTab === 'terms' ? 'Key Terms' : 'Rules'}
                            </div>
                            {activeTab === 'terms'
                                ? ECFTerminologyData.map((term, i) => (
                                    <button
                                        key={term.id}
                                        onClick={() => setSelectedIdx(i)}
                                        className={`${styles['ecf-term-btn']}${selectedIdx === i ? ` ${styles['ecf-term-btn--active']}` : ''}`}
                                        style={{ '--ecf-skill-color': term.color }}
                                    >
                                        <span style={{ fontSize: 20 }}>{term.icon}</span>
                                        <span style={{ fontWeight: 700, fontSize: 14, color: selectedIdx === i ? '#fff' : '#1e293b' }}>{term.term}</span>
                                    </button>
                                ))
                                : ECF_RULES.map((rule, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedRuleIdx(i)}
                                        className={`${styles['ecf-term-btn']}${selectedRuleIdx === i ? ` ${styles['ecf-term-btn--active']}` : ''}`}
                                        style={{ '--ecf-skill-color': rule.color }}
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

                        <main className={styles['ecf-details-window']}
                              key={activeTab === 'terms' ? selectedIdx : selectedRuleIdx}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.term}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#1e293b', lineHeight: 1.7, margin: '0 0 22px' }}>
                                        <MathRenderer text={activeTerm.definition} />
                                    </p>
                                    <div className={styles['ecf-rule-split']}>
                                        <div>
                                            <div style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: activeTerm.color, marginBottom: 10, fontWeight: 800 }}>Formula</div>
                                            <div style={{ background: `${activeTerm.color}05`, padding: 16, borderRadius: 14, border: `1px solid ${activeTerm.color}15` }}>
                                                <div style={{ fontWeight: 800, color: activeTerm.color, fontSize: 18, marginBottom: 10 }}>
                                                    <MathRenderer text={activeTerm.formula} />
                                                </div>
                                                <div style={{ fontSize: 13, color: '#64748b' }}>{activeTerm.formulaNote}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: '#4a2c8a', marginBottom: 10, fontWeight: 800 }}>Worked Example</div>
                                            <div style={{ background: 'rgba(74,44,138,0.05)', padding: 16, borderRadius: 14, border: '1px solid rgba(74,44,138,0.12)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                                                    <MathRenderer text={activeTerm.example} />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['ecf-tip-box']}>
                                        <strong style={{ color: '#92400e' }}>📌 NEET Tip: </strong>
                                        <span style={{ color: '#92400e' }}>{activeTerm.neetTip}</span>
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
                                    <div className={styles['ecf-rule-split']}>
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
                                            <div style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.5, color: '#4a2c8a', marginBottom: 10, fontWeight: 800 }}>Exam Tip</div>
                                            <div style={{ background: 'rgba(74,44,138,0.05)', padding: 16, borderRadius: 14, border: '1px solid rgba(74,44,138,0.12)' }}>
                                                <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>
                                                    <strong style={{ color: '#4a2c8a' }}>🛡️ </strong>
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
                    <div className={styles['ecf-details-window']} style={{ maxWidth: 780, margin: '0 auto' }}>
                        {!quizFinished ? (
                            <>
                                <div className={styles['ecf-quiz-header']}>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#4a2c8a', textTransform: 'uppercase', letterSpacing: 2 }}>
                                            Question {quizIdx + 1} of {ECF_VOCAB_QUIZ.length}
                                        </div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#1e293b', margin: '4px 0 0' }}>Terminology Quiz</h3>
                                    </div>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#4a2c8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#4a2c8a' }}>
                                        {quizScore}
                                    </div>
                                </div>

                                <div className={styles['ecf-progress-bar-wrap']}>
                                    <div className={styles['ecf-progress-bar']} style={{ width: `${((quizIdx) / ECF_VOCAB_QUIZ.length) * 100}%`, background: '#4a2c8a' }} />
                                </div>

                                <div style={{ fontSize: 17, fontWeight: 600, color: '#1e293b', lineHeight: 1.55, marginBottom: 24 }}>
                                    <MathRenderer text={activeQ.question} />
                                </div>

                                <div className={styles['ecf-quiz-options']}>
                                    {activeQ.options.map((opt, oi) => {
                                        let border = 'rgba(0,0,0,0.07)';
                                        let bg = '#fff';
                                        let clr = '#1e293b';
                                        if (quizAnswered) {
                                            if (oi === activeQ.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; clr = '#059669'; }
                                            else if (oi === quizSelected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; clr = '#ef4444'; }
                                        } else if (quizSelected === oi) {
                                            border = '#4a2c8a'; bg = 'rgba(74,44,138,0.05)'; clr = '#4a2c8a';
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
                                    <div style={{ marginTop: 18, padding: '14px 18px', borderRadius: 12, background: 'rgba(74,44,138,0.05)', border: '1px solid rgba(74,44,138,0.15)' }}>
                                        <strong style={{ color: '#4a2c8a' }}>Explanation: </strong>
                                        <MathRenderer text={activeQ.explanation} />
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered} className={styles['ecf-btn-primary']}
                                        style={{ opacity: quizAnswered ? 1 : 0.5, cursor: quizAnswered ? 'pointer' : 'not-allowed' }}>
                                        {quizIdx + 1 === ECF_VOCAB_QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
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
                                    Score: <span style={{ color: '#4a2c8a', fontWeight: 900 }}>{quizScore} / {ECF_VOCAB_QUIZ.length}</span>
                                </p>
                                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <button className={styles['ecf-btn-secondary']} onClick={resetQuiz}>Try Again</button>
                                    <button className={styles['ecf-btn-primary']} onClick={() => navigate(`${BASE}/skills`)}>Practical Skills →</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab !== 'quiz' && (
                    <div style={{ marginTop: 32, textAlign: 'center' }}>
                        <button className={styles['ecf-btn-primary']} onClick={() => navigate(`${BASE}/skills`)}>
                            I&apos;ve mastered the language! 🎯
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
