import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './understanding_quadrilaterals.module.css';
import { ChapterHeroFigure } from './QuadrilateralFigures';

const MODULES = [
    {
        id: 'introduction',
        icon: '🔷',
        label: 'Introduction',
        tagline: 'Module 1 · 6 Big Questions',
        desc: 'Discover the WHAT, WHO, WHEN, WHERE, WHY and HOW of polygons, diagonals, and quadrilaterals.',
        color: '#0f766e',
        path: '/senior/grade/8/understanding-quadrilaterals/introduction',
    },
    {
        id: 'terminology',
        icon: '📘',
        label: 'Terminology',
        tagline: 'Module 2 · 6 Terms · 2 Key Ideas',
        desc: 'Master the language of polygons, diagonals, trapeziums, and parallelograms.',
        color: '#1e40af',
        path: '/senior/grade/8/understanding-quadrilaterals/terminology',
    },
    {
        id: 'skills',
        icon: '🎯',
        label: 'Skills',
        tagline: 'Module 3 · 4 Skills · 80 Practice Questions',
        desc: 'Build mastery in diagonals, angle properties, classifying quadrilaterals, and parallelogram rules.',
        color: '#7c3aed',
        path: '/senior/grade/8/understanding-quadrilaterals/skills',
    },
];

const STATS = [
    { num: '6', lbl: 'Big Questions' },
    { num: '6', lbl: 'Key Terms' },
    { num: '2', lbl: 'Key Ideas' },
    { num: '4', lbl: 'Skills' },
    { num: '80', lbl: 'Practice Qs' },
];

export default function UnderstandingQuadrilaterals() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['ccr-fullpage']}>
            <div className={styles['ccr-left']}>
                <div className={`${styles['ccr-deco']} ${styles['ccr-deco-a']}`} />
                <div className={`${styles['ccr-deco']} ${styles['ccr-deco-b']}`} />
                <div className={`${styles['ccr-deco']} ${styles['ccr-deco-c']}`} />

                <button
                    onClick={() => navigate('/senior/grade/8')}
                    className={styles['ccr-nav-back-abs']}
                >
                    ← Back to Chapters
                </button>

                <div className={styles['ccr-left-content']}>
                    <h1 className={styles['ccr-main-title']}>
                        Master <span className={styles['ccr-title-accent']}>Understanding Quadrilaterals</span>
                    </h1>

                    <p className={styles['ccr-main-sub']}>
                        Polygons, diagonals, angle sums, and the family of special quadrilaterals.
                    </p>

                    <div className={styles['ccr-stats-grid']}>
                        {STATS.map((s) => (
                            <div key={s.lbl} className={styles['ccr-stat']}>
                                <span className={styles['ccr-stat-num']}>{s.num}</span>
                                <span className={styles['ccr-stat-lbl']}>{s.lbl}</span>
                            </div>
                        ))}
                    </div>

                  
                </div>
            </div>

            <div className={styles['ccr-right']}>
                <div className={styles['ccr-right-header']}>
                    <h2 className={styles['ccr-right-title']}>
                        Understanding{' '}
                        <span className={styles['ccr-right-title-accent']}>Quadrilaterals</span>
                    </h2>
                    <p className={styles['ccr-right-subtitle']}>
                        Start with the introduction, build your vocabulary, then sharpen all 4 skills.
                    </p>
                </div>

                <div className={styles['ccr-cards-col']}>
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className={styles['ccr-card-btn']}
                            onClick={() => navigate(mod.path)}
                        >
                            <div className={styles['ccr-card-strip']} style={{ background: mod.color }} />
                            <div className={styles['ccr-card-icon']} style={{ background: `${mod.color}15` }}>
                                {mod.icon}
                            </div>
                            <div className={styles['ccr-card-text']}>
                                <div className={styles['ccr-card-tagline']}>{mod.tagline}</div>
                                <div className={styles['ccr-card-label']} style={{ color: mod.color }}>{mod.label}</div>
                                <div className={styles['ccr-card-desc']}>{mod.desc}</div>
                            </div>
                            <div className={styles['ccr-card-chevron']} style={{ color: mod.color }}>›</div>
                        </button>
                    ))}
                </div>

                <p className={styles['ccr-footer-text']}>
                    📚 Based on NCERT Class 8 Mathematics — Chapter 3
                </p>
            </div>
        </div>
    );
}
