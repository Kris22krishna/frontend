import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './WonderfulWorldOfScienceDashboard.module.css';

const STATS = [
    { label: 'Core Concepts', num: '3', color: '#10b981' },
    { label: 'Practice Problems', num: '10+', color: '#0ea5e9' },
    { label: 'Virtual Lab', num: '1', color: '#8b5cf6' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Discover the 5W1H of science — what it is, who does it, and why it matters to YOU.',
        icon: '🌟',
        color: '#6366f1',
        path: '/middle/grade/6/science/wonderful-world-of-science/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Learn the key words every young scientist needs — from hypothesis to experiment.',
        icon: '📖',
        color: '#0d9488',
        path: '/middle/grade/6/science/wonderful-world-of-science/terminology'
    },
    {
        id: 'core-concepts',
        title: 'Core Concepts',
        tagline: 'CORE PRACTICE',
        desc: 'Explore what science really is, the scientific method, and science in daily life.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/middle/grade/6/science/wonderful-world-of-science/core-concepts'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how this chapter connects to future topics and real-world applications.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/middle/grade/6/science/wonderful-world-of-science/connectomics'
    },
    {
        id: 'virtual-lab',
        title: 'Virtual Lab',
        tagline: 'HANDS-ON SCIENCE',
        desc: 'Grow plants, change water states, sort materials, and simulate the rain cycle!',
        icon: '🧪',
        color: '#38bdf8',
        path: '/middle/grade/6/science/wonderful-world-of-science/virtual-lab'
    }
];

export default function WonderfulWorldOfScienceDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['wws-fullpage']}>
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className={styles['wws-left']}>
                <div className={`${styles['wws-deco']} ${styles['wws-deco-a']}`} />
                <div className={`${styles['wws-deco']} ${styles['wws-deco-b']}`} />

                <div className={styles['wws-left-content']}>
                    <button 
                        className={styles['wws-nav-back']} 
                        onClick={() => navigate('/middle/grade/6')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 6 Science
                    </button>

                    <h1 className={styles['wws-main-title']}>
                        Explore <br />
                        <span className={styles['wws-title-accent']}>The Wonderful World of Science</span>
                    </h1>
                    <p className={styles['wws-main-sub']}>
                        From the tiniest seed to the farthest star — discover how science 
                        helps us understand the amazing world around us.
                    </p>

                    <div className={styles['wws-stats-grid']}>
                        {STATS.map((s, idx) => (
                            <div key={idx} className={styles['wws-stat']}>
                                <span className={styles['wws-stat-num']}>{s.num}</span>
                                <span className={styles['wws-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className={styles['wws-right']}>
                <div className={styles['wws-right-eyebrow']}>CHOOSE YOUR PATH</div>
                
                <div className={styles['wws-cards-col']}>
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className={styles['wws-card-btn']}
                            onClick={() => navigate(m.path)}
                        >
                            <div className={styles['wws-card-strip']} style={{ background: m.color }} />
                            <div className={styles['wws-card-icon']} style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className={styles['wws-card-text']}>
                                <div className={styles['wws-card-tagline']}>{m.tagline}</div>
                                <div className={styles['wws-card-label']}>{m.title}</div>
                                <div className={styles['wws-card-desc']}>{m.desc}</div>
                            </div>
                            <div className={styles['wws-card-chevron']}>
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
