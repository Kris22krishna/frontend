import React, { useState } from 'react';

export default function EquivalentFractionsSlider() {
    const [multiplier, setMultiplier] = useState(1);
    
    const baseNum = 1;
    const baseDen = 2;
    
    const currentNum = baseNum * multiplier;
    const currentDen = baseDen * multiplier;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '10px 0' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {/* SVG Visualizer */}
                <div style={{ position: 'relative', width: 120, height: 120 }}>
                    <svg viewBox="0 0 100 100" width="120" height="120" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                        {/* Whole Circle Base */}
                        <circle cx="50" cy="50" r="45" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
                        
                        {/* Shaded Area (Always exactly 50% for 1/2 equivalents) */}
                        <circle cx="50" cy="50" r="22.5" fill="transparent" stroke="#10b981" strokeWidth="45" strokeDasharray="141.35 282.7" strokeDashoffset="0" />
                        
                        {/* Slice Lines */}
                        {Array.from({ length: currentDen }).map((_, i) => {
                            const angle = (i * 360) / currentDen;
                            const rad = (angle * Math.PI) / 180;
                            const x = 50 + 45 * Math.cos(rad);
                            const y = 50 + 45 * Math.sin(rad);
                            return <line key={`line-${i}`} x1="50" y1="50" x2={x} y2={y} stroke="#fff" strokeWidth="2" style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />;
                        })}
                    </svg>
                </div>
                
                {/* Fraction Display */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 24, fontWeight: 800, color: '#94a3b8' }}>
                        <span>1</span>
                        <div style={{ height: 3, width: 24, background: '#cbd5e1', borderRadius: 2 }} />
                        <span>2</span>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#10b981' }}>=</div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 32, fontWeight: 900, color: '#10b981' }}>
                        <span style={{ transition: 'all 0.3s' }}>{currentNum}</span>
                        <div style={{ height: 4, width: 32, background: '#10b981', borderRadius: 2 }} />
                        <span style={{ transition: 'all 0.3s' }}>{currentDen}</span>
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div style={{ width: '80%', maxWidth: 300, background: '#fff', padding: '16px 24px', borderRadius: 20, boxShadow: '0 4px 16px rgba(16,185,129,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13, fontWeight: 700, color: '#64748b' }}>
                    <span>Multiply portions</span>
                    <span style={{ color: '#10b981' }}>x{multiplier}</span>
                </div>
                <input 
                    type="range" 
                    min="1" max="4" step="1" 
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                />
            </div>
            
        </div>
    );
}
