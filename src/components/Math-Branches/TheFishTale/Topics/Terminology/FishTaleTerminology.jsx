import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../the-fish-tale.css';

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

const TERMS = [
    {
        name: 'Place Value',
        color: '#0891b2',
        icon: '🔢',
        def: 'The value a digit has because of its position (place) in a number. The same digit can be worth different amounts depending on where it sits.',
        examples: ['In 3,45,678 → 3 is in Lakhs place (worth 3,00,000)', 'In 3,45,678 → 5 is in Thousands place (worth 5,000)', 'In 52 → 5 is in Tens place (worth 50)'],
        inUse: 'In a fishing village, if fish costs ₹45 per kg, the 4 is in the Tens place (worth 40) and the 5 is in the Ones place (worth 5).',
        memory: 'Place Value = Position Power! A digit\'s worth depends on WHERE it sits, not just WHAT it is.'
    },
    {
        name: 'Face Value',
        color: '#7c3aed',
        icon: '🎭',
        def: 'The actual digit itself, regardless of its position in the number. The face value of any digit is always the digit itself.',
        examples: ['In 5,67,890 → face value of 5 is just 5', 'In 5,67,890 → face value of 8 is just 8', 'In 5,67,890 → face value of 0 is just 0'],
        inUse: 'Whether 7 appears in Ones, Tens, or Lakhs place — its face value is always 7.',
        memory: 'Face Value = what you SEE on the face of the digit!'
    },
    {
        name: 'Lakh',
        color: '#059669',
        icon: '💰',
        def: 'A unit in the Indian number system equal to 1,00,000 (one hundred thousand). It comes after Ten Thousands in the place value chart.',
        examples: ['1 Lakh = 1,00,000', '5 Lakh = 5,00,000', '99 Lakh = 99,00,000'],
        inUse: 'A motorboat costs about ₹6,50,000 which is "Six Lakh Fifty Thousand rupees."',
        memory: 'Lakh = 1 followed by 5 zeros = 1,00,000!'
    },
    {
        name: 'Indian Number System',
        color: '#b45309',
        icon: '🇮🇳',
        def: 'A system of writing numbers using the pattern: Ones, Tens, Hundreds, Thousands, Ten Thousands, Lakhs. Commas are placed after the hundreds place and then after every two digits.',
        examples: ['1,00,000 (not 100,000)', '12,34,567', '99,99,999'],
        inUse: 'The total fish catch is written as 14,50,000 kg in the Indian system.',
        memory: 'After hundreds, commas come every TWO digits: X,XX,XX,XXX.'
    },
    {
        name: 'Estimation',
        color: '#be185d',
        icon: '🎯',
        def: 'Finding an approximate answer that is close to the exact answer. We "round" numbers to make calculations easier and quicker.',
        examples: ['4,78,200 ≈ 4,78,000 (nearest thousand)', '3,456 ≈ 3,500 (nearest hundred)', '78 ≈ 80 (nearest ten)'],
        inUse: 'If a fisher catches 4,789 kg today and 5,123 kg yesterday, we can estimate: about 5,000 + 5,000 = 10,000 kg total.',
        memory: 'Estimation = smart guessing! Look at the digit to the right — if it\'s 5 or more, round UP.'
    },
    {
        name: 'Rounding',
        color: '#6366f1',
        icon: '🔄',
        def: 'Replacing a number with a nearby number that ends in 0, 00, 000 etc. to make it simpler. You look at the digit to the right of the rounding place.',
        examples: ['687 → 690 (nearest ten)', '687 → 700 (nearest hundred)', '6,870 → 7,000 (nearest thousand)'],
        inUse: 'The fish market earned ₹3,47,862 this week. Rounded to nearest thousand: ₹3,48,000.',
        memory: 'Rule of 5: digit < 5 → round DOWN, digit ≥ 5 → round UP!'
    },
    {
        name: 'Comparison of Numbers',
        color: '#ec4899',
        icon: '⚖️',
        def: 'Deciding which of two numbers is greater, smaller, or if they are equal. We compare digit by digit starting from the leftmost place.',
        examples: ['4,56,789 > 3,56,789 (different Lakhs digit)', '2,34,567 < 2,45,678 (same Lakhs, different Ten-Thousands)', '5,00,000 = 5,00,000'],
        inUse: 'Is a motorboat at ₹6,50,000 more expensive than a long-tail boat at ₹35,000? Compare: 6,50,000 > 35,000 (6-digit > 5-digit).',
        memory: 'More digits = bigger number. Same digits? Compare from LEFT!'
    },
    {
        name: 'Expanded Form',
        color: '#0369a1',
        icon: '📐',
        def: 'Writing a number as the sum of each digit multiplied by its place value. It shows the value contributed by each digit.',
        examples: ['3,45,678 = 3,00,000 + 40,000 + 5,000 + 600 + 70 + 8', '1,23,456 = 1,00,000 + 20,000 + 3,000 + 400 + 50 + 6'],
        inUse: 'The loan amount ₹2,50,000 in expanded form: 2,00,000 + 50,000 + 0 + 0 + 0.',
        memory: 'Expanded Form = breaking a number into place value pieces!'
    },
];

