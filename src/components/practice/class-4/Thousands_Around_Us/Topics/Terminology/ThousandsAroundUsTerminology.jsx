import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../thousands-around-us.css';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const TERMS = [
  {
    name: 'Digit', color: '#2563eb', icon: '🔢',
    def: 'Any of the numbers 0 to 9.',
    scene: { visual: '0 1 2 3...', viewType: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9', example: 'Numbers are made of digits' },
    tryIt: { q: 'How many digits are in the number 456?', answer: 3, hint: 'Count the individual numbers!' },
    funFact: '🔢 "Digit" comes from the Latin word for finger, because people first learned counting using their 10 fingers!',
    character: '🧑‍🏫'
  },
  {
    name: 'Place Value', color: '#0ea5e9', icon: '🏠',
    def: 'The value of a digit based on its position in a number.',
    scene: { visual: '4,321', viewType: 'Thousands, Hundreds...', example: '3 inside the Hundreds place = 300' },
    tryIt: { q: 'In 5,678, what place is the 5 in?', answer: 'thousands', isText: true, hint: 'It’s the first digit from the left!' },
    funFact: '🏠 Changing a digit’s place changes its value completely! 9 is tiny, but 9000 is huge!',
    character: '🤓'
  },
  {
    name: 'One Thousand', color: '#6366f1', icon: '🧊',
    def: 'The smallest 4-digit number. It equals 10 hundreds.',
    scene: { visual: '🧊', viewType: '= 10 × 100', example: '1000 is 10 hundreds stacked' },
    tryIt: { q: 'What number comes right after 999?', answer: 1000, hint: 'Add 1 to 999.' },
    funFact: '🧊 If you have 10 blocks of 100, you have 1000! 1000 days is almost 3 years!',
    character: '🏗️'
  },
  {
    name: 'Expanded Form', color: '#10b981', icon: '↔️',
    def: 'Writing a number to show the value of each digit.',
    scene: { visual: '2,345', viewType: '2000 + 300 + 40 + 5', example: 'Stretching the number out' },
    tryIt: { q: 'Expand 4,050 (Format: 4000 + 50)', answer: '4000 + 50', isText: true, hint: 'You don’t need to write the 0 hundreds or 0 ones!' },
    funFact: '↔️ Expanded form is like stretching a number out like a rubber band to see all its hidden parts!',
    character: '🕵️'
  },
  {
    name: 'Standard Form', color: '#8b5cf6', icon: '📦',
    def: 'The normal way we write numbers using digits.',
    scene: { visual: '3000 + 400 + 20 + 8', viewType: '3,428', example: 'Squishing the parts together' },
    tryIt: { q: 'Write 5000 + 200 + 6 in standard form.', answer: '5,206', isText: true, hint: 'Don’t forget the zero in the tens place!' },
    funFact: '📦 This is the quickest way to write numbers. Imagine having to write out expanded form every time you bought something!',
    character: '✍️'
  },
  {
    name: 'Predecessor', color: '#f59e0b', icon: '⬅️',
    def: 'The number that comes just before a given number.',
    scene: { visual: '⏮️', viewType: '4,000 - 1 = 3,999', example: 'Stepping back by 1' },
    tryIt: { q: 'What is the predecessor of 2,500?', answer: 2499, hint: 'Take away exactly 1.' },
    funFact: '⬅️ "Pre" means before! The predecessor of the year 2024 was 2023.',
    character: '⏮️'
  },
  {
    name: 'Successor', color: '#ec4899', icon: '➡️',
    def: 'The number that comes just after a given number.',
    scene: { visual: '⏭️', viewType: '5,999 + 1 = 6,000', example: 'Stepping forward by 1' },
    tryIt: { q: 'What is the successor of 8,099?', answer: 8100, hint: 'Add exactly 1.' },
    funFact: '➡️ A successor succeeds, or follows, the number! The successor of 9,999 is 10,000!',
    character: '⏭️'
  },
  {
    name: 'Face Value', color: '#ef4444', icon: '🙂',
    def: 'The actual value of the digit itself, no matter where it is.',
    scene: { visual: '7,421', viewType: 'Face Value of 7 is 7', example: 'A 7 is always a 7' },
    tryIt: { q: 'What is the face value of 9 in 9,500?', answer: 9, hint: 'Just look at the digit itself!' },
    funFact: '🙂 A digit’s face value is like your own face—it stays the same no matter what room (place) you are in!',
    character: '🤠'
  }
];

