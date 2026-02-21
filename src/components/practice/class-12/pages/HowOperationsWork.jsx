import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LatexText } from '../../../LatexText';
import MatrixGrid from '../components/MatrixGrid';
import DotProductAnimator from '../components/DotProductAnimator';
import QuizEngine from '../components/QuizEngine';

/* ─── Collapsible section ─── */
const Section = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div style={{
            background: '#fff', borderRadius: 20, border: '2px solid #E2E8F0',
            marginBottom: 20, overflow: 'hidden',
        }}>
            <button onClick={() => setOpen(!open)} style={{
                width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h2>
                {open ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: '0 24px 24px' }}>{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── Transpose utility ─── */
const transpose = (M) => M[0].map((_, j) => M.map(row => row[j]));

/* ─── Quiz questions (10 total across 3 levels) ─── */
const QUIZ_QUESTIONS = [
    // Level A: Addition & Scalar (Q1-Q4)
    {
        id: 'op1',
        text: 'Compute $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} + \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$',
        options: [
            '$\\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$',
            '$\\begin{bmatrix} 5 & 12 \\\\ 21 & 32 \\end{bmatrix}$',
            '$\\begin{bmatrix} 4 & 4 \\\\ 4 & 4 \\end{bmatrix}$',
            '$\\begin{bmatrix} 6 & 6 \\\\ 6 & 6 \\end{bmatrix}$',
        ],
        correctAnswer: '$\\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$',
        solution: `Add corresponding elements:
$1+5=6$, $2+6=8$, $3+7=10$, $4+8=12$.
Result: $\\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$.`,
        hints: ['Add each element at the same position.'],
    },
    {
        id: 'op2',
        text: 'Calculate $3 \\times \\begin{bmatrix} 2 & -1 \\\\ 0 & 4 \\end{bmatrix}$',
        options: [
            '$\\begin{bmatrix} 6 & -3 \\\\ 0 & 12 \\end{bmatrix}$',
            '$\\begin{bmatrix} 5 & 2 \\\\ 3 & 7 \\end{bmatrix}$',
            '$\\begin{bmatrix} 6 & -1 \\\\ 0 & 4 \\end{bmatrix}$',
            '$\\begin{bmatrix} 2 & -3 \\\\ 0 & 12 \\end{bmatrix}$',
        ],
        correctAnswer: '$\\begin{bmatrix} 6 & -3 \\\\ 0 & 12 \\end{bmatrix}$',
        solution: `Multiply each element by the scalar 3:
$3 \\times 2=6$, $3 \\times (-1)=-3$, $3 \\times 0=0$, $3 \\times 4=12$.`,
        hints: ['Multiply every element by 3.'],
    },
    {
        id: 'op3',
        text: 'Compute $\\begin{bmatrix} 5 & 3 \\\\ 1 & 7 \\end{bmatrix} - \\begin{bmatrix} 2 & 1 \\\\ 4 & 3 \\end{bmatrix}$',
        options: [
            '$\\begin{bmatrix} 3 & 2 \\\\ -3 & 4 \\end{bmatrix}$',
            '$\\begin{bmatrix} 7 & 4 \\\\ 5 & 10 \\end{bmatrix}$',
            '$\\begin{bmatrix} 3 & 2 \\\\ 3 & 4 \\end{bmatrix}$',
            '$\\begin{bmatrix} -3 & -2 \\\\ 3 & -4 \\end{bmatrix}$',
        ],
        correctAnswer: '$\\begin{bmatrix} 3 & 2 \\\\ -3 & 4 \\end{bmatrix}$',
        solution: `Subtract corresponding elements:
$5-2=3$, $3-1=2$, $1-4=-3$, $7-3=4$.`,
        hints: ['Subtract each element at the same position.'],
    },
    {
        id: 'op4',
        text: 'Can we add $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$?',
        options: ['No, dimensions don\'t match', 'Yes, result is $2 \\times 3$', 'Yes, result is $2 \\times 2$', 'Yes, result is $2 \\times 5$'],
        correctAnswer: 'No, dimensions don\'t match',
        solution: `Matrix addition requires both matrices to have the same order.
First matrix: $2 \\times 2$. Second matrix: $2 \\times 3$.
Since $2 \\neq 3$ (columns differ), addition is not possible.`,
        hints: ['Both matrices must have the same dimensions for addition.'],
    },
    // Level B: Multiplication entries (Q5-Q7)
    {
        id: 'op5',
        text: 'For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, find the $(1,1)$ entry of $AB$.',
        options: ['$19$', '$5$', '$23$', '$17$'],
        correctAnswer: '$19$',
        solution: `$(AB)_{1,1}$ = Row 1 of A · Column 1 of B
$= 1 \\times 5 + 2 \\times 7$
$= 5 + 14 = 19$`,
        hints: ['Dot product of row 1 of A with column 1 of B.', 'Multiply matching elements then add.'],
    },
    {
        id: 'op6',
        text: 'For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, find the $(2,1)$ entry of $AB$.',
        options: ['$43$', '$19$', '$22$', '$50$'],
        correctAnswer: '$43$',
        solution: `$(AB)_{2,1}$ = Row 2 of A · Column 1 of B
$= 3 \\times 5 + 4 \\times 7$
$= 15 + 28 = 43$`,
        hints: ['Use row 2 of A and column 1 of B.'],
    },
    {
        id: 'op7',
        text: 'Compute the full product $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\times \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$',
        options: [
            '$\\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$',
            '$\\begin{bmatrix} 5 & 12 \\\\ 21 & 32 \\end{bmatrix}$',
            '$\\begin{bmatrix} 23 & 34 \\\\ 31 & 46 \\end{bmatrix}$',
            '$\\begin{bmatrix} 19 & 43 \\\\ 22 & 50 \\end{bmatrix}$',
        ],
        correctAnswer: '$\\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$',
        solution: `Compute each entry using dot products:
$(1,1): 1(5)+2(7)=19$
$(1,2): 1(6)+2(8)=22$
$(2,1): 3(5)+4(7)=43$
$(2,2): 3(6)+4(8)=50$`,
        hints: ['Calculate each entry by dot product of the corresponding row and column.'],
    },
    // Level C: Transpose & Properties (Q8-Q10)
    {
        id: 'op8',
        text: 'Find the transpose of $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$',
        options: [
            '$\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}$',
            '$\\begin{bmatrix} 6 & 5 & 4 \\\\ 3 & 2 & 1 \\end{bmatrix}$',
            '$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{bmatrix}$',
            '$\\begin{bmatrix} 3 & 6 \\\\ 2 & 5 \\\\ 1 & 4 \\end{bmatrix}$',
        ],
        correctAnswer: '$\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}$',
        solution: `The transpose $A'$ swaps rows and columns.
Row 1 of $A$ → Column 1 of $A'$: $[1, 2, 3] → [1; 2; 3]$
Row 2 of $A$ → Column 2 of $A'$: $[4, 5, 6] → [4; 5; 6]$
So $A'_{2\\times 3} → (A')_{3 \\times 2}$.`,
        hints: ['Interchange rows and columns.', 'The order changes from m×n to n×m.'],
    },
    {
        id: 'op9',
        text: 'If $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$ and $B = \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix}$, is $AB = BA$?',
        options: [
            'No, $AB \\neq BA$',
            'Yes, $AB = BA$',
            'Only if $A = B$',
            'Cannot determine',
        ],
        correctAnswer: 'No, $AB \\neq BA$',
        solution: `$AB = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$
$BA = \\begin{bmatrix} 23 & 34 \\\\ 31 & 46 \\end{bmatrix}$
Since $19 \\neq 23$, clearly $AB \\neq BA$.
Matrix multiplication is generally NOT commutative.`,
        hints: ['Compute AB and BA separately.', 'Compare the results.'],
    },
    {
        id: 'op10',
        text: 'Which pair of non-zero matrices gives a zero product? $AB = O$',
        options: [
            '$A=\\begin{bmatrix} 1 & 1 \\\\ 0 & 0 \\end{bmatrix}, B=\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$',
            '$A=\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}, B=\\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$',
            '$A=\\begin{bmatrix} 1 & -1 \\\\ 2 & -2 \\end{bmatrix}, B=\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$',
            '$A=\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}, B=\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$',
        ],
        correctAnswer: '$A=\\begin{bmatrix} 1 & -1 \\\\ 2 & -2 \\end{bmatrix}, B=\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$',
        solution: `Check: $AB = \\begin{bmatrix} 1(1)+(-1)(1) & 1(1)+(-1)(1) \\\\ 2(1)+(-2)(1) & 2(1)+(-2)(1) \\end{bmatrix} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}$
Both A and B are non-zero, but AB = O. This shows matrix multiplication can produce a zero matrix from non-zero factors!`,
        hints: ['Look for matrices where rows of A are proportional to cancellations with cols of B.'],
    },
];

/* ─── Transpose visualizer ─── */
const TransposeVisualizer = () => {
    const [showTranspose, setShowTranspose] = useState(false);
    const original = [[1, 2, 3], [4, 5, 6]];
    const transposed = transpose(original);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6366F1', marginBottom: 6, textAlign: 'center' }}>
                        Original A (2×3)
                    </div>
                    <MatrixGrid rows={2} cols={3} values={original} showOrder={true} />
                </div>
                <motion.div
                    animate={{ rotate: showTranspose ? 90 : 0 }}
                    style={{ fontSize: '1.5rem', color: '#6366F1', cursor: 'pointer' }}
                    onClick={() => setShowTranspose(!showTranspose)}
                >
                    →
                </motion.div>
                <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10B981', marginBottom: 6, textAlign: 'center' }}>
                        Transpose A&apos; ({showTranspose ? '3×2' : '?'})
                    </div>
                    {showTranspose ? (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                            <MatrixGrid rows={3} cols={2} values={transposed} showOrder={true} />
                        </motion.div>
                    ) : (
                        <div style={{
                            width: 120, height: 120, borderRadius: 16, border: '2px dashed #C7D2FE',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer',
                        }} onClick={() => setShowTranspose(true)}>
                            Click to reveal
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ─── Non-commutativity demo ─── */
const NonCommutativityDemo = () => {
    const [show, setShow] = useState(false);
    const A = [[1, 2], [3, 4]];
    const B = [[5, 6], [7, 8]];
    const AB = [[19, 22], [43, 50]];
    const BA = [[23, 34], [31, 46]];

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: 4, color: '#6366F1' }}>A</div>
                    <MatrixGrid rows={2} cols={2} values={A} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: 4, color: '#3B82F6' }}>B</div>
                    <MatrixGrid rows={2} cols={2} values={B} />
                </div>
            </div>
            <button
                onClick={() => setShow(!show)}
                style={{
                    display: 'block', margin: '0 auto 16px',
                    padding: '10px 24px', borderRadius: 12,
                    background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#fff',
                    fontWeight: 700, border: 'none', cursor: 'pointer',
                }}
            >
                {show ? 'Hide' : 'Show'} AB vs BA
            </button>
            {show && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '0.85rem', fontWeight: 700, color: '#065F46',
                                background: '#D1FAE5', padding: '4px 12px', borderRadius: 8, marginBottom: 8, display: 'inline-block',
                            }}>AB</div>
                            <MatrixGrid rows={2} cols={2} values={AB} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '0.85rem', fontWeight: 700, color: '#92400E',
                                background: '#FEF3C7', padding: '4px 12px', borderRadius: 8, marginBottom: 8, display: 'inline-block',
                            }}>BA</div>
                            <MatrixGrid rows={2} cols={2} values={BA} />
                        </div>
                    </div>
                    <div style={{
                        marginTop: 12, textAlign: 'center', padding: '10px 16px',
                        borderRadius: 12, background: '#FEE2E2', border: '2px solid #FECACA',
                        fontWeight: 700, color: '#991B1B', fontSize: '0.95rem',
                    }}>
                        AB ≠ BA — Matrix multiplication is NOT commutative!
                    </div>
                </motion.div>
            )}
        </div>
    );
};

