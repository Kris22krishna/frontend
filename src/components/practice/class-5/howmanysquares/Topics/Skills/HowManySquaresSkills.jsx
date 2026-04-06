import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HowManySquaresSkills.module.css';
import { LatexText } from '@/components/LatexText';
import HowManySquaresPracticeEngine from './Engines/HowManySquaresPracticeEngine';
import HowManySquaresAssessmentEngine from './Engines/HowManySquaresAssessmentEngine';
import { SKILLS } from './HowManySquaresSkillsData';

export default function HowManySquaresSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className={styles.hms_page} style={{ overflowY: 'auto' }}>
                <nav className={styles.hms_topic_nav}>
                    <button className={styles.hms_back_link} onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className={styles.hms_nav_links}>
                        <span className={styles.hms_nav_link_active}>🎯 Skills</span>
                    </div>
                </nav>

                <div className={styles.hms_content} style={{ padding: '16px 24px 20px' }}>
                    {view === 'learn' ? (
                        <div className={styles.hms_learn_container}>
                            <div className={styles.hms_learn_header}>
                                <div className={styles.hms_learn_icon} style={{ background: `${skill.color}15` }}>{skill.icon}</div>
                                <h1 className={styles.hms_learn_title}>Learn: {skill.title}</h1>
                            </div>

                            <div className={styles.hms_learn_layout}>
                                <aside className={styles.hms_learn_aside}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            className={`${styles.hms_rule_btn} ${selectedLearnIdx === ri ? styles.hms_rule_btn_active : ''}`}
                                            style={{
                                                '--skill-color': skill.color,
                                                '--skill-bg-light': `${skill.color}15`
                                            }}>
                                            <div className={`${styles.hms_rule_num} ${selectedLearnIdx === ri ? styles.hms_rule_num_active : ''}`}
                                                style={{ '--skill-color': skill.color }}>RULE {ri + 1}</div>
                                            <span className={`${styles.hms_rule_title} ${selectedLearnIdx === ri ? styles.hms_rule_title_active : ''}`}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                <main className={styles.hms_learn_main}>
                                    <h3 className={styles.hms_learn_current_title} style={{ color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>

                                    <div className={styles.hms_formula_box} style={{ background: `${skill.color}05`, borderColor: `${skill.color}15` }}>
                                        <div className={styles.hms_formula_text} style={{ color: skill.color }}>
                                            <LatexText text={skill.learn.rules[selectedLearnIdx].f} />
                                        </div>
                                    </div>

                                    <div className={styles.hms_learn_details}>
                                        <div>
                                            <h4 className={styles.hms_detail_label}>Explanation</h4>
                                            <p className={styles.hms_detail_p}><LatexText text={skill.learn.rules[selectedLearnIdx].d} /></p>
                                        </div>
                                        <div>
                                            <h4 className={styles.hms_detail_label} style={{ color: skill.color }}>Example</h4>
                                            <div className={styles.hms_example_box}>
                                                <LatexText text={skill.learn.rules[selectedLearnIdx].ex} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.hms_learn_actions}>
                                        <button className={styles.hms_btn_filled} style={{ background: skill.color, padding: '12px 24px' }} onClick={() => setView('practice')}>Try Practice →</button>
                                        <button className={styles.hms_btn_outline} style={{ padding: '12px 24px' }} onClick={() => setView('assessment')}>Take Assessment</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : view === 'practice' ? (
                        <HowManySquaresPracticeEngine
                            questionPool={skill.practice}
                            sampleSize={10}
                            title={skill.title}
                            color={skill.color}
                            nodeId={skill.nodeId}
                            onBack={() => setView('list')}
                        />
                    ) : (
                        <HowManySquaresAssessmentEngine
                            questions={skill.assessment()}
                            title={skill.title}
                            color={skill.color}
                            nodeId={skill.nodeId}
                            onBack={() => setView('list')}
                            onSecondaryBack={() => navigate('/middle/grade/5/how-many-squares')}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.hms_page}>
            <nav className={styles.hms_topic_nav}>
                <div className={styles.hms_back_link} onClick={() => navigate('/middle/grade/5/how-many-squares')}>← Back to Chapter</div>
                <div className={styles.hms_nav_links}>
                    <span className={styles.hms_nav_link_active}>🎯 Skills</span>
                </div>
            </nav>

            <div className={styles.hms_content}>
                <div className={styles.hms_hub_header}>
                    <h1 className={styles.hms_hub_title}>
                        Skills <span className={styles.hms_hub_title_accent}>Hub</span>
                    </h1>
                    <p className={styles.hms_hub_subtitle}>Master counting squares through targeted practice sessions.</p>
                </div>

                <div className={styles.hms_skills_grid}>
                    {SKILLS.map((s, i) => (
                        <div key={i} className={styles.hms_skill_card} style={{ '--skill-color': s.color }}>
                            <div className={styles.hms_skill_icon} style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
                            <div className={styles.hms_skill_info}>
                                <div className={styles.hms_skill_subtitle} style={{ color: s.color }}>{s.subtitle}</div>
                                <h3 className={styles.hms_skill_title}>{s.title}</h3>
                                <p className={styles.hms_skill_desc}>{s.desc}</p>
                            </div>
                            <div className={styles.hms_skill_actions}>
                                <button className={styles.hms_btn_outline} onClick={() => { setActiveSkill(i); setView('learn'); }}>Learn</button>
                                <button className={styles.hms_btn_outline} onClick={() => { setActiveSkill(i); setView('practice'); }}>Practice</button>
                                <button className={styles.hms_btn_filled} style={{ background: s.color }} onClick={() => { setActiveSkill(i); setView('assessment'); }}>Assess</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
