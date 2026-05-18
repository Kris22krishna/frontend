import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../class-12/Matrices/Matrices.css";
import MathRenderer from "../../../../../../MathRenderer";
import { LatexText } from "../../../../../../LatexText";
import {
  generatePropertiesQuestions,
  generatePropertiesAssessment,
  generateOneVariableQuestions,
  generateOneVariableAssessment,
  generateNumberLineQuestions,
  generateNumberLineAssessment,
  generateTwoVariableQuestions,
  generateTwoVariableAssessment,
  generateSystemsQuestions,
  generateSystemsAssessment,
  generateWordProblemsQuestions,
  generateWordProblemsAssessment,
} from "./linIneqQuestions";

import AssessmentEngine from "../../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";
import { NODE_IDS } from "@/lib/curriculumIds";
import { useSessionLogger } from "@/hooks/useSessionLogger";

const BASE = "/senior/grade/11/maths/linear-inequalities";

const NAV_STYLE = {
  padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700,
  cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0",
};
const NAV_STYLE_ACTIVE = {
  padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700,
  cursor: "pointer", background: "linear-gradient(135deg, #0369a1, #0891b2)",
  color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(3,105,161,0.3)",
};

const SKILL_NODE_ID_MAP = {
  properties:   NODE_IDS.g11MathLinIneqProperties,
  oneVariable:  NODE_IDS.g11MathLinIneqOneVariable,
  numberLine:   NODE_IDS.g11MathLinIneqNumberLine,
  twoVariable:  NODE_IDS.g11MathLinIneqTwoVariable,
  systems:      NODE_IDS.g11MathLinIneqSystems,
  wordProblems: NODE_IDS.g11MathLinIneqWordProblems,
};

