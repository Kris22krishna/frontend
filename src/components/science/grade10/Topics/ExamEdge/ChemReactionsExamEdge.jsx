import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../ChemicalReactionsDashboard.module.css';

/* ── Equation Balancer Challenge ─────────────────────────────────────── */
const BALANCER_EQUATIONS = [
    {
        label: 'Burning Magnesium',
        template: '__ Mg + __ O₂ → __ MgO',
        hint: 'Count Mg and O atoms on both sides',
        answers: [2, 1, 2],
        hints: ['Mg coefficient', 'O₂ coefficient', 'MgO coefficient'],
    },
    {
        label: 'Aluminium + Oxygen',
        template: '__ Al + __ O₂ → __ Al₂O₃',
        hint: 'Al₂O₃ has 2 Al and 3 O — count carefully!',
        answers: [4, 3, 2],
        hints: ['Al coefficient', 'O₂ coefficient', 'Al₂O₃ coefficient'],
    },
    {
        label: 'Iron + Steam',
        template: '__ Fe + __ H₂O → __ Fe₃O₄ + __ H₂',
        hint: 'Fe₃O₄ has 3 Fe atoms — start with iron',
        answers: [3, 4, 1, 4],
        hints: ['Fe coefficient', 'H₂O coefficient', 'Fe₃O₄ coefficient', 'H₂ coefficient'],
    },
];

const REACTION_TYPES = [
    { eq: '2Na + Cl₂ → 2NaCl', type: 'Combination Reaction' },
    { eq: '2H₂O → 2H₂ + O₂', type: 'Decomposition Reaction' },
    { eq: 'Fe + CuSO₄ → FeSO₄ + Cu', type: 'Displacement Reaction' },
    { eq: 'Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl', type: 'Double Displacement Reaction' },
    { eq: '2Mg + O₂ → 2MgO', type: 'Combination + Oxidation' },
];

/* ── Vocab Quiz ──────────────────────────────────────────────────────── */
const QUIZ_QUESTIONS = [
    {
        q: 'Which term refers to substances that undergo change in a chemical reaction?',
        options: ['Products', 'Reactants', 'Catalysts', 'Precipitates'],
        correct: 1,
        explanation: 'Reactants are on the LEFT side of the equation — they react to form products.',
    },
    {
        q: 'A reaction that releases heat to the surroundings is called:',
        options: ['Endothermic', 'Exothermic', 'Catalytic', 'Photolytic'],
        correct: 1,
        explanation: 'EXOthermic = heat EXITs the system. Example: combustion of wood.',
    },
    {
        q: 'What does OIL RIG stand for in redox reactions?',
        options: [
            'Only In Lab, Reactions Increase Gas',
            'Oxidation Is Loss, Reduction Is Gain',
            'Oxygen Is Lacking, Reduction Is Good',
            'Only Ionic Liquids React In Gas',
        ],
        correct: 1,
        explanation: 'OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons).',
    },
    {
        q: 'The reaction 2H₂O → 2H₂ + O₂ is an example of:',
        options: ['Combination', 'Displacement', 'Decomposition', 'Double Displacement'],
        correct: 2,
        explanation: 'One compound breaks down into two simpler substances — that\'s Decomposition.',
    },
    {
        q: 'An insoluble solid formed during a reaction in solution is called a:',
        options: ['Catalyst', 'Precipitate', 'Reactant', 'Acid'],
        correct: 1,
        explanation: 'Precipitate = ↓ — forms when two solutions react to make an insoluble product.',
    },
    {
        q: 'In the equation 3Fe + 4H₂O → Fe₃O₄ + 4H₂, what is Fe₃O₄?',
        options: ['A reactant', 'A catalyst', 'A product', 'An acid'],
        correct: 2,
        explanation: 'Fe₃O₄ appears on the RIGHT side of the arrow, so it is a product (iron(II,III) oxide).',
    },
    {
        q: 'Photosynthesis is classified as which type of reaction based on energy?',
        options: ['Exothermic', 'Endothermic', 'Neutralisation', 'Combustion'],
        correct: 1,
        explanation: 'Plants absorb sunlight (energy enters) to make glucose — that\'s Endothermic.',
    },
    {
        q: 'Which symbol is used to show that a gas is produced in an equation?',
        options: ['(g)', '↑', '↓', '(aq)'],
        correct: 1,
        explanation: '↑ is used to show gas evolution. (g) shows a substance is already in gas form.',
    },
    {
        q: 'When iron nails are placed in CuSO₄ solution, the blue colour fades. This is:',
        options: ['Double displacement', 'Combination', 'Decomposition', 'Displacement'],
        correct: 3,
        explanation: 'Fe displaces Cu from CuSO₄ — more reactive metal displaces less reactive one.',
    },
    {
        q: 'What law is the basis for balancing chemical equations?',
        options: [
            'Law of Floatation',
            'Ohm\'s Law',
            'Law of Conservation of Mass',
            'Newton\'s Law',
        ],
        correct: 2,
        explanation: 'Atoms are neither created nor destroyed — Law of Conservation of Mass by Lavoisier.',
    },
];

