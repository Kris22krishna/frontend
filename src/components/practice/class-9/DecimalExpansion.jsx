import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../services/api';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import PracticeReportModal from '../PracticeReportModal';
import './NumberSystem.css';

const DecimalExpansion = () => {
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

    const SKILL_ID = 1242;
    const SKILL_NAME = "Decimal Expansion of Rational Numbers";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        return [
            createQuestion(1,
                "The decimal expansion of $\\frac{7}{8}$ is:",
                ["$0.875$", "0.85", "0.785", "0.8"],
                "$0.875$",
                "Divide 7 by 8: $7 \\div 8 = 0.875$. Since the remainder becomes zero, it is a terminating decimal."
            ),
            createQuestion(2,
                "What type of decimal expansion does $\\frac{1}{3}$ have?",
                ["Terminating", "Non-terminating and repeating", "Non-terminating and non-repeating", "None of these"],
                "Non-terminating and repeating",
                "Divide 1 by 3: $1 \\div 3 = 0.333...$ The digit 3 repeats infinitely, so it is non-terminating and repeating."
            ),
            createQuestion(3,
                "A number whose decimal expansion is non-terminating and non-repeating is:",
                ["Rational", "Irrational", "An Integer", "A Whole Number"],
                "Irrational",
                "By definition, irrational numbers have decimal expansions that never end and never repeat a pattern (e.g., $\\sqrt{2}, \\pi$)."
            ),
            createQuestion(4,
                "Find the decimal expansion of $\\frac{3}{13}$.",
                ["$0.230769\\overline{230769}$", "$0.23\\overline{23}$", "$0.230769$", "$0.203$"],
                "$0.230769\\overline{230769}$",
                "Long division of 3 by 13 shows a repeating block of 6 digits: 230769."
            ),
            createQuestion(5,
                "How many digits repeat in the decimal expansion of $\\frac{1}{7}$?",
                ["4", "5", "6", "7"],
                "6",
                "The decimal expansion of $1/7$ is $0.\\overline{142857}$. There are 6 digits in the repeating block."
            ),
            createQuestion(6,
                "If $\\frac{1}{7} = 0.\\overline{142857}$, then what is $\\frac{3}{7}$?",
                ["$0.\\overline{428571}$", "$0.\\overline{285714}$", "$0.\\overline{142857}$", "$0.\\overline{571428}$"],
                "$0.\\overline{428571}$",
                "Multiply $0.\\overline{142857}$ by 3. $3 \\times 142857 = 428571$. So, $3/7 = 0.\\overline{428571}$."
            ),
            createQuestion(7,
                "For a rational number $p/q$ to have a terminating decimal expansion, the prime factorization of $q$ must be of the form:",
                ["$2^n 3^m$", "$2^n 5^m$", "$3^n 5^m$", "$7^n 2^m$"],
                "$2^n 5^m$",
                "A rational number in its simplest form has a terminating decimal expansion if and only if the denominator has no prime factors other than 2 and 5."
            ),
            createQuestion(8,
                "A non-terminating non-repeating decimal represents which of these?",
                ["$\\frac{22}{7}$", "$3.14159...$", "$0.333...$", "$\\frac{1}{10}$"],
                "$3.14159...$",
                "$22/7$ and $0.333...$ are repeating/terminating (rational). $3.14159...$ is the value of $\\pi$, which is irrational and thus non-terminating and non-repeating."
            ),
            createQuestion(9,
                "Which of the following has a terminating decimal expansion?",
                ["$\\frac{1}{6}$", "$\\frac{1}{12}$", "$\\frac{1}{20}$", "$\\frac{1}{7}$"],
                "$\\frac{1}{20}$",
                "The denominator 20 has prime factors $2^2 \\times 5$. Since it only contains 2 and 5, it terminates ($1/20 = 0.05$)."
            ),
            createQuestion(10,
                "What is the result of $0.\\overline{3} + 0.\\overline{6}$?",
                ["$0.9$", "$1$", "$0.\\overline{9}$", "Both $1$ and $0.\\overline{9}$"],
                "Both $1$ and $0.\\overline{9}$",
                "$0.\\overline{3} = 1/3$ and $0.\\overline{6} = 2/3$. Adding them gives $1/3 + 2/3 = 3/3 = 1$. Note that $0.\\overline{9}$ is mathematically equal to 1."
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
        setFeedbackMessage(isRight ? "Great work!" : "Incorrect. Check the explanation below.");

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
                            <h2 style={{ fontWeight: '800', marginBottom: '1rem', color: '#334155' }}>Decimal Expansion</h2>
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

export default DecimalExpansion;
