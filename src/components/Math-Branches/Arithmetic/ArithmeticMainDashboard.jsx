import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './arithmetic.module.css';

const BRANCHES = [
    {
        id: 'skill-sparks',
        path: '/arithmetic/sparks',
        label: 'Skill Sparks ⚡',
        emoji: '⚡',
        tagline: 'Interactive Playgrounds',
        desc: 'Explore highly immersive, interactive simulations for Arithmetic concepts.',
        gradFrom: '#f97316',
        gradTo: '#fde047',
        shadow: 'rgba(249,115,22,0.5)',
    },
    {
        id: 'natural-numbers',
        path: '/arithmetic/natural-numbers',
        label: 'Natural Numbers',
        emoji: '🌿',
        tagline: 'The Counting Numbers',
        desc: 'Understand the basic numbers used for counting and ordering (1, 2, 3...).',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.4)',
    },
    {
        id: 'integers',
        path: '/arithmetic/integers',
        label: 'Integers',
        emoji: '📉',
        tagline: 'Positives, Negatives, & Zero',
        desc: 'Explore the full spectrum of whole numbers extending into the negatives.',
        gradFrom: '#3b82f6',
        gradTo: '#60a5fa',
        shadow: 'rgba(59,130,246,0.4)',
    },
    {
        id: 'fractions',
        path: '/arithmetic/fractions',
        label: 'Fractions',
        emoji: '🍕',
        tagline: 'Parts of a Whole',
        desc: 'Master numerators, denominators, and basic rational expressions.',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245,158,11,0.4)',
    },
    {
        id: 'rational-numbers',
        path: '/arithmetic/rational-numbers',
        label: 'Rational Numbers',
        emoji: '⚖️',
        tagline: 'Ratios & Quotients',
        desc: 'Dive deeper into numbers that can be expressed as a ratio of two integers.',
        gradFrom: '#8b5cf6',
        gradTo: '#a78bfa',
        shadow: 'rgba(139,92,246,0.4)',
    },
    {
        id: 'irrational-numbers',
        path: '/arithmetic/irrational-numbers',
        label: 'Irrational Numbers',
        emoji: '🌀',
        tagline: 'Non-terminating & Non-repeating',
        desc: 'Discover roots, Pi, and numbers that cannot be written as simple fractions.',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.4)',
    },
    {
        id: 'lcm',
        path: '/arithmetic/lcm',
        label: 'LCM',
        emoji: '📐',
        tagline: 'Least Common Multiple',
        desc: 'Find the smallest common multiple linking multiple numbers together.',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.4)',
    },
    {
        id: 'hcf',
        path: '/arithmetic/hcf',
        label: 'HCF',
        emoji: '🔍',
        tagline: 'Highest Common Factor',
        desc: 'Identify the greatest divisor that perfectly divides two or more numbers.',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244,63,94,0.4)',
    },
];

const STATS = [
    { val: '7', label: 'Branches', color: '#0ea5e9' },
    { val: '21+', label: 'Topics', color: '#f43f5e' },
    { val: '∞', label: 'Practice', color: '#8b5cf6' },
];

export default function ArithmeticMainDashboard() {
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
                    <h1 className={styles.arithMainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',color:"white" }}>
                        Master
                        <br />
                        <span className={styles.arithTitleAccent}>Arithmetic</span>
                    </h1>

                    <p className={styles.arithMainSub}>
                        Arithmetic is the foundation of all mathematics. Select one of the core branches to begin your journey of numerical mastery.
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
