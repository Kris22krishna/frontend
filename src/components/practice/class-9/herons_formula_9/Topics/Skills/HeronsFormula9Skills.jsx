import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../herons_formula_9.module.css';
import { LatexText } from '../../../../../LatexText';

import HeronsFormulaScenarioPracticeEngine from './Engines/HeronsFormulaScenarioPracticeEngine';
import HeronsFormulaScenarioAssessmentEngine from './Engines/HeronsFormulaScenarioAssessmentEngine';
import {
    generateBasicHeronScenarios,
    generateRatioPerimeterScenarios,
    generateWordProblemScenarios
} from './Engines/HeronsFormulaScenarioUtils';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'direct-application',
        nodeId: 'herons-9-0001',
        title: 'Direct Application',
        subtitle: 'Skill 1 · Computing Area',
        icon: '🧮',
        color: '#0f4c81',
        desc: 'Calculate the semi-perimeter and apply the square root formula to find the exact area.',
        scenarioGen: generateBasicHeronScenarios,
        learn: {
            concept: 'The standard flow is just two steps: find $s$, then compute the area.',
            rules: [
                {
                    title: 'Step 1: The Semi-Perimeter',
                    f: '$s = \\frac{a+b+c}{2}$',
                    chart: () => (
                        <svg viewBox="0 0 200 100" width="100%" style={{ maxWidth: 350 }}>
                            <path d="M 50 80 L 150 80 L 80 20 Z" fill="none" stroke="#0f4c81" strokeWidth="2" strokeDasharray="4 4" />
                            <text x="100" y="50" fontSize="11" fill="#0f4c81" textAnchor="middle" fontWeight="bold">s = ?</text>
                            <text x="100" y="95" fontSize="12" fill="#0f4c81" textAnchor="middle" fontWeight="bold">Perimeter = a + b + c</text>
                        </svg>
                    ),
                    d: 'Add all three side lengths together to get the perimeter, then slice it in half. This number $s$ must always be larger than any individual side.',
                    ex: 'If sides are $13, 14,$ and $15$:\n$s = \\frac{13+14+15}{2} = \\frac{42}{2} = 21$',
                    tip: 'If your $s$ is smaller than a side, you made an addition error!',
                },
                {
                    title: 'Step 2: The Square Root',
                    f: '$\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}$',
                    chart: () => (
                        <svg viewBox="0 0 240 80" width="100%" style={{ maxWidth: 400 }}>
                            <rect x="20" y="20" width="40" height="40" fill="#0f4c81" rx="4" />
                            <rect x="70" y="20" width="40" height="40" fill="rgba(15, 76, 129, 0.6)" rx="4" />
                            <rect x="120" y="20" width="40" height="40" fill="rgba(15, 76, 129, 0.4)" rx="4" />
                            <rect x="170" y="20" width="40" height="40" fill="rgba(15, 76, 129, 0.2)" rx="4" />
                            <text x="40" y="45" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="bold">s</text>
                            <text x="90" y="45" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="bold">s-a</text>
                            <text x="140" y="45" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="bold">s-b</text>
                            <text x="190" y="45" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="bold">s-c</text>
                        </svg>
                    ),
                    d: 'Subtract each side from $s$ to get three differences. Multiply $s$ and these three differences together, then take the square root of that massive number.',
                    ex: 'For sides $13, 14, 15$ ($s=21$):\nArea = $\\sqrt{21(21-13)(21-14)(21-15)}$\nArea = $\\sqrt{21 \\times 8 \\times 7 \\times 6}$\nArea = $\\sqrt{7056} = 84$',
                    tip: 'Do not multiply a huge number out if you can factor it instead! Extract perfect squares early to make the square root easy.',
                }
            ],
        },
    },
    {
        id: 'ratios-perimeters',
        nodeId: 'herons-9-0002',
        title: 'Ratios & Missing Sides',
        subtitle: 'Skill 2 · Algebraic Geometry',
        icon: '🧩',
        color: '#1a237e',
        desc: 'Deduce unknown side lengths using perimeters or ratios before calculating the area.',
        scenarioGen: generateRatioPerimeterScenarios,
        learn: {
            concept: 'Sometimes sides are hidden within a ratio or a perimeter sum.',
            rules: [
                {
                    title: 'Missing Side from Perimeter',
                    f: '$c = \\text{Perimeter} - (a+b)$',
                    chart: () => (
                        <svg viewBox="0 0 200 100" width="100%" style={{ maxWidth: 300 }}>
                            <path d="M 30 80 L 170 80 L 100 20 Z" fill="none" stroke="#1a237e" strokeWidth="2" />
                            <text x="100" y="95" fontSize="11" fill="#1a237e" textAnchor="middle" fontWeight="bold">a (Known)</text>
                            <text x="50" y="45" fontSize="11" fill="#1a237e" textAnchor="end" fontWeight="bold">b (Known)</text>
                            <text x="150" y="45" fontSize="11" fill="#ef4444" textAnchor="start" fontWeight="bold">c (?) </text>
                            <text x="100" y="55" fontSize="10" fill="#64748b" textAnchor="middle">Total = 32</text>
                        </svg>
                    ),
                    d: 'If you are given two sides and the total perimeter, you can find the third side by subtraction.',
                    ex: 'If $a=8$, $b=11$, and Perimeter $= 32$:\n$c = 32 - (8+11) = 32 - 19 = 13$\nThen apply Heron\'s formula normally!',
                    tip: 'Wait, if you have the Perimeter, finding $s$ is instant! $s = \\frac{\\text{Perimeter}}{2}$.',
                },
                {
                    title: 'Sides from Ratios',
                    f: '$\\text{Length} = \\text{Ratio} \\times x$',
                    chart: () => (
                        <svg viewBox="0 0 200 70" width="100%" style={{ maxWidth: 300 }}>
                            <rect x="20" y="25" width="40" height="20" rx="4" fill="rgba(26, 35, 126, 0.2)" />
                            <rect x="80" y="25" width="40" height="20" rx="4" fill="rgba(26, 35, 126, 0.4)" />
                            <rect x="140" y="25" width="40" height="20" rx="4" fill="rgba(26, 35, 126, 0.6)" />
                            <text x="40" y="15" fontSize="11" fill="#1a237e" textAnchor="middle" fontWeight="bold">3x</text>
                            <text x="100" y="15" fontSize="11" fill="#1a237e" textAnchor="middle" fontWeight="bold">5x</text>
                            <text x="160" y="15" fontSize="11" fill="#1a237e" textAnchor="middle" fontWeight="bold">7x</text>
                            <text x="100" y="60" fontSize="12" fill="#1a237e" textAnchor="middle" fontWeight="bold">Sum = Perimeter</text>
                        </svg>
                    ),
                    d: 'If sides are given as a ratio like $3:5:7$, set them as $3x, 5x, 7x$. Add them up, set equal to the perimeter to solve for $x$, then calculate actual sides.',
                    ex: 'Ratio $3:5:7$, Perimeter $= 300$\n$3x + 5x + 7x = 300 \\implies 15x = 300 \\implies x=20$\nSides are $60, 100, 140$.',
                    tip: 'Double check: your new side lengths should always sum up to the given perimeter.',
                }
            ],
        },
    },
    {
        id: 'word-problems',
        nodeId: 'herons-9-0003',
        title: 'Costs & Real World Applications',
        subtitle: 'Skill 3 · Contextual Problems',
        icon: '🏞️',
        color: '#b71c1c',
        desc: 'Use the calculated area or perimeter to determine the cost of fencing, painting, or planting.',
        scenarioGen: generateWordProblemScenarios,
        learn: {
            concept: 'Area is the inside. Perimeter is the outside. Apply rates to the correct property.',
            rules: [
                {
                    title: 'Fencing Costs (Perimeter)',
                    f: '$\\text{Cost} = \\text{Perimeter} \\times \\text{Rate}$',
                    chart: () => (
                        <svg viewBox="0 0 200 100" width="100%" style={{ maxWidth: 300 }}>
                            <path d="M 40 80 L 160 80 L 100 20 Z" fill="none" stroke="#b71c1c" strokeWidth="4" strokeDasharray="6 4" />
                            <text x="100" y="55" fontSize="11" fill="#b71c1c" textAnchor="middle" fontWeight="bold">Fence Goes</text>
                            <text x="100" y="70" fontSize="11" fill="#b71c1c" textAnchor="middle" fontWeight="bold">AROUND</text>
                        </svg>
                    ),
                    d: 'A fence goes AROUND the shape. If a problem asks for fencing cost, you do NOT need Heron\'s formula! Just find the perimeter and multiply by the cost per meter.',
                    ex: 'Park sides $50\\text{m}, 80\\text{m}, 120\\text{m}$.\nPerimeter $= 250\\text{m}$.\nFencing costs $₹20$ per meter.\nTotal Cost = $250 \\times 20 = ₹5000$.',
                    tip: 'Watch out for "leaving a space for a gate". Subtract the gate length from the perimeter before multiplying!',
                },
                {
                    title: 'Surface Care (Area)',
                    f: '$\\text{Cost} = \\text{Area} \\times \\text{Rate}$',
                    chart: () => (
                        <svg viewBox="0 0 200 100" width="100%" style={{ maxWidth: 300 }}>
                            <path d="M 40 80 L 160 80 L 100 20 Z" fill="rgba(183, 28, 28, 0.2)" stroke="#b71c1c" strokeWidth="2" />
                            <text x="100" y="55" fontSize="11" fill="#b71c1c" textAnchor="middle" fontWeight="bold">Grass/Tiles</text>
                            <text x="100" y="70" fontSize="11" fill="#b71c1c" textAnchor="middle" fontWeight="bold">INSIDE</text>
                        </svg>
                    ),
                    d: 'Planting grass, laying tiles, or painting a triangular billboard requires finding the AREA first using Heron\'s Formula, then multiplying by the square meter rate.',
                    ex: 'Billbord area $= 384\\text{m}^2$. Earnings are $₹5000$ per $\\text{m}^2$ per year.\nRevenue for 1 year = $384 \\times 5000 = ₹1,920,000$.',
                    tip: 'Make sure units match! If the area is in $\\text{cm}^2$ and the rate is per $\\text{m}^2$, you must convert.',
                }
            ],
        },
    }
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HeronsFormula9Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // list, learn, practice, assessment
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className={styles['page']}>
                <nav className={styles['nav']} style={view === 'learn' ? { position: 'sticky', top: 0, zIndex: 100 } : {}}>
                    <button className={styles['nav-back']} onClick={goBack}>← Back to Skills</button>
                    <div className={styles['nav-links']}>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/herons-formula/intro')}>🌟 Introduction</button>
                        <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/herons-formula/terminology')}>📖 Terminology</button>
                        <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0', paddingBottom: 40, flex: 1, overflowY: 'auto' }}>
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
                                        <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Example Logic</h4>
                                            <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
                                        {selectedLearnIdx > 0 ? (
                                            <button onClick={() => setSelectedLearnIdx(s => s - 1)} style={{ padding: '8px 16px', background: 'transparent', border: '2px solid #cbd5e1', color: '#64748b', borderRadius: 50, fontWeight: 700, cursor: 'pointer' }}>
                                                ← Prev Rule
                                            </button>
                                        ) : <div />}
                                        {selectedLearnIdx < skill.learn.rules.length - 1 ? (
                                            <button onClick={() => setSelectedLearnIdx(s => s + 1)} style={{ padding: '8px 24px', background: skill.color, border: 'none', color: '#fff', borderRadius: 50, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 10px ${skill.color}40` }}>
                                                Next Rule →
                                            </button>
                                        ) : (
                                            <button onClick={() => setView('practice')} style={{ padding: '8px 24px', background: '#10b981', border: 'none', color: '#fff', borderRadius: 50, fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 10px rgba(16,185,129,0.4)` }}>
                                                Start Practice 🎯
                                            </button>
                                        )}
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <HeronsFormulaScenarioPracticeEngine 
                                scenarios={skill.scenarioGen()} 
                                title={skill.title} 
                                color={skill.color} 
                                onBack={goBack}
                                nodeId={skill.nodeId}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto', fontFamily: 'Open Sans, sans-serif' }}>
                            <HeronsFormulaScenarioAssessmentEngine 
                                scenarios={skill.scenarioGen()} 
                                title={skill.title} 
                                color={skill.color} 
                                onBack={goBack}
                                nodeId={skill.nodeId + '-assess'}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles['page']}>
            <nav className={styles['nav']} style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <button className={styles['nav-back']} onClick={() => navigate('/practice/class-9/herons-formula')}>← Back to Module</button>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/herons-formula/intro')}>🌟 Introduction</button>
                    <button className={styles['nav-link']} onClick={() => navigate('/practice/class-9/herons-formula/terminology')}>📖 Terminology</button>
                    <button className={`${styles['nav-link']} ${styles['nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>
            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
                <div style={{ maxWidth: 1100, margin: '20px auto 24px', padding: '0 24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Heron's Formula <span style={{ color: '#0f766e' }}>Skills</span>
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
