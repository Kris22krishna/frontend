import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = ["✨ Amazing!", "🌟 Brilliant!", "🎉 Correct!", "🚀 Super!", "💎 Excellent!"];

/* ─── Shared Visuals ─── */
const LineSymmetryVisual = ({ shape, lines }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";
    const DottedLine = ({ x1, y1, x2, y2 }) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={l} strokeWidth="2" strokeDasharray="5,5" />;
    if (shape === 'Letter A') return <svg width="100" height="100" viewBox="0 0 100 100"><text x="50" y="80" textAnchor="middle" fontSize="80" fontWeight="bold" fill={f} stroke={s}>A</text>{lines === 'vertical' && <DottedLine x1="50" y1="10" x2="50" y2="90" />}</svg>;
    if (shape === 'Letter M') return <svg width="100" height="100" viewBox="0 0 100 100"><text x="50" y="80" textAnchor="middle" fontSize="80" fontWeight="bold" fill={f} stroke={s}>M</text>{lines === 'vertical' && <DottedLine x1="50" y1="10" x2="50" y2="90" />}</svg>;
    return null;
};

const RegularPolygonVisual = ({ sides }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";
    const size = 35, cx = 50, cy = 50, points = [];
    for (let i = 0; i < sides; i++) { points.push(`${cx + size * Math.cos((Math.PI * 2 * i) / sides - Math.PI / 2)},${cy + size * Math.sin((Math.PI * 2 * i) / sides - Math.PI / 2)}`); }
    return <svg width="100" height="100" viewBox="0 0 100 100"><polygon points={points.join(' ')} fill={f} stroke={s} strokeWidth="2" /><text x="50" y="95" textAnchor="middle" fontSize="8" fill={s}>{sides} Sides</text></svg>;
};

const RotatingSquareVisual = ({ angleLabel }) => {
    const s = "#31326F", f = "#4FB7B320", a = "#FF6B6B";
    return (
        <svg width="100" height="100" viewBox="0 0 100 100">
            <rect x="30" y="30" width="40" height="40" fill={f} stroke={s} strokeWidth="2" />
            <circle cx="50" cy="50" r="2" fill={a} />
            <path d="M50,20 A30,30 0 0,1 80,50" fill="none" stroke={a} strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
            <defs><marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill={a} /></marker></defs>
            <text x="75" y="25" fontSize="8" fill={a}>{angleLabel}</text>
        </svg>
    );
};

const DualSymmetryVisual = ({ shape }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B", r = "#FFD700";
    if (shape === 'Square') return (
        <svg width="100" height="100" viewBox="0 0 100 100">
            <rect x="25" y="25" width="50" height="50" fill={f} stroke={s} strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="80" stroke={l} strokeWidth="1" strokeDasharray="3,3" />
            <path d="M75,25 A25,25 0 0,1 90,50" fill="none" stroke={r} strokeWidth="2" markerEnd="url(#arrowhead)" />
        </svg>
    );
    return null;
};

