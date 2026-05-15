import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../class-12/Matrices/Matrices.css";
import MathRenderer from "../../../../../../MathRenderer";
import { LatexText } from "../../../../../../LatexText";
import {
  generateAnglesQuestions, generateAnglesAssessment,
  generateTrigValuesQuestions, generateTrigValuesAssessment,
  generateSignsQuestions, generateSignsAssessment,
  generateAlliedAnglesQuestions, generateAlliedAnglesAssessment,
  generateSumDiffQuestions, generateSumDiffAssessment,
  generateTrigEquationsQuestions, generateTrigEquationsAssessment,
} from "./trigQuestions";
import AssessmentEngine from "../../../../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine";
import { NODE_IDS } from "@/lib/curriculumIds";
import { useSessionLogger } from "@/hooks/useSessionLogger";

const BASE = "/senior/grade/11/maths/trigonometric-functions";

const SKILL_NODE_ID_MAP = {
  angles:     NODE_IDS.g11MathTrigFuncRadians,
  trigvalues: NODE_IDS.g11MathTrigFuncTrigValues,
  signs:      NODE_IDS.g11MathTrigFuncGraphs,
  allied:     NODE_IDS.g11MathTrigFuncRules,
  sumdiff:    NODE_IDS.g11MathTrigFuncSumDiff,
  equations:  NODE_IDS.g11MathTrigFuncEquations,
};

