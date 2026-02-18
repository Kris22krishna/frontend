import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = ["✨ Spectacular!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Amazing!"];

// --- Visual Components (Combined for Test) ---
const ShapeVisual = ({ type, name, section, highlighting, viewType }) => {
    const strokeColor = "#31326F";
    const fillColor = "#4FB7B320";
    const highlightColor = "#FF6B6B";
    const dotColor = "#4FB7B340";

    if (viewType === '2D3D') {
        if (type === '2D') {
            if (name === 'Circle') return <svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke={strokeColor} strokeWidth="2" fill={fillColor} /></svg>;
            if (name === 'Triangle') return <svg width="100" height="100" viewBox="0 0 100 100"><path d="M 50 10 L 90 90 L 10 90 Z" stroke={strokeColor} strokeWidth="2" fill={fillColor} /></svg>;
        } else {
            if (name === 'Cube') return (
                <svg width="100" height="100" viewBox="0 0 100 100">
                    <rect x="20" y="30" width="40" height="40" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                    <rect x="35" y="15" width="40" height="40" stroke={strokeColor} strokeWidth="2" fill="none" />
                    <path d="M 20 30 L 35 15 M 60 30 L 75 15 M 20 70 L 35 55 M 60 70 L 75 55" stroke={strokeColor} strokeWidth="2" />
                </svg>
            );
        }
    }

    if (viewType === 'FEV') {
        return (
            <svg width="100" height="100" viewBox="0 0 100 100">
                <rect x="20" y="30" width="50" height="50" fill={highlighting === 'face' ? highlightColor + '40' : fillColor} stroke={strokeColor} strokeWidth="2" />
                <path d="M 70 30 L 90 10 L 90 60 L 70 80 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                <path d="M 20 30 L 40 10 L 90 10 L 70 30 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                {highlighting === 'vertex' && <circle cx="20" cy="30" r="4" fill={highlightColor} />}
                {highlighting === 'edge' && <line x1="20" y1="30" x2="70" y2="30" stroke={highlightColor} strokeWidth="4" />}
            </svg>
        );
    }

    if (viewType === 'Net') {
        return (
            <svg width="100" height="100" viewBox="0 0 100 100">
                <rect x="40" y="10" width="20" height="20" stroke={strokeColor} fill={fillColor} />
                <rect x="20" y="30" width="20" height="20" stroke={strokeColor} fill={fillColor} />
                <rect x="40" y="30" width="20" height="20" stroke={strokeColor} fill={fillColor} />
                <rect x="60" y="30" width="20" height="20" stroke={strokeColor} fill={fillColor} />
                <rect x="40" y="50" width="20" height="20" stroke={strokeColor} fill={fillColor} />
                <rect x="40" y="70" width="20" height="20" stroke={strokeColor} fill={fillColor} />
            </svg>
        );
    }

    if (viewType === 'CrossSection') {
        return (
            <svg width="100" height="100" viewBox="0 0 100 100">
                <ellipse cx="50" cy="20" rx="30" ry="8" stroke={strokeColor} fill={fillColor} />
                <path d="M 20 20 L 20 80 A 30 8 0 0 0 80 80 L 80 20" stroke={strokeColor} fill={fillColor} />
                {section === 'horizontal' ? (
                    <ellipse cx="50" cy="50" rx="30" ry="8" stroke={highlightColor} strokeWidth="2" fill={highlightColor + '20'} />
                ) : (
                    <rect x="50" y="20" width="1" height="60" stroke={highlightColor} strokeWidth="2" />
                )}
            </svg>
        );
    }

    return null;
};

