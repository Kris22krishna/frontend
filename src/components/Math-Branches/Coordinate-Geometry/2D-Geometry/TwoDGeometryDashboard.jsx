import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../coordinate-geometry.css';

const MODULES = [
    {
        id: 'skills',
        path: '/coordinate-geometry/2d-geometry/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn, Practice and Assess',
        desc: 'Practice problems and master the core skills.',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244,63,94,0.4)',
    },
];

const STATS = [
    { val: '1', label: 'Core Skills', color: '#f43f5e' },
];

export default function TwoDGeometryDashboard() {
    const navigate = useNavigate();

    return (
        <div className="geom-fullpage">
            <div className="geom-left">
                <div className="geom-deco geom-deco-a" />
                <div className="geom-deco geom-deco-b" />
                <div className="geom-deco geom-deco-c" />

                <div className="geom-left-content">
                    <button
                        onClick={() => navigate('/coordinate-geometry')}
                        style={{
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', borderRadius: '50px', padding: '8px 16px', fontSize: '13px',
                            fontWeight: '600', cursor: 'pointer', marginBottom: '24px', display: 'inline-flex',
                            alignItems: 'center', gap: '6px', backdropFilter: 'blur(10px)'
                        }}
                    >
                        ← Back to Coordinate Geometry
                    </button>

                    <h1 className="geom-main-title">
                        Master
                        <br />
                        <span className="geom-title-accent" style={{ background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2D Foundation</span>
                    </h1>

                    <p className="geom-main-sub">
                        Master the Cartesian plane, distance formula, and section formula in 2D space.
                    </p>

                    <div className="geom-stats-grid">
                        {STATS.map((item) => (
                            <div className="geom-stat" key={item.label}>
                                <span className="geom-stat-num" style={{ color: item.color }}>
                                    {item.val}
                                </span>
                                <span className="geom-stat-lbl">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="geom-right">
                <p className="geom-right-eyebrow">Choose a topic to explore</p>

                <div className="geom-cards-col">
                    {MODULES.map((moduleItem) => (
                        <button
                            key={moduleItem.id}
                            className="geom-card-btn"
                            onClick={() => navigate(moduleItem.path)}
                        >
                            <div
                                className="geom-card-strip"
                                style={{ background: `linear-gradient(180deg, ${moduleItem.gradFrom}, ${moduleItem.gradTo})` }}
                            />

                            <div
                                className="geom-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${moduleItem.gradFrom}, ${moduleItem.gradTo})`,
                                    boxShadow: `0 6px 20px ${moduleItem.shadow}`,
                                }}
                            >
                                {moduleItem.emoji}
                            </div>

                            <div className="geom-card-text">
                                <div className="geom-card-label" style={{ color: moduleItem.gradFrom }}>
                                    {moduleItem.label}
                                </div>
                                <div className="geom-card-tagline">{moduleItem.tagline}</div>
                                <div className="geom-card-desc">{moduleItem.desc}</div>
                            </div>

                            <div className="geom-card-chevron" style={{ color: moduleItem.gradFrom }}>
                                {'>'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}