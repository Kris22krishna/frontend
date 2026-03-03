import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout, Brain, Target, ArrowRight } from 'lucide-react';
import './matrices.css';

const MODULES = [
    {
        id: 'intro',
        title: 'Fundamental Concept',
        tagline: 'THE JOURNEY OF MATRICES',
        desc: 'Explore the 5W1H of Matrices—Who uses them, Why they matter, and How they shape modern technology.',
        icon: <Layout className="w-8 h-8" />,
        path: '/senior/grade/12/matrices/introduction',
        color: '#4F46E5'
    },
    {
        id: 'terms',
        title: 'Core Terminology',
        tagline: 'THE LANGUAGE OF ARRAYS',
        desc: 'Master the vocabulary: Rows, Columns, Order, and the unique types of matrices that form the basis of Linear Algebra.',
        icon: <Brain className="w-8 h-8" />,
        path: '/senior/grade/12/matrices/terminology',
        color: '#7C3AED'
    },
    {
        id: 'skills',
        title: 'Applied Skills',
        tagline: 'PRACTICE TO MASTERY',
        desc: 'Challenge yourself with operations, transpose, and invertible matrices. Real-world numerical problems solved algorithmically.',
        icon: <Target className="w-8 h-8" />,
        path: '/senior/grade/12/matrices/skills',
        color: '#0EA5E9'
    }
];

const STATS = [
    { label: 'TOPICS', value: '7' },
    { label: 'PRACTICE SETS', value: '14' },
    { label: 'LEVEL', value: 'SENIOR' }
];

export default function MatricesHub() {
    const navigate = useNavigate();

    return (
        <div className="mat-page">
            <div className="mat-fullpage">
                {/* Left Panel: Hero */}
                <div className="mat-left">
                    <div className="mat-left-deco" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mat-left-content"
                    >
                        <h1 className="mat-hero-title">
                            Digital <br />
                            <span className="mat-highlight">Matrices</span>
                        </h1>
                        <p className="mat-hero-sub">
                            Step into the world of rectangular arrays. The mathematical engine behind computer graphics, AI, and structural engineering.
                        </p>

                        <div style={{ display: 'flex', gap: '32px', marginTop: '40px' }}>
                            {STATS.map((stat, i) => (
                                <div key={stat.label}>
                                    <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', display: 'block' }}>{stat.value}</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Panel: Cards */}
                <div className="mat-right">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mat-card-list"
                    >
                        <div style={{ marginBottom: '32px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--mat-violet)', textTransform: 'uppercase', letterSpacing: '3px' }}>Class 12 Mathematics</span>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: '8px 0' }}>Linear Algebra Hub</h2>
                        </div>

                        {MODULES.map((mod, idx) => (
                            <div
                                key={mod.id}
                                className="mat-card"
                                onClick={() => navigate(mod.path)}
                            >
                                <div className="mat-card-icon" style={{ background: `${mod.color}15`, color: mod.color }}>
                                    {mod.icon}
                                </div>
                                <div className="mat-card-content">
                                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: mod.color, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{mod.tagline}</span>
                                    <h3>{mod.title}</h3>
                                    <p>{mod.desc}</p>
                                </div>
                                <div style={{ marginLeft: 'auto', color: 'var(--mat-border)' }}>
                                    <ArrowRight />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
