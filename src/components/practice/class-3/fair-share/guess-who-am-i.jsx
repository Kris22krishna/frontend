import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import LatexContent from '../../../LatexContent';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateMarbleSVG = (count, color = "#FF6B6B") => {
    // Simple grid layout for marbles
    const cols = Math.ceil(Math.sqrt(count));
    const size = 16;
    const gap = 4;
    const width = cols * (size + gap);
    const rows = Math.ceil(count / cols);
    const height = rows * (size + gap);

    let circles = [];
    for (let i = 0; i < count; i++) {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const cx = c * (size + gap) + size / 2;
        const cy = r * (size + gap) + size / 2;
        circles.push(
            `<circle cx="${cx}" cy="${cy}" r="${size / 2}" fill="${color}" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>`
        );
        // shiny spot
        circles.push(
            `<circle cx="${cx - size / 6}" cy="${cy - size / 6}" r="${size / 6}" fill="white" opacity="0.4"/>`
        );
    }

    return `<svg viewBox="0 0 ${width} ${height}" width="${Math.min(width * 2, 100)}" height="${Math.min(height * 2, 80)}" style="display:inline-block;">${circles.join('')}</svg>`;
};

const Constraints = {
    MORE_HALF: (n) => ({ text: `more than half of ${n}`, check: (x) => x > n / 2, val: n / 2, type: 'min' }),
    LESS_HALF: (n) => ({ text: `less than half of ${n}`, check: (x) => x < n / 2, val: n / 2, type: 'max' }),
    MORE_DOUBLE: (n) => ({ text: `more than double of ${n}`, check: (x) => x > n * 2, val: n * 2, type: 'min' }),
    LESS_DOUBLE: (n) => ({ text: `less than double of ${n}`, check: (x) => x < n * 2, val: n * 2, type: 'max' }),
    EXACT_HALF: (n) => ({ text: `exactly half of ${n}`, check: (x) => x === n / 2, val: n / 2, type: 'bg' }), // bg = big constraint?
    EXACT_DOUBLE: (n) => ({ text: `exactly double of ${n}`, check: (x) => x === n * 2, val: n * 2, type: 'bg' })
};

