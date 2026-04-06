import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '../../../../../LatexText';
import styles from '../../data_handling.module.css';
import { NODE_IDS } from '@/lib/curriculumIds';

const SKILL_NODE_IDS = {
    'organising-data': NODE_IDS.g8MathDHOrganisingData,
    'bar-graphs': NODE_IDS.g8MathDHBarGraphs,
    'pie-charts': NODE_IDS.g8MathDHPieCharts,
    'probability': NODE_IDS.g8MathDHProbability,
};
import {
    organisingDataQuestions,
    barGraphQuestions,
    pieChartQuestions,
    probabilityQuestions,
} from './DataHandlingSkillsData';
import DHPracticeEngine from './Engines/DHPracticeEngine';
import DHAssessmentEngine from './Engines/DHAssessmentEngine';

// Figures
import FrequencyTableFig from '@/assets/images/grade8/data_handling/frequency_table.png';
import BarGraphFig from '@/assets/images/grade8/data_handling/bar_graph.png';
import PieChartFig from '@/assets/images/grade8/data_handling/pie_chart.png';
import ProbabilityFig from '@/assets/images/grade8/data_handling/probability.png';

const FIGURE_MAP = {
    'organising-data': FrequencyTableFig,
    'bar-graphs': BarGraphFig,
    'pie-charts': PieChartFig,
    'probability': ProbabilityFig,
};