const FIVE_RULES = [
  {
    num: 1, title: 'Four Places for Four Digits', emoji: '4️⃣', color: '#2563eb',
    rule: 'A 4-digit number has Thousands, Hundreds, Tens, and Ones.',
    steps: [
      { text: 'Start from the right.', example: 'Ones' },
      { text: 'Move left.', example: 'Tens, Hundreds' },
      { text: 'The 4th place is new!', example: 'Thousands' },
    ],
    tryIt: { q: 'Which place is the 3 in for 5,342?', answer: 'hundreds', isText: true },
  },
  {
    num: 2, title: 'Watch Out for Zero!', emoji: '0️⃣', color: '#8b5cf6',
    rule: 'Zero holds a place when there is nothing there.',
    steps: [
      { text: 'Say "Two thousand five"', example: '2,005' },
      { text: 'Notice missing Hundreds/Tens?', example: 'Put a zero!' },
      { text: 'Never skip a place.', example: '205 is wrong!' },
    ],
    tryIt: { q: 'Write "Four thousand twenty".', answer: 4020 },
  },
  {
    num: 3, title: 'The Comma Rule', emoji: '📍', color: '#0ea5e9',
    rule: 'Put a comma after the thousands place to make reading easy.',
    steps: [
      { text: 'Count 3 digits from the right.', example: '1 2 3' },
      { text: 'Place the comma.', example: '4,123' },
      { text: 'Now read the thousands part first.', example: '"Four thousand..."' },
    ],
    tryIt: { q: 'Where does the comma go in 8765? (Format: x,xxx)', answer: '8,765', isText: true },
  },
  {
    num: 4, title: 'Reading Doesn\'t Use "And"', emoji: '🗣️', color: '#10b981',
    rule: 'Read the number straight through without saying "and".',
    steps: [
      { text: 'Read the thousands.', example: 'Five thousand' },
      { text: 'Read the hundreds.', example: 'two hundred' },
      { text: 'Read tens and ones together.', example: 'thirty-four' },
    ],
    tryIt: { q: 'What word should you NOT use when reading 6,105 aloud?', answer: 'and', isText: true },
  },
  {
    num: 5, title: 'Comparing Starts from the Left', emoji: '⚖️', color: '#f59e0b',
    rule: 'Always look at the Thousands place first when comparing.',
    steps: [
      { text: 'Check Thousands.', example: '5,000 > 4,000' },
      { text: 'If same, check Hundreds.', example: '5,300 > 5,200' },
      { text: 'Keep moving right if needed.', example: '5,340 > 5,320' },
    ],
    tryIt: { q: 'Which is bigger: 7,899 or 8,000?', answer: 8000 },
  },
];

