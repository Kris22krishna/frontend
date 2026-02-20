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
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨", "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉", "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀", "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊", "💎 Spot on! Excellent! 💎"
];

const MethodOfCommonFactorsComponent = () => {
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
    const SKILL_ID = 1169;
    const SKILL_NAME = "Factorisation - Method of Common Factors";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        const handleVisibilityChange = () => {
            if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; }
            else { questionStartTime.current = Date.now(); isTabActive.current = true; }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", handleVisibilityChange); };
    }, []);

    useEffect(() => { generateQuestion(qIndex); }, [qIndex]);

    // Close explanation modal on question change
    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);

    const generateQuestion = (index) => {
        const questionTypes = ['easyLinear', 'easyMonomial', 'easyBinomial',
            'medCommon', 'medTrinomial', 'medMultiVar',
            'hardThreeTerm', 'hardNested', 'hardMultiStep', 'bonusRealWorld'];
        if (!window.shuffledFactQ_1169) {
            window.shuffledFactQ_1169 = [...questionTypes].sort(() => Math.random() - 0.5);
        }
        if (history.current[index]) {
            const stored = history.current[index];
            setCurrentQuestion(stored.qData); setShuffledOptions(stored.shuffledOptions);
            setSelectedOption(stored.selectedOption); setIsSubmitted(stored.isSubmitted); setIsCorrect(stored.isCorrect);
            return;
        }
        const questionType = window.shuffledFactQ_1169[index] || 'easyLinear';
        let qData;
        switch (questionType) {
            case 'easyLinear': qData = easyLinear(); break;
            case 'easyMonomial': qData = easyMonomial(); break;
            case 'easyBinomial': qData = easyBinomial(); break;
            case 'medCommon': qData = medCommon(); break;
            case 'medTrinomial': qData = medTrinomial(); break;
            case 'medMultiVar': qData = medMultiVar(); break;
            case 'hardThreeTerm': qData = hardThreeTerm(); break;
            case 'hardNested': qData = hardNested(); break;
            case 'hardMultiStep': qData = hardMultiStep(); break;
            case 'bonusRealWorld': qData = bonusRealWorld(); break;
            default: qData = easyLinear();
        }
        const newShuffledOptions = [...qData.options].sort(() => Math.random() - 0.5);
        history.current[index] = { qData, shuffledOptions: newShuffledOptions, selectedOption: null, isSubmitted: false, isCorrect: false };
        setShuffledOptions(newShuffledOptions); setCurrentQuestion(qData);
        setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
    };

    // Helper: ensure all options are unique strings; replace duplicates
    const uniqueOptions = (correct, wrongs) => {
        const opts = [correct];
        for (const w of wrongs) {
            if (!opts.includes(w)) opts.push(w);
        }
        // fill any missing slots with slight variations
        let suffix = 2;
        while (opts.length < 4) {
            const filler = `$${suffix}(${suffix + 1}x + ${suffix + 2}y)$`;
            if (!opts.includes(filler)) opts.push(filler);
            suffix++;
        }
        return opts;
    };

    // Pick b,c coprime and distinct from a, preventing unsimplified answers
    const coprimeDistinct = (a) => {
        let b, c;
        do {
            b = randomInt(2, 9);
            c = randomInt(2, 9);
        } while (gcd(b, c) !== 1 || b === a || c === a || b === c);
        return [b, c];
    };

    // EASY 1: Factorise linear expression like ax + ay (fully simplified)
    const easyLinear = () => {
        const a = randomInt(2, 9);
        const [b, c] = coprimeDistinct(a);
        const coeff1 = a * b;
        const coeff2 = a * c;
        const correctAnswer = `$${a}(${b}x + ${c}y)$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${coeff1}x + ${coeff2}y$</p></div>`,
            correctAnswer,
            solution: `$${coeff1}x + ${coeff2}y$<br/><br/>$= ${a} \\times ${b}x + ${a} \\times ${c}y$<br/><br/>$= ${a}(${b}x + ${c}y)$`,
            options: uniqueOptions(correctAnswer, [
                `$${b}(${a}x + ${c}y)$`,
                `$${c}(${b}x + ${a}y)$`,
                `$${a + 1}(${b}x + ${c}y)$`
            ])
        };
    };

    // EASY 2: Factorise monomial common factor
    const easyMonomial = () => {
        let a, b;
        do { a = randomInt(2, 6); b = randomInt(2, 6); } while (a === b);
        const coeff1 = a * b;
        const correctAnswer = `$${a}x(${b}x + 1)$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${coeff1}x^2 + ${a}x$</p></div>`,
            correctAnswer,
            solution: `$${coeff1}x^2 + ${a}x$<br/><br/>$= ${a}x \\times ${b}x + ${a}x \\times 1$<br/><br/>$= ${a}x(${b}x + 1)$`,
            options: uniqueOptions(correctAnswer, [
                `$${b}x(${a}x + 1)$`,
                `$${a}(${b}x^2 + x)$`,
                `$x(${coeff1}x + ${a})$`
            ])
        };
    };

    // EASY 3: Simple two-term with number common factor (fully simplified)
    const easyBinomial = () => {
        let cf, a, b;
        do {
            cf = randomInt(3, 8);
            a = randomInt(2, 7);
            b = randomInt(2, 7);
        } while (gcd(a, b) !== 1 || cf === a || cf === b || a === b);
        const t1 = cf * a;
        const t2 = cf * b;
        const correctAnswer = `$${cf}(${a}a + ${b}b)$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${t1}a + ${t2}b$</p></div>`,
            correctAnswer,
            solution: `$${t1}a + ${t2}b$<br/><br/>$= ${cf} \\times ${a}a + ${cf} \\times ${b}b$<br/><br/>$= ${cf}(${a}a + ${b}b)$`,
            options: uniqueOptions(correctAnswer, [
                `$${a}(${cf}a + ${b}b)$`,
                `$${cf + 1}(${a}a + ${b}b)$`,
                `$${b}(${a}a + ${cf}b)$`
            ])
        };
    };

    // MEDIUM 1: Common algebraic factor with subtraction (fully simplified)
    const medCommon = () => {
        let a, b, c;
        do {
            a = randomInt(2, 6);
            b = randomInt(2, 6);
            c = randomInt(2, 6);
        } while (gcd(b, c) !== 1 || a === b || a === c || b === c);
        const coeff1 = a * b;
        const coeff2 = a * c;
        const correctAnswer = `$${a}y(${b}y - ${c})$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${coeff1}y^2 - ${coeff2}y$</p></div>`,
            correctAnswer,
            solution: `$${coeff1}y^2 - ${coeff2}y$<br/><br/>$= ${a}y \\times ${b}y - ${a}y \\times ${c}$<br/><br/>$= ${a}y(${b}y - ${c})$`,
            options: uniqueOptions(correctAnswer, [
                `$${b}y(${a}y - ${c})$`,
                `$${a}(${b}y^2 - ${c}y)$`,
                `$${a}y(${b}y + ${c})$`
            ])
        };
    };

    // MEDIUM 2: Three terms with common factor (fully simplified)
    const medTrinomial = () => {
        let cf, a, b, c;
        do {
            cf = randomInt(2, 5);
            a = randomInt(1, 5);
            b = randomInt(1, 5);
            c = randomInt(1, 5);
        } while (gcd(gcd(a, b), c) !== 1 || cf === a);
        const t1 = cf * a;
        const t2 = cf * b;
        const t3 = cf * c;
        const correctAnswer = `$${cf}(${a}x^2 + ${b}x + ${c})$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${t1}x^2 + ${t2}x + ${t3}$</p></div>`,
            correctAnswer,
            solution: `$${t1}x^2 + ${t2}x + ${t3}$<br/><br/>$= ${cf}(${a}x^2 + ${b}x + ${c})$<br/><br/>Taking $${cf}$ common from all terms.`,
            options: uniqueOptions(correctAnswer, [
                `$${a}(${cf}x^2 + ${b}x + ${c})$`,
                `$${cf}(${a}x^2 - ${b}x + ${c})$`,
                `$${cf + 1}(${a}x^2 + ${b}x + ${c})$`
            ])
        };
    };

    // MEDIUM 3: Multi-variable common factor (fully simplified)
    const medMultiVar = () => {
        let a, b, c;
        do {
            a = randomInt(2, 5);
            b = randomInt(2, 5);
            c = randomInt(2, 5);
        } while (gcd(b, c) !== 1 || a === b || a === c || b === c);
        const coeff1 = a * b;
        const coeff2 = a * c;
        const correctAnswer = `$${a}ab(${b}a + ${c}b)$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${coeff1}a^2b + ${coeff2}ab^2$</p></div>`,
            correctAnswer,
            solution: `$${coeff1}a^2b + ${coeff2}ab^2$<br/><br/>$= ${a}ab \\times ${b}a + ${a}ab \\times ${c}b$<br/><br/>$= ${a}ab(${b}a + ${c}b)$`,
            options: uniqueOptions(correctAnswer, [
                `$${a}a(${b}ab + ${c}b^2)$`,
                `$${a}b(${b}a^2 + ${c}ab)$`,
                `$${b}ab(${a}a + ${c}b)$`
            ])
        };
    };

    // HARD 1: Three terms with variable common factor (fully simplified)
    const hardThreeTerm = () => {
        let a, b, c, d;
        do {
            a = randomInt(2, 4);
            b = randomInt(2, 5);
            c = randomInt(2, 5);
            d = randomInt(2, 5);
        } while (gcd(gcd(b, c), d) !== 1 || a === b);
        const t1 = a * b;
        const t2 = a * c;
        const t3 = a * d;
        const correctAnswer = `$${a}x(${b}x^2 + ${c}x + ${d})$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${t1}x^3 + ${t2}x^2 + ${t3}x$</p></div>`,
            correctAnswer,
            solution: `$${t1}x^3 + ${t2}x^2 + ${t3}x$<br/><br/>$= ${a}x(${b}x^2 + ${c}x + ${d})$<br/><br/>Taking $${a}x$ common from all terms.`,
            options: uniqueOptions(correctAnswer, [
                `$${a}(${b}x^3 + ${c}x^2 + ${d}x)$`,
                `$${a}x^2(${b}x + ${c} + ${d})$`,
                `$x(${t1}x^2 + ${t2}x + ${t3})$`
            ])
        };
    };

    // HARD 2: Nested common factor with brackets
    const hardNested = () => {
        let a, b;
        do { a = randomInt(2, 5); b = randomInt(2, 5); } while (a === b);
        const correctAnswer = `$(x + ${a})(${b}x + 1)$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${b}x(x + ${a}) + (x + ${a})$</p></div>`,
            correctAnswer,
            solution: `$${b}x(x + ${a}) + 1 \\cdot (x + ${a})$<br/><br/>Taking $(x + ${a})$ common:<br/><br/>$= (x + ${a})(${b}x + 1)$`,
            options: uniqueOptions(correctAnswer, [
                `$(x + ${a})(${b}x - 1)$`,
                `$(x - ${a})(${b}x + 1)$`,
                `$${b}(x + ${a})(x + 1)$`
            ])
        };
    };

    // HARD 3: Multi-step factoring (fully simplified)
    const hardMultiStep = () => {
        let a, b, c;
        do {
            a = randomInt(2, 4);
            b = randomInt(2, 4);
            c = randomInt(2, 4);
        } while (gcd(b, c) !== 1 || a === b || a === c || b === c);
        const coeff1 = a * b * c;
        const coeff2 = a * b;
        const coeff3 = a * c;
        const correctAnswer = `$${a}(${b * c}x^2y + ${b}xy + ${c}y^2)$`;
        return {
            text: `<div class='question-container'><p>Factorise: $${coeff1}x^2y + ${coeff2}xy + ${coeff3}y^2$</p></div>`,
            correctAnswer,
            solution: `$${coeff1}x^2y + ${coeff2}xy + ${coeff3}y^2$<br/><br/>HCF of ${coeff1}, ${coeff2}, ${coeff3} is $${a}$<br/><br/>$= ${a}(${b * c}x^2y + ${b}xy + ${c}y^2)$`,
            options: uniqueOptions(correctAnswer, [
                `$${b}(${a * c}x^2y + ${a}xy + ${c}y^2)$`,
                `$${c}(${a * b}x^2y + ${b}xy + ${a}y^2)$`,
                `$${a + 1}(${b * c}x^2y + ${b}xy + ${c}y^2)$`
            ])
        };
    };

    // BONUS: Real-world context (fully simplified)
    const bonusRealWorld = () => {
        let a, b, c;
        do {
            a = randomInt(2, 6);
            b = randomInt(3, 8);
            c = randomInt(2, 7);
        } while (gcd(b, c) !== 1 || a === b || a === c || b === c);
        const t1 = a * b;
        const t2 = a * c;
        const correctAnswer = `$${a}(${b}l + ${c}b)$`;
        return {
            text: `<div class='question-container'><p>The perimeter of a rectangle can be written as $${t1}l + ${t2}b$. Express it as a product of a common factor and a sum.</p></div>`,
            correctAnswer,
            solution: `$${t1}l + ${t2}b$<br/><br/>$= ${a} \\times ${b}l + ${a} \\times ${c}b$<br/><br/>$= ${a}(${b}l + ${c}b)$`,
            options: uniqueOptions(correctAnswer, [
                `$${b}(${a}l + ${c}b)$`,
                `$${a + 1}(${b}l + ${c}b)$`,
                `$${c}(${b}l + ${a}b)$`
            ])
        };
    };

    const formatTime = (seconds) => { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins}:${secs.toString().padStart(2, '0')}`; };
    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!userId) return;
        let timeSpent = accumulatedTime.current; if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);
        try { await api.recordAttempt({ user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard', question_text: String(question.text || ''), correct_answer: String(question.correctAnswer || ''), student_answer: String(selected || ''), is_correct: isCorrect, solution_text: String(question.solution || ''), time_spent_seconds: seconds >= 0 ? seconds : 0 }); } catch (e) { console.error("Failed to record attempt", e); }
    };
    const handleCheck = () => { if (!selectedOption || !currentQuestion) return; const isRight = selectedOption === currentQuestion.correctAnswer; setIsCorrect(isRight); setIsSubmitted(true); setAnswers(prev => ({ ...prev, [qIndex]: isRight })); if (isRight) { setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]); } else { setShowExplanationModal(true); } recordQuestionAttempt(currentQuestion, selectedOption, isRight); };
    const handleNext = async () => { if (history.current[qIndex]) { history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; } if (qIndex < TOTAL_QUESTIONS - 1) { setQIndex(prev => prev + 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); accumulatedTime.current = 0; questionStartTime.current = Date.now(); } else { if (sessionId) await api.finishSession(sessionId).catch(console.error); const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (userId) { const totalCorrect = Object.values(answers).filter(val => val === true).length; try { await api.createReport({ title: SKILL_NAME, type: 'practice', score: (totalCorrect / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(userId, 10) }); } catch (err) { console.error("Failed to create report", err); } } navigate(-1); } };
    const handlePrevious = () => { if (history.current[qIndex]) { history.current[qIndex] = { ...history.current[qIndex], selectedOption, isSubmitted, isCorrect }; } if (qIndex > 0) { setQIndex(prev => prev - 1); setShowExplanationModal(false); setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); } };
    const handleOptionSelect = (option) => { if (isSubmitted) return; setSelectedOption(option); };
    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><div className="skill-name-label">{SKILL_NAME}</div></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max"><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div></div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{formatTime(timeElapsed)}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="skill-name-mobile">{SKILL_NAME}</div>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern"><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={currentQuestion.text} /></h2></div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">{shuffledOptions.map((option, idx) => (<button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: '500' }} onClick={() => handleOptionSelect(option)} disabled={isSubmitted}><LatexContent html={option} /></button>))}</div>
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
                    <div className="bottom-right"><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous"><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>)}</div></div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2"><button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>{isSubmitted && (<button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>)}</div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}><div className="nav-buttons-group">{qIndex > 0 && (<button className="nav-pill-prev-btn" onClick={handlePrevious} title="Previous"><ChevronLeft size={28} strokeWidth={3} /> Previous</button>)}{isSubmitted ? (<button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>) : (<button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>)}</div></div>
                </div>
            </footer>
        </div>
    );
};

export default MethodOfCommonFactorsComponent;
