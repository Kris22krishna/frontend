import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const RealLifeApplications = () => {
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

    const SKILL_ID = 1127; // Applying Quadratic Equations to Real-Life Situations
    const SKILL_NAME = "Applying Quadratic Equations to Real-Life Situations";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const newQuestions = [];
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // Q1: Rectangular Park Feasibility
        newQuestions.push(createQuestion(1,
            `Is it possible to design a rectangular park of perimeter 80\u00A0m and area $400 \\text{ m}^2$?`,
            [`Yes`, `No`],
            `Yes`,
            `$2(l+b)=80 \\Rightarrow l+b=40$. Area $l(40-l)=400 \\Rightarrow 40l - l^2 = 400 \\Rightarrow l^2 - 40l + 400 = 0$.
$D = 1600 - 1600 = 0$. Real roots exist ($l=20$). Yes.`
        ));

        // Q2: Age Problem (Friends)
        newQuestions.push(createQuestion(2,
            `Sum of ages of two friends is 20. Four years ago, product of ages was 48. Is this situation possible?`,
            [`No`, `Yes`],
            `No`,
            `Ages $x, 20-x$. 4 yrs ago: $x-4, 16-x$.
$(x-4)(16-x)=48 \\Rightarrow 16x - x^2 - 64 + 4x = 48 \\Rightarrow -x^2 + 20x - 112 = 0 \\Rightarrow x^2 - 20x + 112 = 0$.
$D = 400 - 448 = -48 < 0$. No real solution.`
        ));

        // Q3: Rectangular Mango Grove
        newQuestions.push(createQuestion(3,
            `Is it possible to have a rectangular mango grove whose length is twice its breadth, and area is $800 \\text{ m}^2$?`,
            [`Yes`, `No`],
            `Yes`,
            `$l = 2b$. Area $l \\times b = 2b^2 = 800 \\Rightarrow b^2 = 400 \\Rightarrow b=20$.
Dimensions 40\u00A0m, 20\u00A0m. Possible.`
        ));

        // Q4: Park Design
        newQuestions.push(createQuestion(4,
            `A circular park has to be designed such that (conditions)... resulting equation $x^2 - 7x + 60 = 0$. Is it possible?`,
            [`No`, `Yes`],
            `No`,
            `$D = (-7)^2 - 4(1)(60) = 49 - 240 = -191 < 0$. Not possible.`
        ));

        // Q5: Upstream Downstream
        newQuestions.push(createQuestion(5,
            `A motor boat taking 1 hr more to go 24\u00A0km upstream than downstream ($v=18 \\text{ km/h}$). Find speed of stream $x$. Eq: $x^2 + 48x - 324 = 0$. Value of x?`,
            [`6\u00A0km/h`, `5\u00A0km/h`, `8\u00A0km/h`, `4\u00A0km/h`],
            `6\u00A0km/h`,
            `$x^2 + 48x - 324 = 0 \\Rightarrow (x+54)(x-6)=0$. Speed must be positive, so $x=6$.`
        ));

        // Q6: Water Taps
        newQuestions.push(createQuestion(6,
            `Two water taps can fill a tank in $9\\frac{3}{8}$ hours. Larger tap takes 10 hr less than smaller. Time for smaller tap ($x$)? Eq: $4x^2 - 115x + 375 = 0$.`,
            [`25\u00A0hr`, `15\u00A0hr`, `30\u00A0hr`, `20\u00A0hr`],
            `25\u00A0hr`,
            `Roots of $4x^2 - 115x + 375 = 0$ are $25, 3.75$.
If $x=3.75$, larger tap takes $3.75 - 10$ (negative). So $x=25$.`
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

export default RealLifeApplications;
