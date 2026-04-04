import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../understanding_quadrilaterals.module.css';
import { NODE_IDS } from '@/lib/curriculumIds';

const SKILL_NODE_IDS = {
    'angle-sum-exterior-angles': NODE_IDS.g8MathUQAngleSumExterior,
    'kinds-of-quadrilaterals': NODE_IDS.g8MathUQKindsOfQuadrilaterals,
    'special-parallelograms': NODE_IDS.g8MathUQSpecialParallelograms,
};
import {
    angleSumAndExteriorAngles,
    kindsOfQuadrilaterals,
    specialParallelograms,
} from './UnderstandingQuadrilateralsSkillsData';
import { SkillFigure } from '../../QuadrilateralFigures';
import UnderstandingQuadrilateralsPracticeEngine from './Engines/UnderstandingQuadrilateralsPracticeEngine';
import UnderstandingQuadrilateralsAssessmentEngine from './Engines/UnderstandingQuadrilateralsAssessmentEngine';

const SKILLS = [
    {
        id: 'angle-sum-exterior-angles',
        num: 1,
        icon: 'A2',
        label: 'Angle Sum and Exterior Angles',
        desc: 'Use the chapter formulas for quadrilaterals, general polygons, and regular polygons.',
        color: '#1e40af',
        pool: angleSumAndExteriorAngles,
        learn: {
            concept: 'The angle section of the chapter grows from the quadrilateral sum to the general polygon sum. The key formulas are interior angle sum $(n-2) \\times 180^\\circ$, exterior angle sum $360^\\circ$, and for a regular polygon each exterior angle is $\\frac{360^\\circ}{n}$.',
            rules: [
                { icon: '1', title: 'Quadrilateral Angle Sum', body: 'A quadrilateral can be divided into 2 triangles. Since each triangle has angle sum $180^\\circ$, the sum of the interior angles of every quadrilateral is $360^\\circ$.' },
                { icon: '2', title: 'Interior Sum of an n-gon', body: 'From one vertex, an $n$-gon can be divided into $(n-2)$ triangles. Therefore, the sum of the interior angles of an $n$-gon is $(n-2) \\times 180^\\circ$.' },
                { icon: '3', title: 'Exterior Angle Sum', body: 'Take one exterior angle at each vertex of a convex polygon. The complete turn around the polygon is always $360^\\circ$, so the sum of the exterior angles is $360^\\circ$.' },
                { icon: '4', title: 'Regular Polygon Angles', body: 'In a regular polygon, all exterior angles are equal, so each exterior angle is $\\frac{360^\\circ}{n}$. Each interior angle can then be found using the interior sum or by subtracting from $180^\\circ$.' },
                { icon: '5', title: 'Finding Number of Sides', body: 'If the exterior angle of a regular polygon is known, the number of sides is $\\frac{360^\\circ}{\\text{one exterior angle}}$. This comes directly from the total exterior sum.' },
            ],
            examples: [
                { q: 'Find the fourth angle of a quadrilateral if the other 3 are $100^\\circ$, $90^\\circ$, and $80^\\circ$.', a: '$360^\\circ - 270^\\circ = 90^\\circ$.' },
                { q: 'Find the interior angle sum of a hexagon.', a: '$(6-2) \\times 180^\\circ = 720^\\circ$.' },
                { q: 'Each exterior angle of a regular pentagon is:', a: '$360^\\circ \\div 5 = 72^\\circ$.' },
            ],
            tip: 'Keep 3 anchors in mind: quadrilateral $360^\\circ$, polygon interior sum $(n-2) \\times 180^\\circ$, and total exterior sum $360^\\circ$.',
        },
    },
    {
        id: 'kinds-of-quadrilaterals',
        num: 2,
        icon: 'Q3',
        label: 'Kinds of Quadrilaterals',
        desc: 'Classify trapeziums, kites, and parallelograms and use the elements and properties of a parallelogram.',
        color: '#7c3aed',
        pool: kindsOfQuadrilaterals,
        learn: {
            concept: 'After studying polygons and angles, the chapter turns to quadrilateral families. The main kinds here are trapezium, kite, and parallelogram. Then the textbook studies the parts and properties of a parallelogram in detail.',
            rules: [
                { icon: '1', title: 'Trapezium', body: 'A trapezium is a quadrilateral with one pair of opposite sides parallel. In an isosceles trapezium, the non-parallel sides are equal.' },
                { icon: '2', title: 'Kite', body: 'A kite is a quadrilateral with 2 pairs of equal adjacent sides. The equal sides meet at common vertices, so the classification depends on adjacency, not on opposite sides.' },
                { icon: '3', title: 'Parallelogram', body: 'A parallelogram is a quadrilateral in which both pairs of opposite sides are parallel. This is the central family from which rectangle, rhombus, and square are later developed.' },
                { icon: '4', title: 'Elements of a Parallelogram', body: 'The important elements are sides, vertices, angles, and diagonals. If the diagonals $AC$ and $BD$ intersect at $O$, then the chapter studies the segments $AO$, $OC$, $BO$, and $OD$.' },
                { icon: '5', title: 'Properties of a Parallelogram', body: 'Opposite sides are equal, opposite angles are equal, adjacent angles are supplementary, and diagonals bisect each other. These 4 ideas are used repeatedly in examples and exercises.' },
            ],
            examples: [
                { q: 'If one angle of a parallelogram is $70^\\circ$, find an adjacent angle.', a: '$180^\\circ - 70^\\circ = 110^\\circ$.' },
                { q: 'In a parallelogram, diagonals meet at $O$. If $AO = 6$, find $OC$.', a: '$OC = 6$ because the diagonals bisect each other.' },
                { q: 'Which figure has one pair of opposite sides parallel?', a: 'A trapezium.' },
            ],
            tip: 'Identify the family first, then use the matching property: one pair parallel, equal adjacent sides, or both pairs parallel.',
        },
    },
    {
        id: 'special-parallelograms',
        num: 3,
        icon: 'S4',
        label: 'Special Parallelograms',
        desc: 'Study rhombus, rectangle, and square as special forms of a parallelogram and compare their diagonal properties.',
        color: '#b45309',
        pool: specialParallelograms,
        learn: {
            concept: 'The last part of the chapter shows how rhombus, rectangle, and square are all special parallelograms. Each one keeps the core parallelogram properties, then adds extra angle or side conditions.',
            rules: [
                { icon: '1', title: 'Rhombus', body: 'A rhombus is a parallelogram with all 4 sides equal. Its diagonals bisect each other at right angles, so they are perpendicular bisectors.' },
                { icon: '2', title: 'Rectangle', body: 'A rectangle is a parallelogram with 4 right angles. Its diagonals bisect each other and are equal in length.' },
                { icon: '3', title: 'Square', body: 'A square is both a rectangle and a rhombus. It has 4 equal sides, 4 right angles, and diagonals that are both equal and perpendicular.' },
                { icon: '4', title: 'Hierarchy of Quadrilaterals', body: 'A square belongs to several families at once. It is a rectangle, a rhombus, and a parallelogram, making it the most specialised figure in the chapter hierarchy.' },
                { icon: '5', title: 'Compare the Diagonals', body: 'Rhombus: diagonals are perpendicular. Rectangle: diagonals are equal. Square: diagonals are both equal and perpendicular. This comparison is one of the clearest chapter summaries.' },
            ],
            examples: [
                { q: 'Which shape is both a rectangle and a rhombus?', a: 'A square.' },
                { q: 'Which special parallelogram has equal diagonals?', a: 'A rectangle, and also a square.' },
                { q: 'Which special parallelogram has diagonals perpendicular to each other?', a: 'A rhombus, and also a square.' },
            ],
            tip: 'Think of the square as the overlap case: it keeps the strongest side condition and the strongest angle condition together.',
        },
    },
];

export default function UnderstandingQuadrilateralsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [splitPool, setSplitPool] = useState({ practice: [], assess: [] });
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const shuffleArr = (arr) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const openSkill = (skill, mode) => {
        if (!activeSkill || activeSkill.id !== skill.id) {
            setSplitPool({
                practice: shuffleArr(skill.pool.practice),
                assess: shuffleArr(skill.pool.assess),
            });
            setSelectedLearnIdx(0);
        }
        setActiveSkill(skill);
        setView(mode);
        window.scrollTo(0, 0);
    };

    const backToList = () => {
        setView('list');
        setActiveSkill(null);
        setSelectedLearnIdx(0);
        window.scrollTo(0, 0);
    };

    if (view === 'learn' && activeSkill) {
        const { learn, label, color, num } = activeSkill;
        const currentRule = learn.rules[selectedLearnIdx];

        return (
            <div className={styles['ccr-page']}>
                <nav className={styles['ccr-nav']}>
                    <button className={styles['ccr-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['ccr-nav-links']}>
                        <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals')}>Home</button>
                        <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals/terminology')}>Terminology</button>
                        <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Skills</button>
                    </div>
                </nav>

                <div className={styles['ccr-module-hero']}>
                    <h1 className={styles['ccr-module-title']}>Skill {num}: <span className={styles['ccr-accent-text']}>{label}</span></h1>
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
                                <span className={styles['ccr-learn-icon']} style={{ fontSize: 32, fontWeight: 900, color }}>{currentRule.icon}</span>
                            </div>

                            <div style={{ background: `${color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${color}10`, marginBottom: 30 }}>
                                <div style={{ fontSize: 18, lineHeight: 1.7, color: '#1e293b', fontWeight: 500 }}>
                                    <LatexText text={currentRule.body} />
                                </div>
                            </div>

                            <div className={styles['ccr-inline-figure']} style={{ marginBottom: 30 }}>
                                <SkillFigure skillId={activeSkill.id} topicIndex={selectedLearnIdx} color={color} />
                            </div>

                            <div className={styles['ccr-rule-split']}>
                                <div className={styles['ccr-rule-card']} style={{ background: '#fff', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.2, color: '#64748b', marginBottom: 12, fontWeight: 800 }}>Core Concept</h4>
                                    <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>
                                        <LatexText text={learn.concept} />
                                    </div>
                                </div>

                                <div className={styles['ccr-rule-card']} style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.2, color, marginBottom: 12, fontWeight: 800 }}>Quick Example</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>
                                            <LatexText text={learn.examples[selectedLearnIdx % learn.examples.length].q} />
                                        </div>
                                        <div style={{ color, fontWeight: 800 }}>
                                            {'->'} <LatexText text={learn.examples[selectedLearnIdx % learn.examples.length].a} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: 30, background: '#fffbeb', padding: 18, borderRadius: 16, border: '1px solid #fde68a', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 18, fontWeight: 900, color: '#92400e' }}>TIP</span>
                                <div style={{ fontSize: 14, color: '#92400e', lineHeight: 1.5, fontWeight: 500 }}>
                                    <LatexText text={learn.tip} />
                                </div>
                            </div>

                            <div className={styles['ccr-learn-footer']} style={{ marginTop: 40, borderTop: '1px solid #f1f5f9', paddingTop: 24, display: 'flex', gap: 12 }}>
                                {selectedLearnIdx < learn.rules.length - 1 ? (
                                    <button className={styles['ccr-btn-primary']} style={{ background: color }} onClick={() => setSelectedLearnIdx(selectedLearnIdx + 1)}>
                                        Next Topic {'->'}
                                    </button>
                                ) : (
                                    <button className={styles['ccr-btn-primary']} style={{ background: color }} onClick={() => openSkill(activeSkill, 'practice')}>
                                        Start Practice {'->'}
                                    </button>
                                )}
                                <button className={styles['ccr-btn-secondary']} onClick={() => openSkill(activeSkill, 'assess')}>
                                    Take Assessment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'practice' && activeSkill) {
        return (
            <div className={styles['ccr-page']}>
                <nav className={styles['ccr-nav']}>
                    <button className={styles['ccr-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['ccr-nav-links']}>
                        <button className={styles['ccr-nav-link']} onClick={() => openSkill(activeSkill, 'learn')}>Learn</button>
                        <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Practice</button>
                        <button className={styles['ccr-nav-link']} onClick={() => openSkill(activeSkill, 'assess')}>Assessment</button>
                    </div>
                </nav>
                <div className={styles['ccr-module-hero']}>
                    <h1 className={styles['ccr-module-title']}>Practice: <span className={styles['ccr-accent-text']}>{activeSkill.label}</span></h1>
                    <p className={styles['ccr-module-subtitle']}>Practice questions based on the textbook section</p>
                </div>
                <div className={styles['ccr-section']}>
                    <UnderstandingQuadrilateralsPracticeEngine
                        questionPool={splitPool.practice}
                        sampleSize={splitPool.practice.length}
                        title={activeSkill.label}
                        color={activeSkill.color}
                        onBack={backToList}
                        nodeId={SKILL_NODE_IDS[activeSkill.id]}
                    />
                </div>
            </div>
        );
    }

    if (view === 'assess' && activeSkill) {
        return (
            <div className={styles['ccr-page']}>
                <nav className={styles['ccr-nav']}>
                    <button className={styles['ccr-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['ccr-nav-links']}>
                        <button className={styles['ccr-nav-link']} onClick={() => openSkill(activeSkill, 'learn')}>Learn</button>
                        <button className={styles['ccr-nav-link']} onClick={() => openSkill(activeSkill, 'practice')}>Practice</button>
                        <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Assessment</button>
                    </div>
                </nav>
                <div className={styles['ccr-module-hero']}>
                    <h1 className={styles['ccr-module-title']}>Assessment: <span className={styles['ccr-accent-text']}>{activeSkill.label}</span></h1>
                    <p className={styles['ccr-module-subtitle']}>Short review set for this chapter block</p>
                </div>
                <div className={styles['ccr-section']}>
                    <UnderstandingQuadrilateralsAssessmentEngine
                        questionPool={splitPool.assess}
                        sampleSize={splitPool.assess.length}
                        title={activeSkill.label}
                        color={activeSkill.color}
                        onBack={backToList}
                        nodeId={SKILL_NODE_IDS[activeSkill.id]}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={styles['ccr-page']}>
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals')}>← Understanding Quadrilaterals</button>
                <div className={styles['ccr-nav-links']}>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals/introduction')}>Introduction</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/understanding-quadrilaterals/terminology')}>Terminology</button>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Skills</button>
                </div>
            </nav>

            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>Understanding Quadrilaterals <span className={styles['ccr-accent-text']}>Skills</span></h1>
                <p className={styles['ccr-module-subtitle']}>4 textbook-aligned skill blocks · Learn, Practice, and Assess</p>
            </div>

            <div className={styles['ccr-section']}>
                <div className={styles['ccr-skills-list']}>
                    {SKILLS.map((skill) => (
                        <div key={skill.id} className={styles['ccr-skill-card']} style={{ '--skill-color': skill.color }}>
                            <div className={styles['ccr-skill-info']}>
                                <div className={styles['ccr-skill-icon']} style={{ background: `${skill.color}15`, color: skill.color, fontSize: 18, fontWeight: 900 }}>{skill.icon}</div>
                                <div>
                                    <div className={styles['ccr-skill-meta']} style={{ fontSize: 11, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Skill {skill.num}</div>
                                    <div className={styles['ccr-skill-title']} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#1e293b', marginBottom: 4 }}>{skill.label}</div>
                                    <div className={styles['ccr-skill-desc']} style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                                        <LatexText text={skill.desc} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles['ccr-skill-actions']}>
                                <button
                                    className={styles['ccr-skill-btn-outline']}
                                    style={{ '--btn-color': skill.color }}
                                    onClick={() => openSkill(skill, 'learn')}
                                >
                                    Learn
                                </button>
                                <button
                                    className={styles['ccr-skill-btn-outline']}
                                    style={{ '--btn-color': skill.color }}
                                    onClick={() => openSkill(skill, 'practice')}
                                >
                                    Practice
                                </button>
                                <button
                                    className={styles['ccr-skill-btn-filled']}
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
