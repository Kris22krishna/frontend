import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../polynomials_grade_9.css';
import { LatexText } from '../../../../../LatexText';

import PolynomialsPracticeEngine from './Engines/PolynomialsPracticeEngine';
import PolynomialsAssessmentEngine from './Engines/PolynomialsAssessmentEngine';

import {
    buildIdentifyPracticePool,
    buildIdentifyAssessmentPool,
    buildZeroesPracticePool,
    buildZeroesAssessmentPool,
    buildFactorisationPracticePool,
    buildFactorisationAssessmentPool,
    buildIdentitiesPracticePool,
    buildIdentitiesAssessmentPool,
} from './PolynomialsGrade9SkillsData';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'identify-polynomials',
        title: 'Identifying Polynomials & Degree',
        subtitle: 'Skill 1 · Basics & Properties',
        icon: '🧊',
        color: '#0f4c81',
        desc: 'Identify if an expression is a polynomial, determine its degree, coefficients, and classify it by terms.',
        practicePool: buildIdentifyPracticePool,
        assessmentPool: buildIdentifyAssessmentPool,
        learn: {
            concept: 'The first step in algebra is recognizing your tools. Not every expression is a polynomial. Also, a polynomial\'s degree tells us its shape and behavior.',
            rules: [
                {
                    title: 'Recognizing a Polynomial',
                    f: '$\\text{Exponents must be NON-NEGATIVE INTEGERS: 0, 1, 2, ...}$',
                    d: 'To be a polynomial, the variables cannot be in the denominator, cannot be inside a square root or cube root, and cannot have negative exponents.',
                    ex: '✅ $x^2 + 5x + 6$ (Valid)\n✅ $5$ (Valid, degree 0)\n❌ $x + \\frac{1}{x} = x + x^{-1}$ (Invalid, negative exponent)\n❌ $\\sqrt{x} + 2$ (Invalid, fractional exponent)',
                    tip: 'If you see an $x$ under a fraction bar or under a root symbol, it is probably NOT a polynomial.',
                },
                {
                    title: 'Finding the Degree',
                    f: '$\\text{Degree} = \\text{Highest exponent of the variable}$',
                    d: 'The degree of a polynomial in one variable is the greatest power of that variable among all non-zero terms.',
                    ex: 'For $p(x) = 4x^3 - 2x^2 + x - 7$, the powers are $3, 2, 1, 0$. Highest is $3$. Degree $= 3$.\nFor $p(y) = y^8 - y^{10}$, highest power is $10$. Degree $= 10$.',
                    tip: 'Always look at the entire expression. The highest power isn\'t always written first!',
                },
                {
                    title: 'Coefficients and Terms',
                    f: '$\\text{Coefficient} = \\text{The number multiplying a variable}$',
                    d: 'Each part separated by $+$ or $-$ is a term. The sign attached to the number belongs to the coefficient.',
                    ex: 'In $5x^2 - 3x + 8$:\nThe coefficient of $x^2$ is $5$.\nThe coefficient of $x$ is $-3$ (not 3!).\nThe constant term is $8$.',
                    tip: 'If a term is missing, its coefficient is $0$. E.g., in $x^2 - 4$, the coefficient of $x$ is $0$.',
                },
                {
                    title: 'Classifying by Terms and Degree',
                    f: '$\\text{Terms: Monomial (1), Binomial (2), Trinomial (3)} \\quad | \\quad \\text{Degree: Linear (1), Quadratic (2), Cubic (3)}$',
                    d: 'We name polynomials based on their size (number of terms after simplifying) and their power (degree).',
                    ex: '$5x$ is a linear monomial.\n$x^2 - 9$ is a quadratic binomial.\n$x^3 + 2x^2 - x$ is a cubic trinomial.',
                    tip: 'Combine like terms before classifying! $x^2 + x - x^2$ is just $x$, so it is a linear monomial, not a quadratic binomial.',
                },
            ],
        },
    },
    {
        id: 'zeroes',
        title: 'Zeroes of a Polynomial',
        subtitle: 'Skill 2 · Value & Roots',
        icon: '🎯',
        color: '#1a237e',
        desc: 'Calculate the value of p(x) at given points and find the zeroes of linear polynomials.',
        practicePool: buildZeroesPracticePool,
        assessmentPool: buildZeroesAssessmentPool,
        learn: {
            concept: 'Evaluating a polynomial is like running a machine: you plug in a number and get an output. If the output is zero, you\'ve found a "Zero" of the polynomial.',
            rules: [
                {
                    title: 'Evaluating p(x)',
                    f: '$\\text{Substitute } x = a \\text{ into } p(x)$',
                    d: 'Replace every $x$ in the expression with the given number. Use parentheses to avoid sign errors, especially with exponents.',
                    ex: 'Let $p(x) = x^2 - 5x + 6$. Find $p(-2)$:\n$p(-2) = (-2)^2 - 5(-2) + 6$\n$p(-2) = 4 + 10 + 6 = 20$.',
                    tip: 'The most common mistake is writing $-2^2 = -4$. It should be $(-2)^2 = +4$.',
                },
                {
                    title: 'What is a Zero?',
                    f: '$a \\text{ is a zero if } p(a) = 0$',
                    d: 'A zero or root of a polynomial is simply the $x$-value that makes the entire polynomial equal to $0$.',
                    ex: 'Test if $3$ is a zero of $p(x) = x^2 - 9$:\n$p(3) = (3)^2 - 9 = 9 - 9 = 0$.\nYes, $3$ is a zero.',
                    tip: 'Zeroes are the x-intercepts on a graph—where the curve crosses the horizontal axis.',
                },
                {
                    title: 'Finding Zeroes of a Linear Polynomial',
                    f: '$\\text{Set } ax + b = 0 \\text{ and solve for } x$',
                    d: 'Every linear polynomial (degree 1) has exactly one zero. Just create an equation setting it to $0$ and solve.',
                    ex: 'Find the zero of $p(x) = 2x - 5$:\n$2x - 5 = 0$\n$2x = 5$\n$x = \\frac{5}{2}$.',
                    tip: 'The general formula for the zero of $ax + b$ is always $x = \\frac{-b}{a}$.',
                },
            ],
        },
    },
    {
        id: 'factorisation',
        title: 'Factorisation & Factor Theorem',
        subtitle: 'Skill 3 · Breaking down equations',
        icon: '✂️',
        color: '#b71c1c',
        desc: 'Use the Factor Theorem to verify factors and factorise quadratic polynomials by splitting the middle term.',
        practicePool: buildFactorisationPracticePool,
        assessmentPool: buildFactorisationAssessmentPool,
        learn: {
            concept: 'Factoring means breaking an expression into a product of simpler polynomials. It is the reverse of expanding brackets.',
            rules: [
                {
                    title: 'The Factor Theorem',
                    f: '$\\text{If } p(a) = 0, \\text{ then } (x - a) \\text{ is a factor of } p(x)$',
                    d: 'This is a powerful shortcut. To verify if $(x - a)$ divides evenly into $p(x)$, you don\'t need to do long division. Just plug $a$ into the polynomial and check if you get $0$.',
                    ex: 'Check if $(x-2)$ is a factor of $x^3 - 8$:\nSet $x = 2$. $p(2) = 2^3 - 8 = 8 - 8 = 0$.\nSince $p(2) = 0$, yes, $(x-2)$ is a factor.',
                    tip: 'Careful with signs! To check if $(x + 5)$ is a factor, you must test $p(-5)$, not $p(+5)$.',
                },
                {
                    title: 'Splitting the Middle Term',
                    f: '$\\text{For } ax^2+bx+c, \\text{ find numbers } p \\text{ and } q \\text{ so } p+q=b \\text{ and } p \\cdot q = ac$',
                    d: 'To factor quadratic trinomials, split the middle $bx$ term into two terms, then factor by grouping.',
                    ex: 'Factorise $x^2 + 7x + 12$:\nNeed $p+q = 7$ and $p \\cdot q = 12$. The numbers are $3$ and $4$.\n$= x^2 + 3x + 4x + 12$\n$= x(x+3) + 4(x+3) = (x+3)(x+4)$.',
                    tip: 'If the constant $c$ is positive, both numbers have the same sign (matching $b$). If $c$ is negative, they have opposite signs.',
                },
                {
                    title: 'Taking out Common Factors',
                    f: '$ab + ac = a(b + c)$',
                    d: 'ALWAYS look for a greatest common factor (GCF) before trying harder methods.',
                    ex: 'Factorise $4x^3 - 12x^2$:\nBoth terms share $4$ and $x^2$.\n$= 4x^2(x - 3)$.',
                    tip: 'Skipping the common factor is a common trap. Start every factoring problem by looking for a GCF.',
                },
            ],
        },
    },
    {
        id: 'identities',
        title: 'Algebraic Identities',
        subtitle: 'Skill 4 · Shortcuts in Algebra',
        icon: '🧬',
        color: '#455a64',
        desc: 'Apply squares, difference of squares, and cubic identities to expand expressions and calculate values.',
        practicePool: buildIdentitiesPracticePool,
        assessmentPool: buildIdentitiesAssessmentPool,
        learn: {
            concept: 'Identities are formulas that are true for every value. They act as "cheat codes" for expanding and factoring without tedious multiplication.',
            rules: [
                {
                    title: 'The Square of a Binomial',
                    f: '$(x+y)^2 = x^2+2xy+y^2 \\quad | \\quad (x-y)^2 = x^2-2xy+y^2$',
                    d: 'When squaring a sum or difference, do not forget the middle term $2xy$! $(x+y)^2$ is NOT $x^2+y^2$.',
                    ex: 'Expand $(3a - 5b)^2$:\n$= (3a)^2 - 2(3a)(5b) + (5b)^2$\n$= 9a^2 - 30ab + 25b^2$.',
                    tip: 'Use this for mental math: $102^2 = (100+2)^2 = 10000 + 400 + 4 = 10404$.',
                },
                {
                    title: 'Difference of Two Squares',
                    f: '$x^2 - y^2 = (x - y)(x + y)$',
                    d: 'This is the most useful identity. Easily factor the subtraction of two perfect squares into the product of their sum and difference.',
                    ex: 'Factorise $49x^2 - 16$:\n$= (7x)^2 - 4^2$\n$= (7x - 4)(7x + 4)$.',
                    tip: 'Mental math: $98 \\times 102 = (100-2)(100+2) = 100^2 - 2^2 = 10000 - 4 = 9996$.',
                },
                {
                    title: 'Identity IV: (x+a)(x+b)',
                    f: '$(x+a)(x+b) = x^2 + (a+b)x + ab$',
                    d: 'Useful when multiplying two binomials that share the same first term but different second terms.',
                    ex: 'Expand $(x+3)(x-5)$:\nHere $a=3, b=-5$.\n$= x^2 + (3 - 5)x + (3)(-5)$\n$= x^2 - 2x - 15$.',
                    tip: 'This is just the reverse of splitting the middle term!',
                },
                {
                    title: 'Cubic Identities',
                    f: '$(x+y)^3 = x^3+y^3+3xy(x+y) \\quad | \\quad x^3+y^3 = (x+y)(x^2-xy+y^2)$',
                    d: 'Notice the pattern: for $(x+y)^3$, everything is positive. For $(x-y)^3$, all signs are negative except the first term.',
                    ex: 'Factorise sum of cubes: $8x^3 + 27$:\n$= (2x)^3 + 3^3$\n$= (2x+3)((2x)^2 - (2x)(3) + 3^2)$\n$= (2x+3)(4x^2 - 6x + 9)$.',
                    tip: 'In $x^3+y^3$ and $x^3-y^3$ factorisations, the middle term of the quadratic part has the OPPOSITE sign of the original binomial.',
                },
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function PolynomialsGrade9Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className="poly-page">
                <nav className="poly-nav">
                    <button className="poly-nav-back" onClick={goBack}>← Back to Skills</button>
                    <div className="poly-nav-links">
                        <button className="poly-nav-link" onClick={() => navigate('/senior/grade/9/polynomials/introduction')}>🌟 Intro</button>
                        <button className="poly-nav-link" onClick={() => navigate('/senior/grade/9/polynomials/terminology')}>📖 Terminology</button>
                        <button className="poly-nav-link poly-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="poly-lexicon-container">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="poly-learn-grid">
                                <aside className="poly-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`poly-sidebar-btn${selectedLearnIdx === ri ? ' active' : ''}`}
                                            style={{ '--skill-color': skill.color }}>
                                            <div className="poly-sidebar-btn-num">{ri + 1}</div>
                                            <span className="poly-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className="poly-details-window poly-details-window-anim" key={selectedLearnIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 28 }}>{skill.icon}</div>
                                    </div>
                                    <div style={{ background: `${skill.color}08`, padding: '18px', borderRadius: 16, border: `2px solid ${skill.color}20`, marginBottom: 22, textAlign: 'center' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: skill.color, letterSpacing: 0.5 }}>
                                            <LatexText text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>
                                    <div className="poly-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <div style={{ fontSize: 15, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].d} />
                                            </div>
                                            <div style={{ marginTop: 16, background: 'rgba(20,184,166,0.05)', padding: '12px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                <div style={{ margin: 0, fontSize: 13.5, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Tip: </span>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: skill.color, marginBottom: 8 }}>Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <button className="poly-btn-primary" onClick={() => setView('practice')} style={{ background: skill.color }}>Mastered? Try Practice →</button>
                                        <button className="poly-btn-secondary" onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto' }}>
                            <PolynomialsPracticeEngine
                                questionPool={skill.practicePool()}
                                sampleSize={20}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto' }}>
                            <PolynomialsAssessmentEngine
                                questionPool={skill.assessmentPool()}
                                sampleSize={20}
                                title={skill.title}
                                color={skill.color}
                                onBack={goBack}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="poly-page">
            <nav className="poly-nav">
                <button className="poly-nav-back" onClick={() => navigate('/senior/grade/9/polynomials')}>← Back to Polynomials</button>
                <div className="poly-nav-links">
                    <button className="poly-nav-link" onClick={() => navigate('/senior/grade/9/polynomials/introduction')}>🌟 Introduction</button>
                    <button className="poly-nav-link" onClick={() => navigate('/senior/grade/9/polynomials/terminology')}>📖 Terminology</button>
                    <button className="poly-nav-link poly-nav-link--active">🎯 Skills</button>
                </div>
            </nav>
            <div className="poly-lexicon-container" style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Polynomials <span style={{ color: '#0f766e' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Learn rules · Practice with 20 mixed questions · Take a 20-question timed assessment.</div>
                </div>
                <div className="poly-skills-list">
                    {SKILLS.map((sk, idx) => (
                        <div key={sk.id} className="poly-skill-card">
                            <div className="poly-skill-info">
                                <div className="poly-skill-icon" style={{ background: `${sk.color}15`, fontSize: 28 }}>{sk.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{sk.subtitle}</div>
                                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{sk.title}</h3>
                                    <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{sk.desc}</p>
                                </div>
                            </div>
                            <div className="poly-skill-actions">
                                <button className="poly-skill-btn-outline" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('learn'); }}>Learn</button>
                                <button className="poly-skill-btn-outline" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('practice'); }}>Practice</button>
                                <button className="poly-skill-btn-filled" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                        Completed all 4 skills? You're a <span style={{ color: '#0f4c81' }}>Polynomials Champion! 🏆</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
