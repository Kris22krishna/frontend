import React, { useState, useEffect, useRef } from 'react';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import styles from './ShapesEngines.module.css';
import { LatexText } from '@/components/LatexText';

export default function ShapesAssessmentEngine({ questions, title, color, onBack, onSecondaryBack , nodeId}) {
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [finished, setFinished] = useState(false);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const v4IsFinished = useRef(false);
    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);
    useEffect(() => {
        if (!nodeId) return;
        v4IsFinished.current = false;
        startSession({ nodeId, sessionType: 'assessment' });
        return () => { if (!v4IsFinished.current) abandonSession(); };
    }, [nodeId]);

    useEffect(() => {
        if (!finished || !nodeId || v4IsFinished.current) return;
        v4IsFinished.current = true;
        const payload = questions.map((q, i) => ({
            question_index: i,
            answer_json: JSON.stringify({ selected: answers[i] }),
            is_correct: answers[i] === q.correct,
            marks_awarded: answers[i] === q.correct ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: 0,
        }));
        finishSession({ answers_payload: payload });
    }, [finished]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSelect = (idx) => {
        const newAns = [...answers];
        newAns[current] = idx;
        setAnswers(newAns);
    };

    const handleSubmit = () => {
        if (window.confirm('Ready to submit your assessment?')) {
            setFinished(true);
        }
    };

    if (finished) {
        const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0), 0);
        const pct = Math.round((score / questions.length) * 100);
        return (
            <div className={styles.sa_review_container}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
                    <h1 style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 900, marginBottom: 8 }}>Assessment Complete!</h1>
                    <p style={{ color: '#64748b', fontSize: 18 }}>You scored <LatexText text={`$${score}$`} /> out of <LatexText text={`$${questions.length}$`} /> (<LatexText text={`$${pct}\\%$`} />)</p>
                </div>

                <div style={{ display: 'grid', gap: 20 }}>
                    {questions.map((q, i) => (
                        <div key={i} className={styles.sa_review_card} style={{
                            borderLeft: `6px solid ${answers[i] === q.correct ? '#10b981' : '#ef4444'}`
                        }}>
                            <div className={styles.sa_review_q_text}>Question {i + 1}</div>
                            <div style={{ marginBottom: 16 }}><LatexText text={q.question} /></div>
                            <div className={styles.sa_answer_review}>
                                <div style={{ color: answers[i] === q.correct ? '#059669' : '#dc2626', fontWeight: 700, marginBottom: 4 }}>
                                    <span className={styles.sa_ans_label}>Your Answer: </span><LatexText text={answers[i] !== null ? q.options[answers[i]] : 'No answer'} />
                                </div>
                                {answers[i] !== q.correct && (
                                    <div className={styles.sa_correct_ans}>
                                        <span className={styles.sa_ans_label}>Correct Answer: </span><LatexText text={q.options[q.correct]} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.sa_retry_actions} style={{ marginTop: 40 }}>
                    <button className={styles.sa_btn_outline} onClick={onSecondaryBack}>Chapter Home</button>
                    <button className={styles.sa_btn_filled} onClick={onBack} style={{ background: color }}>Back to Skills</button>
                </div>
            </div>
        );
    }

    const q = questions[current];

    return (
        <div className={styles.sa_assessment_layout}>
            <main>
                <div className={styles.sa_assessment_main_card}>
                    <div style={{ fontSize: 12, fontWeight: 900, color, textTransform: 'uppercase', marginBottom: 12 }}>Question {current + 1} of {questions.length}</div>
                    <div className={styles.sa_question_text}><LatexText text={q.question} /></div>

                    <div className={styles.sa_options_grid}>
                        {q.options.map((opt, oi) => (
                            <button key={oi} onClick={() => handleSelect(oi)}
                                className={styles.sa_option_btn}
                                style={{
                                    borderColor: answers[current] === oi ? color : '#f1f5f9',
                                    background: answers[current] === oi ? `${color}05` : '#fff',
                                    fontWeight: answers[current] === oi ? 700 : 500
                                }}>
                                <div className={styles.sa_option_dot} style={{
                                    borderColor: answers[current] === oi ? color : '#cbd5e1',
                                    background: answers[current] === oi ? color : 'transparent'
                                }} />
                                <span className={styles.sa_option_text}><LatexText text={opt} /></span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.sa_assessment_actions}>
                    <button className={styles.sa_btn_outline} onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>Previous</button>
                    {current + 1 < questions.length ? (
                        <button className={styles.sa_btn_filled} style={{ background: color }} onClick={() => setCurrent(c => c + 1)}>Next Question</button>
                    ) : (
                        <button className={styles.sa_btn_filled} style={{ background: '#0f172a' }} onClick={handleSubmit}>Finish Assessment</button>
                    )}
                </div>
            </main>

            <aside>
                <div className={styles.sa_assessment_sidebar}>
                    <div className={styles.sa_sidebar_time}>Time: {formatTime(timeTaken)}</div>
                    <div className={styles.sa_q_nav_grid}>
                        {questions.map((_, i) => (
                            <button key={i} onClick={() => setCurrent(i)}
                                className={styles.sa_q_nav_btn}
                                style={{
                                    background: i === current ? '#0f172a' : (answers[i] !== null ? color : '#f1f5f9'),
                                    color: i === current || answers[i] !== null ? '#fff' : '#64748b'
                                }}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button onClick={onBack} className={styles.sa_exit_btn}>Exit Assessment</button>
                </div>
            </aside>
        </div>
    );
}
