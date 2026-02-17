import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import LatexContent from '../../../../LatexContent';
import ExplanationModal from '../../../../ExplanationModal';
import '../../../../../pages/juniors/JuniorPracticeSession.css';

const CORRECT_MESSAGES = [
    "✨ Excellent puzzle solving! ✨",
    "🌟 You cracked the triangle! 🌟",
    "🎉 Correct! You're a number wizard! 🎉",
    "✨ Fantastic thinking! ✨",
    "🚀 Super! The triangle is complete! 🚀",
    "🌿 Perfect! Nature loves your logic! 🌿",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Brilliant! 💎"
];

/* ── Triangle Puzzle Helpers ────────────────────────────────── */

// Positions: 0=top, 1=left-mid, 2=bottom-left, 3=bottom-mid, 4=bottom-right, 5=right-mid
// Sides:
//   Left  : positions 0, 1, 2
//   Bottom: positions 2, 3, 4
//   Right : positions 0, 5, 4

const SIDE_INDICES = [
    [0, 1, 2], // left side
    [2, 3, 4], // bottom side
    [0, 5, 4], // right side
];

function generateAllSolutions(numbers, targetSum) {
    const solutions = [];
    const perm = (arr, chosen) => {
        if (chosen.length === arr.length) {
            const valid = SIDE_INDICES.every(side => {
                const s = side.reduce((sum, i) => sum + chosen[i], 0);
                return s === targetSum;
            });
            if (valid) solutions.push([...chosen]);
            return;
        }
        const used = new Set(chosen);
        for (const n of arr) {
            if (!used.has(n)) {
                chosen.push(n);
                perm(arr, chosen);
                chosen.pop();
            }
        }
    };
    perm(numbers, []);
    return solutions;
}

// Triangle SVG coordinates — corners of the triangle + midpoints exactly on edges
// Matches the textbook: equilateral triangle with circles sitting on the lines
const TRIANGLE_POSITIONS = [
    { x: 150, y: 24 },   // 0: top corner
    { x: 75, y: 127 },  // 1: left-side midpoint  (midpoint of 0↔2)
    { x: 30, y: 230 },  // 2: bottom-left corner
    { x: 150, y: 230 },  // 3: bottom-side midpoint (midpoint of 2↔4)
    { x: 270, y: 230 },  // 4: bottom-right corner
    { x: 225, y: 127 },  // 5: right-side midpoint  (midpoint of 0↔4)
];

const TRIANGLE_LINES = [
    [0, 2], // left side
    [2, 4], // bottom side
    [4, 0], // right side
];

