import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './InvestigativeScienceDashboard.module.css';

const STATS = [
    { label: 'Core Concepts', num: '5', color: '#0e7490' },
    { label: 'Practice Problems', num: '10+', color: '#0d9488' },
    { label: 'Virtual Lab', num: '1', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Discover what it means to think like a scientist — asking why, observing, and wondering.',
        icon: '🌟',
        color: '#0e7490',
        path: '/senior/grade/8/science/investigative-science/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key vocabulary of scientific investigation — hypothesis, variables, and more.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/8/science/investigative-science/terminology'
    },
    {
        id: 'core-concepts',
        title: 'Core Concepts',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into the scientific method, experiment design, variables and real case-studies.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/8/science/investigative-science/core-concepts'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how scientific thinking links biology, physics, chemistry, and everyday life.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/8/science/investigative-science/connectomics'
    },
   
    {
        id: 'virtual-lab',
        title: 'Virtual Lab',
        tagline: 'HANDS-ON SCIENCE',
        desc: 'Run the Puri Investigation! Adjust variables and observe real-time puffing animations.',
        icon: '🧪',
        color: '#38bdf8',
        path: '/senior/grade/8/science/investigative-science/virtual-lab'
    }
];

export default function InvestigativeScienceDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['inv-fullpage']}>
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className={styles['inv-left']}>
                <div className={`${styles['inv-deco']} ${styles['inv-deco-a']}`} />
                <div className={`${styles['inv-deco']} ${styles['inv-deco-b']}`} />

                <div className={styles['inv-left-content']}>
                    <button
                        className={styles['inv-nav-back']}
                        onClick={() => navigate('/senior/grade/8')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 8 Science
                    </button>

                    <h1 className={styles['inv-main-title']}>
                        Explore the <br />
                        <span className={styles['inv-title-accent']}>Investigative World</span>
                    </h1>
                    <p className={styles['inv-main-sub']}>
                        From asking "Why does a puri puff?" to designing experiments — become a scientist
                        who thinks, observes, and discovers.
                    </p>

                    <div className={styles['inv-stats-grid']}>
                        {STATS.map((s, idx) => (
                            <div key={idx} className={styles['inv-stat']}>
                                <span className={styles['inv-stat-num']}>{s.num}</span>
                                <span className={styles['inv-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className={styles['inv-right']}>
                <div className={styles['inv-right-eyebrow']}>CHOOSE YOUR PATH</div>

                <div className={styles['inv-cards-col']}>
                    {MODULES.map((m) => (
                        <button
                            key={m.id}
                            className={styles['inv-card-btn']}
                            onClick={() => navigate(m.path)}
                        >
                            <div className={styles['inv-card-strip']} style={{ background: m.color }} />
                            <div className={styles['inv-card-icon']} style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className={styles['inv-card-text']}>
                                <div className={styles['inv-card-tagline']}>{m.tagline}</div>
                                <div className={styles['inv-card-label']}>{m.title}</div>
                                <div className={styles['inv-card-desc']}>{m.desc}</div>
                            </div>
                            <div className={styles['inv-card-chevron']}>
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
