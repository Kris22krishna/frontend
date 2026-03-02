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
            text: "What will be the unit digit of the square of $52698$?",
            options: ["$4$", "$8$", "$6$", "$2$"],
            correctAnswer: "$4$",
            solution: "The unit digit of $52698$ is $8$. The square of $8$ is $64$. The unit digit of $64$ is $4$. Therefore, the unit digit of the square of $52698$ is $4$.",
        },
        {
            text: "Which of the following numbers would have digit $1$ at its units place when squared?",
            options: ["$73$", "$161$", "$255$", "$146$"],
            correctAnswer: "$161$",
            solution: "If a number ends in $1$ or $9$, its square ends in $1$. Here, $161$ ends in $1$, so its square will end in $1$.",
        },
        {
            text: "Which of the following numbers would have digit $6$ at units place when squared?",
            options: ["$19$", "$24$", "$25$", "$13$"],
            correctAnswer: "$24$",
            solution: "A number's square ends in $6$ if the number itself ends in $4$ or $6$. Among the options, $24$ ends in $4$, so its square ends in $6$ ($24^2 = 576$).",
        },
        {
            text: "How many non-square numbers lie between $9^2$ and $10^2$?",
            options: ["$17$", "$18$", "$19$", "$20$"],
            correctAnswer: "$18$",
            solution: "There are exactly $2n$ non-perfect square numbers between $n^2$ and $(n+1)^2$. For $n=9$, the number of non-square numbers is $2 \\times 9 = 18$.",
        },
        {
            text: "How many non-square numbers lie between $100^2$ and $101^2$?",
            options: ["$199$", "$200$", "$201$", "$202$"],
            correctAnswer: "$200$",
            solution: "Using the property that there are $2n$ non-square numbers between $n^2$ and $(n+1)^2$, for $n=100$, the answer is $2 \\times 100 = 200$.",
        },
        {
            text: "The number $121$ is the sum of the first how many odd natural numbers?",
            options: ["$9$", "$10$", "$11$", "$12$"],
            correctAnswer: "$11$",
            solution: "The sum of the first $n$ odd natural numbers is $n^2$. Since $121 = 11^2$, it is the sum of the first $11$ odd natural numbers.",
        },
        {
            text: "If you square an odd number, what kind of number do you get?",
            options: ["$Always\\ Even$", "$Always\\ Odd$", "$Sometimes\\ Even$", "$Depends\\ on\\ the\\ number$"],
            correctAnswer: "$Always\\ Odd$",
            solution: "The square of an odd number is always an odd number. Let's take $3$ (odd), $3^2 = 9$ (odd). $5^2 = 25$ (odd).",
        },
        {
            text: "Which of the following squares is an even number?",
            options: ["$431^2$", "$2826^2$", "$7779^2$", "$82005^2$"],
            correctAnswer: "$2826^2$",
            solution: "The square of an even number is even, and the square of an odd number is odd. Since $2826$ is the only even number, its square will be even.",
        },
        {
            text: "Express $6^2$ as a sum of odd numbers.",
            options: ["$1 + 3 + 5 + 7 + 9 + 11$", "$2 + 4 + 6 + 8 + 10 + 12$", "$1 + 2 + 3 + 4 + 5 + 6$", "$1 + 5 + 9 + 13 + 17$"],
            correctAnswer: "$1 + 3 + 5 + 7 + 9 + 11$",
            solution: "The sum of first $n$ odd natural numbers is $n^2$. So $6^2$ is the sum of the first $6$ odd natural numbers.",
        },
        {
            text: "Without adding, find the sum: $1 + 3 + 5 + 7 + 9 + 11 + 13 + 15 + 17 + 19$.",
            options: ["$81$", "$100$", "$121$", "$144$"],
            correctAnswer: "$100$",
            solution: "There are exactly $10$ consecutive odd numbers starting from $1$. The sum of the first $10$ odd numbers is $10^2 = 100$.",
        }
    ];
};

const PropertiesOfSquareNumbers = () => {
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

    const SKILL_ID = 1248;
    const SKILL_NAME = "Properties of Square Numbers";
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
export default PropertiesOfSquareNumbers;
