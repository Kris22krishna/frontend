import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Functions.css";
import MathRenderer from "../../../../../MathRenderer";
import FunctionsTopNav from "../../FunctionsTopNav";
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';

const TERMS = [
  {
    name: "Function",
    color: "#6366f1",
    icon: "FN",
    def: "A relation is a function if each input has exactly one output.",
    examples: ["$\\{(1,2),(2,3),(3,4)\\}$ is a function", "$\\{(2,3),(2,5)\\}$ is not a function", "Student to roll number", "Aadhaar number to person"],
    inUse: "Whenever one value determines exactly one other value, the rule behaves like a function.",
    memory: "One input, one output.",
  },
  {
    name: "Domain",
    color: "#0891b2",
    icon: "DM",
    def: "The domain is the set of all allowed input values of a function.",
    examples: ["For $f(x)=\\frac{1}{x-5}$, $x \\neq 5$", "For $\\sqrt{16-x^2}$, we need $-4 \\le x \\le 4$", "Students mapping to marks"],
    inUse: "To find domain, exclude values that make the expression impossible or undefined.",
    memory: "Domain means who is allowed to enter.",
  },
  {
    name: "Codomain",
    color: "#f59e0b",
    icon: "CD",
    def: "The codomain is the target set in which the outputs of a function are expected to lie.",
    examples: ["If $f: A \\to B$, then $B$ is the codomain", "Products to prices", "Days to temperatures"],
    inUse: "Range sits inside the codomain, but it may not fill it completely.",
    memory: "Codomain is the destination board.",
  },
  {
    name: "Range",
    color: "#ec4899",
    icon: "RG",
    def: "The range is the set of actual output values taken by the function.",
    examples: ["For $\\{(1,7),(2,5),(3,5)\\}$, range is $\\{7,5\\}$", "For $f(x)=|x|$, range is $[0,\\infty)$", "Marks obtained by students"],
    inUse: "Read the outputs or study the expression to see what values are produced.",
    memory: "Range is what the function really delivers.",
  },
  {
    name: "Identity Function",
    color: "#7c3aed",
    icon: "ID",
    def: "The identity function maps every input to itself: $f(x)=x$.",
    examples: ["Mirror reflection", "Copy-paste without change", "$f(f(x))=x$"],
    inUse: "The graph of the identity function is the line $y=x$.",
    memory: "Input and output wear the same name tag.",
  },
  {
    name: "Constant Function",
    color: "#10b981",
    icon: "CF",
    def: "A constant function gives the same output for every input: $f(x)=c$.",
    examples: ["Fixed salary", "Flat delivery charge", "Common bonus for all"],
    inUse: "Its range has only one value, no matter how wide the domain is.",
    memory: "Everything goes in, the same answer comes out.",
  },
  {
    name: "Polynomial Function",
    color: "#ef4444",
    icon: "PF",
    def: "A polynomial function is built from powers of $x$ with non-negative integer exponents.",
    examples: ["$x^2+3x+1$", "Projectile motion models", "Area formulas"],
    inUse: "Polynomials are defined for all real numbers.",
    memory: "No denominator in $x$ and no root in $x$.",
  },
  {
    name: "Rational Function",
    color: "#06b6d4",
    icon: "RF",
    def: "A rational function is a quotient of two polynomial functions.",
    examples: ["$\\frac{1}{x+2}$", "Speed-like ratios", "Efficiency formulas"],
    inUse: "Domain excludes denominator zeros.",
    memory: "A fraction in $x$ means watch the denominator first.",
  },
  {
    name: "Modulus Function",
    color: "#8b5cf6",
    icon: "MF",
    def: "The modulus function gives the non-negative magnitude: $f(x)=|x|$.",
    examples: ["Distance", "Error magnitude", "Temperature difference"],
    inUse: "$|x|$ reflects negative inputs upward to positive values.",
    memory: "Absolute value keeps size, drops sign.",
  },
  {
    name: "Greatest Integer Function",
    color: "#14b8a6",
    icon: "GIF",
    def: "The greatest integer function returns the greatest integer less than or equal to $x$.",
    examples: ["$[2.7]=2$", "$[-1.2]=-2$", "Step billing"],
    inUse: "It changes in jumps, not smoothly.",
    memory: "Always step down to the nearest integer on the left.",
  },
];

