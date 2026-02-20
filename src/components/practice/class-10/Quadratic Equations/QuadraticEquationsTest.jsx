import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const QuadraticEquationsTest = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 10209; // Quadratic Equations Chapter Assessment
    const SKILL_NAME = "Quadratic Equations Chapter Assessment";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const pool = [];
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // Topic 1: Foundations
        pool.push(createQuestion(1, `Which is a quadratic equation?`, [`$2x^2 - 3x + 1 = 0$`, `$x^3 - x = 0$`, `$2x+1=0$`, `$x(x^2+1)=0$`], `$2x^2 - 3x + 1 = 0$`, `Degree 2 equation.`));
        pool.push(createQuestion(2, `The degree of quadratic equation is:`, [`2`, `1`, `3`, `0`], `2`, `Degree is 2.`));

        // Topic 2: Representing
        pool.push(createQuestion(3, `Product of two consecutive integers is 306. Equation?`, [`$x^2 + x - 306 = 0$`, `$x^2 - x - 306 = 0$`, `$2x^2 + x - 306 = 0$`, `$x^2 + x + 306 = 0$`], `$x^2 + x - 306 = 0$`, `$x(x+1)=306$`));

        // Topic 3: Identifying
        pool.push(createQuestion(4, `Is $(x+1)^2 = 2(x-3)$ quadratic?`, [`Yes`, `No`], `Yes`, `$x^2+2x+1=2x-6 \Rightarrow x^2+7=0$. Degree 2.`));
        pool.push(createQuestion(5, `Is $x^2 + 3x + 1 = (x-2)^2$ quadratic?`, [`No`, `Yes`], `No`, `$x^2$ cancels out. Linear.`));

        // Topic 4: Roots by Factorisation
        pool.push(createQuestion(6, `Roots of $x^2 - 3x - 10 = 0$:`, [`$5, -2$`, `$-5, 2$`, `$5, 2$`, `$-5, -2$`], `$5, -2$`, `$(x-5)(x+2)=0$.`));
        pool.push(createQuestion(7, `Roots of $2x^2 + x - 6 = 0$:`, [`$\\frac{3}{2}, -2$`, `$-\\frac{3}{2}, 2$`, `$2, 3$`, `$1, -6$`], `$\\frac{3}{2}, -2$`, `$(2x-3)(x+2)=0$.`));

        // Topic 5: Word Problems Factorisation
        pool.push(createQuestion(8, `Find two numbers whose sum is 27 and product is 182.`, [`13, 14`, `12, 15`, `10, 17`, `9, 18`], `13, 14`, `Roots of $x^2 - 27x + 182 = 0$.`));
        pool.push(createQuestion(9, `Altitude of right triangle is 7\u00A0cm less than base. Hypotenuse 13\u00A0cm. Base?`, [`12\u00A0cm`, `5\u00A0cm`, `10\u00A0cm`, `8\u00A0cm`], `12\u00A0cm`, `Roots of $x^2 - 7x - 60 = 0$ are $12, -5$. Base $12$.`));

        // Topic 6: Nature of Roots
        pool.push(createQuestion(10, `Nature of roots of $2x^2 - 3x + 5 = 0$:`, [`No real roots`, `Two distinct real roots`, `Two equal roots`, `Three real roots`], `No real roots`, `$D = 9 - 40 = -31$.`));
        pool.push(createQuestion(11, `Condition for equal roots?`, [`$b^2 - 4ac = 0$`, `$b^2 - 4ac > 0$`, `$b^2 - 4ac < 0$`, `$b = 0$`], `$b^2 - 4ac = 0$`, `Discriminant is zero.`));

        // Topic 7: Discriminant
        pool.push(createQuestion(12, `Value of $k$ for equal roots in $2x^2 + kx + 3 = 0$:`, [`$\\pm \\sqrt{24}$`, `$6$`, `$\\pm 6$`, `$24$`], `$\\pm \\sqrt{24}$`, `$k^2 - 24 = 0$.`));
        pool.push(createQuestion(13, `Discriminant of $3x^2 - 2x + \\frac{1}{3} = 0$:`, [`0`, `1`, `4`, `-4`], `0`, `$4 - 4(3)(\\frac{1}{3}) = 4-4=0$.`));

        // Topic 8: Real Life
        pool.push(createQuestion(14, `Possible to have rectangular park perimeter 80, area 400?`, [`Yes`, `No`], `Yes`, `$l^2 - 40l + 400 = 0$. $D=0$.`));
        pool.push(createQuestion(15, `Is it possible: Age sum 20, 4\u00A0yrs ago product 48?`, [`No`, `Yes`], `No`, `$D = -48$.`));

        // Mixed
        pool.push(createQuestion(16, `If $1/2$ is a root of $x^2 + kx - \\frac{5}{4} = 0$, find $k$.`, [`2`, `-2`, `$\\frac{1}{2}$`, `$-\\frac{1}{2}$`], `2`, `$(\\frac{1}{2})^2 + k(\\frac{1}{2}) - \\frac{5}{4} = 0 \\Rightarrow \\frac{1}{4} + \\frac{k}{2} - \\frac{5}{4} = 0 \\Rightarrow \\frac{k}{2} - 1 = 0 \\Rightarrow k=2$.`));
        pool.push(createQuestion(17, `Equation $(x+1)^2 - x^2 = 0$ has number of real roots:`, [`1`, `2`, `0`, `Infinite`], `1`, `$x^2+2x+1-x^2=0 \\Rightarrow 2x+1=0 \\Rightarrow x=-1/2$. One root.`));
        pool.push(createQuestion(18, `Roots of $x^2 + 7x + 10 = 0$ are:`, [`$-2, -5$`, `$2, 5$`, `$-2, 5$`, `$2, -5$`], `$-2, -5$`, `$(x+2)(x+5)=0$.`));
        pool.push(createQuestion(19, `Discriminant of $\\sqrt{2}x^2 - \\sqrt{2} = 0$:`, [`8`, `0`, `4`, `-8`], `8`, `$x^2 - 1 = 0$. $a=1, b=0, c=-1$. $D = 0 - 4(1)(-1) = 4$. Or using original: $D = 0 - 4(\\sqrt{2})(-\\sqrt{2}) = 8$.`));
        pool.push(createQuestion(20, `Values of $k$ for which $x^2 + 5kx + 16 = 0$ has no real roots?`, [`$-16/5 < k < 16/5$`, `$k > 16/5$`, `$k < -16/5$`, `$k=0$`], `$-16/5 < k < 16/5$`, `$D < 0 \\Rightarrow 25k^2 - 64 < 0 \\Rightarrow k^2 < 64/25 \\Rightarrow -8/5 < k < 8/5$. Wait. $b=5k, a=1, c=16$. $25k^2 - 64 < 0$. $k^2 < 2.56$. $k \\in (-1.6, 1.6)$. Option logic check: $16/5 = 3.2$. $8/5=1.6$. I'll stick to simple check. Let's fix question for clarity.`));

        // Redoing Q20
        pool.pop();
        pool.push(createQuestion(20, `Find $k$ for equal roots in $9x^2 - 24x + k = 0$.`, [`16`, `12`, `9`, `64`], `16`, `$D = (-24)^2 - 4(9)(k) = 576 - 36k = 0 \\Rightarrow 36k = 576 \\Rightarrow k=16$.`));

        return pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    };

    useEffect(() => {
        setQuestions(generateQuestions());
    }, [SKILL_ID]);

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

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
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

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {SKILL_NAME}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
                    </div>
                </div>
                <div className="header-right" style={{ justifySelf: 'end' }}>
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
                                </div>
                                {isSubmitted && isCorrect && (
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct">
                                            {feedbackMessage}
                                        </motion.div>
                                    </div>
                                )}
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
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}
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
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> View Explanation</button>}
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

export default QuadraticEquationsTest;
