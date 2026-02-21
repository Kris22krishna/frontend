import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, Search, Target, ChevronRight } from 'lucide-react';
import { LatexText } from '../../../LatexText';
import MatrixGrid from '../components/MatrixGrid';
import QuizEngine from '../components/QuizEngine';

const SCENARIOS = [
    {
        icon: <Search size={28} color="#059669" />,
        title: "Solving Multiple Equations at Once",
        description: "Instead of solving equations one by one, matrices let us group all coefficients together and solve the entire system simultaneously. This becomes mandatory when you have hundreds or thousands of variables.",
        example: [
            ['3x', '+', '2y', '=', '7'],
            ['-x', '+', '4y', '=', '5']
        ]
    },
    {
        icon: <Database size={28} color="#2563EB" />,
        title: "Managing Large Datasets",
        description: "A spreadsheet is essentially a large matrix. Data scientists use matrices to filter, sort, and perform operations on millions of rows of data in a single step.",
        example: [
            ['Age', 'Income', 'Score'],
            ['24', '$50k', '0.8'],
            ['31', '$80k', '0.9']
        ]
    },
    {
        icon: <Target size={28} color="#D97706" />,
        title: "Predicting Future States",
        description: "In probability and statistics (like Markov chains), matrices are used to predict the future state of a system based on its current state—like predicting tomorrow's weather based on today's.",
        example: [
            ['Sunny', 'Rainy'],
            ['0.8', '0.2'],
            ['0.4', '0.6']
        ]
    }
];

const QUIZ_QUESTIONS = [
    {
        id: 'when1',
        text: 'How can the system of equations $2x + 3y = 8$ and $x - y = 1$ be represented using a coefficient matrix?',
        options: [
            '$\\begin{bmatrix} 2 & 3 \\\\ 1 & -1 \\end{bmatrix}$',
            '$\\begin{bmatrix} 2 & 3 \\\\ 1 & 1 \\end{bmatrix}$',
            '$\\begin{bmatrix} 2 & 1 \\\\ 3 & -1 \\end{bmatrix}$',
            '$\\begin{bmatrix} 8 & 1 \\\\ 2 & 3 \\end{bmatrix}$'
        ],
        correctAnswer: '$\\begin{bmatrix} 2 & 3 \\\\ 1 & -1 \\end{bmatrix}$',
        solution: `1. The coefficients of the first equation are 2 (for x) and 3 (for y).
2. The coefficients of the second equation are 1 (for x) and -1 (for y).
3. Arranging them in rows gives exactly $\\begin{bmatrix} 2 & 3 \\\\ 1 & -1 \\end{bmatrix}$.`,
        hints: ['Look at the numbers in front of variables x and y for both equations.', 'Equation 1 forms Row 1, Equation 2 forms Row 2.']
    },
    {
        id: 'when3',
        text: 'In the system: $2x + 3y = 8$, $5x - y = 7$, what would the coefficient matrix look like?',
        options: [
            '$[[2, 5], [3, -1]]$',
            '$[[2, 3], [5, -1]]$',
            '$[[2, 3], [5, 1]]$',
            '$[[8], [7]]$'
        ],
        correctAnswer: '$[[2, 3], [5, -1]]$',
        solution: `1. The coefficients of the first equation are 2 and 3.
2. The coefficients of the second equation are 5 and -1.
3. This forms a $2 \\times 2$ matrix: $[[2, 3], [5, -1]]$.`,
        hints: ['Extract just the numbers multiplying $x$ and $y$, row by row.']
    },
    {
        id: 'when4',
        text: 'Why do data scientists prefer storing information in matrices rather than isolated variables?',
        options: [
            'It takes up less memory on the hard drive',
            'It allows for simultaneous operations on thousands of data points',
            'Variables in Python cannot hold decimals',
            'Matrices look more professional in presentations'
        ],
        correctAnswer: 'It allows for simultaneous operations on thousands of data points',
        solution: `1. Modern CPUs and GPUs are optimized for matrix operations.
2. Instead of writing a 'for loop' to process 1,000 items individually, a single matrix operation can process all 1,000 at once (vectorization).`,
        hints: ['Think about speed and how computers calculate things in bulk.']
    },
    {
        id: 'when2',
        text: 'Why do we shift from using simple algebra to matrices as problems get larger?',
        options: [
            'Because matrices make the math look harder',
            'Because computers can perform matrix operations in parallel much faster',
            'Because large problems cannot be solved with algebra',
            'Because matrices use less memory'
        ],
        correctAnswer: 'Because computers can perform matrix operations in parallel much faster',
        solution: `1. Traditional algebra still works for large setups, but solving them one by one is extremely slow.
2. Matrices allow us to represent the whole system as a single object.
3. Computers are highly optimized to process matrices in bulk (parallel computing via GPUs).`,
        hints: ['Think about how modern graphics cards (GPUs) are designed.']
    }
];

const WhenDoWeNeedMatrices = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuizComplete = (score, total) => {
        if (score / total >= 0.5) {
            try {
                const progress = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
                progress['when-need'] = true;
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
                        When Do We Need Matrices?
                    </div>
                </div>
                <div style={{
                    background: '#FEF3C7', color: '#D97706', padding: '6px 14px',
                    borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em'
                }}>
                    SECTION 3 • MOTIVATION
                </div>
            </nav>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1E293B', marginBottom: 16 }}>
                        Why transition to Matrices?
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.6, maxWidth: 650, margin: '0 auto' }}>
                        You've spent years solving equations step-by-step. Matrices are the ultimate shortcut for dealing with hundreds, thousands, or billions of numbers simultaneously.
                    </p>
                </div>

                {/* Scenarios */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
                    {SCENARIOS.map((scenario, idx) => (
                        <div key={idx} style={{
                            background: '#fff', borderRadius: 20, border: '2px solid #E2E8F0',
                            padding: '32px', display: 'flex', gap: 24,
                            flexDirection: 'column', md: { flexDirection: 'row' }
                        }}>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flex: 1 }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: 14, background: '#F1F5F9',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    {scenario.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', margin: '0 0 12px 0' }}>{scenario.title}</h3>
                                    <p style={{ fontSize: '1rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>{scenario.description}</p>
                                </div>
                            </div>

                            <div style={{
                                flex: 1, background: '#F8FAFC', borderRadius: 12, padding: 16,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '1px dashed #CBD5E1'
                            }}>
                                <MatrixGrid rows={scenario.example.length} cols={scenario.example[0].length} values={scenario.example} compact={true} />
                            </div>
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
                        borderBottom: '4px solid #10B981'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Target size={28} color="#34D399" />
                            Test Your Knowledge
                        </h2>
                        <p style={{ color: '#94A3B8', margin: '8px 0 0 0', fontSize: '1.05rem' }}>
                            Pass this 4-question check to clear the section!
                        </p>
                    </div>

                    <div style={{ padding: '32px' }}>
                        <QuizEngine
                            questions={QUIZ_QUESTIONS}
                            skillId={12101}
                            skillName="When Do We Need Matrices?"
                            onComplete={handleQuizComplete}
                            mastery={0.75}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-between', gap: 20 }}>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices/what-is')}
                        style={{
                            background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '16px 24px',
                            borderRadius: 12, fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                        }}
                    >
                        Back to "What is a matrix?"
                    </button>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices/how-operations')}
                        style={{
                            background: '#4F46E5', color: '#fff', border: 'none', padding: '16px 32px',
                            borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                            marginLeft: 'auto'
                        }}
                    >
                        Next: How Operations Work <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhenDoWeNeedMatrices;
