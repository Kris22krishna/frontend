import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../algebraic_expressions.module.css';

const SKILL_NODE_IDS = {
    'expressions-basics': 'g8-math-aei-expressions-basics',
    'like-terms-and-operations': 'g8-math-aei-like-terms-operations',
    'multiplication-of-expressions': 'g8-math-aei-multiplication-expressions',
    'algebraic-identities-applications': 'g8-math-aei-identities-applications',
};

import {
    expressionsBasics,
    likeTermsAndOperations,
    multiplicationOfExpressions,
    algebraicIdentitiesApplications,
} from './AlgebraicExpressionsSkillsData';
import CubesPracticeEngine from './Engines/CubesPracticeEngine';
import CubesAssessmentEngine from './Engines/CubesAssessmentEngine';

const SKILLS = [
    {
        id: 'expressions-basics',
        num: 1,
        icon: '🧠',
        label: 'Expressions Basics',
        desc: 'Identify expressions, terms, factors, coefficients, and polynomial types.',
        color: '#0f766e',
        pool: expressionsBasics,
        learn: {
            concept: 'An algebraic expression is built from terms. Each term may contain a coefficient, one or more variables, and powers on those variables.',
            rules: [
                { icon: '📌', title: 'What Is an Expression?', body: 'An expression is a mathematical phrase like $3x+5$ or $2a^2b$. It has no equality sign.' },
                { icon: '🧩', title: 'Terms, Factors, Coefficients', body: 'Terms are separated by $+$ or $-$. Factors are multiplied inside a term. The number part is the coefficient.' },
                { icon: '🔢', title: 'Monomial, Binomial, Polynomial', body: 'A monomial has 1 term, a binomial has 2 terms, and a polynomial has one or more terms with non-negative integral exponents.' },
                { icon: '🧮', title: 'Evaluate an Expression', body: 'Substitute the given value of the variable and then simplify carefully using the correct order of operations.' },
            ],
            examples: [
                { q: 'Name the terms in $4x^2 - 3x + 8$.', a: 'The terms are $4x^2$, $-3x$, and $8$.' },
                { q: 'What is the coefficient of $ab$ in $-6ab$?', a: 'The coefficient is $-6$.' },
                { q: 'Evaluate $2x + 5$ when $x=4$.', a: '$2(4)+5=13$.' },
            ],
            tip: '💡 Keep the sign attached to the term while identifying coefficients.',
        },
    },
    {
        id: 'like-terms-and-operations',
        num: 2,
        icon: '🌳',
        label: 'Like Terms & Operations',
        desc: 'Group like terms and simplify expressions through addition and subtraction.',
        color: '#1e40af',
        pool: likeTermsAndOperations,
        learn: {
            concept: 'Like terms have exactly the same variable part. We add or subtract only their coefficients while keeping the variable part unchanged.',
            rules: [
                { icon: '🔍', title: 'Spot Like Terms', body: 'Terms such as $3x^2$ and $-5x^2$ are like terms because both have $x^2$.' },
                { icon: '📚', title: 'Group Similar Terms', body: 'Arrange expressions so matching terms stand together before adding or subtracting.' },
                { icon: '➕', title: 'Add Expressions', body: 'While adding expressions, remove brackets and combine each set of like terms.' },
                { icon: '➖', title: 'Subtract Expressions', body: 'While subtracting, change the signs inside the second bracket first, then combine like terms.' },
            ],
            examples: [
                { q: 'Simplify $5x + 2x - 3x$.', a: 'Add coefficients: $5+2-3=4$, so the result is $4x$.' },
                { q: 'Add $(2x+3)$ and $(5x-7)$.', a: '$2x+3+5x-7=7x-4$.' },
                { q: 'Subtract $(x-2)$ from $(3x+5)$.', a: '$(3x+5)-(x-2)=3x+5-x+2=2x+7$.' },
            ],
            tip: '💡 If the variable part changes, the terms cannot be combined.',
        },
    },
    {
        id: 'multiplication-of-expressions',
        num: 3,
        icon: '👀',
        label: 'Multiplication of Expressions',
        desc: 'Multiply monomials and polynomials using exponent laws and distributive property.',
        color: '#7c3aed',
        pool: multiplicationOfExpressions,
        learn: {
            concept: 'Multiplication of algebraic expressions means multiplying coefficients and then multiplying variable parts, often by distributing one term across many terms.',
            rules: [
                { icon: '1️⃣', title: 'Monomial × Monomial', body: 'Multiply the numerical coefficients and add exponents of common variables.' },
                { icon: '2️⃣', title: 'Three or More Monomials', body: 'Multiply step by step, keeping track of signs, coefficients, and repeated variables.' },
                { icon: '🔁', title: 'Monomial × Polynomial', body: 'Distribute the monomial to every term inside the bracket.' },
                { icon: '↔️', title: 'Polynomial × Polynomial', body: 'Multiply each term of the first expression by each term of the second and then combine like terms.' },
            ],
            examples: [
                { q: 'Multiply $3x$ and $4x^2$.', a: '$3 \\times 4 = 12$ and $x \\times x^2 = x^3$, so the product is $12x^3$.' },
                { q: 'Expand $2x(x+3)$.', a: '$2x^2 + 6x$.' },
                { q: 'Expand $(x+2)(x+5)$.', a: '$x^2 + 5x + 2x + 10 = x^2 + 7x + 10$.' },
            ],
            tip: '💡 When multiplying brackets, check that every term has been used exactly once.',
        },
    },
    {
        id: 'algebraic-identities-applications',
        num: 4,
        icon: '➕',
        label: 'Algebraic Identities',
        desc: 'Use standard identities to expand, simplify, and perform quicker calculations.',
        color: '#b45309',
        pool: algebraicIdentitiesApplications,
        learn: {
            concept: 'An identity is true for all values of the variables. Standard identities help us expand expressions and compute products more quickly.',
            rules: [
                { icon: '➕', title: 'Square of a Sum', body: '$(a+b)^2 = a^2 + 2ab + b^2$.' },
                { icon: '➖', title: 'Square of a Difference', body: '$(a-b)^2 = a^2 - 2ab + b^2$.' },
                { icon: '🔄', title: 'Difference of Squares', body: '$(a+b)(a-b) = a^2 - b^2$.' },
                { icon: '⚡', title: 'Apply to Real Calculations', body: 'Use identities to find squares or products like $102^2$ and $98 \\times 102$ without long multiplication.' },
            ],
            examples: [
                { q: 'Expand $(x+3)^2$.', a: '$x^2 + 6x + 9$.' },
                { q: 'Find $99^2$ using identity.', a: '$(100-1)^2 = 10000 - 200 + 1 = 9801$.' },
                { q: 'Find $103 \\times 97$.', a: '$(100+3)(100-3)=10000-9=9991$.' },
            ],
            tip: '💡 First match the expression to a known pattern, then substitute carefully.',
        },
    },
];

