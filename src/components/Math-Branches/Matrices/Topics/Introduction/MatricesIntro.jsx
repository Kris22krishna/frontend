import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Users, Calendar, Globe, Rocket, Target, ChevronDown } from 'lucide-react';
import './matrices.css';
import MathRenderer from '../../../../MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is a Matrix?',
        icon: <HelpCircle className="w-6 h-6" />,
        gradFrom: '#4F46E5',
        gradTo: '#7C3AED',
        shadow: 'rgba(79, 70, 229, 0.3)',
        content: "A **matrix** is a rectangular arrangement of numbers or functions into rows and columns. Think of it as a spreadsheet on steroids! We describe its size by its **order** ($m \\times n$), where $m$ is the number of rows and $n$ is columns.",
        fact: "The individual numbers in a matrix are called **elements** or **entries**, usually denoted as $a_{ij}$."
    },
    {
        q: 'WHO',
        label: 'Who uses them?',
        icon: <Users className="w-6 h-6" />,
        gradFrom: '#0D9488',
        gradTo: '#10B981',
        shadow: 'rgba(13, 148, 136, 0.3)',
        content: "Everyone in tech! **Game Developers** use them to rotate 3D characters. **AI Scientists** use them to train neural networks (like ChatGPT). **Cryptographers** use them to encrypt your secret messages.",
        fact: "When you play a 3D game, your computer performs millions of matrix multiplications every second!"
    },
    {
        q: 'WHEN',
        label: 'When did they start?',
        icon: <Calendar className="w-6 h-6" />,
        gradFrom: '#B45309',
        gradTo: '#F59E0B',
        shadow: 'rgba(245, 158, 11, 0.3)',
        content: "Basic ideas appeared in ancient China (200 BCE) for solving linear equations. However, the term 'Matrix' was coined much later in **1850** by James Joseph Sylvester. It's a relatively young but powerful math tool!",
        fact: "Arthur Cayley later developed the algebraic rules for matrices in 1858, changing math forever."
    },
    {
        q: 'WHERE',
        label: 'Where are they seen?',
        icon: <Globe className="w-6 h-6" />,
        gradFrom: '#BE185D',
        gradTo: '#EC4899',
        shadow: 'rgba(236, 72, 153, 0.3)',
        content: "Everywhere in the digital world! Each pixel on your screen is part of a giant matrix. Google's search algorithm originally used a massive matrix to rank every page on the internet (the PageRank algorithm).",
        fact: "Your phone's camera uses matrices to process light data into the photos you see!"
    },
    {
        q: 'WHY',
        label: 'Why learn them?',
        icon: <Rocket className="w-6 h-6" />,
        gradFrom: '#4338CA',
        gradTo: '#6366F1',
        shadow: 'rgba(99, 102, 241, 0.3)',
        content: "Matrices allow us to handle **thousands of equations** at once. They are the language of Linear Algebra, which is the foundation of modern physics, economics, and engineering. They help us simplify the complex.",
        fact: "Learning matrices is like getting the 'source code' for how modern software handles data."
    },
    {
        q: 'HOW',
        label: 'How to master them?',
        icon: <Target className="w-6 h-6" />,
        gradFrom: '#0369A1',
        gradTo: '#3B82F6',
        shadow: 'rgba(59, 130, 246, 0.3)',
        content: "Start by understanding **order and notation**. Then, learn the 'golden rules' of operations—addition is easy, but multiplication has its own special rhythm. Practice identifying types like Identity and Inverse matrices.",
        fact: "Don't rush! Visualising matrices as transformations (rotations/scaling) makes them much easier to grasp."
    }
];

function IntroCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`mat-intro-card ${open ? 'mat-intro-card--open' : ''}`}
            onClick={() => setOpen(!open)}
            style={{ cursor: 'pointer' }}
        >
            <div style={{ height: '6px', background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }} />
            <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    width: '48px', height: '48px', borderRadius: '16px',
                    background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', boxShadow: `0 8px 16px ${card.shadow}`
                }}>
                    {card.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: card.gradFrom, textTransform: 'uppercase', letterSpacing: '2px' }}>{card.q}</div>
                    <div style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 800 }}>{card.label}</div>
                </div>
                <motion.div animate={{ rotate: open ? 180 : 0 }} style={{ color: '#94a3b8' }}>
                    <ChevronDown size={20} />
                </motion.div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: '0 24px 24px' }}>
                            <div style={{ color: '#475569', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '20px' }}>
                                <MathRenderer text={card.content} />
                            </div>
                            <div style={{
                                padding: '16px', background: `${card.gradFrom}08`,
                                border: `1px solid ${card.gradFrom}20`, borderRadius: '16px',
                                fontSize: '0.9rem', color: card.gradFrom, fontStyle: 'italic'
                            }}>
                                <MathRenderer text={`💡 ${card.fact}`} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {!open && <div style={{ padding: '0 24px 16px', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'right' }}>Tap to learn more →</div>}
        </div>
    );
}

export default function MatricesIntro() {
    const navigate = useNavigate();

    return (
        <div className="mat-page">
            <nav className="mat-nav">
                <button className="mat-nav-link" onClick={() => navigate('/senior/grade/12/matrices')}>
                    ← Back to Hub
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="mat-nav-link mat-nav-link--active">🌟 Introduction</button>
                    <button className="mat-nav-link" onClick={() => navigate('/senior/grade/12/matrices/terminology')}>📖 Terminology</button>
                    <button className="mat-nav-link" onClick={() => navigate('/senior/grade/12/matrices/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ padding: '48px 24px', textAlign: 'center', background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: 'Outfit', fontSize: '3rem', fontWeight: 900, marginBottom: '12px' }}
                >
                    Discover the <span style={{ color: 'var(--mat-violet)' }}>Power of Matrices</span>
                </motion.h1>
                <p style={{ color: 'var(--mat-muted)', fontSize: '1.1rem' }}>Six big questions to kickstart your journey into Linear Algebra ✨</p>
            </div>

            <div className="mat-intro-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {cards5W1H.map((card, idx) => (
                    <IntroCard key={idx} card={card} />
                ))}
            </div>

            <div style={{ padding: '64px 24px', display: 'flex', justifyContent: 'center' }}>
                <button
                    className="mat-nav-link mat-nav-link--active"
                    style={{ padding: '16px 40px', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)' }}
                    onClick={() => navigate('/senior/grade/12/matrices/terminology')}
                >
                    Continue to Terminology →
                </button>
            </div>
        </div>
    );
}
