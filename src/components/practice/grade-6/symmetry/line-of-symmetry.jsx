import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import './polynomials.css';

const PracticeSummaryModal = ({ isOpen, timeTaken, correctCount, totalCount, onContinue }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
                <h2 className="text-3xl font-black text-[#31326F] mb-4">Practice Complete!</h2>
                <div className="text-5xl mb-6">🎊</div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border-2 border-gray-100">
                        <div className="flex items-center gap-3 text-gray-500 font-bold">
                            <span className="text-xl">🕒</span> Time Taken:
                        </div>
                        <span className="text-xl font-black text-[#31326F]">{timeTaken}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border-2 border-green-100">
                        <div className="flex items-center gap-3 text-green-600 font-bold">
                            <Check className="w-6 h-6" /> Correct Answers:
                        </div>
                        <span className="text-xl font-black text-green-600">{correctCount} / {totalCount}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border-2 border-red-100">
                        <div className="flex items-center gap-3 text-red-500 font-bold">
                            <X className="w-6 h-6" /> Wrong Answers:
                        </div>
                        <span className="text-xl font-black text-red-500">{totalCount - correctCount} / {totalCount}</span>
                    </div>
                </div>

                <button
                    onClick={onContinue}
                    className="w-full py-4 bg-[#31326F] text-white rounded-2xl font-black text-xl shadow-lg hover:bg-[#31326F]/90 transition-all active:scale-95"
                >
                    Continue
                </button>
            </motion.div>
        </div>
    );
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Perfect symmetry! ✨",
    "🌟 Symmetry Star! 🌟",
    "🎉 Excellent visualization! 🎉",
    "💎 Brilliant observation! 💎",
    "🚀 Outstanding! 🚀"
];

