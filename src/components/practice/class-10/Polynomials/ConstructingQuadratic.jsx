import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import ExplanationModal from '../../../ExplanationModal';
import PracticeReportModal from '../../PracticeReportModal';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import './polynomials.css';

const NODE_ID = 'a4101002-0007-0000-0000-000000000000'; // Constructing Quadratic Polynomials from Given Conditions

const ConstructingQuadratic = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    // Logging states
    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const v4Answers = useRef([]);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1238;
    const SKILL_NAME = "Constructing Quadratic Polynomials from Given Conditions";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            createQuestion(1,
                `The quadratic polynomial whose sum and product of zeroes are $S$ and $P$ respectively is given by (where $k \\neq 0$ is a constant):`,
                [`$k(x^2 - Sx + P)$`, `$k(x^2 + Sx + P)$`, `$k(x^2 - Px + S)$`, `$k(x^2 + Px - S)$`],
                `$k(x^2 - Sx + P)$`,
                `1. A quadratic polynomial whose sum of zeroes is $S$ and product of zeroes is $P$ can be written as:
   $p(x) = k [x^2 - (\\text{Sum of zeroes})x + (\\text{Product of zeroes})]$.
2. Substituting $S$ and $P$, we get $k(x^2 - Sx + P)$.`
            ),
            createQuestion(2,
                `Find a quadratic polynomial whose sum of zeroes is $4$ and product of zeroes is $3$.`,
                [`$x^2 - 4x + 3$`, `$x^2 + 4x + 3$`, `$x^2 - 3x + 4$`, `$x^2 - 4x - 3$`],
                `$x^2 - 4x + 3$`,
                `1. Given: Sum of zeroes ($S$) = $4$, Product of zeroes ($P$) = $3$.
2. The polynomial is $x^2 - Sx + P$.
3. Substitute $S$ and $P$: $x^2 - 4x + 3$.`
            ),
            createQuestion(3,
                `Find a quadratic polynomial whose sum and product of zeroes are $-2$ and $-5$ respectively.`,
                [`$x^2 + 2x - 5$`, `$x^2 - 2x - 5$`, `$x^2 + 2x + 5$`, `$x^2 - 2x + 5$`],
                `$x^2 + 2x - 5$`,
                `1. Given: Sum ($S$) = $-2$, Product ($P$) = $-5$.
2. The polynomial is $x^2 - Sx + P$.
3. Substitute $S$ and $P$: $x^2 - (-2)x + (-5)$.
4. Simplifying this yields $x^2 + 2x - 5$.`
            ),
            createQuestion(4,
                `Construct a quadratic polynomial whose zeroes are $2$ and $5$.`,
                [`$x^2 - 7x + 10$`, `$x^2 + 7x + 10$`, `$x^2 - 3x - 10$`, `$x^2 + 10x - 7$`],
                `$x^2 - 7x + 10$`,
                `1. The zeroes are $\\alpha = 2$ and $\\beta = 5$.
2. Compute the sum: $S = \\alpha + \\beta = 2 + 5 = 7$.
3. Compute the product: $P = \\alpha \\beta = 2 \\times 5 = 10$.
4. The polynomial is $x^2 - Sx + P = x^2 - 7x + 10$.`
            ),
            createQuestion(5,
                `Find a quadratic polynomial whose zeroes are $-3$ and $4$.`,
                [`$x^2 - x - 12$`, `$x^2 + x - 12$`, `$x^2 - x + 12$`, `$x^2 + 7x - 12$`],
                `$x^2 - x - 12$`,
                `1. The zeroes are $\\alpha = -3$ and $\\beta = 4$.
2. Sum ($S$) = $-3 + 4 = 1$.
3. Product ($P$) = $-3 \\times 4 = -12$.
4. The polynomial is $x^2 - Sx + P = x^2 - 1x - 12 = x^2 - x - 12$.`
            ),
            createQuestion(6,
                `Find a quadratic polynomial whose sum of zeroes is $0$ and product is $-\\sqrt{2}$.`,
                [`$x^2 - \\sqrt{2}$`, `$x^2 + \\sqrt{2}$`, `$x^2 - \\sqrt{2}x$`, `$x^2 + \\sqrt{2}x$`],
                `$x^2 - \\sqrt{2}$`,
                `1. Given: Sum ($S$) = $0$, Product ($P$) = $-\\sqrt{2}$.
2. The polynomial is $x^2 - Sx + P$.
3. Substitute $S$ and $P$: $x^2 - 0x + (-\\sqrt{2})$.
4. This simplifies to $x^2 - \\sqrt{2}$.`
            ),
            createQuestion(7,
                `Find a quadratic polynomial whose zeroes are $1 + \\sqrt{2}$ and $1 - \\sqrt{2}$.`,
                [`$x^2 - 2x - 1$`, `$x^2 + 2x - 1$`, `$x^2 - 2x + 1$`, `$x^2 - x - 2$`],
                `$x^2 - 2x - 1$`,
                `1. Let $\\alpha = 1 + \\sqrt{2}$ and $\\beta = 1 - \\sqrt{2}$.
2. Sum ($S$) = $(1 + \\sqrt{2}) + (1 - \\sqrt{2}) = 2$.
3. Product ($P$) = $(1 + \\sqrt{2})(1 - \\sqrt{2}) = 1^2 - (\\sqrt{2})^2 = 1 - 2 = -1$.
4. The polynomial is $x^2 - Sx + P = x^2 - 2x - 1$.`
            ),
            createQuestion(8,
                `Find a quadratic polynomial if the sum of its zeroes is $\\frac{1}{4}$ and product is $-1$.`,
                [`$4x^2 - x - 4$`, `$4x^2 + x - 4$`, `$x^2 - 4x - 1$`, `$4x^2 - 4x - 1$`],
                `$4x^2 - x - 4$`,
                `1. Given: Sum ($S$) = $\\frac{1}{4}$, Product ($P$) = $-1$.
2. The polynomial is $x^2 - Sx + P = x^2 - \\frac{1}{4}x - 1$.
3. Multiply the entire polynomial by $4$ to remove fractions (this represents picking $k=4$).
4. $4(x^2 - \\frac{1}{4}x - 1) = 4x^2 - x - 4$.`
            ),
            createQuestion(9,
                `Find a quadratic polynomial whose sum and product of zeroes are $\\frac{1}{3}$ and $\\frac{1}{3}$.`,
                [`$3x^2 - x + 1$`, `$3x^2 + x + 1$`, `$3x^2 - x - 1$`, `$x^2 - 3x + 1$`],
                `$3x^2 - x + 1$`,
                `1. Given: Sum ($S$) = $\\frac{1}{3}$, Product ($P$) = $\\frac{1}{3}$.
2. The polynomial is $x^2 - Sx + P = x^2 - \\frac{1}{3}x + \\frac{1}{3}$.
3. Multiply by $3$ to clear the denominator (picking $k=3$).
4. Therefore, the polynomial is $3x^2 - x + 1$.`
            ),
            createQuestion(10,
                `If the zeroes of a quadratic polynomial are $\\alpha$ and $\\beta$ such that $\\alpha + \\beta = -6$ and $\\alpha\\beta = 5$, the polynomial is:`,
                [`$x^2 + 6x + 5$`, `$x^2 - 6x + 5$`, `$x^2 + 5x + 6$`, `$x^2 - 5x + 6$`],
                `$x^2 + 6x + 5$`,
                `1. We are directly given the sum ($S$) and product ($P$).
2. $S = \\alpha + \\beta = -6$.
3. $P = \\alpha \\beta = 5$.
4. The polynomial is $x^2 - Sx + P = x^2 - (-6)x + 5 = x^2 + 6x + 5$.`
            )
        ];

        return qs;
    };

    useEffect(() => {
        setQuestions(generateQuestions());
    }, []);

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

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    const CORRECT_MESSAGES = ["Good job!", "Excellent!", "Perfect!", "Well done!"];
    useEffect(() => {
        startSession({ nodeId: NODE_ID, sessionType: 'practice' });
        v4Answers.current = [];

        let timer;
        if (!showReportModal) {
            timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        }

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
    }, [showReportModal]);

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

        // v4 Log
        let t = accumulatedTime.current;
        if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const entry = {
            question_index: qIndex + 1,
            answer_json: { selected: selectedOption },
            is_correct: isRight ? 1.0 : 0.0,
            marks_awarded: isRight ? 1 : 0,
            marks_possible: 1,
            time_taken_ms: t
        };
        v4Answers.current[qIndex] = entry;
        logAnswer({
            questionIndex: entry.question_index,
            answerJson: entry.answer_json,
            isCorrect: entry.is_correct
        });

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.recordAttempt({
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10), session_id: null, skill_id: SKILL_ID,
                question_text: currentQ.text, correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption, is_correct: isRight, solution_text: currentQ.solution,
                time_spent_seconds: Math.round(t / 1000)
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
            // v4 finish
            const payload = v4Answers.current.filter(Boolean);
            await finishSession({
                totalQuestions: questions.length,
                questionsAnswered: payload.length,
                answersPayload: payload
            });
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
                    user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10)
                }).catch(console.error);
            }
            setShowReportModal(true);
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

            <main className="practice-content-wrapper" style={{ alignItems: "flex-start", paddingTop: "1rem" }}>
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
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
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px', gridColumn: '1 / -1', justifySelf: 'center', textAlign: 'center', width: '100%' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                <img src={mascotImg} alt="Mascot" style={{ width: '40px', height: '40px' }} />
                                                <span>{feedbackMessage}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} mascotImg={mascotImg} />

            <PracticeReportModal
                isOpen={showReportModal}
                stats={{
                    timeTaken: formatTime(timeElapsed),
                    correctAnswers: Object.values(answers).filter(val => val.isCorrect === true).length,
                    totalQuestions: questions.length
                }}
                onContinue={() => navigate(-1)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> VIEW EXPLANATION</button>}
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
                                <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} {qIndex === questions.length - 1 ? null : <ChevronRight />}</button> :
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check /></button>
                            }
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>
                            Exit
                        </button>
                    </div>
                    <div className="mobile-footer-center" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        {isSubmitted && <button className="view-explanation-btn" style={{ fontSize: '0.7rem', padding: '0.3rem 0.5rem' }} onClick={() => setShowExplanationModal(true)}><Eye size={14} /> VIEW EXPLANATION</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Prev
                        </button>
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleNext}>{qIndex === questions.length - 1 ? "Finish" : "Next"} {qIndex === questions.length - 1 ? null : <ChevronRight size={16} strokeWidth={3} />}</button>
                        ) : (
                            <button className="nav-pill-submit-btn" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }} onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={16} strokeWidth={3} /></button>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ConstructingQuadratic;
