import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

const ComparisonOfRationalNumbers = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 'local-rn-compare';
    const SKILL_NAME = "Class 7 - Rational Numbers - Comparison";
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => {
                const unique = [...new Set(array)];
                return unique.sort(() => Math.random() - 0.5);
            };

            for (let i = 0; i < 10; i++) {
                let q = {};
                // Topic 6: Comparison of Rational Numbers
                // Subtopic 1: Comparing positive rational numbers (Q0-Q3)
                // Subtopic 2: Comparing negative rational numbers (Q4-Q7)
                // Subtopic 3: Comparing positive and negative numbers (Q8-Q9)

                if (i < 4) {
                    // Subtopic 1: Positive rational numbers
                    if (i === 0) {
                        // Compare 2/3 and 5/7
                        const n1 = 2, d1 = 3;
                        const n2 = 5, d2 = 7;
                        q = {
                            type: "Compare Logic",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Compare $\\frac{${n1}}{${d1}}$ and $\\frac{${n2}}{${d2}}$.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${n1}}{${d1}} < \\frac{${n2}}{${d2}}$`,
                            solution: `Cross multiply: $2 \\times 7 = 14$ and $3 \\times 5 = 15$. Since $14 < 15$, $\\frac{2}{3} < \\frac{5}{7}$.`,
                            options: shuffle([
                                `$\\frac{${n1}}{${d1}} < \\frac{${n2}}{${d2}}$`,
                                `$\\frac{${n1}}{${d1}} > \\frac{${n2}}{${d2}}$`,
                                `$\\frac{${n1}}{${d1}} = \\frac{${n2}}{${d2}}$`,
                                `Cannot be compared`
                            ])
                        };
                    } else if (i === 1) {
                        const n1 = rand(2, 5);
                        const d1 = rand(n1 + 1, 9);
                        // Generate greater
                        const n2 = n1 + 2;
                        const d2 = d1;
                        q = {
                            type: "Compare Same Denom",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Which is greater: $\\frac{${n1}}{${d1}}$ or $\\frac{${n2}}{${d2}}$?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${n2}}{${d2}}$`,
                            solution: `Denominators are same. ${n2} > ${n1}, so $\\frac{${n2}}{${d2}}$ is greater.`,
                            options: shuffle([
                                `$\\frac{${n2}}{${d2}}$`,
                                `$\\frac{${n1}}{${d1}}$`,
                                `Equal`,
                                `Undefined`
                            ])
                        };
                    } else if (i === 2) {
                        q = {
                            type: "Compare Same Num",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Which is smaller: $\\frac{5}{8}$ or $\\frac{5}{12}$?</p>
                                   </div>`,
                            correctAnswer: `$\\frac{5}{12}$`,
                            solution: `With the same numerator, the fraction with the larger denominator is smaller.`,
                            options: shuffle([
                                `$\\frac{5}{12}$`,
                                `$\\frac{5}{8}$`,
                                `Equal`,
                                `Undefined`
                            ])
                        };
                    } else {
                        // random comparison
                        const n1 = rand(1, 3);
                        const d1 = rand(4, 5);
                        const n2 = rand(4, 5);
                        const d2 = rand(6, 7);
                        // calculate values
                        const v1 = n1 / d1;
                        const v2 = n2 / d2;
                        const correct = v1 > v2 ? `$\\frac{${n1}}{${d1}} > \\frac{${n2}}{${d2}}$` : (v1 < v2 ? `$\\frac{${n1}}{${d1}} < \\frac{${n2}}{${d2}}$` : `Equal`);
                        q = {
                            type: "Compare Random",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Compare $\\frac{${n1}}{${d1}}$ and $\\frac{${n2}}{${d2}}$.</p>
                                   </div>`,
                            correctAnswer: correct,
                            solution: `Convert to decimals or cross multiply to compare.`,
                            options: shuffle([
                                `$\\frac{${n1}}{${d1}} < \\frac{${n2}}{${d2}}$`,
                                `$\\frac{${n1}}{${d1}} > \\frac{${n2}}{${d2}}$`,
                                `$\\frac{${n1}}{${d1}} = \\frac{${n2}}{${d2}}$`,
                                `None`
                            ])
                        };
                        // Clean up duplicate options if strict equality happens
                        q.options = shuffle([
                            `$\\frac{${n1}}{${d1}} < \\frac{${n2}}{${d2}}$`,
                            `$\\frac{${n1}}{${d1}} > \\frac{${n2}}{${d2}}$`,
                            `$\\frac{${n1}}{${d1}} = \\frac{${n2}}{${d2}}$`
                        ]);
                        // remove correct then add it back to ensure uniqueness
                        q.options = q.options.filter(o => o !== correct);
                        q.options.push(correct);
                        // Fill to 4
                        while (q.options.length < 4) q.options.push("Invalid");
                        q.options = shuffle(q.options);
                    }
                } else if (i < 8) {
                    // Subtopic 2: Comparing negative rational numbers
                    if (i === 4) {
                        const n1 = -1, d1 = 2;
                        const n2 = -1, d2 = 5;
                        q = {
                            type: "Compare Negatives 1",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Compare $\\frac{-1}{2}$ and $\\frac{-1}{5}$.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-1}{5} > \\frac{-1}{2}$`,
                            solution: `$\\frac{-1}{5} = -0.2$ and $\\frac{-1}{2} = -0.5$. Since $-0.2 > -0.5$, $\\frac{-1}{5}$ is greater.`,
                            options: shuffle([
                                `$\\frac{-1}{5} > \\frac{-1}{2}$`,
                                `$\\frac{-1}{5} < \\frac{-1}{2}$`,
                                `$\\frac{-1}{5} = \\frac{-1}{2}$`,
                                `Cannot compare`
                            ])
                        };
                    } else if (i === 5) {
                        const n = rand(2, 5);
                        q = {
                            type: "Compare Zero Neg",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Compare $\\frac{-${n}}{7}$ and 0.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-${n}}{7} < 0$`,
                            solution: `Any negative rational number is always less than 0.`,
                            options: shuffle([
                                `$\\frac{-${n}}{7} < 0$`,
                                `$\\frac{-${n}}{7} > 0$`,
                                `$\\frac{-${n}}{7} = 0$`,
                                `Undefined`
                            ])
                        };
                    } else if (i === 6) {
                        const n1 = -rand(3, 5);
                        const d1 = 7;
                        const n2 = -rand(1, 2);
                        const d2 = 7;
                        q = {
                            type: "Compare Neg Same Denom",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                       <p>Which is smaller: $\\frac{${n1}}{${d1}}$ or $\\frac{${n2}}{${d2}}$?</p>
                                    </div>`,
                            correctAnswer: `$\\frac{${n1}}{${d1}}$`,
                            solution: `Since ${n1} < ${n2} (more negative), $\\frac{${n1}}{${d1}}$ is smaller.`,
                            options: shuffle([
                                `$\\frac{${n1}}{${d1}}$`,
                                `$\\frac{${n2}}{${d2}}$`,
                                `Equal`,
                                `None`
                            ])
                        };
                    } else {
                        // random neg
                        const n1 = -rand(2, 3);
                        const d1 = rand(3, 4);
                        const n2 = -rand(4, 5);
                        const d2 = rand(5, 6);
                        const v1 = n1 / d1;
                        const v2 = n2 / d2;
                        const correct = v1 > v2 ? `$\\frac{${n1}}{${d1}}$` : `$\\frac{${n2}}{${d2}}$`;

                        q = {
                            type: "Compare Random Neg",
                            difficulty_level: "Hard",
                            text: `<div class='question-container'>
                                       <p>Which is greater: $\\frac{${n1}}{${d1}}$ or $\\frac{${n2}}{${d2}}$?</p>
                                    </div>`,
                            correctAnswer: correct,
                            solution: `Convert to decimals: $\\frac{${n1}}{${d1}} \\approx ${v1.toFixed(2)}$ and $\\frac{${n2}}{${d2}} \\approx ${v2.toFixed(2)}$. The greater value is ${correct}.`,
                            options: shuffle([
                                `$\\frac{${n1}}{${d1}}$`,
                                `$\\frac{${n2}}{${d2}}$`,
                                `Equal`,
                                `Undefined`
                            ])
                        };
                    }
                } else {
                    // Subtopic 3: Positive vs Negative
                    if (i === 8) {
                        const p = rand(1, 10);
                        const n = -rand(1, 10);
                        q = {
                            type: "Pos vs Neg",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Compare $\\frac{${p}}{3}$ and $\\frac{${n}}{5}$.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{${p}}{3} > \\frac{${n}}{5}$`,
                            solution: `A positive rational number is always greater than a negative rational number.`,
                            options: shuffle([
                                `$\\frac{${p}}{3} > \\frac{${n}}{5}$`,
                                `$\\frac{${p}}{3} < \\frac{${n}}{5}$`,
                                `$\\frac{${p}}{3} = \\frac{${n}}{5}$`,
                                `Depends on values`
                            ])
                        };
                    } else {
                        q = {
                            type: "Mixed Order",
                            difficulty_level: "Medium",
                            text: `<div class='question-container'>
                                      <p>Arrange in ascending order: $\\frac{2}{3}, 0, \\frac{-1}{2}$.</p>
                                   </div>`,
                            correctAnswer: `$\\frac{-1}{2}, 0, \\frac{2}{3}$`,
                            solution: `Negative < Zero < Positive. So $\\frac{-1}{2} < 0 < \\frac{2}{3}$.`,
                            options: shuffle([
                                `$\\frac{-1}{2}, 0, \\frac{2}{3}$`,
                                `$\\frac{2}{3}, 0, \\frac{-1}{2}$`,
                                `$0, \\frac{-1}{2}, \\frac{2}{3}$`,
                                `$\\frac{-1}{2}, \\frac{2}{3}, 0$`
                            ])
                        };
                    }
                }

                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    // ... Standard boilerplate methods ...
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

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
    }, [sessionId]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) {
            timeSpent += Date.now() - questionStartTime.current;
        }
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: question.difficulty_level || 'Medium',
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQuestion = questions[qIndex];

        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

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

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) {
                await api.finishSession(sessionId).catch(console.error);
            }
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                try {
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
                    });
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            navigate(-1);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    if (questions.length === 0) return <div>Loading...</div>;

    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Comparison of Rational Numbers</span>
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

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}>
                                    <LatexContent html={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                    {isSubmitted && isCorrect && (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="feedback-mini correct"
                                            style={{ marginTop: '20px' }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img src={mascotImg} alt="Mascot" className="w-12 h-12 object-contain" />
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

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => { setShowExplanationModal(false); }}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            Exit Practice
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrevious} disabled={qIndex === 0}>
                                <ChevronLeft size={28} strokeWidth={3} /> Prev
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button
                            className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <X size={20} />
                        </button>
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={handlePrevious} disabled={qIndex === 0}>
                                <ChevronLeft size={20} />
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < questions.length - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ComparisonOfRationalNumbers;