const IntroductionToSymmetryLineOfSymmetry = () => {
    const { grade } = useParams();
    const navigate = useNavigate();

    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const storageKey = `practice_${window.location.pathname}`;

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [history, setHistory] = useState(() => getSessionData(`${storageKey}_history`, {}));
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 9201;
    const SKILL_NAME = "Introduction to Symmetry : Line of Symmetry";
    const TOTAL_QUESTIONS = 10;

    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));

    useEffect(() => {
        sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
        sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
        sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
        sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
        if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
    }, [qIndex, history, answers, sessionId]);

    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_history`);
        sessionStorage.removeItem(`${storageKey}_answers`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
    };

    const renderFigure = (type, params = {}) => {
        const size = 150;
        const center = size / 2;
        if (type === 'square') {
            return `
                <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="mx-auto">
                    <rect x="25" y="25" width="100" height="100" fill="#E0E7FF" stroke="#31326F" stroke-width="2" />
                    <line x1="75" y1="10" x2="75" y2="140" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                    <line x1="10" y1="75" x2="140" y2="75" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                </svg>
            `;
        }
        if (type === 'rectangle') {
            return `
                <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="mx-auto">
                    <rect x="25" y="45" width="100" height="60" fill="#E0E7FF" stroke="#31326F" stroke-width="2" />
                    <line x1="75" y1="10" x2="75" y2="140" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                    <line x1="10" y1="75" x2="140" y2="75" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                </svg>
            `;
        }
        if (type === 'circle') {
            return `
                <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="mx-auto">
                    <circle cx="75" cy="75" r="50" fill="#E0E7FF" stroke="#31326F" stroke-width="2" />
                    <line x1="75" y1="10" x2="75" y2="140" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                    <line x1="10" y1="75" x2="140" y2="75" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                    <line x1="29.5" y1="29.5" x2="120.5" y2="120.5" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                </svg>
            `;
        }
        if (type === 'rhombus') {
            return `
                <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="mx-auto">
                    <polygon points="75,25 125,75 75,125 25,75" fill="#E0E7FF" stroke="#31326F" stroke-width="2" />
                    <line x1="75" y1="10" x2="75" y2="140" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                    <line x1="10" y1="75" x2="140" y2="75" stroke="#EF4444" stroke-width="2" stroke-dasharray="4" />
                </svg>
            `;
        }
        return "";
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID)
                .then(sess => sess?.session_id && setSessionId(sess.session_id))
                .catch(console.error);
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

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
    }, []);

    useEffect(() => {
        if (history[qIndex]) {
            const data = history[qIndex];
            setCurrentQuestion(data.question);
            setShuffledOptions(data.options);
            setSelectedOption(data.selectedOption || null);
            setIsSubmitted(data.isSubmitted || false);
            setIsCorrect(data.isCorrect || false);
            setFeedbackMessage(data.feedbackMessage || "");
        } else {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        const types = [
            "count_lines",
            "identify_shape",
            "concept_definition",
            "letter_symmetry"
        ];

        const type = types[randomInt(0, types.length - 1)];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let chart = "";

        if (type === "count_lines") {
            const shapes = [
                { name: "Square", lines: 4, type: 'square' },
                { name: "Rectangle", lines: 2, type: 'rectangle' },
                { name: "Rhombus", lines: 2, type: 'rhombus' },
                { name: "Regular Hexagon", lines: 6 }
            ];
            const shape = shapes[randomInt(0, shapes.length - 1)];
            qText = `How many lines of symmetry does a ${shape.name} have?`;
            correct = `${shape.lines}`;
            options = [`${shape.lines}`, `${shape.lines + 1}`, `${shape.lines - 1}`, "0"];
            explanation = `A ${shape.name} can be folded exactly in half in ${shape.lines} different ways.`;
            if (shape.type) chart = renderFigure(shape.type);
        } else if (type === "identify_shape") {
            qText = "Which of these shapes has an infinite number of lines of symmetry?";
            correct = "Circle";
            options = ["Circle", "Square", "Rectangle", "Equilateral Triangle"];
            explanation = "Any line passing through the center of a circle is a line of symmetry, so there are infinite such lines.";
            chart = renderFigure('circle');
        } else if (type === "concept_definition") {
            qText = "If a figure can be folded into two identical halves, the fold line is called the:";
            correct = "Line of Symmetry";
            options = ["Line of Symmetry", "Axis of Rotation", "Boundary Line", "Center Line"];
            explanation = "The line that divides a figure into two identical, matching halves is the line of symmetry.";
        } else if (type === "letter_symmetry") {
            const letters = [
                { name: "A", lines: 1 },
                { name: "H", lines: 2 },
                { name: "O", lines: 2 },
                { name: "M", lines: 1 }
            ];
            const letter = letters[randomInt(0, letters.length - 1)];
            qText = `How many lines of symmetry are there in the capital letter '${letter.name}'?`;
            correct = `${letter.lines}`;
            options = ["0", "1", "2", "Infinite"];
            explanation = `The letter '${letter.name}' has ${letter.lines} line(s) of symmetry.`;
        }

        const shuffled = options.sort(() => Math.random() - 0.5);

        const newQuestion = {
            text: qText,
            chart: chart,
            correctAnswer: correct,
            solution: explanation,
            type: 'mcq'
        };

        setCurrentQuestion(newQuestion);
        setShuffledOptions(shuffled);

        setHistory(prev => ({
            ...prev,
            [index]: {
                question: newQuestion,
                options: shuffled,
                selectedOption: null,
                isSubmitted: false,
                isCorrect: false,
                feedbackMessage: ""
            }
        }));
        questionStartTime.current = Date.now();
    };

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
                difficulty_level: 'Easy',
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
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[randomInt(0, CORRECT_MESSAGES.length - 1)]);
        } else {
            setShowExplanationModal(true);
        }

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                selectedOption: selectedOption,
                isSubmitted: true,
                isCorrect: isRight,
                feedbackMessage: isRight ? feedbackMessage : ""
            }
        }));

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
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
            setShowSummaryModal(true);
        }
    };

    const handleFinalContinue = async () => {
        if (sessionId) {
            await api.finishSession(sessionId).catch(console.error);
        }

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
                        timestamp: new Date().toISOString(),
                        time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                });
            } catch (err) {
                console.error("Failed to create report", err);
            }
        }
        clearProgress();
        navigate(-1);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">Line of Symmetry</span>
                </div>
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
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern bg-white rounded-3xl p-6 sm:p-10 shadow-lg" style={{ height: 'auto', minHeight: '100%', paddingLeft: '2rem' }}>
                                    <div className="question-header-modern mb-8 w-full">
                                        <h2 className="text-xl sm:text-2xl font-normal text-[#31326F] text-center w-full break-words">
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="flex flex-col md:flex-row w-full items-center justify-center gap-6 lg:gap-10 mt-4">
                                        {currentQuestion.chart && (
                                            <div className="chart-container flex-1 w-full max-w-xl flex justify-center">
                                                <LatexContent block={true} html={currentQuestion.chart} />
                                            </div>
                                        )}
                                        <div className="interaction-area-modern flex-1 w-full max-sm flex flex-col items-center">
                                            <div className="options-grid-modern flex flex-col gap-3 w-full">
                                                {shuffledOptions.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => !isSubmitted && handleOptionSelect(option)}
                                                        disabled={isSubmitted}
                                                        className={`p-3 rounded-xl border-2 text-base font-normal transition-all transform hover:scale-[1.01] flex items-center justify-center min-h-[48px] w-full
                                                            ${isSubmitted
                                                                ? option === currentQuestion.correctAnswer
                                                                    ? 'bg-green-100 border-green-500 text-green-700'
                                                                    : selectedOption === option
                                                                        ? 'bg-red-100 border-red-500 text-red-700'
                                                                        : 'bg-gray-50 border-gray-200 text-gray-400'
                                                                : selectedOption === option
                                                                    ? 'bg-indigo-50 border-[#4FB7B3] text-[#31326F] shadow-md'
                                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-[#4FB7B3] hover:shadow-sm'
                                                            }
                                                        `}
                                                    >
                                                        <LatexContent html={option} />
                                                    </button>
                                                ))}
                                            </div>
                                            {isSubmitted && isCorrect && (
                                                <motion.div
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="feedback-mini correct mt-6 w-full text-center p-3 rounded-lg font-normal bg-green-100 text-green-700"
                                                >
                                                    {feedbackMessage}
                                                </motion.div>
                                            )}
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
                onNext={() => setShowExplanationModal(false)}
            />

            <PracticeSummaryModal
                isOpen={showSummaryModal}
                timeTaken={formatTime(timeElapsed)}
                correctCount={Object.values(answers).filter(v => v === true).length}
                totalCount={TOTAL_QUESTIONS}
                onContinue={handleFinalContinue}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
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
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (
                                <button
                                    className="bg-[#BFDBFE] text-[#1E40AF] px-6 py-2 rounded-xl border-2 border-[#93C5FD] font-bold hover:bg-[#93C5FD] transition-colors flex items-center gap-2"
                                    onClick={handlePrevious}
                                >
                                    <ChevronLeft size={24} /> PREV
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <X size={20} />
                        </button>
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default IntroductionToSymmetryLineOfSymmetry;