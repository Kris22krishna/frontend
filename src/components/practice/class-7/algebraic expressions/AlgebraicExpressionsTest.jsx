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

/* ─── SVG Visuals ─── */
const TestVisual = ({ type, data }) => {
    const s = "#31326F", f = "#4FB7B320", l = "#FF6B6B";

    // Reuse visual logic if needed, or keep simple for test
    if (type === 'tree_diagram') {
        return (
            <svg width="200" height="120" viewBox="0 0 200 120">
                <text x="100" y="20" fontSize="14" fill={s} textAnchor="middle" fontWeight="bold">5x²y</text>
                <line x1="100" y1="30" x2="50" y2="70" stroke={s} strokeWidth="1" />
                <line x1="100" y1="30" x2="100" y2="70" stroke={s} strokeWidth="1" />
                <line x1="100" y1="30" x2="150" y2="70" stroke={s} strokeWidth="1" />
                <text x="50" y="90" fontSize="12" fill={s} textAnchor="middle">5</text>
                <text x="100" y="90" fontSize="12" fill={s} textAnchor="middle">x</text>
                <text x="150" y="90" fontSize="12" fill={s} textAnchor="middle">?</text>
            </svg>
        );
    }
    return null;
};

/* ─── Main Component ─── */
const AlgebraicExpressionsTest = () => {
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
    const [isFinished, setIsFinished] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [fromReview, setFromReview] = useState(false);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = "1100";
    const SKILL_NAME = "Class 7 - Algebraic Expressions - Chapter Test";

    /* ─── Helper: pick N random items from an array ─── */
    const pickRandom = (arr, n) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, n);
    };

    /* ─── Helper: Shuffle options ensuring no duplicates ─── */
    const shuffle = (array) => {
        return [...new Set(array)].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const formationQuestions = [
            () => ({ text: `<p>Write an algebraic expression for: subtraction of \\(z\\) from \\(y\\).</p>`, correctAnswer: "\\(y - z\\)", options: shuffle(["\\(y - z\\)", "\\(z - y\\)", "\\(y + z\\)", "\\(yz\\)"]), solution: `<p>Subtraction of \\(z\\) from \\(y\\) is \\(y - z\\).</p>` }),
            () => ({ text: `<p>Write expression: 5 added to three times the product of \\(m\\) and \\(n\\).</p>`, correctAnswer: "\\(3mn + 5\\)", options: shuffle(["\\(3mn + 5\\)", "\\(5mn + 3\\)", "\\(3(m+n) + 5\\)", "\\(3m + 5n\\)"]), solution: `<p>Product is \\(mn\\), three times is \\(3mn\\), add 5 is \\(3mn + 5\\).</p>` }),
            () => ({ text: `<p>Express: twice the sum of \\(a\\) and \\(b\\).</p>`, correctAnswer: "\\(2(a + b)\\)", options: shuffle(["\\(2(a + b)\\)", "\\(2a + b\\)", "\\(a + 2b\\)", "\\(2ab\\)"]), solution: `<p>Sum is \\(a+b\\), twice means multiply by 2: \\(2(a + b)\\).</p>` }),
            () => ({ text: `<p>Write an expression: one-fourth of \\(x\\) added to \\(3\\).</p>`, correctAnswer: "\\(\\frac{x}{4} + 3\\)", options: shuffle(["\\(\\frac{x}{4} + 3\\)", "\\(\\frac{x+3}{4}\\)", "\\(4x + 3\\)", "\\(\\frac{3}{4}x\\)"]), solution: `<p>One-fourth of \\(x\\) is \\(\\frac{x}{4}\\), add 3.</p>` }),
            () => ({ text: `<p>The perimeter of a square with side \\(s\\) is:</p>`, correctAnswer: "\\(4s\\)", options: shuffle(["\\(4s\\)", "\\(s^2\\)", "\\(2s\\)", "\\(s+4\\)"]), solution: `<p>Perimeter = 4 × side = \\(4s\\).</p>` }),
            () => ({ text: `<p>Express: 7 subtracted from the product of \\(p\\) and \\(q\\).</p>`, correctAnswer: "\\(pq - 7\\)", options: shuffle(["\\(pq - 7\\)", "\\(7 - pq\\)", "\\(p + q - 7\\)", "\\(7pq\\)"]), solution: `<p>Product is \\(pq\\), subtract 7 gives \\(pq - 7\\).</p>` }),
        ];

        const termsFactorsQuestions = [
            () => ({ text: `<p>Identify terms in: \\(x - 3\\).</p>`, correctAnswer: "\\(x\\) and \\(-3\\)", options: shuffle(["\\(x\\) and \\(-3\\)", "\\(x\\) and \\(3\\)", "\\(x, 3\\)", "\\(x - 3\\)"]), solution: `<p>Terms are separated by +/-. Here: \\(x\\) and \\(-3\\).</p>` }),
            () => ({ text: `<p>In the tree diagram for \\(5x^2y\\), if factors are 5, x, and ?, what is ??</p>`, visual: { type: 'tree_diagram' }, correctAnswer: "\\(x\\) and \\(y\\)", options: shuffle(["\\(x\\) and \\(y\\)", "\\(y\\) only", "\\(x^2\\)", "\\(1\\)"]), solution: `<p>Factors are \\(5, x, x, y\\). The branches show split.</p>` }),
            () => ({ text: `<p>How many terms are in \\(3a^2 - 2ab + 5b\\)?</p>`, correctAnswer: "3", options: shuffle(["3", "2", "4", "5"]), solution: `<p>Terms: \\(3a^2\\), \\(-2ab\\), \\(5b\\). Count = 3.</p>` }),
            () => ({ text: `<p>What are the factors of \\(-7mn\\)?</p>`, correctAnswer: "-7, m, n", options: shuffle(["-7, m, n", "7, m, n", "-1, 7, m, n", "-7mn"]), solution: `<p>\\(-7mn = -7 \\times m \\times n\\).</p>` }),
            () => ({ text: `<p>What is the coefficient of \\(y\\) in \\(-3y\\)?</p>`, correctAnswer: "-3", options: shuffle(["-3", "3", "y", "-1"]), solution: `<p>The numerical coefficient is -3.</p>` }),
            () => ({ text: `<p>In \\(6ab\\), what is the coefficient of \\(a\\)?</p>`, correctAnswer: "6b", options: shuffle(["6b", "6", "b", "6a"]), solution: `<p>Everything multiplying \\(a\\) is \\(6b\\).</p>` }),
        ];

        const likeUnlikeQuestions = [
            () => ({ text: `<p>Are \\(7x\\) and \\(12y\\) like terms?</p>`, correctAnswer: "No", options: shuffle(["No", "Yes", "Sometimes", "Cannot decide"]), solution: `<p>Different variables, so unlike terms.</p>` }),
            () => ({ text: `<p>Identify like terms for \\(12x\\) from: \\(12, -25x, -25y, x\\).</p>`, correctAnswer: "\\(-25x, x\\)", options: shuffle(["\\(-25x, x\\)", "\\(12, -25y\\)", "\\(-25x, -25y\\)", "\\(12, x\\)"]), solution: `<p>Terms with \\(x\\): \\(-25x\\) and \\(x\\).</p>` }),
            () => ({ text: `<p>Are \\(4xy\\) and \\(-xy\\) like terms?</p>`, correctAnswer: "Yes", options: shuffle(["Yes", "No", "Only if positive", "Cannot decide"]), solution: `<p>Same variables \\(xy\\), so like terms.</p>` }),
            () => ({ text: `<p>Which pair are unlike terms?</p>`, correctAnswer: "\\(5x, 5y\\)", options: shuffle(["\\(5x, 5y\\)", "\\(3a, -a\\)", "\\(2xy, 7xy\\)", "\\(x^2, 4x^2\\)"]), solution: `<p>\\(5x\\) and \\(5y\\) have different variables.</p>` }),
            () => ({ text: `<p>Add: \\(3x + 7x\\).</p>`, correctAnswer: "\\(10x\\)", options: shuffle(["\\(10x\\)", "\\(10x^2\\)", "\\(21x\\)", "\\(10\\)"]), solution: `<p>Like terms: \\(3x + 7x = 10x\\).</p>` }),
            () => ({ text: `<p>Simplify: \\(5a - 2a + a\\).</p>`, correctAnswer: "\\(4a\\)", options: shuffle(["\\(4a\\)", "\\(3a\\)", "\\(8a\\)", "\\(6a\\)"]), solution: `<p>\\(5a - 2a + a = 4a\\).</p>` }),
        ];

        const polynomialsQuestions = [
            () => ({ text: `<p>Classify \\(x + y - xy\\).</p>`, correctAnswer: "Trinomial", options: shuffle(["Trinomial", "Binomial", "Monomial", "Polynomial"]), solution: `<p>3 unlike terms → Trinomial.</p>` }),
            () => ({ text: `<p>Classify \\(100\\).</p>`, correctAnswer: "Monomial", options: shuffle(["Monomial", "Constant Only", "Binomial", "Not a polynomial"]), solution: `<p>1 term → Monomial.</p>` }),
            () => ({ text: `<p>Classify \\(a + b\\).</p>`, correctAnswer: "Binomial", options: shuffle(["Binomial", "Monomial", "Trinomial", "Linear"]), solution: `<p>2 unlike terms → Binomial.</p>` }),
            () => ({ text: `<p>How many terms in \\(x^2 + 2x + 1\\)?</p>`, correctAnswer: "3", options: shuffle(["3", "2", "1", "4"]), solution: `<p>Trinomial with 3 terms.</p>` }),
            () => ({ text: `<p>Is \\(5xy\\) a monomial?</p>`, correctAnswer: "Yes", options: shuffle(["Yes", "No", "It's a binomial", "It's a constant"]), solution: `<p>Single term → Monomial.</p>` }),
            () => ({ text: `<p>Classify \\(p^2 - q\\).</p>`, correctAnswer: "Binomial", options: shuffle(["Binomial", "Monomial", "Trinomial", "None"]), solution: `<p>Two unlike terms → Binomial.</p>` }),
        ];

        const valueQuestions = [
            () => ({ text: `<p>Value of \\(x + 4\\) for \\(x = 2\\)?</p>`, correctAnswer: "6", options: shuffle(["6", "8", "4", "2"]), solution: `<p>2 + 4 = 6.</p>` }),
            () => ({ text: `<p>Value of \\(n^2 - 2n\\) for \\(n = -2\\)?</p>`, correctAnswer: "8", options: shuffle(["8", "0", "4", "-8"]), solution: `<p>\\((-2)^2 - 2(-2) = 4 + 4 = 8\\).</p>` }),
            () => ({ text: `<p>Find \\(3a + 5\\) when \\(a = 4\\).</p>`, correctAnswer: "17", options: shuffle(["17", "12", "20", "9"]), solution: `<p>\\(3(4) + 5 = 12 + 5 = 17\\).</p>` }),
            () => ({ text: `<p>Value of \\(2x^2\\) for \\(x = 3\\)?</p>`, correctAnswer: "18", options: shuffle(["18", "12", "36", "6"]), solution: `<p>\\(2(3)^2 = 2 \\times 9 = 18\\).</p>` }),
            () => ({ text: `<p>If \\(p = -1\\), find \\(p^3 + 1\\).</p>`, correctAnswer: "0", options: shuffle(["0", "2", "-2", "1"]), solution: `<p>\\((-1)^3 + 1 = -1 + 1 = 0\\).</p>` }),
            () => ({ text: `<p>Value of \\(ab\\) when \\(a = 2, b = 5\\)?</p>`, correctAnswer: "10", options: shuffle(["10", "7", "3", "25"]), solution: `<p>\\(2 \\times 5 = 10\\).</p>` }),
        ];

        // Pick 5 from each topic -> 25 questions total
        const selected = [
            ...pickRandom(formationQuestions, 5).map(fn => fn()),
            ...pickRandom(termsFactorsQuestions, 5).map(fn => fn()),
            ...pickRandom(likeUnlikeQuestions, 5).map(fn => fn()),
            ...pickRandom(polynomialsQuestions, 5).map(fn => fn()),
            ...pickRandom(valueQuestions, 5).map(fn => fn()),
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
        try {
            await api.recordAttempt({
                user_id: parseInt(uid),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: 'Medium',
                question_text: String(q.text),
                correct_answer: String(q.correctAnswer),
                student_answer: String(sel),
                is_correct: cor,
                solution_text: String(q.solution),
                time_spent_seconds: Math.max(0, Math.round(t / 1000))
            });
        } catch (e) {
            console.error(e);
        }
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

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
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
            await api.createReport({
                title: SKILL_NAME,
                type: 'practice',
                score: (c / questions.length) * 100,
                parameters: {
                    skill_id: SKILL_ID,
                    skill_name: SKILL_NAME,
                    total_questions: questions.length,
                    correct_answers: c,
                    time_taken_seconds: timeElapsed
                },
                user_id: parseInt(uid)
            }).catch(console.error);
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
                                            <div className="flex items-center gap-2 sm:gap-3">
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
                                    <button key={idx} onClick={() => { setQIndex(idx); setShowReview(false); setFromReview(true); }} className="aspect-square rounded-xl border-2 border-amber-200 bg-amber-50 text-[#31326F] font-bold text-lg sm:text-xl hover:bg-amber-100 hover:border-amber-300 active:scale-95 transition-all flex items-center justify-center shadow-sm">Q{idx + 1}</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button onClick={() => { setQIndex(questions.length - 1); setShowReview(false); }} className="px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-[#31326F] text-[#31326F] font-bold text-base sm:text-lg hover:bg-gray-50 transition-all">Go Back</button>
                            <button onClick={handleFinalSubmit} className="px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#31326F] text-white font-black text-base sm:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 justify-center">Submit Anyway <Check size={22} /></button>
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
                <div className="header-left"><span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>Chapter Test</span></div>
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
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2" onClick={() => navigate(-1)}>Exit</button></div>
                    <div className="bottom-center"></div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-700 border-2 border-gray-300" onClick={handlePrevious} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>
                            <button className="nav-pill-next-btn bg-gray-500 text-white border-2 border-gray-600" onClick={handleSkip}>Skip <ChevronRight size={28} strokeWidth={3} /></button>
                            <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>
                                {qIndex < questions.length - 1 ? (<>Next <ChevronRight size={28} strokeWidth={3} /></>) : (<>Done <Check size={28} strokeWidth={3} /></>)}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={() => navigate(-1)}><X size={20} /></button>
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button className="nav-pill-next-btn bg-gray-200 text-gray-700 p-2 border border-gray-300" onClick={handlePrevious} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1, minWidth: 'auto' }}><ChevronLeft size={20} /></button>
                            <button className="nav-pill-next-btn bg-gray-500 text-white p-2 border border-gray-600" onClick={handleSkip}>Skip</button>
                            <button className="nav-pill-next-btn" onClick={handleQuestionComplete} disabled={!selectedOption}>
                                {qIndex < questions.length - 1 ? "Next" : "Done"}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AlgebraicExpressionsTest;
