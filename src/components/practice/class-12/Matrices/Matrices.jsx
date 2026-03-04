import React from "react";
import { useNavigate } from "react-router-dom";
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
    shadow: "rgba(6,182,212,0.4)",
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
    shadow: "rgba(168,85,247,0.4)",
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
    shadow: "rgba(59,130,246,0.4)",
  },
];

const STATS = [
  { val: "6", label: "Big Questions", color: "#0891b2" },
  { val: "9", label: "Key Terms", color: "#7c3aed" },
  { val: "6", label: "Rules", color: "#059669" },
  { val: "6", label: "Skills", color: "#0369a1" },
  { val: "120", label: "Practice Qs", color: "#b45309" },
];

export default function Matrices() {
  const navigate = useNavigate();

  return (
    <div className="mat-fullpage">
      {/* ══ LEFT PANEL — Hero ══════════════════════════ */}
      <div className="mat-left">
        {/* Decorative circles */}
        <div className="mat-deco mat-deco-a" />
        <div className="mat-deco mat-deco-b" />
        <div className="mat-deco mat-deco-c" />

        <div className="mat-left-content">
          <h1 className="mat-main-title">
            Master
            <br />
            <span className="mat-title-accent">Matrices</span>
          </h1>

          <p className="mat-main-sub">
            From rectangular arrays to powerful transformations — learn Matrices
            the way they were meant to be taught.
          </p>

          {/* Stats grid */}
          <div className="mat-stats-grid">
            {STATS.map((s, i) => (
              <div className="mat-stat" key={i}>
                <span className="mat-stat-num" style={{ color: s.color }}>
                  {s.val}
                </span>
                <span className="mat-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ RIGHT PANEL — Topic Cards ═══════════════════ */}
      <div className="mat-right">
        <p className="mat-right-eyebrow">Choose a topic to explore</p>
        <div className="mat-cards-col">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              className="mat-card-btn"
              onClick={() => navigate(mod.path)}
            >
              {/* Gradient left strip */}
              <div
                className="mat-card-strip"
                style={{
                  background: `linear-gradient(180deg, ${mod.gradFrom}, ${mod.gradTo})`,
                }}
              />

              {/* Icon */}
              <div
                className="mat-card-icon"
                style={{
                  background: `linear-gradient(135deg, ${mod.gradFrom}, ${mod.gradTo})`,
                  boxShadow: `0 6px 20px ${mod.shadow}`,
                }}
              >
                {mod.emoji}
              </div>

              {/* Text */}
              <div className="mat-card-text">
                <div className="mat-card-label" style={{ color: mod.gradFrom }}>
                  {mod.label}
                </div>
                <div className="mat-card-tagline">{mod.tagline}</div>
                <div className="mat-card-desc">{mod.desc}</div>
              </div>

              {/* Arrow */}
              <div className="mat-card-chevron" style={{ color: mod.gradFrom }}>
                ›
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
