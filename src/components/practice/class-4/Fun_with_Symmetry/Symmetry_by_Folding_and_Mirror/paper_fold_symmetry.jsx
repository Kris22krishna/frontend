import React, { useState, useEffect, useRef, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import FunWithSymmetryReportModal from '../FunWithSymmetryReportModal';
import '../FunWithSymmetry.css';

const CORRECT_MESSAGES = [
    "✨ You have a great imagination! ✨",
    "🌟 Perfect! You can see the symmetry! 🌟",
    "🎉 Awesome! That's exactly how it folds out! 🎉",
    "✨ Fantastic visualization! ✨",
    "🚀 Super! You're a folding expert! 🚀"
];

const SHAPE_TYPES = ['circle', 'square', 'diamond'];
const PAPER_COLORS = ["#f8b4b4", "#fef3c7", "#ecfccb", "#d1fae5", "#cffafe", "#e0e7ff", "#f3e8ff", "#fce7f3", "#f8fafc"];

const getPunchString = (punches) => {
    return punches.map(p => `${p.type}-${p.x}-${p.y}`).sort().join('|');
};

const applyMirror = (punches, mx, my) => {
    let result = [...punches];
    if (mx) {
        const mirrored = result.map(p => ({ ...p, x: 100 - p.x }));
        result = [...result, ...mirrored];
    }
    if (my) {
        const mirrored = result.map(p => ({ ...p, y: 100 - p.y }));
        result = [...result, ...mirrored];
    }
    const unique = [];
    const seen = new Set();
    result.forEach(p => {
        const key = `${p.type}-${p.x}-${p.y}`;
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(p);
        }
    });
    return unique;
};

const applyTranslate = (punches, tx, ty) => {
    let result = [...punches];
    if (tx) {
        const moved = result.map(p => ({ ...p, x: p.x + 50 }));
        result = [...result, ...moved];
    }
    if (ty) {
        const moved = result.map(p => ({ ...p, y: p.y + 50 }));
        result = [...result, ...moved];
    }
    const unique = [];
    const seen = new Set();
    result.forEach(p => {
        const key = `${p.type}-${p.x}-${p.y}`;
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(p);
        }
    });
    return unique;
};

const generateQuestions = () => {
    const questions = [];
    const usedCombinations = new Set();

    for (let i = 0; i < 10; i++) {
        let difficulty = 'easy';
        if (i >= 3 && i < 6) difficulty = 'medium';
        if (i >= 6) difficulty = 'hard';

        const isHard = difficulty === 'hard';
        const foldType = isHard ? 'quarter' : 'half';
        const paperColor = PAPER_COLORS[i % PAPER_COLORS.length];

        const possibleSlots = isHard ? [
            { x: 25, y: 25 }, { x: 50, y: 50 }, { x: 25, y: 50 }, { x: 50, y: 25 }, { x: 0, y: 0 }, { x: 20, y: 20 }
        ] : [
            { x: 25, y: 25 }, { x: 25, y: 75 }, { x: 50, y: 50 }, { x: 50, y: 30 }, { x: 50, y: 70 }, { x: 25, y: 50 }, { x: 0, y: 50 }, { x: 10, y: 10 }
        ];

        let basePunches = [];
        let attempts = 0;

        while (attempts < 50) {
            let numPunches = 1; // Default for easy (1 punch)
            if (difficulty === 'medium') numPunches = 2; // Medium gets 2 punches on half fold
            if (difficulty === 'hard') numPunches = (Math.random() > 0.5 ? 2 : 1); // Hard gets 1 or 2 punches on quarter fold

            let shuffledSlots = [...possibleSlots].sort(() => 0.5 - Math.random());
            let selectedSlots = shuffledSlots.slice(0, numPunches);

            basePunches = selectedSlots.map(slot => ({
                x: slot.x,
                y: slot.y,
                size: Math.floor(Math.random() * 2) === 0 ? 16 : 22,
                type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]
            }));

            const comboString = getPunchString(basePunches) + '-' + foldType;
            if (!usedCombinations.has(comboString)) {
                usedCombinations.add(comboString);
                break;
            }
            attempts++;
        }

        const correctPunches = applyMirror(basePunches, true, isHard);
        const correctStr = getPunchString(correctPunches);

        const distractorPool = [];
        if (!isHard) {
            distractorPool.push(applyMirror(basePunches, false, false));
            distractorPool.push(applyMirror(basePunches, false, true));
            distractorPool.push(applyMirror(basePunches, true, true));
            distractorPool.push(applyTranslate(basePunches, true, false));
            distractorPool.push(applyTranslate(basePunches, false, true));
            distractorPool.push(applyTranslate(basePunches, true, true));
        } else {
            distractorPool.push(applyMirror(basePunches, true, false));
            distractorPool.push(applyMirror(basePunches, false, true));
            distractorPool.push(applyMirror(basePunches, false, false));
            distractorPool.push(applyTranslate(basePunches, true, true));
            distractorPool.push(applyTranslate(basePunches, true, false));
            distractorPool.push(applyTranslate(basePunches, false, true));
        }

        let finalDistractors = [];
        let seenStrings = new Set([correctStr]);

        distractorPool.sort(() => 0.5 - Math.random());
        for (let d of distractorPool) {
            const str = getPunchString(d);
            if (!seenStrings.has(str)) {
                seenStrings.add(str);
                finalDistractors.push(d);
            }
            if (finalDistractors.length === 3) break;
        }

        let fallbackAttempts = 0;
        while (finalDistractors.length < 3 && fallbackAttempts < 20) {
            const fallbackPunches = [];
            const times = isHard ? 4 : 2;
            for (let k = 0; k < times; k++) {
                fallbackPunches.push({
                    x: Math.floor(Math.random() * 5) * 20 + 10,
                    y: Math.floor(Math.random() * 5) * 20 + 10,
                    size: 20,
                    type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)]
                });
            }
            const fbUnique = applyMirror(fallbackPunches, false, false);
            const str = getPunchString(fbUnique);
            if (!seenStrings.has(str)) {
                seenStrings.add(str);
                finalDistractors.push(fbUnique);
            }
            fallbackAttempts++;
        }

        const optionsArrays = [...finalDistractors, correctPunches];
        optionsArrays.sort(() => 0.5 - Math.random());
        const correctIndex = optionsArrays.findIndex(opt => getPunchString(opt) === correctStr);

        questions.push({
            type: foldType,
            basePunches,
            options: optionsArrays,
            correctIndex,
            paperColor,
            solution: isHard
                ? "For a quarter fold (folded twice), any cuts made will be duplicated symmetrically across both the middle vertical and horizontal fold lines."
                : "For a half fold (folded once), the cut is duplicated symmetrically across the middle fold line like a perfect mirror."
        });
    }
    return questions;
};

