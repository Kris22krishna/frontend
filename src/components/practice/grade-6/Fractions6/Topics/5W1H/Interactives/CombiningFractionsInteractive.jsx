import React, { useState, useEffect } from 'react';

export default function CombiningFractionsInteractive() {
    const [step, setStep] = useState(0); // 0: separate, 1: combined

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 2);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    const den = 4;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 100, position: 'relative' }}>
                
                {/* Visualizer Container */}
                <div style={{ position: 'relative', width: 280, height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    
                    {/* First Fraction: 1/4 */}
                    <div style={{ 
                        position: 'absolute', display: 'flex', gap: 4,
                        transform: step === 0 ? 'translateX(-80px)' : 'translateX(-38px)',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>
                        <div style={{ width: 40, height: 60, background: '#ef4444', borderRadius: 8, boxShadow: '0 4px 10px rgba(239,68,68,0.3)' }} />
                    </div>

                    {/* Plus Sign */}
                    <div style={{ 
                        position: 'absolute', fontSize: 24, fontWeight: 900, color: '#f87171',
                        opacity: step === 0 ? 1 : 0, transform: step === 0 ? 'scale(1)' : 'scale(0.5)',
                        transition: 'all 0.4s'
                    }}>+</div>

                    {/* Second Fraction: 2/4 */}
                    <div style={{ 
                        position: 'absolute', display: 'flex', gap: 4,
                        transform: step === 0 ? 'translateX(80px)' : 'translateX(34px)',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>
                        <div style={{ width: 40, height: 60, background: '#f87171', borderRadius: 8, boxShadow: '0 4px 10px rgba(248,113,113,0.3)' }} />
                        <div style={{ width: 40, height: 60, background: '#f87171', borderRadius: 8, boxShadow: '0 4px 10px rgba(248,113,113,0.3)' }} />
                    </div>

                    {/* Ghost Outline of 4/4 container */}
                    <div style={{ 
                        position: 'absolute', display: 'flex', gap: 4, opacity: 0.3, zIndex: -1
                    }}>
                        <div style={{ width: 40, height: 60, border: '2px dashed #fca5a5', borderRadius: 8 }} />
                        <div style={{ width: 40, height: 60, border: '2px dashed #fca5a5', borderRadius: 8 }} />
                        <div style={{ width: 40, height: 60, border: '2px dashed #fca5a5', borderRadius: 8 }} />
                        <div style={{ width: 40, height: 60, border: '2px dashed #fca5a5', borderRadius: 8 }} />
                    </div>
                </div>

            </div>

            {/* Equation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 24px', borderRadius: 20, boxShadow: '0 4px 12px rgba(239,68,68,0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 20, fontWeight: 900, color: '#ef4444' }}>
                    <span>1</span>
                    <div style={{ height: 3, width: 20, background: '#ef4444', borderRadius: 2 }} />
                    <span>4</span>
                </div>
                <span style={{ fontSize: 24, fontWeight: 900, color: '#fca5a5' }}>+</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 20, fontWeight: 900, color: '#f87171' }}>
                    <span>2</span>
                    <div style={{ height: 3, width: 20, background: '#f87171', borderRadius: 2 }} />
                    <span>4</span>
                </div>
                <span style={{ fontSize: 24, fontWeight: 900, color: '#fca5a5' }}>=</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 24, fontWeight: 900, color: '#dc2626' }}>
                    <span>{step === 0 ? '?' : '3'}</span>
                    <div style={{ height: 3, width: 24, background: '#dc2626', borderRadius: 2 }} />
                    <span>4</span>
                </div>
            </div>
            
            <button 
                onClick={() => setStep(s => (s + 1) % 2)}
                style={{ padding: '8px 24px', borderRadius: 100, border: 'none', background: '#fef2f2', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}
            >
                {step === 0 ? 'Combine them!' : 'Separate them'}
            </button>
        </div>
    );
}
