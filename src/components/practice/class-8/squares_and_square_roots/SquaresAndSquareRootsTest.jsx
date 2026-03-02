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
        { text: "Which of the following numbers can be a perfect square?", options: ["$1057$", "$23453$", "$7928$", "$1024$"], correctAnswer: "$1024$", solution: "Perfect squares end in $1, 4, 5, 6, 9$, or even zeroes. $1024$ is $32^2$." },
        { text: "How many non-square numbers lie between $9^2$ and $10^2$?", options: ["$17$", "$18$", "$19$", "$20$"], correctAnswer: "$18$", solution: "There are $2n$ non-square numbers between $n^2$ and $(n+1)^2$. For $n=9$, $2 \\times 9 = 18$." },
        { text: "If you square an odd number, what kind of number do you get?", options: ["$Always\\ Even$", "$Always\\ Odd$", "$Sometimes\\ Even$", "$Depends$"], correctAnswer: "$Always\\ Odd$", solution: "The square of an odd number is always odd." },
        { text: "The sum of the first $11$ odd natural numbers is:", options: ["$100$", "$121$", "$144$", "$110$"], correctAnswer: "$121$", solution: "Sum of first $n$ odd natural numbers is $n^2$. $11^2 = 121$." },
        { text: "Evaluate $99^2$ using an identity.", options: ["$9801$", "$9901$", "$9991$", "$9911$"], correctAnswer: "$9801$", solution: "$(100 - 1)^2 = 100^2 - 2(100) + 1 = 9801$." },
        { text: "Find $15^2$ without actual multiplication.", options: ["$125$", "$225$", "$325$", "$625$"], correctAnswer: "$225$", solution: "Number ending in $5$: $(1\\times 2)\\text{ hundred} + 25 = 225$." },
        { text: "What is $1001^2$?", options: ["$100201$", "$102001$", "$1002001$", "$10020001$"], correctAnswer: "$1002001$", solution: "Using the pattern, two zeroes between $1$s give two zeroes between $1, 2, 1$." },
        { text: "Is $(6, 8, 10)$ a Pythagorean triplet?", options: ["$Yes$", "$No$", "$Sometimes$", "$Only\\ if\\ multiplied$"], correctAnswer: "$Yes$", solution: "$6^2 + 8^2 = 36 + 64 = 100$, and $10^2 = 100$." },
        { text: "Find a Pythagorean triplet whose one member is $14$.", options: ["$(14, 48, 50)$", "$(14, 30, 32)$", "$(14, 25, 29)$", "$(14, 18, 22)$"], correctAnswer: "$(14, 48, 50)$", solution: "Let $2m=14 \\Rightarrow m=7$. $m^2-1=48$, $m^2+1=50$." },
        { text: "If $n^2 = 81$, what is the positive square root $\\sqrt{81}$?", options: ["$9$", "$-9$", "$\\pm 9$", "$81$"], correctAnswer: "$9$", solution: "$\\sqrt{}$ denotes the positive square root. $\\sqrt{81} = 9$." },
        { text: "Square root is the inverse operation of:", options: ["$Addition$", "$Multiplication$", "$Division$", "$Squaring$"], correctAnswer: "$Squaring$", solution: "Square root undoes the operation of squaring." },
        { text: "Find the square root of $144$.", options: ["$12$", "$14$", "$16$", "$24$"], correctAnswer: "$12$", solution: "$12 \\times 12 = 144$." },
        { text: "By what smallest whole number should $48$ be multiplied to make it a perfect square?", options: ["$2$", "$3$", "$4$", "$6$"], correctAnswer: "$3$", solution: "$48 = 2^4 \\times 3$. Multiply by $3$ to pair the prime factor." },
        { text: "Find the square root of $400$.", options: ["$20$", "$30$", "$40$", "$10$"], correctAnswer: "$20$", solution: "$\\sqrt{4 \\times 100} = 2 \\times 10 = 20$." },
        { text: "Find the least number to be subtracted from $250$ to make it a perfect square.", options: ["$25$", "$15$", "$11$", "$20$"], correctAnswer: "$25$", solution: "$15^2 = 225$. $250 - 225 = 25$." },
        { text: "Find the least number to be added to $1300$ to make it a perfect square.", options: ["$69$", "$44$", "$25$", "$84$"], correctAnswer: "$69$", solution: "$37^2 = 1369$. $1369 - 1300 = 69$." },
        { text: "How many decimal places will the square root of $17.64$ have?", options: ["$1$", "$2$", "$0$", "$4$"], correctAnswer: "$1$", solution: "The number has $2$ decimal places. Its root has $2/2 = 1$ decimal place." },
        { text: "Find the square root of $42.25$.", options: ["$6.25$", "$6.5$", "$7.5$", "$5.5$"], correctAnswer: "$6.5$", solution: "$\\sqrt{4225} = 65$, so $\\sqrt{42.25} = 6.5$." },
        { text: "The area of a square is $31.36\\text{ m}^2$. What is the side?", options: ["$5.6\\text{ m}$", "$5.4\\text{ m}$", "$5.8\\text{ m}$", "$4.6\\text{ m}$"], correctAnswer: "$5.6\\text{ m}$", solution: "Side $= \\sqrt{31.36} = 5.6\\text{ m}$." },
        { text: "Calculate $\\sqrt{0.0004}$.", options: ["$0.02$", "$0.2$", "$0.002$", "$0.04$"], correctAnswer: "$0.02$", solution: "$\\sqrt{4} = 2$. $4$ decimal places in number means $2$ in root. $0.02$." },
        { text: "Estimate $\\sqrt{90}$ to the nearest whole number.", options: ["$9$", "$10$", "$8$", "$11$"], correctAnswer: "$9$", solution: "$90$ is closer to $81$ ($9^2$) than $100$ ($10^2$)." },
        { text: "What will be the unit digit of the square of $52698$?", options: ["$4$", "$8$", "$6$", "$2$"], correctAnswer: "$4$", solution: "$8^2 = 64$. The unit digit is $4$." },
        { text: "Evaluate $25^2 - 24^2$.", options: ["$40$", "$49$", "$50$", "$51$"], correctAnswer: "$49$", solution: "$(n+1)^2 - n^2 = (n+1) + n = 25 + 24 = 49$." },
        { text: "Find the smallest square number divisible by $4$, $9$, and $10$.", options: ["$900$", "$180$", "$360$", "$1600$"], correctAnswer: "$900$", solution: "LCM is $180$. Multiply by unpaired factor $5$ $\\rightarrow$ $900$." },
        { text: "Find the square root of $7056$.", options: ["$84$", "$86$", "$74$", "$94$"], correctAnswer: "$84$", solution: "$\\sqrt{7056} = 84$." }
    ];
};

