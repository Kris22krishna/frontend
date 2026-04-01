import React, { useState, useEffect } from 'react';

export default function PictographDrawInteractive({ question, answered, userAnswer, onChange, color, prefix }) {
    // userAnswer will be an array of counts for each category
    const initialCounts = Array(question.categories.length).fill(0);
    const [counts, setCounts] = useState(userAnswer ?? initialCounts);

    useEffect(() => {
        if (userAnswer) {
            setCounts(userAnswer);
        }
    }, [userAnswer]);

    const handleSymbolClick = (val, rowIndex) => {
        if (answered) return;
        const newCounts = [...counts];
        if (val === 1) newCounts[rowIndex] += question.keyVal;
        if (val === 0.5) newCounts[rowIndex] += (question.keyVal / 2);
        setCounts(newCounts);
        onChange(newCounts);
    };

    const handleClearRow = (rowIndex) => {
        if (answered) return;
        const newCounts = [...counts];
        newCounts[rowIndex] = 0;
        setCounts(newCounts);
        onChange(newCounts);
    };

    return (
        <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ color: '#0f172a', fontWeight: '800', fontSize: '16px', marginBottom: '8px' }}>
                Complete the Pictograph
                <div style={{ fontWeight: '500', fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                    Key: 1 {question.symbol} = {question.keyVal} items
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead>
                    <tr>
                        <th style={{ width: '30%', textAlign: 'left', padding: '12px', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>Category</th>
                        <th style={{ textAlign: 'left', padding: '12px', borderBottom: '2px solid #e2e8f0', color: '#64748b', fontWeight: '800', fontSize: '13px', textTransform: 'uppercase' }}>Symbols drawn</th>
                        <th style={{ width: '80px', padding: '12px', borderBottom: '2px solid #e2e8f0' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {question.categories.map((cat, i) => {
                        const count = counts[i];
                        const fullSymbols = Math.floor(count / question.keyVal);
                        const hasHalf = (count % question.keyVal) > 0;
                        const drawnValue = count;

                        return (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '16px 12px', fontWeight: '700', color: '#1e293b' }}>{cat}</td>
                                <td style={{ padding: '16px 12px', fontSize: '24px' }}>
                                    {/* Render symbols */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', minHeight: '34px' }}>
                                        {Array.from({ length: fullSymbols }).map((_, si) => (
                                            <span key={`f${si}`}>{question.symbol}</span>
                                        ))}
                                        {hasHalf && <span style={{ opacity: 0.5 }}>{question.symbol}</span>}
                                        
                                        {!answered && (
                                            <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto', background: '#f8fafc', padding: '4px 8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                <button onClick={() => handleSymbolClick(1, i)} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', color }}>+ 1 {question.symbol}</button>
                                                {question.allowHalf && (
                                                    <button onClick={() => handleSymbolClick(0.5, i)} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', color }}>+ ½ {question.symbol}</button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginTop: '6px' }}>
                                        Value: {drawnValue}
                                    </div>
                                </td>
                                <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                                    {!answered && count > 0 && (
                                        <button onClick={() => handleClearRow(i)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>Clear</button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
