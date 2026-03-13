import React, { useState, useEffect } from 'react';
import { generateLGScenarios, GraphMini } from './LinearGraphUtils';
import '../../graphs.css';

/**
 * LinearGraphPracticeEngine
 * 20-question flow: [plot, mcq, mcq, mcq] × 5 scenarios
 * Practice mode — immediate feedback on MCQs. Points are validated (must be from table).
 */
export default function LinearGraphPracticeEngine({ color, onBack }) {
    const [scenarios, setScenarios] = useState(() => generateLGScenarios());
    const [scenarioIdx, setScenarioIdx] = useState(0);
    const [xScale, setXScale] = useState(null);
    const [yScale, setYScale] = useState(null);
    const [placedPoints, setPlacedPoints] = useState([]);
    const [toast, setToast] = useState('');
    const [plotDone, setPlotDone] = useState(false);
    const [mcqStep, setMcqStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    // Count-up timer
    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const sc = scenarios[scenarioIdx];
    const TOTAL = 20;
    const phase = plotDone ? 'mcq' : 'plot';
    const globalStep = scenarioIdx * 4 + (phase === 'plot' ? 0 : 1 + mcqStep);
    const progress = (globalStep / TOTAL) * 100;

    const isXScaleValid = xScale ? sc.points.every(p => Math.abs((p.x - sc.xMin) % xScale) < 0.001) : null;
    const isYScaleValid = yScale ? sc.points.every(p => Math.abs((p.y - sc.yMin) % yScale) < 0.001) : null;

    useEffect(() => {
        setXScale(sc.xScaleOpts.length === 1 ? sc.xScaleOpts[0].v : null);
        setYScale(null);
        setPlacedPoints([]);
        setPlotDone(false);
        setMcqStep(0);
        setSelected(null);
        setAnswered(false);
        setToast('');
    }, [scenarioIdx]);

    const SVG_W = 390, SVG_H = 310;
    const PAD_L = 52, PAD_B = 42, PAD_T = 14, PAD_R = 14;
    const plotW = SVG_W - PAD_L - PAD_R;
    const plotH = SVG_H - PAD_T - PAD_B;
    const { xMin, xMax, yMin, yMax } = sc;
    const xStep = xScale || sc.xScaleOpts[0].v;
    const yStep = yScale || sc.yScaleOpts[0].v;

    const toPixel = (dx, dy) => ({
        px: PAD_L + ((dx - xMin) / (xMax - xMin)) * plotW,
        py: PAD_T + (1 - (dy - yMin) / (yMax - yMin)) * plotH,
    });

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2400); };

    const handleSvgClick = (e) => {
        if (plotDone) return;
        if (!xScale || !yScale) { showToast('Please select both X and Y axis scales first.'); return; }
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const rawPx = (e.clientX - rect.left) * (SVG_W / rect.width);
        const rawPy = (e.clientY - rect.top) * (SVG_H / rect.height);
        const rawX = xMin + ((rawPx - PAD_L) / plotW) * (xMax - xMin);
        const rawY = yMin + (1 - (rawPy - PAD_T) / plotH) * (yMax - yMin);
        const snapped = { x: Math.round(rawX / xStep) * xStep, y: Math.round(rawY / yStep) * yStep };
        if (snapped.x < xMin || snapped.x > xMax || snapped.y < yMin || snapped.y > yMax) return;
        if (placedPoints.some(p => Math.abs(p.x - snapped.x) < 0.001 && Math.abs(p.y - snapped.y) < 0.001)) {
            showToast('You already placed this point!'); return;
        }
        const isValidPt = sc.points.some(p => Math.abs(p.x - snapped.x) < 0.001 && Math.abs(p.y - snapped.y) < 0.001);
        if (!isValidPt) {
            if (isXScaleValid === false || isYScaleValid === false) {
                showToast('⚠️ Wrong scale — data points don\'t land on grid lines. Try a different scale.');
            } else {
                showToast('✗ Not a data point from the table. Check the values and try again.');
            }
            return;
        }
        const next = [...placedPoints, snapped];
        setPlacedPoints(next);
        if (next.length === sc.points.length) setTimeout(() => setPlotDone(true), 600);
    };

    const handleMcqSelect = (idx) => {
        if (answered) return;
        setSelected(idx); setAnswered(true);
        if (idx === sc.mcqs[mcqStep].ans) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (mcqStep < 2) { setMcqStep(s => s + 1); setSelected(null); setAnswered(false); }
        else if (scenarioIdx < scenarios.length - 1) { setScenarioIdx(s => s + 1); }
        else { setFinished(true); }
    };

    const xTicks = [];
    for (let gx = xMin; gx <= xMax; gx += xStep) { const { px } = toPixel(gx, yMin); xTicks.push({ px, label: gx }); }
    const yTicks = [];
    for (let gy = yMin; gy <= yMax; gy += yStep) { const { py } = toPixel(xMin, gy); yTicks.push({ py, label: gy }); }
    const sortedPlaced = [...placedPoints].sort((a, b) => a.x - b.x);

    // ── FINISHED SCREEN ───────────────────────────────────────────────────────
    if (finished) {
        const pct = Math.round((score / 15) * 100);
        const msg = pct >= 85 ? '🏆 Excellent!' : pct >= 65 ? '🌟 Well done!' : '💪 Keep practising!';
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 130, height: 130, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '7px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.07)' }}>
                    <div style={{ width: 94, height: 94, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>of 15 MCQs</div>
                    </div>
                </div>
                <div style={{ display: 'inline-block', padding: '6px 16px', background: `${color}15`, color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>
                <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 26, fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 24px' }}>You completed all 5 graph-plotting activities + {score}/15 MCQ questions correct.</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="grph-btn-primary" style={{ background: color }} onClick={() => { setScenarioIdx(0); setScore(0); setFinished(false); setTimeTaken(0); }}>Try Again</button>
                    <button className="grph-btn-secondary" onClick={onBack}>Back to Skills</button>
                </div>
            </div>
        );
    }

    const mq = sc.mcqs[mcqStep];

    return (
        <div className="lg-practice-root">
            {/* Header + Timer */}
            <div style={{ marginBottom: 20 }}>
                <div className="grph-score-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Practice</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>Application of Linear Graphs</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block', marginBottom: 4 }}>
                            ⏱️ {formatTime(timeTaken)}
                        </div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>
                            Q <span style={{ color, fontWeight: 900 }}>{globalStep + 1}</span> / {TOTAL}
                        </div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${color}, #818cf8)`, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* ── PLOT PHASE ─────────────────────────────────────────────────── */}
            {phase === 'plot' && (
                <div style={{ background: '#fff', borderRadius: 16, padding: '16px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
                    {/* Step badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 800, color, marginBottom: 12 }}>
                        GRAPH PLOT — Scenario {scenarioIdx + 1}
                    </div>
                    <div className="grph-assess-plot-layout">
                        {/* Left: info + table + scales */}
                        <div style={{ overflowY: 'auto' }}>
                            <h4 style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{sc.title}</h4>
                            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10 }}>Select your scale, then click each point on the graph to plot it. <span style={{ fontWeight: 700, color }}>Swipe to plot the graph.</span></div>
                            <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                                <table style={{ borderCollapse: 'collapse', fontSize: 12, minWidth: 400 }}>
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
                                <div style={{ fontSize: 11, fontWeight: 800, color: '#374151', marginBottom: 5 }}>X-axis: 1 unit = ?</div>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {sc.xScaleOpts.map((opt, i) => {
                                        const isSelected = xScale === opt.v;
                                        const valid = isSelected ? sc.points.every(p => Math.abs((p.x - sc.xMin) % opt.v) < 0.001) : null;
                                        return (
                                            <button key={i} onClick={() => setXScale(opt.v)}
                                                style={{ padding: '5px 11px', borderRadius: 8, border: `2px solid ${isSelected ? (valid === false ? '#f59e0b' : color) : '#e2e8f0'}`, background: isSelected ? (valid === false ? '#fffbeb' : `${color}12`) : '#f8fafc', color: isSelected ? (valid === false ? '#b45309' : color) : '#374151', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                                                {isSelected ? '✓ ' : ''}{opt.label}{isSelected && valid === false ? ' ⚠️' : ''}
                                            </button>
                                        );
                                    })}
                                </div>
                                {isXScaleValid === false && <div style={{ marginTop: 5, fontSize: 11, color: '#b45309', fontWeight: 600 }}>⚠️ Some X values don't align to grid lines with this scale.</div>}
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: '#374151', marginBottom: 5 }}>Y-axis: 1 unit = ?</div>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {sc.yScaleOpts.map((opt, i) => {
                                        const isSelected = yScale === opt.v;
                                        const valid = isSelected ? sc.points.every(p => Math.abs((p.y - sc.yMin) % opt.v) < 0.001) : null;
                                        return (
                                            <button key={i} onClick={() => setYScale(opt.v)}
                                                style={{ padding: '5px 11px', borderRadius: 8, border: `2px solid ${isSelected ? (valid === false ? '#f59e0b' : color) : '#e2e8f0'}`, background: isSelected ? (valid === false ? '#fffbeb' : `${color}12`) : '#f8fafc', color: isSelected ? (valid === false ? '#b45309' : color) : '#374151', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>
                                                {isSelected ? '✓ ' : ''}{opt.label}{isSelected && valid === false ? ' ⚠️' : ''}
                                            </button>
                                        );
                                    })}
                                </div>
                                {isYScaleValid === false && <div style={{ marginTop: 5, fontSize: 11, color: '#b45309', fontWeight: 600 }}>⚠️ Some Y values don't align to grid lines with this scale.</div>}
                            </div>
                            {xScale && yScale
                                ? <div style={{ background: `${color}15`, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800, color, display: 'inline-block' }}>Points placed: {placedPoints.length} / {sc.points.length}</div>
                                : <div style={{ fontSize: 11, color: '#94a3b8', fontStyle: 'italic' }}>Select both scales to start plotting →</div>}
                            {toast && <div style={{ marginTop: 8, background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600 }}>{toast}</div>}
                        </div>
                        {/* Right: SVG graph */}
                        <div style={{ background: '#f8fafc', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: 6, alignSelf: 'start', overflowX: 'auto' }}>
                            <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                                style={{ cursor: xScale && yScale ? 'crosshair' : 'default', display: 'block', maxWidth: '100%' }}
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
                                    return (
                                        <g key={`pt${i}`}>
                                            <circle cx={px} cy={py} r={5} fill={color} stroke="#fff" strokeWidth={2} />
                                            <text x={px + 7} y={py - 5} fontSize={8} fill={color} fontWeight="700">({p.x},{p.y})</text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            {/* ── MCQ PHASE ─────────────────────────────────────────────────────── */}
            {phase === 'mcq' && (
                <div style={{ background: '#fff', borderRadius: 16, padding: '16px 20px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
                    {/* Step badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 800, color, marginBottom: 12 }}>
                        QUESTION {globalStep + 1}
                    </div>
                    <div className="grph-assess-mcq-layout">
                        {/* Left: mini graph */}
                        <div className="lg-practice-minigraph" style={{ background: '#f8fafc', borderRadius: 12, border: '1.5px solid #e2e8f0', padding: '10px', alignSelf: 'start' }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color, textTransform: 'uppercase', marginBottom: 6 }}>📊 {sc.title}</div>
                            <div style={{ overflowX: 'auto' }}>
                                <GraphMini scenario={sc} xGridStep={xScale} yGridStep={yScale} color={color} />
                            </div>
                            <div style={{ marginTop: 6, padding: '6px 10px', background: `${color}0d`, borderRadius: 8, fontSize: 11, color: '#64748b', fontWeight: 600 }}>
                                <span style={{ color, fontWeight: 800 }}>Eq: </span>{sc.eq}
                            </div>
                        </div>
                        {/* Right: question + options + feedback + next */}
                        <div className="lg-practice-mcqcard" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>{mq.q}</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                {mq.opts.map((opt, oi) => {
                                    let borderC = 'rgba(0,0,0,0.06)', bgC = '#fff', textC = '#0f172a';
                                    if (answered) {
                                        if (oi === mq.ans) { borderC = '#059669'; bgC = 'rgba(5,150,105,0.06)'; textC = '#059669'; }
                                        else if (oi === selected) { borderC = '#ef4444'; bgC = 'rgba(239,68,68,0.05)'; textC = '#ef4444'; }
                                    } else if (selected === oi) { borderC = color; bgC = `${color}06`; }
                                    return (
                                        <button key={oi} onClick={() => handleMcqSelect(oi)} disabled={answered}
                                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2.5px solid ${borderC}`, background: bgC, cursor: answered ? 'default' : 'pointer', fontSize: 14, color: textC, textAlign: 'left', fontWeight: selected === oi ? 700 : 500 }}>
                                            <div style={{ width: 9, height: 9, borderRadius: '50%', background: answered && oi === mq.ans ? '#059669' : answered && oi === selected ? '#ef4444' : borderC, flexShrink: 0 }} />
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                            {answered && (
                                <div style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.12)', fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
                                    <strong style={{ color: '#059669' }}>💡 </strong>{mq.exp}
                                </div>
                            )}
                            <div>
                                <button onClick={handleNext} disabled={!answered} className="grph-btn-primary"
                                    style={{ background: color, opacity: answered ? 1 : 0.4, cursor: answered ? 'pointer' : 'not-allowed', padding: '11px 32px' }}>
                                    {scenarioIdx === scenarios.length - 1 && mcqStep === 2 ? 'See Final Score' : mcqStep < 2 ? 'Next Question →' : 'Next Graph →'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
