import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = ["✨ Excellent!", "🌟 Great!", "🎉 Correct!", "🚀 Amazing!"];

const GridVisual = ({ type, shape }) => {
    const strokeColor = "#31326F";
    const dotColor = "#4FB7B340";
    const fillColor = "#4FB7B320";

    const renderGrid = () => {
        let dots = [];
        for (let i = 10; i <= 90; i += 10) {
            for (let j = 10; j <= 90; j += 10) {
                dots.push(<circle key={`${i}-${j}`} cx={i} cy={j} r="1" fill={dotColor} />);
            }
        }
        return dots;
    };

    const renderIsometricGrid = () => {
        let dots = [];
        for (let j = 10; j <= 90; j += 10) {
            let offset = (j / 10) % 2 === 0 ? 5 : 0;
            for (let i = 10 + offset; i <= 90; i += 10) {
                dots.push(<circle key={`${i}-${j}`} cx={i} cy={j} r="1" fill={dotColor} />);
            }
        }
        return dots;
    };

    return (
        <svg width="200" height="200" viewBox="0 0 100 100">
            {type === 'oblique' ? renderGrid() : renderIsometricGrid()}
            {type === 'oblique' && (
                <g>
                    <rect x="20" y="40" width="30" height="30" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
                    <rect x="30" y="30" width="30" height="30" stroke={strokeColor} strokeWidth="1.5" fill="none" />
                    <line x1="20" y1="40" x2="30" y2="30" stroke={strokeColor} strokeWidth="1.5" />
                    <line x1="50" y1="40" x2="60" y2="30" stroke={strokeColor} strokeWidth="1.5" />
                    <line x1="20" y1="70" x2="30" y2="60" stroke={strokeColor} strokeWidth="1.5" />
                    <line x1="50" y1="70" x2="60" y2="60" stroke={strokeColor} strokeWidth="1.5" />
                </g>
            )}
            {type === 'isometric' && (
                <g>
                    {/* Simplified Isometric Cube outline */}
                    <path d="M 50 30 L 70 40 L 50 50 L 30 40 Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
                    <path d="M 30 40 L 30 60 L 50 70 L 50 50 Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
                    <path d="M 70 40 L 70 60 L 50 70 L 50 50 Z" stroke={strokeColor} strokeWidth="1.5" fill={fillColor} />
                </g>
            )}
        </svg>
    );
};

const DrawingSolids = () => {
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
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Drawing Solids";

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const shuffle = (array) => [...new Set(array)].sort(() => Math.random() - 0.5);

            for (let i = 0; i < 10; i++) {
                let q = {};
                // Subtopic 1: Oblique Sketches (Q1-Q2)
                if (i < 2) {
                    q = {
                        type: "Oblique Sketches",
                        difficulty_level: "Easy",
                        text: i === 0 ? "<p>On which type of paper do we draw <b>Oblique</b> sketches?</p>" : "<p>In an Oblique sketch, are the proportions of the solid maintained accurately?</p>",
                        visual: { type: 'oblique' },
                        correctAnswer: i === 0 ? "Squared (Grid) Paper" : "No",
                        solution: i === 0 ? "Oblique sketches are typically drawn on squared paper." : "In oblique sketches, the sizes are not proportional; we just get a sense of 3D.",
                        options: i === 0 ? ["Squared (Grid) Paper", "Isometric Dot Paper", "Plain Paper", "Lined Paper"] : ["Yes", "No", "Only for cubes"]
                    };
                }
                // Subtopic 2: Isometric Sketches (Q3-Q4)
                else if (i < 4) {
                    q = {
                        type: "Isometric Sketches",
                        difficulty_level: "Medium",
                        text: i === 2 ? "<p>An <b>Isometric</b> sketch is drawn on which type of paper?</p>" : "<p>Does an Isometric sketch show accurate proportional measurements?</p>",
                        visual: { type: 'isometric' },
                        correctAnswer: i === 2 ? "Isometric Dot Paper" : "Yes",
                        solution: i === 2 ? "Isometric sketches use dot paper where dots form small equilateral triangles." : "Yes, isometric sketches maintain proportional lengths.",
                        options: i === 2 ? ["Isometric Dot Paper", "Squared Paper", "Tracing Paper"] : ["Yes", "No"]
                    };
                }
                // Subtopic 3: Differences (Q5-Q6)
                else if (i < 6) {
                    q = {
                        type: "Difference between sketches",
                        difficulty_level: "Medium",
                        text: "<p>Which sketch shows the <b>true dimensions</b> of the solid?</p>",
                        correctAnswer: "Isometric Sketch",
                        solution: "Isometric sketches are designed to represent the true dimensions of the solid.",
                        options: ["Isometric Sketch", "Oblique Sketch"]
                    };
                }
                // Subtopic 4: Visualising hidden parts (Q7-Q10)
                else {
                    const cubes = [8, 12, 16, 20][i - 7];
                    q = {
                        type: "Visualising hidden parts",
                        difficulty_level: "Hard",
                        text: `<p>If a stack is made of 2 layers of ${cubes / 2} cubes each, how many cubes are there in total?</p>`,
                        correctAnswer: String(cubes),
                        solution: `Total cubes = Layer 1 + Layer 2 = ${cubes / 2} + ${cubes / 2} = ${cubes}.`,
                        options: shuffle([String(cubes), String(cubes + 2), String(cubes / 2), "10"])
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
                <div className="header-left"><span className="topic-title">Drawing Solids on a Flat Surface</span></div>
                <div className="question-counter-badge">Question {qIndex + 1} / {questions.length}</div>
                <div className="timer-badge">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container single-column">
                    <div className="question-card-modern">
                        <div className="question-header-modern"><LatexContent html={questions[qIndex].text} /></div>
                        {questions[qIndex].visual && <div style={{ textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '15px' }}><GridVisual {...questions[qIndex].visual} /></div>}
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

export default DrawingSolids;
