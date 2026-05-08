import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mslExamEdgeData, mslFormulaSheet, mslQuickRevision } from './MSLExamEdgeData';
import MathRenderer from '../../../../MathRenderer';
import MSLNav from '../../MSLNav';
import styles from '../../msl.module.css';

const BASE = '/senior/grade/11/physics/motion-in-a-straight-line';

export default function MSLExamEdge() {
    const navigate = useNavigate();
    const [selectedExam, setSelectedExam] = useState(mslExamEdgeData[0].id);
    const activeExam = mslExamEdgeData.find(e => e.id === selectedExam);

    return (
        <div className={styles['msl-examedge-page']}>
            <MSLNav activeTab="exam-edge" />

            {/* Hero */}
            <div className={styles['msl-examedge-hero']}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>
                    Prepare for the <span style={{ color: '#a5b4fc' }}>Edge</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14, margin: 0, fontWeight: 500 }}>
                    MSL in JEE &amp; NEET — strategy, PYQs, formula sheet, quick revision.
                </p>
            </div>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px 60px' }}>
                {/* Exam selector pills */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {mslExamEdgeData.map(exam => (
                        <button
                            key={exam.id}
                            onClick={() => setSelectedExam(exam.id)}
                            style={{
                                padding: '10px 22px', borderRadius: 100, fontWeight: 800, fontSize: 14,
                                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                background: selectedExam === exam.id ? exam.color : '#fff',
                                color: selectedExam === exam.id ? '#fff' : '#64748b',
                                boxShadow: selectedExam === exam.id ? `0 4px 14px ${exam.color}40` : '0 2px 8px rgba(0,0,0,0.05)',
                                fontFamily: 'Open Sans, sans-serif',
                            }}
                        >{exam.exam}</button>
                    ))}
                </div>

                {/* Active exam panel */}
                {activeExam && (
                    <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginBottom: 48 }}>
                        {/* Exam header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                            <div style={{ width: 10, height: 40, background: activeExam.color, borderRadius: 8 }} />
                            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                {activeExam.exam} <span style={{ color: '#64748b', fontWeight: 600 }}>Strategy</span>
                            </h2>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 28 }}>
                            {[
                                { label: 'Weightage', value: `${activeExam.weightage} Qs` },
                                { label: 'Marks', value: activeExam.marks },
                                { label: 'Difficulty', value: activeExam.difficulty },
                            ].map(s => (
                                <div key={s.label} style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
                                    <div style={{ fontSize: 22, fontWeight: 900, color: activeExam.color }}>{s.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Focus */}
                        <div style={{ marginBottom: 36 }}>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>What to Focus On</h3>
                            <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, margin: 0, padding: 20, background: `${activeExam.color}08`, borderRadius: 14, borderLeft: `4px solid ${activeExam.color}` }}>
                                {activeExam.focus}
                            </p>
                        </div>

                        {/* PYQs */}
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            📝 Previous Year Questions (Trend)
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {activeExam.pyqs.map((pyq, i) => (
                                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 22, boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'inline-block', padding: '4px 12px', background: '#f1f5f9', color: '#475569', borderRadius: 100, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
                                        {activeExam.exam} {pyq.year}
                                    </div>
                                    <p style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', margin: '0 0 14px', lineHeight: 1.6 }}>
                                        <MathRenderer text={pyq.question} />
                                    </p>
                                    <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: 12, borderTop: `3px solid ${activeExam.color}` }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: activeExam.color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>Solution Outline</div>
                                        <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.7 }}>
                                            <MathRenderer text={pyq.answer} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FORMULA SHEET */}
                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#0f172a', textAlign: 'center', marginBottom: 8 }}>
                        📐 Formula Sheet
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
                        Every key formula from Motion in a Straight Line — rendered with correct notation.
                    </p>
                    <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                        <table className={styles['msl-formula-table']}>
                            <thead>
                                <tr>
                                    {['Quantity', 'Formula', 'Unit'].map(h => (
                                        <th key={h} className={styles['msl-formula-th']}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {mslFormulaSheet.map((row, i) => (
                                    <tr key={i}>
                                        <td className={styles['msl-formula-td']} style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{row.quantity}</td>
                                        <td className={styles['msl-formula-td']}>
                                            <MathRenderer text={row.formula} />
                                        </td>
                                        <td className={styles['msl-formula-td']}>
                                            <MathRenderer text={row.unit} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* QUICK REVISION */}
                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#0f172a', textAlign: 'center', marginBottom: 8 }}>
                        ⚡ Quick Revision
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
                        One card = one essential concept block for last-minute revision.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
                        {mslQuickRevision.map((card, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 18 }}>{card.icon}</span> {card.title}
                                </h4>
                                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                    {card.points.map((pt, j) => (
                                        <li key={j} style={{ fontSize: 13.5, color: '#334155', padding: '6px 0', borderBottom: j < card.points.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                                            <span style={{ color: '#0d9488', fontSize: 15, lineHeight: 1.2, flexShrink: 0 }}>›</span>
                                            <MathRenderer text={pt} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Final strategy box */}
                    <div style={{ marginTop: 28, background: '#0f172a', borderRadius: 18, padding: '22px 26px' }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>📌 Final Exam Strategy</div>
                        <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
                            In Motion in a Straight Line, <strong style={{ color: '#fff' }}>~50% of questions are graph-based</strong> (slope or area of v-t graph).
                            Practise reading 5–6 different v-t graph shapes cold. For numericals: write u, v, a, s, t — circle the unknowns — pick the equation missing the variable you don't need. With sign convention locked in from the start, 80% of errors vanish.
                        </p>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button onClick={() => navigate(BASE)} style={{ padding: '12px 32px', fontSize: 15, background: '#10b981', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 14px rgba(16,185,129,0.4)', fontFamily: 'Open Sans, sans-serif' }}>
                        Finish Topic ✓
                    </button>
                </div>
            </div>
        </div>
    );
}
