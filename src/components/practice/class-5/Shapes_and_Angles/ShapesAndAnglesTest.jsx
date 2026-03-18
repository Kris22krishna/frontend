import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShapesTest.module.css';
import { LatexText } from '@/components/LatexText';
import ShapesAndAnglesReportModal from './ShapesAndAnglesReportModal';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { CHAPTER_TEST_QUESTIONS } from './Topics/Skills/ShapesSkillsData';

export default function ShapesAndAnglesTest() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(CHAPTER_TEST_QUESTIONS.length).fill(null));
    const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
    const [showReport, setShowReport] = useState(false);
    const [startTime] = useState(Date.now());
    const [isPaletteOpen, setIsPaletteOpen] = useState(true);

    const questions = CHAPTER_TEST_QUESTIONS;

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

    const handleSelect = (idx) => {
        const newAns = [...answers];
        newAns[current] = idx;
        setAnswers(newAns);
    };

    const handleSubmit = () => {
        setShowReport(true);
    };

    const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0), 0);
    const completed = answers.filter(a => a !== null).length;
    const q = questions[current];

    return (
        <div className={styles.sa_test_page}>
            <nav className={styles.sa_test_nav}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => navigate('/shapes-and-angles')} className={styles.sa_exit_btn}>← Exit</button>
                    <h1 className={styles.sa_test_title}>Chapter Test: Shapes & Angles</h1>
                </div>
                <div className={styles.sa_test_timer}>
                    <Clock size={16} /> {formatTime(timeLeft)}
                </div>
            </nav>

            <div className={styles.sa_test_layout}>
                <div className={styles.sa_test_main}>
                    <div className={styles.sa_test_card}>
                        <div className={styles.sa_test_q_header}>
                            <span className={styles.sa_test_q_num}>Question {current + 1} of {questions.length}</span>
                        </div>
                        <div className={styles.sa_test_q_text}>
                            <LatexText text={q.question} />
                        </div>
                        <div className={styles.sa_test_options}>
                            {q.options.map((opt, i) => (
                                <button key={i} onClick={() => handleSelect(i)}
                                    className={`${styles.sa_test_opt_btn} ${answers[current] === i ? styles.sa_test_opt_btn_active : ''}`}>
                                    <span className={styles.sa_test_opt_label}>{String.fromCharCode(65 + i)}</span>
                                    <LatexText text={opt} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.sa_test_nav_btns}>
                        <button className={styles.sa_nav_prev} disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>
                            &lt; Previous
                        </button>
                        {current === questions.length - 1 ? (
                            <button className={styles.sa_nav_submit} onClick={handleSubmit}>Finish & Submit</button>
                        ) : (
                            <button className={styles.sa_nav_next} onClick={() => setCurrent(c => c + 1)}>
                                Next &gt;
                            </button>
                        )}
                    </div>
                </div>

                <div className={`${styles.sa_test_sidebar} ${!isPaletteOpen ? styles.sa_sidebar_minimized : ''}`}>
                    <div className={styles.sa_test_summary_card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 className={styles.sa_summary_title} style={{ margin: 0 }}>Test Progress</h3>
                            <button onClick={() => setIsPaletteOpen(!isPaletteOpen)} className={styles.sa_palette_toggle}>
                                {isPaletteOpen ? 'Hide' : 'Show'} Navigator
                            </button>
                        </div>

                        <div className={styles.sa_palette_content} style={{ display: isPaletteOpen ? 'block' : 'none' }}>
                            <div className={styles.sa_summary_stats}>
                                <div className={styles.sa_stat_box}>
                                    <span className={styles.sa_stat_val}>{questions.length}</span>
                                    <span className={styles.sa_stat_lbl}>Total</span>
                                </div>
                                <div className={styles.sa_stat_box}>
                                    <span className={styles.sa_stat_val} style={{ color: '#6366f1' }}>{completed}</span>
                                    <span className={styles.sa_stat_lbl}>Answered</span>
                                </div>
                            </div>

                            <div className={styles.sa_palette_title}>Question Navigator</div>
                            <div className={styles.sa_q_nav_grid}>
                                {questions.map((_, i) => (
                                    <button key={i} onClick={() => setCurrent(i)}
                                        className={`${styles.sa_q_nav_btn} ${answers[i] !== null ? styles.sa_q_nav_btn_answered : ''}`}
                                        style={{
                                            borderColor: current === i ? '#6366f1' : '#e2e8f0',
                                            borderWidth: current === i ? '2px' : '1px'
                                        }}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button className={styles.sa_submit_btn} onClick={handleSubmit}>Finish & Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {showReport && (
                <ShapesAndAnglesReportModal
                    score={score}
                    total={questions.length}
                    timeTaken={Math.floor((Date.now() - startTime) / 1000)}
                    onClose={() => navigate('/shapes-and-angles')}
                    onRetry={() => window.location.reload()}
                />
            )}
        </div>
    );
}
