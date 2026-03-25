import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../DataHandling.css";
import MathRenderer from "../../../../../MathRenderer";

const cards5W1H = [
    {
        q: "WHAT",
        label: "What is Data Handling?",
        icon: "🔍",
        gradFrom: "#0891b2",
        gradTo: "#06b6d4",
        shadow: "rgba(6,182,212,0.35)",
        content: `Data Handling is the process of collecting, organising, and interpreting information (data) to draw meaningful conclusions. It involves finding representative values like the $\\mathbf{mean}$ (average), $\\mathbf{median}$ (middle value), and $\\mathbf{mode}$ (most frequent value). We also use $\\mathbf{range}$ (spread) to understand how data varies. Visual tools like $\\mathbf{bar\\ graphs}$ and $\\mathbf{double\\ bar\\ graphs}$ help us compare data at a glance!`,
        fact: "💡 The word 'statistics' comes from the Latin 'status', meaning 'state' — governments were the first to collect large-scale data!",
    },
    {
        q: "WHO",
        label: "Who uses Data Handling?",
        icon: "👥",
        gradFrom: "#059669",
        gradTo: "#10b981",
        shadow: "rgba(16,185,129,0.35)",
        content: `Everyone! Scientists analyse experimental results, doctors track patient health trends, sports analysts compute batting averages and win rates, businesses study sales data, weather forecasters predict climate patterns, and teachers calculate class averages. Even you use data handling when you compare your test scores across subjects!`,
        fact: "💡 Cricket's Duckworth-Lewis method uses complex data analysis to set rain-adjusted targets — pure data handling in action!",
    },
    {
        q: "WHEN",
        label: "When did it begin?",
        icon: "📅",
        gradFrom: "#b45309",
        gradTo: "#f59e0b",
        shadow: "rgba(245,158,11,0.35)",
        content: `Data collection dates back thousands of years! Ancient civilisations like Egypt and Mesopotamia kept records of harvests, populations, and trade. The modern science of statistics began in the 17th century with John Graunt's analysis of London's death records. Florence Nightingale famously used bar charts in the 1850s to convince officials about hospital sanitation!`,
        fact: "💡 Florence Nightingale was one of the first people to use statistical graphics to persuade people — she invented the polar area diagram!",
    },
    {
        q: "WHERE",
        label: "Where do we see it?",
        icon: "🌍",
        gradFrom: "#be185d",
        gradTo: "#ec4899",
        shadow: "rgba(236,72,153,0.35)",
        content: `Data handling is everywhere! Look at newspaper infographics showing election results, COVID case charts, stock market graphs, weather forecast tables, school report cards with averages, cricket scorecards, YouTube analytics showing view counts, and even your phone's screen-time bar graphs. Anywhere numbers need to tell a story, data handling is at work.`,
        fact: "💡 Google processes over 8.5 billion searches per day — all of which need data handling to deliver relevant results!",
    },
    {
        q: "WHY",
        label: "Why should I learn it?",
        icon: "🚀",
        gradFrom: "#7c3aed",
        gradTo: "#a855f7",
        shadow: "rgba(168,85,247,0.35)",
        content: `Because raw numbers alone are meaningless! Data handling gives you the tools to summarise, compare, and draw conclusions from information. Without it, you can't tell if a batsman is improving, whether a medicine works, or which product sells best. It's the foundation of probability, machine learning, and artificial intelligence — the most sought-after skills in the modern world!`,
        fact: "💡 Data Science has been called 'the sexiest job of the 21st century' by Harvard Business Review — it all starts with data handling!",
    },
    {
        q: "HOW",
        label: "How does it work?",
        icon: "🎯",
        gradFrom: "#2563eb",
        gradTo: "#3b82f6",
        shadow: "rgba(59,130,246,0.35)",
        content: `First, you $\\mathbf{collect}$ data (surveys, experiments, observations). Then you $\\mathbf{organise}$ it using tables and frequency charts. Next, you $\\mathbf{summarise}$ it with representative values: Mean $= \\frac{\\text{Sum of all values}}{\\text{Number of values}}$, Median (middle value after sorting), Mode (most frequent value), and Range $= \\text{Max} - \\text{Min}$. Finally, you $\\mathbf{represent}$ it visually using bar graphs and double bar graphs for easy comparison!`,
        fact: "💡 The arithmetic mean can be misleading — if Bill Gates walks into a room, the 'average' wealth of everyone skyrockets, but nobody actually got richer!",
    },
];

/* ─── Single card ─────────────────────────────────── */
function W1HCard({ card }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="dh-5w1h-card" onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
            <div className="dh-5w1h-header">
                <div
                    className="dh-5w1h-icon"
                    style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                        boxShadow: `0 6px 20px ${card.shadow}`,
                    }}
                >
                    {card.icon}
                </div>
                <div>
                    <div className="dh-5w1h-q">{card.q}</div>
                    <div className="dh-5w1h-label">{card.label}</div>
                </div>
            </div>

            {open && (
                <div className="dh-5w1h-body">
                    <p>
                        <MathRenderer text={card.content} />
                    </p>
                    <div
                        style={{
                            marginTop: 16,
                            padding: "12px 16px",
                            background: `linear-gradient(135deg, ${card.gradFrom}08, ${card.gradTo}12)`,
                            borderRadius: 12,
                            border: `1px solid ${card.gradFrom}20`,
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "#334155",
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
export default function DataHandlingIntro5W1H() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="dh-page">
            {/* Top navigation */}
            <nav className="dh-intro-nav">
                <button
                    className="dh-intro-nav-back"
                    onClick={() => navigate("/middle/grade/7/data-handling")}
                >
                    ← Back to Hub
                </button>
                <div className="dh-intro-nav-links">
                    <button
                        className="dh-intro-nav-link dh-intro-nav-link--active"
                        onClick={() => navigate("/middle/grade/7/data-handling/introduction")}
                    >
                        🌟 Introduction
                    </button>
                    <button
                        className="dh-intro-nav-link"
                        onClick={() => navigate("/middle/grade/7/data-handling/terminology")}
                    >
                        📖 Terminology
                    </button>
                    <button
                        className="dh-intro-nav-link"
                        onClick={() => navigate("/middle/grade/7/data-handling/skills")}
                    >
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* Content */}
            <div className="dh-section" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
                <h1 className="dh-section-title">
                    Data Handling: <span>The 5W1H Framework</span>
                </h1>
                <p className="dh-section-subtitle">
                    Click on each card to explore the six big questions about Data Handling.
                </p>

                <div className="dh-5w1h-grid">
                    {cards5W1H.map((card, idx) => (
                        <W1HCard key={idx} card={card} />
                    ))}
                </div>
            </div>
        </div>
    );
}
