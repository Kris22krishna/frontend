import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './EverEvolvingScienceDashboard.module.css';

const STATS = [
    { label: 'Core Concepts', num: '3', color: '#6366f1' },
    { label: 'Key Terms', num: '10', color: '#0d9488' },
    { label: 'Practice Qs', num: '30+', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Begin with the 5W1H framework, prerequisites, and what makes science so exciting.',
        icon: '🌟',
        color: '#6366f1',
        path: '/middle/grade/7/science/wonderful-world-science/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key vocabulary — from hypothesis and observation to reversible and irreversible changes.',
        icon: '📖',
        color: '#0d9488',
        path: '/middle/grade/7/science/wonderful-world-science/terminology'
    },
    {
        id: 'core-concepts',
        title: 'Core Concepts',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into science as a process, materials & properties, and changes around us.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/middle/grade/7/science/wonderful-world-science/core-concepts'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how science subjects connect — physics, chemistry, biology, and earth sciences.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/middle/grade/7/science/wonderful-world-science/connectomics'
    }
];

export default function EverEvolvingScienceDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['chem-fullpage']}>
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className={styles['chem-left']}>
                <div className={`${styles['chem-deco']} ${styles['chem-deco-a']}`} />
                <div className={`${styles['chem-deco']} ${styles['chem-deco-b']}`} />

                <div className={styles['chem-left-content']}>
                    <button 
                        className={styles['chem-nav-back']} 
                        onClick={() => navigate('/middle/grade/7')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 7 Science
                    </button>

                    <h1 className={styles['chem-main-title']}>
                        The Ever-Evolving <br />
                        <span className={styles['chem-title-accent']}>World of Science</span>
                    </h1>
                    <p className={styles['chem-main-sub']}>
                        From curious questions to hands-on experiments — explore, discover, and
                        think like a scientist in Grade 7.
                    </p>

                    <div className={styles['chem-stats-grid']}>
                        {STATS.map((s, idx) => (
                            <div key={idx} className={styles['chem-stat']}>
                                <span className={styles['chem-stat-num']}>{s.num}</span>
                                <span className={styles['chem-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className={styles['chem-right']}>
                <div className={styles['chem-right-eyebrow']}>CHOOSE YOUR PATH</div>
                
                <div className={styles['chem-cards-col']}>
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className={styles['chem-card-btn']}
                            onClick={() => navigate(m.path)}
                        >
                            <div className={styles['chem-card-strip']} style={{ background: m.color }} />
                            <div className={styles['chem-card-icon']} style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className={styles['chem-card-text']}>
                                <div className={styles['chem-card-tagline']}>{m.tagline}</div>
                                <div className={styles['chem-card-label']}>{m.title}</div>
                                <div className={styles['chem-card-desc']}>{m.desc}</div>
                            </div>
                            <div className={styles['chem-card-chevron']}>
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
