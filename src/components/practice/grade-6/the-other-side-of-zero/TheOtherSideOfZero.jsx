import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, MoveUp, MoveDown, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import "../../../../pages/juniors/JuniorPracticeSession.css";
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

const TheOtherSideOfZero = () => {
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
    const [section, setSection] = useState('concept'); // 'concept' or 'test'

    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 9202; // Incremented from 9201
    const SKILL_NAME = "The Other Side of Zero: Integers";
    const TOTAL_QUESTIONS = 20;

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

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID)
                .then(sess => sess?.session_id && setSessionId(sess.session_id))
                .catch(console.error);
        }

        const timer = setInterval(() => {
            if (section === 'test' && !showSummaryModal) {
                setTimeElapsed(prev => prev + 1);
            }
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
    }, [section, showSummaryModal]);

    useEffect(() => {
        if (section === 'test') {
            if (history[qIndex]) {
                const data = history[qIndex];
                setCurrentQuestion(data.question);
                setShuffledOptions(data.options);
                setSelectedOption(data.selectedOption || null);
                setIsSubmitted(data.isSubmitted || false);
                setIsCorrect(data.isCorrect || false);
            } else {
                generateQuestion(qIndex);
            }
        }
    }, [qIndex, section]);

    const generateQuestion = (index) => {
        const types = [
            "addition_movement",
            "additive_inverse",
            "comparison",
            "subtraction_movement",
            "mine_model",
            "number_line"
        ];

        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let chart = "";

        if (type === "addition_movement") {
            const start = randomInt(-5, 5);
            const move = randomInt(-5, 5);
            const result = start + move;
            qText = `Starting at floor $${start > 0 ? '+' : ''}${start}$ and moving $${move > 0 ? '+' : ''}${move}$ floors results in:`;
            correct = `${result > 0 ? '+' : ''}${result}`;
            options = [
                `${result > 0 ? '+' : ''}${result}`,
                `${result + 1 > 0 ? '+' : ''}${result + 1}`,
                `${result - 1 > 0 ? '+' : ''}${result - 1}`,
                `${-result > 0 ? '+' : ''}${-result}`
            ];
            explanation = `Start at $${start}$. Moving $${move}$ means adding $${move}$. $${start} + (${move}) = ${result}$.`;
        } else if (type === "additive_inverse") {
            const num = randomInt(-15, 15);
            if (num === 0) return generateQuestion(index);
            qText = `What is the additive inverse of $${num > 0 ? '+' : ''}${num}$?`;
            correct = `${-num > 0 ? '+' : ''}${-num}`;
            options = [
                `${-num > 0 ? '+' : ''}${-num}`,
                `${num > 0 ? '+' : ''}${num}`,
                "0",
                "1"
            ];
            explanation = `The additive inverse of a number is what you add to it to get zero. For $${num}$, it is $${-num}$ because $${num} + (${-num}) = 0$.`;
        } else if (type === "comparison") {
            const a = randomInt(-10, 10);
            const b = randomInt(-10, 10);
            if (a === b) return generateQuestion(index);
            qText = `Which comparison is correct for $${a > 0 ? '+' : ''}${a}$ and $${b > 0 ? '+' : ''}${b}$?`;
            correct = a < b ? `${a} < ${b}` : `${a} > ${b}`;
            options = [
                `${a} < ${b}`,
                `${a} > ${b}`,
                `${a} = ${b}`,
                "None of these"
            ];
            explanation = `On a vertical building model, higher floors are greater. Floor $${Math.max(a, b)}$ is higher than floor $${Math.min(a, b)}$.`;
        } else if (type === "subtraction_movement") {
            const target = randomInt(-5, 5);
            const start = randomInt(-5, 5);
            const move = target - start;
            qText = `To go from floor $${start > 0 ? '+' : ''}${start}$ to floor $${target > 0 ? '+' : ''}${target}$, the movement is:`;
            correct = `${move > 0 ? '+' : ''}${move}`;
            options = [
                `${move > 0 ? '+' : ''}${move}`,
                `${-move > 0 ? '+' : ''}${-move}`,
                `${target + start > 0 ? '+' : ''}${target + start}`,
                "0"
            ];
            explanation = `Movement = Target Floor - Starting Floor. $${target} - (${start}) = ${move}$.`;
        } else if (type === "mine_model") {
            const depth = randomInt(10, 50);
            const change = randomInt(-10, 10);
            qText = `In a mine, an elevator is at level $-${depth}$. It moves $${change > 0 ? 'up' : 'down'}$ by $${Math.abs(change)}$ levels. What is the new level?`;
            const result = -depth + change;
            correct = `${result}`;
            options = [`${result}`, `${-depth - change}`, `${depth + change}`, `${-depth}`];
            explanation = `The elevator starts at $-${depth}$. Moving $${change}$ means adding $${change}$. $-${depth} + (${change}) = ${result}$.`;
        } else if (type === "number_line") {
            const pos = randomInt(-5, 5);
            const dir = randomInt(0, 1) === 0 ? "left" : "right";
            const steps = randomInt(1, 5);
            const result = dir === "left" ? pos - steps : pos + steps;
            qText = `On a number line, starting at $${pos}$ and moving $${steps}$ units to the $${dir}$ lands you on:`;
            correct = `${result}`;
            options = [`${result}`, `${pos}`, `${pos + steps}`, `${pos - steps}`];
            explanation = `Moving right on a number line is addition (+). Moving left is subtraction (-). $${pos} ${dir === 'right' ? '+' : '-'} ${steps} = ${result}$.`;
        }

        const uniqueOptions = Array.from(new Set(options));
        while (uniqueOptions.length < 4) {
            uniqueOptions.push(`${randomInt(-20, 20)}`);
        }
        const shuffled = uniqueOptions.sort(() => Math.random() - 0.5);

        const newQuestion = {
            text: qText,
            chart: chart,
            correctAnswer: correct,
            solution: explanation,
            type: 'mcq',
            options: shuffled
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
                isCorrect: false
            }
        }));
        questionStartTime.current = Date.now();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                selectedOption: selectedOption,
                isSubmitted: true,
                isCorrect: isRight
            }
        }));
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
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
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (section === 'concept') {
        return (
            <div className="junior-practice-page raksha-theme font-sans min-h-screen bg-[#F8FAFC]">
                <header className="junior-practice-header flex justify-between items-center px-4 sm:px-8 py-4 bg-white shadow-sm sticky top-0 z-10">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft className="text-[#31326F]" size={28} />
                    </button>
                    <h1 className="text-xl sm:text-2xl font-black text-[#31326F]">The Other Side of Zero</h1>
                    <div className="w-10"></div>
                </header>

                <main className="max-w-4xl mx-auto p-4 sm:p-8 space-y-12 pb-32">
                    {/* Introduction Section */}
                    <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-b-8 border-[#4FB7B3]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                                <MoveUp size={32} />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#31326F]">1. Understanding Floors</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                                <p>Imagine a building called <strong>Bela's Building of Fun!</strong></p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">+</span>
                                        Floors above ground are <strong>Positive</strong> (+1, +2, +3...)
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold">0</span>
                                        Ground floor is <strong>Zero</strong> (0)
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">−</span>
                                        Floors below ground are <strong>Negative</strong> (−1, −2, −3...)
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-[#E0E7FF]/30 p-6 rounded-3xl border-2 border-dashed border-[#31326F]/20 flex justify-center">
                                <div className="space-y-1 w-24">
                                    {[3, 2, 1, 0, -1, -2, -3].map(f => (
                                        <div key={f} className={`h-10 flex items-center justify-center rounded-lg font-bold border-2 
                                            ${f > 0 ? 'bg-green-50 border-green-200 text-green-700' :
                                                f < 0 ? 'bg-red-50 border-red-200 text-red-700' :
                                                    'bg-white border-gray-300 text-gray-600'}`}>
                                            {f > 0 ? `+${f}` : f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Lift Movement Section */}
                    <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-l-8 border-[#31326F]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                                <ArrowRight size={32} />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-[#31326F]">2. Lift Movement</h2>
                        </div>
                        <p className="text-lg text-gray-700 mb-8">
                            Every button press in the lift is like a mathematical operation!
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-100">
                                <h4 className="font-bold text-[#31326F] mb-2">Example 1</h4>
                                <p>Start at floor <strong>+1</strong>, press <strong>+2</strong> button:</p>
                                <div className="text-xl font-mono mt-2 text-[#31326F] bg-white p-3 rounded-xl border inline-block">
                                    (+1) + (+2) = +3
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-100">
                                <h4 className="font-bold text-[#31326F] mb-2">Example 2</h4>
                                <p>Start at floor <strong>+2</strong>, press <strong>−3</strong> button:</p>
                                <div className="text-xl font-mono mt-2 text-[#31326F] bg-white p-3 rounded-xl border inline-block">
                                    (+2) + (−3) = −1
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Additive Inverse Section */}
                    <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-r-8 border-[#FF6B6B]">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#31326F] mb-6 flex items-center gap-3">
                            <HelpCircle className="text-[#FF6B6B]" size={32} /> 3. Additive Inverse
                        </h2>
                        <div className="bg-[#FFF5F5] p-6 rounded-2xl border-2 border-[#FF6B6B]/20">
                            <p className="text-lg italic text-[#8B0000]">
                                "A number and its inverse always add up to zero!"
                            </p>
                            <div className="mt-4 flex flex-wrap gap-4 text-xl">
                                <span className="px-4 py-2 bg-white rounded-xl shadow-sm border border-[#FF6B6B]/30">(+3) + (−3) = 0</span>
                                <span className="px-4 py-2 bg-white rounded-xl shadow-sm border border-[#FF6B6B]/30">(−7) + (+7) = 0</span>
                            </div>
                        </div>
                    </section>

                    {/* Subtraction Section */}
                    <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-t-8 border-indigo-500">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#31326F] mb-6">4. Finding Movement</h2>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-4">
                                <p className="text-lg text-gray-700">
                                    Subtraction helps us find what button was pressed.
                                </p>
                                <div className="p-6 bg-indigo-50 rounded-2xl border-2 border-indigo-100 font-bold text-indigo-900 text-center">
                                    Target Floor − Starting Floor = Movement
                                </div>
                            </div>
                            <div className="flex-1 bg-gray-50 p-6 rounded-2xl border shadow-inner">
                                <p className="font-bold text-gray-600 mb-2 underline">Calculation:</p>
                                <p>Target: −1 | Start: +3</p>
                                <p className="text-2xl font-mono text-indigo-600 mt-2">(−1) − (+3) = −4</p>
                                <p className="text-sm text-gray-500 mt-2">The person pressed −4 button!</p>
                            </div>
                        </div>
                    </section>

                    {/* Number Line Section */}
                    <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg">
                        <h2 className="text-2xl sm:text-3xl font-black text-[#31326F] mb-6">5. The Number Line</h2>
                        <div className="relative h-24 flex items-center justify-center mb-8 border-y-2 border-gray-100">
                            <div className="absolute w-full h-[2px] bg-gray-800"></div>
                            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(v => (
                                <div key={v} className="flex flex-col items-center flex-1 relative">
                                    <div className="w-[2px] h-4 bg-gray-800 mb-2"></div>
                                    <span className={`text-sm font-bold ${v === 0 ? 'text-black text-lg' : 'text-gray-500'}`}>{v}</span>
                                </div>
                            ))}
                        </div>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            <li className="p-4 bg-green-50 rounded-xl border border-green-200 text-green-800 flex items-center gap-3">
                                <MoveDown className="rotate-[270deg]" /> Moving <strong>Right</strong> is Addition (+)
                            </li>
                            <li className="p-4 bg-red-50 rounded-xl border border-red-200 text-red-800 flex items-center gap-3">
                                <MoveDown className="rotate-90" /> Moving <strong>Left</strong> is Subtraction (−)
                            </li>
                        </ul>
                    </section>
                </main>

                <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg border-t shadow-lg flex justify-center">
                    <button
                        onClick={() => {
                            setSection('test');
                            setQIndex(0);
                            setHistory({});
                            setAnswers({});
                            setTimeElapsed(0);
                        }}
                        className="px-12 py-4 bg-[#31326F] text-white rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                        Take Chapter Test
                    </button>
                </footer>
            </div>
        );
    }

    if (!currentQuestion) return <div className="flex items-center justify-center p-20 text-[#31326F] font-bold">Generating Test...</div>;

    return (
        <div className="junior-practice-page raksha-theme">
            <header className="junior-practice-header">
                <div className="header-left">
                    <span className="chapter-title">The Other Side of Zero: Integers</span>
                </div>
                <div className="header-center">
                    <div className="question-counter">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="timer-display">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                            >
                                <div className="question-card-modern">
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern">
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>

                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-button-modern ${selectedOption === option ? 'selected' : ''}`}
                                                    onClick={() => handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={option} />
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
                            onClick={() => setSection('concept')}
                        >
                            Exit Test
                        </button>
                    </div>

                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button
                                className="nav-pill-next-btn bg-gray-200 text-gray-600"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                            >
                                <ChevronLeft size={28} strokeWidth={3} /> Prev
                            </button>
                            <button
                                className={`nav-pill-next-btn ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => {
                                    handleCheck();
                                    handleNext();
                                }}
                                disabled={!selectedOption}
                            >
                                {qIndex < TOTAL_QUESTIONS - 1 ? (
                                    <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                ) : (
                                    <>Finish <Check size={28} strokeWidth={3} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <button
                        className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                        onClick={() => setSection('concept')}
                    >
                        <X size={20} />
                    </button>

                    <div className="nav-buttons-group ml-auto">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            className="nav-pill-next-btn"
                            onClick={() => {
                                handleCheck();
                                handleNext();
                            }}
                            disabled={!selectedOption}
                        >
                            {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Finish"}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TheOtherSideOfZero;
