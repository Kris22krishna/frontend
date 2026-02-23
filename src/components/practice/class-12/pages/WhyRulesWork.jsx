import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Repeat, MoveRight, ChevronRight, AlertTriangle } from 'lucide-react';
import { LatexText } from '../../../LatexText';
import MatrixGrid from '../components/MatrixGrid';
import QuizEngine from '../components/QuizEngine';

const SCENARIOS = [
    {
        title: "Matrix Multiplication is NOT Commutative",
        description: "If you multiply 3 × 4, you get 12. If you multiply 4 × 3, you also get 12. This is called the commutative property. However, for matrices, $AB \\neq BA$ in most cases.",
        why: "Multiplying matrices is like performing physical actions. Imagine Action A is 'Put on your socks' and Action B is 'Put on your shoes'. If you do A then B (A × B), you get ready to go outside. If you do B then A (B × A), you have your socks over your shoes! The order matters.",
        mathExample: {
            a: [[1, 2], [3, 4]],
            b: [[0, 1], [1, 0]],
            ab: [[2, 1], [4, 3]],
            ba: [[3, 4], [1, 2]]
        }
    },
    {
        title: "Why does row × column dot product exist?",
        description: "Why didn't mathematicians just define multiplication as multiplying the corresponding elements together (like addition)?",
        why: "Because matrices are usually used to transform coordinate axes vectors! When you track a system of equations, a row from matrix A combines with variables in the column vector B to produce a single result. The 'dot product' definition perfectly models this interaction.",
        mathExample: null
    }
];

const QUIZ_QUESTIONS = [
    {
        id: 'why1',
        text: 'Which of the following properties is generally FALSE for matrix multiplication?',
        options: [
            '$A(BC) = (AB)C$ (Associative)',
            '$A(B + C) = AB + AC$ (Distributive)',
            '$AB = BA$ (Commutative)',
            '$AI = A$ (Identity)'
        ],
        correctAnswer: '$AB = BA$ (Commutative)',
        solution: `1. Matrix multiplication is not commutative.
2. The order in which you multiply matters because matrices represent transformations, and combining transformations in different orders often leads to different results.`,
        hints: ['Think about the "socks and shoes" analogy.']
    },
    {
        id: 'why2',
        text: 'If $A$ is a $2 \\times 3$ matrix and $B$ is a $3 \\times 4$ matrix, can you compute $BA$?',
        options: [
            'Yes, and the result is $4 \\times 2$',
            'Yes, and the result is $3 \\times 3$',
            'No, because the inner dimensions do not match',
            'No, because matrices cannot be multiplied'
        ],
        correctAnswer: 'No, because the inner dimensions do not match',
        solution: `1. For $BA$, the order is $(3 \\times 4) \\times (2 \\times 3)$.
2. The inner dimensions are 4 and 2.
3. Since $4 \\neq 2$, the multiplication $BA$ is undefined!
This is a mathematical reason why $AB \\neq BA$ — sometimes one direction doesn't even exist!`,
    },
    {
        id: 'why3',
        text: 'What is the primary reason the "dot product" method (row $\\times$ column) is used for matrix multiplication?',
        options: [
            'It is computationally faster than multiplying element-by-element',
            'It perfectly models how a system of equations transforms variables',
            'It ensures the result is always a square matrix',
            'It was the only way to make matrix multiplication commutative'
        ],
        correctAnswer: 'It perfectly models how a system of equations transforms variables',
        solution: `1. Matrix multiplication was designed to represent linear transformations and systems of equations.
2. In the equation $3x + 4y = 10$, the coefficients $(3, 4)$ from the row combine with the variables $(x, y)$ from the column. The dot product captures this exact combination.`,
        hints: ['Think about why matrices were invented—mostly to solve systems of equations!']
    },
    {
        id: 'why4',
        text: 'If $A$ represents the action "put on socks" and $B$ represents the action "put on shoes", what does $AB \\neq BA$ mean in the real world?',
        options: [
            'You cannot put on socks and shoes at the same time',
            'The order of actions drastically changes the final outcome',
            'Socks and shoes have different dimensions',
            'Actions cannot be represented by matrices'
        ],
        correctAnswer: 'The order of actions drastically changes the final outcome',
        solution: `1. $A \\times B$ (Socks then Shoes) results in a normal dressed foot.
2. $B \\times A$ (Shoes then Socks) results in a sock stretched over a shoe.
3. Because the outcomes are different, the operations are not commutative ($AB \\neq BA$). Matrices represent actions/transformations, so order matters.`,
        hints: ['Does doing action A then B give the same result as doing B then A?']
    }
];

