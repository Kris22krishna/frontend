import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShapesSkills.module.css';
import { LatexText } from '@/components/LatexText';
import ShapesPracticeEngine from './Engines/ShapesPracticeEngine';
import ShapesAssessmentEngine from './Engines/ShapesAssessmentEngine';
import { SKILLS } from './ShapesSkillsData';

export default function ShapesSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className={styles.sa_page} style={{ overflowY: 'auto' }}>
                <nav className={styles.sa_topic_nav}>
                    <button className={styles.sa_back_link} onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className={styles.sa_nav_links}>
                        <span className={styles.sa_nav_link} onClick={() => navigate('/shapes-and-angles/introduction')}>🌟 Intro</span>
                        <span className={styles.sa_nav_link} onClick={() => navigate('/shapes-and-angles/terminology')}>📖 Terminology</span>
                        <span className={styles.sa_nav_link_active}>🎯 Skills</span>
                    </div>
                </nav>

                <div className={styles.sa_content} style={{ padding: '16px 24px 20px' }}>
                    {view === 'learn' ? (
                        <div className={styles.sa_learn_container}>
                            <div className={styles.sa_learn_header}>
                                <div className={styles.sa_learn_icon} style={{ background: `${skill.color}15` }}>{skill.icon}</div>
                                <h1 className={styles.sa_learn_title}>Learn: {skill.title}</h1>
                            </div>

                            <div className={styles.sa_learn_layout}>
                                <aside className={styles.sa_learn_aside}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`${styles.sa_rule_btn} ${selectedLearnIdx === ri ? styles.sa_rule_btn_active : ''}`}
                                            style={{
                                                '--skill-color': skill.color,
                                                '--skill-bg-light': `${skill.color}15`
                                            }}>
                                            <div className={`${styles.sa_rule_num} ${selectedLearnIdx === ri ? styles.sa_rule_num_active : ''}`}
                                                style={{ '--skill-color': skill.color }}>RULE {ri + 1}</div>
                                            <span className={`${styles.sa_rule_title} ${selectedLearnIdx === ri ? styles.sa_rule_title_active : ''}`}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                <main className={styles.sa_learn_main}>
                                    <h3 className={styles.sa_learn_current_title} style={{ color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>

                                    <div className={styles.sa_formula_box} style={{ background: `${skill.color}05`, borderColor: `${skill.color}15` }}>
                                        <div className={styles.sa_formula_text} style={{ color: skill.color }}>
                                            <LatexText text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>

                                    <div className={styles.sa_learn_details}>
                                        <div>
                                            <h4 className={styles.sa_detail_label}>Explanation</h4>
                                            <p className={styles.sa_detail_p}><LatexText text={skill.learn.rules[selectedLearnIdx].d} /></p>
                                        </div>
                                        <div>
                                            <h4 className={styles.sa_detail_label} style={{ color: skill.color }}>Example</h4>
                                            <div className={styles.sa_example_box}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.sa_learn_actions}>
                                        <button className={styles.sa_btn_filled} style={{ background: skill.color, padding: '12px 24px' }} onClick={() => setView('practice')}>Try Practice →</button>
                                        <button className={styles.sa_btn_outline} style={{ padding: '12px 24px' }} onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <ShapesPracticeEngine
                            questionPool={skill.practice}
                            sampleSize={10}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                        />
                    ) : (
                        <ShapesAssessmentEngine
                            questions={skill.assessment()}
                            title={skill.title}
                            color={skill.color}
                            onBack={() => setView('list')}
                            onSecondaryBack={() => navigate('/shapes-and-angles')}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.sa_page}>
            <nav className={styles.sa_topic_nav}>
                <div className={styles.sa_back_link} onClick={() => navigate('/shapes-and-angles')}>← Back to Chapter</div>
                <div className={styles.sa_nav_links}>
                    <span className={styles.sa_nav_link} onClick={() => navigate('/shapes-and-angles/introduction')}>🌟 Intro</span>
                    <span className={styles.sa_nav_link} onClick={() => navigate('/shapes-and-angles/terminology')}>📖 Terminology</span>
                    <span className={styles.sa_nav_link_active}>🎯 Skills</span>
                </div>
            </nav>

            <div className={styles.sa_content}>
                <div className={styles.sa_hub_header}>
                    <h1 className={styles.sa_hub_title}>
                        Skills <span className={styles.sa_hub_title_accent}>Hub</span>
                    </h1>
                    <p className={styles.sa_hub_subtitle}>Master the geometry through targeted practice sessions.</p>
                </div>

                <div className={styles.sa_skills_grid}>
                    {SKILLS.map((s, i) => (
                        <div key={i} className={styles.sa_skill_card} style={{ '--skill-color': s.color }}>
                            <div className={styles.sa_skill_icon} style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
                            <div className={styles.sa_skill_info}>
                                <div className={styles.sa_skill_subtitle} style={{ color: s.color }}>{s.subtitle}</div>
                                <h3 className={styles.sa_skill_title}>{s.title}</h3>
                                <p className={styles.sa_skill_desc}>{s.desc}</p>
                            </div>
                            <div className={styles.sa_skill_actions}>
                                <button className={styles.sa_btn_outline} onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                <button className={styles.sa_btn_outline} onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                <button className={styles.sa_btn_filled} style={{ background: s.color }} onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
