import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../patterns-around-us.css';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const TERMS = [
    {
        name: 'Pattern', color: '#d97706', icon: '🔁',
        def: 'Something that repeats following a secret rule!',
        scene: { items: '⭐', perItem: '🌙⭐🌙', groups: 2, perGroup: 2, label: 'stars', perLabel: 'and moons' },
        tryIt: { q: 'If pattern is 🔴🟡🔴... what is next?', answer: '🟡', hint: 'Look what comes after red!' },
        funFact: '🌟 Patterns are predictable. Because of the rule, we know what comes next!',
        character: '🧑‍🏫'
    },
    {
        name: 'Sequence', color: '#0284c7', icon: '🚂',
        def: 'Objects or numbers arranged in a specific order.',
        scene: { base: 2, by10: 4, by100: 6 },
        tryIt: { q: 'What comes next? 5, 10, 15, ...?', answer: '20', hint: 'Count by 5s!' },
        funFact: '🔢 A sequence is like a train – each carriage follows the one in front according to a rule!',
        character: '🤖'
    },
    {
        name: 'Core', color: '#dc2626', icon: '❤️',
        def: 'The shortest part of a pattern that repeats!',
        scene: { items: '🍎', perItem: '🍌', groups: 3, perGroup: 1, label: 'repeats', perLabel: 'core' },
        tryIt: { q: 'Core of 🐶🐱🐶🐱 is?', answer: '🐶🐱', hint: 'What part repeats over and over?' },
        funFact: '🍎🍌 Find the core, and you unlock the whole pattern puzzle!',
        character: '🕵️'
    },
    {
        name: 'Even Numbers', color: '#7c3aed', icon: '👯‍♂️',
        def: 'Numbers ending in 0, 2, 4, 6, 8. They make perfect pairs!',
        scene: { doubleOf: 4, result: 8 },
        tryIt: { q: 'Is 24 even or odd? (Type 24 for even, 0 for odd)', answer: '24', hint: 'Look at the last digit: 4!' },
        funFact: '👯‍♂️ Even numbers are the best at sharing — everyone gets a partner, with nobody left out!',
        character: '👯'
    },
    {
        name: 'Odd Numbers', color: '#059669', icon: '🧍',
        def: 'Numbers ending in 1, 3, 5, 7, 9. One is always left out!',
        scene: { items: '🎈', perItem: '🎈', groups: 3, perGroup: 2, label: 'pairs', perLabel: '+ 1 left out' },
        tryIt: { q: 'Is 17 even or odd? (Type 0 for odd, 17 for even)', answer: '0', hint: 'Look at the last digit: 7!' },
        funFact: '🧍 Odd numbers try to form pairs, but one is always left standing alone!',
        character: '🦄'
    },
    {
        name: 'Pairs', color: '#be185d', icon: '🧦',
        def: 'A group of exactly two things that belong together.',
        scene: { doubleOf: 1, result: 2 },
        tryIt: { q: 'How many shoes in 3 pairs?', answer: '6', hint: 'Each pair has 2. So 3 × 2!' },
        funFact: '🧦 Socks, shoes, and gloves always come in pairs!',
        character: '🦉'
    },
    {
        name: 'Combinations', color: '#f59e0b', icon: '💰',
        def: 'Using different coins or notes to make the same amount!',
        scene: { splitFrom: 10, splitA: 5, splitB: 5, multiplyBy: 1 },
        tryIt: { q: 'How many ₹5 coins make ₹15?', answer: '3', hint: 'Count by 5s: 5, 10, 15!' },
        funFact: '💰 You can make ₹20 using two ₹10 coins, or four ₹5 coins! Same value, different look!',
        character: '🏦'
    },
    {
        name: 'Rule', color: '#6366f1', icon: '📜',
        def: 'The secret instruction for the pattern (like "Add 3").',
        scene: { base: 10, by10: 13, by100: 16 },
        tryIt: { q: 'Rule: Add 10. Start at 5. Next number is?', answer: '15', hint: '5 + 10 = ?' },
        funFact: '📜 Every pattern has a rule. Once you find it, you are the master of the pattern!',
        character: '🥷'
    },
    {
        name: 'Skip Counting', color: '#0d9488', icon: '🦘',
        def: 'Jumping by the same number each time!',
        scene: { items: '🦘', perItem: 'jump', groups: 4, perGroup: 2, label: 'jumps', perLabel: 'spaces' },
        tryIt: { q: 'Skip count by 2s: 2, 4, 6, ?', answer: '8', hint: 'Add 2 to 6!' },
        funFact: '🦘 Skip counting is just a fast way to add!',
        character: '🦘'
    },
    {
        name: 'Predict', color: '#ea580c', icon: '🔮',
        def: 'Guessing what comes next using the pattern rule.',
        scene: { base: 1, by10: 2, by100: 3 },
        tryIt: { q: 'Predict next in: 100, 200, 300, ?', answer: '400', hint: 'The rule is add 100!' },
        funFact: '🔮 Predicting isn\'t magic; it\'s just using math to know the future!',
        character: '🧙‍♀️'
    },
];

