import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../coordinate_geometry_9.module.css';
import { LatexText } from '../../../../../../LatexText';
import { CGGraphMini } from './CGScenarioUtils';
import { useSessionLogger } from '@/hooks/useSessionLogger';

/**
 * CGScenarioPracticeEngine
 * 20-question flow: [plot + mcq×3] × 5 scenarios
 * Practice mode — immediate feedback. Wrong plot points are REJECTED with a toast.
 */
export default function CGScenarioPracticeEngine({ scenarios, title, color, onBack, nodeId }) {
    const [scenarioIdx, setScenarioIdx] = useState(0);
    const [placedPoints, setPlacedPoints] = useState([]);
    const [toast, setToast] = useState('');
    const [plotDone, setPlotDone] = useState(false);
    const [mcqStep, setMcqStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const svgRef = useRef(null);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const mcqAnswersRef = useRef([]);
    const isFinishedRef = useRef(false);

    const sc = scenarios[scenarioIdx];
    const isReadOnly = sc.readOnly === true;

    // Start session on mount
    useEffect(() => {
        startSession({ nodeId, sessionType: 'practice' });
        return () => { if (!isFinishedRef.current) abandonSession(); };
    }, []); // eslint-disable-line

    // Timer
    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    // Auto-set plotDone for readOnly scenarios
    useEffect(() => {
        if (isReadOnly) setPlotDone(true);
    }, [scenarioIdx, isReadOnly]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const TOTAL = 20;
    const phase = plotDone ? 'mcq' : 'plot';
    const globalStep = scenarioIdx * 4 + (phase === 'plot' ? 0 : 1 + mcqStep);
    const progress = (globalStep / TOTAL) * 100;

    // ── SVG CONFIG ────────────────────────────────────────────────────────────
    const SIZE = Math.min(typeof window !== 'undefined' ? window.innerWidth - 60 : 320, 340);
    const min = -10, max = 10, range = max - min;
    const toPx = (x, y) => ({ px: ((x - min) / range) * SIZE, py: (1 - (y - min) / range) * SIZE });
    const mid = SIZE / 2;

    // ── TOAST ─────────────────────────────────────────────────────────────────
    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

    // ── PLOT CLICK ────────────────────────────────────────────────────────────
    const handleSvgClick = (e) => {
        if (plotDone || isReadOnly) return;
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        const rawPx = (e.clientX - rect.left) * (SIZE / rect.width);
        const rawPy = (e.clientY - rect.top) * (SIZE / rect.height);
        const mathX = min + (rawPx / SIZE) * range;
        const mathY = min + (1 - rawPy / SIZE) * range;
        const snappedX = Math.round(mathX);
        const snappedY = Math.round(mathY);

        if (snappedX < min || snappedX > max || snappedY < min || snappedY > max) return;

        if (sc.interactionType === 'click_region') {
            let region = '';
            const tol = 0.5;
            if (Math.abs(mathX) < tol && Math.abs(mathY) < tol) region = 'Origin';
            else if (Math.abs(mathX) < tol) region = 'Y-axis';
            else if (Math.abs(mathY) < tol) region = 'X-axis';
            else if (mathX > 0 && mathY > 0) region = 'Quadrant I';
            else if (mathX < 0 && mathY > 0) region = 'Quadrant II';
            else if (mathX < 0 && mathY < 0) region = 'Quadrant III';
            else if (mathX > 0 && mathY < 0) region = 'Quadrant IV';

            if (!region || region === 'Origin') return;

            const target = sc.targetRegions[placedPoints.length];
            if (region !== target) {
                showToast('✗ Incorrect! Click on ' + target);
                return;
            }

            const next = [...placedPoints, region];
            setPlacedPoints(next);

            if (next.length === sc.targetRegions.length) {
                showToast('✅ All regions identified correctly!');
                setTimeout(() => setPlotDone(true), 800);
            }
            return;
        }

        // Already placed?
        if (placedPoints.some(p => p.x === snappedX && p.y === snappedY)) {
            showToast('⚠️ You already placed this point!');
            return;
        }

        // Is it a correct point?
        const isValid = sc.points.some(p => p.x === snappedX && p.y === snappedY);
        if (!isValid) {
            showToast('✗ Incorrect position! Check the coordinates and try again.');
            return;
        }

        // Find the matching point to get label + color
        const matchPt = sc.points.find(p => p.x === snappedX && p.y === snappedY);
        const next = [...placedPoints, { ...matchPt }];
        setPlacedPoints(next);

        if (next.length === sc.points.length) {
            showToast('✅ All points plotted correctly!');
            setTimeout(() => setPlotDone(true), 800);
        }
    };

    // ── MCQ ───────────────────────────────────────────────────────────────────
    const handleMcqSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
    };

    const handleCheckMcq = () => {
        if (selected === null || answered) return;
        setAnswered(true);
        const isCorrect = selected === sc.mcqs[mcqStep].ans;
        if (isCorrect) setScore(s => s + 1);
        const mcqGlobalIdx = scenarioIdx * 3 + mcqStep;
        mcqAnswersRef.current[mcqGlobalIdx] = {
            question_index: mcqGlobalIdx,
            answer_json: { selected, correct_answer: sc.mcqs[mcqStep].ans },
            is_correct: isCorrect,
            marks_awarded: isCorrect ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0,
        };
        logAnswer(mcqAnswersRef.current[mcqGlobalIdx]);
    };

    const handleNext = async () => {
        if (mcqStep < 2) {
            setMcqStep(s => s + 1);
            setSelected(null);
            setAnswered(false);
        } else if (scenarioIdx < scenarios.length - 1) {
            setScenarioIdx(s => s + 1);
            setPlacedPoints([]);
            setPlotDone(false);
            setMcqStep(0);
            setSelected(null);
            setAnswered(false);
            setToast('');
        } else {
            isFinishedRef.current = true;
            await finishSession({ answers_payload: mcqAnswersRef.current.filter(Boolean) });
            setFinished(true);
        }
    };

    // ── RESTART ───────────────────────────────────────────────────────────────
    const handleRetry = () => {
        mcqAnswersRef.current = [];
        isFinishedRef.current = false;
        startSession({ nodeId, sessionType: 'practice' });
        setScenarioIdx(0); setPlacedPoints([]); setPlotDone(false);
        setMcqStep(0); setSelected(null); setAnswered(false);
        setScore(0); setFinished(false); setTimeTaken(0); setToast('');
    };

    // ═══ FINISHED SCREEN ═════════════════════════════════════════════════════
    if (finished) {
        const maxMcq = scenarios.length * 3;
        const pct = Math.round((score / maxMcq) * 100);
        const msg = pct >= 85 ? '🏆 Excellent!' : pct >= 65 ? '🌟 Well done!' : '💪 Keep practising!';
        return (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 130, height: 130, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '7px solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.07)' }}>
                    <div style={{ width: 94, height: 94, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>of {maxMcq} MCQs</div>
                    </div>
                </div>
                <div style={{ display: 'inline-block', padding: '6px 16px', background: `${color}15`, color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>⏱️ {formatTime(timeTaken)}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 24px' }}>You completed {scenarios.length} graph scenarios + {score}/{maxMcq} MCQ correct.</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className={styles['btn-primary']} style={{ background: color, border: 'none' }} onClick={handleRetry}>🔀 Try Again</button>
                    <button className={styles['btn-secondary']} onClick={onBack}>Back to Skills</button>
                </div>
            </div>
        );
    }

    const mq = sc.mcqs[mcqStep];

    // ── GRID RENDERING (shared between plot + mcq) ───────────────────────────
    const renderGrid = (interactive, showAll) => {
        const gridLines = [];
        const gridLabels = [];
        for (let i = min; i <= max; i++) {
            const { px } = toPx(i, 0);
            const { py } = toPx(0, i);
            gridLines.push(<line key={`v${i}`} x1={px} y1={0} x2={px} y2={SIZE} stroke={i === 0 ? '#1e293b' : '#e2e8f0'} strokeWidth={i === 0 ? 2 : 0.5} />);
            gridLines.push(<line key={`h${i}`} x1={0} y1={py} x2={SIZE} y2={py} stroke={i === 0 ? '#1e293b' : '#e2e8f0'} strokeWidth={i === 0 ? 2 : 0.5} />);
        }
        for (let i = -10; i <= 10; i += 2) {
            if (i === 0) continue;
            const { px } = toPx(i, 0);
            const { py } = toPx(0, i);
            gridLabels.push(<text key={`lx${i}`} x={px} y={mid + 14} textAnchor="middle" fontSize={8} fill="#94a3b8">{i}</text>);
            gridLabels.push(<text key={`ly${i}`} x={mid - 5} y={py + 3} textAnchor="end" fontSize={8} fill="#94a3b8">{i}</text>);
        }
        gridLabels.push(<text key="o" x={mid - 8} y={mid + 12} textAnchor="end" fontSize={8} fill="#94a3b8">0</text>);
        gridLabels.push(<text key="X" x={SIZE - 8} y={mid - 8} textAnchor="end" fontSize={10} fill="#0f172a" fontWeight="800">X</text>);
        gridLabels.push(<text key="Y" x={mid + 8} y={14} fontSize={10} fill="#0f172a" fontWeight="800">Y</text>);

        // Add Axis Arrows
        const arr = 6;
        gridLines.push(
            <polygon key="arr-t" points={`${mid},0 ${mid-arr},${arr} ${mid+arr},${arr}`} fill="#1e293b" />,
            <polygon key="arr-b" points={`${mid},${SIZE} ${mid-arr},${SIZE-arr} ${mid+arr},${SIZE-arr}`} fill="#1e293b" />,
            <polygon key="arr-l" points={`0,${mid} ${arr},${mid-arr} ${arr},${mid+arr}`} fill="#1e293b" />,
            <polygon key="arr-r" points={`${SIZE},${mid} ${SIZE-arr},${mid-arr} ${SIZE-arr},${mid+arr}`} fill="#1e293b" />
        );

        const displayPts = (sc.interactionType === 'click_region' || showAll) ? sc.points : placedPoints;

        // Highlights for click_region
        const highlights = [];
        if (sc.interactionType === 'click_region') {
            placedPoints.forEach((region, i) => {
                const num = i + 1;
                let bx, by;

                if (region === 'Quadrant I') { highlights.push(<rect key={`h${i}`} x={mid} y={0} width={mid} height={mid} fill="#3b82f630" />); bx = mid + mid/2; by = mid/2; }
                if (region === 'Quadrant II') { highlights.push(<rect key={`h${i}`} x={0} y={0} width={mid} height={mid} fill="#3b82f630" />); bx = mid/2; by = mid/2; }
                if (region === 'Quadrant III') { highlights.push(<rect key={`h${i}`} x={0} y={mid} width={mid} height={mid} fill="#3b82f630" />); bx = mid/2; by = mid + mid/2; }
                if (region === 'Quadrant IV') { highlights.push(<rect key={`h${i}`} x={mid} y={mid} width={mid} height={mid} fill="#3b82f630" />); bx = mid + mid/2; by = mid + mid/2; }
                if (region === 'X-axis') { highlights.push(<line key={`h${i}`} x1={0} y1={mid} x2={SIZE} y2={mid} stroke="#3b82f6" strokeWidth={6} strokeOpacity={0.6} />); bx = SIZE - 30; by = mid - 15; }
                if (region === 'Y-axis') { highlights.push(<line key={`h${i}`} x1={mid} y1={0} x2={mid} y2={SIZE} stroke="#3b82f6" strokeWidth={6} strokeOpacity={0.6} />); bx = mid + 15; by = 30; }

                if (bx && by) {
                    highlights.push(
                        <g key={`hb${i}`} style={{ pointerEvents: 'none' }}>
                            <circle cx={bx} cy={by} r={12} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                            <text x={bx} y={by + 4} textAnchor="middle" fontSize={12} fill="#fff" fontWeight="800">{num}</text>
                        </g>
                    );
                }
            });
        }

        return (
            <svg ref={interactive ? svgRef : undefined} width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
                style={{ display: 'block', maxWidth: '100%', borderRadius: 8, border: '1.5px solid #cbd5e1', background: '#fff', cursor: interactive && !plotDone ? 'crosshair' : 'default' }}
                onClick={interactive ? handleSvgClick : undefined}>
                {highlights}{gridLines}{gridLabels}
                {displayPts.map((pt, i) => {
                    const { px, py } = toPx(pt.x, pt.y);
                    return (
                        <g key={i}>
                            <circle cx={px} cy={py} r={5} fill={pt.color || '#ef4444'} stroke="#fff" strokeWidth={1.5} />
                            {pt.label && <text x={px + 8} y={py - 8} fontSize={11} fill={pt.color || '#ef4444'} fontWeight="800">{pt.label}</text>}
                        </g>
                    );
                })}
            </svg>
        );
    };

    return (
        <div className={styles['quiz-container']}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <div className={styles['score-header']}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Practice</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8, display: 'inline-block', marginBottom: 4 }}>⏱️ {formatTime(timeTaken)}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color, fontWeight: 900 }}>{globalStep + 1}</span> / {TOTAL}</div>
                    </div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${color}, #818cf8)`, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            {/* ── PLOT PHASE ─────────────────────────────────────────────────── */}
            {phase === 'plot' && (
                <div className={styles['quiz-card']}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 12 }}>
                        📍 PLOT PHASE — {sc.title}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                        {/* Points to plot table */}
                        <div style={{ width: '100%' }}>
                            {sc.interactionType === 'click_region' ? (
                                <>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8, textAlign: 'center' }}>
                                        Interactive Task: Identify the required regions by clicking them on the graph.
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, justifyContent: 'center' }}>
                                        {sc.targetRegions.map((tr, i) => {
                                            const active = i === placedPoints.length;
                                            const placed = i < placedPoints.length;
                                            return (
                                                <div key={i} style={{ padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 700, border: `2px solid ${active ? color : '#cbd5e1'}`, background: placed ? color : active ? '#fff' : '#f1f5f9', color: placed ? '#fff' : active ? color : '#94a3b8', transition: 'all 0.3s', boxShadow: active ? `0 0 0 3px ${color}30` : 'none' }}>
                                                    {i + 1}. {tr} {placed ? '✓' : ''}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                                        Plot these points on the graph by clicking their positions:
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                                        {sc.points.map((pt, i) => {
                                            const placed = placedPoints.some(p => p.x === pt.x && p.y === pt.y);
                                            return (
                                                <div key={i} style={{ padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 700, border: `2px solid ${pt.color || color}`, background: placed ? (pt.color || color) : '#fff', color: placed ? '#fff' : (pt.color || color), transition: 'all 0.3s' }}>
                                                    {pt.label}({pt.x}, {pt.y}) {placed ? '✓' : ''}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Interactive SVG */}
                        {renderGrid(true, false)}

                        {/* Status */}
                        <div style={{ background: `${color}15`, padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800, color }}>
                            {sc.interactionType === 'click_region' ? `Regions identified: ${placedPoints.length} / ${sc.targetRegions.length}` : `Points placed: ${placedPoints.length} / ${sc.points.length}`}
                        </div>

                        {/* Toast */}
                        {toast && (
                            <div style={{
                                padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, textAlign: 'center',
                                background: toast.startsWith('✅') ? '#ecfdf5' : toast.startsWith('⚠') ? '#fffbeb' : '#fef2f2',
                                border: `1px solid ${toast.startsWith('✅') ? '#a7f3d0' : toast.startsWith('⚠') ? '#fde68a' : '#fca5a5'}`,
                                color: toast.startsWith('✅') ? '#059669' : toast.startsWith('⚠') ? '#b45309' : '#dc2626',
                                animation: 'fadeIn 0.3s ease'
                            }}>
                                {toast}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── MCQ PHASE ──────────────────────────────────────────────────── */}
            {phase === 'mcq' && mq && (
                <div className={styles['quiz-card']}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>
                        QUESTION {mcqStep + 1} of 3 — {sc.title}
                    </div>

                    {/* Mini graph for context */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <CGGraphMini points={sc.points} size={220} />
                    </div>

                    <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, marginBottom: 20 }}>
                        <LatexText text={mq.q} />
                    </div>

                    <div className={styles['quiz-options']}>
                        {mq.opts.map((opt, oi) => {
                            let border = 'rgba(0,0,0,0.06)', bg = '#fff', txtColor = '#0f172a', dot = '#f1f5f9';
                            if (answered) {
                                if (oi === mq.ans) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; txtColor = '#059669'; dot = '#10b981'; }
                                else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; txtColor = '#ef4444'; dot = '#ef4444'; }
                            } else if (selected === oi) { border = color; bg = `${color}05`; dot = color; }
                            return (
                                <button key={oi} onClick={() => handleMcqSelect(oi)} disabled={answered}
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${border}`, background: bg, cursor: answered ? 'default' : 'pointer', fontSize: 15, color: txtColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                                    <span><LatexText text={opt} /></span>
                                </button>
                            );
                        })}
                    </div>

                    {answered && (
                        <div style={{ marginTop: 24, padding: '14px 18px', borderRadius: 12, background: 'rgba(15,76,129,0.05)', border: '1px solid rgba(15,76,129,0.1)', color: '#64748b', fontSize: 14, lineHeight: 1.65 }}>
                            <strong style={{ color: '#0f4c81' }}>💡 Explanation: </strong><LatexText text={mq.exp} />
                        </div>
                    )}
                </div>
            )}

            {/* Action buttons */}
            {phase === 'mcq' && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                    {!answered ? (
                        <button onClick={handleCheckMcq} disabled={selected === null}
                            style={{ padding: '12px 40px', background: selected !== null ? color : '#f1f5f9', color: selected !== null ? '#fff' : '#94a3b8', cursor: selected !== null ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: selected !== null ? `0 8px 20px ${color}30` : 'none', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                            Check Answer ✓
                        </button>
                    ) : (
                        <button onClick={handleNext}
                            style={{ padding: '12px 40px', background: color, color: '#fff', cursor: 'pointer', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: `0 8px 20px ${color}30`, transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}>
                            {scenarioIdx >= scenarios.length - 1 && mcqStep >= 2 ? '🏁 See Final Score' : 'Next Question →'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
