import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../primeTime6.module.css';
import MathRenderer from '../../../../../MathRenderer';
import QuizEngine from '../../PrimeTime6QuizEngine.jsx';
import AssessmentEngine from '../../PrimeTime6AssessmentEngine.jsx';
import { SKILLS } from './PrimeTime6SkillsData.jsx';

export default function PrimeTime6Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className={styles['pt-page']} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                <nav className={styles['pt-intro-nav']}>
                    <button className={styles['pt-intro-nav-back']} onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className={styles['pt-intro-nav-links']}>
                        <button className={styles['pt-intro-nav-link']} onClick={() => navigate('/middle/grade/6/prime-time/introduction')}>🌟 Intro</button>
                        <button className={styles['pt-intro-nav-link']} onClick={() => navigate('/middle/grade/6/prime-time/terminology')}>📖 Terminology</button>
                        <button className={`${styles['pt-intro-nav-link']} ${styles['pt-intro-nav-link--active']}`}>🎯 Skills</button>
                    </div>
                </nav>
                <div style={{ padding: '40px 24px 0' }}>
                    {view === 'learn' ? (
                        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: 20 }}>
                                {/* Side Selector */}
                                <aside style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                                            <span style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main key={selectedLearnIdx} style={{ background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: '#64748b' }}>CONCEPT {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div style={{ background: `${skill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                                        {skill.learn.rules[selectedLearnIdx].img ? (
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                {skill.learn.rules[selectedLearnIdx].img}
                                            </div>
                                        ) : (
                                            <div style={{ fontSize: 36, fontWeight: 800, color: skill.color }}>
                                                <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f} $$`} />
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: '#0f172a' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>

                                            <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: '16px', borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#10b981' }}>🛡️ Survival Tip: </span>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button onClick={() => setView('practice')} style={{ padding: '14px 32px', fontSize: 16, borderRadius: 100, border: 'none', color: '#fff', background: skill.color, cursor: 'pointer', fontWeight: 700 }}>Mastered this? Try Practice →</button>
                                        <button onClick={() => setView('assessment')} style={{ padding: '14px 32px', fontSize: 16, borderRadius: 100, border: '2px solid rgba(0,0,0,0.1)', background: '#fff', cursor: 'pointer', fontWeight: 700 }}>Take Full Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <QuizEngine
                        nodeId={skill.nodeId}
                        sessionType="practice"
                            questions={skill.practice}
                            title={`Practice: ${skill.title}`}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="pt"
                        />
                    ) : (
                        <AssessmentEngine
                        nodeId={skill.nodeId}
                        sessionType="assessment"
                            questions={skill.assessment}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="pt"
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles['pt-page']} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
            <nav className={styles['pt-intro-nav']}>
                <button className={styles['pt-intro-nav-back']} onClick={() => navigate('/middle/grade/6/prime-time')}>← Back to Prime Time Dashboard</button>
                <div className={styles['pt-intro-nav-links']}>
                    <button className={styles['pt-intro-nav-link']} onClick={() => navigate('/middle/grade/6/prime-time/introduction')}>🌟 Intro</button>
                    <button className={styles['pt-intro-nav-link']} onClick={() => navigate('/middle/grade/6/prime-time/terminology')}>📖 Terminology</button>
                    <button className={`${styles['pt-intro-nav-link']} ${styles['pt-intro-nav-link--active']}`}>🎯 Skills</button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div style={{ padding: '20px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>

                {/* Centered Heading */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Prime Time <span style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Step up from concepts to mastery with targeted practice.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {SKILLS.map((s, i) => (
                        <div key={s.id} style={{ '--skill-color': s.color, display: 'flex', alignItems: 'center', background: '#fff', padding: '24px 32px', borderRadius: 20, gap: 24, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }}>
                            <div style={{ background: `${s.color}10`, color: s.color, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, fontSize: 26, flexShrink: 0 }}>
                                {s.icon}
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 4 }}>
                                    <span style={{ fontSize: 11, fontWeight: 900, color: s.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>{s.subtitle}</span>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: 0 }}>{s.title}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, margin: 0, opacity: 0.85 }}>{s.desc}</p>
                            </div>

                            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                                <button style={{ padding: '9px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer', background: '#fff', border: '1.5px solid rgba(0,0,0,0.1)', color: '#0f172a' }} onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                <button style={{ padding: '9px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer', background: '#fff', border: '1.5px solid rgba(0,0,0,0.1)', color: '#0f172a' }} onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                <button style={{ padding: '10px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer', background: s.color, color: '#fff', border: 'none' }} onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
