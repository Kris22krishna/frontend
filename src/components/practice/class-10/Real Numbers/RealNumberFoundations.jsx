import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const RealNumberFoundations = () => {
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

    const SKILL_ID = 10201;
    const SKILL_NAME = "Foundations of the Real Number System";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Rational vs Irrational (Simple)
            createQuestion(1,
                `Which of the following numbers is irrational?`,
                [`$\\sqrt{2}$`, `7`, `0.125`, `$\\frac{3}{4}$`],
                `$\\sqrt{2}$`,
                `1. Recall the definition:
   - Rational numbers can be written as p/q.
   - Irrational numbers cannot be written as simple fractions and have non-terminating, non-repeating decimals.

2. Analyze options:
   - 7 is rational ($7/1$).
   - 0.125 is rational ($1/8$).
   - $3/4$ is rational.
   - $\\sqrt{2}$ is approx 1.414... (non-terminating).

3. Conclusion:
   - Therefore, $\\sqrt{2}$ is irrational.`
            ),
            // 2. Rational vs Irrational (Simple)
            createQuestion(2,
                `Which of the following numbers is rational?`,
                [`0.125`, `$\\sqrt{3}$`, `$\\pi$`, `$\\sqrt{5}$`],
                `0.125`,
                `1. Analyze options:
   - $\\sqrt{3}, \\sqrt{5}, \\pi$ are all irrational.
   - 0.125 can be written as $\\frac{125}{1000} = \\frac{1}{8}$.

2. Conclusion:
   - Since 0.125 can be expressed as a fraction, it is rational.`
            ),
            // 3. Definition check
            createQuestion(3,
                `Real numbers consist of:`,
                [`Rational and Irrational numbers`, `Only Rational numbers`, `Only Integers`, `Only Natural numbers`],
                `Rational and Irrational numbers`,
                `1. Definition of Real Numbers:
   - The set of Real Numbers includes all Rational numbers (fractions, integers, etc.) and all Irrational numbers (like $\\pi, \\sqrt{2}$).

2. Conclusion:
   - Therefore, Real numbers consist of Rational and Irrational numbers.`
            ),
            // 4. Identifying Integers
            createQuestion(4,
                `Which of the following is an integer?`,
                [`-5`, `$\\sqrt{3}$`, `3.5`, `$\\pi$`],
                `-5`,
                `1. Analyze options:
   - $\\sqrt{3}$ is irrational.
   - 3.5 is a decimal (rational but not integer).
   - $\\pi$ is irrational.
   - -5 is a a negative whole number.

2. Conclusion:
   - Therefore, -5 is an integer.`
            ),
            // 5. Decimal Expansion
            createQuestion(5,
                `The decimal expansion of a rational number is either:`,
                [`Terminating or non-terminating recurring`, `Non-terminating non-recurring`, `Always terminating`, `Always non-terminating`],
                `Terminating or non-terminating recurring`,
                `1. Property of Rational Numbers:
   - Rational numbers ($p/q$) result in decimals that either stop (terminate) or repeat a pattern (recurring).
   - Irrational numbers are non-terminating and non-recurring.

2. Conclusion:
   - Therefore, it is Terminating or non-terminating recurring.`
            ),
            // 6. Root check
            createQuestion(6,
                `Which of these roots results in a rational number?`,
                [`$\\sqrt{4}$`, `$\\sqrt{3}$`, `$\\sqrt{5}$`, `$\\sqrt{7}$`],
                `$\\sqrt{4}$`,
                `1. Calculate roots:
   - $\\sqrt{3} \\approx 1.732...$ (Irrational)
   - $\\sqrt{5} \\approx 2.236...$ (Irrational)
   - $\\sqrt{7} \\approx 2.645...$ (Irrational)
   - $\\sqrt{4} = 2$ (Integer, thus Rational)

2. Conclusion:
   - Therefore, $\\sqrt{4}$ is rational.`
            ),
            // 7. Pi check
            createQuestion(7,
                `The number $\\pi$ is:`,
                [`Irrational`, `Rational`, `Integer`, `Whole number`],
                `Irrational`,
                `1. Property of $\\pi$:
   - $\\pi$ (pi) is the ratio of circle's circumference to diameter.
   - Its decimal expansion $3.14159...$ never ends and never repeats.

2. Conclusion:
   - Therefore, $\\pi$ is irrational.`
            ),
            // 8. Zero check
            createQuestion(8,
                `The number 0 is:`,
                [`Rational`, `Irrational`, `Natural number`, `None of these`],
                `Rational`,
                `1. Definition:
   - A number is rational if it can be written as $p/q$ where $q \\neq 0$.
   - $0 = \\frac{0}{1}$.

2. Conclusion:
   - Therefore, 0 is a rational number.`
            ),
            // 9. Decimal to Fraction
            createQuestion(9,
                `0.333... is equivalent to:`,
                [`$\\frac{1}{3}$`, `$\\frac{3}{10}$`, `$\\frac{1}{30}$`, `$\\frac{3}{100}$`],
                `$\\frac{1}{3}$`,
                `1. Analyze the recurring decimal:
   - $x = 0.333...$
   - $10x = 3.333...$
   - $10x - x = 3 \\Rightarrow 9x = 3 \\Rightarrow x = 3/9 = 1/3$.

2. Conclusion:
   - Therefore, 0.333... is $\\frac{1}{3}$.`
            ),
            // 10. Combined System
            createQuestion(10,
                `Which notation denotes the set of Real Numbers?`,
                [`R`, `Z`, `Q`, `N`],
                `R`,
                `1. Standard Notations:
   - $\\mathbb{N}$ = Natural Numbers
   - $\\mathbb{Z}$ = Integers
   - $\\mathbb{Q}$ = Rational Numbers
   - $\\mathbb{R}$ = Real Numbers

2. Conclusion:
   - Therefore, R denotes Real Numbers.`
            )

        ];

        return qs;
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

export default RealNumberFoundations;
