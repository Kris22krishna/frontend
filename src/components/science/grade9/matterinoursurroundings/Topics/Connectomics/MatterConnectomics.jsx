import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { matterConnectomicsData } from './MatterConnectomicsData';
import styles from '../../MatterInOurSurroundingsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { Share2 } from 'lucide-react';

export default function MatterConnectomics() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['matter-page']}>
            <nav className={styles['matter-nav']}>
                <button className={styles['matter-nav-back']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['matter-nav-links']}>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/introduction')}>🌟 Intro</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/terminology')}>📖 Terminology</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/core-concepts')}>🎯 Core Concepts</button>
                    <button className={`${styles['matter-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/connectomics')}>🔗 Connectomics</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['matter-hero']}>
                <h1 className={styles['matter-hero-title']}>Matter <span style={{ color: '#0ea5e9' }}>Connectomics</span></h1>
                <p className={styles['matter-hero-sub']}>Discover the hidden threads linking physical states to the entire world of science.</p>
            </div>

            <main className={styles['matter-topic-shell']}>

                <h2 className={styles['matter-section-title']}>The Particle Web</h2>

                <div className={styles['matter-grid']} style={{ gap: '24px', marginBottom: '60px' }}>
                    {matterConnectomicsData.connections.map((conn, idx) => (
                        <div key={idx} className={styles['matter-connection-card']}>
                            <div className={styles['matter-connection-strip']} style={{ background: conn.color }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div className={styles['matter-connection-type']} style={{ background: `${conn.color}15`, color: conn.color }}>
                                    {conn.type}
                                </div>
                            </div>

                            <div className={styles['matter-connection-path']} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
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

                <h2 className={styles['matter-section-title']}>Real World Systems</h2>

                <div className={styles['matter-grid']} style={{ gap: '24px' }}>
                    {matterConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} className={styles['matter-realworld-card']}>
                            <div className={styles['matter-realworld-impact']}>Impact: {app.impact}</div>
                            <h3 className={styles['matter-realworld-title']}>{app.title}</h3>
                            <p className={styles['matter-realworld-desc']}><MathRenderer text={app.desc} /></p>
                        </div>
                    ))}
                </div>

                <div className={styles['matter-topic-banner']}>
                    <Share2 size={48} color="#0ea5e9" style={{ marginBottom: '16px' }} />
                    <h3>Infinite States</h3>
                    <p>
                        Matter is more than just solid, liquid, or gas; it's the dynamic dance of particles that defines our universe. From the high-tech superconductors to the simple act of breathing, everything is matter in motion.
                    </p>
                </div>
            </main>
        </div>
    );
}