// React component that renders the triangle as inline SVG
const TriangleSVG = ({ placement, blankIndex }) => {
    const circleR = 24;
    return (
        <svg viewBox="0 0 300 260" style={{ width: '100%', maxWidth: '420px', margin: '0 auto', display: 'block' }}>
            {/* Draw triangle lines */}
            {TRIANGLE_LINES.map(([a, b], i) => (
                <line
                    key={i}
                    x1={TRIANGLE_POSITIONS[a].x} y1={TRIANGLE_POSITIONS[a].y}
                    x2={TRIANGLE_POSITIONS[b].x} y2={TRIANGLE_POSITIONS[b].y}
                    stroke="#CBD5E0" strokeWidth="3"
                />
            ))}
            {/* Draw circles with numbers */}
            {TRIANGLE_POSITIONS.map((pos, i) => {
                const isBlank = i === blankIndex;
                return (
                    <g key={i}>
                        <circle
                            cx={pos.x} cy={pos.y} r={circleR}
                            fill={isBlank ? '#FFF3CD' : '#E0FBEF'}
                            stroke={isBlank ? '#F6AD55' : '#4FB7B3'}
                            strokeWidth="3"
                        />
                        <text
                            x={pos.x} y={pos.y + 1}
                            textAnchor="middle" dominantBaseline="central"
                            fontSize="20" fontWeight="700"
                            fill={isBlank ? '#F6AD55' : '#31326F'}
                        >
                            {isBlank ? '?' : placement[i]}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

function getTriangleSVGString(placement, blankIndex) {
    const circleR = 24;
    const P = TRIANGLE_POSITIONS;
    let svg = `<svg viewBox="0 0 300 260" style="width:100%;max-width:280px;margin:0 auto;display:block;">`;
    TRIANGLE_LINES.forEach(([a, b]) => {
        svg += `<line x1="${P[a].x}" y1="${P[a].y}" x2="${P[b].x}" y2="${P[b].y}" stroke="#CBD5E0" stroke-width="3" />`;
    });
    P.forEach((pos, i) => {
        const isBlank = i === blankIndex;
        svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${circleR}" fill="${isBlank ? '#FFF3CD' : '#E0FBEF'}" stroke="${isBlank ? '#F6AD55' : '#4FB7B3'}" stroke-width="3" />`;
        svg += `<text x="${pos.x}" y="${pos.y + 1}" text-anchor="middle" dominant-baseline="central" font-size="20" font-weight="700" fill="${isBlank ? '#F6AD55' : '#31326F'}">${isBlank ? '?' : placement[i]}</text>`;
    });
    svg += `</svg>`;
    return svg;
}

function generateQuestion(difficulty, usedSolutionKeys) {
    let numbers, targetSums;

    if (difficulty === 'easy') {
        numbers = [1, 2, 3, 4, 5, 6];
        targetSums = [9, 10];
    } else if (difficulty === 'medium') {
        numbers = [1, 2, 3, 4, 5, 6];
        targetSums = [10, 11];
    } else {
        numbers = [1, 2, 3, 4, 5, 6];
        targetSums = [11, 12];
    }

    // Shuffle target sums
    const shuffledTargets = [...targetSums].sort(() => Math.random() - 0.5);

    for (const target of shuffledTargets) {
        const solutions = generateAllSolutions(numbers, target);
        if (solutions.length === 0) continue;

        // Shuffle solutions
        const shuffledSolutions = [...solutions].sort(() => Math.random() - 0.5);

        for (const solution of shuffledSolutions) {
            const key = solution.join(',') + ':' + target;
            if (usedSolutionKeys.has(key)) continue;

            // Pick a random blank position
            const blankIndex = Math.floor(Math.random() * 6);
            const correctAnswer = solution[blankIndex];

            // Generate distractor options
            const distractors = new Set();
            distractors.add(correctAnswer);

            // Add other numbers from the set that aren't in the puzzle
            const numbersInPuzzle = solution.filter((_, i) => i !== blankIndex);
            const availableDistractors = numbers.filter(n => n !== correctAnswer && !numbersInPuzzle.includes(n));

            availableDistractors.forEach(d => distractors.add(d));

            // If we still need more, add nearby numbers
            let offset = 1;
            while (distractors.size < 4) {
                const candidate = correctAnswer + offset;
                if (candidate > 0 && candidate <= 9 && !distractors.has(candidate)) {
                    distractors.add(candidate);
                }
                const candidate2 = correctAnswer - offset;
                if (candidate2 > 0 && candidate2 <= 9 && !distractors.has(candidate2)) {
                    distractors.add(candidate2);
                }
                offset++;
                if (offset > 10) break;
            }

            const options = [...distractors].slice(0, 4).map(String);
            const shuffledOptions = options.sort(() => Math.random() - 0.5);

            // Build display placement (with blank)
            const displayPlacement = [...solution];

            const triangleSVGStr = getTriangleSVGString(displayPlacement, blankIndex);

            const sideLabels = ['Left side', 'Bottom side', 'Right side'];
            const solutionText = SIDE_INDICES.map((side, si) => {
                const vals = side.map(i => solution[i]);
                return `${sideLabels[si]}: $${vals[0]} + ${vals[1]} + ${vals[2]} = ${target}$`;
            }).join('<br/>');

            usedSolutionKeys.add(key);

            return {
                targetSum: target,
                placement: displayPlacement,
                blankIndex,
                text: `<div style="text-align:center;">${triangleSVGStr}</div>`,
                correctAnswer: correctAnswer.toString(),
                solution: `The missing number is <strong>${correctAnswer}</strong>.<br/><br/>
                    Each side of the triangle must sum to <strong>${target}</strong>:<br/>
                    ${solutionText}`,
                shuffledOptions
            };
        }
    }

    // Fallback: if somehow we can't generate (shouldn't happen)
    return null;
}

/* ── Component ──────────────────────────────────────────────── */

const LetUsPlay = () => {
    const { grade } = useParams();
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
    const SKILL_ID = 4009;
    const SKILL_NAME = "The Cleanest Village - Let Us Play (Triangle Puzzle)";

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

        // Generate 10 questions: 3 easy, 3 medium, 4 hard
        const questions = [];
        const usedKeys = new Set();

        const difficulties = [
            'easy', 'easy', 'easy',
            'medium', 'medium', 'medium',
            'hard', 'hard', 'hard', 'hard'
        ];

        for (const diff of difficulties) {
            const q = generateQuestion(diff, usedKeys);
            if (q) questions.push(q);
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
            <div className="junior-practice-page results-view overflow-y-auto">
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
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answers</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Puzzle Log 🧩</h3>
                        <div className="space-y-4">
                            {sessionQuestions.map((q, idx) => {
                                const ans = answers[idx];
                                if (!ans) return null;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={`p-6 rounded-[2rem] border-4 ${ans.isCorrect ? 'border-[#E0FBEF] bg-white' : 'border-red-50 bg-white'} relative`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white shrink-0 ${ans.isCorrect ? 'bg-[#4FB7B3]' : 'bg-red-400'}`}>
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-[#31326F] mb-4 breakdown-question">
                                                    <LatexContent html={q.text} />
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="answer-box p-4 rounded-2xl bg-gray-50 border-2 border-gray-100">
                                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Your Answer</span>
                                                        <span className={`text-lg font-black ${ans.isCorrect ? 'text-[#4FB7B3]' : 'text-red-500'}`}>
                                                            {ans.selected}
                                                        </span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="answer-box p-4 rounded-2xl bg-[#E0FBEF] border-2 border-[#4FB7B3]/20">
                                                            <span className="block text-[10px] font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Correct Answer</span>
                                                            <span className="text-lg font-black text-[#31326F]">
                                                                {q.correctAnswer}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="explanation-box p-4 rounded-2xl bg-blue-50/50 border-2 border-blue-100">
                                                    <span className="block text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Explain? 💡</span>
                                                    <div className="text-sm font-medium text-gray-600 leading-relaxed">
                                                        <LatexContent html={q.solution} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="shrink-0 pt-2 text-[#4FB7B3]">
                                                {ans.isCorrect ? <Check size={32} strokeWidth={3} /> : <X size={32} strokeWidth={3} className="text-red-400" />}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="results-actions flex flex-col md:flex-row justify-center gap-4 py-8 border-t-4 border-dashed border-gray-100">
                        <button className="magic-pad-btn play-again px-12 py-4 rounded-2xl bg-[#31326F] text-white font-black text-xl shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Start New Quest
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
            </header>

            <main className="practice-content-wrapper">
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '960px', width: '100%', margin: '0 auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={qIndex}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <div className="question-card-modern" style={{ padding: '1.5rem 2rem' }}>
                                {/* TOP: Main question - centered full width */}
                                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: '700', color: '#31326F', margin: 0, lineHeight: 1.4 }}>
                                        Place numbers so that each side of the triangle adds up to{' '}
                                        <span style={{ color: '#4FB7B3', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '900' }}>{currentQuestion.targetSum}</span>.
                                    </h2>
                                </div>

                                {/* BOTTOM ROW: Triangle LEFT  |  Sub-question + Options RIGHT */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center', flexWrap: 'nowrap' }}>
                                    {/* LEFT: Triangle */}
                                    <div style={{ flex: '1 1 50%' }}>
                                        <TriangleSVG placement={currentQuestion.placement} blankIndex={currentQuestion.blankIndex} />
                                    </div>

                                    {/* RIGHT: Sub-question text + 2×2 Options grid */}
                                    <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: '500', color: '#718096', textAlign: 'center', margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>
                                            Which number replaces <span style={{ color: '#F6AD55', fontWeight: '700', fontSize: '1.4rem' }}>?</span> in the triangle?
                                        </p>

                                        {/* 2×2 option grid */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', width: '100%', maxWidth: '380px' }}>
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    style={{
                                                        fontFamily: '"Open Sans", sans-serif',
                                                        fontWeight: '600',
                                                        fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                                                        padding: '18px 12px',
                                                        borderRadius: '14px',
                                                        backgroundColor: !isSubmitted ? (selectedOption === option ? '#e5e7eb' : '#f9fafb') : undefined,
                                                        color: !isSubmitted ? '#1f2937' : undefined,
                                                        borderColor: !isSubmitted ? (selectedOption === option ? '#9ca3af' : '#d1d5db') : undefined,
                                                        borderWidth: !isSubmitted ? '2px' : undefined,
                                                        borderStyle: !isSubmitted ? 'solid' : undefined,
                                                        width: '100%',
                                                        textAlign: 'center',
                                                        cursor: isSubmitted ? 'default' : 'pointer'
                                                    }}
                                                    onClick={() => handleOptionSelect(option)}
                                                    disabled={isSubmitted}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {isSubmitted && isCorrect && (
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="feedback-mini correct"
                                        style={{ marginTop: '20px', textAlign: 'center' }}
                                    >
                                        {feedbackMessage}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
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
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            Exit Practice
                        </button>
                    </div>
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

                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>

                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {qIndex > 0 && (
                                <button className="nav-pill-next-btn" onClick={handlePrevious}>
                                    Previous
                                </button>
                            )}
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}
                                </button>
                            ) : (
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LetUsPlay;
