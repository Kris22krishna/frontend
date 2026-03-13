import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Layout, BookOpen, Target, Link as LinkIcon, Zap } from 'lucide-react';
import './TheCellBranch.css';

const STATS = [
    { label: 'Core Topics', num: '5', color: '#6366f1' },
    { label: 'Practice Problems', num: '6', color: '#0d9488' },
    { label: 'Chapter Links', num: '7', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how the cell connects to other branches of biology and real-world applications.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/11/biology/the-cell/connectomics'
    },
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the 6 big questions (5W1H) and prerequisites to begin your journey into The Cell.',
        icon: '🌟',
        color: '#6366f1',
        path: '/senior/grade/11/biology/the-cell/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key terms and concepts that define cell biology.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/11/biology/the-cell/terminology'
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into individual skills with interactive Learn, Practice, and Assess modules.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/11/biology/the-cell/skills'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with exam-style questions and advanced problems.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/11/biology/the-cell/exam-edge'
    }
];

export default function TheCellDashboard() {
    const navigate = useNavigate();

    return (
        <div className="cell-fullpage">
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className="cell-left">
                <div className="cell-deco cell-deco-a" />
                <div className="cell-deco cell-deco-b" />

                <div className="cell-left-content">
                    <button 
                        className="cell-nav-back" 
                        onClick={() => navigate('/senior/grade/11')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 11 Biology
                    </button>

                    <h1 className="cell-main-title">
                        Master <br />
                        <span className="cell-title-accent">The Cell</span>
                    </h1>
                    <p className="cell-main-sub">
                        Unlock the foundations of modern biology. From basic structures to complex organelles, 
                        master everything you need to know about the unit of life.
                    </p>

                    <div className="cell-stats-grid">
                        {STATS.map((s, idx) => (
                            <div key={idx} className="cell-stat">
                                <span className="cell-stat-num">{s.num}</span>
                                <span className="cell-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className="cell-right">
                <div className="cell-right-eyebrow">CHOOSE YOUR PATH</div>
                
                <div className="cell-cards-col">
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className="cell-card-btn"
                            onClick={() => navigate(m.path)}
                        >
                            <div className="cell-card-strip" style={{ background: m.color }} />
                            <div className="cell-card-icon" style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className="cell-card-text">
                                <div className="cell-card-tagline">{m.tagline}</div>
                                <div className="cell-card-label">{m.title}</div>
                                <div className="cell-card-desc">{m.desc}</div>
                            </div>
                            <div className="cell-card-chevron">
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
