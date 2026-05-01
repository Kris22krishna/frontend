import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = `
    .ssc-root {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        margin: 0;
        overflow: hidden;
    }
    .ssc-nav {
        display: flex;
        align-items: center;
        padding: 10px 14px;
        background: rgba(255,255,255,0.97);
        backdrop-filter: blur(10px);
        z-index: 50;
        gap: 10px;
        flex-shrink: 0;
    }
    .ssc-nav-has-border { border-bottom: 1px solid #e2e8f0; }
    .ssc-back-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        background: #f1f5f9;
        color: #1e293b;
        border: none;
        padding: 7px 12px;
        border-radius: 100px;
        cursor: pointer;
        font-weight: 700;
        font-family: 'Outfit', sans-serif;
        font-size: 13px;
        transition: background 0.2s;
        white-space: nowrap;
        flex-shrink: 0;
    }
    .ssc-back-btn:hover { background: #e2e8f0; }
    .ssc-title {
        color: #0f172a;
        font-size: 15px;
        font-weight: 800;
        font-family: 'Outfit', sans-serif;
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 0;
        flex: 1;
    }
    .ssc-title-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .ssc-tab-bar {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(255,255,255,0.97);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #e2e8f0;
        padding: 8px 14px 10px;
        z-index: 50;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        flex-shrink: 0;
    }
    .ssc-tab-bar::-webkit-scrollbar { display: none; }
    .ssc-tab-btn {
        padding: 6px 13px;
        border-radius: 100px;
        border: none;
        font-family: 'Outfit', sans-serif;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
        flex-shrink: 0;
    }
    .ssc-iframe-wrapper {
        flex: 1;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
    }
    .ssc-iframe-wrapper iframe {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        display: block;
        min-width: 0;
    }
    @media (max-width: 600px) {
        .ssc-title { font-size: 13px; }
        .ssc-back-btn { font-size: 12px; padding: 6px 10px; }
        .ssc-tab-btn { font-size: 12px; padding: 6px 10px; }
        .ssc-iframe-wrapper {
            overflow-x: auto;
        }
        .ssc-iframe-wrapper iframe {
            min-width: 100%;
            width: 100%;
        }
    }
`;

export default function SkillSparkCanvas({ spark, title, returnPath, returnLabel, tabs = [] }) {
    const navigate = useNavigate();
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    const currentSpark = tabs.length > 0 ? tabs[activeTabIdx].spark : spark;
    const hasTabs = tabs.length > 0;

    return (
        <div className="ssc-root">
            <style>{styles}</style>

            <nav className={`ssc-nav ${hasTabs ? '' : 'ssc-nav-has-border'}`}>
                <button className="ssc-back-btn" onClick={() => navigate(returnPath)}>
                    ←&nbsp;{returnLabel}
                </button>
                <div className="ssc-title">
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>⚡</span>
                    <span className="ssc-title-text">{title}</span>
                </div>
            </nav>

            {hasTabs && (
                <div className="ssc-tab-bar">
                    {tabs.map((tab, idx) => {
                        const isActive = idx === activeTabIdx;
                        return (
                            <button
                                key={tab.spark}
                                className="ssc-tab-btn"
                                onClick={() => setActiveTabIdx(idx)}
                                style={{
                                    background: isActive ? '#3b82f6' : '#f1f5f9',
                                    color: isActive ? '#fff' : '#64748b',
                                }}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Wrapper allows the spark canvas to scroll horizontally if its
                internal content is wider than the mobile viewport */}
            <div className="ssc-iframe-wrapper">
                <iframe
                    key={currentSpark}
                    src={`/sparks/${currentSpark}.html`}
                    title={`Interactive Spark: ${currentSpark}`}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
}
