import React, { useState } from 'react';

/**
 * Interactive ink blot: draw on one side, see it mirror in real-time.
 */
export default function InkBlotMirrorInteractive() {
    const [dots, setDots] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const addDot = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) / rect.width * 300;
        const y = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) / rect.height * 200;
        if (x < 150) {
            setDots(prev => [...prev, { x, y, r: 4 + Math.random() * 6 }]);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg
                viewBox="0 0 300 200" width="100%" style={{ maxWidth: 340, height: 'auto', borderRadius: 12, background: '#fefce8', cursor: 'crosshair', touchAction: 'none' }}
                onPointerDown={(e) => { setIsDrawing(true); addDot(e); }}
                onPointerMove={(e) => { if (isDrawing) addDot(e); }}
                onPointerUp={() => setIsDrawing(false)}
                onPointerLeave={() => setIsDrawing(false)}
            >
                {/* Mirror axis */}
                <line x1="150" y1="0" x2="150" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" />
                <text x="150" y="195" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="700">fold line</text>

                {/* Left side dots */}
                {dots.map((d, i) => (
                    <circle key={`l${i}`} cx={d.x} cy={d.y} r={d.r} fill="#8b5cf6" opacity="0.7" />
                ))}
                {/* Mirrored dots */}
                {dots.map((d, i) => (
                    <circle key={`r${i}`} cx={300 - d.x} cy={d.y} r={d.r} fill="#8b5cf6" opacity="0.7" />
                ))}
            </svg>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>Draw on the left half — watch the mirror!</span>
                <button onClick={() => setDots([])} style={{ padding: '4px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', color: '#64748b' }}>Clear</button>
            </div>
        </div>
    );
}
