import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../trigonometry.module.css';

export default function InverseTrigGr12Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const CARDS = [
        {
            id: 'intro',
            path: '/trigonometry/grade-12-inverse/introduction',
            tagline: 'Learn',
            title: 'Introduction',
            desc: 'Understand why we need to restrict domains to create inverse trigonometric functions.',
            emoji: '🔄',
            gradFrom: '#ec4899',
            gradTo: '#ec4899CC',
            shadow: '#ec489944'
        },
        {
            id: 'terms',
            path: '/trigonometry/grade-12-inverse/terminology',
            tagline: 'Memory',
            title: 'Terminology',
            desc: 'Master the principal value branches, domains, and ranges for all six inverse functions.',
            emoji: '🧠',
            gradFrom: '#3b82f6',
            gradTo: '#3b82f6CC',
            shadow: '#3b82f644'
        },
        {
            id: 'skills',
            path: '/trigonometry/grade-12-inverse/skills',
            tagline: 'Practice & Test',
            title: 'Skills',
            desc: 'Evaluate principal values, solve composition problems, and apply inverse trig properties.',
            emoji: '🎯',
            gradFrom: '#10b981',
            gradTo: '#10b981CC',
            shadow: '#10b98144'
        }
    ];

    return (
        <div className={styles.arithFullpage}>
            <div className={styles.arithLeft} style={{ background: 'linear-gradient(145deg, #020617 0%, #1e1b4b 30%, #831843 70%, #ec4899 100%)' }}>
                <div className={`${styles.arithDeco} ${styles.arithDecoA}`} />
                <div className={`${styles.arithDeco} ${styles.arithDecoB}`} />

                <div className={styles.arithLeftContent}>
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        <span style={{ fontSize: '0.9rem', display: 'block', marginBottom: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800 }}>Grade 12 · Branch 4</span>
                        Inverse Trig
                        <br />
                        <span className={styles.arithTitleAccent} style={{ background: 'linear-gradient(135deg, #f472b6, #fbcfe8)', WebkitBackgroundClip: 'text' }}>Functions</span>
                    </h1>

                    <p className={styles.arithMainSub}>
                        Go backwards. If you know the ratio, find the angle. Learn how to restrict the periodic waves to make true, one-to-one inverse functions.
                    </p>

                    <div className={styles.arithStatsGrid}>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[0].gradFrom }}>6</span>
                            <span className={styles.arithStatLbl}>Big Questions</span>
                        </div>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[1].gradFrom }}>8</span>
                            <span className={styles.arithStatLbl}>Key Terms</span>
                        </div>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[2].gradFrom }}>3</span>
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

                <p className={styles.arithRightEyebrow}>Explore Inverse Trigonometry</p>

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
