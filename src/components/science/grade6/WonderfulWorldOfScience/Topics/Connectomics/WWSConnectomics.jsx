import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wwsConnectomicsData } from './WWSConnectomicsData';
import styles from '../../WonderfulWorldOfScienceDashboard.module.css';
import { Share2 } from 'lucide-react';

export default function WWSConnectomics() {
    const navigate = useNavigate();
    const BASE = '/middle/grade/6/science/wonderful-world-of-science';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['wws-page']}>
            <nav className={styles['wws-nav']}>
                <button className={styles['wws-nav-back']} onClick={() => navigate(BASE)}>
                    ← Back to Dashboard
                </button>
                <div className={styles['wws-nav-links']}>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/core-concepts`)}>🎯 Core Concepts</button>
                    <button className={`${styles['wws-nav-link']} ${styles['active']}`} onClick={() => navigate(`${BASE}/connectomics`)}>🔗 Connectomics</button>
                    <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/virtual-lab`)}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['wws-hero']}>
                <h1 className={styles['wws-hero-title']}>Science <span className={styles['wws-hero-accent--amber']}>Connectomics</span></h1>
                <p className={styles['wws-hero-sub']}>Discover the hidden threads linking this chapter to the entire world around you.</p>
            </div>

            <main className={styles['wws-topic-shell']}>
                <h2 className={styles['wws-section-title']}>The Web of Science</h2>

                <div className={styles['wws-grid']} style={{ gap: '24px', marginBottom: '60px', padding: 0 }}>
                    {wwsConnectomicsData.connections.map((conn, idx) => (
                        <div key={idx} className={styles['wws-connection-card']}>
                            <div className={styles['wws-connection-strip']} style={{ background: conn.color }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div className={styles['wws-connection-type']} style={{ background: `${conn.color}15`, color: conn.color }}>
                                    {conn.type}
                                </div>
                            </div>

                            <div className={styles['wws-connection-path']} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <span style={{ fontWeight: 800, color: '#1e1b4b' }}>{conn.from}</span>
                                <span style={{ color: '#94a3b8' }}>→</span>
                                <span style={{ fontWeight: 800, color: conn.color }}>{conn.to}</span>
                            </div>

                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                                {conn.note}
                            </p>
                        </div>
                    ))}
                </div>

                <h2 className={styles['wws-section-title']}>Real World Systems</h2>

                <div className={styles['wws-grid']} style={{ gap: '24px' }}>
                    {wwsConnectomicsData.realWorld.map((app, idx) => (
                        <div key={idx} className={styles['wws-realworld-card']}>
                            <div className={styles['wws-realworld-impact']}>Impact: {app.impact}</div>
                            <h3 className={styles['wws-realworld-title']}>{app.title}</h3>
                            <p className={styles['wws-realworld-desc']}>{app.desc}</p>
                        </div>
                    ))}
                </div>

                <div className={styles['wws-topic-banner']}>
                    <Share2 size={48} color="#6366f1" style={{ marginBottom: '16px' }} />
                    <h3>Infinite Connections</h3>
                    <p>
                        Science isn't just a subject — it's the language of everything around you. From the food you eat to the stars you gaze at, every discovery is connected. Keep asking "Why?" and you'll see these connections everywhere!
                    </p>
                </div>
            </main>
        </div>
    );
}
