import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import PracticeReportModal from '../../PracticeReportModal';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import '../TenthPracticeSession.css';

const NODE_ID = 'a4101003-0003-0000-0000-000000000000'; // Identify the number of solutions using algebraic conditions

const ConditionsForConsistency = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [questions, setQuestions] = useState([]);

    // Logging states
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4Answers = useRef([]);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 10022; // Identify the number of solutions using algebraic conditions
    const SKILL_NAME = "Algebraic Conditions for Consistency";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const newQuestions = [];
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // EASY 1: Unique solution condition
        newQuestions.push(createQuestion(
            1,
            "The pair of linear equations has a unique solution if:",
            [`$\\dfrac{a_1}{a_2} \\neq \\dfrac{b_1}{b_2}$`, `$\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2}$`, `$\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} \\neq \\dfrac{c_1}{c_2}$`, `$\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}$`],
            `$\\dfrac{a_1}{a_2} \\neq \\dfrac{b_1}{b_2}$`,
            "For a unique solution (intersecting lines), the ratio of coefficients of x and y must not be equal: $\\dfrac{a_1}{a_2} \\neq \\dfrac{b_1}{b_2}$."
        ));

        // EASY 2: Parallel lines (No solution)
        newQuestions.push(createQuestion(
            2,
            "If the lines are parallel, the system of equations has:",
            ["No solution", "A unique solution", "Infinitely many solutions", "Two solutions"],
            "No solution",
            "Parallel lines never intersect, so they have no common point (solution)."
        ));

        // MEDIUM 1: Check Consistency
        let a = getRandomInt(2, 5);
        newQuestions.push(createQuestion(
            3,
            `Are the equations $x + 2y = 3$ and $${a}x + ${2 * a}y = ${3 * a}$ consistent?`,
            ["Yes, Dependent Consistent", "No, Inconsistent", "Yes, Unique Solution", "Cannot determine"],
            "Yes, Dependent Consistent",
            `Ratios: $\\dfrac{1}{${a}} = \\dfrac{2}{${2 * a}} = \\dfrac{3}{${3 * a}}$. All equal. Infinite solutions (Dependent Consistent).`
        ));

        // MEDIUM 2: Find k for Unique
        let k_val = 6;
        newQuestions.push(createQuestion(
            4,
            `Find the value of $k$ for which $kx + 2y = 5$ and $3x + y = 1$ has a unique solution.`,
            [`$k \\neq 6$`, `$k = 6$`, `$k \\neq 3$`, `$k = 0$`],
            `$k \\neq 6$`,
            `Unique solution condition: $\\dfrac{k}{3} \\neq \\dfrac{2}{1} \\Rightarrow k \\neq 6$.`
        ));

        // HARD 1: Find k for Infinite Solutions (Coincident)
        // 2x + 3y = 7
        // (k-1)x + (k+2)y = 3k
        // Standard hard problem. If k=7: 6x + 9y = 21. 2/6 = 1/3. 3/9 = 1/3. 7/21=1/3.
        newQuestions.push(createQuestion(
            5,
            `Find the value of $k$ for which the system has infinitely many solutions: $2x + 3y = 7$ and $(k-1)x + (k+2)y = 3k$.`,
            [`$k=7$`, `$k=3$`, `$k=5$`, `$k=1$`],
            `$k=7$`,
            `$\\dfrac{2}{k-1} = \\dfrac{3}{k+2} = \\dfrac{7}{3k}$.<br/>Solve $\\dfrac{2}{k-1} = \\dfrac{3}{k+2} \\Rightarrow 2k+4=3k-3 \\Rightarrow k=7$.<br/>Check third ratio: $\\dfrac{7}{21} = \\dfrac{1}{3}$. Correct.`
        ));

        return newQuestions;
    };

    useEffect(() => { setQuestions(generateQuestions()); }, []);

    // Boilerplate state and effects
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const CORRECT_MESSAGES = ["Good job!", "Excellent!", "Perfect!", "Well done!"];

    useEffect(() => {
        startSession({ nodeId: NODE_ID, sessionType: 'practice' });
        v4Answers.current = [];

        let timer;
        if (!showReportModal) {
            timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
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

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (opt) => !isSubmitted && setSelectedOption(opt);

    const checkAnswer = () => {
        if (!selectedOption) return;
        const isRight = selectedOption === questions[qIndex].correctAnswer;
        setIsCorrect(isRight); setIsSubmitted(true);
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(p => ({
            ...p,
            [qIndex]: {
                selectedOption: selectedOption,
                isCorrect: isRight
            }
        }));

        // v4 Log
        let t = accumulatedTime.current;
        if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const entry = {
            question_index: qIndex + 1,
            answer_json: { selected: selectedOption },
            is_correct: isRight ? 1.0 : 0.0,
            marks_awarded: isRight ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: t
        };
        v4Answers.current[qIndex] = entry;
        logAnswer({
            questionIndex: entry.question_index,
            answerJson: entry.answer_json,
            isCorrect: entry.is_correct
        });

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.recordAttempt({
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10), session_id: null, skill_id: SKILL_ID,
                question_text: questions[qIndex].text, correct_answer: questions[qIndex].correctAnswer,
                student_answer: selectedOption, is_correct: isRight, solution_text: questions[qIndex].solution,
                time_spent_seconds: Math.round(t / 1000)
            }).catch(console.error);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const goNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            // v4 finish
            const payload = v4Answers.current.filter(Boolean);
            await finishSession({
                totalQuestions: questions.length,
                questionsAnswered: payload.length,
                answersPayload: payload
            });
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
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2rem', alignItems: 'center' }}>
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
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "1rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
                                <div className="options-grid-modern" style={{ gap: "1rem" }}>
                                    {currentQuestion.options.map((opt, i) => (
                                        <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: '500', minHeight: '60px' }} onClick={() => handleOptionSelect(opt)} disabled={isSubmitted}>
                                            <LatexText text={opt} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {isSubmitted && isCorrect && (
                                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '1rem', textAlign: 'center', width: '100%', flexShrink: 0 }}>
                                    {feedbackMessage}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />
            
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
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> VIEW EXPLANATION</button>}
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="nav-pill-next-btn bg-gray-200 text-gray-600"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} />
                                Prev
                            </button>
                            {isSubmitted ?
                                <button className="nav-pill-next-btn" onClick={goNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} {qIndex === questions.length - 1 ? null : <ChevronRight />}</button> :
                                <button className="nav-pill-submit-btn" onClick={checkAnswer} disabled={!selectedOption}>Submit <Check /></button>
                            }
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>
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
                            <button className="nav-pill-next-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={goNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} {qIndex === questions.length - 1 ? null : <ChevronRight size={16} strokeWidth={3} />}</button>
                        ) : (
                            <button className="nav-pill-submit-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={checkAnswer} disabled={!selectedOption}>Submit <Check size={16} strokeWidth={3} /></button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default ConditionsForConsistency;
