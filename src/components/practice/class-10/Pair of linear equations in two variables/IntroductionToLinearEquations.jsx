import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import PracticeReportModal from '../../PracticeReportModal';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import '../TenthPracticeSession.css';

const IntroductionToLinearEquations = () => {
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

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 10031; // Form a pair of linear equations from word problems
    const SKILL_NAME = "Forming Linear Equations from Real-Life Situations";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const newQuestions = [];
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // EASY 1: Cost Problem (Simple)
        let p1 = getRandomInt(2, 5);
        let v1 = getRandomInt(2, 5);
        while (p1 === v1) v1 = getRandomInt(2, 5);
        let c1 = getRandomInt(5, 15) * 10;
        newQuestions.push(createQuestion(
            1,
            `The cost of ${p1} pens and ${v1} notebooks is ₹${c1}. Express this as a linear equation in two variables $x$ (cost of 1 pen) and $y$ (cost of 1 notebook).`,
            [`$${p1}x + ${v1}y = ${c1}$`, `$${p1}x - ${v1}y = ${c1}$`, `$x + y = ${c1}$`, `$${v1}x + ${p1}y = ${c1}$`],
            `$${p1}x + ${v1}y = ${c1}$`,
            `Cost of ${p1} pens = $${p1}x$. Cost of ${v1} notebooks = $${v1}y$. Total = $${p1}x + ${v1}y = ${c1}$.`
        ));

        // EASY 2: Sum/Diff Problem
        let sum = getRandomInt(20, 50);
        newQuestions.push(createQuestion(
            2,
            `The sum of two numbers is ${sum}. Express this as a linear equation.`,
            [`$x + y = ${sum}$`, `$x - y = ${sum}$`, `$xy = ${sum}$`, `$2x + y = ${sum}$`],
            `$x + y = ${sum}$`,
            `Let numbers be $x$ and $y$. Sum is $x + y = ${sum}$.`
        ));

        // MEDIUM 1: Perimeter Problem
        let l_coeff = 2; // Length is twice breadth
        let perimeter = getRandomInt(20, 60) * 2;
        newQuestions.push(createQuestion(
            3,
            `The perimeter of a rectangular garden is ${perimeter} m. The length ($x$) is twice the breadth ($y$). Form the pair of equations.`,
            [`$2(x+y)=${perimeter}, x=2y$`, `$x+y=${perimeter}, x=2y$`, `$2(x+y)=${perimeter}, y=2x$`, `$2(x-y)=${perimeter}, x=2y$`],
            `$2(x+y)=${perimeter}, x=2y$`,
            `Perimeter $2(l+b) = ${perimeter} \\Rightarrow 2(x+y) = ${perimeter}$. Length is twice breadth $\\Rightarrow x=2y$.`
        ));

        // MEDIUM 2: Age Problem (Simple)
        let years = 5;
        let times = 3;
        newQuestions.push(createQuestion(
            4,
            `Five years hence, a man's age ($x$) will be three times that of his son ($y$). Express this algebraically.`,
            [`$x+5 = 3(y+5)$`, `$x-5 = 3(y-5)$`, `$x+5 = 3y+5$`, `$x = 3y+5$`],
            `$x+5 = 3(y+5)$`,
            `In 5 years: Man = $x+5$, Son = $y+5$. Condition: $x+5 = 3(y+5)$.`
        ));

        // HARD 1: Fraction Formulation
        let addNum = 1;
        let subDen = 1;
        newQuestions.push(createQuestion(
            5,
            `A fraction becomes 1 when 1 is added to the numerator and 1 is subtracted from the denominator. Represent this algebraically ($x$=numerator, $y$=denominator).`,
            [`$\\frac{x+1}{y-1} = 1$`, `$\\frac{x-1}{y+1} = 1$`, `$\\frac{x+1}{y} = 1$`, `$\\frac{x}{y-1} = 1$`],
            `$\\frac{x+1}{y-1} = 1$`,
            `Numerator + 1 = $x+1$. Denominator - 1 = $y-1$. Fraction $\\frac{x+1}{y-1} = 1$.`
        ));

        // NEW: EASY 3 - Simple Identity
        newQuestions.push(createQuestion(
            6,
            `One number ($x$) is 3 times another number ($y$). Express this as a linear equation.`,
            [`$x - 3y = 0$`, `$x + 3y = 0$`, `$3x - y = 0$`, `$x = y + 3$`],
            `$x - 3y = 0$`,
            `Given $x = 3y$. Subtract $3y$ from both sides: $x - 3y = 0$.`
        ));

        // NEW: MEDIUM 3 - Taxi Charges
        newQuestions.push(createQuestion(
            7,
            `A taxi charges a fixed fare ($x$) plus a charge per km ($y$). For 10 km, the charge is ₹105. Form the equation.`,
            [`$x + 10y = 105$`, `$10x + y = 105$`, `$x - 10y = 105$`, `$x + y = 105$`],
            `$x + 10y = 105$`,
            `Total charge = Fixed ($x$) + 10 * Per km ($y$). So, $x + 10y = 105$.`
        ));

        // NEW: MEDIUM 4 - Cricket Team Cost
        newQuestions.push(createQuestion(
            8,
            `The coach of a cricket team buys 3 bats ($x$) and 6 balls ($y$) for ₹3900. Represent this situation algebraically.`,
            [`$3x + 6y = 3900$`, `$6x + 3y = 3900$`, `$3x - 6y = 3900$`, `$x + y = 3900$`],
            `$3x + 6y = 3900$`,
            `Cost of 3 bats = $3x$. Cost of 6 balls = $6y$. Total cost = $3x + 6y = 3900$.`
        ));

        // NEW: HARD 2 - Library Fixed Charge
        newQuestions.push(createQuestion(
            9,
            `A lending library has a fixed charge ($x$) for the first 3 days and an additional charge ($y$) for each day thereafter. Saritha paid ₹27 for a book kept for 7 days. Form the equation.`,
            [`$x + 4y = 27$`, `$x + 7y = 27$`, `$x + 3y = 27$`, `$x - 4y = 27$`],
            `$x + 4y = 27$`,
            `Fixed charge for 3 days = $x$. Remaining days = $7 - 3 = 4$. Additional charge = $4y$. Total: $x + 4y = 27$.`
        ));

        // NEW: HARD 3 - Fraction Numerator/Denominator Relation
        newQuestions.push(createQuestion(
            10,
            `The denominator ($y$) of a fraction is 3 more than its numerator ($x$). If 1 is added to both, the fraction becomes $\\frac{1}{2}$. Represent the second condition algebraically.`,
            [`$\\frac{x+1}{y+1} = \\frac{1}{2}$`, `$\\frac{x}{y+1} = \\frac{1}{2}$`, `$\\frac{x+1}{y} = \\frac{1}{2}$`, `$\\frac{x-1}{y-1} = \\frac{1}{2}$`],
            `$\\frac{x+1}{y+1} = \\frac{1}{2}$`,
            `Add 1 to numerator ($x+1$) and denominator ($y+1$). The new fraction is $\\frac{x+1}{y+1} = \\frac{1}{2}$.`
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
            api.createPracticeSession(String(userId).includes("-") ? 1 : parseInt(userId, 10), SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        let timer;
        if (!showReportModal) {
            timer = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }

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
    }, [showReportModal]);

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
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
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
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
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
                    user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10)
                }).catch(console.error);
            }
            setShowReportModal(true);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>
                    {SKILL_NAME}
                </div>
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

            <main className="practice-content-wrapper" style={{ alignItems: "flex-start", paddingTop: "1rem" }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
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
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px', gridColumn: '1 / -1', justifySelf: 'center', textAlign: 'center', width: '100%' }}>
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

            <PracticeReportModal
                isOpen={showReportModal}
                stats={{
                    timeTaken: formatTime(timeElapsed),
                    correctAnswers: Object.values(answers).filter(val => val.isCorrect === true).length,
                    totalQuestions: questions.length
                }}
                onContinue={() => navigate(-1)}
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
                                    {qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Finish <Check size={28} strokeWidth={3} /></>}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>
                            Exit
                        </button>
                    </div>
                    <div className="mobile-footer-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        {isSubmitted && <button className="view-explanation-btn" style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }} onClick={() => setShowExplanationModal(true)}><Eye size={14} /> VIEW EXPLANATION</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Prev
                        </button>
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} {qIndex === questions.length - 1 ? null : <ChevronRight size={16} strokeWidth={3} />}</button>
                        ) : (
                            <button className="nav-pill-submit-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={16} strokeWidth={3} /></button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default IntroductionToLinearEquations;
