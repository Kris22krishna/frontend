import React, { useState } from 'react';

/**
 * Interactive circle symmetry: rotate any diameter and see every angle is an angle of symmetry.
 */
export default function CircleSymmetryInteractive() {
    const [angle, setAngle] = useState(0);
    const cx = 120, cy = 120, r = 90;

    const rad = angle * Math.PI / 180;
    const x1 = cx + r * Math.cos(rad);
    const y1 = cy + r * Math.sin(rad);
    const x2 = cx - r * Math.cos(rad);
    const y2 = cy - r * Math.sin(rad);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 240 240" width="100%" style={{ maxWidth: 220, height: 'auto' }}>
                {/* Circle */}
                <circle cx={cx} cy={cy} r={r} fill="#ede9fe" stroke="#6366f1" strokeWidth="2.5" fillOpacity="0.4" />
                {/* Center dot */}
                <circle cx={cx} cy={cy} r="4" fill="#6366f1" />
                {/* Rotating diameter */}
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx={x1} cy={y1} r="5" fill="#ef4444" />
                <circle cx={x2} cy={y2} r="5" fill="#ef4444" />

                {/* Degree label */}
                <rect x="70" y="215" width="100" height="22" rx="6" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="120" y="231" textAnchor="middle" fontSize="13" fontWeight="800" fill="#6366f1">{angle}° — Line of Symmetry ✓</text>
            </svg>

            <div style={{ width: '80%', maxWidth: 260 }}>
                <input type="range" min="0" max="180" value={angle} onChange={e => setAngle(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#6366f1' }} />
            </div>
            <div style={{ fontSize: 13, color: '#10b981', fontWeight: 700 }}>
                Every diameter is a line of symmetry — circles have ∞ lines!
            </div>
        </div>
    );
}
