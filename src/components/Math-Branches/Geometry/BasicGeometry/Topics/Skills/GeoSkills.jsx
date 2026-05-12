import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../geometry.module.css';
import MathRenderer from '../../../../../MathRenderer';
import QuizEngine from '../../../../../Math-Branches/Calculus/Engines/QuizEngine';
import AssessmentEngine from '../../../../../Math-Branches/Calculus/Engines/AssessmentEngine';
import '../../../../../Math-Branches/Calculus/calculus.css';
import { SKILLS } from './GeoSkillsData';
import { GEO_SKILL_DIAGRAMS } from '../../../SkillDiagrams';

export default function GeoSkills() {
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

    /* ── Active skill view (learn / practice / assess) ── */
    if (view !== 'list' && skill) {
        return (
            <div className={styles.page} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 60 }}>
                <nav className={styles.introNav}>
                    <button
                        className={styles.backBtn}
                        onClick={() => { setView('list'); setSelectedLearnIdx(0); }}
                    >
                        ← Back to Skills
                    </button>
                    <div className={styles.introNavLinks}>
                        <button className={styles.introNavLink} onClick={() => navigate('/geometry/basic-geometry/introduction')}>🌟 Introduction</button>
                        <button className={styles.introNavLink} onClick={() => navigate('/geometry/basic-geometry/terminology')}>📖 Terminology</button>
                        <button className={`${styles.introNavLink} ${styles.introNavLinkActive}`}>🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
                    {view === 'learn' ? (
                        <div className={styles.lexiconContainer}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                                    {skill.icon}
                                </div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                    Learn: {skill.title}
                                </h1>
                            </div>

                            <div className={styles.learnGrid}>
                                <aside style={{
                                    background: 'rgba(255,255,255,0.7)', padding: 14, borderRadius: 20,
                                    border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 8,
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    {skill.learn.rules.map((rule, index) => {
                                        const isActive = selectedLearnIdx === index;
                                        return (
                                            <button
                                                key={rule.title}
                                                onClick={() => setSelectedLearnIdx(index)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 10,
                                                    padding: '12px 14px', borderRadius: 12,
                                                    border: `1.5px solid ${isActive ? skill.color : 'rgba(0,0,0,0.06)'}`,
                                                    background: isActive
                                                        ? `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)`
                                                        : `linear-gradient(135deg, ${skill.color}08, ${skill.color}03)`,
                                                    cursor: 'pointer', textAlign: 'left',
                                                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    fontFamily: 'Outfit, sans-serif',
                                                    transform: isActive ? 'translateY(-1px)' : 'none',
                                                    boxShadow: isActive ? '0 8px 20px rgba(0,0,0,0.1)' : 'none'
                                                }}
                                            >
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 10,
                                                    background: isActive ? 'rgba(255,255,255,0.25)' : '#fff',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: 14, fontWeight: 900,
                                                    color: isActive ? '#fff' : skill.color,
                                                    flexShrink: 0
                                                }}>
                                                    {index + 1}
                                                </div>
                                                <span style={{
                                                    fontWeight: 700, fontSize: 14,
                                                    color: isActive ? '#fff' : '#0f172a',
                                                    lineHeight: 1.3
                                                }}>
                                                    {rule.title}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </aside>

                                <main key={`${skill.id}-${selectedLearnIdx}`} style={{
                                    background: '#ffffff', borderRadius: 20, padding: '20px 28px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                                    border: `2px solid ${skill.color}15`, minHeight: 330,
                                    minWidth: 0,
                                    animation: 'geoSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}>
                                    <style>{`
                                        @keyframes geoSlideIn {
                                            from { opacity: 0; transform: translateX(20px); }
                                            to { opacity: 1; transform: translateX(0); }
                                        }
                                    `}</style>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>
                                                {skill.learn.rules[selectedLearnIdx].title}
                                            </h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: '#64748b' }}>
                                                RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    <div style={{
                                        marginBottom: 24, padding: '18px 20px', borderRadius: 18,
                                        background: 'linear-gradient(180deg, rgba(248,250,252,0.98), rgba(241,245,249,0.9))',
                                        border: '1px solid rgba(148,163,184,0.16)'
                                    }}>
                                        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', color: skill.color, marginBottom: 8 }}>
                                            Big Idea
                                        </div>
                                        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#0f172a' }}>
                                            <MathRenderer text={skill.learn.concept} />
                                        </p>
                                    </div>

                                    <div style={{
                                        background: `${skill.color}05`, padding: '18px 24px', borderRadius: 20,
                                        border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: 24, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div className={styles.learnContentGrid}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>
                                                Explanation
                                            </h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: '#0f172a' }}>
                                                <MathRenderer text={skill.learn.rules[selectedLearnIdx].d} />
                                            </p>

                                            <div style={{ marginTop: 24, background: 'rgba(139,92,246,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(139,92,246,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#64748b' }}>
                                                    <span style={{ fontWeight: 800, color: '#8b5cf6' }}>Tip: </span>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].tip} />
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            {GEO_SKILL_DIAGRAMS[skill.id]?.[selectedLearnIdx] && (
                                                <div style={{ marginBottom: 16 }}>
                                                    <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Visual</h4>
                                                    <div style={{ background: '#f8fafc', borderRadius: 16, border: `1px solid ${skill.color}20`, padding: '10px 8px', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}
                                                        dangerouslySetInnerHTML={{ __html: GEO_SKILL_DIAGRAMS[skill.id][selectedLearnIdx] }} />
                                                </div>
                                            )}
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>
                                                Practical Example
                                            </h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)', overflowX: 'auto' }}>
                                                <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                                                    <MathRenderer
                                                        text={skill.learn.rules[selectedLearnIdx].ex.includes('$')
                                                            ? skill.learn.rules[selectedLearnIdx].ex
                                                            : `$${skill.learn.rules[selectedLearnIdx].ex}$`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button
                                            className={styles.skillBtnFilled}
                                            style={{ background: skill.color }}
                                            onClick={() => setView('practice')}
                                        >
                                            Practice
                                        </button>
                                        <button className={styles.skillBtnOutline} onClick={() => setView('assessment')}>
                                            Assess
                                        </button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <QuizEngine
                            questions={skill.practice}
                            title={`Practice: ${skill.title}`}
                            color={skill.color}
                            onBack={() => setView('list')}
                            prefix="calc"
                        />
                    ) : (
                        <AssessmentEngine
                            questions={skill.assessment}
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

    /* ── Skills list view ── */
    return (
        <div className={styles.page} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 60 }}>
            <nav className={styles.introNav}>
                <button className={styles.backBtn} onClick={() => navigate('/geometry/basic-geometry')} style={{ marginBottom: 0 }}>
                    ← Back to Basic Geometry
                </button>
                <div className={styles.introNavLinks}>
                    <button className={styles.introNavLink} onClick={() => navigate('/geometry/basic-geometry/introduction')}>🌟 Introduction</button>
                    <button className={styles.introNavLink} onClick={() => navigate('/geometry/basic-geometry/terminology')}>📖 Terminology</button>
                    <button className={`${styles.introNavLink} ${styles.introNavLinkActive}`}>🎯 Skills</button>
                </div>
            </nav>

            <div className={styles.lexiconContainer} style={{ maxWidth: 1100, margin: '40px auto 20px', padding: '0 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Geometry{' '}
                        <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Skills
                        </span>
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Master angles, triangles, and polygons with targeted practice.
                    </p>
                </div>

                <div className={styles.skillsGrid}>
                    {SKILLS.map((item, index) => (
                        <div key={item.id} className={styles.skillCard} style={{ borderLeft: `4px solid ${item.color}` }}>
                            <div className={styles.skillIcon} style={{ background: `${item.color}10`, color: item.color, cursor: 'pointer' }} onClick={() => openSkill(index, 'learn')}>
                                {item.icon}
                            </div>

                            <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => openSkill(index, 'learn')}>
                                <span style={{ fontSize: 11, fontWeight: 900, color: item.color, textTransform: 'uppercase', letterSpacing: 1.2 }}>
                                    {item.subtitle || `SKILL ${index + 1}`}
                                </span>
                                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', margin: '2px 0 4px' }}>{item.title}</h3>
                                <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, margin: 0, opacity: 0.85 }}>{item.desc}</p>
                            </div>

                            <div className={styles.skillActions}>
                                <button className={styles.skillBtnOutline} onClick={() => openSkill(index, 'learn')}>Learn</button>
                                <button className={styles.skillBtnOutline} onClick={() => openSkill(index, 'practice')}>Practice</button>
                                <button className={styles.skillBtnFilled} style={{ background: item.color }} onClick={() => openSkill(index, 'assessment')}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: 60, padding: 32, borderRadius: 24,
                    background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    color: '#fff', textAlign: 'center',
                    boxShadow: '0 15px 40px rgba(14,165,233,0.15)'
                }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📐</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready for More?</h3>
                    <p style={{ opacity: 0.9, maxWidth: 500, margin: '0 auto 24px' }}>
                        Geometry builds on itself. Once you master basic shapes, explore coordinate geometry and transformations next!
                    </p>
                    <button
                        className={styles.skillBtnOutline}
                        style={{ background: '#fff', color: '#0ea5e9', fontWeight: 800, borderColor: '#fff' }}
                        onClick={() => navigate('/geometry')}
                    >
                        Explore More Topics →
                    </button>
                </div>
            </div>
        </div>
    );
}
