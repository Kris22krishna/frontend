import React, { useState, useEffect } from 'react';

// Helpers to calculate necessary row counts dynamically based on actual primes
function getPrimeFactors(n) {
    const factors = [];
    let d = 2;
    while (n > 1) {
        while (n % d === 0) { factors.push(d); n /= d; }
        d++;
    }
    return factors;
}

function getRowsNeeded(a, b, mode) {
    const fA = getPrimeFactors(a);
    const fB = getPrimeFactors(b);

    if (mode === 'hcf') {
        const countA = {};
        const countB = {};
        fA.forEach(p => countA[p] = (countA[p] || 0) + 1);
        fB.forEach(p => countB[p] = (countB[p] || 0) + 1);

        let commonCount = 0;
        for (const p in countA) {
            if (countB[p]) {
                commonCount += Math.min(countA[p], countB[p]);
            }
        }
        return commonCount;
    } else { // lcm
        let curA = a, curB = b;
        let count = 0;
        let safety = 0;
        while ((curA > 1 || curB > 1) && safety < 20) {
            safety++;
            let prime = 2;
            let found = false;
            while (prime <= Math.max(curA, curB)) {
                if (curA % prime === 0 || curB % prime === 0) {
                    count++;
                    curA = curA % prime === 0 ? curA / prime : curA;
                    curB = curB % prime === 0 ? curB / prime : curB;
                    found = true;
                    break;
                }
                prime++;
            }
            if (!found) break;
        }
        return count;
    }
}

