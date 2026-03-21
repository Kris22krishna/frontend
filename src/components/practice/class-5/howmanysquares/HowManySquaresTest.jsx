import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HowManySquaresTest.module.css';
import { LatexText } from '@/components/LatexText';
import HowManySquaresReportModal from './HowManySquaresReportModal';
import { Clock, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { CHAPTER_TEST_QUESTIONS } from './Topics/Skills/HowManySquaresSkillsData';

function shufflePool(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

const HowManySquaresTest = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [showReport, setShowReport] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes for 25 questions
    const [startTime] = useState(Date.now());
    const [isPaletteOpen, setIsPaletteOpen] = useState(true);

    const questions = useMemo(() => shufflePool(CHAPTER_TEST_QUESTIONS, 25), []);
    const [answers, setAnswers] = useState(Array(25).fill(null));

    useEffect(() => {
        if (timeLeft <= 0) { handleSubmit(); return; }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSelect = (qIdx, oIdx) => {
        const newAns = [...answers];
        newAns[qIdx] = oIdx;
        setAnswers(newAns);
    };

    const handleSubmit = () => {
        setShowReport(true);
    };

    if (questions.length === 0) return null;

    const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0), 0);
    const completed = answers.filter(a => a !== null).length;

    const q = questions[current];

    return (
        <div className={styles.hms_test_page}>
            <nav className={styles.hms_test_nav}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => navigate('/middle/grade/5/how-many-squares')} className={styles.hms_exit_btn}>← Exit</button>
                    <h1 className={styles.hms_test_title}>Chapter Test: How Many Squares</h1>
                </div>
                <div className={styles.hms_test_timer}>
                    <Clock size={16} /> {formatTime(timeLeft)}
                </div>
            </nav>

            <div className={styles.hms_test_layout}>
                <div className={styles.hms_test_main}>
                    <div className={styles.hms_test_card}>
                        <div className={styles.hms_test_q_header}>
                            <span className={styles.hms_test_q_num}>Question {current + 1} of {questions.length}</span>
                            {answers[current] !== null ? <CheckCircle2 size={18} color="#10b981" /> : <AlertCircle size={18} color="#94a3b8" />}
                        </div>
                        <div className={styles.hms_test_q_text}>
                            <LatexText text={q.question} />
                        </div>
                        <div className={styles.hms_test_options}>
                            {q.options.map((opt, oi) => (
                                <button key={oi} onClick={() => handleSelect(current, oi)}
                                    className={`${styles.hms_test_opt_btn} ${answers[current] === oi ? styles.hms_test_opt_btn_active : ''}`}>
                                    <span className={styles.hms_test_opt_label}>{String.fromCharCode(65 + oi)}</span>
                                    <LatexText text={opt} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                        <button className={styles.hms_exit_btn}
                            onClick={() => setCurrent(c => Math.max(0, c - 1))}
                            disabled={current === 0}
                            style={{ opacity: current === 0 ? 0.5 : 1 }}>
                            <ChevronLeft size={18} /> Previous
                        </button>
                        {current < questions.length - 1 ? (
                            <button className={styles.hms_submit_btn}
                                style={{ width: 'auto', padding: '12px 32px', background: '#4f46e5' }}
                                onClick={() => setCurrent(c => c + 1)}>
                                Next <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button className={styles.hms_submit_btn}
                                style={{ width: 'auto', padding: '12px 32px' }}
                                onClick={handleSubmit}>
                                Submit Test
                            </button>
                        )}
                    </div>
                </div>

                <div className={`${styles.hms_test_sidebar} ${!isPaletteOpen ? styles.hms_sidebar_minimized : ''}`}>
                    <div className={styles.hms_test_summary_card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 className={styles.hms_summary_title} style={{ margin: 0 }}>Test Progress</h3>
                            <button
                                onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                                className={styles.hms_palette_toggle}
                            >
                                {isPaletteOpen ? 'Hide' : 'Show'} Navigator
                            </button>
                        </div>

                        <div className={styles.hms_palette_content} style={{ display: isPaletteOpen ? 'block' : 'none' }}>
                            <div className={styles.hms_summary_stats}>
                                <div className={styles.hms_stat_box}>
                                    <span className={styles.hms_stat_val}>{questions.length}</span>
                                    <span className={styles.hms_stat_lbl}>Total</span>
                                </div>
                                <div className={styles.hms_stat_box}>
                                    <span className={styles.hms_stat_val} style={{ color: '#4f46e5' }}>{completed}</span>
                                    <span className={styles.hms_stat_lbl}>Answered</span>
                                </div>
                            </div>

                            <div className={styles.hms_palette_title}>Question Navigator</div>
                            <div className={styles.hms_q_nav_grid}>
                                {questions.map((_, i) => (
                                    <button key={i} onClick={() => setCurrent(i)}
                                        className={`${styles.hms_q_nav_btn} ${answers[i] !== null ? styles.hms_q_nav_btn_answered : ''}`}
                                        style={{
                                            borderColor: current === i ? '#4f46e5' : '#e2e8f0',
                                            borderWidth: current === i ? '2px' : '1px'
                                        }}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button className={styles.hms_submit_btn} onClick={handleSubmit}>Finish & Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {showReport && (
                <HowManySquaresReportModal
                    isOpen={showReport}
                    stats={{
                        correctAnswers: score,
                        totalQuestions: questions.length,
                        timeTaken: formatTime(Math.floor((Date.now() - startTime) / 1000))
                    }}
                    onClose={() => navigate('/middle/grade/5/how-many-squares')}
                    onRetry={() => window.location.reload()}
                />
            )}
        </div>
    );
};

export default HowManySquaresTest;