/* ─── Main page ─── */
const HowOperationsWork = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [demoI, setDemoI] = useState(0);
    const [demoK, setDemoK] = useState(0);

    const handleQuizComplete = (score, total) => {
        if (score / total >= 0.8) {
            try {
                const progress = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
                progress['how-operations'] = true;
                localStorage.setItem('matrices_progress', JSON.stringify(progress));
            } catch { }
        }
    };

    const demoA = [[1, 2, 3], [4, 5, 6]];
    const demoB = [[7, 8], [9, 10], [11, 12]];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#F8FAFC',
            fontFamily: '"Inter", "Open Sans", sans-serif',
        }}>
            {/* Sticky Navbar */}
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid #E2E8F0',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            background: '#F1F5F9', border: '1px solid #E2E8F0',
                            color: '#475569', padding: '8px 16px', borderRadius: 12,
                            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#E2E8F0'; e.currentTarget.style.color = '#1E293B'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#475569'; }}
                    >
                        <ArrowLeft size={18} /> Back to Chapter
                    </button>
                    <div style={{ height: 24, width: 2, background: '#E2E8F0' }}></div>
                    <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '1.1rem' }}>
                        How Matrix Operations Work
                    </div>
                </div>
                <div style={{
                    background: '#FEF2F2', color: '#DC2626', padding: '6px 14px',
                    borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em'
                }}>
                    SECTION 4 • OPERATIONS
                </div>
            </nav>

            {/* Content */}
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1E293B', marginBottom: 12 }}>
                        Mastering Operations
                    </h1>
                    <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.6 }}>
                        Master addition, scalar multiplication, matrix multiplication, and transpose with step-by-step visual guidance.
                    </p>
                </div>

                {/* Operations overview */}
                <Section title="📋 Operations Overview">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                        {[
                            { name: 'Addition', icon: '➕', desc: 'Add corresponding elements' },
                            { name: 'Scalar ×', icon: '✖️', desc: 'Multiply every element by a scalar' },
                            { name: 'Multiplication', icon: '🔗', desc: 'Dot product of rows & columns' },
                            { name: 'Transpose', icon: '🔄', desc: 'Swap rows and columns' },
                        ].map(op => (
                            <div key={op.name} style={{
                                background: '#F8FAFC', border: '1.5px solid #E2E8F0',
                                borderRadius: 12, padding: 14, textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{op.icon}</div>
                                <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '0.9rem' }}>{op.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{op.desc}</div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Addition & Scalar */}
                <Section title="➕ Addition & Scalar Multiplication">
                    <div style={{ marginBottom: 20 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1E293B', marginBottom: 8 }}>Addition Rule</h4>
                        <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>
                            <LatexText text="To add two matrices of the <strong>same order</strong>, add corresponding elements: $(A+B)_{ij} = a_{ij} + b_{ij}$." />
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <MatrixGrid rows={2} cols={2} values={[[1, 2], [3, 4]]} />
                            <span style={{ fontWeight: 700, color: '#64748b', fontSize: '1.3rem' }}>+</span>
                            <MatrixGrid rows={2} cols={2} values={[[5, 6], [7, 8]]} />
                            <span style={{ fontWeight: 700, color: '#64748b', fontSize: '1.3rem' }}>=</span>
                            <MatrixGrid rows={2} cols={2} values={[[6, 8], [10, 12]]} />
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1E293B', marginBottom: 8 }}>Scalar Multiplication</h4>
                        <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>
                            <LatexText text="Multiply every element by the scalar $k$: $(kA)_{ij} = k \\cdot a_{ij}$." />
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontWeight: 700, color: '#6366F1', fontSize: '1.3rem' }}>3 ×</span>
                            <MatrixGrid rows={2} cols={2} values={[[2, -1], [0, 4]]} />
                            <span style={{ fontWeight: 700, color: '#64748b', fontSize: '1.3rem' }}>=</span>
                            <MatrixGrid rows={2} cols={2} values={[[6, -3], [0, 12]]} />
                        </div>
                    </div>
                </Section>

                {/* Matrix Multiplication */}
                <Section title="🔗 Matrix Multiplication — Step by Step">
                    <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>
                        <LatexText text="To multiply $A_{m \\times n}$ by $B_{n \\times p}$: the <strong>inner dimensions must match</strong> (the $n$). The result is $C_{m \\times p}$." />
                    </p>
                    <div style={{
                        background: '#FFFBEB', border: '1.5px solid #FDE68A',
                        borderRadius: 12, padding: '12px 16px', marginBottom: 16,
                        fontSize: '0.9rem', color: '#78350F',
                    }}>
                        <LatexText text="⚡ <strong>Dimension rule:</strong> $A$ is $2 \\times 3$ and $B$ is $3 \\times 2$ → inner $3 = 3$ ✓ → result is $2 \\times 2$." />
                    </div>

                    <p style={{ color: '#475569', marginBottom: 8, fontWeight: 600 }}>
                        Click an entry position to animate the dot product:
                    </p>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                        {[0, 1].map(i => [0, 1].map(k => (
                            <button
                                key={`${i}-${k}`}
                                onClick={() => { setDemoI(i); setDemoK(k); }}
                                style={{
                                    padding: '8px 16px', borderRadius: 10,
                                    background: demoI === i && demoK === k ? '#4F46E5' : '#EEF2FF',
                                    color: demoI === i && demoK === k ? '#fff' : '#4F46E5',
                                    fontWeight: 700, border: 'none', cursor: 'pointer',
                                    fontSize: '0.85rem',
                                }}
                            >
                                c<sub>{i + 1},{k + 1}</sub>
                            </button>
                        ))).flat()}
                    </div>

                    <DotProductAnimator
                        A={demoA}
                        B={demoB}
                        targetI={demoI}
                        targetK={demoK}
                    />
                </Section>

                {/* Transpose */}
                <Section title="🔄 Transpose">
                    <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
                        <LatexText text="The transpose $A'$ is obtained by interchanging rows and columns. If $A$ is $m \\times n$, then $A'$ is $n \\times m$." />
                    </p>
                    <TransposeVisualizer />
                    <div style={{
                        marginTop: 16, background: '#EEF2FF', border: '1.5px solid #C7D2FE',
                        borderRadius: 12, padding: '12px 16px', fontSize: '0.9rem', color: '#3730A3',
                    }}>
                        <LatexText text="📌 <strong>Properties:</strong> $(A')' = A$, $(A+B)' = A'+B'$, $(kA)' = kA'$, $(AB)' = B'A'$" />
                    </div>
                </Section>

                {/* Non-commutativity */}
                <Section title="⚠️ AB ≠ BA: Non-Commutativity">
                    <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
                        <LatexText text="Unlike numbers, matrix multiplication is <strong>not commutative</strong> in general. That is, $AB \\neq BA$. Let's verify:" />
                    </p>
                    <NonCommutativityDemo />
                </Section>

                {/* Common Mistakes */}
                <Section title="🚫 Common Mistakes" defaultOpen={false}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ padding: 16, borderRadius: 12, background: '#FEF2F2', border: '1.5px solid #FECACA' }}>
                            <p style={{ fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>❌ Inner dimension mismatch</p>
                            <p style={{ color: '#7F1D1D', fontSize: '0.9rem' }}>
                                <LatexText text="$A_{2 \\times 3} \\times B_{2 \\times 2}$ → inner dimensions $3 \\neq 2$ → NOT possible!" />
                            </p>
                        </div>
                        <div style={{ padding: 16, borderRadius: 12, background: '#FEF2F2', border: '1.5px solid #FECACA' }}>
                            <p style={{ fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>❌ Assuming AB = BA</p>
                            <p style={{ color: '#7F1D1D', fontSize: '0.9rem' }}>
                                Always verify — matrix multiplication order matters!
                            </p>
                        </div>
                        <div style={{ padding: 16, borderRadius: 12, background: '#FEF2F2', border: '1.5px solid #FECACA' }}>
                            <p style={{ fontWeight: 700, color: '#991B1B', marginBottom: 4 }}>❌ Confusing transpose order</p>
                            <p style={{ color: '#7F1D1D', fontSize: '0.9rem' }}>
                                <LatexText text="$(AB)' = B'A'$ (reverse order!), NOT $A'B'$." />
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Practice */}
                <Section title="🎯 Progressive Practice (10 Questions)">
                    <p style={{ color: '#64748b', marginBottom: 8, fontSize: '0.9rem' }}>
                        Levels A→B→C. Score 80% or higher to complete this section!
                    </p>
                    <QuizEngine
                        questions={QUIZ_QUESTIONS}
                        skillId={12102}
                        skillName="How Matrix Operations Work"
                        onComplete={handleQuizComplete}
                        mastery={0.8}
                    />
                </Section>
            </div>
        </div>
    );
};

export default HowOperationsWork;
