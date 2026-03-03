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
    "✨ Amazing job! You found the shape pattern! ✨",
    "🌟 Brilliant! You're visualizing it perfectly! 🌟",
    "🎉 Correct! You're a geometry star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const PatternsInShapes = () => {
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
    const SKILL_ID = 6203; // ID for Patterns in Shapes
    const SKILL_NAME = "Pattern in Mathematics - Patterns in Shapes";

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
        // 8 MCQs, 2 User Inputs (Medium/Hard)
        // Let's scatter inputs: Q4 and Q8
        const isInputParams = (index === 3 || index === 7);
        const types = ["poly_sides", "stack_triangles", "stack_squares", "rotation_pattern", "growth_pattern"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";
        let inputType = isInputParams ? "input" : "mcq";

        let attempts = 0;
        do {
            attempts++;

            if (type === "poly_sides") {
                // Triangle (3), Square (4), Pentagon (5)...
                const start = randomInt(3, 5);
                const seq = [start, start + 1, start + 2, start + 3];
                const shapes = {
                    3: "Triangle", 4: "Square", 5: "Pentagon", 6: "Hexagon", 7: "Heptagon", 8: "Octagon", 9: "Nonagon", 10: "Decagon"
                };

                if (inputType === "mcq") {
                    qText = `
                        <div class='question-container'>
                            <p>Observe the pattern of shapes based on number of sides:</p>
                            <p><strong>${shapes[seq[0]]}, ${shapes[seq[1]]}, ${shapes[seq[2]]}, ...</strong></p>
                            <p>What is the next shape?</p>
                        </div>
                    `;
                    correct = shapes[seq[3]];
                    options = [shapes[seq[3]], shapes[seq[0]], shapes[seq[3] + 2] || "Circle", "Circle"];
                    explanation = `The number of sides increases by 1 each time: ${seq[0]}, ${seq[1]}, ${seq[2]}, <strong>${seq[3]}</strong>.`;
                } else {
                    qText = `
                        <div class='question-container'>
                            <p>Observe the pattern of shapes based on number of sides:</p>
                            <p><strong>${shapes[seq[0]]}, ${shapes[seq[1]]}, ${shapes[seq[2]]}, ...</strong></p>
                             <p>How many sides does the next shape have?</p>
                        </div>
                    `;
                    correct = seq[3].toString();
                    explanation = `The pattern is: ${seq[0]} sides, ${seq[1]} sides, ${seq[2]} sides. Next is <strong>${seq[3]}</strong> sides.`;
                }
                uniqueId = `poly_${start}_${inputType}`;

            } else if (type === "stack_triangles") {
                // 1, 4, 9, 16 small triangles
                const layers = randomInt(2, 4);
                const total = layers * layers;
                const nextLayers = layers + 1;
                const nextTotal = nextLayers * nextLayers;

                if (inputType === "mcq") {
                    qText = `
                        <div class='question-container'>
                            <p>A pattern of large triangles is made using small triangles.</p>
                            <p>Layer 1: 1 small triangle</p>
                            <p>Layer 2: 4 small triangles</p>
                            <p>Layer ${layers}: ${total} small triangles</p>
                            <p><strong>How many small triangles will be in Layer ${nextLayers}?</strong></p>
                        </div>
                    `;
                    correct = nextTotal.toString();
                    options = [nextTotal.toString(), (total + 2).toString(), (nextTotal + 2).toString(), (nextTotal - 1).toString()];
                    explanation = `The number of small triangles is the square of the number of layers ($n^2$).<br/>For Layer ${nextLayers}: ${nextLayers} $\\times$ ${nextLayers} = <strong>${correct}</strong>.`;
                } else {
                    qText = `
                        <div class='question-container'>
                            <p>A pattern of large triangles is made using small triangles.</p>
                            <p>Layer 1: 1 small triangle</p>
                            <p>Layer 2: 4 small triangles</p>
                            <p>Layer ${layers}: ${total} small triangles</p>
                            <p><strong>How many small triangles will be in Layer ${nextLayers}?</strong></p>
                        </div>
                    `;
                    correct = nextTotal.toString();
                    explanation = `The number of small triangles follows square numbers ($n^2$).<br/>Layer ${nextLayers} has ${nextLayers}$^2$ = <strong>${correct}</strong>.`;
                }
                uniqueId = `stack_tri_${layers}_${inputType}`;

            } else if (type === "stack_squares") {
                // Tower of squares: 1, 3, 6, 10... (Sum of natural numbers / Triangular pattern for stack height?) 
                // Or simple row add: 1, 2, 3..
                // Let's do pyramid of squares: Row 1 has 1, Row 2 has 2... Total = n(n+1)/2
                const rows = randomInt(3, 5);
                const total = (rows * (rows + 1)) / 2;
                const nextRows = rows + 1;
                const nextTotal = (nextRows * (nextRows + 1)) / 2;

                qText = `
                    <div class='question-container'>
                        <p>Squares are stacked in a pyramid pattern.</p>
                        <p>Row 1 (top): 1 square</p>
                        <p>Row 2: 2 squares</p>
                        <p>...</p>
                        <p>Row ${rows}: ${rows} squares</p>
                        <p><strong>What is the TOTAL number of squares in a pyramid with ${nextRows} rows?</strong></p>
                    </div>
                 `;
                correct = nextTotal.toString();
                if (inputType === "mcq") {
                    options = [nextTotal.toString(), (total + rows).toString(), (nextTotal * 2).toString(), (nextTotal - 3).toString()];
                }
                explanation = `This follows the triangular number pattern (sum of 1 to $n$).<br/>Sum for ${nextRows} rows = $1 + 2 + ... + ${nextRows} = ${nextTotal}$.`;
                uniqueId = `stack_sq_${rows}_${inputType}`; // This was missing in logic branch, fixed now.

            } else if (type === "rotation_pattern") {
                // Arrow pointing Up, Right, Down, ...
                const dirs = ["Up", "Right", "Down", "Left"];
                const startIdx = randomInt(0, 3);

                qText = `
                    <div class='question-container'>
                        <p>An arrow rotates 90° clockwise in each step.</p>
                        <p>Step 1: Arrow points <strong>${dirs[startIdx]}</strong></p>
                        <p>Step 2: Arrow points <strong>${dirs[(startIdx + 1) % 4]}</strong></p>
                        <p><strong>Which direction will it point in Step 3?</strong></p>
                    </div>
                 `;
                correct = dirs[(startIdx + 2) % 4];

                if (inputType === "mcq") {
                    options = ["Up", "Right", "Down", "Left"];
                } else {
                    // For rotation, input is tricky, lets force MCQ for rotation or simplified text
                    inputType = "mcq"; // Override
                    options = ["Up", "Right", "Down", "Left"];
                }
                explanation = `The pattern is clockwise rotation.<br/>${dirs[startIdx]} -> ${dirs[(startIdx + 1) % 4]} -> <strong>${correct}</strong>.`;
                uniqueId = `rot_${startIdx}`;

            } else {
                // Growth pattern (matchsticks)
                // Shape 1: 4 (Square)
                // Shape 2: 7 (2 Squares)
                // Shape 3: 10 (3 Squares)
                const n = randomInt(3, 5);
                const val = 3 * n + 1;

                qText = `
                    <div class='question-container'>
                        <p>Matchsticks are used to make a chain of linked squares.</p>
                        <p>1 Square uses 4 matchsticks.</p>
                        <p>2 Squares use 7 matchsticks.</p>
                        <p>3 Squares use 10 matchsticks.</p>
                        <p><strong>How many matchsticks for ${n} Squares?</strong></p>
                    </div>
                `;
                correct = val.toString();
                if (inputType === "mcq") {
                    options = [val.toString(), (val - 1).toString(), (val + 3).toString(), (4 * n).toString()];
                }
                explanation = `The rule is $3n + 1$.<br/>For $n=${n}$: $3(${n}) + 1 = ${val}$.`;
                uniqueId = `growth_${n}_${inputType}`;
            }

            if (attempts > 10) uniqueId = `force_${Date.now()}_${Math.random()}`;

        } while (usedQuestions.has(uniqueId));

        setUsedQuestions(prev => new Set(prev).add(uniqueId));

        // Shuffle options if MCQ
        let uniqueOpts = [];
        if (inputType === "mcq") {
            uniqueOpts = [...new Set(options)];
            while (uniqueOpts.length < 4) {
                uniqueOpts.push((Math.floor(Math.random() * 100)).toString());
                uniqueOpts = [...new Set(uniqueOpts)];
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
        let answer = "";

        if (currentQuestion.type === "mcq") {
            isRight = selectedOption === currentQuestion.correctAnswer;
            answer = selectedOption;
        } else {
            // Flexible string check
            const userClean = userInput.trim().toLowerCase();
            const correctClean = currentQuestion.correctAnswer.toLowerCase();
            isRight = userClean === correctClean;
            answer = userInput;
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

        recordQuestionAttempt(currentQuestion, answer, isRight);
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
                    <span className="chapter-title">Patterns in Mathematics: {SKILL_NAME.split(' - ')[1]}</span>
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
                                            >
                                                <img src={mascotImg} alt="Mascot" className="mascot-feedback" />
                                                <div className="feedback-content">
                                                    {feedbackMessage}
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

export default PatternsInShapes;
