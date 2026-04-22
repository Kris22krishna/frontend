import React, { useState } from 'react';

export default function TerminologySimplestFormInteractive() {
    const [step, setStep] = useState(0);

    const states = [
        { num: 4, den: 8 },
        { num: 2, den: 4, divideBy: 2 },
        { num: 1, den: 2, divideBy: 2 }
    ];

    const current = states[step];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                
                {/* Visualizer showing the cuts getting removed */}
                <div style={{ position: 'relative', width: 60, height: 60, background: '#ede9fe', borderRadius: 8, border: '3px solid #ec4899', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: '#ec4899' }} />
                    
                    {/* Horizontal Cut (Disappears at step 1) */}
                    <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 2, background: '#fff', transform: step >= 1 ? 'scaleX(0)' : 'scaleX(1)', transition: 'transform 0.4s' }} />
                    
                    {/* Vertical Quarter Cuts (Disappears at step 2) */}
                    <div style={{ position: 'absolute', top: 0, left: '25%', width: 2, height: '100%', background: '#fff', transform: step >= 2 ? 'scaleY(0)' : 'scaleY(1)', transition: 'transform 0.4s' }} />
                    <div style={{ position: 'absolute', top: 0, left: '75%', width: 2, height: '100%', background: '#fff', transform: step >= 2 ? 'scaleY(0)' : 'scaleY(1)', transition: 'transform 0.4s' }} />
                </div>

                {/* Arrow */}
                <div style={{ fontSize: 24, fontWeight: 'bold', color: '#fbcfe8' }}>→</div>

                {/* Number */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 32, fontWeight: 900, color: '#ec4899' }}>
                    <span style={{ transition: 'all 0.3s' }}>{current.num}</span>
                    <div style={{ height: 4, width: 32, background: '#ec4899', borderRadius: 2 }} />
                    <span style={{ transition: 'all 0.3s' }}>{current.den}</span>
                    
                    {/* Division animation hint */}
                    {current.divideBy && (
                        <div style={{ position: 'absolute', right: -30, fontSize: 13, color: '#f472b6', fontWeight: 'bold', animation: 'fadeIn 0.3s ease-out forwards' }}>
                            <div style={{ transform: 'translateY(-15px)' }}>÷{current.divideBy}</div>
                            <div style={{ transform: 'translateY(15px)' }}>÷{current.divideBy}</div>
                        </div>
                    )}
                </div>
            </div>

            <button 
                onClick={() => setStep(s => (s + 1) % 3)}
                style={{
                    padding: '8px 24px', borderRadius: 100, border: '2px solid #ec4899', 
                    background: step === 2 ? '#fff' : '#ec4899',
                    color: step === 2 ? '#ec4899' : '#fff',
                    fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s'
                }}
            >
                {step === 2 ? 'Reset' : 'Simplify!'}
            </button>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
