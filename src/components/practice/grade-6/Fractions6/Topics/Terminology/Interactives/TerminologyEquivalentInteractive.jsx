import React, { useState } from 'react';

export default function TerminologyEquivalentInteractive() {
    const [hover, setHover] = useState(false);

    return (
        <div 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 24, cursor: 'pointer' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, border: '3px solid #8b5cf6', background: '#ede9fe', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: '#8b5cf6' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold', fontSize: 20, color: '#8b5cf6', marginTop: 8 }}>
                    <span>1</span>
                    <div style={{ height: 3, width: 20, background: '#8b5cf6', borderRadius: 2 }} />
                    <span>2</span>
                </div>
            </div>

            <div style={{ fontSize: 24, fontWeight: 'bold', color: hover ? '#8b5cf6' : '#cbd5e1', transition: 'color 0.3s' }}>=</div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, border: '3px solid #8b5cf6', background: '#ede9fe', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: '#8b5cf6' }} />
                    {/* The middle slice line to turn 1/2 into 2/4 */}
                    <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 2, background: '#fff', transform: hover ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold', fontSize: 20, color: '#8b5cf6', marginTop: 8 }}>
                    <span>{hover ? 2 : 1}</span>
                    <div style={{ height: 3, width: 20, background: '#8b5cf6', borderRadius: 2 }} />
                    <span>{hover ? 4 : 2}</span>
                </div>
            </div>

            {hover && <div style={{ fontSize: 13, color: '#8b5cf6', fontWeight: 600, animation: 'fadeIn 0.3s' }}>Cut the pieces in half!<br/>(Amount stays the same)</div>}
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
