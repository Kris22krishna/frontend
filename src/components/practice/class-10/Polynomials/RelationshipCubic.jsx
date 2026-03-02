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

const RelationshipCubic = () => {
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

    const SKILL_ID = 1239;
    const SKILL_NAME = "Relationship Between Zeroes and Coefficients (Cubic)";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            createQuestion(1,
                `For a cubic polynomial $ax^3 + bx^2 + cx + d$, what is the sum of its zeroes ($\\alpha, \\beta, \\gamma$)?`,
                [`$-\\frac{b}{a}$`, `$\\frac{c}{a}$`, `$-\\frac{d}{a}$`, `$\\frac{b}{a}$`],
                `$-\\frac{b}{a}$`,
                `1. The standard form of a cubic polynomial is $ax^3 + bx^2 + cx + d$.
2. The sum of its zeroes is $\\alpha + \\beta + \\gamma = -\\frac{\\text{coefficient of } x^2}{\\text{coefficient of } x^3} = -\\frac{b}{a}$.`
            ),
            createQuestion(2,
                `For a cubic polynomial $ax^3 + bx^2 + cx + d$, what is the sum of the product of its zeroes taken two at a time ($\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha$)?`,
                [`$\\frac{c}{a}$`, `$-\\frac{b}{a}$`, `$-\\frac{d}{a}$`, `$\\frac{d}{a}$`],
                `$\\frac{c}{a}$`,
                `1. The standard form of a cubic polynomial is $ax^3 + bx^2 + cx + d$.
2. The sum of the product of zeroes taken two at a time is $\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac{\\text{coefficient of } x}{\\text{coefficient of } x^3} = \\frac{c}{a}$.`
            ),
            createQuestion(3,
                `For a cubic polynomial $ax^3 + bx^2 + cx + d$, what is the product of its zeroes ($\\alpha\\beta\\gamma$)?`,
                [`$-\\frac{d}{a}$`, `$\\frac{d}{a}$`, `$-\\frac{b}{a}$`, `$\\frac{c}{a}$`],
                `$-\\frac{d}{a}$`,
                `1. The standard form of a cubic polynomial is $ax^3 + bx^2 + cx + d$.
2. The product of its zeroes is $\\alpha\\beta\\gamma = -\\frac{\\text{constant term}}{\\text{coefficient of } x^3} = -\\frac{d}{a}$.`
            ),
            createQuestion(4,
                `Find the sum of the zeroes of the cubic polynomial $2x^3 - 5x^2 - 14x + 8$.`,
                [`$\\frac{5}{2}$`, `$-\\frac{5}{2}$`, `$-7$`, `$4$`],
                `$\\frac{5}{2}$`,
                `1. The polynomial is $2x^3 - 5x^2 - 14x + 8$.
2. Compare with $ax^3 + bx^2 + cx + d$: $a=2, b=-5, c=-14, d=8$.
3. Sum of zeroes $= -\\frac{b}{a} = -\\frac{-5}{2} = \\frac{5}{2}$.`
            ),
            createQuestion(5,
                `Find the product of the zeroes of the cubic polynomial $3x^3 - 5x^2 - 11x - 3$.`,
                [`$1$`, `$-1$`, `$\\frac{11}{3}$`, `$-\\frac{11}{3}$`],
                `$1$`,
                `1. The polynomial is $3x^3 - 5x^2 - 11x - 3$.
2. Compare with $ax^3 + bx^2 + cx + d$: $a=3, b=-5, c=-11, d=-3$.
3. Product of zeroes is $\\alpha\\beta\\gamma = -\\frac{d}{a} = -\\frac{-3}{3} = 1$.`
            ),
            createQuestion(6,
                `Find the sum of the product of zeroes taken two at a time for $x^3 - 4x^2 + 5x - 2$.`,
                [`$5$`, `$-5$`, `$4$`, `$-2$`],
                `$5$`,
                `1. The polynomial is $x^3 - 4x^2 + 5x - 2$.
2. Compare with $ax^3 + bx^2 + cx + d$: $a=1, b=-4, c=5, d=-2$.
3. Sum of product of zeroes taken two at a time $= \\frac{c}{a} = \\frac{5}{1} = 5$.`
            ),
            createQuestion(7,
                `If visually looking at $2x^3 + x^2 - 5x + 2$, what is the formula to calculate $\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha$?`,
                [`$\\frac{c}{a}$`, `$-\\frac{b}{a}$`, `$-\\frac{d}{a}$`, `$\\frac{a}{c}$`],
                `$\\frac{c}{a}$`,
                `1. For any cubic polynomial $ax^3 + bx^2 + cx + d$, the expression $\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha$ is the sum of products of zeroes taken two at a time.
2. The established formula for this relationship is $\\frac{c}{a}$.`
            ),
            createQuestion(8,
                `A cubic polynomial has sum of zeroes $= 2$, sum of product of zeroes taken two at a time $= -7$, and product of zeroes $= -14$. Which of the following can be the polynomial?`,
                [`$x^3 - 2x^2 - 7x + 14$`, `$x^3 + 2x^2 - 7x - 14$`, `$x^3 - 2x^2 + 7x + 14$`, `$x^3 + 2x^2 + 7x - 14$`],
                `$x^3 - 2x^2 - 7x + 14$`,
                `1. Given $S_1 = \\alpha + \\beta + \\gamma = 2$.
2. Given $S_2 = \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = -7$.
3. Given $P = \\alpha\\beta\\gamma = -14$.
4. A cubic polynomial can be written as $k[x^3 - S_1 x^2 + S_2 x - P]$.
5. Substituting the values (for $k=1$): $x^3 - 2x^2 + (-7)x - (-14) = x^3 - 2x^2 - 7x + 14$.`
            ),
            createQuestion(9,
                `If two zeroes of the polynomial $x^3 - 4x^2 - 3x + 12$ are $\\sqrt{3}$ and $-\\sqrt{3}$, find its third zero.`,
                [`$4$`, `$-4$`, `$3$`, `$-3$`],
                `$4$`,
                `1. The polynomial is $x^3 - 4x^2 - 3x + 12$. Here $a=1, b=-4, c=-3, d=12$.
2. Sum of zeroes $\\alpha + \\beta + \\gamma = -\\frac{b}{a} = -\\frac{-4}{1} = 4$.
3. Let $\\alpha = \\sqrt{3}$ and $\\beta = -\\sqrt{3}$.
4. Then $\\sqrt{3} + (-\\sqrt{3}) + \\gamma = 4 \\Rightarrow 0 + \\gamma = 4 \\Rightarrow \\gamma = 4$.
5. The third zero is 4.`
            ),
            createQuestion(10,
                `If the zeroes of the polynomial $x^3 - 3x^2 + x + 1$ are $a - b$, $a$, $a + b$, find the value of $a$.`,
                [`$1$`, `$-1$`, `$3$`, `$-3$`],
                `$1$`,
                `1. The polynomial is $x^3 - 3x^2 + x + 1$. Here, leading coeff is 1, $x^2$ coeff is -3.
2. Sum of zeroes = $(a - b) + a + (a + b) = 3a$.
3. From the formula, Sum of zeroes $= -\\frac{\\text{coeff of } x^2}{\\text{coeff of } x^3} = -\\frac{-3}{1} = 3$.
4. Equating the two: $3a = 3 \\Rightarrow a = 1$.`
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

export default RelationshipCubic;
