import React, { useState } from 'react';

export default function GeometryDrawInteractive({ 
    question, 
    answered, 
    userAnswer, 
    onChange, 
    onSubmit, 
    color = '#0891b2', 
    prefix = 'la' 
}) {
    // Safely parse userAnswer - never crash if undefined/null/invalid
    const [p1, setP1] = useState(() => {
        try {
            if (!userAnswer) return null;
            const parsed = typeof userAnswer === 'string' ? JSON.parse(userAnswer) : userAnswer;
            return parsed?.p1 ?? null;
        } catch(e) { return null; }
    });
    const [p2, setP2] = useState(() => {
        try {
            if (!userAnswer) return null;
            const parsed = typeof userAnswer === 'string' ? JSON.parse(userAnswer) : userAnswer;
            return parsed?.p2 ?? null;
        } catch(e) { return null; }
    });

    const handlePointClick = (id) => {
        if (answered) return;
        
        if (!p1) {
            setP1(id);
            onChange(JSON.stringify({ tool: question.tool, p1: id, p2: null }));
        } else if (!p2 && id !== p1) {
            setP2(id);
            onChange(JSON.stringify({ tool: question.tool, p1, p2: id }));
        } else {
            // Reset and start new
            setP1(id);
            setP2(null);
            onChange(JSON.stringify({ tool: question.tool, p1: id, p2: null }));
        }
    };

    const getPointCoords = (id) => question.points.find(p => p.id === id);

    // Calculate extended line coordinates
    const getLineCoords = (point1, point2, format) => {
        const pA = getPointCoords(point1);
        const pB = getPointCoords(point2);
        if (!pA || !pB) return null;

        const theta = Math.atan2(pB.y - pA.y, pB.x - pA.x);
        const dist = 1000;
        
        let x1 = pA.x, y1 = pA.y;
        let x2 = pB.x, y2 = pB.y;

        if (format === 'line') {
            x1 = pA.x - dist * Math.cos(theta);
            y1 = pA.y - dist * Math.sin(theta);
            x2 = pB.x + dist * Math.cos(theta);
            y2 = pB.y + dist * Math.sin(theta);
        } else if (format === 'ray') {
            x2 = pB.x + dist * Math.cos(theta);
            y2 = pB.y + dist * Math.sin(theta);
        }

        return { x1, y1, x2, y2 };
    };

    const isCorrect = () => {
        if (!userAnswer) return null;
        let user;
        try {
            user = typeof userAnswer === 'string' ? JSON.parse(userAnswer) : userAnswer;
        } catch(e) { return false; }
        
        if (!user || user.p1 === null || user.p2 === null) return false;
        
        const correct = question.answer;
        if (!correct) return false;

        if (correct.format === 'segment' || correct.format === 'line') {
            return (user.p1 === correct.p1 && user.p2 === correct.p2) || 
                   (user.p1 === correct.p2 && user.p2 === correct.p1);
        } else if (correct.format === 'ray') {
            return user.p1 === correct.p1 && user.p2 === correct.p2;
        }
        return false;
    };

    const answerStatus = isCorrect();

    let lineData = null;
    if (p1 && p2) {
        lineData = getLineCoords(p1, p2, question.tool);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', width: '100%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: `var(--${prefix}-muted, #64748b)`, textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Interactive Construction
                </div>
                <div style={{ 
                    background: color, color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1
                }}>
                    Tool: {question.tool}
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: 500, margin: '0 auto', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 12, left: 16, fontSize: 13, fontWeight: 700, color: '#64748b', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 6, zIndex: 10 }}>
                    Click two points to connect
                </div>
                <svg
                    viewBox="0 0 400 300"
                    width="100%"
                    height="100%"
                    style={{ background: '#f8fafc', borderRadius: 16, border: '2px solid rgba(0,0,0,0.05)', display: 'block' }}
                >
                    {/* Render Line/Ray/Segment */}
                    {lineData && (
                        <g>
                            <line 
                                x1={lineData.x1} y1={lineData.y1} 
                                x2={lineData.x2} y2={lineData.y2} 
                                stroke={color} 
                                strokeWidth="4" 
                                strokeLinecap="round" 
                            />
                            {question.tool === 'line' && (
                                <>
                                    <polygon points={`${lineData.x1},${lineData.y1} ${lineData.x1+10},${lineData.y1-5} ${lineData.x1+10},${lineData.y1+5}`} fill={color} transform={`rotate(${Math.atan2(lineData.y2-lineData.y1, lineData.x2-lineData.x1)*180/Math.PI}, ${lineData.x1}, ${lineData.y1})`} />
                                    <polygon points={`${lineData.x2},${lineData.y2} ${lineData.x2-10},${lineData.y2-5} ${lineData.x2-10},${lineData.y2+5}`} fill={color} transform={`rotate(${Math.atan2(lineData.y2-lineData.y1, lineData.x2-lineData.x1)*180/Math.PI}, ${lineData.x2}, ${lineData.y2})`} />
                                </>
                            )}
                            {question.tool === 'ray' && (
                                <polygon points={`${lineData.x2},${lineData.y2} ${lineData.x2-10},${lineData.y2-5} ${lineData.x2-10},${lineData.y2+5}`} fill={color} transform={`rotate(${Math.atan2(lineData.y2-lineData.y1, lineData.x2-lineData.x1)*180/Math.PI}, ${lineData.x2}, ${lineData.y2})`} />
                            )}
                        </g>
                    )}

                    {/* Render Points */}
                    {question.points.map(pt => {
                        const isPrimary = p1 === pt.id;
                        const isSecondary = p2 === pt.id;
                        const isSelected = isPrimary || isSecondary;
                        return (
                            <g 
                                key={pt.id} 
                                transform={`translate(${pt.x}, ${pt.y})`}
                                onClick={() => handlePointClick(pt.id)}
                                style={{ cursor: answered ? 'default' : 'pointer' }}
                            >
                                {/* Touch Target Area */}
                                <circle cx="0" cy="0" r="25" fill="transparent" />
                                
                                {/* Point rendering */}
                                <circle 
                                    cx="0" cy="0" 
                                    r={isSelected ? "8" : "5"} 
                                    fill={isSelected ? color : "#0f172a"} 
                                    stroke={isSelected ? "#fff" : "none"}
                                    strokeWidth={isSelected ? "2" : "0"}
                                />
                                {isSelected && (
                                    <circle cx="0" cy="0" r="14" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
                                )}
                                
                                {/* Label */}
                                <text 
                                    x="0" y="22" 
                                    fill={isSelected ? color : "#475569"} 
                                    fontSize="15" 
                                    fontWeight="900" 
                                    textAnchor="middle"
                                >
                                    {pt.id}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {onSubmit && !answered && (
                <button
                    onClick={onSubmit}
                    disabled={!p1 || !p2}
                    style={{
                        padding: '14px 24px', borderRadius: 12, border: 'none',
                        background: (p1 && p2) ? color : '#cbd5e1', 
                        color: '#fff', fontSize: 16, width: '100%',
                        fontWeight: 700, cursor: (p1 && p2) ? 'pointer' : 'not-allowed', 
                        boxShadow: (p1 && p2) ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    Lock Drawing
                </button>
            )}

            {answered && isCorrect() !== null && onSubmit && (
                <div style={{ 
                    padding: '16px', borderRadius: 12, width: '100%', textAlign: 'center',
                    background: answerStatus ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    color: answerStatus ? '#10b981' : '#ef4444',
                    border: `2px solid ${answerStatus ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    fontSize: 15, fontWeight: 700
                }}>
                    {answerStatus 
                        ? '✅ Perfect! That is the correct construction.' 
                        : `❌ Incorrect construction.`}
                    <div style={{ marginTop: 6, fontSize: 13, color: 'inherit', opacity: 0.9 }}>
                        {question.explanation}
                    </div>
                </div>
            )}
        </div>
    );
}
