import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../OurFamiliesShared.module.css';

/* ─── Activities Data ─────────────────────────────────── */
const ACTIVITIES = [
    {
        id: 'plants',
        title: 'Watering the Plants',
        subtitle: 'Helpers: Kids',
        emoji: '🌱',
        color: '#10b981',
        colorLight: '#ecfdf5',
        actionLabel: '🚿 Water Plants',
        desc: 'The garden needs to be watered every evening so the flowers can bloom beautifully.',
        observation: 'The plants look fresh and happy! Bela helps Dadaji in the garden every day.',
    },
    {
        id: 'chopping',
        title: 'Chopping Vegetables',
        subtitle: 'Helpers: Older Kids / Parents',
        emoji: '🥕',
        color: '#f59e0b',
        colorLight: '#fffbeb',
        actionLabel: '🔪 Chop Veggies',
        desc: 'dinner is getting ready, and someone needs to clean and chop the vegetables.',
        observation: 'The vegetables are chopped perfectly! Banku Bhaiya helps parents and grandparents with this chore.',
    },
    {
        id: 'story',
        title: 'Bedtime Stories',
        subtitle: 'Helpers: Grandparents',
        emoji: '📖',
        color: '#8b5cf6',
        colorLight: '#f3e8ff',
        actionLabel: '📚 Read Story',
        desc: 'It is time for bed, and Little Bishu wants to hear a wonderful story.',
        observation: 'Little Bishu is fast asleep. Dadaji and Dadiji love telling stories to the children.',
    },
    {
        id: 'festival',
        title: 'Making Sweets',
        subtitle: 'Helpers: Parents / Mausi',
        emoji: '🍩',
        color: '#ec4899',
        colorLight: '#fdf2f8',
        actionLabel: '🧑‍🍳 Make Sweets',
        desc: 'It is festival time! Special dishes and sweets need to be prepared for the family block.',
        observation: 'Delicious! Kusum Mausi makes the best dishes during the festivals.',
    },
];

/* ─── SVG Lab Scenes ─────────────────────────────────── */
function PlantsScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 280 290" style={{ width: '100%', height: '100%', maxHeight: 310 }}>
            <style>{`
                @keyframes waterDrop {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(40px); opacity: 0; }
                }
                @keyframes plantGrow {
                    0% { transform: scaleY(0.9); }
                    100% { transform: scaleY(1.1); }
                }
            `}</style>
            
            {/* Ground */}
            <rect x="20" y="240" width="240" height="20" fill="#8B4513" rx="4" />
            <rect x="20" y="240" width="240" height="5" fill="#A0522D" rx="2" opacity="0.5" />

            {/* Plant Pot */}
            <path d="M 120 240 L 160 240 L 170 180 L 110 180 Z" fill="#D2691E" stroke="#8B4513" strokeWidth="2" />
            <rect x="105" y="170" width="70" height="10" fill="#CD853F" stroke="#8B4513" strokeWidth="2" rx="2" />

            {/* Stem */}
            <line x1="140" y1="170" x2="140" y2="100" stroke="#228B22" strokeWidth="6" strokeLinecap="round" 
                  style={isDone ? { animation: 'plantGrow 1s forwards', transformOrigin: 'bottom' } : {}} />

            {/* Leaves */}
            <path d="M 140 140 Q 160 120 170 140 Q 150 150 140 140" fill="#32CD32" />
            <path d="M 140 120 Q 120 100 110 120 Q 130 130 140 120" fill="#32CD32" />

            {/* Flower */}
            {(isRunning || isDone) && (
                <g style={{ transform: isDone ? 'scale(1.2)' : 'scale(1)', transformOrigin: '140px 100px', transition: 'transform 0.5s' }}>
                    <circle cx="140" cy="100" r="15" fill="#FF69B4" />
                    <circle cx="140" cy="100" r="8" fill="#FFD700" />
                    {[0, 60, 120, 180, 240, 300].map(angle => (
                        <circle key={angle} cx={140 + Math.cos(angle * Math.PI / 180) * 15} 
                                cy={100 + Math.sin(angle * Math.PI / 180) * 15} r="8" fill="#FF1493" opacity="0.8" />
                    ))}
                </g>
            )}

            {/* Watering Can */}
            {(isRunning || isDone) && (
                <g style={{ transform: isDone ? 'translate(-20px, -20px) rotate(-20deg)' : 'translate(0, 0) rotate(-45deg)', transformOrigin: '200px 80px', transition: 'all 0.5s' }}>
                    <rect x="200" y="60" width="40" height="50" fill="#4682B4" rx="5" />
                    <path d="M 200 85 L 170 65 L 165 75 L 200 95 Z" fill="#5F9EA0" />
                    <path d="M 240 70 Q 260 70 260 90 Q 260 110 240 110" fill="none" stroke="#4682B4" strokeWidth="6" />
                </g>
            )}

            {/* Water Drops */}
            {isRunning && (
                <g>
                    {[0, 1, 2, 3].map(i => (
                        <circle key={i} cx={155 + i * 5} cy={100 + i * 10} r="3" fill="#00BFFF" 
                                style={{ animation: `waterDrop 0.6s ${i * 0.15}s infinite linear` }} />
                    ))}
                </g>
            )}
        </svg>
    );
}

