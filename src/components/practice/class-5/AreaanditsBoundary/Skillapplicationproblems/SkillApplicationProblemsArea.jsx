import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
  "✨ Real-life maths pro! ✨",
  "🌟 Problem solving star! 🌟",
  "🎉 Brilliant application! 🎉",
  "🚀 Excellent thinking! 🚀",
  "💎 Superb! 💎"
];

const AreaPerimeterApplication = () => {

  const navigate = useNavigate();

  const SKILL_ID = 1168;
  const SKILL_NAME = "Area Perimeter Application";

  const TOTAL_QUESTIONS = 10;

  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);

  const questionStartTime = useRef(Date.now());
  const accumulatedTime = useRef(0);
  const isTabActive = useRef(true);

  /* ---------------- QUESTION GENERATOR ---------------- */

  const generateQuestions = () => {

    const qs = [];
    const used = new Set();
    const contexts = ["garden", "floor", "park", "playground", "hall"];

    while (qs.length < TOTAL_QUESTIONS) {

      const l = randomInt(4, 25);
      const w = randomInt(3, 20);

      const area = l * w;
      const perimeter = 2 * (l + w);
      const type = randomInt(1, 4);

      const key = `${l}-${w}-${type}`;
      if (used.has(key)) continue;
      used.add(key);

      const context = contexts[randomInt(0, contexts.length - 1)];

      // fencing
      if (type === 1) {
        qs.push({
          text: `<div class='question-container'>A ${context} is ${l} m long and ${w} m wide.
          How much fencing is needed?</div>`,
          correctAnswer: `${perimeter} m`,
          solution: `Perimeter = 2(${l}+${w}) = ${perimeter} m`,
          shuffledOptions: [
            `${perimeter} m`,
            `${area} m`,
            `${perimeter + 10} m`,
            `${perimeter - 6} m`
          ].sort(() => Math.random() - 0.5)
        });
      }

      // flooring cost
      if (type === 2) {
        const cost = randomInt(20, 120);
        const total = area * cost;

        qs.push({
          text: `<div class='question-container'>A ${context} is ${l} m × ${w} m.
          Flooring costs ₹${cost} per sq m. Find total cost.</div>`,
          correctAnswer: `₹${total}`,
          solution: `Area = ${area} sq m <br/> Cost = ${area} × ${cost} = ₹${total}`,
          shuffledOptions: [
            `₹${total}`,
            `₹${total + 500}`,
            `₹${area}`,
            `₹${total - 200}`
          ].sort(() => Math.random() - 0.5)
        });
      }

      // tiles
      if (type === 3) {
        qs.push({
          text: `<div class='question-container'>A ${context} of ${l} m × ${w} m is tiled
          using 1 sq m tiles. How many tiles are needed?</div>`,
          correctAnswer: `${area}`,
          solution: `Area = ${area} sq m`,
          shuffledOptions: [
            `${area}`,
            `${area + 8}`,
            `${area - 3}`,
            `${area + 5}`
          ].sort(() => Math.random() - 0.5)
        });
      }

      // compare areas
      if (type === 4) {

        const l2 = randomInt(4, 25);
        const w2 = randomInt(3, 20);
        const area2 = l2 * w2;

        qs.push({
          text: `<div class='question-container'>
          Which has larger area? <br/>
          ${l} m × ${w} m OR ${l2} m × ${w2} m
          </div>`,
          correctAnswer: area > area2 ? `${l} m × ${w} m` : `${l2} m × ${w2} m`,
          solution: `Areas are ${area} sq m and ${area2} sq m`,
          shuffledOptions: [
            `${l} m × ${w} m`,
            `${l2} m × ${w2} m`,
            "Both equal",
            "Cannot be determined"
          ].sort(() => Math.random() - 0.5)
        });
      }

    }

    setSessionQuestions(qs);
  };

  /* ---------------- USE EFFECTS ---------------- */

  useEffect(() => {

    generateQuestions();

    const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');

    if (userId && !sessionId) {
      api.createPracticeSession(userId, SKILL_ID).then(sess => {
        if (sess?.session_id) setSessionId(sess.session_id);
      });
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        accumulatedTime.current += Date.now() - questionStartTime.current;
        isTabActive.current = false;
      } else {
        questionStartTime.current = Date.now();
        isTabActive.current = true;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);

  }, []);

  useEffect(() => {
    if (sessionQuestions.length > 0) {
      const q = sessionQuestions[qIndex];
      setCurrentQuestion(q);
      setShuffledOptions(q.shuffledOptions);
    }
  }, [qIndex, sessionQuestions]);

  useEffect(() => {
    if (showResults) return;
    const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [showResults]);

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  const handleCheck = () => {

    if (!selectedOption) return;

    const right = selectedOption === currentQuestion.correctAnswer;

    setIsCorrect(right);
    setIsSubmitted(true);

    setAnswers(prev => ({
      ...prev,
      [qIndex]: { selected: selectedOption, isCorrect: right }
    }));

    if (right) {
      setFeedbackMessage(CORRECT_MESSAGES[randomInt(0, CORRECT_MESSAGES.length - 1)]);
    } else {
      setShowExplanationModal(true);
    }

  };

  const handleNext = () => {

    if (qIndex < TOTAL_QUESTIONS - 1) {

      setQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setIsCorrect(false);

    } else {
      setShowResults(true);
    }

  };

  if (!currentQuestion && !showResults)
    return <div className="flex h-screen items-center justify-center text-2xl font-bold text-[#31326F]">Loading...</div>;

  /* ---------------- RESULTS ---------------- */

  if (showResults) {

    const correct = Object.values(answers).filter(a => a.isCorrect).length;
    const percentage = Math.round((correct / TOTAL_QUESTIONS) * 100);

    return (
      <div className="junior-practice-page results-view text-center p-10">
        <h1 className="results-title">{SKILL_NAME} Report</h1>
        <h2 className="text-3xl font-bold my-4">{correct}/{TOTAL_QUESTIONS}</h2>
        <p className="text-xl mb-6">Accuracy: {percentage}%</p>

        <button
          className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-semibold text-xl"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={24} /> Play Again
        </button>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (

    <div className="junior-practice-page village-theme">

      <header className="junior-practice-header">
        <button onClick={() => navigate(-1)}><X /></button>
        <div>Question {qIndex + 1}/{TOTAL_QUESTIONS}</div>
        <div>{formatTime(timeElapsed)}</div>
      </header>

      <main className="practice-content-wrapper">

        <AnimatePresence mode="wait">
          <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>

            <div className="question-card-modern">

              <h2><LatexContent html={currentQuestion.text} /></h2>

              <div className="options-grid-modern">

                {shuffledOptions.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''}
                    ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''}
                    ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`}
                    onClick={() => !isSubmitted && setSelectedOption(opt)}
                  >
                    <LatexContent html={opt} />
                  </button>
                ))}

              </div>

              {isSubmitted && isCorrect &&
                <div className="feedback-mini correct">{feedbackMessage}</div>}

            </div>

          </motion.div>
        </AnimatePresence>

      </main>

      <footer className="junior-bottom-bar">

        {isSubmitted
          ? <button onClick={handleNext}>Next</button>
          : <button onClick={handleCheck} disabled={!selectedOption}>Submit</button>
        }

      </footer>

      <ExplanationModal
        isOpen={showExplanationModal}
        isCorrect={isCorrect}
        correctAnswer={currentQuestion.correctAnswer}
        explanation={currentQuestion.solution}
        onClose={() => setShowExplanationModal(false)}
      />

    </div>
  );
};

export default AreaPerimeterApplication;
