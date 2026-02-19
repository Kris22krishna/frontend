import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨", "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉", "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀", "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊", "💎 Spot on! Excellent! 💎"
];

const DivisionPolynomialByPolynomialComponent = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const history = useRef({});
    const isTabActive = useRef(true);
    const SKILL_ID = 1175;
    const SKILL_NAME = "Factorisation - Division of Polynomial by Polynomial";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) { api.createPracticeSession(userId, SKILL_ID).then(sess => { if (sess && sess.session_id) setSessionId(sess.session_id); }).catch(err => console.error("Failed to start session", err)); }
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        const hvc = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", hvc);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hvc); };
    }, []);
    useEffect(() => { generateQuestion(qIndex); }, [qIndex]);
    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);

    const generateQuestion = (index) => {
        const types = ['easy1', 'easy2', 'easy3', 'med1', 'med2', 'med3', 'hard1', 'hard2', 'hard3', 'bonus'];
        if (!window.shuffledFactQ_1175) window.shuffledFactQ_1175 = [...types].sort(() => Math.random() - 0.5);
        if (history.current[index]) { const s = history.current[index]; setCurrentQuestion(s.qData); setShuffledOptions(s.shuffledOptions); setSelectedOption(s.selectedOption); setIsSubmitted(s.isSubmitted); setIsCorrect(s.isCorrect); return; }
        const t = window.shuffledFactQ_1175[index] || 'easy1';
        let q;
        switch (t) { case 'easy1': q = easy1(); break; case 'easy2': q = easy2(); break; case 'easy3': q = easy3(); break; case 'med1': q = med1(); break; case 'med2': q = med2(); break; case 'med3': q = med3(); break; case 'hard1': q = hard1(); break; case 'hard2': q = hard2(); break; case 'hard3': q = hard3(); break; case 'bonus': q = bonus(); break; default: q = easy1(); }
        const so = [...q.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData: q, shuffledOptions: so, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(so); setCurrentQuestion(q); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // Helper: ensure all options are unique strings
    const uniqueOpts = (correct, wrongs) => {
        const opts = [correct];
        for (const w of wrongs) { if (!opts.includes(w)) opts.push(w); }
        let s = 2;
        while (opts.length < 4) { const f = `$(x + ${s})$`; if (!opts.includes(f)) opts.push(f); s++; }
        return opts;
    };

    // EASY 1: (x²+5x+6) ÷ (x+2) = x+3
    const easy1 = () => { let a, b; do { a = randomInt(1, 5); b = randomInt(1, 5); } while (a === b); const sum = a + b, prod = a * b; return { text: `<div class='question-container'><p>Divide: $(x^2 + ${sum}x + ${prod}) \\div (x + ${a})$</p></div>`, correctAnswer: `$(x + ${b})$`, solution: `$x^2 + ${sum}x + ${prod} = (x + ${a})(x + ${b})$<br/><br/>$\\frac{(x + ${a})(x + ${b})}{(x + ${a})} = (x + ${b})$`, options: uniqueOpts(`$(x + ${b})$`, [`$(x + ${a})$`, `$(x - ${b})$`, `$(x + ${sum})$`]) }; };

    // EASY 2
    const easy2 = () => { const b = randomInt(2, 7); return { text: `<div class='question-container'><p>Divide: $(x^2 - ${b}x) \\div x$</p></div>`, correctAnswer: `$(x - ${b})$`, solution: `$\\frac{x^2 - ${b}x}{x} = (x - ${b})$`, options: uniqueOpts(`$(x - ${b})$`, [`$(x + ${b})$`, `$x^2 - ${b}$`, `$(${b}x - 1)$`]) }; };

    // EASY 3: (a²-b²) ÷ (a+b) = a-b
    const easy3 = () => { const b = randomInt(2, 8), b2 = b * b; return { text: `<div class='question-container'><p>Divide: $(x^2 - ${b2}) \\div (x + ${b})$</p></div>`, correctAnswer: `$(x - ${b})$`, solution: `$x^2 - ${b2} = (x + ${b})(x - ${b})$<br/><br/>$\\frac{(x + ${b})(x - ${b})}{(x + ${b})} = (x - ${b})$`, options: uniqueOpts(`$(x - ${b})$`, [`$(x + ${b})$`, `$(x - ${b2})$`, `$(x + ${b2})$`]) }; };

    // MED 1
    const med1 = () => { let a, b; do { a = randomInt(2, 6); b = randomInt(2, 6); } while (a === b); const sum = a + b, prod = a * b; return { text: `<div class='question-container'><p>Divide: $(x^2 - ${sum}x + ${prod}) \\div (x - ${a})$</p></div>`, correctAnswer: `$(x - ${b})$`, solution: `$x^2 - ${sum}x + ${prod} = (x - ${a})(x - ${b})$<br/><br/>$= (x - ${b})$`, options: uniqueOpts(`$(x - ${b})$`, [`$(x + ${b})$`, `$(x - ${a})$`, `$(x + ${a})$`]) }; };

    // MED 2
    const med2 = () => { let a, b, c; do { a = randomInt(2, 5); b = randomInt(2, 6); c = randomInt(1, 5); } while (a === b); const ac = a * c, bc = b * c; return { text: `<div class='question-container'><p>Divide: $(${ac}x^2 + ${bc}x) \\div ${c}x$</p></div>`, correctAnswer: `$(${a}x + ${b})$`, solution: `$\\frac{${ac}x^2 + ${bc}x}{${c}x} = (${a}x + ${b})$`, options: uniqueOpts(`$(${a}x + ${b})$`, [`$(${a}x - ${b})$`, `$(${b}x + ${a})$`, `$(${c}x + ${a})$`]) }; };

    // MED 3: (4x²-9) ÷ (2x+3) = (2x-3)
    const med3 = () => { let a, b; do { a = randomInt(2, 4); b = randomInt(2, 5); } while (a === b); const a2 = a * a, b2 = b * b; return { text: `<div class='question-container'><p>Divide: $(${a2}x^2 - ${b2}) \\div (${a}x + ${b})$</p></div>`, correctAnswer: `$(${a}x - ${b})$`, solution: `$${a2}x^2 - ${b2} = (${a}x + ${b})(${a}x - ${b})$<br/><br/>$= (${a}x - ${b})$`, options: uniqueOpts(`$(${a}x - ${b})$`, [`$(${a}x + ${b})$`, `$(${b}x - ${a})$`, `$(${a}x - ${b2})$`]) }; };

    // HARD 1
    const hard1 = () => { const b = randomInt(2, 7); const mid = 2 * b, b2 = b * b; return { text: `<div class='question-container'><p>Divide: $(x^2 + ${mid}x + ${b2}) \\div (x + ${b})$</p></div>`, correctAnswer: `$(x + ${b})$`, solution: `$x^2 + ${mid}x + ${b2} = (x + ${b})^2$<br/><br/>$= (x + ${b})$`, options: uniqueOpts(`$(x + ${b})$`, [`$(x - ${b})$`, `$(x + ${b})^2$`, `$(x + ${mid})$`]) }; };

    // HARD 2
    const hard2 = () => { const a = randomInt(2, 6), b = randomInt(1, a - 1); const mid = a - b, prod = a * b; return { text: `<div class='question-container'><p>Divide: $(x^2 + ${mid}x - ${prod}) \\div (x - ${b})$</p></div>`, correctAnswer: `$(x + ${a})$`, solution: `$x^2 + ${mid}x - ${prod} = (x + ${a})(x - ${b})$<br/><br/>$= (x + ${a})$`, options: uniqueOpts(`$(x + ${a})$`, [`$(x - ${a})$`, `$(x + ${b})$`, `$(x - ${b})$`]) }; };

    // HARD 3
    const hard3 = () => { const b = randomInt(1, 4), b2 = b * b, b3 = b * b * b; return { text: `<div class='question-container'><p>Divide: $(x^3 - ${b3}) \\div (x - ${b})$</p></div>`, correctAnswer: `$(x^2 + ${b}x + ${b2})$`, solution: `Using $a^3 - b^3 = (a-b)(a^2+ab+b^2)$<br/><br/>$= (x^2 + ${b}x + ${b2})$`, options: uniqueOpts(`$(x^2 + ${b}x + ${b2})$`, [`$(x^2 - ${b}x + ${b2})$`, `$(x^2 + ${b}x - ${b2})$`, `$(x^2 - ${b2})$`]) }; };

    // BONUS
    const bonus = () => { let a, b; do { a = randomInt(2, 5); b = randomInt(2, 5); } while (a === b); const sum = a + b, prod = a * b; return { text: `<div class='question-container'><p>The area of a rectangle is $x^2 + ${sum}x + ${prod}$. If one side is $(x + ${a})$, find the other side.</p></div>`, correctAnswer: `$(x + ${b})$`, solution: `Other side $= \\frac{x^2 + ${sum}x + ${prod}}{x + ${a}} = (x + ${b})$`, options: uniqueOpts(`$(x + ${b})$`, [`$(x - ${b})$`, `$(x + ${a})$`, `$(x + ${sum})$`]) }; };

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const recordQuestionAttempt = async (question, selected, correct) => { const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!userId) return; let ts = accumulatedTime.current; if (isTabActive.current) ts += Date.now() - questionStartTime.current; const sec = Math.round(ts / 1000); try { await api.recordAttempt({ user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''), student_answer: String(selected || ''), is_correct: correct, solution_text: String(question.solution || ''), time_spent_seconds: sec >= 0 ? sec : 0 }); } catch (e) { console.error("Failed to record attempt", e); } };
    const handleCheck = () => { if (!selectedOption || !currentQuestion) return; const r = selectedOption === currentQuestion.correctAnswer; setIsCorrect(r); setIsSubmitted(true); setAnswers(p => ({ ...p, [qIndex]: r })); if (r) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]); else setShowExplanationModal(true); recordQuestionAttempt(currentQuestion, selectedOption, r); };
    const handleNext = async () => { if (history.current[qIndex]) history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; if (qIndex < TOTAL_QUESTIONS - 1) { setQIndex(p => p + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } else { if (sessionId) await api.finishSession(sessionId).catch(console.error); const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (userId) { const tc = Object.values(answers).filter(v => v === true).length; try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (tc / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(userId, 10) }); } catch (e) { console.error("Failed to create report", e); } } navigate(-1); } };
    const handlePrevious = () => { if (history.current[qIndex]) history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; if (qIndex > 0) { setQIndex(p => p - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); } };
    const handleOptionSelect = (o) => { if (isSubmitted) return; setSelectedOption(o); };
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max"><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div></div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern"><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">{shuffledOptions.map((o, i) => (<button key={i} className={`option-btn-modern ${selectedOption === o ? 'selected' : ''} ${isSubmitted && o === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === o && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: '500' }} onClick={() => handleOptionSelect(o)} disabled={isSubmitted}><LatexContent html={o} /></button>))}</div>
                                        {isSubmitted && isCorrect && (<motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>{feedbackMessage}</motion.div>)}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit Practice</button></div>
                    <div className="bottom-center">{isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>)}</div>
                    <div className="bottom-right"><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>)}</div></div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2"><button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>{isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>)}</div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}</div></div>
                </div>
            </footer>
        </div>
    );
};

export default DivisionPolynomialByPolynomialComponent;
