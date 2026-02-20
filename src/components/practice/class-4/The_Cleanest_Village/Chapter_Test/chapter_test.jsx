import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Outstanding! You've mastered the village! ✨",
    "🌟 Excellent work! A true champion! 🌟",
    "🎉 Correct! You're making the village shine! 🎉",
    "✨ Fantastic! Keep up the great work! ✨",
    "🚀 Super! You're flying high! 🚀",
    "🌿 Perfect! Green, clean, and smart! 🌿",
    "🎊 Wonderful! On to the next challenge! 🎊",
    "💎 Brilliance! Pure brilliance! 💎"
];

/* ── Triangle Puzzle Helpers (from Let Us Play) ───────────────── */
const SIDE_INDICES = [[0, 1, 2], [2, 3, 4], [0, 5, 4]];
const TRIANGLE_POSITIONS = [
    { x: 150, y: 24 }, { x: 75, y: 127 }, { x: 30, y: 230 },
    { x: 150, y: 230 }, { x: 270, y: 230 }, { x: 225, y: 127 }
];
const TRIANGLE_LINES = [[0, 2], [2, 4], [4, 0]];

const TriangleSVG = ({ placement, blankIndex }) => {
    const circleR = 24;
    return (
        <svg viewBox="0 0 300 260" style={{ width: '100%', maxWidth: '420px', margin: '0 auto', display: 'block' }}>
            {TRIANGLE_LINES.map(([a, b], i) => (
                <line key={i} x1={TRIANGLE_POSITIONS[a].x} y1={TRIANGLE_POSITIONS[a].y} x2={TRIANGLE_POSITIONS[b].x} y2={TRIANGLE_POSITIONS[b].y} stroke="#CBD5E0" strokeWidth="3" />
            ))}
            {TRIANGLE_POSITIONS.map((pos, i) => {
                const isBlank = i === blankIndex;
                return (
                    <g key={i}>
                        <circle cx={pos.x} cy={pos.y} r={circleR} fill={isBlank ? '#FFF3CD' : '#E0FBEF'} stroke={isBlank ? '#F6AD55' : '#4FB7B3'} strokeWidth="3" />
                        <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="700" fill={isBlank ? '#F6AD55' : '#31326F'}>{isBlank ? '?' : placement[i]}</text>
                    </g>
                );
            })}
        </svg>
    );
};

const getTriangleSVGString = (placement, blankIndex) => {
    const start = `<svg viewBox="0 0 300 260" style="width:100%;max-width:280px;margin:0 auto;display:block;">`;
    const lines = TRIANGLE_LINES.map(([a, b]) => `<line x1="${TRIANGLE_POSITIONS[a].x}" y1="${TRIANGLE_POSITIONS[a].y}" x2="${TRIANGLE_POSITIONS[b].x}" y2="${TRIANGLE_POSITIONS[b].y}" stroke="#CBD5E0" stroke-width="3" />`).join('');
    const circles = TRIANGLE_POSITIONS.map((pos, i) => {
        const isBlank = i === blankIndex;
        return `<circle cx="${pos.x}" cy="${pos.y}" r="24" fill="${isBlank ? '#FFF3CD' : '#E0FBEF'}" stroke="${isBlank ? '#F6AD55' : '#4FB7B3'}" stroke-width="3" /><text x="${pos.x}" y="${pos.y + 1}" text-anchor="middle" dominant-baseline="central" font-size="20" font-weight="700" fill="${isBlank ? '#F6AD55' : '#31326F'}">${isBlank ? '?' : placement[i]}</text>`;
    }).join('');
    return start + lines + circles + `</svg>`;
};

function generateTrianglePuzzle() {
    // Simplified generation for test (Pre-calculated valid puzzle)
    // Target 9, numbers 1-6
    const solution = [1, 5, 3, 4, 2, 6]; // Sides: 1+5+3=9, 3+4+2=9, 1+6+2=9
    const target = 9;
    const blankIndex = randomInt(0, 5);
    const correctAnswer = solution[blankIndex];
    const placement = [...solution];

    // Distractors
    const options = [correctAnswer.toString()];
    while (options.length < 4) {
        let r = randomInt(1, 9).toString();
        if (!options.includes(r)) options.push(r);
    }

    const svgStr = getTriangleSVGString(placement, blankIndex);

    return {
        type: 'html',
        text: `<div style="text-align:center;">${svgStr}</div><p style="text-align:center; margin-top:1rem;">Which number replaces <strong>?</strong> so each side sums to <strong>${target}</strong>?</p>`,
        correctAnswer: correctAnswer.toString(),
        solution: `The missing number is <strong>${correctAnswer}</strong>.`,
        shuffledOptions: options.sort(() => Math.random() - 0.5),
        specialComponent: (props) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                    <TriangleSVG placement={placement} blankIndex={blankIndex} />
                </div>
                <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                    <h3 style={{ color: '#31326F' }}>Target Sum: {target}</h3>
                    <p>Which number fits?</p>
                </div>
            </div>
        )
    };
}


