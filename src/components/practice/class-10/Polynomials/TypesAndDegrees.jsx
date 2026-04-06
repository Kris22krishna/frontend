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
import './polynomials.css'; // specific css for this chapter

const NODE_ID = 'a4101002-0001-0000-0000-000000000000'; // Understanding Polynomials and Their Degrees

const TypesAndDegrees = () => {
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

    const SKILL_ID = 1233;
    const SKILL_NAME = "Understanding Polynomials and Their Degrees";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Definition of polynomial (Easy)
            createQuestion(1,
                `Which of the following expressions is a polynomial?`,
                [`$x^2 + 2x + 1$`, `$x^2 + \\frac{1}{x}$`, `$\\sqrt{x} + 2$`, `$x^{-2} + 3x$`],
                `$x^2 + 2x + 1$`,
                `1. A polynomial is an expression consisting of variables and coefficients, that involves only the operations of addition, subtraction, multiplication, and non-negative integer exponents of variables.
2. In $x^2 + \\frac{1}{x}$, the power of x is -1 (negative).
3. In $\\sqrt{x} + 2$, the power of x is 1/2 (fraction).
4. In $x^{-2} + 3x$, the power of x is -2 (negative).
5. Therefore, $x^2 + 2x + 1$ is the only polynomial.`
            ),
            // 2. Degree of a polynomial (Easy)
            createQuestion(2,
                `Find the degree of the polynomial: $5x^3 - 4x^2 + x - 2$.`,
                [`3`, `2`, `1`, `4`],
                `3`,
                `1. The degree of a polynomial is the highest power of the variable in the polynomial.
2. The polynomial is $5x^3 - 4x^2 + x - 2$.
3. The powers of x are 3, 2, and 1.
4. The highest power is 3.
5. Therefore, the degree of the polynomial is 3.`
            ),
            // 3. Linear polynomial (Easy)
            createQuestion(3,
                `Which of the following polynomials is a linear polynomial?`,
                [`$3x + 5$`, `$x^2 + 2$`, `$x^3 - 1$`, `$5$`],
                `$3x + 5$`,
                `1. A polynomial of degree 1 is called a linear polynomial.
2. Let's check the degrees of the options:
   - $3x + 5$: The highest power of x is 1. (Degree 1)
   - $x^2 + 2$: The highest power of x is 2. (Degree 2, Quadratic)
   - $x^3 - 1$: The highest power of x is 3. (Degree 3, Cubic)
   - $5$: The highest power of x is 0. (Degree 0, Constant)
3. Therefore, $3x + 5$ is a linear polynomial.`
            ),
            // 4. Quadratic polynomial (Medium)
            createQuestion(4,
                `State whether $2x^2 + 5x + 3$ is linear, quadratic, or cubic.`,
                [`Quadratic`, `Linear`, `Cubic`, `Biquadratic`],
                `Quadratic`,
                `1. We first find the degree of the given polynomial $2x^2 + 5x + 3$.
2. The highest power of the variable x in the polynomial is 2.
3. A polynomial of degree 2 is called a quadratic polynomial.
4. Therefore, it is a quadratic polynomial.`
            ),
            // 5. Cubic polynomial (Medium)
            createQuestion(5,
                `Identify the cubic polynomial from the following:`,
                [`$x^3 - 2x^2 + x - 1$`, `$x^2 - x + 1$`, `$x^4 - 1$`, `$3x + 2$`],
                `$x^3 - 2x^2 + x - 1$`,
                `1. A polynomial of degree 3 is called a cubic polynomial.
2. We check the degrees of the given options:
   - $x^3 - 2x^2 + x - 1$: highest power is 3 (Cubic).
   - $x^2 - x + 1$: highest power is 2 (Quadratic).
   - $x^4 - 1$: highest power is 4 (Biquadratic/Quartic).
   - $3x + 2$: highest power is 1 (Linear).
3. Therefore, $x^3 - 2x^2 + x - 1$ is the cubic polynomial.`
            ),
            // 6. Gen Form Quadratic (Medium)
            createQuestion(6,
                `What is the general form of a quadratic polynomial where $a \\neq 0$?`,
                [`$ax^2 + bx + c$`, `$ax + b$`, `$ax^3 + bx^2 + cx + d$`, `$a x^4 + b x^2 + c$`],
                `$ax^2 + bx + c$`,
                `1. A quadratic polynomial has a degree of 2.
2. Its standard form includes a term with degree 2, degree 1, and degree 0 in decreasing order of powers.
3. Therefore, the general form is $ax^2 + bx + c$, where a, b, and c are real numbers and $a \\neq 0$.`
            ),
            // 7. Gen Form Cubic (Hard)
            createQuestion(7,
                `What is the general form of a cubic polynomial where $a \\neq 0$?`,
                [`$ax^3 + bx^2 + cx + d$`, `$ax^2 + bx + c$`, `$ax + b$`, `$a x^4 + b x^3 + c x^2 + d x + e$`],
                `$ax^3 + bx^2 + cx + d$`,
                `1. A cubic polynomial has a degree of 3.
2. Its standard form includes terms with maximum degree 3 down to degree 0.
3. Therefore, the general form is $ax^3 + bx^2 + cx + d$, where a, b, c, and d are real numbers and $a \\neq 0$.`
            ),
            // 8. Degree identification (Hard)
            createQuestion(8,
                `Find the degree of the polynomial: $p(u) = \\frac{1}{2}u^4 - 5u + u^2 - \\sqrt{3}$.`,
                [`4`, `2`, `1`, `0`],
                `4`,
                `1. Write the polynomial in standard form: $p(u) = \\frac{1}{2}u^4 + u^2 - 5u - \\sqrt{3}$.
2. Look at the variable $u$ and find the highest exponent.
3. The exponents of $u$ in this polynomial are 4, 2, 1, and 0.
4. The highest power is 4, so the degree of the polynomial is 4.`
            ),
            // 9. Mix of types (Hard)
            createQuestion(9,
                `If $p(x) = x(x^2 - 1)$, classify the polynomial $p(x)$.`,
                [`Cubic`, `Quadratic`, `Linear`, `Biquadratic`],
                `Cubic`,
                `1. First, simplify the given polynomial $p(x)$ by expanding it.
2. $p(x) = x(x^2 - 1)$
3. $p(x) = x \\cdot x^2 - x \\cdot 1 = x^3 - x$
4. Now, find the degree; the highest power of x is 3.
5. A polynomial of degree 3 is a cubic polynomial.`
            ),
            // 10. Abstract gen forms (Hardest)
            createQuestion(10,
                `If $p(x)$ is a polynomial of the form $cx + d$, what is its type and degree (assume $c \\neq 0$)?`,
                [`Linear, Degree 1`, `Quadratic, Degree 2`, `Cubic, Degree 3`, `Constant, Degree 0`],
                `Linear, Degree 1`,
                `1. The given polynomial is $p(x) = cx + d$.
2. The variable here is $x$.
3. The power of $x$ in the term $cx$ is 1 (since $x = x^1$).
4. The term $d$ is a constant, meaning it has $x^0$.
5. The highest power is 1, so the degree is 1.
6. A polynomial of degree 1 is called a linear polynomial.`
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

    // Close modal ONLY when qIndex changes (from workflow)
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

export default TypesAndDegrees;
