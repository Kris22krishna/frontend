import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateSharingSkillsData } from './skillsData';
import '../../../Shapes_Around_Us/shapes-around-us.css'; // Reusing layout CSS

/* ═══════════════════════════════════════════════════════════════
   SHUFFLE UTILITIES
   ═══════════════════════════════════════════════════════════════ */
const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const useShuffledQuestions = (sourceQuestions, amount = 20) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (!sourceQuestions) return;
        let shuffledQs = shuffleArray(sourceQuestions).slice(0, amount);

        shuffledQs = shuffledQs.map(q => {
            if (q.type === 'multiple-choice') {
                const originalCorrectOption = q.options[q.correctAnswer];
                const shuffledOptions = shuffleArray(q.options);
                const newCorrectAnswerIndex = shuffledOptions.indexOf(originalCorrectOption);
                return {
                    ...q,
                    options: shuffledOptions,
                    correctAnswer: newCorrectAnswerIndex
                };
            }
            return q;
        });
        setQuestions(shuffledQs);
    }, [sourceQuestions, amount]);

    return questions;
};

/* ═══════════════════════════════════════════════════════════════
   FRACTION RENDERER
   ═══════════════════════════════════════════════════════════════ */
const renderFractionText = (text) => {
    if (typeof text !== 'string') return text;
    // Match fractions like 1/2, 3/4
    const parts = text.split(/(\d+)\/(\d+)/g);
    if (parts.length === 1) return text;
    
    return parts.map((part, i) => {
        if (i % 3 === 0) return <React.Fragment key={i}>{part}</React.Fragment>;
        if (i % 3 === 1) {
            const num = part;
            const den = parts[i + 1];
            return (
                <span key={i} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', verticalAlign: 'middle', margin: '0 2px', lineHeight: 1.1, fontSize: '0.85em' }}>
                    <span>{num}</span>
                    <span style={{ borderTop: 'max(1px, 0.1em) solid currentColor', width: '100%' }}></span>
                    <span>{den}</span>
                </span>
            );
        }
        return null; // Denominator is skipped because it's handled in the numerator pass
    });
};

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

