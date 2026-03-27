import React, { useState, useEffect, useCallback } from 'react';
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
        actionLabel: '🔪 Start Chopping',
        desc: 'Dinner is getting ready, and someone needs to wash and chop the vegetables!',
        observation: 'The vegetables are chopped perfectly! Banku Bhaiya helps parents and grandparents with this chore.',
    },
    {
        id: 'story',
        title: 'Bedtime Stories',
        subtitle: 'Helpers: Grandparents',
        emoji: '📖',
        color: '#8b5cf6',
        colorLight: '#f3e8ff',
        actionLabel: '📚 Begin Story',
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
        actionLabel: '🧑‍🍳 Start Cooking',
        desc: 'It is festival time! Special dishes and sweets need to be prepared for the family.',
        observation: 'Delicious! Kusum Mausi makes the best dishes during festivals.',
    },
];

/* ─── Helper ──────────────────────────────────────────── */
function ProgressBar({ value, color }) {
    return (
        <div style={{ width: '100%', height: 12, background: '#e2e8f0', borderRadius: 100, overflow: 'hidden', margin: '8px 0' }}>
            <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 100, transition: 'width 0.4s ease' }} />
        </div>
    );
}

/* ─── SCENE 1: Plants (unchanged — already good) ───────── */
function PlantsScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';
    return (
        <svg viewBox="0 0 280 290" style={{ width: '100%', height: '100%', maxHeight: 310 }}>
            <style>{`
                @keyframes waterDrop { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(40px); opacity: 0; } }
                @keyframes plantGrow { 0% { transform: scaleY(0.9); } 100% { transform: scaleY(1.1); } }
            `}</style>
            <rect x="20" y="240" width="240" height="20" fill="#8B4513" rx="4" />
            <path d="M 120 240 L 160 240 L 170 180 L 110 180 Z" fill="#D2691E" stroke="#8B4513" strokeWidth="2" />
            <rect x="105" y="170" width="70" height="10" fill="#CD853F" stroke="#8B4513" strokeWidth="2" rx="2" />
            <line x1="140" y1="170" x2="140" y2="100" stroke="#228B22" strokeWidth="6" strokeLinecap="round" style={isDone ? { animation: 'plantGrow 1s forwards', transformOrigin: 'bottom' } : {}} />
            <path d="M 140 140 Q 160 120 170 140 Q 150 150 140 140" fill="#32CD32" />
            <path d="M 140 120 Q 120 100 110 120 Q 130 130 140 120" fill="#32CD32" />
            {(isRunning || isDone) && (
                <g style={{ transform: isDone ? 'scale(1.2)' : 'scale(1)', transformOrigin: '140px 100px', transition: 'transform 0.5s' }}>
                    <circle cx="140" cy="100" r="15" fill="#FF69B4" />
                    <circle cx="140" cy="100" r="8" fill="#FFD700" />
                    {[0, 60, 120, 180, 240, 300].map(angle => (
                        <circle key={angle} cx={140 + Math.cos(angle * Math.PI / 180) * 15} cy={100 + Math.sin(angle * Math.PI / 180) * 15} r="8" fill="#FF1493" opacity="0.8" />
                    ))}
                </g>
            )}
            {(isRunning || isDone) && (
                <g style={{ transform: isDone ? 'translate(-20px, -20px) rotate(-20deg)' : 'translate(0, 0) rotate(-45deg)', transformOrigin: '200px 80px', transition: 'all 0.5s' }}>
                    <rect x="200" y="60" width="40" height="50" fill="#4682B4" rx="5" />
                    <path d="M 200 85 L 170 65 L 165 75 L 200 95 Z" fill="#5F9EA0" />
                    <path d="M 240 70 Q 260 70 260 90 Q 260 110 240 110" fill="none" stroke="#4682B4" strokeWidth="6" />
                </g>
            )}
            {isRunning && (
                <g>{[0, 1, 2, 3].map(i => (<circle key={i} cx={155 + i * 5} cy={100 + i * 10} r="3" fill="#00BFFF" style={{ animation: `waterDrop 0.6s ${i * 0.15}s infinite linear` }} />))}</g>
            )}
        </svg>
    );
}

/* ─── SCENE 2: Chopping Vegetables (step-by-step interactive) ─ */
const CHOP_STEPS = [
    { label: 'Wash the vegetables 🚿', hint: 'Click to wash them!', emoji: '🥕🥦🍅', bg: '#bfdbfe', color: '#1d4ed8' },
    { label: 'Peel the carrots 🧅', hint: 'Click to peel!', emoji: '🥕', bg: '#fef3c7', color: '#d97706' },
    { label: 'Chop the vegetables 🔪', hint: 'Click to chop!', emoji: '🥕✂️', bg: '#fee2e2', color: '#b91c1c' },
    { label: 'Put into the bowl 🥣', hint: 'Click to put in bowl!', emoji: '🥗', bg: '#d1fae5', color: '#047857' },
];

