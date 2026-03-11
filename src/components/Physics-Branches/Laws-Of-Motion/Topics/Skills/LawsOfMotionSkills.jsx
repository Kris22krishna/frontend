import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateLawsOfMotionSkillsData } from './LawsOfMotionSkillsData';
import '../../LawsOfMotionBranch.css';

/* ═══════════════════════════════════════════════════════════════
   SHUFFLE UTILITIES
   ═══════════════════════════════════════════════════════════════ */
const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const useShuffledQuestions = (sourceQuestions, amount = 15) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (!sourceQuestions) return;
        let shuffledQs = shuffleArray(sourceQuestions).slice(0, amount);

        shuffledQs = shuffledQs.map(q => {
            if (q.type === 'multiple-choice') {
                const originalCorrectOption = q.options[q.correctAnswer];
                const shuffledOptions = shuffleArray(q.options);
                const newCorrectAnswerIndex = shuffledOptions.indexOf(originalCorrectOption);
                return {
                    ...q,
                    options: shuffledOptions,
                    correctAnswer: newCorrectAnswerIndex
                };
            }
            return q;
        });
        setQuestions(shuffledQs);
    }, [sourceQuestions, amount]);

    return questions;
};

/* ═══════════════════════════════════════════════════════════════
   QUESTION CARD
   ═══════════════════════════════════════════════════════════════ */
