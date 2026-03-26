import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../InvestigativeScienceDashboard.module.css';

export default function ScienceVirtualLab() {
    const navigate = useNavigate();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Lab State
    const [thickness, setThickness] = useState(2); // 2mm to 8mm
    const [temperature, setTemperature] = useState(180); // 100C to 220C
    const [isFrying, setIsFrying] = useState(false);
    const [result, setResult] = useState(null); // 'puffed', 'flat', 'burnt'
    const [logs, setLogs] = useState([]);

    const navLinks = [
        { path: '/senior/grade/8/science/investigative-science/introduction', label: '🌟 Intro' },
        { path: '/senior/grade/8/science/investigative-science/terminology', label: '📖 Terminology' },
        { path: '/senior/grade/8/science/investigative-science/core-concepts', label: '🎯 Core Concepts' },
        { path: '/senior/grade/8/science/investigative-science/connectomics', label: '🔗 Connectomics' },
        { path: '/senior/grade/8/science/investigative-science/virtual-lab', label: '🧪 Virtual Lab', active: true },
    ];

    const runExperiment = () => {
        setIsFrying(true);
        setResult(null);

        setTimeout(() => {
            let outcome = '';
            if (temperature > 200) outcome = 'burnt';
            else if (temperature < 150) outcome = 'flat-oily';
            else if (thickness > 4) outcome = 'flat-heavy';
            else outcome = 'puffed';

            setResult(outcome);
            setIsFrying(false);

            setLogs(prev => [{
                id: Date.now(),
                thick: thickness,
                temp: temperature,
                res: outcome
            }, ...prev]);
        }, 2000);
    };

    const getPuriStyle = () => {
        if (!result && !isFrying) return { background: '#fef3c7', height: thickness * 5, width: 120, borderRadius: '50%', border: '2px solid #fcd34d', margin: 'auto', transition: 'all 0.4s' };
        if (isFrying) return { background: '#fde68a', height: thickness * 5 + 10, width: 125, borderRadius: '50%', border: '2px solid #fbbf24', margin: 'auto', animation: 'jiggle 0.2s infinite' };

        if (result === 'puffed') return { background: '#f59e0b', height: 100, width: 140, borderRadius: '50%', border: '2px solid #d97706', margin: 'auto', boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.2)', transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' };
        if (result === 'burnt') return { background: '#451a03', height: thickness * 5, width: 120, borderRadius: '50%', border: '2px solid #290f02', margin: 'auto', transition: 'all 0.5s' };
        if (result === 'flat-oily' || result === 'flat-heavy') return { background: '#d97706', height: thickness * 5 + 5, width: 130, borderRadius: '50%', border: '2px solid #b45309', margin: 'auto', opacity: 0.9, transition: 'all 0.5s' };
    };

    return (
        <div className={styles['inv-page']}>
            <style>
                {`
                @keyframes jiggle { 0% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.02); } 100% { transform: translateY(0) scale(1); } }
                @keyframes bubble { 0% { transform: translateY(0) scale(1); opacity: 0.8; } 100% { transform: translateY(-40px) scale(1.5); opacity: 0; } }
                `}
            </style>

            <nav className={styles['inv-nav']}>
                <button className={styles['inv-nav-back']} onClick={() => navigate('/senior/grade/8/science/investigative-science')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['inv-nav-links']}>
                    {navLinks.map(l => (
                        <button key={l.path} className={`${styles['inv-nav-link']} ${l.active ? styles['active'] : ''}`} onClick={() => navigate(l.path)}>
                            {l.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className={styles['inv-topic-banner']} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', margin: 0, borderRadius: 0, padding: '48px 24px' }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#ffffff', WebkitTextFillColor: '#ffffff', margin: '0 0 8px' }}>Puri Investigation Simulator</h1>
                <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
                    Design a fair test! Change the Independent Variables (Thickness & Temperature) to see how they affect the Dependent Variable (Puffing).
                </p>
            </div>

            <main className={styles['inv-lab-container']} style={{ marginTop: -20, position: 'relative', zIndex: 10 }}>
                <div className={styles['inv-lab-window']}>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: 32 }}>

                        {/* Control Panel */}
                        <div style={{ background: '#f8fafc', padding: 24, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                                <div style={{ width: 32, height: 32, background: '#0d948815', color: '#0d9488', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎛️</div>
                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--inv-text)' }}>Independent Variables</h3>
                            </div>

                            <div style={{ marginBottom: 24 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--inv-text)' }}>Dough Thickness</label>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: '#0d9488' }}>{thickness} mm</span>
                                </div>
                                <input
                                    type="range" min="1" max="8" step="1"
                                    value={thickness} onChange={e => setThickness(Number(e.target.value))}
                                    disabled={isFrying}
                                    style={{ width: '100%', accentColor: '#0d9488' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                                    <span>Thin (1mm)</span>
                                    <span>Thick (8mm)</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: 32 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--inv-text)' }}>Oil Temperature</label>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: '#ef4444' }}>{temperature}°C</span>
                                </div>
                                <input
                                    type="range" min="100" max="220" step="10"
                                    value={temperature} onChange={e => setTemperature(Number(e.target.value))}
                                    disabled={isFrying}
                                    style={{ width: '100%', accentColor: '#ef4444' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                                    <span>Cool (100°C)</span>
                                    <span>Hot (220°C)</span>
                                </div>
                            </div>

                            <button
                                onClick={runExperiment}
                                disabled={isFrying}
                                className={styles['inv-btn-filled']}
                                style={{ width: '100%', '--skill-color': '#0f172a', padding: '16px', fontSize: 16 }}
                            >
                                {isFrying ? 'Frying...' : 'Start Experiment ▶'}
                            </button>
                        </div>

                        {/* Simulation View */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <div style={{ flex: 1, background: '#fff', border: '2px solid #e2e8f0', borderRadius: 16, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                                {/* Status Bar */}
                                <div style={{ background: '#f1f5f9', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
                                    <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: '#64748b' }}>Observation Camera</span>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: isFrying ? '#ef4444' : '#94a3b8', animation: isFrying ? 'pulse 1s infinite' : 'none' }} />
                                    </div>
                                </div>

                                {/* Fryer Area */}
                                <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                    {/* Oil representation */}
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(180deg, rgba(253,230,138,0.4) 0%, rgba(245,158,11,0.5) 100%)', borderTop: '2px solid rgba(245,158,11,0.3)', zIndex: 1 }}>
                                        {isFrying && Array.from({ length: 8 }).map((_, i) => (
                                            <div key={i} style={{ position: 'absolute', bottom: '10%', left: `${15 + Math.random() * 70}%`, width: 8 + Math.random() * 10, height: 8 + Math.random() * 10, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', animation: `bubble ${0.5 + Math.random()}s infinite linear`, animationDelay: `${Math.random()}s` }} />
                                        ))}
                                    </div>

                                    {/* The Puri */}
                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <div style={getPuriStyle()} />
                                    </div>

                                </div>

                                {/* Result Overlay */}
                                {result && (
                                    <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, zIndex: 10, backdropFilter: 'blur(4px)', animation: 'invFadeIn 0.3s' }}>
                                        Result: {result === 'puffed' ? 'Perfectly Puffed! 🎈' : result === 'burnt' ? 'Burnt! Too Hot 🔥' : result === 'flat-heavy' ? 'Too Thick to Puff 🥞' : 'Too Cool to Vaporise Water 💧'}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Data Log */}
                    <div style={{ marginTop: 32, borderTop: '1px solid #e2e8f0', paddingTop: 24 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800, color: 'var(--inv-text)' }}>Observation Log (Dependent Variable)</h3>
                        {logs.length === 0 ? (
                            <div style={{ padding: 32, textAlign: 'center', background: '#f8fafc', borderRadius: 12, border: '1px dashed #cbd5e1', color: '#94a3b8', fontSize: 14 }}>
                                Run an experiment to see data here.
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b' }}>Trial</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b' }}>Thickness (mm)</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b' }}>Temp (°C)</th>
                                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b' }}>Observation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.map((log, i) => (
                                            <tr key={log.id} style={{ borderBottom: '1px solid #e2e8f0', background: i === 0 ? '#f0fdf4' : 'transparent' }}>
                                                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0f172a' }}>#{logs.length - i}</td>
                                                <td style={{ padding: '12px 16px' }}>{log.thick}</td>
                                                <td style={{ padding: '12px 16px' }}>{log.temp}</td>
                                                <td style={{ padding: '12px 16px', fontWeight: 600, color: log.res === 'puffed' ? '#059669' : '#dc2626' }}>
                                                    {log.res.toUpperCase()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
