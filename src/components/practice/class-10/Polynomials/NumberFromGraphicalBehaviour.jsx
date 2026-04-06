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

const NODE_ID = 'a4101002-0004-0000-0000-000000000000'; // Number of Zeroes from Graphical Behaviour

const NumberFromGraphicalBehaviour = () => {
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

    const SKILL_ID = 1236;
    const SKILL_NAME = "Number of Zeroes from Graphical Behaviour";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            createQuestion(1,
                `How many zeroes does a quadratic polynomial have if its graph intersects the x-axis at two distinct points?`,
                [`$2$`, `$1$`, `$0$`, `$3$`],
                `$2$`,
                `1. The number of real zeroes of a polynomial is equal to the number of times its graph intersects the x-axis.
2. The graph intersects the x-axis at two distinct points.
3. Therefore, the quadratic polynomial has exactly 2 zeroes.`
            ),
            createQuestion(2,
                `If the graph of a quadratic polynomial touches the x-axis at exactly one point, how many distinct zeroes does it have?`,
                [`$1$`, `$2$`, `$0$`, `$3$`],
                `$1$`,
                `1. The zeroes of a polynomial correspond to the points where the graph touches or crosses the x-axis.
2. Since the graph touches the x-axis at exactly one point, it has one distinct zero (which is basically two equal zeroes).
3. Therefore, it has 1 distinct zero.`
            ),
            createQuestion(3,
                `What can be said about the zeroes of a quadratic polynomial if its graph is completely above the x-axis and does not intersect it at all?`,
                [`It has no real zeroes`, `It has one real zero`, `It has two real zeroes`, `It has infinite real zeroes`],
                `It has no real zeroes`,
                `1. Real zeroes exist only if the graph intersects or touches the x-axis.
2. Since the graph never intersects the x-axis, the polynomial evaluates to zero for no real values of x.
3. Thus, it has no real zeroes.`
            ),
            createQuestion(4,
                `A quadratic polynomial can have at most how many zeroes?`,
                [`$2$`, `$1$`, `$3$`, `$0$`],
                `$2$`,
                `1. A quadratic polynomial has a degree of 2.
2. A polynomial of degree $n$ can have at most $n$ real zeroes.
3. Therefore, a quadratic polynomial can have at most 2 zeroes.`
            ),
            createQuestion(5,
                `The graph of a cubic polynomial can intersect the x-axis at most how many times?`,
                [`$3$`, `$2$`, `$1$`, `$4$`],
                `$3$`,
                `1. A cubic polynomial has a degree of 3.
2. The maximum number of intersections with the x-axis is equal to the degree of the polynomial.
3. Therefore, the graph can intersect the x-axis at most 3 times.`
            ),
            createQuestion(6,
                `What is the maximum number of zeroes a cubic polynomial can have?`,
                [`$3$`, `$2$`, `$4$`, `$1$`],
                `$3$`,
                `1. A cubic polynomial is an equation of degree 3.
2. The maximum number of zeroes is equal to the degree.
3. Hence, a cubic polynomial can have at most 3 zeroes.`
            ),
            createQuestion(7,
                `In general, a polynomial of degree $n$ has at most how many zeroes?`,
                [`$n$`, `$n+1$`, `$n-1$`, `$n/2$`],
                `$n$`,
                `1. According to the fundamental theorem of algebra, a polynomial of degree $n$ can have at most $n$ real roots (zeroes).
2. The graph of such a polynomial will intersect the x-axis at most $n$ times.`
            ),
            createQuestion(8,
                `If a polynomial graph cuts the x-axis at 4 distinct points, what is the minimum degree of the polynomial?`,
                [`$4$`, `$3$`, `$2$`, `$5$`],
                `$4$`,
                `1. If a graph cuts the x-axis at $k$ distinct points, the polynomial must have at least $k$ distinct zeroes.
2. A polynomial with 4 distinct zeroes must have a degree of at least 4.
3. Therefore, the minimum degree is 4.`
            ),
            createQuestion(9,
                `True or False: A cubic polynomial always has exactly 3 real zeroes.`,
                [`False`, `True`, `Only if $a > 0$`, `Only if $d = 0$`],
                `False`,
                `1. A cubic polynomial has *at most* 3 real zeroes.
2. Depending on the shape of its graph, it could intersect the x-axis exactly 1, 2, or 3 times.
3. For example, $y = x^3$ only intersects the x-axis at $x = 0$ (one real root).
4. Therefore, the statement is False.`
            ),
            createQuestion(10,
                `If the graph of $y = p(x)$ crosses the x-axis at $x = 1, x = -2$ and only touches it at $x = 3$, what is the minimum possible degree of $p(x)$?`,
                [`$4$`, `$3$`, `$2$`, `$5$`],
                `$4$`,
                `1. Crossing the x-axis at $x = 1$ gives a linear factor $(x-1)^1$. This contributes 1 to the degree.
2. Crossing the x-axis at $x = -2$ gives a linear factor $(x+2)^1$. This contributes 1 to the degree.
3. Touching (but not crossing) the x-axis at $x = 3$ implies a repeated root of even multiplicity, smallest being 2, so a factor of $(x-3)^2$. This contributes 2 to the degree.
4. Total minimum degree = $1 + 1 + 2 = 4$.`
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

export default NumberFromGraphicalBehaviour;
