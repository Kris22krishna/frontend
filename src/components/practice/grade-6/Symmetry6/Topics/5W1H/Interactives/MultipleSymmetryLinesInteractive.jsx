import React, { useState } from 'react';

/**
 * Interactive: tap to count lines of symmetry on different shapes.
 */
export default function MultipleSymmetryLinesInteractive() {
    const shapes = [
        { name: 'Square', lines: 4, svg: (
            <g>
                <rect x="100" y="50" width="100" height="100" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5" rx="2" />
                <text x="100" y="45" fontSize="12" fill="#3b82f6" fontWeight="800">A</text>
                <text x="205" y="45" fontSize="12" fill="#3b82f6" fontWeight="800">B</text>
                <text x="205" y="165" fontSize="12" fill="#3b82f6" fontWeight="800">C</text>
                <text x="100" y="165" fontSize="12" fill="#3b82f6" fontWeight="800">D</text>
            </g>
        ), lineCoords: [
            [150, 30, 150, 170],   // vertical
            [80, 100, 220, 100],   // horizontal
            [90, 40, 210, 160],    // diagonal 1
            [210, 40, 90, 160],    // diagonal 2
        ]},
        { name: 'Equilateral Triangle', lines: 3, svg: (
            <g>
                <polygon points="150,30 80,160 220,160" fill="#dcfce7" stroke="#10b981" strokeWidth="2.5" />
                <text x="150" y="24" fontSize="12" fill="#10b981" fontWeight="800" textAnchor="middle">A</text>
                <text x="70" y="175" fontSize="12" fill="#10b981" fontWeight="800">B</text>
                <text x="225" y="175" fontSize="12" fill="#10b981" fontWeight="800">C</text>
            </g>
        ), lineCoords: [
            [150, 20, 150, 170],
            [80, 160, 185, 50],
            [220, 160, 115, 50],
        ]},
        { name: 'Regular Hexagon', lines: 6, svg: (
            <g>
                <polygon points="150,30 210,65 210,135 150,170 90,135 90,65" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
            </g>
        ), lineCoords: [
            [150, 20, 150, 180],
            [90, 65, 210, 135],
            [210, 65, 90, 135],
            [80, 100, 220, 100],
            [100, 40, 200, 160],
            [200, 40, 100, 160],
        ]},
    ];

    const [shapeIdx, setShapeIdx] = useState(0);
    const [revealed, setRevealed] = useState(0);
    const shape = shapes[shapeIdx];

    const revealNext = () => {
        if (revealed < shape.lines) setRevealed(r => r + 1);
    };

    const changeShape = (idx) => {
        setShapeIdx(idx);
        setRevealed(0);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            {/* Shape selector */}
            <div style={{ display: 'flex', gap: 8 }}>
                {shapes.map((s, i) => (
                    <button key={i} onClick={() => changeShape(i)} style={{
                        padding: '6px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        background: i === shapeIdx ? '#3b82f6' : '#f1f5f9', color: i === shapeIdx ? '#fff' : '#475569'
                    }}>{s.name}</button>
                ))}
            </div>

            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 320, height: 'auto' }}>
                {shape.svg}
                {/* Revealed symmetry lines */}
                {shape.lineCoords.slice(0, revealed).map((c, i) => (
                    <line key={i} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" opacity="0.8">
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />
                    </line>
                ))}
            </svg>

            <button onClick={revealNext} disabled={revealed >= shape.lines} style={{
                padding: '8px 20px', borderRadius: 10, border: 'none', fontWeight: 700, fontSize: 13, cursor: revealed >= shape.lines ? 'not-allowed' : 'pointer',
                background: revealed >= shape.lines ? '#e2e8f0' : 'linear-gradient(135deg, #3b82f6, #6366f1)', color: revealed >= shape.lines ? '#94a3b8' : '#fff',
                boxShadow: revealed >= shape.lines ? 'none' : '0 4px 12px rgba(59,130,246,0.3)'
            }}>
                {revealed >= shape.lines ? `All ${shape.lines} lines found! ✨` : `Reveal Line ${revealed + 1} of ${shape.lines}`}
            </button>
        </div>
    );
}
