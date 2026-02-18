import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = ["✨ Brilliant!", "🌟 Mastery!", "🎉 Success!", "🚀 Fantastic!"];

const ViewVisual = ({ type, shape, section }) => {
    const strokeColor = "#31326F";
    const fillColor = "#4FB7B320";
    const highlightColor = "#FF6B6B";

    if (type === 'cross-section') {
        const isHorizontal = section === 'horizontal';
        return (
            <svg width="200" height="200" viewBox="0 0 100 100">
                {shape === 'Cylinder' && (
                    <g>
                        <ellipse cx="50" cy="20" rx="25" ry="8" stroke={strokeColor} fill={fillColor} />
                        <path d="M 25 20 L 25 80 A 25 8 0 0 0 75 80 L 75 20" stroke={strokeColor} fill={fillColor} />
                        {isHorizontal ? (
                            <ellipse cx="50" cy="50" rx="25" ry="8" stroke={highlightColor} strokeWidth="2" fill={highlightColor + '20'} />
                        ) : (
                            <rect x="25" y="20" width="1" height="60" stroke={highlightColor} strokeWidth="2" transform="translate(25, 0)" />
                        )}
                    </g>
                )}
                {shape === 'Cube' && (
                    <g>
                        <rect x="20" y="30" width="40" height="40" stroke={strokeColor} fill={fillColor} />
                        <path d="M 20 30 L 40 10 L 80 10 L 60 30 Z" stroke={strokeColor} fill={fillColor} />
                        <path d="M 60 30 L 80 10 L 80 50 L 60 70 Z" stroke={strokeColor} fill={fillColor} />
                        {isHorizontal ? (
                            <path d="M 20 50 L 40 30 L 80 30 L 60 50 Z" stroke={highlightColor} strokeWidth="2" fill={highlightColor + '20'} />
                        ) : (
                            <rect x="40" y="30" width="1" height="40" stroke={highlightColor} strokeWidth="2" transform="translate(5, 0)" />
                        )}
                    </g>
                )}
            </svg>
        );
    }

    if (type === 'shadow') {
        return (
            <svg width="200" height="200" viewBox="0 0 100 100">
                <circle cx="20" cy="20" r="5" fill="#FFD700" />
                <line x1="25" y1="25" x2="45" y2="45" stroke="#FFD700" strokeWidth="1" strokeDasharray="2" />
                {shape === 'Sphere' && <circle cx="50" cy="50" r="20" fill={fillColor} stroke={strokeColor} />}
                {shape === 'Cone' && <path d="M 50 20 L 30 70 L 70 70 Z" fill={fillColor} stroke={strokeColor} />}
                <ellipse cx="70" cy="80" rx={shape === 'Sphere' ? '20' : '25'} ry="5" fill="#00000020" />
            </svg>
        );
    }

    return null;
};

const ViewingSections = () => {
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

    const SKILL_ID = 1082;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Viewing Sections";

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const shuffle = (array) => [...new Set(array)].sort(() => Math.random() - 0.5);

            for (let i = 0; i < 10; i++) {
                let q = {};
                // Subtopic 1: Slicing (Q1-Q4)
                if (i < 4) {
                    const isCube = i < 2;
                    const isHorizontal = i % 2 === 0;
                    q = {
                        type: "Slicing Solids",
                        difficulty_level: "Medium",
                        text: `<p>What <b>cross-section</b> is obtained when a <b>${isCube ? 'Cube' : 'Cylinder'}</b> is cut <b>${isHorizontal ? 'horizontally' : 'vertically'}</b>?</p>`,
                        visual: { type: 'cross-section', shape: isCube ? 'Cube' : 'Cylinder', section: isHorizontal ? 'horizontal' : 'vertical' },
                        correctAnswer: isCube ? "Square" : (isHorizontal ? "Circle" : "Rectangle"),
                        solution: isCube ? "Any cut through a cube (parallel to a face) results in a square." : (isHorizontal ? "A horizontal cut of a standing cylinder is a circle." : "A vertical cut through the center of a cylinder is a rectangle."),
                        options: shuffle(["Square", "Circle", "Rectangle", "Triangle"])
                    };
                }
                // Subtopic 2: Shadows (Q5-Q7)
                else if (i < 7) {
                    const shape = i === 5 ? 'Sphere' : 'Cone';
                    q = {
                        type: "Shadows",
                        difficulty_level: "Medium",
                        text: `<p>What is the shape of the shadow of a <b>${shape}</b> when light falls directly on it from above?</p>`,
                        visual: { type: 'shadow', shape: shape },
                        correctAnswer: "Circle",
                        solution: `Both sphere and cone (from above) cast circular shadows.`,
                        options: shuffle(["Circle", "Square", "Triangle", "Point"])
                    };
                }
                // Subtopic 3: Different Views (Q8-Q10)
                else {
                    const views = ['Top', 'Front', 'Side'];
                    const view = views[i - 8];
                    q = {
                        type: "Different Views",
                        difficulty_level: "Medium",
                        text: `<p>A <b>Glass tumbler</b> looks like a <b>Circle</b> from which view?</p>`,
                        correctAnswer: "Top View",
                        solution: "Looking straight down into a glass tumbler shows its circular opening/base.",
                        options: shuffle(["Top View", "Front View", "Side View", "Bottom View"])
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
            api.createPracticeSession(userId, SKILL_ID).then(sess => setSessionId(sess.session_id)).catch(console.error);
        }
        const t = setInterval(() => setTimeElapsed(v => v + 1), 1000);
        return () => clearInterval(t);
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

    if (questions.length === 0) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page raksha-theme">
            <header className="junior-practice-header">
                <div className="header-left"><span className="topic-title">Viewing Different Sections of a Solid</span></div>
                <div className="question-counter-badge">Question {qIndex + 1} / {questions.length}</div>
                <div className="timer-badge">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container single-column">
                    <div className="question-card-modern">
                        <div className="question-header-modern"><LatexContent html={questions[qIndex].text} /></div>
                        {questions[qIndex].visual && <div style={{ textAlign: 'center' }}><ViewVisual {...questions[qIndex].visual} /></div>}
                        <div className="interaction-area-modern">
                            <div className="options-grid-modern">
                                {questions[qIndex].options.map((opt, idx) => (
                                    <button key={idx} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === questions[qIndex].correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`} onClick={() => !isSubmitted && setSelectedOption(opt)} disabled={isSubmitted}><LatexContent html={opt} /></button>
                                ))}
                            </div>
                            <AnimatePresence>{isSubmitted && isCorrect && <motion.div className="feedback-mini correct"><img src={mascotImg} alt="Mascot" className="mascot-mini" /><span>{feedbackMessage}</span></motion.div>}</AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={questions[qIndex].correctAnswer} explanation={questions[qIndex].solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="bottom-left"><button className="exit-btn" onClick={() => navigate(-1)}>Exit</button></div>
                <div className="bottom-center">{isSubmitted && <button className="explain-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}</div>
                <div className="bottom-right">
                    <button className="nav-btn prev" onClick={() => setQIndex(qIndex - 1)} disabled={qIndex === 0}>Prev</button>
                    {isSubmitted ? <button className="nav-btn next" onClick={() => qIndex < questions.length - 1 ? setQIndex(qIndex + 1) : navigate(-1)}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button> : <button className="nav-btn submit" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}
                </div>
            </footer>
        </div>
    );
};

export default ViewingSections;
