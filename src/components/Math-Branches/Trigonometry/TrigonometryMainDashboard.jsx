import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './trigonometry.module.css';

const BRANCHES = [
    {
        id: 'trig-sparks',
        path: '/trigonometry/sparks',
        label: 'Skill Sparks ⚡',
        emoji: '⚡',
        tagline: 'Interactive Playgrounds',
        desc: 'Explore immersive, interactive simulations for Trigonometry concepts.',
        gradFrom: '#f97316',
        gradTo: '#fde047',
        shadow: 'rgba(249,115,22,0.5)',
    },
    {
        id: 'trig-gr10-intro',
        path: '/trigonometry/grade-10-intro',
        label: 'Introduction to Trigonometry',
        emoji: '📐',
        tagline: 'Grade 10 · Right Triangles & Ratios',
        desc: 'Master sin, cos, tan and the standard angle table. The foundation of all trig.',
        gradFrom: '#7c3aed',
        gradTo: '#a78bfa',
        shadow: 'rgba(124,58,237,0.4)',
    },
    {
        id: 'trig-gr10-apps',
        path: '/trigonometry/grade-10-applications',
        label: 'Applications of Trigonometry',
        emoji: '🏗️',
        tagline: 'Grade 10 · Heights & Distances',
        desc: 'Use angles of elevation and depression to solve real-world distance problems.',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.4)',
    },
    {
        id: 'trig-gr11-funcs',
        path: '/trigonometry/grade-11-functions',
        label: 'Trigonometric Functions',
        emoji: '🌊',
        tagline: 'Grade 11 · Radians, Graphs & Equations',
        desc: 'Extend trig to all real angles, study wave graphs, and solve trig equations.',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.4)',
    },
    {
        id: 'trig-gr12-inv',
        path: '/trigonometry/grade-12-inverse',
        label: 'Inverse Trigonometric Functions',
        emoji: '🔄',
        tagline: 'Grade 12 · Principal Values & Identities',
        desc: 'Understand sin⁻¹, cos⁻¹, tan⁻¹ — their domains, ranges, and compositions.',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.4)',
    },
];

const STATS = [
    { val: '4', label: 'Branches', color: '#a78bfa' },
    { val: '18+', label: 'Topics', color: '#38bdf8' },
    { val: '∞', label: 'Practice', color: '#34d399' },
];

export default function TrigonometryMainDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.arithFullpage}>
            <div className={styles.arithLeft}>
                <div className={`${styles.arithDeco} ${styles.arithDecoA}`} />
                <div className={`${styles.arithDeco} ${styles.arithDecoB}`} />

                <div className={styles.arithLeftContent}>
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', color: 'white' }}>
                        Master
                        <br />
                        <span className={styles.arithTitleAccent}>Trigonometry</span>
                    </h1>

                    <p className={styles.arithMainSub}>
                        From right triangle ratios in Grade 10 to inverse functions in Grade 12 — explore the full scope of trigonometry, one branch at a time.
                    </p>

                    <div className={styles.arithStatsGrid}>
                        {STATS.map((item) => (
                            <div className={styles.arithStat} key={item.label}>
                                <span className={styles.arithStatNum} style={{ color: item.color }}>
                                    {item.val}
                                </span>
                                <span className={styles.arithStatLbl}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.arithRight}>
                <button onClick={() => navigate('/')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 18px', borderRadius: 100, width: 'fit-content',
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    fontSize: 14, fontWeight: 700, color: '#334155',
                    cursor: 'pointer', marginBottom: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>🏠 Back</button>
                <p className={styles.arithRightEyebrow}>Choose a branch to explore</p>

                <div className={styles.arithCardsCol}>
                    {BRANCHES.map((branchItem) => (
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
                                    {branchItem.label}
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
