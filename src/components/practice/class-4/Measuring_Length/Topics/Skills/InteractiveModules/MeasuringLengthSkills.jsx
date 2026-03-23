import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKILLS, LEARN_CONTENT, generatePracticeQs } from '../skillsData';
import '../../../measuring-length.css';

/* ═══════════════════════════════════════════════════════════════
   QUESTION TYPE COMPONENTS
   ─────────────────────────────────────────────────────────────
   Each component:
   • NO internal Check button — parent controls checking
   • Calls onHasInput(true/false) whenever input state changes
   • Accepts checkTrigger (increments when parent wants to check)
   • On check: evaluates answer, calls onAnswer(correct, savedState)
   • Accepts saved prop to restore state when navigating back
   ═══════════════════════════════════════════════════════════════ */

function ResultFeedback({ result, expl, correctAnswer }) {
    if (!result) return null;
    if (result === 'correct') {
        return (
            <div style={{ background: '#dcfce7', padding: '20px 24px', borderRadius: 16, marginTop: 24, textAlign: 'center', border: '2px solid #bbf7d0' }}>
                <h4 style={{ color: '#166534', margin: '0 0 8px 0', fontSize: 20, fontWeight: 900 }}>Awesome! You got it right! 🎉</h4>
                <p style={{ color: '#15803d', margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.5 }}>{expl}</p>
            </div>
        );
    }
    return (
        <div style={{ background: '#fee2e2', padding: '20px 24px', borderRadius: 16, marginTop: 24, textAlign: 'center', border: '2px solid #fecaca' }}>
            <h4 style={{ color: '#991b1b', margin: '0 0 8px 0', fontSize: 20, fontWeight: 900 }}>Not quite! Let's review. 🤔</h4>
            <p style={{ color: '#b91c1c', margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.5 }}>
                {correctAnswer && <span style={{ display: 'block', marginBottom: 8 }}>The correct answer is <strong>{correctAnswer}</strong>.</span>}
                {expl}
            </p>
        </div>
    );
}

// ── EVALUATION HELPER ──
const evaluateAnswer = (type, data, state) => {
    if (!state) return false;
    switch (type) {
        case 'visual_count': return parseInt(state.userAns) === data.answer;
        case 'fill_blank': return parseInt(state.ans1) === data.answer && (!data.twoAnswers || parseInt(state.ans2) === data.answer2);
        case 'mcq': return state.picked === data.ans;
        case 'true_false': return state.picked === data.correct;
        case 'picture_problem': return parseInt(state.userAns) === data.answer;
        case 'split_builder': return parseInt(state.userAns) === data.answer;
        case 'group_maker': return parseInt(state.userGroups) === data.answer && parseInt(state.userRem) === data.remainder;
    }
    return false;
};

// ── VISUAL COUNT ──
function VisualCountQ({ data, color, onHasInput, onAnswer, checkTrigger, saved, isAssessment }) {
    const [userAns, setUserAns] = useState(saved?.userAns || '');
    const [result, setResult] = useState(saved?.result || null);
    const checkedRef = useRef(false);

    const rows = [];
    for (let r = 0; r < data.rows; r++) {
        const items = [];
        for (let c = 0; c < data.perRow; c++) items.push(<span key={c} style={{ fontSize: 18, animation: saved ? 'none' : `tmBounceIn 0.3s ${(r * data.perRow + c) * 0.03}s both` }}>{data.emoji}</span>);
        rows.push(<div key={r} style={{ display: 'flex', gap: 3, padding: '4px 8px', background: `${color}08`, borderRadius: 10, marginBottom: 4 }}>{items}</div>);
    }

    useEffect(() => { onHasInput(userAns.trim() !== ''); }, [userAns]);
    useEffect(() => {
        if (checkTrigger > 0 && !checkedRef.current && !result) {
            checkedRef.current = true;
            const correct = parseInt(userAns) === data.answer;
            const r = correct ? 'correct' : 'wrong';
            setResult(r);
            onAnswer(correct, { userAns, result: r });
        }
    }, [checkTrigger]);

    return (
        <div>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>{data.q}</p>
            <div style={{ background: '#fafafa', borderRadius: 20, padding: 16, marginBottom: 16, border: '1px solid #f1f5f9', maxHeight: 200, overflowY: 'auto' }}>{rows}</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input type="number" value={userAns} onChange={e => { setUserAns(e.target.value); }} disabled={!!result && !isAssessment}
                    placeholder="Count & type..." style={{ width: 160, padding: '12px 18px', borderRadius: 14, fontSize: 20, fontWeight: 700, border: `2px solid ${result && !isAssessment ? (result === 'correct' ? '#10b981' : '#ef4444') : '#e2e8f0'}`, outline: 'none', fontFamily: 'Outfit, sans-serif', background: result && !isAssessment ? (result === 'correct' ? '#f0fdf4' : '#fef2f2') : '#fff' }} />
                {!isAssessment && result === 'correct' && <span style={{ fontSize: 32 }}>🎉</span>}
                {!isAssessment && result === 'wrong' && <span style={{ fontSize: 32 }}>😢</span>}
            </div>
            {!isAssessment && <ResultFeedback result={result} expl={data.expl} correctAnswer={data.answer} />}
        </div>
    );
}

