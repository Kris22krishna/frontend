import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../InverseTrigonometricFunctions.css";
import MathRenderer from "../../../../../MathRenderer";
import InverseTrigonometricFunctionsTopNav from "../../InverseTrigonometricFunctionsTopNav";
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

const TERMS = [
  { name: "Inverse Function", color: "#6366f1", icon: "INV", def: "An inverse reverses a function and exists only when the original function is one-one and onto.", examples: ["Password to account access", "Roll number to student identity", "Barcode to product"], inUse: "If outputs repeat for different inputs, the inverse cannot be unique.", memory: "Reverse mapping needs one output to trace back to one input." },
  { name: "Restricted Domain", color: "#0891b2", icon: "DOM", def: "A restricted domain is a chosen interval on which a trigonometric function becomes one-one and invertible.", examples: ["$\\sin x$ on $[-\\pi/2,\\pi/2]$", "$\\cos x$ on $[0,\\pi]$", "$\\tan x$ on $(-\\pi/2,\\pi/2)$"], inUse: "We restrict domains because trig functions repeat values on $\\mathbb{R}$.", memory: "Cut the domain until each output appears once." },
  { name: "Principal Value", color: "#f59e0b", icon: "PV", def: "The principal value is the standard angle returned by an inverse trigonometric function from its principal range.", examples: ["$\\sin^{-1}(1/2)=\\pi/6$", "$\\tan^{-1}(-1)=-\\pi/4$", "Calculator outputs"], inUse: "Principal values remove ambiguity when many angles share the same trig value.", memory: "One standard answer from one standard branch." },
  { name: "sin^-1 x", color: "#ec4899", icon: "SIN", def: "$\\sin^{-1}x$ has domain $[-1,1]$ and principal range $[-\\pi/2,\\pi/2]$.", examples: ["$\\sin^{-1}(1/2)=\\pi/6$", "$\\sin(\\sin^{-1}x)=x$", "Angle from height ratio"], inUse: "It returns the unique angle in the sine branch whose sine is $x$.", memory: "Sine inverse lives in the centered branch." },
  { name: "cos^-1 x", color: "#7c3aed", icon: "COS", def: "$\\cos^{-1}x$ has domain $[-1,1]$ and principal range $[0,\\pi]$.", examples: ["$\\cos^{-1}(-1/2)=2\\pi/3$", "$\\cos(\\cos^{-1}x)=x$", "Navigation angles"], inUse: "It returns the unique angle in $[0,\\pi]$ whose cosine is $x$.", memory: "Cos inverse spans the top half-turn." },
  { name: "tan^-1 x", color: "#10b981", icon: "TAN", def: "$\\tan^{-1}x$ is defined for all real $x$ and has principal range $(-\\pi/2,\\pi/2)$.", examples: ["$\\tan^{-1}(1)=\\pi/4$", "$\\tan(\\tan^{-1}x)=x$", "Slope to angle"], inUse: "It is useful when converting slope or ramp ratio into an angle.", memory: "Tan inverse stays between vertical asymptotes." },
  { name: "cot^-1 x", color: "#ef4444", icon: "COT", def: "$\\cot^{-1}x$ is defined for all real $x$ and has principal range $(0,\\pi)$.", examples: ["$\\cot^{-1}(-1)=3\\pi/4$", "Reciprocal slope", "Complement identities"], inUse: "Its principal values stay inside the open interval $(0,\\pi)$.", memory: "Cot inverse avoids 0 and $\\pi$." },
  { name: "sec^-1 x and cosec^-1 x", color: "#06b6d4", icon: "SEC", def: "$\\sec^{-1}x$ and $\\csc^{-1}x$ are defined only for values outside $(-1,1)$.", examples: ["$\\sec^{-1}(2)=\\pi/3$", "$\\csc^{-1}(-2)=-\\pi/6$", "Reciprocal scaling"], inUse: "Reciprocal trig functions never take values between -1 and 1.", memory: "Reciprocal branches live outside the middle strip." },
];

