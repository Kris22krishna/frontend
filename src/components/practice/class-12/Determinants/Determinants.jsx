import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpenText,
  ChevronRight,
  Network,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import "./Determinants.css";

const MODULES = [
  {
    id: "introduction",
    path: "/senior/grade/12/determinants/introduction",
    label: "Introduction",
    icon: Sparkles,
    tagline: "5W1H Exploration",
    desc: "6 big questions about Determinants - what, why, who, when, where and how.",
    color: "#0891b2",
  },
  {
    id: "terminology",
    path: "/senior/grade/12/determinants/terminology",
    label: "Terminology",
    icon: BookOpenText,
    tagline: "Key Terms and Rules",
    desc: "Master the language of determinants - minors, cofactors, adjoint, inverse, and core properties.",
    color: "#7c3aed",
  },
  {
    id: "skills",
    path: "/senior/grade/12/determinants/skills",
    label: "Skills",
    icon: Target,
    tagline: "Practice and Assessment",
    desc: "Targeted drills for evaluation, properties, inverse methods, geometry, and applications.",
    color: "#0369a1",
  },
  {
    id: "connectomics",
    path: "/senior/grade/12/determinants/connectomics",
    label: "Connectomics",
    icon: Network,
    tagline: "Big Picture",
    desc: "See how determinants connect to matrices, geometry, transformations, and linear systems.",
    color: "#d97706",
  },
  {
    id: "exam-edge",
    path: "/senior/grade/12/determinants/exam-edge",
    label: "Exam Edge",
    icon: Trophy,
    tagline: "Test Ready",
    desc: "Exam patterns, high-yield ideas, and question desk practice for Determinants.",
    color: "#ef4444",
  },
];

const STATS = [
  { label: "Core Topics", num: "5" },
  { label: "Practice Tracks", num: "6" },
  { label: "Chapter Links", num: "5" },
  { label: "Mastery", num: "0%" },
];

export default function Determinants() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const footer = document.querySelector(".main-footer");
    if (footer) footer.style.display = "none";
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, []);

  return (
    <div className="det-fullpage">
      <div className="det-left">
        <div className="det-deco det-deco-a" />
        <div className="det-deco det-deco-b" />
        <div className="det-deco det-deco-c" />

        <div className="det-left-content">
          <button className="det-back-link" onClick={() => navigate("/senior/grade/12")}>
            <ArrowLeft size={16} />
            <span>Grade 12</span>
          </button>

          <h1 className="det-main-title">
            Master
            <br />
            <span className="det-title-accent">Determinants</span>
          </h1>

          <p className="det-main-sub">
            From scalar values of square matrices to geometry and system solving,
            learn Determinants with the same clean progression as the strongest chapters.
          </p>

          <div className="det-stats-row">
            {STATS.map((stat) => (
              <div key={stat.label} className="det-stat-chip">
                <span className="det-stat-chip-val">{stat.num}</span>
                <span className="det-stat-chip-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="det-right">
        <div className="det-right-inner">
          <div className="det-right-eyebrow">CHOOSE YOUR PATH</div>

          <div className="det-cards-col">
            {MODULES.map((mod) => {
              const Icon = mod.icon;

              return (
                <button
                  key={mod.id}
                  className="det-card-btn"
                  onClick={() => navigate(mod.path)}
                >
                  <div className="det-card-strip" style={{ background: mod.color }} />
                  <div
                    className="det-card-icon"
                    style={{ background: `${mod.color}15`, color: mod.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="det-card-text">
                    <div className="det-card-tagline">{mod.tagline}</div>
                    <div className="det-card-label">{mod.label}</div>
                    <div className="det-card-desc">{mod.desc}</div>
                  </div>
                  <div className="det-card-chevron" style={{ color: mod.color }}>
                    <ChevronRight size={32} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
