import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { structureOfAtomExamEdgeData } from './StructureOfAtomExamEdgeData';
import '../../StructureOfAtomBranch.css';
import MathRenderer from '../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';

export default function StructureOfAtomExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState(structureOfAtomExamEdgeData.exams[0].name);

    const exam = structureOfAtomExamEdgeData.exams.find(e => e.name === activeExam);

    return (
        <div className="atom-page">
            <nav className="atom-nav">
                <button className="atom-nav-back" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom')}>
                    ← Back to Dashboard
                </button>
            </nav>

            <div className="atom-hero" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '60px 24px', textAlign: 'center', marginBottom: '40px' }}>
                <h1 className="atom-hero-title" style={{ color: '#fff' }}>Structure of Atom <span style={{ color: '#ef4444' }}>Exam Edge</span></h1>
                <p className="atom-hero-sub" style={{ color: '#94a3b8' }}>Strategic insights and high-weightage topics for competitive exams.</p>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                
                {/* Exam Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {structureOfAtomExamEdgeData.exams.map(e => (
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

                <div className="atom-details-window" style={{ background: '#fff', borderRadius: '32px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', padding: '40px', border: '1px solid #e2e8f0' }}>
                    
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
                <div style={{ marginTop: '40px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '40px', borderRadius: '32px', color: '#fff', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Lightbulb size={32} color="#f59e0b" />
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Bonus Exam Tips</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {structureOfAtomExamEdgeData.proTips.map((tip, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', lineHeight: 1.6 }}>
                                <MathRenderer text={tip} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Formula Sheet & Quick Revision */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
                    {/* Formula Sheet */}
                    <div style={{ background: '#fff', borderRadius: '32px', padding: '40px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ background: '#fef3c7', padding: '10px', borderRadius: '12px', color: '#d97706' }}>📐</span>
                            Master Formula Sheet
                        </h2>
                        
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '16px', fontSize: '14px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', width: '35%' }}>Formula</th>
                                        <th style={{ padding: '16px', fontSize: '14px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', width: '35%' }}>Meaning</th>
                                        <th style={{ padding: '16px', fontSize: '14px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', width: '30%' }}>Key Values / Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {structureOfAtomExamEdgeData.formulaSheet && structureOfAtomExamEdgeData.formulaSheet.map((item, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '20px 16px', fontSize: '16px', fontWeight: 700, color: '#3b82f6', fontFamily: '"Fira Code", monospace' }}>
                                                <MathRenderer text={item.formula} />
                                            </td>
                                            <td style={{ padding: '20px 16px', fontSize: '15px', color: '#334155', fontWeight: 600 }}>
                                                <MathRenderer text={item.meaning} />
                                            </td>
                                            <td style={{ padding: '20px 16px', fontSize: '14px', color: '#64748b' }}>
                                                <MathRenderer text={item.keyValues} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Revision Space */}
                    <div style={{ background: '#fff', borderRadius: '32px', padding: '40px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ background: '#fee2e2', padding: '10px', borderRadius: '12px', color: '#dc2626' }}>⚡</span>
                            Quick Revision Module
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px', paddingLeft: '56px' }}>Everything critical for last-minute review — formulas, rules, and NEET traps.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            {structureOfAtomExamEdgeData.quickRevision && structureOfAtomExamEdgeData.quickRevision.map((card, idx) => (
                                <div key={idx} style={{ background: '#f8fafc', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {card.title}
                                    </h3>
                                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                        {card.bulletPoints.map((pt, j) => (
                                            <li key={j} style={{
                                                fontSize: '14px', color: '#334155', padding: '8px 0',
                                                borderBottom: j < card.bulletPoints.length - 1 ? '1px dashed #cbd5e1' : 'none',
                                                display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.5
                                            }}>
                                                <span style={{ color: '#3b82f6', fontSize: '16px', lineHeight: 1.2, flexShrink: 0 }}>›</span>
                                                <MathRenderer text={pt} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Final Strategy Box */}
                        <div style={{ marginTop: '40px', background: '#0f172a', borderRadius: '20px', padding: '32px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>🎯 Final Exam Strategy</div>
                            <p style={{ margin: 0, fontSize: '16px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                                In Structure of Atom, <strong style={{ color: '#fff' }}>Bohr Model formulas and Exceptions to electronic configurations (Cr & Cu)</strong> are the most recurring topics. Focus heavily on calculating energy transitions, spectral lines (Balmer visible, Lyman UV), and quantum numbers. Always double-check standard units — convert nm to m when using hν = hc/λ.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
