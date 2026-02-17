import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing! You cracked the number code! ✨",
    "🌟 Brilliant! You understand the logic perfectly! 🌟",
    "🎉 Correct! You're a number detective! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const NumbersCanTellUsThings = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [history, setHistory] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 6301; // ID for Number Play - Numbers can Tell us Things
    const SKILL_NAME = "Number Play - Numbers can Tell us Things";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});
    const [usedQuestions, setUsedQuestions] = useState(new Set());

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

    const calculateTallerNeighbors = (heights) => {
        const n = heights.length;
        const result = [];
        for (let i = 0; i < n; i++) {
            let count = 0;
            // Check Left
            if (i > 0 && heights[i - 1] > heights[i]) count++;
            // Check Right
            if (i < n - 1 && heights[i + 1] > heights[i]) count++;
            result.push(count);
        }
        return result;
    };

    const generateQuestion = (index) => {
        // 8 MCQs, 2 User Inputs
        // Force User Input on specific indices for variety (e.g., 2 and 6)
        const isInputParams = (index === 2 || index === 6);
        const types = ["calculate_sequence", "interpret_number", "check_validity", "end_child_rule"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";
        let inputType = isInputParams ? "input" : "mcq";

        // Logic Rule: "Each child counts how many immediate neighbors are taller than them."
        const logicDescription = "<strong>Rule:</strong> Each child says a number equal to the number of immediate neighbors (left or right) who are taller than them.";

        let attempts = 0;
        do {
            attempts++;

            if (type === "calculate_sequence") {
                const len = randomInt(4, 6);
                const heights = [];
                for (let i = 0; i < len; i++) heights.push(randomInt(130, 160));

                // Ensure heights are distinct enough for clarity, or handle equals (usually Problem says taller, so equal is not taller)
                const numbers = calculateTallerNeighbors(heights);
                const sequence = numbers.join(", ");

                if (inputType === "input") {
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>Children's heights (in cm):<br/><strong>${heights.join(", ")}</strong></p>
                            <p>What is the sequence of numbers they say? (comma separated, e.g., 1, 0, 2...)</p>
                        </div>
                    `;
                    correct = sequence;
                    explanation = `Let's check each child:<br/>` +
                        heights.map((h, i) => {
                            let neighbors = [];
                            if (i > 0) neighbors.push(`${heights[i - 1]} (L)`);
                            if (i < heights.length - 1) neighbors.push(`${heights[i + 1]} (R)`);
                            return `Child ${i + 1} (${h} cm): Neighbors [${neighbors.join(", ")}]. Taller: <strong>${numbers[i]}</strong>`;
                        }).join("<br/>");
                } else {
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>Children's heights: <strong>${heights.join(", ")}</strong></p>
                            <p>What number does the <strong>Child at position ${randomInt(2, len - 1)}</strong> (height ${heights[randomInt(2, len - 1) - 1]}) say?</p>
                        </div>
                    `;
                    // Let's refine MCQ to ask for the whole sequence or a specific child to fit MCQ options better
                    const targetIdx = randomInt(1, len - 2); // Pick a middle child
                    correct = numbers[targetIdx].toString();

                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>Children's heights: ${heights.map((h, i) => i === targetIdx ? `<strong>${h}</strong>` : h).join(", ")}</p>
                            <p>What number does the highlighted child (height ${heights[targetIdx]}) say?</p>
                        </div>
                    `;

                    options = ["0", "1", "2", "3"]; // Max is 2
                    explanation = `Child with height ${heights[targetIdx]} has neighbors ${heights[targetIdx - 1]} and ${heights[targetIdx + 1]}.<br/>Count taller neighbors: <strong>${correct}</strong>.`;
                }
                uniqueId = `calc_${heights.join('_')}_${inputType}`;

            } else if (type === "interpret_number") {
                // "A child says 2. What does this mean?"
                if (inputType === "input") {
                    // Hard to validate text input interpretation, force calculation for input or simple numeric answer
                    // Convert to calculation type for Input
                    inputType = "mcq"; // Fallback to MCQ for interpretation
                }

                const scenario = randomInt(0, 2);
                if (scenario === 0) { // Says 2
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>A child in the middle of the line says the number <strong>2</strong>.</p>
                            <p>What does this logically mean?</p>
                        </div>
                    `;
                    correct = "Both immediate neighbors are taller.";
                    options = [
                        "Both immediate neighbors are taller.",
                        "Both immediate neighbors are shorter.",
                        "One neighbor is taller, one is shorter.",
                        "The child is the tallest in the line."
                    ];
                    explanation = "To say '2', a child must have 2 taller neighbors. Since a child only has 2 immediate neighbors, both must be taller.";
                } else if (scenario === 1) { // Says 0
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>A child says the number <strong>0</strong>.</p>
                            <p>Which statement is definitely true?</p>
                        </div>
                    `;
                    correct = "No immediate neighbor is taller.";
                    options = [
                        "No immediate neighbor is taller.",
                        "The child is the shortest in the line.",
                        "The child has no neighbors.",
                        "Both neighbors are taller."
                    ];
                    explanation = "Calculating 0 means count of taller neighbors is 0. So, no immediate neighbor is taller (child is a local peak).";
                } else { // End child says 1
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>A child standing at the <strong>end</strong> of the line says <strong>1</strong>.</p>
                            <p>What does this mean?</p>
                        </div>
                    `;
                    correct = "Their only neighbor is taller.";
                    options = [
                        "Their only neighbor is taller.",
                        "Their only neighbor is shorter.",
                        "They have 2 taller neighbors.",
                        "They are the tallest in the line."
                    ];
                    explanation = "An end child has only 1 neighbor. If they say 1, that neighbor must be taller.";
                }
                uniqueId = `interpret_${scenario}`;

            } else if (type === "check_validity") {
                if (inputType === "input") inputType = "mcq"; // Check validity is best for MCQ

                // "Which sequence is valid?" OR "Is this sequence valid?"
                const subType = randomInt(0, 1);

                if (subType === 0) { // End value check
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>Which of these sequences is <strong>IMPOSSIBLE</strong>? (Think about the children at the ends)</p>
                        </div>
                    `;
                    correct = "2, 1, 0, 1";
                    options = ["2, 1, 0, 1", "1, 2, 1, 0", "0, 1, 1, 0", "0, 0, 0, 0"];
                    explanation = "An end child only has 1 neighbor, so they can say at most '1'. They can never say '2'. The sequence '2, 1, 0, 1' starts with 2, which is impossible.";
                } else { // Logic check
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>Consider the sequence: <strong>0, 2, 0</strong>.</p>
                            <p>Is this sequence possible for 3 children?</p>
                        </div>
                    `;
                    correct = "Yes, it is possible."; // e.g., 150, 140, 150 -> Mid(140) has neighbors 150,150(Taller). Ends(150) have/neighbor 140(Shorter). Correct: 0, 2, 0.
                    options = [
                        "Yes, it is possible.",
                        "No, because the middle value cannot be 2.",
                        "No, because the ends cannot be 0.",
                        "No, sum must be even."
                    ];
                    explanation = "Example: Heights 5, 2, 5.<br/>Left(5): Neighbor 2 (Shorter) -> 0.<br/>Mid(2): Neighbors 5, 5 (Taller) -> 2.<br/>Right(5): Neighbor 2 (Shorter) -> 0.<br/>Sequence: 0, 2, 0.";
                }
                uniqueId = `valid_${subType}_${Math.random()}`;

            } else { // end_child_rule
                // Simple factual checks about ends
                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>What is the <strong>maximum</strong> number a child at the <strong>end</strong> of the line can say?</p>
                    </div>
                `;
                correct = "1";
                if (inputType === "mcq") {
                    options = ["1", "2", "0", "Depends on line length"];
                }
                explanation = "An end child has only <strong>one</strong> immediate neighbor. So, the count of taller neighbors can be either 0 or 1.";
                uniqueId = `end_rule_${inputType}`;
            }

            if (attempts > 10) uniqueId = `force_${Date.now()}_${Math.random()}`;

        } while (usedQuestions.has(uniqueId));

        setUsedQuestions(prev => new Set(prev).add(uniqueId));

        // Shuffle options if MCQ
        let uniqueOpts = [];
        if (inputType === "mcq") {
            uniqueOpts = [...new Set(options)];
            // If numeric options, ensure we have 4 distinct
            if (options.every(o => !isNaN(parseInt(o)))) {
                while (uniqueOpts.length < 4) {
                    uniqueOpts.push(randomInt(0, 5).toString());
                    uniqueOpts = [...new Set(uniqueOpts)];
                }
                uniqueOpts.sort((a, b) => parseInt(a) - parseInt(b)); // Sort numeric options often looks better, or shuffle. Let's shuffle.
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
            // Flexible string check (remove spaces, match comma separated)
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
            navigate(-1);
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
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">Numbers can Tell us Things</span>
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
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
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
                                                        className={`p-4 rounded-xl border-2 text-lg font-bold transition-all transform hover:scale-102
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
                                        ) : (
                                            <div className="w-full flex flex-col items-center gap-4">
                                                <input
                                                    type="text"
                                                    value={userInput}
                                                    onChange={(e) => setUserInput(e.target.value)}
                                                    placeholder="Type your answer here..."
                                                    disabled={isSubmitted}
                                                    className={`w-full max-w-md p-4 text-xl text-center font-bold rounded-xl border-2 outline-none transition-all
                                                        ${isSubmitted
                                                            ? isCorrect
                                                                ? 'bg-green-50 border-green-500 text-green-700'
                                                                : 'bg-red-50 border-red-500 text-red-700'
                                                            : 'bg-white border-gray-300 focus:border-[#4FB7B3] focus:shadow-md text-[#31326F]'
                                                        }
                                                    `}
                                                />
                                                {isSubmitted && !isCorrect && (
                                                    <div className="text-gray-500">
                                                        Correct Answer: <strong>{currentQuestion.correctAnswer}</strong>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {isSubmitted && isCorrect && (
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="feedback-mini correct"
                                                style={{ marginTop: '20px' }}
                                            >
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
                            <button
                                className="nav-pill-next-btn"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: '10px', backgroundColor: '#eef2ff', color: '#31326F' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} /> Prev
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={currentQuestion.type === 'mcq' ? !selectedOption : !userInput.trim()}
                                >
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
                            <button
                                className="nav-pill-next-btn"
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
                                <ChevronLeft size={20} strokeWidth={3} />
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={currentQuestion.type === 'mcq' ? !selectedOption : !userInput.trim()}
                                >
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

export default NumbersCanTellUsThings;
