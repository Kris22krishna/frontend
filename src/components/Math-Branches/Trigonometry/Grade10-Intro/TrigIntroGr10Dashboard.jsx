import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../trigonometry.module.css';

export default function TrigIntroGr10Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const CARDS = [
        {
            id: 'intro',
            path: '/trigonometry/grade-10-intro/introduction',
            tagline: 'Learn',
            title: 'Introduction',
            desc: 'Discover the history, purpose, and fundamentals of trigonometry through 6 big questions.',
            emoji: '💡',
            gradFrom: '#7c3aed',
            gradTo: '#7c3aedCC',
            shadow: '#7c3aed44'
        },
        {
            id: 'terms',
            path: '/trigonometry/grade-10-intro/terminology',
            tagline: 'Memory',
            title: 'Terminology',
            desc: 'Master sin, cos, tan, cosec, sec, cot, and the standard angle table.',
            emoji: '🧠',
            gradFrom: '#6366f1',
            gradTo: '#6366f1CC',
            shadow: '#6366f144'
        },
        {
            id: 'skills',
            path: '/trigonometry/grade-10-intro/skills',
            tagline: 'Practice & Test',
            title: 'Skills',
            desc: 'Solve trig ratio problems, apply identities, and tackle angle/distance word problems.',
            emoji: '🎯',
            gradFrom: '#0ea5e9',
            gradTo: '#0ea5e9CC',
            shadow: '#0ea5e944'
        }
    ];

    return (
        <div className={styles.arithFullpage}>
            <div className={styles.arithLeft} style={{ background: 'linear-gradient(145deg, #020617 0%, #0f172a 25%, #1e1b4b 55%, #4c1d95 80%, #7c3aed 100%)' }}>
                <div className={`${styles.arithDeco} ${styles.arithDecoA}`} />
                <div className={`${styles.arithDeco} ${styles.arithDecoB}`} />

                <div className={styles.arithLeftContent}>
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        <span style={{ fontSize: '0.9rem', display: 'block', marginBottom: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800 }}>Grade 10 · Branch 1</span>
                        Introduction to
                        <br />
                        <span className={styles.arithTitleAccent}>Trigonometry</span>
                    </h1>

                    <p className={styles.arithMainSub}>
                        Study the relationship between angles and sides of right triangles. Learn sin, cos, tan and unlock the standard angle table.
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

                <p className={styles.arithRightEyebrow}>Explore Introduction to Trigonometry</p>

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
