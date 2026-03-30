import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './MatterInOurSurroundingsDashboard.module.css';

const STATS = [
    { label: 'Core Concepts', num: '5', color: '#38bdf8' },
    { label: 'Practice Problems', num: '15+', color: '#0d9488' },
    { label: 'Virtual Lab', num: '1', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the physical nature of matter and the tiny particles that build our world.',
        icon: '🌟',
        color: '#38bdf8',
        path: '/senior/grade/9/science/matter-in-our-surroundings/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key terms — from diffusion and sublimation to latent heat.',
        icon: '📖',
        color: '#0891b2',
        path: '/senior/grade/9/science/matter-in-our-surroundings/terminology'
    },
    {
        id: 'core-concepts',
        title: 'Core Concepts',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into states of matter, interconversion, and evaporation.',
        icon: '🎯',
        color: '#0369a1',
        path: '/senior/grade/9/science/matter-in-our-surroundings/core-concepts'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See the mind map linking particles, states, and energy.',
        icon: '🔗',
        color: '#0284c7',
        path: '/senior/grade/9/science/matter-in-our-surroundings/connectomics'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with a 10-question MCQ quiz on matter.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/9/science/matter-in-our-surroundings/exam-edge'
    },
    {
        id: 'virtual-lab',
        title: 'Virtual Lab',
        tagline: 'HANDS-ON SCIENCE',
        desc: 'Run animated experiments to see how particles behave.',
        icon: '🧪',
        color: '#0ea5e9',
        path: '/senior/grade/9/science/matter-in-our-surroundings/virtual-lab'
    }
];

export default function MatterInOurSurroundingsDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['matter-fullpage']}>
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className={styles['matter-left']}>
                <div className={`${styles['matter-deco']} ${styles['matter-deco-a']}`} />
                <div className={`${styles['matter-deco']} ${styles['matter-deco-b']}`} />

                <div className={styles['matter-left-content']}>
                    <button 
                        className={styles['matter-nav-back']} 
                        onClick={() => navigate('/senior/grade/9')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 9 Science
                    </button>

                    <h1 className={styles['matter-main-title']}>
                        Master <br />
                        <span className={styles['matter-title-accent']}>Matter in Our Surroundings</span>
                    </h1>
                    <p className={styles['matter-main-sub']}>
                        From the tiny particles in a drop of water to the states of matter — 
                        explore, simulate, and master the building blocks of the universe.
                    </p>

                    <div className={styles['matter-stats-grid']}>
                        {STATS.map((s, idx) => (
                            <div key={idx} className={styles['matter-stat']}>
                                <span className={styles['matter-stat-num']}>{s.num}</span>
                                <span className={styles['matter-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className={styles['matter-right']}>
                <div className={styles['matter-right-eyebrow']}>CHOOSE YOUR PATH</div>
                
                <div className={styles['matter-cards-col']}>
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className={styles['matter-card-btn']}
                            onClick={() => navigate(m.path)}
                        >
                            <div className={styles['matter-dashboard-card-strip']} style={{ background: m.color }} />
                            <div className={styles['matter-card-icon']} style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className={styles['matter-card-text']}>
                                <div className={styles['matter-card-tagline']}>{m.tagline}</div>
                                <div className={styles['matter-card-label']}>{m.title}</div>
                                <div className={styles['matter-card-desc']}>{m.desc}</div>
                            </div>
                            <div className={styles['matter-card-chevron']}>
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
