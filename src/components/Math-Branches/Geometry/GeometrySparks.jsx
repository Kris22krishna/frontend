import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');

    .gs-root {
        width: 100%; height: 100vh;
        display: flex; flex-direction: column;
        background: #f8fafc;
        overflow: hidden;
        overflow-x: hidden;
        font-family: 'Outfit', 'Inter', sans-serif;
    }

    /* ── Top nav bar ─────────────────────────────────── */
    .gs-nav {
        display: flex; align-items: center;
        padding: 0 28px;
        min-height: 62px;
        background: #ffffff;
        border-bottom: 2px solid #e2e8f0;
        gap: 16px; flex-shrink: 0; z-index: 50;
    }
    .gs-back {
        display: flex; align-items: center; gap: 6px;
        background: #f1f5f9; color: #334155;
        border: none; padding: 10px 20px;
        border-radius: 100px; cursor: pointer;
        font-weight: 700; font-family: 'Outfit', sans-serif;
        font-size: 14px; transition: background 0.2s;
        white-space: nowrap; flex-shrink: 0;
    }
    .gs-back:hover { background: #e2e8f0; }
    .gs-title {
        color: #0f172a; font-size: 20px; font-weight: 800;
        font-family: 'Outfit', sans-serif;
        display: flex; align-items: center; gap: 10px; flex: 1;
        letter-spacing: -0.3px;
    }

    /* ── Collapsible bars wrapper ─────────────────────── */
    .gs-bars {
        display: flex; flex-direction: column;
        flex-shrink: 0; overflow: hidden;
        max-height: 160px;
        transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1),
                    opacity 0.32s ease;
        opacity: 1;
    }
    .gs-bars.collapsed {
        max-height: 0;
        opacity: 0;
        pointer-events: none;
    }

    /* ── Branch selector bar ─────────────────────────── */
    .gs-branch-bar {
        display: flex; align-items: center; gap: 10px;
        background: #ffffff;
        border-bottom: 2px solid #e2e8f0;
        padding: 14px 28px;
        min-height: 68px;
        z-index: 49; overflow-x: auto; flex-shrink: 0;
        scrollbar-width: none;
    }
    .gs-branch-bar::-webkit-scrollbar { display: none; }
    .gs-branch-btn {
        display: flex; align-items: center; gap: 8px;
        padding: 11px 22px;
        border-radius: 100px;
        border: 2px solid #e2e8f0;
        font-family: 'Outfit', sans-serif; font-weight: 700;
        font-size: 14px; cursor: pointer;
        transition: all 0.22s; white-space: nowrap; flex-shrink: 0;
        background: #f8fafc; color: #475569;
    }
    .gs-branch-btn:hover:not(.gs-branch-active) {
        border-color: #cbd5e1; background: #f1f5f9;
    }

    /* ── Spark tab row ────────────────────────────────── */
    .gs-tab-section {
        display: flex; align-items: center; gap: 10px;
        background: #f8fafc;
        border-bottom: 2px solid #e2e8f0;
        padding: 12px 28px;
        min-height: 58px;
        z-index: 48; overflow-x: auto; flex-shrink: 0;
        scrollbar-width: none;
    }
    .gs-tab-section::-webkit-scrollbar { display: none; }
    .gs-tab-eyebrow {
        font-size: 11px; font-weight: 800; letter-spacing: 2px;
        text-transform: uppercase; color: #94a3b8;
        white-space: nowrap; flex-shrink: 0; padding-right: 10px;
        border-right: 2px solid #e2e8f0; margin-right: 4px;
    }
    .gs-tab-btn {
        padding: 9px 22px;
        border-radius: 100px;
        border: 2px solid #e2e8f0;
        background: #ffffff; color: #64748b;
        font-family: 'Outfit', sans-serif; font-weight: 700;
        font-size: 14px; cursor: pointer;
        transition: all 0.18s; white-space: nowrap; flex-shrink: 0;
    }
    .gs-tab-btn:hover:not(.gs-tab-active) {
        border-color: #cbd5e1; background: #f1f5f9;
    }

    /* ── Peek button (shown when bars are hidden) ─────── */
    .gs-peek {
        position: absolute; top: 70px; right: 24px;
        z-index: 60; display: flex; align-items: center; gap: 6px;
        background: #ffffff; border: 1.5px solid #e2e8f0;
        color: #475569; font-family: 'Outfit', sans-serif;
        font-size: 13px; font-weight: 700;
        padding: 7px 14px; border-radius: 100px;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(0,0,0,0.1);
        transition: all 0.22s;
        opacity: 0; pointer-events: none;
        transform: translateY(-6px);
    }
    .gs-peek.visible {
        opacity: 1; pointer-events: auto;
        transform: translateY(0);
    }
    .gs-peek:hover { background: #f1f5f9; border-color: #94a3b8; }

    /* ── Iframe area ─────────────────────────────────── */
    .gs-iframe-wrap {
        flex: 1; overflow: hidden;
        position: relative;
    }
    .gs-iframe-wrap iframe {
        width: 100%; height: 100%; border: none;
        background: transparent; display: block;
    }
`;

const BRANCHES = [
    {
        id: 'basic', label: 'Basic Geometry', emoji: '📐', color: '#0ea5e9',
        sparks: [
            { spark: 'geo-angles',         label: '1. Angles' },
            { spark: 'geo-parallel-lines', label: '2. Parallel Lines' },
            { spark: 'geo-triangle-types', label: '3. Triangle Types' },
            { spark: 'geo-coordinates',    label: '4. Coordinates' },
        ],
    },
    {
        id: 'polygons', label: 'Polygons', emoji: '🔷', color: '#10b981',
        sparks: [
            { spark: 'geo-polygon-rect',    label: '1. Rectangles & Squares' },
            { spark: 'geo-polygon-para',    label: '2. Parallelograms' },
            { spark: 'geo-polygon-rhombus', label: '3. Rhombus & Kite' },
            { spark: 'geo-polygon-trap',    label: '4. Trapezium' },
        ],
    },
    {
        id: 'triangles', label: 'Triangles', emoji: '🔺', color: '#f59e0b',
        sparks: [
            { spark: 'geo-pythagoras',  label: '1. Pythagoras' },
            { spark: 'geo-tri-area',    label: '2. Triangle Area' },
            { spark: 'geo-tri-angles',  label: '3. Angle Sum' },
            { spark: 'geo-congruence',  label: '4. Congruence & Similarity' },
        ],
    },
    {
        id: 'circles', label: 'Circles', emoji: '⭕', color: '#f43f5e',
        sparks: [
            { spark: 'geo-circumference',   label: '1. Circumference' },
            { spark: 'geo-arc-sector',      label: '2. Arc & Sector' },
            { spark: 'geo-chord-tangent',   label: '3. Chord & Tangent' },
            { spark: 'geo-circle-theorems', label: '4. Circle Theorems' },
        ],
    },
    {
        id: 'mensuration', label: 'Mensuration', emoji: '📏', color: '#8b5cf6',
        sparks: [
            { spark: 'geo-mensuration-area',  label: '1. 2D Areas' },
            { spark: 'geo-mensuration-perim', label: '2. Perimeter' },
            { spark: 'geo-mensuration-vol',   label: '3. Volume & SA' },
        ],
    },
    {
        id: '3d', label: '3D Geometry', emoji: '🧊', color: '#ec4899',
        sparks: [
            { spark: 'geo-solid-cuboid',   label: '1. Cuboid' },
            { spark: 'geo-solid-cylinder', label: '2. Cylinder' },
            { spark: 'geo-solid-cone',     label: '3. Cone' },
            { spark: 'geo-solid-sphere',   label: '4. Sphere' },
        ],
    },
    {
        id: 'transformations', label: 'Transformations', emoji: '🔄', color: '#06b6d4',
        sparks: [
            { spark: 'geo-translation', label: '1. Translation' },
            { spark: 'geo-reflection',  label: '2. Reflection' },
            { spark: 'geo-rotation',    label: '3. Rotation' },
            { spark: 'geo-dilation',    label: '4. Dilation' },
        ],
    },
];

export default function GeometrySparks() {
    const navigate = useNavigate();
    const [branchIdx, setBranchIdx] = useState(0);
    const [sparkIdx,  setSparkIdx]  = useState(0);
    const [collapsed, setCollapsed] = useState(false);

    const iframeRef = useRef(null);
    const scrollListenerRef = useRef(null);

    const branch       = BRANCHES[branchIdx];
    const currentSpark = branch.sparks[sparkIdx].spark;

    function selectBranch(idx) { setBranchIdx(idx); setSparkIdx(0); }

    // Attach scroll listener to iframe content window after it loads
    const attachScrollListener = useCallback(() => {
        try {
            const win = iframeRef.current?.contentWindow;
            if (!win) return;

            // Clean up previous listener
            if (scrollListenerRef.current) {
                try { win.removeEventListener('scroll', scrollListenerRef.current); } catch {}
            }

            const handler = () => {
                const scrolled = win.scrollY > 90;
                setCollapsed(scrolled);
            };
            scrollListenerRef.current = handler;
            win.addEventListener('scroll', handler, { passive: true });
            // Reset on new spark
            setCollapsed(false);
        } catch (e) {
            // Same-origin guard — ignore if blocked
        }
    }, []);

    useEffect(() => {
        setCollapsed(false); // Reset bars when spark changes
    }, [currentSpark]);

    return (
        <div className="gs-root" style={{ position: 'relative' }}>
            <style>{css}</style>

            {/* ── Top nav ── */}
            <nav className="gs-nav">
                <button className="gs-back" onClick={() => navigate('/geometry')}>
                    ← Geometry
                </button>
                <div className="gs-title">
                    <span style={{ fontSize: 20 }}>⚡</span>
                    Geometry Skill Sparks
                </div>
            </nav>

            {/* ── Peek button (visible only when bars are hidden) ── */}
            <button
                className={`gs-peek${collapsed ? ' visible' : ''}`}
                onClick={() => setCollapsed(false)}
                title="Show navigation"
            >
                ☰ Show nav
            </button>

            {/* ── Collapsible branch + spark bars ── */}
            <div className={`gs-bars${collapsed ? ' collapsed' : ''}`}>
                {/* Branch row */}
                <div className="gs-branch-bar">
                    {BRANCHES.map((br, idx) => {
                        const active = idx === branchIdx;
                        return (
                            <button
                                key={br.id}
                                className={`gs-branch-btn${active ? ' gs-branch-active' : ''}`}
                                onClick={() => selectBranch(idx)}
                                style={active ? {
                                    background: br.color,
                                    color: '#fff',
                                    border: `2px solid ${br.color}`,
                                    boxShadow: `0 3px 14px ${br.color}55`,
                                } : {}}
                            >
                                <span style={{ fontSize: 16 }}>{br.emoji}</span>
                                {br.label}
                            </button>
                        );
                    })}
                </div>

                {/* Spark tab row */}
                <div className="gs-tab-section">
                    <span className="gs-tab-eyebrow">{branch.label}</span>
                    {branch.sparks.map((sp, idx) => {
                        const active = idx === sparkIdx;
                        return (
                            <button
                                key={sp.spark}
                                className={`gs-tab-btn${active ? ' gs-tab-active' : ''}`}
                                onClick={() => setSparkIdx(idx)}
                                style={active ? {
                                    background: branch.color,
                                    color: '#fff',
                                    border: `2px solid ${branch.color}`,
                                    boxShadow: `0 2px 10px ${branch.color}44`,
                                } : {}}
                            >
                                {sp.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Iframe ── */}
            <div className="gs-iframe-wrap">
                <iframe
                    ref={iframeRef}
                    key={currentSpark}
                    src={`/sparks/${currentSpark}.html`}
                    title={`Spark: ${currentSpark}`}
                    onLoad={attachScrollListener}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
}
