import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import ExplanationModal from '../../../ExplanationModal';
import mascotImg from '../../../../assets/mascot.png';
import '../../../../pages/high/class8/SquaresAndSquareRoots.css';

const CORRECT_MESSAGES = ["✨ Amazing job! ✨", "🌟 Brilliant! 🌟", "🎉 Correct! 🎉", "🚀 Super! 🚀"];

const generateQuestionData = () => {
    return [
        {
            text: "Which of the following describes the general form of a Pythagorean triplet for $m > 1$?",
            options: ["$(2m, m^2 - 1, m^2 + 1)$", "$(2m, m, m^2)$", "$(m, 2m, 3m)$", "$(m^2, m^2-1, 2m)$"],
            correctAnswer: "$(2m, m^2 - 1, m^2 + 1)$",
            solution: "For any integer $m > 1$, $(2m, m^2 - 1, m^2 + 1)$ forms a Pythagorean triplet.",
        },
        {
            text: "Is $(3, 4, 5)$ a Pythagorean triplet?",
            options: ["$Yes$", "$No$", "$Only\\ if\\ multiplied$", "$Cannot\\ be\\ determined$"],
            correctAnswer: "$Yes$",
            solution: "$3^2 + 4^2 = 9 + 16 = 25$. $5^2 = 25$. Since $3^2+4^2=5^2$, it is a Pythagorean triplet.",
        },
        {
            text: "Which of the following is a Pythagorean triplet?",
            options: ["$(6, 8, 10)$", "$(5, 9, 12)$", "$(6, 7, 8)$", "$(10, 11, 12)$"],
            correctAnswer: "$(6, 8, 10)$",
            solution: "$6^2 + 8^2 = 36 + 64 = 100$. $10^2 = 100$. Thus, $(6, 8, 10)$ is a Pythagorean triplet.",
        },
        {
            text: "Find the Pythagorean triplet containing $14$ as one of its members.",
            options: ["$(14, 48, 50)$", "$(14, 30, 32)$", "$(14, 25, 29)$", "$(14, 18, 22)$"],
            correctAnswer: "$(14, 48, 50)$",
            solution: "Let $2m = 14 \\Rightarrow m = 7$. Then $m^2 - 1 = 49 - 1 = 48$ and $m^2 + 1 = 49 + 1 = 50$. The triplet is $(14, 48, 50)$.",
        },
        {
            text: "Find the Pythagorean triplet containing $16$ as one of its members.",
            options: ["$(16, 63, 65)$", "$(16, 30, 34)$", "Both $(16, 63, 65)$ and $(16, 30, 34)$", "None"],
            correctAnswer: "Both $(16, 63, 65)$ and $(16, 30, 34)$",
            solution: "Let $2m = 16 \\Rightarrow m=8$. Members: $16, 63, 65$. Also, $16$ can be part of $8 \\times (2, 3, 4)$? No, $2 \\times (8, 15, 17) = (16, 30, 34)$.",
            // Wait, we could just keep the standard textbook one. The textbook only teaches the 2m method.
            // Let's modify the options to make it simpler.
        },
        {
            text: "Identify the Pythagorean triplet consisting of $5, 12,$ and $13$.",
            options: ["$Yes$", "$No$", "$Only\\ 12\\ and\\ 13$", "$Only\\ 5\\ and\\ 12$"],
            correctAnswer: "$Yes$",
            solution: "$5^2 + 12^2 = 25 + 144 = 169$. Since $13^2 = 169$, it is a Pythagorean triplet.",
        },
        {
            text: "Find a Pythagorean triplet whose one member is $18$.",
            options: ["$(18, 80, 82)$", "$(18, 45, 52)$", "$(18, 25, 30)$", "$(18, 70, 75)$"],
            correctAnswer: "$(18, 80, 82)$",
            solution: "Let $2m=18 \\Rightarrow m=9$. Then $m^2-1 = 81-1=80$ and $m^2+1=81+1=82$. The triplet is $(18, 80, 82)$.",
        },
        {
            text: "Find a Pythagorean triplet if $m^2 - 1 = 24$.",
            options: ["$(10, 24, 26)$", "$(8, 24, 25)$", "$(12, 24, 28)$", "$(7, 24, 25)$"],
            correctAnswer: "$(10, 24, 26)$",
            solution: "If $m^2 - 1 = 24$, then $m^2 = 25$, so $m=5$. The members are $2m = 10$, $m^2-1 = 24$, $m^2+1 = 26$. The triplet is $(10, 24, 26)$.",
        },
        {
            text: "Does there exist a Pythagorean triplet where the longest side (hypotenuse) is $17$?",
            options: ["$Yes,\\ (8, 15, 17)$", "$Yes,\\ (9, 12, 17)$", "$Yes,\\ (7, 14, 17)$", "$No$"],
            correctAnswer: "$Yes,\\ (8, 15, 17)$",
            solution: "Let $m^2 + 1 = 17 \\Rightarrow m^2 = 16 \\Rightarrow m=4$. Then $2m=8$ and $m^2-1=15$. The triplet is $(8, 15, 17)$.",
        },
        {
            text: "Can $(6, 8, 11)$ be a Pythagorean triplet?",
            options: ["$Yes$", "$No$", "$Sometimes$", "$Depends\\ on\\ the\\ triangle$"],
            correctAnswer: "$No$",
            solution: "$6^2 + 8^2 = 36 + 64 = 100$. However, $11^2 = 121$. Since $100 \\neq 121$, it is NOT a Pythagorean triplet.",
        }
    ];
};

