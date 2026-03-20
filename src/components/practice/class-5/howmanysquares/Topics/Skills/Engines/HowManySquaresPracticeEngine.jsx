import React, { useState, useEffect } from 'react';
import styles from './HowManySquaresEngines.module.css';
import { LatexText } from '@/components/LatexText';
import mascotImg from '../../../../../../../assets/mascot.png';

export default function HowManySquaresPracticeEngine({ questionPool, sampleSize = 10, title, color, onBack }) {
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({}); // stores { selectedOption, isCorrect }

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const [finished, setFinished] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);

    // Initialization
    useEffect(() => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        // Don't shuffle if we want to follow exact sequential order of subtopics!
        // The generator generateQuestions already outputs them in order.
        // But if it's a generic pool of larger size, we might just slice or use as is.
        // For HowManySquares, workflow says "MUST follow exact sequence", so we do not shuffle.
        setQuestions(pool.slice(0, sampleSize));
    }, [questionPool, sampleSize]);

    // Timer
    useEffect(() => {
        if (finished || questions.length === 0) return;
        const t = setInterval(() => setTimeTaken(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [finished, questions]);

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

    // Modal Control (CRITICAL as per workflow)
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

    const handleRetry = () => {
        const pool = typeof questionPool === 'function' ? questionPool() : questionPool;
        setQuestions(pool.slice(0, sampleSize));
        setQIndex(0);
        setAnswers({});
        setFinished(false);
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
            <div className={styles.hms_result_container}>
                <div className={styles.hms_score_circle_bg} style={{ background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)` }}>
                    <div className={styles.hms_score_circle_inner}>
                        <div className={styles.hms_score_value}>{score}</div>
                        <div className={styles.hms_score_total}>of {questions.length}</div>
                    </div>
                </div>
                <div className={styles.hms_time_pill} style={{ background: `${color}15`, color }}>
                    ⏱️ Time Taken: {formatTime(timeTaken)}
                </div>
                <h2 className={styles.hms_result_title}>{msg}</h2>
                <p className={styles.hms_result_msg}>You are making great progress in Spatial geometry!</p>
                <div className={styles.hms_retry_actions}>
                    <button className={styles.hms_btn_filled} onClick={handleRetry} style={{ background: color }}>🔄 Try Again</button>
                    <button className={styles.hms_btn_outline} onClick={onBack}>Return to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.hms_engine_container}>
            <div className={styles.hms_engine_header}>
                <div className={styles.hms_header_flex}>
                    <div>
                        <div className={styles.hms_session_tag} style={{ color }}>Practice Session</div>
                        <h3 className={styles.hms_session_title}>{title}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className={styles.hms_timer_box} style={{ color, background: `${color}10` }}>⏱️ {formatTime(timeTaken)}</div>
                        <div className={styles.hms_q_counter}>Question <span style={{ color }}>{qIndex + 1}</span> of {questions.length}</div>
                    </div>
                </div>
                <div className={styles.hms_progress_bar_bg}>
                    <div className={styles.hms_progress_bar_fill} style={{ width: `${progress}%`, background: color }} />
                </div>
            </div>

            <div className={styles.hms_question_main_card}>
                <div className={styles.hms_q_index_tag} style={{ background: `${color}15`, color }}>
                    QUESTION {qIndex + 1}
                </div>
                <div className={styles.hms_question_text}>
                    <LatexText text={q.question} />
                </div>

                <div className={styles.hms_options_grid}>
                    {q.options.map((opt, oi) => {
                        let border = 'rgba(0,0,0,0.05)', bg = '#fff', dot = '#cbd5e1', txtColor = '#334155', weight = 500;
                        if (isSubmitted) {
                            if (oi === q.correct) { border = '#10b981'; bg = 'rgba(16,185,129,0.04)'; dot = '#10b981'; txtColor = '#059669'; weight = 700; }
                            else if (oi === selectedOption) { border = '#ef4444'; bg = 'rgba(239,68,68,0.04)'; dot = '#ef4444'; txtColor = '#dc2626'; weight = 700; }
                        } else if (selectedOption === oi) { border = color; bg = `${color}05`; dot = color; weight = 700; }

                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={isSubmitted}
                                className={styles.hms_option_btn}
                                style={{ borderColor: border, background: bg }}>
                                <div className={styles.hms_option_dot} style={{ borderColor: dot, background: isSubmitted && oi === q.correct ? dot : 'transparent' }} />
                                <span className={styles.hms_option_text} style={{ color: txtColor, fontWeight: weight }}>
                                    <LatexText text={opt} />
                                </span>
                            </button>
                        );
                    })}
                </div>

                {showExplanationModal && (
                    <div className={`${styles.hms_explanation_modal} ${isCorrect ? styles.correct : styles.incorrect}`}>
                        <img src={mascotImg} alt="Mascot" className={styles.hms_mascot_mini} />
                        <div className={styles.hms_explanation_content}>
                            <div className={`${styles.hms_explanation_title} ${isCorrect ? styles.correct : styles.incorrect}`}>
                                {isCorrect ? '✅ Excellent!' : '❌ Not quite!'}
                            </div>
                            <div className={styles.hms_explanation_text}>
                                <LatexText text={q.explanation} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.hms_engine_actions}>
                <button className={styles.hms_prev_btn} onClick={handlePrevious} disabled={qIndex === 0}>
                    ← Previous
                </button>
                <button className={styles.hms_next_btn} onClick={handleNext} disabled={!isSubmitted} style={{ background: isSubmitted ? color : '#cbd5e1' }}>
                    {qIndex + 1 >= questions.length ? 'Finish Session' : 'Next Question →'}
                </button>
            </div>
        </div>
    );
}
