import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './WorkEnergyPowerBranch.css';

const STATS = [
    { label: 'Core Topics', num: '7', color: '#6366f1' },
    { label: 'Practice Problems', num: '80+', color: '#0d9488' },
    { label: 'Chapter Links', num: '4', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the 6 big questions (5W1H) and prerequisites to begin your journey into Work, Energy and Power.',
        icon: '🌟',
        color: '#6366f1',
        path: '/senior/grade/11/physics/work-energy-power/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the key terminology like KE, PE, and conservative forces.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/11/physics/work-energy-power/terminology'
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into individual skills with interactive Learn, Practice, and Assess modules.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/11/physics/work-energy-power/skills'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how work and energy connect to other chapters and real-world applications.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/11/physics/work-energy-power/connectomics'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with exam-style questions including NEET and JEE PYQs.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/11/physics/work-energy-power/exam-edge'
    },
    {
        id: 'mindmap',
        title: 'Mind Map',
        tagline: 'VISUAL FLOW',
        desc: 'Interactive flow mapping Work, Energy, Power, and their conservation.',
        icon: '🧠',
        color: '#10b981',
        path: '/senior/grade/11/physics/work-energy-power/mind-map'
    },
    {
        id: 'derivations',
        title: 'Derivations & Numericals',
        tagline: 'FORMULA SHEET',
        desc: 'Standard derivations and templated numericals for all core concepts.',
        icon: '📝',
        color: '#ec4899',
        path: '/senior/grade/11/physics/work-energy-power/derivations'
    }
];

export default function WorkEnergyPowerDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="wep-fullpage">
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className="wep-left">
                <div className="wep-deco wep-deco-a" />
                <div className="wep-deco wep-deco-b" />

                <div className="wep-left-content">
                    <button 
                        className="wep-nav-back" 
                        onClick={() => navigate('/senior/grade/11')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 11 Physics
                    </button>

                    <h1 className="wep-main-title">
                        Master <br />
                        <span className="wep-title-accent">Work, Energy and Power</span>
                    </h1>
                    <p className="wep-main-sub">
                        Unlock the foundations of mechanics. From calculating work to the conservation of mechanical energy and power, 
                        master everything you need to know about Work, Energy and Power.
                    </p>

                    <div className="wep-stats-grid">
                        {STATS.map((s, idx) => (
                            <div key={idx} className="wep-stat">
                                <span className="wep-stat-num">{s.num}</span>
                                <span className="wep-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className="wep-right">
                <div className="wep-right-eyebrow">CHOOSE YOUR PATH</div>
                
                <div className="wep-cards-col">
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className="wep-card-btn"
                            onClick={() => navigate(m.path)}
                        >
                            <div className="wep-card-strip" style={{ background: m.color }} />
                            <div className="wep-card-icon" style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className="wep-card-text">
                                <div className="wep-card-tagline">{m.tagline}</div>
                                <div className="wep-card-label">{m.title}</div>
                                <div className="wep-card-desc">{m.desc}</div>
                            </div>
                            <div className="wep-card-chevron">
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
