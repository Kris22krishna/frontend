import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './SolutionsDashboard.module.css';

const STATS = [
    { label: 'Core Concepts', num: '6', color: '#6366f1' },
    { label: 'Practice Problems', num: '10+', color: '#0d9488' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the basics of solutions, solvent, solute and binary solutions.',
        icon: '🌟',
        color: '#6366f1',
        path: '/senior/grade/12/chemistry/solutions/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key terms — from molarity and molality to saturated solutions.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/12/chemistry/solutions/terminology'
    },
    {
        id: 'core-concepts',
        title: 'Core Concepts',
        tagline: 'CORE PRACTICE',
        desc: "Dive into Raoult's Law, Colligative Properties, and Concentration.",
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/12/chemistry/solutions/core-concepts'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See the mind map linking concentration, vapour pressure, and properties.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/12/chemistry/solutions/connectomics'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with a 10-question MCQ quiz on solutions.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/12/chemistry/solutions/exam-edge'
    },
    {
        id: 'lab',
        title: 'Virtual Lab',
        tagline: 'HANDS ON',
        desc: 'Interact with virtual simulations for mixing solutions.',
        icon: '🧪',
        color: '#10b981',
        path: '/senior/grade/12/chemistry/solutions/virtual-lab'
    }
];

export default function SolutionsDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles['sol-fullpage']}>
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className={styles['sol-left']}>
                <div className={`${styles['sol-deco']} ${styles['sol-deco-a']}`} />
                <div className={`${styles['sol-deco']} ${styles['sol-deco-b']}`} />

                <div className={styles['sol-left-content']}>
                    <button 
                        className={styles['sol-nav-back']} 
                        onClick={() => navigate('/senior/grade/12')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 12 Chemistry
                    </button>

                    <h1 className={styles['sol-main-title']}>
                        Master <br />
                        <span className={styles['sol-title-accent']}>Solutions</span>
                    </h1>
                    <p className={styles['sol-main-sub']}>
                        From Raoult's Law to Colligative Properties — explore, simulate, and
                        master the physical chemistry of solutions.
                    </p>

                    <div className={styles['sol-stats-grid']}>
                        {STATS.map((s, idx) => (
                            <div key={idx} className={styles['sol-stat']}>
                                <span className={styles['sol-stat-num']}>{s.num}</span>
                                <span className={styles['sol-stat-lbl']}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className={styles['sol-right']}>
                <div className={styles['sol-right-eyebrow']}>CHOOSE YOUR PATH</div>
                
                <div className={styles['sol-cards-col']}>
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className={styles['sol-card-btn']}
                            onClick={() => navigate(m.path)}
                        >
                            <div className={styles['sol-card-strip']} style={{ background: m.color }} />
                            <div className={styles['sol-card-icon']} style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className={styles['sol-card-text']}>
                                <div className={styles['sol-card-tagline']}>{m.tagline}</div>
                                <div className={styles['sol-card-label']}>{m.title}</div>
                                <div className={styles['sol-card-desc']}>{m.desc}</div>
                            </div>
                            <div className={styles['sol-card-chevron']}>
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
