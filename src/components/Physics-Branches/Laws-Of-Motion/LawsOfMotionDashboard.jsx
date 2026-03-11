import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './LawsOfMotionBranch.css';

const STATS = [
    { label: 'Core Topics', num: '8', color: '#3b82f6' },
    { label: 'Practice Problems', num: '20+', color: '#0d9488' },
    { label: 'Chapter Links', num: '12', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: "Explore the 6 big questions (5W1H) and prerequisites to begin your journey into Newton's Laws.",
        icon: '🌟',
        color: '#3b82f6',
        path: '/senior/grade/11/physics/laws-of-motion/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key terms and fundamental principles that define mechanics.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/11/physics/laws-of-motion/terminology'
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into individual skills with interactive Learn, Practice, and Assess modules.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/11/physics/laws-of-motion/skills'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how motion connects to other branches of physics and real-world technology.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/11/physics/laws-of-motion/connectomics'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with exam-style questions and advanced problems from previous NEET tests.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/11/physics/laws-of-motion/exam-edge'
    }
];

export default function LawsOfMotionDashboard() {
    const navigate = useNavigate();

    return (
        <div className="lom-fullpage">
            <div className="lom-left">
                <div className="lom-deco lom-deco-a"></div>
                <div className="lom-deco lom-deco-b"></div>

                <div className="lom-left-content">
                    <button 
                        className="lom-nav-back" 
                        onClick={() => navigate('/senior/grade/11/physics')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', borderRadius: '100px', padding: '8px 18px', fontSize: '13px', fontWeight: '700' }}
                    >
                        ← Grade 11 Physics
                    </button>

                    <h1 className="lom-main-title">
                        Master <br />
                        <span className="lom-title-accent">Laws of Motion</span>
                    </h1>
                    <p className="lom-main-sub">
                        Unlock the foundations of mechanics. From why a seatbelt saves your life to how rockets fly in space, 
                        master everything you need to know about Newton's Laws.
                    </p>

                    <div className="lom-stats-grid">
                        {STATS.map((s, idx) => (
                            <div key={idx} className="lom-stat">
                                <span className="lom-stat-num">{s.num}</span>
                                <span className="lom-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lom-right">
                <div className="lom-right-eyebrow">CHOOSE YOUR PATH</div>
                <div className="lom-cards-col">
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className="lom-card-btn"
                            onClick={() => navigate(m.path)}
                        >
                            <div className="lom-card-strip" style={{ background: m.color }} />
                            <div className="lom-card-icon" style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className="lom-card-text">
                                <div className="lom-card-tagline">{m.tagline}</div>
                                <div className="lom-card-label">{m.title}</div>
                                <div className="lom-card-desc">{m.desc}</div>
                            </div>
                            <div className="lom-card-chevron">
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
