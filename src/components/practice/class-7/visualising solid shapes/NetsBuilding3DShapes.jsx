import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = ["✨ Amazing!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Super!"];

const NetVisual = ({ shape, type }) => {
    const strokeColor = "#31326F";
    const fillColor = "#4FB7B320";

    if (shape === 'Cube') {
        return (
            <svg width="200" height="200" viewBox="0 0 100 100">
                {/* Cross-shaped net */}
                <rect x="35" y="10" width="20" height="20" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
                <rect x="15" y="30" width="20" height="20" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
                <rect x="35" y="30" width="20" height="20" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
                <rect x="55" y="30" width="20" height="20" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
                <rect x="35" y="50" width="20" height="20" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
                <rect x="35" y="70" width="20" height="20" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
            </svg>
        );
    }

    if (shape === 'Cylinder') {
        return (
            <svg width="200" height="200" viewBox="0 0 100 100">
                <rect x="20" y="35" width="60" height="30" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
                <circle cx="50" cy="20" r="15" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
                <circle cx="50" cy="80" r="15" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
            </svg>
        );
    }

    if (shape === 'Cone') {
        return (
            <svg width="200" height="200" viewBox="0 0 100 100">
                <path d="M 50 10 A 40 40 0 0 0 15 50 L 50 50 Z" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
                <circle cx="25" cy="70" r="15" stroke={strokeColor} strokeWidth="1" fill={fillColor} />
            </svg>
        );
    }

    return null;
};

const NetsBuilding3DShapes = () => {
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

    const SKILL_ID = 1080;
    const SKILL_NAME = "Class 7 - Visualising Solid Shapes - Nets";

    useEffect(() => {
        const generateQuestions = () => {
            const newQuestions = [];
            const shuffle = (array) => [...new Set(array)].sort(() => Math.random() - 0.5);

            for (let i = 0; i < 10; i++) {
                let q = {};
                // Subtopic 1: Meaning (Q1-Q2)
                if (i < 2) {
                    q = {
                        type: "Meaning of Nets",
                        difficulty_level: "Easy",
                        text: i === 0 ? "<p>What is a <b>net</b> of a solid?</p>" : "<p>What shape is formed when a net of a <b>cuboid</b> is folded?</p>",
                        correctAnswer: i === 0 ? "A 2D skeleton outline" : "Cuboid",
                        solution: i === 0 ? "A net is a 2-dimensional skeleton-outline of a solid that can be folded to make the solid." : "Folding a cuboid net results in a 3D cuboid.",
                        options: i === 0 ? ["A 2D skeleton outline", "A photo of the solid", "A shadow", "A top view"] : ["Cuboid", "Cube", "Sphere", "Triangle"]
                    };
                }
                // Subtopic 2: Nets of cube/cuboid (Q3-Q5)
                else if (i < 5) {
                    const solid = i === 4 ? 'Cuboid' : 'Cube';
                    q = {
                        type: `Nets of ${solid}`,
                        difficulty_level: "Medium",
                        text: `<p>How many square faces should a <b>${solid}</b> net have?</p>`,
                        visual: { shape: solid },
                        correctAnswer: i === 4 ? "6" : "6",
                        solution: "Both a cube and a cuboid have 6 faces, so their nets must consist of 6 regions (squares or rectangles).",
                        options: ["4", "5", "6", "8"]
                    };
                }
                // Subtopic 3: Nets of cylinder/cone (Q6-Q8)
                else if (i < 8) {
                    const isCylinder = i < 7;
                    q = {
                        type: "Nets of Curved Solids",
                        difficulty_level: "Medium",
                        text: `<p>Identify the parts in the net of a <b>${isCylinder ? 'Cylinder' : 'Cone'}</b>.</p>`,
                        visual: { shape: isCylinder ? 'Cylinder' : 'Cone' },
                        correctAnswer: isCylinder ? "1 Rectangle, 2 Circles" : "1 Sector, 1 Circle",
                        solution: isCylinder ? "A cylinder net consists of a rectangle (curved surface) and two circles (bases)." : "A cone net consists of a sector (curved surface) and one circle (base).",
                        options: isCylinder ? ["1 Rectangle, 2 Circles", "2 Rectangles, 1 Circle", "3 Circles", "1 Square, 2 Circles"] : ["1 Sector, 1 Circle", "2 Sectors", "1 Triangle, 1 Circle", "1 Rectangle, 1 Circle"]
                    };
                }
                // Subtopic 4: Identifying correct nets (Q9-Q10)
                else {
                    q = {
                        type: "Identifying Nets",
                        difficulty_level: "Hard",
                        text: "<p>Which of these solid shapes is formed by folding 4 equilateral triangles?</p>",
                        correctAnswer: "Tetrahedron",
                        solution: "A tetrahedron (triangular pyramid) can be made from a net of 4 equilateral triangles.",
                        options: ["Tetrahedron", "Cube", "Cone", "Prism"]
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
    const currentQuestion = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme">
            <header className="junior-practice-header">
                <div className="header-left"><span className="topic-title">Nets for Building 3-D Shapes</span></div>
                <div className="question-counter-badge">Question {qIndex + 1} / {questions.length}</div>
                <div className="timer-badge">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container single-column">
                    <div className="question-card-modern">
                        <div className="question-header-modern"><LatexContent html={currentQuestion.text} /></div>
                        {currentQuestion.visual && <div style={{ textAlign: 'center' }}><NetVisual {...currentQuestion.visual} /></div>}
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
                    <button className="nav-btn prev" onClick={() => setQIndex(qIndex - 1)} disabled={qIndex === 0}>Prev</button>
                    {isSubmitted ? <button className="nav-btn next" onClick={() => qIndex < questions.length - 1 ? setQIndex(qIndex + 1) : navigate(-1)}>{qIndex < questions.length - 1 ? "Next" : "Done"}</button> : <button className="nav-btn submit" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}
                </div>
            </footer>
        </div>
    );
};

export default NetsBuilding3DShapes;
