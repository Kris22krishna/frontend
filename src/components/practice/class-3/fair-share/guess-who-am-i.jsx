import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import LatexContent from '../../../LatexContent';
import '../../../../pages/juniors/JuniorPracticeSession.css';
import '../../../../pages/juniors/grade3/fair-share.css';

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

    return `<svg viewBox="0 0 ${width} ${height}" width="${Math.min(width * 1.2, 60)}" height="${Math.min(height * 1.2, 45)}" style="display:inline-block; max-height: 5vh;">${circles.join('')}</svg>`;
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

    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(console.error);
        }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        generateQuestion();
    }, [qIndex]);

    const generateQuestion = () => {
        // Retry loop to ensure valid range
        let valid = false;
        let qData = {};

        while (!valid) {
            // Pick two distinct base types, e.g. one min constraint and one max constraint to form a range
            // Or just two random ones and see if intersection exists.

            // Strategy: 
            // 1. Pick a "Target" number first (e.g. 5).
            // 2. Generate constraints that fit this target.
            // 3. Ensure constraints are not trivial (e.g. "More than 4" when target is 5).
            //    Make them involving Half/Double.

            const target = randomInt(3, 15);

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
                <div class="text-xl mb-1 text-center">
                    <p class="mb-1 text-[#31326F]">Who am I?</p>
                    <ul class="text-left inline-block bg-blue-50 p-2 rounded-xl border-2 border-blue-100 list-disc pl-8">
                        <li>I am ${picked[0].text}.</li>
                        <li>I am ${picked[1].text}.</li>
                    </ul>
                </div>
            `;

            const solutionText = `<p class="mb-1">Let's check the clues for <strong>${target}</strong>:</p>
                <div class="mb-1">1. Is ${target} ${picked[0].text}? <strong>Yes</strong> ✅</div>
                <div class="mb-1">2. Is ${target} ${picked[1].text}? <strong>Yes</strong> ✅</div>
                <p class="mt-1 font-semibold text-green-700">It fits both!</p>
            `;

            qData = {
                text: questionText,
                correctAnswer: target,
                options: options, // Numbers
                constraints: picked,
                solution: solutionText
            };
            valid = true;
        }

        setShuffledOptions([...qData.options].sort(() => Math.random() - 0.5));
        setCurrentQuestion(qData);
        setSelectedOption(null);
        setIsSubmitted(false);
        setIsCorrect(false);
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            setQIndex(p => p - 1);
            setShowExplanationModal(false);
        }
    };

    const handleCheck = () => {
        if (selectedOption === null || !currentQuestion) return;
        const isRight = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(p => ({ ...p, [qIndex]: isRight }));

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
            navigate(-1);
        }
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page fair-share-theme font-sans">
            <header className="junior-practice-header fair-share-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <span className="text-[#31326F] font-normal text-lg sm:text-xl">{SKILL_NAME}</span>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                </div>
                <div className="header-right">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-normal text-lg shadow-md flex items-center gap-2">
                        {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper flex flex-col items-center justify-center p-4">
                <div className="practice-board-container mt-6" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
                    <div className="practice-left-col fair-share-left-col" style={{ width: '100%' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={qIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{ width: '100%' }}
                            >
                                <div className="question-card-modern flex flex-col justify-start w-full bg-white rounded-3xl sm: sm: sm: px-6 sm:px-10 pt-4 sm:pt-6 pb-6 sm:pb-10 shadow-lg" style={{ height: 'auto', minHeight: '100%' }}>
                                    <div className="question-header-modern mb-2 w-full" style={{ flexShrink: 0 }}>
                                        <h2 className="text-xl sm:text-2xl font-normal text-[#31326F] text-center w-full break-words">
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern flex-1 w-full flex flex-col items-center mx-auto max-w-3xl mt-2">
                                        <div className="options-grid-modern w-full grid grid-cols-2 gap-2 sm:gap-4">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => !isSubmitted && setSelectedOption(option)}
                                                    disabled={isSubmitted}
                                                    className={`rounded-xl border-2 font-normal transition-all transform hover:scale-[1.01] flex items-center justify-center w-full p-1 sm:p-2 text-sm sm:text-base min-h-[30px] sm:min-h-[40px] relative
                                                    ${isSubmitted
                                                            ? option === currentQuestion.correctAnswer
                                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                                : selectedOption === option
                                                                    ? 'bg-red-100 border-red-500 text-red-700'
                                                                    : 'bg-gray-50 border-gray-200 text-gray-400'
                                                            : selectedOption === option
                                                                ? 'bg-indigo-50 border-[#4FB7B3] text-[#31326F] shadow-md'
                                                                : 'bg-white border-gray-200 text-gray-600 hover:border-[#4FB7B3] hover:shadow-sm'
                                                        }
                                                `}
                                                >
                                                    <div className="flex flex-col items-center gap-1 sm:gap-1">
                                                        <LatexContent html={String(option)} className="text-lg sm:text-xl font-black text-slate-700" />
                                                        <div dangerouslySetInnerHTML={{
                                                            __html: generateMarbleSVG(option,
                                                                ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][idx % 4]
                                                            )
                                                        }} />
                                                    </div>
                                                    {isSubmitted && option === currentQuestion.correctAnswer && (
                                                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                                                            <Check size={16} strokeWidth={4} />
                                                        </div>
                                                    )}
                                                    {isSubmitted && selectedOption === option && !isCorrect && (
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

            <footer className="junior-bottom-bar" style={{ height: '70px', padding: '0 1rem' }}>
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-[#FFF1F2] text-[#F43F5E] border-2 border-[#FFE4E6] px-6 py-2 rounded-full hover:bg-red-50 transition-colors flex items-center gap-2 text-lg" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>
                    <div className="bottom-right">
                        <div className="nav-buttons-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handlePrev}
                                disabled={qIndex === 0}
                                style={{ opacity: qIndex === 0 ? 0.5 : 1, marginRight: "10px" }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>NEXT <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>DONE <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={selectedOption === null}
                                >
                                    SUBMIT <Check size={24} strokeWidth={3} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mobile-footer-controls">
                    <div className="flex items-center gap-2">
                        <button className="bg-red-50 text-red-500 p-2 rounded-lg border border-red-100" onClick={async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); navigate(-1); }}><X size={20} /></button>
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>
                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            <button
                                className={`nav-pill-prev-btn flex items-center gap-2 transition-all ${qIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={handlePrev}
                                disabled={qIndex === 0}
                                style={{
                                    opacity: qIndex === 0 ? 0.5 : 1,
                                    padding: '8px 12px',
                                    marginRight: '8px',
                                    backgroundColor: '#eef2ff',
                                    color: '#31326F',
                                    minWidth: 'auto'
                                }}
                            >
                                <ChevronLeft size={24} strokeWidth={3} /> PREV
                            </button>
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "NEXT" : "DONE"}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn"
                                    onClick={handleCheck}
                                    disabled={selectedOption === null}
                                >SUBMIT</button>
                            )}
                        </div>
                    </div>
                </div>
            </footer>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={isCorrect}
                correctAnswer={currentQuestion.correctAnswer}
                explanation={currentQuestion.solution}
                onClose={() => setShowExplanationModal(false)}
            />
        </div>
    );
};

export default FairShareGuesswho;
