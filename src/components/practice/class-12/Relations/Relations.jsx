import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Relations.css";

const MODULES = [
    {
        id: "introduction",
        path: "/senior/grade/12/relations/introduction",
        label: "Introduction",
        emoji: "🌟",
        tagline: "5W1H Exploration",
        desc: "6 Big Questions about Relations — What, Why, Who, When, Where and How.",
        gradFrom: "#0891b2",
        gradTo: "#06b6d4",
        shadow: "rgba(6,182,212,0.4)",
    },
    {
        id: "terminology",
        path: "/senior/grade/12/relations/terminology",
        label: "Terminology",
        emoji: "📖",
        tagline: "Key Terms · Rules",
        desc: "Master the language of Relations — reflexive, symmetric, transitive & equivalence.",
        gradFrom: "#7c3aed",
        gradTo: "#a855f7",
        shadow: "rgba(168,85,247,0.4)",
    },
    {
        id: "skills",
        path: "/senior/grade/12/relations/skills",
        label: "Skills",
        emoji: "🎯",
        tagline: "Practice & Assessment",
        desc: "Core skills, practice questions and assessment questions for each topic.",
        gradFrom: "#0369a1",
        gradTo: "#3b82f6",
        shadow: "rgba(59,130,246,0.4)",
    },
    {
        id: "exams",
        path: "/senior/grade/12/relations/exams",
        label: "Chapter Tests",
        emoji: "📝",
        tagline: "Exam Preparation",
        desc: "Take full chapter tests based on KCET, JEE Main, and Previous Year patterns.",
        gradFrom: "#ef4444",
        gradTo: "#f87171",
        shadow: "rgba(239,68,68,0.4)",
    },
];

const STATS = [
    { val: "6", label: "Big Questions", color: "#0891b2" },
    { val: "10", label: "Key Terms", color: "#7c3aed" },
    { val: "4", label: "Properties", color: "#059669" },
    { val: "5", label: "Skills", color: "#0369a1" },
    { val: "50+", label: "Practice Qs", color: "#b45309" },
];

export default function Relations() {
    const navigate = useNavigate();

    return (
        <div className="rel-fullpage" style={{ position: "relative" }}>
            {/* Back Button */}
            <button
                onClick={() => navigate("/senior/grade/12")}
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
                <ArrowLeft size={18} /> Back to Grade 12
            </button>

            {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
            <div className="rel-left">
                <div className="rel-deco rel-deco-a" />
                <div className="rel-deco rel-deco-b" />
                <div className="rel-deco rel-deco-c" />

                <div className="rel-left-content">
                    <h1 className="rel-main-title">
                        Master
                        <br />
                        <span className="rel-title-accent">Relations</span>
                    </h1>

                    <p className="rel-main-sub">
                        From Cartesian products to Equivalence Classes —
                        learn Relations the way they were meant to be taught.
                    </p>

                    <div className="rel-stats-grid">
                        {STATS.map((s, i) => (
                            <div className="rel-stat" key={i}>
                                <span className="rel-stat-num" style={{ color: s.color }}>
                                    {s.val}
                                </span>
                                <span className="rel-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
            <div className="rel-right">
                <p className="rel-right-eyebrow">Choose a topic to explore</p>
                <div className="rel-cards-col">
                    {MODULES.map((mod) => (
                        <button
                            key={mod.id}
                            className="rel-card-btn"
                            onClick={() => navigate(mod.path)}
                        >
                            <div
                                className="rel-card-strip"
                                style={{
                                    background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                }}
                            />
                            <div
                                className="rel-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                    boxShadow: `0 6px 20px ${mod.shadow}`,
                                }}
                            >
                                {mod.emoji}
                            </div>
                            <div className="rel-card-text">
                                <div className="rel-card-label" style={{ color: mod.gradFrom }}>
                                    {mod.label}
                                </div>
                                <div className="rel-card-tagline">{mod.tagline}</div>
                                <div className="rel-card-desc">{mod.desc}</div>
                            </div>
                            <div className="rel-card-chevron" style={{ color: mod.gradFrom }}>
                                ›
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
