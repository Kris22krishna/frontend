import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import "../../../../pages/juniors/JuniorPracticeSession.css";

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Fantastic! You're a Pattern Pro! ✨",
    "🌟 Brilliant! You see how it grows! 🌟",
    "🎉 Correct! Keep climbing! 🎉",
    "✨ Amazing work! ✨",
    "🚀 Super! You're unstoppable! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const GrowingPatterns = () => {
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
    const [userInput, setUserInput] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Logging states
    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 6303; // ID for Number Play - Growing Patterns
    const SKILL_NAME = "Number Play - Growing Patterns";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));
    const [usedQuestions, setUsedQuestions] = useState(new Set());

    useEffect(() => {
        if (qIndex !== undefined && history && answers) {
            sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
            sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
            sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
            sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
            if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
        }
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
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
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
            setSelectedOption(data.selectedOption);
            setUserInput(data.userInput || "");
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else if (!answers[qIndex]) {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        // 8 MCQs, 2 User Inputs
        // Force User Input on specific indices for variety (e.g., 3 and 7)
        const isInputParams = (index === 3 || index === 7);
        const types = ["count_added", "next_number", "identify_rule", "nth_term", "compare_growth"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";
        let inputType = isInputParams ? "input" : "mcq";

        const logicDescription = "<strong>Growing Patterns</strong> change by a rule. Numbers or shapes increase (or decrease) in a predictable way.";

        let attempts = 0;
        do {
            attempts++;

            if (type === "count_added") {
                // Visual block pattern: Step 1 (1 block), Step 2 (3 blocks), Step 3 (5 blocks) -> Adding 2
                // Or basic arithmetic: 5, 10, 15
                const start = randomInt(1, 5);
                const add = randomInt(2, 5);
                const steps = [start, start + add, start + (add * 2)];

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>Look at this pattern:</p>
                        <p class="text-xl tracking-widest text-indigo-600">${steps.join(" → ")} → ...</p>
                        <p>How many blocks/numbers are <strong>added</strong> at each step?</p>
                    </div>
                `;
                correct = add.toString();
                explanation = `${steps[1]} - ${steps[0]} = ${add}.<br/>${steps[2]} - ${steps[1]} = ${add}.<br/>The pattern grows by adding <strong>${add}</strong> each time.`;
                uniqueId = `added_${start}_${add}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        add.toString(),
                        (add + 1).toString(),
                        (add - 1).toString(),
                        (add * 2).toString()
                    ];
                }

            } else if (type === "next_number") {
                const start = randomInt(2, 10);
                const mult = randomInt(1, 1); // Only linear for simple growing, or geometric? Let's do linear simple first.
                // Let's do triangular numbers or simple steps.
                // Pattern: +2, +3, +4...
                const subType = randomInt(0, 1);

                if (subType === 0) { // +k, +k...
                    const step = randomInt(3, 8);
                    const seq = [start, start + step, start + (2 * step), start + (3 * step)];
                    const next = start + (4 * step);
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>What comes next in this pattern?</p>
                            <p class="text-2xl tracking-widest text-[#4FB7B3]">${seq.join(", ")} ...</p>
                        </div>
                    `;
                    correct = next.toString();
                    explanation = `The rule is to add ${step}.<br/>${seq[3]} + ${step} = <strong>${next}</strong>.`;
                    uniqueId = `next_linear_${start}_${step}_${inputType}`;
                } else { // +2, +3, +4
                    const seq = [start];
                    let current = start;
                    for (let i = 1; i <= 3; i++) {
                        current += (i + 1); // +2, then +3...
                        seq.push(current);
                    }
                    const nextAddition = 5;
                    const next = current + nextAddition; // +5

                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>What comes next in this pattern?</p>
                            <p class="text-2xl tracking-widest text-[#4FB7B3]">${seq.join(", ")} ...</p>
                        </div>
                    `;
                    correct = next.toString();
                    explanation = `Difference increases by 1 each time (+2, +3, +4).<br/>Next calculate ${seq[3]} + 5 = <strong>${next}</strong>.`;
                    uniqueId = `next_growing_${start}_${inputType}`;
                }

                if (inputType === "mcq") {
                    options = [
                        correct,
                        (parseInt(correct) - 2).toString(),
                        (parseInt(correct) + 2).toString(),
                        (parseInt(correct) + 10).toString()
                    ];
                }

            } else if (type === "identify_rule") {
                // "What is the rule?"
                if (inputType === "input") inputType = "mcq"; // Rules are hard to type exactly

                const start = randomInt(5, 20);
                const step = randomInt(2, 6);
                const seq = [start, start + step, start + 2 * step, start + 3 * step];

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>Pattern: <strong>${seq.join(", ")}...</strong></p>
                        <p>What is the rule for this pattern?</p>
                    </div>
                `;
                correct = `Add ${step}`;
                options = [
                    `Add ${step}`,
                    `Add ${step + 1}`,
                    `Multiply by 2`,
                    `Subtract ${step}`
                ];
                explanation = `Each term increases by ${step}:<br/>${seq[1]} = ${seq[0]} + ${step}<br/>${seq[2]} = ${seq[1]} + ${step}`;
                uniqueId = `rule_${start}_${step}`;

            } else if (type === "nth_term") {
                // "How many dots at Step 10?"
                const step = randomInt(2, 5);
                const start = step; // simple table: 1->s, 2->2s
                const targetStep = 10;

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>Pattern: Step 1 has ${start} dots. Step 2 has ${start * 2}. Step 3 has ${start * 3}.</p>
                        <p>How many dots will be at <strong>Step 10</strong>?</p>
                    </div>
                `;
                correct = (start * 10).toString();
                explanation = `The rule matches the multiplication table of ${start}.<br/>Step 10 = 10 × ${start} = <strong>${correct}</strong>.`;
                uniqueId = `nth_${step}_${targetStep}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        correct,
                        (start * 9).toString(),
                        (start * 11).toString(),
                        (start + 10).toString()
                    ];
                }

            } else { // compare_growth
                const stepA = 2;
                const stepB = 5;

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p><strong>Pattern A:</strong> Starts at 0, adds ${stepA} each time.</p>
                        <p><strong>Pattern B:</strong> Starts at 0, adds ${stepB} each time.</p>
                        <p>Which pattern grows faster?</p>
                    </div>
                `;
                correct = "Pattern B";
                options = ["Pattern A", "Pattern B", "Both imply same growth", "Cannot tell"];
                explanation = `Pattern B adds ${stepB} each step, while Pattern A adds only ${stepA}.<br/>Since ${stepB} > ${stepA}, <strong>Pattern B</strong> grows faster.`;
                uniqueId = `compare_${stepA}_${stepB}_${inputType}`;
            }

            if (attempts > 10) uniqueId = `force_${Date.now()}_${Math.random()}`;

        } while (usedQuestions.has(uniqueId));

        setUsedQuestions(prev => new Set(prev).add(uniqueId));

        // Shuffle options if MCQ
        let uniqueOpts = [];
        if (inputType === "mcq") {
            uniqueOpts = [...new Set(options)];
            // Ensure 4 distinct
            if (options.every(o => !isNaN(parseInt(o)))) {
                while (uniqueOpts.length < 4) {
                    const rnd = randomInt(1, 100).toString();
                    if (!uniqueOpts.includes(rnd)) uniqueOpts.push(rnd);
                    uniqueOpts = [...new Set(uniqueOpts)];
                }
                uniqueOpts.sort((a, b) => parseInt(a) - parseInt(b));
            }
            setShuffledOptions([...uniqueOpts].sort(() => Math.random() - 0.5));
        }

        const newQuestion = {
            text: qText,
            correctAnswer: correct,
            solution: explanation,
            type: inputType,
            options: uniqueOpts
        };

        setCurrentQuestion(newQuestion);
        setSelectedOption(null);
        setUserInput("");
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
        questionStartTime.current = Date.now();

        setHistory(prev => ({
            ...prev,
            [index]: {
                question: newQuestion,
                options: uniqueOpts,
                selectedOption: null,
                userInput: "",
                isSubmitted: false,
                isCorrect: false,
                feedbackMessage: ""
            }
        }));
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
                difficulty_level: 'Medium',
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
        if (currentQuestion.type === "mcq" && !selectedOption) return;
        if (currentQuestion.type === "input" && !userInput.trim()) return;

        let isRight = false;

        if (currentQuestion.type === "mcq") {
            isRight = selectedOption === currentQuestion.correctAnswer;
        } else {
            const userClean = userInput.replace(/\s+/g, '').toLowerCase();
            const correctClean = currentQuestion.correctAnswer.replace(/\s+/g, '').toLowerCase();
            isRight = userClean === correctClean;
        }

        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        const feedbackMsg = isRight ? CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)] : "";

        if (isRight) {
            setFeedbackMessage(feedbackMsg);
        } else {
            setShowExplanationModal(true);
        }

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                selectedOption: selectedOption,
                userInput: userInput,
                isSubmitted: true,
                isCorrect: isRight,
                feedbackMessage: feedbackMsg
            }
        }));

        recordQuestionAttempt(currentQuestion, currentQuestion.type === "mcq" ? selectedOption : userInput, isRight);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null);
            setUserInput("");
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
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
            clearProgress(); navigate(-1);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header">
                <div className="header-left">
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Number Play: Growing Patterns</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md flex items-center gap-2">
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
                                <div className="question-card-modern">
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern">
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>

                                    <div className="interaction-area-modern">
                                        {currentQuestion.type === 'mcq' ? (
                                            <div className="options-grid-modern">
                                                {shuffledOptions.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => !isSubmitted && handleOptionSelect(option)}
                                                        disabled={isSubmitted}
                                                        className={`option-button-modern ${isSubmitted
                                                            ? option === currentQuestion.correctAnswer
                                                                ? 'correct'
                                                                : selectedOption === option
                                                                    ? 'wrong'
                                                                    : 'disabled'
                                                            : selectedOption === option
                                                                ? 'selected'
                                                                : ''
                                                            }`}
                                                    >
                                                        <LatexContent html={option} />
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="input-container-modern max-w-sm mx-auto">
                                                <input
                                                    type="text"
                                                    value={userInput}
                                                    onChange={(e) => {
                                                        if (!isSubmitted) setUserInput(e.target.value);
                                                    }}
                                                    disabled={isSubmitted}
                                                    className={`input-field-modern ${isSubmitted ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                                                    placeholder="Type your answer"
                                                    onKeyDown={(e) => e.key === 'Enter' && userInput.trim() && !isSubmitted && handleCheck()}
                                                />
                                            </div>
                                        )}

                                        {isSubmitted && isCorrect && (
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="feedback-mini correct"
                                                style={{ marginTop: '24px' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" />
                                                    <span>{feedbackMessage}</span>
                                                </div>
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
                        <button
                            className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                clearProgress(); navigate(-1);
                            }}
                        >
                            Exit
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
                            <button
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: "10px" }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>DONE <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={currentQuestion.type === 'mcq' ? !selectedOption : !userInput.trim()}
                                >
                                    SUBMIT <Check size={24} strokeWidth={3} />
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
                                clearProgress(); navigate(-1);
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
                            <button
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{
                                    opacity: qIndex === 0 ? 0.5 : 1,
                                    padding: '8px 12px',
                                    marginRight: '8px',
                                    backgroundColor: '#eef2ff',
                                    color: '#31326F',
                                    minWidth: 'auto'
                                }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "DONE"}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={currentQuestion.type === 'mcq' ? !selectedOption : !userInput.trim()}
                                >SUBMIT</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GrowingPatterns;
