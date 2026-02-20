import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const RootsByFactorisation = () => {
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

    const SKILL_ID = 10204; // Finding Roots by Factorisation
    const SKILL_NAME = "Finding Roots by Factorisation";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const newQuestions = [];
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // Q1: x^2 - 3x - 10 = 0
        newQuestions.push(createQuestion(1,
            `Find the roots of $x^2 - 3x - 10 = 0$ by factorisation.`,
            [`$5, -2$`, `$2, -5$`, `$5, 2$`, `$-5, -2$`],
            `$5, -2$`,
            `Split middle term $-3x$ as $-5x + 2x$.
$x^2 - 5x + 2x - 10 = x(x-5) + 2(x-5) = (x-5)(x+2) = 0$.
Roots: $x=5, x=-2$.`
        ));

        // Q2: 2x^2 + x - 6 = 0
        newQuestions.push(createQuestion(2,
            `Find roots of $2x^2 + x - 6 = 0$.`,
            [`$3/2, -2$`, `$-3/2, 2$`, `$2, 3$`, `$1, -6$`],
            `$3/2, -2$`,
            `$2 \\times (-6) = -12$. Factors of $-12$ summing to 1 are $4, -3$.
$2x^2 + 4x - 3x - 6 = 2x(x+2) - 3(x+2) = (2x-3)(x+2) = 0$.
Roots: $x=3/2, x=-2$.`
        ));

        // Q3: Root 2
        newQuestions.push(createQuestion(3,
            `Solve: $\\sqrt{2}x^2 + 7x + 5\\sqrt{2} = 0$.`,
            [`$-\\frac{5}{\\sqrt{2}}, -\\sqrt{2}$`, `$\\frac{5}{\\sqrt{2}}, \\sqrt{2}$`, `$-\\sqrt{2}, -5$`, `$1, 5$`],
            `$-\\frac{5}{\\sqrt{2}}, -\\sqrt{2}$`,
            `Prod $= 10$ ($5\\sqrt{2} \\times \\sqrt{2}$). Sum $= 7$. Factors $5, 2$.
$\\sqrt{2}x^2 + 2x + 5x + 5\\sqrt{2} = \\sqrt{2}x(x+\\sqrt{2}) + 5(x+\\sqrt{2}) = (\\sqrt{2}x+5)(x+\\sqrt{2})=0$.
Roots: $-\\frac{5}{\\sqrt{2}}, -\\sqrt{2}$.`
        ));

        // Q4: 100x^2 - 20x + 1 = 0
        newQuestions.push(createQuestion(4,
            `Solve: $100x^2 - 20x + 1 = 0$.`,
            [`$\\frac{1}{10}, \\frac{1}{10}$`, `$\\frac{1}{10}, -\\frac{1}{10}$`, `$-\\frac{1}{10}, -\\frac{1}{10}$`, `$\\frac{1}{20}, \\frac{1}{5}$`],
            `$\\frac{1}{10}, \\frac{1}{10}$`,
            `$(10x - 1)^2 = 0$. Roots: $\\frac{1}{10}, \\frac{1}{10}$.`
        ));

        // Q5: Simple
        newQuestions.push(createQuestion(5,
            `Find roots of $x^2 + 7x + 12 = 0$.`,
            [`$-3, -4$`, `$3, 4$`, `$-3, 4$`, `$3, -4$`],
            `$-3, -4$`,
            `$(x+3)(x+4)=0$. Roots: $-3, -4$.`
        ));

        // Q6: 2x^2 - x + 1/8 = 0
        newQuestions.push(createQuestion(6,
            `Solve: $2x^2 - x + \\frac{1}{8} = 0$.`,
            [`$\\frac{1}{4}, \\frac{1}{4}$`, `$\\frac{1}{8}, \\frac{1}{8}$`, `$\\frac{1}{4}, -\\frac{1}{4}$`, `$\\frac{1}{2}, \\frac{1}{4}$`],
            `$\\frac{1}{4}, \\frac{1}{4}$`,
            `Multiply by 8: $16x^2 - 8x + 1 = 0 \Rightarrow (4x-1)^2 = 0$. Roots: $\\frac{1}{4}, \\frac{1}{4}$.`
        ));

        // Q7: Difference of squares
        newQuestions.push(createQuestion(7,
            `Roots of $4x^2 - 9 = 0$.`,
            [`$\\frac{3}{2}, -\\frac{3}{2}$`, `$3, -3$`, `$\\frac{2}{3}, -\\frac{2}{3}$`, `$\\frac{9}{4}, -\\frac{9}{4}$`],
            `$\\frac{3}{2}, -\\frac{3}{2}$`,
            `$(2x-3)(2x+3)=0$. Roots: $\\frac{3}{2}, -\\frac{3}{2}$.`
        ));

        // Q8: Common term
        newQuestions.push(createQuestion(8,
            `Solve $3x^2 - 6x = 0$.`,
            [`$0, 2$`, `$0, -2$`, `$2, 3$`, `$0, 6$`],
            `$0, 2$`,
            `$3x(x-2)=0$. Roots: $0, 2$.`
        ));

        return newQuestions;
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

export default RootsByFactorisation;
