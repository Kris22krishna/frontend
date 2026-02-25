import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Spot on! They meet there! ✨",
    "🌟 Perfect match! 🌟",
    "🎉 You found the common ground! 🎉",
    "✨ Excellent tracking! ✨",
    "🚀 Super! Double trouble solved! 🚀",
    "🌿 Great! They both land there! 🌿",
    "🎊 Fantastic work! 🎊",
    "💎 Exactly right! 💎"
];

// Number Grid Visual
const NumberGrid = ({ highlightData, max = 20 }) => {
    // highlightData: Array of objects { numbers: [], color: '', label: '' }
    // We need to merge colors if numbers overlap (e.g., striped or blended background)

    return (
        <div className="w-full flex flex-col items-center my-6">
            <div className="grid grid-cols-10 gap-2 mb-4">
                {Array.from({ length: max }, (_, i) => i + 1).map(num => {
                    // Check highlights
                    const highlights = highlightData.filter(d => d.numbers.includes(num));
                    let bgStyle = 'bg-white';
                    let borderStyle = 'border-gray-200';
                    let textStyle = 'text-gray-600';
                    let transform = '';

                    if (highlights.length === 1) {
                        bgStyle = highlights[0].bgColor || 'bg-blue-100';
                        borderStyle = highlights[0].borderColor || 'border-blue-300';
                        textStyle = highlights[0].textColor || 'text-blue-600';
                        transform = 'scale(1.1)';
                    } else if (highlights.length > 1) {
                        // Intersection!
                        bgStyle = 'bg-purple-200'; // Mixed
                        borderStyle = 'border-purple-400';
                        textStyle = 'text-purple-800 font-black';
                        transform = 'scale(1.2) rotate(5deg)';
                    }

                    return (
                        <div
                            key={num}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 text-lg font-bold transition-all shadow-sm ${bgStyle} ${borderStyle} ${textStyle}`}
                            style={{ transform }}
                        >
                            {num}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex gap-4 flex-wrap justify-center">
                {highlightData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <div className={`w-4 h-4 rounded ${d.bgColor || 'bg-gray-200'} border ${d.borderColor}`}></div>
                        {d.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

const CommonMultiplesFromJumps = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
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
    const SKILL_ID = 1144;
    const SKILL_NAME = "Equal Groups - Common Multiples from Jumps";
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

        const questions = [];
        const animals = [
            { name: "Mouse 🐭", step: 2, color: 'orange' },
            { name: "Cat 🐱", step: 3, color: 'blue' },
            { name: "Dog 🐶", step: 4, color: 'green' },
            { name: "Rabbit 🐇", step: 5, color: 'pink' },
            { name: "Frog 🐸", step: 3, color: 'emerald' },
            { name: "Kangaroo 🦘", step: 6, color: 'amber' }
        ];

        const seenQuestions = new Set();

        while (questions.length < TOTAL_QUESTIONS) {
            const index = questions.length;
            let q = {};
            let isUnique = false;
            let attempt = 0;

            // Protection against infinite loops if unique questions run out
            while (!isUnique && attempt < 50) {
                attempt++;

                // Easy: Identify numbers for ONE animal visually
                if (index < 3) {
                    const animal = animals[randomInt(0, 3)]; // Use smaller steps
                    const start = animal.step;
                    const multiples = [start, start * 2, start * 3, start * 4];
                    const notMultiples = [start + 1, start * 2 - 1, start * 3 + 2, start * 4 - 1].filter(n => !multiples.includes(n));

                    const qKey = `easy-${animal.name}-${start}`;
                    if (seenQuestions.has(qKey)) continue;
                    seenQuestions.add(qKey);
                    isUnique = true;

                    q = {
                        text: `The ${animal.name} jumps every <strong>${animal.step}</strong> steps.<br/>Which list shows numbers the ${animal.name} will land on?`,
                        correctAnswer: multiples.join(", "),
                        solution: `The ${animal.name} jumps in steps of ${animal.step}.<br/>The numbers are multiples of ${animal.step}: ${multiples.join(", ")}...`,
                        type: 'single_animal',
                        visualData: {
                            max: 15,
                            highlights: [{
                                numbers: multiples,
                                label: `${animal.name}'s Jumps`,
                                bgColor: `bg-${animal.color}-100`,
                                borderColor: `border-${animal.color}-300`,
                                textColor: `text-${animal.color}-700`
                            }],
                            showHint: false // User requested no hints for easy/medium
                        }
                    };

                    const opts = [];
                    opts.push(multiples.join(", "));
                    opts.push(notMultiples.join(", "));
                    // Mixed list
                    const mixed = [multiples[0], notMultiples[1], multiples[1], notMultiples[2]];
                    opts.push(mixed.join(", "));
                    // Reordered Logic (e.g. step+1)
                    const oddSteps = multiples.map(n => n + 1);
                    opts.push(oddSteps.join(", "));

                    // Extra fallback if needed to ensure 4
                    while (opts.length < 4) {
                        opts.push([start + opts.length, start * 2 + opts.length, start * 3 + opts.length, start * 4 + opts.length].join(", "));
                    }

                    q.shuffledOptions = opts.sort(() => Math.random() - 0.5);
                }
                // Medium: Intersection of TWO animals
                else if (index < 6) {
                    // Pair animals with common multiples within reasonable range (e.g. 2 & 3 -> 6, 12)
                    const a1 = animals[0];
                    const a2 = animals[1];
                    // Or random pair
                    const pair = [animals[randomInt(0, 2)], animals[randomInt(3, 5)]].sort((a, b) => a.step - b.step);
                    if (pair[0].step === pair[1].step) pair[1] = animals[2];

                    const qKey = `med-${pair[0].name}-${pair[1].name}`;
                    if (seenQuestions.has(qKey)) continue;
                    seenQuestions.add(qKey);
                    isUnique = true;

                    const lcm = (pair[0].step * pair[1].step) / (function gcd(a, b) { return !b ? a : gcd(b, a % b); })(pair[0].step, pair[1].step);
                    const common = [lcm, lcm * 2];
                    if (lcm * 3 <= 30) common.push(lcm * 3);

                    q = {
                        text: `The ${pair[0].name} jumps every <strong>${pair[0].step}</strong> steps.<br/>The ${pair[1].name} jumps every <strong>${pair[1].step}</strong> steps.<br/>Which number will <strong>BOTH</strong> animals land on?`,
                        correctAnswer: lcm.toString(),
                        solution: `${pair[0].name} lands on: ${pair[0].step}, ${pair[0].step * 2}, ${pair[0].step * 3}...\n${pair[1].name} lands on: ${pair[1].step}, ${pair[1].step * 2}...\nFirst common number is ${lcm}.`,
                        type: 'intersection',
                        visualData: {
                            max: lcm + 5,
                            highlights: [
                                {
                                    numbers: Array.from({ length: 10 }, (_, i) => pair[0].step * (i + 1)).filter(n => n <= lcm + 5),
                                    label: pair[0].name,
                                    bgColor: 'bg-blue-100', borderColor: 'border-blue-300'
                                },
                                {
                                    numbers: Array.from({ length: 10 }, (_, i) => pair[1].step * (i + 1)).filter(n => n <= lcm + 5),
                                    label: pair[1].name,
                                    bgColor: 'bg-orange-100', borderColor: 'border-orange-300'
                                }
                            ],
                            showHint: false // User requested no hints for easy/medium
                        }
                    };

                    const opts = new Set([lcm.toString()]);
                    opts.add((lcm + pair[0].step).toString());
                    opts.add((lcm - 1).toString());
                    opts.add((lcm + 1).toString());

                    // Convert to array and filter validity
                    let optArray = [...opts].filter(x => parseInt(x) > 0);

                    // Fill to 4
                    let filler = lcm + 2;
                    while (optArray.length < 4) {
                        if (!optArray.includes(filler.toString())) {
                            optArray.push(filler.toString());
                        }
                        filler++;
                    }

                    q.shuffledOptions = optArray.slice(0, 4).sort(() => Math.random() - 0.5);
                }
                // Hard: Mystery Number Riddles
                else {
                    // "I am a common multiple of A and B. I am less than X..."
                    const a = randomInt(2, 5);
                    let b = randomInt(2, 6);
                    while (b === a || b % a === 0 || a % b === 0) b = randomInt(2, 8); // Ensure distinct and interesting

                    const lcm = (a * b) / (function gcd(x, y) { return !y ? x : gcd(y, x % y); })(a, b);
                    const target = lcm * randomInt(1, 2); // Either the first or second common multiple

                    // Define a range to narrow it down
                    const minRange = target - randomInt(2, 5);
                    const maxRange = target + randomInt(2, 5);

                    const qKey = `hard-riddle-${a}-${b}-${target}`;
                    if (seenQuestions.has(qKey)) continue;
                    seenQuestions.add(qKey);
                    isUnique = true;

                    q = {
                        text: `<strong>Mystery Number:</strong><br/>I am a common multiple of <strong>${a}</strong> and <strong>${b}</strong>.<br/>I am between <strong>${Math.max(1, minRange)}</strong> and <strong>${maxRange}</strong>.<br/>Which number am I?`,
                        correctAnswer: target.toString(),
                        solution: `Multiples of ${a}: ${a}, ${a * 2}, ${a * 3}...\nMultiples of ${b}: ${b}, ${b * 2}, ${b * 3}...\nCommon multiples happen at ${lcm}, ${lcm * 2}...\nThe one between ${Math.max(1, minRange)} and ${maxRange} is ${target}.`,
                        type: 'riddle',
                        visualData: {
                            showHint: true, // Always show hint for Hard riddles to help visualize
                            max: maxRange + 2,
                            highlights: [
                                {
                                    numbers: Array.from({ length: 20 }, (_, i) => a * (i + 1)).filter(n => n <= maxRange + 2),
                                    label: `Multiples of ${a}`,
                                    bgColor: 'bg-yellow-100', borderColor: 'border-yellow-300'
                                },
                                {
                                    numbers: Array.from({ length: 20 }, (_, i) => b * (i + 1)).filter(n => n <= maxRange + 2),
                                    label: `Multiples of ${b}`,
                                    bgColor: 'bg-indigo-100', borderColor: 'border-indigo-300'
                                }
                            ]
                        }
                    };

                    const opts = new Set([target.toString()]);
                    // Distractors:
                    // 1. A multiple of A but not B
                    opts.add((target - a).toString());
                    // 2. A multiple of B but not A
                    opts.add((target + b).toString());
                    // 3. Just a number in the range
                    opts.add((target + 1).toString());

                    let optArray = [...opts].filter(x => parseInt(x) > 0);
                    while (optArray.length < 4) {
                        const filler = parseInt(target) + (optArray.length * 2) + 3;
                        if (!optArray.includes(filler.toString())) {
                            optArray.push(filler.toString());
                        }
                    }

                    q.shuffledOptions = optArray.slice(0, 4).sort(() => Math.random() - 0.5);
                }
            } // end uniqueness loop

            if (isUnique) {
                questions.push(q);
            } else {
                // Fallback if we couldn't find unique (shouldn't happen with this logic but good safety)
                questions.push(q);
            }
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
                difficulty_level: qIndex < 3 ? 'Easy' : qIndex < 6 ? 'Medium' : 'Hard',
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
            setShowExplanationModal(false);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
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
                } catch (err) {
                    console.error("Failed to create report", err);
                }
            }
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            setShowResults(true);
        }
    };

    const handleCheck = () => {
        if (!selectedOption || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        recordQuestionAttempt(currentQuestion, selectedOption, isRight);
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const stats = (() => {
        let correct = 0;
        const total = Object.keys(answers).length;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total: TOTAL_QUESTIONS };
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
                        <h1 className="results-title">Great Matching!</h1>
                    </div>
                </header>

                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-black text-[#31326F] mb-2">Adventure Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Score</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0FBEF] text-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Time</span>
                                <span className="text-3xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page village-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left hidden md:block">
                    {/* Back button */}
                    <button
                        className="bg-white/90 backdrop-blur-md p-3 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] shadow-md hover:bg-gray-50 transition-all"
                        onClick={async () => {
                            if (sessionId) await api.finishSession(sessionId).catch(console.error);
                            navigate(-1);
                        }}
                    >
                        <ChevronLeft size={24} strokeWidth={3} />
                    </button>
                </div>

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

                {/* Mobile Top Left Back Button - Static Flex Item to push Timer to Right */}
                <button
                    className="mobile-back-btn p-2 bg-white/90 rounded-xl text-[#31326F] shadow-sm border-2 border-[#4FB7B3]/30 md:hidden mr-auto relative z-50 order-first"
                    onClick={async () => {
                        if (sessionId) await api.finishSession(sessionId).catch(console.error);
                        navigate(-1);
                    }}
                    style={{ position: 'absolute', left: '1rem', top: '1rem' }}
                >
                    <ChevronLeft size={24} strokeWidth={3} />
                </button>
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '900px', margin: '0 auto' }}>
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
                                <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                                    <div className="question-header-modern">
                                        <h2 className="question-text-modern" style={{ fontFamily: '"Open Sans", sans-serif', fontSize: '2rem', fontWeight: '600', textAlign: 'center' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>

                                        {/* Visual Aid */}
                                        {currentQuestion.visualData && (currentQuestion.visualData.showHint || isSubmitted) && (
                                            <NumberGrid
                                                highlightData={currentQuestion.visualData.highlights}
                                                max={currentQuestion.visualData.max}
                                            />
                                        )}
                                    </div>

                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    onClick={() => handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                >
                                                    <LatexContent html={option} />
                                                </button>
                                            ))}
                                        </div>
                                        {isSubmitted && isCorrect && (
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="feedback-mini correct"
                                                style={{ marginTop: '20px' }}
                                            >
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
                    <div className="bottom-left"></div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
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
                                        <>Done <Check size={28} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={28} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Footer Controls */}
                <div className="mobile-footer-controls">
                    {/* Left: Exit Button */}
                    <div className="mobile-footer-left">
                        <button
                            className="nav-pill-next-btn"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                            style={{
                                background: '#FFF5F5',
                                color: '#E53E3E',
                                border: '1px solid #FECACA',
                                padding: '0.5rem 1rem',
                                fontSize: '0.8rem',
                                gap: '6px',
                                boxShadow: 'none'
                            }}
                        >
                            <X size={18} strokeWidth={3} /> Exit
                        </button>
                    </div>

                    {/* Right: Navigation */}
                    <div className="mobile-footer-right">
                        <div className="nav-buttons-group">
                            {/* Previous Button (Text + Icon) */}
                            {qIndex > 0 && (
                                <button
                                    className="nav-pill-next-btn"
                                    onClick={handlePrevious}
                                    style={{
                                        background: '#F1F5F9',
                                        color: '#475569',
                                        boxShadow: 'none',
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.8rem',
                                        gap: '6px'
                                    }}
                                >
                                    <ChevronLeft size={18} strokeWidth={3} /> Previous
                                </button>
                            )}

                            {/* Explain Button */}
                            {isSubmitted && (
                                <button className="footer-icon-btn explain-btn" onClick={() => setShowExplanationModal(true)} style={{ width: 'auto', padding: '0 1rem', fontSize: '0.8rem', gap: '4px' }}>
                                    <Eye size={20} /> Explain
                                </button>
                            )}

                            {/* Next/Submit Button */}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={20} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={20} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit <Check size={20} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CommonMultiplesFromJumps;
