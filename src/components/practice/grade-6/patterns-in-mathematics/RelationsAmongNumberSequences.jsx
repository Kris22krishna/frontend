import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing job! You found the pattern! ✨",
    "🌟 Brilliant! You're visualizing it perfectly! 🌟",
    "🎉 Correct! You're a sequence star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const RelationsAmongNumberSequences = () => {
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

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 6202; // ID for Relations Among Number Sequences
    const SKILL_NAME = "Pattern in Mathematics - Relations Among Sequences";

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
        generateQuestion(qIndex);
    }, [qIndex]);

    const generateQuestion = (index) => {
        const questionTypes = ["odd_sum_square", "up_down_sum", "triangular_sum", "powers_of_2"];
        const type = questionTypes[index % 4];

        let questionText = "";
        let explanation = "";
        let correctAnswer = "";
        let options = [];

        if (type === "odd_sum_square") {
            // Sum of first n odd numbers = n^2
            const n = randomInt(3, 7);
            const sum = n * n;
            correctAnswer = sum.toString();

            // Construct sequence: 1 + 3 + 5 + ...
            const oddNums = [];
            for (let i = 0; i < n; i++) oddNums.push(2 * i + 1);
            const sequenceStr = oddNums.join(" + ");

            questionText = `
                <div class='question-container'>
                    <p>Observe the pattern of adding odd numbers:</p>
                    <p>$$1 = 1^2$$</p>
                    <p>$$1 + 3 = 4 = 2^2$$</p>
                    <p>$$1 + 3 + 5 = 9 = 3^2$$</p>
                    <p><strong>What is the sum of:</strong></p>
                    <p>$$${sequenceStr} = \\,?$$</p>
                </div>
            `;
            explanation = `The sum of the first $n$ odd numbers is $n^2$.<br/>Here, there are $${n}$ odd numbers.<br/>Sum = $${n}^2 = ${n} \\times ${n} = ${sum}$.`;

            options = [
                correctAnswer,
                (sum - 2).toString(),
                (sum + 2).toString(),
                (n * (n + 1)).toString()
            ];

        } else if (type === "up_down_sum") {
            // 1 + 2 + ... + n + ... + 1 = n^2
            const n = randomInt(4, 8);
            const sum = n * n;
            correctAnswer = sum.toString();

            const terms = [];
            for (let i = 1; i <= n; i++) terms.push(i);
            for (let i = n - 1; i >= 1; i--) terms.push(i);
            const sequenceStr = terms.join(" + ");

            questionText = `
                <div class='question-container'>
                    <p>Look at this addition pattern:</p>
                    <p>$$1 + 2 + 1 = 4 = 2^2$$</p>
                    <p>$$1 + 2 + 3 + 2 + 1 = 9 = 3^2$$</p>
                    <p><strong>Find the sum:</strong></p>
                    <p>$$${sequenceStr} = \\,?$$</p>
                </div>
            `;
            explanation = `The sum of numbers from $1$ to $n$ and back to $1$ is $n^2$.<br/>The peak number is $${n}$.<br/>Sum = $${n}^2 = ${sum}$.`;

            options = [
                correctAnswer,
                (sum - n).toString(),
                (sum + n).toString(),
                (sum + 1).toString()
            ];

        } else if (type === "triangular_sum") {
            // Sum of two consecutive triangular numbers = square number
            // T_n + T_{n+1} = (n+1)^2
            const n = randomInt(2, 5); // Base index
            const t1 = (n * (n + 1)) / 2;
            const t2 = ((n + 1) * (n + 2)) / 2;
            const sum = t1 + t2; // Should be (n+1)^2
            correctAnswer = sum.toString();

            questionText = `
                <div class='question-container'>
                    <p>Triangular numbers are: $1, 3, 6, 10, 15, \\dots$</p>
                    <p>Adding consecutive triangular numbers gives a square number.</p>
                    <p>For example: $1 + 3 = 4 = 2^2$.</p>
                    <p><strong>What is sum of the ${n}^{\\text{th}} and ${(n + 1)}^{\\text{th}} triangular numbers?</strong></p>
                    <p>$$${t1} + ${t2} = \\,?$$</p>
                </div>
            `;
            explanation = `Adding consecutive triangular numbers gives a square number.<br/>$${t1} + ${t2} = ${sum}$.<br/>Notice that $${sum} = ${(n + 1)}^2$.`;

            options = [
                correctAnswer,
                (sum + 2).toString(),
                (sum - 3).toString(),
                (t2 * 2).toString()
            ];

        } else {
            // Powers of 2
            const startPower = randomInt(1, 4);
            const terms = [];
            for (let i = 0; i < 4; i++) {
                terms.push(Math.pow(2, startPower + i));
            }
            const displayedTerms = terms.slice(0, 3);
            const nextTerm = terms[3];
            correctAnswer = nextTerm.toString();

            questionText = `
                <div class='question-container'>
                    <p>Observe the pattern of powers of 2:</p>
                    <p>$$${displayedTerms.join(", ")}, \\dots$$</p>
                    <p><strong>What is the next number?</strong></p>
                </div>
            `;
            explanation = `Each number is multiplied by 2.<br/>$${displayedTerms[2]} \\times 2 = ${nextTerm}$.`;

            options = [
                correctAnswer,
                (nextTerm + 2).toString(),
                (displayedTerms[2] + 4).toString(),
                (displayedTerms[2] * 3).toString()
            ];
        }

        // Shuffle options and ensure uniqueness
        let uniqueOptions = [...new Set(options)];
        while (uniqueOptions.length < 4) {
            uniqueOptions.push((parseInt(uniqueOptions[0]) + Math.floor(Math.random() * 10) + 1).toString());
            uniqueOptions = [...new Set(uniqueOptions)];
        }

        setShuffledOptions([...uniqueOptions].sort(() => Math.random() - 0.5));
        setCurrentQuestion({
            text: questionText,
            correctAnswer: correctAnswer,
            solution: explanation
        });
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
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
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: isRight }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

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
                    <span className="text-[#31326F] font-bold text-lg sm:text-xl">{SKILL_NAME.split(' - ')[1]}</span>
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

export default RelationsAmongNumberSequences;
