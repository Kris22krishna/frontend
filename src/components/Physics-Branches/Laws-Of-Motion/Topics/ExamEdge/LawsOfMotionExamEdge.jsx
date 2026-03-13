import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lawsOfMotionExamEdgeData, lawsOfMotionFormulaSheet, lawsOfMotionQuickRevision } from './LawsOfMotionExamEdgeData';
import '../../LawsOfMotionBranch.css';

export default function LawsOfMotionExamEdge() {
    const navigate = useNavigate();
    const [selectedExam, setSelectedExam] = useState(lawsOfMotionExamEdgeData[0].id);

    const activeExam = lawsOfMotionExamEdgeData.find(e => e.id === selectedExam);

    return (
        <div className="lom-page">
            <nav className="lom-nav">
                <button className="lom-nav-back" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion')}>
                    ← Back to Dashboard
                </button>
                <div className="lom-nav-links">
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/terminology')}>📖 Terminology</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/skills')}>🎯 Skills</button>
                    <button className="lom-nav-link active">🏆 Exam Edge</button>
                </div>
            </nav>

            <div className="lom-hero" style={{ background: 'linear-gradient(145deg, #1e1b4b 0%, #312e81 100%)' }}>
                <h1 className="lom-hero-title">Prepare for the <span className="lom-title-accent">Edge</span></h1>
                <p className="lom-hero-sub">See how Newton's Laws are tested across major competitive exams and clear your conceptual hurdles.</p>
            </div>

            <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {lawsOfMotionExamEdgeData.map(exam => (
                        <button
                            key={exam.id}
                            onClick={() => setSelectedExam(exam.id)}
                            style={{
                                padding: '12px 24px', borderRadius: 100, fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                background: selectedExam === exam.id ? exam.color : '#fff',
                                color: selectedExam === exam.id ? '#fff' : '#64748b',
                                boxShadow: selectedExam === exam.id ? `0 4px 14px ${exam.color}40` : '0 2px 8px rgba(0,0,0,0.05)'
                            }}
                        >
                            {exam.exam}
                        </button>
                    ))}
                </div>

                {activeExam && (
                    <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', animation: 'fadeIn 0.4s ease' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                            <div style={{ width: 12, height: 40, background: activeExam.color, borderRadius: 8 }}></div>
                            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                {activeExam.exam} <span style={{ color: '#64748b', fontWeight: 600 }}>Strategy</span>
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Weightage</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: activeExam.color }}>{activeExam.weightage} <span style={{ fontSize: 16, fontWeight: 700, color: '#94a3b8' }}>Qs</span></div>
                            </div>
                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Marks</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: activeExam.color }}>{activeExam.marks}</div>
                            </div>
                            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Difficulty</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#334155', marginTop: 4 }}>{activeExam.difficulty}</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 40 }}>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>What to Focus On</h3>
                            <p style={{ fontSize: 16, color: '#334155', lineHeight: 1.6, margin: 0, padding: 24, background: `${activeExam.color}10`, borderRadius: 16, borderLeft: `4px solid ${activeExam.color}` }}>
                                {activeExam.focus}
                            </p>
                        </div>

                        <div>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span>📝</span> Previous Year Questions (Trend)
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {activeExam.pyqs.map((pyq, i) => (
                                    <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                        <div style={{ display: 'inline-block', padding: '4px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 100, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
                                            {activeExam.exam} {pyq.year}
                                        </div>
                                        <p style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', margin: '0 0 16px', lineHeight: 1.5 }}>
                                            {pyq.question}
                                        </p>
                                        <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: 12, borderTop: `2px solid ${activeExam.color}` }}>
                                            <div style={{ fontSize: 12, fontWeight: 800, color: activeExam.color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Solution Outline</div>
                                            <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>{pyq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════ FORMULA SHEET ═══════ */}
                <div style={{ marginTop: 60 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', textAlign: 'center', marginBottom: 8 }}>
                        📐 Formula Sheet
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: 15, marginBottom: 28, maxWidth: 500, marginInline: 'auto' }}>
                        All key formulae from Laws of Motion in one place.
                    </p>
                    <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#0f172a' }}>
                                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#f59e0b', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, borderBottom: '2px solid #f59e0b' }}>Quantity</th>
                                    <th style={{ padding: '14px 20px', textAlign: 'left', color: '#f59e0b', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, borderBottom: '2px solid #f59e0b' }}>Formula</th>
                                    <th style={{ padding: '14px 20px', textAlign: 'center', color: '#f59e0b', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, borderBottom: '2px solid #f59e0b' }}>Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lawsOfMotionFormulaSheet.map((row, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '13px 20px', fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{row.quantity}</td>
                                        <td style={{ padding: '13px 20px', fontSize: 14, fontFamily: "'Courier New', monospace", color: '#c97b1a', fontWeight: 600 }}>{row.formula}</td>
                                        <td style={{ padding: '13px 20px', fontSize: 13, textAlign: 'center', color: '#64748b', fontFamily: "'Courier New', monospace" }}>{row.unit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ═══════ QUICK REVISION ═══════ */}
                <div style={{ marginTop: 60 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', textAlign: 'center', marginBottom: 8 }}>
                        ⚡ Quick Revision Module
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: 15, marginBottom: 28, maxWidth: 500, marginInline: 'auto' }}>
                        Everything you need for last-minute revision. One card = one topic.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                        {lawsOfMotionQuickRevision.map((card, i) => (
                            <div key={i} style={{
                                background: '#fff', borderRadius: 20, padding: '22px 24px',
                                border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                            }}>
                                <h4 style={{ fontSize: 15, fontWeight: 800, color: '#c97b1a', textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 18 }}>{card.icon}</span> {card.title}
                                </h4>
                                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                    {card.points.map((pt, j) => (
                                        <li key={j} style={{
                                            fontSize: 14, color: '#334155', padding: '6px 0',
                                            borderBottom: j < card.points.length - 1 ? '1px solid #f1f5f9' : 'none',
                                            display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5
                                        }}>
                                            <span style={{ color: '#c97b1a', fontSize: 16, lineHeight: 1.2, flexShrink: 0 }}>›</span>
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Final Strategy Box */}
                    <div style={{
                        marginTop: 32, background: '#0f172a', borderRadius: 20, padding: '24px 28px'
                    }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>📌 Final Exam Strategy</div>
                        <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                            In Laws of Motion, <strong style={{ color: '#fff' }}>~60% questions are conceptual</strong> — about inertia types, action-reaction, centripetal vs centrifugal. Spend time mastering these rather than complex numericals. For numericals: always draw a free body diagram, identify all forces, resolve components, then apply F = ma. With a clean FBD, most problems become straightforward.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