const SKILLS = [
  {
    id: "angles",
    title: "Angles & Radian Measure",
    subtitle: "Skill 1 · Foundations",
    icon: "📐",
    color: "#0891b2",
    desc: "Convert between degrees and radians, calculate arc length and sector area using the unit circle.",
    practice: generateAnglesQuestions,
    assessment: generateAnglesAssessment,
    learn: {
      concept: "Angles are the building blocks of trigonometry. Converting between degrees and radians using π rad = 180° is the first essential skill. Radian measure makes arc length simple: l = rθ.",
      rules: [
        { title: "Degree to Radian", f: "\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\times \\frac{\\pi}{180}", d: "Multiply degrees by π/180 to get radians.", ex: "$60° \\times \\frac{\\pi}{180} = \\frac{\\pi}{3}$ rad.", tip: "Remember: π = 180°, 2π = 360°, π/2 = 90°!" },
        { title: "Radian to Degree", f: "\\theta_{\\text{deg}} = \\theta_{\\text{rad}} \\times \\frac{180}{\\pi}", d: "Multiply radians by 180/π to get degrees.", ex: "$\\frac{\\pi}{4} \\times \\frac{180}{\\pi} = 45°$.", tip: "Divide the numerator: cancel π, multiply by 180!" },
        { title: "Arc Length", f: "l = r\\theta \\quad (\\theta \\text{ in radians})", d: "Arc length = radius × angle in radians.", ex: "$r = 5$, $\\theta = \\frac{\\pi}{3}$: $l = 5 \\cdot \\frac{\\pi}{3} = \\frac{5\\pi}{3}$.", tip: "Always convert degrees to radians first!" },
        { title: "Sector Area", f: "A = \\frac{1}{2}r^2\\theta \\quad (\\theta \\text{ in radians})", d: "Area of the 'pie slice' = half × radius² × angle.", ex: "$r = 6$, $\\theta = \\frac{\\pi}{2}$: $A = \\frac{1}{2} \\cdot 36 \\cdot \\frac{\\pi}{2} = 9\\pi$.", tip: "Remember the ½ — it's like area of a triangle!" }
      ]
    }
  },
  {
    id: "trigvalues",
    title: "Trigonometric Values",
    subtitle: "Skill 2 · Standard Angles",
    icon: "📊",
    color: "#7c3aed",
    desc: "Find exact values of sin, cos, tan, cosec, sec, cot at standard angles 0°, 30°, 45°, 60°, 90°.",
    practice: generateTrigValuesQuestions,
    assessment: generateTrigValuesAssessment,
    learn: {
      concept: "Memorizing the trig table for 0°, 30°, 45°, 60°, 90° is essential. Notice the beautiful pattern: sin goes 0, 1/2, 1/√2, √3/2, 1 — just counting 0,1,2,3,4 under the square root divided by 2!",
      rules: [
        { title: "Sin Values", f: "\\sin 0° = 0, \\sin 30° = \\frac{1}{2}, \\sin 45° = \\frac{1}{\\sqrt{2}}, \\sin 60° = \\frac{\\sqrt{3}}{2}, \\sin 90° = 1", d: "Pattern: sin increases from 0 to 1 as angle goes from 0° to 90°.", ex: "$\\sin 30° = \\frac{1}{2}$. $\\sin 60° = \\frac{\\sqrt{3}}{2} \\approx 0.866$.", tip: "sin values: √0/2, √1/2, √2/2, √3/2, √4/2 — spot the pattern!" },
        { title: "Cos Values", f: "\\cos 0° = 1, \\cos 30° = \\frac{\\sqrt{3}}{2}, \\cos 45° = \\frac{1}{\\sqrt{2}}, \\cos 60° = \\frac{1}{2}, \\cos 90° = 0", d: "cos is the mirror image of sin! cos(θ) = sin(90° − θ).", ex: "$\\cos 60° = \\frac{1}{2} = \\sin 30°$.", tip: "cos goes down while sin goes up — they're complementary!" },
        { title: "Tan Values", f: "\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}", d: "tan = sin÷cos. tan 30° = 1/√3, tan 45° = 1, tan 60° = √3, tan 90° = undefined.", ex: "$\\tan 45° = \\frac{\\sin 45°}{\\cos 45°} = \\frac{1/\\sqrt{2}}{1/\\sqrt{2}} = 1$.", tip: "tan 45° = 1 (equal sin and cos). tan 90° blows up (cos 90° = 0)!" },
        { title: "Pythagorean Identity", f: "\\sin^2\\theta + \\cos^2\\theta = 1", d: "The MOST important identity — use it to find one value from the other.", ex: "If $\\sin\\theta = 3/5$, then $\\cos^2\\theta = 1 - 9/25 = 16/25$, so $\\cos\\theta = 4/5$.", tip: "Also gives: sec²θ = 1 + tan²θ and cosec²θ = 1 + cot²θ!" }
      ]
    }
  },
  {
    id: "signs",
    title: "Signs & Quadrant Analysis",
    subtitle: "Skill 3 · ASTC Rule",
    icon: "🧭",
    color: "#f59e0b",
    desc: "Apply the ASTC rule to determine signs of trig functions in any quadrant.",
    practice: generateSignsQuestions,
    assessment: generateSignsAssessment,
    learn: {
      concept: "The coordinate plane is divided into 4 quadrants. Knowing which trig functions are positive in each quadrant (ASTC rule) lets you handle any angle instantly.",
      rules: [
        { title: "ASTC Mnemonic", f: "\\text{All → Sin → Tan → Cos}", d: "'All Students Take Calculus' — positive functions in Q1, Q2, Q3, Q4 respectively.", ex: "Q2 (90°–180°): only Sin (and cosec) positive. All others negative.", tip: "ASTC = Add Sugar To Coffee. The first letter of each word!" },
        { title: "Quadrant I (0°–90°)", f: "\\text{All six functions positive}", d: "Both coordinates positive: x > 0, y > 0. So sin, cos, tan all positive.", ex: "$\\sin 60° = +\\frac{\\sqrt{3}}{2}$.", tip: "Q1 is the 'happy' quadrant — everything positive!" },
        { title: "Quadrant II (90°–180°)", f: "\\sin > 0, \\cos < 0, \\tan < 0", d: "y > 0 but x < 0. sin is y-coord (positive), cos is x-coord (negative).", ex: "$\\sin 120° = \\sin 60° = \\frac{\\sqrt{3}}{2} > 0$. $\\cos 120° = -\\frac{1}{2} < 0$.", tip: "In Q2, only the 'S' in ASTC — only Sin is positive!" },
        { title: "Quadrants III & IV", f: "\\text{Q3: Tan positive} \\quad \\text{Q4: Cos positive}", d: "Q3 (180°–270°): both negative → sin<0, cos<0, but tan = sin/cos > 0. Q4: x>0, y<0.", ex: "$\\sin 210° = -\\sin 30° = -\\frac{1}{2}$. $\\cos 330° = +\\frac{\\sqrt{3}}{2}$.", tip: "Remember: 'Tan' in Q3 and 'Cos' in Q4!" }
      ]
    }
  },
  {
    id: "allied",
    title: "Allied Angles",
    subtitle: "Skill 4 · Related Angles",
    icon: "🔄",
    color: "#ec4899",
    desc: "Evaluate trig functions of angles related to π/2, π, 3π/2, 2π using transformation rules.",
    practice: generateAlliedAnglesQuestions,
    assessment: generateAlliedAnglesAssessment,
    learn: {
      concept: "Allied angles are angles that are multiples of 90° ± θ. The key rule: if the multiple is ODD (π/2, 3π/2), the trig function changes (sin↔cos, tan↔cot). If EVEN (π, 2π), it stays the same.",
      rules: [
        { title: "π/2 ± θ (Function changes)", f: "\\sin(\\frac{\\pi}{2} \\pm \\theta) = \\cos\\theta \\quad \\cos(\\frac{\\pi}{2} \\pm \\theta) = \\mp\\sin\\theta", d: "Angle near 90° (odd multiple): sin becomes cos, cos becomes sin. Sign from ASTC.", ex: "$\\sin(90°+\\theta) = \\cos\\theta$. $\\cos(90°-\\theta) = \\sin\\theta$.", tip: "Odd multiple of 90° → function swaps. Remember: co-function!" },
        { title: "π ± θ (Function stays)", f: "\\sin(\\pi \\pm \\theta) = \\mp\\sin\\theta \\quad \\cos(\\pi \\pm \\theta) = -\\cos\\theta", d: "π is an even multiple of π/2. Function name stays the same, sign from ASTC.", ex: "$\\sin(\\pi - \\theta) = \\sin\\theta$. $\\sin(\\pi + \\theta) = -\\sin\\theta$.", tip: "π ± θ lands in Q2 or Q3. Check ASTC for the sign!" },
        { title: "3π/2 ± θ (Function changes)", f: "\\sin(\\frac{3\\pi}{2} \\pm \\theta) = -\\cos\\theta \\quad \\cos(\\frac{3\\pi}{2} \\pm \\theta) = \\pm\\sin\\theta", d: "3π/2 is odd multiple of π/2. Function name changes, sign from ASTC.", ex: "$\\cos(270°+\\theta) = \\sin\\theta$.", tip: "3π/2 ± θ lands in Q3 or Q4. Track the sign carefully!" },
        { title: "Even-Odd Functions", f: "\\sin(-\\theta) = -\\sin\\theta, \\quad \\cos(-\\theta) = \\cos\\theta", d: "Sine is odd: negative input flips the sign. Cosine is even: negative input doesn't change value.", ex: "$\\sin(-45°) = -\\frac{1}{\\sqrt{2}}$. $\\cos(-60°) = \\cos(60°) = \\frac{1}{2}$.", tip: "Even function: symmetric about y-axis. Odd function: symmetric about origin!" }
      ]
    }
  },
  {
    id: "sumdiff",
    title: "Sum & Difference Formulas",
    subtitle: "Skill 5 · Compound Angles",
    icon: "➕",
    color: "#10b981",
    desc: "Apply sin(A±B), cos(A±B), tan(A±B) formulas and double-angle formulas.",
    practice: generateSumDiffQuestions,
    assessment: generateSumDiffAssessment,
    learn: {
      concept: "Compound angle formulas let you evaluate trig functions of sums and differences. They unlock non-standard angles like 15°, 75°, 105° and lead to double-angle and half-angle formulas.",
      rules: [
        { title: "sin(A ± B)", f: "\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B", d: "The sign between terms matches the sign in the argument.", ex: "$\\sin 75° = \\sin(45°+30°) = \\sin 45°\\cos 30° + \\cos 45°\\sin 30° = \\frac{\\sqrt{6}+\\sqrt{2}}{4}$.", tip: "sin(A+B): mixed terms. sin×cos + cos×sin!" },
        { title: "cos(A ± B)", f: "\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B", d: "Note: the sign FLIPS! cos(A+B) has a minus between cos·cos and sin·sin.", ex: "$\\cos 75° = \\cos(45°+30°) = \\cos 45°\\cos 30° - \\sin 45°\\sin 30° = \\frac{\\sqrt{6}-\\sqrt{2}}{4}$.", tip: "cos(A+B) has OPPOSITE sign — easy to forget!" },
        { title: "Double Angle: sin 2A", f: "\\sin 2A = 2\\sin A \\cos A", d: "Set B = A in sin(A+B). The most useful double-angle formula!", ex: "$\\sin 60° = \\sin(2 \\times 30°) = 2\\sin 30°\\cos 30° = 2 \\cdot \\frac{1}{2} \\cdot \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}}{2}$.", tip: "Think of sin 2A as 'twice the product of sin and cos'!" },
        { title: "Double Angle: cos 2A", f: "\\cos 2A = \\cos^2 A - \\sin^2 A = 1 - 2\\sin^2 A = 2\\cos^2 A - 1", d: "Three equivalent forms — choose based on what's given!", ex: "If $\\sin A = \\frac{3}{5}$, $\\cos 2A = 1 - 2 \\cdot \\frac{9}{25} = 1 - \\frac{18}{25} = \\frac{7}{25}$.", tip: "Three forms = three weapons. Pick the one that cancels!" }
      ]
    }
  },
  {
    id: "equations",
    title: "Trigonometric Equations",
    subtitle: "Skill 6 · General Solutions",
    icon: "🔧",
    color: "#6366f1",
    desc: "Find general solutions of sin x = k, cos x = k, tan x = k, and quadratic trig equations.",
    practice: generateTrigEquationsQuestions,
    assessment: generateTrigEquationsAssessment,
    learn: {
      concept: "Trig equations have infinitely many solutions because trig functions are periodic. The 'general solution' captures all of them using integer n. Always find the principal value first, then apply the general formula.",
      rules: [
        { title: "sinx = sinα → General Solution", f: "x = n\\pi + (-1)^n \\alpha, \\; n \\in \\mathbb{Z}", d: "Works because sin has period 2π and is symmetric about π/2.", ex: "$\\sin x = \\frac{1}{2} = \\sin\\frac{\\pi}{6}$. General solution: $x = n\\pi + (-1)^n \\frac{\\pi}{6}$.", tip: "The (-1)ⁿ flips sign alternately to cover both Q1 and Q2 solutions!" },
        { title: "cosx = cosα → General Solution", f: "x = 2n\\pi \\pm \\alpha, \\; n \\in \\mathbb{Z}", d: "cos is symmetric about the x-axis (both +α and −α give same cos).", ex: "$\\cos x = \\frac{1}{2} = \\cos\\frac{\\pi}{3}$. Solution: $x = 2n\\pi \\pm \\frac{\\pi}{3}$.", tip: "The ± covers both positive and negative angles with same cosine!" },
        { title: "tanx = tanα → General Solution", f: "x = n\\pi + \\alpha, \\; n \\in \\mathbb{Z}", d: "tan has period π — simpler than sin or cos!", ex: "$\\tan x = 1 = \\tan\\frac{\\pi}{4}$. Solution: $x = n\\pi + \\frac{\\pi}{4}$.", tip: "Tan repeats every π, so just add nπ to the principal value!" },
        { title: "Special Cases", f: "\\sin x = 0 \\Rightarrow x = n\\pi \\quad \\cos x = 0 \\Rightarrow x = (2n+1)\\frac{\\pi}{2}", d: "These zero cases are frequently tested. Tan x = 0 same as sin x = 0.", ex: "$\\sin x = 0$: $x = 0, \\pm\\pi, \\pm 2\\pi$. $\\cos x = 0$: $x = \\pm\\frac{\\pi}{2}, \\pm\\frac{3\\pi}{2}$.", tip: "For sinx=0: every multiple of π. For cosx=0: every ODD multiple of π/2!" }
      ]
    }
  }
];

