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

const ShapeVisual = ({ type, name }) => {
    const strokeColor = "#31326F";
    const fillColor = "#4FB7B320";

    if (type === '2D') {
        switch (name) {
            case 'Circle':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                    </svg>
                );
            case 'Triangle':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <path d="M 50 10 L 90 90 L 10 90 Z" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                    </svg>
                );
            case 'Rectangle':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <rect x="10" y="25" width="80" height="50" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                    </svg>
                );
            case 'Square':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <rect x="20" y="20" width="60" height="60" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                    </svg>
                );
            default: return null;
        }
    }

    if (type === '3D') {
        switch (name) {
            case 'Cube':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <rect x="20" y="30" width="50" height="50" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                        <rect x="35" y="15" width="50" height="50" stroke={strokeColor} strokeWidth="2" fill="none" />
                        <line x1="20" y1="30" x2="35" y2="15" stroke={strokeColor} strokeWidth="2" />
                        <line x1="70" y1="30" x2="85" y2="15" stroke={strokeColor} strokeWidth="2" />
                        <line x1="20" y1="80" x2="35" y2="65" stroke={strokeColor} strokeWidth="2" />
                        <line x1="70" y1="80" x2="85" y2="65" stroke={strokeColor} strokeWidth="2" />
                    </svg>
                );
            case 'Sphere':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                        <ellipse cx="50" cy="50" rx="40" ry="15" stroke={strokeColor} strokeWidth="1" strokeDasharray="4" fill="none" />
                    </svg>
                );
            case 'Cylinder':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <ellipse cx="50" cy="20" rx="30" ry="10" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                        <path d="M 20 20 L 20 80 A 30 10 0 0 0 80 80 L 80 20" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                        <ellipse cx="50" cy="80" rx="30" ry="10" stroke={strokeColor} strokeWidth="1" strokeDasharray="4" fill="none" />
                    </svg>
                );
            case 'Cone':
                return (
                    <svg width="150" height="150" viewBox="0 0 100 100">
                        <path d="M 50 10 L 20 80 A 30 10 0 0 0 80 80 Z" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                        <ellipse cx="50" cy="80" rx="30" ry="10" stroke={strokeColor} strokeWidth="1" strokeDasharray="4" fill="none" />
                    </svg>
                );
            default: return null;
        }
    }
    return null;
};

