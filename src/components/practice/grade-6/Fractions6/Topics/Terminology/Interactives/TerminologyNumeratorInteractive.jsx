import React, { useState } from 'react';

export default function TerminologyNumeratorInteractive() {
    const [hover, setHover] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                        key={i}
                        style={{ 
                            width: 20, height: 40, borderRadius: 6,
                            background: i < 5 ? '#10b981' : '#f1f5f9',
                            transform: hover && i < 5 ? 'translateY(-10px)' : 'translateY(0)',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    />
                ))}
            </div>
            
            <div 
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ 
                    cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    background: hover ? 'rgba(16,185,129,0.1)' : 'transparent',
                    padding: '8px 24px', borderRadius: 16, transition: 'all 0.3s'
                }}
            >
                <span style={{ fontSize: 40, fontWeight: 900, color: '#10b981', transform: hover ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s' }}>5</span>
                <div style={{ width: 40, height: 4, background: '#cbd5e1', margin: '4px 0', borderRadius: 2 }} />
                <span style={{ fontSize: 32, fontWeight: 800, color: '#94a3b8' }}>8</span>
            </div>
            
            <div style={{ fontSize: 13, color: '#10b981', opacity: hover ? 1 : 0, transition: 'opacity 0.3s', fontWeight: 'bold' }}>
                Numerator tells us we have 5 out of the 8 parts
            </div>
        </div>
    );
}
