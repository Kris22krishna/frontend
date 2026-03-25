import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workEnergyPowerDerivationsData } from './WorkEnergyPowerDerivationsData';
import '../../WorkEnergyPowerBranch.css';
import MathRenderer from '../../../../../../MathRenderer';
import { BookOpen, Edit3, Target } from 'lucide-react';

export default function WorkEnergyPowerDerivations() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('formulas');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { formulas, derivations, numericals } = workEnergyPowerDerivationsData;

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
                    <button className="wep-nav-link active" onClick={() => navigate('/senior/grade/11/physics/work-energy-power/derivations')}>📝 Derivations & Formulas</button>
                </div>
            </nav>

            <div className="wep-hero">
                <h1 className="wep-hero-title">Derivations & <span style={{ color: '#ec4899' }}>Formula Sheet</span></h1>
                <p className="wep-hero-sub">The ultimate cheat sheet for Work, Energy and Power.</p>
            </div>

            <main className="wep-topic-shell" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
                
                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
                    <button 
                        onClick={() => setActiveTab('formulas')}
                        style={{ padding: '12px 24px', borderRadius: '100px', border: '1px solid #e2e8f0', background: activeTab === 'formulas' ? '#ec4899' : '#fff', color: activeTab === 'formulas' ? '#fff' : '#64748b', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <BookOpen size={18} /> Formula Sheet
                    </button>
                    <button 
                        onClick={() => setActiveTab('derivations')}
                        style={{ padding: '12px 24px', borderRadius: '100px', border: '1px solid #e2e8f0', background: activeTab === 'derivations' ? '#6366f1' : '#fff', color: activeTab === 'derivations' ? '#fff' : '#64748b', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Edit3 size={18} /> Derivations
                    </button>
                    <button 
                        onClick={() => setActiveTab('numericals')}
                        style={{ padding: '12px 24px', borderRadius: '100px', border: '1px solid #e2e8f0', background: activeTab === 'numericals' ? '#0d9488' : '#fff', color: activeTab === 'numericals' ? '#fff' : '#64748b', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Target size={18} /> Numericals
                    </button>
                </div>

                <div className="wep-details-window" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '32px' }}>
                    
                    {activeTab === 'formulas' && (
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1e1b4b', marginBottom: '24px' }}>Universal Formula Sheet</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                {formulas.map((f, i) => (
                                    <div key={i} style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', padding: '20px', borderRadius: '16px' }}>
                                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#be185d', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>{f.name}</div>
                                        <div style={{ fontSize: '18px', color: '#1e1b4b' }}><MathRenderer text={f.eq} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'derivations' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {derivations.map((d, i) => (
                                <div key={i} style={{ background: '#eef2ff', borderRadius: '20px', padding: '32px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#4338ca', marginBottom: '24px' }}>{d.title}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {d.steps.map((step, j) => (
                                            <div key={j} style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', color: '#334155', fontSize: '16px', lineHeight: 1.6 }}>
                                                <MathRenderer text={step} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'numericals' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {numericals.map((n, i) => (
                                <div key={i} style={{ background: '#f0fdfa', borderRadius: '20px', padding: '32px', border: '1px solid #ccfbf1' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f766e', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>{n.title}</h3>
                                    <div style={{ fontSize: '18px', color: '#1e1b4b', fontWeight: 600, marginBottom: '24px', lineHeight: 1.6 }}>
                                        <MathRenderer text={n.q} />
                                    </div>
                                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', borderLeft: '4px solid #14b8a6' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#14b8a6', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Step-by-Step Solution</div>
                                        {n.a.map((step, j) => (
                                            <div key={j} style={{ marginBottom: '8px', color: '#334155', fontSize: '16px', fontFamily: 'JetBrains Mono, monospace' }}>
                                                <MathRenderer text={step} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
