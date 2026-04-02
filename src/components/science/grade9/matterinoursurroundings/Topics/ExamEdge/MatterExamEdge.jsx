import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { matterExamEdgeData } from './MatterExamEdgeData';
import styles from '../../MatterInOurSurroundingsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';

export default function MatterExamEdge() {
    const navigate = useNavigate();
    const [activeExam, setActiveExam] = useState(matterExamEdgeData.exams[0].name);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const exam = matterExamEdgeData.exams.find(e => e.name === activeExam);

    return (
        <div className={styles['matter-page']}>
            <nav className={styles['matter-nav']}>
                <button className={styles['matter-nav-back']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['matter-nav-links']}>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/introduction')}>🌟 Intro</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/terminology')}>📖 Terminology</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/core-concepts')}>🎯 Core Concepts</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/connectomics')}>🔗 Connectomics</button>
                    <button className={`${styles['matter-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/exam-edge')}>🏆 Exam Edge</button>
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['matter-hero']}>
                <h1 className={styles['matter-hero-title']}>Matter <span style={{ color: '#ef4444' }}>Exam Edge</span></h1>
                <p className={styles['matter-hero-sub']}>Strategic insights and high-weightage topics for your Grade 9 exams.</p>
            </div>

            <main className={styles['matter-topic-shell']}>
                
                {/* Exam Tabs */}
                <div className={styles['matter-subtabs']}>
                    {matterExamEdgeData.exams.map(e => (
                        <button 
                            key={e.name}
                            onClick={() => setActiveExam(e.name)}
                            className={`${styles['matter-nav-link']} ${activeExam === e.name ? styles['active'] : ''}`}
                            style={{ '--skill-color': e.color, '--skill-color-15': e.color + '15', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: activeExam === e.name ? e.color + '15' : 'transparent', color: activeExam === e.name ? e.color : '#64748b', fontWeight: 700 }}
                        >
                            <span>{e.emoji}</span> {e.name}
                        </button>
                    ))}
                </div>

                <div className={`${styles['matter-details-window']} ${styles['matter-exam-details']}`}>
                    
                    {/* Weightage & Frequency */}
                    <div className={styles['matter-grid']} style={{ gap: '20px', marginBottom: '32px' }}>
                        <div className={styles['matter-stat-card']} style={{ '--skill-color': exam.color, '--skill-color-08': exam.color + '08', '--skill-color-20': exam.color + '20' }}>
                            <div className={styles['matter-stat-label']}>Weightage</div>
                            <div className={styles['matter-stat-value']}>{exam.weightage}</div>
                        </div>
                        <div className={styles['matter-stat-card']} style={{ '--skill-color': exam.color, '--skill-color-08': exam.color + '08', '--skill-color-20': exam.color + '20' }}>
                            <div className={styles['matter-stat-label']}>Frequency</div>
                            <div className={styles['matter-stat-value']}>{exam.freq}</div>
                        </div>
                    </div>

                    {/* High Yield Topics */}
                    <div className={styles['matter-high-yield-section']}>
                        <h3 className={styles['matter-section-subhead']}>
                            <Target size={18} color={exam.color} /> High-Yield Topics
                        </h3>
                        <div className={styles['matter-topic-chips']}>
                            {exam.topics.map((t, idx) => (
                                <div key={idx} className={styles['matter-topic-chip']}>
                                    <MathRenderer text={t} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strategy & Pitfalls */}
                    <div className={styles['matter-strategy-pitfall-grid']}>
                        <div className={styles['matter-strategy-col']}>
                            <h3 className={styles['matter-section-subhead']}>
                                <Trophy size={18} color="#f59e0b" /> Winning Strategy
                            </h3>
                            <div className={styles['matter-strategy-box']}>
                                <MathRenderer text={exam.strategy} />
                            </div>
                        </div>
                        <div className={styles['matter-pitfall-col']}>
                            <h3 className={styles['matter-section-subhead']}>
                                <AlertTriangle size={18} color="#ef4444" /> Common Pitfalls
                            </h3>
                            <div className={styles['matter-pitfall-list']}>
                                {exam.pitfalls.map((p, idx) => (
                                    <div key={idx} className={styles['matter-pitfall-item']}>
                                        ⚠️ <MathRenderer text={p} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Previous Years Questions */}
                    {exam.questions && (
                        <div style={{ marginTop: '40px' }}>
                            <h3 className={styles['matter-section-subhead']}>
                                📝 Sample Questions
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {exam.questions.map((item, idx) => (
                                    <div key={idx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ fontWeight: '800', color: '#1e1b4b', marginBottom: '12px', fontSize: '16px' }}>
                                            <span style={{ color: exam.color, marginRight: '8px' }}>Q{idx + 1}.</span>
                                            <MathRenderer text={item.q} />
                                        </div>
                                        <div style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', paddingLeft: '16px', borderLeft: `3px solid ${exam.color}40` }}>
                                            <strong>Answer:</strong> <MathRenderer text={item.a} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Pro Tips */}
                <div className={styles['matter-tips-banner']}>
                    <div className={styles['matter-tips-banner-head']}>
                        <Lightbulb size={32} color="#f59e0b" />
                        <h2>Bonus Exam Tips</h2>
                    </div>
                    <div className={styles['matter-tips-grid']}>
                        {matterExamEdgeData.proTips.map((tip, idx) => (
                            <div key={idx} className={styles['matter-tip-card']}>
                                <MathRenderer text={tip} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
