import React, { useState } from 'react';

/**
 * Interactive butterfly that splits along its vertical axis.
 * Dragging the slider "folds" the right wing onto the left, demonstrating reflection symmetry.
 */
export default function ButterflyReflectionInteractive() {
    const [fold, setFold] = useState(0); // 0 = open, 100 = fully folded

    const rightScale = 1 - fold / 100;
    const rightOpacity = 0.3 + 0.7 * rightScale;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg viewBox="0 0 300 220" width="100%" style={{ maxWidth: 320, height: 'auto' }}>
                {/* Dashed axis of symmetry */}
                <line x1="150" y1="10" x2="150" y2="210" stroke="#6366f1" strokeWidth="2" strokeDasharray="6,4" />
                <text x="150" y="8" textAnchor="middle" fontSize="11" fill="#6366f1" fontWeight="700">Axis of Symmetry</text>

                {/* LEFT WING (stays fixed) */}
                <g>
                    <path d="M 150,60 C 120,20 40,30 30,80 C 20,130 80,170 150,170"
                          fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5" fillOpacity="0.6" />
                    {/* Decorations */}
                    <circle cx="90" cy="80" r="18" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx="90" cy="80" r="8" fill="#3b82f6" fillOpacity="0.5" />
                    <circle cx="75" cy="130" r="12" fill="#6366f1" fillOpacity="0.3" stroke="#6366f1" strokeWidth="1.5" />
                    <circle cx="110" cy="110" r="6" fill="#8b5cf6" fillOpacity="0.4" />
                </g>

                {/* RIGHT WING (folds via scaleX) */}
                <g transform={`translate(150, 0) scale(${rightScale}, 1) translate(-150, 0)`} opacity={rightOpacity}>
                    <path d="M 150,60 C 180,20 260,30 270,80 C 280,130 220,170 150,170"
                          fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5" fillOpacity="0.6" />
                    <circle cx="210" cy="80" r="18" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx="210" cy="80" r="8" fill="#3b82f6" fillOpacity="0.5" />
                    <circle cx="225" cy="130" r="12" fill="#6366f1" fillOpacity="0.3" stroke="#6366f1" strokeWidth="1.5" />
                    <circle cx="190" cy="110" r="6" fill="#8b5cf6" fillOpacity="0.4" />
                </g>

                {/* Body */}
                <ellipse cx="150" cy="115" rx="6" ry="55" fill="#1e3a8a" />
                <circle cx="150" cy="55" r="8" fill="#1e3a8a" />
                {/* Antennae */}
                <line x1="150" y1="48" x2="135" y2="25" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                <line x1="150" y1="48" x2="165" y2="25" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
                <circle cx="135" cy="25" r="3" fill="#6366f1" />
                <circle cx="165" cy="25" r="3" fill="#6366f1" />
            </svg>

            {/* Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '80%', maxWidth: 280 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#3b82f6', whiteSpace: 'nowrap' }}>Open</span>
                <input
                    type="range" min="0" max="100" value={fold}
                    onChange={e => setFold(Number(e.target.value))}
                    style={{ flex: 1, accentColor: '#6366f1' }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#6366f1', whiteSpace: 'nowrap' }}>Fold</span>
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>
                {fold > 80 ? '✨ The wings overlap perfectly!' : 'Drag the slider to fold the butterfly along its axis!'}
            </div>
        </div>
    );
}