const FairShareGuesswho = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const [sessionId, setSessionId] = useState(null);

    // Skill Info
    const SKILL_ID = 9008;
    const SKILL_NAME = "Fair Share - Guess Who Am I";
    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [sessionQuestions, setSessionQuestions] = useState([]);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(console.error);
        }
        let timer;
        if (!showResults) {
            timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (!sessionQuestions[qIndex]) {
            generateQuestion(qIndex);
        } else {
            setCurrentQuestion(sessionQuestions[qIndex]);
            setShuffledOptions(sessionQuestions[qIndex].shuffledOptions);
            const saved = answers[qIndex];
            if (saved) {
                setSelectedOption(saved.selected);
                setIsSubmitted(true);
                setIsCorrect(saved.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex]);

    const generateQuestion = (index) => {
        // Retry loop to ensure valid range
        let valid = false;
        let qData = {};
        let attemptsOverall = 0;

        while (!valid && attemptsOverall < 100) {
            attemptsOverall++;
            // Pick two distinct base types, e.g. one min constraint and one max constraint to form a range
            // Or just two random ones and see if intersection exists.

            // Strategy: 
            // 1. Pick a "Target" number first (e.g. 5).
            // 2. Generate constraints that fit this target.
            // 3. Ensure constraints are not trivial (e.g. "More than 4" when target is 5).
            //    Make them involving Half/Double.

            const target = randomInt(3, 15);

            // Ensure target is unique for this session
            const isDuplicate = sessionQuestions.some(q => q.correctAnswer === target);
            if (isDuplicate) continue;

            // Possible Constraints satisfied by target
            const satisfiedConstraints = [];

            // Half constraints (N where target > N/2 or < N/2)
            // For "More than half of N": N/2 < target => N < 2*target. 
            // For "Less than half of N": N/2 > target => N > 2*target.
            // Ensure N is even for cleaner text (though not strictly required, better for "half of 7"). Let's stick to even nums for "half".

            // Generate some valid "More than half of N"
            // Pick N such that N is even and N < 2*target
            let n1 = 2 * randomInt(Math.max(1, Math.floor(target / 2) - 2), target - 1);
            if (n1 > 0 && target > n1 / 2) satisfiedConstraints.push(Constraints.MORE_HALF(n1));

            // Generate some valid "Less than half of N"
            let n2 = 2 * randomInt(target + 1, target + 5);
            if (target < n2 / 2) satisfiedConstraints.push(Constraints.LESS_HALF(n2));

            // Double constraints
            // "More than double of N": 2*N < target => N < target/2
            let n3 = randomInt(1, Math.floor((target - 1) / 2));
            if (n3 > 0 && target > n3 * 2) satisfiedConstraints.push(Constraints.MORE_DOUBLE(n3));

            // "Less than double of N": 2*N > target => N > target/2
            let n4 = randomInt(Math.ceil((target + 1) / 2), target + 2);
            if (target < n4 * 2) satisfiedConstraints.push(Constraints.LESS_DOUBLE(n4));

            // Ensure we have at least 2 distinct constraints
            if (satisfiedConstraints.length < 2) continue;

            // Shuffle and pick 2
            const picked = satisfiedConstraints.sort(() => Math.random() - 0.5).slice(0, 2);

            // Verify if they define a unique enough range or at least a narrow valid range
            // We don't need unique solution, just that Target is IN the solution and distractors are NOT.

            // Generate Distractors
            let options = [target];
            let attempts = 0;
            while (options.length < 4 && attempts < 50) {
                const d = randomInt(1, 20);
                if (options.includes(d)) { attempts++; continue; }

                // Must violate at least one constraint
                const fits0 = picked[0].check(d);
                const fits1 = picked[1].check(d);

                if (!fits0 || !fits1) {
                    options.push(d);
                }
                attempts++;
            }

            if (options.length < 4) continue;

            // Construct text
            const questionText = `
                <div class="text-xl mb-4 text-center">
                    <p class="font-bold mb-2 text-[#31326F]">Who am I?</p>
                    <ul class="text-left inline-block bg-blue-50 p-4 rounded-xl border-2 border-blue-100 list-disc pl-8">
                        <li>I am <strong>${picked[0].text}</strong>.</li>
                        <li>I am <strong>${picked[1].text}</strong>.</li>
                    </ul>
                </div>
            `;

            const solutionText = `
                Let's check the clues for <strong>${target}</strong>:<br/>
                1. Is ${target} ${picked[0].text}? <strong>Yes</strong> ✅<br/>
                2. Is ${target} ${picked[1].text}? <strong>Yes</strong> ✅<br/>
                <br/>
                It fits both!
            `;

            qData = {
                text: questionText,
                correctAnswer: target,
                options: options, // Numbers
                constraints: picked,
                solution: solutionText,
                shuffledOptions: [...options].sort(() => Math.random() - 0.5)
            };
            valid = true;
        }

        setSessionQuestions(prev => {
            const next = [...prev];
            next[index] = qData;
            return next;
        });

        setShuffledOptions(qData.shuffledOptions);
        setCurrentQuestion(qData);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    const handleCheck = () => {
        if (selectedOption === null || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(p => ({ ...p, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage("✨ You found me! ✨");
        } else {
            // Show which constraint failed?
            setFeedbackMessage("Oops! Try again.");
            setShowExplanationModal(true);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: 'Hard',
                question_text: "Guess Who: " + currentQuestion.constraints.map(c => c.text).join(', '),
                is_correct: isRight,
                time_spent_seconds: timeElapsed
            }).catch(console.error);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(p => p + 1);
            setShowExplanationModal(false);
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
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
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(p => p - 1);
            setShowExplanationModal(false);
        }
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const stats = (() => {
        let correct = 0;
        const total = TOTAL_QUESTIONS;
        Object.values(answers).forEach(ans => {
            if (ans.isCorrect) correct++;
        });
        return { correct, total };
    })();

    if (!currentQuestion && !showResults) return <div>Loading...</div>;

    if (showResults) {
        const score = stats.correct;
        const total = stats.total;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto w-full h-full">
                <header className="junior-practice-header results-header relative">
                    <button
                        onClick={() => navigate('/junior/grade/3/topic/Fair Share')}
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
                        <h1 className="results-title">Adventure Report</h1>
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
                                <span className="block text-xs font-black uppercase tracking-widest text-[#4FB7B3] mb-1">Total Score</span>
                                <span className="text-3xl font-black text-[#31326F]">{score}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detailed-breakdown w-full mb-12">
                        <h3 className="text-2xl font-black text-[#31326F] mb-6 px-4">Quest Log 📜</h3>
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
                            <RefreshCw size={24} /> Practice Again
                        </button>
                        <button className="px-12 py-4 rounded-2xl border-4 border-[#31326F] text-[#31326F] font-black text-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3" onClick={() => navigate('/junior/grade/3/topic/Fair Share')}>
                            Back to Topics
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="junior-practice-page fair-share-theme font-sans">
            <header className="junior-practice-header flex justify-between items-center px-8">
                <div className="header-left"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-xl shadow-lg">
                        Questions {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-[#E2E8F0] relative w-full max-w-2xl mb-20">
                    <div className="question-header-modern">
                        <LatexContent html={currentQuestion.text} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        {shuffledOptions.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => !isSubmitted && setSelectedOption(opt)}
                                className={`
                                    relative p-4 rounded-2xl border-4 transition-all duration-200 flex flex-col items-center gap-2 bg-white
                                    option-btn-modern
                                    ${selectedOption === opt ? 'selected' : ''}
                                    ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''}
                                    ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}
                                `}
                            >
                                <div className="text-3xl font-black text-slate-700">{opt}</div>
                                <div dangerouslySetInnerHTML={{
                                    __html: generateMarbleSVG(opt,
                                        ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][idx % 4]
                                    )
                                }} />

                                {isSubmitted && opt === currentQuestion.correctAnswer && (
                                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                        <Check size={16} strokeWidth={4} />
                                    </div>
                                )}
                                {isSubmitted && selectedOption === opt && !isCorrect && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                                        <X size={16} strokeWidth={4} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {isSubmitted && isCorrect && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mt-4 text-2xl font-bold text-green-600 bg-green-100 px-6 py-2 rounded-full"
                        >
                            {feedbackMessage}
                        </motion.div>
                    )}
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

            <div className="fixed bottom-8 left-8 right-8 flex justify-between items-center pointer-events-none">
                <div className="flex gap-4 pointer-events-auto">
                    <button
                        className="bg-red-50 text-red-500 p-4 rounded-2xl border-2 border-red-100 font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        onClick={async () => {
                            if (sessionId) await api.finishSession(sessionId).catch(console.error);
                            navigate(-1);
                        }}
                    >
                        <X size={24} /> <span className="hidden md:inline">Exit</span>
                    </button>

                    {qIndex > 0 && (
                        <button
                            className="bg-white text-[#31326F] px-8 py-4 rounded-2xl border-2 border-[#31326F] font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-all"
                            onClick={handlePrevious}
                        >
                            <ChevronLeft size={24} /> <span className="hidden md:inline">Previous</span>
                        </button>
                    )}
                </div>

                <div className="pointer-events-auto flex gap-4">
                    {isSubmitted ? (
                        <button
                            className="nav-pill-next-btn bg-[#FF6B6B] text-white px-10 py-4 rounded-2xl font-black text-xl shadow-[0_6px_0_#EE5253] flex items-center gap-2 transition-all active:translate-y-1 active:shadow-none"
                            onClick={handleNext}
                        >
                            {qIndex < TOTAL_QUESTIONS - 1 ? (
                                <>Next <ChevronRight size={28} strokeWidth={4} /></>
                            ) : (
                                <>Done <Check size={28} strokeWidth={4} /></>
                            )}
                        </button>
                    ) : (
                        <button
                            className="nav-pill-submit-btn bg-[#4FB7B3] text-white px-10 py-4 rounded-2xl font-black text-xl shadow-[0_6px_0_#3A8C89] flex items-center gap-2 transition-all active:translate-y-1 active:shadow-none disabled:opacity-50"
                            onClick={handleCheck}
                            disabled={selectedOption === null}
                        >
                            Submit <Check size={28} strokeWidth={4} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FairShareGuesswho;
