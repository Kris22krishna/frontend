import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../services/api';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import PracticeReportModal from '../PracticeReportModal';
import './NumberSystem.css';

const OperationsOnSurds = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1243;
    const SKILL_NAME = "Operations on Surds";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        return [
            createQuestion(1,
                "Simplify: $\\sqrt{2} + \\sqrt{2}$",
                ["$2\\sqrt{2}$", "$\\sqrt{4}$", "$2$", "$4$"],
                "$2\\sqrt{2}$",
                "Adding like surds is like adding variables: $x + x = 2x$. So, $\\sqrt{2} + \\sqrt{2} = 2\\sqrt{2}$."
            ),
            createQuestion(2,
                "Find the product: $\\sqrt{3} \\times \\sqrt{3}$",
                ["$3$", "$\\sqrt{9}$", "Both $3$ and $\\sqrt{9}$", "$9$"],
                "Both $3$ and $\\sqrt{9}$",
                "The square of a square root of a number is the number itself: $\\sqrt{a} \\times \\sqrt{a} = a$. Thus, $\\sqrt{3} \\times \\sqrt{3} = \\sqrt{9} = 3$."
            ),
            createQuestion(3,
                "Multiply: $\\sqrt{5} \\times \\sqrt{2}$",
                ["$\\sqrt{7}$", "$10$", "$\\sqrt{10}$", "$7$"],
                "$\\sqrt{10}$",
                "Using the property $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{a \\times b}$, we have $\\sqrt{5} \\times \\sqrt{2} = \\sqrt{5 \\times 2} = \\sqrt{10}$."
            ),
            createQuestion(4,
                "Evaluate: $(3 + \\sqrt{3})(3 - \\sqrt{3})$",
                ["$6$", "$9$", "$0$", "$3$"],
                "$6$",
                "This is in the form $(a+b)(a-b) = a^2 - b^2$. So, $(3)^2 - (\\sqrt{3})^2 = 9 - 3 = 6$."
            ),
            createQuestion(5,
                "Simplify: $\\sqrt{50} + \\sqrt{18}$",
                ["$\\sqrt{68}$", "$8\\sqrt{2}$", "$34\\sqrt{2}$", "$4\\sqrt{5}$"],
                "$8\\sqrt{2}$",
                "$\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$ and $\\sqrt{18} = \\sqrt{9 \\times 2} = 3\\sqrt{2}$. Adding them gives $5\\sqrt{2} + 3\\sqrt{2} = 8\\sqrt{2}$."
            ),
            createQuestion(6,
                "Expand: $(\\sqrt{5} + \\sqrt{2})^2$",
                ["$7$", "$7 + 2\\sqrt{10}$", "$10 + \\sqrt{10}$", "$3$"],
                "$7 + 2\\sqrt{10}$",
                "Using $(a+b)^2 = a^2 + 2ab + b^2$: $(\\sqrt{5})^2 + 2(\\sqrt{5})(\\sqrt{2}) + (\\sqrt{2})^2 = 5 + 2\\sqrt{10} + 2 = 7 + 2\\sqrt{10}$."
            ),
            createQuestion(7,
                "Simplify: $\\sqrt{45} - 3\\sqrt{20} + 4\\sqrt{5}$",
                ["$\\sqrt{5}$", "$3\\sqrt{5}$", "$\\sqrt{30}$", "$5\\sqrt{5}$"],
                "$\\sqrt{5}$",
                "$\\sqrt{45} = 3\\sqrt{5}$ and $3\\sqrt{20} = 3(2\\sqrt{5}) = 6\\sqrt{5}$. So, $3\\sqrt{5} - 6\\sqrt{5} + 4\\sqrt{5} = (3-6+4)\\sqrt{5} = 1\\sqrt{5}$."
            ),
            createQuestion(8,
                "Calculate: $(2\\sqrt{2} + 3\\sqrt{3})(2\\sqrt{2} - 3\sqrt{3})$",
                ["$19$", "$-19$", "$11$", "$-11$"],
                "$-19$",
                "$(a+b)(a-b) = a^2 - b^2$. $(2\\sqrt{2})^2 - (3\\sqrt{3})^2 = (4 \\times 2) - (9 \\times 3) = 8 - 27 = -19$."
            ),
            createQuestion(9,
                "Simplify: $\\frac{\\sqrt{24}}{\\sqrt{6}}$",
                ["$2$", "$\\sqrt{4}$", "$4$", "Both $2$ and $\\sqrt{4}$"],
                "Both $2$ and $\\sqrt{4}$",
                "Using $\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$, we get $\\sqrt{\\frac{24}{6}} = \\sqrt{4} = 2$."
            ),
            createQuestion(10,
                "Evaluate: $\\sqrt{2}(\\sqrt{8} + \\sqrt{32})$",
                ["$12$", "$\\sqrt{40}$", "$8$", "$10$"],
                "$12$",
                "$\\sqrt{2} \\times \\sqrt{8} = \\sqrt{16} = 4$. $\\sqrt{2} \\times \\sqrt{32} = \\sqrt{64} = 8$. So, $4 + 8 = 12$."
            )
        ];
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(String(userId).includes("-") ? 1 : parseInt(userId, 10), SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
    }, []);

    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    useEffect(() => {
        let timer;
        if (!showReportModal) {
            timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [showReportModal]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setFeedbackMessage(isRight ? "Perfectly done!" : "Not correct. Look at the steps above.");

        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption, isCorrect: isRight }
        }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && sessionId) {
            api.recordAttempt({
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 7 ? 'Medium' : 'Hard',
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption,
                is_correct: isRight,
                solution_text: currentQ.solution,
                time_spent_seconds: 10
            }).catch(console.error);
        }
    };

    const handleNext = () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
        } else {
            setShowReportModal(true);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page">
            <header className="junior-practice-header">
                <div style={{ fontWeight: '800', color: '#1E293B', fontSize: '1.2rem' }}>Number System</div>
                <div style={{ background: '#F1F5F9', padding: '0.5rem 1.5rem', borderRadius: '9999px', fontWeight: '700' }}>
                    Q {qIndex + 1} / {questions.length}
                </div>
                <div style={{ fontWeight: '700', color: '#64748B' }}>{formatTime(timeElapsed)}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container">
                    <div className="question-card-modern">
                        <div className="question-text-modern">
                            <h2 style={{ fontWeight: '800', marginBottom: '1rem', color: '#334155' }}>Operations on Surds</h2>
                            <LatexText text={currentQuestion.text} />
                        </div>
                        <div className="options-grid-modern">
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                    onClick={() => !isSubmitted && setSelectedOption(option)}
                                    disabled={isSubmitted}
                                >
                                    <LatexText text={option} />
                                </button>
                            ))}
                        </div>
                        {isSubmitted && (
                            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#F8FAFC', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                                <h4 style={{ fontWeight: '800', color: '#1E293B', marginBottom: '0.5rem' }}>Explanation:</h4>
                                <LatexText text={currentQuestion.solution} />
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <button className="nav-pill-next-btn" style={{ background: '#64748B' }} onClick={() => navigate(-1)}>Exit</button>
                    {isSubmitted ? (
                        <button className="nav-pill-next-btn" onClick={handleNext}>
                            {qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight />
                        </button>
                    ) : (
                        <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                            Submit <Check />
                        </button>
                    )}
                </div>
            </footer>

            <PracticeReportModal
                isOpen={showReportModal}
                stats={{
                    timeTaken: formatTime(timeElapsed),
                    correctAnswers: Object.values(answers).filter(val => val.isCorrect).length,
                    totalQuestions: questions.length
                }}
                onContinue={() => navigate(-1)}
            />
        </div>
    );
};

export default OperationsOnSurds;
