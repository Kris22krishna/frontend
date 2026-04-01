import React, { useState, useEffect, useRef } from 'react';

export default function BarGraphDrawInteractive({ question, answered, userAnswer, onChange, color, prefix }) {
    // userAnswer is an array of heights matching categories
    const initialHeights = Array(question.categories.length).fill(0);
    const [heights, setHeights] = useState(userAnswer ?? initialHeights);
    const containerRef = useRef(null);

    useEffect(() => {
        if (userAnswer) {
            setHeights(userAnswer);
        }
    }, [userAnswer]);

    const maxVal = question.maxVal || 100;
    const step = question.step || 10;
    const yAxisMarks = Array.from({ length: Math.floor(maxVal / step) + 1 }, (_, i) => i * step);

    const handleBarClick = (index, value) => {
        if (answered) return;
        const newHeights = [...heights];
        newHeights[index] = value;
        setHeights(newHeights);
        onChange(newHeights);
    };

    return (
        <div style={{ background: '#f8fafc', padding: '24px 24px 40px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#0f172a', fontWeight: '800', fontSize: '15px', marginBottom: '20px', textAlign: 'center' }}>
                Click to draw the bar graph
            </div>

            <div style={{ display: 'flex', height: '300px', position: 'relative', marginTop: '20px', marginLeft: '40px' }}>
                {/* Y-axis labels */}
                <div style={{ position: 'absolute', left: '-40px', top: 0, bottom: 0, width: '30px', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', paddingBottom: '1px' }}>
                    {yAxisMarks.map((val) => (
                        <div key={val} style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '0px' }}>
                            <span style={{ transform: 'translateY(-50%)' }}>{val}</span>
                        </div>
                    ))}
                </div>

                {/* Graph Area */}
                <div style={{ flex: 1, position: 'relative', borderLeft: '2px solid #cbd5e1', borderBottom: '2px solid #cbd5e1', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                    
                    {/* Grid lines */}
                    {yAxisMarks.map((val) => {
                        const bottomPct = (val / maxVal) * 100;
                        return (
                            <div key={`grid${val}`} style={{ position: 'absolute', left: 0, right: 0, bottom: `${bottomPct}%`, height: '1px', background: 'rgba(203,213,225,0.4)', zIndex: 0 }} />
                        );
                    })}

                    {/* Bars */}
                    {question.categories.map((cat, i) => {
                        const heightPct = (heights[i] / maxVal) * 100;
                        
                        return (
                            <div key={i} style={{ width: '40px', height: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                                
                                {/* Interactive column background for clicking */}
                                {!answered && (
                                    <div 
                                        style={{ position: 'absolute', top: 0, bottom: 0, left: '-20px', right: '-20px', cursor: 'pointer', zIndex: 2 }}
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const clickY = e.clientY - rect.top;
                                            const clickPct = 1 - (clickY / rect.height);
                                            // Snap to nearest half step
                                            const clickedVal = Math.round((clickPct * maxVal) / step) * step;
                                            // Ensure within bounds
                                            const safeVal = Math.max(0, Math.min(maxVal, clickedVal));
                                            handleBarClick(i, safeVal);
                                        }}
                                    />
                                )}

                                {/* The actual bar fill */}
                                <div style={{ 
                                    width: '100%', 
                                    height: `${heightPct}%`, 
                                    background: heightPct > 0 ? color : 'transparent',
                                    borderTopLeftRadius: '4px',
                                    borderTopRightRadius: '4px',
                                    transition: 'height 0.2s ease',
                                    boxShadow: heightPct > 0 ? 'inset 0 2px 4px rgba(255,255,255,0.2)' : 'none',
                                    pointerEvents: 'none'
                                }} />

                                {/* Value label on top of bar */}
                                {heightPct > 0 && (
                                    <div style={{ position: 'absolute', bottom: `calc(${heightPct}% + 4px)`, fontSize: '11px', fontWeight: '800', color: color }}>
                                        {heights[i]}
                                    </div>
                                )}

                                {/* X-axis label */}
                                <div style={{ position: 'absolute', bottom: '-24px', fontSize: '11px', fontWeight: '700', color: '#475569', whiteSpace: 'nowrap', textAlign: 'center', width: '100px' }}>
                                    {cat}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {!answered && (
                <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>
                    Click anywhere inside a column to set the bar height.
                </div>
            )}
        </div>
    );
}
