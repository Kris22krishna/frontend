import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../../Navbar';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';

const SKILL_NAME = 'Toy Joy - Chapter Test';
const TOPIC_NAME = 'Toy Joy';

const generateQuestions = () => {
    return [
        {
            id: 1,
            text: 'Which 3D shape has a pointed top and one flat circular base?',
            options: ['Cube', 'Cylinder', 'Cone', 'Sphere'],
            correct: 'Cone',
            explanation: 'A cone has exactly ONE flat circular base at the bottom and a pointed tip at the top. An ice-cream cone and a birthday cap are real-life examples.'
        },
        {
            id: 2,
            text: 'Which shape looks like a ball and has NO flat faces at all?',
            options: ['Cylinder', 'Cuboid', 'Cube', 'Sphere'],
            correct: 'Sphere',
            explanation: 'A sphere is perfectly round with only a curved surface — it has no flat faces and no edges. A football and a globe are spheres.'
        },
        {
            id: 3,
            text: "Jaya's rocket uses 1 cone, 1 cylinder, and 3 cuboids. How many shapes does she use in total?",
            options: ['3', '4', '5', '6'],
            correct: '5',
            explanation: '1 cone + 1 cylinder + 3 cuboids = 1 + 1 + 3 = 5 shapes in total.'
        },
        {
            id: 4,
            text: 'A model uses 2 cones, 1 cylinder, and 3 cuboids. How many shapes are used in total?',
            options: ['4', '5', '6', '7'],
            correct: '6',
            explanation: '2 cones + 1 cylinder + 3 cuboids = 2 + 1 + 3 = 6 shapes in total.'
        },
        {
            id: 5,
            text: 'In a stack of shapes, the cylinder is on top of the cuboid. Where is the cuboid?',
            options: ['On top of the cylinder', 'Under the cylinder', 'Next to the cylinder', 'Between two cylinders'],
            correct: 'Under the cylinder',
            explanation: 'If the cylinder is ON TOP of the cuboid, then the cuboid must be UNDER the cylinder. "On top of" and "under" are opposite position words.'
        },
        {
            id: 6,
            text: 'A cone is placed ON TOP of a cylinder. Where is the cylinder?',
            options: ['Above the cone', 'Next to the cone', 'Under the cone', 'Inside the cone'],
            correct: 'Under the cone',
            explanation: 'If the cone is on top of the cylinder, the cylinder is UNDER the cone. The cone sits above and the cylinder supports it from below.'
        },
        {
            id: 7,
            text: 'How many flat faces does a cube have?',
            options: ['4', '5', '6', '8'],
            correct: '6',
            explanation: 'A cube has exactly 6 flat faces — top, bottom, front, back, left and right. All 6 faces are equal squares.'
        },
        {
            id: 8,
            text: 'Which 3D shape has NO edges and NO vertices (corners)?',
            options: ['Cube', 'Cuboid', 'Cone', 'Sphere'],
            correct: 'Sphere',
            explanation: 'A sphere has no edges and no corners (vertices) — it is a perfectly smooth round shape with only one curved surface.'
        },
        {
            id: 9,
            text: 'Devika puts a cylinder, cone, and sphere in one group. What do they have in common?',
            options: ['All have only flat faces', 'All have curved surfaces', 'All have 6 faces', 'All have 8 corners'],
            correct: 'All have curved surfaces',
            explanation: 'Cylinder, Cone, and Sphere all have at least one curved surface. Cube and Cuboid are the shapes with ONLY flat faces.'
        },
        {
            id: 10,
            text: 'A die (dice) and a sugar cube belong to which shape group?',
            options: ['Cylinder', 'Cuboid', 'Cube', 'Sphere'],
            correct: 'Cube',
            explanation: 'A die and a sugar cube are both shaped like a CUBE — all 6 faces are equal squares of the same size.'
        },
        {
            id: 11,
            text: 'On a standard die, opposite faces always add up to 7. What number is opposite to face showing 2?',
            options: ['3', '4', '5', '6'],
            correct: '5',
            explanation: 'Opposite faces of a die always sum to 7. So face showing 2 is opposite to 7 - 2 = 5.'
        },
        {
            id: 12,
            text: 'What shape do you get when you join 3 cubes in a row?',
            options: ['A bigger cube', 'A sphere', 'A longer cuboid', 'A cylinder'],
            correct: 'A longer cuboid',
            explanation: 'When you join 3 cubes in a row, you get a LONGER CUBOID — it still has 6 flat rectangular faces, but is now wider than it is tall.'
        },
        {
            id: 13,
            text: 'Jaya stacks 2 cubes on top of each other. What shape is formed?',
            options: ['A taller cube', 'A cylinder', 'A cuboid', 'A cone'],
            correct: 'A cuboid',
            explanation: 'When 2 cubes are stacked, the combined shape is a CUBOID (taller than a single cube). Joining box shapes always gives another box-shaped (cuboid) result.'
        },
        {
            id: 14,
            text: "To build Jaya's rocket (cuboid base, cylinder middle, cone top), which shape should be placed FIRST?",
            options: ['Cone', 'Cylinder', 'Sphere', 'Cuboid'],
            correct: 'Cuboid',
            explanation: 'When building a model, always start from the BASE (bottom). The cuboid is the base of the rocket, so it is placed FIRST on the ground.'
        },
        {
            id: 15,
            text: 'In a model: "Cylinder is ON the cuboid, cone is ON the cylinder." What is the CORRECT order from bottom to top?',
            options: [
                'Cone → Cylinder → Cuboid',
                'Cuboid → Cone → Cylinder',
                'Cylinder → Cuboid → Cone',
                'Cuboid → Cylinder → Cone'
            ],
            correct: 'Cuboid → Cylinder → Cone',
            explanation: 'The description says: cylinder is ON the cuboid (so cuboid is below cylinder), cone is ON the cylinder (so cylinder is below cone). Bottom to top: Cuboid → Cylinder → Cone.'
        },
    ];
};