/* ── Generators ───────────────────────────────────────────────── */

const generateRepeatedAddition = () => {
    // Application: Rows of items or sets of legs
    const scenarios = [
        { item: 'spiders', perItem: 8, context: 'legs' },
        { item: 'cars', perItem: 4, context: 'wheels' },
        { item: 'flowers', perItem: 5, context: 'petals' },
        { item: 'octopuses', perItem: 8, context: 'arms' }
    ];
    const scenario = scenarios[randomInt(0, 3)];
    const groups = randomInt(4, 9);
    const total = groups * scenario.perItem;

    const text = `<div class='question-container'>
        I saw ${groups} ${scenario.item} in a picture book.<br/>
        If each has ${scenario.perItem} ${scenario.context}, how many ${scenario.context} are there in total?
    </div>`;

    const options = [total.toString()];
    while (options.length < 4) {
        let r = (total + (randomInt(1, 4) * scenario.perItem * (Math.random() > 0.5 ? 1 : -1))).toString();
        if (parseInt(r) > 0 && !options.includes(r)) options.push(r);
    }

    return {
        text,
        correctAnswer: total.toString(),
        solution: `${groups} ${scenario.item} × ${scenario.perItem} ${scenario.context} = ${total} ${scenario.context}.`,
        shuffledOptions: options.sort(() => Math.random() - 0.5)
    };
};

const generateRepeatedSubtraction = () => {
    // Application: Cutting length or distributing items
    const total = randomInt(30, 60);
    const subtract = randomInt(4, 9);
    const times = 3;
    const remaining = total - (subtract * times);

    const text = `<div class='question-container'>
        A ribbon is ${total} cm long.<br/>
        I cut off ${subtract} cm pieces for 3 friends.<br/>
        How much ribbon is left?
    </div>`;

    const options = [remaining.toString()];
    while (options.length < 4) {
        let r = (remaining + randomInt(-10, 10)).toString();
        if (r !== "0" && !options.includes(r)) options.push(r);
    }

    return {
        text,
        correctAnswer: remaining.toString(),
        solution: `Cut 1: ${total}-${subtract}=${total - subtract}<br/>Cut 2: ${total - subtract}-${subtract}=${total - subtract * 2}<br/>Cut 3: ${total - subtract * 2}-${subtract}=${remaining}`,
        shuffledOptions: options.sort(() => Math.random() - 0.5)
    };
};

const generateAdditionWithRegrouping = () => {
    // Tricky: Sum of Largest 2-digit and something, or "I thought of a number..."
    // Let's do a fast money problem
    const n1 = randomInt(150, 450);
    const n2 = randomInt(150, 450);
    const total = n1 + n2;

    const text = `<div class='question-container'>
        Rohan saved ₹${n1}. His sister saved ₹${n2}.<br/>
        They want to buy a gift that costs ₹${total + 50}.<br/>
        How much money do they have together?
    </div>`;

    const options = [total.toString()];
    while (options.length < 4) {
        let r = (total + randomInt(-20, 20)).toString();
        if (!options.includes(r)) options.push(r);
    }

    return {
        text,
        correctAnswer: total.toString(),
        solution: `Rohan: ₹${n1}<br/>Sister: ₹${n2}<br/>Total: ${n1} + ${n2} = ₹${total}`,
        shuffledOptions: options.sort(() => Math.random() - 0.5)
    };
};

const generateSubtractionWithRegrouping = () => {
    // Tricky: Change problem
    const price = randomInt(125, 375);
    const paid = Math.ceil(price / 100) * 100; // Next hundred (200, 300, 400)
    if (paid === price) paid += 100;
    const change = paid - price;

    const text = `<div class='question-container'>
        A toy costs ₹${price}.<br/>
        I paid with a ₹${paid} note.<br/>
        How much change should I get back?
    </div>`;

    const options = [change.toString()];
    while (options.length < 4) {
        let r = (change + randomInt(-20, 20)).toString();
        if (parseInt(r) > 0 && !options.includes(r)) options.push(r);
    }

    return {
        text,
        correctAnswer: change.toString(),
        solution: `${paid} - ${price} = ${change}`,
        shuffledOptions: options.sort(() => Math.random() - 0.5)
    };
};

