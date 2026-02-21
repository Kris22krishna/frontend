import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Trophy, RefreshCw, HelpCircle, TreeDeciduous } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Excellent! You built the factor tree correctly! ✨",
    "🌟 Brilliant! All primes found! 🌟",
    "🎉 Correct! That's the prime breakdown! 🎉",
    "✨ Fantastic! Prime factorisation master! ✨",
    "🚀 Super! Spot on! 🚀",
    "🌈 Perfect! You cracked the code! 🌈",
    "🎊 Great job! 🎊",
    "💎 Absolute genius! 💎"
];

const getPrimeFactorisation = (n) => {
    const factors = [];
    let d = 2;
    let temp = n;
    while (d * d <= temp) {
        while (temp % d === 0) {
            factors.push(d);
            temp /= d;
        }
        d++;
    }
    if (temp > 1) factors.push(temp);
    return factors;
};

const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const PrimeFactorisation = () => {
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
    const SKILL_ID = 1069;
    const SKILL_NAME = "Prime Factorisation";

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
        const types = ["find_prime_fact", "factor_tree_missing", "valid_check", "missing_prime_seq"];
        const type = types[index % types.length];

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];

        if (type === "find_prime_fact") {
            const n = randomInt(12, 100);
            const factors = getPrimeFactorisation(n);

            qText = `What is the <strong>prime factorisation</strong> of <strong>${n}</strong>?`;
            correct = factors.join(" \\times ");

            let dist1;
            if (factors.filter(f => f === 2).length >= 2) {
                const temp = [...factors];
                const idx1 = temp.indexOf(2);
                temp.splice(idx1, 1);
                const idx2 = temp.indexOf(2);
                temp.splice(idx2, 1);
                temp.push(4);
                dist1 = temp.sort((a, b) => a - b).join(" \\times ");
            } else if (factors.filter(f => f === 3).length >= 2) {
                const temp = [...factors];
                temp.splice(temp.indexOf(3), 2);
                temp.push(9);
                dist1 = temp.sort((a, b) => a - b).join(" \\times ");
            } else {
                dist1 = getPrimeFactorisation(n + randomInt(2, 5)).join(" \\times ");
            }

            const dist2 = factors.map(f => f + 1).join(" \\times ");
            const dist3 = getPrimeFactorisation(n - 1 > 1 ? n - 1 : n + 2).join(" \\times ");

            options = [correct, dist1, dist2, dist3];
            explanation = `To find the prime factorisation of ${n}, we break it down into prime numbers:<br/>` +
                `$${n} = ${factors.join(" \\times ")}$`;

        } else if (type === "factor_tree_missing") {
            let n, a, b;
            do {
                n = randomInt(20, 100);
                const splits = [];
                for (let i = 2; i <= Math.sqrt(n); i++) {
                    if (n % i === 0) splits.push([i, n / i]);
                }
                if (splits.length > 0) {
                    const split = splits[randomInt(0, splits.length - 1)];
                    a = split[0];
                    b = split[1];
                }
            } while (!a);

            qText = `In a <strong>Factor Tree</strong> for <strong>${n}</strong>, we split it into two branches. If one branch is <strong>${a}</strong>, what is the number on the other branch?`;
            correct = b.toString();

            options = [
                correct,
                (b + 1).toString(),
                (b - 1).toString(),
                (a + b).toString()
            ];
            explanation = `In a factor tree, the two branches multiply to give the number above them.<br/>` +
                `$${a} \\times ? = ${n}$<br/>` +
                `$${n} \\div ${a} = ${b}$<br/>` +
                `So, the other branch is <strong>${b}</strong>.`;

        } else if (type === "valid_check") {
            const validPrimes = [2, 3, 5, 7];
            const p1 = validPrimes[randomInt(0, 3)];
            const p2 = validPrimes[randomInt(0, 3)];
            const p3 = validPrimes[randomInt(0, 3)];
            const correctSeq = [p1, p2, p3].sort((a, b) => a - b).join(" \\times ");

            const invalid1 = `2 \\times 4 \\times ${randomInt(2, 5)}`;
            const invalid2 = `6 \\times ${randomInt(2, 5)}`;
            const invalid3 = `1 \\times ${p1} \\times ${p2}`;

            qText = `Which of the following is a <strong>VALID</strong> prime factorisation (contains ONLY prime numbers)?`;
            correct = correctSeq;
            options = [correctSeq, invalid1, invalid2, invalid3];

            explanation = `<strong>$${correctSeq}$</strong> contains only prime numbers ($2, 3, 5, 7$, etc.).<br/>` +
                `Numbers like $4, 6, 1$ are not used in prime factorisation ($1$ is not prime, others are composite).`;

        } else if (type === "missing_prime_seq") {
            const n = randomInt(30, 150);
            const factors = getPrimeFactorisation(n);

            if (factors.length >= 3) {
                const missingIdx = randomInt(0, factors.length - 1);
                const missingVal = factors[missingIdx];
                const displayFactors = [...factors];
                displayFactors[missingIdx] = "?";

                qText = `Find the missing prime factor in the factorisation of <strong>${n}</strong>:<br/>` +
                    `$${n} = ${displayFactors.join(" \\times ")}$`;
                correct = missingVal.toString();

                options = [
                    correct,
                    (missingVal + 1).toString(),
                    (missingVal + 2).toString(),
                    (missingVal > 2 ? missingVal - 1 : 4).toString()
                ];

                explanation = `We know that $${factors.join(" \\times ")} = ${n}$.<br/>` +
                    `The missing factor is <strong>${missingVal}</strong>.`;
            } else {
                const factors2 = getPrimeFactorisation(n);
                qText = `What is the <strong>prime factorisation</strong> of <strong>${n}</strong>?`;
                correct = factors2.join(" \\times ");
                options = [correct, factors2.map(f => f + 1).join(" \\times "), "2 \\times 4", "3 \\times 5"];
                explanation = `$${n} = ${factors2.join(" \\times ")}$`;
            }
        }

        let uniqueOpts = [...new Set(options)];
        while (uniqueOpts.length < 4) {
            const r1 = randomInt(2, 5);
            const r2 = randomInt(2, 7);
            uniqueOpts.push(`${r1} \\times ${r2}`);
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
                        <TreeDeciduous className="text-[#4FB7B3]" /> Prime Factorisation
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

export default PrimeFactorisation;