const VisualisingSolidShapesTest = () => {
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

    const SKILL_ID = 1083;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Chapter Test";

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const shuffle = (array) => [...new Set(array)].sort(() => Math.random() - 0.5);

            const generators = [
                // 1. Plane vs Solid
                () => {
                    const is2D = rand(0, 1) === 0;
                    const shape = is2D ? ['Circle', 'Triangle', 'Square'][rand(0, 2)] : ['Cube', 'Sphere', 'Cylinder'][rand(0, 2)];
                    return {
                        type: "2D/3D identification",
                        text: `<p>Identify if the following is a <b>2-D</b> or <b>3-D</b> shape: <b>${shape}</b></p>`,
                        visualInfo: { viewType: '2D3D', type: is2D ? '2D' : '3D', name: shape },
                        correctAnswer: is2D ? "2-D" : "3-D",
                        solution: `${shape} is a ${is2D ? 'flat' : 'solid'} figure.`,
                        options: ["2-D", "3-D"]
                    };
                },
                // 2. F-E-V Counting
                () => {
                    const solid = { name: 'Cube', F: 6, E: 12, V: 8 };
                    const prop = ['F', 'E', 'V'][rand(0, 2)];
                    const label = prop === 'F' ? 'Faces' : prop === 'E' ? 'Edges' : 'Vertices';
                    return {
                        type: "FEV Counting",
                        text: `<p>How many <b>${label}</b> does a <b>${solid.name}</b> have?</p>`,
                        visualInfo: { viewType: 'FEV', highlighting: prop === 'F' ? 'face' : prop === 'E' ? 'edge' : 'vertex' },
                        correctAnswer: String(solid[prop]),
                        solution: `A ${solid.name} has ${solid.F} faces, ${solid.E} edges, and ${solid.V} vertices.`,
                        options: shuffle([String(solid[prop]), String(solid[prop] + 2), String(solid[prop] - 2), "10"])
                    };
                },
                // 3. Nets
                () => {
                    return {
                        type: "Nets",
                        text: "<p>A net of a <b>Cube</b> consists of how many squares?</p>",
                        visualInfo: { viewType: 'Net' },
                        correctAnswer: "6",
                        solution: "Folding 6 squares in the correct pattern forms a cube.",
                        options: ["4", "5", "6", "8"]
                    };
                },
                // 4. Cross Sections
                () => {
                    const isHorizontal = rand(0, 1) === 0;
                    return {
                        type: "Cross Sections",
                        text: `<p>A <b>Cylinder</b> cut <b>${isHorizontal ? 'horizontally' : 'vertically'}</b> gives which cross-section?</p>`,
                        visualInfo: { viewType: 'CrossSection', section: isHorizontal ? 'horizontal' : 'vertical' },
                        correctAnswer: isHorizontal ? "Circle" : "Rectangle",
                        solution: `Horizontal cut of a cylinder is a circle. Vertical cut is a rectangle.`,
                        options: shuffle(["Circle", "Rectangle", "Square", "Triangle"])
                    };
                },
                // 5. Shadows
                () => {
                    return {
                        type: "Shadows",
                        text: "<p>The shadow of a <b>Sphere</b> under a lamp is always a:</p>",
                        correctAnswer: "Circle",
                        solution: "A sphere casts a circular shadow from any angle.",
                        options: shuffle(["Circle", "Square", "Oval", "Triangle"])
                    };
                }
            ];

            for (let i = 0; i < 15; i++) {
                const generator = generators[rand(0, generators.length - 1)];
                newQuestions.push(generator());
            }
            setQuestions(newQuestions);
        };
        generateQuestions();
    }, []);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => setSessionId(sess.session_id)).catch(console.error);
        }
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, [sessionId]);

    const handleCheck = () => {
        if (!selectedOption) return;
        const isRight = selectedOption === questions[qIndex].correctAnswer;
        setIsCorrect(isRight); setIsSubmitted(true);
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) { setSelectedOption(saved.selectedOption); setIsCorrect(saved.isCorrect); setIsSubmitted(true); }
        else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false); }
    }, [qIndex, answers]);

    const handleNext = async () => {
        if (qIndex < questions.length - 1) setQIndex(qIndex + 1);
        else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const correct = Object.values(answers).filter(v => v.isCorrect).length;
                await api.createReport({
                    title: SKILL_NAME, type: 'practice', score: (correct / questions.length) * 100,
                    parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: correct, time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme">
            <header className="junior-practice-header">
                <div className="header-left"></div>
                <div className="question-counter-badge">Chapter Test: {qIndex + 1} / {questions.length}</div>
                <div className="timer-badge">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>
            <main className="practice-content-wrapper">
                <div className="practice-board-container single-column">
                    <div className="question-card-modern">
                        <div className="question-header-modern"><LatexContent html={questions[qIndex].text} /></div>
                        {questions[qIndex].visualInfo && <div style={{ textAlign: 'center' }}><ShapeVisual {...questions[qIndex].visualInfo} /></div>}
                        <div className="interaction-area-modern">
                            <div className="options-grid-modern">
                                {questions[qIndex].options.map((opt, i) => (
                                    <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === questions[qIndex].correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                ))}
                            </div>
                            <AnimatePresence>{isSubmitted && isCorrect && <motion.div className="feedback-mini correct"><img src={mascotImg} alt="Mascot" className="mascot-mini" /><span>{feedbackMessage}</span></motion.div>}</AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>
            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={questions[qIndex].correctAnswer} explanation={questions[qIndex].solution} onClose={() => setShowExplanationModal(false)} />
            <footer className="junior-bottom-bar">
                <div className="bottom-left"><button className="exit-btn" onClick={() => navigate(-1)}>Exit Test</button></div>
                <div className="bottom-center">{isSubmitted && <button className="explain-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}</div>
                <div className="bottom-right">
                    <button className="nav-btn prev" onClick={() => setQIndex(qIndex - 1)} disabled={qIndex === 0}>Prev</button>
                    {isSubmitted ? <button className="nav-btn next" onClick={handleNext}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button> : <button className="nav-btn submit" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}
                </div>
            </footer>
        </div>
    );
};

export default VisualisingSolidShapesTest;
