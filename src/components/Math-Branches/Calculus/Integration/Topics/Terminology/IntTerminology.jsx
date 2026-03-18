import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../calculus.css';
import MathRenderer from '../../../../../MathRenderer';
import { TERMS, FIVE_RULES, VOCAB_QUIZ } from './IntTerminologyData';

export default function IntTerminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];

    const handleQuizSelect = (qId, optionIdx) => {
        if (showResults) return;
        setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    };

    const handleCheckAnswers = () => {
        if (Object.keys(quizAnswers).length < VOCAB_QUIZ.length) {
            alert("Please answer all questions first!");
            return;
        }
        setShowResults(true);
    };

    const handleRetry = () => {
        setQuizAnswers({});
        setShowResults(false);
    };

    const accent = '#d946ef';

    return (
        <div className="calc-page">
            <style>{`
                .calc-detail-anim {
                    animation: calcSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                @keyframes calcSlideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .calc-term-btn {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 14px; border-radius: 12px;
                    border: 1.5px solid rgba(0,0,0,0.06);
                    cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: left; font-family: 'Outfit', sans-serif;
                    position: relative; overflow: hidden; background: #fff;
                }
                .calc-term-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(0,0,0,0.08); }
                .calc-term-btn.active { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); z-index: 2; }
                @media (max-width: 1024px) {
                    .calc-lexicon-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <nav className="intro-nav">
                <button className="calc-back-btn" onClick={() => navigate('/calculus/integration')} style={{ marginBottom: 0 }}>← Back to Integration</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/calculus/integration/introduction')}>🌟 Introduction</button>
                    <button className="intro-nav-link intro-nav-link--active">📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/calculus/integration/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="calc-lexicon-container" style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--calc-text)', margin: '0 0 8px' }}>
                        Integration <span style={{ background: 'linear-gradient(135deg, var(--calc-fuchsia), var(--calc-violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--calc-muted)', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge with interactive questions!' : `Select any ${activeTab === 'terms' ? 'term' : 'rule'} below to explore details.`}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <button className={`calc-term-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`calc-term-tab ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>⚡ Crucial Rules</button>
                    <button className={`calc-term-tab ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Vocab Check</button>
                </div>

                {activeTab !== 'quiz' ? (
                    <div className="calc-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 360px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside style={{
                            background: 'rgba(255,255,255,0.7)', padding: '14px', borderRadius: 20,
                            border: '1px solid rgba(0,0,0,0.05)', display: 'grid',
                            gridTemplateColumns: activeTab === 'terms' ? '1fr 1fr' : '1fr', gap: 10,
                            backdropFilter: 'blur(10px)'
                        }}>
                            {activeTab === 'terms' ? (
                                TERMS.map((term, i) => {
                                    const isActive = selectedIdx === i;
                                    return (
                                        <button key={i} className={`calc-term-btn ${isActive ? 'active' : ''}`}
                                            onClick={() => setSelectedIdx(i)}
                                            style={{
                                                background: isActive ? `linear-gradient(135deg, ${accent}, ${accent}dd)` : `linear-gradient(135deg, ${accent}10, ${accent}05)`,
                                                borderColor: isActive ? accent : `${accent}20`,
                                                gridColumn: (TERMS.length % 2 !== 0 && i === TERMS.length - 1) ? 'span 2' : 'span 1',
                                                justifyContent: (TERMS.length % 2 !== 0 && i === TERMS.length - 1) ? 'center' : 'flex-start'
                                            }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.25)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: isActive ? 'none' : '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>{term.icon}</div>
                                            <span style={{ fontWeight: 800, fontSize: 14, color: isActive ? '#fff' : 'var(--calc-text)' }}>{term.word}</span>
                                        </button>
                                    );
                                })
                            ) : (
                                FIVE_RULES.map((rule, i) => {
                                    const isActive = selectedRuleIdx === i;
                                    return (
                                        <button key={i} className={`calc-term-btn ${isActive ? 'active' : ''}`}
                                            onClick={() => setSelectedRuleIdx(i)}
                                            style={{
                                                background: isActive ? `linear-gradient(135deg, ${accent}, ${accent}dd)` : `linear-gradient(135deg, ${accent}10, ${accent}05)`,
                                                borderColor: isActive ? accent : `${accent}20`,
                                                padding: '12px 16px'
                                            }}
                                        >
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.25)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: isActive ? '#fff' : accent, fontWeight: 900 }}>{i + 1}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? '#fff' : 'var(--calc-text)', lineHeight: 1 }}>Rule {i + 1}</span>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--calc-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{rule.name}</span>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </aside>

                        <main className="calc-detail-anim" key={activeTab === 'terms' ? selectedIdx : `r${selectedRuleIdx}`} style={{
                            background: '#ffffff', borderRadius: 20, padding: '20px 28px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${accent}10`, minHeight: 330
                        }}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: accent, margin: 0 }}>{activeTerm.word}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--calc-text)', lineHeight: 1.6, margin: '0 0 24px' }}>{activeTerm.def}</p>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: accent, marginBottom: 10 }}>Example</h4>
                                        <div style={{ background: `${accent}05`, padding: 16, borderRadius: 16, border: `1px solid ${accent}10` }}>
                                            <div style={{ fontSize: 15, color: 'var(--calc-text)' }}>
                                                <MathRenderer text={activeTerm.example} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: accent, fontWeight: 900 }}>⚡</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: accent, margin: 0 }}>{activeRule.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: 'var(--calc-text)', lineHeight: 1.6, margin: '0 0 24px' }}>{activeRule.desc}</p>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: accent, marginBottom: 10 }}>Formula</h4>
                                        <div style={{ background: `${accent}05`, padding: 20, borderRadius: 16, border: `1px solid ${accent}10`, textAlign: 'center' }}>
                                            <div style={{ fontSize: 18, fontWeight: 700, color: accent }}>
                                                <MathRenderer text={activeRule.formula} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className="calc-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '32px 40px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <h2 style={{ textAlign: 'center', margin: '0 0 32px 0', color: '#0f172a' }}>Quick Knowledge Check</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            {VOCAB_QUIZ.map((q) => (
                                <div key={q.id}>
                                    <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 16, marginBottom: 16 }}>{q.q}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {q.options.map((opt, optIdx) => {
                                            const isSelected = quizAnswers[q.id] === optIdx;
                                            const isCorrect = optIdx === q.correct;
                                            let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                                            if (showResults) {
                                                if (isCorrect) { bg = 'var(--calc-success-10)'; border = '1px solid var(--calc-success)'; color = 'var(--calc-success)'; }
                                                else if (isSelected && !isCorrect) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#ef4444'; }
                                            } else if (isSelected) { bg = `${accent}10`; border = `1px solid ${accent}`; color = accent; }
                                            return (
                                                <button key={optIdx} onClick={() => handleQuizSelect(q.id, optIdx)}
                                                    style={{ padding: '16px 20px', borderRadius: 12, background: bg, border, color, textAlign: 'left', fontSize: 15, cursor: showResults ? 'default' : 'pointer', transition: 'all 0.2s ease', fontWeight: isSelected ? 600 : 400 }}
                                                >
                                                    {opt}
                                                    {showResults && isCorrect && <span style={{ float: 'right' }}>✅</span>}
                                                    {showResults && isSelected && !isCorrect && <span style={{ float: 'right' }}>❌</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 40, textAlign: 'center', paddingTop: 32, borderTop: '1px solid #e2e8f0' }}>
                            {!showResults ? (
                                <button onClick={handleCheckAnswers} style={{ padding: '14px 32px', background: accent, color: '#fff', border: 'none', borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: `0 8px 20px ${accent}33` }}>Check Answers</button>
                            ) : (
                                <div>
                                    <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
                                        You scored {Object.entries(quizAnswers).filter(([qId, ans]) => VOCAB_QUIZ.find(q => q.id === parseInt(qId)).correct === ans).length} out of {VOCAB_QUIZ.length}! 🎉
                                    </div>
                                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                                        <button onClick={handleRetry} style={{ padding: '12px 24px', background: '#fff', color: '#475569', border: '1.5px solid #e2e8f0', borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Try Again</button>
                                        <button onClick={() => navigate('/calculus/integration/skills')} style={{ padding: '12px 24px', background: accent, color: '#fff', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: `0 8px 20px ${accent}33` }}>Go to Skills →</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button onClick={() => navigate('/calculus/integration/skills')} style={{ padding: '10px 28px', fontSize: 13, borderRadius: 100, border: 'none', background: accent, color: '#fff', fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 14px ${accent}4d` }}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div>
    );
}
