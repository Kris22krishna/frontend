import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../InvestigativeScienceDashboard.module.css';
import { SCIENCE_EXAM_EDGE } from './ScienceExamEdgeData';

export default function ScienceExamEdge() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const navLinks = [
        { path: '/senior/grade/8/science/investigative-science/introduction', label: '🌟 Intro' },
        { path: '/senior/grade/8/science/investigative-science/terminology', label: '📖 Terminology' },
        { path: '/senior/grade/8/science/investigative-science/core-concepts', label: '🎯 Core Concepts' },
        { path: '/senior/grade/8/science/investigative-science/connectomics', label: '🔗 Connectomics' },
        { path: '/senior/grade/8/science/investigative-science/exam-edge', label: '🏆 Exam Edge', active: true },
        { path: '/senior/grade/8/science/investigative-science/virtual-lab', label: '🧪 Virtual Lab' },
    ];

    return (
        <div className={styles['inv-page']}>
            <nav className={styles['inv-nav']}>
                <button className={styles['inv-nav-back']} onClick={() => navigate('/senior/grade/8/science/investigative-science')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['inv-nav-links']}>
                    {navLinks.map(l => (
                        <button key={l.path} className={`${styles['inv-nav-link']} ${l.active ? styles['active'] : ''}`} onClick={() => navigate(l.path)}>
                            {l.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className={styles['inv-hero']} style={{ background: 'linear-gradient(145deg, #7f1d1d 0%, #ef4444 100%)' }}>
                <h1 className={styles['inv-hero-title']}>
                    Exam <span className={styles['inv-hero-accent--amber']}>Edge</span>
                </h1>
                <p className={styles['inv-hero-sub']}>
                    Master the paper structure. Avoid common traps. Ace the investigation questions.
                </p>
            </div>

            <main className={styles['inv-topic-shell']}>
                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
                    {SCIENCE_EXAM_EDGE.stats.map((s, i) => (
                        <div key={i} className={styles['inv-stat-card']} style={{ '--skill-color': s.color }}>
                            <div className={styles['inv-stat-label']}>{s.label}</div>
                            <div className={styles['inv-stat-value']}>{s.value}</div>
                        </div>
                    ))}
                </div>

                {/* High Yield */}
                <section className={styles['inv-high-yield-section']}>
                    <h2 className={styles['inv-section-subhead']}>🔥 High-Yield Topics</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                        {SCIENCE_EXAM_EDGE.yieldPoints.map((yp, i) => (
                            <div key={i} style={{ padding: 20, background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--inv-text)' }}>{yp.title}</h3>
                                    <span style={{ fontSize: 11, fontWeight: 800, background: '#fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: 6 }}>{yp.frequency}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: 14, color: 'var(--inv-muted)', lineHeight: 1.6 }}>{yp.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Diagrams */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 className={styles['inv-section-subhead']}>📐 Must-Know Diagrams</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {SCIENCE_EXAM_EDGE.diagrams.map(d => (
                            <div key={d.id} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
                                <div dangerouslySetInnerHTML={{ __html: d.svg }} />
                                <div style={{ padding: '20px 24px', borderTop: '1px solid #e2e8f0' }}>
                                    <h4 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 800 }}>{d.title}</h4>
                                    <p style={{ margin: 0, fontSize: 14, color: 'var(--inv-muted)' }}>{d.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Strategy vs Pitfalls */}
                <div className={styles['inv-strategy-pitfall-grid']}>
                    <div>
                        <h2 className={styles['inv-section-subhead']}>🧠 Winning Strategies</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {SCIENCE_EXAM_EDGE.strategies.map((s, i) => (
                                <div key={i} className={styles['inv-strategy-box']}>
                                    <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: '#065f46' }}>{s.title}</h4>
                                    <p style={{ margin: 0, fontSize: 14, color: '#064e3b' }}>{s.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className={styles['inv-section-subhead']}>⚠️ Common Pitfalls</h2>
                        <div className={styles['inv-pitfall-list']}>
                            {SCIENCE_EXAM_EDGE.pitfalls.map((p, i) => (
                                <div key={i} className={styles['inv-pitfall-item']}>
                                    <div style={{ color: '#b91c1c', fontWeight: 700, marginBottom: 6 }}>❌ {p.bad}</div>
                                    <div style={{ color: '#047857', fontWeight: 600, fontSize: 13 }}>✅ Fix: {p.good}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles['inv-topic-cta']}>
                    <div>
                        <h3>Time to put it all together</h3>
                        <p>Experience the scientific method hands-on with the Puri Investigation Simulator.</p>
                    </div>
                    <button className={styles['inv-topic-cta-button']} onClick={() => navigate('/senior/grade/8/science/investigative-science/virtual-lab')}>
                        Virtual Lab →
                    </button>
                </div>
            </main>
        </div>
    );
}
