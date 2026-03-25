import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../simple-equations.css';
import { LatexText } from '../../../../../LatexText';
import QuizEngine from './Engines/QuizEngine';
import AssessmentEngine from './Engines/AssessmentEngine';
import CategorizedPracticeEngine from './Engines/CategorizedPracticeEngine';
import { SKILLS } from './SimpleEquationsSkillsData.js';

export default function SimpleEquationsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className="eq-skills-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                    <button
                        onClick={() => { setView('list'); setSelectedLearnIdx(0); }}
                        style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        ← Back to Skills
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            style={{ padding: '8px 16px', borderRadius: '100px', background: 'transparent', color: '#64748b', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                            onClick={() => navigate('/middle/grade/7/simple-equations/introduction')}
                        >
                            🌟 Introduction
                        </button>
                        <button
                            style={{ padding: '8px 16px', borderRadius: '100px', background: 'transparent', color: '#64748b', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                            onClick={() => navigate('/middle/grade/7/simple-equations/terminology')}
                        >
                            📖 Terminology
                        </button>
                        <button
                            style={{ padding: '8px 16px', borderRadius: '100px', background: '#10b981', color: '#fff', fontWeight: '700', border: 'none' }}
                            onClick={() => navigate('/middle/grade/7/simple-equations/skills')}
                        >
                            🎯 Skills
                        </button>
                    </div>
                </nav>

                <div style={{ padding: '40px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="eq-lexicon-container">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 300px) 1fr', gap: 24, alignItems: 'start', maxWidth: 1100, margin: '0 auto' }}>
                                {/* Side Selector */}
                                <aside style={{ background: '#fff', borderRadius: 20, padding: 16, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                                                borderRadius: 12, border: 'none', cursor: 'pointer',
                                                background: selectedLearnIdx === ri ? skill.color : 'transparent',
                                                color: selectedLearnIdx === ri ? '#fff' : '#64748b',
                                                transition: 'all 0.2s', textAlign: 'left', fontWeight: 700
                                            }}
                                        >
                                            <div style={{ width: 28, height: 28, borderRadius: 8, background: selectedLearnIdx === ri ? '#fff' : `${skill.color}15`, color: selectedLearnIdx === ri ? skill.color : skill.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{ri + 1}</div>
                                            <span>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main className="eq-details-window-anim" key={selectedLearnIdx} style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #e2e8f0', minHeight: 400 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div style={{ background: '#f8fafc', padding: '32px', borderRadius: 20, border: `2px solid ${skill.color}20`, marginBottom: 32, textAlign: 'center' }}>
                                        <div style={{ fontSize: 36, fontWeight: 800, color: skill.color }}>
                                            <LatexText text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: '#334155' }}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>

                                            <div style={{ marginTop: 24, background: '#f0fdf4', padding: '16px', borderRadius: 16, border: '1px solid #bcf0da' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#065f46' }}>
                                                    <span style={{ fontWeight: 800 }}>💡 Tip: </span>
                                                    <LatexText text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#fff', padding: 24, borderRadius: 20, border: `1px solid ${skill.color}30`, boxShadow: `0 4px 12px ${skill.color}10` }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>
                                                    <LatexText text={`$${skill.learn.rules[selectedLearnIdx].ex}$`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button onClick={() => setView('practice')} style={{ padding: '14px 32px', background: skill.color, color: '#fff', borderRadius: 100, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: `0 4px 12px ${skill.color}40` }}>Mastered this? Try Practice →</button>
                                        <button onClick={() => setView('assessment')} style={{ padding: '14px 32px', background: '#fff', color: skill.color, border: `2px solid ${skill.color}`, borderRadius: 100, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Take Full Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        skill.practiceCategories ? (
                            <CategorizedPracticeEngine
                                skill={skill}
                                onBack={() => setView('list')}
                                prefix="eq"
                            />
                        ) : (
                            <QuizEngine
                                questions={skill.practice}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={() => setView('list')}
                                prefix="eq"
                            />
                        )
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="eq"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="eq-skills-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <button
                    onClick={() => navigate('/middle/grade/7/simple-equations')}
                    style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                    ← Back to Simple Equationss
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        style={{ padding: '8px 16px', borderRadius: '100px', background: 'transparent', color: '#64748b', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                        onClick={() => navigate('/middle/grade/7/simple-equations/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        style={{ padding: '8px 16px', borderRadius: '100px', background: 'transparent', color: '#64748b', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                        onClick={() => navigate('/middle/grade/7/simple-equations/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        style={{ padding: '8px 16px', borderRadius: '100px', background: '#10b981', color: '#fff', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                        onClick={() => navigate('/middle/grade/7/simple-equations/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="eq-lexicon-container" style={{ padding: '40px 24px 80px', maxWidth: 1000, margin: '0 auto' }}>

                {/* Centered Heading */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Simple Equations <span style={{ color: '#10b981' }}>Skills</span>
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Step up from concepts to mastery with targeted practice.
                    </p>
                </div>

                <div className="eq-skills-grid">
                    {SKILLS.map((s, i) => (
                        <div key={s.id} className="eq-skill-card" style={{ '--skill-color': s.color }}>
                            <div className="eq-skill-icon" style={{ background: `${s.color}10`, color: s.color }}>
                                {s.icon}
                            </div>

                            <div className="eq-skill-content">
                                <div className="eq-skill-text-stack">
                                    <span style={{ fontSize: 11, fontWeight: 900, color: s.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.subtitle}</span>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: 0 }}>{s.title}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, margin: 0, opacity: 0.85 }}>{s.desc}</p>
                            </div>

                            <div className="eq-skill-actions">
                                <button className="eq-skill-btn-outline" onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                <button className="eq-skill-btn-outline" onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                <button className="eq-skill-btn-filled" onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