const generateMissingAddend = () => {
    // Tricky: Target score
    const target = randomInt(150, 300);
    const score = randomInt(80, target - 50);
    const needed = target - score;

    const text = `<div class='question-container'>
        To win the game, you need ${target} points.<br/>
        You currently have ${score} points.<br/>
        How many more points do you need?
    </div>`;

    const options = [needed.toString()];
    while (options.length < 4) {
        let r = (needed + randomInt(-20, 20)).toString();
        if (parseInt(r) > 0 && !options.includes(r)) options.push(r);
    }

    return {
        text,
        correctAnswer: needed.toString(),
        solution: `Target - Current = Needed<br/>${target} - ${score} = ${needed}`,
        shuffledOptions: options.sort(() => Math.random() - 0.5)
    };
};

const generateMissingSubtrahend = () => {
    const start = randomInt(50, 150);
    const left = randomInt(10, start - 20);
    const taken = start - left;

    const text = `<div class='question-container'>A shop had ${start} clean bags. Some were sold, and now ${left} are left.<br/>How many were sold?<br/>
    ${start} - ? = ${left}</div>`;

    const options = [taken.toString()];
    while (options.length < 4) {
        let r = (taken + randomInt(-10, 10)).toString();
        if (parseInt(r) > 0 && !options.includes(r)) options.push(r);
    }

    return {
        text,
        correctAnswer: taken.toString(),
        solution: `Start - Left = Sold<br/>${start} - ${left} = ${taken}`,
        shuffledOptions: options.sort(() => Math.random() - 0.5)
    };
};

const generateHowManyMoreLess = () => {
    const n1 = randomInt(120, 300);
    const n2 = randomInt(50, n1 - 30);
    const diff = n1 - n2;

    const text = `<div class='question-container'>Team A collected ${n1} kg of waste. Team B collected ${n2} kg.<br/>How much more did Team A collect?</div>`;

    const options = [diff.toString()];
    while (options.length < 4) {
        let r = (diff + randomInt(-15, 15)).toString();
        if (parseInt(r) > 0 && !options.includes(r)) options.push(r);
    }

    return {
        text,
        correctAnswer: diff.toString(),
        solution: `${n1} - ${n2} = ${diff}`,
        shuffledOptions: options.sort(() => Math.random() - 0.5)
    };
};

const generateWordProblem = () => {
    const n1 = randomInt(100, 400);
    const n2 = randomInt(100, 400);
    const sum = n1 + n2;

    const text = `<div class='question-container'>To clean the park, ${n1} volunteers came on Saturday and ${n2} came on Sunday.<br/>How many volunteers helped in total?</div>`;

    const options = [sum.toString()];
    while (options.length < 4) {
        let r = (sum + randomInt(-30, 30)).toString();
        if (!options.includes(r)) options.push(r);
    }

    return {
        text,
        correctAnswer: sum.toString(),
        solution: `${n1} + ${n2} = ${sum}`,
        shuffledOptions: options.sort(() => Math.random() - 0.5)
    };
};


