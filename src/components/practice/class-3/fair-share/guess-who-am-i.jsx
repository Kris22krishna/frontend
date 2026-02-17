import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, X } from 'lucide-react';
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

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls w-full flex justify-between px-8 py-4">
                    <button
                        className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                        onClick={async () => {
                            if (sessionId) await api.finishSession(sessionId).catch(console.error);
                            navigate(-1);
                        }}
                    >
                        <StickerExit size={20} className="hidden" />
                        Exit
                    </button>

                    <div className="bottom-center">
                        {isSubmitted && (
                            <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={20} /> View Explanation
                            </button>
                        )}
                    </div>

                    <div className="nav-buttons-group">
                        {isSubmitted ? (
                            <button className="nav-pill-next-btn bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-bold flex items-center gap-2 shadow-lg transition-all transform hover:scale-105" onClick={handleNext}>
                                {qIndex < TOTAL_QUESTIONS - 1 ? (
                                    <>Next <ChevronRight size={28} strokeWidth={3} /></>
                                ) : (
                                    <>Done <Check size={28} strokeWidth={3} /></>
                                )}
                            </button>
                        ) : (
                            <button
                                className="nav-pill-submit-btn bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-xl font-bold flex items-center gap-2 shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleCheck}
                                disabled={selectedOption === null}
                            >
                                Submit <Check size={28} strokeWidth={3} />
                            </button>
                        )}
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
                            <button className="bg-white text-[#00695C] border-2 border-[#00BFA5] p-2 rounded-lg font-bold flex items-center gap-1" onClick={() => setShowExplanationModal(true)}>
                                <Eye size={18} /> Explain
                            </button>
                        )}
                    </div>

                    <div className="mobile-footer-right" style={{ width: 'auto' }}>
                        <div className="nav-buttons-group">
                            {isSubmitted ? (
                                <button className="nav-pill-next-btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-bold flex items-center gap-2" onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>Next <ChevronRight size={24} strokeWidth={3} /></>
                                    ) : (
                                        <>Done <Check size={24} strokeWidth={3} /></>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="nav-pill-submit-btn bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-lg font-bold flex items-center gap-2 disabled:opacity-50"
                                    onClick={handleCheck}
                                    disabled={selectedOption === null}
                                >
                                    Submit <Check size={24} strokeWidth={3} />
                                </button>
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
