import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './herons_formula_9.module.css';

export default function HeronsFormula9() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className={styles['fullpage']}>
            <div className={styles['left']}>
                <div className={`${styles['deco']} ${styles['deco-a']}`}></div>
                <div className={`${styles['deco']} ${styles['deco-b']}`}></div>
                <div className={`${styles['deco']} ${styles['deco-c']}`}></div>

                <button className={styles['nav-back-abs']} onClick={() => navigate('/senior/grade/9')}>
                    ← Back to Syllabus
                </button>
                <div className={styles['left-content']}>
                    <h1 className={styles['main-title']}>
                        Master <br />
                        <span className={styles['title-accent']}>Heron's Formula</span>
                    </h1>
                    <p className={styles['main-sub']}>
                        Calculate the area of any triangle using just its three sides — no height needed.
                    </p>
                    <div className={styles['stats-grid']}>
                        <div className={styles['stat']}>
                            <div className={styles['stat-num']}>3</div>
                            <div className={styles['stat-lbl']}>Topics</div>
                        </div>
                        <div className={styles['stat']}>
                            <div className={styles['stat-num']}>3</div>
                            <div className={styles['stat-lbl']}>Sections</div>
                        </div>
                        <div className={styles['stat']}>
                            <div className={styles['stat-num']}>60</div>
                            <div className={styles['stat-lbl']}>Q's</div>
                        </div>
                        <div className={styles['stat']}>
                            <div className={styles['stat-num']}>∞</div>
                            <div className={styles['stat-lbl']}>Attempts</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['right']}>
                <div className={styles['right-header']}>
                    <h2 className={styles['right-title']}>
                        Heron's <span className={styles['right-title-accent']}>Formula</span>
                    </h2>
                    <p className={styles['right-subtitle']}>
                        Follow the sequence below to build a strong foundation.
                    </p>
                </div>

                <div className={styles['cards-col']}>
                    {/* Introduction */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/herons-formula/intro')}>
                        <div className={styles['card-strip']} style={{ background: '#f59e0b' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#fef3c7', color: '#d97706' }}>
                            🌟
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>The 6 Big Questions</div>
                            <div className={styles['card-label']}>Introduction</div>
                            <div className={styles['card-desc']}>
                                Start here! Discover what Heron's Formula is, who invented it, and why it's a breakthrough for area calculation.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#f59e0b' }}>›</div>
                    </button>

                    {/* Terminology */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/herons-formula/terminology')}>
                        <div className={styles['card-strip']} style={{ background: '#6366f1' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#eef2ff', color: '#4f46e5' }}>
                            📖
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Key Terms & Concepts</div>
                            <div className={styles['card-label']}>Terminology</div>
                            <div className={styles['card-desc']}>
                                Learn the vocabulary of triangles: semi-perimeter, scalene, equilateral — and test yourself with a quiz.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#6366f1' }}>›</div>
                    </button>

                    {/* Skills */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/herons-formula/skills')}>
                        <div className={styles['card-strip']} style={{ background: '#10b981' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#ecfdf5', color: '#059669' }}>
                            🎯
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Practice & Assessment</div>
                            <div className={styles['card-label']}>Skills</div>
                            <div className={styles['card-desc']}>
                                Apply Heron's Formula to scalene, equilateral, and isosceles triangles. Solve real-world area problems.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#10b981' }}>›</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