const ToyJoyTest = () => {
    const navigate = useNavigate();
    const { startSession, logAnswer, finishSession } = useSessionLogger();

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);

    const [questions] = useState(generateQuestions());
    const totalQuestions = questions.length;

    useEffect(() => {
        startSession({ nodeId: NODE_IDS.g3MathToyJoyTest, sessionType: 'assessment' });
    }, [startSession]);

    useEffect(() => {
        let interval;
        if (!showResults) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showResults]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    useEffect(() => {
        if (answers[qIndex]) {
            setSelectedOption(answers[qIndex].selectedOption);
            setIsAnswered(true);
        } else {
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [qIndex, answers]);

    const handleExit = () => {
        navigate('/junior/grade/3');
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
        const currentQ = questions[qIndex];
        const isCorrect = option === currentQ.correct;

        setIsAnswered(true);
        if (isCorrect) setScore(s => s + 1);

        logAnswer({
            question_index: qIndex,
            answer_json: {
                question_text: currentQ.text,
                selected: option,
                correct: currentQ.correct,
                isCorrect
            },
            is_correct: isCorrect ? 1 : 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: currentQ.explanation || 'Detailed explanation coming soon!'
            }
        }));

        // Test mode: auto-advance immediately
        handleNext();
    };

    const handleSkip = () => {
        if (isAnswered) return;
        const currentQ = questions[qIndex];

        logAnswer({
            question_index: qIndex,
            answer_json: { question_text: currentQ.text, selected: 'Skipped', correct: currentQ.correct, isCorrect: false },
            is_correct: 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: 'This question was skipped. ' + currentQ.explanation
            }
        }));
        handleNext();
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) {
            setQIndex(v => v + 1);
        } else {
            finishSession({
                totalQuestions,
                questionsAnswered: Object.keys(answers).length,
                answersPayload: answers
            });
            setShowResults(true);
        }
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (questions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
        const percentage = Math.round((score / totalQuestions) * 100);
        return (
            <div className="grade1-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container">
                        <StickerExit onClick={handleExit} />
                    </div>
                </header>

                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Avatar" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Adventure Complete! 🎉</h2>

                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="star-wrapper"
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? '#FFD700' : '#EDF2F7'}
                                        color={percentage >= (i * 33) ? '#F6AD55' : '#CBD5E0'}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">Correct</span>
                                <span className="stat-value-large">{score}/{totalQuestions}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Time</span>
                                <span className="stat-value-large">{formatTime(timer)}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Accuracy</span>
                                <span className="stat-value-large">{percentage}%</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Score</span>
                                <span className="stat-value-large">{score * 10}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown">
                        <h3 className="breakdown-title">Quest Log 📜</h3>
                        <div className="quest-log-list">
                            {questions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="quest-log-item"
                                    >
                                        <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>
                                            {idx + 1}
                                        </div>
                                        <div className="log-content">
                                            <div className="log-question">
                                                <LatexText text={ans.questionText} />
                                            </div>
                                            <div className="log-answers">
                                                <div className={`log-answer-box ${ans.isCorrect ? 'correct-box' : 'wrong-box'}`}>
                                                    <span className="log-label">Your Answer</span>
                                                    <span className="log-value">{ans.selectedOption}</span>
                                                </div>
                                                {!ans.isCorrect && (
                                                    <div className="log-answer-box correct-box">
                                                        <span className="log-label">Correct Answer</span>
                                                        <span className="log-value">{ans.correctAnswer}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="log-explanation">
                                                <span className="log-label" style={{ color: '#4C51BF' }}>Explain? 💡</span>
                                                <LatexText text={ans.explanation} />
                                            </div>
                                        </div>
                                        <div className="log-icon">
                                            {ans.isCorrect ? (
                                                <Check size={32} color="#4FB7B3" strokeWidth={3} />
                                            ) : (
                                                <X size={32} color="#FF6B6B" strokeWidth={3} />
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions">
                        <button className="action-btn-large play-again-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Retake Test
                        </button>
                        <button className="action-btn-large back-topics-btn" onClick={handleExit}>
                            <FileText size={24} /> Back to Topics
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const currentQ = questions[qIndex];

    return (
        <div className="grade1-practice-page">
            <div className="g1-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                            Q {qIndex + 1}/{totalQuestions}
                        </span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {SKILL_NAME}
                        </span>
                    </div>

                    {!isAnswered && (
                        <button className="g1-skip-btn" onClick={handleSkip} style={{ marginLeft: '15px' }}>
                            Skip Quest ⏭️
                        </button>
                    )}

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={handleExit} />
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>

                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>
                    {TOPIC_NAME}
                </div>

                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-quiz-side" style={{ width: '100%' }}>
                        <div className="g1-options-grid">
                            {currentQ.options.map((opt, i) => (
                                <button
                                    key={i}
                                    className={`g1-option-btn
                                        ${selectedOption === opt ? 'selected-test' : ''}
                                    `}
                                    onClick={() => handleOptionSelect(opt)}
                                    disabled={isAnswered}
                                >
                                    <LatexText text={opt.toString()} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="g1-navigation-footer">
                        <button className="g1-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0}>
                            <ChevronLeft size={24} /> Prev
                        </button>

                        <div>
                            {!isAnswered ? (
                                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
                                    {qIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext} disabled={isAutoAdvancing}>
                                    {qIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight size={24} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ToyJoyTest;
