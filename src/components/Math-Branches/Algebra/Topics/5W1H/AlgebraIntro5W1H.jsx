import React, { useState } from 'react';

const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What is Algebra?',
        icon: '🔍',
        color: '#6c63ff',
        bg: 'rgba(108,99,255,0.15)',
        content: `Algebra is the language of patterns and unknowns. Imagine you have a mystery box 📦 — you don't know what's inside, but you know it's 3 more than 5. So the box = 8! In Algebra, we use letters like x, y, or n to represent those mystery numbers. It's like cracking a secret code every time you solve an equation!`,
        fact: '💡 The word "Algebra" comes from the Arabic word "al-jabr" meaning "reunion of broken parts."'
    },
    {
        q: 'WHO',
        label: 'Who uses Algebra?',
        icon: '👥',
        color: '#00d4aa',
        bg: 'rgba(0,212,170,0.15)',
        content: `Everyone! Doctors calculate medicine doses. Engineers design bridges. Game developers program characters. Bankers balance accounts. Even chefs double a recipe — that's Algebra! You already use it when you split a pizza equally or figure out how many more coins you need to buy something.`,
        fact: '💡 NASA engineers use Algebra to calculate rocket trajectories to Mars!'
    },
    {
        q: 'WHEN',
        label: 'When did Algebra begin?',
        icon: '📅',
        color: '#f9a825',
        bg: 'rgba(249,168,37,0.15)',
        content: `Algebra has been around for over 4,000 years! Ancient Babylonians were solving equations on clay tablets in 2000 BCE. A Persian mathematician named Al-Khwarizmi wrote the first Algebra book around 820 AD. Modern Algebra as we know it took shape in the 1600s. You're learning a subject with a 4,000-year-old superpower!`,
        fact: '💡 Al-Khwarizmi\'s name gave us the word "algorithm" — the backbone of all computer programs!'
    },
    {
        q: 'WHERE',
        label: 'Where do we see Algebra?',
        icon: '🌍',
        color: '#ff6b9d',
        bg: 'rgba(255,107,157,0.15)',
        content: `Algebra is everywhere — literally! In your phone's GPS calculating the shortest path. In movies where CGI artists create 3D characters. In music apps that compress sound files. In shopping when apps calculate discounts. In sports when coaches analyze player statistics. Algebra is the invisible math powering the modern world!`,
        fact: '💡 Every time you use Google Maps, thousands of algebraic equations run in milliseconds!'
    },
    {
        q: 'WHY',
        label: 'Why should I learn Algebra?',
        icon: '🚀',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.15)',
        content: `Algebra trains your brain to think logically and solve problems step-by-step — a skill valuable in ANY career. It builds the foundation for all higher mathematics. More importantly, it teaches you that every complex problem can be broken down into simple, solvable steps. Algebra doesn't just teach math — it teaches you HOW to think!`,
        fact: '💡 Studies show that students who master Algebra earn 60% more during their lifetime!'
    },
    {
        q: 'HOW',
        label: 'How do I learn Algebra?',
        icon: '🎯',
        color: '#22d9a0',
        bg: 'rgba(34,217,160,0.15)',
        content: `Start with the building blocks: understand what variables and expressions mean. Then learn how to simplify and combine like terms. Next, practice solving equations — it's like balancing a see-saw! Master one skill before moving to the next. Practice a little each day, and in just a few weeks, you'll be solving equations that look scary but are actually fun puzzles!`,
        fact: '💡 Learning Algebra is like learning a language — the more you practice, the more fluent you become!'
    },
];

