import React, { useState, useEffect, useRef } from 'react';
import { useSessionLogger } from '../../../../../../../hooks/useSessionLogger';
import styles from './ShapesEngines.module.css';
import { LatexText } from '@/components/LatexText';

function sample(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

export default function ShapesPracticeEngine({ questionPool, sampleSize = 10, title, color, onBack , nodeId}) {
    const [questions, setQuestions] = useState(() => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        return sample(pool, sampleSize);
    });
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const v4Answers = useRef([]);
    const v4Finished = useRef(false);

    useEffect(() => {
        if (finished) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished]);

    useEffect(() => {
        if (!nodeId) return;
        v4Answers.current = [];
        v4Finished.current = false;
        startSession({ nodeId, sessionType: 'practice' });
        return () => { if (!v4Finished.current) abandonSession(); };
    }, [nodeId]);

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const q = questions[current];
    const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.correct) setScore(s => s + 1);
        if (nodeId) {
            v4Answers.current.push({
                question_index: current,
                answer_json: JSON.stringify({ selected: idx }),
                is_correct: idx === q.correct,
                marks_awarded: idx === q.correct ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: 0,
            });
        }
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) { if (nodeId && !v4Finished.current) {
            v4Finished.current = true;
            finishSession({ answers_payload: v4Answers.current });
        }
        setFinished(true); }
        else { setCurrent(c => c + 1); setSelected(null); setAnswered(false); }
    };

    const handleRetry = () => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        setQuestions(sample(pool, sampleSize));
        setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); setTimeTaken(0);
        v4Answers.current = [];
        v4Finished.current = false;
        if (nodeId) startSession({ nodeId, sessionType: 'practice' });
    };

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        return (
            <div className={styles.sa_result_container}>
                <div className={styles.sa_score_circle_bg} style={{
                    background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`
                }}>
                    <div className={styles.sa_score_circle_inner}>
                        <div className={styles.sa_score_value}>{score}</div>
                        <div className={styles.sa_score_total}>of {questions.length}</div>
                    </div>
                </div>
                <div className={styles.sa_time_pill} style={{ background: `${color}15`, color }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>
                <h2 className={styles.sa_result_title}>{msg}</h2>
                <p className={styles.sa_result_msg}>Geometry mastery is just a few steps away!</p>
                <div className={styles.sa_retry_actions}>
                    <button className={styles.sa_btn_filled} onClick={handleRetry} style={{ background: color }}>🔀 New Questions</button>
                    <button className={styles.sa_btn_outline} onClick={onBack}>Return to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.sa_engine_container}>
            <div className={styles.sa_engine_header}>
                <div className={styles.sa_header_flex}>
                    <div>
                        <div className={styles.sa_session_tag} style={{ color }}>Practice Session</div>
                        <h3 className={styles.sa_session_title}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className={styles.sa_timer_box} style={{ color, background: `${color}10` }}>⏱️ {formatTime(timeTaken)}</div>
                        <div className={styles.sa_q_counter}>Question <span style={{ color }}>{current + 1}</span> of {questions.length}</div>
                    </div>
                </div>
                <div className={styles.sa_progress_bar_bg}>
                    <div className={styles.sa_progress_bar_fill} style={{ width: `${progress}%`, background: color }} />
                </div>
            </div>

            <div className={styles.sa_question_main_card}>
                <div className={styles.sa_q_index_tag} style={{ background: `${color}15`, color }}>
                    QUESTION {current + 1}
                </div>
                <div className={styles.sa_question_text}>
                    <LatexText text={q.question} />
                </div>

                <div className={styles.sa_options_grid}>
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.05)', bg = '#fff', dot = '#cbd5e1', txtColor = '#334155', weight = 500;
                        if (answered) {
                            if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.04)'; dot = '#10b981'; txtColor = '#059669'; weight = 700; }
                            else if (oi === selected) { border = '#ef4444'; bg = 'rgba(239,68,68,0.04)'; dot = '#ef4444'; txtColor = '#dc2626'; weight = 700; }
                        } else if (selected === oi) { border = color; bg = `${color}05`; dot = color; weight = 700; }

                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                className={styles.sa_option_btn}
                                style={{
                                    borderColor: border,
                                    background: bg
                                }}>
                                <div className={styles.sa_option_dot} style={{
                                    borderColor: dot,
                                    background: selected === oi || (answered && oi === q.correct) ? dot : 'transparent'
                                }} />
                                <span className={styles.sa_option_text} style={{ color: txtColor, fontWeight: weight }}>
                                    <LatexText text={opt} />
                                </span>
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div className={styles.sa_explanation_box}>
                        <strong className={styles.sa_explanation_label}>💡 Explanation: </strong><LatexText text={q.explanation} />
                    </div>
                )}
            </div>

            <div className={styles.sa_engine_actions}>
                <button onClick={handleNext} disabled={!answered}
                    className={styles.sa_next_btn}
                    style={{ background: answered ? color : '#cbd5e1' }}>
                    {current + 1 >= questions.length ? 'Finish Session' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
