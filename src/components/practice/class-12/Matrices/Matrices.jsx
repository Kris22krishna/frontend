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
import "./Matrices.css";

const MODULES = [
  {
    id: "introduction",
    path: "/senior/grade/12/matrices/introduction",
    label: "Introduction",
    icon: Sparkles,
    tagline: "5W1H Exploration",
    desc: "6 big questions about Matrices - what, why, who, when, where and how.",
    color: "#0891b2",
  },
  {
    id: "terminology",
    path: "/senior/grade/12/matrices/terminology",
    label: "Terminology",
    icon: BookOpenText,
    tagline: "9 Key Terms - 6 Rules",
    desc: "Master the language of Matrices - order, types, operations, and the golden rules.",
    color: "#7c3aed",
  },
  {
    id: "skills",
    path: "/senior/grade/12/matrices/skills",
    label: "Skills",
    icon: Target,
    tagline: "Practice & Assessment",
    desc: "6 core skills, 10 practice questions and 10 assessment questions each.",
    color: "#0369a1",
  },
  {
    id: "connectomics",
    path: "/senior/grade/12/matrices/connectomics",
    label: "Connectomics",
    icon: Network,
    tagline: "Big Picture",
    desc: "See how matrices connect to other branches of mathematics and real-world applications.",
    color: "#d97706",
  },
  {
    id: "exam-edge",
    path: "/senior/grade/12/matrices/exam-edge",
    label: "Exam Edge",
    icon: Trophy,
    tagline: "Test Ready",
    desc: "Exam patterns, high-yield ideas, and question desk practice for Matrices.",
    color: "#ef4444",
  },
];

const STATS = [
  { label: "Core Topics", num: "5", color: "#6366f1" },
  { label: "Practice Problems", num: "6", color: "#0d9488" },
  { label: "Chapter Links", num: "7", color: "#7c3aed" },
  { label: "Mastery", num: "0%", color: "#f59e0b" },
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
      <div className="mat-left">
        <div className="mat-deco mat-deco-a" />
        <div className="mat-deco mat-deco-b" />
        <div className="mat-deco mat-deco-c" />
        <div className="mat-deco mat-deco-grid" />

        <div className="mat-left-content">
          <button className="mat-back-link" onClick={() => navigate("/senior/grade/12")}>
            <ArrowLeft size={16} />
            <span>Grade 12</span>
          </button>

          <h1 className="mat-main-title">
            Master
            <br />
            <span className="mat-title-accent">Matrices</span>
          </h1>

          <p className="mat-main-sub">
            From rectangular arrays to powerful transformations, learn Matrices the way they
            were meant to be taught.
          </p>

          <div className="mat-stats-row">
            {STATS.map((stat) => (
              <div className="mat-stat-chip" key={stat.label}>
                <span className="mat-stat-chip-val">{stat.num}</span>
                <span className="mat-stat-chip-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mat-right">
        <div className="mat-right-inner">
          <div className="mat-right-eyebrow">CHOOSE YOUR PATH</div>

          <div className="mat-cards-col">
            {MODULES.map((mod) => {
              const Icon = mod.icon;

              return (
                <button
                  key={mod.id}
                  className="mat-module-card"
                  onClick={() => navigate(mod.path)}
                >
                  <div className="mat-module-strip" style={{ background: mod.color }} />
                  <div
                    className="mat-module-icon"
                    style={{ background: `${mod.color}15`, color: mod.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className="mat-module-text">
                    <div className="mat-module-tagline">{mod.tagline}</div>
                    <div className="mat-module-label">{mod.label}</div>
                    <div className="mat-module-desc">{mod.desc}</div>
                  </div>
                  <div className="mat-module-chevron" style={{ color: mod.color }}>
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
