import React, { useState, useEffect, useRef } from 'react';
import { generateECFSkillsData } from './ECFSkillsData';
import MathRenderer from '../../../../MathRenderer';
import ECFNav from '../../ECFNav';
import styles from '../../ecf.module.css';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

const BASE = '/senior/grade/12/physics/electric-charges-and-fields';

const SKILL_NODE_ID_MAP = {
    'electric-charge-properties': NODE_IDS.g12PhysECFElectricChargeProps,
    'coulombs-law':                NODE_IDS.g12PhysECFCoulombsLaw,
    'electric-field':              NODE_IDS.g12PhysECFElectricField,
    'field-lines-flux':            NODE_IDS.g12PhysECFFieldLinesFlux,
    'electric-dipole':             NODE_IDS.g12PhysECFElectricDipole,
    'gauss-law':                   NODE_IDS.g12PhysECFGaussLaw,
    'charge-distributions':        NODE_IDS.g12PhysECFChargeDistributions,
};

const SKILLS = generateECFSkillsData();

/* ═══════════════════════════════════════════════════
   PRACTICE ENGINE
   ═══════════════════════════════════════════════════ */
function ECFPracticeEngine({ skill, onBack, nodeId }) {
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);
    const sessionStartedRef = useRef(false);

    const questions = skill.practice;

    const [current, setCurrent]     = useState(0);
    const [selected, setSelected]   = useState(null);
    const [answered, setAnswered]   = useState(false);
    const [score, setScore]         = useState(0);
    const [finished, setFinished]   = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        if (!nodeId) return;
        startSession({ nodeId, sessionType: 'practice' });
        sessionStartedRef.current = true;
    }, [nodeId]); // eslint-disable-line

    useEffect(() => {
        return () => {
            if (sessionStartedRef.current && !isFinishedRef.current && answersPayload.current.length > 0) {
                abandonSession({ totalQuestions: questions.length, answersPayload: answersPayload.current });
            }
        };
    }, [abandonSession, questions.length]);

    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const q = questions[current];
    const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = async (i) => {
        if (answered) return;
        setSelected(i);
        setAnswered(true);
        const correct = i === q.correctAnswer;
        if (correct) setScore(s => s + 1);
        if (nodeId) {
            const entry = { question_index: current + 1, answer_json: { selected: i, correct: q.correctAnswer }, is_correct: correct ? 1.0 : 0.0, marks_awarded: correct ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
            answersPayload.current.push(entry);
            await logAnswer({ questionIndex: entry.question_index, answerJson: entry.answer_json, isCorrect: entry.is_correct });
        }
    };

    const handleExit = async () => {
        if (nodeId && !isFinishedRef.current) {
            isFinishedRef.current = true;
            await abandonSession({ totalQuestions: questions.length, answersPayload: answersPayload.current });
        }
        onBack();
    };

    const handleNext = async () => {
        if (current + 1 >= questions.length) {
            if (nodeId && !isFinishedRef.current) {
                isFinishedRef.current = true;
                await finishSession({ totalQuestions: questions.length, questionsAnswered: answersPayload.current.length, answersPayload: answersPayload.current });
            }
            setFinished(true);
        } else {
            setCurrent(c => c + 1); setSelected(null); setAnswered(false);
        }
    };

    const handleRetry = () => {
        answersPayload.current = []; isFinishedRef.current = false;
        setCurrent(0); setSelected(null); setAnswered(false);
        setScore(0); setFinished(false); setTimeTaken(0);
        if (nodeId) startSession({ nodeId, sessionType: 'practice' });
    };

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? 'Mastered!' : pct >= 75 ? 'Great Job!' : pct >= 50 ? 'Keep it up!' : 'Keep Learning!';
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className={styles['ecf-score-ring-wrap']} style={{ background: `conic-gradient(${skill.color} ${pct * 3.6}deg, #f1f5f9 0deg)` }}>
                    <div className={styles['ecf-score-ring-inner']}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 38, fontWeight: 900, color: '#1e293b', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>of {questions.length}</div>
                    </div>
                </div>
                <div style={{ display: 'inline-block', padding: '6px 16px', background: `${skill.color}15`, color: skill.color, borderRadius: 50, fontSize: 14, fontWeight: 800, marginBottom: 14 }}>⏱ {fmt(timeTaken)}</div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#1e293b', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 28px' }}>{pct >= 75 ? 'Excellent understanding!' : 'Review the concepts and try again.'}</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className={styles['ecf-btn-primary']} onClick={handleRetry} style={{ background: skill.color }}>New Questions</button>
                    <button className={styles['ecf-btn-secondary']} onClick={onBack}>Return to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['ecf-quiz-container']}>
            <div className={styles['ecf-quiz-header']} style={{ marginBottom: 8 }}>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 2 }}>Practice</div>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#1e293b', margin: 0 }}>{skill.title}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 13, color: skill.color, fontWeight: 800, background: `${skill.color}15`, padding: '3px 10px', borderRadius: 8, marginBottom: 3 }}>{fmt(timeTaken)}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color: skill.color }}>{current + 1}</span> / {questions.length}</div>
                    </div>
                    <button className={styles['ecf-btn-exit']} onClick={handleExit}><span>✕</span> Exit</button>
                </div>
            </div>

            <div className={styles['ecf-progress-bar-wrap']}>
                <div className={styles['ecf-progress-bar']} style={{ width: `${progress}%`, background: skill.color }} />
            </div>

            <div className={styles['ecf-quiz-card']}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${skill.color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color: skill.color, marginBottom: 14 }}>
                    QUESTION {current + 1}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', lineHeight: 1.65, marginBottom: 4 }}>
                    <MathRenderer text={q.question} />
                </div>

                <div className={styles['ecf-quiz-options']}>
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.07)';
                        let bg = '#fff';
                        let clr = '#1e293b';
                        let dot = '#f1f5f9';
                        if (answered) {
                            if (oi === q.correctAnswer) { border = '#10b981'; bg = 'rgba(16,185,129,0.05)'; clr = '#059669'; dot = '#10b981'; }
                            else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.05)'; clr = '#ef4444'; dot = '#ef4444'; }
                        } else if (selected === oi) { border = skill.color; bg = `${skill.color}05`; dot = skill.color; }
                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2.5px solid ${border}`, background: bg, cursor: answered ? 'default' : 'pointer', fontSize: 14, color: clr, textAlign: 'left', transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                                <MathRenderer text={opt} />
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div style={{ marginTop: 18, padding: '14px 18px', borderRadius: 12, background: `${skill.color}08`, border: `1px solid ${skill.color}20`, color: '#475569', fontSize: 14, lineHeight: 1.65 }}>
                        <strong style={{ color: skill.color }}>Explanation: </strong>
                        <MathRenderer text={q.explanation} />
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <button onClick={handleNext} disabled={!answered} className={styles['ecf-btn-primary']}
                    style={{ background: answered ? skill.color : '#f1f5f9', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'not-allowed', boxShadow: answered ? `0 8px 20px ${skill.color}30` : 'none' }}>
                    {current + 1 >= questions.length ? 'See Final Score' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   ASSESSMENT ENGINE
   ═══════════════════════════════════════════════════ */
function ECFAssessEngine({ skill, onBack, nodeId }) {
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const answersPayload = useRef([]);
    const isFinishedRef = useRef(false);
    const sessionStartedRef = useRef(false);
    const qStartRef = useRef(Date.now());

    const questions = skill.assessment;

    const [qIdx, setQIdx]           = useState(0);
    const [selected, setSelected]   = useState(null);
    const [responses, setResponses] = useState({});
    const [finished, setFinished]   = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        if (!nodeId) return;
        startSession({ nodeId, sessionType: 'assessment' });
        sessionStartedRef.current = true;
        answersPayload.current = [];
    }, [nodeId]); // eslint-disable-line

    useEffect(() => {
        return () => {
            if (sessionStartedRef.current && !isFinishedRef.current && answersPayload.current.length > 0) {
                abandonSession({ totalQuestions: questions.length, answersPayload: answersPayload.current });
            }
        };
    }, [abandonSession, questions.length]);

    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    const goTo = (idx) => { setQIdx(idx); setSelected(responses[idx]?.selected ?? null); };

    const handleExit = () => {
        if (nodeId && !isFinishedRef.current && answersPayload.current.length > 0) {
            isFinishedRef.current = true;
            abandonSession({ totalQuestions: questions.length, answersPayload: answersPayload.current });
        }
        onBack();
    };

    const handleSelect = async (i) => {
        const timeSpent = Date.now() - qStartRef.current;
        setSelected(i);
        const correct = i === questions[qIdx].correctAnswer;
        setResponses(p => ({ ...p, [qIdx]: { selected: i, isCorrect: correct } }));
        qStartRef.current = Date.now();
        if (nodeId) {
            const entry = { question_index: qIdx + 1, answer_json: { selected: i, text: questions[qIdx].options[i] }, is_correct: correct ? 1.0 : 0.0, marks_awarded: correct ? 1 : 0, marks_possible: 1, time_taken_ms: timeSpent };
            answersPayload.current.push(entry);
            await logAnswer({ questionIndex: entry.question_index, answerJson: entry.answer_json, isCorrect: entry.is_correct });
        }
    };

    const handleNext = async () => {
        if (qIdx + 1 < questions.length) {
            goTo(qIdx + 1);
        } else {
            setFinished(true);
            if (nodeId && !isFinishedRef.current) {
                isFinishedRef.current = true;
                await finishSession({ totalQuestions: questions.length, questionsAnswered: answersPayload.current.length, answersPayload: answersPayload.current });
            }
        }
    };

    if (finished) {
        const totalCorrect = Object.values(responses).filter(r => r.isCorrect).length;
        const pct = Math.round((totalCorrect / questions.length) * 100);
        return (
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 30, fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>
                        {pct >= 80 ? 'Mastery Achieved!' : 'Assessment Report'}
                    </h1>
                    <p style={{ color: '#64748b', fontSize: 15 }}>{skill.title}</p>
                </div>
                <div className={styles['ecf-report-grid']}>
                    {[
                        { label: 'Score',   val: `${pct}%`,                      bg: '#eff6ff', clr: '#3b82f6' },
                        { label: 'Correct', val: totalCorrect,                    bg: '#f0fdf4', clr: '#22c55e' },
                        { label: 'Wrong',   val: questions.length - totalCorrect, bg: '#fef2f2', clr: '#ef4444' },
                        { label: 'Time',    val: fmt(timeTaken),                  bg: '#f8fafc', clr: '#64748b' },
                    ].map(s => (
                        <div key={s.label} className={styles['ecf-report-stat']} style={{ background: s.bg }}>
                            <div className={styles['ecf-report-label']} style={{ color: s.clr }}>{s.label}</div>
                            <div className={styles['ecf-report-val']} style={{ color: s.clr }}>{s.val}</div>
                        </div>
                    ))}
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Detailed Review</h2>
                {questions.map((question, idx) => {
                    const resp = responses[idx];
                    const isCorrect = resp?.isCorrect;
                    return (
                        <div key={idx} className={`${styles['ecf-review-card']} ${isCorrect ? styles['ecf-review-card--correct'] : styles['ecf-review-card--wrong']}`}>
                            <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                                <span className={styles['ecf-review-q-num']} style={{ background: isCorrect ? '#22c55e' : '#ef4444' }}>{idx + 1}</span>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', lineHeight: 1.5 }}><MathRenderer text={question.question} /></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10, marginLeft: 36 }}>
                                <div className={styles['ecf-review-ans-box']} style={{ background: isCorrect ? '#f0fdf4' : '#fef2f2' }}>
                                    <div className={styles['ecf-review-ans-label']} style={{ color: isCorrect ? '#22c55e' : '#ef4444' }}>Your Answer</div>
                                    <div style={{ fontWeight: 700, color: isCorrect ? '#14532d' : '#7f1d1d', fontSize: 14 }}>
                                        {resp ? <MathRenderer text={question.options[resp.selected]} /> : 'Skipped'}
                                    </div>
                                </div>
                                <div className={styles['ecf-review-ans-box']} style={{ background: '#f0fdf4', border: '1px solid #dcfce7' }}>
                                    <div className={styles['ecf-review-ans-label']} style={{ color: '#22c55e' }}>Correct Answer</div>
                                    <div style={{ fontWeight: 700, color: '#14532d', fontSize: 14 }}><MathRenderer text={question.options[question.correctAnswer]} /></div>
                                </div>
                            </div>
                            <div style={{ marginLeft: 36, padding: 14, borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Solution Strategy</div>
                                <div style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6 }}><MathRenderer text={question.explanation} /></div>
                            </div>
                        </div>
                    );
                })}
                <div style={{ textAlign: 'center', marginTop: 28, display: 'flex', gap: 14, justifyContent: 'center' }}>
                    <button className={styles['ecf-btn-secondary']} onClick={() => window.location.reload()}>Retake Test</button>
                    <button className={styles['ecf-btn-primary']} onClick={onBack} style={{ background: skill.color }}>Return to Skills</button>
                </div>
            </div>
        );
    }

    const q = questions[qIdx];
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                    <span style={{ fontSize: 10, fontWeight: 900, color: skill.color, textTransform: 'uppercase', letterSpacing: 1 }}>Final Assessment</span>
                    <h2 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: '#1e293b' }}>{skill.title}</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ background: '#fff', padding: '6px 14px', borderRadius: 10, border: '2px solid #e2e8f0', fontSize: 15, fontWeight: 900, color: '#1e293b' }}>⏱ {fmt(timeTaken)}</div>
                    <button className={styles['ecf-btn-exit']} onClick={handleExit}><span>✕</span> Exit</button>
                </div>
            </div>

            <div className={styles['ecf-assess-layout']}>
                <div className={styles['ecf-assess-main']}>
                    <div className={styles['ecf-quiz-card']}>
                        <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 8, background: `${skill.color}15`, color: skill.color, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
                            Question {qIdx + 1} of {questions.length}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', lineHeight: 1.6, marginBottom: 20 }}>
                            <MathRenderer text={q.question} />
                        </div>
                        <div className={styles['ecf-quiz-options']}>
                            {q.options.map((opt, i) => {
                                const isSelected = selected === i;
                                let border = '#f1f5f9', bg = '#fff', clr = '#475569';
                                if (isSelected) { border = skill.color; bg = `${skill.color}05`; clr = skill.color; }
                                return (
                                    <button key={i} onClick={() => handleSelect(i)}
                                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: `2px solid ${border}`, background: bg, cursor: 'pointer', fontSize: 14, color: clr, textAlign: 'left', transition: 'all 0.2s', fontWeight: isSelected ? 700 : 500, fontFamily: 'Open Sans, sans-serif' }}>
                                        <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${isSelected ? skill.color : '#cbd5e1'}`, background: isSelected ? skill.color : 'transparent', flexShrink: 0 }} />
                                        <MathRenderer text={opt} />
                                    </button>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 16, borderTop: '2px dashed #f1f5f9' }}>
                            <button onClick={() => goTo(Math.max(0, qIdx - 1))} disabled={qIdx === 0}
                                className={styles['ecf-btn-secondary']}
                                style={{ padding: '8px 18px', opacity: qIdx === 0 ? 0.4 : 1, cursor: qIdx === 0 ? 'not-allowed' : 'pointer' }}>
                                ← Previous
                            </button>
                            <button onClick={handleNext} className={styles['ecf-btn-primary']} style={{ padding: '8px 22px', background: skill.color }}>
                                {qIdx === questions.length - 1 ? 'Submit →' : 'Next →'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles['ecf-palette-panel']}>
                    <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 800, margin: '0 0 12px', color: '#0f172a' }}>Question Palette</h4>
                    <div className={styles['ecf-palette-grid']}>
                        {questions.map((_, i) => {
                            const isAns = responses[i] !== undefined;
                            const isCur = i === qIdx;
                            return (
                                <button key={i} onClick={() => goTo(i)}
                                    className={`${styles['ecf-palette-btn']}${isCur ? ` ${styles['ecf-palette-btn--current']}` : ''}${isAns ? ` ${styles['ecf-palette-btn--answered']}` : ''}`}
                                    style={{ background: isAns ? skill.color : undefined, color: isAns ? '#fff' : undefined, borderColor: isAns ? skill.color : undefined }}>
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                        {[{ bg: skill.color, label: 'Answered', clr: '#fff' }, { bg: '#f8fafc', label: 'Not Answered', clr: '#64748b' }].map(l => (
                            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 14, height: 14, borderRadius: 4, background: l.bg, border: '2px solid #e2e8f0' }} />
                                <span style={{ fontWeight: 600, color: '#334155' }}>{l.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   LEARN VIEW
   ═══════════════════════════════════════════════════ */
function ECFLearnView({ skill, onPractice }) {
    const [sectionIdx, setSectionIdx] = useState(0);
    const sec = skill.learnSections[sectionIdx];

    return (
        <div className={styles['ecf-learn-grid']}>
            <aside className={styles['ecf-learn-sidebar']}>
                <div className={styles['ecf-sidebar-label']}>Learning Path</div>
                {skill.learnSections.map((s, i) => (
                    <button key={i} onClick={() => setSectionIdx(i)}
                        className={`${styles['ecf-sidebar-btn']}${sectionIdx === i ? ` ${styles['ecf-sidebar-btn--active']}` : ''}`}
                        style={{ '--ecf-skill-color': skill.color }}>
                        <span className={styles['ecf-sidebar-num']}>{i + 1}</span>
                        <span className={styles['ecf-sidebar-title']}>{s.heading.split(/[-—]/)[0].trim()}</span>
                    </button>
                ))}
                <div className={styles['ecf-sidebar-goal']}>
                    <div className={styles['ecf-sidebar-goal-box']} style={{ background: `${skill.color}10`, border: `1px solid ${skill.color}20` }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: skill.color, marginBottom: 4 }}>GOAL</div>
                        <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4 }}>Finish all {skill.learnSections.length} topics, then move into practice and assessment.</div>
                    </div>
                </div>
            </aside>

            <div className={styles['ecf-details-window']} key={sectionIdx}>
                <div className={styles['ecf-learn-header-row']} style={{ '--ecf-skill-color': skill.color }}>
                    <div>
                        <div className={styles['ecf-learn-skill-meta']}>TOPIC {sectionIdx + 1} OF {skill.learnSections.length}</div>
                        <h2 className={styles['ecf-learn-title']}>{sec.heading}</h2>
                    </div>
                    <span style={{ fontSize: 30, color: skill.color }}>{sec.icon || '📗'}</span>
                </div>

                <div style={{ background: `${skill.color}05`, padding: 20, borderRadius: 16, border: `2px solid ${skill.color}10`, marginBottom: 24 }}>
                    <div style={{ fontSize: 16, lineHeight: 1.75, color: '#1e293b', fontWeight: 500, marginBottom: sec.graphSvg ? 20 : 0 }}>
                        <MathRenderer text={sec.content} />
                    </div>
                    {sec.graphSvg && (
                        <div dangerouslySetInnerHTML={{ __html: sec.graphSvg }} />
                    )}
                </div>

                {sec.example && (
                    <div className={styles['ecf-tip-box']}
                        style={{
                            background: sec.keyLabel === 'neet-trap' ? '#fff1f2' : sec.keyLabel === 'misconception' ? '#fffbeb' : '#f0fdf4',
                            borderColor: sec.keyLabel === 'neet-trap' ? '#fda4af' : sec.keyLabel === 'misconception' ? '#fde68a' : '#86efac'
                        }}>
                        <span style={{ fontWeight: 900, color: sec.keyLabel === 'neet-trap' ? '#9f1239' : sec.keyLabel === 'misconception' ? '#92400e' : '#065f46', fontSize: 15 }}>
                            {sec.keyLabel === 'neet-trap' ? '⚠️ NEET Trap' : sec.keyLabel === 'misconception' ? '⚠️ Misconception' : '📌 Note'}
                        </span>
                        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#334155' }}>
                            <MathRenderer text={sec.example} />
                        </div>
                    </div>
                )}

                <div className={styles['ecf-learn-footer']}>
                    {sectionIdx < skill.learnSections.length - 1 ? (
                        <button className={styles['ecf-btn-primary']} style={{ background: skill.color }} onClick={() => setSectionIdx(sectionIdx + 1)}>
                            Next Topic →
                        </button>
                    ) : (
                        <button className={styles['ecf-btn-primary']} style={{ background: skill.color }} onClick={onPractice}>
                            Start Practice →
                        </button>
                    )}
                    <button className={styles['ecf-btn-secondary']} onClick={onPractice}>Skip to Practice</button>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════ */
export default function ECFSkills() {
    const [view, setView] = useState('list');
    const [activeSkill, setActiveSkill] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, [view, activeSkill]);

    const nodeId = activeSkill ? SKILL_NODE_ID_MAP[activeSkill.id] : null;

    const openSkill = (skill, mode) => { setActiveSkill(skill); setView(mode); window.scrollTo(0, 0); };
    const backToList = () => { setView('list'); setActiveSkill(null); window.scrollTo(0, 0); };

    /* ── SKILL LIST ── */
    if (view === 'list') {
        return (
            <div className={styles['ecf-page']}>
                <ECFNav activeTab="skills" />
                <div className={styles['ecf-hero']}>
                    <h1 className={styles['ecf-hero-title']}>Core <span className={styles['ecf-hero-accent']}>Skills</span></h1>
                    <p className={styles['ecf-hero-sub']}>Master each skill: Learn → Practice → Assess</p>
                </div>
                <div className={styles['ecf-section']}>
                    <div className={styles['ecf-skills-list']}>
                        {SKILLS.map((skill, idx) => (
                            <div key={skill.id} className={styles['ecf-skill-card']} style={{ '--ecf-skill-color': skill.color }}>
                                <div className={styles['ecf-skill-info']}>
                                    <div className={styles['ecf-skill-icon']} style={{ background: `${skill.color}15`, color: skill.color }}>{skill.icon}</div>
                                    <div>
                                        <div className={styles['ecf-skill-meta']} style={{ color: skill.color }}>Skill {idx + 1}</div>
                                        <div className={styles['ecf-skill-title']}>{skill.title}</div>
                                        <div className={styles['ecf-skill-desc']}><MathRenderer text={skill.desc} /></div>
                                    </div>
                                </div>
                                <div className={styles['ecf-skill-actions']}>
                                    <button className={styles['ecf-skill-btn-outline']} style={{ '--ecf-skill-color': skill.color }} onClick={() => openSkill(skill, 'learn')}>Learn</button>
                                    <button className={styles['ecf-skill-btn-outline']} style={{ '--ecf-skill-color': skill.color }} onClick={() => openSkill(skill, 'practice')}>Practice</button>
                                    <button className={styles['ecf-skill-btn-filled']} style={{ '--ecf-skill-color': skill.color }} onClick={() => openSkill(skill, 'assess')}>Assess</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* ── LEARN / PRACTICE / ASSESS VIEWS ── */
    const extraLinks = [
        { label: '📖 Learn',    active: view === 'learn',    onClick: () => openSkill(activeSkill, 'learn') },
        { label: '✏️ Practice', active: view === 'practice', onClick: () => openSkill(activeSkill, 'practice') },
        { label: '🏆 Assess',   active: view === 'assess',   onClick: () => openSkill(activeSkill, 'assess') },
    ];

    const heroTitle = view === 'learn' ? 'Learn' : view === 'practice' ? 'Practice' : 'Assessment';
    const heroSub = view === 'learn' ? 'Follow the learning path — one topic at a time.' :
                    view === 'practice' ? 'Practice questions based on this skill.' :
                    'Short review set for this skill block.';

    return (
        <div className={styles['ecf-page']}>
            <ECFNav activeTab="skills" backLabel="← Skills" onBack={backToList} extraLinks={extraLinks} />
            <div className={styles['ecf-hero']}>
                <h1 className={styles['ecf-hero-title']}>
                    {heroTitle}: <span className={styles['ecf-hero-accent']}>{activeSkill.title}</span>
                </h1>
                <p className={styles['ecf-hero-sub']}>{heroSub}</p>
            </div>
            <div className={styles['ecf-section']}>
                {view === 'learn'    && <ECFLearnView    skill={activeSkill} onPractice={() => openSkill(activeSkill, 'practice')} />}
                {view === 'practice' && <ECFPracticeEngine skill={activeSkill} onBack={backToList} nodeId={nodeId} />}
                {view === 'assess'   && <ECFAssessEngine   skill={activeSkill} onBack={backToList} nodeId={nodeId} />}
            </div>
        </div>
    );
}
