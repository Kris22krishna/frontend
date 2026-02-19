import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const IrrationalOperations = () => {
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

    const SKILL_ID = 1118;
    const SKILL_NAME = "Behaviour of Operations on Irrational Numbers";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Sum Rational + Irrational
            createQuestion(1,
                `The sum of a rational number and an irrational number is always:`,
                [`Irrational`, `Rational`, `Integer`, `Zero`],
                `Irrational`,
                `1. Property:
   - Rational + Irrational = Irrational.
   - Example: $2 + \\sqrt{3}$ is irrational.

2. Conclusion:
   - Irrational.`
            ),
            // 2. Product Non-zero Rational * Irrational
            createQuestion(2,
                `The product of a non-zero rational number and an irrational number is always:`,
                [`Irrational`, `Rational`, `Prime`, `One`],
                `Irrational`,
                `1. Property:
   - Rational ($r \\neq 0$) $\\times$ Irrational ($x$) = Irrational.
   - If it were rational ($p$), then $x = p/r$ would be rational, contradiction.

2. Conclusion:
   - Irrational.`
            ),
            // 3. Difference
            createQuestion(3,
                `Is $(5 - \\sqrt{3})$ rational or irrational?`,
                [`Irrational`, `Rational`, `Both`, `None`],
                `Irrational`,
                `1. Analysis:
   - 5 is rational.
   - $\\sqrt{3}$ is irrational.
   - Difference of rational and irrational is irrational.

2. Conclusion:
   - Irrational.`
            ),
            // 4. Product of Roots
            createQuestion(4,
                `The operation $(\\sqrt{2} + \\sqrt{3})(\\sqrt{2} - \\sqrt{3})$ demonstrates that:`,
                [`Product of two irrationals can be rational`, `Product of two irrationals is always irrational`, `Sum of irrationals is rational`, `Difference of irrationals is integer`],
                `Product of two irrationals can be rational`,
                `1. Simplify:
   - $(\\sqrt{2})^2 - (\\sqrt{3})^2 = 2 - 3 = -1$.
   - -1 is a rational number.
   - Both factors were irrational.

2. Conclusion:
   - The product of two irrational numbers can be rational.`
            ),
            // 5. Square of Binomial
            createQuestion(5,
                `Is $(3 + \\sqrt{2})^2$ rational or irrational?`,
                [`Irrational`, `Rational`, `Integer`, `Zero`],
                `Irrational`,
                `1. Expand:
   - $(3 + \\sqrt{2})^2 = 3^2 + 2(3)(\\sqrt{2}) + (\\sqrt{2})^2$
   - $9 + 6\\sqrt{2} + 2$
   - $11 + 6\\sqrt{2}$.

2. Analyze:
   - 11 is rational, $6\\sqrt{2}$ is irrational. Sum is irrational.

3. Conclusion:
   - Irrational.`
            ),
            // 6. Identifying form
            createQuestion(6,
                `Why is $3\\sqrt{2}$ an irrational number?`,
                [`Because it is the product of a non-zero rational and an irrational`, `Because it has a square root`, `Because 3 is odd`, `It is actually rational`],
                `Because it is the product of a non-zero rational and an irrational`,
                `1. Property:
   - The product of a non-zero rational number (3) and an irrational number ($\\sqrt{2}$) is always irrational.

2. Conclusion:
   - Product of non-zero rational and irrational.`
            ),
            // 7. Simplify root
            createQuestion(7,
                `The number $\\frac{6\\sqrt{5}}{2\\sqrt{5}}$ is rational because:`,
                [`It simplifies to 3, which is an integer`, `It contains roots`, `It is a fraction`, `Square roots always cancel`],
                `It simplifies to 3, which is an integer`,
                `1. Simplify:
   - Cancel $\\sqrt{5}$ from numerator and denominator.
   - $6/2 = 3$.
   - 3 is an integer, hence rational.

2. Conclusion:
   - It simplifies to 3.`
            ),
            // 8. Negation
            createQuestion(8,
                `The negative of an irrational number is:`,
                [`Irrational`, `Rational`, `Imaginary`, `Positive`],
                `Irrational`,
                `1. Logic:
   - If $x$ is irrational, then $-x$ is also irrational.
   - If $-x$ were rational ($r$), then $x = -r$ would be rational.

2. Conclusion:
   - Irrational.`
            ),
            // 9. Check specific Number
            createQuestion(9,
                `State true or false: $3 + 2\\sqrt{5}$ is irrational.`,
                [`True`, `False`, `Depends on context`, `Undefined`],
                `True`,
                `1. Logic:
   - $\\sqrt{5}$ is irrational.
   - $2\\sqrt{5}$ is irrational.
   - $3 + 2\\sqrt{5}$ is Sum of Rational and Irrational.

2. Conclusion:
   - True (Irrational).`
            ),
            // 10. Circle ratio
            createQuestion(10,
                `The ratio of circumference of a circle to its diameter ($C/D$) is:`,
                [`Irrational`, `Rational`, `Integer`, `Whole`],
                `Irrational`,
                `1. Definition:
   - $C/D = \\pi$.
   - $\\pi$ is an irrational number.

2. Conclusion:
   - Irrational.`
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

export default IrrationalOperations;
