import React, { useState } from 'react';

/** Interactive: drag a line across a shape to see if halves match */
export default function TermLineOfSymmetryInteractive() {
    const [lineAngle, setLineAngle] = useState(0);
    const symmetryAngles = [0, 90]; // vertical and horizontal for rectangle
    const isSymmetry = symmetryAngles.some(a => Math.abs(lineAngle - a) < 8 || Math.abs(lineAngle - (a + 180)) < 8);

    const cx = 120, cy = 80;
    const len = 100;
    const rad = lineAngle * Math.PI / 180;
    const x1 = cx + len * Math.cos(rad);
    const y1 = cy + len * Math.sin(rad);
    const x2 = cx - len * Math.cos(rad);
    const y2 = cy - len * Math.sin(rad);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg viewBox="0 0 240 160" width="100%" style={{ maxWidth: 280, height: 'auto' }}>
                <rect x="50" y="30" width="140" height="100" fill={isSymmetry ? '#dcfce7' : '#fee2e2'} stroke={isSymmetry ? '#10b981' : '#ef4444'} strokeWidth="2.5" rx="3" />
                <line x1={x2} y1={y2} x2={x1} y2={y1} stroke={isSymmetry ? '#10b981' : '#ef4444'} strokeWidth="2.5" strokeDasharray="6,4" />
                <text x="120" y="85" textAnchor="middle" fontSize="12" fill="#475569" fontWeight="700">Rectangle</text>
            </svg>
            <input type="range" min="0" max="180" value={lineAngle} onChange={e => setLineAngle(Number(e.target.value))}
                style={{ width: '70%', maxWidth: 220, accentColor: isSymmetry ? '#10b981' : '#ef4444' }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: isSymmetry ? '#10b981' : '#ef4444' }}>
                {isSymmetry ? '✅ This is a line of symmetry!' : '❌ Not a line of symmetry — halves don\'t match'}
            </div>
        </div>
    );
}
