import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../trigonometry.module.css';
import MathRenderer from '../../../../../MathRenderer';
import TrigPracticeEngine from '../../../../../Math-Branches/Trigonometry/Engines/TrigPracticeEngine';
import TrigAssessmentEngine from '../../../../../Math-Branches/Trigonometry/Engines/TrigAssessmentEngine';
import { SKILLS } from './TrigIntroGr10SkillsIndex';
import { SLUG_TO_NODE_ID } from '@/lib/curriculumIds';

export default function TrigIntroGr10Skills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkillIdx, setActiveSkillIdx] = useState(null);
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view, activeSkillIdx, selectedLearnIdx]);

    const openSkill = (index, nextView) => {
        const skill = SKILLS[index];
        const qs = nextView === 'practice' ? skill.practice : nextView === 'assessment' ? skill.assessment : [];
        setSessionQuestions(qs);
        setActiveSkillIdx(index);
        setSelectedLearnIdx(0);
        setView(nextView);
    };

    const backToList = () => {
        setView('list');
        setActiveSkillIdx(null);
        setSelectedLearnIdx(0);
        window.scrollTo(0, 0);
    };

    const skill = activeSkillIdx !== null ? SKILLS[activeSkillIdx] : null;

    if (view === 'learn' && skill) {
        const { learn, title, color } = skill;
        const currentRule = learn.rules[selectedLearnIdx];

        return (
            <div className={styles['ccr-page']}>
                <nav className={styles['ccr-nav']}>
                    <button className={styles['ccr-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['ccr-nav-links']}>
                        <button className={styles['ccr-nav-link']} onClick={() => navigate('/trigonometry/grade-10-intro')}>Home</button>
                        <button className={styles['ccr-nav-link']} onClick={() => navigate('/trigonometry/grade-10-intro/terminology')}>Terminology</button>
                        <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Skills</button>
                    </div>
                </nav>

                <div className={styles['ccr-module-hero']}>
                    <h1 className={styles['ccr-module-title']}>Skill {activeSkillIdx + 1}: <span className={styles['ccr-accent-text']}>{title}</span></h1>
                    <p className={styles['ccr-module-subtitle']}>Learn the chapter flow from the textbook</p>
                </div>

                <div className={styles['ccr-section']}>
                    <div className={styles['ccr-learn-grid']}>
                        <div className={styles['ccr-learn-sidebar']}>
                            <div style={{ padding: '4px 12px 12px', fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Learning Path</div>
                            {learn.rules.map((rule, ri) => (
                                <button
                                    key={ri}
                                    className={`${styles['ccr-sidebar-btn']}${selectedLearnIdx === ri ? ` ${styles.active}` : ''}`}
                                    style={{ '--skill-color': color }}
                                    onClick={() => setSelectedLearnIdx(ri)}
                                >
                                    <span className={styles['ccr-sidebar-btn-num']}>{ri + 1}</span>
                                    <span className={styles['ccr-sidebar-btn-title']}>{rule.title}</span>
                                </button>
                            ))}
                            <div style={{ marginTop: 'auto', padding: '20px 12px 0' }}>
                                <div style={{ background: `${color}10`, padding: 12, borderRadius: 12, border: `1px solid ${color}20` }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color, marginBottom: 4 }}>GOAL</div>
                                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4 }}>Finish all {learn.rules.length} topics, then move into practice and assessment.</div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['ccr-details-window']} ${styles['ccr-details-window-anim']}`} key={selectedLearnIdx}>
                            <div className={styles['ccr-learn-header-row']} style={{ '--skill-color': color, marginBottom: 28 }}>
                                <div>
                                    <div className={styles['ccr-learn-skill-meta']}>TOPIC {selectedLearnIdx + 1} OF {learn.rules.length}</div>
                                    <h2 className={styles['ccr-learn-title']} style={{ color: '#1e293b' }}>{currentRule.title}</h2>
                                </div>
                                <span className={styles['ccr-learn-icon']} style={{ fontSize: 32, fontWeight: 900, color }}>{skill.icon}</span>
                            </div>

                            <div style={{ background: `${color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${color}10`, marginBottom: 30 }}>
                                <div style={{ fontSize: 18, lineHeight: 1.7, color: '#1e293b', fontWeight: 500 }}>
                                    <MathRenderer text={currentRule.d} />
                                </div>
                            </div>

                            <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: 30, display: 'flex', justifyContent: 'center' }}>
                                <MathRenderer text={`$$${currentRule.f}$$`} />
                            </div>

                            <div className={styles['ccr-rule-split']}>
                                <div className={styles['ccr-rule-card']} style={{ background: '#fff', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.2, color: '#64748b', marginBottom: 12, fontWeight: 800 }}>Core Concept</h4>
                                    <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>
                                        <MathRenderer text={learn.concept} />
                                    </div>
                                </div>

                                <div className={styles['ccr-rule-card']} style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.2, color, marginBottom: 12, fontWeight: 800 }}>Example</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>
                                            <MathRenderer text={currentRule.ex} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {currentRule.tip && (
                                <div style={{ marginTop: 30, background: '#fffbeb', padding: 18, borderRadius: 16, border: '1px solid #fde68a', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: 18, fontWeight: 900, color: '#92400e' }}>TIP</span>
                                    <div style={{ fontSize: 14, color: '#92400e', lineHeight: 1.5, fontWeight: 500 }}>
                                        <MathRenderer text={currentRule.tip} />
                                    </div>
                                </div>
                            )}

                            <div className={styles['ccr-learn-footer']} style={{ borderTop: '1px solid #f1f5f9', paddingTop: 24 }}>
                                {selectedLearnIdx < learn.rules.length - 1 ? (
                                    <button className={styles['ccr-btn-primary']} style={{ background: color }} onClick={() => setSelectedLearnIdx(selectedLearnIdx + 1)}>
                                        Next Topic {'->'}
                                    </button>
                                ) : (
                                    <button className={styles['ccr-btn-primary']} style={{ background: color }} onClick={() => openSkill(activeSkillIdx, 'practice')}>
                                        Start Practice {'->'}
                                    </button>
                                )}
                                <button className={styles['ccr-btn-secondary']} onClick={() => openSkill(activeSkillIdx, 'assessment')}>
                                    Take Assessment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'practice' && skill) {
        return (
            <div className={styles['ccr-page']}>
                <nav className={styles['ccr-nav']}>
                    <button className={styles['ccr-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['ccr-nav-links']}>
                        <button className={styles['ccr-nav-link']} onClick={() => openSkill(activeSkillIdx, 'learn')}>Learn</button>
                        <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Practice</button>
                        <button className={styles['ccr-nav-link']} onClick={() => openSkill(activeSkillIdx, 'assessment')}>Assessment</button>
                    </div>
                </nav>
                <div className={styles['ccr-module-hero']}>
                    <h1 className={styles['ccr-module-title']}>Practice: <span className={styles['ccr-accent-text']}>{skill.title}</span></h1>
                    <p className={styles['ccr-module-subtitle']}>Practice questions based on the textbook section</p>
                </div>
                <div className={styles['ccr-section']}>
                    <TrigPracticeEngine
                        questions={sessionQuestions}
                        questionPool={sessionQuestions}
                        sampleSize={sessionQuestions.length}
                        title={`Practice: ${skill.title}`}
                        color={skill.color}
                        onBack={backToList}
                        nodeId={SLUG_TO_NODE_ID[`trig-intro-${activeSkillIdx + 1}`]}
                    />
                </div>
            </div>
        );
    }

    if (view === 'assessment' && skill) {
        return (
            <div className={styles['ccr-page']}>
                <nav className={styles['ccr-nav']}>
                    <button className={styles['ccr-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['ccr-nav-links']}>
                        <button className={styles['ccr-nav-link']} onClick={() => openSkill(activeSkillIdx, 'learn')}>Learn</button>
                        <button className={styles['ccr-nav-link']} onClick={() => openSkill(activeSkillIdx, 'practice')}>Practice</button>
                        <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Assessment</button>
                    </div>
                </nav>
                <div className={styles['ccr-module-hero']}>
                    <h1 className={styles['ccr-module-title']}>Assessment: <span className={styles['ccr-accent-text']}>{skill.title}</span></h1>
                    <p className={styles['ccr-module-subtitle']}>Short review set for this chapter block</p>
                </div>
                <div className={styles['ccr-section']}>
                    <TrigAssessmentEngine
                        questionPool={sessionQuestions}
                        sampleSize={sessionQuestions.length}
                        title={skill.title}
                        color={skill.color}
                        onBack={backToList}
                        nodeId={SLUG_TO_NODE_ID[`trig-intro-${activeSkillIdx + 1}`]}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={styles['ccr-page']}>
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/trigonometry/grade-10-intro')}>← Intro to Trigonometry</button>
                <div className={styles['ccr-nav-links']}>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/trigonometry/grade-10-intro/introduction')}>Introduction</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/trigonometry/grade-10-intro/terminology')}>Terminology</button>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Skills</button>
                </div>
            </nav>

            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>Intro to Trig <span className={styles['ccr-accent-text']}>Skills</span></h1>
                <p className={styles['ccr-module-subtitle']}>From standard angle tables to real-world height problems — master it all.</p>
            </div>

            <div className={styles['ccr-section']}>
                <div className={styles['ccr-skills-list']}>
                    {SKILLS.map((skill, index) => (
                        <div key={skill.id} className={styles['ccr-skill-card']} style={{ '--skill-color': skill.color }}>
                            <div className={styles['ccr-skill-info']}>
                                <div className={styles['ccr-skill-icon']} style={{ background: `${skill.color}15`, color: skill.color, fontSize: 18, fontWeight: 900 }}>{skill.icon}</div>
                                <div>
                                    <div className={styles['ccr-skill-meta']} style={{ fontSize: 11, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Skill {index + 1}</div>
                                    <div className={styles['ccr-skill-title']} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>{skill.title}</div>
                                    <div className={styles['ccr-skill-desc']} style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                                        <MathRenderer text={skill.desc} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles['ccr-skill-actions']}>
                                <button
                                    className={styles['ccr-skill-btn-outline']}
                                    style={{ '--btn-color': skill.color }}
                                    onClick={() => openSkill(index, 'learn')}
                                >
                                    Learn
                                </button>
                                <button
                                    className={styles['ccr-skill-btn-outline']}
                                    style={{ '--btn-color': skill.color }}
                                    onClick={() => openSkill(index, 'practice')}
                                >
                                    Practice
                                </button>
                                <button
                                    className={styles['ccr-skill-btn-filled']}
                                    style={{ '--btn-color': skill.color }}
                                    onClick={() => openSkill(index, 'assessment')}
                                >
                                    Assess
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
