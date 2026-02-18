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

const SolidPropertyVisual = ({ shape, highlighting }) => {
    const strokeColor = "#31326F";
    const highlightColor = "#FF6B6B";
    const fillColor = "#4FB7B320";

    if (shape === 'Cube') {
        return (
            <svg width="200" height="200" viewBox="0 0 100 100">
                {/* Back lines */}
                <line x1="40" y1="20" x2="90" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="2" />
                <line x1="40" y1="20" x2="40" y2="70" stroke={strokeColor} strokeWidth="1" strokeDasharray="2" />
                <line x1="40" y1="20" x2="10" y2="40" stroke={strokeColor} strokeWidth="1" strokeDasharray="2" />

                {/* Faces fill */}
                <rect x="10" y="40" width="50" height="50" fill={highlighting === 'face' ? highlightColor + '40' : fillColor} stroke={strokeColor} strokeWidth="2" />
                <path d="M 60 40 L 90 20 L 90 70 L 60 90 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
                <path d="M 10 40 L 40 20 L 90 20 L 60 40 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2" />

                {/* Edges highlighting */}
                {highlighting === 'edge' && <line x1="10" y1="40" x2="60" y2="40" stroke={highlightColor} strokeWidth="4" />}

                {/* Vertices highlighting */}
                {highlighting === 'vertex' && <circle cx="10" cy="40" r="4" fill={highlightColor} />}
            </svg>
        );
    }

    if (shape === 'Cylinder') {
        return (
            <svg width="200" height="200" viewBox="0 0 100 100">
                <ellipse cx="50" cy="25" rx="35" ry="12" stroke={strokeColor} strokeWidth="2" fill={highlighting === 'face' ? highlightColor + '40' : fillColor} />
                <path d="M 15 25 L 15 75 A 35 12 0 0 0 85 75 L 85 25" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                <ellipse cx="50" cy="75" rx="35" ry="12" stroke={strokeColor} strokeWidth="1" strokeDasharray="4" fill="none" />
                {highlighting === 'face_curved' && <rect x="15" y="25" width="70" height="50" fill={highlightColor + '20'} stroke="none" />}
            </svg>
        );
    }

    if (shape === 'Pyramid') {
        return (
            <svg width="200" height="200" viewBox="0 0 100 100">
                <path d="M 50 10 L 10 80 L 90 80 Z" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
                <line x1="50" y1="10" x2="40" y2="60" stroke={strokeColor} strokeWidth="2" />
                <line x1="10" y1="80" x2="40" y2="60" stroke={strokeColor} strokeWidth="1" strokeDasharray="2" />
                <line x1="90" y1="80" x2="40" y2="60" stroke={strokeColor} strokeWidth="1" strokeDasharray="2" />
                {highlighting === 'vertex_top' && <circle cx="50" cy="10" r="5" fill={highlightColor} />}
            </svg>
        );
    }

    return null;
};

