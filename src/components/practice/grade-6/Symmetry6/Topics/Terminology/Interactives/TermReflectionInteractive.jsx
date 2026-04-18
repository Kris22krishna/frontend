import React, { useState } from 'react';

/** Interactive: see reflection of labeled points across the axis */
export default function TermReflectionInteractive() {
    const [showReflection, setShowReflection] = useState(false);
    const points = [
        { label: 'A', x: 60, y: 40, rx: 180, ry: 40 },
        { label: 'B', x: 80, y: 120, rx: 160, ry: 120 },
        { label: 'C', x: 40, y: 140, rx: 200, ry: 140 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 240 180" width="100%" style={{ maxWidth: 280, height: 'auto' }}>
                {/* Axis */}
                <line x1="120" y1="10" x2="120" y2="170" stroke="#6366f1" strokeWidth="2" strokeDasharray="6,4" />
                <text x="120" y="8" textAnchor="middle" fontSize="10" fill="#6366f1" fontWeight="700">Mirror Line</text>

                {/* Original shape */}
                <polygon points={points.map(p => `${p.x},${p.y}`).join(' ')} fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                {points.map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill="#3b82f6" />
                        <text x={p.x - 12} y={p.y + 4} fontSize="12" fill="#3b82f6" fontWeight="800">{p.label}</text>
                    </g>
                ))}

                {/* Reflected shape */}
                {showReflection && (
                    <>
                        <polygon points={points.map(p => `${p.rx},${p.ry}`).join(' ')} fill="#fce7f3" stroke="#ec4899" strokeWidth="2" opacity="0.8">
                            <animate attributeName="opacity" from="0" to="0.8" dur="0.5s" fill="freeze" />
                        </polygon>
                        {points.map((p, i) => (
                            <g key={`r${i}`}>
                                <circle cx={p.rx} cy={p.ry} r="5" fill="#ec4899" />
                                <text x={p.rx + 8} y={p.ry + 4} fontSize="12" fill="#ec4899" fontWeight="800">{p.label}'</text>
                                {/* Connecting dashes */}
                                <line x1={p.x} y1={p.y} x2={p.rx} y2={p.ry} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                            </g>
                        ))}
                    </>
                )}
            </svg>
            <button onClick={() => setShowReflection(r => !r)} style={{
                padding: '6px 18px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                background: showReflection ? '#ec4899' : '#3b82f6', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>{showReflection ? '🪞 Hide Reflection' : '🪞 Show Reflection'}</button>
        </div>
    );
}