const SymmetryTest = () => {
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
    const [isFinished, setIsFinished] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [fromReview, setFromReview] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1089;
    const SKILL_NAME = "Class 7 - Symmetry - Chapter Test";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── Topic 1: Line Symmetry ──
        const pool1 = [
            () => ({ text: `<p>Which letter has vertical line symmetry?</p>`, visual: <LineSymmetryVisual shape="Letter A" lines="vertical" />, correctAnswer: "A", options: shuffle(["A", "F", "P", "Q"]), solution: `<p>Letter A has vertical symmetry.</p>` }),
            () => ({ text: `<p>A regular pentagon has how many lines of symmetry?</p>`, visual: <RegularPolygonVisual sides={5} />, correctAnswer: "5", options: ["4", "5", "6", "10"], solution: `<p>Regular Pentagon (5 sides) has 5 lines of symmetry.</p>` }),
            () => ({ text: `<p>Mirror reflection causes:</p>`, correctAnswer: "Left-right reversal", options: shuffle(["Left-right reversal", "Inversion", "Rotation", "No change"]), solution: `<p>Mirror reflection causes lateral inversion.</p>` }),
            () => ({ text: `<p>Which shape has <b>no</b> line of symmetry?</p>`, correctAnswer: "Scalene Triangle", options: shuffle(["Scalene Triangle", "Isosceles Triangle", "Square", "Rectangle"]), solution: `<p>Scalene triangle has sides of different lengths, so 0 lines of symmetry.</p>` }),
            () => ({ text: `<p>A circle has how many lines of symmetry?</p>`, correctAnswer: "Infinite", options: ["1", "2", "4", "Infinite"], solution: `<p>A circle is symmetric about any diameter.</p>` }),
            () => ({ text: `<p>Which of these has exactly two lines of symmetry?</p>`, correctAnswer: "Rectangle", options: shuffle(["Rectangle", "Square", "Circle", "Scalene Triangle"]), solution: `<p>A rectangle has 2 lines of symmetry (connecting midpoints of opposite sides).</p>` }),
        ];

        // ── Topic 2: Regular Polygons ──
        const pool2 = [
            () => ({ text: `<p>Number of lines of symmetry in a Regular Hexagon?</p>`, visual: <RegularPolygonVisual sides={6} />, correctAnswer: "6", options: ["4", "5", "6", "8"], solution: `<p>Regular Hexagon (6 edges) has 6 lines of symmetry.</p>` }),
            () => ({ text: `<p>A regular polygon with <b>n</b> sides has _____ lines of symmetry.</p>`, correctAnswer: "n", options: ["n", "2n", "n-1", "n/2"], solution: `<p>It has exactly n lines of symmetry.</p>` }),
            () => ({ text: `<p>Is a Rectangle a regular polygon?</p>`, correctAnswer: "No", options: ["Yes", "No", "Sometimes", "Only if square"], solution: `<p>No, because its adjacent sides are not equal.</p>` }),
            () => ({ text: `<p>How many lines of symmetry does a square have?</p>`, correctAnswer: "4", options: ["2", "3", "4", "8"], solution: `<p>A square has 4 lines of symmetry: 2 diagonals + 2 through midpoints of opposite sides.</p>` }),
            () => ({ text: `<p>A regular octagon has how many lines of symmetry?</p>`, visual: <RegularPolygonVisual sides={8} />, correctAnswer: "8", options: ["4", "6", "8", "16"], solution: `<p>Regular octagon (8 sides) has 8 lines of symmetry.</p>` }),
            () => ({ text: `<p>An equilateral triangle has how many lines of symmetry?</p>`, visual: <RegularPolygonVisual sides={3} />, correctAnswer: "3", options: ["1", "2", "3", "6"], solution: `<p>An equilateral triangle has 3 lines of symmetry.</p>` }),
        ];

        // ── Topic 3: Rotational Symmetry ──
        const pool3 = [
            () => ({ text: `<p>What is the order of rotational symmetry for a Square?</p>`, visual: <RotatingSquareVisual angleLabel="90°" />, correctAnswer: "4", options: ["2", "4", "1", "3"], solution: `<p>Square matches itself every 90°. Order = 360/90 = 4.</p>` }),
            () => ({ text: `<p>Angle of rotation for half-turn is:</p>`, correctAnswer: "180°", options: ["90°", "180°", "360°", "45°"], solution: `<p>Half turn = 180°.</p>` }),
            () => ({ text: `<p>Order of rotational symmetry for an Equilateral Triangle?</p>`, visual: <RegularPolygonVisual sides={3} />, correctAnswer: "3", options: ["3", "1", "6", "2"], solution: `<p>Matches every 120°. Order = 3.</p>` }),
            () => ({ text: `<p>If the order of rotation is 6, the angle of rotation is:</p>`, correctAnswer: "60°", options: ["60°", "90°", "30°", "45°"], solution: `<p>360° / 6 = 60°.</p>` }),
            () => ({ text: `<p>What is the order of rotational symmetry of a regular hexagon?</p>`, correctAnswer: "6", options: ["3", "4", "6", "12"], solution: `<p>A regular hexagon matches itself every 60°. Order = 360/60 = 6.</p>` }),
            () => ({ text: `<p>A full turn rotation is:</p>`, correctAnswer: "360°", options: ["90°", "180°", "270°", "360°"], solution: `<p>Full turn = 360°.</p>` }),
        ];

        // ── Topic 4: Relationship ──
        const pool4 = [
            () => ({ text: `<p>Which letter has BOTH line and rotational symmetry?</p>`, correctAnswer: "H", options: ["H", "A", "B", "T"], solution: `<p>H has 2 lines of symmetry and order 2 rotation.</p>` }),
            () => ({ text: `<p>Which figure has both line symmetry and rotational symmetry > 1?</p>`, visual: <DualSymmetryVisual shape="Square" />, correctAnswer: "Square", options: shuffle(["Square", "Trapezium", "Kite", "Isosceles Triangle"]), solution: `<p>Square has both.</p>` }),
            () => ({ text: `<p>Can a figure have order of rotation > 1 with angle 45°?</p>`, correctAnswer: "Yes", options: ["Yes", "No", "Maybe", "Only circle"], solution: `<p>Yes, 360 is divisible by 45 (Order 8).</p>` }),
            () => ({ text: `<p>The center of rotation for a circle is its:</p>`, correctAnswer: "Center", options: ["Center", "Circumference", "Diameter", "Radius"], solution: `<p>It rotates around its center.</p>` }),
            () => ({ text: `<p>Does a parallelogram have rotational symmetry?</p>`, correctAnswer: "Yes, order 2", options: shuffle(["Yes, order 2", "No", "Yes, order 4", "Yes, order 1"]), solution: `<p>A parallelogram maps onto itself at 180° → order 2.</p>` }),
            () => ({ text: `<p>Which shape has the highest order of rotational symmetry?</p>`, correctAnswer: "Circle", options: shuffle(["Circle", "Square", "Hexagon", "Equilateral Triangle"]), solution: `<p>A circle has infinite order of rotational symmetry.</p>` }),
            () => ({ text: `<p>Letter "S" has which type of symmetry?</p>`, correctAnswer: "Rotational only", options: shuffle(["Rotational only", "Line only", "Both", "Neither"]), solution: `<p>"S" has rotational symmetry of order 2 but no line of symmetry.</p>` }),
        ];

        // Pick 25 questions randomly
        const selected = [
            ...pickRandom(pool1, 6).map(fn => fn()),
            ...pickRandom(pool2, 6).map(fn => fn()),
            ...pickRandom(pool3, 6).map(fn => fn()),
            ...pickRandom(pool4, 7).map(fn => fn()),
        ];

        setQuestions(pickRandom(selected, 25));
    }, []);

    useEffect(() => {
        if (isFinished) return;
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (uid && !sessionId) api.createPracticeSession(uid, SKILL_ID).then(s => s && setSessionId(s.session_id)).catch(console.error);
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const hv = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false; } else { questionStartTime.current = Date.now(); isTabActive.current = true; } };
        document.addEventListener("visibilitychange", hv);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", hv); };
    }, [sessionId, isFinished]);

    const recordAttempt = async (q, sel, cor, isSkipped = false) => {
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!uid) return;
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const seconds = Math.max(0, Math.round(t / 1000));
        try { await api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, difficulty_level: 'Medium', question_text: String(q.text), correct_answer: String(q.correctAnswer), student_answer: String(sel), is_correct: cor, solution_text: String(q.solution), time_spent_seconds: seconds }); } catch (e) { console.error(e); }
    };

    const handleQuestionComplete = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const right = selectedOption === questions[qIndex].correctAnswer;

        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const timeSpent = Math.max(0, Math.round(t / 1000));

        const updatedAnswers = { ...answers, [qIndex]: { selectedOption, isCorrect: right, timeSpent, isSkipped: false } };
        setAnswers(updatedAnswers);
        recordAttempt(questions[qIndex], selectedOption, right);

        if (fromReview) {
            setFromReview(false);
            setShowReview(true);
            return;
        }

        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const skippedIndices = questions.map((_, i) => i).filter(i => !updatedAnswers[i] || updatedAnswers[i].isSkipped);
            if (skippedIndices.length > 0) {
                setShowReview(true);
            } else {
                handleFinalSubmit();
            }
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const handleSkip = () => {
        let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current;
        const timeSpent = Math.max(0, Math.round(t / 1000));

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: 'Skipped', isCorrect: false, timeSpent, isSkipped: true } }));
        recordAttempt(questions[qIndex], 'Skipped', false, true);

        if (fromReview) {
            setFromReview(false);
            setShowReview(true);
            return;
        }
        handleNext();
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0; questionStartTime.current = Date.now();
        } else {
            const skippedIndices = questions.map((_, i) => i).filter(i => !answers[i] || answers[i].isSkipped);
            if (skippedIndices.length > 0) {
                setShowReview(true);
            } else {
                await handleFinalSubmit();
            }
        }
    };

    const handleFinalSubmit = async () => {
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (uid) {
            const c = Object.values(answers).filter(v => v.isCorrect).length;
            await api.createReport({ title: SKILL_NAME, type: 'practice', score: (c / questions.length) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: c, time_taken_seconds: timeElapsed }, user_id: parseInt(uid) }).catch(console.error);
        }
        setIsFinished(true);
        setShowReview(false);
    };

    useEffect(() => {
        const saved = answers[qIndex];
        if (saved && !saved.isSkipped) {
            setSelectedOption(saved.selectedOption);
        } else {
            setSelectedOption(null);
        }
        setIsCorrect(false);
        setIsSubmitted(false);
        setShowExplanationModal(false);
    }, [qIndex]);

    if (questions.length === 0) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#31326F' }}>Loading questions...</div>;

    if (isFinished) {
        const attempted = Object.values(answers).filter(a => !a.isSkipped).length;
        const correct = Object.values(answers).filter(a => a.isCorrect).length;
        const wrong = attempted - correct;
        const skipped = Object.values(answers).filter(a => a.isSkipped).length;

        return (
            <div className="junior-practice-page raksha-theme p-3 sm:p-8 pb-24 sm:pb-32" style={{ fontFamily: '"Open Sans", sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}>
                <div className="max-w-3xl mx-auto w-full">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <img src={mascotImg} alt="Mascot" className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 object-contain" />
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-1 sm:mb-2 text-balance">Test Complete!</h2>
                            <p className="text-sm sm:text-base text-gray-500 line-clamp-2">How you performed in<br />{SKILL_NAME}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                            <div className="bg-blue-50 p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-blue-100">
                                <div className="text-blue-500 font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 uppercase tracking-wider">Total Time</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
                            </div>
                            <div className="bg-green-50 p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-green-100">
                                <div className="text-green-500 font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 uppercase tracking-wider">Correct</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{correct}</div>
                            </div>
                            <div className="bg-red-50 p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-red-100">
                                <div className="text-red-500 font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 uppercase tracking-wider">Wrong</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{wrong}</div>
                            </div>
                            <div className="bg-gray-50 p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center border border-gray-100">
                                <div className="text-gray-500 font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 uppercase tracking-wider">Skipped</div>
                                <div className="text-lg sm:text-2xl font-black text-[#31326F]">{skipped}</div>
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-lg sm:text-xl font-bold text-[#31326F] border-b pb-2">Detailed Report</h3>
                            {questions.map((q, idx) => {
                                const ans = answers[idx] || { isSkipped: true, selectedOption: 'Not Attempted', isCorrect: false, timeSpent: 0 };
                                return (
                                    <div key={idx} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-gray-100 hover:border-[#4FB7B3]/30 transition-all bg-white shadow-sm">
                                        <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#31326F] text-white flex items-center justify-center font-bold text-xs sm:text-sm">{idx + 1}</span>
                                                <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-semibold text-gray-500">
                                                    Time: {ans.timeSpent}s
                                                </div>
                                            </div>
                                            {ans.isSkipped ? (
                                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-[9px] sm:text-xs uppercase">Skipped</span>
                                            ) : ans.isCorrect ? (
                                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-green-100 text-green-600 font-bold text-[9px] sm:text-xs uppercase">Correct</span>
                                            ) : (
                                                <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-100 text-red-600 font-bold text-[9px] sm:text-xs uppercase">Incorrect</span>
                                            )}
                                        </div>
                                        <div className="text-[#31326F] mb-3 sm:mb-4 font-medium text-sm sm:text-base leading-relaxed"><LatexContent html={q.text} /></div>
                                        {q.visual && <div className="flex justify-center my-4 sm:my-6 overflow-x-auto">{q.visual}</div>}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm">
                                            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-100">
                                                <span className="text-gray-400 block mb-0.5 sm:mb-1 text-[9px] sm:text-xs">Your Answer:</span>
                                                <span className={ans.isCorrect ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                                                    <LatexContent html={ans.selectedOption} />
                                                </span>
                                            </div>
                                            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-green-50 border border-green-100">
                                                <span className="text-green-400 block mb-0.5 sm:mb-1 text-[9px] sm:text-xs">Correct Answer:</span>
                                                <span className="text-green-700 font-bold"><LatexContent html={q.correctAnswer} /></span>
                                            </div>
                                        </div>
                                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-amber-50/50 border border-amber-100 text-[#31326F] text-xs sm:text-sm italic">
                                            <span className="font-bold block mb-0.5 sm:mb-1 not-italic text-amber-700">Explanation:</span>
                                            <LatexContent html={q.solution} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 sm:mt-10 flex justify-center">
                            <button className="bg-[#31326F] text-white w-full sm:w-auto px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:scale-105 active:scale-95 transition-all shadow-xl" onClick={() => navigate(-1)}>Done</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Review screen for unanswered questions
    if (showReview) {
        const skippedIndices = questions.map((_, i) => i).filter(i => !answers[i] || answers[i].isSkipped);
        return (
            <div className="junior-practice-page raksha-theme p-3 sm:p-8" style={{ fontFamily: '"Open Sans", sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
                <div className="max-w-3xl mx-auto w-full">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Eye className="text-amber-600" size={36} />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-2">Review Your Test</h2>
                            <p className="text-gray-500 text-base sm:text-lg">You have <span className="font-bold text-amber-600">{skippedIndices.length}</span> unanswered question{skippedIndices.length > 1 ? 's' : ''}.</p>
                        </div>

                        <div className="mb-6 sm:mb-8">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tap to answer</p>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                                {skippedIndices.map(idx => (
                                    <button
                                        key={idx}
                                        onClick={() => { setQIndex(idx); setShowReview(false); setFromReview(true); }}
                                        className="aspect-square rounded-xl border-2 border-amber-200 bg-amber-50 text-[#31326F] font-bold text-lg sm:text-xl hover:bg-amber-100 hover:border-amber-300 active:scale-95 transition-all flex items-center justify-center shadow-sm"
                                    >
                                        Q{idx + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button
                                onClick={() => { setQIndex(questions.length - 1); setShowReview(false); }}
                                className="px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-[#31326F] text-[#31326F] font-bold text-base sm:text-lg hover:bg-gray-50 transition-all"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleFinalSubmit}
                                className="px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#31326F] text-white font-black text-base sm:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 justify-center"
                            >
                                Submit Anyway <Check size={22} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const cq = questions[qIndex];

    return (
        <div className="junior-practice-page raksha-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Symmetry Test</span></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Question {qIndex + 1} / {questions.length}</div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md flex items-center gap-2">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
                </div>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col" style={{ width: '100%' }}>
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible' }}><LatexContent html={cq.text} /></h2>
                            </div>
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>{cq.visual}</div>}
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {cq.options.map((opt, i) => (
                                        <button key={i} className={`option-btn-modern ${selectedOption === opt ? 'selected' : ''}`} onClick={() => setSelectedOption(opt)}><LatexContent html={opt} /></button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="junior-bottom-bar" style={{ position: 'fixed', bottom: 0 }}>
                <div className="desktop-footer-controls">
                    <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit</button>
                    <div className="bottom-center"></div>
                    <div className="nav-buttons-group">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-700 border-2 border-gray-300"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ opacity: qIndex === 0 ? 0.5 : 1 }}
                        >
                            <ChevronLeft size={28} strokeWidth={3} /> Prev
                        </button>
                        <button className="nav-pill-next-btn bg-gray-500 text-white border-2 border-gray-600" onClick={handleSkip}>
                            Skip <ChevronRight size={28} strokeWidth={3} />
                        </button>
                        <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>
                            {qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}
                        </button>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                    <div className="nav-buttons-group">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-700 p-2 border border-gray-300"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ opacity: qIndex === 0 ? 0.5 : 1, minWidth: 'auto' }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button className="nav-pill-next-btn bg-gray-500 text-white p-2 border border-gray-600" onClick={handleSkip}>Skip</button>
                        <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>
                            {qIndex < questions.length - 1 ? "Next" : "Done"}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SymmetryTest;