// ─── CUSTOM PRACTICE ENGINE (with Previous button and state preservation) ────
function TrigPracticeEngine({ questions, title, color, onBack, nodeId }) {
  const { startSession, logAnswer, finishSession } = useSessionLogger();
  const answersPayload = useRef([]);
  const sessionStartedRef = useRef(false);

  const [questionSet] = useState(() => typeof questions === 'function' ? questions() : questions);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questionSet.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [questionTimes, setQuestionTimes] = useState(Array(questionSet.length).fill(0));
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Start session once on mount
  useEffect(() => {
    if (!nodeId || sessionStartedRef.current) return;
    sessionStartedRef.current = true;
    startSession({ nodeId, sessionType: 'practice' });
    answersPayload.current = [];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    timerRef.current = setInterval(() => setTimeTaken(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startTimeRef.current = Date.now();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [current]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const q = questionSet[current];
  const isAnswered = answers[current] !== null;

  const handleSelect = async (idx) => {
    if (isAnswered) return;
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setQuestionTimes(t => { const n = [...t]; n[current] = elapsed; return n; });
    setAnswers(a => { const n = [...a]; n[current] = idx; return n; });

    if (nodeId) {
      const isCorrect = idx === q.correct;
      const answerData = {
        question_index: current + 1,
        answer_json: { selected: idx, text: q.options[idx] },
        is_correct: isCorrect ? 1.0 : 0.0,
        marks_awarded: isCorrect ? 1 : 0,
        marks_possible: 1,
        time_taken_ms: elapsed * 1000,
      };
      answersPayload.current[current] = answerData;
      await logAnswer({ questionIndex: answerData.question_index, answerJson: answerData.answer_json, isCorrect: answerData.is_correct });
    }
  };

  const handleNext = async () => {
    if (current + 1 >= questionSet.length) {
      setFinished(true);
      clearInterval(timerRef.current);
      if (nodeId) {
        const payload = answersPayload.current.filter(Boolean);
        await finishSession({ totalQuestions: questionSet.length, questionsAnswered: payload.length, answersPayload: payload });
      }
      return;
    }
    setCurrent(c => c + 1);
  };
  const handlePrev = () => { if (current > 0) setCurrent(c => c - 1); };

  if (finished) {
    const score = answers.reduce((acc, ans, i) => acc + (ans === questionSet[i].correct ? 1 : 0), 0);
    const pct = Math.round((score / questionSet.length) * 100);
    const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';

    return (
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '48px 32px', background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: `0 20px 60px ${color}20`, position: 'relative', overflow: 'hidden', marginBottom: 40 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
          <div style={{ width: 160, height: 160, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`, margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 40px ${color}30`, border: '10px solid #fff' }}>
            <div style={{ textAlign: 'center', background: '#fff', width: 120, height: 120, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 44, fontWeight: 900, color, lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>Accuracy</div>
            </div>
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>{msg}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Correct</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{score} / {questionSet.length}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Total Time</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{formatTime(timeTaken)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onBack} style={{ padding: '16px 32px', background: color, color: '#fff', border: 'none', borderRadius: 100, fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: `0 8px 24px ${color}40` }}>Back to Skills</button>
          </div>
        </div>

        {/* Summary Report */}
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, color: '#1e293b' }}>Practice Report</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questionSet.map((q, idx) => {
            const isCorrect = answers[idx] === q.correct;
            return (
              <div key={idx} style={{ padding: 24, borderRadius: 16, border: `2px solid ${isCorrect ? '#10b981' : '#ef4444'}`, background: isCorrect ? 'rgba(16,185,129,0.04)' : 'rgba(239,68,68,0.04)' }}>
                <div style={{ fontWeight: 800, marginBottom: 10, color: isCorrect ? '#10b981' : '#ef4444', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Q{idx + 1} — {isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>⏱ {formatTime(questionTimes[idx])}</span>
                </div>
                {q.svg && <div style={{ marginBottom: 12, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />}
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 16, lineHeight: 1.6 }}>
                  <MathRenderer text={q.question} />
                </div>
                {/* All options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginBottom: 12 }}>
                  {q.options.map((opt, oi) => {
                    const isUserChoice = answers[idx] === oi;
                    const isCorrectOpt = q.correct === oi;
                    let bg = '#f8fafc', border = '1px solid #e2e8f0', clr = '#475569';
                    if (isCorrectOpt) { bg = 'rgba(16,185,129,0.08)'; border = '1.5px solid #10b981'; clr = '#059669'; }
                    if (isUserChoice && !isCorrectOpt) { bg = 'rgba(239,68,68,0.08)'; border = '1.5px solid #ef4444'; clr = '#dc2626'; }
                    return (
                      <div key={oi} style={{ padding: '10px 14px', borderRadius: 10, background: bg, border, color: clr, fontSize: 13, fontWeight: isCorrectOpt || isUserChoice ? 700 : 500 }}>
                        {isCorrectOpt ? '✓ ' : isUserChoice ? '✗ ' : ''}<MathRenderer text={opt} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ background: 'rgba(59,130,246,0.05)', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(59,130,246,0.1)', fontSize: 13, color: '#475569' }}>
                  <strong style={{ color: '#2563eb' }}>💡 </strong><MathRenderer text={q.explanation} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const progress = ((current + (isAnswered ? 1 : 0)) / questionSet.length) * 100;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Practice Mode</div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#1e293b', margin: 0 }}>{title}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 13, color, fontWeight: 800, background: `${color}15`, padding: '4px 10px', borderRadius: 8 }}>⏱️ {formatTime(timeTaken)}</div>
            <button onClick={onBack} style={{ background: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', padding: '4px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>✕ Exit</button>
          </div>
        </div>
        <div style={{ marginTop: 12, color: '#64748b', fontSize: 13, fontWeight: 700 }}>Question {current + 1} / {questionSet.length}</div>
        <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden', marginTop: 8 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Question Card */}
      <div style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: 20 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '6px 16px', borderRadius: 10, fontSize: 11, fontWeight: 900, color, marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
          QUESTION {current + 1}
        </div>
        {q.svg && <div style={{ marginBottom: 20, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: q.svg }} />}
        <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', lineHeight: 1.6, marginBottom: 24 }}>
          <MathRenderer text={q.question} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.options.map((opt, oi) => {
            const isUserChoice = answers[current] === oi;
            const isCorrectOpt = q.correct === oi;
            let borderColor = 'rgba(0,0,0,0.04)', bgColor = '#fff', textColor = '#1e293b';
            if (isAnswered) {
              if (isCorrectOpt) { borderColor = '#10b981'; bgColor = 'rgba(16,185,129,0.05)'; textColor = '#059669'; }
              else if (isUserChoice) { borderColor = '#ef4444'; bgColor = 'rgba(239,68,68,0.05)'; textColor = '#dc2626'; }
            } else if (isUserChoice) { borderColor = color; bgColor = `${color}05`; }
            return (
              <button key={oi} onClick={() => handleSelect(oi)} disabled={isAnswered} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderRadius: 16, border: `2.5px solid ${borderColor}`, background: bgColor, cursor: isAnswered ? 'default' : 'pointer', fontSize: 14, color: textColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: isUserChoice ? 700 : 500, width: '100%', minHeight: 58, lineHeight: 1.55 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: isAnswered ? (isCorrectOpt ? '#10b981' : isUserChoice ? '#ef4444' : '#f1f5f9') : (isUserChoice ? color : '#f1f5f9'), flexShrink: 0, marginTop: 6, transition: 'all 0.2s' }} />
                <span style={{ display: 'block', minWidth: 0 }}>
                  <MathRenderer text={opt.includes('^') || opt.includes('=') || opt.includes('/') || opt.includes('\\') ? (opt.includes('$') ? opt : `$${opt}$`) : opt} />
                </span>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)', color: '#475569', fontSize: 13.5, lineHeight: 1.6 }}>
            <strong style={{ color: '#2563eb' }}>💡 Explanation: </strong><MathRenderer text={q.explanation} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
        <button onClick={handlePrev} disabled={current === 0} style={{ flex: 1, maxWidth: 160, padding: '12px 24px', borderRadius: 100, background: '#fff', border: '1px solid #e2e8f0', color: '#475569', fontWeight: 700, fontSize: 15, cursor: current === 0 ? 'not-allowed' : 'pointer', opacity: current === 0 ? 0.4 : 1 }}>
          ← Previous
        </button>
        <button onClick={handleNext} disabled={!isAnswered} style={{ flex: 1, maxWidth: 220, padding: '12px 24px', borderRadius: 100, background: isAnswered ? color : '#f1f5f9', color: isAnswered ? '#fff' : '#94a3b8', border: 'none', fontWeight: 800, fontSize: 15, cursor: isAnswered ? 'pointer' : 'not-allowed', boxShadow: isAnswered ? `0 8px 20px ${color}30` : 'none' }}>
          {current + 1 >= questionSet.length ? 'See Report' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function TrigSkills() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [activeSkill, setActiveSkill] = useState(null);
  const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

  if (view !== "list" && skill) {
    return (
      <div className="mat-page" style={{ background: "#f8fafc", minHeight: "100vh" }}>
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
          <button onClick={() => { setView("list"); setSelectedLearnIdx(0); window.scrollTo(0,0); }} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#64748b" }}>← Back to Skills</button>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
            <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
            <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "linear-gradient(135deg, #1e1b4b, #312e81)", color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(30,27,75,0.3)" }}>🎯 Skills</button>
            <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
            <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
          </div>
        </nav>

        <div style={{ padding: "32px 24px 60px" }}>
          {view === "learn" ? (
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              {/* Title row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, justifyContent: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{skill.icon}</div>
                <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{skill.title}</h1>
              </div>

              {/* Terminology-style sidebar + panel */}
              <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 28 }}>

                {/* LEFT SIDEBAR */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {/* Concept box at top of sidebar */}
                  <div style={{ background: `${skill.color}08`, borderRadius: 16, padding: "16px 18px", border: `1px solid ${skill.color}20`, marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 900, color: skill.color, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Overview</div>
                    <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}><LatexText text={skill.learn.concept} /></p>
                  </div>

                  {/* Rule selector buttons */}
                  {skill.learn.rules.map((rule, idx) => (
                    <button key={idx} onClick={() => setSelectedLearnIdx(idx)} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 14,
                      border: selectedLearnIdx === idx ? `2px solid ${skill.color}` : "2px solid transparent",
                      background: selectedLearnIdx === idx ? `${skill.color}08` : "#fff",
                      cursor: "pointer", textAlign: "left", transition: "all 0.2s"
                    }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: selectedLearnIdx === idx ? `${skill.color}20` : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: selectedLearnIdx === idx ? skill.color : "#94a3b8", flexShrink: 0 }}>
                        {idx + 1}
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 14, color: selectedLearnIdx === idx ? skill.color : "#475569", lineHeight: 1.3 }}>{rule.title}</span>
                    </button>
                  ))}

                  {/* Action buttons at bottom of sidebar */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                    <button onClick={() => setView("practice")} style={{ padding: "11px 20px", background: skill.color, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: `0 4px 16px ${skill.color}30` }}>
                      🎯 Practice Now →
                    </button>
                    <button onClick={() => setView("assessment")} style={{ padding: "11px 20px", background: "#fff", color: skill.color, border: `2px solid ${skill.color}`, borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                      📝 Take Assessment
                    </button>
                  </div>
                </div>

                {/* RIGHT DETAIL PANEL */}
                {skill.learn.rules[selectedLearnIdx] && (() => {
                  const r = skill.learn.rules[selectedLearnIdx];
                  return (
                    <div style={{ background: "#fff", borderRadius: 24, padding: 40, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize: 11, fontWeight: 900, color: skill.color, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8 }}>Rule {selectedLearnIdx + 1} of {skill.learn.rules.length}</div>
                      <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 26, fontWeight: 900, margin: "0 0 24px", color: "#0f172a" }}>{r.title}</h2>

                      {/* Formula */}
                      <div style={{ background: `${skill.color}08`, padding: "20px 28px", borderRadius: 16, border: `1px solid ${skill.color}15`, marginBottom: 24, textAlign: "center" }}>
                        <div style={{ fontSize: 11, fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>Formula</div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}><MathRenderer text={`$${r.f}$`} /></div>
                      </div>

                      {/* Description */}
                      <div style={{ background: "#f8fafc", padding: "18px 22px", borderRadius: 14, border: "1px solid #e2e8f0", marginBottom: 16 }}>
                        <div style={{ fontSize: 11, fontWeight: 900, color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>📖 Explanation</div>
                        <div style={{ fontSize: 15, lineHeight: 1.7, color: "#334155" }}><MathRenderer text={r.d} /></div>
                      </div>

                      {/* Example */}
                      <div style={{ background: "#eff6ff", padding: "16px 20px", borderRadius: 14, border: "1px solid #bfdbfe", marginBottom: 16 }}>
                        <div style={{ fontSize: 11, fontWeight: 900, color: "#2563eb", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>🧮 Example</div>
                        <div style={{ fontSize: 14, color: "#1e40af", lineHeight: 1.6 }}><MathRenderer text={r.ex} /></div>
                      </div>

                      {/* Tip */}
                      <div style={{ background: "#fffbeb", padding: "16px 20px", borderRadius: 14, border: "1px solid #fef3c7" }}>
                        <div style={{ fontSize: 11, fontWeight: 900, color: "#92400e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>💡 Tip</div>
                        <div style={{ fontSize: 14, color: "#92400e", lineHeight: 1.6 }}>{r.tip}</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : view === "practice" ? (
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <TrigPracticeEngine
                key={`practice-${skill.id}`}
                questions={skill.practice}
                title={skill.title}
                color={skill.color}
                onBack={() => setView("list")}
                nodeId={SKILL_NODE_ID_MAP[skill.id]}
              />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mat-page" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", position: "sticky", top: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <button onClick={() => navigate(BASE)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#64748b" }}>← Back to Trigonometric Functions</button>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Intro</button>
          <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
          <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "linear-gradient(135deg, #1e1b4b, #312e81)", color: "#fff", border: "none", boxShadow: "0 4px 14px rgba(30,27,75,0.3)" }}>🎯 Skills</button>
          <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
          <button style={{ padding: "8px 18px", borderRadius: "100px", fontSize: "14px", fontWeight: 700, cursor: "pointer", background: "#f8fafc", color: "#64748b", border: "1.5px solid #e2e8f0" }} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
        </div>
      </nav>

      <div className="det-intro-hero" style={{ padding: "16px 24px 20px" }}>
        <div className="det-intro-hero-deco det-intro-hero-deco-a" />
        <div className="det-intro-hero-deco det-intro-hero-deco-b" />
        <div className="det-intro-hero-inner">
          <h1 className="det-intro-hero-title">
            Trigonometric Functions <span className="det-intro-hero-highlight">Skills</span>
          </h1>
          <p className="det-intro-hero-sub">6 essential skills · Learn · Practice (with Previous) · Assess</p>
        </div>
      </div>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SKILLS.map((sk, idx) => (
            <div key={sk.id} style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", border: "1px solid #e2e8f0", position: "relative", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 5, height: "100%", background: sk.color }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${sk.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{sk.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: sk.color, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 2 }}>{sk.subtitle}</div>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 800, margin: "0 0 4px", color: "#0f172a" }}>{sk.title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, margin: 0 }}>{sk.desc}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                <button onClick={() => { setActiveSkill(idx); setView("learn"); }} style={{ padding: "9px 18px", borderRadius: 10, background: `${sk.color}08`, border: `1.5px solid ${sk.color}30`, color: sk.color, fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>📘 Learn</button>
                <button onClick={() => { setActiveSkill(idx); setView("practice"); }} style={{ padding: "9px 18px", borderRadius: 10, background: sk.color, border: "none", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", boxShadow: `0 4px 14px ${sk.color}30`, whiteSpace: "nowrap" }}>🎯 Practice</button>
                <button onClick={() => { setActiveSkill(idx); setView("assessment"); }} style={{ padding: "9px 18px", borderRadius: 10, background: "#1e1b4b", border: "none", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>📝 Assess</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
