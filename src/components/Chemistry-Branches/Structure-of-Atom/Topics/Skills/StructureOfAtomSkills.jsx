import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { STRUCTURE_OF_ATOM_SKILLS } from './StructureOfAtomSkillsData.jsx';
import '../../StructureOfAtomBranch.css';
import MathRenderer from '../../../../MathRenderer';

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

const useShuffledQuestions = (sourceQuestions, amount = 15) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (!sourceQuestions) return;
        let shuffledQs = shuffleArray(sourceQuestions).slice(0, amount);

        shuffledQs = shuffledQs.map(q => {
            if (q.type === 'mcq') {
                const originalCorrectOption = q.options[q.answer];
                const shuffledOptions = shuffleArray(q.options);
                const newCorrectAnswerIndex = shuffledOptions.indexOf(originalCorrectOption);
                return {
                    ...q,
                    options: shuffledOptions,
                    answer: newCorrectAnswerIndex
                };
            }
            return q;
        });
        setQuestions(shuffledQs);
    }, [sourceQuestions, amount]);

    return questions;
};

/* ═══════════════════════════════════════════════════════════════
   QUESTION CARD  (A, B, C, D style)
   ═══════════════════════════════════════════════════════════════ */
function QuestionCard({ question, options, answer, onAnswer, disabled, selectedOption, showCorrect = true }) {
    const letter = (i) => String.fromCharCode(65 + i);

    return (
        <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, lineHeight: 1.6 }}>
                <MathRenderer text={question} />
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
                {options.map((opt, i) => {
                    let bg = '#fff';
                    let bdr = '#e2e8f0';
                    let clr = '#0f172a';

                    if (disabled && showCorrect) {
                        if (i === answer) { bg = '#f0fdf4'; bdr = '#10b981'; }
                        else if (i === selectedOption) { bg = '#fef2f2'; bdr = '#ef4444'; }
                        else { clr = '#94a3b8'; }
                    } else if (disabled && !showCorrect) {
                        if (i === selectedOption) { bg = '#eff6ff'; bdr = '#3b82f6'; }
                    } else if (i === selectedOption) {
                        bg = 'rgba(79, 70, 229, 0.05)';
                        bdr = 'var(--atom-indigo, #6366f1)';
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
                                background: i === selectedOption ? (showCorrect ? (i === answer ? '#10b981' : '#ef4444') : 'var(--atom-indigo, #6366f1)') : '#f1f5f9',
                                color: i === selectedOption ? '#fff' : '#64748b'
                            }}>{letter(i)}</span>
                            <MathRenderer text={opt} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   SCORE RING
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
    const [activeIdx, setActiveIdx] = useState(0);
    const sec = skill.learnSections && skill.learnSections[activeIdx];

    const renderCardContent = (sec, idx) => {
        if (!sec) return null;
        const topColors = ['#2563eb', '#f59e0b', '#10b981', '#7c3aed', '#ec4899', '#0d9488'];
        const cardColor = topColors[idx % topColors.length] || skill.color;

        let keyIcon = '💡', keyTitle = 'Key Fact:', keyBg = '#f8fafc', keyBorder = '#cbd5e1', keyColor = '#0f172a';
        if (sec?.keyLabel === 'neet-trap') { keyIcon = '⚠️'; keyTitle = 'NEET Trap:'; keyBg = '#fff1f2'; keyBorder = '#f43f5e'; keyColor = '#9f1239'; }
        else if (sec?.keyLabel === 'misconception') { keyIcon = '⚠️'; keyTitle = 'Classic NEET Misconception:'; keyBg = '#fffbeb'; keyBorder = '#fbbf24'; keyColor = '#92400e'; }
        else if (sec?.keyLabel === 'neet-note') { keyIcon = '📌'; keyTitle = 'NEET Note:'; keyBg = '#f0fdf4'; keyBorder = '#10b981'; keyColor = '#065f46'; }

        // Split heading if it has a dash for small caps + serif styling
        const headingParts = sec.heading.split('—').map(s => s.trim());
        const smallCaps = headingParts.length > 1 ? headingParts[0] : `Topic ${idx + 1}`;
        const mainHeading = headingParts.length > 1 ? headingParts[1] : sec.heading;

        return (
            <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 10px 40px rgba(0,0,0,0.06)', borderTop: `8px solid ${cardColor}`, display: 'flex', flexDirection: 'column', gap: 20, borderLeft: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                    {sec.icon && <div style={{ fontSize: 40 }}>{sec.icon}</div>}
                    <div>
                        <div style={{ textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: 13, fontWeight: 800, color: cardColor, marginBottom: 6 }}>{smallCaps}</div>
                        <h3 style={{ fontFamily: '"Playfair Display", "Merriweather", serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>{mainHeading}</h3>
                    </div>
                </div>

                {/* Styled Content */}
                {sec?.content && (() => {
                    const blocks = sec.content.split('\n\n');
                    return blocks.map((block, bi) => {
                        const lines = block.split('\n');
                        return (
                            <div key={bi} style={{ marginBottom: 16 }}>
                                {lines.map((line, li) => {
                                    let t = line.trim();
                                    if (!t) return null;
                                    t = t.replace(/_([a-zA-Z0-9]+)/g, '<sub>$1</sub>');
                                    
                                    
                                    if ((t.endsWith(':') || t.endsWith('):')) && t.length < 100) {
                                        return <h4 key={li} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 19, fontWeight: 800, color: '#1e293b', margin: '20px 0 10px', letterSpacing: '-0.3px', borderBottom: `2px solid ${cardColor}20`, paddingBottom: 6, display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: t }}></h4>;
                                    }
                                    if (t.startsWith('•') && (t.includes('=') || t.includes('→') || t.includes('⇒') || t.includes(':'))) {
                                        let cleanT = t.slice(1).trim();
                                        
                                        // Convert fractions FIRST before font splitting: X/Y → vertical fraction
                                        const fractionRx = /((?:[^\s<>\/()]|<[^>]*>)+)\/((?:[^\s<>,;.\/()]|<[^>]*>)+)/g;
                                        const fractionRepl = '<span style="display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; margin:0 3px; line-height:1.1; font-size:0.85em;"><span style="border-bottom:1.5px solid currentColor; padding:0 4px 2px;">$1</span><span style="padding:2px 4px 0;">$2</span></span>';
                                        cleanT = cleanT.replace(fractionRx, fractionRepl);

                                        // Determine separator to split by (prioritize =, then :)
                                        // But DO NOT split on '=' if it's inside an HTML tag (like style="...")
                                        let sep = '';
                                        // Regex to find '=' or ':' that is NOT inside an HTML tag <...>
                                        const match = cleanT.match(/(?![^<]*>)([=;:])/);
                                        
                                        if (match) {
                                            sep = match[1];
                                            // Ensure we don't accidentally match the ; from an HTML entity if it's standard text
                                            if (sep === ';' && !cleanT.includes('=')) sep = ''; 
                                            // Restrict to just = or : for our formatting rule
                                            if (sep !== '=' && sep !== ':') sep = '';
                                        }

                                        let contentHTML;
                                        if (sep) {
                                            // Split by the FIRST occurrence of the valid separator
                                            // The safest way is to split on the exact match we found:
                                            const exactMatchIndex = cleanT.match(/(?![^<]*>)([=:])/)?.index;
                                            
                                            if (exactMatchIndex !== undefined) {
                                                const left = cleanT.substring(0, exactMatchIndex).trim();
                                                const right = cleanT.substring(exactMatchIndex + 1).trim();
                                                contentHTML = `<span style="font-family: 'Outfit', sans-serif;">${left}</span> <span style="font-family: 'Courier New', monospace;">${sep} ${right}</span>`;
                                            } else {
                                                contentHTML = `<span style="font-family: 'Courier New', monospace;">${cleanT}</span>`;
                                            }
                                        } else {
                                            // Fallback for → or ⇒ without = or : (keep as monospace or choose one)
                                            contentHTML = `<span style="font-family: 'Courier New', monospace;">${cleanT}</span>`;
                                        }

                                        return (
                                            <div key={li} style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '16px 0' }}>
                                                <div style={{ padding: '14px 36px', background: '#f8fafc', borderRadius: 12, fontSize: 17, fontWeight: 800, color: cardColor, border: '2px solid #e2e8f0', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}
                                                   dangerouslySetInnerHTML={{ __html: contentHTML }}
                                                >
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (t.startsWith('•')) {
                                        return (
                                            <div key={li} style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 16, color: '#475569', lineHeight: 1.6 }}>
                                                <span style={{ color: cardColor, fontWeight: 900, fontSize: 20, lineHeight: '1.4' }}>•</span>
                                                <span dangerouslySetInnerHTML={{ __html: t.slice(1).trim() }}></span>
                                            </div>
                                        );
                                    }
                                    return <p key={li} style={{ margin: '0 0 10px', fontSize: 16, color: '#475569', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t }}></p>;
                                })}
                            </div>
                        );
                    });
                })()}

                {sec?.table && (
                    <div style={{ overflowX: 'auto', margin: '20px 0', width: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <thead>
                                <tr>
                                    {sec.table.headers.map((h, hi) => (
                                        <th key={hi} style={{ padding: '14px 18px', textAlign: 'left', background: `${cardColor}15`, color: cardColor, fontWeight: 800, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', borderBottom: `2px solid ${cardColor}40` }} dangerouslySetInnerHTML={{ __html: h }}></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sec.table.rows.map((row, ri) => (
                                    <tr key={ri} style={{ borderBottom: '1px solid #f1f5f9', background: ri % 2 === 0 ? '#fff' : '#f8fafc' }}>
                                        {row.map((cell, ci) => (
                                            <td key={ci} style={{ padding: '14px 18px', color: ci === 0 ? '#0f172a' : '#475569', fontWeight: ci === 0 ? 700 : 400 }} dangerouslySetInnerHTML={{ __html: cell }}></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {sec?.example && (
                    <div style={{ background: keyBg, borderLeft: `5px solid ${keyBorder}`, padding: '20px 24px', borderRadius: '0 12px 12px 0', marginTop: 'auto' }}>
                        <div style={{ fontWeight: 800, fontSize: 15, color: keyColor, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 18 }}>{keyIcon}</span> {keyTitle}
                        </div>
                        <p style={{ margin: 0, fontSize: 15, color: keyColor, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: sec.example }}></p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
            <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: 24 }}>← Back to Skills</button>

            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                {/* LEFT SIDEBAR */}
                <div style={{ flex: '0 0 300px', position: 'sticky', top: 80 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '0 12px' }}>
                        <div style={{ fontSize: 36 }}>{skill.icon}</div>
                        <h2 style={{ fontFamily: '"Playfair Display", "Merriweather", serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px', lineHeight: 1.2 }}>{skill.title}</h2>
                    </div>
                    
                    <div style={{ background: '#fff', borderRadius: 20, padding: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
                        {skill.learnSections && skill.learnSections.map((s, i) => {
                            const active = i === activeIdx;
                            const topColors = ['#2563eb', '#f59e0b', '#10b981', '#7c3aed', '#ec4899', '#0d9488'];
                            const itemColor = active ? topColors[i % topColors.length] : '#f8fafc';
                            const textColor = active ? '#fff' : '#475569';
                            return (
                                <button key={i} onClick={() => setActiveIdx(i)} style={{
                                    width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 12,
                                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                    background: itemColor,
                                    color: textColor,
                                    fontWeight: active ? 800 : 600, fontSize: 15,
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    marginBottom: i === skill.learnSections.length - 1 ? 0 : 6,
                                    boxShadow: active ? `0 4px 12px ${itemColor}40` : 'none'
                                }}>
                                    <span style={{ fontSize: 18, opacity: active ? 1 : 0.6 }}>{s.icon || '📄'}</span>
                                    <span style={{ lineHeight: 1.3 }}>{s.heading.split('—')[0].trim()}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT CONTENT PANEL */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {renderCardContent(sec, activeIdx)}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <button onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))} disabled={activeIdx === 0}
                            style={{ padding: '14px 28px', borderRadius: 100, border: `2px solid ${activeIdx === 0 ? '#e2e8f0' : skill.color}`, background: '#fff', color: activeIdx === 0 ? '#cbd5e1' : skill.color, fontWeight: 800, fontSize: 15, cursor: activeIdx === 0 ? 'default' : 'pointer', transition: 'all 0.2s' }}>← Previous</button>
                        
                        {activeIdx < skill.learnSections.length - 1 ? (
                            <button onClick={() => setActiveIdx(activeIdx + 1)}
                                style={{ padding: '14px 32px', borderRadius: 100, border: 'none', background: skill.color, color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}40`, transition: 'all 0.2s' }}>Next Topic →</button>
                        ) : (
                            <button onClick={onBack}
                                style={{ padding: '14px 32px', borderRadius: 100, border: 'none', background: '#10b981', color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: `0 4px 14px #10b98140`, transition: 'all 0.2s' }}>Got it! ✓</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PRACTICE MODE
   ═══════════════════════════════════════════════════════════════ */
function PracticeMode({ skill, onBack, onAssess }) {
    const questions = useShuffledQuestions(skill.practice, skill.practice.length);

    const [qIdx, setQIdx] = useState(0);
    const [answersMap, setAnswersMap] = useState({});
    const [finished, setFinished] = useState(false);
    const startTime = useRef(Date.now());

    if (!questions || questions.length === 0) return <div>Loading...</div>;

    const q = questions[qIdx];
    const currentAnswer = answersMap[qIdx];
    const answered = !!currentAnswer;
    const isCorrect = currentAnswer?.isCorrect ?? false;
    const selectedOpt = currentAnswer?.selectedOpt ?? null;

    const handleAnswer = (val) => {
        if (answered) return;
        const correct = val === q.answer;
        setAnswersMap(prev => ({ ...prev, [qIdx]: { selectedOpt: val, isCorrect: correct } }));
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
        if (pct >= 90) { msg = 'Excellent!'; emoji = '🏆'; sub = 'You\'ve mastered this skill!'; }
        else if (pct >= 70) { msg = 'Great Job!'; emoji = '🌟'; sub = 'You\'re almost there, keep going!'; }

        return (
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '40px 24px', background: '#fff', borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--atom-indigo, #6366f1)', fontWeight: 700, cursor: 'pointer', marginBottom: 16, fontSize: 14 }}>← Back to Skills</button>
                <ScoreRing score={score} total={total} color={skill.color} />
                <div style={{ margin: '16px 0 8px', padding: '8px 24px', background: '#f8fafc', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#64748b', fontSize: 14 }}>
                    ⏱️ Time Taken: {fmtTime(totalTime)}
                </div>
                <div style={{ fontSize: 48, marginTop: 16 }}>{emoji}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 24px' }}>{sub}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <button onClick={onBack} style={{ padding: '12px 28px', borderRadius: 100, border: `2px solid ${skill.color}`, background: '#fff', color: skill.color, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Back to Skills</button>
                    <button onClick={onAssess} style={{ padding: '12px 28px', borderRadius: 100, border: 'none', background: skill.color, color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}40` }}>Take Assessment 🏆</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>← Exit Practice</button>
                <div style={{ fontWeight: 800, color: skill.color }}>Practice {qIdx + 1}/{questions.length}</div>
            </div>
            <QuestionCard key={qIdx} question={q.question} options={q.options} answer={q.answer} onAnswer={handleAnswer} disabled={answered} selectedOption={selectedOpt} />
            {answered && (
                <div style={{ padding: 16, borderRadius: 12, marginBottom: 20, background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}` }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', marginBottom: 6 }}>{isCorrect ? '🎉 Correct!' : '❌ Not quite!'}</div>
                    <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.5 }}><MathRenderer text={q.explanation} /></p>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {qIdx > 0 ? (
                    <button onClick={prevQ} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: `2px solid ${skill.color}`, background: '#fff', color: skill.color, cursor: 'pointer' }}>← Previous</button>
                ) : <div />}
                <button onClick={nextQ} disabled={!answered} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', background: answered ? skill.color : '#e2e8f0', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'default', transition: 'all 0.2s' }}>
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
    const questions = useShuffledQuestions(skill.assess, skill.assess.length);

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

    const handleAnswer = (val) => {
        const now = Date.now();
        const timeSpent = now - qStartRef.current;
        setAnswersMap(prev => ({ ...prev, [qIdx]: val }));
        setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + timeSpent }));
        qStartRef.current = now;
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
            const ans = answersMap[i];
            if (ans !== undefined && ans === qq.answer) score++;
        });
        const accuracy = Math.round((score / questions.length) * 100);

        return (
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px', background: '#fff', borderRadius: 24 }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 28px' }}>
                    📊 Assessment Report
                </h1>

                {/* Stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total Score</div>
                        <div><span style={{ fontSize: 36, fontWeight: 900, color: skill.color }}>{score}</span><span style={{ fontSize: 18, color: '#94a3b8', fontWeight: 700 }}> / {questions.length}</span></div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Accuracy</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: accuracy >= 70 ? '#059669' : '#dc2626' }}>{accuracy}%</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Time Taken</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#d97706' }}>⏱️ {fmtTime(totalTime)}</div>
                    </div>
                </div>

                {/* Question Breakdown */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, margin: '0 0 16px', color: '#0f172a' }}>Question Breakdown</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questions.map((qq, i) => {
                        const userAns = answersMap[i];
                        const skipped = userAns === undefined;
                        const correct = !skipped && userAns === qq.answer;
                        const pillColor = skipped ? '#f59e0b' : correct ? '#10b981' : '#ef4444';
                        const showSol = expandedSolution[i];

                        return (
                            <div key={i} style={{ background: '#fff', border: `1px solid ${skipped ? '#fde68a' : correct ? '#bbf7d0' : '#fecaca'}`, borderRadius: 16, padding: '20px 24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1 }}>
                                        <span style={{ width: 28, height: 28, borderRadius: '50%', background: pillColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0f172a', lineHeight: 1.5 }}>
                                            <MathRenderer text={qq.question} />
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: skipped ? '#d97706' : correct ? '#059669' : '#dc2626' }}>
                                            {skipped ? '⏩ Skipped' : correct ? '✅ Correct' : '❌ Wrong'}
                                        </div>
                                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>⏱️ {qTimes[i] ? Math.round(qTimes[i] / 1000) : 0}s</div>
                                    </div>
                                </div>

                                {/* Options grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                                    {qq.options.map((opt, oi) => {
                                        const letter = String.fromCharCode(65 + oi);
                                        const isUserPick = userAns === oi;
                                        const isCorrectOpt = oi === qq.answer;
                                        let bg = '#f8fafc', bdr = '#e2e8f0', clr = '#334155';
                                        if (isCorrectOpt) { bg = '#f0fdf4'; bdr = '#10b981'; }
                                        else if (isUserPick && !isCorrectOpt) { bg = '#fef2f2'; bdr = '#ef4444'; }
                                        return (
                                            <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: `2px solid ${bdr}`, background: bg, fontSize: 14, fontWeight: 600, color: clr }}>
                                                <span style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0, background: isCorrectOpt ? '#10b981' : isUserPick ? '#ef4444' : '#e2e8f0', color: (isCorrectOpt || isUserPick) ? '#fff' : '#64748b' }}>{letter}</span>
                                                <span style={{ flex: 1 }}><MathRenderer text={opt} /></span>
                                                {isCorrectOpt && <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>}
                                                {isUserPick && !isCorrectOpt && <span style={{ color: '#ef4444', fontWeight: 800 }}>✗</span>}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Check Solution toggle */}
                                {qq.explanation && (
                                    <div>
                                        <button onClick={() => setExpandedSolution(prev => ({ ...prev, [i]: !prev[i] }))} style={{ background: 'none', border: 'none', color: 'var(--atom-indigo, #6366f1)', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0 }}>
                                            {showSol ? '∧ Hide Solution' : '∨ Check Solution'}
                                        </button>
                                        {showSol && (
                                            <div style={{ marginTop: 8, padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12 }}>
                                                <div style={{ fontWeight: 700, color: 'var(--atom-indigo, #6366f1)', marginBottom: 4 }}>💡 Step-by-Step Logic</div>
                                                <p style={{ margin: 0, fontSize: 14, color: '#334155', lineHeight: 1.6 }}><MathRenderer text={qq.explanation} /></p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onBack} style={{ padding: '14px 40px', background: skill.color, color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}40` }}>Back to Skills</button>
                </div>
            </div>
        );
    }

    const currentAnswered = answersMap[qIdx] !== undefined;

    return (
        <div style={{ display: 'flex', gap: 24, maxWidth: 1100, margin: '0 auto', alignItems: 'flex-start' }}>
            {/* LEFT: Question panel */}
            <div style={{ flex: '1 1 60%', background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, border: '2px solid #0f172a', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Question {qIdx + 1}</div>

                <QuestionCard
                    key={qIdx}
                    question={q.question}
                    options={q.options}
                    answer={q.answer}
                    onAnswer={handleAnswer}
                    disabled={false}
                    selectedOption={answersMap[qIdx] ?? null}
                    showCorrect={false}
                />

                {/* Navigation buttons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
                    <button onClick={() => goTo(Math.max(0, qIdx - 1))} disabled={qIdx === 0}
                        style={{ padding: '10px 24px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff', fontWeight: 700, fontSize: 14, color: qIdx === 0 ? '#cbd5e1' : '#334155', cursor: qIdx === 0 ? 'default' : 'pointer' }}>← Previous</button>
                    <button onClick={toggleMark}
                        style={{ padding: '10px 24px', borderRadius: 100, border: `2px solid ${marked[qIdx] ? '#f59e0b' : '#e2e8f0'}`, background: marked[qIdx] ? '#fef3c7' : '#fff', fontWeight: 700, fontSize: 14, color: marked[qIdx] ? '#92400e' : '#334155', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {marked[qIdx] ? '★ Marked' : 'Mark for Review'}
                    </button>
                    <button onClick={() => goTo(Math.min(questions.length - 1, qIdx + 1))} disabled={qIdx === questions.length - 1}
                        style={{ padding: '10px 24px', borderRadius: 100, border: 'none', background: 'var(--atom-indigo, #6366f1)', fontWeight: 700, fontSize: 14, color: '#fff', cursor: qIdx === questions.length - 1 ? 'default' : 'pointer', opacity: qIdx === questions.length - 1 ? 0.5 : 1, transition: 'all 0.2s' }}>Next →</button>
                </div>
            </div>

            {/* RIGHT: Sidebar (timer + palette) */}
            <div style={{ flex: '0 0 280px', background: '#f8fafc', borderRadius: 24, padding: 24, position: 'sticky', top: 80, border: '1px solid #e2e8f0' }}>
                {/* Timer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 28 }}>⏱️</span>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{fmtTime(elapsed)}</span>
                </div>

                {/* Question Palette */}
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
                    {questions.map((_, i) => {
                        const isAnswered = answersMap[i] !== undefined;
                        const isMarked = !!marked[i];
                        const isCurrent = i === qIdx;
                        let bg = '#fff', bdr = '#e2e8f0', clr = '#64748b';
                        if (isMarked) { bg = '#fef3c7'; bdr = '#f59e0b'; clr = '#92400e'; }
                        if (isAnswered) { bg = 'var(--atom-indigo, #6366f1)'; bdr = 'var(--atom-indigo, #6366f1)'; clr = '#fff'; }
                        if (isCurrent) { bdr = '#0f172a'; }
                        return (
                            <button key={i} onClick={() => goTo(i)} style={{
                                width: 40, height: 40, borderRadius: 8, border: `2px solid ${bdr}`, background: bg,
                                color: clr, fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'all 0.15s',
                                boxShadow: isCurrent ? '0 0 0 2px #0f172a' : 'none'
                            }}>{i + 1}</button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--atom-indigo, #6366f1)' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Answered</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: '2px solid #e2e8f0' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Not Answered</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: '#fef3c7', border: '2px solid #f59e0b' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Marked for Review</span></div>
                </div>

                {/* Submit button */}
                <button onClick={submitAssessment} style={{
                    width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
                    background: '#ef4444', color: '#fff', fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800, fontSize: 16, cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(239,68,68,0.35)', transition: 'all 0.2s'
                }}>Submit Assessment</button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function StructureOfAtomSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkillId, setActiveSkillId] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const activeSkill = STRUCTURE_OF_ATOM_SKILLS.find(s => s.id === activeSkillId);

    const openMode = (skill, mode) => {
        setActiveSkillId(skill.id);
        setView(mode);
    };

    return (
        <div className="atom-page">
            <nav className="atom-nav">
                {view === 'list' ? (
                    <button className="atom-nav-back" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom')}>← Back to Dashboard</button>
                ) : (
                    <button className="atom-nav-back" onClick={() => setView('list')}>← Back to Skills</button>
                )}
                <div className="atom-nav-links">
                    <button className="atom-nav-link" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/introduction')}>🌟 Intro</button>
                    <button className="atom-nav-link" onClick={() => navigate('/senior/grade/11/chemistry/structure-of-atom/terminology')}>📖 Terminology</button>
                    <button className="atom-nav-link active" onClick={() => setView('list')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
                {view === 'list' && (
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>Core <span style={{ color: 'var(--atom-indigo, #6366f1)' }}>Skills</span></h1>
                            <p style={{ fontSize: 18, color: '#64748b', margin: 0, maxWidth: 600, marginInline: 'auto' }}>
                                Choose a skill below. Read the lesson, practice to build confidence, and take the assessment to earn your mastery!
                            </p>
                        </div>
                        <div className="atom-skills-grid">
                            {STRUCTURE_OF_ATOM_SKILLS.map((skill) => (
                                <div key={skill.id} className="atom-skill-card" style={{ '--skill-color': skill.color }}>
                                    <div className="atom-skill-icon" style={{ background: `${skill.color}15`, color: skill.color }}>{skill.icon}</div>
                                    <div className="atom-skill-info">
                                        <div className="atom-skill-title">{skill.title}</div>
                                        <div className="atom-skill-desc">{skill.desc}</div>
                                    </div>
                                    <div className="atom-skill-actions">
                                        <button onClick={() => openMode(skill, 'learn')} className="atom-btn atom-btn-outline">📖 Learn</button>
                                        <button onClick={() => openMode(skill, 'practice')} className="atom-btn atom-btn-outline">✏️ Practice</button>
                                        <button onClick={() => openMode(skill, 'assess')} className="atom-btn atom-btn-filled" style={{ '--skill-color': skill.color }}>🏆 Assess</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'learn' && <LearnMode skill={activeSkill} onBack={() => setView('list')} />}
                {view === 'practice' && <PracticeMode skill={activeSkill} onBack={() => setView('list')} onAssess={() => openMode(activeSkill, 'assess')} />}
                {view === 'assess' && <AssessMode skill={activeSkill} onBack={() => setView('list')} />}
            </div>
        </div>
    );
}
