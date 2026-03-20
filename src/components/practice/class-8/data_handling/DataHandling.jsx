import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './data_handling.module.css';

const MODULES = [
    {
        id: 'introduction',
        icon: '🌟',
        label: 'Introduction',
        tagline: 'Module 1 · 6 Big Questions',
        desc: 'Discover the WHAT, WHO, WHEN, WHERE, WHY and HOW of Data Handling through real-world examples.',
        color: '#0f766e',
        path: '/senior/grade/8/data-handling/introduction',
    },
    {
        id: 'terminology',
        icon: '📖',
        label: 'Terminology',
        tagline: 'Module 2 · 6 Terms · 2 Key Ideas',
        desc: 'Master the language of frequency, bar graphs, pie charts, probability, and data organisation.',
        color: '#1e40af',
        path: '/senior/grade/8/data-handling/terminology',
    },
    {
        id: 'skills',
        icon: '🎯',
        label: 'Skills',
        tagline: 'Module 3 · 4 Skills · 80 Practice Questions',
        desc: 'Build mastery in Organising Data, Bar Graphs, Pie Charts, and Probability.',
        color: '#7c3aed',
        path: '/senior/grade/8/data-handling/skills',
    },
];

const STATS = [
    { num: '6', lbl: 'Big Questions' },
    { num: '6', lbl: 'Key Terms' },
    { num: '2', lbl: 'Key Ideas' },
    { num: '4', lbl: 'Skills' },
    { num: '80', lbl: 'Practice Qs' },
];

export default function DataHandling() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['dh-fullpage']}>
            {/* ── LEFT HERO ───────────────────────────────── */}
            <div className={styles['dh-left']}>
                <div className={`${styles['dh-deco']} ${styles['dh-deco-a']}`} />
                <div className={`${styles['dh-deco']} ${styles['dh-deco-b']}`} />
                <div className={`${styles['dh-deco']} ${styles['dh-deco-c']}`} />

                <button
                    onClick={() => navigate('/senior/grade/8')}
                    className={styles['dh-nav-back-abs']}
                >
                    ← Back to Chapters
                </button>

                <div className={styles['dh-left-content']}>
                    <h1 className={styles['dh-main-title']}>
                        Master <span className={styles['dh-title-accent']}>Data Handling</span>
                    </h1>

                    <p className={styles['dh-main-sub']}>
                        Frequency tables, bar graphs, pie charts, and probability — the maths of making sense of information.
                    </p>

                    <div className={styles['dh-stats-grid']}>
                        {STATS.map((s) => (
                            <div key={s.lbl} className={styles['dh-stat']}>
                                <span className={styles['dh-stat-num']}>{s.num}</span>
                                <span className={styles['dh-stat-lbl']}>{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: MODULE CARDS ─────────────────────── */}
            <div className={styles['dh-right']}>
                <div className={styles['dh-right-header']}>
                    <h2 className={styles['dh-right-title']}>
                        Data{' '}
                        <span className={styles['dh-right-title-accent']}>Handling</span>
                    </h2>
                    <p className={styles['dh-right-subtitle']}>
                        Start with the introduction, build your vocabulary, then sharpen all 4 skills.
                    </p>
                </div>

                <div className={styles['dh-cards-col']}>
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className={styles['dh-card-btn']}
                            onClick={() => navigate(mod.path)}
                        >
                            <div className={styles['dh-card-strip']} style={{ background: mod.color }} />
                            <div className={styles['dh-card-icon']} style={{ background: `${mod.color}15` }}>
                                {mod.icon}
                            </div>
                            <div className={styles['dh-card-text']}>
                                <div className={styles['dh-card-tagline']}>{mod.tagline}</div>
                                <div className={styles['dh-card-label']} style={{ color: mod.color }}>{mod.label}</div>
                                <div className={styles['dh-card-desc']}>{mod.desc}</div>
                            </div>
                            <div className={styles['dh-card-chevron']} style={{ color: mod.color }}>›</div>
                        </button>
                    ))}
                </div>

                <p className={styles['dh-footer-text']}>
                    📚 Based on NCERT Class 8 Mathematics — Chapter 5
                </p>
            </div>
        </div>
    );
}
