import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const RealNumbersTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1119;
    const SKILL_NAME = "Real Numbers Chapter Assessment";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const pool = [
            // From Foundations
            createQuestion(1, `Which is irrational?`, [`$\\sqrt{2}$`, `2`, `0.5`, `$\\sqrt{4}$`], `$\\sqrt{2}$`, `$\\sqrt{2}$ is irrational.`),
            createQuestion(2, `$\\pi$ is:`, [`Irrational`, `Rational`, `Integer`, `Whole`], `Irrational`, `$\\pi$ is irrational.`),

            // From Euclid
            createQuestion(3, `Using Euclid's algorithm, find HCF of 135 and 225:`, [`45`, `35`, `15`, `25`], `45`, `Using Euclid's algorithm, HCF is 45.`),
            createQuestion(4, `In $a=bq+r$, condition for r is:`, [`$0 \\le r < b$`, `$0 < r < b$`, `$0 \\le r \\le b$`], `$0 \\le r < b$`, `Remainder must be non-negative and less than divisor.`),

            // From Prime Factorisation
            createQuestion(5, `Prime factorisation of 140 is:`, [`$2^2 \\times 5 \\times 7$`, `$2 \\times 5 \\times 7$`, `$2^2 \\times 35$`], `$2^2 \\times 5 \\times 7$`, `140 = $4 \\times 35 = 2^2 \\times 5 \\times 7$.`),
            createQuestion(6, `Sum of exponents of prime factors of 196:`, [`4`, `2`, `3`, `5`], `4`, `$196 = 2^2 \\times 7^2$. Sum = 2+2=4.`),

            // From Fundamental Theorem
            createQuestion(7, `Can $6^n$ end with 0?`, [`No`, `Yes`, `For even n`], `No`, `Prime factors are 2 and 3. No 5.`),
            createQuestion(8, `HCF(a,b) $\\times$ LCM(a,b) =`, [`$a \\times b$`, `$a+b$`, `$a/b$`], `$a \\times b$`, `Product of numbers.`),

            // From HCF LCM
            createQuestion(9, `LCM of 6 and 20 is:`, [`60`, `30`, `20`, `120`], `60`, `$LCM(2 \\times 3, 2^2 \\times 5) = 4 \\times 3 \\times 5 = 60$.`),
            createQuestion(10, `HCF of smallest prime and smallest composite:`, [`2`, `4`, `1`], `2`, `HCF(2, 4) = 2.`),

            // From Applications
            createQuestion(11, `Alarms ring at 4, 12, 20 mins. When together again?`, [`60 mins`, `30 mins`, `40 mins`], `60 mins`, `LCM(4, 12, 20) = 60.`),
            createQuestion(12, `Largest tile for 12m 95cm by 3m 85cm room requires:`, [`HCF`, `LCM`, `Product`], `HCF`, `We need the common divisor of dimensions.`),

            // From Irrationality Proof
            createQuestion(13, `To prove $\\sqrt{3}$ irrational, we assume:`, [`It is rational`, `It is integer`, `It is prime`], `It is rational`, `Proof by contradiction starts with assuming it's rational.`),
            createQuestion(14, `If prime p divides $a^2$, then p divides:`, [`$a$`, `$a^3$`, `$2a$`], `$a$`, `Theorem: p divides a.`),

            // From Operations
            createQuestion(15, `Sum of rational and irrational is:`, [`Irrational`, `Rational`, `Zero`], `Irrational`, `Always irrational.`),
            createQuestion(16, `Product $(3+\\sqrt{3})(3-\\sqrt{3})$ is:`, [`Rational`, `Irrational`, `Undefined`], `Rational`, `$9-3=6$ (Rational).`),
            createQuestion(17, `The value of $\\frac{2\\sqrt{5}}{\\sqrt{5}}$ is rational because:`, [`It equals 2`, `It has roots`, `It is zero`], `It equals 2`, `Equals 2 (Rational).`),
            createQuestion(18, `Is $3+2\\sqrt{5}$ an irrational number?`, [`Yes`, `No`], `Yes`, `1. Analysis:
   - Sum of rational (3) and irrational ($2\\sqrt{5}$) is irrational.

2. Conclusion:
   - Yes, it is irrational.`),
            createQuestion(19, `Decimal expansion of rational number is:`, [`Terminating or Recurring`, `Non-recurring`, `Infinite`], `Terminating or Recurring`, `Property of rational numbers.`),
            createQuestion(20, `Prime factorisation of 3825:`, [`$3^2 \\times 5^2 \\times 17$`, `$3 \\times 5^2 \\times 17$`], `$3^2 \\times 5^2 \\times 17$`, `Double check calculation.`)
        ];

        // Shuffle and pick 10
        return pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    };

    useEffect(() => {
        setQuestions(generateQuestions());
    }, []);

    // Restore state when qIndex changes
    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    const CORRECT_MESSAGES = ["Good job!", "Excellent!", "Perfect!", "Well done!"];
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [SKILL_ID]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: selectedOption,
                isCorrect: isRight
            }
        }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            let t = accumulatedTime.current;
            if (isTabActive.current) t += Date.now() - questionStartTime.current;
            const sec = Math.max(0, Math.round(t / 1000));
            api.recordAttempt({
                user_id: parseInt(userId), session_id: sessionId, skill_id: SKILL_ID,
                question_text: currentQ.text, correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption, is_correct: isRight, solution_text: currentQ.solution,
                time_spent_seconds: sec
            }).catch(console.error);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / questions.length) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: questions.length,
                        correct_answers: totalCorrect,
                        timestamp: new Date().toISOString(),
                        time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>
                    {SKILL_NAME}
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
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
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => !isSubmitted && setSelectedOption(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                    {isSubmitted && isCorrect && (
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                            {feedbackMessage}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="nav-pill-next-btn bg-gray-200 text-gray-600"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} />
                                Prev
                            </button>
                            {isSubmitted ?
                                <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight /></button> :
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check /></button>
                            }
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="mobile-footer-right">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ minWidth: 'auto' }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                        {isSubmitted ?
                            <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight size={20} /></button> :
                            <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={20} /></button>
                        }
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default RealNumbersTest;
