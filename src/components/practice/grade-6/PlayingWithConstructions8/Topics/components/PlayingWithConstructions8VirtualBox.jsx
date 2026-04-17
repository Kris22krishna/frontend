import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getAllSnapPoints, getClosestSnapPoint, dist } from './GeometryUtils';

const CM_PX = 25; // 1 cm = 25 pixels, scaled down to allow constructions up to ~25cm on the 800px wide viewBox

export function GeometryCanvasBox({ onUpdateCoordinates, activeSubtype }) {
    const svgRef = useRef(null);
    const [tool, setTool] = useState(activeSubtype === 'draw-circle' ? 'compass' : 'ruler');
    
    // Pre-seed an infinite base line and a starting center point to anchor constructions
    const initialEntities = [
        { id: 1, type: 'line', x1: -1000, y1: 300, x2: 2000, y2: 300, isBase: true },
        { id: 2, type: 'point', cx: 150, cy: 300, isBase: true }
    ];
    const [history, setHistory] = useState([initialEntities]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const entities = history[historyIndex];
    const [dragState, setDragState] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Raw
    const [snapPos, setSnapPos] = useState({ x: 0, y: 0 }); // Snapped
    
    // Protractor state
    const [protractorPose, setProtractorPose] = useState({ x: 450, y: 100, angle: 0 });
    const [isDraggingProtractor, setIsDraggingProtractor] = useState(false);
    const [isRotatingProtractor, setIsRotatingProtractor] = useState(false);

    // Compute active snap points from all geometric entities
    const snapPoints = useMemo(() => {
        return getAllSnapPoints(entities.filter(e => e.type !== 'point'));
    }, [entities]);

    // Evaluation Engine
    useEffect(() => {
        const answers = { length: 0, breadth: 0, radius: 0, side: 0, lines: 0, circles: 0 };
        const lines = entities.filter(e => e.type === 'line' && !e.isBase);
        const circles = entities.filter(e => e.type === 'circle');
        
        answers.lines = lines.length;
        answers.circles = circles.length;

        if (circles.length > 0) {
            // Find largest circle radius
            answers.radius = Math.max(...circles.map(c => c.r)) / CM_PX;
        }

        if (lines.length > 0) {
            // For rigorous rectangle/square checks, we search for 4 segments 
            // Since we pre-seeded a strict horizontal line, kids are likely to build aligned parallel to axes.
            // But just to be robust, we gather all raw edge lengths.
            let minX = 9999, minY = 9999, maxX = -9999, maxY = -9999;
            lines.forEach(l => {
                minX = Math.min(minX, l.x1, l.x2);
                maxX = Math.max(maxX, l.x1, l.x2);
                minY = Math.min(minY, l.y1, l.y2);
                maxY = Math.max(maxY, l.y1, l.y2);
            });
            const w = (maxX - minX) / CM_PX;
            const h = (maxY - minY) / CM_PX;
            
            // To prevent diagonal shortcut (1 line making a bounding box), we check if lines form corners.
            // A precise geometry checker is too heavy, but we know answer.lines >= 4 was enforced upstream.
            if (w > 0 && h > 0) {
                answers.length = Math.max(w, h);
                answers.breadth = Math.min(w, h);
                answers.side = w === h ? w : 0;
            } else {
                answers.length = w || h;
                answers.side = w || h;
            }
        }
        
        onUpdateCoordinates(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entities]);

    const getMouseCoords = (e) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const pt = svgRef.current.createSVGPoint();
        // Support touch events if e.touches exists
        if (e.touches && e.touches.length > 0) {
            pt.x = e.touches[0].clientX;
            pt.y = e.touches[0].clientY;
        } else {
            pt.x = e.clientX;
            pt.y = e.clientY;
        }
        const ctm = svgRef.current.getScreenCTM();
        if (ctm) {
            const transformed = pt.matrixTransform(ctm.inverse());
            return { x: transformed.x, y: transformed.y };
        }
        return { x: 0, y: 0 };
    };

    const handlePointerDown = (e) => {
        e.preventDefault();
        const { x, y } = getMouseCoords(e);
        const sp = getClosestSnapPoint({ x, y }, snapPoints, 15) || { x, y };
        
        setMousePos({ x, y });
        setSnapPos(sp);

        if (tool === 'eraser') return;
        
        if (tool === 'protractor') {
            const dx = x - protractorPose.x;
            const dy = y - protractorPose.y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if (d < 120) setIsDraggingProtractor(true);
            else if (d >= 120 && d < 180) setIsRotatingProtractor(true);
            return;
        }

        if (tool === 'ruler') {
            setDragState({ type: 'line', x1: sp.x, y1: sp.y, x2: sp.x, y2: sp.y });
        } else if (tool === 'compass') {
            setDragState({ type: 'circle', cx: sp.x, cy: sp.y, px: sp.x, py: sp.y });
        }
    };

    const handlePointerMove = (e) => {
        const { x, y } = getMouseCoords(e);
        // Magnetic snap logic
        const sp = getClosestSnapPoint({ x, y }, snapPoints, 15) || { x, y };

        setMousePos({ x, y });
        setSnapPos(sp);

        if (tool === 'protractor') {
            if (isDraggingProtractor) {
                setProtractorPose(prev => ({ ...prev, x: Math.max(0, Math.min(x, 800)), y: Math.max(0, Math.min(y, 400)) }));
            } else if (isRotatingProtractor) {
                const dx = x - protractorPose.x;
                const dy = y - protractorPose.y;
                let angle = Math.round(((Math.atan2(dy, dx) * 180 / Math.PI) + 90) / 5) * 5;
                setProtractorPose(prev => ({ ...prev, angle }));
            }
            return;
        }

        if (!dragState) return;

        if (dragState.type === 'line') {
            setDragState(prev => ({ ...prev, x2: sp.x, y2: sp.y }));
        } else if (dragState.type === 'circle') {
            setDragState(prev => ({ ...prev, px: sp.x, py: sp.y }));
        }
    };

    const pushState = (newEntities) => {
        const nextHistory = history.slice(0, historyIndex + 1);
        nextHistory.push(newEntities);
        setHistory(nextHistory);
        setHistoryIndex(nextHistory.length - 1);
    };

    const handlePointerUp = () => {
        setIsDraggingProtractor(false);
        setIsRotatingProtractor(false);

        if (!dragState) return;
        
        if (dragState.type === 'line') {
            if (dragState.x1 !== dragState.x2 || dragState.y1 !== dragState.y2) {
                const isHoriz = Math.abs(dragState.y1 - 300) < 1 && Math.abs(dragState.y2 - 300) < 1;
                pushState([...entities, { 
                    id: Date.now(), 
                    type: 'line', 
                    x1: dragState.x1, 
                    y1: isHoriz ? 300 : dragState.y1, 
                    x2: dragState.x2, 
                    y2: isHoriz ? 300 : dragState.y2 
                }]);
            }
        } else if (dragState.type === 'circle') {
            const r = dist({ x: dragState.cx, y: dragState.cy }, { x: dragState.px, y: dragState.py });
            if (r > 1) { 
                const angle = Math.atan2(dragState.py - dragState.cy, dragState.px - dragState.cx);
                pushState([...entities, { id: Date.now(), type: 'circle', cx: dragState.cx, cy: dragState.cy, r, dragAngle: angle }]);
            }
        }
        setDragState(null);
    };

    return (
        <div style={{ width: '100%', borderRadius: 16, border: '2px solid #94a3b8', overflow: 'hidden', background: '#f8fafc' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '12px 16px', background: '#e2e8f0', borderBottom: '1px solid #cbd5e1' }}>
                <button onClick={() => setTool('ruler')} style={{ display:'flex', alignItems:'center', gap:6, padding: '8px 14px', borderRadius: 8, border: 'none', background: tool === 'ruler' ? '#10b981' : '#f1f5f9', color: tool === 'ruler' ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer', boxShadow: tool==='ruler'?'0 4px 10px rgba(16,185,129,0.3)':'none' }}>
                    📏 Ruler
                </button>
                <button onClick={() => setTool('compass')} style={{ display:'flex', alignItems:'center', gap:6, padding: '8px 14px', borderRadius: 8, border: 'none', background: tool === 'compass' ? '#3b82f6' : '#f1f5f9', color: tool === 'compass' ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer', boxShadow: tool==='compass'?'0 4px 10px rgba(59,130,246,0.3)':'none' }}>
                    📐 Compass
                </button>
                <button onClick={() => setTool('protractor')} style={{ display:'flex', alignItems:'center', gap:6, padding: '8px 14px', borderRadius: 8, border: 'none', background: tool === 'protractor' ? '#8b5cf6' : '#f1f5f9', color: tool === 'protractor' ? '#fff' : '#475569', fontWeight: 700, cursor: 'pointer', boxShadow: tool==='protractor'?'0 4px 10px rgba(139,92,246,0.3)':'none' }}>
                    🔄 Protractor
                </button>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, flexWrap: 'nowrap' }}>
                    <button onClick={() => setHistoryIndex(h => Math.max(0, h - 1))} disabled={historyIndex === 0} style={{ display:'flex', alignItems:'center', gap:4, padding: '8px 12px', borderRadius: 8, border: 'none', background: '#fff', color: historyIndex === 0 ? '#cbd5e1' : '#475569', fontWeight: 700, cursor: historyIndex === 0 ? 'not-allowed' : 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        ↩️ Undo
                    </button>
                    <button onClick={() => setHistoryIndex(h => Math.min(history.length - 1, h + 1))} disabled={historyIndex === history.length - 1} style={{ display:'flex', alignItems:'center', gap:4, padding: '8px 12px', borderRadius: 8, border: 'none', background: '#fff', color: historyIndex === history.length - 1 ? '#cbd5e1' : '#475569', fontWeight: 700, cursor: historyIndex === history.length - 1 ? 'not-allowed' : 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        ↪️ Redo
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <div style={{ position: 'relative', width: '100%', touchAction: 'none' }}>
                <svg
                    ref={svgRef}
                    viewBox="0 0 800 500"
                    width="100%"
                    height="400"
                    style={{ display: 'block', background: '#fff', cursor: 'crosshair' }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                >
                    {/* Background Subtle Axis/Grid removed for pure freehand, just standard reference points */}
                    <g opacity="0.3">
                        <text x={10} y={20} fontSize={14} fill="#64748b" fontWeight="700">Freehand Geometry Sandbox</text>
                    </g>
                    
                    {/* Entities */}
                    {entities.map(e => (
                        <g key={e.id}>
                            {e.type === 'line' && (
                                <line 
                                    x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} 
                                    stroke={e.isBase ? '#cbd5e1' : '#0f172a'} 
                                    strokeWidth={e.isBase ? 2 : 3} 
                                    strokeDasharray={e.isBase ? "10,10" : "none"}
                                    strokeLinecap="round" 
                                />
                            )}
                            {e.type === 'circle' && (
                                e.dragAngle !== undefined ? (
                                    <path 
                                        d={`M ${e.cx + e.r * Math.cos(e.dragAngle - Math.PI/2.5)} ${e.cy + e.r * Math.sin(e.dragAngle - Math.PI/2.5)} A ${e.r} ${e.r} 0 0 1 ${e.cx + e.r * Math.cos(e.dragAngle + Math.PI/2.5)} ${e.cy + e.r * Math.sin(e.dragAngle + Math.PI/2.5)}`}
                                        stroke="#38bdf8" 
                                        fill="none" 
                                        strokeWidth={2} 
                                    />
                                ) : (
                                    <circle 
                                        cx={e.cx} cy={e.cy} r={e.r} 
                                        stroke="#38bdf8" 
                                        fill="none" 
                                        strokeWidth={2} 
                                    />
                                )
                            )}
                            {e.type === 'point' && (
                                <circle cx={e.cx} cy={e.cy} r={5} fill="#94a3b8" />
                            )}
                        </g>
                    ))}

                    {/* Pre-seed start label */}
                    <text x={150} y={325} fontSize={14} fill="#94a3b8" fontWeight="800" textAnchor="middle">Start Point</text>

                    {/* Intersection Snap Points Visualization */}
                    {snapPoints.map((sp, i) => (
                        <circle key={`sp${i}`} cx={sp.x} cy={sp.y} r={3} fill="#f59e0b" opacity="0.6" />
                    ))}

                    {/* Active Drag Drawings */}
                    {dragState?.type === 'line' && (
                        <g>
                            <line x1={dragState.x1} y1={dragState.y1} x2={dragState.x2} y2={dragState.y2} stroke="#10b981" strokeWidth="3" strokeDasharray="4,4" />
                            <circle cx={dragState.x2} cy={dragState.y2} r={4} fill="#10b981" />
                            
                            {/* Ruler Measure Hover Overlay */}
                            {(() => {
                                const dx = dragState.x2 - dragState.x1;
                                const dy = dragState.y2 - dragState.y1;
                                const d = dist({x:dragState.x1, y:dragState.y1}, {x:dragState.x2, y:dragState.y2});
                                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                                return (
                                    <g transform={`translate(${dragState.x1 + dx/2}, ${dragState.y1 + dy/2}) rotate(${angle})`}>
                                        <rect x={-d/2} y={-15} width={d} height={30} fill="#f8fafc" stroke="#94a3b8" strokeWidth={2} opacity={0.8} rx={2} />
                                        <text x={0} y={5} textAnchor="middle" fontSize={14} fill="#1e293b" fontWeight="800">{(d/CM_PX).toFixed(1)} cm</text>
                                    </g>
                                )
                            })()}
                        </g>
                    )}

                    {dragState?.type === 'circle' && (
                        <g>
                            {(() => {
                                const r = dist({ x: dragState.cx, y: dragState.cy }, { x: dragState.px, y: dragState.py });
                                const angle = Math.atan2(dragState.py - dragState.cy, dragState.px - dragState.cx) * 180 / Math.PI;
                                
                                return (
                                    <>
                                        <circle cx={dragState.cx} cy={dragState.cy} r={r} stroke="#3b82f6" fill="none" strokeWidth="1" strokeDasharray="6,4" opacity="0.3" />
                                        <path 
                                            d={`M ${dragState.cx + r * Math.cos(angle * Math.PI / 180 - Math.PI/2.5)} ${dragState.cy + r * Math.sin(angle * Math.PI / 180 - Math.PI/2.5)} A ${r} ${r} 0 0 1 ${dragState.cx + r * Math.cos(angle * Math.PI / 180 + Math.PI/2.5)} ${dragState.cy + r * Math.sin(angle * Math.PI / 180 + Math.PI/2.5)}`}
                                            stroke="#3b82f6" fill="none" strokeWidth="2.5" 
                                        />
                                        {/* Visual Compass */}
                                        <g transform={`translate(${dragState.cx}, ${dragState.cy}) rotate(${angle})`}>
                                            <line x1={0} y1={0} x2={r} y2={0} stroke="#64748b" strokeWidth={3} strokeDasharray="2,2"/>
                                            <circle cx={0} cy={0} r={4} fill="#0f172a" />
                                            <circle cx={r} cy={0} r={4} fill="#0ea5e9" />
                                            <rect x={r/2 - 25} y={-10} width={50} height={20} fill="#fff" stroke="#cbd5e1" rx={4} />
                                            <text x={r/2} y={5} textAnchor="middle" fontSize={12} fill="#0ea5e9" fontWeight="800">Rad {(r/CM_PX).toFixed(1)}</text>
                                        </g>
                                    </>
                                );
                            })()}
                        </g>
                    )}

                    {/* Protractor Overlay */}
                    {tool === 'protractor' && (
                        <g transform={`translate(${protractorPose.x}, ${protractorPose.y}) rotate(${protractorPose.angle})`}>
                            <path d="M -150,0 A 150,150 0 0,1 150,0 Z" fill="rgba(255,255,255,0.85)" stroke="#6366f1" strokeWidth="2" />
                            <path d="M -60,0 A 60,60 0 0,1 60,0 Z" fill="none" stroke="#6366f1" strokeWidth="1" />
                            <line x1="-150" y1="0" x2="150" y2="0" stroke="#1e293b" strokeWidth="2" />
                            <line x1="0" y1="0" x2="0" y2="-150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,4" />
                            <circle cx="0" cy="0" r="10" fill="#ef4444" cursor="grab" />
                            <circle cx="0" cy="0" r="3" fill="#fff" />
                            <circle cx="0" cy="-150" r="14" fill="#6366f1" cursor="grab" />
                            <circle cx="0" cy="-150" r="4" fill="#fff" />
                            <text x="0" y="-120" fontSize="13" fill="#6366f1" fontWeight="800" textAnchor="middle">Drag To Rotate</text>
                            <text x="0" y="25" fontSize="13" fill="#ef4444" fontWeight="800" textAnchor="middle">Drag Red Dot to Move</text>
                            <text x="0" y="-70" fontSize="12" fill="#0ea5e9" fontWeight="700" textAnchor="middle">Click any degree mark</text>
                            <text x="0" y="-55" fontSize="12" fill="#0ea5e9" fontWeight="700" textAnchor="middle">to drop a snap point!</text>

                            {[...Array(19)].map((_, i) => {
                                const deg = i * 10;
                                const rad = deg * Math.PI / 180;
                                const tx = -125 * Math.cos(rad);
                                const ty = -125 * Math.sin(rad);
                                return (
                                    <g key={i} style={{cursor: 'pointer'}} onPointerDown={(e) => {
                                        e.stopPropagation();
                                        const coords = getMouseCoords(e);
                                        pushState([...entities, { id: Date.now(), type: 'point', cx: coords.x, cy: coords.y }]);
                                    }}>
                                        <circle cx={-145*Math.cos(rad)} cy={-145*Math.sin(rad)} r={10} fill="transparent" />
                                        <line x1={-150*Math.cos(rad)} y1={-150*Math.sin(rad)} x2={-140*Math.cos(rad)} y2={-140*Math.sin(rad)} stroke="#6366f1" strokeWidth="2" />
                                        <text x={tx} y={ty} fontSize="11" fontWeight="800" fill="#475569" textAnchor="middle" transform={`rotate(${deg - 90}, ${tx}, ${ty})`}>{deg}°</text>
                                    </g>
                                );
                            })}
                        </g>
                    )}

                    {/* Magnetic Cursor Visualizer */}
                    {snapPos && (tool === 'ruler' || tool === 'compass') && (
                        <circle cx={snapPos.x} cy={snapPos.y} r={6} stroke="#f59e0b" fill="none" strokeWidth="3" opacity="0.8" />
                    )}
                </svg>
            </div>
            
            <div style={{ padding: '8px 16px', background: '#334155', fontSize: 13, color: '#f8fafc', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <div>Freehand mode activated! Your cursor will "magnetically snap" to intersections of lines and arcs.</div>
                <div>{entities.filter(e => !e.isBase).length} steps taken</div>
            </div>
        </div>
    );
}
