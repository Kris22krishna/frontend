import React, { useState, useRef, useEffect } from 'react';

export default function ProtractorInteractive({ 
    question, 
    answered, 
    userAnswer, 
    onChange, 
    onSubmit, 
    color = '#0891b2', 
    prefix = 'la' 
}) {
    const svgRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    
    // Default to 0 if not set
    const currentAngle = userAnswer ? Number(userAnswer) : 0;

    const handlePointerMove = (e) => {
        if (answered) return;
        if (!isDragging && e.type !== 'click') return;
        
        if (svgRef.current) {
            const rect = svgRef.current.getBoundingClientRect();
            // SVG coordinate system: cx=200, cy=180
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Map screen box to viewBox 0 0 400 220
            const scaleX = 400 / rect.width;
            const scaleY = 220 / rect.height;
            
            const svgX = x * scaleX;
            const svgY = y * scaleY;
            
            const dx = svgX - 200;
            const dy = 180 - svgY; // Invert Y because SVG Y goes down
            
            let angleRad = Math.atan2(dy, dx);
            let angleDeg = Math.round((angleRad * 180) / Math.PI);
            
            if (angleDeg < 0) {
                // Determine whether they swung past 180 or past 0
                if (dy < 0 && dx < 0) angleDeg = 180;
                else angleDeg = 0;
            }
            
            // Snap to 5 degrees for easier use
            angleDeg = Math.round(angleDeg / 5) * 5;
            
            if (angleDeg > 180) angleDeg = 180;
            if (angleDeg < 0) angleDeg = 0;
            
            onChange(String(angleDeg));
        }
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener('pointerup', handlePointerUp);
        document.addEventListener('pointercancel', handlePointerUp);
        return () => {
            document.removeEventListener('pointerup', handlePointerUp);
            document.removeEventListener('pointercancel', handlePointerUp);
        };
    }, []);

    // Generate Protractor Marks
    const ticks = [];
    for (let i = 0; i <= 180; i += 5) {
        const rad = (i * Math.PI) / 180;
        const isMajor = i % 10 === 0;
        const outerR = 140;
        const innerR = isMajor ? 125 : 132;
        
        const x1 = 200 + outerR * Math.cos(rad);
        const y1 = 180 - outerR * Math.sin(rad);
        const x2 = 200 + innerR * Math.cos(rad);
        const y2 = 180 - innerR * Math.sin(rad);
        
        ticks.push(
            <line 
                key={i} 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke="#64748b" 
                strokeWidth={isMajor ? 2 : 1.5} 
            />
        );
        
        if (isMajor) {
            const textR = 110;
            const tx = 200 + textR * Math.cos(rad);
            const ty = 180 - textR * Math.sin(rad);
            ticks.push(
                <text 
                    key={`t${i}`} 
                    x={tx} y={ty} 
                    fill="#475569" 
                    fontSize="11" 
                    fontWeight="700" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    // Rotate the text so it curves around like a real protractor
                    transform={`rotate(${90 - i}, ${tx}, ${ty})`}
                >
                    {i}
                </text>
            );
        }
    }

    const currentRad = (currentAngle * Math.PI) / 180;
    const pointerX = 200 + 150 * Math.cos(currentRad);
    const pointerY = 180 - 150 * Math.sin(currentRad);
    
    // Check state logic
    const isCorrect = userAnswer && (question.range 
        ? Number(userAnswer) >= question.range[0] && Number(userAnswer) <= question.range[1]
        : Math.abs(Number(userAnswer) - Number(question.answer)) <= (question.tolerance || 5));
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', width: '100%' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: `var(--${prefix}-muted, #64748b)`, textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Interactive Protractor
                </div>
                <div style={{ 
                    background: color, color: '#fff', padding: '6px 14px', borderRadius: 8, fontSize: 18, fontWeight: 900 
                }}>
                    {currentAngle}°
                </div>
            </div>

            <div 
                style={{ 
                    position: 'relative', width: '100%', maxWidth: 500, margin: '0 auto',
                    touchAction: 'none' // Prevent scrolling while dragging
                }}
            >
                <svg
                    ref={svgRef}
                    viewBox="0 0 400 220"
                    width="100%"
                    height="100%"
                    style={{ background: '#f8fafc', borderRadius: 16, border: '2px solid rgba(0,0,0,0.05)', cursor: answered ? 'default' : 'crosshair' }}
                    onPointerDown={(e) => {
                        if(answered) return;
                        setIsDragging(true);
                        handlePointerMove(e);
                    }}
                    onPointerMove={handlePointerMove}
                    onClick={handlePointerMove}
                >
                    {/* Protractor Base Arc */}
                    <path 
                        d="M 40,180 A 160,160 0 0,1 360,180 Z" 
                        fill="rgba(255,255,255,0.7)" 
                        stroke="#94a3b8" 
                        strokeWidth="2"
                    />
                    
                    {/* Protractor Inner Cutout */}
                    <path 
                        d="M 120,180 A 80,80 0 0,1 280,180 Z" 
                        fill="#f8fafc" 
                        stroke="#94a3b8" 
                        strokeWidth="2"
                    />

                    {/* Ticks & Numbers */}
                    {ticks}

                    {/* Base Ray (0 degrees) */}
                    <line x1="200" y1="180" x2="380" y2="180" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Active Ray Arc indicator */}
                    <path 
                        d={`M 240 180 A 40 40 0 0 0 ${200 + 40*Math.cos(currentRad)} ${180 - 40*Math.sin(currentRad)}`} 
                        fill="none" 
                        stroke={color} 
                        strokeWidth="3"
                        opacity="0.5"
                    />

                    {/* Interactive Ray (Dynamic angle) */}
                    <line 
                        x1="200" y1="180" 
                        x2={pointerX} y2={pointerY} 
                        stroke={color} 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                    />
                    
                    {/* Center Point */}
                    <circle cx="200" cy="180" r="5" fill="#0f172a" />
                    <circle cx="200" cy="180" r="2" fill="#fff" />
                    
                    {/* Pointer Grab Highlight */}
                    {!answered && currentAngle > 0 && (
                        <circle cx={pointerX} cy={pointerY} r="15" fill={color} opacity="0.2" />
                    )}
                </svg>
                
                {!answered && (
                    <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, fontWeight: 600, color: '#64748b' }}>
                        Drag the colored ray to set the angle
                    </div>
                )}
            </div>

            {/* Assessment Submit Button / Quiz Validation */}
            {onSubmit && !answered && (
                <button
                    onClick={onSubmit}
                    style={{
                        padding: '14px 24px', borderRadius: 12, border: 'none',
                        background: color, color: '#fff', fontSize: 16, width: '100%',
                        fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                >
                    Lock Answer
                </button>
            )}

            {answered && isCorrect !== null && onSubmit && (
                <div style={{ 
                    padding: '16px', borderRadius: 12, width: '100%', textAlign: 'center',
                    background: isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    color: isCorrect ? '#10b981' : '#ef4444',
                    border: `2px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    fontSize: 15, fontWeight: 700
                }}>
                    {isCorrect 
                        ? '✅ Perfect! That is the correct angle.' 
                        : `❌ Incorrect. The target angle was ${question.range ? `between ${question.range[0]}° and ${question.range[1]}` : question.answer}°. Your answer was ${userAnswer}°.`}
                </div>
            )}
        </div>
    );
}
