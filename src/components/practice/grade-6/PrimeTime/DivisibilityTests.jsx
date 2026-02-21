import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, LayoutGrid, RefreshCw, HelpCircle, Split } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Perfect! You know your rules! ✨",
    "🌟 Brilliant! Smooth division! 🌟",
    "🎉 Correct! No remainder here! 🎉",
    "✨ Fantastic! Divisibility master! ✨",
    "🚀 Super! Spot on! 🚀",
    "🌈 Awesome! You got it right! 🌈",
    "🎊 Great job! 🎊",
    "💎 Absolute genius! 💎"
];

// Helper to check divisibility
const checkDivisibility = (n, d) => n % d === 0;

const DivisibilityTests = () => {
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

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1071; // New skill ID for Divisibility Tests
    const SKILL_NAME = "Divisibility Tests";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

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
            setIsSubmitted(data.isSubmitted);
            setIsCorrect(data.isCorrect);
            setFeedbackMessage(data.feedbackMessage || "");
        } else if (!answers[qIndex]) {
            generateQuestion(qIndex);
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        const types = ["check_divisibility", "find_divisor", "find_digit", "rule_knowledge"];
        const type = types[index % types.length];

        const rules = [2, 3, 4, 5, 6, 8, 9, 10, 11];
        const rule = rules[Math.floor(Math.random() * rules.length)];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];

        if (type === "check_divisibility") {
            const isDivisible = Math.random() > 0.5;
            let n;
            if (isDivisible) {
                n = randomInt(10, 500) * rule;
            } else {
                n = (randomInt(10, 500) * rule) + randomInt(1, rule - 1);
            }

            if ([4, 8, 11].includes(rule) && n < 100) n += 1000;

            qText = `Is <strong>${n}</strong> divisible by <strong>${rule}</strong>?`;
            correct = isDivisible ? "Yes" : "No";

            const reason = isDivisible ? "Yes" : "No";
            options = [
                `${reason}, it satisfies the rule for ${rule}`,
                `${reason === "Yes" ? "No" : "Yes"}, calculations mistake`,
                `${reason === "Yes" ? "No" : "Yes"}, it does not satisfy the rule`,
                `Cannot determine without calculator`
            ];
            correct = options[0];

            if (rule === 2) explanation = `A number is divisible by 2 if its last digit is even (0, 2, 4, 6, 8).<br/>Last digit of ${n} is ${n % 10}.`;
            else if (rule === 3) explanation = `A number is divisible by 3 if the sum of its digits is divisible by 3.<br/>Sum of digits of ${n} is ${String(n).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0)}.`;
            else if (rule === 4) explanation = `A number is divisible by 4 if the number formed by its last two digits is divisible by 4.<br/>Last two digits: ${n % 100}.`;
            else if (rule === 5) explanation = `A number is divisible by 5 if it ends in 0 or 5.<br/>Last digit: ${n % 10}.`;
            else if (rule === 6) explanation = `A number is divisible by 6 if it is divisible by BOTH 2 and 3.`;
            else if (rule === 8) explanation = `A number is divisible by 8 if the number formed by its last three digits is divisible by 8.<br/>Last three digits: ${n % 1000}.`;
            else if (rule === 9) explanation = `A number is divisible by 9 if the sum of its digits is divisible by 9.<br/>Sum of digits: ${String(n).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0)}.`;
            else if (rule === 10) explanation = `A number is divisible by 10 if it ends in 0.<br/>Last digit: ${n % 10}.`;
            else if (rule === 11) {
                const s = String(n);
                let oddSum = 0, evenSum = 0;
                for (let i = 0; i < s.length; i++) {
                    if ((i + 1) % 2 !== 0) oddSum += parseInt(s[i]);
                    else evenSum += parseInt(s[i]);
                }
                const diff = Math.abs(oddSum - evenSum);
                explanation = `Checking divisibility by 11:<br/>Sum of odd place digits: ${oddSum}<br/>Sum of even place digits: ${evenSum}<br/>Difference: ${diff}.<br/>Is difference divisible by 11? ${diff % 11 === 0 ? 'Yes' : 'No'}.`;
            }

            explanation += `<br/><strong>Answer: ${correct}</strong>`;

        } else if (type === "find_divisor") {
            const n = randomInt(100, 999);
            const validDivisors = rules.filter(r => n % r === 0);

            if (validDivisors.length > 0) {
                correct = validDivisors[0].toString();
                qText = `Which of these numbers divides <strong>${n}</strong> exactly?`;

                const invalidDivisors = rules.filter(r => n % r !== 0 && r !== validDivisors[0]);
                options = [correct];
                for (let k = 0; k < 3; k++) {
                    if (k < invalidDivisors.length) options.push(invalidDivisors[k].toString());
                    else options.push((randomInt(13, 20)).toString());
                }

                explanation = `Let's check the rules for ${n}:<br/>` +
                    `Is it divisible by ${correct}? Yes.<br/>` +
                    (invalidDivisors.length > 0 ? `It is NOT divisible by ${invalidDivisors.slice(0, 3).join(", ")}.` : "");
            } else {
                qText = `Is <strong>${n}</strong> divisible by 2?`;
                correct = n % 2 === 0 ? "Yes" : "No";
                options = ["Yes", "No", "Maybe", "Unknown"];
                explanation = `Last digit is ${n % 10}. Divisible by 2? ${correct}.`;
            }

        } else if (type === "find_digit") {
            const digitRule = [3, 9, 11][randomInt(0, 2)];
            let nStr = String(randomInt(100, 999));
            const pos = randomInt(0, nStr.length);
            if (pos < nStr.length) {
                const prefix = nStr.substring(0, pos);
                const suffix = nStr.substring(pos + 1);

                let validDigit = -1;
                for (let d = 0; d <= 9; d++) {
                    const testNum = parseInt(prefix + d + suffix);
                    if (testNum % digitRule === 0) {
                        validDigit = d;
                        break;
                    }
                }

                if (validDigit !== -1) {
                    qText = `Replace the <strong>*</strong> in <strong>${prefix}*${suffix}</strong> with the smallest digit so that the number becomes divisible by <strong>${digitRule}</strong>.`;
                    correct = validDigit.toString();

                    options = [
                        correct,
                        ((validDigit + 1) % 10).toString(),
                        ((validDigit + 2) % 10).toString(),
                        ((validDigit + 5) % 10).toString()
                    ];

                    explanation = `We need <strong>${prefix}${validDigit}${suffix}</strong> to be divisible by ${digitRule}.<br/>` +
                        `By placing <strong>${validDigit}</strong>, the condition is met.`;
                } else {
                    qText = `Which number is divisible by 5?`;
                    correct = "105";
                    options = ["105", "102", "103", "104"];
                    explanation = "Ends in 5.";
                }
            }

        } else {
            qText = `When is a number divisible by <strong>${rule}</strong>?`;

            if (rule === 2) {
                correct = "If its last digit is 0, 2, 4, 6, or 8";
                options = [
                    correct,
                    "If the sum of its digits is even",
                    "If it ends in 0, 1, 2, 3",
                    "If it is divisible by 3"
                ];
            } else if (rule === 3) {
                correct = "If the sum of its digits is divisible by 3";
                options = [correct, "If it ends in 3", "If it ends in an odd number", "If the last two digits are divisible by 3"];
            } else if (rule === 4) {
                correct = "If the number formed by its last two digits is divisible by 4";
                options = [correct, "If it ends in 4", "If sum of digits is 4", "If last digit is even"];
            } else if (rule === 5) {
                correct = "If its last digit is 0 or 5";
                options = [correct, "If it ends in 5 only", "If data sum is 5", "If it is odd"];
            } else if (rule === 6) {
                correct = "If it is divisible by both 2 and 3";
                options = [correct, "If it is divisible by 2 and 4", "If it ends in 6", "If sum of digits is 6"];
            } else if (rule === 8) {
                correct = "If the number formed by its last three digits is divisible by 8";
                options = [correct, "If it is divisible by 2 and 4", "If it ends in 8", "If sum of digits is 8"];
            } else if (rule === 9) {
                correct = "If the sum of its digits is divisible by 9";
                options = [correct, "If it ends in 9", "If it is divisible by 3 only", "If last digit is odd"];
            } else if (rule === 10) {
                correct = "If its last digit is 0";
                options = [correct, "If it ends in 0 or 5", "If sum of digits is 10", "If it is even"];
            } else if (rule === 11) {
                correct = "If difference of sums of odd and even place digits is 0 or div by 11";
                options = [correct, "If last digit is 1", "If sum of digits is 11", "If it is odd"];
            }
            explanation = `Rule for ${rule}: <strong>${correct}</strong>.`;
        }

        let uniqueOpts = [...new Set(options)];
        while (uniqueOpts.length < 4) {
            uniqueOpts.push("Answer " + randomInt(1, 100));
        }
        uniqueOpts = [...new Set(uniqueOpts)];

        const shuffled = uniqueOpts.slice(0, 4).sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);

        const newQuestion = {
            text: qText,
            correctAnswer: correct,
            solution: explanation,
            type: 'mcq',
            options: shuffled
        };

        setCurrentQuestion(newQuestion);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
        setFeedbackMessage("");
        questionStartTime.current = Date.now();

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
        if (!selectedOption) return;

        const isRight = selectedOption === currentQuestion.correctAnswer;

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
                isSubmitted: true,
                isCorrect: isRight,
                feedbackMessage: feedbackMsg
            }
        }));

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
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
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl flex items-center gap-2">
                        <Split className="text-[#4FB7B3]" /> Divisibility Tests
                    </span>
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
                                        <h2 className="question-text-modern" style={{ fontSize: '1.2rem', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', width: '100%', overflowX: 'auto', marginBottom: '1.5rem' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
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
                                    disabled={!selectedOption}
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
                                    disabled={!selectedOption}
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

export default DivisibilityTests;
