import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '../../../../../LatexText';
import '../../linear_equations.css';

const CARDS = [
    {
        id: 'what',
        question: 'WHAT',
        label: ' What is a linear equation in one variable?',
        icon: '⚖️',
        color: '#7c3aed',
        body: `A <strong>linear equation in one variable</strong> is an algebraic equation that:<br/><br/>
               <ul>
                 <li>Has only <strong>one variable</strong> (like $x$, $y$, $z$, $t$…)</li>
                 <li>Has the <strong>highest power of the variable equal to 1</strong></li>
                 <li>Contains an <strong>equality sign (=)</strong> separating LHS and RHS</li>
               </ul>`,
        examples: [
            { label: 'Linear', expr: '$2x - 3 = 7$' },
            { label: 'Linear', expr: '$\\dfrac{x}{3} + \\dfrac{5}{2} = -\\dfrac{3}{2}$' },
            { label: 'NOT linear', expr: '$x^2 + 1 = 5$ (power > 1)' },
        ],
    },
    {
        id: 'who',
        question: 'WHO',
        label: 'Who uses linear equations?',
        icon: '👩‍🔬',
        color: '#0891b2',
        body: `Linear equations are used by everyone who needs to find an unknown:<br/><br/>
               <ul>
                 <li><strong>Shopkeepers</strong> — figuring out how many coins of each denomination to give</li>
                 <li><strong>Architects</strong> — calculating lengths and perimeters of shapes</li>
                 <li><strong>Scientists</strong> — modelling unknown quantities in experiments</li>
                 <li><strong>Accountants</strong> — balancing money across denominations</li>
                 <li><strong>Anyone</strong> — solving age puzzles or ratio problems in daily life</li>
               </ul>`,
        examples: [],
    },
    {
        id: 'when',
        question: 'WHEN',
        label: 'Whendo we form a linear equation?',
        icon: '⏱️',
        color: '#059669',
        body: `We form a linear equation when a real-world situation has:<br/><br/>
               <ul>
                 <li><strong>One unknown quantity</strong> we need to find</li>
                 <li>A relationship that <strong>describes equality</strong> between two expressions</li>
               </ul>
               Examples of when this happens:<br/>
               <ul>
                 <li>&ldquo;The sum of two numbers is 74 and one is 10 more than the other&rdquo;</li>
                 <li>&ldquo;Perimeter of a rectangle is 13 cm and width is given&rdquo;</li>
                 <li>&ldquo;Mother's age is 3 times child's age. In 5 years their ages add to 66.&rdquo;</li>
               </ul>`,
        examples: [],
    },
    {
        id: 'where',
        question: 'WHERE',
        label: 'Where are linear equations applied?',
        icon: '🌍',
        color: '#d97706',
        body: `Linear equations appear in real life across many domains (all from your textbook §2.3, §2.5):<br/><br/>
               <ul>
                 <li><strong>Number puzzles</strong> — sum, difference, ratio of two numbers</li>
                 <li><strong>Geometry</strong> — finding unknown lengths from perimeter formulas</li>
                 <li><strong>Age problems</strong> — present ages, ages after $n$ years</li>
                 <li><strong>Money &amp; coins</strong> — ₹2, ₹5, ₹50 coin denomination problems</li>
                 <li><strong>Digit problems</strong> — two-digit numbers with interchanged digits (§2.5)</li>
                 <li><strong>Consecutive number problems</strong> — sums of consecutive multiples</li>
               </ul>`,
        examples: [],
    },
    {
        id: 'why',
        question: 'WHY',
        label: 'Why do we learn linear equations?',
        icon: '💡',
        color: '#dc2626',
        body: `Before equations, the only way to find an unknown was <strong>trial and error</strong>.
               Linear equations give us a <strong>systematic, reliable method</strong>:<br/><br/>
               <ul>
                 <li>Solutions can be <strong>any rational number</strong>, not just whole numbers</li>
                 <li>We can check answers by substituting back: if $\\text{LHS} = \\text{RHS}$, the solution is correct</li>
                 <li>One strategy works for <strong>all types</strong> of one-variable problems</li>
               </ul>
               Example: $x = 5$ is the solution of $2x - 3 = 7$ because $2(5)-3 = 7 = \\text{RHS}$ ✓`,
        examples: [],
    },
    {
        id: 'how',
        question: 'HOW',
        label: 'How do we solve linear equations?',
        icon: '✏️',
        color: '#4f46e5',
        body: `The textbook teaches <strong>four solution strategies</strong>:<br/><br/>
               <ul>
                 <li><strong>1. Balancing (§2.2)</strong> — perform the same operation on both sides:<br/>
                     $2x - 3 = 7 \\Rightarrow 2x = 10 \\Rightarrow x = 5$</li>
                 <li><strong>2. Transposition (§2.2–§2.4)</strong> — move terms across $=$ with sign flip:<br/>
                     $15 - 7x = 9 \\Rightarrow -7x = 9 - 15 \\Rightarrow x = \\dfrac{-6}{7}$</li>
                 <li><strong>3. LCM Method (§2.6)</strong> — multiply both sides by LCM to clear fractions</li>
                 <li><strong>4. Cross-multiplication (§2.7)</strong> — for $\\dfrac{ax+b}{cx+d} = \\dfrac{p}{q}$, cross-multiply to get a linear equation</li>
               </ul>`,
        examples: [],
    },
];

