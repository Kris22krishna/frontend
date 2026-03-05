import React, { useState, useEffect } from 'react';
import { generateLGScenarios, GraphMini } from './LinearGraphUtils';

/**
 * LinearGraphAssessmentEngine
 * - 10 steps: 3 PLOT + 7 MCQ  (plot counts as a question)
 * - Assessment plot: user can place ANY snapped point (no validation)
 *   → marked Correct in report if all sc.points were placed, else Incorrect
 * - No live feedback during quiz
 * - Report shows plot steps in same format as MCQ (Correct Answer / Your Answer)
 */
export default function LinearGraphAssessmentEngine({ color, onBack }) {

    // Build 3 scenarios (one gets 3 MCQs, two get 2 MCQs) = 10 steps
    const [scenarios] = useState(() => {
        const all = generateLGScenarios();
        for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
        }
        const picked = all.slice(0, 3);
        const bonus = Math.floor(Math.random() * 3);
        return picked.map((sc, idx) => ({ ...sc, mcqCount: idx === bonus ? 3 : 2 }));
    });

    // Flat steps: [plot, mcq, mcq, plot, mcq, mcq, mcq, plot, mcq, mcq] = 10
    const [steps] = useState(() => {
        const arr = [];
        scenarios.forEach((sc, si) => {
            arr.push({ type: 'plot', scenarioIdx: si });
            for (let qi = 0; qi < sc.mcqCount; qi++) {
                arr.push({ type: 'mcq', scenarioIdx: si, mcqIdx: qi });
            }
        });
        return arr;
    });

    const TOTAL = steps.length;                                   // 10
    const TOTAL_MCQ = steps.filter(s => s.type === 'mcq').length; // 7

    const [current, setCurrent] = useState(0);
    // answers[i]: null | 'done' (plot — any points placed) | number (mcq choice)
    const [answers, setAnswers] = useState(() => Array(TOTAL).fill(null));

    // Per-scenario: xScale, yScale, placedPoints
    const [xScaleArr, setXScaleArr] = useState(() => scenarios.map(() => null));
    const [yScaleArr, setYScaleArr] = useState(() => Array(scenarios.length).fill(null));
    const [placedPointsArr, setPlacedPointsArr] = useState(() => scenarios.map(() => []));

    const [toast, setToast] = useState('');
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TOTAL * 60);

    // Countdown timer
    useEffect(() => {
        if (finished) return;
        if (timeLeft <= 0) { setFinished(true); return; }
        const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, finished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const step = steps[current];
    const sc = scenarios[step.scenarioIdx];
    const si = step.scenarioIdx;
    const xScale = xScaleArr[si];
    const yScale = yScaleArr[si];
    const placedPoints = placedPointsArr[si];

    const setXScale = (v) => setXScaleArr(arr => arr.map((x, i) => i === si ? v : x));
    const setYScale = (v) => setYScaleArr(arr => arr.map((x, i) => i === si ? v : x));
    const setPlacedPoints = (pts) =>
        setPlacedPointsArr(arr => arr.map((x, i) => i === si ? (typeof pts === 'function' ? pts(x) : pts) : x));

    // SVG dimensions for plot step
    const SVG_W = 390, SVG_H = 310;
    const PAD_L = 52, PAD_T = 14, PAD_R = 14, PAD_B = 42;
    const plotW = SVG_W - PAD_L - PAD_R;
    const plotH = SVG_H - PAD_T - PAD_B;
    const { xMin, xMax, yMin, yMax } = sc;
    const xStep = xScale || sc.xScaleOpts[0].v;
    const yStep = yScale || sc.yScaleOpts[0].v;

    const toPixel = (dx, dy) => ({
        px: PAD_L + ((dx - xMin) / (xMax - xMin)) * plotW,
        py: PAD_T + (1 - (dy - yMin) / (yMax - yMin)) * plotH,
    });

    const xTicks = [], yTicks = [];
    for (let gx = xMin; gx <= xMax; gx += xStep) { const { px } = toPixel(gx, yMin); xTicks.push({ px, label: gx }); }
    for (let gy = yMin; gy <= yMax; gy += yStep) { const { py } = toPixel(xMin, gy); yTicks.push({ py, label: gy }); }
    const sortedPlaced = [...placedPoints].sort((a, b) => a.x - b.x);

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

    // Assessment plot: allow ANY snapped grid point (no table validation)
    const handleSvgClick = (e) => {
        if (!xScale || !yScale) { showToast('Select both scales first.'); return; }
        if (answers[current] === 'done') return;
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const rawPx = (e.clientX - rect.left) * (SVG_W / rect.width);
        const rawPy = (e.clientY - rect.top) * (SVG_H / rect.height);
        const rawX = xMin + ((rawPx - PAD_L) / plotW) * (xMax - xMin);
        const rawY = yMin + (1 - (rawPy - PAD_T) / plotH) * (yMax - yMin);
        const snapped = { x: Math.round(rawX / xStep) * xStep, y: Math.round(rawY / yStep) * yStep };
        if (snapped.x < xMin || snapped.x > xMax || snapped.y < yMin || snapped.y > yMax) return;
        if (placedPoints.some(p => Math.abs(p.x - snapped.x) < 0.001 && Math.abs(p.y - snapped.y) < 0.001)) {
            showToast('Already placed!'); return;
        }
        const next = [...placedPoints, snapped];
        setPlacedPoints(next);
        // When enough points placed (same count as table), mark done
        if (next.length >= sc.points.length) {
            setTimeout(() => setAnswers(prev => prev.map((a, i) => i === current ? 'done' : a)), 400);
        }
    };

    const handleMcqSelect = (optIdx) => {
        if (finished || answers[current] !== null) return;
        setAnswers(prev => prev.map((a, i) => i === current ? optIdx : a));
    };

    const handleSubmit = () => {
        if (answers.some(a => a === null)) {
            if (!window.confirm('You have unanswered questions. Submit anyway?')) return;
        }
        setFinished(true);
    };

    const handleRetry = () => window.location.reload();

    // ── Helper: check if user's plot is correct ──────────────────────────────
    const isPlotCorrect = (scenarioIdx) => {
        const sc = scenarios[scenarioIdx];
        const placed = placedPointsArr[scenarioIdx];
        if (!placed || placed.length < sc.points.length) return false;
        return sc.points.every(cp =>
            placed.some(up => Math.abs(up.x - cp.x) < 0.001 && Math.abs(up.y - cp.y) < 0.001)
        );
    };

    // ── FINISHED / REPORT ─────────────────────────────────────────────────────
    if (finished) {
        let mcqScore = 0, plotScore = 0;
        steps.forEach((st, i) => {
            if (st.type === 'mcq') {
                if (answers[i] === scenarios[st.scenarioIdx].mcqs[st.mcqIdx].ans) mcqScore++;
            } else {
                if (isPlotCorrect(st.scenarioIdx)) plotScore++;
            }
        });
        const totalScore = mcqScore + plotScore;
        const pct = Math.round((totalScore / TOTAL) * 100);

        return (
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '20px' }}>
                {/* Score header */}
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Assessment Complete ✅
                    </h2>
                    <div style={{ fontSize: 52, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>{totalScore} / {TOTAL}</div>
                    <div style={{ fontSize: 18, color: '#64748b', fontWeight: 600 }}>Score: {pct}%</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>
                        Plots: {plotScore}/3 correct · MCQs: {mcqScore}/{TOTAL_MCQ} correct
                    </div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
                        <button className="grph-btn-primary" onClick={handleRetry} style={{ background: color }}>🔀 New Assessment</button>
                        <button className="grph-btn-secondary" onClick={onBack}>Return to Skills</button>
                    </div>
                </div>

                {/* Summary report */}
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>📋 Summary Report</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {steps.map((st, i) => {
                        const sc = scenarios[st.scenarioIdx];

                        // ── PLOT STEP in report ──────────────────────────────
                        if (st.type === 'plot') {
                            const correct = isPlotCorrect(st.scenarioIdx);
                            const userPts = placedPointsArr[st.scenarioIdx] || [];
                            const hasPlotted = userPts.length > 0;
                            return (
                                <div key={i} style={{ padding: '18px 20px', borderRadius: 14, border: `2px solid ${correct ? '#10b981' : '#ef4444'}`, background: correct ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)' }}>
                                    <div style={{ fontWeight: 800, marginBottom: 10, color: correct ? '#059669' : '#ef4444' }}>
                                        {correct ? '✅' : '❌'} Question {i + 1} — Graph Plot: {sc.title}
                                    </div>
                                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                                        Plot the graph using the correct scale and the given data points.
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        {/* Correct Answer */}
                                        <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: '12px' }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 8 }}>✅ Correct Graph</div>
                                            <div style={{ display: 'inline-block', background: '#fff', borderRadius: 8, border: '1.5px solid #e2e8f0', padding: 6 }}>
                                                <GraphMini scenario={sc} xGridStep={sc.xScaleOpts[0].v} yGridStep={sc.yScaleOpts[0].v} color="#059669" />
                                            </div>
                                            <div style={{ marginTop: 6, fontSize: 11, color: '#374151', fontWeight: 600 }}>
                                                <div><span style={{ color: '#059669', fontWeight: 800 }}>Eq: </span>{sc.eq}</div>
                                                <div style={{ marginTop: 4 }}><span style={{ color: '#059669', fontWeight: 800 }}>Scale: </span>X → {sc.xScaleOpts[0].label}, Y → {sc.yScaleOpts[0].label}</div>
                                                <div style={{ marginTop: 4 }}><span style={{ color: '#059669', fontWeight: 800 }}>Points: </span>{sc.points.map(p => `(${p.x},${p.y})`).join(' ')}</div>
                                            </div>
                                        </div>
                                        {/* Your Answer */}
                                        <div style={{ background: correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '12px' }}>
                                            <div style={{ fontSize: 11, fontWeight: 800, color: correct ? '#059669' : '#ef4444', textTransform: 'uppercase', marginBottom: 8 }}>
                                                {correct ? '✅' : '❌'} Your Graph
                                            </div>
                                            {hasPlotted ? (
                                                <>
                                                    <div style={{ display: 'inline-block', background: '#fff', borderRadius: 8, border: '1.5px solid #e2e8f0', padding: 6 }}>
                                                        <GraphMini
                                                            scenario={sc}
                                                            xGridStep={xScaleArr[st.scenarioIdx] || sc.xScaleOpts[0].v}
                                                            yGridStep={yScaleArr[st.scenarioIdx] || sc.yScaleOpts[0].v}
                                                            color={correct ? '#059669' : '#ef4444'}
                                                            userPoints={userPts}
                                                        />
                                                    </div>
                                                    <div style={{ marginTop: 6, fontSize: 11, color: '#374151', fontWeight: 600 }}>
                                                        <span style={{ color: correct ? '#059669' : '#ef4444', fontWeight: 800 }}>Points plotted: </span>
                                                        {userPts.sort((a, b) => a.x - b.x).map(p => `(${p.x},${p.y})`).join(' ')}
                                                    </div>
                                                </>
                                            ) : (
                                                <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
                                                    — Not Plotted —
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // ── MCQ STEP in report ───────────────────────────────
                        const mq = sc.mcqs[st.mcqIdx];
                        const isCorrect = answers[i] === mq.ans;
                        return (
                            <div key={i} style={{ padding: '18px 20px', borderRadius: 14, border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`, background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)' }}>
                                <div style={{ fontWeight: 800, marginBottom: 6, color: isCorrect ? '#059669' : '#ef4444' }}>
                                    {isCorrect ? '✅' : '❌'} Question {i + 1} — {sc.title}
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>{mq.q}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>Correct Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{mq.opts[mq.ans]}</div>
                                    </div>
                                    <div style={{ background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: isCorrect ? '#059669' : '#ef4444', textTransform: 'uppercase', marginBottom: 4 }}>Your Answer</div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                                            {answers[i] !== null ? mq.opts[answers[i]] : '— Not Answered —'}
                                        </div>
                                    </div>
                                </div>
                                {mq.exp && (
                                    <div style={{ marginTop: 10, fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                                        <strong style={{ color: '#0369a1' }}>💡 </strong>{mq.exp}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ── ACTIVE ASSESSMENT ─────────────────────────────────────────────────────
    const mq = step.type === 'mcq' ? sc.mcqs[step.mcqIdx] : null;

    // For MCQ: show user's plotted graph (from this scenario)
    const userPlottedPoints = placedPointsArr[si] || [];
    const userHasPlotted = userPlottedPoints.length > 0;

    // Mini SVG dimensions for MCQ left panel
    const MINI_W = 220, MINI_H = 170;
    const ML = 36, MT = 10, MR = 8, MB = 28;
    const mPlotW = MINI_W - ML - MR, mPlotH = MINI_H - MT - MB;
    const mXStep = sc.xScaleOpts[0].v, mYStep = sc.yScaleOpts[0].v;
    const mToPixel = (dx, dy) => ({
        px: ML + ((dx - xMin) / (xMax - xMin)) * mPlotW,
        py: MT + (1 - (dy - yMin) / (yMax - yMin)) * mPlotH,
    });
    const mXTicks = [], mYTicks = [];
    for (let gx = xMin; gx <= xMax; gx += mXStep) { const { px } = mToPixel(gx, yMin); mXTicks.push({ px, label: gx }); }
    for (let gy = yMin; gy <= yMax; gy += mYStep) { const { py } = mToPixel(xMin, gy); mYTicks.push({ py, label: gy }); }
    const sortedUser = [...userPlottedPoints].sort((a, b) => a.x - b.x);

    return (
        <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 120px)', overflow: 'hidden', alignItems: 'stretch' }}>
            {/* ── LEFT: Main Panel ─────────────────────────────────── */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ marginBottom: 10, flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2 }}>Assessment</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '2px 0 0' }}>
                        Application of Linear Graphs
                    </h3>
                </div>

                {/* Card */}
                <div style={{ flex: 1, background: '#fff', borderRadius: 16, padding: '16px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Step badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 800, color, marginBottom: 12, flexShrink: 0 }}>
                        {step.type === 'plot' ? `QUESTION ${current + 1} — GRAPH PLOT` : `QUESTION ${current + 1}`}
                    </div>

                    {/* ── PLOT STEP ───────────────────────────────────── */}
                    {step.type === 'plot' && (
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, overflow: 'hidden', alignItems: 'start' }}>
                            <div style={{ overflowY: 'auto' }}>
                                <h4 style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{sc.title}</h4>
                                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10 }}>Plot the graph. You can place any point — accuracy will be checked in the report.</div>
                                <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                                    <table style={{ borderCollapse: 'collapse', fontSize: 12, width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <th style={{ background: `${color}15`, color, padding: '6px 10px', textAlign: 'left', border: `1px solid ${color}25`, fontWeight: 800, fontSize: 11, whiteSpace: 'nowrap' }}>{sc.xLabel}</th>
                                                {sc.points.map((p, i) => <td key={i} style={{ background: `${color}08`, color, padding: '6px 10px', border: `1px solid ${color}20`, fontWeight: 700, textAlign: 'center' }}>{p.x}</td>)}
                                            </tr>
                                            <tr>
                                                <th style={{ background: '#f8fafc', padding: '6px 10px', border: '1px solid #e2e8f0', fontWeight: 800, color: '#374151', fontSize: 11, whiteSpace: 'nowrap', textAlign: 'left' }}>{sc.yLabel}</th>
                                                {sc.points.map((p, i) => <td key={i} style={{ background: '#fff', padding: '6px 10px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{p.y}</td>)}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: '#374151', marginBottom: 5 }}>X-axis scale:</div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {sc.xScaleOpts.map((opt, oi) => {
                                            const isSel = xScale === opt.v;
                                            return <button key={oi} onClick={() => setXScale(opt.v)} style={{ padding: '5px 11px', borderRadius: 8, border: `2px solid ${isSel ? color : '#e2e8f0'}`, background: isSel ? `${color}12` : '#f8fafc', color: isSel ? color : '#374151', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>{isSel ? '✓ ' : ''}{opt.label}</button>;
                                        })}
                                    </div>
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: '#374151', marginBottom: 5 }}>Y-axis scale:</div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {sc.yScaleOpts.map((opt, oi) => {
                                            const isSel = yScale === opt.v;
                                            return <button key={oi} onClick={() => setYScale(opt.v)} style={{ padding: '5px 11px', borderRadius: 8, border: `2px solid ${isSel ? color : '#e2e8f0'}`, background: isSel ? `${color}12` : '#f8fafc', color: isSel ? color : '#374151', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>{isSel ? '✓ ' : ''}{opt.label}</button>;
                                        })}
                                    </div>
                                </div>
                                {xScale && yScale
                                    ? <div style={{ background: `${color}15`, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800, color, display: 'inline-block' }}>
                                        Points placed: {placedPoints.length} {answers[current] === 'done' ? '✅ Done!' : `(need ${sc.points.length})`}
                                    </div>
                                    : <div style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>Select both scales to start plotting →</div>}
                                {toast && <div style={{ marginTop: 8, background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600 }}>{toast}</div>}
                            </div>
                            {/* SVG */}
                            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: 6, alignSelf: 'start' }}>
                                <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                                    style={{ cursor: xScale && yScale && answers[current] !== 'done' ? 'crosshair' : 'default', display: 'block', maxWidth: '100%' }}
                                    onClick={handleSvgClick}>
                                    {xTicks.map(({ px: x }, i) => <line key={`vg${i}`} x1={x} y1={PAD_T} x2={x} y2={PAD_T + plotH} stroke="#e2e8f0" strokeWidth={1} />)}
                                    {yTicks.map(({ py: y }, i) => <line key={`hg${i}`} x1={PAD_L} y1={y} x2={PAD_L + plotW} y2={y} stroke="#e2e8f0" strokeWidth={1} />)}
                                    <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + plotH} stroke="#1e293b" strokeWidth={2} />
                                    <line x1={PAD_L} y1={PAD_T + plotH} x2={PAD_L + plotW} y2={PAD_T + plotH} stroke="#1e293b" strokeWidth={2} />
                                    {xTicks.map(({ px: x, label }, i) => <text key={`xl${i}`} x={x} y={PAD_T + plotH + 16} textAnchor="middle" fontSize={9} fill="#64748b">{label}</text>)}
                                    {yTicks.map(({ py: y, label }, i) => <text key={`yl${i}`} x={PAD_L - 5} y={y + 3} textAnchor="end" fontSize={9} fill="#64748b">{label}</text>)}
                                    <text x={PAD_L + plotW / 2} y={SVG_H - 2} textAnchor="middle" fontSize={10} fill="#374151" fontWeight="700">{sc.xLabel}</text>
                                    <text x={11} y={PAD_T + plotH / 2} textAnchor="middle" fontSize={10} fill="#374151" fontWeight="700" transform={`rotate(-90,11,${PAD_T + plotH / 2})`}>{sc.yLabel}</text>
                                    {(!xScale || !yScale) && <text x={SVG_W / 2} y={SVG_H / 2} textAnchor="middle" fontSize={13} fill="#94a3b8">← Select scales to draw grid</text>}
                                    {sortedPlaced.length > 1 && sortedPlaced.map((p, i) => {
                                        if (i === 0) return null;
                                        const prev = sortedPlaced[i - 1];
                                        const { px: x1, py: y1 } = toPixel(prev.x, prev.y);
                                        const { px: x2, py: y2 } = toPixel(p.x, p.y);
                                        return <line key={`seg${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} strokeLinecap="round" />;
                                    })}
                                    {sortedPlaced.map((p, i) => {
                                        const { px, py } = toPixel(p.x, p.y);
                                        return <g key={`pt${i}`}><circle cx={px} cy={py} r={5} fill={color} stroke="#fff" strokeWidth={2} /><text x={px + 7} y={py - 5} fontSize={8} fill={color} fontWeight="700">({p.x},{p.y})</text></g>;
                                    })}
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* ── MCQ STEP ─────────────────────────────────────── */}
                    {step.type === 'mcq' && mq && (
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16, overflow: 'hidden', alignItems: 'start' }}>
                            {/* Left: user's plotted graph or placeholder */}
                            <div style={{ background: '#f8fafc', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: '10px', alignSelf: 'start' }}>
                                <div style={{ fontSize: 10, fontWeight: 800, color, textTransform: 'uppercase', marginBottom: 6 }}>Your Graph — {sc.title}</div>
                                {userHasPlotted ? (
                                    <svg width={MINI_W} height={MINI_H} viewBox={`0 0 ${MINI_W} ${MINI_H}`} style={{ display: 'block', maxWidth: '100%' }}>
                                        {mXTicks.map(({ px: x }, i) => <line key={`mvg${i}`} x1={x} y1={MT} x2={x} y2={MT + mPlotH} stroke="#e2e8f0" strokeWidth={1} />)}
                                        {mYTicks.map(({ py: y }, i) => <line key={`mhg${i}`} x1={ML} y1={y} x2={ML + mPlotW} y2={y} stroke="#e2e8f0" strokeWidth={1} />)}
                                        <line x1={ML} y1={MT} x2={ML} y2={MT + mPlotH} stroke="#1e293b" strokeWidth={1.5} />
                                        <line x1={ML} y1={MT + mPlotH} x2={ML + mPlotW} y2={MT + mPlotH} stroke="#1e293b" strokeWidth={1.5} />
                                        {mXTicks.map(({ px: x, label }, i) => <text key={`mxl${i}`} x={x} y={MT + mPlotH + 11} textAnchor="middle" fontSize={7} fill="#64748b">{label}</text>)}
                                        {mYTicks.map(({ py: y, label }, i) => <text key={`myl${i}`} x={ML - 4} y={y + 3} textAnchor="end" fontSize={7} fill="#64748b">{label}</text>)}
                                        <text x={ML + mPlotW / 2} y={MINI_H - 1} textAnchor="middle" fontSize={7} fill="#374151" fontWeight="700">{sc.xLabel}</text>
                                        {sortedUser.length > 1 && sortedUser.map((p, i) => {
                                            if (i === 0) return null;
                                            const prev = sortedUser[i - 1];
                                            const { px: x1, py: y1 } = mToPixel(prev.x, prev.y);
                                            const { px: x2, py: y2 } = mToPixel(p.x, p.y);
                                            return <line key={`ms${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} strokeLinecap="round" />;
                                        })}
                                        {sortedUser.map((p, i) => {
                                            const { px, py } = mToPixel(p.x, p.y);
                                            return <circle key={`mp${i}`} cx={px} cy={py} r={3.5} fill={color} stroke="#fff" strokeWidth={1.5} />;
                                        })}
                                    </svg>
                                ) : (
                                    <div style={{ height: MINI_H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 12, textAlign: 'center', gap: 6 }}>
                                        <span style={{ fontSize: 24 }}>📊</span>
                                        <span>Graph not plotted yet.<br />Go back to plot it first.</span>
                                    </div>
                                )}
                                <div style={{ marginTop: 6, fontSize: 10, color: '#64748b', fontWeight: 600 }}>
                                    <span style={{ color, fontWeight: 800 }}>Eq: </span>{sc.eq}
                                </div>
                            </div>

                            {/* Right: question + 2x2 options */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>{mq.q}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    {mq.opts.map((opt, oi) => {
                                        const isSelected = answers[current] === oi;
                                        return (
                                            <button key={oi} onClick={() => handleMcqSelect(oi)}
                                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2.5px solid ${isSelected ? color : 'rgba(0,0,0,0.06)'}`, background: isSelected ? `${color}06` : '#fff', cursor: 'pointer', fontSize: 14, color: '#0f172a', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500 }}>
                                                <div style={{ width: 9, height: 9, borderRadius: '50%', background: isSelected ? color : '#f1f5f9', flexShrink: 0 }} />
                                                <span>{opt}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Prev / Next */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, flexShrink: 0 }}>
                    <button onClick={() => setCurrent(c => c - 1)} disabled={current === 0} className="grph-btn-secondary"
                        style={{ visibility: current === 0 ? 'hidden' : 'visible' }}>← Previous</button>
                    {current + 1 === TOTAL ? (
                        <button onClick={handleSubmit} className="grph-btn-primary" style={{ background: '#ef4444', border: 'none', color: '#fff' }}>Submit Assessment</button>
                    ) : (
                        <button onClick={() => setCurrent(c => c + 1)} className="grph-btn-primary" style={{ background: color, border: 'none', color: '#fff' }}>Next →</button>
                    )}
                </div>
            </div>

            {/* ── RIGHT: Palette Sidebar ──────────────────────────────── */}
            <div style={{ width: 180, flexShrink: 0, background: '#fff', borderRadius: 16, padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 12, marginLeft: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', borderRadius: 12, fontWeight: 800, fontSize: 20, background: timeLeft < 60 ? 'rgba(239,68,68,0.1)' : `${color}0D`, color: timeLeft < 60 ? '#ef4444' : color }}>
                    ⏱️ {formatTime(timeLeft)}
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a' }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5 }}>
                    {steps.map((st, i) => {
                        const isDone = answers[i] !== null;
                        const isCurrent = current === i;
                        return (
                            <button key={i} onClick={() => setCurrent(i)}
                                style={{ aspectRatio: '1/1', borderRadius: 7, fontSize: 12, fontWeight: 700, background: isDone ? color : '#f1f5f9', color: isDone ? '#fff' : '#64748b', border: isCurrent ? '3px solid #0f172a' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {i + 1}
                            </button>
                        );
                    })}
                </div>
                <div style={{ fontSize: 11, color: '#64748b', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, background: color, borderRadius: 3 }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, background: '#f1f5f9', borderRadius: 3 }} /> Unanswered
                    </div>
                </div>
                <button onClick={handleSubmit} style={{ marginTop: 'auto', width: '100%', padding: '11px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
                    Submit Assessment
                </button>
            </div>
        </div>
    );
}
