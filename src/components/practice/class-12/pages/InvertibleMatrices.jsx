import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shuffle, Key, Calculator, BookOpen, ChevronRight, BrainCircuit } from 'lucide-react';
import { LatexText } from '../../../LatexText';
import MatrixGrid from '../components/MatrixGrid';
import QuizEngine from '../components/QuizEngine';

/* ─── Section data ─── */
const CONCEPTS = [
    {
        icon: <Key size={28} color="#4F46E5" />,
        title: "What Is an Inverse Matrix?",
        body: `If you multiply a number by its inverse you get 1 (e.g. $5 \\times \\frac{1}{5} = 1$).  
For matrices the same idea applies — the inverse $A^{-1}$ satisfies $A \\cdot A^{-1} = I$, where $I$ is the identity matrix.`,
        example: {
            label: 'Verify: A × A⁻¹ = I',
            matA: [['2', '1'], ['5', '3']],
            matB: [['3', '-1'], ['-5', '2']],
            result: [['1', '0'], ['0', '1']]
        }
    },
    {
        icon: <Calculator size={28} color="#059669" />,
        title: "Finding the Inverse of a 2×2 Matrix",
        body: `For $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, the inverse is:
$$A^{-1} = \\frac{1}{ad-bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$$  
The number $ad - bc$ is called the **determinant**. If it equals 0, the matrix has **no inverse** (it is *singular*).`,
        example: {
            label: 'Step-by-step: Inverse of [[4, 7], [2, 6]]',
            matA: [['4', '7'], ['2', '6']],
            steps: [
                'det = 4×6 − 7×2 = 24 − 14 = 10',
                'Swap diagonal: [[6, −7], [−2, 4]]',
                'Multiply by 1/10 → [[0.6, −0.7], [−0.2, 0.4]]'
            ]
        }
    },
    {
        icon: <Shuffle size={28} color="#D97706" />,
        title: "The Adjoint Method (for 3×3)",
        body: `For a 3×3 matrix, we use the **Adjoint (Adjugate)**:
$$A^{-1} = \\frac{1}{|A|}\\, \\text{adj}(A)$$

**Steps:**  
1. Find the **minor** of each element (determinant of the 2×2 sub-matrix formed by deleting its row & column).  
2. Apply the **cofactor sign pattern** $\\begin{bmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{bmatrix}$ to get cofactors.  
3. **Transpose** the cofactor matrix → that's the adjoint.  
4. Divide by the determinant.`,
        example: {
            label: 'Cofactor sign pattern',
            matA: [['+', '−', '+'], ['−', '+', '−'], ['+', '−', '+']],
        }
    },
    {
        icon: <BookOpen size={28} color="#DC2626" />,
        title: "Solving Equations Using Inverse",
        body: `A system of equations can be written as $AX = B$. If $A^{-1}$ exists:
$$X = A^{-1} B$$

**Example:**  
$2x + y = 5$  
$3x + 2y = 8$  

Here $A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}$, $B = \\begin{bmatrix} 5 \\\\ 8 \\end{bmatrix}$.  
$A^{-1} = \\begin{bmatrix} 2 & -1 \\\\ -3 & 2 \\end{bmatrix}$  
$X = A^{-1}B = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}$. So $x=2, y=1$.`,
        example: {
            label: 'A⁻¹ × B = X',
            matA: [['2', '-1'], ['-3', '2']],
            matB: [['5'], ['8']],
            result: [['2'], ['1']]
        }
    }
];

const QUIZ_QUESTIONS = [
    {
        id: 'inv1',
        text: 'What condition makes a square matrix non-invertible (singular)?',
        options: ['Its determinant is zero', 'It is a diagonal matrix', 'It has negative entries', 'It is symmetric'],
        correctAnswer: 'Its determinant is zero',
        solution: `A matrix $A$ is invertible only if $|A| \\neq 0$. When $|A| = 0$, no inverse exists and the matrix is called singular.`,
        hints: ['Think about what makes the formula 1/det blow up.']
    },
    {
        id: 'inv2',
        text: 'Find the inverse of $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$. What is $a_{11}$ of $A^{-1}$?',
        options: ['$-2$', '$4$', '$2$', '$-4$'],
        correctAnswer: '$-2$',
        solution: `$|A| = 1(4) - 2(3) = -2$. $A^{-1} = \\frac{1}{-2}\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix} = \\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$. So $a_{11} = -2$.`,
        hints: ['Use the 2×2 formula: swap diagonal, negate off-diagonal, divide by det.']
    },
    {
        id: 'inv3',
        text: 'If $A \\cdot A^{-1} = I$, then $A^{-1} \\cdot A$ equals:',
        options: ['$I$ (Identity matrix)', '$A$', '$A^{-1}$', '$O$ (Zero matrix)'],
        correctAnswer: '$I$ (Identity matrix)',
        solution: `Matrix inverse works from both sides: $AA^{-1} = A^{-1}A = I$.`,
    },
    {
        id: 'inv4',
        text: 'The adjoint of a matrix is obtained by:',
        options: [
            'Transposing the cofactor matrix',
            'Finding the determinant',
            'Multiplying by the identity',
            'Adding all elements'
        ],
        correctAnswer: 'Transposing the cofactor matrix',
        solution: `The adjoint (adjugate) is the transpose of the matrix of cofactors of each element.`,
        hints: ['Cofactors first, then transpose.']
    }
];

