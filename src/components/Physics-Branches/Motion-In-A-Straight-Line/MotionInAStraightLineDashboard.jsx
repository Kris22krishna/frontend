import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MotionInAStraightLineBranch.css';

const BASE = '/senior/grade/11/physics/motion-in-a-straight-line';

const cards = [
    {
        id: 'connectomics',
        label: 'Connectomics',
        tagline: 'Big Picture First',
        desc: 'See how distance, speed, velocity, and acceleration all interlock before diving in.',
        icon: '🧠',
        strip: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        iconBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        path: `${BASE}/connectomics`,
    },
    {
        id: 'introduction',
        label: 'Introduction',
        tagline: '5W1H Framework',
        desc: 'What is kinematics? Who uses it? Why does it matter? Answer all 6 key questions.',
        icon: '🌟',
        strip: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
        iconBg: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
        path: `${BASE}/introduction`,
    },
    {
        id: 'terminology',
        label: 'Terminology',
        tagline: 'Master the Language',
        desc: 'Distance, displacement, speed, velocity, acceleration — every term with examples and memory tricks.',
        icon: '📖',
        strip: 'linear-gradient(135deg, #10b981, #34d399)',
        iconBg: 'linear-gradient(135deg, #10b981, #34d399)',
        path: `${BASE}/terminology`,
    },
    {
        id: 'skills',
        label: 'Skills',
        tagline: 'Learn · Practice · Assess',
        desc: 'Work through graphical analysis, equations of motion, relative velocity, and projectile basics.',
        icon: '🎯',
        strip: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
        iconBg: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
        path: `${BASE}/skills`,
    },
    {
        id: 'exam-edge',
        label: 'Exam Edge',
        tagline: 'Crack JEE & NEET',
        desc: 'Previous-year questions, common traps, formula sheet, and last-minute revision cards.',
        icon: '⚡',
        strip: 'linear-gradient(135deg, #ef4444, #f87171)',
        iconBg: 'linear-gradient(135deg, #ef4444, #f87171)',
        path: `${BASE}/exam-edge`,
    },
];

export default function MotionInAStraightLineDashboard() {
    const navigate = useNavigate();

    return (
        <div className="lom-fullpage">
            {/* LEFT PANEL */}
            <div className="lom-left msl-left">
                <div className="lom-deco lom-deco-a" />
                <div className="lom-deco lom-deco-b" />
                <div className="lom-left-content">
                    <h1 className="lom-main-title">
                        Motion in a{' '}
                        <span className="lom-title-accent">Straight Line</span>
                    </h1>
                    <p className="lom-main-sub">
                        From the humble odometer to spacecraft trajectories — all physics begins
                        with understanding how objects move. Master kinematics and you own the
                        foundation of Grade 11 Physics.
                    </p>
                    <div className="lom-stats-grid">
                        {[
                            { num: '5', lbl: 'Core Skills' },
                            { num: '6', lbl: 'Equations' },
                            { num: '4', lbl: 'Graph Types' },
                            { num: '30+', lbl: 'PYQs' },
                        ].map(s => (
                            <div className="lom-stat" key={s.lbl}>
                                <span className="lom-stat-num">{s.num}</span>
                                <span className="lom-stat-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="lom-right">
                <p className="lom-right-eyebrow">Grade 11 · Physics · Chapter 3</p>
                <div className="lom-cards-col">
                    {cards.map(c => (
                        <button
                            key={c.id}
                            className="lom-card-btn"
                            onClick={() => navigate(c.path)}
                        >
                            <div className="lom-card-strip" style={{ background: c.strip }} />
                            <div className="lom-card-icon" style={{ background: c.iconBg }}>
                                {c.icon}
                            </div>
                            <div className="lom-card-text">
                                <div className="lom-card-tagline">{c.tagline}</div>
                                <div className="lom-card-label">{c.label}</div>
                                <div className="lom-card-desc">{c.desc}</div>
                            </div>
                            <div className="lom-card-chevron">›</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
