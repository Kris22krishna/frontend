import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LatexText } from '../../../LatexText';
import MatrixGrid from '../components/MatrixGrid';
import QuizEngine from '../components/QuizEngine';

/* ─── Types gallery data ─── */
const MATRIX_TYPES = [
    {
        name: 'Row Matrix',
        desc: 'A matrix with only 1 row.',
        example: [[3, -1, 7]],
        notation: '1 × n',
    },
    {
        name: 'Column Matrix',
        desc: 'A matrix with only 1 column.',
        example: [[4], [0], [2]],
        notation: 'm × 1',
    },
    {
        name: 'Square Matrix',
        desc: 'Number of rows equals number of columns.',
        example: [[1, 2], [3, 4]],
        notation: 'n × n',
    },
    {
        name: 'Diagonal Matrix',
        desc: 'Non-zero entries only on the main diagonal.',
        example: [[5, 0], [0, 3]],
        notation: 'aᵢⱼ = 0 for i ≠ j',
    },
    {
        name: 'Scalar Matrix',
        desc: 'A diagonal matrix where all diagonal entries are equal.',
        example: [[4, 0, 0], [0, 4, 0], [0, 0, 4]],
        notation: 'aᵢᵢ = k',
    },
    {
        name: 'Identity Matrix (Iₙ)',
        desc: 'Diagonal entries are 1, rest are 0. Acts as "1" for matrices.',
        example: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        notation: 'AI = IA = A',
    },
    {
        name: 'Zero Matrix (O)',
        desc: 'All entries are 0.',
        example: [[0, 0], [0, 0]],
        notation: 'A + O = A',
    },
];

/* ─── Detect type of user-built matrix ─── */
const detectMatrixType = (values, rows, cols) => {
    const types = [];
    if (rows === 1) types.push('Row Matrix');
    if (cols === 1) types.push('Column Matrix');
    if (rows === cols) {
        types.push('Square Matrix');
        // Check diagonal
        let isDiagonal = true;
        let isIdentity = true;
        let isZero = true;
        let diagValue = values[0]?.[0];
        let isScalar = true;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const v = Number(values[i]?.[j]) || 0;
                if (v !== 0) isZero = false;
                if (i !== j && v !== 0) isDiagonal = false;
                if (i === j && v !== 1) isIdentity = false;
                if (i === j && v !== diagValue) isScalar = false;
            }
        }
        if (isZero) types.push('Zero Matrix');
        else if (isIdentity) types.push('Identity Matrix');
        else if (isDiagonal && isScalar) types.push('Scalar Matrix');
        else if (isDiagonal) types.push('Diagonal Matrix');
    }
    if (values.every(row => row.every(v => Number(v) === 0))) {
        if (!types.includes('Zero Matrix')) types.push('Zero Matrix');
    }
    return types.length > 0 ? types : ['General Matrix'];
};

