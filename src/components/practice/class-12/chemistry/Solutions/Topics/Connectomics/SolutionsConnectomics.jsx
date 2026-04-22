import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { solutionsConnectomicsData } from './SolutionsConnectomicsData';
import styles from '../../SolutionsDashboard.module.css';
import MathRenderer from '../../../../../../MathRenderer';
import { Share2 } from 'lucide-react';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { SLUG_TO_NODE_ID } from '@/lib/curriculumIds';

export default function SolutionsConnectomics() {
    const navigate = useNavigate();

    const { startSession, abandonSession } = useSessionLogger();
    const nodeId = SLUG_TO_NODE_ID['g12-chem-solutions-connectomics'];

    useEffect(() => {
        window.scrollTo(0, 0);
        startSession({ nodeId, sessionType: 'practice' });
        return () => abandonSession({ totalQuestions: 1 });
    }, [nodeId, startSession, abandonSession]);

    return (
        <div className={styles['sol-page']}>
            <nav className={styles['sol-nav']}>
                <button className={styles['sol-nav-back']} onClick={() => navigate('/senior/grade/12/chemistry/solutions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['sol-nav-links']}>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/introduction')}>🌟 Intro</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/terminology')}>📖 Terminology</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={`${styles['sol-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/12/chemistry/solutions/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/exam-edge')}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles['sol-hero']}>
                <h1 className={styles['sol-hero-title']}>Solutions <span className={styles['sol-hero-accent--amber']}>Connectomics</span></h1>
                <p className={styles['sol-hero-sub']}>Discover the hidden threads linking physical chemistry to biology, medicine, and engineering.</p>
            </div>

            <main className={styles['sol-topic-shell']}>

                {/* Connections Map */}
                <h2 className={styles['sol-section-title']}>The Web of Chemistry</h2>

                <div className={styles['sol-grid']} style={{ gap: '24px', marginBottom: '60px', padding: 0 }}>
                    {solutionsConnectomicsData.connections.map((conn, idx) => (
                        <div key={idx} className={styles['sol-connection-card']}>
                            <div className={styles['sol-connection-strip']} style={{ background: conn.color }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div className={styles['sol-connection-type']} style={{ background: `${conn.color}15`, color: conn.color }}>
                                    {conn.type}
                                </div>
                            </div>

                            <div className={styles['sol-connection-path']} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
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
                <h2 className={styles['sol-section-title']}>Real World Systems</h2>

                <div className={styles['sol-grid']} style={{ gap: '24px' }}>
                    {solutionsConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} className={styles['sol-realworld-card']}>
                            <div className={styles['sol-realworld-impact']}>Impact: {app.impact}</div>
                            <h3 className={styles['sol-realworld-title']}>{app.title}</h3>
                            <p className={styles['sol-realworld-desc']}><MathRenderer text={app.desc} /></p>
                        </div>
                    ))}
                </div>

                <div className={styles['sol-topic-banner']}>
                    <Share2 size={48} color="#6366f1" style={{ marginBottom: '16px' }} />
                    <h3>Infinite Connections</h3>
                    <p>
                        Physical chemistry isn't just equations on a chalkboard; it's the underlying code for human physiology, global water access, and advanced automotive engineering. Understanding solutions unlocks the ability to manipulate these real-world systems.
                    </p>
                </div>
            </main>
        </div>
    );
}