function EquationBalancer() {
    const [eqIdx, setEqIdx] = useState(0);
    const [inputs, setInputs] = useState(['', '', '', '']);
    const [feedback, setFeedback] = useState('');
    const [correct, setCorrect] = useState(false);

    const eq = BALANCER_EQUATIONS[eqIdx];

    const handleInput = (i, val) => {
        const updated = [...inputs];
        updated[i] = val;
        setInputs(updated);
        setFeedback('');
        setCorrect(false);
    };

    const handleCheck = () => {
        const answers = eq.answers;
        const allCorrect = answers.every((ans, i) => parseInt(inputs[i]) === ans);
        if (allCorrect) {
            setCorrect(true);
            setFeedback('✅ Correct! Perfect balance. Every atom is accounted for.');
        } else {
            setCorrect(false);
            setFeedback('❌ Not quite — recount the atoms on each side and try again.');
        }
    };

    const nextEq = () => {
        setEqIdx((i) => (i + 1) % BALANCER_EQUATIONS.length);
        setInputs(['', '', '', '']);
        setFeedback('');
        setCorrect(false);
    };

    return (
        <div className={styles.chemInteractiveTool}>
            <div className={styles.chemToolTitle}>⚖️ Equation Balancer Challenge</div>
            <div className={styles.chemToolDesc}>
                Fill in the correct coefficients to balance the equation. Change equation using the button below.
            </div>

            {/* Template display with inputs */}
            <div className={styles.chemBalanceRow}>
                {eq.hints.map((hint, i) => (
                    <React.Fragment key={i}>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            className={styles.chemCoeffInput}
                            value={inputs[i] || ''}
                            onChange={(e) => handleInput(i, e.target.value)}
                            placeholder="?"
                            aria-label={hint}
                        />
                        {/* Render element from template split by __ */}
                        <span className={styles.chemFormulaSpan}>
                            {eq.template.split('__')[i + 1]?.split(/ [+→]| [+→]/)[0]?.trim() || ''}
                        </span>
                        {i < eq.hints.length - 1 && (
                            <span className={styles.chemPlusSpan}>
                                {eq.template.split('__')[i + 1]?.includes('→') ? '→' : '+'}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Full template for reference */}
            <div className={styles.chemLabEqDisplay}>{eq.template}</div>

            {feedback && (
                <div className={`${styles.chemFeedback} ${correct ? styles.chemFeedbackCorrect : styles.chemFeedbackWrong}`}>
                    {feedback}
                </div>
            )}

            <p className={styles.chemHintText}>Hint: {eq.hint}</p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '12px' }}>
                <button className={styles.chemCheckBtn} onClick={handleCheck}>
                    ✓ Check Balance
                </button>
                <button className={`${styles.chemCheckBtn}`} onClick={nextEq} style={{ background: 'transparent', border: '1px solid #30363d', color: '#38bdf8' }}>
                    Next Equation →
                </button>
            </div>
        </div>
    );
}

function ReactionClassifier() {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState('');
    const [feedback, setFeedback] = useState('');

    const item = REACTION_TYPES[current];

    const handleCheck = () => {
        if (!selected) { setFeedback('Pick a type first!'); return; }
        if (selected === item.type) {
            setFeedback('✅ Correct! Well classified.');
        } else {
            setFeedback(`❌ That's ${item.type}. Look at the pattern: A+B→AB = combo, AB→A+B = decomposition.`);
        }
    };

    const next = () => {
        setCurrent((c) => (c + 1) % REACTION_TYPES.length);
        setSelected('');
        setFeedback('');
    };

    return (
        <div className={styles.chemInteractiveTool}>
            <div className={styles.chemToolTitle}>🔍 Reaction Type Classifier</div>
            <div className={styles.chemToolDesc}>Identify the type of reaction for each equation.</div>

            <div className={styles.chemClassifierQ}>{item.eq}</div>

            <select
                className={styles.chemSelect}
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                <option value="">Select reaction type…</option>
                <option>Combination Reaction</option>
                <option>Decomposition Reaction</option>
                <option>Displacement Reaction</option>
                <option>Double Displacement Reaction</option>
                <option>Combination + Oxidation</option>
            </select>

            {feedback && (
                <div className={`${styles.chemFeedback} ${feedback.startsWith('✅') ? styles.chemFeedbackCorrect : styles.chemFeedbackWrong}`}>
                    {feedback}
                </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '12px' }}>
                <button className={styles.chemCheckBtn} onClick={handleCheck}>Check</button>
                <button className={styles.chemCheckBtn} onClick={next} style={{ background: 'transparent', border: '1px solid #30363d', color: '#38bdf8' }}>
                    Next →
                </button>
            </div>
            <p className={styles.chemHintText}>Equation {current + 1} of {REACTION_TYPES.length}</p>
        </div>
    );
}

function VocabQuiz() {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = QUIZ_QUESTIONS[current];

    const handleSelect = (idx) => {
        if (selected !== null) return;
        setSelected(idx);
        if (idx === q.correct) setScore((s) => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= QUIZ_QUESTIONS.length) {
            setFinished(true);
        } else {
            setCurrent((c) => c + 1);
            setSelected(null);
        }
    };

    const handleRetry = () => {
        setCurrent(0);
        setSelected(null);
        setScore(0);
        setFinished(false);
    };

    if (finished) {
        const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
        return (
            <div className={styles.chemQuizWrap}>
                <div className={styles.chemQuizFinish}>
                    <div className={styles.chemQuizFinishScore}>
                        {pct >= 80 ? '🏆' : pct >= 50 ? '🎯' : '📖'}
                    </div>
                    <div className={styles.chemQuizFinishTitle}>
                        {score} / {QUIZ_QUESTIONS.length} Correct ({pct}%)
                    </div>
                    <p style={{ color: 'var(--chem-muted)', fontSize: '0.9rem' }}>
                        {pct >= 80 ? 'Outstanding! You know your chemistry!' : pct >= 50 ? 'Good — review the low-scoring terms and try again.' : 'Keep studying the terminology section and retry.'}
                    </p>
                    <button className={styles.chemQuizRetryBtn} onClick={handleRetry}>
                        Retry Quiz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.chemQuizWrap}>
            <div className={styles.chemQuizQ}>
                Q{current + 1}. {q.q}
            </div>
            {/* 2×2 grid per rules.md */}
            <div className={styles.chemQuizOptions}>
                {q.options.map((opt, idx) => {
                    let cls = styles.chemQuizOpt;
                    if (selected !== null) {
                        if (idx === q.correct) cls = `${styles.chemQuizOpt} ${styles.chemQuizOptCorrect}`;
                        else if (idx === selected) cls = `${styles.chemQuizOpt} ${styles.chemQuizOptWrong}`;
                    }
                    return (
                        <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
                            {String.fromCharCode(65 + idx)}. {opt}
                        </button>
                    );
                })}
            </div>
            {selected !== null && (
                <div className={`${styles.chemQuizFeedback} ${selected === q.correct ? styles.chemQuizFbOk : styles.chemQuizFbNo}`}>
                    {q.explanation}
                </div>
            )}
            <div className={styles.chemQuizNav}>
                <span className={styles.chemQuizProgress}>
                    Question {current + 1} / {QUIZ_QUESTIONS.length}
                </span>
                <span className={styles.chemQuizScore}>Score: {score}</span>
                {selected !== null && (
                    <button className={styles.chemQuizNextBtn} onClick={handleNext}>
                        {current + 1 < QUIZ_QUESTIONS.length ? 'Next →' : 'Finish'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function ChemReactionsExamEdge() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`${styles.chemRoot} ${styles.chemPage}`}>
            <nav className={styles.chemNav}>
                <button className={styles.chemNavBack} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Dashboard
                </button>
                <div className={styles.chemNavLinks}>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/skills')}>🧪 Skills</button>
                    <button className={styles.chemNavLink} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={`${styles.chemNavLink} ${styles.chemNavLinkActive}`}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles.chemHero}>
                <h1 className={styles.chemHeroTitle}>
                    <span className={styles.chemTitleAccent}>Exam Edge</span>: Test Yourself
                </h1>
                <p className={styles.chemHeroSub}>
                    Balance equations interactively, classify reaction types, and take the vocab quiz.
                </p>
            </div>

            <div className={styles.chemShell}>
                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>⚖️ Interactive Equation Balancer</div>
                    <EquationBalancer />
                </div>

                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>🔍 Reaction Type Classifier</div>
                    <ReactionClassifier />
                </div>

                <div className={styles.chemSectionBlock}>
                    <div className={styles.chemSectionTitle}>📝 Master Your Vocab Quiz</div>
                    <p className={styles.chemSectionDesc}>10 MCQs testing your mastery of key terminology. Good luck!</p>
                    <VocabQuiz />
                </div>

                <div className={styles.chemCta}>
                    <div>
                        <div className={styles.chemCtaTitle}>Chapter complete! 🎉</div>
                        <div className={styles.chemCtaSub}>Head back and explore another chapter.</div>
                    </div>
                    <button
                        className={styles.chemCtaBtn}
                        onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
