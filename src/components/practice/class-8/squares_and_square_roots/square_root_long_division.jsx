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
            text: "How many bars are placed over the digits of $529$ for long division square root?",
            options: ["$2$", "$3$", "$1$", "$4$"],
            correctAnswer: "$2$",
            solution: "Bars are placed over pairs of digits from right to left. So, $\\overline{5} \\overline{29}$ has $2$ bars.",
        },
        {
            text: "Find the square root of $529$.",
            options: ["$23$", "$27$", "$33$", "$13$"],
            correctAnswer: "$23$",
            solution: "Using long division or estimation, $20^2 = 400$ and $25^2 = 625$. $529$ ends in $9$, so the root ends in $3$ or $7$. Hence, $23$.",
        },
        {
            text: "What is the number of digits in the square root of a perfect square having $4$ digits?",
            options: ["$1$", "$2$", "$3$", "$4$"],
            correctAnswer: "$2$",
            solution: "If a perfect square has $n$ digits, its square root has $n/2$ digits if $n$ is even. For $n=4$, the square root has $4/2 = 2$ digits.",
        },
        {
            text: "Find the square root of $4096$ using the division method.",
            options: ["$64$", "$66$", "$74$", "$54$"],
            correctAnswer: "$64$",
            solution: "Pairing gives $\\overline{40}\\overline{96}$. $6 \\times 6 = 36$. $40 - 36 = 4$. Bring down $96$ to get $496$. Divisor is $12$. $124 \\times 4 = 496$. Thus $\\sqrt{4096} = 64$.",
        },
        {
            text: "Find the square root of $1296$.",
            options: ["$34$", "$36$", "$44$", "$46$"],
            correctAnswer: "$36$",
            solution: "$30^2 = 900$ and $40^2 = 1600$. Since $1296$ ends in $6$, its root ends in $4$ or $6$. $36^2 = 1296$.",
        },
        {
            text: "What is the least number that must be subtracted from $250$ to get a perfect square?",
            options: ["$25$", "$15$", "$11$", "$20$"],
            correctAnswer: "$25$",
            solution: "The square root of $250$ is $15.8...$ The nearest smaller perfect square is $15^2 = 225$. We must subtract $250 - 225 = 25$.",
        },
        {
            text: "What is the least number that must be subtracted from $4000$ to get a perfect square?",
            options: ["$31$", "$41$", "$21$", "$11$"],
            correctAnswer: "$31$",
            solution: "By long division, $\\sqrt{4000} \\approx 63$. $63^2 = 3969$. So, subtract $4000 - 3969 = 31$.",
        },
        {
            text: "Find the greatest $4$-digit number which is a perfect square.",
            options: ["$9999$", "$9801$", "$9900$", "$9899$"],
            correctAnswer: "$9801$",
            solution: "The greatest $4$ digit number is $9999$. Its square root is $99.9...$ So the greatest $4$-digit perfect square is $99^2 = 9801$.",
        },
        {
            text: "What is the least number that must be added to $1300$ to make it a perfect square?",
            options: ["$69$", "$44$", "$25$", "$84$"],
            correctAnswer: "$69$",
            solution: "By long division, $\\sqrt{1300}$ is $36...$ The next perfect square is $37^2 = 1369$. Thus, we must add $1369 - 1300 = 69$.",
        },
        {
            text: "Find the exact square root of $15129$.",
            options: ["$123$", "$117$", "$127$", "$133$"],
            correctAnswer: "$123$",
            solution: "Pairing gives $\\overline{1} \\overline{51} \\overline{29}$. Using long division, the root is exactly $123$.",
        }
    ];
};

const SquareRootLongDivision = () => {
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

    const SKILL_ID = 1253;
    const SKILL_NAME = "Square Root via Long Division";
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
export default SquareRootLongDivision;
