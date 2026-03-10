import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./FractionsAndDecimals.css";

const MODULES = [
    {
        id: "introduction",
        path: "/middle/grade/7/fractions-and-decimals/introduction",
        label: "Introduction",
        emoji: "🌟",
        tagline: "5W1H Exploration",
        desc: "6 Big Questions about Fractions & Decimals — What, Why, Who, When, Where and How.",
        gradFrom: "#0d9488",
        gradTo: "#14b8a6",
        shadow: "rgba(20, 184, 166, 0.4)",
    },
    {
        id: "terminology",
        path: "/middle/grade/7/fractions-and-decimals/terminology",
        label: "Terminology",
        emoji: "📖",
        tagline: "Key Terms · Rules",
        desc: "Master the language — proper, improper, mixed fractions, reciprocal and decimal shifts.",
        gradFrom: "#4f46e5",
        gradTo: "#6366f1",
        shadow: "rgba(99, 102, 241, 0.4)",
    },
    {
        id: "skills",
        path: "/middle/grade/7/fractions-and-decimals/skills",
        label: "Skills",
        emoji: "🎯",
        tagline: "Practice & Assessment",
        desc: "5 core skills spanning fraction operations and decimal multiplication.",
        gradFrom: "#2563eb",
        gradTo: "#3b82f6",
        shadow: "rgba(59, 130, 246, 0.4)",
    },
];

const STATS = [
    { val: "6", label: "Big Questions", color: "#0d9488" },
    { val: "5", label: "Core Skills", color: "#4f46e5" },
    { val: "100+", label: "Practice Qs", color: "#2563eb" },
];

export default function FractionsAndDecimals() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="frac-fullpage" style={{ position: "relative" }}>
            {/* Back Button */}
            <button
                onClick={() => navigate("/middle/grade/7")}
                style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(255, 255, 255, 0.9)",
                    color: "#1E293B",
                    border: "1px solid #E2E8F0",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    zIndex: 50,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 6px 8px -1px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
            >
                <ArrowLeft size={18} /> Back to Grade 7
            </button>

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="frac-left">
                {/* Decorative circles */}
                <div className="frac-deco frac-deco-a" />
                <div className="frac-deco frac-deco-b" />
                <div className="frac-deco frac-deco-c" />

                <div className="frac-left-content">
                    <h1 className="frac-main-title">
                        Master
                        <br />
                        <span className="frac-title-accent">Fractions & Decimals</span>
                    </h1>

                    <p className="frac-main-sub">
                        From parts of a whole to real-world measurements — explore how fractions and decimals form the building blocks of mathematics.
                    </p>

                    {/* Stats grid */}
                    <div className="frac-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="frac-stat" key={i}>
                                <span className="frac-stat-num" style={{ color: s.color }}>
                                    {s.val}
                                </span>
                                <span className="frac-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="frac-right">
                <p className="frac-right-eyebrow">Choose a topic to explore</p>
                <div className="frac-cards-col">
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className="frac-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="frac-card-strip"
                                style={{
                                    background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                }}
                            />

                            {/* Icon */}
                            <div
                                className="frac-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="frac-card-text">
                                <div className="frac-card-label" style={{ color: mod.gradFrom }}>
                                    {mod.label}
                                </div>
                                <div className="frac-card-tagline">{mod.tagline}</div>
                                <div className="frac-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div className="frac-card-chevron" style={{ color: mod.gradFrom }}>
                                ›
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
