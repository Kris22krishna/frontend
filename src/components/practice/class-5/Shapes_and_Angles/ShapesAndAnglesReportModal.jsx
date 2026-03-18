import React from 'react';
import styles from './ShapesTest.module.css';
import { LatexText } from '@/components/LatexText';
import { Trophy, Home, RotateCcw } from 'lucide-react';

export default function ShapesAndAnglesReportModal({ score, total, timeTaken, onClose, onRetry }) {
    const pct = Math.round((score / total) * 100);
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className={styles.sa_modal_overlay}>
            <div className={styles.sa_modal_content}>
                <div className={styles.sa_modal_badge}>
                    <Trophy color="#22c55e" size={40} />
                </div>
                <h2 className={styles.sa_modal_title}>Test Completed!</h2>
                <p className={styles.sa_modal_subtitle}>Excellent effort! Here's how you performed in the Shapes & Angles chapter test.</p>

                <div className={styles.sa_results_grid}>
                    <div className={styles.sa_res_box}>
                        <span className={styles.sa_res_val}>{score}/{total}</span>
                        <span className={styles.sa_res_lbl}>Score</span>
                    </div>
                    <div className={styles.sa_res_box}>
                        <span className={styles.sa_res_val}>{pct}%</span>
                        <span className={styles.sa_res_lbl}>Accuracy</span>
                    </div>
                    <div className={styles.sa_res_box}>
                        <span className={styles.sa_res_val}>{formatTime(timeTaken)}</span>
                        <span className={styles.sa_res_lbl}>Duration</span>
                    </div>
                </div>

                <div className={styles.sa_modal_footer}>
                    <button onClick={onRetry} className={styles.sa_modal_btn_secondary} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <RotateCcw size={18} /> Retry Test
                    </button>
                    <button onClick={onClose} className={styles.sa_modal_btn_primary} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <Home size={18} /> Finish Chapter
                    </button>
                </div>
            </div>
        </div>
    );
}
