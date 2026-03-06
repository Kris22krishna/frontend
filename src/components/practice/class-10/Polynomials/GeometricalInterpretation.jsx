import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import ExplanationModal from '../../../ExplanationModal';
import PracticeReportModal from '../../PracticeReportModal';
import './polynomials.css';

const GeometricalInterpretation = () => {
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

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1235;
    const SKILL_NAME = "Geometrical Interpretation of Zeroes";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            createQuestion(1,
                `What is the geometrical meaning of the zero of a polynomial $p(x)$?`,
                [`The x-coordinate of the point where the graph of $y = p(x)$ intersects the x-axis`, `The y-coordinate of the point where the graph intersects the y-axis`, `The origin of the coordinate plane`, `The highest point on the graph`],
                `The x-coordinate of the point where the graph of $y = p(x)$ intersects the x-axis`,
                `1. A zero of a polynomial $p(x)$ is a value of $x$ for which $p(x) = 0$.
2. Geometrically, $y = p(x) = 0$ means the point lies on the x-axis.
3. Therefore, the zeroes correspond to the x-coordinates of the points where the graph intersects the x-axis.`
            ),
            createQuestion(2,
                `If the graph of $y = p(x)$ intersects the x-axis at $(-2, 0)$ and $(3, 0)$, what are the zeroes of $p(x)$?`,
                [`$-2$ and $3$`, `$0$ and $0$`, `$-2$ and $0$`, `$0$ and $3$`],
                `$-2$ and $3$`,
                `1. The zeroes of a polynomial are the x-coordinates of the points where its graph intersects the x-axis.
2. The intersection points are $(-2, 0)$ and $(3, 0)$.
3. The x-coordinates are $-2$ and $3$.
4. Thus, the zeroes are -2 and 3.`
            ),
            createQuestion(3,
                `If a graph of a polynomial cuts the x-axis at exactly 3 points, how many zeroes does the polynomial have?`,
                [`$3$`, `$1$`, `$2$`, `$0$`],
                `$3$`,
                `1. The number of zeroes of a polynomial relates to the number of points where its graph intersects the x-axis.
2. Since the graph intersects the x-axis at exactly 3 points, there are 3 distinct values of $x$ for which $p(x) = 0$.
3. Thus, it has 3 zeroes.`
            ),
            createQuestion(4,
                `The graph of a linear polynomial $ax + b$, where $a \\neq 0$, is a:`,
                [`Straight line`, `Parabola`, `Circle`, `Sine wave`],
                `Straight line`,
                `1. A linear polynomial is of the form $y = ax + b$.
2. This is the equation of a straight line with slope $a$ and y-intercept $b$.
3. Therefore, its graph is a straight line.`
            ),
            createQuestion(5,
                `How many zeroes can a linear polynomial have?`,
                [`Exactly one`, `At most two`, `Exactly two`, `Infinite`],
                `Exactly one`,
                `1. A linear polynomial $ax + b$ ($a \\neq 0$) has a graph that is a straight line.
2. A straight line non-parallel to the x-axis intersects the x-axis exactly once.
3. Since it intersects exactly once, it has exactly one zero.`
            ),
            createQuestion(6,
                `The graph of $y = 2x + 3$ intersects the x-axis at which point?`,
                [`$(-\\frac{3}{2}, 0)$`, `$(0, 3)$`, `$(\\frac{3}{2}, 0)$`, `$(0, -\\frac{3}{2})$`],
                `$(-\\frac{3}{2}, 0)$`,
                `1. The graph intersects the x-axis when $y = 0$.
2. Substitute $y = 0$ into the equation: $0 = 2x + 3$.
3. Solve for $x$: $2x = -3 \\Rightarrow x = -\\frac{3}{2}$.
4. Therefore, the intersection point is $(-\\frac{3}{2}, 0)$.`
            ),
            createQuestion(7,
                `The graph of a quadratic polynomial $ax^2 + bx + c$ has the shape of a:`,
                [`Parabola`, `Straight line`, `Circle`, `Hyperbola`],
                `Parabola`,
                `1. A quadratic polynomial has degree 2.
2. The graph of a function of the form $y = ax^2 + bx + c$ is a U-shaped curve.
3. This U-shaped curve is mathematically called a parabola.`
            ),
            createQuestion(8,
                `A quadratic polynomial can intersect the x-axis at a maximum of how many points?`,
                [`Twice`, `Once`, `Three times`, `Never`],
                `Twice`,
                `1. A quadratic polynomial is an equation of degree 2.
2. A polynomial of degree $n$ can intersect the x-axis at most $n$ times.
3. Therefore, a quadratic polynomial can intersect the x-axis at most twice.`
            ),
            createQuestion(9,
                `If a parabola opens upwards, what can we say about the coefficient $a$ in $ax^2 + bx + c$?`,
                [`$a > 0$`, `$a < 0$`, `$a = 0$`, `cannot be determined`],
                `$a > 0$`,
                `1. For the graph of $y = ax^2 + bx + c$, the orientation of the parabola depends on the sign of $a$.
2. If $a > 0$ (positive), the parabola opens upwards (like a smile).
3. If $a < 0$ (negative), the parabola opens downwards (like a frown).
4. Thus, if it opens upwards, $a > 0$.`
            ),
            createQuestion(10,
                `Which of the following polynomials will have a parabolic graph?`,
                [`$x^2 - 3x + 2$`, `$3x + 2$`, `$x^3 - 1$`, `$5$`],
                `$x^2 - 3x + 2$`,
                `1. A parabolic graph is the graphical representation of a quadratic polynomial (degree 2).
2. Look at the degrees of the options:
   - $x^2 - 3x + 2$: Degree 2
   - $3x + 2$: Degree 1
   - $x^3 - 1$: Degree 3
   - $5$: Degree 0
3. Only $x^2 - 3x + 2$ is a quadratic polynomial, so it will have a parabolic graph.`
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
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(String(userId).includes("-") ? 1 : parseInt(userId, 10), SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        let timer;
        if (!showReportModal) {
            timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [SKILL_ID, showReportModal]);

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
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
                user_id: String(userId).includes("-") ? 1 : parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID,
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

export default GeometricalInterpretation;
