import React, { useState } from 'react';

export default function DefiningFractionsInteractive() {
    const [selected, setSelected] = useState([true, false, false, false]);

    const total = 4;
    const selectedCount = selected.filter(Boolean).length;

    const togglePiece = (i) => {
        setSelected(prev => {
            const next = [...prev];
            next[i] = !next[i];
            return next;
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
                {[0, 1, 2, 3].map(i => (
                    <div
                        key={i}
                        onClick={() => togglePiece(i)}
                        style={{
                            width: 60, height: 60, borderRadius: 12,
                            background: selected[i] ? '#0ea5e9' : '#e0f2fe',
                            border: `3px solid ${selected[i] ? '#0284c7' : '#bae6fd'}`,
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: selected[i] ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: selected[i] ? '0 8px 16px rgba(14,165,233,0.3)' : 'none'
                        }}
                    />
                ))}
            </div>
            
            <div style={{
                background: '#fff', padding: '10px 20px', borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'inline-flex', alignItems: 'center', gap: 12
            }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#64748b' }}>Fraction selected:</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold', fontSize: 22, color: '#0ea5e9' }}>
                    <span>{selectedCount}</span>
                    <div style={{ height: 3, width: 24, background: '#0ea5e9', borderRadius: 2 }} />
                    <span>{total}</span>
                </div>
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8' }}>Tap the chocolate blocks to select pieces!</div>
        </div>
    );
}