const SIX_RULES = [
  {
    num: 1,
    title: "Function Test",
    rule: "Each input must have exactly one output.",
    color: "#6366f1",
    detail: "To check whether a relation is a function, inspect repeated first coordinates. If one input is paired with two different outputs, the relation fails the function rule.",
    examples: ["$\\{(1,2),(2,3),(3,4)\\}$ is a function", "$\\{(2,3),(2,5),(4,6)\\}$ is not a function", "$R=\\{(x,|x|):x\\in \\mathbb{R}\\}$ is a function"],
    tip: "Repeated outputs are fine. Repeated inputs with different outputs are not.",
  },
  {
    num: 2,
    title: "Domain Restrictions",
    rule: "Exclude values that make the expression undefined.",
    color: "#0891b2",
    detail: "For rational functions, denominator cannot be zero. For square roots in real numbers, the quantity inside must be non-negative. For roots in the denominator, it must be strictly positive.",
    examples: ["$\\frac{1}{x-5}: x \\neq 5$", "$\\frac{x}{x^2+3x+2}: x \\neq -1,-2$", "$\\frac{1}{\\sqrt{x^2-1}}: x<-1$ or $x>1$"],
    tip: "Denominator zero and impossible roots are the fastest domain traps.",
  },
  {
    num: 3,
    title: "Range Thinking",
    rule: "Study what output values the expression can actually produce.",
    color: "#f59e0b",
    detail: "Squares and absolute values are non-negative, square roots are never negative, and constant functions return one fixed value.",
    examples: ["$|x| \\ge 0$", "$\\sqrt{16-x^2}$ lies in $[0,4]$", "$2-\\sqrt{x-5} \\le 2$"],
    tip: "Ask for the smallest possible output and the largest possible output.",
  },
  {
    num: 4,
    title: "Types of Functions",
    rule: "Recognize the form before solving the question.",
    color: "#10b981",
    detail: "Identity, constant, polynomial, rational, modulus, and greatest integer functions each come with standard behavior.",
    examples: ["$f(x)=x$ identity", "$f(x)=5$ constant", "$f(x)=x^2+3x+1$ polynomial", "$f(x)=|x|$ modulus"],
    tip: "Spot the form first, then use the familiar behavior of that family.",
  },
  {
    num: 5,
    title: "Algebra of Functions",
    rule: "Operate on outputs pointwise.",
    color: "#ec4899",
    detail: "For addition, subtraction, multiplication, and scalar multiplication, operate directly on $f(x)$ and $g(x)$. For quotient, also keep the restriction $g(x) \\neq 0$.",
    examples: ["$(f-g)(x)=f(x)-g(x)$", "$(fg)(x)=f(x)g(x)$", "$(2f)(3)=2f(3)$"],
    tip: "Write the formula first, simplify second, and then apply restrictions if division appears.",
  },
  {
    num: 6,
    title: "Solve Function Equations Carefully",
    rule: "Set outputs equal and solve the resulting algebraic equation.",
    color: "#7c3aed",
    detail: "Problems like $f(x)=g(x)$ or direct evaluations such as $f(3)+g(-5)$ reduce to substitution and algebra.",
    examples: ["Solve $2x^2-1=1-3x$", "Find $f(3)+g(-5)$", "Find all $x$ where two functions agree"],
    tip: "Translate the function statement into plain algebra, then solve it line by line.",
  },
];