const FIVE_RULES = [
    {
        num: 1, title: 'The Even Rule', emoji: '👯', color: '#d97706',
        rule: 'Ends in 0, 2, 4, 6, or 8? It\'s EVEN!',
        steps: [
            { text: 'Look at the LAST digit', example: '14' },
            { text: 'Is it 0, 2, 4, 6, or 8?', example: '4 is Even!' },
            { text: 'Then the whole number is Even!', example: '14 is EVEN ✅' },
        ],
        tryIt: { q: 'Is 128 Even? (Type 1 for Yes, 0 for No)', answer: '1' },
    },
    {
        num: 2, title: 'The Odd Rule', emoji: '🧍', color: '#0284c7',
        rule: 'Ends in 1, 3, 5, 7, or 9? It\'s ODD!',
        steps: [
            { text: 'Look at the LAST digit', example: '27' },
            { text: 'Is it 1, 3, 5, 7, or 9?', example: '7 is Odd!' },
            { text: 'Then the whole number is Odd!', example: '27 is ODD ✅' },
        ],
        tryIt: { q: 'Is 45 Odd? (Type 1 for Yes, 0 for No)', answer: '1' },
    },
    {
        num: 3, title: 'The Core Rule', emoji: '❤️', color: '#059669',
        rule: 'Find the repeating part to continue a pattern.',
        steps: [
            { text: 'Look at the pattern', example: 'A B C A B C' },
            { text: 'Find the shortest part that repeats', example: 'A B C' },
            { text: 'Repeat it again!', example: '... A B C !' },
        ],
        tryIt: { q: 'If core is 1-2, what comes after 1-2-1-2...?', answer: '1' },
    },
    {
        num: 4, title: 'The Skip Rule', emoji: '🦘', color: '#7c3aed',
        rule: 'Find the difference between numbers to get the rule!',
        steps: [
            { text: 'Look at two numbers in a row', example: '10, 15' },
            { text: 'Find what was added (or subtracted)', example: '15 - 10 = +5' },
            { text: 'Use that rule for the next one!', example: '15 + 5 = 20 ✅' },
        ],
        tryIt: { q: 'Rule is +4. Next after 12 is?', answer: '16' },
    },
    {
        num: 5, title: 'The Money Rule', emoji: '🎯', color: '#ea580c',
        rule: 'Bigger values need fewer coins!',
        steps: [
            { text: 'You want ₹20', example: '₹20' },
            { text: 'Use big coins (₹10) for fewer coins', example: 'Two ₹10 coins' },
            { text: 'Use small coins (₹5) for more coins', example: 'Four ₹5 coins' },
        ],
        tryIt: { q: 'How many ₹10 coins make ₹50?', answer: '5' },
    },
];

