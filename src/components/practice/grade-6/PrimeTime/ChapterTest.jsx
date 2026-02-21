import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Trophy, Target, Clock, ArrowRight, X, ChevronLeft } from 'lucide-react';
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
                        options: shuffle(["Yes", "No"])
                    };
                } else if (type === 2) { // Prime Factorization
                    const primes = [2, 3, 5, 7];
                    const p1 = primes[rand(0, 3)];
                    const p2 = primes[rand(0, 3)];
                    const n = p1 * p2;
                    q = {
                        text: `What is the prime factorization of $${n}$?`,
                        correctAnswer: `$${Math.min(p1, p2)} \\times ${Math.max(p1, p2)}$`,
                        options: shuffle([`$${Math.min(p1, p2)} \\times ${Math.max(p1, p2)}$`, `$1 \\times ${n}$`, `$${n / 2} \\times 2$`, `$${p1} + ${p2}$`].filter(o => o !== null))
                    };
                } else if (type === 3) { // HCF/LCM basics
                    const a = rand(2, 6) * 2;
                    const b = rand(2, 6) * 3;
                    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
                    const hcf = gcd(a, b);
                    q = {
                        text: `Find the HCF (Highest Common Factor) of $${a}$ and $${b}$.`,
                        correctAnswer: `${hcf}`,
                        options: shuffle([`${hcf}`, `${hcf + 1}`, `${hcf * 2}`, `1`].filter((v, i, a) => a.indexOf(v) === i))
                    };
                } else { // LCM
                    const a = [4, 6, 8][rand(0, 2)];
                    const b = [3, 5, 9][rand(0, 2)];
                    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
                    const lcm = (a * b) / gcd(a, b);
                    q = {
                        text: `Find the LCM (Lowest Common Multiple) of $${a}$ and $${b}$.`,
                        correctAnswer: `${lcm}`,
                        options: shuffle([`${lcm}`, `${lcm * 2}`, `${a + b}`, `${Math.max(a, b)}`])
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
        if (!selectedOption) return;

        const currentQ = questions[currentQIndex];
        const isCorrect = selectedOption === currentQ.correctAnswer;

        // Record answer locally
        setUserAnswers(prev => ({ ...prev, [currentQIndex]: selectedOption }));
        if (isCorrect) setScore(prev => prev + 1);

        // Record to DB as we go
        if (sessionId) {
            api.recordAttempt({
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                student_answer: selectedOption,
                correct_answer: currentQ.correctAnswer,
                is_correct: isCorrect,
                time_spent_seconds: 0 // Could track per question if needed
            }).catch(console.error);
        }

        if (currentQIndex < TOTAL_QUESTIONS - 1) {
            setCurrentQIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            finishTest(isCorrect);
        }
    };

    const handleSkip = () => {
        if (currentQIndex < TOTAL_QUESTIONS - 1) {
            setCurrentQIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            finishTest(false);
        }
    };

    const finishTest = async (lastCorrect) => {
        setIsFinished(true);
        clearInterval(timerRef.current);

        const finalCorrectCount = score + (lastCorrect ? 1 : 0);
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
            <div className="test-result-overlay">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="result-card-standardized">
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
            </div>
        );
    }

    if (questions.length === 0) return <div className="chapter-test-page flex items-center justify-center">Loading Questions...</div>;

    const currentQuestion = questions[currentQIndex];

    return (
        <div className="chapter-test-page">
            <header className="chapter-test-header">
                <div className="test-title">Chapter Test</div>
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
                    <button className="skip-btn" onClick={handleSkip}>
                        Skip <ChevronRight size={20} />
                    </button>
                    <button
                        className={`submit-test-btn ${selectedOption ? 'active' : ''}`}
                        onClick={handleNext}
                        disabled={!selectedOption}
                    >
                        {currentQIndex < TOTAL_QUESTIONS - 1 ? 'SUBMIT' : 'FINISH'}
                        <ChevronRight size={20} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChapterTest;