const RULES = [
  { num: 1, title: "Inverse Exists Only for One-One and Onto Functions", rule: "Inverse exists only when the function is one-one and onto.", color: "#6366f1", detail: "A function can be reversed only if every output comes from exactly one input and the codomain is fully covered.", examples: ["Check whether inverse exists", "Verify if function is one-one", "Determine if function is onto"], tip: "Test uniqueness first, then full coverage." },
  { num: 2, title: "Need for Domain Restriction", rule: "Trigonometric functions are not one-one on $\\mathbb{R}$, so we restrict domains.", color: "#0891b2", detail: "Functions like $\\sin x$ and $\\cos x$ repeat values periodically, so they cannot be inverted over all real numbers.", examples: ["Why $\\sin x$ has no inverse on $\\mathbb{R}$", "Restricted interval for invertibility", "Choosing one shift or time slot"], tip: "If outputs repeat, inverse fails until the domain is cut down." },
  { num: 3, title: "Principal Value Branch", rule: "Every inverse trig function returns values only from its standard principal range.", color: "#f59e0b", detail: "Principal value branches give a standard answer and keep inverse trig functions single-valued.", examples: ["Range of $\\sin^{-1}x$", "Range of $\\cos^{-1}x$", "Calculator-angle output"], tip: "Always check whether the final angle lies in the principal range." },
  { num: 4, title: "Basic Inverse Identities", rule: "\\sin(\\sin^{-1}x)=x,\\ \\cos(\\cos^{-1}x)=x,\\ \\tan(\\tan^{-1}x)=x", color: "#10b981", detail: "These identities hold whenever $x$ lies in the domain of the inverse function.", examples: ["Encode-decode idea", "Undo operation", "Reverse calculation"], tip: "Direct trig of its matching inverse usually collapses to $x$." },
  { num: 5, title: "Composite Expressions Need Range Checking", rule: "\\sin^{-1}(\\sin x),\\ \\cos^{-1}(\\cos x),\\ \\tan^{-1}(\\tan x) depend on principal range.", color: "#ec4899", detail: "The inverse returns the equivalent principal-value angle, not automatically the original angle.", examples: ["$\\sin^{-1}(\\sin 3\\pi/4)=\\pi/4$", "$\\cos^{-1}(\\cos x)$ needs interval checking", "$\\tan^{-1}(\\tan x)$ needs branch checking"], tip: "Do not cancel inverse and trig blindly in this order." },
  { num: 6, title: "Important Transformations", rule: "\\sin^{-1}x + \\cos^{-1}x = \\pi/2", color: "#7c3aed", detail: "Complementary relationships help simplify expressions quickly in inverse trig.", examples: ["Complementary angles", "Right triangle relationships", "Expression simplification"], tip: "Whenever both $\\sin^{-1}x$ and $\\cos^{-1}x$ appear, look for $\\pi/2$." },
];

const QUIZ = [
  { question: "Inverse of a function exists only when the function is:", options: ["Continuous", "One-one and onto", "Periodic", "Even"], correct: 1, explanation: "Both one-one and onto are needed for a proper inverse." },
  { question: "Why does $\\sin x$ not have an inverse on $\\mathbb{R}$?", options: ["It is undefined", "It is not one-one", "Its range is too large", "It is not periodic"], correct: 1, explanation: "$\\sin x$ repeats values many times, so it is not one-one on all real numbers." },
  { question: "The principal range of $\\sin^{-1}x$ is:", options: ["$[0,\\pi]$", "$[-\\pi/2,\\pi/2]$", "$(0,\\pi)$", "$(-\\pi/2,\\pi/2)$"], correct: 1, explanation: "$\\sin^{-1}x$ returns angles only from $[-\\pi/2,\\pi/2]$." },
  { question: "The principal range of $\\cos^{-1}x$ is:", options: ["$[0,\\pi]$", "$[-\\pi/2,\\pi/2]$", "$(0,\\pi)$", "$(-\\pi/2,\\pi/2)$"], correct: 0, explanation: "$\\cos^{-1}x$ returns angles from $[0,\\pi]$." },
  { question: "Evaluate $\\tan^{-1}(1)$.", options: ["$\\pi/6$", "$\\pi/4$", "$\\pi/3$", "$3\\pi/4$"], correct: 1, explanation: "The principal angle whose tangent is 1 is $\\pi/4$." },
  { question: "Evaluate $\\sin^{-1}(\\sin 3\\pi/4)$.", options: ["$3\\pi/4$", "$\\pi/4$", "$-\\pi/4$", "$\\pi/2$"], correct: 1, explanation: "The sine is $\\sqrt{2}/2$, and the principal angle with that sine is $\\pi/4$." },
];