const VOCAB_QUIZ = [
  { question: "Which statement best defines a function?", options: ["Each output has exactly one input", "Each input has exactly one output", "Every relation is a function", "Each input has at least two outputs"], correct: 1, explanation: "The defining rule is: each input must be mapped to exactly one output." },
  { question: "Find the domain of $f(x)=\\frac{1}{x-5}$.", options: ["All real numbers", "$x \\neq 5$", "$x>5$", "$x<5$"], correct: 1, explanation: "The denominator cannot be zero, so $x=5$ is excluded." },
  { question: "What is the range of $f(x)=|x|$?", options: ["All real numbers", "$(-\\infty,0]$", "$[0,\\infty)$", "$\\{0\\}$"], correct: 2, explanation: "Absolute value is never negative." },
  { question: "Which of the following is a constant function?", options: ["$f(x)=x$", "$f(x)=5$", "$f(x)=x^2+1$", "$f(x)=|x|$"], correct: 1, explanation: "A constant function returns the same value for every input." },
  { question: "What is $[2.7]$ in the greatest integer function?", options: ["3", "2", "2.7", "1"], correct: 1, explanation: "The greatest integer less than or equal to 2.7 is 2." },
  { question: "If $f(x)=x$ then $f(f(x))$ equals:", options: ["$0$", "$1$", "$x$", "$x^2$"], correct: 2, explanation: "Applying the identity function twice still gives $x$." },
];