const VOCAB_QUIZ = [
    { question: "Which number is an EVEN number?", options: ["13", "25", "48", "91"], correct: 2, explanation: "Even numbers end in 0, 2, 4, 6, or 8! 48 ends in 8." },
    { question: "What is the core of this pattern: ☀️🌙☀️🌙☀️🌙", options: ["☀️🌙", "☀️🌙☀️", "☀️", "🌙"], correct: 0, explanation: "The core is the shortest part that repeats, which is ☀️🌙!" },
    { question: "Next number in sequence: 3, 6, 9, 12, ...?", options: ["13", "14", "15", "16"], correct: 2, explanation: "The rule is Add 3! 12 + 3 = 15." },
    { question: "How many ₹5 coins do you need to make ₹20?", options: ["2", "3", "4", "5"], correct: 2, explanation: "Skip count by 5: 5, 10, 15, 20. That's 4 coins!" },
    { question: "Numbers ending in 1, 3, 5, 7, 9 are called...", options: ["Even", "Odd", "Pairs", "Twins"], correct: 1, explanation: "They are Odd numbers! They always have one left out when pairing." },
    { question: "What does it mean to 'Predict' in patterns?", options: ["Count", "Draw", "Guess what comes next", "Erase"], correct: 2, explanation: "To predict is to use the rule to know what comes next in the sequence." },
    { question: "Is 452 Even or Odd?", options: ["Even", "Odd", "Both", "None"], correct: 0, explanation: "Look at the last digit: 2. 2 is Even, so 452 is Even!" },
    { question: "A 'Pair' means a group of exactly...", options: ["1", "2", "3", "4"], correct: 1, explanation: "A pair is a perfect group of 2, like a pair of shoes!" },
    { question: "Next in pattern: 200, 190, 180, ...?", options: ["185", "175", "170", "190"], correct: 2, explanation: "The rule is Subtract 10! 180 - 10 = 170." },
    { question: "Which is a way to make ₹50?", options: ["Two ₹20 coins", "Five ₹10 coins", "Three ₹10 coins", "Six ₹5 coins"], correct: 1, explanation: "10 + 10 + 10 + 10 + 10 = 50! Five ₹10 coins make ₹50." },
];

