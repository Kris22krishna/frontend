import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../algebra.css';
import './AlgebraTestLayout.css';
import MathRenderer from '../../../../MathRenderer';
import QuizEngine from './Engines/QuizEngine';
import AssessmentEngine from './Engines/AssessmentEngine';
import AlgebraCategorizedPracticeEngine from './AlgebraCategorizedPracticeEngine';
import { SKILLS } from './AlgebraSkillsData';
import { NODE_IDS } from '@/lib/curriculumIds';

export default function AlgebraSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);
    const [lawView, setLawView] = useState(null); // null | 'practice' | 'assessment'

    const skillMap = {
        exponents: NODE_IDS.g8MathAlgebraExponents,
        liketerms: NODE_IDS.g8MathAlgebraLikeTerms,
        expressions: NODE_IDS.g8MathAlgebraExpressions,
        solving: NODE_IDS.g8MathAlgebraSolving,
        subject: NODE_IDS.g8MathAlgebraSubject,
        wordproblems: NODE_IDS.g8MathAlgebraWordProblems,
        reallife: NODE_IDS.g8MathAlgebraRealLife
    };

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;
    const nodeId = skill ? skillMap[skill.id] : null;

    const openSkill = (index, nextView) => {
        setActiveSkill(index);
        setSelectedLearnIdx(0);
        setLawView(null);
        setView(nextView);
    };

    // When switching law, reset mini-quiz
    const selectLaw = (idx) => {
        setSelectedLearnIdx(idx);
        setLawView(null);
    };

    if (view !== 'list' && skill) {
        const rule = skill?.learn?.rules?.[selectedLearnIdx];
        const hasLawQuiz = rule?.practice && rule?.assessment;

        return (
            <div className="skills-page alg-skills-stage" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className="intro-nav">
                    <button
                        className="intro-nav-back"
                        onClick={() => {
                            setView('list');
                            setSelectedLearnIdx(0);
                            setLawView(null);
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
                            <div className="alg-skill-learn-header">
                            <h1 style={{ 
                                fontFamily: 'Outfit, sans-serif', 
                                fontSize: 'clamp(1.4rem, 5.5vw, 2.5rem)', 
                                fontWeight: 900, 
                                color: 'var(--alg-text)', 
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
                            }}>
                                Learn: {skill.title}
                            </h1>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'nowrap' }}>
                                    <button 
                                        className="alg-skill-btn-outline" 
                                        onClick={() => setView('practice')}
                                        style={{ whiteSpace: 'nowrap', padding: '10px 20px', fontSize: 13, minWidth: 'fit-content' }}
                                    >
                                        Practice All
                                    </button>
                                    <button 
                                        className="alg-skill-btn-filled" 
                                        style={{ '--skill-color': skill.color, whiteSpace: 'nowrap', padding: '10px 20px', fontSize: 13, minWidth: 'fit-content' }} 
                                        onClick={() => setView('assessment')}
                                    >
                                        Assess All
                                    </button>
                                </div>
                            </div>

                            <div className="alg-learn-grid">
                                <aside className="alg-learn-sidebar" style={{ gap: 10 }}>
                                    {skill.learn.rules.map((rule, idx) => (
                                        <button
                                            key={idx}
                                            className={`alg-sidebar-btn ${selectedLearnIdx === idx ? 'active' : ''}`}
                                            onClick={() => selectLaw(idx)}
                                            style={{ '--skill-color': skill.color, '--skill-color-15': `${skill.color}15`, '--skill-color-40': `${skill.color}40` }}
                                        >
                                            <div className="alg-sidebar-btn-num">{idx + 1}</div>
                                            <div className="alg-sidebar-btn-title">{rule.title}</div>
                                        </button>
                                    ))}
                                </aside>

                                <main className="alg-details-window-anim alg-details-window" key={`${skill.id}-${selectedLearnIdx}-${lawView}`}>
                                    {lawView && hasLawQuiz ? (
                                        <div>
                                            <button
                                                onClick={() => setLawView(null)}
                                                style={{ marginBottom: 20, background: 'none', border: `1px solid ${skill.color}`, color: skill.color, borderRadius: 8, padding: '6px 16px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
                                            >
                                                ← Back to {rule.title}
                                            </button>
                                            {lawView === 'practice' ? (
                                                <QuizEngine
                                                    key={`law-prac-${selectedLearnIdx}`}
                                                    questions={rule.practice}
                                                    title={`Practice: ${rule.title}`}
                                                    color={skill.color}
                                                    onBack={() => setLawView(null)}
                                                    prefix="algtest"
                                                    nodeId={nodeId}
                                                />
                                            ) : (
                                                <AssessmentEngine
                                                    key={`law-ass-${selectedLearnIdx}`}
                                                    questions={rule.assessment}
                                                    title={`Assess: ${rule.title}`}
                                                    color={skill.color}
                                                    onBack={() => setLawView(null)}
                                                    prefix="algtest"
                                                    nodeId={nodeId}
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="alg-law-header">
                                                <h3 style={{ 
                                                    margin: 0, 
                                                    fontSize: 'clamp(20px, 6vw, 28px)', 
                                                    fontWeight: 900, 
                                                    color: skill.color
                                                }}>
                                                    {rule.title} 
                                                </h3>
                                                {hasLawQuiz && (
                                                    <div style={{ display: 'flex', gap: 10, flexWrap: 'nowrap', flexShrink: 0 }}>
                                                        <button
                                                            onClick={() => setLawView('practice')}
                                                            style={{
                                                                padding: '10px 20px', borderRadius: 100, fontWeight: 800, fontSize: 13,
                                                                background: `${skill.color}12`, color: skill.color,
                                                                border: `1.5px solid ${skill.color}30`, cursor: 'pointer',
                                                                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                                                                flexShrink: 0
                                                            }}
                                                        >
                                                            Practice Law
                                                        </button>
                                                        <button
                                                            onClick={() => setLawView('assessment')}
                                                            style={{
                                                                padding: '10px 20px', borderRadius: 100, fontWeight: 800, fontSize: 13,
                                                                background: '#f8fafc', color: '#475569',
                                                                border: '1.5px solid #e2e8f0', cursor: 'pointer',
                                                                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                                                                flexShrink: 0
                                                            }}
                                                        >
                                                            Assess Law
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--alg-muted)', marginBottom: 24, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8 }}>
                                                RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}
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
                                                    padding: '24px 16px',
                                                    borderRadius: 20,
                                                    border: `2px solid ${skill.color}15`,
                                                    marginBottom: 32,
                                                    textAlign: 'center',
                                                    overflowX: 'auto'
                                                }}
                                            >
                                                <div className="formula-text" style={{ fontSize: 'clamp(28px, 8vw, 42px)', fontWeight: 800, color: skill.color }}>
                                                    <MathRenderer text={`$$${rule.f}$$`} />
                                                </div>
                                            </div>

                                            <div className="alg-rule-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                                                <div>
                                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--alg-muted)', marginBottom: 10 }}>
                                                        Explanation
                                                    </h4>
                                                    <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--alg-text)' }}>
                                                        <MathRenderer text={rule.d} />
                                                    </p>

                                                    <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--alg-muted)' }}>
                                                            <span style={{ fontWeight: 800, color: 'var(--alg-teal)' }}>Tip: </span>
                                                            <MathRenderer text={rule.tip} />
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
                                                                text={rule.ex.includes('$')
                                                                    ? rule.ex
                                                                    : `$${rule.ex}$`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div 
                                                className="alg-learn-footer" 
                                                style={{ 
                                                    marginTop: 48, 
                                                    display: 'flex', 
                                                    justifyContent: 'space-between', 
                                                    alignItems: 'center', 
                                                    flexWrap: 'wrap', 
                                                    gap: 16,
                                                    paddingTop: 32,
                                                    borderTop: '1px solid #eef2f6'
                                                }}
                                            >
                                               <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                                   {hasLawQuiz && (
                                                       <>
                                                           <button
                                                               onClick={() => setLawView('practice')}
                                                               className="alg-skill-btn-outline"
                                                               style={{ padding: '10px 24px', fontSize: 14 }}
                                                           >
                                                               Practice Law
                                                           </button>
                                                           <button
                                                               onClick={() => setLawView('assessment')}
                                                               className="alg-skill-btn-outline"
                                                               style={{ padding: '10px 24px', fontSize: 14 }}
                                                           >
                                                               Assess Law
                                                           </button>
                                                       </>
                                                   )} 
                                               </div>
                                               
                                               <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
                                                   {selectedLearnIdx > 0 && (
                                                        <button
                                                            onClick={() => setSelectedLearnIdx(selectedLearnIdx - 1)}
                                                            style={{
                                                                padding: '10px 24px', borderRadius: 12, fontWeight: 800, fontSize: 14,
                                                                background: '#fff', color: '#475569',
                                                                border: '1.5px solid #e2e8f0', cursor: 'pointer',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            ← Prev
                                                        </button>
                                                    )}
                                                    {selectedLearnIdx < skill.learn.rules.length - 1 && (
                                                        <button
                                                            onClick={() => setSelectedLearnIdx(selectedLearnIdx + 1)}
                                                            style={{
                                                                padding: '10px 24px', borderRadius: 12, fontWeight: 800, fontSize: 14,
                                                                background: skill.color,
                                                                color: '#fff',
                                                                border: 'none', cursor: 'pointer',
                                                                transition: 'all 0.2s ease',
                                                                boxShadow: `0 4px 12px ${skill.color}30`
                                                            }}
                                                        >
                                                            Next →
                                                        </button>
                                                    )}
                                               </div>
                                            </div>
                                        </>
                                    )}
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        skill.practiceCategories ? (
                            <AlgebraCategorizedPracticeEngine
                                skill={skill}
                                onBack={() => setView('list')}
                                nodeId={nodeId}
                            />
                        ) : (
                            <QuizEngine
                                questions={skill.practice}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={() => setView('list')}
                                prefix="algtest"
                                nodeId={nodeId}
                            />
                        )
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="algtest"
                            nodeId={nodeId}
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
