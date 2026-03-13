import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../NumberSystem.css';
import MathRenderer from '../../../../MathRenderer';
import QuizEngine from './engines/QuizEngine.jsx';
import AssessmentEngine from './engines/AssessmentEngine.jsx';
import CategorizedPracticeEngine from './engines/CategorizedPracticeEngine.jsx';
import { SKILLS } from './NumberSystemSkillsData';

export default function NumberSystemSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className="ns-page">
                <nav className="ns-nav">
                    <button className="ns-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className="ns-nav-links">
                        <button className="ns-nav-link" onClick={() => navigate('/senior/grade/9/number-system/introduction')}>🌟 Intro</button>
                        <button className="ns-nav-link" onClick={() => navigate('/senior/grade/9/number-system/terminology')}>📖 Terminology</button>
                        <button className="ns-nav-link ns-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>
                <div style={{ padding: '40px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="ns-section">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="ns-learn-grid">
                                {/* Side Selector */}
                                <aside className="ns-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            className={`ns-sidebar-btn ${selectedLearnIdx === ri ? 'active' : ''}`}
                                            style={{
                                                '--skill-color': skill.color
                                            }}
                                        >
                                            <div className="ns-sidebar-btn-num">{ri + 1}</div>
                                            <span className="ns-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main className="ns-details-window ns-details-window-anim" key={selectedLearnIdx}>
                                    <div className="ns-learn-header-row">
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div style={{ background: `${skill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                                        <div style={{ fontSize: 42, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f} $$`} />
                                        </div>
                                    </div>

                                    <div className="ns-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: '#1e293b' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>

                                            <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: '16px', borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#0d9488' }}>🛡️ Pro Tip: </span>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: '#1e293b' }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex.includes('$') ? skill.learn.rules[selectedLearnIdx].ex : `$${skill.learn.rules[selectedLearnIdx].ex}$`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className="ns-btn-primary" onClick={() => setView('practice')} style={{ padding: '14px 32px', background: skill.color, fontSize: 15 }}>Mastered this? Try Practice →</button>
                                        <button className="ns-btn-secondary" onClick={() => setView('assessment')} style={{ padding: '14px 32px', fontSize: 15 }}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        skill.practiceCategories ? (
                            <CategorizedPracticeEngine
                                skill={skill}
                                onBack={() => setView('list')}
                            />
                        ) : (
                            <QuizEngine
                                questions={skill.practice}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={() => setView('list')}
                            />
                        )
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="ns-page">
            <nav className="ns-nav">
                <button className="ns-nav-back" onClick={() => navigate('/senior/grade/9/number-system')}>← Back to Hub</button>
                <div className="ns-nav-links">
                    <button className="ns-nav-link" onClick={() => navigate('/senior/grade/9/number-system/introduction')}>🌟 Intro</button>
                    <button className="ns-nav-link" onClick={() => navigate('/senior/grade/9/number-system/terminology')}>📖 Terminology</button>
                    <button className="ns-nav-link ns-nav-link--active">🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="ns-section" style={{ padding: '20px 24px 80px' }}>

                {/* Centered Heading */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Number System <span className="ns-accent-text">Skills</span>
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        From classification to laws of exponents.
                    </p>
                </div>

                <div className="ns-skills-grid">
                    {SKILLS.map((s, i) => (
                        <div key={s.id} className="ns-skill-card" style={{ '--skill-color': s.color }}>
                            <div className="ns-skill-info">
                                <div className="ns-skill-icon" style={{ background: `${s.color}10`, color: s.color }}>
                                    {s.icon}
                                </div>

                                <div className="ns-skill-content">
                                    <div className="ns-skill-text-stack">
                                        <span style={{ fontSize: 11, fontWeight: 900, color: s.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.subtitle}</span>
                                        <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: 0 }}>{s.title}</h3>
                                    </div>
                                    <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, margin: 0, opacity: 0.85 }}>{s.desc}</p>
                                </div>
                            </div>

                            <div className="ns-skill-actions" style={(!s.learn && !s.practice) ? { justifyContent: 'center' } : {}}>
                                {s.learn && <button className="ns-skill-btn-outline" style={{ '--btn-color': s.color }} onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>}
                                {s.practice && <button className="ns-skill-btn-outline" style={{ '--btn-color': s.color }} onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>}
                                <button className="ns-skill-btn-filled" style={{ '--btn-color': s.color }} onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: 60, padding: 32, borderRadius: 24,
                    background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                    color: '#fff', textAlign: 'center', boxShadow: '0 15px 40px rgba(13,148,136,0.15)'
                }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Chapter Complete?</h3>
                    <p style={{ opacity: 0.9, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>Move on to master the next chapter in your curriculum!</p>
                    <button className="ns-btn-primary" style={{ background: 'white', color: '#0d9488', fontWeight: 800, padding: '12px 32px' }} onClick={() => navigate('/senior/grade/9/number-system')}>Hub Dashboard</button>
                </div>
            </div>
        </div>
    );
}
