import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../shapes-around-us.css';
import { generateShapesSkillsData } from './shapesSkillsData';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

const SKILL_NODE_IDS = {
    'identifying-3d-shapes': NODE_IDS.g4MathShapesIdentifying3D,
    'nets-of-shapes': NODE_IDS.g4MathShapesNets,
    'types-of-angles': NODE_IDS.g4MathShapesAngles,
    'exploring-circles': NODE_IDS.g4MathShapesCircles,
};

/* ═══════════════════════════════════════════════════════════════
   QUESTION CARD — renders MCQ with optional image
   ═══════════════════════════════════════════════════════════════ */
function QuestionCard({ type, question, options, answer, onAnswer, disabled, selectedOption, image, showCorrect = true }) {
    const [val, setVal] = useState(selectedOption || '');

    if (type === 'multiple-choice') {
        return (
            <div style={{ marginBottom: 20 }}>
                {image && (
                    <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, padding: 16, background: '#f8fafc', borderRadius: 16, wordBreak: 'break-all', overflowWrap: 'break-word', display: 'flex', justifyContent: 'center' }}>
                        {typeof image === 'string' && image.trim().startsWith('<svg') ? <span style={{display: 'flex'}} dangerouslySetInnerHTML={{__html: image}} /> : image}
                    </div>
                )}
                <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{question}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {options.map((opt, i) => {
                        let bg = '#fff';
                        let bdr = '#e2e8f0';
                        let clr = '#0f172a';
                        const letter = String.fromCharCode(65 + i); // A, B, C, D

                        if (disabled && showCorrect) {
                            if (i === answer) { bg = '#f0fdf4'; bdr = '#10b981'; }
                            else if (i === selectedOption) { bg = '#fef2f2'; bdr = '#ef4444'; }
                            else { clr = '#94a3b8'; }
                        } else if (i === selectedOption) {
                            bg = '#eff6ff'; bdr = '#3b82f6';
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => onAnswer(i === selectedOption ? null : i)}
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
                                    background: i === selectedOption ? (showCorrect ? (i === answer ? '#10b981' : '#ef4444') : '#3b82f6') : '#f1f5f9',
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

    // Short answer
    return (
        <div style={{ marginBottom: 20 }}>
            {image && (
                <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12, padding: 16, background: '#f8fafc', borderRadius: 16, wordBreak: 'break-all', overflowWrap: 'break-word', display: 'flex', justifyContent: 'center' }}>
                    {typeof image === 'string' && image.trim().startsWith('<svg') ? <span style={{display: 'flex'}} dangerouslySetInnerHTML={{__html: image}} /> : image}
                </div>
            )}
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{question}</p>
            <div style={{ display: 'flex', gap: 10 }}>
                <input type="text" value={val} onChange={e => setVal(e.target.value)} disabled={disabled}
                    placeholder="Type answer..." style={{ padding: '12px 16px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 16, flex: 1 }} />
                <button disabled={disabled || !val} onClick={() => onAnswer(val.trim())}
                    style={{ padding: '0 20px', background: disabled ? '#e2e8f0' : '#0284c7', color: '#fff', borderRadius: 12, fontWeight: 600, border: 'none', cursor: disabled ? 'default' : 'pointer' }}>Submit</button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   CIRCULAR SCORE RING (for practice report)
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

/* ═══════════════════════════════════════════════════════════════
   FORMAT TIME HELPER
   ═══════════════════════════════════════════════════════════════ */
function fmtTime(ms) {
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ═══════════════════════════════════════════════════════════════
   MODE: LEARN
   ═══════════════════════════════════════════════════════════════ */
function LearnMode({ skill, onBack }) {
    const { startSession, finishSession } = useSessionLogger();
    
    useEffect(() => {
        startSession({ nodeId: SKILL_NODE_IDS[skill.id], sessionType: 'practice' });
    }, [skill.id, startSession]);

    const handleBack = () => {
        finishSession({
            totalQuestions: 1,
            questionsAnswered: 1,
            answersPayload: { mode: 'learn', completed: true }
        });
        onBack();
    };

    return (
        <div className="sau-detail-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <button onClick={handleBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: 20 }}>← Back to Skills</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ fontSize: 40 }}>
                    {typeof skill.icon === 'string' && skill.icon.trim().startsWith('<svg') ? <span style={{display: 'flex'}} dangerouslySetInnerHTML={{__html: skill.icon}} /> : skill.icon}
                </div>
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
                            <span style={{ color: skill.color, marginRight: 6 }}>💡 Example:</span>{sec.example}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleBack} style={{ padding: '12px 32px', background: skill.color, color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: `0 4px 14px ${skill.color}40` }}>Got it! →</button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MODE: PRACTICE (with Previous, state preservation, & report)
   ═══════════════════════════════════════════════════════════════ */
function PracticeMode({ skill, onBack }) {
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const [qIdx, setQIdx] = useState(0);
    const [answersMap, setAnswersMap] = useState({});
    const [finished, setFinished] = useState(false);
    const startTime = useRef(Date.now());
    const [elapsedMs, setElapsedMs] = useState(0);

    useEffect(() => {
        startSession({ nodeId: SKILL_NODE_IDS[skill.id], sessionType: 'practice' });
    }, [skill.id, startSession]);

    // Live timer
    useEffect(() => {
        if (finished) return;
        const timer = setInterval(() => {
            setElapsedMs(Date.now() - startTime.current);
        }, 1000);
        return () => clearInterval(timer);
    }, [finished]);

    const questions = skill.practice;
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
        
        const answerData = { selectedOpt: val, isCorrect: correct };
        setAnswersMap(prev => ({ ...prev, [qIdx]: answerData }));

        logAnswer({
            question_index: qIdx,
            answer_json: {
                question_text: q.question,
                selected_option: q.type === 'multiple-choice' ? q.options[val] : val,
                correct_answer: q.type === 'multiple-choice' ? q.options[q.correctAnswer] : q.correctAnswer,
                difficulty: 'Medium'
            },
            is_correct: correct ? 1 : 0
        });
    };

    const nextQ = () => {
        if (qIdx + 1 < questions.length) setQIdx(qIdx + 1);
        else {
            finishSession({
                totalQuestions: questions.length,
                questionsAnswered: Object.keys(answersMap).length,
                answersPayload: answersMap
            });
            setFinished(true);
        }
    };
    const prevQ = () => { if (qIdx > 0) setQIdx(qIdx - 1); };

    // ── PRACTICE REPORT ──
    if (finished) {
        const totalTime = Date.now() - startTime.current;
        const score = Object.values(answersMap).filter(a => a.isCorrect).length;
        const total = questions.length;
        const pct = Math.round((score / total) * 100);
        let msg = 'Keep Learning!', emoji = '💪', sub = 'Review the concepts and try again for 100%.';
        if (pct >= 90) { msg = 'Excellent!'; emoji = '🏆'; sub = 'You\'ve mastered this skill!'; }
        else if (pct >= 70) { msg = 'Great Job!'; emoji = '🌟'; sub = 'You\'re almost there, keep going!'; }

        return (
            <div className="sau-detail-anim" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '40px 24px' }}>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', marginBottom: 16, fontSize: 14 }}>← Back to Skills</button>
                <ScoreRing score={score} total={total} color={skill.color} />
                <div style={{ margin: '16px 0 8px', padding: '8px 24px', background: '#f8fafc', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#64748b', fontSize: 14 }}>
                    ⏱️ Time Taken: {fmtTime(totalTime)}
                </div>
                <div style={{ fontSize: 48, marginTop: 16 }}>{emoji}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '8px 0 4px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 24px' }}>{sub}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <button onClick={onBack} style={{ padding: '12px 28px', borderRadius: 100, border: `2px solid ${skill.color}`, background: '#fff', color: skill.color, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Back to Skills</button>
                </div>
            </div>
        );
    }

    // ── PRACTICE QUESTION VIEW ──
    return (
        <div className="sau-detail-anim" style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>← Exit Practice</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>⏱️</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtTime(elapsedMs)}</span>
                    </div>
                    <div style={{ fontWeight: 800, color: skill.color }}>Practice {qIdx + 1}/{questions.length}</div>
                </div>
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
                <button onClick={nextQ} disabled={!answered} style={{ padding: '12px 32px', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', background: answered ? skill.color : '#e2e8f0', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'default' }}>
                    {qIdx + 1 === questions.length ? 'Finish →' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MODE: ASSESS (question palette, timer, mark-for-review, report)
   ═══════════════════════════════════════════════════════════════ */
function AssessMode({ skill, onBack }) {
    const [qIdx, setQIdx] = useState(0);
    const [answersMap, setAnswersMap] = useState({});
    const [marked, setMarked] = useState({});
    const [finished, setFinished] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [expandedSolution, setExpandedSolution] = useState({});
    const startRef = useRef(Date.now());
    const qStartRef = useRef(Date.now());
    const [qTimes, setQTimes] = useState({});

    const questions = skill.assessment;
    const q = questions[qIdx];

    useEffect(() => {
        startSession({ nodeId: SKILL_NODE_IDS[skill.id], sessionType: 'assessment' });
    }, [skill.id, startSession]);

    // Timer tick
    useEffect(() => {
        if (finished) return;
        const iv = setInterval(() => setElapsed(Date.now() - startRef.current), 1000);
        return () => clearInterval(iv);
    }, [finished]);

    const handleAnswer = (val) => {
        const now = Date.now();
        const timeSpent = now - qStartRef.current;
        if (val === null) {
            setAnswersMap(prev => {
                const next = { ...prev };
                delete next[qIdx];
                return next;
            });
        } else {
            setAnswersMap(prev => ({ ...prev, [qIdx]: val }));
        }
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
        
        const finalResults = {};
        questions.forEach((qq, i) => {
            const ans = answersMap[i];
            if (ans !== undefined) {
                let isCorrect = false;
                if (qq.type === 'multiple-choice') isCorrect = ans === qq.correctAnswer;
                else isCorrect = ans?.toString().toLowerCase() === qq.correctAnswer?.toString().toLowerCase();
                
                finalResults[i] = {
                    selectedOption: qq.type === 'multiple-choice' ? qq.options[ans] : ans,
                    isCorrect
                };
            }
        });

        finishSession({
            totalQuestions: questions.length,
            questionsAnswered: Object.keys(answersMap).length,
            answersPayload: finalResults
        });
        setFinished(true);
    };

    // ── ASSESSMENT REPORT ──
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
            <div className="sau-detail-anim" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
                {/* Header */}
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 28px' }}>
                    📊 Assessment Report
                </h1>

                {/* Stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Total Score</div>
                        <div><span style={{ fontSize: 36, fontWeight: 900, color: skill.color }}>{score}</span><span style={{ fontSize: 18, color: '#94a3b8', fontWeight: 700 }}> / {questions.length}</span></div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Accuracy</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: accuracy >= 70 ? '#059669' : '#dc2626' }}>{accuracy}%</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '20px 16px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff' }}>
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
                                            {qq.image && (
                                                <div style={{ fontSize: 32, marginBottom: 8, wordBreak: 'break-all', overflowWrap: 'break-word', display: 'flex' }}>
                                                    {typeof qq.image === 'string' && qq.image.trim().startsWith('<svg') ? <span style={{display: 'flex'}} dangerouslySetInnerHTML={{__html: qq.image}} /> : qq.image}
                                                </div>
                                            )}
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
                                        <button onClick={() => setExpandedSolution(prev => ({ ...prev, [i]: !prev[i] }))} style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0 }}>
                                            {showSol ? '∧ Hide Solution' : '∨ Check Solution'}
                                        </button>
                                        {showSol && (
                                            <div style={{ marginTop: 8, padding: '12px 16px', background: '#fefce8', border: '1px solid #fde68a', borderRadius: 12 }}>
                                                <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 4 }}>💡 Step-by-Step Logic</div>
                                                <p style={{ margin: 0, fontSize: 14, color: '#78350f', lineHeight: 1.6 }}>{qq.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onBack} style={{ padding: '14px 40px', background: skill.color, color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer' }}>Back to Skills</button>
                </div>
            </div>
        );
    }

    // ── ASSESS QUESTION VIEW (split panel) ──
    const answeredCount = Object.keys(answersMap).length;
    const currentAnswered = answersMap[qIdx] !== undefined;

    return (
        <div className="sau-detail-anim" style={{ display: 'flex', gap: 24, maxWidth: 1100, margin: '0 auto', alignItems: 'flex-start' }}>
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
                    disabled={false}
                    selectedOption={answersMap[qIdx] ?? null}
                    image={q.image}
                    showCorrect={false}
                />

                {/* Navigation buttons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
                    <button onClick={() => goTo(Math.max(0, qIdx - 1))} disabled={qIdx === 0}
                        style={{ padding: '10px 24px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff', fontWeight: 700, fontSize: 14, color: qIdx === 0 ? '#cbd5e1' : '#334155', cursor: qIdx === 0 ? 'default' : 'pointer' }}>← Previous</button>
                    <button onClick={toggleMark}
                        style={{ padding: '10px 24px', borderRadius: 100, border: `2px solid ${marked[qIdx] ? '#f59e0b' : '#e2e8f0'}`, background: marked[qIdx] ? '#fef3c7' : '#fff', fontWeight: 700, fontSize: 14, color: marked[qIdx] ? '#92400e' : '#334155', cursor: 'pointer' }}>
                        {marked[qIdx] ? '★ Marked' : 'Mark for Review'}
                    </button>
                    <button onClick={() => goTo(Math.min(questions.length - 1, qIdx + 1))} disabled={qIdx === questions.length - 1}
                        style={{ padding: '10px 24px', borderRadius: 100, border: 'none', background: '#ef4444', fontWeight: 700, fontSize: 14, color: '#fff', cursor: qIdx === questions.length - 1 ? 'default' : 'pointer', opacity: qIdx === questions.length - 1 ? 0.5 : 1 }}>Next →</button>
                </div>
            </div>

            {/* RIGHT: Sidebar (timer + palette) */}
            <div style={{ flex: '0 0 280px', background: '#fffbeb', borderRadius: 24, padding: 24, position: 'sticky', top: 80 }}>
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
                        if (isAnswered) { bg = '#3b82f6'; bdr = '#3b82f6'; clr = '#fff'; }
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 16, height: 16, borderRadius: 4, background: '#3b82f6' }} /><span style={{ fontWeight: 600, color: '#334155' }}>Answered</span></div>
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
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ShapesSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);
    const [skillsData, setSkillsData] = useState(() => generateShapesSkillsData());

    const openMode = (skill, mode) => {
    const freshData = generateShapesSkillsData();
    const found = freshData.find(s => s.id === skill.id);
    setSkillsData(freshData);
    setActiveSkill(found ?? skill);
    setView(mode);
};
console.log("hi");
    return (
        <div className="sau-skills-page">
            <nav className="sau-nav">
                {view === 'list' ? (
                    <button className="sau-nav-back" onClick={() => navigate('/junior/grade/4/shapes-around-us')}>← Back to Shapes Around Us</button>
                ) : (
                    <button className="sau-nav-back" onClick={() => setView('list')}>← Back to Skills</button>
                )}
                <div className="sau-nav-links">
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/shapes-around-us/introduction')}>🌟 Introduction</button>
                    <button className="sau-nav-link" onClick={() => navigate('/junior/grade/4/shapes-around-us/terminology')}>📖 Terminology</button>
                    <button className="sau-nav-link sau-nav-link--active">🎯 Skills</button>
                </div>
            </nav>

            <div style={{ padding: '40px 24px', maxWidth: 1100, margin: '0 auto' }}>
                {view === 'list' && (
                    <div className="sau-detail-anim">
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>Master Your Shapes</h1>
                            <p style={{ fontSize: 18, color: '#64748b', margin: 0, maxWidth: 600, marginInline: 'auto' }}>
                                Choose a skill below. Read the lesson, practice to build confidence, and take the assessment to earn your mastery!
                            </p>
                        </div>
                        <div className="sau-skills-list">
                            {skillsData.map((skill) => (
                                <div key={skill.id} className="sau-skill-card">
                                    <div className="sau-skill-info">
                                        <div className="sau-skill-icon" style={{ background: `${skill.color}15`, color: skill.color }}>
                                            {typeof skill.icon === 'string' && skill.icon.trim().startsWith('<svg') ? <span style={{display: 'flex'}} dangerouslySetInnerHTML={{__html: skill.icon}} /> : skill.icon}
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{skill.title}</div>
                                            <div style={{ fontSize: 14, color: '#64748b' }}>{skill.desc}</div>
                                        </div>
                                    </div>
                                    <div className="sau-skill-actions">
                                        <button onClick={() => openMode(skill, 'learn')}
                                            style={{ padding: '10px 20px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer' }}
                                            onMouseOver={e => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.color = skill.color; }}
                                            onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
                                        >📖 Learn</button>
                                        <button onClick={() => openMode(skill, 'practice')}
                                            style={{ padding: '10px 20px', borderRadius: 12, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 700, cursor: 'pointer' }}
                                            onMouseOver={e => { e.currentTarget.style.borderColor = skill.color; e.currentTarget.style.color = skill.color; }}
                                            onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#334155'; }}
                                        >✏️ Practice</button>
                                        <button onClick={() => openMode(skill, 'assess')}
                                            style={{ padding: '10px 24px', borderRadius: 12, background: skill.color, border: 'none', color: '#fff', fontWeight: 800, cursor: 'pointer', boxShadow: `0 4px 12px ${skill.color}40` }}
                                            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                            onMouseOut={e => { e.currentTarget.style.transform = 'none'; }}
                                        >🏆 Assess</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'learn' && <LearnMode skill={activeSkill} onBack={() => setView('list')} />}
                {view === 'practice' && <PracticeMode skill={activeSkill} onBack={() => setView('list')} />}
                {view === 'assess' && <AssessMode skill={activeSkill} onBack={() => setView('list')} />}
            </div>
        </div>
    );
}
