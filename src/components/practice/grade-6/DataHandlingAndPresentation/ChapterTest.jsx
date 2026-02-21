import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Trophy, Target, Clock, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import '../ChapterTestStandard.css';

const TOTAL_QUESTIONS = 20;
const SKILL_ID = 1072;
const SKILL_NAME = "Data Handling and Presentation Chapter Test";

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

                if (type === 1) { // Tally Marks / Data Definition
                    const choices = [
                        { q: "What is a collection of numbers gathered to give some information?", a: "Data" },
                        { q: "What are the marks '|||| /' used for?", a: "Tally Marks" },
                        { q: "Which of these is numerical data?", a: "Height of 10 students" }
                    ];
                    const selected = choices[rand(0, choices.length - 1)];
                    q = {
                        text: `${selected.q}`,
                        correctAnswer: selected.a,
                        options: shuffle([selected.a, "Observation", "Pictograph", "Bar Graph"])
                    };
                } else if (type === 2) { // Interpreting Pictographs
                    const scale = rand(2, 5);
                    const icons = rand(3, 6);
                    const total = scale * icons;
                    const item = ["Apples", "Books", "Cars", "Cycles"][rand(0, 3)];
                    q = {
                        text: `In a pictograph, one symbol represents $${scale}$ $${item}$. How many $${item}$ are there if there are $${icons}$ symbols?`,
                        correctAnswer: `${total}`,
                        options: shuffle([`${total}`, `${total + scale}`, `${icons}`, `${scale}`])
                    };
                } else if (type === 3) { // Bar Graph interpretation
                    const items = ["A", "B", "C", "D"];
                    const heights = items.map(() => rand(10, 50));
                    const maxIdx = heights.indexOf(Math.max(...heights));
                    q = {
                        text: `In a bar graph, bars for items A, B, C, and D have heights $${heights[0]}$, $${heights[1]}$, $${heights[2]}$, and $${heights[3]}$ units respectively. Which item has the maximum value?`,
                        correctAnswer: items[maxIdx],
                        options: shuffle(items)
                    };
                } else { // Frequency calculation
                    const data = [];
                    const len = rand(5, 10);
                    const target = rand(1, 3);
                    let count = 0;
                    for (let j = 0; j < len; j++) {
                        const val = rand(1, 3);
                        data.push(val);
                        if (val === target) count++;
                    }
                    q = {
                        text: `Given the data: $${data.join(', ')}$, what is the frequency of the number $${target}$?`,
                        correctAnswer: `${count}`,
                        options: shuffle([`${count}`, `${count + 1}`, `${count - 1}`, `${len}`].filter(v => parseInt(v) >= 0 && v !== ""))
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

        setUserAnswers(prev => ({ ...prev, [currentQIndex]: selectedOption }));
        if (isCorrect) setScore(prev => prev + 1);

        if (sessionId) {
            api.recordAttempt({
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                student_answer: selectedOption,
                correct_answer: currentQ.correctAnswer,
                is_correct: isCorrect,
                time_spent_seconds: 0
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