function ChoppingScene({ phase }) {
    const [step, setStep] = useState(0);
    const [chopped, setChopped] = useState(0);
    const totalVeggies = 6;

    useEffect(() => { setStep(0); setChopped(0); }, [phase]);

    if (phase === 'idle') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: 0.5 }}>
                <div style={{ fontSize: 64 }}>🥕🥦🍅</div>
                <p style={{ color: '#64748b', fontWeight: 600 }}>Click "Start Chopping" to begin!</p>
            </div>
        );
    }

    if (step < CHOP_STEPS.length) {
        const s = CHOP_STEPS[step];
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
                <div style={{ background: '#e2e8f0', borderRadius: 100, display: 'flex', gap: 8, padding: '6px 16px' }}>
                    {CHOP_STEPS.map((_, i) => (
                        <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i <= step ? '#f59e0b' : '#cbd5e1', transition: 'background 0.3s' }} />
                    ))}
                </div>
                <div style={{ fontSize: 64, cursor: 'pointer', transition: 'transform 0.1s', userSelect: 'none' }}
                    onClick={() => { if (step === 2) setChopped(c => Math.min(c + 1, totalVeggies)); }}
                >
                    {s.emoji}
                </div>
                <p style={{ fontWeight: 800, fontSize: 18, color: s.color, margin: 0 }}>{s.label}</p>

                {step === 2 ? (
                    <div style={{ width: '100%', maxWidth: 240 }}>
                        <ProgressBar value={(chopped / totalVeggies) * 100} color="#f59e0b" />
                        <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>Chopped {chopped}/{totalVeggies}</p>
                        {chopped === totalVeggies && (
                            <button onClick={() => setStep(s => s + 1)} style={{ marginTop: 12, padding: '10px 24px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer' }}>
                                Next → Put in Bowl
                            </button>
                        )}
                    </div>
                ) : (
                    <button onClick={() => setStep(s => s + 1)} style={{ padding: '10px 24px', background: s.color, color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer' }}>
                        {s.hint}
                    </button>
                )}
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 80 }}>🥗</div>
            <p style={{ fontSize: 22, fontWeight: 900, color: '#059669' }}>Vegetables ready! 🎉</p>
            <p style={{ color: '#64748b', fontSize: 15 }}>Great teamwork! Dinner is almost ready.</p>
        </div>
    );
}

/* ─── SCENE 3: Bedtime Story (interactive story pages) ─── */
const STORY_PAGES = [
    { bg: '#fef3c7', text: '"Once upon a time, in a little hut in the forest, lived a kind rabbit named Bunnu..."', scene: '🌳🏠🐰', speaker: '👴 Dadaji narrates...' },
    { bg: '#e0e7ff', text: '"Bunnu loved to share his carrots with all his friends – the deer, the squirrel, and even the grumpy fox!"', scene: '🐰🦌🐿️🦊', speaker: '👴 Dadaji continues...' },
    { bg: '#d1fae5', text: '"One starry night, there was no food left in the forest. Bunnu shared his last carrot. And that night, all the animals became true friends forever!"', scene: '🌟🌙🐰', speaker: '👵 Dadiji adds...' },
    { bg: '#fce7f3', text: 'The End. 💤 Little Bishu\'s eyes slowly closed, dreaming of Bunnu\'s rabbit friends...', scene: '😴💤🌙', speaker: '✨ Goodnight!' },
];

function StoryScene({ phase }) {
    const [page, setPage] = useState(0);
    const [dimmed, setDimmed] = useState(false);

    useEffect(() => { setPage(0); setDimmed(false); }, [phase]);

    if (phase === 'idle') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: 0.5 }}>
                <div style={{ fontSize: 64 }}>📖</div>
                <p style={{ color: '#64748b', fontWeight: 600 }}>Click "Begin Story" to start!</p>
            </div>
        );
    }

    const p = STORY_PAGES[page];
    const isLast = page === STORY_PAGES.length - 1;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
            {/* Page dots */}
            <div style={{ display: 'flex', gap: 8 }}>
                {STORY_PAGES.map((_, i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i === page ? '#8b5cf6' : '#e2e8f0', transition: 'background 0.3s' }} />
                ))}
            </div>

            {/* Story book */}
            <div style={{
                background: p.bg, borderRadius: 20, padding: 24, width: '100%', maxWidth: 360,
                border: '3px solid #c4b5fd', boxShadow: '0 8px 24px rgba(139,92,246,0.15)',
                transition: 'background 0.5s', minHeight: 200, display: 'flex', flexDirection: 'column', gap: 12
            }}>
                <div style={{ fontSize: 42, textAlign: 'center', letterSpacing: 4 }}>{p.scene}</div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: '#1e293b', fontStyle: 'italic', fontWeight: 600, margin: 0 }}>
                    {p.text}
                </p>
                <div style={{ fontSize: 13, color: '#8b5cf6', fontWeight: 800, marginTop: 'auto' }}>{p.speaker}</div>
            </div>

            {!isLast ? (
                <button onClick={() => setPage(p => p + 1)} style={{ padding: '10px 28px', background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer', fontSize: 15 }}>
                    Next Page ▶
                </button>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 48 }}>😴💤</div>
                    <p style={{ fontWeight: 900, color: '#8b5cf6', fontSize: 18 }}>Bishu is asleep! Story complete!</p>
                </div>
            )}
        </div>
    );
}