const SKILLS = [
  {
    id: "properties",
    title: "Properties of Inequalities",
    subtitle: "Skill 1 · Foundations",
    icon: "⚖️",
    color: "#6366f1",
    desc: "Master the addition, subtraction, multiplication, and division properties — including the critical sign-flip rule.",
    practice: generatePropertiesQuestions,
    assessment: generatePropertiesAssessment,
    learn: {
      concept: "Linear inequalities obey strict rules about how they transform. The most important: multiplying or dividing by a negative number flips the inequality sign. Everything else behaves like equations.",
      rules: [
        { title: "Addition / Subtraction", f: "a > b \\Rightarrow a + c > b + c", d: "Adding or subtracting any real number from both sides preserves the inequality direction.", ex: "$5 > 3 \\Rightarrow 5 + 2 > 3 + 2$ (i.e., $7 > 5$). Works for subtraction too.", tip: "Think of both sides on a number line — shifting equally keeps the order!" },
        { title: "Multiplication (Positive)", f: "a > b,\\; c > 0 \\Rightarrow ac > bc", d: "Multiplying both sides by a POSITIVE number keeps the inequality direction.", ex: "$3 > 1 \\Rightarrow 3 \\times 2 > 1 \\times 2$ (i.e., $6 > 2$). Direction preserved.", tip: "Positive multiplier = safe! No flip needed." },
        { title: "Multiplication (Negative) — FLIP!", f: "a > b,\\; c < 0 \\Rightarrow ac < bc", d: "Multiplying or dividing by a NEGATIVE number REVERSES the inequality direction.", ex: "$3 > 1$. Multiply by $-2$: $-6 < -2$. The $>$ became $<$!", tip: "Negative multiplier = danger zone! Always flip the sign." },
        { title: "Transitive Property", f: "a > b \\text{ and } b > c \\Rightarrow a > c", d: "Inequality is transitive: if A beats B and B beats C, then A beats C.", ex: "$7 > 4$ and $4 > 1$, so $7 > 1$. Chain as many as needed.", tip: "Works like a tournament ranking!" },
        { title: "Adding Inequalities", f: "a > b \\text{ and } c > d \\Rightarrow a+c > b+d", d: "You can add two inequalities ONLY if they point in the same direction.", ex: "$5 > 2$ and $3 > 1 \\Rightarrow 8 > 3$. Never add opposite-direction inequalities.", tip: "Same direction → safe to add. Opposite → never add!" }
      ]
    }
  },
  {
    id: "oneVariable",
    title: "Solving One-Variable Inequalities",
    subtitle: "Skill 2 · Core Algebra",
    icon: "🔢",
    color: "#0891b2",
    desc: "Solve linear inequalities in one variable and express solutions in interval notation.",
    practice: generateOneVariableQuestions,
    assessment: generateOneVariableAssessment,
    learn: {
      concept: "Solving a linear inequality in one variable follows the same steps as solving an equation — with one crucial difference: dividing or multiplying by a negative number flips the inequality sign.",
      rules: [
        { title: "Solve Like an Equation", f: "ax + b < c \\Rightarrow x < \\tfrac{c-b}{a}", d: "Isolate $x$ by performing the same operation on both sides — except flip when dividing by negative.", ex: "$3x - 4 \\leq 8 \\Rightarrow 3x \\leq 12 \\Rightarrow x \\leq 4$.", tip: "Keep track of the sign of what you divide by — that's the only trap!" },
        { title: "Sign Flip Rule", f: "-2x > 6 \\Rightarrow x < -3", d: "Dividing both sides by $-2$ (a negative) flips $>$ to $<$.", ex: "$-5x \\geq 15 \\Rightarrow x \\leq -3$. The $\\geq$ flips to $\\leq$.", tip: "Negative divisor? Flip! This is THE most common exam trap." },
        { title: "Interval Notation", f: "x \\leq 4 \\Leftrightarrow (-\\infty, 4]", d: "Use $[$ or $]$ for $\\leq$/$\\geq$ (endpoint included), $($ or $)$ for $<$/$>$ (excluded). Infinity always uses $(.$", ex: "$x > -3$: $(-3, \\infty)$. $x \\leq 5$: $(-\\infty, 5]$.", tip: "Square bracket = closed = included. Round bracket = open = excluded." },
        { title: "Compound Inequalities", f: "a < bx + c < d", d: "Solve by performing the same operation on ALL three parts simultaneously.", ex: "$-3 \\leq 2x - 1 < 5 \\Rightarrow -2 \\leq 2x < 6 \\Rightarrow -1 \\leq x < 3$.", tip: "Treat it as two inequalities joined — but solve together!" }
      ]
    }
  },
  {
    id: "numberLine",
    title: "Number Line Representation",
    subtitle: "Skill 3 · Visualisation",
    icon: "📏",
    color: "#f59e0b",
    desc: "Represent solution sets on number lines using open and closed circles, and read inequalities from number line diagrams.",
    practice: generateNumberLineQuestions,
    assessment: generateNumberLineAssessment,
    learn: {
      concept: "The number line gives a visual representation of the solution set of an inequality. The key is distinguishing between strict inequalities (open circle) and non-strict inequalities (filled circle).",
      rules: [
        { title: "Open Circle: Strict Inequality", f: "x > a \\text{ or } x < a \\Rightarrow \\text{open circle at } a", d: "A hollow circle ○ at $a$ means $a$ is NOT included in the solution set.", ex: "$x > 3$: draw open circle at 3, shade right. $x < -1$: open circle at $-1$, shade left.", tip: "Open circle = strict sign ($<$ or $>$) = endpoint NOT part of the solution." },
        { title: "Closed Circle: Non-Strict", f: "x \\geq a \\text{ or } x \\leq a \\Rightarrow \\text{filled circle at } a", d: "A filled circle ● at $a$ means $a$ IS included in the solution set.", ex: "$x \\leq 2$: filled circle at 2, shade left. $x \\geq -4$: filled circle at $-4$, shade right.", tip: "Filled circle = non-strict ($\\leq$ or $\\geq$) = endpoint IS included." },
        { title: "Shading Direction", f: "x > a: \\text{shade right};\\quad x < a: \\text{shade left}", d: "Shade in the direction of the arrow that contains the solution.", ex: "$x \\geq -2$: filled circle at $-2$, shade everything to the right.", tip: "The solution region is always a ray (arrow) on the number line." },
        { title: "Compound Interval", f: "a \\leq x < b: \\text{filled at } a,\\text{ open at } b", d: "For compound inequalities, place the appropriate circle at each endpoint and shade between them.", ex: "$-1 \\leq x < 3$: filled at $-1$, open at $3$, shade segment $[-1, 3)$.", tip: "Read left endpoint first, right endpoint second!" }
      ]
    }
  },
  {
    id: "twoVariable",
    title: "Linear Inequalities in Two Variables",
    subtitle: "Skill 4 · Graphical Method",
    icon: "📐",
    color: "#ec4899",
    desc: "Graph linear inequalities in two variables, identify half-planes, and use the test-point method.",
    practice: generateTwoVariableQuestions,
    assessment: generateTwoVariableAssessment,
    learn: {
      concept: "A linear inequality in two variables divides the coordinate plane into two half-planes. The boundary is the corresponding line (dashed for strict, solid for non-strict), and the solution is one half-plane determined by a test point.",
      rules: [
        { title: "Boundary Line", f: "ax + by = c \\Rightarrow \\text{dashed if strict, solid if non-strict}", d: "Replace the inequality with $=$ to get the boundary line. Draw it dashed for $<$/$>$, solid for $\\leq$/$\\geq$.", ex: "$2x - y > 3$: dashed line $2x - y = 3$. $x + 2y \\leq 6$: solid line.", tip: "Strict sign → dashed. Non-strict → solid." },
        { title: "Test Point Method", f: "\\text{Test } (0, 0) \\text{ in } ax + by \\lessgtr c", d: "Substitute $(0, 0)$. If true, shade the origin side. If false, shade the other side.", ex: "$x + y < 4$: test $(0,0)$: $0 < 4$ ✓. Shade the origin side.", tip: "$(0,0)$ is almost always the easiest test point!" },
        { title: "Half-Plane", f: "ax + by < c: \\text{shade below/left of line}", d: "The solution is a half-plane (infinite region on one side of the boundary line).", ex: "$y < 2x + 1$: shade the region below the line $y = 2x + 1$.", tip: "Think of the line as a wall — the solution is everything on one side." },
        { title: "Non-Negativity Constraints", f: "x \\geq 0,\\; y \\geq 0 \\Rightarrow \\text{First Quadrant}", d: "When $x \\geq 0$ and $y \\geq 0$ are included, restrict the solution to Quadrant I.", ex: "In LP problems, $x \\geq 0$ and $y \\geq 0$ are always present.", tip: "First quadrant = both axes as additional boundaries!" }
      ]
    }
  },
  {
    id: "systems",
    title: "System of Linear Inequalities",
    subtitle: "Skill 5 · Feasible Regions",
    icon: "🗺️",
    color: "#7c3aed",
    desc: "Find the feasible region of a system of linear inequalities by graphing and overlapping half-planes.",
    practice: generateSystemsQuestions,
    assessment: generateSystemsAssessment,
    learn: {
      concept: "A system of linear inequalities requires all constraints to be satisfied simultaneously. The solution is the intersection (overlap) of all individual half-planes — called the feasible region.",
      rules: [
        { title: "Feasible Region", f: "\\text{Feasible Region} = \\bigcap_i H_i", d: "The feasible region is the set of all points satisfying EVERY inequality in the system simultaneously.", ex: "For $x + y \\leq 6$ and $2x + y \\leq 8$: find the overlap of both shaded half-planes.", tip: "Every point must pass ALL constraint checks." },
        { title: "Corner Points (Vertices)", f: "\\text{Vertex} = \\text{intersection of two boundary lines}", d: "The corners of the feasible region are found by solving pairs of boundary equations simultaneously.", ex: "$x + y = 6$ and $2x + y = 8 \\Rightarrow x = 2, y = 4$. Corner: $(2, 4)$.", tip: "Always verify corner points satisfy ALL inequalities." },
        { title: "Bounded vs Unbounded", f: "\\text{Bounded: closed polygon. Unbounded: extends to } \\infty", d: "A feasible region is bounded if it is enclosed (finite area). Unbounded regions extend infinitely.", ex: "Adding $x \\geq 0$, $y \\geq 0$ often bounds the region in Quadrant I.", tip: "More constraints = smaller, more likely bounded region." },
        { title: "Empty Feasible Region", f: "\\text{No common point } \\Rightarrow \\text{System inconsistent}", d: "If the constraints contradict each other, no point satisfies all simultaneously.", ex: "$x > 5$ and $x < 2$ simultaneously is impossible.", tip: "Check if constraints are compatible before graphing!" }
      ]
    }
  },
  {
    id: "wordProblems",
    title: "Word Problems & Applications",
    subtitle: "Skill 6 · Real World",
    icon: "📖",
    color: "#0369a1",
    desc: "Translate real-world scenarios into linear inequalities and solve to find feasible solutions.",
    practice: generateWordProblemsQuestions,
    assessment: generateWordProblemsAssessment,
    learn: {
      concept: "Word problems ask you to model a real-world constraint as a linear inequality. The key is identifying the unknown, translating the verbal condition into algebra, and interpreting the solution set in context.",
      rules: [
        { title: "Define the Variable", f: "\\text{Let } x = \\text{(what you are finding)}", d: "Always start by clearly stating what $x$ (or $y$) represents, including units.", ex: "\"A student must score at least 75.\" Let $x$ = exam score. Then $x \\geq 75$.", tip: "If you can't name your variable, you can't write the inequality!" },
        { title: "Key Verbal Phrases", f: "\\text{at least} = \\geq; \\; \\text{at most} = \\leq; \\; \\text{more than} = >", d: "Verbal cues map directly to inequality symbols.", ex: "\"No more than 50\" → $\\leq 50$. \"At least 30\" → $\\geq 30$.", tip: "Make a personal vocabulary card for these key phrases!" },
        { title: "Set Up and Solve", f: "\\text{Translate} \\to \\text{Simplify} \\to \\text{Interpret}", d: "Write the inequality, solve algebraically, then interpret the answer in context.", ex: "\"3 times a number minus 4 is more than 8.\" → $3x - 4 > 8 \\Rightarrow x > 4$.", tip: "Check: does your answer make sense in the original problem?" },
        { title: "Constraint Pairs", f: "D_{\\min} \\leq x \\leq D_{\\max}", d: "Many real-world problems give both a lower and upper bound, creating a compound inequality.", ex: "Temperature must be between $20°C$ and $35°C$: $20 \\leq T \\leq 35$.", tip: "Look for both upper AND lower limits in the problem statement." }
      ]
    }
  }
];