const PythagoreanTriplets = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [questions, setQuestions] = useState([]);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1250;
    const SKILL_NAME = "Pythagorean Triplets";
    const TOTAL_QUESTIONS = 10;

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(s => s && setSessionId(s.session_id));
        }
        const prepared = generateQuestionData().map(q => {
            // Fix options for Q5 dynamically or keep hardcoded. We keep hardcoded but shuffle.
            if (q.text.includes("containing $16$")) {
                q.options = ["$(16, 63, 65)$", "$(16, 30, 34)$", "Both", "None"];
                q.correctAnswer = "Both";
                q.solution = "Let 2m=16 => m=8 giving (16,63,65). Or m^2-1=15 => not int. But 8^2+15^2=17^2 multiplied by 2 gives 16^2+30^2=34^2. So both are valid.";
            }
            return { ...q, options: [...q.options].sort(() => Math.random() - 0.5) };
        });
        setQuestions(prepared);
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        const handleVisibility = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => { clearInterval(timer); document.removeEventListener("visibilitychange", handleVisibility); };
    }, []);

    useEffect(() => {
        const currentAnswer = answers[qIndex];
        if (currentAnswer) {
            setSelectedOption(currentAnswer.selectedOption);
            setIsCorrect(currentAnswer.isCorrect);
            setIsSubmitted(true);
            setFeedbackMessage(currentAnswer.isCorrect ? CORRECT_MESSAGES[qIndex % CORRECT_MESSAGES.length] : "");
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
            setFeedbackMessage("");
        }
    }, [qIndex, answers]);

    useEffect(() => {
        setShowExplanationModal(false);
        accumulatedTime.current = 0;
        questionStartTime.current = Date.now();
    }, [qIndex]);

    const formatTime = (secs) => `${Math.floor(secs / 60)}:${(secs % 60).toString().padStart(2, '0')}`;

    const handleCheck = () => {
        if (!selectedOption || !questions[qIndex]) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;

        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));
        if (!isRight) setShowExplanationModal(true);

        const userId = sessionStorage.getItem('userId');
        if (userId) {
            let timeSpent = accumulatedTime.current;
            if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;

            api.recordAttempt({
                user_id: parseInt(userId, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption,
                is_correct: isRight,
                solution_text: currentQ.solution,
                time_spent_seconds: Math.round(timeSpent / 1000)
            }).catch(console.error);
        }
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(p => p + 1);
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(v => v.isCorrect).length;
                api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: TOTAL_QUESTIONS,
                        correct_answers: totalCorrect,
                        time_taken_seconds: timeElapsed
                    },
                    user_id: parseInt(userId, 10)
                }).catch(console.error);
            }
            navigate(-1);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;
    const currentQuestion = questions[qIndex];

    return (
        <div className="class8-practice-page">
            <header className="class8-header">
                <div className="class8-skill-name">{SKILL_NAME}</div>
                <div className="class8-progress-pill">Question {qIndex + 1} / {TOTAL_QUESTIONS}</div>
                <div className="class8-timer">⏱ {formatTime(timeElapsed)}</div>
            </header>
            <main className="class8-content">
                <div className="class8-card">
                    <AnimatePresence mode="wait">
                        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
                            <h2 className="class8-question-text"><LatexContent html={currentQuestion.text} /></h2>
                            <div className="class8-options-grid">
                                {currentQuestion.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`class8-option ${selectedOption === opt ? 'selected' : ''} ${isSubmitted && opt === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === opt && !isCorrect ? 'wrong' : ''}`}
                                        onClick={() => !isSubmitted && setSelectedOption(opt)}
                                        disabled={isSubmitted}
                                    >
                                        <LatexContent html={opt} />
                                    </button>
                                ))}
                            </div>
                            {isSubmitted && isCorrect && (
                                <div className="class8-feedback correct">
                                    <img src={mascotImg} alt="Mascot" width="40" height="40" />
                                    {feedbackMessage}
                                </div>
                            )}
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
            <footer className="class8-footer">
                <button className="class8-btn class8-btn-exit" onClick={() => { if (sessionId) api.finishSession(sessionId); navigate(-1); }}><X size={20} /> Exit</button>
                {isSubmitted && <button className="class8-btn class8-btn-explain" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {qIndex > 0 && <button className="class8-btn class8-btn-prev" onClick={() => setQIndex(p => p - 1)}><ChevronLeft size={20} /> Prev</button>}
                    {isSubmitted ? (
                        <button className="class8-btn class8-btn-submit" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? 'Next' : 'Done'} <ChevronRight size={20} /></button>
                    ) : (
                        <button className="class8-btn class8-btn-submit" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={20} /></button>
                    )}
                </div>
            </footer>
        </div>
    );
};
export default PythagoreanTriplets;
