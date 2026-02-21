import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, LineChart, Code, BrainCircuit, ShieldCheck, ChevronRight } from 'lucide-react';
import QuizEngine from '../components/QuizEngine';

const ROLES = [
    {
        icon: <Monitor size={32} color="#3B82F6" />,
        title: '3D Graphics & Game Developers',
        color: '#EFF6FF',
        borderColor: '#BFDBFE',
        description: 'Every time a character moves, rotates, or shrinks in a 3D game, a matrix multiplication is happening behind the scenes to calculate new pixel coordinates on your screen.'
    },
    {
        icon: <BrainCircuit size={32} color="#8B5CF6" />,
        title: 'AI & Data Scientists',
        color: '#F5F3FF',
        borderColor: '#DDD6FE',
        description: 'Neural networks are essentially giant grids of numbers. Training AI (like ChatGPT) involves billions of matrix multiplications to find patterns in data.'
    },
    {
        icon: <Code size={32} color="#10B981" />,
        title: 'Software Engineers',
        color: '#ECFDF5',
        borderColor: '#A7F3D0',
        description: "Search engines use massive matrices to rank web pages (like Google's original PageRank). Network engineers use matrices to route traffic across the internet."
    },
    {
        icon: <LineChart size={32} color="#F59E0B" />,
        title: 'Economists & Quantitative Analysts',
        color: '#FFFBEB',
        borderColor: '#FDE68A',
        description: 'Matrices are used to model complex financial systems, optimize investment portfolios, and predict how changes in one industry affect others (Input-Output models).'
    },
    {
        icon: <ShieldCheck size={32} color="#EF4444" />,
        title: 'Cryptographers',
        color: '#FEF2F2',
        borderColor: '#FECACA',
        description: 'Matrices are used in encoding and decoding secret messages. Matrix-based cryptography is even being developed to be secure against future quantum computers!'
    }
];

const QUIZ_QUESTIONS = [
    {
        id: 'who1',
        text: 'Which field uses matrices to rotate and translate objects on a screen?',
        options: ['3D Graphics & Gaming', 'Economics', 'Cryptography', 'Marine Biology'],
        correctAnswer: '3D Graphics & Gaming',
        solution: `1. Matrix transformations are the core of computer graphics.
2. Translating (moving), scaling, and rotating coordinates is done by multiplying point matrices with transformation matrices.`,
        hints: ['Think of what involves drawing pixels on a screen.']
    },
    {
        id: 'who2',
        text: 'How do AI and Machine Learning systems primarily utilize matrices?',
        options: ['To draw charts', 'To process and store massive datasets and weights', 'To encrypt messages', 'To route internet traffic'],
        correctAnswer: 'To process and store massive datasets and weights',
        solution: `1. Neural networks map inputs to outputs using weights.
2. These weights are stored as matrices, allowing the system to process many inputs simultaneously using matrix multiplication.`,
    },
    {
        id: 'who3',
        text: 'Which profession uses "Input-Output" matrix models to see how changes in one sector affect the entire system?',
        options: ['Cryptographers', 'Game Developers', 'Economists', 'Marine Biologists'],
        correctAnswer: 'Economists',
        solution: `1. Input-Output models track how different industries interact (e.g., how much steel the auto industry needs).
2. Economists use large matrices to predict how a shock to one industry ripples through the whole economy.`,
        hints: ['Think about money, industries, and financial forecasting.']
    },
    {
        id: 'who4',
        text: 'If a cryptographer wants to decode a message that was encrypted using a Key Matrix $K$, what matrix must they use?',
        options: ['The transpose, $K^T$', 'The identity matrix, $I$', 'The zero matrix, $O$', 'The inverse, $K^{-1}$'],
        correctAnswer: 'The inverse, $K^{-1}$',
        solution: `1. Encryption is like multiplying by $K$.
2. To undo multiplication in matrix algebra, you multiply by the inverse $K^{-1}$.
3. Therefore, the receiver must securely know $K^{-1}$ to decode the message.`,
        hints: ['What operation "undoes" matrix multiplication?']
    }
];

const WhoUsesMatrices = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuizComplete = (score, total) => {
        if (score / total >= 0.5) {
            try {
                const progress = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
                progress['who-uses'] = true;
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
                        Who Uses Matrices?
                    </div>
                </div>
                <div style={{
                    background: '#FEF3C7', color: '#D97706', padding: '6px 14px',
                    borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em'
                }}>
                    SECTION 1 • INTRODUCTION
                </div>
            </nav>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#1E293B', marginBottom: 16 }}>
                        Matrices are everywhere.
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
                        They aren't just abstract tables of numbers. They are the engine powering modern technology, from the screen you're looking at to the AI reading this text.
                    </p>
                </div>

                {/* Roles List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
                    {ROLES.map((role, idx) => (
                        <div key={idx} style={{
                            background: role.color,
                            border: `2px solid ${role.borderColor}`,
                            borderRadius: 16,
                            padding: '24px',
                            display: 'flex',
                            gap: 20,
                            alignItems: 'flex-start',
                            transition: 'transform 0.2s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                width: 64, height: 64, borderRadius: 16, background: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                            }}>
                                {role.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', margin: '0 0 8px 0' }}>
                                    {role.title}
                                </h3>
                                <p style={{ fontSize: '1rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                                    {role.description}
                                </p>
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
                        borderBottom: '4px solid #3B82F6'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <BrainCircuit size={28} color="#60A5FA" />
                            Test Your Knowledge
                        </h2>
                        <p style={{ color: '#94A3B8', margin: '8px 0 0 0', fontSize: '1.05rem' }}>
                            Pass this 4-question check to complete the section!
                        </p>
                    </div>

                    <div style={{ padding: '32px' }}>
                        <QuizEngine
                            questions={QUIZ_QUESTIONS}
                            skillId={12100}
                            skillName="Who Uses Matrices?"
                            onComplete={handleQuizComplete}
                            mastery={0.75}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices/what-is')}
                        style={{
                            background: '#4F46E5', color: '#fff', border: 'none', padding: '16px 32px',
                            borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                        }}
                    >
                        Next: What is a Matrix? <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div >
    );
};

export default WhoUsesMatrices;
