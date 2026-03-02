import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Trophy, Target, Clock, ArrowRight, X, ChevronLeft, CheckCircle, XCircle, HelpCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../ChapterTestStandard.css';

const TOTAL_QUESTIONS = 20;
const SKILL_ID = 1072;
const SKILL_NAME = "Prime Time Chapter Test";

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

                if (type === 1) { // Divisibility
                    const n = rand(100, 999);
                    const d = [2, 3, 5, 9, 10][rand(0, 4)];
                    const isDiv = n % d === 0;
                    q = {
                        text: `Is the number $${n}$ divisible by $${d}$?`,
                        correctAnswer: isDiv ? "Yes" : "No",
                        options: shuffle(["Yes", "No"]),
                        explanation: isDiv
                            ? `The number $${n}$ is divisible by $${d}$ because $${n} \\div ${d} = ${n / d}$, leaving no remainder.`
                            : `The number $${n}$ is not divisible by $${d}$ because $${n} \\div ${d}$ leaves a remainder of $${n % d}$.`
                    };
                } else if (type === 2) { // Prime Factorization
                    const primes = [2, 3, 5, 7];
                    const p1 = primes[rand(0, 3)];
                    const p2 = primes[rand(0, 3)];
                    const n = p1 * p2;
                    q = {
                        text: `What is the prime factorization of $${n}$?`,
                        correctAnswer: `$${Math.min(p1, p2)} \\times ${Math.max(p1, p2)}$`,
                        options: shuffle([`$${Math.min(p1, p2)} \\times ${Math.max(p1, p2)}$`, `$1 \\times ${n}$`, `$${n / 2} \\times 2$`, `$${p1} + ${p2}$`].filter(o => o !== null)),
                        explanation: `Prime factorization is expressing a number as a product of prime numbers. $${Math.min(p1, p2)} \\times ${Math.max(p1, p2)} = ${n}$, and both are prime numbers.`
                    };
                } else if (type === 3) { // HCF/LCM basics
                    const a = rand(2, 6) * 2;
                    const b = rand(2, 6) * 3;
                    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
                    const hcf = gcd(a, b);
                    q = {
                        text: `Find the HCF (Highest Common Factor) of $${a}$ and $${b}$.`,
                        correctAnswer: `${hcf}`,
                        options: shuffle([`${hcf}`, `${hcf + 1}`, `${hcf * 2}`, `1`].filter((v, i, a) => a.indexOf(v) === i)),
                        explanation: `The Highest Common Factor is the largest number that divides both $${a}$ and $${b}$. The factors of $${a}$ are ${[...Array(a + 1).keys()].filter(i => a % i === 0).join(', ')} and factors of $${b}$ are ${[...Array(b + 1).keys()].filter(i => b % i === 0).join(', ')}. The largest common factor is <strong>${hcf}</strong>.`
                    };
                } else { // LCM
                    const a = [4, 6, 8][rand(0, 2)];
                    const b = [3, 5, 9][rand(0, 2)];
                    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
                    const lcm = (a * b) / gcd(a, b);
                    q = {
                        text: `Find the LCM (Lowest Common Multiple) of $${a}$ and $${b}$.`,
                        correctAnswer: `${lcm}`,
                        options: shuffle([`${lcm}`, `${lcm * 2}`, `${a + b}`, `${Math.max(a, b)}`]),
                        explanation: `The Least Common Multiple is the smallest number that is a multiple of both $${a}$ and $${b}$. Multiples of $${a}$: ${[a, a * 2, a * 3, a * 4, a * 5].join(', ')}... Multiples of $${b}$: ${[b, b * 2, b * 3, b * 4, b * 5].join(', ')}... The smallest common multiple is <strong>${lcm}</strong>.`
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

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

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

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            const prevIndex = currentQIndex - 1;
            setCurrentQIndex(prevIndex);
            setSelectedOption(userAnswers[prevIndex] || null);
        }
    };

    const finishTest = async (lastAnswer) => {
        setIsFinished(true);
        clearInterval(timerRef.current);

        const finalAnswers = { ...userAnswers };
        if (lastAnswer !== undefined) {
            finalAnswers[currentQIndex] = lastAnswer;
        }

        const finalCorrectCount = questions.reduce((count, q, idx) => {
            if (finalAnswers[idx] === q.correctAnswer) return count + 1;
            return count;
        }, 0);

        setScore(finalCorrectCount);
        const finalScore = Math.round((finalCorrectCount / TOTAL_QUESTIONS) * 100);

        if (sessionId) {
            await api.createReport({
                user_id: parseInt(sessionStorage.getItem('userId') || localStorage.getItem('userId')),
                title: SKILL_NAME,
                score: finalScore,
                parameters: {
                    total_questions: TOTAL_QUESTIONS,
                    correct_answers: finalCorrectCount,
                    time_taken_seconds: timeElapsed
                }
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

    if (questions.length === 0) return <div className="chapter-test-page flex items-center justify-center">Loading Questions...</div>;

    const currentQuestion = questions[currentQIndex];

    return (
        <div className="chapter-test-page">
            <header className="chapter-test-header">
                <div className="test-title">{SKILL_NAME.replace(" Chapter Test", "")}</div>
                <div className="question-counter-badge">
                    Question {currentQIndex + 1} / {TOTAL_QUESTIONS}
                </div>
                <div className="test-timer">
                    {formatTime(timeElapsed)}
                </div>
            </header>

            <main className="test-main-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQIndex}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="question-container-card"
                    >
                        <div className="test-question-text">
                            <LatexContent html={currentQuestion.text} />
                        </div>

                        <div className="test-options-grid">
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    className={`test-option-button ${selectedOption === option ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    <LatexContent html={option} />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="test-footer">
                <button className="exit-test-btn" onClick={() => navigate(-1)}>
                    <X size={20} /> Exit Test
                </button>

                <div className="test-nav-actions">
                    <button
                        className="prev-btn"
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
