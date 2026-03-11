import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lawsOfMotionExamEdgeData } from './LawsOfMotionExamEdgeData';
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
            </div>
        </div>
    );
}
