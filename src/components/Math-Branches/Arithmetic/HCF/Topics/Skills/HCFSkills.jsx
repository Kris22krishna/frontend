import React, { useState, useEffect } from 'react';
import '../../../../Calculus/calculus.css';
import { useNavigate } from 'react-router-dom';
import styles from '../../../arithmetic.module.css';
import MathRenderer from '../../../../../MathRenderer';
import QuizEngine from '../../../../Algebra/Topics/Skills/Engines/QuizEngine';
import AssessmentEngine from '../../../../Algebra/Topics/Skills/Engines/AssessmentEngine';
import SkillSparkEmbed from '../../../../../common/SkillSparkEmbed';
import { SKILLS } from './HCFSkillsData';

export default function HCFSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view, activeSkill]);

    const openSkill = (index, nextView) => {
        setActiveSkill(index);
        setView(nextView);
    };

    if (view !== 'list' && skill) {
        return (
            <div className={styles.arithPage}>
                <nav className={styles.introNav}>
                    <button
                        className={styles.arithBackBtn}
                        onClick={() => setView('list')}
                    >
                        ← Back to Skills
                    </button>
                    <div className={styles.arithIntroNavLinks}>
                        <button className={styles.arithIntroNavLink} onClick={() => navigate('/arithmetic/hcf/introduction')}>🌟 Introduction</button>
                        <button className={styles.arithIntroNavLink} onClick={() => navigate('/arithmetic/hcf/terminology')}>📖 Terminology</button>
                        <button className={`${styles.arithIntroNavLink} ${styles.arithIntroNavLinkActive}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
                    {view === 'learn' ? (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div
                                    style={{
                                        width: 56, height: 56, borderRadius: 16,
                                        background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
                                    }}
                                >
                                    {skill.icon}
                                </div>
                                <h1 style={{ fontFamily: '"Outfit", sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div style={{ fontSize: 16, lineHeight: 1.65, color: '#475569', marginBottom: 32, textAlign: 'center', maxWidth: 800, margin: '0 auto 40px' }}>
                                <MathRenderer text={skill.learn.concept} />
                            </div>

                            {skill.learn.spark && (
                                <div style={{ marginBottom: 40, width: '100%' }}>
                                    <SkillSparkEmbed spark={skill.learn.spark} mini={true} height={450} />
                                </div>
                            )}

                            <div style={{ display: 'grid', gap: 24 }}>
                                {skill.learn.rules && skill.learn.rules.map((rule, idx) => (
                                    <div key={idx} style={{ background: '#fff', borderRadius: 24, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 12, background: skill.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, flexShrink: 0 }}>
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#1e293b' }}>{rule.title}</h3>
                                                <MathRenderer text={`$$${rule.f}$$`} />
                                            </div>
                                        </div>
                                        
                                        <div style={{ padding: 20, background: '#f8fafc', borderRadius: 16, marginBottom: 16 }}>
                                            <p style={{ margin: 0, fontSize: 16, color: '#475569', lineHeight: 1.6 }}>
                                                <MathRenderer text={rule.d} />
                                            </p>
                                        </div>

                                        <div style={{ padding: 20, background: '#fff', border: '1px solid #f1f5f9', borderRadius: 16, marginBottom: rule.tip ? 16 : 0 }}>
                                            <strong style={{ display: 'block', marginBottom: 8, color: '#94a3b8', textTransform: 'uppercase', fontSize: 12, letterSpacing: 1 }}>Example</strong>
                                            <div style={{ fontSize: 16, color: '#1e293b', fontWeight: 600 }}>
                                                <MathRenderer text={rule.ex} />
                                            </div>
                                        </div>

                                        {rule.tip && (
                                            <div style={{ padding: 16, background: `${skill.color}10`, borderRadius: 16, border: `1px solid ${skill.color}20`, display: 'flex', gap: 12 }}>
                                                <div style={{ fontSize: 20 }}>💡</div>
                                                <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.5 }}>
                                                    <MathRenderer text={rule.tip} />
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <QuizEngine
                            questions={skill.practice || []}
                            title={`Practice: ${skill.title}`}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="calc"
                        />
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment || []}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="calc"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="skills-page calc-skills-stage" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/arithmetic/hcf')}>← Back to Branch</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/arithmetic/hcf/introduction')}>Intro</button>
                    <button className="intro-nav-link" onClick={() => navigate('/arithmetic/hcf/terminology')}>Terminology</button>
                    <button className="intro-nav-link intro-nav-link--active">Skills</button>
                </div>
            </nav>

            <div className="calc-lexicon-container calc-skills-stage-body calc-skills-stage-body--list">
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--calc-text)', margin: '0 0 8px' }}>
                        HCF <span style={{ background: 'linear-gradient(135deg, var(--calc-blue), var(--calc-teal))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                    </h1>
                    <p style={{ color: 'var(--calc-muted)', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Step up from concepts to mastery with targeted practice.
                    </p>
                </div>

                <div className="calc-skills-grid">
                    {SKILLS.map((item, index) => (
                        <div key={item.id} className="calc-skill-card" style={{ '--skill-color': item.color, '--skill-color-30': `${item.color}30`, '--skill-color-40': `${item.color}40` }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                width: '100%',
                            }}>
                                <div className="calc-skill-icon" style={{ background: `${item.color}10`, color: item.color, flexShrink: 0 }}>
                                    {item.icon}
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <span style={{ fontSize: 11, fontWeight: 900, color: item.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{item.subtitle || `SKILL ${index + 1}`}</span>
                                    <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--calc-text)', margin: '2px 0 4px' }}>{item.title}</h3>
                                    <p style={{ fontSize: 14, color: 'var(--calc-muted)', fontWeight: 500, margin: 0, opacity: 0.85 }}>{item.desc}</p>
                                </div>

                                <div style={{ display: 'flex', gap: 10, flexShrink: 0, alignItems: 'center', marginLeft: 'auto' }}>
                                    <button className="calc-skill-btn-outline" onClick={() => openSkill(index, 'learn')}>Learn</button>
                                    <button className="calc-skill-btn-outline" onClick={() => openSkill(index, 'practice')}>Practice</button>
                                    <button className="calc-skill-btn-filled" style={{ '--skill-color': item.color }} onClick={() => openSkill(index, 'assessment')}>Assess</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
