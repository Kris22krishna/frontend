import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Eye, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../../../services/api";
import LatexContent from "../../../../LatexContent";
import ExplanationModal from "../../../../ExplanationModal";
import "../../../../../pages/juniors/JuniorPracticeSession.css";

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const TOTAL_QUESTIONS = 10;

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const MultiDivWordProblems = () => {
    const navigate = useNavigate();

    const [qIndex, setQIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const usedQuestions = useRef([]);

    const SKILL_ID = 9012;
    const SKILL_NAME = "Mixed Skill Application Problems";

    useEffect(() => {
        const userId =
            sessionStorage.getItem("userId") || localStorage.getItem("userId");

        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then((sess) => {
                if (sess?.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => setTimeElapsed((p) => p + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => generateQuestion(), [qIndex]);

    // 📚 combo problems (multiplication + division)
    const problems = [
        () => {
            const people = randomInt(100, 150);
            const perDay = 8;
            const days = 365;
            return {
                q: `${people} people drink ${perDay} glasses daily. How many glasses are used in a year?`,
                a: people * perDay * days,
            };
        },
        () => {
            const litres = 8;
            const price = 9;
            const days = 30;
            return {
                q: `A cow gives ${litres} litres of milk daily. Milk sells at ₹${price} per litre. What is the earning in 30 days?`,
                a: litres * price * days,
            };
        },
        () => {
            const perDay = randomInt(70, 100);
            const months = 12;
            const days = 30;
            return {
                q: `A worker earns ₹${perDay} per day. How much does he earn in ${months} months?`,
                a: perDay * days * months,
            };
        },
        () => {
            const tanks = 25;
            const buckets = 15;
            return {
                q: `One tank fills ${buckets} buckets. How many buckets will 25 tanks fill?`,
                a: tanks * buckets,
            };
        },
        () => {
            const kg = 12;
            const laddoosPerKg = 28;
            const perBox = 16;
            return {
                q: `There are ${laddoosPerKg} laddoos in 1 kg. How many boxes are needed to pack ${kg} kg if 16 laddoos fit in one box?`,
                a: Math.ceil((kg * laddoosPerKg) / perBox),
            };
        },
        () => {
            const rooms = 26;
            const plants = 4;
            const cups = 2;
            return {
                q: `A school has ${rooms} rooms with ${plants} plants each. Each plant needs ${cups} cups of water. How many cups are needed?`,
                a: rooms * plants * cups,
            };
        },
        () => {
            const goats = 17;
            const earningPerGoat = 1;
            const days = 30;
            return {
                q: `A boy earns ₹${earningPerGoat} per goat per day for ${goats} goats. How much does he earn in 30 days?`,
                a: goats * earningPerGoat * days,
            };
        },
        () => {
            const perMonth = 2750;
            const years = 2;
            return {
                q: `A loan of ₹${perMonth} is paid every month for ${years} years. What is the total amount paid?`,
                a: perMonth * 12 * years,
            };
        },
        () => {
            const trees = 458;
            const perRow = 15;
            return {
                q: `A gardener plants ${perRow} trees in each row from ${trees} trees. How many rows can he plant?`,
                a: Math.floor(trees / perRow),
            };
        },
        () => {
            const hours = 2000;
            return {
                q: `A battery runs for ${hours} hours. How many days will it run if used continuously?`,
                a: Math.floor(hours / 24),
            };
        },
    ];

    const generateQuestion = () => {
        if (usedQuestions.current.length === problems.length) {
            usedQuestions.current = [];
        }

        let index;
        do {
            index = randomInt(0, problems.length - 1);
        } while (usedQuestions.current.includes(index));

        usedQuestions.current.push(index);

        const { q, a } = problems[index]();
        const correct = a.toString();

        let opts = [correct];
        while (opts.length < 4) {
            let fake = a + randomInt(-100, 100);
            if (fake > 0 && !opts.includes(fake.toString()))
                opts.push(fake.toString());
        }

        setShuffledOptions(opts.sort(() => Math.random() - 0.5));

        setCurrentQuestion({
            text: `<div class='question-container'><p>${q}</p></div>`,
            correctAnswer: correct,
            solution: `<strong>Solution:</strong><br/>Carefully follow the steps described in the problem using multiplication or division.<br/><br/>Answer = <strong>${correct}</strong>`,
            difficulty: 'Hard'
        });

        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const right = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(right);
        setIsSubmitted(true);
        setAnswers((p) => ({ ...p, [qIndex]: right }));

        if (right) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }
        recordQuestionAttempt(currentQuestion, selectedOption, right);
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current + (Date.now() - questionStartTime.current);
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: question.difficulty || 'Hard',
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

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex((p) => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
            setShowExplanationModal(false);
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: TOTAL_QUESTIONS,
                            correct_answers: totalCorrect,
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) { console.error(err); }
            }
            navigate(-1);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
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
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', fontWeight: '500', textAlign: 'center' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>

                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => !isSubmitted && setSelectedOption(opt)}
                                                    className={`option-btn-modern ${selectedOption === opt ? "selected" : ""
                                                        } ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`}
                                                    style={{ fontWeight: '500', fontSize: '1.2rem', fontFamily: '"Proxima Nova", sans-serif' }}
                                                    disabled={isSubmitted}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                                {feedbackMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>
                            <X size={20} /> Exit
                        </button>
                    </div>

                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}
                    </div>

                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MultiDivWordProblems;
