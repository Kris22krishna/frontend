import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const TOTAL_QUESTIONS = 10;

const MultiplicationWordProblems = () => {
    const navigate = useNavigate();

    const [qIndex, setQIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [sessionId, setSessionId] = useState(null);
    const [answers, setAnswers] = useState({});

    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const usedQuestions = useRef([]);

    const SKILL_ID = 9007;
    const SKILL_NAME = "Multiplication Word Problems";

    // ⏱ Timer + session
    useEffect(() => {
        const userId =
            sessionStorage.getItem('userId') || localStorage.getItem('userId');

        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then((sess) => {
                if (sess?.session_id) setSessionId(sess.session_id);
            });
        }

        const timer = setInterval(() => setTimeElapsed((p) => p + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => generateQuestion(), [qIndex]);

    // 🧠 Word problems
    const wordProblems = [
        () => {
            const pay = randomInt(120, 180);
            const days = randomInt(25, 31);
            return {
                q: `A cook earns ₹${pay} per day. How much will he earn in ${days} days?`,
                a: pay * days,
            };
        },
        () => {
            const glasses = randomInt(6, 9);
            return {
                q: `Ravi drinks ${glasses} glasses of water daily. How many glasses in 30 days?`,
                a: glasses * 30,
            };
        },
        () => {
            const people = randomInt(100, 150);
            const glasses = randomInt(5, 8);
            return {
                q: `${people} people drink ${glasses} glasses each per day. Total glasses in one day?`,
                a: people * glasses,
            };
        },
        () => {
            const milk = randomInt(7, 10);
            return {
                q: `A cow gives ${milk} litres of milk daily. How much in 30 days?`,
                a: milk * 30,
            };
        },
        () => {
            const rate = randomInt(90, 120);
            const days = randomInt(40, 60);
            return {
                q: `Sukhi earns ₹${rate} per day. How much in ${days} days?`,
                a: rate * days,
            };
        },
        () => {
            const litres = randomInt(10, 15);
            const price = randomInt(20, 30);
            return {
                q: `A milk seller sells ${litres} litres at ₹${price} per litre. His earning per day?`,
                a: litres * price,
            };
        },
        () => {
            const cost = randomInt(40, 60);
            const books = randomInt(15, 30);
            return {
                q: `One book costs ₹${cost}. Cost of ${books} books?`,
                a: cost * books,
            };
        },
        () => {
            const price = randomInt(10, 15);
            const litres = randomInt(200, 300);
            return {
                q: `Packed water costs ₹${price} per litre. Cost of ${litres} litres?`,
                a: price * litres,
            };
        },
        () => {
            const rooms = randomInt(20, 30);
            const plants = randomInt(3, 6);
            return {
                q: `A school has ${rooms} rooms with ${plants} plants each. Total plants?`,
                a: rooms * plants,
            };
        },
        () => {
            const laddoos = randomInt(20, 30);
            const boxes = randomInt(10, 15);
            return {
                q: `${laddoos} laddoos in one box. How many laddoos in ${boxes} boxes?`,
                a: laddoos * boxes,
            };
        },
    ];

    const generateQuestion = () => {
        if (usedQuestions.current.length === wordProblems.length) {
            usedQuestions.current = [];
        }

        let index;
        do {
            index = randomInt(0, wordProblems.length - 1);
        } while (usedQuestions.current.includes(index));

        usedQuestions.current.push(index);

        const { q, a } = wordProblems[index]();
        const correct = a.toString();

        // Generate Distractors
        const options = [correct];
        while (options.length < 4) {
            const fake = a + randomInt(-5, 5) * (a > 100 ? 10 : 1);
            if (fake > 0 && !options.includes(fake.toString()))
                options.push(fake.toString());
        }

        setShuffledOptions(options.sort(() => Math.random() - 0.5));

        setCurrentQuestion({
            text: `<div class='question-container'><p>${q}</p></div>`,
            correctAnswer: correct,
            solution: `<strong>Solution:</strong><br/>To solve this, we multiply the numbers mentioned in the problem.<br/><br/>Answer = ${correct}`,
            difficulty: 'Medium' // Default for now
        });

        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
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

    const handleCheck = () => {
        if (!selectedOption) return;
        const right = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(right);
        setIsSubmitted(true);
        setAnswers((p) => ({ ...p, [qIndex]: right }));

        recordQuestionAttempt(currentQuestion, selectedOption, right);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex((p) => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
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

export default MultiplicationWordProblems;
