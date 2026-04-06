import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../cubes_and_cube_roots.module.css';
import { NODE_IDS } from '@/lib/curriculumIds';

const SKILL_NODE_IDS = {
    'perfect-cubes': NODE_IDS.g8MathCCRPerfectCubes,
    'prime-factorisation': NODE_IDS.g8MathCCRPrimeFactorisation,
    'estimating-roots': NODE_IDS.g8MathCCREstimatingRoots,
    'missing-multiples': NODE_IDS.g8MathCCRMissingMultiples,
};
import {
    findingPerfectCubes,
    primeFactorisation,
    estimatingRoots,
    missingMultiples,
} from './CubesSkillsData';
import CubesPracticeEngine from './Engines/CubesPracticeEngine';
import CubesAssessmentEngine from './Engines/CubesAssessmentEngine';

// Hardcoding null figures since we don't have matching images for this chapter yet.
// We will skip rendering images in the learn section.
const SKILLS = [
    {
        id: 'perfect-cubes',
        num: 1,
        icon: '🧊',
        label: 'Finding Perfect Cubes',
        desc: 'Understand how numbers behave when multiplied by themselves three times.',
        color: '#0f766e',
        pool: findingPerfectCubes,
        learn: {
            concept: 'A perfect cube is the result of multiplying an integer by itself three times. For example, $3 \\times 3 \\times 3 = 27$.',
            rules: [
                { icon: '⚖️', title: 'Odd vs Even Cubes', body: 'The cube of an even number is always even. The cube of an odd number is always odd.' },
                { icon: '🔢', title: 'Unit Digits matching', body: 'Cubes of numbers ending in $1,4,5,6,9,0$ end in the exact same digit.' },
                { icon: '🔄', title: 'The exceptions', body: 'Numbers ending in $2$ have cubes ending in $8$ (and vice versa). Numbers ending in $3$ have cubes ending in $7$ (and vice versa).' },
                { icon: '⏳', title: 'Trailing Zeros', body: 'A perfect cube will always have zeros in multiples of $3$ (e.g., $1000$, $1000000$).' },
            ],
            examples: [
                { q: 'Is $125$ an odd or even perfect cube?', a: 'Odd, because $5$ is an odd number.' },
                { q: 'What is the sum of cubes: $1^3 + 2^3 + 3^3$?', a: '$1 + 8 + 27 = 36$.' },
            ],
            tip: '💡 Memorize cubes from $1$ to $10$ to solve problems significantly faster.',
        },
    },
    {
        id: 'prime-factorisation',
        num: 2,
        icon: '🌳',
        label: 'Prime Factorisation',
        desc: 'Using prime factors and triplets to determine if a number is a cube, and finding its root.',
        color: '#1e40af',
        pool: primeFactorisation,
        learn: {
            concept: 'By breaking a number into its prime factors, we can easily check if it is a perfect cube and calculate its cube root without estimation.',
            rules: [
                { icon: '🧩', title: 'Forming Triplets', body: 'In prime factorisation, every factor must appear $3$ times (a triplet) for the number to be a perfect cube.' },
                { icon: '🧮', title: 'Extracting Roots', body: 'Take precisely one number from each triplet, and multiply them together to get the cube root.' },
                { icon: '🔪', title: 'Division Tree', body: 'Continually divide by the smallest prime numbers ($2$, $3$, $5$, $7$) to expose the prime structure.' },
                { icon: '🚫', title: 'Incomplete Groups', body: 'If even one prime factor is left without being in a triplet, the number is NOT a perfect cube.' },
            ],
            examples: [
                { q: 'Is $216$ a cube? $216 = 2 \\times 2 \\times 2 \\times 3 \\times 3 \\times 3$', a: 'Yes. $2$ forms a triplet and $3$ forms a triplet.' },
                { q: 'What is the root of $216$?', a: 'Take one from each group: $2 \\times 3 = 6$. so $\\sqrt[3]{216} = 6$.' },
            ],
            tip: '💡 If you are evaluating a large number ending in $5$, immediately start dividing by $5$.',
        },
    },
    {
        id: 'estimating-roots',
        num: 3,
        icon: '👀',
        label: 'Estimating Roots',
        desc: 'Finding cube roots of massive numbers visually through grouping by 3.',
        color: '#7c3aed',
        pool: estimatingRoots,
        learn: {
            concept: 'For large numbers, prime factorisation can take a long time. If we know the number is a perfect cube, we can estimate its root just by looking at its digits.',
            rules: [
                { icon: '📐', title: 'Group in Threes', body: 'Start from the rightmost digit, draw a bar over groups of $3$ digits. Each group will give $1$ digit of the cube root.' },
                { icon: '1️⃣', title: 'Unit Digit extraction', body: 'Look at the last digit of the rightmost group. Use the unit digit rules to determine the unit digit of the cube root.' },
                { icon: '🔟', title: 'Tens Digit extraction', body: 'Look at the remaining leftmost group. Find the largest cube that is less than or equal to this number. Its root is your tens digit.' },
                { icon: '⚡', title: 'Instant Math', body: 'Using this, $6$-digit number roots can be found entirely in your head.' },
            ],
            examples: [
                { q: 'Find $\\sqrt[3]{17576}$.', a: 'Right group $576$ ends in $6$, so unit digit is $6$. Left group $17$. $2^3 = 8 \\le 17$. Tens digit is $2$. Result = $26$.' },
                { q: 'Find $\\sqrt[3]{91125}$.', a: 'Right group gives $5$. Left group $91$. $4^3 = 64 \\le 91$. Result = $45$.' },
            ],
            tip: '💡 This method only works nicely if you are already certain the original number is a perfect cube.',
        },
    },
    {
        id: 'missing-multiples',
        num: 4,
        icon: '➕',
        label: 'Missing Multiples',
        desc: 'Identifying the smallest number to multiply or divide to build a perfect cube.',
        color: '#b45309',
        pool: missingMultiples,
        learn: {
            concept: 'When a number is not a perfect cube, its prime factors have "incomplete" groups. We can force it to become a cube by either supplying the missing factors or discarding the extra ones.',
            rules: [
                { icon: '🔍', title: 'Diagnose First', body: 'Perform full prime factorisation to see which numbers are NOT in triplets.' },
                { icon: '✖️', title: 'To Multiply', body: 'Add however many of that prime factor is missing to complete the set of $3$. (e.g. if you have $5^2$, multiply by $5^1$).' },
                { icon: '➗', title: 'To Divide', body: 'Remove the prime factors entirely by dividing them out. (e.g. if you have an extra $7^2$, divide by $49$).' },
                { icon: '📦', title: 'Geometric Scale', body: 'Used when asking "How many sides of $x$ cuboids do we need to stack to form a big cube?"' },
            ],
            examples: [
                { q: 'Smallest number to multiply $24$ to get a perfect cube?', a: '$24 = 2^3 \\times 3$. The factor $3$ needs two more elements ($3^2 = 9$). So multiply by $9$.' },
                { q: 'Smallest number to divide $128$ to get a perfect cube?', a: '$128 = 2^7 = (2^3 \\times 2^3) \\times 2$. Divide by $2$ to remove the incomplete factor.' },
            ],
            tip: '💡 Always read the question carefully to see if it asks what to MULTIPLY or what to DIVIDE.',
        },
    },
];