/* ═══════════════════════════════════════════════════════════════
   VISUAL SCENE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function MultiplicationScene({ scene, color }) {
    const [showResult, setShowResult] = useState(false);
    useEffect(() => { setShowResult(false); const t = setTimeout(() => setShowResult(true), 800); return () => clearTimeout(t); }, [scene]);

    if (scene.splitFrom !== undefined) return <SplitScene scene={scene} color={color} />;
    if (scene.doubleOf !== undefined) return <DoubleScene scene={scene} color={color} />;
    if (scene.base !== undefined) return <PlaceValueScene scene={scene} color={color} />;
    if (scene.divideInto) return <DivisionScene scene={scene} color={color} showResult={showResult} />;

    // Standard multiplication visual
    const rows = [];
    for (let i = 0; i < scene.groups; i++) {
        rows.push(
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: `${color}08`, borderRadius: 12, animation: `tmBounceIn 0.4s ${i * 0.15}s both` }}>
                <span style={{ fontSize: 28 }}>{scene.items}</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>→</span>
                <span style={{ fontSize: 16, letterSpacing: 2 }}>{scene.perItem}</span>
            </div>
        );
    }

    const total = scene.groups * scene.perGroup;
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 }}>{rows}</div>
            <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>
                {scene.groups} {scene.label} × {scene.perGroup} {scene.perLabel}
            </div>
            <div style={{
                fontSize: 28, fontFamily: 'Outfit, sans-serif', fontWeight: 900, color,
                opacity: showResult ? 1 : 0, transform: showResult ? 'scale(1)' : 'scale(0.5)',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>
                = {total} {showResult && '🎉'}
            </div>
        </div>
    );
}

function DivisionScene({ scene, color, showResult }) {
    const total = scene.groups;
    const divisor = scene.divideInto;
    const quotient = Math.floor(total / divisor);
    const remainder = total % divisor;

    const groups = [];
    let itemIdx = 0;
    for (let g = 0; g < quotient; g++) {
        const groupItems = [];
        for (let j = 0; j < divisor; j++) {
            groupItems.push(<span key={itemIdx++} style={{ fontSize: 20 }}>{scene.items}</span>);
        }
        groups.push(
            <div key={g} style={{
                display: 'flex', gap: 2, padding: '8px 12px', background: `${color}10`, borderRadius: 14,
                border: `2px dashed ${color}40`, animation: `tmBounceIn 0.4s ${g * 0.12}s both`
            }}>
                {groupItems}
            </div>
        );
    }

    const leftover = [];
    for (let r = 0; r < remainder; r++) {
        leftover.push(<span key={r} style={{ fontSize: 20, animation: 'tmFloat 2s infinite ease-in-out', animationDelay: `${r * 0.3}s` }}>{scene.items}</span>);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>
                {total} {scene.label} {scene.perLabel}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
                {groups}
            </div>
            {remainder > 0 && (
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center', padding: '6px 14px', background: '#fef3c7', borderRadius: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginRight: 4 }}>Leftover:</span>
                    {leftover}
                </div>
            )}
            <div style={{
                fontSize: 24, fontWeight: 900, color, fontFamily: 'Outfit, sans-serif',
                opacity: showResult ? 1 : 0, transition: 'opacity 0.5s'
            }}>
                = {quotient} groups {remainder > 0 ? `(R ${remainder})` : ''} {showResult && '✅'}
            </div>
        </div>
    );
}

function SplitScene({ scene, color }) {
    const [step, setStep] = useState(0);
    useEffect(() => { setStep(0); const timers = [setTimeout(() => setStep(1), 600), setTimeout(() => setStep(2), 1200), setTimeout(() => setStep(3), 1800)]; return () => timers.forEach(clearTimeout); }, [scene]);

    const partA = scene.splitA * scene.multiplyBy;
    const partB = scene.splitB * scene.multiplyBy;
    const total = partA + partB;

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 900, fontFamily: 'Outfit, sans-serif', color, marginBottom: 16, transition: 'all 0.3s' }}>
                {step === 0 && <>{scene.splitFrom} × {scene.multiplyBy}</>}
                {step >= 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <span style={{ background: `${color}15`, padding: '4px 14px', borderRadius: 12, animation: 'tmBounceIn 0.4s both' }}>{scene.splitA}</span>
                        <span style={{ fontSize: 20, color: '#94a3b8' }}>+</span>
                        <span style={{ background: `${color}15`, padding: '4px 14px', borderRadius: 12, animation: 'tmBounceIn 0.4s 0.15s both' }}>{scene.splitB}</span>
                        <span style={{ fontSize: 20, color: '#94a3b8' }}>× {scene.multiplyBy}</span>
                    </div>
                )}
            </div>
            {step >= 2 && (
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 12, animation: 'tmBounceIn 0.4s both' }}>
                    <div style={{ padding: '8px 16px', background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0' }}>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{scene.splitA} × {scene.multiplyBy}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#059669' }}>{partA}</div>
                    </div>
                    <span style={{ fontSize: 28, color: '#94a3b8', alignSelf: 'center' }}>+</span>
                    <div style={{ padding: '8px 16px', background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe' }}>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{scene.splitB} × {scene.multiplyBy}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#2563eb' }}>{partB}</div>
                    </div>
                </div>
            )}
            {step >= 3 && (
                <div style={{ fontSize: 28, fontWeight: 900, color, fontFamily: 'Outfit, sans-serif', animation: 'tmBounceIn 0.5s both' }}>
                    = {total} 🎉
                </div>
            )}
        </div>
    );
}

function DoubleScene({ scene, color }) {
    const [doubled, setDoubled] = useState(false);
    useEffect(() => { setDoubled(false); const t = setTimeout(() => setDoubled(true), 800); return () => clearTimeout(t); }, [scene]);

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 16 }}>
                <div style={{ padding: '12px 20px', background: `${color}10`, borderRadius: 16, border: `2px solid ${color}30` }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Original</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color }}>{scene.doubleOf}</div>
                </div>
                <div style={{ fontSize: 28, alignSelf: 'center', animation: 'tmPulse 1s infinite' }}>🪞</div>
                <div style={{
                    padding: '12px 20px', background: `${color}10`, borderRadius: 16, border: `2px solid ${color}30`,
                    opacity: doubled ? 1 : 0, transform: doubled ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Double!</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color }}>{scene.doubleOf}</div>
                </div>
            </div>
            <div style={{
                fontSize: 24, fontWeight: 900, color, fontFamily: 'Outfit, sans-serif',
                opacity: doubled ? 1 : 0, transition: 'opacity 0.4s 0.3s'
            }}>
                {scene.doubleOf} + {scene.doubleOf} = {scene.result} 👯
            </div>
        </div>
    );
}

function PlaceValueScene({ scene, color }) {
    const [step, setStep] = useState(0);
    useEffect(() => { setStep(0); const timers = [setTimeout(() => setStep(1), 700), setTimeout(() => setStep(2), 1400)]; return () => timers.forEach(clearTimeout); }, [scene]);

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                <div style={{ padding: '10px 20px', background: '#fff', borderRadius: 16, border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, marginBottom: 2 }}>Number</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color }}>{scene.base}</div>
                </div>
                {step >= 1 && (
                    <div style={{ padding: '10px 20px', background: '#f0fdf4', borderRadius: 16, border: '2px solid #bbf7d0', animation: 'tmBounceIn 0.4s both' }}>
                        <div style={{ fontSize: 11, color: '#059669', fontWeight: 700, marginBottom: 2 }}>× 10</div>
                        <div style={{ fontSize: 28, fontWeight: 900, color: '#059669' }}>{scene.by10}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>+1 zero ✨</div>
                    </div>
                )}
                {step >= 2 && (
                    <div style={{ padding: '10px 20px', background: '#eff6ff', borderRadius: 16, border: '2px solid #bfdbfe', animation: 'tmBounceIn 0.4s both' }}>
                        <div style={{ fontSize: 11, color: '#2563eb', fontWeight: 700, marginBottom: 2 }}>× 100</div>
                        <div style={{ fontSize: 28, fontWeight: 900, color: '#2563eb' }}>{scene.by100}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>+2 zeros ✨✨</div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   TRY-IT INTERACTIVE MINI ACTIVITY
   ═══════════════════════════════════════════════════════════════ */

