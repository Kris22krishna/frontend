import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../doesitlooksame.css';
import MathRenderer from '@/components/MathRenderer';
import DoesItLookSamePracticeEngine from './Engines/DoesItLookSamePracticeEngine';
import DoesItLookSameAssessmentEngine from './Engines/DoesItLookSameAssessmentEngine';
import { SKILLS } from './DoesItLookSameSkillsData.jsx';

export default function DoesItLookSameSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className={`dils-page ${view !== 'list' && view !== 'learn' ? 'dils-page-fixed' : ''}`}>
                <nav className="dils-topic-nav">
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        <button className="dils-back-link" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    </div>
                    <div className="dils-nav-links">
                        <span className="dils-nav-link" onClick={() => navigate('/middle/grade/5/does-it-look-same/introduction')}>🌟 Intro</span>
                        <span className="dils-nav-link" onClick={() => navigate('/middle/grade/5/does-it-look-same/terminology')}>📖 Terminology</span>
                        <span className="dils-nav-link-active">🎯 Skills</span>
                    </div>
                </nav>
                <div className="dils-content" style={{ padding: '16px 24px 20px' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: 'center' }}>
                                <div className="dils-skill-image-container" style={{ width: 40, height: 40 }}>
                                    {skill.image ? <img src={skill.image} alt="" className="dils-skill-image" /> : skill.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="dils-learn-view-grid">
                                <aside className="dils-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            className="dils-rule-btn"
                                            style={{
                                                background: selectedLearnIdx === ri ? `${skill.color}15` : '#fff',
                                                borderLeft: selectedLearnIdx === ri ? `4px solid ${skill.color}` : '4px solid transparent',
                                            }}
                                        >
                                            <div style={{ fontSize: 10, fontWeight: 900, color: selectedLearnIdx === ri ? skill.color : '#94a3b8', marginBottom: 2 }}>RULE {ri + 1}</div>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: selectedLearnIdx === ri ? '#0f172a' : '#64748b' }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                <main style={{ background: '#fff', borderRadius: 20, padding: '24px 32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                    <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>

                                    <div className="dils-formula-box" style={{ background: `${skill.color}05`, borderColor: `${skill.color}15` }}>
                                        <div className="dils-formula-text" style={{ color: skill.color }}>
                                            <MathRenderer text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>

                                    <div className="dils-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: 1, color: '#94a3b8', marginBottom: 6 }}>Explanation</h4>
                                            <p style={{ fontSize: 14, lineHeight: 1.5, margin: 0, color: '#0f172a' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>
                                            {skill.learn.rules[selectedLearnIdx].figure && (
                                                <div className="dils-learn-figure-container">
                                                    {skill.learn.rules[selectedLearnIdx].figure}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 10, letterSpacing: 1, color: skill.color, marginBottom: 6 }}>Example</h4>
                                            <div className="dils-example-box">
                                                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', lineHeight: 1.5 }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                                        <button className="dils-btn-filled" style={{ '--skill-color': skill.color }} onClick={() => setView('practice')}>Try Practice →</button>
                                        <button className="dils-btn-outline" onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <DoesItLookSamePracticeEngine
                            questionPool={skill.practice()}
                            sampleSize={20}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                        />
                    ) : (
                        <DoesItLookSameAssessmentEngine
                            questions={skill.assessment()}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            onSecondaryBack={() => navigate('/middle/grade/5/does-it-look-same')}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="dils-page">
            <nav className="dils-topic-nav">
                <button className="dils-back-link" onClick={() => navigate('/middle/grade/5/does-it-look-same')}>← Back to Chapter</button>
                <div className="dils-nav-links">
                    <span className="dils-nav-link" onClick={() => navigate('/middle/grade/5/does-it-look-same/introduction')}>🌟 Intro</span>
                    <span className="dils-nav-link" onClick={() => navigate('/middle/grade/5/does-it-look-same/terminology')}>📖 Terminology</span>
                    <span className="dils-nav-link-active">🎯 Skills</span>
                </div>
            </nav>

            <div className="dils-content" style={{ padding: '20px 24px 80px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                            Does it Look the Same? <span style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                        </h1>
                        <p style={{ color: '#64748b', fontWeight: 600, fontSize: 16, margin: 0 }}>
                            Step up from concepts to mastery with targeted practice.
                        </p>
                    </div>

                    <div className="dils-skills-grid">
                        {SKILLS.map((s, i) => (
                            <div key={i} className="dils-skill-card" style={{ '--skill-color': s.color }}>
                                <div className="dils-skill-image-container">
                                    {s.image ? <img src={s.image} alt={s.title} className="dils-skill-image" /> : s.icon}
                                </div>
                                <div className="dils-skill-content">
                                    <div className="dils-skill-text-stack">
                                        <span style={{ fontSize: 11, fontWeight: 900, color: s.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.subtitle}</span>
                                        <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: 0 }}>{s.title}</h3>
                                    </div>
                                    <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, margin: 0, opacity: 0.85 }}>{s.desc}</p>
                                </div>
                                <div className="dils-skill-actions">
                                    <button className="dils-btn-outline" onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                    <button className="dils-btn-outline" onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                    <button className="dils-btn-filled" style={{ '--skill-color': s.color }} onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: 60, padding: 32, borderRadius: 24,
                        background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)',
                        color: '#fff', textAlign: 'center', boxShadow: '0 15px 40px rgba(79,70,229,0.15)'
                    }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
                        <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready for More?</h3>
                        <p style={{ opacity: 0.9, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>Keep practicing to unlock advanced topics and master the world of Symmetry!</p>
                        <button style={{ padding: '12px 32px', borderRadius: 50, border: 'none', background: '#fff', color: '#4f46e5', fontWeight: 800, cursor: 'pointer' }} onClick={() => navigate('/middle/grade/5/does-it-look-same')}>Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
