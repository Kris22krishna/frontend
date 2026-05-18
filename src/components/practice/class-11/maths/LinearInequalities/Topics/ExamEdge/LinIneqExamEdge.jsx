import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../class-12/Matrices/Matrices.css";
import "../../../../../class-12/Matrices/MatricesPages.css";
import MathRenderer from "../../../../../../MathRenderer";
import { Trophy, Target, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";
import { LI_EXAM_DATA, FORMULA_SHEET } from "./LinIneqExamEdgeData";

const BASE = "/senior/grade/11/maths/linear-inequalities";

const NAV_STYLE = {
  padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700,
  cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0"
};
const NAV_STYLE_ACTIVE = {
  padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700,
  cursor: "pointer", background: "linear-gradient(135deg, #0369a1, #0891b2)",
  color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(3,105,161,0.3)"
};

const EXAM_TABS = [
  { key: "cet", data: LI_EXAM_DATA.cet },
  { key: "jeeMains", data: LI_EXAM_DATA.jeeMains },
  { key: "jeeAdvanced", data: LI_EXAM_DATA.jeeAdvanced }
];

const PRO_TIPS = [
  "💡 **Sign Flip Rule**: Divide/multiply by a negative? ALWAYS flip: $-3x > 9 \\Rightarrow x < -3$.",
  "📊 **Number Line Quick Check**: For $a < x < b$ — open circles at both ends; for $a \\leq x \\leq b$ — filled circles.",
  "🎯 **Test Point Method**: To shade a half-plane, substitute $(0,0)$. If it satisfies the inequality, shade that side; otherwise shade the other.",
  "⚡ **Compound Inequalities**: $a < bx + c < d$ — solve all parts simultaneously (add/subtract/divide throughout).",
  "🧮 **AM-GM Shortcut**: For $x > 0$: $x + \\frac{1}{x} \\geq 2$. Equality at $x = 1$. Use this to quickly solve optimisation inequalities.",
  "🏅 **Absolute Value**: $|x - a| < r$ means '$x$ is within distance $r$ from $a$' — i.e., $(a-r, a+r)$.",
];

function FormulaSheet() {
  const [activeCategory, setActiveCategory] = useState(0);
  const cat = FORMULA_SHEET[activeCategory];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 26, fontWeight: 900, marginBottom: 24, textAlign: "center", color: "#0f172a" }}>
        📐 Formula Sheet — Linear Inequalities
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
        {FORMULA_SHEET.map((c, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(idx)}
            style={{
              padding: "10px 20px", borderRadius: 100, fontWeight: 800, fontSize: 13,
              cursor: "pointer", transition: "all 0.2s",
              border: activeCategory === idx ? "2px solid transparent" : "2px solid #e2e8f0",
              background: activeCategory === idx ? c.color : "#fff",
              color: activeCategory === idx ? "#fff" : "#64748b",
              boxShadow: activeCategory === idx ? `0 4px 14px ${c.color}40` : "none"
            }}
          >
            {c.category}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: cat.color }} />
          <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 22, fontWeight: 900, margin: 0, color: "#0f172a" }}>{cat.category}</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {cat.formulas.map((f, idx) => (
            <div
              key={idx}
              style={{
                background: `${cat.color}06`,
                borderRadius: 16,
                padding: "20px 24px",
                border: `1px solid ${cat.color}18`,
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: 16,
                alignItems: "start"
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 900, color: cat.color, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>
                  {f.name}
                </div>
                <div style={{ background: `${cat.color}12`, padding: "10px 16px", borderRadius: 10, textAlign: "center" }}>
                  <MathRenderer text={`$${f.formula}$`} />
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.65, paddingTop: 18 }}>
                <MathRenderer text={f.note} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LinIneqExamEdge() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cet");
  const [showFormulas, setShowFormulas] = useState(false);
  const [revealedPYQs, setRevealedPYQs] = useState({});

  const currentExam = LI_EXAM_DATA[activeTab];

  const togglePYQ = (idx) => {
    setRevealedPYQs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="mat-page">
      <nav
        className="mat-nav"
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 24px", position: "sticky", top: 0, zIndex: 50,
          background: "#fff", borderBottom: "1px solid #e2e8f0"
        }}
      >
        <button
          onClick={() => navigate(BASE)}
          style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#64748b" }}
        >
          ← Back to Linear Inequalities
        </button>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/skills`)}>🎯 Skills</button>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
          <button style={NAV_STYLE_ACTIVE} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
        </div>
      </nav>

      <div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Linear Inequalities{" "}
            <span className="det-intro-hero-highlight" style={{ color: "#ef4444" }}>
              Exam Edge
            </span>
          </h1>
          <p className="det-intro-hero-sub">
            Strategic insights, formula sheet, high-yield topics and PYQs for CET, JEE Mains &amp; JEE Advanced.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Mode toggle: Exam Prep vs Formula Sheet */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 36 }}>
          <button
            onClick={() => setShowFormulas(false)}
            style={{
              padding: "12px 28px", borderRadius: 100, fontWeight: 800, fontSize: 15,
              cursor: "pointer", transition: "all 0.2s",
              border: !showFormulas ? "2px solid #ef4444" : "2px solid #e2e8f0",
              background: !showFormulas ? "#ef444410" : "#fff",
              color: !showFormulas ? "#ef4444" : "#64748b",
              boxShadow: !showFormulas ? "0 4px 14px #ef444425" : "none"
            }}
          >
            ⚔️ Exam Strategy
          </button>
          <button
            onClick={() => setShowFormulas(true)}
            style={{
              padding: "12px 28px", borderRadius: 100, fontWeight: 800, fontSize: 15,
              cursor: "pointer", transition: "all 0.2s",
              border: showFormulas ? "2px solid #6366f1" : "2px solid #e2e8f0",
              background: showFormulas ? "#6366f110" : "#fff",
              color: showFormulas ? "#6366f1" : "#64748b",
              boxShadow: showFormulas ? "0 4px 14px #6366f125" : "none"
            }}
          >
            📐 Formula Sheet
          </button>
        </div>

        {showFormulas ? (
          <FormulaSheet />
        ) : (
          <>
            {/* Exam Tabs */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
              {EXAM_TABS.map(({ key, data }) => (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setRevealedPYQs({}); }}
                  style={{
                    padding: "12px 24px", borderRadius: 100, fontWeight: 800, fontSize: 15,
                    cursor: "pointer", transition: "all 0.2s",
                    border: `2px solid ${activeTab === key ? data.color : "#e2e8f0"}`,
                    background: activeTab === key ? `${data.color}12` : "#fff",
                    color: activeTab === key ? data.color : "#64748b",
                    boxShadow: activeTab === key ? `0 4px 14px ${data.color}30` : "none",
                    display: "flex", alignItems: "center", gap: 8
                  }}
                >
                  <span>{data.icon}</span> {data.label}
                </button>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              {/* Tagline */}
              <div style={{
                background: `${currentExam.color}08`,
                borderRadius: 16,
                padding: "16px 24px",
                marginBottom: 28,
                border: `1px solid ${currentExam.color}20`,
                display: "flex",
                gap: 24,
                flexWrap: "wrap"
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: currentExam.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Exam Style</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{currentExam.tagline}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: currentExam.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Weightage</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{currentExam.weightage}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: currentExam.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Frequency</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{currentExam.freq}</div>
                </div>
              </div>

              {/* Important Topics */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 13, fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <Target size={18} color={currentExam.color} /> High-Yield Topics
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {currentExam.importantTopics.map((t, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: t.hot ? `${currentExam.color}12` : "#f8fafc",
                        padding: "10px 16px", borderRadius: 12,
                        border: `1px solid ${t.hot ? currentExam.color + "30" : "#e2e8f0"}`,
                        fontSize: 14, fontWeight: 700,
                        color: t.hot ? currentExam.color : "#334155",
                        display: "flex", alignItems: "center", gap: 6
                      }}
                    >
                      {t.hot && <span style={{ fontSize: 12 }}>🔥</span>}
                      <MathRenderer text={t.text} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy & Pitfalls */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 32, marginBottom: 36 }}>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <AlertTriangle size={18} color="#ef4444" /> Common Pitfalls
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {currentExam.traps.map((t, idx) => (
                      <div key={idx} style={{ background: "#fef2f2", padding: "16px 20px", borderRadius: 16, border: "1px solid #fee2e2" }}>
                        <div style={{ color: "#991b1b", fontSize: 13, fontWeight: 800, marginBottom: 6 }}>
                          ⚠️ <MathRenderer text={t.trap} />
                        </div>
                        <div style={{ color: "#15803d", fontSize: 13, fontWeight: 600 }}>
                          ✅ <MathRenderer text={t.correction} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PYQs */}
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <BookOpen size={18} color={currentExam.color} /> Practice Questions
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {currentExam.pyqs.map((pyq, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: `${currentExam.color}06`,
                          borderRadius: 16, padding: "18px 20px",
                          border: `1px solid ${currentExam.color}18`
                        }}
                      >
                        {pyq.type === "proof" ? (
                          <>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 10, lineHeight: 1.5 }}>
                              <MathRenderer text={pyq.question} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              {pyq.keyPoints.map((kp, ki) => (
                                <div key={ki} style={{ fontSize: 13, color: "#475569", padding: "4px 0" }}>
                                  <MathRenderer text={`• ${kp}`} />
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 10, lineHeight: 1.5 }}>
                              <MathRenderer text={`Q${idx + 1}: ${pyq.question}`} />
                            </div>
                            {pyq.options && (
                              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                                {pyq.options.map((opt, oi) => (
                                  <div
                                    key={oi}
                                    style={{
                                      padding: "8px 14px", borderRadius: 10, fontSize: 13,
                                      background: revealedPYQs[idx] && oi === pyq.correct ? "rgba(16,185,129,0.08)" : "#fff",
                                      border: revealedPYQs[idx] && oi === pyq.correct ? "1.5px solid #10b981" : "1.5px solid #e2e8f0",
                                      color: revealedPYQs[idx] && oi === pyq.correct ? "#059669" : "#334155",
                                      fontWeight: revealedPYQs[idx] && oi === pyq.correct ? 800 : 500
                                    }}
                                  >
                                    <MathRenderer text={`(${["A","B","C","D"][oi]}) ${opt}`} />
                                  </div>
                                ))}
                              </div>
                            )}
                            {revealedPYQs[idx] && (
                              <div style={{ background: "rgba(59,130,246,0.06)", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(59,130,246,0.12)", fontSize: 13, color: "#475569" }}>
                                <strong style={{ color: "#2563eb" }}>💡 </strong>
                                <MathRenderer text={pyq.explanation} />
                              </div>
                            )}
                            <button
                              onClick={() => togglePYQ(idx)}
                              style={{
                                marginTop: 10, padding: "6px 16px", borderRadius: 8, fontSize: 13,
                                fontWeight: 700, cursor: "pointer", border: `1.5px solid ${currentExam.color}`,
                                background: "transparent", color: currentExam.color
                              }}
                            >
                              {revealedPYQs[idx] ? "Hide Answer" : "Show Answer"}
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div style={{ marginTop: 40, background: "linear-gradient(135deg, #0369a1, #0891b2)", padding: 40, borderRadius: 32, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <Lightbulb size={32} color="#fbbf24" />
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>Bonus Exam Tips</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: 20 }}>
                {PRO_TIPS.map((tip, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255,255,255,0.07)", padding: 20,
                      borderRadius: 16, border: "1px solid rgba(255,255,255,0.12)",
                      fontSize: 14, lineHeight: 1.6
                    }}
                  >
                    <MathRenderer text={tip} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
