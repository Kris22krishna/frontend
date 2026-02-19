import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, ArrowLeft, Check, X, Pencil, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const EuclidsDivision = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [questions, setQuestions] = useState([]);

    // Logging states
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const SKILL_ID = 1112;
    const SKILL_NAME = "Divisibility of Integers Using Euclid’s Method";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Lemma Statement
            createQuestion(1,
                `Identify Euclid's Division Lemma for positive integers a and b.`,
                [`$a = bq + r, 0 \\le r < b$`, `$a = bq + r, 0 < r \\le b$`, `$a = bq - r, 0 \\le r < b$`, `$a = rq + b, 0 \\le b < r$`],
                `$a = bq + r, 0 \\le r < b$`,
                `1. Recall the statement:
   - For any two positive integers $a$ and $b$, there exist unique integers $q$ and $r$ such that $a = bq + r$, where $0 \\le r < b$.

2. Conclusion:
   - Therefore, the correct form is $a = bq + r, 0 \\le r < b$.`
            ),
            // 2. Finding HCF (Easy)
            createQuestion(2,
                `Using Euclid's algorithm, find HCF of 135 and 225.`,
                [`45`, `35`, `15`, `25`],
                `45`,
                `1. Apply Euclid's Division Algorithm:
   - $225 = 135 \\times 1 + 90$
   - $135 = 90 \\times 1 + 45$
   - $90 = 45 \\times 2 + 0$

2. Identify HCF:
   - The remainder has become 0. The divisor at this stage is 45.

3. Conclusion:
   - Therefore, HCF(135, 225) = 45.`
            ),
            // 3. Finding HCF (Medium)
            createQuestion(3,
                `Using Euclid's division algorithm, find the HCF of 196 and 38220.`,
                [`196`, `195`, `98`, `382`],
                `196`,
                `1. Apply Euclid's Division Algorithm:
   - $38220 = 196 \\times 195 + 0$

2. Identify HCF:
   - Since the remainder is 0 in the first step itself, the divisor 196 is the HCF.

3. Conclusion:
   - Therefore, HCF = 196.`
            ),
            // 4. Role of Remainder
            createQuestion(4,
                `In Euclid's Division Lemma $a = bq + r$, if $b=4$, what are the possible values for $r$?`,
                [`0, 1, 2, 3`, `1, 2, 3, 4`, `0, 1, 2, 3, 4`, `1, 2, 3`],
                `0, 1, 2, 3`,
                `1. Analyze the condition for $r$:
   - We know $0 \\le r < b$.
   - Given $b=4$, so $0 \\le r < 4$.

2. List values:
   - Integers satisfying this are 0, 1, 2, 3.

3. Conclusion:
   - Therefore, possible values are 0, 1, 2, 3.`
            ),
            // 5. Harder HCF
            createQuestion(5,
                `Using Euclid's division algorithm, find the HCF of 867 and 255.`,
                [`51`, `55`, `17`, `3`],
                `51`,
                `1. Apply Euclid's Algorithm:
   - $867 = 255 \\times 3 + 102$
   - $255 = 102 \\times 2 + 51$
   - $102 = 51 \\times 2 + 0$

2. Identify HCF:
   - Remainder is 0, divisor is 51.

3. Conclusion:
   - Therefore, HCF is 51.`
            ),
            // 6. Application (Word Problem)
            createQuestion(6,
                `An army contingent of 616 members is to march behind a band of 32 members. Use Euclid's algorithm to find the maximum number of columns.`,
                [`8`, `4`, `16`, `32`],
                `8`,
                `1. Identify the problem:
   - We need to find the HCF of 616 and 32 to find the maximum number of columns.

2. Apply Euclid's Algorithm:
   - $616 = 32 \\times 19 + 8$
   - $32 = 8 \\times 4 + 0$

3. Conclusion:
   - HCF is 8. Therefore, they can march in 8 columns.`
            ),
            // 7. General concept
            createQuestion(7,
                `Euclid's division algorithm is a technique to compute the ______ of two positive integers.`,
                [`HCF`, `LCM`, `Product`, `Difference`],
                `HCF`,
                `1. Definition:
   - Euclid's division algorithm is specifically used for finding the Highest Common Factor (HCF).

2. Conclusion:
   - It computes the HCF.`
            ),
            // 8. Remainder property
            createQuestion(8,
                `When a positive integer $a$ is divided by 3, the values of remainder $r$ can be:`,
                [`0, 1, 2`, `1, 2, 3`, `0, 1, 2, 3`, `1, 2`],
                `0, 1, 2`,
                `1. Condition: $0 \\le r < 3$.
   2. Integers: 0, 1, 2.
   3. conclusion: 0, 1, 2.`
            ),
            // 9. Form of odd integer
            createQuestion(9,
                `Any positive odd integer is of the form ____ where q is some integer.`,
                [`$6q+1, 6q+3, 6q+5$`, `$6q, 6q+2$`, `$4q+1$ only`, `$2q$`],
                `$6q+1, 6q+3, 6q+5$`,
                `1. Theory:
   - If we divide by 6, remainders are 0,1,2,3,4,5.
   - $6q, 6q+2, 6q+4$ are even.
   - $6q+1, 6q+3, 6q+5$ are odd.

2. Conclusion:
   - The form is $6q+1, 6q+3, 6q+5$.`
            ),
            // 10. Cube form
            createQuestion(10,
                `The cube of any positive integer is of the form:`,
                [`9m, 9m+1, 9m+8`, `3m, 3m+1, 3m+2`, `4m, 4m+1`, `5m, 5m+1`],
                `9m, 9m+1, 9m+8`,
                `1. Property proof (summary):
   - Let $a = 3q + r$ where $r=0,1,2$.
   - $(3q)^3 = 27q^3 = 9(3q^3) = 9m$.
   - $(3q+1)^3 = 27q^3 + 27q^2 + 9q + 1 = 9(...) + 1 = 9m+1$.
   - $(3q+2)^3 = ... = 9(...) + 8 = 9m+8$.

2. Conclusion:
   - The form is 9m, 9m+1, 9m+8.`
            )
        ];

        return qs;
    };

    useEffect(() => {
        setQuestions(generateQuestions());
    }, []);

    // Restore state when qIndex changes
    useEffect(() => {
        const savedAnswer = answers[qIndex];
        if (savedAnswer) {
            setSelectedOption(savedAnswer.selectedOption);
            setIsCorrect(savedAnswer.isCorrect);
            setIsSubmitted(true);
        } else {
            setSelectedOption(null);
            setIsCorrect(false);
            setIsSubmitted(false);
        }
    }, [qIndex, answers]);

    const CORRECT_MESSAGES = ["Good job!", "Excellent!", "Perfect!", "Well done!"];
    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [SKILL_ID]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const currentQ = questions[qIndex];
        const isRight = selectedOption === currentQ.correctAnswer;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        if (isRight) setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        else setShowExplanationModal(true);
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: selectedOption,
                isCorrect: isRight
            }
        }));

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId) {
            let t = accumulatedTime.current;
            if (isTabActive.current) t += Date.now() - questionStartTime.current;
            const sec = Math.max(0, Math.round(t / 1000));
            api.recordAttempt({
                user_id: parseInt(userId), session_id: sessionId, skill_id: SKILL_ID,
                question_text: currentQ.text, correct_answer: currentQ.correctAnswer,
                student_answer: selectedOption, is_correct: isRight, solution_text: currentQ.solution,
                time_spent_seconds: sec
            }).catch(console.error);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) {
            setQIndex(prev => prev - 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        }
    };

    const handleNext = async () => {
        if (qIndex < questions.length - 1) {
            setQIndex(p => p + 1);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            if (sessionId) await api.finishSession(sessionId).catch(console.error);
            const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
            if (userId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect === true).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / questions.length) * 100,
                    parameters: {
                        skill_id: SKILL_ID,
                        skill_name: SKILL_NAME,
                        total_questions: questions.length,
                        correct_answers: totalCorrect,
                        timestamp: new Date().toISOString(),
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
        <div className="junior-practice-page" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F' }}>
                    {SKILL_NAME}
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">
                        Question {qIndex + 1} / {questions.length}
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
                        <div className="question-card-modern" style={{ paddingLeft: '2rem' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', justifyContent: 'flex-start', overflow: 'visible', color: '#2D3748' }}>
                                    <LatexText text={currentQuestion.text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern">
                                <div className="options-grid-modern">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''} ${isSubmitted && option === currentQuestion.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === option && !isCorrect ? 'wrong' : ''}`}
                                            style={{ fontWeight: '500' }}
                                            onClick={() => !isSubmitted && setSelectedOption(option)}
                                            disabled={isSubmitted}
                                        >
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                    {isSubmitted && isCorrect && (
                                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct" style={{ marginTop: '20px' }}>
                                            {feedbackMessage}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={currentQuestion.correctAnswer} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button>
                    </div>
                    <div className="bottom-center">
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> Explain</button>}
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="nav-pill-next-btn bg-gray-200 text-gray-600"
                                onClick={handlePrevious}
                                disabled={qIndex === 0}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}
                            >
                                <ChevronLeft size={28} strokeWidth={3} />
                                Prev
                            </button>
                            {isSubmitted ?
                                <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight /></button> :
                                <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check /></button>
                            }
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <div className="mobile-footer-right">
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2"
                            onClick={handlePrevious}
                            disabled={qIndex === 0}
                            style={{ minWidth: 'auto' }}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        {isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /> Explain</button>}
                        {isSubmitted ?
                            <button className="nav-pill-next-btn" onClick={handleNext}>Next <ChevronRight size={20} /></button> :
                            <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={20} /></button>
                        }
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EuclidsDivision;
