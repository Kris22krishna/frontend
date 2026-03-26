import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../InvestigativeScienceDashboard.module.css';
import { SCIENCE_CONNECTOMICS } from './ScienceConnectomicsData';

export default function ScienceConnectomics() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const navLinks = [
        { path: '/senior/grade/8/science/investigative-science/introduction', label: '🌟 Intro' },
        { path: '/senior/grade/8/science/investigative-science/terminology', label: '📖 Terminology' },
        { path: '/senior/grade/8/science/investigative-science/core-concepts', label: '🎯 Core Concepts' },
        { path: '/senior/grade/8/science/investigative-science/connectomics', label: '🔗 Connectomics', active: true },
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

            <div className={styles['inv-hero']}>
                <div className={styles['inv-hero-content']}>
                    <h1 className={styles['inv-hero-title']}>
                        The Web of <span className={styles['inv-hero-accent--amber']}>Investigation</span>
                    </h1>
                    <p className={styles['inv-hero-sub']}>
                        The scientific method is the ultimate problem-solving tool. It does not just exist in a lab — it powers medicine, engineering, cooking, and the technology you use every day.
                    </p>
                </div>
            </div>

            <main className={styles['inv-topic-shell']}>
                <div className={styles['inv-section-mb']}>
                    <h2 className={styles['inv-section-title']} style={{ padding: 0 }}>Cross-Domain Investigation</h2>
                    <p style={{ color: 'var(--inv-muted)', marginBottom: 24 }}>How different fields apply the scientific method.</p>
                    
                    <div className={styles['inv-grid']} style={{ padding: 0 }}>
                        {SCIENCE_CONNECTOMICS.connections.map((c, i) => (
                            <div key={i} className={styles['inv-connection-card']}>
                                <div className={styles['inv-connection-strip']} style={{ background: c.color }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                                        {c.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--inv-text)' }}>{c.subject}</h3>
                                        <div className={styles['inv-connection-type']} style={{ background: `${c.color}10`, color: c.color, marginTop: 4 }}>
                                            {c.desc}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {c.items.map((item, j) => (
                                        <div key={j} style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                            <h4 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: c.color }}>{item.title}</h4>
                                            <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--inv-text)', lineHeight: 1.5 }}>{item.info}</p>
                                            <div style={{ fontSize: 13, color: 'var(--inv-muted)', fontStyle: 'italic', borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>{item.example}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles['inv-section-mb']}>
                    <h2 className={styles['inv-section-title']} style={{ padding: 0 }}>Real World Impact</h2>
                    <p style={{ color: 'var(--inv-muted)', marginBottom: 24 }}>How investigation changed history.</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                        {SCIENCE_CONNECTOMICS.realWorld.map((rw, i) => (
                            <div key={i} className={styles['inv-realworld-card']}>
                                <div className={styles['inv-realworld-impact']}>{rw.impact}</div>
                                <h3 className={styles['inv-realworld-title']}>{rw.title}</h3>
                                <p className={styles['inv-realworld-desc']}>{rw.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles['inv-topic-cta']}>
                    <div>
                        <h3>Ready for the test?</h3>
                        <p>Learn exactly how questions on investigation appear in your board exam.</p>
                    </div>
                    <button className={styles['inv-topic-cta-button']} onClick={() => navigate('/senior/grade/8/science/investigative-science/virtual-lab')}>
                        Go to Virtual Lab →
                    </button>
                </div>
            </main>
        </div>
    );
}