/* ─── Single Card ─────────────────────────────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                background: '#1e1e3a',
                border: `1px solid ${open ? card.color + '55' : 'rgba(108,99,255,0.2)'}`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: open ? `0 8px 32px ${card.color}25` : '0 2px 12px rgba(0,0,0,0.3)',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
            }}
            onClick={() => setOpen(o => !o)}
        >
            <style>{`
                @keyframes w1hFadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* ── Front face (always visible as header) ── */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '20px 22px',
                borderBottom: open ? `1px solid ${card.color}25` : '1px solid transparent',
                transition: 'border-color 0.3s',
            }}>
                {/* Icon bubble */}
                <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: card.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0,
                }}>{card.icon}</div>

                {/* Q + label */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(22px, 5vw, 32px)',
                        fontWeight: 900,
                        color: card.color,
                        lineHeight: 1,
                        textShadow: `0 0 16px ${card.color}55`,
                    }}>{card.q}</div>
                    <div style={{
                        fontSize: 'clamp(12px, 3.5vw, 14px)',
                        fontWeight: 600,
                        color: '#e8e8ff',
                        marginTop: 4,
                    }}>{card.label}</div>
                </div>

                {/* Chevron indicator */}
                <div style={{
                    flexShrink: 0,
                    fontSize: 15,
                    color: open ? card.color : '#9090bb',
                    transition: 'transform 0.35s ease, color 0.3s',
                    transform: open ? 'rotate(180deg)' : 'none',
                }}>▼</div>
            </div>

            {/* ── Back face (revealed on open) ── */}
            {!open && (
                <div style={{
                    padding: '10px 22px 16px',
                    display: 'flex', justifyContent: 'center',
                }}>
                    <span style={{
                        fontSize: 11, color: '#9090bb', fontWeight: 600,
                        letterSpacing: 1.5, textTransform: 'uppercase',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '5px 14px', borderRadius: 50,
                    }}>
                        Tap to explore →
                    </span>
                </div>
            )}

            {open && (
                <div style={{
                    padding: '20px 22px 22px',
                    animation: 'w1hFadeIn 0.3s ease',
                }}>
                    {/* Main explanation */}
                    <p style={{
                        color: '#c8c8e8',
                        fontSize: 'clamp(13px, 3.5vw, 15px)',
                        lineHeight: 1.8,
                        margin: '0 0 16px',
                        wordBreak: 'break-word',
                    }}>
                        {card.content}
                    </p>

                    {/* Fact chip — fixed overflow by using normal flow */}
                    <div style={{
                        background: card.bg,
                        border: `1px solid ${card.color}35`,
                        borderRadius: 12,
                        padding: '12px 16px',
                        fontSize: 'clamp(12px, 3.5vw, 14px)',
                        color: '#e8e8ff',
                        lineHeight: 1.65,
                        wordBreak: 'break-word',
                    }}>
                        {card.fact}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function AlgebraIntro5W1H({ onBack }) {
    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px 60px' }}>

            {/* Module intro */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,170,0.08))',
                border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: 16,
                padding: '28px 24px',
                marginBottom: 36,
                textAlign: 'center',
            }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🧮</div>
                <h2 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(1.3rem, 4vw, 2rem)',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: 10,
                }}>
                    Discover Algebra Through{' '}
                    <span style={{ color: '#6c63ff' }}>6 Big Questions</span>
                </h2>
                <p style={{
                    color: '#9090bb',
                    fontSize: 'clamp(13px, 3.5vw, 15px)',
                    lineHeight: 1.7,
                    maxWidth: 560,
                    margin: '0 auto',
                }}>
                    Before diving into formulas and equations, let's build curiosity!
                    Tap each card to explore — Algebra is far more exciting than you think. ✨
                </p>
            </div>

            {/* 5W1H Cards — simple vertical stack, mobile-first */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 16,
            }}>
                {cards5W1H.map((card, idx) => (
                    <W1HCard key={idx} card={card} />
                ))}
            </div>

            {/* Motivation strip */}
            <div style={{
                marginTop: 40,
                display: 'flex',
                gap: 16,
                background: '#1e1e3a',
                border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: 16,
                padding: '22px 24px',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <div style={{ fontSize: 44 }}>🌟</div>
                <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(15px, 4vw, 18px)',
                        fontWeight: 800,
                        color: '#fff',
                        marginBottom: 6,
                    }}>
                        Ready to start your Algebra adventure?
                    </div>
                    <p style={{ color: '#9090bb', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                        Head over to the{' '}
                        <strong style={{ color: '#6c63ff' }}>Terminology</strong> tab next —
                        learn the 7 building-block words and 5 golden rules of Algebra!
                    </p>
                </div>
            </div>
        </div>
    );
}