function TryItActivity({ tryIt, color }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
    const inputRef = useRef(null);

    useEffect(() => { setUserAnswer(''); setResult(null); }, [tryIt]);

    const check = () => {
        if (encodeURIComponent(userAnswer.toString().trim().toLowerCase()) === encodeURIComponent(tryIt.answer.toString().trim().toLowerCase())) {
            setResult('correct');
        } else {
            setResult('wrong');
        }
    };

    return (
        <div style={{
            background: `linear-gradient(135deg, ${color}08, ${color}03)`,
            borderRadius: 20, padding: '20px 24px', border: `2px dashed ${color}30`,
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 20 }}>🎮</span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color }}>Try It!</span>
            </div>
            <p style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 14px', lineHeight: 1.5 }}>{tryIt.q}</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={e => { setUserAnswer(e.target.value); setResult(null); }}
                    onKeyDown={e => e.key === 'Enter' && check()}
                    placeholder="Type answer..."
                    style={{
                        width: 140, padding: '10px 16px', borderRadius: 14, fontSize: 18, fontWeight: 700,
                        border: `2px solid ${result === 'correct' ? '#10b981' : result === 'wrong' ? '#ef4444' : color + '40'}`,
                        background: result === 'correct' ? '#f0fdf4' : result === 'wrong' ? '#fef2f2' : '#fff',
                        outline: 'none', fontFamily: 'Outfit, sans-serif', color: '#0f172a',
                        transition: 'all 0.2s'
                    }}
                />
                <button
                    onClick={check}
                    disabled={!userAnswer}
                    style={{
                        padding: '10px 22px', borderRadius: 14, border: 'none',
                        background: userAnswer ? color : '#e2e8f0', color: userAnswer ? '#fff' : '#94a3b8',
                        fontWeight: 800, fontSize: 15, cursor: userAnswer ? 'pointer' : 'default',
                        fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    }}
                >
                    Check ✓
                </button>
                {result === 'correct' && <span style={{ fontSize: 28, animation: 'tmBounceIn 0.4s both' }}>🎉</span>}
                {result === 'wrong' && <span style={{ fontSize: 28, animation: 'tmShake 0.5s' }}>🤔</span>}
            </div>
            {result === 'wrong' && (
                <div style={{ marginTop: 10, fontSize: 14, color: '#f59e0b', fontWeight: 600, animation: 'tmBounceIn 0.3s both' }}>
                    💡 Hint: {tryIt.hint}
                </div>
            )}
            {result === 'correct' && (
                <div style={{ marginTop: 10, fontSize: 15, color: '#059669', fontWeight: 700, animation: 'tmBounceIn 0.3s both' }}>
                    ✅ Awesome! The answer is {tryIt.answer}!
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   RULE STEP-BY-STEP VISUAL
   ═══════════════════════════════════════════════════════════════ */

function RuleSteps({ rule }) {
    const [activeStep, setActiveStep] = useState(0);
    const [ruleAnswer, setRuleAnswer] = useState('');
    const [ruleResult, setRuleResult] = useState(null);

    useEffect(() => { setActiveStep(0); setRuleAnswer(''); setRuleResult(null); }, [rule]);

    return (
        <div>
            {/* Animated Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {rule.steps.map((s, i) => (
                    <div
                        key={i}
                        onClick={() => setActiveStep(i)}
                        style={{
                            display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px',
                            borderRadius: 16, cursor: 'pointer', transition: 'all 0.3s',
                            background: activeStep === i ? `${rule.color}10` : '#f8fafc',
                            border: `2px solid ${activeStep === i ? rule.color : 'transparent'}`,
                            transform: activeStep === i ? 'scale(1.02)' : 'scale(1)',
                            animation: `tmBounceIn 0.4s ${i * 0.15}s both`
                        }}
                    >
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: activeStep >= i ? rule.color : '#e2e8f0',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 16, fontWeight: 900, flexShrink: 0, transition: 'all 0.3s'
                        }}>
                            {activeStep > i ? '✓' : i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{s.text}</div>
                            <div style={{
                                fontSize: 20, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace',
                                color: activeStep === i ? rule.color : '#94a3b8', transition: 'color 0.3s'
                            }}>
                                {s.example}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rule Try-It */}
            <div style={{
                background: `linear-gradient(135deg, ${rule.color}08, ${rule.color}03)`,
                borderRadius: 16, padding: '16px 20px', border: `2px dashed ${rule.color}30`
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>🧪</span>
                    <span style={{ fontWeight: 800, fontSize: 14, color: rule.color }}>Quick Check!</span>
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>{rule.tryIt.q}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                        type="text"
                        value={ruleAnswer}
                        onChange={e => { setRuleAnswer(e.target.value); setRuleResult(null); }}
                        onKeyDown={e => e.key === 'Enter' && setRuleResult(encodeURIComponent(ruleAnswer.toString().trim().toLowerCase()) === encodeURIComponent(rule.tryIt.answer.toString().trim().toLowerCase()) ? 'correct' : 'wrong')}
                        placeholder="?"
                        style={{
                            width: 100, padding: '8px 14px', borderRadius: 12, fontSize: 18, fontWeight: 700,
                            border: `2px solid ${ruleResult === 'correct' ? '#10b981' : ruleResult === 'wrong' ? '#ef4444' : '#e2e8f0'}`,
                            background: ruleResult === 'correct' ? '#f0fdf4' : '#fff',
                            outline: 'none', fontFamily: 'Outfit, sans-serif'
                        }}
                    />
                    <button
                        onClick={() => setRuleResult(encodeURIComponent(ruleAnswer.toString().trim().toLowerCase()) === encodeURIComponent(rule.tryIt.answer.toString().trim().toLowerCase()) ? 'correct' : 'wrong')}
                        style={{
                            padding: '8px 18px', borderRadius: 12, border: 'none',
                            background: ruleAnswer ? rule.color : '#e2e8f0', color: ruleAnswer ? '#fff' : '#94a3b8',
                            fontWeight: 800, cursor: ruleAnswer ? 'pointer' : 'default', fontSize: 14
                        }}
                    >Go!</button>
                    {ruleResult === 'correct' && <span style={{ fontSize: 24, animation: 'tmBounceIn 0.3s both' }}>🎉</span>}
                    {ruleResult === 'wrong' && <span style={{ fontSize: 24, animation: 'tmShake 0.5s' }}>❌</span>}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function PatternsTerminology() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false);
        setQuizTotalScore(0); setQuizFinished(false); setStreak(0); setBestStreak(0);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        const isCorrect = optIdx === activeQuiz.correct;
        if (isCorrect) {
            setQuizTotalScore(s => s + 1);
            setStreak(s => { const newS = s + 1; if (newS > bestStreak) setBestStreak(newS); return newS; });
        } else {
            setStreak(0);
        }
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1); setQuizSelected(null); setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="pau-terminology-page">
            <style>{`
                .pau-terminology-page { background-color: #fcfaf3; min-height: 100vh; }
                .pau-detail-anim { animation: tmBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes tmBounceIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes tmFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes tmPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
                @keyframes tmShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }

                .pau-tab-pill { padding: 12px 24px; border-radius: 50px; border: 2px solid #f1f5f9; background: #fff; color: #64748b;
                    font-weight: 700; cursor: pointer; transition: all 0.25s; font-family: 'Outfit', sans-serif; font-size: 15px;
                    display: flex; align-items: center; gap: 8px; }
                .pau-tab-pill:hover { border-color: #d97706; color: #d97706; transform: translateY(-2px); }
                .pau-tab-pill.active { background: linear-gradient(135deg, #0ea5e9, #6366f1); color: white; border-color: transparent;
                    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.35); transform: translateY(-2px); }

                .pau-term-btn2 { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 14px;
                    border: 2px solid transparent; cursor: pointer; transition: all 0.25s; text-align: left;
                    font-family: 'Outfit', sans-serif; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
                .pau-term-btn2:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

                @media (max-width: 900px) { .pau-lex-grid { grid-template-columns: 1fr !important; } .pau-sidebar { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

            <nav className="pau-nav">
                <button className="pau-nav-back" onClick={() => navigate('/junior/grade/4/patterns-around-us')}>← Back to Patterns Around Us</button>
                <div className="pau-nav-links">
                    <button className="pau-nav-link" onClick={() => navigate('/junior/grade/4/patterns-around-us/introduction')}>🌟 Introduction</button>
                    <button className="pau-nav-link pau-nav-link--active">📖 Terminology</button>
                    <button className="pau-nav-link" onClick={() => navigate('/junior/grade/4/patterns-around-us/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 24px' }}>
                {/* Tab switcher */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                    <button className={`pau-tab-pill ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`pau-tab-pill ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Golden Rules</button>
                    <button className={`pau-tab-pill ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Quiz Battle</button>
                </div>

                {/* ────── TERMS TAB ────── */}
                {activeTab === 'terms' && (
                    <div className="pau-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="pau-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {TERMS.map((term, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button key={i} className="pau-term-btn2" onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: isActive ? `linear-gradient(135deg, ${term.color}, ${term.color}cc)` : `${term.color}06`,
                                            borderColor: isActive ? term.color : `${term.color}20`,
                                            color: isActive ? '#fff' : '#0f172a',
                                            transform: isActive ? 'scale(1.03)' : undefined,
                                            boxShadow: isActive ? `0 6px 20px ${term.color}30` : undefined,
                                        }}
                                    >
                                        <span style={{ fontSize: 22, filter: isActive ? 'brightness(1.3)' : 'none' }}>{term.icon}</span>
                                        <span style={{ fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>{term.name}</span>
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="pau-detail-anim" key={selectedIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 500 }}>
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{activeTerm.icon}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    <p style={{ margin: 0, fontSize: 16, color: '#475569', fontWeight: 600 }}>{activeTerm.def}</p>
                                </div>
                            </div>

                            {/* Animated Visual Scene */}
                            <div style={{ background: '#fafafa', borderRadius: 20, padding: '20px 16px', margin: '16px 0', border: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12, textAlign: 'center' }}>
                                    👀 Watch It Happen!
                                </div>
                                <MultiplicationScene scene={activeTerm.scene} color={activeTerm.color} />
                            </div>

                            {/* Try It Activity */}
                            <div style={{ margin: '16px 0' }}>
                                <TryItActivity tryIt={activeTerm.tryIt} color={activeTerm.color} />
                            </div>

                            {/* Fun Fact Speech Bubble */}
                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', margin: '16px 0' }}>
                                <div style={{ fontSize: 40, flexShrink: 0, animation: 'tmFloat 3s infinite ease-in-out' }}>{activeTerm.character}</div>
                                <div style={{
                                    background: '#f0f9ff', padding: '14px 20px', borderRadius: '4px 18px 18px 18px',
                                    border: '1px solid #e0f2fe', flex: 1, position: 'relative'
                                }}>
                                    <div style={{ fontSize: 15, color: '#0369a1', fontWeight: 700, lineHeight: 1.6 }}>
                                        {activeTerm.funFact}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {/* ────── RULES TAB ────── */}
                {activeTab === 'rules' && (
                    <div className="pau-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="pau-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FIVE_RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className="pau-term-btn2" onClick={() => setSelectedRuleIdx(i)}
                                        style={{
                                            background: isActive ? `linear-gradient(135deg, ${rule.color}, ${rule.color}cc)` : `${rule.color}06`,
                                            borderColor: isActive ? rule.color : `${rule.color}15`,
                                            color: isActive ? '#fff' : '#0f172a', padding: '14px 18px',
                                        }}
                                    >
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.25)' : `${rule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: isActive ? '#fff' : rule.color }}>{rule.emoji}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1 }}>Rule {rule.num}</div>
                                            <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.8, marginTop: 3 }}>{rule.title}</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="pau-detail-anim" key={selectedRuleIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 400 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{ fontSize: 36 }}>{activeRule.emoji}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    <p style={{ margin: '4px 0 0', fontSize: 17, fontWeight: 700, color: '#475569' }}>{activeRule.rule}</p>
                                </div>
                            </div>
                            <RuleSteps rule={activeRule} />
                        </main>
                    </div>
                )}

                {/* ────── QUIZ TAB ────── */}
                {activeTab === 'quiz' && (
                    <div className="pau-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                {/* Header with streak */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quiz Battle ⚔️</h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        {streak >= 2 && (
                                            <div style={{ background: '#fef3c7', padding: '6px 14px', borderRadius: 50, fontSize: 14, fontWeight: 800, color: '#92400e', animation: 'tmBounceIn 0.3s both' }}>
                                                🔥 {streak} streak!
                                            </div>
                                        )}
                                        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#6366f1' }}>
                                            {quizIdx + 1}<span style={{ fontSize: 11, color: '#94a3b8' }}>/10</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 50, marginBottom: 24, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${((quizIdx + 1) / 10) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: 50, transition: 'width 0.4s ease' }} />
                                </div>

                                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', lineHeight: 1.5, marginBottom: 24 }}>{activeQuiz.question}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let bg = '#fff', bdr = '#e2e8f0', txt = '#0f172a';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) { bg = '#f0fdf4'; bdr = '#10b981'; txt = '#059669'; }
                                            else if (oi === quizSelected) { bg = '#fef2f2'; bdr = '#ef4444'; txt = '#dc2626'; }
                                        }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered}
                                                style={{
                                                    padding: '14px 20px', borderRadius: 16, border: `3px solid ${bdr}`, background: bg,
                                                    color: txt, fontWeight: 700, fontSize: 16, cursor: quizAnswered ? 'default' : 'pointer',
                                                    transition: 'all 0.2s', textAlign: 'left', position: 'relative'
                                                }}
                                            >
                                                {opt}
                                                {quizAnswered && oi === activeQuiz.correct && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>✅</span>}
                                                {quizAnswered && oi === quizSelected && oi !== activeQuiz.correct && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>❌</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div style={{
                                        background: quizSelected === activeQuiz.correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.06)',
                                        padding: 16, borderRadius: 16, marginBottom: 20,
                                        border: `1px solid ${quizSelected === activeQuiz.correct ? '#bbf7d0' : '#fecaca'}`,
                                        animation: 'tmBounceIn 0.3s both'
                                    }}>
                                        <div style={{ fontSize: 22, marginBottom: 6 }}>
                                            {quizSelected === activeQuiz.correct ? '🎉 Correct!' : '💡 Let\'s learn!'}
                                        </div>
                                        <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{activeQuiz.explanation}</p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={nextQuiz} disabled={!quizAnswered}
                                        style={{
                                            padding: '12px 36px', borderRadius: 100, border: 'none',
                                            background: quizAnswered ? 'linear-gradient(135deg, #6366f1, #a855f7)' : '#f1f5f9',
                                            color: quizAnswered ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 16,
                                            cursor: quizAnswered ? 'pointer' : 'default', fontFamily: 'Outfit, sans-serif',
                                            boxShadow: quizAnswered ? '0 4px 14px rgba(99,102,241,0.4)' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >{quizIdx + 1 === 10 ? '🏆 Finish!' : 'Next →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 12, animation: 'tmBounceIn 0.5s both' }}>
                                    {quizTotalScore >= 9 ? '🏆' : quizTotalScore >= 7 ? '🌟' : quizTotalScore >= 5 ? '👏' : '💪'}
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, margin: '0 0 8px' }}>Quiz Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, margin: '0 0 8px' }}>Score: <span style={{ color: '#6366f1', fontWeight: 900 }}>{quizTotalScore}/10</span></p>
                                {bestStreak >= 2 && <p style={{ color: '#f59e0b', fontWeight: 800, margin: '0 0 24px' }}>🔥 Best streak: {bestStreak} in a row!</p>}
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>Play Again 🔄</button>
                                    <button onClick={() => navigate('/junior/grade/4/patterns-around-us/skills')} style={{ padding: '12px 28px', background: '#f1f5f9', color: '#475569', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Bottom CTA */}
                <div style={{ marginTop: 36, textAlign: 'center' }}>
                    <button onClick={() => navigate('/junior/grade/4/patterns-around-us/skills')} style={{ padding: '16px 40px', fontSize: 18, background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', color: '#fff', boxShadow: '0 4px 14px rgba(14,165,233,0.4)', borderRadius: 50, border: 'none', fontWeight: 800, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s' }}>
                        Ready to Practice! 🎯
                    </button>
                </div>
            </div>
        </div>
    );
}