const SKILLS = [
    {
        id: 'organising-data',
        num: 1,
        icon: '🗂️',
        label: 'Organising Data',
        desc: 'Raw data, tally marks, frequency tables, grouped distributions, class marks.',
        color: '#0f766e',
        pool: organisingDataQuestions,
        learn: {
            concept: 'Data handling begins with raw data — a collection of unorganised facts or numbers. We organise it using frequency tables and then grouped frequency distributions for large data sets.',
            rules: [
                { icon: '📋', title: 'Frequency Table', body: 'Lists each distinct value and its frequency (how many times it appears). Works for small, discrete data.' },
                { icon: '📊', title: 'Grouped Frequency Distribution', body: 'Groups data into class intervals (e.g. $0–10, 10–20$) when too many distinct values exist.' },
                { icon: '🎯', title: 'Class Mark', body: 'The midpoint of a class interval: $\\text{Class Mark} = \\frac{\\text{Lower limit} + \\text{Upper limit}}{2}$.' },
                { icon: '⚖️', title: 'Tally Marks', body: 'A quick visual method: $||||$ and a diagonal line across $4 = 5$. The diagonal makes counting in groups of $5$ easy.' },
            ],
            examples: [
                { q: 'Data: $4, 5, 4, 6, 5, 4$. Frequency of $4$?', a: '$3$ (appears at positions $1, 3, 6$)' },
                { q: 'Class interval $20–30$. Class mark?', a: '$\\frac{20 + 30}{2} = 25$' },
            ],
            tip: '💡 Always double-check that the sum of all frequencies equals the total number of observations.',
        },
    },
    {
        id: 'bar-graphs',
        num: 2,
        icon: '📊',
        label: 'Bar Graphs',
        desc: 'Drawing and reading bar graphs and double bar graphs with uniform scale.',
        color: '#1e40af',
        pool: barGraphQuestions,
        learn: {
            concept: 'A bar graph represents data using rectangular bars of equal width. Bar height is proportional to frequency. A double bar graph allows side-by-side comparison of two data sets.',
            rules: [
                { icon: '📏', title: 'Uniform Bars', body: 'All bars must have the same width. Bars are separated by gaps to show categories are discrete.' },
                { icon: '📐', title: 'Scale', body: 'The Y-axis must use a consistent scale. Choose a scale like $1 \\text{ unit} = 5 \\text{ students}$ that fits all values.' },
                { icon: '🎨', title: 'Double Bar Graph', body: 'Two sets of data are plotted side-by-side at each category, with different colours and a legend.' },
                { icon: '📋', title: 'Labels', body: 'Every bar graph must have: a title, labelled X and Y axes, a scale, and a legend for double graphs.' },
            ],
            examples: [
                { q: 'Bar height = $7 \\text{ cm}$, scale = $1 \\text{ cm} : 10 \\text{ students}$. How many students?', a: '$7 \\times 10 = 70 \\text{ students}$' },
                { q: 'Students: $\\text{Maths}=40, \\text{Sci}=50, \\text{Eng}=30$. Which subject is least popular?', a: 'English (shortest bar, frequency $30$)' },
            ],
            tip: '💡 In a double bar graph, always use a legend so readers know which colour represents which dataset.',
        },
    },
    {
        id: 'pie-charts',
        num: 3,
        icon: '🥧',
        label: 'Pie Charts',
        desc: 'Drawing and interpreting pie charts (circle graphs) using central angles.',
        color: '#7c3aed',
        pool: pieChartQuestions,
        learn: {
            concept: 'A pie chart divides a circle into sectors. Each sector area is proportional to the frequency as a fraction of the total. The full circle = $360^\\circ = 100\\%$.',
            rules: [
                { icon: '🔵', title: 'Central Angle Formula', body: '$\\text{Central Angle} = \\frac{\\text{Frequency}}{\\text{Total}} \\times 360^\\circ$. Compute this for each category.' },
                { icon: '📐', title: 'Drawing Steps', body: 'Draw a circle. Use a protractor to mark off each sector angle consecutively. Label each sector.' },
                { icon: '➕', title: 'Sum Check', body: 'All central angles must add up to exactly $360^\\circ$. Ensure accuracy while drawing.' },
                { icon: '💡', title: 'Percentage Conversion', body: '$\\frac{\\text{Sector angle } (^\\circ)}{360} \\times 100 = \\text{Percentage of total}$.' },
            ],
            examples: [
                { q: '$\text{Sports} = 60$ out of $240$ total. Central angle?', a: '$\\frac{60}{240} \\times 360^\\circ = 90^\\circ$' },
                { q: 'A sector has angle $120^\\circ$. What $\\%$ of the total?', a: '$\\frac{120}{360} \\times 100 = 33.3\\%$' },
            ],
            tip: '💡 If the central angle exceeds $180^\\circ$, the sector is bigger than half the circle.',
        },
    },
    {
        id: 'probability',
        num: 4,
        icon: '🎲',
        label: 'Probability',
        desc: 'Chance and probability: outcomes, events, $P(E) = \\frac{\\text{favourable}}{\\text{total}}$.',
        color: '#b45309',
        pool: probabilityQuestions,
        learn: {
            concept: 'Probability measures how likely an event is to occur. It ranges from $0$ (impossible) to $1$ (certain). We use equally likely outcomes.',
            rules: [
                { icon: '🎯', title: 'Theoretical Probability', body: '$\\text{P}(E) = \\frac{\\text{Number of favourable outcomes}}{\\text{Total number of equally likely outcomes}}$.' },
                { icon: '🔄', title: 'Complementary Events', body: '$\\text{P}(E) + \\text{P}(\\text{not } E) = 1$. So $\\text{P}(\\text{not } E) = 1 - \\text{P}(E)$.' },
                { icon: '📏', title: 'Range', body: '$0 \\le \\text{P}(E) \\le 1$. $\\text{P}(\\text{impossible}) = 0$. $\\text{P}(\\text{certain}) = 1$.' },
                { icon: '🎲', title: 'Sample Space', body: 'The set of ALL possible outcomes. For a die: $\\{1, 2, 3, 4, 5, 6\\}$.' },
            ],
            examples: [
                { q: 'Die thrown. $P(\\text{getting } 4)$?', a: '$P = \\frac{1}{6}$ (only one face shows $4$ out of $6$ faces)' },
                { q: 'Bag: $3 \\text{ red}, 7 \\text{ blue}$. $P(\\text{red})$?', a: '$P = \\frac{3}{3+7} = \\frac{3}{10} = 0.3$' },
            ],
            tip: '💡 Always identify the sample space (total equally likely outcomes) before calculating any probability.',
        },
    },
];

