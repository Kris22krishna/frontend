import React from 'react';
import styles from './DoesItLookSameTest.module.css';
import { Trophy, RotateCcw, Home } from 'lucide-react';

export default function DoesItLookSameReportModal({ isOpen, stats, onClose, onRetry }) {
    if (!isOpen) return null;

    const { correctAnswers, totalQuestions, timeTaken } = stats;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        <div className={styles.dils_modal_overlay}>
            <div className={styles.dils_modal_content}>
                <div className={styles.dils_modal_badge}>
                    <Trophy color="#22c55e" size={40} />
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Test Completed!</h2>
                <p style={{ color: '#64748b', marginBottom: 40 }}>
                    Excellent effort! Here's how you performed in the Does it Look the Same? chapter test.
                </p>

                <div className={styles.dils_results_grid}>
                    <div className={styles.dils_res_box}>
                        <span className={styles.dils_res_val}>{correctAnswers}/{totalQuestions}</span>
                        <span className={styles.dils_res_lbl}>Score</span>
                    </div>
                    <div className={styles.dils_res_box}>
                        <span className={styles.dils_res_val}>{accuracy}%</span>
                        <span className={styles.dils_res_lbl}>Accuracy</span>
                    </div>
                    <div className={styles.dils_res_box}>
                        <span className={styles.dils_res_val}>{timeTaken}</span>
                        <span className={styles.dils_res_lbl}>Duration</span>
                    </div>
                </div>

                <div className={styles.dils_modal_footer}>
                    <button onClick={onRetry} className={styles.dils_btn_secondary} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <RotateCcw size={18} /> Retry Test
                    </button>
                    <button onClick={onClose} className={styles.dils_btn_primary} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Home size={18} /> Finish Chapter
                    </button>
                </div>
            </div>
        </div>
    );
}
