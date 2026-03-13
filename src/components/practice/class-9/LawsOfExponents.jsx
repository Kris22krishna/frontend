import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../services/api';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import PracticeReportModal from '../PracticeReportModal';
import './NumberSystem.css';

const LawsOfExponents = () => {
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

    const SKILL_ID = 1245;
    const SKILL_NAME = "Laws of Exponents";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        return [
            createQuestion(1,
                "Simplify: $2^3 \\times 2^4$",
                ["$2^7$", "$2^{12}$", "$4^7$", "$2^1$"],
                "$2^7$",
                "Using the law $a^m \\times a^n = a^{m+n}$, we have $2^3 \\times 2^4 = 2^{3+4} = 2^7$."
            ),
            createQuestion(2,
                "Evaluate: $(5^2)^3$",
                ["$5^5$", "$5^6$", "$5^8$", "$25^3$"],
                "$5^6$",
                "Using the law $(a^m)^n = a^{m \\times n}$, we have $(5^2)^3 = 5^{2 \\times 3} = 5^6$."
            ),
            createQuestion(3,
                "Simplify: $7^5 \\div 7^3$",
                ["$7^2$", "$7^8$", "$7^{15}$", "$1$"],
                "$7^2$",
                "Using the law $a^m \\div a^n = a^{m-n}$, we have $7^5 \\div 7^3 = 7^{5-3} = 7^2$."
            ),
            createQuestion(4,
                "Find the value of $(64)^{1/2}$.",
                ["$8$", "$4$", "$16$", "$32$"],
                "$8$",
                "$(64)^{1/2}$ is the same as $\\sqrt{64}$. Since $8^2 = 64$, the answer is 8."
            ),
            createQuestion(5,
                "Evaluate: $(125)^{-1/3}$",
                ["$5$", "$-5$", "$\\frac{1}{5}$", "$\\frac{1}{25}$"],
                "$\\frac{1}{5}$",
                "$(125)^{-1/3} = (5^3)^{-1/3} = 5^{3 \\times -1/3} = 5^{-1} = 1/5$."
            ),
            createQuestion(6,
                "Simplify: $2^{2/3} \\times 2^{1/5}$",
                ["$2^{3/8}$", "$2^{13/15}$", "$2^{2/15}$", "$4^{3/8}$"],
                "$2^{13/15}$",
                "$2^{2/3 + 1/5} = 2^{(10+3)/15} = 2^{13/15}$."
            ),
            createQuestion(7,
                "Simplify: $(16)^{3/4}$",
                ["$4$", "$8$", "$12$", "$16$"],
                "$8$",
                "$(16)^{3/4} = (2^4)^{3/4} = 2^{4 \\times 3/4} = 2^3 = 8$."
            ),
            createQuestion(8,
                "Evaluate: $(\\frac{1}{3^3})^7$",
                ["$3^{21}$", "$3^{-21}$", "$3^{10}$", "$\\frac{1}{3^{10}}$"],
                "$3^{-21}$",
                "$(\\frac{1}{3^3})^7 = (3^{-3})^7 = 3^{-3 \\times 7} = 3^{-21}$."
            ),
            createQuestion(9,
                "Find the value of $(1^3 + 2^3 + 3^3)^{1/2}$.",
                ["$6$", "$36$", "$\\sqrt{6}$", "$9$"],
                "$6$",
                "$1^3 + 2^3 + 3^3 = 1 + 8 + 27 = 36$. So, $(36)^{1/2} = \\sqrt{36} = 6$."
            ),
            createQuestion(10,
                "Which is greater: $(2^2)^3$ or $2^{2^3}$?",
                ["$(2^2)^3$", "$2^{2^3}$", "They are equal", "Cannot be determined"],
                "$2^{2^3}$",
                "$(2^2)^3 = 2^{2 \\times 3} = 2^6 = 64$. $2^{2^3} = 2^8 = 256$. Since $256 > 64$, $2^{2^3}$ is greater."
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
        setFeedbackMessage(isRight ? "Awesome!" : "Incorrect. See the explanation.");

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
                            <h2 style={{ fontWeight: '800', marginBottom: '1rem', color: '#334155' }}>Laws of Exponents</h2>
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

export default LawsOfExponents;
