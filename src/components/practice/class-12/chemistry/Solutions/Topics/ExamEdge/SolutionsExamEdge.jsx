import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { solutionsExamEdgeData } from './SolutionsExamEdgeData';
import styles from '../../SolutionsDashboard.module.css';
import MathRenderer from '../../../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { SLUG_TO_NODE_ID } from '@/lib/curriculumIds';

/* ── Main page ───────────────────────────────────── */
export default function SolutionsExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState(solutionsExamEdgeData.exams[0].name);

    const { startSession, abandonSession } = useSessionLogger();
    const nodeId = SLUG_TO_NODE_ID['g12-chem-solutions-exam-edge'];

    useEffect(() => {
        window.scrollTo(0, 0);
        startSession({ nodeId, sessionType: 'practice' });
        return () => abandonSession({ totalQuestions: 1 });
    }, [nodeId, startSession, abandonSession]);

    const exam = solutionsExamEdgeData.exams.find(e => e.name === activeExam);

    return (
        <div className={styles['sol-page']}>
            <nav className={styles['sol-nav']}>
                <button className={styles['sol-nav-back']} onClick={() => navigate('/senior/grade/12/chemistry/solutions')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['sol-nav-links']}>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/introduction')}>🌟 Intro</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/terminology')}>📖 Terminology</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['sol-nav-link']} onClick={() => navigate('/senior/grade/12/chemistry/solutions/connectomics')}>🔗 Connectomics</button>
                    <button className={`${styles['sol-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/12/chemistry/solutions/exam-edge')}>🏆 Exam Edge</button>
                </div>
            </nav>

            <div className={styles['sol-hero']}>
                <h1 className={styles['sol-hero-title']}>Solutions <span className={styles['sol-hero-accent--red']}>Exam Edge</span></h1>
                <p className={styles['sol-hero-sub']}>Strategic insights and high-weightage topics for competitive exams.</p>
            </div>

            <main className={styles['sol-topic-shell']}>
                
                {/* Exam Tabs */}
                <div className={styles['sol-subtabs']}>
                    {solutionsExamEdgeData.exams.map(e => (
                        <button 
                            key={e.name}
                            onClick={() => setActiveExam(e.name)}
                            className={`${styles['sol-nav-link']} ${activeExam === e.name ? styles['active'] : ''}`}
                            style={{ '--skill-color': e.color, '--skill-color-15': e.color + '15' }}
                        >
                            <span>{e.emoji}</span> {e.name}
                        </button>
                    ))}
                </div>

                <div className={`${styles['sol-details-window']} ${styles['sol-exam-details']}`}>
                    
                    {/* Weightage & Frequency */}
                    <div className={styles['sol-grid']} style={{ gap: '20px', marginBottom: '32px' }}>
                        <div className={styles['sol-stat-card']} style={{ '--skill-color': exam.color, '--skill-color-08': exam.color + '08', '--skill-color-20': exam.color + '20' }}>
                            <div className={styles['sol-stat-label']}>Weightage</div>
                            <div className={styles['sol-stat-value']}>{exam.weightage}</div>
                        </div>
                        <div className={styles['sol-stat-card']} style={{ '--skill-color': exam.color, '--skill-color-08': exam.color + '08', '--skill-color-20': exam.color + '20' }}>
                            <div className={styles['sol-stat-label']}>Frequency</div>
                            <div className={styles['sol-stat-value']}>{exam.freq}</div>
                        </div>
                    </div>

                    {/* High Yield Topics */}
                    <div className={styles['sol-high-yield-section']}>
                        <h3 className={styles['sol-section-subhead']}>
                            <Target size={18} color={exam.color} /> High-Yield Topics
                        </h3>
                        <div className={styles['sol-topic-chips']}>
                            {exam.topics.map((t, idx) => (
                                <div key={idx} className={styles['sol-topic-chip']}>
                                    <MathRenderer text={t} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strategy & Pitfalls */}
                    <div className={styles['sol-strategy-pitfall-grid']}>
                        <div>
                            <h3 className={styles['sol-section-subhead']}>
                                <Trophy size={18} color="#f59e0b" /> Winning Strategy
                            </h3>
                            <div className={styles['sol-strategy-box']}>
                                <MathRenderer text={exam.strategy} />
                            </div>
                        </div>
                        <div>
                            <h3 className={styles['sol-section-subhead']}>
                                <AlertTriangle size={18} color="#ef4444" /> Common Pitfalls
                            </h3>
                            <div className={styles['sol-pitfall-list']}>
                                {exam.pitfalls.map((p, idx) => (
                                    <div key={idx} className={styles['sol-pitfall-item']}>
                                        ⚠️ <MathRenderer text={p} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Previous Years Questions (if available) */}
                    {exam.questions && (
                        <div style={{ marginTop: '40px' }}>
                            <h3 className={styles['sol-section-subhead']}>
                                📝 Previous Years Questions
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {exam.questions.map((item, idx) => (
                                    <div key={idx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontWeight: '800', color: '#1e1b4b', marginBottom: '12px', fontSize: '16px' }}>
                                            <span style={{ color: exam.color, marginRight: '8px' }}>Q{idx + 1}.</span>
                                            <MathRenderer text={item.q} inline={false} />
                                        </div>
                                        <div style={{ color: '#475569', fontSize: '15px', lineHeight: '1.8', paddingLeft: '16px', borderLeft: `3px solid ${exam.color}40` }}>
                                            <strong>Answer:</strong> <MathRenderer text={item.a} inline={false} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Pro Tips */}
                <div className={styles['sol-tips-banner']}>
                    <div className={styles['sol-tips-banner-head']}>
                        <Lightbulb size={32} color="#f59e0b" />
                        <h2>Bonus Exam Tips</h2>
                    </div>
                    <div className={styles['sol-tips-grid']}>
                        {solutionsExamEdgeData.proTips.map((tip, idx) => (
                            <div key={idx} className={styles['sol-tip-card']}>
                                <MathRenderer text={tip} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
