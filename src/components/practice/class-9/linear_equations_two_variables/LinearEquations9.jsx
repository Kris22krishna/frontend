import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './linear_equations_9.module.css';

export default function LinearEquations9() {
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
                        <span className={styles['title-accent']}>Linear Equations</span>
                    </h1>
                    <p className={styles['main-sub']}>
                        Explore equations with two unknowns — graph them on the Cartesian plane, find their solutions, and master the standard form.
                    </p>
                    <div className={styles['stats-grid']}>
                        <div className={styles['stat']}>
                            <div className={styles['stat-num']}>4</div>
                            <div className={styles['stat-lbl']}>Skills</div>
                        </div>
                        <div className={styles['stat']}>
                            <div className={styles['stat-num']}>3</div>
                            <div className={styles['stat-lbl']}>Sections</div>
                        </div>
                        <div className={styles['stat']}>
                            <div className={styles['stat-num']}>80</div>
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
                        Linear Equations in <span className={styles['right-title-accent']}>Two Variables</span>
                    </h2>
                    <p className={styles['right-subtitle']}>
                        Follow the sequence below to build a strong foundation.
                    </p>
                </div>

                <div className={styles['cards-col']}>
                    {/* Introduction */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/intro')}>
                        <div className={styles['card-strip']} style={{ background: '#f59e0b' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#fef3c7', color: '#d97706' }}>
                            🌟
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>The 6 Big Questions</div>
                            <div className={styles['card-label']}>Introduction</div>
                            <div className={styles['card-desc']}>
                                Start here! Discover what Linear Equations are, who developed the concepts, and how they connect to the real world.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#f59e0b' }}>›</div>
                    </button>

                    {/* Terminology */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/terminology')}>
                        <div className={styles['card-strip']} style={{ background: '#3b82f6' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#eff6ff', color: '#2563eb' }}>
                            📖
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Equations, Solutions & Graphs</div>
                            <div className={styles['card-label']}>Terminology</div>
                            <div className={styles['card-desc']}>
                                Learn vital vocabulary like linear equation, solution, ordered pair, standard form, and intercepts.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#3b82f6' }}>›</div>
                    </button>

                    {/* Skills */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/skills')}>
                        <div className={styles['card-strip']} style={{ background: '#8b5cf6' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                            🎯
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Learn & Practice</div>
                            <div className={styles['card-label']}>Skills</div>
                            <div className={styles['card-desc']}>
                                Put your knowledge to the test. Find solutions, graph equations, and convert to standard form.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#8b5cf6' }}>›</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
