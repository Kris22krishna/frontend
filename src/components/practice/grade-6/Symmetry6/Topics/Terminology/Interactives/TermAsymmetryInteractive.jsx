import React, { useState } from 'react';

/** Interactive: compare shapes with and without symmetry */
export default function TermAsymmetryInteractive() {
    const [idx, setIdx] = useState(0);
    const items = [
        { name: 'Butterfly', hasSym: true, type: 'Reflection', svg: (
            <g>
                <line x1="100" y1="20" x2="100" y2="130" stroke="#10b981" strokeWidth="2" strokeDasharray="5,3" />
                <path d="M100,40 C80,20 30,30 30,60 C30,90 70,110 100,110" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                <path d="M100,40 C120,20 170,30 170,60 C170,90 130,110 100,110" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
                <ellipse cx="100" cy="75" rx="4" ry="35" fill="#065f46" />
            </g>
        )},
        { name: 'Cloud', hasSym: false, type: 'None', svg: (
            <g>
                <ellipse cx="80" cy="80" rx="45" ry="30" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <ellipse cx="110" cy="65" rx="35" ry="25" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <ellipse cx="60" cy="70" rx="25" ry="20" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
            </g>
        )},
        { name: 'Windmill', hasSym: true, type: 'Rotational (not Reflection)', svg: (
            <g>
                {[0,90,180,270].map((a,i) => (
                    <path key={i} d={`M100,75 L90,30 Q100,20 110,30 Z`} fill={['#ef4444','#3b82f6','#10b981','#f59e0b'][i]} opacity="0.8"
                        transform={`rotate(${a}, 100, 75)`} />
                ))}
                <circle cx="100" cy="75" r="5" fill="#1e293b" />
            </g>
        )},
    ];
    const item = items[idx];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6 }}>
                {items.map((it, i) => (
                    <button key={i} onClick={() => setIdx(i)} style={{
                        padding: '5px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        background: i === idx ? '#6366f1' : '#f1f5f9', color: i === idx ? '#fff' : '#475569'
                    }}>{it.name}</button>
                ))}
            </div>
            <svg viewBox="0 0 200 150" width="100%" style={{ maxWidth: 240, height: 'auto' }}>
                {item.svg}
            </svg>
            <div style={{
                padding: '6px 16px', borderRadius: 8, fontWeight: 700, fontSize: 13,
                background: item.hasSym ? '#dcfce7' : '#fee2e2', color: item.hasSym ? '#10b981' : '#ef4444',
                border: `1px solid ${item.hasSym ? '#10b981' : '#ef4444'}30`
            }}>
                {item.hasSym ? `✅ Symmetrical — ${item.type}` : '❌ Asymmetrical — no symmetry'}
            </div>
        </div>
    );
}