const PlaneFiguresSolidShapes = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [answers, setAnswers] = useState({});
    const [sessionId, setSessionId] = useState(null);

    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1078; // Example ID
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Introduction";

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => [...new Set(array)].sort(() => Math.random() - 0.5);

            for (let i = 0; i < 10; i++) {
                let q = {};
                // Subtopic 1: 2-D and 3-D shapes (Q1-Q4)
                if (i < 4) {
                    const shapes2D = ['Circle', 'Triangle', 'Rectangle', 'Square'];
                    const shapes3D = ['Cube', 'Sphere', 'Cylinder', 'Cone'];
                    const is2D = i % 2 === 0;
                    const shapeName = is2D ? shapes2D[rand(0, 3)] : shapes3D[rand(0, 3)];

                    if (i < 3) {
                        q = {
                            type: "2-D and 3-D shapes",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Identify whether the following shape is 2-D or 3-D:</p>
                                      <div class='visual-anchor'>${shapeName}</div>
                                   </div>`,
                            visual: { type: is2D ? '2D' : '3D', name: shapeName },
                            correctAnswer: is2D ? "2-D" : "3-D",
                            solution: `A ${shapeName} is a ${is2D ? 'plane figure (flat)' : 'solid shape (occupies space)'}, so it is a ${is2D ? '2-D' : '3-D'} shape.`,
                            options: ["2-D", "3-D"]
                        };
                    } else {
                        const objects = ['Sphere', 'Rectangle', 'Cuboid', 'Triangle', 'Circle'];
                        const target = objects[rand(0, 2)];
                        const isSpace = ['Sphere', 'Cuboid'].includes(target);
                        q = {
                            type: "2-D and 3-D shapes",
                            difficulty_level: "Easy",
                            text: `<div class='question-container'>
                                      <p>Which of the following occupies space (3-D)?</p>
                                   </div>`,
                            correctAnswer: isSpace ? target : 'Sphere',
                            solution: `3-D shapes like Sphere, Cube, and Cuboid occupy space. 2-D shapes are flat.`,
                            options: shuffle(['Sphere', 'Rectangle', 'Triangle', 'Circle'])
                        };
                    }
                }
                // Subtopic 2: Identifying solids in real life (Q5-Q7)
                else if (i < 7) {
                    const solids = [
                        { name: 'Cylinder', examples: ['Gas Pipe', 'Coke Can', 'Log of wood'] },
                        { name: 'Cone', examples: ['Ice-cream cone', 'Birthday cap', 'Traffic cone'] },
                        { name: 'Sphere', examples: ['Football', 'Cricket ball', 'Orange'] }
                    ];
                    const solid = solids[i - 4];
                    q = {
                        type: "Identifying solids",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>Which object is typically shaped like a <b>${solid.name}</b>?</p>
                               </div>`,
                        correctAnswer: solid.examples[rand(0, 2)],
                        solution: `A ${solid.name} has a curved surface and circular ends (for cylinder/cone) or is perfectly round (sphere).`,
                        options: shuffle([solid.examples[0], 'A flat book', 'A square tile', 'A piece of paper'])
                    };
                }
                // Subtopic 3: Matching shapes with names (Q8-Q10)
                else {
                    const targetShapes = [
                        { name: 'Cube', desc: 'A dice' },
                        { name: 'Cylinder', desc: 'A pipe' },
                        { name: 'Cone', desc: 'A funnel' }
                    ];
                    const target = targetShapes[i - 8];
                    q = {
                        type: "Matching shapes",
                        difficulty_level: "Medium",
                        text: `<div class='question-container'>
                                  <p>What is the shape of <b>${target.desc}</b>?</p>
                                  <div class='visual-anchor'>${target.name}</div>
                               </div>`,
                        visual: { type: '3D', name: target.name },
                        correctAnswer: target.name,
                        solution: `${target.desc} is an example of a ${target.name}.`,
                        options: shuffle(['Cube', 'Cylinder', 'Cone', 'Sphere'])
                    };
                }
                newQuestions.push(q);
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);

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

    const recordAttempt = async (question, selected, isCorrect) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        const seconds = Math.round(timeSpent / 1000);

        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: question.difficulty_level || 'Easy',
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
        recordAttempt(currentQuestion, selectedOption, isRight);
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) {
            setSelectedOption(saved.selectedOption);
            setIsCorrect(saved.isCorrect);
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
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / questions.length) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: questions.length,
                        correct_answers: totalCorrect,
                        time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    if (questions.length === 0) return <div className="loading-screen">Loading...</div>;

    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme">
            <header className="junior-practice-header">
                <div className="header-left">
                    <span className="topic-title">Introduction: Plane Figures and Solid Shapes</span>
                </div>
                <div className="question-counter-badge">
                    Question {qIndex + 1} / {questions.length}
                </div>
                <div className="timer-badge">
                    {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container single-column">
                    <div className="question-card-modern">
                        <div className="question-header-modern">
                            <LatexContent html={currentQuestion.text} />
                        </div>

                        {currentQuestion.visual && (
                            <div className="visual-area-container" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                <ShapeVisual {...currentQuestion.visual} />
                            </div>
                        )}

                        <div className="interaction-area-modern">
                            <div className="options-grid-modern">
                                {currentQuestion.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                        onClick={() => !isSubmitted && setSelectedOption(option)}
                                        disabled={isSubmitted}
                                    >
                                        <LatexContent html={option} />
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence>
                                {isSubmitted && isCorrect && (
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct">
                                        <img src={mascotImg} alt="Mascot" className="mascot-mini" />
                                        <span>{feedbackMessage}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
            />

            <footer className="junior-bottom-bar">
                <div className="bottom-left">
                    <button className="exit-btn" onClick={() => navigate(-1)}>Exit</button>
                </div>
                <div className="bottom-center">
                    {isSubmitted && <button className="explain-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}
                </div>
                <div className="bottom-right">
                    <button className="nav-btn prev" onClick={() => setQIndex(i => i - 1)} disabled={qIndex === 0}>Prev</button>
                    {isSubmitted ? (
                        <button className="nav-btn next" onClick={handleNext}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="nav-btn submit" onClick={handleCheck} disabled={!selectedOption}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default PlaneFiguresSolidShapes;
