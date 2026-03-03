import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const gcd = (a, b) => (!b ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

const CORRECT_MESSAGES = [
    "✨ Great job! You're a factor master! ✨",
    "🌟 Excellent calculation! 🌟",
    "🎉 Correct! You've got the multiples down! 🎉",
    "🚀 Way to go! 🚀",
    "💎 Perfect! 💎"
];

const CommonMultiplesAndCommonFactors = () => {
    const navigate = useNavigate();
    const storageKey = `practice_grade_6_factors_multiples`;

    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [history, setHistory] = useState(() => getSessionData(`${storageKey}_history`, {}));
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const SKILL_ID = 1067;
    const SKILL_NAME = "Common Multiples and Factors";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));

    useEffect(() => {
        sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
        sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
        sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
        sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
        if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
    }, [qIndex, history, answers, sessionId, timeElapsed]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, [sessionId]);

    useEffect(() => {
        if (history[qIndex]) {
            const data = history[qIndex];
            setCurrentQuestion(data.question);
            setShuffledOptions(data.options);
            setSelectedOption(data.selectedOption);
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        const types = ["factor_list", "multiple_list", "hcf", "lcm", "common_factors"];
        const type = types[index % types.length];
        let qText, correct, options, explanation;

        if (type === "factor_list") {
            const num = [12, 16, 18, 20, 24][randomInt(0, 4)];
            qText = `Which of these is NOT a factor of <strong>${num}</strong>?`;
            const factors = [];
            for (let i = 1; i <= num; i++) if (num % i === 0) factors.push(i);
            const nonFactors = [5, 7, 9, 11, 13, 17].filter(n => num % n !== 0);
            correct = nonFactors[randomInt(0, nonFactors.length - 1)].toString();
            options = [correct, factors[0].toString(), factors[1].toString(), factors[2].toString()];
            explanation = `Factors are numbers that divide ${num} exactly. Factors of ${num} are: ${factors.join(', ')}.`;
        } else if (type === "multiple_list") {
            const num = randomInt(4, 9);
            qText = `Which of these is a multiple of <strong>${num}</strong>?`;
            correct = (num * randomInt(3, 10)).toString();
            options = [correct, (num * 2 - 1).toString(), (num * 3 + 1).toString(), (num * 4 - 2).toString()];
            explanation = `Multiples of ${num} are obtained by multiplying ${num} by 1, 2, 3... (e.g., ${num}, ${num * 2}, ${num * 3}...)`;
        } else if (type === "hcf") {
            const a = [12, 18, 24, 30][randomInt(0, 3)];
            const b = [16, 20, 28, 32][randomInt(0, 3)];
            const h = gcd(a, b);
            qText = `Find the <strong>Highest Common Factor (HCF)</strong> of <strong>${a}</strong> and <strong>${b}</strong>.`;
            correct = h.toString();
            options = [correct, (h + 2).toString(), (h * 2).toString(), "1"];
            explanation = `Factors of ${a}: ${getFactors(a).join(', ')}<br/>Factors of ${b}: ${getFactors(b).join(', ')}<br/>Common: ${commonElements(getFactors(a), getFactors(b)).join(', ')}. Highest is <strong>${h}</strong>.`;
        } else if (type === "lcm") {
            const a = [4, 6, 8][randomInt(0, 2)];
            const b = [5, 9, 10][randomInt(0, 2)];
            const l = lcm(a, b);
            qText = `Find the <strong>Least Common Multiple (LCM)</strong> of <strong>${a}</strong> and <strong>${b}</strong>.`;
            correct = l.toString();
            options = [correct, (l - a).toString(), (l + b).toString(), (a * b * 2).toString()];
            explanation = `Multiples of ${a}: ${a}, ${a * 2}, ${a * 3}...<br/>Multiples of ${b}: ${b}, ${b * 2}, ${b * 3}...<br/>The smallest common multiple is <strong>${l}</strong>.`;
        } else {
            const a = 12, b = 18;
            qText = `How many <strong>common factors</strong> do <strong>${a}</strong> and <strong>${b}</strong> have?`;
            const common = commonElements(getFactors(a), getFactors(b));
            correct = common.length.toString();
            options = [correct, (common.length + 1).toString(), (common.length - 1).toString(), "1"];
            explanation = `Factors of ${a}: {1, 2, 3, 4, 6, 12}<br/>Factors of ${b}: {1, 2, 3, 6, 9, 18}<br/>Common Factors: {${common.join(', ')}}. Total: <strong>${common.length}</strong>.`;
        }

        const question = { text: qText, correctAnswer: correct, solution: explanation, options };
        const shuff = [...new Set(options)].sort(() => Math.random() - 0.5);
        setCurrentQuestion(question);
        setShuffledOptions(shuff);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
        questionStartTime.current = Date.now();
        setHistory(prev => ({ ...prev, [index]: { question, options: shuff, selectedOption: null, isSubmitted: false, isCorrect: false } }));
    };

    const getFactors = n => { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
    const commonElements = (arr1, arr2) => arr1.filter(value => arr2.includes(value));

    const handleCheck = async () => {
        if (!selectedOption || isSubmitted) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));
        const feedback = isRight ? CORRECT_MESSAGES[randomInt(0, CORRECT_MESSAGES.length - 1)] : "";
        setFeedbackMessage(feedback);
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            const timeSpent = Math.max(0, Math.round((Date.now() - questionStartTime.current) / 1000));
            api.recordAttempt({ user_id: parseInt(userId), session_id: sessionId, skill_id: SKILL_ID, difficulty_level: 'Medium', question_text: currentQuestion.text, correct_answer: currentQuestion.correctAnswer, student_answer: selectedOption, is_correct: isRight, solution_text: currentQuestion.solution, time_spent_seconds: timeSpent }).catch(console.error);
        }
        if (!isRight) setShowExplanationModal(true);
        setHistory(prev => ({ ...prev, [qIndex]: { ...prev[qIndex], selectedOption, isSubmitted: true, isCorrect: isRight, feedbackMessage: feedback } }));
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) setQIndex(p => p + 1);
        else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(v => v === true).length;
                api.createReport({ title: SKILL_NAME, type: 'practice', score: (totalCorrect / TOTAL_QUESTIONS) * 100, parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, time_taken_seconds: timeElapsed }, user_id: parseInt(userId) }).catch(console.error);
            }
            sessionStorage.clear(); navigate(-1);
        }
    };

    if (!currentQuestion) return <div className="junior-practice-page">Loading...</div>;

    return (
        <div className="junior-practice-page">
            <header className="junior-practice-header">
                <div className="header-left"><span className="chapter-title">{SKILL_NAME}</span></div>
                <div className="header-center"><div className="question-counter">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div></div>
                <div className="header-right"><div className="timer-display">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div></div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col">
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
                                <div className="question-card-modern">
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern"><LatexContent html={currentQuestion.text} /></h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((opt, i) => (
                                                <button key={i} onClick={() => !isSubmitted && setSelectedOption(opt)} className={`option-button-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct">
                                                <img src={mascotImg} alt="Mascot" className="mascot-feedback" />
                                                <div className="feedback-content">{feedbackMessage}</div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />
            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="exit-btn-modern" onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-prev-btn" onClick={() => setQIndex(p => Math.max(0, p - 1))} disabled={qIndex === 0}><ChevronLeft /> PREV</button>
                            {isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "DONE"} <ChevronRight /></button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>SUBMIT <Check /></button>}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CommonMultiplesAndCommonFactors;
