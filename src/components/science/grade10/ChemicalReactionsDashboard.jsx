import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './ChemicalReactionsDashboard.module.css';

const STATS = [
    { label: 'Core Concepts', num: '3', color: '#6366f1' },
    { label: 'Practice Problems', num: '10+', color: '#0d9488' },
    { label: 'Virtual Lab', num: '1', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the 5W1H framework, prerequisites, and what makes chemical reactions special.',
        icon: '🌟',
        color: '#6366f1',
        path: '/senior/grade/10/science/chemical-reactions/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key terms — from reactants and products to redox and precipitation.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/10/science/chemical-reactions/terminology'
    },
    {
        id: 'core-concepts',
        title: 'Core Concepts',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into chemical equations, reaction types, and oxidation effects.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/10/science/chemical-reactions/core-concepts'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See the mind map linking equations, reaction types, energy, and everyday life.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/10/science/chemical-reactions/connectomics'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with a 10-question MCQ quiz on chemical reactions.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/10/science/chemical-reactions/exam-edge'
    },
    {
        id: 'virtual-lab',
        title: 'Virtual Lab',
        tagline: 'HANDS-ON SCIENCE',
        desc: 'Run animated experiments safely and observe the reactions in real-time.',
        icon: '🧪',
        color: '#38bdf8',
        path: '/senior/grade/10/science/chemical-reactions/virtual-lab'
    }
];

export default function ChemicalReactionsDashboard() {
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
                        onClick={() => navigate('/senior/grade/10')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 10 Science
                    </button>

                    <h1 className={styles['chem-main-title']}>
                        Master <br />
                        <span className={styles['chem-title-accent']}>Chemical Reactions</span>
                    </h1>
                    <p className={styles['chem-main-sub']}>
                        From burning magnesium to electrolysis — explore, simulate, and
                        master the science of molecular transformation.
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
