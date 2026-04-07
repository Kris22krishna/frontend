import React, { useState, useEffect, useRef } from 'react';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import styles from './HowManySquaresEngines.module.css';
import { LatexText } from '@/components/LatexText';

export default function HowManySquaresAssessmentEngine({ questions, title, color, onBack, onSecondaryBack , nodeId}) {
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // { selectedOption, isCorrect }

    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false); // Used strictly for UI rendering of selected option in assessment

    const [finished, setFinished] = useState(false);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const v4IsFinished = useRef(false);
    const [timeTaken, setTimeTaken] = useState(0);

    // Timer
    useEffect(() => {
        if (finished || !questions || questions.length === 0) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished, questions]);

    useEffect(() => {
        if (!nodeId) return;
        v4IsFinished.current = false;
        startSession({ nodeId, sessionType: 'assessment' });
        return () => { if (!v4IsFinished.current) abandonSession(); };
    }, [nodeId]);

    useEffect(() => {
        if (!finished || !nodeId || v4IsFinished.current) return;
        v4IsFinished.current = true;
        const payload = questions.map((q, i) => {
            const ans = answers[i];
            const correct = ans ? ans.isCorrect : false;
            return {
                question_index: i,
                answer_json: JSON.stringify({ selected: ans ? ans.selectedOption : null }),
                is_correct: correct,
                marks_awarded: correct ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: 0,
            };
        });
        finishSession({ answers_payload: payload });
    }, [finished]);

    // Restoration Hook for Assessment
    useEffect(() => {
        if (answers[qIndex]) {
            setSelectedOption(answers[qIndex].selectedOption);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    if (!questions || questions.length === 0) return null;

    const q = questions[qIndex];
    const progress = ((qIndex + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        setSelectedOption(idx);
        setIsSubmitted(true);

        // Store answer silently
        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption: idx, isCorrect: idx === q.correct }
        }));
    };

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(i => i - 1);
    };

    const handleNext = () => {
        if (qIndex + 1 >= questions.length) {
            setFinished(true);
        } else {
            setQIndex(i => i + 1);
        }
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (finished) {
        const score = Object.values(answers).filter(val => val.isCorrect).length;
        const pct = Math.round((score / questions.length) * 100);
        const passed = pct >= 80;
        const msg = passed ? '🏆 Assessment Passed!' : '💪 Keep Practicing!';

        return (
            <div className={styles.hms_result_container}>
                <div className={styles.hms_score_circle_bg} style={{ background: `conic-gradient(${passed ? '#10b981' : '#f59e0b'} ${pct * 3.6}deg, #f1f5f9 0deg)` }}>
                    <div className={styles.hms_score_circle_inner}>
                        <div className={styles.hms_score_value}>{score}</div>
                        <div className={styles.hms_score_total}>of {questions.length}</div>
                    </div>
                </div>
                <div className={styles.hms_time_pill} style={{ background: `${color}15`, color }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>
                <h2 className={styles.hms_result_title}>{msg}</h2>
                <div className={styles.hms_retry_actions}>
                    {passed ? (
                        <button className={styles.hms_btn_filled} onClick={onSecondaryBack} style={{ background: color }}>Complete Chapter</button>
                    ) : (
                        <button className={styles.hms_btn_filled} onClick={() => {
                            setQIndex(0); setAnswers({}); setFinished(false); setTimeTaken(0);
                        }} style={{ background: '#f59e0b' }}>Retake Assessment</button>
                    )}
                    <button className={styles.hms_btn_outline} onClick={onBack}>Return to Skills</button>
                </div>
            </div>
        );
    }

    // Unanswered check for assessment requires all questions to be answered to finish
    // But since handleNext moves forward regardless, we just disable if not answered.
    return (
        <div className={styles.hms_engine_container}>
            <div className={styles.hms_engine_header}>
                <div className={styles.hms_header_flex}>
                    <div>
                        <div className={styles.hms_session_tag} style={{ color: '#ef4444' }}>Assessment Mode</div>
                        <h3 className={styles.hms_session_title}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className={styles.hms_timer_box} style={{ color: '#ef4444', background: `#ef444410` }}>⏱️ {formatTime(timeTaken)}</div>
                        <div className={styles.hms_q_counter}>Question <span style={{ color }}>{qIndex + 1}</span> of {questions.length}</div>
                    </div>
                </div>
                <div className={styles.hms_progress_bar_bg}>
                    <div className={styles.hms_progress_bar_fill} style={{ width: `${progress}%`, background: '#ef4444' }} />
                </div>
            </div>

            <div className={styles.hms_question_main_card}>
                <div className={styles.hms_q_index_tag} style={{ background: `#ef444415`, color: '#ef4444' }}>
                    Assessment Q{qIndex + 1}
                </div>
                <div className={styles.hms_question_text}>
                    <LatexText text={q.question} />
                </div>

                <div className={styles.hms_options_grid}>
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.05)', bg = '#fff', dot = '#cbd5e1', txtColor = '#334155', weight = 500;
                        if (selectedOption === oi) { border = '#ef4444'; bg = `#ef444405`; dot = '#ef4444'; weight = 700; }

                        return (
                            <button key={oi} onClick={() => handleSelect(oi)}
                                className={styles.hms_option_btn}
                                style={{ borderColor: border, background: bg }}>
                                <div className={styles.hms_option_dot} style={{ borderColor: dot, background: selectedOption === oi ? dot : 'transparent' }} />
                                <span className={styles.hms_option_text} style={{ color: txtColor, fontWeight: weight }}>
                                    <LatexText text={opt} />
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.hms_engine_actions}>
                <button className={styles.hms_prev_btn} onClick={handlePrevious} disabled={qIndex === 0}>
                    ← Previous
                </button>
                <button className={styles.hms_next_btn} onClick={handleNext} disabled={!isSubmitted} style={{ background: isSubmitted ? '#ef4444' : '#cbd5e1' }}>
                    {qIndex + 1 >= questions.length ? 'Submit Assessment' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
