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
            text: "Since $4^2 = 16$, what is the square root of $16$?",
            options: ["$2$", "$4$", "$8$", "$16$"],
            correctAnswer: "$4$",
            solution: "Square root is the inverse operation of squaring. Since $4^2 = 16$, the square root of $16$ is $4$.",
        },
        {
            text: "What does the symbol $\\sqrt{}$ formally denote?",
            options: ["$Positive\\ square\\ root$", "$Negative\\ square\\ root$", "$Any\\ square\\ root$", "$Cube\\ root$"],
            correctAnswer: "$Positive\\ square\\ root$",
            solution: "The symbol $\\sqrt{}$ stands for the principal or positive square root of a number.",
        },
        {
            text: "If $n^2 = 81$, what is $\\sqrt{81}$?",
            options: ["$9$", "$-9$", "$\\pm 9$", "$81$"],
            correctAnswer: "$9$",
            solution: "Although $(-9)^2 = 81$ and $9^2 = 81$, the radical sign $\\sqrt{}$ specifically asks for the positive square root. So, $\\sqrt{81} = 9$.",
        },
        {
            text: "True or False: Square root is the inverse operation of squaring.",
            options: ["$True$", "$False$", "$Only\\ for\\ even\\ numbers$", "$Only\\ for\\ odd\\ numbers$"],
            correctAnswer: "$True$",
            solution: "Just as subtraction is inverse of addition, finding the square root is the inverse operation of squaring.",
        },
        {
            text: "Which of the following perfect squares has a positive square root of $15$?",
            options: ["$125$", "$225$", "$325$", "$625$"],
            correctAnswer: "$225$",
            solution: "Since $15 \\times 15 = 225$, the perfect square $225$ has the square root $15$.",
        },
        {
            text: "Evaluate $\\sqrt{100} + \\sqrt{64}$.",
            options: ["$18$", "$16$", "$14$", "$10$"],
            correctAnswer: "$18$",
            solution: "$\\sqrt{100} = 10$ and $\\sqrt{64} = 8$. Their sum is $10 + 8 = 18$.",
        },
        {
            text: "If the area of a square is $144\\text{ cm}^2$, what is its side?",
            options: ["$10\\text{ cm}$", "$12\\text{ cm}$", "$14\\text{ cm}$", "$16\\text{ cm}$"],
            correctAnswer: "$12\\text{ cm}$",
            solution: "The area of a square is side $\\times$ side = $\\text{side}^2$. So, $\\text{side}^2 = 144$. Then $\\text{side} = \\sqrt{144} = 12\\text{ cm}$.",
        },
        {
            text: "Evaluate $\\sqrt{(-5)^2}$.",
            options: ["$-5$", "$5$", "$\\pm 5$", "$25$"],
            correctAnswer: "$5$",
            solution: "$(-5)^2 = 25$. The symbol $\\sqrt{}$ denotes the positive square root, so $\\sqrt{25} = 5$.",
        },
        {
            text: "Evaluate $\\sqrt{169} - \\sqrt{121}$.",
            options: ["$4$", "$2$", "$3$", "$1$"],
            correctAnswer: "$2$",
            solution: "$\\sqrt{169} = 13$ and $\\sqrt{121} = 11$. The difference is $13 - 11 = 2$.",
        },
        {
            text: "Does a number like $10$ have a perfect square root?",
            options: ["$Yes$", "$No,\\ it's\\ not\\ an\\ integer$", "$Yes,\\ it's\\ 5$", "$-5$"],
            correctAnswer: "$No,\\ it's\\ not\\ an\\ integer$",
            solution: "$10$ is not a perfect square because $3^2=9$ and $4^2=16$. Its square root is not an integer.",
        }
    ];
};

const ConceptOfSquareRoot = () => {
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

    const SKILL_ID = 1251;
    const SKILL_NAME = "Concept of Square Root";
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
export default ConceptOfSquareRoot;
