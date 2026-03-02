import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/SquaresAndSquareRoots.css';

const CORRECT_MESSAGES = ["✨ Amazing job! ✨", "🌟 Brilliant! 🌟", "🎉 Correct! 🎉", "🚀 Super! 🚀"];

const generateQuestionData = () => {
    return [
        {
            text: "To find $\\sqrt{17.64}$, how many decimal places will the root have?",
            options: ["$1$", "$2$", "$0$", "$4$"],
            correctAnswer: "$1$",
            solution: "The given number has $2$ decimal places. So, its square root will have $2/2 = 1$ decimal place.",
        },
        {
            text: "Find the square root of $2.25$.",
            options: ["$1.5$", "$0.15$", "$15$", "$0.015$"],
            correctAnswer: "$1.5$",
            solution: "We know $\\sqrt{225} = 15$. Since $2.25$ has $2$ decimal places, the root has $1$ decimal place: $1.5$.",
        },
        {
            text: "Find the square root of $0.09$.",
            options: ["$0.3$", "$0.03$", "$0.003$", "$3$"],
            correctAnswer: "$0.3$",
            solution: "$\\sqrt{9} = 3$. The number $0.09$ has $2$ decimal places, so the root has $1$ decimal place: $0.3$.",
        },
        {
            text: "Find the square root of $42.25$.",
            options: ["$6.5$", "$6.25$", "$7.5$", "$5.5$"],
            correctAnswer: "$6.5$",
            solution: "$\\sqrt{4225} = 65$. The root of $42.25$ is $6.5$.",
        },
        {
            text: "The area of a square is $31.36\\text{ m}^2$. What is the side?",
            options: ["$5.6\\text{ m}$", "$5.4\\text{ m}$", "$5.8\\text{ m}$", "$4.6\\text{ m}$"],
            correctAnswer: "$5.6\\text{ m}$",
            solution: "Area $= \\text{side}^2$. Side $= \\sqrt{31.36} = 5.6\\text{ m}$.",
        },
        {
            text: "Calculate $\\sqrt{51.84}$.",
            options: ["$7.2$", "$7.4$", "$7.6$", "$7.8$"],
            correctAnswer: "$7.2$",
            solution: "$70^2 = 4900$. The number $5184$ ends in $4$, so its root ends in $2$ or $8$. $72^2 = 5184$. Thus $\\sqrt{51.84} = 7.2$.",
        },
        {
            text: "Calculate $\\sqrt{0.0004}$.",
            options: ["$0.02$", "$0.2$", "$0.002$", "$0.04$"],
            correctAnswer: "$0.02$",
            solution: "The given number has $4$ decimal places, so the root will have $2$. $\\sqrt{4} = 2$, so $0.02$.",
        },
        {
            text: "Estimate $\\sqrt{90}$ to the nearest whole number.",
            options: ["$9$", "$10$", "$8$", "$11$"],
            correctAnswer: "$9$",
            solution: "$9^2 = 81$ and $10^2 = 100$. Since $90$ is closer to $81$ than $100$ ($9$ diff vs $10$ diff), the nearest whole number is $9$.",
        },
        {
            text: "Evaluate $\\sqrt{1.44} + \\sqrt{0.0144}$.",
            options: ["$1.32$", "$1.212$", "$0.132$", "$2.4$"],
            correctAnswer: "$1.32$",
            solution: "$\\sqrt{1.44} = 1.2$ and $\\sqrt{0.0144} = 0.12$. Adding them: $1.2 + 0.12 = 1.32$.",
        },
        {
            text: "If the area of a square is $12.25\\text{ m}^2$, find its perimeter.",
            options: ["$14\\text{ m}$", "$12\\text{ m}$", "$3.5\\text{ m}$", "$17.5\\text{ m}$"],
            correctAnswer: "$14\\text{ m}$",
            solution: "Side $= \\sqrt{12.25} = 3.5\\text{ m}$. Perimeter $= 4 \\times \\text{side} = 4 \\times 3.5 = 14\\text{ m}$.",
        }
    ];
};

const SquareRootOfDecimals = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [questions, setQuestions] = useState([]);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1254;
    const SKILL_NAME = "Square Root of Decimals";
    const TOTAL_QUESTIONS = 10;

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(s => s && setSessionId(s.session_id));
        }
        const prepared = generateQuestionData().map(q => ({
            ...q,
            options: [...q.options].sort(() => Math.random() - 0.5)
        }));
        setQuestions(prepared);
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const handleVisibility = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", handleVisibility); };
    }, []);

    useEffect(() => {
        const currentAnswer = answers[qIndex];
        if (currentAnswer) {
            setSelectedOption(currentAnswer.selectedOption);
            setIsCorrect(currentAnswer.isCorrect);
            setIsSubmitted(true);
            setFeedbackMessage(currentAnswer.isCorrect ? CORRECT_MESSAGES[qIndex % CORRECT_MESSAGES.length] : "");
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
            setFeedbackMessage("");
        }
    }, [qIndex, answers]);

    useEffect(() => {
        setShowExplanationModal(false);
        accumulatedTime.current = 0;
        questionStartTime.current = Date.now();
    }, [qIndex]);

    const formatTime = (secs) => `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, '0')}`;

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
        if (!isRight) setShowExplanationModal(true);

        const userId = sessionStorage.getItem('userId');
        if (userId) {
            let timeSpent = accumulatedTime.current;
            if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;

            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption,
                is_correct: isRight,
                solution_text: currentQ.solution,
                time_spent_seconds: Math.round(timeSpent / 1000)
            }).catch(console.error);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(p => p + 1);
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(v => v.isCorrect).length;
                api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: TOTAL_QUESTIONS,
                        correct_answers: totalCorrect,
                        time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="class8-practice-page">
            <header className="class8-header">
                <div className="class8-skill-name">{SKILL_NAME}</div>
                <div className="class8-progress-pill">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="class8-timer">⏱ {formatTime(timeElapsed)}</div>
            </header>
            <main className="class8-content">
                <div className="class8-card">
                    <AnimatePresence mode="wait">
                        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
                            <h2 className="class8-question-text"><LatexContent html={currentQuestion.text} /></h2>
                            <div className="class8-options-grid">
                                {currentQuestion.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`class8-option ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`}
                                        onClick={() => !isSubmitted && setSelectedOption(opt)}
                                        disabled={isSubmitted}
                                    >
                                        <LatexContent html={opt} />
                                    </button>
                                ))}
                            </div>
                            {isSubmitted && isCorrect && (
                                <div className="class8-feedback correct">
                                    <img src={mascotImg} alt="Mascot" width="40" height="40" />
                                    {feedbackMessage}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />
            <footer className="class8-footer">
                <button className="class8-btn class8-btn-exit" onClick={() => { if (sessionId) api.finishSession(sessionId); navigate(-1); }}><X size={20} /> Exit</button>
                {isSubmitted && <button className="class8-btn class8-btn-explain" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {qIndex > 0 && <button className="class8-btn class8-btn-prev" onClick={() => setQIndex(p => p - 1)}><ChevronLeft size={20} /> Prev</button>}
                    {isSubmitted ? (
                        <button className="class8-btn class8-btn-submit" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'Next' : 'Done'} <ChevronRight size={20} /></button>
                    ) : (
                        <button className="class8-btn class8-btn-submit" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={20} /></button>
                    )}
                </div>
            </footer>
        </div>
    );
};
export default SquareRootOfDecimals;
