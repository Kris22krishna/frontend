import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, LineChart, Code, BrainCircuit, ShieldCheck, ChevronRight } from 'lucide-react';

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

const WhoUsesMatrices = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => {
                            try {
                                const progress = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
                                progress['who-uses'] = true;
                                localStorage.setItem('matrices_progress', JSON.stringify(progress));
                            } catch { }
                            navigate('/senior/grade/12/matrices/what-is');
                        }}
                        style={{
                            background: '#4F46E5', color: '#fff', border: 'none', padding: '16px 32px',
                            borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                        }}
                    >
                        Mark Complete & Next <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div >
    );
};

export default WhoUsesMatrices;
