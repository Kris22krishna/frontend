import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './RealNumbersBranch.css';

const STATS = [
    { label: 'Core Topics', num: '8', color: '#6366f1' },
    { label: 'Practice Problems', num: '12+', color: '#0d9488' },
    { label: 'Chapter Links', num: '7', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the 6 big questions (5W1H) and prerequisites to begin your journey into Real Numbers.',
        icon: '🌟',
        color: '#6366f1',
        path: '/senior/grade/10/real-numbers/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key terms and algorithms that define the Real Numbers system.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/10/real-numbers/terminology'
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into individual skills with interactive Learn, Practice, and Assess modules.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/10/real-numbers/skills'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how real numbers connect to other branches of mathematics and real-world applications.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/10/real-numbers/connectomics'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with exam-style questions including board questions for Real Numbers.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/10/real-numbers/exam-edge'
    }
];

export default function RealNumbersDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="rn-fullpage">
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className="rn-left">
                <div className="rn-deco rn-deco-a" />
                <div className="rn-deco rn-deco-b" />

                <div className="rn-left-content">
                    <button 
                        className="rn-nav-back" 
                        onClick={() => navigate('/senior/grade/10')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 10 Maths
                    </button>

                    <h1 className="rn-main-title">
                        Master <br />
                        <span className="rn-title-accent">Real Numbers</span>
                    </h1>
                    <p className="rn-main-sub">
                        Unlock the foundations of advanced mathematics. From Euclid's Division Lemma to irrationality, 
                        master everything you need to know about the Real Numbers system.
                    </p>

                    <div className="rn-stats-grid">
                        {STATS.map((s, idx) => (
                            <div key={idx} className="rn-stat">
                                <span className="rn-stat-num">{s.num}</span>
                                <span className="rn-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className="rn-right">
                <div className="rn-right-eyebrow">CHOOSE YOUR PATH</div>
                
                <div className="rn-cards-col">
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className="rn-card-btn"
                            onClick={() => navigate(m.path)}
                        >
                            <div className="rn-card-strip" style={{ background: m.color }} />
                            <div className="rn-card-icon" style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className="rn-card-text">
                                <div className="rn-card-tagline">{m.tagline}</div>
                                <div className="rn-card-label">{m.title}</div>
                                <div className="rn-card-desc">{m.desc}</div>
                            </div>
                            <div className="rn-card-chevron">
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