function QuestionCard({ type, question, options, answer, onAnswer, disabled, selectedOption, image, showCorrect = true }) {
    const [val, setVal] = useState('');

    if (type === 'multiple-choice') {
        return (
            <div style={{ marginBottom: 20 }}>
                {image && <div style={{ fontSize: 16, fontFamily: "'Courier New', monospace", textAlign: 'center', marginBottom: 12, padding: 14, background: '#f0f9ff', borderRadius: 14, border: '1px solid #bae6fd', color: '#0369a1', fontWeight: 700, letterSpacing: 0.5, whiteSpace: 'pre-wrap' }}>{image}</div>}
                <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{question}</p>
                <div style={{ display: 'grid', gap: 10 }}>
                    {options.map((opt, i) => {
                        let bg = '#fff';
                        let bdr = '#e2e8f0';
                        let clr = '#0f172a';
                        const letter = String.fromCharCode(65 + i); // A, B, C, D

                        if (disabled && showCorrect) {
                            if (i === answer) { bg = '#f0fdf4'; bdr = '#10b981'; }
                            else if (i === selectedOption) { bg = '#fef2f2'; bdr = '#ef4444'; }
                            else { clr = '#94a3b8'; }
                        } else if (disabled && !showCorrect) {
                            if (i === selectedOption) { bg = '#eff6ff'; bdr = '#3b82f6'; }
                        } else if (i === selectedOption) {
                            bg = 'rgba(79, 70, 229, 0.05)';
                            bdr = 'var(--lom-primary)';
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => onAnswer(i)}
                                disabled={disabled}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 16px', borderRadius: 12, border: `2px solid ${bdr}`,
                                    background: bg, textAlign: 'left', fontWeight: 600, fontSize: 15,
                                    cursor: disabled ? 'default' : 'pointer', transition: 'all 0.2s', color: clr
                                }}
                            >
                                <span style={{
                                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 13, fontWeight: 800, flexShrink: 0,
                                    background: i === selectedOption ? (showCorrect ? (i === answer ? '#10b981' : '#ef4444') : 'var(--lom-primary)') : '#f1f5f9',
                                    color: i === selectedOption ? '#fff' : '#64748b'
                                }}>{letter}</span>
                                {opt}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Short answer fallback
    return (
        <div style={{ marginBottom: 20 }}>
            {image && <div style={{ fontSize: 16, fontFamily: "'Courier New', monospace", textAlign: 'center', marginBottom: 12, padding: 14, background: '#f0f9ff', borderRadius: 14, border: '1px solid #bae6fd', color: '#0369a1', fontWeight: 700, letterSpacing: 0.5, whiteSpace: 'pre-wrap' }}>{image}</div>}
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{question}</p>
            <div style={{ display: 'flex', gap: 10 }}>
                <input type="text" value={disabled ? (selectedOption || '') : val} onChange={e => setVal(e.target.value)} disabled={disabled}
                    placeholder="Type answer..." style={{ padding: '12px 16px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 16, flex: 1 }} />
                <button disabled={disabled || !val} onClick={() => onAnswer(val.trim())}
                    style={{ padding: '0 20px', background: disabled ? '#e2e8f0' : 'var(--lom-primary)', color: '#fff', borderRadius: 12, fontWeight: 600, border: 'none', cursor: disabled ? 'default' : 'pointer' }}>Submit</button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   CIRCULAR SCORE RING
   ═══════════════════════════════════════════════════════════════ */
function ScoreRing({ score, total, color }) {
    const pct = total > 0 ? score / total : 0;
    const r = 70, circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct);
    return (
        <svg width="180" height="180" viewBox="0 0 180 180" style={{ display: 'block', margin: '0 auto' }}>
            <circle cx="90" cy="90" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle cx="90" cy="90" r={r} fill="none" stroke={color} strokeWidth="10"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 90 90)"
                style={{ transition: 'stroke-dashoffset 1s ease' }} />
            <text x="90" y="85" textAnchor="middle" dominantBaseline="central" fontSize="40" fontWeight="900" fill="#0f172a">{score}</text>
            <text x="90" y="115" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600" fill="#64748b">out of {total}</text>
        </svg>
    );
}

function fmtTime(ms) {
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ═══════════════════════════════════════════════════════════════
   LEARN MODE
   ═══════════════════════════════════════════════════════════════ */
function LearnMode({ skill, onBack }) {
    return (
        <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: 20 }}>← Back to Skills</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ fontSize: 40 }}>{skill.icon}</div>
                <div>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: skill.color, margin: 0 }}>{skill.title}</h2>
                    <p style={{ margin: 0, fontSize: 16, color: '#64748b' }}>Learn the concepts</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {skill.learnSections.map((sec, i) => (
                    <div key={i} style={{ padding: 20, borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <h4 style={{ margin: '0 0 10px', fontSize: 18, color: '#0f172a', fontWeight: 800 }}>{sec.heading}</h4>
                        <p style={{ margin: '0 0 12px', fontSize: 16, color: '#334155', lineHeight: 1.6 }}>{sec.content}</p>
                        <div style={{ padding: '10px 14px', background: `${skill.color}15`, borderRadius: 10, color: '#0f172a', fontWeight: 600, fontSize: 14 }}>
                            <span style={{ color: skill.color, marginRight: 6 }}>💡 Key Fact:</span>{sec.example}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                <button onClick={onBack} style={{ padding: '12px 32px', background: skill.color, color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}40` }}>Got it! →</button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   PRACTICE MODE
   ═══════════════════════════════════════════════════════════════ */
function PracticeMode({ skill, onBack, onAssess }) {
    const questions = useShuffledQuestions(skill.practice, skill.practice.length);

    const [qIdx, setQIdx] = useState(0);
    const [answersMap, setAnswersMap] = useState({});
    const [finished, setFinished] = useState(false);
    const startTime = useRef(Date.now());

    if (!questions || questions.length === 0) return <div>Loading...</div>;

    const q = questions[qIdx];
    const currentAnswer = answersMap[qIdx];
    const answered = !!currentAnswer;
    const isCorrect = currentAnswer?.isCorrect ?? false;
    const selectedOpt = currentAnswer?.selectedOpt ?? null;

    const handleAnswer = (val) => {
        if (answered) return;
        let correct = false;
        if (q.type === 'multiple-choice') correct = val === q.correctAnswer;
        else correct = val.toString().toLowerCase() === q.correctAnswer.toString().toLowerCase();
        setAnswersMap(prev => ({ ...prev, [qIdx]: { selectedOpt: val, isCorrect: correct } }));
    };

    const nextQ = () => {
        if (qIdx + 1 < questions.length) setQIdx(qIdx + 1);
        else setFinished(true);
    };
    const prevQ = () => { if (qIdx > 0) setQIdx(qIdx - 1); };

    if (finished) {
        const totalTime = Date.now() - startTime.current;
        const score = Object.values(answersMap).filter(a => a.isCorrect).length;
        const total = questions.length;
        const pct = Math.round((score / total) * 100);
        let msg = 'Keep Learning!', emoji = '💪', sub = 'Review the concepts and try again for 100%.';
        if (pct >= 90) { msg = 'Excellent!'; emoji = '🏆'; sub = 'You\'ve mastered this skill!'; }
        else if (pct >= 70) { msg = 'Great Job!'; emoji = '🌟'; sub = 'You\'re almost there, keep going!'; }

        return (
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '40px 24px', background: '#fff', borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--lom-primary)', fontWeight: 700, cursor: 'pointer', marginBottom: 16, fontSize: 14 }}>← Back to Skills</button>
                <ScoreRing score={score} total={total} color={skill.color} />
                <div style={{ margin: '16px 0 8px', padding: '8px 24px', background: '#f8fafc', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#64748b', fontSize: 14 }}>
                    ⏱️ Time Taken: {fmtTime(totalTime)}
                </div>
                <div style={{ fontSize: 48, marginTop: 16 }}>{emoji}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 24px' }}>{sub}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <button onClick={onBack} style={{ padding: '12px 28px', borderRadius: 100, border: `2px solid ${skill.color}`, background: '#fff', color: skill.color, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Back to Skills</button>
                    <button onClick={onAssess} style={{ padding: '12px 28px', borderRadius: 100, border: 'none', background: skill.color, color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}40` }}>Take Assessment 🏆</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>← Exit Practice</button>
                <div style={{ fontWeight: 800, color: skill.color }}>Practice {qIdx + 1}/{questions.length}</div>
            </div>
            <QuestionCard key={qIdx} type={q.type} question={q.question} options={q.options} answer={q.correctAnswer} onAnswer={handleAnswer} disabled={answered} selectedOption={selectedOpt} image={q.image} />
            {answered && (
                <div style={{ padding: 16, borderRadius: 12, marginBottom: 20, background: isCorrect ? '#f0fdf4' : '#fef2f2', border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}` }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: isCorrect ? '#059669' : '#dc2626', marginBottom: 6 }}>{isCorrect ? '🎉 Correct!' : '❌ Not quite!'}</div>
                    <p style={{ margin: 0, fontSize: 15, color: '#334155', lineHeight: 1.5 }}>{q.explanation}</p>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {qIdx > 0 ? (
                    <button onClick={prevQ} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: `2px solid ${skill.color}`, background: '#fff', color: skill.color, cursor: 'pointer' }}>← Previous</button>
                ) : <div />}
                <button onClick={nextQ} disabled={!answered} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', background: answered ? skill.color : '#e2e8f0', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'default', transition: 'all 0.2s' }}>
                    {qIdx + 1 === questions.length ? 'Finish →' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   ASSESS MODE
   ═══════════════════════════════════════════════════════════════ */
function AssessMode({ skill, onBack }) {
    const questions = useShuffledQuestions(skill.assessment, skill.assessment.length);

    const [qIdx, setQIdx] = useState(0);
    const [answersMap, setAnswersMap] = useState({});
    const [marked, setMarked] = useState({});
    const [finished, setFinished] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [expandedSolution, setExpandedSolution] = useState({});
    const startRef = useRef(Date.now());
    const qStartRef = useRef(Date.now());
    const [qTimes, setQTimes] = useState({});

    // Timer tick
    useEffect(() => {
        if (finished) return;
        const iv = setInterval(() => setElapsed(Date.now() - startRef.current), 1000);
        return () => clearInterval(iv);
    }, [finished]);

    if (!questions || questions.length === 0) return <div>Loading...</div>;

    const q = questions[qIdx];

    const handleAnswer = (val) => {
        const now = Date.now();
        const timeSpent = now - qStartRef.current;
        setAnswersMap(prev => ({ ...prev, [qIdx]: val }));
        setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + timeSpent }));
        qStartRef.current = now;
    };

    const goTo = (idx) => {
        const now = Date.now();
        setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + (now - qStartRef.current) }));
        qStartRef.current = now;
        setQIdx(idx);
    };

    const toggleMark = () => setMarked(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));

    const submitAssessment = () => {
        const now = Date.now();
        setQTimes(prev => ({ ...prev, [qIdx]: (prev[qIdx] || 0) + (now - qStartRef.current) }));
        setFinished(true);
    };

    if (finished) {
        const totalTime = Date.now() - startRef.current;
        let score = 0;
        questions.forEach((qq, i) => {
            const ans = answersMap[i];
            if (ans !== undefined) {
                if (qq.type === 'multiple-choice' && ans === qq.correctAnswer) score++;
                else if (qq.type !== 'multiple-choice' && ans?.toString().toLowerCase() === qq.correctAnswer?.toString().toLowerCase()) score++;
            }
        });
        const accuracy = Math.round((score / questions.length) * 100);

        return (
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px', background: '#fff', borderRadius: 24 }}>
                {/* Header */}
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 28px' }}>
                    📊 Assessment Report
                </h1>

                {/* Stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total Score</div>
                        <div><span style={{ fontSize: 36, fontWeight: 900, color: skill.color }}>{score}</span><span style={{ fontSize: 18, color: '#94a3b8', fontWeight: 700 }}> / {questions.length}</span></div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Accuracy</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: accuracy >= 70 ? '#059669' : '#dc2626' }}>{accuracy}%</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Time Taken</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#d97706' }}>⏱️ {fmtTime(totalTime)}</div>
                    </div>
                </div>

                {/* Question Breakdown */}
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, margin: '0 0 16px', color: '#0f172a' }}>Question Breakdown</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {questions.map((qq, i) => {
                        const userAns = answersMap[i];
                        const skipped = userAns === undefined;
                        let correct = false;
                        if (!skipped) {
                            if (qq.type === 'multiple-choice') correct = userAns === qq.correctAnswer;
                            else correct = userAns?.toString().toLowerCase() === qq.correctAnswer?.toString().toLowerCase();
                        }
                        const pillColor = skipped ? '#f59e0b' : correct ? '#10b981' : '#ef4444';
                        const showSol = expandedSolution[i];

                        return (
                            <div key={i} style={{ background: '#fff', border: `1px solid ${skipped ? '#fde68a' : correct ? '#bbf7d0' : '#fecaca'}`, borderRadius: 16, padding: '20px 24px' }}>
                                {/* Question header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1 }}>
                                        <span style={{ width: 28, height: 28, borderRadius: '50%', background: pillColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                                        <div>
                                            {qq.image && <div style={{ fontSize: 32, marginBottom: 8 }}>{qq.image}</div>}
                                            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0f172a', lineHeight: 1.5 }}>{qq.question}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: skipped ? '#d97706' : correct ? '#059669' : '#dc2626' }}>
                                            {skipped ? '⏩ Skipped' : correct ? '✅ Correct' : '❌ Wrong'}
                                        </div>
                                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>⏱️ {qTimes[i] ? Math.round(qTimes[i] / 1000) : 0}s</div>
                                    </div>
                                </div>

                                {/* Options grid */}
                                {qq.type === 'multiple-choice' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                                        {qq.options.map((opt, oi) => {
                                            const letter = String.fromCharCode(65 + oi);
                                            const isUserPick = userAns === oi;
                                            const isCorrectOpt = oi === qq.correctAnswer;
                                            let bg = '#f8fafc', bdr = '#e2e8f0', clr = '#334155';
                                            if (isCorrectOpt) { bg = '#f0fdf4'; bdr = '#10b981'; }
                                            else if (isUserPick && !isCorrectOpt) { bg = '#fef2f2'; bdr = '#ef4444'; }
                                            return (
                                                <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: `2px solid ${bdr}`, background: bg, fontSize: 14, fontWeight: 600, color: clr }}>
                                                    <span style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0, background: isCorrectOpt ? '#10b981' : isUserPick ? '#ef4444' : '#e2e8f0', color: (isCorrectOpt || isUserPick) ? '#fff' : '#64748b' }}>{letter}</span>
                                                    <span style={{ flex: 1 }}>{opt}</span>
                                                    {isCorrectOpt && <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>}
                                                    {isUserPick && !isCorrectOpt && <span style={{ color: '#ef4444', fontWeight: 800 }}>✗</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Check Solution toggle */}
                                {qq.explanation && (
                                    <div>
                                        <button onClick={() => setExpandedSolution(prev => ({ ...prev, [i]: !prev[i] }))} style={{ background: 'none', border: 'none', color: 'var(--lom-primary)', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0 }}>
                                            {showSol ? '∧ Hide Solution' : '∨ Check Solution'}
                                        </button>
                                        {showSol && (
                                            <div style={{ marginTop: 8, padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12 }}>
                                                <div style={{ fontWeight: 700, color: 'var(--lom-primary)', marginBottom: 4 }}>💡 Step-by-Step Logic</div>
                                                <p style={{ margin: 0, fontSize: 14, color: '#334155', lineHeight: 1.6 }}>{qq.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onBack} style={{ padding: '14px 40px', background: skill.color, color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}40` }}>Back to Skills</button>
                </div>
            </div>
        );
    }
    const currentAnswered = answersMap[qIdx] !== undefined;

    return (
        <div style={{ display: 'flex', gap: 24, maxWidth: 1100, margin: '0 auto', alignItems: 'flex-start' }}>
            {/* LEFT: Question panel */}
            <div style={{ flex: '1 1 60%', background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, border: '2px solid #0f172a', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Question {qIdx + 1}</div>

                <QuestionCard
                    key={qIdx}
                    type={q.type}
                    question={q.question}
                    options={q.options}
                    answer={q.correctAnswer}
                    onAnswer={handleAnswer}
                    disabled={false} // Users can change answers in Assess mode
                    selectedOption={answersMap[qIdx] ?? null}
                    image={q.image}
                    showCorrect={false}
                />

                {/* Navigation buttons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
                    <button onClick={() => goTo(Math.max(0, qIdx - 1))} disabled={qIdx === 0}
                        style={{ padding: '10px 24px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff', fontWeight: 700, fontSize: 14, color: qIdx === 0 ? '#cbd5e1' : '#334155', cursor: qIdx === 0 ? 'default' : 'pointer' }}>← Previous</button>
                    <button onClick={toggleMark}
                        style={{ padding: '10px 24px', borderRadius: 100, border: `2px solid ${marked[qIdx] ? '#f59e0b' : '#e2e8f0'}`, background: marked[qIdx] ? '#fef3c7' : '#fff', fontWeight: 700, fontSize: 14, color: marked[qIdx] ? '#92400e' : '#334155', cursor: 'pointer', transition: 'all 0.2s' }}>
                        {marked[qIdx] ? '★ Marked' : 'Mark for Review'}
                    </button>
                    <button onClick={() => goTo(Math.min(questions.length - 1, qIdx + 1))} disabled={qIdx === questions.length - 1}
                        style={{ padding: '10px 24px', borderRadius: 100, border: 'none', background: 'var(--lom-primary)', fontWeight: 700, fontSize: 14, color: '#fff', cursor: qIdx === questions.length - 1 ? 'default' : 'pointer', opacity: qIdx === questions.length - 1 ? 0.5 : 1, transition: 'all 0.2s' }}>Next →</button>
                </div>
            </div>

            {/* RIGHT: Sidebar (timer + palette) */}
            <div className="lom-details-window" style={{ flex: '0 0 280px', background: '#f8fafc', borderRadius: 24, padding: 24, position: 'sticky', top: 80 }}>
                {/* Timer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 28 }}>⏱️</span>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{fmtTime(elapsed)}</span>
                </div>

                {/* Question Palette */}
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Question Palette</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20 }}>
                    {questions.map((_, i) => {
                        const isAnswered = answersMap[i] !== undefined;
                        const isMarked = !!marked[i];
                        const isCurrent = i === qIdx;
                        let bg = '#fff', bdr = '#e2e8f0', clr = '#64748b';
                        if (isMarked) { bg = '#fef3c7'; bdr = '#f59e0b'; clr = '#92400e'; }
                        if (isAnswered) { bg = 'var(--lom-primary)'; bdr = 'var(--lom-primary)'; clr = '#fff'; }
                        if (isCurrent) { bdr = '#0f172a'; }
                        return (
                            <button key={i} onClick={() => goTo(i)} style={{
                                width: 40, height: 40, borderRadius: 8, border: `2px solid ${bdr}`, background: bg,
                                color: clr, fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'all 0.15s',
                                boxShadow: isCurrent ? '0 0 0 2px #0f172a' : 'none'
                            }}>{i + 1}</button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--lom-primary)' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Answered</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: '#fff', border: '2px solid #e2e8f0' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Not Answered</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: '#fef3c7', border: '2px solid #f59e0b' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Marked for Review</span></div>
                </div>

                {/* Submit button */}
                <button onClick={submitAssessment} style={{
                    width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
                    background: '#ef4444', color: '#fff', fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800, fontSize: 16, cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(239,68,68,0.35)', transition: 'all 0.2s'
                }}>Submit Assessment</button>
            </div >
        </div >
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function LawsOfMotionSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkillId, setActiveSkillId] = useState(null);
    const [cellSkillsData, setCellSkillsData] = useState([]);
    
    useEffect(() => { 
        setCellSkillsData(generateLawsOfMotionSkillsData()); 
    }, []);
    
    const activeSkill = cellSkillsData.find(s => s.id === activeSkillId);

    const openMode = (skill, mode) => { 
        setActiveSkillId(skill.id); 
        // Regenerate questions so repeats across different sessions have distinct shuffling
        setCellSkillsData(generateLawsOfMotionSkillsData()); 
        setView(mode); 
    };

    return (
        <div className="lom-page">
            <nav className="lom-nav">
                {view === 'list' ? (
                    <button className="lom-nav-back" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion')}>← Back to Dashboard</button>
                ) : (
                    <button className="lom-nav-back" onClick={() => setView('list')}>← Back to Skills</button>
                )}
                <div className="lom-nav-links">
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/introduction')}>🌟 Intro</button>
                    <button className="lom-nav-link" onClick={() => navigate('/senior/grade/11/physics/laws-of-motion/terminology')}>📖 Terminology</button>
                    <button className="lom-nav-link active" onClick={() => setView('list')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
                {view === 'list' && (
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>Core <span style={{ background: 'linear-gradient(135deg, var(--lom-indigo), #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Skills</span></h1>
                            <p style={{ fontSize: 18, color: '#64748b', margin: 0, maxWidth: 600, marginInline: 'auto' }}>
                                Choose a skill below. Read the lesson, practice to build confidence, and take the assessment to earn your mastery!
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 900, margin: '0 auto' }}>
                            {cellSkillsData.map((skill) => (
                                <div key={skill.id} style={{
                                    display: 'flex', alignItems: 'center',
                                    background: '#fff', borderRadius: 20, padding: '20px 28px',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
                                    transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    gap: '20px', flexWrap: 'wrap'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: '1 1 auto', minWidth: 0 }}>
                                        <div style={{ background: `${skill.color}15`, color: skill.color, width: 52, height: 52, borderRadius: 14, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{skill.icon}</div>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 2, lineHeight: 1.1 }}>{skill.title}</div>
                                            <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55, maxWidth: 400 }}>{skill.desc}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                                        <button onClick={() => openMode(skill, 'learn')}
                                            style={{ padding: '9px 18px', borderRadius: 10, background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}
                                        >📖 Learn</button>
                                        <button onClick={() => openMode(skill, 'practice')}
                                            style={{ padding: '9px 18px', borderRadius: 10, background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}
                                        >✏️ Practice</button>
                                        <button onClick={() => openMode(skill, 'assess')}
                                            style={{ padding: '9px 22px', borderRadius: 10, background: skill.color, border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 12px ${skill.color}40`, transition: 'all 0.2s', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}
                                        >🏆 Assess</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'learn' && <LearnMode skill={activeSkill} onBack={() => setView('list')} />}
                {view === 'practice' && <PracticeMode skill={activeSkill} onBack={() => setView('list')} onAssess={() => openMode(activeSkill, 'assess')} />}
                {view === 'assess' && <AssessMode skill={activeSkill} onBack={() => setView('list')} />}
            </div>
        </div>
    );
}
