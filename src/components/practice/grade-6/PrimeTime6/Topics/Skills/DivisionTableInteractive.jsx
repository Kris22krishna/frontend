import React, { useState, useEffect, useMemo } from 'react';
import MathRenderer from '../../../../../MathRenderer';

export default function DivisionTableInteractive({ question, value, onChange, readOnly }) {
    // Determine the numbers to divide
    const initialNumbers = question.numbers || []; // e.g. [12, 18]
    const initialNumbersKey = initialNumbers.join('-');
    
    // Default state: one active row containing the initial numbers
    // useMemo prevents regenerating keys on every parent render (1s timer)
    const defaultState = useMemo(() => ({
        rows: [{ id: `init-${initialNumbersKey}`, divisor: '', quotients: [...initialNumbers] }],
        finalAnswer: ''
    }), [initialNumbersKey]); // stringifying array for dependency comparison

    const currentState = value || defaultState;
    const { rows, finalAnswer } = currentState;

    const handleDivisorChange = (index, val) => {
        if (readOnly) return;
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], divisor: val.replace(/[^0-9]/g, '') };
        onChange({ ...currentState, rows: newRows });
    };

    const handleQuotientChange = (rowIndex, colIndex, val) => {
        if (readOnly) return;
        const newRows = [...rows];
        const newQuotients = [...newRows[rowIndex].quotients];
        newQuotients[colIndex] = val.replace(/[^0-9]/g, '');
        newRows[rowIndex] = { ...newRows[rowIndex], quotients: newQuotients };
        onChange({ ...currentState, rows: newRows });
    };

    const addRow = () => {
        if (readOnly) return;
        const lastRow = rows[rows.length - 1];
        // Only allow adding a row if the previous row has a divisor
        if (!lastRow.divisor) return;
        onChange({
            ...currentState,
            rows: [
                ...rows,
                { id: Date.now(), divisor: '', quotients: Array(initialNumbers.length).fill('') }
            ]
        });
    };

    const removeRow = (index) => {
        if (readOnly || rows.length <= 1) return;
        const newRows = rows.filter((_, i) => i !== index);
        onChange({ ...currentState, rows: newRows });
    };

    const handleFinalAnswerChange = (e) => {
        if (readOnly) return;
        onChange({ ...currentState, finalAnswer: e.target.value });
    };

    const isHCF = question.mode === 'HCF';
    const isLCM = question.mode === 'LCM';

    return (
        <div style={{ background: '#f8fafc', padding: '32px 24px', borderRadius: '24px', border: '1px solid #e2e8f0', margin: '20px 0', fontFamily: "'Inter', sans-serif" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* ── Table Container ── */}
                <div style={{ position: 'relative', display: 'inline-block', minWidth: '200px' }}>
                    
                    {/* Top bar over initial numbers */}
                    <div style={{ position: 'absolute', top: 0, right: 0, left: '60px', height: '2px', background: '#0f172a', borderRadius: '2px' }} />

                    {/* Vertical line separator for divisor */}
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '60px', width: '2px', background: '#0f172a', borderRadius: '2px' }} />

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {rows.map((row, rIndex) => (
                            <div key={row.id} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                {/* Left Cell: Divisor */}
                                <div style={{ width: '60px', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                                    <input
                                        type="text"
                                        value={row.divisor}
                                        onChange={(e) => handleDivisorChange(rIndex, e.target.value)}
                                        disabled={readOnly}
                                        placeholder=" ÷ "
                                        style={{
                                            width: '40px', height: '40px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold',
                                            borderRadius: '8px', border: '2px solid transparent', background: row.divisor ? '#dbeafe' : 'transparent',
                                            color: '#1e40af', outline: 'none', transition: 'all 0.2s',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                                    />
                                </div>

                                {/* Right Cells: Quotients/Numbers */}
                                <div style={{ display: 'flex', padding: '8px 16px', gap: '16px' }}>
                                    {row.quotients.map((qVal, cIndex) => {
                                        const isInitial = rIndex === 0;
                                        return (
                                            <input
                                                key={cIndex}
                                                type="text"
                                                value={isInitial ? initialNumbers[cIndex] : qVal}
                                                onChange={(e) => handleQuotientChange(rIndex, cIndex, e.target.value)}
                                                disabled={readOnly || isInitial}
                                                style={{
                                                    width: '48px', height: '40px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold',
                                                    borderRadius: '8px', border: isInitial ? 'none' : '2px dashed #cbd5e1', 
                                                    background: isInitial ? 'transparent' : '#fff', color: '#0f172a',
                                                    outline: 'none', transition: 'all 0.2s'
                                                }}
                                                onFocus={(e) => !isInitial && (e.target.style.borderColor = '#3b82f6')}
                                                onBlur={(e) => !isInitial && (e.target.style.borderColor = '#cbd5e1')}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Row Actions */}
                                {!readOnly && rIndex > 0 && (
                                    <button 
                                        onClick={() => removeRow(rIndex)}
                                        style={{ position: 'absolute', right: '-30px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', opacity: 0.6 }}
                                        onMouseEnter={e => e.target.style.opacity = 1}
                                        onMouseLeave={e => e.target.style.opacity = 0.6}
                                        title="Remove Row"
                                    >
                                        ×
                                    </button>
                                )}

                                {/* Underline separator after each row except the very last one visually (actually we put it directly on the container) */}
                                {rIndex > 0 && (
                                    <div style={{ position: 'absolute', top: 0, left: '60px', right: 0, height: '2px', background: '#0f172a', borderRadius: '2px', opacity: 0.4 }} />
                                )}
                            </div>
                        ))}
                    </div>

                    {!readOnly && (
                        <div style={{ paddingLeft: '60px', marginTop: '10px' }}>
                            <button 
                                onClick={addRow}
                                style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#f1f5f9', border: '2px dashed #cbd5e1', borderRadius: '12px', color: '#64748b', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.target.style.background = '#e2e8f0'; e.target.style.borderColor = '#94a3b8'; }}
                                onMouseLeave={e => { e.target.style.background = '#f1f5f9'; e.target.style.borderColor = '#cbd5e1'; }}
                            >
                                + Add Step
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Final Answer Component ── */}
                <div style={{ marginTop: '40px', width: '100%', maxWidth: '500px', background: '#fff', padding: '24px', borderRadius: '20px', border: '2px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
                        <strong style={{ fontSize: '18px', color: '#334155', whiteSpace: 'nowrap' }}>
                            {isHCF ? `HCF of ${initialNumbers.join(', ')}` : isLCM ? `LCM of ${initialNumbers.join(', ')}` : 'Final Answer'} = 
                        </strong>
                        <input
                            type="text"
                            value={finalAnswer}
                            onChange={handleFinalAnswerChange}
                            disabled={readOnly}
                            placeholder="?"
                            style={{
                                flex: 1, padding: '12px 16px', fontSize: '20px', fontWeight: 'bold', color: '#0f172a',
                                border: '2px solid #3b82f6', borderRadius: '12px', background: '#eff6ff', outline: 'none'
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
