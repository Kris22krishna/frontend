import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WEL_CONCEPTS } from './WELCoreConceptsData';
import styles from '../../WaterEssenceOfLifeDashboard.module.css';

import QuizEngine from '../../Engines/WELQuizEngine';
import AssessmentEngine from '../../Engines/WELAssessmentEngine';
import '../../Engines/WELTestLayout.css';

const normalizeQuestions = (questions = []) =>
    questions.map((question) => ({
        ...question,
        question: question.question ?? question.q ?? '',
        correct: question.correct ?? question.answer,
    }));

/* ── Main Component ─────────────────────────────────────────────── */
export default function WELCoreConcepts() {
    const navigate = useNavigate();
    const BASE = '/middle/grade/5/science/water-essence-of-life';
    const [activeSkillIdx, setActiveSkillIdx] = useState(null);
    const [view, setView] = useState('list');
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, [view, activeSkillIdx]);

    const skill = activeSkillIdx !== null ? WEL_CONCEPTS[activeSkillIdx] : null;
    const practiceQuestions = normalizeQuestions(skill?.practiceQuestions);
    const assessmentQuestions = normalizeQuestions(skill?.assessmentQuestions);

    const openSkill = (idx, nextView) => {
        setActiveSkillIdx(idx);
        setSelectedRuleIdx(0);
        setView(nextView);
    };

    const NAV = (
        <nav className={styles['wel-nav']}>
            <button className={styles['wel-nav-back']} onClick={() => {
                if (view === 'practice' || view === 'assess') setView('learn');
                else if (view === 'learn') { setView('list'); setActiveSkillIdx(null); }
                else navigate(BASE);
            }}>
                {view === 'practice' || view === 'assess' ? '← Back to Learn' :
                 view === 'learn' ? '← Back to Concepts' : '← Back to Dashboard'}
            </button>
            <div className={styles['wel-nav-links']}>
                <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                <button className={`${styles['wel-nav-link']} ${styles['active']}`} onClick={() => { setView('list'); setActiveSkillIdx(null); }}>🎯 Core Concepts</button>
                <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/connectomics`)}>🔗 Connectomics</button>
                <button className={styles['wel-nav-link']} onClick={() => navigate(`${BASE}/virtual-lab`)}>🧪 Virtual Lab</button>
            </div>
        </nav>
    );

    /* ── LIST VIEW ─────────────────────────────────────────────── */
    if (view === 'list') {
        return (
            <div className={styles['wel-page']}>
                {NAV}
                <div className={styles['wel-hero']}>
                    <h1 className={styles['wel-hero-title']}>Core <span style={{ color: '#0ea5e9' }}>Concepts</span></h1>
                    <p className={styles['wel-hero-sub']}>Master water sources, the water cycle, aquatic life, and conservation.</p>
                </div>

                <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 24px 60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 600, maxWidth: 600, margin: '0 auto' }}>
                            Each concept has a dedicated <strong>Learn</strong>, <strong>Practice</strong>, and <strong>Assess</strong> section.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {WEL_CONCEPTS.map((concept, idx) => (
                            <div key={concept.id}
                                className={styles['wel-concept-card']}
                                style={{ '--skill-color': concept.color, '--skill-color-15': concept.color + '15', '--skill-color-40': concept.color + '40' }}>
                                
                                <div className={styles['wel-concept-header']}>
                                    <div className={styles['wel-concept-icon']}>{concept.icon}</div>
                                    <div className={styles['wel-concept-info']}>
                                        <div style={{ fontSize: 11, fontWeight: 900, color: concept.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                                            Core Concept {idx + 1}
                                        </div>
                                        <h3>{concept.title}</h3>
                                        <p>{concept.description}</p>
                                    </div>
                                </div>

                                <div className={styles['wel-concept-actions']}>
                                    <button onClick={() => openSkill(idx, 'learn')} className={styles['wel-concept-btn']}>Learn</button>
                                    <button onClick={() => openSkill(idx, 'practice')} className={styles['wel-concept-btn']}>Practice</button>
                                    <button onClick={() => openSkill(idx, 'assess')} className={`${styles['wel-concept-btn']} ${styles['assess']}`}>Assess</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 60, padding: 36, borderRadius: 24, background: 'linear-gradient(135deg, #0ea5e9, #0891b2)', color: '#fff', textAlign: 'center', boxShadow: '0 15px 40px rgba(14,165,233,0.25)' }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>🧪</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready to Experiment?</h3>
                        <p style={{ opacity: 0.9, maxWidth: 460, margin: '0 auto 24px', fontSize: 15 }}>
                            Head to the Virtual Lab to see water science come alive with animations!
                        </p>
                        <button onClick={() => navigate(`${BASE}/virtual-lab`)}
                            style={{ padding: '12px 32px', borderRadius: 100, background: '#fff', color: '#0ea5e9', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer' }}>
                            Open Virtual Lab →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── LEARN VIEW ──────────────────────────────────────────── */
    if (view === 'learn' && skill) {
        const rules = skill.rules;
        const rule = rules[selectedRuleIdx];

        return (
            <div className="skills-page wel-skills-stage" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}

                <div className="wel-skills-stage-body">
                    <div className="wel-lexicon-container">
                        <div className="wel-skill-learn-header">
                            <h1 style={{ 
                                fontFamily: 'Outfit, sans-serif', 
                                fontSize: 'clamp(1.4rem, 5.5vw, 2.5rem)', 
                                fontWeight: 900, 
                                color: '#0f172a', 
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
                                    className="wel-skill-btn-outline" 
                                    onClick={() => setView('practice')}
                                    style={{ whiteSpace: 'nowrap', padding: '10px 20px', fontSize: 13, minWidth: 'fit-content' }}
                                >
                                    Practice All
                                </button>
                                <button 
                                    className="wel-skill-btn-filled" 
                                    style={{ '--skill-color': skill.color, whiteSpace: 'nowrap', padding: '10px 20px', fontSize: 13, minWidth: 'fit-content' }} 
                                    onClick={() => setView('assess')}
                                >
                                    Assess All
                                </button>
                            </div>
                        </div>

                        <div className="wel-learn-grid">
                            <aside className="wel-learn-sidebar" style={{ gap: 10 }}>
                                {rules.map((r, idx) => (
                                    <button
                                        key={idx}
                                        className={`wel-sidebar-btn ${selectedRuleIdx === idx ? 'active' : ''}`}
                                        onClick={() => setSelectedRuleIdx(idx)}
                                        style={{ '--skill-color': skill.color, '--skill-color-15': `${skill.color}15`, '--skill-color-40': `${skill.color}40` }}
                                    >
                                        <div className="wel-sidebar-btn-num">{idx + 1}</div>
                                        <div className="wel-sidebar-btn-title">{r.title}</div>
                                    </button>
                                ))}
                            </aside>

                            <main className="wel-details-window-anim wel-details-window" key={`${skill.id}-${selectedRuleIdx}`}>
                                {rule && (
                                    <>
                                        <div className="wel-law-header">
                                            <h3 style={{ margin: 0, fontSize: 'clamp(20px, 6vw, 28px)', fontWeight: 900, color: skill.color }}>
                                                {rule.title}
                                            </h3>
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: '#64748b', marginBottom: 24, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8 }}>
                                            TOPIC {selectedRuleIdx + 1} OF {rules.length}
                                        </div>

                                        <div style={{ marginBottom: 24, padding: '24px 28px', borderRadius: 20, background: `${skill.color}08`, border: `2px solid ${skill.color}18` }}>
                                            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.75, color: '#0f172a' }}>
                                                {rule.text}
                                            </p>
                                        </div>
                                    </>
                                )}

                                <div className="wel-learn-footer" style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', borderTop: '2px solid rgba(0,0,0,0.04)', paddingTop: 24 }}>
                                    <button
                                        onClick={() => setSelectedRuleIdx(r => Math.max(0, r - 1))}
                                        disabled={selectedRuleIdx === 0}
                                        style={{ background: 'none', border: '1px solid rgba(0,0,0,0.1)', padding: '10px 18px', borderRadius: 8, fontWeight: 800, cursor: 'pointer', opacity: selectedRuleIdx === 0 ? 0.3 : 1 }}
                                    >
                                        ← Previous
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (selectedRuleIdx < rules.length - 1) setSelectedRuleIdx(r => r + 1);
                                            else setView('practice');
                                        }}
                                        style={{ background: skill.color, color: 'white', border: 'none', padding: '10px 18px', borderRadius: 8, fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}50` }}
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
            <div className="skills-page wel-skills-stage" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}
                <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px 60px' }}>
                    <QuizEngine
                        questions={practiceQuestions}
                        title={`Practice: ${skill.title}`}
                        color={skill.color}
                        nodeId={skill.nodeId}
                        onBack={() => setView('learn')}
                        prefix="weltest"
                    />
                </div>
            </div>
        );
    }

    /* ── ASSESS VIEW ─────────────────────────── */
    if (view === 'assess' && skill) {
        return (
            <div className={styles['wel-page']} style={{ background: '#f8fafc', minHeight: '100vh', overflowY: 'auto' }}>
                {NAV}
                <main className={styles['wel-topic-shell']} style={{ maxWidth: '1180px', margin: '0 auto', padding: '32px 24px 60px' }}>
                    <div className="skills-page wel-skills-stage" style={{ minHeight: 'auto', background: 'transparent', padding: 0 }}>
                        <AssessmentEngine
                            questions={assessmentQuestions}
                            title={`Assessment: ${skill.title}`}
                            color={skill.color}
                            nodeId={skill.nodeId}
                            onBack={() => setView('learn')}
                            prefix="weltest"
                        />
                    </div>
                </main>
            </div>
        );
    }

    return null;
}
