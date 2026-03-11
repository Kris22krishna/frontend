import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setsExamEdgeData } from './SetsExamEdgeData';
import '../../SetsBranch.css';
import MathRenderer from '../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';

export default function SetsExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState(setsExamEdgeData.exams[0].name);

    const exam = setsExamEdgeData.exams.find(e => e.name === activeExam);

    return (
        <div className="sets-page">
            <nav className="sets-nav">
                <button className="sets-nav-back" onClick={() => navigate('/senior/grade/11/maths/sets')}>
                    ← Back to Dashboard
                </button>
            </nav>

            <div className="sets-hero">
                <h1 className="sets-hero-title">Sets <span style={{ color: '#ef4444' }}>Exam Edge</span></h1>
                <p className="sets-hero-sub">Strategic insights and high-weightage topics for competitive exams.</p>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                
                {/* Exam Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {setsExamEdgeData.exams.map(e => (
                        <button 
                            key={e.name}
                            onClick={() => setActiveExam(e.name)}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '100px',
                                border: '2px solid',
                                borderColor: activeExam === e.name ? e.color : '#e2e8f0',
                                background: activeExam === e.name ? `${e.color}10` : '#fff',
                                color: activeExam === e.name ? e.color : '#64748b',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>{e.emoji}</span> {e.name}
                        </button>
                    ))}
                </div>

                <div className="sets-details-window" style={{ background: '#fff' }}>
                    
                    {/* Weightage & Frequency */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                        <div style={{ background: `${exam.color}08`, padding: '20px', borderRadius: '16px', border: `1px solid ${exam.color}20` }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: exam.color, textTransform: 'uppercase', marginBottom: '4px' }}>Weightage</div>
                            <div style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b' }}>{exam.weightage}</div>
                        </div>
                        <div style={{ background: `${exam.color}08`, padding: '20px', borderRadius: '16px', border: `1px solid ${exam.color}20` }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: exam.color, textTransform: 'uppercase', marginBottom: '4px' }}>Frequency</div>
                            <div style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b' }}>{exam.freq}</div>
                        </div>
                    </div>

                    {/* High Yield Topics */}
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Target size={18} color={exam.color} /> High-Yield Topics
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {exam.topics.map((t, idx) => (
                                <div key={idx} style={{ background: '#f8fafc', padding: '10px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: 700, color: '#1e1b4b' }}>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strategy & Pitfalls */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Trophy size={18} color="#f59e0b" /> Winning Strategy
                            </h3>
                            <div style={{ background: '#fffbeb', padding: '24px', borderRadius: '20px', border: '1px solid #fef3c7', color: '#92400e', fontSize: '16px', lineHeight: 1.6 }}>
                                <MathRenderer text={exam.strategy} />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={18} color="#ef4444" /> Common Pitfalls
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {exam.pitfalls.map((p, idx) => (
                                    <div key={idx} style={{ background: '#fef2f2', padding: '16px 20px', borderRadius: '16px', border: '1px solid #fee2e2', color: '#991b1b', fontSize: '14px', fontWeight: 700 }}>
                                        ⚠️ <MathRenderer text={p} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pro Tips */}
                <div style={{ marginTop: '40px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '40px', borderRadius: '32px', color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Lightbulb size={32} color="#f59e0b" />
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Bonus Exam Tips</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {setsExamEdgeData.proTips.map((tip, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', lineHeight: 1.6 }}>
                                <MathRenderer text={tip} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
