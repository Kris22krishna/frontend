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

/* ─── Unified Visual Component ─── */
const TestVisual = ({ type, data }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    // Parallelogram Dimensions
    if (type === 'para_dim') {
        const { base, height } = data;
        return (
            <svg width="200" height="120" viewBox="0 0 200 120">
                <path d="M50,100 L150,100 L170,20 L70,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="70" y1="20" x2="70" y2="100" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="70" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />
                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">{base}</text>
                <text x="65" y="60" fontSize="12" fill={l} textAnchor="end">{height}</text>
            </svg>
        );
    }

    // Triangle Dimensions
    if (type === 'tri_dim') {
        const { base, height } = data;
        return (
            <svg width="200" height="120" viewBox="0 0 200 120">
                <path d="M40,100 L160,100 L100,20 Z" fill={f} stroke={s} strokeWidth="2" />
                <line x1="100" y1="20" x2="100" y2="100" stroke={l} strokeWidth="1.5" strokeDasharray="4" />
                <rect x="100" y="90" width="10" height="10" fill="none" stroke={l} strokeWidth="1" />
                <text x="100" y="115" fontSize="12" fill={s} textAnchor="middle">{base}</text>
                <text x="105" y="60" fontSize="12" fill={l} textAnchor="start">{height}</text>
            </svg>
        );
    }

    // Circle Dimensions
    if (type === 'circle_dim') {
        const { r } = data;
        return (
            <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="50" fill={f} stroke={s} strokeWidth="2" />
                <circle cx="70" cy="70" r="2" fill={s} />
                <line x1="70" y1="70" x2="120" y2="70" stroke={l} strokeWidth="2" />
                <text x="95" y="60" fontSize="12" fill={l} textAnchor="middle">r = {r}</text>
            </svg>
        );
    }

    // Wire problem
    if (type === 'wire') {
        return (
            <svg width="200" height="80" viewBox="0 0 200 80">
                <rect x="30" y="15" width="50" height="50" fill="none" stroke={l} strokeWidth="2" />
                <text x="55" y="75" fontSize="10" fill={s} textAnchor="middle">Square</text>

                <path d="M100,40 L120,40" stroke={s} strokeWidth="2" markerEnd="url(#arrow)" />
                <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill={s} /></marker></defs>

                <circle cx="160" cy="40" r="25" fill="none" stroke={s} strokeWidth="2" />
                <text x="160" y="75" fontSize="10" fill={s} textAnchor="middle">Circle</text>
            </svg>
        );
    }

    return null;
};

