import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './statistics_9.module.css';

export default function Statistics9() {
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
                        <span className={styles['title-accent']}>Statistics</span>
                    </h1>
                    <p className={styles['main-sub']}>
                        Master the graphical representation of data including Bar Graphs, Histograms, and Frequency Polygons.
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
                        Grade 9 <span className={styles['right-title-accent']}>Statistics</span>
                    </h2>
                    <p className={styles['right-subtitle']}>
                        Follow the sequence below to build a strong foundation.
                    </p>
                </div>

                <div className={styles['cards-col']}>
                    {/* Introduction */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/statistics/intro')}>
                        <div className={styles['card-strip']} style={{ background: '#f59e0b' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#fef3c7', color: '#d97706' }}>
                            🌟
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Data Visualization</div>
                            <div className={styles['card-label']}>Introduction</div>
                            <div className={styles['card-desc']}>
                                Start here! Discover why we visualize data, and learn the differences between different charts.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#f59e0b' }}>›</div>
                    </button>

                    {/* Terminology */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/statistics/terminology')}>
                        <div className={styles['card-strip']} style={{ background: '#3b82f6' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#eff6ff', color: '#2563eb' }}>
                            📖
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Charts & Graphs</div>
                            <div className={styles['card-label']}>Terminology</div>
                            <div className={styles['card-desc']}>
                                Learn the anatomy of Bar Graphs, continuous Histograms, adjusted widths, and Frequency Polygons.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#3b82f6' }}>›</div>
                    </button>

                    {/* Skills */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/statistics/skills')}>
                        <div className={styles['card-strip']} style={{ background: '#8b5cf6' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                            🎯
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Learn & Practice</div>
                            <div className={styles['card-label']}>Skills</div>
                            <div className={styles['card-desc']}>
                                Put your knowledge to the test. Read plots, estimate frequencies, and calculate proportional widths.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#8b5cf6' }}>›</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
