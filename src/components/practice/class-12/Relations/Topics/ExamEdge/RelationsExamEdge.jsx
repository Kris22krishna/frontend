import React, { useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  Brain,
  Lightbulb,
  Rocket,
  Target,
  Trophy,
} from "lucide-react";
import "../../Relations.css";
import MathRenderer from "../../../../../MathRenderer";
import RelationsTopNav from "../../RelationsTopNav";
import InteractiveExamQuestionCard from "../../../shared/InteractiveExamQuestionCard";
import { relationsExamEdgeData as data } from "./RelationsExamEdgeData";

const EXAM_TABS = [
  { id: "kcet", name: "KCET", color: "#0d9488", icon: BadgeCheck },
  { id: "jee", name: "JEE Main", color: "#f59e0b", icon: Rocket },
  { id: "jeeAdvanced", name: "JEE Advanced", color: "#ef4444", icon: Brain },
];

export default function RelationsExamEdge() {
  const [activeTab, setActiveTab] = useState("kcet");

  const currentTab = EXAM_TABS.find((tab) => tab.id === activeTab);
  const questionSet = data.questions[activeTab] || [];
  const currentStrategy = data.strategy.find((item) =>
    activeTab === "kcet" ? item.exam.includes("KCET") : item.exam.includes("JEE")
  );

  return (
    <div className="rel-page">
      <RelationsTopNav active="exam-edge" backLabel="Back to Relations" />

      <div className="rel-intro-hero">
        <div className="rel-intro-hero-deco rel-intro-hero-deco-a" />
        <div className="rel-intro-hero-deco rel-intro-hero-deco-b" />
        <div className="rel-intro-hero-inner">
          <h1 className="rel-intro-hero-title">
            Relations <span className="rel-intro-hero-highlight">Exam Edge</span>
          </h1>
          <p className="rel-intro-hero-sub">
            High-yield topics, exam-style patterns, and a revision plan built for Relations.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {EXAM_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "2px solid",
                  borderColor: isActive ? tab.color : "#e2e8f0",
                  background: isActive ? `${tab.color}12` : "#fff",
                  color: isActive ? tab.color : "#64748b",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={18} />
                {tab.name}
              </button>
            );
          })}
        </div>

        <div
          style={{
            background: "#fff",
            padding: 32,
            borderRadius: 24,
            border: "1px solid #e2e8f0",
            marginBottom: 40,
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Target size={18} color={currentTab.color} /> High-Yield Topics
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {data.highYield
                .filter((item) =>
                  activeTab === "kcet"
                    ? item.category.includes("KCET") || item.category.includes("Core")
                    : activeTab === "jee"
                      ? item.category.includes("JEE") || item.category.includes("Core")
                      : true
                )
                .flatMap((item) => item.topics)
                .map((topic) => (
                  <div
                    key={topic}
                    style={{
                      background: "#f8fafc",
                      padding: "10px 18px",
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--rel-text)",
                    }}
                  >
                    <MathRenderer text={topic} />
                  </div>
                ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Trophy size={18} color="#f59e0b" /> Winning Strategy
              </h3>
              <div
                style={{
                  background: "#fffbeb",
                  padding: 24,
                  borderRadius: 20,
                  border: "1px solid #fef3c7",
                  color: "#92400e",
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {(currentStrategy?.points || []).map((point) => (
                    <li key={point} style={{ marginBottom: 8 }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <AlertTriangle size={18} color="#ef4444" /> Toppers&apos; Tricks
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {data.tricks.map((trick) => (
                  <div
                    key={trick.title}
                    style={{
                      background: "#f0f9ff",
                      padding: "16px 20px",
                      borderRadius: 16,
                      border: "1px solid #e0f2fe",
                      color: "#0c4a6e",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    <strong>{trick.title}: </strong>
                    <MathRenderer text={trick.content} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: 28,
            fontWeight: 900,
            marginBottom: 24,
            textAlign: "center",
            color: "var(--rel-text)",
          }}
        >
          Question Desk
        </h2>

        {activeTab === "jeeAdvanced" ? (
          <div style={{ display: "grid", gap: 20, marginBottom: 40 }}>
            {questionSet.map((item, index) => (
              <div
                key={item.q}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 24,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: currentTab.color,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Problem {index + 1}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--rel-text)",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  <MathRenderer text={item.q} />
                </div>
                <div
                  style={{
                    background: "#f0fdf4",
                    padding: 16,
                    borderRadius: 12,
                    border: "1px solid #dcfce7",
                    fontSize: 14,
                    color: "#166534",
                  }}
                >
                  <strong>Insight: </strong>
                  <MathRenderer text={item.ans} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
              marginBottom: 40,
            }}
          >
            {questionSet.map((item, index) => (
              <InteractiveExamQuestionCard
                key={`${item.q}-${index}`}
                item={item}
                index={index}
                accentColor={currentTab.color}
                textColor="var(--rel-text)"
              />
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: 40,
            background: "linear-gradient(135deg, #0f172a, #312e81)",
            padding: 40,
            borderRadius: 32,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <Lightbulb size={32} color="#f59e0b" />
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Revision Timeline</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
            }}
          >
            {data.revisionPlan.map((step) => (
              <div
                key={step.phase}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: 20,
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: "#f59e0b",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 6,
                  }}
                >
                  {step.phase}
                </div>
                {step.focus}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
