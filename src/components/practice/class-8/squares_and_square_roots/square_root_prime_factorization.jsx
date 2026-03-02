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
            text: "What is the prime factorization of $36$?",
            options: ["$2^2 \\times 3^2$", "$2 \\times 3^3$", "$2^3 \\times 3$", "$2^2 \\times 3^3$"],
            correctAnswer: "$2^2 \\times 3^2$",
            solution: "$36 = 2 \\times 18 = 2 \\times 2 \\times 9 = 2 \\times 2 \\times 3 \\times 3 = 2^2 \\times 3^2$.",
        },
        {
            text: "Find the square root of $144$ by prime factorization.",
            options: ["$12$", "$14$", "$16$", "$18$"],
            correctAnswer: "$12$",
            solution: "$144 = 2^4 \\times 3^2$. Its square root is $2^2 \\times 3 = 4 \\times 3 = 12$.",
        },
        {
            text: "Find the square root of $400$.",
            options: ["$20$", "$30$", "$40$", "$10$"],
            correctAnswer: "$20$",
            solution: "$400 = 4 \\times 100$. $\\sqrt{4} = 2$ and $\\sqrt{100} = 10$. So, $2 \\times 10 = 20$.",
        },
        {
            text: "By what smallest whole number should $48$ be multiplied to make it a perfect square?",
            options: ["$2$", "$3$", "$4$", "$6$"],
            correctAnswer: "$3$",
            solution: "$48 = 2 \\times 2 \\times 2 \\times 2 \\times 3$. The prime factor $3$ does not have a pair. Therefore, we must multiply by $3$.",
        },
        {
            text: "By what smallest whole number should $200$ be divided to get a perfect square?",
            options: ["$2$", "$4$", "$5$", "$10$"],
            correctAnswer: "$2$",
            solution: "$200 = 2 \\times 100 = 2 \\times 2 \\times 2 \\times 5 \\times 5$. The factor $2$ is unpaired. So we must divide by $2$.",
        },
        {
            text: "Find the square root of $1764$ by prime factorization.",
            options: ["$42$", "$44$", "$46$", "$48$"],
            correctAnswer: "$42$",
            solution: "$1764 = 2^2 \\times 3^2 \\times 7^2$. Square root is $2 \\times 3 \\times 7 = 42$.",
        },
        {
            text: "Find the smallest square number that is divisible by $4$, $9$, and $10$.",
            options: ["$900$", "$180$", "$360$", "$1600$"],
            correctAnswer: "$900$",
            solution: "LCM of $4, 9, 10$ is $180 = 2^2 \\times 3^2 \\times 5$. To make it a perfect square, multiply by the unpaired factor $5$. $180 \\times 5 = 900$.",
        },
        {
            text: "Find the square root of $5929$.",
            options: ["$77$", "$73$", "$83$", "$87$"],
            correctAnswer: "$77$",
            solution: "Prime factorization of $5929 = 7 \\times 7 \\times 11 \\times 11$. Square root is $7 \\times 11 = 77$.",
        },
        {
            text: "By what smallest whole number should $600$ be multiplied to get a perfect square?",
            options: ["$6$", "$2$", "$3$", "$10$"],
            correctAnswer: "$6$",
            solution: "$600 = 2^3 \\times 3 \\times 5^2$. Unpaired factors are one $2$ and one $3$. Multiply by $2 \\times 3 = 6$.",
        },
        {
            text: "Find the square root of $7056$.",
            options: ["$84$", "$86$", "$74$", "$94$"],
            correctAnswer: "$84$",
            solution: "$7056 = 2^4 \\times 3^2 \\times 7^2$. Square root is $2^2 \\times 3 \\times 7 = 4 \\times 21 = 84$.",
        }
    ];
};

const SquareRootPrimeFactorization = () => {
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

    const SKILL_ID = 1252;
    const SKILL_NAME = "Square Root via Prime Factorization";
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
export default SquareRootPrimeFactorization;
