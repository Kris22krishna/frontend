import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../integers.css';
import MathRenderer from '@/components/MathRenderer';

// ─── Shared Quiz Engine ────────────────────────────────────────────────────
function QuizEngine({ questions, title, onBack, color }) {
    const [current, setCurrent] = useState(0);
    // answers[i] = null (unanswered) or the index of the selected option
    const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    const q = questions[current];
    const selected = answers[current];
    const answered = selected !== null;

    const handleSelect = (optIdx) => {
        if (answers[current] !== null) return; // already answered
        const newAnswers = [...answers];
        newAnswers[current] = optIdx;
        setAnswers(newAnswers);
        if (optIdx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
        }
    };

    const handlePrevious = () => {
        if (current > 0) {
            setCurrent(c => c - 1);
        }
    };

    const handleJump = (idx) => {
        setCurrent(idx);
    };

    useEffect(() => {
        if (finished) return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    setFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [finished]);

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        let msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        let msgSub = pct >= 90 ? 'You have excellent control over this topic!' : 'Review the concepts and try again for 100%.';

        return (
            <div className="int-quiz-finished" style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className="int-quiz-score-circle" style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
                    margin: '0 auto 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    border: '8px solid #fff'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: 'var(--int-text)', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: 'var(--int-muted)', fontWeight: 700 }}>out of {questions.length}</div>
                    </div>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: 'var(--int-text)', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: 'var(--int-muted)', fontSize: 15, margin: '0 0 32px' }}>{msgSub}</p>
                <div className="int-quiz-finished-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                        className="int-btn-primary"
                        onClick={() => { setCurrent(0); setAnswers(Array(questions.length).fill(null)); setScore(0); setFinished(false); setTimeLeft(15 * 60); }}
                        style={{ padding: '12px 24px', background: color }}
                    >
                        Try Again
                    </button>
                    <button
                        className="int-btn-secondary"
                        onClick={onBack}
                        style={{ padding: '12px 24px' }}
                    >
                        Return to Skills
                    </button>
                </div>
            </div>
        );
    }

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Calculate answered status
    const respondedCount = answered ? current + 1 : current;

    return (
        <div className="int-quiz-active int-quiz-container" style={{
            background: '#F8FAFC',
            padding: '2rem',
            borderRadius: '24px',
            fontFamily: '"Outfit", sans-serif',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <style>{`
                .palette-btn {
                    height: 44px;
                    width: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.15s ease;
                    border: 1.5px solid #E2E8F0;
                    background: #F8FAFC;
                    color: #64748B;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
                }
                .palette-btn.current {
                    border: 2px solid #6366f1;
                    background: #fff;
                    color: #6366f1;
                    box-shadow: 0 0 0 2px #6366f120;
                }
                .palette-btn.answered {
                    background: #6366f1;
                    color: white;
                    border-color: #6366f1;
                    box-shadow: 0 2px 6px rgba(99,102,241,0.3);
                }
                .palette-btn:hover:not(.answered) {
                    border-color: #6366f1;
                    background: #f5f3ff;
                    color: #6366f1;
                    transform: translateY(-1px);
                }
                
                .quiz-layout-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 280px;
                    gap: 2rem;
                    align-items: start;
                }

                @media (max-width: 900px) {
                    .quiz-layout-grid {
                        grid-template-columns: 1fr;
                    }
                    .quiz-palette-container {
                        position: static !important;
                    }
                }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>ASSESSMENT</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--int-text)', margin: 0, textAlign: 'center', flex: 1 }}>{title}</h3>
                <div style={{ width: '100px' }}></div> {/* Spacer for centering title */}
            </div>

            <div className="quiz-layout-grid">
                {/* Left Column: Question & Options */}
                <div className="quiz-left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Question Card */}
                    <div className="int-quiz-card" style={{
                        background: '#fff',
                        borderRadius: 24, padding: '2rem 2.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: `#efeffd`, padding: '6px 16px', borderRadius: '999px',
                            fontSize: 13, fontWeight: 700, color: '#6366f1', marginBottom: 20,
                            textTransform: 'uppercase', letterSpacing: '0.5px'
                        }}>
                            <span>QUESTION {current + 1}</span>
                        </div>

                        <div className="int-quiz-question-text" style={{ fontSize: 20, fontWeight: 600, color: '#1E293B', lineHeight: 1.6, marginBottom: 32 }}>
                            {q.question}
                        </div>

                        {q.math && (
                            <div style={{
                                background: '#F8FAFC', border: `2px solid #E2E8F0`,
                                borderRadius: 16, padding: '24px', marginBottom: 32,
                                fontSize: 26, color: '#0F172A', textAlign: 'center', fontWeight: 600
                            }}>
                                <MathRenderer text={q.math.includes('$') ? q.math : `$$${q.math}$$`} />
                            </div>
                        )}

                        {/* Options */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                            {q.options.map((opt, oi) => {
                                // Only highlight the selected option — no correct/wrong reveal
                                const isSelected = selected === oi;
                                const borderColor = isSelected ? '#6366f1' : '#E2E8F0';
                                const bgColor = isSelected ? '#f5f3ff' : '#fff';
                                const textColor = isSelected ? '#4338ca' : '#475569';
                                const dotColor = isSelected ? '#6366f1' : '#E2E8F0';

                                return (
                                    <button
                                        key={oi}
                                        onClick={() => handleSelect(oi)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 16,
                                            padding: '16px 20px', borderRadius: 16,
                                            border: `2px solid ${borderColor}`,
                                            background: bgColor, cursor: 'pointer',
                                            fontSize: 16, color: textColor, textAlign: 'left',
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            fontWeight: isSelected ? 700 : 500,
                                            boxShadow: isSelected ? '0 4px 12px rgba(99,102,241,0.1)' : 'none',
                                            minHeight: '70px'
                                        }}
                                    >
                                        <div style={{
                                            width: 12, height: 12, borderRadius: '50%', background: dotColor, flexShrink: 0,
                                            transition: 'all 0.2s'
                                        }} />
                                        <span style={{ fontSize: '1.1rem', marginTop: '2px' }}>
                                            <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Left Actions (Previous / Next Buttons) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', width: '100%' }}>
                        <button
                            onClick={handlePrevious}
                            disabled={current === 0}
                            style={{
                                padding: '14px 28px',
                                background: '#fff',
                                color: current === 0 ? '#CBD5E1' : '#1E293B',
                                border: '1px solid #E2E8F0',
                                borderRadius: '999px', fontSize: 16, fontWeight: 700,
                                cursor: current === 0 ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex', alignItems: 'center', gap: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                            className={current !== 0 ? 'hover:bg-slate-50' : ''}
                        >
                            <span style={{ fontSize: '1.2em' }}>←</span> Previous
                        </button>
                        <button
                            onClick={handleNext}
                            style={{
                                padding: '14px 36px',
                                background: '#6366f1',
                                color: '#fff',
                                cursor: 'pointer',
                                border: 'none', borderRadius: '999px', fontSize: 16, fontWeight: 700,
                                transition: 'all 0.3s ease',
                                boxShadow: `0 4px 12px rgba(99, 102, 241, 0.3)`,
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}
                            className="hover:-translate-y-1 hover:shadow-lg"
                        >
                            Next <span style={{ fontSize: '1.2em' }}>→</span>
                        </button>
                    </div>

                </div>

                {/* Right Column: Sticky Palette */}
                <div className="quiz-palette-container" style={{
                    background: '#fff',
                    borderRadius: 24, padding: '2rem 1.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'sticky', top: '2rem',
                    display: 'flex', flexDirection: 'column'
                }}>
                    {/* Timer Header */}
                    <div style={{
                        background: '#F8FAFC', borderRadius: 16, padding: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        fontWeight: 800, fontSize: '1.25rem', color: '#1E293B', marginBottom: '2rem'
                    }}>
                        ⏱ {formatTime(timeLeft)}
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', marginBottom: '1rem', letterSpacing: 0.5 }}>Question Palette</h4>

                    {/* Number Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 44px)', gap: '8px', marginBottom: '1.75rem' }}>
                        {questions.map((_, idx) => {
                            const isAnswered = answers[idx] !== null;
                            const isCurrent = current === idx;
                            let statusClass = '';
                            if (isCurrent) statusClass = 'current';
                            else if (isAnswered) statusClass = 'answered';

                            return (
                                <div
                                    key={idx}
                                    className={`palette-btn ${statusClass}`}
                                    onClick={() => handleJump(idx)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {idx + 1}
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#64748B', fontWeight: 600, marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: 16, height: 16, borderRadius: 5, background: '#6366f1' }} /> Answered
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: 16, height: 16, borderRadius: 5, background: '#F8FAFC', border: '1.5px solid #E2E8F0' }} /> Not Answered
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: 'auto' }}>
                        <button
                            onClick={() => { if (window.confirm('Are you sure you want to surrender your test and view the score?')) setFinished(true) }}
                            style={{
                                width: '100%', padding: '14px',
                                background: '#EF4444', color: '#fff',
                                border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                                cursor: 'pointer', transition: 'all 0.2s',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                            }}
                            className="hover:-translate-y-1 hover:shadow-lg"
                        >
                            Submit Assessment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── ASSESSMENT DATA ───────────────────────────────────────────────────────────
const comparingAssessment = [
    { question: 'Which is greater: -5 or -2?', math: '-5 \\text{ vs } -2', options: ['-5', '-2', 'They are equal', 'Cannot be determined'], correct: 1, explanation: 'On a number line, -2 is to the right of -5, so -2 is greater.' },
    { question: 'Compare: 0 and -10', math: '0 \\text{ vs } -10', options: ['0 > -10', '0 < -10', '0 = -10', 'None'], correct: 0, explanation: 'Zero is greater than any negative number.' },
    { question: 'Which integer is the smallest?', options: ['-8', '-15', '-3', '0'], correct: 1, explanation: '-15 is further left on the number line than the others.' },
    { question: 'True or False: -4 > -3', options: ['True', 'False', 'Sometimes', 'Never'], correct: 1, explanation: '-4 is to the left of -3, so -4 is less than -3.' },
    { question: 'Order from least to greatest: -2, 5, -8, 0', options: ['-8, -2, 0, 5', '-2, -8, 0, 5', '0, -2, -8, 5', '5, 0, -2, -8'], correct: 0, explanation: 'Further left to furthest right: -8, -2, 0, 5.' },
    { question: 'Which symbol correctly compares -12 and -20?', math: '-12 \\text{ ___ } -20', options: ['<', '>', '=', '≤'], correct: 1, explanation: '-12 is warmer/higher than -20, so -12 > -20.' },
    { question: 'If x = -7 and y = -5, which statement is true?', options: ['x > y', 'x < y', 'x = y', 'x + y > 0'], correct: 1, explanation: '-7 is less than -5.' },
    { question: 'Which is greater: the opposite of 6 or the opposite of -4?', options: ['Opposite of 6', 'Opposite of -4', 'They are equal', 'None'], correct: 1, explanation: 'Opposite of 6 is -6. Opposite of -4 is 4. 4 is greater than -6.' },
    { question: 'Order from greatest to least: 3, -1, -6, 2', options: ['3, 2, -1, -6', '3, 2, -6, -1', '-6, -1, 2, 3', '-1, -6, 2, 3'], correct: 0, explanation: 'Highest to lowest: 3, 2, -1, -6.' },
    { question: 'Is a negative number always less than a positive number?', options: ['Yes', 'No', 'Only for integers', 'Only for even numbers'], correct: 0, explanation: 'Any negative number is to the left of zero, and any positive is to the right. Positives are always greater.' }
];

const absoluteAssessment = [
    { question: 'What is the absolute value of -14?', math: '|-14| = ?', options: ['-14', '0', '14', '1/14'], correct: 2, explanation: 'Absolute value is distance from zero. The distance is 14.' },
    { question: 'Evaluate: |8|', math: '|8| = ?', options: ['-8', '8', '0', '1/8'], correct: 1, explanation: '8 is 8 units away from zero.' },
    { question: 'Which statement is true?', options: ['|-5| < 0', '|-5| = -5', '|-5| > 0', '|-5| < |4|'], correct: 2, explanation: '|-5| is 5, which is greater than 0.' },
    { question: 'Evaluate: |-3| + |7|', math: '|-3| + |7| = ?', options: ['4', '-4', '10', '-10'], correct: 2, explanation: '3 + 7 = 10.' },
    { question: 'Evaluate: | -10 | - | -2 |', math: '|-10| - |-2| = ?', options: ['-12', '12', '8', '-8'], correct: 2, explanation: '10 - 2 = 8.' },
    { question: 'Which numbers have an absolute value of 6?', options: ['Only 6', 'Only -6', 'Both 6 and -6', '0'], correct: 2, explanation: 'Distance from 0 is 6 for both 6 and -6.' },
    { question: 'Order from least to greatest: |-2|, -5, |0|, |-1|', options: ['-5, |0|, |-1|, |-2|', '|0|, |-1|, |-2|, -5', '-5, |-2|, |-1|, |0|', '|0|, |-2|, |-1|, -5'], correct: 0, explanation: 'Values are 2, -5, 0, 1. Ordered: -5, 0, 1, 2.' },
    { question: 'If |x| = 9, what can x be?', options: ['9', '-9', '9 or -9', 'There is no such x'], correct: 2, explanation: 'Both 9 and -9 are 9 units away from zero.' },
    { question: 'True or False: The absolute value of any integer is always positive.', options: ['True', 'False (because of zero)', 'Sometimes', 'Never'], correct: 1, explanation: '|0| = 0, which is neither positive nor negative. So "always positive" is false.' },
    { question: 'Evaluate: |-15| × |2|', math: '|-15| \\times |2| = ?', options: ['30', '-30', '-17', '17'], correct: 0, explanation: '15 × 2 = 30.' }
];

const additionAssessment = [
    { question: 'Add: -8 + 5', math: '-8 + 5 = ?', options: ['-13', '13', '-3', '3'], correct: 2, explanation: 'Start at -8, move 5 right. You land on -3.' },
    { question: 'Add: -4 + (-6)', math: '-4 + (-6) = ?', options: ['-2', '2', '-10', '10'], correct: 2, explanation: 'Combining two debts (-4 and -6) yields a bigger debt (-10).' },
    { question: 'Add: 12 + (-7)', math: '12 + (-7) = ?', options: ['19', '-19', '5', '-5'], correct: 2, explanation: '12 positives and 7 negatives leave 5 positives.' },
    { question: 'Add: (-9) + 9', math: '(-9) + 9 = ?', options: ['-18', '18', '0', '9'], correct: 2, explanation: 'Adding a number and its opposite always equals 0.' },
    { question: 'Evaluate: -3 + (-4) + 10', math: '-3 + (-4) + 10 = ?', options: ['3', '-17', '-3', '17'], correct: 0, explanation: '-3 + -4 = -7. Then -7 + 10 = 3.' },
    { question: 'Yesterday temperature was -5°C. Today it is 8°C warmer. What is today\'s temperature?', options: ['-13°C', '13°C', '3°C', '-3°C'], correct: 2, explanation: '-5 + 8 = 3.' },
    { question: 'Which expression equals -5?', options: ['-2 + (-3)', '-8 + 3', '-10 + 5', 'All of the above'], correct: 3, explanation: 'All sum to -5.' },
    { question: 'Evaluate: 0 + (-15)', math: '0 + (-15) = ?', options: ['0', '15', '-15', 'undefined'], correct: 2, explanation: 'Adding 0 to any number leaves it unchanged.' },
    { question: 'Add: -25 + 15', math: '-25 + 15 = ?', options: ['-40', '40', '-10', '10'], correct: 2, explanation: 'Start at -25 and move 15 up. Result is -10.' },
    { question: 'What number must be added to -6 to get 4?', math: '-6 + x = 4', options: ['-2', '2', '-10', '10'], correct: 3, explanation: 'You need to cancel the -6 (+6) and add 4 more. So 10.' }
];

const subtractionAssessment = [
    { question: 'Subtract: 5 - 9', math: '5 - 9 = ?', options: ['4', '-4', '14', '-14'], correct: 1, explanation: '5 + (-9) = -4.' },
    { question: 'Subtract: -3 - 7', math: '-3 - 7 = ?', options: ['-10', '10', '-4', '4'], correct: 0, explanation: '-3 + (-7) = -10.' },
    { question: 'Subtract: 4 - (-6)', math: '4 - (-6) = ?', options: ['-2', '2', '-10', '10'], correct: 3, explanation: 'Subtracting a negative is like adding a positive. 4 + 6 = 10.' },
    { question: 'Subtract: -8 - (-2)', math: '-8 - (-2) = ?', options: ['-10', '10', '-6', '6'], correct: 2, explanation: '-8 + 2 = -6.' },
    { question: 'Evaluate: -15 - (-15)', math: '-15 - (-15) = ?', options: ['-30', '30', '0', '-15'], correct: 2, explanation: '-15 + 15 = 0. Subtracting a number from itself is always 0.' },
    { question: 'What is the difference between an elevation of 200m and a depth of -50m?', math: '200 - (-50) = ?', options: ['150m', '250m', '-150m', '-250m'], correct: 1, explanation: '200 - (-50) = 200 + 50 = 250.' },
    { question: 'Evaluate: 0 - 12', math: '0 - 12 = ?', options: ['12', '-12', '0', 'Undefined'], correct: 1, explanation: '0 + (-12) = -12.' },
    { question: 'Evaluate: -5 - 4 - (-3)', math: '-5 - 4 - (-3) = ?', options: ['-12', '-6', '-2', '2'], correct: 1, explanation: '-5 - 4 = -9. Then -9 - (-3) = -9 + 3 = -6.' },
    { question: 'True or False: a - b is always the same as b - a.', options: ['True', 'False', 'Only for positive numbers', 'None of above'], correct: 1, explanation: 'Subtraction is not commutative. 5 - 2 = 3, but 2 - 5 = -3.' },
    { question: 'Subtract: -10 - (-12)', math: '-10 - (-12) = ?', options: ['-22', '22', '-2', '2'], correct: 3, explanation: '-10 + 12 = 2.' }
];

const numberlineAssessment = [
    { question: 'Moving 5 units left from -2 lands you on which number?', options: ['3', '7', '-7', '-3'], correct: 2, explanation: '-2 - 5 = -7.' },
    { question: 'Moving 8 units right from -5 lands you on which number?', options: ['-13', '3', '13', '-3'], correct: 1, explanation: '-5 + 8 = 3.' },
    { question: 'What is the distance between -4 and 6 on the number line?', options: ['2', '-2', '10', '-10'], correct: 2, explanation: 'Distance is |6 - (-4)| = |6 + 4| = 10 units.' },
    { question: 'Which number is halfway between -6 and 2?', options: ['-4', '-2', '0', '4'], correct: 1, explanation: 'Average: (-6 + 2)/2 = -4/2 = -2. The distance is 8. Start at -6, move right 4 -> -2.' },
    { question: 'Starting at 0, moving left 7, then right 4 lands you at:', options: ['3', '-3', '-11', '11'], correct: 1, explanation: '0 - 7 + 4 = -3.' },
    { question: 'The opposite of a number is 5 units to its left on the number line. What is this possible?', options: ['The number is 2.5', 'The number is -2.5', 'No such number', '0'], correct: 0, explanation: 'If the number is x, its opposite is -x. If -x is 5 units left of x, then x - (-x) = 5 -> 2x = 5 -> x = 2.5.' },
    { question: 'What is the distance between -15 and -3?', options: ['-12', '12', '18', '-18'], correct: 1, explanation: '|-3 - (-15)| = |-3 + 15| = |12| = 12.' },
    { question: 'If you move 10 units away from -4, where could you land?', options: ['14', '-14', '6 or -14', '6 or 14'], correct: 2, explanation: '-4 + 10 = 6. -4 - 10 = -14.' },
    { question: 'A frog starts at 1, jumps left 5, then right 2. Where is it?', options: ['-2', '8', '-4', '4'], correct: 0, explanation: '1 - 5 + 2 = -4 + 2 = -2.' },
    { question: 'What integer represents a movement of 4 units to the left?', options: ['4', '-4', '1/4', '0'], correct: 1, explanation: 'Leftward movement on the number line is negative.' }
];

const wordproblemsAssessment = [
    { question: 'A submarine was at -200m. It ascends 50m. What is its new depth?', options: ['-150m', '-250m', '150m', '250m'], correct: 0, explanation: '-200 + 50 = -150.' },
    { question: 'Temperature drops from 4°C to -3°C. What is the change in temperature?', options: ['7°C decrease', '1°C decrease', '7°C increase', '1°C increase'], correct: 0, explanation: '4 - (-3) = 7. It dropped by 7 degrees.' },
    { question: 'You have a balance of -$20. You deposit $50. New balance?', options: ['-$70', '$70', '$30', '-$30'], correct: 2, explanation: '-20 + 50 = 30.' },
    { question: 'An elevator starts at floor 5, goes down 8 floors, then up 2. What floor?', options: ['1', '-1', '0', '-3'], correct: 1, explanation: '5 - 8 + 2 = -3 + 2 = -1 (first basement level).' },
    { question: 'A scuba diver is at -15m. A bird is flying 30m directly above the water. What is the distance between them?', options: ['15m', '45m', '-45m', '-15m'], correct: 1, explanation: '30 - (-15) = 45m.' },
    { question: 'You owe your friend $12 (-12). You borrow $5 more. What is your balance?', options: ['-$7', '$7', '-$17', '$17'], correct: 2, explanation: '-12 - 5 = -17.' },
    { question: 'In a game, you score 10 points, lose 5, then lose 8. Total score?', options: ['-3', '3', '23', '-13'], correct: 0, explanation: '10 - 5 - 8 = -3.' },
    { question: 'A town\'s elevation is -40m. A nearby mountain peak is 1200m. Difference in elevation?', options: ['1160m', '1240m', '-1160m', '-1240m'], correct: 1, explanation: '1200 - (-40) = 1240.' },
    { question: 'At midnight the temp was -8°C. By noon it rose 12 degrees. What is the noon temp?', options: ['4°C', '-4°C', '20°C', '-20°C'], correct: 0, explanation: '-8 + 12 = 4.' },
    { question: 'Company loses $500 on Monday and makes $300 on Tuesday. Net profit/loss?', options: ['-$800', '$200', '-$200', '$800'], correct: 2, explanation: '-500 + 300 = -200.' }
];

// ─── PRACTICE DATA ───────────────────────────────────────────────────────────
const comparingPractice = [
    { question: 'Compare: 3 and -7', math: '3 \\text{ vs } -7', options: ['3 > -7', '3 < -7', '3 = -7', 'Cannot compare'], correct: 0, explanation: 'Positive numbers are always greater than negative numbers.' },
    { question: 'Compare: -4 and -2', math: '-4 \\text{ vs } -2', options: ['-4 > -2', '-4 < -2', '-4 = -2', 'Both are zero'], correct: 1, explanation: '-4 is further to the left on the number line than -2, making it smaller.' },
    { question: 'Which number is further right on the number line: -10 or -12?', options: ['-10', '-12', 'They are at the same spot', 'Neither'], correct: 0, explanation: '-10 is to the right of -12, meaning -10 is greater.' },
    { question: 'Compare: 0 and -6', math: '0 \\text{ vs } -6', options: ['0 < -6', '0 > -6', '0 = -6', 'Zero is negative'], correct: 1, explanation: 'Zero is greater than any negative integer.' },
    { question: 'Compare: -15 and -25', math: '-15 \\text{ ___ } -25', options: ['<', '>', '=', '≤'], correct: 1, explanation: '-15 is closer to zero than -25 on the negative side, so -15 > -25.' },
    { question: 'If the temperature is -5°C today and was -8°C yesterday, which day was warmer?', options: ['Today', 'Yesterday', 'They are the same', 'Need more info'], correct: 0, explanation: '-5 is greater (warmer) than -8.' },
    { question: 'Which set of integers is ordered from least to greatest?', options: ['-3, -1, 0, 2', '2, 0, -1, -3', '-1, -3, 0, 2', '0, -1, 2, -3'], correct: 0, explanation: '-3 is the smallest, up to 2 as the largest.' },
    { question: 'If an account balance is -$50, is it better or worse than a balance of -$30?', options: ['Better', 'Worse', 'The same', 'Cannot compare'], correct: 1, explanation: 'Owning $50 is worse than owing $30. -$50 < -$30.' },
    { question: 'Compare: -100 and -99', math: '-100 \\text{ vs } -99', options: ['-100 > -99', '-100 < -99', '-100 = -99', 'None'], correct: 1, explanation: '-100 is smaller than -99 since it is further left on the number line.' },
    { question: 'Which of these inequalities is true?', options: ['-5 > -2', '-8 < -10', '-1 > -7', '-6 > 0'], correct: 2, explanation: '-1 is to the right of -7 on the number line, making it greater.' }
];

const absolutePractice = [
    { question: 'What does the absolute value of a number represent?', options: ['Its distance from zero', 'Its opposite sign', 'Its square root', 'Its negative form'], correct: 0, explanation: 'Absolute value is solely defined as the distance of a number from zero on the number line.' },
    { question: 'Evaluate: |-7|', math: '|-7| = ?', options: ['7', '-7', '0', '1/7'], correct: 0, explanation: 'The distance of -7 from zero is 7 units.' },
    { question: 'Evaluate: |12|', math: '|12| = ?', options: ['-12', '12', '0', 'Both 12 and -12'], correct: 1, explanation: 'The distance of 12 from zero is 12 units.' },
    { question: 'Which is greater: |-5| or |3|?', math: '|-5| \\text{ vs } |3|', options: ['|-5|', '|3|', 'They are equal', 'Cannot compare'], correct: 0, explanation: '|-5| = 5 and |3| = 3. 5 is greater than 3.' },
    { question: 'Evaluate: |-10| + 5', math: '|-10| + 5 = ?', options: ['15', '-15', '5', '-5'], correct: 0, explanation: '|-10| = 10. Then 10 + 5 = 15.' },
    { question: 'Evaluate: |0|', math: '|0| = ?', options: ['1', '0', '-1', 'Undefined'], correct: 1, explanation: 'Zero is exactly 0 units away from itself.' },
    { question: 'True or False: |-x| is always negative.', options: ['True', 'False', 'Only if x > 0', 'Only if x = 0'], correct: 1, explanation: 'False. Absolute value is always positive (or zero).' },
    { question: 'Evaluate: |-8| - |-2|', math: '|-8| - |-2| = ?', options: ['6', '-6', '10', '-10'], correct: 0, explanation: '|-8| = 8 and |-2| = 2. So, 8 - 2 = 6.' },
    { question: 'If |y| = 4, what are the possible values for y?', options: ['4 only', '-4 only', '4 and -4', '0'], correct: 2, explanation: 'Both 4 and -4 are exactly 4 units away from zero.' },
    { question: 'Compare: |-6| and -6', math: '|-6| \\text{ vs } -6', options: ['|-6| > -6', '|-6| < -6', '|-6| = -6', 'None'], correct: 0, explanation: '|-6| = 6. 6 is greater than -6.' }
];

const additionPractice = [
    { question: 'Add: 6 + (-2)', math: '6 + (-2) = ?', options: ['8', '4', '-8', '-4'], correct: 1, explanation: 'Starting at 6, moving 2 units left leaves you at 4.' },
    { question: 'Add: -5 + 9', math: '-5 + 9 = ?', options: ['-14', '14', '-4', '4'], correct: 3, explanation: 'Starting at -5 and moving 9 units right brings you to 4.' },
    { question: 'Add: -3 + (-7)', math: '-3 + (-7) = ?', options: ['-10', '10', '-4', '4'], correct: 0, explanation: 'Combining two debts (-3 and -7) makes a larger debt of -10.' },
    { question: 'Evaluate: 10 + (-10)', math: '10 + (-10) = ?', options: ['20', '-20', '0', '1'], correct: 2, explanation: 'A number plus its opposite (additive inverse) equals 0.' },
    { question: 'Add: -1 + (-1) + (-1)', math: '-1 + (-1) + (-1) = ?', options: ['-3', '3', '-1', '0'], correct: 0, explanation: 'Combine three negative ones to get -3.' },
    { question: 'You are at an elevation of 5m. You dive down 12m. Where are you?', options: ['17m', '-17m', '-7m', '7m'], correct: 2, explanation: '5 + (-12) = -7.' },
    { question: 'Add: -14 + 10', math: '-14 + 10 = ?', options: ['-24', '4', '-4', '24'], correct: 2, explanation: 'The negatives outweigh the positives by 4, so the answer is -4.' },
    { question: 'Evaluate: -8 + 0', math: '-8 + 0 = ?', options: ['8', '-8', '0', 'Undefined'], correct: 1, explanation: 'Adding zero changes nothing.' },
    { question: 'Add: 15 + (-3) + (-2)', math: '15 + (-3) + (-2) = ?', options: ['10', '20', '-10', '14'], correct: 0, explanation: '15 + (-3) = 12. Then 12 + (-2) = 10.' },
    { question: 'Which addition matches this number line move: Start at -2, move right 5?', options: ['-2 + (-5)', '-2 + 5', '5 + (-2)', 'Both 2 and 3'], correct: 3, explanation: 'Moving right is adding a positive. -2 + 5 is correct, and so is 5 + (-2) by commutativity.' }
];

const subtractionPractice = [
    { question: 'Subtract: 8 - 12', math: '8 - 12 = ?', options: ['-4', '4', '20', '-20'], correct: 0, explanation: 'Subtracting a larger number from a smaller one yields a negative result. 8 + (-12) = -4.' },
    { question: 'Subtract: -5 - 3', math: '-5 - 3 = ?', options: ['-2', '2', '-8', '8'], correct: 2, explanation: 'Starting at -5 and moving 3 left gives -8.' },
    { question: 'Subtract: 7 - (-2)', math: '7 - (-2) = ?', options: ['5', '-5', '9', '-9'], correct: 2, explanation: 'Subtracting a negative is like adding a positive! 7 + 2 = 9.' },
    { question: 'Subtract: -4 - (-9)', math: '-4 - (-9) = ?', options: ['-13', '13', '-5', '5'], correct: 3, explanation: '-4 + 9 = 5.' },
    { question: 'Evaluate: 0 - 6', math: '0 - 6 = ?', options: ['6', '-6', '0', 'Undefined'], correct: 1, explanation: 'Taking away 6 from 0 leaves you at -6.' },
    { question: 'Evaluate: 0 - (-5)', math: '0 - (-5) = ?', options: ['-5', '5', '0', 'Cannot be done'], correct: 1, explanation: '0 + 5 = 5.' },
    { question: 'Subtract: -10 - 10', math: '-10 - 10 = ?', options: ['0', '20', '-20', '-100'], correct: 2, explanation: '-10 + (-10) = -20.' },
    { question: 'What is the change in temperature from 3°C to -4°C?', math: '-4 - 3 = ?', options: ['1°C', '7°C', '-7°C', '-1°C'], correct: 2, explanation: 'The final temp minus the initial temp: -4 - 3 = -7. A drop of 7 degrees.' },
    { question: 'Subtract: 15 - (-15)', math: '15 - (-15) = ?', options: ['0', '30', '-30', '15'], correct: 1, explanation: '15 + 15 = 30.' },
    { question: 'Is -2 - (-2) equal to 0?', options: ['Yes', 'No, it is -4', 'No, it is 4', 'Cannot subtract negatives'], correct: 0, explanation: '-2 + 2 = 0. Subtracting a number from itself is always 0.' }
];

const numberlinePractice = [
    { question: 'On a horizontal number line, negative numbers are located where relative to zero?', options: ['Left', 'Right', 'Above', 'Below'], correct: 0, explanation: 'Negative numbers are plotted to the left of zero.' },
    { question: 'Moving 4 units right from -1 lands you on which number?', options: ['-5', '3', '5', '4'], correct: 1, explanation: '-1 + 4 = 3.' },
    { question: 'Moving 6 units left from 2 lands you on which number?', options: ['8', '-8', '-4', '4'], correct: 2, explanation: '2 - 6 = -4.' },
    { question: 'What integer represents a movement of 5 steps backward?', options: ['5', '-5', '1/5', '0'], correct: 1, explanation: 'Backward or leftward movement is represented by a negative integer.' },
    { question: 'If you start at -3, move right 2, and then left 4, where are you?', options: ['-5', '1', '5', '-1'], correct: 0, explanation: '-3 + 2 = -1. Then -1 - 4 = -5.' },
    { question: 'Which number is halfway between -2 and 4 on the number line?', options: ['0', '1', '2', '-1'], correct: 1, explanation: 'The average is (-2 + 4) / 2 = 2 / 2 = 1. The distance is 6 units. From -2, moving 3 right gets to 1.' },
    { question: 'What is the absolute distance between -7 and -2 on the number line?', options: ['5 units', '9 units', '-5 units', '-9 units'], correct: 0, explanation: 'Distance is always positive! |-7 - (-2)| = |-7 + 2| = |-5| = 5 units.' },
    { question: 'Moving from -5 to 2 requires you to move in which direction?', options: ['Left, 7 units', 'Right, 7 units', 'Right, 3 units', 'Left, 3 units'], correct: 1, explanation: 'From a lower number to a higher number requires moving right. 2 - (-5) = 7.' },
    { question: 'Which of the following points is furthest from zero?', options: ['-6', '4', '0', '-2'], correct: 0, explanation: 'Its absolute value is 6, which is the largest distance from zero.' },
    { question: 'If a snail starts at 0, slides left 8 cm, then right 10 cm, what is its position?', options: ['-2 cm', '2 cm', '18 cm', '-18 cm'], correct: 1, explanation: '0 - 8 + 10 = 2.' }
];

const wordproblemsPractice = [
    { question: 'A bank account has a balance of $100. A withdrawal of $150 is made. What is the new balance?', options: ['-$50', '$50', '$250', '-$250'], correct: 0, explanation: '100 - 150 = -50.' },
    { question: 'The temperature was 5°C. A cold front dropped it by 12°C. What is the new temperature?', options: ['7°C', '-7°C', '-17°C', '17°C'], correct: 1, explanation: '5 - 12 = -7.' },
    { question: 'A scuba diver is swimming at -20m. She spots a fish 8m below her. What is the fish\'s elevation?', options: ['-28m', '-12m', '12m', '28m'], correct: 0, explanation: 'Going below means subtracting. -20 - 8 = -28m.' },
    { question: 'You owe $30 to a friend (-$30). You pay them back $10. What is your current balance?', options: ['-$40', '$20', '-$20', '$40'], correct: 2, explanation: '-30 + 10 = -20.' },
    { question: 'An eagle flies at 500m above sea level. A submarine is at 100m below sea level. What is the vertical distance between them?', options: ['400m', '600m', '-400m', '-600m'], correct: 1, explanation: '500 - (-100) = 500 + 100 = 600m.' },
    { question: 'A company reports a loss of $4,000 for Q1 and a profit of $6,000 for Q2. Net profit/loss?', options: ['-$2000', '$2000', '-$10000', '$10000'], correct: 1, explanation: '-4000 + 6000 = 2000.' },
    { question: 'At a football game, a team loses 6 yards on one play, and gains 10 yards on the next. Net yardage?', options: ['-16 yards', '16 yards', '4 yards', '-4 yards'], correct: 2, explanation: '-6 + 10 = 4.' },
    { question: 'In a game show, losing a challenge costs 50 points. You fail 3 challenges in a row. Total score change?', options: ['-150', '150', '-50', '50'], correct: 0, explanation: '-50 + (-50) + (-50) = -150.' },
    { question: 'A rocket launches 200m into the air, falls exactly 250m, what is its altitude relative to the launchpad?', options: ['50m', '-50m', '450m', '-450m'], correct: 1, explanation: '200 - 250 = -50m (It hit the ground or a valley below the pad).' },
    { question: 'Mary\'s credit card balance is -$120. She uses it to buy a $30 shirt. What is her new balance?', options: ['-$90', '$90', '-$150', '$150'], correct: 2, explanation: 'Adding more debt: -120 - 30 = -150.' }
];

// ─── DATA ──────────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'comparing',
        title: 'Comparing Integers',
        subtitle: 'Skill 1 · Concept',
        icon: '🎯',
        color: '#4f46e5',
        desc: 'Master greater than, less than, and number line logic.',
        path: '/middle/grade/6/the-other-side-of-zero/comparing-integers',
        practice: comparingPractice,
        assessment: comparingAssessment,
        learn: {
            concept: 'Comparing integers is about understanding their position on the number line relative to zero and each other.',
            rules: [
                { title: 'The Number Line Rule', f: 'Right > Left', d: 'Any number to the right on a number line is always greater than any number to its left.', ex: '5 > -10, \\text{ and } -2 > -8', tip: 'If you owe £2 you are richer than if you owe £8!' }
            ]
        }
    },
    {
        id: 'absolute',
        title: 'Absolute Value',
        subtitle: 'Skill 2 · Concept',
        icon: '💎',
        color: '#8b5cf6',
        desc: 'Understand the distance of any number from zero.',
        path: '/middle/grade/6/the-other-side-of-zero/absolute-value',
        practice: absolutePractice,
        assessment: absoluteAssessment,
        learn: {
            concept: 'Absolute value strips away the direction (sign) and only cares about distance.',
            rules: [
                { title: 'Distance from Zero', f: '|-x| = x', d: 'Absolute value is a measure of distance, so it is always positive or zero.', ex: '|-25| = 25, \\text{ and } |0| = 0', tip: 'Distance is never negative!' }
            ]
        }
    },
    {
        id: 'addition',
        title: 'Addition of Integers',
        subtitle: 'Skill 3 · Operation',
        icon: '➕',
        color: '#0d9488',
        desc: 'Add numbers with same or different signs.',
        path: '/middle/grade/6/the-other-side-of-zero/addition-of-integers',
        practice: additionPractice,
        assessment: additionAssessment,
        learn: {
            concept: 'Adding integers is like moving along a number line or combining debts and credits.',
            rules: [
                { title: 'Additive Inverse', f: 'x + (-x) = 0', d: 'The sum of a number and its exact opposite is always zero.', ex: '(-7) + (+7) = 0', tip: 'A $7 credit cancels a $7 debt perfectly.' }
            ]
        }
    },
    {
        id: 'subtraction',
        title: 'Subtraction of Integers',
        subtitle: 'Skill 4 · Operation',
        icon: '➖',
        color: '#f59e0b',
        desc: 'Learn to subtract by adding the opposite.',
        path: '/middle/grade/6/the-other-side-of-zero/subtraction-of-integers',
        practice: subtractionPractice,
        assessment: subtractionAssessment,
        learn: {
            concept: 'Subtraction in integers is just addition in disguise.',
            rules: [
                { title: 'Adding the Opposite', f: 'a - b = a + (-b)', d: 'To subtract an integer, you add its additive inverse instead.', ex: '10 - (-5) = 10 + 5 = 15', tip: 'Taking away a negative is a positive thing!' }
            ]
        }
    },
    {
        id: 'numberline',
        title: 'Number Line',
        subtitle: 'Skill 5 · Concept',
        icon: '➡️',
        color: '#ec4899',
        desc: 'Plot points and understand movement on the line.',
        path: '/middle/grade/6/the-other-side-of-zero/number-line-representation',
        practice: numberlinePractice,
        assessment: numberlineAssessment,
        learn: {
            concept: 'The true map of all integers.',
            rules: [
                { title: 'Visualizing Positions', f: 'Left (-), Right (+)', d: 'Positive numbers go to the right of zero, negative numbers go to the left.', ex: '-3 \\text{ is 3 units left of } 0', tip: 'Zero is the mirror in the middle.' }
            ]
        }
    },
    {
        id: 'wordproblems',
        title: 'Word Problems',
        subtitle: 'Skill 6 · Application',
        icon: '📖',
        color: '#06b6d4',
        desc: 'Solve real-life scenarios involving integers.',
        path: '/middle/grade/6/the-other-side-of-zero/word-problems',
        practice: wordproblemsPractice,
        assessment: wordproblemsAssessment,
        learn: {
            concept: 'Integers are everywhere in the real world, hidden in language.',
            rules: [
                { title: 'Context Clues', f: '\\text{Words } \\rightarrow \\text{ Signs}', d: 'Look for words like "below", "debt", or "loss" to indicate negative values.', ex: '50m \\text{ below sea level } = -50', tip: 'Highlight the directional words before doing math.' }
            ]
        }
    }
];

const SkillCard = ({ skill, idx, setActiveSkill, setView }) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                background: '#fff', borderRadius: 18, padding: '24px 32px',
                border: `1.5px solid ${hover ? skill.color : 'rgba(0,0,0,0.06)'}`,
                boxShadow: hover ? `0 12px 28px ${skill.color}20` : '0 4px 12px rgba(0,0,0,0.02)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hover ? 'translateY(-2px)' : 'none',
                cursor: 'default'
            }}
        >
            {/* Skill Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: hover ? `${skill.color}15` : '#f8fafc',
                    color: skill.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0, transition: 'all 0.3s'
                }}>
                    {skill.icon}
                </div>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>
                        {skill.subtitle}
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 800, color: '#0f172a' }}>{skill.title}</h3>
                    <p style={{ margin: 0, fontSize: 13.5, color: '#64748b', fontWeight: 500 }}>{skill.desc}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
                <button
                    onClick={() => { setActiveSkill(idx); setView('learn'); }}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: '1.5px solid #e2e8f0', background: '#fff', color: '#334155',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.color = skill.color; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
                >
                    Learn
                </button>
                <button
                    onClick={() => { setActiveSkill(idx); setView('practice'); }}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: '1.5px solid #e2e8f0', background: '#fff', color: '#334155',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.color = skill.color; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
                >
                    Practice
                </button>
                <button
                    onClick={() => { setActiveSkill(idx); setView('assessment'); }}
                    style={{
                        padding: '10px 24px', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap',
                        borderRadius: 999, cursor: 'pointer', border: 'none', background: skill.color, color: '#fff',
                        transition: 'all 0.2s', boxShadow: `0 4px 12px ${skill.color}30`
                    }}
                >
                    Assess
                </button>
            </div>
        </div>
    );
};

export default function IntegersSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    if (view !== 'list' && skill) {
        return (
            <div className="skills-page" style={{ background: '#f8fafc', minHeight: '100vh', padding: '100px 0 60px' }}>
                <nav className="intro-nav">
                    <button className="intro-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>← Back to Skills</button>
                    <div className="intro-nav-links">
                        <button className="intro-nav-link" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/introduction')}>🌟 Intro</button>
                        <button className="intro-nav-link" onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/terminology')}>📖 Terminology</button>
                        <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>
                <div style={{ padding: '0 24px' }}>
                    {view === 'learn' ? (
                        <div className="int-lexicon-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: 'var(--int-text)', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="int-learn-grid">
                                {/* Side Selector */}
                                <aside className="int-learn-sidebar" style={{
                                    background: 'rgba(255,255,255,0.7)', padding: '12px', borderRadius: 20,
                                    border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 8,
                                    maxHeight: '65vh', overflowY: 'auto'
                                }}>
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button
                                            key={ri}
                                            onClick={() => setSelectedLearnIdx(ri)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12,
                                                border: '1px solid', borderColor: selectedLearnIdx === ri ? skill.color : 'rgba(0,0,0,0.05)',
                                                background: selectedLearnIdx === ri ? skill.color : '#fff',
                                                color: selectedLearnIdx === ri ? '#fff' : 'var(--int-text)',
                                                transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left'
                                            }}
                                        >
                                            <div style={{
                                                width: 24, height: 24, borderRadius: 6,
                                                background: selectedLearnIdx === ri ? 'rgba(255,255,255,0.2)' : `${skill.color}15`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 14, fontWeight: 900, flexShrink: 0
                                            }}>{ri + 1}</div>
                                            <span style={{ fontWeight: 700, fontSize: 15 }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detailed Window */}
                                <main className="details-window-anim int-details-window" key={selectedLearnIdx} style={{
                                    background: '#fff', borderRadius: 20, padding: '24px 32px', border: `2px solid ${skill.color}15`,
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.03)', minHeight: 400
                                }}>
                                    <div className="int-learn-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--int-muted)' }}>CONCEPT {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Core Formula Box */}
                                    <div style={{ background: `${skill.color}05`, padding: '24px', borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 32, textAlign: 'center' }}>
                                        <div className="formula-text" style={{ fontSize: 42, fontWeight: 800, color: skill.color }}>
                                            <MathRenderer text={`$$${skill.learn.rules[selectedLearnIdx].f}$$`} />
                                        </div>
                                    </div>

                                    <div className="int-rule-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: 'var(--int-muted)', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: 'var(--int-text)' }}>{skill.learn.rules[selectedLearnIdx].d}</p>

                                            <div style={{ marginTop: 24, background: 'rgba(20,184,166,0.05)', padding: '16px', borderRadius: 16, border: '1px solid rgba(20,184,166,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--int-muted)' }}>
                                                    <span style={{ fontWeight: 800, color: 'var(--int-teal)' }}>🛡️ Survival Tip: </span>
                                                    {skill.learn.rules[selectedLearnIdx].tip}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--int-text)' }}>
                                                    <MathRenderer text={skill.learn.rules[selectedLearnIdx].ex.includes('$') ? skill.learn.rules[selectedLearnIdx].ex : `$$${skill.learn.rules[selectedLearnIdx].ex}$$`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnotes */}
                                    <div className="int-learn-footer" style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                                        <button className="int-btn-primary" onClick={() => navigate(skill.path)} style={{ padding: '14px 32px', background: skill.color, fontSize: 15 }}>Mastered this? Try Practice →</button>
                                        <button className="int-btn-secondary" onClick={() => {
                                            const nextIdx = (selectedLearnIdx + 1) % skill.learn.rules.length;
                                            setSelectedLearnIdx(nextIdx);
                                        }} style={{ padding: '14px 32px', fontSize: 15 }}>Next: {skill.learn.rules[(selectedLearnIdx + 1) % skill.learn.rules.length].title}</button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : (
                        <QuizEngine
                            questions={view === 'practice' ? skill.practice : skill.assessment}
                            title={`${view === 'practice' ? 'Practice' : 'Assessment'}: ${skill.title}`}
                            onBack={() => setView('list')}
                            color={skill.color}
                        />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="skills-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="intro-nav">
                <button
                    className="intro-nav-back"
                    onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/integers')}
                >
                    ← Back to Integers
                </button>

                <div className="intro-nav-links">
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/introduction')}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="intro-nav-link"
                        onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/terminology')}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="intro-nav-link intro-nav-link--active"
                        onClick={() => navigate('/middle/grade/6/the-other-side-of-zero/skills')}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── MAIN CONTENT ──────────────────────────────── */}
            <div className="int-lexicon-container" style={{ maxWidth: 1100, margin: '80px auto 40px', padding: '0 24px' }}>

                {/* Compact Heading Line */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 32
                }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.1rem', fontWeight: 900, color: 'var(--int-text)', margin: '0 0 6px' }}>
                        Integers <span style={{ background: 'linear-gradient(135deg, var(--int-teal), var(--int-indigo))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--int-muted)', letterSpacing: 0.5 }}>
                        Step up from concepts to technical mastery.
                    </div>
                </div>

                {/* Vertical Skills List */}
                <div className="int-skills-list" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {SKILLS.map((skill, idx) => (
                        <SkillCard key={skill.id} skill={skill} idx={idx} setActiveSkill={setActiveSkill} setView={setView} />
                    ))}
                </div>

                {/* Final Motivation Banner */}
                <div style={{
                    marginTop: 48,
                    background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                    borderRadius: 24,
                    padding: '40px 32px',
                    textAlign: 'center',
                    color: '#fff',
                    boxShadow: '0 20px 40px rgba(13, 148, 136, 0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ fontSize: 32, marginBottom: 16 }}>🚀</div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, margin: '0 0 12px' }}>
                        Ready for More?
                    </h2>
                    <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.9)', maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.5 }}>
                        Continue practicing to unlock advanced topics and master the world of Integers!
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            padding: '12px 32px',
                            fontSize: 15,
                            fontWeight: 800,
                            borderRadius: 999,
                            background: '#fff',
                            color: '#0d9488',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
