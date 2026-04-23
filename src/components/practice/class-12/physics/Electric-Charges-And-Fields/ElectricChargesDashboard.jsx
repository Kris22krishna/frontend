import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ElectricChargesAndFieldsBranch.css';

const BASE = '/senior/grade/12/physics/electric-charges-and-fields';

const cards = [
    {
        id: 'connectomics',
        label: 'Connectomics',
        tagline: 'Big Picture First',
        desc: 'See how Charge, Coulomb\'s Law, E-Field, Flux, Dipole, and Gauss\'s Law all interlock before diving in.',
        icon: '🌐',
        strip: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        iconBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        path: `${BASE}/connectomics`,
    },
    {
        id: 'introduction',
        label: 'Introduction',
        tagline: '5W1H Framework',
        desc: 'What is electric charge? Who discovered Coulomb\'s Law? Why does charge quantisation matter? Six key questions answered.',
        icon: '🧠',
        strip: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
        iconBg: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
        path: `${BASE}/introduction`,
    },
    {
        id: 'terminology',
        label: 'Terminology',
        tagline: 'Master the Language',
        desc: 'Coulomb\'s constant, epsilon_0, electric flux, Gaussian surface, electric dipole - every term with NEET examples.',
        icon: '📖',
        strip: 'linear-gradient(135deg, #10b981, #34d399)',
        iconBg: 'linear-gradient(135deg, #10b981, #34d399)',
        path: `${BASE}/terminology`,
    },
    {
        id: 'skills',
        label: 'Skills',
        tagline: 'Learn · Practice · Assess',
        desc: 'Seven problem-solving skills: electric charge, Coulomb\'s Law, E-field, flux, dipole, Gauss\'s Law, and continuous distributions.',
        icon: '🎯',
        strip: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
        iconBg: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
        path: `${BASE}/skills`,
    },
    {
        id: 'exam-edge',
        label: 'Exam Edge',
        tagline: 'Crack JEE & NEET',
        desc: 'PYQ strategy, formula sheet, comparison checkpoints, and revision blocks aligned to exam patterns.',
        icon: '⚡',
        strip: 'linear-gradient(135deg, #ef4444, #f87171)',
        iconBg: 'linear-gradient(135deg, #ef4444, #f87171)',
        path: `${BASE}/exam-edge`,
    },
];

export default function ElectricChargesDashboard() {
    const navigate = useNavigate();

    return (
        <div className="ecf-dashboard-fullpage">
            <div className="ecf-dashboard-left">
                <div className="ecf-dashboard-deco ecf-dashboard-deco-a" />
                <div className="ecf-dashboard-deco ecf-dashboard-deco-b" />
                <div className="ecf-dashboard-left-content">
                    <button
                        onClick={() => navigate('/senior/grade/12')}
                        style={{
                            marginBottom: '40px',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            borderRadius: '100px',
                            padding: '8px 18px',
                            fontSize: '13px',
                            fontWeight: '700',
                            width: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        ← Back to Grade 12
                    </button>
                    <button
                        onClick={() => navigate('/senior/grade/12/physics')}
                        style={{
                            marginBottom: '20px',
                            marginTop: '-30px',
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.6)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        Physics Chapters
                    </button>
                    <h1 className="ecf-dashboard-main-title">
                        Electric Charges{' '}
                        <span className="ecf-dashboard-title-accent">&amp; Fields</span>
                    </h1>
                    <p className="ecf-dashboard-main-sub">
                        The invisible force that holds atoms together, powers every electronic
                        device, and is the gateway to all of Grade 12 Physics. Master
                        electrostatics and you own the entire electromagnetic spectrum.
                    </p>
                    <div className="ecf-dashboard-stats-grid">
                        {[
                            { num: '7', lbl: 'Core Skills' },
                            { num: '4', lbl: 'Field Laws' },
                            { num: '3', lbl: 'Key Proofs' },
                            { num: '30+', lbl: 'PYQs' },
                        ].map(s => (
                            <div className="ecf-dashboard-stat" key={s.lbl}>
                                <span className="ecf-dashboard-stat-num">{s.num}</span>
                                <span className="ecf-dashboard-stat-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ecf-dashboard-right">
                <p className="ecf-dashboard-right-eyebrow">Grade 12 | Physics | Chapter 1</p>
                <div className="ecf-dashboard-cards-col">
                    {cards.map(c => (
                        <button
                            key={c.id}
                            className="ecf-dashboard-card-btn"
                            onClick={() => navigate(c.path)}
                        >
                            <div className="ecf-dashboard-card-strip" style={{ background: c.strip }} />
                            <div className="ecf-dashboard-card-icon" style={{ background: c.iconBg }}>
                                {c.icon}
                            </div>
                            <div className="ecf-dashboard-card-text">
                                <div className="ecf-dashboard-card-tagline">{c.tagline}</div>
                                <div className="ecf-dashboard-card-label">{c.label}</div>
                                <div className="ecf-dashboard-card-desc">{c.desc}</div>
                            </div>
                            <div className="ecf-dashboard-card-chevron">&gt;</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