/* ─── Main Component ─── */
const PerimeterAreaTest = () => {
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

    const SKILL_ID = "1093";
    const SKILL_NAME = "Class 7 - Perimeter and Area - Chapter Test";

    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    useEffect(() => {
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // ── TOPIC 1: Parallelograms ──
        const paraPool = [
            () => ({ text: `<p>Find area of parallelogram with Base=7 cm, Height=4 cm.</p>`, visual: { type: 'para_dim', data: { base: '7 cm', height: '4 cm' } }, correctAnswer: "28 cm²", options: shuffle(["28 cm²", "14 cm²", "11 cm²", "22 cm²"]), solution: `<p>Area = \\( b \\times h = 7 \\times 4 = 28 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>If Area = 246 cm² and Base = 20 cm, find Height.</p>`, correctAnswer: "12.3 cm", options: shuffle(["12.3 cm", "123 cm", "12.3 cm²", "10 cm"]), solution: `<p>Height = \\( 246 \\div 20 = 12.3 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>A parallelogram has base 8 cm and height 3.5 cm. What is its area?</p>`, visual: { type: 'para_dim', data: { base: '8 cm', height: '3.5 cm' } }, correctAnswer: "28 cm²", options: shuffle(["28 cm²", "32 cm²", "24 cm²", "14 cm²"]), solution: `<p>Area = \\( 8 \\times 3.5 = 28 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>Find the base of a parallelogram if Area = 56 cm² and Height = 7 cm.</p>`, correctAnswer: "8 cm", options: shuffle(["8 cm", "7 cm", "49 cm", "63 cm"]), solution: `<p>Base = \\( 56 \\div 7 = 8 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>The area formula for a parallelogram is:</p>`, correctAnswer: "base × height", options: shuffle(["base × height", "½ × base × height", "side × side", "length × breadth × 2"]), solution: `<p>Area of parallelogram = \\( b \\times h \\).</p>` }),
        ];

        // ── TOPIC 2: Triangles ──
        const triPool = [
            () => ({ text: `<p>Find area of triangle with Base=4 cm, Height=3 cm.</p>`, visual: { type: 'tri_dim', data: { base: '4 cm', height: '3 cm' } }, correctAnswer: "6 cm²", options: shuffle(["6 cm²", "12 cm²", "7 cm²", "10 cm²"]), solution: `<p>Area = \\( \\frac{1}{2} \\times 4 \\times 3 = 6 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>Find height of triangle if Area = 87 cm² and Base = 15 cm.</p>`, correctAnswer: "11.6 cm", options: shuffle(["11.6 cm", "5.8 cm", "116 cm", "12 cm"]), solution: `<p>\\( 87 = \\frac{1}{2} \\times 15 \\times h \\Rightarrow 174 = 15h \\Rightarrow h = 11.6 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>Is the area of a triangle half of a parallelogram of the same base and height?</p>`, correctAnswer: "Yes", options: shuffle(["Yes", "No", "Depends on shape", "Only for right triangles"]), solution: `<p>Yes, two identical triangles form a parallelogram.</p>` }),
            () => ({ text: `<p>Find the area of a triangle with Base = 10 cm and Height = 6 cm.</p>`, visual: { type: 'tri_dim', data: { base: '10 cm', height: '6 cm' } }, correctAnswer: "30 cm²", options: shuffle(["30 cm²", "60 cm²", "16 cm²", "20 cm²"]), solution: `<p>Area = \\( \\frac{1}{2} \\times 10 \\times 6 = 30 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>A triangle has area 24 cm² and base 8 cm. Find its height.</p>`, correctAnswer: "6 cm", options: shuffle(["6 cm", "3 cm", "16 cm", "12 cm"]), solution: `<p>\\( 24 = \\frac{1}{2} \\times 8 \\times h \\Rightarrow h = 6 \\text{ cm} \\).</p>` }),
        ];

        // ── TOPIC 3: Circles ──
        const circPool = [
            () => ({ text: `<p>Circumference of a circle with radius 14 cm (\\( \\pi = \\frac{22}{7} \\)) is:</p>`, visual: { type: 'circle_dim', data: { r: '14 cm' } }, correctAnswer: "88 cm", options: shuffle(["88 cm", "44 cm", "154 cm", "616 cm"]), solution: `<p>\\( C = 2 \\times \\frac{22}{7} \\times 14 = 88 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>Area of circle with radius 10 cm (\\( \\pi = 3.14 \\)) is:</p>`, visual: { type: 'circle_dim', data: { r: '10 cm' } }, correctAnswer: "314 cm²", options: shuffle(["314 cm²", "31.4 cm²", "100 cm²", "628 cm²"]), solution: `<p>Area = \\( 3.14 \\times 10 \\times 10 = 314 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>A wire in shape of square (side 11 cm) is reshaped into a circle. Find radius (\\( \\pi = \\frac{22}{7} \\)).</p>`, visual: { type: 'wire' }, correctAnswer: "7 cm", options: shuffle(["7 cm", "14 cm", "11 cm", "22 cm"]), solution: `<p>Perimeter = 44 cm. \\( 2\\pi r = 44 \\Rightarrow 2 \\times \\frac{22}{7} \\times r = 44 \\Rightarrow r = 7 \\text{ cm} \\).</p>` }),
            () => ({ text: `<p>Find area of circle with Diameter = 20 cm (\\( \\pi = 3.14 \\)).</p>`, visual: { type: 'circle_dim', data: { r: '10 cm' } }, correctAnswer: "314 cm²", options: shuffle(["314 cm²", "100 cm²", "628 cm²", "31.4 cm²"]), solution: `<p>Radius = 10 cm. Area = \\( 3.14 \\times 100 = 314 \\text{ cm}^2 \\).</p>` }),
            () => ({ text: `<p>Find the circumference of a circle with radius 7 cm (\\( \\pi = \\frac{22}{7} \\)).</p>`, visual: { type: 'circle_dim', data: { r: '7 cm' } }, correctAnswer: "44 cm", options: shuffle(["44 cm", "22 cm", "154 cm", "88 cm"]), solution: `<p>\\( C = 2 \\times \\frac{22}{7} \\times 7 = 44 \\text{ cm} \\).</p>` }),
        ];

        // 5 from Para, 5 from Tri, 5 from Circ => 15 Questions
        const selected = [
            ...pickRandom(paraPool, 5).map(fn => fn()),
            ...pickRandom(triPool, 5).map(fn => fn()),
            ...pickRandom(circPool, 5).map(fn => fn())
        ];

        setQuestions(selected);
    }, []);

    // Session Management
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Perimeter and Area - Chapter Test</span></div>
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
                            {cq.visual && <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}><TestVisual {...cq.visual} /></div>}
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

export default PerimeterAreaTest;
