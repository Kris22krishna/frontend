import React, { useState } from 'react';
import ECFNav from '../../ECFNav';
import styles from '../../ecf.module.css';
import MathRenderer from '../../../../../../MathRenderer';
import {
    ecfExamEdgeData,
    ecfFormulaSheet,
    ecfQuickRevision,
} from './ECFExamEdgeData';

export default function ECFExamEdge() {
    const [selectedExam, setSelectedExam] = useState(ecfExamEdgeData[0].id);
    const activeExam = ecfExamEdgeData.find(e => e.id === selectedExam);

    return (
        <div className={styles['ecf-examedge-page']}>
            <ECFNav activeTab="exam-edge" />

            <div className={styles['ecf-examedge-hero']}>
                <h1 className={styles['ecf-hero-title']}>
                    Prepare for the <span className={styles['ecf-hero-accent']}>Edge</span>
                </h1>
                <p className={styles['ecf-hero-sub']}>
                    Electric Charges &amp; Fields in JEE &amp; NEET — strategy, PYQs, formula sheet, quick revision.
                </p>
            </div>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px 60px' }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {ecfExamEdgeData.map(exam => (
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

                {activeExam && (
                    <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginBottom: 48 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                            <div style={{ width: 10, height: 40, background: activeExam.color, borderRadius: 8 }} />
                            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                {activeExam.exam} <span style={{ color: '#64748b', fontWeight: 600 }}>Strategy</span>
                            </h2>
                        </div>

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

                        <div style={{ marginBottom: 36 }}>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>What to Focus On</h3>
                            <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, margin: 0, padding: 20, background: `${activeExam.color}08`, borderRadius: 14, borderLeft: `4px solid ${activeExam.color}` }}>
                                {activeExam.focus}
                            </p>
                        </div>

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

                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#0f172a', textAlign: 'center', marginBottom: 8 }}>
                        📐 Formula Sheet
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: 24, maxWidth: 560, margin: '0 auto 24px' }}>
                        Every high-yield formula from Electric Charges &amp; Fields — with exam-ready notation.
                    </p>
                    <div style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                        <table className={styles['ecf-formula-table']}>
                            <thead>
                                <tr>
                                    {['Quantity', 'Formula', 'Unit'].map(h => (
                                        <th key={h} className={styles['ecf-formula-th']}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {ecfFormulaSheet.map((row, i) => (
                                    <tr key={i}>
                                        <td className={styles['ecf-formula-td']} style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{row.quantity}</td>
                                        <td className={styles['ecf-formula-td']}><MathRenderer text={row.formula} /></td>
                                        <td className={styles['ecf-formula-td']}><MathRenderer text={row.unit} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#0f172a', textAlign: 'center', marginBottom: 8 }}>
                        ⚡ Quick Revision
                    </h2>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginBottom: 24, maxWidth: 560, margin: '0 auto 24px' }}>
                        One card = one high-yield revision block for last-minute prep.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
                        {ecfQuickRevision.map((card, i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#4a2c8a', textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 18 }}>{card.icon}</span> {card.title}
                                </h4>
                                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                    {card.points.map((pt, j) => (
                                        <li key={j} style={{ fontSize: 13.5, color: '#334155', padding: '6px 0', borderBottom: j < card.points.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.5 }}>
                                            <span style={{ color: '#4a2c8a', fontSize: 15, lineHeight: 1.2, flexShrink: 0 }}>›</span>
                                            <MathRenderer text={pt} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 28, background: '#120a2e', borderRadius: 18, padding: '22px 26px' }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>📌 Final Exam Strategy</div>
                        <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
                            <MathRenderer text="Start every problem by identifying symmetry and vector direction. In objective questions, first eliminate options using scaling ($1/r^2$ vs $1/r^3$), sign logic, and units. For numericals, write knowns with SI units, then apply one clean formula path. This chapter is high-return when your fundamentals are error-free." />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