const VOCAB_QUIZ = [
  { question: "What is the smallest 4-digit number?", options: ["0", "999", "1000", "9999"], correct: 2, explanation: "1000 is the first 4-digit number you reach after 999!" },
  { question: "What place is the 7 in 4,752?", options: ["Thousands", "Hundreds", "Tens", "Ones"], correct: 1, explanation: "Starting from right: Ones (2), Tens (5), Hundreds (7)." },
  { question: "How do you write 'Three thousand forty'?", options: ["3400", "3004", "3040", "340"], correct: 2, explanation: "Thousands: 3, Hundreds: 0, Tens: 4, Ones: 0. So, 3,040." },
  { question: "What is 5000 + 300 + 4 in standard form?", options: ["5340", "5034", "5304", "534"], correct: 2, explanation: "It has no tens. So, 5,304." },
  { question: "What is the predecessor of 6,000?", options: ["5999", "6001", "5000", "6010"], correct: 0, explanation: "Predecessor is 1 less. 6000 - 1 = 5999." },
  { question: "In 8,432, what is the face value of 8?", options: ["8", "8000", "800", "80"], correct: 0, explanation: "Face value is just the digit itself, so it’s 8." },
  { question: "What is the successor of 9,999?", options: ["1000", "9998", "10000", "9000"], correct: 2, explanation: "Successor is 1 more. 9999 + 1 = 10,000 (a 5-digit number!)." },
  { question: "Which symbol makes this true: 4,567 __ 4,657", options: [">", "<", "=", "+"], correct: 1, explanation: "Thousands are same (4), but Hundreds are different. 5 < 6, so 4,567 < 4,657." }
];

/* ═══════════════════════════════════════════════════════════════
   VISUAL SCENE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function SpatialScene({ scene, color }) {
    return (
        <div style={{ textAlign: 'center', padding: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{scene.visual}</div>
            <div style={{ fontSize: 20, fontWeight: 'bold', color }}>{scene.viewType}</div>
            <div style={{ fontSize: 16, color: '#64748b', marginTop: 6 }}>{scene.example}</div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   TRY-IT INTERACTIVE MINI ACTIVITY
   ═══════════════════════════════════════════════════════════════ */

