import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, ChevronRight, Check, X, Info, ChevronLeft, Eye, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LatexText } from '../../../LatexText';
import mascotImg from '../../../../assets/mascot.png';
import ExplanationModal from '../../../ExplanationModal';
import PracticeReportModal from '../../PracticeReportModal';
import { useSessionLogger } from "@/hooks/useSessionLogger";
import { NODE_IDS } from "@/lib/curriculumIds";
import '../TenthPracticeSession.css';

const RepresentingSituations = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const nodeId = NODE_IDS.g10MathQuadraticRepresenting;
    const sessionType = "practice";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const newQuestions = [];
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        // Q1: Rectangular Plot (NCERT Example)
        newQuestions.push(createQuestion(1,
            `The area of a rectangular plot is $528 \\text{ m}^2$. The length of the plot (in metres) is one more than twice its breadth. Represent this as a quadratic equation.`,
            [`$2x^2 + x - 528 = 0$`, `$2x^2 - x - 528 = 0$`, `$x^2 + 2x - 528 = 0$`, `$2x^2 + x + 528 = 0$`],
            `$2x^2 + x - 528 = 0$`,
            `Let breadth $= x$. Length $= 2x + 1$. Area $= x(2x+1) = 528 \\Rightarrow 2x^2 + x - 528 = 0$.`
        ));

        // Q2: Consecutive Integers (NCERT)
        newQuestions.push(createQuestion(2,
            `The product of two consecutive positive integers is $306$. Form the quadratic equation to find the integers.`,
            [`$x^2 + x - 306 = 0$`, `$x^2 - x - 306 = 0$`, `$x^2 + x + 306 = 0$`, `$2x^2 + x - 306 = 0$`],
            `$x^2 + x - 306 = 0$`,
            `Let integers be $x$ and $x+1$. Product $= x(x+1) = 306 \\Rightarrow x^2 + x - 306 = 0$.`
        ));

        // Q3: Rohan's Mother
        newQuestions.push(createQuestion(3,
            `Rohan's mother is 26 years older than him. The product of their ages (in years) 3 years from now will be 360. Form the equation.`,
            [`$x^2 + 32x - 273 = 0$`, `$x^2 + 29x - 360 = 0$`, `$x^2 + 32x + 360 = 0$`, `$x^2 + 26x - 360 = 0$`],
            `$x^2 + 32x - 273 = 0$`,
            `Let Rohan's age $= x$. Mother $= x+26$. After 3 years: $(x+3)$ and $(x+29)$. Product: $(x+3)(x+29) = 360 \\Rightarrow x^2 + 32x + 87 = 360 \\Rightarrow x^2 + 32x - 273 = 0$.`
        ));

        // Q4: Train Speed
        newQuestions.push(createQuestion(4,
            `A train travels $480$ km at a uniform speed. If the speed had been $8$ km/h less, it would have taken 3 hours more. Form the equation.`,
            [`$3x^2 - 24x - 3840 = 0$`, `$x^2 - 8x - 1280 = 0$`, `$x^2 + 8x - 1280 = 0$`, `$3x^2 + 24x - 3840 = 0$`],
            `$x^2 - 8x - 1280 = 0$`,
            `Time diff: $\\frac{480}{x-8} - \\frac{480}{x} = 3$. Simplifying: $480x - 480(x-8) = 3x(x-8) \\Rightarrow 3840 = 3x^2 - 24x \\Rightarrow x^2 - 8x - 1280 = 0$.`
        ));

        // Q5: Sum of Squares
        newQuestions.push(createQuestion(5,
            `The sum of squares of two consecutive odd numbers is 290. Form the equation (use $x$ as the smaller number).`,
            [`$x^2 + 2x - 143 = 0$`, `$2x^2 + 4x - 286 = 0$`, `$x^2 + x - 145 = 0$`, `$x^2 + 2x + 143 = 0$`],
            `$x^2 + 2x - 143 = 0$`,
            `Numbers: $x, x+2$. $x^2 + (x+2)^2 = 290 \\Rightarrow 2x^2 + 4x + 4 = 290 \\Rightarrow 2x^2 + 4x - 286 = 0 \\Rightarrow x^2 + 2x - 143 = 0$.`
        ));

        // Q6: Rectangle Perimeter
        newQuestions.push(createQuestion(6,
            `A rectangular field has area $60 \\text{ m}^2$ and perimeter $32 \\text{ m}$. Form the equation for length $x$.`,
            [`$x^2 - 16x + 60 = 0$`, `$x^2 + 16x - 60 = 0$`, `$x^2 - 32x + 60 = 0$`, `$x^2 - 16x - 60 = 0$`],
            `$x^2 - 16x + 60 = 0$`,
            `$2(l+b)=32 \\Rightarrow l+b=16 \\Rightarrow b=16-x$. Area $x(16-x)=60 \\Rightarrow 16x - x^2 = 60 \\Rightarrow x^2 - 16x + 60 = 0$.`
        ));

        // Q7: Two Numbers Sum
        newQuestions.push(createQuestion(7,
            `Sum of two numbers is 15. The sum of their reciprocals is $\\frac{3}{10}$. Form the equation.`,
            [`$x^2 - 15x + 50 = 0$`, `$x^2 + 15x - 50 = 0$`, `$x^2 - 10x + 15 = 0$`, `$x^2 - 15x - 50 = 0$`],
            `$x^2 - 15x + 50 = 0$`,
            `Numbers $x, 15-x$. $\\frac{1}{x} + \\frac{1}{15-x} = \\frac{3}{10} \\Rightarrow \\frac{15}{x(15-x)} = \\frac{3}{10} \\Rightarrow 50 = 15x - x^2 \\Rightarrow x^2 - 15x + 50 = 0$.`
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
        startSession({ nodeId, sessionType });
        let timer;
        if (!showReportModal) {
            timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [nodeId, showReportModal]);

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

        logAnswer({
            question_index: qIndex,
            answer_json: {
                question_text: currentQ.text,
                selected_option: selectedOption,
                correct_answer: currentQ.correctAnswer,
                difficulty: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard'
            },
            is_correct: isRight ? 1 : 0
        });
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            finishSession({
                totalQuestions: questions.length,
                questionsAnswered: Object.keys(answers).length,
                answersPayload: answers
            });
            setShowReportModal(true);
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
                    Representing Situations
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
                                </div>
                                {isSubmitted && isCorrect && (
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1rem' }}>
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ gridColumn: '1 / -1', justifySelf: 'center', textAlign: 'center', width: '100%', marginTop: '20px' }}>
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

export default RepresentingSituations;