function DefaultScene({ phase, emoji, color }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 260 270" style={{ width: '100%', height: '100%', maxHeight: 300 }}>
            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-30px) scale(1.1); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
            `}</style>
            <rect x="10" y="248" width="240" height="10" fill="#d1d5db" rx="4" />
            
            <g style={{ transformOrigin: '130px 150px', animation: isRunning ? 'bounce 0.6s infinite ease-in-out' : 'none' }}>
                <circle cx="130" cy="150" r="60" fill={`${color}20`} stroke={color} strokeWidth="4" />
                <text x="130" y="175" fontSize="70" textAnchor="middle" 
                      style={{ transformOrigin: '130px 150px', animation: isRunning ? 'spin 2s linear infinite' : 'none' }}
                >
                    {emoji}
                </text>
            </g>

            {isDone && (
                <g>
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <path key={i}
                              d="M 130 50 L 135 70 L 155 75 L 135 80 L 130 100 L 125 80 L 105 75 L 125 70 Z" 
                              fill="#FBBF24"
                              style={{ 
                                  transform: `rotate(${angle}deg) translate(0, -90px)`, 
                                  transformOrigin: '130px 150px',
                                  animation: `sparkle 1s ${i * 0.1}s infinite`
                              }} 
                        />
                    ))}
                    <text x="130" y="235" textAnchor="middle" fill="#16A34A" fontSize="18" fontWeight="bold" fontFamily="Outfit,sans-serif">
                        Job Well Done!
                    </text>
                </g>
            )}
        </svg>
    );
}

const SVG_MAP = { plants: PlantsScene, chopping: DefaultScene, story: DefaultScene, festival: DefaultScene };

/* ─── Main Component ─────────────────────────────────── */
export default function OurFamiliesVirtualLab() {
    const navigate = useNavigate();
    const [activeExp, setActiveExp] = useState(0);
    const [phase, setPhase] = useState('idle'); // idle | running | done

    const exp = ACTIVITIES[activeExp];
    const LabScene = SVG_MAP[exp.id] || DefaultScene;

    const handleExpChange = (idx) => {
        setActiveExp(idx);
        setPhase('idle');
    };
    
    const handleRun = () => {
        setPhase('running');
        setTimeout(() => setPhase('done'), 2000);
    };
    
    const handleReset = () => setPhase('idle');

    return (
        <div className={styles['chem-page']} style={{ minHeight: '100vh', background: '#f8fafc' }}>
            {/* Nav */}
            <nav className={styles['chem-nav']}>
                <button className={styles['chem-nav-back']} onClick={() => navigate('/junior/grade/3/science/our-families-and-communities')}>
                    ← Back to Dashboard
                </button>
                <div className={styles['chem-nav-links']}>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/junior/grade/3/science/our-families-and-communities/introduction')}>🌟 Intro</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/junior/grade/3/science/our-families-and-communities/terminology')}>📖 Terminology</button>
                    <button className={styles['chem-nav-link']} onClick={() => navigate('/junior/grade/3/science/our-families-and-communities/skills')}>🎯 Skills</button>
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`} onClick={() => navigate('/junior/grade/3/science/our-families-and-communities/virtual-lab')}>🧪 Virtual Lab</button>
                </div>
            </nav>

            {/* Hero */}
            <div className={styles['chem-lab-hero']} style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)', padding: '60px 24px', textAlign: 'center', color: '#fff' }}>
                <div className={styles['chem-lab-hero-content']} style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: 100, fontSize: 13, fontWeight: 800, letterSpacing: 1.5, marginBottom: 20 }}>
                        🏠 FAMILY ACTIVITY
                    </div>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1 }}>
                        Interactive <span style={{ color: '#fef08a' }}>Chore</span> Simulation
                    </h1>
                    <p style={{ fontSize: 18, opacity: 0.9, lineHeight: 1.6 }}>
                        Pick an activity, assign it to a family member, and observe the happy results live!
                    </p>
                </div>
            </div>

            <div className={styles['chem-lab-container']} style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'revert', gap: 32 }} className={styles['chem-lab-split'] || "lab-override"}>
                    
                    <style>{`
                        @media (min-width: 900px) {
                            .lab-override { grid-template-columns: 300px 1fr !important; }
                        }
                    `}</style>

                    {/* Left: Picker */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {ACTIVITIES.map((e, idx) => (
                            <button key={e.id} onClick={() => handleExpChange(idx)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 16,
                                    padding: '16px 20px', borderRadius: 16,
                                    background: activeExp === idx ? e.color : '#fff',
                                    color: activeExp === idx ? '#fff' : '#1e293b',
                                    border: `2px solid ${activeExp === idx ? e.color : '#e2e8f0'}`,
                                    cursor: 'pointer', textAlign: 'left',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: activeExp === idx ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: activeExp === idx ? `0 10px 25px ${e.color}30` : 'none'
                                }}
                            >
                                <div style={{ fontSize: 28 }}>{e.emoji}</div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{e.title}</div>
                                    <div style={{ fontSize: 12, opacity: activeExp === idx ? 0.9 : 0.6, fontWeight: 600 }}>{e.subtitle}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right: Main Lab Stage */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 24 }} className={styles['chem-lab-stage'] || "stage-override"}>
                        
                        <style>{`
                            @media (max-width: 1100px) {
                                .stage-override { grid-template-columns: 1fr !important; }
                            }
                        `}</style>
                        
                        {/* Center: Details & Observation */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {/* Card Info */}
                            <div style={{ background: '#fff', padding: 32, borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 900, color: exp.color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12, background: `${exp.color}15`, padding: '6px 12px', borderRadius: 8 }}>
                                    ACTIVITY
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>{exp.title}</h2>
                                <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, margin: 0 }}>{exp.desc}</p>
                            </div>

                            {/* Result log */}
                            {phase === 'done' ? (
                                <div style={{ background: `linear-gradient(135deg, ${exp.colorLight}, #fff)`, padding: 32, borderRadius: 24, border: `2px solid ${exp.color}40`, boxShadow: `0 10px 30px ${exp.color}15`, animation: 'slideUp 0.4s ease-out' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                        <div style={{ width: 32, height: 32, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                            ✅
                                        </div>
                                        <div style={{ fontSize: 15, fontWeight: 800, color: exp.color, textTransform: 'uppercase', letterSpacing: 1 }}>Job Completed</div>
                                    </div>
                                    <p style={{ fontSize: 18, color: '#1e293b', lineHeight: 1.6, margin: 0, fontWeight: 600 }}>{exp.observation}</p>
                                </div>
                            ) : (
                                <div style={{ background: '#f8fafc', padding: 32, borderRadius: 24, border: '2px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 180 }}>
                                    <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.5 }}>⏳</div>
                                    <p style={{ color: '#64748b', fontSize: 15, fontWeight: 600, margin: 0 }}>
                                        Click <strong style={{ color: exp.color }}>{exp.actionLabel}</strong> to perform the chore!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Right: SVG Scene */}
                        <div style={{ background: '#fff', borderRadius: 24, border: `4px solid ${phase === 'running' ? exp.color : '#e2e8f0'}`, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s' }}>
                            <div style={{ background: '#f1f5f9', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #e2e8f0' }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                                <span style={{ marginLeft: 10, fontSize: 12, fontWeight: 700, color: '#64748b' }}>Simulation View</span>
                            </div>
                            
                            <div style={{ flex: 1, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', background: phase === 'running' ? exp.colorLight : '#fafafa' }}>
                                <LabScene phase={phase} emoji={exp.emoji} color={exp.color} />
                            </div>

                            <div style={{ padding: 24, background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                                {phase === 'idle' && (
                                    <button onClick={handleRun} style={{ width: '100%', padding: '14px', background: exp.color, color: '#fff', fontSize: 16, fontWeight: 800, border: 'none', borderRadius: 12, cursor: 'pointer', boxShadow: `0 4px 15px ${exp.color}40`, transition: 'all 0.2s' }}>
                                        {exp.actionLabel}
                                    </button>
                                )}
                                {phase === 'running' && (
                                    <button disabled style={{ width: '100%', padding: '14px', background: '#fef3c7', color: '#d97706', fontSize: 16, fontWeight: 800, border: '2px solid #fde68a', borderRadius: 12, cursor: 'not-allowed' }}>
                                        ⏳ Doing chore...
                                    </button>
                                )}
                                {phase === 'done' && (
                                    <button onClick={handleReset} style={{ width: '100%', padding: '14px', background: '#f1f5f9', color: '#475569', fontSize: 16, fontWeight: 800, border: '2px solid #cbd5e1', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                                        🔄 Reset Activity
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
