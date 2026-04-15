import React, { useState, useEffect, useRef } from 'react';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import styles from './FractionsEngines.module.css';
import { LatexText } from '@/components/LatexText';
import mascotImg from '../../../../../../../assets/mascot.png';

export default function FractionsPracticeEngine({ questionPool, sampleSize = 10, title, color, onBack , nodeId}) {
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // stores { selectedOption, isCorrect }

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const { startSession, logAnswer, finishSession, abandonSession } = useSessionLogger();
    const v4Answers = useRef([]);
    const v4Finished = useRef(false);

    // Initialization
    useEffect(() => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        setQuestions(pool.slice(0, sampleSize));
    }, [questionPool, sampleSize]);

    // Timer
    useEffect(() => {
        if (finished || questions.length === 0) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished, questions]);

    useEffect(() => {
        if (!nodeId) return;
        v4Answers.current = [];
        v4Finished.current = false;
        startSession({ nodeId, sessionType: 'practice' });
        return () => { if (!v4Finished.current) abandonSession(); };
    }, [nodeId]);

    // Answer Persistence: Restoration Hook
    useEffect(() => {
        if (answers[qIndex]) {
            setSelectedOption(answers[qIndex].selectedOption);
            setIsCorrect(answers[qIndex].isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(null);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    // Modal Control
    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    if (questions.length === 0) return null;

    const q = questions[qIndex];
    const progress = ((qIndex + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        if (isSubmitted) return;
        setSelectedOption(idx);
        const correct = idx === q.correct;
        setIsCorrect(correct);
        setIsSubmitted(true);

        // Storage: store answer for persistence
        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption: idx, isCorrect: correct }
        }));

        setShowExplanationModal(true);
        if (nodeId) {
            v4Answers.current.push({
                question_index: qIndex,
                answer_json: JSON.stringify({ selected: idx }),
                is_correct: idx === q.correct,
                marks_awarded: idx === q.correct ? 1 : 0,
                marks_possible: 1,
                time_taken_ms: 0,
            });
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(i => i - 1);
    };

    const handleNext = () => {
        if (qIndex + 1 >= questions.length) {
            if (nodeId && !v4Finished.current) {
                v4Finished.current = true;
                finishSession({ answers_payload: v4Answers.current });
            }
            setFinished(true);
        } else {
            setQIndex(i => i + 1);
        }
    };

    const handleRetry = () => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        setQuestions(pool.slice(0, sampleSize));
        setQIndex(0);
        setAnswers({});
        setFinished(false);
        v4Answers.current = [];
        v4Finished.current = false;
        if (nodeId) startSession({ nodeId, sessionType: 'practice' });
        setTimeTaken(0);
        setShowExplanationModal(false);
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (finished) {
        const score = Object.values(answers).filter(val => val.isCorrect).length;
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        return (
            <div className={styles.pw_result_container}>
                <div className={styles.pw_score_circle_bg} style={{ background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)` }}>
                    <div className={styles.pw_score_circle_inner}>
                        <div className={styles.pw_score_value}>{score}</div>
                        <div className={styles.pw_score_total}>of {questions.length}</div>
                    </div>
                </div>
                <div className={styles.pw_time_pill} style={{ background: `${color}15`, color }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>
                <h2 className={styles.pw_result_title}>{msg}</h2>
                <p className={styles.pw_result_msg}>You are making great progress in Fractions!</p>
                <div className={styles.pw_retry_actions}>
                    <button className={styles.pw_btn_filled} onClick={handleRetry} style={{ background: color }}>🔄 Try Again</button>
                    <button className={styles.pw_btn_outline} onClick={onBack}>Return to Skills Hub</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pw_engine_container}>
            <div className={styles.pw_engine_header}>
                <div className={styles.pw_header_flex}>
                    <div>
                        <div className={styles.pw_session_tag} style={{ color }}>Practice Session</div>
                        <h3 className={styles.pw_session_title}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className={styles.pw_timer_box} style={{ color, background: `${color}10` }}>⏱️ {formatTime(timeTaken)}</div>
                        <div className={styles.pw_q_counter}>Question <span style={{ color }}>{qIndex + 1}</span> of {questions.length}</div>
                    </div>
                </div>
                <div className={styles.pw_progress_bar_bg}>
                    <div className={styles.pw_progress_bar_fill} style={{ width: `${progress}%`, background: color }} />
                </div>
            </div>

            <div className={styles.pw_question_main_card}>
                <div className={styles.pw_q_index_tag} style={{ background: `${color}15`, color }}>
                    QUESTION {qIndex + 1}
                </div>
                <div className={styles.pw_question_text}>
                    <LatexText text={q.question} />
                </div>

                <div className={styles.pw_options_grid}>
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.05)', bg = '#fff', dot = '#cbd5e1', txtColor = '#334155', weight = 500;
                        if (isSubmitted) {
                            if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.04)'; dot = '#10b981'; txtColor = '#059669'; weight = 700; }
                            else if (oi === selectedOption) { border = '#ef4444'; bg = 'rgba(239,68,68,0.04)'; dot = '#ef4444'; txtColor = '#dc2626'; weight = 700; }
                        } else if (selectedOption === oi) { border = color; bg = `${color}05`; dot = color; weight = 700; }

                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={isSubmitted}
                                className={styles.pw_option_btn}
                                style={{ borderColor: border, background: bg }}>
                                <div className={styles.pw_option_dot} style={{ borderColor: dot, background: isSubmitted && oi === q.correct ? dot : 'transparent' }} />
                                <span className={styles.pw_option_text} style={{ color: txtColor, fontWeight: weight }}>
                                    <LatexText text={opt} />
                                </span>
                            </button>
                        );
                    })}
                </div>

                {showExplanationModal && (
                    <div className={`${styles.pw_explanation_modal} ${isCorrect ? styles.correct : styles.incorrect}`}>
                        <img src={mascotImg} alt="Mascot" className={styles.pw_mascot_mini} />
                        <div className={styles.pw_explanation_content}>
                            <div className={`${styles.pw_explanation_title} ${isCorrect ? styles.correct : styles.incorrect}`}>
                                {isCorrect ? '✅ Excellent!' : '❌ Not quite!'}
                            </div>
                            <div className={styles.pw_explanation_text}>
                                <LatexText text={q.explanation} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.pw_engine_actions}>
                <button className={styles.pw_prev_btn} onClick={handlePrevious} disabled={qIndex === 0}>
                    ← Previous
                </button>
                <button className={styles.pw_next_btn} onClick={handleNext} disabled={!isSubmitted} style={{ background: isSubmitted ? color : '#cbd5e1' }}>
                    {qIndex + 1 >= questions.length ? 'Finish Session' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
