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

const RelationshipQuadratic = () => {
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

    const SKILL_ID = 1237;
    const SKILL_NAME = "Relationship Between Zeroes and Coefficients (Quadratic)";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            createQuestion(1,
                `For a quadratic polynomial $ax^2 + bx + c$, what is the sum of its zeroes (let's say $\\alpha$ and $\\beta$)?`,
                [`$-\\frac{b}{a}$`, `$\\frac{c}{a}$`, `$\\frac{b}{a}$`, `$-\\frac{c}{a}$`],
                `$-\\frac{b}{a}$`,
                `1. Standard form of a quadratic polynomial is $ax^2 + bx + c$.
2. The relationship between its zeroes ($\\alpha$, $\\beta$) and coefficients is:
   Sum of zeroes $= \\alpha + \\beta = -\\frac{\\text{coefficient of } x}{\\text{coefficient of } x^2} = -\\frac{b}{a}$.`
            ),
            createQuestion(2,
                `What is the product of the zeroes of the quadratic polynomial $ax^2 + bx + c$?`,
                [`$\\frac{c}{a}$`, `$-\\frac{b}{a}$`, `$\\frac{b}{a}$`, `$-\\frac{c}{a}$`],
                `$\\frac{c}{a}$`,
                `1. Standard form of a quadratic polynomial is $ax^2 + bx + c$.
2. The relationship between its zeroes ($\\alpha$, $\\beta$) and coefficients is:
   Product of zeroes $= \\alpha \\beta = \\frac{\\text{constant term}}{\\text{coefficient of } x^2} = \\frac{c}{a}$.`
            ),
            createQuestion(3,
                `Find the sum of the zeroes of the polynomial $x^2 - 5x + 6$.`,
                [`$5$`, `$-5$`, `$6$`, `$-6$`],
                `$5$`,
                `1. The given polynomial is $x^2 - 5x + 6$.
2. Comparing with $ax^2 + bx + c$, we get $a = 1, b = -5, c = 6$.
3. Sum of zeroes $= -\\frac{b}{a} = -\\frac{-5}{1} = 5$.`
            ),
            createQuestion(4,
                `Find the product of the zeroes of the polynomial $2x^2 + 7x + 3$.`,
                [`$\\frac{3}{2}$`, `$-\\frac{7}{2}$`, `$3$`, `$2$`],
                `$\\frac{3}{2}$`,
                `1. The polynomial is $2x^2 + 7x + 3$.
2. Comparing with $ax^2 + bx + c$, we get $a = 2, b = 7, c = 3$.
3. Product of zeroes $= \\frac{c}{a} = \\frac{3}{2}$.`
            ),
            createQuestion(5,
                `If one zero of the polynomial $x^2 - 4x + 1$ is $2 + \\sqrt{3}$, what is the sum of the zeroes?`,
                [`$4$`, `$-4$`, `$2 - \\sqrt{3}$`, `$1$`],
                `$4$`,
                `1. The polynomial is $x^2 - 4x + 1$.
2. Comparing with $ax^2 + bx + c$, we get $a = 1, b = -4, c = 1$.
3. Sum of zeroes $= -\\frac{b}{a} = -\\frac{-4}{1} = 4$.
(Even though one zero is given, the sum is independent of calculating the individual zeroes from the formula).`
            ),
            createQuestion(6,
                `If $\\alpha$ and $\\beta$ are zeroes of $x^2 - 7x + 10$, evaluate $\\alpha + \\beta$.`,
                [`$7$`, `$10$`, `$-7$`, `$-10$`],
                `$7$`,
                `1. The given polynomial is $x^2 - 7x + 10$.
2. Note that $a=1, b=-7, c=10$.
3. The sum of zeroes is $\\alpha + \\beta = -\\frac{b}{a}$.
4. $\\alpha + \\beta = -\\frac{-7}{1} = 7$.`
            ),
            createQuestion(7,
                `If the product of zeroes of $kx^2 + 6x + 4$ is $2$, find the value of $k$.`,
                [`$2$`, `$4$`, `$-2$`, `$8$`],
                `$2$`,
                `1. The polynomial is $kx^2 + 6x + 4$. Here $a=k, b=6, c=4$.
2. Product of zeroes $= \\frac{c}{a} = \\frac{4}{k}$.
3. We are given the product is $2$, so: $\\frac{4}{k} = 2$.
4. Solving for $k$, we get $k = \\frac{4}{2} = 2$.`
            ),
            createQuestion(8,
                `If $\\alpha$ and $\\beta$ are zeroes of $3x^2 - 6x + 4$, find the value of $\\alpha^2 + \\beta^2$.`,
                [`$\\frac{4}{3}$`, `$4$`, `$\\frac{8}{3}$`, `$\\frac{16}{9}$`],
                `$\\frac{4}{3}$`,
                `1. From the polynomial, $a=3, b=-6, c=4$.
2. Sum of zeroes: $\\alpha + \\beta = -\\frac{-6}{3} = 2$.
3. Product of zeroes: $\\alpha \\beta = \\frac{4}{3}$.
4. Use the identity: $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$.
5. Substituting the values: $2^2 - 2(\\frac{4}{3}) = 4 - \\frac{8}{3} = \\frac{12 - 8}{3} = \\frac{4}{3}$.`
            ),
            createQuestion(9,
                `If one zero of $3x^2 + 8x + k$ is the reciprocal of the other, find the value of $k$.`,
                [`$3$`, `$\\frac{1}{3}$`, `$-3$`, `$8$`],
                `$3$`,
                `1. Let the zeroes be $\\alpha$ and $\\frac{1}{\\alpha}$.
2. The product of zeroes is $\\alpha \\times \\frac{1}{\\alpha} = 1$.
3. From the polynomial coefficients, product of zeroes $= \\frac{c}{a} = \\frac{k}{3}$.
4. Therefore, $\\frac{k}{3} = 1 \\Rightarrow k = 3$.`
            ),
            createQuestion(10,
                `If the sum of zeroes of $kx^2 + 2x + 3k$ is equal to their product, find $k$.`,
                [`$-\\frac{2}{3}$`, `$\\frac{2}{3}$`, `$3$`, `$-3$`],
                `$-\\frac{2}{3}$`,
                `1. The polynomial is $kx^2 + 2x + 3k$. Compare with $ax^2 + bx + c$, we have $a=k, b=2, c=3k$.
2. Sum of zeroes $= -\\frac{b}{a} = -\\frac{2}{k}$.
3. Product of zeroes $= \\frac{c}{a} = \\frac{3k}{k} = 3$.
4. According to the condition, Sum = Product: $-\\frac{2}{k} = 3$.
5. Solving for $k$, we get $k = -\\frac{2}{3}$.`
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

export default RelationshipQuadratic;