export default function LinearEquationsIntro5W1H() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const toggle = (id) => setOpen(prev => prev === id ? null : id);

    return (
        <div className="leq-page">
            {/* ── NAV ──────────────────────────────── */}
            <nav className="leq-nav">
                <button className="leq-nav-back" onClick={() => navigate('/senior/grade/8/linear-equations')}>
                    ← Linear Equations
                </button>
                <div className="leq-nav-links">
                    <button className="leq-nav-link leq-nav-link--active">🌟 Introduction</button>
                    <button className="leq-nav-link" onClick={() => navigate('/senior/grade/8/linear-equations/terminology')}>📖 Terminology</button>
                    <button className="leq-nav-link" onClick={() => navigate('/senior/grade/8/linear-equations/skills')}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── HERO BANNER ───────────────────────────── */}
            <div style={{
                background: 'linear-gradient(90deg, #0c4a6e 0%, #4f46e5 100%)',
                padding: '16px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>

                <h1 style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '24px',
                    fontWeight: 900, color: '#ffffff', margin: '0 0 4px'
                }}>
                    Discover Linear Equations Through{' '}
                    <span style={{ color: '#fde047' }}>
                        6 Big Questions
                    </span>
                </h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, margin: 0, fontWeight: 500 }}>
                    Tap each card to explore ✨
                </p>
            </div>

            {/* ── 5W1H GRID ────────────────────────── */}
            <div className="leq-section">
                <div className="leq-5w1h-grid">
                    {CARDS.map((card, idx) => {
                        const isOpen = open === card.id;
                        return (
                            <div key={card.id} className="leq-5w1h-card"
                                style={{ borderColor: isOpen ? card.color : undefined }}>

                                {/* Header (always visible) */}
                                <div
                                    className="leq-5w1h-header"
                                    onClick={() => toggle(card.id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && toggle(card.id)}
                                    style={{ background: isOpen ? `${card.color}10` : undefined }}
                                >
                                    <div
                                        className="leq-5w1h-icon"
                                        style={{ background: `${card.color}15` }}
                                    >
                                        {card.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="leq-5w1h-label" style={{ color: card.color }}>{card.question}</div>
                                        <div className="leq-5w1h-q">{card.label}</div>
                                    </div>
                                    <div style={{
                                        fontSize: 20, fontWeight: 900, color: card.color,
                                        transition: 'transform 0.3s ease',
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        flexShrink: 0, marginLeft: 8
                                    }}>⌄</div>
                                </div>

                                {/* Collapsible body */}
                                {isOpen && (
                                    <div className="leq-5w1h-body">
                                        <LatexText text={card.body} />
                                        {card.examples.length > 0 && (
                                            <div style={{ marginTop: 14 }}>
                                                {card.examples.map((ex, i) => (
                                                    <div key={i} className="leq-math-example">
                                                        <strong style={{ color: '#64748b', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>
                                                            {ex.label}:
                                                        </strong>{' '}
                                                        <LatexText text={ex.expr} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
