import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Network, Lock, ChevronRight } from 'lucide-react';
import { LatexText } from '../../../LatexText';
import QuizEngine from '../components/QuizEngine';

const APPLICATIONS = [
    {
        icon: <Network size={28} color="#0EA5E9" />,
        title: "PageRank: How Google Maps the Internet",
        description: "Google's original search algorithm (PageRank) models the entire internet as a giant matrix where rows and columns are websites, and entries are links between them. By finding the 'eigenvector' of this massive matrix, it determines which pages are most important.",
        color: "#F0F9FF",
        borderColor: "#BAE6FD"
    },
    {
        icon: <Search size={28} color="#8B5CF6" />,
        title: "Image Processing & Filters",
        description: "An image on your screen is just a huge matrix of pixels (usually 3 matrices for Red, Green, and Blue). When you apply a blur or sharpen filter on Instagram, your phone is multiplying that image matrix by a small 'kernel' matrix.",
        color: "#F5F3FF",
        borderColor: "#DDD6FE"
    },
    {
        icon: <Lock size={28} color="#F43F5E" />,
        title: "Hill Cipher Cryptography",
        description: "You can encrypt a secret message by converting letters into numbers, grouping them into a matrix, and multiplying them by a secret 'Key Matrix'. To decrypt the message, the receiver multiplies it by the inverse of the Key Matrix.",
        color: "#FFF1F2",
        borderColor: "#FECDD3"
    }
];

const QUIZ_QUESTIONS = [
    {
        id: 'where1',
        text: 'How does an image filter (like blur) work under the hood?',
        options: [
            'It changes the color palette randomly',
            'It multiplies the image matrix by a smaller filter matrix (kernel)',
            'It deletes pixels to make it blurry',
            'It converts the image to sound'
        ],
        correctAnswer: 'It multiplies the image matrix by a smaller filter matrix (kernel)',
        solution: `1. Images are matrices of pixel values.
2. Filters (convolution) work by sliding a small matrix (kernel) over the image matrix and doing matrix operations.`,
        hints: ['Think of the image as a grid of numbers.']
    },
    {
        id: 'where2',
        text: 'In the PageRank algorithm, what do the matrix entries represent?',
        options: [
            'The color of the website',
            'The number of words on the page',
            'Hyperlinks from one website to another',
            'The IP address of the server'
        ],
        correctAnswer: 'Hyperlinks from one website to another',
        solution: `1. The internet is modeled as a graph.
2. An adjacency matrix is created where element $a_{ij}$ is 1 if page $j$ links to page $i$.`,
    },
    {
        id: 'where3',
        text: 'When encrypting a message with a Hill Cipher, what happens if the Key Matrix cannot be inverted (has no inverse)?',
        options: [
            'The message becomes permanently unreadable',
            'The message cannot be decrypted because you cannot reverse the multiplication',
            'The encryption is considered perfectly secure',
            'The message is encrypted twice'
        ],
        correctAnswer: 'The message cannot be decrypted because you cannot reverse the multiplication',
        solution: `1. Cryptography requires a two-way process: encryption and decryption.
2. If the matrix $K$ encrypts the message, then $K^{-1}$ is needed to decrypt it.
3. If $K$ has no inverse, the receiver can never mathematically reverse the process to read the message.`,
        hints: ['What must exist to reverse matrix multiplication?']
    },
    {
        id: 'where4',
        text: 'In RGB images, how many matrices are normally used to represent a single full-color picture?',
        options: [
            'One large matrix',
            'Three matrices (Red, Green, Blue)',
            'Ten matrices',
            'It depends on the screen size'
        ],
        correctAnswer: 'Three matrices (Red, Green, Blue)',
        solution: `1. Digital color images are composed of three color channels: Red, Green, and Blue.
2. Each channel is represented as its own matrix of pixel intensity values (from 0 to 255).
3. These three matrices are stacked together to form the final image.`,
        hints: ['Think about what "RGB" stands for.']
    }
];

const WhereApplied = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuizComplete = (score, total) => {
        if (score / total >= 0.5) {
            try {
                const progress = JSON.parse(localStorage.getItem('matrices_progress') || '{}');
                progress['where-applied'] = true;
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
                        Where Matrices Are Applied
                    </div>
                </div>
                <div style={{
                    background: '#ECFDF5', color: '#059669', padding: '6px 14px',
                    borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em'
                }}>
                    SECTION 6 • APPLICATIONS
                </div>
            </nav>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1E293B', marginBottom: 16 }}>
                        Real-World Power
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748B', lineHeight: 1.6, maxWidth: 650, margin: '0 auto' }}>
                        Now that you know how matrices work, let's look at three specific, massive applications that run the modern world.
                    </p>
                </div>

                {/* Applications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
                    {APPLICATIONS.map((app, idx) => (
                        <div key={idx} style={{
                            background: app.color, borderRadius: 20, border: `2px solid ${app.borderColor}`,
                            padding: '32px', display: 'flex', gap: 24, alignItems: 'center'
                        }}>
                            <div style={{
                                width: 72, height: 72, borderRadius: 24, background: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                            }}>
                                {app.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1E293B', margin: '0 0 12px 0' }}>
                                    {app.title}
                                </h3>
                                <p style={{ fontSize: '1rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                                    {app.description}
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
                        borderBottom: '4px solid #8B5CF6'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Network size={28} color="#C4B5FD" />
                            Test Your Knowledge
                        </h2>
                        <p style={{ color: '#94A3B8', margin: '8px 0 0 0', fontSize: '1.05rem' }}>
                            Pass this 4-question check to clear the section!
                        </p>
                    </div>

                    <div style={{ padding: '32px' }}>
                        <QuizEngine
                            questions={QUIZ_QUESTIONS}
                            skillId={12105}
                            skillName="Where Matrices Are Applied"
                            onComplete={handleQuizComplete}
                            mastery={0.75}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate('/senior/grade/12/matrices')}
                        style={{
                            background: '#10B981', color: '#fff', border: 'none', padding: '16px 32px',
                            borderRadius: 12, fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        Finish Chapter Hub <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div >
    );
};

export default WhereApplied;
