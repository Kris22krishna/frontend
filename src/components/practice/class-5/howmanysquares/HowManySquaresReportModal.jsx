import React from 'react';
import styles from './HowManySquaresTest.module.css';
import { Trophy, RotateCcw, Home } from 'lucide-react';

export default function HowManySquaresReportModal({ isOpen, stats, onClose, onRetry }) {
    if (!isOpen) return null;

    const { correctAnswers, totalQuestions, timeTaken } = stats;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <div className={styles.hms_modal_overlay}>
            <div className={styles.hms_modal_content}>
                <div className={styles.hms_modal_badge}>
                    <Trophy color="#22c55e" size={40} />
                </div>
                <h2 className={styles.hms_modal_title}>Test Completed!</h2>
                <p className={styles.hms_modal_subtitle}>
                    Excellent effort! Here's how you performed in the How Many Squares chapter test.
                </p>

                <div className={styles.hms_results_grid}>
                    <div className={styles.hms_res_box}>
                        <span className={styles.hms_res_val}>{correctAnswers}/{totalQuestions}</span>
                        <span className={styles.hms_res_lbl}>Score</span>
                    </div>
                    <div className={styles.hms_res_box}>
                        <span className={styles.hms_res_val}>{accuracy}%</span>
                        <span className={styles.hms_res_lbl}>Accuracy</span>
                    </div>
                    <div className={styles.hms_res_box}>
                        <span className={styles.hms_res_val}>{timeTaken}</span>
                        <span className={styles.hms_res_lbl}>Duration</span>
                    </div>
                </div>

                <div className={styles.hms_modal_footer}>
                    <button onClick={onRetry} className={styles.hms_modal_btn_secondary} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <RotateCcw size={18} /> Retry Test
                    </button>
                    <button onClick={onClose} className={styles.hms_modal_btn_primary} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Home size={18} /> Finish Chapter
                    </button>
                </div>
            </div>
        </div>
    );
}
