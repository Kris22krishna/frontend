import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const SumOfTerms = () => {
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

    const SKILL_ID = 1109; // Finding the Sum of Terms of an AP
    const SKILL_NAME = "Finding the Sum of Terms of an AP";
    const [answers, setAnswers] = useState({});

    const generateQuestions = () => {
        const createQuestion = (id, text, options, answer, solution) => ({
            id, text, options: options.sort(() => Math.random() - 0.5), correctAnswer: answer, solution
        });

        const qs = [
            // 1. Need for formula (Conceptual)
            createQuestion(1,
                `To find the sum of natural numbers from 1 to 100, which formula for $S_n$ is easiest to use?`,
                [`Sn = n/2 (a + l)`, `Sn = n/2 (2a + (n-1)d)`, `Sn = n(n+1)/2`, `Sn = n^2`],
                `Sn = n(n+1)/2`,
                `1. Identify the type of sequence:
   - The sequence is $1, 2, 3... 100$. This is the sum of the first $n$ natural numbers.

2. Recall the special formula:
   - For natural numbers, $S_n = \\frac{n(n+1)}{2}$.
   - This comes from $S_n = \\frac{n}{2}(a+l)$ where $a=1, l=n$.

3. Conclusion:
   - Therefore, the easiest formula is $S_n = \\frac{n(n+1)}{2}$.`
            ),
            // 2. Sum Formula (Formula)
            createQuestion(2,
                `Which formula gives the sum of first n terms of an AP with first term 'a' and last term 'l'?`,
                [`S = n/2 (a + l)`, `S = n (a + l)`, `S = n/2 (2a + l)`, `S = 2n (a + l)`],
                `S = n/2 (a + l)`,
                `1. Recall the sum formula using first and last terms:
   - The sum of an AP when the last term $l$ is known is given by:
   - $S_n = \\frac{n}{2}(a + l)$

2. Conclusion:
   - Therefore, the correct formula is $S_n = \\frac{n}{2}(a + l)$.`
            ),
            // 3. Finding Sum (Easy)
            createQuestion(3,
                `Find the sum of the first 22 terms of the AP: 8, 3, -2...`,
                [`-979`, `-1000`, `-970`, `-989`],
                `-979`,
                `1. Identify parameters:
   - $a = 8$
   - $d = 3 - 8 = -5$
   - $n = 22$

2. Apply the sum formula:
   - $S_n = \\frac{n}{2}[2a + (n-1)d]$
   - $S_{22} = \\frac{22}{2}[2(8) + (22-1)(-5)]$
   - $S_{22} = 11[16 + 21(-5)]$
   - $S_{22} = 11[16 - 105]$
   - $S_{22} = 11(-89)$
   - $S_{22} = -979$

3. Conclusion:
   - Therefore, the sum is -979.`
            ),
            // 4. Finding Sum (Easy)
            createQuestion(4,
                `Find the sum of first 100 positive integers.`,
                [`5050`, `5000`, `5100`, `5051`],
                `5050`,
                `1. Use the sum formula for natural numbers:
   - $S_n = \\frac{n(n+1)}{2}$

2. Substitute $n=100$:
   - $S_{100} = \\frac{100(100+1)}{2}$
   - $S_{100} = 50(101)$
   - $S_{100} = 5050$

3. Conclusion:
   - Therefore, the sum is 5050.`
            ),
            // 5. Finding Sum (Medium - Fraction)
            createQuestion(5,
                `Find the sum of first 11 terms of the AP: $\\frac{1}{15}, \\frac{1}{12}, \\frac{1}{10}...$`,
                [`33/20`, `30/20`, `31/20`, `35/20`],
                `33/20`,
                `1. Identify parameters:
   - $a = \\frac{1}{15}$
   - $d = \\frac{1}{12} - \\frac{1}{15} = \\frac{5}{60} - \\frac{4}{60} = \\frac{1}{60}$
   - $n = 11$

2. Apply the sum formula:
   - $S_{11} = \\frac{11}{2}[2(\\frac{1}{15}) + (11-1)(\\frac{1}{60})]$
   - $S_{11} = \\frac{11}{2}[\\frac{2}{15} + 10(\\frac{1}{60})]$
   - $S_{11} = \\frac{11}{2}[\\frac{2}{15} + \\frac{1}{6}]$
   - $S_{11} = \\frac{11}{2}[\\frac{4+5}{30}]$
   - $S_{11} = \\frac{11}{2} \\times \\frac{9}{30}$
   - $S_{11} = \\frac{33}{20}$

3. Conclusion:
   - Therefore, the sum is $\\frac{33}{20}$.`
            ),
            // 6. Finding n given Sum (Medium)
            createQuestion(6,
                `How many terms of the AP: 24, 21, 18... must be taken so that their sum is 78?`,
                [`4 or 13`, `4 only`, `13 only`, `5 or 12`],
                `4 or 13`,
                `1. Identify parameters:
   - $a = 24$, $d = -3$, $S_n = 78$

2. Set up the equation:
   - $78 = \\frac{n}{2}[2(24) + (n-1)(-3)]$
   - $156 = n[48 - 3n + 3]$
   - $156 = n[51 - 3n]$
   - $156 = 51n - 3n^2$

3. Solve the quadratic equation:
   - $3n^2 - 51n + 156 = 0$
   - $n^2 - 17n + 52 = 0$ (Divide by 3)
   - $(n - 4)(n - 13) = 0$
   - $n = 4$ or $n = 13$

4. Conclusion:
   - Both values are positive integers, so both are valid answers.
   - Therefore, 4 or 13 terms.`
            ),
            // 7. Finding n given Sum (Medium)
            createQuestion(7,
                `The first and last terms of an AP are 17 and 350. If $d=9$, how many terms are there?`,
                [`38`, `37`, `39`, `40`],
                `38`,
                `1. Identify parameters:
   - $a = 17$, $a_n = 350$, $d = 9$

2. Find n using $a_n$ formula:
   - $a_n = a + (n-1)d$
   - $350 = 17 + (n-1)9$
   - $333 = 9(n-1)$
   - $37 = n - 1$
   - $n = 38$

3. Conclusion:
   - Therefore, there are 38 terms.`
            ),
            // 8. Finding missing value (Hard)
            createQuestion(8,
                `Find the sum of first 51 terms of an AP whose 2nd and 3rd terms are 14 and 18 respectively.`,
                [`5610`, `5500`, `5700`, `5600`],
                `5610`,
                `1. Find a and d:
   - $a_2 = 14, a_3 = 18$
   - $d = a_3 - a_2 = 18 - 14 = 4$
   - $a = a_2 - d = 14 - 4 = 10$

2. Calculate sum for $n=51$:
   - $S_{51} = \\frac{51}{2}[2(10) + (51-1)4]$
   - $S_{51} = \\frac{51}{2}[20 + 200]$
   - $S_{51} = \\frac{51}{2}(220)$
   - $S_{51} = 51(110)$
   - $S_{51} = 5610$

3. Conclusion:
   - Therefore, the sum is 5610.`
            ),
            // 9. Word Problem (Hard - Logs)
            createQuestion(9,
                `200 logs are stacked: 20 in bottom row, 19 in next, 18 in next. How many rows are there?`,
                [`16`, `25`, `16 or 25`, `15`],
                `16`,
                `1. Identify parameters:
   - $S_n = 200$, $a = 20$, $d = -1$

2. Set up equation:
   - $200 = \\frac{n}{2}[2(20) + (n-1)(-1)]$
   - $400 = n[40 - n + 1]$
   - $400 = n[41 - n]$
   - $n^2 - 41n + 400 = 0$
   - $(n - 16)(n - 25) = 0$

3. Analyze solutions:
   - If $n=25$, $a_{25} = 20 + 24(-1) = -4$ (Impossible, can't have negative logs).
   - So, $n=16$ is the only valid solution.

4. Conclusion:
   - Therefore, there are 16 rows.`
            ),
            // 10. Word Problem (Hard - Prize)
            createQuestion(10,
                `A sum of ₹700 is to be used to give 7 cash prizes. If each prize is ₹20 less than preceding, find value of first prize.`,
                [`₹160`, `₹140`, `₹150`, `₹180`],
                `₹160`,
                `1. Identify parameters:
   - $S_n = 700$, $n = 7$, $d = -20$

2. Find a:
   - $700 = \\frac{7}{2}[2a + (7-1)(-20)]$
   - $200 = 2a + 6(-20)$ (Dividing by 7/2)
   - $200 = 2a - 120$
   - $320 = 2a$
   - $a = 160$

3. Conclusion:
   - Therefore, the value of the first prize is ₹160.`
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

export default SumOfTerms;
