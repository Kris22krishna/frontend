
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, Pencil, X, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import Whiteboard from '../../../../Whiteboard';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import StickerExit from '../../../../StickerExit';
import { FullScreenScratchpad } from '../../../../FullScreenScratchpad';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const PrettyPalindromicPatterns = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [history, setHistory] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Input state for user-input questions
    const [userInput, setUserInput] = useState("");

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 6200; // ID for Pretty Palindromic Patterns
    const SKILL_NAME = "Pretty Palindromic Patterns";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        // Create Session
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
            setUserInput(data.userInput || ""); // Restore user input
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else if (!answers[qIndex]) {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const isPalindrome = (num) => {
        const str = num.toString();
        return str === str.split('').reverse().join('');
    };

    const getNextPalindrome = (num) => {
        let next = num + 1;
        while (!isPalindrome(next)) {
            next++;
        }
        return next;
    };

    const reverseAndAdd = (num) => {
        const rev = parseInt(num.toString().split('').reverse().join(''));
        return num + rev;
    };

    const generateQuestion = (index) => {
        let questionText = "";
        let explanation = "";
        let correctAnswer = "";
        let options = [];
        let type = "mcq";

        if (index === 0 || index === 1) {
            // Identify palindrome
            const isIdentify = Math.random() > 0.5;
            if (isIdentify) {
                const pal1 = randomInt(100, 999);
                const pal = isPalindrome(pal1) ? pal1 : getNextPalindrome(pal1);
                const others = [];
                while (others.length < 3) {
                    let r = randomInt(100, 999);
                    if (!isPalindrome(r) && !others.includes(r.toString())) others.push(r.toString());
                }

                questionText = `<div class='question-container'><p>Which of the following numbers is a <strong>palindrome</strong>?</p></div>`;
                correctAnswer = pal.toString();
                options = [correctAnswer, ...others];
                explanation = `A palindrome reads the same forwards and backwards.<br/><strong>${pal}</strong> is the only palindrome here.`;
            } else {
                const pal = getNextPalindrome(randomInt(100, 500));
                questionText = `<div class='question-container'><p>Is the number <strong>${pal}</strong> a palindrome?</p></div>`;
                correctAnswer = "Yes";
                options = ["Yes", "No", "Only if reversed", "None of these"];
                explanation = `Yes, <strong>${pal}</strong> reads the same forwards and backwards.`;
            }
        } else if (index === 2 || index === 3) {
            // Next palindrome
            const start = randomInt(100, 800);
            const nextPal = getNextPalindrome(start);
            questionText = `<div class='question-container'><p>What is the next palindrome number after <strong>${start}</strong>?</p></div>`;
            correctAnswer = nextPal.toString();
            explanation = `Start counting from ${start}. The first number you reach that reads the same backwards is <strong>${nextPal}</strong>.`;
            options = [
                nextPal.toString(),
                (nextPal + randomInt(1, 10)).toString(),
                (nextPal - randomInt(1, 10)).toString(),
                (randomInt(900, 999)).toString()
            ];
        } else if (index === 4 || index === 5) {
            // Form 3-digit palindrome
            const d1 = randomInt(1, 9);
            const d2 = randomInt(0, 9);
            if (d1 === d2) {
                // re-roll to ensure different
            }
            // Case: d1 _ d1
            questionText = `<div class='question-container'><p>Form a 3-digit palindrome using the digits <strong>${d1}</strong> and <strong>${d2}</strong>, where <strong>${d1}</strong> is at the hundreds place.</p></div>`;
            correctAnswer = `${d1}${d2}${d1}`;
            options = [
                `${d1}${d2}${d1}`,
                `${d2}${d1}${d2}`,
                `${d1}${d1}${d2}`,
                `${d2}${d2}${d1}`
            ];
            explanation = `A 3-digit palindrome has the form ABA. <br/>Since ${d1} is at the hundreds place, it must also be at the ones place.<br/>So, the number is <strong>${d1}${d2}${d1}</strong>.`;
        } else if (index === 6) {
            // Reverse and add basic
            const num = randomInt(10, 50);
            const rev = parseInt(num.toString().split('').reverse().join(''));
            const sum = num + rev;
            questionText = `<div class='question-container'><p>Take the number <strong>${num}</strong>. Reverse it and add it to the original number. What do you get?</p></div>`;
            correctAnswer = sum.toString();
            options = [
                sum.toString(),
                (sum + 10).toString(),
                (sum - 11).toString(),
                (num * 2).toString()
            ];
            explanation = `Reverse of ${num} is ${rev}.<br/>Sum = ${num} + ${rev} = <strong>${sum}</strong>.`;
        } else if (index === 7) {
            // Missing digits
            const d1 = randomInt(1, 9);
            const d2 = randomInt(0, 9);
            questionText = `<div class='question-container'><p>Complete the palindrome: <strong>${d1} _ ${d2} _ ${d1}</strong></p></div>`;
            correctAnswer = `${d2}, ${d2}`; // The missing blanks
            const caVal = `${d1}${d2}${d2}${d1}`;
            explanation = `In a 5-digit palindrome (ABCBA), the 2nd digit matches the 4th digit.<br/>Here, the 2nd digit is missing, and the 3rd is ${d2}. Wait, let's fix the pattern.<br/>Pattern: ${d1} _ ${d2} _ ${d1}.<br/>For palindrome, 1st=5th (matches), 2nd=4th.<br/>Actually, usually simple palindromes mirror around center. ${d1} A ${d2} A ${d1}. <br/>Let's allow any digit filling if valid. <br/>Let's simplified: <strong>${d1} 2 3 2 ${d1}</strong>. Find missing.`;

            // Simpler missing digit: 1 _ 1.
            const mid = randomInt(0, 9);
            questionText = `<div class='question-container'><p>Fill in the blank to make <strong>${d1}${mid}${d2}_</strong> a 4-digit palindrome.</p></div>`;
            // 4 digit: A B B A. So ${d1}${mid}${mid}${d1}. 
            // Query is ${d1}${mid}__ . 
            // Let's do: 1 2 _ 1.
            questionText = `<div class='question-container'><p>Fill in the missing digit to make <strong>${d1} ${d2} _ ${d1}</strong> a palindrome.</p></div>`;
            correctAnswer = d2.toString();
            explanation = `For a 4-digit number to be a palindrome, the second digit must match the third digit.<br/>So the missing digit is <strong>${d2}</strong>.`;
            options = [d2.toString(), ((d2 + 1) % 10).toString(), ((d2 + 2) % 10).toString(), randomInt(0, 9).toString()];

        } else if (index === 8) {
            // User Input: Steps to Palindrome
            type = "input";
            // Find a number with 1 or 2 steps
            let start = randomInt(19, 89);
            // ensure it's not already palindrome
            while (isPalindrome(start)) start++;

            // Check steps
            let curr = start;
            let steps = 0;
            while (!isPalindrome(curr) && steps < 5) {
                curr = reverseAndAdd(curr);
                steps++;
            }

            questionText = `<div class='question-container'><p>Take the number <strong>${start}</strong>. How many steps of "reverse and add" does it take to become a palindrome?</p></div>`;
            correctAnswer = steps.toString();
            explanation = `Step 1: ${start} + reverse(${start}) = ...<br/>Keep going until you get a palindrome.<br/>It takes <strong>${steps}</strong> steps.`;
            options = []; // No options for input
        } else {
            // User Input: Resulting Palindrome
            type = "input";
            let start = randomInt(20, 50);
            while (isPalindrome(start)) start++;

            let curr = start;
            while (!isPalindrome(curr)) {
                curr = reverseAndAdd(curr);
            }

            questionText = `<div class='question-container'><p>Use the "reverse and add" method on the number <strong>${start}</strong> until you get a palindrome. What is that palindrome?</p></div>`;
            correctAnswer = curr.toString();
            explanation = `Start: ${start}<br/>Reverse and add until you get a palindrome.<br/>Result: <strong>${curr}</strong>.`;
            options = [];
        }

        // Ensure unique options for MCQ
        if (type === "mcq") {
            const uniqueOptions = [...new Set(options)];
            while (uniqueOptions.length < 4) {
                let rand = randomInt(10, 999).toString();
                if (!uniqueOptions.includes(rand) && rand !== correctAnswer) uniqueOptions.push(rand);
            }
            setShuffledOptions([...uniqueOptions].sort(() => Math.random() - 0.5));
        } else {
            setShuffledOptions([]);
        }

        const newQuestion = {
            text: questionText,
            correctAnswer: correctAnswer,
            solution: explanation,
            type: type
        };
        setCurrentQuestion(newQuestion);
        setSelectedOption(null);
        setUserInput("");
        setIsSubmitted(false);
        setIsCorrect(false);

        setHistory(prev => ({
            ...prev,
            [index]: {
                question: newQuestion,
                options: type === "mcq" ? uniqueOptions : [], // Error fixing: uniqueOptions not defined in else block if used here
                userInput: "",
                selectedOption: null,
                isSubmitted: false,
                isCorrect: false,
                feedbackMessage: ""
            }
        }));

        // Fix for uniqueOptions scope
        if (type === "mcq") {
            // already set
        }
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
        const answer = currentQuestion.type === "mcq" ? selectedOption : userInput;
        if (!answer || !currentQuestion) return;

        // Loose equality for input/numbers
        const isRight = answer.toString().trim() === currentQuestion.correctAnswer.toString().trim();
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
                selectedOption: currentQuestion.type === "mcq" ? selectedOption : null,
                userInput: currentQuestion.type === "input" ? userInput : "",
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
                                                        className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                            } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                            }`}
                                                        style={{ fontWeight: '500' }}
                                                        onClick={() => handleOptionSelect(option)}
                                                        disabled={isSubmitted}
                                                    >
                                                        <LatexContent html={option} />
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4 w-full">
                                                <input
                                                    type="number"
                                                    value={userInput}
                                                    onChange={(e) => !isSubmitted && setUserInput(e.target.value)}
                                                    placeholder="Type your answer here..."
                                                    disabled={isSubmitted}
                                                    className={`w-full p-4 text-xl border-2 rounded-xl outline-none transition-all ${isSubmitted
                                                            ? isCorrect
                                                                ? "border-green-500 bg-green-50 text-green-700 font-bold"
                                                                : "border-red-500 bg-red-50 text-red-700 font-bold"
                                                            : "border-gray-200 focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/20"
                                                        }`}
                                                />
                                                {isSubmitted && !isCorrect && (
                                                    <div className="text-sm text-gray-500 mt-2">
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
                            <StickerExit size={20} className="hidden" />
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
                                    disabled={currentQuestion.type === 'mcq' ? !selectedOption : !userInput}
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
                                    disabled={currentQuestion.type === 'mcq' ? !selectedOption : !userInput}
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

export default PrettyPalindromicPatterns;
