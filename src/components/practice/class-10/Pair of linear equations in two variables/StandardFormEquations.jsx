import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const StandardFormEquations = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 10041; // Rewrite linear equations in the form ax + by + c = 0
    const SKILL_NAME = "Rewriting Linear Equations in Standard Form";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const newQuestions = [];
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // EASY 1: ax = c - by
        let a = getRandomInt(2, 5);
        newQuestions.push(createQuestion(
            1,
            `Rewrite $${a}x = 10 - 2y$ in standard form $ax + by + c = 0$.`,
            [`$${a}x + 2y - 10 = 0$`, `$${a}x - 2y - 10 = 0$`, `$${a}x + 2y + 10 = 0$`, `$${a}x - 2y + 10 = 0$`],
            `$${a}x + 2y - 10 = 0$`,
            `Add $2y$ and subtract 10: $${a}x + 2y - 10 = 0$.`
        ));

        // EASY 2: ax + by = c (simple)
        newQuestions.push(createQuestion(
            2,
            `Write $2x + 3y = 7$ in standard form.`,
            [`$2x + 3y - 7 = 0$`, `$2x - 3y - 7 = 0$`, `$2x + 3y + 7 = 0$`, `$2x - 3y + 7 = 0$`],
            `$2x + 3y - 7 = 0$`,
            `Subtract 7 from both sides: $2x + 3y - 7 = 0$.`
        ));

        // MEDIUM 1: y = mx + c
        let m = getRandomInt(3, 5);
        newQuestions.push(createQuestion(
            3,
            `Express $y = ${m}x + 4$ in standard form.`,
            [`$${m}x - y + 4 = 0$`, `$${m}x + y + 4 = 0$`, `$x - ${m}y + 4 = 0$`, `$${m}x - y - 4 = 0$`],
            `$${m}x - y + 4 = 0$`,
            `$0 = ${m}x - y + 4$. Rearrange: $${m}x - y + 4 = 0$.`
        ));

        // MEDIUM 2: x = -y
        newQuestions.push(createQuestion(
            4,
            `Write the equation $x = -5y$ in the form $ax+by+c=0$.`,
            [`$x + 5y = 0$`, `$x - 5y = 0$`, `$5x + y = 0$`, `$x + 5y + 1 = 0$`],
            `$x + 5y = 0$`,
            `Add $5y$ to both sides: $x + 5y = 0$. Here $c=0$.`
        ));

        // HARD 1: x/a + y/b = 1 (Fractional)
        newQuestions.push(createQuestion(
            5,
            `Convert $\\frac{x}{2} + \\frac{y}{3} = 1$ to standard form.`,
            [`$3x + 2y - 6 = 0$`, `$2x + 3y - 6 = 0$`, `$3x + 2y - 1 = 0$`, `$3x + 2y + 6 = 0$`],
            `$3x + 2y - 6 = 0$`,
            `Multiply by 6 (LCM): $3x + 2y = 6$. Standard form: $3x + 2y - 6 = 0$.`
        ));

        // NEW: EASY 3 - Simple Identity
        newQuestions.push(createQuestion(
            6,
            `Write $x = y$ in the form $ax + by + c = 0$.`,
            [`$x - y = 0$`, `$x + y = 0$`, `$x - y + 1 = 0$`, `$x + y - 1 = 0$`],
            `$x - y = 0$`,
            `Subtract $y$ from both sides: $x - y = 0$. Here $a=1, b=-1, c=0$.`
        ));

        // NEW: MEDIUM 3 - Decimal Coefficients
        newQuestions.push(createQuestion(
            7,
            `Rewrite $0.2x + 0.3y = 1.3$ in standard form with integer coefficients.`,
            [`$2x + 3y - 13 = 0$`, `$2x + 3y + 13 = 0$`, `$2x - 3y - 13 = 0$`, `$0.2x + 0.3y - 1.3 = 0$`],
            `$2x + 3y - 13 = 0$`,
            `Multiply by 10: $2x + 3y = 13$. Subtract 13: $2x + 3y - 13 = 0$.`
        ));

        // NEW: MEDIUM 4 - Expansion
        let k = getRandomInt(2, 5);
        newQuestions.push(createQuestion(
            8,
            `Express $y - 2 = ${k}(x - 1)$ in standard form.`,
            [`$${k}x - y + ${2 - k} = 0$`, `$${k}x - y + ${k - 2} = 0$`, `$${k}x + y - ${k + 2} = 0$`, `$x - ${k}y - 1 = 0$`],
            `$${k}x - y + ${2 - k} = 0$`,
            `Expand: $y - 2 = ${k}x - ${k}$. Move terms: $${k}x - y + 2 - ${k} = 0$.`
        ));

        // NEW: HARD 2 - Fraction Equation
        newQuestions.push(createQuestion(
            9,
            `Write $\\frac{y}{2} - 5 = x$ in standard form.`,
            [`$2x - y + 10 = 0$`, `$2x + y - 10 = 0$`, `$x - 2y + 10 = 0$`, `$2x - y - 10 = 0$`],
            `$2x - y + 10 = 0$`,
            `Multiply by 2: $y - 10 = 2x$. Rearrange: $2x - y + 10 = 0$.`
        ));

        // NEW: HARD 3 - Cross Multiplication
        newQuestions.push(createQuestion(
            10,
            `Rewrite $\\frac{2x + 5}{y} = 7$ in standard form.`,
            [`$2x - 7y + 5 = 0$`, `$2x + 7y + 5 = 0$`, `$7x - 2y + 5 = 0$`, `$2x - 7y - 5 = 0$`],
            `$2x - 7y + 5 = 0$`,
            `Multiply by $y$: $2x + 5 = 7y$. Rearrange: $2x - 7y + 5 = 0$.`
        ));

        return newQuestions;
    };

    useEffect(() => {
        const generated = generateQuestions();
        console.log("Generated Questions:", generated);
        setQuestions(generated);
    }, []);

    // Restore state when qIndex changes
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

    const CORRECT_MESSAGES = [
        "✨ Amazing job! You got it! ✨",
        "🌟 Brilliant! Keep it up! 🌟",
        "🎉 Correct! You're a math-star! 🎉",
        "✨ Fantastic work! ✨",
        "🚀 Super! You're on fire! 🚀"
    ];

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) {
            timeSpent += Date.now() - questionStartTime.current;
        }
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQuestion = questions[qIndex];
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: selectedOption,
                isCorrect: isRight
            }
        }));
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / questions.length) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: questions.length,
                        correct_answers: totalCorrect,
                        timestamp: new Date().toISOString(),
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
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 2rem' }}>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => !isSubmitted && setSelectedOption(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                    {isSubmitted && isCorrect && (
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                            {feedbackMessage}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>
                            Exit Practice
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group" style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="nav-pill-next-btn bg-gray-200 text-gray-600"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} />
                                Prev
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="mobile-footer-right">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ minWidth: 'auto' }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                        {isSubmitted ?
                            <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight size={20} /></button> :
                            <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={20} /></button>
                        }
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StandardFormEquations;
