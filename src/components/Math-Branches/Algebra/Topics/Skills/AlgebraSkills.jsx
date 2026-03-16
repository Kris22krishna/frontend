import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../algebra.css';
import './AlgebraTestLayout.css';
import MathRenderer from '../../../../MathRenderer';
import QuizEngine from './Engines/QuizEngine';
import AssessmentEngine from './Engines/AssessmentEngine';
import AlgebraCategorizedPracticeEngine from './AlgebraCategorizedPracticeEngine';
import { SKILLS } from './AlgebraSkillsData';

export default function AlgebraSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    const openSkill = (index, nextView) => {
        setActiveSkill(index);
        setSelectedLearnIdx(0);
        setView(nextView);
    };

    if (view !== 'list' && skill) {
        return (
            <div className="skills-page alg-skills-stage" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className="intro-nav">
                    <button
                        className="intro-nav-back"
                        onClick={() => {
                            setView('list');
                            setSelectedLearnIdx(0);
                        }}
                    >
                        Back to Skills
                    </button>
                    <div className="intro-nav-links">
                        <button className="intro-nav-link" onClick={() => navigate('/algebra/introduction')}>Intro</button>
                        <button className="intro-nav-link" onClick={() => navigate('/algebra/terminology')}>Terminology</button>
                        <button className="intro-nav-link intro-nav-link--active">Skills</button>
                    </div>
                </nav>

                <div className="alg-skills-stage-body">
                    {view === 'learn' ? (
                        <div className="alg-lexicon-container">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        background: `${skill.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 22
                                    }}
                                >
                                    {skill.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--alg-text)', margin: 0 }}>
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div className="alg-learn-grid">
                                <aside className="alg-learn-sidebar">
                                    {skill.learn.rules.map((rule, index) => (
                                        <button
                                            key={rule.title}
                                            onClick={() => setSelectedLearnIdx(index)}
                                            className={`alg-sidebar-btn ${selectedLearnIdx === index ? 'active' : ''}`}
                                            style={{
                                                '--skill-color': skill.color,
                                                '--skill-color-15': `${skill.color}15`,
                                                '--skill-color-40': `${skill.color}40`,
                                                '--skill-color-05': `${skill.color}05`
                                            }}
                                        >
                                            <div className="alg-sidebar-btn-num">{index + 1}</div>
                                            <span className="alg-sidebar-btn-title">{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                <main className="alg-details-window-anim alg-details-window" key={`${skill.id}-${selectedLearnIdx}`}>
                                    <div className="alg-learn-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>
                                                {skill.learn.rules[selectedLearnIdx].title}
                                            </h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--alg-muted)' }}>
                                                RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    <div
                                        style={{
                                            marginBottom: 24,
                                            padding: '18px 20px',
                                            borderRadius: 18,
                                            background: 'linear-gradient(180deg, rgba(248,250,252,0.98), rgba(241,245,249,0.9))',
                                            border: '1px solid rgba(148,163,184,0.16)'
                                        }}
                                    >
                                        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', color: skill.color, marginBottom: 8 }}>
                                            Big Idea
                                        </div>
                                        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: 'var(--alg-text)' }}>
                                            <MathRenderer text={skill.learn.concept} />
                                        </p>
                                    </div>

                                    <div
                                        style={{
                                            background: `${skill.color}05`,
                                            padding: 24,
                                            borderRadius: 20,
                                            border: `2px solid ${skill.color}15`,
                                            marginBottom: 32,
                                            textAlign: 'center'
                                        }}
                                    >
                                        <div className="formula-text" style={{ fontSize: 42, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div className="alg-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--alg-muted)', marginBottom: 10 }}>
                                                Explanation
                                            </h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--alg-text)' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>

                                            <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--alg-muted)' }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--alg-teal)' }}>Tip: </span>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>
                                                Practical Example
                                            </h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--alg-text)' }}>
                                                    <MathRenderer
                                                        text={skill.learn.rules[selectedLearnIdx].ex.includes('$')
                                                            ? skill.learn.rules[selectedLearnIdx].ex
                                                            : `$${skill.learn.rules[selectedLearnIdx].ex}$`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="alg-learn-footer" style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className="alg-skill-btn-filled" style={{ '--skill-color': skill.color }} onClick={() => setView('practice')}>
                                            Practice
                                        </button>
                                        <button className="alg-skill-btn-outline" onClick={() => setView('assessment')}>
                                            Assess
                                        </button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        skill.practiceCategories ? (
                            <AlgebraCategorizedPracticeEngine
                                skill={skill}
                                onBack={() => setView('list')}
                            />
                        ) : (
                            <QuizEngine
                                questions={skill.practice}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={() => setView('list')}
                                prefix="algtest"
                            />
                        )
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="algtest"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="skills-page alg-skills-stage" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/algebra')}>Back to Algebra</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/algebra/introduction')}>Intro</button>
                    <button className="intro-nav-link" onClick={() => navigate('/algebra/terminology')}>Terminology</button>
                    <button className="intro-nav-link intro-nav-link--active">Skills</button>
                </div>
            </nav>

            <div className="alg-lexicon-container alg-skills-stage-body alg-skills-stage-body--list">
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--alg-text)', margin: '0 0 8px' }}>
                        Algebra <span style={{ background: 'linear-gradient(135deg, var(--alg-blue), var(--alg-teal))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                    </h1>
                    <p style={{ color: 'var(--alg-muted)', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Step up from concepts to mastery with targeted practice.
                    </p>
                </div>

                <div className="alg-skills-grid">
                    {SKILLS.map((item, index) => (
                        <div key={item.id} className="alg-skill-card" style={{ '--skill-color': item.color, '--skill-color-30': `${item.color}30`, '--skill-color-40': `${item.color}40` }}>
                            <div className="alg-skill-icon" style={{ background: `${item.color}10`, color: item.color }}>
                                {item.icon}
                            </div>

                            <div className="alg-skill-content">
                                <div className="alg-skill-text-stack">
                                    <span style={{ fontSize: 11, fontWeight: 900, color: item.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{item.subtitle}</span>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: 'var(--alg-text)', margin: 0 }}>{item.title}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: 'var(--alg-muted)', fontWeight: 500, margin: 0, opacity: 0.85 }}>{item.desc}</p>
                            </div>

                            <div className="alg-skill-actions">
                                <button className="alg-skill-btn-outline" onClick={() => openSkill(index, 'learn')}>Learn</button>
                                <button className="alg-skill-btn-outline" onClick={() => openSkill(index, 'practice')}>Practice</button>
                                <button className="alg-skill-btn-filled" style={{ '--skill-color': item.color }} onClick={() => openSkill(index, 'assessment')}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        marginTop: 60,
                        padding: 32,
                        borderRadius: 24,
                        background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                        color: '#fff',
                        textAlign: 'center',
                        boxShadow: '0 15px 40px rgba(13,148,136,0.15)'
                    }}
                >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>Algebra</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready for More?</h3>
                    <p style={{ opacity: 0.9, maxWidth: 500, margin: '0 auto 24px' }}>
                        Continue practicing to unlock advanced topics and master the world of Algebra.
                    </p>
                    <button
                        className="alg-skill-btn-outline"
                        style={{ background: '#fff', color: 'var(--alg-teal)', fontWeight: 800, borderColor: '#fff' }}
                        onClick={() => navigate('/algebra')}
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
