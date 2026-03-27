import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Patterns.css';
import MathRenderer from '../../../../../MathRenderer';
import PatternsPracticeEngine from './Engines/PatternsPracticeEngine';
import PatternsAssessmentEngine from './Engines/PatternsAssessmentEngine';
import { SKILLS } from './PatternsSkillsData';

export default function PatternsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className={`pt-page ${view !== 'list' && view !== 'learn' ? 'pt-page-fixed' : ''}`}>
                <nav className="pt-topic-nav">
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        <button className="pt-back-link" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <span style={{ fontWeight: 800, color: 'var(--pt-primary)', fontSize: 13 }}>🎯 Skills</span>
                    </div>
                </nav>
                <div className="pt-content" style={{ padding: '16px 24px 20px' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: 'center' }}>
                                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: 'var(--pt-text)', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="pt-learn-view-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
                                <aside style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                                            <span style={{ fontSize: 13, fontWeight: 700, color: selectedLearnIdx === ri ? 'var(--pt-text)' : '#64748b' }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                <main style={{ background: '#fff', borderRadius: 20, padding: '24px 32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                    <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>

                                    <div className="pt-formula-box" style={{ background: `${skill.color}05`, borderColor: `${skill.color}15` }}>
                                        <div className="pt-formula-text" style={{ color: skill.color }}>
                                            <MathRenderer text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: 1, color: '#94a3b8', marginBottom: 6 }}>Explanation</h4>
                                            <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--pt-text)' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: 1, color: skill.color, marginBottom: 6 }}>Example</h4>
                                            <div className="pt-example-box">
                                                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--pt-text)', lineHeight: 1.5 }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                                        <button className="pt-btn-primary" onClick={() => setView('practice')} style={{ padding: '10px 24px', background: skill.color, fontSize: 13 }}>Try Practice →</button>
                                        <button className="pt-btn-secondary" onClick={() => setView('assessment')} style={{ padding: '10px 24px', fontSize: 13 }}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <PatternsPracticeEngine
                            questionPool={skill.practice}
                            sampleSize={10}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                        />
                    ) : (
                        <PatternsAssessmentEngine
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            onSecondaryBack={() => navigate('/middle/grade/5/canyouseethepatterns')}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="pt-page">
            <div className="pt-deco pt-deco-a" />
            <div className="pt-deco pt-deco-b" />
            <div className="pt-deco pt-deco-c" />
            <nav className="pt-topic-nav">
                <div className="pt-back-link" onClick={() => navigate('/middle/grade/5/canyouseethepatterns')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ fontWeight: 800, color: 'var(--pt-primary)' }}>🎯 Skills</span>
                </div>
            </nav>

            <div className="pt-content" style={{ padding: '20px 24px 80px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--pt-text)', margin: '0 0 8px' }}>
                            Can You See The <span style={{ background: 'linear-gradient(135deg, var(--pt-primary), var(--pt-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Pattern?</span>
                        </h1>
                        <p style={{ color: 'var(--pt-muted)', fontWeight: 600, fontSize: 16, margin: 0 }}>
                            Step up from concepts to mastery with targeted pattern practice.
                        </p>
                    </div>

                    <div className="pt-skills-grid">
                        {SKILLS.map((s, i) => (
                            <div key={i} className="pt-skill-card" style={{ '--skill-color': s.color, '--skill-color-30': `${s.color}4d`, '--skill-color-40': `${s.color}66` }}>
                                <div className="pt-skill-icon" style={{ background: `${s.color}10`, color: s.color }}>{s.icon}</div>
                                <div className="pt-skill-content">
                                    <div className="pt-skill-text-stack">
                                        <span style={{ fontSize: 11, fontWeight: 900, color: s.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.subtitle}</span>
                                        <h3 style={{ fontSize: 22, fontWeight: 900, color: 'var(--pt-text)', margin: 0 }}>{s.title}</h3>
                                    </div>
                                    <p style={{ fontSize: 14, color: 'var(--pt-muted)', fontWeight: 500, margin: 0 }}>{s.desc}</p>
                                </div>
                                <div className="pt-skill-actions">
                                    <button className="pt-skill-btn-outline" onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                    <button className="pt-skill-btn-outline" onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                    <button className="pt-skill-btn-filled" onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: 60, padding: 32, borderRadius: 24,
                        background: 'linear-gradient(135deg, var(--pt-primary), var(--pt-secondary))',
                        color: '#fff', textAlign: 'center', boxShadow: '0 15px 40px rgba(79,70,229,0.15)'
                    }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
                        <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready for More?</h3>
                        <p style={{ opacity: 0.9, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>Keep practicing to unlock advanced pattern recognition and logical reasoning!</p>
                        <button style={{ padding: '12px 32px', borderRadius: 50, border: 'none', background: '#fff', color: 'var(--pt-primary)', fontWeight: 800, cursor: 'pointer' }} onClick={() => navigate('/middle/grade/5/canyouseethepatterns')}>Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
