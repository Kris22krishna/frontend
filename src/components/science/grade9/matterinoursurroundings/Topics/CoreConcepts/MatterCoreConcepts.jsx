import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MATTER_CORE_CONCEPTS } from './MatterCoreConceptsData';
import styles from '../../MatterInOurSurroundingsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';

import QuizEngine from '../../Engines/MatterQuizEngine';
import AssessmentEngine from '../../Engines/MatterAssessmentEngine';
import '../../Engines/MatterTestLayout.css';

/* ── Main Component ─────────────────────────────────────────────── */
export default function MatterCoreConcepts() {
    const navigate = useNavigate();
    const [activeSkillIdx, setActiveSkillIdx] = useState(null);
    const [view, setView] = useState('list'); // 'list' | 'learn' | 'practice' | 'assess'
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, [view, activeSkillIdx]);

    const skill = activeSkillIdx !== null ? MATTER_CORE_CONCEPTS[activeSkillIdx] : null;

    const openSkill = (idx, nextView) => {
        setActiveSkillIdx(idx);
        setSelectedRuleIdx(0);
        setView(nextView);
    };

    const NAV = (
        <nav className={styles['matter-nav']}>
            <button className={styles['matter-nav-back']} onClick={() => {
                if (view === 'practice' || view === 'assess') setView('learn');
                else if (view === 'learn') { setView('list'); setActiveSkillIdx(null); }
                else navigate('/senior/grade/9/science/matter-in-our-surroundings');
            }}>
                {view === 'practice' || view === 'assess' ? '← Back to Learn' :
                 view === 'learn' ? '← Back to Concepts' : '← Back to Dashboard'}
            </button>
            <div className={styles['matter-nav-links']}>
                <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/introduction')}>🌟 Intro</button>
                <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/terminology')}>📖 Terminology</button>
                <button className={`${styles['matter-nav-link']} ${styles['active']}`} onClick={() => { setView('list'); setActiveSkillIdx(null); }}>🎯 Core Concepts</button>
                <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/connectomics')}>🔗 Connectomics</button>
                <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/exam-edge')}>🏆 Exam Edge</button>
                <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/virtual-lab')}>🧪 Virtual Lab</button>
            </div>
        </nav>
    );

    /* ── LIST VIEW ─────────────────────────────────────────────── */
    if (view === 'list') {
        return (
            <div className={styles['matter-page']}>
                {NAV}
                <div className={styles['matter-hero']}>
                    <h1 className={styles['matter-hero-title']}>Core <span style={{ color: '#0ea5e9' }}>Concepts</span></h1>
                    <p className={styles['matter-hero-sub']}>Master the physical nature of matter — the foundation of Grade 9 Chemistry.</p>
                </div>

                <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 24px 60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 600, maxWidth: 600, margin: '0 auto' }}>
                            Each concept has a dedicated <strong>Learn</strong>, <strong>Practice</strong>, and <strong>Assess</strong> section to build your mastery.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {MATTER_CORE_CONCEPTS.map((concept, idx) => (
                            <div key={concept.id}
                                className={styles['matter-concept-card']}
                                style={{ '--skill-color': concept.color, '--skill-color-15': concept.color + '15', '--skill-color-40': concept.color + '40' }}>
                                
                                <div className={styles['matter-concept-header']}>
                                    <div className={styles['matter-concept-icon']}>{concept.icon}</div>

                                    <div className={styles['matter-concept-info']}>
                                        <div style={{ fontSize: 11, fontWeight: 900, color: concept.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                                            Core Concept {concept.id}
                                        </div>
                                        <h3>{concept.title}</h3>
                                        <p>{concept.desc}</p>
                                    </div>
                                </div>

                                <div className={styles['matter-concept-actions']}>
                                    <button onClick={() => openSkill(idx, 'learn')} className={styles['matter-concept-btn']}>
                                        Learn
                                    </button>
                                    <button onClick={() => openSkill(idx, 'practice')} className={styles['matter-concept-btn']}>
                                        Practice
                                    </button>
                                    <button onClick={() => openSkill(idx, 'assess')} className={`${styles['matter-concept-btn']} ${styles['assess']}`}>
                                        Assess
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 60, padding: 36, borderRadius: 24, background: 'linear-gradient(135deg, #0ea5e9, #4f46e5)', color: '#fff', textAlign: 'center', boxShadow: '0 15px 40px rgba(14,165,233,0.25)' }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>🧪</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready for Activities?</h3>
                        <p style={{ opacity: 0.9, maxWidth: 460, margin: '0 auto 24px', fontSize: 15 }}>
                            Explore interactive simulations and activity breakdowns in the Virtual Lab section.
                        </p>
                        <button onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/virtual-lab')}
                            style={{ padding: '12px 32px', borderRadius: 100, background: '#fff', color: '#0ea5e9', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer' }}>
                            Open Virtual Lab →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── LEARN VIEW ──────────────── */
    if (view === 'learn' && skill) {
        const rules = skill.learn.rules;
        const rule = rules[selectedRuleIdx];

        return (
            <div className={`${styles['matter-page']} ${styles['matter-skills-stage']}`} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}

                <div className={styles['matter-skills-stage-body']}>
                    <div className={styles['matter-lexicon-container']}>
                        <div className={styles['matter-skill-learn-header']}>
                            <h1 style={{ 
                                fontFamily: 'Outfit, sans-serif', 
                                fontSize: 'clamp(1.4rem, 5.5vw, 2.5rem)', 
                                fontWeight: 900, 
                                color: 'var(--matter-text, #0f172a)', 
                                margin: 0
                            }}>
                                Learn: {skill.title}
                            </h1>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button className={styles['matter-skill-btn-outline']} onClick={() => setView('practice')}>Practice All</button>
                                <button className={styles['matter-skill-btn-filled']} style={{ '--skill-color': skill.color }} onClick={() => setView('assess')}>Assess All</button>
                            </div>
                        </div>

                        <div className={styles['matter-learn-grid']}>
                            <aside className={styles['matter-learn-sidebar']}>
                                {rules.map((r, idx) => (
                                    <button
                                        key={idx}
                                        className={`${styles['matter-sidebar-btn']} ${selectedRuleIdx === idx ? styles['active'] : ''}`}
                                        onClick={() => setSelectedRuleIdx(idx)}
                                        style={{ '--skill-color': skill.color, '--skill-color-15': `${skill.color}15` }}
                                    >
                                        <div className={styles['matter-sidebar-btn-num']}>{skill.section || (idx + 1)}</div>
                                        <div className={styles['matter-sidebar-btn-title']}>{r.title}</div>
                                    </button>
                                ))}
                            </aside>

                            <main className={styles['matter-details-window']} key={`${skill.id}-${selectedRuleIdx}`}>
                                <div className={styles['matter-detail-header']}>
                                    <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: skill.color }}>
                                        {rule.title}
                                    </h3>
                                </div>
                                <div style={{ fontSize: 13, fontWeight: 800, color: '#64748b', marginBottom: 24, textTransform: 'uppercase' }}>
                                    RULE {selectedRuleIdx + 1} OF {rules.length}
                                </div>

                                <div style={{ marginBottom: 24, padding: '18px 20px', borderRadius: 18, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: 11, fontWeight: 900, color: skill.color, marginBottom: 8, textTransform: 'uppercase' }}>Big Idea</div>
                                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#0f172a' }}>
                                        <MathRenderer text={skill.learn.concept} />
                                    </p>
                                </div>

                                <div style={{ background: `${skill.color}05`, padding: '24px 16px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                                    <div style={{ fontSize: '32px', fontWeight: 800, color: skill.color }}>
                                        <MathRenderer text={`$$${rule.f}$$`} />
                                    </div>
                                </div>

                                <div className={styles['matter-rule-split']}>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 12, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#0f172a' }}>
                                            <MathRenderer text={rule.d} />
                                        </p>
                                        <div style={{ marginTop: 24, background: 'rgba(13, 148, 136, 0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(13, 148, 136, 0.1)' }}>
                                            <p style={{ margin: 0, fontSize: 15, color: '#64748b' }}>
                                                <span style={{ fontWeight: 800, color: '#0d9488' }}>Tip: </span>
                                                <MathRenderer text={rule.tip} />
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 style={{ textTransform: 'uppercase', fontSize: 12, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                        <div style={{ background: '#f8fafc', padding: '24px 20px', borderRadius: 20, border: '1px solid #e2e8f0' }}>
                                            <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>
                                                <MathRenderer text={rule.ex} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #f1f5f9', paddingTop: 24 }}>
                                    <button
                                        onClick={() => setSelectedRuleIdx(r => Math.max(0, r - 1))}
                                        disabled={selectedRuleIdx === 0}
                                        className={styles['matter-skill-btn-outline']}
                                        style={{ opacity: selectedRuleIdx === 0 ? 0.3 : 1 }}
                                    >
                                        ← Previous
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (selectedRuleIdx < rules.length - 1) setSelectedRuleIdx(r => r + 1);
                                            else setView('practice');
                                        }}
                                        className={styles['matter-skill-btn-filled']}
                                        style={{ '--skill-color': skill.color }}
                                    >
                                        {selectedRuleIdx < rules.length - 1 ? 'Next →' : 'Start Practice All →'}
                                    </button>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ── PRACTICE VIEW ───────────────────────── */
    if (view === 'practice' && skill) {
        return (
            <div className={`${styles['matter-page']} ${styles['matter-skills-stage']}`} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}
                <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px 60px' }}>
                    <QuizEngine
                        questions={skill.practice}
                        title={`Practice: ${skill.title}`}
                        color={skill.color}
                        onBack={() => setView('learn')}
                        prefix="mattertest"
                    />
                </div>
            </div>
        );
    }

    /* ── ASSESS VIEW ─────────────────────────── */
    if (view === 'assess' && skill) {
        return (
            <div className={`${styles['matter-page']} ${styles['matter-skills-stage']}`} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}
                <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px 60px' }}>
                    <AssessmentEngine
                        questions={skill.assessment}
                        title={`Assessment: ${skill.title}`}
                        color={skill.color}
                        onBack={() => setView('learn')}
                        prefix="mattertest"
                    />
                </div>
            </div>
        );
    }

    return null;
}