function TryItActivity({ tryIt, color }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => { setUserAnswer(''); setResult(null); }, [tryIt]);

    const check = () => {
        let isCorrect = false;
        if (tryIt.isText) {
            isCorrect = userAnswer.toLowerCase().trim() === tryIt.answer.toLowerCase();
        } else {
            isCorrect = parseInt(userAnswer) === tryIt.answer;
        }
        setResult(isCorrect ? 'correct' : 'wrong');
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
                    type={tryIt.isText ? "text" : "number"}
                    value={userAnswer}
                    onChange={e => { setUserAnswer(e.target.value); setResult(null); }}
                    onKeyDown={e => e.key === 'Enter' && check()}
                    placeholder="Type answer..."
                    style={{
                        width: 140, padding: '10px 16px', borderRadius: 14, fontSize: 18, fontWeight: 700,
                        border: `2px solid ${result === 'correct' ? '#10b981' : result === 'wrong' ? '#ef4444' : color + '40'}`,
                        background: result === 'correct' ? '#f0fdf4' : result === 'wrong' ? '#fef2f2' : '#fff',
                        outline: 'none', fontFamily: 'Outfit, sans-serif', color: '#0f172a', transition: 'all 0.2s'
                    }}
                />
                <button
                    onClick={check} disabled={!userAnswer}
                    style={{
                        padding: '10px 22px', borderRadius: 14, border: 'none',
                        background: userAnswer ? color : '#e2e8f0', color: userAnswer ? '#fff' : '#94a3b8',
                        fontWeight: 800, fontSize: 15, cursor: userAnswer ? 'pointer' : 'default',
                        fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    }}
                >Check ✓</button>
                {result === 'correct' && <span style={{ fontSize: 28, animation: 'sauBounceIn 0.4s both' }}>🎉</span>}
                {result === 'wrong' && <span style={{ fontSize: 28, animation: 'sauShake 0.5s' }}>🤔</span>}
            </div>
            {result === 'wrong' && (
                <div style={{ marginTop: 10, fontSize: 14, color: '#f59e0b', fontWeight: 600, animation: 'sauBounceIn 0.3s both' }}>
                    💡 Hint: {tryIt.hint}
                </div>
            )}
            {result === 'correct' && (
                <div style={{ marginTop: 10, fontSize: 15, color: '#059669', fontWeight: 700, animation: 'sauBounceIn 0.3s both' }}>
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

    const checkRule = () => {
        if (rule.tryIt.isText) {
            setRuleResult(ruleAnswer.toLowerCase().trim() === rule.tryIt.answer.toLowerCase() ? 'correct' : 'wrong');
        } else {
            setRuleResult(parseInt(ruleAnswer) === rule.tryIt.answer ? 'correct' : 'wrong');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {rule.steps.map((s, i) => (
                    <div
                        key={i} onClick={() => setActiveStep(i)}
                        style={{
                            display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px',
                            borderRadius: 16, cursor: 'pointer', transition: 'all 0.3s',
                            background: activeStep === i ? `${rule.color}10` : '#f8fafc',
                            border: `2px solid ${activeStep === i ? rule.color : 'transparent'}`,
                            transform: activeStep === i ? 'scale(1.02)' : 'scale(1)',
                            animation: `sauBounceIn 0.4s ${i * 0.15}s both`
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
                        type={rule.tryIt.isText ? "text" : "number"}
                        value={ruleAnswer}
                        onChange={e => { setRuleAnswer(e.target.value); setRuleResult(null); }}
                        onKeyDown={e => e.key === 'Enter' && checkRule()}
                        placeholder="?"
                        style={{
                            width: 100, padding: '8px 14px', borderRadius: 12, fontSize: 18, fontWeight: 700,
                            border: `2px solid ${ruleResult === 'correct' ? '#10b981' : ruleResult === 'wrong' ? '#ef4444' : '#e2e8f0'}`,
                            background: ruleResult === 'correct' ? '#f0fdf4' : '#fff',
                            outline: 'none', fontFamily: 'Outfit, sans-serif'
                        }}
                    />
                    <button
                        onClick={checkRule}
                        style={{
                            padding: '8px 18px', borderRadius: 12, border: 'none',
                            background: ruleAnswer ? rule.color : '#e2e8f0', color: ruleAnswer ? '#fff' : '#94a3b8',
                            fontWeight: 800, cursor: ruleAnswer ? 'pointer' : 'default', fontSize: 14
                        }}
                    >Go!</button>
                    {ruleResult === 'correct' && <span style={{ fontSize: 24, animation: 'sauBounceIn 0.3s both' }}>🎉</span>}
                    {ruleResult === 'wrong' && <span style={{ fontSize: 24, animation: 'sauShake 0.5s' }}>❌</span>}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ThousandsAroundUsTerminology() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

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
        <div className="sau-terminology-page">
            <style>{`
                .sau-terminology-page { background-color: #eff6ff; min-height: 100vh; }
                .sau-detail-anim { animation: sauBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes sauBounceIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes sauFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes sauPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
                @keyframes sauShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }

                .sau-tab-pill { padding: 12px 24px; border-radius: 50px; border: 2px solid #f1f5f9; background: #fff; color: #64748b;
                    font-weight: 700; cursor: pointer; transition: all 0.25s; font-family: 'Outfit', sans-serif; font-size: 15px;
                    display: flex; align-items: center; gap: 8px; }
                .sau-tab-pill:hover { border-color: #2563eb; color: #2563eb; transform: translateY(-2px); }
                .sau-tab-pill.active { background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; border-color: transparent;
                    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); transform: translateY(-2px); }

                .sau-term-btn2 { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 14px;
                    border: 2px solid transparent; cursor: pointer; transition: all 0.25s; text-align: left;
                    font-family: 'Outfit', sans-serif; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
                .sau-term-btn2:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

                @media (max-width: 900px) { .sau-lex-grid { grid-template-columns: 1fr !important; } .sau-sidebar { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

            <nav className="sau-nav">
                <button className="sau-nav-back" style={{ color: '#2563eb' }} onClick={() => navigate('/junior/grade/4/thousands-around-us')}>← Back to Dashboard</button>
                <div className="sau-nav-links">
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/thousands-around-us/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link sau-nav-link--active" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>📖 Terminology</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/thousands-around-us/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                    <button className={`sau-tab-pill ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`sau-tab-pill ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Number Rules</button>
                    <button className={`sau-tab-pill ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Quiz Battle</button>
                </div>

                {/* ────── TERMS TAB ────── */}
                {activeTab === 'terms' && (
                    <div className="sau-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="sau-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {TERMS.map((term, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button key={i} className="sau-term-btn2" onClick={() => setSelectedIdx(i)}
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

                        <main className="sau-detail-anim" key={selectedIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 500 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{activeTerm.icon}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    <p style={{ margin: 0, fontSize: 16, color: '#475569', fontWeight: 600 }}>{activeTerm.def}</p>
                                </div>
                            </div>

                            <div style={{ background: '#fafafa', borderRadius: 20, padding: '20px 16px', margin: '16px 0', border: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12, textAlign: 'center' }}>
                                    👀 See It!
                                </div>
                                <SpatialScene scene={activeTerm.scene} color={activeTerm.color} />
                            </div>

                            <div style={{ margin: '16px 0' }}>
                                <TryItActivity tryIt={activeTerm.tryIt} color={activeTerm.color} />
                            </div>

                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', margin: '16px 0' }}>
                                <div style={{ fontSize: 40, flexShrink: 0, animation: 'sauFloat 3s infinite ease-in-out' }}>{activeTerm.character}</div>
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
                    <div className="sau-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="sau-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FIVE_RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className="sau-term-btn2" onClick={() => setSelectedRuleIdx(i)}
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

                        <main className="sau-detail-anim" key={selectedRuleIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 400 }}>
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
                    <div className="sau-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 8</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quiz Battle ⚔️</h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        {streak >= 2 && (
                                            <div style={{ background: '#dbeafe', padding: '6px 14px', borderRadius: 50, fontSize: 14, fontWeight: 800, color: '#1d4ed8', animation: 'sauBounceIn 0.3s both' }}>
                                                🔥 {streak} streak!
                                            </div>
                                        )}
                                        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#2563eb' }}>
                                            {quizIdx + 1}<span style={{ fontSize: 11, color: '#94a3b8' }}>/8</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 50, marginBottom: 24, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${((quizIdx + 1) / 8) * 100}%`, background: 'linear-gradient(90deg, #2563eb, #3b82f6)', borderRadius: 50, transition: 'width 0.4s ease' }} />
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
                                        animation: 'sauBounceIn 0.3s both'
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
                                            background: quizAnswered ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : '#f1f5f9',
                                            color: quizAnswered ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 16,
                                            cursor: quizAnswered ? 'pointer' : 'default', fontFamily: 'Outfit, sans-serif',
                                            boxShadow: quizAnswered ? '0 4px 14px rgba(37,99,235,0.4)' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >{quizIdx + 1 === 8 ? '🏆 Finish!' : 'Next →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 12, animation: 'sauBounceIn 0.5s both' }}>
                                    {quizTotalScore >= 7 ? '🏆' : quizTotalScore >= 5 ? '🌟' : quizTotalScore >= 3 ? '👏' : '💪'}
                                </div>
                                <h2 style={{ color: '#2563eb', fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, margin: '0 0 8px' }}>Quiz Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, margin: '0 0 8px' }}>Score: <span style={{ color: '#2563eb', fontWeight: 900 }}>{quizTotalScore}/8</span></p>
                                {bestStreak >= 2 && <p style={{ color: '#f59e0b', fontWeight: 800, margin: '0 0 24px' }}>🔥 Best streak: {bestStreak} in a row!</p>}
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>Play Again 🔄</button>
                                    <button onClick={() => navigate('/junior/grade/4/thousands-around-us/skills')} style={{ padding: '12px 28px', background: '#f1f5f9', color: '#475569', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
