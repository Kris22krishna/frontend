import React, { useState } from 'react';

export default function ComponentsInteractive() {
    const [hover, setHover] = useState(null); // 'num', 'den', or null

    return (
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: '#fff', padding: '24px', borderRadius: 20, boxShadow: '0 8px 24px rgba(168,85,247,0.1)'
            }}>
                <div 
                    onMouseEnter={() => setHover('num')}
                    onMouseLeave={() => setHover(null)}
                    style={{
                        padding: '8px 24px', borderRadius: 12, cursor: 'pointer',
                        background: hover === 'num' ? '#f3e8ff' : 'transparent',
                        color: hover === 'num' ? '#a855f7' : '#1e293b',
                        fontSize: 48, fontWeight: 900, transition: 'all 0.2s',
                        transform: hover === 'num' ? 'scale(1.1)' : 'scale(1)'
                    }}
                >
                    3
                </div>
                <div style={{ width: 80, height: 6, background: '#cbd5e1', margin: '4px 0', borderRadius: 3 }} />
                <div 
                    onMouseEnter={() => setHover('den')}
                    onMouseLeave={() => setHover(null)}
                    style={{
                        padding: '8px 24px', borderRadius: 12, cursor: 'pointer',
                        background: hover === 'den' ? '#f3e8ff' : 'transparent',
                        color: hover === 'den' ? '#a855f7' : '#1e293b',
                        fontSize: 48, fontWeight: 900, transition: 'all 0.2s',
                        transform: hover === 'den' ? 'scale(1.1)' : 'scale(1)'
                    }}
                >
                    4
                </div>
            </div>

            <div style={{ width: 240, textAlign: 'left', minHeight: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {hover === 'num' ? (
                    <div style={{ animation: 'fadeIn 0.3s' }}>
                        <div style={{ fontWeight: 800, fontSize: 20, color: '#a855f7', marginBottom: 8 }}>Numerator (Top)</div>
                        <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>
                            Indicates how many parts we are considering. Here, we have <strong>3</strong> pieces.
                        </div>
                    </div>
                ) : hover === 'den' ? (
                    <div style={{ animation: 'fadeIn 0.3s' }}>
                        <div style={{ fontWeight: 800, fontSize: 20, color: '#a855f7', marginBottom: 8 }}>Denominator (Bottom)</div>
                        <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>
                            Indicates the total number of equal parts the whole is divided into. A whole is cut into <strong>4</strong> parts.
                        </div>
                    </div>
                ) : (
                    <div style={{ color: '#94a3b8', fontSize: 15, fontStyle: 'italic', textAlign: 'center' }}>
                        Hover or tap the numbers to explore their roles.
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
