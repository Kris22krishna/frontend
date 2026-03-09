import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Eye, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../../../../services/api";
import { LatexText } from "../../../../../LatexText";
import ExplanationModal from "../../../../../ExplanationModal";
import "../../../MatrixPracticeSession.css";

const SKILL_ID = 12301;
const SKILL_NAME = "Determinants — Topic 1: Introduction to Determinants";

const DeterminantsEasyTest = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const questionStartTime = useRef(Date.now());
  const accumulatedTime = useRef(0);
  const isTabActive = useRef(true);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const CORRECT_MSGS = [
    "✨ Amazing! ✨",
    "🌟 Brilliant! 🌟",
    "🎉 Correct! 🎉",
    "🚀 Super! 🚀",
    "💎 Spot on! 💎",
  ];

  useEffect(() => {
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
    const qs = [
      {
        text: "The determinant of a $1 \\times 1$ matrix $A = [a]$ is equal to:",
        options: shuffle(["$a$", "$|a|$", "$0$", "$1$"]),
        correctAnswer: "$a$",
        solution: "For a $1 \\times 1$ matrix, the determinant is simply the value of the single element itself.",
        difficulty_level: "Easy",
      },
      {
        text: "The determinant is a value associated only with:",
        options: shuffle(["Square matrices", "Identity matrices", "Rectangular matrices", "Diagonal matrices"]),
        correctAnswer: "Square matrices",
        solution: "Determinants are only defined for square matrices (where the number of rows equals the number of columns).",
        difficulty_level: "Easy",
      },
      {
        text: "The notation $|A|$ for a determinant is also written as:",
        options: shuffle(["$det(A)$", "$A^T$", "$A^{-1}$", "$rank(A)$"]),
        correctAnswer: "$det(A)$",
        solution: "The determinant of matrix $A$ is commonly denoted by $|A|$ or $det(A)$.",
        difficulty_level: "Easy",
      },
      {
        text: "If $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, then $|A|$ is calculated as:",
        options: shuffle(["$ad - bc$", "$ad + bc$", "$ab - cd$", "$ac - bd$"]),
        correctAnswer: "$ad - bc$",
        solution: "The determinant of a $2 \\times 2$ matrix is the product of elements on the principal diagonal minus the product of elements on the secondary diagonal.",
        difficulty_level: "Easy",
      },
      {
        text: "Find the value of $\\begin{vmatrix} 2 & 4 \\\\ -1 & 2 \\end{vmatrix}$.",
        options: shuffle(["$8$", "$0$", "$4$", "$6$"]),
        correctAnswer: "$8$",
        solution: "$(2 \\times 2) - (4 \\times -1) = 4 - (-4) = 4 + 4 = 8$.",
        difficulty_level: "Easy",
      },
      {
        text: "Evaluate: $\\begin{vmatrix} \\cos \\theta & -\\sin \\theta \\\\ \\sin \\theta & \\cos \\theta \\end{vmatrix}$.",
        options: shuffle(["$1$", "$0$", "$\\cos 2\\theta$", "$\\sin 2\\theta$"]),
        correctAnswer: "$1$",
        solution: "$\\cos\\theta(\\cos\\theta) - (-\\sin\\theta)(\\sin\\theta) = \\cos^2\\theta + \\sin^2\\theta = 1$.",
        difficulty_level: "Easy",
      },
      {
        text: "If $\\begin{vmatrix} x & 8 \\\\ 2 & x \\end{vmatrix} = 0$, find the positive value of $x$.",
        options: shuffle(["$4$", "$2$", "$8$", "$16$"]),
        correctAnswer: "$4$",
        solution: "$x^2 - (8 \\times 2) = 0 \\Rightarrow x^2 = 16 \\Rightarrow x = 4$.",
        difficulty_level: "Easy",
      },
      {
        text: "A matrix $A$ is singular if its determinant $|A|$ is:",
        options: shuffle(["$0$", "$1$", "Positive", "Negative"]),
        correctAnswer: "$0$",
        solution: "By definition, a square matrix is singular if its determinant is zero.",
        difficulty_level: "Easy",
      },
      {
        text: "The determinant of an identity matrix $I_n$ is always:",
        options: shuffle(["$1$", "$0$", "$n$", "$n^2$"]),
        correctAnswer: "$1$",
        solution: "The determinant of any identity matrix, regardless of its order, is always 1.",
        difficulty_level: "Easy",
      },
      {
        text: "Find $|A|$ if $A = \\begin{bmatrix} 5 & 0 \\\\ 0 & 3 \\end{bmatrix}$.",
        options: shuffle(["$15$", "$8$", "$0$", "$5$"]),
        correctAnswer: "$15$",
        solution: "For a diagonal matrix, the determinant is the product of the diagonal elements: $5 \\times 3 = 15$.",
        difficulty_level: "Easy",
      },
    ];
    setQuestions(qs);
  }, []);

  useEffect(() => {
    if (isFinished) return;
    const uid = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    if (uid && !sessionId) {
      api.createPracticeSession(uid, SKILL_ID)
        .then((s) => { if (s?.session_id) setSessionId(s.session_id); })
        .catch(console.error);
    }
    const t = setInterval(() => setTimeElapsed((p) => p + 1), 1000);
    const v = () => {
      if (document.hidden) {
        accumulatedTime.current += Date.now() - questionStartTime.current;
        isTabActive.current = false;
      } else {
        questionStartTime.current = Date.now();
        isTabActive.current = true;
      }
    };
    document.addEventListener("visibilitychange", v);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", v);
    };
  }, [sessionId, isFinished]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const recordAttempt = async (q, sel, cor) => {
    const uid = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    if (!uid) return;
    let t = accumulatedTime.current;
    if (isTabActive.current) t += Date.now() - questionStartTime.current;
    const sec = Math.max(0, Math.round(t / 1000));
    api.recordAttempt({
      user_id: parseInt(uid),
      session_id: sessionId,
      skill_id: SKILL_ID,
      template_id: null,
      difficulty_level: q.difficulty_level || "Easy",
      question_text: q.text,
      correct_answer: q.correctAnswer,
      student_answer: sel || "",
      is_correct: cor,
      solution_text: q.solution || "",
      time_spent_seconds: sec,
    }).catch(console.error);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    const q = questions[qIndex];
    const r = selectedOption === q.correctAnswer;
    setIsCorrect(r);
    setIsSubmitted(true);
    if (r) setFeedbackMessage(CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)]);
    setAnswers((p) => ({ ...p, [qIndex]: { selectedOption, isCorrect: r } }));
    recordAttempt(q, selectedOption, r);
  };

  const handleNext = async () => {
    if (qIndex < questions.length - 1) {
      setQIndex((p) => p + 1);
      accumulatedTime.current = 0;
      questionStartTime.current = Date.now();
    } else {
      await handleFinalSubmit();
    }
  };

  const handlePrev = () => { if (qIndex > 0) setQIndex((p) => p - 1); };

  const handleFinalSubmit = async () => {
    if (sessionId) await api.finishSession(sessionId).catch(console.error);
    const uid = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    if (uid) {
      const tc = Object.values(answers).filter((v) => v.isCorrect).length;
      await api.createReport({
        title: SKILL_NAME,
        type: "practice",
        score: (tc / questions.length) * 100,
        parameters: {
          skill_id: SKILL_ID,
          skill_name: SKILL_NAME,
          total_questions: questions.length,
          correct_answers: tc,
          timestamp: new Date().toISOString(),
          time_taken_seconds: timeElapsed,
        },
        user_id: parseInt(uid),
      }).catch(console.error);
    }
    setIsFinished(true);
  };

  useEffect(() => {
    const s = answers[qIndex];
    if (s) {
      setSelectedOption(s.selectedOption);
      setIsCorrect(s.isCorrect);
      setIsSubmitted(true);
    } else {
      setSelectedOption(null);
      setIsCorrect(false);
      setIsSubmitted(false);
    }
  }, [qIndex, answers]);

  if (questions.length === 0) return <div className="flex items-center justify-center min-h-screen text-slate-500 font-medium">Loading Determinants Easy Test...</div>;

  if (isFinished) {
    const correct = Object.values(answers).filter((a) => a.isCorrect).length;
    const wrong = Object.values(answers).filter((a) => !a.isCorrect).length;
    return (
      <div className="mat-practice-page p-3 sm:p-8 pb-24" style={{ backgroundColor: "#F8FAFC", minHeight: "100vh", overflowY: "auto" }}>
        <div className="max-w-3xl mx-auto w-full">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8">
            <div className="text-center mb-6">
              <div style={{ fontSize: "3rem", marginBottom: 8 }}>{correct >= 7 ? "🏆" : "📝"}</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-2">{correct >= 7 ? "Excellent!" : "Keep Practicing!"}</h2>
              <p className="text-sm text-gray-500">{SKILL_NAME}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-blue-50 p-2 rounded-xl text-center border border-blue-100">
                <div className="text-blue-500 font-bold text-xs uppercase">Time</div>
                <div className="text-lg font-black text-[#31326F]">{formatTime(timeElapsed)}</div>
              </div>
              <div className="bg-green-50 p-2 rounded-xl text-center border border-green-100">
                <div className="text-green-500 font-bold text-xs uppercase">Correct</div>
                <div className="text-lg font-black text-[#31326F]">{correct}</div>
              </div>
              <div className="bg-red-50 p-2 rounded-xl text-center border border-red-100">
                <div className="text-red-500 font-bold text-xs uppercase">Wrong</div>
                <div className="text-lg font-black text-[#31326F]">{wrong}</div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#31326F] border-b pb-2">Detailed Report</h3>
              {questions.map((q, idx) => {
                const ans = answers[idx] || { isCorrect: false, selectedOption: "N/A" };
                return (
                  <div key={idx} className="p-4 rounded-xl border-2 border-gray-100 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="w-7 h-7 rounded-full bg-[#31326F] text-white flex items-center justify-center font-bold text-xs">{idx + 1}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-xs uppercase ${ans.isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{ans.isCorrect ? "Correct" : "Wrong"}</span>
                    </div>
                    <div className="text-sm text-[#31326F] mb-2"><LatexText text={q.text} /></div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div className="p-2 rounded-lg bg-gray-50 border">
                        <span className="text-gray-400 block text-xs">Your Answer:</span>
                        <span className={ans.isCorrect ? "text-green-600 font-bold" : "text-red-500 font-bold"}><LatexText text={ans.selectedOption} /></span>
                      </div>
                      <div className="p-2 rounded-lg bg-green-50 border border-green-100">
                        <span className="text-green-400 block text-xs">Correct:</span>
                        <span className="text-green-700 font-bold"><LatexText text={q.correctAnswer} /></span>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-xs italic text-[#31326F]">
                      <span className="font-bold not-italic text-amber-700">Explanation: </span>
                      <LatexText text={q.solution} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center">
              <button className="bg-[#31326F] text-white px-12 py-3 rounded-xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl" onClick={() => navigate(-1)}>Done</button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const cq = questions[qIndex];

  return (
    <div className="mat-practice-page">
      <header className="mat-practice-header">
        <div className="mat-skill-name">{SKILL_NAME}</div>
        <div>
          <div className="mat-q-counter">Q {qIndex + 1}/{questions.length}</div>
        </div>
        <div style={{ justifySelf: "end" }}>
          <div className="mat-timer">{formatTime(timeElapsed)}</div>
        </div>
      </header>

      <main className="mat-content-wrapper">
        <div className="mat-board-container">
          <div className="mat-left-col">
            <div className="mat-card-modern">
              <div className="mat-question-number">Question {qIndex + 1}</div>
              <h2 className="mat-text-modern">
                <LatexText text={cq.text} />
              </h2>
              <div className="mat-interaction-area">
                <div className="mat-options-grid">
                  {cq.options.map((o, i) => (
                    <button
                      key={i}
                      className={`mat-option-btn ${selectedOption === o ? "selected" : ""} ${isSubmitted && o === cq.correctAnswer ? "correct" : ""} ${isSubmitted && selectedOption === o && !isCorrect ? "wrong" : ""}`}
                      onClick={() => !isSubmitted && setSelectedOption(o)}
                      disabled={isSubmitted}
                    >
                      <LatexText text={o} />
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {isSubmitted && isCorrect && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mat-feedback correct">
                      {feedbackMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mat-palette-container">
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem', textAlign: 'center' }}>Question Palette</h3>
            <div className="mat-palette-grid">
              {questions.map((_, idx) => {
                const isCurrent = qIndex === idx;
                const ans = answers[idx];
                const hasResponded = !!ans;
                let btnBg = '#F8FAFC', btnColor = '#64748B', btnBorder = '1px solid #E2E8F0';
                if (isCurrent) { btnBorder = '2px solid #3B82F6'; btnBg = '#EFF6FF'; btnColor = '#1D4ED8'; }
                else if (hasResponded) {
                  btnBg = ans.isCorrect ? '#DCFCE7' : '#FEE2E2';
                  btnColor = ans.isCorrect ? '#166534' : '#991B1B';
                  btnBorder = ans.isCorrect ? '1px solid #BBF7D0' : '1px solid #FECACA';
                }
                return (
                  <button key={idx} onClick={() => setQIndex(idx)}
                    style={{ height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: btnBg, color: btnColor, border: btnBorder }}
                    className="hover:shadow-md hover:-translate-y-0.5">
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className="mat-nav-buttons">
        <button className="mat-nav-btn prev" onClick={handlePrev} disabled={qIndex === 0}>
          <ChevronLeft size={20} /> Prev
        </button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {isSubmitted && (
            <button className="view-explanation-btn" style={{ padding: '0.5rem 1.5rem', minWidth: 'auto', height: '45px' }} onClick={() => setShowExplanationModal(true)}>
              <Eye size={20} /> Explanation
            </button>
          )}
        </div>
        {isSubmitted ? (
          <button className="mat-nav-btn next" onClick={handleNext}>
            {qIndex < questions.length - 1 ? "Next" : "Done"} <ChevronRight size={20} />
          </button>
        ) : (
          <button className="mat-nav-btn check" onClick={handleCheck} disabled={!selectedOption}>
            Submit <Check size={20} />
          </button>
        )}
      </footer>

      <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={cq.correctAnswer} explanation={cq.solution} onClose={() => setShowExplanationModal(false)} />
    </div>
  );
};

export default DeterminantsEasyTest;
