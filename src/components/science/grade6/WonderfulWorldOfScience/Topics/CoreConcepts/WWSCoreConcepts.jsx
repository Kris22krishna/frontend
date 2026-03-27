import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CORE_CONCEPTS } from './WWSCoreConceptsData';
import styles from '../../WonderfulWorldOfScienceDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';

import QuizEngine from '../../Engines/WWSQuizEngine';
import AssessmentEngine from '../../Engines/WWSAssessmentEngine';
import '../../Engines/WWSTestLayout.css';

/* ── Main Component ─────────────────────────────────────────────── */
export default function WWSCoreConcepts() {
    const navigate = useNavigate();
    const BASE = '/middle/grade/6/science/wonderful-world-of-science';
    const [activeSkillIdx, setActiveSkillIdx] = useState(null);
    const [view, setView] = useState('list');
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, [view, activeSkillIdx]);

    const skill = activeSkillIdx !== null ? CORE_CONCEPTS[activeSkillIdx] : null;

    const openSkill = (idx, nextView) => {
        setActiveSkillIdx(idx);
        setSelectedRuleIdx(0);
        setView(nextView);
    };

    const NAV = (
        <nav className={styles['wws-nav']}>
            <button className={styles['wws-nav-back']} onClick={() => {
                if (view === 'practice' || view === 'assess') setView('learn');
                else if (view === 'learn') { setView('list'); setActiveSkillIdx(null); }
                else navigate(BASE);
            }}>
                {view === 'practice' || view === 'assess' ? '← Back to Learn' :
                 view === 'learn' ? '← Back to Concepts' : '← Back to Dashboard'}
            </button>
            <div className={styles['wws-nav-links']}>
                <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
                <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                <button className={`${styles['wws-nav-link']} ${styles['active']}`} onClick={() => { setView('list'); setActiveSkillIdx(null); }}>🎯 Core Concepts</button>
                <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/connectomics`)}>🔗 Connectomics</button>
                <button className={styles['wws-nav-link']} onClick={() => navigate(`${BASE}/virtual-lab`)}>🧪 Virtual Lab</button>
            </div>
        </nav>
    );

    /* ── LIST VIEW ─────────────────────────────────────────────── */
    if (view === 'list') {
        return (
            <div className={styles['wws-page']}>
                {NAV}
                <div className={styles['wws-hero']}>
                    <h1 className={styles['wws-hero-title']}>Core <span style={{ color: '#f59e0b' }}>Concepts</span></h1>
                    <p className={styles['wws-hero-sub']}>Master the central pillars — what science is, how it works, and how you use it every day.</p>
                </div>

                <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 24px 60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 600, maxWidth: 600, margin: '0 auto' }}>
                            Each concept has a dedicated <strong>Learn</strong>, <strong>Practice</strong>, and <strong>Assess</strong> section.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {CORE_CONCEPTS.map((concept, idx) => (
                            <div key={concept.id}
                                className={styles['wws-concept-card']}
                                style={{ '--skill-color': concept.color, '--skill-color-15': concept.color + '15', '--skill-color-40': concept.color + '40' }}>
                                
                                <div className={styles['wws-concept-header']}>
                                    <div className={styles['wws-concept-icon']}>{concept.icon}</div>
                                    <div className={styles['wws-concept-info']}>
                                        <div style={{ fontSize: 11, fontWeight: 900, color: concept.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                                            Core Concept {concept.id}
                                        </div>
                                        <h3>{concept.title}</h3>
                                        <p>{concept.desc}</p>
                                    </div>
                                </div>

                                <div className={styles['wws-concept-actions']}>
                                    <button onClick={() => openSkill(idx, 'learn')} className={styles['wws-concept-btn']}>Learn</button>
                                    <button onClick={() => openSkill(idx, 'practice')} className={styles['wws-concept-btn']}>Practice</button>
                                    <button onClick={() => openSkill(idx, 'assess')} className={`${styles['wws-concept-btn']} ${styles['assess']}`}>Assess</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 60, padding: 36, borderRadius: 24, background: 'linear-gradient(135deg, #10b981, #0891b2)', color: '#fff', textAlign: 'center', boxShadow: '0 15px 40px rgba(16,185,129,0.25)' }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>🧪</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready to Experiment?</h3>
                        <p style={{ opacity: 0.9, maxWidth: 460, margin: '0 auto 24px', fontSize: 15 }}>
                            Head to the Virtual Lab to see science come alive with animations!
                        </p>
                        <button onClick={() => navigate(`${BASE}/virtual-lab`)}
                            style={{ padding: '12px 32px', borderRadius: 100, background: '#fff', color: '#10b981', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer' }}>
                            Open Virtual Lab →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── LEARN VIEW ──────────────────────────────────────────── */
    if (view === 'learn' && skill) {
        const rules = skill.learn.rules;
        const rule = rules[selectedRuleIdx];

        return (
            <div className="skills-page wws-skills-stage" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}

                <div className="wws-skills-stage-body">
                    <div className="wws-lexicon-container">
                        <div className="wws-skill-learn-header">
                            <h1 style={{ 
                                fontFamily: 'Outfit, sans-serif', 
                                fontSize: 'clamp(1.4rem, 5.5vw, 2.5rem)', 
                                fontWeight: 900, 
                                color: 'var(--wws-text, #0f172a)', 
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
                                    className="wws-skill-btn-outline" 
                                    onClick={() => setView('practice')}
                                    style={{ whiteSpace: 'nowrap', padding: '10px 20px', fontSize: 13, minWidth: 'fit-content' }}
                                >
                                    Practice All
                                </button>
                                <button 
                                    className="wws-skill-btn-filled" 
                                    style={{ '--skill-color': skill.color, whiteSpace: 'nowrap', padding: '10px 20px', fontSize: 13, minWidth: 'fit-content' }} 
                                    onClick={() => setView('assess')}
                                >
                                    Assess All
                                </button>
                            </div>
                        </div>

                        <div className="wws-learn-grid">
                            <aside className="wws-learn-sidebar" style={{ gap: 10 }}>
                                {rules.map((r, idx) => (
                                    <button
                                        key={idx}
                                        className={`wws-sidebar-btn ${selectedRuleIdx === idx ? 'active' : ''}`}
                                        onClick={() => setSelectedRuleIdx(idx)}
                                        style={{ '--skill-color': skill.color, '--skill-color-15': `${skill.color}15`, '--skill-color-40': `${skill.color}40` }}
                                    >
                                        <div className="wws-sidebar-btn-num">{idx + 1}</div>
                                        <div className="wws-sidebar-btn-title">{r.title}</div>
                                    </button>
                                ))}
                            </aside>

                            <main className="wws-details-window-anim wws-details-window" key={`${skill.id}-${selectedRuleIdx}`}>
                                {rule && (
                                    <>
                                        <div className="wws-law-header">
                                            <h3 style={{ margin: 0, fontSize: 'clamp(20px, 6vw, 28px)', fontWeight: 900, color: skill.color }}>
                                                {rule.title}
                                            </h3>
                                        </div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--wws-muted, #64748b)', marginBottom: 24, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8 }}>
                                            RULE {selectedRuleIdx + 1} OF {rules.length}
                                        </div>

                                        <div style={{ marginBottom: 24, padding: '18px 20px', borderRadius: 18, background: 'linear-gradient(180deg, rgba(248,250,252,0.98), rgba(241,245,249,0.9))', border: '1px solid rgba(148,163,184,0.16)' }}>
                                            <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.2, textTransform: 'uppercase', color: skill.color, marginBottom: 8 }}>Big Idea</div>
                                            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: 'var(--wws-text, #0f172a)' }}>
                                                {skill.learn.concept}
                                            </p>
                                        </div>

                                        <div style={{ background: `${skill.color}05`, padding: '24px 16px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center', overflowX: 'auto' }}>
                                            <div className="formula-text" style={{ fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 800, color: skill.color }}>
                                                <MathRenderer text={`$$${rule.f}$$`} />
                                            </div>
                                        </div>

                                        <div className="wws-rule-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 32 }}>
                                            <div>
                                                <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--wws-muted, #64748b)', marginBottom: 10 }}>Explanation</h4>
                                                <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--wws-text, #0f172a)' }}>
                                                    {rule.d}
                                                </p>
                                                <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--wws-muted, #64748b)' }}>
                                                        <span style={{ fontWeight: 800, color: 'var(--wws-teal, #0d9488)' }}>Tip: </span>
                                                        {rule.tip}
                                                    </p>
                                                </div>
                                            </div>
                                            <div style={{ minWidth: 0 }}>
                                                <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                                <div style={{ background: '#f8fafc', padding: '24px 20px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)', overflowX: 'auto', overflowY: 'hidden' }}>
                                                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--wws-text, #0f172a)', minWidth: 'min-content' }}>
                                                        <MathRenderer text={rule.ex.includes('$') ? rule.ex : `$$${rule.ex}$$`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="wws-learn-footer" style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', borderTop: '2px solid rgba(0,0,0,0.04)', paddingTop: 24 }}>
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
            <div className="skills-page wws-skills-stage" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}
                <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px 60px' }}>
                    <QuizEngine
                        questions={skill.practice}
                        title={`Practice: ${skill.title}`}
                        color={skill.color}
                        nodeId={skill.nodeId}
                        onBack={() => setView('learn')}
                        prefix="wwstest"
                    />
                </div>
            </div>
        );
    }

    /* ── ASSESS VIEW ─────────────────────────── */
    if (view === 'assess' && skill) {
        return (
            <div className={styles['wws-page']} style={{ background: '#f8fafc', minHeight: '100vh', overflowY: 'auto' }}>
                {NAV}
                <main className={styles['wws-topic-shell']} style={{ maxWidth: '1180px', margin: '0 auto', padding: '32px 24px 60px' }}>
                    <div className="skills-page wws-skills-stage" style={{ minHeight: 'auto', background: 'transparent', padding: 0 }}>
                        <AssessmentEngine
                            questions={skill.assessment}
                            title={`Assessment: ${skill.title}`}
                            color={skill.color}
                            nodeId={skill.nodeId}
                            onBack={() => setView('learn')}
                            prefix="wwstest"
                        />
                    </div>
                </main>
            </div>
        );
    }

    return null;
}
