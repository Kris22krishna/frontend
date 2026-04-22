import React, { useState } from 'react';

/** Interactive: click shapes to classify them as symmetric or asymmetric */
export default function TermOrderOfSymmetryInteractive() {
    const shapes = [
        { name: 'Square', order: 4, points: '30,30 70,30 70,70 30,70' },
        { name: 'Equil. Triangle', order: 3, points: '50,25 80,75 20,75' },
        { name: 'Rectangle', order: 2, points: '20,35 80,35 80,65 20,65' },
        { name: 'Circle', order: '∞', cx: 50, cy: 50, r: 25 },
        { name: 'Scalene Triangle', order: 1, points: '25,70 75,70 60,25' },
    ];
    const [selected, setSelected] = useState(0);
    const s = shapes[selected];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {shapes.map((sh, i) => (
                    <button key={i} onClick={() => setSelected(i)} style={{
                        padding: '5px 12px', borderRadius: 8, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                        background: i === selected ? '#6366f1' : '#f1f5f9', color: i === selected ? '#fff' : '#475569'
                    }}>{sh.name}</button>
                ))}
            </div>
            <svg viewBox="0 0 100 100" width="100%" style={{ maxWidth: 140, height: 'auto' }}>
                {s.cx ? (
                    <circle cx={s.cx} cy={s.cy} r={s.r} fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                ) : (
                    <polygon points={s.points} fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                )}
            </svg>
            <div style={{
                background: '#f8fafc', padding: '8px 20px', borderRadius: 10, border: '1px solid #e2e8f0',
                fontWeight: 800, fontSize: 14, color: '#6366f1', textAlign: 'center'
            }}>
                Order of rotational symmetry: <span style={{ fontSize: 20 }}>{s.order}</span>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                The order = how many times the shape maps onto itself in a full 360° turn
            </div>
        </div>
    );
}
