import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chemReactionsExamEdgeData } from './ChemReactionsExamEdgeData';
import styles from '../../ChemicalReactionsDashboard.module.css';
import MathRenderer from '../../../../../MathRenderer';
import { Trophy, Target, AlertTriangle, Lightbulb } from 'lucide-react';

/* ── Inline SVG Diagram components ────────────────────────────── */
const ElectrolysisDiagram = () => (
    <div style={{ margin: '24px 0', padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <svg viewBox="0 0 500 550" style={{ width: '100%', maxWidth: '400px', height: 'auto' }}>
            <defs>
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                </linearGradient>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
            </defs>

            {/* Main mug */}
            <path d="M 100,100 L 120,380 C 122,400 140,410 160,410 L 340,410 C 360,410 378,400 380,380 L 400,100" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="250" cy="100" rx="150" ry="20" fill="none" stroke="#94a3b8" strokeWidth="6" />

            {/* Water */}
            <path d="M 103,160 L 122,380 C 124,398 140,407 160,407 L 340,407 C 360,407 376,398 378,380 L 397,160 Z" fill="url(#waterGrad)" />
            <ellipse cx="250" cy="160" rx="147" ry="18" fill="#60a5fa" fillOpacity="0.4" />

            {/* Electrodes (Graphite rods) */}
            {/* Cathode */}
            <rect x="190" y="240" width="24" height="180" rx="4" fill="#334155" />
            {/* Anode */}
            <rect x="286" y="240" width="24" height="180" rx="4" fill="#334155" />

            {/* Rubber stoppers */}
            <path d="M 185,410 L 219,410 L 215,430 L 189,430 Z" fill="#475569" />
            <path d="M 281,410 L 315,410 L 311,430 L 285,430 Z" fill="#475569" />

            {/* Test Tubes */}
            <path d="M 180,110 C 180,95 224,95 224,110 L 224,320 C 224,330 180,330 180,320 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M 276,110 C 276,95 320,95 320,110 L 320,320 C 320,330 276,330 276,320 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />

            {/* Hydrogen Gas Space (Double Volume) */}
            <path d="M 182,110 C 182,100 222,100 222,110 L 222,180 C 222,185 182,185 182,180 Z" fill="#ffffff" fillOpacity="0.9" />
            {/* Oxygen Gas Space (Single Volume) */}
            <path d="M 278,110 C 278,100 318,100 318,110 L 318,140 C 318,145 278,145 278,140 Z" fill="#ffffff" fillOpacity="0.9" />

            {/* Bubbles */}
            {/* Cathode (Hydrogen) */}
            <circle cx="200" cy="230" r="4" fill="#ffffff" />
            <circle cx="210" cy="215" r="5" fill="#ffffff" />
            <circle cx="195" cy="200" r="4" fill="#ffffff" />
            <circle cx="215" cy="190" r="3" fill="#ffffff" />
            
            {/* Anode (Oxygen) */}
            <circle cx="300" cy="220" r="3" fill="#ffffff" />
            <circle cx="295" cy="190" r="4" fill="#ffffff" />
            <circle cx="305" cy="170" r="3" fill="#ffffff" />

            {/* Wires */}
            <path d="M 202,430 L 202,460 L 150,460 L 150,490" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 298,430 L 298,460 L 350,460 L 350,490" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Battery Core */}
            <rect x="130" y="490" width="240" height="50" rx="8" fill="#1e293b" />
            {/* Battery Terminals */}
            <rect x="142" y="480" width="16" height="10" fill="#94a3b8" />
            <rect x="342" y="480" width="16" height="10" fill="#ef4444" />
            
            <text x="250" y="522" fill="#f8fafc" fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="sans-serif, system-ui">6V Battery</text>
            <text x="150" y="475" fill="#1e293b" fontSize="20" fontWeight="bold" fontFamily="sans-serif">-</text>
            <text x="350" y="475" fill="#ef4444" fontSize="20" fontWeight="bold" fontFamily="sans-serif">+</text>

            <g fontFamily="sans-serif, system-ui" fontSize="15" fill="#334155" fontWeight="600">
                <text x="80" y="145">Hydrogen Gas</text>
                <text x="80" y="165" fontSize="13" fill="#64748b">(Double Volume)</text>
                
                <text x="330" y="125">Oxygen Gas</text>
                
                <text x="80" y="280">Cathode (-)</text>
                <text x="330" y="280">Anode (+)</text>
                
                <text x="96" y="320">Water +</text>
                <text x="96" y="340">Dil. H₂SO₄</text>
            </g>
            
            <path d="M 120,285 L 180,285" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 320,285 L 315,285" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
        </svg>
    </div>
);

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

                    {/* Previous Years Questions (if available) */}
                    {exam.questions && (
                        <div style={{ marginTop: '40px' }}>
                            <h3 className={styles['chem-section-subhead']}>
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
                                            {item.diagram === 'electrolysis' && <ElectrolysisDiagram />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
