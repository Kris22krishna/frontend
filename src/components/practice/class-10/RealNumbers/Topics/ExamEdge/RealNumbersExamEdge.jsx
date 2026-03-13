import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { realNumbersExamEdgeData } from './RealNumbersExamEdgeData';
import '../../RealNumbersBranch.css';
import MathRenderer from '../../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';

export default function RealNumbersExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState(realNumbersExamEdgeData.exams[0].name);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const exam = realNumbersExamEdgeData.exams.find(e => e.name === activeExam);

    return (
        <div className="rn-page">
            <nav className="rn-nav">
                <button className="rn-nav-back" onClick={() => navigate('/senior/grade/10/real-numbers')}>
                    ← Back to Dashboard
                </button>
                <div className="rn-nav-links">
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/real-numbers/introduction')}>🌟 Intro</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/real-numbers/terminology')}>📖 Terminology</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/real-numbers/skills')}>🎯 Skills</button>
                    <button className="rn-nav-link" onClick={() => navigate('/senior/grade/10/real-numbers/connectomics')}>🌐 Connectomics</button>
                    <button className="rn-nav-link active" onClick={() => navigate('/senior/grade/10/real-numbers/exam-edge')}>⚔️ Exam Edge</button>
                </div>
            </nav>

            <div className="rn-hero">
                <h1 className="rn-hero-title">Real Numbers <span style={{ color: '#ef4444' }}>Exam Edge</span></h1>
                <p className="rn-hero-sub">Strategic insights and high-weightage topics for competitive exams.</p>
            </div>

            <main className="rn-topic-shell" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                
                {/* Exam Tabs */}
                <div className="rn-chip-row" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {realNumbersExamEdgeData.exams.map(e => (
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

                <div className="rn-details-window" style={{ background: '#fff' }}>
                    
                    {/* Weightage & Frequency */}
                    <div className="rn-stats-pair" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '20px', marginBottom: '32px' }}>
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
                                    <MathRenderer text={t} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strategy & Pitfalls */}
                    <div className="rn-responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '32px' }}>
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
                <div className="rn-topic-banner rn-topic-banner--dark" style={{ marginTop: '40px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '40px', borderRadius: '32px', color: '#fff' }}>
                    <div className="rn-section-head-inline" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Lightbulb size={32} color="#f59e0b" />
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Bonus Exam Tips</h2>
                    </div>
                    <div className="rn-responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '20px' }}>
                        {realNumbersExamEdgeData.proTips.map((tip, idx) => (
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
