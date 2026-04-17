import React, { useState } from 'react';

/**
 * Interactive paper punch simulator: punch holes on a folded sheet, see the unfolded result.
 */
export default function PaperPunchInteractive() {
    const [holes, setHoles] = useState([]);
    const [foldType, setFoldType] = useState('vertical'); // vertical | horizontal | both
    const [folded, setFolded] = useState(true);

    const handlePunch = (e) => {
        if (!folded) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX || e.touches?.[0]?.clientX) - rect.left) / rect.width * 200;
        const y = ((e.clientY || e.touches?.[0]?.clientY) - rect.top) / rect.height * 200;
        // Only allow punching on the visible quadrant
        if (foldType === 'vertical' && x > 100) return;
        if (foldType === 'horizontal' && y > 100) return;
        if (foldType === 'both' && (x > 100 || y > 100)) return;
        setHoles(prev => [...prev, { x, y }]);
    };

    const getMirroredHoles = () => {
        const all = [];
        holes.forEach(h => {
            all.push(h);
            if (foldType === 'vertical' || foldType === 'both') {
                all.push({ x: 200 - h.x, y: h.y });
            }
            if (foldType === 'horizontal' || foldType === 'both') {
                all.push({ x: h.x, y: 200 - h.y });
            }
            if (foldType === 'both') {
                all.push({ x: 200 - h.x, y: 200 - h.y });
            }
        });
        return all;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            {/* Fold type selector */}
            <div style={{ display: 'flex', gap: 6 }}>
                {[
                    { id: 'vertical', label: '↕ Vertical' },
                    { id: 'horizontal', label: '↔ Horizontal' },
                    { id: 'both', label: '✛ Both' },
                ].map(f => (
                    <button key={f.id} onClick={() => { setFoldType(f.id); setHoles([]); setFolded(true); }} style={{
                        padding: '5px 12px', borderRadius: 8, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                        background: f.id === foldType ? '#6366f1' : '#f1f5f9', color: f.id === foldType ? '#fff' : '#475569'
                    }}>{f.label}</button>
                ))}
            </div>

            <svg viewBox="0 0 200 200" width="100%" style={{ maxWidth: 240, height: 'auto', borderRadius: 8, cursor: folded ? 'crosshair' : 'default' }}
                onPointerDown={handlePunch}>
                {/* Paper background */}
                <rect x="0" y="0" width="200" height="200" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" rx="4" />

                {folded ? (
                    <>
                        {/* Shaded folded-away region */}
                        {(foldType === 'vertical' || foldType === 'both') &&
                            <rect x="100" y="0" width="100" height="200" fill="#fef3c7" opacity="0.6" />}
                        {(foldType === 'horizontal' || foldType === 'both') &&
                            <rect x="0" y="100" width="200" height="100" fill="#fef3c7" opacity="0.6" />}
                        {/* Fold lines */}
                        {(foldType === 'vertical' || foldType === 'both') &&
                            <line x1="100" y1="0" x2="100" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" />}
                        {(foldType === 'horizontal' || foldType === 'both') &&
                            <line x1="0" y1="100" x2="200" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4" />}
                        {/* Punched holes */}
                        {holes.map((h, i) => (
                            <circle key={i} cx={h.x} cy={h.y} r="8" fill="#1e293b" opacity="0.8" />
                        ))}
                    </>
                ) : (
                    <>
                        {/* Unfolded: show all mirrored holes */}
                        {(foldType === 'vertical' || foldType === 'both') &&
                            <line x1="100" y1="0" x2="100" y2="200" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,3" />}
                        {(foldType === 'horizontal' || foldType === 'both') &&
                            <line x1="0" y1="100" x2="200" y2="100" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,3" />}
                        {getMirroredHoles().map((h, i) => (
                            <circle key={i} cx={h.x} cy={h.y} r="8" fill="#1e293b" opacity="0.8" />
                        ))}
                    </>
                )}
            </svg>

            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setFolded(f => !f)} style={{
                    padding: '6px 16px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                    background: folded ? 'linear-gradient(135deg, #10b981, #34d399)' : 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                    color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>{folded ? '📂 Unfold Paper' : '📋 Fold Again'}</button>
                <button onClick={() => { setHoles([]); setFolded(true); }} style={{
                    padding: '6px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                    background: '#fff', color: '#64748b'
                }}>Reset</button>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                {folded ? 'Tap to punch holes, then unfold to see the symmetric pattern!' : '✨ Notice the symmetric pattern along the fold lines!'}
            </div>
        </div>
    );
}