const WhyRulesWork = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuizComplete = (score, total) => {
        if (score / total >= 0.5) {
            try {
                const progress = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
                progress['why-rules'] = true;
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
                        Why The Rules Work
                    </div>
                </div>
                <div style={{
                    background: '#F3E8FF', color: '#9333EA', padding: '6px 14px',
                    borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em'
                }}>
                    SECTION 5 • DEEP UNDERSTANDING
                </div>
            </nav>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1E293B', marginBottom: 16 }}>
                        Why Matrix Rules Feel Weird
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.6, maxWidth: 650, margin: '0 auto' }}>
                        When you first learn matrix multiplication, it feels like an arbitrary set of rules. Why row multiplied by column? Why is $AB$ different from $BA$? Let's break down the logic behind the math.
                    </p>
                </div>

                {/* Scenarios */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
                    {SCENARIOS.map((scenario, idx) => (
                        <div key={idx} style={{
                            background: '#fff', borderRadius: 20, border: '2px solid #E2E8F0', padding: '32px'
                        }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', margin: '0 0 12px 0' }}>
                                {scenario.title}
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#475569', margin: '0 0 20px 0', lineHeight: 1.6 }}>
                                <LatexText text={scenario.description} />
                            </p>

                            <div style={{
                                background: '#FFFBEB', borderRadius: 12, padding: 20, borderLeft: '4px solid #F59E0B'
                            }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#B45309', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                                    The Reason
                                </h4>
                                <p style={{ fontSize: '0.95rem', color: '#78350F', margin: 0, lineHeight: 1.5 }}>
                                    {scenario.why}
                                </p>
                            </div>

                            {scenario.mathExample && (
                                <div style={{ marginTop: 24, padding: 20, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ fontWeight: 600 }}>AB = </span>
                                            <MatrixGrid rows={2} cols={2} values={scenario.mathExample.a} compact={true} />
                                            <span style={{ margin: '0 4px', fontSize: 18 }}>×</span>
                                            <MatrixGrid rows={2} cols={2} values={scenario.mathExample.b} compact={true} />
                                            <span style={{ margin: '0 8px', fontSize: 20 }}>=</span>
                                            <MatrixGrid rows={2} cols={2} values={scenario.mathExample.ab} compact={true} />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ fontWeight: 600 }}>BA = </span>
                                            <MatrixGrid rows={2} cols={2} values={scenario.mathExample.b} compact={true} />
                                            <span style={{ margin: '0 4px', fontSize: 18 }}>×</span>
                                            <MatrixGrid rows={2} cols={2} values={scenario.mathExample.a} compact={true} />
                                            <span style={{ margin: '0 8px', fontSize: 20, color: '#DC2626', fontWeight: 'bold' }}>=</span>
                                            <MatrixGrid rows={2} cols={2} values={scenario.mathExample.ba} compact={true} />
                                        </div>
                                        <div style={{ color: '#DC2626', fontWeight: 600, fontSize: '0.9rem' }}>
                                            <AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
                                            Clearly, AB ≠ BA!
                                        </div>
                                    </div>
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
                        borderBottom: '4px solid #F59E0B'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <AlertTriangle size={28} color="#FBBF24" />
                            Test Your Knowledge
                        </h2>
                        <p style={{ color: '#94A3B8', margin: '8px 0 0 0', fontSize: '1.05rem' }}>
                            Pass this 4-question check to clear the section!
                        </p>
                    </div>

                    <div style={{ padding: '32px' }}>
                        <QuizEngine
                            questions={QUIZ_QUESTIONS}
                            skillId={12104}
                            skillName="Why The Rules Work"
                            onComplete={handleQuizComplete}
                            mastery={0.75}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices/how-operations')}
                        style={{
                            background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '16px 24px',
                            borderRadius: 12, fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                        }}
                    >
                        Back to "Operations"
                    </button>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices/where-applied')}
                        style={{
                            background: '#4F46E5', color: '#fff', border: 'none', padding: '16px 32px',
                            borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                        }}
                    >
                        Next: Where Matrices Are Applied <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhyRulesWork;
