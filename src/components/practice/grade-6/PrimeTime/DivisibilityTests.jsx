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

const CORRECT_MESSAGES = [
    "✨ Amazing! You're a divisibility expert! ✨",
    "🌟 Brilliant! You handled those digits perfectly! 🌟",
    "🎉 Correct! Your math skills are shining! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're moving fast! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const DivisibilityTests = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const storageKey = `practice_grade_6_divisibility`;

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
    const isTabActive = useRef(true);
    const SKILL_ID = 1071;
    const SKILL_NAME = "Divisibility Tests";

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
        const rules = [2, 3, 4, 5, 6, 8, 9, 10, 11];
        const divisor = rules[index % rules.length];
        let number, isDivisible, qText, correct, options, explanation;

        // Ensure variety in questions
        const subType = randomInt(0, 1); // 0: Is this number divisible?, 1: Find the missing digit / which number is divisible?

        if (subType === 0) {
            // Is this number divisible by X?
            isDivisible = Math.random() > 0.5;
            if (isDivisible) {
                number = randomInt(100, 2000) * divisor;
            } else {
                number = randomInt(100, 2000) * divisor + randomInt(1, divisor - 1);
            }

            qText = `Is the number <strong>${number}</strong> divisible by <strong>${divisor}</strong>?`;
            correct = isDivisible ? "Yes" : "No";
            options = ["Yes", "No"];

            explanation = getDivisibilityExplanation(number, divisor);
        } else {
            // Which of these is divisible by X?
            const multiple = randomInt(50, 500) * divisor;
            const wrong1 = multiple + randomInt(1, divisor - 1);
            const wrong2 = multiple - randomInt(1, divisor - 1);
            const wrong3 = multiple + randomInt(divisor + 1, 2 * divisor - 1);

            qText = `Which of these numbers is divisible by <strong>${divisor}</strong>?`;
            correct = multiple.toString();
            options = [multiple.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()];
            explanation = `By checking the divisibility rule for ${divisor}:<br/>${getDivisibilityExplanation(multiple, divisor)}`;
        }

        const question = {
            text: qText,
            correctAnswer: correct,
            solution: explanation,
            options: options
        };

        const shuff = [...new Set(options)].sort(() => Math.random() - 0.5);

        setCurrentQuestion(question);
        setShuffledOptions(shuff);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
        questionStartTime.current = Date.now();
        accumulatedTime.current = 0;

        setHistory(prev => ({
            ...prev,
            [index]: { question, options: shuff, selectedOption: null, isSubmitted: false, isCorrect: false }
        }));
    };

    const getDivisibilityExplanation = (num, divisor) => {
        const s = num.toString();
        const digits = s.split('').map(Number);
        const lastDigit = digits[digits.length - 1];
        const sum = digits.reduce((a, b) => a + b, 0);

        switch (divisor) {
            case 2: return `Rule for 2: Last digit must be even (0, 2, 4, 6, 8).<br/>Last digit of ${num} is ${lastDigit}.`;
            case 3: return `Rule for 3: Sum of digits must be divisible by 3.<br/>Sum: ${digits.join(' + ')} = ${sum}. ${sum % 3 === 0 ? "Divisible!" : "Not divisible."}`;
            case 4: return `Rule for 4: Number formed by last two digits must be divisible by 4.<br/>Last two digits: ${s.slice(-2)}.`;
            case 5: return `Rule for 5: Last digit must be 0 or 5.<br/>Last digit is ${lastDigit}.`;
            case 6: return `Rule for 6: Must be divisible by both 2 and 3.<br/>Even? ${num % 2 === 0 ? "Yes" : "No"}. Sum: ${sum} (divisible by 3? ${sum % 3 === 0 ? "Yes" : "No"}).`;
            case 8: return `Rule for 8: Number formed by last three digits must be divisible by 8.<br/>Last three digits: ${s.slice(-3)}.`;
            case 9: return `Rule for 9: Sum of digits must be divisible by 9.<br/>Sum: ${sum}. ${sum % 9 === 0 ? "Divisible!" : "Not divisible."}`;
            case 10: return `Rule for 10: Last digit must be 0.<br/>Last digit is ${lastDigit}.`;
            case 11:
                let oddSum = 0, evenSum = 0;
                digits.reverse().forEach((d, i) => { if (i % 2 === 0) oddSum += d; else evenSum += d; });
                const diff = Math.abs(oddSum - evenSum);
                return `Rule for 11: Difference between sum of odd-place digits and even-place digits must be 0 or divisible by 11.<br/>Difference: |${oddSum} - ${evenSum}| = ${diff}.`;
            default: return `Check if ${num} ÷ ${divisor} leaves remainder 0.`;
        }
    };

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
            const timeSpent = Math.round((Date.now() - questionStartTime.current + accumulatedTime.current) / 1000);
            api.recordAttempt({
                user_id: parseInt(userId),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: 'Medium',
                question_text: currentQuestion.text,
                correct_answer: currentQuestion.correctAnswer,
                student_answer: selectedOption,
                is_correct: isRight,
                solution_text: currentQuestion.solution,
                time_spent_seconds: timeSpent
            }).catch(console.error);
        }

        if (!isRight) setShowExplanationModal(true);

        setHistory(prev => ({
            ...prev,
            [qIndex]: { ...prev[qIndex], selectedOption, isSubmitted: true, isCorrect: isRight, feedbackMessage: feedback }
        }));
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(v => v === true).length;
                api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId)
                }).catch(console.error);
            }
            sessionStorage.clear(); // Clear practice progress
            navigate(-1);
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
                                        <h2 className="question-text-modern">
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => !isSubmitted && setSelectedOption(opt)}
                                                    className={`option-button-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={opt} />
                                                </button>
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

export default DivisibilityTests;
