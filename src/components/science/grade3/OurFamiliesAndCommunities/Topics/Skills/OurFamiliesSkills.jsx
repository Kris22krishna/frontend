import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OUR_FAMILIES_SKILLS, generateEvsQuestions } from './OurFamiliesSkillsData';
import styles from '../../OurFamiliesShared.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { getSkillVisual } from '../OurFamiliesVisuals';

import PracticeEngine from '../../Engines/JuniorEvsPracticeEngine';
import AssessmentEngine from '../../Engines/JuniorEvsAssessmentEngine';
import '../../Engines/JuniorEvsTestLayout.css';
import InteractiveGameMapper from './OurFamiliesInteractiveGames';

/* ── Main Component ─────────────────────────────────────────────── */
export default function OurFamiliesSkills() {
    const navigate = useNavigate();
    const [activeSkillIdx, setActiveSkillIdx] = useState(null);
    const [view, setView] = useState('list'); // 'list' | 'learn' | 'practice' | 'assess'

    useEffect(() => { window.scrollTo(0, 0); }, [view, activeSkillIdx]);

    const skill = activeSkillIdx !== null ? OUR_FAMILIES_SKILLS[activeSkillIdx] : null;

    const openSkill = (idx, nextView) => {
        setActiveSkillIdx(idx);
        setView(nextView);
    };

    const NAV = (
        <nav className={styles['chem-nav']}>
            <button className={styles['chem-nav-back']} onClick={() => {
                if (view !== 'list') { setView('list'); setActiveSkillIdx(null); }
                else navigate('/junior/grade/3/science/our-families-and-communities');
            }}>
                {view !== 'list' ? '← Back to Skills' : '← Back to Dashboard'}
            </button>
            <div className={styles['chem-nav-links']}>
                <button className={styles['chem-nav-link']} onClick={() => navigate('/junior/grade/3/science/our-families-and-communities/introduction')}>🌟 Intro</button>
                <button className={styles['chem-nav-link']} onClick={() => navigate('/junior/grade/3/science/our-families-and-communities/terminology')}>📖 Terminology</button>
                <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => { setView('list'); setActiveSkillIdx(null); }}>🎯 Skills</button>
                <button className={styles['chem-nav-link']} onClick={() => navigate('/junior/grade/3/science/our-families-and-communities/virtual-lab')}>🧪 Virtual Lab</button>
            </div>
        </nav>
    );

    /* ── LIST VIEW ─────────────────────────────────────────────── */
    if (view === 'list') {
        return (
            <div className={styles['chem-page']}>
                {NAV}
                <div className={styles['chem-hero']}>
                    <h1 className={styles['chem-hero-title']}>Family <span style={{ color: '#f59e0b' }}>Skills</span></h1>
                    <p className={styles['chem-hero-sub']}>Practice what you've learned about families, sharing, and caring!</p>
                </div>

                <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 24px 60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <p style={{ color: '#64748b', fontSize: 16, fontWeight: 600, maxWidth: 600, margin: '0 auto' }}>
                            Each skill has a dedicated <strong>Learn</strong>, <strong>Practice</strong>, and <strong>Assess</strong> section.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {OUR_FAMILIES_SKILLS.map((concept, idx) => (
                            <div key={concept.id}
                                className={styles['chem-concept-card']}
                                style={{ '--skill-color': concept.color, '--skill-color-15': concept.color + '15', '--skill-color-40': concept.color + '40' }}>
                                
                                <div className={styles['chem-concept-header']}>
                                    <div className={styles['chem-concept-icon']}>{concept.icon}</div>

                                    <div className={styles['chem-concept-info']}>
                                        <div style={{ fontSize: 11, fontWeight: 900, color: concept.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                                            Skill {idx + 1}
                                        </div>
                                        <h3>{concept.title}</h3>
                                        <p>{concept.desc}</p>
                                    </div>
                                </div>

                                <div className={styles['chem-concept-actions']}>
                                    <button onClick={() => openSkill(idx, 'learn')} className={styles['chem-concept-btn']}>
                                        Learn
                                    </button>
                                    <button onClick={() => openSkill(idx, 'practice')} className={styles['chem-concept-btn']}>
                                        Practice
                                    </button>
                                    <button onClick={() => openSkill(idx, 'assess')} className={`${styles['chem-concept-btn']} ${styles['assess']}`}>
                                        Assess
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 60, padding: 36, borderRadius: 24, background: 'linear-gradient(135deg, #10b981, #0ea5e9)', color: '#fff', textAlign: 'center', boxShadow: '0 15px 40px rgba(16,185,129,0.25)' }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>🧹</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>Ready for a Family Activity?</h3>
                        <p style={{ opacity: 0.9, maxWidth: 460, margin: '0 auto 24px', fontSize: 15 }}>
                            Head to the Virtual Lab to help out around the house and sort the daily chores!
                        </p>
                        <button onClick={() => navigate('/junior/grade/3/science/our-families-and-communities/virtual-lab')}
                            style={{ padding: '12px 32px', borderRadius: 100, background: '#fff', color: '#10b981', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer' }}>
                            Open Virtual Lab →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── LEARN VIEW ────────────────────────────────────────────────── */
    if (view === 'learn' && skill) {
        return (
            <div className={`skills-page chem-skills-stage`} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}

                <div className="chem-skills-stage-body" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div className="chem-lexicon-container">
                        <div className="chem-skill-learn-header" style={{ marginBottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <div style={{ width: '100%', maxWidth: '400px', marginBottom: 30, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                {getSkillVisual(skill.id)}
                            </div>
                            <h1 style={{ 
                                fontFamily: 'Outfit, sans-serif', 
                                fontSize: 'clamp(2rem, 5.5vw, 3rem)', 
                                fontWeight: 900, 
                                color: skill.color,
                                margin: '0 0 16px',
                            }}>
                                {skill.title}
                            </h1>
                            <p style={{ fontSize: 18, color: '#64748b', maxWidth: 600 }}>{skill.desc}</p>
                            
                            <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
                                <button 
                                    className={styles['chem-btn-outline']}
                                    onClick={() => setView('practice')}
                                    style={{ padding: '14px 32px', fontSize: 16, fontWeight: 800, borderColor: skill.color, color: skill.color }}
                                >
                                    Play Mini-Game
                                </button>
                                <button 
                                    className={styles['chem-btn-filled']}
                                    style={{ '--skill-color': skill.color, padding: '14px 32px', fontSize: 16 }} 
                                    onClick={() => setView('assess')}
                                >
                                    Take Assessment
                                </button>
                            </div>
                        </div>

                        <div style={{ background: '#fff', padding: 40, borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, color: '#1e293b' }}>Summary</h3>
                            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#475569' }}>
                                For Grade 3 EVS, understanding <strong>{skill.title}</strong> is essential. 
                                By completing the Practice and Assessment modes, you'll be able to 
                                recognize the importance of community, know all your key family terms, 
                                and help out at home with confidence.
                            </p>

                            <div style={{ marginTop: 24, padding: 20, background: `${skill.color}10`, borderRadius: 16, borderLeft: `6px solid ${skill.color}` }}>
                                <h4 style={{ margin: '0 0 8px', color: skill.color, fontWeight: 800 }}>⭐ Study Tip</h4>
                                <p style={{ margin: 0, color: '#475569', fontSize: 15 }}>
                                    If you get stuck during the practice, just review the Intro and Terminology pages before taking the final Assessment!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ── PRACTICE VIEW ─────────────────────────────────────────────── */
    if (view === 'practice' && skill) {
        return (
            <div className={`skills-page chem-skills-stage`} style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
                {NAV}
                <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px 60px' }}>
                    <InteractiveGameMapper skillId={skill.id} color={skill.color} />
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <button onClick={() => { setView('list'); setActiveSkillIdx(null); }} style={{ padding: '12px 32px', borderRadius: 100, border: '2px solid #cbd5e1', background: '#f1f5f9', color: '#475569', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}>
                            ← Back to Skills
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── ASSESS VIEW ───────────────────────────────────────────────── */
    if (view === 'assess' && skill) {
        return (
            <div className={styles['chem-page']} style={{ background: '#f8fafc', minHeight: '100vh', overflowY: 'auto' }}>
                {NAV}
                <main className={styles['chem-topic-shell']} style={{ maxWidth: '1180px', margin: '0 auto', padding: '32px 24px 60px' }}>
                    <div className="skills-page chem-skills-stage" style={{ minHeight: 'auto', background: 'transparent', padding: 0 }}>
                        <AssessmentEngine
                            questions={() => generateEvsQuestions(skill.id, 20)}
                            title={`Assessment: ${skill.title}`}
                            color={skill.color}
                            onBack={() => { setView('list'); setActiveSkillIdx(null); }}
                            prefix="evstest"
                        />
                    </div>
                </main>
            </div>
        );
    }

    return null;
}
