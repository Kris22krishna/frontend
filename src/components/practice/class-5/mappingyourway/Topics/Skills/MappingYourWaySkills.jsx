import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../The_Fish_Tale/fishtale.css';
import MathRenderer from '../../../../../MathRenderer';
import FishTalePracticeEngine from '../../../The_Fish_Tale/Topics/Skills/Engines/FishTalePracticeEngine';
import FishTaleAssessmentEngine from '../../../The_Fish_Tale/Topics/Skills/Engines/FishTaleAssessmentEngine';
import { SKILLS } from './MappingYourWaySkillsData';

export default function MappingYourWaySkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className={`ft-page ${view !== 'list' && view !== 'learn' ? 'ft-page-fixed' : ''}`}>
                <nav className="ft-topic-nav">
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        <button className="ft-back-link" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600, fontSize: 13 }} onClick={() => navigate('/middle/grade/5/mapping-your-way/introduction')}>🌍 Intro</span>
                        <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600, fontSize: 13 }} onClick={() => navigate('/middle/grade/5/mapping-your-way/terminology')}>📖 Terminology</span>
                        <span style={{ fontWeight: 800, color: '#0369a1', fontSize: 13 }}>🎯 Skills</span>
                    </div>
                </nav>
                <div className="ft-content" style={{ padding: '16px 24px 20px' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: 'center' }}>
                                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: 'var(--ft-text)', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="ft-learn-view-grid">
                                {/* Side Selector */}
                                <aside className="ft-learn-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                padding: '10px 14px', borderRadius: 12, border: 'none', textAlign: 'left', cursor: 'pointer',
                                                background: selectedLearnIdx === ri ? `${skill.color}15` : '#fff',
                                                borderLeft: selectedLearnIdx === ri ? `4px solid ${skill.color}` : '4px solid transparent',
                                                transition: 'all 0.2s',
                                                boxShadow: selectedLearnIdx === ri ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                                            }}
                                        >
                                            <div style={{ fontSize: 10, fontWeight: 900, color: selectedLearnIdx === ri ? skill.color : '#94a3b8', marginBottom: 2 }}>RULE {ri + 1}</div>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: selectedLearnIdx === ri ? 'var(--ft-text)' : '#64748b' }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main style={{ background: '#fff', borderRadius: 20, padding: '24px 32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                    <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>

                                    {/* Core Formula/Rule Box */}
                                    <div className="ft-formula-box" style={{ background: `${skill.color}05`, borderColor: `${skill.color}15` }}>
                                        <div className="ft-formula-text" style={{ color: skill.color }}>
                                            <MathRenderer text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>

                                    <div className="ft-rule-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: 1, color: '#94a3b8', marginBottom: 6 }}>Explanation</h4>
                                            <p className="ft-rule-desc">
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: 1, color: skill.color, marginBottom: 6 }}>Example</h4>
                                            <div className="ft-example-box">
                                                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ft-text)', lineHeight: 1.5 }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                                        <button className="ft-skill-btn-filled" onClick={() => setView('practice')} style={{ padding: '10px 24px', background: skill.color, fontSize: 13 }}>Try Practice →</button>
                                        <button className="ft-skill-btn-outline" onClick={() => setView('assessment')} style={{ padding: '10px 24px', fontSize: 13 }}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <FishTalePracticeEngine
                            questionPool={skill.practice}
                            sampleSize={20}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                        />
                    ) : (
                        <FishTaleAssessmentEngine
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            onSecondaryBack={() => navigate('/middle/grade/5/mapping-your-way')}
                        />
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/middle/grade/5/mapping-your-way')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/mapping-your-way/introduction')}>🌍 Intro</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/middle/grade/5/mapping-your-way/terminology')}>📖 Terminology</span>
                    <span style={{ fontWeight: 800, color: '#0369a1' }}>🎯 Skills</span>
                </div>
            </nav>

            <div className="ft-content" style={{ padding: '20px 24px 80px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--ft-text)', margin: '0 0 8px' }}>
                        Mapping Your Way <span style={{ background: 'linear-gradient(135deg, var(--ft-ocean), var(--ft-wave))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                    </h1>
                    <p style={{ color: 'var(--ft-muted)', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Step up from concepts to mastery with targeted practice.
                    </p>
                </div>

                <div className="ft-skills-grid">
                    {SKILLS.map((s, i) => (
                        <div key={i} className="ft-skill-card" style={{ '--skill-color': s.color, '--skill-color-30': `${s.color}4d`, '--skill-color-40': `${s.color}66` }}>
                            <div className="ft-skill-icon" style={{ background: `${s.color}10`, color: s.color }}>{s.icon}</div>
                            <div className="ft-skill-content">
                                <div className="ft-skill-text-stack">
                                    <span style={{ fontSize: 11, fontWeight: 900, color: s.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.subtitle}</span>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: 'var(--ft-text)', margin: 0 }}>{s.title}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: 'var(--ft-muted)', fontWeight: 500, margin: 0, opacity: 0.85 }}>{s.desc}</p>
                            </div>
                            <div className="ft-skill-actions">
                                <button className="ft-skill-btn-outline" onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                <button className="ft-skill-btn-outline" onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                <button className="ft-skill-btn-filled" onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: 60, padding: 32, borderRadius: 24,
                    background: 'linear-gradient(135deg, #0d9488, #0ea5e9)',
                    color: '#fff', textAlign: 'center', boxShadow: '0 15px 40px rgba(13,148,136,0.15)'
                }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready for More?</h3>
                    <p style={{ opacity: 0.9, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>Keep practicing to unlock advanced topics and master Maps, Scales, and Directions!</p>
                    <button style={{ padding: '12px 32px', borderRadius: 50, border: 'none', background: '#fff', color: '#0ea5e9', fontWeight: 800, cursor: 'pointer' }} onClick={() => navigate('/middle/grade/5/mapping-your-way')}>Dashboard</button>
                </div>
                </div>
            </div>
        </div>
    );
}
