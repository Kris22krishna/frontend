import React, { useState } from 'react';

/**
 * Interactive: user drags a line over a figure to test if it's a line of symmetry.
 * Shows the Taj Mahal silhouette.
 */
export default function TajMahalSymmetryInteractive() {
    const [lineX, setLineX] = useState(150);
    const correctX = 150;
    const isCorrect = Math.abs(lineX - correctX) < 8;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 340, height: 'auto', background: '#fdf4ff', borderRadius: 12 }}>
                {/* Simplified Taj Mahal silhouette */}
                {/* Base platform */}
                <rect x="40" y="165" width="220" height="20" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1.5" rx="3" />
                {/* Main body */}
                <rect x="80" y="100" width="140" height="65" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" rx="2" />
                {/* Dome */}
                <path d="M 110,100 Q 150,30 190,100" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
                {/* Pinnacle */}
                <line x1="150" y1="38" x2="150" y2="25" stroke="#a855f7" strokeWidth="2" />
                <circle cx="150" cy="23" r="3" fill="#a855f7" />
                {/* Side minarets */}
                <rect x="50" y="95" width="16" height="70" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" rx="2" />
                <circle cx="58" cy="92" r="8" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" />
                <rect x="234" y="95" width="16" height="70" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" rx="2" />
                <circle cx="242" cy="92" r="8" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" />
                {/* Door */}
                <path d="M 140,165 L 140,130 Q 150,120 160,130 L 160,165" fill="#c084fc" stroke="#a855f7" strokeWidth="1.5" />
                {/* Windows */}
                <circle cx="120" cy="130" r="8" fill="none" stroke="#a855f7" strokeWidth="1.5" />
                <circle cx="180" cy="130" r="8" fill="none" stroke="#a855f7" strokeWidth="1.5" />

                {/* Draggable symmetry line */}
                <line x1={lineX} y1="10" x2={lineX} y2="190"
                    stroke={isCorrect ? '#10b981' : '#ef4444'}
                    strokeWidth="3" strokeDasharray="8,4" />
                <circle cx={lineX} cy="15" r="8" fill={isCorrect ? '#10b981' : '#ef4444'} opacity="0.8" cursor="ew-resize" />
                <text x={lineX} y="19" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="800">↔</text>
            </svg>

            {/* Slider control */}
            <div style={{ width: '80%', maxWidth: 280 }}>
                <input type="range" min="40" max="260" value={lineX}
                    onChange={e => setLineX(Number(e.target.value))}
                    style={{ width: '100%', accentColor: isCorrect ? '#10b981' : '#ef4444' }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: isCorrect ? '#10b981' : '#94a3b8' }}>
                {isCorrect ? '✅ Perfect! The vertical centre line is the axis of symmetry!' : 'Drag the line to find the Taj Mahal\'s axis of symmetry'}
            </div>
        </div>
    );
}
