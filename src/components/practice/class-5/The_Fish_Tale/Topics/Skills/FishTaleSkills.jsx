import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../fishtale.css';
import MathRenderer from '../../../../../MathRenderer';
import QuizEngine from '../../../../../Math-Branches/Algebra/Topics/Skills/Engines/QuizEngine';
import AssessmentEngine from '../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine';
import { SKILLS } from './FishTaleSkillsData';

export default function FishTaleSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className="ft-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className="ft-topic-nav">
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        <button className="ft-back-link" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/the-fish-tale/introduction')}>🌟 Intro</span>
                        <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/the-fish-tale/terminology')}>📖 Terminology</span>
                        <span style={{ fontWeight: 800, color: '#0369a1' }}>🎯 Skills</span>
                    </div>
                </nav>
                <div style={{ padding: '40px 24px 0' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--ft-text)', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32 }}>
                                {/* Side Selector */}
                                <aside style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                padding: '16px 20px', borderRadius: 16, border: 'none', textAlign: 'left', cursor: 'pointer',
                                                background: selectedLearnIdx === ri ? `${skill.color}15` : '#fff',
                                                borderLeft: selectedLearnIdx === ri ? `6px solid ${skill.color}` : '6px solid transparent',
                                                boxShadow: selectedLearnIdx === ri ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            <div style={{ fontSize: 12, fontWeight: 900, color: selectedLearnIdx === ri ? skill.color : '#94a3b8', marginBottom: 4 }}>RULE {ri + 1}</div>
                                            <span style={{ fontSize: 16, fontWeight: 700, color: selectedLearnIdx === ri ? 'var(--ft-text)' : '#64748b' }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                    <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>

                                    {/* Core Formula/Rule Box */}
                                    <div style={{ background: `${skill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${skill.color}15`, margin: '32px 0', textAlign: 'center' }}>
                                        <div style={{ fontSize: 42, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#94a3b8', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--ft-text)' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)', overflowX: 'auto' }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ft-text)', whiteSpace: 'nowrap' }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex.includes('$') ? skill.learn.rules[selectedLearnIdx].ex : `$${skill.learn.rules[selectedLearnIdx].ex}$`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className="ft-skill-btn-filled" onClick={() => setView('practice')} style={{ padding: '14px 32px', background: skill.color }}>Try Practice →</button>
                                        <button className="ft-skill-btn-outline" onClick={() => setView('assessment')} style={{ padding: '14px 32px' }}>Take Full Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <QuizEngine
                            questions={skill.practice}
                            title={`Practice: ${skill.title}`}
                            color={skill.color}
                            prefix="ft"
                            onBack={() => setView('list')}
                            onSecondaryBack={() => navigate('/the-fish-tale')}
                        />
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            prefix="ft"
                            onBack={() => setView('list')}
                            onSecondaryBack={() => navigate('/the-fish-tale')}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={() => navigate('/the-fish-tale')}>← Back to Chapter</div>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/the-fish-tale/introduction')}>🌟 Intro</span>
                    <span style={{ cursor: 'pointer', color: '#64748b', fontWeight: 600 }} onClick={() => navigate('/the-fish-tale/terminology')}>📖 Terminology</span>
                    <span style={{ fontWeight: 800, color: '#0369a1' }}>🎯 Skills</span>
                </div>
            </nav>

            <div style={{ maxWidth: 1000, margin: '20px auto', padding: '20px 24px 80px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--ft-text)', margin: '0 0 8px' }}>
                        The Fish Tale <span style={{ background: 'linear-gradient(135deg, var(--ft-ocean), var(--ft-wave))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
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
                    <p style={{ opacity: 0.9, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>Keep practicing to unlock advanced topics and master the world of Large Numbers!</p>
                    <button style={{ padding: '12px 32px', borderRadius: 50, border: 'none', background: '#fff', color: '#0ea5e9', fontWeight: 800, cursor: 'pointer' }} onClick={() => navigate('/the-fish-tale')}>Dashboard</button>
                </div>
            </div>
        </div>
    );
}
