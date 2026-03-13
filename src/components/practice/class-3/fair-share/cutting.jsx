
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Check, Eye, ChevronRight, ChevronLeft, Pencil, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

// Helper to generate SVG strings for various creatively cut food items
const generateSVG = (type, parts) => {
    let svgContent = '';
    const stroke = "#FFF";
    const strokeWidth = 2;
    // Common SVG wrapper params
    let viewBox = "0 0 100 100";
    let style = "display:block; margin:20px auto; filter: drop-shadow(4px 6px 8px rgba(0,0,0,0.2));";

    if (type === 'pizza') {
        const radius = 40;
        const center = 50;
        // Pizza base: Crust + Cheese
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#FFB74D" stroke="#E65100" stroke-width="4" />`;
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius - 4}" fill="#FFD54F" />`;

        // Pepperoni toppings (random-ish positions but not on cuts ideally, keeping it simple)
        const toppings = [
            { cx: 40, cy: 30 }, { cx: 60, cy: 35 }, { cx: 50, cy: 60 }, { cx: 35, cy: 55 }, { cx: 65, cy: 55 }, { cx: 50, cy: 25 }
        ];
        toppings.forEach(t => {
            svgContent += `<circle cx="${t.cx}" cy="${t.cy}" r="3" fill="#D32F2F" opacity="0.8" />`;
        });

        // Cuts
        for (let i = 0; i < parts; i++) {
            const angle = ((i * 360 / parts) - 90) * (Math.PI / 180);
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            svgContent += `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" />`;
        }
    }

    else if (type === 'chocolate') {
        const width = 80;
        const height = 50;
        const x = 10;
        const y = 25;

        svgContent += `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#795548" stroke="#3E2723" stroke-width="3" rx="4" />`;

        // Grid texture if not cut? No, cuts define parts.
        // Assuming equal vertical strips for simplicity unless parts is composite
        // Let's stick to vertical cuts for "bar" look or grid if feasible visually for parts count
        // For simplicity and clarity of "equal parts" for grade 3, strip cuts are safest for rectangles unless parts=4,6,8 etc.
        // Let's do simple vertical cuts for consistency with standard fraction bars
        const step = width / parts;
        for (let i = 1; i < parts; i++) {
            const xi = x + i * step;
            svgContent += `<line x1="${xi}" y1="${y}" x2="${xi}" y2="${y + height}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-dasharray="0" />`;
        }
    }

    else if (type === 'watermelon') {
        // Semicircle
        const cx = 50;
        const cy = 70;
        const r = 40;
        // Rind (green arc)
        svgContent += `<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="#4CAF50" stroke="#2E7D32" stroke-width="3" />`;
        // Flesh (red arc)
        svgContent += `<path d="M ${cx - (r - 4)} ${cy - 1} A ${r - 4} ${r - 4} 0 0 1 ${cx + (r - 4)} ${cy - 1} Z" fill="#FF5252" />`;

        // Seeds
        const seeds = [
            { x: 40, y: 55 }, { x: 60, y: 55 }, { x: 50, y: 45 }, { x: 35, y: 65 }, { x: 65, y: 65 }
        ];
        seeds.forEach(s => {
            svgContent += `<ellipse cx="${s.x}" cy="${s.y}" rx="2" ry="3" fill="black" opacity="0.7" />`;
        });

        // Radial cuts for semicircle
        // Angle range is -180 to 0 (top half) -> actually standard math angle is 180 to 360? 
        // SVG coord: 0 is right, 270 (-90) is top.
        // We want arc from 180 (left) to 0 (right).
        // For N equal parts, we divide 180 degrees by N.

        for (let i = 1; i < parts; i++) {
            const angleDeg = 180 - (i * 180 / parts); // 180 -> 0
            const angleRad = angleDeg * (Math.PI / 180);
            // In SVG, y is down. Center is (cx, cy).
            // x = cx + r * cos(-angle) -> since we want upper half, y must be < cy
            // actually typical angle 0 is +x, angle 180 is -x. -90 is -y (up).
            // Let's simply calculating target point on arc.
            const tx = cx + r * Math.cos(-angleRad); // negative for upper half in standard trig vs screen coords
            const ty = cy + r * Math.sin(-angleRad);

            // Wait, SVG Y is down. sin(180...0) is positive (down). We want up.
            // So we use PI to 2PI? No.
            // Let's just use simple mapping.
            // Left point (-r, 0 relative). Right point (r, 0 relative).
            // Angle 180 (left) to 0 (right).
            // x = cx + r * cos(angle in rads)
            // y = cy - r * sin(angle in rads) -> minus because y is up

            const x_edge = cx + r * Math.cos(angleRad);
            const y_edge = cy - r * Math.sin(angleRad);

            svgContent += `<line x1="${cx}" y1="${cy}" x2="${x_edge}" y2="${y_edge}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
        }
    }

    else if (type === 'sandwich') {
        // Square cut diagonally
        const size = 60;
        const x = 20;
        const y = 20;
        // Bread
        svgContent += `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="#FFE0B2" stroke="#E65100" stroke-width="2" rx="2" />`;
        // Inner bread texture
        svgContent += `<rect x="${x + 3}" y="${y + 3}" width="${size - 6}" height="${size - 6}" fill="#FFF3E0" rx="1" />`;

        if (parts === 2) {
            // One diagonal
            svgContent += `<line x1="${x}" y1="${y}" x2="${x + size}" y2="${y + size}" stroke="#8D6E63" stroke-width="3" />`;
        } else if (parts === 4) {
            // Two diagonals (X)
            svgContent += `<line x1="${x}" y1="${y}" x2="${x + size}" y2="${y + size}" stroke="#8D6E63" stroke-width="3" />`;
            svgContent += `<line x1="${x + size}" y1="${y}" x2="${x}" y2="${y + size}" stroke="#8D6E63" stroke-width="3" />`;
        }
    }

    else if (type === 'cake') {
        const radius = 40;
        const center = 50;
        // Cake view from top
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#F48FB1" stroke="#C2185B" stroke-width="2" />`;
        // Inner circle decorative
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius - 10}" fill="none" stroke="#F8BBD0" stroke-width="2" stroke-dasharray="4,4" />`;
        // Cherry in middle
        svgContent += `<circle cx="${center}" cy="${center}" r="6" fill="#D81B60" />`;

        // Cuts
        for (let i = 0; i < parts; i++) {
            const angle = ((i * 360 / parts) - 90) * (Math.PI / 180);
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            svgContent += `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
        }
    }

    else if (type === 'orange') {
        const radius = 40;
        const center = 50;
        // Rind
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius}" fill="#FF9800" stroke="#F57C00" stroke-width="2" />`;
        // Pith (white part)
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius - 2}" fill="#FFF3E0" />`;

        // Segments are tricky to draw manually cleanly without path commands for each wedge
        // But we can just draw the flesh color and overdraw white lines
        svgContent += `<circle cx="${center}" cy="${center}" r="${radius - 5}" fill="#FF9800" />`;

        // White lines for segments
        for (let i = 0; i < parts; i++) {
            const angle = ((i * 360 / parts) - 90) * (Math.PI / 180);
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            svgContent += `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}" stroke="#FFF3E0" stroke-width="3" />`;
        }
    }

    return `<svg viewBox="0 0 100 100" width="220" height="220" style="${style}">${svgContent}</svg>`;
};

