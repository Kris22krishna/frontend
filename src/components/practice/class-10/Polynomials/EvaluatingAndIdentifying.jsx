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

const EvaluatingAndIdentifying = () => {
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

    const SKILL_ID = 1234;
    const SKILL_NAME = "Evaluating Polynomials and Identifying Zeroes";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            createQuestion(1,
                `Find the value of $p(2)$ if $p(x) = x^2 - 3x - 4$.`,
                [`$-6$`, `$-2$`, `$-4$`, `$0$`],
                `$-6$`,
                `1. We need to evaluate the polynomial at $x = 2$.
2. Substitute $x = 2$ in the expression: $p(2) = (2)^2 - 3(2) - 4$.
3. Simplify the terms: $p(2) = 4 - 6 - 4$.
4. Calculate the final value: $p(2) = 4 - 10 = -6$.`
            ),
            createQuestion(2,
                `If $p(x) = 3x^2 - 5x + 2$, find the value of $p(-1)$.`,
                [`$10$`, `$0$`, `$4$`, `$6$`],
                `$10$`,
                `1. We need to evaluate the polynomial at $x = -1$.
2. Substitute $x = -1$ into $p(x)$: $p(-1) = 3(-1)^2 - 5(-1) + 2$.
3. Remember that $(-1)^2 = 1$ and $-5 \\times (-1) = 5$.
4. $p(-1) = 3(1) + 5 + 2 = 3 + 5 + 2 = 10$.`
            ),
            createQuestion(3,
                `A real number $k$ is called a 'zero' of a polynomial $p(x)$ if:`,
                [`$p(k) = 0$`, `$p(k) > 0$`, `$p(k) < 0$`, `$p(k) = 1$`],
                `$p(k) = 0$`,
                `1. A zero of a polynomial $p(x)$ is defined as any real value $k$ for which the value of the polynomial evaluates to zero.
2. Mathematically, this is written as $p(k) = 0$.`
            ),
            createQuestion(4,
                `Check whether $-2$ or $2$ are zeroes of the polynomial $p(x) = x + 2$.`,
                [`$-2$ is a zero, $2$ is not`, `$2$ is a zero, $-2$ is not`, `Both $-2$ and $2$ are zeroes`, `Neither is a zero`],
                `$-2$ is a zero, $2$ is not`,
                `1. Evaluate $p(x)$ at $x = -2$: $p(-2) = (-2) + 2 = 0$. Since the result is 0, $-2$ is a zero.
2. Evaluate $p(x)$ at $x = 2$: $p(2) = (2) + 2 = 4$. Since the result is not 0, $2$ is not a zero.
3. Therefore, $-2$ is a zero, but $2$ is not.`
            ),
            createQuestion(5,
                `Find the zero of the linear polynomial $p(x) = 2x + 3$.`,
                [`$-\\frac{3}{2}$`, `$\\frac{3}{2}$`, `$-\\frac{2}{3}$`, `$\\frac{2}{3}$`],
                `$-\\frac{3}{2}$`,
                `1. To find the zero of a polynomial, we set $p(x) = 0$.
2. So, $2x + 3 = 0$.
3. We isolate $x$: subtract 3 from both sides to get $2x = -3$.
4. Divide by 2 to get $x = -\\frac{3}{2}$.`
            ),
            createQuestion(6,
                `What is the zero of the general linear polynomial $p(x) = cx + d$, where $c \\neq 0$?`,
                [`$-\\frac{d}{c}$`, `$\\frac{d}{c}$`, `$-\\frac{c}{d}$`, `$\\frac{c}{d}$`],
                `$-\\frac{d}{c}$`,
                `1. To find the zero of $p(x) = cx + d$, we equate it to zero: $cx + d = 0$.
2. Subtract $d$ from both sides: $cx = -d$.
3. Divide by $c$: $x = -\\frac{d}{c}$.
4. Therefore, the zero of $cx + d$ is $-\\frac{d}{c}$.`
            ),
            createQuestion(7,
                `Is $x = \\frac{4}{3}$ a zero of the polynomial $p(x) = 3x - 4$?`,
                [`Yes, because $p(\\frac{4}{3}) = 0$`, `No, because $p(\\frac{4}{3}) \\neq 0$`, `Yes, because $p(x)$ is linear`, `No, because it is a fraction`],
                `Yes, because $p(\\frac{4}{3}) = 0$`,
                `1. Evaluate the polynomial at $x = \\frac{4}{3}$.
2. $p(\\frac{4}{3}) = 3(\\frac{4}{3}) - 4$.
3. The 3s cancel out: $p(\\frac{4}{3}) = 4 - 4 = 0$.
4. Since the value is zero, $x = \\frac{4}{3}$ is a zero of the polynomial.`
            ),
            createQuestion(8,
                `Determine if $x = -1$ is a zero of the polynomial $p(x) = x^3 + x^2 + x + 1$.`,
                [`Yes`, `No`, `Cannot be determined`, `Only if $x=1$`],
                `Yes`,
                `1. We evaluate $p(x)$ at $x = -1$.
2. $p(-1) = (-1)^3 + (-1)^2 + (-1) + 1$.
3. Calculate each term: $(-1)^3 = -1$ and $(-1)^2 = 1$.
4. Substitute back: $p(-1) = -1 + 1 - 1 + 1 = 0$.
5. Since $p(-1) = 0$, $x = -1$ is a zero.`
            ),
            createQuestion(9,
                `Find the zero of the polynomial $p(y) = 5 - \\frac{1}{2}y$.`,
                [`$10$`, `$-10$`, `$\\frac{5}{2}$`, `$-\\frac{5}{2}$`],
                `$10$`,
                `1. Set the polynomial equal to zero: $5 - \\frac{1}{2}y = 0$.
2. Isolate the term with $y$: $5 = \\frac{1}{2}y$.
3. Multiply both sides by 2 to solve for $y$: $y = 5 \\times 2 = 10$.
4. Therefore, the zero is 10.`
            ),
            createQuestion(10,
                `If $x = 2$ is a zero of the polynomial $p(x) = 2x^2 - 3x + k$, what is the value of $k$?`,
                [`$-2$`, `$2$`, `$0$`, `$4$`],
                `$-2$`,
                `1. Since $x = 2$ is a zero of $p(x)$, it means $p(2) = 0$.
2. Substitute $x = 2$ into the polynomial: $p(2) = 2(2)^2 - 3(2) + k = 0$.
3. Simplify the terms: $p(2) = 2(4) - 6 + k = 0$.
4. $8 - 6 + k = 0$, which gives $2 + k = 0$.
5. Therefore, $k = -2$.`
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

export default EvaluatingAndIdentifying;
