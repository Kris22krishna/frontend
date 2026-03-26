import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chemReactionsConnectomicsData } from './ChemReactionsConnectomicsData';
import styles from '../../ChemicalReactionsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { Share2 } from 'lucide-react';

export default function ChemReactionsConnectomics() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['chem-page']}>
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['chem-hero']}>
                <h1 className={styles['chem-hero-title']}>Chemical Reactions <span className={styles['chem-hero-accent--amber']}>Connectomics</span></h1>
                <p className={styles['chem-hero-sub']}>Discover the hidden threads linking chemical equations to the entire world of science.</p>
            </div>

            <main className={styles['chem-topic-shell']}>

                {/* Connections Map */}
                <h2 className={styles['chem-section-title']}>The Web of Chemistry</h2>

                <div className={styles['chem-grid']} style={{ gap: '24px', marginBottom: '60px', padding: 0 }}>
                    {chemReactionsConnectomicsData.connections.map((conn, idx) => (
                        <div key={idx} className={styles['chem-connection-card']}>
                            <div className={styles['chem-connection-strip']} style={{ background: conn.color }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div className={styles['chem-connection-type']} style={{ background: `${conn.color}15`, color: conn.color }}>
                                    {conn.type}
                                </div>
                            </div>

                            <div className={styles['chem-connection-path']} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <span style={{ fontWeight: 800, color: '#1e1b4b' }}>{conn.from}</span>
                                <span style={{ color: '#94a3b8' }}>→</span>
                                <span style={{ fontWeight: 800, color: conn.color }}>{conn.to}</span>
                            </div>

                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                                <MathRenderer text={conn.note} />
                            </p>
                        </div>
                    ))}
                </div>

                {/* Real World Applications */}
                <h2 className={styles['chem-section-title']}>Real World Systems</h2>

                <div className={styles['chem-grid']} style={{ gap: '24px' }}>
                    {chemReactionsConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} className={styles['chem-realworld-card']}>
                            <div className={styles['chem-realworld-impact']}>Impact: {app.impact}</div>
                            <h3 className={styles['chem-realworld-title']}>{app.title}</h3>
                            <p className={styles['chem-realworld-desc']}><MathRenderer text={app.desc} /></p>
                        </div>
                    ))}
                </div>

                <div className={styles['chem-topic-banner']}>
                    <Share2 size={48} color="#6366f1" style={{ marginBottom: '16px' }} />
                    <h3>Infinite Connections</h3>
                    <p>
                        Chemical reactions aren't just a chapter; they're the underlying code for biology, engineering, and the universe. Every breath you take and every machine you use relies on the principles of molecular exchange.
                    </p>
                </div>
            </main>
        </div>
    );
}
