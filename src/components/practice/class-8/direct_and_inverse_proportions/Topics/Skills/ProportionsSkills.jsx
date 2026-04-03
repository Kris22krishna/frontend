import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../proportions.css';
import { NODE_IDS } from '@/lib/curriculumIds';

const SKILL_NODE_IDS = [
    NODE_IDS.g8MathDIPDirect,   // index 0 — direct
    NODE_IDS.g8MathDIPInverse,  // index 1 — inverse
];

import ProportionsPracticeEngine from './Engines/ProportionsPracticeEngine';
import ProportionsAssessmentEngine from './Engines/ProportionsAssessmentEngine';

import {
    buildDirectPracticePool,
    buildDirectAssessmentPool,
    buildInversePracticePool,
    buildInverseAssessmentPool,
} from './ProportionsSkillsData';

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'direct',
        title: 'Direct Proportion',
        subtitle: 'Skill 1 · Identify & Solve',
        icon: '📈',
        color: '#059669',
        desc: 'Identify direct proportion situations, find the constant k, and solve missing-value problems using the unitary method.',
        practicePool: buildDirectPracticePool,
        assessmentPool: buildDirectAssessmentPool,
        learn: {
            concept: 'In direct proportion, y ∝ x — both quantities increase or decrease in the same ratio. The constant k = y/x stays fixed for all pairs.',
            rules: [
                {
                    title: 'Identify Direct Proportion',
                    f: 'x ↑ → y ↑  |  y/x = k (constant)',
                    d: 'Two quantities are in DIRECT proportion when they increase and decrease together in the same ratio. The ratio y/x remains constant for every pair of values.',
                    ex: 'Cost of apples at ₹80/kg: 1 kg → ₹80, 2 kg → ₹160, 3 kg → ₹240. At all points, Cost/Quantity = 80. Direct proportion confirmed.',
                    tip: 'Quick test: Double x and check if y also doubles. If yes → direct proportion.',
                },
                {
                    title: 'Find the Constant k',
                    f: 'k = y ÷ x',
                    d: 'The constant of proportionality k equals y divided by x. Once you know k, you can find any unknown y or x using y = kx.',
                    ex: 'A car travels 300 km on 25 litres of petrol. k = 300/25 = 12 km/litre. For 40 litres: distance = 12 × 40 = 480 km.',
                    tip: 'k has units — it\'s the "rate" (cost per item, km per litre, etc.).',
                },
                {
                    title: 'Unitary Method',
                    f: 'Step 1: Find value for 1 unit. Step 2: Multiply.',
                    d: 'The most reliable method for direct proportion: divide to find the value for ONE unit, then multiply to find the value for any required number of units.',
                    ex: '7 notebooks cost ₹98. Cost of 12 notebooks?\n• Cost of 1 notebook = 98 ÷ 7 = ₹14.\n• Cost of 12 = 14 × 12 = ₹168.',
                    tip: 'Always label your units at every step — it prevents errors.',
                },
                {
                    title: 'Cross-Multiplication Method',
                    f: 'x₁/y₁ = x₂/y₂  →  x₁ × y₂ = x₂ × y₁',
                    d: 'Set up two equal ratios and cross-multiply to find the unknown value. This is the algebraic approach to direct proportion problems.',
                    ex: '5 metres of cloth cost ₹375. Find the cost of 8 metres.\n5/375 = 8/? → ? × 5 = 375 × 8 = 3000 → ? = ₹600.',
                    tip: 'Cross-multiplication works only when the ratios are equal — i.e., direct proportion confirmed.',
                },
                {
                    title: 'Real-Life Direct Proportion',
                    f: 'Cost, wages, distance, shadows',
                    d: 'Common NCERT direct proportion contexts: price × quantity = total cost, wages per hour × hours = total wages, speed × time = distance (same speed), shadow ∝ height at the same time of day.',
                    ex: '• A 4 m pole casts a 3 m shadow → a 12 m tree casts a 9 m shadow (4/3 = 12/9).\n• 12 kg of wheat costs ₹408 → 16 kg costs ₹544 (k = ₹34/kg).',
                    tip: 'Any relationship of the form y = kx is a direct proportion. Recognise the constant rate.',
                },
            ],
        },
    },
    {
        id: 'inverse',
        title: 'Inverse Proportion',
        subtitle: 'Skill 2 · Identify & Solve',
        icon: '📉',
        color: '#7c3aed',
        desc: 'Identify inverse proportion situations, use the product rule x₁y₁ = x₂y₂, and solve problems involving workers, pipes, speed, and gears.',
        practicePool: buildInversePracticePool,
        assessmentPool: buildInverseAssessmentPool,
        learn: {
            concept: 'In inverse proportion, as one quantity increases, the other decreases so that their product x × y = k stays constant.',
            rules: [
                {
                    title: 'Identify Inverse Proportion',
                    f: 'x ↑ → y ↓  |  x × y = k (constant)',
                    d: 'Two quantities are in INVERSE proportion when one increases and the other decreases, keeping their product constant. If x doubles, y halves.',
                    ex: '6 workers take 14 days. 12 workers take 7 days. Check: 6×14 = 84 = 12×7. Product constant → inverse proportion.',
                    tip: 'Quick test: Double x — if y halves, it\'s inverse proportion.',
                },
                {
                    title: 'Product Rule (x₁y₁ = x₂y₂)',
                    f: 'x₁ × y₁ = x₂ × y₂ = k',
                    d: 'To solve an inverse proportion problem: find the product k from the given pair, then use it to find the unknown in the second pair.',
                    ex: '8 men can paint a house in 6 days. How long for 12 men?\nk = 8 × 6 = 48. 12 × d = 48 → d = 4 days.',
                    tip: 'The product k is always constant. If you forget the formula, just compute k from the complete pair first.',
                },
                {
                    title: 'Workers and Time',
                    f: 'Workers × Days = Total Work (constant)',
                    d: 'More workers → fewer days to complete the same task. This is the most common NCERT example of inverse proportion.',
                    ex: 'A field is ploughed by 16 workers in 18 days. To finish in 12 days, workers needed:\n16 × 18 = 288 = w × 12 → w = 24 workers.',
                    tip: 'Remember: "more workers → less time". Choose the ratio that is INVERSE when setting up the equation.',
                },
                {
                    title: 'Pipes Filling a Tank',
                    f: 'Pipes × Time = Volume (constant)',
                    d: 'More pipes open → tank fills faster → less time. Classic inverse proportion situation.',
                    ex: '3 pipes can fill a tank in 12 hours. In how many hours can 4 pipes fill it?\n3 × 12 = 36 = 4 × t → t = 9 hours.',
                    tip: 'Double check: 4 pipes should take LESS time than 3 pipes. If your answer is more, you\'ve set it up backwards!',
                },
                {
                    title: 'Speed, Time & Gears',
                    f: 'Speed × Time = Distance (constant)',
                    d: 'For the same journey, speed and time are inversely proportional. Also, in meshed gears, Teeth × RPM = constant (inverse proportion).',
                    ex: '• Car at 60 km/h takes 5 hours. At 75 km/h: 60×5 = 75×t → t = 4 hours.\n• Gear A (40 teeth, 60 rpm) meshed with Gear B (60 teeth): rpm = (40×60)/60 = 40 rpm.',
                    tip: 'Speed × Time = Distance is only constant for the SAME journey / fixed distance.',
                },
            ],
        },
    },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ProportionsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const goBack = () => { setView('list'); setSelectedLearnIdx(0); };

    if (view !== 'list' && skill) {
        return (
            <div className="prop-page">
                <nav className="prop-nav">
                    <button className="prop-nav-back" onClick={goBack}>← Back to Skills</button>
                    <div className="prop-nav-links">
                        <button className="prop-nav-link" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/introduction')}>🌟 Intro</button>
                        <button className="prop-nav-link" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/terminology')}>📖 Terminology</button>
                        <button className="prop-nav-link prop-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '20px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="prop-lexicon-container">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            {/* Concept intro */}                        
                            <div className="prop-learn-grid">
                                <aside className="prop-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`prop-sidebar-btn${selectedLearnIdx === ri ? ' active' : ''}`}
                                            style={{ '--skill-color': skill.color }}>
                                            <div className="prop-sidebar-btn-num">{ri + 1}</div>
                                            <span className="prop-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>
                                <main className="prop-details-window prop-details-window-anim" key={selectedLearnIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 28 }}>{skill.icon}</div>
                                    </div>
                                    <div style={{ background: `${skill.color}08`, padding: '18px', borderRadius: 16, border: `2px solid ${skill.color}20`, marginBottom: 22, textAlign: 'center' }}>
                                        <div style={{ fontSize: 20, fontWeight: 800, color: skill.color, letterSpacing: 0.5 }}>{skill.learn.rules[selectedLearnIdx].f}</div>
                                    </div>
                                    <div className="prop-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#64748b', marginBottom: 8 }}>Explanation</h4>
                                            <p style={{ fontSize: 15, lineHeight: 1.65, color: '#0f172a', margin: 0 }}>{skill.learn.rules[selectedLearnIdx].d}</p>
                                            {skill.learn.rules[selectedLearnIdx].tip && (
                                                <div style={{ marginTop: 16, background: 'rgba(20,184,166,0.05)', padding: '12px', borderRadius: 12, border: '1px solid rgba(20,184,166,0.12)' }}>
                                                    <p style={{ margin: 0, fontSize: 13.5, color: '#64748b' }}>
                                                        <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Tip: </span>
                                                        {skill.learn.rules[selectedLearnIdx].tip}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: skill.color, marginBottom: 8 }}>Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 14, border: '1px solid rgba(0,0,0,0.04)' }}>
                                                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{skill.learn.rules[selectedLearnIdx].ex}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                        <button className="prop-btn-primary" onClick={() => setView('practice')} style={{ background: skill.color }}>Mastered? Try Practice →</button>
                                        <button className="prop-btn-secondary" onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <div style={{ maxWidth: 920, margin: '0 auto' }}>
                            <ProportionsPracticeEngine
                                questionPool={skill.practicePool()}
                                sampleSize={20}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={SKILL_NODE_IDS[activeSkill]}
                            />
                        </div>
                    ) : (
                        <div style={{ maxWidth: 1050, margin: '0 auto' }}>
                            <ProportionsAssessmentEngine
                                questionPool={skill.assessmentPool()}
                                sampleSize={10}
                                title={skill.title}
                                color={skill.color}
                                onBack={goBack}
                                nodeId={SKILL_NODE_IDS[activeSkill]}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="prop-page">
            <nav className="prop-nav">
                <button className="prop-nav-back" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions')}>← Back to Proportions</button>
                <div className="prop-nav-links">
                    <button className="prop-nav-link" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/introduction')}>🌟 Introduction</button>
                    <button className="prop-nav-link" onClick={() => navigate('/senior/grade/8/direct-and-inverse-proportions/terminology')}>📖 Terminology</button>
                    <button className="prop-nav-link prop-nav-link--active">🎯 Skills</button>
                </div>
            </nav>
            <div className="prop-lexicon-container" style={{ maxWidth: 1100, margin: '30px auto 40px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 32 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Proportions <span style={{ color: '#00afb9' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Learn, practice, and assess with 10 timed questions per skill.</div>
                </div>
                <div className="prop-skills-list">
                    {SKILLS.map((sk, idx) => (
                        <div key={sk.id} className="prop-skill-card">
                            <div className="prop-skill-info">
                                <div className="prop-skill-icon" style={{ background: `${sk.color}15` }}>{sk.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: sk.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{sk.subtitle}</div>
                                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{sk.title}</h3>
                                    <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{sk.desc}</p>
                                </div>
                            </div>
                            <div className="prop-skill-actions">
                                <button className="prop-skill-btn-outline" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('learn'); }}>Learn</button>
                                <button className="prop-skill-btn-outline" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('practice'); }}>Practice</button>
                                <button className="prop-skill-btn-filled" style={{ '--btn-color': sk.color }} onClick={() => { setActiveSkill(idx); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                        Completed both skills? You're a <span style={{ color: '#059669' }}>Proportions Pro! ⚖️</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
