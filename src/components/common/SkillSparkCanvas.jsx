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
            background: '#ffffff',
            margin: 0,
            overflow: 'hidden'
        }}>
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                borderBottom: tabs.length > 0 ? 'none' : '1px solid #e2e8f0',
                zIndex: 50,
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <button onClick={() => navigate(returnPath)} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: '#f1f5f9', color: '#1e293b', border: 'none',
                    padding: '8px 16px', borderRadius: '100px', cursor: 'pointer',
                    fontWeight: 700, transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif'
                }}
                onMouseOver={(e) => e.target.style.background = '#e2e8f0'}
                onMouseOut={(e) => e.target.style.background = '#f1f5f9'}
                >
                    ← Back to {returnLabel}
                </button>
                <div style={{
                    color: '#0f172a', fontSize: '20px', fontWeight: 800, fontFamily: 'Outfit, sans-serif',
                    display: 'flex', alignItems: 'center', gap: 10
                }}>
                    <span style={{ fontSize: '24px' }}>⚡</span>
                    {currentTitle}
                </div>
            </nav>

            {tabs.length > 0 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 8,
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid #e2e8f0',
                    padding: '0 20px 16px',
                    zIndex: 50,
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch'
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
                                    background: isActive ? '#3b82f6' : '#f1f5f9',
                                    color: isActive ? '#ffffff' : '#64748b',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseOver={(e) => {
                                    if (!isActive) e.target.style.background = '#e2e8f0';
                                }}
                                onMouseOut={(e) => {
                                    if (!isActive) e.target.style.background = '#f1f5f9';
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
