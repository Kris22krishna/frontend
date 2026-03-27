import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import styles from './OurCommunityDashboard.module.css';

const STATS = [
    { label: 'Topics', num: '4', color: '#EC4899' },
    { label: 'Mini Games', num: '4', color: '#8B5CF6' },
    { label: 'Virtual Lab', num: '1', color: '#10B981' },
    { label: 'Mastery', num: '0%', color: '#F59E0B' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Discover the people, places, and events that make our community alive and thriving!',
        icon: '🏘️',
        color: '#EC4899',
        path: '/junior/grade/4/science/our-community/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Learn key words like Van Mahotsav, Uruka, Khetala, and the roles of community helpers.',
        icon: '📖',
        color: '#8B5CF6',
        path: '/junior/grade/4/science/our-community/terminology'
    },
    {
        id: 'skills',
        title: 'Skills Practice',
        tagline: 'CORE PRACTICE',
        desc: 'Play 4 interactive games about community places, festivals, occupations, and teamwork.',
        icon: '🎯',
        color: '#F59E0B',
        path: '/junior/grade/4/science/our-community/skills'
    },
    {
        id: 'virtual-lab',
        title: 'Virtual Lab',
        tagline: 'HANDS-ON ACTIVITY',
        desc: 'Build your own community! Place hospitals, parks, markets, and bridges on the town map.',
        icon: '🏗️',
        color: '#10B981',
        path: '/junior/grade/4/science/our-community/virtual-lab'
    }
];

export default function OurCommunityDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className={styles.heroPanel}>
                <div className={`${styles.cloud} ${styles.cloud1}`} />
                <div className={`${styles.cloud} ${styles.cloud2}`} />
                <div className={`${styles.cloud} ${styles.cloud3}`} />

                <div className={styles.heroContent}>
                    <button
                        className={styles.backBtn}
                        onClick={() => navigate('/junior/grade/4')}
                    >
                        <Home size={20} /> Grade 4 Home
                    </button>

                    <div className={styles.gradeBadge}>
                        <Sparkles size={18} />
                        <span>Grade 4 EVS</span>
                    </div>

                    <h1 className={styles.title}>
                        Our <br />
                        <span>Community</span>
                    </h1>

                    <p className={styles.subtitle}>
                        Explore how people work, celebrate, and help each other build a happy community!
                    </p>

                    <div className={styles.statsGrid}>
                        {STATS.map((s, idx) => (
                            <div key={idx} className={styles.statCard}>
                                <span className={styles.statNum} style={{ color: s.color }}>{s.num}</span>
                                <span className={styles.statLabel}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className={styles.modulesPanel}>
                <div className={styles.modulesEyebrow}>CHOOSE YOUR ACTIVITY</div>

                <div className={styles.modulesList}>
                    {MODULES.map((m) => (
                        <button
                            key={m.id}
                            className={styles.moduleCard}
                            onClick={() => navigate(m.path)}
                        >
                            <div className={styles.markerStrip} style={{ background: m.color }} />
                            <div className={styles.iconContainer} style={{ background: `${m.color}15` }}>
                                {m.icon}
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTagline} style={{ color: m.color }}>{m.tagline}</div>
                                <div className={styles.cardTitle}>{m.title}</div>
                                <div className={styles.cardDesc}>{m.desc}</div>
                            </div>
                            <div className={styles.chevronIcon}>
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
