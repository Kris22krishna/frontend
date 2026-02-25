import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixGrid from './MatrixGrid';

/**
 * DotProductAnimator — visually steps through row_i × col_k of A·B.
 *
 * Props
 * ─────────────────────────────────────────────────────
 * A           : number[][]
 * B           : number[][]
 * targetI     : number (0-based row in A)
 * targetK     : number (0-based col in B)
 * autoPlay    : boolean (false)
 * onComplete  : () => void
 */
const DotProductAnimator = ({ A, B, targetI = 0, targetK = 0, autoPlay = false, onComplete }) => {
    const n = A[0].length; // inner dimension
    const [step, setStep] = useState(-1); // -1 = not started, 0..n-1 = terms, n = done
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    const terms = Array.from({ length: n }, (_, idx) => ({
        a: A[targetI][idx],
        b: B[idx][targetK],
        product: A[targetI][idx] * B[idx][targetK],
    }));

    const runningTotal = terms.slice(0, step + 1).reduce((sum, t) => sum + t.product, 0);
    const finalValue = terms.reduce((sum, t) => sum + t.product, 0);
    const isDone = step >= n;

    const advance = useCallback(() => {
        setStep((prev) => {
            const next = prev + 1;
            if (next > n) {
                if (onComplete) onComplete();
                return prev;
            }
            return next;
        });
    }, [n, onComplete]);

    const reset = useCallback(() => {
        setStep(-1);
        setIsPlaying(false);
    }, []);

    // Auto-play timer
    React.useEffect(() => {
        if (!isPlaying || isDone) return;
        const timer = setTimeout(advance, 1200);
        return () => clearTimeout(timer);
    }, [isPlaying, step, isDone, advance]);

    const startPlay = () => {
        setStep(-1);
        setIsPlaying(true);
        setTimeout(() => setStep(0), 200);
    };

    return (
        <div style={{ padding: '20px 0' }}>
            {/* Matrix displays */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366F1', marginBottom: 8, textAlign: 'center' }}>Matrix A</div>
                    <MatrixGrid
                        rows={A.length}
                        cols={A[0].length}
                        values={A}
                        highlightRow={step >= 0 && !isDone ? targetI : null}
                    />
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#64748b', alignSelf: 'center' }}>×</div>
                <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B82F6', marginBottom: 8, textAlign: 'center' }}>Matrix B</div>
                    <MatrixGrid
                        rows={B.length}
                        cols={B[0].length}
                        values={B}
                        highlightCol={step >= 0 && !isDone ? targetK : null}
                    />
                </div>
            </div>

            {/* Step-by-step breakdown */}
            <div style={{
                background: '#F8FAFC',
                borderRadius: 16,
                padding: '20px',
                border: '2px solid #E2E8F0',
                maxWidth: 500,
                margin: '0 auto',
            }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#31326F', marginBottom: 12 }}>
                    Computing c<sub>{targetI + 1},{targetK + 1}</sub> = Row {targetI + 1} · Column {targetK + 1}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <AnimatePresence>
                        {terms.map((term, idx) => (
                            idx <= step && (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '8px 12px',
                                        borderRadius: 10,
                                        background: idx === step ? '#EEF2FF' : '#fff',
                                        border: `1.5px solid ${idx === step ? '#818CF8' : '#E2E8F0'}`,
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    <span style={{ color: '#F59E0B', fontWeight: 700, minWidth: 24 }}>a<sub>{targetI + 1},{idx + 1}</sub></span>
                                    <span style={{ color: '#64748b' }}>×</span>
                                    <span style={{ color: '#3B82F6', fontWeight: 700, minWidth: 24 }}>b<sub>{idx + 1},{targetK + 1}</sub></span>
                                    <span style={{ color: '#64748b' }}>=</span>
                                    <span style={{ fontWeight: 600 }}>{term.a} × {term.b}</span>
                                    <span style={{ color: '#64748b' }}>=</span>
                                    <span style={{ fontWeight: 700, color: '#10B981' }}>{term.product}</span>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>

                {/* Running total / final */}
                {step >= 0 && (
                    <motion.div
                        key={`total-${step}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            marginTop: 16,
                            padding: '10px 16px',
                            borderRadius: 12,
                            background: isDone ? '#D1FAE5' : '#FEF3C7',
                            border: `2px solid ${isDone ? '#10B981' : '#F59E0B'}`,
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            textAlign: 'center',
                            color: isDone ? '#065F46' : '#92400E',
                        }}
                    >
                        {isDone ? (
                            <>c<sub>{targetI + 1},{targetK + 1}</sub> = {finalValue} ✓</>
                        ) : (
                            <>Running total: {runningTotal}</>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
                {step < 0 ? (
                    <button
                        onClick={startPlay}
                        style={{
                            padding: '10px 24px',
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                            color: '#fff',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                        }}
                    >
                        ▶ Animate Steps
                    </button>
                ) : !isDone ? (
                    <button
                        onClick={advance}
                        style={{
                            padding: '10px 24px',
                            borderRadius: 12,
                            background: '#4F46E5',
                            color: '#fff',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                        }}
                    >
                        Next Step →
                    </button>
                ) : null}
                {step >= 0 && (
                    <button
                        onClick={reset}
                        style={{
                            padding: '10px 24px',
                            borderRadius: 12,
                            background: '#F1F5F9',
                            color: '#64748b',
                            fontWeight: 700,
                            border: '2px solid #E2E8F0',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                        }}
                    >
                        ↺ Reset
                    </button>
                )}
            </div>
        </div>
    );
};

export default React.memo(DotProductAnimator);
