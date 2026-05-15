import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../Sets/SetsBranch.css';

const STATS = [
    { label: 'Core Topics', num: '5', color: '#6366f1' },
    { label: 'Practice Problems', num: '7', color: '#0d9488' },
    { label: 'Chapter Links', num: '7', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' },
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore the 6 big questions (5W1H) about complex numbers and review your prerequisites.',
        icon: '🌟',
        color: '#6366f1',
        path: '/senior/grade/11/maths/complex-numbers/introduction',
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master 7 key terms and 5 golden rules that define complex number algebra.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/11/maths/complex-numbers/terminology',
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Dive into 7 targeted skills — each with Learn, Practice, and Assess modes.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/11/maths/complex-numbers/skills',
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how complex numbers power physics, engineering, quantum mechanics, and more.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/11/maths/complex-numbers/connectomics',
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Challenge yourself with NCERT-style exam questions and avoid common mistakes.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/11/maths/complex-numbers/exam-edge',
    },
];

export default function ComplexDashboard() {
    const navigate = useNavigate();

    return (
        <div className="sets-fullpage">
            {/* ── LEFT: Hero Panel ───────────────────────── */}
            <div className="sets-left" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)' }}>
                <div className="sets-deco sets-deco-a" />
                <div className="sets-deco sets-deco-b" />

                <div className="sets-left-content">
                    <button
                        className="sets-nav-back"
                        onClick={() => navigate('/senior/grade/11/maths')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 11 Maths
                    </button>

                    <h1 className="sets-main-title">
                        Master <br />
                        <span className="sets-title-accent">Complex Numbers</span>
                    </h1>
                    <p className="sets-main-sub">
                        Extend the real number line into a full plane. From i² = −1 to the Argand plane,
                        master the algebra and geometry of complex numbers.
                    </p>

                    <div className="sets-stats-grid">
                        {STATS.map((s, idx) => (
                            <div key={idx} className="sets-stat">
                                <span className="sets-stat-num">{s.num}</span>
                                <span className="sets-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────── */}
            <div className="sets-right">
                <div className="sets-right-eyebrow">CHOOSE YOUR PATH</div>

                <div className="sets-cards-col">
                    {MODULES.map((m) => (
                        <button
                            key={m.id}
                            className="sets-card-btn"
                            onClick={() => navigate(m.path)}
                        >
                            <div className="sets-card-strip" style={{ background: m.color }} />
                            <div className="sets-card-icon" style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className="sets-card-text">
                                <div className="sets-card-tagline">{m.tagline}</div>
                                <div className="sets-card-label">{m.title}</div>
                                <div className="sets-card-desc">{m.desc}</div>
                            </div>
                            <div className="sets-card-chevron">
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
