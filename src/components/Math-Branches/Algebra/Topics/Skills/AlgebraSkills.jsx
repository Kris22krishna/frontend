import React, { useState } from 'react';

// ─── Shared Quiz Engine ────────────────────────────────────────────────────
function QuizEngine({ questions, title, onBack }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = questions[current];
    const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (optIdx) => {
        if (answered) return;
        setSelected(optIdx);
        setAnswered(true);
        if (optIdx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswered(false);
        }
    };

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const conicDeg = Math.round((score / questions.length) * 360);
        let msg = pct >= 90 ? '🏆 Excellent!' : pct >= 70 ? '🌟 Great job!' : pct >= 50 ? '👍 Good effort!' : '💪 Keep practising!';
        let msgSub = pct >= 90 ? 'You\'ve mastered this skill!' : pct >= 70 ? 'Almost there — review the ones you missed.' : pct >= 50 ? 'Review the concepts and try again.' : 'Go back and study the examples, then retry.';

        return (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{
                    width: 160, height: 160, borderRadius: '50%',
                    background: `conic-gradient(#6c63ff ${conicDeg}deg, rgba(255,255,255,0.05) 0deg)`,
                    margin: '0 auto 32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 50px rgba(108,99,255,0.4)',
                    flexDirection: 'column',
                }}>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 48, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{score}</div>
                    <div style={{ fontSize: 14, color: '#9090bb', fontWeight: 600 }}>/{questions.length}</div>
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{msg}</div>
                <div style={{ color: '#9090bb', fontSize: 15, marginBottom: 8 }}>{msgSub}</div>
                <div style={{ color: '#6c63ff', fontSize: 20, fontWeight: 700, marginBottom: 36 }}>{pct}% Score</div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }}
                        style={{
                            padding: '14px 32px', borderRadius: 50, background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
                            color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
                        }}
                    >
                        Try Again
                    </button>
                    <button
                        onClick={onBack}
                        style={{
                            padding: '14px 32px', borderRadius: 50,
                            border: '2px solid rgba(108,99,255,0.3)', background: 'transparent',
                            color: '#e8e8ff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                        }}
                    >
                        ← Back to Skills
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <button onClick={onBack} style={{
                    background: 'none', border: 'none', color: '#9090bb',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12
                }}>← Back to Skills</button>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{title}</h3>
                <div style={{ background: 'rgba(108,99,255,0.15)', borderRadius: 50, height: 8, overflow: 'hidden', marginBottom: 6 }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6c63ff, #00d4aa)', borderRadius: 50, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ textAlign: 'right', fontSize: 13, color: '#9090bb' }}>
                    Question {current + 1} of {questions.length}
                </div>
            </div>

            {/* Question Card */}
            <div style={{
                background: '#1e1e3a', border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: 16, padding: 32, marginBottom: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}>
                <div style={{
                    display: 'inline-block', background: 'linear-gradient(90deg, #6c63ff, #8b5cf6)',
                    padding: '4px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 16
                }}>
                    Q{current + 1}
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, color: '#fff', lineHeight: 1.65, marginBottom: 20 }}>
                    {q.question}
                </div>
                {q.math && (
                    <div style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)',
                        borderRadius: 10, padding: '12px 18px', marginBottom: 20,
                        fontSize: 18, color: '#00d4aa', textAlign: 'center'
                    }}>
                        {q.math}
                    </div>
                )}

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {q.options.map((opt, oi) => {
                        let borderColor = 'rgba(255,255,255,0.08)';
                        let bgColor = 'rgba(255,255,255,0.03)';
                        let textColor = '#e8e8ff';
                        if (answered) {
                            if (oi === q.correct) { borderColor = '#22d9a0'; bgColor = 'rgba(34,217,160,0.12)'; textColor = '#22d9a0'; }
                            else if (oi === selected && selected !== q.correct) { borderColor = '#ff5a7e'; bgColor = 'rgba(255,90,126,0.1)'; textColor = '#ff5a7e'; }
                        } else if (selected === oi) {
                            borderColor = '#6c63ff'; bgColor = 'rgba(108,99,255,0.15)';
                        }
                        return (
                            <button
                                key={oi}
                                onClick={() => handleSelect(oi)}
                                disabled={answered}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '16px 20px', borderRadius: 10,
                                    border: `2px solid ${borderColor}`,
                                    background: bgColor, cursor: answered ? 'default' : 'pointer',
                                    fontSize: 15, color: textColor, textAlign: 'left', width: '100%',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <span style={{
                                    width: 32, height: 32, borderRadius: 8,
                                    background: `${borderColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: 13, flexShrink: 0, color: borderColor
                                }}>
                                    {String.fromCharCode(65 + oi)}
                                </span>
                                <span style={{ fontFamily: opt.includes('^') || opt.includes('=') ? 'JetBrains Mono, monospace' : 'inherit' }}>
                                    {opt}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {answered && (
                    <div style={{
                        marginTop: 18, padding: '16px 20px', borderRadius: 10,
                        background: 'rgba(34,217,160,0.06)', border: '1px solid rgba(34,217,160,0.2)',
                        color: '#9090bb', fontSize: 14, lineHeight: 1.6
                    }}>
                        <strong style={{ color: '#22d9a0' }}>💡 Explanation: </strong>
                        {q.explanation}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={handleNext}
                    disabled={!answered}
                    style={{
                        padding: '14px 36px', borderRadius: 50,
                        background: answered ? 'linear-gradient(135deg, #6c63ff, #8b5cf6)' : 'rgba(108,99,255,0.2)',
                        color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: answered ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s'
                    }}
                >
                    {current + 1 >= questions.length ? 'View Score →' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}

// ─── SKILL 1: Laws of Exponents ──────────────────────────────────────────
const exponentQuestions = [
    { question: 'What is the value of x³ × x⁴?', math: 'x³ × x⁴ = ?', options: ['x⁷', 'x¹²', 'x', 'x⁻¹'], correct: 0, explanation: 'When multiplying terms with the same base, ADD the exponents: 3 + 4 = 7, so x³ × x⁴ = x⁷.' },
    { question: 'Simplify: a⁵ ÷ a²', math: 'a⁵ ÷ a² = ?', options: ['a³', 'a⁷', 'a¹⁰', 'a⁻³'], correct: 0, explanation: 'When dividing terms with the same base, SUBTRACT the exponents: 5 − 2 = 3, so a⁵ ÷ a² = a³.' },
    { question: 'What is (x²)³?', math: '(x²)³ = ?', options: ['x⁵', 'x⁶', 'x⁸', 'x²'], correct: 1, explanation: 'Power of a power rule: MULTIPLY the exponents. 2 × 3 = 6, so (x²)³ = x⁶.' },
    { question: 'What is any number raised to the power of zero?', math: 'x⁰ = ?', options: ['0', '1', 'x', 'undefined'], correct: 1, explanation: 'Any non-zero number raised to the power 0 equals 1. x⁰ = 1 (for x ≠ 0).' },
    { question: 'Simplify: (2x)³', math: '(2x)³ = ?', options: ['2x³', '6x³', '8x³', '2x'], correct: 2, explanation: 'Raise each factor to the power: 2³ = 8 and x³. So (2x)³ = 8x³.' },
    { question: 'What is x⁻² equal to?', math: 'x⁻² = ?', options: ['−x²', '1/x²', '−1/x²', 'x²'], correct: 1, explanation: 'Negative exponents mean reciprocal: x⁻² = 1/x². The base flips to the denominator.' },
    { question: 'Simplify: y² × y³ × y', math: 'y² × y³ × y = ?', options: ['y⁵', 'y⁶', 'y⁷', 'y⁸'], correct: 1, explanation: 'Add all exponents: 2 + 3 + 1 = 6, so the result is y⁶.' },
    { question: 'Simplify: (x³)⁰', math: '(x³)⁰ = ?', options: ['x³', '0', '1', '3x'], correct: 2, explanation: 'Any expression (non-zero) raised to the power 0 = 1. So (x³)⁰ = 1.' },
    { question: 'Simplify: a⁴ × b⁴', math: 'a⁴ × b⁴ = ?', options: ['ab⁴', '(ab)⁴', 'a⁸b⁴', 'a⁴b⁸'], correct: 1, explanation: 'When different bases have the same power: a⁴ × b⁴ = (ab)⁴.' },
    { question: 'Simplify: m⁶ ÷ m⁶', math: 'm⁶ ÷ m⁶ = ?', options: ['m⁰', '1', '0', 'm⁶'], correct: 1, explanation: 'Subtracting equal exponents gives 0: m⁶ ÷ m⁶ = m⁰ = 1.' },
];

const exponentAssessment = [
    { question: 'Which law applies when you multiply powers with the same base?', math: 'xᵃ × xᵇ = ?', options: ['x^(a+b)', 'x^(a×b)', 'x^(a-b)', 'x^(a÷b)'], correct: 0, explanation: 'Product of Powers Law: add the exponents when multiplying same base.' },
    { question: 'What is (3²)³?', math: '(3²)³ = ?', options: ['3⁵', '3⁶', '27', '729²'], correct: 1, explanation: '(3²)³ = 3^(2×3) = 3⁶ = 729.' },
    { question: 'Simplify: p⁸ ÷ p³', math: 'p⁸ ÷ p³ = ?', options: ['p⁵', 'p¹¹', 'p²⁴', 'p⁻⁵'], correct: 0, explanation: 'Quotient of powers: subtract exponents = 8 − 3 = 5.' },
    { question: 'What does x⁻³ equal?', math: 'x⁻³ = ?', options: ['−x³', '1/x³', 'x³', '−1/x³'], correct: 1, explanation: 'Negative exponent means reciprocal: x⁻³ = 1/x³.' },
    { question: 'What is (4ab)⁰?', math: '(4ab)⁰ = ?', options: ['4ab', '0', '1', '4'], correct: 2, explanation: 'Anything to the power 0 = 1 (as long as base ≠ 0).' },
    { question: 'Simplify: 2³ × 2⁴', math: '2³ × 2⁴ = ?', options: ['2⁷', '2¹²', '4⁷', '128'], correct: 0, explanation: 'Same base: 2³ × 2⁴ = 2^(3+4) = 2⁷.' },
    { question: 'Simplify: (xy)³', math: '(xy)³ = ?', options: ['xy³', 'x³y', 'x³y³', 'xy'], correct: 2, explanation: 'Power of a product: (xy)³ = x³ × y³ = x³y³.' },
    { question: 'What is (a²)⁴ × a²?', math: '(a²)⁴ × a² = ?', options: ['a⁸', 'a¹⁰', 'a⁶', 'a¹²'], correct: 1, explanation: '(a²)⁴ = a⁸, then a⁸ × a² = a^(8+2) = a¹⁰.' },
    { question: 'Simplify: (2x²)³', math: '(2x²)³ = ?', options: ['6x⁵', '8x⁶', '2x⁶', '6x⁶'], correct: 1, explanation: '2³ = 8, (x²)³ = x⁶. So (2x²)³ = 8x⁶.' },
    { question: 'Which is NOT a valid simplification of n⁵ ÷ n⁵?', math: 'n⁵ ÷ n⁵ = ?', options: ['n⁰', '1', '0', 'n⁵/n⁵'], correct: 2, explanation: 'n⁵/n⁵ = n⁰ = 1. The answer is NOT 0.' },
];

// ─── SKILL 2: Like and Unlike Terms ──────────────────────────────────────
const likeTermsQuestions = [
    { question: 'Which pair are LIKE terms?', options: ['3x and 3y', '5x² and 5x', '4ab and −ab', '7 and 7y'], correct: 2, explanation: '4ab and −ab have the same variables (a and b) raised to the same powers. They are like terms!' },
    { question: 'Which pair are UNLIKE terms?', options: ['6m and −2m', '3x² and 7x²', '5ab and 2ab', '4p and 3q'], correct: 3, explanation: '4p and 3q have DIFFERENT variables (p vs q), making them unlike terms.' },
    { question: 'Identify the like terms in: 3x, 5y, −2x, 7z', options: ['3x and 5y', '3x and −2x', '5y and 7z', 'All are like'], correct: 1, explanation: '3x and −2x both have variable x with power 1. They are like terms.' },
    { question: 'Are 5x² and 5x like terms?', options: ['Yes — same variable', 'No — different powers', 'Yes — same coefficient', 'Depends on x'], correct: 1, explanation: 'Though both have x, their powers differ (2 vs 1). Like terms need SAME variable AND SAME power.' },
    { question: 'Which group contains only like terms?', options: ['3x, 5x², 7x³', '2ab, −5ab, 8ab', '4x, 4y, 4z', '3, 3x, 3x²'], correct: 1, explanation: '2ab, −5ab, 8ab all have the same variables (a and b) with the same powers — they are all like terms!' },
    { question: 'Simplify: 3x + 5x', math: '3x + 5x = ?', options: ['15x', '8x', '8x²', '35x'], correct: 1, explanation: '3x + 5x = (3+5)x = 8x. Add coefficients, keep variable.' },
    { question: 'Simplify: 7y² − 3y²', math: '7y² − 3y² = ?', options: ['4', '4y', '4y²', '4y⁴'], correct: 2, explanation: '7y² − 3y² = (7−3)y² = 4y². Subtract coefficients, keep variable and power.' },
    { question: 'Can 4x and 4x² be added directly?', options: ['Yes, result is 8x', 'Yes, result is 8x²', 'No, they are unlike terms', 'Yes, result is 8x³'], correct: 2, explanation: 'Different powers (1 and 2) make them unlike terms — they CANNOT be added.' },
    { question: 'How many like terms does 5a² − 3b + 2a² + b have?', options: ['None', '2 sets', '1 set', 'All are like'], correct: 1, explanation: '5a² and 2a² are like, −3b and b are like — two pairs/sets of like terms.' },
    { question: 'Simplify: 6m − 4m + 2m', math: '6m − 4m + 2m = ?', options: ['4m', '12m', '0m', '8m'], correct: 0, explanation: '6 − 4 + 2 = 4, so 6m − 4m + 2m = 4m.' },
];

const likeTermsAssessment = [
    { question: 'Which are like terms?', options: ['x³ and x²', '2xy and 3xy', '4x and 4', '5x and 5y'], correct: 1, explanation: '2xy and 3xy have identical variable parts (xy), so they are like terms.' },
    { question: 'Simplify: 9n − 5n + n', math: '9n − 5n + n = ?', options: ['5n', '4n', '3n', '15n'], correct: 0, explanation: '9 − 5 + 1 = 5, so the result is 5n.' },
    { question: 'Identify all like terms in: 5x², 3x, 7x², 2y, −x', options: ['5x² and 3x', '5x² and 7x²; 3x and −x', '3x and 2y', '5x² and −x'], correct: 1, explanation: '5x² and 7x² share power 2; 3x and −x share power 1. Two sets of like terms.' },
    { question: 'Which expression is fully simplified?', options: ['3x + 5x + 2y', '8x + 2y', '10xy', '2x + 5 + y'], correct: 1, explanation: '3x + 5x = 8x (combined), plus 2y (cannot combine). So 8x + 2y is simplest.' },
    { question: 'What is the coefficient of x² in: 4x² − 7 + 2x − 4x²?', options: ['4', '−4', '0', '2'], correct: 2, explanation: '4x² − 4x² = 0x² = 0. The coefficient of x² is 0.' },
    { question: 'Are 3abc and −2abc like terms?', options: ['No — different signs', 'No — different letters', 'Yes — same variable part', 'Cannot determine'], correct: 2, explanation: 'Sign doesn\'t matter for "like terms" classification. Both have same variables abc.' },
    { question: 'Simplify: a + 2a + 3a + 4a', math: 'a + 2a + 3a + 4a = ?', options: ['24a', '10a', '12a', '9a'], correct: 1, explanation: '1 + 2 + 3 + 4 = 10. Result is 10a.' },
    { question: 'How many unlike-term pairs in: 3x, 7y, 4x, 2z?', options: ['1', '2', '3', '0'], correct: 2, explanation: '3x/7y, 3x/2z, 7y/2z (plus 4x/7y, 4x/2z) — multiple unlike pairs exist.' },
    { question: 'Simplify: 5x² + 3x − 2x² − x', math: '5x² + 3x − 2x² − x = ?', options: ['3x² + 2x', '7x² + 4x', '3x² − 2x', '3x² + 4x'], correct: 0, explanation: '5x² − 2x² = 3x² and 3x − x = 2x. Result: 3x² + 2x.' },
    { question: 'Which statement is FALSE?', options: ['5x and −5x are like terms', '3y² and 3y are unlike terms', 'abc and cba are like terms', '4x and 4y are like terms'], correct: 3, explanation: '4x and 4y have DIFFERENT variables — they are unlike terms. This is false.' },
];

// ─── SKILL 3: Simplifying Expressions ─────────────────────────────────────
const expressionQuestions = [
    { question: 'Add the expressions: (3x + 5) + (2x − 3)', math: '(3x + 5) + (2x − 3)', options: ['5x + 2', '5x + 8', '5x − 2', '5x + 3'], correct: 0, explanation: 'Add like terms: (3x + 2x) + (5 − 3) = 5x + 2.' },
    { question: 'Subtract: (7x + 4) − (3x + 1)', math: '(7x + 4) − (3x + 1)', options: ['4x + 3', '4x + 5', '10x + 5', '4x + 3'], correct: 0, explanation: 'Distribute the minus: 7x + 4 − 3x − 1 = (7x−3x) + (4−1) = 4x + 3.' },
    { question: 'Multiply: 3x(2x + 5)', math: '3x(2x + 5)', options: ['6x + 15', '6x² + 15x', '6x² + 15', '5x² + 15x'], correct: 1, explanation: 'Distribute: 3x × 2x = 6x² and 3x × 5 = 15x. Result: 6x² + 15x.' },
    { question: 'Simplify: (2x + 3)(x − 4)', math: '(2x + 3)(x − 4)', options: ['2x² − 5x − 12', '2x² + 5x − 12', '2x² − 5x + 12', '2x² − 8x − 12'], correct: 0, explanation: 'FOIL: 2x·x + 2x·(−4) + 3·x + 3·(−4) = 2x² − 8x + 3x − 12 = 2x² − 5x − 12.' },
    { question: 'Divide: 6x² ÷ 2x', math: '6x² ÷ 2x', options: ['3x', '3x²', '6x', '12x'], correct: 0, explanation: '6÷2 = 3, x²÷x = x. Result: 3x.' },
    { question: 'Simplify: (x + 2) + (x + 2) + (x + 2)', math: '(x+2) + (x+2) + (x+2)', options: ['x + 6', '3x + 6', '3x + 2', '3x + 9'], correct: 1, explanation: '3 × (x + 2) = 3x + 6. Multiply each part by 3.' },
    { question: 'Subtract: (4a² + 3a + 5) − (2a² + a − 2)', math: '(4a² + 3a + 5) − (2a² + a − 2)', options: ['2a² + 2a + 7', '2a² + 4a + 7', '6a² + 4a + 3', '2a² + 2a + 3'], correct: 0, explanation: 'Subtract each term: (4−2)a² + (3−1)a + (5−(−2)) = 2a² + 2a + 7.' },
    { question: 'Multiply: −2y(3y − 4)', math: '−2y(3y − 4)', options: ['−6y² + 8y', '−6y² − 8y', '6y² − 8y', '−6y + 8y'], correct: 0, explanation: '−2y × 3y = −6y² and −2y × (−4) = +8y. Result: −6y² + 8y.' },
    { question: 'Divide: 12a³b² ÷ 4ab', math: '12a³b² ÷ 4ab', options: ['3a²b', '8a²b', '3a²b²', '3ab'], correct: 0, explanation: '12÷4=3, a³÷a=a², b²÷b=b. Result: 3a²b.' },
    { question: 'Add: (5x² − 3x + 1) + (−2x² + 4x − 6)', math: '(5x² − 3x + 1) + (−2x² + 4x − 6)', options: ['3x² + x − 5', '3x² − x − 5', '7x² − x + 7', '3x² + x + 5'], correct: 0, explanation: '(5−2)x² + (−3+4)x + (1−6) = 3x² + x − 5.' },
];

const expressionAssessment = [
    { question: 'Simplify: (6y + 4) + (−2y + 3)', math: '(6y + 4) + (−2y + 3)', options: ['4y + 7', '8y + 7', '4y + 1', '4y − 7'], correct: 0, explanation: '(6y − 2y) + (4 + 3) = 4y + 7.' },
    { question: 'Multiply: 4a(a − 3)', math: '4a(a − 3)', options: ['4a² − 12a', '4a² − 12', '4a − 12a', '4a² + 12a'], correct: 0, explanation: '4a × a = 4a² and 4a × (−3) = −12a. Result: 4a² − 12a.' },
    { question: 'Divide: 15x²y ÷ 5xy', math: '15x²y ÷ 5xy', options: ['3x', '3xy', '3y', '10x'], correct: 0, explanation: '15÷5=3, x²÷x=x, y÷y=1. Result: 3x.' },
    { question: 'Subtract: (8n² − n) − (3n² + 4n)', math: '(8n² − n) − (3n² + 4n)', options: ['5n² − 5n', '5n² + 5n', '5n² − 3n', '11n² − 5n'], correct: 0, explanation: '(8−3)n² + (−1−4)n = 5n² − 5n.' },
    { question: 'Expand: (x + 3)(x + 5)', math: '(x + 3)(x + 5)', options: ['x² + 15', 'x² + 8x + 15', 'x² + 8x + 8', 'x² + 15x + 8'], correct: 1, explanation: 'FOIL: x² + 5x + 3x + 15 = x² + 8x + 15.' },
    { question: 'Simplify: 3(2x + 1) − 2(x − 4)', math: '3(2x + 1) − 2(x − 4)', options: ['4x + 11', '4x − 11', '8x + 11', '4x + 3'], correct: 0, explanation: '6x + 3 − 2x + 8 = 4x + 11.' },
    { question: 'Expand: 2x(x + 3) + 3(x − 2)', math: '2x(x + 3) + 3(x − 2)', options: ['2x² + 9x − 6', '2x² + 3x − 6', '2x² + 6x + 3', '5x(x+1)−6'], correct: 0, explanation: '2x² + 6x + 3x − 6 = 2x² + 9x − 6.' },
    { question: 'Divide: 9x³ ÷ 3x²', math: '9x³ ÷ 3x²', options: ['3x', '6x', '3x²', '3'], correct: 0, explanation: '9÷3=3, x³÷x²=x. Result: 3x.' },
    { question: 'What is the difference of: (p² + 4p − 3) and (p² − 2p + 1)?', math: '(p² + 4p − 3) − (p² − 2p + 1)', options: ['6p − 4', '2p² + 2p − 2', '6p + 4', '2p − 4'], correct: 0, explanation: '(1−1)p² + (4−(−2))p + (−3−1) = 0 + 6p − 4 = 6p − 4.' },
    { question: 'Expand and simplify: (a + b)² = ?', math: '(a + b)²', options: ['a² + b²', 'a² + ab + b²', 'a² + 2ab + b²', '2a + 2b'], correct: 2, explanation: '(a+b)² = (a+b)(a+b) = a² + 2ab + b². This is a key identity!' },
];

// ─── SKILL 4: Solving Equations ───────────────────────────────────────────
const equationQuestions = [
    { question: 'Solve: x + 7 = 15', math: 'x + 7 = 15', options: ['x = 8', 'x = 22', 'x = 7', 'x = 105'], correct: 0, explanation: 'Subtract 7 from both sides: x = 15 − 7 = 8.' },
    { question: 'Solve: 3x = 21', math: '3x = 21', options: ['x = 7', 'x = 63', 'x = 18', 'x = 8'], correct: 0, explanation: 'Divide both sides by 3: x = 21 ÷ 3 = 7.' },
    { question: 'Solve: 2x − 5 = 11', math: '2x − 5 = 11', options: ['x = 3', 'x = 8', 'x = 6', 'x = 16'], correct: 1, explanation: 'Add 5: 2x = 16. Divide by 2: x = 8.' },
    { question: 'Solve: x/4 = 5', math: 'x/4 = 5', options: ['x = 20', 'x = 1.25', 'x = 9', 'x = 5'], correct: 0, explanation: 'Multiply both sides by 4: x = 5 × 4 = 20.' },
    { question: 'Solve: 4x + 2 = 18', math: '4x + 2 = 18', options: ['x = 4', 'x = 5', 'x = 3', 'x = 6'], correct: 0, explanation: 'Subtract 2: 4x = 16. Divide by 4: x = 4.' },
    { question: 'Solve the system: x + y = 10, x − y = 2', math: 'x + y = 10  and  x − y = 2', options: ['x=6, y=4', 'x=5, y=5', 'x=4, y=6', 'x=8, y=2'], correct: 0, explanation: 'Adding equations: 2x = 12 → x = 6. Then y = 10 − 6 = 4.' },
    { question: 'Solve: 2x + y = 7 and x = 2', math: '2x + y = 7, x = 2', options: ['y = 3', 'y = 5', 'y = 11', 'y = 2'], correct: 0, explanation: 'Substitute x = 2: 2(2) + y = 7 → 4 + y = 7 → y = 3.' },
    { question: 'Solve the quadratic: x² = 9', math: 'x² = 9', options: ['x = 3 only', 'x = 9', 'x = ±3', 'x = ±9'], correct: 2, explanation: 'Taking square root of both sides: x = ±√9 = ±3.' },
    { question: 'Solve: x² − 5x + 6 = 0', math: 'x² − 5x + 6 = 0', options: ['x = 2 or x = 3', 'x = −2 or x = −3', 'x = 1 or x = 6', 'x = 5 or x = 1'], correct: 0, explanation: 'Factorise: (x−2)(x−3) = 0, so x = 2 or x = 3.' },
    { question: 'Solve: x² + x − 6 = 0', math: 'x² + x − 6 = 0', options: ['x = 2 or x = −3', 'x = −2 or x = 3', 'x = 1 or x = −6', 'x = 2 or x = 3'], correct: 0, explanation: 'Factorise: (x+3)(x−2) = 0, so x = −3 or x = 2. Rearranged: x = 2 or x = −3.' },
];

const equationAssessment = [
    { question: 'Solve: n − 13 = 5', math: 'n − 13 = 5', options: ['n = 18', 'n = 8', 'n = −8', 'n = 65'], correct: 0, explanation: 'Add 13 to both sides: n = 18.' },
    { question: 'Solve: 5y = 45', math: '5y = 45', options: ['y = 9', 'y = 225', 'y = 40', 'y = 5'], correct: 0, explanation: 'Divide by 5: y = 9.' },
    { question: 'Solve: 3x + 4 = 22', math: '3x + 4 = 22', options: ['x = 6', 'x = 8.67', 'x = 5', 'x = 26/3'], correct: 0, explanation: '3x = 18 → x = 6.' },
    { question: 'Use substitution: y = 2x, x + y = 9. Find x.', math: 'y = 2x, x + y = 9', options: ['x = 3', 'x = 4', 'x = 4.5', 'x = 6'], correct: 0, explanation: 'x + 2x = 9 → 3x = 9 → x = 3.' },
    { question: 'Solve: 2x + 3y = 12 and x = 3', math: '2x + 3y = 12, x = 3', options: ['y = 2', 'y = 3', 'y = 6', 'y = 1'], correct: 0, explanation: '6 + 3y = 12 → 3y = 6 → y = 2.' },
    { question: 'Solve the quadratic: x² − 7x + 12 = 0', math: 'x² − 7x + 12 = 0', options: ['x = 3 or x = 4', 'x = −3 or x = −4', 'x = 1 or x = 12', 'x = 6 or x = 2'], correct: 0, explanation: 'Factorise: (x−3)(x−4) = 0 → x = 3 or x = 4.' },
    { question: 'A number doubled plus 4 equals 20. Find the number.', options: ['8', '12', '10', '6'], correct: 0, explanation: '2x + 4 = 20 → 2x = 16 → x = 8.' },
    { question: 'Solve: 4x − 2 = 3x + 5', math: '4x − 2 = 3x + 5', options: ['x = 7', 'x = 3', 'x = −3', 'x = 1'], correct: 0, explanation: '4x − 3x = 5 + 2 → x = 7.' },
    { question: 'What are the roots of x² − 4 = 0?', math: 'x² − 4 = 0', options: ['x = ±2', 'x = 4', 'x = 2 only', 'x = ±4'], correct: 0, explanation: 'x² = 4 → x = ±2.' },
    { question: 'Solve: x/3 + 2 = 5', math: 'x/3 + 2 = 5', options: ['x = 9', 'x = 3', 'x = 21', 'x = 1'], correct: 0, explanation: 'x/3 = 3 → x = 9.' },
];

// ─── SKILL 5: Changing the Subject ────────────────────────────────────────
const subjectQuestions = [
    { question: 'Make x the subject: y = x + 5', math: 'y = x + 5  →  x = ?', options: ['x = y − 5', 'x = y + 5', 'x = 5 − y', 'x = y/5'], correct: 0, explanation: 'Subtract 5 from both sides: x = y − 5.' },
    { question: 'Make x the subject: y = 3x', math: 'y = 3x  →  x = ?', options: ['x = y + 3', 'x = y − 3', 'x = y/3', 'x = 3y'], correct: 2, explanation: 'Divide both sides by 3: x = y/3.' },
    { question: 'Make r the subject of the area formula: A = πr²', math: 'A = πr²  →  r = ?', options: ['r = A/π', 'r = √(A/π)', 'r = √(Aπ)', 'r = A²/π'], correct: 1, explanation: 'Divide by π: r² = A/π. Take square root: r = √(A/π).' },
    { question: 'Make b the subject: P = 2(l + b)', math: 'P = 2(l + b)  →  b = ?', options: ['b = P/2 − l', 'b = P − 2l', 'b = 2P − l', 'b = P + l'], correct: 0, explanation: 'Divide by 2: P/2 = l + b. Then b = P/2 − l.' },
    { question: 'Make v the subject: s = ut + ½at²', math: 's = ut + ½at²  →  u = ?', options: ['u = s/t + ½at', 'u = (s − ½at²)/t', 'u = s − at', 'u = s/t − a'], correct: 1, explanation: 'Subtract ½at²: ut = s − ½at². Divide by t: u = (s − ½at²)/t.' },
    { question: 'Make y the subject: 3x + 2y = 12', math: '3x + 2y = 12  →  y = ?', options: ['y = (12 − 3x)/2', 'y = 12 − 3x', 'y = 3x − 12', 'y = 12 + 3x'], correct: 0, explanation: '2y = 12 − 3x → y = (12 − 3x)/2.' },
    { question: 'Make h the subject: V = lbh', math: 'V = lbh  →  h = ?', options: ['h = V × lb', 'h = V/lb', 'h = V − lb', 'h = lb/V'], correct: 1, explanation: 'Divide both sides by lb: h = V/lb.' },
    { question: 'Make C the subject: F = (9/5)C + 32', math: 'F = (9/5)C + 32  →  C = ?', options: ['C = (F − 32) × 5/9', 'C = (F + 32) × 9/5', 'C = 5F/9 − 32', 'C = F − 32'], correct: 0, explanation: 'F − 32 = (9/5)C → C = (F − 32) × 5/9.' },
    { question: 'Make a the subject: v = u + at', math: 'v = u + at  →  a = ?', options: ['a = (v − u)t', 'a = (v − u)/t', 'a = v − u', 'a = vt − u'], correct: 1, explanation: 'v − u = at → a = (v − u)/t.' },
    { question: 'Make x the subject: y = (x + 2)/(x − 1)', math: 'y = (x + 2)/(x − 1)  →  x = ?', options: ['x = (2 + y)/(y − 1)', 'x = (y − 2)/(y + 1)', 'x = (2 − y)', 'x = y + 3'], correct: 0, explanation: 'y(x−1) = x+2 → yx − y = x + 2 → yx − x = y + 2 → x(y−1) = y+2 → x = (y+2)/(y−1).' },
];

const subjectAssessment = [
    { question: 'Make m the subject: E = mc²', math: 'E = mc²  →  m = ?', options: ['m = E/c²', 'm = Ec²', 'm = E − c²', 'm = E × c'], correct: 0, explanation: 'Divide both sides by c²: m = E/c².' },
    { question: 'Make x the subject: 5x − 3y = 10', math: '5x − 3y = 10  →  x = ?', options: ['x = (10 + 3y)/5', 'x = (10 − 3y)/5', 'x = 2 + 3y', 'x = 5(10 − 3y)'], correct: 0, explanation: '5x = 10 + 3y → x = (10 + 3y)/5.' },
    { question: 'Make t the subject: s = ½gt²', math: 's = ½gt²  →  t = ?', options: ['t = √(2s/g)', 't = 2s/g', 't = √(s/g)', 't = s/2g'], correct: 0, explanation: 'gt² = 2s → t² = 2s/g → t = √(2s/g).' },
    { question: 'If A = (h/2)(a + b), make h the subject', math: 'A = (h/2)(a + b)  →  h = ?', options: ['h = 2A/(a+b)', 'h = A(a+b)/2', 'h = 2A − (a+b)', 'h = A/2(a+b)'], correct: 0, explanation: '2A = h(a+b) → h = 2A/(a+b).' },
    { question: 'Make n the subject: S = n/2 × (a + l)', math: 'S = n/2 × (a+l)  →  n = ?', options: ['n = 2S/(a+l)', 'n = S(a+l)/2', 'n = 2S − (a+l)', 'n = (a+l)/2S'], correct: 0, explanation: '2S = n(a+l) → n = 2S/(a+l).' },
    { question: 'Make y the subject: ax + by = c', math: 'ax + by = c  →  y = ?', options: ['y = (c − ax)/b', 'y = c − ax', 'y = (c + ax)/b', 'y = c/b − a'], correct: 0, explanation: 'by = c − ax → y = (c − ax)/b.' },
    { question: 'What operation undoes squaring when changing subject?', options: ['Halving', 'Square root', 'Squaring again', 'Multiplying'], correct: 1, explanation: 'To undo x², take the square root: √(x²) = x (for x ≥ 0).' },
    { question: 'Make x subject: y = √(x + 4)', math: 'y = √(x + 4)  →  x = ?', options: ['x = y² − 4', 'x = y + 4', 'x = y² + 4', 'x = √y − 4'], correct: 0, explanation: 'Square both sides: y² = x + 4 → x = y² − 4.' },
    { question: 'Make l the subject: T = 2π√(l/g)', math: 'T = 2π√(l/g)  →  l = ?', options: ['l = gT²/4π²', 'l = 4π²T/g', 'l = gT/2π', 'l = T²g/2π'], correct: 0, explanation: 'T/2π = √(l/g) → T²/4π² = l/g → l = gT²/4π².' },
    { question: 'Make r the subject: C = 2πr', math: 'C = 2πr  →  r = ?', options: ['r = C/2π', 'r = 2πC', 'r = C − 2π', 'r = C²/2π'], correct: 0, explanation: 'Divide by 2π: r = C/(2π).' },
];

// ─── Main Skills Component ────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'exponents',
        title: 'Laws of Exponents',
        subtitle: 'Skill 1 · Simplifying Terms',
        icon: '⚡',
        color: '#6c63ff',
        desc: 'Apply laws like product rule, quotient rule, power rule, and zero exponent to simplify algebraic terms.',
        practice: exponentQuestions,
        assessment: exponentAssessment,
    },
    {
        id: 'liketerms',
        title: 'Like & Unlike Terms',
        subtitle: 'Skill 2 · Identification',
        icon: '🤝',
        color: '#00d4aa',
        desc: 'Learn to identify like terms (same variable, same power) and unlike terms, then combine like terms correctly.',
        practice: likeTermsQuestions,
        assessment: likeTermsAssessment,
    },
    {
        id: 'expressions',
        title: 'Simplifying Expressions',
        subtitle: 'Skill 3 · Add, Subtract, Multiply, Divide',
        icon: '📝',
        color: '#f9a825',
        desc: 'Simplify algebraic expressions through addition, subtraction, multiplication (including FOIL), and division.',
        practice: expressionQuestions,
        assessment: expressionAssessment,
    },
    {
        id: 'equations',
        title: 'Solving Equations',
        subtitle: 'Skill 4 · Linear, Two-Variable & Quadratic',
        icon: '⚖️',
        color: '#ff6b9d',
        desc: 'Solve linear equations in one variable, simultaneous equations in two variables, and quadratic equations.',
        practice: equationQuestions,
        assessment: equationAssessment,
    },
    {
        id: 'subject',
        title: 'Changing the Subject',
        subtitle: 'Skill 5 · Rearranging Formulas',
        icon: '🔄',
        color: '#8b5cf6',
        desc: 'Rearrange formulas to make any variable the subject — an essential skill in physics, geometry, and science.',
        practice: subjectQuestions,
        assessment: subjectAssessment,
    },
];

export default function AlgebraSkills({ onBack }) {
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment'
    const [activeSkill, setActiveSkill] = useState(null);

    if (view === 'practice' && activeSkill !== null) {
        return (
            <div style={{ background: '#0f0f1a', minHeight: '100vh', padding: '24px 0' }}>
                <QuizEngine
                    questions={SKILLS[activeSkill].practice}
                    title={`Practice: ${SKILLS[activeSkill].title}`}
                    onBack={() => setView('list')}
                />
            </div>
        );
    }

    if (view === 'assessment' && activeSkill !== null) {
        return (
            <div style={{ background: '#0f0f1a', minHeight: '100vh', padding: '24px 0' }}>
                <QuizEngine
                    questions={SKILLS[activeSkill].assessment}
                    title={`Assessment: ${SKILLS[activeSkill].title}`}
                    onBack={() => setView('list')}
                />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px' }}>
            {/* Intro banner */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(255,107,157,0.08))',
                border: '1px solid rgba(108,99,255,0.25)', borderRadius: 16, padding: 28, marginBottom: 36,
                textAlign: 'center'
            }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🎯</div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                    5 Core Algebra Skills
                </h3>
                <p style={{ color: '#9090bb', fontSize: 15, margin: 0 }}>
                    Each skill has <strong style={{ color: '#6c63ff' }}>10 practice questions</strong> to build confidence and a
                    <strong style={{ color: '#ff6b9d' }}> 10-question assessment</strong> to test mastery.
                </p>
            </div>

            {/* Skill Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {SKILLS.map((skill, idx) => (
                    <div key={skill.id} style={{
                        background: '#1e1e3a', border: `1px solid rgba(${skill.color === '#6c63ff' ? '108,99,255' : skill.color === '#00d4aa' ? '0,212,170' : skill.color === '#f9a825' ? '249,168,37' : skill.color === '#ff6b9d' ? '255,107,157' : '139,92,246'},0.25)`,
                        borderRadius: 16, padding: '24px', borderLeft: `5px solid ${skill.color}`,
                        transition: 'all 0.3s ease',
                    }}>
                        {/* Card header */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: 14,
                                background: `${skill.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 24, flexShrink: 0,
                            }}>{skill.icon}</div>
                            <div>
                                <div style={{
                                    fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: skill.color,
                                    textTransform: 'uppercase', marginBottom: 4
                                }}>{skill.subtitle}</div>
                                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                                    {skill.title}
                                </div>
                                <div style={{ fontSize: 14, color: '#9090bb', lineHeight: 1.6 }}>{skill.desc}</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <button
                                onClick={() => { setActiveSkill(idx); setView('practice'); }}
                                style={{
                                    padding: '10px 24px', borderRadius: 50,
                                    background: `linear-gradient(135deg, ${skill.color}, ${skill.color}aa)`,
                                    color: '#fff', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    boxShadow: `0 4px 14px ${skill.color}40`,
                                }}
                            >
                                ▶ Practice (10 Q)
                            </button>
                            <button
                                onClick={() => { setActiveSkill(idx); setView('assessment'); }}
                                style={{
                                    padding: '10px 24px', borderRadius: 50,
                                    background: 'linear-gradient(135deg, #ff6b9d, #ff8c42)',
                                    color: '#fff', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    boxShadow: '0 4px 14px rgba(255,107,157,0.4)',
                                }}
                            >
                                📋 Assessment (10 Q)
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
