import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SkillSparkCanvas({ spark, title, returnPath, returnLabel, tabs = [] }) {
    const navigate = useNavigate();
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    const currentSpark = tabs.length > 0 ? tabs[activeTabIdx].spark : spark;
    const currentTitle = tabs.length > 0 ? title : title;

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#0f172a',
            margin: 0,
            overflow: 'hidden'
        }}>
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 32px',
                background: 'rgba(15,23,42,0.9)',
                backdropFilter: 'blur(10px)',
                borderBottom: tabs.length > 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                zIndex: 50
            }}>
                <button onClick={() => navigate(returnPath)} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none',
                    padding: '8px 16px', borderRadius: '100px', cursor: 'pointer',
                    fontWeight: 700, transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                >
                    ← Back to {returnLabel}
                </button>
                <div style={{
                    color: '#fff', fontSize: '20px', fontWeight: 800, fontFamily: 'Outfit, sans-serif',
                    display: 'flex', alignItems: 'center', gap: 10
                }}>
                    <span style={{ fontSize: '24px' }}>⚡</span>
                    {currentTitle}
                </div>
                <div style={{ width: 150 }} /> {/* Spacer */}
            </nav>

            {tabs.length > 0 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    background: 'rgba(15,23,42,0.9)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    padding: '0 32px 16px',
                    zIndex: 50,
                    overflowX: 'auto'
                }}>
                    {tabs.map((tab, idx) => {
                        const isActive = idx === activeTabIdx;
                        return (
                            <button
                                key={tab.spark}
                                onClick={() => setActiveTabIdx(idx)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '100px',
                                    border: 'none',
                                    background: isActive ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                                    color: isActive ? '#fff' : '#94a3b8',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseOver={(e) => {
                                    if (!isActive) e.target.style.background = 'rgba(255,255,255,0.1)';
                                }}
                                onMouseOut={(e) => {
                                    if (!isActive) e.target.style.background = 'rgba(255,255,255,0.05)';
                                }}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            )}

            <iframe 
                key={currentSpark}
                src={`/sparks/${currentSpark}.html`}
                style={{ flex: 1, width: '100%', border: 'none', background: 'transparent' }}
                title={`Interactive Spark: ${currentSpark}`}
            />
        </div>
    );
}
