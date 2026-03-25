import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../WorkEnergyPowerBranch.css';
import { ArrowDown, GitMerge } from 'lucide-react';

export default function WorkEnergyPowerMindMap() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const Node = ({ title, desc, color, icon }) => (
        <div style={{
            background: '#fff',
            border: `2px solid ${color}30`,
            borderRadius: '16px',
            padding: '20px',
            width: '280px',
            textAlign: 'center',
            boxShadow: `0 8px 24px ${color}15`,
            position: 'relative',
            zIndex: 2
        }}>
            <div style={{
                width: '48px', height: '48px', margin: '0 auto 12px',
                background: color, color: '#fff', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', boxShadow: `0 4px 12px ${color}40`
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b', margin: '0 0 8px' }}>{title}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{desc}</p>
        </div>
    );

    const Arrow = () => (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0', opacity: 0.4 }}>
            <ArrowDown size={32} color="#1e1b4b" />
        </div>
    );

    return (
        <div className="wep-page">
            <nav className="wep-nav">
                <button className="wep-nav-back" onClick={() => navigate('/senior/grade/11/physics/work-energy-power')}>
                    ← Back to Dashboard
                </button>
                <div className="wep-nav-links">
                    <button className="wep-nav-link" onClick={() => navigate('/senior/grade/11/physics/work-energy-power/introduction')}>🌟 Intro</button>
                    <button className="wep-nav-link" onClick={() => navigate('/senior/grade/11/physics/work-energy-power/terminology')}>📖 Terminology</button>
                    <button className="wep-nav-link" onClick={() => navigate('/senior/grade/11/physics/work-energy-power/skills')}>🎯 Skills</button>
                    <button className="wep-nav-link active" onClick={() => navigate('/senior/grade/11/physics/work-energy-power/mind-map')}>🧠 Mind Map</button>
                </div>
            </nav>

            <div className="wep-hero">
                <h1 className="wep-hero-title">Physics <span style={{ color: '#10b981' }}>Mind Map</span></h1>
                <p className="wep-hero-sub">Visualizing the flow from Work to Power and Collisions.</p>
            </div>

            <main className="wep-topic-shell" style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                <Node title="Work" desc="Force causing displacement (W = F·d)" color="#6366f1" icon="🛠️" />
                <Arrow />
                
                <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Node title="Kinetic Energy" desc="Energy of motion (1/2 mv²)" color="#f59e0b" icon="🏎️" />
                        <Arrow />
                        <Node title="Work-Energy Theorem" desc="Net Work = Change in KE" color="#0d9488" icon="🔗" />
                    </div>
                </div>

                <Arrow />

                <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    <Node title="Variable Force" desc="Area under F-x graph" color="#ec4899" icon="📈" />
                    <GitMerge size={32} color="#94a3b8" />
                    <Node title="Potential Energy" desc="Configurational energy (mgh, 1/2 kx²)" color="#8b5cf6" icon="🔋" />
                </div>

                <Arrow />

                <Node title="Conservation of Mechanical Energy" desc="KE + PE = Constant (in conservative fields)" color="#10b981" icon="⚖️" />

                <Arrow />

                <div style={{ display: 'flex', gap: '40px' }}>
                    <Node title="Power" desc="Rate of doing work (P = W/t)" color="#ef4444" icon="⚡" />
                    <Node title="Collisions" desc="Elastic (KE conserved) & Inelastic" color="#f97316" icon="💥" />
                </div>

            </main>
        </div>
    );
}
