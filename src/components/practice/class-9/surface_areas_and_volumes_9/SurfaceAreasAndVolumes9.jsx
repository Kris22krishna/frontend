import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './surface_areas_and_volumes_9.module.css';

export default function SurfaceAreasAndVolumes9() {
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
                        <span className={styles['title-accent']}>Surface Areas & Volumes</span>
                    </h1>
                    <p className={styles['main-sub']}>
                        Calculate measurements of 3D objects — Cones, Spheres, and Hemispheres — and apply them to real-world scenarios.
                    </p>
                    <div className={styles['stats-grid']}>
                        <div className={styles['stat']}>
                            <div className={styles['stat-num']}>4</div>
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
                        Surface Areas & <span className={styles['right-title-accent']}>Volumes</span>
                    </h2>
                    <p className={styles['right-subtitle']}>
                        Follow the sequence below to build a strong foundation.
                    </p>
                </div>

                <div className={styles['cards-col']}>
                    {/* Introduction */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/intro')}>
                        <div className={styles['card-strip']} style={{ background: '#f59e0b' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#fef3c7', color: '#d97706' }}>
                            🌟
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>The 6 Big Questions</div>
                            <div className={styles['card-label']}>Introduction</div>
                            <div className={styles['card-desc']}>
                                Start here! Discover what Surface Areas and Volumes are, where they appear in real life, and why they matter.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#f59e0b' }}>›</div>
                    </button>

                    {/* Terminology */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/terminology')}>
                        <div className={styles['card-strip']} style={{ background: '#3b82f6' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#eff6ff', color: '#2563eb' }}>
                            📖
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Cones, Spheres & Hemispheres</div>
                            <div className={styles['card-label']}>Terminology</div>
                            <div className={styles['card-desc']}>
                                Learn the key vocabulary: Slant Height, Radius, Height, and all the surface area & volume formulas.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#3b82f6' }}>›</div>
                    </button>

                    {/* Skills */}
                    <button className={styles['card-btn']} onClick={() => navigate('/practice/class-9/surface-areas-and-volumes/skills')}>
                        <div className={styles['card-strip']} style={{ background: '#8b5cf6' }}></div>
                        <div className={styles['card-icon']} style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                            🎯
                        </div>
                        <div className={styles['card-text']}>
                            <div className={styles['card-tagline']}>Learn & Practice</div>
                            <div className={styles['card-label']}>Skills</div>
                            <div className={styles['card-desc']}>
                                Put your knowledge to the test with 60+ dynamic questions on Cones, Spheres, and Real-World Applications.
                            </div>
                        </div>
                        <div className={styles['card-chevron']} style={{ color: '#8b5cf6' }}>›</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