/* ─── Quiz questions (8) ─── */
const QUIZ_QUESTIONS = [
    {
        id: 'wm1',
        text: 'What is the order of the matrix $\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{bmatrix}$?',
        options: ['$2 \\times 3$', '$3 \\times 2$', '$2 \\times 2$', '$3 \\times 3$'],
        correctAnswer: '$2 \\times 3$',
        solution: `1. Count the rows: the matrix has 2 rows.
2. Count the columns: the matrix has 3 columns.
3. Therefore, the order is $2 \\times 3$ (rows × columns).`,
        hints: ['Count the number of rows first.', 'Order is written as rows × columns.'],
    },
    {
        id: 'wm2',
        text: 'For the matrix $A = \\begin{bmatrix} 7 & 3 \\\\ -1 & 5 \\end{bmatrix}$, what is $a_{1,2}$?',
        options: ['$3$', '$7$', '$-1$', '$5$'],
        correctAnswer: '$3$',
        solution: `1. $a_{1,2}$ means the element in row 1, column 2.
2. Row 1 is $[7, 3]$.
3. The element in column 2 of row 1 is $3$.`,
        hints: ['aᵢⱼ means row i, column j.'],
    },
    {
        id: 'wm3',
        text: 'Which of the following is a diagonal matrix?',
        options: [
            '$\\begin{bmatrix} 4 & 0 \\\\ 0 & 2 \\end{bmatrix}$',
            '$\\begin{bmatrix} 4 & 1 \\\\ 0 & 2 \\end{bmatrix}$',
            '$\\begin{bmatrix} 0 & 4 \\\\ 2 & 0 \\end{bmatrix}$',
            '$\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$',
        ],
        correctAnswer: '$\\begin{bmatrix} 4 & 0 \\\\ 0 & 2 \\end{bmatrix}$',
        solution: `1. A diagonal matrix has all non-diagonal entries equal to 0.
2. In $\\begin{bmatrix} 4 & 0 \\\\ 0 & 2 \\end{bmatrix}$, the off-diagonal entries (positions (1,2) and (2,1)) are both 0.
3. Therefore, it is a diagonal matrix.`,
        hints: ['In a diagonal matrix, aᵢⱼ = 0 when i ≠ j.'],
    },
    {
        id: 'wm4',
        text: 'Which of the following is the identity matrix $I_2$?',
        options: [
            '$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$',
            '$\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}$',
            '$\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}$',
            '$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$',
        ],
        correctAnswer: '$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$',
        solution: `1. The identity matrix $I_n$ has 1s on the main diagonal and 0s everywhere else.
2. For $I_2$: $a_{11} = 1$, $a_{22} = 1$, $a_{12} = 0$, $a_{21} = 0$.
3. This matches $\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$.`,
        hints: ['Identity matrix has 1s on the diagonal.', 'All other entries must be 0.'],
    },
    {
        id: 'wm5',
        text: 'What is the order of a column matrix with 4 elements?',
        options: ['$4 \\times 1$', '$1 \\times 4$', '$4 \\times 4$', '$2 \\times 2$'],
        correctAnswer: '$4 \\times 1$',
        solution: `1. A column matrix has a single column.
2. With 4 elements, it has 4 rows and 1 column.
3. Therefore, the order is $4 \\times 1$.`,
        hints: ['A column matrix has only 1 column.'],
    },
    {
        id: 'wm6',
        text: 'For matrix $B = \\begin{bmatrix} 2 & 0 & -3 \\\\ 1 & 5 & 7 \\\\ 4 & -2 & 9 \\end{bmatrix}$, find $a_{2,3}$.',
        options: ['$7$', '$-3$', '$5$', '$-2$'],
        correctAnswer: '$7$',
        solution: `1. $a_{2,3}$ means row 2, column 3.
2. Row 2 is $[1, 5, 7]$.
3. The element at column 3 is $7$.`,
        hints: ['Look at the second row.', 'Then pick the third element.'],
    },
    {
        id: 'wm7',
        text: 'Which of the following is a scalar matrix?',
        options: [
            '$\\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$',
            '$\\begin{bmatrix} 3 & 0 \\\\ 0 & 5 \\end{bmatrix}$',
            '$\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$',
            '$\\begin{bmatrix} 0 & 3 \\\\ 3 & 0 \\end{bmatrix}$',
        ],
        correctAnswer: '$\\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$',
        solution: `1. A scalar matrix is a diagonal matrix where all diagonal entries are equal.
2. $\\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$ has diagonal entries both equal to 3.
3. Note: $I_2$ is technically a scalar matrix too (k=1), but $\\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}$ is the best answer.`,
        hints: ['A scalar matrix is a special diagonal matrix.', 'All diagonal entries must be the same value.'],
    },
    {
        id: 'wm8',
        text: 'The matrix $\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$ is called:',
        options: ['Zero matrix', 'Identity matrix', 'Scalar matrix', 'Unit matrix'],
        correctAnswer: 'Zero matrix',
        solution: `1. A zero matrix (denoted $O$) has all entries equal to 0.
2. This matrix has every element as 0.
3. Note: it is $2 \\times 3$, so it is not square — hence not identity or scalar.`,
        hints: ['All entries are 0 — what is that called?'],
    },
];

/* ─── Section wrapper ─── */
const Section = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div style={{
            background: '#fff',
            borderRadius: 20,
            border: '2px solid #E2E8F0',
            marginBottom: 20,
            overflow: 'hidden',
        }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>{title}</h2>
                {open ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: '0 24px 24px' }}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── Main page ─── */
