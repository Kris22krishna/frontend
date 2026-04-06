import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../coordinate_geometry_9.module.css';
import { LatexText } from '../../../../../../LatexText';
import { CGGraphMini } from './CGScenarioUtils';
import { useSessionLogger } from '@/hooks/useSessionLogger';

/**
 * CGScenarioAssessmentEngine
 * 20-question timed assessment: [plot + mcq×3] × 5 scenarios
 * No immediate feedback. True exam mode.
 * Sidebar question palette + detailed report at the end.
 */
export default function CGScenarioAssessmentEngine({ scenarios, title, color, onBack, nodeId }) {
    // Flatten 5 scenarios × 4 steps (1 plot + 3 mcqs) = 20 global steps
    // Step types: { type: 'plot', scIdx: 0, ptCount: 5 } or { type: 'mcq', scIdx: 0, mcqIdx: 0 }
    const allSteps = [];
    scenarios.forEach((sc, scIdx) => {
        allSteps.push({ type: 'plot', scIdx, ptCount: sc.interactionType === 'click_region' ? sc.targetRegions.length : sc.points.length });
        sc.mcqs.forEach((mcq, mcqIdx) => {
            allSteps.push({ type: 'mcq', scIdx, mcqIdx });
        });
    });

    const [currentStep, setCurrentStep] = useState(0);
    // Answers: For 'plot': arrays of placed points. For 'mcq': selected index
    const [answers, setAnswers] = useState(Array(20).fill(null));
    const [marked, setMarked] = useState(new Set());
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 min
    const svgRef = useRef(null);
    const { startSession, finishSession } = useSessionLogger();
    const isFinishedRef = useRef(false);

    const stepInfo = allSteps[currentStep];
    const sc = scenarios[stepInfo.scIdx];
    const isReadOnly = sc.readOnly === true;

    // Start session on mount
    useEffect(() => {
        startSession({ nodeId, sessionType: 'assessment' });
    }, []); // eslint-disable-line

    // Finish session when assessment ends
    useEffect(() => {
        if (!finished || isFinishedRef.current) return;
        isFinishedRef.current = true;
        const mcqAnswers = allSteps.map((step, i) => {
            if (step.type !== 'mcq') return null;
            const sc = scenarios[step.scIdx];
            const mcq = sc.mcqs[step.mcqIdx];
            return {
                question_index: i,
                answer_json: { selected: answers[i] ?? null, correct_answer: mcq.ans },
                is_correct: answers[i] === mcq.ans,
                marks_awarded: answers[i] === mcq.ans ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: 0,
            };
        }).filter(Boolean);
        finishSession({ answers_payload: mcqAnswers });
    }, [finished]); // eslint-disable-line

    // Auto-answer readOnly plots
    useEffect(() => {
        if (isReadOnly && stepInfo.type === 'plot' && !answers[currentStep]) {
            const next = [...answers];
            next[currentStep] = sc.points; // pre-fill
            setAnswers(next);
        }
    }, [currentStep, isReadOnly, stepInfo.type, answers, sc.points]);

    // Timer countdown
    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => {
            setTimeLeft(s => {
                if (s <= 1) { setFinished(true); return 0; }
                return s - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [finished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // ── SVG CONFIG ────────────────────────────────────────────────────────────
    const SIZE = Math.min(typeof window !== 'undefined' ? window.innerWidth - 60 : 320, 340);
    const min = -10, max = 10, range = max - min;
    const toPx = (x, y) => ({ px: ((x - min) / range) * SIZE, py: (1 - (y - min) / range) * SIZE });
    const mid = SIZE / 2;

    const handleSvgClick = (e) => {
        if (isReadOnly || stepInfo.type !== 'plot') return;
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
            
            const currentPlaced = answers[currentStep] || [];
            
            // Allow undoing the last clicked region
            if (currentPlaced.length > 0 && currentPlaced[currentPlaced.length - 1] === region) {
                const nextPlaced = [...currentPlaced];
                nextPlaced.pop();
                const nextAns = [...answers];
                nextAns[currentStep] = nextPlaced.length ? nextPlaced : null;
                setAnswers(nextAns);
                return;
            }

            if (currentPlaced.length >= sc.targetRegions.length) return; // limit reached

            const nextAns = [...answers];
            nextAns[currentStep] = [...currentPlaced, region];
            setAnswers(nextAns);
            return;
        }

        const currentPlaced = answers[currentStep] || [];
        
        // Remove if clicking on an already placed point
        const existingIdx = currentPlaced.findIndex(p => p.x === snappedX && p.y === snappedY);
        if (existingIdx !== -1) {
            const nextPlaced = [...currentPlaced];
            nextPlaced.splice(existingIdx, 1);
            // Re-assign labels correctly so they stay in order A, B, C...
            nextPlaced.forEach((pt, i) => {
                pt.label = sc.points[i].label;
                pt.color = sc.points[i].color || '#3b82f6';
            });
            const nextAns = [...answers];
            nextAns[currentStep] = nextPlaced.length ? nextPlaced : null;
            setAnswers(nextAns);
            return;
        }

        // Add new point (up to max required)
        if (currentPlaced.length >= sc.points.length) return; // limit reached

        // Assign the next available label/color from the required points to their guess
        const targetPt = sc.points[currentPlaced.length];
        const nextPlaced = [...currentPlaced, { x: snappedX, y: snappedY, label: targetPt.label, color: targetPt.color || '#3b82f6' }];
        
        const nextAns = [...answers];
        nextAns[currentStep] = nextPlaced;
        setAnswers(nextAns);
    };

    const handleMcqSelect = (idx) => {
        const newAns = [...answers];
        newAns[currentStep] = idx;
        setAnswers(newAns);
    };

    const toggleMark = () => {
        const newMarked = new Set(marked);
        if (newMarked.has(currentStep)) newMarked.delete(currentStep);
        else newMarked.add(currentStep);
        setMarked(newMarked);
    };

    const submitAssessment = () => {
        if (window.confirm("Are you sure you want to submit your assessment?")) {
            setFinished(true);
        }
    };

    // Grid renderer
    const renderGrid = (interactive, placed = []) => {
        const gridLines = [], gridLabels = [];
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

        const displayPts = (sc.interactionType === 'click_region' && !interactive) ? sc.points : (interactive ? placed : sc.points);
        
        // Highlights for click_region
        const highlights = [];
        if (sc.interactionType === 'click_region' && interactive) {
            placed.forEach((region, i) => {
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
                style={{ display: 'block', maxWidth: '100%', borderRadius: 8, border: '1.5px solid #cbd5e1', background: '#fff', cursor: interactive ? 'crosshair' : 'default' }}
                onClick={interactive ? handleSvgClick : undefined}>
                {highlights}{gridLines}{gridLabels}
                {displayPts.map((pt, i) => {
                    const { px, py } = toPx(pt.x, pt.y);
                    return (
                        <g key={i}>
                            <circle cx={px} cy={py} r={5} fill={pt.color || '#3b82f6'} stroke="#fff" strokeWidth={1.5} />
                            {pt.label && <text x={px + 8} y={py - 8} fontSize={11} fill={pt.color || '#3b82f6'} fontWeight="800">{pt.label}</text>}
                        </g>
                    );
                })}
            </svg>
        );
    };

    // Calculate score
    let finalScore = 0;
    let scorePerStep = Array(20).fill(0); // 1 = correct, 0 = wrong
    if (finished) {
        allSteps.forEach((step, i) => {
            const sc = scenarios[step.scIdx];
            if (step.type === 'plot') {
                const userPts = answers[i] || [];
                if (sc.interactionType === 'click_region') {
                    const isCorrect = userPts.length === sc.targetRegions.length &&
                        sc.targetRegions.every((tr, idx) => userPts[idx] === tr);
                    if (isCorrect) {
                        finalScore++;
                        scorePerStep[i] = 1;
                    }
                } else {
                    // Check if userPts exactly match sc.points (ignoring order)
                    const isCorrect = userPts.length === sc.points.length && 
                        sc.points.every(rp => userPts.some(up => up.x === rp.x && up.y === rp.y));
                    if (isCorrect) {
                        finalScore++;
                        scorePerStep[i] = 1;
                    }
                }
            } else {
                const mcq = sc.mcqs[step.mcqIdx];
                if (answers[i] === mcq.ans) {
                    finalScore++;
                    scorePerStep[i] = 1;
                }
            }
        });
    }

    // ═══ FINISHED SCREEN (REPORT) ════════════════════════════════════════════
    if (finished) {
        const maxScore = 20;
        const pct = Math.round((finalScore / maxScore) * 100);
        
        return (
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px 0', fontFamily: 'Outfit, sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid #e2e8f0' }}>
                    <div style={{ fontSize: 24 }}>📊</div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', margin: 0 }}>Assessment Report</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Total Score</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#059669' }}>{finalScore}<span style={{ fontSize: 20, color: '#94a3b8' }}>/20</span></div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Accuracy</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: pct >= 70 ? '#059669' : pct >= 40 ? '#d97706' : '#ef4444' }}>{pct}%</div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Time Taken</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#0f4c81' }}>⏱️ {formatTime(20 * 60 - timeLeft)}</div>
                    </div>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Question Breakdown</h3>
                
                <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    {allSteps.map((step, i) => {
                        const isCorrect = scorePerStep[i] === 1;
                        const userAns = answers[i];
                        const sC = scenarios[step.scIdx];
                        
                        return (
                            <div key={i} style={{ padding: '20px', borderBottom: i < 19 ? '1px solid #e2e8f0' : 'none', background: isCorrect ? '#f8fafc' : '#fff' }}>
                                <div style={{ display: 'flex', gap: 16 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: isCorrect ? '#10b981' : '#ef4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, flexShrink: 0 }}>
                                        {i + 1}
                                    </div>
                                    <div style={{ flex: 1, fontFamily: 'Open Sans, sans-serif' }}>
                                        {step.type === 'plot' ? (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Plotting Phase: {sC.title}</div>
                                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', background: isCorrect ? '#ecfdf5' : '#fef2f2', padding: '4px 10px', borderRadius: 20 }}>
                                                        {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
                                                    {sC.interactionType === 'click_region' 
                                                        ? `Task: Identify ${sC.targetRegions.join(', ')}` 
                                                        : `Task: Plot the points ${sC.points.map(p => `(${p.x}, ${p.y})`).join(', ')}`
                                                    }
                                                </div>
                                                <div style={{ display: 'flex', gap: 20 }}>
                                                    <div>
                                                        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#64748b' }}>Your Plot</div>
                                                        <CGGraphMini userPoints={userAns || []} size={150} />
                                                    </div>
                                                    {!isCorrect && (
                                                        <div>
                                                            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: '#059669' }}>Correct Plot</div>
                                                            <CGGraphMini points={sC.interactionType === 'click_region' ? sC.targetRegions : sC.points} size={150} />
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>
                                                        <LatexText text={sC.mcqs[step.mcqIdx].q} />
                                                    </div>
                                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', background: isCorrect ? '#ecfdf5' : '#fef2f2', padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
                                                        {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                                                    </div>
                                                </div>
                                                
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                                                    {sC.mcqs[step.mcqIdx].opts.map((opt, oi) => {
                                                        const isActualAns = sC.mcqs[step.mcqIdx].ans === oi;
                                                        const isUserAns = userAns === oi;
                                                        let border = '#e2e8f0', bg = '#f8fafc';
                                                        if (isActualAns) { border = '#10b981'; bg = '#ecfdf5'; }
                                                        else if (isUserAns && !isCorrect) { border = '#ef4444'; bg = '#fef2f2'; }
                                                        
                                                        return (
                                                            <div key={oi} style={{ padding: '10px 14px', borderRadius: 8, border: `2px solid ${border}`, background: bg, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                                <div style={{ width: 16, height: 16, borderRadius: '50%', background: isActualAns ? '#10b981' : (isUserAns && !isCorrect) ? '#ef4444' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff' }}>
                                                                    {isActualAns ? '✓' : (isUserAns && !isCorrect) ? '✗' : ''}
                                                                </div>
                                                                <LatexText text={opt} />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                
                                                {!isCorrect && userAns === null && (
                                                    <div style={{ marginTop: 8, fontSize: 13, color: '#ef4444', fontWeight: 600 }}>Unanswered</div>
                                                )}
                                                
                                                <div style={{ marginTop: 12, fontSize: 13, color: '#64748b', background: '#f1f5f9', padding: '10px 14px', borderRadius: 8 }}>
                                                    <LatexText text={`💡 **Explanation:** ${sC.mcqs[step.mcqIdx].exp}`} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <button className={styles['btn-secondary']} onClick={onBack} style={{ padding: '14px 40px', fontSize: 16, fontFamily: 'Outfit, sans-serif' }}>← Return to Skills</button>
                </div>
            </div>
        );
    }

    // ═══ ACTIVE EXAM VIEW ════════════════════════════════════════════
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 24, minHeight: isMobile ? 'auto' : 'min(800px, 85vh)', fontFamily: 'Outfit, sans-serif' }}>
            
            {/* MAIN CONTENT AREA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                
                {/* Header Strip */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>Assessment</div>
                        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ fontSize: 16, color: timeLeft < 120 ? '#ef4444' : '#0f172a', fontWeight: 800, background: timeLeft < 120 ? '#fef2f2' : '#fff', border: `2px solid ${timeLeft < 120 ? '#fecaca' : '#e2e8f0'}`, padding: '8px 16px', borderRadius: 50, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span>⏱️</span> {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>

                {/* Question Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px', fontFamily: 'Open Sans, sans-serif' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f1f5f9', padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 800, color: '#475569' }}>
                            <span style={{ color: color }}>● {stepInfo.type.toUpperCase()}</span> — {sc.title}
                        </div>
                        <button onClick={toggleMark} style={{ padding: '8px 16px', borderRadius: 50, border: `2px solid ${marked.has(currentStep) ? '#f59e0b' : '#e2e8f0'}`, background: marked.has(currentStep) ? '#fffbeb' : '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: marked.has(currentStep) ? '#b45309' : '#64748b', transition: 'all 0.2s', display: 'flex', gap: 6 }}>
                            <span>🔖</span> {marked.has(currentStep) ? 'Marked for Review' : 'Mark for Review'}
                        </button>
                    </div>

                    {stepInfo.type === 'plot' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 600, margin: '0 auto' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 24, textAlign: 'center' }}>
                                {sc.interactionType === 'click_region' ? `Interactive Task: Identify the following ${sc.targetRegions.length} regions` : `Interactive Task: Plot the following ${sc.points.length} points on the graph`}
                            </h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
                                {sc.interactionType === 'click_region' ? (
                                    sc.targetRegions.map((tr, i) => {
                                        const userPts = answers[currentStep] || [];
                                        const active = i === userPts.length;
                                        const placed = i < userPts.length;
                                        return (
                                            <div key={i} style={{ padding: '8px 16px', borderRadius: 50, fontSize: 14, fontWeight: 700, border: `2px solid ${active ? color : '#cbd5e1'}`, background: placed ? color : active ? '#fff' : '#f1f5f9', color: placed ? '#fff' : active ? color : '#94a3b8', transition: 'all 0.3s', boxShadow: active ? `0 0 0 3px ${color}30` : 'none' }}>
                                                {i + 1}. {tr} {placed && '✓'}
                                            </div>
                                        );
                                    })
                                ) : (
                                    sc.points.map((pt, i) => {
                                        const userPts = answers[currentStep] || [];
                                        const placed = userPts.length > i; // roughly just show checkmarks as they place ANY points
                                        return (
                                            <div key={i} style={{ padding: '8px 16px', borderRadius: 50, fontSize: 14, fontWeight: 700, background: placed ? '#3b82f6' : '#f1f5f9', color: placed ? '#fff' : '#475569', border: `2px solid ${placed ? '#3b82f6' : '#cbd5e1'}` }}>
                                                {pt.label}({pt.x}, {pt.y}) {placed && '✓'}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            {renderGrid(!isReadOnly, answers[currentStep] || [])}
                            
                            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                <div style={{ textAlign: 'center', color: '#64748b', fontSize: 13, fontWeight: 600 }}>
                                    {sc.interactionType === 'click_region' ? 'Click the graph to identify the target region. Click a highlighted region to undo.' : 'Click the graph to place a point. Click a placed point to remove it.'}
                                </div>
                                {(!isReadOnly && (answers[currentStep] || []).length > 0) && (
                                    <button onClick={() => {
                                        if (window.confirm('Are you sure you want to clear this graphic?')) {
                                            const newAns = [...answers];
                                            newAns[currentStep] = null;
                                            setAnswers(newAns);
                                        }
                                    }} style={{ padding: '8px 20px', borderRadius: 50, border: '2px solid #e2e8f0', background: '#fff', fontSize: 14, fontWeight: 700, color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                                        <span style={{ fontSize: 16 }}>🗑️</span> Clear Graphic
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={{ maxWidth: 700, margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                                {(() => {
                                    const pIdx = allSteps.findIndex(s => s.type === 'plot' && s.scIdx === stepInfo.scIdx);
                                    const userPlots = answers[pIdx] || [];
                                    return <CGGraphMini points={sc.points} userPoints={userPlots} size={220} />;
                                })()}
                            </div>

                            <div style={{ fontSize: 20, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 32 }}>
                                <LatexText text={sc.mcqs[stepInfo.mcqIdx].q} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {sc.mcqs[stepInfo.mcqIdx].opts.map((opt, oi) => {
                                    const isSel = answers[currentStep] === oi;
                                    return (
                                        <button key={oi} onClick={() => handleMcqSelect(oi)}
                                            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 16, border: `2.5px solid ${isSel ? color : '#e2e8f0'}`, background: isSel ? `${color}08` : '#fff', cursor: 'pointer', fontSize: 16, color: '#0f172a', textAlign: 'left', transition: 'all 0.2s', fontWeight: isSel ? 700 : 500 }}>
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${isSel ? color : '#cbd5e1'}`, background: isSel ? color : '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {isSel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                                            </div>
                                            <span><LatexText text={opt} /></span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div style={{ padding: '20px 32px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', background: '#f8fafc' }}>
                    <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0}
                        style={{ padding: '12px 24px', borderRadius: 100, border: '2px solid #cbd5e1', background: '#fff', color: currentStep === 0 ? '#94a3b8' : '#475569', fontSize: 15, fontWeight: 700, cursor: currentStep === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                        ← Previous
                    </button>
                    
                    {currentStep < 19 ? (
                        <button onClick={() => setCurrentStep(s => Math.min(19, s + 1))}
                            style={{ padding: '12px 32px', borderRadius: 100, border: 'none', background: color, color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 12px ${color}40`, transition: 'all 0.2s' }}>
                            Next Question →
                        </button>
                    ) : (
                        <button onClick={submitAssessment}
                            style={{ padding: '12px 32px', borderRadius: 100, border: 'none', background: '#10b981', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 12px rgba(16,185,129,0.4)`, transition: 'all 0.2s' }}>
                            Submit Assessment ✓
                        </button>
                    )}
                </div>
            </div>

            {/* RIGHT SIDEBAR — Question Palette */}
            <div style={{ width: isMobile ? '100%' : 300, background: '#fff', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexShrink: 0, overflow: 'hidden', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                <div style={{ padding: isMobile ? '16px' : '24px 24px 20px', borderBottom: isMobile ? 'none' : '1px solid #e2e8f0', background: '#f8fafc', width: '100%' }}>
                    <h3 style={{ fontSize: isMobile ? 15 : 18, fontWeight: 900, color: '#0f172a', margin: '0 0 16px' }}>Question Palette</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(10, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 6 : 10 }}>
                        {allSteps.map((_, i) => {
                            const isCurrent = currentStep === i;
                            const isAns = answers[i] !== null && (allSteps[i].type === 'mcq' || (answers[i] && answers[i].length > 0));
                            const isMark = marked.has(i);
                            
                            let bg = '#fff', borderColor = '#e2e8f0', textColor = '#64748b';
                            
                            if (isCurrent) {
                                borderColor = color;
                                textColor = color;
                            } 
                            if (isAns) {
                                bg = `${color}15`;
                                borderColor = isCurrent ? color : `${color}40`;
                                textColor = color;
                            }
                            if (isMark) {
                                bg = '#fffbeb';
                                borderColor = '#f59e0b';
                                textColor = '#d97706';
                            }
                            if (isAns && isMark) {
                                bg = '#fffbeb';
                                borderColor = '#f59e0b';
                                textColor = '#d97706';
                            }

                            return (
                                <button key={i} onClick={() => setCurrentStep(i)}
                                    style={{
                                        position: 'relative', height: 44, borderRadius: 10, fontSize: 15, fontWeight: isCurrent ? 900 : 700,
                                        background: bg, border: `2px solid ${borderColor}`, color: textColor,
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: isCurrent ? `0 0 0 2px ${color}30` : 'none',
                                        transition: 'all 0.1s'
                                    }}>
                                    {i + 1}
                                    {isMark && <div style={{ position: 'absolute', top: -5, right: -5, background: '#f59e0b', width: 14, height: 14, borderRadius: '50%', border: '2px solid #fff' }} />}
                                    {isAns && !isMark && <div style={{ position: 'absolute', top: -4, right: -4, background: color, width: 12, height: 12, borderRadius: '50%', border: '2px solid #fff' }} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
                
                {!isMobile && <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, fontWeight: 600, color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: `${color}15`, border: `2px solid ${color}40` }} /> Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: '2px solid #e2e8f0' }} /> Not Answered
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fffbeb', border: '2px solid #f59e0b' }} /> Marked for Review
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: `2px solid ${color}` }} /> Current Target
                    </div>
                </div>}

                {!isMobile && <div style={{ padding: '24px', marginTop: 'auto', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <button onClick={submitAssessment}
                        style={{ width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', background: '#10b981', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', transition: 'transform 0.2s' }}>
                        Submit Finish
                    </button>
                </div>}
            </div>
        </div>
    );
}
