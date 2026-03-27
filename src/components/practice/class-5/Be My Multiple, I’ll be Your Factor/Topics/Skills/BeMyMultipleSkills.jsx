import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../bemyfactor.css';
import { SKILLS } from './BeMyMultipleSkillsData';
import { LatexText } from '@/components/LatexText';
import BeMyMultiplePracticeEngine from './Engines/BeMyMultiplePracticeEngine';
import BeMyMultipleAssessmentEngine from './Engines/BeMyMultipleAssessmentEngine';

export default function BeMyMultipleSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('hub');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [activeRuleIdx, setActiveRuleIdx] = useState(0);

    const handleBack = () => {
        if (view === 'hub') navigate('/middle/grade/5/be-my-multiple');
        else setView('hub');
    };

    if (view === 'practice' && selectedSkill) {
        return (
            <BeMyMultiplePracticeEngine 
                questionPool={selectedSkill.practice}
                sampleSize={10}
                title={selectedSkill.title}
                color={selectedSkill.color}
                onBack={() => setView('hub')} 
            />
        );
    }

    if (view === 'assessment' && selectedSkill) {
        return (
            <BeMyMultipleAssessmentEngine 
                questions={selectedSkill.assessment()}
                title={selectedSkill.title}
                color={selectedSkill.color}
                onBack={() => setView('hub')}
                onSecondaryBack={() => navigate('/middle/grade/5/be-my-multiple')}
            />
        );
    }

    return (
        <div className="ft-page">
            <nav className="ft-topic-nav">
                <div className="ft-back-link" onClick={handleBack}>← Back</div>
                <div className="ft-nav-links">
                    <span className="ft-nav-link" onClick={() => navigate('/middle/grade/5/be-my-multiple/introduction')}>🌟 Intro</span>
                    <span className="ft-nav-link" onClick={() => navigate('/middle/grade/5/be-my-multiple/terminology')}>📖 Terminology</span>
                    <span className="ft-nav-link-active">🎯 Skills Hub</span>
                </div>
            </nav>

            <div className="ft-content" style={{ padding: '32px 24px' }}>
                {view === 'hub' && (
                    <div className="ft-skills-container">
                        <header style={{ textAlign: 'center', marginBottom: 48 }}>
                            <h1 className="ft-main-title" style={{ fontSize: '3.2rem', color: '#0f172a' }}>Skills <span className="ft-title-accent">Hub</span></h1>
                            <p style={{ color: '#64748b', fontSize: 18, fontWeight: 500 }}>Master factors and multiples through focused practice.</p>
                        </header>

                        <div className="ft-skills-grid">
                            {SKILLS.map((skill) => (
                                <div key={skill.id} className="ft-skill-card" style={{ '--skill-color': skill.color }}>
                                    <div className="ft-skill-icon" style={{ background: `${skill.color}15`, color: skill.color }}>{skill.icon}</div>
                                    <div className="ft-skill-content">
                                        <div className="ft-skill-text-stack">
                                            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', color: skill.color }}>{skill.subtitle}</div>
                                            <h3 className="ft-card-label" style={{ fontSize: 22, margin: '2px 0' }}>{skill.title}</h3>
                                        </div>
                                        <p className="ft-card-desc" style={{ marginBottom: 0 }}>{skill.desc}</p>
                                    </div>
                                    <div className="ft-skill-actions">
                                        <button className="ft-skill-btn-outline" onClick={() => { setSelectedSkill(skill); setView('learn'); setActiveRuleIdx(0); }}>Learn</button>
                                        <button className="ft-skill-btn-outline" onClick={() => { setSelectedSkill(skill); setView('practice'); }}>Practice</button>
                                        <button className="ft-skill-btn-filled" style={{ '--skill-color': skill.color, '--skill-color-30': `${skill.color}30`, '--skill-color-40': `${skill.color}40`, background: skill.color }} onClick={() => { setSelectedSkill(skill); setView('assessment'); }}>Assess</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'learn' && selectedSkill && (
                    <div className="ft-learn-container" style={{ maxWidth: 1000, margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 32, justifyContent: 'center' }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${selectedSkill.color}15`, fontSize: 24 }}>{selectedSkill.icon}</div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, color: '#0f172a' }}>Learn: {selectedSkill.title}</h2>
                        </div>

                        <div className="ft-learn-view-grid">
                            <aside className="ft-learn-sidebar">
                                {selectedSkill.learn.rules.map((rule, idx) => (
                                    <button
                                        key={idx}
                                        className={`ft-rule-btn ${activeRuleIdx === idx ? 'ft-rule-btn-active' : ''}`}
                                        onClick={() => setActiveRuleIdx(idx)}
                                        style={{
                                            background: activeRuleIdx === idx ? `${selectedSkill.color}15` : '#fff',
                                            borderLeft: `4px solid ${activeRuleIdx === idx ? selectedSkill.color : 'transparent'}`,
                                            padding: '12px 16px',
                                            borderRadius: 12,
                                            marginBottom: 8,
                                            width: '100%',
                                            textAlign: 'left',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ fontSize: 10, fontWeight: 900, color: activeRuleIdx === idx ? selectedSkill.color : '#94a3b8' }}>RULE {idx + 1}</div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: activeRuleIdx === idx ? '#0f172a' : '#64748b' }}>{rule.title}</div>
                                    </button>
                                ))}
                            </aside>

                            <main className="ft-quiz-card" style={{ padding: 40 }}>
                                <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 20 }}>{selectedSkill.learn.rules[activeRuleIdx].title}</h3>
                                
                                <div className="ft-formula-box" style={{ background: `${selectedSkill.color}08`, borderColor: `${selectedSkill.color}30`, padding: 32 }}>
                                    <div style={{ fontSize: 32, fontWeight: 800, color: selectedSkill.color, textAlign: 'center' }}>
                                        <LatexText text={selectedSkill.learn.rules[activeRuleIdx].f} />
                                    </div>
                                </div>

                                <div className="ft-rule-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 24 }}>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>EXPLANATION</div>
                                        <p style={{ fontSize: 15, color: '#0f172a', lineHeight: 1.6, margin: 0 }}>{selectedSkill.learn.rules[activeRuleIdx].d}</p>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8 }}>EXAMPLE</div>
                                        <div className="ft-example-box" style={{ background: '#f8fafc', padding: 16, borderRadius: 12, fontWeight: 600 }}>
                                            <LatexText text={selectedSkill.learn.rules[activeRuleIdx].ex} />
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
                                    <button className="ft-skill-btn-filled" style={{ background: selectedSkill.color, border: 'none', color: '#fff', padding: '12px 24px', borderRadius: 100, fontWeight: 700, cursor: 'pointer' }} onClick={() => setView('practice')}>Start Practice</button>
                                    <button className="ft-skill-btn-outline" onClick={() => setView('hub')}>Back to Hub</button>
                                </div>
                            </main>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