const PunchedPaper = ({ punches, isFolded, foldType, paperColor }) => {
    const baseId = useId().replace(/[^a-zA-Z0-9]/g, '');
    const maskId = 'mask-' + baseId;

    let viewBox = "0 0 100 100";
    if (isFolded) {
        if (foldType === 'half') viewBox = "0 0 50 100";
        if (foldType === 'quarter') viewBox = "0 0 50 50";
    }

    return (
        <svg viewBox={viewBox} className="w-full h-full drop-shadow-md transition-all duration-300">
            <defs>
                <mask id={maskId}>
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    {punches.map((p, idx) => {
                        if (p.type === 'circle') return <circle key={idx} cx={p.x} cy={p.y} r={p.size / 2} fill="black" />
                        if (p.type === 'square') return <rect key={idx} x={p.x - p.size / 2} y={p.y - p.size / 2} width={p.size} height={p.size} fill="black" rx="2" />
                        if (p.type === 'diamond') return <rect key={idx} x={p.x - p.size / 2} y={p.y - p.size / 2} width={p.size} height={p.size} fill="black" rx="1" transform={`rotate(45 ${p.x} ${p.y})`} />
                        return null;
                    })}
                </mask>
            </defs>

            <rect
                x="0" y="0"
                width={isFolded ? 50 : 100}
                height={isFolded && foldType === 'quarter' ? 50 : 100}
                rx="2"
                fill={paperColor || "#f8fafc"}
                mask={`url(#${maskId})`}
                stroke="#64748b"
                strokeWidth="1.5"
            />

            {!isFolded && (
                <g opacity="0.4" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
                    {foldType === 'half' && <line x1="50" y1="0" x2="50" y2="100" />}
                    {foldType === 'quarter' && (
                        <>
                            <line x1="50" y1="0" x2="50" y2="100" />
                            <line x1="0" y1="50" x2="100" y2="50" />
                        </>
                    )}
                </g>
            )}

            {isFolded && (
                <g stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" fill="none">
                    {foldType === 'half' && <line x1="50" y1="0" x2="50" y2="100" />}
                    {foldType === 'quarter' && (
                        <>
                            <line x1="50" y1="0" x2="50" y2="50" />
                            <line x1="0" y1="50" x2="50" y2="50" />
                        </>
                    )}
                </g>
            )}
        </svg>
    )
}

