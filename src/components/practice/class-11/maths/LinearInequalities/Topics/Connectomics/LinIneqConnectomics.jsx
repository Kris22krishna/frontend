import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../class-12/Matrices/Matrices.css";
import "../../../../../class-12/Matrices/MatricesPages.css";
import MathRenderer from "../../../../../../MathRenderer";
import { Share2 } from "lucide-react";

const BASE = "/senior/grade/11/maths/linear-inequalities";

const connections = [
  {
    from: "Linear Inequalities",
    to: "Linear Programming",
    icon: "📊",
    type: "Direct Gateway",
    color: "#6366f1",
    note: "Class 12 Chapter 12 is entirely built on systems of linear inequalities. Every LP problem is: optimise an objective function subject to a set of linear inequality constraints."
  },
  {
    from: "Number Line",
    to: "Real Analysis",
    icon: "📏",
    type: "Foundation",
    color: "#0891b2",
    note: "The concept of open and closed intervals on the number line is the foundation of real analysis: neighbourhoods, limits, continuity, and the squeeze theorem all use inequality notation."
  },
  {
    from: "Half-Planes",
    to: "Coordinate Geometry",
    icon: "📐",
    type: "Extension",
    color: "#f59e0b",
    note: "Every line in the coordinate plane divides it into two half-planes. The region between two parallel lines is a 'band' — a fundamental structure in coordinate geometry and conic sections."
  },
  {
    from: "Feasible Region",
    to: "Calculus & Optimisation",
    icon: "📈",
    type: "Core Dependency",
    color: "#ec4899",
    note: "Finding maxima/minima within a feasible region is the heart of constrained optimisation. This extends to multivariable calculus with Lagrange multipliers and KKT conditions."
  },
  {
    from: "Solution Sets",
    to: "Set Theory",
    icon: "∩",
    type: "Foundation",
    color: "#7c3aed",
    note: "The solution set of an inequality is a set (subset of $\\mathbb{R}$ or $\\mathbb{R}^2$). Intersection of solution sets gives the feasible region — directly applying set operations from Chapter 1."
  },
  {
    from: "Interval Notation",
    to: "Functions & Domains",
    icon: "⚡",
    type: "Application",
    color: "#10b981",
    note: "Domains of functions are expressed as intervals: domain of $\\sqrt{x}$ is $[0, \\infty)$. Every domain restriction from Chapter 2 (Relations & Functions) is an inequality in disguise."
  },
  {
    from: "Sign Rules",
    to: "Quadratic Inequalities",
    icon: "🧮",
    type: "Extension",
    color: "#0369a1",
    note: "The sign-change rule for multiplying/dividing by negatives generalises to solving quadratic and polynomial inequalities using sign charts and wavy curve methods in higher classes."
  },
  {
    from: "Constraints",
    to: "Machine Learning",
    icon: "🤖",
    type: "Application",
    color: "#d97706",
    note: "Support Vector Machines (SVMs) — a key ML algorithm — work by finding the optimal hyperplane separating classes, defined by a system of linear inequalities. Your understanding here directly transfers!"
  }
];

const realWorld = [
  {
    title: "Operations Research",
    impact: "Industry-Defining",
    desc: "Airlines, logistics companies, and manufacturers use Linear Programming (based on systems of inequalities) to optimise routes, schedules, and production — saving billions annually."
  },
  {
    title: "Game Theory",
    impact: "Strategic",
    desc: "Nash equilibria in competitive games are found by solving systems of inequalities. Every strategy space in a game is a feasible region defined by linear constraints."
  },
  {
    title: "Medical Dosing",
    impact: "Life-Critical",
    desc: "Safe drug dosage is always expressed as a range: $D_{min} \\leq d \\leq D_{max}$. Pharmaceutical optimisation problems use systems of inequalities to balance efficacy and safety."
  },
  {
    title: "Climate Modelling",
    impact: "Global",
    desc: "Carbon budgets, temperature bounds, and emission targets are all systems of inequality constraints. Climate agreements set feasible regions for global emissions."
  }
];

const NAV_STYLE_ACTIVE = {
  padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700,
  cursor: "pointer", background: "linear-gradient(135deg, #0369a1, #0891b2)",
  color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(3,105,161,0.3)"
};
const NAV_STYLE = {
  padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700,
  cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0"
};

export default function LinIneqConnectomics() {
  const navigate = useNavigate();

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
          <button style={NAV_STYLE_ACTIVE} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
        </div>
      </nav>

      <div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Linear Inequalities{" "}
            <span className="det-intro-hero-highlight" style={{ color: "#f59e0b" }}>
              Connectomics
            </span>
          </h1>
          <p className="det-intro-hero-sub">
            Discover how Linear Inequalities connect to every branch of mathematics and the real world.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <h2
          style={{
            fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 900,
            marginBottom: "32px", textAlign: "center", color: "#0f172a"
          }}
        >
          The Web of Mathematics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "24px",
            marginBottom: "60px"
          }}
        >
          {connections.map((conn, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff", borderRadius: "20px", padding: "24px",
                border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                position: "relative", overflow: "hidden"
              }}
            >
              <div
                style={{
                  position: "absolute", top: 0, left: 0,
                  width: "4px", height: "100%", background: conn.color
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ fontSize: "24px" }}>{conn.icon}</div>
                <div
                  style={{
                    fontSize: "12px", fontWeight: 800,
                    background: `${conn.color}15`, color: conn.color,
                    padding: "4px 10px", borderRadius: "100px"
                  }}
                >
                  {conn.type}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontWeight: 800, color: "#0f172a", fontSize: 14 }}>{conn.from}</span>
                <span style={{ color: "#94a3b8" }}>→</span>
                <span style={{ fontWeight: 800, color: conn.color, fontSize: 14 }}>{conn.to}</span>
              </div>
              <p style={{ margin: 0, fontSize: "14px", color: "#64748b", lineHeight: 1.6 }}>
                <MathRenderer text={conn.note} />
              </p>
            </div>
          ))}
        </div>

        <h2
          style={{
            fontFamily: "Outfit, sans-serif", fontSize: "28px", fontWeight: 900,
            marginBottom: "32px", textAlign: "center", color: "#0f172a"
          }}
        >
          Real World Systems
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "24px"
          }}
        >
          {realWorld.map((app, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, #0369a1, #0891b2)",
                padding: "32px", borderRadius: "24px", color: "#fff"
              }}
            >
              <div
                style={{
                  fontSize: "11px", fontWeight: 900, color: "#fbbf24",
                  textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px"
                }}
              >
                Impact: {app.impact}
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>
                {app.title}
              </h3>
              <p style={{ margin: 0, opacity: 0.85, fontSize: "15px", lineHeight: 1.6 }}>
                <MathRenderer text={app.desc} />
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "60px", textAlign: "center",
            background: "#f8fafc", padding: "40px",
            borderRadius: "32px", border: "2px dashed #e2e8f0"
          }}
        >
          <Share2 size={48} color="#0891b2" style={{ marginBottom: "16px" }} />
          <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>
            Infinite Connections
          </h3>
          <p style={{ maxWidth: "600px", margin: "0 auto", color: "#64748b" }}>
            Linear Inequalities aren't just a chapter — they're the language of constraint and optimisation
            that runs through all of science, engineering, and economics. Every limit, every boundary,
            every feasible solution is an inequality in disguise.
          </p>
        </div>
      </main>
    </div>
  );
}
