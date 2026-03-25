import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chemReactionsExamEdgeData } from './ChemReactionsExamEdgeData';
import styles from '../../ChemicalReactionsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';

/* ── Main page ───────────────────────────────────── */
export default function ChemReactionsExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState(chemReactionsExamEdgeData.exams[0].name);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const exam = chemReactionsExamEdgeData.exams.find(e => e.name === activeExam);

    return (
        <div className={styles['chem-page']}>
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/introduction')}>🌟 Intro</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/connectomics')}>🔗 Connectomics</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/senior/grade/10/science/chemical-reactions/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['chem-hero']}>
                <h1 className={styles['chem-hero-title']}>Chemical Reactions <span className={styles['chem-hero-accent--red']}>Exam Edge</span></h1>
                <p className={styles['chem-hero-sub']}>Strategic insights and high-weightage topics for competitive exams.</p>
            </div>

            <main className={styles['chem-topic-shell']}>
                
                {/* Exam Tabs */}
                <div className={styles['chem-subtabs']}>
                    {chemReactionsExamEdgeData.exams.map(e => (
                        <button 
                            key={e.name}
                            onClick={() => setActiveExam(e.name)}
                            className={`${styles['chem-nav-link']} ${activeExam === e.name ? styles['active'] : ''}`}
                            style={{ '--skill-color': e.color, '--skill-color-15': e.color + '15' }}
                        >
                            <span>{e.emoji}</span> {e.name}
                        </button>
                    ))}
                </div>

                <div className={`${styles['chem-details-window']} ${styles['chem-exam-details']}`}>
                    
                    {/* Weightage & Frequency */}
                    <div className={styles['chem-grid']} style={{ gap: '20px', marginBottom: '32px' }}>
                        <div className={styles['chem-stat-card']} style={{ '--skill-color': exam.color, '--skill-color-08': exam.color + '08', '--skill-color-20': exam.color + '20' }}>
                            <div className={styles['chem-stat-label']}>Weightage</div>
                            <div className={styles['chem-stat-value']}>{exam.weightage}</div>
                        </div>
                        <div className={styles['chem-stat-card']} style={{ '--skill-color': exam.color, '--skill-color-08': exam.color + '08', '--skill-color-20': exam.color + '20' }}>
                            <div className={styles['chem-stat-label']}>Frequency</div>
                            <div className={styles['chem-stat-value']}>{exam.freq}</div>
                        </div>
                    </div>

                    {/* High Yield Topics */}
                    <div className={styles['chem-high-yield-section']}>
                        <h3 className={styles['chem-section-subhead']}>
                            <Target size={18} color={exam.color} /> High-Yield Topics
                        </h3>
                        <div className={styles['chem-topic-chips']}>
                            {exam.topics.map((t, idx) => (
                                <div key={idx} className={styles['chem-topic-chip']}>
                                    <MathRenderer text={t} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strategy & Pitfalls */}
                    <div className={styles['chem-strategy-pitfall-grid']}>
                        <div>
                            <h3 className={styles['chem-section-subhead']}>
                                <Trophy size={18} color="#f59e0b" /> Winning Strategy
                            </h3>
                            <div className={styles['chem-strategy-box']}>
                                <MathRenderer text={exam.strategy} />
                            </div>
                        </div>
                        <div>
                            <h3 className={styles['chem-section-subhead']}>
                                <AlertTriangle size={18} color="#ef4444" /> Common Pitfalls
                            </h3>
                            <div className={styles['chem-pitfall-list']}>
                                {exam.pitfalls.map((p, idx) => (
                                    <div key={idx} className={styles['chem-pitfall-item']}>
                                        ⚠️ <MathRenderer text={p} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pro Tips */}
                <div className={styles['chem-tips-banner']}>
                    <div className={styles['chem-tips-banner-head']}>
                        <Lightbulb size={32} color="#f59e0b" />
                        <h2>Bonus Exam Tips</h2>
                    </div>
                    <div className={styles['chem-tips-grid']}>
                        {chemReactionsExamEdgeData.proTips.map((tip, idx) => (
                            <div key={idx} className={styles['chem-tip-card']}>
                                <MathRenderer text={tip} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