const ChapterTest = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 4012; // New Skill ID for Chapter Test
    const SKILL_NAME = "The Cleanest Village - Chapter Test";

    const TOTAL_QUESTIONS = 20;
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

        // Generate 20 questions
        const qs = [
            generateRepeatedAddition(), generateRepeatedAddition(),
            generateRepeatedSubtraction(), generateRepeatedSubtraction(),
            generateAdditionWithRegrouping(), generateAdditionWithRegrouping(),
            generateSubtractionWithRegrouping(), generateSubtractionWithRegrouping(),
            generateMissingAddend(), generateMissingAddend(),
            generateMissingSubtrahend(), generateMissingSubtrahend(),
            generateHowManyMoreLess(), generateHowManyMoreLess(),
            generateWordProblem(), generateWordProblem(), generateWordProblem(),
            generateTrianglePuzzle(), generateTrianglePuzzle(), generateTrianglePuzzle()
        ];

        // Ensure every question has shuffledOptions even if not explicitly provided by generator
        const preparedQs = qs.map(q => ({
            ...q,
            shuffledOptions: q.shuffledOptions || []
        }));

        setSessionQuestions(preparedQs);

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
            setShuffledOptions(qData.shuffledOptions);
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
                skill_id: SKILL_ID,
                template_id: null,
                difficulty_level: 'Mixed',
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

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const answeredQuestions = Object.values(answers);
                const totalCorrect = answeredQuestions.filter(val => val.isCorrect === true).length;
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
                            skipped_questions: TOTAL_QUESTIONS - answeredQuestions.length,
                            timestamp: new Date().toISOString(),
                            time_taken_seconds: timeElapsed
                        },
                        user_id: parseInt(userId, 10)
                    });
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResults(true);
        }
    };

    const handleSkip = () => {
        // Record as skipped in stats if we want, or just move to next
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: false, selected: "Skipped", skipped: true } }));
        handleNext();
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selected: selectedOption, isCorrect: isRight }
        }));

        // No explanation modal or immediate correctness feedback in chapter test
        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
        }
    };

    const stats = (() => {
        let correct = 0;
        let skippedCount = 0;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
            if (ans.skipped) skippedCount++;
        });
        return { correct, skipped: skippedCount, total: TOTAL_QUESTIONS };
    })();

    if (!currentQuestion && !showResults) return <div>Loading...</div>;

    if (showResults) {
        const score = stats.correct;
        const total = stats.total;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-topics-top absolute top-8 right-8 px-10 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xl transition-all flex items-center gap-3 z-50 border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                    >
                        Back to Topics
                    </button>
                    <div className="sun-timer-container">
                        <div className="sun-timer">
                            <div className="sun-rays"></div>
                            <span className="timer-text">Done!</span>
                        </div>
                    </div>
                    <div className="title-area">
                        <h1 className="results-title">Village Report</h1>
                    </div>
                </header>

                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Adventure Complete! 🎉</h2>

                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Accuracy</span>
                                <span className="text-3xl font-black text-[#31326F]">{percentage}%</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Skipped</span>
                                <span className="text-3xl font-black text-[#31326F]">{stats.skipped}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Test Log 📜</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`p-6 rounded-[2rem] border-4 ${ans.skipped ? 'border-amber-100 bg-white' : (ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white')} relative`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.skipped ? 'bg-amber-400' : (ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400')}`}>
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-4 breakdown-question">
                                                    <LatexContent html={q.text} />
                                                </div>

                                                {/* Display Options */}
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    {q.shuffledOptions.map((opt, oIdx) => (
                                                        <div key={oIdx} className={`p-3 rounded-xl border-2 text-sm flex items-center justify-between ${opt === q.correctAnswer ? 'border-[#4FB7B3] bg-[#E0FBEF]/30' : (ans.selected === opt && !ans.isCorrect ? 'border-red-200 bg-red-50/30' : 'border-gray-100 bg-gray-50/30')}`}>
                                                            <LatexContent html={opt} />
                                                            {opt === q.correctAnswer && <Check size={16} className="text-[#4FB7B3]" />}
                                                            {ans.selected === opt && !ans.isCorrect && <X size={16} className="text-red-400" />}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Answer</span>
                                                        <span className={`text-lg font-black ${ans.skipped ? 'text-amber-500' : (ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500')}`}>{ans.selected}</span>
                                                    </div>
                                                    <div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span>
                                                        <span className="text-lg font-black text-[#31326F]">{q.correctAnswer}</span>
                                                    </div>
                                                </div>

                                                {/* Explanation Section */}
                                                <div className="mt-4 p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Explanation 💡</span>
                                                    <div className="text-sm font-medium text-gray-600">
                                                        <LatexContent html={q.solution} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shrink-0 pt-2 text-[#4FB7B3]">
                                                {ans.skipped ? <Star size={32} className="text-amber-400" /> : (ans.isCorrect ? <Check size={32} strokeWidth={3} /> : <X size={32} strokeWidth={3} className="text-red-400" />)}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> retake Test
                        </button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-black text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate(grade ? `/junior/grade/${grade}` : '/math')}>
                            Back to Topics
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span style={{ fontWeight: '800', fontSize: '1.2rem', color: '#c53030' }}>CHAPTER TEST</span>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-red-200 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
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
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <div className="question-card-modern">
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern">
                                            {currentQuestion.type === 'html' ?
                                                <div dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
                                                : <LatexContent html={currentQuestion.text} />
                                            }
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                                    onClick={() => handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>
                                        {/* Feedback mini removed for Chapter Test */}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

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
                            <X size={20} /> Exit Test
                        </button>
                    </div>
                    <div className="bottom-center">
                        {/* No Explanation button for tests */}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (
                                <button className="nav-pill-next-btn" onClick={handlePrevious}>
                                    <ChevronLeft size={28} strokeWidth={3} /> Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                    ) : (
                                        <>Finish <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button className="px-8 py-3 bg-amber-50 text-amber-600 rounded-2xl border-2 border-amber-100 font-black text-xl hover:bg-amber-100 transition-all flex items-center gap-2" onClick={handleSkip}>
                                        Skip <ChevronRight size={24} />
                                    </button>
                                    <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                        Submit <Check size={28} strokeWidth={3} />
                                    </button>
                                </div>
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
                    </div>

                    <div className="mobile-footer-right" style={{ flex: 1, maxWidth: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                        <div className="nav-buttons-group" style={{ gap: '6px' }}>
                            {qIndex > 0 && (
                                <button className="nav-pill-next-btn" onClick={handlePrevious} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>
                                    Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Finish"}
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button className="bg-amber-50 text-amber-600 px-3 py-2 rounded-lg border border-amber-100 font-bold text-sm" onClick={handleSkip}>
                                        Skip
                                    </button>
                                    <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChapterTest;
