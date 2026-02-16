
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, Pencil, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import Whiteboard from '../../../Whiteboard';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import { FullScreenScratchpad } from '../../../FullScreenScratchpad';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const RakshaBandhanFactors = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Game Specific State
    const [availableNumbers, setAvailableNumbers] = useState([]);
    const [placed, setPlaced] = useState({}); // { envelopeId: [nums] }
    const [envelopes, setEnvelopes] = useState([]);
    const [currentSolution, setCurrentSolution] = useState("");

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 9005; // ID for Raksha Bandhan Factors
    const SKILL_NAME = "Raksha Bandhan - Factors";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        // Create Session
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
    }, []);

    useEffect(() => {
        generateQuestion(qIndex);
    }, [qIndex]);

    const generateQuestion = (index) => {
        // Generate random products and their factors
        // We'll create 3 envelopes per question for variety
        const numEnvelopes = 3;
        const newEnvelopes = [];
        const neededFactors = [];

        // Helper to find factor pairs
        const getFactors = (num) => {
            const pairs = [];
            for (let i = 1; i <= Math.sqrt(num); i++) {
                if (num % i === 0) {
                    pairs.push([i, num / i]);
                }
            }
            return pairs;
        };

        // Generate envelopes with unique products
        const productsUsed = new Set();
        while (newEnvelopes.length < numEnvelopes) {
            // Pick a random number between 4 and 50 that has at least two factor pairs (to make it interesting) 
            // or just simple multiplication table products
            const val = randomInt(4, 50);
            if (productsUsed.has(val)) continue;

            const pairs = getFactors(val);
            if (pairs.length > 0) {
                // Determine a specific pair we want them to find? 
                // Or just any valid pair? The logic checks if product matches.
                // We'll just provide the numbers for ONE pair, but logic accepts ANY valid pair.
                // Let's pick a random pair to add to the pool.
                const pair = pairs[randomInt(0, pairs.length - 1)];
                neededFactors.push(pair[0], pair[1]);
                newEnvelopes.push({ id: newEnvelopes.length + 1, product: val });
                productsUsed.add(val);
            }
        }

        // Add some distractors
        const distractors = [];
        while (distractors.length < 4) {
            const d = randomInt(1, 15);
            if (!neededFactors.includes(d) && !distractors.includes(d)) {
                distractors.push(d);
            }
        }

        let pool = [...neededFactors, ...distractors];
        // Shuffle pool
        pool = pool.sort(() => Math.random() - 0.5);

        setAvailableNumbers(pool);
        setEnvelopes(newEnvelopes);
        setPlaced({});
        setIsSubmitted(false);
        setIsCorrect(false);

        // Prepare solution string for explanation
        const solutionText = newEnvelopes.map(env => {
            const pairs = getFactors(env.product).map(p => `${p[0]} × ${p[1]}`).join(", ");
            return `<strong>${env.product}</strong>: ${pairs}`;
        }).join("<br/>");
        setCurrentSolution(`Possible factors:<br/>${solutionText}`);
    };

    // Drag and Drop Logic
    const handleDragStart = (e, number, source, envelopeId = null) => {
        e.dataTransfer.setData("text/plain", JSON.stringify({ number, source, envelopeId }));
    };

    const handleDrop = (e, targetEnvelopeId) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (!data) return;

        const { number, source, envelopeId: sourceEnvelopeId } = JSON.parse(data);

        if (isSubmitted) return;

        // Check if target envelope is full (max 2)
        const currentTarget = placed[targetEnvelopeId] || [];
        if (currentTarget.length >= 2) return;

        // Logic relies on source
        if (source === 'pool') {
            // Moving from available to envelope
            setAvailableNumbers(prev => prev.filter((n, i) => {
                // Remove purely by value? Wait, duplicates?
                // We should probably track by index or ID to handle duplicates correctly.
                // For now simplicity: remove one instance of the number
                const idx = prev.indexOf(number);
                return i !== idx;
            }));
        } else if (source === 'envelope') {
            // Moving from one envelope to another
            if (sourceEnvelopeId === targetEnvelopeId) return; // Same envelope
            setPlaced(prev => ({
                ...prev,
                [sourceEnvelopeId]: prev[sourceEnvelopeId].filter((n, i) => {
                    const idx = prev[sourceEnvelopeId].indexOf(number);
                    return i !== idx;
                })
            }));
        }

        // Add to new envelope
        setPlaced(prev => ({
            ...prev,
            [targetEnvelopeId]: [...(prev[targetEnvelopeId] || []), number]
        }));
    };

    const allowDrop = (e) => e.preventDefault();

    // Allow dragging BACK to pool (resetting a number)
    const handleDropToPool = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (!data) return;
        const { number, source, envelopeId } = JSON.parse(data);

        if (isSubmitted) return;
        if (source === 'pool') return; // Already in pool

        // Remove from envelope
        setPlaced(prev => ({
            ...prev,
            [envelopeId]: prev[envelopeId].filter((n, i) => {
                const idx = prev[envelopeId].indexOf(number);
                return i !== idx;
            })
        }));

        // Add back to pool
        setAvailableNumbers(prev => [...prev, number]);
    };

    // Reset Game (Current Question)
    const handleReset = () => {
        if (isSubmitted) return;
        // Collect all numbers from placed back to available
        let returnedNumbers = [];
        Object.values(placed).forEach(nums => {
            returnedNumbers.push(...nums);
        });
        setAvailableNumbers(prev => [...prev, ...returnedNumbers]);
        setPlaced({});
    };

    const getResultStatus = (env) => {
        const nums = placed[env.id];
        if (!nums || nums.length !== 2) return false;
        return nums[0] * nums[1] === env.product;
    };

    const recordQuestionAttempt = async (isRight) => {
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
                difficulty_level: 'Medium',
                question_text: "Match the factors to their products",
                correct_answer: "Correct Factors",
                student_answer: JSON.stringify(placed),
                is_correct: isRight,
                solution_text: currentSolution,
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleCheck = () => {
        if (isSubmitted) return; // Prevent double submission

        let allCorrect = true;
        // Check ALL envelopes
        envelopes.forEach(env => {
            if (!getResultStatus(env)) allCorrect = false;
        });

        // Also check if all envelopes are FILLED? Maybe required.
        const allFilled = envelopes.every(env => (placed[env.id] || []).length === 2);

        if (!allFilled) {
            // Maybe show a toast or alert? 
            // For now, let's treat "not filled" as wrong or just proceed.
            // Usually better to warn. But to follow pattern, we just grade what's there.
            allCorrect = false;
        }

        setIsCorrect(allCorrect);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: allCorrect }));

        if (allCorrect) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        recordQuestionAttempt(allCorrect);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            // Finish
            if (sessionId) {
                await api.finishSession(sessionId).catch(console.error);
            }

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: {
                            skill_id: SKILL_ID,
                            skill_name: SKILL_NAME,
                            total_questions: TOTAL_QUESTIONS,
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

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
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
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#31326F', textAlign: 'center' }}>
                                        Match the factors to their products!
                                    </h2>

                                    {/* Available Numbers Pool */}
                                    <div
                                        style={styles.numbers}
                                        onDrop={handleDropToPool}
                                        onDragOver={allowDrop}
                                    >
                                        {availableNumbers.map((num, i) => (
                                            <div
                                                key={`pool-${num}-${i}`}
                                                draggable={!isSubmitted}
                                                onDragStart={(e) => handleDragStart(e, num, 'pool')}
                                                style={{ ...styles.card, cursor: isSubmitted ? 'default' : 'grab', opacity: isSubmitted ? 0.7 : 1 }}
                                            >
                                                {num}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Envelopes */}
                                    <div style={styles.envelopes}>
                                        {envelopes.map(env => {
                                            const result = isSubmitted ? (getResultStatus(env)) : null;
                                            return (
                                                <div
                                                    key={env.id}
                                                    onDrop={(e) => handleDrop(e, env.id)}
                                                    onDragOver={allowDrop}
                                                    style={{
                                                        ...styles.envelope,
                                                        borderColor: result === true ? '#4CAF50' : (result === false ? '#F44336' : '#333')
                                                    }}
                                                >
                                                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>Product: {env.product}</div>

                                                    <div style={styles.slot}>
                                                        {(placed[env.id] || []).map((n, i) => (
                                                            <div
                                                                key={`${env.id}-${i}`}
                                                                style={styles.smallCard}
                                                                draggable={!isSubmitted}
                                                                onDragStart={(e) => handleDragStart(e, n, 'envelope', env.id)}
                                                            >
                                                                {n}
                                                            </div>
                                                        ))}
                                                        {(!placed[env.id] || placed[env.id].length < 2) && !isSubmitted && (
                                                            <div style={{ ...styles.smallCard, border: '1px dashed #ccc', background: 'transparent', color: '#ccc' }}>?</div>
                                                        )}
                                                    </div>

                                                    {isSubmitted && result === true && <div style={{ color: "green", fontWeight: 'bold' }}>✓ Correct</div>}
                                                    {isSubmitted && result === false && <div style={{ color: "red", fontWeight: 'bold' }}>✗ Try Again</div>}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {!isSubmitted && (
                                        <button onClick={handleReset} style={styles.resetButton}>
                                            <RefreshCw size={16} /> Reset Board
                                        </button>
                                    )}

                                    {isSubmitted && isCorrect && (
                                        <motion.div
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="feedback-mini correct"
                                            style={{ margin: '0 auto' }}
                                        >
                                            {feedbackMessage}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer="See solution below"
                explanation={currentSolution}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => setShowExplanationModal(false)}
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
                            <StickerExit size={20} className="hidden" />
                            Exit
                        </button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Solution
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck}>
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
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const styles = {
    numbers: {
        display: "flex",
        justifyContent: "center",
        gap: 15,
        marginBottom: 20,
        flexWrap: "wrap",
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '12px',
        border: '2px dashed #cbd5e1'
    },
    card: {
        width: 60,
        height: 60,
        background: "#fff",
        border: "2px solid #31326F",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
        fontWeight: "bold",
        fontSize: 20,
        color: "#31326F",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        userSelect: 'none'
    },
    envelopes: {
        display: "flex",
        justifyContent: "center",
        gap: 20,
        flexWrap: "wrap"
    },
    envelope: {
        width: 180,
        minHeight: 160,
        border: "2px solid #333",
        borderRadius: 16,
        padding: 15,
        background: "#ffffff",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        transition: 'all 0.2s ease'
    },
    slot: {
        minHeight: 80,
        marginTop: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        gap: 10,
        width: '100%',
        background: '#f1f5f9',
        borderRadius: '10px',
        padding: '10px'
    },
    smallCard: {
        width: 45,
        height: 45,
        background: "#fff",
        border: "2px solid #64748b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        fontWeight: "bold",
        fontSize: '1.1rem',
        color: '#334155'
    },
    resetButton: {
        marginTop: 20,
        alignSelf: 'center',
        padding: '8px 16px',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        color: '#666',
        fontSize: '0.9rem'
    }
};

export default RakshaBandhanFactors;