const InvertibleMatrices = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuizComplete = (score, total) => {
        if (score / total >= 0.5) {
            try {
                const progress = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
                progress['invertible'] = true;
                localStorage.setItem('matrices_progress', JSON.stringify(progress));
            } catch { }
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: '"Inter", "Open Sans", sans-serif' }}>
            {/* Sticky Navbar */}
            <nav style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)',
                borderBottom: '1px solid #E2E8F0', padding: '16px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
                        Invertible Matrices
                    </div>
                </div>
                <div style={{
                    background: '#FEE2E2', color: '#DC2626', padding: '6px 14px',
                    borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em'
                }}>
                    SECTION 7 • INVERSE & ADJOINT
                </div>
            </nav>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
                {/* Header */}
                <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1E293B', marginBottom: 16 }}>
                        Invertible Matrices & The Adjoint
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.6, maxWidth: 650, margin: '0 auto' }}>
                        Learn how to "undo" matrix multiplication by finding the inverse — and how the adjoint method extends this to larger matrices.
                    </p>
                </div>

                {/* Concept Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 48 }}>
                    {CONCEPTS.map((concept, idx) => (
                        <div key={idx} style={{
                            background: '#fff', borderRadius: 20, border: '2px solid #E2E8F0',
                            padding: '32px', overflow: 'hidden',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: 14, background: '#F1F5F9',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    {concept.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', margin: '0 0 12px 0' }}>
                                        {concept.title}
                                    </h3>
                                    <div style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7 }}>
                                        <LatexText text={concept.body} />
                                    </div>
                                </div>
                            </div>

                            {/* Example visualisation */}
                            {concept.example && (
                                <div style={{
                                    background: '#F8FAFC', borderRadius: 12, padding: 20,
                                    border: '1px dashed #CBD5E1', marginTop: 16
                                }}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {concept.example.label}
                                    </div>

                                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                                        <MatrixGrid rows={concept.example.matA.length} cols={concept.example.matA[0].length} values={concept.example.matA} compact={true} />
                                        {concept.example.matB && (
                                            <>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#94A3B8' }}>×</span>
                                                <MatrixGrid rows={concept.example.matB.length} cols={concept.example.matB[0].length} values={concept.example.matB} compact={true} />
                                            </>
                                        )}
                                        {concept.example.result && (
                                            <>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#94A3B8' }}>=</span>
                                                <MatrixGrid rows={concept.example.result.length} cols={concept.example.result[0].length} values={concept.example.result} compact={true} />
                                            </>
                                        )}
                                    </div>

                                    {/* Steps if present */}
                                    {concept.example.steps && (
                                        <div style={{ marginTop: 16 }}>
                                            {concept.example.steps.map((step, sIdx) => (
                                                <div key={sIdx} style={{
                                                    display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8,
                                                    padding: '8px 12px', borderRadius: 8,
                                                    background: activeStep === sIdx ? '#EEF2FF' : 'transparent',
                                                    cursor: 'pointer', transition: 'background 0.2s'
                                                }}
                                                    onClick={() => setActiveStep(sIdx)}
                                                >
                                                    <span style={{
                                                        width: 24, height: 24, borderRadius: '50%',
                                                        background: activeStep === sIdx ? '#4F46E5' : '#CBD5E1',
                                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '0.75rem', fontWeight: 700, flexShrink: 0
                                                    }}>
                                                        {sIdx + 1}
                                                    </span>
                                                    <span style={{ fontSize: '0.95rem', color: '#334155', fontFamily: 'monospace' }}>
                                                        <LatexText text={step} />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Inline Test Section */}
                <div style={{
                    background: '#fff', borderRadius: 24, padding: 0, marginBottom: 40,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
                    overflow: 'hidden', border: '1px solid #E2E8F0',
                    display: 'flex', flexDirection: 'column'
                }}>
                    <div style={{
                        background: '#1E293B', color: '#fff', padding: '24px 32px',
                        borderBottom: '4px solid #DC2626'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <BrainCircuit size={28} color="#FCA5A5" />
                            Test Your Knowledge
                        </h2>
                        <p style={{ color: '#94A3B8', margin: '8px 0 0 0', fontSize: '1.05rem' }}>
                            Pass this 4-question check to complete the section!
                        </p>
                    </div>

                    <div style={{ padding: '32px' }}>
                        <QuizEngine
                            questions={QUIZ_QUESTIONS}
                            skillId={12106}
                            skillName="Invertible Matrices"
                            onComplete={handleQuizComplete}
                            mastery={0.75}
                        />
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices/where-applied')}
                        style={{
                            background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '16px 24px',
                            borderRadius: 12, fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                        }}
                    >
                        Back to "Where Applied"
                    </button>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices')}
                        style={{
                            background: '#4F46E5', color: '#fff', border: 'none', padding: '16px 32px',
                            borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                            marginLeft: 'auto'
                        }}
                    >
                        Back to Chapter Hub <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvertibleMatrices;
