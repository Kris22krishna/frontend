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
    "✨ Fantastic! You're a Digit Wizard! ✨",
    "🌟 Brilliant! You know your numbers! 🌟",
    "🎉 Correct! Spot on! 🎉",
    "✨ Amazing work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const PlayingWithDigits = () => {
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
    const SKILL_ID = 6304; // ID for Number Play - Playing with Digits
    const SKILL_NAME = "Number Play - Playing with Digits";

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

    const getDigitSum = (n) => {
        return n.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    };

    const countDigitOccurrences = (start, end, digit) => {
        let count = 0;
        const dStr = digit.toString();
        for (let i = start; i <= end; i++) {
            count += i.toString().split(dStr).length - 1;
        }
        return count;
    };

    const generateQuestion = (index) => {
        // 8 MCQs, 2 User Inputs
        // Force User Input on specific indices for variety (e.g., 2 and 6)
        const isInputParams = (index === 2 || index === 6);
        const types = ["count_n_digits", "calc_digit_sum", "find_number_by_sum", "digit_sum_pattern", "count_digit_freq"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];
        let uniqueId = "";
        let inputType = isInputParams ? "input" : "mcq";

        const logicDescription = "<strong>Playing with Digits</strong> involves understanding the digits that make up a number and their properties.";

        let attempts = 0;
        do {
            attempts++;

            if (type === "count_n_digits") {
                const digits = randomInt(2, 4);
                let min, max, total;
                if (digits === 2) { min = 10; max = 99; }
                else if (digits === 3) { min = 100; max = 999; }
                else { min = 1000; max = 9999; }

                total = max - min + 1;

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>How many <strong>${digits}-digit</strong> numbers are there in total?</p>
                    </div>
                `;
                correct = total.toString();
                explanation = `The smallest ${digits}-digit number is ${min}.<br/>The largest is ${max}.<br/>Total count = (${max} - ${min}) + 1 = <strong>${total}</strong>.`;
                uniqueId = `count_${digits}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        total.toString(),
                        (total - 1).toString(),
                        (total + 1).toString(),
                        (total / 9).toString() // Just a distractor
                    ];
                }

            } else if (type === "calc_digit_sum") {
                const num = randomInt(500, 9999);
                const sum = getDigitSum(num);

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>Find the sum of the digits of the number:</p>
                        <p class="text-2xl font-bold text-indigo-600">${num}</p>
                    </div>
                `;
                correct = sum.toString();
                const digits = num.toString().split('').join(" + ");
                explanation = `Add all the digits together:<br/>${digits} = <strong>${sum}</strong>.`;
                uniqueId = `sum_${num}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        sum.toString(),
                        (sum + randomInt(1, 3)).toString(),
                        (sum - randomInt(1, 3)).toString(),
                        (getDigitSum(sum)).toString() // recursive sum
                    ];
                }

            } else if (type === "find_number_by_sum") {
                const targetSum = randomInt(5, 12);
                const isLargest = randomInt(0, 1) === 1;
                const digits = randomInt(2, 3);

                // Keep it simple: Smallest/Largest 2 or 3 digit number with sum S
                let answerNum;

                if (isLargest) {
                    if (digits === 2) {
                        // e.g. sum 10 -> 91
                        // Maximize first digit
                        let d1 = Math.min(9, targetSum);
                        let d2 = targetSum - d1;
                        if (d2 < 0) { d1 = 9; d2 = targetSum - 9; } // handle sums > 9
                        answerNum = parseInt(`${d1}${d2}`);
                    } else {
                        // sum 10 -> 910
                        let d1 = Math.min(9, targetSum);
                        let rem = targetSum - d1;
                        let d2 = Math.min(9, rem);
                        let d3 = rem - d2;
                        answerNum = parseInt(`${d1}${d2}${d3}`);
                    }
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>What is the <strong>largest</strong> ${digits}-digit number whose digits add up to <strong>${targetSum}</strong>?</p>
                        </div>
                    `;
                    explanation = `To make the largest number, put the biggest possible digit in the highest place value.<br/>For sum ${targetSum}:<br/>First digit: ${answerNum.toString()[0]}<br/>Second digit: ${answerNum.toString()[1]}...<br/>Number: <strong>${answerNum}</strong>.`;

                } else { // Smallest
                    if (digits === 2) {
                        // e.g. sum 10 -> 19
                        // Minimize first digit (cannot be 0, min 1)
                        // d1 + d2 = S. d2 <= 9. So d1 >= S - 9.
                        let d1 = Math.max(1, targetSum - 9);
                        let d2 = targetSum - d1;
                        answerNum = parseInt(`${d1}${d2}`);
                    } else {
                        // Smallest 3 digit. sum 10 -> 109
                        let d1 = Math.max(1, targetSum - 18);
                        let rem = targetSum - d1;
                        // for remaining 2 digits sum, we want d2 small. d3 <= 9. d2 >= rem - 9.
                        let d2 = Math.max(0, rem - 9);
                        let d3 = rem - d2;
                        answerNum = parseInt(`${d1}${d2}${d3}`);
                    }
                    qText = `
                        <div class='question-container'>
                            <p>${logicDescription}</p>
                            <p>What is the <strong>smallest</strong> ${digits}-digit number whose digits add up to <strong>${targetSum}</strong>?</p>
                        </div>
                    `;
                    explanation = `To make the smallest number, put the smallest possible digit in the highest place value (starts with 1).<br/>Then fill the rest to reach sum ${targetSum}.<br/>Number: <strong>${answerNum}</strong>.`;
                }

                correct = answerNum.toString();
                uniqueId = `minmax_${targetSum}_${isLargest}_${digits}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        correct,
                        (answerNum + 9).toString(),
                        (answerNum - 9).toString(),
                        parseInt(correct.split('').reverse().join('')).toString() // Reverse as distractor
                    ];
                }

            } else if (type === "digit_sum_pattern") {
                // e.g. 19, 28, 37... all have sum 10.
                const sum = randomInt(8, 15);
                // Generate 3 numbers with this sum
                let seq = [];
                for (let i = 1; i <= 3; i++) {
                    // Find a 2 digit number with this sum, make them consecutive increasing
                    // Start variable
                    let d1 = Math.max(1, sum - 9) + i - 1;
                    let d2 = sum - d1;
                    if (d2 >= 0 && d2 <= 9) seq.push(parseInt(`${d1}${d2}`));
                }

                if (seq.length < 3) {
                    // Fallback simple pattern if generation fails
                    seq = [11, 22, 33];
                }

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>Look at the numbers: <strong>${seq.join(", ")}...</strong></p>
                        <p>What property do they all share?</p>
                    </div>
                `;

                const mySum = getDigitSum(seq[0]); // Check actual sum
                correct = `Digit sum is ${mySum}`;
                explanation = `${seq[0]} -> ${seq[0].toString().split('').join('+')} = ${mySum}<br/>${seq[1]} -> ${getDigitSum(seq[1])}<br/>They all have a digit sum of <strong>${mySum}</strong>.`;

                uniqueId = `pattern_${seq.join('_')}`;
                // This type is naturally MCQ or specific input (hard for input). Force MCQ if in logic flow? 
                // Let's support MCQ best.
                inputType = "mcq";

                options = [
                    `Digit sum is ${mySum}`,
                    `Digit sum is ${mySum + 1}`,
                    `They are all odd`,
                    `They are all divisible by 5`
                ];

            } else { // count_digit_freq
                // Count how many times '1' appears from 1 to 20
                const rangeEnd = [20, 30, 50, 100][randomInt(0, 3)];
                const digit = 1; // Simplest to count 1s or random

                const count = countDigitOccurrences(1, rangeEnd, digit);

                qText = `
                    <div class='question-container'>
                        <p>${logicDescription}</p>
                        <p>How many times does the digit <strong>${digit}</strong> appear in the numbers from 1 to ${rangeEnd}?</p>
                    </div>
                `;
                correct = count.toString();
                explanation = `List numbers with ${digit}:<br/>
                               1, 10, 11 (twice), 12, 13, 14, 15, 16, 17, 18, 19...<br/>
                               Count them carefully!<br/>Total occurrences: <strong>${count}</strong>.`;
                uniqueId = `freq_${rangeEnd}_${digit}_${inputType}`;

                if (inputType === "mcq") {
                    options = [
                        correct,
                        (count - 1).toString(),
                        (count + 1).toString(),
                        (Math.floor(rangeEnd / 10)).toString()
                    ];
                }
            }

            if (attempts > 10) uniqueId = `force_${Date.now()}_${Math.random()}`;

        } while (usedQuestions.has(uniqueId));

        setUsedQuestions(prev => new Set(prev).add(uniqueId));

        // Shuffle options if MCQ
        let uniqueOpts = [];
        if (inputType === "mcq") {
            uniqueOpts = [...new Set(options)];
            // Ensure 4 distinct
            if (options.every(o => !isNaN(parseInt(o))) || options[0].includes("Digit sum")) {
                while (uniqueOpts.length < 4) {
                    if (uniqueOpts[0].includes("Digit sum")) {
                        uniqueOpts.push(`Digit sum is ${randomInt(1, 20)}`);
                    } else {
                        const rnd = randomInt(1, 100).toString();
                        if (!uniqueOpts.includes(rnd)) uniqueOpts.push(rnd);
                    }
                    uniqueOpts = [...new Set(uniqueOpts)];
                }
                if (!uniqueOpts[0].includes("Digit")) uniqueOpts.sort((a, b) => parseInt(a) - parseInt(b));
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
            // For "Digit sum is X" type, exact match string
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
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">Playing with Digits</span>
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
                                                    placeholder="Type your answer"
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

export default PlayingWithDigits;