const FairShareCutting = () => {
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

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    // Ensure unique ID for this skill
    const SKILL_ID = 9005;
    const SKILL_NAME = "Fair Share - Cutting";

    const TOTAL_QUESTIONS = 10;
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [sessionQuestions, setSessionQuestions] = useState([]);

    useEffect(() => {
        // Create Session
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        let timer;
        if (!showResults) {
            timer = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }

        // Visibility Change logic
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
            if (timer) clearInterval(timer);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [showResults]);

    useEffect(() => {
        if (!sessionQuestions[qIndex]) {
            generateQuestion(qIndex);
        } else {
            setCurrentQuestion(sessionQuestions[qIndex]);
            // Restore options for existing question
            setShuffledOptions([...sessionQuestions[qIndex].options].sort(() => 0.5 - 0.5)); // Keep existing order if possible? 
            // Actually qData has options. Shuffling again might change order on revisit.
            // Let's store shuffledOptions in qData if we want them to stay same.

            // For now, just restore state
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
    }, [qIndex]);

    const generateQuestion = (index) => {
        // Define types and their valid parts logic
        const types = [
            { type: 'pizza', name: 'pizza', validParts: [2, 3, 4, 5, 6, 8] },
            { type: 'chocolate', name: 'chocolate bar', validParts: [2, 3, 4, 5, 6, 8, 10] },
            { type: 'watermelon', name: 'watermelon slice', validParts: [2, 3, 4, 5] },
            { type: 'sandwich', name: 'sandwich', validParts: [2, 4] },
            { type: 'cake', name: 'cake', validParts: [2, 4, 6, 8, 10, 12] },
            { type: 'orange', name: 'orange slice', validParts: [8, 10, 12] }
        ];

        let selectedType, parts;
        let isUnique = false;
        let attempts = 0;

        while (!isUnique && attempts < 100) {
            const typeIdx = (index + randomInt(0, 2)) % types.length;
            selectedType = types[typeIdx];
            parts = selectedType.validParts[randomInt(0, selectedType.validParts.length - 1)];

            const isDuplicate = sessionQuestions.some((q, i) => i !== index && q && q.type === selectedType.type && q.parts === parts);

            if (!isDuplicate) {
                isUnique = true;
            }
            attempts++;
        }

        const svgImage = generateSVG(selectedType.type, parts);

        const questionText = `
            <div class='question-container'>
                <p>Look at this ${selectedType.name}. It has been cut into equal parts.</p>
                ${svgImage}
                <p>How many equal parts are there?</p>
            </div>
        `;

        const correctAnswer = parts.toString();

        // Generate options (correct + 3 distractors)
        let options = [correctAnswer];
        while (options.length < 4) {
            // Generate distractor close to correct answer
            let distractor = parts + randomInt(-2, 3);
            if (distractor <= 1) distractor = parts + 2;
            if (distractor === parts) distractor = parts + 1;

            // For sandwich (2, 4), distractors should be like 3, 5, 1 to be confusing but logically incorrect physically

            const distStr = distractor.toString();
            if (!options.includes(distStr)) {
                options.push(distStr);
            }
        }

        const solutionText = `
            The ${selectedType.name} is divided into <strong>${parts}</strong> equal sections. 
            <br/>You can count them one by one to find the total number of parts.
        `;

        const qData = {
            text: questionText,
            correctAnswer: correctAnswer,
            solution: solutionText,
            options: options,
            type: selectedType.type,
            parts: parts,
            shuffledOptions: [...options].sort(() => Math.random() - 0.5)
        };

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
                difficulty_level: 'Easy',
                question_text: "Cutting Shapes Question", // Simplified for log
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
            // Reset states for next question
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);

            // Reset question timer
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            // Finish session and create report
            if (sessionId) {
                await api.finishSession(sessionId).catch(console.error);
            }

            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val === true).length;

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
            setQIndex(prev => prev - 1);
            setShowExplanationModal(false);
        }
    };

    const handleOptionSelect = (option) => {
        if (isSubmitted) return;
        setSelectedOption(option);
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
            <div className="junior-practice-page results-view overflow-y-auto">
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
        <div className="junior-practice-page fair-share-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    {/* Empty or Logo if needed */}
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
                <div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
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
                                        <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'center', justifyContent: 'center', overflow: 'visible', width: '100%' }}>
                                            <LatexContent html={currentQuestion.text} />
                                        </h2>
                                    </div>
                                    <div className="interaction-area-modern">
                                        <div className="options-grid-modern">
                                            {shuffledOptions.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''
                                                        } ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''
                                                        }`}
                                                    style={{ fontWeight: '500', fontSize: '1.5rem' }}
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
                {/* Desktop Controls */}
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button
                            className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
                            onClick={async () => {
                                if (sessionId) await api.finishSession(sessionId).catch(console.error);
                                navigate(-1);
                            }}
                        >
                            <StickerExit size={20} className="hidden" />
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
                        <div className="nav-buttons-group flex items-center gap-3">
                            {qIndex > 0 && (
                                <button className="nav-pill-prev-btn px-6 py-3 rounded-2xl border-2 border-[#31326F] text-[#31326F] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all" onClick={handlePrevious}>
                                    <ChevronLeft size={24} /> Previous
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

                {/* Mobile Controls */}
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

export default FairShareCutting;