const PaperFoldSymmetry = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1201; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Paper Fold Symmetry";
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
        setSessionQuestions(generateQuestions());

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
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOption(null);
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

    const handleAnswer = (val) => {
        if (isSubmitted) return;
        setSelectedOption(val);
    };

    const handleSubmit = () => {
        if (selectedOption === null || !currentQuestion) return;

        const isRight = selectedOption === currentQuestion.correctIndex;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
            question_text: `Paper folded ${currentQuestion.type === 'half' ? 'once' : 'twice'} and punched. Choose the unfolded shape.`,
            correct_answer: "Option " + (currentQuestion.correctIndex + 1),
            student_answer: "Option " + (selectedOption + 1),
            is_correct: isRight,
            solution_text: currentQuestion.solution,
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedOption(null);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            try {
                const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
                if (userId && sessionId) {
                    const totalCorrect = Object.values(answers).filter(val => val.isCorrect).length;
                    await api.createReport({
                        title: SKILL_NAME,
                        type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                        user_id: parseInt(userId, 10)
                    });
                    await api.finishSession(sessionId);
                }
            } catch (error) {
                console.error("Error finalizing practice session:", error);
            }
            setShowResults(true);
        }
    };

    const handlePrevious = () => { if (qIndex > 0) setQIndex(prev => prev - 1); };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const total = TOTAL_QUESTIONS;

        return (
            <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif', minHeight: '100vh' }}>
                <FunWithSymmetryReportModal
                    isOpen={showResults}
                    stats={{
                        timeTaken: formatTime(timeElapsed),
                        correctAnswers: score,
                        totalQuestions: total
                    }}
                    onContinue={() => navigate(-1)}
                />
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <h1 className="text-xl font-bold text-[#31326F]">Fun with Symmetry</h1>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-[#0097A7]/30 text-[#31326F] font-bold text-lg shadow-sm whitespace-nowrap">Question {qIndex + 1} of {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#0097A7]/30 text-[#31326F] font-bold text-lg shadow-sm">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper flex flex-col min-h-[calc(100vh-140px)] py-2 px-4 md:p-4 relative overflow-y-auto overflow-x-hidden">
                <div className="w-full max-w-5xl mx-auto my-4 md:my-8 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-8 items-center justify-start h-auto min-h-[400px]">

                    <div className="w-full flex justify-center text-center pb-2">
                        <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                            How does the paper look when it is <span className="text-[#0097A7]">unfolded</span>?
                        </h2>
                    </div>

                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 h-full">

                        {/* Interactive Area - FOLDED */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-4 py-1 rounded-full shadow-sm">Folded</h3>
                            <div className="bg-slate-50 border-[6px] border-slate-200 rounded-[2.5rem] p-6 shadow-md shadow-gray-200 relative">
                                <div className="absolute -top-4 -left-4 text-[10px] md:text-xs font-bold text-white bg-[#0097A7] px-3 py-1.5 rounded-full shadow-md z-10 uppercase tracking-wider">
                                    {currentQuestion.type === 'half' ? 'Folded in Half' : 'Folded Twice'}
                                </div>
                                <div className={`relative flex justify-center items-center fill-stone-700 ${currentQuestion.type === 'half' ? 'w-16 h-32 md:w-24 md:h-48' : 'w-24 h-24 md:w-36 md:h-36'}`}>
                                    <PunchedPaper punches={currentQuestion.basePunches} isFolded={true} foldType={currentQuestion.type} paperColor={currentQuestion.paperColor} />
                                </div>
                            </div>
                        </div>

                        {/* Unfolded Options */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-4 py-1 rounded-full shadow-sm">Choose Unfolded</h3>
                            <div className="grid grid-cols-2 gap-4 w-full max-w-[20rem] md:max-w-[24rem] justify-center items-center">
                                {currentQuestion.options.map((opt, i) => {
                                    const isOptSelected = selectedOption === i;
                                    const isCorrectOpt = currentQuestion.correctIndex === i;

                                    let btnStyle = 'border-gray-200 hover:border-[#0097A7] cursor-pointer hover:scale-105';
                                    if (!isSubmitted && isOptSelected) {
                                        btnStyle = 'border-[#0097A7] bg-[#E0F7FA] scale-105 shadow-md shadow-[#0097A7]/20';
                                    } else if (isSubmitted && isCorrectOpt) {
                                        btnStyle = 'border-green-500 bg-green-50 shadow-md shadow-green-500/20 scale-105';
                                    } else if (isSubmitted && isOptSelected && !isCorrect) {
                                        btnStyle = 'border-red-500 bg-red-50 shadow-md shadow-red-500/20';
                                    } else if (isSubmitted) {
                                        btnStyle = 'border-gray-100 opacity-60 cursor-not-allowed';
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={isSubmitted}
                                            onClick={() => handleAnswer(i)}
                                            className={`p-2 rounded-2xl md:rounded-3xl border-4 transition-all flex flex-col items-center justify-center bg-white ${btnStyle}`}
                                        >
                                            <div className="w-20 h-20 md:w-28 md:h-28 m-1 flex items-center justify-center drop-shadow-sm pointer-events-none">
                                                <PunchedPaper punches={opt} isFolded={false} foldType={currentQuestion.type} paperColor={currentQuestion.paperColor} />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                    {isSubmitted && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-4">
                            <div className={`text-xl font-bold px-8 py-4 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200 shadow-sm' : 'text-red-700 bg-red-100 border-2 border-red-200 shadow-sm'}`}>
                                {isCorrect ? feedbackMessage : "Not quite! Check the explanation to see how it unfolds."}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"The correct unfolded shape"} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={selectedOption === null}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default PaperFoldSymmetry;
