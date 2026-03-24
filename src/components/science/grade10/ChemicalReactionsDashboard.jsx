import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './ChemicalReactionsDashboard.module.css';

const STATS = [
    { label: 'Core Modules', num: '5', color: '#f97316' },
    { label: 'Lab Experiments', num: '4', color: '#38bdf8' },
    { label: 'Reaction Types', num: '5', color: '#a3e635' },
    { label: 'Quiz Questions', num: '10', color: '#818cf8' },
];

const MODULES = [
    {
        id: 'introduction',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the 5W1H framework, prerequisites, and what makes chemical reactions special.',
        icon: '🌟',
        color: '#f97316',
        path: '/senior/grade/10/science/chemical-reactions/introduction',
    },
    {
        id: 'terminology',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master 10 key terms — from reactants and products to redox and precipitation.',
        icon: '📖',
        color: '#38bdf8',
        path: '/senior/grade/10/science/chemical-reactions/terminology',
    },
    {
        id: 'skills',
        title: 'Skills & Virtual Lab',
        tagline: 'HANDS-ON SCIENCE',
        desc: 'Run 4 animated experiments, master 6 core skills, and learn the Golden Rules.',
        icon: '🧪',
        color: '#a3e635',
        path: '/senior/grade/10/science/chemical-reactions/skills',
    },
    {
        id: 'connectomics',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See the mind map linking equations, reaction types, energy, and everyday life.',
        icon: '🔗',
        color: '#818cf8',
        path: '/senior/grade/10/science/chemical-reactions/connectomics',
    },
    {
        id: 'exam-edge',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Balance equations interactively and take the 10-question vocabulary challenge.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/10/science/chemical-reactions/exam-edge',
    },
];

export default function ChemicalReactionsDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.chemRoot}>
            <div className={styles.chemFullPage}>
                {/* ── LEFT: Hero Panel ── */}
                <div className={styles.chemLeft}>
                    <div className={`${styles.chemDeco} ${styles.chemDecoA}`} />
                    <div className={`${styles.chemDeco} ${styles.chemDecoB}`} />

                    <div className={styles.chemLeftContent}>
                        <button
                            className={styles.chemNavBack}
                            onClick={() => navigate('/senior/grade/10')}
                        >
                            ← Grade 10 Science
                        </button>

                        <div className={styles.chemBadgePill}>
                            Chapter 1 · Class 10 Science
                        </div>

                        <h1 className={styles.chemMainTitle}>
                            Master{' '}
                            <span className={styles.chemTitleAccent}>
                                Chemical Reactions &amp; Equations
                            </span>
                        </h1>

                        <p className={styles.chemMainSub}>
                            From burning magnesium to electrolysis — explore, simulate, and
                            master the science of molecular transformation.
                        </p>

                        <div className={styles.chemStatsGrid}>
                            {STATS.map((s, idx) => (
                                <div key={idx} className={styles.chemStat}>
                                    <span className={styles.chemStatNum} style={{ color: s.color }}>
                                        {s.num}
                                    </span>
                                    <span className={styles.chemStatLbl}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Modules Panel ── */}
                <div className={styles.chemRight}>
                    <div className={styles.chemRightEyebrow}>Choose Your Path</div>
                    <div className={styles.chemCardsCol}>
                        {MODULES.map((m) => (
                            <button
                                key={m.id}
                                className={styles.chemCardBtn}
                                onClick={() => navigate(m.path)}
                            >
                                <div
                                    className={styles.chemCardStrip}
                                    style={{ background: m.color }}
                                />
                                <div
                                    className={styles.chemCardIcon}
                                    style={{
                                        background: `${m.color}18`,
                                        color: m.color,
                                    }}
                                >
                                    {m.icon}
                                </div>
                                <div className={styles.chemCardText}>
                                    <div className={styles.chemCardTagline}>{m.tagline}</div>
                                    <div className={styles.chemCardLabel}>{m.title}</div>
                                    <div className={styles.chemCardDesc}>{m.desc}</div>
                                </div>
                                <div className={styles.chemCardChevron}>
                                    <ChevronRight size={28} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
