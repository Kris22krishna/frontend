import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Perfect balance! Exactly 1 kg! ✨",
    "🌟 Awesome! You made 1 kg! 🌟",
    "🎉 Correct! You're a weighing expert! 🎉",
    "✨ Fantastic! ✨",
    "🚀 Super! Scale balanced! 🚀"
];

const MakeOneKilogramUsingPackets = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Drag and Drop State
    const [poolPackets, setPoolPackets] = useState([]);
    const [scalePackets, setScalePackets] = useState([]);
    const scaleRef = useRef(null);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1135;
    const SKILL_NAME = "Weigh It, Pour It - Make 1 Kilogram Using Packets";

    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
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

        // Generate Questions
        const questions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            // Target is always 1000g
            // Generate a set of packets that CAN make 1000g, plus distractors
            const types = [500, 250, 200, 100];

            // Create a valid combination first
            let target = 1000;
            let validCombo = [];
            // Simple greedy generation for valid combo
            while (target > 0) {
                const possible = types.filter(t => t <= target);
                if (possible.length === 0) break; // Should not happen with 100 available
                const pick = possible[randomInt(0, possible.length - 1)];
                validCombo.push({ id: `valid-${i}-${validCombo.length}`, weight: pick });
                target -= pick;
            }

            // Distractors
            let distractors = [];
            for (let j = 0; j < 4; j++) {
                distractors.push({ id: `dist-${i}-${j}`, weight: types[randomInt(0, types.length - 1)] });
            }

            const allPackets = [...validCombo, ...distractors].sort(() => Math.random() - 0.5);

            questions.push({
                text: "Drag packets to the scale to make exactly <strong>1 kg</strong>.",
                packets: allPackets,
                solution: `1 kg = 1000 g.<br/>You need to place packets that add up to 1000 g on the scale.`
            });
        }
        setSessionQuestions(questions);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);

            // Restore or Reset State
            if (answers[qIndex]) {
                const saved = answers[qIndex];
                setScalePackets(saved.scalePackets);
                setPoolPackets(saved.poolPackets);
                setIsSubmitted(true);
                setIsCorrect(saved.isCorrect);
            } else {
                // Deep copy packets to ensure fresh state
                const packets = qData.packets.map(p => ({ ...p }));
                setPoolPackets(packets);
                setScalePackets([]);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (isRight) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        const currentWeight = scalePackets.reduce((sum, p) => sum + p.weight, 0);

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
                question_text: "Drag packets to make 1 kg",
                correct_answer: "1000 g",
                student_answer: `${currentWeight} g`,
                is_correct: isRight,
                solution_text: currentQuestion.solution,
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleCheck = () => {
        const currentWeight = scalePackets.reduce((sum, p) => sum + p.weight, 0);
        const isRight = currentWeight === 1000;

        setIsCorrect(isRight);
        if (isRight) {
            setIsSubmitted(true);
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setIsSubmitted(false); // Allow retry
            setFeedbackMessage(currentWeight < 1000 ? "Too light! Add more." : "Too heavy! Remove some.");
            // Don't show full explanation modal immediately for drag-drop, just hint? 
            // Actually, existing logic shows modal on wrong. Let's stick to that but maybe customize text.
            // setShowExplanationModal(true); // Let them try again first
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                isCorrect: isRight,
                scalePackets: scalePackets,
                poolPackets: poolPackets
            }
        }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setFeedbackMessage(currentWeight < 1000 ? "Too light! Add more." : "Too heavy! Remove some.");
            // Don't show full explanation modal immediately for drag-drop, just hint? 
            // Actually, existing logic shows modal on wrong. Let's stick to that but maybe customize text.
            setShowExplanationModal(true);
        }

        recordQuestionAttempt(isRight);
    };

    const handleDragEnd = (event, info, packet, origin) => {
        if (isSubmitted && isCorrect) return; // Only lock if correct

        // Simple bounding box check
        const scaleRect = scaleRef.current.getBoundingClientRect();
        const dropPoint = {
            x: info.point.x,
            y: info.point.y
        };

        const isOverScale =
            dropPoint.x >= scaleRect.left &&
            dropPoint.x <= scaleRect.right &&
            dropPoint.y >= scaleRect.top &&
            dropPoint.y <= scaleRect.bottom;

        if (isOverScale) {
            if (origin === 'pool') {
                setPoolPackets(prev => prev.filter(p => p.id !== packet.id));
                setScalePackets(prev => [...prev, packet]);
            }
            // If origin is scale, it stays on scale (no change needed unless we support rearranging)
        } else {
            // Dropped outside scale
            if (origin === 'scale') {
                setScalePackets(prev => prev.filter(p => p.id !== packet.id));
                setPoolPackets(prev => [...prev, packet]);
            }
            // If origin is pool, it snaps back (handled by Framer Motion layout animations typically, or we just don't move it from pool state)
        }
    };

    // Helper to return packet element
    const PacketItem = ({ packet, origin }) => (
        <motion.div
            key={packet.id}
            drag
            dragSnapToOrigin={true} // Snaps back if not "dropped" by state change
            onDragEnd={(e, i) => handleDragEnd(e, i, packet, origin)}
            whileDrag={{ scale: 1.1, zIndex: 100 }}
            className={`
                w-16 h-16 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center font-black text-base sm:text-xl shadow-lg cursor-grab active:cursor-grabbing border-b-4 select-none
                ${packet.weight === 500 ? 'bg-red-100 text-red-600 border-red-300' : ''}
                ${packet.weight === 250 ? 'bg-blue-100 text-blue-600 border-blue-300 w-16 h-16 sm:w-20 sm:h-20 text-sm sm:text-lg' : ''}
                ${packet.weight === 200 ? 'bg-green-100 text-green-600 border-green-300 w-14 h-14 sm:w-20 sm:h-20 text-sm sm:text-lg' : ''}
                ${packet.weight === 100 ? 'bg-yellow-100 text-yellow-600 border-yellow-300 w-12 h-12 sm:w-16 sm:h-16 text-xs sm:text-base' : ''}
            `}
        >
            {packet.weight}g
        </motion.div>
    );

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId && sessionId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
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
                    await api.finishSession(sessionId);
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    // Results View
    if (showResults) {
        return (
            // Reusing the same results view structure for consistency
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">
                        Back to Topics
                    </button>
                    <div className="sun-timer-container"><div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div></div>
                    <div className="title-area"><h1 className="results-title">Packing Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Packing Pro! 🎉</h2>
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl shadow-xl hover:-translate-y-1 transition-all mt-8" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Start New Quest
                        </button>
                    </div>
                </main>
            </div>
        );
    }


    if (!currentQuestion) return <div>Loading...</div>;

    const currentWeight = scalePackets.reduce((sum, p) => sum + p.weight, 0);

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
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
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern flex flex-col items-center" style={{ overflowY: 'visible' /* Let drag elements overflow if needed */ }}>
                            <div className="question-header-modern mb-8">
                                <h2 className="text-3xl font-black text-[#31326F] text-center">
                                    <LatexContent html={currentQuestion.text} />
                                </h2>
                            </div>

                            {/* Interaction Area */}
                            <div className="flex-1 w-full flex flex-col items-center gap-8">

                                {/* Scale / Drop Zone */}
                                <div
                                    ref={scaleRef}
                                    className={`
                                        w-full max-w-md h-64 bg-blue-50 rounded-3xl border-4 border-dashed transition-colors flex flex-col items-center justify-end relative
                                        ${isSubmitted && isCorrect ? 'border-green-400 bg-green-50' : 'border-blue-200'}
                                        ${isSubmitted && !isCorrect ? 'border-red-300 bg-red-50' : ''}
                                    `}
                                >
                                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-xl font-bold text-gray-500 shadow-sm">
                                        Max: 1000g
                                    </div>

                                    {/* Weight Display */}
                                    <div className="mb-4 text-4xl font-black text-[#31326F]">
                                        {currentWeight} g
                                    </div>

                                    {/* Scale Plate Visual */}
                                    <div className="w-4/5 h-4 bg-gray-300 rounded-full mb-8"></div>
                                    <Scale className="text-gray-300 absolute bottom-2 opacity-20" size={120} />

                                    {/* Packets on Scale */}
                                    <div className="absolute inset-0 flex flex-wrap content-end justify-center gap-2 p-8 pb-16 pointer-events-none overflow-hidden">
                                        {scalePackets.map(p => (
                                            <div key={p.id} className="pointer-events-auto relative z-10 transition-transform hover:scale-105">
                                                <PacketItem packet={p} origin="scale" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Feedback */}
                                {isSubmitted && (
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className={`px-6 py-2 rounded-xl font-bold text-xl ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                    >
                                        {feedbackMessage}
                                    </motion.div>
                                )}

                                {/* Packet Pool */}
                                <div className="w-full bg-gray-50 rounded-3xl p-6 min-h-[200px]">
                                    <p className="text-center text-gray-400 font-bold mb-4 uppercase tracking-wider text-sm">Review Available Packets</p>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {poolPackets.map(p => (
                                            <PacketItem key={p.id} packet={p} origin="pool" />
                                        ))}
                                    </div>
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
                onNext={() => setShowExplanationModal(false)}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={() => navigate(-1)}>
                            Exit
                        </button>
                    </div>
                    <div className="bottom-center"></div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (
                                <button className="nav-pill-next-btn" onClick={handlePrevious}>
                                    <ChevronLeft size={28} strokeWidth={3} /> Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck}>
                                    Check Weight <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MakeOneKilogramUsingPackets;