export default function FunctionsTerminology() {
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
  const activeRule = SIX_RULES[selectedRuleIdx];
  const activeQuiz = VOCAB_QUIZ[quizIdx];

  const resetQuiz = () => {
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizAnswered(false);
    setQuizTotalScore(0);
    setQuizFinished(false);
    quizPayload.current = [];
    startSession({ nodeId: NODE_IDS.g12MathFunctionsTerminologyQuiz, sessionType: 'practice' });
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
    if (quizIdx + 1 < VOCAB_QUIZ.length) {
      setQuizIdx((index) => index + 1);
      setQuizSelected(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
      finishSession({
        totalQuestions: VOCAB_QUIZ.length,
        questionsAnswered: quizIdx + 1,
        answersPayload: quizPayload.current
      });
    }
  };

  return (
    <div className="rel-terminology-page">
      <style>{`
        .rel-details-window-anim {
          animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .rel-term-btn-mini {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1.5px solid rgba(0,0,0,0.06);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .rel-term-btn-mini::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #fff;
          z-index: 0;
          transition: opacity 0.2s;
          opacity: 1;
        }
        .rel-term-btn-mini:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
        }
        .rel-term-btn-mini:hover::before {
          opacity: 0.9;
        }
        .rel-term-btn-mini.active {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          z-index: 2;
        }
        .rel-term-btn-mini.active::before {
          opacity: 0;
        }
        .rel-term-btn-mini > * {
          position: relative;
          z-index: 1;
        }
        @media (max-width: 1024px) {
          .rel-lexicon-grid {
            grid-template-columns: 1fr !important;
          }
          .rel-selector-container {
            max-width: 600px;
            margin: 0 auto 16px;
          }
        }
      `}</style>
      <FunctionsTopNav active="terminology" backLabel="Back to Functions" />

      <div className="rel-lexicon-container" style={{ maxWidth: 1100, margin: "20px auto 40px", padding: "0 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 20 }}>
          <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.1rem", fontWeight: 900, color: "var(--rel-text)", margin: "0 0 6px" }}>
            Functions{" "}
            <span style={{ background: "linear-gradient(135deg, var(--rel-teal), var(--rel-indigo))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Vocabulary
            </span>
          </h1>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--rel-muted)", letterSpacing: 0.5 }}>
            {activeTab === "quiz"
              ? "Test your knowledge with interactive questions!"
              : `Select any ${activeTab === "terms" ? "term" : "rule"} below to explore details.`}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          <button className={`rel-tab ${activeTab === "terms" ? "active" : ""}`} onClick={() => setActiveTab("terms")}>Terminology</button>
          <button className={`rel-tab ${activeTab === "rules" ? "active" : ""}`} onClick={() => setActiveTab("rules")}>Crucial Rules</button>
          <button className={`rel-tab ${activeTab === "quiz" ? "active" : ""}`} onClick={() => { setActiveTab("quiz"); resetQuiz(); }}>Vocab Check</button>
        </div>

        {activeTab !== "quiz" ? (
          <div className="rel-lexicon-grid" style={{ display: "grid", gridTemplateColumns: "minmax(300px, 360px) 1fr", gap: 16, alignItems: "start" }}>
            <aside style={{ background: "rgba(255,255,255,0.7)", padding: "14px", borderRadius: 20, border: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: activeTab === "terms" ? "1fr 1fr" : "1fr", gap: 10, backdropFilter: "blur(10px)" }}>
              {activeTab === "terms"
                ? TERMS.map((term, i) => {
                    const isActive = selectedIdx === i;
                    return (
                      <button key={term.name} className={`rel-term-btn-mini ${isActive ? "active" : ""}`} onClick={() => setSelectedIdx(i)} style={{ background: isActive ? `linear-gradient(135deg, ${term.color}, ${term.color}dd)` : `linear-gradient(135deg, ${term.color}10, ${term.color}05)`, borderColor: isActive ? term.color : `${term.color}20`, gridColumn: TERMS.length % 2 !== 0 && i === TERMS.length - 1 ? "span 2" : "span 1", justifyContent: TERMS.length % 2 !== 0 && i === TERMS.length - 1 ? "center" : "flex-start" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? "rgba(255,255,255,0.25)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: isActive ? "#fff" : term.color }}>
                          {term.icon}
                        </div>
                        <span style={{ fontWeight: 800, fontSize: 14, color: isActive ? "#fff" : "var(--rel-text)", lineHeight: 1.1 }}>{term.name}</span>
                      </button>
                    );
                  })
                : SIX_RULES.map((rule, i) => {
                    const isActive = selectedRuleIdx === i;
                    return (
                      <button key={rule.title} className={`rel-term-btn-mini ${isActive ? "active" : ""}`} onClick={() => setSelectedRuleIdx(i)} style={{ background: isActive ? `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)` : `linear-gradient(135deg, ${rule.color}10, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20` }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? "rgba(255,255,255,0.25)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: isActive ? "#fff" : rule.color }}>
                          {i + 1}
                        </div>
                        <span style={{ fontWeight: 800, fontSize: 14, color: isActive ? "#fff" : "var(--rel-text)" }}>{rule.title}</span>
                      </button>
                    );
                  })}
            </aside>

            <main className="rel-details-window-anim" key={activeTab === "terms" ? selectedIdx : `r${selectedRuleIdx}`} style={{ background: "#ffffff", borderRadius: 20, padding: "20px 28px", boxShadow: "0 8px 24px rgba(0,0,0,0.03)", border: "2px solid rgba(99,102,241,0.08)", minHeight: 330 }}>
              {activeTab === "terms" ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeTerm.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: activeTerm.color }}>
                      {activeTerm.icon}
                    </div>
                    <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: 28, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                  </div>
                  <p style={{ fontSize: 17, color: "var(--rel-text)", lineHeight: 1.6, margin: "0 0 24px" }}>
                    <MathRenderer text={activeTerm.def} />
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                    <div style={{ background: `${activeTerm.color}05`, padding: 16, borderRadius: 16, border: `1px solid ${activeTerm.color}15` }}>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: activeTerm.color, marginBottom: 8, marginTop: 0 }}>Examples</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, color: "var(--rel-text)", fontSize: 14 }}>
                        {activeTerm.examples.map((example) => (
                          <li key={example} style={{ marginBottom: 6 }}>
                            <MathRenderer text={example} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ background: "#f8fafc", padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)" }}>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: "var(--rel-muted)", marginBottom: 8, marginTop: 0 }}>In Use</h4>
                      <p style={{ margin: "0 0 14px", fontSize: 14, lineHeight: 1.6 }}>
                        <MathRenderer text={activeTerm.inUse} />
                      </p>
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
                    <p style={{ fontSize: 18, fontWeight: 800, color: "var(--rel-text)", margin: 0 }}>
                      <MathRenderer text={activeRule.rule} />
                    </p>
                  </div>
                  <p style={{ fontSize: 16, color: "var(--rel-muted)", lineHeight: 1.6, margin: "0 0 24px" }}>
                    <MathRenderer text={activeRule.detail} />
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
                    <div style={{ background: `${activeRule.color}05`, padding: 16, borderRadius: 16, border: `1px solid ${activeRule.color}15` }}>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: activeRule.color, marginBottom: 8, marginTop: 0 }}>In Action</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, color: "var(--rel-text)", fontSize: 14 }}>
                        {activeRule.examples.map((example) => (
                          <li key={example} style={{ marginBottom: 6 }}>
                            <MathRenderer text={example} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ background: "rgba(16, 185, 129, 0.05)", padding: 16, borderRadius: 16, border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                      <h4 style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: 1, color: "#059669", marginBottom: 8, marginTop: 0 }}>Pro Tip</h4>
                      <p style={{ margin: 0, fontSize: 14, color: "#047857", lineHeight: 1.5, fontWeight: 500 }}>{activeRule.tip}</p>
                    </div>
                  </div>
                </>
              )}
            </main>
          </div>
        ) : (
          <div className="rel-quiz-container" style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)" }}>
            {quizFinished ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <h2 style={{ fontSize: 28, fontWeight: 900, color: "var(--rel-text)", marginBottom: 12 }}>Quiz Complete</h2>
                <p style={{ fontSize: 18, color: "var(--rel-muted)", marginBottom: 32 }}>
                  You scored <strong>{quizTotalScore}</strong> out of {VOCAB_QUIZ.length}.
                </p>
                <button className="rel-btn-primary" onClick={resetQuiz} style={{ padding: "12px 24px", background: "var(--rel-indigo)" }}>Retry Quiz</button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "var(--rel-teal)", textTransform: "uppercase", letterSpacing: 1 }}>
                    Question {quizIdx + 1} of {VOCAB_QUIZ.length}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rel-muted)" }}>Score: {quizTotalScore}</div>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--rel-text)", lineHeight: 1.5, marginBottom: 24 }}>
                  <MathRenderer text={activeQuiz.question} />
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {activeQuiz.options.map((option, i) => (
                    <button key={option} onClick={() => handleQuizSelect(i)} disabled={quizAnswered} style={{ padding: "16px 20px", borderRadius: 16, border: `2px solid ${quizAnswered && i === activeQuiz.correct ? "#10b981" : "rgba(0,0,0,0.1)"}`, background: quizAnswered && i === activeQuiz.correct ? "rgba(16, 185, 129, 0.1)" : "#fff", fontSize: 16, fontWeight: 600, textAlign: "left" }}>
                      <MathRenderer text={option} />
                    </button>
                  ))}
                </div>
                {quizAnswered && (
                  <div className="rel-details-window-anim" style={{ background: "rgba(99, 102, 241, 0.05)", padding: 20, borderRadius: 16, borderLeft: "4px solid #6366f1", display: "flex", flexDirection: "column", gap: 16 }}>
                    <p style={{ margin: 0, fontSize: 15, color: "var(--rel-text)", lineHeight: 1.6 }}>
                      <strong style={{ color: "#4f46e5" }}>Explanation:</strong>{" "}
                      <MathRenderer text={activeQuiz.explanation} />
                    </p>
                    <button className="rel-btn-primary" onClick={nextQuiz} style={{ alignSelf: "flex-end" }}>
                      {quizIdx + 1 === VOCAB_QUIZ.length ? "Finish Quiz" : "Next Question"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button onClick={() => navigate("/senior/grade/12/functions/skills")} style={{ padding: "10px 28px", fontSize: 13, borderRadius: 100, border: "none", background: "var(--rel-indigo)", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
            Ready to Solve
          </button>
        </div>
      </div>
    </div>
  );
}