// ─── PRACTICE ENGINE — same UI as QuizEngine + Previous button ─────────────────
function LinIneqPracticeEngine({ skill, onBack, onSecondaryBack }) {
  const color = skill.color;
  const prefix = "mat";
  const nodeId = SKILL_NODE_ID_MAP[skill.id];

  const { startSession, logAnswer, finishSession } = useSessionLogger();
  const answersPayload = useRef([]);
  const sessionStartedRef = useRef(false);

  const [questionSet] = useState(() => skill.practice());
  const [current, setCurrent] = useState(0);
  // selections[i] = chosen option index or null
  const [selections, setSelections] = useState(() => new Array(20).fill(null));
  // answered[i] = true once user has committed an answer on that question
  const [answeredSet, setAnsweredSet] = useState(() => new Array(20).fill(false));
  const [timeTaken, setTimeTaken] = useState(0);
  const [finished, setFinished] = useState(false);

  // Start session once
  useEffect(() => {
    if (!nodeId || sessionStartedRef.current) return;
    sessionStartedRef.current = true;
    startSession({ nodeId, sessionType: "practice" });
    answersPayload.current = [];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Timer
  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => setTimeTaken((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [finished]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const q = questionSet[current];
  const isAnswered = answeredSet[current];
  const selected = selections[current];
  const progress = ((current + (finished ? 1 : 0)) / questionSet.length) * 100;

  const handleSelect = async (optIdx) => {
    if (isAnswered) return; // locked after first selection
    const isCorrect = optIdx === q.correct;

    setSelections((prev) => { const n = [...prev]; n[current] = optIdx; return n; });
    setAnsweredSet((prev) => { const n = [...prev]; n[current] = true; return n; });

    if (nodeId) {
      const answerData = {
        question_index: current + 1,
        answer_json: { selected: optIdx, text: q.options[optIdx] },
        is_correct: isCorrect ? 1.0 : 0.0,
        marks_awarded: isCorrect ? 1 : 0,
        marks_possible: 1,
        time_taken_ms: 0,
      };
      answersPayload.current[current] = answerData;
      await logAnswer({ questionIndex: answerData.question_index, answerJson: answerData.answer_json, isCorrect: answerData.is_correct });
    }
  };

  const handleNext = async () => {
    if (current + 1 >= questionSet.length) {
      setFinished(true);
      if (nodeId) {
        await finishSession({
          totalQuestions: questionSet.length,
          questionsAnswered: answersPayload.current.filter(Boolean).length,
          answersPayload: answersPayload.current.filter(Boolean),
        });
      }
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleRetry = () => {
    setSelections(new Array(20).fill(null));
    setAnsweredSet(new Array(20).fill(false));
    setCurrent(0);
    setTimeTaken(0);
    setFinished(false);
    answersPayload.current = [];
    sessionStartedRef.current = false;
    startSession({ nodeId, sessionType: "practice" });
    sessionStartedRef.current = true;
  };

  // ─── FINISHED SCREEN (matches QuizEngine exactly) ─────────────────────────
  if (finished) {
    const correctCount = selections.filter((s, i) => s === questionSet[i].correct).length;
    const pct = Math.round((correctCount / questionSet.length) * 100);
    const msg = pct >= 90 ? "🏆 Mastered!" : pct >= 75 ? "🌟 Great Job!" : pct >= 50 ? "👍 Keep it up!" : "💪 Keep Learning!";
    const msgSub = pct >= 90 ? "You have excellent control over this topic!" : "Review the concepts and try again for 100%.";
    const avgTime = timeTaken / questionSet.length;
    const avgTimeStr = avgTime < 60 ? `${Math.round(avgTime)}s` : formatTime(Math.round(avgTime));

    return (
      <div className={`${prefix}-quiz-finished`} style={{
        maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "48px 32px",
        background: "#fff", borderRadius: 24, border: "1px solid #e2e8f0",
        boxShadow: `0 20px 60px ${color}20`, position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
        <div className={`${prefix}-quiz-score-circle`} style={{
          width: 160, height: 160, borderRadius: "50%",
          background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`,
          margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 10px 40px ${color}30`, border: "10px solid #fff"
        }}>
          <div style={{ textAlign: "center", background: "#fff", width: 120, height: 120, borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: 44, fontWeight: 900, color, lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>Accuracy</div>
          </div>
        </div>
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 32, fontWeight: 900, color: "#0f172a", margin: "0 0 12px" }}>{msg}</h2>
        <p style={{ color: "#475569", fontSize: 16, margin: "0 0 36px", lineHeight: 1.6 }}>{msgSub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
          <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Correct Answers</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{correctCount} <span style={{ fontSize: 16, color: "#94a3b8" }}>/ {questionSet.length}</span></div>
          </div>
          <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Total Time</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{formatTime(timeTaken)}</div>
          </div>
          <div style={{ background: "#f8fafc", padding: 20, borderRadius: 16, border: "1px solid #e2e8f0", gridColumn: "span 2" }}>
            <div style={{ fontSize: 13, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Time Per Question</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>{avgTimeStr} <span style={{ fontSize: 15, color: "#94a3b8", fontWeight: 600 }}>avg.</span></div>
          </div>
        </div>
        <div className={`${prefix}-quiz-finished-actions`} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className={`${prefix}-btn-primary`} onClick={handleRetry}
            style={{ padding: "16px 32px", background: color, fontSize: 16, boxShadow: `0 8px 24px ${color}40`, flex: 1, minWidth: 200 }}>
            Try Again
          </button>
          <button className={`${prefix}-btn-secondary`} onClick={onBack}
            style={{ padding: "16px 32px", fontSize: 16, flex: 1, minWidth: 200 }}>
            Return to Skills
          </button>
        </div>
        {onSecondaryBack && (
          <button onClick={onSecondaryBack} style={{ marginTop: 24, background: "none", border: "none", color: "#64748b", fontSize: 15, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>
            Back to Chapter
          </button>
        )}
      </div>
    );
  }

  // ─── ACTIVE QUESTION (matches QuizEngine exactly, + Previous) ─────────────
  return (
    <div className={`${prefix}-quiz-active ${prefix}-quiz-container`}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div className={`${prefix}-score-header`} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Skill Practice</div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 22, fontWeight: 800, color: `var(--${prefix}-text, #1e293b)`, margin: 0 }}>{skill.title}</h3>
          </div>
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: "4px 10px", borderRadius: 8 }}>
                ⏱️ {formatTime(timeTaken)}
              </div>
              <button onClick={onBack} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#fee2e2", color: "#ef4444", border: "1px solid #fca5a5",
                padding: "4px 12px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
              }}>
                ✕ Exit
              </button>
            </div>
            <div style={{ fontSize: 13, color: `var(--${prefix}-muted)`, fontWeight: 700 }}>
              Question <span style={{ color }}>{current + 1}</span> / {questionSet.length}
            </div>
          </div>
        </div>
        <div style={{ background: "#f1f5f9", borderRadius: 10, height: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: color, borderRadius: 10, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Question Card */}
      <div className={`${prefix}-quiz-card`}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${color}15`, padding: "6px 16px", borderRadius: 10,
          fontSize: 11, fontWeight: 900, color, marginBottom: 20,
          textTransform: "uppercase", letterSpacing: 1
        }}>
          QUESTION {current + 1}
        </div>
        <div className={`${prefix}-quiz-question-text`} style={{ fontSize: 18, fontWeight: 600, color: `var(--${prefix}-text, #1e293b)`, lineHeight: 1.6, marginBottom: 24 }}>
          {q.svg && (
            <div style={{ marginBottom: 20, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: q.svg }} />
          )}
          {q.image && (
            <div style={{ marginBottom: 20, borderRadius: 16, overflow: "hidden" }}>
              <img src={q.image} alt="Problem" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          )}
          <MathRenderer text={q.question} />
        </div>

        {/* Options */}
        <div className={`${prefix}-quiz-options`}>
          {q.options.map((opt, oi) => {
            let borderColor = "rgba(0,0,0,0.04)";
            let bgColor = "#fff";
            let textColor = `var(--${prefix}-text)`;
            let dotColor = "#f1f5f9";

            if (isAnswered) {
              if (oi === q.correct) {
                borderColor = `var(--${prefix}-teal, #10b981)`;
                bgColor = "rgba(16,185,129,0.05)";
                textColor = `var(--${prefix}-teal, #10b981)`;
                dotColor = `var(--${prefix}-teal, #10b981)`;
              } else if (oi === selected) {
                borderColor = `var(--${prefix}-red, #ef4444)`;
                bgColor = "rgba(239,68,68,0.05)";
                textColor = `var(--${prefix}-red, #ef4444)`;
                dotColor = `var(--${prefix}-red, #ef4444)`;
              }
            } else if (selected === oi) {
              borderColor = color;
              bgColor = `${color}05`;
              dotColor = color;
            }

            return (
              <button
                key={oi}
                onClick={() => handleSelect(oi)}
                disabled={isAnswered}
                className={`${prefix}-quiz-option`}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "14px 16px", borderRadius: 16,
                  border: `2.5px solid ${borderColor}`,
                  background: bgColor, cursor: isAnswered ? "default" : "pointer",
                  fontSize: 14, color: textColor, textAlign: "left",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontWeight: selected === oi ? 700 : 500,
                  boxShadow: selected === oi && !isAnswered ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
                  width: "100%", minHeight: 78, lineHeight: 1.55
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: dotColor,
                  flexShrink: 0, transition: "all 0.2s", marginTop: 6
                }} />
                <span style={{ display: "block", minWidth: 0, maxWidth: "100%", fontSize: "1rem", lineHeight: 1.55, color: "inherit" }}>
                  <MathRenderer text={opt.includes("^") || opt.includes("=") || opt.includes("/") ? (opt.includes("$") ? opt : `$${opt}$`) : opt} />
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div style={{
            marginTop: 24, padding: "16px 20px", borderRadius: 12,
            background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.1)",
            color: `var(--${prefix}-muted)`, fontSize: 13.5, lineHeight: 1.6
          }}>
            <strong style={{ color: `var(--${prefix}-blue, #2563eb)` }}>💡 Explanation: </strong>
            <MathRenderer text={q.explanation} />
          </div>
        )}
      </div>

      {/* Actions: Previous | Next/Finish */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className={`${prefix}-btn-secondary`}
          style={{
            padding: "12px 28px", fontSize: 15, fontWeight: 800,
            opacity: current === 0 ? 0.35 : 1,
            cursor: current === 0 ? "not-allowed" : "pointer",
          }}
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`${prefix}-btn-primary`}
          style={{
            padding: "12px 40px",
            background: isAnswered ? color : "#f1f5f9",
            color: isAnswered ? "#fff" : "#94a3b8",
            cursor: isAnswered ? "pointer" : "not-allowed",
            border: "none", borderRadius: 100, fontSize: 15, fontWeight: 800,
            boxShadow: isAnswered ? `0 8px 20px ${color}30` : "none",
          }}
        >
          {current + 1 >= questionSet.length ? "See Final Score" : "Next Question"}
        </button>
      </div>
    </div>
  );
}

// ─── LEARN VIEW — left panel list + right panel detail (like Terminology) ─────
function LearnView({ skill, onPractice, onAssess }) {
  const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
  const rule = skill.learn.rules[selectedRuleIdx];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, justifyContent: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
          {skill.icon}
        </div>
        <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
          {skill.title}
        </h1>
      </div>

      <div style={{ background: `${skill.color}08`, borderRadius: 20, padding: "20px 28px", marginBottom: 36, border: `1px solid ${skill.color}20` }}>
        <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
          <LatexText text={skill.learn.concept} />
        </p>
      </div>

      {/* Two-panel */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 28, marginBottom: 40 }}>
        {/* Left: rule list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {skill.learn.rules.map((r, idx) => (
            <button key={idx} onClick={() => setSelectedRuleIdx(idx)} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px", borderRadius: 16, textAlign: "left",
              border: selectedRuleIdx === idx ? `2px solid ${skill.color}` : "2px solid transparent",
              background: selectedRuleIdx === idx ? `${skill.color}08` : "#fff",
              cursor: "pointer", transition: "all 0.2s"
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: selectedRuleIdx === idx ? skill.color : "#f1f5f9",
                color: selectedRuleIdx === idx ? "#fff" : "#64748b",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 13
              }}>{idx + 1}</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: selectedRuleIdx === idx ? skill.color : "#475569", lineHeight: 1.3 }}>
                {r.title}
              </span>
            </button>
          ))}
        </div>

        {/* Right: rule detail */}
        <div style={{ background: "#fff", borderRadius: 24, padding: 36, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: skill.color, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 6 }}>
            Rule {selectedRuleIdx + 1} of {skill.learn.rules.length}
          </div>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 22, fontWeight: 900, color: "#0f172a", margin: "0 0 20px" }}>
            {rule.title}
          </h2>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ display: "inline-block", background: `${skill.color}10`, padding: "14px 36px", borderRadius: 14, fontSize: 18, fontWeight: 800 }}>
              <MathRenderer text={`$${rule.f}$`} />
            </div>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#334155", marginBottom: 20 }}>
            <MathRenderer text={rule.d} />
          </p>
          <div style={{ background: "#f8fafc", borderRadius: 14, padding: "14px 18px", marginBottom: 14, border: "1px solid #e2e8f0" }}>
            <strong style={{ color: "#2563eb" }}>Example: </strong><MathRenderer text={rule.ex} />
          </div>
          <div style={{ background: "#fffbeb", borderRadius: 14, padding: "14px 18px", border: "1px solid #fef3c7" }}>
            <strong style={{ color: "#92400e" }}>💡 Tip: </strong>{rule.tip}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <button onClick={onPractice} style={{ padding: "14px 36px", background: skill.color, color: "#fff", border: "none", borderRadius: 100, fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 8px 24px ${skill.color}30` }}>
          Practice Now →
        </button>
        <button onClick={onAssess} style={{ padding: "14px 36px", background: "#fff", color: skill.color, border: `2px solid ${skill.color}`, borderRadius: 100, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          Take Assessment
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function LinIneqSkills() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

  const SubNav = ({ onBack, backLabel }) => (
    <nav className="mat-nav" style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 24px", position: "sticky", top: 0, zIndex: 40,
      background: "#fff", borderBottom: "1px solid #e2e8f0"
    }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#64748b" }}>
        {backLabel}
      </button>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
        <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
        <button style={NAV_STYLE_ACTIVE}>🎯 Skills</button>
        <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
        <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
      </div>
    </nav>
  );

  // Active skill sub-views
  if (view !== "list" && skill) {
    if (view === "assessment") {
      return (
        <div className="mat-page" style={{ background: "#f8fafc", minHeight: "100vh" }}>
          <SubNav onBack={() => setView("list")} backLabel="← Back to Skills" />
          <div style={{ padding: "24px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <AssessmentEngine
                questions={skill.assessment}
                title={skill.title}
                onBack={() => setView("list")}
                onSecondaryBack={() => navigate(BASE)}
                color={skill.color}
                prefix="mat"
                nodeId={SKILL_NODE_ID_MAP[skill.id]}
                sessionType="assessment"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mat-page" style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: 60 }}>
        <SubNav onBack={() => setView("list")} backLabel="← Back to Skills" />
        <div style={{ padding: "32px 24px 0" }}>
          {view === "learn" ? (
            <LearnView skill={skill} onPractice={() => setView("practice")} onAssess={() => setView("assessment")} />
          ) : (
            <LinIneqPracticeEngine
              key={`practice-${skill.id}`}
              skill={skill}
              onBack={() => setView("list")}
              onSecondaryBack={() => navigate(BASE)}
            />
          )}
        </div>
      </div>
    );
  }

  // ─── SKILLS LIST (vertical) ───────────────────────────────────────────────
  return (
    <div className="mat-page" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <nav className="mat-nav" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 24px", position: "sticky", top: 0, zIndex: 40,
        background: "#fff", borderBottom: "1px solid #e2e8f0"
      }}>
        <button onClick={() => navigate(BASE)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#64748b" }}>
          ← Back to Linear Inequalities
        </button>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
          <button style={NAV_STYLE_ACTIVE}>🎯 Skills</button>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
          <button style={NAV_STYLE} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
        </div>
      </nav>

      <div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Linear Inequalities <span className="det-intro-hero-highlight">Skills</span>
          </h1>
          <p className="det-intro-hero-sub">6 essential skills · Learn · Practice · Assess</p>
        </div>
      </div>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {SKILLS.map((sk, idx) => (
            <div key={sk.id} style={{
              background: "#fff", borderRadius: 20, padding: "28px 32px",
              border: "1px solid #e2e8f0", position: "relative",
              overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: sk.color }} />
              <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 200 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${sk.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                    {sk.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: sk.color, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 3 }}>
                      {sk.subtitle}
                    </div>
                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 800, margin: 0, color: "#0f172a" }}>
                      {sk.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: "6px 0 0" }}>
                      {sk.desc}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                  <button onClick={() => { setActiveSkill(idx); setView("learn"); }}
                    style={{ padding: "10px 20px", borderRadius: 12, background: `${sk.color}08`, border: `1.5px solid ${sk.color}25`, color: sk.color, fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
                    📘 Learn
                  </button>
                  <button onClick={() => { setActiveSkill(idx); setView("practice"); }}
                    style={{ padding: "10px 20px", borderRadius: 12, background: sk.color, border: "none", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", boxShadow: `0 4px 14px ${sk.color}30` }}>
                    🎯 Practice
                  </button>
                  <button onClick={() => { setActiveSkill(idx); setView("assessment"); }}
                    style={{ padding: "10px 20px", borderRadius: 12, background: "#1e1b4b", border: "none", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
                    📝 Assess
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
