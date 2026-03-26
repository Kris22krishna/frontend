import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wonderfulWorldConnectomicsData } from './EverEvolvingScienceConnectomicsData';
import styles from '../../EverEvolvingScienceDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { Share2 } from 'lucide-react';

export default function EverEvolvingScienceConnectomics() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['chem-page']}>
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/introduction')}>🌟 Intro</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/core-concepts')}>🎯 Core Concepts</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/middle/grade/7/science/wonderful-world-science/connectomics')}>🔗 Connectomics</button>
                </div>
            </nav>

            <div className={styles['chem-hero']}>
                <h1 className={styles['chem-hero-title']}>Science <span className={styles['chem-hero-accent--amber']}>Connectomics</span></h1>
                <p className={styles['chem-hero-sub']}>Discover the hidden threads linking all branches of science together.</p>
            </div>

            <main className={styles['chem-topic-shell']}>

                {/* Connections Map */}
                <h2 className={styles['chem-section-title']}>The Web of Science</h2>

                <div className={styles['chem-grid']} style={{ gap: '24px', marginBottom: '60px', padding: 0 }}>
                    {wonderfulWorldConnectomicsData.connections.map((conn, idx) => (
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
                    {wonderfulWorldConnectomicsData.realWorld.map((app, idx) => (
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
                        Science isn't just a chapter — it's the underlying code for understanding everything around us. From the food you eat to the stars you see at night, every branch of science is interconnected. As you explore Grade 7, you'll discover that asking questions in one area leads to discoveries in another.
                    </p>
                </div>
            </main>
        </div>
    );
}
