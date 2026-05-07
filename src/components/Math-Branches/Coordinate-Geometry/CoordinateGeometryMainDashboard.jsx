import React from 'react';
import { useNavigate } from 'react-router-dom';
import './coordinate-geometry.css';

const BRANCHES = [
    {
        id: 'skill-sparks',
        path: '/coordinate-geometry/sparks',
        label: 'Skill Sparks ⚡',
        emoji: '⚡',
        tagline: 'Interactive Playgrounds',
        desc: 'Explore highly immersive, interactive simulations for Coordinate Geometry concepts.',
        gradFrom: '#f97316',
        gradTo: '#fde047',
        shadow: 'rgba(249,115,22,0.5)',
    },
    {
        id: '2d-geometry',
        path: '/coordinate-geometry/2d-geometry',
        label: '2D Foundation',
        emoji: '📐',
        tagline: 'Cartesian Plane & Basic Formulas',
        desc: 'Master the Cartesian plane, distance formula, and section formula in 2D space.',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.4)',
    },
    {
        id: '3d-geometry',
        path: '/coordinate-geometry/3d-geometry',
        label: '3D Foundation',
        emoji: '🧊',
        tagline: 'Into the Third Dimension',
        desc: 'Understand 3D coordinate axes, octants, direction cosines, and direction ratios.',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.4)',
    },
    {
        id: 'lines-in-space',
        path: '/coordinate-geometry/lines-in-space',
        label: 'Lines In Space',
        emoji: '📏',
        tagline: 'Vectors & Spatial Lines',
        desc: 'Calculate vector equations, angles between lines, and the shortest distance between skew lines.',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244,63,94,0.4)',
    },
    {
        id: 'applications',
        path: '/coordinate-geometry/applications',
        label: 'Applications & Mastery',
        emoji: '🚀',
        tagline: 'Real World Geometry',
        desc: 'Apply your knowledge to navigation systems, robotics, and solve master-level coordinate problems.',
        gradFrom: '#8b5cf6',
        gradTo: '#a78bfa',
        shadow: 'rgba(139,92,246,0.4)',
    },
];

const STATS = [
    { val: '4', label: 'Branches', color: '#0d9488' },
    { val: '10', label: 'Units', color: '#2563eb' },
    { val: '3D', label: 'Possibilities', color: '#059669' },
];

export default function CoordinateGeometryMainDashboard() {
    const navigate = useNavigate();

    return (
        <div className="geom-fullpage">
            <div className="geom-left">
                <div className="geom-deco geom-deco-a" />
                <div className="geom-deco geom-deco-b" />
                <div className="geom-deco geom-deco-c" />

                <div className="geom-left-content">
                    <h1 className="geom-main-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        Master
                        <br />
                        <span className="geom-title-accent">Coordinate Geometry</span>
                    </h1>

                    <p className="geom-main-sub">
                        From basic 2D points on a Cartesian plane to advanced 3D spatial lines and vector applications. Select a branch to begin your journey.
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
                <button onClick={() => navigate('/')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 18px', borderRadius: 100, width: 'fit-content',
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    fontSize: 14, fontWeight: 700, color: '#334155',
                    cursor: 'pointer', marginBottom: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>🏠 Back</button>
                <p className="geom-right-eyebrow">Choose a branch to explore</p>

                <div className="geom-cards-col">
                    {BRANCHES.map((branchItem) => (
                        <button
                            key={branchItem.id}
                            className="geom-card-btn"
                            onClick={() => navigate(branchItem.path)}
                        >
                            <div
                                className="geom-card-strip"
                                style={{ background: `linear-gradient(180deg, ${branchItem.gradFrom}, ${branchItem.gradTo})` }}
                            />

                            <div
                                className="geom-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${branchItem.gradFrom}, ${branchItem.gradTo})`,
                                    boxShadow: `0 6px 20px ${branchItem.shadow}`,
                                }}
                            >
                                {branchItem.emoji}
                            </div>

                            <div className="geom-card-text">
                                <div className="geom-card-label" style={{ color: branchItem.gradFrom }}>
                                    {branchItem.label}
                                </div>
                                <div className="geom-card-tagline">{branchItem.tagline}</div>
                                <div className="geom-card-desc">{branchItem.desc}</div>
                            </div>

                            <div className="geom-card-chevron" style={{ color: branchItem.gradFrom }}>
                                {'>'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
