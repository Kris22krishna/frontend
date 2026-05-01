import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../trigonometry.module.css';

export default function TrigFuncGr11Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const CARDS = [
        {
            id: 'intro',
            path: '/trigonometry/grade-11-functions/introduction',
            tagline: 'Learn',
            title: 'Introduction',
            desc: 'Expand trigonometry from right triangles to all real numbers using radians and the unit circle.',
            emoji: '🔄',
            gradFrom: '#10b981',
            gradTo: '#10b981CC',
            shadow: '#10b98144'
        },
        {
            id: 'terms',
            path: '/trigonometry/grade-11-functions/terminology',
            tagline: 'Memory',
            title: 'Terminology',
            desc: 'Master radians, periodicity, amplitude, domains, ranges, and sign conventions across quadrants.',
            emoji: '🧠',
            gradFrom: '#f97316',
            gradTo: '#f97316CC',
            shadow: '#f9731644'
        },
        {
            id: 'skills',
            path: '/trigonometry/grade-11-functions/skills',
            tagline: 'Practice & Test',
            title: 'Skills',
            desc: 'Convert angles, graph sine and cosine waves, solve trigonometric equations, and use the Sine/Cosine rules.',
            emoji: '🎯',
            gradFrom: '#6366f1',
            gradTo: '#6366f1CC',
            shadow: '#6366f144'
        }
    ];

    return (
        <div className={styles.arithFullpage}>
            <div className={styles.arithLeft} style={{ background: 'linear-gradient(145deg, #020617 0%, #0f172a 25%, #1e1b4b 55%, #10b981 100%)' }}>
                <div className={`${styles.arithDeco} ${styles.arithDecoA}`} />
                <div className={`${styles.arithDeco} ${styles.arithDecoB}`} />

                <div className={styles.arithLeftContent}>
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        <span style={{ fontSize: '0.9rem', display: 'block', marginBottom: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800 }}>Grade 11 · Branch 3</span>
                        Trigonometric
                        <br />
                        <span className={styles.arithTitleAccent} style={{ background: 'linear-gradient(135deg, #34d399, #a7f3d0)', WebkitBackgroundClip: 'text' }}>Functions</span>
                    </h1>

                    <p className={styles.arithMainSub}>
                        Move beyond triangles. Use the unit circle to define trig functions for any angle, measure in radians, and study their wave-like graphs.
                    </p>

                    <div className={styles.arithStatsGrid}>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[0].gradFrom }}>6</span>
                            <span className={styles.arithStatLbl}>Big Questions</span>
                        </div>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[1].gradFrom }}>12</span>
                            <span className={styles.arithStatLbl}>Key Terms</span>
                        </div>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[2].gradFrom }}>4</span>
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

                <p className={styles.arithRightEyebrow}>Explore Trigonometric Functions</p>

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
