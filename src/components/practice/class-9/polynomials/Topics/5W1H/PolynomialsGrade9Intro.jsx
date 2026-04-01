import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../polynomials_grade_9.css';
import { LatexText } from '../../../../../LatexText';

const CARDS = [
    {
        q: 'WHAT',
        label: 'What is a Polynomial?',
        icon: '🧊',
        color: '#0f4c81',
        short: 'An algebraic expression involving variables, coefficients, and non-negative integer exponents.',
        bullets: [
            'A POLYNOMIAL is an expression built from variables (like $x, y$) and constants (numbers), using addition, subtraction, and multiplication.',
            'The exponents of variables in a polynomial must be NON-NEGATIVE INTEGERS. So $x^2 + 5$ is a polynomial, but $x^{-2} + 5$ or $\\sqrt{x}$ are NOT.',
            'TERMS are the parts added together. In $3x^2 - 5x + 2$, the terms are $3x^2$, $-5x$, and $2$.',
            'COEFFICIENTS are the numbers multiplying the variables. In $3x^2 - 5x$, the coefficient of $x^2$ is $3$, and for $x$ it is $-5$.',
            'DEGREE is the highest power of the variable. E.g., The degree of $4x^3 - x + 1$ is $3$ (a cubic polynomial).',
        ],
    },
    {
        q: 'WHO',
        label: 'Who Uses Polynomials?',
        icon: '👨‍🔬',
        color: '#1a237e',
        short: 'Engineers, physicists, economists, computer scientists, and mathematicians.',
        bullets: [
            '🏗️ Engineers — Model curves for roads, bridges, and rollercoasters using polynomial equations.',
            '🌌 Physicists — Predict the trajectory of moving objects (like a thrown ball, which follows a quadratic path).',
            '📈 Economists — Forecast trends and model profit/loss curves in business.',
            '💻 Computer Scientists — Use polynomials in encryption algorithms, error-correcting codes, and computer graphics.',
            '🧑‍🎓 Students like you — To build the fundamental algebra skills needed for calculus and advanced math!',
        ],
    },
    {
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        color: '#b71c1c',
        short: 'In rollercoasters, architecture, animated movies, and financial models.',
        bullets: [
            '🎢 Rollercoasters — The smooth drops and loops are designed using polynomial curves.',
            '🌉 Bridges — The cables of a suspension bridge form a perfect parabola (a degree-2 polynomial).',
            '🎬 Animation (CGI) — Spline curves (made of polynomials) create smooth shapes and movements for characters.',
            '💸 Finance — Calculating compound interest over multiple years involves polynomial expressions.',
            '🛰️ Space Orbits — Trajectories of planets and satellites are often approximated using polynomials.',
        ],
    },
    {
        q: 'WHEN',
        label: 'When Did Polynomials Emerge?',
        icon: '⏳',
        color: '#6a1b9a',
        short: 'From ancient Babylonian equations to modern AI algorithms and space exploration.',
        bullets: [
            '📜 ~2000 BC — Ancient Babylonians solved quadratic equations (degree-2 polynomials) on clay tablets for land and trade calculations.',
            '🏛️ ~300 BC — Greek mathematicians like Euclid and Diophantus studied polynomial-like relationships in geometry.',
            '📖 16th–17th Century — Mathematicians like Cardano and Descartes developed general methods to solve cubic and quartic polynomials.',
            '🏫 In Class 9 — You learn to factor, find zeroes, and apply algebraic identities — skills that unlock algebra, calculus, and beyond.',
            '🤖 Today — Polynomials power machine learning models, cryptographic security, signal processing, and rocket trajectory computations.',
        ],
    },
    {
        q: 'WHY',
        label: 'Why Learn Polynomials?',
        icon: '💡',
        color: '#e65100',
        short: 'To simplify complex problems, predict future trends, and lay the foundation for calculus.',
        bullets: [
            '🔍 Simplifying the Complex — They turn messy real-world relationships into clean, solvable equations.',
            '📈 Prediction — If you know the polynomial model for a company\'s growth, you can predict future profits.',
            '🛠️ Problem Solving Tool — Factoring polynomials is a critical tool for solving equations of all kinds.',
            '📐 Gateway to Calculus — Understanding slopes and areas (the heart of calculus) requires mastering polynomials first.',
            '💡 Generalizing Patterns — Polynomials let us describe patterns like $a^2 - b^2$ that work for any numbers.',
        ],
    },
    {
        q: 'HOW',
        label: 'How Do We Solve These Problems?',
        icon: '✏️',
        color: '#0f766e',
        short: 'By finding zeroes, factoring, and applying algebraic identities.',
        bullets: [
            '1️⃣ Finding Zeroes: Set the polynomial $p(x) = 0$ and solve for $x$. These are the values where the polynomial evaluates to zero.',
            '2️⃣ Checking Values: Substitute a number for $x$. If $p(2) = 0$, then $2$ is a zero, and $(x - 2)$ is a factor.',
            '3️⃣ Factor Theorem: If $p(a) = 0$, then $(x - a)$ is a factor. We use this to break down complex polynomials into simpler pieces.',
            '4️⃣ Using Identities: Patterns make math fast! Expand $(x + y)^2 = x^2 + 2xy + y^2$ without multiplying it out manually.',
            '5️⃣ Splitting the Middle Term: Factor quadratics like $x^2 + 5x + 6$ by finding numbers that add to $5$ and multiply to $6$.',
        ],
    },
];

