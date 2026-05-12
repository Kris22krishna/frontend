import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../geometry.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { TERMS, FIVE_RULES, VOCAB_QUIZ } from './PolygonsTerminologyData';

const accent = '#10b981';

export default function PolygonsTerminology() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const activeTerm = TERMS[selectedIdx]; const activeRule = FIVE_RULES[selectedRuleIdx];
    const handleQuizSelect = (qId, optIdx) => { if (!showResults) setQuizAnswers(p => ({ ...p, [qId]: optIdx })); };
    const handleCheck = () => { if (Object.keys(quizAnswers).length < VOCAB_QUIZ.length) { alert('Please answer all questions!'); return; } setShowResults(true); };
    const handleRetry = () => { setQuizAnswers({}); setShowResults(false); };

    return (
        <div className={styles.page}>
            <style>{`.sol-anim{animation:solSlide 0.4s cubic-bezier(0.4,0,0.2,1)} @keyframes solSlide{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}} .sol-btn{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;border:1.5px solid rgba(0,0,0,0.06);cursor:pointer;transition:all 0.25s;text-align:left;font-family:'Outfit',sans-serif;background:#fff} .sol-btn:hover{transform:translateY(-2px);box-shadow:0 6px 15px rgba(0,0,0,0.08)} @media(max-width:1024px){.sol-grid{grid-template-columns:1fr !important}}`}</style>
            <nav className={styles.introNav}>
                <button className={styles.backBtn} onClick={() => navigate('/geometry/polygons')} style={{ marginBottom: 0 }}>← Back to Polygons</button>
                <div className={styles.introNavLinks}>
                    <button className={styles.introNavLink} onClick={() => navigate('/geometry/polygons/introduction')}>🌟 Introduction</button>
                    <button className={`${styles.introNavLink} ${styles.introNavLinkActive}`}>📖 Terminology</button>
                    <button className={styles.introNavLink} onClick={() => navigate('/geometry/polygons/skills')}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>Polygons <span style={{ background: `linear-gradient(135deg,${accent},#34d399)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span></h1>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>{activeTab==='quiz'?'Test your knowledge!':`Select any ${activeTab==='terms'?'term':'formula'} to explore.`}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    {[['terms','📚 Terminology'],['rules','⚡ Key Formulas'],['quiz','🧪 Vocab Check']].map(([key,label]) => (
                        <button key={key} className={styles.termTab+(activeTab===key?` ${styles.termTabActive}`:'')} onClick={()=>setActiveTab(key)}>{label}</button>
                    ))}
                </div>
                {activeTab !== 'quiz' ? (
                    <div className="sol-grid" style={{ display:'grid', gridTemplateColumns:'minmax(220px,280px) 1fr', gap:16, alignItems:'start' }}>
                        <aside style={{ background:'rgba(255,255,255,0.7)', padding:14, borderRadius:20, border:'1px solid rgba(0,0,0,0.05)', display:'grid', gridTemplateColumns:'1fr', gap:10, backdropFilter:'blur(10px)' }}>
                            {activeTab==='terms' ? TERMS.map((term,i) => { const isA=selectedIdx===i; return (
                                <button key={i} className="sol-btn" onClick={()=>setSelectedIdx(i)} style={{ background:isA?`linear-gradient(135deg,${accent},${accent}dd)`:`linear-gradient(135deg,${accent}10,${accent}05)`, borderColor:isA?accent:`${accent}20` }}>
                                    <div style={{width:36,height:36,borderRadius:10,background:isA?'rgba(255,255,255,0.25)':'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>{term.icon}</div>
                                    <span style={{fontWeight:800,fontSize:16,color:isA?'#fff':'#0f172a'}}>{term.word}</span>
                                </button>); }) : FIVE_RULES.map((rule,i) => { const isA=selectedRuleIdx===i; return (
                                <button key={i} className="sol-btn" onClick={()=>setSelectedRuleIdx(i)} style={{ background:isA?`linear-gradient(135deg,${accent},${accent}dd)`:`linear-gradient(135deg,${accent}10,${accent}05)`, borderColor:isA?accent:`${accent}20`, padding:'12px 16px' }}>
                                    <div style={{width:36,height:36,borderRadius:10,background:isA?'rgba(255,255,255,0.25)':'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:900,color:isA?'#fff':accent}}>{i+1}</div>
                                    <div style={{display:'flex',flexDirection:'column'}}><span style={{fontWeight:800,fontSize:16,color:isA?'#fff':'#0f172a',lineHeight:1}}>Formula {i+1}</span><span style={{fontSize:11,fontWeight:700,color:isA?'rgba(255,255,255,0.8)':'#64748b',textTransform:'uppercase',letterSpacing:0.5,marginTop:4}}>{rule.name}</span></div>
                                </button>); })}
                        </aside>
                        <main className="sol-anim" key={activeTab==='terms'?selectedIdx:`r${selectedRuleIdx}`} style={{ background:'#fff', borderRadius:20, padding:'20px 28px', boxShadow:'0 8px 24px rgba(0,0,0,0.03)', border:`2px solid ${accent}10`, minHeight:330, minWidth:0 }}>
                            {activeTab==='terms' ? (<>
                                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}><div style={{width:44,height:44,borderRadius:12,background:`${accent}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>{activeTerm.icon}</div><h2 style={{fontFamily:'Outfit,sans-serif',fontSize:28,fontWeight:900,color:accent,margin:0}}>{activeTerm.word}</h2></div>
                                <p style={{fontSize:17,color:'#0f172a',lineHeight:1.6,margin:'0 0 16px'}}>{activeTerm.def}</p>
                                {activeTerm.diagram && <div style={{marginBottom:20}}><h4 style={{textTransform:'uppercase',fontSize:11,letterSpacing:1,color:accent,marginBottom:8}}>Diagram</h4><div style={{background:'#f8fafc',borderRadius:16,border:`1px solid ${accent}20`,padding:'12px 8px',display:'flex',justifyContent:'center',overflow:'hidden'}} dangerouslySetInnerHTML={{__html:activeTerm.diagram}} /></div>}
                                <h4 style={{textTransform:'uppercase',fontSize:11,letterSpacing:1,color:accent,marginBottom:10}}>Example</h4>
                                <div style={{background:`${accent}05`,padding:16,borderRadius:16,border:`1px solid ${accent}10`}}><div style={{fontSize:15,color:'#0f172a'}}><MathRenderer text={activeTerm.example} /></div></div>
                            </>) : (<>
                                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}><div style={{width:44,height:44,borderRadius:12,background:`${accent}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,color:accent,fontWeight:900}}>⚡</div><h2 style={{fontFamily:'Outfit,sans-serif',fontSize:28,fontWeight:900,color:accent,margin:0}}>{activeRule.name}</h2></div>
                                <p style={{fontSize:17,color:'#0f172a',lineHeight:1.6,margin:'0 0 24px'}}>{activeRule.desc}</p>
                                <h4 style={{textTransform:'uppercase',fontSize:11,letterSpacing:1,color:accent,marginBottom:10}}>Formula</h4>
                                <div style={{background:`${accent}05`,padding:20,borderRadius:16,border:`1px solid ${accent}10`,textAlign:'center'}}><div style={{fontSize:18,fontWeight:700,color:accent}}><MathRenderer text={activeRule.formula} /></div></div>
                            </>)}
                        </main>
                    </div>
                ) : (
                    <div className="sol-anim" style={{ maxWidth:700, margin:'0 auto', background:'#fff', borderRadius:24, padding:'32px 40px', boxShadow:'0 15px 40px rgba(0,0,0,0.04)', border:'1px solid rgba(0,0,0,0.04)' }}>
                        <h2 style={{textAlign:'center',margin:'0 0 32px',color:'#0f172a'}}>Quick Knowledge Check</h2>
                        <div style={{display:'flex',flexDirection:'column',gap:32}}>
                            {VOCAB_QUIZ.map(q => (
                                <div key={q.id}>
                                    <div style={{fontWeight:600,color:'#1e293b',fontSize:16,marginBottom:16}}>{q.q}</div>
                                    <div style={{display:'flex',flexDirection:'column',gap:8}}>
                                        {q.options.map((opt,optIdx) => {
                                            const isSel=quizAnswers[q.id]===optIdx, isCorrect=optIdx===q.correct;
                                            let bg='#f8fafc', border='1px solid #e2e8f0', color='#475569';
                                            if(showResults){if(isCorrect){bg='#ecfdf5';border='1px solid #10b981';color='#10b981';}else if(isSel){bg='#fef2f2';border='1px solid #ef4444';color='#ef4444';}}else if(isSel){bg=`${accent}10`;border=`1px solid ${accent}`;color=accent;}
                                            return <button key={optIdx} onClick={()=>handleQuizSelect(q.id,optIdx)} style={{padding:'16px 20px',borderRadius:12,background:bg,border,color,textAlign:'left',fontSize:15,cursor:showResults?'default':'pointer',transition:'all 0.2s',fontWeight:isSel?600:400}}>{opt}{showResults&&isCorrect&&<span style={{float:'right'}}>✅</span>}{showResults&&isSel&&!isCorrect&&<span style={{float:'right'}}>❌</span>}</button>;
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{marginTop:40,textAlign:'center',paddingTop:32,borderTop:'1px solid #e2e8f0'}}>
                            {!showResults ? <button onClick={handleCheck} style={{padding:'14px 32px',background:accent,color:'#fff',border:'none',borderRadius:100,fontSize:16,fontWeight:700,cursor:'pointer'}}>Check Answers</button> : (
                                <div><div style={{fontSize:24,fontWeight:700,color:'#0f172a',marginBottom:16}}>You scored {Object.entries(quizAnswers).filter(([id,ans])=>VOCAB_QUIZ.find(q=>q.id===parseInt(id)).correct===ans).length} out of {VOCAB_QUIZ.length}! 🎉</div><div style={{display:'flex',gap:16,justifyContent:'center'}}><button onClick={handleRetry} style={{padding:'12px 24px',background:'#fff',color:'#475569',border:'1.5px solid #e2e8f0',borderRadius:100,fontSize:15,fontWeight:600,cursor:'pointer'}}>Try Again</button><button onClick={()=>navigate('/geometry/polygons/skills')} style={{padding:'12px 24px',background:accent,color:'#fff',border:'none',borderRadius:100,fontSize:15,fontWeight:700,cursor:'pointer'}}>Go to Skills →</button></div></div>
                            )}
                        </div>
                    </div>
                )}
                <div style={{marginTop:16,textAlign:'center'}}><button onClick={()=>navigate('/geometry/polygons/skills')} style={{padding:'10px 28px',fontSize:13,borderRadius:100,border:'none',background:accent,color:'#fff',fontWeight:800,cursor:'pointer'}}>Ready to Solve! 🎯</button></div>
            </div>
        </div>
    );
}
