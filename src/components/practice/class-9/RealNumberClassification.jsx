import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../services/api';
import { LatexText } from '../../LatexText';
import ExplanationModal from '../../ExplanationModal';
import PracticeReportModal from '../PracticeReportModal';
import './NumberSystem.css';

const RealNumberClassification = () => {
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

    const SKILL_ID = 1241;
    const SKILL_NAME = "Real Number Classification & Representation";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        return [
            createQuestion(1,
                "Which of the following is a rational number?",
                ["$\\sqrt{2}$", "$\\pi$", "$\\frac{2}{3}$", "$\\sqrt{3}$"],
                "$\\frac{2}{3}$",
                "A rational number can be expressed in the form $p/q$ where $q \\neq 0$. $\\frac{2}{3}$ fits this definition, while $\\sqrt{2}$, $\\sqrt{3}$, and $\\pi$ are irrational."
            ),
            createQuestion(2,
                "Identify the irrational number from the list:",
                ["$\\sqrt{4}$", "$-5$", "$0.25$", "$\\sqrt{7}$"],
                "$\\sqrt{7}$",
                "$\\sqrt{4} = 2$ (rational), $-5$ is an integer (rational), and $0.25 = 1/4$ (rational). $\\sqrt{7}$ cannot be simplified to a ratio of integers and is thus irrational."
            ),
            createQuestion(3,
                "Is $0$ a rational number?",
                ["Yes", "No", "Only if it is written as 0/0", "None of these"],
                "Yes",
                "$0$ can be written as $0/1$, $0/2$, etc., which fits the $p/q$ form where $q \\neq 0$. Thus, $0$ is a rational number."
            ),
            createQuestion(4,
                "Find an irrational number between 2 and 3.",
                ["$2.5$", "$\\sqrt{5}$", "$\\frac{5}{2}$", "$2.1$"],
                "$\\sqrt{5}$",
                "$\\sqrt{4} = 2$ and $\\sqrt{9} = 3$. Since 5 is between 4 and 9 and is not a perfect square, $\\sqrt{5}$ is an irrational number between 2 and 3."
            ),
            createQuestion(5,
                "The decimal representation of $0.666...$ (or $0.\\overline{6}$) in $p/q$ form is:",
                ["$\\frac{1}{3}$", "$\\frac{2}{3}$", "$\\frac{6}{10}$", "$\\frac{2}{5}$"],
                "$\\frac{2}{3}$",
                "Let $x = 0.666...$, then $10x = 6.666...$. Subtracting gives $9x = 6$, so $x = 6/9 = 2/3$."
            ),
            createQuestion(6,
                "Which of the following numbers is rational?",
                ["$(2+\\sqrt{3}) + (2-\\sqrt{3})$", "$\\sqrt{2} \\times \\sqrt{3}$", "$\\pi - 2$", "$\\sqrt{5}$"],
                "$(2+\\sqrt{3}) + (2-\\sqrt{3})$",
                "$(2+\\sqrt{3}) + (2-\\sqrt{3}) = 2 + 2 + \\sqrt{3} - \\sqrt{3} = 4$. Since 4 is an integer, it is a rational number."
            ),
            createQuestion(7,
                "The sum of a rational number and an irrational number is always:",
                ["Rational", "Irrational", "Zero", "An Integer"],
                "Irrational",
                "If you add a rational number (like 2) to an irrational number (like $\\sqrt{3}$), the result ($2+\\sqrt{3}$) remains non-terminating and non-repeating, making it irrational."
            ),
            createQuestion(8,
                "Which of the following is NOT a real number?",
                ["$\\sqrt{-1}$", "$\\sqrt[3]{-8}$", "$-0.123...$", "$10^{10}$"],
                "$\\sqrt{-1}$",
                "Square roots of negative numbers are not defined in the set of real numbers; they are imaginary numbers. $\\sqrt[3]{-8} = -2$, which is real."
            ),
            createQuestion(9,
                "What type of number is $\\pi$?",
                ["Rational", "Irrational", "Terminating Decimal", "Negative Integer"],
                "Irrational",
                "$\\pi$ is a mathematical constant whose decimal expansion is non-terminating and non-repeating, making it irrational."
            ),
            createQuestion(10,
                "Express $0.2\\overline{3}$ in the form $p/q$.",
                ["$\\frac{23}{99}$", "$\\frac{21}{90}$", "$\\frac{7}{30}$", "$\\frac{23}{10}$"],
                "$\\frac{7}{30}$",
                "Let $x = 0.2333...$, then $10x = 2.333...$ and $100x = 23.333...$. Subtracting gives $90x = 21$, so $x = 21/90 = 7/30$."
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
        setFeedbackMessage(isRight ? "Excellent!" : "Not quite, look at the explanation.");

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
                time_spent_seconds: 10 // Placeholder
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
                            <h2 style={{ fontWeight: '800', marginBottom: '1rem', color: '#334155' }}>Real Number Classification</h2>
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

export default RealNumberClassification;
