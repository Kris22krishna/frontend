import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cellExamEdgeData } from './TheCellExamEdgeData';
import '../../TheCellBranch.css';
import MathRenderer from '../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';

export default function TheCellExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState(cellExamEdgeData.exams[0].name);

    const exam = cellExamEdgeData.exams.find(e => e.name === activeExam);

    return (
        <div className="cell-page">
            <nav className="cell-nav">
                <button className="cell-nav-back" onClick={() => navigate('/senior/grade/11/biology/the-cell')}>
                    ← Back to Dashboard
                </button>
                <div className="cell-nav-links">
                    <button className="cell-nav-link" onClick={() => navigate('/senior/grade/11/biology/the-cell/connectomics')}>🧠 Connectomics</button>
                    <button className="cell-nav-link" onClick={() => navigate('/senior/grade/11/biology/the-cell/introduction')}>🌟 Intro</button>
                    <button className="cell-nav-link" onClick={() => navigate('/senior/grade/11/biology/the-cell/terminology')}>📖 Terminology</button>
                    <button className="cell-nav-link" onClick={() => navigate('/senior/grade/11/biology/the-cell/skills')}>🎯 Skills</button>
                    <button className="cell-nav-link active" onClick={() => navigate('/senior/grade/11/biology/the-cell/exam-edge')}>⚡ Exam Edge</button>
                </div>
            </nav>

            <div className="cell-hero">
                <h1 className="cell-hero-title">The Cell <span style={{ color: '#ef4444' }}>Exam Edge</span></h1>
                <p className="cell-hero-sub">Strategic insights and high-weightage topics for competitive medical exams.</p>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                
                {/* Exam Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {cellExamEdgeData.exams.map(e => (
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

                <div className="cell-details-window" style={{ background: '#fff' }}>
                    
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

                {/* Quick Revision Space */}
                <div style={{ marginTop: '40px', background: '#fff', borderRadius: '32px', padding: '40px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ background: '#fee2e2', padding: '10px', borderRadius: '12px', color: '#dc2626' }}>⚡</span>
                        Quick Revision Module
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px', paddingLeft: '56px' }}>Everything critical for last-minute review — formulas, rules, and NEET traps.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        {cellExamEdgeData.quickRevision && cellExamEdgeData.quickRevision.map((card, idx) => (
                            <div key={idx} style={{ background: '#f8fafc', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b', marginBottom: '16px', paddingBottom: '12px', borderBottom: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {card.title}
                                </h3>
                                <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-line', margin: 0 }}>
                                    {card.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Master Comparison Table */}
                <div style={{ marginTop: '40px', background: '#fff', borderRadius: '32px', padding: '40px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ background: '#fef3c7', padding: '10px', borderRadius: '12px', color: '#d97706' }}>📊</span>
                        {cellExamEdgeData.masterComparison?.title || "Master Comparison"}
                    </h2>
                    
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                    {cellExamEdgeData.masterComparison?.headers.map((th, i) => (
                                        <th key={i} style={{ padding: '16px', fontSize: '14px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{th}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cellExamEdgeData.masterComparison?.rows.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                                        {row.map((td, j) => (
                                            <td key={j} style={{ padding: '16px', fontSize: '15px', color: j === 0 ? '#1e1b4b' : '#334155', fontWeight: j === 0 ? 800 : 500 }}>
                                                {td}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <button onClick={() => navigate('/senior/grade/11/biology/the-cell')} style={{ padding: '12px 32px', fontSize: 16, background: '#10b981', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(16,185,129,0.4)', transition: 'all 0.2s' }}>
                        Finish Topic <span style={{ color: '#fff' }}>✓</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
