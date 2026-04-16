import React, { useState } from 'react';

export default function EverydayFractionsAnimated() {
    const [shares, setShares] = useState(2);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* The Roti / Chikki */}
            <div style={{ position: 'relative', width: 140, height: 140 }}>
                {Array.from({ length: shares }).map((_, i) => {
                    const angle = 360 / shares;
                    const rotate = i * angle;
                    
                    return (
                        <div key={i} style={{ 
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            clipPath: shares === 2 ? (i === 0 ? 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' : 'polygon(0 0, 50% 0, 50% 100%, 0 100%)') :
                                    shares === 3 ? (i === 0 ? 'polygon(50% 50%, 100% 0, 100% 100%)' : i===1 ? 'polygon(50% 50%, 0 100%, 0 0)' : 'polygon(50% 50%, 0 0, 100% 0)') :
                                    shares === 4 ? `polygon(50% 50%, 100% 50%, 50% 0)` : 'none', /* Custom simple clip rects are tricky without raw SVG. Let's use SVG. */
                        }} />
                    );
                })}
            </div>
            
            {/* Proper SVG for pie chart sharing */}
            <svg viewBox="0 0 100 100" width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="45" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                
                {Array.from({ length: shares }).map((_, i) => {
                    const percent = 1 / shares;
                    const dashArray = percent * 283; // 2 * PI * R (R=45 => 282.7)
                    
                    return (
                        <circle
                            key={i} cx="50" cy="50" r="22.5" fill="transparent"
                            stroke="#fbbf24" strokeWidth="45"
                            strokeDasharray={`${dashArray} 283`}
                            strokeDashoffset={-dashArray * i}
                            style={{ transition: 'stroke-dasharray 0.5s, stroke-dashoffset 0.5s' }}
                        />
                    );
                })}
                {/* SVG Lines for cuts */}
                {Array.from({ length: shares }).map((_, i) => {
                    const angle = (i * 360) / shares;
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + 45 * Math.cos(rad);
                    const y = 50 + 45 * Math.sin(rad);
                    return <line key={`l-${i}`} x1="50" y1="50" x2={x} y2={y} stroke="#fff" strokeWidth="3" style={{ transition: 'all 0.5s' }}/>;
                })}
            </svg>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>Share among:</span>
                {[2, 3, 4, 6].map(num => (
                    <button
                        key={num}
                        onClick={() => setShares(num)}
                        style={{
                            width: 40, height: 40, borderRadius: '50%',
                            background: shares === num ? '#f59e0b' : '#fff',
                            color: shares === num ? '#fff' : '#64748b',
                            border: `2px solid ${shares === num ? '#f59e0b' : '#e2e8f0'}`,
                            fontSize: 16, fontWeight: 'bold', cursor: 'pointer',
                            transition: 'all 0.2s', boxShadow: shares === num ? '0 4px 12px rgba(245,158,11,0.3)' : 'none'
                        }}
                    >
                        {num}
                    </button>
                ))}
                <span style={{ fontSize: 24 }}>👨‍👩‍👧‍👦</span>
            </div>
            
            <div style={{ background: 'rgba(245,158,11,0.1)', padding: '6px 16px', borderRadius: 100, color: '#d97706', fontWeight: 700 }}>
                Each person gets 1/{shares} of the roti
            </div>
        </div>
    );
}
