import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const GridRectangle = ({ width, height, unit = "cm" }) => {
    const cellSize = 30;
    const cells = [];
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            cells.push(
                <rect
                    key={`${i}-${j}`}
                    x={j * cellSize}
                    y={i * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill="#E0F2FE"
                    stroke="#3b82f6"
                    strokeWidth="1"
                />
            );
        }
    }
    return (
        <div className="flex flex-col items-center my-6">
            <svg width={width * cellSize} height={height * cellSize} className="shadow-md rounded-sm">
                {cells}
            </svg>
            <div className="mt-2 text-sm text-slate-500 italic">Each square represents 1 sq {unit}</div>
        </div>
    );
};

const DimensionRectangle = ({ width, height, unit = "cm" }) => {
    return (
        <div className="flex flex-col items-center my-12">
            <div
                className="relative border-4 border-[#31326F] bg-indigo-50 flex items-center justify-center rounded-lg shadow-inner"
                style={{ width: `${width * 40}px`, height: `${height * 40}px`, maxWidth: '300px', maxHeight: '200px' }}
            >
                {/* Length label */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-black text-[#31326F]">
                    {width} {unit}
                </div>
                {/* Width label */}
                <div className="absolute top-1/2 -right-16 -translate-y-1/2 font-black text-[#31326F]">
                    {height} {unit}
                </div>
            </div>
        </div>
    );
};

const CompositeShape = ({ parts }) => {
    const cellSize = 30;
    return (
        <div className="flex flex-col items-center my-8">
            <svg
                width={Math.max(...parts.map(p => p.x + p.w)) * cellSize}
                height={Math.max(...parts.map(p => p.y + p.h)) * cellSize}
            >
                {parts.map((p, i) => (
                    <rect
                        key={i}
                        x={p.x * cellSize}
                        y={p.y * cellSize}
                        width={p.w * cellSize}
                        height={p.h * cellSize}
                        fill="#E0F2FE"
                        stroke="#31326F"
                        strokeWidth="2"
                    />
                ))}
            </svg>
            <div className="mt-2 text-sm text-slate-500 italic">Each unit square is 1 sq cm</div>
        </div>
    );
};

const CORRECT_MESSAGES = [
    "✨ Geometry genius! Great job! ✨",
    "🌟 Area expert! 🌟",
    "🎉 Correct! You measured that perfectly! 🎉",
    "✨ Brilliant work! ✨",
    "🚀 You're on a roll! 🚀"
];

const FindingArea = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1159;
    const SKILL_NAME = "Finding Area";

    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
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

        const generateQuestions = () => {
            const questions = [];
            const usedValues = new Set();

            // Easy (3 Questions) - Counting squares
            while (questions.length < 3) {
                const w = randomInt(3, 6);
                const h = randomInt(2, 4);
                const area = w * h;
                const valStr = `easy-${w}-${h}`;
                if (!usedValues.has(valStr)) {
                    usedValues.add(valStr);
                    const correctAnswer = `${area} sq cm`;
                    questions.push({
                        text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 1.8rem; font-weight: normal; text-align: center;'>
                                Look at the rectangle on the grid. What is its <strong>area</strong>?
                             </div>`,
                        correctAnswer,
                        solution: `To find the area, count the total number of unit squares. There are $${h}$ rows and $${w}$ columns. $${h} \\times ${w} = ${area}$ squares. So the area is <strong>${area} sq cm</strong>.`,
                        visual: <GridRectangle width={w} height={h} />,
                        shuffledOptions: [correctAnswer, `${area + 2} sq cm`, `${area - 1} sq cm`, `${(w + h) * 2} sq cm`].sort(() => Math.random() - 0.5)
                    });
                }
            }

            // Medium (3 Questions) - Dimensions given
            while (questions.length < 6) {
                const w = randomInt(7, 12);
                const h = randomInt(4, 9);
                const area = w * h;
                const valStr = `medium-${w}-${h}`;
                if (!usedValues.has(valStr)) {
                    usedValues.add(valStr);
                    const correctAnswer = `${area} sq cm`;
                    questions.push({
                        text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 1.8rem; font-weight: normal; text-align: center;'>
                                A rectangle has a length of $${w}$ cm and a width of $${h}$ cm. What is its <strong>area</strong>?
                             </div>`,
                        correctAnswer,
                        solution: `Area of a rectangle is calculated as: $\\text{Length} \\times \\text{Width}$. <br/> $${w} \\text{ cm} \\times ${h} \\text{ cm} = ${area} \\text{ sq cm}$.`,
                        visual: <DimensionRectangle width={6} height={4} unit="cm" />, // Representative visual
                        shuffledOptions: [correctAnswer, `${area + 10} sq cm`, `${(w + h) * 2} sq cm`, `${area - 5} sq cm`].sort(() => Math.random() - 0.5)
                    });
                }
            }

            // Hard (4 Questions) - Composite or Missing side
            while (questions.length < 10) {
                const type = randomInt(0, 1) === 0 ? 'composite' : 'missingSide';
                if (type === 'composite') {
                    const w1 = 3, h1 = 5, w2 = 4, h2 = 2; // Fixed L-shape for simplicity
                    const area = (w1 * h1) + (w2 * h2);
                    const valStr = `hard-comp-${questions.length}`;
                    if (!usedValues.has(valStr)) {
                        usedValues.add(valStr);
                        const correctAnswer = `${area} sq cm`;
                        questions.push({
                            text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 1.8rem; font-weight: normal; text-align: center;'>
                                    Find the total <strong>area</strong> of this composite shape.
                                 </div>`,
                            correctAnswer,
                            solution: `Split the shape into two rectangles. Rectangle 1: $3 \\times 5 = 15$. Rectangle 2: $4 \\times 2 = 8$. Total Area = $15 + 8 = 23$ sq cm.`,
                            visual: <CompositeShape parts={[{ x: 0, y: 0, w: 3, h: 5 }, { x: 3, y: 3, w: 4, h: 2 }]} />,
                            shuffledOptions: [correctAnswer, `${area + 5} sq cm`, `18 sq cm`, `${area - 4} sq cm`].sort(() => Math.random() - 0.5)
                        });
                    }
                } else {
                    const side1 = randomInt(5, 10);
                    const area = side1 * randomInt(3, 8);
                    const side2 = area / side1;
                    const valStr = `hard-missing-${area}-${side1}`;
                    if (!usedValues.has(valStr)) {
                        usedValues.add(valStr);
                        const correctAnswer = `${side2} cm`;
                        questions.push({
                            text: `<div class='question-container' style='font-family: "Open Sans", sans-serif; font-size: 1.8rem; font-weight: normal; text-align: center;'>
                                    The area of a rectangle is $${area}$ sq cm. If its length is $${side1}$ cm, what is its <strong>width</strong>?
                                 </div>`,
                            correctAnswer,
                            solution: `We know Area = Length $\\times$ Width. <br/> $${area} = ${side1} \\times \\text{Width}$ <br/> Width = $${area} \\div ${side1} = <strong>${side2} cm</strong>$.`,
                            visual: <div className="h-24 flex items-center justify-center text-4xl font-black text-indigo-200">?</div>,
                            shuffledOptions: [correctAnswer, `${side2 + 2} cm`, `${area} cm`, `${side1} cm`].sort(() => Math.random() - 0.5)
                        });
                    }
                }
            }
            return questions;
        };

        setSessionQuestions(generateQuestions());

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            setShuffledOptions(qData.shuffledOptions);
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex, sessionQuestions]);

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

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
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
                            timestamp: new Date().toISOString(),
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResults(true);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const stats = (() => {
        let correct = 0;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total: TOTAL_QUESTIONS };
    })();

    if (!currentQuestion && !showResults) return <div className="flex h-screen items-center justify-center text-2xl font-bold text-[#31326F]">Loading...</div>;

    if (showResults) {
        const score = stats.correct;
        const total = stats.total;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                    >
                        Back to Topics
                    </button>
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">Done!</span>
                        </div>
                    </div>
                </header>

                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    {/* Reuse results UI summary from template */}
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Great Measuring! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}
                                >
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-12">
                        <div className="stat-card bg-white p-6 rounded-3xl border-2 border-[#E0FBEF] text-center">
                            <span className="block text-xs font-black uppercase text-[#4FB7B3] mb-1">Score</span>
                            <span className="text-3xl font-black text-[#31326F]">{score}/{total}</span>
                        </div>
                        <div className="stat-card bg-white p-6 rounded-3xl border-2 border-[#E0FBEF] text-center">
                            <span className="block text-xs font-black uppercase text-[#4FB7B3] mb-1">Time</span>
                            <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                        </div>
                        <div className="stat-card bg-white p-6 rounded-3xl border-2 border-[#E0FBEF] text-center">
                            <span className="block text-xs font-black uppercase text-[#4FB7B3] mb-1">Accuracy</span>
                            <span className="text-3xl font-black text-[#31326F]">{percentage}%</span>
                        </div>
                        <div className="stat-card bg-white p-6 rounded-3xl border-2 border-[#E0FBEF] text-center">
                            <span className="block text-xs font-black uppercase text-[#4FB7B3] mb-1">Grade</span>
                            <span className="text-3xl font-black text-[#31326F]">{percentage >= 80 ? 'A+' : percentage >= 60 ? 'B' : 'Keep Trying'}</span>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6">Area Log 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <div key={idx} className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'}`}>
                                        <div className="flex gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>{idx + 1}</div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-2"><LatexContent html={q.text} /></div>
                                                <div className="flex gap-4">
                                                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex-1">
                                                        <span className="block text-[10px] uppercase text-gray-400 font-black">Your Answer</span>
                                                        <span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}>{ans.selected}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="p-3 bg-[#E0FBEF] rounded-xl border border-[#4FB7B3]/10 flex-1">
                                                            <span className="block text-[10px] uppercase text-[#4FB7B3] font-black">Correct Answer</span>
                                                            <span className="text-lg font-black text-[#31326F]">{q.correctAnswer}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions flex justify-center gap-4 py-8">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl" onClick={() => window.location.reload()}>Play Again</button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-black text-xl" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header flex justify-between items-center px-8 relative">
                <button className="bg-white/90 p-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F]" onClick={() => navigate(-1)}><X size={24} /></button>
                <div className="bg-white/90 px-6 py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-xl shadow-lg absolute left-1/2 -translate-x-1/2">
                    Question {qIndex + 1} / {TOTAL_QUESTIONS}
                </div>
                <div className="bg-white/90 px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-lg font-bold text-[#31326F]">{formatTime(timeElapsed)}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }} className="w-full">
                            <div className="question-card-modern p-12">
                                <h2 className="question-text-modern text-center text-4xl mb-8"><LatexContent html={currentQuestion.text} /></h2>
                                <div className="visual-area mb-8">{currentQuestion.visual}</div>
                                <div className="options-grid-modern grid grid-cols-2 gap-4">
                                    {shuffledOptions.map((opt, i) => (
                                        <button
                                            key={i}
                                            className={`option-btn-modern text-3xl p-6 rounded-2xl border-4 transition-all ${selectedOption === opt ? 'selected border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-white hover:border-indigo-200'} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct bg-emerald-50 border-emerald-500' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong bg-red-50 border-red-500' : ''}`}
                                            onClick={() => handleOptionSelect(opt)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexContent html={opt} />
                                        </button>
                                    ))}
                                </div>
                                {isSubmitted && isCorrect && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mt-6 text-[#4FB7B3] font-black text-2xl">{feedbackMessage}</motion.div>}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => { setShowExplanationModal(false); handleNext(); }}
            />

            <footer className="junior-bottom-bar flex justify-between p-6 px-12 bg-white/80 backdrop-blur-md">
                <button className="bg-red-50 text-red-500 px-8 py-3 rounded-2xl border-2 border-red-100 font-black" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {isSubmitted && <button className="px-8 py-3 rounded-2xl bg-indigo-50 text-indigo-600 font-black" onClick={() => setShowExplanationModal(true)}>Explain</button>}
                    {isSubmitted ? (
                        <button className="nav-pill-next-btn px-10 py-3 rounded-2xl bg-[#31326F] text-white font-black" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="nav-pill-submit-btn px-10 py-3 rounded-2xl bg-[#4FB7B3] text-white font-black" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default FindingArea;
