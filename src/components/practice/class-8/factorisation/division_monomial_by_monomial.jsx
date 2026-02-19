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

const DivisionMonomialByMonomialComponent = () => {
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
    const SKILL_ID = 1173;
    const SKILL_NAME = "Factorisation - Division of Monomial by Monomial";
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
        if (!window.shuffledFactQ_1173) window.shuffledFactQ_1173 = [...types].sort(() => Math.random() - 0.5);
        if (history.current[index]) { const s = history.current[index]; setCurrentQuestion(s.qData); setShuffledOptions(s.shuffledOptions); setSelectedOption(s.selectedOption); setIsSubmitted(s.isSubmitted); setIsCorrect(s.isCorrect); return; }
        const t = window.shuffledFactQ_1173[index] || 'easy1';
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
        while (opts.length < 4) { const f = `$${s}x^{${s + 1}}$`; if (!opts.includes(f)) opts.push(f); s++; }
        return opts;
    };

    // EASY 1: 12x³ ÷ 4x = 3x²
    const easy1 = () => { let c, d; do { c = randomInt(2, 5); d = randomInt(2, 4); } while (c === d); const coeff = c * d; const ep = randomInt(2, 4); return { text: `<div class='question-container'><p>Divide: $${coeff}x^{${ep + 1}} \\div ${d}x$</p></div>`, correctAnswer: `$${c}x^{${ep}}$`, solution: `$\\frac{${coeff}x^{${ep + 1}}}{${d}x} = \\frac{${coeff}}{${d}} \\times x^{${ep + 1}-1} = ${c}x^{${ep}}$`, options: uniqueOpts(`$${c}x^{${ep}}$`, [`$${c}x^{${ep + 1}}$`, `$${d}x^{${ep}}$`, `$${c + 1}x^{${ep}}$`]) }; };

    // EASY 2: 18a² ÷ 6a = 3a
    const easy2 = () => { let c, d; do { c = randomInt(2, 6); d = randomInt(2, 5); } while (c === d); const coeff = c * d; return { text: `<div class='question-container'><p>Divide: $${coeff}a^2 \\div ${d}a$</p></div>`, correctAnswer: `$${c}a$`, solution: `$\\frac{${coeff}a^2}{${d}a} = \\frac{${coeff}}{${d}} \\times a^{2-1} = ${c}a$`, options: uniqueOpts(`$${c}a$`, [`$${c}a^2$`, `$${d}a$`, `$${c + 1}a$`]) }; };

    // EASY 3: 20xy ÷ 5x = 4y
    const easy3 = () => { let c, d; do { c = randomInt(2, 6); d = randomInt(2, 5); } while (c === d); const coeff = c * d; return { text: `<div class='question-container'><p>Divide: $${coeff}xy \\div ${d}x$</p></div>`, correctAnswer: `$${c}y$`, solution: `$\\frac{${coeff}xy}{${d}x} = \\frac{${coeff}}{${d}} \\times \\frac{xy}{x} = ${c}y$`, options: uniqueOpts(`$${c}y$`, [`$${c}x$`, `$${c}xy$`, `$${d}y$`]) }; };

    // MED 1: 24x³y² ÷ 8xy = 3x²y
    const med1 = () => { let c, d; do { c = randomInt(2, 5); d = randomInt(2, 4); } while (c === d); const coeff = c * d; const e1 = randomInt(2, 3), e2 = randomInt(2, 3); return { text: `<div class='question-container'><p>Divide: $${coeff}x^{${e1 + 1}}y^{${e2}} \\div ${d}xy$</p></div>`, correctAnswer: `$${c}x^{${e1}}y^{${e2 - 1}}$`, solution: `$\\frac{${coeff}x^{${e1 + 1}}y^{${e2}}}{${d}xy} = ${c} \\times x^{${e1 + 1}-1} \\times y^{${e2}-1} = ${c}x^{${e1}}y^{${e2 - 1}}$`, options: uniqueOpts(`$${c}x^{${e1}}y^{${e2 - 1}}$`, [`$${c}x^{${e1 + 1}}y^{${e2}}$`, `$${d}x^{${e1}}y^{${e2 - 1}}$`, `$${c}x^{${e1 - 1}}y^{${e2}}$`]) }; };

    // MED 2: -36a²b³ ÷ 9ab = -4ab²
    const med2 = () => { let c, d; do { c = randomInt(2, 5); d = randomInt(2, 4); } while (c === d); const coeff = c * d; return { text: `<div class='question-container'><p>Divide: $-${coeff}a^2b^3 \\div ${d}ab$</p></div>`, correctAnswer: `$-${c}ab^2$`, solution: `$\\frac{-${coeff}a^2b^3}{${d}ab} = -${c} \\times a^{2-1} \\times b^{3-1} = -${c}ab^2$`, options: uniqueOpts(`$-${c}ab^2$`, [`$${c}ab^2$`, `$-${c}a^2b$`, `$-${d}ab^2$`]) }; };

    // MED 3: coefficient division with power
    const med3 = () => { let c, d; do { c = randomInt(3, 7); d = randomInt(2, 4); } while (c === d); const coeff = c * d; const e1 = randomInt(3, 5); return { text: `<div class='question-container'><p>Divide: $${coeff}m^{${e1}} \\div ${d}m^2$</p></div>`, correctAnswer: `$${c}m^{${e1 - 2}}$`, solution: `$\\frac{${coeff}m^{${e1}}}{${d}m^2} = ${c} \\times m^{${e1}-2} = ${c}m^{${e1 - 2}}$`, options: uniqueOpts(`$${c}m^{${e1 - 2}}$`, [`$${c}m^{${e1}}$`, `$${c}m^{${e1 - 1}}$`, `$${d}m^{${e1 - 2}}$`]) }; };

    // HARD 1: Three-variable monomial
    const hard1 = () => { let c, d; do { c = randomInt(2, 4); d = randomInt(2, 3); } while (c === d); const coeff = c * d; return { text: `<div class='question-container'><p>Divide: $${coeff}x^3y^2z^4 \\div ${d}xyz^2$</p></div>`, correctAnswer: `$${c}x^2yz^2$`, solution: `$\\frac{${coeff}x^3y^2z^4}{${d}xyz^2} = ${c} \\times x^{3-1} \\times y^{2-1} \\times z^{4-2} = ${c}x^2yz^2$`, options: uniqueOpts(`$${c}x^2yz^2$`, [`$${c}x^3y^2z^4$`, `$${c}xyz^2$`, `$${d}x^2yz^2$`]) }; };

    // HARD 2: Negative with higher powers
    const hard2 = () => { let c, d; do { c = randomInt(3, 6); d = randomInt(2, 4); } while (c === d); const coeff = c * d; return { text: `<div class='question-container'><p>Divide: $-${coeff}p^4q^3 \\div (-${d}p^2q)$</p></div>`, correctAnswer: `$${c}p^2q^2$`, solution: `$\\frac{-${coeff}p^4q^3}{-${d}p^2q} = +${c} \\times p^{4-2} \\times q^{3-1} = ${c}p^2q^2$<br/><br/>(Negative ÷ Negative = Positive)`, options: uniqueOpts(`$${c}p^2q^2$`, [`$-${c}p^2q^2$`, `$${c}p^4q^3$`, `$${c}pq^2$`]) }; };

    // HARD 3: Large coefficients
    const hard3 = () => { let c, d; do { c = randomInt(4, 8); d = randomInt(3, 6); } while (c === d); const coeff = c * d; return { text: `<div class='question-container'><p>Divide: $${coeff}a^5b^3c^2 \\div ${d}a^2b^2c$</p></div>`, correctAnswer: `$${c}a^3bc$`, solution: `$\\frac{${coeff}a^5b^3c^2}{${d}a^2b^2c} = ${c} \\times a^{5-2} \\times b^{3-2} \\times c^{2-1} = ${c}a^3bc$`, options: uniqueOpts(`$${c}a^3bc$`, [`$${c}a^2bc$`, `$${c}a^3b^2c$`, `$${d}a^3bc$`]) }; };

    // BONUS
    const bonus = () => { let c, d; do { c = randomInt(2, 5); d = randomInt(2, 4); } while (c === d); const coeff = c * d; return { text: `<div class='question-container'><p>If the area of a rectangle is $${coeff}x^3y^2$ and its breadth is $${d}xy$, find its length.</p></div>`, correctAnswer: `$${c}x^2y$`, solution: `Length $= \\frac{\\text{Area}}{\\text{Breadth}} = \\frac{${coeff}x^3y^2}{${d}xy} = ${c}x^2y$`, options: uniqueOpts(`$${c}x^2y$`, [`$${c}xy$`, `$${c}x^3y$`, `$${d}x^2y$`]) }; };

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

export default DivisionMonomialByMonomialComponent;