const FacesEdgesVertices = () => {
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

    const SKILL_ID = 1079;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Faces, Edges and Vertices";

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const shuffle = (array) => [...new Set(array)].sort(() => Math.random() - 0.5);

            for (let i = 0; i < 10; i++) {
                let q = {};
                // Subtopic 1: Faces (Q1-Q2)
                if (i < 2) {
                    if (i === 0) {
                        q = {
                            type: "Faces",
                            difficulty_level: "Easy",
                            text: "<p>How many faces does a <b>Cube</b> have?</p>",
                            visual: { shape: 'Cube', highlighting: 'face' },
                            correctAnswer: "6",
                            solution: "A cube has 6 identical square faces.",
                            options: ["4", "6", "8", "12"]
                        };
                    } else {
                        q = {
                            type: "Faces",
                            difficulty_level: "Medium",
                            text: "<p>How many faces does a <b>Cylinder</b> have?</p>",
                            visual: { shape: 'Cylinder', highlighting: 'face' },
                            correctAnswer: "3",
                            solution: "A cylinder has 2 circular flat faces and 1 curved face. Total = $2 + 1 = 3$.",
                            options: ["2", "3", "4", "1"]
                        };
                    }
                }
                // Subtopic 2: Edges (Q3-Q4)
                else if (i < 4) {
                    if (i === 2) {
                        q = {
                            type: "Edges",
                            difficulty_level: "Easy",
                            text: "<p>How many edges does a <b>Cube</b> (or Cuboid) have?</p>",
                            visual: { shape: 'Cube', highlighting: 'edge' },
                            correctAnswer: "12",
                            solution: "A cube has 12 edges (line segments where faces meet).",
                            options: ["6", "8", "12", "16"]
                        };
                    } else {
                        q = {
                            type: "Edges",
                            difficulty_level: "Medium",
                            text: "<p>A <b>Sphere</b> has how many edges?</p>",
                            correctAnswer: "0",
                            solution: "A sphere is perfectly round and has no straight edges.",
                            options: ["0", "1", "2", "Infinite"]
                        };
                    }
                }
                // Subtopic 3: Vertices (Q5-Q6)
                else if (i < 6) {
                    if (i === 4) {
                        q = {
                            type: "Vertices",
                            difficulty_level: "Easy",
                            text: "<p>How many vertices (corners) does a <b>Cube</b> have?</p>",
                            visual: { shape: 'Cube', highlighting: 'vertex' },
                            correctAnswer: "8",
                            solution: "A cube has 8 vertices where the edges meet.",
                            options: ["4", "6", "8", "12"]
                        };
                    } else {
                        q = {
                            type: "Vertices",
                            difficulty_level: "Medium",
                            text: "<p>How many vertices does a <b>Square Pyramid</b> have?</p>",
                            visual: { shape: 'Pyramid', highlighting: 'vertex_top' },
                            correctAnswer: "5",
                            solution: "A square pyramid has 4 vertices at the base and 1 vertex at the top. Total = $4 + 1 = 5$.",
                            options: ["4", "5", "6", "8"]
                        };
                    }
                }
                // Subtopic 4: Counting F-E-V (Q7-Q10)
                else {
                    const solids = [
                        { name: 'Triangular Pyramid (Tetrahedron)', F: 4, E: 6, V: 4 },
                        { name: 'Triangular Prism', F: 5, E: 9, V: 6 },
                        { name: 'Cuboid', F: 6, E: 12, V: 8 },
                        { name: 'Cone', F: 2, E: 1, V: 1 }
                    ];
                    const solid = solids[i - 7];
                    const prop = ['F', 'E', 'V'][Math.floor(Math.random() * 3)];
                    const propName = prop === 'F' ? 'Faces' : prop === 'E' ? 'Edges' : 'Vertices';

                    q = {
                        type: "Counting F-E-V",
                        difficulty_level: "Hard",
                        text: `<p>Find the number of <b>${propName}</b> for a <b>${solid.name}</b>.</p>`,
                        correctAnswer: String(solid[prop]),
                        solution: `For a ${solid.name}:<br/>Faces (F) = ${solid.F}<br/>Edges (E) = ${solid.E}<br/>Vertices (V) = ${solid.V}`,
                        options: shuffle([String(solid[prop]), String(solid[prop] + 2), String(solid[prop] - 1), "10"])
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
        return () => clearInterval(timer);
    }, [sessionId]);

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const isRight = selectedOption === questions[qIndex].correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved) { setSelectedOption(saved.selectedOption); setIsCorrect(saved.isCorrect); setIsSubmitted(true); }
        else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false); }
    }, [qIndex, answers]);

    useEffect(() => { setShowExplanationModal(false); }, [qIndex]);

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme">
            <header className="junior-practice-header">
                <div className="header-left"><span className="topic-title">Faces, Edges and Vertices</span></div>
                <div className="question-counter-badge">Question {qIndex + 1} / {questions.length}</div>
                <div className="timer-badge">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container single-column">
                    <div className="question-card-modern">
                        <div className="question-header-modern"><LatexContent html={currentQuestion.text} /></div>
                        {currentQuestion.visual && <div className="visual-area-container" style={{ textAlign: 'center' }}><SolidPropertyVisual {...currentQuestion.visual} /></div>}
                        <div className="interaction-area-modern">
                            <div className="options-grid-modern">
                                {currentQuestion.options.map((opt, idx) => (
                                    <button key={idx} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                ))}
                            </div>
                            <AnimatePresence>{isSubmitted && isCorrect && <motion.div className="feedback-mini correct"><img src={mascotImg} alt="Mascot" className="mascot-mini" /><span>{feedbackMessage}</span></motion.div>}</AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="bottom-left"><button className="exit-btn" onClick={() => navigate(-1)}>Exit</button></div>
                <div className="bottom-center">{isSubmitted && <button className="explain-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}</div>
                <div className="bottom-right">
                    <button className="nav-btn prev" onClick={() => setQIndex(i => i - 1)} disabled={qIndex === 0}>Prev</button>
                    {isSubmitted ? <button className="nav-btn next" onClick={() => qIndex < questions.length - 1 ? setQIndex(qIndex + 1) : navigate(-1)}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button> : <button className="nav-btn submit" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}
                </div>
            </footer>
        </div>
    );
};

export default FacesEdgesVertices;
