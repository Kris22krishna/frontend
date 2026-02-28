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

export default function AlgebraIntro5W1H({ onBack }) {
    const [flipped, setFlipped] = useState({});

    const toggleFlip = (idx) => {
        setFlipped(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const colorMap = {
        '#6c63ff': '#6c63ff',
        '#00d4aa': '#00d4aa',
        '#f9a825': '#f9a825',
        '#ff6b9d': '#ff6b9d',
        '#8b5cf6': '#8b5cf6',
        '#22d9a0': '#22d9a0',
    };

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px' }}>
            {/* Module intro */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,170,0.08))',
                border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: 16,
                padding: '32px',
                marginBottom: 40,
                textAlign: 'center'
            }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🧮</div>
                <h2 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(1.4rem, 4vw, 2rem)',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: 12
                }}>
                    Discover Algebra Through <span style={{ color: '#6c63ff' }}>6 Big Questions</span>
                </h2>
                <p style={{ color: '#9090bb', fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
                    Before diving into formulas and equations, let's build curiosity!
                    Tap each card to explore — Algebra is far more exciting than you think. ✨
                </p>
            </div>

            {/* 5W1H Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 24
            }}>
                {cards5W1H.map((card, idx) => (
                    <div
                        key={idx}
                        onClick={() => toggleFlip(idx)}
                        style={{
                            cursor: 'pointer',
                            perspective: 1000,
                            minHeight: 280,
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            minHeight: 280,
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                            transform: flipped[idx] ? 'rotateY(180deg)' : 'none',
                        }}>
                            {/* FRONT */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backfaceVisibility: 'hidden',
                                background: '#1e1e3a',
                                border: `1px solid rgba(${card.color === '#6c63ff' ? '108,99,255' : card.color === '#00d4aa' ? '0,212,170' : card.color === '#f9a825' ? '249,168,37' : card.color === '#ff6b9d' ? '255,107,157' : card.color === '#8b5cf6' ? '139,92,246' : '34,217,160'},0.3)`,
                                borderRadius: 16,
                                padding: '28px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                minHeight: 280,
                            }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: 20,
                                    background: card.bg,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 36, marginBottom: 20,
                                }}>{card.icon}</div>
                                <div style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: 40, fontWeight: 900,
                                    color: card.color, marginBottom: 8,
                                    textShadow: `0 0 20px ${card.color}55`
                                }}>{card.q}</div>
                                <div style={{ fontSize: 16, fontWeight: 600, color: '#e8e8ff', marginBottom: 16 }}>
                                    {card.label}
                                </div>
                                <div style={{
                                    fontSize: 12, color: '#9090bb', fontWeight: 600,
                                    letterSpacing: 1.5, textTransform: 'uppercase',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    padding: '6px 16px', borderRadius: 50
                                }}>
                                    Tap to reveal →
                                </div>
                            </div>

                            {/* BACK */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                                background: '#1e1e3a',
                                border: `1px solid ${card.color}55`,
                                borderRadius: 16,
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: 280,
                                boxShadow: `0 0 30px ${card.color}25`,
                            }}>
                                <div>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16
                                    }}>
                                        <span style={{ fontSize: 22 }}>{card.icon}</span>
                                        <span style={{
                                            fontFamily: 'Outfit, sans-serif',
                                            fontSize: 15, fontWeight: 800, color: card.color,
                                            textTransform: 'uppercase', letterSpacing: 1.5
                                        }}>{card.label}</span>
                                    </div>
                                    <p style={{ color: '#c8c8e8', fontSize: 14.5, lineHeight: 1.75 }}>
                                        {card.content}
                                    </p>
                                </div>
                                <div style={{
                                    background: card.bg,
                                    border: `1px solid ${card.color}30`,
                                    borderRadius: 10,
                                    padding: '12px 16px',
                                    fontSize: 13,
                                    color: '#e8e8ff',
                                    lineHeight: 1.6,
                                    marginTop: 16,
                                }}>
                                    {card.fact}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Motivation strip */}
            <div style={{
                marginTop: 48, display: 'flex', gap: 16,
                background: '#1e1e3a',
                border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: 16, padding: '24px 28px',
                alignItems: 'center', flexWrap: 'wrap'
            }}>
                <div style={{ fontSize: 48 }}>🌟</div>
                <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                        Ready to start your Algebra adventure?
                    </div>
                    <p style={{ color: '#9090bb', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                        Head over to the <strong style={{ color: '#6c63ff' }}>Terminology</strong> tab next —
                        learn the 7 building-block words and 5 golden rules of Algebra!
                    </p>
                </div>
            </div>
        </div>
    );
}