/* ─── SCENE 4: Making Sweets (recipe steps with ingredients) ── */
const SWEET_STEPS = [
    { label: 'Gather Ingredients 🛒', action: 'Collect!', ingredients: ['🍚 Rice flour', '🥥 Coconut', '🍬 Jaggery', '🥛 Milk'], color: '#db2777' },
    { label: 'Mix the batter 🥣', action: 'Mix it!', ingredients: null, scene: '🥣 + 🥛 → 🍚', color: '#be185d' },
    { label: 'Cook on the pan 🍳', action: 'Cook!', ingredients: null, scene: '🔥 + 🍳 + 🥣 → 🥞', color: '#9d174d' },
    { label: 'Add coconut & jaggery 🥥', action: 'Add toppings!', ingredients: null, scene: '🥞 + 🥥 + 🍬 → 😍', color: '#831843' },
    { label: 'Sweets are ready! 🎉', action: null, ingredients: null, scene: '🍮🍡🧆', color: '#500724' },
];

function FestivalScene({ phase }) {
    const [step, setStep] = useState(0);
    const [cookProgress, setCookProgress] = useState(0);

    useEffect(() => { setStep(0); setCookProgress(0); }, [phase]);

    // auto-cook animation
    useEffect(() => {
        if (step === 2 && cookProgress < 100) {
            const t = setInterval(() => setCookProgress(p => Math.min(p + 5, 100)), 150);
            return () => clearInterval(t);
        }
    }, [step, cookProgress]);

    if (phase === 'idle') {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: 0.5 }}>
                <div style={{ fontSize: 64 }}>🍩</div>
                <p style={{ color: '#64748b', fontWeight: 600 }}>Click "Start Cooking" to begin!</p>
            </div>
        );
    }

    if (step === 4) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 80 }}>🍮🍡🧆</div>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#ec4899' }}>Festival Sweets Ready! 🎉</p>
                <p style={{ color: '#64748b' }}>"Kusum Mausi's sweets are the best!"</p>
                <div style={{ fontSize: 40 }}>✨😋✨</div>
            </div>
        );
    }

    const s = SWEET_STEPS[step];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%' }}>
            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 8 }}>
                {SWEET_STEPS.slice(0, -1).map((_, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i <= step ? '#ec4899' : '#e2e8f0', transition: 'background 0.3s' }} />
                ))}
            </div>

            <p style={{ fontWeight: 900, fontSize: 18, color: s.color, margin: 0 }}>{s.label}</p>

            {/* Step-specific display */}
            {step === 0 && s.ingredients && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%', maxWidth: 300 }}>
                    {s.ingredients.map((ing, i) => (
                        <div key={i} style={{ background: '#fdf2f8', padding: '12px 16px', borderRadius: 12, fontWeight: 700, color: '#db2777', border: '2px solid #fbcfe8', fontSize: 15 }}>
                            {ing}
                        </div>
                    ))}
                </div>
            )}

            {step === 2 && (
                <div style={{ width: '100%', maxWidth: 280 }}>
                    <div style={{ fontSize: 42, textAlign: 'center', marginBottom: 8 }}>🍳🔥</div>
                    <ProgressBar value={cookProgress} color="#ec4899" />
                    <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>Cooking... {cookProgress}%</p>
                </div>
            )}

            {step !== 0 && step !== 2 && (
                <div style={{ fontSize: 48, letterSpacing: 8 }}>{s.scene}</div>
            )}

            {step !== 2 ? (
                <button onClick={() => setStep(s => s + 1)} style={{ padding: '10px 28px', background: s.color, color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer', fontSize: 15, marginTop: 8 }}>
                    {s.action}
                </button>
            ) : cookProgress >= 100 ? (
                <button onClick={() => { setStep(3); }} style={{ padding: '10px 28px', background: '#ec4899', color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, cursor: 'pointer', fontSize: 15 }}>
                    Done! Add Toppings 🥥
                </button>
            ) : null}
        </div>
    );
}

