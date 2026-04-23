import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './SexualReproductionBranch.css';

const STATS = [
    { label: 'Core Topics', num: '5', color: '#10b981' },
    { label: 'Practice Problems', num: '0', color: '#0d9488' },
    { label: 'Chapter Links', num: '0', color: '#059669' },
    { label: 'Mastery', num: '0%', color: '#34d399' }
];

const MODULES = [
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how flowering plants connect to other branches of biology and real-world applications.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/12/biology/sexual-reproduction/connectomics'
    },
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the 6 big questions (5W1H) and prerequisites to begin your journey into Sexual Reproduction.',
        icon: '🌟',
        color: '#10b981',
        path: '/senior/grade/12/biology/sexual-reproduction/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key terms and concepts that define plant reproduction.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/12/biology/sexual-reproduction/terminology'
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into individual skills with interactive Learn, Practice, and Assess modules.',
        icon: '🎯',
        color: '#059669',
        path: '/senior/grade/12/biology/sexual-reproduction/skills'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with exam-style questions and advanced problems.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/12/biology/sexual-reproduction/exam-edge'
    }
];

export default function SexualReproductionDashboard() {
    const navigate = useNavigate();

    return (
        <div className="sr-fullpage">
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className="sr-left">
                <div className="sr-deco sr-deco-a" />
                <div className="sr-deco sr-deco-b" />

                <div className="sr-left-content">
                    <button 
                        className="sr-nav-back" 
                        onClick={() => navigate('/senior/grade/12')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 12 Biology
                    </button>

                    <h1 className="sr-main-title">
                        Master <br />
                        <span className="sr-title-accent">Sexual Reproduction</span>
                    </h1>
                    <p className="sr-main-sub">
                        Unlock the fascinating processes of reproduction in flowering plants. From flower structure to seed formation, 
                        master everything you need to know about plant propagation.
                    </p>

                    <div className="sr-stats-grid">
                        {STATS.map((s, idx) => (
                            <div key={idx} className="sr-stat">
                                <span className="sr-stat-num">{s.num}</span>
                                <span className="sr-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className="sr-right">
                <div className="sr-right-eyebrow">CHOOSE YOUR PATH</div>
                
                <div className="sr-cards-col">
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className="sr-card-btn"
                            onClick={() => navigate(m.path)}
                        >
                            <div className="sr-card-strip" style={{ background: m.color }} />
                            <div className="sr-card-icon" style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className="sr-card-text">
                                <div className="sr-card-tagline">{m.tagline}</div>
                                <div className="sr-card-label">{m.title}</div>
                                <div className="sr-card-desc">{m.desc}</div>
                            </div>
                            <div className="sr-card-chevron">
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
