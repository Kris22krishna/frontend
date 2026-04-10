import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../linear_equations_9.module.css';
import { LatexText } from '../../../../../LatexText';

import LEScenarioPracticeEngine from './Engines/LEScenarioPracticeEngine';
import LEScenarioAssessmentEngine from './Engines/LEScenarioAssessmentEngine';
import {
    generateFindingSolutionScenarios,
    generateStandardFormScenarios,
    generateGraphingScenarios,
    generateSpecialLinesScenarios,
} from './Engines/LEScenarioUtils';
import {
    SingleLineChart, SolutionSetChart, StandardFormChart, PlottingStepsChart, HorizontalVerticalChart
} from '../components/LEDynamicCharts';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'finding-solutions',
        nodeId: 'le9-finding-solutions',
        title: 'Finding Solutions',
        subtitle: 'Skill 1 · Substitution & Verification',
        icon: '🔍',
        color: '#0f4c81',
        desc: 'Find solutions by substitution and verify if a point lies on a line.',
        scenarioGen: generateFindingSolutionScenarios,
        learn: {
            concept: 'A solution of a linear equation in two variables is an ordered pair $(x, y)$ that satisfies the equation.',
            rules: [
                {
                    title: 'What is a Solution?',
                    f: '$\\text{If } ax + by = c\\text{, then } (x_0, y_0) \\text{ is a solution if } ax_0 + by_0 = c$',
                    chart: SolutionSetChart,
                    d: 'A solution of a linear equation in two variables is an ordered pair $(x, y)$ that satisfies the equation. Every point on the line of the equation is a solution.\n\nA linear equation in two variables has infinitely many solutions.',
                    ex: 'For $x + y = 5$:\n\n$(2, 3)$ → $2 + 3 = 5$ ✓ Solution\n$(4, 1)$ → $4 + 1 = 5$ ✓ Solution\n$(1, 2)$ → $1 + 2 = 3 \\neq 5$ ✗ Not a solution',
                    tip: 'Always verify by substituting both values back into the equation.',
                },
                {
                    title: 'Finding y given x',
                    f: '$y = \\frac{c - ax}{b}$',
                    chart: SingleLineChart,
                    d: 'Given a value of $x$, substitute it in the equation and solve for $y$.\n\nFor $2x + 3y = 12$, if $x = 3$:\n$2(3) + 3y = 12$ → $6 + 3y = 12$ → $3y = 6$ → $y = 2$\n\nSolution: $(3, 2)$',
                    ex: 'Find 3 solutions of $x + 2y = 8$:\n\nLet $x = 0$: $2y = 8 → y = 4$ → $(0, 4)$\nLet $x = 2$: $2 + 2y = 8 → y = 3$ → $(2, 3)$\nLet $x = 4$: $4 + 2y = 8 → y = 2$ → $(4, 2)$',
                    tip: 'Choosing $x = 0$ gives the y-intercept — the easiest point to compute!',
                },
            ],
        },
    },
    {
        id: 'standard-form',
        nodeId: 'le9-standard-form',
        title: 'Standard Form',
        subtitle: 'Skill 2 · Equation Conversion',
        icon: '📝',
        color: '#6a1b9a',
        desc: 'Convert equations to standard form ax + by + c = 0 and identify linear equations.',
        scenarioGen: generateStandardFormScenarios,
        learn: {
            concept: 'Every linear equation in two variables can be written in the standard form $ax + by + c = 0$.',
            rules: [
                {
                    title: 'Standard Form: ax + by + c = 0',
                    f: '$ax + by + c = 0, \\quad a \\neq 0 \\text{ or } b \\neq 0$',
                    chart: StandardFormChart,
                    d: 'Every linear equation can be rearranged to this form.\n\n• $a$ = coefficient of $x$\n• $b$ = coefficient of $y$\n• $c$ = constant term\n• $a$ and $b$ are not both zero simultaneously.',
                    ex: '$y = 2x + 3$ can be rewritten as $2x - y + 3 = 0$\nHere $a = 2$, $b = -1$, $c = 3$\n\n$3x = 7y - 5$ becomes $3x - 7y + 5 = 0$\nHere $a = 3$, $b = -7$, $c = 5$',
                    tip: 'Move all terms to one side, keeping standard alphabetical order: x first, then y, then the constant.',
                },
            ],
        },
    },
    {
        id: 'graphing',
        nodeId: 'le9-graphing',
        title: 'Graphing Equations',
        subtitle: 'Skill 3 · Plotting & Intercepts',
        icon: '📈',
        color: '#b71c1c',
        desc: 'Plot linear equations on the Cartesian plane using solution pairs and intercepts.',
        scenarioGen: generateGraphingScenarios,
        learn: {
            concept: 'The graph of a linear equation in two variables is always a straight line.',
            rules: [
                {
                    title: 'Plotting a Linear Equation',
                    f: '$\\text{2 solution pairs} \\rightarrow \\text{1 straight line}$',
                    chart: PlottingStepsChart,
                    d: 'Steps to graph a linear equation:\n1. Find at least 2 solutions (3 recommended)\n2. Plot them on the Cartesian plane\n3. Connect with a straight line\n4. Extend with arrows (line is infinite)',
                    ex: 'Graph $y = 2x - 1$:\n$(0, -1)$, $(1, 1)$, $(2, 3)$\nPlot these 3 points → draw the line through them.',
                    tip: 'The x-intercept (set $y = 0$) and y-intercept (set $x = 0$) are the easiest two points to find.',
                },
            ],
        },
    },
    {
        id: 'special-lines',
        nodeId: 'le9-special-lines',
        title: 'Special Lines (x=a, y=b)',
        subtitle: 'Skill 4 · Parallel to Axes',
        icon: '↔️',
        color: '#0f766e',
        desc: 'Understand vertical lines x = a and horizontal lines y = b.',
        scenarioGen: generateSpecialLinesScenarios,
        learn: {
            concept: 'Special linear equations where one variable is missing represent lines parallel to the axes.',
            rules: [
                {
                    title: 'x = a (Vertical) & y = b (Horizontal)',
                    f: '$x = a \\text{ → vertical} \\qquad y = b \\text{ → horizontal}$',
                    chart: HorizontalVerticalChart,
                    d: '$x = a$ means $x$ has a fixed value regardless of $y$. This is a vertical line parallel to the Y-axis.\n\n$y = b$ means $y$ has a fixed value regardless of $x$. This is a horizontal line parallel to the X-axis.',
                    ex: '$x = 3$ passes through $(3, 0), (3, 1), (3, -5)$, etc.\n$y = -2$ passes through $(0, -2), (1, -2), (5, -2)$, etc.',
                    tip: '$x = a$ → vertical (parallel to Y-axis). $y = b$ → horizontal (parallel to X-axis). Don\'t mix them up!',
                },
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function LinearEquations9Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // list, learn, practice, assessment
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className={styles['page']} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <nav className={styles['nav']} style={view === 'learn' ? { position: 'sticky', top: 0, zIndex: 100 } : {}}>
                    <button className={styles['nav-back']} onClick={goBack}>← Back to Skills</button>
                    <div className={styles['nav-links']}>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/intro')}>🌟 Intro</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/terminology')}>📖 Terminology</button>
                        <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className={styles['quiz-container']} style={{ maxWidth: 1060 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                                    {skill.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div className={styles['learn-grid']}>
                                <aside className={styles['learn-sidebar']}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`${styles['sidebar-btn']} ${selectedLearnIdx === ri ? styles['active'] : ''}`}
                                            style={{ '--skill-color': skill.color }}>
                                            <div className={styles['sidebar-btn-num']}>{ri + 1}</div>
                                            <span className={styles['sidebar-btn-title']}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className={`${styles['details-window']} ${styles['details-window-anim']}`} key={selectedLearnIdx}>
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
                                    
                                    {/* Animated chart illustration */}
                                    {skill.learn.rules[selectedLearnIdx].chart && (
                                        <div style={{ marginBottom: 22, padding: 16, background: '#f8fafc', borderRadius: 16, display: 'flex', justifyContent: 'center' }}>
                                            {React.createElement(skill.learn.rules[selectedLearnIdx].chart)}
                                        </div>
                                    )}

                                    <div className={styles['rule-split']}>
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
                                        <button className={styles['btn-primary']} onClick={() => setView('practice')} style={{ background: skill.color, border: 'none' }}>Mastered? Try Practice →</button>
                                        <button className={styles['nav-back']} onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <LEScenarioPracticeEngine
                                scenarios={skill.scenarioGen()}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <LEScenarioAssessmentEngine
                                scenarios={skill.scenarioGen()}
                                title={skill.title}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles['page']} style={window.innerWidth > 900 ? { height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { display: 'flex', flexDirection: 'column' }}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/linear-equations-two-variables/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Linear Equations <span style={{ color: '#0f766e' }}>Skills</span>
                        </h1>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Learn rules · Practice with mixed questions · Take a timed assessment.</div>
                    </div>
                    <div className={styles['skills-list']}>
                        {SKILLS.map((sk, idx) => (
                            <div key={sk.id} className={styles['skill-card']}>
                                <div className={styles['skill-info']}>
                                    <div className={styles['skill-icon']} style={{ background: `${sk.color}15`, fontSize: 28 }}>{sk.icon}</div>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{sk.subtitle}</div>
                                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{sk.title}</h3>
                                        <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{sk.desc}</p>
                                    </div>
                                </div>
                                <div className={styles['skill-actions']}>
                                    <button
                                        style={{ padding: '8px 16px', background: '#fff', border: `2px solid ${sk.color}`, color: sk.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('learn'); }}>Learn</button>
                                    <button
                                        style={{ padding: '8px 16px', background: '#fff', border: `2px solid ${sk.color}`, color: sk.color, borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('practice'); }}>Practice</button>
                                    <button
                                        style={{ padding: '8px 16px', background: sk.color, border: `2px solid ${sk.color}`, color: '#fff', borderRadius: 100, fontWeight: 700, cursor: 'pointer', fontFamily: 'Open Sans' }}
                                        onClick={() => { setActiveSkill(idx); setView('assessment'); }}>Assess</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