export default function InteractiveDivisionBox({ a, b, mode, correctAnswer, answered, onComplete, isCorrect }) {
    const numRows = getRowsNeeded(a, b, mode);
    
    // State for grid inputs
    const [grid, setGrid] = useState(
        Array(numRows).fill(null).map(() => ({ div: '', qA: '', qB: '' }))
    );
    // Final remainders row
    const [remA, setRemA] = useState('');
    const [remB, setRemB] = useState('');
    // Final evaluated answer
    const [finalAns, setFinalAns] = useState('');

    const isFullyFilled = () => {
        if (!finalAns.trim() || !remA.trim() || !remB.trim()) return false;
        for (const row of grid) {
            if (!row.div.trim() || !row.qA.trim() || !row.qB.trim()) return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (!isFullyFilled()) return;
        const correct = finalAns.trim() === correctAnswer.toString();
        onComplete(correct, finalAns.trim());
    };

    const updateGrid = (idx, field, val) => {
        const newGrid = [...grid];
        newGrid[idx][field] = val;
        setGrid(newGrid);
    };

    const themeColor = mode === 'hcf' ? '#7c3aed' : '#0369a1';
    const bgMode = mode === 'hcf' ? 'rgba(124, 58, 237, 0.05)' : 'rgba(3, 105, 161, 0.05)';

    // Build the visual SVG layout logic using purely CSS/HTML
    return (
        <div style={{ maxWidth: 320, margin: '0 auto', fontFamily: '"Inter", sans-serif' }}>
            <div style={{ 
                background: bgMode, 
                border: `1.5px solid ${themeColor}30`, 
                padding: '24px', 
                borderRadius: '16px',
                marginBottom: '16px'
            }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: themeColor, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, textAlign: 'center' }}>
                    Interactive Division Method
                </div>

                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Top Row: Initial Inputs fixed */}
                    <div style={{ display: 'flex', alignItems: 'center', height: '36px' }}>
                        <div style={{ width: 44, display: 'flex', justifyContent: 'center' }}></div>
                        <div style={{ width: 2, background: themeColor, alignSelf: 'stretch', margin: '0 12px' }}></div>
                        <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
                            <div style={{ flex: 1, textAlign: 'center', fontWeight: 800, fontSize: 16, color: '#1e293b' }}>{a}</div>
                            <div style={{ flex: 1, textAlign: 'center', fontWeight: 800, fontSize: 16, color: '#1e293b' }}>{b}</div>
                        </div>
                    </div>

                    {/* Divisor/Quotient Rows */}
                    {grid.map((row, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                            {/* Horizontal dividing line above this quotient row */}
                            <div style={{ 
                                position: 'absolute', top: -4, left: 56, right: 0, 
                                height: 2, background: themeColor, borderRadius: 2 
                            }} />

                            <div style={{ display: 'flex', alignItems: 'center', height: '36px' }}>
                                {/* Divisor input */}
                                <div style={{ width: 44, display: 'flex', justifyContent: 'center' }}>
                                    <input 
                                        type="number" 
                                        value={row.div}
                                        onChange={(e) => updateGrid(idx, 'div', e.target.value)}
                                        disabled={answered}
                                        style={{ 
                                            width: 40, height: 32, textAlign: 'center', 
                                            borderRadius: 8, border: `2px solid ${themeColor}40`, 
                                            fontWeight: 800, fontSize: 15, color: themeColor,
                                            background: answered ? '#f1f5f9' : '#fff'
                                        }} 
                                    />
                                </div>
                                <div style={{ width: 2, background: themeColor, alignSelf: 'stretch', margin: '0 12px' }}></div>
                                {/* Quotients */}
                                <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
                                    <input 
                                        type="number" 
                                        value={row.qA}
                                        onChange={(e) => updateGrid(idx, 'qA', e.target.value)}
                                        disabled={answered}
                                        style={{ 
                                            flex: 1, width: '100%', height: 32, textAlign: 'center', 
                                            borderRadius: 8, border: '1.5px solid #cbd5e1', 
                                            fontWeight: 700, fontSize: 15,
                                            background: answered ? '#f1f5f9' : '#fff'
                                        }} 
                                    />
                                    <input 
                                        type="number" 
                                        value={row.qB}
                                        onChange={(e) => updateGrid(idx, 'qB', e.target.value)}
                                        disabled={answered}
                                        style={{ 
                                            flex: 1, width: '100%', height: 32, textAlign: 'center', 
                                            borderRadius: 8, border: '1.5px solid #cbd5e1', 
                                            fontWeight: 700, fontSize: 15,
                                            background: answered ? '#f1f5f9' : '#fff'
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Final reminder row (Horizontal line + remainders) */}
                    <div style={{ position: 'relative' }}>
                        <div style={{ 
                            position: 'absolute', top: -4, left: 56, right: 0, 
                            height: 2, background: themeColor, borderRadius: 2 
                        }} />
                        <div style={{ display: 'flex', alignItems: 'center', height: '36px' }}>
                            <div style={{ width: 44 }}></div>
                            <div style={{ width: 2, background: themeColor, alignSelf: 'stretch', margin: '0 12px' }}></div>
                            <div style={{ flex: 1, display: 'flex', gap: '12px' }}>
                                <input 
                                    type="number" 
                                    value={remA}
                                    onChange={(e) => setRemA(e.target.value)}
                                    disabled={answered}
                                    style={{ 
                                        flex: 1, width: '100%', height: 32, textAlign: 'center', 
                                        borderRadius: 8, border: '1.5px solid #059669', 
                                        fontWeight: 900, fontSize: 15, color: '#059669',
                                        background: answered ? '#f1f5f9' : '#fff'
                                    }} 
                                />
                                <input 
                                    type="number" 
                                    value={remB}
                                    onChange={(e) => setRemB(e.target.value)}
                                    disabled={answered}
                                    style={{ 
                                        flex: 1, width: '100%', height: 32, textAlign: 'center', 
                                        borderRadius: 8, border: '1.5px solid #059669', 
                                        fontWeight: 900, fontSize: 15, color: '#059669',
                                        background: answered ? '#f1f5f9' : '#fff'
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 6 }}>FINAL ANSWER</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                        <strong style={{ fontSize: 16, color: themeColor }}>{mode.toUpperCase()} = </strong>
                        <input 
                            type="number" 
                            value={finalAns}
                            onChange={(e) => setFinalAns(e.target.value)}
                            disabled={answered}
                            placeholder="?"
                            style={{ 
                                width: 80, height: 40, textAlign: 'center', 
                                borderRadius: 10, border: `2.5px solid ${answered ? (isCorrect ? '#10b981' : '#ef4444') : themeColor}`, 
                                fontWeight: 900, fontSize: 18, color: '#1e293b',
                                outline: 'none', background: answered ? (isCorrect ? '#dcfce7' : '#fee2e2') : '#fff',
                                boxShadow: answered ? 'none' : `0 4px 12px ${themeColor}20`
                            }} 
                        />
                    </div>
                </div>
            </div>

            {!answered && (
                <button 
                    onClick={handleSubmit}
                    disabled={!isFullyFilled()}
                    style={{
                        width: '100%', padding: '14px', borderRadius: '12px',
                        background: isFullyFilled() ? themeColor : '#cbd5e1',
                        color: '#fff', fontSize: 15, fontWeight: 800, cursor: isFullyFilled() ? 'pointer' : 'not-allowed',
                        border: 'none', transition: 'all 0.2s',
                        boxShadow: isFullyFilled() ? `0 4px 16px ${themeColor}40` : 'none'
                    }}
                >
                    Save Answer
                </button>
            )}

            {answered && (
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 }}>
                    {isCorrect ? (
                        <div style={{ background: '#dcfce7', color: '#15803d', padding: '8px 16px', borderRadius: 12, fontWeight: 800, fontSize: 14 }}>
                            ✅ Correct!
                        </div>
                    ) : (
                        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '8px 16px', borderRadius: 12, fontWeight: 800, fontSize: 14 }}>
                            ❌ Incorrect (Answer: {correctAnswer})
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
