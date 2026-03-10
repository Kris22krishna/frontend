import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./DataHandling.css";

const MODULES = [
    {
        id: "introduction",
        path: "/middle/grade/7/data-handling/introduction",
        label: "Introduction",
        emoji: "🌟",
        tagline: "5W1H Exploration",
        desc: "6 Big Questions about Data Handling — What, Why, Who, When, Where and How.",
        gradFrom: "#0891b2",
        gradTo: "#06b6d4",
        shadow: "rgba(6, 182, 212, 0.4)",
    },
    {
        id: "terminology",
        path: "/middle/grade/7/data-handling/terminology",
        label: "Terminology",
        emoji: "📖",
        tagline: "8 Key Terms · 6 Rules",
        desc: "Master the language — mean, median, mode, range, bar graphs and double bar graphs.",
        gradFrom: "#7c3aed",
        gradTo: "#a855f7",
        shadow: "rgba(168, 85, 247, 0.4)",
    },
    {
        id: "skills",
        path: "/middle/grade/7/data-handling/skills",
        label: "Skills",
        emoji: "🎯",
        tagline: "Practice & Assessment",
        desc: "6 core skills with dynamic SVG graphs, 10 practice and 10 assessment questions each.",
        gradFrom: "#0369a1",
        gradTo: "#3b82f6",
        shadow: "rgba(59, 130, 246, 0.4)",
    },
];

const STATS = [
    { val: "6", label: "Big Questions", color: "#0891b2" },
    { val: "8", label: "Key Terms", color: "#7c3aed" },
    { val: "6", label: "Rules", color: "#059669" },
    { val: "6", label: "Skills", color: "#0369a1" },
    { val: "120+", label: "Practice Qs", color: "#b45309" },
];

export default function DataHandling() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="dh-fullpage" style={{ position: "relative" }}>
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
            <div className="dh-left">
                {/* Decorative circles */}
                <div className="dh-deco dh-deco-a" />
                <div className="dh-deco dh-deco-b" />
                <div className="dh-deco dh-deco-c" />

                <div className="dh-left-content">
                    <h1 className="dh-main-title">
                        Master
                        <br />
                        <span className="dh-title-accent">Data Handling</span>
                    </h1>

                    <p className="dh-main-sub">
                        From collecting data to drawing conclusions — learn how mean, median, mode, and bar graphs bring numbers to life.
                    </p>

                    {/* Stats grid */}
                    <div className="dh-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="dh-stat" key={i}>
                                <span className="dh-stat-num" style={{ color: s.color }}>
                                    {s.val}
                                </span>
                                <span className="dh-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="dh-right">
                <p className="dh-right-eyebrow">Choose a topic to explore</p>
                <div className="dh-cards-col">
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className="dh-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            {/* Gradient left strip */}
                            <div
                                className="dh-card-strip"
                                style={{
                                    background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                }}
                            />

                            {/* Icon */}
                            <div
                                className="dh-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>

                            {/* Text */}
                            <div className="dh-card-text">
                                <div className="dh-card-label" style={{ color: mod.gradFrom }}>
                                    {mod.label}
                                </div>
                                <div className="dh-card-tagline">{mod.tagline}</div>
                                <div className="dh-card-desc">{mod.desc}</div>
                            </div>

                            {/* Arrow */}
                            <div className="dh-card-chevron" style={{ color: mod.gradFrom }}>
                                ›
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
