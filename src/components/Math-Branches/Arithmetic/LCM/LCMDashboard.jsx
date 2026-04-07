import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../arithmetic.module.css'; // relative to this file
import { BookOpen, Target, Brain, ArrowLeft } from 'lucide-react';

export default function LCMDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const CARDS = [
        {
            id: 'intro',
            path: '/arithmetic/lcm/introduction',
            tagline: 'Learn',
            title: 'Introduction',
            desc: 'Understand why and how we find the smallest number that two or more numbers share as a multiple.',
            emoji: '💡',
            gradFrom: '#0ea5e9',
            gradTo: '#0ea5e9CC',
            shadow: '#0ea5e944'
        },
        {
            id: 'terms',
            path: '/arithmetic/lcm/terminology',
            tagline: 'Memory',
            title: 'Terminology',
            desc: 'Master the language of multiples, common multiples, and prime factorization.',
            emoji: '🧠',
            gradFrom: '#f59e0b',
            gradTo: '#f59e0bCC',
            shadow: '#f59e0b44'
        },
        {
            id: 'skills',
            path: '/arithmetic/lcm/skills',
            tagline: 'Practice & Test',
            title: 'Skills',
            desc: 'Calculate LCMs using listing, prime factorization, and the division method.',
            emoji: '🎯',
            gradFrom: '#22c55e',
            gradTo: '#22c55eCC',
            shadow: '#22c55e44'
        }
    ];

    return (
        <div className={styles.arithFullpage}>
            <div className={styles.arithLeft} style={{ background: 'linear-gradient(145deg, #020617 0%, #0f172a 25%, #0f766e 50%, #0e7490 75%, #0ea5e9 100%)' }}>
                <div className={`${styles.arithDeco} ${styles.arithDecoA}`} />
                <div className={`${styles.arithDeco} ${styles.arithDecoB}`} />

                <div className={styles.arithLeftContent}>
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        <span style={{ fontSize: '0.9rem', display: 'block', marginBottom: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 800 }}>Branch 6</span>
                        LCM
                        <br />
                        <span className={styles.arithTitleAccent} style={{ background: `linear-gradient(135deg, ${CARDS[0].gradFrom}, ${CARDS[2].gradFrom})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            
                        </span>
                    </h1>

                    <p className={styles.arithMainSub}>
                        Find the smallest number that is a multiple of two or more numbers — a fundamental tool for adding fractions, scheduling, and more.
                    </p>

                    <div className={styles.arithStatsGrid}>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[0].gradFrom }}>6</span>
                            <span className={styles.arithStatLbl}>Big Questions</span>
                        </div>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[1].gradFrom }}>4</span>
                            <span className={styles.arithStatLbl}>Key Terms</span>
                        </div>
                        <div className={styles.arithStat}>
                            <span className={styles.arithStatNum} style={{ color: CARDS[2].gradFrom }}>3</span>
                            <span className={styles.arithStatLbl}>Modes</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.arithRight}>
                <button onClick={() => navigate('/arithmetic/dashboard')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 18px', borderRadius: 100, width: 'fit-content',
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    fontSize: 14, fontWeight: 700, color: '#334155',
                    cursor: 'pointer', marginBottom: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>🏠 Dashboard</button>
                
                <p className={styles.arithRightEyebrow}>Explore LCM</p>

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
