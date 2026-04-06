import React, { useEffect, useState } from "react";
import { AlertTriangle, Lightbulb, RefreshCw, Target, Trophy } from "lucide-react";
import "../../InverseTrigonometricFunctions.css";
import MathRenderer from "../../../../../MathRenderer";
import InverseTrigonometricFunctionsTopNav from "../../InverseTrigonometricFunctionsTopNav";
import InteractiveExamQuestionCard from "../../../shared/InteractiveExamQuestionCard";
import { pickQuestionDeskItems } from "../../../shared/examDeskUtils";
import { inverseTrigonometricFunctionsExamEdgeData as data } from "./InverseTrigonometricFunctionsExamEdgeData";

const EXAM_TABS = [
  { id: "board", name: "Board Level", color: "#f59e0b", icon: Trophy },
];

export default function InverseTrigonometricFunctionsExamEdge() {
  const [activeTab, setActiveTab] = useState("board");
  const [questionSeed, setQuestionSeed] = useState(1);

  const currentTab = EXAM_TABS.find((tab) => tab.id === activeTab);
  const questionSet = data.questions[activeTab] || [];
  const questionDeskItems = pickQuestionDeskItems(questionSet, 2, questionSeed + activeTab.length);
  const currentStrategy = data.strategy.find((item) => item.exam.includes("Board"));

  useEffect(() => {
    setQuestionSeed((seed) => seed + 1);
  }, [activeTab]);

  return (
    <div className="rel-page">
      <InverseTrigonometricFunctionsTopNav
        active="exam-edge"
        backLabel="Back to Inverse Trigonometric Functions"
      />

      <div className="rel-intro-hero">
        <div className="rel-intro-hero-deco rel-intro-hero-deco-a" />
        <div className="rel-intro-hero-deco rel-intro-hero-deco-b" />
        <div className="rel-intro-hero-inner">
          <h1 className="rel-intro-hero-title">
            Inverse Trigonometric Functions{" "}
            <span className="rel-intro-hero-highlight">Exam Edge</span>
          </h1>
          <p className="rel-intro-hero-sub">
            High-yield ideas, branch-aware shortcuts, and exam-style inverse trig practice.
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
                .filter((item) => item.category.includes("Board"))
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <h2
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: 28,
              fontWeight: 900,
              margin: 0,
              color: "var(--rel-text)",
            }}
          >
            Question Desk
          </h2>

          <button
            type="button"
            onClick={() => setQuestionSeed((seed) => seed + 1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 999,
              border: `1px solid ${currentTab.color}33`,
              background: `${currentTab.color}10`,
              color: currentTab.color,
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            <RefreshCw size={15} />
            New Mix
          </button>
        </div>

        <p style={{ margin: "0 0 24px", color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>
          Showing a fresh set of {questionDeskItems.length} exam-style questions for{" "}
          {currentTab.name}.
        </p>

        {activeTab === "board" ? (
          <div style={{ display: "grid", gap: 20, marginBottom: 40 }}>
            {questionDeskItems.map(({ item, questionNumber }) => (
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
                  Problem {questionNumber}
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
            {questionDeskItems.map(({ item, questionNumber }, index) => (
              <InteractiveExamQuestionCard
                key={`${item.q}-${index}`}
                item={item}
                index={index}
                displayIndex={questionNumber}
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
