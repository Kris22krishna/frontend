import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../trigonometry.module.css';

export default function TrigAppGr10Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const CARDS = [
        {
            id: 'intro',
            path: '/trigonometry/grade-10-applications/introduction',
            tagline: 'Learn',
            title: 'Introduction',
            desc: 'Understand how trigonometry is used to measure heights and distances without actually measuring them.',
            emoji: '📏',
            gradFrom: '#0ea5e9',
            gradTo: '#0ea5e9CC',
            shadow: '#0ea5e944'
        },
        {
            id: 'terms',
            path: '/trigonometry/grade-10-applications/terminology',
            tagline: 'Memory',
            title: 'Terminology',
            desc: 'Review angle of elevation, angle of depression, and line of sight.',
            emoji: '🧠',
            gradFrom: '#10b981',
            gradTo: '#10b981CC',
            shadow: '#10b98144'
        },
        {
            id: 'skills',
            path: '/trigonometry/grade-10-applications/skills',
            tagline: 'Practice & Test',
            title: 'Skills',
            desc: 'Solve simple and multi-step height and distance problems.',
            emoji: '🎯',
            gradFrom: '#8b5cf6',
            gradTo: '#8b5cf6CC',
            shadow: '#8b5cf644'
        }
    ];

    return (
        <div className={styles.arithFullpage}>
            <div className={styles.arithLeft} style={{ background: 'linear-gradient(145deg, #020617 0%, #0f172a 25%, #0f766e 65%, #0ea5e9 100%)' }}>
                <div className={`${styles.arithDeco} ${styles.arithDecoA}`} />
                <div className={`${styles.arithDeco} ${styles.arithDecoB}`} />

                <div className={styles.arithLeftContent}>
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        <span style={{ fontSize: '0.9rem', display: 'block', marginBottom: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800 }}>Grade 10 · Branch 2</span>
                        Applications of
                        <br />
                        <span className={styles.arithTitleAccent} style={{ background: 'linear-gradient(135deg, #7dd3fc, #bae6fd)', WebkitBackgroundClip: 'text' }}>Trigonometry</span>
                    </h1>

                    <p className={styles.arithMainSub}>
                        Apply trigonometric ratios to solve real-world problems involving heights, distances, and angles of elevation or depression.
                    </p>

                    <div className={styles.arithStatsGrid}>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[0].gradFrom }}>6</span>
                            <span className={styles.arithStatLbl}>Big Questions</span>
                        </div>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[1].gradFrom }}>6</span>
                            <span className={styles.arithStatLbl}>Key Terms</span>
                        </div>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[2].gradFrom }}>2</span>
                            <span className={styles.arithStatLbl}>Skills</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.arithRight}>
                <button onClick={() => navigate('/trigonometry/dashboard')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 18px', borderRadius: 100, width: 'fit-content',
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    fontSize: 14, fontWeight: 700, color: '#334155',
                    cursor: 'pointer', marginBottom: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>🏠 Dashboard</button>

                <p className={styles.arithRightEyebrow}>Explore Applications of Trigonometry</p>

                <div className={styles.arithCardsCol}>
                    {CARDS.map((branchItem) => (
                        <button
                            key={branchItem.id}
                            className={styles.arithCardBtn}
                            onClick={() => navigate(branchItem.path)}
                        >
                            <div
                                className={styles.arithCardStrip}
                                style={{ background: `linear-gradient(180deg, ${branchItem.gradFrom}, ${branchItem.gradTo})` }}
                            />

                            <div
                                className={styles.arithCardIcon}
                                style={{
                                    background: `linear-gradient(135deg, ${branchItem.gradFrom}, ${branchItem.gradTo})`,
                                    boxShadow: `0 6px 20px ${branchItem.shadow}`,
                                }}
                            >
                                {branchItem.emoji}
                            </div>

                            <div className={styles.arithCardText}>
                                <div className={styles.arithCardLabel} style={{ color: branchItem.gradFrom }}>
                                    {branchItem.title}
                                </div>
                                <div className={styles.arithCardTagline}>{branchItem.tagline}</div>
                                <div className={styles.arithCardDesc}>{branchItem.desc}</div>
                            </div>

                            <div className={styles.arithCardChevron} style={{ color: branchItem.gradFrom }}>
                                {'>'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
