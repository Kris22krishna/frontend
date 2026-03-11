import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import "./Matrices.css";

const MODULES = [
    {
        id: "introduction",
        path: "/senior/grade/12/matrices/introduction",
        label: "Introduction",
        emoji: "🌟",
        tagline: "5W1H Exploration",
        desc: "6 Big Questions about Matrices — What, Why, Who, When, Where and How.",
        gradFrom: "#0891b2",
        gradTo: "#06b6d4",
    },
    {
        id: "terminology",
        path: "/senior/grade/12/matrices/terminology",
        label: "Terminology",
        emoji: "📖",
        tagline: "9 Key Terms · 6 Rules",
        desc: "Master the language of Matrices — order, types, operations & the golden rules.",
        gradFrom: "#7c3aed",
        gradTo: "#a855f7",
    },
    {
        id: "skills",
        path: "/senior/grade/12/matrices/skills",
        label: "Skills",
        emoji: "🎯",
        tagline: "Practice & Assessment",
        desc: "6 core skills, 10 practice questions and 10 assessment questions each.",
        gradFrom: "#0369a1",
        gradTo: "#3b82f6",
    },
    {
        id: "connectomics",
        path: "/senior/grade/12/matrices/connectomics",
        label: "Connectomics",
        emoji: "🔗",
        tagline: "Big Picture",
        desc: "See how matrices connect to other branches of mathematics and real-world applications.",
        gradFrom: "#d97706",
        gradTo: "#f59e0b",
    },
    {
        id: "exam-edge",
        path: "/senior/grade/12/matrices/exam-edge",
        label: "Exam Edge",
        emoji: "🏆",
        tagline: "Test Ready",
        desc: "Challenge yourself with exam-style questions and advanced matrices problems.",
        gradFrom: "#dc2626",
        gradTo: "#ef4444",
    },
];

const STATS = [
    { val: "6", label: "Big Questions", icon: "❓" },
    { val: "9", label: "Key Terms", icon: "📝" },
    { val: "6", label: "Rules", icon: "📐" },
    { val: "6", label: "Skills", icon: "🎯" },
    { val: "120", label: "Practice Qs", icon: "✏️" },
];

export default function Matrices() {
    const navigate = useNavigate();

    React.useEffect(() => {
        const footer = document.querySelector(".main-footer");
        if (footer) footer.style.display = "none";
        return () => {
            if (footer) footer.style.display = "block";
        };
    }, []);

    return (
        <div className="mat-fullpage">
            {/* ── LEFT PANEL ─────────────────────────────── */}
            <div className="mat-left">
                {/* Decorative elements */}
                <div className="mat-deco mat-deco-a" />
                <div className="mat-deco mat-deco-b" />
                <div className="mat-deco mat-deco-c" />
                <div className="mat-deco mat-deco-grid" />

                <div className="mat-left-content">
                    <button
                        className="mat-back-link"
                        onClick={() => navigate("/senior/grade/12")}
                    >
                        <ArrowLeft size={16} />
                        <span>Grade 12</span>
                    </button>

                    <h1 className="mat-main-title">
                        Master
                        <br />
                        <span className="mat-title-accent">Matrices</span>
                    </h1>

                    <p className="mat-main-sub">
                        From rectangular arrays to powerful transformations —
                        learn Matrices the way they were meant to be taught.
                    </p>

                    {/* Stats row */}
                    <div className="mat-stats-row">
                        {STATS.map((s, i) => (
                            <div className="mat-stat-chip" key={i}>
                                <span className="mat-stat-chip-icon">{s.icon}</span>
                                <div className="mat-stat-chip-text">
                                    <span className="mat-stat-chip-val">{s.val}</span>
                                    <span className="mat-stat-chip-lbl">{s.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT PANEL ────────────────────────────── */}
            <div className="mat-right">
                <div className="mat-right-inner">
                    <div className="mat-right-header">
                        <span className="mat-right-badge">LEARNING PATH</span>
                        <h2 className="mat-right-title">
                            Your roadmap to mastery
                        </h2>
                        <p className="mat-right-desc">
                            Follow each step in order — build intuition, lock the
                            terminology, sharpen skills, then ace the exam.
                        </p>
                    </div>

                    <div className="mat-path-list">
                        {MODULES.map((mod, idx) => (
                            <button
                                key={mod.id}
                                className="mat-path-card"
                                onClick={() => navigate(mod.path)}
                            >
                                <div className="mat-path-card-left">
                                    <div
                                        className="mat-path-step"
                                        style={{
                                            background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                                        }}
                                    >
                                        {idx + 1}
                                    </div>

                                    <div className="mat-path-connector" />
                                </div>

                                <div className="mat-path-card-body">
                                    <div className="mat-path-card-header">
                                        <div className="mat-path-card-emoji">
                                            {mod.emoji}
                                        </div>
                                        <div className="mat-path-card-info">
                                            <span
                                                className="mat-path-card-tag"
                                                style={{ color: mod.gradFrom }}
                                            >
                                                {mod.tagline}
                                            </span>
                                            <h3 className="mat-path-card-name">
                                                {mod.label}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="mat-path-card-desc">{mod.desc}</p>
                                </div>

                                <div
                                    className="mat-path-card-arrow"
                                    style={{ color: mod.gradFrom }}
                                >
                                    <ChevronRight size={22} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