// ── FILL BLANK ──
function FillBlankQ({ data, color, onHasInput, onAnswer, checkTrigger, saved, isAssessment }) {
    const [ans1, setAns1] = useState(saved?.ans1 || '');
    const [ans2, setAns2] = useState(saved?.ans2 || '');
    const [result, setResult] = useState(saved?.result || null);
    const checkedRef = useRef(false);

    useEffect(() => {
        const has = data.twoAnswers ? (ans1.trim() !== '' && ans2.trim() !== '') : (ans1.trim() !== '');
        onHasInput(has);
    }, [ans1, ans2]);

    useEffect(() => {
        if (checkTrigger > 0 && !checkedRef.current && !result) {
            checkedRef.current = true;
            let correct;
            if (data.twoAnswers) { correct = parseInt(ans1) === data.answer && parseInt(ans2) === data.answer2; }
            else { correct = parseInt(ans1) === data.answer; }
            const r = correct ? 'correct' : 'wrong';
            setResult(r);
            onAnswer(correct, { ans1, ans2, result: r });
        }
    }, [checkTrigger]);

    return (
        <div>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', lineHeight: 1.5, marginBottom: 20 }}>{data.q.replace('___', '▢')}</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="number" value={ans1} onChange={e => setAns1(e.target.value)} disabled={!!result && !isAssessment} style={{ width: 100, padding: '10px 14px', borderRadius: 12, fontSize: 22, fontWeight: 900, border: `2px solid ${result && !isAssessment ? (result === 'correct' ? '#10b981' : '#ef4444') : '#e2e8f0'}`, outline: 'none', fontFamily: 'Outfit, sans-serif', textAlign: 'center' }} />
                    {data.twoAnswers && <span style={{ fontSize: 18, fontWeight: 700, color: '#64748b' }}>R</span>}
                    {data.twoAnswers && <input type="number" value={ans2} onChange={e => setAns2(e.target.value)} disabled={!!result && !isAssessment} style={{ width: 80, padding: '10px 14px', borderRadius: 12, fontSize: 22, fontWeight: 900, border: `2px solid ${result && !isAssessment ? (result === 'correct' ? '#10b981' : '#ef4444') : '#e2e8f0'}`, outline: 'none', fontFamily: 'Outfit, sans-serif', textAlign: 'center' }} />}
                </div>
                {!isAssessment && result === 'correct' && <span style={{ fontSize: 28 }}>🎉</span>}
                {!isAssessment && result === 'wrong' && <span style={{ fontSize: 28 }}>😢</span>}
            </div>
            {!isAssessment && <ResultFeedback result={result} expl={data.expl} correctAnswer={data.twoAnswers ? `${data.answer} remainder ${data.answer2}` : data.answer} />}
        </div>
    );
}

// ── TRUE/FALSE ──
function TrueFalseQ({ data, color, onHasInput, onAnswer, checkTrigger, saved, isAssessment }) {
    const [picked, setPicked] = useState(saved?.picked ?? null);
    const [result, setResult] = useState(saved?.result || null);
    const checkedRef = useRef(false);

    useEffect(() => { onHasInput(picked !== null, { picked }); }, [picked]);
    useEffect(() => {
        if (checkTrigger > 0 && !checkedRef.current && !result && picked !== null && !isAssessment) {
            checkedRef.current = true;
            const correct = picked === data.correct;
            const r = correct ? 'correct' : 'wrong';
            setResult(r);
            onAnswer(correct, { picked, result: r });
        }
    }, [checkTrigger]);

    const pick = (val) => { if (!result || isAssessment) setPicked(val); };

    return (
        <div>
            <div style={{ background: '#f8fafc', borderRadius: 20, padding: '20px 24px', marginBottom: 20, border: '1px solid #f1f5f9', textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 10px', lineHeight: 1.4 }}>{data.statement}</p>
                {data.visual && <div style={{ fontSize: 16, color: '#64748b', fontWeight: 600 }}>{data.visual}</div>}
            </div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 16 }}>
                {(() => {
                    let bg = '#fff', bdr = '#e2e8f0';
                    if (picked === true && !result) { bg = `${color}08`; bdr = color; }
                    if (result && !isAssessment) {
                        if (data.correct === true) { bg = '#dcfce7'; bdr = '#22c55e'; }
                        else if (picked === true) { bg = '#fee2e2'; bdr = '#ef4444'; }
                    }
                    return (
                        <button onClick={() => pick(true)} disabled={!!result && !isAssessment} style={{ flex: 1, padding: '20px', borderRadius: 20, border: `3px solid ${bdr}`, background: bg, cursor: result && !isAssessment ? 'default' : 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontSize: 32 }}>✅</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: '#16a34a', marginTop: 6 }}>TRUE</div>
                        </button>
                    );
                })()}
                {(() => {
                    let bg = '#fff', bdr = '#e2e8f0';
                    if (picked === false && !result) { bg = `${color}08`; bdr = color; }
                    if (result && !isAssessment) {
                        if (data.correct === false) { bg = '#dcfce7'; bdr = '#22c55e'; }
                        else if (picked === false) { bg = '#fee2e2'; bdr = '#ef4444'; }
                    }
                    return (
                        <button onClick={() => pick(false)} disabled={!!result && !isAssessment} style={{ flex: 1, padding: '20px', borderRadius: 20, border: `3px solid ${bdr}`, background: bg, cursor: result && !isAssessment ? 'default' : 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontSize: 32 }}>❌</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: '#dc2626', marginTop: 6 }}>FALSE</div>
                        </button>
                    );
                })()}
            </div>
            {!isAssessment && <ResultFeedback result={result} expl={data.expl} correctAnswer={data.correct ? 'TRUE' : 'FALSE'} />}
        </div>
    );
}

