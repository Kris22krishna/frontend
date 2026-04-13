import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../arithmetic.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { TERMS, FIVE_RULES, VOCAB_QUIZ } from './HCFTerminologyData';
import ArithmeticVocabularyVisualizer from '../../../ArithmeticVocabularyVisualizer';

export default function HCFTerminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    useEffect(() => window.scrollTo(0, 0), []);
    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const handleQuizSelect = (qId, optionIdx) => { if (showResults) return; setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx })); };
    const handleCheckAnswers = () => { if (Object.keys(quizAnswers).length < VOCAB_QUIZ.length) { alert("Please answer all questions first!"); return; } setShowResults(true); };
    const handleRetry = () => { setQuizAnswers({}); setShowResults(false); };
    const accentColor = '#e11d48';
    const accentBg = 'rgba(225, 29, 72, 0.1)';

    return (
        <div className={styles.arithPage}>
            <nav className={styles.introNav}>
                <button className={styles.arithBackBtn} onClick={() => navigate('/arithmetic/hcf')} style={{ marginBottom: 0 }}>← Back to Branch</button>
                <div className={styles.arithIntroNavLinks}>
                    <button className={styles.arithIntroNavLink} onClick={() => navigate('/arithmetic/hcf/introduction')}>🌟 Introduction</button>
                    <button className={`${styles.arithIntroNavLink} ${styles.arithIntroNavLinkActive}`}>📖 Terminology</button>
                    <button className={styles.arithIntroNavLink} onClick={() => navigate('/arithmetic/hcf/skills')}>🎯 Skills</button>
                </div>
            </nav>
            <div className={styles.arithTermContainer}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>HCF <span style={{ background: 'linear-gradient(135deg, #e11d48, #fb7185)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span></h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>{activeTab === 'quiz' ? 'Test your knowledge!' : `Select any ${activeTab === 'terms' ? 'term' : 'method'} below.`}</div>
                </div>
                <div className={styles.arithTabSwitcher}>
                    {[['terms', '📚 Terminology'], ['rules', '⚡ Methods'], ['quiz', '🧪 Vocab Check']].map(([key, label]) => (
                        <button key={key} style={{ padding: '8px 16px', borderRadius: 100, border: 'none', background: activeTab === key ? accentColor : '#e2e8f0', color: activeTab === key ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer' }} onClick={() => setActiveTab(key)}>{label}</button>
                    ))}
                </div>
                {activeTab !== 'quiz' ? (
                    <div className={styles.arithTermLayout}>
                        <aside className={styles.arithTermPanel} style={{ background: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 10, backdropFilter: 'blur(10px)' }}>
                            {(activeTab === 'terms' ? TERMS : FIVE_RULES).map((item, i) => {
                                const isActive = activeTab === 'terms' ? selectedIdx === i : selectedRuleIdx === i;
                                return (<button key={i} onClick={() => activeTab === 'terms' ? setSelectedIdx(i) : setSelectedRuleIdx(i)} style={{ background: isActive ? `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` : `linear-gradient(135deg, rgba(225,29,72,0.08), rgba(225,29,72,0.02))`, borderColor: isActive ? accentColor : 'rgba(225,29,72,0.15)', borderWidth: 1.5, borderStyle: 'solid', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, cursor: 'pointer', outline: 'none' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.25)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: isActive ? '#fff' : accentColor, fontWeight: 900 }}>{activeTab === 'terms' ? item.icon : i + 1}</div>
                                    <span style={{ fontWeight: 800, fontSize: 15, color: isActive ? '#fff' : '#1e293b', textAlign: 'left' }}>{activeTab === 'terms' ? item.word : item.name}</span>
                                </button>);
                            })}
                        </aside>
                        <main style={{ background: '#ffffff', borderRadius: 20, padding: '30px 40px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)', border: `2px solid ${accentBg}`, minHeight: 330 }}>
                            {activeTab === 'terms' ? (<>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}><div style={{ width: 44, height: 44, borderRadius: 12, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div><h2 style={{ fontFamily: '"Outfit", sans-serif', fontSize: 28, fontWeight: 900, color: accentColor, margin: 0 }}>{activeTerm.word}</h2></div>
                                    {activeTerm.visualType && (
                                        <div style={{ marginBottom: 24, padding: '20px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#94a3b8', marginBottom: 16, textAlign: 'center' }}>Live Representation</h4>
                                            <ArithmeticVocabularyVisualizer visualType={activeTerm.visualType} accentColor={accentColor} />
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: accentColor, marginBottom: 8 }}>Mathematical Context</h4>
                                            <div style={{ background: 'rgba(59,130,246,0.04)', padding: 14, borderRadius: 12, border: '1px solid rgba(59,130,246,0.1)' }}>
                                                <div style={{ fontSize: 16, color: '#1e293b', fontWeight: 600 }}>
                                                    <MathRenderer text={activeTerm.example} />
                                                </div>
                                            </div>
                                        </div>

                                        {activeTerm.realLifeExample && (
                                            <div>
                                                <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#10b981', marginBottom: 8 }}>Real World Application</h4>
                                                <div style={{ background: 'rgba(16,185,129,0.04)', padding: 14, borderRadius: 12, border: '1px solid rgba(16,185,129,0.15)' }}>
                                                    <div style={{ fontSize: 15, color: '#065f46', fontWeight: 500, lineHeight: 1.5 }}>
                                                        🌍 {activeTerm.realLifeExample}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: accentColor, fontWeight: 900 }}>⚡</div>
                                        <h2 style={{ fontFamily: '"Outfit", sans-serif', fontSize: 28, fontWeight: 900, color: accentColor, margin: 0 }}>{activeRule.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#334155', lineHeight: 1.6, margin: '0 0 24px' }}>{activeRule.desc}</p>
                                    <div><h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: accentColor, marginBottom: 10 }}>Formula View</h4>
                                        <div style={{ background: 'rgba(225,29,72,0.04)', padding: 20, borderRadius: 16, border: '1px solid rgba(225,29,72,0.1)', textAlign: 'center' }}><div style={{ fontSize: 18, fontWeight: 700, color: accentColor }}><MathRenderer text={`$$${activeRule.formula}$$`} /></div></div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className={styles.arithQuizPanel}>
                        <h2 style={{ textAlign: 'center', margin: '0 0 32px 0', color: '#0f172a' }}>Quick Knowledge Check</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            {VOCAB_QUIZ.map(q => (<div key={q.id}><div style={{ fontWeight: 600, color: '#1e293b', fontSize: 16, marginBottom: 16 }}>{q.q}</div><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{q.options.map((opt, optIdx) => { const isSelected = quizAnswers[q.id] === optIdx; const isCorrect = optIdx === q.correct; let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569'; if (showResults) { if (isCorrect) { bg = '#dcfce7'; border = '1px solid #22c55e'; color = '#15803d'; } else if (isSelected && !isCorrect) { bg = '#fee2e2'; border = '1px solid #ef4444'; color = '#b91c1c'; } } else if (isSelected) { bg = accentBg; border = `1px solid ${accentColor}`; color = accentColor; } return <button key={optIdx} onClick={() => handleQuizSelect(q.id, optIdx)} style={{ padding: '16px 20px', borderRadius: 12, background: bg, border, color, textAlign: 'left', fontSize: 15, cursor: showResults ? 'default' : 'pointer', transition: 'all 0.2s ease', fontWeight: isSelected ? 600 : 400 }}>{opt}{showResults && isCorrect && <span style={{ float: 'right' }}>✅</span>}{showResults && isSelected && !isCorrect && <span style={{ float: 'right' }}>❌</span>}</button>; })}</div></div>))}
                        </div>
                        <div style={{ marginTop: 40, textAlign: 'center', paddingTop: 32, borderTop: '1px solid #e2e8f0' }}>
                            {!showResults ? <button onClick={handleCheckAnswers} style={{ padding: '14px 32px', background: accentColor, color: '#fff', border: 'none', borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Check Answers</button> : (
                                <div><div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>You scored {Object.entries(quizAnswers).filter(([qId, ans]) => VOCAB_QUIZ.find(q => q.id === parseInt(qId)).correct === ans).length} out of {VOCAB_QUIZ.length}! 🎉</div>
                                <div className={styles.arithActionRow}><button onClick={handleRetry} style={{ padding: '12px 24px', background: '#fff', color: '#475569', border: '1.5px solid #e2e8f0', borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Try Again</button><button onClick={() => navigate('/arithmetic/hcf/skills')} style={{ padding: '12px 24px', background: accentColor, color: '#fff', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Go to Skills →</button></div></div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
