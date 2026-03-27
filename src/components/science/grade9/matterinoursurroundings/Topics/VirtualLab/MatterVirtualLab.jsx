import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { matterVirtualLabData } from './MatterVirtualLabData';
import styles from '../../MatterInOurSurroundingsDashboard.module.css';
import { 
    DissolveScene, 
    MotionScene, 
    CompressScene, 
    SublimeScene 
} from './MatterVirtualLabScenes';

const SCENE_MAP = {
    dissolve: DissolveScene,
    motion: MotionScene,
    compress: CompressScene,
    sublime: SublimeScene
};

export default function MatterVirtualLab() {
    const navigate = useNavigate();
    const [activeIdx, setActiveIdx] = useState(0);
    const [phase, setPhase] = useState('idle'); // idle | running | done

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const activity = matterVirtualLabData.activities[activeIdx];
    const LabScene = SCENE_MAP[activity.demoId];

    const handleActChange = (idx) => {
        setActiveIdx(idx);
        setPhase('idle');
    };

    const handleRun = () => {
        setPhase('running');
        // Most animations take 2-3 seconds to reach "done" state conceptually
        setTimeout(() => setPhase('done'), 2500);
    };

    const handleReset = () => setPhase('idle');

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
                    <button className={styles['matter-nav-link']} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/exam-edge')}>🏆 Exam Edge</button>
                    <button className={`${styles['matter-nav-link']} ${styles['active']}`} onClick={() => navigate('/senior/grade/9/science/matter-in-our-surroundings/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            <div className={styles['matter-lab-hero']}>
                <h1 className={styles['matter-lab-hero-title']}>Interactive <span style={{ color: '#5eead4' }}>Virtual Lab</span></h1>
                <p className={styles['matter-lab-hero-sub']}>Observe matter in action through digital experiments and real-time animations.</p>
            </div>

            <div className={styles['matter-lab-container']}>
                
                {/* 1. Experiment Sidebar */}
                <aside className={styles['matter-lab-picker']}>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Activities</div>
                    {matterVirtualLabData.activities.map((act, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleActChange(idx)}
                            className={`${styles['matter-lab-picker-btn']} ${activeIdx === idx ? styles['active'] : ''}`}
                        >
                            <div className={styles['matter-lab-picker-emoji']}>
                                {act.demoId === 'dissolve' ? '🧂' : act.demoId === 'motion' ? '🕯️' : act.demoId === 'compress' ? '🖐️' : '🔥'}
                            </div>
                            <div>
                                <div className={styles['matter-lab-picker-sub']}>Activity {act.id}</div>
                                <div className={styles['matter-lab-picker-title']}>{act.title}</div>
                            </div>
                        </button>
                    ))}
                </aside>

                {/* 2. Main Lab Stage */}
                <div className={styles['matter-lab-stage']}>
                    
                    {/* LEFT PANEL: Info & Observation */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Experiment Info */}
                        <div className={styles['matter-card-exp']}>
                            <div className={styles['matter-card-exp-badge']}>Lab Activity</div>
                            <h2 className={styles['matter-card-exp-title']}>{activity.title}</h2>
                            <p className={styles['matter-card-exp-desc']}>{activity.aim}</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Procedure</div>
                                {activity.procedure.map((step, sIdx) => (
                                    <div key={sIdx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '20px', height: '20px', background: '#f1f5f9', color: '#64748b', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900, flexShrink: 0 }}>{sIdx+1}</div>
                                        <p style={{ fontSize: '14px', color: '#475569', margin: 0, lineHeight: 1.5 }}>{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Observation/Inference Panel */}
                        <div className={styles['matter-card-obs']}>
                            {phase === 'done' ? (
                                <div style={{ animation: 'matterFadeIn 0.5s ease' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#0d9488' }}>
                                        <div style={{ background: '#f0fdfa', padding: '6px', borderRadius: '8px' }}>✅</div>
                                        <strong style={{ fontSize: '14px', textTransform: 'uppercase' }}>Observations Recorded</strong>
                                    </div>
                                    <p style={{ fontSize: '15px', color: '#1e293b', lineHeight: 1.6, marginBottom: '20px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        {activity.observation}
                                    </p>
                                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0d9488', marginBottom: '8px', textTransform: 'uppercase' }}>Science Inference</div>
                                        <p style={{ fontSize: '14px', color: '#0f766e', fontWeight: 600, margin: 0 }}>{activity.inference}</p>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔬</div>
                                    <p style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600, maxWidth: '240px', margin: '0 auto' }}>
                                        Click <strong>{activity.actionLabel}</strong> to perform the activity and record scientific observations.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: The Animation */}
                    <div className={styles['matter-card-scene']}>
                        <div className={styles['matter-card-scene-titlebar']}>
                            <div className={`${styles['matter-card-scene-title-circle']}`} style={{ background: '#ff5f56' }} />
                            <div className={`${styles['matter-card-scene-title-circle']}`} style={{ background: '#ffbd2e' }} />
                            <div className={`${styles['matter-card-scene-title-circle']}`} style={{ background: '#27c93f' }} />
                            <span className={styles['matter-card-scene-title-text']}>activity_{activity.demoId}.exe</span>
                        </div>
                        
                        <div className={styles['matter-card-scene-canvas']}>
                            <LabScene phase={phase} />
                        </div>

                        <div className={styles['matter-card-scene-controls']}>
                            {phase === 'idle' && (
                                <button onClick={handleRun} className={`${styles['matter-btn-lab-action']} ${styles['run']}`}>
                                    {activity.actionLabel}
                                </button>
                            )}
                            {phase === 'running' && (
                                <button disabled className={`${styles['matter-btn-lab-action']} ${styles['reset']}`} style={{ opacity: 0.7, cursor: 'not-allowed' }}>
                                    🧪 Experiment in Progress...
                                </button>
                            )}
                            {phase === 'done' && (
                                <button onClick={handleReset} className={`${styles['matter-btn-lab-action']} ${styles['reset']}`}>
                                    🔄 Reset Experiment
                                </button>
                            )}
                            <button onClick={handleReset} className={styles['matter-btn-lab-icon']} title="Reset Activity">
                                ↺
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
