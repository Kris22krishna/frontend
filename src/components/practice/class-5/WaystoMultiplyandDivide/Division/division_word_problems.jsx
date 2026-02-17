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

const DivisionWordProblems = () => {
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

    const SKILL_ID = 9011;
    const SKILL_NAME = "Division Word Problems";

    useEffect(() => {
        const userId =
            sessionStorage.getItem("userId") || localStorage.getItem("userId");

        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then((sess) => {
                if (sess?.session_id) setSessionId(sess.session_id);
            });
        }

        const timer = setInterval(() => setTimeElapsed((p) => p + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => generateQuestion(), [qIndex]);

    // 📚 Division word problems
    const divisionProblems = [
        () => {
            const money = randomInt(900, 1500);
            const cost = randomInt(30, 60);
            return {
                q: `Isha has ₹${money}. Petrol costs ₹${cost} per litre. How many litres can she buy?`,
                a: Math.floor(money / cost),
            };
        },
        () => {
            const pencils = randomInt(800, 1000);
            return {
                q: `Each child gets 4 pencils. If there are ${pencils} pencils, how many children will get them?`,
                a: Math.floor(pencils / 4),
            };
        },
        () => {
            const loan = randomInt(8000, 12000);
            const months = randomInt(4, 8);
            return {
                q: `A loan of ₹${loan} is repaid in ${months} equal months. How much per month?`,
                a: Math.floor(loan / months),
            };
        },
        () => {
            const children = randomInt(900, 1000);
            return {
                q: `${children} children are going on a picnic. If 25 sit in one bus, how many buses are needed?`,
                a: Math.ceil(children / 25),
            };
        },
        () => {
            const books = randomInt(500, 600);
            const perBox = randomInt(20, 30);
            return {
                q: `${books} books are packed with ${perBox} books in each box. How many boxes are needed?`,
                a: Math.ceil(books / perBox),
            };
        },
        () => {
            const trees = randomInt(400, 500);
            const perRow = randomInt(10, 20);
            return {
                q: `A gardener plants ${trees} trees in rows of ${perRow}. How many rows are needed?`,
                a: Math.floor(trees / perRow),
            };
        },
        () => {
            const people = randomInt(800, 900);
            const rows = randomInt(40, 50);
            return {
                q: `${people} people sit in ${rows} rows. How many in each row?`,
                a: Math.floor(people / rows),
            };
        },
        () => {
            const hours = randomInt(1800, 2400);
            return {
                q: `A battery runs for ${hours} hours continuously. How many days will it run?`,
                a: Math.floor(hours / 24),
            };
        },
        () => {
            const laddoos = randomInt(300, 400);
            const perBox = randomInt(12, 20);
            return {
                q: `${laddoos} laddoos are packed in boxes of ${perBox}. How many boxes are needed?`,
                a: Math.ceil(laddoos / perBox),
            };
        },
        () => {
            const money = randomInt(2000, 3000);
            return {
                q: `₹${money} is divided equally among 4 children. How much does each get?`,
                a: Math.floor(money / 4),
            };
        },
    ];

    const generateQuestion = () => {
        if (usedQuestions.current.length === divisionProblems.length) {
            usedQuestions.current = [];
        }

        let index;
        do {
            index = randomInt(0, divisionProblems.length - 1);
        } while (usedQuestions.current.includes(index));

        usedQuestions.current.push(index);

        const { q, a } = divisionProblems[index]();

        const correct = a.toString();
        const options = [correct];

        while (options.length < 4) {
            const fake = a + randomInt(-10, 10);
            if (fake > 0 && !options.includes(fake.toString()))
                options.push(fake.toString());
        }

        setShuffledOptions(options.sort(() => Math.random() - 0.5));

        setCurrentQuestion({
            text: `<div class='question-container'><p>${q}</p></div>`,
            correctAnswer: correct,
            solution: `<strong>Solution:</strong><br/>To find the answer, we divide the numbers given in the problem.<br/><br/>Answer = <strong>${correct}</strong>`,
            difficulty: 'Medium'
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
                difficulty_level: question.difficulty || 'Medium',
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

export default DivisionWordProblems;