export default function InverseTrigonometricFunctionsTerminology() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("terms");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizTotalScore, setQuizTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const quizPayload = React.useRef([]);
  const { startSession, logAnswer, finishSession } = useSessionLogger();

  const activeTerm = TERMS[selectedIdx];
  const activeRule = RULES[selectedRuleIdx];
  const activeQuiz = QUIZ[quizIdx];

  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizAnswered(false);
    setQuizTotalScore(0);
    setQuizFinished(false);
    quizPayload.current = [];
    startSession({ nodeId: NODE_IDS.g12MathITFTerminologyQuiz, sessionType: 'practice' });
  };

  const handleQuizSelect = (optIdx) => {
    if (quizAnswered) return;
    setQuizSelected(optIdx);
    setQuizAnswered(true);
    const correct = optIdx === activeQuiz.correct;
    if (correct) setQuizTotalScore((score) => score + 1);

    const answerData = {
      question_index: quizIdx + 1,
      answer_json: { selected: optIdx, text: activeQuiz.options[optIdx] },
      is_correct: correct ? 1.0 : 0.0,
      marks_awarded: correct ? 1 : 0,
      marks_possible: 1
    };
    quizPayload.current.push(answerData);

    logAnswer({
      questionIndex: answerData.question_index,
      answerJson: answerData.answer_json,
      isCorrect: answerData.is_correct
    });
  };

  const nextQuiz = () => {
    if (quizIdx + 1 < QUIZ.length) {
      setQuizIdx((index) => index + 1);
      setQuizSelected(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
      finishSession({
        totalQuestions: QUIZ.length,
        questionsAnswered: quizIdx + 1,
        answersPayload: quizPayload.current
      });
    }
  };

  return (
    <div className="itf-terminology-page">
      <style>{`
        .itf-details-window-anim { animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .itf-term-btn { display:flex; align-items:center; gap:10px; padding:12px 14px; min-height:64px; border-radius:14px; border:1.5px solid rgba(0,0,0,0.06); cursor:pointer; transition:all 0.25s cubic-bezier(0.4,0,0.2,1); text-align:left; font-family:'Outfit',sans-serif; position:relative; overflow:hidden; box-sizing:border-box; }
        .itf-term-btn::before { content:""; position:absolute; inset:0; background:#fff; z-index:0; transition:opacity 0.2s; opacity:1; }
        .itf-term-btn:hover { transform:translateY(-2px); box-shadow:0 6px 15px rgba(0,0,0,0.08); }
        .itf-term-btn:hover::before { opacity:0.9; }
        .itf-term-btn.active { transform:translateY(-1px); box-shadow:0 8px 20px rgba(0,0,0,0.1); z-index:2; }
        .itf-term-btn.active::before { opacity:0; }
        .itf-term-btn > * { position:relative; z-index:1; }
        .itf-tab-row { display:flex; justify-content:center; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
        .itf-tab { padding:10px 18px; border-radius:100px; border:1.5px solid #e2e8f0; background:#f8fafc; color:#64748b; font-size:15px; font-weight:700; cursor:pointer; transition:all 0.2s ease; }
        .itf-tab:hover { border-color:#0891b2; color:#0891b2; background:rgba(8,145,178,0.06); }
        .itf-tab.active { background:linear-gradient(135deg, #0891b2, #06b6d4); border-color:transparent; color:#fff; box-shadow:0 4px 14px rgba(8,145,178,0.35); }
        .itf-lexicon-grid { display:grid; grid-template-columns:minmax(300px, 360px) 1fr; gap:16px; align-items:start; }
        .itf-selector-container { background:rgba(255,255,255,0.7); padding:14px; border-radius:20px; border:1px solid rgba(0,0,0,0.05); display:grid; gap:10px; backdrop-filter:blur(10px); }
        .itf-selector-container--terms { grid-template-columns:1fr 1fr; }
        .itf-selector-container--rules { grid-template-columns:1fr; }
        .itf-details-window { background:#ffffff; border-radius:20px; padding:20px 28px; box-shadow:0 8px 24px rgba(0,0,0,0.03); border:2px solid rgba(99,102,241,0.08); min-height:330px; }
        .itf-quiz-card { max-width:700px; margin:0 auto; background:#fff; border-radius:24px; padding:32px; box-shadow:0 10px 40px rgba(0,0,0,0.06); border:1px solid rgba(0,0,0,0.04); }
        .itf-primary-btn { padding:12px 24px; border-radius:100px; border:none; background:linear-gradient(135deg, #0369a1, #0891b2, #06b6d4); color:#fff; font-weight:800; cursor:pointer; box-shadow:0 4px 15px rgba(8,145,178,0.28); transition:all 0.25s ease; }
        .itf-primary-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(8,145,178,0.35); }
        @media (max-width: 1024px) { .itf-lexicon-grid { grid-template-columns: 1fr; } .itf-selector-container { max-width: 600px; margin: 0 auto 16px; } }
        @media (max-width: 640px) { .itf-tab { font-size:13px; padding:9px 14px; } .itf-selector-container--terms { grid-template-columns:1fr; } }
      `}</style>

      <InverseTrigonometricFunctionsTopNav active="terminology" backLabel="Back to Inverse Trigonometric Functions" />

      <div className="itf-lexicon-container" style={{ maxWidth: 1100, margin: "40px auto 20px", padding: "0 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 20 }}>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.6rem", fontWeight: 900, color: "var(--rel-text)", margin: "0 0 8px" }}>
            Inverse Trigonometric Functions{" "}
            <span style={{ background: "linear-gradient(135deg, var(--rel-teal), var(--rel-indigo))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Vocabulary
            </span>
          </h1>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--rel-muted)", letterSpacing: 0.5 }}>
            {activeTab === "quiz" ? "Test your knowledge with interactive inverse-trig questions!" : `Select any ${activeTab === "terms" ? "term" : "rule"} below to explore details.`}
          </div>
        </div>

        <div className="itf-tab-row">
          <button className={`itf-tab ${activeTab === "terms" ? "active" : ""}`} onClick={() => setActiveTab("terms")}>Terminology</button>
          <button className={`itf-tab ${activeTab === "rules" ? "active" : ""}`} onClick={() => setActiveTab("rules")}>Crucial Rules</button>
          <button className={`itf-tab ${activeTab === "quiz" ? "active" : ""}`} onClick={() => { setActiveTab("quiz"); resetQuiz(); }}>Vocab Check</button>
        </div>

        {activeTab !== "quiz" ? (
          <div className="itf-lexicon-grid">
            <aside className={`itf-selector-container ${activeTab === "terms" ? "itf-selector-container--terms" : "itf-selector-container--rules"}`}>
              {activeTab === "terms"
                ? TERMS.map((term, i) => {
                    const isActive = selectedIdx === i;
                    return (
                      <button key={term.name} className={`itf-term-btn ${isActive ? "active" : ""}`} onClick={() => setSelectedIdx(i)} style={{ background: isActive ? `linear-gradient(135deg, ${term.color}, ${term.color}dd)` : `linear-gradient(135deg, ${term.color}10, ${term.color}05)`, borderColor: isActive ? term.color : `${term.color}20` }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? "rgba(255,255,255,0.25)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: isActive ? "#fff" : term.color }}>{term.icon}</div>
                        <span style={{ fontWeight: 800, fontSize: 13, color: isActive ? "#fff" : "var(--rel-text)", lineHeight: 1.1 }}>{term.name}</span>
                      </button>
                    );
                  })
                : RULES.map((rule, i) => {
                    const isActive = selectedRuleIdx === i;
                    return (
                      <button key={rule.title} className={`itf-term-btn ${isActive ? "active" : ""}`} onClick={() => setSelectedRuleIdx(i)} style={{ background: isActive ? `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)` : `linear-gradient(135deg, ${rule.color}10, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20` }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? "rgba(255,255,255,0.25)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: isActive ? "#fff" : rule.color }}>{i + 1}</div>
                        <span style={{ fontWeight: 800, fontSize: 14, color: isActive ? "#fff" : "var(--rel-text)" }}>{rule.title}</span>
                      </button>
                    );
                  })}
            </aside>

            <main className="itf-details-window-anim itf-details-window" key={activeTab === "terms" ? selectedIdx : `r${selectedRuleIdx}`}>
              {activeTab === "terms" ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeTerm.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: activeTerm.color }}>{activeTerm.icon}</div>
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                  </div>
                  <p style={{ fontSize: 17, color: "var(--rel-text)", lineHeight: 1.6, margin: "0 0 24px" }}><MathRenderer text={activeTerm.def} /></p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                    <div style={{ background: `${activeTerm.color}05`, padding: 16, borderRadius: 16, border: `1px solid ${activeTerm.color}15` }}>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: activeTerm.color, marginBottom: 8, marginTop: 0 }}>Real-Life Examples</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, color: "var(--rel-text)", fontSize: 14 }}>
                        {activeTerm.examples.map((example) => <li key={example} style={{ marginBottom: 6 }}><MathRenderer text={example} /></li>)}
                      </ul>
                    </div>
                    <div style={{ background: "#f8fafc", padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)" }}>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: "var(--rel-muted)", marginBottom: 8, marginTop: 0 }}>In Use</h4>
                      <p style={{ margin: "0 0 14px", fontSize: 14, lineHeight: 1.6 }}><MathRenderer text={activeTerm.inUse} /></p>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: "#059669", marginBottom: 8, marginTop: 0 }}>Memory Hook</h4>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#047857" }}>{activeTerm.memory}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: activeRule.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900 }}>#{activeRule.num}</div>
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 24, fontWeight: 900, color: activeRule.color, margin: 0 }}>{activeRule.title}</h2>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.5)", padding: 16, borderRadius: 12, borderLeft: `4px solid ${activeRule.color}`, marginBottom: 20 }}>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "var(--rel-text)", margin: 0 }}><MathRenderer text={activeRule.rule} /></p>
                  </div>
                  <p style={{ fontSize: 16, color: "var(--rel-muted)", lineHeight: 1.6, margin: "0 0 24px" }}><MathRenderer text={activeRule.detail} /></p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
                    <div style={{ background: `${activeRule.color}05`, padding: 16, borderRadius: 16, border: `1px solid ${activeRule.color}15` }}>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: activeRule.color, marginBottom: 8, marginTop: 0 }}>Problem Lens</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, color: "var(--rel-text)", fontSize: 14 }}>
                        {activeRule.examples.map((example) => <li key={example} style={{ marginBottom: 6 }}><MathRenderer text={example} /></li>)}
                      </ul>
                    </div>
                    <div style={{ background: "rgba(16,185,129,0.05)", padding: 16, borderRadius: 16, border: "1px solid rgba(16,185,129,0.15)" }}>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: "#059669", marginBottom: 8, marginTop: 0 }}>Pro Tip</h4>
                      <p style={{ margin: 0, fontSize: 14, color: "#047857", lineHeight: 1.5, fontWeight: 500 }}>{activeRule.tip}</p>
                    </div>
                  </div>
                </>
              )}
            </main>
          </div>
        ) : (
          <div className="itf-quiz-card">
            {quizFinished ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: "var(--rel-text)", marginBottom: 12 }}>Quiz Complete</h2>
                <p style={{ fontSize: 18, color: "var(--rel-muted)", marginBottom: 32 }}>You scored <strong>{quizTotalScore}</strong> out of {QUIZ.length}.</p>
                <button className="itf-primary-btn" onClick={resetQuiz}>Retry Quiz</button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "var(--rel-teal)", textTransform: "uppercase", letterSpacing: 1 }}>Question {quizIdx + 1} of {QUIZ.length}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rel-muted)" }}>Score: {quizTotalScore}</div>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--rel-text)", lineHeight: 1.5, marginBottom: 24 }}><MathRenderer text={activeQuiz.question} /></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {activeQuiz.options.map((option, i) => {
                    const isSelected = quizSelected === i;
                    const isCorrect = i === activeQuiz.correct;
                    let bg = "#fff"; let borderColor = "rgba(0,0,0,0.1)"; let color = "var(--rel-text)";
                    if (quizAnswered) {
                      if (isCorrect) { bg = "rgba(16,185,129,0.1)"; borderColor = "#10b981"; color = "#047857"; }
                      else if (isSelected) { bg = "rgba(239,68,68,0.1)"; borderColor = "#ef4444"; color = "#b91c1c"; }
                      else { bg = "#f8fafc"; color = "var(--rel-muted)"; }
                    }
                    return <button key={`${option}-${i}`} onClick={() => handleQuizSelect(i)} disabled={quizAnswered} style={{ padding: "16px 20px", borderRadius: 16, border: `2px solid ${borderColor}`, background: bg, color, fontSize: 16, fontWeight: 600, textAlign: "left", cursor: quizAnswered ? "default" : "pointer" }}><MathRenderer text={option} /></button>;
                  })}
                </div>
                {quizAnswered && <div className="itf-details-window-anim" style={{ background: "rgba(99,102,241,0.05)", padding: 20, borderRadius: 16, borderLeft: "4px solid #6366f1", display: "flex", flexDirection: "column", gap: 16 }}><p style={{ margin: 0, fontSize: 15, color: "var(--rel-text)", lineHeight: 1.6 }}><strong style={{ color: "#4f46e5" }}>Explanation:</strong> <MathRenderer text={activeQuiz.explanation} /></p><button className="itf-primary-btn" onClick={nextQuiz} style={{ alignSelf: "flex-end" }}>{quizIdx + 1 === QUIZ.length ? "Finish Quiz" : "Next Question"}</button></div>}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button onClick={() => navigate("/senior/grade/12/inverse-trigonometric-functions/skills")} style={{ padding: "10px 28px", fontSize: 13, borderRadius: 100, border: "none", background: "var(--rel-indigo)", color: "#fff", fontWeight: 800, cursor: "pointer" }}>Ready to Solve</button>
        </div>
      </div>
    </div>
  );
}
