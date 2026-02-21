import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Real-life maths pro! ✨",
    "🌟 Problem solving star! 🌟",
    "🎉 Brilliant application! 🎉",
    "🚀 Excellent thinking! 🚀",
    "💎 Superb! 💎"
];

const SKILL_ID = 1168;
const SKILL_NAME = "Skill Application Problems (Area & Perimeter)";
const TOTAL_QUESTIONS = 10;

/**
 * Generates 10 unique, varied Grade-5 word problems applying area and perimeter.
 * Types:
 *  1. Find fencing (perimeter) for a given field/garden
 *  2. Find flooring cost (area × rate)
 *  3. Find number of tiles (area ÷ tile area)
 *  4. Find missing side given area
 *  5. Find missing side given perimeter
 *  6. Two-step: find area then cost
 *  7. Compare which garden needs more fencing (compare perimeters)
 *  8. Find how many runs around a track (total distance / perimeter)
 */
function generateQuestions() {
    const qs = [];
    const usedKeys = new Set();

    const ensureUnique = (arr, correct, addFn) => {
        const s = new Set(arr);
        while (s.size < 4) { s.add(addFn()); }
        return Array.from(s).sort(() => Math.random() - 0.5);
    };

    const typeGenerators = [
        // Type 1 – Fencing (find perimeter of rectangle/square)
        () => {
            const useSquare = randomInt(0, 1);
            if (useSquare) {
                const side = randomInt(5, 30);
                const p = 4 * side;
                const key = `t1sq-${side}`;
                if (usedKeys.has(key)) return null;
                usedKeys.add(key);
                return {
                    text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A square garden has side <b>${side} m</b>. How much fencing wire is needed to go all the way around it?</div>`,
                    correctAnswer: `${p} m`,
                    solution: `Fencing = Perimeter of square = 4 × side = 4 × ${side} = <b>${p} m</b>`,
                    shuffledOptions: ensureUnique(
                        [`${p} m`, `${side * side} m`, `${p + 8} m`],
                        `${p} m`,
                        () => `${p + randomInt(-6, 12)} m`
                    )
                };
            } else {
                const l = randomInt(10, 40), w = randomInt(5, 25);
                const p = 2 * (l + w);
                const key = `t1r-${l}-${w}`;
                if (usedKeys.has(key)) return null;
                usedKeys.add(key);
                return {
                    text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A rectangular park is <b>${l} m</b> long and <b>${w} m</b> wide. How many metres of fencing are needed to surround it?</div>`,
                    correctAnswer: `${p} m`,
                    solution: `Fencing = Perimeter = 2 × (length + width) = 2 × (${l} + ${w}) = 2 × ${l + w} = <b>${p} m</b>`,
                    shuffledOptions: ensureUnique(
                        [`${p} m`, `${l * w} m`, `${l + w} m`],
                        `${p} m`,
                        () => `${p + randomInt(-8, 12)} m`
                    )
                };
            }
        },
        // Type 2 – Flooring cost (area × rate)
        () => {
            const l = randomInt(4, 20), w = randomInt(3, 15), rate = randomInt(30, 200);
            const area = l * w, total = area * rate;
            const key = `t2-${l}-${w}-${rate}`;
            if (usedKeys.has(key)) return null;
            usedKeys.add(key);
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A hall is <b>${l} m × ${w} m</b>. Flooring costs <b>₹${rate} per sq m</b>. What is the total cost?</div>`,
                correctAnswer: `₹${total}`,
                solution: `Area = ${l} × ${w} = ${area} sq m<br/>Total cost = ${area} × ₹${rate} = <b>₹${total}</b>`,
                shuffledOptions: ensureUnique(
                    [`₹${total}`, `₹${total + randomInt(100, 500)}`, `₹${area * rate + 200}`],
                    `₹${total}`,
                    () => `₹${total + randomInt(-200, 500)}`
                )
            };
        },
        // Type 3 – Number of tiles
        () => {
            const tSide = randomInt(1, 2); // tile side in metres
            const l = randomInt(4, 16) * tSide, w = randomInt(3, 12) * tSide;
            const area = l * w, tileArea = tSide * tSide, numTiles = area / tileArea;
            const key = `t3-${l}-${w}-${tSide}`;
            if (usedKeys.has(key)) return null;
            usedKeys.add(key);
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A floor <b>${l} m × ${w} m</b> is to be covered using square tiles of side <b>${tSide} m</b>. How many tiles are needed?</div>`,
                correctAnswer: `${numTiles}`,
                solution: `Floor area = ${l} × ${w} = ${area} sq m<br/>Tile area = ${tSide} × ${tSide} = ${tileArea} sq m<br/>Tiles needed = ${area} ÷ ${tileArea} = <b>${numTiles}</b>`,
                shuffledOptions: ensureUnique(
                    [`${numTiles}`, `${numTiles + randomInt(5, 20)}`, `${2 * (l + w)}`],
                    `${numTiles}`,
                    () => `${numTiles + randomInt(-10, 25)}`
                )
            };
        },
        // Type 4 – Find missing side given area
        () => {
            const l = randomInt(4, 20), w = randomInt(3, 15);
            const area = l * w;
            const key = `t4-${l}-${w}`;
            if (usedKeys.has(key)) return null;
            usedKeys.add(key);
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A rectangular playground has an area of <b>${area} sq m</b>. If its length is <b>${l} m</b>, what is its <b>width</b>?</div>`,
                correctAnswer: `${w} m`,
                solution: `Width = Area ÷ Length = ${area} ÷ ${l} = <b>${w} m</b>`,
                shuffledOptions: ensureUnique(
                    [`${w} m`, `${w + 3} m`, `${w + 7} m`],
                    `${w} m`,
                    () => `${Math.max(1, w + randomInt(-4, 8))} m`
                )
            };
        },
        // Type 5 – Find missing side given perimeter
        () => {
            const l = randomInt(8, 30), w = randomInt(4, 20);
            const p = 2 * (l + w);
            const key = `t5-${l}-${w}`;
            if (usedKeys.has(key)) return null;
            usedKeys.add(key);
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>The perimeter of a rectangular field is <b>${p} m</b> and its length is <b>${l} m</b>. What is its <b>breadth</b>?</div>`,
                correctAnswer: `${w} m`,
                solution: `Perimeter = 2 × (l + b)<br/>${p} = 2 × (${l} + b)<br/>${l} + b = ${p / 2}<br/>b = ${p / 2} − ${l} = <b>${w} m</b>`,
                shuffledOptions: ensureUnique(
                    [`${w} m`, `${w + 5} m`, `${p / 2} m`],
                    `${w} m`,
                    () => `${Math.max(1, w + randomInt(-5, 10))} m`
                )
            };
        },
        // Type 6 – Two-step: find perimeter first, then cost of fencing
        () => {
            const l = randomInt(10, 30), w = randomInt(5, 20), rate = randomInt(10, 60);
            const p = 2 * (l + w), total = p * rate;
            const key = `t6-${l}-${w}-${rate}`;
            if (usedKeys.has(key)) return null;
            usedKeys.add(key);
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>Fencing a rectangular garden costs <b>₹${rate} per metre</b>. The garden is <b>${l} m × ${w} m</b>. What is the total cost of fencing?</div>`,
                correctAnswer: `₹${total}`,
                solution: `Perimeter = 2(${l} + ${w}) = ${p} m<br/>Total cost = ${p} × ₹${rate} = <b>₹${total}</b>`,
                shuffledOptions: ensureUnique(
                    [`₹${total}`, `₹${l * w * rate}`, `₹${p * rate + 100}`],
                    `₹${total}`,
                    () => `₹${total + randomInt(-100, 300)}`
                )
            };
        },
        // Type 7 – Compare perimeters of two shapes
        () => {
            const l1 = randomInt(6, 20), w1 = randomInt(4, 15);
            const l2 = randomInt(5, 18), w2 = randomInt(3, 12);
            if (l1 === l2 && w1 === w2) return null;
            const p1 = 2 * (l1 + w1), p2 = 2 * (l2 + w2);
            if (p1 === p2) return null;
            const key = `t7-${l1}-${w1}-${l2}-${w2}`;
            if (usedKeys.has(key)) return null;
            usedKeys.add(key);
            const winner = p1 > p2 ? `Garden A (${p1} m)` : `Garden B (${p2} m)`;
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>Garden A is <b>${l1} m × ${w1} m</b>. Garden B is <b>${l2} m × ${w2} m</b>. Which garden needs <b>more fencing</b>?</div>`,
                correctAnswer: winner,
                solution: `Perimeter of Garden A = 2(${l1}+${w1}) = <b>${p1} m</b><br/>Perimeter of Garden B = 2(${l2}+${w2}) = <b>${p2} m</b><br/>${winner} needs more fencing.`,
                shuffledOptions: [`Garden A (${p1} m)`, `Garden B (${p2} m)`, "Both equal", "Cannot be determined"].sort(() => Math.random() - 0.5)
            };
        },
        // Type 8 – Laps around a field (total distance)
        () => {
            const l = randomInt(30, 100), w = randomInt(20, 60), laps = randomInt(2, 5);
            const p = 2 * (l + w), total = p * laps;
            const key = `t8-${l}-${w}-${laps}`;
            if (usedKeys.has(key)) return null;
            usedKeys.add(key);
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>Ravi runs <b>${laps} rounds</b> around a rectangular field <b>${l} m × ${w} m</b>. What is the total distance he covers?</div>`,
                correctAnswer: `${total} m`,
                solution: `Perimeter of field = 2(${l}+${w}) = ${p} m<br/>Total distance = ${laps} × ${p} = <b>${total} m</b>`,
                shuffledOptions: ensureUnique(
                    [`${total} m`, `${p} m`, `${total + laps * 10} m`],
                    `${total} m`,
                    () => `${total + randomInt(-50, 100)} m`
                )
            };
        },
    ];

    // Cycle through types and fill 10 unique questions
    let attempts = 0;
    while (qs.length < TOTAL_QUESTIONS && attempts < 200) {
        const typeIndex = qs.length % typeGenerators.length;
        const q = typeGenerators[typeIndex]();
        if (q) qs.push(q);
        attempts++;
    }

    return qs;
}

const SkillApplicationProblemsArea = () => {
    const navigate = useNavigate();

    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [sessionId, setSessionId] = useState(null);

    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    useEffect(() => {
        const qs = generateQuestions();
        setSessionQuestions(qs);

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess?.session_id) setSessionId(sess.session_id);
            }).catch(console.error);
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
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const q = sessionQuestions[qIndex];
            setCurrentQuestion(q);
            setShuffledOptions(q.shuffledOptions);
            const ans = answers[qIndex];
            if (ans) { setSelectedOption(ans.selected); setIsSubmitted(true); setIsCorrect(ans.isCorrect); }
            else { setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false); }
        }
    }, [qIndex, sessionQuestions]);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    const recordAttempt = async (q, selected, right) => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        const timeSpent = accumulatedTime.current + (isTabActive.current ? Date.now() - questionStartTime.current : 0);
        const secs = Math.max(0, Math.round(timeSpent / 1000));
        try {
            await api.recordAttempt({
                user_id: parseInt(userId, 10), session_id: sessionId, skill_id: SKILL_ID,
                difficulty_level: 'Medium',
                question_text: String(q.text || ''), correct_answer: String(q.correctAnswer || ''),
                student_answer: String(selected || ''), is_correct: right,
                solution_text: String(q.solution || ''), time_spent_seconds: secs
            });
        } catch (e) { console.error(e); }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const right = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(right);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { selected: selectedOption, isCorrect: right } }));
        if (right) setFeedbackMessage(CORRECT_MESSAGES[randomInt(0, CORRECT_MESSAGES.length - 1)]);
        else setShowExplanationModal(true);
        recordAttempt(currentQuestion, selectedOption, right);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setShowExplanationModal(false);
            setSelectedOption(null); setIsSubmitted(false); setIsCorrect(false);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(v => v.isCorrect).length;
                try {
                    await api.createReport({
                        title: SKILL_NAME, type: 'practice',
                        score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                        parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, time_taken_seconds: timeElapsed },
                        user_id: parseInt(userId, 10)
                    });
                } catch (e) { console.error(e); }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) { setQIndex(prev => prev - 1); setShowExplanationModal(false); }
    };

    if (!currentQuestion && !showResults)
        return <div className="flex h-screen items-center justify-center text-2xl font-bold text-[#31326F]">Loading...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button onClick={() => navigate(-1)} className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm">Back to Topics</button>
                    <div className="sun-timer-container"><div className="sun-timer"><div className="sun-rays"></div><span className="timer-text">Done!</span></div></div>
                    <div className="title-area"><h1 className="results-title">Skill Challenge Report</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 text-center">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Session Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-3 gap-4 w-full max-w-2xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF]">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span>
                                <span className="text-3xl font-black text-[#31326F]">{percentage}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-semibold text-xl shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Play Again
                        </button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-semibold text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate(-1)}>Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <button className="bg-white/90 backdrop-blur-md p-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] shadow-md hover:bg-white transition-all" onClick={() => navigate(-1)}><X size={24} /></button>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-semibold text-sm sm:text-xl shadow-lg whitespace-nowrap">
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
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '820px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ height: '100%', width: '100%' }}>
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2.2rem', fontWeight: '500', textAlign: 'center', maxHeight: 'none', overflow: 'visible' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                                    style={{ fontFamily: '"Open Sans", sans-serif', fontWeight: '500', fontSize: '1.8rem' }}
                                                    onClick={() => { if (!isSubmitted) setSelectedOption(option); }}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                                {feedbackMessage}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
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
                            onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>}
                            {isSubmitted
                                ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}</button>
                                : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>
                            }
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                    </div>
                    <div className="mobile-footer-right" style={{ flex: 1, maxWidth: '70%', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="nav-buttons-group" style={{ gap: '6px' }}>
                            {qIndex > 0 && <button className="nav-pill-next-btn" onClick={handlePrevious} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Prev</button>}
                            {isSubmitted
                                ? <button className="nav-pill-next-btn" onClick={handleNext} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                                : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Submit</button>
                            }
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SkillApplicationProblemsArea;