const SquaresAndSquareRootsTest = () => {
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
    const [showResults, setShowResults] = useState(false);

    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    // Skill ID for the Test
    const SKILL_ID = 1255;
    const SKILL_NAME = "Squares and Square Roots Test";
    const TOTAL_QUESTIONS = 25;

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(s => s && setSessionId(s.session_id));
        }
        const prepared = generateQuestionData().map(q => ({
            ...q,
            options: [...q.options].sort(() => Math.random() - 0.5)
        }));
        setQuestions(prepared);
        const timer = setInterval(() => { if (!showResults) setTimeElapsed(p => p + 1); }, 1000);
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
    }, [showResults]);

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
                difficulty_level: 'Mixed',
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
                    type: 'test',
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
            setShowResults(true);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (showResults) {
        const score = Object.values(answers).filter(v => v.isCorrect).length;
        const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
        return (
            <div className="class8-practice-page" style={{ padding: '2rem' }}>
                <div className="class8-card" style={{ margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#31326F', marginBottom: '1rem' }}>Chapter Test Complete! 🎉</h1>
                    <div style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You scored {score} out of {TOTAL_QUESTIONS} ({percentage}%)</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                        <button className="class8-btn class8-btn-submit" onClick={() => window.location.reload()}>Retake Test</button>
                        <button className="class8-btn class8-btn-exit" onClick={() => navigate(-1)}>Exit to Menu</button>
                    </div>
                </div>
            </div>
        );
    }

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
export default SquaresAndSquareRootsTest;