// ── MCQ ──
function McqQ({ data, color, onHasInput, onAnswer, checkTrigger, saved, isAssessment }) {
    const [picked, setPicked] = useState(saved?.picked ?? null);
    const [result, setResult] = useState(saved?.result || null);
    const checkedRef = useRef(false);

    useEffect(() => { onHasInput(picked !== null, { picked }); }, [picked]);
    useEffect(() => {
        if (checkTrigger > 0 && !checkedRef.current && !result && picked !== null && !isAssessment) {
            checkedRef.current = true;
            const correct = picked === data.ans;
            const r = correct ? 'correct' : 'wrong';
            setResult(r);
            onAnswer(correct, { picked, result: r });
        }
    }, [checkTrigger]);

    const pick = (i) => { if (!result || isAssessment) setPicked(i); };

    return (
        <div>
            <p style={{ fontSize: 24, fontWeight: 900, color: '#1e293b', lineHeight: 1.4, marginBottom: 28, textAlign: 'center' }}>{data.q}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {data.opts.map((opt, i) => {
                    let bg = '#fff', bdr = '#f1f5f9', txt = '#475569';
                    if (picked === i && !result) { bg = `${color}08`; bdr = color; txt = '#0f172a'; }
                    if (result && !isAssessment) {
                        if (i === data.ans) { bg = '#dcfce7'; bdr = '#22c55e'; txt = '#166534'; }
                        else if (i === picked) { bg = '#fee2e2'; bdr = '#ef4444'; txt = '#991b1b'; } // Wrong guess is red
                        else { bg = '#f8fafc'; bdr = '#f1f5f9'; txt = '#94a3b8'; } // Unselected dimmed
                    }
                    return (
                        <button key={i} onClick={() => pick(i)} disabled={!!result && !isAssessment}
                            style={{ padding: '24px 20px', borderRadius: 20, border: `3px solid ${bdr}`, background: bg, color: txt, fontWeight: 800, fontSize: 22, cursor: result && !isAssessment ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center', position: 'relative', fontFamily: 'Outfit, sans-serif' }}>
                            {opt}
                        </button>
                    );
                })}
            </div>
            {!isAssessment && <ResultFeedback result={result} expl={data.expl} />}
        </div>
    );
}


// ── PICTURE PROBLEM ──
function PictureProblemQ({ data, color, onHasInput, onAnswer, checkTrigger, saved, isAssessment }) {
    const [userAns, setUserAns] = useState(saved?.userAns || '');
    const [result, setResult] = useState(saved?.result || null);
    const checkedRef = useRef(false);
    const sceneEmojis = [];
    const count = Math.min(data.sceneCount, 20);
    for (let i = 0; i < count; i++) sceneEmojis.push(<span key={i} style={{ fontSize: 24, animation: saved ? 'none' : `tmBounceIn 0.3s ${i * 0.05}s both` }}>{data.scene}</span>);

    useEffect(() => { onHasInput(userAns.trim() !== ''); }, [userAns]);
    useEffect(() => {
        if (checkTrigger > 0 && !checkedRef.current && !result) {
            checkedRef.current = true;
            const correct = parseInt(userAns) === data.answer;
            const r = correct ? 'correct' : 'wrong';
            setResult(r);
            onAnswer(correct, { userAns, result: r });
        }
    }, [checkTrigger]);

    return (
        <div>
            <div style={{ background: '#f8fafc', borderRadius: 20, padding: 16, marginBottom: 16, border: '1px solid #f1f5f9', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 8 }}>{sceneEmojis}</div>
                {data.perItem && <div style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>{data.perItem}</div>}
                {data.sceneCount > 20 && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>(showing 20 of {data.sceneCount})</div>}
            </div>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>{data.q}</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input type="number" value={userAns} onChange={e => setUserAns(e.target.value)} disabled={!!result && !isAssessment}
                    placeholder="Your answer..." style={{ width: 150, padding: '12px 18px', borderRadius: 14, fontSize: 20, fontWeight: 700, border: `2px solid ${result && !isAssessment ? (result === 'correct' ? '#10b981' : '#ef4444') : '#e2e8f0'}`, outline: 'none', fontFamily: 'Outfit, sans-serif', background: result && !isAssessment ? (result === 'correct' ? '#f0fdf4' : '#fef2f2') : '#fff' }} />
                {!isAssessment && result === 'correct' && <span style={{ fontSize: 28 }}>🎉</span>}
                {!isAssessment && result === 'wrong' && <span style={{ fontSize: 28 }}>😢</span>}
            </div>
            {!isAssessment && <ResultFeedback result={result} expl={data.expl} correctAnswer={data.answer} />}
        </div>
    );
}

// ── SPLIT BUILDER ──
function SplitBuilderQ({ data, color, onHasInput, onAnswer, checkTrigger, saved, isAssessment }) {
    const [phase, setPhase] = useState(saved?.phase || 'start');
    const [userAns, setUserAns] = useState(saved?.userAns || '');
    const [result, setResult] = useState(saved?.result || null);
    const checkedRef = useRef(false);
    const partA = data.splitA * data.multiplyBy;
    const partB = data.splitB * data.multiplyBy;

    useEffect(() => { onHasInput(phase === 'calc' && userAns.trim() !== '', { phase, userAns }); }, [userAns, phase]);
    useEffect(() => {
        if (checkTrigger > 0 && !checkedRef.current && !result && phase === 'calc' && !isAssessment) {
            checkedRef.current = true;
            const correct = parseInt(userAns) === data.answer;
            const r = correct ? 'correct' : 'wrong';
            setResult(r);
            onAnswer(correct, { phase: 'calc', userAns, result: r });
        }
    }, [checkTrigger]);

    return (
        <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>Split & Multiply!</p>
            {phase === 'start' && (
                <div>
                    <div style={{ fontSize: 40, fontWeight: 900, fontFamily: 'Outfit, sans-serif', color, marginBottom: 16 }}>{data.number} × {data.multiplyBy}</div>
                    <p style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>This looks hard! Tap the button to split {data.number} into friendly numbers.</p>
                    <button onClick={() => setPhase('split')} style={{ padding: '14px 32px', borderRadius: 16, border: 'none', background: color, color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', boxShadow: `0 4px 14px ${color}40` }}>✂️ Split {data.number}!</button>
                </div>
            )}
            {phase === 'split' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ padding: '12px 24px', background: `${color}15`, borderRadius: 16, border: `2px solid ${color}30` }}>
                            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>Part 1</div>
                            <div style={{ fontSize: 32, fontWeight: 900, color, fontFamily: 'Outfit, sans-serif' }}>{data.splitA}</div>
                        </div>
                        <span style={{ fontSize: 24, color: '#94a3b8' }}>+</span>
                        <div style={{ padding: '12px 24px', background: `${color}15`, borderRadius: 16, border: `2px solid ${color}30` }}>
                            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>Part 2</div>
                            <div style={{ fontSize: 32, fontWeight: 900, color, fontFamily: 'Outfit, sans-serif' }}>{data.splitB}</div>
                        </div>
                        <span style={{ fontSize: 20, color: '#64748b', fontWeight: 700 }}>× {data.multiplyBy}</span>
                    </div>
                    <p style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>({data.splitA} × {data.multiplyBy}) = <strong style={{ color }}>{partA}</strong> &nbsp;+&nbsp; ({data.splitB} × {data.multiplyBy}) = <strong style={{ color }}>{partB}</strong></p>
                    <button onClick={() => setPhase('calc')} style={{ padding: '12px 28px', borderRadius: 16, border: 'none', background: color, color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>Now add them! →</button>
                </div>
            )}
            {phase === 'calc' && (
                <div>
                    <p style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{partA} + {partB} = ?</p>
                    <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>({data.splitA}×{data.multiplyBy}) + ({data.splitB}×{data.multiplyBy})</p>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <input type="number" value={userAns} onChange={e => setUserAns(e.target.value)} disabled={!!result && !isAssessment}
                            placeholder="?" style={{ width: 120, padding: '12px 18px', borderRadius: 14, fontSize: 24, fontWeight: 900, border: `2px solid ${result && !isAssessment ? (result === 'correct' ? '#10b981' : '#ef4444') : color + '40'}`, outline: 'none', fontFamily: 'Outfit, sans-serif', textAlign: 'center', background: result && !isAssessment ? (result === 'correct' ? '#f0fdf4' : '#fef2f2') : '#fff' }} />
                        {!isAssessment && result === 'correct' && <span style={{ fontSize: 32 }}>🎉</span>}
                        {!isAssessment && result === 'wrong' && <span style={{ fontSize: 32 }}>😢</span>}
                    </div>
                    {!isAssessment && <ResultFeedback result={result} expl={data.expl} correctAnswer={data.answer} />}
                </div>
            )}
        </div>
    );
}

// ── GROUP MAKER ──
function GroupMakerQ({ data, color, onHasInput, onAnswer, checkTrigger, saved, isAssessment }) {
    const [userGroups, setUserGroups] = useState(saved?.userGroups || '');
    const [userRem, setUserRem] = useState(saved?.userRem || '');
    const [result, setResult] = useState(saved?.result || null);
    const checkedRef = useRef(false);

    const allItems = [];
    for (let i = 0; i < data.total; i++) allItems.push(<span key={i} style={{ fontSize: 20, animation: saved ? 'none' : `tmBounceIn 0.3s ${i * 0.03}s both` }}>{data.emoji}</span>);
    const groups = [];
    let arrIdx = 0;
    for (let g = 0; g < data.answer; g++) {
        const row = [];
        for (let j = 0; j < data.groupSize && arrIdx < data.total; j++) { row.push(allItems[arrIdx]); arrIdx++; }
        groups.push(<div key={g} style={{ display: 'flex', gap: 3, padding: '6px 10px', background: `${color}08`, borderRadius: 12, border: `2px dashed ${color}25` }}>{row}</div>);
    }
    const leftover = [];
    while (arrIdx < data.total) { leftover.push(allItems[arrIdx]); arrIdx++; }

    useEffect(() => { onHasInput(userGroups.trim() !== '' && userRem.trim() !== '', { userGroups, userRem }); }, [userGroups, userRem]);
    useEffect(() => {
        if (checkTrigger > 0 && !checkedRef.current && !result && !isAssessment) {
            checkedRef.current = true;
            const correct = parseInt(userGroups) === data.answer && parseInt(userRem) === data.remainder;
            const r = correct ? 'correct' : 'wrong';
            setResult(r);
            onAnswer(correct, { userGroups, userRem, result: r });
        }
    }, [checkTrigger]);

    return (
        <div>
            <p style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{data.q}</p>
            <div style={{ background: '#fafafa', borderRadius: 20, padding: 16, marginBottom: 16, border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 8 }}>{groups}</div>
                {leftover.length > 0 && (
                    <div style={{ display: 'flex', gap: 3, justifyContent: 'center', padding: '6px 12px', background: '#fef3c7', borderRadius: 10, marginTop: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginRight: 6 }}>Leftover:</span>
                        {leftover}
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#64748b' }}>Groups:</span>
                    <input type="number" value={userGroups} onChange={e => setUserGroups(e.target.value)} disabled={!!result && !isAssessment}
                        placeholder="?" style={{ width: 70, padding: '10px 14px', borderRadius: 12, fontSize: 20, fontWeight: 900, border: `2px solid ${result && !isAssessment ? (result === 'correct' ? '#10b981' : '#ef4444') : '#e2e8f0'}`, outline: 'none', fontFamily: 'Outfit, sans-serif', textAlign: 'center' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#64748b' }}>Remainder:</span>
                    <input type="number" value={userRem} onChange={e => setUserRem(e.target.value)} disabled={!!result && !isAssessment}
                        placeholder="?" style={{ width: 70, padding: '10px 14px', borderRadius: 12, fontSize: 20, fontWeight: 900, border: `2px solid ${result && !isAssessment ? (result === 'correct' ? '#10b981' : '#ef4444') : '#fbbf2440'}`, outline: 'none', fontFamily: 'Outfit, sans-serif', textAlign: 'center' }} />
                </div>
                {!isAssessment && result === 'correct' && <span style={{ fontSize: 28 }}>🎉</span>}
                {!isAssessment && result === 'wrong' && <span style={{ fontSize: 28 }}>😢</span>}
            </div>
            {!isAssessment && <ResultFeedback result={result} expl={data.expl} correctAnswer={`${data.answer} groups, remainder ${data.remainder}`} />}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE PRACTICE ENGINE
   ─────────────────────────────────────────────────────────────
   Flow: Check Answer (disabled) → user inputs → Check Answer
         (enabled) → click → show result → button becomes Next →
   ═══════════════════════════════════════════════════════════════ */

function InteractivePractice({ questions, title, color, onBack, onRetry }) {
    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    // Timer
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef(null);
    useEffect(() => {
        timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000);
        return () => clearInterval(timerRef.current);
    }, []);
    useEffect(() => { if (done) clearInterval(timerRef.current); }, [done]);
    const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    // Per-question state
    const [qStates, setQStates] = useState(() => questions.map(() => ({ answered: false, correct: false, savedState: null })));
    // Whether the current question has user input
    const [hasInput, setHasInput] = useState(false);
    // Trigger counter to tell child to check
    const [checkTrigger, setCheckTrigger] = useState(0);

    const cur = questions[idx];
    const total = questions.length;
    const curState = qStates[idx];

    // Reset hasInput when switching questions
    useEffect(() => {
        setHasInput(curState.answered ? true : false);
    }, [idx]);

    const handleAnswer = (correct, savedState) => {
        if (curState.answered) return;
        setQStates(prev => {
            const next = [...prev];
            next[idx] = { answered: true, correct, savedState };
            return next;
        });
        if (correct) {
            setScore(s => s + 1);
        }
    };

    const handleCheckOrNext = () => {
        if (!curState.answered) {
            // Trigger the child to check
            setCheckTrigger(c => c + 1);
        } else {
            // Go next
            if (idx + 1 < total) {
                setCheckTrigger(0);
                setIdx(i => i + 1);
            } else {
                setDone(true);
            }
        }
    };

    const goPrev = () => {
        if (idx > 0) {
            setCheckTrigger(0);
            setIdx(i => i - 1);
        }
    };

    const retry = () => {
        if (onRetry) onRetry();
    };

    if (done) {
        const percentage = Math.round((score / total) * 100);
        return (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <div style={{
                    width: 200, height: 200, margin: '0 auto 32px', borderRadius: '50%',
                    background: `conic-gradient(#6366f1 ${percentage}%, #f1f5f9 ${percentage}%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
                }}>
                    <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: 64, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b', marginTop: 8 }}>out of {total}</span>
                    </div>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0e7ff', padding: '12px 24px', borderRadius: 50, marginBottom: 40, border: '1px solid #c7d2fe' }}>
                    <span style={{ fontSize: 18, color: '#4f46e5' }}>⏱</span>
                    <span style={{ color: '#4338ca', fontWeight: 800, fontSize: 18 }}>Time Taken: {formatTime(elapsed)}</span>
                </div>

                <div style={{ fontSize: 48, marginBottom: 12 }}>💪</div>
                <h2 style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>Keep Learning!</h2>
                <p style={{ color: '#64748b', fontSize: 18, margin: '0 0 40px' }}>Review the concepts and try again for 100%.</p>

                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <button onClick={retry} style={{ padding: '18px 36px', background: '#6366f1', color: '#fff', borderRadius: 16, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 18, fontFamily: 'Outfit, sans-serif', flex: 1, maxWidth: 220, boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}>Try Again</button>
                    <button onClick={onBack} style={{ padding: '18px 36px', background: '#fff', color: '#0f172a', borderRadius: 16, border: '2px solid #e2e8f0', fontWeight: 800, cursor: 'pointer', fontSize: 18, fontFamily: 'Outfit, sans-serif', flex: 1, maxWidth: 220 }}>Return to Skills</button>
                </div>
            </div>
        );
    }

    const typeLabel = { visual_count: '👀 Count It!', fill_blank: '✏️ Fill In', mcq: '📝 Choose One', true_false: '✅ True or False?', picture_problem: '🖼️ Picture Problem', split_builder: '✂️ Split & Solve', group_maker: '📦 Make Groups' };

    // Determine button state
    const isAnswered = curState.answered;
    const canCheck = hasInput && !isAnswered;
    const btnDisabled = !isAnswered && !canCheck;
    const btnLabel = isAnswered ? (idx + 1 === total ? '🏆 Finish' : 'Next →') : 'Check Answer';
    const btnBg = btnDisabled ? '#e2e8f0' : isAnswered ? `linear-gradient(135deg, ${color}, ${color}cc)` : `linear-gradient(135deg, #f97316, #ea580c)`;
    const btnColor = btnDisabled ? '#94a3b8' : '#fff';
    const btnShadow = btnDisabled ? 'none' : isAnswered ? `0 4px 14px ${color}30` : '0 4px 14px rgba(249,115,22,0.3)';

    return (
        <div style={{ background: '#fff', borderRadius: 24, padding: '28px 32px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', maxWidth: 800, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                    <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 50, background: `${color}15`, fontSize: 12, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1 }}>Question {idx + 1}/{total}</div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0f9ff', padding: '5px 14px', borderRadius: 50, border: '1px solid #bae6fd' }}>
                        <span style={{ fontSize: 15 }}>⏱</span>
                        <span style={{ fontSize: 15, fontWeight: 800, color: '#0284c7', fontFamily: 'JetBrains Mono, monospace' }}>{formatTime(elapsed)}</span>
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 6, background: '#f1f5f9', borderRadius: 50, marginBottom: 24, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((idx + 1) / total) * 100}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 50, transition: 'width 0.4s' }} />
            </div>

            {/* Question Component */}
            <div key={idx} style={{ minHeight: 200 }}>
                {cur.type === 'visual_count' && <VisualCountQ data={cur} color={color} onHasInput={setHasInput} onAnswer={handleAnswer} checkTrigger={checkTrigger} saved={curState.savedState} />}
                {cur.type === 'fill_blank' && <FillBlankQ data={cur} color={color} onHasInput={setHasInput} onAnswer={handleAnswer} checkTrigger={checkTrigger} saved={curState.savedState} />}
                {cur.type === 'mcq' && <McqQ data={cur} color={color} onHasInput={setHasInput} onAnswer={handleAnswer} checkTrigger={checkTrigger} saved={curState.savedState} />}
                {cur.type === 'true_false' && <TrueFalseQ data={cur} color={color} onHasInput={setHasInput} onAnswer={handleAnswer} checkTrigger={checkTrigger} saved={curState.savedState} />}
                {cur.type === 'picture_problem' && <PictureProblemQ data={cur} color={color} onHasInput={setHasInput} onAnswer={handleAnswer} checkTrigger={checkTrigger} saved={curState.savedState} />}
                {cur.type === 'split_builder' && <SplitBuilderQ data={cur} color={color} onHasInput={setHasInput} onAnswer={handleAnswer} checkTrigger={checkTrigger} saved={curState.savedState} />}
                {cur.type === 'group_maker' && <GroupMakerQ data={cur} color={color} onHasInput={setHasInput} onAnswer={handleAnswer} checkTrigger={checkTrigger} saved={curState.savedState} />}
            </div>

            {/* Previous / Check Answer / Next — single action bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, paddingTop: 28, borderTop: '2px solid #f1f5f9' }}>
                <button onClick={goPrev} disabled={idx === 0}
                    style={{
                        padding: '16px 36px', borderRadius: 100, border: '2px solid #e2e8f0',
                        background: idx === 0 ? '#f8fafc' : '#fff', color: idx === 0 ? '#cbd5e1' : '#1e293b',
                        fontWeight: 800, fontSize: 16, cursor: idx === 0 ? 'default' : 'pointer',
                        fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    }}>
                    ← Previous
                </button>

                <button onClick={handleCheckOrNext} disabled={btnDisabled}
                    style={{
                        padding: '16px 48px', borderRadius: 100, border: 'none',
                        background: btnDisabled ? '#e2e8f0' : isAnswered ? '#f59e0b' : '#f97316',
                        color: btnDisabled ? '#94a3b8' : '#fff',
                        fontWeight: 900, fontSize: 18, cursor: btnDisabled ? 'default' : 'pointer',
                        fontFamily: 'Outfit, sans-serif', boxShadow: btnDisabled ? 'none' : '0 8px 24px rgba(249, 115, 22, 0.35)',
                        transition: 'all 0.2s',
                    }}>
                    {btnLabel}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   LEARN VIEW
   ═══════════════════════════════════════════════════════════════ */

function LearnView({ skill, onBack }) {
    const content = LEARN_CONTENT[skill.id];
    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px' }}>
            <button onClick={onBack} style={{ marginBottom: 20, padding: '8px 20px', fontSize: 13, cursor: 'pointer', borderRadius: 50, border: '2px solid #e2e8f0', background: '#fff', fontWeight: 700, color: '#475569' }}>← Back to Skills</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{skill.icon}</div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: skill.color, letterSpacing: 1 }}>Learn</div>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: 26, fontWeight: 900, margin: 0, color: skill.color }}>{content.title}</h2>
                </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: `1px solid ${skill.color}15`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Key Points</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                    {content.points.map((p, i) => (
                        <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 15, lineHeight: 1.6, color: '#334155' }}>
                            <span style={{ width: 28, height: 28, borderRadius: 8, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: skill.color, flexShrink: 0 }}>{i + 1}</span>
                            {p}
                        </li>
                    ))}
                </ul>
                <div style={{ background: `${skill.color}08`, padding: 16, borderRadius: 14, borderLeft: `4px solid ${skill.color}` }}>
                    <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: skill.color, marginBottom: 6 }}>Example</div>
                    <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.6 }}>{content.example}</p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
                <button onClick={onBack} style={{ padding: '12px 24px', background: skill.color, color: '#fff', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer' }}>Back to Skills</button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   ASSESSMENT PRACTICE ENGINE
   ─────────────────────────────────────────────────────────────
   Flow: Free navigation, explicit palette, mark for review, final submit
   ═══════════════════════════════════════════════════════════════ */

function AssessmentPractice({ questions, title, color, onBack, onRetry }) {
    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    const [expandedBreakdown, setExpandedBreakdown] = useState(null);

    // Timer
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef(null);
    useEffect(() => {
        timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000);
        return () => clearInterval(timerRef.current);
    }, []);
    useEffect(() => { if (done) clearInterval(timerRef.current); }, [done]);
    const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    // Per-question state: { answered: boolean, marked: boolean, savedState: any }
    const [qStates, setQStates] = useState(() => questions.map(() => ({ answered: false, marked: false, savedState: null })));
    const [hasInput, setHasInput] = useState(false);
    const [tempState, setTempState] = useState(null);

    // Per-question time tracking
    const [qTimes, setQTimes] = useState(() => questions.map(() => 0));
    const qStartRef = useRef(Date.now());

    const cur = questions[idx];
    const total = questions.length;
    const curState = qStates[idx];

    // Reset when switching questions & accumulate time
    useEffect(() => {
        setHasInput(curState.answered);
        setTempState(curState.savedState);
        qStartRef.current = Date.now();
    }, [idx]);

    const accumulateTime = () => {
        const spent = Math.round((Date.now() - qStartRef.current) / 1000);
        setQTimes(prev => {
            const next = [...prev];
            next[idx] = (next[idx] || 0) + spent;
            return next;
        });
        qStartRef.current = Date.now();
    };

    const handleHasInput = (hasVal, stateObj) => {
        setHasInput(hasVal);
        if (stateObj) setTempState(stateObj);

        setQStates(prev => {
            const next = [...prev];
            next[idx] = { ...next[idx], answered: hasVal, savedState: stateObj || next[idx].savedState };
            return next;
        });
    };

    const toggleMark = () => {
        setQStates(prev => {
            const next = [...prev];
            next[idx] = { ...next[idx], marked: !next[idx].marked };
            return next;
        });
    };

    const goNext = () => { accumulateTime(); if (idx + 1 < total) setIdx(i => i + 1); };
    const goPrev = () => { accumulateTime(); if (idx > 0) setIdx(i => i - 1); };

    const handleSubmit = () => {
        const notAnswered = qStates.filter(s => !s.answered).length;
        if (notAnswered > 0) {
            if (!window.confirm(`You have ${notAnswered} unanswered questions. Are you sure you want to submit?`)) return;
        } else {
            if (!window.confirm("Are you sure you want to submit the assessment?")) return;
        }
        accumulateTime();
        let s = 0;
        questions.forEach((q, i) => {
            const st = qStates[i];
            if (st.answered && evaluateAnswer(q.type, q, st.savedState)) {
                s++;
            }
        });
        setScore(s);
        setDone(true);
    };

    if (done) {
        const accuracy = Math.round((score / total) * 100);
        return (
            <div style={{ background: '#fff', borderRadius: 24, padding: '40px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                    <div style={{ fontSize: 32 }}>📊</div>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: 0 }}>Assessment Report</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40, '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } }}>
                    <div style={{ background: '#fff', border: '2px solid #f1f5f9', borderRadius: 20, padding: 24, textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>Total Score</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit' }}><span style={{ color: '#6366f1' }}>{score}</span> <span style={{ fontSize: 24, color: '#94a3b8' }}>/ {total}</span></div>
                    </div>
                    <div style={{ background: '#fff', border: '2px solid #f1f5f9', borderRadius: 20, padding: 24, textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>Accuracy</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit' }}><span style={{ color: '#4f46e5' }}>{accuracy}%</span></div>
                    </div>
                    <div style={{ background: '#fff', border: '2px solid #f1f5f9', borderRadius: 20, padding: 24, textAlign: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>Time Taken</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span style={{ color: '#f59e0b', fontSize: 28 }}>⏱</span> <span style={{ color: '#d97706' }}>{formatTime(elapsed)}</span></div>
                    </div>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Question Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24, maxHeight: 420, overflowY: 'auto', paddingRight: 8 }}>
                    {questions.map((q, i) => {
                        const st = qStates[i];
                        const isCorrect = st.answered && evaluateAnswer(q.type, q, st.savedState);
                        const status = !st.answered ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect';
                        const statusColor = status === 'Correct' ? '#10b981' : status === 'Incorrect' ? '#ef4444' : '#64748b';
                        const statusBg = status === 'Correct' ? '#dcfce7' : status === 'Incorrect' ? '#fee2e2' : '#f1f5f9';
                        const isExpanded = expandedBreakdown === i;
                        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

                        return (
                            <div key={i} style={{ border: '2px solid #f1f5f9', borderRadius: 16, padding: '20px 24px', background: '#fafafa' }}>
                                {/* Question header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#475569', flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', lineHeight: 1.5 }}>
                                            {q.q}
                                            {q.type === 'fill_blank' && <span style={{ color: '#64748b', fontWeight: 600 }}> (Answer: {q.answer}{q.twoAnswers ? `, R ${q.answer2}` : ''})</span>}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                                        <div style={{ padding: '5px 12px', borderRadius: 50, background: statusBg, color: statusColor, fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4 }}>
                                            {status === 'Skipped' && <span>⏳</span>}
                                            {status === 'Correct' && <span>✓</span>}
                                            {status === 'Incorrect' && <span>✗</span>}
                                            {status}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                                            <span>⏱</span> {qTimes[i]}s
                                        </div>
                                    </div>
                                </div>

                                {/* MCQ Options display */}
                                {q.type === 'mcq' && q.opts && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                                        {q.opts.map((opt, oi) => {
                                            const isAns = oi === q.ans;
                                            const wasUserPick = st.savedState && st.savedState.picked === oi;
                                            let optBg = '#fff', optBdr = '#e2e8f0', optTxt = '#475569';
                                            if (isAns) { optBg = '#f0fdf4'; optBdr = '#22c55e'; optTxt = '#166534'; }
                                            else if (wasUserPick && !isAns) { optBg = '#fef2f2'; optBdr = '#fca5a5'; optTxt = '#991b1b'; }
                                            return (
                                                <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: `2px solid ${optBdr}`, background: optBg }}>
                                                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: isAns ? '#22c55e' : '#e2e8f0', color: isAns ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{letters[oi]}</div>
                                                    <span style={{ fontSize: 15, fontWeight: 600, color: optTxt }}>{opt}</span>
                                                    {isAns && <span style={{ marginLeft: 'auto', color: '#22c55e', fontSize: 18 }}>✓</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* True/False display */}
                                {q.type === 'true_false' && (
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                                        {[true, false].map(val => {
                                            const isAns = q.correct === val;
                                            const wasUserPick = st.savedState && st.savedState.picked === val;
                                            let bg = '#fff', bdr = '#e2e8f0';
                                            if (isAns) { bg = '#f0fdf4'; bdr = '#22c55e'; }
                                            else if (wasUserPick) { bg = '#fef2f2'; bdr = '#fca5a5'; }
                                            return (
                                                <div key={String(val)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: `2px solid ${bdr}`, background: bg, textAlign: 'center', fontWeight: 800, fontSize: 14, color: isAns ? '#166534' : '#64748b' }}>
                                                    {val ? '✅ TRUE' : '❌ FALSE'} {isAns && <span style={{ color: '#22c55e' }}>✓</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Check Solution toggle */}
                                <button onClick={() => setExpandedBreakdown(isExpanded ? null : i)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0', fontSize: 14, fontWeight: 700, color: '#16a34a' }}>
                                    <span style={{ fontSize: 16 }}>{isExpanded ? '∧' : '∨'}</span>
                                    {isExpanded ? 'Hide Solution' : 'Check Solution'}
                                </button>

                                {isExpanded && (
                                    <div style={{ background: '#fffbeb', borderRadius: 12, padding: 16, border: '1px solid #fde68a', marginTop: 8 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                            <span style={{ fontSize: 18 }}>💡</span>
                                            <span style={{ fontSize: 15, fontWeight: 800, color: '#92400e' }}>Step-by-Step Logic</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: 14, color: '#451a03', lineHeight: 1.6 }}>{q.expl}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button onClick={onBack} style={{ width: '100%', padding: '20px', background: '#0f172a', color: '#fff', borderRadius: 16, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 18, fontFamily: 'Outfit, sans-serif', boxShadow: '0 8px 24px rgba(15,23,42,0.3)' }}>Return to Skills Hub</button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', maxWidth: 1100, margin: '0 auto', height: 'calc(100vh - 120px)' }}>
            {/* Left Pane: Question Area */}
            <div style={{ flex: '1 1 600px', background: '#fff', borderRadius: 24, padding: '28px 32px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 50, background: '#e0e7ff', color: '#4f46e5', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20, alignSelf: 'flex-start' }}>
                    Question {idx + 1}
                </div>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {cur.type === 'visual_count' && <VisualCountQ key={idx} data={cur} color={color} onHasInput={handleHasInput} onAnswer={() => { }} checkTrigger={0} saved={curState.savedState} isAssessment={true} />}
                    {cur.type === 'fill_blank' && <FillBlankQ key={idx} data={cur} color={color} onHasInput={handleHasInput} onAnswer={() => { }} checkTrigger={0} saved={curState.savedState} isAssessment={true} />}
                    {cur.type === 'mcq' && <McqQ key={idx} data={cur} color={color} onHasInput={handleHasInput} onAnswer={() => { }} checkTrigger={0} saved={curState.savedState} isAssessment={true} />}
                    {cur.type === 'true_false' && <TrueFalseQ key={idx} data={cur} color={color} onHasInput={handleHasInput} onAnswer={() => { }} checkTrigger={0} saved={curState.savedState} isAssessment={true} />}
                    {cur.type === 'picture_problem' && <PictureProblemQ key={idx} data={cur} color={color} onHasInput={handleHasInput} onAnswer={() => { }} checkTrigger={0} saved={curState.savedState} isAssessment={true} />}
                    {cur.type === 'split_builder' && <SplitBuilderQ key={idx} data={cur} color={color} onHasInput={handleHasInput} onAnswer={() => { }} checkTrigger={0} saved={curState.savedState} isAssessment={true} />}
                    {cur.type === 'group_maker' && <GroupMakerQ key={idx} data={cur} color={color} onHasInput={handleHasInput} onAnswer={() => { }} checkTrigger={0} saved={curState.savedState} isAssessment={true} />}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 20, borderTop: '2px solid #f1f5f9', gap: 12 }}>
                    <button onClick={goPrev} disabled={idx === 0}
                        style={{ padding: '14px 28px', borderRadius: 100, border: '2px solid #e2e8f0', background: idx === 0 ? '#f8fafc' : '#fff', color: idx === 0 ? '#cbd5e1' : '#1e293b', fontWeight: 800, fontSize: 16, cursor: idx === 0 ? 'default' : 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s' }}>
                        ← Previous
                    </button>

                    <button onClick={toggleMark}
                        style={{ padding: '14px 28px', borderRadius: 100, border: curState.marked ? `2px solid #f59e0b` : '2px solid #e2e8f0', background: curState.marked ? '#fef3c7' : '#f8fafc', color: curState.marked ? '#d97706' : '#475569', fontWeight: 800, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s' }}>
                        {curState.marked ? '★ Marked' : 'Mark for Review'}
                    </button>

                    <button onClick={() => { if (idx + 1 < total) setIdx(i => i + 1); }}
                        style={{ padding: '14px 40px', borderRadius: 100, border: 'none', background: '#f97316', color: '#fff', fontWeight: 900, fontSize: 16, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s', opacity: idx === total - 1 ? 0.5 : 1 }}>
                        Next →
                    </button>
                </div>
            </div>

            {/* Right Pane: Info & Palette */}
            <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0, overflowY: 'auto' }}>
                {/* Timer */}
                <div style={{ background: '#fff', borderRadius: 20, padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                    <div style={{ background: '#e0e7ff', padding: 8, borderRadius: '50%', color: '#4f46e5', display: 'flex' }}>
                        <span style={{ fontSize: 22 }}>⏱</span>
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{formatTime(elapsed)}</div>
                </div>

                {/* Palette */}
                <div style={{ background: '#fff', borderRadius: 20, padding: '20px 18px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', flex: 1 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: '0 0 16px', fontFamily: 'Outfit, sans-serif' }}>Question Palette</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
                        {questions.map((_, i) => {
                            const st = qStates[i];
                            const isCur = idx === i;
                            let bg = '#fff', color = '#64748b', bdr = '#e2e8f0';

                            if (st.marked) { bg = '#f59e0b'; color = '#fff'; bdr = '#f59e0b'; }
                            else if (st.answered) { bg = '#6366f1'; color = '#fff'; bdr = '#6366f1'; }

                            if (isCur) {
                                bdr = '#0f172a';
                            }

                            return (
                                <button key={i} onClick={() => { accumulateTime(); setIdx(i); }}
                                    style={{ aspectRatio: '1', borderRadius: 12, border: isCur ? `2px solid ${bdr}` : `1px solid ${bdr}`, background: bg, color, fontWeight: 800, fontSize: 16, cursor: 'pointer', outline: isCur ? '3px solid rgba(15,23,42,0.1)' : 'none', outlineOffset: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '2px solid #f1f5f9', paddingTop: 16, marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#6366f1' }}></div>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>Answered</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', border: '2px solid #e2e8f0' }}></div>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>Not Answered</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#f59e0b' }}></div>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>Marked for Review</span>
                        </div>
                    </div>

                    <button onClick={handleSubmit} style={{ width: '100%', padding: '14px', background: '#ef4444', color: '#fff', borderRadius: 14, border: 'none', fontWeight: 900, fontSize: 16, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)' }}>
                        Submit Assessment
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function MeasuringLengthSkills() {
    const navigate = useNavigate();
    const [mode, setMode] = useState('menu');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [practiceQs, setPracticeQs] = useState([]);
    const [retryCount, setRetryCount] = useState(0);

    const onBack = () => { setMode('menu'); setSelectedSkill(null); };

    const renderSkillContent = () => {
        const skillInfo = SKILLS.find(s => s.id === selectedSkill);
        if (mode === 'learn') return <LearnView skill={skillInfo} onBack={onBack} />;

        if (practiceQs.length === 0) return <div>Data pending...</div>;

        if (mode === 'assess') {
            return (
                <AssessmentPractice
                    key={retryCount}
                    questions={practiceQs}
                    title={`${skillInfo.title} — Assessment`}
                    color={skillInfo.color}
                    onBack={onBack}
                    onRetry={() => {
                        setPracticeQs(generatePracticeQs(selectedSkill));
                        setRetryCount(c => c + 1);
                    }}
                />
            );
        }

        return (
            <InteractivePractice
                key={retryCount}
                questions={practiceQs}
                title={`${skillInfo.title} — Practice`}
                color={skillInfo.color}
                onBack={onBack}
                onRetry={() => {
                    setPracticeQs(generatePracticeQs(selectedSkill));
                    setRetryCount(c => c + 1);
                }}
            />
        );
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fcfaf3' }}>
            <style>{`
                @keyframes tmBounceIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes tmShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }
            `}</style>

            <nav className="ml-nav">
                <button className="ml-nav-back" onClick={() => mode !== 'menu' ? onBack() : navigate('/measuring-length')}>
                    {mode !== 'menu' ? '← Back to Skills' : '← Back to Measuring Length'}
                </button>
                {mode === 'menu' && (
                    <div className="ml-nav-links">
                        <button className="ml-nav-link" onClick={() => navigate('/measuring-length/introduction')}>🌟 Introduction</button>
                        <button className="ml-nav-link" onClick={() => navigate('/measuring-length/terminology')}>📖 Terminology</button>
                        <button className="ml-nav-link ml-nav-link--active" onClick={() => navigate('/measuring-length/skills')}>🎯 Skills</button>
                    </div>
                )}
            </nav>

            <div style={{ maxWidth: 1000, margin: mode === 'menu' ? '20px auto 40px' : '20px auto', padding: mode === 'menu' ? '0 24px' : '0 12px', flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                {mode === 'menu' && (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.6rem', fontWeight: 900, margin: '0 0 8px', color: '#0f172a' }}>
                                Master <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{SKILLS.length} Length Skills</span>
                            </h1>
                            <p style={{ color: '#64748b', fontSize: 16 }}>Interactive challenges — count, type, split & solve! 🎮</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {SKILLS.map(s => (
                                <div key={s.id} style={{ background: '#fff', borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 240 }}>
                                        <div style={{ background: `${s.color}15`, width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{s.icon}</div>
                                        <div>
                                            <div style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{s.title}</div>
                                            <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{s.desc}</div>
                                            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4, fontWeight: 600 }}>20 interactive questions • mixed types</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button style={{ padding: '8px 18px', fontSize: 13, background: '#f1f5f9', color: '#475569', borderRadius: 50, border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setSelectedSkill(s.id); setMode('learn'); }}>📘 Learn</button>
                                        <button style={{ padding: '8px 18px', fontSize: 13, background: `${s.color}15`, color: s.color, borderRadius: 50, border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setSelectedSkill(s.id); setPracticeQs(generatePracticeQs(s.id)); setRetryCount(1); setMode('practice'); }}>🎮 Practice</button>
                                        <button style={{ padding: '8px 18px', fontSize: 13, background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)`, color: '#fff', borderRadius: 50, border: 'none', fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 12px ${s.color}40` }} onClick={() => { setSelectedSkill(s.id); setPracticeQs(generatePracticeQs(s.id)); setRetryCount(1); setMode('assess'); }}>🎯 Assess</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {mode !== 'menu' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                        {renderSkillContent()}
                    </div>
                )}
            </div>
        </div>
    );
}
