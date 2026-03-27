import React from 'react';
import styles from './BeMyMultipleTest.module.css';
import { Trophy, RotateCcw, Home } from 'lucide-react';

export default function BeMyMultipleReportModal({ isOpen, stats, onClose, onRetry }) {
    if (!isOpen) return null;

    const { correctAnswers, totalQuestions, timeTaken } = stats;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <div className={styles.ft_modal_overlay}>
            <div className={styles.ft_modal_content}>
                <div className={styles.ft_modal_badge}>
                    <Trophy color="#6366f1" size={40} />
                </div>
                <h2 className={styles.ft_modal_title}>Test Completed!</h2>
                <p className={styles.ft_modal_subtitle}>
                    Excellent effort! Here's how you performed in the Be My Multiple, I'll be Your Factor chapter test.
                </p>

                <div className={styles.ft_results_grid}>
                    <div className={styles.ft_res_box}>
                        <span className={styles.ft_res_val}>{correctAnswers}/{totalQuestions}</span>
                        <span className={styles.ft_res_lbl}>Score</span>
                    </div>
                    <div className={styles.ft_res_box}>
                        <span className={styles.ft_res_val}>{accuracy}%</span>
                        <span className={styles.ft_res_lbl}>Accuracy</span>
                    </div>
                    <div className={styles.ft_res_box}>
                        <span className={styles.ft_res_val}>{timeTaken}</span>
                        <span className={styles.ft_res_lbl}>Duration</span>
                    </div>
                </div>

                <div className={styles.ft_modal_footer}>
                    <button onClick={onRetry} className={styles.ft_modal_btn_secondary} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <RotateCcw size={18} /> Retry Test
                    </button>
                    <button onClick={onClose} className={styles.ft_modal_btn_primary} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Home size={18} /> Finish Chapter
                    </button>
                </div>
            </div>
        </div>
    );
}