export default function AlgebraicExpressionsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [splitPool, setSplitPool] = useState({ practice: [], assess: [] });

    useEffect(() => { window.scrollTo(0, 0); }, []);

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
            setSplitPool({
                practice: shuffleArr(skill.pool.practice),
                assess: shuffleArr(skill.pool.assess),
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

    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    if (view === 'learn' && activeSkill) {
        const { learn, label, color, num } = activeSkill;
        const currentRule = learn.rules[selectedLearnIdx];

        return (
            <div className={styles['ccr-page']}>
                <nav className={styles['ccr-nav']}>
                    <button className={styles['ccr-nav-back']} onClick={backToList}>← Skills</button>
                    <div className={styles['ccr-nav-links']}>
                        <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities')}>Home</button>
                        <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities/terminology')}>Terminology</button>
                        <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Skills</button>
                    </div>
                </nav>
                <div className={styles['ccr-module-hero']}>
                    <h1 className={styles['ccr-module-title']}>Skill {num}: <span className={styles['ccr-accent-text']}>{label}</span></h1>
                    <p className={styles['ccr-module-subtitle']}>Mastering the concepts</p>
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
                                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4 }}>Complete all {learn.rules.length} topics to unlock practice.</div>
                                </div>
                            </div>
                        </div>

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

    return (
        <div className={styles['ccr-page']}>
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities')}>← Expressions & Identities</button>
                <div className={styles['ccr-nav-links']}>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities/introduction')}>Introduction</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities/terminology')}>Terminology</button>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Skills</button>
                </div>
            </nav>

            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>Expressions <span className={styles['ccr-accent-text']}>Skills</span></h1>
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
