import React, { useState, useRef, useEffect } from 'react';

// Renders the different SVG question types
export const LAGraphMini = ({ config, onProtractorChange }) => {
    if (!config) return null;

    const { type, data } = config;

    if (type === 'protractor-measure') {
        return <InteractiveProtractor angle={data.angle} onChange={onProtractorChange} />;
    }

    if (type === 'linear-pair') {
        // ... rendering linear pair SVG
        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                {/* Horizontal Line */}
                <line x1="30" y1="150" x2="270" y2="150" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="150" cy="150" r="4" fill="#0f172a" />
                
                {/* Ray leaning left or right based on splitAngle */}
                {(() => {
                    const r = 100;
                    const rad = (data.splitAngle * Math.PI) / 180;
                    const x2 = 150 + r * Math.cos(rad);
                    const y2 = 150 - r * Math.sin(rad);
                    return (
                        <g>
                            <line x1="150" y1="150" x2={x2} y2={y2} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                            {/* Arcs */}
                            <path d={`M 180 150 A 30 30 0 0 0 ${150 + 30 * Math.cos(rad)} ${150 - 30 * Math.sin(rad)}`} stroke="#0284c7" strokeWidth="3" fill="none" />
                            <path d={`M 120 150 A 30 30 0 0 1 ${150 + 30 * Math.cos(rad)} ${150 - 30 * Math.sin(rad)}`} stroke="#e11d48" strokeWidth="3" fill="none" />
                            
                            {/* Labels */}
                            <text x="190" y="130" fontSize="14" fill="#0284c7" fontWeight="bold">{data.a1}</text>
                            <text x="100" y="130" fontSize="14" fill="#e11d48" fontWeight="bold">{data.a2}</text>
                        </g>
                    );
                })()}
            </svg>
        );
    }

    if (type === 'intersecting') {
        const { top, bottom, left, right, angle } = data;
        const rad = (angle * Math.PI) / 180;
        const r = 100;
        // The lines cross at 150, 100
        const dx = r * Math.cos(rad);
        const dy = r * Math.sin(rad);

        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                {/* Horizontal line */}
                <line x1={150 - r} y1="100" x2={150 + r} y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                {/* Angled line */}
                <line x1={150 - r * Math.cos(rad)} y1={100 + r * Math.sin(rad)} x2={150 + r * Math.cos(rad)} y2={100 - r * Math.sin(rad)} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                
                <circle cx="150" cy="100" r="4" fill="#0f172a" />
                
                <text x="150" y={100 - 30} fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">{top}</text>
                <text x="150" y={100 + 40} fontSize="14" fill="#059669" textAnchor="middle" fontWeight="bold">{bottom}</text>
                <text x={150 - 50} y="105" fontSize="14" fill="#d97706" textAnchor="middle" fontWeight="bold">{left}</text>
                <text x={150 + 50} y="105" fontSize="14" fill="#d97706" textAnchor="middle" fontWeight="bold">{right}</text>
            </svg>
        );
    }

    if (type === 'parallel') {
        const { knownLoc, unknownLoc, knownVal, tilt } = data;
        // Two parallel lines Cut by transversal
        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                <line x1="50" y1="70" x2="250" y2="70" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="130" x2="250" y2="130" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                
                <line x1="120" y1="30" x2="180" y2="170" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                {/* Example simplified label logic */}
                <text x="175" y="60" fontSize="14" fill="#7c3aed" fontWeight="bold">{knownLoc === 'top-right' ? `${knownVal}°` : ''}</text>
                <text x="125" y="60" fontSize="14" fill="#7c3aed" fontWeight="bold">{knownLoc === 'top-left' ? `${knownVal}°` : ''}</text>
                <text x="135" y="125" fontSize="14" fill="#e11d48" fontWeight="bold">{unknownLoc === 'bottom-left' ? 'x' : ''}</text>
                <text x="175" y="150" fontSize="14" fill="#e11d48" fontWeight="bold">{unknownLoc === 'bottom-right' ? 'x' : ''}</text>
                <text x="125" y="150" fontSize="14" fill="#e11d48" fontWeight="bold">{unknownLoc === 'bottom-left-out' ? 'x' : ''}</text>
            </svg>
        );
    }

    if (type === 'angles-around-point') {
        const [a1, a2, a3, ax] = data.angles;
        return (
            <svg viewBox="0 0 300 200" width="100%" style={{ maxWidth: 280, maxHeight: 180, background: '#f8fafc', borderRadius: 12 }}>
                <circle cx="150" cy="100" r="4" fill="#0f172a" />
                
                {/* 4 rays splitting a circle */}
                <line x1="150" y1="100" x2="230" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="150" y1="100" x2="150" y2="20" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="150" y1="100" x2="70" y2="100" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <line x1="150" y1="100" x2="150" y2="180" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                
                <text x="180" y="80" fontSize="14" fill="#0284c7">{a1}°</text>
                <text x="120" y="80" fontSize="14" fill="#e11d48">{a2}°</text>
                <text x="120" y="130" fontSize="14" fill="#059669">{a3}°</text>
                <text x="180" y="130" fontSize="14" fill="#d97706">{ax}</text>
            </svg>
        );
    }

    return null;
};

