import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './WaterEssenceOfLifeDashboard.module.css';

const STATS = [
    { label: 'Core Concepts', num: '3', color: '#0ea5e9' },
    { label: 'Practice Problems', num: '90+', color: '#10b981' },
    { label: 'Virtual Lab', num: '6', color: '#8b5cf6' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Discover the 5W1H of water — what it is, where it\'s found, and why every drop matters.',
        icon: '💧',
        color: '#0ea5e9',
        path: '/middle/grade/5/science/water-essence-of-life/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Learn key science words — from evaporation to ecosystem, aquifer to adaptation.',
        icon: '📖',
        color: '#0d9488',
        path: '/middle/grade/5/science/water-essence-of-life/terminology'
    },
    {
        id: 'core-concepts',
        title: 'Core Concepts',
        tagline: 'CORE PRACTICE',
        desc: 'Master water sources, the water cycle, states of water, and aquatic life.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/middle/grade/5/science/water-essence-of-life/core-concepts'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how water connects to biology, geography, and the environment around you.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/middle/grade/5/science/water-essence-of-life/connectomics'
    },
    {
        id: 'virtual-lab',
        title: 'Virtual Lab',
        tagline: 'HANDS-ON SCIENCE',
        desc: 'Simulate the water cycle, explore groundwater, trace river flows, and build food chains!',
        icon: '🧪',
        color: '#38bdf8',
        path: '/middle/grade/5/science/water-essence-of-life/virtual-lab'
    }
];

export default function WaterEssenceOfLifeDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['wel-fullpage']}>
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className={styles['wel-left']}>
                <div className={`${styles['wel-deco']} ${styles['wel-deco-a']}`} />
                <div className={`${styles['wel-deco']} ${styles['wel-deco-b']}`} />

                <div className={styles['wel-left-content']}>
                    <button 
                        className={styles['wel-nav-back']} 
                        onClick={() => navigate('/middle/grade/5')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 5 Science
                    </button>

                    <h1 className={styles['wel-main-title']}>
                        Explore <br />
                        <span className={styles['wel-title-accent']}>Water — The Essence of Life</span>
                    </h1>
                    <p className={styles['wel-main-sub']}>
                        From rain to rivers, ice to steam — discover why water is 
                        the most precious resource on our planet.
                    </p>

                    <div className={styles['wel-stats-grid']}>
                        {STATS.map((s, idx) => (
                            <div key={idx} className={styles['wel-stat']}>
                                <span className={styles['wel-stat-num']}>{s.num}</span>
                                <span className={styles['wel-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className={styles['wel-right']}>
                <div className={styles['wel-right-eyebrow']}>CHOOSE YOUR PATH</div>
                
                <div className={styles['wel-cards-col']}>
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className={styles['wel-card-btn']}
                            onClick={() => navigate(m.path)}
                        >
                            <div className={styles['wel-card-strip']} style={{ background: m.color }} />
                            <div className={styles['wel-card-icon']} style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className={styles['wel-card-text']}>
                                <div className={styles['wel-card-tagline']}>{m.tagline}</div>
                                <div className={styles['wel-card-label']}>{m.title}</div>
                                <div className={styles['wel-card-desc']}>{m.desc}</div>
                            </div>
                            <div className={styles['wel-card-chevron']}>
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
