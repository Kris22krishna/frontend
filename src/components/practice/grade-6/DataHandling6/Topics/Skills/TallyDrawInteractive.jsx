import React, { useState, useEffect } from 'react';

export default function TallyDrawInteractive({ question, answered, userAnswer, onChange, color, prefix }) {
    // We expect userAnswer to be a number (count of tallies drawn)
    const [count, setCount] = useState(userAnswer ?? 0);

    useEffect(() => {
        if (userAnswer !== undefined) {
            setCount(userAnswer);
        }
    }, [userAnswer]);

    const handleAdd = () => {
        if (answered || count >= 50) return;
        const newCount = count + 1;
        setCount(newCount);
        onChange(newCount);
    };

    const handleRemove = () => {
        if (answered || count <= 0) return;
        const newCount = count - 1;
        setCount(newCount);
        onChange(newCount);
    };

    const handleClear = () => {
        if (answered || count === 0) return;
        setCount(0);
        onChange(0);
    };

    // Render tallies based on count
    const groups = Math.floor(count / 5);
    const rem = count % 5;
    
    let x = 10;
    const lines = [];
    for (let g = 0; g < groups; g++) {
        for (let j = 0; j < 4; j++) {
            lines.push(<line key={`g${g}l${j}`} x1={x} y1="10" x2={x} y2="50" stroke={color} strokeWidth="4" strokeLinecap="round"/>);
            x += 14;
        }
        // Diagonal cross line
        lines.push(<line key={`g${g}c`} x1={x - 56} y1="40" x2={x - 4} y2="20" stroke={color} strokeWidth="4" strokeLinecap="round"/>);
        x += 20; // Space between groups
    }
    for (let j = 0; j < rem; j++) {
        lines.push(<line key={`r${j}`} x1={x} y1="10" x2={x} y2="50" stroke={color} strokeWidth="4" strokeLinecap="round"/>);
        x += 14;
    }

    const svgWidth = Math.max(x + 20, 200);

    return (
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ color: '#0f172a', fontWeight: '700', fontSize: '15px' }}>
                Draw {question.targetCount} Tally Marks:
            </div>
            
            <div style={{ minHeight: '80px', width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', background: '#fff', borderRadius: '12px', border: '2px dashed #cbd5e1', padding: '10px' }}>
                <svg viewBox={`0 0 ${svgWidth} 60`} width={svgWidth} height="60" xmlns="http://www.w3.org/2000/svg">
                    {lines}
                </svg>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button 
                    onClick={handleAdd} 
                    disabled={answered}
                    style={{ padding: '10px 24px', background: color, color: '#fff', borderRadius: '100px', border: 'none', fontWeight: '800', cursor: answered ? 'default' : 'pointer', opacity: answered ? 0.6 : 1 }}
                >
                    + Add Tally
                </button>
                <button 
                    onClick={handleRemove} 
                    disabled={answered || count === 0}
                    style={{ padding: '10px 24px', background: '#fff', color: color, border: `2px solid ${color}`, borderRadius: '100px', fontWeight: '800', cursor: answered || count === 0 ? 'default' : 'pointer', opacity: answered || count === 0 ? 0.5 : 1 }}
                >
                    - Remove Tally
                </button>
                <button 
                    onClick={handleClear} 
                    disabled={answered || count === 0}
                    style={{ padding: '10px 20px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '100px', fontWeight: '700', fontSize: '13px', marginLeft: '10px', cursor: answered || count === 0 ? 'default' : 'pointer', opacity: answered || count === 0 ? 0.5 : 1 }}
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}
