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

const getPrimeFactors = (n) => {
    const factors = [];
    let d = 2;
    let temp = n;
    while (temp > 1) {
        while (temp % d === 0) {
            factors.push(d);
            temp /= d;
        }
        d++;
    }
    return factors;
};

const CORRECT_MESSAGES = [
    "✨ Spot on! You're a prime factor pro! ✨",
    "🌟 Excellent! The factor tree is clear to you! 🌟",
    "🎉 Correct! You've broken down the number perfectly! 🎉",
    "🚀 Great work! 🚀",
    "💎 Brilliant! 💎"
];

const PrimeFactorisation = () => {
    const navigate = useNavigate();
    const storageKey = `practice_grade_6_prime_factorisation`;

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
    const SKILL_ID = 1070;
    const SKILL_NAME = "Prime Factorisation";
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
        const nums = [24, 36, 48, 60, 72, 84, 90, 100, 120, 150];
        const num = nums[index % nums.length];
        const factors = getPrimeFactors(num);
        const factorCounts = {};
        factors.forEach(f => factorCounts[f] = (factorCounts[f] || 0) + 1);
        const primeString = Object.entries(factorCounts)
            .map(([f, c]) => c > 1 ? `${f}<sup>${c}</sup>` : f)
            .join(' × ');

        let qText, correct, options, explanation;

        const subType = randomInt(0, 1);
        if (subType === 0) {
            qText = `Identify the <strong>prime factorisation</strong> of <strong>${num}</strong>.`;
            correct = primeString;
            const wrong1 = factors.slice(0, -1).join(' × ') + ' × 5';
            const wrong2 = factors.join(' × ') + ' × 2';
            const wrong3 = "2 × 3 × 5 × 7";
            options = [correct, wrong1, wrong2, wrong3];
            explanation = `By repeatedly dividing ${num} by smallest prime numbers:<br/>${num} = ${factors.join(' × ')} = ${primeString}.`;
        } else {
            const missingIdx = randomInt(0, factors.length - 1);
            const missingVal = factors[missingIdx];
            const displayFactors = [...factors];
            displayFactors[missingIdx] = '?';
            qText = `Complete the prime factorisation: <strong>${num} = ${displayFactors.join(' × ')}</strong>. What is the value of <strong>?</strong>`;
            correct = missingVal.toString();
            options = [correct, (missingVal + 1).toString(), (missingVal + 2).toString(), "1"];
            explanation = `Multiply the known factors: ${factors.filter((_, i) => i !== missingIdx).join(' × ')} = ${num / missingVal}.<br/>Then divide ${num} by ${num / missingVal} to get <strong>${missingVal}</strong>.`;
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

export default PrimeFactorisation;
