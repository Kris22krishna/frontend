import React, { useState } from 'react';

export default function MixedFractionStacker() {
    const [pieces, setPieces] = useState(3);
    const denominator = 4;
    
    const wholeCount = Math.floor(pieces / denominator);
    const remainder = pieces % denominator;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* Visualizer */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', minHeight: 80 }}>
                {Array.from({ length: Math.max(2, wholeCount + 1) }).map((_, boxIdx) => {
                    return (
                        <div key={boxIdx} style={{ 
                            width: 80, height: 80, borderRadius: 16, border: '4px solid #fce7f3', 
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 4, padding: 4,
                            background: '#fff', boxShadow: '0 4px 12px rgba(236,72,153,0.1)',
                            opacity: boxIdx > wholeCount ? 0.3 : 1, transition: 'all 0.3s'
                        }}>
                            {Array.from({ length: 4 }).map((_, pieceIdx) => {
                                const globalPieceIdx = boxIdx * 4 + pieceIdx;
                                const isFilled = globalPieceIdx < pieces;
                                return (
                                    <div key={pieceIdx} style={{
                                        background: isFilled ? '#ec4899' : '#fce7f3',
                                        borderRadius: 6, transition: 'background 0.3s'
                                    }}/>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Display Equation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#fff', padding: '12px 24px', borderRadius: 100, border: '1px solid #fbcfe8' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 24, fontWeight: 900, color: '#ec4899' }}>
                    <span>{pieces}</span>
                    <div style={{ height: 3, width: 24, background: '#ec4899', borderRadius: 2 }} />
                    <span>{denominator}</span>
                </div>
                
                {pieces >= denominator && (
                    <>
                        <div style={{ fontSize: 24, fontWeight: 900, color: '#f472b6' }}>=</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ec4899' }}>
                            <span style={{ fontSize: 36, fontWeight: 900 }}>{wholeCount}</span>
                            {remainder > 0 && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 20, fontWeight: 900 }}>
                                    <span>{remainder}</span>
                                    <div style={{ height: 2, width: 20, background: '#ec4899', borderRadius: 2 }} />
                                    <span>{denominator}</span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 12 }}>
                <button 
                    onClick={() => setPieces(p => Math.max(1, p - 1))}
                    style={{ width: 44, height: 44, borderRadius: '50%', background: '#fdf2f8', color: '#db2777', border: 'none', fontSize: 24, cursor: 'pointer', fontWeight: 'bold' }}
                >-</button>
                <button 
                    onClick={() => setPieces(p => p + 1)}
                    style={{ width: 44, height: 44, borderRadius: '50%', background: '#db2777', color: '#fff', border: 'none', fontSize: 24, cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(219,39,119,0.3)' }}
                >+</button>
            </div>
            
            <div style={{ fontSize: 13, color: '#db2777', fontWeight: 600 }}>
                {pieces < denominator ? 'Proper Fraction' : pieces === denominator ? 'One Whole' : 'Improper Fraction → Mixed Fraction'}
            </div>
        </div>
    );
}
