import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../coordinate_geometry_9.module.css';
import { LatexText } from '../../../../../LatexText';

import CGScenarioPracticeEngine from './Engines/CGScenarioPracticeEngine';
import CGScenarioAssessmentEngine from './Engines/CGScenarioAssessmentEngine';
import {
    generateQuadrantScenarios,
    generateReadingScenarios,
    generatePlottingScenarios,
    generateDistanceScenarios,
} from './Engines/CGScenarioUtils';
import {
    QuadrantChart, AxesHighlightChart, OrderedPairChart,
    ReflectionChart, DistanceFromAxisChart, PlottingStepsChart,
} from '../components/CGDynamicCharts';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'identify-quadrants',
        title: 'Identifying Quadrants & Axes',
        subtitle: 'Skill 1 · Signs & Regions',
        icon: '🪟',
        color: '#0f4c81',
        desc: 'Classify points into one of the four quadrants or locate them on the corresponding axes based on their signs.',
        scenarioGen: generateQuadrantScenarios,
        learn: {
            concept: 'The Cartesian plane is divided into four regions called quadrants by the $X$ and $Y$ axes. The sign of the coordinates determines the exact region.',
            rules: [
                {
                    title: 'Quadrant Signs',
                    f: '$\\text{Q I}: (+,+) \\quad | \\quad \\text{Q II}: (-,+) \\quad | \\quad \\text{Q III}: (-,-) \\quad | \\quad \\text{Q IV}: (+,-)$',
                    chart: QuadrantChart,
                    d: 'To determine the quadrant, check the sign (+ or -) of the $x$ and $y$ values respectively.',
                    ex: '✅ $P(5, 8)$ lives in Quadrant I (both positive).\n✅ $Q(-3, 6)$ lives in Quadrant II (negative $x$, positive $y$).\n✅ $R(-2, -9)$ lives in Quadrant III (both negative).',
                    tip: 'Draw a small plus sign. Label top right $+$, top left $-$, bottom left $-$, bottom right $+$.',
                },
                {
                    title: 'Trapped on the Axes',
                    f: '$\\text{If } X = 0 \\implies Y\\text{-axis} \\quad | \\quad \\text{If } Y = 0 \\implies X\\text{-axis}$',
                    chart: AxesHighlightChart,
                    d: 'If a coordinate has a zero, the point does not lie in ANY quadrant. It lies directly on one of the dividing lines (axes).',
                    ex: 'Point $(0, -5)$ has $x=0$. It hasn\'t moved left or right. It lies on the negative $Y$-axis.\nPoint $(4, 0)$ has $y=0$. It hasn\'t moved up or down. It lies on the positive $X$-axis.',
                    tip: 'The $0$ tells you which axis it is NOT on. If $x=0$, it is stuck on the $Y$-axis.',
                },
                {
                    title: 'The Origin',
                    f: '$\\text{The center point } (0,0)$',
                    d: 'The origin is the only point that represents an intersection of both axes and does not belong to any quadrant.',
                    ex: 'The point $(0,0)$ is where you always begin counting from.',
                    tip: 'Never classify $(0,0)$ as lying in Quadrant I.',
                },
            ],
        },
    },
    {
        id: 'reading-coordinates',
        title: 'Reading Coordinates',
        subtitle: 'Skill 2 · Graph Interpretation',
        icon: '🔍',
        color: '#1a237e',
        desc: 'Extract exact coordinate pairs (x, y) by observing points plotted on a Cartesian plane.',
        scenarioGen: generateReadingScenarios,
        learn: {
            concept: 'Reading coordinates is like following a map backward: look at the drop pin, trace your steps back to the axes.',
            rules: [
                {
                    title: 'Trace to the X-axis First',
                    f: '$\\text{The Abscissa } (x)$',
                    chart: OrderedPairChart,
                    d: 'To find the first number in the coordinate pair, imagine a vertical line dropping straight down (or up) from the point to the horizontal $X$-axis.',
                    ex: 'If the point drops down and hits the $X$-axis at $-4$, then your $x$-coordinate is $-4$.',
                    tip: 'Always read the horizontal axis first. $X$ comes before $Y$ in the alphabet.',
                },
                {
                    title: 'Trace to the Y-axis Second',
                    f: '$\\text{The Ordinate } (y)$',
                    d: 'To find the second number, imagine a horizontal line shooting straight across to the vertical $Y$-axis.',
                    ex: 'If the point shoots across and hits the $Y$-axis at $7$, your $y$-coordinate is $7$.\nSo the ordered pair is $(-4, 7)$.',
                    tip: 'The $y$-value represents the height (or depth) of the point.',
                },
            ],
        },
    },
    {
        id: 'plotting-points',
        title: 'Plotting Points',
        subtitle: 'Skill 3 · Interactive Placement',
        icon: '🎯',
        color: '#b71c1c',
        desc: 'Accurately place points on a graph when given an ordered pair (x, y).',
        scenarioGen: generatePlottingScenarios,
        learn: {
            concept: 'Plotting is the reverse of reading coordinates. You are given the instructions $(x, y)$ and you must walk to the correct location and drop the pin.',
            rules: [
                {
                    title: 'Start at the Origin',
                    f: '$\\text{Begin at } (0,0)$',
                    chart: AxesHighlightChart,
                    d: 'Every plotting sequence must begin exactly at the center crosshair of the graph.',
                    ex: 'Do not start counting from the edge of the paper or the previous point you plotted.',
                    tip: 'Place your pen completely still at $(0,0)$ before making any moves.',
                },
                {
                    title: 'Move Horizontally',
                    f: '$\\text{Move Right for } +x \\quad | \\quad \\text{Move Left for } -x$',
                    d: 'The first number tells you how many steps to walk horizontally along the $X$-axis.',
                    ex: 'For $(5, -2)$, walk $5$ steps to the right. Stop and wait there.',
                    tip: 'Do not draw a dot yet! This is just your temporary resting stop.',
                },
                {
                    title: 'Move Vertically & Plot',
                    f: '$\\text{Move Up for } +y \\quad | \\quad \\text{Move Down for } -y$',
                    chart: PlottingStepsChart,
                    d: 'From your resting stop on the horizontal axis, move vertically up or down by the amount of the second number. This is your final destination.',
                    ex: 'Following $(5, -2)$: From the $5$ mark on the $X$-axis, walk down $2$ steps. Place a solid dot at that exact intersection.',
                    tip: 'You can verify your plot by seeing if the dot aligns perfectly with $5$ on the $X$-axis and $-2$ on the $Y$-axis.',
                },
            ],
        },
    },
    {
        id: 'distance',
        title: 'Distance & Reflections',
        subtitle: 'Skill 4 · Geometric Properties',
        icon: '📏',
        color: '#0f766e',
        desc: 'Determine distances from axes and find mirror reflections of points across the axes.',
        scenarioGen: generateDistanceScenarios,
        learn: {
            concept: 'Once a point is plotted, we can calculate its physical distance from the axes and find its mirror reflection on the opposite side.',
            rules: [
                {
                    title: 'Perpendicular Distance',
                    f: '$\\text{Dist from } X\\text{-axis} = |y| \\quad | \\quad \\text{Dist from } Y\\text{-axis} = |x|$',
                    chart: DistanceFromAxisChart,
                    d: 'Distance is a physical measurement, so it is always positive. The distance from one axis is determined by the coordinate of the other axis.',
                    ex: 'The point $(8, -3)$ is $|-3| = 3$ units away from the $X$-axis.\nIt is $|8| = 8$ units away from the $Y$-axis.',
                    tip: 'The vertical $Y$-axis measures horizontal movement, so it dictates distance from the $X$-axis.',
                },
                {
                    title: 'Reflection in the X-axis',
                    f: '$(x, y) \\xrightarrow{\\text{reflect over } X} (x, -y)$',
                    chart: () => <ReflectionChart axis="X" />,
                    d: 'When reflecting a point over the $X$-axis, imagine the $X$-axis is a mirror. The vertical position flips, but the horizontal position stays the same.',
                    ex: 'Reflect $(4, 5)$ over the $X$-axis $\\implies (4, -5)$.\nReflect $(-2, -7)$ over the $X$-axis $\\implies (-2, 7)$.',
                    tip: 'Only the sign of the $Y$-coordinate changes.',
                },
                {
                    title: 'Reflection in the Y-axis',
                    f: '$(x, y) \\xrightarrow{\\text{reflect over } Y} (-x, y)$',
                    chart: () => <ReflectionChart axis="Y" />,
                    d: 'When reflecting over the vertical $Y$-axis, the horizontal position crosses to the other side, but the height stays exactly the same.',
                    ex: 'Reflect $(6, 2)$ over the $Y$-axis $\\implies (-6, 2)$.\nReflect $(-9, -4)$ over the $Y$-axis $\\implies (9, -4)$.',
                    tip: 'Only the sign of the $X$-coordinate changes.',
                },
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CoordinateGeometry9Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
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
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/coordinate-geometry/intro')}>🌟 Intro</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/coordinate-geometry/terminology')}>📖 Terminology</button>
                        <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className={styles['quiz-container']} style={{ maxWidth: 1060 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
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
                            <CGScenarioPracticeEngine
                                scenarios={skill.scenarioGen()}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <CGScenarioAssessmentEngine
                                scenarios={skill.scenarioGen()}
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
        <div className={styles['page']} style={window.innerWidth > 900 ? { height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' } : { display: 'flex', flexDirection: 'column' }}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/coordinate-geometry')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/coordinate-geometry/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/coordinate-geometry/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Coordinate Geometry <span style={{ color: '#0f766e' }}>Skills</span>
                        </h1>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Choose a skill · Learn rules · Practice with 20 mixed questions · Take a 20-question timed assessment.</div>
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
                    <div style={{ marginTop: 24, textAlign: 'center' }}>
                        <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                            Completed all 4 skills? You're a <span style={{ color: '#0f4c81' }}>Graph Champion! 🏆</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