const SVG_MAP = {
    plants: PlantsScene,
    chopping: ChoppingScene,
    story: StoryScene,
    festival: FestivalScene,
};

/* ─── Main Component ─────────────────────────────────── */
export default function OurFamiliesVirtualLab() {
    const navigate = useNavigate();
    const [activeExp, setActiveExp] = useState(0);
    const [phase, setPhase] = useState('idle');

    const exp = ACTIVITIES[activeExp];
    const LabScene = SVG_MAP[exp.id] || PlantsScene;

    const handleExpChange = (idx) => { setActiveExp(idx); setPhase('idle'); };
    const handleRun = () => setPhase('running');
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
                    <button className={`${styles['chem-nav-link']} ${styles['active']}`}>🧪 Virtual Lab</button>
                </div>
            </nav>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #10b981, #0ea5e9)', padding: '60px 24px', textAlign: 'center', color: '#fff' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: 100, fontSize: 13, fontWeight: 800, letterSpacing: 1.5, marginBottom: 20 }}>
                        🏠 FAMILY ACTIVITY
                    </div>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1 }}>
                        Interactive <span style={{ color: '#fef08a' }}>Chore</span> Simulation
                    </h1>
                    <p style={{ fontSize: 18, opacity: 0.9, lineHeight: 1.6 }}>
                        Pick an activity and complete the whole process step by step!
                    </p>
                </div>
            </div>

            <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'revert', gap: 32 }} className="lab-override">
                    <style>{`@media (min-width: 900px) { .lab-override { grid-template-columns: 280px 1fr !important; } }`}</style>

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
                                    transition: 'all 0.2s',
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

                    {/* Right: Main Stage */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 24 }} className="stage-override">
                        <style>{`@media (max-width: 1100px) { .stage-override { grid-template-columns: 1fr !important; } }`}</style>

                        {/* Center: Info + observation */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div style={{ background: '#fff', padding: 32, borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 900, color: exp.color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12, background: `${exp.color}15`, padding: '6px 12px', borderRadius: 8 }}>
                                    ACTIVITY
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>{exp.title}</h2>
                                <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, margin: 0 }}>{exp.desc}</p>
                            </div>

                            {phase === 'running' && (
                                <div style={{ background: `${exp.colorLight}`, padding: 24, borderRadius: 20, border: `2px solid ${exp.color}30` }}>
                                    <p style={{ fontSize: 15, color: '#475569', margin: 0 }}>🔵 <strong>In progress</strong> — follow the steps in the simulation panel!</p>
                                </div>
                            )}

                            {phase === 'idle' && (
                                <div style={{ background: '#f8fafc', padding: 32, borderRadius: 24, border: '2px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: 180, justifyContent: 'center' }}>
                                    <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.5 }}>⏳</div>
                                    <p style={{ color: '#64748b', fontSize: 15, fontWeight: 600, margin: 0 }}>
                                        Click <strong style={{ color: exp.color }}>{exp.actionLabel}</strong> to start!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Right: Interactive Simulation */}
                        <div style={{ background: '#fff', borderRadius: 24, border: `4px solid ${phase === 'running' ? exp.color : '#e2e8f0'}`, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s' }}>
                            {/* Titlebar */}
                            <div style={{ background: '#f1f5f9', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #e2e8f0' }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                                <span style={{ marginLeft: 10, fontSize: 12, fontWeight: 700, color: '#64748b' }}>Interactive Simulation</span>
                            </div>

                            <div style={{ flex: 1, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: phase === 'running' ? exp.colorLight : '#fafafa', minHeight: 340 }}>
                                <LabScene phase={phase} emoji={exp.emoji} color={exp.color} />
                            </div>

                            <div style={{ padding: 24, background: '#fff', borderTop: '1px solid #e2e8f0' }}>
                                {phase === 'idle' && (
                                    <button onClick={handleRun} style={{ width: '100%', padding: '14px', background: exp.color, color: '#fff', fontSize: 16, fontWeight: 800, border: 'none', borderRadius: 12, cursor: 'pointer', boxShadow: `0 4px 15px ${exp.color}40` }}>
                                        {exp.actionLabel}
                                    </button>
                                )}
                                {phase !== 'idle' && (
                                    <button onClick={handleReset} style={{ width: '100%', padding: '14px', background: '#f1f5f9', color: '#475569', fontSize: 16, fontWeight: 800, border: '2px solid #cbd5e1', borderRadius: 12, cursor: 'pointer' }}>
                                        🔄 Try Again
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
