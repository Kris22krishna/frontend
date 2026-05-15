import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../geometry.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { TERMS, GEO_RULES, VOCAB_QUIZ } from './GeoTerminologyData';

export default function GeoTerminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = GEO_RULES[selectedRuleIdx];
    const accent = '#0ea5e9';
    const accentBg = 'rgba(14,165,233,0.08)';

    const handleQuizSelect = (qId, optIdx) => { if (showResults) return; setQuizAnswers(p => ({ ...p, [qId]: optIdx })); };
    const handleCheck = () => { if (Object.keys(quizAnswers).length < VOCAB_QUIZ.length) { alert("Please answer all questions first!"); return; } setShowResults(true); };
    const handleRetry = () => { setQuizAnswers({}); setShowResults(false); };

    return (
        <div className={styles.page}>
            <style>{`.geo-detail-anim{animation:geoSlide .4s cubic-bezier(.4,0,.2,1)}@keyframes geoSlide{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}.geo-term-btn{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;border:1.5px solid rgba(0,0,0,.06);cursor:pointer;transition:all .25s;text-align:left;font-family:'Outfit',sans-serif;background:#fff;position:relative;overflow:hidden}.geo-term-btn:hover{transform:translateY(-2px);box-shadow:0 6px 15px rgba(0,0,0,.08)}.geo-term-btn.active{transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,0,0,.1);z-index:2}@media(max-width:1024px){.geo-lexicon-grid{grid-template-columns:1fr!important}}`}</style>

            <nav className={styles.introNav}>
                <button className={styles.backBtn} onClick={() => navigate('/geometry/basic-geometry')} style={{ marginBottom: 0 }}>← Back to Basic Geometry</button>
                <div className={styles.introNavLinks}>
                    <button className={styles.introNavLink} onClick={() => navigate('/geometry/basic-geometry/introduction')}>🌟 Introduction</button>
                    <button className={`${styles.introNavLink} ${styles.introNavLinkActive}`}>📖 Terminology</button>
                    <button className={styles.introNavLink} onClick={() => navigate('/geometry/basic-geometry/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className={styles.lexiconContainer} style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Geometry <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b', letterSpacing: 0.5 }}>
                        {activeTab === 'quiz' ? 'Test your knowledge!' : `Select any ${activeTab === 'terms' ? 'term' : 'rule'} to explore.`}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    {[['terms', '📚 Terminology'], ['rules', '⚡ Geo Rules'], ['quiz', '🧪 Vocab Check']].map(([id, lbl]) => (
                        <button key={id} className={`${styles.termTab} ${activeTab === id ? styles.termTabActive : ''}`} onClick={() => setActiveTab(id)}>{lbl}</button>
                    ))}
                </div>

                {activeTab !== 'quiz' ? (
                    <div className="geo-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 280px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside style={{ background: 'rgba(255,255,255,0.7)', padding: 14, borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', display: 'grid', gridTemplateColumns: '1fr', gap: 10, backdropFilter: 'blur(10px)' }}>
                            {activeTab === 'terms' ? TERMS.map((term, i) => {
                                const isA = selectedIdx === i;
                                return (
                                    <button key={i} className={`geo-term-btn ${isA ? 'active' : ''}`} onClick={() => setSelectedIdx(i)}
                                        style={{ background: isA ? 'linear-gradient(135deg, #0ea5e9, #0ea5e9dd)' : 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(14,165,233,0.02))', borderColor: isA ? '#0ea5e9' : 'rgba(14,165,233,0.15)' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isA ? 'rgba(255,255,255,0.25)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{term.icon}</div>
                                        <span style={{ fontWeight: 800, fontSize: 16, color: isA ? '#fff' : '#0f172a' }}>{term.word}</span>
                                    </button>
                                );
                            }) : GEO_RULES.map((rule, i) => {
                                const isA = selectedRuleIdx === i;
                                return (
                                    <button key={i} className={`geo-term-btn ${isA ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                        style={{ background: isA ? 'linear-gradient(135deg, #0ea5e9, #0ea5e9dd)' : 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(14,165,233,0.02))', borderColor: isA ? '#0ea5e9' : 'rgba(14,165,233,0.15)', padding: '12px 16px' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isA ? 'rgba(255,255,255,0.25)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: isA ? '#fff' : accent, fontWeight: 900 }}>{i + 1}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 800, fontSize: 16, color: isA ? '#fff' : '#0f172a', lineHeight: 1 }}>Rule {i + 1}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: isA ? 'rgba(255,255,255,0.8)' : '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{rule.name}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="geo-detail-anim" key={activeTab === 'terms' ? selectedIdx : `r${selectedRuleIdx}`} style={{ background: '#fff', borderRadius: 20, padding: '20px 28px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)', border: '2px solid rgba(14,165,233,0.08)', minHeight: 330, minWidth: 0 }}>
                            {activeTab === 'terms' ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{activeTerm.icon}</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: accent, margin: 0 }}>{activeTerm.word}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#0f172a', lineHeight: 1.6, margin: '0 0 16px' }}>{activeTerm.def}</p>
                                    {activeTerm.diagram && <div style={{ marginBottom: 20 }}><h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: accent, marginBottom: 8 }}>Diagram</h4><div style={{ background: '#f8fafc', borderRadius: 16, border: `1px solid ${accent}20`, padding: '12px 8px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: activeTerm.diagram }} /></div>}
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: accent, marginBottom: 10 }}>Example</h4>
                                        <div style={{ background: 'rgba(14,165,233,0.04)', padding: 16, borderRadius: 16, border: '1px solid rgba(14,165,233,0.1)', fontSize: 15, color: '#0f172a' }}>
                                            <MathRenderer text={activeTerm.example} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: accent, fontWeight: 900 }}>⚡</div>
                                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: accent, margin: 0 }}>{activeRule.name}</h2>
                                    </div>
                                    <p style={{ fontSize: 17, color: '#0f172a', lineHeight: 1.6, margin: '0 0 24px' }}>{activeRule.desc}</p>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: accent, marginBottom: 10 }}>Formula</h4>
                                        <div style={{ background: 'rgba(14,165,233,0.04)', padding: 20, borderRadius: 16, border: '1px solid rgba(14,165,233,0.1)', textAlign: 'center', fontSize: 18, fontWeight: 700, color: accent }}>
                                            <MathRenderer text={activeRule.formula} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </main>
                    </div>
                ) : (
                    <div className="geo-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '32px 40px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        <h2 style={{ textAlign: 'center', margin: '0 0 32px', color: '#0f172a' }}>Quick Knowledge Check</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            {VOCAB_QUIZ.map(q => (
                                <div key={q.id}>
                                    <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 16, marginBottom: 16 }}>{q.q}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {q.options.map((opt, oi) => {
                                            const isSel = quizAnswers[q.id] === oi;
                                            const isCorr = oi === q.correct;
                                            let bg = '#f8fafc', border = '1px solid #e2e8f0', color = '#475569';
                                            if (showResults) { if (isCorr) { bg = 'rgba(16,185,129,0.08)'; border = '1px solid #10b981'; color = '#10b981'; } else if (isSel && !isCorr) { bg = '#fef2f2'; border = '1px solid #ef4444'; color = '#ef4444'; } }
                                            else if (isSel) { bg = accentBg; border = `1px solid ${accent}`; color = accent; }
                                            return (
                                                <button key={oi} onClick={() => handleQuizSelect(q.id, oi)}
                                                    style={{ padding: '16px 20px', borderRadius: 12, background: bg, border, color, textAlign: 'left', fontSize: 15, cursor: showResults ? 'default' : 'pointer', transition: 'all 0.2s', fontWeight: isSel ? 600 : 400 }}>
                                                    {opt}
                                                    {showResults && isCorr && <span style={{ float: 'right' }}>✅</span>}
                                                    {showResults && isSel && !isCorr && <span style={{ float: 'right' }}>❌</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 40, textAlign: 'center', paddingTop: 32, borderTop: '1px solid #e2e8f0' }}>
                            {!showResults ? (
                                <button onClick={handleCheck} style={{ padding: '14px 32px', background: accent, color: '#fff', border: 'none', borderRadius: 100, fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 20px rgba(14,165,233,0.2)' }}>Check Answers</button>
                            ) : (
                                <div>
                                    <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
                                        You scored {Object.entries(quizAnswers).filter(([qId, ans]) => VOCAB_QUIZ.find(q => q.id === parseInt(qId)).correct === ans).length} out of {VOCAB_QUIZ.length}! 🎉
                                    </div>
                                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                                        <button onClick={handleRetry} style={{ padding: '12px 24px', background: '#fff', color: '#475569', border: '1.5px solid #e2e8f0', borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Try Again</button>
                                        <button onClick={() => navigate('/geometry/basic-geometry/skills')} style={{ padding: '12px 24px', background: accent, color: '#fff', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 20px rgba(14,165,233,0.2)' }}>Go to Skills →</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button onClick={() => navigate('/geometry/basic-geometry/skills')} style={{ padding: '10px 28px', fontSize: 13, borderRadius: 100, border: 'none', background: accent, color: '#fff', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(14,165,233,0.3)' }}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div>
    );
}
