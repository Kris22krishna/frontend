import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../FractionsAndDecimals.css";
import MathRenderer from "../../../../../MathRenderer";

const cards5W1H = [
    {
        q: "WHAT",
        label: "What are Fractions & Decimals?",
        icon: "🔍",
        gradFrom: "#0d9488",
        gradTo: "#14b8a6",
        shadow: "rgba(20, 184, 166, 0.35)",
        content: `A fraction represents a part of a whole or, more generally, any number of equal parts. It is written as $\\frac{a}{b}$, where $a$ is the numerator (parts we have) and $b$ is the denominator (total equal parts). A decimal is just a fraction whose denominator is a power of 10 ($10, 100, 1000$, etc.), written using a decimal point like $0.75$. Both are ways to represent numbers that fall between integers!`,
        fact: '💡 The word "fraction" comes from the Latin "fractio", meaning "to break".',
    },
    {
        q: "WHO",
        label: "Who uses them?",
        icon: "👥",
        gradFrom: "#059669",
        gradTo: "#10b981",
        shadow: "rgba(16, 185, 129, 0.35)",
        content: `Everyone uses fractions and decimals daily! Chefs use fractions to scale recipes (like $\\frac{1}{2}$ cup of sugar). Carpenters and engineers measure lengths to the exact fraction of an inch or decimal of a centimeter. Bankers use decimals for currency and interest rates. Scientists record precise data, and even shoppers deal with decimals when looking at prices like $\$3.99$!`,
        fact: "💡 In the stock market, prices used to be quoted in fractions until the year 2001 when they switched to decimals!",
    },
    {
        q: "WHEN",
        label: "When were they invented?",
        icon: "📅",
        gradFrom: "#b45309",
        gradTo: "#f59e0b",
        shadow: "rgba(245, 158, 11, 0.35)",
        content: `The concept of fractions goes back to ancient times! The Egyptians (around 1800 BC) primarily used "unit fractions" (where the numerator is 1). The modern fraction bar notation ($\\frac{a}{b}$) was introduced by the Arabs. Later, in the 16th century, the Flemish mathematician Simon Stevin popularized the use of decimals, which made calculations vastly easier.`,
        fact: "💡 The ancient Babylonians used a base-60 fraction system, which is why we have 60 minutes in an hour!",
    },
    {
        q: "WHERE",
        label: "Where do we see them?",
        icon: "🌍",
        gradFrom: "#be185d",
        gradTo: "#ec4899",
        shadow: "rgba(236, 72, 153, 0.35)",
        content: `You see them everywhere there is measurement and division. Look at a ruler: the marks between the inches are fractions. Check your car's speedometer or odometer: distances are in decimals. Look at pizza slices, time (e.g., quarter past three), or battery percentage. They appear wherever whole numbers aren't precise enough to describe reality.`,
        fact: "💡 Even the music you listen to is built on fractions! Musical notes are called whole, half, quarter, and eighth notes based on their duration.",
    },
    {
        q: "WHY",
        label: "Why should I learn them?",
        icon: "🚀",
        gradFrom: "#4f46e5",
        gradTo: "#6366f1",
        shadow: "rgba(99, 102, 241, 0.35)",
        content: `Because the real world rarely deals in perfect whole numbers! Without fractions and decimals, we couldn't accurately measure weight, distance, time, or money. Mastering how to multiply and divide them is critical for algebra, geometry, physics, economics, and almost every high-paying technical or scientific career. They are the gateway to advanced mathematics!`,
        fact: "💡 Understanding fractions early predicts your success in high school algebra better than your overall IQ!",
    },
    {
        q: "HOW",
        label: "How do they work?",
        icon: "🎯",
        gradFrom: "#2563eb",
        gradTo: "#3b82f6",
        shadow: "rgba(59, 130, 246, 0.35)",
        content: `You manipulate them through operations! For fractions, multiplication is straight across: $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$. Division involves multiplying by the reciprocal: $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$. For decimals, multiplication involves shifting the decimal points based on the total number of decimal places. Multiplying by 10, 100, or 1000 shifts the decimal point right!`,
        fact: "💡 Dividing by a fraction is the exact same as multiplying by its reciprocal. It turns a division problem into an easier multiplication problem!",
    },
];

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`frac-intro-card${open ? " frac-intro-card--open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            style={{
                borderColor: open ? card.gradFrom + "60" : "#e2e8f0",
                boxShadow: open
                    ? `0 8px 32px ${card.shadow}`
                    : "0 2px 10px rgba(0,0,0,0.07)",
            }}
        >
            {/* Gradient top strip */}
            <div
                className="frac-intro-card-strip"
                style={{
                    background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})`,
                }}
            />

            {/* Header row */}
            <div className="frac-intro-card-header">
                {/* Icon */}
                <div
                    className="frac-intro-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 4px 14px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>

                {/* Q + label */}
                <div className="frac-intro-card-title-block">
                    <div className="frac-intro-card-q" style={{ color: card.gradFrom }}>
                        {card.q}
                    </div>
                    <div className="frac-intro-card-sublabel">{card.label}</div>
                </div>

                {/* Chevron */}
                <div
                    className="frac-intro-card-chevron"
                    style={{
                        color: open ? card.gradFrom : "#94a3b8",
                        transform: open ? "rotate(180deg)" : "none",
                    }}
                >
                    ▼
                </div>
            </div>

            {/* Collapsed hint */}
            {!open && <div className="frac-intro-card-hint">Tap to explore →</div>}

            {/* Expanded content */}
            {open && (
                <div className="frac-intro-card-body">
                    <div className="frac-intro-card-content">
                        <MathRenderer text={card.content} />
                    </div>
                    <div
                        className="frac-intro-card-fact"
                        style={{
                            background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                            borderColor: card.gradFrom + "30",
                        }}
                    >
                        <MathRenderer text={card.fact} />
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── Main page ───────────────────────────────────── */
export default function FractionsAndDecimalsIntro5W1H() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="frac-intro-page">
            {/* ── TOP NAV BAR ──────────────────────────────── */}
            <nav className="frac-intro-nav">
                <button
                    className="frac-intro-nav-back"
                    onClick={() => navigate("/middle/grade/7/fractions-and-decimals")}
                >
                    ← Back to Hub
                </button>

                <div className="frac-intro-nav-links">
                    <button
                        className="frac-intro-nav-link frac-intro-nav-link--active"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/introduction")}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="frac-intro-nav-link"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/terminology")}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="frac-intro-nav-link"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/skills")}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* ── HERO BANNER ──────────────────────────────── */}
            <div className="frac-intro-hero" style={{ padding: "16px 24px 20px" }}>
                <div className="frac-intro-hero-deco frac-intro-hero-deco-a" />
                <div className="frac-intro-hero-deco frac-intro-hero-deco-b" />
                <div className="frac-intro-hero-inner">
                    <h1 className="frac-intro-hero-title">
                        Discover Fractions & Decimals Through{" "}
                        <span className="frac-intro-hero-highlight">6 Big Questions</span>
                    </h1>
                    <p className="frac-intro-hero-sub">Tap each card to explore ✨</p>
                </div>
            </div>

            {/* ── 5W1H CARDS GRID ──────────────────────────── */}
            <div className="frac-intro-content" style={{ padding: "10px 24px 20px" }}>
                <div className="frac-intro-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>

                {/* Compact next-step strip */}
                <div className="frac-intro-cta-strip">
                    <p className="frac-intro-cta-sub" style={{ margin: 0 }}>
                        Up next: Key terms &amp; rules
                    </p>
                    <button
                        className="frac-intro-cta-btn"
                        onClick={() => navigate("/middle/grade/7/fractions-and-decimals/terminology")}
                    >
                        Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
