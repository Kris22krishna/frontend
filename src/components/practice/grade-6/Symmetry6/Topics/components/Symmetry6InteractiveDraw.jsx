import React, { useState, useRef, useEffect } from 'react';

export default function Symmetry6InteractiveDraw({ question, onUpdate, color = '#3b82f6' }) {
    const [lines, setLines] = useState([]);
    const [activePoint, setActivePoint] = useState(null);
    const [hoverPoint, setHoverPoint] = useState(null);
    const svgRef = useRef(null);

    const W = 400;
    const H = 400;
    const GRID_SIZE = 20;

    // Report answer up whenever lines change
    useEffect(() => {
        onUpdate(lines);
    }, [lines, onUpdate]);

    const getMouseCoords = (e) => {
        if (!svgRef.current) return null;
        const pt = svgRef.current.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
        
        // Snap to grid
        const snapX = Math.round(svgP.x / GRID_SIZE) * GRID_SIZE;
        const snapY = Math.round(svgP.y / GRID_SIZE) * GRID_SIZE;
        
        // Clamp to SVG boundaries
        return {
            x: Math.max(0, Math.min(W, snapX)),
            y: Math.max(0, Math.min(H, snapY))
        };
    };

    const handlePointerDown = (e) => {
        const pt = getMouseCoords(e);
        if (!pt) return;

        if (!activePoint) {
            setActivePoint(pt);
        } else {
            // Finish line
            if (pt.x !== activePoint.x || pt.y !== activePoint.y) {
                setLines(prev => [...prev, { x1: activePoint.x, y1: activePoint.y, x2: pt.x, y2: pt.y }]);
            }
            setActivePoint(null);
        }
    };

    const handlePointerMove = (e) => {
        const pt = getMouseCoords(e);
        if (pt) setHoverPoint(pt);
    };

    const handlePointerLeave = () => {
        setHoverPoint(null);
    };

    const handleUndo = () => {
        setLines(prev => prev.slice(0, -1));
        setActivePoint(null);
    };

    const handleClear = () => {
        setLines([]);
        setActivePoint(null);
    };

    // Draw the background grid
    const gridLines = [];
    for (let x = 0; x <= W; x += GRID_SIZE) {
        gridLines.push(<line key={`vx-${x}`} x1={x} y1={0} x2={x} y2={H} stroke="#e2e8f0" strokeWidth="1" />);
    }
    for (let y = 0; y <= H; y += GRID_SIZE) {
        gridLines.push(<line key={`vy-${y}`} x1={0} y1={y} x2={W} y2={y} stroke="#e2e8f0" strokeWidth="1" />);
    }

    const polyString = Array.isArray(question.polygonData) 
        ? question.polygonData.map(p => `${p.x * GRID_SIZE},${p.y * GRID_SIZE}`).join(' ')
        : '';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: '100%', maxWidth: 450, background: '#f8fafc', padding: 20, borderRadius: 20, border: '1px solid #e2e8f0' }}>
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${W} ${H}`}
                    width="100%"
                    height="auto"
                    style={{ background: '#fff', border: '2px solid #cbd5e1', borderRadius: 8, cursor: 'crosshair', touchAction: 'none' }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerLeave={handlePointerLeave}
                >
                    {/* Grid */}
                    {gridLines}
                    
                    {/* Target Shape */}
                    <polygon points={polyString} fill={`${color}20`} stroke={color} strokeWidth="3" />
                    
                    {/* Locked Lines */}
                    {lines.map((l, i) => {
                        // Extend line theoretically if we want, or just keep as segment
                        // Drawing an extended stroke makes it look like a line of symmetry rather than a segment
                        const dx = l.x2 - l.x1;
                        const dy = l.y2 - l.y1;
                        const extX1 = l.x1 - dx * 100;
                        const extY1 = l.y1 - dy * 100;
                        const extX2 = l.x2 + dx * 100;
                        const extY2 = l.y2 + dy * 100;
                        
                        return (
                            <line 
                                key={i} x1={extX1} y1={extY1} x2={extX2} y2={extY2} 
                                stroke="#f43f5e" strokeWidth="3" strokeDasharray="8,6" strokeLinecap="round" 
                            />
                        );
                    })}
                    {lines.map((l, i) => (
                        <g key={`nodes-${i}`}>
                            <circle cx={l.x1} cy={l.y1} r="5" fill="#f43f5e" />
                            <circle cx={l.x2} cy={l.y2} r="5" fill="#f43f5e" />
                        </g>
                    ))}

                    {/* Active Dragging Line */}
                    {activePoint && hoverPoint && (
                        <line 
                            x1={activePoint.x} y1={activePoint.y} x2={hoverPoint.x} y2={hoverPoint.y} 
                            stroke="#f43f5e" strokeWidth="3" strokeDasharray="8,6" opacity="0.6" 
                        />
                    )}
                    
                    {/* Points being hovered/active */}
                    {activePoint && <circle cx={activePoint.x} cy={activePoint.y} r="6" fill="#f43f5e" />}
                    {hoverPoint && <circle cx={hoverPoint.x} cy={hoverPoint.y} r="6" fill="#f43f5e" opacity="0.4" />}
                </svg>
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
                <button 
                    onClick={handleUndo} 
                    disabled={lines.length === 0 && !activePoint}
                    style={{ padding: '8px 24px', background: '#fff', border: '2px solid #cbd5e1', borderRadius: 100, fontSize: 14, fontWeight: 700, color: '#475569', cursor: (lines.length > 0 || activePoint) ? 'pointer' : 'not-allowed', opacity: (lines.length > 0 || activePoint) ? 1 : 0.5 }}
                >
                    ↩ Undo
                </button>
                <button 
                    onClick={handleClear} 
                    disabled={lines.length === 0 && !activePoint}
                    style={{ padding: '8px 24px', background: '#fff', border: '2px solid #fca5a5', borderRadius: 100, fontSize: 14, fontWeight: 700, color: '#ef4444', cursor: (lines.length > 0 || activePoint) ? 'pointer' : 'not-allowed', opacity: (lines.length > 0 || activePoint) ? 1 : 0.5 }}
                >
                    🗑️ Clear All
                </button>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#64748b', fontWeight: 600 }}>Click anywhere on the grid intersections to start drawing and click another point to confirm.</p>
        </div>
    );
}
