import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../class-7/Integers/integers.css';
import MathRenderer from '../../../../../MathRenderer';
import QuizEngine from '../../QuizEngine_6.jsx';
import AssessmentEngine_6 from '../../AssessmentEngine_6.jsx';
import CategorizedPracticeEngine from '../../CategorizedPracticeEngine_6.jsx';
import { SKILLS } from './PatternsSkillsData';

export default function PatternsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className="int-skills-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className="int-intro-nav">
                    <button className="int-intro-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className="int-intro-nav-links">
                        <button className="int-intro-nav-link" onClick={() => navigate('/middle/grade/6/patterns-in-mathematics/introduction')}>🌟 Intro</button>
                        <button className="int-intro-nav-link" onClick={() => navigate('/middle/grade/6/patterns-in-mathematics/terminology')}>📖 Terminology</button>
                        <button className="int-intro-nav-link int-intro-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>
                <div style={{ padding: '40px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="int-lexicon-container">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--int-text)', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="int-learn-grid">
                                {/* Side Selector */}
                                <aside className="int-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            className={`int-sidebar-btn ${selectedLearnIdx === ri ? 'active' : ''}`}
                                            style={{
                                                '--skill-color': skill.color,
                                                '--skill-color-15': `${skill.color}15`,
                                                '--skill-color-40': `${skill.color}40`,
                                                '--skill-color-05': `${skill.color}05`
                                            }}
                                        >
                                            <div className="int-sidebar-btn-num">{ri + 1}</div>
                                            <span className="int-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main className="int-details-window-anim int-details-window" key={selectedLearnIdx}>
                                    <div className="int-learn-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--int-muted)' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div style={{ background: `${skill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                                        <div className="int-formula-text" style={{ fontSize: 42, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f} $$`} />
                                        </div>
                                    </div>

                                    <div className="int-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--int-muted)', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--int-text)' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>

                                            <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: '16px', borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--int-muted)' }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--int-teal)' }}>🛡️ Survival Tip: </span>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--int-text)' }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex.includes('$') ? skill.learn.rules[selectedLearnIdx].ex : `$${skill.learn.rules[selectedLearnIdx].ex}$`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div className="int-learn-footer" style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className="int-btn-primary" onClick={() => setView('practice')} style={{ padding: '14px 32px', background: skill.color, fontSize: 15 }}>Mastered this? Try Practice →</button>
                                        <button className="int-btn-secondary" onClick={() => setView('assessment')} style={{ padding: '14px 32px', fontSize: 15 }}>Take Full Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        skill.practiceCategories ? (
                            <CategorizedPracticeEngine
                                skill={skill}
                                onBack={() => setView('list')}
                                prefix="int"
                            />
                        ) : (
                            <QuizEngine
                                questions={skill.practice}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={() => setView('list')}
                                prefix="int"
                                nodeId={skill.nodeId}
                            />
                        )
                    ) : (
                        <AssessmentEngine_6
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="int"
                            nodeId={skill.nodeId}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="int-skills-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            <nav className="int-intro-nav">
                <button className="int-intro-nav-back" onClick={() => navigate('/middle/grade/6/patterns-in-mathematics')}>← Back to Patterns</button>
                <div className="int-intro-nav-links">
                    <button className="int-intro-nav-link" onClick={() => navigate('/middle/grade/6/patterns-in-mathematics/introduction')}>🌟 Intro</button>
                    <button className="int-intro-nav-link" onClick={() => navigate('/middle/grade/6/patterns-in-mathematics/terminology')}>📖 Terminology</button>
                    <button className="int-intro-nav-link int-intro-nav-link--active">🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="int-lexicon-container" style={{ padding: '20px 24px 80px' }}>

                {/* Centered Heading */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--int-text)', margin: '0 0 8px' }}>
                        Patterns <span style={{ background: 'linear-gradient(135deg, var(--int-blue), var(--int-teal))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                    </h1>
                    <p style={{ color: 'var(--int-muted)', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Step up from concepts to mastery with targeted practice.
                    </p>
                </div>

                <div className="int-skills-grid">
                    {SKILLS.map((s, i) => (
                        <div key={s.id} className="int-skill-card" style={{ '--skill-color': s.color }}>
                            <div className="int-skill-icon" style={{ background: `${s.color}10`, color: s.color }}>
                                {s.icon}
                            </div>

                            <div className="int-skill-content">
                                <div className="int-skill-text-stack">
                                    <span style={{ fontSize: 11, fontWeight: 900, color: s.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.subtitle}</span>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: 'var(--int-text)', margin: 0 }}>{s.title}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: 'var(--int-muted)', fontWeight: 500, margin: 0, opacity: 0.85 }}>{s.desc}</p>
                            </div>

                            <div className="int-skill-actions">
                                <button className="int-skill-btn-outline" onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                <button className="int-skill-btn-outline" onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                <button className="int-skill-btn-filled" onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
