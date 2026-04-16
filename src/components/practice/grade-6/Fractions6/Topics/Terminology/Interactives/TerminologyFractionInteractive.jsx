import React, { useState, useEffect } from 'react';

export default function TerminologyFractionInteractive() {
    const [sweep, setSweep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSweep(s => (s >= 360 ? 0 : s + 2));
        }, 20);
        return () => clearInterval(timer);
    }, []);

    const fractionValue = Math.min(100, Math.round((sweep / 360) * 100));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
                <svg viewBox="0 0 100 100" width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="40" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                    
                    {/* Animated Pizza Slice */}
                    <path 
                        d={`M50 50 L50 10 A40 40 0 ${sweep > 180 ? 1 : 0} 1 ${50 + 40 * Math.cos((sweep - 90) * Math.PI / 180)} ${50 + 40 * Math.sin((sweep - 90) * Math.PI / 180)} Z`} 
                        fill="#f59e0b" 
                        opacity="0.9"
                    />
                </svg>
            </div>
            <div style={{ background: '#fef3c7', color: '#d97706', padding: '6px 16px', borderRadius: 100, fontWeight: 800 }}>
                Fraction = {fractionValue}% of the whole
            </div>
        </div>
    );
}