// Type: color-fraction (Click to color parts of a shape)
function ColorFractionQ({ q, selectedOption, onAnswer, disabled }) {
    // selectedOption will be an array of colored indices, or null
    const [coloredParts, setColoredParts] = useState(selectedOption || []);
    
    // totalParts and shapeType come from q
    const totalParts = q.totalParts || 4;
    const requiredParts = q.requiredParts || 1;
    const shapeType = q.shapeType || 'circle'; // 'circle' or 'rect'

    useEffect(() => {
        if (selectedOption) setColoredParts(selectedOption);
    }, [selectedOption]);

    const togglePart = (index) => {
        if (disabled) return;
        setColoredParts(prev => {
            const next = prev.includes(index) ? prev.filter(p => p !== index) : [...prev, index];
            if (next.length === requiredParts && !disabled) {
                // Auto-submit if they hit the target parts
                onAnswer(next);
            } else if (!disabled) {
                // Still update parent state so it's remembered if they navigate away
                onAnswer(next, true); // true = 'draft' mode so it doesn't lock
            }
            return next;
        });
    };

    const isCorrect = coloredParts.length === requiredParts;

    return (
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
            {q.image && <div style={{ fontSize: 40, marginBottom: 12 }}>{q.image}</div>}
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{renderFractionText(q.question)}</p>
            
            <div style={{ 
                display: 'inline-flex', 
                flexWrap: 'wrap', 
                gap: 10, 
                justifyContent: 'center',
                padding: 24,
                background: '#f8fafc',
                borderRadius: 20,
                border: '2px dashed #cbd5e1'
            }}>
                {Array.from({ length: totalParts }).map((_, i) => {
                    const isColored = coloredParts.includes(i);
                    let baseStyle = {
                        width: 80, height: 80, 
                        background: isColored ? '#f43f5e' : '#fff',
                        border: '3px solid #cbd5e1',
                        cursor: disabled ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    };
                    
                    if (shapeType === 'circle') {
                        // We'll just render wedges using clip-path if possible, or simpler discrete circles for Grade 4
                        baseStyle.borderRadius = '50%';
                    } else if (shapeType === 'rect') {
                        baseStyle.borderRadius = 8;
                    }
                    
                    // Specific highlight for correctness if disabled
                    if (disabled && isColored) {
                        baseStyle.background = isCorrect ? '#10b981' : '#f43f5e';
                        baseStyle.borderColor = isCorrect ? '#059669' : '#e11d48';
                    }

                    return (
                        <div 
                            key={i} 
                            onClick={() => togglePart(i)}
                            style={baseStyle}
                        >
                            {isColored && <span style={{ color: '#fff', fontSize: 24 }}>★</span>}
                        </div>
                    );
                })}
            </div>
            
            <div style={{ marginTop: 20, fontSize: 16, fontWeight: 600, color: '#64748b' }}>
                Selected: <span style={{ color: isCorrect ? '#10b981' : '#f43f5e', fontSize: 20 }}>{coloredParts.length}</span> / {totalParts} parts
            </div>
            
            {!disabled && (
                <button 
                    onClick={() => onAnswer(coloredParts)}
                    style={{ marginTop: 20, padding: '12px 32px', background: '#e11d48', color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(225,29,72,0.3)' }}
                >
                    Submit Answer
                </button>
            )}
        </div>
    );
}

// Type: split-collection (Click items to move them into equal groups)
function SplitCollectionQ({ q, selectedOption, onAnswer, disabled }) {
    // q.totalItems, q.groups, q.emoji
    const [groups, setGroups] = useState(selectedOption || Array(q.groups).fill(0).map(() => []));
    const [unassigned, setUnassigned] = useState(
        selectedOption ? 0 : q.totalItems
    );

    useEffect(() => {
        if (selectedOption) {
            setGroups(selectedOption);
            const assigned = selectedOption.reduce((sum, g) => sum + g.length, 0);
            setUnassigned(q.totalItems - assigned);
        }
    }, [selectedOption, q.totalItems]);

    const handleAssign = (groupIndex) => {
        if (disabled || unassigned <= 0) return;
        setGroups(prev => {
            const next = [...prev];
            next[groupIndex] = [...next[groupIndex], q.emoji];
            
            const totalAssigned = next.reduce((sum, g) => sum + g.length, 0);
            if (totalAssigned === q.totalItems) {
                // Auto submit when all are assigned
                if (!disabled) onAnswer(next);
            } else {
                if (!disabled) onAnswer(next, true); // Draft mode
            }
            return next;
        });
        setUnassigned(u => u - 1);
    };

    const handleRemove = (groupIndex) => {
        if (disabled || groups[groupIndex].length === 0) return;
        setGroups(prev => {
            const next = [...prev];
            next[groupIndex] = next[groupIndex].slice(0, -1);
            if (!disabled) onAnswer(next, true); // Draft mode
            return next;
        });
        setUnassigned(u => u + 1);
    };

    const expectedPerGroup = q.totalItems / q.groups;
    const isCorrect = groups.every(g => g.length === expectedPerGroup);

    return (
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
            {q.image && <div style={{ fontSize: 40, marginBottom: 12 }}>{q.image}</div>}
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{renderFractionText(q.question)}</p>
            
            {/* Unassigned Items */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>Items to Share ({unassigned} left)</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', minHeight: 48 }}>
                    {Array.from({ length: unassigned }).map((_, i) => (
                        <div key={i} style={{ fontSize: 32, animation: 'bounce 2s infinite' }}>{q.emoji}</div>
                    ))}
                </div>
            </div>

            {/* Groups */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${q.groups}, 1fr)`, gap: 16 }}>
                {groups.map((items, i) => (
                    <div 
                        key={i} 
                        onClick={() => handleAssign(i)}
                        style={{
                            background: '#f8fafc',
                            border: `3px solid ${disabled ? (isCorrect ? '#10b981' : '#ef4444') : '#cbd5e1'}`,
                            borderRadius: 16,
                            padding: 16,
                            minHeight: 120,
                            cursor: disabled ? 'default' : (unassigned > 0 ? 'pointer' : 'default'),
                            display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}
                    >
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8', marginBottom: 8 }}>Box {i + 1}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', flex: 1 }}>
                            {items.map((emoji, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={(e) => { e.stopPropagation(); handleRemove(i); }}
                                    style={{ fontSize: 24, cursor: disabled ? 'default' : 'pointer' }}
                                >
                                    {emoji}
                                </div>
                            ))}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: disabled ? (isCorrect ? '#059669' : '#e11d48') : '#64748b', marginTop: 8 }}>
                            {items.length} {q.emoji}
                        </div>
                    </div>
                ))}
            </div>

            {!disabled && unassigned === 0 && (
                <button 
                    onClick={() => onAnswer(groups)}
                    style={{ marginTop: 24, padding: '12px 32px', background: '#e11d48', color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(225,29,72,0.3)' }}
                >
                    Submit Answer
                </button>
            )}
        </div>
    );
}

// Type: compare-signs (Select <, >, or =)
function CompareSignsQ({ q, selectedOption, onAnswer, disabled }) {
    const [selectedSign, setSelectedSign] = useState(selectedOption || null);

    useEffect(() => {
        if (selectedOption) setSelectedSign(selectedOption);
    }, [selectedOption]);

    const handleSignClick = (sign) => {
        if (disabled) return;
        setSelectedSign(sign);
        if (!disabled) onAnswer(sign);
    };

    const isCorrect = selectedSign === q.correctAnswer;

    return (
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
            {q.image && <div style={{ fontSize: 40, marginBottom: 12 }}>{q.image}</div>}
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{renderFractionText(q.question)}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '32px 16px', background: '#f8fafc', borderRadius: 20, border: '2px dashed #cbd5e1' }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: '#e11d48', background: '#fff', padding: '20px 30px', border: '3px solid #fecaca', borderRadius: 16, boxShadow: '0 8px 24px rgba(225,29,72,0.1)' }}>
                    {renderFractionText(q.fracA)}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {['<', '=', '>'].map(sign => {
                        const isSelected = selectedSign === sign;
                        let bg = '#fff', bdr = '#cbd5e1', clr = '#334155';
                        if (isSelected) {
                            bg = disabled ? (isCorrect ? '#10b981' : '#f43f5e') : '#3b82f6';
                            bdr = disabled ? (isCorrect ? '#059669' : '#e11d48') : '#2563eb';
                            clr = '#fff';
                        } else if (!disabled) {
                            clr = '#64748b'; // dimmed when not selected
                        }
                        return (
                            <button
                                key={sign}
                                onClick={() => handleSignClick(sign)}
                                disabled={disabled}
                                style={{
                                    width: 60, height: 60, borderRadius: '50%',
                                    background: bg, border: `3px solid ${bdr}`, color: clr,
                                    fontSize: 28, fontWeight: 900, cursor: disabled ? 'default' : 'pointer',
                                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                                }}
                            >
                                {sign}
                            </button>
                        );
                    })}
                </div>

                <div style={{ fontSize: 48, fontWeight: 900, color: '#0ea5e9', background: '#fff', padding: '20px 30px', border: '3px solid #bae6fd', borderRadius: 16, boxShadow: '0 8px 24px rgba(14,165,233,0.1)' }}>
                    {renderFractionText(q.fracB)}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   QUESTION CARD
   ═══════════════════════════════════════════════════════════════ */
function QuestionCard({ type, question, options, answer, onAnswer, disabled, selectedOption, image, showCorrect = true }) {
    const [val, setVal] = useState('');

    if (type === 'multiple-choice') {
        return (
            <div style={{ marginBottom: 20 }}>
                {image && <div style={{ fontSize: 64, textAlign: 'center', marginBottom: 12, padding: 24, background: '#f8fafc', borderRadius: 16 }}>{image}</div>}
                <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{renderFractionText(question)}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {options.map((opt, i) => {
                        let bg = '#fff';
                        let bdr = '#e2e8f0';
                        let clr = '#0f172a';
                        const letter = String.fromCharCode(65 + i); // A, B, C, D

                        if (disabled && showCorrect) {
                            if (i === answer) { bg = '#f0fdf4'; bdr = '#10b981'; }
                            else if (i === selectedOption) { bg = '#fef2f2'; bdr = '#ef4444'; }
                            else { clr = '#94a3b8'; }
                        } else if (disabled && !showCorrect) {
                            if (i === selectedOption) { bg = '#eff6ff'; bdr = '#3b82f6'; }
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => onAnswer(i)}
                                disabled={disabled}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 16px', borderRadius: 12, border: `2px solid ${bdr}`,
                                    background: bg, textAlign: 'left', fontWeight: 600, fontSize: 15,
                                    cursor: disabled ? 'default' : 'pointer', transition: 'all 0.2s', color: clr
                                }}
                            >
                                <span style={{
                                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 13, fontWeight: 800, flexShrink: 0,
                                    background: i === selectedOption ? (showCorrect ? (i === answer ? '#10b981' : '#ef4444') : '#3b82f6') : '#f1f5f9',
                                    color: i === selectedOption ? '#fff' : '#64748b'
                                }}>{letter}</span>
                                {renderFractionText(opt)}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
    
    if (type === 'color-fraction') {
        const fullQ = { type, question, options, answer, image, ...arguments[0].q }; // Grab full q object passed usually injected from parent
        return <ColorFractionQ q={arguments[0].q || { question, image }} selectedOption={selectedOption} onAnswer={onAnswer} disabled={disabled} />;
    }

    if (type === 'split-collection') {
        return <SplitCollectionQ q={arguments[0].q || { question, image }} selectedOption={selectedOption} onAnswer={onAnswer} disabled={disabled} />;
    }

    if (type === 'compare-signs') {
        return <CompareSignsQ q={arguments[0].q || { question, image }} selectedOption={selectedOption} onAnswer={onAnswer} disabled={disabled} />;
    }

    // Short answer
    return (
        <div style={{ marginBottom: 20 }}>
            {image && <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, padding: 16, background: '#f8fafc', borderRadius: 16 }}>{image}</div>}
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{renderFractionText(question)}</p>
            <div style={{ display: 'flex', gap: 10 }}>
                <input type="text" value={disabled ? (selectedOption || '') : val} onChange={e => setVal(e.target.value)} disabled={disabled}
                    placeholder="Type answer..." style={{ padding: '12px 16px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 16, flex: 1 }} />
                <button disabled={disabled || !val} onClick={() => onAnswer(val.trim())}
                    style={{ padding: '0 20px', background: disabled ? '#e2e8f0' : '#0284c7', color: '#fff', borderRadius: 12, fontWeight: 600, border: 'none', cursor: disabled ? 'default' : 'pointer' }}>Submit</button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   CIRCULAR SCORE RING
   ═══════════════════════════════════════════════════════════════ */
function ScoreRing({ score, total, color }) {
    const pct = total > 0 ? score / total : 0;
    const r = 70, circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct);
    return (
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ display: 'block', margin: '0 auto' }}>
            <circle cx="90" cy="90" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="10"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 90 90)"
                style={{ transition: 'stroke-dashoffset 1s ease' }} />
            <text x="90" y="85" textAnchor="middle" dominantBaseline="central" fontSize="40" fontWeight="900" fill="#0f172a">{score}</text>
            <text x="90" y="115" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#64748b">out of {total}</text>
        </svg>
    );
}

function fmtTime(ms) {
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ═══════════════════════════════════════════════════════════════
   LEARN MODE
   ═══════════════════════════════════════════════════════════════ */
function LearnMode({ skill, onBack }) {
    return (
        <div className="sau-detail-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: 20 }}>← Back to Skills</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ fontSize: 40 }}>{skill.emoji}</div>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#e11d48', margin: 0 }}>{renderFractionText(skill.title)}</h2>
                    <p style={{ margin: 0, fontSize: 16, color: '#64748b' }}>Learn the concepts</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {skill.learnSections.map((sec, i) => (
                    <div key={i} style={{ padding: 32, borderRadius: 24, background: '#fff', border: '2px solid #fecaca', textAlign: 'center', boxShadow: '0 8px 30px rgba(244,63,94,0.05)' }}>
                        <h4 style={{ margin: '0 0 20px', fontSize: 24, color: '#be123c', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>{renderFractionText(sec.heading)}</h4>
                        
                        {sec.visual && (
                            <div style={{ fontSize: 48, letterSpacing: '4px', marginBottom: 24, background: '#fdf2f8', padding: '24px', borderRadius: 20, display: 'inline-block', border: '2px dashed #f9a8d4' }}>
                                {renderFractionText(sec.visual)}
                            </div>
                        )}
                        
                        <p style={{ margin: '0 0 20px', fontSize: 18, color: '#4c0519', fontWeight: 700, lineHeight: 1.5, maxWidth: 500, marginInline: 'auto' }}>{renderFractionText(sec.content)}</p>
                        
                        {sec.example && (
                            <div style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg, #e11d48, #fb7185)', borderRadius: 100, color: '#fff', fontWeight: 800, fontSize: 16, boxShadow: '0 4px 12px rgba(225,29,72,0.3)' }}>
                                {renderFractionText(sec.example)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}>
                <button onClick={onBack} style={{ padding: '14px 40px', background: '#0f172a', color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: `0 4px 14px rgba(15,23,42,0.3)` }}>I'm Ready to Practice! 💪</button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PRACTICE MODE
   ═══════════════════════════════════════════════════════════════ */
function PracticeMode({ skill, onBack }) {
    const questions = useShuffledQuestions(skill.practice, 20);

    const [qIdx, setQIdx] = useState(0);
    const [answersMap, setAnswersMap] = useState({});
    const [finished, setFinished] = useState(false);
    const startTime = useRef(Date.now());
    const [elapsedMs, setElapsedMs] = useState(0);

    // Live timer
    useEffect(() => {
        if (finished) return;
        const timer = setInterval(() => {
            setElapsedMs(Date.now() - startTime.current);
        }, 1000);
        return () => clearInterval(timer);
    }, [finished]);

    if (!questions || questions.length === 0) return <div>Loading...</div>;

    const q = questions[qIdx];
    const currentAnswer = answersMap[qIdx];
    const answered = !!currentAnswer && !currentAnswer.isDraft;
    const isCorrect = currentAnswer?.isCorrect ?? false;
    const selectedOpt = currentAnswer?.selectedOpt ?? null;

    const handleAnswer = (val, isDraft = false) => {
        if (answered) return;
        
        let correct = false;
        if (q.type === 'multiple-choice') correct = val === q.correctAnswer;
        else if (q.type === 'color-fraction') correct = val.length === q.requiredParts;
        else if (q.type === 'split-collection') correct = val.every(g => g.length === (q.totalItems / q.groups));
        else if (q.type === 'compare-signs') correct = val === q.correctAnswer;
        else correct = val.toString().toLowerCase() === q.correctAnswer.toString().toLowerCase();
        
        setAnswersMap(prev => ({ ...prev, [qIdx]: { selectedOpt: val, isCorrect: correct, isDraft: isDraft } }));
    };

    const nextQ = () => {
        if (qIdx + 1 < questions.length) setQIdx(qIdx + 1);
        else setFinished(true);
    };
    const prevQ = () => { if (qIdx > 0) setQIdx(qIdx - 1); };

    if (finished) {
        const totalTime = Date.now() - startTime.current;
        const score = Object.values(answersMap).filter(a => a.isCorrect).length;
        const total = questions.length;
        const pct = Math.round((score / total) * 100);
        let msg = 'Keep Learning!', emoji = '💪', sub = 'Review the concepts and try again for 100%.';
        if (pct >= 90) { msg = 'Excellent!'; emoji = '🏆'; sub = 'You\'ve mastered parts and wholes!'; }
        else if (pct >= 70) { msg = 'Great Job!'; emoji = '🌟'; sub = 'You\'re almost there, keep practicing!'; }

        return (
            <div className="sau-detail-anim" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '40px 24px' }}>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#e11d48', fontWeight: 700, cursor: 'pointer', marginBottom: 16, fontSize: 14 }}>← Back to Skills</button>
                <ScoreRing score={score} total={total} color="#e11d48" />
                <div style={{ margin: '16px 0 8px', padding: '8px 24px', background: '#fff', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#64748b', fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    ⏱️ Time Taken: {fmtTime(totalTime)}
                </div>
                <div style={{ fontSize: 48, marginTop: 16 }}>{emoji}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 24px' }}>{sub}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <button onClick={onBack} style={{ padding: '12px 28px', borderRadius: 100, border: `2px solid #e11d48`, background: '#fff', color: '#e11d48', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Back to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div className="sau-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>← Exit Practice</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>⏱️</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtTime(elapsedMs)}</span>
                    </div>
                    <div style={{ fontWeight: 800, color: '#e11d48' }}>Practice {qIdx + 1}/{questions.length}</div>
                </div>
            </div>
            <QuestionCard key={qIdx} q={q} type={q.type} question={q.question} options={q.options} answer={q.correctAnswer} onAnswer={handleAnswer} disabled={answered} selectedOption={selectedOpt} image={q.image} />
            {answered && (
                <div style={{ padding: 16, borderRadius: 12, marginBottom: 20, background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}` }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', marginBottom: 6 }}>{isCorrect ? '🎉 Correct!' : '❌ Not quite!'}</div>
                    <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.5 }}>{renderFractionText(q.explanation)}</p>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {qIdx > 0 ? (
                    <button onClick={prevQ} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: `2px solid #e11d48`, background: '#fff', color: '#e11d48', cursor: 'pointer' }}>← Previous</button>
                ) : <div />}
                <button onClick={nextQ} disabled={!answered} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', background: answered ? '#e11d48' : '#e2e8f0', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'default', transition: 'all 0.2s', boxShadow: answered ? '0 4px 12px rgba(225,29,72,0.3)' : 'none' }}>
                    {qIdx + 1 === questions.length ? 'Finish →' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   ASSESS MODE
   ═══════════════════════════════════════════════════════════════ */
function AssessMode({ skill, onBack }) {
    const questions = useShuffledQuestions(skill.assessment, 20);

    const [qIdx, setQIdx] = useState(0);
    const [answersMap, setAnswersMap] = useState({});
    const [marked, setMarked] = useState({});
    const [finished, setFinished] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [expandedSolution, setExpandedSolution] = useState({});
    const startRef = useRef(Date.now());
    const qStartRef = useRef(Date.now());
    const [qTimes, setQTimes] = useState({});

    // Timer tick
    useEffect(() => {
        if (finished) return;
        const iv = setInterval(() => setElapsed(Date.now() - startRef.current), 1000);
        return () => clearInterval(iv);
    }, [finished]);

    if (!questions || questions.length === 0) return <div>Loading...</div>;

    const q = questions[qIdx];

    const handleAnswer = (val, isDraft = false) => {
        const now = Date.now();
        const timeSpent = now - qStartRef.current;
        
        let correct = false;
        if (q.type === 'multiple-choice') correct = val === q.correctAnswer;
        else if (q.type === 'color-fraction') correct = val.length === q.requiredParts;
        else if (q.type === 'split-collection') correct = val.every(g => g.length === (q.totalItems / q.groups));
        else if (q.type === 'compare-signs') correct = val === q.correctAnswer;
        else correct = val?.toString().toLowerCase() === q.correctAnswer?.toString().toLowerCase();

        setAnswersMap(prev => ({ ...prev, [qIdx]: { val, isCorrect: correct, isDraft } }));
        if (!isDraft) {
            setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + timeSpent }));
            qStartRef.current = now;
        }
    };

    const goTo = (idx) => {
        const now = Date.now();
        setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + (now - qStartRef.current) }));
        qStartRef.current = now;
        setQIdx(idx);
    };

    const toggleMark = () => setMarked(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));

    const submitAssessment = () => {
        const now = Date.now();
        setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + (now - qStartRef.current) }));
        setFinished(true);
    };

    if (finished) {
        const totalTime = Date.now() - startRef.current;
        let score = 0;
        questions.forEach((qq, i) => {
            const ansObj = answersMap[i];
            // Only count if they answered and it's not a draft
            if (ansObj !== undefined && !ansObj.isDraft) {
                if (ansObj.isCorrect) score++;
            }
        });
        const accuracy = Math.round((score / questions.length) * 100);

        return (
            <div className="sau-detail-anim" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
                {/* Header */}
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 28px' }}>
                    📊 Assessment Report
                </h1>

                {/* Stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total Score</div>
                        <div><span style={{ fontSize: 36, fontWeight: 900, color: '#e11d48' }}>{score}</span><span style={{ fontSize: 18, color: '#94a3b8', fontWeight: 700 }}> / {questions.length}</span></div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Accuracy</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: accuracy >= 70 ? '#059669' : '#dc2626' }}>{accuracy}%</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Time Taken</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#ea580c' }}>⏱️ {fmtTime(totalTime)}</div>
                    </div>
                </div>

                {/* Question Breakdown */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, margin: '0 0 16px', color: '#0f172a' }}>Detailed Breakdown</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questions.map((qq, i) => {
                        const userAnsObj = answersMap[i];
                        const skipped = userAnsObj === undefined || userAnsObj.isDraft;
                        let correct = false;
                        if (!skipped) {
                            correct = userAnsObj.isCorrect;
                        }
                        const pillColor = skipped ? '#f59e0b' : correct ? '#10b981' : '#ef4444';
                        const showSol = expandedSolution[i];

                        return (
                            <div key={i} style={{ background: '#fff', border: `1px solid ${skipped ? '#fde68a' : correct ? '#bbf7d0' : '#fecaca'}`, borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                                {/* Question header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1 }}>
                                        <span style={{ width: 28, height: 28, borderRadius: '50%', background: pillColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                                        <div>
                                            {qq.image && <div style={{ fontSize: 40, marginBottom: 12 }}>{qq.image}</div>}
                                            <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#0f172a', lineHeight: 1.5 }}>{renderFractionText(qq.question)}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                                        <div style={{ fontSize: 14, fontWeight: 800, color: skipped ? '#d97706' : correct ? '#059669' : '#dc2626', background: skipped ? '#fef3c7' : correct ? '#f0fdf4' : '#fef2f2', padding: '4px 12px', borderRadius: 100 }}>
                                            {skipped ? '⏩ Skipped' : correct ? '✅ Correct' : '❌ Wrong'}
                                        </div>
                                        <div style={{ fontSize: 13, color: '#64748b', marginTop: 6, fontWeight: 600 }}>⏱️ {qTimes[i] ? Math.round(qTimes[i] / 1000) : 0}s</div>
                                    </div>
                                </div>

                                {/* Options grid view matching the specific UI/UX required! */}
                                {qq.type === 'multiple-choice' ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                                        {qq.options.map((opt, oi) => {
                                            const letter = String.fromCharCode(65 + oi);
                                            const isUserPick = !skipped && userAnsObj.val === oi;
                                            const isCorrectOpt = oi === qq.correctAnswer;
                                            let bg = '#f8fafc', bdr = '#e2e8f0', clr = '#334155';
                                            if (isCorrectOpt) { bg = '#f0fdf4'; bdr = '#10b981'; clr = '#059669'; }
                                            else if (isUserPick && !isCorrectOpt) { bg = '#fef2f2'; bdr = '#ef4444'; clr = '#dc2626'; }
                                            
                                            return (
                                                <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2px solid ${bdr}`, background: bg, fontSize: 15, fontWeight: 700, color: clr }}>
                                                    <span style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0, background: isCorrectOpt ? '#10b981' : isUserPick ? '#ef4444' : '#e2e8f0', color: (isCorrectOpt || isUserPick) ? '#fff' : '#64748b' }}>{letter}</span>
                                                    <span style={{ flex: 1 }}>{renderFractionText(opt)}</span>
                                                    {isCorrectOpt && <span style={{ color: '#10b981', fontWeight: 900 }}>✓ Correct</span>}
                                                    {isUserPick && !isCorrectOpt && <span style={{ color: '#ef4444', fontWeight: 900 }}>Your Pick</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // Visual representation for interactive questions in Assess Review
                                    <div style={{ padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 12 }}>
                                        <div style={{ fontWeight: 700, color: '#334155', marginBottom: 8 }}>Interactive Task:</div>
                                        {skipped ? (
                                            <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>You didn't answer this interactive question.</div>
                                        ) : (
                                            <div style={{ color: correct ? '#059669' : '#dc2626', fontWeight: 600 }}>
                                                {correct ? '✓ You solved this interactive puzzle correctly!' : '❌ You did not solve this interactive puzzle correctly.'}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Check Solution toggle */}
                                {qq.explanation && (
                                    <div>
                                        <button onClick={() => setExpandedSolution(prev => ({ ...prev, [i]: !prev[i] }))} style={{ background: 'none', border: 'none', color: '#db2777', fontWeight: 800, fontSize: 14, cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                            {showSol ? '▲ Hide Solution' : '▼ Check Solution'}
                                        </button>
                                        {showSol && (
                                            <div style={{ marginTop: 12, padding: '14px 16px', background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: 12 }}>
                                                <div style={{ fontWeight: 800, color: '#9d174d', marginBottom: 6 }}>💡 Step-by-Step Logic</div>
                                                <p style={{ margin: 0, fontSize: 15, color: '#831843', lineHeight: 1.6 }}>{renderFractionText(qq.explanation)}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onBack} style={{ padding: '14px 40px', background: '#e11d48', color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(225,29,72,0.3)' }}>Back to Skills</button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="sau-detail-anim" style={{ display: 'flex', gap: 24, maxWidth: 1100, margin: '0 auto', alignItems: 'flex-start' }}>
            {/* LEFT: Question panel */}
            <div style={{ flex: '1 1 60%', background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 100, background: '#fef2f2', color: '#e11d48', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>Question {qIdx + 1}</div>

                <QuestionCard
                    key={qIdx}
                    q={q}
                    type={q.type}
                    question={q.question}
                    options={q.options}
                    answer={q.correctAnswer}
                    onAnswer={handleAnswer}
                    disabled={false} // Users can change answers in Assess mode
                    selectedOption={answersMap[qIdx]?.val ?? null}
                    image={q.image}
                    showCorrect={false}
                />

                {/* Navigation buttons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
                    <button onClick={() => goTo(Math.max(0, qIdx - 1))} disabled={qIdx === 0}
                        style={{ padding: '12px 24px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff', fontWeight: 700, fontSize: 15, color: qIdx === 0 ? '#cbd5e1' : '#334155', cursor: qIdx === 0 ? 'default' : 'pointer' }}>← Previous</button>
                    <button onClick={toggleMark}
                        style={{ padding: '12px 24px', borderRadius: 100, border: `2px solid ${marked[qIdx] ? '#f59e0b' : '#e2e8f0'}`, background: marked[qIdx] ? '#fef3c7' : '#fff', fontWeight: 700, fontSize: 15, color: marked[qIdx] ? '#92400e' : '#334155', cursor: 'pointer' }}>
                        {marked[qIdx] ? '★ Marked' : 'Mark for Review'}
                    </button>
                    <button onClick={() => goTo(Math.min(questions.length - 1, qIdx + 1))} disabled={qIdx === questions.length - 1}
                        style={{ padding: '12px 32px', borderRadius: 100, border: 'none', background: '#e11d48', fontWeight: 800, fontSize: 15, color: '#fff', cursor: qIdx === questions.length - 1 ? 'default' : 'pointer', opacity: qIdx === questions.length - 1 ? 0.5 : 1, boxShadow: qIdx === questions.length - 1 ? 'none' : '0 4px 12px rgba(225,29,72,0.3)' }}>Next →</button>
                </div>
            </div>

            {/* RIGHT: Sidebar (timer + palette) */}
            <div style={{ flex: '0 0 300px', background: '#fff', borderRadius: 24, padding: 24, position: 'sticky', top: 80, boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                {/* Timer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24, background: '#f8fafc', padding: '16px', borderRadius: 16 }}>
                    <span style={{ fontSize: 28 }}>⏱️</span>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{fmtTime(elapsed)}</span>
                </div>

                {/* Question Palette */}
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
                    {questions.map((_, i) => {
                        const isAnswered = answersMap[i] !== undefined && !answersMap[i].isDraft;
                        const isMarked = !!marked[i];
                        const isCurrent = i === qIdx;
                        let bg = '#fff', bdr = '#e2e8f0', clr = '#64748b';
                        if (isMarked) { bg = '#fef3c7'; bdr = '#f59e0b'; clr = '#92400e'; }
                        if (isAnswered) { bg = '#e11d48'; bdr = '#e11d48'; clr = '#fff'; }
                        if (isCurrent) { bdr = '#0f172a'; } // Current always has black border
                        return (
                            <button key={i} onClick={() => goTo(i)} style={{
                                width: 44, height: 44, borderRadius: 10, border: `2px solid ${bdr}`, background: bg,
                                color: clr, fontWeight: 800, fontSize: 15, cursor: 'pointer', transition: 'all 0.15s',
                                boxShadow: isCurrent ? '0 0 0 2px #0f172a' : 'none'
                            }}>{i + 1}</button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, fontSize: 14, background: '#f8fafc', padding: 16, borderRadius: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 18, height: 18, borderRadius: 6, background: '#e11d48' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Answered</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 18, height: 18, borderRadius: 6, background: '#fff', border: '2px solid #e2e8f0' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Not Answered</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 18, height: 18, borderRadius: 6, background: '#fef3c7', border: '2px solid #f59e0b' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Marked for Review</span></div>
                </div>

                {/* Submit button */}
                <button onClick={submitAssessment} style={{
                    width: '100%', padding: '16px 0', borderRadius: 14, border: 'none',
                    background: '#0f172a', color: '#fff', fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800, fontSize: 18, cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(15,23,42,0.3)', transition: 'all 0.2s',
                    textTransform: 'uppercase', letterSpacing: 1
                }}>Submit</button>
            </div >
        </div >
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function SharingAndMeasuringSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkillId, setActiveSkillId] = useState(null);
    const [skillsData, setSkillsData] = useState([]);
    useEffect(() => { setSkillsData(generateSharingSkillsData()); }, []);
    const activeSkill = skillsData.find(s => s.id === activeSkillId);

    const openMode = (skill, mode) => { setActiveSkillId(skill.id); setSkillsData(generateSharingSkillsData()); setView(mode); };

    return (
        <div className="sau-skills-page" style={{ background: '#fdf2f8', minHeight: '100vh' }}>
            <nav className="sau-nav">
                {view === 'list' ? (
                    <button className="sau-nav-back" style={{ color: '#db2777' }} onClick={() => navigate('/junior/grade/4/sharing-and-measuring')}>← Back to Sharing and Measuring</button>
                ) : (
                    <button className="sau-nav-back" style={{ color: '#db2777' }} onClick={() => setView('list')}>← Back to Skills</button>
                )}
                <div className="sau-nav-links">
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/sharing-and-measuring/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/sharing-and-measuring/terminology')}>📖 Terminology</button>
                    <button className="sau-nav-link sau-nav-link--active" style={{ background: 'linear-gradient(135deg, #9333ea, #c084fc)' }}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
                {view === 'list' && (
                    <div className="sau-detail-anim">
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>Master Fractions & Sharing</h1>
                            <p style={{ fontSize: 18, color: '#64748b', margin: 0, maxWidth: 600, marginInline: 'auto' }}>
                                Choose a skill below. Learn the logic, practice your fraction skills, and tackle the assessment!
                            </p>
                        </div>
                        <div className="sau-skills-list">
                            {skillsData.map((skill) => (
                                <div key={skill.id} className="sau-skill-card" style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    background: '#fff', borderRadius: 16, padding: '24px 32px', marginBottom: 16,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #fce7f3'
                                }}>
                                    <div className="sau-skill-info" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                                        <div className="sau-skill-icon" style={{ background: '#fdf4ff', color: '#c026d3', padding: '16px', borderRadius: '12px', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{skill.emoji}</div>
                                        <div>
                                            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{skill.title}</div>
                                            <div style={{ fontSize: 14, color: '#64748b' }}>Learn, Practice & Assessment with 20 questions each.</div>
                                        </div>
                                    </div>
                                    <div className="sau-skill-actions" style={{ display: 'flex', gap: 12 }}>
                                        <button onClick={() => openMode(skill, 'learn')}
                                            style={{ padding: '10px 20px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
                                        >📖 Learn</button>
                                        <button onClick={() => openMode(skill, 'practice')}
                                            style={{ padding: '10px 20px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
                                        >✏️ Practice</button>
                                        <button onClick={() => openMode(skill, 'assess')}
                                            style={{ padding: '10px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #9333ea, #c084fc)', border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(147,51,234,0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
                                        >🏆 Assess</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'learn' && <LearnMode skill={activeSkill} onBack={() => setView('list')} />}
                {view === 'practice' && <PracticeMode skill={activeSkill} onBack={() => setView('list')} />}
                {view === 'assess' && <AssessMode skill={activeSkill} onBack={() => setView('list')} />}
            </div>
        </div>
    );
}