export default function CubesSkills() {
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
        if (!activeSkill || activeSkill.id !== skill.id) {
            // New structure provides separate pools for practice and assessment
            setSplitPool({
                practice: shuffleArr(skill.pool.practice),
                assess:   shuffleArr(skill.pool.assess),
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
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    if (view === 'learn' && activeSkill) {
        const { learn, label, color, num } = activeSkill;
        const currentRule = learn.rules[selectedLearnIdx];

        return (
            <div className={styles['ccr-page']}>
                <nav className={styles['ccr-nav']}>
                    <button className={styles['ccr-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['ccr-nav-links']}>
                        <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots')}>Home</button>
                        <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots/terminology')}>Terminology</button>
                        <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Skills</button>
                    </div>
                </nav>
                <div className={styles['ccr-module-hero']}>
                    <h1 className={styles['ccr-module-title']}>Skill {num}: <span className={styles['ccr-accent-text']}>{label}</span></h1>
                    <p className={styles['ccr-module-subtitle']}>Mastering the concepts</p>
                </div>

                <div className={styles['ccr-section']}>
                    <div className={styles['ccr-learn-grid']}>
                        {/* Sidebar: Sub-topics (Rules) */}
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
                                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4 }}>Complete all {learn.rules.length} topics to unlock practice.</div>
                                </div>
                            </div>
                        </div>

                        {/* Detail: Rule Content as Cards */}
                        <div className={`${styles['ccr-details-window']} ${styles['ccr-details-window-anim']}`} key={selectedLearnIdx}>
                            <div className={styles['ccr-learn-header-row']} style={{ '--skill-color': color, marginBottom: 28 }}>
                                <div>
                                    <div className={styles['ccr-learn-skill-meta']}>TOPIC {selectedLearnIdx + 1} of {learn.rules.length}</div>
                                    <h2 className={styles['ccr-learn-title']} style={{ color: '#1e293b' }}>{currentRule.title}</h2>
                                </div>
                                <span className={styles['ccr-learn-icon']} style={{ fontSize: 40 }}>{currentRule.icon}</span>
                            </div>

                            <div style={{ background: `${color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${color}10`, marginBottom: 30 }}>
                                <div style={{ fontSize: 18, lineHeight: 1.7, color: '#1e293b', fontWeight: 500 }}>
                                    <LatexText text={currentRule.body} />
                                </div>
                            </div>

                            <div className={styles['ccr-rule-split']}>
                                <div className={styles['ccr-rule-card']} style={{ background: '#fff', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.2, color: '#64748b', marginBottom: 12, fontWeight: 800 }}>Core Concept</h4>
                                    <div style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>
                                        <LatexText text={learn.concept} />
                                    </div>
                                </div>

                                <div className={styles['ccr-rule-card']} style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 11, letterSpacing: 1.2, color: color, marginBottom: 12, fontWeight: 800 }}>Quick Example</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>
                                            <LatexText text={learn.examples[selectedLearnIdx % learn.examples.length].q} />
                                        </div>
                                        <div style={{ color: color, fontWeight: 800 }}>
                                            → <LatexText text={learn.examples[selectedLearnIdx % learn.examples.length].a} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: 30, background: '#fffbeb', padding: 18, borderRadius: 16, border: '1px solid #fde68a', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 20 }}>💡</span>
                                <div style={{ fontSize: 14, color: '#92400e', lineHeight: 1.5, fontWeight: 500 }}>
                                    <LatexText text={learn.tip} />
                                </div>
                            </div>

                            <div className={styles['ccr-learn-footer']} style={{ marginTop: 40, borderTop: '1px solid #f1f5f9', paddingTop: 24, display: 'flex', gap: 12 }}>
                                {selectedLearnIdx < learn.rules.length - 1 ? (
                                    <button className={styles['ccr-btn-primary']} style={{ background: color }} onClick={() => setSelectedLearnIdx(selectedLearnIdx + 1)}>
                                        Next Topic →
                                    </button>
                                ) : (
                                    <button className={styles['ccr-btn-primary']} style={{ background: color }} onClick={() => openSkill(activeSkill, 'practice')}>
                                        Start Practice →
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

    // ── PRACTICE VIEW ───────────────────────────────────────────────────────
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
                    <p className={styles['ccr-module-subtitle']}>Practice Questions</p>
                </div>
                <div className={styles['ccr-section']}>
                    <CubesPracticeEngine
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

    // ── ASSESSMENT VIEW ─────────────────────────────────────────────────────
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
                    <p className={styles['ccr-module-subtitle']}>MCQ questions</p>
                </div>
                <div className={styles['ccr-section']}>
                    <CubesAssessmentEngine
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

    // ── SKILLS LIST ──────────────────────────────────────────────────────────
    return (
        <div className={styles['ccr-page']}>
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots')}>← Cubes & Cube Roots</button>
                <div className={styles['ccr-nav-links']}>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots/introduction')}>Introduction</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots/terminology')}>Terminology</button>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Skills</button>
                </div>
            </nav>

            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>Cubes & Cube Roots <span className={styles['ccr-accent-text']}>Skills</span></h1>
                <p className={styles['ccr-module-subtitle']}>4 core skills · Learn, Practice, and Assess</p>
            </div>

            <div className={styles['ccr-section']}>
                <div className={styles['ccr-skills-list']}>
                    {SKILLS.map((skill) => (
                        <div key={skill.id} className={styles['ccr-skill-card']} style={{ '--skill-color': skill.color }}>
                            <div className={styles['ccr-skill-info']}>
                                <div className={styles['ccr-skill-icon']} style={{ background: `${skill.color}15`, color: skill.color }}>{skill.icon}</div>
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
