import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '../../../../../LatexText';
import '../../linear_equations.css';

import LinearEqPracticeEngine from './Engines/LinearEqPracticeEngine';
import LinearEqAssessmentEngine from './Engines/LinearEqAssessmentEngine';

import {
    buildBalancingPracticePool,
    buildBalancingAssessmentPool,
    buildTranspositionPracticePool,
    buildTranspositionAssessmentPool,
    buildWordProblemsPracticePool,
    buildWordProblemsAssessmentPool,
} from './LinearEquationsSkillsData';
import { NODE_IDS } from '@/lib/curriculumIds';

// ── SKILLS DEFINITION ────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'balancing',
        icon: '⚖️',
        color: '#7c3aed',
        title: 'Solving by Balancing',
        subtitle: 'Skill 1 · §2.2',
        desc: 'Solve linear equations by performing equal operations on both sides — add, subtract, multiply, divide.',
        practicePool: buildBalancingPracticePool,
        assessmentPool: buildBalancingAssessmentPool,
        learn: {
            concept: 'An equation is like a balance scale. Whatever you do to one side, you must do to the other to keep it balanced.',
            rules: [
                {
                    num: 1,
                    title: 'Add the same number to both sides',
                    math: '$x - 9 = 4 \\xrightarrow{+9} x = 13$',
                    detail: 'If a number is being subtracted from x, add it to both sides to isolate x.',
                    tip: 'Think: "What is being done to x? Do the opposite to both sides."',
                },
                {
                    num: 2,
                    title: 'Subtract the same number from both sides',
                    math: '$x + 7 = 15 \\xrightarrow{-7} x = 8$',
                    detail: 'If a number is added to x, subtract it from both sides.',
                    tip: 'Always check by substituting back: is LHS = RHS?',
                },
                {
                    num: 3,
                    title: 'Multiply both sides by the same non-zero number',
                    math: '$\\dfrac{x}{5} = -4 \\xrightarrow{\\times 5} x = -20$',
                    detail: 'If x is divided by a number, multiply both sides by that number.',
                    tip: 'Never multiply by zero — that destroys the equation.',
                },
                {
                    num: 4,
                    title: 'Divide both sides by the same non-zero number',
                    math: '$4x = 28 \\xrightarrow{\\div 4} x = 7$',
                    detail: 'If x has a coefficient, divide both sides by that coefficient.',
                    tip: 'The coefficient is the number directly multiplied with x.',
                },
                {
                    num: 5,
                    title: 'Verify your solution',
                    math: '$x=7$ in $4x=28$: LHS $= 4(7) = 28 = $ RHS ✓',
                    detail: 'Always substitute the found value back into the original equation to verify.',
                    tip: 'If LHS ≠ RHS, you have made an error — go back and check.',
                },
            ],
        },
    },
    {
        id: 'transposition',
        icon: '↔️',
        color: '#059669',
        title: 'Transposition & Both Sides',
        subtitle: 'Skill 2 · §2.3–§2.7',
        desc: 'Collect variable terms on one side, use transposition, clear fractions by LCM, or cross-multiply.',
        practicePool: buildTranspositionPracticePool,
        assessmentPool: buildTranspositionAssessmentPool,
        learn: {
            concept: 'Transposition is a shortcut to balancing: moving a term across = changes its sign.',
            rules: [
                {
                    num: 1,
                    title: 'Transpose: + becomes − when moved across =',
                    math: '$2x + 9 = 4 \\Rightarrow 2x = 4 - 9 = -5$',
                    detail: 'Move +9 to RHS and it becomes −9. Then solve: $x = \\dfrac{-5}{2}$.',
                    tip: 'Collect all x terms on LHS and constants on RHS.',
                },
                {
                    num: 2,
                    title: 'Transpose: − becomes + when moved across =',
                    math: '$2x - 3 = 7 \\Rightarrow 2x = 7 + 3 = 10 \\Rightarrow x = 5$',
                    detail: 'Move −3 to RHS and it becomes +3.',
                    tip: 'Every transposition changes the sign of the term.',
                },
                {
                    num: 3,
                    title: 'Variable on both sides (§2.4): collect on LHS',
                    math: '$3x + 4 = x + 10 \\Rightarrow 2x = 6 \\Rightarrow x = 3$',
                    detail: 'Transpose the variable term from RHS to LHS: $3x - x = 10 - 4$.',
                    tip: 'After transposing, you get a simpler equation of the form $ax = b$.',
                },
                {
                    num: 4,
                    title: 'Clear fractions: multiply both sides by LCM (§2.6)',
                    math: '$\\dfrac{x}{2} - \\dfrac{1}{5} = \\dfrac{x}{3} + \\dfrac{1}{4}$, multiply by LCM(2,5,3,4) $= 60$',
                    detail: 'Denominators: 2, 5, 3, 4. LCM = 60. Multiply every term by 60 to get whole numbers.',
                    tip: 'After multiplying by LCM, no fractions remain — solve normally.',
                },
                {
                    num: 5,
                    title: 'Cross-multiplication (§2.7): for rational equations',
                    math: '$\\dfrac{x+1}{2x+3} = \\dfrac{3}{8} \\Rightarrow 8(x+1) = 3(2x+3)$',
                    detail: 'If the equation has form $\\dfrac{p}{q} = \\dfrac{r}{s}$, then $ps = qr$.',
                    tip: 'After cross-multiplying, expand brackets and collect like terms.',
                },
            ],
        },
    },
    {
        id: 'wordproblems',
        icon: '📝',
        color: '#0891b2',
        title: 'Word Problems',
        subtitle: 'Skill 3 · §2.3 & §2.5',
        desc: 'Translate real-world scenarios into equations and solve — numbers, perimeters, ages, coins, digits.',
        practicePool: buildWordProblemsPracticePool,
        assessmentPool: buildWordProblemsAssessmentPool,
        learn: {
            concept: 'Every word problem has one unknown. Name it $x$, write an equation from the condition, and solve.',
            rules: [
                {
                    num: 1,
                    title: 'Number problems — sum/difference',
                    math: 'Sum of two numbers is $S$, one exceeds the other by $D$: $x + (x+D) = S$',
                    detail: 'Let the smaller number be $x$, larger be $x+D$. Their sum gives the equation.',
                    tip: 'Always check: do both numbers satisfy all given conditions?',
                },
                {
                    num: 2,
                    title: 'Perimeter problems (§2.3 Ex 6)',
                    math: 'Rectangle: $P = 2(l + w)$. Given $P$ and $w$, find $l$.',
                    detail: 'Substitute known values and solve for the unknown dimension.',
                    tip: 'Perimeter = sum of all sides. For rectangle: $2l + 2w = P$.',
                },
                {
                    num: 3,
                    title: 'Age problems (§2.3 Ex 7, §2.5 Ex 15)',
                    math: 'Mother is $k$ times child\'s age now. After $n$ years: $(x+n)+(kx+n) = S$',
                    detail: 'Let present age = $x$. Write expressions for all ages now and after $n$ years.',
                    tip: '"After $n$ years" means add $n$ to each person\'s current age.',
                },
                {
                    num: 4,
                    title: 'Coin/denomination problems (§2.3 Ex 8)',
                    math: 'Total value $= $ (no. of ₹5 coins $\\times 5$) $+$ (no. of ₹2 coins $\\times 2$)',
                    detail: 'Let one quantity be $x$. Express the other in terms of $x$ using the ratio given.',
                    tip: 'Distinguish between the number of coins and their total value.',
                },
                {
                    num: 5,
                    title: 'Digit problems (§2.5 Ex 14)',
                    math: 'Two-digit number $= 10t + u$. Reversed $= 10u + t$.',
                    detail: 'Let units digit = $b$, then tens digit = $b + d$ (if they differ by $d$). Original = $10(b+d) + b$.',
                    tip: 'Sum of original + reversed $= 11(t+u)$ — always true for any 2-digit pair.',
                },
            ],
        },
    },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function LinearEquationsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'learn' | 'practice' | 'assess'
    const [activeIdx, setActiveIdx] = useState(null);
    const [activeRule, setActiveRule] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);
    const skill = activeIdx !== null ? SKILLS[activeIdx] : null;
    const goBack = () => { setView('list'); setActiveRule(0); };

    const skillMap = {
        balancing: NODE_IDS.g8MathLinearSolving,
        transposition: NODE_IDS.g8MathLinearSolving,
        wordproblems: NODE_IDS.g8MathLinearWordProblems
    };
    const nodeId = skill ? skillMap[skill.id] : NODE_IDS.g8MathLinearSolving;

    // Build pools once when entering practice/assess mode
    const practicePool = useMemo(() => skill ? skill.practicePool() : [], [view, activeIdx]);
    const assessPool = useMemo(() => skill ? skill.assessmentPool() : [], [view, activeIdx]);

    // ── LEARN VIEW ──────────────────────────────────────────────────────────
    if (view === 'learn' && skill) {
        return (
            <div className="leq-page">
                <nav className="leq-nav">
                    <button className="leq-nav-back" onClick={goBack}>← All Skills</button>
                    <div className="leq-nav-links">
                        <button className="leq-nav-link" onClick={() => navigate('/senior/grade/8/linear-equations')}>🏠 Hub</button>
                        <button className="leq-nav-link" onClick={() => setView('practice')}>📝 Practice</button>
                        <button className="leq-nav-link" onClick={() => setView('assess')}>🎯 Assess</button>
                    </div>
                </nav>

                <div className="leq-module-hero">
                    <h1 className="leq-module-title">
                        {skill.icon} <span>{skill.title}</span>
                    </h1>
                    <p className="leq-module-subtitle">{skill.subtitle} · Learn Mode</p>
                </div>

                <div className="leq-section">
                    <div className="leq-lexicon-container">
                        <p style={{ fontSize: 16, color: '#0f172a', marginBottom: 28, lineHeight: 1.75, fontWeight: 500 }}>
                            <LatexText text={skill.learn.concept} />
                        </p>

                        <div className="leq-learn-grid">
                            {/* Sidebar */}
                            <div className="leq-learn-sidebar">
                                {skill.learn.rules.map((r, i) => (
                                    <button
                                        key={i}
                                        className={`leq-sidebar-btn ${activeRule === i ? 'active' : ''}`}
                                        style={{ '--leq-skill-color': skill.color }}
                                        onClick={() => setActiveRule(i)}
                                    >
                                        <span className="leq-sidebar-btn-num" style={{
                                            background: activeRule === i ? 'rgba(255,255,255,0.25)' : `${skill.color}15`,
                                            color: activeRule === i ? '#fff' : skill.color
                                        }}>{r.num}</span>
                                        <span className="leq-sidebar-btn-title">{r.title}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Rule detail */}
                            <div className="leq-details-window leq-details-anim" key={`${activeIdx}-${activeRule}`}>
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{
                                        display: 'inline-flex', gap: 8, alignItems: 'center',
                                        background: `${skill.color}12`, padding: '4px 14px',
                                        borderRadius: 50, fontSize: 12, fontWeight: 800, color: skill.color, marginBottom: 12
                                    }}>Rule {skill.learn.rules[activeRule].num}</div>
                                    <h2 style={{
                                        fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800,
                                        color: '#0f172a', margin: '0 0 16px', lineHeight: 1.3
                                    }}>
                                        {skill.learn.rules[activeRule].title}
                                    </h2>

                                    {/* Math block */}
                                    <div className="leq-math-block">
                                        <LatexText text={skill.learn.rules[activeRule].math} />
                                    </div>

                                    {/* Detail */}
                                    <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.75, marginBottom: 16 }}>
                                        <LatexText text={skill.learn.rules[activeRule].detail} />
                                    </p>

                                    {/* Tip */}
                                    <div style={{
                                        padding: '12px 18px', borderRadius: 12,
                                        background: `${skill.color}08`,
                                        border: `1px solid ${skill.color}20`,
                                        fontSize: 14, color: '#64748b', display: 'flex', gap: 10, alignItems: 'flex-start'
                                    }}>
                                        <span style={{ fontSize: 18 }}>💡</span>
                                        <LatexText text={skill.learn.rules[activeRule].tip} />
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="leq-learn-footer">
                                    <button
                                        className="leq-btn-secondary"
                                        onClick={() => setActiveRule(r => Math.max(0, r - 1))}
                                        disabled={activeRule === 0}
                                    >← Prev Rule</button>
                                    <button
                                        className="leq-btn-primary"
                                        style={{ background: skill.color, boxShadow: `0 8px 20px ${skill.color}40` }}
                                        onClick={() => {
                                            if (activeRule < skill.learn.rules.length - 1) setActiveRule(r => r + 1);
                                            else setView('practice');
                                        }}
                                    >
                                        {activeRule < skill.learn.rules.length - 1 ? 'Next Rule →' : '📝 Start Practice →'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── PRACTICE VIEW ─────────────────────────────────────────────────────────
    if (view === 'practice' && skill) {
        return (
            <div className="leq-page">
                <nav className="leq-nav">
                    <button className="leq-nav-back" onClick={goBack}>← All Skills</button>
                    <div className="leq-nav-links">
                        <button className="leq-nav-link" onClick={() => setView('learn')}>📚 Learn</button>
                        <button className="leq-nav-link" onClick={() => setView('assess')}>🎯 Assess</button>
                    </div>
                </nav>

                <div className="leq-quiz-container" style={{ paddingTop: 40 }}>
                    <LinearEqPracticeEngine
                        questionPool={practicePool}
                        sampleSize={20}
                        title={skill.title}
                        color={skill.color}
                        onBack={goBack}
                        nodeId={nodeId}
                    />
                </div>
            </div>
        );
    }

    // ── ASSESS VIEW ──────────────────────────────────────────────────────────
    if (view === 'assess' && skill) {
        return (
            <div className="leq-page">
                <nav className="leq-nav">
                    <button className="leq-nav-back" onClick={goBack}>← All Skills</button>
                    <div className="leq-nav-links">
                        <button className="leq-nav-link" onClick={() => setView('learn')}>📚 Learn</button>
                        <button className="leq-nav-link" onClick={() => setView('practice')}>📝 Practice</button>
                    </div>
                </nav>

                <div style={{ paddingTop: 40, paddingBottom: 40 }}>
                    <LinearEqAssessmentEngine
                        questionPool={assessPool}
                        title={skill.title}
                        color={skill.color}
                        onBack={goBack}
                        questionCount={10}
                        nodeId={nodeId}
                    />
                </div>
            </div>
        );
    }

    // ── SKILLS LIST (default) ─────────────────────────────────────────────────
    return (
        <div className="leq-page">
            <nav className="leq-nav">
                <button className="leq-nav-back" onClick={() => navigate('/senior/grade/8/linear-equations')}>
                    ← Linear Equations
                </button>
                <div className="leq-nav-links">
                    <button className="leq-nav-link" onClick={() => navigate('/senior/grade/8/linear-equations/introduction')}>🌟 Introduction</button>
                    <button className="leq-nav-link" onClick={() => navigate('/senior/grade/8/linear-equations/terminology')}>📖 Terminology</button>
                    <button className="leq-nav-link leq-nav-link--active">🎯 Skills</button>
                </div>
            </nav>

            <div className="leq-lexicon-container" style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Linear Equations <span style={{ color: '#7c3aed' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Learn rules · Practice concepts · Take a 10-question timed assessment.</div>
                </div>

                <div className="leq-skills-list">
                    {SKILLS.map((s, i) => (
                        <div key={s.id} className="leq-skill-card">
                            <div className="leq-skill-info">
                                <div className="leq-skill-icon" style={{ background: `${s.color}15` }}>
                                    {s.icon}
                                </div>
                                <div>
                                    <div className="leq-skill-name" style={{ color: s.color }}>{s.title}</div>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                                        {s.subtitle}
                                    </div>
                                    <div className="leq-skill-desc">{s.desc}</div>
                                </div>
                            </div>
                            <div className="leq-skill-actions">
                                <button
                                    className="leq-skill-btn-outline"
                                    style={{ '--btn-color': s.color }}
                                    onClick={() => { setActiveIdx(i); setActiveRule(0); setView('learn'); }}
                                >📚 Learn</button>
                                <button
                                    className="leq-skill-btn-outline"
                                    style={{ '--btn-color': s.color }}
                                    onClick={() => { setActiveIdx(i); setView('practice'); }}
                                >📝 Practice</button>
                                <button
                                    className="leq-skill-btn-filled"
                                    style={{ '--btn-color': s.color }}
                                    onClick={() => { setActiveIdx(i); setView('assess'); }}
                                >🎯 Assess</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 40, textAlign: 'center', paddingBottom: 40 }}>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                        Completed all skills? You're officially an <span style={{ color: '#059669' }}>Equations Pro!</span> 🎯
                    </p>
                    <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 8, fontWeight: 600 }}>
                        📚 All questions based on NCERT Class 8 Mathematics — Chapter 2 (§2.2–§2.7)
                    </p>
                </div>
            </div>
        </div>
    );
}
