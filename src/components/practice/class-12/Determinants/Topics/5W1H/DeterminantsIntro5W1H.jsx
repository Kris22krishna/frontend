import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../Math-Branches/Algebra/algebra.css';
import MathRenderer from '../../../../../MathRenderer';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is a Determinant?',
        icon: '🔍',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        content: `A determinant is a scalar value associated with a square matrix. For a $2 \\times 2$ matrix $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, the determinant is $|A| = ad - bc$. For a $3 \\times 3$ matrix, we expand using cofactors along any row or column. Determinants tell us crucial information about the matrix — whether it is invertible, the scaling factor of a transformation, and much more!`,
        fact: '💡 Determinants can be negative, zero, or positive. A zero determinant means the matrix is singular (non-invertible)!',
    },
    {
        q: 'WHO',
        label: 'Who developed Determinants?',
        icon: '👥',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Determinants were developed formally by Gottfried Wilhelm Leibniz in the 17th century and popularised by Gabriel Cramer, who used them to solve systems of linear equations (Cramer\'s Rule). Later, mathematicians like Cauchy and Jacobi expanded the theory significantly. Today, determinants are a cornerstone of linear algebra used by engineers, physicists, computer scientists, and economists worldwide.`,
        fact: '💡 Cramer\'s Rule (1750) was one of the first systematic methods for solving linear systems — and it\'s powered entirely by determinants!',
    },
    {
        q: 'WHEN',
        label: 'When do we use Determinants?',
        icon: '📅',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        content: `Use determinants whenever you need to: check if a matrix is invertible ($|A| \\neq 0$), solve a system of linear equations using Cramer\'s Rule, find the area of a triangle given three vertices, test collinearity of three points, or compute the inverse of a matrix using the adjoint method. They are the gateway to understanding linear transformations.`,
        fact: '💡 Before computing the inverse of any matrix, always check the determinant first — if it is zero, the inverse does not exist!',
    },
    {
        q: 'WHERE',
        label: 'Where are Determinants applied?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        content: `Determinants appear everywhere in applied mathematics! In computer graphics, they help calculate transformations and detect orientation changes. In economics, they determine equilibrium conditions in input-output models. In engineering, they solve circuit equations and structural analysis problems. In physics, they describe coordinate transformations and quantum states.`,
        fact: '💡 The cross product of two 3D vectors is computed using a $3 \\times 3$ determinant — that\'s how game engines calculate surface normals!',
    },
    {
        q: 'WHY',
        label: 'Why learn Determinants?',
        icon: '🚀',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Determinants are the key that unlocks matrix invertibility, system solvability, and geometric area computations. Without determinants, you cannot compute matrix inverses, solve systems via Cramer\'s Rule, or understand the geometric meaning of linear transformations. They bridge algebra and geometry, and are essential for advanced topics like eigenvalues and differential equations.`,
        fact: '💡 The determinant tells you the "scaling factor" of a linear transformation — if $|A| = 2$, the transformation doubles areas!',
    },
    {
        q: 'HOW',
        label: 'How do Determinants work?',
        icon: '🎯',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        content: `For a $2 \\times 2$ matrix: multiply the main diagonal, multiply the cross diagonal, and subtract. For a $3 \\times 3$ matrix: expand along any row or column using cofactors — $|A| = a_{11}A_{11} + a_{12}A_{12} + a_{13}A_{13}$, where cofactor $A_{ij} = (-1)^{i+j} M_{ij}$ and $M_{ij}$ is the minor (determinant of the submatrix after deleting row $i$ and column $j$).`,
        fact: '💡 You can expand along any row or column — the result is always the same! Choose the one with the most zeros for easiest calculation.',
    },
];

function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`intro-card${open ? ' intro-card--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            style={{
                borderColor: open ? card.gradFrom + '60' : '#e2e8f0',
                boxShadow: open ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
            }}
        >
            <div className="intro-card-strip" style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }} />
            <div className="intro-card-header">
                <div className="intro-card-icon" style={{ background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`, boxShadow: `0 4px 14px ${card.shadow}` }}>{card.icon}</div>
                <div className="intro-card-title-block">
                    <div className="intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="intro-card-sublabel">{card.label}</div>
                </div>
                <div className="intro-card-chevron" style={{ color: open ? card.gradFrom : '#94a3b8', transform: open ? 'rotate(180deg)' : 'none' }}>▼</div>
            </div>
            {!open && <div className="intro-card-hint">Tap to explore →</div>}
            {open && (
                <div className="intro-card-body">
                    <div className="intro-card-content"><MathRenderer text={card.content} /></div>
                    <div className="intro-card-fact" style={{ background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`, borderColor: card.gradFrom + '30' }}>
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function DeterminantsIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="intro-page">
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/senior/grade/12/determinants')}>← Back to Determinants</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link intro-nav-link--active" onClick={() => navigate('/senior/grade/12/determinants/introduction')}>🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/senior/grade/12/determinants/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/senior/grade/12/determinants/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="intro-hero-deco intro-hero-deco-a" />
                <div className="intro-hero-deco intro-hero-deco-b" />
                <div className="intro-hero-inner">
                    <h1 className="intro-hero-title">
                        Discover Determinants Through{' '}
                        <span className="intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            <div className="intro-content" style={{ padding: '10px 24px 20px' }}>
                <div className="intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>
                <div className="intro-cta-strip">
                    <p className="intro-cta-sub" style={{ margin: 0 }}>Up next: 8 key terms &amp; 6 golden rules</p>
                    <button className="intro-cta-btn" onClick={() => navigate('/senior/grade/12/determinants/terminology')}>Terminology →</button>
                </div>
            </div>
        </div>
    );
}