// Simple interactive protractor component for drawing/measuring angles
const InteractiveProtractor = ({ angle, onChange }) => {
    const [userAngle, setUserAngle] = useState(0);
    const svgRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerMove = (e) => {
        if (!isDragging || !svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height - 20; // base line y offset
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dx = x - centerX;
        const dy = centerY - y;
        
        let deg = Math.atan2(dy, dx) * (180 / Math.PI);
        if (deg < 0) deg = 0;
        if (deg > 180) deg = 180;
        
        const finalAngle = Math.round(deg);
        setUserAngle(finalAngle);
        if (onChange) onChange(finalAngle);
    };

    return (
        <div style={{ padding: 20, background: '#f8fafc', borderRadius: 12, textAlign: 'center' }}>
            <svg 
                ref={svgRef}
                viewBox="0 0 300 160" 
                style={{ width: '100%', maxWidth: 280, maxHeight: 180, touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
                onPointerDown={(e) => { setIsDragging(true); handlePointerMove(e); e.currentTarget.setPointerCapture(e.pointerId); }}
                onPointerMove={handlePointerMove}
                onPointerUp={(e) => { setIsDragging(false); e.currentTarget.releasePointerCapture(e.pointerId); }}
            >
                {/* Target Graphic (ghosted) */}
                <line x1="150" y1="140" x2="250" y2="140" stroke="#cbd5e1" strokeWidth="4" />
                <line x1="150" y1="140" x2={150 + 100 * Math.cos(angle * Math.PI / 180)} y2={140 - 100 * Math.sin(angle * Math.PI / 180)} stroke="#cbd5e1" strokeWidth="4" />

                {/* User Graphic */}
                <line x1="150" y1="140" x2="250" y2="140" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="150" cy="140" r="6" fill="#0f172a" />
                
                <line x1="150" y1="140" x2={150 + 100 * Math.cos(userAngle * Math.PI / 180)} y2={140 - 100 * Math.sin(userAngle * Math.PI / 180)} stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                <circle cx={150 + 100 * Math.cos(userAngle * Math.PI / 180)} cy={140 - 100 * Math.sin(userAngle * Math.PI / 180)} r="8" fill="#e11d48" />
                
                {/* Arc */}
                {userAngle > 0 && <path d={`M 180 140 A 30 30 0 0 0 ${150 + 30 * Math.cos(userAngle * Math.PI / 180)} ${140 - 30 * Math.sin(userAngle * Math.PI / 180)}`} stroke="#0284c7" strokeWidth="2" fill="none" />}
            </svg>
            <div style={{ marginTop: 12, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                Your Angle: <span style={{ color: '#0284c7' }}>{userAngle}°</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b' }}>Drag the red handle to match the grey angle drawing.</div>
        </div>
    );
};