const WhatIsMatrix = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [builderRows, setBuilderRows] = useState(2);
    const [builderCols, setBuilderCols] = useState(2);
    const [builderValues, setBuilderValues] = useState(
        Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0))
    );
    const [expandedType, setExpandedType] = useState(null);

    const handleBuilderCellChange = useCallback((i, j, val) => {
        setBuilderValues(prev => {
            const updated = prev.map(row => [...row]);
            updated[i][j] = val;
            return updated;
        });
    }, []);

    const currentBuilderValues = builderValues.slice(0, builderRows).map(row => row.slice(0, builderCols));
    const detectedTypes = detectMatrixType(currentBuilderValues, builderRows, builderCols);

    const handleQuizComplete = (score, total) => {
        if (score / total >= 0.8) {
            try {
                const progress = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
                progress['what-is'] = true;
                localStorage.setItem('matrices_progress', JSON.stringify(progress));
            } catch { }
        }
    };

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
                        What is a Matrix?
                    </div>
                </div>
                <div style={{
                    background: '#EEF2FF', color: '#4F46E5', padding: '6px 14px',
                    borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em'
                }}>
                    SECTION 2 • FUNDAMENTALS
                </div>
            </nav>

            {/* Content */}
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1E293B', marginBottom: 12 }}>
                        Fundamentals of Matrices
                    </h1>
                    <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: 1.6 }}>
                        Learn the definition, notation, and types of matrices — the foundation for everything that follows.
                    </p>
                </div>

                {/* Section 1: Definition */}
                <Section title="📖 Definition of a Matrix">
                    <div style={{
                        background: '#EEF2FF',
                        border: '2px solid #C7D2FE',
                        borderRadius: 14,
                        padding: 20,
                        marginBottom: 16,
                    }}>
                        <p style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.7, margin: 0 }}>
                            <LatexText text="A <strong>matrix</strong> is a rectangular arrangement of numbers (or functions) in rows and columns, enclosed in brackets. Each number in the matrix is called an <strong>element</strong> or <strong>entry</strong>." />
                        </p>
                    </div>
                    <p style={{ color: '#64748b', lineHeight: 1.6 }}>
                        <LatexText text="A matrix with $m$ rows and $n$ columns is said to have <strong>order</strong> $m \\times n$ (read as 'm by n'). We refer to individual elements as $a_{ij}$, meaning the element at row $i$ and column $j$." />
                    </p>
                </Section>

                {/* Section 2: Notation & Indexing */}
                <Section title="🔢 Notation & Indexing">
                    <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
                        <LatexText text="Here is a $2 \\times 3$ matrix $A$. Each element is labelled with its position $a_{ij}$:" />
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                        <MatrixGrid
                            rows={2}
                            cols={3}
                            values={[[3, -1, 7], [2, 5, 0]]}
                            showLabels={true}
                            showOrder={true}
                        />
                    </div>
                    <div style={{
                        background: '#FFFBEB',
                        border: '1.5px solid #FDE68A',
                        borderRadius: 12,
                        padding: '12px 16px',
                        fontSize: '0.9rem',
                        color: '#78350F',
                    }}>
                        <LatexText text="💡 <strong>Tip:</strong> $a_{12}$ means row 1, column 2. In the matrix above, $a_{12} = -1$." />
                    </div>
                </Section>

                {/* Section 3: Common Types Gallery */}
                <Section title="📊 Common Matrix Types">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: 12,
                    }}>
                        {MATRIX_TYPES.map(type => (
                            <div
                                key={type.name}
                                onClick={() => setExpandedType(expandedType === type.name ? null : type.name)}
                                style={{
                                    background: expandedType === type.name ? '#EEF2FF' : '#F8FAFC',
                                    border: `2px solid ${expandedType === type.name ? '#818CF8' : '#E2E8F0'} `,
                                    borderRadius: 14,
                                    padding: 16,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                                    {type.name}
                                </h4>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 8, lineHeight: 1.4 }}>
                                    {type.desc}
                                </p>
                                {expandedType === type.name && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}
                                    >
                                        <MatrixGrid
                                            rows={type.example.length}
                                            cols={type.example[0].length}
                                            values={type.example}
                                            compact={true}
                                        />
                                    </motion.div>
                                )}
                                <div style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    color: '#6366F1',
                                    marginTop: 4,
                                }}>
                                    {type.notation}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Section 4: Matrix Builder */}
                <Section title="🛠️ Interactive Matrix Builder">
                    <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
                        Choose the number of rows and columns, fill in the values, and the system will identify the matrix type!
                    </p>

                    {/* Sliders */}
                    <div style={{ display: 'flex', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
                        <div>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                                Rows: {builderRows}
                            </label>
                            <input
                                type="range"
                                min={1} max={4}
                                value={builderRows}
                                onChange={(e) => setBuilderRows(Number(e.target.value))}
                                style={{ width: 160 }}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                                Columns: {builderCols}
                            </label>
                            <input
                                type="range"
                                min={1} max={4}
                                value={builderCols}
                                onChange={(e) => setBuilderCols(Number(e.target.value))}
                                style={{ width: 160 }}
                            />
                        </div>
                    </div>

                    {/* Editable grid */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                        <MatrixGrid
                            rows={builderRows}
                            cols={builderCols}
                            values={currentBuilderValues}
                            editable={true}
                            showLabels={true}
                            showOrder={true}
                            onCellChange={handleBuilderCellChange}
                        />
                    </div>

                    {/* Detected type */}
                    <div style={{
                        background: '#D1FAE5',
                        border: '2px solid #6EE7B7',
                        borderRadius: 12,
                        padding: '12px 18px',
                        textAlign: 'center',
                    }}>
                        <span style={{ fontWeight: 700, color: '#065F46' }}>
                            Detected type: {detectedTypes.join(', ')}
                        </span>
                    </div>
                </Section>

                {/* Section 5: Worked Examples */}
                <Section title="✏️ Worked Examples">
                    {/* Example 1 */}
                    <div style={{ marginBottom: 20 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1E293B', marginBottom: 8 }}>
                            Example 1: Identify order and type
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                            <MatrixGrid rows={3} cols={3} values={[[1, 0, 0], [0, 1, 0], [0, 0, 1]]} showOrder={true} />
                        </div>
                        <p style={{ color: '#475569', lineHeight: 1.6 }}>
                            <LatexText text="This is a $3 \\times 3$ matrix. It is the <strong>identity matrix</strong> $I_3$ because the diagonal entries are all 1 and the off-diagonal entries are all 0." />
                        </p>
                    </div>

                    {/* Example 2 */}
                    <div style={{ marginBottom: 20 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1E293B', marginBottom: 8 }}>
                            Example 2: Find specific elements
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                            <MatrixGrid rows={2} cols={3} values={[[5, -2, 8], [3, 0, 1]]} showLabels={true} showOrder={true} />
                        </div>
                        <p style={{ color: '#475569', lineHeight: 1.6 }}>
                            <LatexText text="$a_{11} = 5$, $a_{13} = 8$, $a_{21} = 3$, $a_{23} = 1$. The order is $2 \\times 3$ (row matrix is 1 × n, this has 2 rows so it's a general matrix)." />
                        </p>
                    </div>

                    {/* Example 3 */}
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1E293B', marginBottom: 8 }}>
                            Example 3: Column matrix
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                            <MatrixGrid rows={3} cols={1} values={[[7], [-3], [2]]} showOrder={true} />
                        </div>
                        <p style={{ color: '#475569', lineHeight: 1.6 }}>
                            <LatexText text="Order: $3 \\times 1$. This is a <strong>column matrix</strong> because it has only one column." />
                        </p>
                    </div>
                </Section>

                {/* Section 6: Mastery Checkpoint */}
                <Section title="🎯 Mastery Checkpoint (8 Questions)">
                    <p style={{ color: '#64748b', marginBottom: 16 }}>
                        Score 80% or higher to mark this section as complete!
                    </p>
                    <QuizEngine
                        questions={QUIZ_QUESTIONS}
                        skillId={12101}
                        skillName="What is a Matrix?"
                        onComplete={handleQuizComplete}
                        mastery={0.8}
                    />
                </Section>
            </div>
        </div>
    );
};

export default WhatIsMatrix;