export default function PolynomialsGrade9Intro() {
    const navigate = useNavigate();
    const [openCard, setOpenCard] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggle = (idx) => setOpenCard((prev) => (prev === idx ? null : idx));

    return (
        <div className="poly-page">
            {/* ── TOP NAV ──────────────────────────────────── */}
            <nav className="poly-nav">
                <button className="poly-nav-back" onClick={() => navigate('/senior/grade/9/polynomials')}>
                    ← Back to Polynomials
                </button>
                <div className="poly-nav-links">
                    <button className="poly-nav-link poly-nav-link--active">🌟 Introduction</button>
                    <button className="poly-nav-link" onClick={() => navigate('/senior/grade/9/polynomials/terminology')}>
                        📖 Terminology
                    </button>
                    <button className="poly-nav-link" onClick={() => navigate('/senior/grade/9/polynomials/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="poly-module-hero">
                <h1 className="poly-module-title">
                    Discover Polynomials Through{' '}
                    <span className="poly-accent-text">6 Big Questions</span>
                </h1>
                <p className="poly-module-subtitle">
                    Tap each card to explore ✨
                </p>
            </div>

            {/* ── ACCORDION CARDS ──────────────────────────── */}
            <div className="poly-section">
                <div className="poly-5w1h-grid">
                    {CARDS.map((card, idx) => {
                        const isOpen = openCard === idx;
                        return (
                            <div
                                key={card.q}
                                className="poly-5w1h-card"
                                style={{ borderColor: isOpen ? card.color : undefined }}
                            >
                                {/* Header */}
                                <div
                                    className="poly-5w1h-header"
                                    onClick={() => toggle(idx)}
                                    style={{ background: isOpen ? `${card.color}10` : undefined }}
                                >
                                    <div className="poly-5w1h-icon" style={{ background: `${card.color}15` }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="poly-5w1h-label" style={{ color: card.color }}>{card.q}</div>
                                        <div className="poly-5w1h-q">{card.label}</div>
                                        {!isOpen && (
                                            <p style={{ margin: '5px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                                                {card.short}
                                            </p>
                                        )}
                                    </div>
                                    <div
                                        className={`poly-5w1h-chevron ${isOpen ? 'poly-5w1h-chevron--open' : ''}`}
                                        style={{ color: card.color }}
                                    >⌄</div>
                                </div>

                                {/* Expandable body */}
                                {isOpen && (
                                    <div className="poly-5w1h-body">
                                        <ul className="poly-5w1h-list">
                                            {card.bullets.map((b, bi) => (
                                                <li key={bi} className="poly-5w1h-item">
                                                    <LatexText text={b} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="poly-cta-section">
                    <p className="poly-cta-text">
                        Ready to learn the vocabulary? 📖
                    </p>
                    <button
                        className="poly-btn-primary poly-btn-large"
                        onClick={() => navigate('/senior/grade/9/polynomials/terminology')}
                    >
                        Next: Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
