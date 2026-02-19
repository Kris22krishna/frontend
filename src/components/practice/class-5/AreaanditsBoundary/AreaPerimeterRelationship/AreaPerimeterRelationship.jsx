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
    "✨ Boundary boss! ✨",
    "🌟 Area genius! 🌟",
    "🎉 Shape master! 🎉",
    "🚀 Excellent thinking! 🚀",
    "💎 Superb! 💎"
];

const SKILL_ID = 1167;
const SKILL_NAME = "Relationship Between Area and Perimeter";
const TOTAL_QUESTIONS = 10;

/**
 * Generates 10 unique, varied Grade-5 questions about the
 * relationship between area and perimeter.
 * Question types (cycled, no repeats):
 *  1. Given perimeter; find area
 *  2. Given area; find missing side (rectangle)
 *  3. Same perimeter, different shape – which has larger area?
 *  4. Side doubles – what happens to perimeter?
 *  5. Side doubles – what happens to area?
 *  6. Compare area vs perimeter of the same shape
 */
function generateQuestions() {
    const qs = [];
    const usedKeys = new Set();

    // Types we want to cycle through
    const typeGenerators = [
        // Type 1 – Given perimeter, find area
        () => {
            let l, w, p, key;
            let tries = 0;
            do {
                l = randomInt(4, 15); w = randomInt(3, 12); p = 2 * (l + w);
                key = `t1-${l}-${w}`;
                tries++;
            } while (usedKeys.has(key) && tries < 50);
            usedKeys.add(key);
            const area = l * w;
            const wrong1 = new Set([`${area} sq cm`]);
            const opts = new Set([`${area} sq cm`]);
            while (opts.size < 4) {
                const r = area + randomInt(-8, 15);
                if (r > 0 && !wrong1.has(`${r} sq cm`)) { opts.add(`${r} sq cm`); wrong1.add(`${r} sq cm`); }
            }
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A rectangle has a perimeter of <b>${p} cm</b>, length <b>${l} cm</b> and breadth <b>${w} cm</b>. What is its <b>area</b>?</div>`,
                correctAnswer: `${area} sq cm`,
                solution: `Area = length × breadth = ${l} × ${w} = <b>${area} sq cm</b>`,
                shuffledOptions: Array.from(opts).sort(() => Math.random() - 0.5)
            };
        },
        // Type 2 – Given area and one side, find the other side
        () => {
            let l, w, key;
            let tries = 0;
            do {
                l = randomInt(4, 15); w = randomInt(3, 12);
                key = `t2-${l}-${w}`;
                tries++;
            } while (usedKeys.has(key) && tries < 50);
            usedKeys.add(key);
            const area = l * w;
            const opts = new Set([`${w} cm`]);
            while (opts.size < 4) { opts.add(`${randomInt(2, 18)} cm`); }
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A rectangle has an area of <b>${area} sq cm</b> and length <b>${l} cm</b>. What is its <b>breadth</b>?</div>`,
                correctAnswer: `${w} cm`,
                solution: `Breadth = Area ÷ Length = ${area} ÷ ${l} = <b>${w} cm</b>`,
                shuffledOptions: Array.from(opts).sort(() => Math.random() - 0.5)
            };
        },
        // Type 3 – Same Perimeter: Square vs Rectangle – which has larger area?
        () => {
            let side, key;
            let tries = 0;
            do {
                side = randomInt(4, 10);
                key = `t3-${side}`;
                tries++;
            } while (usedKeys.has(key) && tries < 50);
            usedKeys.add(key);
            const p = 4 * side; // square perimeter
            const sqArea = side * side;
            // Rectangle with same perimeter: l = side + d, w = side - d
            const d = randomInt(1, Math.min(side - 1, 3));
            const rl = side + d, rw = side - d;
            const rectArea = rl * rw;
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A <b>square</b> of side <b>${side} cm</b> (Area = ${sqArea} sq cm) and a <b>rectangle</b> <b>${rl} cm × ${rw} cm</b> (Area = ${rectArea} sq cm) have the same perimeter of <b>${p} cm</b>. Which has the <b>larger area</b>?</div>`,
                correctAnswer: `Square (${sqArea} sq cm)`,
                solution: `Square area = ${side} × ${side} = <b>${sqArea} sq cm</b><br/>Rectangle area = ${rl} × ${rw} = <b>${rectArea} sq cm</b><br/>Same perimeter → Square always has the larger area.`,
                shuffledOptions: [`Square (${sqArea} sq cm)`, `Rectangle (${rectArea} sq cm)`, "Both are equal", "Cannot be determined"].sort(() => Math.random() - 0.5)
            };
        },
        // Type 4 – If side doubles, what happens to perimeter?
        () => {
            let side, key;
            let tries = 0;
            do {
                side = randomInt(3, 10);
                key = `t4-${side}`;
                tries++;
            } while (usedKeys.has(key) && tries < 50);
            usedKeys.add(key);
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A square has side <b>${side} cm</b>. If the side is <b>doubled</b>, what happens to its <b>perimeter</b>?</div>`,
                correctAnswer: "It doubles",
                solution: `Original perimeter = 4 × ${side} = ${4 * side} cm<br/>New perimeter = 4 × ${2 * side} = ${8 * side} cm<br/>${8 * side} = 2 × ${4 * side}, so the perimeter <b>doubles</b>.`,
                shuffledOptions: ["It doubles", "It triples", "It stays the same", "It quadruples"].sort(() => Math.random() - 0.5)
            };
        },
        // Type 5 – If side doubles, what happens to area?
        () => {
            let side, key;
            let tries = 0;
            do {
                side = randomInt(3, 10);
                key = `t5-${side}`;
                tries++;
            } while (usedKeys.has(key) && tries < 50);
            usedKeys.add(key);
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>A square has side <b>${side} cm</b>. If the side is <b>doubled</b>, what happens to its <b>area</b>?</div>`,
                correctAnswer: "It becomes 4 times",
                solution: `Original area = ${side} × ${side} = ${side * side} sq cm<br/>New area = ${2 * side} × ${2 * side} = ${4 * side * side} sq cm<br/>${4 * side * side} = 4 × ${side * side}, so the area becomes <b>4 times</b>.`,
                shuffledOptions: ["It doubles", "It becomes 4 times", "It becomes 3 times", "It stays the same"].sort(() => Math.random() - 0.5)
            };
        },
        // Type 6 – Compare area vs perimeter of a rectangle (are they equal/which is larger?)
        () => {
            let l, w, key;
            let tries = 0;
            do {
                l = randomInt(3, 12); w = randomInt(2, 10);
                key = `t6-${l}-${w}`;
                tries++;
            } while (usedKeys.has(key) && tries < 50);
            usedKeys.add(key);
            const area = l * w;
            const perimeter = 2 * (l + w);
            let correct, solution;
            if (area > perimeter) {
                correct = `Area (${area}) > Perimeter (${perimeter})`;
                solution = `Area = ${l} × ${w} = ${area} sq cm<br/>Perimeter = 2(${l}+${w}) = ${perimeter} cm<br/>So Area > Perimeter`;
            } else if (perimeter > area) {
                correct = `Perimeter (${perimeter}) > Area (${area})`;
                solution = `Area = ${l} × ${w} = ${area} sq cm<br/>Perimeter = 2(${l}+${w}) = ${perimeter} cm<br/>So Perimeter > Area`;
            } else {
                correct = "Both are equal";
                solution = `Area = ${area} sq cm and Perimeter = ${perimeter} cm — they are equal!`;
            }
            return {
                text: `<div class='question-container' style='font-family:"Open Sans",sans-serif;font-size:2rem;text-align:center;'>For a rectangle <b>${l} cm × ${w} cm</b>, compare its <b>area</b> (sq cm) and <b>perimeter</b> (cm). Which is larger?</div>`,
                correctAnswer: correct,
                solution,
                shuffledOptions: [
                    `Area (${area}) > Perimeter (${perimeter})`,
                    `Perimeter (${perimeter}) > Area (${area})`,
                    "Both are equal",
                    "Cannot be compared"
                ].sort(() => Math.random() - 0.5)
            };
        },
    ];

    // Generate 10 questions cycling through types
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        const typeIndex = i % typeGenerators.length;
        qs.push(typeGenerators[typeIndex]());
    }

    return qs;
}

const AreaPerimeterRelationship = () => {
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
                    <div className="title-area"><h1 className="results-title">Relationship Report</h1></div>
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

export default AreaPerimeterRelationship;
