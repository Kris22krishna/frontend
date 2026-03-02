import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/SquaresAndSquareRoots.css';

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨"
];

const generateQuestionData = () => {
    return [
        {
            text: "Which of the following numbers can be a perfect square? (Hint: Check the unit digit)",
            options: ["$1057$", "$23453$", "$7928$", "$1024$"],
            correctAnswer: "$1024$",
            solution: "A perfect square never ends with $2, 3, 7,$ or $8$. Therefore, $1057, 23453,$ and $7928$ cannot be perfect squares. $1024$ ($32^2$) is a perfect square.",
        },
        {
            text: "A number ending in which of the following digits is NEVER a perfect square?",
            options: ["$4$", "$6$", "$9$", "$8$"],
            correctAnswer: "$8$",
            solution: "The unit digits of squares of numbers from $1$ to $9$ are $1, 4, 9, 6, 5$. Hence, a perfect square can never end in $2, 3, 7,$ or $8$.",
        },
        {
            text: "Which of the following numbers is NOT a perfect square?",
            options: ["$100$", "$169$", "$225$", "$250$"],
            correctAnswer: "$250$",
            solution: "A perfect square ending in $0$ must have an even number of trailing zeros. $250$ has an odd number of trailing zeros ($1$ zero), so it is not a perfect square. Also, $\\sqrt{250}$ is not an integer.",
        },
        {
            text: "Between $30$ and $40$, how many perfect squares exist?",
            options: ["$1$", "$2$", "$3$", "$0$"],
            correctAnswer: "$1$",
            solution: "The square of $5$ is $25$. The square of $6$ is $36$. The square of $7$ is $49$. Between $30$ and $40$, only $36$ exists. So there is exactly $1$ perfect square.",
        },
        {
            text: "Which of the following numbers ending in zero could be a perfect square?",
            options: ["$4000$", "$900$", "$16000$", "$250$"],
            correctAnswer: "$900$",
            solution: "A perfect square must have an even number of trailing zeroes. $4000, 16000,$ and $250$ all have an odd number of trailing zeros. $900$ has $2$ trailing zeroes and $9 = 3^2$, making it a perfect square ($30^2$).",
        },
        {
            text: "What is the smallest perfect square that is a two-digit number?",
            options: ["$10$", "$12$", "$16$", "$25$"],
            correctAnswer: "$16$",
            solution: "The squares of the first few natural numbers are $1^2=1$, $2^2=4$, $3^2=9$, $4^2=16$. The first square that is a two-digit number is $16$.",
        },
        {
            text: "How many perfect squares lie strictly between $100$ and $200$?",
            options: ["$3$", "$4$", "$5$", "$6$"],
            correctAnswer: "$4$",
            solution: "We know $10^2 = 100$. The squares after $100$ are $11^2=121$, $12^2=144$, $13^2=169$, $14^2=196$. The next is $15^2=225$, which is greater than $200$. So there are $4$ perfect squares between $100$ and $200$.",
        },
        {
            text: "Which of the following large numbers is a perfect square?",
            options: ["$1296$", "$1297$", "$1298$", "$1299$"],
            correctAnswer: "$1296$",
            solution: "A perfect square does not end in $7, 8,$ or $9$ (unless $9$, but we can verify $1296$ is a square). $36^2 = 1296$.",
        },
        {
            text: "Which of the following numbers is a perfect square?",
            options: ["$441$", "$442$", "$443$", "$444$"],
            correctAnswer: "$441$",
            solution: "Numbers cannot end in $2$ or $3$ to be perfect squares. As for $444$, division by $4$ leaves $111$, which is not a square. $441 = 21^2$. Therefore, $441$ is the perfect square.",
        },
        {
            text: "Can a number with an odd number of trailing zeros be a perfect square?",
            options: ["$Yes$", "$No$", "$Sometimes$", "$Only\\ if\\ the\\ preceding\\ part\\ is\\ a\\ square$"],
            correctAnswer: "$No$",
            solution: "If a number has zeroes at the end, it must have an EVEN number of trailing zeroes to be a perfect square. Thus, no number with an odd number of trailing zeroes is a perfect square.",
        }
    ];
};

const IdentifyPerfectSquares = () => {
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

    // Config
    const SKILL_ID = 1247;
    const SKILL_NAME = "Identify Perfect Squares";
    const TOTAL_QUESTIONS = 10;

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
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
        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
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

    const formatTime = (secs) => {
        const mins = Math.floor(secs / 60);
        return `${mins}:${(secs % 60).toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
        if (!isRight) setShowExplanationModal(true);

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
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
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
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
export default IdentifyPerfectSquares;
