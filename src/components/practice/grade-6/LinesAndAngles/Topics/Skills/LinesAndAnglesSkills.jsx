import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../linesAndAngles.module.css';
import '../../../../class-7/Integers/integers.css';
import MathRenderer from '../../../../../MathRenderer';
import QuizEngine from '../../LinesAndAnglesQuizEngine.jsx';
import AssessmentEngine from '../../LinesAndAnglesAssessmentEngine.jsx';
import CategorizedPracticeEngine from '../../LinesAndAnglesCategorizedPracticeEngine.jsx';
import { SKILLS } from './LinesAndAnglesSkillsData.jsx';

export default function LinesAndAnglesSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className={styles['la-page']} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className={styles['la-intro-nav']}>
                    <button className={styles['la-intro-nav-back']} onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className={styles['la-intro-nav-links']}>
                        <button className={styles['la-intro-nav-link']} onClick={() => navigate('/middle/grade/6/lines-and-angles/introduction')}>🌟 Intro</button>
                        <button className={styles['la-intro-nav-link']} onClick={() => navigate('/middle/grade/6/lines-and-angles/terminology')}>📖 Terminology</button>
                        <button className={`${styles['la-intro-nav-link']} ${styles['la-intro-nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>
                <div style={{ padding: '40px 24px 0' }}>
                    {view === 'learn' ? (
                        <div className="la-lexicon-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--la-text)', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="la-learn-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: 20 }}>
                                {/* Side Selector */}
                                <aside className="la-learn-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                display: 'flex', gap: 12, alignItems: 'center', padding: '16px', borderRadius: 16, border: '2px solid',
                                                borderColor: selectedLearnIdx === ri ? skill.color : 'transparent',
                                                background: selectedLearnIdx === ri ? '#fff' : 'rgba(255,255,255,0.6)',
                                                boxShadow: selectedLearnIdx === ri ? '0 8px 24px rgba(0,0,0,0.06)' : 'none',
                                                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                                            }}
                                        >
                                            <div style={{ width: 32, height: 32, borderRadius: 8, background: selectedLearnIdx === ri ? skill.color : `${skill.color}20`, color: selectedLearnIdx === ri ? '#fff' : skill.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, flexShrink: 0 }}>{ri + 1}</div>
                                            <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--la-text)' }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main className="la-details-window" key={selectedLearnIdx} style={{ background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                    <div className="la-learn-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--la-muted)' }}>CONCEPT {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div style={{ background: `${skill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                                        <div className="la-formula-text" style={{ fontSize: 36, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f} $$`} />
                                        </div>
                                    </div>

                                    <div className="la-rule-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--la-muted)', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--la-text)' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>

                                            <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: '16px', borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--la-muted)' }}>
                                                    <span style={{ fontWeight: 800, color: '#10b981' }}>🛡️ Survival Tip: </span>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--la-text)' }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex.includes('$') ? skill.learn.rules[selectedLearnIdx].ex : `$${skill.learn.rules[selectedLearnIdx].ex}$`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div className="la-learn-footer" style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className={styles['la-skill-btn-filled']} onClick={() => setView('practice')} style={{ '--skill-color': skill.color, padding: '14px 32px', fontSize: 16, borderRadius: 100, border: 'none', color: '#fff', background: skill.color, cursor: 'pointer', fontWeight: 700 }}>Mastered this? Try Practice →</button>
                                        <button className={styles['la-skill-btn-outline']} onClick={() => setView('assessment')} style={{ padding: '14px 32px', fontSize: 16, borderRadius: 100, border: '2px solid rgba(0,0,0,0.1)', background: '#fff', cursor: 'pointer', fontWeight: 700 }}>Take Full Assessment</button>
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
                        nodeId={skill.nodeId}
                        sessionType="practice"
                                questions={skill.practice}
                                title={`Practice: ${skill.title}`}
                                color={skill.color}
                                onBack={() => setView('list')}
                                prefix="int"
                            />
                        )
                    ) : (
                        <AssessmentEngine
                        nodeId={skill.nodeId}
                        sessionType="assessment"
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="int"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles['la-page']} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            <nav className={styles['la-intro-nav']}>
                <button className={styles['la-intro-nav-back']} onClick={() => navigate('/middle/grade/6/lines-and-angles')}>← Back to Lines and Angles</button>
                <div className={styles['la-intro-nav-links']}>
                    <button className={styles['la-intro-nav-link']} onClick={() => navigate('/middle/grade/6/lines-and-angles/introduction')}>🌟 Intro</button>
                    <button className={styles['la-intro-nav-link']} onClick={() => navigate('/middle/grade/6/lines-and-angles/terminology')}>📖 Terminology</button>
                    <button className={`${styles['la-intro-nav-link']} ${styles['la-intro-nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="la-lexicon-container" style={{ padding: '20px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>

                {/* Centered Heading */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: 'var(--la-text, #0f172a)', margin: '0 0 8px' }}>
                        Geometry <span style={{ background: 'linear-gradient(135deg, #0369a1, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                    </h1>
                    <p style={{ color: 'var(--la-muted, #64748b)', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Step up from concepts to mastery with targeted practice.
                    </p>
                </div>

                <div className={styles['la-skills-grid']} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {SKILLS.map((s, i) => (
                        <div key={s.id} className={styles['la-skill-card']} style={{ '--skill-color': s.color, display: 'flex', alignItems: 'center', background: '#fff', padding: '24px 32px', borderRadius: 20, gap: 24, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                            <div className={styles['la-skill-icon']} style={{ background: `${s.color}10`, color: s.color, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, fontSize: 26, flexShrink: 0 }}>
                                {s.icon}
                            </div>

                            <div className={styles['la-skill-content']} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className={styles['la-skill-text-stack']} style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }}>
                                    <span style={{ fontSize: 11, fontWeight: 900, color: s.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.subtitle}</span>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: 'var(--la-text, #0f172a)', margin: 0 }}>{s.title}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: 'var(--la-muted, #64748b)', fontWeight: 500, margin: 0, opacity: 0.85 }}>{s.desc}</p>
                            </div>

                            <div className={styles['la-skill-actions']} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                                <button className={styles['la-skill-btn-outline']} style={{ padding: '9px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer', background: '#fff', border: '1.5px solid rgba(0,0,0,0.1)' }} onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                <button className={styles['la-skill-btn-outline']} style={{ padding: '9px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer', background: '#fff', border: '1.5px solid rgba(0,0,0,0.1)' }} onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                <button className={styles['la-skill-btn-filled']} style={{ padding: '10px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer', background: s.color, color: '#fff', border: 'none' }} onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