const VOCAB_QUIZ = [
    {
        question: "What is the place value of 4 in the number 4,56,789?",
        options: ["4", "4,000", "40,000", "4,00,000"],
        correct: 3,
        explanation: "The digit 4 is in the Lakhs place, so its place value is 4 × 1,00,000 = 4,00,000."
    },
    {
        question: "What is the face value of 7 in the number 3,67,890?",
        options: ["7,000", "70,000", "7", "700"],
        correct: 2,
        explanation: "Face value is the digit itself, regardless of position. The face value of 7 is simply 7."
    },
    {
        question: "How many zeros are in 1 Lakh?",
        options: ["4", "5", "6", "3"],
        correct: 1,
        explanation: "1 Lakh = 1,00,000. It has 5 zeros after the digit 1."
    },
    {
        question: "In the Indian system, where do we place commas in the number 345678?",
        options: ["345,678", "34,56,78", "3,45,678", "3456,78"],
        correct: 2,
        explanation: "In the Indian system: first comma after hundreds (678), then every two digits: 3,45,678."
    },
    {
        question: "Round 4,567 to the nearest hundred.",
        options: ["4,500", "4,600", "5,000", "4,560"],
        correct: 1,
        explanation: "The tens digit is 6 (≥ 5), so we round UP. 4,567 → 4,600."
    },
    {
        question: "Which is greater: 3,45,678 or 4,23,456?",
        options: ["3,45,678", "4,23,456", "They are equal", "Cannot determine"],
        correct: 1,
        explanation: "Both are 6-digit numbers. Comparing Lakhs digits: 3 < 4, so 4,23,456 is greater."
    },
    {
        question: "What is the expanded form of 2,05,300?",
        options: [
            "2,00,000 + 5,000 + 300",
            "2,00,000 + 50,000 + 300",
            "2,00,000 + 500 + 300",
            "20,000 + 5,000 + 300"
        ],
        correct: 0,
        explanation: "2,05,300 = 2,00,000 + 0 (ten-thousands) + 5,000 + 300 + 0 + 0 = 2,00,000 + 5,000 + 300."
    },
    {
        question: "Estimate 4,789 + 5,123 by rounding to the nearest thousand.",
        options: ["9,000", "10,000", "9,912", "11,000"],
        correct: 1,
        explanation: "4,789 ≈ 5,000 and 5,123 ≈ 5,000. Estimated sum = 5,000 + 5,000 = 10,000."
    },
];


// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function FishTaleTerminology() {
    const navigate = useNavigate();
    const [openTerm, setOpenTerm] = useState(null);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizRevealed, setQuizRevealed] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizDone, setQuizDone] = useState(false);

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizSelected(null);
        setQuizRevealed(false);
        setQuizScore(0);
        setQuizDone(false);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizRevealed) return;
        setQuizSelected(optIdx);
        setQuizRevealed(true);
        if (optIdx === VOCAB_QUIZ[quizIdx].correct) {
            setQuizScore(s => s + 1);
        }
    };

    const nextQuiz = () => {
        if (quizIdx + 1 >= VOCAB_QUIZ.length) {
            setQuizDone(true);
        } else {
            setQuizIdx(i => i + 1);
            setQuizSelected(null);
            setQuizRevealed(false);
        }
    };

    return (
        <div className="ft-intro-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="ft-intro-nav">
                <button className="ft-intro-nav-back" onClick={() => navigate('/the-fish-tale')}>
                    ← Back to The Fish Tale
                </button>
                <div className="ft-intro-nav-links">
                    <button className="ft-intro-nav-link" onClick={() => navigate('/the-fish-tale/introduction')}>
                        🌟 Introduction
                    </button>
                    <button className="ft-intro-nav-link ft-intro-nav-link--active" onClick={() => navigate('/the-fish-tale/terminology')}>
                        📖 Terminology
                    </button>
                    <button className="ft-intro-nav-link" onClick={() => navigate('/the-fish-tale/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO ──────────────────────────────── */}
            <div className="ft-intro-hero">
                <div className="ft-intro-hero-deco ft-intro-hero-deco-a" />
                <div className="ft-intro-hero-deco ft-intro-hero-deco-b" />
                <div className="ft-intro-hero-inner">
                    <h1 className="ft-intro-hero-title">
                        Master the{' '}
                        <span className="ft-intro-hero-highlight">Key Terms</span>
                    </h1>
                    <p className="ft-intro-hero-sub">8 essential terms for working with large numbers</p>
                </div>
            </div>

            {/* ── TERMS ──────────────────────────────── */}
            <div className="ft-term-section">
                <h2 className="ft-term-title">📖 Key Terminology</h2>
                {TERMS.map((term, idx) => {
                    const isOpen = openTerm === idx;
                    return (
                        <div
                            key={idx}
                            className="ft-term-card"
                            onClick={() => setOpenTerm(isOpen ? null : idx)}
                            style={{
                                borderColor: isOpen ? term.color + '60' : '#e2e8f0',
                                boxShadow: isOpen ? `0 8px 24px ${term.color}20` : undefined,
                            }}
                        >
                            <div className="ft-term-card-header">
                                <div className="ft-term-card-icon" style={{ background: term.color }}>
                                    {term.icon}
                                </div>
                                <div className="ft-term-card-name" style={{ color: term.color }}>
                                    {term.name}
                                </div>
                                <div
                                    className="ft-term-card-chevron"
                                    style={{
                                        color: isOpen ? term.color : '#94a3b8',
                                        transform: isOpen ? 'rotate(180deg)' : 'none',
                                    }}
                                >
                                    ▼
                                </div>
                            </div>

                            {isOpen && (
                                <div className="ft-term-card-body">
                                    <div className="ft-term-card-def">{term.def}</div>
                                    <div className="ft-term-card-examples">
                                        {term.examples.map((ex, i) => (
                                            <span key={i} className="ft-term-card-example">{ex}</span>
                                        ))}
                                    </div>
                                    <div className="ft-term-card-inuse">
                                        <strong>In context:</strong> {term.inUse}
                                    </div>
                                    <div className="ft-term-card-memory">🧠 {term.memory}</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ── VOCABULARY QUIZ ──────────────────────────── */}
            <div className="ft-quiz-section">
                <h2 className="ft-quiz-title">🧪 Test Your Knowledge</h2>
                <div className="ft-quiz-card">
                    {quizDone ? (
                        <div className="ft-quiz-score">
                            <div className="ft-quiz-score-num">{quizScore}/{VOCAB_QUIZ.length}</div>
                            <div className="ft-quiz-score-label">
                                {quizScore === VOCAB_QUIZ.length ? '🎉 Perfect Score!' :
                                    quizScore >= VOCAB_QUIZ.length * 0.7 ? '👏 Great job!' :
                                        '💪 Keep practicing!'}
                            </div>
                            <button className="ft-quiz-retry" onClick={resetQuiz}>Try Again</button>
                        </div>
                    ) : (
                        <>
                            <div className="ft-quiz-progress">
                                Question {quizIdx + 1} of {VOCAB_QUIZ.length}
                            </div>
                            <div className="ft-quiz-q">{VOCAB_QUIZ[quizIdx].question}</div>
                            <div className="ft-quiz-options">
                                {VOCAB_QUIZ[quizIdx].options.map((opt, i) => {
                                    let cls = 'ft-quiz-opt';
                                    if (quizRevealed) {
                                        if (i === VOCAB_QUIZ[quizIdx].correct) cls += ' ft-quiz-opt--correct';
                                        else if (i === quizSelected) cls += ' ft-quiz-opt--wrong';
                                    } else if (i === quizSelected) {
                                        cls += ' ft-quiz-opt--selected';
                                    }
                                    return (
                                        <button key={i} className={cls} onClick={() => handleQuizSelect(i)}>
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                            {quizRevealed && (
                                <div className="ft-quiz-explanation">
                                    {VOCAB_QUIZ[quizIdx].explanation}
                                </div>
                            )}
                            <div className="ft-quiz-nav">
                                <span />
                                <button
                                    className="ft-quiz-nav-btn"
                                    onClick={nextQuiz}
                                    disabled={!quizRevealed}
                                >
                                    {quizIdx + 1 >= VOCAB_QUIZ.length ? 'See Score' : 'Next →'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* CTA for next section */}
            <div className="ft-intro-content" style={{ padding: '0 24px 40px' }}>
                <div className="ft-intro-cta-strip">
                    <p className="ft-intro-cta-sub" style={{ margin: 0 }}>
                        Ready to practice? Try 5 core skills with practice &amp; assessment questions.
                    </p>
                    <button className="ft-intro-cta-btn" onClick={() => navigate('/the-fish-tale/skills')}>
                        Skills →
                    </button>
                </div>
            </div>
        </div>
    );
}
