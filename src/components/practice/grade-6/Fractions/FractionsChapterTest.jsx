import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';
import LatexContent from '@/components/LatexContent';
import ExplanationModal from '@/components/ExplanationModal';
import mascotImg from '@/assets/mascot.png';
import "@/pages/juniors/JuniorPracticeSession.css";
import "./fractions.css";

const PracticeSummaryModal = ({ isOpen, timeTaken, correctCount, totalCount, onContinue, history }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl my-8 mt-24 flex flex-col max-h-[90vh]"
            >
                <div className="text-center shrink-0 mb-6">
                    <h2 className="text-3xl font-black text-[#31326F] mb-4">Chapter Test Complete!</h2>
                    <div className="text-5xl mb-6">🎊</div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 rounded-2xl border-2 border-gray-100 flex-1">
                            <div className="flex items-center gap-3 text-gray-500 font-bold">
                                <span className="text-xl">🕒</span> Time:
                            </div>
                            <span className="text-xl font-black text-[#31326F]">{timeTaken}</span>
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 bg-green-50 rounded-2xl border-2 border-green-100 flex-1">
                            <div className="flex items-center gap-3 text-green-600 font-bold">
                                <Check className="w-6 h-6" /> Score:
                            </div>
                            <span className="text-xl font-black text-green-600">
                                {correctCount} / {totalCount} ({Math.round((correctCount / totalCount) * 100)}%)
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-y-auto w-full pr-4 flex-1 space-y-4 custom-scrollbar">
                    <h3 className="text-xl font-bold text-[#31326F] mb-4 text-left border-b-2 border-gray-100 pb-2">Detailed Review</h3>
                    {history && Object.entries(history).map(([index, data]) => {
                        const qNum = parseInt(index) + 1;
                        const isCorrect = data.isCorrect;

                        return (
                            <div key={index} className={`p-5 mb-4 rounded-2xl border-2 text-left bg-white ${isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-500 mb-1">Question {qNum}</div>
                                        <div className="text-[#31326F] font-medium text-lg"><LatexContent html={data.question?.text || ''} /></div>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full font-bold text-sm shrink-0 mt-1 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                    <div className={`p-3 rounded-xl border-2 ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Your Answer</div>
                                        <div className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                            <LatexContent html={data.selectedOption || 'No answer'} />
                                        </div>
                                    </div>

                                    {!isCorrect && (
                                        <div className="p-3 bg-green-50 rounded-xl border-2 border-green-100">
                                            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Correct Answer</div>
                                            <div className="font-bold text-green-700">
                                                <LatexContent html={data.question?.correctAnswer || ''} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {!isCorrect && data.question?.solution && (
                                    <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-[#31326F]">
                                        <div className="font-bold mb-1 flex items-center gap-2">
                                            <Eye className="w-4 h-4" /> Explanation
                                        </div>
                                        <LatexContent html={data.question.solution} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="shrink-0 pt-6 mt-4 border-t-2 border-gray-100">
                    <button
                        onClick={onContinue}
                        className="w-full py-4 bg-[#31326F] text-white rounded-2xl font-black text-xl shadow-lg hover:bg-[#31326F]/90 transition-all active:scale-95"
                    >
                        Return to Chapter
                    </button>
                </div>
            </motion.div>
        </div>
    );
};


const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

const fractionMap = {
    '1/2': '½', '1/3': '⅓', '2/3': '⅔',
    '1/4': '¼', '3/4': '¾', '1/5': '⅕',
    '2/5': '⅖', '3/5': '⅗', '4/5': '⅘',
    '1/6': '⅙', '5/6': '⅚', '1/8': '⅛',
    '3/8': '⅜', '5/8': '⅝', '7/8': '⅞'
};

const getSimpStr = (num, den) => {
    if (num === 0) return "0";
    const d = Math.abs(gcd(num, den));
    const sn = num / d;
    const sd = den / d;
    if (sd === 1) return `${sn}`;
    return fractionMap[`${sn}/${sd}`] || `${sn}/${sd}`;
};

const FractionsChapterTest = () => {
    const { grade } = useParams();
    const navigate = useNavigate();

    const getSessionData = (key, defaultValue) => {
        const data = sessionStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    };

    const storageKey = `test_${window.location.pathname}`;

    const [qIndex, setQIndex] = useState(() => getSessionData(`${storageKey}_qIndex`, 0));
    const [history, setHistory] = useState(() => getSessionData(`${storageKey}_history`, {})); // Full test record
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(() => getSessionData(`${storageKey}_timeElapsed`, 0));
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const [sessionId, setSessionId] = useState(() => getSessionData(`${storageKey}_sessionId`, null));
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const TEST_SKILL_ID = 9991; // Dummy specific to Fractions Chapter Test
    const TOTAL_QUESTIONS = 20;

    const [answers, setAnswers] = useState(() => getSessionData(`${storageKey}_answers`, {}));

    useEffect(() => {
        sessionStorage.setItem(`${storageKey}_qIndex`, JSON.stringify(qIndex));
        sessionStorage.setItem(`${storageKey}_history`, JSON.stringify(history));
        sessionStorage.setItem(`${storageKey}_answers`, JSON.stringify(answers));
        sessionStorage.setItem(`${storageKey}_timeElapsed`, JSON.stringify(timeElapsed));
        if (sessionId) sessionStorage.setItem(`${storageKey}_sessionId`, JSON.stringify(sessionId));
    }, [qIndex, history, answers, sessionId]);

    const clearProgress = () => {
        sessionStorage.removeItem(`${storageKey}_qIndex`);
        sessionStorage.removeItem(`${storageKey}_history`);
        sessionStorage.removeItem(`${storageKey}_answers`);
        sessionStorage.removeItem(`${storageKey}_timeElapsed`);
        sessionStorage.removeItem(`${storageKey}_sessionId`);
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, TEST_SKILL_ID)
                .then(sess => sess?.session_id && setSessionId(sess.session_id))
                .catch(console.error);
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
        if (history[qIndex]) {
            const data = history[qIndex];
            setCurrentQuestion(data.question);
            setShuffledOptions(data.options);
        } else {
            generateQuestion(qIndex);
        }

        if (answers[qIndex]) {
            setSelectedOption(answers[qIndex].selectedOption);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsSubmitted(false);
        }
    }, [qIndex, answers, history]);

    const generateQuestion = (index) => {
        // Pool of questions mapped across 20 slots.
        // Concept 1: Concept & Number Line (0-2)
        // Concept 2: Proper/Improper/Mixed (3-5)
        // Concept 3: Equivalent & Simplest Form (6-9)
        // Concept 4: Like/Unlike & Comparing (10-14)
        // Concept 5: Addition & Subtraction (15-19)

        let qText = "";
        let correct = "";
        let explanation = "";
        let options = [];

        if (index < 3) {
            // Concept/NumberLine
            const types = ['basic', 'numberline_pt'];
            const type = types[randomInt(0, 1)];

            if (type === 'basic') {
                const total = randomInt(4, 9);
                const shaded = randomInt(1, total - 1);
                qText = `If a shape is divided into ${total} equal parts and ${shaded} parts are shaded, what fraction represents the shaded region?`;
                correct = fractionMap[`${shaded}/${total}`] || `${shaded}/${total}`;
                options = [
                    correct,
                    fractionMap[`${total}/${shaded}`] || `${total}/${shaded}`,
                    fractionMap[`${shaded}/${total * 2}`] || `${shaded}/${total * 2}`,
                    fractionMap[`${total - shaded}/${total}`] || `${total - shaded}/${total}` // unshaded
                ];
                explanation = `The fraction is (shaded parts)/(total parts) = ${shaded}/${total}.`;
            } else {
                const den = randomInt(3, 7);
                const num = randomInt(1, den - 1);
                qText = `On a number line from 0 to 1 divided into ${den} equal segments, what fraction does the ${num}${num === 1 ? 'st' : num === 2 ? 'nd' : num === 3 ? 'rd' : 'th'} tick mark after 0 represent?`;
                correct = fractionMap[`${num}/${den}`] || `${num}/${den}`;
                options = [
                    correct,
                    fractionMap[`${num - 1}/${den}`] || `${num - 1}/${den}`,
                    `${num}`,
                    fractionMap[`${den}/${num}`] || `${den}/${num}`
                ];
                explanation = `Each segment is 1/${den}. The ${num}th mark represents ${num} parts of 1/${den}, which is ${correct}.`;
            }
        }
        else if (index < 6) {
            // Types of fractions
            const rand = randomInt(0, 2);
            if (rand === 0) {
                // identify proper
                qText = "Which of the following describes a proper fraction?";
                correct = "Numerator is less than the denominator";
                options = [
                    correct,
                    "Numerator is greater than the denominator",
                    "A whole number combined with a fraction",
                    "Numerator and denominator are equal"
                ];
                explanation = "A proper fraction is one where the numerator is smaller than the denominator, representing a value less than 1.";
            } else if (rand === 1) {
                // mixed to improper
                const w = randomInt(1, 4);
                const n = randomInt(1, 4);
                const d = randomInt(n + 1, 6);
                const impN = (w * d) + n;
                qText = `Convert the mixed fraction ${w} ${fractionMap[`${n}/${d}`] || `${n}/${d}`} to an improper fraction.`;
                correct = `${impN}/${d}`;
                options = [correct, `${impN}/${d + 1}`, `${w * n}/${d}`, `${(w * n) + d}/${d}`];
                explanation = `Multiply the whole number ${w} by the denominator ${d} (${w * d}) and add the numerator ${n} to get ${impN}. The denominator stays ${d}.`;
            } else {
                // improper to mixed
                const d = randomInt(3, 6);
                const w = randomInt(2, 4);
                const n = randomInt(1, d - 1);
                const impN = (w * d) + n;
                qText = `Convert the improper fraction ${impN}/${d} to a mixed fraction.`;
                correct = `${w} ${fractionMap[`${n}/${d}`] || `${n}/${d}`}`;
                options = [correct, `${w} ${fractionMap[`${n + 1}/${d}`] || `${n + 1}/${d}`}`, `${w + 1} ${fractionMap[`1/${d}`] || `1/${d}`}`, `${w - 1} ${fractionMap[`${n}/${d}`] || `${n}/${d}`}`];
                explanation = `Divide ${impN} by ${d}. ${impN} ÷ ${d} = ${w} with a remainder of ${n}. Therefore, it is ${correct}.`;
            }
        }
        else if (index < 10) {
            // Equiv / Simplest
            const rand = randomInt(0, 1);
            if (rand === 0) {
                // Equiv
                const num = randomInt(1, 3);
                const den = randomInt(num + 1, 5);
                const mult = randomInt(2, 4);

                const f1 = fractionMap[`${num}/${den}`] || `${num}/${den}`;
                const f2 = fractionMap[`${num * mult}/${den * mult}`] || `${num * mult}/${den * mult}`;

                qText = `Which fraction is equivalent to ${f1}?`;
                correct = f2;
                options = [correct, `${num * mult}/${den}`, `${num}/${den * mult}`, fractionMap[`${num * mult + 1}/${den * mult}`] || `${num * mult + 1}/${den * mult}`];
                explanation = `Multiplying both numerator and denominator of ${num}/${den} by ${mult} gives ${f2}.`;
            } else {
                // Simplest
                const num = randomInt(2, 5);
                const den = randomInt(num + 1, 8);
                const d = gcd(num, den);
                // force non coprime if possible
                const m = randomInt(2, 4);
                const sn = (num / d) * m;
                const sd = (den / d) * m;
                const simpn = sn / m;
                const simpd = sd / m;

                const start = fractionMap[`${sn}/${sd}`] || `${sn}/${sd}`;
                qText = `What is the simplest form of ${start}?`;
                correct = fractionMap[`${simpn}/${simpd}`] || `${simpn}/${simpd}`;
                options = [correct, fractionMap[`${sn / 2}/${sd / 2}`] || `${sn / 2}/${sd / 2}`, start, fractionMap[`1/${simpd}`] || `1/${simpd}`];
                explanation = `Divide both numerator and denominator by their greatest common divisor (${m}) to get the fraction in simplest form: ${correct}.`;
            }
        }
        else if (index < 15) {
            // Like/Unlike/Comparing
            const rand = randomInt(0, 1);
            if (rand === 0) {
                // Comparing
                const n1 = randomInt(1, 4);
                const d1 = randomInt(n1 + 1, 6);
                const n2 = randomInt(1, 4);
                let d2 = randomInt(n2 + 1, 6);

                if (n1 / d1 === n2 / d2) d2 += 1;

                const f1 = fractionMap[`${n1}/${d1}`] || `${n1}/${d1}`;
                const f2 = fractionMap[`${n2}/${d2}`] || `${n2}/${d2}`;

                const isGreater = (n1 / d1) > (n2 / d2);
                qText = `Compare the fractions: ${f1} _ ${f2}. Which symbol belongs in the blank?`;
                correct = isGreater ? ">" : "<";
                options = [">", "<", "=", "None"];
                explanation = `Using cross multiplication: ${n1}×${d2} = ${n1 * d2} and ${n2}×${d1} = ${n2 * d1}. Since ${n1 * d2} ${isGreater ? '>' : '<'} ${n2 * d1}, ${f1} ${correct} ${f2}.`;
            } else {
                // Like / Unlike
                const d = randomInt(4, 8);
                const n1 = randomInt(1, d - 1);
                const n2 = randomInt(1, d - 1);
                const wf = fractionMap[`${n1}/${d + 1}`] || `${n1}/${d + 1}`;
                const f1 = fractionMap[`${n1}/${d}`] || `${n1}/${d}`;
                const f2 = fractionMap[`${n2}/${d}`] || `${n2}/${d}`;
                qText = `Which fraction is a LIKE fraction to ${f1}?`;
                correct = f2;
                options = [correct, wf, fractionMap[`${n2}/${d + 2}`] || `${n2}/${d + 2}`, fractionMap[`${n1 + 1}/${d - 1}`] || `${n1 + 1}/${d - 1}`];
                explanation = `Like fractions must have the exact same denominator. Both have a denominator of ${d}.`;
            }
        } else {
            // Addition / Subtraction
            const isAdd = randomInt(0, 1) === 0;
            if (isAdd) {
                const num1 = randomInt(1, 3);
                const den1 = randomInt(4, 6);
                const num2 = randomInt(1, 3);
                let den2 = randomInt(4, 6);
                if (den1 === den2) den2 = den2 + 1;

                const sumNum = num1 * den2 + num2 * den1;
                const sumDenom = den1 * den2;

                const f1 = fractionMap[`${num1}/${den1}`] || `${num1}/${den1}`;
                const f2 = fractionMap[`${num2}/${den2}`] || `${num2}/${den2}`;

                qText = `Add: ${f1} + ${f2}`;
                correct = getSimpStr(sumNum, sumDenom);

                options = [correct, getSimpStr(num1 + num2, den1 + den2), getSimpStr(sumNum + 1, sumDenom), getSimpStr(sumNum - 1, sumDenom)];
                explanation = `Find common denominator ${sumDenom}. Convert: ${num1 * den2}/${sumDenom} + ${num2 * den1}/${sumDenom} = ${sumNum}/${sumDenom}, simplified to ${correct}.`;
            } else {
                // Sub
                const d = randomInt(5, 9);
                const n1 = randomInt(3, d - 1);
                const n2 = randomInt(1, n1 - 1);

                const diff = n1 - n2;
                const f1 = fractionMap[`${n1}/${d}`] || `${n1}/${d}`;
                const f2 = fractionMap[`${n2}/${d}`] || `${n2}/${d}`;

                qText = `Subtract: ${f1} - ${f2}`;
                correct = getSimpStr(diff, d);
                options = [correct, getSimpStr(diff + 1, d), getSimpStr(n1 + n2, d), getSimpStr(diff, d + d)];
                explanation = `Subtract numerators: ${n1} - ${n2} = ${diff}. Keep denominator ${d}. Result is ${diff}/${d}, simplified to ${correct}.`;
            }
        }

        const optSet = new Set(options);
        while (optSet.size < 4) {
            const fallbackStr = `Option ${randomInt(10, 99)}`;
            if (!optSet.has(fallbackStr)) optSet.add(fallbackStr);
        }
        const shuffled = Array.from(optSet).sort(() => Math.random() - 0.5);

        const newQuestion = {
            text: qText,
            correctAnswer: correct,
            solution: explanation,
            type: 'mcq',
            conceptIndex: index
        };

        setCurrentQuestion(newQuestion);
        setShuffledOptions(shuffled);

        setHistory(prev => ({
            ...prev,
            [index]: {
                question: newQuestion,
                options: shuffled
            }
        }));
        questionStartTime.current = Date.now();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const recordQuestionAttempt = async (question, selected, isCorrect) => {
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
                skill_id: TEST_SKILL_ID,
                template_id: null,
                difficulty_level: 'Medium',
                question_text: String(question.text || ''),
                correct_answer: String(question.correctAnswer || ''),
                student_answer: String(selected || ''),
                is_correct: isCorrect,
                solution_text: String(question.solution || ''),
                time_spent_seconds: seconds >= 0 ? seconds : 0
            });
        } catch (e) {
            console.error("Failed to record attempt", e);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);

        // In the chapter test, when they click an option, it's immediately saved to 'history'
        // But we DON'T show them if it's correct/wrong immediately.
        // We just let them move next. They can change it until they hit Next/Finish.
    };

    const saveAnswerAndMove = () => {
        if (!selectedOption) return;

        const isRight = selectedOption === currentQuestion.correctAnswer;

        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selectedOption, isCorrect: isRight }
        }));

        setHistory(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                selectedOption,
                isCorrect: isRight
            }
        }));

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);

        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            setIsSubmitted(true); // Marks entire test as finished
            setShowSummaryModal(true);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const handleFinalContinue = async () => {
        if (sessionId) {
            await api.finishSession(sessionId).catch(console.error);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            const totalCorrect = Object.values(history).filter(val => val?.isCorrect === true).length;
            try {
                await api.createReport({
                    title: "Fractions Chapter Test",
                    type: 'test',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: {
                        skill_id: TEST_SKILL_ID,
                        skill_name: "Fractions Chapter Test",
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
        clearProgress();
        navigate(-1);
    };

    if (!currentQuestion) return <div>Loading Test...</div>;

    const currentSavedAnswer = history[qIndex]?.selectedOption;
    const isLastQuestion = qIndex === TOTAL_QUESTIONS - 1;

    return (
        <div className="junior-practice-page raksha-theme font-sans bg-gray-50 min-h-screen">
            <header className="junior-practice-header">
                <div className="header-left">
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">Chapter Test: Fractions</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max" style={{ zIndex: 110 }}>
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right flex items-center gap-3">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper pt-12">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>

                    {/* Progress Bar */}
                    <div className="w-full mb-8 px-4">
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
                            {Array.from({ length: TOTAL_QUESTIONS }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-full flex-1 border-r border-white/50 last:border-0 transition-colors
                                        ${idx < qIndex ? 'bg-[#4FB7B3]' :
                                            idx === qIndex ? 'bg-yellow-400' :
                                                history[idx]?.selectedOption ? 'bg-blue-300' : 'bg-transparent'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="practice-left-col w-full px-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="w-full h-full"
                            >
                                <div className="question-card-modern">
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern">
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern gap-4 sm:gap-6">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionSelect(option)}
                                                    className={`option-btn-modern ${(selectedOption || currentSavedAnswer) === option ? 'selected' : ''}`}
                                                    disabled={isSubmitted}
                                                >
                                                    <span className="text-xl sm:text-2xl font-medium">{option}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <PracticeSummaryModal
                isOpen={showSummaryModal}
                timeTaken={formatTime(timeElapsed)}
                correctCount={Object.values(history).filter(v => v?.isCorrect === true).length}
                totalCount={TOTAL_QUESTIONS}
                history={history}
                onContinue={handleFinalContinue}
            />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg"
                            onClick={async () => {
                                if (window.confirm("Are you sure you want to exit the test? Your progress will be saved but the test will not be submitted.")) {
                                    if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                    navigate(-1);
                                }
                            }}
                        >
                            Exit Test
                        </button>
                    </div>
                    <div className="bottom-center">
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            <button
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: "10px" }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            <button
                                className="nav-pill-next-btn"
                                onClick={saveAnswerAndMove}
                                disabled={!(selectedOption || currentSavedAnswer)}
                            >
                                {isLastQuestion ? (
                                    <>SUBMIT TEST <Check size={24} strokeWidth={3} /></>
                                ) : (
                                    <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FractionsChapterTest;
