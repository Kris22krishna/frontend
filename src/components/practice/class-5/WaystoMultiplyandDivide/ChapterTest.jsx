import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Trophy, Target, Clock, ArrowRight, X, ChevronLeft, CheckCircle, XCircle, HelpCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../../grade-6/ChapterTestStandard.css';


const TOTAL_QUESTIONS = 20;
const SKILL_ID = 5002;
const SKILL_NAME = "Grade 5 - Ways to Multiply and Divide - Chapter Test";

const ChapterTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [score, setScore] = useState(0);

    const timerRef = useRef(null);

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

            for (let i = 0; i < TOTAL_QUESTIONS; i++) {
                const type = rand(1, 4);
                let q = {};

                if (type === 1) { // Large Multiplication
                    const a = rand(15, 99);
                    const b = rand(11, 25);
                    const res = a * b;
                    q = {
                        text: `Multiply: $${a} \\times ${b}$`,
                        correctAnswer: `${res}`,
                        options: shuffle([`${res}`, `${res + 10}`, `${res - 10}`, `${a + b}`]),
                        explanation: `To multiply $${a} \\times ${b}$, we can use the column method or break $${b}$ into $(10 + ${b - 10})$. $${a} \\times ${b} = ${res}$.`
                    };
                } else if (type === 2) { // Long Division
                    const b = rand(5, 12);
                    const res = rand(15, 40);
                    const a = b * res;
                    q = {
                        text: `Divide $${a}$ by $${b}$. What is the quotient?`,
                        correctAnswer: `${res}`,
                        options: shuffle([`${res}`, `${res + 2}`, `${res - 2}`, `${res * 2}`]),
                        explanation: `$${a} \\div ${b} = ${res}$. You can divide digit by digit or use long division.`
                    };
                } else if (type === 3) { // Word Problem
                    const price = rand(10, 20) * 10;
                    const items = rand(5, 15);
                    const total = price * items;
                    q = {
                        text: `If one book costs $₹${price}$, how much will $${items}$ such books cost?`,
                        correctAnswer: `$₹${total}$`,
                        options: shuffle([`$₹${total}$`, `$₹${total - price}$`, `$₹${total + 10}$`, `$₹${price + items}$`]),
                        explanation: `Total cost = Price per book $\\times$ number of books. $₹${price} \\times ${items} = ₹${total}$.`
                    };
                } else { // Division with Remainder
                    const b = rand(4, 9);
                    const qRes = rand(10, 20);
                    const rem = rand(1, b - 1);
                    const a = b * qRes + rem;
                    q = {
                        text: `Divide $${a}$ by $${b}$. What is the remainder?`,
                        correctAnswer: `${rem}`,
                        options: shuffle([`${rem}`, `${rem + 1}`, `0`, `${b}`]),
                        explanation: `$${a} = (${b} \\times ${qRes}) + ${rem}$. The largest multiple of $${b}$ less than $${a}$ is $${b * qRes}$. $${a} - ${b * qRes} = ${rem}$.`
                    };
                }
                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };

        generateQuestions();

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const handleNext = async () => {
        setUserAnswers(prev => ({ ...prev, [currentQIndex]: selectedOption }));

        if (currentQIndex < TOTAL_QUESTIONS - 1) {
            const nextIndex = currentQIndex + 1;
            setCurrentQIndex(nextIndex);
            setSelectedOption(userAnswers[nextIndex] || null);
        } else {
            finishTest(selectedOption);
        }
    };

    const finishTest = async (lastAnswer) => {
        setIsFinished(true);
        clearInterval(timerRef.current);

        const finalUserAnswers = { ...userAnswers, [currentQIndex]: lastAnswer };
        let finalScore = 0;
        questions.forEach((q, idx) => {
            if (finalUserAnswers[idx] === q.correctAnswer) finalScore++;
        });
        setScore(finalScore);

        if (sessionId) {
            const scorePercentage = Math.round((finalScore / TOTAL_QUESTIONS) * 100);
            await api.createReport(sessionId, {
                total_questions: TOTAL_QUESTIONS,
                correct_answers: finalScore,
                score: scorePercentage,
                time_taken: timeElapsed
            }).catch(console.error);
            await api.finishSession(sessionId).catch(console.error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (isFinished) {
        return (
            <div className="test-result-overlay overflow-y-auto">
                <div className="max-w-4xl w-full py-12">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="result-card-standardized mb-12">
                        <Trophy className="mx-auto text-yellow-500 mb-6" size={80} />
                        <h1 className="text-4xl font-black text-[#1e1b4b] mb-2">Test Completed!</h1>
                        <p className="text-gray-500 font-bold text-xl mb-8">{SKILL_NAME}</p>

                        <div className="result-stat-grid">
                            <div className="stat-box score">
                                <Target size={32} className="mx-auto mb-2" />
                                <div className="text-3xl font-black">{score}/{TOTAL_QUESTIONS}</div>
                                <div className="text-sm font-bold uppercase tracking-widest opacity-70">Correct Answers</div>
                            </div>
                            <div className="stat-box time">
                                <Clock size={32} className="mx-auto mb-2" />
                                <div className="text-3xl font-black">{formatTime(timeElapsed)}</div>
                                <div className="text-sm font-bold uppercase tracking-widest opacity-70">Time Taken</div>
                            </div>
                        </div>

                        <button onClick={() => navigate(-1)} className="back-to-syllabus-btn">
                            Return to Syllabus <ArrowRight size={24} />
                        </button>
                    </motion.div>

                    <div className="detailed-report-section">
                        <h2 className="report-title">Question-wise Report</h2>
                        <div className="report-questions-list">
                            {questions.map((q, idx) => {
                                const userAnswer = userAnswers[idx];
                                const isCorrect = userAnswer === q.correctAnswer;
                                const isSkipped = userAnswer === null || userAnswer === undefined;

                                return (
                                    <div key={idx} className="report-question-item">
                                        <div className="report-question-header">
                                            <span className="font-bold text-gray-400">Question {idx + 1}</span>
                                            <span className={`question-status-badge ${isCorrect ? 'status-correct' : isSkipped ? 'status-skipped' : 'status-incorrect'}`}>
                                                {isCorrect ? <><CheckCircle size={16} /> Correct</> : isSkipped ? <><HelpCircle size={16} /> Skipped</> : <><XCircle size={16} /> Incorrect</>}
                                            </span>
                                        </div>
                                        <div className="report-question-text">
                                            <LatexContent html={q.text} />
                                        </div>
                                        <div className="report-answers-grid">
                                            <div className={`answer-comparison-box your-answer-box ${isCorrect ? 'correct-border' : isSkipped ? 'skipped-border' : 'incorrect-border'}`}>
                                                <div className="answer-label">Your Answer</div>
                                                <div className="answer-value">
                                                    {isSkipped ? <span className="text-gray-400 font-normal italic">No answer provided</span> : <LatexContent html={userAnswer} />}
                                                </div>
                                            </div>
                                            <div className="answer-comparison-box correct-answer-box">
                                                <div className="answer-label">Correct Answer</div>
                                                <div className="answer-value">
                                                    <LatexContent html={q.correctAnswer} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="report-options-container">
                                            <span className="report-options-label">Options Provided:</span>
                                            <div className="report-options-list">
                                                {q.options.map((opt, optIdx) => {
                                                    const isOptCorrect = opt === q.correctAnswer;
                                                    const isOptUserChoice = opt === userAnswer;
                                                    return (
                                                        <div key={optIdx} className={`report-option-item ${isOptCorrect ? 'is-correct' : ''} ${isOptUserChoice ? 'is-user-choice' : ''}`}>
                                                            {isOptCorrect ? <CheckCircle size={14} /> : isOptUserChoice ? <XCircle size={14} /> : null}
                                                            <LatexContent html={opt} />
                                                            {isOptUserChoice && <span className="user-choice-marker">Your Choice</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="report-explanation-box">
                                            <div className="explanation-title">
                                                <Info size={16} /> Explanation
                                            </div>
                                            <div className="explanation-content">
                                                <LatexContent html={q.explanation} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (questions.length === 0) return <div className="junior-practice-page flex items-center justify-center">Loading Questions...</div>;

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            const prevIndex = currentQIndex - 1;
            setCurrentQIndex(prevIndex);
            setSelectedOption(userAnswers[prevIndex] || null);
        }
    };

    return (
        <div className="junior-practice-page">
            <header className="junior-practice-header">
                <div className="header-left">
                    <span className="chapter-name-display">{SKILL_NAME}</span>
                </div>
                <div className="header-center">
                    <div className="question-counter-badge">
                        Question {currentQIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="timer-display">
                        <Clock size={20} /> {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="junior-practice-main">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQIndex}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="junior-question-card"
                    >
                        <div className="question-text">
                            <LatexContent html={questions[currentQIndex].text} />
                        </div>
                        <div className="options-grid-modern">
                            {questions[currentQIndex].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                    onClick={() => setSelectedOption(option)}
                                >
                                    <LatexContent html={option} />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="junior-bottom-bar">
                <div className="bottom-left">
                    <button className="quit-practice-btn" onClick={() => navigate(-1)}>
                        <X size={20} /> Quit Test
                    </button>
                </div>
                <div className="bottom-right">
                    <button
                        className="prev-question-btn"
                        onClick={handlePrevious}
                        disabled={currentQIndex === 0}
                    >
                        <ChevronLeft size={20} /> Previous
                    </button>
                    <button
                        className={`submit-test-btn active`}
                        onClick={handleNext}
                    >
                        {currentQIndex < TOTAL_QUESTIONS - 1 ? 'NEXT' : 'FINISH'}
                        <ChevronRight size={20} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChapterTest;