export default function DataHandlingSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'learn' | 'practice' | 'assess'
    const [activeSkill, setActiveSkill] = useState(null);
    const [splitPool, setSplitPool] = useState({ practice: [], assess: [] });

    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Shuffle helper
    const shuffleArr = (arr) => {
        const c = [...arr];
        for (let i = c.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [c[i], c[j]] = [c[j], c[i]];
        }
        return c;
    };

    const openSkill = (skill, mode) => {
        // Only re-shuffle when a NEW skill is selected, so practice & assess
        // stay on their own non-overlapping slices within the same session.
        if (!activeSkill || activeSkill.id !== skill.id) {
            // Assessment Engine requires option-based questions (no 'fill' type)
            const optionBased = skill.pool.filter(q => q.type !== 'fill');
            const fillBased = skill.pool.filter(q => q.type === 'fill');
            
            // Assessment gets exactly 10 option-based questions drawn randomly
            const shuffledOptionBased = shuffleArr(optionBased);
            const assessSet = shuffledOptionBased.slice(0, 10);
            
            // Practice gets the remaining option-based questions PLUS all the fill questions
            const practicePool = [...shuffledOptionBased.slice(10), ...fillBased];
            const practiceSet = shuffleArr(practicePool);

            setSplitPool({
                practice: practiceSet, // exactly 20 questions
                assess:   assessSet,   // exactly 10 MCQ/TF questions
            });
        }
        setActiveSkill(skill);
        setView(mode);
        window.scrollTo(0, 0);
    };

    const backToList = () => {
        setView('list');
        setActiveSkill(null);
        window.scrollTo(0, 0);
    };

    // ── LEARN VIEW ──────────────────────────────────────────────────────────
    if (view === 'learn' && activeSkill) {
        const { learn, label, color, num } = activeSkill;
        return (
            <div className={styles['dh-page']}>
                <nav className={styles['dh-nav']}>
                    <button className={styles['dh-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['dh-nav-links']}>
                        <button className={styles['dh-nav-link']} onClick={() => navigate('/senior/grade/8/data-handling')}>Home</button>
                        <button className={styles['dh-nav-link']} onClick={() => navigate('/senior/grade/8/data-handling/terminology')}>Terminology</button>
                        <button className={`${styles['dh-nav-link']} ${styles['dh-nav-link--active']}`}>Skills</button>
                    </div>
                </nav>
                <div className={styles['dh-module-hero']}>
                    <h1 className={styles['dh-module-title']}>Skill {num}: <span className={styles['dh-accent-text']}>{label}</span></h1>
                    <p className={styles['dh-module-subtitle']}>Learn the concepts and rules</p>
                </div>

                <div className={styles['dh-section']}>
                    <div className={styles['dh-learn-grid']}>
                        {/* Sidebar */}
                        <div className={styles['dh-learn-sidebar']}>
                            {SKILLS.map((s) => (
                                <button
                                    key={s.id}
                                    className={`${styles['dh-sidebar-btn']}${s.id === activeSkill.id ? ` ${styles.active}` : ''}`}
                                    style={{ '--skill-color': s.color }}
                                    onClick={() => openSkill(s, 'learn')}
                                >
                                    <span className={styles['dh-sidebar-btn-icon']}>{s.icon}</span>
                                    <span className={styles['dh-sidebar-btn-num']}>{s.num}</span>
                                    <span className={styles['dh-sidebar-btn-title']}>{s.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Detail */}
                        <div className={`${styles['dh-details-window']} ${styles['dh-details-window-anim']}`}>
                            <div className={styles['dh-learn-header-row']} style={{ '--skill-color': color }}>
                                <div>
                                    <div className={styles['dh-learn-skill-meta']}>Skill {num}</div>
                                    <h2 className={styles['dh-learn-title']}>{label}</h2>
                                </div>
                                <span className={styles['dh-learn-icon']}>{activeSkill.icon}</span>
                            </div>

                            <div className={styles['dh-learn-concept-row']}>
                                <p className={styles['dh-learn-concept']}>
                                    <LatexText text={learn.concept} />
                                </p>
                                <div className={styles['dh-learn-figure']}>
                                    <img src={FIGURE_MAP[activeSkill.id]} alt={label} className={styles['dh-learn-figure-img']} />
                                </div>
                            </div>

                            <div className={styles['dh-rule-split']}>
                                {learn.rules.map((r, i) => (
                                    <div key={i} className={styles['dh-rule-card']} style={{ '--skill-color': color }}>
                                        <div className={styles['dh-rule-icon']}>{r.icon}</div>
                                        <div className={styles['dh-rule-title']}>{r.title}</div>
                                        <div className={styles['dh-rule-body']}>
                                            <LatexText text={r.body} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: 24 }}>
                                <div className={styles['dh-examples-title']}>Examples</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {learn.examples.map((ex, i) => (
                                        <div key={i} className={styles['dh-example-card']} style={{ '--skill-color': color }}>
                                            <div className={styles['dh-example-question']}>
                                                <LatexText text={ex.q} />
                                            </div>
                                            <div className={styles['dh-example-answer']}>
                                                → <LatexText text={ex.a} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles['dh-tip-box']}>
                                <LatexText text={learn.tip} />
                            </div>

                            <div className={styles['dh-learn-footer']}>
                                <button className={styles['dh-btn-primary']} style={{ background: color }} onClick={() => openSkill(activeSkill, 'practice')}>
                                    Practice →
                                </button>
                                <button className={styles['dh-btn-secondary']} onClick={() => openSkill(activeSkill, 'assess')}>
                                    Assessment →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── PRACTICE VIEW ───────────────────────────────────────────────────────
    if (view === 'practice' && activeSkill) {
        return (
            <div className={styles['dh-page']}>
                <nav className={styles['dh-nav']}>
                    <button className={styles['dh-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['dh-nav-links']}>
                        <button className={styles['dh-nav-link']} onClick={() => openSkill(activeSkill, 'learn')}>Learn</button>
                        <button className={`${styles['dh-nav-link']} ${styles['dh-nav-link--active']}`}>Practice</button>
                        <button className={styles['dh-nav-link']} onClick={() => openSkill(activeSkill, 'assess')}>Assessment</button>
                    </div>
                </nav>
                <div className={styles['dh-module-hero']}>
                    <h1 className={styles['dh-module-title']}>Practice: <span className={styles['dh-accent-text']}>{activeSkill.label}</span></h1>
                    <p className={styles['dh-module-subtitle']}>20 questions · All types</p>
                </div>
                <div className={styles['dh-section']}>
                    <DHPracticeEngine
                        questionPool={splitPool.practice}
                        sampleSize={20}
                        title={activeSkill.label}
                        color={activeSkill.color}
                        onBack={backToList}
                        nodeId={SKILL_NODE_IDS[activeSkill.id]}
                    />
                </div>
            </div>
        );
    }

    // ── ASSESSMENT VIEW ─────────────────────────────────────────────────────
    if (view === 'assess' && activeSkill) {
        return (
            <div className={styles['dh-page']}>
                <nav className={styles['dh-nav']}>
                    <button className={styles['dh-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['dh-nav-links']}>
                        <button className={styles['dh-nav-link']} onClick={() => openSkill(activeSkill, 'learn')}>Learn</button>
                        <button className={styles['dh-nav-link']} onClick={() => openSkill(activeSkill, 'practice')}>Practice</button>
                        <button className={`${styles['dh-nav-link']} ${styles['dh-nav-link--active']}`}>Assessment</button>
                    </div>
                </nav>
                <div className={styles['dh-module-hero']}>
                    <h1 className={styles['dh-module-title']}>Assessment: <span className={styles['dh-accent-text']}>{activeSkill.label}</span></h1>
                    <p className={styles['dh-module-subtitle']}>10 MCQ questions · 10-minute timer</p>
                </div>
                <div className={styles['dh-section']}>
                    <DHAssessmentEngine
                        questionPool={splitPool.assess}
                        sampleSize={10}
                        title={activeSkill.label}
                        color={activeSkill.color}
                        onBack={backToList}
                        nodeId={SKILL_NODE_IDS[activeSkill.id]}
                    />
                </div>
            </div>
        );
    }

    // ── SKILLS LIST ──────────────────────────────────────────────────────────
    return (
        <div className={styles['dh-page']}>
            <nav className={styles['dh-nav']}>
                <button className={styles['dh-nav-back']} onClick={() => navigate('/senior/grade/8/data-handling')}>← Data Handling</button>
                <div className={styles['dh-nav-links']}>
                    <button className={styles['dh-nav-link']} onClick={() => navigate('/senior/grade/8/data-handling/introduction')}>Introduction</button>
                    <button className={styles['dh-nav-link']} onClick={() => navigate('/senior/grade/8/data-handling/terminology')}>Terminology</button>
                    <button className={`${styles['dh-nav-link']} ${styles['dh-nav-link--active']}`}>Skills</button>
                </div>
            </nav>

            <div className={styles['dh-module-hero']}>
                <h1 className={styles['dh-module-title']}>Data Handling <span className={styles['dh-accent-text']}>Skills</span></h1>
                <p className={styles['dh-module-subtitle']}>4 core skills · Learn, Practice, and Assess</p>
            </div>

            <div className={styles['dh-section']}>
                <div className={styles['dh-skills-list']}>
                    {SKILLS.map((skill) => (
                        <div key={skill.id} className={styles['dh-skill-card']} style={{ '--skill-color': skill.color }}>
                            <div className={styles['dh-skill-info']}>
                                <div className={styles['dh-skill-icon']}>{skill.icon}</div>
                                <div>
                                    <div className={styles['dh-skill-meta']}>Skill {skill.num}</div>
                                    <div className={styles['dh-skill-title']}>{skill.label}</div>
                                    <div className={styles['dh-skill-desc']}>
                                        <LatexText text={skill.desc} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles['dh-skill-actions']}>
                                <button
                                    className={styles['dh-skill-btn-outline']}
                                    style={{ '--btn-color': skill.color }}
                                    onClick={() => openSkill(skill, 'learn')}
                                >
                                    Learn
                                </button>
                                <button
                                    className={styles['dh-skill-btn-outline']}
                                    style={{ '--btn-color': skill.color }}
                                    onClick={() => openSkill(skill, 'practice')}
                                >
                                    Practice
                                </button>
                                <button
                                    className={styles['dh-skill-btn-filled']}
                                    style={{ '--btn-color': skill.color }}
                                    onClick={() => openSkill(skill, 'assess')}
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
